/*$(document).ready(function () {
	keyDownEnter();
});
*/
/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callDS01021S(prefix) {
	reset_DS01021S();
	$('#prefix').val(prefix);
	$('#modal-DS01021S').modal('show');

}


/**
 * 모달 초기화
 */
function reset_DS01021S(){
	//추후에 설정
}
	
function modalClose_DS01021S() {
	$('#modal-DS01021S').modal('hide');
}
	
