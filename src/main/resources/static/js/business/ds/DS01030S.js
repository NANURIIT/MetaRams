$(document).ready(function() {
	
	setClickEvent();
	
});

function setClickEvent() {
	tabClickEvent();
}

function tabClickEvent() {
	$('.nav-tabs li').click(function () {
		
		var index = $(this).index();

		if (index == 0) {
			$('#acNo').prop('readonly', false);
			$('#btnAcNo').prop("disabled", false);
			
			$('#btn01').prop("disabled", false);
			$('#btn02').prop("disabled", false);
		} else if (index == 1) {
			$('#acNo').prop('readonly', true);
			$('#btnAcNo').prop("disabled", true);
			$('#acNo').val('');
			$('#acNm').val('');
			
			$('#btn01').prop("disabled", true);
			$('#btn02').prop("disabled", true);
		}
	})
}