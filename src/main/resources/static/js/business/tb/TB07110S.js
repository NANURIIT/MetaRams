const TB07110Sjs = (function () {

  let txbl; // 전자(세금)계산서
  let basic; // 기본?
  let TB07110S_tagStatuses = [];
  let queryMode = "insert";
  let grdSelect = {};
  let selectBox;
  let sttmDetlIndex;

  $(document).ready(function () {

    $(`div[data-menuid='/TB07110S'] input[id*='Amt']
      , div[data-menuid='/TB07110S'] input[id*='Blce']
      , div[data-menuid='/TB07110S'] input[id*='Exrt']
      , div[data-menuid='/TB07110S'] input[id*='Mnum']
      , div[data-menuid='/TB07110S'] input[id*='Tmrd']
      , div[data-menuid='/TB07110S'] input[id*='tx']
      , div[data-menuid='/TB07110S'] input[id='TB07110S_splmValuTxa']`).val('0');

    // 숫자인풋박스 포맷
    selectorNumberFormater(
      $(`div[data-menuid='/TB07110S'] input[id*='Amt']
        , div[data-menuid='/TB07110S'] input[id*='Blce']
        , div[data-menuid='/TB07110S'] input[id*='Rt']
        , div[data-menuid='/TB07110S'] input[id='TB07110S_splmValuTxa']`)
    );

    $('#TB07110S_searchForm').find('input, select').on('input', function () {
      $("#TB07110S_grd_txbl").pqGrid('instance').setData([]);
      resetInput();
    })

    // 탭상태 기본세팅
    $(`div[data-menuid="/TB07110S"] #tab-1`).show();
    $(`div[data-menuid="/TB07110S"] #tab-2`).hide();

    // 결재관련버튼 기본세팅
    $('#TB07110S_apvlRqst').hide();
    $('#TB07110S_apvlCncl').hide();
    $('#TB07110S_apvl').hide();
    $('#TB07110S_gbck').hide();

    // 콤보박스 세팅
    selectBoxSetting();

    // 기본정보세팅
    setDfaultValue();

    // 피큐그리드 셋
    pqGrid();

    // 처음 인풋상태 저장
    getFirstStatus();

    // 사용자 확인 후 버튼상태 컨트롤
    apvlBtnHandler();

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB07110S_startDt", "TB07110S_endDt");

    // maxlength 지정 함수
    let colums = {
      reltFdtnCtns: 4000   //  관련근거
      , bano: 64           //  지급계좌
      , bnkAchdNm: 200     //  예금주명
    }
    limitInputLength(colums, "TB07110S");

  });

  /**
   * 하단탭 컨트롤러
   * @param {String} tabNo 탭번호
   */
  function tabController(tabNo) {

    if (tabNo === 1) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07110S"] #tab-1`).show();
      $(`div[data-menuid="/TB07110S"] #tab-2`).hide();
    }
    else if (tabNo === 2) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07110S"] #tab-1`).hide();
      $(`div[data-menuid="/TB07110S"] #tab-2`).show();
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
    $('#TB07110S_acctPymtMthCd').append(A018Tag);

    // 자금원장구분코드 콤보박스 셋
    let F017Tag = "";
    for (let i = 0; i < grdSelect.F017.length; i++) {
      F017Tag += `<option value="${grdSelect.F017[i].cdValue}">${grdSelect.F017[i].cdName}</option>`
    }
    $('#TB07110S_fndsLdgDcd').append(F017Tag);

    // 증빙종류구분코드 콤보박스 셋
    let P029Tag = "";
    for (let i = 0; i < grdSelect.P029.length; i++) {
      P029Tag += `<option value="${grdSelect.P029[i].cdValue}">${grdSelect.P029[i].cdName}</option>`
    }
    $('#TB07110S_prufKndDcd').append(P029Tag);

    // 매입공제구분코드 콤보박스 셋
    let P030Tag = "";
    for (let i = 0; i < grdSelect.P030.length; i++) {
      P030Tag += `<option value="${grdSelect.P030[i].cdValue}">${grdSelect.P030[i].cdName}</option>`
    }
    $('#TB07110S_pchsDdcDcd').append(P030Tag);

    let D006Tag = "";
    for (let i = 0; i < grdSelect.D006.length; i++) {
      D006Tag += `<option value="${grdSelect.D006[i].cdValue}">${grdSelect.D006[i].cdName}</option>`
    }
    $('#TB07110S_jobDecdCd').append(D006Tag);

    // 부서코드 콤보박스 셋
    let dprtOptionTag = "";
    for (let i = 0; i < grdSelect.D010.length; i++) {
      dprtOptionTag += `<option value="${grdSelect.D010[i].cdValue}">${grdSelect.D010[i].cdName}</option>`
    }
    $('#TB07110S_dprtNm').append(dprtOptionTag)
    $('#TB07110S_dprtNm').on('change', function () {
      $('#TB07110S_dprtCd').val($(this).val())
    })

  }

  /**
   * 하단탭 컨트롤러
   * @param {String} tabNo 탭번호
   */
  function tabController(tabNo) {

    if (tabNo === 1) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07110S"] #tab-1`).show();
      $(`div[data-menuid="/TB07110S"] #tab-2`).hide();
    }
    else if (tabNo === 2) {
      // 귀찮은 관계로 하드코딩
      $(`div[data-menuid="/TB07110S"] #tab-1`).hide();
      $(`div[data-menuid="/TB07110S"] #tab-2`).show();
    }

  }

  /**
   * 기본정보세팅
   * @param dprtNm      // 부서명
   * @param dprtCd      // 부서코드
   * @param acctDt      // 회계기간
   * @param rgstEmpno   // 작성자
   * @param reltStfno   // 승인자
   */
  function setDfaultValue() {
    $("#TB07110S_startDt").val(newAddMonth(new Date(getToday()), -1));
    $("#TB07110S_endDt").val(getToday());
    $("#TB07110S_wrtnDt").val(getToday());
    $('#TB07110S_dprtCd').val($('#userDprtCd').val());
    $('#TB07110S_dprtNm').val($('#userDprtCd').val());
    $('#TB07110S_rgstEmpno').val($('#userEno').val());
    $('#TB07110S_rgstEmpnm').val($('#userEmpNm').val());
    $('#TB07110S_acctDt').val(getToday());
  }

  /**
   * 전체초기화
   */
  const resetAllInput = () => {

    $(`#TB07110S_searchForm input`).val('');
    $('#TB07110S_dprtCd').val("");
    $('#TB07110S_dprtNm').val("");

    $("#TB07110S_grd_txbl").pqGrid('instance').setData([]);

    setDfaultValue();

    resetInput();

    // 파일 그리드 초기화
  }

  /**
   * 처음 인풋의 disabled, readonly 상태 가져오기
   */
  const getFirstStatus = () => {
    $("div[data-menuid='/TB07110S'] #ibims431bdto input, div[data-menuid='/TB07110S'] #ibims431bdto select, div[data-menuid='/TB07110S'] #ibims431bdto button").each(function () {
      TB07110S_tagStatuses.push({
        id: $(this).attr('id'),
        readonly: $(this).prop('readonly'),
        disabled: $(this).prop('disabled'),
        value: $(this).val()
      });
    });
  }

  /**
   * 처음 인풋의 disabled, readonly 상태로 돌리기
   */
  const setFirstStatus = () => {
    $('div[data-menuid="/TB07110S"] .toggleBtn1').addClass('btn-info').removeClass('btn-default');
    $('div[data-menuid="/TB07110S"] .toggleBtn2').addClass('btn-default').removeClass('btn-info');
    $('div[data-menuid="/TB07110S"] .ibox-content .ibox-content .btn.btn-default').prop('disabled', false);
    TB07110S_tagStatuses.forEach(status => {
      $(`#${status.id}`).prop('readonly', status.readonly);
      $(`#${status.id}`).prop('disabled', status.disabled);
    });
    $('div[data-menuid="/TB07110S"] .toggleBtn2').prop('disabled', false);
  }

  /**
   * 등록초기화
   */
  const resetInput = () => {
    $(`#TB07110S_mergeForm input`).val('');
    $(`#TB07110S_mergeForm select`).val('');
    $(`#TB07110S_mergeForm input[id*='bnftYn']
      ,#TB07110S_mergeForm input[id*='entmAccXstcYn']`).prop('checked', false);

    $(`#TB07110S_mergeForm input[id*='Amt']
      ,#TB07110S_mergeForm input[id*='Blce']
      ,#TB07110S_mergeForm input[id*='Exrt']
      ,#TB07110S_mergeForm input[id*='Mnum']
      ,#TB07110S_mergeForm input[id*='Tmrd']
      ,#TB07110S_mergeForm input[id*='splmValuTxa']
      ,#TB07110S_mergeForm #TB07110S_trtx`).val('0');

    $('#TB07110S_acctDt').val(getToday());

    $("#TB07110S_wrtnDt").val(unformatDate(getToday()));
    $("#TB07110S_rslnBdcd").val($('#userDprtCd').val());
    $('#TB07110S_rgstEmpno').val($('#userEno').val());
    $('#TB07110S_rgstEmpnm').val($('#userEmpNm').val());


    $("#TB07110S_grd_basic").pqGrid('instance').setData([]);
    // 파일 그리드 초기화
    $(`div[data-menuid="/TB07110S"] #UPLOAD_FileList`).html("");

    pqGridSelectRemover("TB07110S_grd_txbl");

    apvlBtnHandler();
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
      setFirstStatus();
    }
    else if (mode === "삭제") {
      queryMode = "delete"
      $("div[data-menuid='/TB07110S'] .toggleBtn1").addClass('btn-default').removeClass('btn-info');
      $("div[data-menuid='/TB07110S'] .toggleBtn2").addClass('btn-info').removeClass('btn-default');
      $("div[data-menuid='/TB07110S'] #ibims431bdto input").prop("readonly", "true");
      $("div[data-menuid='/TB07110S'] #ibims431bdto input, div[data-menuid='/TB07110S'] #ibims431bdto button, div[data-menuid='/TB07110S'] #ibims431bdto select").prop("disabled", "true");
    }

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
    const stfno = $('#TB07110S_rgstEmpno').val()
    const dcfcEno = $('#TB07110S_2_empNo').val()
    const decdSttsDcd = $('#TB07110S_decdSttsDcd').val()

    // 담당자인 경우
    if (nowEmpno === stfno) {
      $('#TB07110S_apvlRqst').show()
      $('#TB07110S_apvlCncl').show()
      $('#TB07110S_apvl').hide()
      $('#TB07110S_gbck').hide()
      $('#TB07110S_excBtn').show();

      $('#TB07110S_saveBtn').show();
      $('#TB07110S_addRow').show();
      $('#TB07110S_delRow').show();
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').show();
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').show();
    }
    // 승인자인 경우
    else if (nowEmpno === dcfcEno) {
      $('#TB07110S_apvlRqst').hide()
      $('#TB07110S_apvlCncl').hide()
      $('#TB07110S_apvl').show()
      $('#TB07110S_gbck').show()
      $('#TB07110S_excBtn').hide();

      $('#TB07110S_saveBtn').hide();
      $('#TB07110S_addRow').hide();
      $('#TB07110S_delRow').hide();
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').hide();
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').hide();
    }
    // 해당사항이 없는경우 Default
    else {
      $('#TB07110S_apvlRqst').hide()
      $('#TB07110S_apvlCncl').hide()
      $('#TB07110S_apvl').hide()
      $('#TB07110S_gbck').hide()
      $('#TB07110S_excBtn').hide();

      $('#TB07110S_saveBtn').hide();
      $('#TB07110S_addRow').hide();
      $('#TB07110S_delRow').hide();
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').hide();
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').hide();
    }

    if (queryMode === "insert" && !$('#TB07110S_cnstNo').val()) {
      $('#TB07110S_excBtn').prop('disabled', false)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    else if (queryMode === "insert" && $('#TB07110S_cnstNo').val()) {
      $('#TB07110S_excBtn').prop('disabled', false)

      $('#TB07110S_saveBtn').prop('disabled', false)
      $('#TB07110S_addRow').prop('disabled', false)
      $('#TB07110S_delRow').prop('disabled', false)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', false)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', false)
    }
    else if (queryMode === "delete" && !$('#TB07110S_cnstNo').val()) {
      $('#TB07110S_excBtn').prop('disabled', true)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }

    // 결재단계, 결재상태 확인
    // 해당 사항이 없는경우
    if (decdSttsDcd === "0") {
      $('#TB07110S_apvlRqst').prop('disabled', false)
      $('#TB07110S_apvlCncl').prop('disabled', true)
      $('#TB07110S_apvl').prop('disabled', true)
      $('#TB07110S_gbck').prop('disabled', true)
      $('#TB07110S_excBtn').prop('disabled', false)

      $('#TB07110S_saveBtn').prop('disabled', false)
      $('#TB07110S_addRow').prop('disabled', false)
      $('#TB07110S_delRow').prop('disabled', false)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', false)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', false)
    }
    // 결재 진행중인 경우
    else if (decdSttsDcd === "1") {
      $('#TB07110S_apvlRqst').prop('disabled', true)
      $('#TB07110S_apvlCncl').prop('disabled', false)
      $('#TB07110S_apvl').prop('disabled', false)
      $('#TB07110S_gbck').prop('disabled', false)
      $('#TB07110S_excBtn').prop('disabled', true)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 승인된 경우
    else if (decdSttsDcd === "2") {
      $('#TB07110S_apvlRqst').prop('disabled', true)
      $('#TB07110S_apvlCncl').prop('disabled', true)
      $('#TB07110S_apvl').prop('disabled', true)
      $('#TB07110S_gbck').prop('disabled', true)
      $('#TB07110S_excBtn').prop('disabled', true)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 지급품의의 경우 반려된 경우 재승인요청,반려 불가능
    else if (decdSttsDcd === "3") {
      $('#TB07110S_apvlRqst').prop('disabled', true)
      $('#TB07110S_apvlCncl').prop('disabled', true)
      $('#TB07110S_apvl').prop('disabled', true)
      $('#TB07110S_gbck').prop('disabled', true)
      $('#TB07110S_excBtn').prop('disabled', true)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }
    // 승인취소된 내역은 조회 안됨
    // 조회가 되지 않은 상태
    else if (!decdSttsDcd) {
      $('#TB07110S_apvlRqst').prop('disabled', true)
      $('#TB07110S_apvlCncl').prop('disabled', true)
      $('#TB07110S_apvl').prop('disabled', true)
      $('#TB07110S_gbck').prop('disabled', true)
      $('#TB07110S_excBtn').prop('disabled', false)

      $('#TB07110S_saveBtn').prop('disabled', true)
      $('#TB07110S_addRow').prop('disabled', true)
      $('#TB07110S_delRow').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_AddFile').prop('disabled', true)
      $('div[data-menuid="/TB07110S"] #UPLOAD_DelFiles').prop('disabled', true)
    }

  }

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function pqGrid() {
    // 지급품의서실물증빙
    let col_txbl = [
      {
        title: "승인상태",
        dataType: "string",
        dataIndx: "decdSttsDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: 'range' }] },
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
        title: "회계일자",
        dataType: "string",
        dataIndx: "acctDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return formatDate(ui.cellData);
        }
      },
      {
        title: "발급일자",
        dataType: "string",
        dataIndx: "prufDt", //증빙일자로 세팅
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return formatDate(ui.cellData);
        }
      }
      // , {
      //   title: "발급거래처명",
      //   dataType: "string",
      //   dataIndx: "",
      //   halign: "center",
      //   align: "left",
      //   // width    : '10%',
      //   filter: { crules: [{ condition: 'range' }] },
      // }  //컬럼 미존재로 인한 숨김처리
      ,
      {
        title: "지급금액",
        dataType: "integer",
        dataIndx: "rslnAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "세액",
        dataType: "integer",
        dataIndx: "splmValuTxa",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "증빙구분",
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
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return grdSelect.P030.find(opt => opt.cdValue === ui.cellData) ? grdSelect.P030.find(opt => opt.cdValue === ui.cellData).cdName : ui.cellData
        }
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
        title: "지급방법",
        dataType: "string",
        dataIndx: "acctPymtMthCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: 'range' }] },
        render: function (ui) {
          return grdSelect.A018.find(opt => opt.cdValue === ui.cellData) ? grdSelect.A018.find(opt => opt.cdValue === ui.cellData).cdName : ui.cellData
        }
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
      {
        title: "예금주명",
        dataType: "string",
        dataIndx: "bnkAchdNm",
        hidden: true,
      },
    ];

    let col_basic = [
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
        filter: { crules: [{ condition: 'range' }] },
        editable: true,
      },
      {
        title: "차변금액",
        dataType: "string",
        dataIndx: "krwAmt",
        halign: "center",
        align: "right",
        editable: true,
        format: "#,###",  // 콤마 설정
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "적요",
        dataType: "string",
        dataIndx: "rslnSynsCtns",
        halign: "center",
        align: "left",
        editable: true,
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "차량등록",
        dataType: "string",
        dataIndx: "vhclRgstCd",
        halign: "center",
        align: "right",
        editable: true,
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "배부",
        dataType: "string",
        dataIndx: "배불뚝이 부자",
        halign: "center",
        align: "right",
        editable: true,
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        halign: "center",
        align: "center",
        editable: true,
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "", dataType: "", dataIndx: "", align: "center", halign: "center", minWidth: 36, maxWidth: 36,
        render: function (ui) {
          let rowIndx = ui.rowIndx;
          return `<button id='TB07110S_editableCtrler' class='ui-button ui-corner-all ui-widget' onclick="callTB06011P('TB07110S_grid',${rowIndx});"><i class='fa fa-search'></i></button>`
        }
      },
      {
        title: "펀드코드",
        dataType: "string",
        dataIndx: "nsFndCd",
        halign: "center",
        align: "center",
        editable: true,
        filter: { crules: [{ condition: 'range' }] },
      },
      {
        title: "작성일자",
        dataIndx: "wrtnDt",
        hidden: true,
      },
      {
        title: "결의부점코드",
        dataIndx: "rslnBdcd",
        hidden: true,
      },
      {
        title: "품의번호",
        dataIndx: "cnstNo",
        hidden: true,
      }
    ];

    let pqGridObjs = [
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07110S_grd_txbl'
        , colModel: col_txbl
        , rowClick: function (evt, ui) {

          pqGridSelectHandler( ui.rowIndx, "TB07110S_grd_txbl" );

          setInputDataFromSelectData(ui.rowData, "TB07110S_mergeForm #TB07110S");

          $(`#TB07110S_fnltCd`).val(ui.rowData['xtnlIsttCd']);
          $(`#TB07110S_fnltNm`).val(ui.rowData['xtnlIsttNm']);
          $(`#TB07110S_2_ardyBzepNo`).val(ui.rowData['acctBcncCd']);
          $(`#TB07110S_splmValuTxa`).val(addComma(ui.rowData['splmValuTxa']));
          $(`#TB07110S_2_entpNm`).val(ui.rowData['bcncNm']);
          $(`#TB07110S_2_empNm`).val(ui.rowData['reltStfnm']);
          $(`#TB07110S_2_empNo`).val(ui.rowData['reltStfno']);

          $(`#TB07110S_bnftYn`).prop('checked', ui.rowData['bnftYn'] == "Y");
          $(`#TB07110S_entmAccXstcYn`).prop('checked', ui.rowData['entmAccXstcYn'] == "Y");

          const paramData = {
            wrtnDt: ui.rowData['wrtnDt']
            , rslnBdcd: ui.rowData['rslnBdcd']
            , cnstNo: ui.rowData['cnstNo']
          }

          apvlBtnHandler();

          TB07110S_selectIBIMS432B(paramData);

          /**
           * 파일불러오기, 저장을 위한 키값 세팅
           */
          $(`div[data-menuid="/TB07110S"] #fileKey2`).val(ui.rowData['wrtnDt'] + ui.rowData['rslnBdcd'] + ui.rowData['cnstNo'])
          $('div[data-menuid="/TB07110S"] #key1').val("TB07110S")
          getFileInfo($('div[data-menuid="/TB07110S"] #key1').val(), $('div[data-menuid="/TB07110S"] #fileKey2').val());
        }
      },
      {
        height: 150
        , maxHeight: 150
        , id: 'TB07110S_grd_basic'
        , colModel: col_basic
        , cellClick: function ( evt, ui ) {
          if ( ui.dataIndx === "prdtCd" ) {
            ui.column.editable = false;
          }
          else if ( ui.dataIndx === "nsFndCd" ) {
            ui.column.editable = false;
          }
        }
      },
    ]

    setPqGrid(pqGridObjs);

    // Grid instance
    txbl = $("#TB07110S_grd_txbl").pqGrid('instance');
    basic = $("#TB07110S_grd_basic").pqGrid('instance');
  }

  function addRow() {
    var gridData = $("#TB07110S_grd_basic").pqGrid("option", "dataModel.data");
    const newRow = {
      wrtnDt: unformatDate($('#TB07110S_wrtnDt').val()),
      rslnBdcd: $('#TB07110S_rslnBdcd').val(),
      cnstNo: $('#TB07110S_cnstNo').val(),
      chkDel: "",
      actsCd: "",
      krwAmt1: '0',
      krwAmt2: '0',
    };
    $("#TB07110S_grd_basic").pqGrid("addRow", { rowData: newRow, checkEditable: false });
  }


  function delRow() {
    let gridData = $("#TB07110S_grd_basic").pqGrid('instance').pdata;

    for ( let i = gridData.length - 1; i >= 0; i-- ) {
      if ( gridData[i].delYn === "Y" ) {
        $("#TB07110S_grd_basic").pqGrid("deleteRow", { rowIndx: i });
      }
    }
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
      // wrtnDt: $("#TB07110S_wrtnDt").val()                  //  회계기간
      rslnBdcd: $("#TB07110S_dprtCd").val()                   //  부서코드  rslnBdcd
      , actsCd: $("#TB07110S_actsCd").val()                   //  계정과목
      , bcncNm: $("#TB07110S_bzepName").val()                 //  거래처명
      , acctDt1: $("#TB07110S_startDt").val().replaceAll('-', '')
      , acctDt2: $("#TB07110S_endDt").val().replaceAll('-', '')
      , elcPrufYn: 'Y'                                        // 전자증빙여부
      ,
    };

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS431B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        let gridList = $("#TB07110S_grd_txbl").pqGrid("instance");
        if (data.length > 0) {
          gridList.setData(data);
          gridList.getData();
        }
        else {
          Swal.fire({
            icon: "warning"
            , title: "Warning!"
            , text: "조회된 내역이 없습니다!"
          })
          gridList.setData([]);
        }
        resetInput();
      },
      error: function () {
        Swal.fire({
          icon: "error"
          , title: "Error!"
          , text: "조회 실패!"
        })
      },
    });
  }


  function TB07110S_selectIBIMS432B(paramData) {

    $.ajax({
      type: "POST",
      url: "/TB07100S/selectIBIMS432B",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data.length > 0) {
          let gridList = $("#TB07110S_grd_basic").pqGrid("instance");

          gridList.setData(data);
          gridList.getData();
        } else {

          Swal.fire({
            icon: 'warning'
            , title: 'Warning!'
            , text: '상세정보가 없습니다!'
          })

        }
      },
      error: function () { },
    });
  }
  /**
   * SELECT 모음
   */

  /**
   * 지급품의 실행
   */
  function doExc() {

    let url;
    let text;

    // 품의번호가 빈값이면 저장
    if (queryMode === "insert") {
      if (isEmpty($('#TB07110S_cnstNo').val())) {
        text = "저장"
        url = "insert"
      }
      // 품의번호가 있는경우 수정
      else {
        text = "수정"
        url = "update"
      }

      if ($('#TB07110S_rgstEmpno').val() === $('#TB07110S_2_empNo').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `담당자와 승인자가 같습니다! 변경해주세요`,
        })
        return;
      }
      else if (!$('#TB07110S_acctPymtMthCd').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `지급방법을 입력해주세요!`,
        })
        return;
      }
      else if (!$('#TB07110S_prufDt').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `증빙일자를 입력해주세요!`,
        })
        return;
      }
      else if (!$('#TB07110S_prufKndDcd').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `증빙종류를 입력해주세요!`,
        })
        return;
      }
      else if (!$('#TB07110S_pchsDdcDcd').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `매입공제를 입력해주세요!`,
        })
        return;
      }
      else if (!$('#TB07110S_2_entpNm').val()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: `거래처를 입력해주세요!`,
        })
        return;
      }
      else if (!$('#TB07110S_2_empNo').val()) {
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
      wrtnDt: unformatDate($('#TB07110S_wrtnDt').val())                               // 작성일자
      , rslnBdcd: $('#userDprtCd').val()                                              // 결의부점코드
      , cnstNo: $('#TB07110S_cnstNo').val()                                           // 품의번호
      , acctDt: unformatDate($('#TB07110S_acctDt').val())                             // 회계일자
      , rgstEmpno: $('#TB07110S_rgstEmpno').val()                                     // 등록사원번호
      , reltStfno: $('#TB07110S_2_empNo').val()                                       // 승인자
      , acctBcncCd: $('#TB07110S_2_ardyBzepNo').val()                                 // 회계거래처코드
      , bcncNm: $('#TB07110S_2_entpNm').val()                                         // 거래처명
      , acctPymtMthCd: $('#TB07110S_acctPymtMthCd').val()                             // 회계지급방법코드
      , bano: $('#TB07110S_bano').val()                                               // 은행계좌번호
      , prufKndDcd: $('#TB07110S_prufKndDcd').val()                                   // 증빙종류구분코드
      , pchsDdcDcd: $('#TB07110S_pchsDdcDcd').val()                                   // 매입공채구분코드
      , bnftYn: $('#TB07110S_bnftYn').is(":checked") ? "Y" : "N"                      // 편익여부
      , reltFdtnCtns: $('#TB07110S_reltFdtnCtns').val()                               // 관련근거내용
      , entmAccXstcYn: $('#TB07110S_entmAccXstcYn').is(":checked") ? "Y" : "N"        // 접대계정존재여부
      , jobDecdCd: "TB07110S"                                                         // 업무결재코드
      , fndsLdgDcd: $('#TB07110S_fndsLdgDcd').val()                                   // 자금원장구분코드
      , elcPrufYn: 'Y'                                                                // 전자증빙여부
      , xtnlIsttCd: $('#TB07110S_fnltCd').val()                                       // 외부기관코드
      , prufDt: unformatDate($('#TB07110S_prufDt').val())                             // 증빙일자
      , pymtPrarDt: unformatDate($('#TB07110S_pymtPrarDt').val())                     // 지급예정일자
      , rslnAmt: $('#TB07110S_rslnAmt').val().replaceAll(",", "")                     // 결의금액
      , splmValuTxa: $('#TB07110S_splmValuTxa').val().replaceAll(",", "")             // 부가가치세액
      , bnkAchdNm: $('#TB07110S_bnkAchdNm').val()                                     // 은행예금주명
      // , baltDt: unformatDate($('#TB07110S_baltDt').val())                             // 기표일자
      // , cdno: $('#TB07110S_cdno').val()                                               // 카드번호
      // , apvlNo: $('#TB07110S_apvlNo').val()                                           // 카드승인번호
      // , cnclYn: $('#TB07110S_cnclYn').val()                                           // 취소여부
      // , rgstSn: $('#TB07110S_rgstSn').val()                                           // 등록일련번호 - 채번일듯
      // , crryCd: $('#TB07110S_crryCd').val()                                           // 통화코드
      // , exrt: $('#TB07110S_exrt').val()                                               // 환율
      // , trId: $('#TB07110S_trId').val()                                               // 거래ID
      // , reltDcmNo: $('#TB07110S_reltDcmNo').val()                                     // 관련문서번호
      // , cntrAccXstcYn: $('#TB07110S_cntrAccXstcYn').val()                             // 기부계정존재여부
      // , jobDecdNo: $('#TB07110S_jobDecdNo').val()                                     // 업무결재번호 - 결재진행시 데이터 업데이트
      // , cnclJobDecdNo: $('#TB07110S_cnclJobDecdNo').val()                             // 취소업무결재번호 - 승인요청취소시 결재번호 업데이트
      // , fndsIstrSn: $('#TB07110S_fndsIstrSn').val()                                   // 자금지시일련번호
      // , sttmNo: $('#TB07110S_sttmNo').val()                                           // 전표번호
      // , sttmBdcd: $('#TB07110S_sttmBdcd').val()                                       // 전표부점코드
      // , cnclBaltDt: $('#TB07110S_cnclBaltDt').val()                                   // 취소기표일자
      // , cnclSttmNo: $('#TB07110S_cnclSttmNo').val()                                   // 취소전표번호
      // , cnstSttmDcd: $('#TB07110S_cnstSttmDcd').val()                                 // 품의전표구분코드
      // , excalYn: $('#TB07110S_excalYn').val()                                         // 정산여부
      // , fndsLdgNo: $('#TB07110S_fndsLdgNo').val()                                     // 자금원장번호
      // , actsCd: $('#TB07110S_actsCd').val()                                           // 계정과목코드 - 서비스에서 지정할듯
      // , edmsDcmId: $('#TB07110S_edmsDcmId').val()                                     // EDMS문서ID
      // , bdgBusiCd: $('#TB07110S_bdgBusiCd').val()                                     // 예산사업코드 - ??
      // , frcrRslnAmt: $('#TB07110S_frcrRslnAmt').val()                                 // 외화결의금액
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
          resetInput();
          TB07110S_selectIBIMS431B();
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
   * 결재요청
   * @returns
   */
  function apvlRqst() {

    const paramData = {
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07110S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07110S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07110S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07110S_2_empNo").val()             // 승인자
      , scrnNo: "TB07110S"                                  // 화면명
    }

    if ($('#TB07110S_rgstEmpno').val() === $('#TB07110S_2_empNo').val()) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: `담당자와 승인자가 같습니다! 변경해주세요`,
      })
      return;
    }
    else if (!$('#TB07110S_2_empNo').val()) {
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
            icon: "success"
            , title: "Success!"
            , text: "결재요청이 되었습니다!"
          })
          $('#TB07110S_decdSttsDcd').val('1');
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
          , title: "Error!"
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
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07110S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07110S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07110S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07110S_2_empNo").val()             // 승인자
      , scrnNo: "TB07110S"                                  // 화면명
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
          $('#TB07110S_decdSttsDcd').val('4');
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "승인요청취소 실패!"
          })
        }
        TB07110S_selectIBIMS431B();

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
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07110S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07110S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07110S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07110S_2_empNo").val()             // 승인자
      , scrnNo: "TB07110S"                                  // 화면명
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
          $('#TB07110S_decdSttsDcd').val('2');
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
      wrtnDt: unformatDate($("#TB07110S_wrtnDt").val())     // 작성일자
      , rslnBdcd: $('#TB07110S_rslnBdcd').val()             // 결의부점코드
      , cnstNo: $("#TB07110S_cnstNo").val()                 // 품의번호
      , rgstEmpno: $("#TB07110S_rgstEmpno").val()           // 작성자
      , reltStfno: $("#TB07110S_2_empNo").val()             // 승인자
      , scrnNo: "TB07110S"                                  // 화면명
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
          $('#TB07110S_decdSttsDcd').val('3');
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

  /**
   * 품의상세 저장
   */
  function saveIBIMS432B() {

    const paramData = $("#TB07110S_grd_basic").pqGrid('instance').pdata;

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
            , text: "저장 성공!"
          })
        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: "Warning!"
            , text: "저장 실패!"
          })
        }
        //
        let reSrchParamData = {
          wrtnDt: $("#TB07110S_wrtnDt").val().replaceAll('-', "")
          , rslnBdcd: $("#TB07110S_rslnBdcd").val()
          , cnstNo: $("#TB07110S_cnstNo").val()
        }
        TB07110S_selectIBIMS432B(reSrchParamData);

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
   * 행추가
   */
  function addRow() {
    var gridData = $("#TB07110S_grd_basic").pqGrid("option", "dataModel.data");
    const newRow = {
      wrtnDt: unformatDate($('#TB07110S_wrtnDt').val()),
      rslnBdcd: $('#TB07110S_rslnBdcd').val(),
      cnstNo: $('#TB07110S_cnstNo').val(),
      actsCd: "",
      krwAmt1: '0',
      krwAmt2: '0',
      elcPrufYn: "Y",
    };
    $("#TB07110S_grd_basic").pqGrid("addRow", { rowData: newRow, checkEditable: false });
  }

  /**
   * 행삭제
   */
  function delRow() {

    let gridData = $("#TB07110S_grd_basic").pqGrid('instance').pdata;

    for ( let i = gridData.length - 1; i >= 0; i-- ) {
      if ( gridData[i].delYn === "Y" ) {
        $("#TB07110S_grd_basic").pqGrid("deleteRow", { rowIndx: i });
      }
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
    resetAllInput: resetAllInput,
    resetInput: resetInput,
    doExc: doExc,
    apvlRqst: apvlRqst,
    apvlRqstCncl: apvlRqstCncl,
    apvl: apvl,
    rjct: rjct,
    addRow: addRow,
    delRow: delRow,
    toggleBtnHandler: toggleBtnHandler,
    saveIBIMS432B: saveIBIMS432B,
    tabController: tabController,
  };
})();
