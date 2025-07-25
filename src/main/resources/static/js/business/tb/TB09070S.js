const TB09070Sjs = (function () {
  let selectBox;
  let dprtList = {};

  let actsList;
  $(document).ready(function () {
    //selectBox()
    selectBoxSet_TB09070S();
    //$('#TB10510S_curDate').val(getToday())
    $("#TB09070S_fromDt").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
    $("#TB09070S_toDt").val(getToday()); //조회종료일

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB09070S_fromDt", "TB09070S_toDt");

    reset_TB09070S();

    // 조회조건 수정시 그리드 초기화
    $("#TB09070S_SearchForm").find('input, select').on('input', function () {
      $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("setData", [])
    })
  })

  function selectBoxSet_TB09070S() {
    var cdList =
      "D010" + //부서코드     DPRT_CD
      "/A005" + //계정과목코드  ACT_CD
      "/I027"; //통화코드

    selectBox = getSelectBoxList("TB09070S", cdList, false);

    dprtList = selectBox.filter(function (item) {
      //부서코드 list
      return item.cmnsGrpCd === "D010";
    });

    crryCdList = selectBox.filter(function (item) {
      //통화코드 list
      return item.cmnsGrpCd === "I027";
    });

    actsList = selectBox.filter(function (item) {
      //계정과목코드 list
      return item.cmnsGrpCd === "A005";
    });

    dprtList.forEach((item) => {
      $("#TB09070S_dprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );
    });

    colM_TB09070S = [
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        align: "center",
        halign: "center",
        width: "130",
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
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        align: "center",
        halign: "center",
        width: "130",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목명",
        dataType: "string",
        dataIndx: "prdtNm",
        align: "left",
        halign: "center",
        width: "180",
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
        title: "기업체",
        dataType: "string",
        dataIndx: "trObjtBsnNo",
        align: "left",
        halign: "center",
        width: "200",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상품명",
        dataType: "string",
        dataIndx: "prdtNm",
        align: "left",
        halign: "center",
        width: "250",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "통화",
        dataType: "string",
        dataIndx: "trCrryCd",
        align: "center",
        halign: "center",
        width: "50",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = crryCdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdValue : ui.cellData;
        },
      },
      {
        title: "원금",
        dataType: "string",
        dataIndx: "prarPrna",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var cellData = ui.cellData;
          if (cellData == null || cellData == "") {
            cellData = 0;
          }
          var value = parseFloat(cellData);

          var formattedValue = value.toLocaleString("ko-KR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          return formattedValue;
        },
      },
      {
        title: "정상이자",
        dataType: "string",
        dataIndx: "rdmpPrarIntr",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var cellData = ui.cellData;
          if (cellData == null || cellData == "") {
            cellData = 0;
          }
          var value = parseFloat(cellData);

          var formattedValue = value.toLocaleString("ko-KR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          return formattedValue;
        },
      },
      {
        title: "연체이자",
        dataType: "string",
        dataIndx: "ovduIntr",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "미수이자",
        dataType: "string",
        dataIndx: "rcvbIntr",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "납부예정금액",
        dataType: "string",
        dataIndx: "pmntPrarAmt",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var cellData = ui.cellData;
          if (cellData == null || cellData == "") {
            cellData = 0;
          }
          var value = parseFloat(cellData);

          var formattedValue = value.toLocaleString("ko-KR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          });

          return formattedValue;
        },
      },
      {
        title: "수수료총금액",
        dataType: "string",
        dataIndx: "totalFee",
        align: "right",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "운용펀드",
        dataType: "string",
        dataIndx: "fndNm",
        align: "left",
        halign: "center",
        width: "200",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리부서",
        dataType: "string",
        dataIndx: "mngmBdcd",
        align: "center",
        halign: "center",
        width: "100",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "계정과목",
        dataType: "string",
        dataIndx: "actsCd",
        align: "left",
        halign: "center",
        width: "100",
        //filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: actsList,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let paiTypCd = actsList.find(({ cdValue }) => cdValue == ui.cellData);
          return paiTypCd ? paiTypCd.cdName : ui.cellData;
        },
      },
    ];

    setGrid_TB09070S();
  }

  //그리드 세팅
  function setGrid_TB09070S() {
    var obj = {
      height: 400,
      maxHeight: 400,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: {
        show: true,
        width: 40,
        resizable: true,
        title: "<p class='text-center'>순번</p>",
      },
      // scrollModel: { autoFit: true },
      colModel: colM_TB09070S,
      strNoRows: "",
	  rowClick: function (event, ui) {
	    pqGridSelectHandler(ui.rowIndx, "TB09070S_rdmpTrgtDtlsGrid");		
	  },
      // footer: true
    };

    $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid(obj);
    $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("refreshDataAndView");
    rdmpTrgtDtlsIns = $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("instance");

    rdmpTrgtDtlsIns.option("freezeCols", 5);
  }

  $("#TB09070S_dprtNm").on("change", function () {
    var dprtCd = $(this).val();

    $("#TB09070S_dprtCd").val(dprtCd);
  });

  //상환대상내역조회
  function rdmpTrgtDtlsInq() {
    var fromDt = $("#TB09070S_fromDt").val(); //조회시작일
    var toDt = $("#TB09070S_toDt").val(); //조회종료일

    var option = {};
    option.title = "Error";
    option.type = "error";

    // if(isEmpty(fromDt) || isEmpty(toDt) ){
    //     option.text = "상환예정일자를 입력하고 다시 시도해주세요.";
    // 	openPopup(option);
    // 	return false;

    // }else{
    businessFunction(fromDt, toDt);
    //}

    function businessFunction() {
      var mngmBdcd = $("#TB09070S_dprtCd").val();         //관리부점코드
      var actsCd = $("#TB09070S_A005").val();             //계정과목코드
      var dealNo = $("#TB09070S_ibDealNo").val();         //딜번호
      var prdtCd = $("#TB09070S_prdtCd").val();           //종목코드
      var trObjtBsnNo = $("#TB09070S_ardyBzepNo").val();  //기업체번호

      var param = {
        mngmBdcd: mngmBdcd,
        actsCd: actsCd,
        dealNo: dealNo,
        prdtCd: prdtCd,
        trObjtBsnNo: trObjtBsnNo,
        fromDt: fromDt.replaceAll("-", ""),
        toDt: toDt.replaceAll("-", ""),
      };

      $.ajax({
        type: "POST",
        url: "/TB09070S/rdmpTrgtDtlsInq",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(param),
        dataType: "json",
        beforeSend: function () {
          $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid(
            "option",
            "strNoRows",
            "조회 중입니다..."
          );
        },
        success: function (data) {
          //console.log(JSON.stringify(data));

          $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid(
            "option",
            "strNoRows",
            "조회된 데이터가 없습니다."
          );

          setData_TB09070S(data);
        },
      });
    }
  }

  function setData_TB09070S(data) {
    if (data.length < 1) {
      var option = {};
      option.title = "Warning!";
      option.type = "warning";

      option.text = "조회된 데이터가 없습니다.";
      openPopup(option);
    }

    $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("setData", data);

    // var summaryData = calculateSummary(rdmpTrgtDtlsIns);
    // rdmpTrgtDtlsIns.option('footerModel', {
    //   data: summaryData
    // });
  }

  //초기화
  function reset_TB09070S() {
    $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("option", "strNoRows", "");
    $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("setData", []);

    $("#TB09070S_dprtNm").val($('#userDprtCd').val());      //관리부점명
    $("#TB09070S_dprtCd").val($('#userDprtCd').val());      //관리부점코드
    $("#TB09070S_A005").val("");        //계정과목코드
    $("#TB09070S_ibDealNo").val("");    //딜번호
    $("#TB09070S_ardyBzepNo").val("");  //기업체번호
    $("#TB09070S_ibDealNm").val("");    //딜명
    $("#TB09070S_bzepName").val("");    //기업체명
    $("#TB09070S_prdtCd").val("");      //종목코드
    $("#TB09070S_prdtNm").val("");      //종목명

    $("#TB09070S_fromDt").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
    $("#TB09070S_toDt").val(getToday()); //조회종료일
  }

  function pqExportExcel() {
    let blob = $("#TB09070S_rdmpTrgtDtlsGrid").pqGrid("instance").exportExcel({});
    let fileName = "상환대상내역_" + getToday() + ".xlsx";

    pq.saveAs(blob, fileName);
  }

  function calculateSummary(grid) {
    var data = grid.option('dataModel.data'),
      agg = pq.aggregate,
      prarPrna = data.map(function (rd) {
        return rd.prarPrna;
      }),
      rdmpPrarIntr = data.map(function (rd) {
        return rd.rdmpPrarIntr;
      }),
      ovduIntr = data.map(function (rd) {
        return rd.ovduIntr;
      }),
      rcvbIntr = data.map(function (rd) {
        return rd.rcvbIntr;
      }),
      pmntPrarAmt = data.map(function (rd) {
        return rd.pmntPrarAmt;
      }),
      totalFee = data.map(function (rd) {
        return rd.totalFee;
      }),
      totalData = {
        prdtNm: "합계:",
        prarPrna: agg.sum(prarPrna),
        rdmpPrarIntr: agg.sum(rdmpPrarIntr),
        ovduIntr: agg.sum(ovduIntr),
        rcvbIntr: agg.sum(rcvbIntr),
        pmntPrarAmt: agg.sum(pmntPrarAmt),
        totalFee: agg.sum(totalFee)
      };

    return [totalData]; // total만 반환
  }

  return {
    rdmpTrgtDtlsInq: rdmpTrgtDtlsInq,
    reset_TB09070S: reset_TB09070S,
    pqExportExcel: pqExportExcel,
  };
})();