const TB08036Sjs = (function () {
  let arrPqGridObjInfoInfo; //월별 공사 및 분양 현황
  let arrPqGridInspctRmrkInfo; //월별 사업 관리의견
  let arrPqGridEctInfo; // 기타사후관리

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
    let colCncCmpnyInfoList = [
      {
        title: "기준년월",
        dataType: "string",
        dataIndx: "기준년월",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업진행단계",
        dataType: "string",
        dataIndx: "사업진행단계",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "예상진척율",
        dataType: "string",
        dataIndx: "예상진척율",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "실적진척율",
        dataType: "string",
        dataIndx: "실적진척율",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 기타사후관리
    let colEtcList = [
      {
        title: "점검일자",
        dataType: "string",
        dataIndx: "dealNo",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "점검결과",
        dataType: "string",
        dataIndx: "dealNo",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "비고",
        dataType: "string",
        dataIndx: "dealNo",
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
        dataIndx: "dealNo",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "점검결과",
        dataType: "string",
        dataIndx: "dealNo",
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
        id: "TB08036S_gridCncCmpnyInfo",
        colModel: colCncCmpnyInfoList,
      },
      //월별사업관리의견
      {
        height: 150,
        maxHeight: 150,
        id: "TB08036S_inspctRmrk",
        colModel: colInspctRmrkList,
      },
      //기타사후관리
      {
        height: 150,
        maxHeight: 150,
        id: "TB08036S_etcList",
        colModel: colEtcList,
      },
    ];

    setPqGrid(arrPqGridObj);

    arrPqGridObjInfoInfo = $("#TB08036S_gridCncCmpnyInfo").pqGrid("instance"); // 월별 공사 및 분양 관리
    arrPqGridInspctRmrkInfo = $("#TB08036S_inspctRmrk").pqGrid("instance"); //월별사업관리의견
    arrPqGridEctInfo = $("#TB08036S_etcList").pqGrid("instance"); //기타사후관리
  }

  // 에러메시지
  function showErrorPopup(message) {
    openPopup({
      type: "error",
      title: "Error!",
      text: message,
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

  // 초기화버튼
  function btnResetTB08036S() {
    $("#TB08036S_ibDealNo").val("");
    $("#TB08036S_ibDealNm").val("");
    $("#TB08036S_inspctYyMm").val("");

    clearObject();
  }

  function clearObject() {
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
    $("#TB08036S_etcList").html("");
  }

  // 자동조회
  function TB08036S_getUrlDealInfo() {
    let dealNo = sessionStorage.getItem("dealNo");
    let dealNm = sessionStorage.getItem("dealNm");
    //var mtrDcd			= sessionStorage.getItem("mtrDcd");
    //var jdgmDcd			= sessionStorage.getItem("jdgmDcd");
    //var mtrPrgSttsDcd	= sessionStorage.getItem("mtrPrgSttsDcd");

    if (isNotEmpty(dealNo)) {
      $("#TB04010S_ibDealNo").val(dealNo);
      $("#TB04010S_ibDealNm").val(dealNm);

      getDealInfoTB08036S();
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

  // 사후관리 데이터 세팅
  function getDealInfoTB08036S() {
    const dealNo = $("#TB08036S_ibDealNo").val();
    const inspctYyMm = replaceAll($("#TB08036S_inspctYyMm").val(), "-", "");

    // 딜번호 입력 여부 확인
    if (isEmpty(dealNo)) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    const paramData = { dealNo, inspctYyMm };

    $.ajax({
      type: "GET",
      url: "/TB08036S/getDealInfoTB08036S",
      data: paramData,
      dataType: "json",
      success: function (data) {
        if (data && Object.keys(data).length > 0) {
          populateDealInfo(data);
        } else {
          showErrorPopup("등록된 사업정보가 없습니다.");
        }
      },
      error: function () {
        showErrorPopup("등록된 사업정보가 없습니다.");
      },
    });
  }

  // 데이터를 화면에 바인딩하는 함수
  function populateDealInfo(dealInfo) {
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
    $("#TB08036S_B014").val(dealInfo.busiPrgStep); // 사업진행단계
    $("#inspctRmrk").val(dealInfo.inspctRmrk).prop("selected", true).change(); // 분양수지점검결과
    $("#bsnBdSlltBalcCheckOpnn").val(dealInfo.bsnBdSlltBalcCheckOpnn); // 영업점분양수지점검의견
  }

  function getParamData(type) {
    // 공통 함수: Input 값 가져오기
    const getInputValue = (id, defaultValue = "") =>
      $(`#${id}`).val() || defaultValue;

    // 공통 함수: 날짜 형식 제거
    const formatDate = (dateStr) => (dateStr ? dateStr.replace(/-/g, "") : "");

    let paramData = {};

    // paramData 생성
    if (type === "deal") {
      paramData = {
        dealNo: getInputValue("TB08036S_ibDealNo"), // Deal번호
        unitNum: getInputValue("unitNum"), // 세대수
        crdtRifcIsttCtns: getInputValue("TB08036S_C010"), // 신용보강기관내용
        clcIntlGrd: getInputValue("TB08036S_I012_2"), // 계산내부등급
        prfbIslfEvl: getInputValue("TB08036S_I012_1"), // 사업성자체평가
        loanBondTakYn: $("input[name='loanBondTakYn']:checked").val(), // 대출채권양수여부
        inspctYyMm: formatDate(getInputValue("TB08036S_inspctYyMm")), // 점검기준년월
        slStDt: formatDate(getInputValue("slStDt")), // 분양시작일
        slEdDt: formatDate(getInputValue("slEdDt")), // 분양종료일
        slPrd: getInputValue("slPrd"), // 분양기간
        cnstStDt: formatDate(getInputValue("cnstStDt")), // 공사시작일
        cnstEdDt: formatDate(getInputValue("cnstEdDt")), // 공사종료일
        cnstPrd: getInputValue("cnstPrd"), // 공사기간
        ipreYn: $("input[name='ipreYn']:checked").val(), // IPRE여부
        dcsnIntlGrd: getInputValue("TB08036S_I012_3"), // 확정내부등급
        mgtnRt: getInputValue("mgtnRt"), // 이주율
        estmPrgsRt: getInputValue("estmPrgsRt"), // 예상진척율
        pfmcPrgsRt: getInputValue("pfmcPrgsRt"), // 실적진척율
        busiPrgStep: getInputValue("TB08036S_B014"), // 사업진행단계
        inspctRmrk: getInputValue("checkRslt"), // 점검결과
        bsnBdSlltBalcCheckOpnn: getInputValue("bsnBdSlltBalcCheckOpnn"), // 영업점분양수지점검의견
      };
    } else if (type === "etc") {
      paramData = {
        dealNo: getInputValue("TB08036S_ibDealNo"), // Deal번호
        inspctDt: formatDate(getInputValue("inspctDt")), //기준년월
        inspctRmrk: getInputValue("etcInspctRmrk"), //점결결과
        Rmrk: getInputValue("Rmrk"), // 비고
      };
    }

    return paramData;
  }
  // 분양수지관리 저장
  function modifyDealInfoTB08036S() {
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    var paramData = getParamData("deal");

    $.ajax({
      type: "POST",
      url: "/TB08036S/modifyDealInfoTB08036S",
      data: JSON.stringify(paramData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "정보를 저장하였습니다.",
          confirmButtonText: "확인",
        });
      },
      error: function () {},
    }); /* end of ajax*/
  }

  // 분양수지관리 저장
  function modifyEtcInfoTB08036S() {
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    var paramData = getParamData("etc");
    console.log("확인해보자: ", paramData);

    $.ajax({
      type: "POST",
      url: "/TB08036S/insertIBIMS603B",
      data: JSON.stringify(paramData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "정보를 저장하였습니다.",
          confirmButtonText: "확인",
        });
      },
    }); /* end of ajax*/
  }

  function deleteDealInfoTB08036S() {
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");

      return false;
    }

    Swal.fire({
      title: "정보를 삭제 하시겠습니까?",
      //text: "대출이 실행됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      // isConfirmed
      // isDenied
      // isDismissed
      if (result.isConfirmed) {
        businessFunction();
      } else if (result.isDismissed) {
      }
    });

    function businessFunction() {
      var paramData = getParamData();

      $.ajax({
        type: "POST",
        url: "/TB08036S/deleteDealInfoTB08036S",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then(() => {
            getDealInfoTB08036S();
          });
        },
      }); /* end of ajax*/
    }
  }

  function setCncCmpnyInfoList() {
    setTimeout(() => arrPqGridObjInfoInfo.refresh(), 1);
  }
  function setInspctRmrkInfoList() {
    setTimeout(() => arrPqGridInspctRmrkInfo.refresh(), 1);
  }
  function setEctList() {
    setTimeout(() => arrPqGridEctInfo.refresh(), 1);
  }

  return {
    getDealInfoTB08036S: getDealInfoTB08036S,
    btnResetTB08036S: btnResetTB08036S,
    setCncCmpnyInfoList: setCncCmpnyInfoList,
    setInspctRmrkInfoList: setInspctRmrkInfoList,
    setEctList: setEctList,
    modifyDealInfoTB08036S: modifyDealInfoTB08036S,
    deleteDealInfoTB08036S: deleteDealInfoTB08036S,
    modifyEtcInfoTB08036S: modifyEtcInfoTB08036S,
    TB08036S_getUrlDealInfo: TB08036S_getUrlDealInfo,
    rendorGrid: rendorGrid,
  };
})();
