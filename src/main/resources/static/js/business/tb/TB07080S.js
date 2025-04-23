const TB07080Sjs = (function() {
	let TB07080S_rowData = {};
	const dummyData = TB07080S_rowData;
	let TB07080S_rowIndx;
	let TB07080S_pqGridLength = 0;
	let selectBox;
	let grdSelect = {};

	$(document).ready(function() {
		$(
			"input[id*='Amt'], input[id*='Blce'], input[id*='Rt'], input[id*='Mnum'], input[id*='Tmrd']"
		).val("0");
		selectorNumberFormater($("input[id*='Amt'], input[id*='Blce']"));
		dateInputSet();
		fnSelectBox();
		pqGrid();
		$("#disabledView").find("input").prop("disabled", true);
		createOption();

		getDealInfoFromWF();
		// vldDateVal();
	});

	function dateInputSet() {
		const $this = $("input[id*='Dt']");
		$this.attr("placeholder", "YYYY-MM-DD");
	}

	/*
	 *  전체 초기화
	 */
	function TB07080S_inputReset() {
		TB07080S_resetPqGrid();
		$("#TB07080S_prdtCd").val("");
		$("#TB07080S_prdtNm").val("");
		$("#TB07080S_excSn").val("");
		$("#TB07080S_excSn").html('<option value="">선택(필수)</option>');
		resetInputValue($("#allDataBox"));
	}

	/*
	 *  =====================OptionBox데이터 SET=====================
	 */
	function fnSelectBox() {
		selectBox = getSelectBoxList(
			"TB07080",
			"/L001" + "/I017" + "/I013" + "/A007" + "/S003",
			false
		);
		grdSelect.L001 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "L001";
		}); //	RPTS_CTRT_TP_DETL_CD
		grdSelect.I017 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "I017";
		}); //	DET_GRTE_FLFL_DCD
		grdSelect.I013 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "I013";
		});
		grdSelect.A007 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "A007";
		});
		grdSelect.S003 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "S003";
		});
	}

	function createOption() {
		let ahtml;
		let bhtml;

		grdSelect.L001.forEach((item) => {
			ahtml += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});
		grdSelect.I017.forEach((item) => {
			bhtml += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});

		$("#TB07080S_ldgSttsCd").append(ahtml);
		$("#TB07080S_ldgSttsCd_d").append(ahtml);
		$("#TB07080S_intrPymDtCd").append(bhtml);
		$("#TB07080S_intrPymDtCd_d").append(bhtml);
	}
	/*
	 *  =====================OptionBox데이터 SET=====================
	 */

	/*
	 *  =====================데이터변환용=====================
	 */

	// /*
	//  *  콤마붙이기
	//  */
	// function locale(data) {

	//     if (!data) {
	//         return "0";
	//     }
	//     // 숫자 or 문자가 숫자로 변환 가능한지 확인합니다.
	//     let number = Number(data);

	//     // 숫자로 변환할 수 없는 경우 원래 문자를 반환합니다.
	//     if (isNaN(number)) {
	//         return data;
	//     }

	//     // 소수점 이하 자리를 보존하기 위해 문자열로 변환
	//     let parts = data.split(".");

	//     // 세 자리마다 콤마를 찍은 문자열로 변환
	//     parts[0] = Number(parts[0]).toLocaleString();

	//     // 소수점 이하 부분이 존재하면 다시 합치기
	//     return parts.join(".");
	// }

	// /*
	//  *  콤마떼기
	//  */
	// function removeComma(data) {
	//     if (!data) {
	//         return "0"
	//     }

	//     if (typeof data === 'string') {
	//         return data.replace(/,/g, '');
	//     }

	//     return data;
	// }

	/*
	 *  날짜데이터편집
	 */
	function getDateData(date, format, cut /* (-, ., /) 선택 */) {
		if (!date) {
			return;
		}

		let dateTypeCheck = new Date(date);

		let year;
		let month;
		let day;
		let resultDate;

		if (isNaN(dateTypeCheck)) {
			year = date.slice(0, 4);
			month = date.slice(4, 6);
			day = date.slice(6, 8);
		} else {
			year = new Date(date).getFullYear().toString();
			month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
			day = new Date(date).getDate().toString().padStart(2, "0");
		}

		switch (format) {
			case "yyyy": {
				resultDate = year;
				return resultDate;
			}
			case "mm": {
				resultDate = month;
				return resultDate;
			}
			case "dd": {
				resultDate = day;
				return resultDate;
			}
			case "mmdd": {
				resultDate = month + cut + day;
				return resultDate;
			}
			case "yyyymm": {
				resultDate = year + cut + month;
				return resultDate;
			}
			case "yyyymmdd": {
				resultDate = year + cut + month + cut + day;
				return resultDate;
			}
		}
	}

	/*
	 *  =====================데이터변환용=====================
	 */

	/*
	 *  =====================PQGRID=====================
	 */

	/*
	 *  pqGrid colModel
	 */
	function TB07080S_colModelData() {
		let dateEditor_colModel = function(ui) {
			let $inp = ui.$cell.find("input");

			$inp.datepicker({
				todayBtn: "linked",
				autoclose: true,
				format: "yyyy-mm-dd",
				keyboardNavigation: false,
				forceParse: false,
				calendarWeeks: false,
				language: "ko",
			}).on("changeDate", function(e) {
				$("#TB07080S_colModel").pqGrid("setSelection", { rowIndx: ui.rowIndx, dataIndx: ui.dataIndx });
				$("#TB07080S_colModel").pqGrid("setSelection", null);
			});

		}

		const TB07080S_colModel = [
			{
				title: "queryType",
				dataType: "string",
				dataIndx: "queryType",
				hidden: true,
			},
			{
				title: "시작일자",
				dataType: "date",
				format: "yyyy-mm-dd",
				dataIndx: "aplyStrtDt",
				halign: "center",
				align: "center",
				editor: {
					type: "textbox",
					init: dateEditor_colModel,
				},
				validations: [{ type: 'regexp', value: '^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$', msg: 'Not in yyyy-mm-dd format' }],
				editable: true,
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
			{
				title: "종료일자",
				dataType: "date",
				format: "yyyy-mm-dd",
				dataIndx: "aplyEndDt",
				halign: "center",
				align: "center",
				editor: {
					type: "textbox",
					init: dateEditor_colModel,
				},
				validations: [{ type: 'regexp', value: '^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$', msg: 'Not in yyyy-mm-dd format' }],
				editable: true,
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
			{
				title: "기준금리종류",
				dataType: "string",
				dataIndx: "stdrIntrtKndCd",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.S003,
					init: function (ui) {
			        	initSelectAutoOpen(ui, grdSelect.S003.length);
			        }
				},
				render: function(ui) {
					let fSel = grdSelect.S003.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "고정금리",
				dataType: "string",
				dataIndx: "fxnIntrt",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "가산금리",
				dataType: "string",
				dataIndx: "addIntrt",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "변동주기유형",
				dataType: "string",
				dataIndx: "intrtCngeFrqcCd",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.I013,
					init: function (ui) {
			        	initSelectAutoOpen(ui, grdSelect.I013.length);
			        }
				},
				render: function(ui) {
					let fSel = grdSelect.I013.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "금리변동주기수",
				dataType: "string",
				dataIndx: "intrtCngeFrqcMnum",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "적용일수구분",
				dataType: "string",
				dataIndx: "aplyDnumDcd",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.A007,
					init: function (ui) {
			        	initSelectAutoOpen(ui, grdSelect.A007.length);
			        }
				},
				render: function(ui) {
					let fSel = grdSelect.A007.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "금리적용일수",
				dataType: "string",
				dataIndx: "stdrIntrtAplyDnum",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
		];

		return TB07080S_colModel;
	}

	/*
	 *  PQGRID SETTING
	 */
	function pqGrid() {
		// 그리드 옵션 생성
		let pqGridObjs = [
			{
				height: 280,
				maxHeight: 280,
				id: "TB07080S_colModel",
				colModel: TB07080S_colModelData(),
				scrollModel: { autoFit: true },
				editable: true,
				rowClick: function(event, ui) {
					if (TB07080S_rowData === ui.rowData) {
						TB07080S_rowData = dummyData;
					} else {
						TB07080S_rowData = ui.rowData;
					}
				},
				selectionModel: { type: "row" },
			},
		];
		setPqGrid(pqGridObjs);
		$("#TB07080S_colModel").pqGrid("instance");
	}

	/*
	 *  ====================PQGRID변환====================
	 */

	/*
	 *  PQGRID 줄추가
	 */
	function TB07080S_addNewRow() {
		let row = [
			"시작일자",
			"종료일자",
			"기준금리종류",
			"고정금리",
			"가산금리",
			"변동주기유형",
			"금리변동주기수",
			"적용일수구분",
			"금리적용일수",
		];
		let newRow = {
			aplyStrtDt: row["시작일자"],
			aplyEndDt: row["종료일자"],
			stdrIntrtKndCd: row["기준금리종류"],
			fxnIntrt: row["고정금리"],
			addIntrt: row["가산금리"],
			intrtCngeFrqcCd: row["변동주기유형"],
			intrtCngeFrqcMnum: row["금리변동주기수"],
			aplyDnumDcd: row["적용일수구분"],
			stdrIntrtAplyDnum: row["금리적용일수"],
		};
		$("#TB07080S_colModel").pqGrid("addRow", {
			rowData: newRow,
			checkEditable: false,
		});
	}

	/*
	 *  PQGRID 줄삭제
	 */
	function TB07080S_deleteRow() {
		let getLength = $("#TB07080S_colModel").pqGrid("instance").pdata.length;

		if (
			TB07080S_rowData != dummyData &&
			TB07080S_pqGridLength < getLength &&
			!TB07080S_rowData.excSn
		) {
			$("#TB07080S_colModel").pqGrid("deleteRow", {
				rowData: TB07080S_rowData,
				checkEditable: false,
			});
			TB07080S_rowData = dummyData;
		} else if (
			TB07080S_rowData === dummyData &&
			TB07080S_pqGridLength < getLength
		) {
			$("#TB07080S_colModel").pqGrid("deleteRow", {
				rowData: TB07080S_rowData,
				checkEditable: false,
			});
			TB07080S_rowData = dummyData;
		} else if (
			TB07080S_rowData === dummyData &&
			TB07080S_pqGridLength === getLength
		) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "삭제하실 행을 선택해주세요.",
				confirmButtonText: "확인",
			});
			TB07080S_rowData = dummyData;
		} else if (TB07080S_rowData != dummyData) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "데이터가 삭제됩니다.",
				confirmButtonText: "확인",
				denyButtonText: "아니오",
				showDenyButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					deleteIBIMS404B();
					TB07080S_rowData = dummyData;
					return;
				} else if (result.isDenied) {
					TB07080S_rowData = dummyData;
					return;
				}
			});
		}
	}

	/*
	 *  PQGRID 초기화
	 */
	function TB07080S_resetPqGrid() {
		$("#TB07080S_colModel").pqGrid("option", "dataModel.data", []);
		$("#TB07080S_colModel").pqGrid("refreshDataAndView");
	}

	/*
	 *  =====================PQGRID=====================
	 */

	/*
	 *  =====================SELECT모음=====================
	 */

	/*
	 *  SELECT 실행순번
	 */
	function getExcSn(prdtCd) {
		$.ajax({
			type: "POST",
			url: "/TB07080S/getExcSnTB07080S",
			contentType: "application/json; charset=UTF-8",
			data: prdtCd,
			dataType: "json",
			success: function(data) {
				let html = '<option value="">선택(필수)</option>';
				if (data[0] === undefined) {
					Swal.fire({
						icon: "warning",
						title: "Warning!",
						html: `실행순번이 없는 종목입니다.<br>해당 종목의 실행순번을 업로드하고 다시 시도해주세요.`,
						confirmButtonText: "확인",
					});
					TB07080S_inputReset();
				} else if (data.length > 0) {
					data.forEach((item) => {
						html += '<option value="' + item + '">' + item + "</option>";
					});
					$("#TB07080S_excSn").html(html);
				}
			},
			error: function() { },
		});
	}

	/*
	 *  SELECT 실행원장정보
	 */
	function getExcData() {
		let result;

		let prdtCd = $("#TB07080S_prdtCd").val();
		let excSn = $("#TB07080S_excSn").val();

		let paramData;
		paramData = {
			prdtCd: prdtCd,
			excSn: excSn,
		};

		$.ajax({
			type: "POST",
			url: "/TB07080S/getExcData",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data) {
					result = data;
					$("#TB07080S_ldgSttsCd").val(data.ldgSttsCd);
					$("#TB07080S_ldgSttsCd_d").val(data.ldgSttsCd);
					$("#TB07080S_crryCd").val(data.crryCd);
					$("#TB07080S_crryCd_d").val(data.crryCd);
					$("#TB07080S_excDt").val(getDateData(data.excDt, "yyyymmdd", "-"));
					$("#TB07080S_excDt_d").val(getDateData(data.excDt, "yyyymmdd", "-"));
					$("#TB07080S_expDt").val(getDateData(data.expDt, "yyyymmdd", "-"));
					$("#TB07080S_expDt_d").val(getDateData(data.expDt, "yyyymmdd", "-"));
					$("#TB07080S_dealExcAmt").val(locale(data.dealExcAmt));
					$("#TB07080S_dealExcAmt_d").val(locale(data.dealExcAmt));
					$("#TB07080S_dealExcBlce").val(locale(data.dealExcBlce));
					$("#TB07080S_dealExcBlce_d").val(locale(data.dealExcBlce));
					$("#TB07080S_krwTrslRt").val(data.krwTrslRt);
					$("#TB07080S_krwTrslRt_d").val(data.krwTrslRt);
					$("#TB07080S_krwTrslExcAmt").val(locale(data.krwTrslExcAmt));
					$("#TB07080S_krwTrslExcAmt_d").val(locale(data.krwTrslExcAmt));
					$("#TB07080S_krwTrslExcBlce").val(locale(data.krwTrslExcBlce));
					$("#TB07080S_krwTrslExcBlce_d").val(locale(data.krwTrslExcBlce));
					$("#TB07080S_prnaDfrPrdMnum").val(data.prnaDfrPrdMnum);
					$("#TB07080S_prnaDfrPrdMnum_d").val(data.prnaDfrPrdMnum);
					$("#TB07080S_dfrExpMnum").val(data.dfrExpMnum);
					$("#TB07080S_dfrExpMnum_d").val(data.dfrExpMnum);
					$("#TB07080S_lastPrnaRdmpDt").val(
						getDateData(data.lastPrnaRdmpDt, "yyyymmdd", "-")
					);
					$("#TB07080S_lastPrnaRdmpDt_d").val(
						getDateData(data.lastPrnaRdmpDt, "yyyymmdd", "-")
					);
					$("#TB07080S_lastIntrClcDt").val(
						getDateData(data.lastIntrClcDt, "yyyymmdd", "-")
					);
					$("#TB07080S_lastIntrClcDt_d").val(
						getDateData(data.lastIntrClcDt, "yyyymmdd", "-")
					);
					$("#TB07080S_nxtRdmpPrarDt").val(
						getDateData(data.nxtRdmpPrarDt, "yyyymmdd", "-")
					);
					$("#TB07080S_nxtRdmpPrarDt_d").val(
						getDateData(data.nxtRdmpPrarDt, "yyyymmdd", "-")
					);
					$("#TB07080S_nxtIntrPymDt").val(
						getDateData(data.nxtIntrPymDt, "yyyymmdd", "-")
					);
					$("#TB07080S_nxtIntrPymDt_d").val(
						getDateData(data.nxtIntrPymDt, "yyyymmdd", "-")
					);
					$("#TB07080S_intrRdmpFrqcMnum").val(data.intrRdmpFrqcMnum);
					$("#TB07080S_intrRdmpFrqcMnum_d").val(data.intrRdmpFrqcMnum);
					$("#TB07080S_intrPymDtCd").val(data.intrPymDtCd);
					$("#TB07080S_intrPymDtCd_d").val(data.intrPymDtCd);
					$("#TB07080S_prnaRdmpFrqcMnum").val(data.prnaRdmpFrqcMnum);
					$("#TB07080S_prnaRdmpFrqcMnum_d").val(data.prnaRdmpFrqcMnum);
					$("#TB07080S_prnaOvduDt").val(
						getDateData(data.prnaOvduDt, "yyyymmdd", "-")
					);
					$("#TB07080S_prnaOvduDt_d").val(
						getDateData(data.prnaOvduDt, "yyyymmdd", "-")
					);
					$("#TB07080S_intrOvduDt").val(
						getDateData(data.intrOvduDt, "yyyymmdd", "-")
					);
					$("#TB07080S_intrOvduDt_d").val(
						getDateData(data.intrOvduDt, "yyyymmdd", "-")
					);
					$("#TB07080S_totRdmpTmrd").val(data.totRdmpTmrd);
					$("#TB07080S_totRdmpTmrd_d").val(data.totRdmpTmrd);
					$("#TB07080S_lastRdmpTmrd").val(data.lastRdmpTmrd);
					$("#TB07080S_lastRdmpTmrd_d").val(data.lastRdmpTmrd);
					$("#TB07080S_dealIstmBlce").val(locale(data.dealIstmBlce));
					$("#TB07080S_dealIstmBlce_d").val(locale(data.dealIstmBlce));
					$("#TB07080S_dealEqlRdmpAmt").val(locale(data.dealEqlRdmpAmt));
					$("#TB07080S_dealEqlRdmpAmt_d").val(locale(data.dealEqlRdmpAmt));
					$("#TB07080S_istmDtmRdmpAmt").val(locale(data.istmDtmRdmpAmt));
					$("#TB07080S_istmDtmRdmpAmt_d").val(locale(data.istmDtmRdmpAmt));
					$("#TB07080S_rcvbIntrAmt").val(locale(data.rcvbIntrAmt));
					$("#TB07080S_rcvbIntrAmt_d").val(locale(data.rcvbIntrAmt));
					$("#TB07080S_grteDcd").val(data.grteDcd);
					$("#TB07080S_grteDcd_d").val(data.grteDcd);
					$("#TB07080S_pymtGrteRfrNo").val(data.pymtGrteRfrNo);
					$("#TB07080S_pymtGrteRfrNo_d").val(data.pymtGrteRfrNo);
					$("#TB07080S_grteIsttCd").val(data.grteIsttCd);
					$("#TB07080S_grteIsttCd_d").val(data.grteIsttCd);
					$("#TB07080S_grteIsttNm").val(data.grteIsttNm);
					$("#TB07080S_grteIsttNm_d").val(data.grteIsttNm);
					$("#TB07080S_buyShqt").val(data.buyShqt);
					$("#TB07080S_buyShqt_d").val(data.buyShqt);
					$("#TB07080S_sllShqt").val(data.sllShqt);
					$("#TB07080S_sllShqt_d").val(data.sllShqt);
					$("#TB07080S_avrUnpr").val(data.avrUnpr);
					$("#TB07080S_avrUnpr_d").val(data.avrUnpr);
					$("#TB07080S_brkgAcno").val(data.brkgAcno);
					$("#TB07080S_brkgAcno_d").val(data.brkgAcno);
					$("#TB07080S_rctmIsttCd").val(data.rctmIsttCd);
					$("#TB07080S_rctmIsttCd_d").val(data.rctmIsttCd);
					$("#TB07080S_achdNm").val(data.achdNm);
					$("#TB07080S_achdNm_d").val(data.achdNm);
					$("#TB07080S_pymtGrteScctCtns").val(data.pymtGrteScctCtns);
					$("#TB07080S_pymtGrteScctCtns_d").val(data.pymtGrteScctCtns);
					$("#TB07080S_acbkAmt").val(locale(data.acbkAmt));
					$("#TB07080S_acbkAmt_d").val(locale(data.acbkAmt));
					$("#TB07080S_dealNo").val(data.dealNo);
					$("#TB07080S_dealNo_d").val(data.dealNo);
					$("#TB07080S_mtrDcd").val(data.mtrDcd);
					$("#TB07080S_mtrDcd_d").val(data.mtrDcd);
					$("#TB07080S_jdgmDcd").val(data.jdgmDcd);
					$("#TB07080S_jdgmDcd_d").val(data.jdgmDcd);
					$("#TB07080S_hndDetlDtm").val(data.hndDetlDtm);
					$("#TB07080S_hndDetlDtm_d").val(data.hndDetlDtm);
					$("#TB07080S_hndEmpno").val(data.hndEmpno);
					$("#TB07080S_hndEmpno_d").val(data.hndEmpno);
					$("#TB07080S_hndTmnlNo").val(data.hndTmnlNo);
					$("#TB07080S_hndTmnlNo_d").val(data.hndTmnlNo);
					$("#TB07080S_hndTrId").val(data.hndTrId);
					$("#TB07080S_hndTrId_d").val(data.hndTrId);
					$("#TB07080S_guid").val(data.guid);
					$("#TB07080S_guid_d").val(data.guid);
				} else {
					result = 2;
				}
			},
			error: function() {
				result = 0;
			},
		});

		return result;
	}

	/*
	 *  SELECT 실행금리정보
	 */
	function getIntrtData() {
		let result;

		let prdtCd = $("#TB07080S_prdtCd").val();
		let excSn = $("#TB07080S_excSn").val();

		let paramData;
		paramData = {
			prdtCd: prdtCd,
			excSn: excSn,
		};

		$.ajax({
			type: "POST",
			url: "/TB07080S/getIntrtData",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data.length > 0) {
					TB07080S_pqGridLength = data.length;
					let detail = $("#TB07080S_colModel").pqGrid("instance");
					detail.setData(data);
					detail.getData();
				} else {
					result = 2;
				}
			},
			error: function() {
				result = 0;
			},
		});

		return result;
	}

	/*
	 *  SELECT TB07080S
	 */
	function selectTB07080S() {
		let excResult;
		let intrtResult;

		if (!$("#TB07080S_prdtCd").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "종목코드를 입력해주세요.",
				confirmButtonText: "확인",
			});
			return;
		} else if (!$("#TB07080S_excSn").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "실행순번을 지정해주세요.",
				confirmButtonText: "확인",
			});
			return;
		}

		excResult = getExcData(); // 데이터값이 나온 함수
		intrtResult = getIntrtData();

		if (excResult === 2 || intrtResult === 2) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "조회된 데이터가 없습니다",
				confirmButtonText: "확인",
			});
			TB07080S_inputReset();
		} else if (excResult === 0 && intrtResult === 0) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "조회에 실패하였습니다.",
				confirmButtonText: "확인",
			});
			TB07080S_inputReset();
		}
	}

	/*
	 *  =====================SELECT모음=====================
	 */

	/*
	 *  =====================UPDATE모음=====================
	 */

	/*
	 *  UPDATE 실행원장정보
	 */
	function updateExcData() {
		let result;

		paramData = {
			prdtCd: $("#TB07080S_prdtCd").val(),
			excSn: $("#TB07080S_excSn").val(),
			ldgSttsCd: $("#TB07080S_ldgSttsCd").val(),
			crryCd: $("#TB07080S_crryCd").val(),
			excDt: getDateData($("#TB07080S_excDt").val(), "yyyymmdd", ""),
			expDt: getDateData($("#TB07080S_expDt").val(), "yyyymmdd", ""),
			dealExcAmt: removeComma($("#TB07080S_dealExcAmt").val()),
			dealExcBlce: removeComma($("#TB07080S_dealExcBlce").val()),
			krwTrslRt: $("#TB07080S_krwTrslRt").val(),
			krwTrslExcAmt: removeComma($("#TB07080S_krwTrslExcAmt").val()),
			krwTrslExcBlce: removeComma($("#TB07080S_krwTrslExcBlce").val()),
			prnaDfrPrdMnum: $("#TB07080S_prnaDfrPrdMnum").val(),
			dfrExpMnum: $("#TB07080S_dfrExpMnum").val(),
			lastPrnaRdmpDt: getDateData(
				$("#TB07080S_lastPrnaRdmpDt").val(),
				"yyyymmdd",
				""
			),
			lastIntrClcDt: getDateData(
				$("#TB07080S_lastIntrClcDt").val(),
				"yyyymmdd",
				""
			),
			nxtRdmpPrarDt: getDateData(
				$("#TB07080S_nxtRdmpPrarDt").val(),
				"yyyymmdd",
				""
			),
			nxtIntrPymDt: getDateData(
				$("#TB07080S_nxtIntrPymDt").val(),
				"yyyymmdd",
				""
			),
			intrRdmpFrqcMnum: $("#TB07080S_intrRdmpFrqcMnum").val(),
			intrPymDtCd: $("#TB07080S_intrPymDtCd").val(),
			prnaRdmpFrqcMnum: $("#TB07080S_prnaRdmpFrqcMnum").val(),
			prnaOvduDt: getDateData($("#TB07080S_prnaOvduDt").val(), "yyyymmdd", ""),
			intrOvduDt: getDateData($("#TB07080S_intrOvduDt").val(), "yyyymmdd", ""),
			totRdmpTmrd: $("#TB07080S_totRdmpTmrd").val(),
			lastRdmpTmrd: $("#TB07080S_lastRdmpTmrd").val(),
			dealIstmBlce: removeComma($("#TB07080S_dealIstmBlce").val()),
			dealEqlRdmpAmt: removeComma($("#TB07080S_dealEqlRdmpAmt").val()),
			istmDtmRdmpAmt: removeComma($("#TB07080S_istmDtmRdmpAmt").val()),
			rcvbIntrAmt: removeComma($("#TB07080S_rcvbIntrAmt").val()),
			grteDcd: $("#TB07080S_grteDcd").val(),
			pymtGrteRfrNo: $("#TB07080S_pymtGrteRfrNo").val(),
			grteIsttCd: $("#TB07080S_grteIsttCd").val(),
			grteIsttNm: $("#TB07080S_grteIsttNm").val(),
			buyShqt: $("#TB07080S_buyShqt").val(),
			sllShqt: $("#TB07080S_sllShqt").val(),
			avrUnpr: $("#TB07080S_avrUnpr").val(),
			brkgAcno: $("#TB07080S_brkgAcno").val(),
			rctmIsttCd: $("#TB07080S_rctmIsttCd").val(),
			achdNm: $("#TB07080S_achdNm").val(),
			pymtGrteScctCtns: $("#TB07080S_pymtGrteScctCtns").val(),
			acbkAmt: removeComma($("#TB07080S_acbkAmt").val()),
			dealNo: $("#TB07080S_dealNo").val(),
			mtrDcd: $("#TB07080S_mtrDcd").val(),
			jdgmDcd: $("#TB07080S_jdgmDcd").val(),
		};

		$.ajax({
			type: "POST",
			url: "/TB07080S/updateExcData",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data) {
					result = data;
				} else {
					result = 2;
				}
			},
			error: function() {
				result = -1;
			},
		});
		return result;
	}

	/*
	 *  UPDATE 실행금리정보
	 */
	function updateIntrtData() {
		let result;

		let prdtCd = $("#TB07080S_prdtCd").val();
		let excSn = $("#TB07080S_excSn").val();

		let intrtList = $("#TB07080S_colModel").pqGrid("instance").getData();

		let insertList = [];
		let updateList = [];

		let insertParamData = [];
		let updateParamData = [];

		for (let i = 0; i < intrtList.length; i++) {
			const item = intrtList[i];
			if ("" == item.rgstSn || undefined == item.rgstSn) {
				insertList.push(item);
			} else {
				updateList.push(item);
			}
		}

		if (insertList.length > 0) {
			insertParamData = {
				prdtCd: prdtCd,
				excSn: excSn,
				intrtList: insertList,
			};
		}

		if (updateList.length > 0) {
			updateParamData = {
				prdtCd: prdtCd,
				excSn: excSn,
				intrtList: updateList,
			};
		}

		if (insertList.length > 0) {
			$.ajax({
				type: "POST",
				url: "/TB07080S/insertIntrtData",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify(insertParamData),
				dataType: "json",
				success: function(data) {
					if (data) {
						result = data;
					}
				},
				error: function() {
					result = -1;
				},
			});
		}

		if (updateList.length > 0) {
			$.ajax({
				type: "POST",
				url: "/TB07080S/updateIntrtData",
				contentType: "application/json; charset=UTF-8",
				data: JSON.stringify(updateParamData),
				dataType: "json",
				success: function(data) {
					if (data) {
						result = data;
					}
				},
				error: function() {
					result = -1;
				},
			});
		}
		return result;
	}

	/*
	 *  UPDATE TB07080S
	 */
	async function updateTB07080S() {
		let excResult;
		let intrtResult;
		excResult = await updateExcData(); // 데이터값이 나온 함수
		intrtResult = await updateIntrtData();
		if (!$("#TB07080S_prdtCd").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "종목코드를 입력해주세요!",
				confirmButtonText: "확인",
			});
			return;
		} else if (!$("#TB07080S_prdtNm").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "상품명을 입력해주세요!",
				confirmButtonText: "확인",
			});
			return;
		} else if (!$("#TB07080S_excSn").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "실행순번을 지정해주세요!",
				confirmButtonText: "확인",
			});
			return;
		} else if (excResult === -1 || intrtResult === -1) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "저장에 실패하였습니다.",
				confirmButtonText: "확인",
			});
			return;
		} else {
			Swal.fire({
				icon: "success",
				title: "Success!",
				text: "저장이 완료됐습니다.",
				confirmButtonText: "확인",
			});
		}
		selectTB07080S();
	}

	/*
	 *  =====================UPDATE모음=====================
	 */

	/*
	 *  =====================DELETE모음=====================
	 */

	async function deleteIBIMS404B() {
		let prdtCd = $("#TB07080S_prdtCd").val();
		let excSn = $("#TB07080S_excSn").val();
		let rgstSn = TB07080S_rowData.rgstSn;

		paramData = {
			prdtCd,
			excSn,
			rgstSn,
		};
		await $.ajax({
			type: "POST",
			url: "/TB07080S/deleteIBIMS404B",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data) {
					Swal.fire({
						icon: "success",
						title: "Success!",
						text: "삭제가 완료됐습니다.",
						confirmButtonText: "확인",
					});
				} else {
					Swal.fire({
						icon: "warning",
						title: "Warning!",
						text: "삭제에 실패하였습니다.",
						confirmButtonText: "확인",
					});
				}
			},
			error: function() {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "오류가 발생하였습니다.",
					confirmButtonText: "확인",
				});
			},
		});
		selectTB07080S();
	}

	/*
	 *  =====================DELETE모음=====================
	 */


	function getDealInfoFromWF() {

		if (sessionStorage.getItem("isFromWF")) {
			console.log("WF세션 있음");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07080S_prdtCd").val(prdtCd);
			$("#TB07080S_prdtNm").val(prdtNm);
			selectTB07080S();
		} else {
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

	return {
		selectTB07080S: selectTB07080S,
		TB07080S_inputReset: TB07080S_inputReset,
		TB07080S_addNewRow: TB07080S_addNewRow,
		TB07080S_deleteRow: TB07080S_deleteRow,
		updateTB07080S: updateTB07080S,
		getExcSn: getExcSn,
		getDealInfoFromWF: getDealInfoFromWF
	};
})();
