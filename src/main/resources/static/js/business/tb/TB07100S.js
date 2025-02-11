const TB07100Sjs = (function () {
  let queryMode = "insert";
  let TB07100S_rlthPruf   // 실물증빙
  let TB07100S_basic      // 기본?
  let TB07100S_tagStatuses = [];
  let grdSelect = {};
  let selectBox;
  let arrPqGrid432BList;
  let sttmDetlIndex;

  $(document).ready(function () {

    // 탭상태 기본세팅
    $(`div[data-menuid="/TB07100S"] #tab-1`).show();
    $(`div[data-menuid="/TB07100S"] #tab-2`).hide();

    // 결재관련버튼 기본세팅
    $('#TB07100S_apvlRqst').hide()
    $('#TB07100S_apvlCncl').hide()
    $('#TB07100S_apvl').hide()
    $('#TB07100S_gbck').hide()

    // 숫자인풋박스 기본값 설정
    $(`div[data-menuid='/TB07100S'] input[id*='Amt']
      , div[data-menuid='/TB07100S'] input[id*='Blce']
      , div[data-menuid='/TB07100S'] input[id*='Exrt']
      , div[data-menuid='/TB07100S'] input[id*='Mnum']
      , div[data-menuid='/TB07100S'] input[id*='Tmrd']
      , div[data-menuid='/TB07100S'] input[id*='tx']
      , div[data-menuid='/TB07100S'] input[id='TB07100S_splmValuTxa']`).val('0');

    // 숫자인풋박스 포맷
    selectorNumberFormater(
      $(`div[data-menuid='/TB07100S'] input[id*='Amt']
        , div[data-menuid='/TB07100S'] input[id*='Blce']
        , div[data-menuid='/TB07100S'] input[id*='Rt']
        , div[data-menuid='/TB07100S'] input[id='TB07100S_splmValuTxa']`)
    );

    // 콤보박스 세팅
    selectBoxSetting();

    // 기본값 세팅
    setDfaultValue();

    // 지급품의 결재 인풋박스 기본 상태 저장
    TB07100S_getFirstStatus();

    // 그리드 선언
    TB07100S_pqGrid();

    // 사용자 확인 후 버튼상태 컨트롤
    apvlBtnHandler();

  });

  /**
   * 하단탭 컨트롤러
   * @param {String} tabNo 탭번호
   */
  function tabController ( tabNo ) {

    if (tabNo === 1) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07100S"] #tab-1`).show();
      $(`div[data-menuid="/TB07100S"] #tab-2`).hide();
    }
    else if (tabNo === 2) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07100S"] #tab-1`).hide();
      $(`div[data-menuid="/TB07100S"] #tab-2`).show();
    }

  }

  /**
   * 화면콤보박스 세팅
   * @description
   * 20250122 현재시각 16시 04분
   * 증빙종류, 매입공제, 출금원장, 지급방법 등의 콤보박스 데이터가 없다... // 2025-02-03 생겨버린 구분코드들...
   * 확인이 된다면 콤보박스 세팅을 여기에 해주시길 바랍니다.
   * 감사합니다. 사랑합니다.
   */
  function selectBoxSetting() {

    selectBox = getSelectBoxList("TB07100S",
      "/A017"
      + "/A018"
      + "/D006"
      + "/D010"
      + "/F017"
      + "/P029"
      + "/P030"
      , false);

    grdSelect.A017 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A017' })
                              .filter(item => item.cdValue >= 500);	                            // 회계계정과목코드
    grdSelect.A018 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A018' });	  // 회계지급방법코드
    grdSelect.F017 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F017' });    // 자금원장구분코드
    grdSelect.P029 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P029' });    // 증빙종류구분코드
    grdSelect.P030 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P030' });    // 매입공제구분코드

    grdSelect.D006 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D006'; });   // 결재상태구분코드
    grdSelect.D010 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D010'; });   // 부서코드

    // 회계지급방법코드 콤보박스 셋
    let A018Tag = "";
    for (let i = 0; i < grdSelect.A018.length; i++) {
      A018Tag += `<option value="${grdSelect.A018[i].cdValue}">${grdSelect.A018[i].cdName}</option>`
    }
    $('#TB07100S_acctPymtMthCd').append(A018Tag);

    // 자금원장구분코드 콤보박스 셋
    let F017Tag = "";
    for (let i = 0; i < grdSelect.F017.length; i++) {
      F017Tag += `<option value="${grdSelect.F017[i].cdValue}">${grdSelect.F017[i].cdName}</option>`
    }
    $('#TB07100S_fndsLdgDcd').append(F017Tag);

    // 증빙종류구분코드 콤보박스 셋
    let P029Tag = "";
    for (let i = 0; i < grdSelect.P029.length; i++) {
      P029Tag += `<option value="${grdSelect.P029[i].cdValue}">${grdSelect.P029[i].cdName}</option>`
    }
    $('#TB07100S_prufKndDcd').append(P029Tag);

    // 매입공제구분코드 콤보박스 셋 
    let P030Tag = "";
    for (let i = 0; i < grdSelect.P030.length; i++) {
      P030Tag += `<option value="${grdSelect.P030[i].cdValue}">${grdSelect.P030[i].cdName}</option>`
    }
    $('#TB07100S_pchsDdcDcd').append(P030Tag);

    // 부서코드 콤보박스 셋
    let dprtOptionTag = "";
    for (let i = 0; i < grdSelect.D010.length; i++) {
      dprtOptionTag += `<option value="${grdSelect.D010[i].cdValue}">${grdSelect.D010[i].cdName}</option>`
    }
    $('#TB07100S_dprtNm').append(dprtOptionTag)
    $('#TB07100S_dprtNm').on('change', function () {
      $('#TB07100S_dprtCd').val($(this).val())
    })

  }

  /**
   * 지급품의 결재 박스 안의 입력박스 최초 상태 저장
   * @description
   * 화면이 열리자마자 한번 실행
   */
  const TB07100S_getFirstStatus = () => {
    $("div[data-menuid='/TB07100S'] #ibims431bdto input, div[data-menuid='/TB07100S'] #ibims431bdto select, div[data-menuid='/TB07100S'] #ibims431bdto button").each(function () {
      TB07100S_tagStatuses.push({
        id: $(this).attr('id'),
        readonly: $(this).prop('readonly'),
        disabled: $(this).prop('disabled'),
        value: $(this).val()
      }); 1
    });
  }

  /**
   * 등록/변경 버튼 클릭시 최초 상태로 만들기
   * @description
   * 등록/변경 누르시면 작동합니다.
   */
  const TB07100S_setFirstStatus = () => {
    $('div[data-menuid="/TB07100S"] .toggleBtn1').addClass('btn-info').removeClass('btn-default');
    $('div[data-menuid="/TB07100S"] .toggleBtn2').addClass('btn-default').removeClass('btn-info');
    $('div[data-menuid="/TB07100S"] .ibox-content .ibox-content .btn.btn-default').prop('disabled', false);
    TB07100S_tagStatuses.forEach(status => {
      $(`#${status.id}`).prop('readonly', status.readonly);
      $(`#${status.id}`).prop('disabled', status.disabled);
    });
    $('div[data-menuid="/TB07100S"] .toggleBtn2').prop('disabled', false);
  }

  /**
   * 등록/변경, 삭제 버튼 컨트롤러
   * @param {String} mode 등록/변경, 삭제
   * @description
   * 세상이 밉다.
   */
  function toggleBtnHandler(mode) {
    if (mode === "등록/변경") {
      queryMode = "insert"
      TB07100S_setFirstStatus();
    }
    else if (mode === "삭제") {
      queryMode = "delete"
      $("div[data-menuid='/TB07100S'] .toggleBtn1").addClass('btn-default').removeClass('btn-info');
      $("div[data-menuid='/TB07100S'] .toggleBtn2").addClass('btn-info').removeClass('btn-default');
      $("div[data-menuid='/TB07100S'] #ibims431bdto input").prop("readonly", "true");
      $("div[data-menuid='/TB07100S'] #ibims431bdto input, div[data-menuid='/TB07100S'] #ibims431bdto button, div[data-menuid='/TB07100S'] #ibims431bdto select").prop("disabled", "true");
    }

    apvlBtnHandler();
  }

  /**
   * 기본정보세팅
   * @param dprtNm      // 부서명
   * @param dprtCd      // 부서코드
   * @param acctDt      // 회계기간
   * @param rgstEmpno   // 작성자
   */
  function setDfaultValue() {
    $("#TB07100S_acctDt1").val(getSomeDaysAgo(7));
    $("#TB07100S_acctDt2").val(getToday());
    $("#TB07100S_wrtnDt").val(getToday());
    $('#TB07100S_dprtCd').val($('#userDprtCd').val());
    $('#TB07100S_dprtNm').val($('#userDprtCd').val());
    $('#TB07100S_rgstEmpno').val($('#userEno').val());
    $('#TB07100S_rgstEmpnm').val($('#userEmpNm').val());
  }

  /**
   * 전체초기화
   */
  const TB07100S_removeAll = () => {

    $(`#TB07100S_searchForm input`).val('');
    $('#TB07100S_dprtCd').val("");
    $('#TB07100S_dprtNm').val("");
    $(`#TB07100S_mergeForm input`).val('');

    $("#TB07100S_grd_rlthPruf").pqGrid('instance').setData([]);
    $("#TB07100S_grd_thdtTrDtls").pqGrid('instance').setData([]);

    TB07100S_resetInput();
  }

  /**
   * 등록초기화
   */
  const TB07100S_resetInput = () => {
    $(`#TB07100S_mergeForm input`).val('');
    $(`#TB07100S_mergeForm input[id*='bnftYn']
      ,#TB07100S_mergeForm input[id*='entmAccXstcYn']`).prop('checked', false);

    $(`#TB07100S_mergeForm input[id*='Amt']
      ,#TB07100S_mergeForm input[id*='Blce']
      ,#TB07100S_mergeForm input[id*='Exrt']
      ,#TB07100S_mergeForm input[id*='Mnum']
      ,#TB07100S_mergeForm input[id*='Tmrd']
      ,#TB07100S_mergeForm input[id*='splmValuTxa']
      ,#TB07100S_mergeForm #TB07100S_trtx`).val('0');

    $("#TB07100S_wrtnDt").val(unformatDate(getToday()));
    $("#TB07100S_rslnBdcd").val($('#userDprtCd').val());
    $('#TB07100S_rgstEmpno').val($('#userEno').val());
    $('#TB07100S_rgstEmpnm').val($('#userEmpNm').val());

    apvlBtnHandler();
  }


  /**
   * 결재관련 버튼 컨트롤러
   * @param { String } decdSttsDcd 결재상태구분코드
   * @description
   * 지급품의 목록내 데이터 클릭시 데이터 채워지면서 데이터 기반으로 결재관련 버튼 컨트롤
   * 1. 담당자인 경우 - 결재요청, 승인취소 버튼 활성화
   * 2. 승인자인 경우 - 결재, 반려 버튼 활성화
   */
  function apvlBtnHandler() {

    // 담당자, 승인자 체크
    const nowEmpno = $('#userEno').val()
    const stfno = $('#TB07100S_rgstEmpno').val()
    const dcfcEno = $('#TB07100S_2_empNo').val()
    const decdSttsDcd = $('#TB07100S_decdSttsDcd').val()

    // 담당자인 경우
    if (nowEmpno === stfno) {
      $('#TB07100S_apvlRqst').show()
      $('#TB07100S_apvlCncl').show()
      $('#TB07100S_apvl').hide()
      $('#TB07100S_gbck').hide()
      $('#TB07100S_excBtn').show();

      $('#TB07100S_saveBtn').show();
      $('#TB07100S_addRow').show();
      $('#TB07100S_delRow').show();
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').show();
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').show();
    }
    // 승인자인 경우
    else if (nowEmpno === dcfcEno) {
      $('#TB07100S_apvlRqst').hide()
      $('#TB07100S_apvlCncl').hide()
      $('#TB07100S_apvl').show()
      $('#TB07100S_gbck').show()
      $('#TB07100S_excBtn').hide();

      $('#TB07100S_saveBtn').hide();
      $('#TB07100S_addRow').hide();
      $('#TB07100S_delRow').hide();
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').hide();
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').hide();
    }
    // 해당사항이 없는경우 Default
    else {
      $('#TB07100S_apvlRqst').hide()
      $('#TB07100S_apvlCncl').hide()
      $('#TB07100S_apvl').hide()
      $('#TB07100S_gbck').hide()
      $('#TB07100S_excBtn').hide();

      $('#TB07100S_saveBtn').hide();
      $('#TB07100S_addRow').hide();
      $('#TB07100S_delRow').hide();
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').hide();
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').hide();
    }

    if (queryMode === "insert" && !$('#TB07100S_cnstNo').val()) {
      $('#TB07100S_excBtn').prop('disabled', false)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    else if (queryMode === "insert" && $('#TB07100S_cnstNo').val()) {
      $('#TB07100S_excBtn').prop('disabled', false)

      $('#TB07100S_saveBtn').prop('disabled', false)
      $('#TB07100S_addRow').prop('disabled', false)
      $('#TB07100S_delRow').prop('disabled', false)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', false)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', false)
    }
    else if (queryMode === "delete" && !$('#TB07100S_cnstNo').val()) {
      $('#TB07100S_excBtn').prop('disabled', true)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }

    // 결재단계, 결재상태 확인
    // 해당 사항이 없는경우
    if (decdSttsDcd === "0") {
      $('#TB07100S_apvlRqst').prop('disabled', false)
      $('#TB07100S_apvlCncl').prop('disabled', true)
      $('#TB07100S_apvl').prop('disabled', true)
      $('#TB07100S_gbck').prop('disabled', true)
      $('#TB07100S_excBtn').prop('disabled', false)

      $('#TB07100S_saveBtn').prop('disabled', false)
      $('#TB07100S_addRow').prop('disabled', false)
      $('#TB07100S_delRow').prop('disabled', false)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', false)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', false)
    }
    // 결재 진행중인 경우
    else if (decdSttsDcd === "1") {
      $('#TB07100S_apvlRqst').prop('disabled', true)
      $('#TB07100S_apvlCncl').prop('disabled', false)
      $('#TB07100S_apvl').prop('disabled', false)
      $('#TB07100S_gbck').prop('disabled', false)
      $('#TB07100S_excBtn').prop('disabled', true)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 승인된 경우
    else if (decdSttsDcd === "2") {
      $('#TB07100S_apvlRqst').prop('disabled', true)
      $('#TB07100S_apvlCncl').prop('disabled', true)
      $('#TB07100S_apvl').prop('disabled', true)
      $('#TB07100S_gbck').prop('disabled', true)
      $('#TB07100S_excBtn').prop('disabled', true)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 지급품의의 경우 반려된 경우 재승인요청,반려 불가능
    else if (decdSttsDcd === "3") {
      $('#TB07100S_apvlRqst').prop('disabled', true)
      $('#TB07100S_apvlCncl').prop('disabled', true)
      $('#TB07100S_apvl').prop('disabled', true)
      $('#TB07100S_gbck').prop('disabled', true)
      $('#TB07100S_excBtn').prop('disabled', true)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 승인취소된 내역은 조회 안됨
    // 조회가 되지 않은 상태
    else if (!decdSttsDcd) {
      $('#TB07100S_apvlRqst').prop('disabled', true)
      $('#TB07100S_apvlCncl').prop('disabled', true)
      $('#TB07100S_apvl').prop('disabled', true)
      $('#TB07100S_gbck').prop('disabled', true)
      $('#TB07100S_excBtn').prop('disabled', false)

      $('#TB07100S_saveBtn').prop('disabled', true)
      $('#TB07100S_addRow').prop('disabled', true)
      $('#TB07100S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07100S"] #UPLOAD_DelFiles').prop('disabled', true)
    }

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
        dataIndx: "decdSttsDcd",
        halign: "center",
        align: "center",
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.D006,
        },
        render: function (ui) {
          return grdSelect.D006.find(idx => idx.cdValue == ui.cellData).cdName;
        }
      },
      {
        title: "결재자명",
        dataType: "string",
        dataIndx: "reltStfnm",
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
        render: function (ui) {
          return formatDate(ui.cellData);
        },
      },
      {
        title: "작성자",
        dataType: "string",
        dataIndx: "rgstEmpnm",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
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
        title: "증빙종류구분코드",
        dataType: "string",
        dataIndx: "prufKndDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return grdSelect.P029.find(opt => opt.cdValue === ui.cellData) ? grdSelect.P029.find(opt => opt.cdValue === ui.cellData).cdName : ui.cellData
        }
      },
      {
        title: "매입공제구분",
        dataType: "string",
        dataIndx: "pchsDdcDcd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return grdSelect.P030.find(opt => opt.cdValue === ui.cellData) ? grdSelect.P030.find(opt => opt.cdValue === ui.cellData).cdName : ui.cellData
        }
      },
      {
        title: "세액",
        dataType: "string",
        dataIndx: "splmValuTxa",
        halign: "center",
        align: "right",
        format: "#,###",
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
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return grdSelect.A018.find(opt => opt.cdValue === ui.cellData) ? grdSelect.A018.find(opt => opt.cdValue === ui.cellData).cdName : ui.cellData
        }
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
      {
        title: "작성일자",
        dataType: "string",
        dataIndx: "wrtnDt",
        hidden: true,
      },
      {
        title: "결의부점코드",
        dataType: "string",
        dataIndx: "rslnBdcd",
        hidden: true,
      },
      {
        title: "결재자사번(히든)",
        dataType: "string",
        dataIndx: "reltStfno",
        hidden: true,
      },
      {
        title: "작성자사번(히든)",
        dataType: "string",
        dataIndx: "rgstEmpno",
        hidden: true,
      },
      {
        title: "거래처코드(히든)",
        dataType: "string",
        dataIndx: "acctBcncCd",
        hidden: true,
      },
      {
        title: "품의번호",
        dataType: "string",
        dataIndx: "cnstNo",
        hidden: true,
      },
      {
        title: "증빙일자",
        dataType: "string",
        dataIndx: "prufDt",
        hidden: true,
      },
      {
        title: "계좌번호",
        dataType: "string",
        dataIndx: "bano",
        hidden: true,
      },
      {
        title: "카드번호",
        dataType: "string",
        dataIndx: "cdno",
        hidden: true,
      },
      {
        title: "카드승인번호",
        dataType: "string",
        dataIndx: "apvlNo",
        hidden: true,
      },
      {
        title: "편익제공",
        dataType: "string",
        dataIndx: "bnftYn",
        hidden: true,
      },
      {
        title: "접대비여부",
        dataType: "string",
        dataIndx: "entmAccXstcYn",
        hidden: true,
      },
      {
        title: "지급금액",
        dataType: "string",
        dataIndx: "rslnAmt",
        hidden: true,
      },
      {
        title: "출금원장",
        dataType: "string",
        dataIndx: "fndsLdgDcd",
        hidden: true,
      },
      {
        title: "관련근거",
        dataType: "string",
        dataIndx: "reltFdtnCtns",
        hidden: true,
      },
      {
        title: "은행코드",
        dataType: "string",
        dataIndx: "xtnlIsttCd",
        hidden: true,
      },
      {
        title: "은행명",
        dataType: "string",
        dataIndx: "xtnlIsttNm",
        hidden: true,
      },
    ];

    let col_basic = [
      {
        title: "작성일자",
        dataIndx: "wrtnDt",
        hidden: true
      },
      {
        title: "결의부서",
        dataIndx: "rslnBdcd",
        hidden: true
      },
      {
        title: "품의번호",
        dataIndx: "cnstNo",
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
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.A017
        },
        render: function (ui) {
          let fSel = grdSelect.A017.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        }
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
        render: function (ui) {
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
        render: function (ui) {
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
        align: "left",
        width: '40%',
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
        title: "", dataType: "", dataIndx: "", align: "center", halign: "center", minWidth: 36, maxWidth: 36,
        render: function (ui) {
          let rowIndx = ui.rowIndx;
          return `<button id='TB07100S_editableCtrler' class='ui-button ui-corner-all ui-widget' onclick="callTB06011P('TB07100S_grid',${rowIndx});"><i class='fa fa-search'></i></button>`
        }
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "nsFndCd",
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
        hidden: true
      },
      {
        title: "증빙종류구분코드",
        dataType: "string",
        dataIndx: "prufKndDcd",
        hidden: true,
      },
      {
        title: "전자증빙여부",
        dataType: "string",
        dataIndx: "elcPrufYn",
        hidden: true,
      },
    ];

    let pqGridObjs = [
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07100S_grd_rlthPruf'
        , colModel: col_rlthPruf
        , rowClick: function (evt, ui) {
          setInputDataFromSelectData(ui.rowData, "TB07100S_mergeForm #TB07100S");

          $(`#TB07100S_2_ardyBzepNo`).val(ui.rowData['acctBcncCd']);
          $(`#TB07100S_2_entpNm`).val(ui.rowData['bcncNm']);
          $(`#TB07100S_splmValuTxa`).val(addComma(ui.rowData['splmValuTxa']));
          $(`#TB07100S_2_empNm`).val(ui.rowData['reltStfnm']);
          $(`#TB07100S_2_empNo`).val(ui.rowData['reltStfno']);
          $(`#TB07100S_fnltCd`).val(ui.rowData['xtnlIsttCd']);
          $(`#TB07100S_fnltNm`).val(ui.rowData['xtnlIsttNm']);

          $(`#TB07100S_bnftYn`).prop('checked', ui.rowData['bnftYn'] == "Y");
          $(`#TB07100S_entmAccXstcYn`).prop('checked', ui.rowData['entmAccXstcYn'] == "Y");

          const paramData = {
            wrtnDt: ui.rowData['wrtnDt']
            , rslnBdcd: ui.rowData['rslnBdcd']
            , cnstNo: ui.rowData['cnstNo']
          }

          apvlBtnHandler();

          TB07100S_selectIBIMS432B(paramData);

          /**
           * 파일불러오기, 저장을 위한 키값 세팅
           */
          $(`div[data-menuid="/TB07100S"] #fileKey2`).val( ui.rowData['wrtnDt'] + ui.rowData['rslnBdcd'] + ui.rowData['cnstNo'] )
          $('div[data-menuid="/TB07100S"] #key1').val("TB07100S")
          getFileInfo($('div[data-menuid="/TB07100S"] #key1').val(), $('div[data-menuid="/TB07100S"] #fileKey2').val());

        }
        , selectionModel: { type: "row" }
      },
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07100S_grd_thdtTrDtls'
        , colModel: col_basic
        , rowClick: function (evt, ui) {
          if (sttmDetlIndex === ui.rowIndx) {
            sttmDetlIndex = undefined;
          }
          else {
            sttmDetlIndex = ui.rowIndx
          }
        }
        , cellClick: function (evt, ui) {
          if (ui.dataIndx === "prdtCd") {
            ui.column.editable = false;
          }
          else if (ui.dataIndx === "nsFndCd") {
            ui.column.editable = false;
          }
        }
        , selectionModel: { type: "row" }
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
      acctDt1: unformatDate($("#TB07100S_acctDt1").val())     // 회계기간
      , acctDt2: unformatDate($("#TB07100S_acctDt2").val())   // 회계기간
      , rslnBdcd: $("#TB07100S_rslnBdcd").val()               // 부서코드  rslnBdcd
      , actsCd: $('#TB07100S_A005').val()                     // 계정과목
      , bcncNm: $("#TB07100S_entpNm").val()                   // 거래처명
      , prufKndDcd: "2"                                       // 계산서
      , elcPrufYn: 'N'                                        // 전자증빙여부
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
        }
        else {

        }
      }, error: function () {

      }
    });
  }

  /**
   * @param { Object } paramData ui.rowData
   * @description
   * 현재 상단그리드 클릭시 로우데이터를 보내 조회중 
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
        }
        else {

        }
      }, error: function () {

      }
    });
  }
  /**
   * SELECT 모음
   */

  /**
   * 지급품의기본 입력
   * 실행버튼
   */
  function TB07100S_doExc() {

    let url;
    let text;

    // 품의번호가 빈값이면 저장
    if (queryMode === "insert") {
      if (isEmpty($('#TB07100S_cnstNo').val())) {
        text = "저장"
        url = "insert"
      }
      // 품의번호가 있는경우 수정
      else {
        text = "수정"
        url = "update"
      }

      if ( $('#TB07100S_rgstEmpno').val() === $('#TB07100S_2_empNo').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `담당자와 승인자가 같습니다! 변경해주세요`,
        })
        return;
      }
      else if ( !$('#TB07100S_2_empNo').val() ) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `승인자를 입력해주세요!`,
        })
        return;
      }
    }
    else if (queryMode === "delete") {
      text = "삭제"
      url = "delete"
    }

    

    const paramData = {
      wrtnDt: unformatDate($('#TB07100S_wrtnDt').val())                               // 작성일자
      , rslnBdcd: $('#userDprtCd').val()                                              // 결의부점코드
      , cnstNo: $('#TB07100S_cnstNo').val()                                           // 품의번호
      , acctDt: unformatDate($('#TB07100S_acctDt').val())                             // 회계일자
      , prufDt: unformatDate($('#TB07100S_prufDt').val())                             // 증빙일자
      , rgstEmpno: $('#TB07100S_rgstEmpno').val()                                     // 등록사원번호
      , reltStfno: $('#TB07100S_2_empNo').val()                                       // 승인자
      , acctBcncCd: $('#TB07100S_2_ardyBzepNo').val()                                 // 회계거래처코드
      , bcncNm: $('#TB07100S_2_entpNm').val()                                         // 거래처명
      , acctPymtMthCd: $('#TB07100S_acctPymtMthCd').val()                             // 회계지급방법코드
      , bano: $('#TB07100S_bano').val()                                               // 은행계좌번호
      , pymtPrarDt: unformatDate($('#TB07100S_pymtPrarDt').val())                     // 지급예정일자
      , prufKndDcd: $('#TB07100S_prufKndDcd').val()                                   // 증빙종류구분코드
      , pchsDdcDcd: $('#TB07100S_pchsDdcDcd').val()                                   // 매입공채구분코드
      , rslnAmt: $('#TB07100S_rslnAmt').val().replaceAll(",", "")                     // 결의금액
      , splmValuTxa: $('#TB07100S_splmValuTxa').val().replaceAll(",", "")             // 부가가치세액
      , bnftYn: $('#TB07100S_bnftYn').is(":checked") ? "Y" : "N"                      // 편익여부
      , reltFdtnCtns: $('#TB07100S_reltFdtnCtns').val()                               // 관련근거내용
      , entmAccXstcYn: $('#TB07100S_entmAccXstcYn').is(":checked") ? "Y" : "N"        // 접대계정존재여부
      , baltDt: unformatDate($('#TB07100S_baltDt').val())                             // 기표일자
      , cdno: $('#TB07100S_cdno').val()                                               // 카드번호
      , apvlNo: $('#TB07100S_apvlNo').val()                                           // 카드승인번호
      , elcPrufYn: 'N'                                                                // 전자증빙여부
      , xtnlIsttCd: $('#TB07100S_fnltCd').val()                                   // 외부기관코드
      // , cnclYn: $('#TB07100S_cnclYn').val()                                           // 취소여부
      // , rgstSn: $('#TB07100S_rgstSn').val()                                           // 등록일련번호 - 채번일듯
      // , crryCd: $('#TB07100S_crryCd').val()                                           // 통화코드
      // , exrt: $('#TB07100S_exrt').val()                                               // 환율
      // , bnkAchdNm: $('#TB07100S_bnkAchdNm').val()                                     // 은행예금주명
      // , trId: $('#TB07100S_trId').val()                                               // 거래ID
      // , reltDcmNo: $('#TB07100S_reltDcmNo').val()                                     // 관련문서번호
      // , cntrAccXstcYn: $('#TB07100S_cntrAccXstcYn').val()                             // 기부계정존재여부
      // , jobDecdNo: $('#TB07100S_jobDecdNo').val()                                     // 업무결재번호 - 결재진행시 데이터 업데이트
      // , cnclJobDecdNo: $('#TB07100S_cnclJobDecdNo').val()                             // 취소업무결재번호 - 승인요청취소시 결재번호 업데이트
      // , fndsIstrSn: $('#TB07100S_fndsIstrSn').val()                                   // 자금지시일련번호
      // , sttmNo: $('#TB07100S_sttmNo').val()                                           // 전표번호
      // , sttmBdcd: $('#TB07100S_sttmBdcd').val()                                       // 전표부점코드
      // , cnclBaltDt: $('#TB07100S_cnclBaltDt').val()                                   // 취소기표일자
      // , cnclSttmNo: $('#TB07100S_cnclSttmNo').val()                                   // 취소전표번호
      // , cnstSttmDcd: $('#TB07100S_cnstSttmDcd').val()                                 // 품의전표구분코드
      // , excalYn: $('#TB07100S_excalYn').val()                                         // 정산여부
      // , fndsLdgDcd: $('#TB07100S_fndsLdgDcd').val()                                   // 자금원장구분코드
      // , fndsLdgNo: $('#TB07100S_fndsLdgNo').val()                                     // 자금원장번호
      // , actsCd: $('#TB07100S_actsCd').val()                                           // 계정과목코드 - 서비스에서 지정할듯
      // , edmsDcmId: $('#TB07100S_edmsDcmId').val()                                     // EDMS문서ID
      // , bdgBusiCd: $('#TB07100S_bdgBusiCd').val()                                     // 예산사업코드 - ??
      // , frcrRslnAmt: $('#TB07100S_frcrRslnAmt').val()                                 // 외화결의금액
    }

    $.ajax({
      type: "POST",
      url: `/TB07100S/${url}IBIMS431B`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: `${text} 완료.`
          })
          TB07100S_selectIBIMS431B();
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: `${text} 실패.`
          })
        }
      },
      error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: `${text} 실패.`
        })
      }
    });
  }


  /**
   * 품의상세저장
   */
  function TB07100S_saveIBIMS432B() {

    const paramData = $("#TB07100S_grd_thdtTrDtls").pqGrid('instance').pdata;

    $.ajax({
      type: "POST",
      url: "/TB07100S/saveIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: "저장 성공!~"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "저장 실패!"
          })
        }
      }, error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "저장 실패!"
          , confirmButtonText: "확인"
        })
      }
    });
  }


  /**
   * 결재요청
   */
  function TB07100S_apvlRqst() {

    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07100S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07100S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07100S_2_empNo").val()             // 승인자
      , scrnNo: "TB07100S"                                  // 화면명
    }

    if ( $('#TB07100S_rgstEmpno').val() === $('#TB07100S_2_empNo').val()) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: `담당자와 승인자가 같습니다! 변경해주세요`,
      })
      return;
    }
    else if ( !$('#TB07100S_2_empNo').val() ) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: `승인자를 입력해주세요!`,
      })
      return;
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/apvlRqst",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: "결재요청이 되었습니다!"
          })
        }
        else if (data === -7574) {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "상세정보를 입력한뒤 결재요청을 해주세요!"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "결재요청 실패!"
          })
        }
        apvlBtnHandler();
      }, error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Success!"
          , text: "결재요청 실패!"
          , confirmButtonText: "확인"
        })
      }
    });
  }

  /**
   * 승인요청취소!
   */
  function apvlRqstCncl() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07100S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07100S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07100S_2_empNo").val()             // 승인자
      , scrnNo: "TB07100S"                                  // 화면명
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/apvlRqstCncl",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: "승인요청취소 되었습니다!"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "승인요청취소 실패!"
          })
        }
        apvlBtnHandler();
      }, error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Success!"
          , text: "승인요청취소 실패!"
          , confirmButtonText: "확인"
        })
      }
    });
  }

  /**
   * 승인!
   */
  function apvl() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07100S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07100S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07100S_2_empNo").val()             // 승인자
      , scrnNo: "TB07100S"                                  // 화면명
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/apvl",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: "승인 되었습니다!"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "승인 실패!"
          })
        }
        apvlBtnHandler();
      }, error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Success!"
          , text: "승인 실패!"
          , confirmButtonText: "확인"
        })
      }
    });
  }

  /**
   * 반려!
   */
  function rjct() {
    const paramData = {
      wrtnDt: unformatDate($("#TB07100S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07100S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07100S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07100S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07100S_2_empNo").val()             // 승인자
      , scrnNo: "TB07100S"                                  // 화면명
    }

    $.ajax({
      type: "POST",
      url: "/TB07100S/rjct",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: "Success!"
            , text: "반려 되었습니다!"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "반려 실패!"
          })
        }
        apvlBtnHandler();
      }, error: function () {
        Swal.fire({
          icon: 'error'
          , title: "Success!"
          , text: "반려 실패!"
          , confirmButtonText: "확인"
        })
      }
    });
  }



  function addRow() {
    var gridData = $("#TB07100S_grd_thdtTrDtls").pqGrid("option", "dataModel.data");
    const newRow = {
      wrtnDt: unformatDate($('#TB07100S_wrtnDt').val()),
      rslnBdcd: $('#TB07100S_rslnBdcd').val(),
      cnstNo: $('#TB07100S_cnstNo').val(),
      actsCd: "",
      krwAmt1: '0',
      krwAmt2: '0',
      prufKndDcd: $('#TB07100S_prufKndDcd').val(),
      elcPrufYn: "N",
    };
    $("#TB07100S_grd_thdtTrDtls").pqGrid("addRow", { rowData: newRow, checkEditable: false });
  }


  function delRow() {
    if (sttmDetlIndex === undefined) {
      Swal.fire({
        icon: 'warning'
        , title: 'Warning'
        , text: '삭제 할 행을 선택해주세요!'
      })
    }
    else {
      $("#TB07100S_grd_thdtTrDtls").pqGrid("deleteRow", { rowIndx: sttmDetlIndex });
      sttmDetlIndex = undefined;
    }
  }

  return {
    TB07100S_selectIBIMS431B: TB07100S_selectIBIMS431B,
    TB07100S_doExc: TB07100S_doExc,
    TB07100S_resetInput: TB07100S_resetInput,
    TB07100S_removeAll: TB07100S_removeAll,
    TB07100S_saveIBIMS432B: TB07100S_saveIBIMS432B,
    TB07100S_apvlRqst: TB07100S_apvlRqst,
    apvlRqstCncl: apvlRqstCncl,
    apvl: apvl,
    rjct: rjct,
    addRow: addRow,
    delRow: delRow,
    toggleBtnHandler: toggleBtnHandler,
    tabController: tabController,
  };
})();