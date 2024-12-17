const TB07120Sjs = (function () {
  let TB07120S_grdSelect = {};

  let TB07120S_nowRowData = {}; // 더블클릭시 로우데이터

  $(document).ready(function () {
    setGrid_TB07120S();
    setInput();
    fnSelectBox();
    createOption();
  });

  /**
   * input 태그 기본 세팅
   */
  function setInput() {
    $("#ibims452b input").prop("readonly", true);
    $("#ibims452b button, #ibims452b select").prop("disabled", true);
    $("#TB07120S_rqstStfno, #TB07120S_reltStfno").prop("readonly", false);
    $("#TB07120S_rqstBtn, #TB07120S_reltBtn").prop("disabled", false);
  }

  /**
   * 초기화
   */
  function reset () {
    $("#con-srch input").val("")
  }

  /**
   * selectBox 공통코드 set
   */
  function fnSelectBox() {
    selectBox = getSelectBoxList(
      "TB07120S",
        "D010"+   //부서코드
        "/D016" + //  결재단계구분코드
        // "/R031" + //  입출금구분코드
        "/I027" + //  통화구분코드
        // "/D015" + //  업무구분코드
        "/D006" + //  결재상태코드
        "/F008",  //  자금구분코드
      false
    );

    TB07120S_grdSelect.D010 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    })
    // TB07120S_grdSelect.R031 = selectBox.filter(function (item) { 
    //   return item.cmnsGrpCd === 'R031'; });
    TB07120S_grdSelect.D016 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D016";
    });
    TB07120S_grdSelect.I027 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "I027";
    });
    // TB07120S_grdSelect.D015 = selectBox.filter(function (item) { 
    //   return item.cmnsGrpCd === 'D015'; });
    TB07120S_grdSelect.D006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D006";
    });
    TB07120S_grdSelect.F008 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F008";
    });
  }

  function createOption() {
    // let R031html;
    let D010html;
    let D016html;
    let I027html;
    // let D015html;
    let D006html;
    let F008html;
    
    TB07120S_grdSelect.D010.forEach((item) => {
      D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });
    // TB07120S_grdSelect.R031.forEach(item => { R031html += `<option value="${item.cdValue}">${item.cdName}</option>` });
    TB07120S_grdSelect.D016.forEach((item) => {
      D016html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });
    TB07120S_grdSelect.I027.forEach((item) => {
      I027html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });
    // TB07120S_grdSelect.D015.forEach(item => { D015html += `<option value="${item.cdValue}">${item.cdName}</option>` });
    TB07120S_grdSelect.D006.forEach((item) => {
      D006html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });
    TB07120S_grdSelect.F008.forEach((item) => {
      F008html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });

    $("#TB07120S_dprtNm").append(D010html);
    // $('#TB07080S_ldgSttsCd').append(R031html);
    $("#TB07120S_consDecdDvsnCd").append(D016html);
    $("#TB07120S_trCrryCd").append(I027html);
    // $('#TB07080S_ldgSttsCd').append(D015html);
    $("#TB07120S_consDecdStatCd, #ibims452 #TB07120S_consDecdStatCd").append(
      D006html
    );
    $("#TB07120S_fndsDvsnCd").append(F008html);
  }

  $("#TB07120S_dprtNm").on("change", function () {
    var dprtCd = $(this).val();
  
    $("#TB07120S_dprtCd").val(dprtCd);
  });

  /**
   * PQGrid 세팅
   */
  let colM_Grid1 = [
    {
      title: "종목코드",
      dataType: "string",
      dataIndx: "prdtCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래일자",
      dataType: "string",
      dataIndx: "trDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재상태",
      dataType: "string",
      dataIndx: "consDecdStatCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        const D006Data = TB07120S_grdSelect.D006; // D006 데이터를 활용
        const cellData = ui.cellData;
        const matchedItem = D006Data.find(item => item.cdValue === cellData);
        return matchedItem ? matchedItem.cdName : cellData; // 데이터 매칭이 안되면 원본값 반환
      }
    },
    {
      title: "부서코드",
      dataType: "string",
      dataIndx: "orgno",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부서명",
      dataType: "string",
      dataIndx: "dprtNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래처명",
      dataType: "string",
      dataIndx: "entpNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "업무구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "입출금구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래금액",
      dataType: "string",
      dataIndx: "dealTrAmt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "자금구분",
      dataType: "string",
      dataIndx: "fndsDvsnCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        const F008Data = TB07120S_grdSelect.F008; // D006 데이터를 활용
        const cellData = ui.cellData;
        const matchedItem = F008Data.find(item => item.cdValue === cellData);
        return matchedItem ? matchedItem.cdName : cellData; // 데이터 매칭이 안되면 원본값 반환
      }
    },
    {
      title: "통화코드",
      dataType: "string",
      dataIndx: "trCrryCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  let colM_Grid2 = [
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "서류금액",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "서류명",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "문서번호",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  function setGrid_TB07120S() {
    var gridObj1 = {
      height: 200,
      maxHeight: 200,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colM_Grid1,
      strNoRows: "조회된 데이터가 없습니다.",
      rowDblClick: function (evt, ui) {
        const keys = Object.keys(ui.rowData);

        //포맷변경(포맷을'YYYY-MM-DD HH:MM:SS'로 변경)
        //거래시간
        if (ui.rowData["trDtm"]) {
          let dateObj = new Date(ui.rowData["trDtm"]);
          ui.rowData["trDtm"] = dateObj.toISOString().replace('T', ' ').slice(0, -5);
        }
         //처리시간
        if(ui.rowData["hndlDtm"]){
          let dateObj = new Date(ui.rowData["hndlDtm"]);
          ui.rowData["hndlDtm"] = dateObj.toISOString().replace('T', ' ').slice(0, -5);
        }

        for (let i = 0; i < keys.length; i++) {
          $(`#ibims452b #TB07120S_${keys[i]}`).val(ui.rowData[keys[i]]);
        }

        TB07120S_nowRowData = {
          dealNo: ui.rowData.dealNo,
          excSeq: ui.rowData.excSn,
          trSeq: ui.rowData.trSn,
        };

        decdStatChk();
      },
    };

    $("#TB07120S_grid1").pqGrid(gridObj1);
    $("#TB07120S_grid1").pqGrid("refreshDataAndView");

    var gridObj2 = {
      height: 200,
      maxHeight: 200,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colM_Grid2,
      strNoRows: "조회된 데이터가 없습니다.",
    };

    $("#TB07120S_grid2").pqGrid(gridObj2);
    $("#TB07120S_grid2").pqGrid("refreshDataAndView");
  }
  /**
   * PQGrid 세팅
   */

  /*
   *  =====================SELECT모음=====================
   */

  /**
   * 조회
   */
  function get07120sList() {
    // if('' === $("#TB07120S_dprtCd").val()){
    //     Swal.fire({
    //         icon: 'warning',
    //         text: '부서정보를 입력해주세요!'
    //     }).then(function() {
    //         $("#TB07120S_dprtCd").focus();
    //     })
    //     return;
    // }

    let result;

    let prevDate;
    let nextDate;

    if ($("#TB07120S_selectDate1").val() < $("#TB07120S_selectDate2").val()) {
      prevDate = $("#TB07120S_selectDate1").val();
      nextDate = $("#TB07120S_selectDate2").val();
    } else {
      nextDate = $("#TB07120S_selectDate1").val();
      prevDate = $("#TB07120S_selectDate2").val();
    }

    const paramData = {
      orgno: $("#TB07120S_dprtCd").val(),
      prevDate: unformatDate(prevDate),
      nextDate: unformatDate(nextDate),
      // , 입출금구분:
      prdtCd: $("#TB07120S_prdtCd").val(),
      consDecdStatCd: $("#TB07120S_consDecdStatCd").val(),
      trCrryCd: $("#TB07120S_trCrryCd").val(),
      trObjtBsnNo: $("#TB07120S_ardyBzepNo").val(),
      // , 업무구분:
    };

    $.ajax({
      type: "POST",
      url: "/TB07120S/get07120sList",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        let grid = $("#TB07120S_grid1").pqGrid("instance");
        if (data.length > 0) {
          grid.setData(data);
          grid.getData();
          result = 1;
        } else {
          grid.setData([]);
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    }).then(function () {
      if(result != 1){
        console.log("조회내역이 없습니다!");
      }
      // if (result != 1) {
      //   Swal.fire({
      //     icon: result == -1 ? "warning" : result == -2 ? "error" : "info",
      //     text: "조회내역이 없습니다!",
      //   });
      // }
    });
  }

  /*
   *  =====================SELECT모음=====================
   */

  /*
   *  =====================버튼Event=====================
   */

  /**
   * 결재상태 Check
   */
  function decdStatChk() {
    let consDecdStatCd = $("#ibims452b #TB07120S_consDecdStatCd").val();

    if (!consDecdStatCd) {
      consDecdStatCd = "0";
    }

    /**
     * @param apvlRqst = 승인요청버튼
     * @param apvl = 승인버튼
     * @param gbck = 반려버튼
     * @param apvlCncl = 승인취소버튼
     */

    // 모든 버튼 비활성화
    $("#TB07120S_apvlRqst").prop("disabled", true);
    $("#TB07120S_apvl").prop("disabled", true);
    $("#TB07120S_gbck").prop("disabled", true);
    $("#TB07120S_apvlCncl").prop("disabled", true);

    // 승인요청버튼만 활성화
    if (
      consDecdStatCd === "0" ||
      consDecdStatCd === "3" ||
      consDecdStatCd === "4"
    ) {
      $("#TB07120S_apvlRqst").prop("disabled", false);
    }
    // 승인, 반려만 활성화
    else if (consDecdStatCd === "1") {
      $("#TB07120S_apvl").prop("disabled", false);
      $("#TB07120S_gbck").prop("disabled", false);
    }
    // 승인취소만 활성화
    else if (consDecdStatCd === "2") {
      $("#TB07120S_apvlCncl").prop("disabled", false);
    }
  }

  /**
   * @param consDecdStatBtnNo // 버튼번호
   */
  function updateFndsCnstDecd(consDecdStatBtnNo) {
    let swalText;
    if (consDecdStatBtnNo === "1") {
      swalText = "승인요청";
    } else if (consDecdStatBtnNo === "2") {
      swalText = "승인";
    } else if (consDecdStatBtnNo === "3") {
      swalText = "반려";
    } else if (consDecdStatBtnNo === "4") {
      swalText = "승인취소";
    }

    let result;
    let query;
    const nowStat = $("#TB07120S_consDecdStatCd").val();

    console.log(nowStat);

    if (nowStat === "0") {
      query = "insert";
    } else {
      query = "update";
    }

    /**
     * @param dealNo 딜번호
     * @param excSeq 거래일련번호
     * @param trSeq 실행일련번호
     * @param TB07120S_reltStfno 승인자
     * @param TB07120S_rqstStfno 담당자
     * @param TB07120S_gbckRsonText 반려사유
     */
    const paramData = {
      dealNo: TB07120S_nowRowData.dealNo,
      excSeq: TB07120S_nowRowData.excSeq,
      trSeq: TB07120S_nowRowData.trSeq,
      reltStfno: $("#TB07120S_reltStfno").val(),
      rqstStfno: $("#TB07120S_rqstStfno").val(),
      gbckRsonText: $("#TB07120S_gbckRsonText").val(),
      consDecdStatCd: consDecdStatBtnNo, // 결재상태코드
      hndEmpno : $("#userEno").val(),

    };

    $.ajax({
      type: "POST",
      url: `/TB07120S/${query}FndsCnstDecd`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        result = data;
      },
      error: function () {
        result = -2;
      },
    }).then(function () {
      console.log("result : ", result)
      if (result <= 0) {
        Swal.fire({
          icon:
            result == -1
              ? "warning"
              : result == 0
              ? "warning"
              : result == -2
              ? "error"
              : "info",
          text: swalText + " 실패!",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: swalText + " 성공!",
        });
      }
    });
  }

  return {
    get07120sList: get07120sList,
    updateFndsCnstDecd: updateFndsCnstDecd,
    reset: reset
  };
})();
