const TB07060Sjs = (function () {
  let trDtls; // 거래내역
  let intrTrDtls; // 이자계산내역
  let feeRcivDtls; // 수수료수납내역
  let excIntrtInf; // 실행금리정보
  let selectBox; // 셀렉트박스 콜백
  let grdSelect = {}; // 그리드용 셀렉트
  let initialValues = {}; // 페이지 로드 시 초기 값

  $(document).ready(function () {
    fnSelectBox(); // 셀렉트박스
    pqGrid(); // PqGrid 생성
    resetDd();
  });

  /*******************************************************************
   * SelectBox
   *******************************************************************/
  function fnSelectBox() {
    selectBox = getSelectBoxList(
      "TB07060S",
      "P009" + // 진행상태코드
        "/L001" + // 원장상태코드
        "/E022" + // 기업여신상품대분류코드
        "/E023" + // 기업여신상품중분류코드
        "/E021" + // 기업여신상품소분류코드
        "/I027" + // 투자통화코드
        "/E010" + // 한도구분코드
        "/E020" + // 상환방법코드
        "/S003" + // 금리구분코드
        "/E019" + // 연체이자코드
        "/E011" + // 이자방법코드
        "/E024" + // 이자초말일적용코드
        "/E009" + // 휴일처리구분코드
        "/E013" + // 일수계산방법코드
        "/E015" + // 기업여신이자단수법구분코드 EPRZ_CRDL_INTR_SNNO_PRCS_DCD
        "/I017" + // 이자납입일자코드
        "/E005" + // 해지사유코드
        "/E025" + // 기업여신거래종류코드
        "/P013" + // 원리금유형코드
        "/E008" + // 기업여신수수료종류코드
        "/F006" + // 수수료인식구분코드 FEE_RCOG_DCD
        "/T006" + // 과세유형구분코드 TXTN_TP_DCD
        "/I011" + // 심사진행상태
        "/I019" + // 이자단수법구분코드 INTR_SNNO_PRCS_DCD
        "/H001" + // 휴일처리구분코드 HLDY_PRCS_DCD
        "/E026" + // 기업여신거래상태코드 EPRZ_CRDL_TR_STTS_CD
        "/S003" + // 기준금리종류코드 STDR_INTRT_KND_CD
        "/I013" + // 금리변동주기코드 INTRT_CNGE_FRQC_CD
        "/A007", // 적용일수구분코드 APLY_DNUM_DCD
      false
    );

    // 기업여신거래종류코드
    grdSelect.E025 = selectBox.filter((item) => item.cmnsGrpCd === "E025");
    // 기업여신거래상태코드
    grdSelect.E026 = selectBox.filter((item) => item.cmnsGrpCd === "E026");
    // 원리금유형코드
    grdSelect.P013 = selectBox.filter((item) => item.cmnsGrpCd === "P013");
    // 기업여신수수료종류코드
    grdSelect.E008 = selectBox.filter((item) => item.cmnsGrpCd === "E008");
    // 수수료인식구분코드
    grdSelect.F006 = selectBox.filter((item) => item.cmnsGrpCd === "F006");
    // 과세유형구분코드
    grdSelect.T006 = selectBox.filter((item) => item.cmnsGrpCd === "T006");
    /* 실행금리정보 */
    // 기준금리종류코드
    grdSelect.S003 = selectBox.filter((item) => item.cmnsGrpCd === "S003");
    // 금리변동주기코드
    grdSelect.I013 = selectBox.filter((item) => item.cmnsGrpCd === "I013");
    // 적용일수구분코드
    grdSelect.A007 = selectBox.filter((item) => item.cmnsGrpCd === "A007");
  }

  /*******************************************************************
   * PqGrid
   *******************************************************************/
  function pqGrid() {
    /********************************************************************
     * PQGrid Column
     ********************************************************************/
    // 거래내역
    let col_trDtls = [
      {
        title: "거래순번",
        dataType: "string",
        dataIndx: "trSn",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "실행순번",
        dataType: "string",
        dataIndx: "excSn",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래일자",
        dataType: "string",
        dataIndx: "trDt",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "거래상태",
        dataType: "string",
        dataIndx: "trStatCd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.E026,
        },
        render: function (ui) {
          let fSel = grdSelect.E026.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "거래종류",
        dataType: "string",
        dataIndx: "etprCrdtGrntTrKindCd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.E025,
        },
        render: function (ui) {
          let fSel = grdSelect.E025.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "거래통화코드",
        dataType: "string",
        dataIndx: "trCrryCd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산율",
        dataType: "float",
        dataIndx: "krwTrslRt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산거래원금",
        dataType: "integer",
        dataIndx: "krwTrslTrPrca",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산거래이자금액",
        dataType: "integer",
        dataIndx: "krwTrslTrIntAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산거래수수료금액",
        dataType: "integer",
        dataIndx: "krwTrslTrFeeAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래금액",
        dataType: "integer",
        dataIndx: "dealTrAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래원금",
        dataType: "integer",
        dataIndx: "dealTrPrca",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래이자",
        dataType: "float",
        dataIndx: "trIntAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래수수료",
        dataType: "integer",
        dataIndx: "trFeeAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래후대출잔액",
        dataType: "string",
        dataIndx: "trAfLoanRmnd",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래부서코드",
        dataType: "string",
        dataIndx: "orgno",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래직원번호",
        dataType: "string",
        dataIndx: "trStfno",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 이자계산내역
    let col_intrTrDtls = [
      {
        title: "이자계산순번",
        dataType: "string",
        dataIndx: "intCalcSeq",
        halign: "center",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기산일자",
        dataType: "string",
        dataIndx: "rkfrDt",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "이자계산시작일자",
        dataType: "string",
        dataIndx: "intrCalcStrtDt",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "이자계산종료일자",
        dataType: "string",
        dataIndx: "intrCalcEndDt",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "원리금유형코드",
        dataType: "string",
        dataIndx: "paiTypCd",
        halign: "center",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.P013,
        },
        render: function (ui) {
          let fSel = grdSelect.P013.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "대상일수",
        dataType: "string",
        dataIndx: "trgtDnum",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환회차",
        dataType: "string",
        dataIndx: "rdmpTmrd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용금리",
        dataType: "string",
        dataIndx: "aplyIntr",
        halign: "center",
        align: "right",
        width: "10%",
        // format   : "#.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "딜대상금액",
        dataType: "integer",
        dataIndx: "dealTrgtAmt",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이자금액",
        dataType: "integer",
        dataIndx: "nrmlIntAmt",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 수수료수납내역
    let col_feeRcivDtls = [
      {
        title: "순번",
        dataType: "string",
        dataIndx: "feeSn",
        halign: "center",
        align: "center",
        width: "3%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료종류",
        dataType: "string",
        dataIndx: "eprzCrdlFeeKndCd",
        halign: "center",
        align: "left",
        width: "25%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.E008,
        },
        render: function (ui) {
          let fSel = grdSelect.E008.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "수수료기준금액",
        dataType: "integer",
        dataIndx: "eprzCrdlFeeStdrAmt",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료대상내용",
        dataType: "string",
        dataIndx: "feeTrgtCtns",
        halign: "center",
        align: "left",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료율",
        dataType: "float",
        dataIndx: "feeRt",
        halign: "center",
        align: "right",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료금액",
        dataType: "integer",
        dataIndx: "feeAmt",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료인식구분",
        dataType: "string",
        dataIndx: "eprzCrdlFeeRcogDcd",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.F006,
        },
        render: function (ui) {
          let fSel = grdSelect.F006.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "부가세액",
        dataType: "integer",
        dataIndx: "splmTxa",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료과세여부",
        dataType: "string",
        dataIndx: "feeTxtnYn",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "value",
          labelIndx: "key",
          options: [
            {
              key: "Y",
              value: "1",
            },
            {
              key: "N",
              value: "0",
            },
          ],
        },
        render: function (ui) {
          let options = [
            {
              key: "Y",
              value: "1",
            },
            {
              key: "N",
              value: "0",
            },
          ];
          // console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
          // console.log("options{}", options);
          let option = options.find((opt) => opt.value == ui.cellData);
          return option ? option.key : ui.cellData;
        },
      },
      {
        title: "과세유형구분",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.T006,
        },
        render: function (ui) {
          let fSel = grdSelect.T006.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이연비율",
        dataType: "string",
        dataIndx: "fnnrPrlnRto",
        halign: "center",
        align: "right",
        width: "15%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "인식시작일자",
        dataType: "string",
        dataIndx: "fnnrRcogStrtDt",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "인식종료일자",
        dataType: "string",
        dataIndx: "fnnrRcogEndDt",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "이연기간일수",
        dataType: "string",
        dataIndx: "fnnrPrlnPrdDnum",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "일시인식금액",
        dataType: "integer",
        dataIndx: "dtmRcogAmt",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이연수수료금액",
        dataType: "integer",
        dataIndx: "prlnFee",
        halign: "center",
        align: "right",
        width: "20%",
        format: "#,###.00",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    // 실행금리정보
    let col_excIntrtInf = [
      {
        title: "시작일자",
        dataType: "string",
        dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cd = ui.cellData;
          if (cd) {
            return formatDate(cd);
          }
        },
      },
      {
        title: "종료일자",
        dataType: "string",
        dataIndx: "aplyEndDt",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cd = ui.cellData;
          if (cd) {
            return formatDate(cd);
          }
        },
      },
      {
        title: "기준금리종류",
        dataType: "string",
        dataIndx: "stdrIntrtKndCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.S003,
        },
        render: function (ui) {
          let fSel = grdSelect.S003.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "고정금리",
        dataType: "string",
        dataIndx: "fxnIntrt",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "가산금리",
        dataType: "string",
        dataIndx: "addIntrt",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "변동주기유형",
        dataType: "string",
        dataIndx: "intrtCngeFrqcCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.I013,
        },
        render: function (ui) {
          let fSel = grdSelect.I013.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리변동주기수",
        dataType: "string",
        dataIndx: "intrtCngeFrqcMnum",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용일수구분",
        dataType: "string",
        dataIndx: "aplyDnumDcd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.A007,
        },
        render: function (ui) {
          let fSel = grdSelect.A007.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리적용일수",
        dataType: "string",
        dataIndx: "stdrIntrtAplyDnum",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    let pqGridObjs = [
      {
        height: 150,
        maxHeight: 150,
        id: "grd_trDtls",
        colModel: col_trDtls,
        scrollModel: { autoFit: false },
        selectionModel: { type: "row" },
      },
      {
        height: 150,
        maxHeight: 150,
        id: "grd_intrTrDtls",
        colModel: col_intrTrDtls,
        scrollModel: { autoFit: false },
      },
      {
        height: 150,
        maxHeight: 150,
        id: "grd_feeRcivDtls",
        colModel: col_feeRcivDtls,
        scrollModel: { autoFit: false },
      },
      {
        height: 150,
        maxHeight: 150,
        id: "grd_excIntrtInf",
        colModel: col_excIntrtInf,
        //   , scrollModel : { autoFit: false }
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    trDtls = $("#grd_trDtls").pqGrid("instance");
    intrTrDtls = $("#grd_intrTrDtls").pqGrid("instance");
    feeRcivDtls = $("#grd_feeRcivDtls").pqGrid("instance");
    excIntrtInf = $("#grd_excIntrtInf").pqGrid("instance");
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  // 실행일련번호 조회
  function srchExcSn(e) {
    let prdtCd = e;
    let obj = {};

    if (!isEmpty(prdtCd)) {
      // console.log(prdtCd);
      $("#TB07060S_excSn").attr("disabled", false);
    }

    obj = {
      prdtCd,
    };

    $.ajax({
      type: "POST",
      url: "/TB07060S/srchExcSn",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      beforeSend: function (xhr) {
        bfReset();
      },
      success: function (data) {
        // console.log(data);
        //$('#btnSrch').attr('disabled', false);
        $("#TB07060S_excSn").html("");
        let html = "";
        //console.log("data 유무: ::: ", data);

        if (data && data.length > 0) {
          // console.log(data.length);
          html += '<option value="">전체</option>';
          data.forEach((item) => {
            // console.log(item.EXC_SN)
            html +=
              '<option value="' +
              item.EXC_SN +
              '">' +
              item.EXC_SN +
              "</option>";
          });
          $("#TB07060S_excSn").append(html);
          srch();
        } else {
          $("#TB07060S_excSn").attr("disabled", true);
          $("#btnSrch").attr("disabled", true);

          sf(1, "warning", "조회된 실행일련번호가 없습니다.");
          return;
        }
      },
    });
  }

  // 조회
  function srch() {
    if (validation().isValid) {
      let obj = {
        prdtCd: validation().prdtCd,
        excSn: $("#TB07060S_excSn").val(),
        srchF: "1",
      };

      // console.log("srch :::::::::::::::::::", obj);
      $.ajax({
        type: "POST",
        url: "/TB07060S/srchCrdlLdg",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          bfReset();
        },
        success: function (data) {
          // console.log(data);
          if (data) {
            // console.log(data.prgSttsCd);
            /* TODO: IBIMS401B에 있는 모든 항목을 가져오게 해놨는데 아직 없는 데이터가 많아서 추후 확인 및 수정 필요 */
            /* ROW1 */
            $("#TB07060S_ptxtTrOthrDscmNo").val(
              checkBrnAcno(data.ptxtTrOthrDscmNo)
            ); // 거래상대방 사업자등록번호
            $("#TB07060S_ptxtTrOthrDscmNm").val(data.ptxtTrOthrDscmNm); // 거래상대방 법인명
            $("#TB07060S_I011").val(data.prgSttsCd); // 진행상태
            $("#TB07060S_L001_1").val(data.eprzCrdlLdgSttsCd); // 원장상태
            /* ROW2 */
            $("#TB07060S_E022").val(data.prdtLclsCd); // 상품대분류
            $("#TB07060S_E023").val(data.prdtMdclCd); // 상품중분류
            $("#TB07060S_E021").val(data.prdtClsfCd); // 상품소분류
            /* ROW3 */
            $("#TB07060S_ctrcAmt").val(commaNull(data.eprzCrdlCtrcAmt)); // 약정금액
            $("#TB07060S_dealExcBlce").val(commaNull(data.dealExcBlce)); // 대출/채무보증잔액
            $("#TB07060S_I027_1").val(data.crryCd); // 통화코드
            $("#TB07060S_E010").val(data.eprzCrdlIndvLmtDcd); // 한도구분
            /* ROW4 */
            $("#TB07060S_ctrcDt").val(formatDate(data.ctrcDt)); // 약정일자
            $("#TB07060S_ctrcExpDt").val(formatDate(data.ctrcExpDt)); // 만기일자
            $("#TB07060S_E020").val(data.eprzCrdlPaiRdmpDcd); // 상환방법
            $("#TB07060S_rdmpMnum").val(data.prnaRdmpFrqcMnum); // 상환개월

            // $('#TB07060S_intrHndCalYn').val(intrHdwtClcYn);                          // 이자수기계산여부(네임)
            // console.log(data.intrHdwtClcYn);
            if (!data.intrHdwtClcYn) {
              data.intrHdwtClcYn = "0";
            }
            $(
              `input[name="TB07060S_intrHdwtClcYn"][value="${data.intrHdwtClcYn}"]`
            ).prop("checked", true); // 수납완료여부
            /* ROW5 */
            $("#TB07060S_S003").val(data.stdrIntrtKndCd); // 금리구분
            $("#TB07060S_stdrIntrt").val(data.stdrIntrt); // 기준금리
            $("#TB07060S_addIntrt").val(data.addIntrt); // 가산금리
            $("#TB07060S_totIntrt").val(data.totIntrt); // 총금리
            $("#TB07060S_E019").val(data.eprzCrdlOvduIntrRtDcd); // 연체이자구분
            $("#TB07060S_ovduIntrRt").val(data.ovduIntrRt); // 연체이자율
            $("#TB07060S_E011").val(data.eprzCrdlIntrBnaoDcd); // 이자방법
            $("#TB07060S_intrMnum").val(data.intrRdmpFrqcMnum); // 이자개월
            /* ROW6 */
            $("#TB07060S_E024").val(data.eprzCrdlTfdLyAplyDcd); // 이자초말일적용
            $("#TB07060S_H001").val(data.eprzCrdlHldyPrcsDcd); // 휴일처리구분
            $("#TB07060S_E013").val(data.eprzCrdlIntrDnumClcMthCd); // 일수계산방법
            $("#TB07060S_I019").val(data.eprzCrdlIntrSnnoPrcsDcd); // 이자단수법구분
            /* ROW7 */
            $("#TB07060S_cclcDt").val(formatDate(data.cclcDt)); // 해지일자
            $("#TB07060S_E005").val(data.eprzCrdlCclcRsnCd); // 해지사유코드
            $("#TB07060S_mngmBdcd").val(data.mngmBdcd); // 운용부서코드
            $("#TB07060S_mngmBdcdNm").val(data.mngmBdcdNm); // 운용부서명
            $("#TB07060S_chrrEmpno").val(data.chrrEmpno); // 담당자사번
            $("#TB07060S_chrrEmpnm").val(data.chrrEmpnm); // 담당자명
            /* ROW8 */
            $("#TB07060S_cclcRsnCtns").val(data.cclcRsnCtns); // 해지사유내용
            /* ROW9 */
            $("#TB07060S_eprzCrdlOrtnFndCd").val(data.eprzCrdlOrtnFndCd); // 펀드코드
            $("#TB07060S_eprzCrdlOrtnFndNm").val(data.eprzCrdlOrtnFndNm); // 펀드명
            $("#TB07060S_dwnPfmc").val(); // 셀다운실적
            $("#TB07060S_apvlAmt").val(
              commaNull(data.eprzCrdlApvlAmt.toFixed(2))
            ); // 승인금액
            $("#TB07060S_rdmpPfmc").val(commaNull(data.dealTrPrca)); // 상환실적
            /* ROW10 */
            // console.log("실행금액 ::: ", data.dealExcAmt);

            $("#TB07060S_excAmt").val(commaNull(data.dealExcAmt)); // 실행금액
            $("#TB07060S_thcoExpsr").val(); // 당사익스포저

            // console.log("data.trDtls:::::::::::::::::",data.trDtls);
            trDtls.setData(data.trDtls); // 딜거래내역

            /* Tab2 실행원장 */
            if (data.ibims402BDTO) {
              // console.log('실행원장');

              $("#TB07060S_L001_2").val(
                data.ibims402BDTO.ldgSttsCd ? data.ibims402BDTO.ldgSttsCd : ""
              ); // 실행상태코드
              $("#TB07060S_I027_2").val(data.ibims402BDTO.crryCd); // 통화코드
              $("#TB07060S_excDt").val(dateNull(data.ibims402BDTO.excDt)); // 실행일자
              $("#TB07060S_expDt").val(dateNull(data.ibims402BDTO.expDt)); // 만기일자
              $("#TB07060S_dealExcAmt").val(
                commaNull(data.ibims402BDTO.dealExcAmt)
              ); // 실행금액
              //console.log("data.ibims402BDTO.dealExcBlce:::",data.ibims402BDTO.dealExcBlce);
              $("#TB07060S_dealExcBlce_2").val(
                commaNull(data.ibims402BDTO.dealExcBlce)
              ); // 실행잔액
              $("#TB07060S_prnaDfrPrdMnum").val(
                data.ibims402BDTO.prnaDfrPrdMnum
              ); // 거치기간개월수
              $("#TB07060S_dfrExpMnum").val(data.ibims402BDTO.dfrExpMnum); // 거치만기개월수
              $("#TB07060S_lastIntrClcDt").val(
                dateNull(data.ibims402BDTO.lastIntrClcDt)
              ); // 최종이자계산일자
              $("#TB07060S_nxtRdmpPrarDt").val(
                dateNull(data.ibims402BDTO.nxtRdmpPrarDt)
              ); // 다음원금납일일자 ? 다음상환예정일자
              $("#TB07060S_nxtIntrPymDt").val(
                dateNull(data.ibims402BDTO.nxtIntrPymDt)
              ); // 다음이자납입일자
              $("#TB07060S_prnaRdmpFrqcMnum").val(
                data.ibims402BDTO.prnaRdmpFrqcMnum
              ); // 원금상환주기
              $("#TB07060S_intrRdmpFrqcMnum").val(
                data.ibims402BDTO.intrRdmpFrqcMnum
              ); // 이자상환주기
              $("#TB07060S_I017").val(data.ibims402BDTO.intrPymDtCd); // 상환지정일
              $("#TB07060S_prnaOvduDt").val(
                dateNull(data.ibims402BDTO.prnaOvduDt)
              ); // 원금연체시작일자
              $("#TB07060S_intrOvduDt").val(
                dateNull(data.ibims402BDTO.intrOvduDt)
              ); // 이자연체시작일자
              $("#TB07060S_totRdmpTmrd").val(data.ibims402BDTO.totRdmpTmrd); // 총상환회차
              $("#TB07060S_lastRdmpTmrd").val(data.ibims402BDTO.lastRdmpTmrd); // 최종상환회차
              $("#TB07060S_dealIstmBlce").val(
                data.ibims402BDTO.dealIstmBlce
                  ? comma(data.ibims402BDTO.dealIstmBlce)
                  : (data.ibims402BDTO.dealIstmBlce = 0)
              ); // 할부잔액
              $("#TB07060S_dealEqlRdmpAmt").val(
                data.ibims402BDTO.dealEqlRdmpAmt
                  ? comma(data.ibims402BDTO.dealEqlRdmpAmt)
                  : (data.ibims402BDTO.dealEqlRdmpAmt = 0)
              ); // 균등상환금액
              $("#TB07060S_istmDtmRdmpAmt").val(
                data.ibims402BDTO.istmDtmRdmpAmt
                  ? comma(data.ibims402BDTO.istmDtmRdmpAmt)
                  : (data.ibims402BDTO.istmDtmRdmpAmt = 0)
              ); // 할부일시상환금
              $("#TB07060S_rcvbIntrAmt").val(
                commaNull(data.ibims402BDTO.rcvbIntrAmt)
              ); // 미수이자
              $("#TB07060S_lastPrnaRdmpDt").val(
                dateNull(data.ibims402BDTO.lastPrnaRdmpDt)
              ); // 최종원금상환일자
              $("#TB07060S_krwTrslRt").val(data.ibims402BDTO.krwTrslRt); // 적용환율
              $("#TB07060S_krwTrslExcAmt").val(
                commaNull(data.ibims402BDTO.krwTrslExcAmt)
              ); // 원화환산금액
            }

            // 거래내역 rowSelct Event
            trDtls.on("rowSelect", function (event, ui) {
              if (ui.addList[0]) {
                const rd = ui.addList[0].rowData;
                // rowDblClick
                // const rd = ui.rowData;
                // console.log('탕탕후루루탕탕후루루루::: ', ui);

                //console.log("trSn ::: ", rd.trSn, "excSn :::: ", rd.excSn);
                let obj = {
                  prdtCd: validation().prdtCd,
                  srchF: "2",
                  trSn: rd.trSn,
                  excSn: rd.excSn,
                };

                // console.log(obj);
                $.ajax({
                  type: "POST",
                  url: "/TB07060S/srchCrdlLdg",
                  contentType: "application/json; charset=UTF-8",
                  data: JSON.stringify(obj),
                  dataType: "json",
                  success: function (data) {
                    // console.log(data)
                    intrTrDtls.setData(data.intrTrDtls); // 이자계산내역
                    feeRcivDtls.setData(data.feeRcivDtls); // 수수료수납내역
                  },
                });
              } else {
                intrTrDtls.setData([]);
                feeRcivDtls.setData([]);
              }
            });
          } else {
            sf(1, "warning", "조회된 정보가 없습니다.");
          }
        },
        error: function (result) {
          const res = JSON.stringify(result);
          // console.log(res);
          sf(1, "warning", "조회에 실패하였습니다.");
        },
      });
    }
  }

  // tab1_거래내역 조회
  function inqTrDtls() {
    let obj = {
      prdtCd: $("#TB07060S_prdtCd").val(),
      excSn: $("#TB07060S_excSn").val(),
    };

    // const chkObj = Object.values(obj).every(value => value)

    if (obj.prdtCd) {
      $.ajax({
        type: "POST",
        url: "/TB07060S/inqTrDtls",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          resetTab1Grd();
        },
        success: function (data) {
          // console.log(data);
          trDtls.setData(data.trDtls); // 딜거래내역
        },
      });
    } else {
      resetTab1Grd();
    }
  }

  // tab2_실행원장 조회
  function inqExcLdg() {
    let obj = {
      prdtCd: $("#TB07060S_prdtCd").val(),
      excSn: $("#TB07060S_excSn").val(),
    };

    const chkObj = Object.values(obj).every((value) => value);

    if (chkObj) {
      $.ajax({
        type: "POST",
        url: "/TB07060S/inqExcLdg",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          excLdgReset();
        },
        success: function (data) {
          //console.log('tab2_실행원장', data);
          if (data) {
            $("#TB07060S_L001_2").val(data.ldgSttsCd ? data.ldgSttsCd : ""); // 실행상태코드
            $("#TB07060S_I027_2").val(data.crryCd); // 통화코드
            $("#TB07060S_excDt").val(dateNull(data.excDt)); // 실행일자
            $("#TB07060S_expDt").val(dateNull(data.expDt)); // 만기일자
            $("#TB07060S_dealExcAmt").val(commaNull(data.dealExcAmt)); // 실행금액
            //console.log("data.dealExcBlce:::",data.dealExcBlce);
            $("#TB07060S_dealExcBlce_2").val(commaNull(data.dealExcBlce)); // 실행잔액
            $("#TB07060S_prnaDfrPrdMnum").val(data.prnaDfrPrdMnum); // 거치기간개월수
            $("#TB07060S_dfrExpMnum").val(data.dfrExpMnum); // 거치만기개월수
            $("#TB07060S_lastIntrClcDt").val(dateNull(data.lastIntrClcDt)); // 최종이자계산일자
            $("#TB07060S_nxtRdmpPrarDt").val(dateNull(data.nxtRdmpPrarDt)); // 다음원금납일일자 ? 다음상환예정일자
            $("#TB07060S_nxtIntrPymDt").val(dateNull(data.nxtIntrPymDt)); // 다음이자납입일자
            $("#TB07060S_prnaRdmpFrqcMnum").val(data.prnaRdmpFrqcMnum); // 원금상환주기
            $("#TB07060S_intrRdmpFrqcMnum").val(data.intrRdmpFrqcMnum); // 이자상환주기
            $("#TB07060S_I017").val(data.intrPymDtCd); // 상환지정일
            $("#TB07060S_prnaOvduDt").val(dateNull(data.prnaOvduDt)); // 원금연체시작일자
            $("#TB07060S_intrOvduDt").val(dateNull(data.intrOvduDt)); // 이자연체시작일자
            $("#TB07060S_totRdmpTmrd").val(data.totRdmpTmrd); // 총상환회차
            $("#TB07060S_lastRdmpTmrd").val(data.lastRdmpTmrd); // 최종상환회차
            $("#TB07060S_dealIstmBlce").val(
              data.dealIstmBlce
                ? comma(data.dealIstmBlce)
                : (data.dealIstmBlce = 0)
            ); // 할부잔액
            $("#TB07060S_dealEqlRdmpAmt").val(
              data.dealEqlRdmpAmt
                ? comma(data.dealEqlRdmpAmt)
                : (data.dealEqlRdmpAmt = 0)
            ); // 균등상환금액
            $("#TB07060S_istmDtmRdmpAmt").val(
              data.istmDtmRdmpAmt
                ? comma(data.istmDtmRdmpAmt)
                : (data.istmDtmRdmpAmt = 0)
            ); // 할부일시상환금
            $("#TB07060S_rcvbIntrAmt").val(commaNull(data.rcvbIntrAmt)); // 미수이자
            $("#TB07060S_lastPrnaRdmpDt").val(dateNull(data.lastPrnaRdmpDt)); // 최종원금상환일자
            $("#TB07060S_krwTrslRt").val(data.krwTrslRt); // 적용환율
            $("#TB07060S_krwTrslExcAmt").val(commaNull(data.krwTrslExcAmt)); // 원화환산금액
          }
        },
      });
    } else {
      excLdgReset();
    }
  }

  // tab3 실행금리정보
  function inqExcIntrtInf() {
    let obj = {
      prdtCd: $("#TB07060S_prdtCd").val(),
      excSn: $("#TB07060S_excSn").val(),
    };

    const chkObj = Object.values(obj).every((value) => value);
    if (chkObj) {
      $.ajax({
        type: "POST",
        url: "/TB07080S/getIntrtData",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          excIntrtInf.setData([]);
        },
        success: function (data) {
          if (data.length > 0) {
            excIntrtInf.setData(data);
          }
        },
        error: function (result) {},
      });
    } else {
      excIntrtInf.setData([]);
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation() {
    let prdtCd = $("#TB07060S_prdtCd").val(); // 종목코드
    let excSn = $("#TB07060S_excSn").val(); // 실행일련번호

    if (!prdtCd) {
      sf(1, "warning", "종목코드를 입력해주세요.");
      return { isValid: false };
    }

    // if ( excSn ) {
    //     Swal.fire({
    //         icon: 'warning'
    //         , text: "실행일련번호가 없습니다."
    //         , confirmButtonText: "확인"
    //     });
    //     return { isValid : false };
    // };

    return { isValid: true, prdtCd };
  }

  /*******************************************************************
   * 초기화
   *******************************************************************/
  // 페이지 로드 시 초기 값
  function resetDd() {
    // 페이지 로드 시, 입력 요소의 초기 값을 저장합니다.
    $('input[id^="TB07060S"]').each(function () {
      const $this = $(this);
      //console.log($this.attr('id'));
      initialValues[$this.attr("id")] = $this.val();
      //console.log(initialValues);
    });
  }

  // 초기화
  function reset() {
    $('input[id^="TB07060S"]').each(function () {
      const $this = $(this);
      //console.log($this);
      $this.val(initialValues[$this.attr("id")]);
    });

    $("select").each(function () {
      const $this = $(this);
      const id = $this.attr("id");

      // if (id.includes('I027')) {
      // 	// 'I027'이 포함된 select 요소의 경우, value를 'KRW'로 설정
      // 	$this.val('KRW');
      // } else {
      // 	// 나머지 select 요소의 경우, 첫 번째 옵션을 선택
      // 	$this.prop('selectedIndex', 0);
      // }
      $this.prop("selectedIndex", 0);
    });

    // 버튼 클릭 시 탭 1로 이동하는 코드
    // $('#tab1').on('click', function (e) {
    //     e.preventDefault();

    // });
    $("#TB07060S_excSn").html("");
    $("#TB07060S_excSn").attr("disabled", true);

    // $('#tab1').tab('show'); // 탭 1을 활성화
    trDtls.setData([]);
    intrTrDtls.setData([]);
    feeRcivDtls.setData([]);
    excIntrtInf.setData([]);
  }

  // ajax전
  function bfReset() {
    $('input[id^="TB07060S"]')
      .filter(function () {
        const id = $(this).attr("id");
        return (
          id !== "TB07060S_prdtCd" &&
          id !== "TB07060S_prdtNm" &&
          id !== "TB07060S_excSn"
        );
      })
      .each(function () {
        const $this = $(this);
        //console.log($this);
        $this.val(initialValues[$this.attr("id")]);
      });

    $("select")
      .filter(function () {
        return $(this).attr("id") !== "TB07060S_excSn";
      })
      .each(function () {
        const $this = $(this);
        $this.prop("selectedIndex", 0);
      });

    // $('#TB07060S_excSn').html('');
    // $('#TB07060S_excSn').attr('disabled', true);

    //$('#tab1').tab('show'); // 탭 1을 활성화
    trDtls.setData([]);
    intrTrDtls.setData([]);
    feeRcivDtls.setData([]);
  }

  // tab2_실행원장 초기화
  function excLdgReset() {
    // 특정 클래스 하위의 ID로 시작하는 input 요소를 모두 선택
    const inputs = $('.tab-content input[id^="TB07060S_"]');

    // 선택된 input 요소들을 출력 (또는 원하는 작업 수행)
    inputs.each(function () {
      const $this = $(this);
      $this.val(initialValues[$this.attr("id")]);
    });

    const select = $(".tab-content select");

    select.each(function () {
      //console.log($(this))
      const $this = $(this);
      $this.prop("selectedIndex", 0);
    });
  }

  // Tab1 그리드 초기화
  function resetTab1Grd() {
    trDtls.setData([]); // 거래내역
    intrTrDtls.setData([]); // 이자계산내역
    feeRcivDtls.setData([]); // 수수료수납내역
  }

  /*******************************************************************
   * Event
   *******************************************************************/
  // tab1 거래내역
  $("#TB07060S_tab1").on("click", function () {
    // trDtls.refresh()
    // intrTrDtls.refresh()
    // feeRcivDtls.refresh()
    inqTrDtls();
  });

  // tab2 실행원장
  $("#TB07060S_tab2").on("click", function () {
    inqExcLdg();
  });

  // tab3 실행금리정보
  $("#TB07060S_tab3").on("click", function () {
    //    excIntrtInf.refresh();
    inqExcIntrtInf();
  });

  // 실행순번 event
  $("#TB07060S_excSn").on("change", function () {
    inqTrDtls();
    inqExcLdg();
    inqExcIntrtInf();
  });

  // return comma or
  function commaNull(p) {
    return p ? comma(p) : "0";
  }

  // return dateFormat or
  function dateNull(p) {
    return p ? formatDate(p) : p;
  }

  // swal.fire
  function sf(flag, icon, html, callback = () => {}) {
    if (flag === 1) {
      Swal.fire({
        icon: `${icon}`,
        html: `${html}`,
        confirmButtonText: "확인",
      }).then(callback);
    }

    if (flag === 2) {
      Swal.fire({
        icon: `${icon}`,
        html: `${html}를(을) 확인해주세요.`,
        confirmButtonText: "확인",
      }).then(callback);
    }
  }

  return {
    srch: srch,
    reset: reset,
    srchExcSn: srchExcSn,
  };
})();
