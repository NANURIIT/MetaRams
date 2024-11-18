// DOM 생성..
$(document).ready(function() {
	//loadContents();
});

// SelectBox코드 호출
function loadContents(){
	//loadRaDealCcd();
	//loadRiskInspctMngSttsCd();
}

// 투자자산 매핑 목록 조회
function getMappingList() {

	var invstAstsDvdCd = $('#DM33010S_invstAstsDvdCd').val();                         // 투자자산분류코드
	var astsDprtCd = $('#DM33010S_dprtCd').val();                                     // 자산관리부점코드
	var caseDprtCd = $('#DM33010S_case_dprtCd').val();                                // 안건관리부점코드
	var invstAstsNm = $('#DM33010S_invstAstsNm').val();                               // 투자자산명
	var ibDealNm = $('#DM33010S_ibDealNm').val();                                     // IBDEAL명
//	var confirm = $('#').val();
	var mappYn = $('#DM33010S_mappYn').prop("checked") ? "N" : "Y";            // 매핑제외여부

	businessFunction();
/*
	// 유효성검사
	if (!isEmpty(ibDealNo)) {
		if(inspctPrgrsStCd !== "500"){
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "심사진행상태를 확인해주세요."
				, confirmButtonText: "확인"
			});
		} else {
			businessFunction();
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal번호를 입력해 주세요."
			, confirmButtonText: "확인"
		});
	}
*/

	function businessFunction() {

		var dtoParam = {
			  "invstAstsDvdCd" : invstAstsDvdCd
			, "astsDprtCd"     : astsDprtCd
			, "caseDprtCd"     : caseDprtCd
			, "invstAstsNm"    : invstAstsNm
			, "ibDealNm"	   : ibDealNm
			, "mappYn"         : mappYn
		};


		$.ajax({
			type: "GET",
			url: "/DM33010S/selMappingList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#DM33010S_mappingList').html(html);


				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr>'
						html += '<td style="display:none">' + key + '</td>';						// selected table row
						html += '<td style="display:none">' + value.INVST_ASTS_DVD_CD + '</td>';	// 투자자산분류코드
						html += '<td>' + value.INVST_ASTS_DVD_NM + '</td>';							// 투자자산분류명
						html += '<td style="display:none">' + value.ASTS_DPRT_CD + '</td>';			// 자산관리부점코드
						html += '<td style="display:none">' + value.ASTS_DPRT_NM + '</td>';			// 자산관리부점명
						html += '<td style="display:none">' + value.ASTS_DSTG_CHRS_NO + '</td>';	// 자산식별고유번호
						html += '<td style="display:none">' + value.CMBS_BKNO + '</td>';			// 자본시장표준IT시스템북번호
						html += '<td>' + value.INVST_ASTS_NM + '</td>';								// 투자자산명
						html += '<td style="display:none">' + value.CMBS_BKNO_NM + '</td>';			// 자본시장표준IT시스템북명
						html += '<td style="display:none">' + value.RISK_RCG_NO + '</td>';			// 리스크승인번호
						html += '<td>' + value.IB_DEAL_NO + '</td>';								// IBDEAL번호
						html += '<td style="display:none">' + value.RISK_INSPCT_CCD + '</td>';		// 리스크심사구분코드
						html += '<td>' + value.RISK_INSPCT_CCD_NM + '</td>';						// 리스크심사구분명
						html += '<td style="display:none">' + value.LST_C_CASE_CCD + '</td>';		// 부수안건구분코드
						html += '<td>' + value.LST_C_CASE_CCD_NM + '</td>';							// 부수안건구분명
						html += '<td style="display:none">' + value.CASE_DPRT_CD + '</td>';			// 안건관리부점코드
						html += '<td>' + value.CASE_DPRT_NM + '</td>';								// 안건관리부점명
						html += '<td>' + value.IB_DEAL_SNM_NM + '</td>';							// IBDEAL약어명
						html += '<td>' + value.RGST_DT + '</td>';									// 등록일자
						html += '<td>' + value.HNDJB_MNG_F + '</td>';								// 수작업관리여부
						html += '<td>' + value.XCL_F + '</td>';										// 제외여부
						html += '<td>' + value.BK_AMT + '</td>';									// 장부금액
						html += '<td>' + value.OPN_PRC_VAL_AMT + '</td>';							// 시가평가금액
						html += '<td><button type="button" class="btn btn-default" ' +
								'onClick="popCallSrchRiskRcgNo(this);">매핑' +
								'</button></td>'; 													// 매핑 버튼
						html += '<td style="display:none">' + 'N' + '</td>';						// 매핑정보 수정 여부
						html += '<td style="display:none">' + value.ORG_IB_DEAL_NO + '</td>';		// 매핑정보 수정 여부
						html += '<td style="display:none">' + value.ORG_RISK_INSPCT_CCD + '</td>';	// 매핑정보 수정 여부
						html += '<td style="display:none">' + value.ORG_RISK_INSPCT_CCD_NM + '</td>';// 매핑정보 수정 여부
						html += '<td style="display:none">' + value.ORG_LST_C_CASE_CCD + '</td>';	// 매핑정보 수정 여부
						html += '<td style="display:none">' + value.ORG_LST_C_CASE_CCD_NM + '</td>';// 매핑정보 수정 여부
						html += '</tr>'
					});
				}else {
					html += '<tr>';
					html += '<td colspan="13" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}

				$('#DM33010S_mappingList').html(html);
			},

		});
	}

}

// 투자자산 매핑 저장
function saveMappingInfo(){

	var validate = validateMappingInfo();
	var trCount = $('#DM33010S_mappingList').children('tr').length;

	// 투자자산 매핑 유효성 검증
	if( validate[0] ){
		// 파라미터 셋팅
		var mappingInfo;

		var inputArr = [];

		for( var i = 0 ; i < trCount ; i++ ){
			var tr = $('#DM33010S_mappingList').children('tr').eq(i);
			var td = $(tr).children();

			if( td.eq(24).text() == 'Y' ) {
				mappingInfo = {};

				mappingInfo.ibDealNo = td.eq(25).text();
				mappingInfo.riskInscptCcd = td.eq(26).text();
				mappingInfo.lstCCaseCcd = td.eq(28).text();
				mappingInfo.riskRcgNo = td.eq(9).text();
				mappingInfo.rgstDt = td.eq(18).text();
				mappingInfo.hndjbMngF = 'N';
				mappingInfo.xclF = 'N';

				inputArr.push(mappingInfo);
			}
		}

		$.ajax({
			type: "POST",
			url: "/DM33010S/saveMappingInfo",
			data: JSON.stringify(inputArr),
			dataType: "json",
			contentType: "application/json",
			success: function(){
				getMappingList();
			}
		});


		//$('#DM33010S_mappingList').children('tr')

		//mappingInfo.ibDealNo = "a"



	}else{
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: validate[1]
			, confirmButtonText: "확인"
		});

		return false;
	}
}

// 투자자산 매핑 유효성 검증
function validateMappingInfo(){

	var selectedTr = $('#DM33010S_mappingList').children('tr').eq($('#selectedRow').val());
	var selectedTd = $(selectedTr).children();

	var rtnVal = [];
	var validateYn = false;
	var errorMsg   = '';



	if( $(selectedTd).eq(24).text() == 'Y'){
		validateYn = true;
	}else
	if( $(selectedTd).eq(24).text() == 'N' ){
		errorMsg = '수정된 안건이 없습니다.'
	}else{
		errorMsg = '안건을 조회해주세요.'
	}

	rtnVal.push(validateYn);
	rtnVal.push(errorMsg);

	return rtnVal;
}

/* 리스크승인번호 조회 팝업 호출 */
function popCallSrchRiskRcgNo(e){
	var tr = $(e).parent().parent();
	var td = $(tr).children();

	$('#selectedRow').val(td.eq(0).text());

	// 리스크승인번호검색 팝업 호출
	callDM33010P('modal-DM33010P');



}