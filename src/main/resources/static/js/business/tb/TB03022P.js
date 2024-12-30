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

// openTB03021P 이벤트 감지(TB03021P.js)
document.addEventListener("openTB03021P", function (event) {
  isTB03021POpen = true; // 팝업이 열렸다는 상태 저장
  TB03022P_srch("TB03022P");
});

// closeTB03021P 이벤트 감지(TB03021P.js)
document.addEventListener("closeTB03021P", function (event) {
  isTB03021POpen = false; // 팝업이 닫히면 상태 초기화
  const url = window.location.pathname; // 팝업 오픈 시점에서 URL을 다시 가져옴
  TB03022P_srch(url);
});

// selector를 만드는 함수
function getSelectorString(menuId) {
  let finalSelectorString;

  if (isTB03021POpen) {
    finalSelectorString = `span.input-group-append > button[onclick*="callTB03022P"]:not([disabled])`;
  } else {
    finalSelectorString = `div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB03022P"]:not([disabled])`;
  }

  return finalSelectorString;
}

/**
 * 입력 이벤트 등록 함수
 */
function registerInputEvents(selector, inputLastId, inputLength) {
  selector
    .closest("span.input-group-append")
    .prev(`input[id*='${inputLastId}']`)
    .on("input", async function () {
      if (inputLastId === "_empNo") {
        empNoSrchYn = "Y";
      } else if (inputLastId === "_empNm") {
        empNmSrchYn = "Y";
      } else if (inputLastId === "_dprtCd") {
        dprtCdSrchYn = "Y";
      }
      const currentInput = $(this);
      if (currentInput.val().length === inputLength) {
        await srchEmpEvent(currentInput);
      }
    });

  selector
    .closest("span.input-group-append")
    .prev(`input[id*='${inputLastId}']`)
    .on("keydown", async function (evt) {
      if (evt.keyCode === 13 && $(this).val().length !== inputLength) {
        if (inputLastId === "_empNo") {
          empNoSrchYn = "Y";
        } else if (inputLastId === "_empNm") {
          empNmSrchYn = "Y";
        } else if (inputLastId === "_dprtCd") {
          dprtCdSrchYn = "Y";
        }
        evt.preventDefault();
        await srchEmpEvent($(this));
      }
    });
}

/**
 * 팝업 자동 호출, 검색
 * @author {}
 */
function TB03022P_srch(menuId) {
  let selectorString = getSelectorString(menuId); // 동적으로 selectorString 생성
  let selector = $(selectorString); // selector 사용
  // 이전에 바인딩된 이벤트 제거 후 새로 바인딩
  selector.off("input keydown");

  // 공통 이벤트 등록
  registerInputEvents(selector, "_empNo", 7);
  registerInputEvents(selector, "_empNm", 3);
  registerInputEvents(selector, "_dprtCd", 3);
}

// 전역 함수로 srchEmpEvent 선언
async function srchEmpEvent(selector) {
  let prefix;
  const inputId = $(selector).attr("id");
  const lastIndex = inputId.lastIndexOf("_");
  prefix = inputId.substring(0, lastIndex);
  let data = $(selector).val();

  $("#TB03022P_prefix").val(prefix);

  if ($(`div[id='modal-TB03022P']`).css("display") === "none") {
    TB03022P_gridState = 1;
  }

  // const fieldsToClear = ['empNm', 'empNo', 'dprtNm'];
  // fieldsToClear.forEach(field => TB03022P_clearInput(`${prefix}_${field}`));

  $("#TB03022P_empno").val(empNoSrchYn === "Y" ? data : "");
  $("#TB03022P_empNm").val(empNmSrchYn === "Y" ? data : "");
  $("#TB03022P_dprtCd").val(dprtCdSrchYn === "Y" ? data : "");

  await getEmpList();
  if (TB03022P_gridState === 0) {
    callGridTB03022P(prefix);
  } else if (TB03022P_gridState === 1) {
    callTB03022P(prefix);
  }

  //setTimeout(() => getEmpList(), 400);
  empNoSrchYn = "N";
  empNmSrchYn = "N";
  dprtCdSrchYn = "N";
}

function TB03022P_clearInput(inputId) {
  $(`input[id='${inputId}']`).val("");
}

function callGridTB03022P(prefix) {
  // $('#TB03022P_empNm').val("");
  // $('#TB03022P_empno').val("");
  // $('#TB03022P_dprtCd').val("");
  // $('#TB03022P_dprtNm').val("");

  $("#TB03022P_prefix").val(prefix);
  setTimeout(() => roadListGrid(), 300);
}

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB03022P(prefix, e) {
  reset_TB03022P();
  TB03022P_gridState = 0;
  TB03022P_pf = prefix;
  setTimeout(() => roadListGrid(), 300);
  $("#TB03022P_prefix").val(prefix);
  $("#modal-TB03022P").modal("show");
  indexChangeHandler("TB03022P");

  if (prefix == "TB05010S_mmbrTrgt" || prefix == "TB05010S_mmbrAngt")
    mmbrSn = e;

  if (prefix === "grd_TB08040S") {
    // console.log("grd_TB08040S:::prefix", prefix)
    // console.log("grd_TB08040S:::e", e)
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
  // reset_TB03022P();
  $("#gridEmpList").pqGrid("refreshDataAndView");
  $("#modal-TB03022P").modal("hide");
  TB03022P_gridState = 1;
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
      if (!data || data === undefined || data.length === 0) {
        TB03022P_gridState = 1;
      } else if (data.length >= 2) {
        TB03022P_gridState = 1;
      } else if (data) {
        TB03022P_gridState = 0;
      }

      if (empInfoSrchCnt >= 2) {
        //alert("조회된 정보가 없습니다!")
        empInfoSrchCnt = 0;
        //return;
      }
      setTimeout(() => dataEmpSetGrid(data), 400);
    },
  });
}

function dataEmpSetGrid(data) {
  arrPqGridEmpInfo.setData(data);
  arrPqGridEmpInfo.option("rowDblClick", function (event, ui) {
    setEmpNm(ui.rowData);
  });

  // 검색된 행이 1개일 경우 데이터 바로 입력
  if (
    arrPqGridEmpInfo.pdata.length === 1 &&
    $(`div[id='modal-TB03022P']`).css("display") === "none"
  ) {
    var prefix = $("#TB03022P_prefix").val();
    setEmpNm(arrPqGridEmpInfo.pdata[0]);
    empInfoSrchCnt = 0;
    // 입력되고 난 후 온체인지 이벤트 on
    TB03022P_onchangehandler = "on";
  }
  // 변부장님 지시로 삭제
  // 검색된 행이 0일 경우 모든 데이터 출력
  // else if (arrPqGridEmpInfo.pdata.length === 0) {

  // 	// 데이터 없는 경우 재조회 방지
  // 	empInfoSrchCnt += 1;

  // 	getEmpList();
  // }
  // 그렇지 않은 경우 조건에 맞는 데이터 출력
  else {
    empInfoSrchCnt = 0;
  }
}

/**
 * 부모창에 결과값 전달
 */
function setEmpNm(e) {
  var empNo = e.empno; // 직원번호
  var empNm = e.empNm; // 직원명
  var dprtCd = e.dprtCd; // 부점코드
  var dprtNm = e.dprtNm; // 부점명
  var hdqtCd = e.hdqtCd; // 본부코드
  var hdqtNm = e.hdqtNm; // 본부명

  var prefix = $("#TB03022P_prefix").val(); // id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
  var pageEmpNm = "#" + prefix + "_empNm";
  var pageEmpNo = "#" + prefix + "_empNo";
  var pageDprtCd = "#" + prefix + "_dprtCd";
  var pageDprtNm = "#" + prefix + "_dprtNm";
  var pageHdqtCd = "#" + prefix + "_hdqtCd";
  var pageHdqtNm = "#" + prefix + "_hdqtNm";

  $(pageEmpNm).val(empNm);
  $(pageEmpNo).val(empNo);
  $(pageDprtCd).val(dprtCd);
  $(pageDprtNm).val(dprtNm);
  $(pageHdqtCd).val(hdqtCd);
  $(pageHdqtNm).val(hdqtNm);

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
      if (arrPqGridMmbrInfo.length > 0) {
        arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpnm = empNm; // 버튼을 누른 행의 atdcTrgtEmpnm(위원명_화면) 값 변경
        arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpno = empNo; // 버튼을 누른 행의 atdcTrgtEmpno(위원코드) 값 변경
      }

      // 변경 내용 적용
      $("#gridMmbrList").pqGrid("refreshDataAndView");

      break;
    case "TB05010S_mmbrAngt":
      // 특정 행의 데이터 수정
      if (arrPqGridMmbrInfo.length > 0) {
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
    case "grd_TB08040S":
      console.log(feeSch);
      console.log(dprtCd);
      console.log(feeSch.pdata);

      feeSch.pdata[tb08040sIdx].rgstBdcd = dprtCd;
      feeSch.refresh();
      break;
    case "TB06011P":
      $("#TB06011P_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB04011P":
      $("#TB04011P_dprtNm").val(e.dprtCd).prop("selected", true);
      break;
    case "TB07120S1":
      $("#TB07120S1_empNo").val(empNo);
      $("#TB07120S1_empNm").val(empNm);
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
];
