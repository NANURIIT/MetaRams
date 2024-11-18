$(document).ready(function() {

	docRdySettings();

});

/**
 * 모달 팝업 show
 */
function callDS01021P(){
	reset_DS01021P();
	$('#modal-DS01021P').modal('show');
}

/**
 * close TB03021P modal
 */
function modalClose_DS01021P() {
	reset_DS01021P();
	$('#modal-DS01021P').modal('hide');
};

/**
 * reset
 */
function reset_DS01021P() {

};

function docRdySettings() {
	//modalShowFunction();
	//keyDownEnter_TB03021P();
}

function validateDt() {
	Swal.fire({
		icon              : 'error'
		, title             : "Error!"
		, text              : "신청 접수 기간이 아닙니다. (2027/06/20 ~ 2036/06/20)"
		, confirmButtonText : "확인"
	});
}
