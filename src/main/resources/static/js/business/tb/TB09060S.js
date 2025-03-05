const TB09060Sjs = (function () {
  let grid1Ins;
  let grid2Ins;
  let selectedRowData = {};

  $(document).ready(function () {
    //loadSelectBoxContents();
    fnSelectBox();
    setGrid_TB09060S();
    loadUserAuth();

    $("#TB09060S_startDt").val(getSomeDaysAgo(7));
    $("#TB09060S_endDt").val(getToday());
  });

  // 담당직원정보
  function loadUserAuth() {
    $.ajax({
      type: "GET",
      url: "/getUserAuth",
      dataType: "json",
      success: function (data) {
        $("#TB09060S_dprtNm").val(data.dprtCd).prop("selected", true);
        $("#TB09060S_dprtCd").val(data.dprtCd);
        $("#TB09060S_chrr_empNo").val(data.eno);
        $("#TB09060S_chrr_empNm").val(data.empNm);
      },
    });
  }

  let colM_Grid1 = [
    {
      title: "확정여부",
      dataType: "string",
      dataIndx: "dcsnYn",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사후관리번호",
      dataType: "string",
      dataIndx: "afctMngmNo",
      align: "rigcenterht",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm",
      align: "left",
      halign: "center",
      width: "260",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "종목코드",
      dataType: "string",
      dataIndx: "prdtCd",
      align: "center",
      halign: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실행순번",
      dataType: "string",
      dataIndx: "excSn",
      align: "right",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "연체상태",
      dataType: "string",
      dataIndx: "ovduSttsNm",
      align: "center",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부서코드",
      dataType: "string",
      dataIndx: "dprtCd",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부서명",
      dataType: "string",
      dataIndx: "dprtNm",
      align: "center",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "여신잔액",
      dataType: "integer",
      dataIndx: "crdlBlceAmt",
      align: "right",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "연체원금액",
      dataType: "integer",
      dataIndx: "ovduPrnaAmt",
      align: "right",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "연체이자금액",
      dataType: "integer",
      dataIndx: "ovduIntrAmt",
      align: "right",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "최초원금연체발생일",
      dataType: "String",
      dataIndx: "frsPrnaOvduOcrncDt",
      align: "center",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "최초이자연체발생일",
      dataType: "string",
      dataIndx: "frsIntrOvduOcrncDt",
      align: "center",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "원금연체누적일수",
      dataType: "integer",
      dataIndx: "prcaOvduAcmlDnum",
      align: "right",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "이자연체누적일수",
      dataType: "integer",
      dataIndx: "intOvduAcmlDnum",
      align: "right",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "최종이자상환일",
      dataType: "string",
      dataIndx: "lastIntrRdmpDt",
      align: "center",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "연체해제일",
      dataType: "string",
      dataIndx: "ovduRlseDt",
      align: "center",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
  ];

  let colM_Grid2 = [
    {
      title: "사후관리번호",
      dataType: "string",
      dataIndx: "afctMngmNo",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
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
      title: "실행순번",
      dataType: "string",
      dataIndx: "excSn",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "연체순번",
      dataType: "string",
      dataIndx: "ovduSeq",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "연체발생일",
      dataType: "string",
      dataIndx: "ovduOcrncDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "여신잔액",
      dataType: "integer",
      dataIndx: "crdlBlceAmt",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "상환원금액",
      dataType: "integer",
      dataIndx: "rdmpPrna",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
      render: function (ui) {
        return ui.cellData == null ? 0 : ui.cellData; // 값이 없으면 0 반환
      },
    },
    {
      title: "상환이자금액",
      dataType: "integer",
      dataIndx: "rdmpIntrAmt",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
      render: function (ui) {
        return ui.cellData == null ? 0 : ui.cellData; // 값이 없으면 0 반환
      },
    },
    {
      title: "연체원금액",
      dataType: "integer",
      dataIndx: "ovduPrnaAmt",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "연체이자금액",
      dataType: "integer",
      dataIndx: "ovduIntrAmt",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
  ];

  function srchExcSn(e) {
    let prdtCd = e;
    let obj = {};

    if (!isEmpty(prdtCd)) {
      // console.log(prdtCd);
      $("#TB09060S_excSn").attr("disabled", false);
    }

    obj = {
      prdtCd,
    };

    $.ajax({
      type: "POST",
      url: "/TB07060S/srchExcSn",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      success: function (data) {
        // console.log(data);
        //$('#btnSrch').attr('disabled', false);
        $("#TB09060S_excSn").html("");
        let html = "";
        //console.log("data 유무: ::: ", data);

        if (data && data.length > 0) {
          // console.log(data.length);
          html += '<option value="">전체</option>';
          data.forEach((item) => {
            // console.log(item.EXC_SN)
            html +=
              '<option value="' +
              item.EXC_SN +
              '">' +
              item.EXC_SN +
              "</option>";
          });
          $("#TB09060S_excSn").append(html);
        } else {
          $("#TB09060S_excSn").attr("disabled", true);
          return;
        }
      },
    });
  }

  function setGrid_TB09060S() {
    var gridObj1 = {
      height: 300,
      maxHeight: 200,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      //scrollModel: { autoFit: true },
      colModel: colM_Grid1,
      strNoRows: "조회된 데이터가 없습니다.",
      cellDblClick: function (event, ui) {
        //더블클릭시 확정 영역 input 채우고 일별연체내역 출력
        var rowData = ui.rowData;
        //console.log(rowData);
        setConfirmArea(rowData);
        //getList2(rowData);
      },
      cellClick: function (event, ui) {
        //클릭시 선택한 열 볼드처리
        $("#TB09060S_grid1 .pq-grid-row").css("font-weight", "");
        //var row = $("#TB09060S_grid1").pqGrid("getRow", { rowIndx: ui.rowIndx});
        $("#pq-body-row-u0-" + ui.rowIndx + "-right").css(
          "font-weight",
          "bold"
        );
      },
    };

    $("#TB09060S_grid1").pqGrid(gridObj1);
    $("#TB09060S_grid1").pqGrid("refreshDataAndView");
    grid1Ins = $("#TB09060S_grid1").pqGrid("instance");
    // 그리드컬럼고정
    dealDtlsIns = $("#TB09060S_grid1").pqGrid("instance");
    var freezeCols = dealDtlsIns.option("freezeCols");
    dealDtlsIns.option("freezeCols", 4);

    var gridObj2 = {
      height: 300,
      maxHeight: 200,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colM_Grid2,
      strNoRows: "조회된 데이터가 없습니다.",
      cellClick: function (event, ui) {
        //클릭시 선택한 열 볼드처리
        /*   $("#TB09060S_grid2 .pq-grid-row").css("font-weight",'');
              var row = $("#TB09060S_grid2").pqGrid("getRow", { rowIndx: ui.rowIndx});
              console.log(row);
              $("#pq-body-row-u2-"+ui.rowIndx+"-right").css("font-weight",'bold'); */
      },
    };

    $("#TB09060S_grid2").pqGrid(gridObj2);
    $("#TB09060S_grid2").pqGrid("refreshDataAndView");
    grid2Ins = $("#TB09060S_grid2").pqGrid("instance");
  }

  function getList1() {
    var prdtCd = $("#TB09060S_prdtCd").val();
    var excSn = $("#TB09060S_excSn").val().trim();
    excSn = excSn === "" ? -1 : parseInt(excSn, 10);
    var startDt = replaceAll($("#TB09060S_startDt").val(), "-", "") || "";
    var endDt = replaceAll($("#TB09060S_endDt").val(), "-", "") || "";

    // 시작일자 또는 종료일자가 없을 경우 경고창
    if (!startDt || !endDt) {
      Swal.fire({
        icon: "warning",
        title: "경고!",
        text: "시작일자와 종료일자를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }

    // 시작일이 종료일보다 클 경우 경고창 띄우기
    if (parseInt(startDt) > parseInt(endDt)) {
      Swal.fire({
        icon: "error",
        title: "경고!",
        text: "시작일자는 종료일자보다 클 수 없습니다.",
        confirmButtonText: "확인",
      });
      return;
    }

    var dprtCd = $("#TB09060S_dprtCd").val();
    var ovduRlseYnCd = $("#TB09060S_ovduRlseYnCd").val();

    const paramData = {
      prdtCd: prdtCd,
      excSn: excSn,
      startDt: startDt,
      endDt: endDt,
      dprtCd: dprtCd,
      ovduRlseYnCd: ovduRlseYnCd,
    };

    $.ajax({
      type: "POST",
      url: "/TB09060S/getOvduDtls",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        grid1Ins.setData(data);
        getList2(paramData);
        if (
          grid1Ins.getData().length === 0 &&
          grid2Ins.getData().length === 0
        ) {
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "조회된 정보가 없습니다.",
            confirmButtonText: "확인",
          });
        }
      },
      error: function (e) {
        Swal.fire({
          icon: "error",
          title: "error!",
          text: "데이터 조회 중 오류가 발생했습니다.",
          confirmButtonText: "확인",
        });
      },
    });
  }

  function setConfirmArea(rowData) {
    selectedRowData = rowData;

    if (rowData.dcsnYn == "Y") {
      $("#TB09060S_dcsnYn").prop("checked", true);
    } else {
      $("#TB09060S_dcsnYn").prop("checked", false);
    }

    $("#TB09060S_afctMngmNo2").val(rowData.afctMngmNo);
    $("#TB09060S_dealNo").val(rowData.dealNo);
    $("#TB09060S_dealNm").val(rowData.dealNm);
    $("#TB09060S_excSn2").val(rowData.excSn);
    $("#TB09060S_prdtCd2").val(rowData.prdtCd);
  }

  function getList2(data) {
    const paramData = {
      prdtCd: data.prdtCd,
      excSn: data.excSn,
      startDt: data.startDt,
      endDt: data.endDt,
    };

    $.ajax({
      type: "POST",
      url: "/TB09060S/getOvduDailyDtls",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        grid2Ins.setData(data);
      },
      error: function (e) {
        Swal.fire({
          icon: "error",
          title: "warning!",
          text: "조회된 정보가 없습니다.",
          confirmButtonText: "확인",
        }).then((result) => {});
      },
    });
  }

  function saveDcsn() {
    if ($("#TB09060S_dealNo").val() == "") {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "먼저 확정할 연체내역을 선택해주세요.",
        confirmButtonText: "확인",
      }).then((result) => {});
    } else {
      Swal.fire({
        icon: "warning",
        title: "!",
        text: "연체내역을 확정하시겠습니까?",
        confirmButtonText: "확인",
      }).then((result) => {
        saveDcsnAjax();
      });
    }
  }

  function saveDcsnAjax() {
    var dcsnYn = "Y";

    // 🔹 최초 원금 연체 발생일자와 최초 이자 연체 발생일자 중 빠른 값 선택
    var earliestDate = getEarlierDate(
      selectedRowData.frsPrnaOvduOcrncDt,
      selectedRowData.frsIntrOvduOcrncDt
    );

    const paramData = {
      dcsnYn: dcsnYn,
      afctMngmNo: selectedRowData.afctMngmNo, // 사후관리번호
      dealNo: selectedRowData.dealNo, // 딜번호
      excSn: selectedRowData.excSn, // 실행순번
      prdtCd: selectedRowData.prdtCd, // 종목코드
      ovduOcrncDt: earliestDate, // 연체발생일자
      crdlBlceAmt: selectedRowData.crdlBlceAmt, // 여신잔액금액
      ovduPrnaAmt: selectedRowData.ovduPrnaAmt, // 연체원금금액
      ovduIntrAmt: selectedRowData.ovduIntrAmt, // 연체이자금액
    };

    $.ajax({
      type: "POST",
      url: "/TB09060S/saveDcsn",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          Swal.fire({
            icon: "success",
            title: "success!",
            text: "연체내역 확정 여부를 저장했습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getList1();
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "확정 여부를 저장하지 못했습니다.",
            confirmButtonText: "확인",
          }).then((result) => {});
        }
        console.log(data);
      },
      error: function (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "error!",
          text: "확정 여부를 저장하지 못했습니다.",
          confirmButtonText: "확인",
        }).then((result) => {});
      },
    });
  }

  function formatDate(dateString) {
    if (dateString != null) {
      return dateString.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    } else {
      return "-";
    }
  }

  /**
   * selectBox 부서코드 set
   */
  function fnSelectBox() {
    let selectBox = getSelectBoxList(
      "TB09060S",
      "D010", //부서코드
      false
    );

    let TB07120S_grdSelect;

    TB07120S_grdSelect = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    });

    let D010html;

    TB07120S_grdSelect.forEach((item) => {
      D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });

    $("#TB09060S_dprtNm").append(D010html);

    $("#TB09060S_dprtNm").on("change", function () {
      $("#TB09060S_dprtCd").val($("#TB09060S_dprtNm").val());
    });
  }

  // 두 날짜 중 빠른 날짜 반환 (yyyyMMdd 형식)
  function getEarlierDate(date1, date2) {
    if (!date1) return date2; // date1이 없으면 date2 반환
    if (!date2) return date1; // date2가 없으면 date1 반환
    return date1 < date2 ? date1 : date2; // 문자열 비교 (yyyyMMdd)
  }

  return {
    getList1: getList1,
    saveDcsn: saveDcsn,
    srchExcSn: srchExcSn,
  };
})();
