// DOM 생성..
$(document).ready(function() {

	loadContents();
	groupEnableControl("#PM22110S_mntrCntntGroup", false);

});

// SelectBox코드 호출
function loadContents(){
	loadRaDealCcd();
	loadRiskInspctMngSttsCd();
}


// 보고구분 RADEAL구분코드
function loadRaDealCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#PM22110S_raDealCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#PM22110S_raDealCcd').html(html);
		}
	});
};

// 관리단계분류 리스크심사관리단계코드
function loadRiskInspctMngSttsCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R012",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#PM22110S_riskInspctMngSttsCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#PM22110S_riskInspctMngSttsCd').html(html);
		}
	});
};

// 사후관리 현황보고 조회
function getAfterMngSttnList() {

	let ibDealNo = $('#PM22110S_ibDealNo').val();
	var inspctPrgrsStCd = $('#PM22110S_inspctPrgrsStCd').val();
	var riskInspctCcd = $('#selectedRiskInspctCcd').val();
	var lstCCaseCcd = $('#selectedLstCCaseCcd').val();
	var raDealCcd = $('#PM22110S_raDealCcd').val();
	var riskInspctMngSttsCd = $('#PM22110S_riskInspctMngSttsCd').val();
	var dprtCd = $('#PM22110S_dprtCd').val();
	var dprtNm = $('PM22110S_dprtNm').val();
	var ibDealNm = $('PM22110S_ibDealNm').val();
	var astsNm = $('PM22110S_astsNm').val();

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

	function businessFunction() {

		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "raDealCcd": raDealCcd
			, "riskInspctMngSttsCd": riskInspctMngSttsCd
			, "dprtCd": dprtCd
			, "dprtNm": dprtNm
			, "ibDealNm": ibDealNm
			, "astsNm": astsNm
		};


		$.ajax({
			type: "GET",
			url: "/PM22110S/getAfterMngSttnList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#PM22110S_afterMngSttnList').html(html);


				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr ondblclick="setMntrCntnt(this)">';
						html += '<td>' + value.ibDealNo + '</td>';									// 안건번호.IBDEAL번호
						html += '<td>' + value.ibDealNm + '</td>';									// 안건명.IBDEAL명
						html += '<td>' + value.dprtNm + '</td>';									// 부점명
						html += '<td>' + value.chrgPEnoNm + '</td>';								// 담당자이름
						html += '<td style="display:none">' + value.fncGdsDvdCd + '</td>';			// 금융상품분류코드
						html += '<td>' + value.fncGdsDvdCdNm + '</td>';								// 금융상품분류.금융상품분류코드명
						html += '<td style="display:none">' + value.inspctDprtCcd + '</td>';		// 심사부서구분코드
						html += '<td>' + value.inspctDprtCcdNm + '</td>';							// 심사부서구분코드명
						html += '<td>' + value.ownPEnoNm + '</td>';									// 심사역
						html += '<td style="display:none">' + value.rsltnCnfrncCcd + '</td>';		// 결의협의회구분코드
						html += '<td>' + value.rsltnCnfrncCcdNm + '</td>';							// 결의협의회구분코드명
						html += '<td>' + value.invstAstsNm + '</td>';								// 투자자산명
						html += '<td style="display:none">' + value.astsQtyDvdCd + '</td>';			// 자산건전성분류코드
						html += '<td>' + value.astsQtyDvdCdNm + '</td>';							// 자산건전성분류코드명
						html += '<td style="display:none">' + value.riskInspctMngSttsCd + '</td>';	// 리스크심사관리단계코드
						html += '<td>' + value.riskInspctMngSttsCdNm + '</td>';						// 리스크심사관리단계코드명
						html += '<td>' + value.ctrtStrtDt + '</td>';								// 계약시작일자
						html += '<td>' + value.krwRa + '</td>';										// 원화잔액
						html += '<td style="display:none">' + value.caseMntrCntnt + '</td>';		// 안건모니터링내용
						html += '<td style="display:none">' + value.riskInspctCcd + '</td>';		// 리스크심사구분코드
						html += '<td style="display:none">' + value.lstCCaseCcd + '</td>';			// 부수안건구분코드
						html += '<td style="display:none">' + value.caseMntrDtlsCntnt + '</td>';	// 안건모니터링상세내용
						html += '<td style="display:none">' + value.mainSttn + '</td>';				// 주요현황
						html += '<td style="display:none">' + value.astsOutln + '</td>';			// 자산개요
						html += '<td style="display:none">' + value.wrkngSttn + '</td>';			// 운용현황
						html += '<td style="display:none">' + value.prgrsLps1 + '</td>';			// 진행경과1
						html += '<td style="display:none">' + value.prgrsLps2 + '</td>';			// 진행경과2
						html += '<td style="display:none">' + value.prgrsLps3 + '</td>';			// 진행경과3
						html += '</tr>'
					})
				}else {
					html += '<tr>';
					html += '<td colspan="13" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}

				$('#PM22110S_afterMngSttnList').html(html);
			},

		});
	}

}

// 사후관리 현황보고 상세조회
function setMntrCntnt(e){

	var tr = e;
	var td = $(tr).children();

	// 선택된 딜 정보 셋팅
	$('#selectedIbDealNo').val(td.eq(0).text());
	$('#selectedRiskInspctCcd').val(td.eq(19).text());
	$('#selectedLstCCaseCcd').val(td.eq(20).text());

	// 모니터링 내용 셋팅
	var mntrCntnt 		  = td.eq(18).text();
	var caseMntrDtlsCntnt = td.eq(21).text();
	var mainSttn 		  = td.eq(22).text();
	var astsOutln		  = td.eq(23).text();
	var wrkngSttn		  = td.eq(24).text();
	var prgrsLps1		  = td.eq(25).text();
	var prgrsLps2		  = td.eq(26).text();
	var prgrsLps2		  = td.eq(27).text();


	$('#PM22110S_mntrCntnt')    .val(mntrCntnt);
	$('#PM22110S_mntrDtlsCntnt').val(caseMntrDtlsCntnt);
	$('#PM22110S_mainSttn')     .val(mainSttn);
	$('#PM22110S_astsOutl')     .val(astsOutln);
	$('#PM22110S_wrkngSttn')    .val(wrkngSttn);
	$('#PM22110S_prgrsLps1')    .val(prgrsLps1);
	$('#PM22110S_prgrsLps2')    .val(prgrsLps2);
	$('#PM22110S_prgrsLps3')    .val(prgrsLps2);

	// 테이블에서 선택한 로우 활성, 비활성
	$('#PM22110S_afterMngSttnList tr').removeClass('table-active');

	$(tr).addClass('table-active');

	// 안건 모니터링 사항 입력 컴포넌트 일괄 활성화
	groupEnableControl("#PM22110S_mntrCntntGroup", true);
}

// 모니터링 사항 저장 유효성 검증
function mntrCntntSave(){
	var selectCaseYn = $('.table-active').eq(0).find('td').val();

	// 안건 선택 여부 검증
	if( selectCaseYn == "" ) {
		// 모니터링 사항 저장
		mergeMntrCntnt();
	}else{
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "안건을 선택해주세요."
			, confirmButtonText: "확인"
		});

		return false;
	}

}

// 모니터링 사항 저장
function mergeMntrCntnt(){

	/* 안건 정보 */
	var ibDealNo          = $('#selectedIbDealNo')      .val();
	var riskInspctCcd     = $('#selectedRiskInspctCcd') .val();
	var lstCCaseCcd       = $('#selectedLstCCaseCcd')   .val();
	/* 모니터링 정보 */
	var caseMntrCntnt     = $('#PM22110S_mntrCntnt')    .val();
	var caseMntrDtlsCntnt = $('#PM22110S_mntrDtlsCntnt').val();
	var mainSttn          = $('#PM22110S_mainSttn')		.val();
	var astsOutln         = $('#PM22110S_astsOutl')		.val();
	var wrkngSttn         = $('#PM22110S_wrkngSttn')	.val();
	var prgrsLps1         = $('#PM22110S_prgrsLps1')	.val();
	var prgrsLps2         = $('#PM22110S_prgrsLps2')	.val();
	var prgrsLps3         = $('#PM22110S_prgrsLps3')	.val();

	var dtoParam =
	{
		  "ibDealNo"          : ibDealNo              // IBDEAL번호
		, "riskInspctCcd"     : riskInspctCcd         // 리스크심사구분코드
		, "lstCCaseCcd"       : lstCCaseCcd           // 부수안건구분코드
		, "caseMntrCntnt"     : caseMntrCntnt         // 안건모니터링내용
		, "caseMntrDtlsCntnt" : caseMntrDtlsCntnt     // 안건모니터링상세내용
		, "mainSttn"		  : mainSttn              // 주요현황
		, "astsOutln"		  : astsOutln             // 자산개요
		, "wrkngSttn"		  : wrkngSttn             // 운용현황
		, "prgrsLps1"		  : prgrsLps1             // 진행경과1
		, "prgrsLps2"		  : prgrsLps2             // 진행경과2
		, "prgrsLps3"		  : prgrsLps3             // 진행경과3
	};

	// 비동기 통신 요청
	$.ajax({
		type: "POST",
		url: "/PM22110S/mergeMntrCntnt",
		data: dtoParam,
		dataType: "json",
		success: function() {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "안건 모니터링 사항을 저장하였습니다."
				, confirmButtonText: "확인"
			}).then(() => {
				getAfterMngSttnList();
			});
		},
		error: function() {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "안건 모니터링 사항을 저장하는데 실패하였습니다."
				, confirmButtonText: "확인"
			});
		}
	});

}