const TB07190Sjs = (function () {
  let TB07190S_rowData = {};
  const TB07190S_dummyData = TB07190S_rowData;
  let TB07190S_rowIndx;
  let TB07190S_pqGridLength = 0;
  let selectBox;
  let grdSelect = {};

  $(document).ready(function () {
    // fnSelectBox();
    // createSelectTag();
    pqGrid();
  });

  // const resetInputData = () => {
  //     $('input').val('');
  //     $('select').val('');
  //     $('input[id*="Amt"], input[id*=Rt]').val(0)
  // }

  /*
   *  =====================OptionBox데이터 SET=====================
   */
  // function fnSelectBox() {
  //     selectBox = getSelectBoxList("TB07190",
  //         "/F004"
  //         + "/F006"
  //         + "/A005"
  //         + "/R012"
  //         + "/F015"
  //         + "/A001"
  //         + "/A004"
  //         , false);

  //     grdSelect.F004 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F004'; });		//	수수료종류
  //     grdSelect.F006 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F006'; });		//	수수료인식구분
  //     grdSelect.A005 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A005'; });		//	계정과목코드
  //     grdSelect.R012 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R012'; });		//	등록상태
  //     grdSelect.F015 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F015'; });		//	수수료산정구분
  //     grdSelect.A001 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A001'; });		//	회계업무코드
  //     grdSelect.A004 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'A004'; });		//	회계단위업무코드
  // }

  // function createSelectTag() {

  //     //  수수료종류
  //     let f004Html;
  //     grdSelect.F004.forEach(item => {
  //         f004Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_feeKndCd').append(f004Html);

  //     //  수수료인식구분
  //     let f006Html;
  //     grdSelect.F006.forEach(item => {
  //         f006Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_feeRcogDcd').append(f006Html);

  //     //  계정과목코드
  //     let a005Html;
  //     grdSelect.A005.forEach(item => {
  //         a005Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_actCd').append(a005Html);

  //     //  수수료산정구분
  //     let f015Html;
  //     grdSelect.F015.forEach(item => {
  //         f015Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_feeRcknDcd').append(f015Html);

  //     //  회계업무코드
  //     let a001Html;
  //     grdSelect.A001.forEach(item => {
  //         a001Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_acctJobCd').append(a001Html);

  //     //  회계단위업무코드
  //     let a004Html;
  //     grdSelect.A004.forEach(item => {
  //         a004Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
  //     });
  //     $('#TB07190S_acctUnJobCd').append(a004Html);
  // }

  /*
   *  =====================OptionBox데이터 SET=====================
   */

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  pqGrid colModel
   */
  function TB07190S_colModelData() {
    const TB07190S_colModel1 = [
      {
        title: "딜번호",
        dataType: "string",
        dataIndx: "dealNo",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "딜명",
        dataType: "string",
        dataIndx: "dealNm",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업체번호",
        dataType: "string",
        dataIndx: "ardyBzepNo",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업체명",
        dataType: "string",
        dataIndx: "bzepName",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "약정일자",
        dataType: "string",
        dataIndx: "ctrcDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "약정만기일자",
        dataType: "string",
        dataIndx: "ctrcExpDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "약정금액",
        dataType: "string",
        dataIndx: "eprzCrdlCtrcAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업신용공여수수료종류코드",
        dataType: "string",
        dataIndx: "eprzCrdlFeeKndCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료명",
        dataType: "string",
        dataIndx: "feeName",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "수수료대상금액",
        dataType: "string",
        dataIndx: "feeStdrAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래일자",
        dataType: "string",
        dataIndx: "trDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "수수료금액",
        dataType: "string",
        dataIndx: "feeAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "할인율",
        dataType: "string",
        dataIndx: "dcRt",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기산일자",
        dataType: "string",
        dataIndx: "rkfrDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "기업신용공여거래종류코드",
        dataType: "string",
        dataIndx: "etprCrdtGrntTrKindCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계단위업무코드",
        dataType: "string",
        dataIndx: "actgAfrsCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "IFRS수수료인식구분코드",
        dataType: "string",
        dataIndx: "ifrsFeeRcogDcd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업부수수료인식구분코드",
        dataType: "string",
        dataIndx: "eprzCrdlFeeRcogDcd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료과세여부",
        dataType: "string",
        dataIndx: "feeTxtnYn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업부수수료과세여부",
        dataType: "string",
        dataIndx: "busiNmcpCplTxtnYn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "재무이연비율",
        dataType: "string",
        dataIndx: "fnnrPrlnRto",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "재무인식시작일자",
        dataType: "string",
        dataIndx: "fnnrRcogStrtDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "재무인식종료일자",
        dataType: "string",
        dataIndx: "fnnrRcogEndDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "재무이연기간일수",
        dataType: "string",
        dataIndx: "fnnrPrlnPrdDnum",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "일시인식금액",
        dataType: "string",
        dataIndx: "dtmRcogAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이연수수료금액",
        dataType: "string",
        dataIndx: "prlnFee",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리이연비율",
        dataType: "string",
        dataIndx: "mngmPrlnRto",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리인식시작일자",
        dataType: "string",
        dataIndx: "mngmRcogStrtDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "관리인식종료일자",
        dataType: "string",
        dataIndx: "mngmRcogEndDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "관리이연기간일수",
        dataType: "string",
        dataIndx: "mngmPrlnPrdDnum",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리일시인식금액",
        dataType: "string",
        dataIndx: "mngmDtmRcogAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리이연수수료금액",
        dataType: "string",
        dataIndx: "mngmPrlnFee",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "실행순번",
        dataType: "string",
        dataIndx: "excSn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료순번",
        dataType: "string",
        dataIndx: "feeSn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "crncyCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산율1",
        dataType: "string",
        dataIndx: "wcrcTrslRt",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산거래수수료금액",
        dataType: "string",
        dataIndx: "wcrcTrslTrFeeAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래상태코드",
        dataType: "string",
        dataIndx: "trStatCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "조작상세일시",
        dataType: "string",
        dataIndx: "hndDetlDtm",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "조작직원번호",
        dataType: "string",
        dataIndx: "hndEmpno",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      // , {
      //     title: "기안문서번호",
      //     dataType: "string",
      //     dataIndx:
      //     halign: "center",
      //     align: "left",
      //     width: "180",
      //     filter: { crules: [{ condition: 'range' }] }
      // }
    ];

    // const TB07190S_colModel1 = [
    //     {
    //         title: "순번",
    //         dataType: "string",
    //         dataIndx: "",     //  ROWNUM
    //         halign: "center",
    //         align: "center",
    //         width: "580,
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "deal번호",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "딜명",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "거래상태",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "약정일자",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "만기일자",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "약정금액",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "예정일자",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "수수료종류",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "수수료계정과목",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "기산일자",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "이연인식기준",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     , {
    //         title: "과세여부",
    //         dataType: "string",
    //         dataIndx: "",   //  FEE_NM
    //         halign: "center",
    //         align: "center",
    //         width: "180",
    //         filter: { crules: [{ condition: 'range' }] }
    //     }
    //     // , {
    //     //     title: "수수료인식구분",
    //     //     dataType: "string",
    //     //     dataIndx: "",     //  FEE_RCOG_DCD F006
    //     //     halign: "center",
    //     //     align: "center",
    //     //     width: "180",
    //     //     filter: { crules: [{ condition: 'range' }] },
    //     //     editor: {
    //     //         type: "select",
    //     //         valueIndx: "cdValue",
    //     //         labelIndx: "cdName",
    //     //         options: grdSelect.F006
    //     //     },
    //     //     render: function (ui) {
    //     //         let fSel = grdSelect.F006.find(({ cdValue }) => cdValue == ui.cellData);
    //     //         return fSel ? fSel.cdName : ui.cellData;
    //     //     }
    //     // }
    // ]

    return TB07190S_colModel1;
  }

  /*
   *  PQGRID SETTING
   */
  function pqGrid() {
    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 360,
        maxHeight: 360,
        id: "TB07190S_colModel1",
        colModel: TB07190S_colModelData(),
        scrollModel: { autoFit: false },
        editable: false,
        // , rowClick: function (event, ui) {
        //     if (TB07190S_rowData === ui.rowData) {
        //         TB07190S_rowData = TB07190S_dummyData;
        //     } else {
        //         TB07190S_rowData = ui.rowData;
        //     }
        // }
        // , selectionModel: { type: 'row' }
      },
    ];
    setPqGrid(pqGridObjs);
    $("#TB07190S_colModel1").pqGrid("instance");
  }

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  ====================PQGRID변환====================
   */

  /*
   *  PQGRID 초기화
   */
  function TB07190S_resetPqGrid(colModelId) {
    colModelIdSelector(colModelId).pqGrid("option", "dataModel.data", []);
    colModelIdSelector(colModelId).pqGrid("refreshDataAndView");
  }

  /*
   *  PQGRID 아이디 선택
   */
  const colModelIdSelector = (colModelId) => {
    return $(`#${colModelId}`);
  };
  /*
   *  =====================PQGRID=====================
   */

  /*
   *  =====================SELECT모음=====================
   */

  /*
   *  SELECT 수수료종류
   */
  function getData() {
    let result;

    let paramData = {
      actsCd: $("#TB07190S_actsCd").val(),
      etprCrdtGrntTrKindCd: $("#TB07190S_etprCrdtGrntTrKindCd").val(),
      trStatCd: $("#TB07190S_trStatCd").val(),
      dealNo: $("#TB07190S_ibDealNo").val(),
      ardyBzepNo: $("#TB07190S_ardyBzepNo").val(),
    };

    $.ajax({
      type: "POST",
      url: "/TB07190S/getTB07190SData",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        if (data) {
          result = 1;
          let grid = $("#TB07190S_colModel1").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07190S_pqGridLength = grid.pdata.length;
        } else {
          result = -1;
          Swal.fire({
            icon: "warning",
            text: "정보가 없습니다!",
          });
        }
      },
      error: function () {
        result = -2;
        Swal.fire({
          icon: "error",
          text: "정보가 없습니다!",
        });
      },
    });
  }

  /*
   *  =====================SELECT모음=====================
   */

  // function insertFeeData() {

  //     let result;

  //     let param = $('#feeData input, #feeData select');
  //     let paramData = {};

  //     param.each(function () {
  //         let id = $(this).attr('id');
  //         let value = $(this).val();

  //         if (value === "") {
  //             // select 태그 바로 위에 있는 label 태그를 찾음
  //             let labelElement = $(this).closest('.input-group').prev('label');

  //             // label의 텍스트 가져오기
  //             let labelText = labelElement.text();

  //             if (labelText === "") {

  //             } else {
  //                 // 경고 메시지 출력
  //                 alert(labelText + '을(를) 입력해주세요!');
  //                 return false;
  //             }
  //         }
  //         paramData[id] = value;
  //     })

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BInsert",
  //         contentType: "application/json; charset=UTF-8",
  //         dataType: "json",
  //         data: JSON.stringify(paramData),
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     // if (result != 1) {
  //     //     Swal.fire({
  //     //         icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //     //         text: '정보가 없습니다!'
  //     //     })
  //     // }
  // }

  // function updateFeeData() {

  //     let result;

  //     let _미정 = $('').val();

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BUpdate",
  //         contentType: "application/json; charset=UTF-8",
  //         data: _미정,
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     if (result != 1) {
  //         Swal.fire({
  //             icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //             text: '정보가 없습니다!'
  //         })
  //     }
  // }

  /*
   *  =====================DELETE모음=====================
   */

  // function deleteFeeData() {

  //     let result;

  //     let _미정 = $('').val();

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BDelete",
  //         contentType: "application/json; charset=UTF-8",
  //         data: _미정,
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     if (result != 1) {
  //         Swal.fire({
  //             icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //             text: '정보가 없습니다!'
  //         })
  //     }
  // }

  /*
   *  =====================DELETE모음=====================
   */

  return {
    getData: getData,
  };
})();
