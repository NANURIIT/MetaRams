const TB08090Sjs = (function () {

	let slctBox;				//공통코드 반환
	let astsQtyDvdCdList;		//자산건전성 분류코드 list
	let pqGridObjAstList;		//PQGrid Obj

	let loginUsrId = '';

	$(document).ready(function () {

		loadUserAuth(); // 담당자 정보 조회
		getColmSlctBox();

		// 조회조건 수정시 초기화
		$("#TB08090_stdrDt").on('input', function () {
			resetPGgrids("TB08090S")
		})

		$("#TB08090_stdrDt").val(getToday());

	});

	function loadUserAuth() {
		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function (data) {
				//loginUserId = data.eno;
				loginUsrId = data.eno;
				// loginUsrNm = data.empNm;
				// loginUsrDprtCd = data.dprtCd;
				// loginUsrDprtNm = data.dprtNm;
			},
			error: function (request, status, error) {
				//console.log(request + "\n", status, "\n", error, "\n")
			}
		});
	}

	function getColmSlctBox() {

		/********************************************************************
		 * A013 자산건전성분류코드
		*******************************************************************/

		slctBox = getSelectBoxList('TB06015', 'A013', false);
		astsQtyDvdCdList = slctBox.filter(function (item) {
			return item.cmnsGrpCd === 'A013';
		});

		setGrid_TB08090S();

	}

	function setGrid_TB08090S() {

		let colM_TB08090S = [
			{
				title: "Deal번호",
				dataType: "string",
				dataIndx: "dealNo",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
			},
			{
				title: "Deal명",
				dataType: "string",
				dataIndx: "dealNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
			},
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "실행일련번호",
				dataType: "string",
				dataIndx: "excSn",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] }
			},
			{
				title: "자산건전성",
				editable: true,
				dataType: "string",
				dataIndx: "astsQtyDvdCd",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: astsQtyDvdCdList
				},
				render: function (ui) {
					var options = astsQtyDvdCdList
					var option = options.find(opt => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				}
			},
			{
				title: "기표일자",
				dataType: "string",
				dataIndx: "excDt",
				align: "center",
				halign: "center",
				width: "",
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
				width: "",
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

				title: "투자잔액",
				// editable: true,
				dataType: "string",
				dataIndx: "dealExcBlce",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
				render: function (ui) {
					var value = parseFloat(ui.cellData);

					var formattedValue = value.toLocaleString('ko-KR', {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2
					});

					return formattedValue;
				}
			},
			{
				title: "충당금",
				editable: true,
				dataType: "string",
				dataIndx: "evlAprnAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
				editor: {
					type: 'textbox',
					init: function (ui) {
						var $inp = ui.$cell.find("input");
						$inp.on('input', function () {
							inputNumberFormat(this);
						});
					}
				}

			},
			{
				title: "담당부서",
				dataType: "string",
				dataIndx: "dprtNm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: 'range' }] },
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "acbkAmt",				//장부금액
				hidden: true
			},
			// {
			// 	title:"",
			// 	dataType:"string",
			// 	dataIndx:"dealExcBlce",			//실행잔액 (원화환산전)
			// 	hidden: true
			// },
			{
				title: "",
				dataType: "string",
				dataIndx: "prdtClsfCd",			//기업여신상품분류코드
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "prdtMdclCd",			//기업여신상품중분류코드
				hidden: true
			},
			{
				title: "",
				dataType: "string",
				dataIndx: "prdtLclsCd",			//기업여신상품대분류코드
				hidden: true
			}

		]

		//엑셀 다운로드용 toolbar
		let toolbar_TB08090S = {
			cls: "pq-toolbar",
			items: [
				{
					type: 'button',
					style: 'margin-right:0;margin-left:1px;',
					attr: "title='Export to Xlsx'",
					cls: 'ui-button ui-corner-all ui-widget ui-button',
					label: '',
					listener: function () {

						var data = pqGridObjAstList.option("dataModel.data");

						var transformedData = data.map(row => {

							var options = astsQtyDvdCdList
							var option = options.find(opt => opt.cdValue == row.astsQtyDvdCd);
							var astsQtyDvdNm = option ? option.cdName : row.astsQtyDvdCd;

							return {
								"Deal번호": row.dealNo,
								"Deal명": row.dealNm,
								"종목코드": row.prdtCd,
								"종목명": row.prdtNm,
								"실행일련번호": row.excSn,
								"자산건전성": astsQtyDvdNm,
								"기표일자": formatDate(row.excDt),
								"만기일자": formatDate(row.expDt),
								"투자잔액": commaStr(row.dealExcBlce),
								"충당금": row.evlAprnAmt,
								"담당부서": row.dprtNm
							};
						});

						
						var ws = XLSX.utils.json_to_sheet(transformedData);

						ws['!cols'] = [
							{ wpx: 120 }, // Deal번호
							{ wpx: 200 }, // Deal명
							{ wpx: 120 }, // 종목코드
							{ wpx: 200 }, // 종목명
							{ wpx: 120 }, // 실행일련번호
							{ wpx: 120 }, // 자산건전성
							{ wpx: 120 }, // 기표일자
							{ wpx: 120 }, // 만기일자
							{ wpx: 120 }, // 투자잔액
							{ wpx: 120 }, // 충당금
							{ wpx: 120 }  // 담당부서
						];

						var wb = XLSX.utils.book_new();
						XLSX.utils.book_append_sheet(wb, ws, "건전성 및 충당금 산출");
						XLSX.writeFile(wb, "Ast_List.xlsx");

					}
				}
			]
		}

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
			scrollModel: { autoFit: true },
			// width: 'auto',
			// autoFit: true,
			toolbar: toolbar_TB08090S,
			colModel: colM_TB08090S,
			strNoRows: '조회된 데이터가 없습니다.',
			rowClick: function (event, ui) {
				pqGridSelectHandler(ui.rowIndx, "TB08090S_gridList");
		
			},
			// pageModel: pageModel_TB04060S
		}

		$('#TB08090S_gridList').pqGrid(obj);

		$("#TB08090S_gridList .pq-toolbar .ui-button").attr("id", "download-file-TB08090S");	//엑셀 다운로드 버튼 id부여

		pqGridObjAstList = $("#TB08090S_gridList").pqGrid('instance');

		//테스트용
		//$("#TB08090S_gridList").pqGrid("addRow", { rowData: {}, checkEditable: false });

	}

	function getAsstSnnGrdList() {
		pqGridObjAstList.option("dataModel.data", []);

		var stdrDt = $('#TB08090_stdrDt').val();			//기준일자

		if (stdrDt == '') {

			var option = {}
			option.title = "Warning!";
			option.type = "warning";
			option.text = "기준일자 입력 후 다시 시도해주세요.";
			openPopup(option);
			return false;

		} else {

			var param = {
				"stdrDt": stdrDt.replaceAll('-', '')
			};


			$.ajax({
				type: "GET",
				url: "/TB08090S/getAsstSnnGrdList",
				data: param,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				beforeSend: function () {

					pqGridObjAstList.option("strNoRows", "조회 중입니다...");
					pqGridObjAstList.refreshDataAndView();
				},
				success: function (data) {

					pqGridObjAstList.option("strNoRows", "조회된 데이터가 없습니다.");

					if (data.length > 0) {

						pqGridObjAstList.setData(data);
					}
				},
				error: function (request, status, error) {
					//console.log(request + "\n", status, "\n", error, "\n");
				}
			});

		}



	}

	//건전성 및 충당금 산출 목록 저장
	function asstSnnSave() {

		var option = {}
		option.title = "Error";
		option.type = "error";

		var asstSnnInfoLgth = $("#TB08090S_gridList").pqGrid('option', 'dataModel.data').length;		//건전성 및 충당금 산출 그리드

		if (isEmpty($('#TB08090_stdrDt').val())) {				//기준일자 미입력 시
			option.text = "기준일자를 입력한 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		} else if (asstSnnInfoLgth < 1) {
			option.text = "건전성 및 충당금 산출 정보를 업로드 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		} else {
            
			var nRow =0;
			for (var i = 0; i < asstSnnInfoLgth; i++) {

				var rowData = $("#TB08090S_gridList").pqGrid("getRowData", { rowIndx: i });

				var asstSnnGrdDcd = rowData.astsQtyDvdCd;
				var dealNo = rowData.dealNo;  //딜번호
				
				//var evlAprnAmt = rowData.evlAprnAmt;

				if (isEmpty(asstSnnGrdDcd)) {

                    nRow = i+1;
					option.text = "딜번호["+ dealNo+"] ,\n 자산건전성을 선택한 후 다시 시도해주세요.";
					//option.text = "자산건전성을 선택한 후 다시 시도해주세요.";
					openPopup(option);
					return false;
				}

			}

			businessFunction();
		}

		function businessFunction() {

			//var asstSnnInfoLgth = $("#TB08090S_gridList").pqGrid('option', 'dataModel.data').length;

			var asstSnnInfo = $("#TB08090S_gridList").pqGrid("getData");

			var ibims800bDTOList = [];

			asstSnnInfo.forEach(function (item) {

				var stdrDt = $('#TB08090_stdrDt').val();					//기준일자
				var prdtCd = item.prdtCd;									//종목코드
				var excSn = item.excSn;										//실행일련번호
				var excDt = item.excDt;										//실행일자
				var expDt = item.expDt;										//만기일자			
				var indvEvlAprnAmt = item.evlAprnAmt;						//충당금액(개별평가충당금액)
				var acbkAmt = item.dealExcBlce;								//장부금액 (투자잔액)
				var krwTrslExcBlce = item.dealExcBlce;						//실행잔액 (투자잔액)
				var asstSnnGrdDcd = item.astsQtyDvdCd;						//자산건전성등급구분코드
				var hndEmpNo = loginUsrId;									//조작사원번호

				var rmnExpYnum = 0;											//잔여만기년수
				//var rmnExpYnum = Number(expDt.substring(0, 4)) - Number(stdrDt.substring(0, 4));			//잔여만기년수

				//잔여만기년수 계산  
				if ( expDt == 0 ) {
					//만기일자 Null 인 경우
					rmnExpYnum = 0;																			//잔여만기년수
				}else{
					rmnExpYnum = Number(expDt.substring(0, 4)) - Number(stdrDt.substring(0, 4));            //잔여만기년수
				}		
				//alert(rmnExpYnum);

				var dtoInfo = {
					"stdrDt": stdrDt.replaceAll('-', ''),
					"prdtCd": prdtCd,
					"excSn": excSn,
					"excDt": excDt,
					"expDt": expDt,
					"indvEvlAprnAmt": isEmpty(indvEvlAprnAmt) ? "0" : indvEvlAprnAmt.replaceAll(',', ''),
					"acbkAmt": acbkAmt,
					"rmnExpYnum": rmnExpYnum,
					"krwTrslExcBlce": krwTrslExcBlce,
					"asstSnnGrdDcd": asstSnnGrdDcd,
					"hndEmpNo": hndEmpNo
				};

				ibims800bDTOList.push(dtoInfo);
			});

			var paramDTO = {
				"stdrDt": $('#TB08090_stdrDt').val().replaceAll('-', ''),
				"ibims800bDTOList": ibims800bDTOList
			}

			$.ajax({
				type: "POST",
				url: "/TB08090S/saveAsstSnnList",
				data: JSON.stringify(paramDTO),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function () {
					var option = {}
					option.title = "Success";
					option.type = "success";

					option.text = "건전성 및 충당금 산출 정보가 저장되었습니다.";
					openPopup(option);
				},
				error: function (request, status, error) {
					//console.log(request + "\n", status, "\n", error, "\n");
				}
			});


		}

	}


	//업로드 버튼 클릭 시
	$("#TB08090S_exUpLoad").click(function () {

		$('#upload-file-input-TB08090S').click();

	});

	$("#upload-file-input-TB08090S").change(function () {
		//alert("1");
		var mode = "multi";
		readExcel_TB08090S();
		resetFileInput($('#upload-file-input-TB08090S'));

	});

	//엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
	function resetFileInput($element) {
		$element.wrap('<form>').closest('form').get(0).reset();
		$element.unwrap();
	}

	//엑셀 파일 읽기
	function readExcel_TB08090S() {

		let input = event.target;
		let reader = new FileReader();
		reader.onload = function () {
			let data = reader.result;
			let workBook = XLSX.read(data, { type: 'binary' });
			workBook.SheetNames.forEach(function (sheetName) {
				let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
					raw: false,
					dateNF: 'yyyy-mm-dd'
				});

				//alert(JSON.stringify(rows));

				addExcelRows(rows);
			})
		};
		reader.readAsBinaryString(input.files[0]);
	}

	function addExcelRows(rows) {

		$("#TB08090S_gridList").pqGrid("setData", []);

		rows.forEach(function (row) {

			var options = astsQtyDvdCdList
			var option = options.find(opt => opt.cdName == row["자산건전성"]);
			var astsQtyDvdCd = option ? option.cdValue : row["자산건전성"];

			var dealNo = row["Deal번호"];
			var dealNm = row["Deal명"];
			var prdtCd = row["종목코드"];
			var prdtNm = row["종목명"];
			var excSn = row["실행일련번호"];
			var excDt = row["기표일자"];
			var expDt = row["만기일자"];
			var dealExcBlce = row["투자잔액"];
			var evlAprnAmt = row["충당금"];
			var dprtNm = row["담당부서"];



			var newRow = {
				dealNo: dealNo,
				dealNm: dealNm,
				prdtCd: prdtCd,
				prdtNm: prdtNm,
				excSn: excSn,
				astsQtyDvdCd: astsQtyDvdCd,
				excDt: excDt,
				expDt: expDt,
				dealExcBlce: dealExcBlce.replaceAll(',', ''),
				evlAprnAmt: evlAprnAmt,
				dprtNm: dprtNm
			}

			$("#TB08090S_gridList").pqGrid("addRow", { rowData: newRow, checkEditable: false });

		});

		$("#TB08090S_gridList").pqGrid("refreshDataAndView");
	}


	//엑셀 다운로드 버튼 클릭 시
	$("#TB08090S_exDownLoad").click(function () {

		$('#download-file-TB08090S').click();

	});

	return {
		getAsstSnnGrdList: getAsstSnnGrdList
		,asstSnnSave: asstSnnSave
	}

})();