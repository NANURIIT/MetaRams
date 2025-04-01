const TB07200Sjs = (function () {

    let selectBox;
    let dprtList;

    $(document).ready(function () {

        $("#TB07200S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
        $("#TB07200S_toDate").val(getToday()); //조회종료일

        
        gridSett();
        TB07200S_onChangeHandler();

    });

    function gridSett(){

        selectBox = getSelectBoxList("TB09080S", "D010", false);

        dprtList = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "D010";
        });

        let dprtHtml;

        dprtList.forEach((item) => {
            dprtHtml += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });
    
        $("#TB07200S_dprtNm").append(dprtHtml);
    
        $("#TB07200S_dprtNm").on("change", function () {
        $("#TB07200S_dprtCd").val($("#TB07200S_dprtNm").val());
        });


        //업무지시요청 그리드 colModel
        let TB07200S_col_wrkRqst = [
            {
                title: "SPC",
                dataType: "string",
                dataIndx: "ardyBzepNo",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title	: "",
                dataType: "string",
                dataIndx: "",
                halign	: "center",
                align	: "center",
                width   : "1%",
                editable: false,
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('TB07200S_wrkRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "SPC명",
                dataType: "string",
                dataIndx: "entpNm",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청일자",
                dataType: "string",
                dataIndx: "fincExcuRqsDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청번호",
                dataType: "string",
                dataIndx: "fincExcuRqsSn",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "계약명",
                dataType: "string",
                dataIndx: "ibCtrtNm",
                editable: true,
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "자산관리계좌",
                dataType: "string",
                dataIndx: "asstMngmAcno",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "관리부점",
                dataType: "string",
                dataIndx: "dprtCd",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
                editor: {
                    type: "select",
                    valueIndx: "cdValue",
                    labelIndx: "cdName",
                    options: dprtList,
                },
                render: function (ui) {
                // console.log("cellData ::: ", ui.cellData);
                // console.log(P013);
                let dprtCd = dprtList.find(({ cdValue }) => cdValue == ui.cellData);
                return dprtCd ? dprtCd.cdName : ui.cellData;
                },
            },
            {
                title: "비고(이견)",
                dataType: "string",
                dataIndx: "rmCtns",
                halign: "center",
                align: "left",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "",
                align: "center",
                halign: "center",
                dataType: "string",
                editable: false,
                width: "5%",
                render: function (ui) {
                    if (ui.cellData === "new") {
                        return "";
                    } else {
                        return (
                        `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick=""><i class='fa fa-arrow-down'></i>&nbsp;상세</button>`
                        );
                    }
                },
            },
        ]

        //유동화증권 발행(예정) 내역 그리드 colModel
        let TB07200S_col_pblHis = [
            {
                title: "회차",
                dataType: "string",
                dataIndx: "lqdzSctyIsuTmrd",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "발행일자",
                dataType: "string",
                dataIndx: "isuDt",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "만기일자",
                dataType: "string",
                dataIndx: "expDt",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "일수",
                dataType: "string",
                dataIndx: "dnum",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "발행금액(원)",
                dataType: "string",
                dataIndx: "isuAmt",
                halign: "center",
                align: "right",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            }
        ]

        //입금요청 그리드 colModel
        let TB07200S_col_dpstRqst = [
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "trDt",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "입금항목",
                dataType: "string",
                dataIndx: "spcDepItemKndCd",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "적요",
                dataType: "string",
                dataIndx: "synsText",
                halign: "center",
                align: "left",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래상대방",
                dataType: "string",
                dataIndx: "trOthrNm",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title	: "",
                dataType: "string",
                dataIndx: "",
                halign	: "center",
                align	: "center",
                width   : "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('TB07200S_dpstRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "금액",
                dataType: "string",
                dataIndx: "rndrAmt",
                halign: "center",
                align: "right",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "은행",
                dataType: "string",
                dataIndx: "isttNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title	: "",
                dataType: "string",
                dataIndx: "",
                halign	: "center",
                align	: "center",
                width   : "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB07021P('TB07200S_dpstRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "계좌번호",
                dataType: "string",
                dataIndx: "acno",
                halign: "center",
                align: "left",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                dataType: "string",
                dataIndx: "trOthrDscmNo",
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "isttCd",
                align: "center",
                hidden: true,
            },
        ]

        //출금요청 그리드 colModel
        let TB07200S_col_wthdrwlRqst = [
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "trDt",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "출금항목",
                dataType: "string",
                dataIndx: "spcWdrItemKndCd",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "적요",
                dataType: "string",
                dataIndx: "synsText",
                halign: "center",
                align: "left",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래상대방",
                dataType: "string",
                dataIndx: "trOthrNm",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title	: "",
                dataType: "string",
                dataIndx: "",
                halign	: "center",
                align	: "center",
                width   : "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('TB07200S_wthdrwlRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "금액",
                dataType: "string",
                dataIndx: "rndrAmt",
                halign: "center",
                align: "right",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "은행",
                dataType: "string",
                dataIndx: "isttNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title	: "",
                dataType: "string",
                dataIndx: "",
                halign	: "center",
                align	: "center",
                width   : "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB07021P('TB07200S_wthdrwlRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "계좌번호",
                dataType: "string",
                dataIndx: "acno",
                halign: "center",
                align: "left",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                dataType: "string",
                dataIndx: "trOthrDscmNo",
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "isttCd",
                align: "center",
                hidden: true,
            },
        ]

        showPqGrid(TB07200S_col_wrkRqst, TB07200S_col_pblHis, TB07200S_col_dpstRqst, TB07200S_col_wthdrwlRqst);

    }

    function showPqGrid(TB07200S_col_wrkRqst, TB07200S_col_pblHis, TB07200S_col_dpstRqst, TB07200S_col_wthdrwlRqst){

        let pqGridObjs = [
            {
                height: 100,
                maxHeight: 100,
                id: "TB07200S_wrkRqst",
                colModel: TB07200S_col_wrkRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "TB07200S_pblHis",
                colModel: TB07200S_col_pblHis,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "TB07200S_dpstRqst",
                colModel: TB07200S_col_dpstRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "TB07200S_wthdrwlRqst",
                colModel: TB07200S_col_wthdrwlRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
        ]

        setPqGrid(pqGridObjs);
    }

    //그리드 행 추가
    function addRows_TB07200S(gridId){
        $(gridId).pqGrid("addRow", { rowData: {}, checkEditable: false });
    }

    //그리드 행 삭제
    function dltRows_TB07200S(gridId){
        var gridLgth =  $(gridId).pqGrid('option', 'dataModel.data').length;

        $(gridId).pqGrid("deleteRow", {rowIndx: gridLgth-1});
    }

    function TB07200S_onChangeHandler() {
        $("#TB07200S_pblHisChk").on("change", function () {
            if ($(this).is(':checked')) {
                // console.log('체크박스가 체크');
                $("#TB07200S_pblHis").pqGrid("setData", []);
                $("#pblHisPlsBtn").attr("disabled", true);
                $("#pblHisMnsBtn").attr("disabled", true);

            } else {
                // console.log('체크박스가 해제');
                $("#pblHisPlsBtn").attr("disabled", false);
                $("#pblHisMnsBtn").attr("disabled", false);
            }
        });
    }

    return {
        addRows_TB07200S: addRows_TB07200S,
        dltRows_TB07200S: dltRows_TB07200S
    };
})();