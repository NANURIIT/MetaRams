var pfx = '';
let modalArrPqGridRmFileInfo2;
$(document).ready(function () {
	loadUserAuth();
	setMetDt();
	// datepicker 초기화
	$(".input-group.date").datepicker({
		format: "yyyy-mm-dd",
		todayBtn: "linked",
		keyboardNavigation: false,
		forceParse: false,
		calendarWeeks: false,
		autoclose: true,
		language: "ko",
	});
	$(".input-group.month").datepicker({
		format: "yyyy-mm",
		keyboardNavigation: false,
		forceParse: false,
		calendarWeeks: false,
		autoclose: true,
		language: "ko",
		minViewMode: "months",
		startView: "months",
	});
	$(".input-group.clockpicker").clockpicker({});

	$("#TB03031P_rm_bsnsRgstNo").inputmask('999-99-99999');
	$("#TB03031P_rm_corpRgstNo").inputmask('999999-9999999');
	$("#TB03031P_cstmPhNo").inputmask('99999999999');

	let columns = {
		cstmNm: 200
		, metTitl: 200
		, metPrps: 200
		, metCntnt: 2000
	}
	limitInputLength(columns, "TB03031S");

	$('#TB03031P_rm_entpRnm').on('input', function () {
		$('#TB03031P_rm_entpCd').val("");
	})

});

/**
 * 신규활동 등록 모달 팝업 show
 */
function callTB03031P(prefix) {
	modalReset();
	$('#prefix_TB03031P').val(prefix);
	$('#modal-TB03031P').modal('show');
	indexChangeHandler("TB03031P");

	if (isNotEmpty($("#TB03030S_entpCd").val())) {
		$("#TB03031P_rm_corpRgstNo").val(checkBrnAcno($("#TB03030S_corpRgstNo").val()));
		$("#TB03031P_rm_bsnsRgstNo").val(checkBrnAcno($("#TB03030S_bsrnRgstNo").val()));
		$("#TB03031P_rm_entpCd").val($("#TB03030S_entpCd").val());
		$("#TB03031P_rm_entpRnm").val($("#TB03030S_entpNm").val());
	}
}

/**
 * 모달 팝업 show
 */
function callTB03031PRmHistoryInfo(prefix) {
	$('#prefix_TB03031P').val(prefix);
	$('#modal-TB03031P').modal('show');
}

/**
 * close modal
 */
function modalClose_TB03031P() {
	$('#modal-TB03031P').modal('hide');

};

/**
 * hide modal
*/
// $("#modal-TB03031P").on('hide.bs.modal', function(){
// 	console.log("데이트피커가 모달 안에 존재한다면 모달이 강제 하이드가 됩니다. 때문에 이 이벤트는 없애도록 하겠습니다 만약 다시 열어서 이 콘솔을 확인하신다면 앞으로 소스 바꾸실때 하나씩 바꿔가며 테스트 하도록 합시다");
// 	// $("#gridModalRmFileInfo").pqGrid("option", "dataModel.data", []);
// 	// $("#gridModalRmFileInfo").pqGrid("refreshDataAndView");
// 	// $("#gridModalRmFileInfo").pqGrid('destroy');
// 	// modalReset();
//   });

//모달 오픈 애니메이션 후 포커스 주도록 설정
$('#modal-TB03031P').on('shown.bs.modal', function () {
	// $('#modal-TB03031P input[id=TB03031P_rm_entpRnm]').focus();
});

// 담당직원정보
function loadUserAuth() {
	$.ajax({
		type: "GET",
		url: "/getUserAuth",
		dataType: "json",
		success: function (data) {
			$('#TB03031P_dprtCd').val(data.dprtCd);
			$('#TB03031P_dprtNm').val(data.dprtNm);
			$('#TB03031P_eno').val(data.eno);
			$('#TB03031P_empNm').val(data.empNm);
		}
	});
}

function registRmSave() {
	var entpHnglNm = $('#TB03031P_rm_entpRnm').val();						// 업체명
	var corpRgstNo = $('#TB03031P_rm_corpRgstNo').val();					// 법인등록번호
	var bsnsRgstNo = $('#TB03031P_rm_bsnsRgstNo').val();					// 사업자번호
	var metTitl = $('#TB03031P_metTitl').val();								// 미팅제목
	var metDt = $('#TB03031P_metDt').val();									// 미팅일자
	var metTm = $('#TB03031P_metTm').val();									// 미팅시간
	var metPrps = $('#TB03031P_metPrps').val();								// 미팅목적
	var metCntnt = $('#TB03031P_metCntnt').val();							// 미팅내용
	var chrgDprtCd = $('#TB03031P_dprtCd').val();							// 담당부서
	var chrgPEno = $('#TB03031P_eno').val();								// 담당자
	var cstmNm = $('#TB03031P_cstmNm').val();								// 고객명
	var cstmPhNo = $('#TB03031P_cstmPhNo').val();							// 고객연락처
	var rmSq = Number($('#TB03031P_rmSq').val());   						// 일련번호
	var lastYn = 'Y'														// 최종여부
	var entpCd = $("#TB03031P_rm_entpCd").val();							// 업체코드

	// 유효성 검사
	if (isEmpty(entpHnglNm) || isEmpty(cstmNm) || isEmpty(metDt) || isEmpty(metTitl) || isEmpty(metPrps) || isEmpty(metCntnt)) {

		let errorMsg = "";

		if (isEmpty(entpHnglNm)) {
			errorMsg = "업체명을 선택해 주세요.";
			$('#TB03031P_rm_entpRnm').focus();

		} else if (isEmpty(cstmNm)) {
			errorMsg = "고객담당자를 입력해 주세요.";
			$('#TB03031P_cstmNm').focus();

		} else if (isEmpty(metDt)) {
			errorMsg = "미팅일자를 선택해 주세요.";
			$('#TB03031P_metDt').focus();

		} else if (isEmpty(metTitl)) {
			errorMsg = "미팅제목을 선택해 주세요.";
			$('#TB03031P_metTitl').focus();

		} else if (isEmpty(metPrps)) {
			errorMsg = "미팅목적을 선택해 주세요.";
			$('#TB03031P_metPrps').focus();

		} else if (isEmpty(metCntnt)) {
			errorMsg = "미팅내용을 선택해 주세요.";
			$('#TB03031P_metCntnt').focus();
		}

		Swal.fire({
			icon: 'error',
			title: "Error!",
			text: errorMsg,
			confirmButtonText: "확인"
		});

		return false;

	} else {
		if (corpRgstNo) {
			var valCorp = corpRgstNo.replace(/[^0-9]/g, '');
			if (valCorp.length !== 13) {
				Swal.fire({
					icon: 'error',
					title: "Error!",
					text: "법인번호 13자리를 확인해주세요.",
					confirmButtonText: "확인"
				});
				return;
			}
		}
		if (bsnsRgstNo) {
			var valCorp = bsnsRgstNo.replace(/[^0-9]/g, '');
			if (valCorp.length !== 10) {
				Swal.fire({
					icon: 'error',
					title: "Error!",
					text: "사업자등록번호 10자리를 확인해주세요.",
					confirmButtonText: "확인"
				});
				return;
			}
		}
		businessFunction();

	}

	function businessFunction() {

		var paramData = {
			"entpHnglNm": entpHnglNm.replaceAll('-', '')
			, "bsnsRgstNo": bsnsRgstNo.replaceAll('-', '')
			, "corpRgstNo": corpRgstNo.replaceAll('-', '')
			, "metTitl": metTitl
			, "metDt": metDt
			, "metTm": metTm
			, "metPrps": metPrps
			, "metCntnt": metCntnt
			, "chrgDprtCd": chrgDprtCd
			, "chrgPEno": chrgPEno
			, "cstmNm": cstmNm
			, "cstmPhNo": cstmPhNo.replaceAll('-', '')
			, "rmSq": rmSq
			, "lastYn": lastYn
			, "entpCd": entpCd
		}
		//RM활동이력 등록,수정				
		$.ajax({
			type: "POST",
			url: "/TB03030S/registRmInfo",
			data: paramData,
			dataType: "json",
			success: function () {
				makeToDoList(chrgPEno, '02', '(회의) RM활동관리', '/TB03030S', 'entpHnglNm=' + entpHnglNm, entpHnglNm);

				if (pfx === 'TB03030S' || pfx === 'TB02010S') {
					$('#prefix_TB03031P').val(prefix);
					$('#TB03030S_entpRnm').val(entpHnglNm);
				}

				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "활동정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					if (pfx === 'TB03030S' || pfx === 'TB02010S') {
						$('#prefix_TB03031P').val(prefix);
						//setRmInfo($('#TB03030S_entpInfo').children('tr').first());
					}
					$('#modal-TB03031P').modal('hide');
					TB03030Sjs.getEntpInfo();
					$("#gridRmEntpInfo").pqGrid("option", "dataModel.data", []);
					$("#gridRmEntpInfo").pqGrid("refreshDataAndView");
					$("#gridRmInfo").pqGrid("option", "dataModel.data", []);
					$("#gridRmInfo").pqGrid("refreshDataAndView");
				});
			},
			error: function () {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "활동정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 모달창 데이터 초기화
function modalReset() {

	//$('#TB03031P_rm_entpRnm').val("");			// 업체명
	//$('#TB03031P_rm_corpRgstNo').val("");		// 법인등록번호
	//$('#TB03031P_rm_bsnsRgstNo').val("");		// 사업자등록번호
	$('#TB03031P_metTitl').val("");				// 미팅제목
	$('#TB03031P_metDt').val("");				// 미팅일자
	$('#TB03031P_metTm').val("");				// 미팅시간
	$('#TB03031P_metPrps').val("");				// 미팅목적
	$('#TB03031P_metCntnt').val("");			// 미팅내용
	//$('#TB03031P_dprtCd').val("");			// 담당부서
	//$('#TB03031P_eno').val("");				// 담당자
	$('#TB03031P_cstmNm').val("");				// 고객명
	$('#TB03031P_cstmPhNo').val("");			// 고객연락처
	$("#TB03031P_rm_entpCd").val("");			// 업체코드
	$("#TB03031P_rmSq").val("");				// rm일련번호

}

// 금일 날짜 세팅
function setMetDt() {
	$('#TB03031P_metDt').val(getToday());
}