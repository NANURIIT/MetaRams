var ldvdCd;
var mdvdCd;
var sdvdCd;

$(document).ready(function() {
	setRsltnDt();
	loadSelectBoxContents();

});



// 셀렉트박스 내용
function loadSelectBoxContents() {
	loadReprtPrgrsStCd();   	// 보고진행상태코드
	loadRglrReprtCcd();			// 정기보고구분
	loadInspctDprtCcd();		// 심사부서
	loadRiskInspctMngSttsCd();	// 관리단계분류
	loadFncGdsDvdCd();			// 금융상품분류
}


// 보고진행상태코드 == 진행상태코드 
function loadReprtPrgrsStCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#reprtPrgrsStCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#reprtPrgrsStCd').html(html);
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
			$('#MO44030S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44030S_inspctDprtCcd').html(html);
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
			$('#MO44030S_riskInspctMngSttsCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44030S_riskInspctMngSttsCd').html(html);
		}
	});
};


// 정기보고구분
function loadRglrReprtCcd() { 
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R017",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44030S_rglrReprtCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44030S_rglrReprtCcd').html(html);
		}
	});
}


// 금융상품분류
function loadFncGdsDvdCd() { 
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44030S_fncGdsDvdCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44030S_fncGdsDvdCd').html(html);
		}
	});
}



/**
 * 파일ajax 성공시 custom callback 함수
 */
function callbackFile(action, result) {
	var html = '';
	if(action == 'upload'){
		html = makeFilList(html, result);
		$('#MO44030_fileList').append(html);	
	}
	if(action == 'delete'){
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html += makeFilList(html, fileInfo);
		}
		$('#MO44030_fileList').empty();
		$('#MO44030_fileList').append(html);	
	}	
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
	html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
	html += '    </td>';
	html += '    <td><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '</tr>';
	return html;
}



// 금일 날짜 세팅
function setRsltnDt() {
	$('#MO44030S_stdYrMm').val(getToday().substr(0,7));
}
