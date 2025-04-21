const TB04030Sjs = (function () {
  let pqGridObjDealList;

  $(document).ready(function () {
    //setKeyFunction_TB04030S();
    loadSelectBoxContents();
    setDateInput();
    setArrPqGridObj();

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB04030S_fromDate","TB04030S_toDate");

    $('#TB04030S_srchForm').find('input, select').on('input', function () {
      pqGridObjDealList.setData([]);
    })
  });

  /* 그리드설정 */
  function setArrPqGridObj() {
    let arrPqGridObj = [
      {
        height: 600,
        maxHeight: 600,
        id: "TB04030S_gridDealList",
        colModel: colDealList,
      },
    ];
    setPqGrid(arrPqGridObj);
    pqGridObjDealList = $("#TB04030S_gridDealList").pqGrid("instance");
  }

  /* 1개월전 ~ 오늘일자 디폴트 세팅 */
  function setDateInput() {
    $("#TB04030S_fromDate").val(addMonth(getToday(), -1));
    $("#TB04030S_toDate").val(getToday());
  }

  // 팝업 엔터로 조회
  // function setKeyFunction_TB04030S() {
  //   $("input[id=TB04030S_fromDate]").keyup(function (key) {
  //     if (key.keyCode == 13) {
  //       assignmentSearch();
  //     }
  //   });
  //   $("input[id=TB04030S_toDate]").keyup(function (key) {
  //     if (key.keyCode == 13) {
  //       assignmentSearch();
  //     }
  //   });
  // }

  /*초기화 */
  function reset_TB04030S() {
    setDateInput();
    $("#TB04030S_I011").val(""); //진행상태
    $("#TB04030S_D010").val(""); // 심사부서
    $("#TB04030S_empNo").val(""); // 심사자번호
    $("#TB04030S_empNm").val("");
    pqGridObjDealList.setData([]);
  }

  /* 셀렉트박스 세팅 */
  function loadSelectBoxContents() {
    var item = "";
    item += "D010"; // 심사부서구분코드
    item += "/" + "I011"; // 안건진행상태구분코드

    getSelectBoxList("TB04030S", item);
  }

  function alertPopup(msg) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: msg,
      confirmButtonText: "확인",
    });
  }

  /*조회*/
  function assignmentSearch() {
    var rgstDtStart = $("#TB04030S_fromDate").val().replaceAll("-", ""); // Deal생성일자(시작)
    var rgstDtEnd = $("#TB04030S_toDate").val().replaceAll("-", ""); // Deal생성일자(종료)
    var mtrPrgSttsDcd = $("#TB04030S_I011").val(); //진행상태
    var ownPDprtCd = $("#TB04030S_D010").val(); // 심사부서
    var chrrEmpno = $("#TB04030S_empNo").val(); // 심사자번호

    if (isNotEmpty(rgstDtStart) || isNotEmpty(rgstDtEnd)) {
      businessFunction();
    } else {
      alertPopup("Deal생성일자를 확인해주세요.");
    }

    function businessFunction() {
      var dtoParam = {
        rgstDtStart: rgstDtStart,
        rgstDtEnd: rgstDtEnd,
        ownPDprtCd: ownPDprtCd,
        chrrEmpno: chrrEmpno,
        mtrPrgSttsDcd: mtrPrgSttsDcd,
      };

      $.ajax({
        type: "GET",
        url: "/TB04030S/assignmentSearch",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            pqGridObjDealList.setData(data);
            pqGridObjDealList.option("rowDblClick", function (event, ui) {
              movePage(ui.rowData);
            });
          }
          else {
            pqGridObjDealList.setData([]);
          }
        },
      });
    }
  }

  /* 더블클릭 했을시 이동*/
  function movePage(e) {
    var dealNo = e.dealNo;
    var dealNm = e.dealNm;
    var mtrDcd = e.mtrDcd;
    var jdgmDcd = e.jdgmDcd;
    var mtrPrgSttsDcd = Number(e.mtrPrgSttsDcd);

    sessionStorage.setItem("dealNo", dealNo);
    sessionStorage.setItem("dealNm", dealNm);
    sessionStorage.setItem("mtrDcd", mtrDcd);
    sessionStorage.setItem("jdgmDcd", jdgmDcd);
    sessionStorage.setItem("mtrPrgSttsDcd", mtrPrgSttsDcd);

    if (mtrPrgSttsDcd < 301) {
      callPage("TB04010S");
      // location.href = "/TB04010S";
    } else {
      callPage("TB05040S");
      // location.href = "/TB05040S";
    }
  }

  /* ***********************************그리드 컬럼******************************** */
  let colDealList = [
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm",
      halign: "center",
      align: "left",
      width: "240",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건",
      dataType: "string",
      dataIndx: "mtrDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건구분코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "신규/재부의정보",
      dataType: "string",
      dataIndx: "jdgmDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의정보코드",
      dataType: "string",
      dataIndx: "jdgmDcd",
      halign: "center",
      align: "center",
      width: "120",
      hidden: true,
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      halign: "center",
      align: "left",
      width: "240",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "진행상태",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcdNm",
      halign: "center",
      align: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "진행상태코드",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcd",
      align: "center",
      hidden: true,
    },
    {
      title: "심사역이름",
      dataType: "string",
      dataIndx: "ownPNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역사번",
      dataType: "string",
      dataIndx: "ownPEno",
      align: "center",
      hidden: true,
    },
    {
      title: "심사역부서",
      dataType: "string",
      dataIndx: "ownPDprtNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역부서코드",
      dataType: "string",
      dataIndx: "ownPDprtCd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "접수배정일",
      dataType: "date",
      dataIndx: "ownDt",
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
      title: "담당자",
      dataType: "string",
      dataIndx: "chrgPNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당자사번",
      dataType: "string",
      dataIndx: "chrgPEno",
      halign: "center",
      align: "center",
      hidden: true,
    },
    {
      title: "담당자부서",
      dataType: "string",
      dataIndx: "chrgPDprtNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당자부서코드",
      dataType: "string",
      dataIndx: "chrgPDprtCd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  return {
    assignmentSearch: assignmentSearch,
    reset_TB04030S: reset_TB04030S,
  };
})();
