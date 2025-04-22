const TB09080Sjs = (function () {
  let selectBox;
  let dealDtlsIns; //거래내역 grid instance
  let prdtMdclCdList; //신용공여중분류코드 리스트
  let rvseCnclDvsnCdList; //정정취소구분코드 리스트
  let trStatCdList; //거래상태코드 리스트

  $(document).ready(function () {
    fnSelectBox();

    $("#TB09080S_rsltnDt").val(newAddMonth(new Date(getToday()), -1));
    $("#TB09080S_rsltnEndDt").val(getToday());

    $('#TB09080S_srchForm').find('input, select').on('input', function () {
      dealDtlsIns.setData("");
    })

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB09080S_rsltnDt","TB09080S_rsltnEndDt");
  });

  function setLoginUsrInfo(){
    var dprtCd = $("#userDprtCd").val();
    var empNm = $("#userEmpNm").val();
    var empNo = $("#userEno").val();

    $("#TB09080S_dprtCd").val(dprtCd);
    $("#TB09080S_dprtNm").val(dprtCd);
    $("#TB09080S_chrr_empNo").val(empNo);
    $("#TB09080S_chrr_empNm").val(empNm);
  }

  function setGrid_TB09080S() {
    let colM_TB09080S = [
      {
        title: "Deal번호",
        dataType: "string",
        dataIndx: "dealNo",
        align: "center",
        halign: "center",
        width: "150",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "Deal명",
        dataType: "string",
        dataIndx: "dealNm",
        align: "left",
        halign: "center",
        width: "150",
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
        title: "거래순번",
        dataType: "string",
        dataIndx: "trSn",
        align: "right",
        halign: "center",
        width: "80",
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
        title: "신용공여중분류코드",
        dataType: "string",
        dataIndx: "prdtMdclCd",
        align: "center",
        halign: "center",
        width: "160",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: prdtMdclCdList,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let rtnValue = prdtMdclCdList.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return rtnValue ? rtnValue.cdName : ui.cellData;
        },
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
        dataIndx: "trStatCd",
        align: "center",
        halign: "center",
        width: "100",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: trStatCdList,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let rtnValue = trStatCdList.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return rtnValue ? rtnValue.cdName : ui.cellData;
        },
      },
      {
        title: "거래일자",
        dataType: "date",
        dataIndx: "trDt",
        width: "120",
        align: "center",
        dateFormat: "yyyy-mm-dd",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "trCrryCd",
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
        dataIndx: "mngmBdcd",
        align: "center",
        halign: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리조직명",
        dataType: "string",
        dataIndx: "dprtNm",
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
        dataIndx: "rvseCnclDvsnCd",
        align: "center",
        halign: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: rvseCnclDvsnCdList,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let rtnValue = trStatCdList.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return rtnValue ? rtnValue.cdName : ui.cellData;
        },
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
      // {
      //   title: "진행상태코드",
      //   dataType: "string",
      //   dataIndx: "prgSttsNm",
      //   align: "center",
      //   halign: "center",
      //   width: "200",
      //   filter: { crules: [{ condition: "range" }] },
      // },
      // {
      //   title: "청구순번",
      //   dataType: "string",
      //   dataIndx: "clmSeq",
      //   align: "right",
      //   halign: "center",
      //   width: "80",
      //   filter: { crules: [{ condition: "range" }] },
      // },
    ];

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

    var freezeCols=dealDtlsIns.option( "freezeCols" );

    dealDtlsIns.option( "freezeCols", 4 );
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
        // bsnsRgstNo: $("#TB09080S_bsnsRgstNo").val(),
        prdtMdclCd: $("#TB09080S_P006").val(),                //신용공여중분류코드
        etprCrdtGrntTrKindCd: $("#TB09080S_P012").val(),      //기업신용공여거래종류코드
        trStatCd: $("#TB09080S_E026").val(),                  //거래상태코드
        trStfno: $("#TB09080S_chrr_empNo").val()              //처리자 직원번호
      }),
      dataType: "json",
      beforeSend: function (xhr) {
        //resetTab1Grd();
      },
      success: function (data) {
        console.log(data);
        console.log(data.trDtls);
        //trDtls.setData(data.trDtls); // 딜거래내역
        var trDtls = data.trDtls;

        if (trDtls.length > 0) {
          dealDtlsIns.setData(data.trDtls);
        }
        else {
          Swal.fire({
            icon: "warning"
            , title: "Warning!"
            , text: "조회된 내역이 없습니다!"
          })
          dealDtlsIns.setData([]);
        }
      },
    });
  }

  function reset() {
    $("#TB09080S_rsltnDt").val(newAddMonth(new Date(getToday()), -1));
    $("#TB09080S_rsltnEndDt").val(getToday());
    // $("#TB09080S_dprtCd").val("");
    // $("#TB09080S_dprtNm").val("");
    $("#TB09080S_ibDealNo").val("");
    $("#TB09080S_ibDealNm").val("");
    $("#TB09080S_prdtCd").val("");
    $("#TB09080S_prdtNm").val("");
    // $("#TB09080S_bsnsRgstNo").val("");
    //$("#TB09080S_entpRnm").val("");

    $("#TB09080S_P006").val("");
    $("#TB09080S_P012").val("");
    $("#TB09080S_E026").val("");

    dealDtlsIns.setData("");

    setLoginUsrInfo();
  }

  /*
   *	엑셀(Excel) PQGrid ExcelExport
   */
  function pqExportExcel() {
    let blob = $("#TB09080S_dealDtlsGrid").pqGrid("instance").exportExcel({});
    let fileName = "거래내역리스트.xlsx";

    pq.saveAs(blob, fileName);
  }

  /**
   * selectBox 부서코드 set
   */
  function fnSelectBox() {
    selectBox = getSelectBoxList("TB09080S", "D010/P006/E026/R028/P012", false);

    prdtMdclCdList = selectBox.filter((item) => item.cmnsGrpCd === "P006");
    rvseCnclDvsnCdList = selectBox.filter((item) => item.cmnsGrpCd === "R028");
    trStatCdList = selectBox.filter((item) => item.cmnsGrpCd === "E026");

    setGrid_TB09080S();

    let TB07120S_grdSelect;

    TB07120S_grdSelect = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    });

    let D010html;

    TB07120S_grdSelect.forEach((item) => {
      D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
    });

    $("#TB09080S_dprtNm").append(D010html);

    $("#TB09080S_dprtNm").on("change", function () {
      $("#TB09080S_dprtCd").val($("#TB09080S_dprtNm").val());
    });

    setLoginUsrInfo();
  }

  return {
    getDealList: getDealList,
    reset: reset,
    pqExportExcel: pqExportExcel,
  };
})();
