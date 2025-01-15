const TB07120Sjs = (function () {
  let TB07120S_grdSelect = {};

  let TB07120S_nowRowData = {}; // 더블클릭시 로우데이터

  $(document).ready(function () {
    setGrid_TB07120S();
    setInput();
    fnSelectBox();
    createOption();
    getDealInfoFromWF();
  });

  /**
   * input 태그 기본 세팅
   */
  function setInput() {
    $("#ibims452b input").prop("readonly", true);
    $("#ibims452b button, #ibims452b select").prop("disabled", true);
    $("#TB07120S1_empNo, #TB07120S2_empNo").prop("readonly", false);
    $("#TB07120S_rqstBtn, #TB07120S_reltBtn").prop("disabled", false);
    // $(".TB07120S_isForeignTransfer").prop("disabled", true);
    $("#TB07120S_apvl").hide(); //승인버튼
    $("#TB07120S_gbck").hide(); //반려버튼
  }

  /**
   * 검색 조건 초기화
   */
  function srchReset_TB07120S () {
    $("#con-srch input").val("");
    $("#con-srch select").val("");
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
        // "/D005" + //  업무구분코드
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
    // TB07120S_grdSelect.D005 = selectBox.filter(function (item) { 
    //   return item.cmnsGrpCd === 'D005'; 
    // });
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
    let D005html;
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
    // TB07120S_grdSelect.D005.forEach((item) => {
    //   D005html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    // });

    console.log(TB07120S_grdSelect.D005);

    $("#TB07120S_dprtNm").append(D010html);
    // $('#TB07080S_ldgSttsCd').append(R031html);
    $("#TB07120S_consDecdDvsnCd").append(D016html);
    $("#TB07120S_trCrryCd").append(I027html);
    // $('#TB07080S_ldgSttsCd').append(D015html);
    $("#TB07120S_consDecdStatCd, #TB07120S_consDecdStatCd2").append(
      D006html
    );
    $("#TB07120S_fndsDvsnCd").append(F008html);
    // $('#TB07120S_decdJobDcd').append(D005html);

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
    /**
     * 2025-01-15 X건X
     * 대표님이 해당화면 관련 업무구분코드 주신다고 하셨음
     * 주신지 3주째 된듯함 주실때까지 숨을 참아보겠습니다.
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
        let consDecdStatCd = ui.rowData.consDecdStatCd;   
        setIbims452b(ui.rowData);
        decdStatChk(consDecdStatCd);
        //부속서류목록(TB06010S의 첨부파일 그대로 가져옴)
        $('#fileKey2').val(ui.rowData.prdtCd)
        getFileInfo($('#key1').val(), $('#fileKey2').val());
      },
    };

    $("#TB07120S_grid1").pqGrid(gridObj1);
    $("#TB07120S_grid1").pqGrid("refreshDataAndView");

    // var gridObj2 = {
    //   height: 100,
    //   maxHeight: 100,
    //   showTitle: false,
    //   showToolbar: false,
    //   collapsible: false,
    //   editable: false,
    //   wrap: false,
    //   hwrap: false,
    //   numberCell: { show: false },
    //   scrollModel: { autoFit: true },
    //   colModel: colM_Grid2,
    //   strNoRows: "",
    // };

    // $("#TB07120S_grid2").pqGrid(gridObj2);
    // $("#TB07120S_grid2").pqGrid("refreshDataAndView");
  }

  /**
  * setIbims452b 함수는 그리드에서 선택된 행의 데이터를 받아서 화면(id:Ibims452b)에 표시
  * @param {Object} rowData - 그리드에서 선택된 행의 데이터
  */
  function setIbims452b(rowData){
    const keys = Object.keys(rowData);

    let consDecdStatCd = rowData.consDecdStatCd;               //결재상태
    let trCrryCd = rowData.trCrryCd;                           //통화코드
    let depositWithdrawalCode = rowData.depositWithdrawalCode; //입출금구분

    // input ID 매핑 객체
    const idMap = {
      rqstStfno: "TB07120S1_empNo", //담당자(번호)
      rqstStfnm: "TB07120S1_empNm", //담당자(명)
      reltStfno: "TB07120S2_empNo", //승인자(번호)
      reltStfnm: "TB07120S2_empNm"  //승인자(명)
    };
    
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = rowData[key];
    
      // 기본 값 세팅
      $(`#ibims452b #TB07120S_${key}`).val(value);
    
      // 포맷 변환 로직
      // 거래일자(YYYY-MM-DD)
      if (key === "trDt") {
        $(`#ibims452b #TB07120S_trDt`).val(formatDate(rowData[keys[i]]))
      }
      //거래시간,처리시간
      if (key === "trDtm" || key === "hndlDtm") {
        let dateObj = new Date(rowData[keys[i]]);
        $(`#ibims452b #TB07120S_${key}`).val(dateObj.format("yyyy-MM-dd HH:mm:ss"));
      }
    
      // 특정 key에 따른 직접 세팅 (매핑 활용)
      if (idMap[key]) {
        $(`#ibims452b #${idMap[key]}`).val(value);
      }
    }
    
    $('#TB07120S_consDecdDvsnCd').val(rowData.consDecdDvsnCd) //결재단계구분
    $('#TB07120S_consDecdStatCd2').val(consDecdStatCd)        //결재상태

    TB07120S_nowRowData = {
      prdtCd : rowData.prdtCd,
      dealNo: rowData.dealNo,
      excSeq: rowData.excSn,
      trSeq: rowData.trSn,
      consDecdStatCd : consDecdStatCd,
      erlmSeq : rowData.erlmSeq,
    };
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
    let result;

    let prevDate = $("#TB07120S_selectDate1").val();
    let nextDate = $("#TB07120S_selectDate2").val();

    //날짜를 비교하여 오류가 있을 경우 경고 메시지를 띄움.
    if (prevDate > nextDate) {
      //openPopup 함수엔 알림확인 후 이벤트가 없어 Swal사용
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "시작일이 종료일보다 늦습니다. 날짜를 다시 확인해주세요.",
        confirmButtonText: "확인"
      }).then(() => {
        $("#TB07120S_selectDate1").focus();
      });
      return; 
    }

    const paramData = {
      orgno: $("#TB07120S_dprtCd").val(),
      prevDate: unformatDate(prevDate),
      nextDate: unformatDate(nextDate),
      depositWithdrawalCode :  $("#TB07120S_depositWithdrawalCode").val(), 
      prdtCd: $("#TB07120S_prdtCd").val(),
      consDecdStatCd: $("#TB07120S_consDecdStatCd").val(),
      trCrryCd: $("#TB07120S_trCrryCd").val(),
      trObjtBsnNo: $("#TB07120S_ardyBzepNo").val(),
      // , 업무구분: //아직 정해진게 없음
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
      //     icon:
      //     text: "조회내역이 없습니 result == -1 ? "warning" : result == -2 ? "error" : "info",다!",
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
   * 결재상태에 따른 버튼 활성화 상태 설정
   * @param consDecdStatCd 결재상태
   *
   * // TODO : 추후 결재상태에 따른 추가 동작 구현
   * 
   * 현재 동작:
   * - 결재상태가 '해당없음(0)', '반려(3)', '승인취소(4)'일 경우, 저장 및 승인요청 버튼 활성화
   * - 결재상태가 '진행중(1)'일 경우, 승인 및 반려 버튼 활성화
   * - 로그인한 사원이 승인자일 경우, 버튼 상태 및 반려사유 입력란을 활성화
  */
  function decdStatChk(consDecdStatCd) {
    let userNo = $("#userEno").val();                //로그인한 사원번호
    let reltStfno = $("#TB07120S2_empNo").val();  //해당건의 승인담당자 번호 

    if (!consDecdStatCd) {
      consDecdStatCd = "0";
    }

    /**
     * @param save = 저장버튼
     * @param apvlRqst = 승인요청버튼
     * @param apvl = 승인버튼
     * @param gbck = 반려버튼
     * @param apvlCncl = 승인취소버튼(현재 주석처리)
     */

    // 모든 버튼 비활성화
    $("#TB07120S_save").prop("disabled", true);
    $("#TB07120S_apvlRqst").prop("disabled", true);
    $("#TB07120S_apvl").prop("disabled", true);
    $("#TB07120S_gbck").prop("disabled", true);
    // $("#TB07120S_apvlCncl").prop("disabled", true);

    //반려사유 비활성화
    $("#TB07120S_rjctRsnCntn").prop("disabled", true);

    // 저장, 승인요청버튼만 활성화
    if (
      consDecdStatCd === "0" ||
      consDecdStatCd === "3" ||
      consDecdStatCd === "4"
    ) {
      $("#TB07120S_save").prop("disabled", false);
      $("#TB07120S_apvlRqst").prop("disabled", false);
      $(".TB07120S_isForeignTransfer").prop("disabled", false);
    }
    // 승인, 반려만 활성화
    else if (consDecdStatCd === "1") {
      $("#TB07120S_apvl").prop("disabled", false);
      $("#TB07120S_gbck").prop("disabled", false);
      $(".TB07120S_isForeignTransfer").prop("disabled", true);
      // $("#TB07120S_rjctRsnCntn").prop("disabled", false); 
    }
    // 승인취소만 활성화
    // else if (consDecdStatCd === "2") {
    //   $("#TB07120S_apvlCncl").prop("disabled", false);
    // }
    
    // 현재 로그인한 직원인 승인자인지 확인
    // 승인자인 경우, 버튼 상태 및 반려사유 입력란을 설정
    if(userNo === reltStfno){
      $("#TB07120S_save").hide();     //저장버튼 숨기기
      $("#TB07120S_apvlRqst").hide(); //승인요청버튼 숨기기
      $("#TB07120S_apvl").show();     //승인버튼 보이기
      $("#TB07120S_gbck").show();     //반려버튼 보이기

      $("#TB07120S_rjctRsnCntn").prop("disabled", false); //반려사유 활성화
    }
  }

  /**
   * @param consDecdStatBtnNo // 버튼번호
   * 
   *  
   */
  function updateFndsCnstDecd(consDecdStatBtnNo) {
    let result;
    let query;
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

    // const nowStat = $("#TB07120S_consDecdStatCd").val();
    // TODO : query 결제단계구분에 담당자작성중일 때 따로 처리 해야함
    if(TB07120S_nowRowData.consDecdStatCd === "0"){
      query = "insert";
    }else{
      query = "update";
    }

    console.log("query : ", query);
    
    // if(nowStat == ""){ //전체
    //   if(TB07120S_nowRowData.consDecdStatCd === "0"){
    //     query = "insert";
    //   }else{
    //     query = "update";
    //   }
    // } else if(nowStat === "0"){
    //   query = "insert";
    // } else{
    //   query = "update";
    // }
    // console.log(nowStat);

    // 유효성 검사 실패 시 멈추도록 수정
    if (!TB07120S_validateFields(consDecdStatBtnNo)) {
        return;
    }
    
    /**
     * @param dealNo 딜번호
     * @param excSeq 거래일련번호
     * @param trSeq 실행일련번호
     * @param TB07120S2_empNo 승인자
     * @param TB07120S1_empNo 담당자
     * @param TB07120S_rjctRsnCntn 반려사유
     * // TODO : 해와송금여부 입력 받기로 함(2024.12.30)
     *    - 현재 테이블(IBIMS452B:자금이체품의내역)에 해외송금여부 칼럼이 없어 추가 필요   
     */
    const paramData = {
      prdtCd : TB07120S_nowRowData.prdtCd,           //상품코드
      excSeq: TB07120S_nowRowData.excSeq,            //실행순번
      trSeq: TB07120S_nowRowData.trSeq,              //거래순번
      erlmSeq : TB07120S_nowRowData.erlmSeq,         //등록순번
      //chrrDvsnCd:            // 담당자구분코드
      reltStfno: $("#TB07120S2_empNo").val(),        //신청직원번호
      rqstStfno: $("#TB07120S1_empNo").val(),        //승인자
      consDecdDvsnCd: consDecdDvsnCd,                //품의결재구분코드
      consDecdStatCd: consDecdStatBtnNo,             //결재상태코드
      rjctRsnCntn: $("#TB07120S_rjctRsnCntn").val(), //반려사유내용
      hndEmpno : $("#userEno").val(),                //조작사원번호
      ovrsTrnsYn : $("input[name='radioGroup-1']:checked").val() //해외송금여부 
    };

    $.ajax({
      type: "POST",
      // url: `/TB07120S/${query}FndsCnstDecd`,
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
      // console.log("result : ", result)
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

  /**
  * 결재상태 버튼 클릭 시 입력 필드 검증
  * @param consDecdStatBtnNo 결재상태 번호 ('0'- 저장, '1' - 승인요청, '3' - 반려)
  */
  function TB07120S_validateFields(consDecdStatBtnNo){
    let rqstStfno = $("#TB07120S1_empNo").val(); //담당자
    let reltStfno = $("#TB07120S2_empNo").val(); //승인자
    let rjctRsnCntn = $("#TB07120S_rjctRsnCntn").val(); //반려사유
    let ovrsTrnsYn = $("input[name='radioGroup-1']:checked").val(); //해외송금여부 
    //저장
    if(consDecdStatBtnNo === "0" ){
      if(!rqstStfno){
        openPopup({ type: "info", text: "담당자 정보를 입력해주세요." });
        return false;
      }
    //승인요청
    } else if(consDecdStatBtnNo === "1" ){
      if(!rqstStfno){
        openPopup({ type: "info", text: "담당자 정보를 입력해주세요." });
        return false;
      }

      if(!reltStfno){
        openPopup({ type: "info", text: "승인자 정보를 입력해주세요." });
        return false;
      }

      if(!ovrsTrnsYn){
        openPopup({ type: "info", text: "해외송금여부를 선택해주세요." });
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

  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			// console.log("WF세션 있음");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07120S_prdtCd").val(prdtCd);
			$("#TB07120S_prdtNm").val(prdtNm);
      get07120sList();
		}else{
			// console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

  return {
    get07120sList: get07120sList,
    updateFndsCnstDecd: updateFndsCnstDecd,
    srchReset_TB07120S: srchReset_TB07120S,
    getDealInfoFromWF: getDealInfoFromWF,
  };
})();
