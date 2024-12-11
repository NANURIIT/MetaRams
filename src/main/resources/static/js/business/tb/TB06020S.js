const TB06020Sjs = (function(){
	var ldvdCd = [];
	var mdvdCd = [];
	var sdvdCd = [];

	let arrPqGridLstMrtgInfo;		// 그리드 instance
	let arrPqGridAtchFleInfo;		

	$(document).ready(function() {
		loadSelectBoxContents();
		radioCheckFunction();
		//setToggleBtnEvent();
		roadTabInfoGrid();
		onChangeEprzCrdlPrdtLclsCd(); // 기업여신상품대분류코드 선택이벤트
		onChangeEprzCrdlPrdtMdclCd(); // 기업여신상품중분류코드 선택이벤트
		defaultNumberFormat(); //기본 숫자타입
	});
	
	
	function defaultNumberFormat(){	
		$("input[id*='Amt'], input[id*='Mnum'], input[id*='Shqt']").val("0");
		selectorNumberFormater(
		      $("input[id*='Amt'], input[id*='Mnum'], input[id*='Shqt']")
		);
	}
	

	// pqGrid	
	function roadTabInfoGrid() {
		let pqGridTabInfoObjs = [
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06020S_lstMrtgInfo' 	// 담보/보증정보
				, colModel: colLstMrtgInfo
			},
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06020S_atchFleInfo'	// 첨부파일
				, colModel: colAtchFleInfo
			}
		];

		setPqGrid(pqGridTabInfoObjs);
		
		arrPqGridLstMrtgInfo = $("#TB06020S_lstMrtgInfo").pqGrid('instance');
		arrPqGridAtchFleInfo = $("#TB06020S_atchFleInfo").pqGrid('instance');
		
		arrPqGridLstMrtgInfo.option("cellClick", function(event, ui) {

			rowData = ui.rowData;
			$("#TB06020S_mrtgMngmNo_forPop").val(rowData.mrtgMngmNo);
			$("#TB06020S_mrtgNm_forPop").val(rowData.mrtgNm);
			
		});
			
	}

	function loadSelectBoxContents() {
		
		var item = '';
		item += 'I008';					// 결의협의회구분코드
		item += '/' + 'I012';			// 신용등급코드정보
		item += '/' + 'C012';			// 신용등급코드정보
		item += '/' + 'E022';			// 기업여신상품대분류코드
		item += '/' + 'E023';			// 기업여신상품중분류코드
		item += '/' + 'P004';			// 기업여신상품소분류코드
		item += '/' + 'I002';			// 금융상품분류코드
		item += '/' + 'D012';			// 데스크코드
		item += '/' + 'C006';			// 국가코드
		item += '/' + 'I027';			// 투자통화코드
		item += '/' + 'T002';			// 당사역할구분코드
		item += '/' + 'R017';			// 부동산금융구분코드
		item += '/' + 'S002';			// SOC구분코드
		//item += '/' + 'I011';			// 진행상태
		item += '/' + 'D007';			// 매각일자구분코드
		item += '/' + 'D008';			// 매각기준금액구분코드
		
		getSelectBoxList('TB06020S', item);
		getSelectBoxCode2('TB06020S','I011');
		
		
		var item = '';
		item += 'E028';					// 담보설정종류코드
		item += '/' + 'M008';			// 담보대분류코드
		item += '/' + 'M009';			// 담보중분류코드
		item += '/' + 'M006';			// 담보평가기준코드
		item += '/' + 'I027';			// 투자통화코드
		item += '/' + 'A009';			// 감정구분코드
		item += '/' + 'D009';			// 국외담보여부
		item += '/' + 'A008';			// 감정평가기관코드
		item += '/' + 'C013';			// 시가평가기준코드
		item += '/' + 'A010';			// 감정목적코드
		item += '/' + 'M011';			// 담보설정종류코드
		item += '/' + 'G006';			// 보증기관구분코드
		item += '/' + 'G005';			// 보증기관코드
		item += '/' + 'E033';			// 기타담보유형코드
		item += '/' + 'E032';			// 기타담보종류코드
		item += '/' + 'E031';			// 기타담보취득방법코드
		item += '/' + 'R019';			// 실물담보종류코드
		item += '/' + 'A011';			// 감정기준코드
		item += '/' + 'I012';			// 신용등급코드정보
		item += '/' + 'C012';			// 신용등급코드
		item += '/' + 'G003';			// 보증채무자관계구분코드
		item += '/' + 'S004';			// 결산기구분코드
		item += '/' + 'G007';			// 보증결산일기타구분코드
		item += '/' + 'M012';			// 동산담보종류코드
		item += '/' + 'M004';			// 담보취득방법코드
		item += '/' + 'G002';			// 보증약정구분코드
		
		var selCnt =0;
		selCnt= $("#TB06013P_E028 option").length;
		if(selCnt==0 ||selCnt==1) getSelectBoxList('TB06013P', item);	
		onChangeSelectBoxMrtgKndCd();	
	}
	


	/**
	 * 기업여신 대분류코드 이벤트 핸들러
	 */
	function onChangeEprzCrdlPrdtLclsCd() {
		$('#TB06020S_E022').on('change', function() {
			var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changeEprzCrdlPrdtMdclCd(selectedLdvdCd);
		});
	}

	function changeEprzCrdlPrdtMdclCd(selectedLdvdCd){
		var html = "";
		
		$('#TB06020S_E023').html(html);
		
		html += '<option value="">선택</option>';
		

		if (mdvdCd != undefined && mdvdCd.length > 0) {
			var validMdvdCds = [];
			var selectedLdvdPrefix = selectedLdvdCd.slice(0, -1);

			$.each(mdvdCd, function(key, value) {
				if (value.cdValue.startsWith(selectedLdvdPrefix)) {
					validMdvdCds.push(value.cdValue);
				}
			});

			if (validMdvdCds.length > 0) {
				$.each(mdvdCd, function(key, value) {
					if (validMdvdCds.includes(value.cdValue)) {
						html += '<option value="' + value.cdValue + '">' + value.cdName + ' (' + value.cdValue + ')</option>';
					}
				});

				$('#TB06020S_E023').html(html);
				$('#TB06020S_E023').val($('#TB06020S_E023').val()).prop("selected", true).change();
			}
		}
	}

	/**
	 * 기업여신 중분류코드 이벤트 핸들러
	 */ 
	function onChangeEprzCrdlPrdtMdclCd() {
		$('#TB06020S_E023').on('change', function() {
			var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changePrdtClsfCd(selectedMdvdCd);
		});
	}

	function changePrdtClsfCd(selectedMdvdCd) {
		var html = "";

		$('#TB06020S_P004').html(html);
		
		html += '<option value="">선택</option>';


		if (sdvdCd != undefined && sdvdCd.length > 0) {
			var validSdvdCds = [];

			$.each(sdvdCd, function(key, value) {
				if (value.cdValue.startsWith(selectedMdvdCd)) {
					validSdvdCds.push(value.cdValue);
				}
			});

			if (validSdvdCds.length > 0) {
				$.each(sdvdCd, function(key, value) {
					if (validSdvdCds.includes(value.cdValue)) {
						html += '<option value="' + value.cdValue + '">' + value.cdName + ' (' + value.cdValue + ')</option>';
					}
				});

				$('#TB06020S_P004').html(html);
			}
		}
	}

	function radioCheckFunction() {
		$(':radio[name=TB06020S_rlesFnnYn]').on('change', function() {
			var rlesFnnYn = $('input[name=TB06020S_rlesFnnYn]:checked').val();
			if (rlesFnnYn == 'Y') {
				$('#TB06020S_R017').attr('disabled', false);
			} else {
				$("#TB06020S_R017 option:eq(0)").prop("selected", true).change();
				$('#TB06020S_R017').attr('disabled', true);
			}
		})
		
		$(':radio[name=TB06020S_socYn]').on('change', function() {
			var socYn = $('input[name=TB06020S_socYn]:checked').val();
			if (socYn == 'Y') {
				$('#TB06020S_S002').attr('disabled', false);
			} else {
				$("#TB06020S_S002 option:eq(0)").prop("selected", true).change();
				$('#TB06020S_S002').attr('disabled', true);
			}
		})
	}

	//초기화
	function resetSearchRequiment() {
		$('#TB06020S_ibDealNo').val('');
		$('#TB06020S_riskInspctCcdNm').val('');
		$('#TB06020S_riskInspctCcd').val('');
		$('#TB06020S_lstCCaseCcdNm').val('');
		$('#TB06020S_lstCCaseCcd').val('');
		$('#TB06020S_ibDealNm').val('');
		$('#TB06020S_mtrNm').val('');
		$('#TB06020S_prdtCd').val('');
		$('#TB06020S_prdtNm').val('');
		
		/*
		let inputLength = $("#page-TB06020S :input").length;
		for (let i = 0; i < inputLength; i++) {
			$("#page-TB06020S :input:eq("+i+")").val("");
			
		}*/
		
		resetInputValue($('div[data-menuid="/TB06020S"]'));
		//$('#TB06020S_C006 option[value="KR"]').prop("selected", true); // 국가코드
		//$('#TB06020S_C006_I027 option[value="KRW"]').prop("selected", true); // 통화코드
	}


	function getDealList() {
		var ibDealNo = $('#TB06020S_ibDealNo').val();
		var riskInspctCcd = $('#TB06020S_riskInspctCcd').val();
		var lstCCaseCcd = $('#TB06020S_lstCCaseCcd').val();
		var prdtCd = $('#TB06020S_prdtCd').val();
		
		console.log("riskInspctCcd:"+riskInspctCcd );
		console.log("lstCCaseCcd:"+lstCCaseCcd );
		console.log("ibDealNo:"+ibDealNo );


		getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd);
		
		
		
		//if( !isEmpty(prdtCd) ) {
			getIBIMS208BDTOInfo(prdtCd);
			getIBIMS212BDTOInfo(prdtCd);
		//}		
		
		
	}

	function setFileUpload() {
		
	}

	// 결의안건정보
	function getCnfrncDealInfo(ibDealNo, jdgmDcd, mtrDcd, prdtCd) {
		var option = {}
		var trDvsn ="D"; //집합투자증권		
		option.text = "";		
		if (isEmpty(ibDealNo) && isEmpty(prdtCd)) {
			option.text = "Deal 정보 또는 종목코드 정보를 조회해주세요.";
			openPopup(option);
			return false;
		}

		var paramData = {
			  "dealNo"  : ibDealNo
			, "mtrDcd"  : mtrDcd
			, "jdgmDcd" : jdgmDcd
			, "prdtCd"  : prdtCd
			, "trDvsn"  : trDvsn
		}

		$.ajax({
			type: "GET",
			url: "/TB06020S/getCnfrncDealInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var dealDetail = data;

				/** Deal 정보 */
				$('#TB06020S_ibDealNo').val(dealDetail.dealNo);													// 딜번호
				$('#TB06020S_prdtCd').val(dealDetail.prdtCd);													// 종목코드
				$('#TB06020S_prdtNm').val(dealDetail.prdtNm);													// 종목명
				$('#TB06020S_mtrNm').val(dealDetail.mtrNm);														// 안건명
				$('#TB06020S_apvlDt').val(formatDate(dealDetail.apvlDt));										// 승인일자(결의일자)
				$('#TB06020S_I008').val(dealDetail.cnsbDcd).prop("selected", true);								// 승인심사기구(결의협의회구분코드)
				$('#TB06020S_invJdgmComtNo').val(dealDetail.cnsbSq);											// 위원회번호(심사협의회차일련번호)
				$('#TB06020S_sumApvlAmt').val(Number(dealDetail.sumApvlAmt).toLocaleString());					// 승인금액
				//$(":radio[name='TB06020S_sdnCndtF']").radioSelect(dealDetail.sdnCndtF);						// 승인조건(셀다운)(셀다운조건여부)
				//$(":radio[name='TB06020S_etcCndtF']").radioSelect(dealDetail.etcCndtF);						// 승인조건(기타)(기타조건여부)
				if($('#TB06020S_sdnCndtDwn').val() == 'N') {													// 승인조건(셀다운)(셀다운조건여부)
					$('#TB06020S_sdnCndtDwn').val('N')
				} else {
				$('#TB06020S_sdnCndtDwn').val(dealDetail.sdnCndtF);
				}
				if($('#TB06020S_sdnCndtEtc').val() == 'N') {													// 승인조건(기타)(기타조건여부)
					$('#TB06020S_sdnCndtEtc').val('N')
				} else {
				$('#TB06020S_sdnCndtEtc').val(dealDetail.etcCndtF);
				}
				
				/** 종목 정보 */
				if( isEmpty($('#TB06020S_prdtCd').val()) ) {
					$('#TB06030S_prdtCd').val(dealDetail.prdtCd);												// 종목코드
					$('#TB06020S_res_prdtNm').val(dealDetail.mtrNm);											// 안건명
				} else {
					$('#TB06020S_res_prdtNm').val(dealDetail.prdtNm);											// 종목명
				}
				$('#TB06020S_res_prdtCd').val(dealDetail.prdtCd);												// 종목코드
				
				$('#TB06020S_I011').val(dealDetail.prgSttsCd).prop("selected", true).change();					// 진행상태
				
				$('#TB06020S_ardyBzepNo').val(handleNullData(checkBrnAcno(dealDetail.trOthrDscmNo)));			// 거래상대방식별번호
				$('#TB06020S_corpRgstNo').val(dealDetail.corpNo);												// 법인번호
				
				$('#TB06020S_bzepName').val(dealDetail.trOthrDscmNm);											// 거래상대방(업체한글명)
				$('#TB06020S_I012').val(dealDetail.dmsCrdtGrdDcd).prop("selected", true);						// 내부신용등급(신용등급코드)
				$('#TB06020S_crdtInqDt').val(formatDate(dealDetail.crdtInqDt));									// 신용조회일
				
				/** 자산분류 정보 */
				
				$('#TB06020S_E022').val(dealDetail.prdtLclsCd).prop("selected", true).change();					// 투자상품대분류
				$('#TB06020S_E023').val(dealDetail.prdtMdclCd).prop("selected", true).change();					// 투자상품중분류
				$('#TB06020S_P004').val(dealDetail.prdtClsfCd).prop("selected", true).change();					// 투자상품소분류
				$('#TB06020S_I002').val(dealDetail.ibPrdtClsfCd).prop("selected", true);						// 투자상품상세분류
				
				$(":radio[name='TB06020S_altnInvYn']").radioSelect(dealDetail.altnInvYn);						// 대체투자여부
				$('#TB06020S_fndCd').val(dealDetail.ortnFndCd);													// 펀드코드
				$('#TB06020S_fndNm').val(dealDetail.fndNm);														// 펀드코드명
				$('#TB06020S_D012').val(dealDetail.dskCd).prop("selected", true);								// 데스크코드
				$('#TB06020S_C006').val(dealDetail.invNtnCd).prop("selected", true);							// 투자국가코드
				$(":radio[name='TB06020S_rlesFnnYn']").radioSelect(dealDetail.rlesFnnYn);						// 부동산금융여부
				$('#TB06020S_R017').val(dealDetail.rlesFnnDetlDcd).prop("selected", true);						// 부동산금융구분코드
				
				$(":radio[name='TB06020S_socYn']").radioSelect(dealDetail.socYn);								// SOC여부
				$('#TB06020S_S002').val(dealDetail.socDcd).prop("selected", true);								// SOC구분코드
				$(":radio[name='TB06020S_frxcHdgeYn']").radioSelect(dealDetail.frxcHdgeYn);						// 외환헷지여부
				
				/** 금융조건 정보 */
				
				$('#TB06020S_rcgAmt').val(Number(handleNullData(dealDetail.apvlAmt)).toLocaleString());		    // 종목승인금액
				$('#TB06020S_I027').val(dealDetail.trCrryCd).prop("selected", true);							// 투자통화코드
				
				$(":radio[name='TB06020S_untpFndYn']").radioSelect(dealDetail.untpFndYn);						// 단위형여부
				$(":radio[name='TB06020S_pplcFndYn']").radioSelect(dealDetail.pplcFndYn);						// 사모펀드여부
				
				$('#TB06020S_dprtCd').val(dealDetail.dprtCd);													// 담당부서코드
				$('#TB06020S_dprtNm').val(dealDetail.dprtNm);													// 담당부서명
				$('#TB06020S_empNo').val(dealDetail.chrrEmpno);													// 담당자코드
				$('#TB06020S_empNm').val(dealDetail.empNm);														// 담당자명
				
				$('#TB06020S_stupDt').val(formatDate(dealDetail.stupDt));										// 설정일
				$('#TB06020S_trustEdDt').val(formatDate(dealDetail.trustEdDt));									// 신탁종료일
				$('#TB06020S_rpchPsblDt').val(formatDate(dealDetail.rpchPsblDt));								// 환매가능일
				
				$('#TB06020S_T002').val(dealDetail.thcoRlDcd).prop("selected", true);							// 당사역할구분코드
				$(":radio[name='TB06020S_sglInvYn']").radioSelect(dealDetail.sglInvYn);							// 단독투자여부
				$(":radio[name='TB06020S_mrtgStupYn']").radioSelect(dealDetail.mrtgStupYn);						// 담보제공여부
				$(":radio[name='TB06020S_sdnTrgtYn']").radioSelect(dealDetail.sdnTrgtYn);						// 셀다운대상여부
				$('#TB06020S_totIssuShqt').val(Number(handleNullData(dealDetail.totIssuShqt)).toLocaleString());// 총발행좌수
				
				if (isEmpty($('#TB06020S_res_prdtCd').val())) {
					$('#TB06020S_regPrdt').attr('disabled', false); // 값이 없으면 regPrdt 활성화
					$('#TB06020S_delPrdt').attr('disabled', true); 
				} else {
					$('#TB06020S_regPrdt').attr('disabled', false); 
					$('#TB06020S_delPrdt').attr('disabled', false); // 값이 있으면 delPrdt 활성화
				}
				
				/******  딜공통 파일첨부 추가 ******/ 

				$('#key1').val(dealDetail.dealNo+'-'+dealDetail.prdtCd);
				getFileInfo($('#key1').val(),'3');
				/******  딜공통 파일첨부 추가 ******/ 
						
			},
			error : function(request,  error ){
				/*console.log("code:"+request.status);
				console.log("message:"+request.responseText);
				console.log("error:"+error);
				*/
				Swal.fire({
					title: '안건 조회 확인',
					icon: 'error',
					text: '집합투자증권 정보등록이 가능한 안건이 아닙니다.',
					confirmButtonText: '확인',
				}).then(() => {
					resetSearchRequiment(); //초기화
				});
			}
		});/* end of ajax*/

	}

	function managePrdtCd(param) {
		
		var title = '';

		if (0 == param) {
			title = '종목정보를 등록하시겠습니까?';
		} else if (1 == param) {
			title = '종목정보를 삭제하시겠습니까?';
		}
		
		Swal.fire({
			title: title,
			//text: "대출이 실행됩니다.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '확인',
			cancelButtonText: '취소'
		}).then((result) => {
			// isConfirmed
			// isDenied
			// isDismissed
			if (result.isConfirmed) {
				prcPrdtCd('B', param);
			} else if (result.isDismissed) {
			}
		})
	}

	function prcPrdtCd(pageDcd, param) {
		
		if (param == 0) {
			regPrdtCd(pageDcd, param);
		} else if (param == 1) {
			deletePrdtCd(pageDcd, param);
		}
	}

	// 종목등록
	function regPrdtCd(pageDcd, param) {
		
		if (!checkParam()) {
			/*Swal.fire({
			title: "Deal번호를 입력해주세요.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '확인'
		})*/
			
			return false;
		}
		
		var paramData = makeParam(pageDcd, param);
		
		if( isEmpty($('#TB06020S_ibDealNo').val()) ){
			return false;
		}
		
		$.ajax({
			type: "POST",
			url: "/TB06020S/regPrdtCd",
			data: paramData,
			dataType: "json",
			
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '종목정보를 등록하였습니다.',
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {
						getDealList();
					});
				} else {
					Swal.fire({
						title: '종목정보를 등록하는데 실패하였습니다.',
						icon: 'error',
						confirmButtonText: '확인',
					});
				}
				
			}
		});/* end of ajax*/

	}

	function checkParam() {
		var option = {}
		option.title = "Error";
		option.type = "error";

		// 유효성검사
		if (isEmpty($('#TB06020S_res_prdtNm').val())) {
			option.text = "종목명을 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_E022').val())) {
			option.text = "자산분류 상품정보 대분류코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
			
		if (isEmpty($('#TB06020S_I002').val())) {
			option.text = "자산분류 상품정보 IB상품분류코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06020S_altnInvYn]:checked').val())) {
			option.text = "자산분류 대체투자여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_fndCd').val())) {
			option.text = "자산분류 펀드코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_D012').val())) {
			option.text = "자산분류 데스크코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_C006').val())) {
			option.text = "투자국가를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		/*if (isEmpty( $('input[name=TB06020S_socYn]:checked').val())) {
			option.text = "SOC여부를 선택해주세요.";
			openPopup(option);
			return false;
		} else if ($('input[name=TB06020S_socYn]:checked').val() == 'Y' && $('#TB06020S_S002').val() == '') {
			option.text = "SOC여부를 선택해주세요.";
			openPopup(option);
			return false;
		}*/
		
		if (isEmpty($('#TB06020S_rcgAmt').val())) {
			option.text = "금융조건 종목승인금액을 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_I027').val())) {
			option.text = "금융조건 통화코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('input[name=TB06020S_untpFndYn]:checked').val())) {
			option.text = "금융조건 단위형여부코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('input[name=TB06020S_pplcFndYn]:checked').val())) {
			option.text = "금융조건 사모펀드여부코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_dprtCd').val()) && isEmpty($('#TB06020S_empNo').val())) {
			option.text = "담당자 정보를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		
		if (isEmpty($('#TB06020S_T002').val())) {
			option.text = "금융조건 당사역할구분코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06020S_sglInvYn]:checked').val())) {
			option.text = "단독투자여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06020S_mrtgStupYn]:checked').val())) {
			option.text = "담보여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06020S_sdnTrgtYn]:checked').val())) {
			option.text = "셀다운대상여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		return true;
	}

	function makeParam(pageDcd) {
		
		var prgSttsCd = $('#TB06020S_I011').val();
		
		if(isEmpty(prgSttsCd)) {
			prgSttsCd = '401';
		}
		
		var paramData = {
			"pageDcd" : pageDcd
			, "prdtCd": $('#TB06020S_res_prdtCd').val()									// 상품코드
			//, "sn": ''                                          // 일련번호
			, "lastYn": 'Y'																// 최종여부
			, "prdtNm": $('#TB06020S_res_prdtNm').val()									// 상품명
			, "prdtDsc": $('#TB06020S_prdtDsc').val()									// 상품설명
			//, "rqsKndCd": rqsKndCd                              // 기업여신신청종류코드
			, "prgSttsCd": prgSttsCd													// 진행상태코드
			, "cnncPrdtCd": $('#TB06020S_cnncPrdtCd').val()								// 연결상품코드
			, "dealNo": $('#TB06020S_ibDealNo').val()									// 딜번호
			, "dealNm": $('#TB06020S_ibDealNm').val()                                  // 딜명
			//, "mtrNo": mtrNo                                    // 안건번호
			, "mtrDcd": $('#TB06020S_lstCCaseCcd').val()							// 부수안건구분코드
			//, "mtrSn": mtrSn                            // 부수안건일련번호
			, "jdgmDcd": $('#TB06020S_riskInspctCcd').val()							// 리스크심사구분코드
			, "mtrNm": $('#TB06020S_mtrNm').val()										// 안건명
			//, "locoIssMngmNo": ''                    			// loc발급관리번호
			//, "invIdtrtSmitYn": invIdtrtSmitYn                  // 투자확약서제출여부
			//, "trgYn": trgYn                                    // 트리거여부
			//, "trgCndCtns": trgCndCtns                          // 트리거조건내용
			//, "invIdtrtSmitDt": invIdtrtSmitDt                  // 투자확약서제출일자
			, "trOthrDscmNo": replaceAll($('#TB06020S_ardyBzepNo').val(), '-', '')		// 거래상대방식별번호
			//, "grupItgrCrdtGrdDcd": grupItgrCrdtGrdDcd          // 그룹통합신용등급구분코드
			, "dmsCrdtGrdDcd": $('#TB06020S_I012').val()								// 국내신용등급구분코드
			, "crdtInqDt": replaceAll($('#TB06020S_crdtInqDt').val(), '-', '')			// 신용조회일자
			, "lstYn": $('input[name=TB06020S_lstYn]:checked').val()					// 상장여부
			//, "stlnCpstDcd": ''                        			// 대주구성구분코드
			, "frsMngmBdcd": $('#TB06020S_dprtCd').val()								// 최초관리부점코드
			, "mngmBdcd": $('#TB06020S_dprtCd').val()									// 관리부점코드
			, "chrrEmpno": $('#TB06020S_empNo').val()									// 담당자사원번호
			//, "subChrrEmpno": ''                     		    // 서브담당자사원번호
			, "prdtClsfCd": $('#TB06020S_P004').val()									// 상품분류코드
			, "prdtMdclCd": $('#TB06020S_E023').val()									// 상품중분류코드
			, "prdtLclsCd": $('#TB06020S_E022').val()									// 상품대분류코드
			, "ibPrdtClsfCd": $('#TB06020S_I002').val()									// ib상품분류코드
			//, "ibPrdtIflwPathDcd": ''            				// ib상품유입경로구분코드
			, "ibPrdtPefDcd": $('#TB06020S_I004').val()                      			// ib상품pef구분코드
			, "actsCd": $('#TB06020S_actsCd').val()										// 계정과목코드
			//, "dcrbAthDcd": dcrbAthDcd                          // 기업여신전결권한구분코드
			//, "acctJobCd": acctJobCd                            // 회계업무코드
			//, "acctUnJobCd": acctUnJobCd                        // 회계단위업무코드
			//, "acctTrCd": acctTrCd                              // 회계거래코드
			, "eprzCrdlApvlAmt": replaceAll($('#TB06020S_rcgAmt').val(), ',', '') / 1			// 종목승인금액
			//, "eprzCrdlCtrtAmt": ctrtAmt                                // 기업여신계약금액
			//, "eprzCrdlInvAmt": 0.0								        // 투자금액
			//, "eprzCrdlIntrRcvnMthCd": intrRcvnMthCd                    // 기업여신이자수취방법코드
			//, "intrBnaoDcd": intrBnaoDcd                        // 이자선후취구분코드
			//, "tfdLyAplyDcd": tfdLyAplyDcd                      // 초일말일적용구분코드
			//, "intrSnnoPrcsDcd": intrSnnoPrcsDcd                // 이자단수처리구분코드
			//, "paiRdmpDcd": paiRdmpDcd                          // 원리금상환구분코드
			//, "ortnPrdtClsfCd": ortnPrdtClsfCd                  // 기업여신운용상품분류코드
			//, "intrtExpDcd": intrtExpDcd                        // 기업여신금리만기구분코드
			//, "intrtRestFrqcMnum": intrtRestFrqcMnum            // 금리재설정주기개월수
			//, "prnaRdmpFrqcMnum": prnaRdmpFrqcMnum              // 원금상환주기개월수
			//, "intrRdmpFrqcMnum": intrRdmpFrqcMnum              // 이자상환주기개월수
			//, "prnaDfrPrdMnum": prnaDfrPrdMnum                  // 원금거치기간개월수
			//, "eprzCrdlCtrtNo": ctrtNo                                  // 기업여신계약번호
			//, "ctrcPrarDt": ''		                            // 약정예정일자
			///, "ctrcPrdMnum": ($('#TB06020S_ctrcPrdMnum').val() / 1)						// 약정기간개월수
			, "ctrcPrdDcd": $('#TB06020S_ctrcPrdDcd').val()								// 약정기간구분코드
			, "sglLoanYn": $('input[name=TB06020S_sglLoanYn]:checked').val()			// 단독대출여부
			, "rgstCbndYn": $('input[name=TB06020S_rgstCbndYn]:checked').val()			// 등록사채여부
			, "apvlDt": replaceAll($('#TB06020S_apvlDt').val(), '-', '')                 // 승인일자
			, "expDt": replaceAll($('#TB06020S_expDt').val(), '-', '')					// 만기일자
			//, "edDt": edDt                                      // 종결일자
			, "stupDt": replaceAll($('#TB06020S_stupDt').val(), '-', '')				// 설정일
			, "trustEdDt": replaceAll($('#TB06020S_trustEdDt').val(), '-', '')			// 신탁종료일 
			, "isuDt": replaceAll($('#TB06020S_isuDt').val(), '-', '')					// 발행일자 
			//, "eprzCrdlCtrtEndRsnCd": ctrtEndRsnCd                      // 기업여신계약종료사유코드
			//, "eprzCrdlCtrtEndRsnCtns": ctrtEndRsnCtns                  // 기업여신계약종료사유내용
			, "trCrryCd": $('#TB06020S_I027').val()										// 거래통화코드
			, "invNtnCd": $('#TB06020S_C006').val()										// 투자국가코드
			, "ortnFndCd": $('#TB06020S_fndCd').val()								// 운용펀드코드
			, "dskCd": $('#TB06020S_D012').val()										// 데스크코드
			, "eprzCrdlIndvLmtDcd": $('#TB06020S_E010').val()									// 개별한도구분코드
			//, "ctlbCtrtShpDcd": ''                 			    // 우발채무계약형태구분코드
			//, "ctlbBssAsstDcd": ''                  			// 우발채무기초자산구분코드
			, "socYn": $('input[name=TB06020S_socYn]:checked').val()					// soc여부
			, "socDcd": $('#TB06020S_S002').val()										// soc구분코드
			, "mrtgStupYn": $('input[name=TB06020S_mrtgStupYn]:checked').val()			// 담보설정여부
			, "altnInvYn" : $('input[name="TB06020S_altnInvYn"]:checked').val()			// 대체투자여부
			//, "crdtRifcAplyYn": ''                  			// 신용보강적용여부
			, "frxcHdgeYn": $('input[name=TB06020S_frxcHdgeYn]:checked').val()   		// 외환헷지여부
			, "sppiSfcYn": $('#TB06020S_sppiSfcYn').val()								// sppi충족여부
			//, "projFnnYn": ''                            		// 프로젝트금융여부
			, "pplcFndYn": $('input[name=TB06020S_pplcFndYn]:checked').val()			// 사모펀드여부 
			, "untpFndYn": $('input[name=TB06020S_untpFndYn]:checked').val()			// 단위형펀드여부
			//, "pfLoanYn": pfLoanYn                              // pf대출여부
			//, "undwFnnYn": undwFnnYn                            // 인수금융여부
			//, "trchAplyYn": trchAplyYn                          // 트렌치적용여부
			, "rlesFnnYn": $('input[name=TB06020S_rlesFnnYn]:checked').val()			// 부동산금융여부
			, "sdnTrgtYn": $('input[name=TB06020S_sdnTrgtYn]:checked').val()			// 셀다운대상여부
			//, "etcCndtYn": etcCndtYn                            // 기타승인조건여부
			, "rlesFnnDetlDcd": $('#TB06020S_R017').val()								// 부동산금융상세구분코드
			, "holdPrpsDcd": $('#TB06020S_H002').val()									// 보유목적구분코드
			, "thcoRlDcd": $('#TB06020S_T002').val()									// 당사역할구분코드
			, "offrSrvcDcd": $('#TB06020S_O002').val()									// 제공서비스구분코드
			//, "ncrRt": 0.0                                    	// ncr율
			//, "rwaRt": 0.0                                    	// rwa율
			, "rpchPsblDt": replaceAll($('#TB06020S_rpchPsblDt').val(), '-', '')			// 환매가능일자
			//, "dispYn": ''                                  	// 매각여부
			//, "pplcCbndMpngYnDcd": ''            				// 사모사채매핑여부구분코드
			//, "etcDetSctyDcd": ''                    			// 기타채무증권구분코드
			, "invJdgmComtNo": $('#TB06020S_I008').val()								// 투자심사위원회번호
			//, "dispDtDcd": ''                            		// 매각일자구분코드
			//, "dispTlmtMnum": 0.0                      			// 매각기한개월수
			//, "dispStdrAmtDcd": ''                  			// 매각기준금액구분코드
			//, "dispRto": 0.0                               		// 매각비율
			//, "dispTlmtDt": ''            		           		// 매각기한일자
			//, "dispAmt": 0.0                               		// 매각금액
			, "rdmpClmPsblDt": replaceAll($('#TB06020S_rdmpClmPsblDt').val(), '-', '')	// 상환청구가능일자
			//, "aprnGoldStupTrgtYn": ''          				// 충당금설정대상여부
			//, "bdbtRsvsRcknStdrLclsCd": bdbtRsvsRcknStdrLclsCd  // 대손준비금산정기준대분류코드
			//, "bdbtRsvsRcknStdrMdclCd": bdbtRsvsRcknStdrMdclCd  // 대손준비금산정기준중분류코드
			//, "bdbtRsvsRcknStdrSclsCd": bdbtRsvsRcknStdrSclsCd  // 대손준비금산정기준소분류코드
			//, "bdbtRsvsRcknStdrRto": bdbtRsvsRcknStdrRto        // 대손준비금산정기준비율
			//, "thcoPtciAmt": thcoPtciAmt                        // 당사참여금액
			//, "prdtTotAmt": prdtTotAmt                          // 상품총금액
			//, "intrDnumClcMthCd": intrDnumClcMthCd              // 이자일수계산방법코드
			//, "hldyPrcsDcd": hldyPrcsDcd                        // 휴일처리구분코드
			//, "stdrIntrtKndCd": stdrIntrtKndCd                  // 기준금리종류코드
			//, "fxnIntrt": fxnIntrt                              // 고정금리
			//, "addIntrt": addIntrt                              // 가산금리
			//, "intrtCngeFrqcMnum": intrtCngeFrqcMnum            // 금리변동주기개월수
			//, "hdwtEvlAmt": hdwtEvlAmt                          // 수기평가금액
			//, "eprzCrdlWeekMrtgKndCd": weekMrtgKndCd                    // 기업여신주담보종류코드
			//, "ovduIntrRt": ovduIntrRt                          // 연체이자율
			//, "ovduIntrRtDcd": ovduIntrRtDcd                    // 연체이자율구분코드
			//, "totRdmpTmrd": totRdmpTmrd                        // 총상환회차
			//, "eqlRdmpAmt": eqlRdmpAmt                          // 균등상환금액
			//, "istmDtmRdmpAmt": istmDtmRdmpAmt                  // 할부일시상환금액
			//, "rcvbIntrAplyIrt": rcvbIntrAplyIrt                // 미수이자적용이율
			//, "intrErnAmt": intrErnAmt                          // 이자수익금액
			//, "fndsPrcrCtAmt": fndsPrcrCtAmt                    // 자금조달비용금액
			//, "intrClcEndDeDcd": intrClcEndDeDcd                // 이자계산종료일구분코드
			//, "intrHdwtClcYn": intrHdwtClcYn                    // 이자수기계산여부
			//, "grdCd": grdCd                                    // 기업여신등급코드
			//, "dshnRtGrdCd": dshnRtGrdCd                        // 기업여신부도율등급코드
			, "rgstDt": getToday().replaceAll('-', '')									// 등록일자
			//, "chngDt": '' 										// 변경일자
			// 조작상세일시 , "hndDetlDtm": ''
			//, "hndEmpno": ''                              		// 조작사원번호
			//, "hndTmnlNo": ''                            		// 조작단말기번호
			//, "hndTrId": ''                                		// 조작거래id
			//, "guid": ''                                      	// guid
			//, "earlyRepayYn": $('input[name=TB06020S_earlyRepayYn]:checked').val()		// 중도상환여부
			, "sglInvYn": $('input[name=TB06020S_sglInvYn]:checked').val()				// 단독투자여부
			, "totIssuShqt" : replaceAll($('#TB06020S_totIssuShqt').val(), ',', '') / 1 // 총발행좌수
		}
		
		return paramData;
	}

	function deletePrdtCd(pageDcd, param) {
			
		var prdtCd = $('#TB06020S_res_prdtCd').val();
		
		var option = {}
		option.title = "Error";
		option.type = "error";
		
		// 유효성검사
		if (isEmpty($('#TB06020S_res_prdtCd').val())) {
			option.text = "종목코드를 조회해주세요.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"prdtCd": prdtCd                                // 상품코드
		}

		$.ajax({
			type: "POST",
			url: "/TB06020S/deletePrdtCd",
			data: JSON.stringify(paramData),
			contentType: "application/json",
			dataType: "json",
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '종목을 삭제하였습니다.',
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {					
						if (data >0) {						
							location.reload();
						}
					});
				} else {
					Swal.fire({
						title: '종목을 삭제하는데 실패하였습니다.',
						icon: 'error',
						confirmButtonText: '확인',
					});
				}
				
			}
		});/* end of ajax*/
	}

	function showAlert() {
		Swal.fire({
			icon: 'success'
			, title: "Success!"
			, text: "부의합의 요청하였습니다."
			, confirmButtonText: "확인"
		}).then((result) => {
			//location.reload();
		});
	}

	function saveDone() {
		Swal.fire({
			icon: 'success'
			, title: "Success!"
			, text: "저장되었습니다."
			, confirmButtonText: "확인"
		}).then((result) => {
			//location.reload();
		});
	}

	function getIBIMS208BDTOInfo(prdtCd) {
		
		if (isEmpty($('#TB06020S_res_prdtCd').val())) {
			$('#TB06020S_registApvlCnd').attr('disabled', false);
		}
		
		var paramData = {
			"prdtCd" : prdtCd
		}
		
		$.ajax({
			type: "GET",
			url: "/TB06010S/getIBIMS208BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				$('#TB06020S_D007').val(data.sdwnDtDcd).prop('selected', true).change();
				$('#TB06020S_sdwnTlmtMnum').val(data.sdwnTlmtMnum);
				$('#TB06020S_sdwnTlmtDt').val(formatDate(data.sdwnTlmtDt));
				$('#TB06020S_D008').val(data.sdwnStdrAmtDcd).prop('selected', true).change();
				$('#TB06020S_sdwnRto').val(data.sdwnRto);
				$('#TB06020S_sdwnTlmtAmt').val(Number(data.sdwnTlmtAmt).toLocaleString());
				$('#TB06020S_appvCndtSn').val(data.sn);
			},
			error: function() {
				$('#TB06020S_D007').val("").prop('selected', true).change();
				$('#TB06020S_sdwnTlmtMnum').val("");
				$('#TB06020S_sdwnTlmtDt').val(formatDate(""));
				$('#TB06020S_D008').val("").prop('selected', true).change();
				$('#TB06020S_sdwnRto').val("");
				$('#TB06020S_sdwnTlmtAmt').val("");
				$('#TB06020S_appvCndtSn').val("");
			}
		});/* end of ajax*/
	}

	function saveAppvCndt() {
		var option = {}
		option.title = "Error";
		option.type = "error";

		// 유효성검사
		if (isEmpty($('#TB06020S_ibDealNo').val())) {
			option.text = "Deal정보 조회 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06020S_appvCndtSn').val())) {
			option.text = "연결된 승인조건정보가 없습니다.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"dealNo": $('#TB06020S_ibDealNo').val()                                // 딜번호
		, "sn": $('#TB06020S_appvCndtSn').val()                                  // 일련번호
		, "sdwnDtDcd": $('#TB06020S_D007').val()                           		 // 샐다운일자구분코드
		, "sdwnTlmtMnum": $('#TB06020S_sdwnTlmtMnum').val()                      // 샐다운기한개월수
		, "sdwnTlmtDt": replaceAll($('#TB06020S_sdwnTlmtDt').val(), '-', '')	 // 샐다운기한(목표)일자
		, "sdwnStdrAmtDcd": $('#TB06020S_D008').val()                  			 // 샐다운기준금액구분코드
		, "sdwnRto": $('#TB06020S_sdwnRto').val()                                // 샐다운비율
		, "sdwnTlmtAmt": replaceAll($('#TB06020S_sdwnTlmtAmt').val(), ',', '')	 // 샐다운목표금액
		, "chngDt": replaceAll(getToday(), '-', '')             				 // 변경일자
		}


		$.ajax({
			type: "POST",
			url: "/TB06020S/regIBIMS208B",
			data: paramData,
			dataType: "json",
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '승인조건정보를 저장하였습니다.',
						//text: "대출이 실행됩니다.",
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {
						//selectIBIMS208B();
					});
				} else {
					Swal.fire({
						title: '승인조건정보를 저장하는데 실패하였습니다.',
						//text: "대출이 실행됩니다.",
						icon: 'error',
						confirmButtonText: '확인',
					});
				}
				
			}
		});/* end of ajax*/

	}

	function getIBIMS212BDTOInfo(prdtCd) {
		
		if (isEmpty($('#TB06020S_res_prdtCd').val())) {
			$('#TB06020S_registMrtgCnnc').attr('disabled', false);
		} else {
			arrPqGridLstMrtgInfo.setData([]);
		}
		if(isEmpty(prdtCd)) {
			prdtCd = $('#TB06020S_res_prdtCd').val();
		}	
		var paramData = {
			"prdtCd" : prdtCd
		}
		
		$.ajax({
			type: "GET",
			url: "/TB06010S/getIBIMS212BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				if(data.length > 0) {
					arrPqGridLstMrtgInfo.setData(data);
					$("#TB06020S_mrtgMngmNo_forPop").val(data[0].mrtgMngmNo);
					$("#TB06020S_mrtgNm_forPop").val(data[0].mrtgNm);
				} else {
					arrPqGridLstMrtgInfo.setData([]);
					$("#TB06020S_mrtgMngmNo_forPop").val("");
					$("#TB06020S_mrtgNm_forPop").val("");
				}				
				/*var html = "";
				
				$('#TB06020S_lstMrtgInfo').html(html);
				
				if (data.length > 0) {
						$.each(data, function(key, value) {
							html += '<tr>';
							html += '<td class="text-right">' + handleNullData(value.mrtgMngmNo) + '</td>';
							html += '<td class="text-left">' + handleNullData(value.mrtgLclsNm) + '</td>';
							html += '<td class="text-left">' + handleNullData(value.mrtgMdclNm) + '</td>';
							html += '<td class="text-left">' + handleNullData(value.mrtgNm) + '</td>';
							html += '<td class="text-left">' + handleNullData(value.trOthrNm) + '</td>';
							html += '<td class="text-center">' + handleNullData(formatDate(value.rgstDt)) + '</td>';
							html += '<td class="text-right">' + handleNullData(comma(value.mrtgEvlAmt)) + '</td>';
							html += '</tr>';
						})
					} else {
						html += '<tr>';
						html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
						html += '</tr>';
					}
				
				$('#TB06020S_lstMrtgInfo').html(html);*/
			}
		});/* end of ajax*/
	}

	let colLstMrtgInfo = [
		{ 	
			title    : "담보번호",  
			dataType : "string", 
			dataIndx : "mrtgMngmNo", 
			halign	 : "center",
			align    : "center",
			filter   : { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title    : "담보대분류", 
			dataType : "string",
			dataIndx : "mrtgLclsNm", 
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "담보중분류", 
			dataType : "string", 
			dataIndx : "mrtgMdclNm",
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "담보명", 
			dataType : "string",
			dataIndx : "mrtgNm",
			halign	 : "center",
			align    : "left",  
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "담보거래상대방명", 
			dataType : "string", 
			dataIndx : "trOthrNm", 
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "담보설정일", 
			dataType : "string", 
			dataIndx : "rgstDt", 
			halign	 : "center",
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData.length !== 0) {
					let rgstDt1 = cellData.substring(0, 4);
					let rgstDt2 = cellData.substring(4, 6);
					let rgstDt3 = cellData.substring(6, 8);
					return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
				}
				return cellData; 
			} 
		},
		{ 	
			title    : "담보평가액", 
			dataType : "integer", 
			dataIndx : "mrtgEvlAmt", 
			halign	 : "center",
			align    : "right", 
			filter   : { crules: [{ condition: 'range' }] },
			render	 : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return addComma(cellData); 
				}
				return cellData; 
			}
		}
	];


	let colAtchFleInfo = [
		//체크박스
		{ dataIndx: "chk", maxWidth: 36, minWidth: 36, align: "center", resizable: false,
			title: "",
			menuIcon:false,
			type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
			dataType: 'bool',
			editable: 'true',
			cb: {
				all: false, 
				header: true
			}
		},
		{ 	
			title    : "처리구분", 
			dataType : "string",
			dataIndx : "", 
			halign	 : "center",
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "일련번호", 
			dataType : "string", 
			dataIndx : "atchFleSn",
			halign	 : "center",
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "전송상세일시", 
			dataType : "string",
			dataIndx : "fwdgDetlDtm",
			halign	 : "center",
			align    : "center",  
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData.length !== 0) {
					let rgstDt1 = cellData.substring(0, 4);
					let rgstDt2 = cellData.substring(4, 6);
					let rgstDt3 = cellData.substring(6, 8);
					return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
				}
				return cellData; 
			} 
		},
		{ 	
			title    : "파일구분", 
			dataType : "string", 
			dataIndx : "atchFleDcd", 
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "파일명", 
			dataType : "string", 
			dataIndx : "atchFleNm", 
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		}
	];

	// tabGrid settings
	function setLstMrtg(){
		setTimeout(() => arrPqGridLstMrtgInfo.refresh(), 1)
	}
	function setAtchFle(){
		setTimeout(() => arrPqGridAtchFleInfo.refresh(), 1)
	}

	return {
		getDealList : getDealList
		, resetSearchRequiment : resetSearchRequiment
		, managePrdtCd : managePrdtCd
		, setLstMrtg : setLstMrtg
		, setAtchFle : setAtchFle
		, getIBIMS212BDTOInfo: getIBIMS212BDTOInfo
		, ldvdCd : ldvdCd
		, mdvdCd : mdvdCd
		, sdvdCd : sdvdCd
	}
})();