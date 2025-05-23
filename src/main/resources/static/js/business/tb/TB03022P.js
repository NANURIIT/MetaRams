let arrPqGridEmpInfo = [];
let mmbrSn;
let tb08040sIdx;
let TB03022P_pf;
let TB03022P_gridState = 1;
let TB03022P_onchangehandler;
let empNoSrchYn; //직원번호검색여부
let empNmSrchYn; //직원명검색여부
let dprtCdSrchYn; //부서번호검색여부
let empInfoSrchCnt = 0;
let isTB03021POpen = false; // 전역 상태 변수로 팝업 상태를 저장
var TB03021P_searchConditions = {}; // 검색 조건을 담을 객체

$(document).ready(function () {
  keyDownEnter_TB03022P();
  modalShowFunction_TB03022P();
});

/**
 * 입력 이벤트 등록 함수
 */
function TB03022P_srch(menuId) {
  $(
    `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*='callTB03022P']:not([disabled])`
  )
    .closest("span.input-group-append")
    .prev("input[type='text']:not([readonly])")
    .on("input", async function () {
      const currentInput = $(this);

      const result =
        $(this)
          .attr("id")
          .slice(0, $(this).attr("id").length - 2) + "Nm";

      $(`#${result}`).val("");

      if (currentInput.val().length === 7) {
        await srchEmpEvent(currentInput);
      }
    });

  $(
    `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*='callTB03022P']:not([disabled])`
  )
    .closest("span.input-group-append")
    .prev("input[type='text']:not([readonly])")
    .on("keydown", async function (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        await srchEmpEvent($(this));
      }
    });

  // 전역 함수로 srchEmpEvent 선언
  async function srchEmpEvent(selector) {
    let prefix;
    const inputId = $(selector).attr("id");
    const lastIndex = inputId.lastIndexOf("_");
    prefix = inputId.substring(0, lastIndex);

    let data = $(selector).val();

    $("#TB03022P_prefix").val(prefix);
    $("#TB03022P_empno").val(data);
    await getEmpList();
  }
}

/**
 * 팝업내 사원번호조회팝업 이벤트
 * @param { String } popupId
 * @author 김건우
 */
function TB03022P_inModalSrch(popupId) {
  $(
    `#modal-${popupId} span.input-group-append > button[onclick*='callTB03022P']:not([disabled])`
  )
    .closest("span.input-group-append")
    .prev("input[type='text']:not([readonly])")
    .off("input")
    .on("input", async function () {
      const currentInput = $(this);

      const result =
        $(this)
          .attr("id")
          .slice(0, $(this).attr("id").length - 2) + "Nm";

      $(`#${result}`).val("");

      if (currentInput.val().length === 7) {
        await srchEmpEvent(currentInput);
      }
    });

  async function srchEmpEvent(selector) {
    let prefix;
    const inputId = $(selector).attr("id");
    const lastIndex = inputId.lastIndexOf("_");
    prefix = inputId.substring(0, lastIndex);
    let data = $(selector).val();

    $("#TB03022P_prefix").val(prefix);
    $("#TB03022P_empno").val(data);
    await getEmpList();
  }
}

function TB03022P_clearInput(inputId) {
  $(`input[id='${inputId}']`).val("");
}

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB03022P(prefix, e) {
  TB03022P_pf = prefix;
  setTimeout(() => roadListGrid(), 300);
  $("#TB03022P_prefix").val(prefix);
  $("#modal-TB03022P").modal("show");
  indexChangeHandler("TB03022P");

  if (prefix == "TB05010S_mmbrTrgt" || prefix == "TB05010S_mmbrAngt") {
    mmbrSn = e;
  }

  if (prefix === "grd_TB08040S") {
    tb08040sIdx = e;
  }
}

function roadListGrid() {
  // pqGrid 인스턴스 초기화 확인
  arrPqGridEmpInfo = $("#gridEmpList").pqGrid("instance");

  // arrPqGridEmpInfo가 undefined일 경우 초기화
  if (typeof arrPqGridEmpInfo === "undefined" || arrPqGridEmpInfo === null) {
    let setPqGridObj = [
      {
        height: 300,
        maxHeight: 300,
        id: "gridEmpList",
        colModel: colEmpInfo,
      },
    ];

    // pqGrid 초기화
    //$("#gridEmpList").pqGrid(setPqGridObj);
    setPqGrid(setPqGridObj);
    // 초기화된 인스턴스를 다시 할당
    arrPqGridEmpInfo = $("#gridEmpList").pqGrid("instance");
  } else {
    // 이미 초기화된 경우, 데이터 설정
    arrPqGridEmpInfo.setData([]);
  }
}

/**
 * 모달 초기화
 */
function reset_TB03022P() {
  $("#TB03022P_empList").html("");
  $("#TB03022P_prefix").val("");
  $("#TB03022P_empNm").val("");
  $("#TB03022P_empno").val("");
  $("#TB03022P_dprtCd").val("");
  $("#TB03022P_dprtNm").val("");
}

/**
 * 모달 hide
 */
function modalClose_TB03022P() {
  $("#modal-TB03022P").modal("hide");
}
/**
 * hide modal
 */
$("#modal-TB03022P").on("hide.bs.modal", function () {
  reset_TB03022P();
  $("#gridEmpList").pqGrid("destroy");
});

function modalShowFunction_TB03022P() {
  //모달 오픈 애니메이션 후 포커스 주도록 설정
  $("#modal-TB03022P").on("shown.bs.modal", function () {
    $("#modal-TB03022P input[id=TB03022P_empNm]").focus();
  });
}

/**
 * Enter key Event
 */
function keyDownEnter_TB03022P() {
  $("input[id=TB03022P_empNm]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getEmpList();
    }
  });

  $("input[id=TB03022P_empno]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getEmpList();
    }
  });

  $("input[id=TB03022P_dprtCd]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getEmpList();
    }
  });

  $("input[id=TB03022P_dprtNm]").keydown(function (key) {
    if (key.keyCode == 13) {
      //키가 13이면 실행 (엔터는 13)
      getEmpList();
    }
  });
}

/**
 * ajax 통신(조회)
 */
async function getEmpList() {
  var empNm = $("#TB03022P_empNm").val();
  var empno = $("#TB03022P_empno").val();
  var dprtCd = $("#TB03022P_dprtCd").val();
  var dprtNm = $("#TB03022P_dprtNm").val();

  var dtoParam = {
    empNm: empNm,
    empno: empno,
    dprtCd: dprtCd,
    dprtNm: dprtNm,
    hdqtCd: "",
    hdqtNm: "",
  };

  await $.ajax({
    type: "GET",
    url: "/findEmpList",
    data: dtoParam,
    dataType: "json",
    success: function (data) {
      if (
        $(`div[id='modal-TB03022P']`).css("display") === "none" &&
        data.length === 1
      ) {
        setEmpNm(data[0]);
        modalClose_TB03022P();
      } else {
        callTB03022P($("#TB03022P_prefix").val(), mmbrSn);
        setTimeout(() => dataEmpSetGrid(data), 400);
      }
    },
  });
}

function dataEmpSetGrid(data) {
  arrPqGridEmpInfo.setData(data);
  arrPqGridEmpInfo.option("rowDblClick", function (event, ui) {
    setEmpNm(ui.rowData);
  });
}

/**
 * 부모창에 결과값 전달
 */
function setEmpNm(e) {
  let empNo = e.empno; // 직원번호
  let empNm = e.empNm; // 직원명
  let dprtCd = e.dprtCd; // 부점코드
  let dprtNm = e.dprtNm; // 부점명
  let hdqtCd = e.hdqtCd; // 본부코드
  let hdqtNm = e.hdqtNm; // 본부명
  let athCd = e.athCd;

  let prefix = $("#TB03022P_prefix").val(); // id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
  let pageEmpNm = "#" + prefix + "_empNm";
  let pageEmpNo = "#" + prefix + "_empNo";
  let pageDprtCd = "#" + prefix + "_dprtCd";
  let pageDprtNm = "#" + prefix + "_dprtNm";
  let pageHdqtCd = "#" + prefix + "_hdqtCd";
  let pageHdqtNm = "#" + prefix + "_hdqtNm";
  let pageAthCd = "#" + prefix + "_athCd";

  $(pageEmpNm).val(empNm);
  $(pageEmpNo).val(empNo);
  $(pageDprtCd).val(dprtCd);
  $(pageDprtNm).val(dprtNm);
  $(pageHdqtCd).val(hdqtCd);
  $(pageHdqtNm).val(hdqtNm);
  $(pageAthCd).val(athCd);

  // 그리드(위원정보) 데이터 가져오기
  const arrPqGridMmbrInfo = $("#gridMmbrList").pqGrid(
    "option",
    "dataModel.data"
  ); // 20241122 오류나서 바꿨습니다

  // 공동
  switch (prefix) {
    // 공동영업관리자/협업부서
    case "TB03020S":
      let newRow = {
        dprtCd: dprtCd, //부서코드
        dprtNm: dprtNm, //부서명
        bsnssMngPEno: empNo, //직원번호
        empNm: empNm, //직원명
        cntrt: "",
        delYn: "N",
      };
      $("#gridEnoPList").pqGrid("addRow", {
        rowData: newRow,
        checkEditable: false,
      });
      break;
    case "TB03021P":
      $("#TB03021P_dprtNm").val(dprtCd).prop("selected", true);
      break;
    case "TB05010S_mmbrTrgt":
      // 특정 행의 데이터 수정
      if (arrPqGridMmbrInfo.length > 0 && arrPqGridMmbrInfo[mmbrSn]) {
        arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpnm = empNm; // 버튼을 누른 행의 atdcTrgtEmpnm(위원명_화면) 값 변경
        arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpno = empNo; // 버튼을 누른 행의 atdcTrgtEmpno(위원코드) 값 변경
      }

      // 변경 내용 적용
      $("#gridMmbrList").pqGrid("refreshDataAndView");

      break;
    case "TB05010S_mmbrAngt":
      // 특정 행의 데이터 수정
      if (arrPqGridMmbrInfo.length > 0 && arrPqGridMmbrInfo[mmbrSn]) {
        arrPqGridMmbrInfo[mmbrSn].atdcAngtEmpnm = empNm; // 버튼을 누른 행의 atdcTrgtEmpnm(대리참석위원_화면) 값 변경
        arrPqGridMmbrInfo[mmbrSn].atdcAngtEmpno = empNo; // 버튼을 누른 행의 atdcTrgtEmpno(대리참석위원_코드) 값 변경
      }

      // 변경 내용 적용
      $("#gridMmbrList").pqGrid("refreshDataAndView");
      break;
    // 심사신청관리 > 관리점1
    case "TB04012P1":
      $("#TB04012P_dlDprtCd1_dlDprtCd").val(e.dprtCd);
      $("#TB04012P_dlDprtCd1_dlDprtNm").val(e.dprtNm);

      break;
    // 심사신청관리 > 관리점2
    case "TB04012P2":
      $("#TB04012P_dlDprtCd2_dlDprtCd").val(e.dprtCd);
      $("#TB04012P_dlDprtCd2_dlDprtNm").val(e.dprtNm);
      break;
    // 심사신청관리 > 관리점3
    case "TB04012P3":
      $("#TB04012P_dlDprtCd3_dlDprtCd").val(e.dprtCd);
      $("#TB04012P_dlDprtCd3_dlDprtNm").val(e.dprtNm);
      break;

    case "TB04020S":
      $("#TB04020S_empNo").trigger("change");
      $("#TB04020S_empNo").val(empNo);
      $("#TB04020S_empNm").val(empNm);
      break;

    case "grd_TB08040S":
      feeSch.pdata[tb08040sIdx].rgstBdcd = dprtCd;
      feeSch.refresh();
      break;
    case "TB09080S_chrr":
      $("#TB09080S_dprtCd").val(e.dprtCd);
      $("#TB09080S_dprtNm").val(e.dprtCd);
      break;
    case "TB06011P":
      $("#TB06011P_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB06080S_rqst":
      TB06080Sjs.resetData();
      break;
    case "TB06080S_rspl":
      TB06080Sjs.resetData();
      break;
    case "TB04011P":
      $("#TB04011P_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB07120S":
      $("#TB07120S_dcfcEno").val(empNo);
      $("#TB07120S_dcfcEnm").val(empNm);
      $(pageEmpNm).val("");
      $(pageEmpNo).val("");
      $(pageDprtCd).val("");
      $(pageDprtNm).val("");
      $(pageHdqtCd).val("");
      $(pageHdqtNm).val("");
      $(pageAthCd).val("");
      break;
    case "TB07120S2":
      $("#TB07120S2_empNo").val(empNo);
      $("#TB07120S2_empNm").val(empNm);
      break;
    case "TB08040S":
      $("#TB08040S_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB08050S":
      $("#TB08050S_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB07160S":
      $("#TB07160S_rcjsDprtNm").val(e.dprtCd);
      $("#TB07160S_rcjsDprtCd").val(e.dprtCd);
      break;
    case "TB10110S":
      $("#TB10110S_dprtNm").val(e.dprtCd);
      $("#TB10110S_athCd").find(`option`).css("display", "inline");
      $("#TB10110S_athCd")
        .find("option")
        .not(`option[value*=${e.dprtCd}]`)
        .css("display", "none");
      resetPGgrids("TB10110S");
      break;
    case "TB03040S_1":
      $("#TB03040S_2_dprtNm").val(e.dprtCd);
      $("#TB03040S_2_dprtCd").val(e.dprtCd);
      break;
    case "TB08031S_charge":
      $("#TB08031S_D010").val(e.dprtCd);
      // $("#TB09080S_dprtNm").val(e.dprtCd);
      break;
    case "TB09080S":
      resetPGgrids("TB09080S");
      break;
    case "TB09010S":
      TB09010Sjs.resetContents();
      break;
    case "TB09100S_chrr":
      resetPGgrids("TB09100S");
      $("#TB09100S_dprtNm").val(e.dprtCd);
      $("#TB09100S_dprtCd").val(e.dprtCd);
      break;
    case "TB04060S":
      TB04060Sjs.TB04060S_resetGrid();
      break;

    default:
      break;
  }

  modalClose_TB03022P();
}

/* ***********************************그리드 컬럼******************************** */

let colEmpInfo = [
  {
    title: "직원번호",
    dataType: "string",
    dataIndx: "empno",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "직원명",
    dataType: "string",
    dataIndx: "empNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
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
    title: "부서명",
    dataType: "string",
    dataIndx: "dprtNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "소속부점코드",
    dataType: "string",
    dataIndx: "hdqtCd",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "소속부점명",
    dataType: "string",
    dataIndx: "hdqtNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "권한코드",
    dataType: "string",
    dataIndx: "athCd",
    hidden: true,
  },
];
