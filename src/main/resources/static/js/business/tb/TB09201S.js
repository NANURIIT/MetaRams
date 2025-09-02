const TB09201Sjs = function () {

    $(document).ready(function () {
        pqGrid();
        resetAll();
        $('#disabledView').find('input').prop('disabled', true);

        $("#TB09201S_stdrDt").on('change', function(){
            resetGrid();
        })

    });


    function getCurrentDate() {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2); // 1월은 0부터 시작하므로 +1
        var day = ('0' + today.getDate()).slice(-2);

        return year + '-' + month + '-' + day; // YYYY-MM-DD 형식으로 반환
    }


    /*
     *  =====================PQGRID=====================
     */

    /*
     *  pqGrid colModel
     */
    function TB09201S_colModelData(id) {
        const TB09201S_colModel1 = [

            {
                title: "본부",
                dataType: "string",
                dataIndx: "hdqtNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "부서",
                dataType: "string",
                dataIndx: "dprtNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "당월 누적",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "목표",
						dataType: "integer",
						dataIndx: "thmmGoalAmt",
						align: "right",
						halign: "center",
						width: "10%",
					},
					{
						title: "실적",
						dataType: "integer",
						dataIndx: "thmmPfmcAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "달성률",
						dataType: "float",
						dataIndx: "thmmAcmtrt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
				],
			}
            , {
				title: "연간",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "목표",
						dataType: "integer",
						dataIndx: "yrlyGoalAmt",
						align: "right",
						halign: "center",
						width: "10%",
					},
					{
						title: "실적",
						dataType: "integer",
						dataIndx: "yrlyPfmcAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "달성률",
						dataType: "float",
						dataIndx: "yrlyAcmtrt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
				],
			}
        ]

        const TB09201S_colModel2 = [

            {
                title: "본부",
                dataType: "string",
                dataIndx: "hdqtNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "부서",
                dataType: "string",
                dataIndx: "dprtNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "IB 전체",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "대출채권",
						dataType: "integer",
						dataIndx: "allLoanBondAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "채무보증",
						dataType: "integer",
						dataIndx: "allDbtEnsrAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "기타",
						dataType: "integer",
						dataIndx: "allEtcAmt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
                    {
						title: "계",
						dataType: "integer",
						dataIndx: "allSmmAmt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
				],
			}
            , {
				title: "부동산금융",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "대출채권",
						dataType: "integer",
						dataIndx: "rlesLoanBondAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "채무보증",
						dataType: "integer",
						dataIndx: "rlesDbtEnsrAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "기타",
						dataType: "integer",
						dataIndx: "rlesEtcAmt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
                    {
						title: "계",
						dataType: "integer",
						dataIndx: "rlesSmmAmt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
				],
			}
            , {
                title: "RWA",
                dataType: "float",
                dataIndx: "rwaRt",
                halign: "center",
				width: "10%",
                align: "right",
                filter: { crules: [{ condition: 'range' }] }
            }
        ]

        const TB09201S_colModel3 = [
            {
                title: "구분",
                dataType: "string",
                dataIndx: "clsf",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "자기자본 대비 부동산 익스포저",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt1",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto1",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "사업초기 단계",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt2",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto2",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "중후순위",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt3",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto3",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "고 LTV",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt4",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto4",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
        ]

        const TB09201S_colModel4 = [
            {
                title: "구분",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "서울",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt5",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto5",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "경기",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt6",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto6",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "인천",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt7",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto7",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "부산",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt8",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto8",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "경남",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt9",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto9",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "기타",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt10",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto10",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
            , {
				title: "계",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "금액",
						dataType: "integer",
						dataIndx: "amt11",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "비율",
						dataType: "float",
						dataIndx: "rto11",
						halign: "center",
						align: "right",
						width: "10%",
					},
				],
			}
        ]

        if (id === 1) {
            return TB09201S_colModel1;
        } else if (id === 2) {
            return TB09201S_colModel2;
        } else if (id === 3) {
            return TB09201S_colModel3;
        } else if (id === 4) {
            return TB09201S_colModel4;
        }

    }

    /*
     *  PQGRID SETTING
     */
    function pqGrid() {
        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                //height: 280
                //, maxHeight: 280
                 id: 'TB09201S_colModel1'
                , colModel: TB09201S_colModelData(1)
                , scrollModel: { autoFit: true }
                , editable: false
                , rowClick: function (event, ui) {
                    getParameter(ui.rowData.dudtMngmNo);
					pqGridSelectHandler(ui.rowIndx, "TB09201S_colModel1");
                }
                , selectionModel: { type: 'row' }
            }
            , {
                 id: 'TB09201S_colModel2'
                , colModel: TB09201S_colModelData(2)
                , scrollModel: { autoFit: false }
                , editable: false
                , rowClick: function (event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB09201S_colModel2");
                }
                , selectionModel: { type: 'row' }
            }
            , {
                height: 180
                , id: 'TB09201S_colModel3'
                , colModel: TB09201S_colModelData(3)
                , scrollModel: { autoFit: true }
                , editable: false
                , rowClick: function (event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB09201S_colModel3");
                }
                , selectionModel: { type: 'row' }
            }
            , {
                height: 180
                , id: 'TB09201S_colModel4'
                , colModel: TB09201S_colModelData(4)
                , scrollModel: { autoFit: false }
                , horizontal: true
                , editable: false
                , rowClick: function (event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB09201S_colModel4");
                }
                , selectionModel: { type: 'row' }
            }
        ];
        setPqGrid(pqGridObjs);
        $("#TB09201S_colModel").pqGrid('instance');
    }




    /*
     *  PQGRID 초기화
     */
    function TB09201S_resetPqGrid(id) {
        $(`#${id}`).pqGrid('option', 'dataModel.data', []);
        $(`#${id}`).pqGrid('refreshDataAndView');
    }


    /**
     *  초기화
     */
    function resetAll() {

        $("#TB09201S_stdrDt").val(getCurrentDate());

        // 모든 pq그리드 초기화
        resetPGgrids("TB09201S");

    }


    function resetGrid() {

    }


    /**
	 * 엑셀저장 PQGrid ExcelExport
	 */
	function saveExcelFile() {
		let blob = $('#TB09201S_colModel1').pqGrid('instance').exportExcel({});
		let fileName;
		fileName = "경영현황.xlsx";
		pq.saveAs(blob, fileName);
	}


    return {
        // select: select,      //  조회
        resetAll: resetAll
        , saveExcelFile: saveExcelFile
    }

}();