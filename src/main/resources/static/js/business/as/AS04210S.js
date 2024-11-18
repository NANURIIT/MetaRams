$(document).ready(function() {

	touchSpin();					// 결의년도 좌우 가산
	loadSelectBoxContents();		// 셀렉트박스 정보 취득
	selectBoxOnChangeFunction();	// 셀렉트박스 변경이벤트 등록
	tableFunction();				


});

//TouchSpin
function touchSpin() {

	$(".touchspin").TouchSpin({
		verticalbuttons: true,
		buttondown_class: 'btn btn-white',
		buttonup_class: 'btn btn-white'
	});
}

// 셀렉트박스 정보 취득
function loadSelectBoxContents() {
	loadInspctCnfrncCcd();			// 전결협의체
	loadRsltnRsltCd();				// 결의결과
	loadAprvOpstnCcd();				// 찬반구분코드
}

// 전결협의체
function loadInspctCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I006",
		dataType: "json",
		success: function(data) {
			var html = "";
			html += '<option value=""></option>';

			$('#AS04210S_inspctCnfrncCcd').html(html);			// 전결협의체

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04210S_inspctCnfrncCcd').html(html);
		}
	});
}

// 결의결과
function loadRsltnRsltCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04210S_rsltnRsltCd').html(html);			// 전결협의체
			html += '<option vlaue=""></option>';
			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04210S_rsltnRsltCd').html(html);
		}
	});
}

var aprvOpstnCcd;

function loadAprvOpstnCcd(){
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/A003",
		dataType: "json",
		success: function(data) {
			aprvOpstnCcd = data;
		}
	});
}

// 셀렉트박스 변경이벤트 
function selectBoxOnChangeFunction() {
	SB_inspctCnfrncCcd();				// 전결협의체 셀렉트박스 변경
}

// 결의협의체 셀렉트박스 변경
function SB_inspctCnfrncCcd() {
	$("#AS04210S_inspctCnfrncCcd").change(function() {
		getLastCNFRNCInfo();
	})
}

// 협의체 마지막회차 정보를 가져옴
function getLastCNFRNCInfo() {
	var inspctCnfrncCcd = $('#AS04210S_inspctCnfrncCcd').val();
	var stdYr = $('#AS04210S_stdYr').val();

	var paramData = {
		"inspctCnfrncCcd": inspctCnfrncCcd
		, "stdYr": stdYr
	}

	$.ajax({
		type: "GET",
		url: "/AS04110S/getLastCNFRNCInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			$('#AS04210S_stdYr').val(data.stdYr);									// 결의년도
			$('#AS04210S_inspctCnfrncSqcSq').val(data.inspctCnfrncSqcSq);			// 회차
			$('#AS04210S_rsltnDt').val(data.rsltnDt);								// 결의일
		}
	});

}

// 테이블 이벤트등록 
function tableFunction() {
	MMBRChk();		// 위원정보 테이블 체크박스 이벤트 설정
	CASEChk();		// 안건정보 테이블 체크박스 이벤트 설정
}

// 위원정보 테이블 체크박스 이벤트 설정
function MMBRChk() {
	$("#MMBRChk").change(function(){
        if($("#MMBRChk").is(":checked")){
            $('.MMBRChk').prop('checked', true);
        }else{
            $('.MMBRChk').prop('checked', false);
        }
    });
}

// 안건정보 테이블 체크박스 이벤트 설정
function CASEChk() {
	$("#CASEChk").change(function(){
        if($("#CASEChk").is(":checked")){
            $('.CASEChk').prop('checked', true);
        }else{
            $('.CASEChk').prop('checked', false);
        }
    });
}

function searchCNFRNC() {
	var inspctCnfrncCcd = $('#AS04210S_inspctCnfrncCcd').val();						// 결의협의체
	var stdYr = $('#AS04210S_stdYr').val(); 										// 결의년도
	var inspctCnfrncSqcSq = $('#AS04210S_inspctCnfrncSqcSq').val();					// 회차
	var rsltnDt = $('#AS04210S_rsltnDt').val();										// 결의일
	var empNm = $('#acdnt_empNm').val();											// 위원명
	var eno = $('#acdnt_empno').val();												// 위원번호
	var chkF = '';																	// 종료건포함체크

	if ($('#AS04210S_chkF:checked').length > 0) {
		chkF = 'Y';
	} else {
		chkF = 'N';
	}

	var paramData = {
		"inspctCnfrncCcd": inspctCnfrncCcd
		, "stdYr": stdYr
		, "inspctCnfrncSqcSq": inspctCnfrncSqcSq
		, "rsltnDt": rsltnDt
		, "empNm": empNm
		, "eno": eno
		, "chkF": chkF
	}

	if (isEmpty(inspctCnfrncCcd)) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "결의협의체 정보를 확인해주세요"
			, confirmButtonText: "확인"
		});
		return;
	}

	if (isEmpty(stdYr)) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "결의년도 정보를 확인해주세요"
			, confirmButtonText: "확인"
		});
		return;
	}

	if (isEmpty(inspctCnfrncSqcSq)) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "회차 정보를 확인해주세요"
			, confirmButtonText: "확인"
		});
		return;
	}

	businessFunction();

	// 안건정보 가져오기
	function businessFunction() {
		getCASEInfo(paramData);
	}
}

function getCASEInfo(paramData) {
	$.ajax({
		type: "GET",
		url: "/AS04210S/getCASEInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {

			var html = "";
			$('#AS04210S_CASEInfo').html(html);

			var CASEInfo = data;
			if (CASEInfo.length > 0) {
				$.each(CASEInfo, function(key, value) {
					html += '<tr ondblclick="CNFRNCDetail(this);">';
						html += '<td><input type="checkbox" class="CASEChk"></td>';
						html += '<td style="display:none;">' + value.inspctCnfrncCcd + '</td>';
						html += '<td style="display:none;">' + value.stdYr + '</td>';
						html += '<td>' + value.inspctCnfrncCcdNm	+ '</td>';
						html += '<td>' + value.inspctCnfrncSqcSq	+ '</td>';
						html += '<td>' + value.rnkNo				+ '</td>';
						html += '<td style="display:none;">' + value.ibDealNo + '</td>';
						html += '<td>' + value.ibDealNm				+ '</td>';
						html += '<td>' + value.invstCrncyCdNm		+ '</td>';
						html += '<td class="text-right">' + Number(value.ptcpAmt).toLocaleString()	+ '</td>';
						html += '<td>' + value.rsltnDt				+ '</td>';
						html += '<td>' + value.rsltnTm				+ '</td>';
						html += '<td>' + value.dprtNm				+ '</td>';
						html += '<td>' + value.chrgPNm				+ '</td>';
						html += '<td>' + value.ownPNm				+ '</td>';
						html += '<td>' + value.prgrsStNm			+ '</td>';
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';
					html += '</tr>';
				});
			}
			$('#AS04210S_CASEInfo').html(html);
		},
		error: function() {
			var html = "";
			$('#AS04210S_CASEInfo').html(html);
		}
	});
}

function CNFRNCDetail(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var inspctCnfrncCcd = td.eq(1).text();		// 
	var stdYr = td.eq(2).text();				// 
	var inspctCnfrncSqcSq = td.eq(4).text();	// 
	var rnkNo = td.eq(5).text();				// 
	var ibDealNo = td.eq(6).text();
	var riskInspctCcd = td.eq(16).text();
	var lstCCaseCcd = td.eq(17).text();
	
	var paramData = {
		"inspctCnfrncCcd":inspctCnfrncCcd
		, "stdYr": stdYr
		, "inspctCnfrncSqcSq": inspctCnfrncSqcSq
		, "rnkNo": rnkNo
		, "ibDealNo": ibDealNo
		, "riskInspctCcd": riskInspctCcd
		, "lstCCaseCcd": lstCCaseCcd
	};
	
	$('#AS04210S_inspctCnfrncCcd_selected').val(inspctCnfrncCcd);
	$('#AS04210S_stdYr_selected').val(stdYr);
	$('#AS04210S_inspctCnfrncSqcSq_selected').val(inspctCnfrncSqcSq);
	$('#AS04210S_rnkNo_selected').val(rnkNo);
	$('#AS04210S_ibDealNo_selected').val(ibDealNo);
	$('#AS04210S_riskInspctCcd_selected').val(riskInspctCcd);
	$('#AS04210S_lstCCaseCcd_selected').val(lstCCaseCcd);

	$('#fileIbDealNo').val("M"+inspctCnfrncCcd+"0000000000");
	$('#fileRiskInspctCcd').val(stdYr.substring(2,4));
	$('#fileLstCCaseCcd').val(('0' + inspctCnfrncSqcSq).slice(-2));
	
	getMMBRInfo(paramData);
	getIBDEALInfo(paramData);
	getFileInfo();
}

function getMMBRInfo(paramData) {
	$.ajax({
		type: "GET",
		url: "/AS04210S/getMMBRInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {

			var html = "";
			$('#AS04210S_MMBRInfo').html(html);
			

			var MMBRInfo = data;
			if (MMBRInfo.length > 0) {
				$.each(MMBRInfo, function(key, value) {
					html += '<tr>';
					html += '<td style="vertical-align: middle;"><input type="checkbox" class="MMBRChk"></td>';		// 체크	
					html += '<td>' + value.atdncPEno + '</td>';														// 참석자번호
					html += '<td>' + value.atdncP + '</td>';														// 참석자성명
					html += '<td>' + value.atdncPrxyEno + '</td>';													// 대리참석자번호
					html += '<td>' + value.atdncPrxyNm + '</td>';													// 대리참석자성명
					if (isEmpty(value.realAtdncF)) {
						html += '<td><select class="form-control">';
						html += '<option value="Y">Y</option>';
						html += '<option value="N">N</option>';
						html += '</select></td>';
					} else {
						html += '<td>' + value.realAtdncF + '</td>';												// 참석여부
					}
					if (isEmpty(value.aprvOpstnCcd)) {
						html += '<td><select class="form-control">';
						$.each(aprvOpstnCcd, function(key, value) {
							html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
						});
						html += '</select></td>';
					} else {
						html += '<td>' + value.aprvOpstnCcdNm + '</td>';											// 의결
					}
					if (value.rvwCmmtCntnt == null) {
						html += '<td>' + '<input type="text" class="form-control">' + '</td>';
					} else {
						html += '<td>' + value.rvwCmmtCntnt + '</td>';												// 심의의견	
					}
					html += '<td style="display:none;">' + value.cmmttMmbrCcd + '</td>';							// 위원회멤버구분코드
					html += '<td>' + value.rgstDt + '</td>';														// 등록년월일
					html += '<td>' + value.cnfrPNm + '</td>';														// 확인자
					html += '<td>' + value.cnfrDyTm + '</td>';														// 확인일시
					html += '</tr>';
				});
			}
			$('#AS04210S_MMBRInfo').html(html);
		},
		error: function() {
			var html = "";
			$('#AS04210S_MMBRInfo').html(html);
		}
	});
}

function getIBDEALInfo(paramData) {
	$.ajax({
		type: "GET",
		url: "/AS04210S/getIBDEALInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {

			var html = "";
			$('#AS04210S_IBDEALInfo').html(html);

			var IBDEALInfo = data;
			if (IBDEALInfo.length > 0) {
				$.each(IBDEALInfo, function(key, value) {
					html += '<tr>';
					html += '<td>' + value.ibDealNm + '</td>';				// 안건명
					html += '<td>' + value.riskInspctCcdNm + '</td>';		// 신규/재부의
					html += '<td>' + value.invstCrncyCdNm + '</td>';		// 통화코드명
					html += '<td>' + value.ptcpAmt + '</td>';				// 참여금액
					html += '<td>' + value.rsltnRsltCdNm + '</td>';			// 결의결과코드명
					html += '<td>' + value.rcgAmt + '</td>';				// 승인금액
					html += '<td>' + value.sdnCndtF + '</td>';				// 셀다운여부
					html += '<td>' + value.etcCndtF + '</td>';				// 기타여부
					html += '<td>' + value.riskRcgNo + '</td>';				// 리스크승인번호
					html += '</tr>';
					$('#AS04210S_rsltnRsltCd').val(value.rsltnRsltCd).attr("selected", true);
					$('#AS04210S_invstCrncyCdNm').val(value.invstCrncyCdNm);
					$('#AS04210S_rcgAmt').val(value.rcgAmt);
					$('#AS04210S_sdnCndtF').val(value.sdnCndtF).attr('selected', true);
					$('#AS04210S_etcCndtF').val(value.etcCndtF).attr('selected', true);
					$('#AS04210S_cnfrncNtmCndtlCntnt').val(value.cnfrncNtmCndtlCntnt);
					$('#AS04210S_rsltCntnt').val(value.rsltCntnt);
					
					if(Number(value.inspctPrgrsStCd) == 340){
						$('.pb-2 .btn-success').prop("disabled", false);
						$('.pb-2 .btn-danger').prop("disabled", true);
					} else if(Number(value.inspctPrgrsStCd) > 340){
						$('.pb-2 .btn-success').prop("disabled", true);
						$('.pb-2 .btn-danger').prop("disabled", false);
					}
				});
			}
			$('#AS04210S_IBDEALInfo').html(html);
			
		},
		error: function() {
			var html = "";
			$('#AS04210S_IBDEALInfo').html(html);
		}
	});
}

function MMBRConfirm(mode){
	saveRAA23BInfo(mode);
}


function saveRAA23BInfo(mode) {
	var MMBRList = new Array();
	var selectedDealOption = false;

	$('#AS04210S_MMBRInfo tr').each(function() {

		var tr = $(this);
		var td = tr.children();

		if (td.eq(0).find('input').is(':checked')) {
			selectedDealOption = true
			if (isEmpty(td.eq(9).text())) {
				if (mode == 'confirm') {
					var object = {};
					object.mode = mode;
					object.inspctCnfrncCcd = $('#AS04210S_inspctCnfrncCcd_selected').val();
					object.stdYr = $('#AS04210S_stdYr_selected').val();
					object.inspctCnfrncSqcSq = $('#AS04210S_inspctCnfrncSqcSq_selected').val();
					object.rnkNo = $('#AS04210S_rnkNo_selected').val();
					object.atdncPEno = td.eq(1).text();
					object.cmmttMmbrCcd = td.eq(8).text();
					object.atdncPrxyEno = td.eq(3).text();
					object.realAtdncF = td.eq(5).find('select').val();
					object.aprvOpstnCcd = td.eq(6).find('select').val();
					object.rvwCmmtCntnt = td.eq(7).find('input').val();
					object.rgstDt = getToday();
				}
				MMBRList.push(object);
			} else {
				if (mode == 'cancel') {
					var object = {};
					object.mode = mode;
					object.inspctCnfrncCcd = $('#AS04210S_inspctCnfrncCcd_selected').val();
					object.stdYr = $('#AS04210S_stdYr_selected').val();
					object.inspctCnfrncSqcSq = $('#AS04210S_inspctCnfrncSqcSq_selected').val();
					object.rnkNo = $('#AS04210S_rnkNo_selected').val();
					object.atdncPEno = td.eq(1).text();
					object.cmmttMmbrCcd = td.eq(8).text();
				}
				MMBRList.push(object);
			}
		}	
	});

	if( selectedDealOption == true) {
		$.ajax({
			type: "POST",
			url: "/AS04210S/saveRAA23BInfo",
			contentType: 'application/json',
			data: JSON.stringify(MMBRList),
			success: function (data) {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "의결 내용을 변경하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					var paramData = {
						"inspctCnfrncCcd": $('#AS04210S_inspctCnfrncCcd_selected').val()
						, "stdYr": $('#AS04210S_stdYr_selected').val()
						, "inspctCnfrncSqcSq": $('#AS04210S_inspctCnfrncSqcSq_selected').val()
						, "rnkNo": $('#AS04210S_rnkNo_selected').val()
						, "ibDealNo": $('#AS04210S_ibDealNo_selected').val()
					};
					getMMBRInfo(paramData);
				});
			}
		});
	}else{
		Swal.fire({
			  icon: 'error'
			, title: "Error!"
			, text: "선택된 의결 내용이 없습니다."
			, confirmButtonText: "확인"
		});
	}
}

function ibDealConfirm(mode){
	var inspctCnfrncCcd = $('#AS04210S_inspctCnfrncCcd_selected').val();
	var stdYr = $('#AS04210S_stdYr_selected').val();
	var inspctCnfrncSqcSq = $('#AS04210S_inspctCnfrncSqcSq_selected').val()
	var rnkNo = $('#AS04210S_rnkNo_selected').val();
	var ibDealNo = $('#AS04210S_ibDealNo_selected').val();
	var riskInspctCcd = $('#AS04210S_riskInspctCcd_selected').val();
	var lstCCaseCcd = $('#AS04210S_lstCCaseCcd_selected').val();
	
	var rsltnRsltCd = '';
	var rcgAmt = '';
	var sdnCndtF = '';
	var etcCndtF = '';
	var cnfrncNtmCndtlCntnt = '';
	var rsltCntnt = '';
	
	if (mode == 'confirm') {
		rsltnRsltCd = $('#AS04210S_rsltnRsltCd').val();		// 결의결과
		rcgAmt = $('#AS04210S_rcgAmt').val();				// 승인금액
		sdnCndtF = $('#AS04210S_sdnCndtF').val();			// 셀다운여부
		etcCndtF = $('#AS04210S_etcCndtF').val();			// 기타여부
		cnfrncNtmCndtlCntnt = $('#AS04210S_cnfrncNtmCndtlCntnt').val();	// 부의조건
		rsltCntnt = $('#AS04210S_rsltCntnt').val();			// 결의의견

		if (isEmpty(rsltnRsltCd)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "결의결과 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
		if (isEmpty(rcgAmt)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "승인금액 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
		if (isEmpty(sdnCndtF)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "셀다운 조건 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
		if (isEmpty(etcCndtF)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "기타 조건 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
		if (isEmpty(cnfrncNtmCndtlCntnt)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "부의 조건 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
		if (isEmpty(rsltCntnt)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "결의의견 내용을 학인해주세요."
				, confirmButtonText: "확인"
			});
			return;
		}
	}
	
	var paramData = {
		"inspctCnfrncCcd": inspctCnfrncCcd
		, "stdYr": stdYr
		, "inspctCnfrncSqcSq": inspctCnfrncSqcSq
		, "rnkNo": rnkNo
		, "ibDealNo": ibDealNo
		, "riskInspctCcd": riskInspctCcd
		, "lstCCaseCcd": lstCCaseCcd
		, "rsltnRsltCd": rsltnRsltCd
		, "rcgAmt": rcgAmt
		, "sdnCndtF": sdnCndtF
		, "etcCndtF": etcCndtF
		, "cnfrncNtmCndtlCntnt": cnfrncNtmCndtlCntnt
		, "rsltCntnt": rsltCntnt
	}
	

	$.ajax({
		type: "POST",
		url: "/AS04210S/updateIBDEALInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "협의결과 내용을 변경하였습니다."
				, confirmButtonText: "확인"
			}).then((result) => {
				getIBDEALInfo(paramData);
				searchCNFRNC();
			});
		}
	});
	
}

// 안건 제외 ( 체크박스에 체크된 안건들을 해당 리스크심사협의회 회차에서 제외한다. )
function cancleDeal(){

	var dealSelectOption = false;
	var cancleDealList = new Array();

	$('#AS04210S_CASEInfo tr').each(function() {

		var tr = $(this);
		var td = tr.children();

		if (td.eq(0).find('input').is(':checked')) {
			dealSelectOption = true;
			var inputArr = {};

			inputArr.inspctCnfrncCcd   = td.eq(1).text();
			inputArr.stdYr			   = td.eq(2).text();
			inputArr.inspctCnfrncSqcSq = td.eq(4).text();
			inputArr.rnkNo 			   = td.eq(5).text();
			inputArr.ibDealNo          = td.eq(6).text();
			inputArr.riskInspctCcd     = td.eq(16).text();
			inputArr.lstCCaseCcd       = td.eq(17).text();

			cancleDealList.push(inputArr);
		}

	});

	deleteRAA22BDeal(cancleDealList);

	// 체크된 안건이 없을 시 alert
	if( dealSelectOption == false ){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "선택된 안건이 없습니다."
			, confirmButtonText: "확인"
		});
	}
}

function deleteRAA22BDeal(cancleDealList) {

	$.ajax({
		type: "POST",
		url: "/AS04210S/deleteRAA22BDeal",
		data: JSON.stringify(cancleDealList),
		dataType: "json",
		contentType: 'application/json',
		success: function (data) {
			searchCNFRNC();
			// 의결내용 초기화
			$('#AS04210S_MMBRInfo').html("");
			// 협의결과 초기화
			$('#AS04210S_IBDEALInfo').html("");
		}
	});

}
