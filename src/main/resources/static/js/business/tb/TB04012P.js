/**
 * 모달 팝업 show
 */
function callTB04012P(prefix){
	$('#TB04012P_prefix').val(prefix);
	$('#modal-TB04012P').modal('show');
	indexChangeHandler("TB04012P");
}

/**
 * 공동투자 부점세팅
 */
const fnSetDlDprt = () => {
// 모달닫을때 공동투자 부점있으면 세팅
		$("#dlDprtCd1").val($("#TB04012P_dlDprtCd1_dlDprtCd").val());
		$("#dlDprtCd2").val($("#TB04012P_dlDprtCd2_dlDprtCd").val());
		$("#dlDprtCd3").val($("#TB04012P_dlDprtCd3_dlDprtCd").val());
}

/**
 * close TB04012P modal
 */
function modalClose_TB04012P() {

	fnSetDlDprt();
	$('#modal-TB04012P').modal('hide');
};
/**
 * 관리점 input 초기화 >
 * @param {this}
 */
function fnDelDprt (obj) {
	let id = obj.id;
	if (id === "delDprt1") {
		$("#TB04012P_dlDprtCd1_dlDprtCd").val(''); 
		$("#TB04012P_dlDprtCd1_dlDprtNm").val('');
	} else if (id === "delDprt2") {
		$("#TB04012P_dlDprtCd2_dlDprtCd").val('');
		$("#TB04012P_dlDprtCd2_dlDprtNm").val('');
	} else if (id === "delDprt3") {
		$("#TB04012P_dlDprtCd3_dlDprtCd").val('');
		$("#TB04012P_dlDprtCd3_dlDprtNm").val('');
	} else {
		
	}
}