var ldvdCd;
var mdvdCd;
var sdvdCd;

$(document).ready(function() {
	setRsltnDt();
	loadSelectBoxContents();

});



// 셀렉트박스 내용
function loadSelectBoxContents() {
	loadRglrReprtCcd();			// 정기보고구분
	loadInspctDprtCcd();		// 심사부서
	loadRiskInspctMngSttsCd();	// 관리단계분류
	loadFncGdsDvdCd();			// 금융상품분류
}



// 정기보고구분
function loadRglrReprtCcd() { 
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R017",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44060S_rglrReprtCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44060S_rglrReprtCcd').html(html);
		}
	});
}

// 심사부서
function loadInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44060S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44060S_inspctDprtCcd').html(html);
		}
	});
}

// 관리단계분류 리스크심사관리단계코드
function loadRiskInspctMngSttsCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R012",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44060S_riskInspctMngSttsCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44060S_riskInspctMngSttsCd').html(html);
		}
	});
};


// 금융상품분류
function loadFncGdsDvdCd() { 
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44060S_fncGdsDvdCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44060S_fncGdsDvdCd').html(html);
		}
	});
}
