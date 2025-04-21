const TB04020Sjs = (function () {
  let pqGridObjDealList;
  $(document).ready(function () {
    //setKeyFunction_TB04020S();
    loadSelectBoxContents();
    setDateInput();
    compareP();
    /**
     * 심사역 배정은 사업부 부서장만 가능함. AG18, IT10
     * 마스터 권한으로 전산도 가능.
     */
    // if ($("#userDprtCd").val() === "AG18" || $("#userDprtCd").val() === "IT10") {
    // 	$("#btnEnoListPop").prop("disabled", false);	// 심사역 팝업버튼
    // 	$("#btnReceiptDeal").prop("disabled", false);	// 접수버튼
    // 	$("#btnReturnDeal").prop("disabled", false);	// 반송버튼
    // }
    let obj = {
      height: 400,
      maxHeight: 400,
      id: "gridCheckDealList",
      colModel: colDealList,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      editable: false,
      scrollModel: { autoFit: false },
      strNoRows: "데이터가 없습니다.",
    };
    $("#gridCheckDealList").pqGrid(obj);
    pqGridObjDealList = $("#gridCheckDealList").pqGrid("instance");

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB04020S_fromDate", "TB04020S_toDate");

    $('#TB04020S_srchForm').find('input, select').on('input', function () {
      reset_dataForm();
    })
  });

  function setDateInput() {
    // 1개월전 ~ 오늘일자 디폴트 세팅
    $("#TB04020S_fromDate").val(addMonth(getToday(), -1));
    $("#TB04020S_toDate").val(getToday());
    $("#TB04020S_ownDt").val(getToday());
  }

  // 알람창 팝업
  function alertPopup(t) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: t,
      confirmButtonText: "확인",
    });
  }

  // 엔터키 검색 function 세팅
  function setKeyFunction_TB04020S() {
    $("input[id=TB04020S_fromDate]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
    $("input[id=TB04020S_toDate]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
    $("input[id=TB04020S_ibDealNo]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
  }

  $("#TB04020S_ibDealNo").change(function (e) {
    if (e.value.length === 0) {
      $("#gridCheckDealList").pqGrid("option", "dataModel.data", []);
      $("#gridCheckDealList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    }
  });

  //심사 안건 조회
  function checkDealSearch() {
    let rgstDtStart = $("#TB04020S_fromDate").val().replaceAll("-", ""); // Deal생성일자(시작)
    let rgstDtEnd = $("#TB04020S_toDate").val().replaceAll("-", ""); // Deal생성일자(종료)
    let dprtCd = $("#TB04020S_D010").val(); // 담당부서
    let crncyCd = $("#TB04020S_I027").val(); // 통화
    let dealNo = $("#TB04020S_ibDealNo").val(); // deal번호
    let mtrPrgSttsDcd = $("#TB04020S_I011").val(); // 안건진행상태

    if (
      isNotEmpty(rgstDtStart) ||
      isNotEmpty(rgstDtEnd) ||
      isNotEmpty(TB04020S_dealNo)
    ) {
      businessFunction();
    } else {
      alertPopup("Deal생성일자 또는 Deal번호를 확인해주세요.");
    }

    function businessFunction() {
      var dtoParam = {
        rgstDtStart: rgstDtStart,
        rgstDtEnd: rgstDtEnd,
        dprtCd: dprtCd,
        crncyCd: crncyCd,
        dealNo: dealNo,
        mtrPrgSttsDcd: mtrPrgSttsDcd,
      };

      $.ajax({
        type: "GET",
        url: "/TB04020S/checkDealSearch",
        data: dtoParam,
        dataType: "json",
        success: function (data) {

          reset_dataForm();

          if (data.length > 0) {
            pqGridObjDealList.setData(data);
            pqGridObjDealList.option("rowDblClick", function (event, ui) {
              setDealDetails(ui.rowData);
            });
          }
          else {
            Swal.fire({
              icon: "warning",
              title: "Warning!",
              text: "조회된 내역이 없습니다!",
              confirmButtonText: "확인",
            });
            pqGridObjDealList.setData([]);
          }
        },
      });
    }
  }

  // 더블클릭 시 상세정보
  function setDealDetails(e) {
    $("#TB04020S_detail_dealNo").val(e.dealNo); // Deal번호
    $("#TB04020S_detail_mtrDcdNm").val(e.mtrDcdNm); // 부수안건구분코드명
    $("#TB04020S_detail_mtrDcd").val(e.mtrDcd); // 부수안건구분코드
    $("#TB04020S_detail_jdgmDcdNm").val(e.jdgmDcdNm); // 리스크심사구분코드명
    $("#TB04020S_detail_jdgmDcd").val(e.jdgmDcd); // 리스크심사구분코드
    $("#TB04020S_detail_mtrNm").val(e.mtrNm); // DEAL 명

    $("#TB04020S_detail_chrgPDprtCd").val(e.chrgPDprtCd); // 담당자부서
    $("#TB04020S_detail_chrgPNo").val(e.chrrEmpno); // 담당자사번
    $("#TB04020S_detail_chrgPNm").val(e.chrgPNm); // 담당자명
    $("#TB04020S_detail_mtrPrgSttsDcd").val(e.mtrPrgSttsDcdNm); // 안건진행상태

    $("#TB04020S_empNm").val(e.ownPNm); // 심사역명
    $("#TB04020S_empNo").val(e.ownPEno); // 심사역사번

    if (isEmpty(e.ownDt)) {
      $("#TB04020S_ownDt").val(getToday());
    } else {
      $("#TB04020S_ownDt").val(formatDate(e.ownDt)); // 접수배정일
    }

    if (isNotEmpty(e.riskInspctRsltnCcd)) {
      $("#TB04020S_I008").val(e.riskInspctRsltnCcd).prop("selected", true); // 리스크심사결의구분코드
    } else {
      $("#TB04020S_I008 option:eq(0)").prop("selected", true);
    }

    var mtrPrgSttsDcd = Number(e.mtrPrgSttsDcd);

    if (mtrPrgSttsDcd == 202) {
      $(".btn-success").prop("disabled", false);
    } else {
      $(".btn-success").prop("disabled", true);
    }

    if (mtrPrgSttsDcd == 202 || mtrPrgSttsDcd == 205) {
      $(".btn-danger").prop("disabled", false);
    } else {
      $(".btn-danger").prop("disabled", true);
    }

    // 자체전결이면
    if (mtrPrgSttsDcd == 309) {
      $(".btn-success").prop("disabled", true);
      $(".btn-danger").prop("disabled", true);
      $("#btnEnoListPop").prop("disabled", true);
      $("#TB04020S_ownDt").prop("disabled", true);
      $("#TB04020S_I008").prop("disabled", true);
    }
  }

  // 셀렉트박스 세팅
  function loadSelectBoxContents() {
    var item = "";
    item += "D010"; // 심사부서구분코드
    item += "/" + "I027"; // 투자통화코드
    item += "/" + "I011"; // 안건진행상태구분코드
    item += "/" + "I008"; // 전결협의체구분코드
    getSelectBoxList("TB04020S", item);
  }

  // 안건접수버튼 function
  function receiptDeal() {
    var dealNo = $("#TB04020S_detail_dealNo").val(); // Deal번호
    var mtrDcd = $("#TB04020S_detail_mtrDcd").val(); // 부수안건정보
    var jdgmDcd = $("#TB04020S_detail_jdgmDcd").val(); // 리스크심사구분

    var ownPEno = $("#TB04020S_empNo").val(); // 심사역
    var ownDt = $("#TB04020S_ownDt").val().replaceAll("-", ""); // 접수배정일
    var riskInspctRsltnCcd = $("#TB04020S_I008").val(); // 리스크심사결의구분코드

    var mtrPrgSttsDcd = "205"; // 심사진행상태코드

    var dtoParam = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
      ownPEno: ownPEno,
      ownDt: ownDt,
      riskInspctRsltnCcd: riskInspctRsltnCcd,
      mtrPrgSttsDcd: mtrPrgSttsDcd,
    };

    var option = {};
    option.title = "Warning!";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "안건 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(ownPEno)) {
      option.text = "심사역 정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(riskInspctRsltnCcd)) {
      option.text = "전결협의체를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(ownDt)) {
      option.text = "접수배정일을 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      $.ajax({
        type: "POST",
        url: "/TB04020S/receiptDeal",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "안건접수처리 완료하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            checkDealSearch();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "안건접수처리 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 담당자와 심사역 비교
  function compareP() {
    $(document).on("change", "#TB04020S_empNo", function () {
      var empNmValue = $(this).val();
      var detailChrgPNoValue = $("#TB04020S_detail_chrgPNo").val();

      if (empNmValue === detailChrgPNoValue) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: "담당자와 심사역이 동일할 수 없습니다.",
          confirmButtonText: "확인",
        }).then(function () {
          // 팝업이 닫힌 후에 실행되는 코드
          $("#TB04020S_empNo").val(""); // 심사역사번
          $("#TB04020S_empNm").val(""); // 심사역이름
          $("#btnCallTB03022P").click();
        });
      }
    });
  }

  // 안건반송버튼 function
  function returnDeal() {
    var dealNo = $("#TB04020S_detail_dealNo").val(); // Deal번호
    var mtrDcd = $("#TB04020S_detail_mtrDcd").val(); // 부수안건정보
    var jdgmDcd = $("#TB04020S_detail_jdgmDcd").val(); // 리스크심사구분

    var mtrPrgSttsDcd = "206"; // 심사진행상태코드
    var ownPEno = ""; // 심사역
    var ownDt = ""; // 접수배정일
    var riskInspctRsltnCcd = ""; // 전결협의체

    var dtoParam = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
      mtrPrgSttsDcd: mtrPrgSttsDcd,
      ownPEno: ownPEno,
      ownDt: ownDt,
      riskInspctRsltnCcd: riskInspctRsltnCcd,
    };

    var option = {};
    option.title = "Warning!";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "안건 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      $.ajax({
        type: "POST",
        url: "/TB04020S/returnDeal",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "안건반송처리 완료하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            checkDealSearch();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "안건반송처리 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 전체초기화
  function reset_TB04020S() {
    setDateInput();
    $("#TB04020S_D010").val(""); //심사부서
    $("#TB04020S_I027").val("KRW"); // 통화
    $("#TB04020S_ibDealNo").val(""); // 딜번호
    $("#TB04020S_ibDealNm").val(""); // 딜번호
    $("#TB04020S_I011").val(""); //안건진행상태
    pqGridObjDealList.setData([]);
    $("#dealInfBox input").val(""); //딜정보
    $("#chrgInfoBox input").val(""); //거래담당
    $("#TB04020S_empNo").val(""); //심사역
    $("#TB04020S_empNm").val(""); //심사역
    $("#TB04020S_I008").val(""); //전결협의체
    $(".btn-success").prop("disabled", false);
    $(".btn-danger").prop("disabled", false);
  }

  // 조회데이터 초기화
  function reset_dataForm () {
    pqGridObjDealList.setData([]);
    $("#dealInfBox input").val(""); //딜정보
    $("#chrgInfoBox input").val(""); //거래담당
    $("#TB04020S_empNo").val(""); //심사역
    $("#TB04020S_empNm").val(""); //심사역
    $("#TB04020S_I008").val(""); //전결협의체
    $(".btn-success").prop("disabled", false);
    $(".btn-danger").prop("disabled", false);
  }

  /* ***********************************그리드 컬럼******************************** */
  let colDealList = [
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      halign: "center",
      align: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      align: "left",
      halign: "center",
      width: "400",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건",
      dataType: "string",
      dataIndx: "mtrDcdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      halign: "center",
      align: "left",
      hidden: true,
    },
    {
      title: "신규/재부의정보코드",
      dataType: "string",
      dataIndx: "jdgmDcd",
      align: "center",
      hidden: true,
    },
    {
      title: "신규/재부의정보",
      dataType: "string",
      dataIndx: "jdgmDcdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건진행상태",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건진행상태코드",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcd",
      halign: "center",
      align: "center",
      hidden: true,
    },
    {
      title: "리스크심사결의구분코드",
      dataType: "string",
      dataIndx: "riskInspctRsltnCcd",
      halign: "center",
      align: "center",
      hidden: true,
    },
    {
      title: "Deal 생성일자",
      dataType: "date",
      dataIndx: "rgstDt",
      halign: "center",
      align: "center",
      width: "120",
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
      title: "기표일(예정)",
      dataType: "date",
      dataIndx: "wrtExptDt",
      halign: "center",
      align: "center",
      width: "120",
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
      title: "만기일(예정)",
      dataType: "date",
      dataIndx: "mtrtExptDt",
      halign: "center",
      align: "center",
      width: "120",
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
      title: "담당자명",
      dataType: "string",
      dataIndx: "chrgPNm",
      halign: "center",
      align: "center",
      width: "120",
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
      title: "담당부서",
      dataType: "string",
      dataIndx: "chrgPDprtNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당부서코드",
      dataType: "string",
      dataIndx: "chrgPDprtCd",
      align: "center",
      hidden: true,
    },
    {
      title: "심사역",
      dataType: "string",
      dataIndx: "ownPNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역",
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
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역부서코드",
      dataType: "string",
      dataIndx: "ownPDprtCd",
      align: "center",
      hidden: true,
    },
    {
      title: "접수배정일",
      dataType: "string",
      dataIndx: "ownDt",
      halign: "center",
      align: "center",
      width: "120",
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
      title: "참여금액",
      dataType: "int",
      dataIndx: "ptfdAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      title: "투자국가",
      dataType: "string",
      dataIndx: "invNtnCdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자국가코드",
      dataType: "string",
      dataIndx: "invtNtnCd",
      align: "center",
      halign: "center",
      hidden: true,
    },
    {
      title: "투자통화",
      dataType: "string",
      dataIndx: "ptfdCrryCdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자통화코드",
      dataType: "string",
      dataIndx: "ptfdCrryCd",
      align: "center",
      halign: "center",
      hidden: true,
    },
    {
      title: "통화금액",
      dataType: "int",
      dataIndx: "krwTrslPtfdAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      title: "전체수익",
      dataType: "int",
      dataIndx: "tlErnAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      title: "수수료수익",
      dataType: "int",
      dataIndx: "wrtErnAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      title: "투자수익",
      dataType: "int",
      dataIndx: "rcvblErnAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      title: "업체명",
      dataType: "string",
      dataIndx: "entpNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신용등급",
      dataType: "string",
      dataIndx: "dmsCrdtGrdDcdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
      hidden: true, // 114 테이블 참조 중이나 해당 테이블 관리하고 있지 않아 숨김
    },
    {
      title: "신용등급구분코드",
      dataType: "string",
      dataIndx: "dmsCrdtGrdDcd",
      align: "center",
      halign: "center",
      hidden: true,
    },
    {
      title: "투자상품대분류",
      dataType: "string",
      dataIndx: "invPrdtLclsCdNm",
      halign: "center",
      align: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품대분류코드",
      dataType: "string",
      dataIndx: "invPrdtLclsCd",
      align: "left",
      halign: "center",
      hidden: true,
    },
    {
      title: "투자상품중분류",
      dataType: "string",
      dataIndx: "invPrdtMdclCdNm",
      halign: "center",
      align: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품중분류코드",
      dataType: "string",
      dataIndx: "invPrdtMdclCd",
      align: "left",
      halign: "center",
      hidden: true,
    },
    {
      title: "투자상품소분류",
      dataType: "string",
      dataIndx: "invPrdtSclsCdNm",
      halign: "center",
      align: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품소분류코드",
      dataType: "string",
      dataIndx: "invPrdtSclsCd",
      align: "left",
      halign: "center",
      hidden: true,
    },
    {
      title: "투자상품상세분류",
      dataType: "string",
      dataIndx: "invPrdtDtlsDvdCdNm",
      halign: "center",
      align: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품상세분류코드",
      dataType: "string",
      dataIndx: "invPrdtDtlsDvdCd",
      align: "left",
      halign: "center",
      hidden: true,
    },
  ];

  return {
    checkDealSearch: checkDealSearch,
    receiptDeal: receiptDeal,
    returnDeal: returnDeal,
    reset_TB04020S: reset_TB04020S,
    compareP: compareP,
  };
})();
