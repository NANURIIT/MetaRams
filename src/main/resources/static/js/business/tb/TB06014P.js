var option = {}
	option.title = "Error";
	option.type = "error";
	
$(document).ready(function() {

	docRdySettings();
	
});

/**
 * show modal 
 */
function callTB06014P(prefix) {
	clearTB06014P();
	$('#TB06014P_prefix').val(prefix);
	$('#modal-TB06014P').modal('show');
	indexChangeHandler("TB06014P");
}

/**
 * hide modal
 */
function modalClose_TB06014P() {
	clearTB06014P();
	$('#modal-TB06014P').modal('hide');
};

/**
 * clear modal
 */
function clearTB06014P() {
	$('#TB06014P_bssAsstList').html("");
	$('#TB06014P_prdtCd').val("");
	$('#TB06014P_prdtNm').val("");
	$('#TB06014P_bssAsstMngmNo').val("");
	$('#TB06014P_bssAsstMngmNm').val("");
	$('#TB06014P_bsnsRgstNo').val("");
	$('#TB06014P_entpRnm').val("");
	$('#TB06014P_corpRgstNo').val("");
	$('#TB06014P_B019').val("");
	$('#TB06010S_idst_prdtCd').val("");
	$('#TB06010S_idst_prdtNm').val("");
	$('#TB06014P_O006').val("");
	$('#TB06014P_I020').val("");
	$('#TB06014P_I021').val("");
	// 화면 로드시 부동산(개발형, PF) 버튼 default setting
	$('#TB06014P_toggleBtn5, #TB06014P_toggleBtn6, #TB06014P_toggleBtn7').removeClass('btn-info').addClass('btn-default');
	$('#TB06014P_toggleBtn4').removeClass('btn-default').addClass('btn-info');
}

/**
 * 문서로드시 세팅
 */
function docRdySettings() {
	TB060414P_modalShowFunction();
	keyDownEnter_TB06014P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function TB060414P_modalShowFunction() {
	$('#modal-TB06014P').on('shown.bs.modal', function() {
		$('#modal-TB06014P input[id=TB06014P_prdtCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06014P() {
	$("input[id=TB06014P_prdtCd]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getBssAsstList();
		}
	});
}

/**
 * 초기화 버튼 클릭시
 */
function btnReset() {
	$('#TB06014P_prdtCd').val("");	// 종목코드
	$('#TB06014P_prdtNm').val("");	// 종목명
}

/**
 * 종목코드 조회 ajax
 */
function getBssAsstList() {
	
	var prdtCd = $("#TB06014P_prdtCd").val();

	var dtoParam = {
			   "prdtCd": prdtCd
	};

	$.ajax({
		type: "GET",
		url: "/TB06014P/getBaseAsst",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var html = '';
			var baseAsstList = data;
			$('#TB06014P_bssAsstList').html(html);

			if (baseAsstList.length > 0) {
				$.each(baseAsstList, function(key, value) {
					html += '<tr ondblclick="setBssAsstInfo(this);">';
					html += '<td class="text-center">' + handleNullData(value.bssAsstMngmNo) + '</td>';			// 기초자산관리번호
					html += '<td style="display:none;">' + value.bssAsstTpCd + '</td>';							// 기초자산유형코드
					html += '<td class="text-left">' + handleNullData(value.bssAsstTpCdNm) + '</td>';			// 기초자산유형코드명
					html += '<td class="text-left">' + handleNullData(value.bssAsstNm) + '</td>';				// 기초자산명
					html += '<td class="text-center">' + handleNullData(value.trOthrNm) + '</td>';				// 거래상대방명
					html += '<td style="display:none;">' + value.stsStnIdstClsfCd + '</td>';					// 통계청표준산업분류코드
					html += '<td class="text-left">' + handleNullData(value.stsStnIdstClsfCdNm) + '</td>';		// 통계청표준산업분류코드명
					html += '<td style="display:none;">' + value.trOthrDscmNo + '</td>';						// 실질거래상대방 사업자등록번호 
					html += '<td style="display:none;">' + value.crno + '</td>';								// 실질거래상대방 법인번호
					html += '<td style="display:none;">' + value.eprzSclDcd + '</td>';							// 기업규모 
					html += '<td style="display:none;">' + value.crdtGrdDcd + '</td>';							// 신용등급 
					html += '<td style="display:none;">' + value.bssAsstTpCd + '</td>';							// 사업유형구분코드 
					html += '<td style="display:none;">' + value.bssAsstDetlTpDcd + '</td>';					// 상세유형구분코드
					html += '<td style="display:none;">' + value.bssAsstInvShpDcd + '</td>';					// 처리구분 기초자산투자형태구분코드
					html += '<td style="display:none;">' + value.delYn + '</td>';								// 삭제여부
					html += '</tr>';
				})
				$('#TB06014P_bssAsstList').html(html);
			} else {
				html += '<tr>';
				html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
				$('#TB06014P_bssAsstList').html(html);
			}
		}
	});
};

/**
 * dblclick event function
 */
function setBssAsstInfo(e) {	
	var tr = $(e);
	var td = $(tr).children();
	
	$('#TB06014P_bssAsstMngmNo').val(td.eq(0).text());					// 기초자산번호
	$('#TB06014P_bssAsstMngmNm').val(td.eq(3).text());					// 기초자산명
	$('#TB06014P_bsnsRgstNo').val(td.eq(7).text());						// 실질거래상대방 사업자등록번호
	$('#TB06014P_entpRnm').val(td.eq(4).text());						// 실질거래상대방 업체한글명
	$('#TB06014P_corpRgstNo').val(td.eq(8).text());						// 실질거래상대방 법인번호
	$('#TB06014P_B019').val(td.eq(9).text());							// 기업규모
	$('#TB06014P_I006').val(td.eq(5).text());							// 산업(업종)
	$('#TB06014P_O006').val(td.eq(10).text());							// 신용등급
	$('#TB06014P_I020').val(td.eq(11).text());							// 사업유형구분코드
	$('#TB06014P_I021').val(td.eq(12).text());							// 상세유형구분코드
	$('#TB06014P_B018').val(td.eq(13).text());							// 처리구분
	$('#TB06014P_delYn').val(td.eq(14).text());							// 삭제여부

	// 데이터에 따른 버튼 활성화전 버튼 클래스 초기화
	$('#TB06014P_toggleBtn4, #TB06014P_toggleBtn5, #TB06014P_toggleBtn6, #TB06014P_toggleBtn7').removeClass('btn-info').addClass('btn-default');
	if( $('#TB06014P_B018').val() == '1' ) {
		$('#TB06014P_toggleBtn4').removeClass('btn-default').addClass('btn-info')
	} else if ( $('#TB06014P_B018').val() == '2' ){
		$('#TB06014P_toggleBtn5').removeClass('btn-default').addClass('btn-info')
	} else if ( $('#TB06014P_B018').val() == '3' ) {
		$('#TB06014P_toggleBtn6').removeClass('btn-default').addClass('btn-info')
	} else if ( $('#TB06014P_B018').val() == '5' ) {
		$('#TB06014P_toggleBtn7').removeClass('btn-default').addClass('btn-info')
	}
}

/**
 * 종목코드 실행 버튼 클릭시
 */
function btnSave() {
	if ( $('#TB06014P_toggleBtn1').attr('class').includes('btn-info') ) {
		// insert시 기초자산명, 실질거래상대방을 필수입력값으로 임시 지정
		if ( !isEmpty($('#TB06014P_bssAsstMngmNo').val()) || isEmpty($('#TB06014P_bssAsstMngmNm').val()) || isEmpty($('#TB06014P_bsnsRgstNo').val()) ) {
			if ( !isEmpty($('#TB06014P_bssAsstMngmNo').val()) ) {
				errorMsg = "이미 존재하는 기초자산번호입니다.";
			} else if ( isEmpty($('#TB06014P_bssAsstMngmNm').val()) ) {
				errorMsg = "기초자산명을 입력해주세요.";
				$('#TB06014P_bssAsstMngmNm').focus();
			} else if ( isEmpty($('#TB06014P_bsnsRgstNo').val()) ) {
				errorMsg = "거래상대방을 선택해주세요.";
				$('#TB06014P_bsnsRgstNo').focus();
			}
			Swal.fire({
				icon: 'error',
				title: "Error!",
				text: errorMsg,
				confirmButtonText: "확인"
			});
			return false;
		} else {
			regInfo();
		}
	} else if ( $('#TB06014P_toggleBtn2').attr('class').includes('btn-info') ) {
		if ( isEmpty($('#TB06014P_bssAsstMngmNo').val()) ) {
			option.text = "기초자산을 선택해주세요.";
			openPopup(option);
			return false;
		} else {
			updInfo();
		}
	} else if ( $('#TB06014P_toggleBtn3').attr('class').includes('btn-info') ) {
		if ( isEmpty($('#TB06014P_bssAsstMngmNo').val()) ) {
			option.text = "기초자산을 선택해주세요.";
			openPopup(option);
			return false;
		} else {
			delInfo();
		}
	}
}

/**
 * 실행 버튼 클릭시 등록
 */
function regInfo() {
	if (!chkParam()) {
		return false;
	}

	var paramData = makeDtoParam();

	$.ajax({
		type: "POST",
		url: "/TB06014P/rgstAsst",
		data: paramData,
		dataType: "json",

		success: function(data) {

			if (data > 0) {
				Swal.fire({
					title: '종목코드정보를 등록하였습니다.',
					icon: 'success',
					confirmButtonText: '확인',
				}).then((result) => {
					getBssAsstList();
				});
			} else {
				Swal.fire({
					title: '종목코드정보를 등록하는데 실패하였습니다.',
					icon: 'error',
					confirmButtonText: '확인',
				});
			}
		}
	});
}

/**
 * 실행 버튼 클릭시 수정
 */
function updInfo() {
	if (!chkParam()) {
		return false;
	}
	
	var paramData = makeDtoParam();
	
	$.ajax({
		type: "POST",
		url: "/TB06014P/mdfAsst",
		data: paramData,
		dataType: "json",

		success: function(data) {

			if (data > 0) {
				Swal.fire({
					title: '종목코드정보를 수정하였습니다.',
					icon: 'success',
					confirmButtonText: '확인',
				}).then((result) => {
					getBssAsstList();
				});
			} else {
				Swal.fire({
					title: '종목코드정보를 수정하는데 실패하였습니다.',
					icon: 'error',
					confirmButtonText: '확인',
				});
			}
		}
	});
}

/**
 * 실행 버튼 클릭시 삭제
 */
function delInfo() {
	if (!chkParam()) {
		return false;
	}
	
	var paramData = makeDtoParam();
	
	$.ajax({
		type: "POST",
		url: "/TB06014P/mdfAsst",
		data: paramData,
		dataType: "json",

		success: function(data) {

			if (data > 0) {
				Swal.fire({
					title: '종목코드정보를 삭제하였습니다.',
					icon: 'success',
					confirmButtonText: '확인',
				}).then((result) => {
					getBssAsstList();
				});
			} else {
				Swal.fire({
					title: '종목코드정보를 삭제하는데 실패하였습니다.',
					icon: 'error',
					confirmButtonText: '확인',
				});
			}
		}
	});
}

function makeDtoParam() {
	var prdtCd = $("#TB06014P_prdtCd").val();						// 종목코드
	var bssAsstMngmNo = $('#TB06014P_bssAsstMngmNo').val();			// 기초자산번호
	var bssAsstNm = $('#TB06014P_bssAsstMngmNm').val();        		// 기초자산명
	var trOthrDscmNo = $('#TB06014P_bsnsRgstNo').val();	        	// 실질거래상대방 사업자등록번호
	var trOthrNm = $('#TB06014P_entpRnm').val();		        	// 실질거래상대방 업체한글명
	var crno = $('#TB06014P_corpRgstNo').val();	        			// 실질거래상대방 법인번호
	var eprzSclDcd = $('#TB06014P_B019').val();			        	// 기업규모
	var stsStnIdstClsfCd = $('#TB06014P_I006').val();			    // 산업(업종)
	var crdtGrdDcd = $('#TB06014P_O006').val();			        	// 신용등급
	var bssAsstTpCd = $('#TB06014P_I020').val();			        // 사업유형구분코드
	var bssAsstDetlTpDcd = $('#TB06014P_I021').val();			    // 상세유형구분코드
	var delYn = '';													// 삭제여부
	if ( $('#TB06014P_toggleBtn2').attr('class').includes('btn-info') ) {
		delYn = 'N';
	} else if ( $('#TB06014P_toggleBtn3').attr('class').includes('btn-info') ) {
		delYn = 'Y';			    								
	}
	var bssAsstInvShpDcd = '';										// 처리구분		
	if ( $("#TB06014P_toggleBtn4").hasClass("btn-info") ) {
		bssAsstInvShpDcd = '1';
	} else if ($("#TB06014P_toggleBtn5").hasClass("btn-info")) {
		bssAsstInvShpDcd = '2';
	} else if ($("#TB06014P_toggleBtn6").hasClass("btn-info")) {
		bssAsstInvShpDcd = '3';
	} else if ($("#TB06014P_toggleBtn7").hasClass("btn-info")) {
		bssAsstInvShpDcd = '5';
	}  																

	var dtoParam = {
				 	"prdtCd": prdtCd
		, 	 "bssAsstMngmNo": bssAsstMngmNo
		, 	  	 "bssAsstNm": bssAsstNm
		,  	  "trOthrDscmNo": trOthrDscmNo.replaceAll('-','')
		, 	   	  "trOthrNm": trOthrNm
		, 		   	  "crno": crno.replaceAll('-','')
		, 	 	"eprzSclDcd": eprzSclDcd
		, "stsStnIdstClsfCd": stsStnIdstClsfCd
		, 		"crdtGrdDcd": crdtGrdDcd
		, 	   "bssAsstTpCd": bssAsstTpCd
		, "bssAsstDetlTpDcd": bssAsstDetlTpDcd
		, 			 "delYn": delYn
		, "bssAsstInvShpDcd": bssAsstInvShpDcd
	};
	return dtoParam;
}

function chkParam() {
	if (isEmpty($('#TB06014P_prdtCd').val())) {
		option.text = "종목코드를 조회해주세요.";
		openPopup(option);
		return false;
	}
	return true;
}
