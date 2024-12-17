let arrPqGridMtrInfo = [];
let TB04011P_pf;
let TB04011P_gridState = 1;
let TB04011P_onchangehandler = "on"; // on off
let TB04011P_srchCnt = 0;
let InfoSrchCnt = 0;

$(document).ready(function () {
  modalShowFunction();
  keyDownEnter_TB04011P();
  selectBoxSet_TB04011P();
});

/**
 * 입력 이벤트 등록 함수
 */
function registerInputEvents(selector, inputLength) {
  // 검색데이터 길이 수 채우면 자동 검색 이벤트
  selector
    .closest("span.input-group-append")
    .prev(`input[id*='_ibDealNo']`)
    .on("input", async function () {
      const currentInput = $(this);
      if (currentInput.val().length === inputLength) {
        await srchEvent(currentInput);
      }
    });

  // 엔터누르면 검색 이벤트
  selector
    .closest("span.input-group-append")
    .prev(`input[id*='_ibDealNo']`)
    .on("keydown", async function (evt) {
      if (evt.keyCode === 13 && $(this).val().length !== inputLength) {
        evt.preventDefault();
        await srchEvent($(this));
      }
    });
}

/**
 * 자동검색 이벤트를 실행
 */
function TB04011P_srchMtr(menuId) {
  let selector = $(
    `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB04011P"]:not([disabled])`
  );

  // 이전에 바인딩된 이벤트 제거 후 새로 바인딩
  selector.off("input keydown");
  registerInputEvents(selector, 17); //딜번호는 17자리
}

/**
 * 검색데이터 갯수에 따라 이 후 팝업이벤트 설정
 */
async function srchEvent(selector) {
  let prefix;

  const inputId = $(selector).attr("id");
  const lastIndex = inputId.lastIndexOf("_");
  prefix = inputId.substring(0, lastIndex);

  $("#TB04011P_prefix").val(prefix);
  $(`input[id='${prefix}_ibDealNm']`).val("");

  /**
   * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
   * 그리드 상태 다시 체크해주기
   */
  if ($(`div[id='modal-TB04011P']`).css("display") === "none") {
    TB04011P_gridState = 1;
  }

  // 인풋박스 밸류
  let data = $(selector).val();
  $("#TB04011P_ibDealNo").val(data);

  //안건데이터가져오기(그리드상태체크를 같이 하고 있음)
  await getMtrInfo();

  if (TB04011P_gridState === 0) {
    await callGridTB04011P(prefix); // 그리드 로드
  } else if (TB04011P_gridState === 1) {
    await callTB04011P(prefix); // 팝업 표시
  }
}

async function callGridTB04011P(prefix) {
  //reset_TB04011P();
  $("#TB04011P_prefix").val(prefix);
  //setTimeout(() => roadListGrid_TB04011P(), 300);
  await roadListGrid_TB04011P();
}

/**
 * 모달 팝업 show
 */
async function callTB04011P(prefix) {
  reset_TB04011P();
  TB04011P_gridState = 0;
  TB04011P_pf = prefix;
  //setTimeout(() => roadListGrid_TB04011P(), 300);
  await roadListGrid_TB04011P();
  $("#TB04011P_prefix").val(prefix);
  $("#modal-TB04011P").modal("show");
  indexChangeHandler("TB04011P");
}

/**
 * 모달 오픈 애니메이션 후 포커스
 */
function modalShowFunction() {
  $("#modal-TB04011P").on("shown.bs.modal", function () {
    $("#modal-TB04011P input[id=TB0411P_ibDealNo]").focus();
  });
}

/**
 * reset
 */
function reset_TB04011P() {
  $("#TB04011P_ibDealNo").val("");
  $("#TB04011P_ibDealNm").val("");
  $("#TB04011P_empNm").val($("#userEmpNm").val());
  $("#TB04011P_empNo").val($("#userEno").val());
  $("#TB04011P_dprtNm").val("");
  $("#TB04011P_dprtCd").val("");
  $("#TB04011P_prefix").val("");
}

/**
 * close TB04011P modal
 */
function modalClose_TB04011P() {
  reset_TB04011P();
  // $("#gridMtrInfo").pqGrid("refreshDataAndView");
  $("#modal-TB04011P").modal("hide"); // 모달 닫기
  TB04011P_gridState = 1;
}

/**
 * hide modal
 */
$("#modal-TB04011P").on("hide.bs.modal", function () {
  reset_TB04011P();
  $("#gridMtrInfo").pqGrid("destroy");
});

/**
 * deal 번호 조회 ajax
 */
async function getMtrInfo() {
  var ibDealNo = $("#TB04011P_ibDealNo").val();
  var ibDealNm = $("#TB04011P_ibDealNm").val();
  var chrrEmpno = $("#TB04011P_empNo").val();
  var dprtCd = $("#TB04011P_dprtCd").val();

  var dtoParam = {
    dealNo: ibDealNo,
    mtrNm: ibDealNm,
    chrrEmpno: chrrEmpno,
    dprtCd: dprtCd,
  };

  try {
    // AJAX 호출
    $.ajax({
      type: "GET",
      url: "/TB04011P/getDealInfo",
      data: dtoParam,
      dataType: "json",
      success: function (data) {
        if (!data || data === undefined || data.length === 0) {
          TB04011P_gridState = 1;
        } else if (data.length >= 2) {
          TB04011P_gridState = 1;
        } else if (data) {
          TB04011P_gridState = 0;
        }
        if (InfoSrchCnt >= 2) {
          InfoSrchCnt = 0;
        }
        setTimeout(function () {
          dataSetMrtGrid(data);
        }, 400);
      },
    });
  } catch (error) {
    console.error("AJAX 호출 중 오류 발생:", error);
  }
}

async function roadListGrid_TB04011P() {
  return new Promise((resolve, reject) => {
    try {
      // pqGrid 인스턴스 초기화 확인
      arrPqGridMtrInfo = $("#gridMtrInfo").pqGrid("instance");

      // arrPqGridMtrInfo undefined일 경우 초기화
      if (
        typeof arrPqGridMtrInfo === "undefined" ||
        arrPqGridMtrInfo === null
      ) {
        let setPqGridObj = [
          {
            height: 300,
            maxHeight: 300,
            id: "gridMtrInfo",
            colModel: colMtrInfo,
          },
        ];
        // pqGrid 초기화
        //$("#gridMtrInfo").pqGrid(setPqGridObj);
        setPqGrid(setPqGridObj);
        arrPqGridMtrInfo = $("#gridMtrInfo").pqGrid("instance");
      } else {
        arrPqGridMtrInfo.setData([]);
      }
      // 그리드 로딩이 끝난 후 resolve 호출
      resolve();
    } catch (error) {
      reject(error); // 오류 발생 시 reject 호출
    }
  });
}

function dataSetMrtGrid(data) {
  arrPqGridMtrInfo.setData(data);
  arrPqGridMtrInfo.option("rowDblClick", function (event, ui) {
    setMtrInfo(ui.rowData);
  });

  // 검색된 행이 1개일 경우 데이터 바로 입력
  if (
    arrPqGridMtrInfo.pdata.length === 1 &&
    $(`div[id='modal-TB04011P']`).css("display") === "none"
  ) {
    //var prefix = $("#TB04011P_prefix").val();
    setMtrInfo(arrPqGridMtrInfo.pdata[0]);
    InfoSrchCnt = 0;
    // 입력되고 난 후 온체인지 이벤트 on
    TB04011P_onchangehandler = "on";
  }
  // 변부장님 지시로 삭제
  // 검색된 행이 0일 경우 모든 데이터 출력
  // else if (arrPqGridMtrInfo.pdata.length === 0) {

  // 	// 데이터 없는 경우 재조회 방지
  // 	InfoSrchCnt += 1;

  // 	getEmpList();
  // }
  // 그렇지 않은 경우 조건에 맞는 데이터 출력
  else {
    InfoSrchCnt = 0;
  }
}

/**
 * Enter key event
 */
function keyDownEnter_TB04011P() {
  $("input[id='TB04011P_ibDealNo']").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getMtrInfo();
    }
  });

  $("input[id='TB04011P_ibDealNm']").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getMtrInfo();
    }
  });
}

/* 셀렉트박스 세팅 */
function selectBoxSet_TB04011P() {
  selectBox = getSelectBoxList("TB04011P", "D010", false);
  dprtList = selectBox.filter(function (item) {
    //부서코드 list
    return item.cmnsGrpCd === "D010";
  });

  dprtList.forEach((item) => {
    $("#TB04011P_dprtNm").append(
      $("<option>", {
        value: item.cdValue,
        text: `${item.cdName}`,
      })
    );
  });

  $("#TB04011P_dprtNm").on("change", function () {
    var dprtCd = $(this).val();

    $("#TB04011P_dprtCd").val(dprtCd);
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
