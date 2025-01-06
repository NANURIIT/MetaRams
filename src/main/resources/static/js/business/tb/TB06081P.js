/**
 * 결재조회 승인요청
 * 
 * 1. 결과목록 그리드
 * 사번, 이름, 부서, 선택버튼
 * 
 * 2. 결재순서 그리드
 * 승인자 1명 이상이면 확인버튼 활성화
 * 
 * 3. 확인 또는 저장 버튼 추가
 * 
 * 4. 결재요청이 이미 된 경우, 팝업내에서 결재요청 취소를 위한 텍스트 박스만 조작가능. 승인자 추가 변경기능 disabled
 */
$(document).ready(function () {

});

// 승인자목록
let TB06081P_apvlList = [];

/**
 * Modal Open
 * @param {menuId} prefix 
 */
function callTB06081P(prefix) {
    $('#TB06081P_prefix').val(prefix);
    TB06081P_setScrnData(prefix);
	$('#modal-TB06081P').modal('show');
    setTimeout(() => TB06081P_setPqGrid(), 300);
    TB06081P_apvlListChk();
}

/**
 * 결재상태 체크 후 데이터 가져오기
 * @param {MenuId} prefix
 * @description 결재상태 확인 후 데이터 가져옴 화면에서 세팅해야 할 값들 존재
 */
function TB06081P_setScrnData(prefix) {
    $('#TB06081P_dealNo').val($(`${prefix}_dealNo`).val());
    $('#TB06081P_prdtCd').val($(`${prefix}_prdtCd`).val());
    $('#TB06081P_excSeq').val($(`${prefix}_excSeq`).val());
    $('#TB06081P_rqstSq').val($(`${prefix}_rqstSq`).val());
    $('#TB06081P_trSeq').val($(`${prefix}_trSeq`).val());
    $('#TB06081P_decdJobDcd').val(prefix);
    $('#TB06081P_scrnNo').val(prefix);
}

/**
 * Modal Close
 */
function TB06081P_closeModal() {
	$('#modal-TB06081P').modal('hide');
}

$("#modal-TB06081P").on("hide.bs.modal", function () {
    TB06081P_reset();
    $("#TB06081P_pqgrid").pqGrid("destroy");
});

/**
 * 조회조건, PGGrid reset
 */
function TB06081P_reset() {
    $("#TB06081P_empNo").val("")
    $("#TB06081P_empNm").val("")
    $("#TB06081P_dprtNm").val("")
    $("#TB06081P_dprtCd").val("")
    $('#TB06081P_dealNo').val("");
    $('#TB06081P_prdtCd').val("");
    $('#TB06081P_excSeq').val("");
    $('#TB06081P_rqstSq').val("");
    $('#TB06081P_trSeq').val("");
    $('#TB06081P_decdJobDcd').val("");
    $('#TB06081P_scrnNo').val("");
    $("#TB06081P_pqgrid").pqGrid('instance').setData([]);
}

/**
 * PQGRID COLMODEL
 * @returns 콜모델
 */
function TB06081P_setGrid() {
    const TB06081P_pqgrid = [
        // 사번, 이름, 부서, 직책
        {
            title: "사번",
            dataType: "string",
            dataIndx: "empno",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "사원명",
            dataType: "string",
            dataIndx: "empNm",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "부서",
            dataType: "string",
            dataIndx: "dprtNm",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "직책",
            dataType: "string",
            dataIndx: "athCdNm",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        },
        /**
         * 선택버튼
         * 선택하면 결재자 추가 해주면 됨
         */
        {
            title: "",
            width: "10%",
            dataType: "string",
            dataIndx: "selectBtn",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            render: function(ui){
                return (
                    `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB06081P_addApvlList(${ui.rowIndx})">&nbsp;추가</button>`
                );
            }
        },
    ]
    return TB06081P_pqgrid;
}

/**
 * PQGRID 옵션 셋
 */
function TB06081P_setPqGrid() {
    let pqGridObjs = [
        {
            height: 200,
            maxHeight: 200,
            id: "TB06081P_pqgrid",
            colModel: TB06081P_setGrid(),
            scrollModel: { autoFit: true },
            editable: false,
        },
    ];
    setPqGrid(pqGridObjs);
}

/**
 * 결재조회 팝업
 * 
 * 승인자 조회?
 * 
 */
function TB06081P_srchApvlList() {

    let paramData = {
        empno: $('#TB06081P_empNo').val()
        , dprtCd: $('#TB06081P_dprtCd').val()
    }
    
    $.ajax({
        type: "POST",
        url: "/TB06081P/srchApvlList",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
          const pqGrid = $("#TB06081P_pqgrid").pqGrid('instance');
          pqGrid.setData(data);
          pqGrid.getData();
        },
    });
}

/**
 * 결재요청 저장
 */
function TB06081P_saveApvl() {

    let apvlList 
    
    let paramData = {
        apvlRqstSq: ""      // 승인요청순번
        , chrrEno: ""       // 책임자사번
        , apvlRqstPEno: ""  // 승인요청자사번
        , decdStepDcd: ""   // 결재단계구분코드
        , decdSttsDcd: ""   // 결재상태구분코드
        , dealNo: ""        // 딜번호
        , prdtCd: ""        // 상품코드
        , decdJobDcd: ""    // 결재업무구분코드
        , scrnNo: ""        // 화면번호
        , apvlRqstCntn: ""  // 승인요청내용
        , rqstDtm: ""       // 신청일시
        , rqstCnclDtm: ""   // 신청취소일시
        , prcsRsltDcd: ""   // 처리결과구분코드
        , excSeq: ""        // 실행순번
        , rqstSq: ""        // 신청순번
        , trSeq: ""         // 거래순번
        , errCntn: ""       // 오류내용
        , lastDecdSq: ""    // 최종결재순번
    }

    $.ajax({
        type: "POST",
        url: "/TB06081P/saveApvl",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            Swal.fire({
                icon: "success",
                text: "승인요청이 되었습니다!",
              });
        },
    });
}

/**
 * 결재요청내용 체크
 */
function TB06081P_apvlListChk() {

    let paramData = {
        dealNo: $('#TB06081P_dealNo').val()
        , prdtCd: $('#TB06081P_prdtCd').val()
        , excSeq: $('#TB06081P_excSeq').val() || 0
        , rqstSq: $('#TB06081P_rqstSq').val() || 0
        , trSeq: $('#TB06081P_trSeq').val() || 0
        , decdJobDcd: $('#TB06081P_decdJobDcd').val()
        , scrnNo: $('#TB06081P_scrnNo').val()
    }

    console.log(paramData);

    $.ajax({
        type: "POST",
        url: "/TB06081P/apvlListChk",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if(data.length > 0){
                TB06081P_apvlList = data;
                TB06081P_setApvlList();
                // 결재요청중
                TB06081P_apvlReqStatusHandler("ing");
            }else {
                // 결재요청사항 없음
                TB06081P_apvlReqStatusHandler("nothing");
            }
        },
    });
}

/**
 * 버튼 컨츄롤
 * @param {String} status 버튼상태 관리를 위한 상태
 * @description 
 * 결재요청중인 경우 status = "ing"
 * 결재요청내역이 없는 경우 status = "nothing"
 * 결재요청이 가능한 경우 status = "new"
 * 결재요청중인 경우 결재요청취소 버튼 활성화, 결재요청버튼 비활성화
 * 버튼 추가, 삭제시 버튼 상태 관리
 */
function TB06081P_apvlReqStatusHandler(status) {
    if(status === "ing"){
        $("#apvlReqBtn").prop("disabled", true)
        $("#apvlReqCancelBtn").prop("disabled", false)
    }
    else if (status === "nothing") {
        $("#apvlReqBtn").prop("disabled", true)
        $("#apvlReqCancelBtn").prop("disabled", true)
    }
    else if (status === "new"){
        $("#apvlReqBtn").prop("disabled", false)
        $("#apvlReqCancelBtn").prop("disabled", true)
    }
}

/**
 * 승인자 추가
 * @param {Number} rowIdx
 * @description 추가시 현재 승인자 리스트 체크. 체크 시 리스트가 3개일시 추가 불가
 */
function TB06081P_addApvlList(rowIdx){

    let apvlData = $("#TB06081P_pqgrid").pqGrid('instance').pdata[rowIdx]

    if(TB06081P_apvlList.length < 3){
        TB06081P_apvlList.push(apvlData);
    }
    
    TB06081P_setApvlList();
    
    // 결재자 추가시 버튼 활성화
    TB06081P_apvlReqStatusHandler("new");
}

/**
 * 승인자 제거
 * @param {Number} rowIdx
 * @description 승인자 리스트내 데이터 제거
 */
function TB06081P_subApvlList(rowIdx) {

    TB06081P_apvlList.splice(rowIdx, 1);

    TB06081P_setApvlList();

    // 결재자가 비어있는 경우 버튼 비활성화
    if(TB06081P_apvlList.length === 0){
        TB06081P_apvlReqStatusHandler("nothing");
    }
}

/**
 * 승인자 그리드 이동 버튼
 * @param {Number} rowIdx 승인자 데이터
 * @param {String} type 화살표방향
 */
function TB06081P_moveApvlData(rowIdx, type) {

    let apvlList = TB06081P_apvlList;

    /**
     * 승인자데이터를 위로 보낼시 해당 버튼을 누른 idx-1행을 지운 후 다시 추가
     * 그리고 다시 그리드 셋
     */
    if(type === "up"){
        if (rowIdx > 0) {
            // 현재 항목과 위 항목의 위치를 스왑
            [apvlList[rowIdx], apvlList[rowIdx - 1]] = [apvlList[rowIdx - 1], apvlList[rowIdx]];
        }
    }
    /**
     * 승인자데이터를 아래로 보낼시 해당 버튼을 누른 데이터 삭제 후 다시 추가
     * 그리고 다시 그리드 셋
     */
    else if(type === "down"){
        if (rowIdx < apvlList.length - 1) {
            // 현재 항목과 아래 항목의 위치를 스왑
            [apvlList[rowIdx], apvlList[rowIdx + 1]] = [apvlList[rowIdx + 1], apvlList[rowIdx]];
        }
    }

    TB06081P_apvlList = apvlList;

    TB06081P_setApvlList();
}


/**
 * 승인자 그리드 내용 세팅
 */
function TB06081P_setApvlList() {
    
    let apvlList = TB06081P_apvlList;

    $("#modal-TB06081P .con-tb06081p tbody").html("");

    let html;

    for(let i = 0; i < apvlList.length; i++) {
        html += `
            <tr style="text-align: center;">
			    <td style="text-align: right;">
			        ${i+1}
			    </td>
			    <td>
                    ${apvlList[i].empno}
                </td>
			    <td>
                    ${apvlList[i].empNm}
                </td>
                <td>
                    ${apvlList[i].dprtNm}
                </td>
			    <td>
                    ${apvlList[i].athCdNm}
                </td>
			    <td>
			        <button class="td-btn" onclick="TB06081P_subApvlList(${i})">삭제</button>
			    </td>
			    <td>
			        <button class="td-btn" onclick="TB06081P_moveApvlData(${i}, 'up')">▲</button>
			        <button class="td-btn" onclick="TB06081P_moveApvlData(${i}, 'down')">▼</button>
			    </td>
			</tr>
        `
    }

    $("#modal-TB06081P .con-tb06081p tbody").html(html);
} 

/**
 * 고민중
 */
// const TB06081Pjs = (function () {



// })();