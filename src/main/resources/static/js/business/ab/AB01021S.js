//DPR 등록 
$(document).ready(function() {
	loadTabChangeButton();
	
	
});


function loadTabChangeButton(){
	//공동영업관리자/협업부서
	$('#comAdminTab').click(function(){
		$("#comAdminBtn").show();
		$("#comDprtBtn").hide();
		$("#dsgnUsrBtn").hide();
	});
	
	$('#comDprtTab').click(function(){
		$("#comDprtBtn").show();
		$("#comAdminBtn").hide();
		$("#dsgnUsrBtn").hide();
	});
	$('#dsgnUsrTab').click(function(){
		$("#dsgnUsrBtn").show();
		$("#comAdminBtn").hide();
		$("#comDprtBtn").hide();
	});
	
	//관련보고서
	$('#callTab').click(function(){
		$("#saveCallBtn").show();
		$("#saveDprBtn").hide();
	});
	
	$('#dprTab').click(function(){
		$("#saveDprBtn").show();
		$("#saveCallBtn").hide();
	});
}





