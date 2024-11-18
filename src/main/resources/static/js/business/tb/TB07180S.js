const TB07180Sjs = (function () {
  let TB07180S_rowData = {};
  const TB07180S_dummyData = TB07180S_rowData;
  let TB07180S_rowIndx;
  let TB07180S_pqGridLength = 0;
  let selectBox;
  let grdSelect = {};

  $(document).ready(function () {
    $('input[id*="Amt"], input[id*=Rt]').val(0);
    selectorNumberFormater($('input[id*="Amt"], input[id*=Rt]'));
    fnSelectBox();
    createSelectTag();
    pqGrid();
  });

  const resetInputData = () => {
    $("input").val("");
    $("select").val("");
    $('input[id*="Amt"], input[id*=Rt]').val(0);
  };

  /*
   *  =====================OptionBox데이터 SET=====================
   */
  function fnSelectBox() {
    selectBox = getSelectBoxList(
      "TB07180",
      "/F004" + "/F006" + "/A005" + "/R012" + "/F015" + "/A001" + "/A004",
      false
    );

    grdSelect.F004 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F004";
    }); //	수수료종류
    grdSelect.F006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F006";
    }); //	수수료인식구분
    grdSelect.A005 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "A005";
    }); //	계정과목코드
    grdSelect.R012 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "R012";
    }); //	등록상태
    grdSelect.F015 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F015";
    }); //	수수료산정구분
    grdSelect.A001 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "A001";
    }); //	회계업무코드
    grdSelect.A004 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "A004";
    }); //	회계단위업무코드
  }

  function createSelectTag() {
    //  수수료종류
    let f004Html;
    grdSelect.F004.forEach((item) => {
      f004Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_feeKndCd").append(f004Html);

    //  수수료인식구분
    let f006Html;
    grdSelect.F006.forEach((item) => {
      f006Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_feeRcogDcd").append(f006Html);

    //  계정과목코드
    let a005Html;
    grdSelect.A005.forEach((item) => {
      a005Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_actCd").append(a005Html);

    //  수수료산정구분
    let f015Html;
    grdSelect.F015.forEach((item) => {
      f015Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_feeRcknDcd").append(f015Html);

    //  회계업무코드
    let a001Html;
    grdSelect.A001.forEach((item) => {
      a001Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_acctJobCd").append(a001Html);

    //  회계단위업무코드
    let a004Html;
    grdSelect.A004.forEach((item) => {
      a004Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB07180S_acctUnJobCd").append(a004Html);
  }

  /*
   *  =====================OptionBox데이터 SET=====================
   */

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  pqGrid colModel
   */
  function TB07180S_colModelData() {
    const TB07180S_colModel1 = [
      {
        title: "순번",
        dataType: "string",
        dataIndx: "rownum", //  ROWNUM
        halign: "center",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료종류",
        dataType: "string",
        dataIndx: "feeKndCd", //  FEE_KND_CD F004
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.F004,
        },
        render: function (ui) {
          let fSel = grdSelect.F004.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "수수료명",
        dataType: "string",
        dataIndx: "feeNm", //  FEE_NM
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료인식구분",
        dataType: "string",
        dataIndx: "feeRcogDcd", //  FEE_RCOG_DCD F006
        halign: "center",
        align: "center",
        width: "10%",
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
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actCd", //  ACT_CD A005
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.A005,
        },
        render: function (ui) {
          let fSel = grdSelect.A005.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "등록상태",
        dataType: "string",
        dataIndx: "rgstSttsCd", //  RGST_STTS_CD R012
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.R012,
        },
        render: function (ui) {
          let fSel = grdSelect.R012.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "수수료산정구분",
        dataType: "string",
        dataIndx: "feeRcknDcd", //  FEE_RCKN_DCD F015
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.F015,
        },
        render: function (ui) {
          let fSel = grdSelect.F015.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "수수료율",
        dataType: "string",
        dataIndx: "feeRt", //  FEE_RT
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료최저금액",
        dataType: "string",
        dataIndx: "feeLwstAmt", //  FEE_LWST_AMT
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료최고금액",
        dataType: "string",
        dataIndx: "feeHgstAmt", //  FEE_HGST_AMT
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계업무코드",
        dataType: "string",
        dataIndx: "acctJobCd", //  ACCT_JOB_CD A001
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.A001,
        },
        render: function (ui) {
          let fSel = grdSelect.A001.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "회계단위업무코드",
        dataType: "string",
        dataIndx: "acctUnJobCd", //  ACCT_UN_JOB_CD A004
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.A004,
        },
        render: function (ui) {
          let fSel = grdSelect.A004.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
      },
      {
        title: "회계거래코드",
        dataType: "string",
        dataIndx: "acctTrCd", //  ACCT_TR_CD A003
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "등록자",
        dataType: "string",
        dataIndx: "rgstEmpNm", //  RGST_EMP_NM
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "등록일시",
        dataType: "string",
        dataIndx: "hndDetlDtm", //  HND_DETL_DTM
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    return TB07180S_colModel1;
  }

  /*
   *  PQGRID SETTING
   */
  function pqGrid() {
    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 280,
        maxHeight: 280,
        id: "TB07180S_colModel1",
        colModel: TB07180S_colModelData(),
        scrollModel: { autoFit: false },
        editable: false,
        // , rowClick: function (event, ui) {
        //     if (TB07180S_rowData === ui.rowData) {
        //         TB07180S_rowData = TB07180S_dummyData;
        //     } else {
        //         TB07180S_rowData = ui.rowData;
        //     }
        // }
        // , selectionModel: { type: 'row' }
      },
    ];
    setPqGrid(pqGridObjs);
    $("#TB07180S_colModel1").pqGrid("instance");
  }

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  ====================PQGRID변환====================
   */

  /*
   *  PQGRID 줄추가
   */
  function TB07180S_addNewRow(colModelId) {
    let row = [];
    let newRow = {};
    const data = colModelIdSelector(colModelId).pqGrid("instance");
    const rowColumnsData = data.colModel;
    console.log(rowColumnsData);
    const length = rowColumnsData.length;
    for (let i = 0; i < length; i++) {
      const title = rowColumnsData[i].title;
      const dataIndx = rowColumnsData[i].dataIndx;
      row.push(title);
      if (title === "등록상태") {
        newRow[dataIndx] = "신규";
      } else {
        newRow[dataIndx] = "";
      }
    }
    console.log(newRow);

    colModelIdSelector(colModelId).pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });
  }

  /*
   *  PQGRID 줄삭제
   */
  function TB07180S_deleteRow(colModelId, yourFunction) {
    let getLength =
      colModelIdSelector(colModelId).pqGrid("instance").pdata.length;
    let colModel = colModelIdSelector(colModelId);

    if (
      TB07180S_rowData != TB07180S_dummyData &&
      TB07180S_pqGridLength < getLength &&
      !TB07180S_rowData.excSn
    ) {
      colModel.pqGrid("deleteRow", {
        rowData: TB07180S_rowData,
        checkEditable: false,
      });
      TB07180S_rowData = TB07180S_dummyData;
    } else if (
      TB07180S_rowData === TB07180S_dummyData &&
      TB07180S_pqGridLength < getLength
    ) {
      colModel.pqGrid("deleteRow", {
        rowData: TB07180S_rowData,
        checkEditable: false,
      });
      TB07180S_rowData = TB07180S_dummyData;
    } else if (
      TB07180S_rowData === TB07180S_dummyData &&
      TB07180S_pqGridLength === getLength
    ) {
      if (TB07180S_pqGridLength === 0) {
        Swal.fire({
          icon: "warning",
          text: "삭제할 데이터가 없습니다",
          confirmButtonText: "확인",
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: "삭제할 데이터가 없습니다",
          confirmButtonText: "확인",
        });
      }
    } else if (TB07180S_rowData != TB07180S_dummyData) {
      Swal.fire({
        icon: "warning",
        text: "정말 삭제하시겠습니까?",
        confirmButtonText: "확인",
        denyButtonText: "아니오",
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          yourFunction();
          TB07180S_rowData = TB07180S_dummyData;
          return;
        } else if (result.isDenied) {
          TB07180S_rowData = TB07180S_dummyData;
          return;
        }
      });
    }
  }

  /*
   *  PQGRID 초기화
   */
  function TB07180S_resetPqGrid(colModelId) {
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
  function getFeeData() {
    let result;

    let 수수료명_미정 = $("").val();

    $.ajax({
      type: "POST",
      url: "/TB07180S/IBIMS421BSelect",
      contentType: "application/json; charset=UTF-8",
      data: 수수료명_미정,
      success: function (data) {
        if (data) {
          let grid = $("#TB07180S_colModel").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07180S_pqGridLength = grid.pdata.length;
          result = 1;
        } else {
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    });

    if (result != 1) {
      Swal.fire({
        icon: result === -1 ? "warning" : result === -2 ? "error" : "",
        text: "정보가 없습니다!",
      });
    }
  }

  /*
   *  =====================SELECT모음=====================
   */

  function insertFeeData() {
    let result;

    let param = $("#feeData input, #feeData select");
    let paramData = {};

    param.each(function () {
      let id = $(this).attr("id");
      let value = $(this).val();

      if (value === "") {
        // select 태그 바로 위에 있는 label 태그를 찾음
        let labelElement = $(this).closest(".input-group").prev("label");

        // label의 텍스트 가져오기
        let labelText = labelElement.text();

        if (labelText === "") {
        } else {
          // 경고 메시지 출력
          alert(labelText + "을(를) 입력해주세요!");
          return false;
        }
      }
      paramData[id] = value;
    });

    $.ajax({
      type: "POST",
      url: "/TB07180S/IBIMS421BInsert",
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      data: JSON.stringify(paramData),
      success: function (data) {
        if (data) {
          let grid = $("#TB07180S_colModel").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07180S_pqGridLength = grid.pdata.length;
          result = 1;
        } else {
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    });

    // if (result != 1) {
    //     Swal.fire({
    //         icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
    //         text: '정보가 없습니다!'
    //     })
    // }
  }

  function updateFeeData() {
    let result;

    let 수수료명_미정 = $("").val();

    $.ajax({
      type: "POST",
      url: "/TB07180S/IBIMS421BUpdate",
      contentType: "application/json; charset=UTF-8",
      data: 수수료명_미정,
      success: function (data) {
        if (data) {
          let grid = $("#TB07180S_colModel").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07180S_pqGridLength = grid.pdata.length;
          result = 1;
        } else {
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    });

    if (result != 1) {
      Swal.fire({
        icon: result === -1 ? "warning" : result === -2 ? "error" : "",
        text: "정보가 없습니다!",
      });
    }
  }

  /*
   *  =====================DELETE모음=====================
   */

  function deleteFeeData() {
    let result;

    let 수수료명_미정 = $("").val();

    $.ajax({
      type: "POST",
      url: "/TB07180S/IBIMS421BDelete",
      contentType: "application/json; charset=UTF-8",
      data: 수수료명_미정,
      success: function (data) {
        if (data) {
          let grid = $("#TB07180S_colModel").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07180S_pqGridLength = grid.pdata.length;
          result = 1;
        } else {
          result = -1;
        }
      },
      error: function () {
        result = -2;
      },
    });

    if (result != 1) {
      Swal.fire({
        icon: result === -1 ? "warning" : result === -2 ? "error" : "",
        text: "정보가 없습니다!",
      });
    }
  }

  /*
   *  =====================DELETE모음=====================
   */

  return {
    getFeeData: getFeeData,
    resetInputData: resetInputData,
    insertFeeData: insertFeeData,
  };
})();
