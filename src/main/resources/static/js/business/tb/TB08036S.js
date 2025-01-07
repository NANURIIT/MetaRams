const TB08036Sjs = (function () {
  let pqGridObjInfoList;

  $(document).ready(function () {
    loadSelectBoxContents();
    convertDateFormat();
  });

  // 그리드설정
  // function setArrPqGridObj() {
  //   let setArrPqGridObj = [
  //     {
  //       height: 600,
  //       maxHeight: 600,
  //       id: "TB08036S_gridCncCmpnyInfo",
  //       colModel: colList,
  //     },
  //   ];
  // }

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

  function btnResetTB08036S() {
    $("#TB08036S_ibDealNo").val("");
    $("#TB08036S_ibDealNm").val("");
    $("#TB08036S_inspctYyMm").val("");

    clearObject();
  }

  function clearObject() {
    $("#tab-1 input").each(function () {
      $(this).val("");
    });

    $("#tab-1 select").each(function () {
      $(this).find("option:eq(0)").prop("selected", true).change();
    });

    $("#inspctRmrk").val("");
    $("#TB08036S_etcList").html("");
  }

  // 페이지가 로드되면 모든 날짜 입력 필드에 대해 이벤트 핸들러를 설정
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

  // TAB3  테이블 행추가
  function addRow() {
    var html = "";

    html += "<tr>";
    html +=
      '<td><div class="input-group date"><input type="text" class="form-control" id="" placeholder="yyyy-mm-dd" value=""><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>';
    html +=
      '<td><input type="text" class="form-control" id="" style="width: 100%;"></td>';
    html +=
      '<td><input type="text" class="form-control" id="" style="width: 100%;"></td>';
    html += '<td><input type="checkbox" class="form-control" id=""></td>';
    html += "</tr>";

    $("#TB08036S_etcList").append(html);

    dpDate = $(".input-group.date").datepicker({
      format: "yyyy-mm-dd",
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: false,
      autoclose: true,
      language: "ko",
    });
  }

  // TAB3  테이블 행삭제
  function delRow() {}

  function getDealInfoTB08036S() {
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");

      return false;
    }

    var paramData = {
      dealNo: $("#TB08036S_ibDealNo").val(),
      inspctYyMm: replaceAll($("#TB08036S_inspctYyMm").val(), "-", ""),
    };

    $.ajax({
      type: "GET",
      url: "/TB08036S/getDealInfoTB08036S",
      data: paramData,
      dataType: "json",
      success: function (data) {
        if (data && Object.keys(data).length > 0) {
          var dealInfo = data;

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
          $("#loanBondTakYn").radioSelect(dealInfo.loanBondTakYn); // 대출채권양수여부
          $("#TB08036S_I012_1")
            .val(dealInfo.prfbIslfEvl)
            .prop("selected", true)
            .change(); // 사업장자체평가
          $("#ipreYn").radioSelect(dealInfo.ipreYn); // IPRE여부
          $("#clcIntlGrd").val(dealInfo.clcIntlGrd); // 계산내부등급
          $("#dcsnIntlGrd").val(dealInfo.dcsnIntlGrd); // 확장내부등급
          $("#mgtnRt").val(dealInfo.mgtnRt); // 이주율
          $("#estmPrgsRt").val(dealInfo.estmPrgsRt); // 예상진척율
          $("#pfmcPrgsRt").val(dealInfo.pfmcPrgsRt); // 실적진척율
          $("#busiPrgStep").val(dealInfo.busiPrgStep); // 사업진행단계
          $("#inspctRmrk")
            .val(dealInfo.inspctRmrk)
            .prop("selected", true)
            .change(); // 분양수지점검결과
          $("#bsnBdSlltBalcCheckOpnn").val(dealInfo.bsnBdSlltBalcCheckOpnn); // 영업점분양수지점검의견
        } else {
          // 데이터가 없을 경우 경고창 띄우기
          openPopup({
            type: "warning",
            title: "Warning!",
            text: "등록된 사업정보가 없습니다.",
          });
        }
      },
      error: function (xhr, status, error) {
        // 에러 발생 시 콘솔에 출력
        console.error("AJAX 요청 실패:", {
          status: status,
          error: error,
          response: xhr.responseText,
        });
      },
    }); /* end of ajax*/
  }

  function getParamData() {
    // 공통 함수: Input 값 가져오기
    const getInputValue = (id, defaultValue = "") =>
      $(`#${id}`).val() || defaultValue;

    // 공통 함수: 날짜 형식 제거
    const formatDate = (dateStr) => (dateStr ? dateStr.replace(/-/g, "") : "");

    // paramData 생성
    const paramData = {
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
      inspctRmrk: getInputValue("inspctRmrk"), // 점검결과
      bsnBdSlltBalcCheckOpnn: getInputValue("bsnBdSlltBalcCheckOpnn"), // 영업점분양수지점검의견
    };

    return paramData;
  }

  function modifyDealInfoTB08036S() {
    if (isEmpty($("#TB08036S_ibDealNo").val())) {
      showErrorPopup("딜번호를 입력해주세요.");
      return false;
    }

    var paramData = getParamData();

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

  return {
    getDealInfoTB08036S: getDealInfoTB08036S,
    btnResetTB08036S: btnResetTB08036S,
    delRow: delRow,
    addRow: addRow,
    modifyDealInfoTB08036S: modifyDealInfoTB08036S,
    deleteDealInfoTB08036S: deleteDealInfoTB08036S,
  };
})();
