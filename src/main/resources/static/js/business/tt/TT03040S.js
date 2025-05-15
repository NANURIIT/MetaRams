const TT03040Sjs = (function() {
	let TT03040S_grid;

	$(document).ready(function() {
		pqGrid();
		searchBtn();
	});

	function pqGrid() {
		let col_grdTemp = [
			{
				title: "Deal 번호",
				dataType: "string",
				dataIndx: "dealNo",
				align: "center",
			},
			{
				title: "Deal 명",
				dataType: "string",
				dataIndx: "dealNm",
				halign: "center",
				align: "left",
			},
			{
				title: "Deal 생성일자",
				dataType: "string",
				dataIndx: "rgstDt",
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
				title: "부서코드",
				dataType: "string",
				dataIndx: "mngmBdcd",
				halign: "center",
				align: "center",
				hidden: true,
			},
			{
				title: "부서명",
				dataType: "string",
				dataIndx: "mngmBdcdNm",
				halign: "center",
				align: "center",
			},
			{
				title: "담당자사번",
				dataType: "string",
				dataIndx: "chrrEmpno",
				halign: "center",
				align: "center",
				hidden: true,
			},
			{
				title: "담당자명",
				dataType: "string",
				dataIndx: "chrrEmpnm",
				halign: "center",
				align: "center",
			},
			{
				title: "진행상태구분코드",
				dataType: "string",
				dataIndx: "mtrPrgSttsDcd",
				align: "center",
			},
			{
				title: "진행상태",
				dataType: "string",
				dataIndx: "mtrPrgSttsDcdNm",
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
		let createStartDate = $("#TT03040SCreateStartDate").val().replace("-", "")
		let createEndDate = $("#TT03040SCreateEedDate").val().replace("-", "")
		let dealNumbeer = $("#TT03040SDealNo").val()

		let paramData = {
			createStartDate: createStartDate,
			createEndDate: createEndDate,
			dealNumbeer: dealNumbeer,
		}

		$.ajax({
			uri: "/TB03040S/ibSpecSearch",
			method: "get",
			dataType: "json",
			data: JSON.stringify(paramData),
			success: function(res) {
				console.log(res)
			}
		})
	}

	return {
		TT03040S_search: searchBtn,
		TT03040S_grid: pqGrid
	};
})();