const TT03040Sjs = (function() {
	$(document).ready(function() {
		pqGrid();
		resetBtn();
	});

	function pqGrid() {
		let col_grdTemp = [
			{
				title: "Deal 번호",
				dataType: "string",
				dataIndx: "dealno",
				align: "center",
			},
			{
				title: "Deal 명",
				dataType: "string",
				dataIndx: "dealnm",
				halign: "center",
				align: "left",
			},
			{
				title: "Deal 생성일자",
				dataType: "string",
				dataIndx: "hnddetldtm",
				align: "center",
				render: function(ui) {
					let cellData = ui.cellData;
					if (cellData && cellData.length !== 0) {
						let rgstDt1 = cellData.substring(0, 4);
						let rgstDt2 = cellData.substring(4, 6);
						let rgstDt3 = cellData.substring(6, 8);
						return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
					}
					return cellData;
				},
			},
			{
				title: "부서명",
				dataType: "string",
				dataIndx: "dealno",
				halign: "center",
				align: "center",
			},
			{
				title: "담당자명",
				dataType: "string",
				dataIndx: "dealno",
				halign: "center",
				align: "center",
			},
			{
				title: "진행상태구분코드",
				dataType: "string",
				dataIndx: "dealno",
				align: "center",
			},
			{
				title: "진행상태",
				dataType: "string",
				dataIndx: "dealno",
				halign: "center",
			},
		];

		let pqGridObjs = [
			{
				height: 500,
				maxHeight: 500,
				id: "TT03040S_grid",
				colModel: col_grdTemp,
			}
		];
		
		setPqGrid(pqGridObjs);
		grdTemp = $("#TT03040S_grid").pqGrid("instance");
	}

	function searchBtn() {
		let createStartDate = $("#TT03040SCreateStartDate").val().replaceAll("-", "");
		let createEndDate = $("#TT03040SCreateEedDate").val().replaceAll("-", "");
		let dealNumbeer = $("#TT03040SDealNo").val();

		let paramData = {
			createStartDate: createStartDate,
			createEndDate: createEndDate,
			dealNumbeer: dealNumbeer,
		};

		$.ajax({
			url: "/TT03040S/ibSpecSearch",
			method: "get",
			dataType: "json",
			data: paramData,
			success: function(res) {
				console.log("결과", res);
				
				$('#TT03040S_grid').pqGrid('instance').setData(res);

				$('#TT03040S_grid').pqGrid('instance').option("rowClick", function (event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TT03040S_grid");
				});

				$('#TT03040S_grid').pqGrid('instance').option("rowDblClick", function (event, ui) { 
					movePage(ui.rowData);
				});
			}
		})
	}

	function movePage(e) {
		console.log("뭘 눌렀니", e);

		sessionStorage.setItem("dealNo", e.dealNo);

		callPage("TT03020S", "딜정보등록");
	  }

	function resetBtn() {
		$("#TT03040SCreateStartDate").val(addMonth(getToday(), -1));
		$("#TT03040SCreateEedDate").val(getToday());
		$('#TT03040SDealNo').val("");
		resetPGgrids("TT03040S")
	}

	return {
		TT03040S_search: searchBtn,
		TT03040S_grid: pqGrid,
		TT03040S_reset: resetBtn
	};
})();
