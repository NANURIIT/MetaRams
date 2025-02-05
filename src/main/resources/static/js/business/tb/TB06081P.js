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


/**
 * 신규일 경우 결재요청 버튼
 * 진행중일 경우 한명이라도 결재한 상태면 결재요청, 회수 불가
 * 반려상태인 경우 결재요청, 회수 둘다 가능
 */
$(document).ready(function () {
    TB06081P_getSelectBox();
});

// 승인자목록
let TB06081P_apvlList = [];
let TB06081P_dprtList;
let TB06081P_status;

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
 * 부서코드 가져오기
 */
function TB06081P_getSelectBox() {
    const dprtList = getSelectBoxList("TB09090",
        "D010"
        , false);
    TB06081P_dprtList = dprtList.filter(function (item) { return item.cmnsGrpCd === 'D010'; });		//	RPTS_CTRT_TP_DETL_CD

    let html = ""
    for (let i = 0; i < TB06081P_dprtList.length; i++ ) {
        html += `<option value="${TB06081P_dprtList[i].cdValue}">${TB06081P_dprtList[i].cdName}</option>`
    }

    $("#TB06081P_dprtNm").append(html);

    $("#TB06081P_dprtNm").on('change', function(){
        $("#TB06081P_dprtCd").val($(this).val())
    })
}

/**
 * 결재상태 체크 후 데이터 가져오기
 * @param {MenuId} prefix
 * @description 결재상태 확인 후 데이터 가져옴 화면에서 세팅해야 할 값들 존재
 */
function TB06081P_setScrnData(prefix) {
    $('#TB06081P_dealNo').val($(`#${prefix}_ibDealNo`).val());
    $('#TB06081P_prdtCd').val($(`#${prefix}_prdtCd`).val());
    $('#TB06081P_excSeq').val($(`#${prefix}_excSeq`).val());
    $('#TB06081P_rqstSq').val($(`#${prefix}_rqstSq`).val());
    $('#TB06081P_trSeq').val($(`#${prefix}_trSeq`).val());
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
    TB06081P_apvlList = [];
    TB06081P_setApvlList();
    $("#TB06081P_pqgrid").pqGrid('instance').setData([]);
    TB06081P_reset();
    $("#TB06081P_pqgrid").pqGrid("destroy");
});

/**
 * 조회조건, PQGrid reset
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
    $('#TB06081P_apvlRqstCntn').val("");
    $('#TB06081P_errCntn').val("");
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
            render: function (ui) {
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
function TB06081P_apvlRqst(decdStepDcd) {

    let decdSttsDcd;
    let url;
    let text;
    
    // 재승인요청
    if(
        decdStepDcd === "02" 
    ){
        decdSttsDcd = "1"
        url = "updateApvlRqst"
        text = "재승인요청"
    }
    // 승인요청
    else if (decdStepDcd === "04") {
        decdSttsDcd = "1"
        url = "apvlRqst"
        text = "승인요청"
    }
    // 승인요청취소
    else if (decdStepDcd === "00") {
        decdSttsDcd = "4"
        url = "updateApvlRqst"
        text = "승인요청취소"
    }

    let apvlList = [];

    for (let i = 0; i < TB06081P_apvlList.length; i++) {
        let param = {
            chrrEno: TB06081P_apvlList[i].empno                 // 책임자사번 - TB06081P_apvlList
            // , apvlRqstPEno: ""                               // 승인요청자사번 - 서비스처리
            , decdStepDcd: decdStepDcd                          // 결재단계구분코드 - 00해당무, 01담당자작성중, 02재승인요청, 03담당자수정중, 04승인요청, 05결재완료
            , decdSttsDcd: decdSttsDcd                          // 결재상태구분코드 - 0해당없음, 1진행중, 2승인완료, 3반려, 4승인취소
            , dealNo: $('#TB06081P_dealNo').val()               // 딜번호
            , prdtCd: $('#TB06081P_prdtCd').val()               // 상품코드
            , decdJobDcd: $('#TB06081P_decdJobDcd').val()       // 결재업무구분코드
            , scrnNo: $('#TB06081P_scrnNo').val()               // 화면번호
            , apvlRqstCntn: $('#TB06081P_apvlRqstCntn').val()   // 승인요청내용
            , excSeq: $('#TB06081P_excSeq').val() || 0          // 실행순번
            , rqstSq: $('#TB06081P_rqstSq').val() || 0          // 신청순번
            , trSeq: $('#TB06081P_trSeq').val() || 0            // 거래순번
            , errCntn: $('#TB06081P_errCntn').val()             // 오류내용
        }
        apvlList.push(param);
    }

    let paramData = {
        apvlList: apvlList
    }

    $.ajax({
        type: "POST",
        url: `/TB06081P/${url}`,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            // 성공
            if (data > 0) {
                Swal.fire({
                    icon: "success",
                    text: `${text} 되었습니다!`,
                });
                TB06081P_apvlListChk();
            }
            // 실패
            else {
                Swal.fire({
                    icon: "warning",
                    text: `${text} 실패!`,
                });
                TB06081P_apvlListChk();
            }
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

    $.ajax({
        type: "POST",
        url: "/TB06081P/apvlListChk",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            // 결재를 한 흔적이 있다...!!
            if (data.length > 0) {
                TB06081P_apvlList = data;
                TB06081P_setApvlList();
                for(let i = 0; i < data.length; i++) {
                    if ( data[i].decdSttsDcd === "3" ) {
                        TB06081P_apvlReqStatusHandler("no");
                        break;
                    }
                    else if ( data[i].decdSttsDcd === "1" ) {
                        TB06081P_apvlReqStatusHandler("ing");
                        break;
                    }
                    else if ( data[i].decdSttsDcd === "4" ) {
                        TB06081P_apvlReqStatusHandler("apvlcc");
                        break;
                    }
                    else if ( data[i].decdSttsDcd === "2" ) {
                        TB06081P_apvlReqStatusHandler("nothing");
                        break;
                    }
                }
            }
            // 결재한적이 없는거 같은데요?
            else {
                $("#modal-TB06081P .con-tb06081p tbody").html("");
                // 결재요청사항 없음
                TB06081P_apvlReqStatusHandler("new");
            }

            // 결재상태체크 후 버튼컨트롤
            const url = window.location.pathname;
            chkDecdStep(url.split("/")[1]);
          
        },
    });
}

/**
 * 버튼 컨츄롤
 * @param {String} status 버튼상태 관리를 위한 상태
 * @description 
 * 결재요청중인 경우 status = "ing"
 * 승인상태인 경우status = "nothing"
 * 결재요청중인 경우 결재요청취소 버튼 활성화, 결재요청버튼 비활성화
 * 버튼 추가, 삭제시 버튼 상태 관리
 */
function TB06081P_apvlReqStatusHandler(status) {

    TB06081P_status = status;
    console.log(status);
    // 진행중
    if (status === "ing") {
        $('button[onclick*="TB06081P_srchApvlList"]').prop("disabled", true);
        $('#apvlReqBtn').off('click');
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", false);
        $("#apvlReqBtn").prop("disabled", true);
        $("#apvlReqCancelBtn").prop("disabled", false);
        $("#TB06081P_apvlRqstCntn").prop("disabled", true);
        $("#TB06081P_errCntn").prop("disabled", false);
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", true);
    }
    // 승인완료
    else if (status === "nothing") {
        $('button[onclick*="TB06081P_srchApvlList"]').prop("disabled", true);
        $('#apvlReqBtn').off('click');
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", true);
        $("#apvlReqBtn").prop("disabled", true)
        $("#apvlReqCancelBtn").prop("disabled", true)
        $("#TB06081P_apvlRqstCntn").prop("disabled", true)
        $("#TB06081P_errCntn").prop("disabled", true)
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", true);
    }
    // 반려
    else if (status === "no") {
        $('button[onclick*="TB06081P_srchApvlList"]').prop("disabled", true);
        $('#apvlReqBtn').off('click');
        $('#apvlReqBtn').on('click', function () {
            TB06081P_apvlRqst('02');
        });
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", false);
        $("#apvlReqBtn").prop("disabled", false);
        $("#apvlReqCancelBtn").prop("disabled", true);
        $("#TB06081P_apvlRqstCntn").prop("disabled", false);
        $("#TB06081P_errCntn").prop("disabled", true);
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", true);
    }
    // 승인요청취소
    else if (status === "apvlcc") {
        $('button[onclick*="TB06081P_srchApvlList"]').prop("disabled", true);
        $('#apvlReqBtn').off('click');
        $('#apvlReqBtn').on('click', function () {
            TB06081P_apvlRqst('02');
        });
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", false);
        $("#apvlReqBtn").prop("disabled", false)
        $("#apvlReqCancelBtn").prop("disabled", true)
        $("#TB06081P_apvlRqstCntn").prop("disabled", false)
        $("#TB06081P_errCntn").prop("disabled", true)
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", true);
    }
    // 몰라 몰라 초기화는 해야해
    else if (status === "new") {
        $('button[onclick*="TB06081P_srchApvlList"]').prop("disabled", false);
        $('#apvlReqBtn').off('click');
        $('#apvlReqBtn').on('click', function () {
            TB06081P_apvlRqst('04');
        });
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", false);
        $("#apvlReqBtn").prop("disabled", false);
        $("#apvlReqCancelBtn").prop("disabled", true);
        $("#TB06081P_apvlRqstCntn").prop("disabled", false);
        $("#TB06081P_errCntn").prop("disabled", true);
        $("#modal-TB06081P .con-tb06081p tbody button").prop("disabled", false);
    }
}

/**
 * 승인자 추가
 * @param {Number} rowIdx
 * @description 추가시 현재 승인자 리스트 체크. 체크 시 리스트가 3개일시 추가 불가
 */
function TB06081P_addApvlList(rowIdx) {

    let apvlData = $("#TB06081P_pqgrid").pqGrid('instance').pdata[rowIdx]

    for (let i = 0; i < TB06081P_apvlList.length; i++) {
        // 들어있는 데이터를 추가했을시 아무 동작 안함
        if (TB06081P_apvlList[i].empno === apvlData.empno) {
            return;
        }
    }

    if (TB06081P_apvlList.length < 3) {
        TB06081P_apvlList.push(apvlData);
    }

    TB06081P_setApvlList();

    // 결재자 추가시 버튼 활성화
    TB06081P_apvlReqStatusHandler(TB06081P_status);
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
    if (TB06081P_apvlList.length === 0) {
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
    if (type === "up") {
        if (rowIdx > 0) {
            // 현재 항목과 위 항목의 위치를 스왑
            [apvlList[rowIdx], apvlList[rowIdx - 1]] = [apvlList[rowIdx - 1], apvlList[rowIdx]];
        }
    }
    /**
     * 승인자데이터를 아래로 보낼시 해당 버튼을 누른 데이터 삭제 후 다시 추가
     * 그리고 다시 그리드 셋
     */
    else if (type === "down") {
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

    for (let i = 0; i < apvlList.length; i++) {

        if(i === 0){
            $("#TB06081P_apvlRqstCntn").val(apvlList[i].apvlRqstCntn);
            $("#TB06081P_errCntn").val(apvlList[i].errCntn);
        }

        html += `
            <tr style="text-align: center;">
			    <td style="text-align: right;">
			        ${apvlList.length - i}
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