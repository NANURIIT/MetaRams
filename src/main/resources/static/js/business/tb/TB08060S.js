const TB08060Sjs = function () {
	let loginUsrId;
	let loginUsrNm;
	let loginUsrDprtCd;
	let loginUsrDprtNm;

	let prepaidIntrCol;
	let prepaidFeeCol;
	let accruedIntrCol;
	let fxPnlCol;
	let imprmtCol;

	let eprzCrdlFeeKndCdList;
	let settlementObj;

	//엑셀 다운로드용 toolbar
	// let toolbar_TB08060S = {
	// 	cls: "pq-toolbar",
	// 	items: [
	// 		{
	// 			type: 'button',
	// 			style: 'margin-right:0;margin-left:1px;',
	// 			attr: "title='Export to Xlsx'",
	// 			cls: 'ui-button ui-corner-all ui-widget ui-button',
	// 			label: '',
	// 			listener: function() {
	// 				var blob = this.exportExcel({});
	// 				pq.saveAs(blob, "financial.xlsx");
	// 			}
	// 		}
	// 	]
	// };

	$(document).ready(function () {
		//loadSelectBoxContents();
		loadUserAuth(); // 담당자 정보 조회
		setGrid_TB08060S();

		var today = getToday();
		// console.log(today);
		var monthOnly = today.substring(0, 7); 

		$("#TB08060S_stdrDt").val(monthOnly);

		$('#TB08060S_srchForm').find('input, select').on('input', function() {
			resetPGgrids("TB08060S");
		})

		fnSelectBox();

		reset_TB08060S();

	});

	function setGrid_TB08060S() {

		/********************************************************************
		 * E008 : 수수료구분 (수수료종류)
		 * E036 : 기업여신결산구분코드
		*******************************************************************/

		selectBox = getSelectBoxList('TB08060S', '/E008/E038', false);

		eprzCrdlFeeKndCdList = selectBox.filter(function (item) {
			return item.cmnsGrpCd === 'E008';
		})

		//선수이자 colModel
		prepaidIntrCol = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "거래순번",
				dataType: "string",
				dataIndx: "trSn",
				align: "center",
				halign: "center",
				width: "80",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "수취일자",
				dataType: "string",
				dataIndx: "trDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "이자계산시작일",
				dataType: "string",
				dataIndx: "intrCalcStrtDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "이자계산종료일",
				dataType: "string",
				dataIndx: "intrCalcEndDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "만기일자",
				dataType: "string",
				dataIndx: "expDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "총이자일수",
				dataType: "string",
				dataIndx: "intrClcDnum",
				align: "right",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "경과이자일수",
				dataType: "string",
				dataIndx: "thmmDnum",
				align: "right",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "선수금액",
				dataType: "string",
				dataIndx: "eprzCrdlTrgtAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}
					var value = parseFloat(cellData);

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2
					});

					return formattedValue;
				}
			},
			{
				title: "경과누적금액",
				editable: true,
				dataType: "string",
				dataIndx: "thmmAcmlErnAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: 'textbox',
					init: function (ui) {
						var $inp = ui.$cell.find("input");
						$inp.on('input', function () {
							this.value = this.value.replace(/[^0-9]/g, '');
							inputNumberFormat(this);
						});
					}
				},
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}
					var value = '';

					if (String(cellData).includes(",")) {
						value = parseInt(cellData.replaceAll(',', ''), 10);
					} else {
						value = parseInt(cellData, 10);
					}

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					return formattedValue;
				}
			},
			{
				title: "회계반영여부",
				dataType: "string",
				dataIndx: "acctYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "환원여부",
				dataType: "string",
				dataIndx: "rstrPrcsYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "excSn",
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "rgstSn",
				hidden: true
			}
		]

		//선수수료 colModel
		prepaidFeeCol = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "실행순번",
				dataType: "string",
				dataIndx: "excSn",
				align: "center",
				halign: "center",
				width: "80",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "거래순번",
				dataType: "string",
				dataIndx: "trSn",
				align: "center",
				halign: "center",
				width: "80",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "수수료순번",
				dataType: "string",
				dataIndx: "excSn",
				align: "center",
				halign: "center",
				width: "90",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "수취일자",
				dataType: "string",
				dataIndx: "trDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "이자/수수료종류명",
				dataType: "string",
				dataIndx: "eprzCrdlFeeKndCd",
				align: "center",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] },
				// editor: {
				// 	type: "select",
				// 	valueIndx: "cdValue",
				// 	labelIndx: "cdName",
				// 	options: eprzCrdlFeeKndCdList
				// },
				render: function (ui) {
					var options = eprzCrdlFeeKndCdList
					// console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
					// console.log("options{}", options);
					var option = options.find(opt => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "안분시작일",
				dataType: "string",
				dataIndx: "fnnrRcogStrtDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "안분종료일",
				dataType: "string",
				dataIndx: "fnnrRcogEndDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "만기일자",
				dataType: "string",
				dataIndx: "expDt",
				align: "center",
				halign: "center",
				width: "150",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{
				title: "총이자일수",
				dataType: "string",
				dataIndx: "intrClcDnum",
				align: "right",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "경과이자일수",
				dataType: "string",
				dataIndx: "thmmDnum",
				align: "right",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "선수금액",
				dataType: "string",
				dataIndx: "eprzCrdlTrgtAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {
					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}

					var value = parseFloat(cellData);

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2
					});

					return formattedValue;
				}
			},
			{
				title: "경과누적금액",
				editable: true,
				dataType: "string",
				dataIndx: "thmmAcmlErnAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: 'textbox',
					init: function (ui) {
						var $inp = ui.$cell.find("input");
						$inp.on('input', function () {
							this.value = this.value.replace(/[^0-9]/g, '');
							inputNumberFormat(this);
						});
					}
				},
				render: function (ui) {
					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}

					var value = '';

					if (String(cellData).includes(",")) {
						value = parseInt(cellData.replaceAll(',', ''), 10);
					} else {
						value = parseInt(cellData, 10);
					}

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					return formattedValue;
				}
			},
			{
				title: "회계반영여부",
				dataType: "string",
				dataIndx: "acctYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "환원여부",
				dataType: "string",
				dataIndx: "rstrPrcsYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "excSn",
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "rgstSn",
				hidden: true
			}

		]

		//미수이자 colModel
		accruedIntrCol = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "펀드코드",
				dataType: "string",
				dataIndx: "ortnFndCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "펀드명",
				dataType: "string",
				dataIndx: "ortnFndNm",
				align: "left",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "실행순번",
				dataType: "string",
				dataIndx: "excSn",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "미수대출이자금액",
				editable: true,
				dataType: "string",
				dataIndx: "thmmAcmlErnAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: 'textbox',
					init: function (ui) {
						var $inp = ui.$cell.find("input");
						$inp.on('input', function () {
							this.value = this.value.replace(/[^0-9]/g, '');
							inputNumberFormat(this);
						});
					}
				},
				render: function (ui) {
					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}
					var value = '';

					if (String(cellData).includes(",")) {
						value = parseInt(cellData.replaceAll(',', ''), 10);
					} else {
						value = parseInt(cellData, 10);
					}

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					return formattedValue;
				}
			},
			{
				title: "회계반영여부",
				dataType: "string",
				dataIndx: "acctYn",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "환원여부",
				dataType: "string",
				dataIndx: "rstrPrcsYn",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "excSn",
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "rgstSn",
				hidden: true
			}
		]

		//외화환산손익 colModel
		// fxPnlCol = [
		// 	{
		// 		title: "국가명",
		// 		dataType: "string",
		// 		dataIndx: "ntnNm",
		// 		align: "left",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	},
		// 	{
		// 		title: "실행순번",
		// 		dataType: "string",
		// 		dataIndx: "excSn",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	},
		// 	{
		// 		title: "통화코드",
		// 		dataType: "string",
		// 		dataIndx: "crryCd",
		// 		align: "center",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	},
		// 	{
		// 		title: "매매환율",
		// 		dataType: "string",
		// 		dataIndx: "trdeExrt",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	},
		// 	{
		// 		title: "고시환율",
		// 		dataType: "string",
		// 		dataIndx: "ntfcExrt",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] },
		// 		render: function (ui) {
		// 			var value = parseFloat((ui.cellData).replaceAll(',',''));

		// 			var formattedValue = value.toLocaleString('ko-KR', {
		// 				minimumFractionDigits: 0,  
		// 				maximumFractionDigits: 2   
		// 			});

		// 			return formattedValue;
		// 		}  
		// 	},
		// 	{
		// 		title: "실행잔액",
		// 		dataType: "string",
		// 		dataIndx: "excBlce",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] }, 
		// 		render: function (ui) {
		// 			var value = parseFloat((ui.cellData).replaceAll(',',''));

		// 			var formattedValue = value.toLocaleString('ko-KR', {
		// 				minimumFractionDigits: 0,  
		// 				maximumFractionDigits: 2   
		// 			});

		// 			return formattedValue;
		// 		}  
		// 	},
		// 	{
		// 		title: "기초자산(원화)",
		// 		dataType: "string",
		// 		dataIndx: "bssAsst",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] },
		// 		render: function (ui) {
		// 			var value = parseFloat((ui.cellData).replaceAll(',',''));

		// 			var formattedValue = value.toLocaleString('ko-KR', {
		// 				minimumFractionDigits: 0,  
		// 				maximumFractionDigits: 2   
		// 			});

		// 			return formattedValue;
		// 		}   
		// 	},
		// 	{
		// 		title: "평가금액",
		// 		dataType: "string",
		// 		dataIndx: "evlAmt",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } ,
		// 		render: function (ui) {
		// 			var value = parseFloat((ui.cellData).replaceAll(',',''));

		// 			var formattedValue = value.toLocaleString('ko-KR', {
		// 				minimumFractionDigits: 0,  
		// 				maximumFractionDigits: 2   
		// 			});

		// 			return formattedValue;
		// 		}  
		// 	},
		// 	{
		// 		title: "환산손익금액",
		// 		editable: true,
		// 		dataType: "string",
		// 		dataIndx: "trslPflsAmt",
		// 		align: "right",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } ,
		// 		editor: {
		// 			type: 'textbox',
		// 			init: function(ui) {
		// 				var $inp = ui.$cell.find("input");
		// 				$inp.on('input', function() {
		// 					inputNumberFormat(this);
		// 				});
		// 			}
		// 		},
		// 		render: function (ui) {
		// 			var value = parseFloat((ui.cellData).replaceAll(',',''));

		// 			var formattedValue = value.toLocaleString('ko-KR', {
		// 				minimumFractionDigits: 0,  
		// 				maximumFractionDigits: 2   
		// 			});

		// 			return formattedValue;
		// 		}  
		// 	},
		// 	{
		// 		title: "회계반영여부",
		// 		dataType: "string",
		// 		dataIndx: "acctRflYn",
		// 		align: "center",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	},
		// 	{
		// 		title: "환원여부",
		// 		dataType: "string",
		// 		dataIndx: "rstrYn",
		// 		align: "center",
		// 		halign: "center",
		// 		width: "",
		// 		filter: { crules: [{ condition: 'range' }] } 
		// 	}
		// ]

		//평가손상 colModel
		imprmtCol = [
			{
				title: "펀드코드",
				dataType: "string",
				dataIndx: "ortnFndCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "펀드명",
				dataType: "string",
				dataIndx: "ortnFndNm",
				align: "left",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "210",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "대출금액",
				dataType: "string",
				dataIndx: "krwTrslExcAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {
					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}

					var value = parseFloat(cellData);

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2
					});

					return formattedValue;
				}
			},
			{
				title: "대출잔액",
				dataType: "string",
				dataIndx: "krwTrslExcBlce",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {
					var cellData = ui.cellData;
					if (cellData == null || cellData == '') {
						cellData = 0;
					}
					var value = parseFloat(cellData);

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2
					});

					return formattedValue;
				}
			},
			{
				title: "평가금액",
				editable: true,
				dataType: "string",
				dataIndx: "bfmmAcmlErnAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: 'textbox',
					init: function (ui) {
						var $inp = ui.$cell.find("input");
						$inp.on('input', function () {
							this.value = this.value.replace(/[^0-9]/g, '');
							inputNumberFormat(this);
						});
					}
				},
				render: function (ui) {
					var cellData = ui.cellData;

					if (cellData == null || cellData == '') {
						cellData = 0;
					}
					var value = '';

					if (String(cellData).includes(",")) {
						value = parseInt(cellData.replaceAll(',', ''), 10);
					} else {
						value = parseInt(cellData, 10);
					}

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					return formattedValue;
				}
			},
			{
				title: "평가손익금액",
				//editable: true,
				dataType: "string",
				dataIndx: "thmmAcmlErnAmt",
				align: "right",
				halign: "center",
				width: "180",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var krwTrslExcBlce = String(ui.rowData.krwTrslExcBlce).replaceAll(',', '');
					var bfmmAcmlErnAmt = String(ui.rowData.bfmmAcmlErnAmt).replaceAll(',', '');

					var value;
					var formattedValue;

					if (Number(bfmmAcmlErnAmt) == 0) {
						value = 0;
					} else {
						value = Number(bfmmAcmlErnAmt) - Number(krwTrslExcBlce);
					}

					formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					return formattedValue;
				}
			},
			{
				title: "회계반영여부",
				dataType: "string",
				dataIndx: "acctYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "환원여부",
				dataType: "string",
				dataIndx: "rstrPrcsYn",
				align: "center",
				halign: "center",
				width: "100",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "excSn",
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "rgstSn",
				hidden: true
			}
		]

		var obj = {
			height: 400,
			maxHeight: 400,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			scrollModel: { autoFit: false },
			colModel: accruedIntrCol,
			strNoRows: '조회된 데이터가 없습니다.',
			rowClick: function (event, ui) {
				pqGridSelectHandler(ui.rowIndx, "TB08060S_settlementGrid");
		
			},
			cellSave: function (evt, ui) {

				if (ui.dataIndx === 'krwTrslExcBlce' || ui.dataIndx === 'bfmmAcmlErnAmt') {
					var rowData = ui.rowData;

					var krwTrslExcBlce = rowData.krwTrslExcBlce || 0;
					var bfmmAcmlErnAmt = rowData.bfmmAcmlErnAmt || 0;

					var thmmAcmlErnAmt;

					if (bfmmAcmlErnAmt == 0 || bfmmAcmlErnAmt == "0") {
						thmmAcmlErnAmt = 0;
					} else {
						thmmAcmlErnAmt = Number(String(bfmmAcmlErnAmt).replaceAll(',', '')) - Number(String(krwTrslExcBlce).replaceAll(',', ''));
					}

					var formattedThmmAcmlErnAmt = thmmAcmlErnAmt.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					});

					// console.log("krwTrslExcBlce::::::" + krwTrslExcBlce);
					// console.log("bfmmAcmlErnAmt::::::" + bfmmAcmlErnAmt);
					// console.log("thmmAcmlErnAmt::::::" + thmmAcmlErnAmt);
					// console.log("formattedThmmAcmlErnAmt::::::" + formattedThmmAcmlErnAmt);

					rowData.thmmAcmlErnAmt = formattedThmmAcmlErnAmt;

					$("#TB08060S_settlementGrid").pqGrid("updateRow", {
						rowIndx: ui.rowIndx,
						data: { thmmAcmlErnAmt: formattedThmmAcmlErnAmt },
						//commit: true
					});

					$("#TB08060S_settlementGrid").pqGrid("refreshRow", { rowIndx: ui.rowIndx });
				}
			},
			// pageModel: pageModel_TB04060S
		}

		$("#TB08060S_settlementGrid").pqGrid(obj);
		$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

		//$("#TB08060S_settlementGrid .pq-toolbar .ui-button").attr("id", "download-file-TB08060S");	//엑셀 다운로드 버튼 id부여
		settlementObj = $("#TB08060S_settlementGrid").pqGrid('instance');

	}

	function loadUserAuth() {
		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function (data) {
				//loginUserId = data.eno;
				loginUsrId = data.eno;
				loginUsrNm = data.empNm;
				loginUsrDprtCd = data.dprtCd;
				loginUsrDprtNm = data.dprtNm;

				// $('#TB08060S_dprtCd').val(loginUsrDprtCd);
				// $('#TB08060S_dprtNm').val(loginUsrDprtNm);

				// if(loginUsrDprtCd == "AG3"){			//관리부인 경우 관리부서 검색 가능
				// 	$('#TB08060S_dprtCd').prop('readOnly', false);
				// 	$('#TB08060S_dprtNm').prop('readOnly', false);
				// 	$('#TB08060S_dprtBtn').prop('disabled', false);
				// }else{									//관리부 아닌 경우 자기 부서 건만 조회 가능
				// 	$('#TB08060S_dprtCd').prop('readOnly', true);
				// 	$('#TB08060S_dprtNm').prop('readOnly', true);
				// 	$('#TB08060S_dprtBtn').prop('disabled', true);
				// }

				// alert(loginUsrDprtNm);
				// alert(loginUsrDprtCd);
			},
			error: function (request, status, error) {
				console.log(request + "\n", status, "\n", error, "\n")
			}
		});
	}


	// 셀렉트박스 변경 시
	$("#TB08060S_E038").on("change", function () {

		var ctgry = $(this).val();
		let colM_TB08060S;

		if (ctgry == "1") {
			//$("#TB08060S_settlementGrid").pqGrid("destroy");
			colM_TB08060S = accruedIntrCol;
			$("#TB08060S_settlementGrid").pqGrid("setData", []);
			settlementObj.option("colModel", colM_TB08060S);
			$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

		} else if (ctgry == "2") {
			//$("#TB08060S_settlementGrid").pqGrid("destroy");
			colM_TB08060S = prepaidIntrCol;
			$("#TB08060S_settlementGrid").pqGrid("setData", []);
			settlementObj.option("colModel", colM_TB08060S);
			$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

		} else if (ctgry == "3") {
			//$("#TB08060S_settlementGrid").pqGrid("destroy");
			colM_TB08060S = prepaidFeeCol;
			$("#TB08060S_settlementGrid").pqGrid("setData", []);
			settlementObj.option("colModel", colM_TB08060S);
			$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

			// }else if(ctgry == "4"){				외화환산손익 그리드 삭제 
			// 	//$("#TB08060S_settlementGrid").pqGrid("destroy");
			// 	colM_TB08060S = fxPnlCol;
			// 	$("#TB08060S_settlementGrid").pqGrid("setData", []);
			// 	settlementObj.option("colModel", colM_TB08060S);
			// 	$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

		} else if (ctgry == "4") {
			//$("#TB08060S_settlementGrid").pqGrid("destroy");
			colM_TB08060S = imprmtCol;
			$("#TB08060S_settlementGrid").pqGrid("setData", []);
			settlementObj.option("colModel", colM_TB08060S);
			$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");

		}
	});


	//업로드 버튼 클릭 시
	$("#TB08060S_exUpLoad").click(function () {

		$('#upload-file-input-TB08060S').click();

	});

	$("#upload-file-input-TB08060S").change(function () {

		//var mode = "multi";
		readExcel_TB08060S();
		resetFileInput($('#upload-file-input-TB08060S'));

	});

	//엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
	// function resetFileInput($element) {
	// 	$element.wrap('<form>').closest('form').get(0).reset();
	// 	$element.unwrap();
	// }

	// //엑셀 파일 읽기
	// function readExcel_TB08060S(){

	// 	let input = event.target;
	// 	let reader = new FileReader();
	// 	reader.onload = function() {
	// 		let data = reader.result;
	// 		let workBook = XLSX.read(data, { type: 'binary' });
	// 		workBook.SheetNames.forEach(function(sheetName) {
	// 			let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], { 
	//                 raw: false,
	//                 dateNF: 'yyyy-mm-dd' 
	//             } );

	// 			//var ctgry = $("#TB08060S_financialCtgry").val();			//결산구분

	// 			//console.log(rows);

	// 			addExcelRows_TB08060S(rows);
	// 		})
	// 	};
	// 	reader.readAsBinaryString(input.files[0]);
	// }

	// function addExcelRows_TB08060S(rows){

	// 	var grid = $("#TB08060S_settlementGrid").pqGrid("option");

	// 	var colM = grid.colModel;

	// 	rows.forEach(function(row) {
	// 		var newRow = {};

	// 		colM.forEach(function(column) {
	// 			var value = row[column.title]; 
	// 			var key = column.dataIndx;

	// 			newRow[key] = value;

	// 		});

	// 		$("#TB08060S_settlementGrid").pqGrid("addRow", {rowData: newRow, checkEditable: false });
	// 	});

	// 	//console.log(JSON.stringify(newRow));


	// }

	// //엑셀 다운로드 버튼 클릭 시
	// $("#TB08060S_exDownLoad").click(function() {

	// 	$('#download-file-TB08060S').click();

	// });

	//월말결산 조회
	function getSettlementList() {

		var stdrDt = $('#TB08060S_stdrDt').val();		//기준일자
		var dprtCd = $('#TB08060S_dprtCd').val();		//부서코드
		var eprzCrdlAcctCrtTpCd = $('#TB08060S_E038').val();		//결산구분코드
		var ortnFndCd = $('#TB08060S_fndCd').val();							//펀드코드

		var param = {
			"stdrDt": stdrDt.replaceAll('-', ''),
			"dprtCd": dprtCd,
			"eprzCrdlAcctCrtTpCd": eprzCrdlAcctCrtTpCd,
			"ortnFndCd": ortnFndCd
		}

		$.ajax({
			type: "GET",
			url: "/TB08060S/getSettlementList",
			data: param,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			beforeSend: function () {
				$("#TB08060S_settlementGrid").pqGrid("setData", []);
				settlementObj.option("strNoRows", "조회 중입니다...");
				settlementObj.refreshDataAndView();
			},
			success: function (data) {

				//console.log(JSON.stringify(data));

				// var intrClcDnum = data[0].intrClcDnum

				// console.log(intrClcDnum);

				settlementObj.option("strNoRows", "조회된 데이터가 없습니다.");

				if (data.length > 0) {

					$("#TB08060S_settlementGrid").pqGrid("setData", data);

				}
				else {
					$("#TB08060S_settlementGrid").pqGrid("setData", []);
					Swal.fire({
						icon: 'warning'
						, title: 'Warning!'
						, text: '조회된 내역이 없습니다!'
					})
				}

			},
			error: function (request, status, error) {
				console.log(request + "\n", status, "\n", error, "\n");
			}
		});

	}

	//초기화
	function reset_TB08060S() {

		var today = getToday();
		// console.log(today);
		var monthOnly = today.substring(0, 7); 

		$("#TB08060S_stdrDt").val(monthOnly); 

		$('#TB08060S_dprtCd').val($("#userDprtCd").val());	//관리부서코드
		$('#TB08060S_dprtNm').val($("#userDprtCd").val());	//관리부서명

		$("#TB08060S_fndCd").val('');				//펀드코드
		$("#TB08060S_fndNm").val('');				//펀드명

		$('#TB08060S_E038').prop('selectedIndex', 0);			//결산구분 초기화

		resetPGgrids("TB08060S");	// 그리드 초기화

	}

	//월말결산 업데이트
	function saveSettlement() {

		var eprzCrdlStlaDcd = $('#TB08060S_E038').val();		//결산구분 코드

		var stdrDt = $('#TB08060S_stdrDt').val().replaceAll('-', '');						//기준일자

		var paramList = [];

		var gridLgth = $("#TB08060S_settlementGrid").pqGrid('option', 'dataModel.data').length;		//금리정보 그리드

		if (gridLgth < 1) {		//그리드에 조회된 데이터 없으면
			var option = {}
			option.title = "Error";
			option.type = "error";
			option.text = "월말결산 정보를 조회한 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		}

		//$("#TB08060S_settlementGrid").pqGrid("refreshDataAndView");	

		for (var i = 0; i < gridLgth; i++) {
			var rowData = $("#TB08060S_settlementGrid").pqGrid("getRowData", { rowIndx: i });
			// console.log("rowData:::", rowData);
			// console.log("thmmAcmlErnAmt:::" + rowData.thmmAcmlErnAmt);
			// console.log("bfmmAcmlErnAmt:::" + rowData.bfmmAcmlErnAmt);
			//console.log("thmmAcmlErnAmt:::" + rowData.thmmAcmlErnAmt);
			var bfmmAcmlErnAmt = String(handleNullData(rowData.bfmmAcmlErnAmt));
			var thmmAcmlErnAmt = String(handleNullData(rowData.thmmAcmlErnAmt));


			var formattedThmmAcmlErnAmt = thmmAcmlErnAmt.includes(',') ? thmmAcmlErnAmt.replaceAll(',', '') : thmmAcmlErnAmt;
			var formattedBfmmAcmlErnAmt = bfmmAcmlErnAmt.includes(',') ? bfmmAcmlErnAmt.replaceAll(',', '') : bfmmAcmlErnAmt;

			var param = {
				"stdrYm": stdrDt,							//기준년월
				"prdtCd": rowData.prdtCd,					//종목코드
				"rgstSn": rowData.rgstSn,					//등록일련번호 
				"eprzCrdlStlaDcd": eprzCrdlStlaDcd,					//기업여신결산구분코드
				"thmmAcmlErnAmt": formattedThmmAcmlErnAmt == '' ? 0 : formattedThmmAcmlErnAmt,			//당월누적수익금액
				"bfmmAcmlErnAmt": formattedBfmmAcmlErnAmt == '' ? 0 : formattedBfmmAcmlErnAmt			//전월누적수익금액
			}


			paramList.push(param);

		}
		//console.log(JSON.stringify(paramList));
		//alert(JSON.stringify(paramList));

		$.ajax({
			type: "POST",
			url: "/TB08060S/saveSettlement",
			data: JSON.stringify(paramList),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {

				var option = {}
				option.title = "Success";
				option.type = "success";

				option.text = "월말결산 정보가 저장되었습니다.";
				openPopup(option, getSettlementList());

			},
			error: function (request, status, error) {
				console.log(request + "\n", status, "\n", error, "\n");

				var option = {}
				option.title = "Error";
				option.type = "error";
				option.text = "월말결산 정보를 저장하는데 실패했습니다.";
				openPopup(option);
				return false;

			}
		});
	}

	/**
	 * selectBox 부서코드 set
	 */
	function fnSelectBox() {
		let selectBox = getSelectBoxList(
			"TB08060S",
			"D010",   //부서코드
			false
		);

		let TB08060S_dprtSelect;

		TB08060S_dprtSelect = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "D010";
		})

		let D010html;

		TB08060S_dprtSelect.forEach((item) => {
			D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});

		$("#TB08060S_dprtCd").append(D010html);

		$('#TB08060S_dprtCd').on('change', function() {
			$('#TB08060S_dprtNm').val($('#TB08060S_dprtCd').val())
		});

	}

	return {
		getSettlementList: getSettlementList
		, reset_TB08060S: reset_TB08060S
		, saveSettlement: saveSettlement
	}
}();