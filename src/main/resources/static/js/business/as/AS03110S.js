$(document).ready(function() {

	setKeyFunction_AS03110S();
	//window.location.replace("AS03110S");
	
	// 1개월전 ~ 오늘일자 디폴트 세팅
	$('#AS03110S_FromDate').val(addMonth(getToday(), -1));	
	$('#AS03110S_ToDate').val(getToday());
});

// 유효성 검사용 날짜패턴
var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

function setKeyFunction_AS03110S() {

	$("input[id=AS03110S_FromDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			assignmentSearch();
		}
	})
	$("input[id=AS03110S_ToDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			assignmentSearch();
		}
	});
};

function assignmentSearch() {

	let AS03110S_FromDate = $('#AS03110S_FromDate').val();
	let AS03110S_ToDate = $('#AS03110S_ToDate').val();

	if (!isEmpty(AS03110S_FromDate) && !isEmpty(AS03110S_ToDate)) {					// 둘다있을경우
		if (pattern.test(AS03110S_FromDate) && pattern.test(AS03110S_ToDate)) {
			businessFunction();
		} else {
			alertPopup();
		}
	} else if (!isEmpty(AS03110S_FromDate) && isEmpty(AS03110S_ToDate)) {			// 시작일자만 있을경우
		if (pattern.test(AS03110S_FromDate)) {
			businessFunction();
		} else {
			alertPopup();
		}
	} else if (isEmpty(AS03110S_FromDate) && !isEmpty(AS03110S_ToDate)) {			// 종료일자만 있을경우
		if (pattern.test(AS03110S_ToDate)) {
			businessFunction();
		} else {
			alertPopup();
		}
	} else {
		alertPopup();
	}
	
	function alertPopup(){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "필수 입력값을 확인해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var dtoParam = {
			"start": AS03110S_FromDate
			, "end": AS03110S_ToDate
		};

		$.ajax({
			type: "GET",
			url: "/assignmentSearch",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#AS03110S_ibDealList').html(html);

				if (dealList.length > 0) {
					$.each(dealList, function(key, value) {

						html += '<tr ondblclick="movePage(this);">';
						html += '<td>' + (value.fstRgstDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') + '</td>';		// 접수배정일
						html += '<td>' + value.ibDealNo + '</td>';														// deal번호
						html += '<td>' + value.riskInspctCcdNm + '</td>';												// 신규/재부의명
						html += '<td>' + value.lstCCaseCcdNm; + '</td>';												// 부수안건명
						html += '<td>' + value.ibDealNm + '</td>';														// 안건명
						html += '<td>' + value.ownpNm + '</td>';														// 심사역이름
						html += '<td>' + value.hdqtCdNm + '</td>';														// 본부명
						html += '<td>' + value.dprtNm + '</td>';														// 부서
						html += '<td>' + value.chrgpEno + '</td>';														// 직원
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';												// 진행상태명
						html += '<td style="display:none;">' + value.inspctPrgrsStCd + '</td>';							// 진행상태
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';							// 신규/재부의
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';								// 부수안건
						html += '<td style="display:none;">' + value.hdqtCd + '</td>';									// 본부
						html += '</tr>';
					})
				} else {
					html += '<tr>';
					html += '<td colspan="10" style = "text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}

				$('#AS03110S_ibDealList').html(html);
			}

		});
	}
};

/* 더블클릭 했을시 이동*/
function movePage(e) {
	var tr = $(e);
	var td = tr.children();
	var ibDealNo = td.eq(1).text();
	var inspctPrgrsStCd = Number(td.eq(10).text());
	var riskInspctCcd = td.eq(11).text();
	var lstCCaseCcd = td.eq(12).text();
	
	sessionStorage.setItem("ibDealNo", ibDealNo);
	sessionStorage.setItem("riskInspctCcd", riskInspctCcd);
	sessionStorage.setItem("lstCCaseCcd", lstCCaseCcd);
	sessionStorage.setItem("inspctPrgrsStCd", inspctPrgrsStCd);
		
	if(inspctPrgrsStCd < 300){
		location.href = "/TB04010S";
	} else {
		location.href = "/TB05040S";
	}
	
}
