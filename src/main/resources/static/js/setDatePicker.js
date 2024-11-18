/** onload **/
$(function () {
	// datepicker 초기화
	$('.input-group.date').datepicker({
		format: "yyyy-mm-dd",
		todayBtn: "linked",
		keyboardNavigation: false,
		forceParse: false,
		calendarWeeks: false,
		autoclose: true,
		language: "ko"
	});
	$('.input-group.month').datepicker({
		format: "yyyy-mm",
		keyboardNavigation: false,
		forceParse: false,
		calendarWeeks: false,
		autoclose: true,
		language: "ko",
		minViewMode: "months",
		startView: "months"
	});
	$('.input-group.clockpicker').clockpicker({
	});
});