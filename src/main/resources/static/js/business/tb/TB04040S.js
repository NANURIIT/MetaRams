const TB04040Sjs = (function () {
  let pqGridObjIssDtls;

  var pageModel_TB04040S = {
    type: "local",
    rPP: 50,
    strRpp: "{0}",
    strDisplay: "{0} to {1} of {2}",
    strPage: "Page {0} / {1}",

    layout: ["first", "prev", "next", "last", "|", "strPage"],
  };

  var colModel_TB04040S = [
    {
      title: "발급일",
      // editable: true,
      dataType: "string",
      dataIndx: "issDt",
      align: "center",
      halign: "center",
      width: "",
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
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "발급서류",
      dataType: "date",
      dataIndx: "issLtrNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "통화코드",
      dataType: "date",
      dataIndx: "issCrryCd",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "발급금액",
      dataType: "date",
      dataIndx: "issAmt",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var value = parseFloat(ui.cellData);

        var formattedValue = value.toLocaleString("ko-KR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedValue;
      },
    },
    {
      title: "제출처",
      dataType: "date",
      dataIndx: "smitOrgi",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부서명",
      dataType: "date",
      dataIndx: "dprtNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당자명",
      dataType: "date",
      dataIndx: "empNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "발급서류코드",
      dataType: "date",
      dataIndx: "issLtrDcd",
      hidden: true,
    },
    {
      title: "부서코드",
      dataType: "date",
      dataIndx: "decdDptDcd",
      hidden: true,
    },
    {
      title: "담당자사번",
      dataType: "date",
      dataIndx: "empno",
      hidden: true,
    },
  ];

  var toolbar_TB04040S = {
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
        value: pageModel_TB04040S.rPP,
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
    getSelectBoxList("TB04040S", "I043/D010"); // 발급서류, 부서명

    $("#TB04040S_fromDate").val(addMonth(getToday(), -1));
    $("#TB04040S_toDate").val(getToday());

    setGrid_TB04040S();
  });

  // 유효성 검사용 날짜패턴
  var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  function setGrid_TB04040S() {
    pqGridObjIssDtls = [
      {
        height: 500,
        maxHeight: 500,
        id: "TB04040_getIssDtls",
        colModel: colModel_TB04040S,
      },
    ];

    setPqGrid(pqGridObjIssDtls);

    pqGridObjIssDtls = $("#TB04040_getIssDtls").pqGrid("instance");

    pqGridObjIssDtls.refreshDataAndView();
  }

  // LOI/LOC 발급내역 조회
  function srchIssDtlsList() {
    var dealNo = $("#TB04040S_ibDealNo").val();
    var dealNm = $("#TB04040S_ibDealNm").val();
    var issLtrDcd = $("#TB04040S_I043").val();
    var decdDptDcd = $("#TB04040S_D010").val();
    var strtDt = $("#TB04040S_fromDate").val();
    var endDt = $("#TB04040S_toDate").val();

    if (!isEmpty(strtDt) && !pattern.test(strtDt)) {
      msgError = "조회시작일자를 확인해주세요.";
      alertPopup();
    } else if (!isEmpty(strtDt) && !pattern.test(endDt)) {
      msgError = "조회종료일자를 확인해주세요.";
      alertPopup();
    } else if (strtDt > endDt) {
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
      var dtoParam = {
        dealNo: dealNo,
        dealNm: dealNm,
        issLtrDcd: issLtrDcd,
        decdDptDcd: decdDptDcd,
        strtDt: strtDt.replaceAll("-", ""),
        endDt: endDt.replaceAll("-", ""),
      };

      $.ajax({
        type: "GET",
        url: "/TB04040S/getLoiIssDtls",
        data: dtoParam,
        dataType: "json",
        beforeSend: function () {
          pqGridObjIssDtls.option("dataModel.data", []);
          pqGridObjIssDtls.option("strNoRows", "조회 중입니다...");
          pqGridObjIssDtls.refreshDataAndView();
        },
        success: function (data) {
          var setList = data;

          if (setList.length > 0) {
            pqGridObjIssDtls.option("dataModel.data", setList);
            pqGridObjIssDtls.refreshDataAndView();
            pqGridObjIssDtls.option("rowDblClick", function (event, ui) {
              issMovePage(ui.rowData);
            });
          } else {
            pqGridObjIssDtls.option("strNoRows", "조회된 데이터가 없습니다.");
            pqGridObjIssDtls.refreshDataAndView();
          }
        },
      });
    }
  }

  // LOI/LOC 발급 버튼 클릭시 발급화면으로 이동
  function issMovePage(e) {
    var dealNo = e.dealNo;
    var dealNm = e.dealNm;

    sessionStorage.setItem("dealNo", dealNo);
    sessionStorage.setItem("dealNm", dealNm);
    callPage("TB04050S");
  }

  return {
    /**
     * 사용 할 함수 정의
     */
    srchIssDtlsList: srchIssDtlsList,
  };
})();
