/**
 * 버튼 토글(색변화)
 */
$(function() {

	$('.toggleBtn1').click(function() {
		$(this).parent().find('.toggleBtn1').removeClass('btn-default');
		$(this).parent().find('.toggleBtn1').addClass('btn-info');
		
		$(this).parent().find('.toggleBtn2').removeClass('btn-info');
		$(this).parent().find('.toggleBtn2').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn3').removeClass('btn-info');
		$(this).parent().find('.toggleBtn3').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn4').removeClass('btn-info');
		$(this).parent().find('.toggleBtn4').addClass('btn-default');
	});

	$('.toggleBtn2').click(function() {
		$(this).parent().find('.toggleBtn1').removeClass('btn-info');
		$(this).parent().find('.toggleBtn1').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn2').removeClass('btn-default');
		$(this).parent().find('.toggleBtn2').addClass('btn-info');
		
		$(this).parent().find('.toggleBtn3').removeClass('btn-info');
		$(this).parent().find('.toggleBtn3').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn4').removeClass('btn-info');
		$(this).parent().find('.toggleBtn4').addClass('btn-default');
	});

	$('.toggleBtn3').click(function() {
		$(this).parent().find('.toggleBtn1').removeClass('btn-info');
		$(this).parent().find('.toggleBtn1').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn2').removeClass('btn-info');
		$(this).parent().find('.toggleBtn2').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn3').removeClass('btn-default');
		$(this).parent().find('.toggleBtn3').addClass('btn-info');
		
		$(this).parent().find('.toggleBtn4').removeClass('btn-info');
		$(this).parent().find('.toggleBtn4').addClass('btn-default');
	});
	
	$('.toggleBtn4').click(function() {
		$(this).parent().find('.toggleBtn1').removeClass('btn-info');
		$(this).parent().find('.toggleBtn1').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn2').removeClass('btn-info');
		$(this).parent().find('.toggleBtn2').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn3').removeClass('btn-info');
		$(this).parent().find('.toggleBtn3').addClass('btn-default');
		
		$(this).parent().find('.toggleBtn4').removeClass('btn-default');
		$(this).parent().find('.toggleBtn4').addClass('btn-info');
	});
});