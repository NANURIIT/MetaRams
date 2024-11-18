/*$(document).ready(function () {
	keyDownEnter();
});
*/
/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callDS01023S(prefix) {
	reset_DS01023S();
	$('#prefix').val(prefix);
	$('#modal-DS01023S').modal('show');

}


/**
 * 모달 초기화
 */
function reset_DS01023S(){
	//추후에 설정
}
	
function modalClose_DS01023S() {
	$('#modal-DS01023S').modal('hide');
}
	
