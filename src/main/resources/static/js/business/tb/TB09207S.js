const TB09207Sjs = function () {

    $(document).ready(function () {
        pqGrid();
        resetAll();
        $('#disabledView').find('input').prop('disabled', true);

        $("#TB09207S_stdrDt").on('change', function(){
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
    function TB09207S_colModelData(id) {
        const TB09207S_colModel1 = [

            {
                title: "부서",
                dataType: "string",
                dataIndx: "dprtNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "수수료수익",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "(금융)자문",
						dataType: "integer",
						dataIndx: "fnAdvceFeeAmt",
						align: "right",
						halign: "center",
						//width: "10%",
					},
					{
						title: "주선",
						dataType: "integer",
						dataIndx: "mdtnFeeAmt",
						halign: "center",
						align: "right",
						//width: "10%",
					},
					{
						title: "매입확약(약정)",
						dataType: "integer",
						dataIndx: "ctrcFeePchsCfrmAmt",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
                    {
						title: "기타",
						dataType: "integer",
						dataIndx: "etcFeeAmt",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
                    {
						title: "계",
						dataType: "integer",
						dataIndx: "feeSmmAmt",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
				],
			}
            , {
				title: "투자수익",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "배당",
						dataType: "integer",
						dataIndx: "invAlotAmt",
						align: "right",
						halign: "center",
						//width: "10%",
					},
					{
						title: "매매",
						dataType: "integer",
						dataIndx: "invTrdeAmt",
						halign: "center",
						align: "right",
						//width: "10%",
					},
					{
						title: "기타",
						dataType: "integer",
						dataIndx: "etcInvAmt",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
                    {
						title: "계",
						dataType: "integer",
						dataIndx: "invSmmAmt",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
                    {
						title: "부울경CIB",
						dataType: "string",
						dataIndx: "area1",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
                    {
						title: "서울CIB",
						dataType: "string",
						dataIndx: "area2",
						halign: "center",
						align: "right",
						//width: "10%",
		  			},
				],
			}
            , {
                title: "비이자 수익합계",
                dataType: "integer",
                dataIndx: "nnIntrErnSmmAmt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
        ]

        const TB09207S_colModel2 = [

            {
                title: "본부",
                dataType: "string",
                dataIndx: "hdqtNm",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "부서",
                dataType: "string",
                dataIndx: "dprtNm",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
				title: "당일",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "수수료수익",
						dataType: "integer",
						dataIndx: "",
						halign: "center",
						align: "right",
						width: "10%",
                        colModel: [
                            {
                                title: "(금융)자문",
                                dataType: "integer",
                                dataIndx: "fnAdvceThdtFeeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "주선",
                                dataType: "integer",
                                dataIndx: "mdtnThdtFeeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "매입확약(약정)",
                                dataType: "integer",
                                dataIndx: "ctrcThdtFeePchsCfrmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "기타",
                                dataType: "integer",
                                dataIndx: "etcThdtFeeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "계",
                                dataType: "integer",
                                dataIndx: "thdtFeeSmmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                        ]
					},
                    {
						title: "투자수익",
						dataType: "integer",
						dataIndx: "",
						halign: "center",
						align: "right",
						width: "10%",
                        colModel: [
                            {
                                title: "배당",
                                dataType: "integer",
                                dataIndx: "thdtInvAlotAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "매매",
                                dataType: "integer",
                                dataIndx: "thdtInvTrdeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "기타",
                                dataType: "integer",
                                dataIndx: "etcThdtInvAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "계",
                                dataType: "integer",
                                dataIndx: "thdtInvSmmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                        ]
					},
                    {
						title: "소계",
						dataType: "integer",
						dataIndx: "thdtSbtotAmt",
						halign: "center",
						align: "right",
						width: "10%",
					}
				],
			}
            , {
				title: "당월",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "수수료수익",
						dataType: "integer",
						dataIndx: "",
						halign: "center",
						align: "right",
						width: "10%",
                        colModel: [
                            {
                                title: "(금융)자문",
                                dataType: "integer",
                                dataIndx: "fnnAdvceThmmFeeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "주선",
                                dataType: "integer",
                                dataIndx: "mdtnThmmFeeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "매입확약(약정)",
                                dataType: "integer",
                                dataIndx: "ctrcThmmFeePchsCfrmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "기타",
                                dataType: "integer",
                                dataIndx: "etcThmmInvAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "계",
                                dataType: "integer",
                                dataIndx: "thmmFeeSmmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                        ]
					},
                    {
						title: "투자수익",
						dataType: "integer",
						dataIndx: "",
						halign: "center",
						align: "right",
						width: "10%",
                        colModel: [
                            {
                                title: "배당",
                                dataType: "integer",
                                dataIndx: "thmmInvAlotAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "매매",
                                dataType: "integer",
                                dataIndx: "thmmInvTrdeAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "기타",
                                dataType: "integer",
                                dataIndx: "etcThmmInvAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                            {
                                title: "계",
                                dataType: "integer",
                                dataIndx: "thmmInvSmmAmt",
                                halign: "center",
                                align: "right",
                                width: "10%",
                            },
                        ]
					},
                    {
						title: "소계",
						dataType: "integer",
						dataIndx: "thmmSbtotAmt",
						halign: "center",
						align: "right",
						width: "10%",
					}
				],
			}
            , {
				title: "연 누적",
				dataType: "integer",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				colModel: [
					{
						title: "수수료수익 소계",
						dataType:"integer",
						dataIndx: "yrAcmlFeeErnSbtotAmt",
						align: "right",
						halign: "center",
						width: "10%",
					},
					{
						title: "투자수익 소계",
						dataType: "integer",
						dataIndx: "yrAcmlInvSbtotAmt",
						halign: "center",
						align: "right",
						width: "10%",
					},
					{
						title: "합계",
						dataType: "float",
						dataIndx: "yrAcmlSmmAmt",
						halign: "center",
						align: "right",
						width: "10%",
		  			},
				],
			}
        ]


        if (id === 1) {
            return TB09207S_colModel1;
        } else if (id === 2) {
            return TB09207S_colModel2;
        }
    }

    /*
     *  PQGRID SETTING
     */
    function pqGrid() {
        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 180
                , id: 'TB09207S_colModel1'
                , colModel: TB09207S_colModelData(1)
                , scrollModel: { autoFit: true }
                , editable: false
                , rowClick: function (event, ui) {
                    getParameter(ui.rowData.dudtMngmNo);
					pqGridSelectHandler(ui.rowIndx, "TB09207S_colModel1");
                }
                , selectionModel: { type: 'row' }
            }
            , {
                  height: 320
                , id: 'TB09207S_colModel2'
                , colModel: TB09207S_colModelData(2)
                , scrollModel: { autoFit: false }
                , editable: false
                , rowClick: function (event, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB09207S_colModel2");
                }
                , selectionModel: { type: 'row' }
            }
        ];
        setPqGrid(pqGridObjs);
        $("#TB09207S_colModel").pqGrid('instance');
    }




    /*
     *  PQGRID 초기화
     */
    function TB09207S_resetPqGrid(id) {
        $(`#${id}`).pqGrid('option', 'dataModel.data', []);
        $(`#${id}`).pqGrid('refreshDataAndView');
    }


    /**
     *  초기화
     */
    function resetAll() {

        $("#TB09207S_stdrDt").val(getCurrentDate());

        // 모든 pq그리드 초기화
        resetPGgrids("TB09207S");

    }


    function resetGrid() {

    }





    return {
        resetAll: resetAll
    }

}();