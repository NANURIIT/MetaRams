let modalFeeKndCdList;


const TB07180Sjs = (function() {
	let TB07180S_rowData = {};
	const TB07180S_dummyData = TB07180S_rowData;
	let TB07180S_rowIndx;
	let TB07180S_pqGridLength = 0;
	let selectBox;
	let grdSelect = {};

	$(document).ready(function() {
		$('input[id*="Amt"], input[id*=Rt]').val(0);
		selectorNumberFormater($('input[id*="Amt"], input[id*=Rt]'));
		fnSelectBox_TB07180S();
		createSelectTag_TB07180S();
		pqGrid_TB07180S();
		inputNumberChangeFunction_TB07180S();

	});

	//초기화버튼
	const resetInputData_TB07180S = () => {
		$("input").val("");
		$("select").val("");
		$('input[id*="Amt"], input[id*=Rt]').val(0);

		if (typeof modalFeeKndCdList == "undefined") {
		} else {
			// modalFeeKndCdList.setData([]);
		}

	};

	/*
	 *  =====================OptionBox데이터 SET=====================
	 */
	function fnSelectBox_TB07180S() {
		selectBox = getSelectBoxList(
			"TB07180",
			"/F006" + "/R012" + "/F015" + "/A001" + "/A004" + "/A005",
			false
		);


		grdSelect.F006 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "F006";
		}); //	수수료인식구분
		grdSelect.R012 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "R012";
		}); //	등록상태
		grdSelect.F015 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "F015";
		}); //	수수료산정구분
		grdSelect.A001 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "A001";
		}); //	회계업무코드
		grdSelect.A004 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "A004";
		}); //	회계단위업무코드	
		grdSelect.A005 = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "A005";
		}); //	계정과목코드
	}

	function createSelectTag_TB07180S() {

		//  수수료인식구분
		let f006Html;
		grdSelect.F006.forEach((item) => {
			f006Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
		});
		$("#TB07180S_feeRcogDcd").append(f006Html);

		//  수수료산정구분
		let f015Html;
		grdSelect.F015.forEach((item) => {
			f015Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
		});
		$("#TB07180S_feeRcknDcd").append(f015Html);

		//  회계업무코드
		let a001Html;
		grdSelect.A001.forEach((item) => {
			a001Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
		});
		$("#TB07180S_acctJobCd").append(a001Html);

		//  회계단위업무코드
		let a004Html;
		grdSelect.A004.forEach((item) => {
			a004Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
		});
		$("#TB07180S_acctUnJobCd").append(a004Html);

		//  계정과목코드
		let a005Html;
		grdSelect.A005.forEach((item) => {
			a005Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
		});
		$("#TB07180S_A005").append(a005Html);

		TB07180S_selectOption();
	}


	function TB07180S_selectOption() {
		const $inputField = $('#TB07180S_actCd');
		const $dataList = $('#TB07180S_A005');

		$inputField.on('input', function() {
			const inputValue = $(this).val();
			const $selectedOption = $dataList.find('option').filter(function() {
				return $(this).val() === inputValue;
			});

			if ($selectedOption.length) {
				// `option`의 텍스트를 input에 바인딩
				$inputField.val($selectedOption.text());
			}
		});
	}

	/**
	 * 절사, 금액 반올림
	 */

	function inputNumberChangeFunction_TB07180S() {
		//수수료율
		$("#TB07180S_feeRt").on('change', function() {
			let formatNum = "0";
			formatNum = parseFloat(Number(Math.round(uncomma($("#TB07180S_feeRt").val()) * 10000000) / 10000000).toFixed(7));
			$("#TB07180S_feeRt").val(addComma(formatNum));
		});
		//수수료최저금액
		$("#TB07180S_feeLwstAmt").on('change', function() {
			let formatNum = "0";
			formatNum = (Math.round(uncomma($("#TB07180S_feeLwstAmt").val()) * 1) / 1).toFixed(0);
			$("#TB07180S_feeLwstAmt").val(addComma(uncomma(formatNum)));
		});
		//수수료최고금액
		$("#TB07180S_feeHgstAmt").on('change', function() {
			let formatNum = "0";
			formatNum = (Math.round(uncomma($("#TB07180S_feeHgstAmt").val()) * 1) / 1).toFixed(0);
			$("#TB07180S_feeHgstAmt").val(addComma(uncomma(formatNum)));
		});
	}


	function TB07180S_dataListBnd(value) {
		//alert(value);
		const $inputField = $('#TB07180S_actCd');
		const $dataList = $('#TB07180S_A005');

		const $selectedOption = $dataList.find('option').filter(function() {
			return $(this).val() === value; // value로 매칭
		});
		if ($selectedOption.length) {
			// 해당 옵션의 텍스트를 `input` 필드에 바인딩
			return $selectedOption.text();
		} else {
			console.warn('해당 값에 매칭되는 옵션이 없습니다.');
		}
	}


	function TB07180S_dataListVal(inputText) {
		//alert(inputText);
		const $inputField = $('#TB07180S_actCd');
		const $dataList = $('#TB07180S_A005');

		// `inputText`에 해당하는 옵션을 검색
		const $selectedOption = $dataList.find('option').filter(function() {
			return $(this).text() === inputText; // 텍스트 비교
		});

		if ($selectedOption.length) {
			// 옵션의 `value`를 반환
			return $selectedOption.val();
		} else {
			console.warn('해당 텍스트에 매칭되는 옵션이 없습니다.');
			return null; // 매칭되는 값이 없을 경우 null 반환
		}
	}


	/*
	 *  =====================OptionBox데이터 SET=====================
	 */

	/*
	 *  =====================PQGRID=====================
	 */

	/*
	 *  pqGrid colModel
	 */
	function TB07180S_colModelData() {
		const TB07180S_colModel1 = [
			{
				title: "순번",
				dataType: "string",
				dataIndx: "rownum", //  ROWNUM
				halign: "center",
				align: "center",
				width: "5%",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let result
					result = (ui.rowIndx + 1).toString();
					return result;
				}
			},
			{
				title: "수수료종류",
				dataType: "string",
				dataIndx: "feeKndCd", //  FEE_KND_CD F004
				halign: "center",
				align: "center",
				width: "8%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수수료명",
				dataType: "string",
				dataIndx: "feeName", //  FEE_NM
				halign: "center",
				align: "left",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수수료인식구분",
				dataType: "string",
				dataIndx: "feeRcogDcd", //  FEE_RCOG_DCD F006
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.F006,
				},
				render: function(ui) {
					let fSel = grdSelect.F006.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "계정과목",
				dataType: "string",
				dataIndx: "actName", //  ACT_CD A005
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록상태",
				dataType: "string",
				dataIndx: "rgstSttsCd", //  RGST_STTS_CD R012
				halign: "center",
				align: "center",
				width: "8%",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.R012,
				},
				render: function(ui) {
					let fSel = grdSelect.R012.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "수수료산정구분",
				dataType: "string",
				dataIndx: "feeRcknDcd", //  FEE_RCKN_DCD F015
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.F015,
				},
				render: function(ui) {
					let fSel = grdSelect.F015.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "수수료율",
				dataType: "string",
				dataIndx: "feeRt", //  FEE_RT
				halign: "center",
				align: "right",
				width: "8%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수수료최저금액",
				dataType: "int",
				dataIndx: "feeLwstAmt", //  FEE_LWST_AMT
				halign: "center",
				align: "right",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData !== null && cellData !== undefined) {
						return addComma(cellData);
					}
					return cellData;
				}
			},
			{
				title: "수수료최고금액",
				dataType: "int",
				dataIndx: "feeHgstAmt", //  FEE_HGST_AMT
				halign: "center",
				align: "right",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData !== null && cellData !== undefined) {
						return addComma(cellData);
					}
					return cellData;
				}
			},
			{
				title: "회계업무코드",
				dataType: "string",
				dataIndx: "acctJobCd", //  ACCT_JOB_CD A001
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.A001,
				},
				render: function(ui) {
					let fSel = grdSelect.A001.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "회계단위업무코드",
				dataType: "string",
				dataIndx: "acctUnJobCd", //  ACCT_UN_JOB_CD A004
				halign: "center",
				align: "center",
				width: "14%",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: grdSelect.A004,
				},
				render: function(ui) {
					let fSel = grdSelect.A004.find(
						({ cdValue }) => cdValue == ui.cellData
					);
					return fSel ? fSel.cdName : ui.cellData;
				},
			},
			{
				title: "회계거래코드",
				dataType: "string",
				dataIndx: "acctTrCd", //  ACCT_TR_CD A003
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록자",
				dataType: "string",
				dataIndx: "rgstEmpNm", //  RGST_EMP_NM
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "등록일자",
				dataType: "date",
				dataIndx: "hndDetlDtm", //  HND_DETL_DTM
				halign: "center",
				align: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "계정과목코드",
				dataType: "string",
				dataIndx: "actsCd", //  ACT_CD A005
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				hidden: true,
			},


		];

		return TB07180S_colModel1;
	}

	/*
	 *  PQGRID SETTING
	 */
	function pqGrid_TB07180S() {
		// 그리드 옵션 생성
		let pqGridObjs = [
			{
				height: 280,
				maxHeight: 280,
				id: "TB07180S_colModel1",
				colModel: TB07180S_colModelData(),
				scrollModel: { autoFit: false },
				editable: false,
			},
		];
		setPqGrid(pqGridObjs);

		if (typeof modalFeeKndCdList == "undefined") {
			$("#TB07180S_colModel1").pqGrid(pqGridObjs);
			modalFeeKndCdList = $("#TB07180S_colModel1").pqGrid("instance");
		}

	}

	/*
	 *  =====================PQGRID=====================
	 */

	/*
	 *  ====================PQGRID변환====================
	 */

	/*
	 *  PQGRID 줄추가
	 */
	function TB07180S_addNewRow(colModelId) {
		let row = [];
		let newRow = {};
		const data = colModelIdSelector(colModelId).pqGrid("instance");
		const rowColumnsData = data.colModel;
		const length = rowColumnsData.length;
		for (let i = 0; i < length; i++) {
			const title = rowColumnsData[i].title;
			const dataIndx = rowColumnsData[i].dataIndx;
			row.push(title);
			if (title === "등록상태") {
				newRow[dataIndx] = "신규";
			} else {
				newRow[dataIndx] = "";
			}
		}

		colModelIdSelector(colModelId).pqGrid("addRow", {
			rowData: newRow,
			checkEditable: false,
		});
	}

	/*
	 *  PQGRID 줄삭제
	 */
	function TB07180S_deleteRow(colModelId, yourFunction) {
		let getLength =
			colModelIdSelector(colModelId).pqGrid("instance").pdata.length;
		let colModel = colModelIdSelector(colModelId);

		if (
			TB07180S_rowData != TB07180S_dummyData &&
			TB07180S_pqGridLength < getLength &&
			!TB07180S_rowData.excSn
		) {
			colModel.pqGrid("deleteRow", {
				rowData: TB07180S_rowData,
				checkEditable: false,
			});
			TB07180S_rowData = TB07180S_dummyData;
		} else if (
			TB07180S_rowData === TB07180S_dummyData &&
			TB07180S_pqGridLength < getLength
		) {
			colModel.pqGrid("deleteRow", {
				rowData: TB07180S_rowData,
				checkEditable: false,
			});
			TB07180S_rowData = TB07180S_dummyData;
		} else if (
			TB07180S_rowData === TB07180S_dummyData &&
			TB07180S_pqGridLength === getLength
		) {
			if (TB07180S_pqGridLength === 0) {
				Swal.fire({
					icon: "warning",
					text: "삭제할 데이터가 없습니다",
					confirmButtonText: "확인",
				});
			} else {
				Swal.fire({
					icon: "warning",
					text: "삭제할 데이터가 없습니다",
					confirmButtonText: "확인",
				});
			}
		} else if (TB07180S_rowData != TB07180S_dummyData) {
			Swal.fire({
				icon: "warning",
				text: "정말 삭제하시겠습니까?",
				confirmButtonText: "확인",
				denyButtonText: "아니오",
				showDenyButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					yourFunction();
					TB07180S_rowData = TB07180S_dummyData;
					return;
				} else if (result.isDenied) {
					TB07180S_rowData = TB07180S_dummyData;
					return;
				}
			});
		}
	}

	/*
	 *  PQGRID 초기화
	 */
	function TB07180S_resetPqGrid(colModelId) {
		colModelIdSelector(colModelId).pqGrid("option", "dataModel.data", []);
		colModelIdSelector(colModelId).pqGrid("refreshDataAndView");
	}

	/*
	 *  PQGRID 아이디 선택
	 */
	const colModelIdSelector = (colModelId) => {
		return $(`#${colModelId}`);
	};
	/*
	 *  =====================PQGRID=====================
	 */

	/*
	 *  =====================SELECT모음=====================
	 */

	/*
	 *  SELECT 수수료종류
	 * 조회 버튼
	 */
	function getFeeData(arg) {
		var feeNameKeyIn;
		if (arg == undefined || arg == null) {
			feeNameKeyIn = $("#TB07180S_feeNm_keyIn").val();
		}

		var paramData = {
			"feeName": feeNameKeyIn
		}
		//그리드 초기화 by hytest
		modalFeeKndCdList.setData([]);
		$.ajax({
			type: "GET",
			url: "/TB07180S/IBIMS421BSelect",
			contentType: "application/json; charset=UTF-8",
			data: paramData,
			dataType: "json",
			success: function(data) {
				if (data.length > 0) {
					var rowSeq;
					rowSeq = data.length - 1;
					modalFeeKndCdList.setData(data);
					if (arg == undefined || arg == null) { //조회, 입력후 조회
					} else { //수정후 조회				
						for (let i = 0; i < modalFeeKndCdList.pdata.length; i++) {
							var tempFeeKndCd;
							tempFeeKndCd = modalFeeKndCdList.pdata[i].feeKndCd;
							if (tempFeeKndCd == arg) {
								rowSeq = i;
							}
						}
						setFeeKndCd(data[rowSeq]);
					}

				} else {
					if (data.length == "undefined") {
						modalFeeKndCdList.setData([]);
					} else {
						setFeeKndCd([]);
					}
				}
				modalFeeKndCdList.on("rowDblClick", function(event, ui) {
					setFeeKndCd(ui.rowData);
				});
			},
		});

	}

	/*
	 *  =====================SELECT모음=====================
	 */

	/**
	 * 저장 버튼
	 */
	function insertFeeData() {
		let result;

		let param = $("#feeData input, #feeData select");
		let paramData = {};

		if (!checkParam("I")) {
			return false;
		}

		paramData = makeParam();

		$.ajax({
			type: "POST",
			url: "/TB07180S/IBIMS421BSave",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			data: JSON.stringify(paramData),
			success: function(data) {
				if (data > 0) {
					//getFeeData(paramData.feeName);
					Swal.fire({
						title: '저장 확인',
						icon: 'success',
						text: '[수수료종류] 저장이 실행되었습니다.',
						confirmButtonText: '확인',
					}).then(() => {
						getFeeData(paramData.feeKndCd);
					});
					result = 1;
				} else {
					result = -1;
				}
			},
			error: function() {
				result = -2;
			},
		});

	}

	function checkParam(mode) {
		var option = {}
		option.title = "Error";
		option.type = "error";

		switch (mode) {
			case "I":
				// 유효성검사
				if (isEmpty($('#TB07180S_actCd').val())) {
					option.text = "계정과목을 입력해주세요";
					openPopup(option);
					return false;
				}

				if (isEmpty($('#TB07180S_feeNm').val())) {
					option.text = "수수료명을 입력해주세요";
					openPopup(option);
					return false;
				}

				if (isNotEmpty($('#TB07180S_feeLwstAmt').val()) && isNotEmpty($('#TB07180S_feeHgstAmt').val())) {
					if (Number($('#TB07180S_feeLwstAmt').val()) > Number($('#TB07180S_feeHgstAmt').val())) {
						option.text = "수수료최저금액이 수수료최고금액보다 많습니다.";
						openPopup(option);
						return false;
					}
				}
				break;
			case "D":
				if (isEmpty($('#TB07180S_feeKndCd').val())) {
					option.text = "삭제할 수수료종류 코드를 선택해주세요";
					openPopup(option);
					return false;
				}
				break;
			default:
				break;
		}

		return true;

	}

	function makeParam() {
		var actCdTxt = $('#TB07180S_actCd').val();
		var actCdVal = TB07180S_dataListVal(actCdTxt);

		var paramData = {
			"feeKndCd": $('#TB07180S_feeKndCd').val()
			, "actsCd": actCdVal
			, "feeName": $('#TB07180S_feeNm').val()
			, "feeRcogDcd": $('#TB07180S_feeRcogDcd').val()
			, "feeRcknDcd": $('#TB07180S_feeRcknDcd').val()
			, "feeRt": $('#TB07180S_feeRt').val()
			, "feeLwstAmt": $('#TB07180S_feeLwstAmt').val().replaceAll(",", "")
			, "feeHgstAmt": $('#TB07180S_feeHgstAmt').val().replaceAll(",", "")
			, "acctJobCd": $('#TB07180S_acctJobCd').val()
			, "acctUnJobCd": $('#TB07180S_acctUnJobCd').val()
			, "acctTrCd": $('#TB07180S_acctTrCd').val()
		}
		return paramData;
	}

	/**
	 * dblclick event function
	 */
	function setFeeKndCd(e) {
		var actCdTxt = TB07180S_dataListBnd(e.actsCd);

		$('#TB07180S_feeKndCd').val(e.feeKndCd);
		$('#TB07180S_actCd').val(actCdTxt);
		$('#TB07180S_feeNm').val(e.feeName);
		$('#TB07180S_feeRcogDcd').val(e.feeRcogDcd);
		$('#TB07180S_feeRcknDcd').val(e.feeRcknDcd);
		$('#TB07180S_feeRt').val(e.feeRt);
		$('#TB07180S_feeLwstAmt').val(addComma(e.feeLwstAmt));
		$('#TB07180S_feeHgstAmt').val(addComma(e.feeHgstAmt));
		$('#TB07180S_acctJobCd').val(e.acctJobCd);
		$('#TB07180S_acctUnJobCd').val(e.acctUnJobCd);
		$('#TB07180S_acctTrCd').val(e.acctTrCd);
	}



	/*
	 * =====================DELETE모음=====================
	 * 삭제버튼
	 */

	function deleteFeeData() {
		let result;
		let feeKndCd = $("#TB07180S_feeKndCd").val();

		if (!checkParam("D")) {
			return false;
		}

		var paramData = {
			"feeKndCd": feeKndCd
			, "actsCd": $("#TB07180S_actCd").val()
		}

		$.ajax({
			type: "POST",
			url: "/TB07180S/IBIMS421BDelete",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data > 0) {
					Swal.fire({
						title: '삭제 확인',
						icon: 'success',
						text: '[수수료종류] 삭제가 완료되었습니다.',
						confirmButtonText: '확인',
					}).then(() => {
						getFeeData();
					});
					result = 1;
				} else {
					result = -1;
				}
			},
			error: function() {
				result = -2;
			},
		});
	}

	/*
	 *	엑셀(Excel) PQGrid ExcelExport
	 */
	function pqExportExcel() {
		let blob = $("#TB07180S_colModel1").pqGrid("instance").exportExcel({});
		let fileName = "수수료종류관리.xlsx";
		pq.saveAs(blob, fileName);
	}

	/*
	 *  =====================DELETE모음=====================
	 */

	return {
		getFeeData: getFeeData,
		resetInputData_TB07180S: resetInputData_TB07180S,
		insertFeeData: insertFeeData,
		deleteFeeData: deleteFeeData,
		pqExportExcel: pqExportExcel,

	};

	/*
	*  =================================================
	*/



})();
