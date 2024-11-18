$(document).ready(function() {
	touchSpin();
	loadSelectBoxContents();
	setRsltnDt();
});

function touchSpin() {
	//TouchSpin
	$(".touchspin").TouchSpin({
		verticalbuttons: true,
		buttondown_class: 'btn btn-white',
		buttonup_class: 'btn btn-white'
	});
}

// 셀렉트박스 내용 취득
function loadSelectBoxContents() {
	loadInspctCnfrncCcd();			// 전결협의체
}

// 전결협의체
function loadInspctCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04310S_inspctCnfrncCcd').html(html);			// 조회창 - 전결협의체

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04310S_inspctCnfrncCcd').html(html);
		}
	});
}

function setRsltnDt() {
	var today = new Date();
	var past = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());	// 한달전

	var year = past.getFullYear();
	var month = ('0' + (past.getMonth() + 1)).slice(-2);
	var day = ('0' + past.getDate()).slice(-2);

	var stringPast = year + '-' + month + '-' + day;

	$('#AS04310S_rsltnDt_start').val(stringPast);
	$('#AS04310S_rsltnDt_end').val(getToday());
}

function searchDeals() {
	var inspctCnfrncCcd = $('#AS04310S_inspctCnfrncCcd').val();
	var stdYr = $('#AS04310S_stdYr').val();
	var inspctCnfrncSqcSq = $('#AS04310S_inspctCnfrncSqcSq').val();
	var rsltnDtStart = $('#AS04310S_rsltnDt_start').val();
	var rsltnDtEnd = $('#AS04310S_rsltnDt_end').val();

	var paramData = {
		"inspctCnfrncCcd": inspctCnfrncCcd
		, "stdYr": stdYr
		, "inspctCnfrncSqcSq": inspctCnfrncSqcSq
		, "rsltnDtStart": rsltnDtStart
		, "rsltnDtEnd": rsltnDtEnd
	};

	$.ajax({
		type: "GET",
		url: "/AS04310S/searchDeals",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = '';
			var dealList = data;
			$('#AS04310S_dealList').html(html);

			if (dealList.length > 0) {
				$.each(dealList, function(key, value) {
					html += "<tr>";
					html += "<td>" + value.inspctCnfrncCcdNm + "</td>";
					html += "<td>" + value.inspctCnfrncSqcSq + "</td>";
					html += "<td>" + value.rsltnDt + "</td>";
					html += "<td>" + value.rnkNo + "</td>";
					html += "<td>" + value.hdqtNm + "</td>";
					html += "<td>" + value.dprtNm + "</td>";
					html += "<td>" + value.lstCCaseCcdNm + "</td>";
					html += "<td>" + value.riskInspctCcdNm + "</td>";
					html += "<td>" + value.ibDealNm + "</td>";
					html += "<td>" + value.checkItemCdNm + "</td>";
					html += "<td>" + value.crncyAmt + "</td>";
					html += "<td>" + value.rcgAmt + "</td>";
					html += "<td>" + value.invstCrncyCdNm + "</td>";
					html += "<td>" + value.invstPrdMmC + "</td>";
					html += "<td>" + value.cnfrncNtmCndtlCntnt + "</td>";
					html += "</tr>";
				});
				$('#AS04310S_dealList').html(html);
			}
		}
	});
}

function functionExportExcel() {

	var stDate = $('#AS04310S_rsltnDt_start').val();
	var edDate = $('#AS04310S_rsltnDt_end').val();

	var filename = '회의결과RAW데이터_' + stDate + '_' + edDate + '.xlsx';
	
	exportExcel(filename);
}




