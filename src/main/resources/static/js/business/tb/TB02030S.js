const TB02030Sjs = (() => {
    let lastClickedRowId = null;
    let lastWfMapId;
    const GRID_MAP_ID = "#gridWfMapList";
    const GRID_STEP_ID = "#gridWfStepList";
    const URLS = {
        MENU_AUTH: "/menuByAuth",
        WF_MAP: {
            GET: "/TB02030S/getWfMapInfo",
            DELETE: "/TB02030S/deleteWfMapInfo",
            UPDATE: "/TB02030S/updateWfMapInfo",
            INSERT: "/TB02030S/insertWfMapInfo"
        },
        WF_STEP: {
            GET: "/TB02030S/getWfStepInfo",
            DELETE: "/TB02030S/deleteWfStepInfo",
            UPDATE: "/TB02030S/updateWfStepInfo",
            INSERT: "/TB02030S/insertWfStepInfo"
        }
    };

    $(document).ready(() => {
        getAthCodeInfo();
        setGrid_TB20230S();
    });

    //WF STEP 셀렉트박스 옵션 설정(권한 코드 정보)
    function getAthCodeInfo(){
        ajaxCall({
            url: URLS.MENU_AUTH,
            success: (data) => {
                const stepNmOptions = data.map(item => ({
                    label: item.athCdNm ,
                    value: item.athCdNm
                }));

                const wfAuthIdOptions = data.map(item => ({
                    label: `${item.athCd} ${item.athCdNm}`,
                    value: item.athCd
                }));

                //colWfStepList에 select 박스에 옵션을 설정
                colWfStepList.forEach(col => {
                    if(col.dataIndx === "stepNm"){ //스텝명
                        col.editor.options = stepNmOptions;
                    }

                    if (col.dataIndx === "wfAuthId") { //권한id
                        col.editor.options = wfAuthIdOptions;
                    }

                });
            }
        });
    };
    
    //TB2030S화면 그리드 설정
    function setGrid_TB20230S(){
        const obj_WfMap = {
            height: 220,
            width: "100%",
            colModel: colWfMapList,
            editable: false,
            showTitle: false,
            numberCell: { show: false },
            rowDblClick: (evt, ui) => {
                if (ui.rowData) {
                    const wfMapId = ui.rowData.wfMapId;
                    getWfStepList(wfMapId);
                    lastWfMapId = wfMapId;
                }
            },
            scrollModel: {  // 수평 스크롤을 비활성화
                horizontal: false,
                vertical: true  // 수직 스크롤은 필요에 따라 활성화
            },
            autoResize: true ,// 열 너비 자동 조정
            strNoRows: '조회된 데이터가 없습니다.'
        };
    
        const obj_WfStep = {
            height: 220,
            colModel: colWfStepList,
            editable: false,
            showTitle: false,
            numberCell: { show: false },
            strNoRows: '조회된 데이터가 없습니다.'
        };
    
        initializeGrid(GRID_MAP_ID, obj_WfMap);
        initializeGrid(GRID_STEP_ID, obj_WfStep);
    
        wfMapObj = $(GRID_MAP_ID).pqGrid('instance');
        wfStepObj = $(GRID_STEP_ID).pqGrid('instance');
    };

    //Wf 맵 관리
    let colWfMapList = [
		//체크박스
        {
            dataIndx: "rowCheck",
            align: "center",
            halign: "center",
            title: "",
            menuIcon: false,
            type: "checkbox",
            editor: true,  
            dataType: "bool",
            editable: true,
            width    : "1%",
            resizable: false,
            cb: {
                all: false,
                header: false,
            },
        },
        { 	
			title    : "워크플로우 맵ID", 
			dataType : "string", 
			dataIndx : "wfMapId", 
			align    : "center",
			width    : "15%",
            editable : true,
		},
		{ 	
			title    : "맵 명", 
			dataType : "string", 
			dataIndx : "wfMapNm", 
			align    : "left",
			halign   : "center",
			width    : "15%",
            editable : true,
		},
		{ 	
			title    : "업무테이블", 
			dataType : "string", 
			dataIndx : "jobTable", 
			halign   : "center",
			align    : "center",
			width    : "15%",
            editable : true,
		},
		{ 	
			title    : "업무테이블KEY컬럼명", 
			dataType : "string", 
			dataIndx : "jobTableKey", 
			halign   : "center",
			align    : "left",
            width    : "23%",
            editable : true,
		},
		{ 	
			title    : "등록자", 
			dataType : "string",
			dataIndx : "regUserId",
			align    : "center",
            width    : "15%",
            editable : true,
		},
		{ 	
			title    : "등록일시", 
			dataType : "string",
			dataIndx : "regDttm",
			align    : "center", 
			width    : "15%",
            editable: false // 이 열은 편집 불가능
		},
        { 	
			title    : "상태", 
			dataType : "string",
			dataIndx : "state",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
		{ 	
			title    : "원래 맵ID", 
			dataType : "string",
			dataIndx : "originalWfMapId",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
	];

    function initializeGrid(gridId, options){
        if ($(gridId).pqGrid("instance") === undefined) {
            $(gridId).pqGrid(options);
        } else {
            $(gridId).pqGrid("refreshDataAndView");
        }
    };

    //조회버튼 클릭(WF MAP 조회)
    function searchButtonClick(){
        const wfMapNm = $("#wfMapNmSearchInput").val();
        getWfMapList(wfMapNm);
    };

    //WF MAP 조회 AJAX
    function getWfMapList(wfMapNm){
        const _url = wfMapNm ? `${URLS.WF_MAP.GET}?wfMapNm=${wfMapNm}` : URLS.WF_MAP.GET;
     
        $.ajax({
            url: _url,
            beforeSend: () => {
                clearGridData(GRID_MAP_ID);   // GRID_MAP_ID 비우기
                clearGridData(GRID_STEP_ID);  // GRID_STEP_ID 비우기
            },
            success: populateWfMapData
        });
    };

    function clearGridData(gridId){

        const $grid = $(gridId);
        const gridInstance = $grid.pqGrid("instance");

        gridInstance.option("dataModel.data", []);
        gridInstance.option("strNoRows", "조회 중입니다..."); // 조회 중 메시지 설정
        gridInstance.refreshDataAndView(); // 데이터 새로 고침

        $grid.pqGrid("refresh");
    };

    function populateWfMapData(data) {
        const rowList = data.map(value => ({
            rowCheck: false,
            wfMapId: value.wfMapId,
            wfMapNm: value.wfMapNm,
            jobTable: value.jobTable,
            jobTableKey: value.jobTableKey,
            regUserId: value.regUserId,
            regDttm: formatDate(value.regDttm),
            state: "U",
            originalWfMapId: value.wfMapId
        }));
        updateGridData(GRID_MAP_ID, rowList);
        lastClickedRowId = null;
    };

    function updateGridData(gridId, data) {
        const gridInstance = $(gridId).pqGrid("instance");
        gridInstance.option("dataModel.data", data);
        gridInstance.refreshDataAndView();
    };

    //WF MAP 행추가
    function addWfMapRow(){
        const newRow = {
            rowCheck: false,
            wfMapId: "",
            wfMapNm: "",
            jobTable: "",
            jobTableKey: "",
            regUserId: "",
            regDttm: "",
            state: "N",
            originalWfMapId: ""
        };
        $(GRID_MAP_ID).pqGrid("addRow", { rowData: newRow, checkEditable: false });
    };

    //WF MAP 수정 AJAX
    function updateWfMapData(wfMapList){
        return new Promise((resolve, reject) => {
            ajaxCall({
                url: URLS.WF_MAP.UPDATE,
                method: "PUT",
                data: wfMapList,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: (response) => reject(new Error("오류 발생")),  // 실패 시 reject 호출만 처리
            });
        });
    };

    //WF MAP 저장 AJAX
    function saveWfMapData(wfMapList){
        return new Promise((resolve, reject) => {
            ajaxCall({
                url: URLS.WF_MAP.INSERT,
                method: "POST",
                data: wfMapList,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: (response) => reject(new Error("오류 발생")),  // 실패 시 reject 호출만 처리
            });
        });
    };

    // Wf 스텝 관리
    let colWfStepList = [
		//체크박스
        {
            dataIndx: "rowCheck",
            align: "center",
            halign: "center",
            title: "",
            menuIcon: false,
            type: "checkBoxSelection",
            editor: false,
            dataType: "bool",
            editable: true,
            resizable: false,
            cb: {
                all: false,
                header: false,
            },
        },
        { 	
			title    : "wfMapId", 
			dataType : "string", 
			dataIndx : "wfMapId", 
			align    : "center",
            hidden   : true
		},
		{ 	
			title    : "스텝 ID", 
			dataType : "string", 
			dataIndx : "stepId", 
			align    : "center",
			halign   : "center",
			width    : "14%",
            editable : true,
		},
		{ 	
			title    : "스텝명", 
			dataType : "string", 
			dataIndx : "stepNm", 
			halign   : "center",
			align    : "center",
			width    : "14%",
            formatter: 'listItemText', // 선택된 항목의 label을 표시
            editor: {
                type: "select",
                options: [],
                valueIndx: "value",
                labelIndx: "label",
            },
            editable : true,
		},
		{ 	
			title    : "다음스텝", 
			dataType : "string", 
			dataIndx : "nextStepId", 
			halign   : "center",
			align    : "center",
            width    : "14%",
            editable : true,
		},
		{ 	
			title    : "반송스텝", 
			dataType : "string",
			dataIndx : "rtnStepId",
			align    : "center",
            width    : "14%",
            editable : true,
		},
		{ 	
			title    : "권한ID", 
			dataType : "string",
			dataIndx : "wfAuthId",
			align    : "center", 
			width    : "14%",
            formatter: 'listItemText', 
            editor: {
                type: "select",
                options: [],
                valueIndx: "value",
                labelIndx: "label",
            },
            editable : true,
                    
		},
        { 	
			title    : "예외권한 사원번호", 
			dataType : "string",
			dataIndx : "excAuthEmp",
			align    : "center", 
			width    : "14%",
            editable : true,
		},
        { 	
			title    : "예외권한 부서코드", 
			dataType : "string",
			dataIndx : "excAuthDept",
			align    : "center", 
			width    : "14%",
            editable: true 
		},
        { 	
			title    : "상태", 
			dataType : "string",
			dataIndx : "state",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
		
	];

    // WF 스텝 관리 조회 AJAX
    function getWfStepList(wfMapId) {
        // if (String(lastClickedRowId) === String(wfMapId)) {
        //     console.log("같은 행이 이미 선택되었습니다. 서비스 호출을 생략합니다.");
        //     return;
        // }
        lastClickedRowId = wfMapId;
        const url = wfMapId ? `${URLS.WF_STEP.GET}?wfMapId=${wfMapId}` : URLS.WF_STEP.GET;

        ajaxCall({
            method: "GET",
            url: url,
            beforeSend: () => updateGrid(GRID_STEP_ID, [], "조회 중입니다..."),
            success: (data) => {
                const rowList = data.map(value => ({
                    rowCheck: false,
                    wfMapId,
                    stepId: value.stepId,
                    stepNm: value.stepNm,
                    nextStepId: value.nextStepId,
                    rtnStepId: value.rtnStepId,
                    wfAuthId: value.wfAuthId,
                    excAuthEmp : value.excAuthEmp,
                    excAuthDept : value.excAuthDept,
                    state: "U",
                }));
                updateGrid(GRID_STEP_ID, rowList, data.length ? "" : "조회된 데이터가 없습니다.");
            }
        });
    }

    // WF 스텝 행 추가
    function addWfStepRow() {
        const newRow = {
            rowCheck: false,
            wfMapId: lastWfMapId || "",
            stepId: "",
            stepNm: "",
            nextStepId: "",
            rtnStepId: "",
            wfAuthId: "",
            excAuthEmp : "",
            excAuthDept : "",
            state: "N",
        };

        $(GRID_STEP_ID).pqGrid("addRow", { rowData: newRow, checkEditable: false });
    }

    // WF 스텝 저장 AJAX
    function saveWfStepData(data) {
        return new Promise(function(resolve, reject) {
            ajaxCall({
                url: URLS.WF_STEP.INSERT,
                method: "POST",
                data: data,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: (response) => reject(new Error("오류 발생")),  // 실패 시 reject 호출만 처리
            });
        });
    }

    // WF 스텝 수정 AJAX
    function updateWfStepData(data) {
        return new Promise(function(resolve, reject) {
            ajaxCall({
                url: URLS.WF_STEP.UPDATE,
                method: "PUT",
                data: data,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: function(error) {
                    reject(error);  
                }
            });
        });
    }

    // 행이 비어있는지 확인
    function isRowEmpty(row) {
        return !Object.keys(row).some(function(key) {
            //rowCheck,state 값 제외하고 비어있는지 확인
            return key !== "rowCheck" && key !== "state" && !key.startsWith("pq_") && row[key];
        });
    }

    // 그리드 업데이트
    function updateGrid(gridId, data, noRowsMessage) {
        $(gridId).pqGrid("option", "dataModel.data", data);
        $(gridId).pqGrid("option", "strNoRows", noRowsMessage);
        $(gridId).pqGrid("refreshDataAndView");
    }
    
    // 저장/수정 처리 유틸리티 함수
    async function saveOrUpdateWfData(gridId, saveDataFunc, updateDataFunc, validateFunc, validationMessage) {
        const userEno = $('#userEno').val();
        const allData = $(gridId).pqGrid("option", "dataModel").data;
        const saveRows = [];
        const updateRows = [];
    
        const getCheckedRows = (data) => data.filter(row => row.rowCheck);
        const classifyRows = (rows) => {
            rows.forEach(row => {
                row.chgUserId = userEno;         //변경자 
                if (row.state === "N") {         
                    row.regUserId = userEno;     // 등록자
                } else if (row.state === "U") {  
                    row.regUserId = "";          // 등록자(수정일 경우 등록자 변경하면 안됨)
                }

                (row.state === "N" ? saveRows : updateRows).push(row);
            });
        };
    
        const checkedRows = getCheckedRows(allData);

        // 체크박스가 선택되지 않았을 경우 메시지 표시 후 종료
        if (checkedRows.length === 0) {
            openPopup({ type: "info", text: "저장하려면 체크박스를 먼저 선택하세요." });
            return;
        }
        if (!validateFunc(checkedRows)) return;
        
        // 선택된 행을 저장과 수정으로 분류
        classifyRows(checkedRows);
    
        try {
            const saveSuccess = saveRows.length ? await saveDataFunc(saveRows) : false;
            const updateSuccess = updateRows.length ? await updateDataFunc(updateRows) : false;
    
            let resultMessage = "";
            // 처리 결과 메시지 생성
            if (saveSuccess && updateSuccess) {
                resultMessage = `${validationMessage} 저장 및 수정이 완료되었습니다.`;
            } else if (saveSuccess) {
                resultMessage = `${validationMessage} 저장이 완료되었습니다.`;
            } else if (updateSuccess) {
                resultMessage = `${validationMessage} 수정이 완료되었습니다.`;
            }
    
            if (resultMessage) {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: resultMessage,
                });

                if(gridId === GRID_MAP_ID){
                    searchButtonClick();
                }else if(gridId === GRID_STEP_ID){
                    //재조회를 위해 wfMapId세팅
                    const wfMapId = saveRows.length > 0 
                        ? saveRows[0].wfMapId 
                        : updateRows.length > 0 
                            ? updateRows[0].wfMapId 
                            : null;
                
                    if (wfMapId) {
                        getWfStepList(wfMapId);
                    } else {
                        console.error("wfMapId를 찾을 수 없습니다.");
                    }
                }
                
            }
        } catch (error) {
            let errorMessage = "";
            if (saveRows.length && updateRows.length) {
                errorMessage = "저장과 수정 중 오류가 발생했습니다.";
            } else if (saveRows.length) {
                errorMessage = "저장 중 오류가 발생했습니다.";
            } else if (updateRows.length) {
                errorMessage = "수정 중 오류가 발생했습니다.";
            }
    
            console.error(errorMessage, error);
            if (errorMessage) {
                openPopup({
                    title: "실패",
                    type: "error",
                    text: errorMessage,
                });
            }
        }
    }
    
    // 개별 validateRows 함수 정의
    function validateWfMapRows(rows) {
        for (const row of rows) {
            if (!row.wfMapId) {
                openPopup({
                    type: "info",
                    text: `${row.pq_ri + 1}번째 행의 워크플로우 맵ID를 입력해주세요.`,
                });
                $(GRID_MAP_ID).pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "wfMapId" });
                return false;
            } else if (row.wfMapId.length !== 4) {
                openPopup({
                    type: "info",
                    text: `${row.pq_ri + 1}번째 행의 워크플로우 맵ID는 4자리여야 합니다.`,
                });
                $(GRID_MAP_ID).pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "wfMapId" });
                return false;
            }
        }
        return true;
    }
    
    function validateWfStepRows(rows) {
        for (const row of rows) {
            if (!row.stepId) {
                openPopup({
                    type: "info",
                    text: `${row.pq_ri + 1}번째 행의 스탭 ID를 입력해주세요.`,
                });
                $(GRID_STEP_ID).pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "stepId" });
                return false;
            }
        }
        return true;
    }
    
    //삭제 처리 유틸리티 함수
    function deleteRows(gridId, deleteServiceFunc) {
        const gridData = $(gridId).pqGrid("option", "dataModel.data");
        const rowsToDelete = [];
        const rowsToDeleteEmpty = [];
      
        // 체크된 행이 없으면 경고창을 띄우고 함수 종료
        if (!gridData.some(row => row.rowCheck)) {
            openPopup({ type: "info", text: "저장하려면 체크박스를 먼저 선택하세요." });
            return;
        }
    
        // 행을 구분하여 삭제할 행과 빈 행을 나눔
        gridData.forEach((row, index) => {
            if (row.rowCheck) {
                const rowData = gridId === GRID_MAP_ID
                    ? { wfMapId: row.wfMapId }
                    : { wfMapId: row.wfMapId, stepId: row.stepId };
                
                // 빈 행 처리
                if (isRowEmpty(row)) {
                    rowsToDeleteEmpty.push(index);
                } else {
                    rowsToDelete.push(rowData);
                }
            }
        });
    
        // 빈 행을 먼저 삭제
        rowsToDeleteEmpty.forEach(index => $(gridId).pqGrid("deleteRow", { rowIndx: index }));
    
        // 삭제할 행이 있을 경우 서비스 호출
        if (rowsToDelete.length) {
            confirmDelete(() => {
                if (gridId === GRID_MAP_ID) {
                    deleteServiceFunc(rowsToDelete.map(row => row.wfMapId));  // 삭제 함수로 wfMapId만 전달
                } else if (gridId === GRID_STEP_ID) {
                    deleteServiceFunc(rowsToDelete);  // 삭제 함수로 wfMapId와 stepId 모두 전달
                }
            });
        }
    }
    
    // 삭제 확인 팝업
    function confirmDelete(onConfirm) {
        Swal.fire({
            title: '정말 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => result.isConfirmed && onConfirm());
    }

    //WF MAP 행삭제 AJAX
    function deleteWfMap(wfMapList){
        ajaxCall({
            url: URLS.WF_MAP.DELETE,
            method: "DELETE",
            data: wfMapList,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF맵 삭제가 완료되었습니다",
                });

                searchButtonClick();  // 기존의 조회 함수 호출하여 데이터 재로드
            },
        });
    };

    // WF 스텝 삭제 AJAX
    function deleteWfStep(data) {
        ajaxCall({
            url: URLS.WF_STEP.DELETE,
            method: "DELETE",
            data: data,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF스텝 삭제가 완료되었습니다",
                })
                getWfStepList(data[0].wfMapId);
            }
        });
        $(GRID_STEP_ID).pqGrid("refreshDataAndView");
    }

    // 버튼 함수에서 validate 함수 전달
    const clickSaveWfMapButton = () => saveOrUpdateWfData(GRID_MAP_ID, saveWfMapData, updateWfMapData, validateWfMapRows, "워크플로우 맵");
    const clickSaveWfStepButton = () => saveOrUpdateWfData(GRID_STEP_ID, saveWfStepData, updateWfStepData, validateWfStepRows, "WF스텝");
    const deleteWfMapRow = () => deleteRows(GRID_MAP_ID, deleteWfMap);
    const deleteWfStepRow = () => deleteRows(GRID_STEP_ID, deleteWfStep);


    return{
        searchButtonClick : searchButtonClick,
        addWfMapRow : addWfMapRow,
        deleteWfMapRow : deleteWfMapRow,
        clickSaveWfMapButton : clickSaveWfMapButton,
        addWfStepRow : addWfStepRow,
        deleteWfStepRow : deleteWfStepRow, 
        clickSaveWfStepButton: clickSaveWfStepButton,
    }

})();