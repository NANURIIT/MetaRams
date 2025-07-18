const TB07090Sjs = (function() {

	let TB07090S_rowData = {};
	const TB07090S_dummyData = TB07090S_rowData;

	let loginUsrId;
	let loginUsrNm;
	let loginUsrDprtCd;
	let loginUsrDprtNm;

	let selected_rdmpPrarDtl = null;
	let selected_dptrRgstDtl = null;
	let colModel2_rowIndx = null;
	let colModel3_rowIndx = null;
	let colModel3_dealRctmAmt = 0;

	let TB07090S_rowIndx;
	let TB07090S_pqGridLength = 0;
	let selectBox;
	let fnltList = []; //기관 list
	let grdSelect = {};
	let dprtList = {}; //부서코드
	let crryCdList = {}; //통화코드
	let fndsDcdList = {}; //자금구분코드
	let scxDcdList = {}; //상환구분코드
	let rdptObjtDvsnCdList = {}; //상환대상구분코드
	let rctmDtlsRgstDeleteList = [];
	let rctmDtlsMappingDeleteList = [];


	$(document).ready(function() {
		loadUserAuth(); //로그인유저정보
		selectBoxSet_TB07090S();
		getDealInfoFromWF();
		resetAll();

		chkValFromToDt("TB07090S_fromDate", "TB07090S_toDate");

		$("#TB07090S_conSrch").find('input, select').on('input', function() {
			resetPGgrids("TB07090S")
		})

	});

	function loadUserAuth() {
		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function(data) {
				loginUsrId = data.eno;
				loginUsrNm = data.empNm;
				loginUsrDprtCd = data.dprtCd;
				loginUsrDprtNm = data.dprtNm;
			},
			error: function(request, status, error) {
			},
		});
	}

	function getFnltList() {
		$.ajax({
			type: "GET",
			url: "/getFnltList",
			data: "",
			dataType: "json",
			success: function(data) {
				result = data;
				if (result.length > 0) {
					$.each(result, function(key, value) {
						var fnlt = {
							fnltCd: value.fnltCd,
							fnltNm: value.fnltNm,
						};
						fnltList.push(fnlt);
					});
				}
			},
		});
	}

	function selectBoxSet_TB07090S() {
		selectBox = getSelectBoxList(
			"TB07090S",
			"E020/D010/I027/F008/S001/R038",
			false
		);

		dprtList = selectBox.filter(function(item) { return item.cmnsGrpCd === "D010"; });
		crryCdList = selectBox.filter(function(item) { return item.cmnsGrpCd === "I027"; });
		fndsDcdList = selectBox.filter(function(item) { return item.cmnsGrpCd === "F008"; });
		scxDcdList = selectBox.filter(function(item) { return item.cmnsGrpCd === "S001"; });
		rdptObjtDvsnCdList = selectBox.filter(function(item) { return item.cmnsGrpCd === "R038"; });

		getFnltList();

		dprtList.forEach((item) => {
			$("#TB07090S_dprtNm").append(
				$("<option>", {
					value: item.cdValue,
					text: `${item.cdName}`,
				})
			);
		});

		let TB07090S_colModel1 = [
			{
				title: "체크",
				dataType: "checkbox",
				dataIndx: "chk",
				align: "center",
				minWidth: 36,
				maxWidth: 36,
				type: "checkBoxSelection",
				editable: function(ui) {

					return (ui.rowData.pmntPrarAmt > ui.rowData.dealRctmAmt);
				},
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				cb: {
					all: true,
					header: true,
					check: "Y",
					uncheck: "N",
				},
			},
			{
				title: "Deal번호",
				dataType: "string",
				dataIndx: "dealNo",
				halign: "center",
				align: "center",
				width:"165",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				halign: "center",
				align: "center",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "실행일련번호",
				dataType: "string",
				dataIndx: "excSn",
				halign: "center",
				align: "center",
				width: "100",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "상환예정일자",
				dataType: "string",
				dataIndx: "prarDt",
				halign: "center",
				align: "center",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				},
			},
			{
				title: "상환구분",
				dataType: "string",
				dataIndx: "scxDcd",
				halign: "center",
				align: "center",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var options = rdptObjtDvsnCdList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "상환회차",
				dataType: "string",
				dataIndx: "rdmpTmrd",
				halign: "center",
				align: "center",
				width: "80",
				filter: { crules: [{ condition: "range" }] },
			},

			{
				title: "납부예정금액",
				dataType: "integer",
				format: "#,###",
				dataIndx: "pmntPrarAmt",
				halign: "center",
				align: "right",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "딜입금금액",
				dataType: "integer",
				format: "#,###",
				dataIndx: "dealRctmAmt",
				halign: "center",
				align: "right",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "통화",
				dataType: "string",
				dataIndx: "trCrryCd",
				halign: "center",
				align: "center",
				width:"80",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var options = crryCdList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdValue : ui.cellData;
				},
			},
			{
				title: "관리부서",
				dataType: "string",
				dataIndx: "mngmBdcd",
				halign: "center",
				align: "center",
				width:"130",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var options = dprtList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},

		];

		// IBIMS435B
		let TB07090S_colModel2 = [
			{
				title: "체크",
				dataType: "checkbox",
				dataIndx: "chk",
				align: "center",
				minWidth: 36,
				maxWidth: 36,
				type: "checkBoxSelection",
				editable: function(ui) {
					if (ui.rowData != null) {
						return (ui.rowData.pmntPrarAmt < ui.rowData.dealRctmAmt);
					}

				},
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				cb: {
					all: true,
					header: true,
					check: "Y",
					uncheck: "N",
				},
			},
			{
				title: "입금일자",
				dataType: "string",
				dataIndx: "rctmDt",
				halign: "center",
				align: "center",
				width: "130",
				editable: true,
				render: function(ui) {
					return formatDate(ui.cellData);
				}
			},
			{
				title: "등록순번",
				editable: false,
				dataType: "string",
				dataIndx: "rgstSeq",
				halign: "center",
				align: "center",
				width: "80",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "자금구분",
				dataType: "string",
				dataIndx: "fndsDvsnCd",
				halign: "center",
				align: "center",
				width: "150",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: fndsDcdList,
				},
				render: function(ui) {
					var options = fndsDcdList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "입금완료금액",
				dataType: "integer",
				format: "#,###",
				dataIndx: "pmntPrarAmt",
				halign: "center",
				align: "right",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "입금금액",
				dataType: "integer",
				format: "#,###",
				dataIndx: "dealRctmAmt",
				halign: "center",
				align: "right",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "이체기관",
				dataType: "string",
				dataIndx: "reltIsttCd",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "fnltCd",
					labelIndx: "fnltNm",
					options: fnltList,
				},
				render: function(ui) {
					var options = fnltList;
					var option = options.find((opt) => opt.fnltCd == ui.cellData);
					return option ? option.fnltNm : ui.cellData;
				},
			},
			{
				title: "계좌번호",
				dataType: "string",
				dataIndx: "reltBano",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "입금자",
				dataType: "string",
				dataIndx: "dptrNm",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록부서",
				editable: false,
				dataType: "string",
				dataIndx: "rgstBdcd",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: dprtList,
				},
				render: function(ui) {
					var options = dprtList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "등록자",
				editable: false,
				dataType: "string",
				dataIndx: "hndEmpno",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일시",
				editable: false,
				dataType: "string",
				dataIndx: "hndDetlDtm",
				halign: "center",
				align: "center",
				width: "150",
				filter: { crules: [{ condition: "range" }] },
			},

		];

		let TB07090S_colModel3 = [
			{
				title: "체크",
				dataType: "checkbox",
				dataIndx: "chk",
				align: "center",
				minWidth: 36,
				maxWidth: 36,
				type: "checkBoxSelection",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				cb: {
					all: true,
					header: true,
					check: "Y",
					uncheck: "N",
				},
			},
			{
				title: "입금일자",
				dataType: "string",
				dataIndx: "rctmDt",
				halign: "center",
				align: "center",
				width:"130",
				editable: true,
				editor: false,
				render: function(ui) {
					return formatDate(ui.cellData);
				}
			},
			{
				title: "등록순번",
				dataType: "string",
				dataIndx: "rctmSeq",
				halign: "center",
				align: "center",
				width:"100",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "Deal번호",
				dataType: "string",
				dataIndx: "dealNo",
				halign: "center",
				align: "center",
				width:"165",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				halign: "center",
				align: "center",
				width:"150",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "실행일련번호",
				dataType: "string",
				dataIndx: "excSn",
				halign: "center",
				align: "center",
				width: "100",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "상환예정일자",
				dataType: "string",
				dataIndx: "prarDt",
				halign: "center",
				align: "center",
				width: "130",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var cellData = ui.cellData;
					if (cellData && cellData.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				},
			},
			{
				title: "상환구분",
				dataType: "string",
				dataIndx: "scxDcd",
				halign: "center",
				align: "center",
				width: "130",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: rdptObjtDvsnCdList,
				},
				render: function(ui) {
					var options = rdptObjtDvsnCdList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "딜입금금액",
				dataType: "integer",
				format: "#,###",
				dataIndx: "dealRctmAmt",//DEAL_RCTM_AMT
				halign: "center",
				align: "right",
				width: "130",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "관리부서",
				dataType: "string",
				dataIndx: "mngmBdcd",
				halign: "center",
				align: "center",
				width: "130",
				editable: true,
				editor: false,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var options = dprtList;
					var option = options.find((opt) => opt.cdValue == ui.cellData);
					return option ? option.cdName : ui.cellData;
				},
			},
			{
				title: "납입처리내용",
				editable: true,
				dataType: "string",
				dataIndx: "excsPymtPrcsText",
				halign: "center",
				align: "left",
				width: "200",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록자",
				editable: false,
				dataType: "string",
				dataIndx: "hndEmpno",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일시",
				editable: false,
				dataType: "string",
				dataIndx: "hndDetlDtm",
				halign: "center",
				align: "center",
				width: "130",
				filter: { crules: [{ condition: "range" }] },
			},

		];

		pqGrid_TB07090S(TB07090S_colModel1, TB07090S_colModel2, TB07090S_colModel3);
	}

	$("#TB07090S_dprtNm").on("change", function() {
		var dprtCd = $(this).val();

		$("#TB07090S_dprtCd").val(dprtCd);
	});


	function pqGrid_TB07090S(col1, col2, col3) {

		let pqGridObjs = [
			{
				height: 200,
				maxHeight: 200,
				id: "TB07090S_colModel1",
				colModel: col1,
				scrollModel: { autoFit: true },
				editable: false,
				rowClick: function(evt, ui) {
					selected_rdmpPrarDtl = ui.rowData;
					pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel1");
				},

			},
			{
				height: 200,
				maxHeight: 200,
				id: "TB07090S_colModel2",
				colModel: col2,
				scrollModel: { autoFit: true },
				editable: true,
				cellClick: function(evt, ui) {

					if (ui.column.dataIndx === "pmntPrarAmt") {
						ui.column.editable = false;
					}
					else if (ui.rowData.hndDetlDtm && ui.column.dataIndx === "rctmDt") {
						ui.column.editable = false;
					}
					else if (!ui.rowData.hndDetlDtm && ui.column.dataIndx === "rctmDt") {
						ui.column.editable = true;
					}

					if (ui.column.dataIndx === "delYn") {

					}
					else {
						colModel2_rowIndx = ui.rowIndx;
						selected_dptrRgstDtl = ui.rowData;
						pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel2");
					}
				},
				cellSave: function(evt, ui) {
					if (ui.dataIndx === "dealRctmAmt") {
						// 입금금액 설정 validation
						if (ui.rowData.pmntPrarAmt > ui.newVal) {
							Swal.fire({
								icon: 'warning'
								, title: 'Warning!'
								, text: '입금금액을 납부예정금액보다 낮게 설정하실 수 없습니다!'
							})
							$('#TB07090S_colModel2').pqGrid('instance').pdata[ui.rowIndx].dealRctmAmt = ui.oldVal;
							$('#TB07090S_colModel2').pqGrid('instance').refresh();
						}
					}
				}
			},
			{
				height: 200,
				maxHeight: 200,
				id: "TB07090S_colModel3",
				colModel: col3,
				scrollModel: { autoFit: true },
				editable: true,
				cellClick: function(event, ui) {
					if (ui.column.dataIndx === "delYn") {

					}
					else {
						pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel3");
					}
				},
				cellSave: function(evt, ui) {
					if (ui.dataIndx === "dealRctmAmt") {
						const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid("instance").pdata;

						let updateIndx;
						for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {
							if (rctmDtlsMappingGridData[i].rctmDt === ui.rowData.rctmDt
								&& rctmDtlsMappingGridData[i].rgstSeq === Number(ui.rowData.rgstSeq)
							) {
								updateIndx = i;
								break;
							}
						}

						let prevPrarAmt = $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt;
						$('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt = Number($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt) - Number(ui.oldVal) + Number(ui.newVal);

						if ($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt > $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].dealRctmAmt) {
							$('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt = prevPrarAmt;
							Swal.fire({
								icon: "warning"
								, title: "Warning!"
								, text: "납부예정금액은 입금금액보다 적어야합니다!"
							})
							$('#TB07090S_colModel3').pqGrid('instance').pdata[ui.rowIndx].dealRctmAmt = ui.oldVal
							$('#TB07090S_colModel3').pqGrid("instance").refresh();
						}
						else {
							$('#TB07090S_colModel2').pqGrid("instance").refresh();
						}
					}
				}
			},
		];
		setPqGrid(pqGridObjs);
	}

	var dateEditor_feeSch = function(ui) {

		ui.$cell.find("input").on("input", function() {
			let temVal;
			temVal = replaceAll($(this).val(), '-', '');
			if (temVal.length === 8) {
				temVal = formatDate(temVal);

				$(this).val(temVal);
			} else if (temVal.length > 8) {
				$(this).val(formatDate(temVal.slice(0, 8)));
			}
		})
			.datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yyyy-mm-dd',
				keyboardNavigation: false,
				forceParse: false,
				calendarWeeks: false,
				language: "ko",
			});
	}

	/**
	 * 뭔지모를 요건을 받은 김건우버전
	 */
	function search_TB07090S() {
		var rctmDt = $("#TB07090S_rctmDt").val(); //입금일자
		var option = {};
		option.title = "Warning";
		option.type = "warn";

		businessFunction(rctmDt);

		function businessFunction(rctmDt) {
			var dealNo = $("#TB07090S_ibDealNo").val(); //딜번호
			var dprtCd = $("#TB07090S_dprtCd").val(); //관리부서코드
			var fromDt = $("#TB07090S_fromDate").val(); //상환예정일자 (조회 시작일)
			var toDt = $("#TB07090S_toDate").val(); //상환예정일자 (조회 종료일)

			var param = {
				rctmDt: rctmDt.replaceAll("-", ""),
				dealNo: dealNo,
				dprtCd: dprtCd,
				fromDt: fromDt.replaceAll("-", ""),
				toDt: toDt.replaceAll("-", ""),
			};
			inq(param);
		}
	}

	//조회
	function inq(param) {
		$.ajax({
			type: "POST",
			url: "/TB07090S/getDprtDtlsInfo",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(param),
			dataType: "json",
			beforeSend: function() {
				$("#TB07090S_colModel1").pqGrid(
					"option",
					"strNoRows",
					"조회 중입니다..."
				);
				$("#TB07090S_colModel2").pqGrid(
					"option",
					"strNoRows",
					"조회 중입니다..."
				);
				$("#TB07090S_colModel3").pqGrid(
					"option",
					"strNoRows",
					"조회 중입니다..."
				);
			},
			success: function(data) {
				var rdmpPrarDtlsList = data.rdmpPrarDtlsList;
				var rctmDtlsList = data.rctmDtlsList;
				var dptrDtlsList = data.dprtDtlsList;
				deleteList = [];

				if (
					rdmpPrarDtlsList.length < 1 &&
					rctmDtlsList.length < 1 &&
					dptrDtlsList.length < 1
				) {
					var option = {};
					option.title = "Warning!";
					option.type = "warning";

					option.text = "조회된 데이터가 없습니다.";
					openPopup(option);
				}

				var options = [
					{
						gridNm: "TB07090S_colModel1",
						data: rdmpPrarDtlsList,
					},
					{
						gridNm: "TB07090S_colModel2",
						data: rctmDtlsList,
					},
					{
						gridNm: "TB07090S_colModel3",
						data: dptrDtlsList,
					},
				];
				pqGridSetData(options);
			},
		});

		rctmDtlsRgstDeleteList = [];
		rctmDtlsMappingDeleteList = [];
		selected_rdmpPrarDtl = null;    // 상환예정내역
		selected_dptrRgstDtl = null;    // 입금증등록내역
		TB07090S_rowData = {};          // 입금내역매핑

	}

	/**
	 * 입금내역매핑 추가
	 */
	function TB07090S_addRow() {
		if (!selected_rdmpPrarDtl) {
			swal.fire({
				icon: "warning"
				, text: "상환예정내역을 선택해주세요."
			})
			return;
		}
		else if (!selected_dptrRgstDtl) {
			swal.fire({
				icon: "warning"
				, text: "입금증등록내역을 선택해주세요."
			})
			return;
		}
		else if (selected_dptrRgstDtl && !selected_dptrRgstDtl.hndDetlDtm) {
			swal.fire({
				icon: "warning"
				, title: "Warning!"
				, text: "등록된 입금증등록내역을 선택해주세요."
			})
			return;
		}

		let row = [];
		let newRow = {};
		const data = $('#TB07090S_colModel3').pqGrid("instance");
		const rowColumnsData = data.colModel;
		const length = rowColumnsData.length;
		for (let i = 0; i < length; i++) {
			const title = rowColumnsData[i].title;
			const labelIndx = rowColumnsData[i].labelIndx;
			const dataIndx = rowColumnsData[i].dataIndx;
			row.push(title);

			switch (dataIndx) {
				case "rctmDt":
					newRow[dataIndx] = selected_dptrRgstDtl.rctmDt;
					break;
				case "rctmSeq":
					newRow[dataIndx] = "";
					break;
				case "fndsDvsnCd":
					newRow[dataIndx] = selected_dptrRgstDtl.fndsDvsnCd;
					break;
				case "dealNo":
					newRow[dataIndx] = selected_rdmpPrarDtl.dealNo;
					break;
				case "prdtCd":
					newRow[dataIndx] = selected_rdmpPrarDtl.prdtCd;
					break;
				case "excSn":
					newRow[dataIndx] = selected_rdmpPrarDtl.excSn;
					break;
				case "trSn":
					newRow[dataIndx] = selected_rdmpPrarDtl.trSn;
					break;
				case "rdptObjtDvsnCd":
					newRow[dataIndx] = selected_rdmpPrarDtl.scxDcd;
					break;
				case "rdmpTmrd":
					newRow[dataIndx] = selected_dptrRgstDtl.rdmpTmrd;
					break;
				case "excsPymtPrcsDvsnCd":
					newRow[dataIndx] = "";
					break;
				case "pmntPrarAmt":
					newRow[dataIndx] = selected_rdmpPrarDtl.pmntPrarAmt;
					break;
				case "dealRctmAmt":
					newRow[dataIndx] = selected_rdmpPrarDtl.pmntPrarAmt;
					break;
				case "reltIsttCd":
					newRow[dataIndx] = selected_dptrRgstDtl.reltIsttCd;
					break;
				case "reltIsttNm":
					newRow[dataIndx] = fnltList.find(bank => bank.fnltCd === selected_dptrRgstDtl.reltIsttCd).fnltNm;
					break;
				case "reltBano":
					newRow[dataIndx] = selected_dptrRgstDtl.reltBano;
					break;
				case "mngmBdcd":
					newRow[dataIndx] = $("#userDprtCd").val();
					break;
				case "dptrNm":
					newRow[dataIndx] = selected_dptrRgstDtl.dptrNm;
					break;
				case "rgstSeq":
					newRow[dataIndx] = selected_dptrRgstDtl.rgstSeq;
					break;
				case "rgstEmpno":
					newRow[dataIndx] = selected_dptrRgstDtl.hndEmpno;
					break;
				case "rgstBdcd":
					newRow[dataIndx] = selected_dptrRgstDtl.rgstBdcd;
					break;
				case "rgstDtm":
					newRow[dataIndx] = selected_dptrRgstDtl.hndDetlDtm;
					break;
			}
		}

		/**
		 * 입금내역매핑 불가능 조건
		 * 1. 이미 등록된 입금내역일 경우
		 * 2. 입금금액이 납부예정금액에 비해 부족한 경우
		*/

		// 매핑하려는 상환대상내역 체크
		const paramData = {
			dealNo: selected_rdmpPrarDtl.dealNo
			, prdtCd: selected_rdmpPrarDtl.prdtCd
			, excSn: selected_rdmpPrarDtl.excSn
			, trSn: selected_rdmpPrarDtl.trSn
			, feeSn: selected_rdmpPrarDtl.feeSn
			, rdmpTmrd: selected_rdmpPrarDtl.rdmpTmrd
			, rdptObjtDvsnCd: selected_rdmpPrarDtl.scxDcd
		}

		const rctmDtlsMappingGridData = $('#TB07090S_colModel3').pqGrid('instance').pdata

		const chkRctmDtlsMapping = () => {

			let result = false;
			for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {

				if (
					/* 딜번호! */
					rctmDtlsMappingGridData[i].dealNo == selected_rdmpPrarDtl.dealNo
					/* 종목코드! */
					&& rctmDtlsMappingGridData[i].prdtCd == selected_rdmpPrarDtl.prdtCd
					/* 실행일련번호! */
					&& Number(rctmDtlsMappingGridData[i].excSn) == Number(selected_rdmpPrarDtl.excSn)
					/* 거래일련번호! */
					&& Number(rctmDtlsMappingGridData[i].trSn) == Number(selected_rdmpPrarDtl.trSn)
					/* 수수료일련번호! */
					&& Number(rctmDtlsMappingGridData[i].feeSn) == Number(selected_rdmpPrarDtl.feeSn)
					/* 상환회차! */
					&& Number(rctmDtlsMappingGridData[i].rdmpTmrd) == Number(selected_rdmpPrarDtl.rdmpTmrd)
					/* 상환형태?구분코드! */
					&& rctmDtlsMappingGridData[i].rdptObjtDvsnCd == selected_rdmpPrarDtl.scxDcd
				) {
					result = true;
					break;
				}
			}
			return result;
		}


		$.ajax({
			type: "POST",
			url: "/TB07090S/chkRctmDtlsMapping",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data != 0) {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "이미 매핑된 내역입니다!"
					})
					return;
				}
				else if (chkRctmDtlsMapping()) {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "이미 매핑된 내역입니다!"
					})
					return;
				}
				else if (Number(selected_dptrRgstDtl.dealRctmAmt) < Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"])) {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "입금금액이 부족합니다!"
					})
					return;
				}
				else {
					$('#TB07090S_colModel3').pqGrid("addRow", {
						rowData: newRow,
						checkEditable: false,
					});
					$('#TB07090S_colModel2').pqGrid("instance").pdata[selected_dptrRgstDtl.pq_ri].pmntPrarAmt = Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"]);
					$('#TB07090S_colModel2').pqGrid("instance").refresh();

				}
			},
		})

	}

	/**
	 * @param {*} colModelSelector 
	 * @param {*} rowIndx 
	 */
	function TB07090S_pqGridDeleteRow(colModelSelector) {

		let rowIndx;

		if (colModelSelector.attr('id') === 'TB07090S_colModel2') {

			let gridData = colModelSelector.pqGrid('instance').pdata;

			let cnt = 0;

			for (let i = gridData.length - 1; i >= 0; i--) {
				if (gridData[i].delYn === "Y") {
					if (gridData[i].pmntPrarAmt != 0 && gridData[i].pmntPrarAmt != undefined) {
						cnt += 1;
					}
					else if (!gridData[i].rgstSeq) {
						colModelSelector.pqGrid("deleteRow", { rowIndx: i });
					}
					else {
						rctmDtlsRgstDeleteList.push(
							colModelSelector.pqGrid('instance').pdata[i]
						)
						colModelSelector.pqGrid("deleteRow", { rowIndx: i });
					}
				}
			}

			if (cnt > 0) {
				Swal.fire({
					icon: "warning"
					, title: "Warning!"
					, text: "입금내역매핑이 되어있는 경우는 입금내역매핑을 지우고 삭제해주세요!"
				})
			}

		}
		else if (colModelSelector.attr('id') === 'TB07090S_colModel3') {

			const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid('instance').pdata
			let gridData = colModelSelector.pqGrid('instance').pdata;
			let cnt = 0;

			for (let i = gridData.length - 1; i >= 0; i--) {
				if (gridData[i].delYn === "Y") {

					for (let j = 0; j < rctmDtlsMappingGridData.length; j++) {
						if (
							colModelSelector.pqGrid('instance').pdata[i].rctmDt == rctmDtlsMappingGridData[j].rctmDt
							&& colModelSelector.pqGrid('instance').pdata[i].rgstSeq == rctmDtlsMappingGridData[j].rgstSeq
						) {
							$('#TB07090S_colModel2').pqGrid("instance").pdata[j].pmntPrarAmt = Number($('#TB07090S_colModel2').pqGrid("instance").pdata[j].pmntPrarAmt) - Number($('#TB07090S_colModel3').pqGrid("instance").pdata[i].dealRctmAmt)
							$('#TB07090S_colModel2').pqGrid("instance").refresh();
						}
					}

					if (!gridData[i].hndDetlDtm) {
						colModelSelector.pqGrid("deleteRow", { rowIndx: i });
					}
					else {
						rctmDtlsMappingDeleteList.push(
							colModelSelector.pqGrid('instance').pdata[i]
						)
						colModelSelector.pqGrid("deleteRow", { rowIndx: i });
					}

				}
			}
		}
	}

	/**
	 * 입금증등록내역 저장
	 */
	function saveRctmDtlsRgst() {

		const colModel_rctmDtlsRgst = $('#TB07090S_colModel2').pqGrid('instance').pdata;

		let insertList = [];
		let updateList = [];
		let deleteList = rctmDtlsRgstDeleteList;


		console.log(JSON.stringify(colModel_rctmDtlsRgst))

		for (let i = 0; i < colModel_rctmDtlsRgst.length; i++) {
			if (colModel_rctmDtlsRgst[i].pq_cellcls != undefined && !colModel_rctmDtlsRgst[i].hndDetlDtm) {
				insertList.push(colModel_rctmDtlsRgst[i]);
			}
			else if (colModel_rctmDtlsRgst[i].pq_cellcls != undefined) {
				for (let j = 0; j < deleteList.length; j++) {
					if (deleteList[j] != colModel_rctmDtlsRgst[i]) {
						updateList.push(colModel_rctmDtlsRgst[i]);
					}
				}
			}
		}

		const paramData = {
			insertList: insertList
			, updateList: colModel_rctmDtlsRgst
			, deleteList: deleteList
		}


		console.log(JSON.stringify(paramData))



		$.ajax({
			type: "POST",
			url: "/TB07090S/rctmDtlsRgst",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data > 0) {
					swal.fire({
						icon: "success"
						, title: "Success!"
						, text: "저장성공!"
					})
					search_TB07090S();
				}
				else {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "저장실패!"
					})
				}
			},
			error: function() {
				Swal.fire({
					icon: "error"
					, title: "Error!"
					, text: "저장실패!"
				})
			}
		});
		rctmDtlsRgstDeleteList = [];
	}

	/**
	 * 입금내역매핑 저장
	 */
	function saveRctmDtlsMapping() {

		const colModel_rctmDtlsMapping = $('#TB07090S_colModel3').pqGrid('instance').pdata;

		let insertList = [];
		let updateList = [];
		let deleteList = rctmDtlsMappingDeleteList;

		for (let i = 0; i < deleteList.length; i++) {
			deleteList[i].rowIndx
		}

		for (let i = 0; i < colModel_rctmDtlsMapping.length; i++) {
			if (!colModel_rctmDtlsMapping[i].hndDetlDtm) {
				insertList.push(colModel_rctmDtlsMapping[i]);
			}
			else if (colModel_rctmDtlsMapping[i].pq_cellcls != undefined) {
				for (let j = 0; j < deleteList.length; j++) {
					if (deleteList[j] != colModel_rctmDtlsMapping[i]) {
						updateList.push(colModel_rctmDtlsMapping[i]);
					}
				}
			}
		}

		const paramData = {
			insertList: insertList
			, updateList: updateList
			, deleteList: deleteList
		}



		$.ajax({
			type: "POST",
			url: "/TB07090S/rctmDtlsMapping",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data > 0) {
					swal.fire({
						icon: "success"
						, title: "Success!"
						, text: "저장성공!"
					})
					search_TB07090S();
				}
				else {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "저장실패!"
					})
				}
			},
			error: function() {
				Swal.fire({
					icon: "error"
					, title: "Error!"
					, text: "저장실패!"
				})
			}
		});
		rctmDtlsMappingDeleteList = [];
	}

	/**
	 * 초기화
	 */
	function resetAll() {

		resetInputValue($("div[data-menuid='/TB07090S']"));
		$("#TB07090S_rctmDt").val(getToday()); //입금일자, 임시
		$("#TB07090S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
		$("#TB07090S_toDate").val(getToday()); //조회종료일, 임시
		//$("#TB07090S_ibDealNo").val("AG120250710100334");//임시
		$("#TB07090S_dprtNm").val($("#userDprtCd").val());
		$("#TB07090S_dprtCd").val($("#userDprtCd").val());


		resetPGgrids("TB07090S");

		//search_TB07090S();//임시
	}

	function getDealInfoFromWF() {
		if (sessionStorage.getItem("isFromWF")) {
			var dealNo = sessionStorage.getItem("wfDealNo");
			var dealNm = sessionStorage.getItem("wfDealNm");
			$("#TB07090S_ibDealNm").val(dealNo);
			$("#TB07090S_ibDealNm").val(dealNm);
			search_TB07090S();
		}
		sessionStorage.clear();
	}


	function colModel2_addNewRow(obj) {
		obj.pqGrid("addRow", {
			rowIndx: 0,
			rowData: {
				rctmDt: $("#TB07090S_rctmDt").val().replaceAll("-", ""),
			}
		});
	}

	function colModel2_deleteRow(obj) {
		let gridData = obj.pqGrid('instance').pdata;
		for (let i = gridData.length - 1; i >= 0; i--) {
			if (gridData[i].chk === "Y") {

				if (gridData[i].pmntPrarAmt > 0) {
					Swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "입금내역매핑이 되어있는 경우는 입금내역매핑을 지우고 삭제해주세요!"
					})
					return;
				}

				obj.pqGrid("deleteRow", { rowIndx: i });

			}
		}
	}

	function colModel2_save() {
		saveRctmDtlsRgst();
	}


	function colModel3_addNewRow(obj) {

		let gridData1 = $('#TB07090S_colModel1').pqGrid('instance').pdata;
		let gridData2 = $('#TB07090S_colModel2').pqGrid('instance').pdata;
		var chk1 = 0;
		var chk2 = 0;

		var dataList1 = [];
		var dataList2 = [];

		var idx1 = 0;
		var idx2 = 0;

		var amt1 = 0;
		var amt2 = 0;

		for (let i = 0; i < gridData1.length; i++) {
			if (gridData1[i].chk === "Y") {
				chk1++;
				dataList1[idx1++] = gridData1[i];
				amt1 += gridData1[i].pmntPrarAmt;
			}
		}
		for (let i = 0; i < gridData2.length; i++) {
			if (gridData2[i].chk === "Y") {
				chk2++;
				dataList2[idx2++] = gridData2[i];

				amt2 += (gridData2[i].dealRctmAmt - gridData2[i].pmntPrarAmt);
			}
		}


		if (amt1 > amt2) {
			Swal.fire({
				icon: "warning"
				, title: "Warning!"
				, text: "납부예정금액 합계가 입금금액보다 급니다"
			})
			return;
		}

		if (chk1 == 1 && chk2 > 1) {

			for (let i = 0; i < dataList2.length; i++) {

				obj.pqGrid("addRow", {
					rowIndx: i,
					rowData: {
						chk: 'Y',
						rctmDt: dataList2[i].rctmDt,
						rctmSeq: dataList2[i].rgstSeq,
						dealNo: dataList1[0].dealNo,
						prdtCd: dataList1[0].prdtCd,
						excSn: dataList1[0].excSn,
						prarDt: dataList1[0].prarDt,
						scxDcd: dataList1[0].scxDcd,
						dealRctmAmt: dataList1[0].pmntPrarAmt,
						mngmBdcd: dataList1[0].mngmBdcd,

					}
				});
			}


		} else if (chk1 > 1 && chk2 == 1) {
			for (let i = 0; i < dataList1.length; i++) {

				obj.pqGrid("addRow", {
					rowIndx: i,
					rowData: {
						chk: 'Y',
						rctmDt: dataList2[0].rctmDt,
						rctmSeq: dataList2[0].rgstSeq,
						dealNo: dataList1[i].dealNo,
						prdtCd: dataList1[i].prdtCd,
						excSn: dataList1[i].excSn,
						prarDt: dataList1[i].prarDt,
						scxDcd: dataList1[i].scxDcd,
						dealRctmAmt: dataList1[i].pmntPrarAmt,
						mngmBdcd: dataList1[i].mngmBdcd,

					}
				});
			}
		} else if (chk1 == 1 && chk2 == 1) {

			obj.pqGrid("addRow", {
				rowIndx: 0,
				rowData: {
					chk: 'Y',
					rctmDt: dataList2[0].rctmDt,
					rctmSeq: dataList2[0].rgstSeq,
					dealNo: dataList1[0].dealNo,
					prdtCd: dataList1[0].prdtCd,
					excSn: dataList1[0].excSn,
					prarDt: dataList1[0].prarDt,
					scxDcd: dataList1[0].scxDcd,
					dealRctmAmt: dataList1[0].pmntPrarAmt,
					mngmBdcd: dataList1[0].mngmBdcd,

				}
			});
		} else {
			Swal.fire({
				icon: "warning"
				, title: "Warning!"
				, text: "상환예정내역 또는 입금증 등록내역 둘 중 하나는 1건만 선택해야 합니다."
			})

		}


	}

	let deleteList = [];

	function colModel3_deleteRow(obj) {

		let gridData = $('#TB07090S_colModel3').pqGrid('instance').pdata;


		for (let i = gridData.length - 1; i >= 0; i--) {
			if (gridData[i].chk === "Y") {
				deleteList.push(gridData[i]);
				obj.pqGrid("deleteRow", { rowIndx: i });
			}
		}

	}

	function colModel3_save(obj) {

		let gridData = obj.pqGrid('instance').pdata;

		let insertList = [];
		let updateList = [];


		for (let i = 0; i < gridData.length; i++) {
			insertList.push(gridData[i]);
		}


		const paramData = {
			insertList: insertList
			, updateList: updateList
			, deleteList: deleteList
		}

		$.ajax({
			type: "POST",
			url: "/TB07090S/rctmDtlsMapping",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data > 0) {
					swal.fire({
						icon: "success"
						, title: "Success!"
						, text: "저장성공!"
					})
					search_TB07090S();
				}
				else {
					swal.fire({
						icon: "warning"
						, title: "Warning!"
						, text: "저장실패!"
					})
				}
			},
			error: function() {
				Swal.fire({
					icon: "error"
					, title: "Error!"
					, text: "저장실패!"
				})
			}
		});
	}



	return {
		search_TB07090S: search_TB07090S,
		TB07090S_pqGridDeleteRow: TB07090S_pqGridDeleteRow,
		TB07090S_addRow: TB07090S_addRow,
		resetAll: resetAll, // 초기화
		saveRctmDtlsRgst: saveRctmDtlsRgst,
		saveRctmDtlsMapping: saveRctmDtlsMapping,
		colModel2_rowIndx: colModel2_rowIndx,
		colModel3_rowIndx: colModel3_rowIndx,
		getDealInfoFromWF: getDealInfoFromWF,
		colModel2_addNewRow: colModel2_addNewRow,
		colModel2_deleteRow: colModel2_deleteRow,
		colModel2_save: colModel2_save,
		colModel3_addNewRow: colModel3_addNewRow,
		colModel3_deleteRow: colModel3_deleteRow,
		colModel3_save: colModel3_save,
	};
})();
