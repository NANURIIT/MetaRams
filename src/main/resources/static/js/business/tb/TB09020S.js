$(document).ready(function() {
	getSelectBoxList('TB09020S', 'O004/I010/R022');	// 의무이행구분, 심사부서구분, 보고진행상태
});

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
			var dealNo = td.eq(1).text();
			
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

// 승인조건 사전관리 조회
function getPacmList() {

	// 테스트 원활하게 하기 위해 부서와 담당자 주석처리

	let oblgPfrmCcd 	= $('#TB09020S_O004').val();		// 의무이행구분코드
	//let dprtCd			= $('#MO44020S_dprtCd').val();	// 부서
	let dprtCd			= null
	//let ownEno			= $('#MO44020S_empno').val();	// 담당자
	let chrgPEno					= null
	let mtrPrgSttsDcd 	= $('#TB09020S_R022').val();		// 진행상태
	let inspctDprtCcd	= $('#TB09020S_I010').val();		// 심사부서
	let ownPEno		= $('#MO44020S_judge').val();			// 심사역
	let mtrNm		= $('#ibDealNm').val();					// 안건명
	let pfrmPlanYn;											// 이행계획 보고대상

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
			"mtrPrgSttsDcd" 		: mtrPrgSttsDcd,
			"inspctDprtCcd" 	: inspctDprtCcd,
			"ownPEno"			: ownPEno,
			"mtrNm"			: mtrNm,
			"PFRM_PLAN_YN"		: pfrmPlanYn
		}

		$.ajax({
			type: "GET",
			url: "TB09020S/getPacmList",
			data: params,
			dataType: "json",
			success: function (data) {
				let html = '';
				let dealList = data;

				if (dealList.length > 0) {

					$.each(dealList, function (key, value) {
						html += '<tr onclick="setDetails(this)">';
						html += '<td><input type="checkbox" id="check"></td>';			// 체크박스
						if (isEmpty(value.mtrPrgSttsDcd)) {
							html += '<td>' + '' + '</td>';
						} else {
							html += '<td>' + value.mtrPrgSttsDcd + '</td>';				// 진행상태코드
						}
						html += '<td>' + value.dealNo + '</td>';						// Deal번호
						html += '<td>' + value.jdgmDcd + '</td>';						// 신규/재부의
						html += '<td>' + value.mtrDcd + '</td>';						// 부수안건
						html += '<td>' + value.mtrNm + '</td>';							// 안건명
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
						html += '<td style="display:none">' + value.cnsbMtgNo + '</td>';					// 결의협의체
						html += '<td style="display:none">' + value.rsltnDt + '</td>';						// 결의일
						html += '<td style="display:none">' + value.rsltnRsltCd + '</td>';					// 결의결과
						if (isEmpty(value.rsltCntnt)) {
							html += '<td style="display:none">' + '' + '</td>';
						} else {
							html += '<td style="display:none">' + value.rsltCntnt + '</td>';				// 승인조건
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

	let dealNo					= $(td).eq(2).text();		// Deal번호
	let jdgmDcd					= $(td).eq(3).text();		// 신규/재부의
	let mtrDcd					= $(td).eq(4).text();		// 부수안건
	let mtrNm					= $(td).eq(5).text();		// 안건명
	let itemSq					= $(td).eq(6).text();		// 일련번호
	let cnsbMtgNo				= $(td).eq(22).text();		// 결의협의체
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

	$('#ibDealNo').val(dealNo);
	$('#riskInspctCcd').val(jdgmDcd);
	$('#lstCCaseCcd').val(mtrDcd);
	$('#detailIbDealNm').val(mtrNm);
	$('#itemSq').val(itemSq);
	$('#inspctCnfrncCcd').val(cnsbMtgNo);
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
	$('#selectedIbDealNo').val(dealNo);
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

	let dealNo 						= $('#ibDealNo').val();					// 딜번호
	let jdgmDcd 					= $('#hiddenRiskInspctCcd').val();		// 신규/재부의
	let mtrDcd 						= $('#hiddenLstCCaseCcd').val();		// 부수안건
	let itemSq 						= $('#itemSq').val();					// 일련번호
	let mainPrgrsSttnCntnt 			= $('#mainPrgrsSttnCntnt').val();		// 참여현황
	let bsnsSttnAndPrspctSmry 		= $('#bsnsSttnAndPrspctSmry').val();	// 진행경과
	let prcsPlanCntnt1 				= $('#prcsPlanCntnt1').val();			// BaseCase
	let prcsPlanCntnt2 				= $('#prcsPlanCntnt2').val();			// StressCase
	let rprRsnCntnt 				= $('#rprRsnCntnt').val();				// 기타특이사항

	let params = {
		  "oblgPfrmCcd" 			: "01"
		, "dealNo" 					: dealNo
		, "jdgmDcd" 				: jdgmDcd
		, "mtrDcd" 					: mtrDcd
		, "itemSq" 					: itemSq
		, "mainPrgrsSttnCntnt" 		: mainPrgrsSttnCntnt
		, "bsnsSttnAndPrspctSmry"	: bsnsSttnAndPrspctSmry
		, "prcsPlanCntnt1" 			: prcsPlanCntnt1
		, "prcsPlanCntnt2" 			: prcsPlanCntnt2
		, "rprRsnCntnt" 			: rprRsnCntnt
	};

	if (isNotEmpty(dealNo) && isNotEmpty(jdgmDcd) && isNotEmpty(mtrDcd) && isNotEmpty(itemSq)
		&& isNotEmpty(mainPrgrsSttnCntnt) && isNotEmpty(bsnsSttnAndPrspctSmry) && isNotEmpty(prcsPlanCntnt1)
		&& isNotEmpty(prcsPlanCntnt2) && isNotEmpty(rprRsnCntnt)) {

		businessFunction(params);

	} else {

		if (isEmpty(dealNo) || isEmpty(jdgmDcd) || isEmpty(mtrDcd) || isEmpty(itemSq)) {
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
			url: "/TB09020S/save",
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
	var mtrPrgSttsDcd = '';
	var successMsg = '';
	var errorMsg = '';

	var dealNo = $('#selectedIbDealNo').val();
	var jdgmDcd = $('#selectedRiskInspctCcd').val();
	var mtrDcd = $('#selectedLstCCaseCcd').val();
	var itemSq = $('#selectedItemSq').val();
	var oblgPfrmCcd = $('#selectedOblgPfrmCcd').val();

	// 파라미터 유효성 검증
	if( isEmpty(dealNo)
	||  isEmpty(jdgmDcd)
	||  isEmpty(mtrDcd)
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
			mtrPrgSttsDcd = '20';
			successMsg = '안건 승인요청에 성공하였습니다.';
			errorMsg = '안건 승인요청에 실패하였습니다.';
			break;
		// 반송
		case '11' :
			mtrPrgSttsDcd = '11';
			successMsg = '안건 반송이 완료되었습니다.';
			errorMsg = '안건 반송에 실패하였습니다.';
			break;
		// 승인
		case '30' :
			mtrPrgSttsDcd = '30';
			successMsg = '안건 승인이 완료되었습니다.';
			errorMsg = '안건 승인에 실패하였습니다.';
			break;
		// 심사역 확인
		case '40' :
			mtrPrgSttsDcd = '40';
			successMsg = '심사역 확인이 완료되었습니다.';
			errorMsg = '심사역 확인에 실패하였습니다.';
			break;
		// 부서장 확인
		case '50' :
			mtrPrgSttsDcd = '50';
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
		  'dealNo' : dealNo
		, 'jdgmDcd' : jdgmDcd
		, 'mtrDcd' : mtrDcd
		, 'itemSq' : itemSq
		, 'oblgPfrmCcd' : oblgPfrmCcd
		, 'mtrPrgSttsDcd' : mtrPrgSttsDcd
	};

	// 비동기통신 요청
	$.ajax({
		type: "POST",
		url: "/TB09020S/updateRprStatus",
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