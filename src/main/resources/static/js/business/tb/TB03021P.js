let arrPqGridDealInfo;
let empNo;

$(document).ready(function () {
  changeValues();
  docRdySettings();
});

/**
 * 모달 팝업 show
 */
function callTB03021P(prefix) {
  reset_TB03021P();
  $("#TB03021P_prefix").val(prefix);
  $("#modal-TB03021P").modal("show");
	indexChangeHandler("TB03021P");
  setTimeout(() => {
    let setPqGridObj = [
      {
        height: 300,
        maxHeight: 300,
        id: "gridDealInfo",
        colModel: colDealInfo,
      },
    ];
    setPqGrid(setPqGridObj);
    arrPqGridDealInfo = $("#gridDealInfo").pqGrid("instance");
  }, 300);
  
}

/**
 * close TB03021P modal
 */
function modalClose_TB03021P() {
  reset_TB03021P();
  $("#gridDealInfo").pqGrid("refreshDataAndView");
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
  empNo = $('#userEno').val();
  $("#TB03021P_dealInfoList").html("");
  $("#TB03021P_ibDealNo").val("");
  $("#TB03021P_ibDealNm").val("");
  $('#TB03021P1_empNm').val($('#userEmpNm').val());
  $('#TB03021P1_empNo').val(empNo);
  $('#TB03021P2_dprtNm').val($('#userDprtNm').val());
  $('#TB03021P2_dprtCd').val($('#userDprtCd').val());

  //$("#TB03021P_datepicker1").val("");
}

function docRdySettings() {
  modalShowFunction();
  keyDownEnter_TB03021P();
}

function modalShowFunction() {
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


  // $("input[id=TB03021P_datepicker1]").keydown(function (key) {
  //   if (key.keyCode == 13) {
  //     //키가 13이면 실행 (엔터는 13)
  //     getDealInfo();
  //   }
  // });
  
}

/**
 * deal 번호 조회 ajax
 */
function getDealInfo() {
  var dealNo = $("#TB03021P_ibDealNo").val(); //Deal 번호
  var dealNm = $("#TB03021P_ibDealNm").val(); //Deal명
  var chrrEmpno = $("#TB03021P1_empNo").val(); //담당자번호
  var dprtCd = $("#TB03021P2_dprtCd").val();   //부서코드
  
  // var rgstDt = $("#TB03021P_datepicker1").val().replaceAll("-", "");

  var dtoParam = {
    dealNo: dealNo,
    dealNm: dealNm,
    chrrEmpno : chrrEmpno,
    dprtCd : dprtCd,
    //rgstDt: rgstDt,
  };

  $.ajax({
    type: "GET",
    url: "/TB03021P/getDealInfo",
    data: dtoParam,
    dataType: "json",
    success: function (data) {
      arrPqGridDealInfo.setData(data);
      arrPqGridDealInfo.option("rowDblClick", function (event, ui) {
        setDealInfo(ui.rowData);
      });
    },
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
    $("#selectedMngDealNo").val(ibDealNo);
    $("#selectedMngDealNo").focus();
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

  if (prefix == 'TB04020S') {
    TB04020Sjs.checkDealSearch();
  }

  if (prefix == "AS04110S") {
    addDealInfo(ibDealNo);
  }

  if (prefix == "TB08031S_relt") {
    getReltDealInfo(ibDealNo);
  }
  if (prefix == "TB08010S") {
    TB08010Sjs.getEamList();
  }

  
	if(prefix == 'TB09080S'){/* 
		$("#TB09080S_prdtCd").val("");
		$("#TB09080S_prdtNm").val(""); */
		//getDealList();
		
	}

  if(prefix == 'TB06060S'){ 
		$("#TB06060S_prdtCd").val("");
		$("#TB06060S_prdtNm").val("");
	}

  modalClose_TB03021P();
}

function changeValues(){
  /**
   *  담당자번호, 부서번호는 로그인 중인 사원으로 기본세팅이 된다.
   *  1. 담당자명 변경
   *    1-1. 팝업으로 담당자번호를 세팅할 경우(담당자만 변경), 부서번호를 빈값으로 변경해야한다. 
   *    1-2. 담당자명 직접변경(input), 
   *          1-2-1. 담당자목록에 있는 값이면 바로 세팅
   *          1-2-2. 없으면 팝업창 띄움 
  */

    //담당자명 실시간 변경시 담당자번호 클리어
  $('#TB03021P1_empNm').on('input', function(){
    $('#TB03021P1_empNo').val("");  
  });

  //부서명 실시간 변경시 부서번호 클리어
  $('#TB03021P2_dprtNm').on('input', function(){
    $('#TB03021P2_dprtCd').val(""); 
  });

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
    halign : "center",
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
    halign : "center",
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
