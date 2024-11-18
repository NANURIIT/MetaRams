$(document).ready(function() {

	setKeyFunction_AS03010S();
	loadSelectBoxContents();
	
	// 1개월전 ~ 오늘일자 디폴트 세팅
	$('#AS03010S_FromDate').val(addMonth(getToday(), -1));	
	$('#AS03010S_ToDate').val(getToday());

});

// 유효성 검사용 날짜패턴
var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

// 알람창 팝업
function alertPopup(t) {
	Swal.fire({
		icon: 'error'
		, title: "Error!"
		, text: t
		, confirmButtonText: "확인"
	});
}

// 엔터키 검색 function 세팅
function setKeyFunction_AS03010S() {
	$("input[id=AS03010S_FromDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	})
	$("input[id=AS03010S_ToDate]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	});
	$("input[id=AS03010S_ibDealNm]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	});
};

//심사 안건 조회
function checkDealSearch(){
	
	let AS03010S_FromDate = $('#AS03010S_FromDate').val();							// DSC일자(시작)
	let AS03010S_ToDate = $('#AS03010S_ToDate').val();								// DSC일자(종료)
	let AS03010S_dprtCd = $('#AS03010S_dprtCd').val();								// 부서
	let AS03010S_invstCrncyCd = $('#AS03010S_invstCrncyCd').val();					// 통화
	let AS03010S_wonAmtCd = $('#AS03010S_wonAmtCd').val();							// 단위
	let AS03010S_ibDealNm = $('#AS03010S_ibDealNm').val();							// ibDeal명

	if (!isEmpty(AS03010S_FromDate) && !isEmpty(AS03010S_ToDate)) {					// 둘다있을경우
		if (pattern.test(AS03010S_FromDate) && pattern.test(AS03010S_ToDate)) {
			businessFunction();
		} else {
			alertPopup("필수 입력값을 확인해주세요.");
		}
	} else if (!isEmpty(AS03010S_FromDate) && isEmpty(AS03010S_ToDate)) {			// 시작일자만 있을경우
		if (pattern.test(AS03010S_FromDate)) {
			businessFunction();
		} else {
			alertPopup("필수 입력값을 확인해주세요.");
		}
	} else if (isEmpty(AS03010S_FromDate) && !isEmpty(AS03010S_ToDate)) {			// 종료일자만 있을경우
		if (pattern.test(AS03010S_ToDate)) {
			businessFunction();
		} else {
			alertPopup("필수 입력값을 확인해주세요.");
		}
	} else {
		alertPopup("DSC일자를 확인해주세요.");
	}
	
	function businessFunction() {
		var dtoParam = {
			"start": AS03010S_FromDate
			, "end": AS03010S_ToDate
			, "dprtCd": AS03010S_dprtCd
			, "invstCrncyCd": AS03010S_invstCrncyCd
			, "wonAmtCd": AS03010S_wonAmtCd
			, "ibDealNm": AS03010S_ibDealNm
		};
		
		$.ajax({
			type: "GET",
			url: "/AS03010S/checkDealSearch",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#AS03010S_checkDealList').html(html);
				if (dealList.length > 0) {
					$.each(dealList, function(key, value){
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + value.ibDealNo + '</td>';														// deal번호
						html += '<td>' + (value.dscDt).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') + '</td>';			// DSC일자
						html += '<td>' + value.ibDealNm + '</td>';														// deal명
						html += '<td class="text-right">' + Number(value.ptcpAmt).toLocaleString() + '</td>';			// 참여금액
						html += '<td>' + value.wrtDt + '</td>';															// 기표일(예정)
						html += '<td>' + value.mtrtDt + '</td>';														// 만기일(예정)
						html += '<td>' + value.hdqtCd + '</td>';														// 본부
						html += '<td>' + value.dprtCd + '</td>';														// 부서
						html += '<td>' + value.chrgPEno + '</td>';														// 직원
						//html += '<td>' + value.coprtnTypCd + '</td>';													// 협업유형
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';												// 심사진행상태코드명
						html += '<td class="text-right">' + Number(value.tlErnAmt).toLocaleString() + '</td>';			// 전체수익
						html += '<td class="text-right">' + Number(value.rcvblErnAmt).toLocaleString() + '</td>';		// 수수료수익
						html += '<td class="text-right">' + Number(value.wrtErnAmt).toLocaleString() + '</td>';			// 투자수익
						html += '<td>' + value.entpRnm + '</td>';														// 업체명
						html += '<td>' + value.crdtGrdCd + '</td>';														// 신용등급
						html += '<td>' + value.gdsDvd1Nm + '</td>';														// 상품1
						html += '<td>' + value.gdsDvd2Nm + '</td>';														// 상품2
						html += '<td>' + value.gdsDvd3Nm + '</td>';														// 상품3
						html += '<td>' + value.gdsDvd4Nm + '</td>';														// 상품4
						html += '<td>' + value.invstNtnCd + '</td>';													// 투자국가
						html += '<td>' + value.invstCrncyCd + '</td>';													// 투자통화
						html += '<td class="text-right">' + Number(value.crncyAmt).toLocaleString() + '</td>';			// 통화금액
						
						html += '<td style="visibility:hidden;position:absolute">' + value.riskInspctCcdNm + '</td>';	// 신규/재부의정보명
						html += '<td style="visibility:hidden;position:absolute">' + value.lstccaseCcdNm + '</td>';		// 부수안건구분코드명
						html += '<td style="visibility:hidden;position:absolute">' + value.inspctPrgrsStCd + '</td>';	// 심사진행상태코드
						html += '<td style="display:none;">' + value.ownPNm + '</td>';									// 소유자명
						html += '<td style="display:none;">' + value.fstRgstDt + '</td>';								// 최초등록일자
						html += '<td style="display:none;">' + value.riskInspctRsltnCcd + '</td>';						// 리스크심사결의구분코드
						html += '<td style="display:none;">' + value.ownPEno + '</td>';									// 소유자번호
						html += '<td style="visibility:hidden;position:absolute">' + value.riskInspctCcd + '</td>';		// 신규/재부의정보
						html += '<td style="visibility:hidden;position:absolute">' + value.lstccaseCcd + '</td>';		// 부수안건구분코드
						html += '</tr>';
					})
				} else {
					html += '<tr>';
					html += '<td colspan="22" style = "text-align: center"> 데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#AS03010S_checkDealList').html(html);
			}
		});
	}
};

// 더블클릭 시 상세정보
function setDealInfo(e) {
	var tr = $(e);
	var td = $(tr).children();
	$('#AS03010S_selectedDealNo').val(td.eq(0).text());				// IBDEAL 번호

	$('#AS03010S_detail_ibDealNo').val(td.eq(0).text());			// IBDEAL 번호
	$('#AS03010S_detail_riskInspctCcd').val(td.eq(22).text());		// 신규/재부의정보
	$('#AS03010S_riskInspctCcd').val(td.eq(29).text());				// 신규/재부의정보
	
	$('#AS03010S_detail_lstCCaseCcd').val(td.eq(23).text());		// 부수안건정보
	$('#AS03010S_lstCCaseCcd').val(td.eq(30).text());				// 부수안건정보
	$('#AS03010S_detail_ibDealNm').val(td.eq(2).text());			// DEAL 명

	$('#AS03010S_detail_hdqtCd').val(td.eq(6).text());				// 본부
	$('#AS03010S_detail_dprtCd').val(td.eq(7).text());				// 영업부
	$('#AS03010S_detail_chrgPEno').val(td.eq(8).text());			// 직원
	$('#AS03010S_detail_inspctPrgrsStCd').val(td.eq(9).text());		// 진행상태
	
	$('#asmt_empNm').val(td.eq(25).text());
	$('#AS03010S_fstRgstDt').val(td.eq(26).text());
	$('#AS03010S_inspctCnfrncCcd').val(td.eq(27).text()).attr('selected', true);
	$('#asmt_eno').val(td.eq(28).text());

	var inspctPrgrsStCd = Number(td.eq(24).text());

	if (inspctPrgrsStCd > 210) {
		$('.mt-2 .btn').prop('disabled', true);
	} else {
		$('.mt-2 .btn').prop('disabled', false);
	}
};

// 셀렉트박스 세팅
function loadSelectBoxContents() {
	loadDprtCd();			// 부서코드
	loadInvstCrncyCd();		// 통화코드
	loadInspctCnfrncCcd();	// 전결협의체(전결구분코드)
}

// 부서코드 selectbox
function loadDprtCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R015",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03010S_dprtCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				html += '<option value="">전체</option>';
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03010S_dprtCd').html(html);
		}
	});
}

// 통화코드 selectbox
function loadInvstCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03010S_invstCrncyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				html += '<option value="">전체</option>';
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03010S_invstCrncyCd').html(html);
		}
	});
}

// 전결협의체(결의협의회구분코드)
function loadInspctCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03010S_inspctCnfrncCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03010S_inspctCnfrncCcd').html(html);
		}
	});
}

// 안건접수버튼 function
function receiptDeal() {
	let ibDealNo = $('#AS03010S_selectedDealNo').val();				// IBDEAL번호
	let ownPEno = $('#asmt_eno').val();								// 심사역
	let fstRgstDt = $('#AS03010S_fstRgstDt').val();					// 접수배정일
	let inspctCnfrncCcd = $('#AS03010S_inspctCnfrncCcd').val();		// 전결협의체
	let inspctProgrsStCd = "200";									// 심사진행상태코드
	var riskInspctCcd = $('#AS03010S_riskInspctCcd').val();			// 신규/재부의정보
	var lstCCaseCcd = $('#AS03010S_lstCCaseCcd').val();				// 부수안건정보
	
	var dtoParam = {
		"ibDealNo": ibDealNo
		, "ownPEno": ownPEno
		, "fstRgstDt": fstRgstDt
		, "inspctCnfrncCcd": inspctCnfrncCcd
		, "inspctProgrsStCd": inspctProgrsStCd
		,"riskInspctCcd": riskInspctCcd,
		"lstCCaseCcd": lstCCaseCcd
	};

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(ownPEno) && pattern.test(fstRgstDt)) {
			businessFunction();
		} else {
			alertPopup("심사역 입력값을 확인해주세요.");
		}
	} else {
		alertPopup("Deal 정보를 선택해주세요.");
	}
	
	function businessFunction() {
		$.ajax({
			type: "POST",
			url: "/AS03010S/receiptDeal",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "안건접수처리 완료하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			}, error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "안건접수처리 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
	
}

// 안건반송버튼 function
function returnDeal() {
	let ibDealNo = $('#AS03010S_selectedDealNo').val();				// IBDEAL번호
	let inspctProgrsStCd = "210";									// 심사진행상태코드
	var riskInspctCcd = $('#AS03010S_riskInspctCcd').val();			// 신규/재부의정보
	var lstCCaseCcd = $('#AS03010S_lstCCaseCcd').val();				// 부수안건정보
	
	var dtoParam = {
		"ibDealNo": ibDealNo,
		"inspctProgrsStCd": inspctProgrsStCd,
		"riskInspctCcd": riskInspctCcd,
		"lstCCaseCcd": lstCCaseCcd
	};
	
	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		alertPopup("Deal 정보를 선택해주세요.");
	}
	
	function businessFunction() {
		$.ajax({
			type: "POST",
			url: "/AS03010S/returnDeal",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "안건반송처리 완료하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			}, error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "안건반송처리 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
	
}
