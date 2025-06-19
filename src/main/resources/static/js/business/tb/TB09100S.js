
const TB09100Sjs = (function() {

	$(document).ready(function() {
		fnSelectBox();
		setGrid_TB09100S();
		loadUserAuth();

		// $("#TB09100S_fromDate").val(getSomeDaysAgo(7));
		// $("#TB09100S_toDate").val(getToday());

		reset_TB09110S();

		//기간검색 유효성 검사 함수
		chkValFromToDt("TB09100S_fromDate","TB09100S_toDate");

		// 조회조건 수정시 초기화
		$("#TB09100S_conSrch").find('input, select').on('input', function () {
			resetPGgrids("TB09100S")
		})
	});

	// 담당직원정보
	function loadUserAuth() {
		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function(data) {
				$("#TB09100S_dprtNm").val(data.dprtCd).prop("selected", true);
				$("#TB09100S_dprtCd").val(data.dprtCd);
				$("#TB09100S_chrr_empNo").val(data.eno);
				$("#TB09100S_chrr_empNm").val(data.empNm);
			},
		});
	}

	//그리드 set
	function setGrid_TB09100S() {
		setGrid_exposureStatus();
		setGrid_revenue();
		setGrid_cost();
	}

	function setGrid_exposureStatus() {
		//딜 익스포져 현황 colM
		let colM_exposureStatus = [
			{
				title: "Deal번호",
				dataType: "string",
				dataIndx: "dealNo",
				align: "center",
				halign: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "Deal명",
				dataType: "string",
				dataIndx: "dealNm",
				align: "left",
				halign: "center",
				width: "15%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "10%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "15%",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "계정과목명",
				dataType: "string",
				dataIndx: "actsCd",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "승인금액",
				dataType: "string",
				dataIndx: "sumRcgAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);

					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					value = value / $("#TB09100S_expUnit").val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
			{
				title: "약정금액",
				dataType: "string",
				dataIndx: "eprzCrdlApvlAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);

					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					value = value / $("#TB09100S_expUnit").val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
			{
				title: "투자금액",
				dataType: "string",
				dataIndx: "dealExcAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);
					
					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					
					value = value / $("#TB09100S_expUnit").val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
			{
				title: "투자잔액",
				dataType: "string",
				dataIndx: "dealExcBlce",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);

					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					value = value / $("#TB09100S_expUnit").val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
			{
				title: "담당부서",
				dataType: "string",
				dataIndx: "dprtNm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "담당자",
				dataType: "string",
				dataIndx: "chrrEmpnm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
		];

		//딜 익스포져 헌황 그리드
		var obj_exposureStatus = {
			height: 195,
			maxHeight: 195,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			scrollModel: { autoFit: true },
			colModel: colM_exposureStatus,
			strNoRows: "데이터가 없습니다.",
			rowClick: function(event, ui) {
				pqGridSelectHandler ( ui.rowIndx, "TB09110S_exposureStatus" );	
				var rowData = ui.rowData;
				getFeeIntTrList(rowData);
			},
		};

		$("#TB09110S_exposureStatus").pqGrid(obj_exposureStatus);
	}

	function setGrid_revenue() {
		//딜 손익현황 - 수익 항목 colM
		let colM_revenue = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수익항목",
				dataType: "string",
				dataIndx: "trNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수익금액",
				dataType: "string",
				dataIndx: "trIntAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);

					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					value = value / $('#TB09100S_pflsUnit').val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
		];

		//딜 손익현황 (수익) 그리드
		var obj_revenue = {
			height: 280,
			maxHeight: 280,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			scrollModel: { autoFit: true },
			colModel: colM_revenue,
			strNoRows: "데이터가 없습니다.",
		};

		$("#TB09110S_revenue").pqGrid(obj_revenue);
	}

	function setGrid_cost() {
		//딜 손익현황 - 비용 항목 colM
		let colM_cost = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "비용항목",
				dataType: "string",
				dataIndx: "",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "비용금액",
				dataType: "string",
				dataIndx: "",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					var value = parseFloat(ui.cellData);

					if (value === 0 || ui.cellData == null || value == NaN) {
						return "";
					}
					
					value = value / $('#TB09100S_pflsUnit').val();

					var formattedValue = value.toLocaleString("ko-KR", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
					});

					return formattedValue;
				},
			},
		];

		//딜 손익현황 (비용) 그리드
		var obj_cost = {
			height: 280,
			maxHeight: 280,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			scrollModel: { autoFit: true },
			colModel: colM_cost,
			strNoRows: "데이터가 없습니다.",
		};

		$("#TB09110S_cost").pqGrid(obj_cost);
	}

	//초기화
	function reset_TB09110S() {
		/* 그리드 초기화 */
		$("#TB09110S_exposureStatus").pqGrid("setData", []);
		$("#TB09110S_revenue").pqGrid("setData", []);
		$("#TB09110S_cost").pqGrid("setData", []);

		/* 검색조건 초기화 */
		$("#TB09100S_dprtCd").val($("#userDprtCd").val()); //관리부서코드
		$("#TB09100S_dprtNm").val($("#userDprtCd").val()); //관리부서명
		$("#TB09100S_chrr_empNo").val($("#userEno").val()); //담당자 사번
		$("#TB09100S_chrr_empNm").val($("#userEmpNm").val()); //담당자명
		$("#TB09100S_ibDealNo").val(""); //Deal 번호
		$("#TB09100S_ibDealNm").val(""); //Deal 명
		$("#TB09100S_prdtCd").val(""); //종목코드
		$("#TB09100S_prdtNm").val(""); //종목명
		$("#TB09100S_fromDate").val(addMonth(getToday(), -1));
		$("#TB09100S_toDate").val(getToday());
	}

	//익스포져 현황 조회
	function getExposureList() {
		var prdtCd = $("#TB09100S_prdtCd").val(); //종목코드
		var prdtNm = $("#TB09100S_prdtNm").val(); //종목명
		var dprtCd = $("#TB09100S_dprtCd").val(); //관리부서코드
		var dprtNm = $("#TB09100S_dprtNm").val(); //관리부서명
		var empNo = $("#TB09100S_chrr_empNo").val(); //담당자 사번
		var empNm = $("#TB09100S_chrr_empNm").val(); //담당자명
		var dealNo = $("#TB09100S_ibDealNo").val(); //Deal 번호
		var dealNm = $("#TB09100S_ibDealNm").val(); //Deal 명
		var fromDate = $("#TB09100S_fromDate").val().replaceAll("-", ""); //투자기간 시작일
		var toDate = $("#TB09100S_toDate").val().replaceAll("-", ""); //투자기간 종료일

		var param = {
			dealNo: dealNo, //Deal번호
			prdtCd: prdtCd, //종목코드
			mngmBdcd: dprtCd, //부서코드
			chrrEmpno: empNo, //사번
			ctrcDt1: fromDate, //승인일자1
			ctrcDt2: toDate, //승인일자2
		};

		$.ajax({
			type: "GET",
			url: "/TB09100S/selectDealExposure",
			data: param,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				$("#TB09110S_exposureStatus").pqGrid(
					"option",
					"strNoRows",
					"조회 중입니다..."
				);
				$("#TB09110S_exposureStatus").pqGrid("setData", []);
			},
			success: function(data) {
				//console.log(JSON.stringify(data));

				$("#TB09110S_exposureStatus").pqGrid(
					"option",
					"strNoRows",
					"데이터가 없습니다."
				);

				if (data.length > 0) {
					$("#TB09110S_exposureStatus").pqGrid("setData", data);
				}
				else {
					$("#TB09110S_revenue").pqGrid("setData", []);
					Swal.fire({
						icon: 'warning'
						, title: 'Warning!'
						, text: '조회된 내역이 없습니다!'
					})
				}
			},
			error: function(request, status, error) {
				//console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
			},
		});
	}

	function refreshGrid(index) {

		var currentData = $(index).pqGrid("option", "dataModel.data");
		$(index).pqGrid("option", "dataModel.data", currentData);
		$(index).pqGrid("refreshDataAndView");
		if (index == "#TB09110S_revenue") {
			var index2 = "#TB09110S_cost";
			var currentData = $(index2).pqGrid("option", "dataModel.data");
			$(index2).pqGrid("option", "dataModel.data", currentData);
			$(index2).pqGrid("refreshDataAndView");
		}
	}

	//딜 손익현황 (수익정보) 조회
	function getFeeIntTrList(rowData) {
		var prdtCd = rowData.prdtCd;

		var paramDTO = {
			prdtCd: prdtCd,
		};

		$.ajax({
			type: "GET",
			url: "/TB09100S/selectFeeIntTrList",
			data: paramDTO,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				$("#TB09110S_revenue").pqGrid(
					"option",
					"strNoRows",
					"조회 중입니다..."
				);
				$("#TB09110S_revenue").pqGrid("setData", []);
			},
			success: function(data) {
				//console.log(JSON.stringify(data));

				$("#TB09110S_revenue").pqGrid(
					"option",
					"strNoRows",
					"데이터가 없습니다."
				);

				if (data.length > 0) {
					$("#TB09110S_revenue").pqGrid("setData", data);
					$("#TB09110S_revenue").pqGrid("instance").option("rowClick", function (event, ui) {
						pqGridSelectHandler ( ui.rowIndx, "TB09110S_revenue" );
			        });
				}
			},
			error: function(request, status, error) {
				// console.log(
				// 	"code:" +
				// 	request.status +
				// 	"\n" +
				// 	"message:" +
				// 	request.responseText +
				// 	"\n" +
				// 	"error:" +
				// 	error
				// );
			},
		});
	}

	/**
	 * selectBox 부서코드 set
	 */
	function fnSelectBox() {
		let selectBox = getSelectBoxList(
			"TB09100S",
			"D010",   //부서코드
			false
		);

		let TB09100S_grdSelect

		TB09100S_grdSelect = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "D010";
		})

		let D010html;

		TB09100S_grdSelect.forEach((item) => {
			D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});

		$("#TB09100S_dprtNm").append(D010html);

		$('#TB09100S_dprtNm').on('change', function() {
			$('#TB09100S_dprtCd').val($('#TB09100S_dprtNm').val())
		})

	}

	return {
		getExposureList: getExposureList,
		reset_TB09110S: reset_TB09110S,
		refreshGrid: refreshGrid,
	};
})();
