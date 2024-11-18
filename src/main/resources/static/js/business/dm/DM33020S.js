// DOM 생성..
$(document).ready(function() {
	//loadContents();
});

// SelectBox코드 호출
function loadContents(){
	//loadRaDealCcd();
	//loadRiskInspctMngSttsCd();
}

// 안건별 관리단계 조회
function getMngList() {

	var stdDt;
	var raDealCcd = $('#AS33020S_raDealCcd').val();
	var inspctDprtCcd = $('#AS33020S_inspctDprtCcd').val();
	var dprtCd = $('#acdnt_dprtCd').val();
	var ibDealSnmNm = $('#AS33020S_ibDealSnmNm').val();
	var invstAstsNm = $('#AS33020S_invstAstsNm').val();

	if ( $('#AS33020S_selectDt').val() == 'a' ){
		stdDt = $('#AS33020S_stdYrMmDate').val().replaceAll('-', '');            // 기준년도
	}else{
		stdDt = $('#AS33020S_stdYrMmDdDate').val().replaceAll('-', '');          // 기준일자
	}


	// 유효성검사
	if (isEmpty(stdDt)) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "기준일자를 선택해주세요."
				, confirmButtonText: "확인"
			});
			return false;
	} else {
		businessFunction();
	}


	function businessFunction() {

		var dtoParam = {
			   "stdDt"         : stdDt
			,  "raDealCcd"     : raDealCcd
			,  "inspctDprtCcd" : inspctDprtCcd
			,  "dprtCd"        : dprtCd
		    ,  "ibDealSnmNm"   : ibDealSnmNm
		    ,  "invstAstsNm"   : invstAstsNm
		};


		$.ajax({
			type: "GET",
			url: "/DM33020S/getMngList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#DM33020S_mngList').html(html);

				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr>'
						html += '<td style="display:none">' + 'N' + '</td>';						//
						html += '<td>' + value.STD_DT.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");  + '</td>';							//
						html += '<td>' + (value.RA_DEAL_CCD == '1' ? '투자자산' : '판매상품') + '</td>';							//
						html += '<td>' + value.IB_DEAL_NO + '</td>';							//
						html += '<td>' + value.IB_DEAL_SNM_NM + '</td>';							//
						html += '<td>' + value.RISK_INSPCT_CCD_NM + '</td>';							//
						html += '<td>' + value.LST_C_CASE_CCD_NM + '</td>';							//
						html += '<td>' + value.DPRT_NM + '</td>';							//
						html += '<td>' + value.CHRG_P_NM + '</td>';							//
						html += '<td>' + value.INSPCT_DPRT_CCD_NM + '</td>';							//
						html += '<td>' + value.OWN_P_NM + '</td>';							//
						html += '<td>' + value.STND_IS_CD + '</td>';							//
						html += '<td>' + value.HNGL_IS_NM + '</td>';							//
						html += '<td>' + value.BK_AMT + '</td>';							//
						html  = createQtyDvdBox(value.ASTS_QTY_DVD_CD, html);							//
						html += '<td><select class="form-control m-b" onchange="changedRowHandler(this);">';
						html  = createMngSttsBox(value.RISK_INSPCT_MNG_STTS_CD, html);
						html += '</select></td>';							//
						html += '<td><select class="form-control m-b" onchange="changedRowHandler(this);">';
						html  = createRprXclFBox(value.RPRT_XCL_F, html);
						html += '</select></td>';							//
						html += '<td style="display:none">' + value.RPRT_XCL_F + '</td>';						//
						html += '</tr>'
					});
				}else {
					html += '<tr>';
					html += '<td colspan="16" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}

				$('#DM33020S_mngList').html(html);
			},

		});
	}

}

/* 정보가 변경된 로우 기록 생성 */
function changedRowHandler(e){
	$(e).parent().parent().children('td').eq(0).text('Y')
}

// 안건별 관리단계 저장
function saveMngSttsInfo(){

	var validate = validateMngSttsInfo();
	var trCount = $('#DM33020S_mngList tr').length;

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

// 안건별 관리단계 유효성 검증
function validateMngSttsInfo(){

	var selectedTr = $('#DM33020S_mngList').children('tr').length;
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

/* 건전성분류 selectbox selected option 추가 함수 */
function createQtyDvdBox(astsQtyDvdCd, html){

	if(astsQtyDvdCd == "0"){
		html += '<td><select class="form-control m-b" disabled="disabled">';
		html += '<option value="0" selected>해당무</option>';
	} else {
		html += '<td><select class="form-control m-b" onchange="changedRowHandler(this);">';
	}
	if (astsQtyDvdCd == "1") {
		html += '<option value="1" selected>정상</option>';
	} else {
		html += '<option value="1">정상</option>';
	}
	if (astsQtyDvdCd == "2") {
		html += '<option value="2" selected>요주의</option>';
	} else {
		html += '<option value="2">요주의</option>';
	}
	if (astsQtyDvdCd == "3") {
		html += '<option value="3" selected>고정</option>';
	} else {
		html += '<option value="3">고정</option>';
	}
	if (astsQtyDvdCd == "4") {
		html += '<option value="4" selected>회수의문</option>';
	} else {
		html += '<option value="4">회수의문</option>';
	}
	if (astsQtyDvdCd == "5") {
		html += '<option value="5" selected>추정손실</option>';
	} else {
		html += '<option value="5">추정손실</option>';
	}

	return html;
}

/* 관리단계분류 selectbox selected option 추가 함수 */
function createMngSttsBox(riskInspctMngSttsCd, html){

	if(riskInspctMngSttsCd == "1"){
		html += '<option value="1" selected>정상</option>';
	}else{
		html += '<option value="1">정상</option>';
	}
	if(riskInspctMngSttsCd == "2"){
		html += '<option value="2" selected>사전</option>';
	}else{
		html += '<option value="2">사전</option>';
	}
	if(riskInspctMngSttsCd == "3"){
		html += '<option value="3" selected>중점</option>';
	}else{
		html += '<option value="3">중점</option>';
	}
	if(riskInspctMngSttsCd == "4"){
		html += '<option value="4" selected>적극</option>';
	}else{
		html += '<option value="4">적극</option>';
	}

	return html;
}

/* 보고서 제외여부 selectbox selected option 추가 함수 */
function createRprXclFBox(rprXclF, html){

	if(rprXclF == "Y"){
		html += '<option value="Y" selected>Y</option>';
	}else{
		html += '<option value="Y">Y</option>';
	}
	if(rprXclF == "N"){
		html += '<option value="N" selected>N</option>';
	}else{
		html += '<option value="N">N</option>';
	}

	return html;
}

/* 기준년도, 기준일자 변경 시 onchaged event */
function selectDtChanged(e){

	// 기준년도 a - 기준년도  b - 기준일자
	if($(e).val() == 'a'){
		$('#AS33020S_DateType').text('기준년도');
		$('#AS33020S_stdYrMmDdDate').val('');
		$('#AS33020S_stdYrMm').show();
		$('#AS33020S_stdYrMmDd').hide();
	// 기준일자
	}else{
		$('#AS33020S_DateType').text('기준일자');
		$('#AS33020S_stdYrMmDate').val('');
		$('#AS33020S_stdYrMm').hide();
		$('#AS33020S_stdYrMmDd').show();
	}



}