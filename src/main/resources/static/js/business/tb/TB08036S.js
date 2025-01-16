const TB08036Sjs = (function () {
  let arrPqGridStepInfo; //월별 공사 및 분양 현황
  let arrPqGridInspctRmrkInfo; //월별 사업 관리의견
  let arrPqGridEtcInfo; // 기타사후관리
  let paramData = {};

  $(document).ready(function () {
    loadSelectBoxContents();
    convertDateFormat();
    rendorGrid();
    TB08036S_getUrlDealInfo();
  });

  // 그리드설정
  function rendorGrid() {
    /* ***********************************그리드 컬럼******************************** */
    // 월별 공사 및 분양 현황
    let colStepInfoList = [
      {
        title: "기준년월",
        dataType: "string",
        dataIndx: "stdrYm",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length !== 0) {
            let rgstDt1 = cellData.substring(0, 4);
            let rgstDt2 = cellData.substring(4, 6);
            return `${rgstDt1}년 ${rgstDt2}월`.trim();
          }
          return cellData;
        },
      },
      {
        title: "사업진행단계코드",
        dataType: "string",
        dataIndx: "busiPrgStep",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "사업진행단계",
        dataType: "string",
        dataIndx: "busiPrgStepNm",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "예상진척율",
        dataType: "string",
        dataIndx: "estmPrgsRt",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let value = ui.cellData;
          if (value) {
            return value + "%";
          }
          return value;
        },
      },
      {
        title: "실적진척율",
        dataType: "string",
        dataIndx: "pfmcPrgsRt",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let value = ui.cellData;
          if (value) {
            return value + "%";
          }
          return value;
        },
      },
    ];

    // 기타사후관리
    let colEtcList = [
      {
        title: "점검일자",
        dataType: "string",
        dataIndx: "inspctDt",
        align: "center",
        width: "15%",
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
        title: "점검결과",
        dataType: "string",
        dataIndx: "inspctRmrk",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "비고",
        dataType: "string",
        dataIndx: "rmrk",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 월별사업관리의견
    let colInspctRmrkList = [
      {
        title: "기준년월",
        dataType: "string",
        dataIndx: "inspctYm",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length !== 0) {
            let rgstDt1 = cellData.substring(0, 4);
            let rgstDt2 = cellData.substring(4, 6);
            return `${rgstDt1}년 ${rgstDt2}월`.trim();
          }
          return cellData;
        },
      },
      {
        title: "점검결과",
        dataType: "string",
        dataIndx: "checkRslt",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 그리드
    let arrPqGridObj = [
      //월별 공사 및 분양 현황
      {
        height: 150,
        maxHeight: 150,
        id: "TB08036S_gridStepInfo",
        colModel: colStepInfoList,
        dataModel: {
          data: [],
        },
      },
      //월별사업관리의견
      {
        height: 150,
        maxHeight: 150,
        id: "TB08036S_inspctRmrk",
        colModel: colInspctRmrkList,
        dataModel: {
          data: [],
        },
      },
      //기타사후관리
      {
        height: 150,
        maxHeight: 150,
        id: "TB08036S_etcList",
        colModel: colEtcList,
        dataModel: {
          data: [],
        },
      },
    ];

    setPqGrid(arrPqGridObj);

    arrPqGridStepInfo = $("#TB08036S_gridStepInfo").pqGrid("instance"); // 월별 공사 및 분양 관리
    arrPqGridInspctRmrkInfo = $("#TB08036S_inspctRmrk").pqGrid("instance"); //월별사업관리의견
    arrPqGridEtcInfo = $("#TB08036S_etcList").pqGrid("instance"); //기타사후관리
  }

  // 에러메시지
  function showErrorPopup(message) {
    openPopup({
      type: "error",
      title: "Error!",
      text: message,
    });
  }

  // 에이작스 알람팝업
  function showSwalMessage(type, title, text) {
    Swal.fire({
      icon: type, // success, error, warning, info
      title: title,
      text: text,
      confirmButtonText: "확인",
    });
  }

  //셀렉트박스 세팅
  function loadSelectBoxContents() {
    var item = "";
    item += "B014"; // 사업진행상태구분코드
    item += "/" + "C010"; // 신용보강기관내용구분코드
    item += "/" + "I012"; // 신용등급구분코드

    getSelectBoxList("TB08036S", item);
  }

  // %포멧 확인
  function formatPerInput(element) {
    let value = element.value;

    //숫자와 소수점만 허용
    value = value.replace(/[^0-9.]/g, "");

    // 소수점 두 자리까지만 허용
    if (value.includes(".")) {
      let parts = value.split(".");
      parts[1] = parts[1].substring(0, 2); // 소수점 두 자리로 제한
      value = parts.join(".");
    }

    if (parseFloat(value) > 100.0) {
      showErrorPopup("입력값은 100을 넘을 수 없습니다");
    }

    // 값이 있고 소수점이 없는 경우 .00 추가
    if (value && !value.includes(".")) {
      value = parseFloat(value).toFixed(2);
    }

    if (!value) {
      value = "0.00";
    }

    element.value = value;
  }
  window.formatPerInput = formatPerInput;

  // 초기화버튼
  function btnResetTB08036S() {
    $("#TB08036S_ibDealNo").val("");
    $("#TB08036S_ibDealNm").val("");
    $("#TB08036S_inspctYyMm").val("");

    $("#UPLOAD_FileList").html(""); // 테이블 리셋
    $('div[data-menuid="/TB08036S"] #UPLOAD_AddFile').attr("disabled", true);
    $('div[data-menuid="/TB08036S"] #UPLOAD_DelFiles').attr("disabled", true);

    resetTabDeal();
    resetTabStep();
    resetTabInsptRmrk();
    resetTabEtc();
  }

  function TB08036S_getUrlDealInfo() {
    let dealNo = sessionStorage.getItem("dealNo");
    let dealNm = sessionStorage.getItem("dealNm");

    if (isNotEmpty(dealNo)) {
      $("#TB08036S_ibDealNo").val(dealNo);
      $("#TB08036S_ibDealNm").val(dealNm);
    }
    sessionStorage.clear();
  }

  // 날짜입력 포멧 세팅
  document.querySelectorAll(".date-input").forEach(function (inputElement) {
    inputElement.addEventListener("blur", function () {
      convertDateFormat(inputElement);
    });
  });

  function convertDateFormat(inputElement) {
    if (!inputElement || typeof inputElement.value !== "string") {
      return;
    }

    var dateInput = inputElement.value;

    // 만약 입력값이 yyyymmdd 형식이라면
    if (dateInput.length === 8 && !isNaN(dateInput)) {
      var year = dateInput.substring(0, 4);
      var month = dateInput.substring(4, 6);
      var day = dateInput.substring(6, 8);

      if (isValidDate(year, month, day)) {
        var formattedDate = year + "-" + month + "-" + day;
        inputElement.value = formattedDate;
      } else {
        showErrorPopup("잘못된 날짜 형식입니다. 다시 입력해주세요.");
      }
    }
  }

  // 유효날짜 확인
  function isValidDate(year, month, day) {
    if (month < 1 || month > 12) return false;
    var daysInMonth = getDaysInMonth(month, year);
    if (day < 1 || day > daysInMonth) return false;

    return true;
  }

  function getDaysInMonth(month, year) {
    // 각 월별 최대 일 수
    var daysInMonth;

    switch (month) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        daysInMonth = 31;
        break;
      case "04":
      case "06":
      case "09":
      case "11":
        daysInMonth = 30;
        break;
      case "02":
        // 윤년을 고려하여 2월의 일수를 반환
        daysInMonth = isLeapYear(year) ? 29 : 28;
        break;
      default:
        daysInMonth = 0;
        break;
    }

    return daysInMonth;
  }

  // 윤년 확인 함수
  function isLeapYear(year) {
    year = parseInt(year);
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  // ID 값 가져오기
  function getInputValue(id, defaultValue = "") {
    return $(`#${id}`).val() || defaultValue;
  }

  /**
   * 사후관리(tb08036s) 데이터 가져오기
   * @returns
   */

  function getDealInfoTB08036S() {
    const dealNo = $("#TB08036S_ibDealNo").val();
    const inspctYm = unformatDate($("#TB08036S_inspctYyMm").val());
    const inspctDt = unformatDate($("#TB08036S_inspctYyMm").val());
    const stdrYm = unformatDate($("#TB08036S_inspctYyMm").val());

    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    const paramData = { dealNo, inspctYm, inspctDt, stdrYm };

    $.ajax({
      type: "GET",
      url: "/TB08036S/getDealInfoTB08036S",
      data: paramData,
      dataType: "json",
      success: function (data) {
        if (data && Object.keys(data).length > 0) {
          setTabDealInfo(data);
          setTabEtc(data.listEtc);
          setTabStep(data.ibims611bdto);
          setTabInspctRmrk(data.listInspctRmrk);
          //관련문서
          var key2 = dealNo;
          getFileInfo("", key2);
          $('div[data-menuid="/TB08036S"] #UPLOAD_AddFile').attr(
            "disabled",
            false
          );
          $('div[data-menuid="/TB08036S"] #UPLOAD_DelFiles').attr(
            "disabled",
            false
          );
        } else {
          showErrorPopup("등록된 사업정보가 없습니다.");
        }
      },
      error: function () {
        showErrorPopup("등록된 사업정보가 없습니다.");
      },
    });
  }

  // 분양수지관리 데이터 세팅
  function setTabDealInfo(dealInfo) {
    $("#unitNum").val(dealInfo.unitNum); // 세대수
    $("#slStDt").val(formatDate(dealInfo.slStDt)); // 분양시작일
    $("#slEdDt").val(formatDate(dealInfo.slEdDt)); // 분양종료일
    $("#slPrd").val(dealInfo.slPrd); // 분양기간
    $("#cnstStDt").val(formatDate(dealInfo.cnstStDt)); // 공사시작일
    $("#cnstEdDt").val(formatDate(dealInfo.cnstEdDt)); // 공사종료일
    $("#cnstPrd").val(dealInfo.cnstPrd); // 공사기간
    $("#TB08036S_C010")
      .val(dealInfo.crdtRifcIsttCtns)
      .prop("selected", true)
      .change(); // 신용보강기관내용
    $(":radio[name='loanBondTakYn']").radioSelect(dealInfo.loanBondTakYn); // 대출채권양수여부
    $("#TB08036S_I012_1")
      .val(dealInfo.prfbIslfEvl)
      .prop("selected", true)
      .change(); // 사업장자체평가
    $(":radio[name='ipreYn']").radioSelect(dealInfo.ipreYn); // IPRE여부
    $("#TB08036S_I012_2").val(dealInfo.clcIntlGrd); // 계산내부등급
    $("#TB08036S_I012_3").val(dealInfo.dcsnIntlGrd); // 확정내부등급
    $("#mgtnRt").val(dealInfo.mgtnRt); // 이주율
    $("#estmPrgsRt").val(dealInfo.estmPrgsRt); // 예상진척율
    $("#pfmcPrgsRt").val(dealInfo.pfmcPrgsRt); // 실적진척율
    $("#TB08036S_B014_01").val(dealInfo.busiPrgStep); // 사업진행단계
    $("#inspctRmrk").val(dealInfo.inspctRmrk).prop("selected", true).change(); // 분양수지점검결과
    $("#bsnBdSlltBalcCheckOpnn").val(dealInfo.bsnBdSlltBalcCheckOpnn); // 영업점분양수지점검의견
  }

  // 월별 공사 및 분양 현황 데이터 세팅
  function setTabStep(data) {
    //데이터리셋
    resetTabStep();

    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    arrPqGridStepInfo.setData(data);
    arrPqGridStepInfo.option("rowDblClick", function (event, ui) {
      setStepItem(ui.rowData);
    });
  }

  function setStepItem(e) {
    var stdrYm = e.stdrYm; // 기준년월
    var busiPrgStep = e.busiPrgStep; // 사업진행단계
    var estmPrgsRt = e.estmPrgsRt; // 예상진척율
    var pfmcPrgsRt = e.pfmcPrgsRt; // 실적진척율

    $("#step_inspctYyMm").val(formatDate(stdrYm));
    $("#TB08036S_B014_02").val(busiPrgStep);
    $("#stepEstmPrgsRt").val(estmPrgsRt);
    $("#stepPfmcPrgsRt").val(pfmcPrgsRt);
  }

  // 월별사업관리 데이터 세팅
  function setTabInspctRmrk(data) {
    resetTabInsptRmrk();
    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    arrPqGridInspctRmrkInfo.setData(data);
    arrPqGridInspctRmrkInfo.option("rowDblClick", function (event, ui) {
      setInspctRmrkItem(ui.rowData);
    });
  }

  function setInspctRmrkItem(e) {
    var inspctYm = e.inspctYm; //기준년월
    var checkRslt = e.checkRslt; //점검결과

    $("#rmrkInspctYyMm").val(formatDate(inspctYm));
    $("#monCheckRslt").val(checkRslt);
  }

  // 기타사후관리 데이터 세팅
  function setTabEtc(data) {
    resetTabEtc();
    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    arrPqGridEtcInfo.setData(data);
    arrPqGridEtcInfo.option("rowDblClick", function (event, ui) {
      setEtcItem(ui.rowData);
    });
  }

  function setEtcItem(e) {
    var inspctDt = e.inspctDt; // 점검일자
    var inspctRmrk = e.inspctRmrk; //점검내용
    var rmrk = e.rmrk; // 비고

    $("#inspctDt").val(formatDate(inspctDt));
    $("#etcInspctRmrk").val(inspctRmrk);
    $("#rmrk").val(rmrk);
  }

  /**
   * 분양수지관리 탭
   * @returns
   */

  function dealInfoTab_TB08036(type) {
    paramData = {
      dealNo: getInputValue("TB08036S_ibDealNo"), // Deal번호
      unitNum: getInputValue("unitNum"), // 세대수
      crdtRifcIsttCtns: getInputValue("TB08036S_C010"), // 신용보강기관내용
      clcIntlGrd: getInputValue("TB08036S_I012_2"), // 계산내부등급
      prfbIslfEvl: getInputValue("TB08036S_I012_1"), // 사업성자체평가
      loanBondTakYn: $("input[name='loanBondTakYn']:checked").val(), // 대출채권양수여부
      inspctYyMm: unformatDate(getInputValue("TB08036S_inspctYyMm")), // 점검기준년월
      slStDt: unformatDate(getInputValue("slStDt")), // 분양시작일
      slEdDt: unformatDate(getInputValue("slEdDt")), // 분양종료일
      slPrd: getInputValue("slPrd"), // 분양기간
      cnstStDt: unformatDate(getInputValue("cnstStDt")), // 공사시작일
      cnstEdDt: unformatDate(getInputValue("cnstEdDt")), // 공사종료일
      cnstPrd: getInputValue("cnstPrd"), // 공사기간
      ipreYn: $("input[name='ipreYn']:checked").val(), // IPRE여부
      dcsnIntlGrd: getInputValue("TB08036S_I012_3"), // 확정내부등급
      mgtnRt: getInputValue("mgtnRt"), // 이주율
      estmPrgsRt: getInputValue("estmPrgsRt"), // 예상진척율
      pfmcPrgsRt: getInputValue("pfmcPrgsRt"), // 실적진척율
      busiPrgStep: getInputValue("TB08036S_B014_01"), // 사업진행단계
      inspctRmrk: getInputValue("checkRslt"), // 점검결과
      bsnBdSlltBalcCheckOpnn: getInputValue("bsnBdSlltBalcCheckOpnn"), // 영업점분양수지점검의견
    };

    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    if (type === "modify") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/modifyDealInfoTB08036S",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          try {
            showSwalMessage(
              "success",
              "Success!",
              "분양수지관리정보를 저장하였습니다."
            );
            getDealInfoTB08036S();
          } catch (e) {
            console.error("에러 발생:", e);
          }
          getDealInfoTB08036S();
        },
      }); /* end of ajax*/
    } else if (type === "delete") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/deleteDealInfoTB08036S",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          showSwalMessage(
            "success",
            "Success!",
            "분양수지관리정보를 삭제하였습니다."
          );
          btnResetTB08036S();
        },
      }); /* end of ajax*/
    }
  }

  //분양수지관리 리셋
  function resetTabDeal() {
    $("#TB08036S_tab-1 input").each(function () {
      $(this).val("");
    });

    $("#TB08036S_tab-1 select").each(function () {
      $(this).find("option:eq(0)").prop("selected", true).change();
    });
    $("#TB08036S_tab-1 select").each(function () {
      $(this).prop("selectedIndex", 0).change();
    });

    $("#bsnBdSlltBalcCheckOpnn").val("");
  }

  /**
   * 월별 공사 및 분양 현황
   *
   */

  // 월별 공사 및 분양 현황 저장
  function stepInfoTab_TB08036(type) {
    paramData = {
      dealNo: getInputValue("TB08036S_ibDealNo"), // Deal번호
      stdrYm: unformatDate(getInputValue("step_inspctYyMm")),
      busiPrgStep: getInputValue("TB08036S_B014_02"),
      estmPrgsRt: getInputValue("stepEstmPrgsRt"),
      pfmcPrgsRt: getInputValue("stepPfmcPrgsRt"),
    };

    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    if (type === "modify") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/insertIBIMS611B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
      }); /* end of ajax*/
    } else if (type === "delete") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/deleteIBIMS611B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          showSwalMessage("success", "Success!", "정보를 삭제하였습니다.");
        },
      }); /* end of ajax*/
    }
    getDealInfoTB08036S();
  }

  //월별 공사 및 분양 현황 리셋
  function resetTabStep() {
    $("#TB08036S_gridStepInfo").pqGrid("option", "dataModel.data", []);
    $("#TB08036S_gridStepInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#step_inspctYyMm").val("");
    $("#TB08036S_B014_02").val("");
    $("#stepEstmPrgsRt").val("");
    $("#stepPfmcPrgsRt").val("");
  }

  /**
   * 월별사업관리
   *
   */

  function inspctRmrkTab_TB08036S(type) {
    paramData = {
      dealNo: getInputValue("TB08036S_ibDealNo"),
      inspctYm: unformatDate(getInputValue("rmrkInspctYyMm")),
      checkRslt: getInputValue("monCheckRslt"),
    };
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }
    if (type === "modify") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/insertIBIMS602B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "점검결과를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
      }); /* end of ajax*/
    } else if (type === "delete") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/deleteIBIMS602B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          showSwalMessage("success", "Success!", "점검결과를 삭제하였습니다.");
        },
      }); /* end of ajax*/
    }
    getDealInfoTB08036S();
  }

  //월별사업관리 리셋
  function resetTabInsptRmrk() {
    $("#TB08036S_inspctRmrk").pqGrid("option", "dataModel.data", []);
    $("#TB08036S_inspctRmrk").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#rmrkInspctYyMm").val("");
    $("#monCheckRslt").val("");
  }

  /**
   * 기타사후관리 탭
   * @param {*} data
   */

  // 기타사후관리 저장
  function etcTab_TB08036S(type) {
    paramData = {
      dealNo: getInputValue("TB08036S_ibDealNo"),
      inspctDt: unformatDate(getInputValue("inspctDt")),
      inspctRmrk: getInputValue("etcInspctRmrk"),
      rmrk: getInputValue("rmrk"),
    };
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }
    if (type === "modify") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/insertIBIMS603B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "기타사후관리를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
      }); /* end of ajax*/
    } else if (type === "delete") {
      $.ajax({
        type: "POST",
        url: "/TB08036S/deleteIBIMS603B",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          showSwalMessage(
            "success",
            "Success!",
            "기타사후관리를 삭제하였습니다."
          );
        },
      }); /* end of ajax*/
    }
    getDealInfoTB08036S();
  }

  //기타사후관리 리셋
  function resetTabEtc() {
    $("#TB08036S_etcList").pqGrid("option", "dataModel.data", []);
    $("#TB08036S_etcList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#inspctDt").val("");
    $("#etcInspctRmrk").val("");
    $("#rmrk").val("");
  }

  function setStepInfoList() {
    setTimeout(() => arrPqGridStepInfo.refresh(), 1);
  }
  function setInspctRmrkInfoList() {
    setTimeout(() => arrPqGridInspctRmrkInfo.refresh(), 1);
  }
  function setEtcList() {
    setTimeout(() => arrPqGridEtcInfo.refresh(), 1);
  }

  return {
    getDealInfoTB08036S: getDealInfoTB08036S,
    btnResetTB08036S: btnResetTB08036S,
    setStepInfoList: setStepInfoList,
    stepInfoTab_TB08036: stepInfoTab_TB08036,
    setInspctRmrkInfoList: setInspctRmrkInfoList,
    setEtcList: setEtcList,
    dealInfoTab_TB08036: dealInfoTab_TB08036,
    TB08036S_getUrlDealInfo: TB08036S_getUrlDealInfo,
    rendorGrid: rendorGrid,
    inspctRmrkTab_TB08036S: inspctRmrkTab_TB08036S,
    etcTab_TB08036S: etcTab_TB08036S,
    formatPerInput: formatPerInput,
  };
})();
