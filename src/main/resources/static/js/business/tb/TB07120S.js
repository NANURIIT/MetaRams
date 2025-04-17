const TB07120Sjs = (function () {
  let TB07120S_grdSelect = {};

  let TB07120S_nowRowData = {}; // 더블클릭시 로우데이터

  $(document).ready(function () {
    setGrid_TB07120S();
    fnSelectBox();
    createOption();
    setInput();
    getDealInfoFromWF();

    $('#TB07120S_dcfcEno').on('change', function () {
      chkDecd();
    })

    // 조회조건 수정시 초기화
    $("#TB07120S_conSrch").find('input, select').on('input', function () {
      resetDataForm();
    })
    
    //기간검색 유효성 검사 함수
    chkValFromToDt("TB07120S_selectDate1","TB07120S_selectDate2");
  });

  /**
   * input 태그 기본 세팅
   */
  function setInput() {
    $("#ibims452b input").prop("readonly", true);
    $("#ibims452b button, #ibims452b select").prop("disabled", true);
    $("#TB07120S2_empNo").prop("readonly", false);
    $("#TB07120S_dcfcEno").prop("readonly", false);
    $("#TB07120S_dcfcBtn").prop("disabled", false);
    $("#TB07120S_selectDate1").val(getSomeDaysAgo(7));
    $("#TB07120S_selectDate2").val(getToday());
    $("#TB07120S_dprtCd").val($("#userDprtCd").val());
    $("#TB07120S_dprtNm").val($("#userDprtCd").val());

    $('#TB07120S_apvlRqst').hide();
    $('#TB07120S_apvlCncl').hide();
    $('#TB07120S_apvl').hide();
    $('#TB07120S_gbck').hide();
  }

  /**
   * 전체 초기화
   */
  function srchReset_TB07120S() {
    $("#TB07120S_conSrch input").val("");
    $("#TB07120S_conSrch select").val("");
    $("#TB07120S_selectDate1").val(getSomeDaysAgo(7));
    $("#TB07120S_selectDate2").val(getToday());
    $("#TB07120S_dprtCd").val($("#userDprtCd").val());
    $("#TB07120S_dprtNm").val($("#userDprtCd").val());
    resetDataForm();
  }

  // 조회내용 초기화
  function resetDataForm () {
    $("#ibims452b input").val("");

    chkDecd();

    // 파일 그리드
    $(`div[data-menuid="/TB07120S"] #UPLOAD_FileList`).html("");

    // pq그리드
    resetPGgrids("TB07120S");
  }

  

  /**
   * selectBox 공통코드 set
   */
  function fnSelectBox() {
    selectBox = getSelectBoxList(
      "TB07120S",
      "D010" +   //부서코드
      "/D016" + //  결재단계구분코드
      // "/R031" + //  입출금구분코드
      "/I027" + //  통화구분코드
      // "/D005" + //  업무구분코드
      "/D006" + //  결재상태코드
      "/F008" +  //  자금구분코드
      "/P012"     // 업무구분코드
      ,false
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
    // TB07120S_grdSelect.D005 = selectBox.filter(function (item) { 
    //   return item.cmnsGrpCd === 'D005'; 
    // });
    TB07120S_grdSelect.D006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D006";
    });
    TB07120S_grdSelect.F008 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F008";
    });

    TB07120S_grdSelect.P012 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "P012";
    });
  }

  function createOption() {
    // let R031html;
    let D010html;
    let D016html;
    let I027html;
    let D005html;
    let D006html;
    let F008html;
    let P012html;

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
    TB07120S_grdSelect.P012.forEach((item) => {
      if ( 
        // 입금
        item.cdValue === "20"
        || item.cdValue === "21"
        || item.cdValue === "82"
        || item.cdValue === "83"
        || item.cdValue === "85"
        // 출금
        || item.cdValue === "10"
        || item.cdValue === "22"
        || item.cdValue === "81"
        || item.cdValue === "84"
      ) {
        P012html += `<option value="${item.cdValue}">${item.cdName}</option>`;
      }
    });

    $("#TB07120S_dprtNm").append(D010html);
    // $('#TB07080S_ldgSttsCd').append(R031html);
    $("#TB07120S_decdStepDcd").append(D016html);
    $("#TB07120S_trCrryCd").append(I027html);
    // $('#TB07080S_ldgSttsCd').append(D015html);
    $("#TB07120S_consDecdStatCd, #TB07120S_decdSttsDcd").append(D006html);
    $("#TB07120S_fndsDvsnCd").append(F008html);
    $('#TB07120S_decdJobDcd').append(P012html);

    $('#TB07120S_decdSttsDcd').val('0')

    // 입출금 구분 옵션 추가 
    $("#TB07120S_depositWithdrawalCode").append(`
      <option value="">전체</option>
      <option value="01">입금</option>
      <option value="02">출금</option>
    `);
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
      title: "종목명",
      dataType: "string",
      dataIndx: "prdtNm",
      hidden: true
    },
    {
      title: "거래시간",
      dataType: "string",
      dataIndx: "trDtm",
      align: "center",
      halign: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리시간",
      dataType: "string",
      dataIndx: "decdDtm",
      align: "center",
      halign: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재단계구분",
      dataType: "string",
      dataIndx: "decdStepDcd",
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
      dataIndx: "decdSttsDcd",
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
      dataIndx: "orgnm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래처명",
      dataType: "string",
      dataIndx: "entpNm",
      halign: "center",
      align: "left",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "업무구분",
      dataType: "string",
      dataIndx: "etprCrdtGrntTrKindCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function(ui) {
        const P012Data = TB07120S_grdSelect.P012; // D006 데이터를 활용
        const cellData = ui.cellData;
        const matchedItem = P012Data.find(item => item.cdValue === cellData);
        return matchedItem ? matchedItem.cdName : cellData; // 데이터 매칭이 안되면 원본값 반환
      }
    },
    /**
     * 2025-01-15 X건X
     * 대표님이 해당화면 관련 업무구분코드 주신다고 하셨음
     * 3주째 된듯함 주실때까지 숨을 참아보겠습니다.
     */
    // {
    //   title: "업무구분",
    //   dataType: "string",
    //   dataIndx: "",
    //   align: "center",
    //   halign: "center",
    //   width: "",
    //   filter: { crules: [{ condition: "range" }] },
    // },
    {
      title: "입출금구분",
      dataType: "string",
      dataIndx: "depositWithdrawalCode",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래금액",
      dataType: "string",
      dataIndx: "dealTrAmt",
      align: "right",
      halign: "center",
      format: "#,###",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if (!ui.cellData) {
          return 0;
        }
      }
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
    {
      title: "투자금액",
      dataType: "string",
      dataIndx: "eprzCrdlInvAmt",
      hidden: true,
    },
    {
      title: "원화환산금액",
      dataType: "string",
      dataIndx: "krwTrslTrPrca",
      hidden: true,
    },
    {
      title: "예금주명",
      dataType: "string",
      dataIndx: "achdNm",
      hidden: true,
    },
    {
      title: "수수료",
      dataType: "string",
      dataIndx: "feeTotAmt",
      hidden: true,
    },
    {
      title: "거래일자",
      dataType: "string",
      dataIndx: "trDt",
      hidden: true
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "decdDt",
      hidden: true
    },
    {
      title: "승인자번호",
      dataType: "string",
      dataIndx: "dcfcEno",
      hidden: true
    },
    {
      title: "승인자명",
      dataType: "string",
      dataIndx: "dcfcEnm",
      hidden: true
    },
    {
      title: "거래처번호",
      dataType: "string",
      dataIndx: "trObjtBsnNo",
      hidden: true
    },
    {
      title: "딜번호",
      dataType: "string",
      dataIndx: "dealNo",
      hidden: true,
    },
    {
      title: "실행일련번호",
      dataType: "string",
      dataIndx: "excSeq",
      hidden: true,
    },
    {
      title: "거래일련번호",
      dataType: "string",
      dataIndx: "trSeq",
      hidden: true,
    },
    {
      title: "등록일련번호",
      dataType: "string",
      dataIndx: "erlmSeq",
      hidden: true,
    },
    {
      title: "해외송금여부",
      dataType: "string",
      dataIndx: "ovrsTrnsYn",
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
        // 선택된 줄 명확하게 보여주기 위한 이벤트
        let gridlength = $('#TB07120S_grid1').pqGrid('instance').pdata.length
        for( let i = 0; i < gridlength; i++ ){
          $('#TB07120S_grid1').pqGrid('removeClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: i });
        }
        $('#TB07120S_grid1').pqGrid('addClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: ui.rowIndx });

        // let consDecdStatCd = ui.rowData.consDecdStatCd;
        setIbims452b(ui.rowData);
        // decdStatChk(consDecdStatCd);
        //부속서류목록(TB06010S의 첨부파일 그대로 가져옴)
        $('#fileKey2').val(ui.rowData.prdtCd)
        getFileInfo($('#key1').val(), $('#fileKey2').val());
      },
    };

    $("#TB07120S_grid1").pqGrid(gridObj1);
    $("#TB07120S_grid1").pqGrid("refreshDataAndView");

  }

  /**
  * setIbims452b 함수는 그리드에서 선택된 행의 데이터를 받아서 화면(id:Ibims452b)에 표시
  * @param {Object} rowData - 그리드에서 선택된 행의 데이터
  */
  function setIbims452b(rowData) {

    const keys = Object.keys(rowData);

    let consDecdStatCd = rowData.consDecdStatCd;               //결재상태
    let trCrryCd = rowData.trCrryCd;                           //통화코드
    let depositWithdrawalCode = rowData.depositWithdrawalCode; //입출금구분

    // 값 세팅
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = rowData[key];

      //숫자로 변환이 될 경우 
      if (
        key === "dealTrPrca"
        || key === "feeTotAmt"
        || key === "eprzCrdlCtrtAmt"
        || key === "nrmlIntAmt"
        || key === "vat"
        || key === "eprzCrdlInvAmt"
        || key === "dealTrAmt"
        || key === "krwTrslTrPrca"
      ) {
        let formattedValue = Number(value).toLocaleString('en');
        $(`#ibims452b #TB07120S_${key}`).val(formattedValue);
      }
      else if ( key === "ovrsTrnsYn") {
        if( !value ){
          $(`#ibims452b input[name="TB07120S_${key}"]`).prop('disabled', false)
          value = "N"
        }
        else {
          $(`#ibims452b input[name="TB07120S_${key}"]`).prop('disabled', true)
        }
        $(`#ibims452b input[name="TB07120S_${key}"][value="${value}"]`).prop('checked', true)
      }
      // 기본 값 세팅
      else {
        $(`#ibims452b #TB07120S_${key}`).val(value);
      }
    }

    chkDecd();

  }

  /**
   * PQGrid 세팅
   */

  /**
   * 결재상태에 따른 버튼 컨트롤
   */
  function chkDecd() {
    // 담당자, 승인자 체크
    const nowEmpno = $('#userEno').val()
    const stfno = $('#TB07120S_rqstStfno').val()
    const dcfcEno = $('#TB07120S_dcfcEno').val()

    // 담당자인 경우
    if ( nowEmpno === stfno ) {
      $('#TB07120S_apvlRqst').show()
      $('#TB07120S_apvlCncl').show()
      $('#TB07120S_apvl').hide()
      $('#TB07120S_gbck').hide()
      $('#TB07120S_rjctRsnCntn').prop('disabled', true)
    }
    // 승인자인 경우
    else if ( nowEmpno === dcfcEno ) {
      $('#TB07120S_apvlRqst').hide()
      $('#TB07120S_apvlCncl').hide()
      $('#TB07120S_apvl').show()
      $('#TB07120S_gbck').show()
      $('#TB07120S_rjctRsnCntn').prop('disabled', false)
    }
    // 해당사항이 없는경우 Default
    else {
      $('#TB07120S_apvlRqst').hide()
      $('#TB07120S_apvlCncl').hide()
      $('#TB07120S_apvl').hide()
      $('#TB07120S_gbck').hide()
      $('#TB07120S_rjctRsnCntn').prop('disabled', true)
    }
    
    // 결재단계, 결재상태 확인
    // 해당 사항이 없는경우
    if ($('#TB07120S_decdSttsDcd').val() === "0") {
      $('#TB07120S_apvlRqst').prop('disabled', false)
      $('#TB07120S_apvlCncl').prop('disabled', true)
      $('#TB07120S_apvl').prop('disabled', true)
      $('#TB07120S_gbck').prop('disabled', true)
      $('#TB07120S_dcfcEno').prop('disabled', false)
      $('#TB07120S_dcfcBtn').prop('disabled', false)
    }
    // 결재 진행중인 경우
    else if ($('#TB07120S_decdSttsDcd').val() === "1") {
      $('#TB07120S_apvlRqst').prop('disabled', true)
      $('#TB07120S_apvlCncl').prop('disabled', false)
      $('#TB07120S_apvl').prop('disabled', false)
      $('#TB07120S_gbck').prop('disabled', false)
      $('#TB07120S_dcfcEno').prop('disabled', true)
      $('#TB07120S_dcfcBtn').prop('disabled', true)
    }
    // 승인된 경우
    else if ($('#TB07120S_decdSttsDcd').val() === "2") {
      $('#TB07120S_apvlRqst').prop('disabled', true)
      $('#TB07120S_apvlCncl').prop('disabled', true)
      $('#TB07120S_apvl').prop('disabled', true)
      $('#TB07120S_gbck').prop('disabled', true)
      $('#TB07120S_dcfcEno').prop('disabled', true)
      $('#TB07120S_dcfcBtn').prop('disabled', true)
      $('#TB07120S_rjctRsnCntn').prop('disabled', true)
    }
    // 반려된 경우 재승인요청,반려 가능
    else if ($('#TB07120S_decdSttsDcd').val() === "3") {
      $('#TB07120S_apvlRqst').prop('disabled', false)
      $('#TB07120S_apvlCncl').prop('disabled', false)
      $('#TB07120S_apvl').prop('disabled', true)
      $('#TB07120S_gbck').prop('disabled', true)
      $('#TB07120S_dcfcEno').prop('disabled', true)
      $('#TB07120S_dcfcBtn').prop('disabled', true)
      $('#TB07120S_rjctRsnCntn').prop('disabled', true)
    }
    // 승인취소된 내역은 조회 안됨
    else {

    }
  }

  /*
   *  =====================SELECT모음=====================
   */

  /** 
   * 조회 
  */
  function get07120sList() {
    let result;

    let prevDate = $("#TB07120S_selectDate1").val();
    let nextDate = $("#TB07120S_selectDate2").val();

    let paramData;
    //날짜를 비교하여 오류가 있을 경우 경고 메시지를 띄움.
    if (new Date(prevDate) > new Date(nextDate)) {
      paramData = {
        orgno: $("#TB07120S_dprtCd").val(),
        prevDate: unformatDate(nextDate),
        nextDate: unformatDate(prevDate),
        depositWithdrawalCode: $("#TB07120S_depositWithdrawalCode").val(),
        prdtCd: $("#TB07120S_prdtCd").val(),
        consDecdStatCd: $("#TB07120S_consDecdStatCd").val(),
        trCrryCd: $("#TB07120S_trCrryCd").val(),
        trObjtBsnNo: $("#TB07120S_ardyBzepNo").val(),
        etprCrdtGrntTrKindCd: $("#TB07120S_decdJobDcd").val()   // (거래종류코드) 업무구분코드
      };
    }
    else {
      paramData = {
        orgno: $("#TB07120S_dprtCd").val(),
        prevDate: unformatDate(prevDate),
        nextDate: unformatDate(nextDate),
        depositWithdrawalCode: $("#TB07120S_depositWithdrawalCode").val(),
        prdtCd: $("#TB07120S_prdtCd").val(),
        consDecdStatCd: $("#TB07120S_consDecdStatCd").val(),
        trCrryCd: $("#TB07120S_trCrryCd").val(),
        trObjtBsnNo: $("#TB07120S_ardyBzepNo").val(),
        etprCrdtGrntTrKindCd: $("#TB07120S_decdJobDcd").val()   // (거래종류코드) 업무구분코드
      };
    }

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
          Swal.fire({
            icon: "warning",
            title : "Warning!",
            text: "조회내역이 없습니다!",
          });
          grid.option("strNoRows", "조회된 데이터가 없습니다.");
          grid.refreshDataAndView();
          grid.setData([]);
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    })
  }

  /*
   *  =====================SELECT모음=====================
   */

  /*
   *  =====================버튼Event=====================
   */

  /**
   * 결재전 데이터 체크
   */
  function chkDcfcEno () {

    // 뭘 체크하려 했더라...
    let dcfcEno = $('#TB07120S_dcfcEno').val()

    // 승인자 정보를 받아서
    $.ajax({

    })

  }

  /**
   * @param mode 결재단계구분코드 
   */
  function updateFndsCnstDecd( mode ) {

    let swalText;

    // 체크값
    let decdSttsDcd = $('TB07120S_decdSttsDcd').val()
    let decdStepDcd = $('TB07120S_decdStepDcd').val()
    let paramDecdStepDcd;

    if ( mode === "1" && decdSttsDcd === "3") {
      swalText = "재승인요청";
      paramDecdStepDcd = "02"; // 재승인요청
      if ( $('#TB07120S_rqstStfno').val() === $('#TB07120S_dcfcEno').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `담당자와 승인자가 같습니다! 변경해주세요`,
        })
        return;
      }
      else if ( !$('#TB07120S_dcfcEno').val() ) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `승인자를 입력해주세요!`,
        })
        return;
      }
    }
    else if ( mode === "1") {
      swalText = "승인요청";
      paramDecdStepDcd = "04"; // 승인요청
      if ( $('#TB07120S_rqstStfno').val() === $('#TB07120S_dcfcEno').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `담당자와 승인자가 같습니다! 변경해주세요`,
        })
        return;
      }
      else if ( !$('#TB07120S_dcfcEno').val() ) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `승인자를 입력해주세요!`,
        })
        return;
      }
    } 
    else if ( mode === "2") {
      swalText = "승인";
      paramDecdStepDcd = "05"; // 결재완료
    } 
    else if ( mode === "3") {
      swalText = "반려";
      paramDecdStepDcd = "00"; // 해당무!
    } 
    else if ( mode === "4") {
      swalText = "승인취소";
      paramDecdStepDcd = "00"; // 해당무!
    }


    /**
     * @param dealNo          // 딜번호
     * @param prdtCd          // 종목코드
     * @param decdJobDcd      // 업무구분코드
     * @param scrnNo          // 화면번호
     * @param excSeq          // 실행일련번호
     * @param rqstSq          // 등록일련번호
     * @param trSeq           // 거래일련번호
     * 
     * @param dcfcEno         // 승인자
     * @param rjctRsnCntn     // 반려사유
     * @param ovrsTrnsYn      // 해외송금여부
     * 
     * @param decdStepDcd // 00해당무, 01담당자작성중, 02 재승인요청, 03담당자수정중, 04승인요청, 05 결재완료
     * @param decdSttsDcd // 결재상태코드 0 해당없음, 1 진행중, 2 승인, 3 반려, 4 승인취소
     */

    let dealNo = $('#TB07120S_dealNo').val()
    let prdtCd = $('#ibims452b #TB07120S_prdtCd').val()
    let scrnNo = "TB07120S"
    let excSeq = $('#TB07120S_excSeq').val()
    let rqstSq = $('#TB07120S_erlmSeq').val()
    let trSeq = $('#TB07120S_trSeq').val()
    let dcfcEno = $('#TB07120S_dcfcEno').val()
    let rjctRsnCntn = $('#TB07120S_rjctRsnCntn').val()
    let ovrsTrnsYn = $('input[name="TB07120S_ovrsTrnsYn"]:checked').val()

    const paramData = {
      dealNo: dealNo,                   // 딜번호
      prdtCd: prdtCd,                   // 종목코드
      scrnNo: scrnNo,                   // 화면번호
      excSeq: excSeq,                   // 실행일련번호
      rqstSq: rqstSq,                   // 등록일련번호
      trSeq: trSeq,                     // 거래일련번호
      dcfcEno: dcfcEno,                 // 승인자
      rjctRsnCntn: rjctRsnCntn,         // 반려사유
      ovrsTrnsYn: ovrsTrnsYn,           // 해외송금여부
      decdStepDcd: paramDecdStepDcd,    // 결재단계구분코드
      decdSttsDcd: mode,                // 결재상태구분코드
    };

    $.ajax({
      type: "POST",
      url: `/TB07120S/updateFndsCnstDecd`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        Swal.fire({
          icon: "success",
          text: `${swalText} 성공`,
        })
        $('#TB07120S_decdSttsDcd').val(mode)
        get07120sList();
        chkDecd();
      },
      error: function () {
        Swal.fire({
          icon: "warning",
          text: `${swalText} 실패`,
        })
      },
    })
  }

  function getDealInfoFromWF() {

    if (sessionStorage.getItem("isFromWF")) {
      // console.log("WF세션 있음");
      var prdtCd = sessionStorage.getItem("wfPrdtCd");
      var prdtNm = sessionStorage.getItem("wfPrdtNm");
      $("#TB07120S_prdtCd").val(prdtCd);
      $("#TB07120S_prdtNm").val(prdtNm);
      get07120sList();
    } else {
      // console.log("WF세션 비었음");
    }
    sessionStorage.clear();
  }

  return {
    get07120sList: get07120sList,
    updateFndsCnstDecd: updateFndsCnstDecd,
    srchReset_TB07120S: srchReset_TB07120S,
    getDealInfoFromWF: getDealInfoFromWF,
    resetDataForm: resetDataForm,
  };
})();
