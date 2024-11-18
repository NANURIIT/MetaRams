$(document).ready(function() {

	docRdySettings();

});

function docRdySettings() {
	modalShowFunction();
	keyDownEnter_AS02020P();
}

function modalShowFunction() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-AS02020P').on('shown.bs.modal', function(){
		$('#modal-AS02020P input[id=AS02020P_ibDealNo]').focus();	
	});
}

/**
 * 모달 팝업 show
 */
function callAS02020P(prefix){
	reset_AS02020P();
	$('#AS02020S_prefix').val(prefix);
	
	switch ($('#AS02020S_prefix').val()) {
		
		case 'TB03020S':
			$('#labelDscDt').hide();
			$('#spanDstDt').hide();
			$('#divSpan').attr('class', 'col-sm-10');
			$('#AS02020P_dstDT').text('일련번호');
			$("#AS02020P_ibDealNo").val($('#selectedMngDealNo').val());

			getDealInfo();
			
			break;
		case 'AS03210S':
			
			$("#AS02020P_ibDealNo").val($('#AS03210S_ibDealNo').val());
			$("#AS02020P_ibDealNm").val($('#AS03210S_ibDealNm').val());
			
			getDealInfo();

			break;
		default:
			$('#modal-AS02020P').modal('show');
			break;
	}
}

/**
 * Enter key event
 */
function keyDownEnter_AS02020P() {

	$("input[id=AS02020P_ibDealNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

	$("input[id=AS02020P_ibDealNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

	$("input[id=AS02020P_datepicker1]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

};

/**
 * deal 번호 조회 ajax
 */
function getDealInfo() {
	
	var prefix = $("#AS02020S_prefix").val();
	var inspctPrgrsStCd = '';
	
	
	if(prefix.startsWith('TB060')){
		inspctPrgrsStCd = '350';
	}
	

	if( prefix == 'TB03020S' ){

		var ibDealNo = $("#AS02020P_ibDealNo").val();
		var dealNm = $("#AS02020P_ibDealNm").val();

		var dtoParam = {
			  "dealNo" : ibDealNo
			, "dealNm" : dealNm
		};

		$.ajax({
			type: "GET",
			url: "/getBscDealInfo",
			data: dtoParam,
			dataType: "json",
			success: function (data) {
				var html = '';
				var empList = data;
				$('#AS02020P_dealInfoList').html(html);

				if(empList.length == 1){
					$.each(empList, function (key, value) {
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + value.dealNo + '</td>';
						html += '<td>' + value.dealNm + '</td>';
						html += '<td>' + value.sn + '</td>';
						html += '<td>' + value.dprtNm + '</td>';
						html += '<td>' + value.empNm + '</td>';
						html += '<td>' + value.entpHnglNm + '</td>';
						html += '<td>' + '' + '</td>';
						html += '<td style="display:none;">' + value.inspctPrgrsStCd + '</td>';
						//html += '<td style="display:none;">' + value.RISK_INSPCT_CCD + '</td>';
						//html += '<td style="display:none;">' + value.LST_C_CASE_CCD + '</td>';
						html += '</tr>';
					})
					
					$('#AS02020P_dealInfoList').html(html);
					$('#AS02020P_dealInfoList').children().eq(0).dblclick();
				} else if (empList.length > 1) {
					$.each(empList, function (key, value) {
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + value.dealNo + '</td>';
						html += '<td>' + value.dealNm + '</td>';
						html += '<td>' + value.sn + '</td>';
						html += '<td>' + value.dprtNm + '</td>';
						html += '<td>' + value.empNm + '</td>';
						html += '<td>' + value.entpHnglNm + '</td>';
						html += '<td>' + '' + '</td>';
						html += '<td style="display:none;">' + value.inspctPrgrsStCd + '</td>';
						//html += '<td style="display:none;">' + value.RISK_INSPCT_CCD + '</td>';
						//html += '<td style="display:none;">' + value.LST_C_CASE_CCD + '</td>';
						html += '</tr>';
					})
					
					$('#AS02020P_dealInfoList').html(html);
					$('#modal-AS02020P').modal('show');
				} else {
					html += '<tr>';
					html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
					
					$('#AS02020P_dealInfoList').html(html);
				}
			}
		});

	}else {

		var ibDealNo = $("#AS02020P_ibDealNo").val();
		var ibDealNm = $("#AS02020P_ibDealNm").val();
		var dscDate = $("#AS02020P_datepicker1").val();

		var dtoParam = {
			  "ibDealNo": ibDealNo
			, "ibDealNm": ibDealNm
			, "dscDate": dscDate
			, "inspctPrgrsStCd": inspctPrgrsStCd
		};


		$.ajax({
			type: "GET",
			url: "/getDealInfo",
			data: dtoParam,
			dataType: "json",
			success: function (data) {
				var html = '';
				var empList = data;
				$('#AS02020P_dealInfoList').html(html);

				if(empList.length == 1){
					$.each(empList, function (key, value) {
						
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + handleNullData(value.IB_DEAL_NO) + '</td>';
						html += '<td>' + handleNullData(value.IB_DEAL_NM) + '</td>';
						html += '<td>' + handleNullData(value.DSC_DT) + '</td>';
						html += '<td>' + handleNullData(value.DPRT_NM) + '</td>';
						html += '<td>' + handleNullData(value.EMP_NM) + '</td>';
						html += '<td>' + handleNullData(value.ENTP_RNM) + '</td>';
						html += '<td>' + handleNullData(value.INSPCT_PRGRS_ST_CD_NM) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.INSPCT_PRGRS_ST_CD) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.RISK_INSPCT_CCD) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.LST_C_CASE_CCD) + '</td>';
						html += '</tr>';
					})
					
					$('#AS02020P_dealInfoList').html(html);
					$('#AS02020P_dealInfoList').children().eq(0).dblclick();
					getDealList();
				} else if (empList.length > 1) {
					$.each(empList, function (key, value) {
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + handleNullData(value.IB_DEAL_NO) + '</td>';
						html += '<td>' + handleNullData(value.IB_DEAL_NM) + '</td>';
						html += '<td>' + handleNullData(value.DSC_DT) + '</td>';
						html += '<td>' + handleNullData(value.DPRT_NM) + '</td>';
						html += '<td>' + handleNullData(value.EMP_NM) + '</td>';
						html += '<td>' + handleNullData(value.ENTP_RNM) + '</td>';
						html += '<td>' + handleNullData(value.INSPCT_PRGRS_ST_CD_NM) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.INSPCT_PRGRS_ST_CD) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.RISK_INSPCT_CCD) + '</td>';
						html += '<td style="display:none;">' + handleNullData(value.LST_C_CASE_CCD) + '</td>';
						html += '</tr>';
					})
					$('#AS02020P_dealInfoList').html(html);
					$('#modal-AS02020P').modal('show');
				} else {
					html += '<tr>';
					html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
					
					$('#AS03210S_ibDealList').html('');
					$('#AS02020P_dealInfoList').html(html);
				}
			}
		});
	}
};

/**
 * reset
 */
function reset_AS02020P() {
	$('#AS02020P_dealInfoList').html("");
	$('#AS02020P_ibDealNo').val("");
	$('#AS02020P_ibDealNm').val("");
	$('#AS02020P_datepicker1').val("");
};

/**
 * close AS02020P modal
 */
function modalClose_AS02020P() {
	reset_AS02020P();
	$('#modal-AS02020P').modal('hide');
};

/**
 * 팝업에서 deal 번호 조회후 더블클릭
 */
function setDealInfo(e) {
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	
	var tr = $(e);
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();
	var ibDealNm = td.eq(1).text();
	var inspctPrgrsStCd = td.eq(7).text();
	var riskInspctCcd = td.eq(8).text();
	var lstCCaseCcd = td.eq(9).text();


	//$('#AS03210S_ibDealNo').val(ibDealNo);		// TODO : AS03210작업시 추후 제거
	
	var prefix = $("#AS02020S_prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.

	var pageIbDealNo = '#' + prefix + '_ibDealNo';
	var pageIbDealNm = '#' + prefix + '_ibDealNm';
	var pageInspctPrgrsStCd = '#' + prefix + '_inspctPrgrsStCd';
	var pageRiskInspctCcd = '#' + prefix + '_riskInspctCcd';
	var pageLstCCaseCcd = '#' + prefix + '_lstCCaseCcd';
	

	$(pageIbDealNo).val(ibDealNo);
	$(pageIbDealNm).val(ibDealNm);
	
	if( prefix == 'AS03210S' ){
		getDealList();
	}

	if( prefix == 'TB03020S' ){
		$('#selectedMngDealNo').val(td.eq(0).text());
		$('#selectedInspctPrgrsStCdNm').val(td.eq(6).text());
		$('#selectedInspctPrgrsStCd').val(td.eq(7).text());
		$('#selectedMngDealNo').focus();
		getBscDealDetail();
	}
		
	if( prefix == 'AS04110S' ){
		
		$(pageInspctPrgrsStCd).val(inspctPrgrsStCd);
		$(pageRiskInspctCcd).val(riskInspctCcd);
		$(pageLstCCaseCcd).val(lstCCaseCcd);
		
		addDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);		// AS04110S.js
	}
	
	if(prefix.startsWith('TB060')){
		$(pageInspctPrgrsStCd).val(inspctPrgrsStCd);
		$(pageRiskInspctCcd).val(riskInspctCcd);
		$(pageLstCCaseCcd).val(lstCCaseCcd);
	}
	
	modalClose_AS02020P();
	
};
