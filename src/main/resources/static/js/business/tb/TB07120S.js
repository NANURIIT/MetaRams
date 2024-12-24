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
    $("#TB07120S_consDecdStatCd, #TB07120S_consDecdStatCd2").append(
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
      dataIndx: "hndlDtm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui){
        let cellData = unformatDate(ui.cellData);
        return cellData ? cellData.substring(0,8) : null;
      },
    },
    {
      title: "결재단계구분",
      dataType: "string",
      dataIndx: "consDecdDvsnCd",
      align: "center",
      halign: "center",
      render: function (ui) {
        const D006Data = TB07120S_grdSelect.D016; // D016 데이터를 활용
        const cellData = ui.cellData;
        const matchedItem = D006Data.find(item => item.cdValue === cellData);
        return matchedItem ? matchedItem.cdName : cellData; // 데이터 매칭이 안되면 원본값 반환
      }
    },
    {
      title: "결재상태",
      dataType: "string",
      dataIndx: "consDecdStatCd",
      align: "center",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        const D006Data = TB07120S_grdSelect.D006; // D006 데이터를 활용
        const cellData = ui.cellData;
        const matchedItem = D006Data.find(item => item.cdValue === cellData);
        return matchedItem ? matchedItem.cdName : cellData; // 데이터 매칭이 안되면 원본값 반환
      }
    },
    // {
    //   title: "부서코드",
    //   dataType: "string",
    //   dataIndx: "orgno",
    //   align: "center",
    //   halign: "center",
    //   width: "",
    //   filter: { crules: [{ condition: "range" }] },
    // },
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
    {
      title: "등록순번",
      dataType: "string",
      dataIndx: "erlmSeq",
      hidden: true,
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
      strNoRows: "",
      rowDblClick: function (evt, ui) {
        const keys = Object.keys(ui.rowData);
        let consDecdStatCd = ui.rowData.consDecdStatCd; //결재상태

        if(ui.rowData["trDt"]){
          let trDt = ui.rowData["trDt"];
          console.log("trDt : ", formatDate(trDt));
          
          //ui.rowData["trDt"] = formatDate(trDt);
        }
        //포맷변경(포맷을'YYYY-MM-DD HH:MM:SS'로 변경)
        //거래시간
        if (ui.rowData["trDtm"]) {
          let dateObj = new Date(ui.rowData["trDtm"]); 
          ui.rowData["trDtm"] = dateObj.format("yyyy-MM-dd HH:mm:ss");
        }
         //처리시간
        if(ui.rowData["hndlDtm"]){
          let dateObj = new Date(ui.rowData["hndlDtm"]);
          ui.rowData["hndlDtm"] = dateObj.format("yyyy-MM-dd HH:mm:ss");
        }

        for (let i = 0; i < keys.length; i++) {
          $(`#ibims452b #TB07120S_${keys[i]}`).val(ui.rowData[keys[i]]);
        }

        $('#TB07120S_consDecdDvsnCd').val(ui.rowData.consDecdDvsnCd) //결재단계구분
        $('#TB07120S_consDecdStatCd2').val(consDecdStatCd) //결재상태

        TB07120S_nowRowData = {
          prdtCd : ui.rowData.prdtCd,
          dealNo: ui.rowData.dealNo,
          excSeq: ui.rowData.excSn,
          trSeq: ui.rowData.trSn,
          consDecdStatCd : consDecdStatCd,
          erlmSeq : ui.rowData.erlmSeq,
        };

        decdStatChk(consDecdStatCd);
      },
    };

    $("#TB07120S_grid1").pqGrid(gridObj1);
    $("#TB07120S_grid1").pqGrid("refreshDataAndView");

    var gridObj2 = {
      height: 100,
      maxHeight: 100,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colM_Grid2,
      strNoRows: "",
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
      // consDecdStatCd: consDecdStatCd,//$("#TB07120S_consDecdStatCd").val(),
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
          grid.option("strNoRows", "조회된 데이터가 없습니다.");
          grid.refreshDataAndView();
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
   * @param consDecdStatCd 결재상태
   * === 추후 추가 ========
   * 1. 승인요청자일 경우, 저장과 승인 요청 버튼 활성화 
   * 2. 승인담당자일 경우, 승인, 반려 버튼활성화 
   * ==================== 
   */
  function decdStatChk(consDecdStatCd) {
    // let consDecdStatCd = $("#TB07120S_consDecdStatCd").val();
    
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

    //반려사유 비활성화
    $("#TB07120S_rjctRsnCntn").prop("disabled", true);

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
      $("#TB07120S_rjctRsnCntn").prop("disabled", false); 
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
    let consDecdDvsnCd; //결재단계구분

    if (consDecdStatBtnNo === "0") {  //해당없음
      swalText = "저장";
      consDecdDvsnCd = "01"; //담당자작성중
    } else if (consDecdStatBtnNo === "1") {
      swalText = "승인요청";
      consDecdDvsnCd = "04"; //승인요청
    } else if (consDecdStatBtnNo === "2") {
      swalText = "승인";
      consDecdDvsnCd = "05"; //결재완료
    } else if (consDecdStatBtnNo === "3") {
      swalText = "반려";
      consDecdDvsnCd = ""; 
    } else if (consDecdStatBtnNo === "4") {
      swalText = "승인취소";
      consDecdDvsnCd = ""; 
    }

    let result;
    let query;
    const nowStat = $("#TB07120S_consDecdStatCd").val();

    if(nowStat == ""){ //전체
      if(TB07120S_nowRowData.consDecdStatCd === null){
        query = "insert";
      }else{
        query = "update";
      }
    }else{
      query = "update";
    }
    console.log(nowStat);
    // if (nowStat === "0") { //해당없음
    //   query = "insert";
    // } else{
    //   query = "update";
    // }
    // 유효성 검사 실패 시 멈추도록 수정
    if (!TB07120S_validateFields(consDecdStatBtnNo)) {
        return;
    }
    console.log(`TB07120S_nowRowData : ${JSON.stringify(TB07120S_nowRowData)}`)
    console.log(`query: ${query}`)
    /**
     * @param dealNo 딜번호
     * @param excSeq 거래일련번호
     * @param trSeq 실행일련번호
     * @param TB07120S_reltStfno 승인자
     * @param TB07120S_rqstStfno 담당자
     * @param TB07120S_rjctRsnCntn 반려사유
     */
    const paramData = {
      prdtCd : TB07120S_nowRowData.prdtCd,           //상품코드
      excSeq: TB07120S_nowRowData.excSeq,            //실행순번
      trSeq: TB07120S_nowRowData.trSeq,              //거래순번
      erlmSeq : TB07120S_nowRowData.erlmSeq,         //등록순번
      //chrrDvsnCd:            // 담당자구분코드
      reltStfno: $("#TB07120S_reltStfno").val(),     //신청직원번호
      rqstStfno: $("#TB07120S_rqstStfno").val(),     //승인자
      consDecdDvsnCd: consDecdDvsnCd,                //품의결재구분코드
      consDecdStatCd: consDecdStatBtnNo,             //결재상태코드
      rjctRsnCntn: $("#TB07120S_rjctRsnCntn").val(), //반려사유내용
      hndEmpno : $("#userEno").val(),                //조작사원번호
     
    };

    console.log(`paramData : ${JSON.stringify(paramData)}`)
    $.ajax({
      type: "POST",
      url: `/TB07120S/${query}FndsCnstDecd`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        result = data;
        get07120sList();
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

  function TB07120S_validateFields(consDecdStatBtnNo){
    let rqstStfno = $("#TB07120S_rqstStfno").val(); //담당자
    let reltStfno = $("#TB07120S_reltStfno").val(); //승인자
    let rjctRsnCntn = $("#TB07120S_rjctRsnCntn").val(); //반려사유
    
    //해외송금여부 : 현재 정의 X

    console.log("TB07120S_validateFields_reltStfno :", reltStfno);
    
    //승인요청
    if(consDecdStatBtnNo === "1" ){
      if(!rqstStfno){
        openPopup({ type: "info", text: "담당자 정보를 입력해주세요." });
        return false;
      }

      if(!reltStfno){
        openPopup({ type: "info", text: "승인자 정보를 입력해주세요." });
        return false;
      }
    } else if(consDecdStatBtnNo === "3" ){
      //반려
      if(!rjctRsnCntn){
        openPopup({ type: "info", text: "반려사유를 입력해주세요." });
        return false;
      }
    }
    return true;
  }

  return {
    get07120sList: get07120sList,
    updateFndsCnstDecd: updateFndsCnstDecd,
    reset: reset
  };
})();
