$(document).ready(function() {
	loadSelectBoxContents();
	setRsltnDt();
	setSelectBoxOnChange();
});

// 셀렉트박스 내용
function loadSelectBoxContents() {
	loadReprtPrgrsStCd();   	// 보고진행상태코드
	loadOblgPfrmCcd();			// 의무이행구분
	loadInspctDprtCcd();		// 심사부서
	loadRiskInspctCcd(); 		// 신규/재부의
	loadLstCCaseCcd();			// 부수안건
	loadInspctCnfrncCcd();		// 결의협의체
	loadRsltnRsltCd();			// 결과
}


// 보고진행상태코드 == 진행상태코드 
function loadReprtPrgrsStCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44040S_reprtPrgrsStCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_reprtPrgrsStCd').html(html);
		}
	});
}

// 의무이행구분코드
function loadOblgPfrmCcd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/O004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44040S_oblgPfrmCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_oblgPfrmCcd').html(html);
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
			$('#MO44040S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_inspctDprtCcd').html(html);
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
			$('#MO44040S_riskInspctCcd_selected').html(html);
			html += "<option value=''></option>";
			
			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_riskInspctCcd_selected').html(html);
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
			$('#MO44040S_lstCCaseCcd_selected').html(html);
			html += "<option value=''></option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_lstCCaseCcd_selected').html(html);
		}
	});
}

// 결의협의체
function loadInspctCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R007",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44040S_inspctCnfrncCcd_selected').html(html);
			html += "<option value=''></option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_inspctCnfrncCcd_selected').html(html);
		}
	});
}

// 결과
function loadRsltnRsltCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44040S_rsltnRsltCd_selected').html(html);
			html += "<option value=''></option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44040S_rsltnRsltCd_selected').html(html);
		}
	});
}


// 금일 날짜 세팅
function setRsltnDt() {
	$('#MO44040S_stdYrMm').val(getToday().substr(0,7));
}

//셀렉트박스 onchange 이벤트설정
function setSelectBoxOnChange() {
	
	// 의무이행구분코드
	setSelectBoxOblgPfrmCcd();
	
	// 심사부서구분코드
	setSelectBoxInspctDprtCcd();
	
}

// 의무이행구분코드
function setSelectBoxOblgPfrmCcd() {
	$('#MO44040S_oblgPfrmCcd').on('change', function() {
		var oblgPfrmCcd = $('#MO44040S_oblgPfrmCcd').val();
		$('#MO44040S_oblgPfrmCcd_selected').val(oblgPfrmCcd);
		
		if (oblgPfrmCcd == '01') {
			$('.showhide_oblgPfrmCcd').removeAttr('style');
			$('.hideshow_oblgPfrmCcd').attr('style', "display:none;");
			$('.hideshow_endF').attr('style', "display:none;");
			$('.showhide_endF').removeAttr('style');
		} else if (oblgPfrmCcd == '02') {
			$('.showhide_oblgPfrmCcd').attr('style', "display:none;");
			$('.hideshow_oblgPfrmCcd').removeAttr('style');
			$('.hideshow_endF').removeAttr('style');
			$('.showhide_endF').attr('style', "display:none;");
		}
	});
}

// 심사부서구분코드
function setSelectBoxInspctDprtCcd() {
	$('#MO44040S_inspctDprtCcd').on('change', function() {
		var inspctDprtCcd = $('#MO44040S_inspctDprtCcd').val();
		
		if (inspctDprtCcd == '2') {
			$('.showhide_inspctDprtCcd').attr('style', "display:none;");
		} else {
			$('.showhide_inspctDprtCcd').removeAttr('style');
		}
	});
}

function getInfo() {

	var dtoParam = {};
	dtoParam = getParams(dtoParam);
	

	$.ajax({
		type: "GET",
		url: "/MO44040S/getInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			if (dtoParam.oblgPfrmCcd == '01') {
				makeTable1(data);
			} else {
				makeTable2(data);
			}
		}
	}); // end of ajax
}

/**
 *  조회용 파라미터 오브젝트 생성
 *	@param {object}
 *  @returns {object}
 */
function getParams(object) {

	var result = object;
	
	result.stdYrMm = $('#MO44040S_stdYrMm').val();					/* 기준년월 */
	result.chrgPEno = $('#MO44040S_empno').val();						/* 담당자사번 */
	result.inspctDprtCcd = $('#MO44040S_inspctDprtCcd').val();		/* 심사부서코드 */
	result.ownPEno = $('#MO44040S_own_empno').val();					/* 심사역사번 */
	result.rprPrgrsStCd = $('#MO44040S_reprtPrgrsStCd').val();		/* 진행상태코드 */
	result.ibDealNm = $('#MO44040S_ibDealNm').val();				/* 안건명 */
	result.dprtCd = $('#MO44040S_dprtCd').val();					/* 부서코드 */
	result.oblgPfrmCcd = $('#MO44040S_oblgPfrmCcd').val();			/* 의무이행구분코드 */
	result.endF = $('#MO44040S_endF').val();						/* 종결여부 */

	return result;
}

function makeTable1(data) {
	
		var html = "";
		$('#MO44040S_getInfo').html(html);

		if (data.length > 0) {
			$.each(data, function(key, value) {
				html += '<tr ondblclick="setInfo(this);">';
				html += '<td>' + '<input type="checkbox" class="CASEChk" style="">' + '</td>';
				html += '<td  style="display:none;">' + handleNullData(value.rprPrgrsStCd) + '</td>'; 				// 진행상태	
				html += '<td>' + handleNullData(value.rprPrgrsStCdNm) + '</td>'; 									// 진행상태명	
				html += '<td>' + handleNullData(value.ibDealNo) + '</td>'; 											// Deal번호		
				html += '<td style="display:none;">' + handleNullData(value.riskInspctCcd) + '</td>'; 				// 신규/재부의		
				html += '<td>' + handleNullData(value.riskInspctCcdNm) + '</td>'; 									// 신규/재부의명		
				html += '<td style="display:none;">' + handleNullData(value.lstCCaseCcd) + '</td>'; 				// 부수안건		
				html += '<td>' + handleNullData(value.lstCCaseCcdNm) + '</td>'; 									// 부수안건명		
				html += '<td>' + handleNullData(value.ibDealNm) + '</td>'; 											// 안건명		
				html += '<td>' + handleNullData(value.itemSq) + '</td>'; 											// 일련번호		
				html += '<td>' + handleNullData(value.invstCrncyCd) + '</td>'; 										// 통화		
				html += '<td>' + handleNullData(value.rcgAmt) + '</td>'; 											// 승인금액		
				html += '<td>' + handleNullData(value.aplcAmt) + '</td>'; 											// Sell-down대상금액		
				html += '<td>' + handleNullData(value.endDtEndDt) + '</td>'; 										// Sell-down기한		
				html += '<td>' + handleNullData(value.mtrtHldAmt) + '</td>'; 										// 만기보유금액		
				html += '<td>' + handleNullData(value.opnPrcValAmt) + '</td>'; 										// 잔고		
				html += '<td>' + handleNullData(value.pfrmClsfNm) + '</td>'; 										// 이행여부		
				html += '<td>' + handleNullData(value.pfrmDt) + '</td>'; 											// 이행일		
				html += '<td>' + handleNullData(value.npryRa) + '</td>'; 											// 미해소잔액		
				html += '<td>' + handleNullData(value.dprtNm) + '</td>'; 											// 부서		
				html += '<td>' + handleNullData(value.empNm) + '</td>'; 											// 담당자		
				html += '<td style="display:none;">' + handleNullData(value.inspctDprtCcd) + '</td>'; 				// 심사부서		
				html += '<td>' + handleNullData(value.inspctDprtCcdNm) + '</td>'; 									// 심사부서명		
				html += '<td>' + handleNullData(value.ownEmpNm) + '</td>'; 											// 심사역		
				html += '<td>' + handleNullData(value.rcgRqsDt) + '</td>'; 											// 승인요청일		
				html += '<td>' + handleNullData(value.rcgDt) + '</td>'; 											// 승인일		
				html += '<td>' + handleNullData(value.cnfrDt1) + '</td>'; 											// 심사역확인일		
				html += '<td>' + handleNullData(value.cnfrDt2) + '</td>'; 											// 부서장확인일
				
				html += '<td style="display:none;">' + handleNullData(value.oblgPfrmCcd) + '</td>';					// 의무이행구분
				html += '<td style="display:none;">' + handleNullData(value.achvDt) + '</td>';						// 셀다운목표일
				html += '<td style="display:none;">' + handleNullData(value.inspctCnfrncCcd) + '</td>';				// 결의협의체
				html += '<td style="display:none;">' + handleNullData(value.inspctCnfrncCcdNm) + '</td>';			// 결의협의체명
				html += '<td style="display:none;">' + handleNullData(value.rsltnDt) + '</td>';						// 결의일
				html += '<td style="display:none;">' + handleNullData(value.rsltnRsltCd) + '</td>';					// 결의결과
				html += '<td style="display:none;">' + handleNullData(value.rsltnRsltCdNm) + '</td>';				// 결의결과명
				html += '<td style="display:none;">' + handleNullData(value.rsltCntnt) + '</td>';					// 승인조건
				html += '<td style="display:none;">' + handleNullData(value.bsnsOutlnHngl) + '</td>';				// 사업개요
				html += '<td style="display:none;">' + handleNullData(value.cnstCmpnyNm) + '</td>';					// 시행사/시공사
				html += '<td style="display:none;">' + handleNullData(value.mainPrgrsSttnCntnt) + '</td>';			// 최근사업 진행현황
				
				html += '<td style="display:none;">' + handleNullData(value.achvDt) + '</td>';						// 셀다운목표일
				html += '<td style="display:none;">' + handleNullData(value.nPfrmRsnCntnt) + '</td>';				// 미이행사유
				html += '<td style="display:none;">' + handleNullData(value.pfrmPlanCntnt) + '</td>';				// 향후계획
				html += '<td style="display:none;">' + handleNullData(value.prcsPlanCntnt1) + '</td>';				// Base Case
				html += '<td style="display:none;">' + handleNullData(value.prcsPlanCntnt2) + '</td>';				// Stress Case
				html += '<td style="display:none;">' + handleNullData(value.valSpclCntnt) + '</td>';				// 기타특이사항
				html += '</tr>';		
			});
		} else {
			html += '<tr>';
			html += '<td colspan=6" style="text-align: center">데이터가 없습니다.</td>';
			html += '</tr>';
		}
		$('#MO44040S_getInfo').html(html);
}



function makeTable2(data) {
	
		var html = "";
		$('#MO44040S_getInfo').html(html);

		if (data.length > 0) {
			$.each(data, function(key, value) {
				html += '<tr ondblclick="setInfo(this);">';
				html += '<td>' + '<input type="checkbox" class="CASEChk" style="">' + '</td>';
				html += '<td  style="display:none;">' + handleNullData(value.rprPrgrsStCd) + '</td>'; 				// 진행상태	
				html += '<td>' + handleNullData(value.rprPrgrsStCdNm) + '</td>'; 									// 진행상태명	
				html += '<td>' + handleNullData(value.ibDealNo) + '</td>'; 											// Deal번호		
				html += '<td style="display:none;">' + handleNullData(value.riskInspctCcd) + '</td>'; 				// 신규/재부의		
				html += '<td>' + handleNullData(value.riskInspctCcdNm) + '</td>'; 									// 신규/재부의명		
				html += '<td style="display:none;">' + handleNullData(value.lstCCaseCcd) + '</td>'; 				// 부수안건		
				html += '<td>' + handleNullData(value.lstCCaseCcdNm) + '</td>'; 									// 부수안건명		
				html += '<td>' + handleNullData(value.ibDealNm) + '</td>'; 											// 안건명		
				html += '<td>' + handleNullData(value.itemSq) + '</td>'; 											// 일련번호		
				html += '<td>' + handleNullData(value.invstCrncyCd) + '</td>'; 										// 통화		
				html += '<td>' + handleNullData(value.rcgAmt) + '</td>'; 											// 승인금액		
				html += '<td>' + handleNullData(value.aplcAmt) + '</td>'; 											// Sell-down대상금액		
				html += '<td>' + handleNullData(value.endDtEndDt) + '</td>'; 										// Sell-down기한		
				html += '<td>' + handleNullData(value.mtrtHldAmt) + '</td>'; 										// 만기보유금액		
				html += '<td>' + handleNullData(value.opnPrcValAmt) + '</td>'; 										// 잔고		
				html += '<td>' + handleNullData(value.pfrmClsfNm) + '</td>'; 										// 이행여부		
				html += '<td>' + handleNullData(value.pfrmDt) + '</td>'; 											// 이행일		
				html += '<td>' + handleNullData(value.npryRa) + '</td>'; 											// 미해소잔액		
				html += '<td>' + handleNullData(value.dprtNm) + '</td>'; 											// 부서		
				html += '<td>' + handleNullData(value.empNm) + '</td>'; 											// 담당자		
				html += '<td style="display:none;">' + handleNullData(value.inspctDprtCcd) + '</td>'; 				// 심사부서		
				html += '<td>' + handleNullData(value.inspctDprtCcdNm) + '</td>'; 									// 심사부서명		
				html += '<td>' + handleNullData(value.ownEmpNm) + '</td>'; 											// 심사역		
				html += '<td>' + handleNullData(value.rcgRqsDt) + '</td>'; 											// 승인요청일		
				html += '<td>' + handleNullData(value.rcgDt) + '</td>'; 											// 승인일		
				html += '<td>' + handleNullData(value.cnfrDt1) + '</td>'; 											// 심사역확인일		
				html += '<td>' + handleNullData(value.cnfrDt2) + '</td>'; 											// 부서장확인일
				
				html += '<td style="display:none;">' + handleNullData(value.oblgPfrmCcd) + '</td>';					// 의무이행구분
				html += '<td style="display:none;">' + handleNullData(value.achvDt) + '</td>';						// 셀다운목표일
				html += '<td style="display:none;">' + handleNullData(value.inspctCnfrncCcd) + '</td>';				// 결의협의체
				html += '<td style="display:none;">' + handleNullData(value.inspctCnfrncCcdNm) + '</td>';			// 결의협의체명
				html += '<td style="display:none;">' + handleNullData(value.rsltnDt) + '</td>';						// 결의일
				html += '<td style="display:none;">' + handleNullData(value.rsltnRsltCd) + '</td>';					// 결의결과
				html += '<td style="display:none;">' + handleNullData(value.rsltnRsltCdNm) + '</td>';				// 결의결과명
				html += '<td style="display:none;">' + handleNullData(value.rsltCntnt) + '</td>';					// 승인조건
				html += '<td style="display:none;">' + handleNullData(value.bsnsOutlnHngl) + '</td>';				// 사업개요
				html += '<td style="display:none;">' + handleNullData(value.cnstCmpnyNm) + '</td>';					// 시행사/시공사
				html += '<td style="display:none;">' + handleNullData(value.mainPrgrsSttnCntnt) + '</td>';			// 최근사업 진행현황
				
				html += '<td style="display:none;">' + handleNullData(value.achvDt) + '</td>';						// 셀다운목표일
				html += '<td style="display:none;">' + handleNullData(value.nPfrmRsnCntnt) + '</td>';				// 미이행사유
				html += '<td style="display:none;">' + handleNullData(value.pfrmPlanCntnt) + '</td>';				// 향후계획
				html += '<td style="display:none;">' + handleNullData(value.prcsPlanCntnt1) + '</td>';				// Base Case
				html += '<td style="display:none;">' + handleNullData(value.prcsPlanCntnt2) + '</td>';				// Stress Case
				html += '<td style="display:none;">' + handleNullData(value.valSpclCntnt) + '</td>';				// 기타특이사항
				html += '</tr>';		
			});
		} else {
			html += '<tr>';
			html += '<td colspan=6" style="text-align: center">데이터가 없습니다.</td>';
			html += '</tr>';
		}
		$('#MO44040S_getInfo').html(html);
}

function setInfo(e) {
	
	var tr = $(e);
	var td = $(tr).children();
	
	// makeTable1
	$('#MO44040S_ibDealNo_selected').val(td.eq(3).text());				// deal번호		
	$('#MO44040S_riskInspctCcd_selected').val(td.eq(4).text());			// 신규/재부의			
	$('#MO44040S_lstCCaseCcd_selected').val(td.eq(6).text());			// 부수안건			
	$('#MO44040S_itemSq_selected').val(td.eq(9).text());				// 일련번호			
	$('#MO44040S_ibDealNm_selected').val(td.eq(8).text());				// 안건명			
	$('#MO44040S_inspctCnfrncCcd_selected').val(td.eq(31).text());		// 결의협의체			
	$('#MO44040S_rsltnDt_selected').val(td.eq(32).text());				// 결의일			
	$('#MO44040S_rsltnRsltCd_selected').val(td.eq(33).text());			// 결과			
	$('#MO44040S_rsltCntnt_selected').val(td.eq(35).text());			// 승인조건		
	$('#MO44040S_bsnsOutlnHngl').val(td.eq(36).text());					// 사업개요		
	$('#MO44040S_cnstCmpnyNm').val(td.eq(37).text());					// 시행사/시공사	
	$('#MO44040S_mainPrgrsSttnCntnt').val(td.eq(38).text());			// 최근사업 진행현황
	$('#MO44040S_achvDt').val(td.eq(39).text());						// 셀다운목표일	
	$('#MO44040S_nPfrmRsnCntnt').val(td.eq(40).text());					// 미이행사유	
	$('#MO44040S_pfrmPlanCntnt').val(td.eq(41).text());					// 향후계획
	$('#MO44040S_prcsPlanCntnt1').val(td.eq(42).text());				// Base Case
	$('#MO44040S_prcsPlanCntnt2').val(td.eq(43).text());				// Stress Case
	$('#MO44040S_valSpclCntnt').val(td.eq(44).text());					// 기타특이사항
	
	
	var oblgPfrmCcd = $('#MO44040S_oblgPfrmCcd').val();
	if(oblgPfrmCcd == '02'){
	// makeTable2
	$('#MO44040S_endF_selected').val(td.eq(45).text());					// 종결여부
	$('#MO44040S_pfrmDt_selected').val(td.eq(46).text());				// 이행일자
	$('#MO44040S_pfrmCntnt_selected').val(td.eq(47).text());			// 이행사유
				
	}
}

function savePlans() {
	
	var ibDealNo = $('#MO44040S_ibDealNo_selected').val();
	
	if(isEmpty(ibDealNo)){
		
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 확인해 주세요."
			, confirmButtonText: "확인"
		});
		
		return false;
	}
	
	var dtoParam = {};
	dtoParam = getPlanDetails(dtoParam);
	
	$.ajax({
		type: "POST",
		url: "/MO44040S/savePlans",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
		
		}
	}); // end of ajax
}

/**

 *  향후계획 저장용 파라미터 오브젝트 생성
 *	@param {object}
 *  @returns {object}
 */
function getPlanDetails(object) {

	var result = object;
	 
	result.oblgPfrmCcd        		= $('#MO44040S_oblgPfrmCcd_selected').val();
	result.ibDealNo        			= $('#MO44040S_ibDealNo_selected').val();
	result.riskInspctCcd  			= $('#MO44040S_riskInspctCcd_selected').val();
	result.lstCCaseCcd    			= $('#MO44040S_lstCCaseCcd_selected').val();
	result.itemSq         			= Number($('#MO44040S_itemSq_selected').val());
	result.ibDealNm       			= $('#MO44040S_ibDealNm_selected').val();
	result.inspctCnfrncCcd			= $('#MO44040S_inspctCnfrncCcd_selected').val();
	result.rsltnDt        			= $('#MO44040S_rsltnDt_selected').val();
	result.rsltnRsltCd    			= $('#MO44040S_rsltnRsltCd_selected').val();
	result.rsltCntnt      			= $('#MO44040S_rsltCntnt_selected').val();
	result.bsnsOutlnHngl            = $('#MO44040S_bsnsOutlnHngl').val();
	result.cnstCmpnyNm              = $('#MO44040S_cnstCmpnyNm').val();
	result.mainPrgrsSttnCntnt       = $('#MO44040S_mainPrgrsSttnCntnt').val();
	//result.endF                     = $('#MO44040S_endF_selected').val();
	//result.pfrmDt                   = $('#MO44040S_pfrmDt_selected').val();
	//result.pfrmCntnt                = $('#MO44040S_pfrmCntnt_selected').val();
	result.achvDt                   = $('#MO44040S_achvDt').val();
	result.nPfrmRsnCntnt            = $('#MO44040S_nPfrmRsnCntnt').val();
	result.pfrmPlanCntnt            = $('#MO44040S_pfrmPlanCntnt').val();
	result.prcsPlanCntnt1           = $('#MO44040S_prcsPlanCntnt1').val();
	result.prcsPlanCntnt2           = $('#MO44040S_prcsPlanCntnt2').val();
	result.valSpclCntnt             = $('#MO44040S_valSpclCntnt').val();

	return result;
}

function savePFRM() {

	var ibDealNo = $('#MO44040S_ibDealNo_selected').val();
	
	if(isEmpty(ibDealNo)){
		
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 확인해 주세요."
			, confirmButtonText: "확인"
		});
		
		return false;
	}
	
	var dtoParam = {};
	dtoParam = getPFRMDetails(dtoParam);
	
	$.ajax({
		type: "POST",
		url: "/MO44040S/savePFRM",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
		
		}
	}); // end of ajax
	
}

/**
 *  향후계획 저장용 파라미터 오브젝트 생성
 *	@param {object}
 *  @returns {object}
 */
function getPFRMDetails(object) {

	var result = object;
	
	result.oblgPfrmCcd        		= $('#MO44040S_oblgPfrmCcd_selected').val();
	result.ibDealNo        			= $('#MO44040S_ibDealNo_selected').val();
	result.riskInspctCcd  			= $('#MO44040S_riskInspctCcd_selected').val();
	result.lstCCaseCcd    			= $('#MO44040S_lstCCaseCcd_selected').val();
	result.itemSq         			= Number($('#MO44040S_itemSq_selected').val());
	result.endF                     = $('#MO44040S_endF_selected').val();
	result.pfrmDt                   = $('#MO44040S_pfrmDt_selected').val();
	result.pfrmCntnt                = $('#MO44040S_pfrmCntnt_selected').val();

	return result;
}

function updateRaa31b(prgrsStCd) {
	
	var ibDealNo = $('#MO44040S_ibDealNo_selected').val();
	
	if(isEmpty(ibDealNo)){
		
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 확인해 주세요."
			, confirmButtonText: "확인"
		});
		
		return false;
	}
	
	var dtoParam = {};
	dtoParam = getPrgrsDetails(dtoParam);
	
	// 10 작성
	// 11 반송
	// 20 승인요청
	// 30 승인
	// 40 심사역확인
	// 50 부서장확인
	switch(prgrsStCd){
		case "10":
			break;
		case "11":
			dtoParam.rprPrgrsStCd = '11';
			break;
		case "20":
			dtoParam.rprPrgrsStCd = '20';
			break;
		case "30":
			dtoParam.rprPrgrsStCd = '30';
			break;
		case "40":
			dtoParam.rprPrgrsStCd = '40';
			break;
		case "50":
			dtoParam.rprPrgrsStCd = '50';
			break;
		default:
			break;
	}
	
	$.ajax({
		type: "POST",
		url: "/MO44040S/savePrgrs",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
		
		}
	}); // end of ajax
	
}

/**
 *  프로그레스 파라미터 오브젝트 생성
 *	@param {object}
 *  @returns {object}
 */
function getPrgrsDetails(object) {

	var result = object;
	
	result.oblgPfrmCcd        		= $('#MO44040S_oblgPfrmCcd_selected').val();
	result.ibDealNo        			= $('#MO44040S_ibDealNo_selected').val();
	result.riskInspctCcd  			= $('#MO44040S_riskInspctCcd_selected').val();
	result.lstCCaseCcd    			= $('#MO44040S_lstCCaseCcd_selected').val();
	result.itemSq         			= Number($('#MO44040S_itemSq_selected').val());

	return result;
}

function functionExportExcel() {

	var filename = '승인조건 미이행 관리_' + getToday() + '.xlsx';
	
	exportExcel(filename);
}









