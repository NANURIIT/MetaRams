$(document).ready(function () {

});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callDM33010P(prefix) {
	reset_DM33010P();

	$('#prefix').val(prefix);
	$('#modal-DM33010P').modal('show');
}

/**
 * 모달 초기화
 */
function reset_DM33010P() {
	$('#DM33010P_tbodyList').html('');
	$('#prefix').val('');
	$('#DM33010P_dprtCd').val('');
	$('#DM33010P_dprtNm').val('');
}

/**
 * ajax 통신(조회)
 */
function getRiskRcgNoList() {

	var ibDealNo = $("#DM33010P_ibDealNo").val();
	var riskRcgNo = $("#DM33010P_riskRcgNo").val();
	var ibDealSnmNm = $("#DM33010P_ibDealSnmNm").val();

	var dtoParam = {
		  "ibDealNo"   : ibDealNo
		, "riskRcgNo"  : riskRcgNo
		, "ibDealSnmNm": ibDealSnmNm
	}

	$.ajax({
		type: "GET",
		url: "/DM33010P/getRiskRcgNoList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var html = '';
			var dealList = data;

			$('#DM33010P_tbodyRiskRcgNoList').html(html);

			if (dealList.length > 0){
				$.each(dealList, function(key, value){
					html += '<tr ondblclick="returnRiskRcgNo(this);">'
					html += '<td style="display:none">' + value.INVST_ASTS_DVD_CD + '</td>';	// 투자자산분류코드
					html += '<td>' + value.RISK_RCG_NO + '</td>';
					html += '<td>' + value.IB_DEAL_NO + '</td>';
					html += '<td>' + value.RISK_INSPCT_CCD + '</td>';
					html += '<td style="display:none">' + value.RISK_INSPCT_CCD_NM + '</td>';
					html += '<td>' + value.LST_C_CASE_CCD + '</td>';
					html += '<td style="display:none">' + value.LST_C_CASE_CCD_NM + '</td>';
					html += '<td>' + value.IB_DEAL_SNM_NM + '</td>';
					html += '<td>' + value.CRNCY_AMT + '</td>';
					html += '<td>' + value.FNC_GDS_DVD_CD + '</td>';
					html += '<td>' + value.DPRT_CD + '</td>';
					html += '<td style="display:none">' + value.DPRT_NM + '</td>';
					html += '<td style="display:none">' + value.FST_RGST_DT + '</td>';	// 최초등록일자
					html += '</tr>'
				});
			}else {
				html += '<tr>';
				html += '<td colspan="13" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#DM33010P_tbodyRiskRcgNoList').html(html);
		}
	});

}

/**
 * modal hide
 */
function modalClose_DM33010P() {
	$('#DM33010P_tbodyRiskRcgNoList').html('');
	$('#modal-DM33010P').modal('hide');
}

/**
 * 부모창에 결과값 전달
 */
function returnRiskRcgNo(e) {
	var tr = $(e);
	var td = $(tr).children();

	var selectedTr = $('#DM33010S_mappingList').children('tr').eq($('#selectedRow').val());
	var selectedTd = $(selectedTr).children();

	var riskRcgNo       = td.eq(1).text();	// 리스크승인번호
	var ibDealNo        = td.eq(2).text();	// IBDEAL번호
	var riskInspctCcd   = td.eq(3).text();	// 리스크심사구분코드
	var riskInspctCcdNm = td.eq(4).text();	// 리스크심사구분코드명
	var lstCCaseCcd     = td.eq(5).text();	// 부수안건구분코드
	var lstCCaseCcdNm   = td.eq(6).text();	// 부수안건구분코드명
	var dprtCd          = td.eq(10).text();	// 부점코드
	var dprtNm          = td.eq(11).text();	// 부점코드
	var ibDealSnmNm     = td.eq(7).text();	// IBDEAL약어명
	var fstRgstDt       = td.eq(12).text();	// 최초등록일자
	var hndJbYn  = 'N';				// 수작업여부
	var mappYn   = 'N';				// 매핑제외여부

/*	var crncyAmt      = td.eq(6).text();	// 통화금액
	// 나중에 컬럼 찾아서 수정해야함 2023-08-22 김현준
	var rcgAmt        = td.eq(6).text();	// 장부금액	*/

	$(selectedTd).eq(9).text(riskRcgNo);
	$(selectedTd).eq(10).text(ibDealNo);
	$(selectedTd).eq(11).text(riskInspctCcd);
	$(selectedTd).eq(12).text(riskInspctCcdNm);
	$(selectedTd).eq(13).text(lstCCaseCcd);
	$(selectedTd).eq(14).text(lstCCaseCcdNm);
	$(selectedTd).eq(15).text(dprtCd);
	$(selectedTd).eq(16).text(dprtNm);
	$(selectedTd).eq(17).text(ibDealSnmNm);
	$(selectedTd).eq(18).text(fstRgstDt);
	$(selectedTd).eq(19).text(hndJbYn);
	$(selectedTd).eq(20).text(mappYn);
	$(selectedTd).eq(24).text('Y');
	reset_DM33010P();
	modalClose_DM33010P();
}