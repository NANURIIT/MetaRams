const TB06010Sjs = (function(){
	var ldvdCd = [];
	var mdvdCd = [];
	var sdvdCd = [];

	let I041;		     	 		// 성격 코드
	let I042;		     	 		// 형태 코드

	let arrPqGridItrRelrInfo;		// 그리드 instance
	let arrPqGridLstMrtgInfo;		
	let arrPqGridAtchFleInfo;	
	let arrPqGridAssetInfo;	

	let rowIndx;
	var MMBRCount = 0;

	$(document).ready(function() {
		selectBox = getSelectBoxList('TB06010S', 'I041/I042', false);
		$('#expId').hide();
		I041 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === 'I041';
		});
		I042 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === 'I042';
		});
		assetAmt();
		loadSelectBoxContents();
		radioCheckFunction();
		onChangeEprzCrdlPrdtLclsCd(); // 기업여신상품대분류코드 선택이벤트
		onChangeEprzCrdlPrdtMdclCd(); // 기업여신상품중분류코드 선택이벤트
		pqGrid();

		$('#TB06010S_E022').on('change', function() {
			// alert($('#TB06010S_E022').val());
			var prdtLclsCd = $('#TB06010S_E022').val(); //투자상품 대분류 코드

			if (prdtLclsCd === "92") {

				//alert("수수료");
				$('#TB06010S_tabs1Btn').attr('disabled', true);
				$('#registApvlCnd').attr('disabled', true);
				$('#registMrtgCnnc').attr('disabled', true);
				$('#TB06010S_tabs4Btn').attr('disabled', true);
				$('#TB06010S_tabs5Rst').attr('disabled', true);
				$('#TB06010S_tabs5Dlt').attr('disabled', true);
				$('#TB06010S_tabs5Save').attr('disabled', true);

			} else {
				//alert("수수료아님");
				$('#TB06010S_tabs1Btn').attr('disabled', false);
				$('#registApvlCnd').attr('disabled', false);
				$('#registMrtgCnnc').attr('disabled', false);
				$('#TB06010S_tabs4Btn').attr('disabled', false);
				$('#TB06010S_tabs5Rst').attr('disabled', false);
				$('#TB06010S_tabs5Dlt').attr('disabled', false);
				$('#TB06010S_tabs5Save').attr('disabled', false);

			}
		});

		resetSearchRequiment();
		
		getDealInfoFromWF();

	});


	function loginUserSet(){
		let empNo  = $('#userEno').val();   
		let empNm  = $('#userEmpNm').val();
		let dprtCd = $('#userDprtCd').val();
		let dprtNm = $('#userDprtNm').val();

		$('#TB06010S_empNo').val(empNo);
		$('#TB06010S_empNm').val(empNm);
		$('#TB06010S_dprtCd').val(dprtCd);
		$('#TB06010S_dprtNm').val(dprtNm);
		
	}

	var option = {}
		option.title = "Warning!";
		option.type = "warning";
		
	function pqGrid() {
		
		let colItrRelrInfo = [
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
			title    : "일련번호", 
			dataType : "integer",
			dataIndx : "trOthrSn",
			halign	 : "center", 
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{
			title	: "거래상대방식별번호",
			dataType: "string",
			dataIndx: "trOthrDscmNo",
			halign	: "center",
			align	: "center",
			//editable: true,
			filter  : { crules: [{ condition: 'range' }] },
		},
		{
			title	: "",
			dataType: "string",
			dataIndx: "",
			halign	: "center",
			align	: "center",
			width   : "1%",
			render: function (ui) {
					let rowData = ui.rowData;
					return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('grid_TB06010S', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
				}
		},
		{ 	
			title    : "거래상대방명", 
			dataType : "string",
			dataIndx : "trOthrNm",
			halign	 : "center",
			align    : "left",  
			//editable: true,
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title: "성격",
			dataType: "string",
			dataIndx: "itrRelrChrCd",
			halign: "center",
			align: "left",
			editable: true,
			filter   : { crules: [{ condition: 'range' }] },
			editor   : {
				type      : "select",
				valueIndx : "cdValue",
				labelIndx : "cdName",
				options   : I041
			},
			render   : function(ui) {
				let itrRelrChrCd = I041.find(({ cdValue }) => cdValue == ui.cellData );
				return itrRelrChrCd ? itrRelrChrCd.cdName : ui.cellData;
			}
		},
		{ 	
			title    : "형태", 
			dataType : "string", 
			dataIndx : "itrRelrShpCd",
			halign	 : "center",
			align    : "left", 
			editable: true,
			filter   : { crules: [{ condition: 'range' }] },
			editor   : {
				type      : "select",
				valueIndx : "cdValue",
				labelIndx : "cdName",
				options   : I042
			},
			render   : function(ui) {
				let itrRelrShpCd = I042.find(({ cdValue }) => cdValue == ui.cellData );
				return itrRelrShpCd ? itrRelrShpCd.cdName : ui.cellData;
			}
		},
	];

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
			render   : function(ui){
				//var cellData = ui.cellData;
				var sn = ui.rowIndx;
				/*if(cellData){
				}*/
				
				return sn;
			}
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
		},
		{ 	
			title    : "다운로드", 
			dataType : "string", 
			dataIndx : "", 
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		}
	];

	let colAssetInfo = [
		{ 	
			title    : "기초자산종류코드", 
			dataType : "string", 
			dataIndx : "bssAsstKndCdNm", 
			halign	 : "center",
			align    : "left",
			filter   : { crules: [{ condition: 'range' }] } ,
		},
		{ 	
			title    : "기초자산종류코드", 
			dataType : "string", 
			dataIndx : "bssAsstKndCd",
			align    : "center",
			filter   : { crules: [{ condition: 'range' }] },
			hidden   : true
		},
		{ 	
			title    : "기초자산내용", 
			dataType : "string",
			dataIndx : "bscAstsCnts",
			halign	 : "center", 
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "실명확인번호", 
			dataType : "string",
			dataIndx : "rnmCnfmNo",
			halign	 : "center", 
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return checkBrnAcno(cellData); 
				}
				return cellData; 
			}
		},
		{ 	
			title    : "기초자산발행법인등록번호", 
			dataType : "string", 
			dataIndx : "bssAsstIsuCrno",
			halign	 : "center",
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return checkBrnAcno(cellData); 
				}
				return cellData; 
			}
		},
		{ 	
			title    : "법인명", 
			dataType : "string", 
			dataIndx : "crpNm",
			halign	 : "center",
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "invstCrryCd", 
			dataType : "string",
			dataIndx : "invstCrryCd",
			align    : "center",  
			filter   : { crules: [{ condition: 'range' }] },
			hidden   : true
		},
		{ 	
			title    : "투자통화코드", 
			dataType : "string", 
			dataIndx : "invstCrryCdNm",
			halign	 : "center", 
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "기초자산평가액(통화금액)", 
			dataType : "integer", 
			dataIndx : "crryAmt",
			halign   : "center", 
			align	 : "right",
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return addComma(cellData); 
				}
				return cellData; 
			}
		},
		{ 	
			title    : "환율", 
			dataType : "stirng", 
			dataIndx : "aplcExchR", 
			halign   : "center", 
			align	 : "right",
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "시가평가금액", 
			dataType : "integer", 
			dataIndx : "crevAmt", 
			halign   : "center", 
			align	 : "right",
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return addComma(cellData); 
				}
				return cellData; 
			}
		},
		{ 	
			title    : "일련번호", 
			dataType : "integer", 
			dataIndx : "sn",
			halign	 : "center", 
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			hidden   : true
		},
	];

	// pqGrid	
		let pqGridTabInfoObjs = [
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06010S_itrRelrInfo'
				, numberCell: { show: false }
				, colModel: colItrRelrInfo 		// 이해관계자
			},
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06010S_lstMrtgInfo' 	// 담보/보증정보
				, colModel: colLstMrtgInfo
			},
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06010S_atchFleInfo'	// 첨부파일
				, colModel: colAtchFleInfo
			},
			{
				height: 120
				, maxHeight: 120
				, id: 'TB06010S_assetInfo'		// (보증)기초자산
				, colModel: colAssetInfo
			}
		];

		setPqGrid(pqGridTabInfoObjs);
		
		arrPqGridItrRelrInfo = $("#TB06010S_itrRelrInfo").pqGrid('instance');
		arrPqGridLstMrtgInfo = $("#TB06010S_lstMrtgInfo").pqGrid('instance');
		arrPqGridAtchFleInfo = $("#TB06010S_atchFleInfo").pqGrid('instance');
		arrPqGridAssetInfo 	 = $("#TB06010S_assetInfo").pqGrid('instance');


		//20240725 add (popup 값 전달용)
		arrPqGridLstMrtgInfo.option("cellClick", function(event, ui) {

			rowData = ui.rowData;

			$("#TB06010S_mrtgMngmNo_forPop").val(rowData.mrtgMngmNo);
			$("#TB06010S_mrtgNm_forPop").val(rowData.mrtgNm);
			
	});
	}

	function resetSearchRequiment() {
		

		resetInputValue($('div[data-menuid="/TB06010S"]'));

		maskRt("#TB06010S_fxnIntrt, #TB06010S_addIntrt, #TB06010S_ovduIntrRt");

		$('#TB06010S_ibDealNo').val('');
		$('#TB06010S_riskInspctCcdNm').val('');
		$('#TB06010S_riskInspctCcd').val('');
		$('#TB06010S_lstCCaseCcdNm').val('');
		$('#TB06010S_lstCCaseCcd').val('');
		$('#TB06010S_ibDealNm').val('');
		$('#TB06010S_mtrNm').val('');
		$('#TB06010S_prdtCd').val('');
		$('#TB06010S_prdtNm').val('');
		$('#TB06010S_regPrdt').attr('disabled', false); // 값이 없으면 regPrdt 활성화
		$('#TB06010S_delPrdt').attr('disabled', true); 

		$('div[data-menuid="/TB06010S"] #UPLOAD_AddFile').attr("disabled", true);
		$('div[data-menuid="/TB06010S"] #UPLOAD_DelFiles').attr("disabled", true);
		loginUserSet();
		// setKRKRW('TB06010S');
		chkDecdStep('TB06010S');
	}

	function loadSelectBoxContents() {
		
		var item = '';
		item += 'I008';					// 결의협의회구분코드
		item += '/' + 'I012';			// 신용등급코드정보
		item += '/' + 'C012';			// 신용등급코드정보
		item += '/' + 'E022';			// 기업여신상품대분류코드
		item += '/' + 'E023';			// 기업여신상품중분류코드
		item += '/' + 'P004';			// 기업여신상품소분류코드
		item += '/' + 'I002';			// IB금융상품분류코드
		item += '/' + 'D012';			// 데스크코드
		item += '/' + 'C006';			// 국가코드
		item += '/' + 'H002';			// 보유목적구분코드(KB)
		item += '/' + 'I027';			// 투자통화코드
		item += '/' + 'E010';			// 한도구분
		item += '/' + 'T002';			// 당사역할구분코드
		item += '/' + 'E020';			// 상환구분코드
		item += '/' + 'B006';			// 기준금리종류코드
		item += '/' + 'S003';			// 변동금리기준금리
		item += '/' + 'E019';			// 연체이자율구분코드
		item += '/' + 'E011';			// 선후취구분코드
		item += '/' + 'E013';			// 이자일수계산방법
		item += '/' + 'E024';			// 초일말일적용구분코드
		item += '/' + 'E015';			// 이자단수처리구분코드
		item += '/' + 'H001';			// 휴일처리구분코드
		item += '/' + 'I016';			// 이자계산종료일구분코드
		item += '/' + 'O002';			// 제공서비스구분코드
		item += '/' + 'R017';			// 부동산금융구분코드
		item += '/' + 'S002';			// SOC구분코드
		item += '/' + 'I011';			// 진행상태
		item += '/' + 'D007';			// 매각일자구분코드
		item += '/' + 'D008';			// 매각기준금액구분코드
		item += '/' + 'B010';			// 기초자산종류코드
		item += '/' + 'I027';			// 투자통화코드
		item += '/' + 'I041';			// 이해관계자성격코드
		item += '/' + 'I042';			// 이해관계자형태코드
		item += '/' + 'I019';			// 이자단수법구분
		item += '/' + 'R023';			// 신청종류코드
		item += '/' + 'A005';			// 계정과목코드
		
		
		getSelectBoxList('TB06010S', item);
		
		var item = '';
		item += 'I008';					// 결의협의회구분코드
		item += '/' + 'D007';			// 매각일자구분코드
		item += '/' + 'D008';			// 매각기준금액구분코드
		item += '/' + 'I027';			// 투자통화코드
		
		getSelectBoxList('TB06012P', item);
		
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
		
		getSelectBoxList('TB06013P', item);
		
		var item = '';
		item += 'B019';					// 기업규모구분
		item += '/' + 'O006';			// 외부신용등급구분코드
		item += '/' + 'I020';			// 투자금융관리사업코드
		item += '/' + 'I021';			// 사업상세구분코드
		item += '/' + 'I006';			// 업종분류코드
		
		getSelectBoxList('TB06014P', item);
		
		onChangeSelectBoxMrtgKndCd();
	}

	function changeExpDt() {
		
		var selectedValue = $('#TB06010S_R023 option:selected').val(); // 선택된 대분류 코드 가져오기

		if((selectedValue == "03")||(selectedValue =="31")) {
			$('#expId').show();
		} else {
			$('#expId').hide();
		}
			
	}
	/**
	 * 기업여신 대분류코드 이벤트 핸들러
	 */
	function onChangeEprzCrdlPrdtLclsCd() {
		$('#TB06010S_E022').on('change', function() {
			var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changeEprzCrdlPrdtMdclCd(selectedLdvdCd);
		});
	}

	function changeEprzCrdlPrdtMdclCd(selectedLdvdCd){
		var html = "";
		
		$('#TB06010S_E023').html(html);
		
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

				$('#TB06010S_E023').html(html);
				$('#TB06010S_E023').val($('#TB06010S_E023').val()).prop("selected", true).change();
			}
		}
	}

	/**
	 * 기업여신 중분류코드 이벤트 핸들러
	 */ 
	function onChangeEprzCrdlPrdtMdclCd() {
		$('#TB06010S_E023').on('change', function() {
			var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
			changePrdtClsfCd(selectedMdvdCd);
		});
	}

	function changePrdtClsfCd(selectedMdvdCd) {
		var html = "";

		$('#TB06010S_P004').html(html);
		
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

				$('#TB06010S_P004').html(html);
			}
		}
	}

	function radioCheckFunction() {
		$(':radio[name=TB06010S_rlesFnnYn]').on('change', function() {
			var rlesFnnYn = $('input[name=TB06010S_rlesFnnYn]:checked').val();
			if (rlesFnnYn == 'Y') {
				$('#TB06010S_R017').attr('disabled', false);
			} else {
				$("#TB06010S_R017 option:eq(0)").prop("selected", true).change();
				$('#TB06010S_R017').attr('disabled', true);
			}
		})
		
		$(':radio[name=TB06010S_socYn]').on('change', function() {
			var socYn = $('input[name=TB06010S_socYn]:checked').val();
			if (socYn == 'Y') {
				$('#TB06010S_S002').attr('disabled', false);
			} else {
				$("#TB06010S_S002 option:eq(0)").prop("selected", true).change();
				$('#TB06010S_S002').attr('disabled', true);
			}
		})
	}

	function getDealList() {
		var ibDealNo = $('#TB06010S_ibDealNo').val();
		var riskInspctCcd = $('#TB06010S_riskInspctCcd').val();
		var lstCCaseCcd = $('#TB06010S_lstCCaseCcd').val();
		var prdtCd = $('#TB06010S_prdtCd').val();

		getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd);
		getIBIMS202BDTOInfo(prdtCd);
		getIBIMS208BDTOInfo(prdtCd);
		getIBIMS212BDTOInfo(prdtCd);
		getIBIMS220BDTOInfo(prdtCd);
		getAssetInfo(prdtCd);

	}

	// 결의안건정보
	function getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd) {

		var trDvsn ="S"; //대출/채무보증

		if (isEmpty(ibDealNo) && isEmpty(prdtCd)) {
			option.text = "Deal 정보 또는 종목코드 정보를 조회해주세요.";
			openPopup(option);
			return false;
		}


		var paramData = {
			"dealNo" : ibDealNo,
			"mtrDcd" : lstCCaseCcd,
			"jdgmDcd" : riskInspctCcd,
			"prdtCd" : prdtCd
			, "trDvsn"  : trDvsn
		}

		$.ajax({
			type: "GET",
			url: "/TB06010S/getCnfrncDealInfo",
			data: paramData,
			dataType: "json",
			error : function(request,  error ){
				Swal.fire({
					title: '안건 조회 확인',
					icon: 'error',
					text: '대출채권/채무보증 정보등록이 가능한 안건이 아닙니다.',
					confirmButtonText: '확인',
				}).then(() => {
				   resetSearchRequiment(); //초기화
				});
			},
			success: function(data) {
				var dealDetail = data;
				let psblRsltnYn; //가결여부
				psblRsltnYn= isEmpty(dealDetail.psblRsltnYn) ? "N" : dealDetail.psblRsltnYn;
				
				if(psblRsltnYn=="N"){
					Swal.fire({
						title: '안건 조회 확인',
						icon: 'warning',
						text: '심사진행상태 완료되지 않았습니다.',
						confirmButtonText: '확인',
					}).then(() => {
						resetSearchRequiment(); //초기화
					});
					return false;
				}
				/** Deal 정보 */
				$('#TB06010S_ibDealNo').val(dealDetail.dealNo);													// 딜번호
				//$('#TB06010S_ibDealNm').val(dealDetail.dealNm);												// 딜명
				$('#TB06010S_prdtCd').val(dealDetail.prdtCd);													// 종목코드
				$('#TB06010S_prdtNm').val(dealDetail.prdtNm);													// 종목명
				$('#TB06010S_mtrNm').val(dealDetail.mtrNm);														// 안건명
				$('#TB06010S_apvlDt').val(formatDate(dealDetail.apvlDt));										// 승인일자(결의일자)
				$('#TB06010S_I008').val(dealDetail.cnsbDcd).prop("selected", true);								// 승인심사기구(결의협의회구분코드)
				$('#TB06010S_invJdgmComtNo').val(dealDetail.cnsbSq);											// 위원회번호(심사협의회차일련번호)
				$('#TB06010S_apvlAmt').val(Number(dealDetail.sumApvlAmt).toLocaleString());						// 승인금액
				/*$(":radio[name='TB06010S_sdnCndtF']").radioSelect(dealDetail.sdnCndtF);						// 승인조건(셀다운)(셀다운조건여부)
				$(":radio[name='TB06010S_etcCndtF']").radioSelect(dealDetail.etcCndtF);							// 승인조건(기타)(기타조건여부)*/
				if($('#TB06010S_sdnCndtDwn').val() == 'N') {													// 승인조건(셀다운)(셀다운조건여부)
					$('#TB06010S_sdnCndtDwn').val('N')
				} else {
				$('#TB06010S_sdnCndtDwn').val(dealDetail.sdnCndtF);
				}
				if($('#TB06010S_sdnCndtEtc').val() == 'N') {													// 승인조건(기타)(기타조건여부)*
					$('#TB06010S_sdnCndtEtc').val('N')
				} else {
				$('#TB06010S_sdnCndtEtc').val(dealDetail.etcCndtF);
				}
				//alert(dealDetail.rqsKndCd);

				$('#TB06010S_R023').val(dealDetail.rqsKndCd).prop("selected", true);	                       // 신청종류
				
				/** 종목 정보 */
				
				if( isEmpty($('#TB06010S_prdtCd').val()) ) {
					$('#TB06010S_res_prdtNm').val(dealDetail.mtrNm);											// 안건명
				} else {
					$('#TB06010S_res_prdtNm').val(dealDetail.prdtNm);											// 종목명
				}
				$('#TB06010S_prdtDsc').val(dealDetail.prdtDsc);													// 종목설명
				$('#TB06010S_res_prdtCd').val(dealDetail.prdtCd);												// 종목코드

				//alert(dealDetail.prgSttsCd);
				$('#TB06010S_I011').val(dealDetail.prgSttsCd);													// 진행상태
				
				//$('#TB06010S_bsnsRgstNo').val(checkBrnAcno(dealDetail.optrRgstNo));							// 사업자등록번호
				$('#TB06010S_ardyBzepNo').val(handleNullData(checkBrnAcno(dealDetail.trOthrDscmNo)));			// 거래상대방식별번호
				$('#TB06010S_bzepName').val(dealDetail.trOthrDscmNm);											// 거래상대방명
				$('#TB06010S_corpRgstNo').val(dealDetail.corpNo);												// 법인번호
				
				//$('#TB06010S_ardyBzepNo').val(dealDetail.trOthrDscmNo);										// 거래상대방
				$('#TB06010S_bzepName').val(dealDetail.trOthrDscmNm);											// 거래상대방(업체한글명)
				$('#TB06010S_I012').val(dealDetail.dmsCrdtGrdDcd).prop("selected", true);						// 내부신용등급(신용등급코드)
				$('#TB06010S_crdtInqDt').val(formatDate(dealDetail.crdtInqDt));									// 신용조회일
				
				/** 자산분류 정보 */
				
				$('#TB06010S_E022').val(dealDetail.prdtLclsCd).prop("selected", true).change();					// 투자상품대분류
				$('#TB06010S_E023').val(dealDetail.prdtMdclCd).prop("selected", true).change();					// 투자상품중분류
				$('#TB06010S_P004').val(dealDetail.prdtClsfCd).prop("selected", true).change();					// 투자상품소분류
				$('#TB06010S_I002').val(dealDetail.ibPrdtClsfCd).prop("selected", true);						// 투자상품상세분류
				$(":radio[name='TB06010S_altnInvYn']").radioSelect(dealDetail.altnInvYn);						// 대체투자여부
				$('#TB06010S_fndCd').val(dealDetail.ortnFndCd);													// 운용펀드코드
				$('#TB06010S_fndNm').val(dealDetail.fndNm);														// 운용펀드코드명
				$('#TB06010S_D012').val(dealDetail.dskCd).prop("selected", true);								// 데스크코드
				$('#TB06010S_C006').val(dealDetail.invNtnCd).prop("selected", true);							// 투자국가코드
				$(":radio[name='TB06010S_rlesFnnYn']").radioSelect(dealDetail.rlesFnnYn);						// 부동산금융여부
				$('#TB06010S_R017').val(dealDetail.rlesFnnDetlDcd).prop("selected", true);						// 부동산금융구분코드
				
				$(":radio[name='TB06010S_socYn']").radioSelect(dealDetail.socYn);								// SOC여부
				$('#TB06010S_S002').val(dealDetail.socDcd).prop("selected", true);								// SOC구분코드
				$('#TB06010S_H002').val(dealDetail.holdPrpsDcd).prop("selected", true);							// 보유목적구분
				$("#TB06010S_sppiSfcYn").val(dealDetail.sppiSfcYn).prop("selected", true);						// SPPI만족여부
				
				$('#TB06010S_O002').val(dealDetail.offrSrvcDcd).prop("selected", true);							// 제공용역구분코드
				//$('#TB06010S_actsCd').val(dealDetail.actsCd);													// 계정과목코드
				$('#TB06010S_A005').val(dealDetail.actsCd);														// 계정과목코드
				$(":radio[name='TB06010S_rgstCbndYn']").radioSelect(dealDetail.rgstCbndYn);						// 등록사채여부
				
				/** 금융조건 정보 */

				$('#TB06010S_rcgAmt').val(Number(handleNullData(dealDetail.apvlAmt)).toLocaleString());			// 종목승인금액
				$('#TB06010S_I027').val(dealDetail.trCrryCd).prop("selected", true);							// 투자통화코드
				$('#TB06010S_E010').val(dealDetail.eprzCrdlIndvLmtDcd).prop("selected", true);							// 한도구분코드
				$('#TB06010S_ctrcPrdDcd').val(dealDetail.ctrcPrdDcd).prop("selected", true);					// 약정기간구분코드
				$('#TB06010S_ctrcPrdMnum').val(dealDetail.ctrcPrdMnum);											// 약정기간
				
				$('#TB06010S_T002').val(dealDetail.thcoRlDcd).prop("selected", true);							// 당사역할구분코드
				
				$(":radio[name='TB06010S_sglLoanYn']").radioSelect(dealDetail.sglLoanYn);						// 단독대출여부
				$(":radio[name='TB06010S_mrtgStupYn']").radioSelect(dealDetail.mrtgStupYn);						// 담보제공여부
				$(":radio[name='TB06010S_sdnTrgtYn']").radioSelect(dealDetail.sdnTrgtYn);						// 셀다운대상여부
				
				$('#TB06010S_cnnc_prdtCd').val(dealDetail.cnncPrdtCd);											// 연결종목코드

				if(isEmpty(dealDetail.chrrEmpno)){
					loginUserSet();
				}else{
					$('#TB06010S_dprtCd').val(dealDetail.dprtCd);													// 담당부서코드
					$('#TB06010S_dprtNm').val(dealDetail.dprtNm);													// 담당부서명
					$('#TB06010S_empNo').val(dealDetail.chrrEmpno);													// 담당자코드
					$('#TB06010S_empNm').val(dealDetail.empNm);														// 담당자명
				}

				
				
				if (isEmpty($('#TB06010S_res_prdtCd').val())) {
					$('#TB06010S_regPrdt').attr('disabled', false); // 값이 없으면 regPrdt 활성화
					$('#TB06010S_delPrdt').attr('disabled', true); 
				} else {
					$('#TB06010S_delPrdt').attr('disabled', false); // 값이 있으면 delPrdt 활성화
					$('#TB06010S_regPrdt').attr('disabled', false); 

					/******  딜공통 파일첨부 추가 ******/ 
					// $('#key1').val(ibDealNo+'-'+prdtCd);

					$('#fileKey2').val(dealDetail.prdtCd);
								
					
					getFileInfo($('#key1').val(), $('#fileKey2').val());
					/******  딜공통 파일첨부 추가 ******/ 

					$('div[data-menuid="/TB06010S"] #UPLOAD_AddFile').attr("disabled", false);
					$('div[data-menuid="/TB06010S"] #UPLOAD_DelFiles').attr("disabled", false);
				}
				chkDecdStep("TB06010S");
			}
		});/* end of ajax*/
			
	}
			



	// 상환/금리정보 조회
	function getIBIMS202BDTOInfo(prdtCd) {
		
		var paramData = {
			"prdtCd" : prdtCd
		}

		$.ajax({
			type: "GET",
			url: "/TB06010S/selectIBIMS202BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var repayInterestInfo = data;
				
				$('#TB06010S_E020').val(repayInterestInfo.paiRdmpDcd).prop("selected", true);							// 기업여신원리금상환구분코드
				$('#TB06010S_prnaRdmpFrqcMnum').val(repayInterestInfo.prnaRdmpFrqcMnum);								// 원금상환주기개월수
				$('#TB06010S_prnaDfrPrdMnum').val(repayInterestInfo.prnaDfrPrdMnum);									// 원금거치기간개월수
				$('#TB06010S_istmDtmRdmpAmt').val(Number(handleNullData(repayInterestInfo.istmDtmRdmpAmt)).toLocaleString());	// 만기상환금액(할부일시상환금액)
				
				if('Y' == repayInterestInfo.mdwyRdmpYn){
					$("input:radio[name = 'TB06010S_mdwyRdmpYn']:input[value='Y']").attr("checked", true);				// 중도상환여부
				}else {
					$("input:radio[name = 'TB06010S_mdwyRdmpYn']:input[value='N']").attr("checked", true);				// 중도상환여부
				}
				
				//최초이자수령일자, 여부 확인
				
				/*if('Y' == repayInterestInfo.intrHdwtClcYn){
					$("input:radio[name = 'TB06010S_intrHdwtClcYn']:input[value='Y']").attr("checked", true);			// 이자수기계산여부
				}else {
					$("input:radio[name = 'TB06010S_intrHdwtClcYn']:input[value='N']").attr("checked", true);			// 이자수기계산여부
				}*/ 
				
				$('#TB06010S_fxnIntrt').val(repayInterestInfo.fxnIntrt)														// 고정금리
				$('#TB06010S_S003').val(repayInterestInfo.aictStdrIntrtKndCd).prop("selected", true);					// 변동금리기준금리종류코드(올인코스트기준금리종류코드)
				$('#TB06010S_aictAddIntrt').val(repayInterestInfo.addIntrt);											// 변동금리가산금리(올인코스트가산금리)
				$('#TB06010S_addIntrt').val(repayInterestInfo.addIntrt)													// 가산금리
				$('#TB06010S_intrCngeFrqcMnum').val(repayInterestInfo.intrtCngeFrqcMnum)									// 금리변동주기개월수
				$('#TB06010S_E019').val(repayInterestInfo.ovduIntrRtDcd).prop("selected", true);						// 연체이자율구분코드(기업여신연체이자율구분코드)
				$('#TB06010S_ovduIntrRt').val(repayInterestInfo.ovduIntrRt)												// 연체이자율
				$('#TB06010S_intrRdmpFrqcMnum').val(repayInterestInfo.intrRdmpFrqcMnum)									// 이자상환주기
				$('#TB06010S_E011').val(repayInterestInfo.intrBnaoDcd).prop("selected", true);							// 이자선후취구분코드(기업여신이자선후취구분코드)
				$('#TB06010S_E013').val(repayInterestInfo.intrDnumClcMthCd).prop("selected", true);						// 이자일수계산방법코드(기업여신이자일수계산방법코드)
				$('#TB06010S_E024').val(repayInterestInfo.tfdLyAplyDcd).prop("selected", true);							// 이자초일말일적용(기업여신초일말일적용구분코드)
				$('#TB06010S_I019').val(repayInterestInfo.intrSnnoPrcsDcd).prop("selected", true);						// 이자단수법구분(기업여신이자단수처리구분코드)
				$('#TB06010S_H001').val(repayInterestInfo.hldyPrcsDcd).prop("selected", true);							// 이자휴일처리구분(기업여신휴일처리구분코드)
				$('#TB06010S_I016').val(repayInterestInfo.intrClcEndDeDcd).prop("selected", true);						// 이자계산종료일구분(기업여신이자계산종료일구분코드)
			}
			
		});/* end of ajax*/
	}

	// 상환/금리정보 저장
	function registIBIMS202BDTOInfo() {
		
		var prdtCd = $('#TB06010S_res_prdtCd').val();

		if (isEmpty(prdtCd)) {
			
			Swal.fire({
				icon: 'warning'
				, title: "Warning!"
				, text: '종목코드 정보가 없습니다.'
				, confirmButtonText: "확인"
			}).then((result) => {
				//location.reload();
			});
		
			return false;
		}
		
		var paramData = {
			"prdtCd" : prdtCd
			, "paiRdmpDcd" : $('#TB06010S_E020').val()															// 기업여신원리금상환구분코드
			, "prnaRdmpFrqcMnum" : $('#TB06010S_prnaRdmpFrqcMnum').val()										// 원금상환주기개월수
			, "prnaDfrPrdMnum" : $('#TB06010S_prnaDfrPrdMnum').val()											// 원금거치기간개월수
			, "istmDtmRdmpAmt" : replaceAll($('#TB06010S_istmDtmRdmpAmt').val(), ',', '') / 1					// 만기상환금액(할부일시상환금액)
			, "mdwyRdmpYn" : $('input[name=TB06010S_mdwyRdmpYn]:checked').val()									// 중도상환여부
			
			//최초이자수령일자, 여부 확인
			, "intrHdwtClcYn" : $('input[name=TB06010S_intrHdwtClcYn]:checked').val()							// 이자수기계산여부
			, "fxnIntrt" : $('#TB06010S_fxnIntrt').val()																// 고정금리
			, "aictStdrIntrtKndCd" : $('#TB06010S_S003').val()													// 변동금리기준금리종류코드(올인코스트기준금리종류코드)
			, "stdrIntrtKndCd" : $('#TB06010S_S003').val()														// 기준금리종류코드
			, "aictAddIntrt" : $('#TB06010S_addIntrt').val()													// 변동금리기준금리(올인코스트가산금리)
			, "addIntrt" : $('#TB06010S_addIntrt').val()														// 가산금리
			, "intrtCngeFrqcMnum" : $('#TB06010S_intrCngeFrqcMnum').val()										// 금리변동주기개월수
			, "intrCngeFrqcMnum": $('#TB06010S_intrCngeFrqcMnum').val()											// 금리변동주기개월수
			, "ovduIntrRtDcd" : $('#TB06010S_E019').val()														// 연체이자율구분코드(기업여신연체이자율구분코드)
			, "ovduIntrRt" : $('#TB06010S_ovduIntrRt').val()													// 연체이자율
			, "intrRdmpFrqcMnum" : $('#TB06010S_intrRdmpFrqcMnum').val()										// 이자상환주기
			, "intrBnaoDcd" : $('#TB06010S_E011').val()															// 이자선후취구분코드(기업여신이자선후취구분코드)
			, "intrDnumClcMthCd" : $('#TB06010S_E013').val()													// 이자일수계산방법코드(기업여신이자일수계산방법코드)
			, "tfdLyAplyDcd" : $('#TB06010S_E024').val()														// 이자초일말일적용(기업여신초일말일적용구분코드)
			, "intrSnnoPrcsDcd" : $('#TB06010S_I019').val()														// 이자단수법구분(기업여신이자단수처리구분코드)
			, "hldyPrcsDcd" : $('#TB06010S_H001').val()															// 이자휴일처리구분(기업여신휴일처리구분코드)
			, "intrClcEndDeDcd" : $('#TB06010S_I016').val()														// 이자계산종료일구분(기업여신이자계산종료일구분코드)
			, "rqsKndCd": $('#TB06010S_R023').val()                                     						// 신청종류
		}
		
		$.ajax({
			type: "POST",
			url: "/TB06010S/registIBIMS202BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "상환구분/금리정보를 저장완료하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					if(isNotEmpty($('#TB06010S_res_prdtCd').val())) {
						getIBIMS202BDTOInfo($('#TB06010S_res_prdtCd').val());
						//$('#TB06010S_R023').val("01").prop("selected", true); // 신청종류
					}
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
				prcPrdtCd('A', param);
			} else if (result.isDismissed) {
				
			} else {
				
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

	function regPrdtCd(pageDcd, param) {
		
		if (!checkParam()) {
			return false;
		}
		
		var paramData = makeParam(pageDcd, param);

		if( isEmpty($('#TB06010S_ibDealNo').val()) ){
			return false;
		}
		
		$.ajax({
			type: "POST",
			url: "/TB06010S/regPrdtCd",
			data: paramData,
			dataType: "json",
			
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '종목정보를 등록하였습니다.',
						//text: "대출이 실행됩니다.",
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {
						getDealList();
					});
				} else {
					Swal.fire({
						text: '종목정보를 등록하는데 실패하였습니다.',
						title: "Warning!",
						icon: 'warning',
						confirmButtonText: '확인',
					});
				}
				
			}
		});/* end of ajax*/
	}

	function deletePrdtCd(pageDcd, param) {
		
		var prdtCd = $('#TB06010S_res_prdtCd').val();
		
		var option = {}
		option.title = "Warning!";
		option.type = "warning";
		
		// 유효성검사
		if (isEmpty($('#TB06010S_res_prdtCd').val())) {
			option.text = "종목코드를 조회해주세요.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"prdtCd": prdtCd                                // 상품코드
		}

		$.ajax({
			type: "POST",
			url: "/TB06010S/deletePrdtCd",
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

	function setData_itrRelrInfo(bzepName, ardyBzepNo){
		
		var bzepName = bzepName
		var ardyBzepNo = ardyBzepNo
		$("#TB06010S_itrRelrInfo").pqGrid("updateRow", {
		rowIndx: rowIndx,
		newRow: {
			'chk'   			: false,
			'trOthrSn'    		: "1", 
			'trOthrDscmNo'  	: ardyBzepNo,
			'trOthrNm'   		: bzepName,
			'itrRelrChrNm' 	: "",
			'itrRelrShpNm'		: ""
		}
	});
	
	$("#TB06010S_itrRelrInfo").pqGrid("refreshDataAndView");

	}

	function checkParam() {
		var option = {}
		option.title = "Warning!";
		option.type = "warning";

		// 유효성검사
		if (isEmpty($('#TB06010S_res_prdtNm').val())) {
			option.text = "종목명을 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06010S_R023').val())) {
			option.text = "신청종류를 선택해주세요.";
			openPopup(option);
			return false;
		}
			
		if (isEmpty($('#TB06010S_ardyBzepNo').val())) {
			option.text = "거래상대방을 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06010S_E022').val())) {
			option.text = "자산분류 상품정보 대분류코드를 입력해주세요.";
			openPopup(option);
			return false;
		}

		// 수수료 전용이 아닐경우만 체크함
		if ($('#TB06010S_E022').val() != 92) {
			if (isEmpty($('#TB06010S_I002').val())) {
				option.text = "자산분류 상품정보 IB상품분류코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_altnInvYn]:checked').val())) {
				option.text = "자산분류 대체투자여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_fndCd').val())) {
				option.text = "자산분류 펀드코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_D012').val())) {
				option.text = "자산분류 데스크코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_C006').val())) {
				option.text = "투자국가를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_rlesFnnYn]:checked').val())) {
				option.text = "부동산금융여부를 선택해주세요.";
				openPopup(option);
				return false;
			} else if ($('input[name=TB06010S_rlesFnnYn]:checked').val() == 'Y' && $('#TB06010S_R017').val() == '') {
				option.text = "부동산금융여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_socYn]:checked').val())) {
				option.text = "SOC여부를 선택해주세요.";
				openPopup(option);
				return false;
			} else if ($('input[name=TB06010S_socYn]:checked').val() == 'Y' && $('#TB06010S_S002').val() == '') {
				option.text = "SOC여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_H002').val())) {
				option.text = "자산분류 보유목적구분코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_O002').val())) {
				option.text = "자산분류 제공용역구분코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_rcgAmt').val())) {
				option.text = "금융조건 종목승인금액을 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_I027').val())) {
				option.text = "금융조건 통화코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_E010').val())) {
				option.text = "금융조건 한도구분코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_ctrcPrdDcd').val())) {
				option.text = "금융조건 약정기간구분코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_T002').val())) {
				option.text = "금융조건 당사역할구분코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_sglLoanYn]:checked').val())) {
				option.text = "단독대출여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_mrtgStupYn]:checked').val())) {
				option.text = "담보여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty( $('input[name=TB06010S_sdnTrgtYn]:checked').val())) {
				option.text = "셀다운대상여부를 선택해주세요.";
				openPopup(option);
				return false;
			}
			
			if (isEmpty($('#TB06010S_dprtCd').val()) && isEmpty($('#TB06010S_empNo').val())) {
				option.text = "담당자 정보를 입력해주세요.";
				openPopup(option);
				return false;
			}
		}
		
		return true;
	}

	function makeParam(pageDcd) {
		
		var prgSttsCd = $('#TB06010S_I011').val();
		
		//if(isEmpty(prgSttsCd)) {
			prgSttsCd = '401';
		//}
		
		var paramData = {
			"pageDcd" : pageDcd
			, "prdtCd": $('#TB06010S_res_prdtCd').val()									// 상품코드
			//, "sn": ''                                          						// 일련번호
			, "lastYn": 'Y'																// 최종여부
			, "prdtNm": $('#TB06010S_res_prdtNm').val()									// 상품명
			, "prdtDsc": $('#TB06010S_prdtDsc').val()									// 상품설명
			//, "rqsKndCd": rqsKndCd                              						// 기업여신신청종류코드
			, "prgSttsCd": prgSttsCd													// 진행상태코드
			, "cnncPrdtCd": $('#TB06010S_cnnc_prdtCd').val()							// 연결상품코드
			, "dealNo": $('#TB06010S_ibDealNo').val()									// 딜번호
			, "dealNm": $('#TB06010S_ibDealNm').val()                                  	// 딜명
			//, "mtrNo": mtrNo                                    						// 안건번호
			//, "nmcpMtrDcd": $('#TB06010S_lstCCaseCcd').val()							// 부수안건구분코드
			, "mtrDcd" : $('#TB06010S_lstCCaseCcd').val()
			//, "nmcpMtrSn": nmcpMtrSn                            						// 부수안건일련번호
			//, "lstCCaseDcd": $('#TB06010S_riskInspctCcd').val()						// 리스크심사구분코드
			, "jdgmDcd" : $('#TB06010S_riskInspctCcd').val()	
			, "mtrNm": $('#TB06010S_mtrNm').val()										// 안건명
			//, "locoIssMngmNo": ''                    									// loc발급관리번호
			//, "invIdtrtSmitYn": invIdtrtSmitYn                  						// 투자확약서제출여부
			//, "trgYn": trgYn                                    						// 트리거여부
			//, "trgCndCtns": trgCndCtns                          						// 트리거조건내용
			//, "invIdtrtSmitDt": invIdtrtSmitDt                 						// 투자확약서제출일자
			//, "trOthrDscmNo": replaceAll($('#TB06010S_bsnsRgstNo').val(), '-', '')	// 거래상대방식별번호
			, "trOthrDscmNo": replaceAll($('#TB06010S_ardyBzepNo').val(), '-', '')			// 거래상대방식별번호
			//, "grupItgrCrdtGrdDcd": grupItgrCrdtGrdDcd          						// 그룹통합신용등급구분코드
			, "dmsCrdtGrdDcd": $('#TB06010S_I012').val()								// 국내신용등급구분코드
			, "crdtInqDt": replaceAll($('#TB06010S_crdtInqDt').val(), '-', '')			// 신용조회일자
			, "lstYn": $('input[name=TB06010S_lstYn]:checked').val()					// 상장여부
			//, "stlnCpstDcd": ''                        								// 대주구성구분코드
			, "frsMngmBdcd": $('#TB06010S_dprtCd').val()								// 최초관리부점코드
			, "mngmBdcd": $('#TB06010S_dprtCd').val()									// 관리부점코드
			, "chrrEmpno": $('#TB06010S_empNo').val()									// 담당자사원번호
			//, "subChrrEmpno": ''                     		    						// 서브담당자사원번호
			, "prdtClsfCd": $('#TB06010S_P004').val()									// 상품분류코드
			, "prdtMdclCd": $('#TB06010S_E023').val()									// 상품중분류코드
			, "prdtLclsCd": $('#TB06010S_E022').val()									// 상품대분류코드
			, "ibPrdtClsfCd": $('#TB06010S_I002').val()									// ib상품분류코드
			//, "ibPrdtIflwPathDcd": ''            										// ib상품유입경로구분코드
			, "ibPrdtPefDcd": $('#TB06010S_I004').val()                      			// ib상품pef구분코드
			//, "actsCd": $('#TB06010S_actsCd').val()									// 계정과목코드
			, "actsCd": $('#TB06010S_A005').val()										// 계정과목코드
			//, "dcrbAthDcd": dcrbAthDcd                          						// 기업여신전결권한구분코드
			//, "acctJobCd": acctJobCd                            						// 회계업무코드
			//, "acctUnJobCd": acctUnJobCd                        						// 회계단위업무코드
			//, "acctTrCd": acctTrCd                              						// 회계거래코드
			, "eprzCrdlApvlAmt": replaceAll($('#TB06010S_rcgAmt').val(), ',', '') / 1	// 종목승인금액
			//, "ctrtAmt": ctrtAmt                                						// 기업여신계약금액
			//, "invAmt": 0.0								        					// 투자금액
			//, "intrRcvnMthCd": intrRcvnMthCd                    						// 기업여신이자수취방법코드
			//, "intrBnaoDcd": intrBnaoDcd                        						// 이자선후취구분코드
			//, "tfdLyAplyDcd": tfdLyAplyDcd                      						// 초일말일적용구분코드
			//, "intrSnnoPrcsDcd": intrSnnoPrcsDcd                						// 이자단수처리구분코드
			//, "paiRdmpDcd": paiRdmpDcd                          						// 원리금상환구분코드
			//, "ortnPrdtClsfCd": ortnPrdtClsfCd                  						// 기업여신운용상품분류코드
			//, "intrtExpDcd": intrtExpDcd                        						// 기업여신금리만기구분코드
			//, "intrtRestFrqcMnum": intrtRestFrqcMnum            						// 금리재설정주기개월수
			//, "prnaRdmpFrqcMnum": prnaRdmpFrqcMnum              						// 원금상환주기개월수
			//, "intrRdmpFrqcMnum": intrRdmpFrqcMnum              						// 이자상환주기개월수
			//, "prnaDfrPrdMnum": prnaDfrPrdMnum                  						// 원금거치기간개월수
			//, "ctrtNo": ctrtNo                                  						// 기업여신계약번호
			//, "ctrcPrarDt": ''		                            					// 약정예정일자
			, "ctrcPrdMnum": ($('#TB06010S_ctrcPrdMnum').val() / 1)						// 약정기간개월수
			, "ctrcPrdDcd": $('#TB06010S_ctrcPrdDcd').val()								// 약정기간구분코드
			, "sglLoanYn": $('input[name=TB06010S_sglLoanYn]:checked').val()			// 단독대출여부
			, "rgstCbndYn": $('input[name=TB06010S_rgstCbndYn]:checked').val()			// 등록사채여부
			, "apvlDt": replaceAll($('#TB06010S_apvlDt').val(), '-', '')           		// 승인일자
			, "expDt": replaceAll($('#TB06010S_expDt').val(), '-', '')					// 만기일자
			//, "edDt": edDt                                      // 종결일자
			, "stupDt": replaceAll($('#TB06010S_stupDt').val(), '-', '')				// 설정일
			, "trustEdDt": replaceAll($('#TB06010S_trustEdDt').val(), '-', '')			// 신탁종료일 
			, "isuDt": replaceAll($('#TB06010S_isuDt').val(), '-', '')					// 발행일자 
			//, "ctrtEndRsnCd": ctrtEndRsnCd                     						// 기업여신계약종료사유코드
			//, "ctrtEndRsnCtns": ctrtEndRsnCtns                  						// 기업여신계약종료사유내용
			, "trCrryCd": $('#TB06010S_I027').val()										// 거래통화코드
			, "invNtnCd": $('#TB06010S_C006').val()										// 투자국가코드
			, "ortnFndCd": $('#TB06010S_fndCd').val()									// 운용펀드코드
			, "dskCd": $('#TB06010S_D012').val()										// 데스크코드
			, "eprzCrdlIndvLmtDcd": $('#TB06010S_E010').val()									// 개별한도구분코드
			//, "ctlbCtrtShpDcd": ''                 			    					// 우발채무계약형태구분코드
			//, "ctlbBssAsstDcd": ''                  									// 우발채무기초자산구분코드
			, "socYn": $('input[name=TB06010S_socYn]:checked').val()					// soc여부
			, "socDcd": $('#TB06010S_S002').val()										// soc구분코드
			, "mrtgStupYn": $('input[name=TB06010S_mrtgStupYn]:checked').val()			// 담보설정여부
			, "altnInvYn" : $('input[name="TB06010S_altnInvYn"]:checked').val()			// 대체투자여부
			//, "crdtRifcAplyYn": ''                  									// 신용보강적용여부
			//, "frxcHdgeYn": ''                          								// 외환헷지여부
			, "sppiSfcYn": $('#TB06010S_sppiSfcYn').val()								// sppi충족여부
			//, "projFnnYn": ''                            								// 프로젝트금융여부
			, "pplcFndYn": $('input[name=TB06010S_pplcFndYn]:checked').val()			// 사모펀드여부 
			, "untpFndYn": $('input[name=TB06010S_untpFndYn]:checked').val()			// 단위형펀드여부
			//, "pfLoanYn": pfLoanYn                              						// pf대출여부
			//, "undwFnnYn": undwFnnYn                            						// 인수금융여부
			//, "trchAplyYn": trchAplyYn                         		 				// 트렌치적용여부
			, "rlesFnnYn": $('input[name=TB06010S_rlesFnnYn]:checked').val()			// 부동산금융여부
			, "sdnTrgtYn": $('input[name=TB06010S_sdnTrgtYn]:checked').val()			// 셀다운대상여부
			//, "etcCndtYn": etcCndtYn                            						// 기타승인조건여부
			, "rlesFnnDetlDcd": $('#TB06010S_R017').val()								// 부동산금융상세구분코드
			, "holdPrpsDcd": $('#TB06010S_H002').val()									// 보유목적구분코드
			, "thcoRlDcd": $('#TB06010S_T002').val()									// 당사역할구분코드
			, "offrSrvcDcd": $('#TB06010S_O002').val()									// 제공서비스구분코드
			//, "ncrRt": 0.0                                    						// ncr율
			//, "rwaRt": 0.0                                    						// rwa율
			, "rpchPsblDt": replaceAll($('#TB06010S_rpchPsblDt').val(), '-', '')		// 환매가능일자
			//, "dispYn": ''                                  							// 매각여부
			//, "pplcCbndMpngYnDcd": ''            										// 사모사채매핑여부구분코드
			//, "etcDetSctyDcd": ''                    									// 기타채무증권구분코드
			, "invJdgmComtNo": $('#TB06010S_I008').val()								// 투자심사위원회번호
			//, "dispDtDcd": ''                            								// 매각일자구분코드
			//, "dispTlmtMnum": 0.0                      								// 매각기한개월수
			//, "dispStdrAmtDcd": ''                  									// 매각기준금액구분코드
			//, "dispRto": 0.0                               							// 매각비율
			//, "dispTlmtDt": ''            		           							// 매각기한일자
			//, "dispAmt": 0.0                               							// 매각금액
			, "rdmpClmPsblDt": replaceAll($('#TB06010S_rdmpClmPsblDt').val(), '-', '')	// 상환청구가능일자
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
			, "fxnIntrt": $('#TB06010S_fxnIntrt').val()           // 고정금리
			, "addIntrt": $('#TB06010S_addIntrt').val()           // 가산금리
			//, "intrtCngeFrqcMnum": intrtCngeFrqcMnum            // 금리변동주기개월수
			//, "hdwtEvlAmt": hdwtEvlAmt                          // 수기평가금액
			//, "weekMrtgKndCd": weekMrtgKndCd                    // 기업여신주담보종류코드
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
			, "rgstDt": getToday().replaceAll('-', '')			  // 등록일자
			//, "chngDt": '' 									  // 변경일자
			// 조작상세일시 , "hndDetlDtm": ''
			, "hndEmpno": $('#userEno').val()                              	  // 조작사원번호
			//, "hndTmnlNo": ''                            		  // 조작단말기번호
			//, "hndTrId": ''                                	  // 조작거래id
			//, "guid": ''                                        // guid
			, "earlyRepayYn": $('input[name=TB06010S_mdwyRdmpYn]:checked').val()		// 중도상환여부
			, "sglInvYn": $('input[name=TB06010S_sglInvYn]:checked').val()				// 단독투자여부
			, "rqsKndCd": $('#TB06010S_R023').val()                                     // 신청종류
		}
		return paramData;
	}

	// 셀다운승인조건탭
	function getIBIMS208BDTOInfo(prdtCd) {
		// console.log(">>>>>>>>>>> 1.getIBIMS208BDTOInfo["+prdtCd+"]<<<<<<<<<<<<");
		if (isEmpty($('#TB06010S_res_prdtCd').val()) && $('#TB06010S_E022').val() !== "92") {
			$('#registApvlCnd').attr('disabled', false);
		}
		
		var paramData = {
			"prdtCd" : prdtCd
		}
		// console.log(">>>>>>>>>>> 2.getIBIMS208BDTOInfo["+prdtCd+"]<<<<<<<<<<<<");
		$.ajax({
			type: "GET",
			url: "/TB06010S/getIBIMS208BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				$('#TB06010S_D007').val(data.sdwnDtDcd).prop('selected', true).change();
				$('#TB06010S_sdwnTlmtMnum').val(Number(data.sdwnTlmtMnum).toLocaleString());
				$('#TB06010S_sdwnTlmtDt').val(formatDate(data.sdwnTlmtDt));
				$('#TB06010S_D008').val(data.sdwnStdrAmtDcd).prop('selected', true).change();
				$('#TB06010S_sdwnRto').val(data.sdwnRto);
				$('#TB06010S_sdwnTlmtAmt').val(Number(data.sdwnTlmtAmt).toLocaleString());
				$('#TB06010S_appvCndtSn').val(data.sn);
			},
			error: function() {
				$('#TB06010S_D007').val("").prop('selected', true).change();
				$('#TB06010S_sdwnTlmtMnum').val("");
				$('#TB06010S_sdwnTlmtDt').val(formatDate(""));
				$('#TB06010S_D008').val("").prop('selected', true).change();
				$('#TB06010S_sdwnRto').val("");
				$('#TB06010S_sdwnTlmtAmt').val("");
				$('#TB06010S_appvCndtSn').val("");
			}
		});/* end of ajax*/
	}

	function saveAppvCndt() {
		var option = {}
		option.title = "Warning!";
		option.type = "warning";

		// 유효성검사
		if (isEmpty($('#TB06010S_ibDealNo').val())) {
			option.text = "Deal정보 조회 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty($('#TB06010S_appvCndtSn').val())) {
			option.text = "연결된 승인조건정보가 없습니다.";
			openPopup(option);
			return false;
		}
		
		var paramData = {
		"dealNo": $('#TB06010S_ibDealNo').val()                                // 딜번호
		, "sn": $('#TB06010S_appvCndtSn').val()                                  // 일련번호
		, "sdwnDtDcd": $('#TB06010S_D007').val()                           		 // 샐다운일자구분코드
		, "sdwnTlmtMnum": $('#TB06010S_sdwnTlmtMnum').val()                      // 샐다운기한개월수
		, "sdwnTlmtDt": replaceAll($('#TB06010S_sdwnTlmtDt').val(), '-', '')	 // 샐다운기한(목표)일자
		, "sdwnStdrAmtDcd": $('#TB06010S_D008').val()                  			 // 샐다운기준금액구분코드
		, "sdwnRto": $('#TB06010S_sdwnRto').val()                                // 샐다운비율
		, "sdwnTlmtAmt": replaceAll($('#TB06010S_sdwnTlmtAmt').val(), ',', '')	 // 샐다운목표금액
		, "chngDt": replaceAll(getToday(), '-', '')             				 // 변경일자
		}


		$.ajax({
			type: "POST",
			url: "/TB06010S/regIBIMS208B",
			data: paramData,
			dataType: "json",
			success: function(data) {

				if (data > 0) {
					Swal.fire({
						title: '승인조건정보를 저장하였습니다.',
						icon: 'success',
						confirmButtonText: '확인',
					}).then((result) => {
						if(isNotEmpty($('#TB06010S_res_prdtCd').val())) {
							getIBIMS208BDTOInfo($('#TB06010S_res_prdtCd').val()); 
						}	
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

	//담보/보증정보탭
	function getIBIMS212BDTOInfo(prdtCd) {
		
		if (isEmpty($('#TB06010S_res_prdtCd').val()) && $('#TB06010S_E022').val() !== "92") {
			$('#registMrtgCnnc').attr('disabled', false);
		} else {
			arrPqGridLstMrtgInfo.setData([]);
		}
		if(isEmpty(prdtCd)) {
			prdtCd = $('#TB06010S_res_prdtCd').val();
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
					$("#TB06010S_mrtgMngmNo_forPop").val(data[0].mrtgMngmNo);
					$("#TB06010S_mrtgNm_forPop").val(data[0].mrtgNm);
				} else {
					arrPqGridLstMrtgInfo.setData([]);
					$("#TB06010S_mrtgMngmNo_forPop").val("");
					$("#TB06010S_mrtgNm_forPop").val("");
				}
			},
			
		});/* end of ajax*/
	}


	function getIBIMS220BDTOInfo(prdtCd) {
		var paramData = {
			"prdtCd": prdtCd
		}
		
		$.ajax({
			type: "GET",
			url: "/TB06010S/getIBIMS220BDTOInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				arrPqGridItrRelrInfo.setData(data);
				/*arrPqGridItrRelrInfo.option("cellDblClick", function(event, ui) {
					
						rowIndx = ui.rowIndx;					
						//alert(rowIndx);
						
						if(ui.colIndx == 2) {
							callTB03061P("TB06010S");			
						}
				});*/
			}
		});/* end of ajax*/
	}

	function addRowItrRelr() {
		var newRow = {
			chk       : false
		, trOthrSn             : ""
		, trOthrDscmNo         : ""
		, trOthrNm         	  : ""
		, itrRelrChrNm         : ""
		, itrRelrShpNm         : ""
		}

		let bbb = $("#TB06010S_itrRelrInfo").pqGrid("addRow", {rowData: newRow, checkEditable: false });
		
		rowIndx = bbb;
		
	}

	function delRowItrRelr() {
		
		var gridData = $('#TB06010S_itrRelrInfo').pqGrid("option", "dataModel.data");
		var rowData
		var deleteCheckBox
		
		for (var i = 0; i < gridData.length; i++) {
			rowData = gridData[i];

			deleteCheckBox = rowData.chk;

			if(deleteCheckBox == true){
				$("#TB06010S_itrRelrInfo").pqGrid("deleteRow", {rowIndx: i});
				i--;
			}
		}
	}


	function saveItrRelr() {
		var prdtCd 		 = $('#TB06010S_res_prdtCd').val();				// 상품코드
		var trOthrDscmNo = $('#TB06010S_trOthrDscmNo').val();			// 거래상대방식별번호
		var trOthrDscmNm = $('#TB06010S_trOthrDscmNm').val();			// 거래상대방명
		var itrRelrChrCd = $('#TB06010S_I041').val();					// 성격
		var itrRelrShpCd = $('#TB06010S_I042').val();					// 형태
		
		if (isEmpty($('#TB06010S_res_prdtCd').val())) {
			Swal.fire({
				icon: 'warning',
				title: "Warning!",
				text: '종목코드를 조회해주세요.',
				confirmButtonText: "확인"
			});
			return false;
		}

		Swal.fire({
			title: "이해관계자 정보를 저장하시겠습니까?",
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '확인',
			cancelButtonText: '취소'
		}).then((result) => {
			if (result.isConfirmed) {
				businessFunction();
			}else{
				return false;	
			}
		});

		function businessFunction() {

			var itrList = [];
			
			for (var i = 0; i < arrPqGridItrRelrInfo.pdata.length; i++) {
				var itrInfo = {
					"prdtCd": $('#TB06010S_res_prdtCd').val()           					// 상품코드
					, "trOthrSn": arrPqGridItrRelrInfo.pdata[i].trOthrSn 				 	// 거래상대방일련번호
					, "trOthrDscmNo": arrPqGridItrRelrInfo.pdata[i].trOthrDscmNo         	// 거래상대방식별번호
					, "trOthrDscmNm": arrPqGridItrRelrInfo.pdata[i].trOthrNm         	    // 거래상대방명
					, "itrRelrChrCd": arrPqGridItrRelrInfo.pdata[i].itrRelrChrCd	     	// 성격
					, "itrRelrShpCd": arrPqGridItrRelrInfo.pdata[i].itrRelrShpCd    	 	// 형태				
				};
				itrList.push(itrInfo);
			}
			
			paramData = {
				"prdtCd" : prdtCd
				, "itrList" : itrList
			}
			
			// 비동기통신요청
			$.ajax({
				type: "POST",
				url: "/TB06010S/saveIBIMS220BDTOInfo",
				data: JSON.stringify(paramData),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function() {
					Swal.fire({
						icon: 'success',
						title: "Success!",
						text: "저장에 성공하였습니다.",
						confirmButtonText: "확인"
					}).then(function() {
						if(isNotEmpty($('#TB06010S_res_prdtCd').val())) {
							getIBIMS220BDTOInfo($('#TB06010S_res_prdtCd').val());
						}	
						//getCNFRNCList();
					});
				},
				error: function() {
					Swal.fire({
						icon: 'error',
						title: "Error!",
						text: "저장에 실패하였습니다.",
						confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 기초자산 초기화
	function tab5BtnReset() {
		$("#TB06010S_B010 option:eq(0)").prop("selected", true);				// 기초자산종류코드
		$('#TB06010S_I027_2 option[value="KRW"]').prop("selected", true);		// 부의기준통화
		$('#TB06010S_bscAstsCnts').val('');										// 기초자산내용
		$('#TB06010S_crryAmt').val('');											// 기초자산 평가액(통화금액)
		$('#TB06010S_bsc_bsnsRgstNo').val('');									// 실명번호
		$('#TB06010S_aplcExchR').val('1');										// 적용환율
		$('#TB06010S_bsc_entpRnm').val('');										// 법인명
		$('#TB06010S_bsc_corpRgstNo').val('');									// 법인등록번호
		$('#TB06010S_crevAmt').val('');											// 기초자산 평가액(원)
		$('#TB06010S_tab5_bssAsstMngmNo').val('');								// 항목일련번호
		//$("#TB06010S_assetInfo").html('');									// 테이블데이터제거
		$('#bscAstsActive tbody tr').removeClass('table-active');				// 테이블Hover 제거
		//$("#TB06010S_assetInfo").pqGrid("option", "dataModel.data", []);
		//$("#TB06010S_assetInfo").pqGrid("refreshDataAndView");
	}

	// 기초자산 평가액 * 환율
	function assetAmt() {
		// 기초자산 평가액(원)
		$('#TB06010S_crryAmt').keyup(function(event) {
			if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
				var input1 = $("#TB06010S_aplcExchR").val();
				if (input1 != "") {																			// 2-1. 적용환율 값이 있을경우
					var input2 = $('#TB06010S_crryAmt').val().replace(/,/g, "");								// 콤마 제거
					$("#TB06010S_crevAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
				} else {																					// 2-2. 적용환율 값이 없을경우
					var input2 = $('#TB06010S_crryAmt').val();
					$("#TB06010S_crevAmt").val(input2);
				}
			}
		})

		// 적용환율
		$('#TB06010S_aplcExchR').keyup(function(event) {
			if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
				var input1 = $("#TB06010S_crryAmt").val().replace(/,/g, "");
				if (input1 != "") {																			// 2. 값이 있으면 계산
					var input2 = $("#TB06010S_aplcExchR").val();
					$("#TB06010S_crevAmt").val(Math.floor(input1 * input2).toLocaleString("ko-KR"));
				}
			}
		})
	}

	// 기초자산정보 조회
	function getAssetInfo(prdtCd) {
		//tab5BtnReset();
		
		var paramData = {
			"prdtCd" : prdtCd
		}

		$.ajax({
			type: "GET",
			url: "/TB06010S/getAssetInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				arrPqGridAssetInfo.setData(data);
				arrPqGridAssetInfo.option("rowDblClick", function(event, ui) {
					assetInfoDetails(ui.rowData);
				});		
			}
		});
	}

	function assetInfoDetails(e) {

		var bssAsstKndCd   = e.bssAsstKndCd;	// 기초자산종류코드
		var bscAstsCnts    = e.bscAstsCnts;		// 기초자산내용
		var rnmCnfmNo 	   = e.rnmCnfmNo;		// 실명확인번호
		var bssAsstIsuCrno = e.bssAsstIsuCrno;	// 기초자산발행법인등록번호
		var crpNm 		   = e.crpNm;			// 법인명
		var invstCrryCd    = e.invstCrryCd;		// 투자통화코드
		var crryAmt        = e.crryAmt;			// 기초자산평가액(통화금액)
		var aplcExchR 	   = e.aplcExchR;		// 환율
		var crevAmt 	   = e.crevAmt;			// 시가평가금액
		var bssAsstMngmNo  = e.bssAsstMngmNo;	// 기초자산관리번호

		$('#TB06010S_B010').val(bssAsstKndCd).prop('selected', true);				// 기초자산종류코드
		$('#TB06010S_bscAstsCnts').val(bscAstsCnts);								// 기초자산내용
		$('#TB06010S_bsc_bsnsRgstNo').val(checkBrnAcno(rnmCnfmNo));					// 실명확인번호
		$('#TB06010S_bsc_corpRgstNo').val(checkBrnAcno(bssAsstIsuCrno));			// 법인번호
		$('#TB06010S_bsc_entpRnm').val(crpNm);										// 법인명
		$('#TB06010S_I027_2').val(invstCrryCd).prop('selected', true);				// 투자통화코드
		$('#TB06010S_crryAmt').val(isEmpty(crryAmt)?crryAmt:addComma(crryAmt));		// 기초자산평가액(통화금액)
		$('#TB06010S_aplcExchR').val(aplcExchR);									// 환율
		$('#TB06010S_crevAmt').val(isEmpty(crevAmt)?crevAmt:addComma(crevAmt));		// 기초자산평가액(원)
		//$('#TB06010S_crevAmt').val(addComma(crevAmt));
		$('#TB06010S_tab5_bssAsstMngmNo').val(bssAsstMngmNo);						// 기초자산번호

	}

	function tab5BtnSave() {
		if ( isEmpty($("#TB06010S_res_prdtCd").val()) ) {
			Swal.fire({
				icon: 'warning'
				, title: "Warning!"
				, text: "안건구조 등록 및 조회 이후 진행바랍니다."
				, confirmButtonText: "확인"
			});
			return false;
		}
		
		var prdtCd          = $('#TB06010S_res_prdtCd').val();								// 종목코드
		var bssAsstKndCd	= $('#TB06010S_B010').val();									// 기초자산유형
		var bscAstsCnts		= $('#TB06010S_bscAstsCnts').val();								// 기초자산내용
		var rnmCnfmNo		= $('#TB06010S_bsc_bsnsRgstNo').val().replaceAll('-', '');		// 실명확인번호
		var bssAsstIsuCrno	= $('#TB06010S_bsc_corpRgstNo').val().replaceAll('-', '');		// 기초자산발행법인번호
		var crpNm			= $('#TB06010S_bsc_entpRnm').val();								// 법인명
		var invstCrryCd		= $('#TB06010S_I027_2').val();									// 투자통화코드
		var crryAmt			= $('#TB06010S_crryAmt').val().replaceAll(',', '');				// 기초자산평가액(통화금액)
		var aplcExchR		= $('#TB06010S_aplcExchR').val();								// 환율
		var crevAmt			= $('#TB06010S_crevAmt').val().replaceAll(',', '');				// 기초자산평가액(원)
		var bssAsstMngmNo	= $('#TB06010S_tab5_bssAsstMngmNo').val();						// 일련번호

		var option = {}
		option.title = "Warning!";
		option.type = "warning";

		if (isEmpty(prdtCd)) {
			option.text = "종목정보가 없습니다.";
			openPopup(option);
			return false;
		}

		if (isEmpty(bscAstsCnts)) {
			option.text = "기초자산내용을 입력해주세요.";
			openPopup(option);
			return false;
		}
		
		if (isEmpty(crryAmt)) {
			option.text = "기초자산평가액을 입력해주세요.";
			openPopup(option);
			return false;
		}

		if (isEmpty(crpNm)) {
			option.text = "기초자산발행사 정보를 입력해주세요.";
			openPopup(option);
			return false;
		}

		businessFunction();

		function businessFunction() {

			var paramData = {
				"prdtCd": prdtCd
				, "bssAsstMngmNo": bssAsstMngmNo
				, "bssAsstKndCd": bssAsstKndCd
				, "bscAstsCnts": bscAstsCnts
				, "rnmCnfmNo": rnmCnfmNo
				, "bssAsstIsuCrno": bssAsstIsuCrno
				, "crpNm": crpNm
				, "invstCrryCd": invstCrryCd
				, "crryAmt": crryAmt
				, "aplcExchR": aplcExchR
				, "crevAmt": crevAmt						
			}
			
			$.ajax({
				type: "POST",
				url: "/TB06010S/registAssetInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "기초자산정보를 저장하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {			
						if(isNotEmpty(prdtCd)) {
							getAssetInfo(prdtCd);
						}
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

	// 기초자산 삭제
	function tab5BtnDelete() {

		var prdtCd          = $('#TB06010S_res_prdtCd').val();							// 종목코드
		var bssAsstMngmNo   = $('#TB06010S_tab5_bssAsstMngmNo').val();					// 기초자산관리번호
		

		var option = {}
		option.title = "Warning!";
		option.type = "warning";

		if (bssAsstMngmNo == 0) {
			option.text = "기초자산정보를 선택해주세요.";
			openPopup(option);
			return false;
		}

		businessFunction();

		function businessFunction() {

			var paramData = {
				"prdtCd"        : prdtCd
				, "bssAsstMngmNo" : bssAsstMngmNo
			}

			$.ajax({
				type: "POST",
				url: "/TB06010S/deleteAssetInfo",
				data: paramData,
				dataType: "json",
				success: function() {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "기초자산정보를 삭제하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {
						if(isNotEmpty(prdtCd)) {
							getAssetInfo(prdtCd);
						}					
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

	function showAlert() {
		$.ajax({
			type: "POST",
			url: "/TB06010S/insert100BInfo",
			dataType: "json",
			success: function(data) {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					,  text: "부의합의 요청하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					//location.reload();
				});
			}
		});/* end of ajax*/
	}

	// tabGrid settings
	function setItrRelrGrid(){
		setTimeout(() => arrPqGridItrRelrInfo.refresh(), 1)
	}
	function setLstMrtg(){
		setTimeout(() => arrPqGridLstMrtgInfo.refresh(), 1)
	}
	function setAtchFle(){
		setTimeout(() => arrPqGridAtchFleInfo.refresh(), 1)
	}
	function setAssetGrid(){
		setTimeout(() => arrPqGridAssetInfo.refresh(), 1);
	}

	function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF") || sessionStorage.getItem("isFromApvl")){
			console.log("WF세션 있음");
			$("#TB06010S_ibDealNo").val(sessionStorage.getItem("wfDealNo"));
			$("#TB06010S_ibDealNm").val(sessionStorage.getItem("wfDealNm"));
			$("#TB06010S_prdtCd").val(sessionStorage.getItem("wfPrdtCd"));
			$("#TB06010S_prdtNm").val(sessionStorage.getItem("wfPrdtNm"));
			getDealList();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();

	}

	return {
		
		// 함수
		getDealList : getDealList
		, resetSearchRequiment : resetSearchRequiment
		, changeExpDt : changeExpDt
		, managePrdtCd : managePrdtCd
		, setLstMrtg : setLstMrtg
		, setItrRelrGrid : setItrRelrGrid
		, setAssetGrid : setAssetGrid
		//, setAtchFle : setAtchFle
		, registIBIMS202BDTOInfo : registIBIMS202BDTOInfo
		, addRowItrRelr : addRowItrRelr
		, delRowItrRelr : delRowItrRelr
		, saveItrRelr : saveItrRelr
		, tab5BtnReset : tab5BtnReset
		, tab5BtnDelete : tab5BtnDelete
		, tab5BtnSave : tab5BtnSave
		, getIBIMS212BDTOInfo: getIBIMS212BDTOInfo
		, getIBIMS208BDTOInfo: getIBIMS208BDTOInfo
		, loginUserSet: loginUserSet
		, setAtchFle: setAtchFle

		// 변수
		, ldvdCd : ldvdCd
		, mdvdCd : mdvdCd
		, sdvdCd : sdvdCd

		, getDealInfoFromWF : getDealInfoFromWF
	}
})();