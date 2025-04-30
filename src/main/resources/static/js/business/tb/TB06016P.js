let TB06016P_rowIndx;
let TB06016P_pqGridLength = 0;
let TB06016P_rowData = {};
let deleteMdwyRdmpFeeRtoList = [];
const dummyData = TB06016P_rowData;

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB06016P(prefix) {
	$('#TB06016P_prefix').val(prefix);
	$('#modal-TB06016P').modal('show');
	indexChangeHandler("TB06016P");
	TB06016P_setData();
	setTimeout(() => TB06016P_pqGrid(), 300);
	setTimeout(() => TB06016P_getMdwyRdmpFeeRto(), 350);
}

/**
 * modal hide
 */
function modalClose_TB06016P() {
	$('#modal-TB06016P').modal('hide');
}

function TB06016P_setData() {
	$('#TB06016P_prdtCd').val($('#TB06010S_res_prdtCd').val())
	$('#TB06016P_prdtNm').val($('#TB06010S_res_prdtNm').val())
}

function TB06016P_getMdwyRdmpFeeRto() {

	let prdtCd = $('#TB06016P_prdtCd').val();

	let paramData = {
		prdtCd
	};
	$.ajax({
		type: "POST",
		url: "/TB06016P/getMdwyRdmpFeeRto",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(paramData),
		dataType: "json",
		success: function (data) {
			if (data) {
				TB06016P_pqGridLength = data.length
				let detail = $('#TB06016P_colModel').pqGrid('instance')
				detail.setData(data);
				detail.getData();
			}
		}, error: function () {
			Swal.fire({
				icon: 'error'
				, text: "정보 조회 실패"
				, confirmButtonText: "확인"
			});
		}
	});
}

/*
 *	pqGrid colmodel
 */
function TB06016P_setColModel() {
	const TB06016P_colModel = [
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
			title: "순번",
			dataType: "integer",
			width: "20%",
			align: "center",
			filter: { crules: [{ condition: 'range' }] },
			render: function (ui) {
				let result
				result = (ui.rowIndx + 1).toString();
				return result;
			}
		}
		, {
			title: "적용개월수(이내)",
			dataType: "integer",
			dataIndx: "aplyMnum",
			maxLength: 2,
			halign: "center",
			align: "right",
			filter: { crules: [{ condition: 'range' }] }
		}
		, {
			title: "중도상환수수율(%)",
			dataType: "string",
			dataIndx: "mdwyRdmpFeeRto",
			halign: "center",
			align: "right",
			filter: { crules: [{ condition: 'range' }] }
		}
		, {
			title: "구분",
			dataType: "string",
			dataIndx: "queryType",
			hidden: true
		}
		, {
			title: "일련번호",
			dataType: "string",
			dataIndx: "feeSn",
			hidden: true
		}
	]
	return TB06016P_colModel
}

/*
 *	setPqGrid dataModel and option
 */

function TB06016P_pqGrid() {
	/********************************************************************
	 * PQGrid Column
	 ********************************************************************/

	colModel = $("#TB06016P_colModel").pqGrid('instance');

	if (typeof colModel == "undefined") {
		// 그리드 옵션 생성
		let pqGridObjs = [
			{
				height: 340
				, maxHeight: 340
				, id: 'TB06016P_colModel'
				, colModel: TB06016P_setColModel()
				, editable: true
				, editModel: {
					clicksToEdit: 1
				}
				, rowClick: function (event, ui) {
					if(TB06016P_rowData === ui.rowData){
						TB06016P_rowData = dummyData;
					}else {
						TB06016P_rowData = ui.rowData;
					}

					pqGridSelectHandler(ui.rowIndx, "TB06016P_colModel");
				}
				, cellBeforeSave: function (event, ui) {
					if (ui.dataIndx === 'mdwyRdmpFeeRto') {
						let data = ui.newVal
						if (isNaN(data)) {
							Swal.fire({
								icon: 'warning'
								, text: '숫자를 입력해주세요'
								, confirmButtonText: "확인"
							})
							return false;
						}else{
							data = parseFloat(data)
						}
					}
				}
				, cellSave: function(event, ui) {
					let dataIndx = ui.dataIndx;
					let rowIndx = ui.rowIndx;
					let rowData = $("#TB06016P_colModel").pqGrid("getRowData", { rowIndx: rowIndx });
					
					if (dataIndx === 'mdwyRdmpFeeRto') {
						const grid = $("#TB06016P_colModel").pqGrid('instance');
						rowData = grid.getRowData({ rowIndx: ui.rowIndx });
						var tempRowData = rowData.mdwyRdmpFeeRto;
						
						// 00.00
						rowData.mdwyRdmpFeeRto = (Math.round(uncomma(tempRowData%100)*100)/100).toFixed(2);
					}
				}
			}
		];
		setPqGrid(pqGridObjs);
		colModel = $("#TB06016P_colModel").pqGrid('instance');
	}
	else {
		colModel.setData([]);
	}
};

function TB06016P_search(){
	let getPrdtCd = $('#TB06016P_prdtCd').val();
	//추가(by hyTest)
	if(isEmpty(getPrdtCd)){
	var option = {}
		option.title = "Error";
		option.type = "error";
		option.text = "조회할 종목코드가 존재하지않습니다..";
		openPopup(option);
		return false;
	 }	
	TB06016P_getMdwyRdmpFeeRto();
}

function TB06016P_addNewRow() {
	let row = ["순번", "적용개월수(이내)", "중도상환수수율(%)", "구분", "일련번호"]
	let newRow = {
		num: row["순번"]
		, aplyMnum: row["적용개월수(이내)"]
		, mdwyRdmpFeeRto: row["중도상환수수율(%)"]
		, queryType: row["구분"]
		, feeSn: row["일련번호"]
	};
	$("#TB06016P_colModel").pqGrid("addRow", { rowData: newRow, checkEditable: false });
	$("#TB06016P_colModel").pqGrid("refreshDataAndView");
}



function TB06016P_deleteRow() {

	let gridLgth = $("#TB06016P_colModel").pqGrid("instance").pdata.length;
	let gridData = $("#TB06016P_colModel").pqGrid("option", "dataModel.data");

	let checkedRows = [];
	for (let i = 0; i < gridLgth; i++) {
		let rowData = gridData[i];
		if (rowData.chk === true) {
			checkedRows.push(rowData);
		}
	}

	if (checkedRows && checkedRows.length > 0) {

		checkedRows.forEach(function (row) {
			deleteMdwyRdmpFeeRtoList.push(row);
			$("#TB06016P_colModel").pqGrid('deleteRow', { rowIndx: row.pq_ri });
		});

	}
	if (checkedRows.length <= 0) {
		Swal.fire({
			icon: 'warning'
			, title: "Warning!"
			, text: "삭제할 행을 체크해주세요."
			, confirmButtonText: "확인"
		});
		return false;
	}
}

async function TB06016P_saveData() {
	let getPrdtCd = $('#TB06016P_prdtCd').val()
	//추가(by hyTest)
	 if(isEmpty(getPrdtCd)){
	var option = {}
		option.title = "Warning!";
		option.type = "warning";
		option.text = "저장할 종목코드가 존재하지않습니다.";
		openPopup(option);
		return false;
	 }
	
	let mdwyRdmpFeeRtoList = $('#TB06016P_colModel').pqGrid('instance').getData();

	let insertMdwyRdmpFeeRtoList = [];
	let updateMdwyRdmpFeeRtoList = [];

	for (let i = 0; i < mdwyRdmpFeeRtoList.length; i++) {
		if (mdwyRdmpFeeRtoList[i].queryType === 'u') {
			updateMdwyRdmpFeeRtoList.push(mdwyRdmpFeeRtoList[i])
		} else if (!mdwyRdmpFeeRtoList[i].queryType) {
			insertMdwyRdmpFeeRtoList.push(mdwyRdmpFeeRtoList[i])
		}
	}
	
	let insertParamData = {
		prdtCd: getPrdtCd
		, mdwyRdmpFeeRtoList: insertMdwyRdmpFeeRtoList
	};
	let updateParamData = {
		prdtCd: getPrdtCd
		, mdwyRdmpFeeRtoList: updateMdwyRdmpFeeRtoList
	};
	let deleteParamData = {
		prdtCd: getPrdtCd
		, mdwyRdmpFeeRtoList: deleteMdwyRdmpFeeRtoList
	}

	let insertResult;
	let updateResult;
	let deleteResult;

	if (insertMdwyRdmpFeeRtoList.length > 0) {
		await $.ajax({
			type: "POST",
			url: "/TB06016P/insertMdwyRdmpFeeRto",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(insertParamData),
			dataType: "json",
			success: function (data) {
				insertResult = 0
			}, error: function () {
				insertResult = -1
			}
		});
	} else {
		insertResult = 0;
	}

	if (updateMdwyRdmpFeeRtoList.length > 0) {
		await $.ajax({
			type: "POST",
			url: "/TB06016P/updateMdwyRdmpFeeRto",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(updateParamData),
			dataType: "json",
			success: function (data) {
				updateResult = 0;
			}, error: function () {
				updateResult = -1
			}
		});
	} else {
		updateResult = 0;
	}

	if (deleteMdwyRdmpFeeRtoList.length > 0) {
		await $.ajax({
			type: "POST",
			url: "/TB06016P/deleteMdwyRdmpFeeRto",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(deleteParamData),
			dataType: "json",
			success: function (data) {
				deleteResult = 0;

				deleteMdwyRdmpFeeRtoList = [];
			}, error: function () {
				deleteResult = -1
			}
		});
	} else {
		deleteResult = 0;
	}

	// 초기화
	if (insertResult === 0 && updateResult === 0 && deleteResult === 0) {
		Swal.fire({
			icon: 'success'
			, text: "중도상환수수료 저장에 성공하였습니다."
			, confirmButtonText: "확인"
		});
	} else {
		Swal.fire({
			icon: 'warning'
			, text: "중도상환수수료 저장에 실패하였습니다."
			, confirmButtonText: "확인"
		});
	}
	
	setTimeout(() => TB06016P_getMdwyRdmpFeeRto(), 500);
}

async function deleteIBIMS204B() {
	let prdtCd = $('#TB06016P_prdtCd').val();
	let feeSn = TB06016P_rowData.feeSn;

	let paramData = {
		  prdtCd
		, feeSn
	}
    await $.ajax({
        type: "POST",
        url: "/TB06016P/deleteMdwyRdmpFeeRto",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                Swal.fire({
                    icon: "success"
                    , text: "삭제성공!"
                    , confirmButtonText: "확인"
                })
            } else {
                Swal.fire({
                    icon: "warning"
                    , text: "삭제실패!"
                    , confirmButtonText: "확인"
                })
            }
        }, error: function () {
            Swal.fire({
                icon: "error"
                , text: "에러!"
                , confirmButtonText: "확인"
            })
        }
    });
    TB06016P_getMdwyRdmpFeeRto();
}