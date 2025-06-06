const GD10201Sjs = (function () {

    $(document).ready(function () {

        $("#GD10201S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
        $("#GD10201S_toDate").val(getToday()); //조회종료일

        gridSett();

        //기간검색 유효성 검사 함수
        chkValFromToDt("GD10201S_fromDate","GD10201S_toDate");

    });

    function gridSett(){

        //업무지시요청 그리드 colModel
        let GD10201S_col_wrkRqst = [
            {
                title: "SPC",
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
                title: "신청일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청번호",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "계약명",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "자산관리계좌",
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
                title: "비고(이견)",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        //유동화증권 발행(예정) 내역 그리드 colModel
        let GD10201S_col_pblHis = [
            {
                title: "회차",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "발행일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "만기일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "일수",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "발행금액(원)",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            }
        ]

        //입금요청 그리드 colModel
        let GD10201S_col_dpstRqst = [
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "입금항목",
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
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래상대방",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
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
                title: "은행",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "계좌번호",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            }
        ]

        //출금요청 그리드 colModel
        let GD10201S_col_wthdrwlRqst = [
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "입금항목",
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
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래상대방",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
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
                title: "은행",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "계좌번호",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            }
        ]

        showPqGrid(GD10201S_col_wrkRqst, GD10201S_col_pblHis, GD10201S_col_dpstRqst, GD10201S_col_wthdrwlRqst);

    }

    function showPqGrid(GD10201S_col_wrkRqst, GD10201S_col_pblHis, GD10201S_col_dpstRqst, GD10201S_col_wthdrwlRqst){

        let pqGridObjs = [
            {
                height: 100,
                maxHeight: 100,
                id: "GD10201S_wrkRqst",
                colModel: GD10201S_col_wrkRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "GD10201S_pblHis",
                colModel: GD10201S_col_pblHis,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "GD10201S_dpstRqst",
                colModel: GD10201S_col_dpstRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
            {
                height: 100,
                maxHeight: 100,
                id: "GD10201S_wthdrwlRqst",
                colModel: GD10201S_col_wthdrwlRqst,
                scrollModel: { autoFit: true },
                editable: false,
                numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
            },
        ]

        setPqGrid(pqGridObjs);
    }

    //그리드 행 추가
    function addRows_GD10201S(gridId){
        $(gridId).pqGrid("addRow", { rowData: {}, checkEditable: false });
    }

    //그리드 행 삭제
    function dltRows_GD10201S(gridId){
        var gridLgth =  $(gridId).pqGrid('option', 'dataModel.data').length;

        $(gridId).pqGrid("deleteRow", {rowIndx: gridLgth-1});
    }

    

    return {
        addRows_GD10201S: addRows_GD10201S,
        dltRows_GD10201S: dltRows_GD10201S
    };
})();