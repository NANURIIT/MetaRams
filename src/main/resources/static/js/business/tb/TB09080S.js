const TB09080Sjs = (function () {
  let dealDtlsIns; //거래내역 grid instance

  let colM_TB09080S = [
    {
      title: "deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "딜명",
      dataType: "string",
      dataIndx: "dealNm",
      align: "left",
      halign: "center",
      width: "250",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래순번",
      dataType: "string",
      dataIndx: "trSn",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실행순번",
      dataType: "string",
      dataIndx: "excSn",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신용공여중분류코드",
      dataType: "string",
      //dataIndx: "prdtMdclCd",
      dataIndx: "prdtMdclNm",
      align: "center",
      halign: "center",
      width: "160",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기업신용공여거래종류코드",
      dataType: "string",
      dataIndx: "etprCrdtGrntTrKindNm",
      align: "center",
      halign: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래상태코드",
      dataType: "string",
      dataIndx: "trStatNm",
      align: "center",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "통화코드",
      dataType: "string",
      dataIndx: "trCrcyCd",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래금액",
      dataType: "integer",
      dataIndx: "dealTrAmt",
      align: "right",
      halign: "center",
      width: "140",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "거래원금",
      dataType: "integer",
      dataIndx: "dealTrPrca",
      align: "right",
      halign: "center",
      width: "140",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "거래이자금액",
      dataType: "integer",
      dataIndx: "trIntAmt",
      align: "right",
      halign: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "거래수수료금액",
      dataType: "integer",
      dataIndx: "trFeeAmt",
      align: "right",
      halign: "center",
      width: "140",
      filter: { crules: [{ condition: "range" }] },
      format: "#,###",
    },
    {
      title: "관리조직번호",
      dataType: "string",
      dataIndx: "orgno",
      align: "center",
      halign: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "관리조직명",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "100",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자직원번호",
      dataType: "string",
      dataIndx: "chrrEmpno",
      align: "center",
      halign: "center",
      width: "140",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자직원명",
      dataType: "string",
      dataIndx: "chrrEnm",
      align: "center",
      halign: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "정정취소구분코드",
      dataType: "string",
      dataIndx: "rvseCnclDvsnNm",
      align: "center",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "정정취소사유내용",
      dataType: "string",
      dataIndx: "rvseCnclRsonText",
      align: "left",
      halign: "center",
      width: "250",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "진행상태코드",
      dataType: "string",
      dataIndx: "prgSttsNm",
      align: "center",
      halign: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "청구순번",
      dataType: "string",
      dataIndx: "clmSeq",
      align: "center",
      halign: "center",
      width: "80",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  $(document).ready(function () {
    //selectBox()
    setGrid_TB09080S();

    $("#TB09080S_rsltnDt").val(getSomeDaysAgo(7));
    $("#TB09080S_rsltnEndDt").val(getToday());
  });

  function setGrid_TB09080S() {
    var obj = {
      height: 400,
      maxHeight: 400,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      numberCell: { show: false },
      //scrollModel: { autoFit: true },
      colModel: colM_TB09080S,
      strNoRows: "조회된 데이터가 없습니다.",
    };

    $("#TB09080S_dealDtlsGrid").pqGrid(obj);
    $("#TB09080S_dealDtlsGrid").pqGrid("refreshDataAndView");
    dealDtlsIns = $("#TB09080S_dealDtlsGrid").pqGrid("instance");
  }

  function getDealList() {
    var rsltnDt = $("#TB09080S_rsltnDt").val();
    var rsltnEndDt = $("#TB09080S_rsltnEndDt").val();
    var pdrtCd = $("#TB09080S_dprtCd").val();
    var ibDealNo = $("#TB09080S_ibDealNo").val();
    var prdtCd = $("#TB09080S_prdtCd").val();
    var bsnsRgstNo = $("#TB09080S_bsnsRgstNo").val();

    /* console.log(rsltnDt+"~"+rsltnEndDt);
    console.log("pdrtCd : "+ pdrtCd);
    console.log("DealNo : "+ ibDealNo);
    console.log("prdtCd : "+ prdtCd);
    console.log("bsnsRgstNo : "+ bsnsRgstNo); */

    inqTrDtls();

    /* getCnfrncDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd, prdtCd);
	
	getIBIMS208BDTOInfo(prdtCd);
	getIBIMS212BDTOInfo(prdtCd); */
    //getIBIMS250BDTOInfo(prdtCd);
  }

  function inqTrDtls() {
    // const chkObj = Object.values(obj).every(value => value)
    var rsltnDt = "";
    var rsltnEndDt = "";
    if ($("#TB09080S_rsltnDt").val() != "") {
      rsltnDt = replaceAll($("#TB09080S_rsltnDt").val(), "-", "");
    }
    if ($("#TB09080S_rsltnEndDt").val() != "") {
      rsltnEndDt = replaceAll($("#TB09080S_rsltnEndDt").val(), "-", "");
    }

    $.ajax({
      type: "POST",
      url: "/TB09080S/inqTrDtls",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({
        rsltnDt: rsltnDt,
        rsltnEndDt: rsltnEndDt,
        orgno: $("#TB09080S_dprtCd").val(),
        dealNo: $("#TB09080S_ibDealNo").val(),
        prdtCd: $("#TB09080S_prdtCd").val(),
        bsnsRgstNo: $("#TB09080S_bsnsRgstNo").val(),
      }),
      dataType: "json",
      beforeSend: function (xhr) {
        //resetTab1Grd();
      },
      success: function (data) {
        console.log(data);
        console.log(data.trDtls);
        //trDtls.setData(data.trDtls); // 딜거래내역
        dealDtlsIns.setData(data.trDtls);
      },
    });
  }

  function reset() {
    $("#TB09080S_rsltnDt").val(getSomeDaysAgo(7));
    $("#TB09080S_rsltnEndDt").val(getToday());
    $("#TB09080S_dprtCd").val("");
    $("#TB09080S_dprtNm").val("");
    $("#TB09080S_ibDealNo").val("");
    $("#TB09080S_ibDealNm").val("");
    $("#TB09080S_prdtCd").val("");
    $("#TB09080S_prdtNm").val("");
    $("#TB09080S_bsnsRgstNo").val("");
    $("#TB09080S_entpRnm").val("");
    dealDtlsIns.setData("");
  }

  /*
   *	엑셀(Excel) PQGrid ExcelExport
   */
  function pqExportExcel() {
    let blob = $("#TB09080S_dealDtlsGrid").pqGrid("instance").exportExcel({});
    let fileName = "거래내역리스트.xlsx";

    pq.saveAs(blob, fileName);
  }

  return {
    getDealList: getDealList,
    reset: reset,
    pqExportExcel: pqExportExcel,
  };
})();
