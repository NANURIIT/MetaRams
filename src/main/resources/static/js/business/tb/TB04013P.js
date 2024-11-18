/**
 * 모달 팝업 show
 */
function callTB04013P(prefix){
	$('#TB04013S_prefix').val(prefix);
	$('#modal-TB04013P').modal('show');
}


/**
 * close TB04013P modal
 */
function modalClose_TB04013P() {
	$('#modal-TB04013P').modal('hide');
};