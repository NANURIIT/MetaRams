const TB07150Sjs = (function () {
  let rtnSel_TB07150S_TB07150S = {}; // return selectBox
  let intrtInf_1; // grid instance
  let intrtInf_2;
  let initVal = {}; // 초기값
  let fltObj = {}; // filter selectBox
  let _tempObj = {}; // 종목코드 임시로 저장

  $(document).ready(function () {
    getSels(); // selectBox

    $("#TB07150S_prcsDt").val(getToday()); //처리일자 오늘날짜로 set

    $("#TB07150S_prcsDt").prop("disabled", true); //처리일자
    $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
    $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
    $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
    $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
    $("#TB07150S_E020_2").prop("disabled", true); //상환방법
    $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
    $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
    $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
    $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
    $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
    $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
    $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
    $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
    $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

    $("#trOthrSrchBtn").prop("disabled", true);

    initVal = getBasicValues("TB07150S"); // 초기화 초기 세팅

    selectorNumberFormater(
      $('div[data-menuid="/TB07150S"]').find(
        `input[id$='Amt']
       , input[id$='Blce']
       , input[id$='Exrt']
       , input[id$='Mnum']
       , input[id$='Tmrd']
       , input[id$='Qnt']
       , input[id$='Shqt']
       , input[id$='Unpr']
       , input[id$='Rt']`)
    );

    // $("input").on("focus", function () {
    //   $(this).select();
    // });
    getDealInfoFromWF();
  });

  /*******************************************************************
   * selectBox
   *******************************************************************/
  function getSels() {
    rtnSel_TB07150S = getSelectBoxList(
      "TB07150S",
      "I011/" + // I011 심사진행상태코드 				INSPCT_PRGRS_ST_CD
        "E020/" + // E020 기업여신원리금상환구분코드	 EPRZ_CRDL_PAI_RDMP_DCD
        "I005/" + // I005 기업여신개별한도구분코드		 INDV_LMT_DCD
        "H001/" + // H001 휴일처리구분코드				HLDY_PRCS_DCD
        "E011/" + // E011 기업여신이자선후취구분코드	 EPRZ_CRDL_INTR_BNAO_DCD
        "S003/" + // S003 기준금리종류코드				STDR_INTRT_KND_CD
        "A007/" + // A007 적용일수구분코드				APLY_DNUM_DCD
        "I013/" + // I013 금리변동주기코드				INTRT_CNGE_FRQC_CD
        "R023/" + // R023 기업여신신청종류코드			RQS_KND_CD
        "A005/" + // A005 계정과목코드             ACTS_CD
        "E013", // E013 기업여신이자일수계산방법코드	 EPRZ_CRDL_INTR_DNUM_CLC_MTH_CD
      false
    );

    // 그리드에서 사용하기 위해 filter or 중복된 공통코드 사용 시
    fltObj.I011 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "I011");
    fltObj.E020 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "E020");
    fltObj.I005 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "I005");
    fltObj.H001 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "H001");
    fltObj.E011 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "E011");
    fltObj.E013 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "E013");
    fltObj.S003 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "S003");
    fltObj.A007 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "A007");
    fltObj.I013 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "I013");
    fltObj.R023 = rtnSel_TB07150S.filter((item) => item.cmnsGrpCd === "R023");

    // 중복 selectBox binding
    fltObj.E020.forEach((item) => {
      $("#TB07150S_E020_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });
    fltObj.I005.forEach((item) => {
      $("#TB07150S_I005_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });
    fltObj.H001.forEach((item) => {
      $("#TB07150S_H001_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });
    fltObj.E011.forEach((item) => {
      $("#TB07150S_E011_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });
    fltObj.E013.forEach((item) => {
      $("#TB07150S_E013_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });

    pqGrid_TB07150S(); // pgGrid
  }

  // 조건변경_신청종류 변경 시
  $("#TB07150S_R023_1").on("change", function () {
    var ctgry = $(this).val();

    if (ctgry == "02") {
      //한도변경
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", false); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", true);

      $("#TB07150S_plsBtn").prop("disabled", true);             
      $("#TB07150S_mnsBtn").prop("disabled", true);
    } else if (ctgry == "03") {
      //기한변경
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", false); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", true);

      $("#TB07150S_plsBtn").prop("disabled", true);             
      $("#TB07150S_mnsBtn").prop("disabled", true);
    } else if (ctgry == "31") {
      //기한연장 + 금리변경
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", false); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", true);

      $("#TB07150S_plsBtn").prop("disabled", true);             
      $("#TB07150S_mnsBtn").prop("disabled", true);
    } else if (ctgry == "04") {
      //금리변경
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", true);

      $("#TB07150S_plsBtn").prop("disabled", false);             
      $("#TB07150S_mnsBtn").prop("disabled", false);
    } else if (ctgry == "06") {
      //차주변경
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", false); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", false); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", false);

      $("#TB07150S_plsBtn").prop("disabled", true);             
      $("#TB07150S_mnsBtn").prop("disabled", true);
    } else {
      $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
      $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
      $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
      $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
      $("#TB07150S_E020_2").prop("disabled", true); //상환방법
      $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
      $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
      $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
      $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
      $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
      $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
      $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
      $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
      $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

      $("#trOthrSrchBtn").prop("disabled", true);

      $("#TB07150S_plsBtn").prop("disabled", true);             
      $("#TB07150S_mnsBtn").prop("disabled", true);
    }
  });
  
  /*******************************************************************
   * PqGrid
   *******************************************************************/
  function pqGrid_TB07150S() {
    /**
     * PQGrid column header
     */
    // 상단 금리정보
    let col_intrtInf_1 = [
      {
        title: "시작일자",
        dataType: "string",
        dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        // width    : "5%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length === 8) {
            return formatDate(cellData);
          }
          return cellData;
        },
      },
      {
        title: "종료일자",
        dataType: "string",
        dataIndx: "aplyEndDt",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length === 8) {
            return formatDate(cellData);
          }
          return cellData;
        },
      },
      {
        title: "기준금리종류",
        dataType: "string",
        dataIndx: "stdrIntrtKndCd",
        halign: "center",
        align: "center",
        // width    : "12%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.S003,
        },
        render: function (ui) {
          let fSel = fltObj.S003.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "고정금리",
        dataType: "string",
        dataIndx: "fxnIntrt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "가산금리",
        dataType: "string",
        dataIndx: "addIntrt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "변동주기유형",
        dataType: "string",
        dataIndx: "intrtCngeFrqcCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.I013,
        },
        render: function (ui) {
          let fSel = fltObj.I013.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리변동주기수",
        dataType: "string",
        dataIndx: "intrtCngeFrqcMnum",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용일수구분",
        dataType: "string",
        dataIndx: "aplyDnumDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.A007,
        },
        render: function (ui) {
          let fSel = fltObj.A007.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리적용일수",
        dataType: "string",
        dataIndx: "stdrIntrtAplyDnum",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        hidden: true,
      },
    ];

    // 하단 금리정보
    let col_intrtInf_2 = [
      {
        title: "삭제",
        dataType: "checkbox",
        dataIndx: "delYn",
        align: "center",
        minWidth: 36,
            maxWidth: 36,
        type: "checkBoxSelection",
        editable: true,
        editor: false,
        filter: { crules: [{ condition: "range" }] },
        cb: {
          all: true,
          header: true,
          check: "Y",
          uncheck: "N",
        },
      },
      {
        title: "시작일자",
        dataType: "string",
        dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        // width    : "5%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length === 8) {
            return formatDate(cellData);
          }
          return cellData;
        },
      },
      {
        title: "종료일자",
        dataType: "string",
        dataIndx: "aplyEndDt",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length === 8) {
            return formatDate(cellData);
          }
          return cellData;
        },
      },
      {
        title: "기준금리종류",
        dataType: "string",
        dataIndx: "stdrIntrtKndCd",
        halign: "center",
        align: "center",
        // width    : "12%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.S003,
          init: function (ui) {
          	initSelectAutoOpen(ui, fltObj.S003.length);
          }
        },
        render: function (ui) {
          let fSel = fltObj.S003.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "고정금리",
        dataType: "string",
        dataIndx: "fxnIntrt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "가산금리",
        dataType: "string",
        dataIndx: "addIntrt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "변동주기유형",
        dataType: "string",
        dataIndx: "intrtCngeFrqcCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.I013,
          init: function (ui) {
          	initSelectAutoOpen(ui, fltObj.I013.length);
          }
        },
        render: function (ui) {
          let fSel = fltObj.I013.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리변동주기수",
        dataType: "string",
        dataIndx: "intrtCngeFrqcMnum",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        // editor     : {
        // 	type      : "select",
        // 	valueIndx : "cdValue",
        // 	labelIndx : "cdName",
        // 	options   : F006
        // },
        // render   : function(ui) {
        // 	let fSel = F006.find(({ cdValue }) => cdValue == ui.cellData );
        // 	return fSel ? fSel.cdName : ui.cellData;
        // },
      },
      {
        title: "적용일수구분",
        dataType: "string",
        dataIndx: "aplyDnumDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fltObj.A007,
          init: function (ui) {
          	initSelectAutoOpen(ui, fltObj.A007.length);
          }
        },
        render: function (ui) {
          let fSel = fltObj.A007.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "금리적용일수",
        dataType: "string",
        dataIndx: "stdrIntrtAplyDnum",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        hidden: true,
      },
      {
        title: "실행일련번호",
        dataType: "string",
        dataIndx: "excSn",
        hidden: true,
      },
      {
        title: "등록일련번호",
        dataType: "string",
        dataIndx: "rgstSn",
        hidden: true,
      },
    ];

    /**
     * PQGrid
     */
    let obj = [
      {
        height: 100,
        maxHeight: 400,
        id: "grd_intrtInf_1",
        colModel: col_intrtInf_1,
      },
      {
        height: 100,
        maxHeight: 400,
        editable: function () {
          var isEditable = false;
          if (
            $("#TB07150S_R023_1").val() == "31" ||
            $("#TB07150S_R023_1").val() == "04"
          ) {
            isEditable = true;
          }

          return isEditable;
        },
        id: "grd_intrtInf_2",
        colModel: col_intrtInf_2,
      },
    ];

    setPqGrid(obj);
    intrtInf_1 = $("#grd_intrtInf_1").pqGrid("instance");
    intrtInf_2 = $("#grd_intrtInf_2").pqGrid("instance");
  }

  //변경 후 금리정보 행추가
  function addRow_grdIntrtInf2(){

    $("#grd_intrtInf_2").pqGrid("addRow", { rowData: {}, checkEditable: true });
  
  }

  //변경 후 금리정보 행삭제
  function dltRow_grdIntrtInf2(){
  
    
    var gridLgth =  $("#grd_intrtInf_2").pqGrid('option', 'dataModel.data').length;
  
    $("#grd_intrtInf_2").pqGrid("deleteRow", {rowIndx: gridLgth-1});
  
  
    // $("#intrtInfoTable").pqGrid("setData", []);
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/

  // 실행일련번호 조회
  function srchExcSn_TB07150S(e) {
    let prdtCd = e,
      obj = {};

    if (!isEmpty(prdtCd)) {
      $("#TB07150S_excSn").attr("disabled", false);
    }

    obj = {
      prdtCd,
    };

    $.ajax({
      type: "POST",
      url: "/TB07050S/srchExcSn",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      success: function (data) {
        $("#btnSrch").attr("disabled", false);
        $("#TB07150S_excSn").html("");
        let html = "";
        if (data.length > 0) {
          data.forEach((item) => {
            html +=
              '<option value="' +
              item.EXC_SN +
              '">' +
              item.EXC_SN +
              "</option>";
          });
          $("#TB07150S_excSn").append(html);
        } else {
          $("#TB07150S_excSn").attr("disabled", true);

          var option = {};
          option.title = "Warning!";
          option.type = "warning";

          var msg =
            "실행순번이 없는 종목입니다. 해당 종목의 실행순번을 업로드하고 다시 시도해주세요.";

          option.text = msg;
          openPopup(option);
          return false;
        }
        srch();
      },
    });
  }

  //원장정보 조회
  function srch() {
    var prdtCd = $("#TB07150S_prdtCd").val(); //종목코드
    var excSn = $("#TB07150S_excSn").val(); //실행일련번호

    if (isEmpty(prdtCd)) {
      var option = {};
      option.title = "Warning!";
      option.type = "warning";

      option.text = "종목코드를 입력한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    }

    var param = {
      prdtCd: prdtCd,
      excSn: excSn,
    };

    $.ajax({
      type: "POST",
      url: "/TB07150S/getCndChngLdgInf",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(param),
      dataType: "json",
      beforeSend: function (xhr) {
        _tempObj.prdtCd = $('#TB07150S_prdtCd').val()
        _tempObj.prdtNm = $('#TB07150S_prdtNm').val()
        reset();
        $('#TB07150S_prdtCd').val(_tempObj.prdtCd)
        $('#TB07150S_prdtNm').val(_tempObj.prdtNm)
        _tempObj = {}
      },
      success: function (data) {
        console.log("getCndChngLdgInf 이후  ::: ", data);
        if ( !data.prdtCd ) {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "조회된 내역이 없습니다."
            , confirmButtonText: "확인"
          });
          return;
        }

        // 변경 전 원장정보
        $("#TB07150S_trOthrDscmNo").val(data.trOthrDscmNo); //거래상대식별번호
        $("#TB07150S_trOthrDscmNm").val(data.trOthrDscmNm); //거래상대명
        $("#TB07150S_I011").val(data.prgSttsCd); //진행상태코드
        $("#TB07150S_mngmBdcd").val(data.mngmBdcd); //관리부서코드
        $("#TB07150S_mngmBdnm").val(data.mngmBdnm); //관리부서명
        $("#TB07150S_prdtClsfCd").val(data.prdtClsfCd); //상품분류코드
        $("#TB07150S_prdtClsfNm").val(data.prdtClsfNm); //상품분류명
        $("#TB07150S_A005").val(data.actsCd); //계정과목코드
        // $("#TB07150S_actsNm").val(""); //계정과목명
        $("#TB07150S_eprzCrdlCtrcAmt").val(commaStr(data.eprzCrdlCtrcAmt)); //약정금액
        $("#TB07150S_ctrcDt").val(formatDate(data.ctrcDt)); //대출일자
        $("#TB07150S_ctrcExpDt").val(formatDate(data.ctrcExpDt)); //만기일자
        $("#TB07150S_eprzCrdlApvlAmt").val(commaStr(data.eprzCrdlApvlAmt)); //승인금액
        $("#TB07150S_E020").val(data.paiRdmpDcd); //상환방법
        $("#TB07150S_prnaRdmpFrqcMnum").val(data.prnaRdmpFrqcMnum); //원금상환주기
        $("#TB07150S_intrRdmpFrqcMnum").val(data.intrRdmpFrqcMnum); //이자상환주기
        $("#TB07150S_istmDtmRdmpAmt").val(commaStr(data.istmDtmRdmpAmt)); //일시상환금액
        $("#TB07150S_I005").val(data.indvLmtDcd); //한도/개별
        $("#TB07150S_H001").val(data.hldyPrcsDcd); //휴일처리구분
        $("#TB07150S_prnaDfrPrdMnum").val(data.prnaDfrPrdMnum); //거치기간개월수
        $("#TB07150S_E011").val(data.intrBnaoDcd); //이자선후취구분
        $("#TB07150S_E013").val(data.intrDnumClcMthCd); //이자일수계산구분
        $("#TB07150S_ovduIntrRt").val(data.ovduIntrRt); //연체이자율

        // 조건변경정보
        $("#TB07150S_trOthrDscmNo_chng").val(data.trOthrDscmNo); //거래상대식별번호
        $("#TB07150S_trOthrDscmNm_chng").val(data.trOthrDscmNm); //거래상대명
        $("#TB07150S_eprzCrdlCtrcAmt_chng").val(commaStr(data.eprzCrdlCtrcAmt)); //약정금액
        $("#TB07150S_ctrcExpDt_chng").val(formatDate(data.ctrcExpDt)); //만기일자
        $("#TB07150S_E020_2").val(data.paiRdmpDcd); //상환방법
        $("#TB07150S_prnaRdmpFrqcMnum_chng").val(data.prnaRdmpFrqcMnum); //원금상환주기
        $("#TB07150S_intrRdmpFrqcMnum_chng").val(data.intrRdmpFrqcMnum); //이자상환주기
        $("#TB07150S_istmDtmRdmpAmt_chng").val(commaStr(data.istmDtmRdmpAmt)); //일시상환금액
        $("#TB07150S_I005_2").val(data.indvLmtDcd); //한도/개별
        $("#TB07150S_H001_2").val(data.hldyPrcsDcd); //휴일처리구분
        $("#TB07150S_prnaDfrPrdMnum_chng").val(data.prnaDfrPrdMnum); //거치기간개월수
        $("#TB07150S_E011_2").val(data.intrBnaoDcd); //이자선후취구분
        $("#TB07150S_E013_2").val(data.intrDnumClcMthCd); //이자일수계산구분
        $("#TB07150S_ovduIntrRt_chng").val(data.ovduIntrRt); //연체이자율

        // var chngBf346BList = data.chngBf346BList; //변경 전 금리정보
        // var cndChng346BList = data.cndChng346BList; //조건변경금리정보

        var chngBf404BList = data.chngBf404BList; //변경 전 금리정보
        var cndChng404BList = data.cndChng404BList; //조건변경금리정보

        // //alert(JSON.stringify(intrtInfList));
        // setGrid_TB07150S(chngBf346BList, "grd_intrtInf_1");
        // setGrid_TB07150S(cndChng346BList, "grd_intrtInf_2");

        var options = [
          {
            gridNm: "grd_intrtInf_1",
            data: chngBf404BList,
          },
          {
            gridNm: "grd_intrtInf_2",
            data: cndChng404BList,
          },
        ];

        pqGridSetData(options);
      },
    });
  }

  function cndChng() {
    //조건변경

    var option = {};
    option.title = "Warning!";
    option.type = "warning";

    var rqsKndCd = $("#TB07150S_R023_1").val(); //신청종류
    var prdtCd = $("#TB07150S_prdtCd").val(); //종목코드

    if (isEmpty(prdtCd)) {
      option.text = "종목코드를 선택한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    } else if (isEmpty(rqsKndCd)) {
      option.text = "신청종류를 선택한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    } else {
      businessFunction();
    }

    function businessFunction() {
      var rqsKndCd = $("#TB07150S_R023_1").val(); //신청종류
      var prdtCd = $("#TB07150S_prdtCd").val(); //종목코드
      var excSn = $("#TB07150S_excSn").val(); //실행일련번호
      var trOthrDscmNo = $("#TB07150S_trOthrDscmNo_chng").val(); //거래상대방 식별번호
      var chngDt = $("#TB07150S_prcsDt").val(); //변경일자 IBIMS201B
      var ctrcExpDt = $("#TB07150S_ctrcExpDt_chng").val(); //만기일자
      var eprzCrdlCtrcAmt = $("#TB07150S_eprzCrdlCtrcAmt_chng").val(); //약정금액
      var paiRdmpDcd = $("#TB07150S_E020_2").val(); //원리금상환구분코드
      var prnaRdmpFrqcMnum = $("#TB07150S_prnaRdmpFrqcMnum_chng").val(); //원금상환주기
      var intrRdmpFrqcMnum = $("#TB07150S_intrRdmpFrqcMnum_chng").val(); //이자상환주기
      var istmDtmRdmpAmt = $("#TB07150S_istmDtmRdmpAmt_chng").val(); //할부일시상환금액 IBIMS201B
      var indvLmtDcd = $("#TB07150S_I005_2").val(); //개별한도구분코드
      var hldyPrcsDcd = $("#TB07150S_H001_2").val(); //휴일처리구분코드
      var prnaDfrPrdMnum = $("#TB07150S_prnaDfrPrdMnum_chng").val(); //거치기간개월수
      var intrBnaoDcd = $("#TB07150S_E011_2").val(); //이자선후취구분코드
      var intrDnumClcMthCd = $("#TB07150S_E013_2").val(); //이자일수계산방법코드
      var ovduIntrRt = $("#TB07150S_ovduIntrRt_chng").val(); //연체이자율

      var chngBfEprzCrdlCtrcAmt = $("#TB07150S_eprzCrdlCtrcAmt").val(); //변경 전 약정금액

      var cndChng404BList = $("#grd_intrtInf_2").pqGrid(
        "option",
        "dataModel.data"
      ); //변경 후 금리정보

      console.log("cndChng404BList ::: " + JSON.stringify(cndChng404BList));

      var param = {
        rqsKndCd: rqsKndCd,
        prdtCd: prdtCd,
        excSn: excSn,
        trOthrDscmNo: trOthrDscmNo,
        chngDt: unformatDate(chngDt),
        ctrcExpDt: unformatDate(ctrcExpDt),
        eprzCrdlCtrcAmt: uncomma(eprzCrdlCtrcAmt),
        paiRdmpDcd: paiRdmpDcd,
        prnaRdmpFrqcMnum: prnaRdmpFrqcMnum,
        intrRdmpFrqcMnum: intrRdmpFrqcMnum,
        istmDtmRdmpAmt: uncomma(istmDtmRdmpAmt),
        indvLmtDcd: indvLmtDcd,
        hldyPrcsDcd: hldyPrcsDcd,
        prnaDfrPrdMnum: prnaDfrPrdMnum,
        intrBnaoDcd: intrBnaoDcd,
        intrDnumClcMthCd: intrDnumClcMthCd,
        ovduIntrRt: ovduIntrRt,
        cndChng404BList: cndChng404BList,
        chngBfEprzCrdlCtrcAmt: uncomma(chngBfEprzCrdlCtrcAmt),
      };

      $.ajax({
        type: "POST",
        url: "/TB07150S/cndChng",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (data) {

          //console.log(data);
          if(data === 0){
            Swal.fire({
              icon: 'success'
            , title: "Success!"
            , text: "조건변경이 완료되었습니다."
            , confirmButtonText: "확인"
            });
            srch();

          }else{
            Swal.fire({
              icon: 'error'
              , title: "Error!"
              , text: "조건변경에 실패하였습니다."
              , confirmButtonText: "확인"
            });
          }
        },
      });
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation() {}

  /*******************************************************************
   * 초기화
   *******************************************************************/

  function reset() {
    $(`input[id^="TB07150S"]`).each((index, element) => {
      const $this = $(element);
      // console.log($this);
      // console.log(initVal[$this.attr("id")]);

      $this.val(initVal[$this.attr("id")]);
    });

    $("#TB07150S_R023_1").val("");
    $("#TB07150S_E020_2").val("");
    $("#TB07150S_E011_2").val("");
    $("#TB07150S_H001").val("");
    $("#TB07150S_I011").val("");
    $("#TB07150S_E013").val("");
    $("#TB07150S_H001_2").val("");
    $("#TB07150S_E013_2").val("");
    $("#TB07150S_A005").val("");

    $("#TB07150S_trOthrDscmNo_chng").prop("disabled", true); //거래상대방번호
    $("#TB07150S_trOthrDscmNm_chng").prop("disabled", true); //거래상대방명
    $("#TB07150S_ctrcExpDt_chng").prop("disabled", true); //만기일자
    $("#TB07150S_eprzCrdlCtrcAmt_chng").prop("disabled", true); //악정금액
    $("#TB07150S_E020_2").prop("disabled", true); //상환방법
    $("#TB07150S_prnaRdmpFrqcMnum_chng").prop("disabled", true); //원금상환주기
    $("#TB07150S_intrRdmpFrqcMnum_chng").prop("disabled", true); //이자상환주기
    $("#TB07150S_istmDtmRdmpAmt_chng").prop("disabled", true); //일시상환금액
    $("#TB07150S_I005_2").prop("disabled", true); //한도/개별
    $("#TB07150S_H001_2").prop("disabled", true); //휴일처리구분
    $("#TB07150S_prnaDfrPrdMnum_chng").prop("disabled", true); //거치기간개월수
    $("#TB07150S_E011_2").prop("disabled", true); //이자선후취구분
    $("#TB07150S_E013_2").prop("disabled", true); //이자계산방법
    $("#TB07150S_ovduIntrRt_chng").prop("disabled", true); //연체이자율

    $('#TB07150S_E020')[0].selectedIndex = 0; // 상환방법
    $('#TB07150S_I005')[0].selectedIndex = 0; // 한도/개별
    $('#TB07150S_I005_2')[0].selectedIndex = 0; // 한도/개별
    $('#TB07150S_E011')[0].selectedIndex = 0; // 이자선후급구분

    $("#trOthrSrchBtn").prop("disabled", true);

    $("#TB07150S_plsBtn").prop("disabled", true);             
    $("#TB07150S_mnsBtn").prop("disabled", true);

    

    $("#grd_intrtInf_1").pqGrid("option", "strNoRows", "");
    $("#grd_intrtInf_1").pqGrid("setData", []);
    $("#grd_intrtInf_2").pqGrid("option", "strNoRows", "");
    $("#grd_intrtInf_2").pqGrid("setData", []);
  }


  function resetSrchCon(){
    $("#TB07150S_excSn").attr("disabled", true);
    $('#TB07150S_excSn').empty();

    reset();
  }

  /*******************************************************************
   * Swal.fire
   *******************************************************************/
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

  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07150S_prdtCd").val(prdtCd);
			$("#TB07150S_prdtNm").val(prdtNm);
      srch();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

  return {
    srch: srch,
    reset: reset,
    resetSrchCon: resetSrchCon,
    cndChng: cndChng,
    srchExcSn_TB07150S: srchExcSn_TB07150S,
    addRow_grdIntrtInf2: addRow_grdIntrtInf2,
    dltRow_grdIntrtInf2: dltRow_grdIntrtInf2,
    getDealInfoFromWF: getDealInfoFromWF,
  };
})();
