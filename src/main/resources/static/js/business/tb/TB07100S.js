const TB07100Sjs = (function () {
  let TB07100S_rlthPruf; // 실물증빙
  let TB07100S_basic; // 기본?

  $(document).ready(function () {
    TB07100S_pqGrid();
  });

  /**
   * 기본정보세팅
   * @param dprtNm    // 부서명
   * @param dprtCd    // 부서코드
   * @param dprtCd    // 회계기간
   * @param dprtCd    // 작성자
   * @param dprtCd    // 승인자
   */

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function TB07100S_pqGrid() {
    // 지급품의서실물증빙
    let col_rlthPruf = [
      {
        title: "승인상태",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "결재자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계일자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "작성자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래처명",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "증빙종류구분코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "매입공제구분",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "세액",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "증빙일자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "지급방법",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "지급예정일자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    let col_basic = [
      {
        title: "삭제",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        width: "1%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "순번",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "차변금액",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "대변금액",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적요",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "차량등록코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "배부",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "프로젝트ID",
        dataType: "string",
        dataIndx: "",
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
        id: "TB07100S_grd_rlthPruf",
        colModel: col_rlthPruf,
        //   , numberCell     : { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
        //   , scrollModel : { autoFit: false }
      },
      {
        height: 150,
        maxHeight: 150,
        id: "TB07100S_grd_basic",
        colModel: col_basic,
        //   , numberCell     : { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
        //   , scrollModel : { autoFit: false }
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    TB07100S_rlthPruf = $("#TB07100S_grd_rlthPruf").pqGrid("instance");
    TB07100S_basic = $("#TB07100S_grd_thdtTrDtls").pqGrid("instance");
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  /**
   * SELECT 모음
   */

  /**
   * 미지급품의목록 SELECT
   */
  function TB07100S_selectIBIMS431B() {
    const paramData = {
      // wrtnDt: $("#TB07100S_wrtnDt").val()             //  회계기간
      rslnBdcd: $("#TB07100S_dprtCd").val(), //  부서코드  rslnBdcd
      actsCd: $("#TB07100S_actsCd").val(), //  계정과목
      bcncNm: $("#TB07100S_bcncNm").val(), //  거래처명
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          let gridList = $("#TB07100S_grd_rlthPruf").pqGrid("instance");
          gridList.setData(data);
          gridList.getData();
        } else {
        }
      },
      error: function () {},
    });
  }

  function TB07100S_selectIBIMS432B() {
    const paramData = {
      // wrtnDt: $("#TB07100S_wrtnDt").val()          //  회계기간
      rslnBdcd: $("#TB07100S_dprtCd").val(), //  부서코드  rslnBdcd
      actsCd: $("#TB07100S_actsCd").val(), //  계정과목
      bcncNm: $("#TB07100S_bcncNm").val(), //  거래처명
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          let gridList = $("#TB07100S_grd_basic").pqGrid("instance");
          gridList.setData(data);
          gridList.getData();
        } else {
        }
      },
      error: function () {},
    });
  }
  /**
   * SELECT 모음
   */

  /**
   * INSERT 모음
   */

  /**
   * 지급품의 MERGE
   */
  function TB07100S_mergeIBIMS431B() {
    const ibims432bvo = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07100S_dprtCd").val(), //  부서코드  rslnBdcd
      //   , STTM_DETL_SN        //  쿼리에서 처리
      dbitCritDcd: $("#TB07100S_dbitCritDcd").val(),
      rptsActsCd: $("#TB07100S_rptsActsCd").val(),
      actsCd: $("#TB07100S_actsCd").val(), //  계정과목
      krwAmt: $("TB07100S_krwAmt").val(),
      frcrAmt: $("TB07100S_frcrAmt").val(),
      bdgExcuBdcd: $("TB07100S_bdgExcuBdcd").val(),
      bdgActsCd: $("TB07100S_bdgActsCd").val(),
      rvrsBdcd: $("TB07100S_rvrsBdcd").val(),
      rslnSynsCtns: $("TB07100S_rslnSynsCtns").val(),
      fndsIstrJobClsfCd: $("TB07100S_fndsIstrJobClsfCd").val(),
      acctBcncCd: $("TB07100S_acctBcncCd").val(),
      prufKndDcd: $("TB07100S_prufKndDcd").val(),
      prufDt: $("TB07100S_prufDt").val(),
      ntsApvlNo: $("TB07100S_ntsApvlNo").val(),
      elcPrufYn: $("TB07100S_elcPrufYn").val(),
      vhclRgstCd: $("TB07100S_vhclRgstCd").val(),
      nsFnsCd: $("TB07100S_nsFnsCd").val(),
      prdtCd: $("TB07100S_prdtCd").val(),
      projId: $("TB07100S_projId").val(),
      crryCd: $("TB07100S_crryCd").val(),
      exrt: $("TB07100S_exrt").val(),
    };

    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val()),
      wrtnYm: unformatDate($("#TB07100S_wrtnDt").val()).slice(0, 6),
      rslnBdcd: $("#TB07100S_rslnBdcd").val(),
      cnstNo: $("#TB07100S_cnstNo").val(),
      baltDt: $("#TB07100S_baltDt").val(),
      sttmNo: $("#TB07100S_sttmNo").val(),
      sttmBdcd: $("#TB07100S_sttmBdcd").val(),
      cnclBaltDt: $("#TB07100S_cnclBaltDt").val(),
      cnclSttmNo: $("#TB07100S_cnclSttmNo").val(),
      cnstSttmDcd: $("#TB07100S_cnstSttmDcd").val(),
      prufDt: $("#TB07100S_prufDt").val(),
      crryCd: $("#TB07100S_crryCd").val(),
      exrt: $("#TB07100S_exrt").val(),
      rgstEmpno: $("#TB07100S_rgstEmpno").val(),
      acctBcncCd: $("#TB07100S_acctBcncCd").val(),
      bcncNm: $("#TB07100S_bcncNm").val(),
      acctPymtMthCd: $("#TB07100S_acctPymtMthCd").val(),
      xtnlIsttCd: $("#TB07100S_xtnlIsttCd").val(),
      bano: $("#TB07100S_bano").val(),
      bnkAchdNm: $("#TB07100S_bnkAchdNm").val(),
      pymtPrarDt: $("#TB07100S_pymtPrarDt").val(),
      fndsIstrSn: $("#TB07100S_fndsIstrSn").val(),
      prufKndDcd: $("#TB07100S_prufKndDcd").val(),
      pchsDdcDcd: $("#TB07100S_pchsDdcDcd").val(),
      rslnAmt: $("#TB07100S_rslnAmt").val(),
      splmValuTxa: $("#TB07100S_splmValuTxa").val(),
      cnclYn: $("#TB07100S_cnclYn").val(),
      trId: $("#TB07100S_trId").val(),
      bnftYn: $("#TB07100S_bnftYn").val(),
      reltDcmNo: $("#TB07100S_reltDcmNo").val(),
      reltFdtnCtns: $("#TB07100S_reltFdtnCtns").val(),
      elcPrufYn: $("#TB07100S_elcPrufYn").val(),
      entmAccXstcYn: $("#TB07100S_entmAccXstcYn").val(),
      cntrAccXstcYn: $("#TB07100S_cntrAccXstcYn").val(),
      jobDecdCd: $("#TB07100S_jobDecdCd").val(),
      jobDecdNo: $("#TB07100S_jobDecdNo").val(),
      cnclJobDecdNo: $("#TB07100S_cnclJobDecdNo").val(),
      excalYn: $("#TB07100S_excalYn").val(),
      fndsLdgDcd: $("#TB07100S_fndsLdgDcd").val(),
      fndsLdgNo: $("#TB07100S_fndsLdgNo").val(),
      rgstSn: $("#TB07100S_rgstSn").val(),
      actsCd: $("#TB07100S_actsCd").val(),
      edmsDcmId: $("#TB07100S_edmsDcmId").val(),
      cdno: $("#TB07100S_cdno").val(),
      apvlNo: $("#TB07100S_apvlNo").val(),
      bdgBusiCd: $("#TB07100S_bdgBusiCd").val(),
      frcrRslnAmt: $("#TB07100S_frcrRslnAmt").val(),
      ibims432bvo: ibims432bvo,
    };

    console.log(unformatDate($("#TB07100S_wrtnDt").val()).slice(0, 6));

    $.ajax({
      type: "POST",
      url: "/TB07100S/mergeIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {},
      error: function () {},
    });
  }

  // function TB07100S_mergeIBIMS432B(){
  //     const paramData = {
  //         wrtnDt: $("#TB07100S_wrtnDt").val()             //  작성일자
  //       , rslnBdcd: $("#TB07100S_dprtCd").val()           //  부서코드  rslnBdcd
  //       //   , STTM_DETL_SN        //  쿼리에서 처리
  //       , dbitCritDcd: $("#TB07100S_dbitCritDcd").val()
  //       , rptsActsCd: $("#TB07100S_rptsActsCd").val()
  //       , actsCd: $("#TB07100S_actsCd").val()             //  계정과목
  //       , krwAmt: $("TB07100S_krwAmt").val()
  //       , frcrAmt: $("TB07100S_frcrAmt").val()
  //       , bdgExcuBdcd: $("TB07100S_bdgExcuBdcd").val()
  //       , bdgActsCd: $("TB07100S_bdgActsCd").val()
  //       , rvrsBdcd: $("TB07100S_rvrsBdcd").val()
  //       , rslnSynsCtns: $("TB07100S_rslnSynsCtns").val()
  //       , fndsIstrJobClsfCd: $("TB07100S_fndsIstrJobClsfCd").val()
  //       , acctBcncCd: $("TB07100S_acctBcncCd").val()
  //       , prufKndDcd: $("TB07100S_prufKndDcd").val()
  //       , prufDt: $("TB07100S_prufDt").val()
  //       , ntsApvlNo: $("TB07100S_ntsApvlNo").val()
  //       , elcPrufYn: $("TB07100S_elcPrufYn").val()
  //       , vhclRgstCd: $("TB07100S_vhclRgstCd").val()
  //       , nsFnsCd: $("TB07100S_nsFnsCd").val()
  //       , prdtCd: $("TB07100S_prdtCd").val()
  //       , projId: $("TB07100S_projId").val()
  //       , crryCd: $("TB07100S_crryCd").val()
  //       , exrt: $("TB07100S_exrt").val()
  //     }

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07100S/mergeIBIMS432B",
  //         contentType: "application/json; charset=UTF-8",
  //         data: JSON.stringify(paramData),
  //         dataType: "json",
  //         success: function (data) {

  //         }, error: function () {

  //         }
  //     });
  // }
  /**
   * INSERT 모음
   */

  /**
   * UPDATE 모음
   */
  function TB07100S_apvlRqst() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val()),
      rslnBdcd: $("#TB07100S_rslnBdcd").val(),
      cnstNo: $("#TB07100S_cnstNo").val(),
      jobDecdCd: $("#TB07100S_jobDecdCd").val(),
      jobDecdNo: $("#TB07100S_jobDecdNo").val(),
      cnclJobDecdNo: $("#TB07100S_cnclJobDecdNo").val(),
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/apvlRqst",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {},
      error: function () {},
    });
  }
  /**
   * UPDATE 모음
   */

  /**
   * DELETE 모음
   */

  /**
   * 지급품의 DELETE
   */
  function TB07100S_deleteIBIMS431B() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07100S_rslnBdcd").val(), //  부서코드
      cnstNo: $("#TB07100S_cnstNo").val(), //  품의번호
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/deleteIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {},
      error: function () {},
    });
  }

  function TB07100S_deleteIBIMS432B() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07100S_rslnBdcd").val(), //  부서코드
      cnstNo: $("#TB07100S_cnstNo").val(), //  품의번호
      sttmDetlSn: $("#TB07100S_sttmDetlSn").val(), //  전표상세일련번호
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/deleteIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {},
      error: function () {},
    });
  }
  /**
   * DELETE 모음
   */

  /**
   * 실행버튼
   * @param queryDcd // 쿼리타입 선택코드
   */
  function TB07100S_doExc() {
    if (
      $("#btn-TB07100S_merge").attr("class") === $(".btn-info").attr("class")
    ) {
      TB07100S_mergeIBIMS431B();
    } else if (
      $("#btn-TB07100S_delete").attr("class") === $(".btn-info").attr("class")
    ) {
      TB07100S_deleteIBIMS431B();
    }
  }

  /*******************************************************************
   * Validation
   *******************************************************************/

  /*******************************************************************
   * Event
   *******************************************************************/

  /*******************************************************************
   * ?
   *******************************************************************/
  return {
    TB07100S_selectIBIMS431B: TB07100S_selectIBIMS431B,
    TB07100S_doExc: TB07100S_doExc,
  };
})();
