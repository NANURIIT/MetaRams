let arrPqGridDealInfo = [];
let TB03021P_gridState = 1;
let TB03021P_pf;
let TB03021P_onchangehandler;
let ibDealNoSrchCnt = 0;

$(document).ready(function () {
  selectBoxSet_TB03021P();
  keyDownEnter_TB03021P();
  modalShowFunction_TB03021P();
  reset_TB03021P();
});

//부서 셀렉트박스 세팅
function selectBoxSet_TB03021P() {
  selectBox = getSelectBoxList("TB03021P", "D010", false);

  dprtList = selectBox.filter(function (item) {
    //부서코드 list
    return item.cmnsGrpCd === "D010";
  });

  dprtList.forEach((item) => {
    $("#TB03021P_dprtNm").append(
      $("<option>", {
        value: item.cdValue,
        text: `${item.cdName}`,
      })
    );
  });
}

$("#TB03021P_dprtNm").on("change", function () {
  var dprtCd = $(this).val();

  $("#TB03021P_dprtCd").val(dprtCd);
});

function TB03021P_srch(menuId) {
  //input에 값 입력 시 자동 조회
  $(
    `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB03021P"]:not([disabled])`
  )
    .closest("span.input-group-append")
    .prev("input[id*='_ibDealNo']")
    .on("input", async function () {
      const currentInput = $(this);
      const ibDealpNmInput = currentInput
        .closest(".input-group")
        .find('input[id*="_ibDealNm"]'); // 같은 div 내의 empNm input
      ibDealpNmInput.val(""); // ibDealpNmInput 초기화

      if (currentInput.val().length === 17) {
        await ibDealNoSrchEvent(currentInput);
      }
    });

  // 'keydown' 이벤트로 조회 (Enter키)
  $(
    `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB03021P"]:not([disabled])`
  )
    .closest("span.input-group-append")
    .prev("input[id*='_ibDealNo']")
    .on("keydown", async function (evt) {
      if (evt.keyCode === 13 && $(this).val().length !== 17) {
        evt.preventDefault();
        await ibDealNoSrchEvent($(this));
      }
    });

  async function ibDealNoSrchEvent(selector) {
    let prefix;
    const inputId = $(selector).attr("id");
    // 입력된 id에 따라 prefix 결정
    const lastIndex = inputId.lastIndexOf("_"); // 마지막 '_'의 위치 찾기
    prefix = inputId.substring(0, lastIndex); // 0부터 마지막 '_' 전까지 자르기

    $("#TB03021P_prefix").val(prefix);

    let data = $(selector).val();

    // 팝업 오픈
    $("#TB03021P_ibDealNo").val(data);
    getDealInfo();
  }
}

function clearTB03021P() {
  $("#TB03021P_ibDealNo").val("");
  $("#TB03021P_ibDealNm").val("");
}
/**
 * 모달 팝업 show
 */
function callTB03021P(prefix) {
  TB03021P_pf = prefix;
  setTimeout(() => roadListGrid_TB03021P(), 300);
  $("#TB03021P_prefix").val(prefix);
  $("#modal-TB03021P").modal("show");
  indexChangeHandler("TB03021P");
}

function roadListGrid_TB03021P() {
  arrPqGridDealInfo = $("#gridDealInfo").pqGrid("instance");

  if (typeof arrPqGridDealInfo === "undefined" || arrPqGridDealInfo === null) {
    let setPqGridObj = [
      {
        height: 300,
        maxHeight: 300,
        id: "gridDealInfo",
        colModel: colDealInfo,
      },
    ];

    setPqGrid(setPqGridObj);
    // 초기화된 인스턴스를 다시 할당
    arrPqGridDealInfo = $("#gridDealInfo").pqGrid("instance");
  } else {
    arrPqGridDealInfo.setData([]);
  }
}

/**
 * close TB03021P modal
 */
function modalClose_TB03021P() {
  // reset_TB03021P();
  $("#modal-TB03021P").modal("hide");
}

/**
 * hide modal
 */
$("#modal-TB03021P").on("hide.bs.modal", function () {
  $("#gridDealInfo").pqGrid("destroy");
  reset_TB03021P();
});

/**
 * reset
 */
function reset_TB03021P() {
  empNo = $("#userEno").val(); //직원명
  dprtCd = $("#userDprtCd").val(); //부서번호

  $("#TB03021P_dealInfoList").html("");
  $("#TB03021P_ibDealNo").val("");
  $("#TB03021P_ibDealNm").val("");
  $("#TB03021P_empNm").val($("#userEmpNm").val());
  $("#TB03021P_empNo").val(empNo);
  $("#TB03021P_dprtNm").val(dprtCd).prop("selected", true);
  $("#TB03021P_dprtCd").val(dprtCd);

  //$("#TB03021P_datepicker1").val("");
}

function modalShowFunction_TB03021P() {
  //모달 오픈 애니메이션 후 포커스 주도록 설정
  $("#modal-TB03021P").on("shown.bs.modal", function () {
    $("#modal-TB03021P input[id=TB03021P_ibDealNo]").focus();
  });
}

/**
 * Enter key event
 */
function keyDownEnter_TB03021P() {
  $("input[id=TB03021P_ibDealNo]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getDealInfo();
    }
  });
  $("input[id=TB03021P_ibDealNm]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getDealInfo();
    }
  });
}

/**
 * deal 번호 조회 ajax
 */
async function getDealInfo() {
  var dealNo = $("#TB03021P_ibDealNo").val(); //Deal 번호
  var dealNm = $("#TB03021P_ibDealNm").val(); //Deal명
  var chrrEmpno = $("#TB03021P_empNo").val(); //담당자번호
  var dprtCd = $("#TB03021P_dprtCd").val(); //부서코드

  var dtoParam = {
    dealNo: dealNo,
    dealNm: dealNm,
    chrrEmpno: chrrEmpno,
    dprtCd: dprtCd,
    scrnNo: $('#TB03021P_prefix').val()
  };

  await $.ajax({
    type: "GET",
    url: "/TB03021P/getDealInfo",
    data: dtoParam,
    dataType: "json",
    success: function (data) {
      if (
        $(`div[id='modal-TB03021P']`).css("display") === "none" &&
        data.length === 1
      ) {
        setDealInfo(data[0]);
        modalClose_TB03021P();
      } else {
        callTB03021P($("#TB03021P_prefix").val());
        setTimeout(() => dataIbDealSetGrid(data), 400);
      }
    },
  });
}

function dataIbDealSetGrid(data) {
  arrPqGridDealInfo.setData(data);
  arrPqGridDealInfo.option("rowDblClick", function (event, ui) {
    setDealInfo(ui.rowData);
  });
}

/**
 * 팝업에서 deal 번호 조회후 더블클릭
 */
function setDealInfo(e) {
  let ibDealNo = e.dealNo;
  let ibDealNm = e.dealNm;

  var prefix = $("#TB03021P_prefix").val(); // id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.

  var pageIbDealNo = "#" + prefix + "_ibDealNo";
  var pageIbDealNm = "#" + prefix + "_ibDealNm";

  $(pageIbDealNo).val(ibDealNo);
  $(pageIbDealNm).val(ibDealNm);

  if (prefix == "TB03020S") {
    // $("#selectedMngDealNo").val(ibDealNo);
    // $("#selectedMngDealNm").val(ibDealNm);
    //$("#selectedMngDealNo").focus();
    TB03020Sjs.getBscDealDetail();
  }

  if (prefix == "TB04010S") {
    $("#TB04010S_selectedDealNo").val(ibDealNo);
    $("#TB04010S_selectedDealNo").focus();
    TB04010Sjs.getDealList();
  }

  if (prefix == "TB04050S") {
    $("#TB04050S_ibDealNo").val(ibDealNo);
    $("#TB04050S_ibDealNm").val(ibDealNm);
    //$("#TB04050S_ibDealNo").focus();
    TB04050Sjs.getLoiDetail();
    TB04050Sjs.getDealInfo_TB04050S(ibDealNo);
  }

  if (prefix == "TB05040S") {
    TB05040Sjs.getDealList();
  }

  if (prefix == "TB03040S") {
    TB03040Sjs.ibSpecSearch();
  }

  if (prefix == "TB04020S") {
    TB04020Sjs.checkDealSearch();
  }

  if (prefix == "AS04110S") {
    addDealInfo(ibDealNo);
  }

  if(prefix == "TB08031S"){
    TB08031Sjs.srchBsnsInfo();
  }

  if (prefix == "TB08031S_relt") {
    TB08031Sjs.getReltDealInfo(ibDealNo);
  }
  if (prefix == "TB08010S") {
    TB08010Sjs.getEamList();
  }
  if (prefix == "TB08036S") {
    TB08036Sjs.getDealInfoTB08036S();
  }

  modalClose_TB03021P();
}

/* ***********************************그리드 컬럼******************************** */

let colDealInfo = [
  {
    title: "Deal번호",
    dataType: "string",
    dataIndx: "dealNo",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "Deal명",
    dataType: "string",
    dataIndx: "dealNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "등록일자",
    dataType: "date",
    dataIndx: "rgstDt",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData && cellData.length !== 0) {
        let rgstDt1 = cellData.substring(0, 4);
        let rgstDt2 = cellData.substring(4, 6);
        let rgstDt3 = cellData.substring(6, 8);
        return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
      }
      return cellData;
    },
  },
  {
    title: "부서코드",
    dataType: "string",
    dataIndx: "dprtCd",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "부서",
    dataType: "string",
    dataIndx: "dprtNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "담당자사번",
    dataType: "string",
    dataIndx: "chrrEmpno",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "담당자",
    dataType: "string",
    dataIndx: "empNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "거래상대방",
    dataType: "string",
    dataIndx: "entpNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
];

//그리드 최하단 페이지모델
let pageModel = {
  type: "local",
  rPP: 50,
  strRpp: "{0}",

  //customize localization strings.
  strDisplay: "{0} to {1} of {2}",
  strPage: "Page {0} / {1}",

  layout: ["first", "prev", "next", "last", "|", "strPage"],
};
