var ldvdCd;
var mdvdCd;
var sdvdCd;

$(document).ready(function() {
	loadSelectBoxContents();
});

// 셀렉트박스 내용
function loadSelectBoxContents() {

	loadInspctDprtCcd();		// 심사부서구분
	loadInvstGdsLdvdCd();		// 투자구분1
	loadInvstGdsMdvdCd();		// 투자구분2
	loadInvstGdsSdvdCd();		// 투자구분3
	loadFncGdsDvdCd();			// 금융상품분류
	loadCntyCd();				// 투자국가
	loadInvstCrncyCd(); 		// 통화
	loadCheckItemCd();			// 업무구분
	loadInvstThingCcd();		// 투자물건
	loadInvstThingDtlsCcd(); 	// 투자물건상세
	loadMrtgKndCcd();			// 담보종류
	loadMrtgDtlsCcd();			// 담보상세
	loadBsnsAreaCd();			// 사업지역
	loadWmKeyStrategy();		// WM주요전략
	loadAcqAsts();				// 편입자산
	loadUndAsts();				// WM기초자산
	loadBsnsSttsCcd();			// 사업단계
	loadFwpMngCcd();			// 사후관리
	loadInspctPrgrsStCd();		// 심사진행상태

	onChangeInvstGdsLdvdCd();	// 투자상품 대분류코드 이벤트 핸들러
	onChangeInvstGdsMdvdCd();	// 투자상품 중분류코드 이벤트 핸들러
}

// 심사부서구분
function loadInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_inspctDprtCcd').html(html);
		}
	});
}

// 투자구분1
function loadInvstGdsLdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I012",
		dataType: "json",
		success: function(data) {
			ldvdCd = data;

			var html = "";
			$('#DM33030S_invstGdsLdvdCd').html(html);
			html += "<option value=''>전체</option>";

			if (ldvdCd.length > 0) {
				$.each(ldvdCd, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_invstGdsLdvdCd').html(html);

			loadInvstGdsMdvdCd();
		}
	});
}

// 투자구분2
function loadInvstGdsMdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I015",
		dataType: "json",
		success: function(data) {
			mdvdCd = data;

			var selectedLdvdCd = $('#DM33030S_invstGdsLdvdCd').val();
			changeInvstGdsMdvdCd(selectedLdvdCd);

			loadInvstGdsSdvdCd();
		}
	})
}

// 투자구분3
function loadInvstGdsSdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I014",
		dataType: "json",
		success: function(data) {
			sdvdCd = data;

			var selectedMdvdCd = $('#DM33030S_invstGdsMdvdCd').val(); // DM33030S_invstGdsSdvdCd
			changeInvstGdsSdvdCd(selectedMdvdCd);
		}
	});
}

/**
 * 투자상품 대분류코드 이벤트 핸들러
 */
function onChangeInvstGdsLdvdCd() {
	$('#DM33030S_invstGdsLdvdCd').on('change', function() {
		var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
		changeInvstGdsMdvdCd(selectedLdvdCd);
	});
}

function changeInvstGdsMdvdCd(selectedLdvdCd) {
	var html = "";
	$('#DM33030S_invstGdsMdvdCd').html(html);
	html += "<option value=''>전체</option>";

	if (mdvdCd != undefined && mdvdCd.length > 0) {
		var validMdvdCds = [];
		var selectedLdvdPrefix = selectedLdvdCd.slice(0, -1);

		$.each(mdvdCd, function(key, value) {
			if (value.CD_VL_ID.startsWith(selectedLdvdPrefix)) {
				validMdvdCds.push(value.CD_VL_ID);
			}
		});

		if (validMdvdCds.length > 0) {
			$.each(mdvdCd, function(key, value) {
				if (validMdvdCds.includes(value.CD_VL_ID)) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				}
			});

			$('#DM33030S_invstGdsMdvdCd').html(html);
			$('#DM33030S_invstGdsMdvdCd').val($('#DM33030S_invstGdsMdvdCd').val()).prop("selected", true).change();
		}
	}
}


/**
 * 투자상품 중분류코드 이벤트 핸들러
 */
function onChangeInvstGdsMdvdCd() {
	$('#DM33030S_invstGdsMdvdCd').on('change', function() {
		var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
		changeInvstGdsSdvdCd(selectedMdvdCd);
	});
}

function changeInvstGdsSdvdCd(selectedMdvdCd) {
	var html = "";
	$('#DM33030S_invstGdsSdvdCd').html(html);
	html += "<option value=''>전체</option>";


	if (sdvdCd != undefined && sdvdCd.length > 0) {
		var validSdvdCds = [];

		$.each(sdvdCd, function(key, value) {
			if (value.CD_VL_ID.startsWith(selectedMdvdCd)) {
				validSdvdCds.push(value.CD_VL_ID);
			}
		});

		if (validSdvdCds.length > 0) {
			$.each(sdvdCd, function(key, value) {
				if (validSdvdCds.includes(value.CD_VL_ID)) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				}
			});

			$('#DM33030S_invstGdsSdvdCd').html(html);
		}
	}
}

// 금융상품분류
function loadFncGdsDvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_fncGdsDvdCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_fncGdsDvdCd').html(html);
		}
	});
}

// 투자국가
function loadCntyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_cntyCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_cntyCd').html(html);
		}
	});
}

// 통화
function loadInvstCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_invstCrncyCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_ID + '</option>';
				});

			}
			$('#DM33030S_invstCrncyCd').html(html);
		}
	});
}

// 업무구분
function loadCheckItemCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/C004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_checkItemCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_checkItemCd').html(html);
		}
	});
}

// 투자물건
function loadInvstThingCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I010",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_invstThingCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_invstThingCcd').html(html);
		}
	});
}

// 투자물건상세
function loadInvstThingDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I011",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_invstThingDtlsCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_invstThingDtlsCcd').html(html);
		}
	});
}

// 담보종류
function loadMrtgKndCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/M002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_mrtgKndCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_mrtgKndCcd').html(html);
		}
	});
};

// 담보상세
function loadMrtgDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/M001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_mrtgDtlsCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_mrtgDtlsCcd').html(html);
		}
	});
};

// 사업지역
function loadBsnsAreaCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_bsnsAreaCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_bsnsAreaCd').html(html);
		}
	});
}

// WM주요전략
function loadWmKeyStrategy() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U007",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_wmKeyStrategy').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_wmKeyStrategy').html(html);
		}
	});
}

// 편입자산
function loadAcqAsts() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U008",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_acqAsts').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_acqAsts').html(html);
		}
	});
}

// WM기초자산
function loadUndAsts() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U009",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_undAsts').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_undAsts').html(html);
		}
	});
}

// 사업단계
function loadBsnsSttsCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/B003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_bsnsSttsCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_bsnsSttsCcd').html(html);
		}
	});
}

// 사후관리
function loadFwpMngCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_fwpMngCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_fwpMngCcd').html(html);
		}
	});
}

// 심사진행상태
function loadInspctPrgrsStCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#DM33030S_inspctPrgrsStCd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#DM33030S_inspctPrgrsStCd').html(html);
		}
	});
}

// 초기화
function btnReset() {
	$('#datepicker').val("");													// 기준년월
	$('#ibDealNm').val('');														// 안건명
	$('#DM33030S_bscAstsCntnt').val('');										// 자산명
	$("#DM33030S_inspctDprtCcd option:eq(0)").prop("selected", true);			// 심사부서구분
	$('#DM33030S_invstTrgt').val('');											// 주요투자대상
	$("#DM33030S_invstGdsLdvdCd option:eq(0)").prop("selected", true);			// 투자구분1
	$("#DM33030S_invstGdsMdvdCd option:eq(0)").prop("selected", true);			// 투자구분2
	$("#DM33030S_invstGdsSdvdCd option:eq(0)").prop("selected", true);			// 투자구분3
	$("#DM33030S_fncGdsDvdCd option:eq(0)").prop("selected", true);				// 금융상품분류
	$("#DM33030S_cntyCd option:eq(0)").prop("selected", true);					// 투자국가
	$("#DM33030S_invstCrncyCd option:eq(0)").prop("selected", true);			// 통화
	$("#DM33030S_checkItemCd option:eq(0)").prop("selected", true);				// 업무구분
	$("#DM33030S_invstThingCcd option:eq(0)").prop("selected", true);			// 투자물건
	$("#DM33030S_invstThingDtlsCcd option:eq(0)").prop("selected", true);		// 투자물건상세
	$("#DM33030S_mrtgKndCcd option:eq(0)").prop("selected", true);				// 담보종류
	$("#DM33030S_mrtgDtlsCcd option:eq(0)").prop("selected", true);				// 담보상세
	$("#DM33030S_bsnsAreaCd option:eq(0)").prop("selected", true);				// 사업지역
	$("#DM33030S_wmKeyStrategy option:eq(0)").prop("selected", true);			// WM주요전략
	$("#DM33030S_acqAsts option:eq(0)").prop("selected", true);					// 편입자산
	$("#DM33030S_undAsts option:eq(0)").prop("selected", true);					// WM기초자산
	$("#DM33030S_bsnsSttsCcd option:eq(0)").prop("selected", true);				// 사업단계
	$("#DM33030S_fwpMngCcd option:eq(0)").prop("selected", true);				// 사후관리단계
	$("#DM33030S_inspctPrgrsStCd option:eq(0)").prop("selected", true);			// 심사진행

	$('#DM33030S_dprt_dprtCd').val('');											// 부서
	$('#DM33030S_dprt_dprtNm').val('');
	$('#DM33030S_emp_eno').val('');												// 담당자
	$('#DM33030S_emp_empNm').val('');
	$('#DM33030S_ownP_eno').val('');											// 심사역
	$('#DM33030S_ownP_empNm').val('');

}




