var ldvdCd;
var mdvdCd;
var sdvdCd;

$(document).ready(function() {

	setDatePicker();

	loadRaDealCcd();
	loadTabContents();
	
	// 부의금액(원) 계산
	checkErmAmt();
	// 투자기간 숫자입력 & 만기일 체크
	checkNumber();
	
	// url 정보 세팅은 마지막에 하도록 한다.
	getUrlDealInfo();

});

function getUrlDealInfo() {

	var ibDealNo = sessionStorage.getItem("ibDealNo");
	var riskInspctCcd = sessionStorage.getItem("riskInspctCcd");
	var lstCCaseCcd = sessionStorage.getItem("lstCCaseCcd");

	if (!isEmpty(ibDealNo) && !isEmpty(riskInspctCcd) && !isEmpty(lstCCaseCcd)) {
		$('#AS03210S_ibDealNo').val(ibDealNo);
		$('#AS03210S_selectedDealNo').val(ibDealNo);
		getDealList();
	}
}

function setDatePicker() {

	// #tab1_datepicker1 btn apply function
	$('#tab1_datepicker1').on('change', function() {
		var month = $("#invstPrdMmC").val();
		if (month != "") {
			calcDate();
		}
	});

}

// 인풋창 엔터키 검색시 페이지 스크롤이 사라지는 이슈로 미사용
function setKeyFunction_AS03210S() {

	$("input[id=AS03210S_ibDealNo]").keyup(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealList();
		}
	});
};

// 심사요청 버튼 function
function assesmentRequest() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		openPopup({ 
			type: 'error'
			, title: "Error!"
			, text: "심사요청하는 Deal 정보를 확인해 주세요." 
		});
	}

	function businessFunction() {
		let dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		};

		$.ajax({
			type: "POST",
			url: "/assesmentRequest",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "심사요청 상태로 변경하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			}
		}); // end of ajax
	}

}

// 심사요청취소 버튼 function
function assesmentRequestCancel() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "심사요청취소하는 Deal 정보를 확인해 주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {
		let dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		};

		$.ajax({
			type: "POST",
			url: "/assesmentRequestCancel",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "심사요청취소 상태로 변경하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			}
		}); // end of ajax
	}

}

// 심사요청보류버튼 function
function assesmentRequestHold() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "심사요청보류하는 Deal 정보를 확인해 주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {
		let dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		};

		$.ajax({
			type: "POST",
			url: "/assesmentRequestHold",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "심사요청보류 상태로 변경하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			}
		}); // end of ajax
	}

}

// deal List 가져오기
function getDealList() {

	let ibDealNo = $('#AS03210S_ibDealNo').val();

	// 유효성검사
	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal번호를 입력해 주세요."
			, confirmButtonText: "확인"
		});
	};

	function businessFunction() {
		var raDealCcd = $("#AS03210S_raDealCcd").val();

		var dtoParam = {
			"raDealCcd": raDealCcd
			, "ibDealNo": ibDealNo
		};


		$.ajax({
			type: "GET",
			url: "/getDealList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#AS03210S_ibDealList').html(html);


				var ibDealNo = sessionStorage.getItem("ibDealNo");
				var riskInspctCcd = sessionStorage.getItem("riskInspctCcd");
				var lstCCaseCcd = sessionStorage.getItem("lstCCaseCcd");
				var index = 0;
				var trindex = 0;

				if (dealList.length > 0) {
					$.each(dealList, function(key, value) {
						
						if(ibDealNo == value.ibDealNo && riskInspctCcd == value.riskInspctCcd && lstCCaseCcd == value.lstCCaseCcd){
							trindex	= index;
							sessionStorage.clear();
							//html += '<tr class="table-active" ondblclick="setTabContents(this);">';
						}
						html += '<tr ondblclick="setTabContents(this);">';
						html += '<td>' + value.ibDealNo + '</td>';
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';
						html += '<td>' + value.riskInspctCcdNm + '</td>';
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';
						html += '<td>' + value.lstCCaseCcdNm + '</td>';
						html += '<td style="display:none;">' + value.chrgPEno + '</td>';
						html += '<td>' + value.empNm + '</td>';
						html += '<td style="display:none;">' + value.inspctPrgrsStCd + '</td>';
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';
						html += '<td>' + value.ibDealNm + '</td>';
						html += '</tr>';
						
						index ++;
					})
				} else {
					html += '<tr>';
					html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#AS03210S_ibDealList').html(html);
				//ajax데이터로드와 sync 어려운관계로 더블클릭 하지않음
				//$('#ibDealActive tbody tr:eq(' + trindex + ')').dblclick();
			}
		});
	}
};

// 화면에서 deal Info 검색 후 더블클릭 set
function setTabContents(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();			// ibDeal번호
	var riskInspctCcd = td.eq(1).text();	// 리스크심사구분코드
	var lstCCaseCcd = td.eq(3).text();		// 부수안건구분코드
	$('#AS03210S_selectedDealNo').val(ibDealNo);
	
	$('#AS03210S_ibDealList tr').removeClass('table-active');
	tr.addClass('table-active');
	
	setTab1(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab2(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab3(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab4(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab5(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab6(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab7(ibDealNo, riskInspctCcd, lstCCaseCcd);
	setTab8(ibDealNo, riskInspctCcd, lstCCaseCcd);
}

// 안건구조tab setting
function setTab1(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getDealDetailInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
}

// 안건구조정보
function getDealDetailInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getDealDetailInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var dealDetail = data;


			$('#AS03210S_riskInspctCcd').prop("disabled", true);
			$('#AS03210S_lstCCaseCcd').prop("disabled", true);

			$('#AS03210S_riskInspctCcd').val(dealDetail.riskInspctCcd).prop("selected", true);				// 리스크심사구분
			$('#AS03210S_lstCCaseCcd').val(dealDetail.lstCCaseCcd).prop("selected", true);					// 부수안건
			$('#ibDealNm').val(dealDetail.ibDealNm);														// 안건명
			$('#ibDealSnmNm').val(dealDetail.ibDealSnmNm);													// 약어명
			$('#AS03210S_raRsltnCcd').val(dealDetail.raRsltnCcd).prop("selected", true);					// 전결구분
			$('#AS03210S_riskRcgNo').val(dealDetail.riskRcgNo);												// 리스크승인번호
			
			$('#AS03210S_inspctDprtCcd').val(dealDetail.inspctDprtCcd).prop("selected", true);				// 심사부서구분

			$('#AS03210S_invstGdsLdvdCd').val(dealDetail.invstGdsLdvdCd).prop("selected", true).change();	// 투자상품대분류

			$('#AS03210S_invstGdsMdvdCd').val(dealDetail.invstGdsMdvdCd).prop("selected", true).change();	// 투자상품중분류

			$('#AS03210S_invstGdsSdvdCd').val(dealDetail.invstGdsSdvdCd).prop("selected", true).change();	// 투자상품소분류

			$('#AS03210S_invstGdsDtlsDvdCd').val(dealDetail.invstGdsDtlsDvdCd).prop("selected", true);		// 투자상품상세분류

			$('#AS03210S_invstCrncyCd').val(dealDetail.invstCrncyCd).prop("selected", true);				// 부의기준통화
			$('#crncyAmt').val(comma(dealDetail.crncyAmt));						// 부의금액
			$('#AS03210S_cntyCd').val(dealDetail.invstNtnCd).prop("selected", true);						// 투자국가
			$('#aplcExchR').val(dealDetail.aplcExchR);														// 적용환율
			$('#crncyAmtWn').val(Number(dealDetail.ptcpAmt).toLocaleString("ko-KR"));						// 부의금액(원)

			$('#AS03210S_indTypDvdCd').val(dealDetail.indTypDvdCd).prop("selected", true);					// 고위험사업
			$('#AS03210S_checkItemCd').val(dealDetail.checkItemCd).prop("selected", true);					// 업무구분
			$('#AS03210S_bsnsAreaCd').val(dealDetail.raBsnsZoneCd).prop("selected", true);					// 사업지역
			$('#AS03210S_invstThingCcd').val(dealDetail.invstThingCcd).prop("selected", true);				// 주요투자물건
			$('#AS03210S_invstThingDtlsCcd').val(dealDetail.invstThingDtlsCcd).prop("selected", true);		// 투자물건상세

			$('#invstPrdMmC').val(dealDetail.invstPrdMmC);													// 투자기간(개월)
			$('#tab1_datepicker1').val(dealDetail.wrtDt);													// 기표일(예정)
			$('#mtrtDt').val(dealDetail.mtrtDt);															// 만기일(예정)

			$('#tlErnAmt').val(Number(dealDetail.tlErnAmt).toLocaleString("ko-KR"));						// 전체수익
			$('#rcvblErnAmt').val(Number(dealDetail.rcvblErnAmt).toLocaleString("ko-KR"));					// 수수료수익
			$('#wrtErnAmt').val(Number(dealDetail.wrtErnAmt).toLocaleString("ko-KR"));						// 투자수익

			$('#AS03210S_mrtgOfrF').val(dealDetail.mrtgOfrF).prop("selected", true);						// 담보
			$('#AS03210S_ensrF').val(dealDetail.ensrF).prop("selected", true);								// 보증
			$('#AS03210S_rspsbCmplCcd').val(dealDetail.rspsbCmplCcd).prop("selected", true);				// 책임준공

			$('#AS03210S_bsnsDprtCmmtRmrk1').val(dealDetail.bsnsDprtCmmtRmrk1);								// 사업부의견
			$('#AS03210S_inspctDprtCmmtRmrk2').val(dealDetail.inspctDprtCmmtRmrk2);							// 심사부의견

			$('#AS03210S_coprtnTypCd').val(dealDetail.coprtnTypCd);											// 협업유형
			$('#AS03210S_entpRnm').val(dealDetail.cfmtEntpNm);												// 업체명
			
			if(dealDetail.bscAstsInptExptF == 'N'){
				$('#bscAstsInptExptF').prop("checked", false);
			}else{
				$('#bscAstsInptExptF').prop("checked", true);
			}
			
			if(dealDetail.cncCmpnyInptExptF == 'N'){
				$('#cncCmpnyInptExptF').prop("checked", false);
			}else{
				$('#cncCmpnyInptExptF').prop("checked", true);
			}
			
			if(dealDetail.insGrdInptExptF == 'N'){
				$('#insGrdInptExptF').prop("checked", false);
			}else{
				$('#insGrdInptExptF').prop("checked", true);
			}
			
			var chrgPEno = dealDetail.chrgPEno;

			var dtoParam = {
				"empNm": ""
				, "eno": chrgPEno
				, "dprtCd": ""
				, "dprtNm": ""
				, "hdqtCd": ""
				, "hdqtNm": ""
			}

			$.ajax({
				type: "GET",
				url: "/findEmpList",
				data: dtoParam,
				dataType: "json",
				success: function(data) {
					$('#AS03210S_hdqtCd').val(data[0].HDQT_CD);											// 본부코드
					$('#AS03210S_hdqtNm').val(data[0].HDQT_NM);												// 본부코드명
					// 임시코드
					//$('#AS03210S_hdqtCd').val("IV");														// 본부
					//$('#AS03210S_hdqtNm').val('투자관리본부');
					$('#AS03210S_dprtCd').val(data[0].DPRT_CD);												// 부서코드
					$('#AS03210S_dprtNm').val(data[0].DPRT_NM);												// 부서코드명
					$('#AS03210S_empNm').val(data[0].EMP_NM);												// 직원명
				}
			});/* end of ajax*/

			// 심사진행상태코드에 따라서 심사요청버튼 활성화
			let inspctPrgrsStCd = dealDetail.inspctPrgrsStCd;

			// 탭 버튼 활성
			if (inspctPrgrsStCd < 200 || inspctPrgrsStCd == 210) {
				$('#tab-2 .btn').prop("disabled", false);
				$('#tab-3 .btn').prop("disabled", false);
				$('#tab-4 .btn').prop("disabled", false);
				$('#tab-5 .btn').prop("disabled", false);
				$('#tab-6 .btn').prop("disabled", false);
				$('#tab-7 .btn').prop("disabled", false);
				$('#tab-8 .btn').prop("disabled", false);
			} else if (inspctPrgrsStCd >= 200) {
				$('#tab-1 .btn-success').prop("disabled", true);
			}

			// 심사요청 버튼 활성
			switch (inspctPrgrsStCd) {
				case "100":
				case "120":
				case "210":
					$('#assesmentRequest').prop("disabled", false);
					$('#assesmentRequestCancel').prop("disabled", true);
					$('#assesmentRequestHold').prop("disabled", true);
					break;
				case "110":
					$('#assesmentRequest').prop("disabled", true);
					$('#assesmentRequestCancel').prop("disabled", false);
					$('#assesmentRequestHold').prop("disabled", true);
					break;
				case "200":
					$('#assesmentRequest').prop("disabled", true);
					$('#assesmentRequestCancel').prop("disabled", true);
					$('#assesmentRequestHold').prop("disabled", false);
					break;
			}
		}
	});/* end of ajax*/

}

// 관련문서tab setting
function setTab2(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getDocInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
}

// 관련문서 정보
function getDocInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab2BtnReset();

	var paramData = {
		"ibDealNo": ibDealNo,
		"riskInspctCcd": riskInspctCcd,
		"lstCCaseCcd": lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getDocInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_docInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="docInfoDetails(this);">';
					html += '<td>' + value.raDocNo + '</td>';						// RA문서번호
					html += '<td>' + value.raFnlDocF + '</td>';						// RA최종문서여부
					html += '<td style="display:none;">' + value.raRmrk + '</td>';	// RA비고(URLLINK)
					html += '<td style="display:none;">' + value.itemSq + '</td>';
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_docInfo').html(html);
		}
	});

}

function docInfoDetails(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var raDocNo = td.eq(0).text();		// 문서번호
	var raFnlDocF = td.eq(1).text();	// 최종문서여부
	var raRmrk = td.eq(2).text();		// RA비고(URLLINK)
	var itemSq = td.eq(3).text();		// 항목일련번호

	$('#AS03210S_raDocNo').val(raDocNo);
	$('#AS03210S_raFnlDocF').val(raFnlDocF).prop('selected', true);
	$('#AS03210S_raRmrk').val(raRmrk);
	$('#AS03210S_tab2_itemSq').val(itemSq);

	$(tr).addClass('table-active');

	$('#docActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#docActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}

// 기초자산정보 탭
function setTab3(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getAssetInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);	
}

// 기초자산 평가액 * 환율
function assetAmt() {
	// 기초자산 평가액(원)
	$('#bscAstsCrncyAmt').keyup(function(event) {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#bscAstsAplcExchR").val();
			if (input1 != "") {																			// 2-1. 적용환율 값이 있을경우
				var input2 = $('#bscAstsCrncyAmt').val().replace(/,/g, "");								// 콤마 제거
				$("#bscAstsOpnPrcValAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
			} else {																					// 2-2. 적용환율 값이 없을경우
				var input2 = $('#bscAstsCrncyAmt').val().replace(/,/g, "");
				$("#bscAstsOpnPrcValAmt").val(input2);
			}
		}
	})

	// 적용환율
	$('#bscAstsAplcExchR').keyup(function(event) {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#bscAstsCrncyAmt").val().replace(/,/g, "");
			if (input1 != "") {																			// 2. 값이 있으면 계산
				var input2 = $("#bscAstsAplcExchR").val();
				$("#bscAstsOpnPrcValAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
			}
		}
	})
}

// 기초자산정보 취득
function getAssetInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab3BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getAssetInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_assetInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="assetInfoDetails(this);">';
					html += '<td>' + value.bscAstsKndCdNm + '</td>';											// 기초자산종류명
					html += '<td style="display:none;">' + value.bscAstsKndCd + '</td>';						// 기초자산종류코드
					html += '<td>' + value.bscAstsCntnt + '</td>';												// 기초자산명
					html += '<td class="text-right">' + Number(value.opnPrcValAmt).toLocaleString() + '</td>';	// 기초자산평가액(원)
					html += '<td>' + formatCorpNo(value.bscAstsIsngCorpNo) + '</td>';							// 법인번호
					html += '<td>' + value.bscAstsIsngHnglCorpNm + '</td>';										// 기초자산발행한글법인명
					html += '<td>' + value.invstCrncyCd + '</td>';												// 통화
					html += '<td class="text-right">' + Number(value.crncyAmt).toLocaleString() + '</td>';		// 기초자산평가액(통화금액)
					html += '<td class="text-right">' + value.aplcExchR + '</td>';								// 환율
					html += '<td style="display:none;">' + value.itemSq + '</td>';								// 항목일련번호
					html += '<td>' + value.rnmcno + '</td>';													// 실명확인번호
					//html += '<td class="text-right">' + value.crncyAmt + '</td>';								// 통화금액
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=9" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_assetInfo').html(html);

			// if (codeList.length != 0) {
			// 	$('#bscAstsActive tbody tr:first').addClass('table-active');
			// 	//$('#bscAstsActive tbody tr:first').dblclick();
			// }
		}
	});
}

function assetInfoDetails(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var bscAstsKndCd = td.eq(1).text();				// 기초자산유형
	var bscAstsCntnt = td.eq(2).text();				// 기초자산명
	var opnPrcValAmt = td.eq(3).text();				// 기초자산평가액(원)
	var bscAstsIsngCorpNo = td.eq(4).text();		// 법인번호
	var bscAstsIsngHnglCorpNm = td.eq(5).text();	// 기초자산발행한글법인명
	var invstCrncyCd = td.eq(6).text();				// 통화
	var crncyAmt = td.eq(7).text();					// 기초자산평가액(통화금액)
	var aplcExchR = td.eq(8).text();				// 환율
	//var itemSq = td.eq(8).text();					// 항목일련번호
	var rnmcno = td.eq(9).text();					// 실명확인번호

	// 보류코드
	//var crncyAmt = td.eq().text();				// 통화금액

	$(tr).addClass('table-active');

	$('#AS03210S_bscAstsKndCd').val(bscAstsKndCd).prop('selected', true);		// 기초자산유형
	$('#AS03210S_bscAstsCntnt').val(bscAstsCntnt);								// 기초자산명
	$('#bscAstsOpnPrcValAmt').val(opnPrcValAmt);								// 기초자산평가액(원)
	$('#AS03210S_bscAstsIsngCorpNo').val(bscAstsIsngCorpNo);					// 법인번호
	$('#AS03210S_bscAstsIsngHnglCorpNm').val(bscAstsIsngHnglCorpNm);			// 기초자산발행한글법인명
	$('#AS03210S_bscAstsCrncyCd').val(invstCrncyCd).prop('selected', true);		// 통화
	$('#bscAstsCrncyAmt').val(crncyAmt);										// 기초자산평가액(통화금액)
	$('#bscAstsAplcExchR').val(aplcExchR);										// 환율
	//$('#AS03210S_tab3_itemSq').val(itemSq);									// 항목일련번호
	$('#AS03210S_rnmcno').val(rnmcno);											// 실명확인번호

	// 보류코드
	// $('#AS03210S_crncyAmt').val(crncyAmt);									// 통화금액

	$('#bscAstsActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#bscAstsActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});


}

// 관계사 탭
function setTab4(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
}

// 관계사정보 취득
function getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab4BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getCncCmpnyInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_relatedCompanyInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="relatedCompanyInfoDetails(this);">';
					html += '<td>' + value.cdVlNm + '</td>';								// 법인형태코드명
					html += '<td>' + value.entpHnglNm + '</td>';							// 법인한글명
					html += '<td style="display:none;">' + value.cncCmpnyClsfCd + '</td>'; 	// 연결회사구분코드	
					html += '<td>' + formatCorpNo(value.isngOgnCorpNo) + '</td>';			// 발행기관법인번호
					html += '<td>' + value.rnmcno + '</td>';								// 실명확인번호
					html += '<td>' + value.mxStkhdNm + '</td>';								// 최대주주명
					html += '<td style="display:none;">' + value.itemSq + '</td>';			// 항목일련번호
					html += '<td style="display:none;">' + value.cdVlId + '</td>';			// 법인형태코드
					//html += '<td>' + value.isngOgnCorpNm + '</td>';						// 발행기관법인명
					//html += '<td>' + value.none + '</td>';								// *신탁형태구분*
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_relatedCompanyInfo').html(html);
		}
	});
}

function relatedCompanyInfoDetails(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var cncCmpnyClsfCd = td.eq(7).text();				// 형태
	var entpHnglNm = td.eq(1).text();					// 법인한글명
	var isngOgnCorpNo = td.eq(3).text();				// 법인번호
	var rnmcno = td.eq(4).text();						// 실명확인번호
	var mxStkhdNm = td.eq(5).text();					// 최대주주명
	var itemSq = td.eq(6).text();						// 항목일련번호
	//var isngOgnCorpNm = td.eq(2).text();				// 법인명
	//var none = td.eq(6).text();						// *신탁형태구분*
	$(tr).addClass('table-active');

	$('#AS03210S_cncCmpnyClsfCd').val(cncCmpnyClsfCd).prop('selected', true);	// 형태
	$('#AS03210S_entpHnglNm').val(entpHnglNm);									// 법인한글명
	$('#AS03210S_isngOgnCorpNo').val(isngOgnCorpNo);							// 법인번호
	$('#AS03210S_rnmcno').val(rnmcno);											// 실명확인번호
	$('#AS03210S_mxStkhdNm').val(mxStkhdNm);									// 최대주주명
	$('#AS03210S_tab4_itemSq').val(itemSq);										// 항목일련번호
	//$('#AS03210S_isngOgnCorpNm').val(isngOgnCorpNm);							// 발행기관법인명
	//$('#AS03210S_tab4_rnmcno').val(rnmcno);									// 법인명

	$('#relatedCompanyActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#relatedCompanyActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}

// 내부등급 탭
function setTab5(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getInsGrdInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);			// 내부등급 정보 취득
}

// 내부등급 정보 취득
function getInsGrdInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab5BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getInsGrdInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_getInsGrdInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="getInsGrdInfoDetails(this);">';
					html += '<td>' + value.insGrdTrgtF + '</td>'; 								// 내부등급대상여부		
					html += '<td>' + value.spcltFncTrgtF + '</td>';								// 특수금융대상여부
					html += '<td>' + value.spcltFncMngNo + '</td>';								// 특수금융관리번호
					html += '<td>' + value.outsCrdtGrdCcdNm + '</td>';							// 외부신용등급구분코드명(SL내부등급)
					html += '<td style="display:none;">' + value.outsCrdtGrdCcd + '</td>';		// 외부신용등급구분코드(SL내부등급)
					html += '<td>' + formatCorpNo(value.brrwrCorpNo) + '</td>';					// 차주법인번호
					html += '<td>' + value.insCrdtGrdCcdNm + '</td>';							// 내부신용등급구분코드명
					html += '<td>' + value.rnmcno + '</td>';									// 실명확인번호
					html += '<td>' + value.entpHnglNm + '</td>';								// 한글법인명
					html += '<td style="display:none;">' + value.itemSq + '</td>';
					html += '<td style="display:none;">' + value.insCrdtGrdCcd + '</td>';		// 내부신용등급구분코드
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_getInsGrdInfo').html(html);
		}
	});
}

function getInsGrdInfoDetails(e) {
	var tr = $(e);
	var td = $(tr).children();

	var insGrdTrgtF = td.eq(0).text();				// 내부등급대상여부
	var spcltFncTrgtF = td.eq(1).text();			// SL대상여부
	var spcltFncMngNo = td.eq(2).text();		    // SL번호
	var outsCrdtGrdCcd = td.eq(4).text();			// SL내부등급
	var brrwrCorpNo = td.eq(5).text();				// 차주법인번호
	var insCrdtGrdCcd = td.eq(7).text();			// 내부등급
	var entpHnglNm = td.eq(8).text();				// 한글법인명
	var itemSq = td.eq(9).text();					// 항목일련번호
	
	$(tr).addClass('table-active');

	$('#AS03210S_insGrdTrgtF').val(insGrdTrgtF).prop('selected', true);				// 내부등급대상여부
	$('#AS03210S_spcltFncTrgtF').val(spcltFncTrgtF).prop('selected', true);			// SL대상여부
	$('#AS03210S_spcltFncMngNo').val(spcltFncMngNo);								// SL번호
	$('#AS03210S_outsCrdtGrdCcd').val(outsCrdtGrdCcd).prop('selected', true);		// SL내부등급
	$('#AS03210S_ins_corpRgstNo').val(brrwrCorpNo);									// 차주 법인번호
	$('#AS03210S_insCrdtGrdCcd').val(insCrdtGrdCcd).prop('selected', true);			// 내부등급
	$('#AS03210S_ins_entpHnglNm').val(entpHnglNm);									// 한글법인명
	$('#AS03210S_tab5_itemSq').val(itemSq);											// 항목일련번호

	setTab5Selecbox();

	// 테이블 active
	$('#insGrdActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#insGrdActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});

	// 법인번호 확인
	var corpNo = $('#AS03210S_ins_corpRgstNo');
	var corpNoValue = $('#AS03210S_ins_corpRgstNo').val();

	$("#AS03210S_getInsGrdInfo").on("click", function() {
		if(isEmpty(corpNoValue) || corpNoValue==""){
			corpNo.removeClass('is-invalid');
			corpNo.removeClass('is-valid');
		} else {
			validateCorpNo(corpNo);
		}
	});

	
}

function setTab5Selecbox() {
	var useYn1 = $('#AS03210S_insGrdTrgtF').val();
	var useYn2 = $('#AS03210S_spcltFncTrgtF').val();

	if (useYn1 == "Y") {
		if (useYn2 == "Y") {
			$('#AS03210S_spcltFncMngNo').prop("disabled", false);
			$('#AS03210S_outsCrdtGrdCcd').prop("disabled", false);
			
			$('#AS03210S_ins_corpRgstNo').prop("disabled", true);
			$('#AS03210S_insCrdtGrdCcd').prop("disabled", true);
		} else {
			$('#AS03210S_spcltFncMngNo').val('');
			$('#AS03210S_outsCrdtGrdCcd').val('');
			$('#AS03210S_spcltFncMngNo').prop("disabled", true);
			$('#AS03210S_outsCrdtGrdCcd').prop("disabled", true);
			
			$('#AS03210S_ins_corpRgstNo').prop("disabled", false);
			$('#AS03210S_insCrdtGrdCcd').prop("disabled", false);
		}
	} else {
		$('#AS03210S_spcltFncMngNo').val('');
		$('#AS03210S_outsCrdtGrdCcd').val('');
		$('#AS03210S_spcltFncMngNo').prop("disabled", true);
		$('#AS03210S_outsCrdtGrdCcd').prop("disabled", true);

		$('#AS03210S_ins_corpRgstNo').val('');
		$('#AS03210S_insCrdtGrdCcd').val('');
		$('#AS03210S_ins_corpRgstNo').prop("disabled", true);
		$('#AS03210S_insCrdtGrdCcd').prop("disabled", true);
	}
}

// 담보 탭
function setTab6(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getMrtgInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
}

// 담보 정보 취득
function getMrtgInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab6BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getMrtgInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="getMrtgInfoDetails(this);">';
					html += '	<td>' + value.mrtgKndCcdNm + '</td>'; 											// 담보유형명
					html += '	<td>' + value.mrtgDtlsCcdNm + '</td>'; 											// 담보상세명	
					html += '	<td>' + value.mrtgRsnCntnt + '</td>'; 											// 담보사유내용
					html += '	<td class="text-right">' + Number(value.mrtgValAmt).toLocaleString() + '</td>';	// 담보평가액
					html += '	<td>' + value.rgtRnkCcdNm + '</td>';											// 권리순위명
					html += '	<td style="display:none;">' + value.mrtgKndCcd + '</td>'; 						// 담보유형
					html += '	<td style="display:none;">' + value.mrtgDtlsCcd + '</td>'; 						// 담보상세
					html += '	<td style="display:none;">' + value.rgtRnkCcd + '</td>'; 						// 권리순위
					html += '	<td style="display:none;">' + value.itemSq + '</td>'; 							// 항목일련번호
					html += '	<td>' + value.mrtgAcqstStmCcdNm + '</td>';										// 담보취득방식명
					html += '	<td style="display:none;">' + value.mrtgAcqstStmCcd + '</td>';					// 담보취득방식코드
					html += '	<td>' + value.mrtgAcqstDtlsCcdNm + '</td>';										// 담보취득방식상세명
					html += '	<td style="display:none;">' + value.mrtgAcqstDtlsCcd + '</td>';					// 담보취득방식상세코드
					html += '	<td>' + value.invstCrncyCd + '</td>';											// 통화
					html += '	<td class="text-right">' + Number(value.crncyAmt).toLocaleString() + '</td>';	// 통화금액
					html += '	<td class="text-right">' + value.aplcExchR + '</td>';							// 환율

					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=10" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_mrtgInfo').html(html);
		}
	});
}

// 담보 탭 상세보기
function getMrtgInfoDetails(e) {
	var tr = $(e);
	var td = $(tr).children();

	var mrtgKndCcd = td.eq(5).text();				// 담보유형
	var mrtgDtlsCcd = td.eq(6).text();				// 담보상세
	var mrtgRsnCntnt = td.eq(2).text();				// 담보사유내용
	var mrtgValAmt = td.eq(3).text();				// 담보평가액(원)
	var rgtRnkCcd = td.eq(7).text();				// 권리순위
	var itemSq = td.eq(8).text();					// 항목일련번호
	// 추가본
	var mrtgAcqstStmCcd = td.eq(10).text();			// 담보취득방식코드
	var mrtgAcqstDtlsCcd = td.eq(12).text();		// 담보취득방식상세코드
	var invstCrncyCd = td.eq(13).text();			// 통화
	var crncyAmt = td.eq(14).text();				// 통화금액
	var aplcExchR = td.eq(15).text();				// 환율

	$(tr).addClass('table-active');

	$('#AS03210S_mrtgKndCcd').val(mrtgKndCcd).prop('selected', true);	// 담보유형
	$('#AS03210S_mrtgDtlsCcd').val(mrtgDtlsCcd).prop('selected', true);	// 담보상세
	$('#AS03210S_mrtgRsnCntnt').val(mrtgRsnCntnt);						// 담보사유내용
	$('#mrtgValAmt').val(mrtgValAmt.toLocaleString("ko-KR"));			// 담보평가액(원)
	$('#AS03210S_rgtRnkCcd').val(rgtRnkCcd).prop('selected', true);		// 권리순위
	$('#AS03210S_tab6_itemSq').val(itemSq);								// 항목일련번호
	$('#AS03210S_mrtgAcqstStmCcd').val(mrtgAcqstStmCcd);				// 담보취득방식코드
	$('#AS03210S_mrtgAcqstDtlsCcd').val(mrtgAcqstDtlsCcd);				// 담보취득방식상세코드
	$('#AS03210S_mrtgCrncyCd').val(invstCrncyCd);						// 통화
	$('#mrtgCrncyAmt').val(crncyAmt.toLocaleString("ko-KR"));			// 통화금액
	$('#AS03210S_mrtgAplcExchR').val(aplcExchR);						// 환율


	$('#mrtgActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#mrtgActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}

// 보증 탭
function setTab7(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getEnsrInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);			// 보증정보 취득
}

// 보증 정보 취득
function getEnsrInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab7BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getEnsrInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_ensrInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="getEnsrInfoDetails(this);">';
					html += '	<td>' + value.crdtEhcmntGrntCcdNm + '</td>'; 									// 신용보강보증구분코드명
					html += '	<td style="display:none;">' + value.crdtEhcmntGrntCcd + '</td>'; 				// 신용보강보증구분코드
					html += '	<td>' + formatCorpNo(value.ensrOgnCorpNo) + '</td>'; 							// 보증기관법인번호
					html += '	<td>' + value.rnmcno + '</td>';													// 실명확인번호
					html += '	<td>' + value.entpHnglNm + '</td>';												// 보증기관명
					html += '	<td style="display:none;">' + value.itemSq + '</td>'; 							// 항목일련번호
					html += '	<td class="text-right">' + Number(value.ensrAmt).toLocaleString() + '</td>'; 	// 보증금액
					html += '	<td>' + value.ensrCntnt + '</td>';												// 보증내용
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_ensrInfo').html(html);
		}
	});
}

// 보증 탭 상세보기
function getEnsrInfoDetails(e) {
	var tr = $(e);
	var td = $(tr).children();

	var crdtEhcmntGrntCcd = td.eq(1).text();		// 신용보강보증구분코드
	var ensrOgnCorpNo = td.eq(2).text();			// 보증기관법인번호
	var rnmcno = td.eq(3).text();					// 실명확인번호
	var entpHnglNm = td.eq(4).text();				// 보증기관명
	var ensrAmt = td.eq(6).text();					// 보증금액
	var ensrCntnt = td.eq(7).text();				// 보증내용
	var itemSq = td.eq(5).text();					// 항목일련번호
	

	$(tr).addClass('table-active');

	$('#AS03210S_crdtEhcmntGrntCcd').val(crdtEhcmntGrntCcd);	// 신용보강보증구분코드
	$('#AS03210S_ensr_corpRgstNo').val(ensrOgnCorpNo);			// 보증기관법인번호
	$('#AS03210S_ensrAmt').val(ensrAmt);						// 보증금액
	$('#AS03210S_ensrCntnt').val(ensrCntnt);					// 보증내용
	$('#AS03210S_tab7_itemSq').val(itemSq);						// 항목일련번호
	$('#AS03210S_ensr_entpRnm').val(entpHnglNm);				// 보증기관명
	$('#AS03210S_rnmcno').val(rnmcno);							// 실명확인번호
	
	
	$('#ensrActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#ensrActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});

}

// 책임준공기관정보 탭
function setTab8(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	getCmplInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);		// 책임준공기관정보 취득
								// 법인번호 확인
}

// 책임준공기관정보 취득
function getCmplInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	//tab8BtnReset();

	var paramData = {
		"ibDealNo" : ibDealNo,
		"riskInspctCcd" : riskInspctCcd,
		"lstCCaseCcd" : lstCCaseCcd
	}

	$.ajax({
		type: "GET",
		url: "/getCmplInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_cmplInfo').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<tr onclick="getCmplInfoDetails(this);">';
					html += '	<td>' + value.rspsbCmplOgnCcdNm + '</td>'; 							// 책임준공기관구분코드명
					html += '	<td style="display:none;">' + value.rspsbCmplOgnCcd + '</td>'; 		// 책임준공기관구분코드
					html += '	<td>' + formatCorpNo(value.scrtsCmpnyCorpNo) + '</td>'; 			// 법인번호
					html += '	<td>' + value.rnmcno + '</td>'; 						 			// 실명확인번호
					html += '	<td>' + value.entpHnglNm + '</td>'; 								// 한글법인명
					html += '	<td>' + value.dbtNpfrmOblgCcdNm + '</td>'; 							// 채무불이행의무구분코드명
					html += '	<td style="display:none;">' + value.dbtNpfrmOblgCcd + '</td>'; 		// 채무불이행의무구분코드
					html += '	<td>' + value.dmgRprtnMxExtnt + '</td>';							// 손해배상최대범위
					html += '	<td>' + value.cmplExptDt + '</td>';									// 책임준공기한
					html += '	<td style="display:none;">' + value.itemSq + '</td>'; 				// 항목일련번호
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan=7" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS03210S_cmplInfo').html(html);
		}
	});
}

// 책임준공기관정보 탭 상세보기
function getCmplInfoDetails(e) {
	var tr = $(e);
	var td = $(tr).children();

	var rspsbCmplOgnCcd = td.eq(1).text();			// 책임준공기관구분코드
	var scrtsCmpnyCorpNo = td.eq(2).text();			// 법인번호
	var rnmcno = td.eq(3).text();					// 실명확인번호
	var entpHnglNm = td.eq(4).text();				// 한글법인명
	var dbtNpfrmOblgCcd = td.eq(6).text();			// 채무불이행의무구분코드
	var dmgRprtnMxExtnt = td.eq(7).text();			// 손해배상최대범위
	var cmplExptDt = td.eq(8).text();				// 책임준공기한
	var itemSq = td.eq(9).text();					// 항목일련번호

	$(tr).addClass('table-active');

	$('#AS03210S_rspsbCmplOgnCcd').val(rspsbCmplOgnCcd).prop('selected', true);		// 책임준공기관구분코드
	$('#AS03210S_rspsb_corpRgstNo').val(scrtsCmpnyCorpNo);							// 법인번호
	$('#AS03210S_dbtNpfrmOblgCcd').val(dbtNpfrmOblgCcd).prop('selected', true);		// 채무불이행의무구분코드
	$('#AS03210S_rspsb_entpRnm').val(entpHnglNm);									// 한글법인명
	$('#AS03210S_dmgRprtnMxExtnt').val(dmgRprtnMxExtnt);							// 손해배상최대범위
	$('#AS03210S_cmplExptDt').val(cmplExptDt);										// 책임준공기한
	$('#AS03210S_tab8_itemSq').val(itemSq);											// 항목일련번호
	$('#AS03210S_rnmcno').val(rnmcno);												// 실명확인번호
	

	$('#cmplActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#cmplActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
	
}




/*=========================================================================================================================================*/
// RADEAL 구분코드 
function loadRaDealCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_raDealCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_raDealCcd').html(html);
		}
	});
}

// 탭 페이지 항목 로드
function loadTabContents() {
	loadTab1();
	loadTab3();
	loadTab4();
	loadTab5();
	loadTab6();
	loadTab7();
	loadTab8();
	
	
}

// 탭1 안건구조
function loadTab1() {
	loadRiskInspctCcd();
	loadLstCCaseCcd();
	loadInspctDprtCcd();
	loadInvstGdsLdvdCd();
	// loadInvstGdsMdvdCd();
	// loadInvstGdsSdvdCd();
	loadInvstGdsDtlsDvdCd();
	loadInvstCrncyCd();
	loadIndTypDvdCd();
	loadCheckItemCd();
	loadInvstThingCcd();
	loadInvstThingDtlsCcd();
	loadRspsbCmplCcd();
	loadRaRsltnCcd();
	loadCoprtnTypCd();
	loadUserAuth();
	loadCntyCd();
	loadBsnsAreaCd();
	onChangeInvstGdsLdvdCd();
	onChangeInvstGdsMdvdCd();	
}

// 탭3 기초자산
function loadTab3() {
	loadBscAstsKndCd();
	loadBscAstsCrncyCd();
	checkBscAstsCorpNo();	// 법인번호 확인
	assetAmt();				// 기초자산 평가액 * 적용환율
	//checkBscAstsAplcExchR();		// 적용환율 소수점 오버 체크
	bscAstsInptExptFOnChecked();
	
}

// 탭4 법인형태
function loadTab4() {
	loadCncCmpnyClsfCd();
	chkCncCorpNo();				// 법인번호 확인
	chkmxStkhdNm();				//최대주주명 확인
	cncCmpnyInptExptFOnChecked();
}

// 탭5 내부등급
function loadTab5() {
	loadOutsCrdtGrdCcd();
	loadInsCrdtGrdCcd();
	setSelectBoxspcltFncTrgtF();	// 내부대상여부 셀렉트박스설정
	checkBrrwrCorpNo();				// 법인번호 확인
	chkSpcltFncMngNo();				// SL번호 확인
	insGrdInptExptFOnChecked();
}

// 내부대상여부 셀렉트박스설정
function setSelectBoxspcltFncTrgtF() {

	$('#AS03210S_insGrdTrgtF').on('change', function() {
		var useYn1 = $('#AS03210S_insGrdTrgtF').val();		// 내부대상여부
		var useYn2 = $('#AS03210S_spcltFncTrgtF').val();	// SL대상여부

		if (useYn1 == "Y") {
			if (useYn2 == "Y") {
				$('#AS03210S_spcltFncMngNo').prop("disabled", false);
				$('#AS03210S_outsCrdtGrdCcd').prop("disabled", false);
				$('#AS03210S_outsCrdtGrdCcd option:eq(0)').prop('selected', true);

			} else {
				$('#AS03210S_ins_corpRgstNo').prop("disabled", false);
				$('#AS03210S_insCrdtGrdCcd').prop("disabled", false);
				$('#AS03210S_insCrdtGrdCcd option:eq(0)').prop('selected', true);
			}
		} else {
			$('#AS03210S_spcltFncMngNo').val('');
			$('#AS03210S_outsCrdtGrdCcd').val('');
			$('#AS03210S_spcltFncMngNo').prop("disabled", true);
			$('#AS03210S_outsCrdtGrdCcd').prop("disabled", true);
			
			
			
			$('#AS03210S_ins_corpRgstNo').val('');
			$('#AS03210S_insCrdtGrdCcd').val('');
			$('#AS03210S_ins_corpRgstNo').removeClass('is-invalid');
			$('#AS03210S_ins_corpRgstNo').removeClass('is-valid');
			$('#AS03210S_ins_corpRgstNo').prop("disabled", true);
			$('#AS03210S_insCrdtGrdCcd').prop("disabled", true);
		}
	});

	$('#AS03210S_spcltFncTrgtF').on('change', function() {
		var useYn1 = $('#AS03210S_insGrdTrgtF').val();		// 내부대상여부
		var useYn2 = $('#AS03210S_spcltFncTrgtF').val();	// SL대상여부

		if (useYn1 == "Y") {
			if (useYn2 == "Y") {
				$('#AS03210S_spcltFncMngNo').prop("disabled", false);
				$('#AS03210S_outsCrdtGrdCcd').prop("disabled", false);
				$('#AS03210S_outsCrdtGrdCcd option:eq(0)').prop('selected', true);
				$('#AS03210S_ins_corpRgstNo').val('');
				$('#AS03210S_insCrdtGrdCcd').val('');
				
				$('#AS03210S_ins_corpRgstNo').removeClass('is-invalid');
				$('#AS03210S_ins_corpRgstNo').removeClass('is-valid');
				$('#AS03210S_ins_corpRgstNo').prop("disabled", true);
				$('#AS03210S_insCrdtGrdCcd').prop("disabled", true);
			} else {
				$('#AS03210S_spcltFncMngNo').val('');
				$('#AS03210S_outsCrdtGrdCcd').val('');
				$('#AS03210S_spcltFncMngNo').prop("disabled", true);
				$('#AS03210S_outsCrdtGrdCcd').prop("disabled", true);
				
				$('#AS03210S_ins_corpRgstNo').prop("disabled", false);
				$('#AS03210S_insCrdtGrdCcd').prop("disabled", false);
				$('#AS03210S_insCrdtGrdCcd option:eq(0)').prop('selected', true);
			}
		}
	});
}



// 탭6 담보
function loadTab6() {
	loadMrtgKndCcd();
	loadMrtgDtlsCcd();
	loadRgtRnkCcd();
	loadMrtgAcqstStmCcd();
	loadMrtgAcqstDtlsCcd();
	loadMrtgCrncyCd();
	mrtgAmt();
}

// 탭7 보증
function loadTab7() {
	loadCrdtEhcmntGrntCcd();
	//chkEnsrCorpNo();
}

// 탭8 책임준공
function loadTab8() {
	loaddbtNpfrmOblgCcd();
	loadRspsbCmplOgnCcd();
	//chkScCorpNo();
}

// 리스크심사구분코드
function loadRiskInspctCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R013",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_riskInspctCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_riskInspctCcd').html(html);
		}
	});
}

// 부수안건구분코드
function loadLstCCaseCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/L001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_lstCCaseCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_lstCCaseCcd').html(html);
		}
	});
}

// 심사부서구분코드
function loadInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_inspctDprtCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_inspctDprtCcd').html(html);
		}
	});
}

/**
 * 투자상품 대분류코드 로드
 */
function loadInvstGdsLdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I012",
		dataType: "json",
		success: function(data) {
			ldvdCd = data;
			
			var html = "";
			$('#AS03210S_invstGdsLdvdCd').html(html);

			if (ldvdCd.length > 0) {
				$.each(ldvdCd, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsLdvdCd').html(html);
			
			loadInvstGdsMdvdCd();
		}
	});
}

/**
 * 투자상품 중분류코드
 */
function loadInvstGdsMdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I015",
		dataType: "json",
		success: function(data) {
			mdvdCd = data;
			
			var selectedLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();
			changeInvstGdsMdvdCd(selectedLdvdCd);
			
			loadInvstGdsSdvdCd();
		}
	})
}

/**
 * 투자상품 소분류코드
 */
function loadInvstGdsSdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I014",
		dataType: "json",
		success: function(data) {
			sdvdCd = data;
			
			var selectedMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();
			changeInvstGdsSdvdCd(selectedMdvdCd);
		}
	});
}

/**
 * 투자상품 대분류코드 이벤트 핸들러
 */
function onChangeInvstGdsLdvdCd() {
	$('#AS03210S_invstGdsLdvdCd').on('change', function() {
		var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
		changeInvstGdsMdvdCd(selectedLdvdCd);
	});
}

function changeInvstGdsMdvdCd(selectedLdvdCd){
	var html = "";
	$('#AS03210S_invstGdsMdvdCd').html(html);
	

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

			$('#AS03210S_invstGdsMdvdCd').html(html);
			$('#AS03210S_invstGdsMdvdCd').val($('#AS03210S_invstGdsMdvdCd').val()).prop("selected", true).change();
		}
	}
}

/**
 * 투자상품 중분류코드 이벤트 핸들러
 */ 
function onChangeInvstGdsMdvdCd() {
	$('#AS03210S_invstGdsMdvdCd').on('change', function() {
		var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
		changeInvstGdsSdvdCd(selectedMdvdCd);
	});
}

function changeInvstGdsSdvdCd(selectedMdvdCd){
	var html = "";
	$('#AS03210S_invstGdsSdvdCd').html(html);
	

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

			$('#AS03210S_invstGdsSdvdCd').html(html);
		}
	}
}

/**
 * 투자상품 상세분류코드
 */
function loadInvstGdsDtlsDvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsDtlsDvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsDtlsDvdCd').html(html);
		}
	});
}

// 투자기간 숫자입력 & 만기일 체크 function
function checkNumber() {

	$('#invstPrdMmC').keyup(function(event) {
		if (event.key >= 0 && event.key <= 9) {						// 1. 숫자입력 체크
			var input = $("#tab1_datepicker1").val();
			if (input != "") {										// 2. 기표일 값이 있을경우 만기일 계산
				calcDate();											// 개월수 계산하여 만기일 입력 fucntion
			}
		}
	})

}

// 만기일 계산
function calcDate() {
	var inputinvstPrdMmC = $("#invstPrdMmC").val();
	var inputDate = $("#tab1_datepicker1").val();

	var year = inputDate.substring(0, 4);
	var month = inputDate.substring(5, 7);
	var day = inputDate.substring(8, 10);

	var date = new Date(year, month - 1, day);

	// 2월달 날짜까지 계산됨	
	var dt = inputDate;
	var cycle = inputinvstPrdMmC;
	var nxt = '';
	if (dt != "" && cycle != '0') {
		if (cycle == '99') {
			nxt = "-";
		} else {
			var arr1 = dt.split('-');
			var date = new Date(arr1[0], arr1[1] - 1, arr1[2]);

			var addMonthFirstDate = new Date(date.getFullYear(), date.getMonth() + parseInt(cycle), 1);
			var addMonthLastDate = new Date(addMonthFirstDate.getFullYear(), addMonthFirstDate.getMonth() + 1, 0);

			var result = addMonthFirstDate;

			if (date.getDate() > addMonthLastDate.getDate()) {
				result.setDate(addMonthLastDate.getDate());
			}
			else {
				result.setDate(date.getDate());
			}

			nxt = result.getFullYear() + "-" + fillZero(2, (result.getMonth() + 1).toString()) + "-" + fillZero(2, result.getDate().toString());
		}
	}

	//남는 길이만큼 0으로 채움
	function fillZero(width, str) {
		return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
	}

	$("#mtrtDt").val(nxt);

}

// 부의기준통화
function loadInvstCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstCrncyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_ID + '</option>';
				});

			}
			$('#AS03210S_invstCrncyCd').html(html);
			$('#AS03210S_invstCrncyCd option[value="ZZZ"]').remove();
			$('#AS03210S_invstCrncyCd option[value="KRW"]').prop('selected', true);
		}
	});


}

// 부의금액(원) 계산
function checkErmAmt() {
	// 투자금액
	$("#crncyAmt").on("propertychange change keyup paste input", function() {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#aplcExchR").val();
			if (input1 != "") {																			// 2-1. 적용환율 값이 있을경우
				var input2 = $('#crncyAmt').val().replace(/,/g, "");									// 콤마 제거
				$("#crncyAmtWn").val((input1 * input2).toLocaleString("ko-KR"));
			} else {																					// 2-2. 적용환율 값이 없을경우
				var input2 = $('#crncyAmt').val().replace(/,/g, "");									// 콤마 제거
				$("#crncyAmtWn").val(input2);
			}
		}
	});
	
	// 적용환율
	$("#aplcExchR").on("propertychange change keyup paste input", function() {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#crncyAmt").val().replace(/,/g, "");
			if (input1 != "") {																			// 2. 부의금액 값이 있으면 계산
				var input2 = $("#aplcExchR").val().replace(/,/g, "");
				$("#crncyAmtWn").val((input1 * input2).toLocaleString("ko-KR"));
			}
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
			$('#AS03210S_cntyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_cntyCd').html(html);
		}
	});
}

// 고위험사업
function loadIndTypDvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I008",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_indTypDvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_indTypDvdCd').html(html);
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
			$('#AS03210S_checkItemCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_checkItemCd').html(html);
		}
	});
}

// 사업지역
function loadBsnsAreaCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/U004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_bsnsAreaCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_bsnsAreaCd').html(html);
		}
	});
}

// 주요투자물건
function loadInvstThingCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I010",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstThingCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstThingCcd').html(html);
		}
	});
}

// 주요투자물건상세
function loadInvstThingDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I011",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstThingDtlsCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstThingDtlsCcd').html(html);
		}
	});
}

// 책임준공
function loadRspsbCmplCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R014",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_rspsbCmplCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_rspsbCmplCcd').html(html);
		}
	});
}

// 전결구분
function loadRaRsltnCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_raRsltnCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_raRsltnCcd').html(html);
		}
	});
}

// 담당직원정보
function loadUserAuth() {
	$.ajax({
		type: "GET",
		url: "/getUserAuth",
		dataType: "json",
		success: function(data) {
			$('#AS03210S_hdqtCd').val(data.HdqtCd);
			$('#AS03210S_hdqtNm').val(data.HdqtNm);
			$('#AS03210S_dprtCd').val(data.dprtCd);
			$('#AS03210S_dprtNm').val(data.dprtNm);
			$('#AS03210S_eno').val(data.eno);
			$('#AS03210S_empNm').val(data.empNm);
		}
	});
}

// 협업유형코드
function loadCoprtnTypCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/C005",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_coprtnTypCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_coprtnTypCd').html(html);
		}
	});
};

/*
 * TAB1
 */
function tab1save() {

	// 날짜체크 정규식
	var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
	var selectedIbDealNo = $('#AS03210S_selectedDealNo').val();

	// deal 선택중인지 확인
	if (isEmpty(selectedIbDealNo)) {
		registDealInfo();
	} else {
		updateDealInfo();
	}

	// 안건구조 숫자 ',' 제거
	//$("").val().replace(/,/g, "");

	// Deal 정보 생성
	function registDealInfo() {
		var ibDealNo = $('#AS03210S_ibDealNo').val();
		var raDealCcd = $('#AS03210S_raDealCcd').val();									// RADEAL구분코드
		var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
		var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건
		var inspctDprtCcd = $('#AS03210S_inspctDprtCcd').val();							// 심사부서구분
		var invstGdsLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();						// 투자상품대분류
		var invstGdsMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();						// 투자상품중분류
		var invstGdsSdvdCd = $('#AS03210S_invstGdsSdvdCd').val();						// 투자상품소분류
		var invstGdsDtlsDvdCd = $('#AS03210S_invstGdsDtlsDvdCd').val();					// 투자상품상세분류
		// 투자기간(INVST_PRD_DY_C) : 만기일 - 기표일
		var invstPrdMmC = $('#invstPrdMmC').val();					 					// 투자기간
		var wrtDt = $('#tab1_datepicker1').val();										// 기표일
		var mtrtDt = $('#mtrtDt').val();												// 만기일
		var ibDealNm = $('#ibDealNm').val();											// 안건명
		var ibDealSnmNm = $('#ibDealSnmNm').val();										// 안건약어명
		var invstCrncyCd = $('#AS03210S_invstCrncyCd').val();							// 부의기준통화
		var crncyAmt = $('#crncyAmt').val().replace(/,/g, "");							// 부의금액
		var invstNtnCd = $('#AS03210S_cntyCd').val();									// 투자국가
		var aplcExchR = $('#aplcExchR').val();											// 적용환율
		var crncyAmtWn = $('#crncyAmtWn').val().replace(/,/g, "");						// 부의금액(원)
		var tlErnAmt = $('#tlErnAmt').val().replace(/,/g, "");							// 투자수익
		var rcvblErnAmt = $('#rcvblErnAmt').val().replace(/,/g, "");					// 수수료수익
		var wrtErnAmt = $('#wrtErnAmt').val().replace(/,/g, "");						// 투자수익 
		var indTypDvdCd = $('#AS03210S_indTypDvdCd').val();								// 고위험산업
		var checkItemCd = $('#AS03210S_checkItemCd').val();								// 업무구분
		var bsnsAreaCd = $('#AS03210S_bsnsAreaCd').val();								// 사업지역
		var invstThingCcd = $('#AS03210S_invstThingCcd').val();							// 주요투자물건
		var invstThingDtlsCcd = $('#AS03210S_invstThingDtlsCcd').val();					// 투자물건상세
		var mrtgOfrF = $('#AS03210S_mrtgOfrF').val();									// 담보
		var ensrF = $('#AS03210S_ensrF').val();											// 보증
		var rspsbCmplCcd = $('#AS03210S_rspsbCmplCcd').val();							// 책임준공
		var raRsltnCcd = $('#AS03210S_raRsltnCcd').val();								// 전결구분
		var riskRcgNo = $('#AS03210S_riskRcgNo').val();									// 리스크승인번호
		var hdqtCd = $('#AS03210S_hdqtCd').val();										// 본부코드
		//		var hdqtNm = $('#AS03210S_hdqtNm').val();										// 본부명
		var dprtCd = $('#AS03210S_dprtCd').val();										// 부서코드
		//		var dprtNm = $('#AS03210S_dprtNm').val();										// 부서명
		var chrgPEno = $('#AS03210S_eno').val();										// 직원코드
		//		var empNm = $('#AS03210S_empNm').val();											// 직원명
		var coprtnTypCd = $('#AS03210S_coprtnTypCd').val();								// 협업유형
		var cfmtEntpNm = $('#AS03210S_entpRnm').val();									// 업체명
		var bsnsDprtCmmtRmrk1 = $('#AS03210S_bsnsDprtCmmtRmrk1').val();					// 사업부의견
		var inspctDprtCmmtRmrk2 = $('#AS03210S_inspctDprtCmmtRmrk2').val();				// 심사부의견

		var paramData = {
			"ibDealNo": ibDealNo
			,"raDealCcd": raDealCcd
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "inspctDprtCcd": inspctDprtCcd
			, "invstGdsLdvdCd": invstGdsLdvdCd
			, "invstGdsMdvdCd": invstGdsMdvdCd
			, "invstGdsSdvdCd": invstGdsSdvdCd
			, "invstGdsDtlsDvdCd": invstGdsDtlsDvdCd
			, "invstPrdMmC": invstPrdMmC
			, "wrtDt": wrtDt
			, "mtrtDt": mtrtDt
			, "ibDealNm": ibDealNm
			, "ibDealSnmNm": ibDealSnmNm
			, "invstCrncyCd": invstCrncyCd
			, "crncyAmt": crncyAmt
			, "invstNtnCd": invstNtnCd
			, "aplcExchR": aplcExchR
			, "ptcpAmt": crncyAmtWn
			, "tlErnAmt": tlErnAmt
			, "rcvblErnAmt": rcvblErnAmt
			, "wrtErnAmt": wrtErnAmt
			, "indTypDvdCd": indTypDvdCd
			, "checkItemCd": checkItemCd
			, "raBsnsZoneCd": bsnsAreaCd
			, "invstThingCcd": invstThingCcd
			, "invstThingDtlsCcd": invstThingDtlsCcd
			, "mrtgOfrF": mrtgOfrF
			, "ensrF": ensrF
			, "rspsbCmplCcd": rspsbCmplCcd
			, "raRsltnCcd": raRsltnCcd
			, "riskRcgNo": riskRcgNo
			, "hdqtCd": hdqtCd
			//			, "hdqtNm": hdqtNm
			, "dprtCd": dprtCd
			//			, "dprtNm": dprtNm
			, "chrgPEno": chrgPEno
			//			, "empNm": empNm
			, "coprtnTypCd": coprtnTypCd
			, "cfmtEntpNm": cfmtEntpNm
			, "bsnsDprtCmmtRmrk1": bsnsDprtCmmtRmrk1
			, "inspctDprtCmmtRmrk2": inspctDprtCmmtRmrk2
		};


		// 유효성검사
		if (!isEmpty(ibDealNm) && !isEmpty(crncyAmt) && !isEmpty(invstPrdMmC) && !isEmpty(wrtDt) && pattern.test(wrtDt)) {
			businessInsert();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "필수 입력값을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessInsert() {
			$.ajax({
				type: "POST",
				url: "/registDealInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "Deal정보를 생성하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {
						location.reload();
					});
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "Deal정보를 생성하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	} // end of insertDealInfo()

	// Deal 정보 갱신
	function updateDealInfo() {

		$('#AS03210S_riskInspctCcd').prop("disabled", false);
		$('#AS03210S_lstCCaseCcd').prop("disabled", false);

		var ibDealNo = selectedIbDealNo;
		var raDealCcd = $('#AS03210S_raDealCcd').val();									// RADEAL구분코드
		var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
		var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건
		var inspctDprtCcd = $('#AS03210S_inspctDprtCcd').val();							// 심사부서구분
		var invstGdsLdvdCd = $('#AS03210S_invstGdsLdvdCd').val();						// 투자상품대분류
		var invstGdsMdvdCd = $('#AS03210S_invstGdsMdvdCd').val();						// 투자상품중분류
		var invstGdsSdvdCd = $('#AS03210S_invstGdsSdvdCd').val();						// 투자상품소분류
		var invstGdsDtlsDvdCd = $('#AS03210S_invstGdsDtlsDvdCd').val();					// 투자상품상세분류
		// 투자기간(INVST_PRD_DY_C) : 만기일 - 기표일
		var invstPrdMmC = $('#invstPrdMmC').val();					 					// 투자기간
		var wrtDt = $('#tab1_datepicker1').val();										// 기표일
		var mtrtDt = $('#mtrtDt').val();												// 만기일
		var ibDealNm = $('#ibDealNm').val();											// 안건명
		var ibDealSnmNm = $('#ibDealSnmNm').val();										// 안건약어명
		var invstCrncyCd = $('#AS03210S_invstCrncyCd').val();							// 부의기준통화
		var crncyAmt = $('#crncyAmt').val().replace(/,/g, "");							// 부의금액
		var invstNtnCd = $('#AS03210S_cntyCd').val();									// 투자국가
		var aplcExchR = $('#aplcExchR').val();											// 적용환율
		var crncyAmtWn = $('#crncyAmtWn').val().replace(/,/g, "");						// 부의금액(원)
		var tlErnAmt = $('#tlErnAmt').val().replace(/,/g, "");							// 전체수익
		var rcvblErnAmt = $('#rcvblErnAmt').val().replace(/,/g, "");					// 수수료수익
		var wrtErnAmt = $('#wrtErnAmt').val().replace(/,/g, "");						// 투자수익 
		var indTypDvdCd = $('#AS03210S_indTypDvdCd').val();								// 고위험산업
		var checkItemCd = $('#AS03210S_checkItemCd').val();								// 업무구분
		var bsnsAreaCd = $('#AS03210S_bsnsAreaCd').val();								// 사업지역
		var invstThingCcd = $('#AS03210S_invstThingCcd').val();							// 주요투자물건
		var invstThingDtlsCcd = $('#AS03210S_invstThingDtlsCcd').val();					// 투자물건상세
		var mrtgOfrF = $('#AS03210S_mrtgOfrF').val();									// 담보
		var ensrF = $('#AS03210S_ensrF').val();											// 보증
		var rspsbCmplCcd = $('#AS03210S_rspsbCmplCcd').val();							// 책임준공
		var raRsltnCcd = $('#AS03210S_raRsltnCcd').val();								// 전결구분
		var riskRcgNo = $('#AS03210S_riskRcgNo').val();									// 리스크승인번호
		var hdqtCd = $('#AS03210S_hdqtCd').val();										// 본부코드
		//		var hdqtNm = $('#AS03210S_hdqtNm').val();										// 본부명
		var dprtCd = $('#AS03210S_dprtCd').val();										// 부서코드
		//		var dprtNm = $('#AS03210S_dprtNm').val();										// 부서명
		var chrgPEno = $('#AS03210S_eno').val();										// 직원코드
		//		var empNm = $('#AS03210S_empNm').val();											// 직원명
		var coprtnTypCd = $('#AS03210S_coprtnTypCd').val();								// 협업유형
		var cfmtEntpNm = $('#AS03210S_entpRnm').val();									// 업체명
		var bsnsDprtCmmtRmrk1 = $('#AS03210S_bsnsDprtCmmtRmrk1').val();					// 사업부의견
		var inspctDprtCmmtRmrk2 = $('#AS03210S_inspctDprtCmmtRmrk2').val();				// 심사부의견

		var paramData = {
			"ibDealNo": ibDealNo
			, "raDealCcd": raDealCcd
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "inspctDprtCcd": inspctDprtCcd
			, "invstGdsLdvdCd": invstGdsLdvdCd
			, "invstGdsMdvdCd": invstGdsMdvdCd
			, "invstGdsSdvdCd": invstGdsSdvdCd
			, "invstGdsDtlsDvdCd": invstGdsDtlsDvdCd
			, "invstPrdMmC": invstPrdMmC
			, "wrtDt": wrtDt
			, "mtrtDt": mtrtDt
			, "ibDealNm": ibDealNm
			, "ibDealSnmNm": ibDealSnmNm
			, "invstCrncyCd": invstCrncyCd
			, "crncyAmt": crncyAmt
			, "invstNtnCd": invstNtnCd
			, "aplcExchR": aplcExchR
			, "ptcpAmt": crncyAmtWn
			, "tlErnAmt": tlErnAmt
			, "rcvblErnAmt": rcvblErnAmt
			, "wrtErnAmt": wrtErnAmt
			, "indTypDvdCd": indTypDvdCd
			, "checkItemCd": checkItemCd
			, "raBsnsZoneCd": bsnsAreaCd
			, "invstThingCcd": invstThingCcd
			, "invstThingDtlsCcd": invstThingDtlsCcd
			, "mrtgOfrF": mrtgOfrF
			, "ensrF": ensrF
			, "rspsbCmplCcd": rspsbCmplCcd
			, "raRsltnCcd": raRsltnCcd
			, "riskRcgNo": riskRcgNo
			, "hdqtCd": hdqtCd
			//			, "hdqtNm": hdqtNm
			, "dprtCd": dprtCd
			//			, "dprtNm": dprtNm
			, "chrgPEno": chrgPEno
			//			, "empNm": empNm
			, "coprtnTypCd": coprtnTypCd
			, "cfmtEntpNm": cfmtEntpNm
			, "bsnsDprtCmmtRmrk1": bsnsDprtCmmtRmrk1
			, "inspctDprtCmmtRmrk2": inspctDprtCmmtRmrk2
		};

		// 유효성검사
		if (!isEmpty(ibDealNm) && !isEmpty(crncyAmt) && !isEmpty(invstPrdMmC) && !isEmpty(wrtDt) && pattern.test(wrtDt)) {
			businessUpdate();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "필수 입력값을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessUpdate() {
			$.ajax({
				type: "POST",
				url: "/updateDealInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "Deal정보를 갱신하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {
						location.reload();
					});
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "Deal정보를 갱신하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}

	} // end of updateDealInfo()

};

function btnReset(){
	tab1reset();
	
	// TODO : 
	//tab2reset();
	//tab3reset();
	//tab4reset();
	//tab5reset();
	//tab6reset();
	//tab7reset();
	//tab8reset();
}

// tab1 안건구조 초기화
function tab1reset() {
	$('#AS03210S_selectedDealNo').val("");
	
	$('#AS03210S_riskInspctCcd option:eq(0)').prop("selected", true).change();			// 리스크심사구분
	$('#AS03210S_riskInspctCcd').prop("disabled", false);								// 리스크심사구분
	$('#AS03210S_lstCCaseCcd option:eq(0)').prop("selected", true).change();			// 부수안건
	$('#AS03210S_lstCCaseCcd').prop("disabled", false);									// 부수안건
	
	$('#ibDealNm').val("");																// 안건명
	$('#ibDealSnmNm').val("");															// 약어명
	
	$('#AS03210S_raRsltnCcd option:eq(0)').prop("selected", true).change();				// 전결구분
	$('#AS03210S_riskRcgNo').val("");													// 리스크승인번호
	
	$("#AS03210S_inspctDprtCcd option:eq(0)").prop("selected", true).change();			// 심사부서구분
	$("#AS03210S_invstGdsLdvdCd option:eq(0)").prop("selected", true).change();			// 투자상품대분류
	$("#AS03210S_invstGdsDtlsDvdCd option:eq(0)").prop("selected", true).change();		// 상세분류
	
	$("#AS03210S_invstCrncyCd option[value='KRW']").prop("selected", true).change();	// 부의기준통화
	$('#crncyAmt').val("");																// 부의금액
	$("#AS03210S_cntyCd option:eq(0)").prop("selected", true).change();					// 투자국가
	$('#aplcExchR').val("1");															// 적용환율
	$('#crncyAmtWn').val("");															// 부의금액(원)
	
	$("#AS03210S_indTypDvdCd option:eq(0)").prop("selected", true).change();			// 고위험산업
	$("#AS03210S_checkItemCd option:eq(0)").prop("selected", true).change();			// 업무구분
	$("#AS03210S_bsnsAreaCd option:eq(0)").prop("selected", true).change();				// 사업지역
	$("#AS03210S_invstThingCcd option:eq(0)").prop("selected", true).change();			// 주요투자물건
	$("#AS03210S_invstThingDtlsCcd option:eq(0)").prop("selected", true).change();		// 투자물건상세
	
	$('#invstPrdMmC').val("");															// 투자기간(개월)
	$('#tab1_datepicker1').val("");														// 기표일(예정)
	$('#mtrtDt').val("");																// 만기일
	
	$('#tlErnAmt').val("");																// 전체수익
	$('#rcvblErnAmt').val("");															// 수수료수익
	$('#wrtErnAmt').val("");															// 투자수익
	
	$('#AS03210S_mrtgOfrF').val("Y").prop("selected", true).change();					// 담보
	$('#AS03210S_ensrF').val("Y").prop("selected", true).change();						// 보증
	$("#AS03210S_rspsbCmplCcd option:eq(0)").prop("selected", true).change();			// 책임준공
	
	$('#AS03210S_entpRnm').val("");														// 업체명
	
	$('#AS03210S_bsnsDprtCmmtRmrk1').val("");											// 사업부의견
	$('#AS03210S_inspctDprtCmmtRmrk2').val("");											// 심사부의견
		
	$('#assesmentRequest').prop("disabled", true);										// 심사요청버튼
	$('#assesmentRequestCancel').prop("disabled", true);								// 심사요청취소버튼
	$('#assesmentRequestHold').prop("disabled", true);									// 취소심사보류버튼

	$('#tab-1 .btn-success').prop("disabled", false);									// 저장버튼	
}


/*
 * TAB2
 */
// 관련문서정보 초기화
function tab2BtnReset() {
	$('#AS03210S_raDocNo').val('');									// RA관련문서번호
	$("#AS03210S_raFnlDocF option:eq(0)").prop("selected", true);	// RA최종문서여부
	$('#AS03210S_raRmrk').val('');									// RA비고(URLLINK)
	$('#docActive tbody tr').removeClass('table-active');			// 테이블Active 제거
	$('#AS03210S_tab2_itemSq').val('');								// 항목일련번호
}

// 관련문서저장 삭제
function tab2BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();
	var raDocNo = $('#AS03210S_raDocNo').val();
	var itemSq = $('#AS03210S_tab2_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(raDocNo) && !isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관련문서정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "raDocNo": raDocNo
			, "itemSq": itemSq
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteDocInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "문서정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getDocInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "문서정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}

}

// 관련문서정보 저장
function tab2BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();			// IBDEAL번호
	var raDocNo = $('#AS03210S_raDocNo').val();					// 문서번호
	var raFnlDocF = $('#AS03210S_raFnlDocF').val();				// 최종문서여부
	var raRmrk = $('#AS03210S_raRmrk').val();					// RA비고(URLLINK)
	var itemSq = $('#AS03210S_tab2_itemSq').val();				// 일련번호
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(raDocNo)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "문서번호를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "raDocNo": raDocNo
			, "raFnlDocF": raFnlDocF
			, "raRmrk": raRmrk
			, "itemSq": itemSq
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/registDocInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "문서정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getDocInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "문서정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

/*
 * TAB3
 */
// 기초자산종류
function loadBscAstsKndCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/B002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_bscAstsKndCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_bscAstsKndCd').html(html);
		}
	});
};

// 기초자산 법인번호 이벤트
function checkBscAstsCorpNo() {
	var corpNo = $('#AS03210S_bscAstsIsngCorpNo');

	corpNo.on("input click", function() {
		validateCorpNo(corpNo);
	});

	$("#AS03210S_assetInfo").on("click", function() {
		validateCorpNo(corpNo);
	});
}

// 기초자산 초기화
function tab3BtnReset() {
	$("#AS03210S_bscAstsKndCd option:eq(0)").prop("selected", true);			// 기초자산종류코드
	$('#AS03210S_bscAstsCntnt').val('');										// 기초자산내용
	$('#AS03210S_bscAstsCrncyCd option[value="KRW"]').prop("selected", true);	// 부의기준통화
	$('#bscAstsOpnPrcValAmt').val('0');											// 시가평가금액
	$('#AS03210S_bsc_corpRgstNo').val('');										// 기초자산발행법인번호
	$('#bscAstsCrncyAmt').val('0');												// 통화금액
	$('#bscAstsAplcExchR').val('1');											// 적용환율
	$('#bscAstsActive tbody tr').removeClass('table-active');					// 테이블Hover 제거
	$('#AS03210S_tab3_itemSq').val('');											// 항목일련번호
	$('#AS03210S_rnmcno').val('');												// 실명확인번호

	// 법인번호 유효성 검사 수행
	validateCorpNo($('#AS03210S_bsc_corpRgstNo'));
}

// 기초자산정보 저장
function tab3BtnSave() {
	
	var ibDealNo = $('#AS03210S_selectedDealNo').val();										// IBDEAL번호
	var bscAstsKndCd = $('#AS03210S_bscAstsKndCd').val();									// 기초자산종류코드
	var bscAstsCntnt = $('#AS03210S_bscAstsCntnt').val();									// 기초자산명
	var opnPrcValAmt = $('#bscAstsOpnPrcValAmt').val().replace(/,/g, "");					// 시가평가금액
	var bscAstsIsngCorpNo = $('#AS03210S_bsc_corpRgstNo').val().replace(/[^0-9]/g, "");		// 기초자산발행법인번호
	var invstCrncyCd = $('#AS03210S_bscAstsCrncyCd').val();									// 부의기준통화
	var crncyAmt = $('#bscAstsCrncyAmt').val().replace(/,/g, "");							// 통화금액
	var aplcExchR = $('#bscAstsAplcExchR').val();											// 적용환율
	var itemSq = $('#AS03210S_tab3_itemSq').val();											// 항목일련번호
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();									// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();										// 부수안건

	var rnmcno = $('#AS03210S_rnmcno').val();												// 실명확인번호

	var validPattern = /^(\d{6})(\d{7})$/; 													// 숫자만 13자리(2그룹) 형식을 나타내는 정규 표현식

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(bscAstsKndCd && bscAstsCntnt && opnPrcValAmt && bscAstsIsngCorpNo && invstCrncyCd)) {
			if (bscAstsIsngCorpNo.length !== 13 || !validPattern.test(bscAstsIsngCorpNo)) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "기초자산 법인번호 13자리를 확인해주세요."
					, confirmButtonText: "확인"
				});
			} else {
				businessFunction();
			}
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "기초자산정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "bscAstsKndCd": bscAstsKndCd
			, "bscAstsCntnt": bscAstsCntnt
			, "opnPrcValAmt": opnPrcValAmt
			, "bscAstsIsngCorpNo": bscAstsIsngCorpNo
			, "invstCrncyCd": invstCrncyCd
			, "crncyAmt": crncyAmt
			, "aplcExchR": aplcExchR
			, "itemSq": itemSq
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "rnmcno": rnmcno
		}
		$.ajax({
			type: "POST",
			url: "/registAssetInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "기초자산정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getAssetInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "기초자산정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 기초자산정보 삭제
function tab3BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab3_itemSq').val();									// 항목일련번호
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "기초자산정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteAssetInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "기초자산정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getAssetInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "기초자산정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}


// 기초자산 입력 예정여부 저장
function bscAstsInptExptFOnChecked() {
	$('#bscAstsInptExptF').on('change', function() {
		saveBscAstsInptExptF();
	});
}

function saveBscAstsInptExptF() {
	
	var ibDealNo         = 	$('#AS03210S_selectedDealNo').val();
	var riskInscptCcd    = 	$('#AS03210S_riskInspctCcd').val();
	var lstCCaseCcd      = 	$('#AS03210S_lstCCaseCcd').val();
	
	var bscAstsInptExptF;
	
	if ($('#bscAstsInptExptF').is(":checked")) {
		bscAstsInptExptF = 'Y';
	} else {
		bscAstsInptExptF = 'N';
	}
	

	if ( isEmpty(ibDealNo)
	||   isEmpty(riskInscptCcd)
	||   isEmpty(lstCCaseCcd) ) {
		Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "선택된 안건이 없습니다."
					, confirmButtonText: "확인"
				});
		
		return false;
		
	}else{
		businessFunction();	
	}
	
	
	function businessFunction() {
	
		var paramData = {
			  "ibDealNo" 	  	 : ibDealNo
			, "riskInscptCcd"    : riskInscptCcd
			, "lstCCaseCcd"      : lstCCaseCcd
			, "bscAstsInptExptF" : bscAstsInptExptF
		}
		
		$.ajax({
			type: "POST",
			url: "/registBscAstsInptExptF",
			data: paramData,
			dataType: "json",
			success: function() {
				//getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
			}
		});
	
	}
	
}


/*
 * TAB4
 */
// 법인형태
function loadCncCmpnyClsfCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/C002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_cncCmpnyClsfCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_cncCmpnyClsfCd').html(html);
		}
	});
};

// 관계사법인번호 이벤트
function chkCncCorpNo() {
	var corpNo = $('#AS03210S_cnc_corpRgstNo');

	corpNo.on("input click", function() {
		validateCorpNo(corpNo);
	});

	$("#AS03210S_cnc_corpRgstNo").on("click", function() {
		validateCorpNo(corpNo);
	});

}

// 최대주주명 이벤트
function chkmxStkhdNm() {
	var mxStkhdNm = $('#AS03210S_mxStkhdNm');

	mxStkhdNm.on("input click", function() {
		validateMxStkhdNm(mxStkhdNm);
	});

	$("#AS03210S_mxStkhdNm").on("click", function() {
		validateMxStkhdNm(mxStkhdNm);
	});

}


// 관계사정보 초기화
function tab4BtnReset() {
	$("#AS03210S_cncCmpnyClsfCd option:eq(0)").prop("selected", true);
	$('#AS03210S_cnc_corpRgstNo').val('');
	$('#AS03210S_cnc_entpRnm').val('');
	$('#AS03210S_mxStkhdNm').val('');
	$('#relatedCompanyActive tbody tr').removeClass('table-active');
	$('#AS03210S_tab4_itemSq').val('');
	//$('#AS03210S_tab4_rnmcno').val('');

	validateCorpNo($('#AS03210S_isngOgnCorpNo'));
}

// 문자열의 길이를 계산하여 반환하는 함수
function getCharacterByteLength(str) {
	var byteLength = 0;
	for (var i = 0; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode <= 0x007F) {
			byteLength += 1; // 영문자는 1바이트
		} else {
			byteLength += 2; // 한글은 2바이트
		}
	}
	return byteLength;
}

// 관계사정보 저장
function tab4BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호

	var cncCmpnyClsfCd = $('#AS03210S_cncCmpnyClsfCd').val();						// 연결회사구분코드
	var isngOgnCorpNo = $('#AS03210S_cnc_corpRgstNo').val().replace(/[^0-9]/g, "");	// 발행기관법인번호
	var mxStkhdNm = $('#AS03210S_mxStkhdNm').val();									// 최대주주명
	var itemSq = $('#AS03210S_tab4_itemSq').val();									// 항목일련번호
	var entpHnglNm = $('#AS03210S_cnc_entpRnm').val();								// 한글법인명
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	//var rnmcno = $('#AS03210S_tab4_rnmcno').val();								// 실명확인번호
	var validPattern = /^(\d{6})(\d{7})$/; 											// 13자리 숫자만 형식을 나타내는 정규 표현식

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(cncCmpnyClsfCd) && !isEmpty(isngOgnCorpNo) && !isEmpty(mxStkhdNm)) {
			if (isngOgnCorpNo.length !== 13 || !validPattern.test(isngOgnCorpNo)) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "법인번호 13자리를 확인해주세요."
					, confirmButtonText: "확인"
				});
			} else if (mxStkhdNm.length > 20) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "최대주주명은 20자를 넘을 수 없습니다."
					, confirmButtonText: "확인"
				});
			} else {
				businessFunction();
			}
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관계사정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "cncCmpnyClsfCd": cncCmpnyClsfCd
			, "isngOgnCorpNo": isngOgnCorpNo
			, "mxStkhdNm": mxStkhdNm
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
			, "entpHnglNm" : entpHnglNm
		}
		

		$.ajax({
			type: "POST",
			url: "/registCncCmpnyInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "관계사정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "관계사정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 관계사정보 삭제
function tab4BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab4_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관계사정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteCncCmpnyInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "관계사정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "관계사정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}

}

// 거래상대방 입력 예정여부 저장
function cncCmpnyInptExptFOnChecked () {
	
	$('#cncCmpnyInptExptF').on('change', function () {
		saveCncCmpnyInptExptF();
	});
}

function saveCncCmpnyInptExptF() {
	
	var ibDealNo 		= $('#AS03210S_selectedDealNo').val();
	var riskInscptCcd 	= $('#AS03210S_riskInspctCcd').val();
	var lstCCaseCcd 	= $('#AS03210S_lstCCaseCcd').val();
	
	var cncCmpnyInptExptF;
	
	if ($('#cncCmpnyInptExptF').is(":checked")) {
		cncCmpnyInptExptF = 'Y';
	} else {
		cncCmpnyInptExptF = 'N';
	}
	
	
	if (isEmpty(ibDealNo) || isEmpty(riskInscptCcd) || isEmpty(lstCCaseCcd)) {
		Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "선택된 안건이 없습니다."
					, confirmButtonText: "확인"
				});
				
		return false;
		
	} else {
		businessFunction();
	}
	
	function businessFunction() {
		
		var paramData = {
			  "ibDealNo" 	  	 : ibDealNo
			, "riskInscptCcd"    : riskInscptCcd
			, "lstCCaseCcd"      : lstCCaseCcd
			, "cncCmpnyInptExptF" : cncCmpnyInptExptF
		}
		
		
		$.ajax({
			
			type: "POST",
			url: "/registCncCmpnyInptExptF",
			data: paramData,
			dataType: "json",
			success: function() {
				getCncCmpnyInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
			
			}
		});
	}
	
}



/*
 * TAB5
 */
// 외부신용등급구분코드(SL내부등급)
function loadOutsCrdtGrdCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/O002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_outsCrdtGrdCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_outsCrdtGrdCcd').html(html);
		}
	});
}

// SL번호 이벤트
function chkSpcltFncMngNo() {
	var spcltFncMngNo = $('#AS03210S_spcltFncMngNo');

	spcltFncMngNo.on("input click", function() {
		validateSpcltFncMngNo(spcltFncMngNo);
	});

	$("#AS03210S_spcltFncMngNo").on("click", function() {
		validateSpcltFncMngNo(spcltFncMngNo);
	});

}


// 내부신용등급구분코드
function loadInsCrdtGrdCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_insCrdtGrdCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_insCrdtGrdCcd').html(html);
		}
	});
};

// 내부등급 법인번호 이벤트
function checkBrrwrCorpNo() {
	var corpNo = $('#AS03210S_ins_corpRgstNo');
	var corpNoValue = $('#AS03210S_ins_corpRgstNo').val();
	corpNo.on("input click", function() {
		validateCorpNo(corpNo);
	});
	
}


// 내부등급정보 초기화
function tab5BtnReset() {
	$("#AS03210S_insGrdTrgtF option:eq(0)").prop("selected", true);
	$("#AS03210S_spcltFncTrgtF option:eq(0)").prop("selected", true);
	$('#AS03210S_spcltFncMngNo').val('');
	$('#AS03210S_outsCrdtGrdCcd').val('');
	$('#AS03210S_ins_corpRgstNo').val('');
	$('#AS03210S_cnc_entpRnm').val('');						
	$('#AS03210S_insCrdtGrdCcd').val('');
	$('#AS03210S_tab5_itemSq').val('');
	$('#insGrdActive tbody tr').removeClass('table-active');	//테이블Hover 제거
	
	validateCorpNo($('#AS03210S_ins_corpRgstNo'));
	
	setTab5Selecbox();
}

// 내부등급정보 저장
function tab5BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();							// IBDEAL번호

	var insGrdTrgtF = $('#AS03210S_insGrdTrgtF').val();							// 내부등급대상여부
	var spcltFncTrgtF = $('#AS03210S_spcltFncTrgtF').val();						// SL대상여부
	var spcltFncMngNo = $('#AS03210S_spcltFncMngNo').val();						// SL번호
	var outsCrdtGrdCcd = $('#AS03210S_outsCrdtGrdCcd').val();					// SL대상 내부등급
	var brrwrCorpNo = $('#AS03210S_ins_corpRgstNo').val().replace(/[^0-9]/g, "");	// SL비대상 차주법인번호
	var insCrdtGrdCcd = $('#AS03210S_insCrdtGrdCcd').val();						// SL비대상 내부등급
	var itemSq = $('#AS03210S_tab5_itemSq').val();								// 항목일련번호
	var entpHnglNm = $('#AS03210S_ins_entpRnm').val();								// 한글법인명
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	var validPattern = /^(\d{6})(\d{7})$/; 
	
	
	if (!isEmpty(ibDealNo)) {
		if (spcltFncTrgtF === "Y" && spcltFncTrgtF === "N") {
			if(brrwrCorpNo.length !== 13 || !validPattern.test(brrwrCorpNo)){
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "법인번호 13자리를 확인해주세요."
					, confirmButtonText: "확인"
				});
			}
		} else {
			businessFunction();
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "insGrdTrgtF": insGrdTrgtF
			, "spcltFncTrgtF": spcltFncTrgtF
			, "spcltFncMngNo": spcltFncMngNo
			, "outsCrdtGrdCcd": outsCrdtGrdCcd
			, "brrwrCorpNo": brrwrCorpNo
			, "insCrdtGrdCcd": insCrdtGrdCcd
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
			, "entpHnglNm" : entpHnglNm
		}
		
		$.ajax({
			type: "POST",
			url: "/registInsGrdInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "내부등급 정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getInsGrdInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "내부등급 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 내부등급정보 삭제
function tab5BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab5_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "내부등급 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteInsGrdInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "내부등급 정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getInsGrdInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "내부등급 정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}

}

// 내부등급 입력 예정여부 저장
function insGrdInptExptFOnChecked () {
  $('#insGrdInptExptF').on('change', function() {
	  saveCmpnyInptExptF();
  });
}

function saveCmpnyInptExptF() {
	
	var ibDealNo         = 	$('#AS03210S_selectedDealNo').val();
	var riskInscptCcd    = 	$('#AS03210S_riskInspctCcd').val();
	var lstCCaseCcd      = 	$('#AS03210S_lstCCaseCcd').val();
	
	var insGrdInptExptF; 
	
	if ($('#insGrdInptExptF').is(":checked")) {
		insGrdInptExptF = 'Y';
	} else {
		insGrdInptExptF = 'N';
	}
	
	if ( isEmpty(ibDealNo) || isEmpty(riskInscptCcd) || isEmpty(lstCCaseCcd) ) {
		Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "선택된 안건이 없습니다."
					, confirmButtonText: "확인"
				});
				
		return false;
		
	} else {
		businessFunction();
	}
	
	function businessFunction() {
		
		var paramData = {
				"ibDealNo" 	  	 : ibDealNo
			, "riskInscptCcd"    : riskInscptCcd
			, "lstCCaseCcd"      : lstCCaseCcd
			, "insGrdInptExptF"  : insGrdInptExptF
		}
		
		
		$.ajax({
			type: "POST",
			url: "/registInsGrdInptExptF",
			data: paramData,
			dataType: "json",
			success: function() {
				
				getInsGrdInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
			}
		});
		
	}
	
}





/*
 * TAB6
 */
// 담보유형
function loadMrtgKndCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/M002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgKndCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgKndCcd').html(html);
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
			$('#AS03210S_mrtgDtlsCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgDtlsCcd').html(html);
		}
	});
};

// 권리순위
function loadRgtRnkCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R008",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_rgtRnkCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_rgtRnkCcd').html(html);
		}
	});
};

// 담보평가액 * 환율
function mrtgAmt() {
	// 담보평가평가액(원)
	$('#mrtgCrncyAmt').keyup(function(event) {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#AS03210S_mrtgAplcExchR").val();
			if (input1 != "") {																			// 2-1. 적용환율 값이 있을경우
				var input2 = $('#mrtgCrncyAmt').val().replace(/,/g, "");								// 콤마 제거
				$("#mrtgValAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
			} else {																					// 2-2. 적용환율 값이 없을경우
				var input2 = $('#mrtgCrncyAmt').val().replace(/,/g, "");
				$("#mrtgValAmt").val(input2);
			}
		}
	})

	// 적용환율
	$('#AS03210S_mrtgAplcExchR').keyup(function(event) {
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#mrtgCrncyAmt").val().replace(/,/g, "");
			if (input1 != "") {																			// 2. 값이 있으면 계산
				var input2 = $("#AS03210S_mrtgAplcExchR").val();
				$("#mrtgValAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
			}
		}
	})
}

// 담보정보 초기화
function tab6BtnReset() {
	$('#AS03210S_mrtgKndCcd option:eq(0)').prop("selected", true);			// 담보유형
	$('#AS03210S_mrtgDtlsCcd option:eq(0)').prop("selected", true);			// 담보상세
	$('#AS03210S_mrtgAcqstStmCcd option:eq(0)').prop("selected", true);		// 담보취득방식
	$('#AS03210S_mrtgAcqstDtlsCcd option:eq(0)').prop("selected", true);	// 담보취득방식상세
	$('#AS03210S_mrtgDtlsCcd option:eq(0)').prop("selected", true);			// 담보상세
	$('#AS03210S_mrtgCrncyCd option[value="KRW"]').prop("selected", true);	// 부의기준통화
	$('#mrtgCrncyAmt').val('0'); 											// 담보평가액(통화금액)
	$('#AS03210S_mrtgAplcExchR').val('1'); 									// 적용환율
	$('#mrtgValAmt').val('0'); 												// 담보평가액(원)
	$('#AS03210S_rgtRnkCcd option:eq(0)').prop("selected", true);			// 권리순위
	$('#AS03210S_mrtgRsnCntnt').val('');									// 담보명
	$('#AS03210S_tab6_itemSq').val('');										// 항목일련번호
	$()
	$('#mrtgActive tbody tr').removeClass('table-active');					// 테이블Hover 제거
}

// 담보정보 저장
function tab6BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();				// IBDEAL번호

	var mrtgKndCcd = $('#AS03210S_mrtgKndCcd').val();				// 담보종류구분코드
	var mrtgDtlsCcd = $('#AS03210S_mrtgDtlsCcd').val();		   		// 담보상세구분코드
	var mrtgAcqstStmCcd = $('#AS03210S_mrtgAcqstStmCcd').val();		// 담보취득방식
	var mrtgAcqstDtlsCcd = $('#AS03210S_mrtgAcqstDtlsCcd').val();	// 담보취득방식상세
	var invstCrncyCd = $('#AS03210S_mrtgCrncyCd').val();			// 부의기준통화
	var mrtgValAmt = $('#mrtgValAmt').val().replace(/,/g, "");		// 담보평가금액
	var crncyAmt = $('#mrtgCrncyAmt').val().replace(/,/g, "");		// 통화금액
	var aplcExchR = $('#AS03210S_mrtgAplcExchR').val();		   		// 적용환율
	var rgtRnkCcd = $('#AS03210S_rgtRnkCcd').val();					// 권리순위구분코드
	var mrtgRsnCntnt = $('#AS03210S_mrtgRsnCntnt').val();			// 담보사유내용
	var itemSq = $('#AS03210S_tab6_itemSq').val();					// 항목일련번호
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(mrtgValAmt) && !isEmpty(mrtgRsnCntnt)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "담보정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "mrtgKndCcd": mrtgKndCcd
			, "mrtgValAmt": mrtgValAmt
			, "mrtgDtlsCcd": mrtgDtlsCcd
			, "rgtRnkCcd": rgtRnkCcd
			, "mrtgAcqstStmCcd": mrtgAcqstStmCcd
			, "mrtgAcqstDtlsCcd": mrtgAcqstDtlsCcd
			, "crncyAmt": crncyAmt
			, "aplcExchR": aplcExchR
			, "invstCrncyCd": invstCrncyCd
			, "mrtgRsnCntnt": mrtgRsnCntnt
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/registMrtgInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "담보 정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getMrtgInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "담보 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 담보정보 제거
function tab6BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab6_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "담보 정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteMrtgInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "담보 정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getMrtgInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "담보 정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}

}

/*
 * TAB7
 */
// 보증기관 법인번호 확인
/*function chkEnsrCorpNo() {
	var corpNo = $('#AS03210S_ensr_corpRgstNo');

	corpNo.on("input click", function() {
		validateCorpNo(corpNo);
	});

	$("#AS03210S_ensrInfo").on("click", function() {
		validateCorpNo(corpNo);
	});

}*/

// 보증기관정보 초기화
function tab7BtnReset() {
	$('#AS03210S_crdtEhcmntGrntCcd option:eq(0)').prop("selected", true);	// 신용보강보증구분코드
	$('#AS03210S_ensr_corpRgstNo').val('');
	$('#AS03210S_ensr_entpRnm').val('');
	$('#AS03210S_ensrAmt').val('');
	$('#AS03210S_ensrCntnt').val('');
	$('#AS03210S_tab7_itemSq').val('');
	$('#ensrActive tbody tr').removeClass('table-active');					// 테이블Hover 제거

	validateCorpNo($('#AS03210S_ensr_corpRgstNo'));
}

// 보증기관정보 저장
function tab7BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();									// IBDEAL번호
	var crdtEhcmntGrntCcd = $('#AS03210S_crdtEhcmntGrntCcd').val(); 					// 신용보강보증구분코드
	var ensrOgnCorpNo = $('#AS03210S_ensr_corpRgstNo').val().replace(/[^0-9]/g, "");	// 보증기관법인번호			
	var entpHnglNm = $('#AS03210S_ensr_entpRnm').val();						// 보증기관명				
	var ensrAmt = $('#AS03210S_ensrAmt').val().replace(/,/g, "");						// 보증금액
	var ensrCntnt = $('#AS03210S_ensrCntnt').val();										// 보증내용		
	var itemSq = $('#AS03210S_tab7_itemSq').val();										// 항목일련번호	
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	var validPattern = /^(\d{6})(\d{7})$/; 							

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(crdtEhcmntGrntCcd && ensrOgnCorpNo && ensrAmt && ensrCntnt)) {
			if (ensrOgnCorpNo.length !== 13 || !validPattern.test(ensrOgnCorpNo)) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "보증기관 법인번호 13자리를 확인해주세요."
					, confirmButtonText: "확인"
				});
			} else {
				businessFunction();
			}
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "보증기관정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "crdtEhcmntGrntCcd": crdtEhcmntGrntCcd
			, "ensrOgnCorpNo": ensrOgnCorpNo
			, "ensrAmt": ensrAmt
			, "ensrCntnt": ensrCntnt
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
			, "entpHnglNm" : entpHnglNm
		}
		

		$.ajax({
			type: "POST",
			url: "/registEnsrInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "보증기관정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEnsrInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "보증기관정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 보증기관정보 제거
function tab7BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab7_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "보증기관정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteEnsrInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "보증기관정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEnsrInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "보증기관정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

/*
 * TAB8
 */
// 미이행시의무
function loaddbtNpfrmOblgCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/D001",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_dbtNpfrmOblgCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_dbtNpfrmOblgCcd').html(html);
		}
	});
};

// 책임준공 법인번호 확인
/*function chkScCorpNo() {
	var corpNo = $('#AS03210S_rspsb_corpRgstNo');

	corpNo.on("input click", function() {
		validateCorpNo(corpNo);
	});

	$("#AS03210S_cmplInfo").on("click", function() {
		validateCorpNo(corpNo);
	});

}*/

// 책임준공기관정보 초기화
function tab8BtnReset() {
	$('#AS03210S_rspsbCmplOgnCcd option:eq(0)').prop("selected", true);	// 책임준공기관구분
	$('#AS03210S_rspsb_corpRgstNo').val('');							// 증권사법인번호
	$('#AS03210S_dbtNpfrmOblgCcd option:eq(0)').prop("selected", true);	// 채무불이행의무구분코드
	$('#AS03210S_cmplExptDt').val('');									// 준공예정일자
	$('#AS03210S_rspsb_entpRnm').val('');								// 한글법인명
	$('#AS03210S_tab8_itemSq').val('');									// 항목일련번호
	$('#AS03210S_dmgRprtnMxExtnt').val('');								// 손해배상최대범위
	$('#AS03210S_rnmcno').val('');										// 실명확인번호
	
	$('#cmplActive tbody tr').removeClass('table-active');				// 테이블Hover 제거
	//validateCorpNo($('#AS03210S_rspsb_corpRgstNo'));
}

// 책임준공기관정보 저장
function tab8BtnSave() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();										// IBDEAL번호

	var rspsbCmplOgnCcd = $('#AS03210S_rspsbCmplOgnCcd').val();								// 책임준공기관구분코드			
	var scrtsCmpnyCorpNo = $('#AS03210S_rspsb_corpRgstNo').val().replace(/[^0-9]/g, "");	// 증권사법인번호			
	var dbtNpfrmOblgCcd = $('#AS03210S_dbtNpfrmOblgCcd').val();		   						// 채무불이행의무구분코드
	var cmplExptDt = $('#AS03210S_cmplExptDt').val();										// 준공예정일자		
	var itemSq = $('#AS03210S_tab8_itemSq').val();											// 항목일련번호	
	var scrtsCmpnyCorpNm = $('#AS03210S_rspsb_entpRnm').val();								// 보증기관명
	var dmgRprtnMxExtnt = $('#AS03210S_dmgRprtnMxExtnt').val();								// 손해배상최대범위
	var rnmcno = $('#AS03210S_rnmcno').val();												// 실명확인번호
		
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();									// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();										// 부수안건

	var validPattern = /^(\d{6})(\d{7})$/; 			

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(rspsbCmplOgnCcd) && !isEmpty(scrtsCmpnyCorpNo) && !isEmpty(dbtNpfrmOblgCcd) && !isEmpty(cmplExptDt)) {
			if (scrtsCmpnyCorpNo.length !== 13 || !validPattern.test(scrtsCmpnyCorpNo)) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "증권사 법인번호 13자리를 확인해주세요."
					, confirmButtonText: "확인"
				});
			} else {
				businessFunction();
			}
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "책임준공기관정보 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "rspsbCmplOgnCcd": rspsbCmplOgnCcd
			, "scrtsCmpnyCorpNo": scrtsCmpnyCorpNo
			, "dbtNpfrmOblgCcd": dbtNpfrmOblgCcd
			, "cmplExptDt": cmplExptDt
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
			, "scrtsCmpnyCorpNm" : scrtsCmpnyCorpNm
			, "dmgRprtnMxExtnt" : dmgRprtnMxExtnt
			, "rnmcno" : rnmcno 
		}

		$.ajax({
			type: "POST",
			url: "/registCmplInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "책임준공기관정보 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getCmplInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "책임준공기관정보 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 책임준공기관정보 제거
function tab8BtnDelete() {
	var ibDealNo = $('#AS03210S_selectedDealNo').val();								// IBDEAL번호
	var itemSq = $('#AS03210S_tab8_itemSq').val();
	
	var riskInspctCcd = $('#AS03210S_riskInspctCcd').val();							// 리스크심사구분
	var lstCCaseCcd = $('#AS03210S_lstCCaseCcd').val();								// 부수안건

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(itemSq)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "책임준공기관정보 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var paramData = {
			"ibDealNo": ibDealNo
			, "itemSq": itemSq
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/deleteCmplInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "책임준공기관정보 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getCmplInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "책임준공기관정보 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

/* 
 * Load SelectBox 코드
 */
// TAB3 기초자산
// 기초자산기준통화코드
function loadBscAstsCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_bscAstsCrncyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_ID + '</option>';
				});
			}
			$('#AS03210S_bscAstsCrncyCd').html(html);
			$('#AS03210S_bscAstsCrncyCd option[value="ZZZ"]').remove();
			$('#AS03210S_bscAstsCrncyCd option[value="KRW"]').prop('selected', true);

		}
	});
}

// TAB6 담보
// 담보취득방식구분코드
function loadMrtgAcqstStmCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/M003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgAcqstStmCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgAcqstStmCcd').html(html);
		}
	});
}

// 담보취득상세구분코드
function loadMrtgAcqstDtlsCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/M004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgAcqstDtlsCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_mrtgAcqstDtlsCcd').html(html);
		}
	});
}
// 담보기준통화코드
function loadMrtgCrncyCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I016",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_mrtgCrncyCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_ID + '</option>';
				});
			}
			$('#AS03210S_mrtgCrncyCd').html(html);
			$('#AS03210S_mrtgCrncyCd option[value="ZZZ"]').remove();
			$('#AS03210S_mrtgCrncyCd option[value="KRW"]').prop('selected', true);
		}
	});
}
// TAB7 보증
// 신용보강보증구분코드
function loadCrdtEhcmntGrntCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/C007",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_crdtEhcmntGrntCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_crdtEhcmntGrntCcd').html(html);
		}
	});
}

// TAB8 책임준공
// 책임준공기관구분코드
function loadRspsbCmplOgnCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R019",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_rspsbCmplOgnCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_rspsbCmplOgnCcd').html(html);
		}
	});
}


/*
 *공통 함수
 */
// 적용환율 소수점 4자리만 입력
function restrictDecimalDigits(input, maxDecimalDigits) {
  var value = input.value;
  var decimalIndex = value.indexOf('.');
  
  if (decimalIndex !== -1 && value.length - decimalIndex > maxDecimalDigits + 1) {
    // 소수점 이하 자릿수가 제한을 초과한 경우 절삭
    var roundedValue = value.substring(0, decimalIndex + maxDecimalDigits + 1);
    input.value = roundedValue;
  }
}

// 법인번호 확인
function validateCorpNo(corpNo) {
	var corpNoValue = corpNo.val();
	var chkCorpNo = /^(\d{6})(\d{7})$/;			 // 6자리,7자리(2그룹) 형식을 나타내는 정규표현식
	var addCorpNo = '$1-$2';					 // 그룹 사이 '-' 추가
	var chkAllCorpNo = /^\d{6}-\d{7}$/;			 // 6자리-7자리 정규표현식
	var formattedInput = corpNoValue.replace(chkCorpNo, addCorpNo);

	corpNo.val(formattedInput);					// '-' 붙이기

	// '-'가 여러 번 포함되어 있는 경우 첫 번째 '-' 이후의 '-'는 모두 제거
	formattedInput = formattedInput.replace(/-([^]*)-/, '-$1');

	var isValid = corpNoValue !== "" && chkAllCorpNo.test(formattedInput);

	corpNo.toggleClass("is-invalid", !isValid || corpNoValue === "");
	corpNo.toggleClass("is-valid", isValid);

	if (formattedInput.length > 14) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "법인번호 13자리를 초과하였습니다."
			, confirmButtonText: "확인"
		}).then(function() {
			var trimmedInput = formattedInput.substring(0, 14);
			corpNo.val(trimmedInput);
			validateCorpNo(corpNo);
		});
	}
}

// 최대주주명 확인
function validateMxStkhdNm(mxStkhdNm) {
	var mxStkhdNmValue = mxStkhdNm.val();

	var isValid = (mxStkhdNmValue.length == 20)

	mxStkhdNm.toggleClass("is-invalid", !isValid || mxStkhdNmValue === "");
	mxStkhdNm.toggleClass("is-valid", isValid);

	if (mxStkhdNmValue.length > 20) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "최대주주명 20자리를 초과하였습니다."
			, confirmButtonText: "확인"
		}).then(function() {
			var trimmedInput = mxStkhdNmValue.substring(0, 20);
			mxStkhdNm.val(trimmedInput);
			validateMxStkhdNm(mxStkhdNm);
		});
	}
}

// SL번호 확인
function validateSpcltFncMngNo(spcltFncMngNo) {
	var spcltFncMngNoValue = spcltFncMngNo.val();

	var isValid = (spcltFncMngNoValue.length ==10)

	spcltFncMngNo.toggleClass("is-invalid", !isValid || spcltFncMngNoValue === "");
	spcltFncMngNo.toggleClass("is-valid", isValid);

	if (spcltFncMngNoValue.length > 10) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "SL번호 10자리를 초과하였습니다."
			, confirmButtonText: "확인"
		}).then(function() {
			var trimmedInput = spcltFncMngNoValue.substring(0, 10);
			spcltFncMngNo.val(trimmedInput);
			validateSpcltFncMngNo(spcltFncMngNo);
		});
	}
}

// 법인번호 '-' 추가
function formatCorpNo(corpNo) {
  var formattedCorpNo = corpNo.replace(/(\d{6})(\d{7})/, "$1-$2");
  return formattedCorpNo;
}

