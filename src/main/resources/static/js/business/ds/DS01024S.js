/*$(document).ready(function () {
	keyDownEnter();
});
*/
/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callDS01024S(prefix) {
	reset_DS01024S();
	$('#prefix').val(prefix);
	$('#modal-DS01024S').modal('show');

}


/**
 * 모달 초기화
 */
function reset_DS01024S(){
	//추후에 설정
}
	
function modalClose_DS01024S() {
	$('#modal-DS01024S').modal('hide');
}
	
