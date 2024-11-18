
/**
 * 모달 팝업 show
 */
function callAS03010P(prefix){
	$('#AS03010S_prefix').val(prefix);
	$('#modal-AS03010P').modal('show');
}


/**
 * close AS03010P modal
 */
function modalClose_AS03010P() {
	$('#modal-AS03010P').modal('hide');
};