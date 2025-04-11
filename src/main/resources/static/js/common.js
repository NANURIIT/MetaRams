/** common **/
"use strict";

/**
 * keydown, onchange 이벤트 생성
 * @author {김건우}
 */
function settingFunction() {
  const url = window.location.pathname;

  setFileUploadEvent(url.split("/")[1]);

  /**
   * 모달 드래그 이벤트
   */
  $(`.modal-header.metis-modal-header:not([data-event])`).on(
    "mousedown",
    function () {
      $(this).attr("data-event", "on");
      // draggable 초기화
      $(".modal-dialog").draggable();

      $(document).on("mouseup.draggableDestroy", function () {
        // draggable 비활성화
        // $(".modal-dialog").draggable("destroy");

        if ($(".modal-dialog").data("ui-draggable")) {
          $(".modal-dialog").draggable("destroy");
        }

        // mouseup 이벤트 해제 (중복 방지)
        $(document).off("mouseup.draggableDestroy");
      });
    }
  );

  // 딜조회
  if (
    $('script[src="js/business/tb/TB03021P.js"]').attr("src") ===
    "js/business/tb/TB03021P.js"
  ) {
    TB03021P_srch(url);
    TB03022P_inModalSrch("TB03021P");
  }
  // 사원조회
  if (
    $('script[src="js/business/tb/TB03022P.js"]').attr("src") ===
    "js/business/tb/TB03022P.js"
  ) {
    TB03022P_srch(url);
  }
  // 기업체조회
  if (
    $('script[src="js/business/tb/TB03061P.js"]').attr("src") ===
    "js/business/tb/TB03061P.js"
  ) {
    TB03061P_srchMtr(url);
  }
  // 안건조회
  if (
    $('script[src="js/business/tb/TB04011P.js"]').attr("src") ===
    "js/business/tb/TB04011P.js"
  ) {
    TB04011P_srchMtr(url);
    TB03022P_inModalSrch("TB04011P");
  }
  // 종목조회
  if (
    $('script[src="js/business/tb/TB06011P.js"]').attr("src") ===
    "js/business/tb/TB06011P.js"
  ) {
    TB06011P_srchPrdt(url);
    TB03022P_inModalSrch("TB06011P");
  }
  // 담보조회
  if (
    $('script[src="js/business/tb/TB06017P.js"]').attr("src") ===
    "js/business/tb/TB06017P.js"
  ) {
    TB06017P_srch(url);
  }
  // 기업체등록
  if (
    $('script[src="js/business/tb/TB06019P.js"]').attr("src") ===
    "js/business/tb/TB06019P.js"
  ) {
    TB03061P_inModalSrchMtr("TB06019P");
  }
  // 은행조회
  if (
    $('script[src="js/business/tb/TB07021P.js"]').attr("src") ===
    "js/business/tb/TB07021P.js"
  ) {
    TB07021P_srchFnlt(url);
  }
  // 펀드조회
  if (
    $('script[src="js/business/tb/TB07022P.js"]').attr("src") ===
    "js/business/tb/TB07022P.js"
  ) {
    TB07022P_srchFnd(url);
  }

  // datepicker 초기화
  $(".input-group.date").datepicker({
    format: "yyyy-mm-dd",
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: false,
    autoclose: true,
    language: "ko",
  });
  $(".input-group.date").find("input").inputmask("9999-99-99");

  $(".input-group.month").datepicker({
    format: "yyyy-mm",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: false,
    autoclose: true,
    language: "ko",
    minViewMode: "months",
    startView: "months",
  });
  $(".input-group.month").find("input").inputmask("9999-99");

  $(".input-group.clockpicker").clockpicker({});
  $(".input-group.clockpicker").find("input").inputmask("99:99");
}

/**
 * 비동기 통신함수
 * @param {string} option.method ajax 전송방식
 * @param {string} option.url ajax 전송위치
 * @param {string} option.data ajax 데이터
 * @param {boolean} option.async 비동기식 처리 여부(default true)
 * @param {boolean} option.errPopShow callback Error 팝업 표출 여부 (default true)
 * @param {function} option.success ajax 전송 성공시 처리
 * @param {function} option.fail ajax 전송 실패시 처리
 */
function ajaxCall(option) {
  if (!optionObjChk(option)) {
    return;
  }

  // 미입력시 default값 세팅
  if (option.errPopShow == undefined || option.errPopShow == null) {
    option.errPopShow = true;
  }
  if (option.method != "GET" && option.method != "get") {
    option.data = JSON.stringify(option.data);
  }

  if (option.async == undefined || option.async == null) {
    option.async = true;
  }

  $.ajax({
    method: option.method,
    url: option.url,
    data: option.data,
    cache: false,
    datatype: "JSON",
    async: option.async,
    contentType: "application/json; charset=UTF-8",
    beforeSend: function (xhr, opt) {
      //openPopup({type:"loding",show:true});
    },
    error: function (request, status, error) {
      ///openPopup({type:"loding",show:false});
      if (option.errPopShow) {
        openPopup({
          type: "error",
          title: "통신 오류",
          text: "오류내역 : " + request.responseJSON.errorTx,
        });
      }
    },
    complete: function () {
      //openPopup({type:"loding",show:false});
    },
  }).then(
    $.type(option.success) === "function" ? option.success : function () {},
    $.type(option.fail) === "function" ? option.fail : function () {}
  );
}

/**
 * 팝업 함수
 * @param {string} option.title 타이틀
 * @param {string} option.text 내용
 * @param {string} option.type 팝업 타입 ['success','warning','error','loding']
 * @param {boolean} option.show 팝업 표출여부 (type loading에서만 사용)
 * @param {function} option.callback 팝업 callback
 */
function openPopup(option) {
  if (!optionObjChk(option)) {
    return;
  }

  let _opt = {
    icon: "success",
    title: option.title,
    text: option.text,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  };

  if (option.type !== null) {
    _opt.icon = option.type; // default success
  }

  if (_opt.type === "success") {
    _opt.confirmButtonText = "확인";
  } else if (_opt.type === "warning") {
    _opt.showCancelButton = true;
    _opt.confirmButtonColor = "#DD6B55";
    _opt.closeOnConfirm = false;
  } else if (_opt.type === "error") {
    _opt.confirmButtonText = "확인";
  }

  if (_opt.type === "success") {
    if (isEmpty(option.callback)) Swal.fire(_opt);
    else {
      Swal.fire(_opt, function () {
        option.callback();
      });
    }
  } else if (_opt.type === "warning") {
    Swal.fire(_opt, function () {
      if (!isEmpty(option.callback)) {
        option.callback();
      }
    });
  } else if (_opt.type === "error") {
    Swal.fire(_opt, function () {
      if (!isEmpty(option.callback)) {
        option.callback();
      }
    });
  } else {
    Swal.fire(_opt);
  }
}

/**
 * 옵션 파라미터 체크
 * @param {object} option object 값
 * @return {boolean} 옵션 object 여부 확인
 */
function optionObjChk(option) {
  if (typeof option == "undefined" || typeof option != "object") {
    openPopup({
      type: "error",
      title: "인자값 오류",
      text: "option 값이 올바르지 않습니다.",
    });
    return false;
  }
  return true;
}

/**
 * 공백 제거
 * @param {string} str 공백제거 필요한 string
 * @returns {string} 공백제거 후 string
 */
function removeWhiteSpace(str) {
  if (str.length > 0) return str.replace(/\s*/g, "");
  return "";
}

/**
 * 빈값 체크
 * @param {T} value 빈값체크 필요한 <T> 아무타입이나
 * @returns {boolean} 빈값 여부
 */
function isEmpty(value) {
  //20250110 case 스페이스바 trim 추가
  if (value != null) {
    value = value.toString().trim();
  }
  //----------

  if (
    value == "" ||
    value == null ||
    value == "null" ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  }

  return false;
}

function isNotEmpty(value) {
  return !isEmpty(value);
}

function isExist(value) {
  return !isEmpty(value);
}

/**
 * 콤마 찍기
 * @param {string or number} value 콤마찍기 필요한 <string or number> 값
 * @returns {string} 세자리 ,값 표시된 콤마 String
 */
function commaStr(value) {
  if (typeof value != "string" && typeof value == "number") {
    value += ""; // 숫자 문자로 치환
  }

  let regx = new RegExp(/(-?\d+)(\d{3})/);
  let bExists = value.indexOf(".", 0);
  let strArr = value.split(".");

  while (regx.test(strArr[0])) {
    strArr[0] = strArr[0].replace(regx, "$1,$2");
  }

  if (bExists > -1) {
    value = strArr[0] + "." + strArr[1];
  } else {
    value = strArr[0];
  }

  return value;
}

/**
 * 콤마 찍기(live)
 * @param {string or number} value 콤마찍기 필요한 <string or number> 값
 * @returns {string} 세자리 ,값 표시된 콤마 String
 */
// function comma(str) {
// 	str = String(str);
// 	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
// }

/* 소수점 . 뒤에는 , 붙지 않게끔 */
function comma(str) {
  if (!str) {
    return "0";
  }

  str = String(str);

  // 정수 부분과 소수 부분을 분리
  let parts = str.split(".");

  // 정수 부분에 콤마 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 소수 부분이 있는 경우 다시 합쳐서 반환
  return parts.join(".");
}

function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d.]+/g, "");
}

/**
 *  셀렉터로 선택
 *  ex) selectorNumberFormater($('#TB07080S_dealExcAmt'));
 *  @param { $(selector) }
 * 	@description
 *  document든 어디든 세팅해놓으면 됨
 * 	숫자허용 자리 12자리, 소수점 1개만 허용
 * 	!!경고메시지 필요
 * 	@author {김건우}
 */
function selectorNumberFormater(selector) {

  selector.on("keypress", function (e) {
    const char = String.fromCharCode(e.which);

    // 정규표현식: 한글 또는 영어일 경우
    if (/[a-zA-Z]/.test(char)) {
      e.preventDefault(); // 입력 막기
    }
  });

  let deleteType;
  selector.on("keydown", function (event) {
    if (event.keyCode === 8) {
      deleteType = 8; // 백스페이스
    } else if (event.keyCode === 46) {
      deleteType = 46; // 딜리트
    }
  });

  selector.on("input", function (event) {
    const $this = $(this);
    let str = $this.val();
    // 마지막에 입력된 문자의 인덱스 찾기
    let cursorIndex = $this.prop("selectionEnd");

    //  마지막에 입력한 데이터 빼기
    let chk = str.split(".");
    if (chk[0].length === 20 && str.slice(-1) === "9") {
      return $this.val(str.slice(0, str.length - 1));
    } else if (chk[0].length > 21) {
      str = str.slice(0, cursorIndex - 1) + str.slice(cursorIndex); // 해당 문자 제거
      $this.val(str);
      $this.prop("selectionEnd", cursorIndex - 1).focus();
    } else if (chk.length > 2) {
      str = str.slice(0, cursorIndex - 1) + str.slice(cursorIndex); // 해당 문자 제거
      $this.val(str);
      $this.prop("selectionEnd", cursorIndex - 1).focus();
    }

    //  예전길이
    const prevStrLength = str.length;
    const prevCommaCheck = str.split(",");

    //  지금길이
    str = locale(removeComma(str));
    const nextStrLength = str.length;
    const nextCommaCheck = str.split(",");

    cursorIndex = $this.prop("selectionEnd") + (nextStrLength - prevStrLength);

    if (cursorIndex < 0) {
      cursorIndex = 0;
    }

    if (deleteType === 8 && prevCommaCheck.length < nextCommaCheck.length) {
      str = str.slice(0, cursorIndex - 2) + str.slice(cursorIndex - 1);
      str = locale(removeComma(str));
      $this.val(str);
      if (prevCommaCheck[0].length === 1) {
        $this.prop("selectionEnd", cursorIndex - 3).focus();
      } else if (prevCommaCheck[0].length === 4) {
        $this.prop("selectionEnd", cursorIndex - 2).focus();
      } else {
        $this.prop("selectionEnd", cursorIndex - 1).focus();
      }
    } else if (
      deleteType === 46 &&
      prevCommaCheck.length < nextCommaCheck.length
    ) {
      str = str.slice(0, cursorIndex) + str.slice(cursorIndex + 1);
      str = locale(removeComma(str));
      $this.val(str);
      if (prevCommaCheck[0].length === 1) {
        $this.prop("selectionEnd", cursorIndex - 2).focus();
      } else if (prevCommaCheck[0].length === 4) {
        $this.prop("selectionEnd", cursorIndex - 1).focus();
      } else {
        $this.prop("selectionEnd", cursorIndex).focus();
      }
    } else {
      str = locale(removeComma(str));
      $this.val(str);
      $this.prop("selectionEnd", cursorIndex).focus();
    }

    deleteType = 0;
  });

  selector.attr("max-length", 20);

  selector.val(0);
}

/**
 * text box의 byte 체크
 * @param {} element // 텍스트박스(ex. this)
 * @param {*} maxLength // 제한할 바이트 수
 */
function checkByteLimit(element, maxLength) {
  let text = element.value;
  let byteLength = 0;

  // 바이트 길이 계산 (한글 2바이트, 영문 1바이트)
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let charByte = charCode > 127 ? 2 : 1; // 한글은 2바이트, 영문은 1바이트
    if (byteLength + charByte > maxLength) {
      element.value = text.slice(0, i); // 초과한 부분은 잘라냄
      break;
    }
    byteLength += charByte;
  }
}

/**
 * 길이제한 함수
 * @param { Object } setData 
 * @param { String } menuId
 * @author { 김건우 }
 * @description
 * ex)
 * const obj = {
 *  name: length
 * }
 */
function limitInputLength ( setData, menuId ) {

  const keys = Object.keys(setData);

  for (let i = 0; i < keys.length; i++) {

    let id = keys[i];

    if ( id.indexOf('_') !== -1 ) {
      id = toCamelCase(id);
    }

    let prevVal;

    $(`#${menuId}_${id}`).on('keydown', function (e) {
      prevVal = $(this).val()
    })

    $(`#${menuId}_${id}`).on('input', function () {
      const byte = new TextEncoder().encode($(this).val()).length
      if ( byte > setData[keys[i]] ) {
        $(this).val(prevVal);
      }
    })

  }
}

/**
 *  태그에 직접 코딩
 *  ex) <input class... id... name...   *oninput='inputNumberFormater(this)'*></input>
 *  @param {this}
 * 	@description
 *  html 태그의 this만 부르면 됨
 * 	숫자허용 자리 12자리, 소수점 1개만 허용
 * 	!!경고메시지 필요
 * 	@author {김건우}
 */
function inputNumberFormater(target) {
  const $this = $(target);

  let str = $this.val();
  // 마지막에 입력된 문자의 인덱스 찾기
  let cursorIndex = $this.prop("selectionEnd");

  //  마지막에 입력한 데이터 빼기
  let chk = str.split(".");
  if (chk[0].length > 21) {
    str = str.slice(0, cursorIndex - 1) + str.slice(cursorIndex); // 해당 문자 제거
    $this.val(str);
    $this.prop("selectionEnd", cursorIndex - 1).focus();
  } else if (chk.length > 2) {
    str = str.slice(0, cursorIndex - 1) + str.slice(cursorIndex); // 해당 문자 제거
    $this.val(str);
    $this.prop("selectionEnd", cursorIndex - 1).focus();
  }

  //  예전길이
  const prevStrLength = str.length;

  //  지금길이
  str = locale(removeComma(str));
  const nextStrLength = str.length;

  cursorIndex = $this.prop("selectionEnd") + (nextStrLength - prevStrLength);

  if (cursorIndex < 0) {
    cursorIndex = 0;
  }

  $this.val(str);
  $this.prop("selectionEnd", cursorIndex).focus();
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}

function addComma(value) {
  return value
    .toString()
    .replace(
      /(\..*)$|(\d)(?=(\d{3})+(?!\d))/g,
      (digit, fract) => fract || digit + ","
    );
}

function inputNumberFormat2(obj) {
  obj.value = addComma(uncomma(obj.value));
}

function inputOnlyNumberFormat(obj) {
  obj.value = onlynumber(uncomma(obj.value));
}

function onlynumber(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1");
}

/*
 *  콤마붙이기
 */
function locale(data) {
  if (!data) {
    return "0";
  }
  // 숫자 or 문자가 숫자로 변환 가능한지 확인합니다.
  let number = Number(data);

  // 숫자로 변환할 수 없는 경우 원래 문자를 반환합니다.
  if (isNaN(number)) {
    return data;
  }

  let dataString = String(data);

  // 소수점 이하 자리를 보존하기 위해 문자열로 변환
  let parts = dataString.split(".");

  // 세 자리마다 콤마를 찍은 문자열로 변환
  parts[0] = Number(parts[0]).toLocaleString();

  // 소수점 이하 부분이 존재하면 다시 합치기
  return parts.join(".");
}

/*
 *  콤마떼기
 */
function removeComma(data) {
  if (!data) {
    return "0";
  }

  if (typeof data === "string") {
    return data.replace(/,/g, "");
  }

  return data;
}

/**
 * input type="text" max
 * @param {tag} tag input value
 * @param {Nubmer} max max number
 */
function maxStr(tag, max) {
  let nVal = Number(tag.value);
  if (!isNaN(nVal) && nVal > max) {
    return (tag.value = String(max));
  }
}

/**
 * 좌측문자열 채우기
 * @param {string} str 원 문자열
 * @param {number} padLen 최대 채우고자 하는 길이
 * @param {string} padStr 채우고자하는 문자(char)
 * @returns {string} 채워진 문자열
 */
function lpadStr(str, padLen, padStr) {
  if (padStr.length > padLen) {
    return str;
  }
  str += ""; // 문자로
  padStr += ""; // 문자로
  while (str.length < padLen) {
    str = padStr + str;
  }
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
}

/**
 * 전화번호 문자 (-포맷)
 * @param {string} str 원 문자열
 * @returns {string} 포맷된 문자열
 */
function formatPhoneNo(str) {
  if (str == undefined || str == null) {
    str = "";
  }

  var number = str.replace(/[^0-9]/g, "");
  var phone = "";

  if (number.length < 9) {
    return number;
  } else if (number.length < 10) {
    phone += number.substr(0, 2);
    phone += "-";
    phone += number.substr(2, 3);
    phone += "-";
    phone += number.substr(5);
  } else if (number.length < 11) {
    phone += number.substr(0, 3);
    phone += "-";
    phone += number.substr(3, 3);
    phone += "-";
    phone += number.substr(6);
  } else {
    phone += number.substr(0, 3);
    phone += "-";
    phone += number.substr(3, 4);
    phone += "-";
    phone += number.substr(7);
  }

  return phone;
}

/**
 * 날짜 포맷 변경 (-포맷)
 * @param {string} str 원 문자열 (YYYYMMDD)
 * @returns {string} 포맷된 문자열 (YYYY-MM-DD)
 */
function formatDate(datetmp) {
  if (isNotEmpty(datetmp)) {
    var year = datetmp.substr(0, 4); // 연도 추출
    var month = datetmp.substr(4, 2); // 월 추출
    var day = datetmp.length > 6 ? datetmp.substr(6, 2) : ""; // 일자 추출 (길이가 6 초과일 경우)

    if (day) {
      return [year, month, day].join("-"); // 년-월-일
    } else {
      return [year, month].join("-"); // 년-월
    }
  } else {
    return datetmp; // 비어 있는 경우 그대로 반환
  }
}

/**
 * 날짜 포맷 변경 ('-', '/' 제거)
 * @param {string} 포맷된 문자열 (YYYY-MM-DD)
 * @returns {string} str 원 문자열 (YYYYMMDD)
 */
function unformatDate(datetmp) {
  if (isNotEmpty(datetmp)) {
    return datetmp.replaceAll(/[-/]/g, "");
  } else {
    return datetmp;
  }
}

/**
 * null 이면 기존 데이터 or Comma
 * @param {string} p +comma or null
 * @returns
 */
function commaNull(p) {
  return p ? comma(p) : "0";
}

/**
 * null 이면 기존 데이터 or dateFormat
 * @param {*} p +formatDate or null
 * @returns
 */
function dateNull(p) {
  return p ? formatDate(p) : p;
}

/**
 * 날짜 포맷 변경 prototype
 * @param {string} f DateFomat형태
 * @returns {string} DateFomat포맷 된 데이터
 */
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  let weekKorName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  let weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
  let weekEngName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let d = this;

  return f.replace(
    /(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi,
    function ($1) {
      switch ($1) {
        case "yyyy":
          return d.getFullYear(); // 년 (4자리)
        case "yy":
          return lpadStr(d.getFullYear() % 1000, 2, "0"); // 년 (2자리)
        case "MM":
          return lpadStr(d.getMonth() + 1, 2, "0"); // 월 (2자리)
        case "dd":
          return lpadStr(d.getDate(), 2, "0"); // 일 (2자리)
        case "KS":
          return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
        case "KL":
          return weekKorName[d.getDay()]; // 요일 (긴 한글)
        case "ES":
          return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
        case "EL":
          return weekEngName[d.getDay()]; // 요일 (긴 영어)
        case "HH":
          return lpadStr(d.getHours(), 2, "0"); // 시간 (24시간 기준, 2자리)
        case "hh":
          return lpadStr((h = d.getHours() % 12) ? h : 12, 2, "0"); // 시간 (12시간 기준, 2자리)
        case "mm":
          return lpadStr(d.getMinutes(), 2, "0"); // 분 (2자리)
        case "ss":
          return lpadStr(d.getSeconds(), 2, "0"); // 초 (2자리)
        case "a/p":
          return d.getHours() < 12 ? "am" : "pm"; // 오전/오후 구분
        default:
          return $1;
      }
    }
  );
};

/**
 * 오늘날짜 취득 함수
 * @returns {string} format yyyy-MM-dd 0채움(2023-02-02)
 */
function getToday() {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  return dateString;
}

/**
 * 오늘날짜 취득 함수2
 * @returns {string} format yyyyMMdd 20240101
 */
function getToday2() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

/**
 * n일 전 취득 함수
 * @returns {string} format yyyy-MM-dd 0채움(2023-02-02)
 */
function getSomeDaysAgo(n) {
  var today = new Date();
  today.setDate(today.getDate() - n);

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  return dateString;
}

/**
  개월수 더하기, 빼기
  @param   {String} date			'yyyy-mm-dd' / 'yyyymmdd'
  @param   {int}    addedMonth
  @returns {String} 				'yyyy-mm-dd' / 'yyyymmdd'
  @throws  null
 */
function addMonth(date, addedMonth) {
  var regExp8 = RegExp(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/);
  var regExp10 = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

  var year = "";
  var month = "";
  var day = "";
  var format = null;

  if (regExp8.test(date)) {
    year = Number(date.substring(0, 4));
    month = Number(date.substring(4, 6)) - 1;
    day = Number(date.substring(6, 8));
  } else if (regExp10.test(date)) {
    year = Number(date.substring(0, 4));
    month = Number(date.substring(5, 7)) - 1;
    day = Number(date.substring(8, 10));
  } else {
    return format;
  }

  // month달 후의 1일
  let addMonthFirstDate = new Date(year, month + addedMonth, 1);

  // month달 후의 말일
  let addMonthLastDate = new Date(
    addMonthFirstDate.getFullYear(),
    addMonthFirstDate.getMonth() + 1,
    0
  );

  let result = addMonthFirstDate;
  if (day > addMonthLastDate.getDate()) {
    result.setDate(addMonthLastDate.getDate());
  } else {
    result.setDate(day);
  }

  if (regExp8.test(date)) {
    format =
      result.getFullYear() +
      ("00" + (result.getMonth() + 1).toString()).slice(-2) +
      ("00" + result.getDate().toString()).slice(-2);
  } else if (regExp10.test(date)) {
    format =
      result.getFullYear() +
      "-" +
      ("00" + (result.getMonth() + 1).toString()).slice(-2) +
      "-" +
      ("00" + result.getDate().toString()).slice(-2);
  }

  return format;
}

/**
 * 엑셀파일 추출
 */
function exportExcel(fileName) {
  var wb = XLSX.utils.table_to_book(
    document.getElementById("excelExportTable"),
    { sheet: "sheet 1", raw: true }
  );

  XLSX.writeFile(wb, fileName);
}

/**
 * datepicker 유효성검증 함수
 * 날짜 자리수 검증 4,2,2
 * 공백 체크
 * null값 체크
 */
function isEmptyDatePicker(param) {
  var dateRegexp = /\d{4}-\d{2}-\d{2}/;
  if (!dateRegexp.test(param) && $.isEmptyObject(param)) {
    return false;
  } else if (dateRegexp.test(param) && !$.isEmptyObject(param)) {
    return true;
  }
}

/**
 * 자식 엘리먼트 일괄 활성/비활성
 * @param {string}   sel 일괄 비활성할 엘리먼트의 선택자(id, class)
 * @param {boolean}  opt 활성: true/비활성 : false
 * @description sel ex) ".abc" or "#abc"
 * @author 김현준
 */
function groupEnableControl(sel, opt) {
  $(sel).find("*").attr("disabled", !opt);
}

/**
 *
 * @param {null}
 * @returns week [이번주날짜]
 * var a = selectThisWeek();
 */
function selectThisWeek() {
  var dfltDay = new Date();
  var dfltYear = dfltDay.getFullYear();
  var dfltMonth = dfltDay.getMonth();
  var dfltDate = dfltDay.getDate();

  var week = [];
  for (var i = 0; i < 7; i++) {
    var resultDay = new Date(
      dfltYear,
      dfltMonth,
      dfltDate + (i - dfltDay.getDay())
    );
    var year = resultDay.getFullYear();
    var month = Number(resultDay.getMonth()) + 1;
    var day = resultDay.getDate();

    month = String(month).length === 1 ? "0" + month : month;
    day = String(day).length === 1 ? "0" + day : day;

    week[i] = year + "" + month + day;
  }

  return week;
}
/**
 * Date 일수 구하기 = 종료일자 - 시작일자 + 1 ( 시작일자 포함 )
 * @param {date} strDt 시작일자
 * @param {date} endDt 종료일자
 * @return {int} totalDays 일수
 */
function dateDiff(strDt, endDt) {
  // console.log(strDt);
  // console.log(endDt);
  let startDate;
  let endDate;
  if (
    typeof strDt === "undefined" ||
    strDt === null ||
    typeof endDt === "undefined" ||
    endDt === null
  ) {
    return;
  } else {
    startDate = strDt.includes("-")
      ? new Date(strDt)
      : new Date(formatDate(strDt));
    endDate = endDt.includes("-")
      ? new Date(endDt)
      : new Date(formatDate(endDt));
  }

  // 시간 부분을 0으로 설정합니다.
  const startDateOnly = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateOnly = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  // console.log(startDateOnly);
  // console.log(endDateOnly);
  // 두 날짜 간의 차이를 밀리초 단위로 계산합니다.
  const timeDifference = endDateOnly - startDateOnly;

  // 밀리초를 일 단위로 변환합니다. (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dayDifference = timeDifference / millisecondsPerDay;
  // console.log(dayDifference);

  // 시작일자를 포함하기 위해 결과에 1을 더합니다.
  const totalDays = dayDifference + 1;
  // console.log(totalDays);
  return totalDays;
}

/**
 * String 개월수 구하기 = (연도 차이 * 12) + 월 차이
 * @param {String} strDt 시작일자 yyyyMMdd
 * @param {String} endDt 종료일자 yyyyMMdd
 * @return {int} totalMonths 개월수
 */
function monthDiff(strtDt, endDt) {
  var start = new Date(strtDt.substring(0, 4), strtDt.substring(4, 6) - 1);
  var end = new Date(endDt.substring(0, 4), endDt.substring(4, 6) - 1);

  var yearDiff = end.getFullYear() - start.getFullYear();
  var monthDiff = end.getMonth() - start.getMonth();

  return yearDiff * 12 + monthDiff;
}

/**
 * 데이터 null 처리
 * @param {string}
 * @returns {string}
 * @author 권도은
 */

function handleNullData(value) {
  var newValue;

  if (
    value == null ||
    value == "null" ||
    value == "" ||
    value == undefined ||
    value == "undefined"
  ) {
    newValue = "";
  } else {
    newValue = value;
  }
  return newValue;
}

// 주민등록번호, 법인등록번호, 사업자등록번호 정규식 변경
function checkBrnAcno(value) {
  value = String(value);

  if (value.length == 13) {
    var regExp = /[0-9]{13}$/;
    if (regExp.test(value)) {
      value = value.substr(0, 6) + "-" + value.substring(6);
    }
  } else if (value.length == 10) {
    var regExp = /[0-9]{10}$/;
    if (regExp.test(value)) {
      value =
        value.substr(0, 3) +
        "-" +
        value.substr(3, 2) +
        "-" +
        value.substr(5, 5);
    }
  }

  return value;
}

/**
 * To Do List 항목 추가
 * @param {string} empno 담당자사번(필수)
 * @param {string} workDcd 작업구분코드(필수)
 * @param {string} workCtns 작업설명(필수)
 * @param {string} menuId 메뉴ID(필수)
 * @param {string} rmrk 메뉴별조회KEY(옵션)
 * @param {string} entpNm 업체명(옵션)}
 * @return {number} 응답코드( 1 : 성공, 2 : ajax 요청실패, 3 : 파라미터 오류 )
 * @description makeToDoLiST('220001', '01', '(결재) Deal기본정보관리', '/TB03020S', 'ibDealNo=DMG100000112', '크레디피아제이십오차유동화전문회사')
 * @author 김현준
 */
function makeToDoList(empno, workDcd, workCtns, menuId, rmrk, entpNm) {
  var returnCode = "";

  if (isEmpty(empno)) {
    returnCode = "3";
  }
  if (isEmpty(workDcd)) {
    returnCode = "3";
  }
  if (isEmpty(workCtns)) {
    returnCode = "3";
  }
  if (isEmpty(menuId)) {
    returnCode = "3";
  }

  if (returnCode === "3") {
    return 3;
  }

  var paramData = {
    empno: empno,
    workDcd: workDcd,
    workCtns: workCtns,
    menuId: menuId,
  };

  if (!isEmpty(rmrk)) {
    paramData.rmrk = rmrk;
  }

  if (!isEmpty(entpNm)) {
    paramData.entpNm = entpNm;
  }

  // 비동기통신 요청
  $.ajax({
    type: "POST",
    url: "/makeToDoList",
    data: paramData,
    dataType: "json",
    success: function () {
      returnCode = 1;
    },
    error: function () {
      returnCode = 2;
    },
  });

  return returnCode;
}

/**
   SelectBox 코드조회 및 html 맵핑
   @param {String} prefix	화면명
   @param {String} item		셀렉트박스리스트 ex) 'I075/C056/I081'
   @param {boolean} async   동기, 비동기
   @description <select class="form-control" id="TB06010S_I075">
        </select>
      	
        같은코드 셀렉트박스가 2개면 afterSelectBoxLoaded 에서 result 사용하여 추가 할 것
      	
        동기 처리 필요 시, 3번째 파라미터로 false 추가 prefix, item, async
 */
function getSelectBoxList(prefix, item, async = true) {
  var codeList = {
    codeList: item,
  };

  var result = null;

  $.ajax({
    type: "GET",
    url: "/getSelectBoxList",
    data: codeList,
    async: async,
    dataType: "json",
    success: function (data) {
      result = data;

      if (result.length > 0) {
        $.each(result, function (key, value) {
          //일부데이터만 셀렉트박스에 출력할 경우
          if (prefix === "TB05010S" || prefix === "TB05030S") {
            if (value.cdValue === "0") return;
          }
          if (
            (prefix === "TB04020S" || prefix === "TB04030S") &&
            value.cmnsGrpCd == "I011"
          ) {
            if (parseInt(value.cdValue) < 200 || parseInt(value.cdValue) >= 300)
              return;
          }
          var html = "";
          html +=
            '<option value="' +
            value.cdValue +
            '">' +
            value.cdName +
            " (" +
            value.cdValue +
            ")" +
            "</option>";

          $("#" + prefix + "_" + value.cmnsGrpCd).append(html);
        });
      }

      afterSelectBoxLoaded(prefix);
    },
  });

  function afterSelectBoxLoaded(prefix) {
    if (result.length > 0) {
      $.each(result, function (key, value) {
        // sample
        if (prefix == "sample") {
          // do what you want
        }

        if (prefix == "TB04010S") {
          if (value.cmnsGrpCd == "I027") {
            // 통화코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB04010S_I027_2").append(html);
            $("#TB04010S_I027_3").append(html);
          } else if (value.cmnsGrpCd == "R005") {
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB04010S_R005_2").append(html);
          } else if (value.cmnsGrpCd == "I029") {
            TB04010Sjs.ldvdCd.push(value);
          } else if (value.cmnsGrpCd == "I030") {
            TB04010Sjs.mdvdCd.push(value);
          } else if (value.cmnsGrpCd == "I031") {
            TB04010Sjs.sdvdCd.push(value);
          }
        }

        if (prefix == "TB06010S") {
          if (value.cmnsGrpCd == "E022") {
            TB06010Sjs.ldvdCd.push(value);
          } else if (value.cmnsGrpCd == "E023") {
            TB06010Sjs.mdvdCd.push(value);
          } else if (value.cmnsGrpCd == "P004") {
            TB06010Sjs.sdvdCd.push(value);
          } else if (value.cmnsGrpCd == "I027") {
            // 통화코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB06010S_I027").append(html);
            $("#TB06010S_I027_2").append(html);
          }
        }

        if (prefix == "TB06020S") {
          if (value.cmnsGrpCd == "E022") {
            TB06020Sjs.ldvdCd.push(value);
          } else if (value.cmnsGrpCd == "E023") {
            TB06020Sjs.mdvdCd.push(value);
          } else if (value.cmnsGrpCd == "P004") {
            TB06020Sjs.sdvdCd.push(value);
          }
        }

        if (prefix == "TB06030S") {
          if (value.cmnsGrpCd == "E022") {
            TB06030Sjs.ldvdCd.push(value);
          } else if (value.cmnsGrpCd == "E023") {
            TB06030Sjs.mdvdCd.push(value);
          } else if (value.cmnsGrpCd == "P004") {
            TB06030Sjs.sdvdCd.push(value);
          }
        }

        if (prefix == "TB04013P") {
          if (value.cmnsGrpCd == "R005") {
            // 통화코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB04013P_R005_2").append(html);
          }
        }

        if (prefix == "TB04050S") {
          if (value.cmnsGrpCd == "I027") {
            // 통화코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB04050S_I027_1").append(html);
            $("#TB04050S_I027_2").append(html);
          }
        }

        if (prefix == "TB06013P") {
          if (value.cmnsGrpCd == "I027") {
            // 통화코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB06013P_I027_2").append(html);
            $("#TB06013P_I027_3").append(html);
            $("#TB06013P_I027_4").append(html);
          }
        }

        if (prefix == "TB08031S") {
          if (value.cmnsGrpCd == "I051") {
            // 대주단정보, 수익자정보 구분코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB08031S_I051_1").append(html);
            $("#TB08031S_I051_2").append(html);
          }

          if (value.cmnsGrpCd == "T002") {
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            // $("#TB08031S_T002").append(html);
            $("#TB08031S_T002_2").append(html);
          }
        }

        if (prefix == "TB05010S") {
          if (value.cmnsGrpCd == "R016") {
            if (value.cdValue == "0") return;
            // 전결협의체
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB05010S_R016_2").append(html);
          }
        }

        if (prefix == "TB08010S") {
          if (value.cmnsGrpCd == "E029") {
            // 재산종류구분코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB08010S_E029_2").append(html);
          }
        }

        if (prefix == "TB07060S") {
          if (value.cmnsGrpCd == "I027") {
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB07060S_I027_1").append(html);
            $("#TB07060S_I027_2").append(html);
          }

          if (value.cmnsGrpCd == "L001") {
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB07060S_L001_1").append(html);
            $("#TB07060S_L001_2").append(html);
          }
        }

        if (prefix == "TB08036S") {
          if (value.cmnsGrpCd == "I012") {
            // 신용등급구분코드
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB08036S_I012_1").append(html);
            $("#TB08036S_I012_2").append(html);
            $("#TB08036S_I012_3").append(html);
          }

          if (value.cmnsGrpCd == "B014") {
            // 사업진행단계
            var html = "";
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")" +
              "</option>";

            $("#TB08036S_B014_01").append(html);
            $("#TB08036S_B014_02").append(html);
          }
        }

        if (prefix == "TB07040S") {
          if (value.cmnsGrpCd == "P012") {
            if (value.cdValue == "82" || value.cdValue == "83") {
              var html = "";
              html +=
                '<option value="' +
                value.cdValue +
                '">' +
                value.cdName +
                "</option>";
            }

            $("#TB07040S_ibPrdtTrDcd").append(html);
          }
        }

        if (prefix == "TB07150S") {
          if (value.cmnsGrpCd == "R023") {
            if (value.cdValue != "01" && value.cdValue != "07") {
              var html = "";
              html +=
                '<option value="' +
                value.cdValue +
                '">' +
                value.cdName +
                " (" +
                value.cdValue +
                ")" +
                "</option>";
            }

            $("#TB07150S_R023_1").append(html);
          }
        }
      }); // end of each

      // excuted once process below

      setKRKRW(prefix);

      if (prefix.startsWith("TB060")) {
        $("#TB06013P_E028 option:eq(0)").prop("selected", true).change();
      }
    }
  }
  return result;
}

/*
  SelectBox 코드조회 및 html 맵핑 (단건)
  @param {String} prefix	화면명
  @param {String} item	셀렉트박스코드 ex) I011
  @param {boolean} async  동기, 비동기
 */
function getSelectBoxCode2(prefix, item, async = true) {
  var code = item;
  var result = null;
  $.ajax({
    type: "GET",
    url: "/getSelectBoxCode2/" + item,
    data: code,
    async: async,
    dataType: "json",
    success: function (data) {
      result = data;
      if (result.length > 0) {
        $.each(result, function (key, value) {
          var html = "";
          html +=
            '<option value="' +
            value.cdValue +
            '">' +
            value.cdName +
            " (" +
            value.cdValue +
            ")" +
            "</option>";
          $("#" + prefix + "_" + value.cmnsGrpCd).append(html);
        });
      }
    },
  });
  return result;
}

function setKRKRW(prefix) {
  $("#" + prefix + '_C006 option[value="KR"]').prop("selected", true); // 국가코드
  $("#" + prefix + '_I027 option[value="KRW"]').prop("selected", true); // 통화코드

  if (prefix == "TB04010S") {
    $('#TB04010S_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
    $('#TB04010S_I027_3 option[value="KRW"]').prop("selected", true); // 통화코드
  }

  if (prefix == "TB04050S") {
    $('#TB04050S_I027_1 option[value="KRW"]').prop("selected", true); // 통화코드
    $('#TB04050S_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
  }

  if (prefix == "TB06010S") {
    $('#TB06010S_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
  }

  if (prefix == "TB06020S") {
    $('#TB06020S_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
  }

  if (prefix == "TB06030S") {
    $('#TB06030S_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
  }

  if (prefix == "TB06013P") {
    $('#TB06013P_I027_2 option[value="KRW"]').prop("selected", true); // 통화코드
    $('#TB06013P_I027_3 option[value="KRW"]').prop("selected", true); // 통화코드
    $('#TB06013P_I027_4 option[value="KRW"]').prop("selected", true); // 통화코드
  }
}

/**
  라디오버튼 셀렉트 공통
  USEAGE : $(":radio[name='objectName']").radioSelect(radioVal);
 */
$.fn.radioSelect = function (val) {
  this.each(function () {
    var $this = $(this);
    if ($this.val() == val) $this.prop("checked", true).change();
  });
  return this;
};

/*
 *공통 함수
 */
// 적용환율 소수점 4자리만 입력
function restrictDecimalDigits(input, maxDecimalDigits) {
  var value = input.value;
  var decimalIndex = value.indexOf(".");

  if (
    decimalIndex !== -1 &&
    value.length - decimalIndex > maxDecimalDigits + 1
  ) {
    // 소수점 이하 자릿수가 제한을 초과한 경우 절삭
    var roundedValue = value.substring(0, decimalIndex + maxDecimalDigits + 1);
    input.value = roundedValue;
  }
}

// replaceAll 널체크 버전
function replaceAll(param, from, to) {
  if (isNotEmpty(param)) {
    return param.replaceAll(from, to);
  } else {
    return null;
  }
}

/**
 * input, select 초기화
 * @param {String} p 화면명
 * @param {list} arr 그리드ID
 */
function resetAll(p, arr = []) {
  let allInputs = $(`input[id^="${p}"]`);
  let allSelects = $(`select[id^="${p}"]`);

  let _reset = allInputs.attr("value");
  //console.log(_reset);
  if (_reset === 0) {
    console.log(this);
    _reset.val(0);
  } else {
    // input
    allInputs.val("");
  }

  // select
  allSelects.each(function () {
    if (this.id.startsWith(p) && this.id.endsWith("_I027")) {
      // console.log(this.id);
      $(this).val("KRW"); // select 요소의 값을 'KRW'로 설정
    } else {
      $(this).prop("selectedIndex", 0); // 다른 select 요소는 기본값으로 설정
    }
  });

  // console.log(arr);
  // grid 초기화
  arr.forEach((gridName) => {
    // gridName 문자열을 통해 객체 접근
    // if (window[gridName] && typeof window[gridName].setData === 'function') {
    // 	console.log(typeof window[gridName].setData);
    // 	console.log(window[gridName]);

    //     window[gridName].setData([]);
    // }
    $("#" + gridName)
      .pqGrid("instance")
      .setData([]);
  });
}

/**
 * PQ Grid working...
 * @param {Array, objects} pqGridObjs
 * @returns
 */
function setPqGrid(pqGridObjs) {
  pqGridObjs.forEach((pqGridObj) => {
    // basic
    let height = pqGridObj.height; // 높이
    let maxHeight = pqGridObj.maxHeight; // 최대높이
    let colModel = pqGridObj.colModel; // 컬럼
    let id = pqGridObj.id; // 테이블ID
    // add
    let sclMd = pqGridObj.scrollModel || { autoFit: true }, // autoFit
      numCl = pqGridObj.numberCell || { show: false }, // numberCell ex:::{ show: false, width: 40, resizable: true, title: "" }
      showTt = pqGridObj.showTitle || false, // showTitle
      showTb = pqGridObj.showToolbar || false, // showToolbar
      cllSv = pqGridObj.cellSave || function (event, ui) {}, // cellSave
      edit = pqGridObj.editable || false,
      tlbar = pqGridObj.toolbar || {},
      rowClick = pqGridObj.rowClick || function (event, ui) {},
      selMd = pqGridObj.selectionModel || {}, // { type: 'row' }
      cellbs = pqGridObj.cellBeforeSave || function (event, ui) {},
      cellClick = pqGridObj.cellClick || function (event, ui) {},
      rowSelect = pqGridObj.rowSelect || function (event, ui) {},
      rowDblClick = pqGridObj.rowDblClick || function (event, ui) {};

    let strNoRows = "데이터가 없습니다."; // 최초 생성 시 body msg

    var obj = {
      height: height,
      maxHeight: maxHeight,
      showTitle: showTt,
      showToolbar: showTb,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: numCl,
      editable: edit,
      scrollModel: sclMd,
      selectionModel: selMd,
      rowSpanHead: true,
      columnTemplate: { align: "center", hvalign: "center" },
      colModel: colModel,
      strNoRows: strNoRows,
      cellSave: cllSv,
      toolbar: tlbar,
      rowClick: rowClick,
      cellBeforeSave: cellbs,
      cellClick: cellClick,
      rowSelect: rowSelect,
      rowDblClick: rowDblClick,
      // clipboard: { on: true }, // 클립보드 복사 활성화
      // selectionModel: { type: "cell" } // 셀 선택 활성화
      // selectionModel: { type: 'cell' }, // 셀 단위 선택 활성화
      // pageModel   : page
      // dataModel: { data: data },
    };

    $("#" + id).pqGrid(obj);
    //$("#" + id).pqGrid('instance');
  });
}

/**
 * PQ Grid 조회한 데이터 세팅
 * @param {objects} options.gridNm  그리드ID
 * @param {objects} options.data    조회한 데이터
 * @returns
 */
function pqGridSetData(options) {
  var isExist = false;

  for (var i = 0; i < options.length; i++) {
    var gridNm = options[i].gridNm; // 그리드ID
    var data = options[i].data;

    if (data.length < 1) {
      $("#" + gridNm).pqGrid(
        "option",
        "strNoRows",
        "조회된 데이터가 없습니다."
      );
      $("#" + gridNm).pqGrid("setData", []);
    } else {
      isExist = true;
      $("#" + gridNm).pqGrid("setData", data);
    }
  }

  if (!isExist) {
    var option = {};
    option.title = "Error";
    option.type = "error";

    option.text = "조회된 데이터가 없습니다.";
    openPopup(option);
  }
}

/**
 * input number maxlength 주기
 * @param {obj}
 * @sample <input type="number" oninput="numberCheckMaxLength(this)" maxlength="4"/>
 */
function numberCheckMaxLength(obj) {
  if (obj.value.length > obj.maxLength) {
    obj.value = obj.value.slice(0, obj.maxLength);
  }
}

//------------------------------------------------------------------신규 날짜 구하기
// $('#fromDate').val(newAddMonth(new Date(getToday()), -1));

// 1자리면 0 붙이기
function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}
// 윤년인지여부
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
// 해당년월의 말일 구하기
function getLastDate(year, month) {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
}
// 월 더하기
function newAddMonth(d, n) {
  var date = d.getDate();
  d.setDate(1); // 1일로 설정
  d.setMonth(d.getMonth() + n); // 개월수 더하기
  //d.setDate(d.getDate() - 1);
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(Math.min(date, getLastDate(d.getYear(), d.getMonth())))
  );
}

/*************************************************************************
 * common ui js						                                     *
 *************************************************************************/

// 초기화
// 페이지 로드 시, 입력 요소의 초기 값
function getBasicValues(id) {
  // console.log(id);

  let initialValues = {};
  let $input = $(`input[id^="${id}"]`);
  // console.log( $input);

  if ($input.length > 0) {
    $input.each(function () {
      const $this = $(this);
      // console.log($this.attr('id'));
      initialValues[$this.attr("id")] = $this.val();
      // console.log(initialValues);
    });
    return initialValues;
  } else {
    return;
  }
}

/**
 * 인풋박스 초기화
 * @param {$selector} selector 제이쿼리던 자바스크립트던 상관없음
 * div ibox로 잡혀있을텐데 원하는 태그에 id값을 주고 셀렉터로 받아서 인풋값 초기화
 * @author {김건우}
 */
function resetInputValue(selector) {
  const $selectInput = selector.find(`select`);
  $selectInput.each(function () {
    $(this).val($($(this).find("option")[0]).val());
  });
  selector.find(`select[id*="Yn"]`).val("N");
  selector
    .find(`input[type="radio"][name*="Yn"][value="N"]`)
    .prop("checked", true);
  selector.find(`input[type="text"]`).val("");
  selector.find(`textarea`).val("");
  selector
    .find(
      `input[id$='Amt']
				       , input[id$='Blce']
				       , input[id$='Mnum']
				       , input[id$='Tmrd']
				       , input[id$='Qnt']
				       , input[id$='Shqt']
				       , input[id$='Unpr']
				       , input[id$='Rt']`
    )
    .val("0");
  selector.find(`input[id$='Exrt']`).val("1.0");

  selector.find(`input[id$='Dt']`).val(getToday());
  let after1M = () => {
    let today = new Date();
    today.setMonth(today.getMonth() + 1); // 한 달 뒤로 설정
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0"); // 0부터 시작하므로 +1
    let day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  selector.find(`input[id$='EndDt']`).val(after1M);

  if (selector.attr("data-menuid")) {
    setKRKRW(selector.attr("data-menuid").split("/")[1]);
  }
}

/**
 * pqgrid instance 데이터 인풋박스에 뿌리기
 * 사용처
 * pqgrid dblClick 이벤트
 * pqgrid rowClick 이벤트
 * @param ui	pqgrid ui 요소
 * @param { String } menuId
 * @author {김건우}
 */
function setInputboxFromPdata(ui, menuId) {
  const keys = Object.keys(ui.rowData);
  for (let i = 0; i < keys.length; i++) {
    $(`#${menuId}_${keys[i]}`).val(ui.rowData[keys[i]]);
  }
}

/**
 * 단건 select data뿌리기
 * @param data	ajax 셀렉트 데이터
 * @param {String} tagId
 * @author {김건우}
 */
function setInputDataFromSelectData(data, tagId) {
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    // 날짜 포맷
    if (keys[i].includes("Dt")) {
      $(`#${tagId}_${keys[i]}`).val(formatDate(data[keys[i]]));
    }
    // 숫자 포맷
    else if (
      //	조건 시작
      keys[i].includes("Amt") ||
      keys[i].includes("Blce") ||
      keys[i].includes("Exrt") ||
      keys[i].includes("Mnum") ||
      keys[i].includes("Tmrd")
      //	조건 끝
    ) {
      $(`#${tagId}_${keys[i]}`).val(comma(data[keys[i]]));
    }
    // 나머지
    else {
      $(`#${tagId}_${keys[i]}`).val(data[keys[i]]);
    }
  }
}

/**
 * @param {String} menuId  화면명
 * @param {Object} gridFunctionObj	함수를담은 오브젝트
 * @author {김건우}
 */
function ramsTabHandler(menuId) {
  // 화면 공통 탭들 선택
  const $tabs = $(`#${menuId}_ramsTab li`);
  // 각 탭에 이벤트 부여
  $tabs.each(function (i) {
    if (i == 0) {
      $(this).find("a").addClass("active");
      $(`.tab-content div[id="${menuId}_tab-${i + 1}"]`).addClass("active");
    }
    // 이벤트 겹치지않도록 마우스 업 이벤트로 처리
    $(this).on("mouseup", function (e) {
      if (e.which === 1) {
        $tabs.find("a").removeClass("active");
        $(this).find("a").addClass("active");
        $(`.tab-content div[id*="${menuId}_tab"]`).removeClass("active");
        $(`.tab-content div[id="${menuId}_tab-${i + 1}"]`).addClass("active");
      } else {
        return;
      }
    });
  });
}

// function setGridFromRamstab () {
// 	$('.tab-content div[role="tabpanel"]').addClass('active');
// }

/**
 * 날짜 인풋태그 유효성체크
 */
function vldDateVal() {
  $('.input-group.date input[class="form-control"]').on("change", function () {
    //	태그의 날짜 불러오기
    const date = $(this).val();
    let test = new Date(formatDate(date));
    let resultDate;

    if (test === "InvalidDate") {
      return $(this).val(0);
    } else {
      //	날짜 변환
      resultDate = formatDate(date);

      // 변환된 날짜 입력
      $(this).val(resultDate);
      return;
    }
  });
}

/**
 * 마지막에 부른 모달 최상위 index로 올리기
 * @param {String} prefix 화면명
 * @author {김건우}
 */
function indexChangeHandler(prefix) {
  $(`div[id*="modal-"][style*="block"]`).attr("style", "display: block;");
  $(`#modal-${prefix}`).attr(
    "style",
    "z-index: 4000 !important; display: block;"
  );
  // $(`div[id*="modal-"]`).css("z-index", "");
  // setTimeout(() => {
  //   $(`#modal-${prefix}`).css("z-index", "4000 !important");
  // }, 300)
}

/**
 * PQGRID 줄추가
 * @param {selector} colModelSelector	// 쿼리 셀렉터 아이디
 * @author {김건우}
 */
function pqGridAddNewRow(colModelSelector) {
  let row = [];
  let newRow = {};
  const data = colModelSelector.pqGrid("instance");
  const rowColumnsData = data.colModel;
  const length = rowColumnsData.length;
  for (let i = 0; i < length; i++) {
    const title = rowColumnsData[i].title;
    row.push(title);
  }

  console.log(newRow);

  colModelSelector.pqGrid("addRow", {
    rowData: newRow,
    checkEditable: false,
  });
}

/**
 * PQGRID 줄삭제
 * @param {selector} colModelSelector
 * @param {ui.rowIndx} rowIndx
 * @param {String} mode {로우인덱스를 사용하고싶은경우 'select' 입력 }
 * @author {김건우}
 */
function pqGridDeleteRow(colModelSelector, rowIndx, mode) {
  console.log(rowIndx + "행삭제");

  let idx = rowIndx;

  if (mode === "select") {
    if (!rowIndx && rowIndx != 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "삭제할 행을 선택해주세요!",
      });
    } else {
      colModelSelector.pqGrid("deleteRow", {
        rowIndx: idx,
      });
    }
  } else {
    idx = colModelSelector.pqGrid("instance").pdata.length - 1;
    colModelSelector.pqGrid("deleteRow", {
      rowIndx: idx,
    });
  }
}

/**
 * 화면 이동시 작동해야하는 함수
 * ramsLayout.js -> moveTab 참고
 *
 *
 * @description
 * 필요한 것 적어놓으세요!!
 * ※ 함수명도 멋있는걸로 바꿔주세요... ※ (중요)
 */
function needRunFn(menuId) {
  // TB04010S 심사신청관리
  if (menuId === "TB04010S") {
    // 딜정보조회!!!!!
    TB04010Sjs.getUrlDealInfo();
  }
  // TB05040S 협의체 현황 및 결과조회
  else if (menuId === "TB05040S") {
    TB05040Sjs.getUrlDealInfo();
  }
  // 예시
  else if (menuId === "??") {
    console.log("Hello Nanuri!!");
  }

  //워크플로우에서 버튼 눌러 페이지 이동시 인풋 자동 세팅

  if (menuId === "TB06010S") {
    // TB06010Sjs.loginUserSet();
    TB06010Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB06020S") {
    TB06020Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB06030S") {
    TB06030Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB06040S") {
    TB06040Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07010S") {
    TB07010Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07020S") {
    TB07020Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07030S") {
    TB07030Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07040S") {
    TB07040Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07070S") {
    TB07070Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07080S") {
    TB07080Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07090S") {
    TB07090Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07120S") {
    TB07120Sjs.getDealInfoFromWF();
  }

  if (menuId === "TB07150S") {
    TB07150Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07160S") {
    TB07160Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07170S") {
    TB07170Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB07190S") {
    TB07190Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB08040S") {
    TB08040Sjs.getDealInfoFromWF();
  }
  if (menuId === "TB08050S") {
    TB08050Sjs.getDealInfoFromWF();
  }
}

/**
 * 화면내 모든 PG Grid 초기화
 * @param {String} menuid
 * @author {김건우}
 */
function resetPGgrids(menuid) {
  if (
    $(`div[data-menuId='/${menuid}'] div[class*='pq-grid'][role='grid']`)
      .length != 0
  ) {
    $(`div[data-menuId='/${menuid}'] div[class*='pq-grid'][role='grid']`).each(
      function () {
        $("#" + $(this).attr("id"))
          .pqGrid("instance")
          .setData([]);
      }
    );
  }
}

function autoSrchFromPQGrid(pqGridId, url, paramData) {}

/**
 * 결재단계확인
 * @param {String} menuId 메뉴아이디입니다.
 * @author {김건우}
 * @discription
 * 실행시키시면 됩니다.
 */
function chkDecdStep(menuId) {
  let chrrNo = $(`#${menuId}_empNo`).val();
  let dealNo = $(`#${menuId}_ibDealNo`).val() || ""; // 딜번호
  let prdtCd = $(`#${menuId}_prdtCd`).val() || ""; // 상품코드
  let decdJobDcd = menuId; // 결재업무구분코드
  let scrnNo = menuId; // 화면번호
  let excSeq = $(`#${menuId}_excSeq`).val() || 0; // 실행순번
  let rqstSq = $(`#${menuId}_rqstSq`).val() || 0; // 신청순번
  let trSeq = $(`#${menuId}_trSeq`).val() || 0; // 거래순번

  let paramData = {
    dealNo: dealNo,
    prdtCd: prdtCd,
    decdJobDcd: decdJobDcd,
    scrnNo: scrnNo,
    excSeq: excSeq,
    rqstSq: rqstSq,
    trSeq: trSeq,
  };

  /**
   * 결재담당자인지 체크해보자
   */
  $.ajax({
    type: "POST",
    url: `/chkDecdStep`,
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify(paramData),
    dataType: "json",
    success: function (data) {
      /**
       * 결재요청이 없거나, 결재테이블에 데이터가 존재하지만 결재진행중이 아니다!!
       * 1. 반려가 되었거나 승인요청취소를 했다.
       * 2. 승인요청자, 담당자 입장에서는 종목수정, 종목취소가 가능하다!
       * 3. 결재자 입장에서는 결재, 반려가 불가능하다!
       */
      if (data === -1 || data === 0) {
        /**
         * 담당자일 경우
         * 1. 결재요청버튼 활성화.
         * 2. 종목등록, 취소 활성화.
         */
        if (chrrNo === $("#userEno").val()) {
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06081P"]`
          ).prop("hidden", false);
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`
          ).prop("hidden", true);
          // 결재진행중이 아니기에 종목등록, 삭제 가능
          $(`#${menuId}_regPrdt`).prop("disabled", false);
          $(`#${menuId}_delPrdt`).prop("disabled", false);
        } else {
          /**
           * 승인자일 경우
           * 1. 현재 결재진행중이 아니고 담당자가 아니기 때문에 모든버튼 비활성화
           */
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06081P"]`
          ).prop("hidden", true);
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`
          ).prop("hidden", true);
          // 담당자가 아니면 종목등록, 수정 불가능
          $(`#${menuId}_regPrdt`).prop("disabled", true);
          $(`#${menuId}_delPrdt`).prop("disabled", true);
        }
      } else {
        /**
         * 결재진행중이다!
         * 1. 현재 로그인한 사람이 승인자인지 결재자인지 확인해보자
         */
        /**
         * 담당자일 경우
         * 1. 결재요청버튼 활성화. ( 재승인요청, 승인요청취소 )
         * 2. 종목등록, 취소 "비"활성화.
         */
        if (chrrNo === $("#userEno").val()) {
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06081P"]`
          ).prop("hidden", false);
          $(
            `div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`
          ).prop("hidden", true);
          // 결재진행중이 아니기에 종목등록, 삭제 가능
          $(`#${menuId}_regPrdt`).prop("disabled", true);
          $(`#${menuId}_delPrdt`).prop("disabled", true);
        } else {
          /**
           * 승인자일 경우
           * 1. 현재 진행중인 결재의 순번을 확인하자.
           */
          $.ajax({
            type: "POST",
            url: `/chkDcfcEno`,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
            success: function (data) {
              // 승인요청중이면 결재, 반려버튼 활성화
              if (data.toString() === "1") {
                $(
                  `div[data-menuid="/${menuId}"] button[onclick*="callTB06081P"]`
                ).prop("hidden", true);
                $(
                  `div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`
                ).prop("hidden", false);
                $(`#${menuId}_regPrdt`).prop("disabled", true);
                $(`#${menuId}_delPrdt`).prop("disabled", true);
              }
              // 현재 이 담당자 순서가 아니거나, 담당자가 아닌듯하다
              else {
                $(
                  `div[data-menuid="/${menuId}"] button[onclick*="callTB06081P"]`
                ).prop("hidden", true);
                $(
                  `div[data-menuid="/${menuId}"] button[onclick*="callTB06082P"]`
                ).prop("hidden", true);
                $(`#${menuId}_regPrdt`).prop("disabled", false);
                $(`#${menuId}_delPrdt`).prop("disabled", false);
              }
            },
          });
        }
      }
    },
    error: function (request, status, error) {
      console.log(request, status, error);
    },
  });
}

function autoSrchFromPQGrid(pqGridId, url, paramData) {}

/**
 * 컴포넌트포커스
 * @param {String} 컴포넌트Id.
 * @discription
 * 컴포넌트에 포커스를 위치한다
 * ex) idFocus('TB06040S_ctrtDt');
 */
function idFocus(id) {
  $("#" + id).focus();
}

/**
 * 컴포넌트클리어
 * @param {String} 컴포넌트Id.
 * @discription
 * 컴포넌트의 값을 초기화한다
 * ex) idClear('TB06040S_ctrtDt');
 */
function idClear(id) {
  $("#" + id).val("");
}

/**
 *
 * @param { String } status
 * @param { Number } dataLength
 * @param { String } code 특정화면 or 구분코드
 */
function showToast(status, dataLength, code) {
  // 성공적인 조회시
  if (status === "success") {
    // 코드가 존재하면 코드에 맞는 텍스트 출력
    if (code) {
    }
    // 코드가 없을시 기본 텍스트
    else {
      $("#toast-text-aria").html(
        `✅ ${dataLength}건의 데이터가 조회되었습니다!`
      );
    }
  }
  //
  else if (status === "warning") {
  }
  // 에러시
  else if (status === "error") {
  }

  // 토스트 ON
  $("#toastPlacement").css({
    bottom: "30px",
    opacity: "1",
  });

  // 2초뒤 제거
  setTimeout(() => {
    $("#toastPlacement").css({
      bottom: "-50px",
      opacity: "0",
    });
  }, 3000);
}

/**
 * 기간검색 유효성 검사
 * @param { String }  id1     // 시작일자 컴포넌트
 * @param { String }  id2     // 종료일자 컴포넌트
 * @param { boolean } pattern // default true
 */
function chkValFromToDt(id1, id2, pattern = true) {
  var idFromDate = "#" + id1;
  var idToDate = "#" + id2;
  var fromDate = "";
  var toDate = "";

  $(idFromDate).change(function () {
    fromDate = $(idFromDate).val();
    toDate = $(idToDate).val();
    chkValFromToDtVal(fromDate, toDate, pattern);
  });

  $(idToDate).change(function () {
    fromDate = $(idFromDate).val();
    toDate = $(idToDate).val();
    chkValFromToDtVal(fromDate, toDate, pattern);
  });
}

/**
 * 기간검색 유효성 검사 내용
 * @param { String }  idFromDate // 시작일자 컴포넌트
 * @param { String }  idToDate   // 종료일자 컴포넌트
 * @param { boolean } pattern    // default true
 */
function chkValFromToDtVal(fromDate, toDate, pattern = true) {
  // 유효성 검사용 날짜패턴
  var regExpYmd = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  var regExpYm = /(^\d{4})-(0[1-9]|1[0-2])$/;
  var regExp = "";
  var msgError = "";

  if (pattern) {
    regExp = regExpYmd;
  } else {
    regExp = regExpYm;
  }

  if (isEmpty(fromDate)) {
    msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
    alertPopup();
  } else if (!regExp.test(fromDate)) {
    msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
    alertPopup();
  } else if (isEmpty(toDate)) {
    msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
    alertPopup();
  } else if (!regExp.test(toDate)) {
    msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
    alertPopup();
  } else if (fromDate > toDate) {
    msgError = "조회시작일자가 조회종료일자보다 큽니다.";
    alertPopup();
  }

  function alertPopup() {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: msgError,
      confirmButtonText: "확인",
    });
  }
}

/**
 * 환율 포맷 함수
 * @param { String } selector ex) "#TB07020S_trdeExrt, ..."
 * @author 김건우
 */
function maskExrt(selector) {
  Inputmask({
    regex: "^[0-9]{0,3}(\\.[0-9]{0,4})?$",
  }).mask(selector);

  $(selector).val("1.0");
}

/**
 * 비율, 금리, 이자율 등등.. 포맷 함수
 * @param { String } selector ex) "#TB06010S_addIntrt, ..."
 * @author 김건우
 */
function maskRt(selector) {
  Inputmask({
    regex: "^[0-9]{0,3}(\\.[0-9]{0,2})?$",
  }).mask(selector);

  $(selector).val("0");
}


/**
 * 카멜케이스(Caeml-Case) 변환
 * @param { String } str 
 * @author 김건우
 */
function toCamelCase(str) {
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}