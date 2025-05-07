const TB08036Sjs = (function () {
  let arrPqGridStepInfo; //월별 공사 및 분양 현황
  let arrPqGridInspctRmrkInfo; //월별 사업 관리의견
  let arrPqGridEtcInfo; // 기타사후관리
  let paramData = {};
  let B014;

  $(document).ready(function () {
    loadSelectBoxContents();
    convertDateFormat();
    rendorGrid();
    TB08036S_getUrlDealInfo();
    TB08036S_setDatePicker("cnstStDt", "cnstEdDt", "cnstPrd");
    TB08036S_setDatePicker("slStDt", "slEdDt", "slPrd");
    btnResetTB08036S()
  });

  // 그리드설정
  function rendorGrid() {
    /* ***********************************그리드 컬럼******************************** */
    // 월별 공사 및 분양 현황
    let colStepInfoList = [
      {
        dataIndx: "chk",
        maxWidth: 36,
        minWidth: 36,
        align: "center",
        resizable: false,
        title: "",
        menuIcon: false,
        type: "checkBoxSelection",
        cls: "ui-state-default",
        sortable: false,
        editor: false,
        dataType: "bool",
        editable: "true",
        cb: {
          all: false,
          header: true,
        },
      },
      {
        title: "기준년월",
        dataType: "string",
        dataIndx: "stdrYm",
        align: "center",
        width: "25%",
        editable: true,
        editor: {
          type: "input",
          valueIndx: "stdrYm",
        },
        format: function (cellData) {
          if (cellData) {
            // 입력 데이터가 6자리인지 확인
            if (cellData.length === 6) {
              let year = cellData.substring(0, 4); // 앞 4자리: 연도
              let month = cellData.substring(4, 6); // 뒤 2자리: 월
              return `${year}년 ${month}월`; // 변환된 형식 반환
            } else {
              showErrorPopup("입력 데이터는 YYYYMM 형식이어야 합니다.");
              return "";
            }
          }
          return cellData;
        },
      },
      {
        title: "사업진행단계",
        dataType: "string",
        dataIndx: "busiPrgStep",
        halign: "center",
        align: "center",
        width: "30%",
        editable: true,
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: B014,
        },
        render: function (ui) {
          let busiPrgStep = B014.find(({ cdValue }) => cdValue == ui.cellData);
          return busiPrgStep ? busiPrgStep.cdName : ui.cellData;
        },
      },
      {
        title: "예상진척율",
        dataType: "string",
        dataIndx: "estmPrgsRt",
        align: "right",
        halign: "center",
        width: "18%",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
        editor: {
          type: "input",
          valueIndx: "estmPrgsRt",
        },
        format: function (cellData) {
          if (cellData) {
            let value = parseFloat(cellData);
            if (isNaN(value)) {
              return "";
            }
            if (value > 100) {
              showErrorPopup("100을 초과할 수 없습니다.");
              value = ""; // 100을 초과하는 값은 100으로 제한
            } else {
              return value.toFixed(2) + "%"; // 99.99 형식으로 표시
            }
          }
          return cellData;
        },
      },
      {
        title: "실적진척율",
        dataType: "string",
        dataIndx: "pfmcPrgsRt",
        align: "right",
        halign: "center",
        width: "18%",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
        editor: {
          type: "input",
          valueIndx: "pfmcPrgsRt",
        },
        format: function (cellData) {
          if (cellData) {
            let value = parseFloat(cellData);
            if (isNaN(value)) {
              return "";
            }
            if (value > 100) {
              showErrorPopup("100을 초과할 수 없습니다.");
              value = ""; // 100을 초과하는 값은 100으로 제한
            } else {
              return value.toFixed(2) + "%"; // 99.99 형식으로 표시
            }
          }
          return cellData;
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
        width: "20%",
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
        align: "left",
        halign: "center",
        width: "30%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "비고",
        dataType: "string",
        dataIndx: "rmrk",
        align: "left",
        halign: "center",
        width: "50%",
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
        width: "30%",
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
        align: "left",
        halign: "center",
        width: "70%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 그리드
    let arrPqGridObj = [
      //월별 공사 및 분양 현황
      {
        height: 160,
        maxHeight: 160,
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
      type: "warning",
      title: "Warning!",
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
    item += "/" + "I050"; //점검결과

    getSelectBoxList("TB08036S", item);

    selectBox = getSelectBoxList("TB08036S", "B014", false);
    B014 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "B014";
    });
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
      element.value = "";
      element.focus();
      return;
    }

    // 값이 있고 소수점이 없는 경우 .00 추가
    if (value && !value.includes(".")) {
      value = parseFloat(value).toFixed(2);
    }

    if (!value) {
      value = "";
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

  // 행추가
  function TB08036S_addRow() {
    var newRow = {
      chk: false,
      stdrYm: "",
      busiPrgStep: "",
      estmPrgsRt: "",
      pfmcPrgsRt: "",
    };

    let bbb = $("#TB08036S_gridStepInfo").pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });

    rowIndx = bbb;
  }

  // 행삭제
  function TB08036S_delRow() {
    var gridData = $("#TB08036S_gridStepInfo").pqGrid(
      "option",
      "dataModel.data"
    );
    var rowData;
    var deleteCheckBox;

    for (var i = 0; i < gridData.length; i++) {
      rowData = gridData[i];

      deleteCheckBox = rowData.chk;

      if (deleteCheckBox == true) {
        $("#TB08036S_gridStepInfo").pqGrid("deleteRow", { rowIndx: i });
        i--;
      }
    }
  }

  //기간계산

  function TB08036S_setDatePicker(startId, endId, resultId) {
    $(`#${startId}, #${endId}`).on("blur", function () {
      calculatePeriod(startId, endId, resultId);
    });
    $(`#${startId}, #${endId}`).on("change", function () {
      calculatePeriod(startId, endId, resultId);
    });
  }

  function parseDate(dateString) {
    const parts = dateString.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function calculatePeriod(startDt, endDt, resultPr) {
    const startDateInput = $(`#${startDt}`).val();
    const endDateInput = $(`#${endDt}`).val();
    const resultInput = $(`#${resultPr}`);

    if (startDateInput && endDateInput) {
      // 입력값을 Date 객체로 변환
      const startDate = parseDate(startDateInput);
      const endDate = parseDate(endDateInput);

      if (startDate > endDate) {
        showErrorPopup("공사 시작일이 종료일보다 늦습니다.");
        resultInput.val("-");
        return;
      }
      if (isNaN(startDate) || isNaN(endDate)) {
        return;
      }

      // 날짜 차이 계산
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 개월 및 일 계산
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;

      resultInput.val(`${months}개월 ${days}일`);
    } else {
      resultInput.val("-");
    }
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
          setTabStep(data.listMonthStep);
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
    //resetTabDeal();
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
    // dealInfo.loanBondTakYn 값에 따라 라디오 버튼을 선택
    if (dealInfo.loanBondTakYn === "Y") {
      $(":radio[name='TB08036S_loanBondTakYn'][value='Y']").prop(
        "checked",
        true
      );
    } else if (dealInfo.loanBondTakYn === "N") {
      $(":radio[name='TB08036S_loanBondTakYn'][value='N']").prop(
        "checked",
        true
      );
    }
    // 대출채권양수여부
    $("#TB08036S_I012_1")
      .val(dealInfo.prfbIslfEvl)
      .prop("selected", true)
      .change(); // 사업장자체평가
    if (dealInfo.ipreYn === "Y") {
      $(":radio[name='TB08036S_ipreYn'][value='Y']").prop("checked", true);
    } else if (dealInfo.ipreYn === "N") {
      $(":radio[name='TB08036S_ipreYn'][value='N']").prop("checked", true);
    }
    $("#TB08036S_I012_2").val(dealInfo.clcIntlGrd); // 계산내부등급
    $("#TB08036S_I012_3").val(dealInfo.dcsnIntlGrd); // 확정내부등급
    $("#mgtnRt").val(dealInfo.mgtnRt); // 이주율
    $("#estmPrgsRt").val(dealInfo.estmPrgsRt); // 예상진척율
    $("#pfmcPrgsRt").val(dealInfo.pfmcPrgsRt); // 실적진척율
    $("#TB08036S_B014_01").val(dealInfo.busiPrgStep); // 사업진행단계
    $("#TB08036S_I050").val(dealInfo.checkRslt).prop("selected", true).change(); // 분양수지점검결과
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
  }

  // 월별사업관리 데이터 세팅
  function setTabInspctRmrk(data) {
    resetTabInsptRmrk();
    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    arrPqGridInspctRmrkInfo.setData(data);
    arrPqGridInspctRmrkInfo.option("rowClick", function (event, ui) {
	  pqGridSelectHandler ( ui.rowIndx, "TB08036S_inspctRmrk" );
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
    arrPqGridEtcInfo.option("rowClick", function (event, ui) {
	  pqGridSelectHandler ( ui.rowIndx, "TB08036S_etcList" );
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
    var listMonthStep = [];
    for (var i = 0; i < arrPqGridStepInfo.pdata.length; i++) {
      var listData = {
        dealNo: $("#TB08036S_ibDealNo").val(),
        stdrYm: arrPqGridStepInfo.pdata[i].stdrYm,
        busiPrgStep: arrPqGridStepInfo.pdata[i].busiPrgStep,
        estmPrgsRt: arrPqGridStepInfo.pdata[i].estmPrgsRt,
        pfmcPrgsRt: arrPqGridStepInfo.pdata[i].pfmcPrgsRt,
      };
      listMonthStep.push(listData);
    }

    paramData = {
      dealNo: getInputValue("TB08036S_ibDealNo"), // Deal번호
      unitNum: getInputValue("unitNum"), // 세대수
      crdtRifcIsttCtns: getInputValue("TB08036S_C010"), // 신용보강기관내용
      clcIntlGrd: getInputValue("TB08036S_I012_2"), // 계산내부등급
      prfbIslfEvl: getInputValue("TB08036S_I012_1"), // 사업성자체평가
      inspctYyMm: unformatDate(getInputValue("TB08036S_inspctYyMm")), // 점검기준년월
      slStDt: unformatDate(getInputValue("slStDt")), // 분양시작일
      slEdDt: unformatDate(getInputValue("slEdDt")), // 분양종료일
      slPrd: getInputValue("slPrd"), // 분양기간
      cnstStDt: unformatDate(getInputValue("cnstStDt")), // 공사시작일
      cnstEdDt: unformatDate(getInputValue("cnstEdDt")), // 공사종료일
      cnstPrd: getInputValue("cnstPrd"), // 공사기간
      loanBondTakYn: $("input[name='TB08036S_loanBondTakYn']:checked").val(), // 대출채권양수여부
      ipreYn: $("input[name='TB08036S_ipreYn']:checked").val(), // IPRE여부
      dcsnIntlGrd: getInputValue("TB08036S_I012_3"), // 확정내부등급
      mgtnRt: getInputValue("mgtnRt"), // 이주율
      estmPrgsRt: getInputValue("estmPrgsRt"), // 예상진척율
      pfmcPrgsRt: getInputValue("pfmcPrgsRt"), // 실적진척율
      busiPrgStep: getInputValue("TB08036S_B014_01"), // 사업진행단계
      inspctRmrk: getInputValue("TB08036S_I050"), // 점검결과
      bsnBdSlltBalcCheckOpnn: getInputValue("bsnBdSlltBalcCheckOpnn"), // 영업점분양수지점검의견
      listMonthStep: listMonthStep,
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
          showSwalMessage(
            "success",
            "Success!",
            "분양수지관리정보를 저장하였습니다."
          );
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
    // Deal 번호
    $("#TB08036S_ibDealNo").val("");
    $("#TB08036S_ibDealNm").val("");

    // 점검기준년월
    $("#TB08036S_inspctYyMm").val("");

    // 공사 시작일, 종료일, 기간
    $("#cnstStDt").val("");
    $("#cnstEdDt").val("");
    $("#cnstPrd").val("");

    // 분양 시작일, 종료일, 기간
    $("#slStDt").val("");
    $("#slEdDt").val("");
    $("#slPrd").val("");

    // 사업기본정보
    $("#unitNum").val("0");
    $("#TB08036S_C010").val("");
    $("#TB08036S_I012_1").val("");
    $("#TB08036S_I012_2").val("");
    $("#TB08036S_I012_3").val("");

    // 진행 관리
    $("#TB08036S_B014_01").val("");
    $("#estmPrgsRt").val("0");
    $("#pfmcPrgsRt").val("0");
    $("#mgtnRt").val("0");

    // 분양수입/공사비 점검의견
    $("#TB08036S_I050").val("");
    $("#bsnBdSlltBalcCheckOpnn").val("");

    // 관련문서
    $("#fileKey1").val("");
    $("#fileKey2").val("*");

    // 라디오 버튼의 n번째 옵션을 선택 (예: 1번째)
    $("input[name='TB08036S_loanBondTakYn']").eq(1).prop("checked", true);
    $("input[name='TB08036S_ipreYn']").eq(1).prop("checked", true);

    // 셀렉트 박스의 0번째 옵션 선택
    $("#TB08036S_tab-1 select").each(function () {
      $(this).find("option:eq(0)").prop("selected", true).change();
    });
  }

  //월별 공사 및 분양 현황 리셋
  function resetTabStep() {
    $("#TB08036S_gridStepInfo").pqGrid("option", "dataModel.data", []);
    $("#TB08036S_gridStepInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
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
          showSwalMessage("success", "Success!", "점검결과를 저장하였습니다.");
          getDealInfoTB08036S();
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
          getDealInfoTB08036S();
        },
      }); /* end of ajax*/
    }
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
          showSwalMessage(
            "success",
            "Success!",
            "기타사후관리를 등록하였습니다."
          );
          getDealInfoTB08036S();
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
          getDealInfoTB08036S();
        },
      }); /* end of ajax*/
    }
  }

  //기타사후관리 리셋
  function resetTabEtc() {
    $("#TB08036S_etcList").pqGrid("option", "dataModel.data", []);
    $("#TB08036S_etcList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#inspctDt").val("");
    $("#etcInspctRmrk").val("");
    $("#rmrk").val("");
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
    setInspctRmrkInfoList: setInspctRmrkInfoList,
    setEtcList: setEtcList,
    dealInfoTab_TB08036: dealInfoTab_TB08036,
    TB08036S_getUrlDealInfo: TB08036S_getUrlDealInfo,
    rendorGrid: rendorGrid,
    inspctRmrkTab_TB08036S: inspctRmrkTab_TB08036S,
    etcTab_TB08036S: etcTab_TB08036S,
    formatPerInput: formatPerInput,
    TB08036S_addRow: TB08036S_addRow,
    TB08036S_delRow: TB08036S_delRow,
  };
})();
