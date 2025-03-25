const GD10202Sjs = (function () {
    $(document).ready(function () {
        setGridOptions();
    });

    function inq() {

    }

    function pqGridColModel(num) {

        // const Yn = [
        //     { "Y": "Y" }
        //     , { "N": "N" }
        // ]

        const spcDesdGrid = [
            {
                title: "신청일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
                render: function (ui) {
                    return formatDate(ui.cellData)
                },
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
                title: "SPC명",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
                render: function (ui) {
                    return formatDate(ui.cellData)
                },
            },
            {
                title: "출금계좌번호",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "입금합계",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                format: "#,###",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "출금합계",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "right",
                format: "#,###",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "유동화증권 발행여부",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청일시",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인구분",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        const spcApvlRqstGrid = [
            {
                title: "승인코드",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인명",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인일시",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        const spcRjctGrid = [
            {
                title: "승인코드",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인명",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소자",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소일시",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소사유",
                dataType: "string",
                dataIndx: "",
                width: "30%",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        if (num === 1) {
            return spcDesdGrid
        }
        else if (num === 2) {
            return spcApvlRqstGrid
        }
        else if (num === 3) {
            return spcRjctGrid
        }
    }

    function setGridOptions() {

        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 270
                , maxHeight: 270
                , id: 'GD10202S_spcDesdGrid'
                , colModel: pqGridColModel(1)
                , editable: false
            },
            {
                height: 270
                , maxHeight: 270
                , id: 'GD10202S_spcApvlRqstGrid'
                , colModel: pqGridColModel(2)
                , editable: false
            },
            {
                height: 270
                , maxHeight: 270
                , id: 'GD10202S_spcRjctGrid'
                , colModel: pqGridColModel(3)
                , editable: false
            },
        ];

        setPqGrid(pqGridObjs);
    }

    return {
        // 조회

        // 초기화

    };
})();