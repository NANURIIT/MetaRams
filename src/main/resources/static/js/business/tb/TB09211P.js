let arrPqGridTemplateInfo = [];
let TB09211P_gridState = 1;
let TB09211P_pf;
let templateInfoSrchCnt = 0;

$(document).ready(function () {

});


/**
 * 모달 팝업 show
 */
function callTB09211P(prefix) {
    TB09211P_pf = prefix;
    setTimeout(() => roadListGrid_TB09211P(), 300);
    $('#TB09211P_prefix').val(prefix);
    $('#modal-TB09211P').modal('show');
    indexChangeHandler("TB09211P");
}


function roadListGrid_TB09211P() {
    // pqGrid 인스턴스 초기화 확인
    arrPqGridTemplateInfo = $("#dealTemplateInfoList").pqGrid("instance");

    // arrPqGridEmpInfo가 undefined일 경우 초기화
    if (typeof arrPqGridTemplateInfo === "undefined" || arrPqGridTemplateInfo === null) {
        let setPqGridObj = [
            {
                height: 400,
                maxHeight: 400,
                id: "dealTemplateInfoList",
                colModel: colTemplateInfo,
                scrollModel: { autoFit: false },
            },
        ];

        setPqGrid(setPqGridObj);
        // 초기화된 인스턴스를 다시 할당
        arrPqGridTemplateInfo = $("#dealTemplateInfoList").pqGrid("instance");
    } else {
        // 이미 초기화된 경우, 데이터 설정
        arrPqGridTemplateInfo.setData([]);
    }
}


/**
 * close TB09211P modal
 */
function modalClose_TB09211P() {
    $('#modal-TB09211P').modal('hide');
};


/**
 * hide modal
 */
$("#modal-TB09211P").on("hide.bs.modal", function () {
    $("#dealTemplateInfoList").pqGrid("destroy");
    reset_TB09211P();
});


/**
 * 모달 초기화
 */
function reset_TB09211P() {

}



/**
 * ajax 통신(조회)
 */
async function getTemplateList() {

}


/* ***********************************그리드 컬럼******************************** */

let colTemplateInfo = [
    {
        title: "No",
        dataType: "string",
        dataIndx: "no",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
    },
    {
        title: "템플릿 유형",
        dataType: "string",
        dataIndx: "tmplTpCd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
    },
    {
        title: "딜유형",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        colModel: [
            {
                title: "사전/사후보고 ID",
                dataType: "string",
                dataIndx: "bfhAfctRptIdYn",
                halign: "center",
                align: "center",
                width: "15%",
            },
            {
                title: "사전/사후보고명",
                dataType: "string",
                dataIndx: "bfhAfctRptNmYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
        ],
    },
    {
        title: "기본정보",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        colModel: [
            {
                title: "회사명",
                dataType: "string",
                dataIndx: "cmpNmYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
            {
                title: "사업자번호",
                dataType: "string",
                dataIndx: "bznoYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
            {
                title: "(주)담당지역",
                dataType: "string",
                dataIndx: "chrrAreaYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
            {
                title: "(주)담당그룹",
                dataType: "string",
                dataIndx: "chrrGrupYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
            {
                title: "-",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "10%",
            },
        ],
    },
    {
        title: "상세정보 > 종목정보",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        colModel: [
            {
                title: "종목명",
                dataType: "string",
                dataIndx: "isNmYn",
                halign: "center",
                align: "center",
                width: "10%",
            },
            {
                title: "-",
                dataType: "string",
                dataIndx: "",
                halign: "center",
                align: "center",
                width: "10%",
            },
        ],
    },
];