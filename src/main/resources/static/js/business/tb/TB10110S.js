const TB10110Sjs = (function () {
  let userListObj;

  let colModel_TB10110S = [
    {
      title: "사용자구분",
      dataType: "string",
      dataIndx: "usrDcdNm",
      align: "left",
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
      align: "left",
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
      align: "left",
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
    fnSelectBox();
    // Enter key event
    findKeydown();
    // 페이지 로딩 시 권한구분의 <select> 데이터로 RAA94B.RGHT_CD_NM을 가져온다.
    selectAuthCode();

    //그리드 세팅
    setGrid_TB10110S();

    $('#TB10110S_srchForm').find('input, select').on('input', function () {
      resetPGgrids('TB10110S');
    })
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
      /*cellClick: function (event, ui) {
        var rowData = ui.rowData;

        //alert(JSON.stringify(rowData));
        selectRgthUser(rowData);
      },*/
    };

    $("#TB10110S_userList").pqGrid(obj_TB10110S);
    userListObj = $("#TB10110S_userList").pqGrid("instance");
  }

  /**
   * 조회 버튼 클릭 이벤트
   */
  var runFindUser = function () {
    let empNo = $("#TB10110S_empNo").val();
    let dprtCd = $("#TB10110S_dprtCd").val();
    let athCd = $("#TB10110S_athCd option:selected").val();
    let delYn = $("#TB10110S_delYn").is(":checked") ? "1" : "0";
    findUser(empNo, dprtCd, athCd, delYn);
  };
  /**
   * 사용자조회 ajax 호출
   * @param {String} empNm 검색어 - 직원명(사번)
   * @param {String} dprtCd 검색어 - 직원명(사번)
   * @param {String} athCd <select> 권한구분
   * @param {int} delYn 과거이력포함(1), 미포함(0, default) -> 20241203이후 과거이력포함(Y), 미포함(N, default)으로 바뀜
   */
  var findUser = function (empNo, dprtCd, athCd, delYn) {
    let dtoParam = {
      empno: empNo,
      dprtCd: dprtCd,
      athCd: athCd,
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
		userListObj.option("rowClick", function (event, ui) {
		  pqGridSelectHandler ( ui.rowIndx, "TB10110S_userList" );
		    callTB10111P('TB10110S');
			var rowData = ui.rowData;
    		selectRgthUser(rowData);
        });
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
        $("#TB10110S_athCd").html(a);
        $("#TB10111P_rghtCd").html(a);
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
    $("#TB10110S_athCd").html(html);
    $("#TB10111P_rghtCd").html(modalHtml);
  };

  /*******************************************************************
   *** 사용자추가 팝업 event
   *******************************************************************/
  /**
   * [TB10111P] 사용자추가 팝업 오픈
   */
  function openModal() {
    $("#modal-TB10111P").modal("show");
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
      $("#TB10111P_empNo").val(data.empno);
      $("#TB10111P_empNm").val(data.empNm);
      $("#TB10111P_rghtCd").val(data.athCd);
      $("#TB10111P_datepicker1").val(formatDate(data.aplyStrtDt));
      $("#TB10111P_datepicker2").val(formatDate(data.aplyEndDt));
      $("#TB10111P_rgstRsn").val(data.rgstRsn);
      $("#TB10111P_rgstPEno").text(
        data.rgstEmpNm + " (" + data.rgstEmpno + ")"
      );
      $("#TB10111P_rgstDt").text(formatDate(data.rgstDt));
      $("#TB10111P_hndlPEno").text(data.hndEmpNm + " (" + data.hndEmpno + ")");
      $("#TB10111P_hndlDyTm").text(data.hndDetlDtm);
      $("#TB10111P_dltF").val(data.delYn);
      $("#TB10111P_dltPEno").val(data.delEmpno);
    }
  };

  /**
   * 모달 닫은후 이벤트 재조회
   */
  $("#modal-TB10111P").on("hidden.bs.modal", function () {
    runFindUser();
    $("#TB10111P_sq").val("");
    $("#TB10111P_dltPEno").val("");
    $("#TB10111P_dltF").val("");
  });

  /**
   * selectBox 부서코드 set
   */
  function fnSelectBox() {
    let selectBox = getSelectBoxList(
      "TB10110S",
        "D010",   //부서코드
      false
    );

    let TB07120S_grdSelect

    TB07120S_grdSelect = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    })

    let D010html;
    
    TB07120S_grdSelect.forEach((item) => {
      D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });

    $("#TB10110S_dprtNm").append(D010html);

    $('#TB10110S_dprtNm').on('change', function(){
      $('#TB10110S_dprtCd').val($('#TB10110S_dprtNm').val())
      $('#TB10110S_athCd').find(`option`).css('display', 'inline');
      $('#TB10110S_athCd').find('option').not(`option[value*=${$('#TB10110S_dprtCd').val()}]`).css('display', 'none');
    })
    
  }

  return {
    runFindUser: runFindUser,
  };
})();