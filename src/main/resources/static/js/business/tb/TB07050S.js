const TB07050Sjs = (function() {
	let prnaRdmpSch; // 원금상환스케줄
	let intrRdmpSch; // 이자상환스케줄
	let excSch; // 실행스케줄
	let fValid; // 0.조회 1.저장 2.Grid Check
	// 02 : 원금상환스케줄, 04 : 이자상환스케줄, 01 : 실행스케줄
	let scxDcd = $('input[name="TB07050S_scxDcd"]:checked').val(); // 스케줄선택
	let prnaRdmpSchLen = 0;
	let intrRdmpSchLen = 0;
	let excSchLen = 0;
	let saveGrid = []; // 저장 리스트
	let grdData;
	let grdID;

	$(document).ready(function() {
		onload();
	});

	function onload() {
		/**
		 * E021 - EPRZ_CRDL_PRDT_CLSF_CD 기업여신상품분류코드
		 * E020 - EPRZ_CRDL_PAI_RDMP_DCD 기업여신원리금상환구분코드
		 * R023 - RQS_KND_CD 기업여신신청종류코드
		 * eprzCrdlIntrBnaoDcd
		 */
		getSelectBoxList("TB07050S", "E020/R023/I015/I005/S003/I027/E021/E011/E010/A005");
		pqGrid("02"); // 그리드 생성
		grdInf();
	}

	function pqGrid(f) {
		/********************************************************************
		 * PQGrid Column
		 ********************************************************************/
		// 원금상환스케줄
		let colPrnaRdmpSch = [
			//체크박스
			{
				dataIndx: "chk",
				maxWidth: 36,
				minWidth: 36,
				align: "center",
				resizable: false,
				title: "",
				menuIcon: false,
				type: "checkBoxSelection",
				cls: "ui-state-default",
				sortable: false,
				editor: false,
				dataType: "bool",
				width: "6%",
				editable: "true",
				cb: {
					all: false,
					header: true,
				},
			},
			{
				title: "상환예정일자",
				dataType: "string",
				dataIndx: "prarDt",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						// let cellData = ui.cellData;
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							//console.log(this.value.length)
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "상환예정원금",
				dataType: "integer",
				dataIndx: "prarPrna",
				halign: "center",
				align: "right",
				format: "#,###",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "상환일자",
				dataType: "string",
				dataIndx: "prcsDt",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "상환원금",
				dataType: "integer",
				dataIndx: "prcsAmt",
				halign: "center",
				align: "right",
				format: "#,###",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "처리완료여부",
				dataType: "string",
				dataIndx: "prcsCpltYn",
				halign: "center",
				align: "center",
				editable: false,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					options: ["Y", "N"],
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData == "") {
						return "";
					} else if (cellData === "Y") {
						return "처리";
					} else {
						return "미처리";
					}
				},

			},
			{
				title: "등록자",
				editable: false,
				dataType: "string",
				dataIndx: "hndEmpno",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일시",
				editable: false,
				dataType: "date",
				format: "yyyy-mm-dd",
				dataIndx: "hndDetlDtm",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = replaceAll(ui.cellData, '-', '');
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else if (!isEmpty(cellData) && cellData.length > 8) {
						return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
					} else {
						return cellData;
					}
				}
			},
		];

		// 이자상환스케줄
		let colIntrRdmpSch = [
			//체크박스
			{
				dataIndx: "chk",
				maxWidth: 36,
				minWidth: 36,
				align: "center",
				resizable: false,
				title: "",
				menuIcon: false,
				type: "checkBoxSelection",
				cls: "ui-state-default",
				sortable: false,
				editor: false,
				dataType: "bool",
				width: "5%",
				editable: "true",
				cb: {
					all: false,
					header: true,
				},
			},
			{
				title: "시작일",
				dataType: "string",
				dataIndx: "strtDt",
				halign: "center",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "종료일",
				dataType: "string",
				dataIndx: "endDt",
				halign: "center",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "납부예정일",
				dataType: "string",
				dataIndx: "prarDt",
				halign: "center",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							//console.log(this.value.length)
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "이자율(%)",
				dataType: "string",
				dataIndx: "aplyIrt",
				halign: "center",
				align: "right",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("maxlength", "6");
					},
				},
			},
			{
				title: "대상금액",
				dataType: "integer",
				dataIndx: "trgtAmt",
				halign: "center",
				align: "right",
				format: "#,###",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData == "") {
						return "";
					}
				},
			},
			{
				title: "이자금액",
				dataType: "string",
				dataIndx: "rdmpPrarIntr",
				halign: "center",
				align: "right",
				format: "#,###",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData == "") {
						return "";
					}
				},
			},
			{
				title: "상환일자",
				dataType: "string",
				dataIndx: "prcsDt",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "처리완료여부",
				dataType: "string",
				dataIndx: "prcsCpltYn",
				halign: "center",
				align: "center",
				editable: false,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					options: ["Y", "N"],
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData == "") {
						return "";
					} else if (cellData === "Y") {
						return "처리";
					} else {
						return "미처리";
					}
				},
			},
			{
				title: "등록자",
				editable: false,
				dataType: "string",
				dataIndx: "hndEmpno",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일시",
				editable: false,
				dataType: "date",
				format: "yyyy-mm-dd",
				dataIndx: "hndDetlDtm",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = replaceAll(ui.cellData, '-', '');
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else if (!isEmpty(cellData) && cellData.length > 8) {
						return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
					} else {
						return cellData;
					}
				}
			},
		];

		// 실행스케줄
		let colExcSch = [
			//체크박스
			{
				dataIndx: "chk",
				maxWidth: 36,
				minWidth: 36,
				align: "center",
				resizable: false,
				title: "",
				menuIcon: false,
				type: "checkBoxSelection",
				cls: "ui-state-default",
				sortable: false,
				editor: false,
				dataType: "bool",
				width: "6%",
				editable: "true",
				cb: {
					all: false,
					header: true,
				},
			},
			{
				title: "실행일자",
				dataType: "string",
				dataIndx: "prarDt",
				align: "center",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "textbox",
					init: function(ui) {
						// let cellData = ui.cellData;
						let $inp = ui.$cell.find("input");
						$inp.attr("placeholder", "YYYY-MM-DD");
						$inp.on("input", function() {
							//console.log(this.value.length)
							if (this.value.length === 8) {
								formatDate(this.value);
							} else {
								this.value;
							}
						});
					},
				},
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "실행금액",
				dataType: "integer",
				dataIndx: "prarPrna",
				halign: "center",
				align: "right",
				format: "#,###",
				editable: true,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록자",
				editable: false,
				dataType: "string",
				dataIndx: "hndEmpno",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일시",
				editable: false,
				dataType: "date",
				format: "yyyy-mm-dd",
				dataIndx: "hndDetlDtm",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = replaceAll(ui.cellData, '-', '');
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else if (!isEmpty(cellData) && cellData.length > 8) {
						return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
					} else {
						return cellData;
					}
				}
			},
		];

		let pqGridObjs = [];

		switch (f) {
			case "02":
				//엑셀 다운로드용 toolbar
				let prnaRdmpSch_toolbar = {
					cls: "pq-toolbar",
					items: [
						{
							type: "button",
							style: "margin-right:0;margin-left:1px;",
							attr: "title='Export to Xlsx'",
							cls: "ui-button ui-corner-all ui-widget ui-button",
							label: "",
							listener: function() {
								let data = prnaRdmpSch.option("dataModel.data");
								// let prcsCpltYn;

								let transformedData = data.map((row) => {
									// console.log(row)
									if (row.prcsCpltYn == "") {
										row.prcsCpltYn = "";
									} else if (row.prcsCpltYn === "Y") {
										row.prcsCpltYn = "처리";
									} else {
										row.prcsCpltYn = "미처리";
									}

									return {
										상환예정일자: formatDate(row.prarDt),
										상환예정원금: row.prarPrna,
										상환일자: row.prcsDt,
										상환원금: row.prcsAmt,
										처리완료여부: row.prcsCpltYn,
									};
								});

								let ws = XLSX.utils.json_to_sheet(transformedData);

								ws["!cols"] = [
									{ wpx: 100 }, // 상환예정일자
									{ wpx: 120 }, // 상환예정원금
									{ wpx: 100 }, // 상환일자
									{ wpx: 120 }, // 상환원금
									{ wpx: 100 }, // 처리완료여부
								];

								let wb = XLSX.utils.book_new();
								XLSX.utils.book_append_sheet(wb, ws, `${getToday()}`);
								XLSX.writeFile(wb, `원금상환스케줄_${getToday2()}.xlsx`);

								// var blob = this.exportExcel({});
								// pq.saveAs(blob, `상환대상상세내역_${getToday2()}}.xlsx`);
							},
						},
					],
				};
				// 그리드 옵션 생성
				pqGridObjs = [
					{
						height: 450,
						maxHeight: 450,
						id: "prnaRdmpSchGrid",
						colModel: colPrnaRdmpSch,
						numberCell: {
							show: true,
							width: 40,
							resizable: true,
							title: "<p class='text-center'>순번</p>",
						},
						rowClick: function(evt, ui) {
							pqGridSelectHandler(ui.rowIndx, "prnaRdmpSchGrid");
						},
						cellSave: function(event, ui) {
							// 수정된 행에 rowType 추가
							let rowIndx = ui.rowIndx,
								rowData = grdID.getRowData({ rowIndx }),
								rowType = rowData.rowType;

							if (rowType !== "I") {
								rowData.rowType = "M"; // rowData 객체의 rowType을 직접 "M"으로 설정
								// saveGrid에서 동일한 pq_ri를 가진 객체의 인덱스를 찾기
								let index = saveGrid.findIndex(function(item) {
									return item.pq_ri === rowData.pq_ri;
								});
								// console.log("cellSave index ::: ", index);
								// console.log("cellSave rowData ::: ", rowData);

								if (index !== -1) {
									// 기존 객체가 있으면 해당 객체를 업데이트
									saveGrid[index] = rowData;
								} else {
									// 기존 객체가 없으면 새로 추가
									saveGrid.push(rowData);
								}
								// chkGrd(grdID);
							} else {
								rowData.rowType = rowType; // rowType이 "I"인 경우 그대로 유지
							}
						},
						toolbar: prnaRdmpSch_toolbar,
					},
				];
				setPqGrid(pqGridObjs);
				// Grid instance
				prnaRdmpSch = $("#prnaRdmpSchGrid").pqGrid("instance");

				$("#prnaRdmpSchGrid .pq-toolbar .ui-button").attr(
					"id",
					"download-file-TB07050S"
				); //엑셀 다운로드 버튼 id부여
				break;

			case "04":
				//엑셀 다운로드용 toolbar
				let intrRdmpSch_toolbar = {
					cls: "pq-toolbar",
					items: [
						{
							type: "button",
							style: "margin-right:0;margin-left:1px;",
							attr: "title='Export to Xlsx'",
							cls: "ui-button ui-corner-all ui-widget ui-button",
							label: "",
							listener: function() {
								let data = intrRdmpSch.option("dataModel.data");
								// let prcsCpltYn;

								let transformedData = data.map((row) => {
									// console.log(row)
									if (row.prcsCpltYn == "") {
										row.prcsCpltYn = "";
									} else if (row.prcsCpltYn === "Y") {
										row.prcsCpltYn = "처리";
									} else {
										row.prcsCpltYn = "미처리";
									}

									return {
										시작일: formatDate(row.strtDt),
										종료일: formatDate(row.endDt),
										"이자율(%)": row.aplyIrt,
										대상금액: commaNull(row.prarPrna),
										이자금액: comma(row.rdmpPrarIntr),
										처리완료여부: row.prcsCpltYn,
									};
								});

								let ws = XLSX.utils.json_to_sheet(transformedData);

								ws["!cols"] = [
									{ wpx: 100 }, // 시작일
									{ wpx: 100 }, // 종료일
									{ wpx: 100 }, // 이자율(%)
									{ wpx: 100 }, // 대상금액
									{ wpx: 100 }, // 이자금액
									{ wpx: 100 }, // 처리완료여부
								];

								let wb = XLSX.utils.book_new();
								XLSX.utils.book_append_sheet(wb, ws, `${getToday()}`);
								XLSX.writeFile(wb, `이자상환스케줄_${getToday2()}.xlsx`);

								// var blob = this.exportExcel({});
								// pq.saveAs(blob, `상환대상상세내역_${getToday2()}}.xlsx`);
							},
						},
					],
				};
				// 그리드 옵션 생성
				pqGridObjs = [
					{
						height: 450,
						maxHeight: 450,
						id: "intrRdmpSchGrid",
						colModel: colIntrRdmpSch,
						numberCell: {
							show: true,
							width: 40,
							resizable: true,
							title: "<p class='text-center'>순번</p>",
						},
						rowClick: function(evt, ui) {
							pqGridSelectHandler(ui.rowIndx, "intrRdmpSchGrid");
						},
						cellSave: function(event, ui) {
							// 수정된 행에 rowType 추가
							let rowIndx = ui.rowIndx,
								rowData = grdID.getRowData({ rowIndx }),
								rowType = rowData.rowType;

							if (rowType !== "I") {
								rowData.rowType = "M"; // rowData 객체의 rowType을 직접 "M"으로 설정
								// saveGrid에서 동일한 pq_ri를 가진 객체의 인덱스를 찾기
								let index = saveGrid.findIndex(function(item) {
									return item.pq_ri === rowData.pq_ri;
								});
								// console.log("cellSave index ::: ", index);
								// console.log("cellSave rowData ::: ", rowData);

								if (index !== -1) {
									// 기존 객체가 있으면 해당 객체를 업데이트
									saveGrid[index] = rowData;
								} else {
									// 기존 객체가 없으면 새로 추가
									saveGrid.push(rowData);
								}
								chkGrd(grdID);
							} else {
								rowData.rowType = rowType; // rowType이 "I"인 경우 그대로 유지
							}
						},
						toolbar: intrRdmpSch_toolbar,
					},
				];
				setPqGrid(pqGridObjs);
				intrRdmpSch = $("#intrRdmpSchGrid").pqGrid("instance");
				$("#intrRdmpSchGrid .pq-toolbar .ui-button").attr(
					"id",
					"download-file-TB07050S"
				); //엑셀 다운로드 버튼 id부여
				// aplyIrt 이자율

				// let formulas = [
				//     [
				//         "rdmpPrarIntr", function(rd) {
				//             /* TODO */
				//             let tot;
				//             // if ( !isNaN(rd.aplyIrt) ) {
				//             //     tot = rd.prarPrna * ( rd.aplyIrt / 100 );

				//             //     return tot;
				//             // } else {
				//             //     rd.aplyIrt = 0;

				//             //     ;
				//             // }
				//             return rd.rdmpPrarIntr;
				//         },
				//     ],
				// ];

				//intrRdmpSch.option("formulas", formulas);
				break;

			case "01":
				//엑셀 다운로드용 toolbar
				let excSch_toolbar = {
					cls: "pq-toolbar",
					items: [
						{
							type: "button",
							style: "margin-right:0;margin-left:1px;",
							attr: "title='Export to Xlsx'",
							cls: "ui-button ui-corner-all ui-widget ui-button",
							label: "",
							listener: function() {
								let data = excSch.option("dataModel.data");
								// let prcsCpltYn;

								let transformedData = data.map((row) => {
									// console.log(row)
									// if ( row.prcsCpltYn === "1" ) {
									//     row.prcsCpltYn = "처리"
									// } else {
									//     row.prcsCpltYn = "미처리"
									// }

									return {
										실행일자: formatDate(row.prarDt),
										실행금액: row.prarPrna,
									};
								});

								let ws = XLSX.utils.json_to_sheet(transformedData);

								ws["!cols"] = [
									{ wpx: 100 }, // 예정일자
									{ wpx: 100 }, // 예정원금
								];

								let wb = XLSX.utils.book_new();
								XLSX.utils.book_append_sheet(wb, ws, `${getToday()}`);
								XLSX.writeFile(wb, `실행스케줄_${getToday2()}.xlsx`);

								// var blob = this.exportExcel({});
								// pq.saveAs(blob, `상환대상상세내역_${getToday2()}}.xlsx`);
							},
						},
					],
				};
				// 그리드 옵션 생성
				pqGridObjs = [
					{
						height: 450,
						maxHeight: 450,
						id: "excSchGrid",
						colModel: colExcSch,
						numberCell: {
							show: true,
							width: 40,
							resizable: true,
							title: "<p class='text-center'>순번</p>",
						},
						rowClick: function(evt, ui) {
							pqGridSelectHandler(ui.rowIndx, "excSchGrid");
						},
						cellSave: function(event, ui) {
							// 수정된 행에 rowType 추가
							let rowIndx = ui.rowIndx,
								rowData = grdID.getRowData({ rowIndx }),
								rowType = rowData.rowType;

							if (rowType !== "I") {
								rowData.rowType = "M"; // rowData 객체의 rowType을 직접 "M"으로 설정
								// saveGrid에서 동일한 pq_ri를 가진 객체의 인덱스를 찾기
								let index = saveGrid.findIndex(function(item) {
									return item.pq_ri === rowData.pq_ri;
								});
								// console.log("cellSave index ::: ", index);
								// console.log("cellSave rowData ::: ", rowData);

								if (index !== -1) {
									// 기존 객체가 있으면 해당 객체를 업데이트
									saveGrid[index] = rowData;
								} else {
									// 기존 객체가 없으면 새로 추가
									saveGrid.push(rowData);
								}
								chkGrd(grdID);
							} else {
								rowData.rowType = rowType; // rowType이 "I"인 경우 그대로 유지
							}
						},
						toolbar: excSch_toolbar,
					},
				];
				setPqGrid(pqGridObjs);
				excSch = $("#excSchGrid").pqGrid("instance");
				$("#excSchGrid .pq-toolbar .ui-button").attr(
					"id",
					"download-file-TB07050S"
				); //엑셀 다운로드 버튼 id부여
				break;
			default:
				break;
		}
	}

	// 실행일련번호 조회
	function srchExcSn(e) {
		if (scxDcd === "02") {
			// 원금상환스케줄
			$("#prnaRdmpSchGrid").pqGrid("instance").setData([]);
		} else if (scxDcd === "04") {
			// 이자상환스케줄
			$("#intrRdmpSchGrid").pqGrid("instance").setData([]);
		} else if (scxDcd === "01") {
			// 실행스케줄
			$("#excSchGrid").pqGrid("instance").setData([]);
			$("#TB07050S_excSn").html("");
			$("#TB07050S_excSn").attr("disabled", true);
			srch();
			return;
		}
		let prdtCd = e,
			obj = {};

		if (!isEmpty(prdtCd)) {
			$("#TB07050S_excSn").attr("disabled", false);
		}

		obj = {
			prdtCd,
			scxDcd,
		};

		// if ( scxDcd === '02' ) {
		//     prnaRdmpSch.setData({});
		// }

		$.ajax({
			type: "POST",
			url: "/TB07050S/srchExcSn",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(obj),
			dataType: "json",
			success: function(data) {
				$("#btnSrch").attr("disabled", false);
				$("#TB07050S_excSn").html("");
				let html = "";
				if (data.length > 0) {
					data.forEach((item) => {
						html +=
							'<option value="' +
							item.EXC_SN +
							'">' +
							item.EXC_SN +
							"</option>";
					});
					$("#TB07050S_excSn").append(html);
				} else {
					$("#TB07050S_excSn").attr("disabled", true);
					if (scxDcd === "01") {
						$("#btnSrch").attr("disabled", false);
					} else {
						$("#btnSrch").attr("disabled", true);
					}
				}

				srch();
			},
		});
	}

	// 조회
	function srch() {
		fValid = "0";

		if (scxDcd === "02") {
			prnaRdmpSch.setData([]);
			prnaRdmpSch.refreshDataAndView();
		} else if (scxDcd === "04") {
			intrRdmpSch.setData([]);
			intrRdmpSch.refreshDataAndView();
		} else if (scxDcd === "01") {
			excSch.setData([]);
			excSch.refreshDataAndView();
		}

		// 유효성검증
		if (validation().isValid) {
			let prdtCd = validation().prdtCd,
				excSn = $("#TB07050S_excSn").val();

			let obj = {
				prdtCd,
				scxDcd,
				excSn,
			};

			$.ajax({
				type: "POST",
				url: "/TB07050S/getPrnaRdmpSch",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify(obj),
				dataType: "json",
				success: function(data) {
					if (!data.prdtCd) {
						sf(1, "warning", `조회된 데이터가 없습니다.`, "Warning!", () => {
							resetAll('TB07050S', TB07050Sjs.resetMore());
						});
						return;
					}
					// console.log(data);

					$("#TB07050S_trOthrDscmNo").val(checkBrnAcno(data.trOthrDscmNo)); // 거래상대방번호
					$("#TB07050S_trOthrDscmNm").val(data.trOthrDscmNm); // 거래상대방명
					$("#TB07050S_E021").val(data.prdtClsfCd); // 기준금리종류코드
					$("#TB07050S_apvlAmt").val(data.apvlAmt ? comma(data.apvlAmt) : 0); // 기업여신승인금액
					$("#TB07050S_E010").val(data.eprzCrdlIndvLmtDcd); // 기업여신개별한도구분코드
					$("#TB07050S_A005").val(data.actsCd); // 대출과목 ? 계정과목코드
					$("#TB07050S_prnaRdmpFrqcMnum").val(data.prnaRdmpFrqcMnum); // 원금상환주기개월수
					$("#TB07050S_intrRdmpFrqcMnum").val(data.intrRdmpFrqcMnum); // 이자상환주기개월수
					$("#TB07050S_R023").val(data.rqsKndCd); // 기업여신신청종류코드
					$("#TB07050S_I027").val(data.trCrryCd); // 통화코드
					$("#TB07050S_S003").val(data.stdrIntrtKndCd); // 기준금리종류코드
					$("#TB07050S_stdrIntrt").val(data.stdrIntrt); // 기준금리
					$("#TB07050S_addIntrt").val(data.addIntrt); // 가산금리
					$("#TB07050S_E020").val(data.paiRdmpDcd); // 기업여신원리금상환구분코드
					$("#TB07050S_E011").val(data.intrBnaoDcd); // 이자선후취구분코드
					$("#TB07050S_ctrcDt").val(formatDate(data.ctrcDt)); // 약정일자
					$("#TB07050S_ctrcExpDt").val(formatDate(data.ctrcExpDt)); // 약정만기일자
					$("#TB07050S_eprzCrdlCtrcAmt").val(comma(data.eprzCrdlCtrcAmt)); // 기업여신약정금액
					$("#TB07050S_rgstDt").val(formatDate(data.rgstDt));

					if (scxDcd === "02") {
						// 원금상환스케줄
						prnaRdmpSch.setData(data.rdmpPlanList);
						grdInf();
						prnaRdmpSchLen = prnaRdmpSch.getData().length;
					} else if (scxDcd === "04") {
						// 이자상환스케줄
						// console.log("이자상환 ::: ", data.intrtPlanList);
						intrRdmpSch.setData(data.intrtPlanList);
						grdInf();
						intrRdmpSchLen = intrRdmpSch.getData().length;
					} else if (scxDcd === "01") {
						// 실행스케줄
						excSch.setData(data.excSchList);
						grdInf();
						excSchLen = excSch.getData().length;
					}
				},
				error: function(result) {
					sf(1, "warning", `조회조건이 맞지 않습니다.`, "Warning!", () => {
						resetAll('TB07050S', TB07050Sjs.resetMore());
					});
					return;
				},
			});
		} else {
		}
	}

	// 저장
	function save() {

		fValid = "1";

		if (validation().isValid) {

			let obj = {},
				prdtCd = validation().prdtCd,
				rdmpPlanList,
				intrtPlanList;

			if (scxDcd === "02") {
				// 원금상환스케줄

				rdmpPlanList = chkGrd(grdID);

				rdmpPlanList.forEach((ele) => {
					ele.excSn = $("#TB07050S_excSn").val();
				});

				obj = {
					prdtCd,
					scxDcd,
					rdmpPlanList,
				};

			} else if (scxDcd === "04") {
				// 이자상환스케줄
				intrtPlanList = chkGrd(grdID);

				intrtPlanList.forEach((ele) => {
					ele.excSn = $("#TB07050S_excSn").val();
				});

				obj = {
					prdtCd,
					scxDcd,
					intrtPlanList,
				};

			} else if (scxDcd === "01") {

				excSchList = chkGrd(grdID);

				for (let i = 0; i < excSchList.length; i++) {
					const ele = excSchList[i];

					if (ele.rowType !== "D") {
						if (!ele.prarDt) {
							sf(1, "warning", "예정일자를 입력해주세요.", "Warning!");
							return;
						}
						if (!ele.prarPrna) {
							sf(1, "warning", "예정원금을 입력해주세요.", "Warning!");
							return;
						}
					}
				}
				obj = {
					prdtCd,
					scxDcd,
					excSchList,
				};
			}

			if (saveGrid.length === 0) {
				sf(1, "warning", "실행 할 정보가 없거나 체크박스를 확인해주세요.", "Warning!");
				return;
			}

			$.ajax({
				type: "POST",
				url: "/TB07050S/savePrnaRdmpSch",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify(obj),
				dataType: "json",
				success: function(data) {
					if (data > 0) {
						sf(1, "success", "실행이 완료됐습니다.", "Success!", (result) => {
							if (result.isConfirmed) {
								srchExcSn(validation().prdtCd);
								//srch();
								saveGrid = [];
							}
						});
					} else {
						sf(1, "error", "실행에 실패하였습니다.", "Error!");
					}
				},
			});
		}
	}

	/*******************************************************************
	 * validation
	 *******************************************************************/
	function validation() {
		let prdtCd = $("#TB07050S_prdtCd").val(); // 종목코드
		if (isEmpty(prdtCd)) {
			sf(1, "warning", "종목코드를 입력해주세요.", "Warning!", () => {
				resetAll('TB07050S', TB07050Sjs.resetMore());
			});
			return { isValid: false };
		}

		return { isValid: true, prdtCd };
	}


	// 스케줄선택 ::: 02. 원금상환스케줄 04. 이자상환스케줄 01. 실행스케줄
	$('input[name="TB07050S_scxDcd"]').on("input", function() {
		const selVal = $(this).val(); // 일정구분코드
		scxDcd = $(this).val(); // 일정구분코드 selectVal binding
		// console.log(selVal);

		let prdtCd = $("#TB07050S_prdtCd").val(); // 종목코드
		let excSn = $("#TB07050S_excSn").val();   //실행일련번호

		// prnaRdmpSch; // 원금상환스케줄
		// intrRdmpSch; // 이자상환스케줄
		// excSch; // 실행스케줄
		switch (selVal) {
			case "02": // 원금상환스케줄 prnaRdmpSch
				if (intrRdmpSch) {
					intrRdmpSch.destroy();
					intrRdmpSch = "";
				}
				if (excSch) {
					excSch.destroy();
					excSch = "";
				}

				pqGrid("02");
				grdInf();

				if (!isEmpty(prdtCd)) {
					srchExcSn(prdtCd);
				} else {
					$("#TB07050S_excSn").html("");
					$("#TB07050S_excSn").attr("disabled", true);
					resetAll("TB07050S");
				}

				break;

			case "04": // 이자상환스케줄 intrRdmpSch
				if (prnaRdmpSch) {
					prnaRdmpSch.destroy();
					prnaRdmpSch = "";
				}
				if (excSch) {
					excSch.destroy();
					excSch = "";
				}

				pqGrid("04");
				grdInf();

				if (!isEmpty(prdtCd)) {
					srchExcSn(prdtCd);
				} else {
					$("#TB07050S_excSn").html("");
					$("#TB07050S_excSn").attr("disabled", true);
					resetAll("TB07050S");
				}

				break;
			case "01": // 실행스케줄 excSch
				if (intrRdmpSch) {
					intrRdmpSch.destroy();
					intrRdmpSch = "";
				}
				if (prnaRdmpSch) {
					prnaRdmpSch.destroy();
					prnaRdmpSch = "";
				}

				pqGrid("01");
				grdInf();

				if (!isEmpty(prdtCd)) {
					srchExcSn(prdtCd);
				} else {
					$("#TB07050S_excSn").html("");
					$("#TB07050S_excSn").attr("disabled", true);
					resetAll("TB07050S");
				}

				break;
			default:
				break;
		}
		// 결과를 표시할 요소의 내용을 업데이트
		// $('#result').text(`Selected option: ${selectedOption}`);
	});

	// + - Event
	function gridEvt(p) {
		switch (p) {
			case "p":
				if (scxDcd === "02" && validation().isValid) {
					//let grd = prnaRdmpSch.getData();
					let newRow = {
						rowType: "I",
						prarPrna: "0",
					};
					//let gLen = grd.length;

					grdID.addRow({
						rowIndx: prnaRdmpSchLen + 1,
						rowData: newRow,
						checkEditable: false,
					});
					chkGrd(grdID);
				}

				if (scxDcd === "04" && validation().isValid) {
					//let grd = prnaRdmpSch.getData();
					let newRow = {
						rowType: "I",
						rdmpPrarIntr: 0,
						prarPrna: 0,
					};
					//let gLen = grd.length;
					grdID.addRow({
						rowIndx: intrRdmpSchLen + 1,
						rowData: newRow,
						checkEditable: false,
					});
					chkGrd(grdID);
				}

				if (scxDcd === "01" && validation().isValid) {
					//let grd = prnaRdmpSch.getData();
					let newRow = {
						rowType: "I",
					};
					//let gLen = grd.length;
					grdID.addRow({
						rowIndx: excSchLen + 1,
						rowData: newRow,
						checkEditable: false,
					});
					chkGrd(grdID);
				}

				break;
			case "m":
				if (validation().isValid) {
					// console.log(grdData);
					let filteredIndexes = [];

					grdData.forEach((item, index) => {
						if (item.chk) {
							if (item.rowType !== "I" && item.rowType !== "D") {
								item.rowType = "D";
								saveGrid.push(item);
							}
							filteredIndexes.push(index);
						}
					});
					// 구한 인덱스들을 삭제합니다. 뒤에서부터 삭제해야 인덱스가 꼬이지 않습니다.
					filteredIndexes
						.sort((a, b) => b - a)
						.forEach((index) => {
							grdID.deleteRow({ rowIndx: index });
						});
				}
				break;
			default:
				break;
		}
	}

	// grd
	function resetMore() {
		$("#TB07050S_excSn").html("");
		$("#TB07050S_excSn").attr("disabled", true);

		let grdList;

		if (scxDcd === "02") {
			grdList = ["prnaRdmpSchGrid"];
		} else if (scxDcd === "04") {
			grdList = ["intrRdmpSchGrid"];
		} else if (scxDcd === "01") {
			grdList = ["excSchGrid"];
		}

		return grdList;
	}

	// 체크된 grid
	function chkGrd(p) {
		let data = p.getData(); // 그리드 데이터

		let addedIndx = new Set(saveGrid.map((item, index) => index));

		for (let i = 0; i < data.length; i++) {
			const chkData = data[i];

			if (
				chkData.chk &&
				!addedIndx.has(i) &&
				!saveGrid.some((item) => item === chkData)
			) {
				saveGrid.push(chkData);
			}
		}

		// chk가 없는 항목을 saveGrid에서 제거
		saveGrid = saveGrid.filter((item) => {
			const isPresentInData = data.some(
				(dataItem) => dataItem === item && dataItem.chk
			);
			return isPresentInData || item.rowType === "D";
		});

		// rowData가 null인 항목 제거
		saveGrid = saveGrid.filter((item) => item.rowType !== null);

		return saveGrid;
	}

	// grdID, grdData binding...

	function grdInf() {
		// prnaRdmpSch; // 원금상환스케줄
		// intrRdmpSch; // 이자상환스케줄
		// excSch; // 실행스케줄
		if (scxDcd === "02") {
			grdID = prnaRdmpSch;
			grdData = prnaRdmpSch.getData();
		} else if (scxDcd === "04") {
			grdID = intrRdmpSch;
			grdData = intrRdmpSch.getData();
		} else if (scxDcd === "01") {
			grdID = excSch;
			grdData = excSch.getData();
		}
	}

	/*******************************************************************
	 * Excel
	 *******************************************************************/
	// 엑셀 다운로드 버튼 클릭 시
	$("#exelDown").click(function() {
		var scxDcdVal = $('input:radio[name="TB07050S_scxDcd"]:checked').val();
		if (scxDcdVal == '02') {
			if (prnaRdmpSch.getData().length == 0) {
				var rowData = {
					'chk': 0,
					'prarDt': "",
					'prarPrna': "",
					'prcsDt': "",
					'prcsAmt': "",
					'prcsCpltYn': "",
				}
				$("#prnaRdmpSchGrid").pqGrid("addRow", { rowData: rowData, checkEditable: false });
				$("#download-file-TB07050S").click();
				prnaRdmpSch.deleteRow({ rowIndx: 1 });
			} else {
				$("#download-file-TB07050S").click();
			}
		} else if (scxDcdVal == '04') {
			if (intrRdmpSch.getData().length == 0) {
				var rowData = {
					'chk': 0,
					'strtDt': "",
					'endDt': "",
					'aplyIrt': "",
					'trgtAmt': "",
					'rdmpPrarIntr': "",
					'prcsCpltYn': "",
				}
				$("#intrRdmpSchGrid").pqGrid("addRow", { rowData: rowData, checkEditable: false });
				$("#download-file-TB07050S").click();
				intrRdmpSch.deleteRow({ rowIndx: 1 });
			} else {
				$("#download-file-TB07050S").click();
			}
		} else if (scxDcdVal == '01') {
			if (excSch.getData().length == 0) {
				var rowData = {
					'chk': 0,
					'prarDt': "",
					'prarPrna': "",
				}
				$("#excSchGrid").pqGrid("addRow", { rowData: rowData, checkEditable: false });
				$("#download-file-TB07050S").click();
				excSch.deleteRow({ rowIndx: 1 });
			} else {
				$("#download-file-TB07050S").click();
			}
		}
	});

	// 업로드 버튼 클릭 시
	$("#exelUp").click(function() {

		if (validation().prdtCd) {
			$("#upload-file-input-TB07050S").click();
		}
	});

	$("#upload-file-input-TB07050S").change(function() {
		var mode = "multi";
		readExcel_TB07050S();
		resetFileInput($("#upload-file-input-TB07050S"));
	});

	//엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
	function resetFileInput($element) {
		$element.wrap("<form>").closest("form").get(0).reset();
		$element.unwrap();
	}

	//엑셀 파일 읽기
	function readExcel_TB07050S() {
		let input = event.target;
		let reader = new FileReader();
		reader.onload = function() {
			let data = reader.result;
			let workBook = XLSX.read(data, { type: "binary" });
			workBook.SheetNames.forEach(function(sheetName) {
				let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
					raw: false,
					dateNF: "yyyy-mm-dd",
				});

				//alert(JSON.stringify(rows));
				//console.log("Exel up scxDcd === ", scxDcd);
				if (scxDcd === "02") {
					addPrRows(rows);
				} else if (scxDcd === "04") {
					addIrRows(rows);
				} else if (scxDcd === "01") {
					addExcRows(rows);
				}
			});
		};
		reader.readAsBinaryString(input.files[0]);
	}

	// 원금상환스케줄
	function addPrRows(rows) {
		prnaRdmpSch.setData([]); // 초기화

		rows.forEach(function(row) {
			let prarDt = row["상환예정일자"],
				prarPrna = row["상환예정원금"],
				prcsCpltYn = row["처리완료여부"],
				prcsDt = row["상환일자"],
				prcsAmt = row["상환원금"];

			let newRow = {
				rowType: "I",
				prarDt: unformatDate(prarDt),
				prarPrna: prarPrna,
				prcsDt: unformatDate(prcsDt),
				prcsAmt: prcsAmt,
				prcsCpltYn: prcsCpltYn,
			};
			prnaRdmpSch.addRow({ rowData: newRow, checkEditable: false });
		});
		prnaRdmpSch.refreshDataAndView();
	}

	// 이자상환스케줄
	function addIrRows(rows) {
		intrRdmpSch.setData([]); // 초기화

		rows.forEach(function(row) {
			let strtDt = row["시작일"],
				endDt = row["종료일"],
				aplyIrt = row["이자율(%)"],
				prarPrna = row["대상금액"],
				rdmpPrarIntr = row["이자금액"],
				prcsCpltYn = row["처리완료여부"];

			let newRow = {
				rowType: "I",
				strtDt: unformatDate(strtDt),
				endDt: unformatDate(endDt),
				aplyIrt: aplyIrt,
				prarPrna: prarPrna,
				rdmpPrarIntr: rdmpPrarIntr,
				prcsCpltYn: prcsCpltYn,
				prcsCpltYn: "N",
			};
			intrRdmpSch.addRow({ rowData: newRow, checkEditable: false });
		});
		intrRdmpSch.refreshDataAndView();
	}

	// 실행스케줄
	function addExcRows(rows) {
		excSch.setData([]); // 초기화

		rows.forEach(function(row) {
			let prarDt = row["예정일자"],
				prarPrna = row["예정원금"];

			let newRow = {
				rowType: "I",
				prarDt: unformatDate(prarDt),
				prarPrna,
			};
			excSch.addRow({ rowData: newRow, checkEditable: false });
		});
		excSch.refreshDataAndView();
	}

	$("#TB07050S_excSn").on("change", function() {
		srch();
	});

	// swal.fire
	function sf(flag, icon, html, title = "", callback = () => { }) {
		if (flag === 1) {
			Swal.fire({
				icon: `${icon}`,
				html: `${html}`,
				title: `${title}`,
				confirmButtonText: "확인",
			}).then(callback);
		}

		if (flag === 2) {
			Swal.fire({
				icon: `${icon}`,
				html: `${html}를(을) 확인해주세요.`,
				title: `${title}`,
				confirmButtonText: "확인",
			}).then(callback);
		}
	}

	return {
		srch: srch,
		resetMore: resetMore,
		gridEvt: gridEvt,
		save: save,
		srchExcSn: srchExcSn,
	};
})();
