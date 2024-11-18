$(document).ready(function() {
    loadSelectBox(); // 공통코드 조회
});

/*
 * 공통코드 조회
 */
function loadSelectBox(){
    loadOblgPfrmCcd();      // 의무이행구분코드
    loadInspctDprtCcd();    // 심사부서코드
    // loadRsltnCnfrncCcd();   // 결의협의회구분코드
    // loadRsltnRsltCd();      // 결의결과코드
    loadReprtPrgrsStCd();   // 보고진행상태코드
    // loadLstCCaseCcd();      // 부수안건구분코드
    // loadRiskInspctCcd();    // 리스크심사구분코드
}

var ACPMCount = 0;	// 승인조건 사전관리 ID컨트롤 상수


// 테이블 행추가 버튼 클릭
function addACPMRow() {
	let ROW_HTML = '';
		ROW_HTML += '<tr>';
		ROW_HTML += '   <td><input type="checkbox"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '   <td><input type="text"></td>';
		ROW_HTML += '</tr>';
	$('#pacmList').append(ROW_HTML);
}

// 테이블 행삭제 버튼기능
function delACPMRow(tableId) {
	
	var tableIdCheckBox = '#' + tableId + ' input:checkbox:checked';
	var text = "";
	
	if(tableId == 'pacmList'){
		text = "체크박스를 확인해주세요."
	} else if(tableId == 'pacmList'){
		text = "체크박스를 확인해주세요."
	} else {
		text = "체크박스를 확인해주세요."
	}
	
	// tr 체크된 갯수 확인
	var checkboxes = $(tableIdCheckBox);

	if (checkboxes.length > 0) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: text
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {
		checkboxes.each(function(i) {

			var tr = checkboxes.parent().parent();
			var td = $(tr).children();
			var ibDealNo = td.eq(1).text();
			
			tr.remove();
		})
	}
}


// 테이블 행 저장
function clickSaveGroupCode() {
	let groupCodeList = new Array();

	let tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let groupCode = new Object();

		let groupCodeInput        = $(tr[i]).find("td:eq(1)").find("input");
		let groupCodeNameInput    = $(tr[i]).find("td:eq(2)").find("input");
		let groupCodeExplainInput = $(tr[i]).find("td:eq(3)").find("input");
		let groupCodeLengthInput  = $(tr[i]).find("td:eq(5)").find("input");
		let groupCodeUseYn        = $(tr[i]).find("td:eq(6)").find(".group_code_use_yn").prop("checked");
		let groupCodeUseYnCheck   = $(tr[i]).find("td:eq(6)").find(".hidden_yn").val();
		
		if (groupCodeInput.length == 1) {
			if (groupCodeInput.val().length > 4) {
				openPopup({title: '실패',text: '그룹코드는 4자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeInput.focus();
						});
					}
				});
				return;
			} else if (!groupCodeInput.val()) {
				openPopup({title: '실패',text: '그룹코드를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrp = groupCodeInput.val();
		}

		if (groupCodeNameInput.length == 1) {
			if (!groupCodeNameInput.val()) {
				openPopup({title: '실패',text: '그룹명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeNameInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdNm = groupCodeNameInput.val();
		}

		if (groupCodeLengthInput.length == 1) {
			if (!groupCodeLengthInput.val()) {
				openPopup({title: '실패',text: '코드 길이를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			} else if (isNaN(groupCodeLengthInput.val())) {
				openPopup({title: '실패',text: '코드 길이를 숫자로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cdLngth = groupCodeLengthInput.val();
		}

		if (groupCodeExplainInput.length == 1) {
			if (!groupCodeExplainInput.val()) {
				openPopup({title: '실패',text: '코드 설명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeExplainInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrpExpl = groupCodeExplainInput.val();
		}

		if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
			groupCode.useF = groupCodeUseYn ? 'Y' : 'N';
		}

		if (!(Object.keys(groupCode).length === 0)) {
			groupCode.oldCmnsCdGrp = $(tr[i]).find("td:eq(0)").find("input").attr("id");
			groupCodeList.push(groupCode);
		}
	}

	if (groupCodeList.length != 0) {
		saveGroupCode(groupCodeList);
	}
}

/*
 *SelectBox Code
 */
// 의무이행구분코드
function loadOblgPfrmCcd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/O004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#oblgPfrmCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#oblgPfrmCcd').html(html);
		}
	});
}

/* ------------------------ 공통코드 조회함수 목록 -------------------------- */
// 심사부서코드
function loadInspctDprtCcd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#inspctDprtCcd').html(html);
		}
	});
}

// 신규/재부의
function loadRiskInspctCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R013",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#riskInspctCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#riskInspctCcd').html(html);
		}
	});
}

// 부수안건
function loadLstCCaseCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/L001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#lstCCaseCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#lstCCaseCcd').html(html);
		}
	});
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

// 결의협의회구분코드 == 결의협의체
function loadRsltnCnfrncCcd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R007",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#inspctCnfrncCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#inspctCnfrncCcd').html(html);
		}
	});
}

// 결의결과코드 == 결과
function loadRsltnRsltCd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#rsltnRsltCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#rsltnRsltCd').html(html);
		}
	});
}
/* ------------------------ 공통코드 조회함수 목록 끝-------------------------- */

// 승인조건 사전관리 조회
function getPacmList() {

	// 테스트 원활하게 하기 위해 부서와 담당자 주석처리

	let oblgPfrmCcd 	= $('#oblgPfrmCcd').val();		// 의무이행구분코드
	//let dprtCd			= $('#MO44020S_dprtCd').val();	// 부서
	let dprtCd			= null
	//let ownEno			= $('#MO44020S_empno').val();		// 담당자
	let chrgPEno					= null
	let rprPrgrsStCd 	= $('#reprtPrgrsStCd').val();	// 진행상태
	let inspctDprtCcd	= $('#inspctDprtCcd').val();	// 심사부서
	let ownPEno		= $('#MO44020S_judge').val();	// 심사역
	let ibDealNm		= $('#ibDealNm').val();			// 안건명
	let pfrmPlanYn;										// 이행계획 보고대상

	if ($('#MO44020S_dltY').is(":checked"))	{
		pfrmPlanYn = "Y"
	} else {
		pfrmPlanYn = "N"
	}

	// 유효성검사
	if (!isEmpty(oblgPfrmCcd)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "의무이행구분을 선택해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		let params = {
			"dprtCd"	  		: dprtCd,
			"chrgPEno"	  		: chrgPEno,
			"rprPrgrsStCd" 		: rprPrgrsStCd,
			"inspctDprtCcd" 	: inspctDprtCcd,
			"ownPEno"			: ownPEno,
			"ibDealNm"			: ibDealNm,
			"PFRM_PLAN_YN"		: pfrmPlanYn
		}

		$.ajax({
			type: "GET",
			url: "MO44020S/getPacmList",
			data: params,
			dataType: "json",
			success: function (data) {
				let html = '';
				let dealList = data;

				if (dealList.length > 0) {

					$.each(dealList, function (key, value) {
						html += '<tr onclick="setDetails(this)">';
						html += '<td><input type="checkbox" id="check"></td>';			// 체크박스
						if (isEmpty(value.rprPrgrsStCd)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.rprPrgrsStCd + '</td>';				// 진행상태코드
						}
						html += '<td>' + value.ibDealNo + '</td>';						// Deal번호
						html += '<td>' + value.riskInspctCcd + '</td>';					// 신규/재부의
						html += '<td>' + value.lstCCaseCcd + '</td>';					// 부수안건
						html += '<td>' + value.ibDealNm + '</td>';						// 안건명
						html += '<td>' + value.itemSq + '</td>';						// 일련번호
						html += '<td>' + value.invstCrncyCd + '</td>';					// 승인금액통화코드
						html += '<td>' + value.rcgAmt + '</td>';						// 승인금액
						if (isEmpty(value.aplcAmt)) {
							html += '<td>' + '0.000' + '</td>';
						} else {
							html += '<td>' + value.aplcAmt + '</td>';					// 셀다운 대상금액
						}
						if (isEmpty(value.endDtEndDt)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.endDtEndDt + '</td>';				// 셀다운 기한
						}
						if (isEmpty(value.mtrtHldAmt)) {
							html += '<td>' + '0.000' + '</td>';							// 셀다운 대상금액
						} else {
							html += '<td>' + value.mtrtHldAmt + '</td>';				// 만기보유금액
						}
						html += '<td>' + value.opnPrcValAmt + '</td>';					// 잔고
						html += '<td>' + value.pfrmClsfNm + '</td>';					// 이행여부
						html += '<td>' + value.dprtNm + '</td>';						// 부서이름
						html += '<td>' + value.empNm + '</td>';							// 담당자이름
						html += '<td>' + value.inspctDprtCcd + '</td>';					// 심사부서코드
						if (isEmpty(value.ownEmpNm)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.ownEmpNm + '</td>';					// 담당심사역이름
						}
						if (isEmpty(value.rcgRqsDt)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.rcgRqsDt + '</td>';					// 승인요청일
						}
						if (isEmpty(value.rcgDt)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.rcgDt + '</td>';						// 승인일
						}
						if (isEmpty(value.cnfrDt1)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.cnfrDt1 + '</td>';					// 심사역확인일
						}
						if (isEmpty(value.cnfrDt2)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.cnfrDt2 + '</td>';					// 심사부서장확인일
						}
						html += '<td style="display:none">' + value.inspctCnfrncCcd + '</td>';			// 결의협의체
						html += '<td style="display:none">' + value.rsltnDt + '</td>';					// 결의일
						html += '<td style="display:none">' + value.rsltnRsltCd + '</td>';				// 결의결과
						if (isEmpty(value.rsltCntnt)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.rsltCntnt + '</td>';			// 승인조건
						}
						if (isEmpty(value.mainPrgrsSttnCntnt)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.mainPrgrsSttnCntnt + '</td>';		// 참여현황
						}
						if (isEmpty(value.bsnsSttnAndPrspctSmry)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.bsnsSttnAndPrspctSmry + '</td>';	// 진행경과
						}
						if (isEmpty(value.prcsPlanCntnt1)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.prcsPlanCntnt1 + '</td>';			// BaseCase
						}
						if (isEmpty(value.prcsPlanCntnt2)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.prcsPlanCntnt2 + '</td>';			// StressCase
						}
						if (isEmpty(value.rprRsnCntnt)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.rprRsnCntnt + '</td>';				// 기타특이사항
						}
						html += '<td style="display:none">' + value.hiddenRiskInspctCcd + '</td>';;
						html += '<td style="display:none">' + value.hiddenLstCCaseCcd + '</td>';;
					})
				} else {
					html += '<tr>';
					html += '<td colspan="22" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				// 선택 안건정보 초기화
				$('#selectedIbDealNo').val('');
				$('#selectedRiskInspctCcd').val('');
				$('#selectedLstCCaseCcd').val('');
				$('#selectedItemSq').val('');
				$('#selectedOblgPfrmCcd').val('');
				
				$('#pacmList').html(html);

			},
			error: function () {
				alert("조회에 실패하였습니다.");
				location.reload();
			}
		});

	}

};

// 딜 목록 검색후 클릭시 상세내용 set
function setDetails(e) {
	let tr = $(e);		// function을 호출한 곳의 값을 가져온다. (this)
	let td = $(tr).children();

	let ibDealNo				= $(td).eq(2).text();		// Deal번호
	let riskInspctCcd			= $(td).eq(3).text();		// 신규/재부의
	let lstCCaseCcd				= $(td).eq(4).text();		// 부수안건
	let ibDealNm				= $(td).eq(5).text();		// 안건명
	let itemSq					= $(td).eq(6).text();		// 일련번호
	let inspctCnfrncCcd			= $(td).eq(22).text();		// 결의협의체
	let rsltnDt					= $(td).eq(23).text();		// 결의일
	let rsltnRsltCd				= $(td).eq(24).text();		// 결의결과
	let rsltCntnt				= $(td).eq(25).text();		// 승인조건
	let mainPrgrsSttnCntnt		= $(td).eq(26).text();		// 참여현황
	let bsnsSttnAndPrspctSmry	= $(td).eq(27).text();		// 진행경과
	let prcsPlanCntnt1			= $(td).eq(28).text();		// BaseCase
	let prcsPlanCntnt2			= $(td).eq(29).text();		// StressCase
	let rprRsnCntnt				= $(td).eq(30).text();		// 기타특이사항
	let hiddenRiskInspctCcd		= $(td).eq(31).text();		// 신규/재부의코드
	let hiddenLstCCaseCcd		= $(td).eq(32).text();		// 부수안건코드

	$('#ibDealNo').val(ibDealNo);
	$('#riskInspctCcd').val(riskInspctCcd);
	$('#lstCCaseCcd').val(lstCCaseCcd);
	$('#detailIbDealNm').val(ibDealNm);
	$('#itemSq').val(itemSq);
	$('#inspctCnfrncCcd').val(inspctCnfrncCcd);
	$('#rsltnDt').val(rsltnDt);
	$('#rsltnRsltCd').val(rsltnRsltCd);
	$('#rsltCntnt').val(rsltCntnt);
	$('#mainPrgrsSttnCntnt').val(mainPrgrsSttnCntnt);
	$('#bsnsSttnAndPrspctSmry').val(bsnsSttnAndPrspctSmry);
	$('#prcsPlanCntnt1').val(prcsPlanCntnt1);
	$('#prcsPlanCntnt2').val(prcsPlanCntnt2);
	$('#rprRsnCntnt').val(rprRsnCntnt);
	$('#hiddenRiskInspctCcd').val(hiddenRiskInspctCcd);
	$('#hiddenLstCCaseCcd').val(hiddenLstCCaseCcd);
	
	// 선택한 안건 정보 바인드
	$('#selectedIbDealNo').val(ibDealNo);
	$('#selectedRiskInspctCcd').val(hiddenRiskInspctCcd);
	$('#selectedLstCCaseCcd').val(hiddenLstCCaseCcd);
	$('#selectedItemSq').val(itemSq);
	$('#selectedOblgPfrmCcd').val('01');
}

function alertPopup(t) {
	Swal.fire({
		icon: 'error'
		, title: "Error!"
		, text: t
		, confirmButtonText: "확인"
	});
}

// 저장
function save () {

	let ibDealNo 					= $('#ibDealNo').val();					// 딜번호
	let riskInspctCcd 				= $('#hiddenRiskInspctCcd').val();			// 신규/재부의
	let lstCCaseCcd 				= $('#hiddenLstCCaseCcd').val();				// 부수안건
	let itemSq 						= $('#itemSq').val();					// 일련번호
	let mainPrgrsSttnCntnt 			= $('#mainPrgrsSttnCntnt').val();		// 참여현황
	let bsnsSttnAndPrspctSmry 		= $('#bsnsSttnAndPrspctSmry').val();	// 진행경과
	let prcsPlanCntnt1 				= $('#prcsPlanCntnt1').val();			// BaseCase
	let prcsPlanCntnt2 				= $('#prcsPlanCntnt2').val();			// StressCase
	let rprRsnCntnt 				= $('#rprRsnCntnt').val();				// 기타특이사항

	let params = {
		  "oblgPfrmCcd" 			: "01"
		, "ibDealNo" 				: ibDealNo
		, "riskInspctCcd" 			: riskInspctCcd
		, "lstCCaseCcd" 			: lstCCaseCcd
		, "itemSq" 					: itemSq
		, "mainPrgrsSttnCntnt" 		: mainPrgrsSttnCntnt
		, "bsnsSttnAndPrspctSmry"	: bsnsSttnAndPrspctSmry
		, "prcsPlanCntnt1" 			: prcsPlanCntnt1
		, "prcsPlanCntnt2" 			: prcsPlanCntnt2
		, "rprRsnCntnt" 			: rprRsnCntnt
	};

	if (isNotEmpty(ibDealNo) && isNotEmpty(riskInspctCcd) && isNotEmpty(lstCCaseCcd) && isNotEmpty(itemSq)
		&& isNotEmpty(mainPrgrsSttnCntnt) && isNotEmpty(bsnsSttnAndPrspctSmry) && isNotEmpty(prcsPlanCntnt1)
		&& isNotEmpty(prcsPlanCntnt2) && isNotEmpty(rprRsnCntnt)) {

		businessFunction(params);

	} else {

		if (isEmpty(ibDealNo) || isEmpty(riskInspctCcd) || isEmpty(lstCCaseCcd) || isEmpty(itemSq)) {
			alertPopup("조회한 후 해당 딜을 선택해주세요.");
			return false;
		}

		if (isEmpty(mainPrgrsSttnCntnt)) {
			alertPopup("참여현황을 입력해주세요.");
			return false;
		}

		if (isEmpty(bsnsSttnAndPrspctSmry)) {
			alertPopup("진행경과를 입력해주세요.");
			return false;
		}

		if (isEmpty(prcsPlanCntnt1)) {
			alertPopup("BaseCase를 입력해주세요.");
			return false;
		}

		if (isEmpty(prcsPlanCntnt2)) {
			alertPopup("StressCase를 입력해주세요.");
			return false;
		}

		if (isEmpty(rprRsnCntnt)) {
			alertPopup("기타 특이사항을 입력해주세요.");
			return false;
		}

	}

	function businessFunction(params) {

		$.ajax({
			type: "POST",
			url: "/MO44020S/save",
			data: params,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "성공적으로 저장하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})

	}

}

function updateRprStatus( statusCode ) {
	var rprPrgrsStCd = '';
	var successMsg = '';
	var errorMsg = '';

	var ibDealNo = $('#selectedIbDealNo').val();
	var riskInspctCcd = $('#selectedRiskInspctCcd').val();
	var lstCCaseCcd = $('#selectedLstCCaseCcd').val();
	var itemSq = $('#selectedItemSq').val();
	var oblgPfrmCcd = $('#selectedOblgPfrmCcd').val();

	// 파라미터 유효성 검증
	if( isEmpty(ibDealNo)
	||  isEmpty(riskInspctCcd)
	||  isEmpty(lstCCaseCcd)
	||  isEmpty(itemSq)
	||  isEmpty(oblgPfrmCcd) ){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "안건을 선택해주세요."
			, confirmButtonText: "확인"
		});
		return false;
	}

	switch ( statusCode ) {
		// 승인요청
		case '20' :
			rprPrgrsStCd = '20';
			successMsg = '안건 승인요청에 성공하였습니다.';
			errorMsg = '안건 승인요청에 실패하였습니다.';
			break;
		// 반송
		case '11' :
			rprPrgrsStCd = '11';
			successMsg = '안건 반송이 완료되었습니다.';
			errorMsg = '안건 반송에 실패하였습니다.';
			break;
		// 승인
		case '30' :
			rprPrgrsStCd = '30';
			successMsg = '안건 승인이 완료되었습니다.';
			errorMsg = '안건 승인에 실패하였습니다.';
			break;
		// 심사역 확인
		case '40' :
			rprPrgrsStCd = '40';
			successMsg = '심사역 확인이 완료되었습니다.';
			errorMsg = '심사역 확인에 실패하였습니다.';
			break;
		// 부서장 확인
		case '50' :
			rprPrgrsStCd = '50';
			successMsg = '부서장 확인이 완료되었습니다.';
			errorMsg = '부서장 확인에 실패하였습니다.';
			break;

		default :
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "안건 진행상태 변경에 실패하였습니다."
				, confirmButtonText: "확인"
			});
			return false;
	}// end switch

	var paramData = {
		  'ibDealNo' : ibDealNo
		, 'riskInspctCcd' : riskInspctCcd
		, 'lstCCaseCcd' : lstCCaseCcd
		, 'itemSq' : itemSq
		, 'oblgPfrmCcd' : oblgPfrmCcd
		, 'rprPrgrsStCd' : rprPrgrsStCd
	};

	// 비동기통신 요청
	$.ajax({
		type: "POST",
		url: "/MO44020S/updateRprStatus",
		data: paramData,
		dataType: "json",
		success: function() {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: successMsg
				, confirmButtonText: "확인"
			})
		},
		error: function() {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: errorMsg
				, confirmButtonText: "확인"
			});
		}
	});// end Ajax




}

/* todo 1. 저장 마무리
		2. 결재진행 마무리(결재진행은 체크박스를 통하여 다건으로 진행가능)
	    3. 조회가 아직 안되었을시(혹은 조회했을때 결과가 없을경우) 행추가, 행삭제, 저장, 엑셀, 이행계획 저장버튼, 결재진행버튼, 이행계획 TextArea 5개 비활성화
	    4. 행추가버튼 -> 해당 딜을 선택후 행추가 버튼을 누르면 그 딜을 일련번호 + 1 하여 복사한후 셀다운 대상금액과 셀다운 기한을 입력, 약정금액을 변경할수 있으며 저장할수 있음
		5. 행삭제버튼 -> 해당 딜의 내용을 삭제할 수 있음
		6. 대체투자관리부의 경우 부서원이 승인요청을 한후 부서장이 결재를 하면 심사역부서장이 확인한것과 같은 진행상태를 가짐(심사역이후 부터 확인을 안해도 됨)
 */