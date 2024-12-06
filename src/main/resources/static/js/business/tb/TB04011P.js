let arrPqGridMtrInfo;
let TB04011P_pf;
let TB04011P_gridState = 1;
let TB04011P_onchangehandler = "on"; // on off
let TB04011P_srchCnt = 0;

/**
 * 팝업 자동 호출, 검색
 * @author {김건우}
 */
function TB04011P_srchMtr() {
  /**
   * 완성된 함수는 common.js에 한번 더 세팅해주셔야해요
   */

  /**
   * 팝업 자체 조회
   * 팝업은 포커스아웃시 조회 없음
   */
  $("#TB04011P_ibDealNo").on("keydown", function (evt) {
    // Enter에만 작동하는 이벤트
    if (evt.keyCode === 13) {
      evt.preventDefault();
      console.log("으흐흐");

      // 팝업창에서는 엔터 누를시 조회만.
      getMtrInfo();
    }
  });

  /**
   * 코드길이체크 후 자동조회
   */
  $("span.input-group-append > button:not([disabled])")
    .closest("span.input-group-append")
    .prev("input[id*='_ibDealNo']")
    .on("input", async function () {
      // console.log("화면 인풋 태그 감시중");
      const str = $(this).val().length;

      // 같이 붙어있는 인풋박스 id
      const result =
        $(this)
          .attr("id")
          .slice(0, $(this).attr("id").length - 2) + "Nm";

      // 데이터를 지울때 값이 없으면 지워줌
      // 값이 있으면 온체인지 또는 온인풋 이벤트로 값 채워짐
      $(`#${result}`).val("");
      /**
       ********* 각 컬럼의 길이로 세팅을 하셔야해용 *********
       */
      // ex) 종목코드 VARCHAR(10)
      if (str === 17) {
        await srchEvent(this);
      }
    });

  $("span.input-group-append > button:not([disabled])")
    .closest("span.input-group-append")
    .prev("input[id*='_ibDealNo']")
    .on("keydown", async function (evt) {
      // Enter에만 작동하는 이벤트
      if (evt.keyCode === 13) {
        // console.log("화면내 엔터 이벤트");
        evt.preventDefault();

        TB04011P_onchangehandler = "off";

        await srchEvent(this);
      }
    });

  $("span.input-group-append > button:not([disabled])")
    .closest("span.input-group-append")
    .prev("input[id*='_ibDealNo']")
    .on("change", async function (evt) {
      // console.log("화면내 체인지 이벤트");

      if (TB04011P_onchangehandler === "on") {
        await srchEvent(this);
      }
    });

  async function srchEvent(selector) {
    // 사용한 인풋박스의 출처 페이지 가져오기
    let prefix;
    if ($(selector).attr("id") === $("#TB04011P_ibDealNo").attr("id")) {
      prefix = TB04011P_pf;

    } else {
      // 컬럼명 길이로 바꾸셔야 합니당
      prefix = $(selector)
        .attr("id")
        .slice(0, $(selector).attr("id").length - 9);

    }

    $(`input[id='${prefix}_ibDealNm']`).val("");

    $("#TB04011P_prefix").val(prefix);

    /**
     * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
     * 그리드 상태 다시 체크해주기
     */
    if ($(`div[id='modal-TB04011P']`).css("display") === "none") {
      // console.log("혹시 니가 닫았니?");
      TB04011P_gridState = 1;
    }

    // 인풋박스 밸류
    let data = $(selector).val();
    $("#TB04011P_ibDealNo").val(data);
    TB04011P_setGridState();

    // 팝업 오픈
    if (TB04011P_gridState === 0) {
      console.log("열려있음", TB04011P_gridState);
      // 그리드만 부릅니다
      callGridTB04011P(prefix);
      $("#TB04011P_ibDealNo").val(data);
      // ajax통신인데 각 팝업마다 구조가 달라서 다르게 세팅해야해요
      setTimeout(() => getMtrInfo(), 400);
    } else if (TB04011P_gridState === 1) {
      console.log("닫혀있음", TB04011P_gridState);
      // 팝업을 열거예요
      callTB04011P(prefix);
      $("#TB04011P_ibDealNo").val(data);
      // ajax통신인데 각 팝업마다 구조가 달라서 다르게 세팅해야해요
      setTimeout(() => getMtrInfo(), 400);
    }
  }
}

function callGridTB04011P(prefix) {
  reset_TB04011P();
  $("#TB04011P_prefix").val(prefix);
  setTimeout(() => {
    let setPqGridObj = [
      {
        height: 300,
        maxHeight: 300,
        id: "gridMtrInfo",
        colModel: colMtrInfo,
      },
    ];
    setPqGrid(setPqGridObj);
    arrPqGridMtrInfo = $("#gridMtrInfo").pqGrid("instance");
  }, 300);
}

/**
 * 모달 팝업 show
 */
function callTB04011P(prefix) {
  reset_TB04011P();
  $("#TB04011P_prefix").val(prefix);
  TB04011P_gridState = 0;
  TB04011P_pf = prefix;
  // ?????
  switch ($("#TB04011P_prefix").val()) {
    case "":
      $("#modal-TB04011P").modal("show");
      break;
    default:
      $("#modal-TB04011P").modal("show");
      break;
  }

  setTimeout(() => {
    let setPqGridObj = [
      {
        height: 300,
        maxHeight: 300,
        id: "gridMtrInfo",
        colModel: colMtrInfo,
      },
    ];
    setPqGrid(setPqGridObj);
    arrPqGridMtrInfo = $("#gridMtrInfo").pqGrid("instance");
  }, 300);

  indexChangeHandler("TB04011P");

}

/**
 * reset
 */
function reset_TB04011P() {
  // $("#TB04011P_dealInfoList").html("");
  $("#TB04011P_ibDealNo").val("");
  $("#TB04011P_ibDealNm").val("");
}

/**
 * close TB04011P modal
 */
function modalClose_TB04011P() {
  // reset_TB04011P();
  // $("#gridMtrInfo").pqGrid("refreshDataAndView");
  $("#modal-TB04011P").modal("hide");
}

/**
 * hide modal
 */
$("#modal-TB04011P").on("hide.bs.modal", function () {
  $("#gridMtrInfo").pqGrid("destroy");
  reset_TB04011P();
});

/**
 * deal 번호 조회 ajax
 */
function getMtrInfo() {
  var prefix = $("#TB04011P_prefix").val();

  var mtrPrgSttsDcdFrom = "";
  var mtrPrgSttsDcdTo = "";

  if (prefix == "AS04110S") {
    mtrPrgSttsDcdFrom = "208";
  }

  if (prefix.startsWith("TB060")) {
    mtrPrgSttsDcdFrom = "308";
    mtrPrgSttsDcdTo = "404";
  }

  var ibDealNo = $("#TB04011P_ibDealNo").val();
  var ibDealNm = $("#TB04011P_ibDealNm").val();

  var dtoParam = {
    dealNo: ibDealNo,
    mtrNm: ibDealNm,
    mtrPrgSttsDcdFrom: mtrPrgSttsDcdFrom,
    mtrPrgSttsDcdTo: mtrPrgSttsDcdTo,
  };

  $.ajax({
    type: "GET",
    url: "/TB04011P/getDealInfo",
    data: dtoParam,
    dataType: "json",
    success: function (data) {
      if(TB04011P_srchCnt >= 2){
        alert("대충무한루프 막는 중");
        TB04011P_srchCnt = 0;
        return;
      }else
      if(data.length === 1){
        setMtrInfo(data);
        TB04011P_srchCnt = 0;
      }
      else if (data.length === 0){
        TB04011P_srchCnt =+ 1;
        $("#TB04011P_ibDealNo").val("");
        $("#TB04011P_ibDealNm").val("");
        getMtrInfo();
      }
      else {
        arrPqGridMtrInfo.setData(data);
        arrPqGridMtrInfo.on("rowDblClick", function (event, ui) {
          setMtrInfo(ui.rowData);
          console.log(ui.rowData);
        });
        TB04011P_srchCnt = 0;
      }
    },
  });
}

function TB04011P_setGridState() {
  var prefix = $("#TB04011P_prefix").val();

  var mtrPrgSttsDcdFrom = "";
  var mtrPrgSttsDcdTo = "";

  if (prefix == "AS04110S") {
    mtrPrgSttsDcdFrom = "208";
  }

  if (prefix.startsWith("TB060")) {
    mtrPrgSttsDcdFrom = "308";
    mtrPrgSttsDcdTo = "404";
  }

  var ibDealNo = $("#TB04011P_ibDealNo").val();
  var ibDealNm = $("#TB04011P_ibDealNm").val();

  var dtoParam = {
    dealNo: ibDealNo,
    mtrNm: ibDealNm,
    mtrPrgSttsDcdFrom: mtrPrgSttsDcdFrom,
    mtrPrgSttsDcdTo: mtrPrgSttsDcdTo,
  };

  $.ajax({
    type: "GET",
    url: "/TB04011P/getDealInfo",
    data: dtoParam,
    dataType: "json",
    success: function (data) {
      if (!data || data === undefined || data.length === 0) {
        console.log("없음");
        TB04011P_gridState = 1;
      } else if (data.length >= 2) {
        console.log("2개이상");
        TB04011P_gridState = 1;
      } else if (data) {
        console.log("하나임ㅋ");
        TB04011P_gridState = 0;
      }
    },
  });
}

/**
 * 팝업에서 deal 번호 조회후 더블클릭
 */
function setMtrInfo(e) {
  //tr(selected) = event.currentTarget;
  //td(selected) = event.target;6

  var ibDealNo = e.dealNo;
  var ibDealNm = e.dealNm;
  var mtrNm = e.mtrNm;
  var lstCCaseCcdNm = e.mtrNm;
  var lstCCaseCcd = e.mtrDcd;
  var riskInspctCcdNm = e.jdgmDcdNm;
  var riskInspctCcd = e.jdgmDcd;
  var prdtCd = e.prdtCd;
  var prdtNm = e.prdtNm;
  var apvlDt = e.apvlDt;
  var cnsbDcd = e.cnsbDcd;
  var invJdgmComtNo = e.invJdgmComtNo;
  var apvlAmt = e.apvlAmt;
  var sdnCndtF = e.sdnCndtF;
  var etcCndtF = e.etcCndtF;

  var prefix = $("#TB04011P_prefix").val(); // id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.

  var pageIbDealNo = "#" + prefix + "_ibDealNo";
  var pageIbDealNm = "#" + prefix + "_ibDealNm";
  var pageMtrNm = "#" + prefix + "_mtrNm";
  var pageLstCCaseCcdNm = "#" + prefix + "_lstCCaseCcdNm";
  var pageLstCCaseCcd = "#" + prefix + "_lstCCaseCcd";
  var pageRiskInspctCcdNm = "#" + prefix + "_riskInspctCcdNm";
  var pageRiskInspctCcd = "#" + prefix + "_riskInspctCcd";
  var pagePrdtCd = "#" + prefix + "_prdtCd";
  var pagePrdtNm = "#" + prefix + "_prdtNm";
  //var pageInspctPrgrsStCdNm = "#" + prefix + "_inspctPrgrsStCdNm";
  //var pageInspctPrgrsStCd = "#" + prefix + "_inspctPrgrsStCd";
  var pageApvlDt = "#" + prefix + "_apvlDt";
  var pageCnsbDcd = "#" + prefix + "_cnsbDcd";
  var pageInvJdgmComtNo = "#" + prefix + "_invJdgmComtNo";
  var pageApvlAmt = "#" + prefix + "_apvlAmt";
  var pageSdnCndtF = "#" + prefix + "_sdnCndtF";
  var pageEtcCndtF = "#" + prefix + "_etcCndtF";

  $(pageIbDealNo).val(ibDealNo);
  $(pageIbDealNm).val(ibDealNm);
  $(pageRiskInspctCcd).val(riskInspctCcd);
  $(pageLstCCaseCcd).val(lstCCaseCcd);

  if (prefix.startsWith("TB060")) {
    $(pageLstCCaseCcdNm).val(lstCCaseCcdNm);
    $(pageLstCCaseCcd).val(lstCCaseCcd);
    $(pageRiskInspctCcdNm).val(riskInspctCcdNm);
    $(pageRiskInspctCcd).val(riskInspctCcd);
    $(pagePrdtCd).val(prdtCd);
    $(pagePrdtNm).val(prdtNm);
    $(pageApvlDt).val(apvlDt);
    $(pageCnsbDcd).val(cnsbDcd);
    $(pageInvJdgmComtNo).val(invJdgmComtNo);
    $(pageApvlAmt).val(apvlAmt);
    $(pageSdnCndtF).val(sdnCndtF);
    $(pageEtcCndtF).val(etcCndtF);
    $(pageMtrNm).val(mtrNm);
  }

  if (prefix == "TB05010S") {
    let newRow = {
      dealNo: ibDealNo,
      mtrDcd: lstCCaseCcd,
      mtrNm: lstCCaseCcdNm,
      jdgmDcd: riskInspctCcd,
      jdgmDcdNm: riskInspctCcdNm,
      dprtCd: e.dprtCd,
      dprtNm: e.dprtNm,
      chrgPEno: e.chrgPEno,
      chrgPEnm: e.chrgPNm,
    };
    $("#gridCaseList").pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });
  }

  if (prefix == "TB06012P") {
    TB06012P_getAppvCndt(ibDealNo, lstCCaseCcd, riskInspctCcd);
  }

  if (prefix == "TB06010S" || prefix == "TB06020S" || prefix == "TB06030S") {
    $(`#${prefix}_ibDealNo`).val(ibDealNo);
    $(`#${prefix}_ibDealNo`).focus();

    if (prefix == "TB06010S") {
      TB06010Sjs.getDealList();
    } else if (prefix == "TB06020S") {
      TB06020Sjs.getDealList();
    } else if (prefix == "TB06030S") {
      TB06030Sjs.getDealList();
    }
  }

  modalClose_TB04011P();
}
/* ***********************************그리드 컬럼******************************** */

let colMtrInfo = [
  {
    title: "Deal번호",
    dataType: "string",
    dataIndx: "dealNo",
    halign: "center",
    align: "left",
    width: "",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "Deal명",
    dataType: "string",
    dataIndx: "dealNm",
    halign: "center",
    align: "left",
    width: "",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "안건명",
    dataType: "string",
    dataIndx: "mtrNm",
    halign: "center",
    align: "left",
    width: "",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "부수안건구분코드",
    dataType: "string",
    dataIndx: "mtrDcd",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "부수안건구분",
    dataType: "string",
    dataIndx: "mtrDcdNm",
    halign: "center",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "리스크심사구분코드",
    dataType: "string",
    dataIndx: "jdgmDcd",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "리스크심사구분",
    dataType: "string",
    dataIndx: "jdgmDcdNm",
    halign: "center",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "종목코드",
    dataType: "string",
    dataIndx: "prdtCd",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "종목이름",
    dataType: "string",
    dataIndx: "prdtNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "Deal생성일자",
    dataType: "date",
    dataIndx: "rgstDt",
    halign: "center",
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
    title: "부서",
    dataType: "string",
    dataIndx: "dprtNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "담당자",
    dataType: "string",
    dataIndx: "chrgPNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "심사진행상태코드",
    dataType: "string",
    dataIndx: "mtrPrgSttsDcd",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "심사진행상태",
    dataType: "string",
    dataIndx: "mtrPrgSttsDcdNm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  // TB06010S에서 hidden값 사용
  {
    title: "승인일자",
    dataType: "string",
    dataIndx: "apvlDt",
    halign: "center",
    align: "center",
    hidden: true,
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
    title: "승인심사기구",
    dataType: "string",
    dataIndx: "cnsbDcd",
    halign: "center",
    align: "left",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "위원회번호",
    dataType: "string",
    dataIndx: "invJdgmComtNo",
    halign: "center",
    align: "right",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "승인금액",
    dataType: "integer",
    dataIndx: "apvlAmt",
    halign: "center",
    align: "right",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData !== null && cellData !== undefined) {
        return addComma(cellData);
      }
      return cellData;
    },
  },
  {
    title: "승인조건(셀다운)",
    dataType: "string",
    dataIndx: "sdnCndtF",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "승인조건(기타)",
    dataType: "string",
    dataIndx: "etcCndtF",
    halign: "center",
    align: "center",
    hidden: true,
    filter: { crules: [{ condition: "range" }] },
  },
];
