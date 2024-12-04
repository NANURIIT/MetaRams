const TB07110Sjs = (function () {
  let txbl; // 전자(세금)계산서
  let basic; // 기본?
  let TB07110S_tagStatuses = [];

  $(document).ready(function () {
    $("#TB07110S_startDt").val(getSomeDaysAgo(7));
    $("#TB07110S_endDt").val(getToday());
    pqGrid();
    TB07110S_getFirstStatus();
  });

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function pqGrid() {
    // 지급품의서실물증빙
    let col_txbl = [
      {
        title: "승인상태",
        dataType: "string",
        dataIndx: "jobDecdCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "회계일자",
        dataType: "string",
        dataIndx: "acctDt",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "발급일자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      }
      , {
        title: "발급거래처명",
        dataType: "string",
        dataIndx: "bcncNm",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "사업자번호",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "합계금액",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "세액",
        dataType: "string",
        dataIndx: "splmValuTxa",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "증빙구분",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "매입공제구분",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "거래처명",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "실명확인번호",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "지급방법",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
    ];

    let col_basic = [
      {
        title: "삭제",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        width: '1%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "순번",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        width: '5%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "차변금액",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "적요",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "차량등록",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "배부",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      }
    ];

    let pqGridObjs = [
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07110S_grd_txbl'
        , colModel: col_txbl
        //   , numberCell     : { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
        //   , scrollModel : { autoFit: false }
        , rowDblClick: function (evt, ui) {

          TB07110S_selectIBIMS432B();

        }
      },
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07110S_grd_basic'
        , colModel: col_basic
        //   , numberCell     : { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
        //   , scrollModel : { autoFit: false }
      },
    ]
    setPqGrid(pqGridObjs);
    // Grid instance
    txbl = $("#TB07110S_grd_txbl").pqGrid('instance');
    basic = $("#TB07110S_grd_basic").pqGrid('instance');
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
  function TB07110S_selectIBIMS431B() {
    const paramData = {
      // wrtnDt: $("#TB07110S_wrtnDt").val()             //  회계기간
      rslnBdcd: $("#TB07110S_dprtCd").val(), //  부서코드  rslnBdcd
      actsCd: $("#TB07110S_actsCd").val(), //  계정과목
      bcncNm: $("#TB07110S_bcncNm").val(), //  거래처명
      acctDt1:$("#TB07110S_startDt").val().replaceAll('-',''), 
      acctDt2:$("#TB07110S_endDt").val().replaceAll('-','')
    };

    $.ajax({
      type: "POST",
      url: "/TB07110S/selectIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          //let gridList = $("#TB07110S_grd_rlthPruf").pqGrid("instance");
          let gridList = $("#TB07110S_grd_txbl").pqGrid("instance");
          gridList.setData(data);
          gridList.getData();
        } else {
        }
      },
      error: function () { },
    });
  }

  function TB07110S_selectIBIMS432B() {
    const paramData = {
      // wrtnDt: $("#TB07110S_wrtnDt").val()             //  회계기간
      rslnBdcd: $("#TB07110S_dprtCd").val(), //  부서코드  rslnBdcd
      actsCd: $("#TB07110S_actsCd").val(), //  계정과목
      bcncNm: $("#TB07110S_bcncNm").val(), //  거래처명
    };

    $.ajax({
      type: "POST",
      url: "/TB07110S/selectIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        console.log("selectIBIMS432B Success");
        console.log(data);
        if (data) {
          let gridList = $("#TB07110S_grd_basic").pqGrid("instance");
          gridList.setData(data);
          gridList.getData();
        } else {
        }
      },
      error: function () { },
    });
  }
  /**
   * SELECT 모음
   */

  /**
   * INSERT 모음
   */


  function TB07110S_reset(){
    $("#TB07110S_selCcd").val(0);
    $("#TB07110S_startDt").val(getSomeDaysAgo(7));
    $("#TB07110S_endDt").val(getToday());
    $("#TB07110S_dprtCd").val('');
    $("#TB07110S_dprtNm").val('');
    $("#TB07110S_jobDecdCd").val(0);
    $("#TB07110S_ardyBzepNo").val('');
    $("#TB07110S_bzepName").val('');
    $("#TB07110S_actsCd").val('');
    $("#TB07110S_actsNm").val('');
    let gridList = $("#TB07110S_grd_txbl").pqGrid("instance");
    gridList.setData([]);
  
  }

  
  /*
   *  처음 인풋의 disabled, readonly 상태 가져오기
   */
  const TB07110S_getFirstStatus = () => {
    $("#ibims431bdto input, #ibims431bdto select, #ibims431bdto button").each(function () {
      TB07110S_tagStatuses.push({
        id: $(this).attr('id'),
        readonly: $(this).prop('readonly'),
        disabled: $(this).prop('disabled'),
        value: $(this).val()
      });
    });
  }

  /*
   *  처음 인풋의 disabled, readonly 상태로 돌리기
   */
  const TB07110S_setFirstStatus = () => {
    $('.toggleBtn1').addClass('btn-info').removeClass('btn-default');
    $('.toggleBtn2').addClass('btn-default').removeClass('btn-info');
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', false);
    TB07110S_tagStatuses.forEach(status => {
      $(`#${status.id}`).prop('readonly', status.readonly);
      $(`#${status.id}`).prop('disabled', status.disabled);
    });
    $('.toggleBtn2').prop('disabled', false);
  }

  /*
   *  등록
   */
  const TB07110S_insertBtn = () => {
    TB07110S_setFirstStatus();
  }

  const TB07110S_cancelBtn = () => {
    $('.toggleBtn1').addClass('btn-default').removeClass('btn-info');
    $('.toggleBtn2').addClass('btn-info').removeClass('btn-default');
    $("#ibims431bdto input").prop("readonly", "true");
    $("#ibims431bdto input, #ibims431bdto button, #ibims431bdto select").prop("disabled", "true");
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', true);
    $('.toggleBtn1').prop('disabled', false);
  }
  /**
   * 지급품의 MERGE
   */
  function TB07110S_mergeIBIMS431B() {
    const ibims432bvo = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07110S_dprtCd").val(), //  부서코드  rslnBdcd
      //   , STTM_DETL_SN        //  쿼리에서 처리
      dbitCritDcd: $("#TB07110S_dbitCritDcd").val(),
      rptsActsCd: $("#TB07110S_rptsActsCd").val(),
      actsCd: $("#TB07110S_actsCd").val(), //  계정과목
      krwAmt: $("TB07110S_krwAmt").val(),
      frcrAmt: $("TB07110S_frcrAmt").val(),
      bdgExcuBdcd: $("TB07110S_bdgExcuBdcd").val(),
      bdgActsCd: $("TB07110S_bdgActsCd").val(),
      rvrsBdcd: $("TB07110S_rvrsBdcd").val(),
      rslnSynsCtns: $("TB07110S_rslnSynsCtns").val(),
      fndsIstrJobClsfCd: $("TB07110S_fndsIstrJobClsfCd").val(),
      acctBcncCd: $("TB07110S_acctBcncCd").val(),
      prufKndDcd: $("TB07110S_prufKndDcd").val(),
      prufDt: $("TB07110S_prufDt").val(),
      ntsApvlNo: $("TB07110S_ntsApvlNo").val(),
      elcPrufYn: $("TB07110S_elcPrufYn").val(),
      vhclRgstCd: $("TB07110S_vhclRgstCd").val(),
      nsFnsCd: $("TB07110S_nsFnsCd").val(),
      prdtCd: $("TB07110S_prdtCd").val(),
      projId: $("TB07110S_projId").val(),
      crryCd: $("TB07110S_crryCd").val(),
      exrt: $("TB07110S_exrt").val(),
    };

    const paramData = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val()),
      wrtnYm: unformatDate($("#TB07110S_wrtnDt").val()).slice(0, 6),
      rslnBdcd: $("#TB07110S_rslnBdcd").val(),
      cnstNo: $("#TB07110S_cnstNo").val(),
      baltDt: $("#TB07110S_baltDt").val(),
      sttmNo: $("#TB07110S_sttmNo").val(),
      sttmBdcd: $("#TB07110S_sttmBdcd").val(),
      cnclBaltDt: $("#TB07110S_cnclBaltDt").val(),
      cnclSttmNo: $("#TB07110S_cnclSttmNo").val(),
      cnstSttmDcd: $("#TB07110S_cnstSttmDcd").val(),
      prufDt: $("#TB07110S_prufDt").val(),
      crryCd: $("#TB07110S_crryCd").val(),
      exrt: $("#TB07110S_exrt").val(),
      rgstEmpno: $("#TB07110S_rgstEmpno").val(),
      acctBcncCd: $("#TB07110S_acctBcncCd").val(),
      bcncNm: $("#TB07110S_bcncNm").val(),
      acctPymtMthCd: $("#TB07110S_acctPymtMthCd").val(),
      xtnlIsttCd: $("#TB07110S_xtnlIsttCd").val(),
      bano: $("#TB07110S_bano").val(),
      bnkAchdNm: $("#TB07110S_bnkAchdNm").val(),
      pymtPrarDt: $("#TB07110S_pymtPrarDt").val(),
      fndsIstrSn: $("#TB07110S_fndsIstrSn").val(),
      prufKndDcd: $("#TB07110S_prufKndDcd").val(),
      pchsDdcDcd: $("#TB07110S_pchsDdcDcd").val(),
      rslnAmt: $("#TB07110S_rslnAmt").val(),
      splmValuTxa: $("#TB07110S_splmValuTxa").val(),
      cnclYn: $("#TB07110S_cnclYn").val(),
      trId: $("#TB07110S_trId").val(),
      bnftYn: $("#TB07110S_bnftYn").val(),
      reltDcmNo: $("#TB07110S_reltDcmNo").val(),
      reltFdtnCtns: $("#TB07110S_reltFdtnCtns").val(),
      elcPrufYn: $("#TB07110S_elcPrufYn").val(),
      entmAccXstcYn: $("#TB07110S_entmAccXstcYn").val(),
      cntrAccXstcYn: $("#TB07110S_cntrAccXstcYn").val(),
      jobDecdCd: $("#TB07110S_jobDecdCd").val(),
      jobDecdNo: $("#TB07110S_jobDecdNo").val(),
      cnclJobDecdNo: $("#TB07110S_cnclJobDecdNo").val(),
      excalYn: $("#TB07110S_excalYn").val(),
      fndsLdgDcd: $("#TB07110S_fndsLdgDcd").val(),
      fndsLdgNo: $("#TB07110S_fndsLdgNo").val(),
      rgstSn: $("#TB07110S_rgstSn").val(),
      actsCd: $("#TB07110S_actsCd").val(),
      edmsDcmId: $("#TB07110S_edmsDcmId").val(),
      cdno: $("#TB07110S_cdno").val(),
      apvlNo: $("#TB07110S_apvlNo").val(),
      bdgBusiCd: $("#TB07110S_bdgBusiCd").val(),
      frcrRslnAmt: $("#TB07110S_frcrRslnAmt").val(),
      ibims432bvo: ibims432bvo,
    };

    console.log(unformatDate($("#TB07110S_wrtnDt").val()).slice(0, 6));

    $.ajax({
      type: "POST",
      url: "/TB07110S/mergeIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) { },
      error: function () { },
    });
  }

  // function TB07110S_mergeIBIMS432B(){
  //     const paramData = {
  //         wrtnDt: $("#TB07110S_wrtnDt").val()             //  작성일자
  //       , rslnBdcd: $("#TB07110S_dprtCd").val()           //  부서코드  rslnBdcd
  //       //   , STTM_DETL_SN        //  쿼리에서 처리
  //       , dbitCritDcd: $("#TB07110S_dbitCritDcd").val()
  //       , rptsActsCd: $("#TB07110S_rptsActsCd").val()
  //       , actsCd: $("#TB07110S_actsCd").val()             //  계정과목
  //       , krwAmt: $("TB07110S_krwAmt").val()
  //       , frcrAmt: $("TB07110S_frcrAmt").val()
  //       , bdgExcuBdcd: $("TB07110S_bdgExcuBdcd").val()
  //       , bdgActsCd: $("TB07110S_bdgActsCd").val()
  //       , rvrsBdcd: $("TB07110S_rvrsBdcd").val()
  //       , rslnSynsCtns: $("TB07110S_rslnSynsCtns").val()
  //       , fndsIstrJobClsfCd: $("TB07110S_fndsIstrJobClsfCd").val()
  //       , acctBcncCd: $("TB07110S_acctBcncCd").val()
  //       , prufKndDcd: $("TB07110S_prufKndDcd").val()
  //       , prufDt: $("TB07110S_prufDt").val()
  //       , ntsApvlNo: $("TB07110S_ntsApvlNo").val()
  //       , elcPrufYn: $("TB07110S_elcPrufYn").val()
  //       , vhclRgstCd: $("TB07110S_vhclRgstCd").val()
  //       , nsFnsCd: $("TB07110S_nsFnsCd").val()
  //       , prdtCd: $("TB07110S_prdtCd").val()
  //       , projId: $("TB07110S_projId").val()
  //       , crryCd: $("TB07110S_crryCd").val()
  //       , exrt: $("TB07110S_exrt").val()
  //     }

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07110S/mergeIBIMS432B",
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
  function TB07110S_apvlRqst() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val()),
      rslnBdcd: $("#TB07110S_rslnBdcd").val(),
      cnstNo: $("#TB07110S_cnstNo").val(),
      jobDecdCd: $("#TB07110S_jobDecdCd").val(),
      jobDecdNo: $("#TB07110S_jobDecdNo").val(),
      cnclJobDecdNo: $("#TB07110S_cnclJobDecdNo").val(),
    };

    $.ajax({
      type: "POST",
      url: "/TB07110S/apvlRqst",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) { },
      error: function () { },
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
  function TB07110S_deleteIBIMS431B() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07110S_rslnBdcd").val(), //  부서코드
      cnstNo: $("#TB07110S_cnstNo").val(), //  품의번호
    };

    $.ajax({
      type: "POST",
      url: "/TB07110S/deleteIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) { },
      error: function () { },
    });
  }

  function TB07110S_deleteIBIMS432B() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val()), //  작성일자
      rslnBdcd: $("#TB07110S_rslnBdcd").val(), //  부서코드
      cnstNo: $("#TB07110S_cnstNo").val(), //  품의번호
      sttmDetlSn: $("#TB07110S_sttmDetlSn").val(), //  전표상세일련번호
    };

    $.ajax({
      type: "POST",
      url: "/TB07110S/deleteIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) { },
      error: function () { },
    });
  }
  /**
   * DELETE 모음
   */

  /**
   * 실행버튼
   * @param queryDcd // 쿼리타입 선택코드
   */
  function TB07110S_doExc() {
    if (
      $("#btn-TB07110S_merge").attr("class") === $(".btn-info").attr("class")
    ) {
      TB07110S_mergeIBIMS431B();
    } else if (
      $("#btn-TB07110S_delete").attr("class") === $(".btn-info").attr("class")
    ) {
      TB07110S_deleteIBIMS431B();
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

    TB07110S_selectIBIMS431B: TB07110S_selectIBIMS431B,
    TB07110S_doExc:TB07110S_doExc,
    TB07110S_reset: TB07110S_reset,
    TB07110S_insertBtn: TB07110S_insertBtn,
    TB07110S_cancelBtn: TB07110S_cancelBtn
  };
})();
