const TB10110Sjs = (function () {
  let userListObj;

  let colModel_TB10110S = [
    {
      title: "사용자구분",
      dataType: "string",
      dataIndx: "usrDcdNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사번",
      dataType: "string",
      dataIndx: "empno",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "직원명",
      dataType: "string",
      dataIndx: "empNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "직책",
      dataType: "string",
      dataIndx: "athCdNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한",
      dataType: "string",
      dataIndx: "athCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "적용시작일",
      dataType: "string",
      dataIndx: "aplyStrtDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function(ui){
        return formatDate(ui.cellData);
      }
    },
    {
      title: "회수(예정)일",
      dataType: "string",
      dataIndx: "aplyEndDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function(ui){
        return formatDate(ui.cellData);
      }
    },
    {
      title: "등록사유",
      dataType: "string",
      dataIndx: "rgstRsn",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록자",
      dataType: "string",
      dataIndx: "rgstEmpNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "최종처리자",
      dataType: "string",
      dataIndx: "hndEmpNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  $(document).ready(function () {
    // Enter key event
    findKeydown();
    // 페이지 로딩 시 권한구분의 <select> 데이터로 RAA94B.RGHT_CD_NM을 가져온다.
    selectAuthCode();

    //그리드 세팅
    setGrid_TB10110S();
  });

  /*******************************************************************
   *** 공통 event
   *******************************************************************/

  /**
   * 그리드 세팅
   */
  function setGrid_TB10110S() {
    var obj_TB10110S = {
      height: 580,
      maxHeight: 790,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colModel_TB10110S,
      strNoRows: "조회된 데이터가 없습니다.",
      cellClick: function (event, ui) {
        var rowData = ui.rowData;

        //alert(JSON.stringify(rowData));
        selectRgthUser(rowData);
      },
    };

    $("#TB10110S_userList").pqGrid(obj_TB10110S);
    userListObj = $("#TB10110S_userList").pqGrid("instance");
  }

  /**
   * 조회 버튼 클릭 이벤트
   */
  var runFindUser = function () {
    let empNm = $("#empNm").val();
    let rghtCd = $("#TB10110S_rghtCd option:selected").val();
    let delYn = $("#TB10110S_delYn:checked").length;
    findUser(empNm, rghtCd, delYn);
  };
  /**
   * 사용자조회 ajax 호출
   * @param {String} empNm 검색어 - 직원명(사번)
   * @param {String} rghtCd <select> 권한구분
   * @param {int} delYn 과거이력포함(1), 미포함(0, default) -> 20241203이후 과거이력포함(Y), 미포함(N, default)으로 바뀜
   */
  var findUser = function (empNm, rghtCd, delYn) {
    let dtoParam = {
      empNm: empNm,
      athCd: rghtCd,
      delYn: delYn,
    };

    $.ajax({
      type: "GET",
      url: "/getUserList",
      data: dtoParam,
      dataType: "json",
      beforeSend: function () {
        userListObj.option("dataModel.data", []);
        userListObj.option("strNoRows", "조회 중입니다...");
        userListObj.refreshDataAndView();
      },
      success: function (data) {
        // var a = '';
        // $('#TB10110S_tbodyUserList').html(a);
        // rebuildUserManageTable(data);
        userListObj.setData(data);
      },
    });
  };

  /**
   * 사용자목록
   * @param {JSON} data Ajax(/getUserList) response 데이터
   */
  function rebuildUserManageTable(data) {
    var rowList = [];

    var userList = data;

    if (userList.length > 0) {
      $.each(userList, function (key, value) {
        var rgstEmpNm = value.rgstEmpNm + " (" + value.rgstEmpno + ")";
        var hndEmpNm = value.hndEmpNm + " (" + value.hndEmpno + ")";

        var newRow = {
          usrDcdNm: value.usrDcdNm,
          empno: value.empno,
          empNm: value.empNm,
          osdtDcd: value.osdtDcd,
          athCdNm: value.athCdNm,
          aplyStrtDt: formatDate(value.aplyStrtDt),
          aplyEndDt: formatDate(value.aplyEndDt),
          rgstRsn: value.rgstRsn,
          rgstEmpNm: rgstEmpNm,
          hndEmpNm: hndEmpNm,
        };

        rowList.push(newRow);
      });

      userListObj.option("dataModel.data", rowList);
      userListObj.refreshDataAndView();
    } else {
      userListObj.option("strNoRows", "조회된 데이터가 없습니다.");
      userListObj.refreshDataAndView();
    }
  }

  /**
   * Enter key event
   */
  var findKeydown = function () {
    $("input[id=empNm]").keydown(function (key) {
      if (key.keyCode == 13) {
        //키가 13이면 실행 (엔터는 13)
        runFindUser();
      }
    });
  };

  /**
   * 권한구분 코드 ajax호출
   */
  var selectAuthCode = function () {
    $.ajax({
      type: "GET",
      url: "/selectAuthCode",
      // data: dtoParam,
      dataType: "json",
      success: function (data) {
        var a = "";
        $("#TB10110S_rghtCd").html(a);
        $("#AC01130P_rghtCd").html(a);
        makeRghtCdList(data);
      },
    });
  };

  /**
   * 권한구분 목록
   * @param {JSON} data Ajax(/selectAuthCode) response 데이터
   * 2023.07.19 정희조 수정 modalHtml 추가
   */
  var makeRghtCdList = function (data) {
    /*  */
    var html = '<div><option value="">전체</option></div>'; // value가 null인 데이터로 조회하면 전체 데이터가 나와야한다.
    var modalHtml; // 사용자 추가 팝업내 권한구분에는 전체 option이 없어야한다.

    $.each(data, function (key, value) {
      html += "<div>";
      html +=
        '    <option value="' +
        value.athCd +
        '">' +
        value.athCdNm +
        " (" +
        value.athCd +
        ")" +
        "</option>";
      html += "</div>";

      modalHtml += "<div>";
      modalHtml +=
        '    <option value="' +
        value.athCd +
        '">' +
        value.athCdNm +
        " (" +
        value.athCd +
        ")" +
        "</option>";
      modalHtml += "</div>";
    });
    $("#TB10110S_rghtCd").html(html);
    $("#AC01130P_rghtCd").html(modalHtml);
  };

  /*******************************************************************
   *** 사용자추가 팝업 event
   *******************************************************************/
  /**
   * [AC01130P] 사용자추가 팝업 오픈
   */
  function openModal() {
    $("#modal-AC01130P").modal("show");
  }

  /**
   * 사용자 조회 (더블 클릭 및 사용자 추가에서 사용)
   * @param {this} rowData 더블 클릭 이벤트가 실행된 그리드 행의 데이터
   */
  function selectRgthUser(rowData) {
    openModal();
    // var sq = $(e).find('input').val();
    // var eno = $(e).find('td:eq(1)').html();

    var eno = rowData.empno;
    selectAuthUser(eno);
  }

  /**
   * 사용자 조회 ajax (더블 클릭 및 사용자 추가에서 사용)
   * @param {String} sq 수정할 권한의 SQ
   * @param {String} eno 수정할 권한의 사원번호
   */
  var selectAuthUser = function (eno) {
    let dtoParam = {
      //"sq": sq
      empno: eno,
    };

    $.ajax({
      url: "/getUserList",
      data: dtoParam,
      success: function (userInfo) {
        addAuth(userInfo);
      },
    });
  };

  /**
   * 사용자 추가 팝업 값 셋팅
   * @param {JSON} userInfo Ajax(/getUserList) response 데이터
   */
  var addAuth = function (userInfo) {
    for (idx in userInfo) {
      var data = userInfo[idx];
      $("#AC01130P_empNo").val(data.empno);
      $("#AC01130P_empNm").val(data.empNm);
      $("#AC01130P_rghtCd").val(data.athCd);
      $("#AC01130P_datepicker1").val(formatDate(data.aplyStrtDt));
      $("#AC01130P_datepicker2").val(formatDate(data.aplyEndDt));
      $("#AC01130P_rgstRsn").val(data.rgstRsn);
      $("#AC01130P_rgstPEno").text(
        data.rgstEmpNm + " (" + data.rgstEmpno + ")"
      );
      $("#AC01130P_rgstDt").text(formatDate(data.rgstDt));
      $("#AC01130P_hndlPEno").text(data.hndEmpNm + " (" + data.hndEmpno + ")");
      $("#AC01130P_hndlDyTm").text(data.hndDetlDtm);
      $("#AC01130P_dltF").val(data.delYn);
      $("#AC01130P_dltPEno").val(data.delEmpno);
    }
  };

  /**
   * 모달 닫은후 이벤트 재조회
   */
  $("#modal-AC01130P").on("hidden.bs.modal", function () {
    runFindUser();
    $("#AC01130P_sq").val("");
    $("#AC01130P_dltPEno").val("");
    $("#AC01130P_dltF").val("");
  });

  return {
    runFindUser: runFindUser,
  };
})();
