/**
 * 결재, 반려 팝업
 * 
 * 1. 결재버튼으로 팝업오픈시 결재자주석내용, 결재버튼 활성화
 * 
 * 2. 반려버튼으로 팝업오픈시 반려요청내용, 반려버튼 활성화
 * 
 * 3. 결재, 반려 업데이트시 IBIMS231B(딜승인결재기본), IBIMS232B(딜승인결재담당자내역) 둘다 업데이트 해야함
 * 
 */

// 결재, 반려 상태확인
let TB06082P_mode;

/**
 * Modal Open
 * @param {menuId} prefix
 * @param {String} mode 결재 'DECD', 반려 'RJCT'
 * @discription
 * 결재자주석내용, 반려요청내용 textarea
 * 결재, 반려 버튼
 * 상태관리
 */
function callTB06082P(prefix, mode) {
    $('#TB06082P_prefix').val(prefix);
    TB06082P_setScrnData(prefix);
    $('#modal-TB06082P').modal('show');
    TB06082P_mode = mode

    // 결재
    if (mode == 'DECD') {
        $('#TB06082P_dcfcAnnoCntn').closest('.row.form-group.form-inline.text-right').prop('hidden', false);
        $('#TB06082P_rjctRsnCntn').closest('.row.form-group.form-inline.text-right').prop('hidden', true);
        $('#TB06082P_DECD').prop('hidden', false);
        $('#TB06082P_RJCT').prop('hidden', true);
    }
    // 반려
    else if (mode == 'RJCT') {
        $('#TB06082P_dcfcAnnoCntn').closest('.row.form-group.form-inline.text-right').prop('hidden', true);
        $('#TB06082P_rjctRsnCntn').closest('.row.form-group.form-inline.text-right').prop('hidden', false);
        $('#TB06082P_DECD').prop('hidden', true);
        $('#TB06082P_RJCT').prop('hidden', false);
    }

    $('#TB06082P_dcfcAnnoCntn').val("");
    $('#TB06082P_rjctRsnCntn').val("");

}

/**
 * 결재상태 체크 후 데이터 가져오기
 * @param {MenuId} prefix
 * @description 결재상태 확인 후 데이터 가져옴 화면에서 세팅해야 할 값들 존재
 */
function TB06082P_setScrnData(prefix) {
    $('#TB06082P_dealNo').val($(`#${prefix}_ibDealNo`).val());
    $('#TB06082P_prdtCd').val($(`#${prefix}_prdtCd`).val());
    $('#TB06082P_excSeq').val($(`#${prefix}_excSeq`).val());
    $('#TB06082P_rqstSq').val($(`#${prefix}_rqstSq`).val());
    $('#TB06082P_trSeq').val($(`#${prefix}_trSeq`).val());
    $('#TB06082P_decdJobDcd').val(prefix);
    $('#TB06082P_scrnNo').val(prefix);
}

/**
 * Modal Close
 */
function TB06082P_closeModal() {
    $('#modal-TB06082P').modal('hide');
}

$("#modal-TB06082P").on("hide.bs.modal", function () {
    // 히든 데이터 초기화
    $("#TB06082P_empNo").val("")
    $("#TB06082P_empNm").val("")
    $("#TB06082P_dprtNm").val("")
    $("#TB06082P_dprtCd").val("")
    $('#TB06082P_dealNo').val("");
    $('#TB06082P_prdtCd').val("");
    $('#TB06082P_excSeq').val("");
    $('#TB06082P_rqstSq').val("");
    $('#TB06082P_trSeq').val("");
    $('#TB06082P_decdJobDcd').val("");
    $('#TB06082P_scrnNo').val("");
});

/**
 * 결재, 반려 이벤트
 */
function TB06082P_decdUpdate() {

    let decdStepDcd;    // 결재단계구분코드
    let decdSttsDcd;    // 결재상태구분코드
    let text;

    // 결재
    if (TB06082P_mode == 'DECD') {
        decdStepDcd = '05'
        decdSttsDcd = '2'
        text = '결재'
    }
    // 반려
    else if (TB06082P_mode == 'RJCT') {
        decdStepDcd = '00'
        decdSttsDcd = '3'
        text = '반려'
    }

    // 결재자는 서비스에서 처리
    let paramData = {
        decdStepDcd: decdStepDcd                            // 결재단계구분코드 - 00해당무, 01담당자작성중, 02재승인요청, 03담당자수정중, 04승인요청, 05결재완료
        , decdSttsDcd: decdSttsDcd                          // 결재상태구분코드 - 0해당없음, 1진행중, 2승인완료, 3반려, 4승인취소
        , dealNo: $('#TB06082P_dealNo').val()               // 딜번호
        , prdtCd: $('#TB06082P_prdtCd').val()               // 상품코드
        , decdJobDcd: $('#TB06082P_decdJobDcd').val()       // 결재업무구분코드
        , scrnNo: $('#TB06082P_scrnNo').val()               // 화면번호
        , apvlRqstCntn: $('#TB06082P_apvlRqstCntn').val()   // 승인요청내용
        , excSeq: $('#TB06082P_excSeq').val() || 0          // 실행순번
        , rqstSq: $('#TB06082P_rqstSq').val() || 0          // 신청순번
        , trSeq: $('#TB06082P_trSeq').val() || 0            // 거래순번
        , dcfcAnnoCntn: $('#TB06082P_dcfcAnnoCntn').val()   // 결재자주석내용
        , rjctRsnCntn: $('#TB06082P_rjctRsnCntn').val()     // 반려사유내용
    }

    $.ajax({
        type: "POST",
        url: "/TB06082P/decdUpdate",
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
                TB06082P_closeModal();
                const url = window.location.pathname;
                const menuId = url.split("/")[1]
                $(`div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`).prop("hidden", true);
            }
            // 실패
            else {
                Swal.fire({
                    icon: "warning",
                    text: `${text} 실패!`,
                });
            }
        },
    });

}