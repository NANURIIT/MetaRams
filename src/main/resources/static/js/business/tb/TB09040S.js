$(document).ready(function() {
	setRsltnDt();
	loadSelectBoxContents();
});

// 금일 날짜 세팅
function setRsltnDt() {
	$('#TB09040S_stdYrMm').val(getToday().substr(0, 7));
}

function loadSelectBoxContents() {

	var item = '';
	item += 'I011';							// 심사진행상태코드
	item += '/' + 'R011';					// 정기보고구분코드
	item += '/' + 'I010';					// 심사부서구분코드
	item += '/' + 'R015';					// 리스크심사관리단계코드
	item += '/' + 'F007';					// 금융상품분류코드

	getSelectBoxList('TB09040S', item);
}

function getDealInfo() {

	var stdYrMm = $('#TB09040S_stdYrMm').val();
	var dprtCd = $('#TB09040S_dprtCd').val();
	var chrg_empNo = $('#TB09040S_chrg_empNo').val();
	var inspctPrgrsStCd = $('#TB09040S_I011').val();
	var rglrReprtCcd = $('#TB09040S_R011').val();
	var inspctDprtCcd = $('#TB09040S_I010').val();
	var own_empNo = $('#TB09040S_own_empNo').val();
	var riskInspctMngSttsCd = $('#TB09040S_R015').val();
	var fncGdsDvdCd = $('#TB09040S_F007').val();
	var dealNm = $('#dealNm').val();

	var dtoParam = {
		"stdYrMm": stdYrMm
		, "dprtCd": dprtCd
		, "chrg_empNo": chrg_empNo
		, "inspctPrgrsStCd": inspctPrgrsStCd
		, "rglrReprtCcd": rglrReprtCcd
		, "inspctDprtCcd": inspctDprtCcd
		, "own_empNo": own_empNo
		, "riskInspctMngSttsCd": riskInspctMngSttsCd
		, "fncGdsDvdCd": fncGdsDvdCd
		, "dealNm": dealNm
	};

	$.ajax({
		type: "GET",
		url: "/TB09040S/getDealInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var html = '';
			var dealList = data;
			$('#TB09040S_dealList').html(html);

			if (dealList.length > 0) {
				$.each(dealList, function(key, value) {
					html += '<tr ondblclick="setTabContents(this);">';
					html += '<td>' + value.dealNo + '</td>';
					html += '<td style="display:none;">' + value.mtrDcd + '</td>';
					html += '<td>' + value.mtrDcdNm + ' (' + value.mtrDcd + ')' + '</td>';
					html += '<td style="display:none;">' + value.jdgmDcd + '</td>';
					html += '<td>' + value.jdgmDcdNm + ' (' + value.jdgmDcd + ')' + '</td>';
					html += '<td style="display:none;">' + value.ownPEno + '</td>';
					if (isNotEmpty(value.ownPEno)) {
						html += '<td>' + handleNullData(value.ownPNm) + ' (' + value.ownPEno + ')</td>';
					} else {
						html += '<td></td>';
					}
					html += '<td style="display:none;">' + value.mtrPrgSttsDcd + '</td>';
					html += '<td>' + value.mtrPrgSttsDcdNm + '</td>';
					html += '<td class="text-left">' + value.mtrNm + '</td>';
					html += '</tr>';
				})
			} else {
				html += '<tr>';
				html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#TB09040S_dealList').html(html);

			// 세션체크 ajax 동기화문제로 미사용
			//checkSession();
		}
	});
	
}	


