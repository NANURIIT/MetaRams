const TB09060Sjs = function () {
  let grid1Ins;
  let grid2Ins;

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
  			success: function(data) {
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
      align: "right",
      halign: "center",
      width: "110",
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
      align: "center",
      halign: "center",
      width: "250",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실행순번",
      dataType: "string",
      dataIndx: "excSeq",
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
      width: "60",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "여신잔액",
      dataType: "integer",
      dataIndx: "crdlBlceAmt",
      align: "right",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "연체원금액",
      dataType: "integer",
      dataIndx: "ovduPrnaAmt",
      align: "right",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "연체이자금액",
      dataType: "integer",
      dataIndx: "ovduIntrAmt",
      align: "right",
      halign: "center",
      width: "120",
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
      width: "150",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "이자연체누적일수",
      dataType: "integer",
      dataIndx: "intOvduAcmlDnum",
      align: "right",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "최종이자상환일",
      dataType: "string",
      dataIndx: "lastIntrRdmpDt",
      align: "center",
      halign: "center",
      width: "120",
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
      width: "100",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
  ];

  let colM_Grid2 = [
    {
      title: "연체순번",
      dataType: "string",
      dataIndx: "ovduSeq",
      align: "center",
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

  function setGrid_TB09060S() {
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
      //scrollModel: { autoFit: true },
      colModel: colM_Grid1,
      strNoRows: "조회된 데이터가 없습니다.",
      cellDblClick: function (event, ui) {
        //더블클릭시 확정 영역 input 채우고 일별연체내역 출력
        var rowData = ui.rowData;
        //console.log(rowData);
        setConfirmArea(rowData);
        getList2(rowData);
      },
      cellClick: function (event, ui) {
        //클릭시 선택한 열 볼드처리
        $("#TB09060S_grid1 .pq-grid-row").css("font-weight", "");
        //var row = $("#TB09060S_grid1").pqGrid("getRow", { rowIndx: ui.rowIndx});
        $("#pq-body-row-u0-" + ui.rowIndx + "-right").css("font-weight", "bold");
      },
    };

    $("#TB09060S_grid1").pqGrid(gridObj1);
    $("#TB09060S_grid1").pqGrid("refreshDataAndView");
    grid1Ins = $("#TB09060S_grid1").pqGrid("instance");

    var gridObj2 = {
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
    var dealNo = $("#TB09060S_ibDealNo").val();
    var excSeq = $("#TB09060S_excSeq").val();
    if(excSeq == ""){
      console.log("순번 공백");
      excSeq = -1;
    }
    var startDt =
      replaceAll($("#TB09060S_startDt").val(), "-", "") == null
        ? ""
        : replaceAll($("#TB09060S_startDt").val(), "-", "");
    var endDt =
      replaceAll($("#TB09060S_endDt").val(), "-", "") == null
        ? ""
        : replaceAll($("#TB09060S_endDt").val(), "-", "");

    var dprtCd = $("#TB09060S_dprtCd").val();
    var ovduRlseYnCd = $("#TB09060S_ovduRlseYnCd").val();

    const paramData = {
      dealNo: dealNo,
      excSeq: excSeq,
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
        if (data) {
          grid1Ins.setData(data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "조회된 정보가 없습니다.",
            confirmButtonText: "확인",
          }).then((result) => { });
        }
        console.log(data);
      },
      error: function (e) {
        Swal.fire({
          icon: "error",
          title: "warning!",
          text: "조회된 정보가 없습니다.",
          confirmButtonText: "확인",
        }).then((result) => { });
      },
    });
  }

  function setConfirmArea(rowData) {
    if (rowData.dcsnYn == "Y") {
      $("#TB09060S_dcsnYn").prop("checked", true);
    } else {
      $("#TB09060S_dcsnYn").prop("checked", false);
    }

    $("#TB09060S_afctMngmNo2").val(rowData.afctMngmNo);
    $("#TB09060S_dealNo").val(rowData.dealNo);
    $("#TB09060S_dealNm").val(rowData.dealNm);
    $("#TB09060S_excSeq2").val(rowData.excSeq);
  }

  function getList2(rowData) {
    const paramData = {
      dealNo: rowData.dealNo,
      excSeq: rowData.excSeq,
      afctMngmNo: rowData.afctMngmNo,
    };

    $.ajax({
      type: "POST",
      url: "/TB09060S/getOvduDailyDtls",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data) {
          grid2Ins.setData(data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "조회된 정보가 없습니다.",
            confirmButtonText: "확인",
          }).then((result) => { });
        }
        console.log(data);
      },
      error: function (e) {
        Swal.fire({
          icon: "error",
          title: "warning!",
          text: "조회된 정보가 없습니다.",
          confirmButtonText: "확인",
        }).then((result) => { });
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
      }).then((result) => { });
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
    var dcsnYn = $("#TB09060S_dcsnYn").prop("checked") ? "Y" : "N";

    const paramData = {
      dcsnYn: dcsnYn,
      afctMngmNo: $("#TB09060S_afctMngmNo2").val(),
      dealNo: $("#TB09060S_dealNo").val(),
      excSeq: $("#TB09060S_excSeq2").val(),
    };

    console.log(paramData);

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
          }).then((result) => { });
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
        }).then((result) => { });
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

    $("#TB09060S_dprtNm").append(D010html);

    $('#TB09060S_dprtNm').on('change', function(){
      $('#TB09060S_dprtCd').val($('#TB09060S_dprtNm').val())
    })
    
  }

  return {
    getList1: getList1
    ,saveDcsn: saveDcsn
  }

}();