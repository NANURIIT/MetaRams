const TB07100Sjs = (function () {
  let TB07100S_rlthPruf   // 실물증빙
  let TB07100S_basic      // 기본?
  let TB07100S_tagStatuses = [];
	let grdSelect = {};
	let selectBox;
  let arrPqGrid432BList;

  $(document).ready(function () {
    $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Tmrd'], input[id*='tx'], input[id='TB07100S_splmValuTxa']").val('0');
    selectorNumberFormater($("input[id*='Amt'], input[id*='Blce'], input[id*='Rt'], input[id='TB07100S_splmValuTxa']"));
    selectBox = getSelectBoxList("TB07100S", "/A005", false);
    grdSelect.A005 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A005'; });	
    TB07100S_getFirstStatus();
    TB07100S_pqGrid();
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
    $("#TB07100S_excBtn").html('<i class="fa fa-check"></i>&nbsp;저장');
    $("#TB07100S_excBtn").show();
    $("#TB07100S_request").show();
    $("#TB07100S_apvl").hide();
    $("#TB07100S_gbck").hide();
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
    $("#TB07100S_excBtn").html('<i class="fa fa-check"></i>&nbsp;삭제');
  }

  function autoSet(){//회계기간, 부서코드 기본값 세팅
    $("#TB07100S_acctDt1").val(getToday());
    $("#TB07100S_acctDt2").val(getToday());
    $("#TB07100S_wrtnDt").val(getToday());
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
      
    $("#TB07100S_excBtn").show();
    $("#TB07100S_request").show();
    $("#TB07100S_apvl").hide();
    $("#TB07100S_gbck").hide();
      
    $("#TB07100S_wrtnDt").val(getToday());
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
        title: "결재자명",
        dataType: "string",
        dataIndx: "reltStfNm",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "결재자사번(히든)",
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
        render: function (ui) {
          return formatDate(ui.cellData);
        },
      }
      , {
        title: "작성자",
        dataType: "string",
        dataIndx: "empNm",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      }
      , {
        title: "작성자사번(히든)",
        dataType: "string",
        dataIndx: "rgstEmpno",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        hidden: true
      },
      {
        title: "거래처명",
        dataType: "string",
        dataIndx: "bcncNm",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "거래처코드(히든)",
        dataType: "string",
        dataIndx: "acctBcncCd",
        halign: "center",
        align: "left",
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
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return formatDate(ui.cellData);
        },
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
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return formatDate(ui.cellData);
        },
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
        dataIndx: "sttmDetlSn",
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
        align: "center",
        width: '15%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
        // editor: {
				// 			type: "select",
				// 			valueIndx: "cdValue",
				// 			labelIndx: "cdName",
				// 			options: grdSelect.A005
				// 		},
				// 		render: function (ui) {
				// 			let fSel = grdSelect.A005.find(({ cdValue }) => cdValue == ui.cellData);
				// 			return fSel ? fSel.cdName : ui.cellData;
				// 		}
      },
      {
        title: "차변금액",
        dataType: "interger",
        dataIndx: "krwAmt1",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
        render	 : function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            let result = cellData.replace(/^0+/, "");
            if (result === "") result = "0";
            return commaStr(result); 
          }
          return cellData; 
        }
      }
      , {
        title: "대변금액",
        dataType: "interger",
        dataIndx: "krwAmt2",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
        render	 : function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            let result = cellData.replace(/^0+/, "");
            if (result === "") result = "0";
            return commaStr(result); 
          }
          return cellData; 
        }
      },
      {
        title: "적요",
        dataType: "string",
        dataIndx: "rslnSynsCtns",
        halign: "center",
        align: "center",
        width    : '40%',
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
      { title : "", dataType : "",  dataIndx : "", align : "center", halign : "center",  minWidth: 36,  maxWidth: 36,
        render: function (ui) {
          let rowData = ui.rowData;
          //${ui.rowIndx}
          //return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03022P('TB05010S_mmbrTrgt', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
            return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB06011P('TB07100S_grid',${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
      }
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "fndCd",
        halign: "center",
        align: "center",
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
            } else if (keys[i] === "wrtnDt") {
              $(`#ibims431bdto #TB07100S_${keys[i]}`).val(formatDate(ui.rowData[keys[i]]));
            }
          }
          $(`#ibims431bdto #TB07100S_2_ardyBzepNo`).val(ui.rowData['acctBcncCd']);
          $(`#ibims431bdto #TB07100S_2_entpNm`).val(ui.rowData['bcncNm']);
          $(`#ibims431bdto #TB07100S_2_empNm`).val(ui.rowData['empNm']);
          $(`#ibims431bdto #TB07100S_2_empNo`).val(ui.rowData['rgstEmpno']);
          $(`#ibims431bdto #TB07100S_rslnAmt`).val(addComma(ui.rowData['rslnAmt']));
          $(`#ibims431bdto #TB07100S_splmValuTxa`).val(addComma(ui.rowData['splmValuTxa']));
          $(`#ibims431bdto #TB07100S_3_empNm`).val(ui.rowData['reltStfNm']);
          $(`#ibims431bdto #TB07100S_3_empNo`).val(ui.rowData['reltStfno']);
          
          
          
          $(`#ibims431bdto #TB07100S_bnftYn`).prop('checked',ui.rowData['bnftYn'] == "Y");
          $(`#ibims431bdto #TB07100S_entmAccXstcYn`).prop('checked',ui.rowData['entmAccXstcYn'] == "Y");
                      
          const paramData = {
            wrtnDt: ui.rowData['wrtnDt']
            , rslnBdcd: ui.rowData['rslnBdcd']
            , cnstNo: ui.rowData['cnstNo']
          }

          if(ui.rowData['reltStfno'] == $('#userEno').val()){
            console.log("승인자 일치");
            $("#TB07100S_apvl").show(); //승인버튼
            $("#TB07100S_gbck").show(); //반려버튼
            $("#TB07100S_excBtn").hide(); //승인버튼
            $("#TB07100S_request").hide(); //반려버튼
          }else{
            console.log("승인자 불일치");
            $("#TB07100S_apvl").hide(); //승인버튼
            $("#TB07100S_gbck").hide(); //반려버튼
            $("#TB07100S_excBtn").show(); //승인버튼
            $("#TB07100S_request").show(); //반려버튼

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
    arrPqGrid432BList = $("#TB07100S_grd_thdtTrDtls").pqGrid('instance');
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
          console.log("431B Data : ", data);
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
          let gridList = $("#TB07100S_grd_thdtTrDtls").pqGrid('instance');
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

  function TB07100S_mergeIBIMS431B(){
    if($("#TB07100S_cnstNo").val()==""){
      console.log("insert");
      getCnstNo();
    }else{
      console.log("update");
      TB07100S_updateIBIMS431B();
    }
  }

  function TB07100S_insertIBIMS431B(cnstNo) {

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
        wrtnDt : unformatDate($("#TB07100S_wrtnDt").val()) //작성일자
      , wrtnYm : unformatDate($("#TB07100S_wrtnDt").val()).substring(0,6)
      , rslnBdcd : $('#userDprtCd').val() //부점코드
      , acctDt : unformatDate($("#TB07100S_acctDt").val()) //회계일자
      , cnstNo : cnstNo  //품의번호
      , prufDt : unformatDate($("#TB07100S_prufDt").val())  //증빙일자
      , prufKndDcd : $("#TB07100S_prufKndDcd").val() //증빙종류
      , acctBcncCd : $("#TB07100S_2_ardyBzepNo").val() //거래처번호
      , bcncNm : $("#TB07100S_2_entpNm").val() //거래처명
      , bano : $("#TB07100S_bano").val() //계좌번호
      , cdno : $("#TB07100S_cdno").val() //카드번호
      , apvlNo : $("#TB07100S_apvlNo").val() //카드승인번호
      , bnftYn : $("#TB07100S_bnftYn").is(":checked") ? "Y" : "N" //편익제공여부
      , entmAccXstcYn : $("#TB07100S_entmAccXstcYn").is(":checked") ? "Y" : "N"//접대비여부  // 테이블 접대계정존재여부 
      , rslnAmt : $("#TB07100S_rslnAmt").val().replaceAll(',','') //지급금액 //테이블 결의금액? 
      , splmValuTxa : $("#TB07100S_splmValuTxa").val().replaceAll(',','') //세액 // 테이블 부가가치세액? 
      , pchsDdcDcd : $("#TB07100S_pchsDdcDcd").val() //매입공제
      , fndsLdgDcd : $("#TB07100S_fndsLdgDcd").val() //출금원장 //테이블 자금원장구분코드 
      , reltFdtnCtns : $("#TB07100S_reltFdtnCtns").val() //관련근거
      , acctPymtMthCd : $("#TB07100S_acctPymtMthCd").val() //지급방법
      , pymtPrarDt : unformatDate($("#TB07100S_pymtPrarDt").val())  //지급예정일자
      , rgstEmpno : $("#TB07100S_2_empNo").val() //작성자
      , reltStfno : $("#TB07100S_3_empNo").val() //승인자
      , cnclYn : 'N'
      , elcPrufYn : 'N'
      , cntrAccXstcYn : 'N'
      , excalYn : 'N'
      , jobDecdCd : 'N'
    }
    console.log("paramData : ", paramData);

    $.ajax({
      type: "POST",
      url: "/TB07100S/insertIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: 'success'
          , title: "Success!"
          , text: "입력 완료."
          , confirmButtonText: "확인"
      }).then((result) => {
          TB07100S_selectIBIMS431B();
      });
      }, error: function () {
        Swal.fire({
          icon: 'warning'
          , title: "Warning!"
          , text: "입력 실패."
          , confirmButtonText: "확인"
      }).then((result) => {
          TB07100S_selectIBIMS431B();
      });
      }
    });
  }

  /**
   * 지급품의 MERGE
   */
  function TB07100S_updateIBIMS431B() {

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
        wrtnDt : unformatDate($("#TB07100S_wrtnDt").val()) //작성일자
      , wrtnYm : unformatDate($("#TB07100S_wrtnDt").val()).substring(0,6)
      , rslnBdcd : $('#userDprtCd').val() //부점코드
      , acctDt : unformatDate($("#TB07100S_acctDt").val()) //회계일자
      , cnstNo : $("#TB07100S_cnstNo").val()  //품의번호
      , prufDt : unformatDate($("#TB07100S_prufDt").val())  //증빙일자
      , prufKndDcd : $("#TB07100S_prufKndDcd").val() //증빙종류
      , acctBcncCd : $("#TB07100S_2_ardyBzepNo").val() //거래처번호
      , bcncNm : $("#TB07100S_2_entpNm").val() //거래처명
      , bano : $("#TB07100S_bano").val() //계좌번호
      , cdno : $("#TB07100S_cdno").val() //카드번호
      , apvlNo : $("#TB07100S_apvlNo").val() //카드승인번호
      , bnftYn : $("#TB07100S_bnftYn").is(":checked") ? "Y" : "N" //편익제공여부
      , entmAccXstcYn : $("#TB07100S_entmAccXstcYn").is(":checked") ? "Y" : "N"//접대비여부  // 테이블 접대계정존재여부 
      , rslnAmt : $("#TB07100S_rslnAmt").val().replaceAll(',','') //지급금액 //테이블 결의금액? 
      , splmValuTxa : $("#TB07100S_splmValuTxa").val().replaceAll(',','') //세액 // 테이블 부가가치세액? 
      , pchsDdcDcd : $("#TB07100S_pchsDdcDcd").val() //매입공제
      , fndsLdgDcd : $("#TB07100S_fndsLdgDcd").val() //출금원장 //테이블 자금원장구분코드 
      , reltFdtnCtns : $("#TB07100S_reltFdtnCtns").val() //관련근거
      , acctPymtMthCd : $("#TB07100S_acctPymtMthCd").val() //지급방법
      , pymtPrarDt : unformatDate($("#TB07100S_pymtPrarDt").val())  //지급예정일자
      , rgstEmpno : $("#TB07100S_2_empNo").val() //작성자
      , reltStfno : $("#TB07100S_3_empNo").val() //승인자
      , cnclYn : 'N'
      , elcPrufYn : 'N'
      , cntrAccXstcYn : 'N'
      , excalYn : 'N'
      , jobDecdCd : 'N'
    }
    console.log("paramData : ", paramData);

    $.ajax({
      type: "POST",
      url: "/TB07100S/updateIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        console.log("Generated CNST_NO:", data.cnstNo);
        Swal.fire({
          icon: 'success'
          , title: "Success!"
          , text: "갱신 완료."
          , confirmButtonText: "확인"
      }).then((result) => {
          TB07100S_selectIBIMS431B();
      });
      }, error: function () {
        Swal.fire({
          icon: 'warning'
          , title: "Warning!"
          , text: "갱신 실패."
          , confirmButtonText: "확인"
      }).then((result) => {
          TB07100S_selectIBIMS431B();
      });
      }
    });
  }

  function TB07100S_mergeIBIMS432B(){
  var dataList=[];

    for(var i=0;i<arrPqGrid432BList.pdata.length;i++){
    if(arrPqGrid432BList.pdata[i].actsCd.length>11){
      alert("계정과목코드 입력 자릿수(11) 초과");
      return;
    }
    var rowInfoList = {
       wrtnDt : unformatDate($("#TB07100S_wrtnDt").val()) //작성일자
       , rslnBdcd : $('#userDprtCd').val() //부점코드
       , cnstNo : $("#TB07100S_cnstNo").val()  //품의번호
      , sttmDetlSn: arrPqGrid432BList.pdata[i].sttmDetlSn
      , actsCd : arrPqGrid432BList.pdata[i].actsCd //현재 pqgrid엔 계정과목명만 입력가능하나 DB엔 코드만 입력가능
      , krwAmt : arrPqGrid432BList.pdata[i].krwAmt1 =='0'?parseInt(arrPqGrid432BList.pdata[i].krwAmt2):parseInt(arrPqGrid432BList.pdata[i].krwAmt1)
      , dbitCritDcd : arrPqGrid432BList.pdata[i].krwAmt1 =="0"?'2':'1' //차변금액 항목 비어있으면 2, 아니면 1(코드정의 안되어있어서 임시로 지정)
      , rslnSynsCtns : arrPqGrid432BList.pdata[i].rslnSynsCtns
      , prdtCd : arrPqGrid432BList.pdata[i].prdtCd
      , nsFndCd : arrPqGrid432BList.pdata[i].fndCd
    }
    dataList.push(rowInfoList);
  }

    var paramData= {
      rowInfoList : rowInfoList
    }


    $.ajax({
      url: '/TB07100S/insertIBIMS432B', // 서버의 API URL
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(paramData),
      success: function (response) {
        console.log('성공:', response);
      },
      error: function (xhr, status, error) {
        console.error('에러:', error);
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
    if($("#TB07100S_cnstNo").val()==""){
      Swal.fire({
        icon: 'warning'
        , title: "warning!"
        , text: "먼저 삭제할 항목을 선택해주세요."
        , confirmButtonText: "확인"
    });
      return;
    }

    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())   //  작성일자
      , rslnBdcd: $("#TB07100S_dprtCd").val()             //  부서코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 //  품의번호
    }
    
    $.ajax({
      type: "POST",
      url: "/TB07100S/deleteIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: 'success'
          , title: "Success!"
          , text: "삭제 완료."
          , confirmButtonText: "확인"
      }).then((result) => {
          TB07100S_selectIBIMS431B();
      });
      }, error: function () {
        Swal.fire({
                  icon: 'warning'
                  , title: "warning!"
                  , text: "삭제 실패."
                  , confirmButtonText: "확인"
              }).then((result) => {
                  TB07100S_selectIBIMS431B();
              });
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
      sttmDetlSn: rowCount+1,
      actsCd: "",
      krwAmt1: '0',
      krwAmt2: '0',
      
  };
  $("#TB07100S_grd_thdtTrDtls").pqGrid("addRow", { rowData: newRow, checkEditable: false });
    
  }


  function delRow(){
    console.log("행삭제");
    var gridData = $("#TB07100S_grd_thdtTrDtls").pqGrid("option", "dataModel.data");
    var rowCount = gridData ? gridData.length : 0;
    $("#TB07100S_grd_thdtTrDtls").pqGrid("deleteRow", { rowIndx: rowCount });
  }

  function getCnstNo(){

    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())   //  작성일자
      , wrtnYm : unformatDate($("#TB07100S_wrtnDt").val()).substring(0,6)
      , rslnBdcd: $("#TB07100S_dprtCd").val()             //  부서코드
    }
    
    $.ajax({
      type: "POST",
      url: "/TB07100S/getCnstNo",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        console.log("cnstNo:",data);
        $('#TB07100S_cnstNo').val(data);
        TB07100S_insertIBIMS431B(data);
      }, error: function () {
      }
    });
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
    getCnstNo: getCnstNo,
    TB07100S_mergeIBIMS432B : TB07100S_mergeIBIMS432B,
  };
})();
