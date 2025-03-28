const GD10203Sjs = (function () {
    $(document).ready(function () {
        // 조회조건 Default Set
        $("#GD10203S_fromMm").val(addMonth(getToday(), -1).slice(0, 7));
        $("#GD10203S_toMm").val(getToday().slice(0, 7));
        setGridOptions();
    });

    function test() {
        let testJson = {
            amt: "100000"
        }

        $("#GD10203S_spcBlceGrid").pqGrid('instance').setData(JSON.stringify(testJson))
    }

    function inq() {

    }

    function pqGridColModel() {

        console.log("???");

        const spcBlceGrid = [
            {
                title: "",
                align: "center",
                colModel: [
                    {
                        title: "기준월",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: {
                            type: "sum",
                            value: "합계",
                        },
                        render: function (ui) {
                            return ui.cellData.substr(0, 4) + ui.cellData.substr(5, 6);
                        },
                    },
                    {
                        title: "관리부점",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "SPC명",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "left",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "DEAL명",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "left",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "전월말 잔고",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
            /**
             * 입금항목
             */
            {
                title: "입금항목",
                align: "center",
                colModel: [
                    {
                        title: "입금합계",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "유동화증권 인수대금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "기초자산 원리금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "취급수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "원전세 환급",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "후순위대여 입금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "대출채권 매각대금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "자금운용 목적 계좌좌수",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
            /**
             * 출금항목
             */
            {
                title: "출금항목",
                align: "center",
                colModel: [
                    {
                        title: "출금합계",
                        dataType: "string",
                        dataIndx: "amt",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "유동화증권 상환",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "대출 실행/추가입출",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "ABB/ABL 원리금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "셀다운 비용",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "원진세 합계",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "후순위대여 상환",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "자금은행목적 계좌",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
            /**
             * 유동화관련비용
             */
            {
                title: "유동화관련비용",
                align: "center",
                colModel: [
                    {
                        title: "법무법인수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "업무위탁수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "회계강사수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "신용평가수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "대리금융수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "설립정산수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "발행등록수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
            /**
             * 당사수취수익
             */
            {
                title: "당사수취수익",
                align: "center",
                colModel: [
                    {
                        title: "보증수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "자산관리수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "인수 수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "이관/주선수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "취급수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "기타",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "당월말잔고",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "촥정일",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "확정담당자",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
        ]

        return spcBlceGrid;
    }

    function setGridOptions() {

        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 600
                , maxHeight: 600
                , id: 'GD10203S_spcBlceGrid'
                , colModel: pqGridColModel()
                , editable: false
                , scrollModel: { autoFit: false }
            },
        ];

        setPqGrid(pqGridObjs);
    }

    return {
        // 조회

        // 초기화
        test: test,

    };
})();