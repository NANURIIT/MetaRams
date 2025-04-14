

/**
 * 첨부파일구분코드 팝업
 */
function callFileUploadPopup(prefix) {
	$('#prefix_FileUploadPopup').val(prefix);
	$('#modal-FileUploadPopup').modal('show');
	indexChangeHandler("FileUploadPopup");
}

/**
 * 모달 초기화
 */
function modalReset() {

	$('#TB03031P_metTitl').val("");				// 미팅제목
	$('#TB03031P_metDt').val("");				// 미팅일자
	$('#TB03031P_metTm').val("");				// 미팅시간
	$('#TB03031P_metPrps').val("");				// 미팅목적
	$('#TB03031P_metCntnt').val("");			// 미팅내용
	$('#TB03031P_cstmNm').val("");				// 고객명
	$('#TB03031P_cstmPhNo').val("");			// 고객연락처
	$("#TB03031P_rm_entpCd").val("");			// 업체코드
	$("#TB03031P_rmSq").val("");				// rm일련번호

}