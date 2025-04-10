const TB07130Sjs = (function () {
  let acctDtls; // 회계대사내역
  let thdtTrDtls; // 당일거래내역

  $(document).ready(function () {
    fnSelectBox();
    pqGrid();
  });

  /**
   * 전역변수
   */
  let prevRowIndx;

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function pqGrid() {
    // 회계대사내역
    let col_acctDtls = [
      {
        title: "부서코드",
        dataType: "string",
        dataIndx: "mngmBdcd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "부서명",
        dataType: "string",
        dataIndx: "mngmBdcdNm",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목코드명",
        dataType: "string",
        dataIndx: "actsCdNm",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "당일원장금액",
        dataType: "string",
        dataIndx: "ldgrTrAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "당일계정금액",
        dataType: "string",
        dataIndx: "acctRfltAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "당일차액",
        dataType: "string",
        dataIndx: "thdtDifaAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원장잔액",
        dataType: "string",
        dataIndx: "ldgrRmnd",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    let col_thdtTrDtls = [
      {
        title: "Deal번호",
        dataType: "string",
        dataIndx: "dealNo",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래순번",
        dataType: "string",
        dataIndx: "trSn",
        halign: "center",
        align: "right",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래종류코드",
        dataType: "string",
        dataIndx: "etprCrdtGrntTrKindCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "증감구분",
        dataType: "string",
        dataIndx: "icdcDcd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래원금",
        dataType: "string",
        dataIndx: "dealTrPrca",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래이자",
        dataType: "string",
        dataIndx: "trIntAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래수수료",
        dataType: "string",
        dataIndx: "trFeeAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래비용",
        dataType: "string",
        dataIndx: "dealTrAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계업무코드",
        dataType: "string",
        dataIndx: "actgAfrsCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계단위업무코드",
        dataType: "string",
        dataIndx: "actgUnitAfrsCd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    let pqGridObjs = [
      {
        height: 200,
        maxHeight: 200,
        id: "grd_acctDtls",
        colModel: col_acctDtls,
        numberCell: {
          show: true,
          width: 40,
          resizable: true,
          title: "<p class='text-center'>No</p>",
        },
        rowDblClick: function (event, ui) {
          $('#grd_acctDtls').pqGrid('removeClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: prevRowIndx });
          $('#grd_acctDtls').pqGrid('addClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: ui.rowIndx});
          prevRowIndx = ui.rowIndx;
          thdtTrDtlsGetData(ui.rowData);
        },
        //   , scrollModel : { autoFit: false }
      },
      {
        height: 200,
        maxHeight: 200,
        id: "grd_thdtTrDtls",
        colModel: col_thdtTrDtls,
        numberCell: {
          show: true,
          width: 40,
          resizable: true,
          title: "<p class='text-center'>No</p>",
        },
        //   , scrollModel : { autoFit: false }
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    acctDtls = $("#grd_acctDtls").pqGrid("instance");
    thdtTrDtls = $("#grd_thdtTrDtls").pqGrid("instance");
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  function selectIBIMS451B() {
    paramData = {
      stdrDt: unformatDate($("#TB07130S_stdrDt").val()),
      actsCd: $("#TB07130S_actsCd").val(),
      mngmBdcd: $("#TB07130S_dprtCd").val(),
    };

    $.ajax({
      type: "POST",
      url: `/TB07130S/selectIBIMS451B`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        let detail = $("#grd_acctDtls").pqGrid("instance");
        if (data.length > 0) {
          detail.setData(data);
          detail.getData();
          console.log(data);
        } else {
          Swal.fire({
            icon: "warning",
            text: "조회된 데이터가 없습니다.",
            confirmButtonText: "확인",
          });
          detail.setData([]);
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "정보 조회에 실패하였습니다.",
          confirmButtonText: "확인",
        });
      },
    });
  }

  function thdtTrDtlsGetData(paramData) {
    // 바로 제이슨으로 던져~
    $.ajax({
      type: "POST",
      url: `/TB07130S/thdtTrDtlsGetData`,
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        let detail = $("#grd_thdtTrDtls").pqGrid("instance");
        if (data.length > 0) {
          detail.setData(data);
          detail.getData();
        } 
        else {
          Swal.fire({
            icon: "warning",
            text: "조회된 데이터가 없습니다.",
            confirmButtonText: "확인",
          });
          detail.setData([]);
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "정보 조회에 실패하였습니다.",
          confirmButtonText: "확인",
        });
      },
    });
  }

  /**
   * selectBox 부서코드 set
   */
  function fnSelectBox() {
    let selectBox = getSelectBoxList(
      "TB07130S",
        "D010",   //부서코드
      false
    );

    let TB07120S_grdSelect

    TB07120S_grdSelect = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    })

    let D010html;
    
    TB07120S_grdSelect.forEach((item) => {
      D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });

    $("#TB07130S_dprtNm").append(D010html);

    $('#TB07130S_dprtNm').on('change', function(){
      $('#TB07130S_dprtCd').val($('#TB07130S_dprtNm').val())
    })
    
  }

  /*******************************************************************
   * Validation
   *******************************************************************/
  $("#TB07130S_stdrDt, #TB07130S_actsCd, #TB07130S_dprtNm").on('input', function () { resetPGgrids("TB07130S"); })

  /*******************************************************************
   * Event
   *******************************************************************/

  /*******************************************************************
   * ?
   *******************************************************************/

  return {
    selectIBIMS451B: selectIBIMS451B,
  };
})();
