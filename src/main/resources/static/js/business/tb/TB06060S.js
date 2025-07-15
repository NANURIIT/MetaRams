const TB06060Sjs = (function() {
	let prdtInfoGridIns;

	let colM_TB06060S = [
		{
			title: "Deal번호",
			dataType: "string",
			dataIndx: "dealNo",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "Deal명",
			dataType: "string",
			dataIndx: "dealNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "안건명",
			dataType: "string",
			dataIndx: "mtrNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
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
			title: "종목명",
			dataType: "string",
			dataIndx: "prdtNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "진행상태",
			dataType: "string",
			//dataIndx: "mtrPrgSttsNm",
			dataIndx: "prgSttsNm",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "거래상대방명",
			dataType: "string",
			dataIndx: "entpNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "상품대분류",
			dataType: "string",
			dataIndx: "invPrdtLclsNm",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "종목승인금액",
			dataIndx: "eprzCrdlApvlAmt",
			dataType: "integer",
			align: "right",
			halign: "center",
			width: "",
			//filter: { crules: [{ condition: 'range' }] },
			format: "#,###",
		},
		{
			title: "약정금액",
			dataIndx: "eprzCrdlCtrcAmt",
			dataType: "integer",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
			format: "#,###",
		},
		{
			title: "잔액",
			dataIndx: "dealExcBlce",
			dataType: "integer",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
			format: "#,###",
		},
		{
			title: "상환회차",
			dataIndx: "rdmpTmrd",
			dataType: "String",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "mtrDcd",
			dataIndx: "mtrDcd",
			dataType: "String",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
			hidden: true,
		},
		{
			title: "약정해지구분코드",
			dataIndx: "ctrcCclcDcd",
			dataType: "String",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
			hidden: true,
		},
		{
			title: "결재상태구분코드",
			dataIndx: "decdSttsDcd",
			dataType: "String",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: "range" }] },
			hidden: true,
		},
	];

	$(document).ready(function() {
		setGrid_TB06060S();

		// $("#TB06060S_ibDealNo").on("input", function () {
		//   console.log("1");
		//   getWorkflowList();

		// });
		// $("#TB06060S_prdtNm").on("input", function () {

		//   getWorkflowList();
		// });
	});

	function setDetails(rowData) {
		setFlow(getFlowLevel(rowData));
		showDetailData(rowData, true);
		TB06060S_moveTab(rowData.prdtCd);
	}

	function setGrid_TB06060S() {
		var obj = {
			height: 140,
			maxHeight: 140,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			scrollModel: { autoFit: true },
			colModel: colM_TB06060S,
			strNoRows: "조회된 데이터가 없습니다.",
			rowClick: function(event, ui) {

				// setFlow(getFlowLevel(rowData));
				// showDetailData(rowData, true);
				pqGridSelectHandler(ui.rowIndx, "TB06060S_prdtInfoGrid", setDetails(ui.rowData));

			},
			editModel: {
				clicksToEdit: 1
			}
			// cellClick: function (event, ui) {
			//   //클릭시 선택한 열 볼드처리
			//   //console.log(ui.rowData)
			//   $("#TB06060S_prdtInfoGrid .pq-grid-row").css("font-weight", "");
			//   //var row = $("#TB09060S_grid1").pqGrid("getRow", { rowIndx: ui.rowIndx});
			//   $("#pq-body-row-u0-" + ui.rowIndx + "-right").css(
			//     "font-weight",
			//     "bold"
			//   );
			// },
		};

		$("#TB06060S_prdtInfoGrid").pqGrid(obj);
		$("#TB06060S_prdtInfoGrid").pqGrid("refreshDataAndView");
		prdtInfoGridIns = $("#TB06060S_prdtInfoGrid").pqGrid("instance");
	}

	function getFlowLevel(data) {
		if (
			data.prgSttsNm == "대출실행" ||
			data.prgSttsNm == "매수" ||
			data.prgSttsNm == "대출실행"
		) {
			//console.log("실행완료");
			return 6;
		} else if (data.ctrcCclcDcd == "1") {
			//console.log("약정완료");
			return 5;
		} else if (data.prdtCd != null && data.decdSttsDcd == "2") {
			//console.log("종목코드 있음");
			return 4;
		} else if (data.mtrNm != null) {
			//console.log("안건명 있음");
			return 3;
		}
		//console.log("딜번호만 있음");
		return 3;
	}
	/*********************
	 * 240614 초기화 추가 *
	 *********************/
	function resetAll() {
		$("#TB06060S_ibDealNo").val("");
		$("#TB06060S_ibDealNm").val("");
		$("#TB06060S_prdtCd").val("");
		$("#TB06060S_prdtNm").val("");
		$("#TB06060S_cnsbNm").val("");
		$("#TB06060S_jdgmRsltDcd").val("");
		$("#TB06060S_jdgmRsltRgstDt").val("");
		$("#TB06060S_jdgmRsltCtns").val("");
		var waitHtml =
			'<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
		$(".flow-status p").removeClass("-check");
		$(".flow-status div").html(waitHtml);
		prdtInfoGridIns.setData([]);

		//
		//탭관련 Class 초기화 
		$("#ramsTab .nav-link").removeClass("disabled");
		$("#ramsTab .nav-link[href='#tab-2']").removeClass("active");
		$("#ramsTab .nav-link[href='#tab-3']").removeClass("active");
		
		$("#ramsTab .nav-link[href='#tab-1']").addClass("active");  // Tab_1 active 상태로
	}

	function getWorkflowList() {
		if (!$("#TB06060S_ibDealNo").val()) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "딜번호를 입력해주세요!",
			});

			return 0;
		}

		const paramData = {
			dealNo: $("#TB06060S_ibDealNo").val(),
			prdtCd: $("#TB06060S_prdtCd").val(),
		};

		//console.log(paramData);

		$.ajax({
			type: "POST",
			url: "/TB06060S/getWorkflowInfoList",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data) {
					prdtInfoGridIns.setData(data);
					if (data.length == 0) {
						$("#TB06060S_cnsbNm").val("");
						$("#TB06060S_jdgmRsltDcd").val("");
						$("#TB06060S_jdgmRsltRgstDt").val("");
						$("#TB06060S_jdgmRsltCtns").val("");
						var waitHtml =
							'<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
						$(".flow-status p").removeClass("-check");
						$(".flow-status div").html(waitHtml);
					} else {
						TB06060S_moveTab(data[0].prdtCd);
						setFlow(getFlowLevel(data[0]));
						showDetailData(data[0], true);
					}
				} else {
					Swal.fire({
						icon: "warning",
						title: "warning!",
						text: "정상처리되지 않았습니다.",
						confirmButtonText: "확인",
					}).then((result) => {
						resetAll();
					});
				}
			},
			error: function(e) {
				//console.log(e);
				Swal.fire({
					icon: "error",
					title: "error!",
					text: "정상처리되지 않았습니다.",
					confirmButtonText: "확인",
				}).then((result) => {
					resetAll();
				});
			},
		});
	}

	function openPage(menuId, pageNm) {
		sessionStorage.setItem("isFromWF", true);
		sessionStorage.setItem("wfDealNo", $("#sessionDealNo").val());
		sessionStorage.setItem("wfDealNm", $("#sessionDealNm").val());
		sessionStorage.setItem("wfPrdtCd", $("#sessionPrdtCd").val());
		sessionStorage.setItem("wfPrdtNm", $("#sessionPrdtNm").val());
		callPage(menuId, pageNm);
	}

	function showDetailData(rowData, isAuto) {
		$("#sessionDealNo").val(rowData.dealNo);
		$("#sessionDealNm").val(rowData.dealNm);
		$("#sessionPrdtCd").val(rowData.prdtCd);
		$("#sessionPrdtNm").val(rowData.prdtNm);
		const paramData = {
			dealNo: rowData.dealNo,
			mtrDcd: rowData.mtrDcd,
		};

		//console.log(paramData);

		$.ajax({
			type: "POST",
			url: "/TB06060S/getWorkflowDetail",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function(data) {
				if (data) {
					$("#TB06060S_cnsbNm").val(data.cnsbNm);
					$("#TB06060S_jdgmRsltDcd").val(data.jdgmRsltDcdNm);
					$("#TB06060S_jdgmRsltRgstDt").val(formatDate(data.jdgmRsltRgstDt));
					$("#TB06060S_jdgmRsltCtns").val(data.jdgmRsltCtns);
				} else {
					Swal.fire({
						icon: "warning",
						title: "warning!",
						text: "데이터가 없습니다.",
						confirmButtonText: "확인",
					}).then((result) => {
						$("#TB06060S_cnsbNm").val("");
						$("#TB06060S_jdgmRsltDcd").val("");
						$("#TB06060S_jdgmRsltRgstDt").val("");
						$("#TB06060S_jdgmRsltCtns").val("");
						var waitHtml =
							'<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
						$(".flow-status p").removeClass("-check");
						$(".flow-status div").html(waitHtml);
					});
				}
			},
			error: function(e) {
				//console.log(e);
				if (!isAuto) {
					Swal.fire({
						icon: "error",
						title: "error!",
						text: "심사정보 데이터를 불러오지 못했습니다.",
						confirmButtonText: "확인",
					}).then((result) => {
						$("#TB06060S_cnsbNm").val("");
						$("#TB06060S_jdgmRsltDcd").val("");
						$("#TB06060S_jdgmRsltRgstDt").val("");
						$("#TB06060S_jdgmRsltCtns").val("");
					});
				}
				$("#TB06060S_cnsbNm").val("");
				$("#TB06060S_jdgmRsltDcd").val("");
				$("#TB06060S_jdgmRsltRgstDt").val("");
				$("#TB06060S_jdgmRsltCtns").val("");
			},
		});
	}

	function setFlow(index) {
		var flow = Math.floor(index / Math.pow(10, String(index).length - 1));

		var waitHtml =
			'<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
		var registHtml =
			'<span class="status-desc">상태 : <span class="status -regist">완료</span></span>';
		$(".flow-status p").removeClass("-check");
		$(".flow-status div").html(waitHtml);

		for (var i = 0; i < flow; i++) {
			var indexNm = "[name = flow0" + i + "]";
			$(indexNm + " p").addClass("-check");
			$(indexNm + " div").html(registHtml);
		}
	}

	function TB06060S_moveTab(code) {

		if (code == null) {
			// 첫 번째 탭 활성화
			$("#ramsTab .nav-link").removeClass("active");
			$("#ramsTab .nav-link").addClass("disabled");
			$('#ramsTab .nav-link[href="#tab-1"]')
				.removeClass("disabled")
				.addClass("active");
			// 첫 번째 탭의 콘텐츠도 보여지도록 처리
			$(".tab-pane").removeClass("active show");
			$("#tab-1").addClass("active show");
			return;
		}

		var prdtCode = code.charAt(0);

		if (prdtCode == "A") {
			// 첫 번째 탭 활성화
			$("#ramsTab .nav-link").removeClass("active");
			$("#ramsTab .nav-link").addClass("disabled");
			$('#ramsTab .nav-link[href="#tab-1"]')
				.removeClass("disabled")
				.addClass("active");
			// 첫 번째 탭의 콘텐츠도 보여지도록 처리
			$(".tab-pane").removeClass("active show");
			$("#tab-1").addClass("active show");
		} else if (prdtCode == "B") {
			$("#ramsTab .nav-link").removeClass("active");
			$("#ramsTab .nav-link").addClass("disabled");
			$('#ramsTab .nav-link[href="#tab-2"]')
				.removeClass("disabled")
				.addClass("active");
			$(".tab-pane").removeClass("active show");
			$("#tab-2").addClass("active show");
		} else if (prdtCode == "C") {
			$("#ramsTab .nav-link").removeClass("active");
			$("#ramsTab .nav-link").addClass("disabled");
			$('#ramsTab .nav-link[href="#tab-3"]')
				.removeClass("disabled")
				.addClass("active");
			$(".tab-pane").removeClass("active show");
			$("#tab-3").addClass("active show");
		}
	}

	return {
		getWorkflowList: getWorkflowList,
		resetAll: resetAll,
		openPage: openPage,
	};
})();
