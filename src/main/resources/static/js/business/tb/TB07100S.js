const TB07100Sjs = (function () {
  let TB07100S_rlthPruf   // 실물증빙
  let TB07100S_basic      // 기본?
  let TB07100S_tagStatuses = [];


  $(document).ready(function () {
    $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Tmrd'], input[id*='tx'], input[id='TB07100S_splmValuTxa']").val('0');
    selectorNumberFormater($("input[id*='Amt'], input[id*='Blce'], input[id*='Rt'], input[id='TB07100S_splmValuTxa']"));
    TB07100S_pqGrid();
    TB07100S_getFirstStatus();
    getSelectBoxList("TB07100S", "/A005", false);
    autoSet();
  });

  /**
   * 기본정보세팅
   * @param dprtNm    // 부서명
   * @param dprtCd    // 부서코드
   * @param dprtCd    // 회계기간
   * @param dprtCd    // 작성자
   * @param dprtCd    // 승인자
   */


  // /**
  //  * inputTag 기본세팅
  //  */
  // function TB07100S_setInputTag(){
  //     
  // }

  /*
   *  처음 인풋의 disabled, readonly 상태 가져오기
   */
  const TB07100S_getFirstStatus = () => {
    $("#ibims431bdto input, #ibims431bdto select, #ibims431bdto button").each(function () {
      TB07100S_tagStatuses.push({
        id: $(this).attr('id'),
        readonly: $(this).prop('readonly'),
        disabled: $(this).prop('disabled'),
        value: $(this).val()
      });1
    });
  }

  /*
   *  처음 인풋의 disabled, readonly 상태로 돌리기
   */
  const TB07100S_setFirstStatus = () => {
    $('.toggleBtn1').addClass('btn-info').removeClass('btn-default');
    $('.toggleBtn2').addClass('btn-default').removeClass('btn-info');
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', false);
    TB07100S_tagStatuses.forEach(status => {
      $(`#${status.id}`).prop('readonly', status.readonly);
      $(`#${status.id}`).prop('disabled', status.disabled);
    });
    $('.toggleBtn2').prop('disabled', false);
  }

  /*
   *  등록
   */
  const TB07100S_insertBtn = () => {
    TB07100S_setFirstStatus();
  }

  /*
   *  취소
   */
  const TB07100S_cancelBtn = () => {
    $('.toggleBtn1').addClass('btn-default').removeClass('btn-info');
    $('.toggleBtn2').addClass('btn-info').removeClass('btn-default');
    $("#ibims431bdto input").prop("readonly", "true");
    $("#ibims431bdto input, #ibims431bdto button, #ibims431bdto select").prop("disabled", "true");
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', true);
    $('.toggleBtn1').prop('disabled', false);
  }

  function autoSet(){//회계기간, 부서코드 기본값 세팅
    $("#TB07100S_acctDt1").val(getToday());
    $("#TB07100S_acctDt2").val(getToday());
    $('#TB07100S_dprtCd').val($('#userDprtCd').val());
    $('#TB07100S_dprtNm').val($('#userDprtNm').val());

  }
  /*
   *  전체 초기화
   */
  const TB07100S_removeAll = () => {

    //$('input').val('');
    $(`#TB07100S_searchForm input`).val('');
    $(`#TB07100S_mergeForm input`).val('');

    $("#TB07100S_grd_rlthPruf").pqGrid('instance').setData([]);
    $("#TB07100S_grd_thdtTrDtls").pqGrid('instance').setData([]);
    autoSet();
  }

  const TB07100S_resetInput = () => {
    $(`#TB07100S_mergeForm input`).val('');
    $(`#TB07100S_mergeForm input[id*='bnftYn']
      ,#TB07100S_mergeForm input[id*='entmAccXstcYn']`).prop('checked',false);

    $(`#TB07100S_mergeForm input[id*='Amt']
      ,#TB07100S_mergeForm input[id*='Blce']
      ,#TB07100S_mergeForm input[id*='Exrt']
      ,#TB07100S_mergeForm input[id*='Mnum']
      ,#TB07100S_mergeForm input[id*='Tmrd']
      ,#TB07100S_mergeForm input[id*='splmValuTxa']
      ,#TB07100S_mergeForm #TB07100S_trtx`).val('0');
  }

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function TB07100S_pqGrid() {
    // 지급품의서실물증빙
    let col_rlthPruf = [
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
        title: "결재자",
        dataType: "string",
        dataIndx: "reltStfno",
        halign: "center",
        align: "left",
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
      }
      , {
        title: "작성자",
        dataType: "string",
        dataIndx: "rgstEmpno",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "거래처명",
        dataType: "string",
        dataIndx: "bcncNm",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "증빙종류구분코드",
        dataType: "string",
        dataIndx: "prufKndDcd",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "매입공제구분",
        dataType: "string",
        dataIndx: "pchsDdcDcd",
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
        title: "증빙일자",
        dataType: "string",
        dataIndx: "prufDt",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "지급방법",
        dataType: "string",
        dataIndx: "acctPymtMthCd",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "지급예정일자",
        dataType: "string",
        dataIndx: "pymtPrarDt",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
    ];

    let col_basic = [
      {
        title: "삭제",
        dataType: "string",
        dataIndx: "chkDel",
        halign: "center",
        align: "center",
        width: '1%',
        filter: { crules: [{ condition: 'range' }] },
        hidden: true
      },
      {
        title: "순번",
        dataType: "string",
        dataIndx: "sn",
        halign: "center",
        align: "center",
        width: '5%',
        filter: { crules: [{ condition: 'range' }] },
      },
     
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
      },
      {
        title: "차변금액",
        dataType: "string",
        dataIndx: "index1",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
        render	 : function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            return addComma(cellData); 
          }
          return cellData; 
        }
      }
      , {
        title: "대변금액",
        dataType: "string",
        dataIndx: "index2",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
        render	 : function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            return addComma(cellData); 
          }
          return cellData; 
        }
      },
      {
        title: "적요",
        dataType: "string",
        dataIndx: "index3",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
      },
      {
        title: "차량등록코드",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        hidden: true
      },
      {
        title: "배부",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        hidden: true
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        halign: "center",
        align: "center",
        //width: '5%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "index4",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
      },
      {
        title: "프로젝트ID",
        dataType: "string",
        dataIndx: "projId",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        hidden : true
      }
    ];

    let pqGridObjs = [
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07100S_grd_rlthPruf'
        , colModel: col_rlthPruf
        , rowDblClick: function (evt, ui) {

          const keys = Object.keys(ui.rowData);

          for (let i = 0; i < keys.length; i++) {
            $(`#ibims431bdto #TB07100S_${keys[i]}`).val(ui.rowData[keys[i]]);
            if (keys[i] === "acctDt") {
              $(`#ibims431bdto #TB07100S_${keys[i]}`).val(formatDate(ui.rowData[keys[i]]));
            } else if (keys[i] === "prufDt") {
              $(`#ibims431bdto #TB07100S_${keys[i]}`).val(formatDate(ui.rowData[keys[i]]));
            } else if (keys[i] === "pymtPrarDt") {
              $(`#ibims431bdto #TB07100S_${keys[i]}`).val(formatDate(ui.rowData[keys[i]]));
            }
          }

          const paramData = {
            acctDt: ui.rowData.acctDt
            , rslnBdcd: ui.rowData.rslnBdcd
            , actsCd: ui.rowData.actsCd
            , bcncNm: ui.rowData.bcncNm
          }

          TB07100S_selectIBIMS432B(paramData);

        }
      },
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07100S_grd_thdtTrDtls'
        , colModel: col_basic
        //   , numberCell     : { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
        //   , scrollModel : { autoFit: false }
      },
    ]
    setPqGrid(pqGridObjs);
    // Grid instance
    TB07100S_rlthPruf = $("#TB07100S_grd_rlthPruf").pqGrid('instance');
    TB07100S_basic = $("#TB07100S_grd_thdtTrDtls").pqGrid('instance');
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
      acctDt1: unformatDate($("#TB07100S_acctDt1").val())             //  회계기간
      , acctDt2: unformatDate($("#TB07100S_acctDt2").val())           //  회계기간
      , rslnBdcd: $("#TB07100S_dprtCd").val()                         //  부서코드  rslnBdcd
      , actsCd: $('#TB07100S_A005').val()                        //  계정과목
      , bcncNm: $("#TB07100S_entpNm").val()                         //  거래처명
      , prufKndDcd: "2"                                               //  계산서
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          let gridList = $("#TB07100S_grd_rlthPruf").pqGrid('instance');
          gridList.setData(data);
          gridList.getData();
        } else {

        }
      }, error: function () {

      }
    });
  }

  /**
   * @param paramData // const paramData = {
                      //     acctDt: $("#TB07100S_acctDt").val()          //  회계기간
                      //     , rslnBdcd: $("#TB07100S_dprtCd").val()           //  부서코드  rslnBdcd
                      //     , actsCd: $("#TB07100S_actsCd").val()             //  계정과목
                      //     , bcncNm: $("#TB07100S_bcncNm").val()             //  거래처명
                      // }
   */
  function TB07100S_selectIBIMS432B(paramData) {

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          let gridList = $("#TB07100S_grd_basic").pqGrid('instance');
          gridList.setData(data);
          gridList.getData();
        } else {

        }
      }, error: function () {

      }
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
      // wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())             //  작성일자
      rslnBdcd: $("#TB07100S_dprtCd").val()           //  부서코드  rslnBdcd
      //   , STTM_DETL_SN        //  쿼리에서 처리
      , dbitCritDcd: $("#TB07100S_dbitCritDcd").val()
      , rptsActsCd: $("#TB07100S_rptsActsCd").val()
      , actsCd: $("#TB07100S_actsCd").val()             //  계정과목
      , krwAmt: $("TB07100S_krwAmt").val()
      , frcrAmt: $("TB07100S_frcrAmt").val()
      , bdgExcuBdcd: $("TB07100S_bdgExcuBdcd").val()
      , bdgActsCd: $("TB07100S_bdgActsCd").val()
      , rvrsBdcd: $("TB07100S_rvrsBdcd").val()
      , rslnSynsCtns: $("TB07100S_rslnSynsCtns").val()
      , fndsIstrJobClsfCd: $("TB07100S_fndsIstrJobClsfCd").val()
      , acctBcncCd: $("TB07100S_acctBcncCd").val()
      , prufKndDcd: $("TB07100S_prufKndDcd").val()
      , prufDt: unformatDate($("TB07100S_prufDt").val())
      , ntsApvlNo: $("TB07100S_ntsApvlNo").val()
      , elcPrufYn: $("TB07100S_elcPrufYn").val()
      , vhclRgstCd: $("TB07100S_vhclRgstCd").val()
      , nsFnsCd: $("TB07100S_nsFnsCd").val()
      , prdtCd: $("TB07100S_prdtCd").val()
      , projId: $("TB07100S_projId").val()
      , crryCd: $("TB07100S_crryCd").val()
      , exrt: $("TB07100S_exrt").val()
    }

    const paramData = {
      // wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())
      // , wrtnYm: unformatDate($("#TB07100S_wrtnDt").val()).slice(0, 6)
      rslnBdcd: $("#TB07100S_rslnBdcd").val()
      , acctDt: unformatDate($("#TB07100S_acctDt").val())
      , cnstNo: $("#TB07100S_cnstNo").val()
      , baltDt: $("#TB07100S_baltDt").val()
      , sttmNo: $("#TB07100S_sttmNo").val()
      , sttmBdcd: $("#TB07100S_sttmBdcd").val()
      , cnclBaltDt: unformatDate($("#TB07100S_cnclBaltDt").val())
      , cnclSttmNo: $("#TB07100S_cnclSttmNo").val()
      , cnstSttmDcd: $("#TB07100S_cnstSttmDcd").val()
      , prufDt: unformatDate($("#TB07100S_prufDt").val())
      , crryCd: $("#TB07100S_crryCd").val()
      , exrt: $("#TB07100S_exrt").val()
      , rgstEmpno: $("#TB07100S_rgstEmpno").val()
      , acctBcncCd: $("#TB07100S_acctBcncCd").val()
      , bcncNm: $("#TB07100S_2_bzepName").val()
      , acctPymtMthCd: $("#TB07100S_acctPymtMthCd").val()
      , xtnlIsttCd: $("#TB07100S_xtnlIsttCd").val()
      , bano: $("#TB07100S_bano").val()
      , bnkAchdNm: $("#TB07100S_bnkAchdNm").val()
      , pymtPrarDt: unformatDate($("#TB07100S_pymtPrarDt").val())
      , fndsIstrSn: $("#TB07100S_fndsIstrSn").val()
      , prufKndDcd: $("#TB07100S_prufKndDcd").val()
      , pchsDdcDcd: $("#TB07100S_pchsDdcDcd").val()
      , rslnAmt: $("#TB07100S_rslnAmt").val()
      , splmValuTxa: $("#TB07100S_splmValuTxa").val()
      , cnclYn: "N"
      , trId: $("#TB07100S_trId").val()
      , bnftYn: $("#TB07100S_bnftYn").val()
      , reltDcmNo: $("#TB07100S_reltDcmNo").val()
      , reltFdtnCtns: $("#TB07100S_reltFdtnCtns").val()
      , elcPrufYn: "N"
      , entmAccXstcYn: $("#TB07100S_entmAccXstcYn").val()
      , cntrAccXstcYn: $("#TB07100S_cntrAccXstcYn").val()
      , jobDecdCd: $("#TB07100S_jobDecdCd").val()
      , jobDecdNo: $("#TB07100S_jobDecdNo").val()
      , cnclJobDecdNo: $("#TB07100S_cnclJobDecdNo").val()
      , excalYn: $("#TB07100S_excalYn").val()
      , fndsLdgDcd: $("#TB07100S_fndsLdgDcd").val()
      , fndsLdgNo: $("#TB07100S_fndsLdgNo").val()
      , rgstSn: $("#TB07100S_rgstSn").val()
      , actsCd: $('#TB07100S_A005').val()
      , edmsDcmId: $("#TB07100S_edmsDcmId").val()
      , cdno: $("#TB07100S_cdno").val()
      , apvlNo: $("#TB07100S_apvlNo").val()
      , bdgBusiCd: $("#TB07100S_bdgBusiCd").val()
      , frcrRslnAmt: $("#TB07100S_frcrRslnAmt").val()
      , ibims432bvo: ibims432bvo
    }

    // console.log(paramData.acctDt);

    $.ajax({
      type: "POST",
      url: "/TB07100S/mergeIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {

      }, error: function () {

      }
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
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())
      , rslnBdcd: $("#TB07100S_rslnBdcd").val()
      , cnstNo: $("#TB07100S_cnstNo").val()
      , jobDecdCd: $("#TB07100S_jobDecdCd").val()
      , jobDecdNo: $("#TB07100S_jobDecdNo").val()
      , cnclJobDecdNo: $("#TB07100S_cnclJobDecdNo").val()
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/apvlRqst",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {

      }, error: function () {

      }
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
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())   //  작성일자
      , rslnBdcd: $("#TB07100S_rslnBdcd").val()             //  부서코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 //  품의번호
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/deleteIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {

      }, error: function () {

      }
    });
  }

  function TB07100S_deleteIBIMS432B() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())   //  작성일자
      , rslnBdcd: $("#TB07100S_rslnBdcd").val()             //  부서코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 //  품의번호
      , sttmDetlSn: $("#TB07100S_sttmDetlSn").val()         //  전표상세일련번호
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/deleteIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {

      }, error: function () {

      }
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
    if ($("#btn-TB07100S_merge").attr('class') === $(".btn-info").attr('class')) {
      TB07100S_mergeIBIMS431B()
    } else if ($("#btn-TB07100S_delete").attr('class') === $(".btn-info").attr('class')) {
      TB07100S_deleteIBIMS431B()
    }
  }

  function addRow(){
    console.log("행추가");
    var gridData = $("#TB07100S_grd_thdtTrDtls").pqGrid("option", "dataModel.data");
    var rowCount = gridData ? gridData.length : 0;
    const newRow = {
      chkDel: "",
      sn: rowCount+1,
      actsCd: "",
  };
  $("#TB07100S_grd_thdtTrDtls").pqGrid("addRow", { rowData: newRow, checkEditable: false });
    
  }

  function delRow(){
    console.log("행삭제");
  }

  
  return {
    TB07100S_selectIBIMS431B: TB07100S_selectIBIMS431B,
    TB07100S_doExc: TB07100S_doExc,
    TB07100S_insertBtn: TB07100S_insertBtn,
    TB07100S_cancelBtn: TB07100S_cancelBtn,
    TB07100S_resetInput: TB07100S_resetInput,
    TB07100S_removeAll: TB07100S_removeAll,
    addRow: addRow,
    delRow: delRow,
  };
})();
