const TB04060Sjs = (function () {
  let pqGridObjIbDealList;

  let pageModel_TB04060S = {
    type: "local",
    rPP: 50,
    strRpp: "{0}",

    strDisplay: "{0} to {1} of {2}",
    strPage: "Page {0} / {1}",

    layout: ["first", "prev", "next", "last", "|", "strPage"],
  };

  let colModel_TB04060S = [
    {
      title: "Deal번호",
      // editable: true,
      dataType: "string",
      dataIndx: "dealNo",
      align: "left",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록일자",
      // editable: true,
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      halign: "center",
      width: "120",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          var year = cellData.substring(0, 4);
          var month = cellData.substring(4, 6);
          var day = cellData.substring(6, 8);
          return year + "-" + month + "-" + day;
        }
        return cellData;
      },
    },
    {
      title: "진행상태",
      // editable: true,
      dataType: "string",
      dataIndx: "prgSttsCdNm",
      align: "center",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "종목코드",
      // editable: true,
      dataType: "string",
      dataIndx: "prdtCd",
      align: "center",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "종목명",
      // editable: true,
      dataType: "string",
      dataIndx: "prdtNm",
      align: "left",
      halign: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래상대방",
      // editable: true,
      dataType: "string",
      dataIndx: "entpHnglNm",
      align: "left",
      halign: "center",
      width: "200",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품(대)",
      // editable: true,
      dataType: "string",
      dataIndx: "prdtLclsCdNm",
      align: "center",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품(중)",
      // editable: true,
      dataType: "string",
      dataIndx: "prdtMdclCdNm",
      align: "center",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자상품(소)",
      // editable: true,
      dataType: "string",
      dataIndx: "prdtClsfCdNm",
      align: "center",
      halign: "center",
      width: "150",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "IB상품",
      // editable: true,
      dataType: "string",
      dataIndx: "ibPrdtClsfCdNm",
      align: "center",
      halign: "center",
      width: "130",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "딜승인금액",
      // editable: true,
      dataType: "string",
      dataIndx: "sumRcgAmt",
      align: "right",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if (!isEmpty(ui.cellData)) {
          var value = parseFloat(ui.cellData);

          if (value === NaN || value === null || value == "") {
            return 0;
          } else {
            var formattedValue = value.toLocaleString("ko-KR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            return formattedValue;
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "종목승인금액",
      // editable: true,
      dataType: "string",
      dataIndx: "eprzCrdlApvlAmt",
      align: "right",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if (!isEmpty(ui.cellData)) {
          var value = parseFloat(ui.cellData);

          if (value === NaN || value === null || value == "") {
            return 0;
          } else {
            var formattedValue = value.toLocaleString("ko-KR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            return formattedValue;
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "기업여신약정금액",
      // editable: true,
      dataType: "string",
      dataIndx: "eprzCrdlCtrcAmt",
      align: "right",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if (!isEmpty(ui.cellData)) {
          var value = parseFloat(ui.cellData);

          if (value === NaN || value === null || value == "") {
            return 0;
          } else {
            var formattedValue = value.toLocaleString("ko-KR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            return formattedValue;
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "투자금액",
      // editable: true,
      dataType: "string",
      dataIndx: "dealExcAmt",
      align: "right",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        //alert(ui.cellData);
        if (!isEmpty(ui.cellData)) {
          var value = parseFloat(ui.cellData);

          if (value === NaN || value === null || value == "") {
            return 0;
          } else {
            var formattedValue = value.toLocaleString("ko-KR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            return formattedValue;
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "투자잔액",
      // editable: true,
      dataType: "string",
      dataIndx: "dealExcBlce",
      align: "right",
      halign: "center",
      width: "180",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if (!isEmpty(ui.cellData)) {
          var value = parseFloat(ui.cellData);

          if (value === NaN || value === null || value == "") {
            return 0;
          } else {
            var formattedValue = value.toLocaleString("ko-KR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });

            return formattedValue;
          }
        } else {
          return "";
        }
      },
    },
    {
      title: "담당자명",
      dataType: "date",
      dataIndx: "empNm",
      hidden: true,
    },
    {
      title: "담당사원명",
      dataType: "date",
      dataIndx: "chrrEmpnm",
      hidden: true,
    },
    {
      title: "전결협의체",
      dataType: "date",
      dataIndx: "cnsbDcd",
      hidden: true,
    },
    {
      title: "승인일자",
      dataType: "date",
      dataIndx: "apvlDt",
      hidden: true,
    },
  ];

  let toolbar_TB04060S = {
    cls: "pq-toolbar",
    items: [
      //검색 onOff버튼
      {
        type: "button",
        cls: "ui-button ui-corner-all ui-widget", // class
        label: "필터",
        listener: function () {
          this.option("filterModel.header", !this.option("filterModel.header"));
          this.refresh();
        },
      },
      //페이징 onOff버튼
      {
        type: "button",
        cls: "ui-button ui-corner-all ui-widget",
        label: "페이징",
        listener: function () {
          this.pager().widget().toggle();
          this.refresh();
        },
      },
      //구분줄
      {
        type: "separator",
      },
      //페이지당 표기개수 선택 selectBox
      {
        type: "select",
        cls: "rpp",
        label: "행 개수: ",
        value: pageModel_TB04060S.rPP,
        options: [10, 30, 50, 100, 1000],
        listener: function (evt) {
          this.option("pageModel.rPP", $(evt.target).val());
          this.refreshDataAndView();
        },
      },
      //페이지 이동 textBox
      {
        type: "textbox",
        cls: "curpage",
        label: "페이지번호: ",
        listener: {
          keyup: function (evt) {
            var maxLength = 5; // 최대 자리수 지정
            var inputValue = $(evt.target).val();
            if (inputValue.length > maxLength) {
              // 최대 자리수 초과 시 잘라내기
              inputValue = inputValue.slice(0, maxLength);
              $(evt.target).val(inputValue);
            }
            this.goToPage({ page: inputValue });
          },
        },
      },
      //구분줄
      {
        type: "separator",
      },
      //이전페이지로 이동 버튼
      {
        type: "button",
        cls: "ui-button ui-corner-all ui-widget",
        label: "이전",
        listener: function () {
          var page = this.option("pageModel.curPage");
          this.goToPage({ page: page - 1 });
        },
      },
      //다음페이지로 이동 버튼
      {
        type: "button",
        cls: "ui-button ui-corner-all ui-widget",
        label: "다음",
        listener: function () {
          var page = this.option("pageModel.curPage");
          this.goToPage({ page: page + 1 });
        },
      },
    ],
  };

  $(document).ready(function () {
    fnSelectBox();
    loadSelectBoxContents();
    setGrid_TB04060S();

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB04060S_rgstDt", "TB04060S_rgstEndDt");
    chkValFromToDt("TB04060S_apvlDt", "TB04060S_apvlEndDt");
  });

  function setGrid_TB04060S() {
    // pqGridObjIbDealList = [
    // 	{
    // 		height    : 680
    // 		, maxHeight : 680
    // 		, id        : 'TB04060S_ibDealList'
    // 		, colModel  : colModel_TB04060S
    // 	},
    // ]

    // setPqGrid(pqGridObjIbDealList);

    // pqGridObjIbDealList = $("#TB04060S_ibDealList").pqGrid('instance');

    // pqGridObjIbDealList.option('toolbar', toolbar_TB04060S);
    // pqGridObjIbDealList.option('showToolbar', true);

    // pqGridObjIbDealList.option("pageModel", pageModel_TB04060S);

    // pqGridObjIbDealList.refreshDataAndView();

    var obj = {
      height: 680,
      maxHeight: 680,
      showTitle: false,
      showToolbar: true,
      collapsible: false,
      editable: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      //scrollModel: { autoFit: true },
      toolbar: toolbar_TB04060S,
      colModel: colModel_TB04060S,
      strNoRows: "조회된 데이터가 없습니다.",
      pageModel: pageModel_TB04060S,
    };

    $("#TB04060S_ibDealList").pqGrid(obj);

    pqGridObjIbDealList = $("#TB04060S_ibDealList").pqGrid("instance");
  }

  function resetSearchParam() {
    $("#TB04060S_ibDealNo").val("");
    $("#TB04060S_ibDealNm").val("");

    $("#TB04060S_dprtCd").val("");
    $("#TB04060S_dprtNm").val("");

    $("#TB04060S_chrr_empNo").val("");
    $("#TB04060S_chrr_empNm").val("");

    $("#TB04060S_prdtCd").val("");
    $("#TB04060S_prdtNm").val("");

    $("#TB04060S_bsnsRgstNo").val("");
    $("#TB04060S_entpRnm").val("");

    $("#TB04060S_rgstDt").val("");
    $("#TB04060S_rgstEndDt").val("");

    $("#TB04060S_apvlDt").val("");
    $("#TB04060S_apvlEndDt").val("");

    $("#TB04060S_E022 option:first").prop("selected", true);
    $("#TB04060S_E023 option:first").prop("selected", true);
    $("#TB04060S_E021 option:first").prop("selected", true);
    $("#TB04060S_I002 option:first").prop("selected", true);
    $("#TB04060S_I008 option:first").prop("selected", true);
    $("#TB04060S_I011 option:first").prop("selected", true);

    pqGridObjIbDealList.setData([]);
  }

  function loadSelectBoxContents() {
    var item = "";
    item += "/" + "E022"; // 투자상품대분류코드
    item += "/" + "E023"; // 투자상품중분류코드
    item += "/" + "E021"; // 투자상품소분류코드
    item += "/" + "I002"; // IB상품분류코드
    item += "/" + "I008"; // 전결협의체구분코드
    item += "/" + "I011"; // 진행상태
    item += "/" + "I002"; // IB상품분류코드

    getSelectBoxList("TB04060S", item);
  }

  // 유효성 검사용 날짜패턴
  var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  function checkDealSearch() {
    let TB04060S_rgstDt = $("#TB04060S_rgstDt").val(); // 등록시작일자
    let TB04060S_rgstEndDt = $("#TB04060S_rgstEndDt").val(); // 등록종료일자
    let TB04060S_apvlDt = $("#TB04060S_apvlDt").val(); // 승인시작일자
    let TB04060S_apvlEndDt = $("#TB04060S_apvlEndDt").val(); // 승인종료일자

    let msgError = "";

    if (!isEmpty(TB04060S_rgstDt) && !pattern.test(TB04060S_rgstDt)) {
      msgError = "등록시작일자를 확인해주세요.";
      alertPopup();
    } else if (
      !isEmpty(TB04060S_rgstEndDt) &&
      !pattern.test(TB04060S_rgstEndDt)
    ) {
      msgError = "등록종료일자를 확인해주세요.";
      alertPopup();
    }
    if (!isEmpty(TB04060S_apvlDt) && !pattern.test(TB04060S_apvlDt)) {
      msgError = "승인시작일자를 확인해주세요.";
      alertPopup();
    } else if (
      !isEmpty(TB04060S_apvlEndDt) &&
      !pattern.test(TB04060S_apvlEndDt)
    ) {
      msgError = "승인종료일자를 확인해주세요.";
      alertPopup();
    } else if (
      (TB04060S_rgstDt || TB04060S_apvlDt) >
      (TB04060S_rgstEndDt || TB04060S_apvlEndDt)
    ) {
      msgError = "조회시작일자가 조회종료일자보다 큽니다.";
      alertPopup();
    } else {
      businessFunction();
    }

    function alertPopup() {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: msgError,
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inParam = {
        dealNo: $("#TB04060S_ibDealNo").val(), // Deal번호
        rgstDt: $("#TB04060S_rgstDt").val().replaceAll("-", ""), // 등록일자
        rgstEndDt: $("#TB04060S_rgstEndDt").val().replaceAll("-", ""), // 등록종료일자
        prgSttsCd: $("#TB04060S_I011").val(), // 진행상태
        prdtCd: $("#TB04060S_prdtCd").val(), // 종목코드
        prdtLclsCd: $("#TB04060S_E022").val(), // 투자상품(대)
        prdtMdclCd: $("#TB04060S_E023").val(), // 투자상품(중)
        prdtClsfCd: $("#TB04060S_E021").val(), // 투자상품(소)
        ibPrdtClsfCd: $("#TB04060S_I002").val(), // IB상품분류
        chrrEmpno: $("#TB04060S_chrr_empNo").val(), // 담당자번호
        mngmBdcd: $("#TB04060S_dprtCd").val(), // 관리부서
        cnsbDcd: $("#TB04060S_I008").val(), // 전결협의체
        apvlDt: $("#TB04060S_apvlDt").val().replaceAll("-", ""), // 승인일자
        apvlEndDt: $("#TB04060S_apvlEndDt").val().replaceAll("-", ""), // 승인종료일자
        trOthrDscmNo: $("#TB04060S_bsnsRgstNo").val().replaceAll("-", ""), // 거래상대방식별번호
      };

      $.ajax({
        type: "GET",
        url: "/TB04060S/checkDealSearch",
        data: inParam,
        dataType: "json",
        beforeSend: function () {
          pqGridObjIbDealList.option("dataModel.data", []);
          pqGridObjIbDealList.option("strNoRows", "조회 중입니다...");
          pqGridObjIbDealList.refreshDataAndView();
        },
        success: function (data) {
          var setList = data;

          var rowList = [];

          if (setList.length > 0) {
            $.each(setList, function (key, value) {
              console.log("confirm::::::::::", value);

              //alert(value.sumRcgAmt);

              var prgStts =
                value.prgSttsCd == "" || value.prgSttsCd == null
                  ? value.prgSttsCdNm
                  : value.prgSttsCdNm + " (" + value.prgSttsCd + ")";
              var prdtLcls =
                value.prdtLclsCd == "" || value.prdtLclsCd == null
                  ? value.prdtLclsCdNm
                  : value.prdtLclsCdNm + " (" + value.prdtLclsCd + ")";
              var prdtMdcl =
                value.prdtMdclCd == "" || value.prdtMdclCd == null
                  ? value.prdtMdclCdNm
                  : value.prdtMdclCdNm + " (" + value.prdtMdclCd + ")";
              var prdtClsf =
                value.prdtClsfCd == "" || value.prdtClsfCd == null
                  ? value.prdtClsfCdNm
                  : value.prdtClsfCdNm + " (" + value.prdtClsfCd + ")";
              var ibPrdtClsf =
                value.ibPrdtClsfCd == "" || value.ibPrdtClsfCd == null
                  ? value.ibPrdtClsfCdNm
                  : value.ibPrdtClsfCdNm + " (" + value.ibPrdtClsfCd + ")";

              var sumRcgAmt =
                value.sumRcgAmt == NaN ||
                value.sumRcgAmt == null ||
                value.sumRcgAmt == ""
                  ? 0
                  : value.sumRcgAmt;

              var newRow = {
                dealNo: value.dealNo,
                prgSttsCdNm: prgStts,
                rgstDt: value.rgstDt,
                prdtCd: value.prdtCd,
                prdtNm: value.prdtNm,
                entpHnglNm: value.entpHnglNm,
                prdtLclsCdNm: prdtLcls,
                prdtMdclCdNm: prdtMdcl,
                prdtClsfCdNm: prdtClsf,
                ibPrdtClsfCdNm: ibPrdtClsf,
                sumRcgAmt: sumRcgAmt,
                eprzCrdlApvlAmt: value.eprzCrdlApvlAmt,
                empNm: value.empNm,
                chrrEmpnm: value.chrrEmpnm,
                cnsbDcd: value.cnsbDcd,
                apvlDt: value.apvlDt,
                eprzCrdlCtrcAmt: value.eprzCrdlCtrcAmt,
                dealExcAmt: value.dealExcAmt,
                dealExcBlce: value.dealExcBlce,
              };

              rowList.push(newRow);
            });

            pqGridObjIbDealList.option(
              "strNoRows",
              "조회된 데이터가 없습니다."
            );
            pqGridObjIbDealList.option("dataModel.data", rowList);
            pqGridObjIbDealList.refreshDataAndView();
          } else {
            pqGridObjIbDealList.option(
              "strNoRows",
              "조회된 데이터가 없습니다."
            );
            pqGridObjIbDealList.refreshDataAndView();
          }
        },
      });
    }
  }

  /**
   * 투자상품 대분류에 따른 중분류,소분류 필터 by hytest
   */
  function changePrdtLclsCd() {
    var tempPrdtLclsCd = $("#TB04060S_E022 option:selected").val();
    var secondPrdt = document.getElementById("TB04060S_E023");
    var thirdPrdt = document.getElementById("TB04060S_E021");
    if (tempPrdtLclsCd != undefined && tempPrdtLclsCd != "") {
      for (var i = 0; i < secondPrdt.length; i++) {
        var txt = secondPrdt.options[i].text;
        if (txt.indexOf("(" + tempPrdtLclsCd) > 0) {
          $(secondPrdt.options[i]).show();
        } else {
          $(secondPrdt.options[i]).hide();
        }
      }
      for (var i = 0; i < thirdPrdt.length; i++) {
        var txt = thirdPrdt.options[i].text;
        if (txt.indexOf("(" + tempPrdtLclsCd) > 0) {
          $(thirdPrdt.options[i]).show();
        } else {
          $(thirdPrdt.options[i]).hide();
        }
      }
    } else {
      for (var i = 0; i < secondPrdt.length; i++) {
        $(secondPrdt.options[i]).show();
      }
      for (var i = 0; i < thirdPrdt.length; i++) {
        $(thirdPrdt.options[i]).show();
      }
    }
  } //end-func

  /**
   * selectBox 부서코드 set
   */
  function fnSelectBox() {
    let selectBox = getSelectBoxList(
      "TB04060S",
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

    $("#TB04060S_dprtNm").append(D010html);

    $("#TB04060S_dprtNm").on("change", function () {
      $("#TB04060S_dprtCd").val($("#TB04060S_dprtNm").val());
    });
  }

  return {
    /**
     * 사용 할 함수 정의
     */
    checkDealSearch: checkDealSearch,
    resetSearchParam: resetSearchParam,
    changePrdtLclsCd: changePrdtLclsCd,
  };
})();
