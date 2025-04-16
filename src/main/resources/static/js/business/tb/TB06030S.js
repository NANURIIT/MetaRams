const TB06030Sjs = (function(){
	var ldvdCd = [];
	var mdvdCd = [];
	var sdvdCd = [];

	let arrPqGridLstMrtgInfo;		// 그리드 instance
	//let arrPqGridAtchFleInfo;		

	$(document).ready(function() {
		loadSelectBoxContents();
		radioCheckFunction();
		checkBoxChangeFunction();
		roadTabInfoGrid();
		onChangeEprzCrdlPrdtLclsCd(); // 기업여신상품대분류코드 선택이벤트
		onChangeEprzCrdlPrdtMdclCd(); // 기업여신상품중분류코드 선택이벤트
		defaultNumberFormat();
		inputNumberChangeFunction_TB06030S();
		//초기화버튼
		resetSearchRequiment_TB06030S();
		getDealInfoFromWF();
	});

	function loginUserSet(){
		let empNo  = $('#userEno').val();   
		let empNm  = $('#userEmpNm').val();
		let dprtCd = $('#userDprtCd').val();
		let dprtNm = $('#userDprtNm').val();

		$('#TB06030S_empNo').val(empNo);
		$('#TB06030S_empNm').val(empNm);
		$('#TB06030S_dprtCd').val(dprtCd);
		$('#TB06030S_dprtNm').val(dprtNm);
	}
	
	
	function defaultNumberFormat(){	
		$("input[id*='Amt'], input[id*='Mnum'], input[id*='Blce'], input[id*='Qty']").val("0");
		selectorNumberFormater(
				$("input[id*='Amt'], input[id*='Mnum'], input[id*='Blce'], input[id*='Qty']")
		);
	}
	
	function inputNumberChangeFunction_TB06030S(){
		//종목 승인금액
		$("#TB06030S_rcgAmt").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06030S_rcgAmt").val())*1)/1).toFixed(0);
			$("#TB06030S_rcgAmt").val(addComma(uncomma(formatNum)));
		});
		//총발행주수
		$("#TB06030S_totIssuQty").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06030S_totIssuQty").val())*1)/1).toFixed(0);
			$("#TB06030S_totIssuQty").val(addComma(uncomma(formatNum)));
		});
		
		//출자약정금액
		$("#TB06030S_fincCtrcAmt").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06030S_fincCtrcAmt").val())*1)/1).toFixed(0);
			$("#TB06030S_fincCtrcAmt").val(addComma(uncomma(formatNum)));
		});
		
		//출자이행금액
		$("#TB06030S_fincFlflAmt").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06030S_fincFlflAmt").val())*1)/1).toFixed(0);
			$("#TB06030S_fincFlflAmt").val(addComma(uncomma(formatNum)));
		});	
		
		//당사출자약정금액
		$("#TB06030S_thcoFincCtrcAmt").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06030S_thcoFincCtrcAmt").val())*1)/1).toFixed(0);
			$("#TB06030S_thcoFincCtrcAmt").val(addComma(uncomma(formatNum)));
		});	
				
	}
	

	// pqGrid	
	function roadTabInfoGrid() {
		let pqGridTabInfoObjs = [
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06030S_lstMrtgInfo' 	// 담보/보증정보
				, colModel: colLstMrtgInfo
			},
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06030S_atchFleInfo'	// 첨부파일
				, colModel: colAtchFleInfo
			}
		];

		setPqGrid(pqGridTabInfoObjs);
		
		arrPqGridLstMrtgInfo = $("#TB06030S_lstMrtgInfo").pqGrid('instance');
	//	arrPqGridAtchFleInfo = $("#TB06030S_atchFleInfo").pqGrid('instance');

		arrPqGridLstMrtgInfo.option("cellClick", function(event, ui) {

			rowData = ui.rowData;
			$("#TB06030S_mrtgMngmNo_forPop").val(rowData.mrtgMngmNo);
			$("#TB06030S_mrtgNm_forPop").val(rowData.mrtgNm);
			
		});
	}

	function loadSelectBoxContents() {
		
		var item = '';
		item += 'I004';					// 결의협의회구분코드
		item += '/' + 'C012';			// 신용등급코드정보
		item += '/' + 'I012';			// 신용등급코드정보
		item += '/' + 'E022';			// 기업여신상품대분류코드
		item += '/' + 'E023';			// 기업여신상품중분류코드
		item += '/' + 'P004';			// 기업여신상품소분류코드
		item += '/' + 'I002';			// 금융상품분류코드
		item += '/' + 'D012';			// 데스크코드
		item += '/' + 'C006';			// 국가코드
		item += '/' + 'I027';			// 투자통화코드
		item += '/' + 'T002';			// 당사역할구분코드
		item += '/' + 'E010';			// 한도구분
		item += '/' + 'R017';			// 부동산금융구분코드
		item += '/' + 'S002';			// SOC구분코드
		item += '/' + 'I004';			// PEF구분
		item += '/' + 'E030';			// 채무증권상태
		//item += '/' + 'I011';			// 진행상태
		item += '/' + 'D007';			// 매각일자구분코드
		item += '/' + 'D008';			// 매각기준금액구분코드
		item += '/' + 'I008';			// 결의협의회구분코드
		item += '/' + 'H002';			// 보유목적구분코드(KB)
		
		getSelectBoxList('TB06030S', item);
		getSelectBoxCode2('TB06030S','I011');
		

		
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
		$('#TB06030S_E022').on('change', function() {
			var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changeEprzCrdlPrdtMdclCd(selectedLdvdCd);
		});
	}

	function changeEprzCrdlPrdtMdclCd(selectedLdvdCd){
		var html = "";
		
		$('#TB06030S_E023').html(html);
		
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

				$('#TB06030S_E023').html(html);
				$('#TB06030S_E023').val($('#TB06030S_E023').val()).prop("selected", true).change();
			}
		}
	}

	/**
	 * 기업여신 중분류코드 이벤트 핸들러
	 */ 
	function onChangeEprzCrdlPrdtMdclCd() {
		$('#TB06030S_E023').on('change', function() {
			var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changePrdtClsfCd(selectedMdvdCd);
		});
	}

	function changePrdtClsfCd(selectedMdvdCd) {
		var html = "";

		$('#TB06030S_P004').html(html);
		
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

				$('#TB06030S_P004').html(html);
			}
		}
	}

	function radioCheckFunction() {
		$(':radio[name=TB06030S_rlesFnnYn]').on('change', function() {
			var rlesFnnYn = $('input[name=TB06030S_rlesFnnYn]:checked').val();
			if (rlesFnnYn == 'Y') {
				$('#TB06030S_R017').attr('disabled', false);
			} else {
				$("#TB06030S_R017 option:eq(0)").prop("selected", true).change();
				$('#TB06030S_R017').attr('disabled', true);
			}
		})
		
		$(':radio[name=TB06030S_socYn]').on('change', function() {
			var socYn = $('input[name=TB06030S_socYn]:checked').val();
			if (socYn == 'Y') {
				$('#TB06030S_S002').attr('disabled', false);
			} else {
				$("#TB06030S_S002 option:eq(0)").prop("selected", true).change();
				$('#TB06030S_S002').attr('disabled', true);
			}
		})
	}

	function checkBoxChangeFunction(){
		$("#TB06030S_fincYn").on('change',function(){
			console.log($("#TB06030S_fincYn").prop('checked'));

			if($("#TB06030S_fincYn").prop('checked') == true){
				//$('#TB06030S_fincDiv').css("display","block");
				if(isEmpty($('#TB06030S_res_prdtCd').val())){
					Swal.fire({
						text: '종목코드를 입력해주세요.',
						title: 'Warning!',
						icon: 'warning',
						confirmButtonText: '확인',
					});
					$("#TB06030S_fincYn").prop('checked',false);
				}
			}else{
				//$('#TB06030S_fincDiv').css("display","none");
			}
		})
	}

	function resetSearchRequiment_TB06030S() {		

		console.log("resetSearchRequiment_TB06030S 실행~~~~");
		$("#UPLOAD_FileList").html(""); // 테이블 리셋
		resetInputValue($('div[data-menuid="/TB06030S"]'));

		maskRt("#TB06030S_sdwnRto");

		$('#TB06030S_ibDealNo').val('');
		$('#TB06030S_riskInspctCcdNm').val('');
		$('#TB06030S_riskInspctCcd').val('');
		$('#TB06030S_lstCCaseCcdNm').val('');
		$('#TB06030S_lstCCaseCcd').val('');
		$('#TB06030S_ibDealNm').val('');
		$('#TB06030S_prdtCd').val('');
		$('#TB06030S_prdtNm').val('');
		$('#TB06030S_mtrNm').val('');		
		$('#TB06030S_apvlDt').val('');

		$('#TB06030S_fondDt').val('');
		$('#TB06030S_keepExprDt').val('');
		$('#TB06030S_invExprDt').val('');


		$('#TB06030S_crdtInqDt').val('');
		$('#TB06030S_isuDt').val('');
		$('#TB06030S_expDt').val('');
		$('#TB06030S_rdmpClmPsblDt').val('');
		$('#TB06030S_sdwnTlmtDt').val('');
		
		$('#TB06030S_frxcHdgeYn_N').prop('checked',true);
		$('#TB06030S_lstYn_N').prop('checked',true);
		$('#TB06030S_sglInvYn_N').prop('checked',true);
		$('#TB06030S_mrtgStupYn_N').prop('checked',true);
		$('#TB06030S_sdnTrgtYn_N').prop('checked',true);
		/*
		let inputLength = $("#page-TB06030S :input").length;
		for (let i = 0; i < inputLength; i++) {
			$("#page-TB06030S :input:eq("+i+")").val("");
			
		}*/		
		$('#TB06030S_res_prdtCd').prop('readonly',false);
		$('#TB06030S_registApvlCnd').attr('disabled', true);
		$('#TB06030S_registMrtgCnnc').attr('disabled', true);
		$('#TB06030S_regPrdt').attr('disabled', false); // 값이 없으면 regPrdt 활성화
		$('#TB06030S_delPrdt').attr('disabled', true); 
				
		loginUserSet();
		
		//$('#UPLOAD_AddFile').attr('disabled', true);
		//$('#UPLOAD_DelFiles').attr('disabled', true);
		$('#file-upload_TB06030S').attr("style","display: none");
		$('#file-upload-temp_TB06030S').attr("style", "display: block");
		
		//화면ID중복시에는 적용이 안되는듯
		var key2;
		key2="-"; //
		$('#fileKey2').val(key2);				
		$('#key1').val("TB06030S");		
		getFileInfo($('#key1').val(),key2);

		chkDecdStep('TB06030S');
	}

	function getDealList() {
		var ibDealNo = $('#TB06030S_ibDealNo').val();
		var riskInspctCcd = $('#TB06030S_riskInspctCcd').val();
		var lstCCaseCcd = $('#TB06030S_lstCCaseCcd').val();
		var prdtCd = $('#TB06030S_prdtCd').val();

		getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd);
		
		getIBIMS208BDTOInfo(prdtCd);
		getIBIMS212BDTOInfo(prdtCd);
		//getIBIMS250BDTOInfo(prdtCd);
	}

	// 결의안건정보
	function getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd) {
		var option = {}
		var trDvsn ="F"; //주식/채권		
		option.text = "";
		option.title = "Warning!"
		option.tpye = "warning"
		if (isEmpty(ibDealNo) && isEmpty(prdtCd)) {
			option.text = "Deal 정보 또는 종목코드 정보를 조회해주세요.";
			openPopup(option);
			return false;
		}

		var paramData = {
			  "dealNo" : ibDealNo
			, "mtrDcd" : lstCCaseCcd
			,"jdgmDcd" : riskInspctCcd
			, "prdtCd" : prdtCd
			, "trDvsn" : trDvsn
		}

		$.ajax({
			type: "GET",
			url: "/TB06030S/getCnfrncDealInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {

				var dealDetail = data;
				console.log("prdtCd : "+dealDetail.prdtCd);
				console.log(dealDetail);
				let psblRsltnYn; //가결여부
				psblRsltnYn= isEmpty(dealDetail.psblRsltnYn) ? "N" : dealDetail.psblRsltnYn;
				
				if(psblRsltnYn=="N"){
					Swal.fire({
						title: '안건 조회 확인',
						icon: 'warning',
						text: '심사진행상태 완료되지 않았습니다.',
						confirmButtonText: '확인',
					}).then(() => {
						resetSearchRequiment_TB06030S(); //초기화
					});
					return false;
				}
				/** Deal 정보 */
				
				$('#TB06030S_ibDealNo').val(dealDetail.dealNo);	
				$('#TB06030S_prdtCd').val(dealDetail.prdtCd);
				$('#TB06030S_res_prdtCd').val(dealDetail.prdtCd);	
				/** 종목 정보 */				
				if( isEmpty(dealDetail.prdtCd) ) {
					$('#TB06030S_res_prdtNm').val(dealDetail.mtrNm);	
					$('#TB06030S_res_prdtCd').prop('readonly',false);										// 안건명
				} else {
					$('#TB06030S_res_prdtNm').val(dealDetail.prdtNm);	
					$('#TB06030S_res_prdtCd').prop('readonly',true);										// 종목명
				}
				
				$('#TB06030S_lstCCaseCcd').val(dealDetail.mtrDcd);
				$('#TB06030S_riskInspctCcd').val(dealDetail.jdgmDcd);	
															// 딜번호
				$('#TB06030S_mtrNm').val(dealDetail.mtrNm);														// 안건명
				$('#TB06030S_apvlDt').val(formatDate(dealDetail.apvlDt));										// 승인일자(결의일자)
				$('#TB06030S_I008').val(dealDetail.cnsbDcd).prop("selected", true);								// 승인심사기구(결의협의회구분코드)
				$('#TB06030S_invJdgmComtNo').val(dealDetail.cnsbSq);											// 위원회번호(심사협의회차일련번호)
				$('#TB06030S_apvlAmt').val(Number(dealDetail.sumApvlAmt).toLocaleString());						// 승인금액
				//$(":radio[name='TB06030S_sdnCndtF']").radioSelect(dealDetail.sdnCndtF);						// 승인조건(셀다운)(셀다운조건여부)
				//$(":radio[name='TB06030S_etcCndtF']").radioSelect(dealDetail.etcCndtF);						// 승인조건(기타)(기타조건여부)
				if($('#TB06030S_sdnCndtDwn').val() == 'N') {													// 승인조건(셀다운)(셀다운조건여부)
					$('#TB06030S_sdnCndtDwn').val('N')
				} else {
				$('#TB06030S_sdnCndtDwn').val(dealDetail.sdnCndtF);
				}
				if($('#TB06030S_sdnCndtEtc').val() == 'N') {													// 승인조건(기타)(기타조건여부)
					$('#TB06030S_sdnCndtEtc').val('N')
				} else {
				$('#TB06030S_sdnCndtEtc').val(dealDetail.etcCndtF);
				}
				
	
															// 종목코드
				$('#TB06030S_I011').val(dealDetail.prgSttsCd);													// 진행상태
				
				//$('#TB06030S_ardyBzepNo').val(checkBrnAcno(dealDetail.optrRgstNo));									// 사업자등록번호
				//$('#TB06030S_ardyBzepNo').val(handleNullData(checkBrnAcno(dealDetail.trOthrDscmNo)));			// 거래상대방식별번호
				$('#TB06030S_ardyBzepNo').val(dealDetail.trOthrDscmNo);											// 거래상대방식별번호
				$('#TB06030S_bzepName').val(dealDetail.trOthrDscmNm);											// 거래상대방(업체한글명)
				$('#TB06030S_corpRgstNo').val(dealDetail.corpNo);												// 법인번호
				
				//$('#TB06030S_bzepName').val(dealDetail.entpNm);												// 거래상대방(업체한글명)
				$('#TB06030S_I012').val(dealDetail.dmsCrdtGrdDcd).prop("selected", true);						// 내부신용등급(신용등급코드)
				$('#TB06030S_crdtInqDt').val(formatDate(dealDetail.crdtInqDt));									// 신용조회일
				
				/** 자산분류 정보 */
				
				$('#TB06030S_E022').val(dealDetail.prdtLclsCd).prop("selected", true).change();					// 투자상품대분류
				$('#TB06030S_E023').val(dealDetail.prdtMdclCd).prop("selected", true).change();					// 투자상품중분류
				$('#TB06030S_P004').val(dealDetail.prdtClsfCd).prop("selected", true).change();					// 투자상품소분류
				$('#TB06030S_I002').val(dealDetail.ibPrdtClsfCd).prop("selected", true);						// 투자상품상세분류
				
				$('#TB06030S_fndCd').val(dealDetail.ortnFndCd);													// 펀드코드
				$('#TB06030S_fndNm').val(dealDetail.fndNm);														// 펀드코드명
				$('#TB06030S_D012').val(dealDetail.dskCd).prop("selected", true);								// 데스크코드
				$('#TB06030S_C006').val(dealDetail.invNtnCd).prop("selected", true);							// 투자국가코드
				$('#TB06030S_I004').val(dealDetail.ibPrdtPefDcd).prop("selected", true);						// PEF구분
				//$(":radio[name='TB06030S_frxcHdgeYn']").radioSelect(dealDetail.frxcHdgeYn);						// 외환헷지여부
				dealDetail.frxcHdgeYn =="Y" ? $("#TB06030S_frxcHdgeYn_Y").prop("checked", true) : $("#TB06030S_frxcHdgeYn_N").prop("checked", true) ; // 외환헷지여부
				
				$(":radio[name='TB06030S_altnInvYn']").radioSelect(dealDetail.altnInvYn);						// 대체투자여부
				$(":radio[name='TB06030S_rlesFnnYn']").radioSelect(dealDetail.rlesFnnYn);						// 부동산금융여부
				$('#TB06030S_R017').val(dealDetail.rlesFnnDetlDcd).prop("selected", true);						// 부동산금융구분코드
				$(":radio[name='TB06030S_socYn']").radioSelect(dealDetail.socYn);								// SOC여부
				$('#TB06030S_S002').val(dealDetail.socDcd).prop("selected", true);								// SOC구분코드
				$('#TB06030S_E030').val(dealDetail.etcDetSctyDcd).prop("selected", true);						// 채무증권구분
				$('#TB06030S_actsCd').val(dealDetail.actsCd);													// 계정과목코드
				$('#TB06030S_H002').val(dealDetail.holdPrpsDcd).prop("selected", true);							// 보유목적구분	
						
				
				
				/** 금융조건 정보 */

				$('#TB06030S_rcgAmt').val(Number(handleNullData(dealDetail.apvlAmt)).toLocaleString());			// 종목승인금액
				$('#TB06030S_I027').val(dealDetail.trCrryCd).prop("selected", true);							// 투자통화코드
				//$('#TB06030S_E010').val(dealDetail.eprzCrdlIndvLmtDcd).prop("selected", true);				// 한도구분코드
				$(":radio[name='TB06030S_lstYn']").radioSelect(dealDetail.lstYn);								// 상장여부
				dealDetail.lstYn =="Y" ? $("#TB06030S_lstYn_Y").prop("checked", true) : $("#TB06030S_lstYn_N").prop("checked", true) ; // 상장여부
				
				$('#TB06030S_dprtCd').val(dealDetail.dprtCd);													// 담당부서코드
				$('#TB06030S_dprtNm').val(dealDetail.dprtNm);													// 담당부서명
				$('#TB06030S_empNo').val(dealDetail.chrrEmpno);													// 담당자코드
				$('#TB06030S_empNm').val(dealDetail.empNm);														// 담당자명
				
				$('#TB06030S_isuDt').val(formatDate(dealDetail.isuDt));											// 발행일
				$('#TB06030S_expDt').val(formatDate(dealDetail.expDt));											// 만기일
				$('#TB06030S_rdmpClmPsblDt').val(formatDate(dealDetail.rdmpClmPsblDt));							// 상환청구가능일
				
				$('#TB06030S_T002').val(dealDetail.thcoRlDcd).prop("selected", true);							// 당사역할구분코드
				//$(":radio[name='TB06030S_sglInvYn']").radioSelect(dealDetail.sglInvYn);						// 단독투자여부
				//$(":radio[name='TB06030S_mrtgStupYn']").radioSelect(dealDetail.mrtgStupYn);					// 담보제공여부
				//$(":radio[name='TB06030S_sdnTrgtYn']").radioSelect(dealDetail.sdnTrgtYn);						// 셀다운대상여부
				
				dealDetail.sglInvYn   =="Y" ? $("#TB06030S_sglInvYn_Y").prop("checked", true)   : $("#TB06030S_sglInvYn_N").prop("checked", true) ; // 단독투자여부
				dealDetail.mrtgStupYn =="Y" ? $("#TB06030S_mrtgStupYn_Y").prop("checked", true) : $("#TB06030S_mrtgStupYn_N").prop("checked", true) ; // 담보제공여부
				dealDetail.sdnTrgtYn  =="Y" ? $("#TB06030S_sdnTrgtYn_Y").prop("checked", true)  : $("#TB06030S_sdnTrgtYn_N").prop("checked", true) ; // 셀다운대상여부
				
				$('#TB06030S_cnnc_prdtCd').val(dealDetail.cnncPrdtCd);											// 연결종목코드
				$('#TB06030S_totIssuQty').val(Number(handleNullData(dealDetail.totIssuStkQnt)).toLocaleString());// 총발행주수
				
				if (isEmpty($('#TB06030S_res_prdtCd').val())) {
					$('#TB06030S_regPrdt').attr('disabled', false); // 값이 없으면 regPrdt 활성화
					$('#TB06030S_delPrdt').attr('disabled', true); 
					$('#TB06030S_res_prdtCd').prop('readonly',false);
					$('#TB06030S_registApvlCnd').attr('disabled', true);
					$('#TB06030S_registMrtgCnnc').attr('disabled', true);
					//$('#UPLOAD_AddFile').attr('disabled', true);
					//$('#UPLOAD_DelFiles').attr('disabled', true);
					$('#file-upload_TB06030S').attr("style","display: none");
					$('#file-upload-temp_TB06030S').attr("style", "display: block");
				} else {
					$('#TB06030S_regPrdt').attr('disabled', false); 
					$('#TB06030S_delPrdt').attr('disabled', false); // 값이 있으면 delPrdt 활성화
					$('#TB06030S_res_prdtCd').prop('readonly',true);
					$('#TB06030S_registApvlCnd').attr('disabled', false);
					$('#TB06030S_registMrtgCnnc').attr('disabled', false);
					//$('#UPLOAD_AddFile').attr('disabled', false);
					//$('#UPLOAD_DelFiles').attr('disabled', false);
					$('#file-upload_TB06030S').attr("style","display: block");
					$('#file-upload-temp_TB06030S').attr("style", "display: none");
				}
				
				/** 출자정보 */
				if(dealDetail.fincYn != null){ //출자정보가 조회되었다면
					console.log("fincYn : "+dealDetail.fincYn);
					//$('#TB06030S_fincDiv').css("display","block");
					$("#TB06030S_fincYn").prop("checked", true);

					
				}else{
					$("#TB06030S_fincYn").prop("checked", false);
					//$('#TB06030S_fincDiv').css("display","none");
				}

				$("#TB06030S_fondDt").val(formatDate(dealDetail.estDt));
				$("#TB06030S_keepExprDt").val(formatDate(dealDetail.keepExprDt));
				$("#TB06030S_invExprDt").val(formatDate(dealDetail.invExprDt));
				if(dealDetail.fincChrDcd != null){
					$('#TB06030S_fincChrDcd').val(dealDetail.fincChrDcd);
				}else{
					$('#TB06030S_fincChrDcd').val(0);
				}
				$('#TB06030S_fincCtrcAmt').val(Number(handleNullData(dealDetail.fincCtrcAmt)).toLocaleString());
				$('#TB06030S_thcoFincAmt').val(Number(handleNullData(dealDetail.thcoFincAmt)).toLocaleString());
				$('#TB06030S_fincFlflAmt').val(Number(handleNullData(dealDetail.fincFlflAmt)).toLocaleString());
				$('#TB06030S_nowFincBlce').val(Number(handleNullData(dealDetail.nowFincBlce)).toLocaleString());
				$('#TB06030S_thcoFincCtrcAmt').val(Number(handleNullData(dealDetail.thcoFincCtrcAmt)).toLocaleString());
				$('#TB06030S_mngmPayBlce').val(Number(handleNullData(dealDetail.mngmPayBlce)).toLocaleString());
				$('#TB06030S_fincQotaRt').val(Number(handleNullData(dealDetail.fincQotaRt)).toLocaleString());
				$('#TB06030S_stdrErnRt').val(Number(handleNullData(dealDetail.stdrErnRt)).toLocaleString());
				$('#TB06030S_mngmPayRt').val(Number(handleNullData(dealDetail.mngmPayRt)).toLocaleString());
				$('#TB06030S_fincEdycNo').val(Number(handleNullData(dealDetail.fincEdycNo)).toLocaleString());

				if(dealDetail.rptTrgtYn == "Y"){
					$("#TB06030S_rptTrgtYn").prop("checked", true);
				}else{
					$("#TB06030S_rptTrgtYn").prop("checked", false);
				}
				if(dealDetail.aflTrgtYn == "Y"){
					$("#TB06030S_aflTrgtYn").prop("checked", true);
				}else{
					$("#TB06030S_aflTrgtYn").prop("checked", false);
				}
				if(dealDetail.dpndCmpYn == "Y"){
					$("#TB06030S_dpndCmpYn").prop("checked", true);
				}else{
					$("#TB06030S_dpndCmpYn").prop("checked", false);
				}

				/******  딜공통 파일첨부 추가 ******/ 
				//$('#key1').val(dealDetail.dealNo+'-'+dealDetail.prdtCd);
				//getFileInfo($('#key1').val(),'3');
				/******  딜공통 파일첨부 추가 ******/ 
				
				/******  딜공통 파일첨부 추가 ******/ 
				//fileKey2
				var key2;
				key2=dealDetail.dealNo+"-"+ dealDetail.prdtCd;
				$('#fileKey2').val(key2);				
				$('#key1').val("TB06030S");
				getFileInfo($('#key1').val(),key2);				
				/******  딜공통 파일첨부 추가 ******/ 

				// 결재상태확인
				chkDecdStep('TB06030S');

			},
			error : function(request,  error ){
				/*console.log("code:"+request.status);
				console.log("message:"+request.responseText);
				console.log("error:"+error);
				*/
				Swal.fire({
					title: '안건 조회 확인',
					icon: 'error',
					text: '주식/채권 정보등록이 가능한 안건이 아닙니다.',
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
				prcPrdtCd('C', param);
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
			return false;
		}
		
		var paramData = makeParam(pageDcd, param);
		
		if( isEmpty($('#TB06030S_ibDealNo').val()) || isEmpty($('#TB06030S_res_prdtCd').val())  ){
			return false;
		}
		
		
		$.ajax({
			type: "POST",
			url: "/TB06030S/regPrdtCd",
			data: JSON.stringify(paramData),
			dataType: "json ",
			contentType: "application/json; charset=UTF-8",
			success: function(data) {

				if (data > 0) {
					Swal.fire({
								title: '종목정보를 등록하였습니다.',
								icon: 'success',
								confirmButtonText: '확인',
							}).then((result) => {
								if($("#TB06030S_fincYn").prop("checked") == true){
									registFinc(param);
								}else{
									if (result.isConfirmed) {
										getDealList();
									}
								}
							});
				} else if(data == -1) {
					Swal.fire({
							title: '종목등록 에러',
							icon: 'error',
							text : '동일한 종목코드가 존재합니다. 종목코드를 확인해주세요',
							confirmButtonText: '확인',
							}).then((result) => {
									if (result.isConfirmed) {
										$('#TB06030S_res_prdtCd').focus();
									}	
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

	function registFinc(param) {
		
		console.log("출자정보 등록 시도1");
		if (!checkParam()) {
			return false;
		}
		
		var paramData = makeFincParam();
		
		if (isEmpty($('#TB06030S_ibDealNm').val())) {
			option.text = "Deal번호를 검색해주세요";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_res_prdtCd').val())) {
			option.text = "종목코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
	
				
		
		if( isEmpty($('#TB06030S_ibDealNo').val()) ){
			return false;
		}
		if( isEmpty($('#TB06030S_res_prdtCd').val()) ){
			/* Swal.fire({
				title: '종목코드를 입력해주세요.',
				icon: 'error',
				confirmButtonText: '확인',
			}) */
			return false;
		}
		
		
		console.log("출자정보 등록 시도2");
		$.ajax({
			type: "POST",
			url: "/TB06030S/registFinc",
			data: JSON.stringify(paramData),
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: function(data) {

				console.log("출자정보 등록 성공");
				getDealList();
			}
		});/* end of ajax*/

	}

	function checkParam() {
		var option = {}
		option.title = "Warning!";
		option.type = "warning";
		
		// 유효성검사
		if (isEmpty($('#TB06030S_ibDealNm').val())) {
			option.text = "Deal번호를 검색해주세요";
			openPopup(option);
			return false;
		}

		if (isEmpty($('#TB06030S_res_prdtNm').val())) {
			option.text = "종목명을 입력해주세요.";
			openPopup(option);
			return false;
		}
		

		if (isEmpty($('#TB06030S_res_prdtCd').val())) {
			option.text = "종목코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (!isEmpty($('#TB06030S_res_prdtCd').val())) {
				let regExp = new RegExp(/^[A-Z0-9]+$/);
				var firStr = $('#TB06030S_res_prdtCd').val().substr(0,1);
				var prdtLen = $('#TB06030S_res_prdtCd').val().length;
				if(!regExp.test($('#TB06030S_res_prdtCd').val())){
					option.text = "종목코드 입력시 영문대문자, 숫자만 허용합니다.";
					openPopup(option);
					return false;
				}
				
				if(firStr=="A"){
					option.text = "종목번호가 'A'로 시작할수 없습니다.";
					openPopup(option);
					return false;
				}
				
				if(prdtLen!=10){
					option.text = "종목코드를 10자리로 입력해주세요.";
					openPopup(option);
					return false;
				}
			}
		
		if (isEmpty($('#TB06030S_E022').val())) {
			option.text = "자산분류 상품정보 대분류코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
			
		if (isEmpty($('#TB06030S_I002').val())) {
			option.text = "자산분류 상품정보 IB상품분류코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_fndCd').val())) {
			option.text = "자산분류 펀드코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_D012').val())) {
			option.text = "자산분류 데스크코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_C006').val())) {
			option.text = "투자국가를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_H002').val())) {
			option.text = "자산분류 보유목적구분코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		/*if (isEmpty( $('input[name=TB06030S_altnInvYn]:checked').val())) {
			option.text = "자산분류 대체투자여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06030S_rlesFnnYn]:checked').val())) {
			option.text = "부동산금융여부를 선택해주세요.";
			openPopup(option);
			return false;
		} else if ($('input[name=TB06030S_rlesFnnYn]:checked').val() == 'Y' && $('#TB06030S_R017').val() == '') {
			option.text = "부동산금융여부를 선택해주세요.";
			openPopup(option);
			return false;
		}*/
		
		/*if (isEmpty( $('input[name=TB06030S_socYn]:checked').val())) {
			option.text = "SOC여부를 선택해주세요.";
			openPopup(option);
			return false;
		} else if ($('input[name=TB06030S_socYn]:checked').val() == 'Y' && $('#TB06030S_S002').val() == '') {
			option.text = "SOC여부를 선택해주세요.";
			openPopup(option);
			return false;
		}*/
		
		if (isEmpty($('#TB06030S_rcgAmt').val())) {
			option.text = "금융조건 종목승인금액을 입력해주세요.";
			openPopup(option);
			return false;
		}else{
			if($('#TB06030S_rcgAmt').val()<=0){
				option.text = "금융조건 종목승인금액을 입력해주세요.";
				openPopup(option);
				return false;	
			}
		}

		if (isEmpty($('#TB06030S_I027').val())) {
			option.text = "금융조건 통화코드를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		/*if (isEmpty($('#TB06030S_E010').val())) {
			option.text = "금융조건 한도구분코드를 입력해주세요.";
			openPopup(option);
			return false;
		}*/
		
		if (isEmpty( $('input[name=TB06030S_lstYn]:checked').val())) {
			option.text = "금융조건 상장여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_dprtCd').val()) && isEmpty($('#TB06030S_empNo').val())) {
			option.text = "담당자 정보를 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_T002').val())) {
			option.text = "금융조건 당사역할구분코드를 입력해주세요.";
			openPopup(option);
			return false;
		}

		if (isEmpty( $('input[name=TB06030S_sglInvYn]:checked').val())) {
			option.text = "단독투자여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06030S_mrtgStupYn]:checked').val())) {
			option.text = "담보여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty( $('input[name=TB06030S_sdnTrgtYn]:checked').val())) {
			option.text = "셀다운대상여부를 선택해주세요.";
			openPopup(option);
			return false;
		}
		

		if (isEmpty($('#TB06030S_totIssuQty').val())) {
			option.text = "금융조건 총 발행주수를 입력해주세요.";
			openPopup(option);
			return false;
		}else{
			if($('#TB06030S_totIssuQty').val()<=0){
				option.text = "금융조건 총 발행주수를 입력해주세요.";
				openPopup(option);
				return false;	
			}
		}


		
		return true;
	}

	function makeParam(pageDcd) {
		
		var prgSttsCd = $('#TB06030S_I011').val();
		
		if(isEmpty(prgSttsCd)) {
			prgSttsCd = '401';
		}
		
		var paramData = {
			"pageDcd" : pageDcd
			, "prdtCd": $('#TB06030S_res_prdtCd').val()									// 상품코드
			, "regDvsn" : ($('#TB06030S_res_prdtCd').attr("readonly")=="readonly") ? "U" : "I" // U:수정, I:등록			
			, "lastYn": 'Y'																// 최종여부
			, "prdtNm": $('#TB06030S_res_prdtNm').val()									// 상품명
			, "prdtDsc": $('#TB06030S_prdtDsc').val()									// 상품설명
			, "prgSttsCd": prgSttsCd													// 진행상태코드
			, "cnncPrdtCd": $('#TB06030S_cnnc_prdtCd').val()							// 연결상품코드
			, "dealNo": $('#TB06030S_ibDealNo').val()									// 딜번호
			, "dealNm": $('#TB06030S_ibDealNm').val()                                   // 딜명
			, "mtrDcd": $('#TB06030S_lstCCaseCcd').val()								// 부수안건구분코드
			, "jdgmDcd": $('#TB06030S_riskInspctCcd').val()								// 리스크심사구분코드
			, "mtrNm": $('#TB06030S_mtrNm').val()										// 안건명
			, "trOthrDscmNo": replaceAll($('#TB06030S_ardyBzepNo').val(), '-', '')		// 거래상대방식별번호
			, "dmsCrdtGrdDcd": $('#TB06030S_I012').val()								// 국내신용등급구분코드
			, "crdtInqDt": replaceAll($('#TB06030S_crdtInqDt').val(), '-', '')			// 신용조회일자
			
			
			//자산분류
			, "prdtClsfCd": $('#TB06030S_P004').val()									// 상품분류코드
			, "prdtMdclCd": $('#TB06030S_E023').val()									// 상품중분류코드
			, "prdtLclsCd": $('#TB06030S_E022').val()									// 상품대분류코드
			, "ibPrdtClsfCd": $('#TB06030S_I002').val()									// ib상품분류코드
			, "ibPrdtPefDcd": $('#TB06030S_I004').val()                      			// ib상품pef구분코드
			, "actsCd": $('#TB06030S_actsCd').val()										// 계정과목코드
			, "holdPrpsDcd": $('#TB06030S_H002').val()									// 보유목적구분코드
			, "invNtnCd": $('#TB06030S_C006').val()										// 투자국가코드
			, "ortnFndCd": $('#TB06030S_fndCd').val()									// 운용펀드코드
			, "dskCd": $('#TB06030S_D012').val()										// 데스크코드
			, "socYn": $('input[name=TB06030S_socYn]:checked').val()					// soc여부
			, "socDcd": $('#TB06030S_S002').val()										// soc구분코드
			, "altnInvYn" : $('input[name="TB06030S_altnInvYn"]:checked').val()			// 대체투자여부
//			, "frxcHdgeYn": $('input[name=TB06030S_frxcHdgeYn]:checked').val() 			// 외환헷지여부
			, "frxcHdgeYn": $("#TB06030S_frxcHdgeYn_Y").is(":checked") ? "Y" :"N" 		// 외환헷지여부	
			
			// 금융조건
			, "eprzCrdlApvlAmt": replaceAll($('#TB06030S_rcgAmt').val(), ',', '') / 1	// 종목승인금액
//			, "lstYn": $('input[name=TB06030S_lstYn]:checked').val()					// 상장여부
			, "lstYn": $("#TB06020S_lstYn_Y").is(":checked") ? "Y" :"N" 				// 상장여부
			, "frsMngmBdcd": $('#TB06030S_dprtCd').val()								// 최초관리부점코드
			, "mngmBdcd": $('#TB06030S_dprtCd').val()									// 관리부점코드
			, "chrrEmpno": $('#TB06030S_empNo').val()									// 담당자사원번호
			, "ctrcPrdDcd": $('#TB06030S_ctrcPrdDcd').val()								// 약정기간구분코드
			, "sglLoanYn": $('input[name=TB06030S_sglLoanYn]:checked').val()			// 단독대출여부
			, "rgstCbndYn": $('input[name=TB06030S_rgstCbndYn]:checked').val()			// 등록사채여부
			, "apvlDt": replaceAll($('#TB06030S_apvlDt').val(), '-', '')                // 승인일자
			, "expDt": replaceAll($('#TB06030S_expDt').val(), '-', '')					// 만기일자
			, "stupDt": replaceAll($('#TB06030S_stupDt').val(), '-', '')				// 설정일
			, "trustEdDt": replaceAll($('#TB06030S_trustEdDt').val(), '-', '')			// 신탁종료일 
			, "isuDt": replaceAll($('#TB06030S_isuDt').val(), '-', '')					// 발행일자 
			, "trCrryCd": $('#TB06030S_I027').val()										// 거래통화코드
//			, "mrtgStupYn": $('input[name=TB06030S_mrtgStupYn]:checked').val()			// 담보설정여부
			, "sppiSfcYn": $('#TB06030S_sppiSfcYn').val()								// sppi충족여부
			, "pplcFndYn": $('input[name=TB06030S_pplcFndYn]:checked').val()			// 사모펀드여부 
			, "untpFndYn": $('input[name=TB06030S_untpFndYn]:checked').val()			// 단위형펀드여부
			, "rlesFnnYn": $('input[name=TB06030S_rlesFnnYn]:checked').val()			// 부동산금융여부
//			, "sdnTrgtYn": $('input[name=TB06030S_sdnTrgtYn]:checked').val()			// 셀다운대상여부
//			, "sglInvYn": $('input[name=TB06030S_sglInvYn]:checked').val()				// 단독투자여부
			, "sglInvYn"  : $("#TB06030S_sglInvYn_Y").is(":checked") ? "Y" : "N"		// 단독투자여부
			, "mrtgStupYn": $("#TB06030S_mrtgStupYn_Y").is(":checked") ? "Y" : "N"		// 담보설정여부
			, "sdnTrgtYn" : $("#TB06030S_sdnTrgtYn_Y").is(":checked") ? "Y" : "N"		// 셀다운대상여부
			
			, "rlesFnnDetlDcd": $('#TB06030S_R017').val()								// 부동산금융상세구분코드
			, "holdPrpsDcd": $('#TB06030S_H002').val()									// 보유목적구분코드
			, "thcoRlDcd": $('#TB06030S_T002').val()									// 당사역할구분코드
			, "offrSrvcDcd": $('#TB06030S_O002').val()									// 제공서비스구분코드
			, "rpchPsblDt": replaceAll($('#TB06030S_rpchPsblDt').val(), '-', '')		// 환매가능일자
			, "invJdgmComtNo": $('#TB06030S_I008').val()								// 투자심사위원회번호
			, "rdmpClmPsblDt": replaceAll($('#TB06030S_rdmpClmPsblDt').val(), '-', '')	// 상환청구가능일자
			, "rgstDt": getToday().replaceAll('-', '')									// 등록일자

			, "totIssuStkQnt" : replaceAll($('#TB06030S_totIssuQty').val(), ',', '') / 1			// 총발행주수

			//출자정보 관련 데이터 추가
		}
		
		return paramData;
	}

	function makeFincParam() {
		
		var prgSttsCd = $('#TB06030S_I011').val();
		var rptTrgtYn = "N";
		var aflTrgtYn = "N";
		var dpndCmpYn = "N";

		if(isEmpty(prgSttsCd)) {
			prgSttsCd = '401';
		}


		if($("#TB06030S_rptTrgtYn").prop("checked") == true){
			rptTrgtYn = "Y";
		}
		if($("#TB06030S_aflTrgtYn").prop("checked") == true){
			aflTrgtYn = "Y";
		}
		if($("#TB06030S_dpndCmpYn").prop("checked") == true){
			dpndCmpYn = "Y";
		}
		
		var paramData = {
			"prdtCd": $('#TB06030S_res_prdtCd').val()									// 상품코드
			, "dcmNo" : null
			, "jobExcuMbdy" : null
			, "realMngmBdcd" : null
			, "realMngmEmpno" : null
			, "estDt" : replaceAll($('#TB06030S_fondDt').val(), '-', '')
			, "keepExprDt" : replaceAll($('#TB06030S_keepExprDt').val(), '-', '')
			, "invExprDt" : replaceAll($('#TB06030S_invExprDt').val(), '-', '')
			, "fincCtrcAmt" : replaceAll($('#TB06030S_fincCtrcAmt').val(), ',', '')
			, "fincFlflAmt" : replaceAll($('#TB06030S_fincFlflAmt').val(), ',', '')
			, "thcoFincCtrcAmt" : replaceAll($('#TB06030S_thcoFincCtrcAmt').val(), ',', '')
			, "thcoFincAmt" : replaceAll($('#TB06030S_thcoFincAmt').val(), ',', '')
			, "nowFincBlce" : replaceAll($('#TB06030S_nowFincBlce').val(), ',', '')
			, "mngmPayBlce" : replaceAll($('#TB06030S_mngmPayBlce').val(), ',', '')
			, "ernDstrAmt" : null
			, "fincQotaRt" : null
			, "stdrErnRt" : replaceAll($('#TB06030S_stdrErnRt').val(), ',', '')
			, "mngmPayRt" : replaceAll($('#TB06030S_mngmPayRt').val(), ',', '')
			, "fincChrDcd" : $('#TB06030S_fincChrDcd').val()
			, "fincEdycNo" : $('#TB06030S_fincEdycNo').val()
			, "rptTrgtYn" : rptTrgtYn
			, "aflTrgtYn" : aflTrgtYn
			, "dpndCmpYn" : dpndCmpYn
			, "demgYn" : null
			, "demgLssdCmlAmt" : null
			, "demgBfFincBlce" : null
			, "stlaSttmNo" : null
			, "acqAmt" : null
			, "crryCd" : $('#TB06030S_I027').val()
			, "stdrExrt" : null
			, "frcrFincBlce" : null
			, "frcrMngmPayBlce" : null
			, "curdDstrAmt" : null
			, "frcrFrsAcqAmt" : null
			, "frcrFincCtrcAmt" : null
			, "frcrFincFlflAmt" : null
			, "frcrThcoFincCtrcAmt" : null
			, "frcrThcoFincAmt" : null
			, "frsTrDt" : null
			, "prfmPayBlce" : null
			, "prcrPrfmPayBlce" : null
			, "hndDetlDtm" : null
			, "hndEmpno" : null
			, "hndTmnlNo" : null
			, "hndTrId" : null
			, "guid" : null
			}
				
		return paramData;
	}

	function deletePrdtCd(pageDcd, param) {
		var prdtCd = $('#TB06030S_res_prdtCd').val();
		
		var option = {}
		option.title = "Warning!";
		option.type = "warning";
		
		// 유효성검사
		if (isEmpty($('#TB06030S_res_prdtCd').val())) {
			option.text = "종목코드를 조회해주세요.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"prdtCd": prdtCd                                // 상품코드
		}

		$.ajax({
			type: "POST",
			url: "/TB06030S/deletePrdtCd",
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
		
		if (isEmpty($('#TB06030S_res_prdtCd').val())) {
			$('#TB06030S_registApvlCnd').attr('disabled', false);
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
				$('#TB06030S_D007').val(data.sdwnDtDcd).prop('selected', true).change();
				$('#TB06030S_sdwnTlmtMnum').val(Number(data.sdwnTlmtMnum).toLocaleString());
				$('#TB06030S_sdwnTlmtDt').val(formatDate(data.sdwnTlmtDt));
				$('#TB06030S_D008').val(data.sdwnStdrAmtDcd).prop('selected', true).change();
				$('#TB06030S_sdwnRto').val(data.sdwnRto);
				$('#TB06030S_sdwnTlmtAmt').val(Number(data.sdwnTlmtAmt).toLocaleString());
				$('#TB06030S_appvCndtSn').val(data.sn);
			},
			error: function() {
				$('#TB06030S_D007').val("").prop('selected', true).change();
				$('#TB06030S_sdwnTlmtMnum').val("");
				$('#TB06030S_sdwnTlmtDt').val(formatDate(""));
				$('#TB06030S_D008').val("").prop('selected', true).change();
				$('#TB06030S_sdwnRto').val("");
				$('#TB06030S_sdwnTlmtAmt').val("");
				$('#TB06030S_appvCndtSn').val("");
			}
		});/* end of ajax*/
	}

	function saveAppvCndt() {
		var option = {}
		option.title = "Warning!";
		option.type = "warning";

		// 유효성검사
		if (isEmpty($('#TB06030S_ibDealNo').val())) {
			option.text = "Deal정보 조회 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06030S_appvCndtSn').val())) {
			option.text = "연결된 승인조건정보가 없습니다.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"dealNo": $('#TB06030S_ibDealNo').val()                                // 딜번호
		, "sn": $('#TB06030S_appvCndtSn').val()                                  // 일련번호
		, "sdwnDtDcd": $('#TB06030S_D007').val()                           		 // 샐다운일자구분코드
		, "sdwnTlmtMnum": $('#TB06030S_sdwnTlmtMnum').val()                      // 샐다운기한개월수
		, "sdwnTlmtDt": replaceAll($('#TB06030S_sdwnTlmtDt').val(), '-', '')	 // 샐다운기한(목표)일자
		, "sdwnStdrAmtDcd": $('#TB06030S_D008').val()                  			 // 샐다운기준금액구분코드
		, "sdwnRto": $('#TB06030S_sdwnRto').val()                                // 샐다운비율
		, "sdwnTlmtAmt": replaceAll($('#TB06030S_sdwnTlmtAmt').val(), ',', '')	 // 샐다운목표금액
		, "chngDt": replaceAll(getToday(), '-', '')             				 // 변경일자
		}


		$.ajax({
			type: "POST",
			url: "/TB06030S/regIBIMS208B",
			data: paramData,
			dataType: "json",
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '승인조건정보를 저장하였습니다.',
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {
						//selectIBIMS208B();
					});
				} else {
					Swal.fire({
						title: '승인조건정보를 저장하는데 실패하였습니다.',
						icon: 'error',
						confirmButtonText: '확인',
					});
				}
				
			}
		});/* end of ajax*/

	}

	function getIBIMS212BDTOInfo(prdtCd) {
		
		if (isEmpty($('#TB06030S_res_prdtCd').val())) {
			$('#TB06030S_registMrtgCnnc').attr('disabled', false);
		} else {
			arrPqGridLstMrtgInfo.setData([]);
		}
		if(isEmpty(prdtCd)) {
			prdtCd = $('#TB06030S_res_prdtCd').val();
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
					$("#TB06030S_mrtgMngmNo_forPop").val(data[0].mrtgMngmNo);
					$("#TB06030S_mrtgNm_forPop").val(data[0].mrtgNm);
				} else {
					arrPqGridLstMrtgInfo.setData([]);
					$("#TB06030S_mrtgMngmNo_forPop").val("");
					$("#TB06030S_mrtgNm_forPop").val("");
				}			
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
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "담보중분류", 
			dataType : "string", 
			dataIndx : "mrtgMdclNm",
			halign	 : "center",
			align    : "center", 
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
		//setTimeout(() => arrPqGridAtchFleInfo.refresh(), 1)
	}

	function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF") || sessionStorage.getItem("isFromApvl")){
			console.log("WF세션 있음");
			var dealNo = sessionStorage.getItem("wfDealNo");
			var dealNm = sessionStorage.getItem("wfDealNm");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB06030S_ibDealNo").val(dealNo);
			$("#TB06030S_ibDealNm").val(dealNm);
			$("#TB06030S_prdtCd").val(prdtCd);
			$("#TB06030S_prdtNm").val(prdtNm);
			getDealList();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

	return{
		getDealList : getDealList
		, resetSearchRequiment_TB06030S : resetSearchRequiment_TB06030S
		, inputNumberChangeFunction_TB06030S:inputNumberChangeFunction_TB06030S
		, managePrdtCd : managePrdtCd
		, setLstMrtg : setLstMrtg
		, setAtchFle : setAtchFle
		, getIBIMS208BDTOInfo: getIBIMS208BDTOInfo
		, getIBIMS212BDTOInfo: getIBIMS212BDTOInfo
		, ldvdCd : ldvdCd
		, mdvdCd : mdvdCd
		, sdvdCd : sdvdCd
		, loadSelectBoxContents : loadSelectBoxContents
		, radioCheckFunction : radioCheckFunction
		, roadTabInfoGrid : roadTabInfoGrid
		, onChangeEprzCrdlPrdtLclsCd : onChangeEprzCrdlPrdtLclsCd
		, onChangeEprzCrdlPrdtMdclCd : onChangeEprzCrdlPrdtMdclCd
		, defaultNumberFormat: defaultNumberFormat
		, getDealInfoFromWF : getDealInfoFromWF
	}
})();