const TB07200Sjs = (function () {

    let selectBox;
    let dprtList;               // 부서코드
    let depList;                // 입금항목구분코드   
    let wdrList;                // 출금항목구분코드
    let wrkRqstSlctdRow;        // 자금집행업무지시요청 목록 그리드(마스터그리드) 선택된 행

    let dltWrkRqstList = [];         // 삭제 자금집행업무지시요청 목록
    let dltPblHis = [];              // 삭제 유동화증권 발행(예정) 내역 목록
    let dltRnDrList = [];            // 삭제 입출금요청 목록

    $(document).ready(function () {

        $("#TB07200S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
        $("#TB07200S_toDate").val(getToday()); //조회종료일

        gridSett();
        TB07200S_onChangeHandler();

        //기간검색 유효성 검사 함수
        chkValFromToDt("TB07200S_fromDate", "TB07200S_toDate");
    });

    /**
     * 자금집행업무지시요청 목록 조회
     * @description
     * 첫번째 그리드
     */
    function selectSpcList() {
        let paramData = {
            ardyBzepNo: $('#TB07200S_ardyBzepNo').val(),
            ibCtrtNm: $("#TB07200S_ibCtrtNm").val(),
            asstMngmAcno: $("#TB07200S_asstMngmAcno").val(),
            dprtCd: $("#TB07200S_dprtCd").val(),
            fromDate: unformatDate($("#TB07200S_fromDate").val()),
            toDate: unformatDate($("#TB07200S_toDate").val()),
        }

        $.ajax({
            type: "POST",
            url: `/TB07200S/selectSpcList`,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            success: function (data) {
                if (data.length > 0) {
                    $('#TB07200S_wrkRqst').pqGrid('instance').setData(data);
                }
                else {
                    $('#TB07200S_wrkRqst').pqGrid('instance').setData([]);
                    Swal.fire({
                        icon: "warning",
                        title: "Warning!",
                        text: "조회된 내용이 없습니다!",
                    })
                }
                // 유동화발행, 입금내역, 출금내역
                $('#TB07200S_pblHis').pqGrid('instance').setData([]);
                $('#TB07200S_dpstRqst').pqGrid('instance').setData([]);
                $('#TB07200S_wthdrwlRqst').pqGrid('instance').setData([]);
                // 삭제 리스트 초기화
                dltWrkRqstList = [];
                dltPblHis = [];
                dltRnDrList = [];
            },
        })
    }

    /**
     * 상세버튼클릭시 실행
     * 유동화증권 발행(예정)내역
     * 입금요청
     * 출금요청
     * 조회
     * @param {*} e 
     */
    function spcDetail(e) {

        wrkRqstSlctdRow = e;

        let wrkRqstData = $("#TB07200S_wrkRqst").pqGrid("getRowData", { rowIndx: wrkRqstSlctdRow });

        let ardyBzepNo = wrkRqstData.ardyBzepNo;                //기업체번호           
        let fincExcuRqsSn = wrkRqstData.fincExcuRqsSn;          //신청번호

        // 신규항목 상세버튼 클릭시
        if (isEmpty(fincExcuRqsSn)) {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "저장된 정보만 조회가능합니다!",
            })
            return;
        }
        // 이미 존재하는 항목 상세버튼 클릭시
        else {

            // 기업체번호
            // 자금집행신청일련번호
            let paramData = {
                ardyBzepNo: ardyBzepNo,
                fincExcuRqsSn: fincExcuRqsSn
            }

            $.ajax({
                type: "POST",
                url: `/TB07200S/spcDetail`,
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(paramData),
                success: function (data) {

                    const pblHisList = data.pblHisList;               //유동화증권방행내역
                    const dpstRqstList = data.dpstRqstList;           //입금요청내역
                    const wthdrwlRqstList = data.wthdrwlRqstList;     //출금요청내역

                    if (pblHisList.length == 0 && dpstRqstList.length == 0 && wthdrwlRqstList.length == 0) {
                        $('#TB07200S_pblHis').pqGrid('instance').setData([]);
                        $('#TB07200S_dpstRqst').pqGrid('instance').setData([]);
                        $('#TB07200S_wthdrwlRqst').pqGrid('instance').setData([]);

                        $("#TB07200S_empNo").val(wrkRqstData.hndEmpno);
                        $("#TB07200S_ibDealNo").val(wrkRqstData.fincExcuRqsSn);
                        Swal.fire({
                            icon: "warning",
                            title: "Warning!",
                            text: "조회된 내용이 없습니다!",
                        })
                    }
                    else {
                        $('#TB07200S_pblHis').pqGrid('instance').setData(pblHisList);
                        $('#TB07200S_dpstRqst').pqGrid('instance').setData(dpstRqstList);
                        $('#TB07200S_wthdrwlRqst').pqGrid('instance').setData(wthdrwlRqstList);

                        $("#TB07200S_empNo").val(wrkRqstData.hndEmpno);
                        $("#TB07200S_ibDealNo").val(wrkRqstData.fincExcuRqsSn);
                    }

                    chkDecdStep("TB07200S");
                },
            })
        }

    }

    /**
     * 공통코드 가져오기
     * 
     * @param
     * D010 부서코드
     * S010 SPC입금항목구분코드
     * S011 SPC출금항목구분코드
     */
    function gridSett() {
        selectBox = getSelectBoxList("TB09080S", "D010/S010/S011", false);

        dprtList = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "D010";
        });

        depList = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "S010";
        });

        wdrList = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "S011";
        });

        let dprtHtml;

        dprtList.forEach((item) => {
            dprtHtml += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#TB07200S_dprtNm").append(dprtHtml);

        $("#TB07200S_dprtNm").on("change", function () {
            $("#TB07200S_dprtCd").val($("#TB07200S_dprtNm").val());
        });

        let dateEditor_pblHis = function (ui) {
            let $inp = ui.$cell.find("input");

            $inp.datepicker({
                todayBtn: "linked",
                autoclose: true,
                format: "yyyy-mm-dd",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: false,
                language: "ko",
            }).on("changeDate", function (e) {
                $("#TB07200S_pblHis").pqGrid("setSelection", { rowIndx: ui.rowIndx, dataIndx: ui.dataIndx });
                $("#TB07200S_pblHis").pqGrid("setSelection", null);
            });

        }

        let dateEditor_dpstRqst = function (ui) {
            let $inp = ui.$cell.find("input");

            $inp.datepicker({
                todayBtn: "linked",
                autoclose: true,
                format: "yyyy-mm-dd",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: false,
                language: "ko",
            }).on("changeDate", function (e) {
                $("#TB07200S_dpstRqst").pqGrid("setSelection", { rowIndx: ui.rowIndx, dataIndx: ui.dataIndx });
                $("#TB07200S_dpstRqst").pqGrid("setSelection", null);
            });

        }

        let dateEditor_wthdrwlRqst = function (ui) {
            let $inp = ui.$cell.find("input");

            $inp.datepicker({
                todayBtn: "linked",
                autoclose: true,
                format: "yyyy-mm-dd",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: false,
                language: "ko",
            }).on("changeDate", function (e) {
                $("#TB07200S_wthdrwlRqst").pqGrid("setSelection", { rowIndx: ui.rowIndx, dataIndx: ui.dataIndx });
                $("#TB07200S_wthdrwlRqst").pqGrid("setSelection", null);
            });

        }


        //업무지시요청 그리드 colModel
        let TB07200S_col_wrkRqst = [
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
                title: "SPC",
                dataType: "string",
                dataIndx: "ardyBzepNo",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "1%",
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
                render: function (ui) {
                    let cellData = ui.cellData;
                    if (!isEmpty(cellData) && cellData.length === 8) {
                        return formatDate(cellData);
                    } else {
                        return cellData;
                    }
                },
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
                    let rowData = ui.rowData;

                    if (ui.cellData === "new") {
                        return "";
                    } else {
                        return (
                            `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB07200Sjs.spcDetail(${rowData.pq_ri});"><i class='fa fa-arrow-down'></i>&nbsp;상세</button>`
                        );
                    }
                },
            },
            {
                title: "등록사원번호",
                dataIndx: "hndEmpno",
                hidden: true,
            },
        ]

        //유동화증권 발행(예정) 내역 그리드 colModel
        let TB07200S_col_pblHis = [
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
                title: "회차",
                dataType: "string",
                dataIndx: "lqdzSctyIsuTmrd",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "발행일자",
                dataType: "date",
                format: "yyyy-mm-dd",
                dataIndx: "isuDt",
                halign: "center",
                align: "center",
                editor: {
                    type: "textbox",
                    init: dateEditor_pblHis,
                },
                validations: [{ type: 'regexp', value: '^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$', msg: 'Not in yyyy-mm-dd format' }],
                editable: true,
                render: function (ui) {
                    let cellData = replaceAll(ui.cellData, '-', '');
                    if (!isEmpty(cellData) && cellData.length === 8) {
                        return formatDate(cellData);
                    } else if (!isEmpty(cellData) && cellData.length > 8) {
                        return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
                    } else {
                        return cellData;
                    }
                }
            },
            {
                title: "만기일자",
                dataType: "date",
                format: "yyyy-mm-dd",
                dataIndx: "expDt",
                halign: "center",
                align: "center",
                editor: {
                    type: "textbox",
                    init: dateEditor_pblHis,
                },
                validations: [{ type: 'regexp', value: '^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$', msg: 'Not in yyyy-mm-dd format' }],
                editable: true,
                render: function (ui) {
                    let cellData = replaceAll(ui.cellData, '-', '');
                    if (!isEmpty(cellData) && cellData.length === 8) {
                        return formatDate(cellData);
                    } else if (!isEmpty(cellData) && cellData.length > 8) {
                        return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
                    } else {
                        return cellData;
                    }
                }
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
                dataType: "integer",
                dataIndx: "isuAmt",
                halign: "center",
                align: "right",
                format: "#,###",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
            },
            {
                dataType: "string",
                dataIndx: "ardyBzepNo",                 //기업체번호
                align: "center",
                hidden: true,
            },
        ]

        //입금요청 그리드 colModel
        let TB07200S_col_dpstRqst = [
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
                title: "거래일자",
                dataType: "date",
                format: "yyyy-mm-dd",
                dataIndx: "trDt",
                halign: "center",
                align: "center",
                editor: {
                    type: "textbox",
                    init: dateEditor_dpstRqst,
                },
                validations: [{ type: 'regexp', value: '^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$', msg: 'Not in yyyy-mm-dd format' }],
                //validations:[ {type: 'regexp', value: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', msg : 'Not in yyyy-mm-dd format'}],
                editable: true,
                render: function (ui) {
                    let cellData = replaceAll(ui.cellData, '-', '');
                    if (!isEmpty(cellData) && cellData.length === 8) {
                        return formatDate(cellData);
                    } else if (!isEmpty(cellData) && cellData.length > 8) {
                        return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
                    } else {
                        return cellData;
                    }
                }
            },
            {
                title: "입금항목",
                dataType: "string",
                dataIndx: "spcDepItemKndCd",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
                editor: {
                    type: "select",
                    valueIndx: "cdValue",
                    labelIndx: "cdName",
                    options: depList,
                },
                render: function (ui) {
                    // console.log("cellData ::: ", ui.cellData);
                    // console.log(P013);
                    let spcDepItemKndCd = depList.find(({ cdValue }) => cdValue == ui.cellData);
                    return spcDepItemKndCd ? spcDepItemKndCd.cdName : ui.cellData;
                },
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
                title: "",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('TB07200S_dpstRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "금액",
                dataType: "integer",
                dataIndx: "rndrAmt",
                halign: "center",
                align: "right",
                format: "#,###",
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
                title: "",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "1%",
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
            {
                dataType: "string",
                dataIndx: "ardyBzepNo",            //기업체번호
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "fincExcuRqsSn",         //자금집행신청일련번호
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "trSn",                  //거래일련번호
                align: "center",
                hidden: true,
            }
        ]

        //출금요청 그리드 colModel
        let TB07200S_col_wthdrwlRqst = [
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
                title: "거래일자",
                dataType: "date",
                format: "yyyy-mm-dd",
                dataIndx: "trDt",
                halign: "center",
                align: "center",
                editor: {
                    type: "textbox",
                    init: dateEditor_wthdrwlRqst,
                },
                validations: [{ type: 'regexp', value: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', msg: 'Not in yyyy-mm-dd format' }],
                editable: true,
                render: function (ui) {
                    let cellData = replaceAll(ui.cellData, '-', '');
                    if (!isEmpty(cellData) && cellData.length === 8) {
                        return formatDate(cellData);
                    } else if (!isEmpty(cellData) && cellData.length > 8) {
                        return formatDate(cellData.slice(0, 8));  // 최대 자리수 초과 시 잘라내기
                    } else {
                        return cellData;
                    }
                }
            },
            {
                title: "출금항목",
                dataType: "string",
                dataIndx: "spcWdrItemKndCd",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: "range" }] },
                editor: {
                    type: "select",
                    valueIndx: "cdValue",
                    labelIndx: "cdName",
                    options: wdrList,
                },
                render: function (ui) {
                    let spcWdrItemKndCd = wdrList.find(({ cdValue }) => cdValue == ui.cellData);
                    return spcWdrItemKndCd ? spcWdrItemKndCd.cdName : ui.cellData;
                },
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
                title: "",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "1%",
                render: function (ui) {
                    let rowData = ui.rowData;
                    return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03061P('TB07200S_wthdrwlRqst', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
                }
            },
            {
                title: "금액",
                dataType: "integer",
                dataIndx: "rndrAmt",
                halign: "center",
                align: "right",
                format: "#,###",
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
                title: "",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "1%",
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
            {
                dataType: "string",
                dataIndx: "ardyBzepNo",            //기업체번호
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "fincExcuRqsSn",         //자금집행신청일련번호
                align: "center",
                hidden: true,
            },
            {
                dataType: "string",
                dataIndx: "trSn",                  //거래일련번호
                align: "center",
                hidden: true,
            }
        ]

        showPqGrid(TB07200S_col_wrkRqst, TB07200S_col_pblHis, TB07200S_col_dpstRqst, TB07200S_col_wthdrwlRqst);

        //유동화증권 발행(예정) 내역 일수 계산
        $("#TB07200S_pblHis").pqGrid("option", "formulas", [
            ['dnum', function (rd) {
                // console.log("일수계산 시작일::: " + rd.isuDt)
                // console.log("일수계산 종료일::: " + rd.expDt)
                return dateDiff(rd.isuDt, rd.expDt);
            }
            ]
        ]
        );

    }

    function showPqGrid(TB07200S_col_wrkRqst, TB07200S_col_pblHis, TB07200S_col_dpstRqst, TB07200S_col_wthdrwlRqst) {

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
    function addRows_TB07200S(gridId) {

        // 자금집행업무지시요청 목록 그리드 조건
        if (gridId === "#TB07200S_wrkRqst") {
            $(gridId).pqGrid("addRow", {
                rowData: {
                    fincExcuRqsDt: getToday(),
                    dprtCd: $("#userDprtCd").val()
                }, checkEditable: false
            });
        }

        // 유동화증권발행내역, 입출금요청 그리드 조건
        else {
            // 자금집행업무일련번호의 존재유무로 validate
            if ( !wrkRqstSlctdRow && wrkRqstSlctdRow != 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Warning!",
                    text: "자금집행업무지시요청을 선택해주세요!",
                })
                return;
            }
            // 선택은 되었으나 자금집행일련번호가 존재하지 않는경우
            else if (!$("#TB07200S_wrkRqst").pqGrid('option', 'dataModel.data')[wrkRqstSlctdRow].fincExcuRqsSn || $("#TB07200S_wrkRqst").pqGrid('option', 'dataModel.data')[wrkRqstSlctdRow].fincExcuRqsSn === undefined) {
                Swal.fire({
                    icon: "warning",
                    title: "Warning!",
                    text: "등록된 자금집행업무지시요청을 선택해주세요!",
                })
                return;
            }

            // 존재하는 자금집행업무지시요청 목록이 선택됨
            else {
                let wrkRqstData = $("#TB07200S_wrkRqst").pqGrid("getRowData", { rowIndx: wrkRqstSlctdRow });
                let validRslt = spcValidation(wrkRqstData, "wrkRqst");

                if (validRslt === 1) {
                    $(gridId).pqGrid("addRow", {
                        rowData: {

                        }, checkEditable: false
                    });
                } 
                else {
                    return false;
                }
            }
        }
    }

    /**
     * 그리드 행 삭제
     * @param { String } gridId 
     * @description
     * 1. 그리드 아이디에 따라 삭제할 그리드 지정
     * 2. 그리고 체크박스 확인
     * 3. 행 삭제
     */
    function dltRows_TB07200S(gridId) {

        let gridLgth = $(gridId).pqGrid('option', 'dataModel.data').length;
        let gridData = $(gridId).pqGrid("option", "dataModel.data");

        let checkedRows = [];
        for (let i = 0; i < gridLgth; i++) {
            let rowData = gridData[i];
            if (rowData.chk === true) {
                checkedRows.push(rowData);
            }
        }

        if (checkedRows && checkedRows.length > 0) {
            
            checkedRows.forEach(function (row) {
                
                // 딜리트리스트 생성
                // 자금집행업무지시요청
                if ( gridId === "#TB07200S_wrkRqst" ) {
                    dltWrkRqstList.push($(gridId).pqGrid("option", "dataModel.data")[row.pq_ri]);
                }

                // 유동화증권 발행내역
                else if ( gridId === "#TB07200S_pblHis" ) {
                    dltPblHis.push($(gridId).pqGrid("option", "dataModel.data")[row.pq_ri]);
                }
                // 입출금요청
                else if ( gridId === "#TB07200S_dpstRqst" || gridId === "#TB07200S_wthdrwlRqst" ) {
                    dltRnDrList.push($(gridId).pqGrid("option", "dataModel.data")[row.pq_ri]);
                    console.log(dltRnDrList);
                }

                // 생성 후 삭제
                $(gridId).pqGrid('deleteRow', { rowIndx: row.pq_ri });
                // 현재 조회중인 자금집행업무지시요청 행 삭제시 하단 그리드 초기화도 같이
                if (gridId === "#TB07200S_wrkRqst" && row.pq_ri === wrkRqstSlctdRow) {
                    $('#TB07200S_pblHis').pqGrid('instance').setData([]);
                    $('#TB07200S_dpstRqst').pqGrid('instance').setData([]);
                    $('#TB07200S_wthdrwlRqst').pqGrid('instance').setData([]);
                }
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

    /**
     * 수정된 전체 그리드 저장
     * 신규목록, 수정목록, 삭제목록
     * @returns 
     */
    function spcSave() {

        let wrkRqstLgth = $("#TB07200S_wrkRqst").pqGrid('option', 'dataModel.data').length;//자금집행업무지시요총 목록 그리드 행 갯수

        // 자금집행업무지시요청 목록이 length === 0 인 경우
        if (wrkRqstLgth < 1) {
            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "자금집행업무지시요청 목록이 존재하지 않습니다."
            });
        }
        // 자금집행업무지시요청 목록이 존재할 경우
        else {

            const wrkRqstData = $("#TB07200S_wrkRqst").pqGrid("getRowData", { rowIndx: wrkRqstSlctdRow });

            let validRslt = spcValidation(wrkRqstData, "wrkRqst");

            if (validRslt === 1) {

                let pblHisList = $("#TB07200S_pblHis").pqGrid("getData");               // 유동화증권방행내역
                let dpstRqstList = $("#TB07200S_dpstRqst").pqGrid("getData");           // 입금요청내역
                let wthdrwlRqstList = $("#TB07200S_wthdrwlRqst").pqGrid("getData");     // 출금요청내역

                /*************************** 날짜포맷 START ************************/
                // 유동화증권
                for (let i = 0; i < pblHisList.length; i++) {
                    pblHisList[i].isuDt = unformatDate(pblHisList[i].isuDt);            // 발행일자
                    pblHisList[i].expDt = unformatDate(pblHisList[i].expDt);            // 만기일자
                }
                // 입금요청목록
                for (let i = 0; i < dpstRqstList.length; i++) {
                    dpstRqstList[i].trDt = unformatDate(dpstRqstList[i].trDt);          // 거래일자
                }
                // 출금요청목록
                for (let i = 0; i < wthdrwlRqstList.length; i++) {
                    wthdrwlRqstList[i].trDt = unformatDate(wthdrwlRqstList[i].trDt);    // 거래일자
                }
                /***************************   날짜포맷 END  ************************/

                let paramData = {
                    ardyBzepNo: wrkRqstData.ardyBzepNo,                                 // 기업체번호 (=== SPC)
                    fincExcuRqsDt: (wrkRqstData.fincExcuRqsDt).replaceAll('-', ''),     // 자금집행신청일자
                    fincExcuRqsSn: wrkRqstData.fincExcuRqsSn,                           // 자금집행신청일련번호
                    ibCtrtNm: wrkRqstData.ibCtrtNm,                                     // IB계약명
                    asstMngmAcno: wrkRqstData.asstMngmAcno,                             // 자산관리계좌번호
                    dprtCd: wrkRqstData.dprtCd,                                         // 관리부점코드
                    rmCtns: wrkRqstData.rmCtns,                                         // 비고내용
                    pblHisList: pblHisList,                                             // 유동화증권 발행 내역
                    dpstRqstList: dpstRqstList,                                         // 입금요청
                    wthdrwlRqstList: wthdrwlRqstList,                                   // 출금요청
                    dltWrkRqstList: dltWrkRqstList,                                     // 삭제할 자금집행 업무지시요청
                    dltPblHis: dltPblHis,                                               // 삭제할 유동화증권발행내역
                    dltRnDrList: dltRnDrList,                                           // 삭제할 입출금요청
                }

                $.ajax({
                    type: "POST",
                    url: `/TB07200S/spcSave`,
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(paramData),
                    success: function (data) {
                        Swal.fire({
                            icon: "success"
                            , title: "Success!"
                            , text: "저장 성공!"
                        })
                        // 삭제 리스트 초기화
                        dltWrkRqstList = [];
                        dltPblHis = [];
                        dltRnDrList = [];
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "저장에 실패하였습니다!",
                        });
                    },
                })

            }
            // 나머지
            else {
                return false;
            }

        }

    }

    /**
     * 그리드 유효성체크
     * @param { Object } gridData 그리드콜모델데이타
     * @param { String } gridNm 그리드ID
     * @returns 
     */
    function spcValidation(gridData, gridNm) {

        if (isEmpty(wrkRqstSlctdRow) || wrkRqstSlctdRow === undefined) {
            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "자금집행업무지시요청 목록이 선택되지 않았습니다."
                , confirmButtonText: "확인"
            });
            return 0;

        }
        else {

            //자금집행업무지시요청 목록
            if (gridNm === "wrkRqst") {           

                let ardyBzepNo = gridData.ardyBzepNo;       //기업체번호 (==SPC)
                let ibCtrtNm = gridData.ibCtrtNm;           //계약명
                let asstMngmAcno = gridData.asstMngmAcno;   //자산관리계좌

                console.log(ardyBzepNo);
                console.log(ibCtrtNm);
                console.log(asstMngmAcno);

                //기업체번호 미입력
                if (isEmpty(ardyBzepNo)) {        

                    Swal.fire({
                        icon: 'warning'
                        , title: "Warning!"
                        , text: "[자금집행업무지시요청 목록] SPC를 선택해주세요."
                        , confirmButtonText: "확인"
                    });

                    return 0;

                }
                //계약명 미입력
                else if (isEmpty(ibCtrtNm)) {    

                    Swal.fire({
                        icon: 'warning'
                        , title: "Warning!"
                        , text: "[자금집행업무지시요청 목록] 계약명을 입력해주세요."
                        , confirmButtonText: "확인"
                    });

                    return 0;

                } 
                //자산관리계좌 미입력
                else if (isEmpty(asstMngmAcno)) {

                    Swal.fire({
                        icon: 'warning'
                        , title: "Warning!"
                        , text: "[자금집행업무지시요청 목록] 자산관리계좌를 입력해주세요."
                        , confirmButtonText: "확인"
                    });

                    return 0;

                }
                else {
                    return 1;
                }
            }
        }

    }

    //화면 초기화
    function reset_TB07200S() {

        $("#TB07200S_ardyBzepNo").val("");              //SPC
        $("#TB07200S_entpNm").val("");                  //SPC명
        $("#TB07200S_ibCtrtNm").val("");                //계약명
        $("#TB07200S_asstMngmAcno").val("");            //자산관리계좌
        $("#TB07200S_dprtNm").val("");                  //관리부점
        $("#TB07200S_dprtCd").val("");                  //관리부점코드
        $("#TB07200S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
        $("#TB07200S_toDate").val(getToday());                              //조회종료일

        $("#TB07200S_wrkRqst").pqGrid('instance').setData([]);              //자금집행업무지시요청 목록
        $("#TB07200S_pblHis").pqGrid('instance').setData([]);               //유동화증권 발행내역
        $("#TB07200S_dpstRqst").pqGrid('instance').setData([]);             //입금요청 내역
        $("#TB07200S_wthdrwlRqst").pqGrid('instance').setData([]);          //출금요청 내역

        wrkRqstSlctdRow = null;

        // 삭제 리스트 초기화
        dltWrkRqstList = [];
        dltPblHis = [];
        dltRnDrList = [];

    }

    return {
        addRows_TB07200S: addRows_TB07200S,
        dltRows_TB07200S: dltRows_TB07200S,
        selectSpcList: selectSpcList,
        spcDetail: spcDetail,
        spcSave: spcSave,
        reset_TB07200S: reset_TB07200S
    };
})();