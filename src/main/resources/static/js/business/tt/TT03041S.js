const TT03041Sjs = (function() {
	$(document).ready(function() {
		pqGrid();
		resetBtn();

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
				align: "center",
			},
		];

		let pqGridObjs = [
			{
				height: 300,
				maxHeight: 300,
				id: "TT03041S_grid",
				colModel: col_grdTemp,
			}
		];

		setPqGrid(pqGridObjs);
	}

	function resetBtn() {
		$('#TT03041SDealNo').val("");
		resetPGgrids("TT03041S");
	}

	function searchBtn() {
		console.log("버튼은 눌릠");

		let dealNumbeer = $("#TT03041SDealNo").val();

		let paramData = {
			dealNumbeer: dealNumbeer,
		};

		$.ajax({
			url: "/TT03040S/ibSpecSearch",
			method: "post",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(paramData),
			success: function(res) {
				console.log("결과", res);

				$('#TT03041S_grid').pqGrid('instance').setData(res);

				$('#TT03041S_grid').pqGrid('instance').option("rowClick", function(event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TT03041S_grid");
				});
				
				$('#TT03041S_grid').pqGrid('instance').option("rowDblClick", function (event, ui) {
					console.log("제발	", ui.rowData);
							
					$("#TT03040SDealNo").val(ui.rowData.dealNo);
					$("#TT03040SDealName").val(ui.rowData.dealNm);
					
					$("#modal-TT03041S").modal("hide");
				});
			}
		})
	}

	function openDealSearchModal(prefix) {
		$("#TT03041S_prefix").val(prefix);
		$("#modal-TT03041S").modal("show");

		pqGrid();
		resetBtn();

		indexChangeHandler("TT03040S");
	}

	return {
		TT03041S_search: searchBtn,
		TT03041S_grid: pqGrid,
		TT03041S_modal: openDealSearchModal
	}

})();