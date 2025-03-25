const GD10204Sjs = (function () {

    $(document).ready(function () {

        $("#GD10201S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
        $("#GD10201S_toDate").val(getToday()); //조회종료일

        gridSett();

    });

    function gridSett(){

        //거래내역 그리드 colModel
        let GD10201S_col_trsctHis = [
            //체크박스
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
                editable: "true",
                cb: {
                all: false,
                header: true,
                },
            },
            {
                title: "승인",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "확정",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "SPC명",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "자산관리계좌번호",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "구분",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "항목",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "적요",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "금액",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "잔고",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "수정인",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "관리부점",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "비고",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "정렬순서",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        let pqGridObjs = [
            {
                height: 500,
                maxHeight: 500,
                id: "GD10204S_trsctHis",
                colModel: GD10201S_col_trsctHis,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            }
        ]

        setPqGrid(pqGridObjs);
    }

    return {

    };
})();