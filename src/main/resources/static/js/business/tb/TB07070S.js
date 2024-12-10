const TB07070Sjs = (function () {
  const userEno = $("#userEno").val(),
    userEmpNm = $("#userEmpNm").val(),
    userDprtCd = $("#userDprtCd").val(),
    userDprtNm = $("#userDprtNm").val();
  let excRdmpCncl; // 실행상환취소 그리드 instance
  let fSel = {}; // filter된 select
  let fValid = 0; // validation 분기
  let svGrd = [];

  $(document).ready(function () {
    /* 순서 중요 */
    getSelBx();
    pqGrid();
    setDefaultVal();
  });

  const setDefaultVal = () => {
    $("#TB07070S_empNo").val(userEno);
    $("#TB07070S_empNm").val(userEmpNm);
    $("#TB07070S_trDt").val(getToday()); // 오늘일자 바인딩
  }

  function getSelBx() {
    /**
     * PRDT_CLSF_CD					기업여신상품분류코드	 P004
     * ETPR_CRDT_GRNT_TR_KIND_CD	기업신용공여거래종류코드 P012
     * EPRZ_CRDL_TR_STTS_CD			기업여신거래상태코드	 E026
     * INVST_CRNCY_CD				투자통화코드			I027
     */
    rtnSel = getSelectBoxList("TB07070S", "P004/P012/E026/I027", false);

    // 기업여신상품분류코드
    fSel.P004 = rtnSel.filter(function (item) {
      return item.cmnsGrpCd === "P004";
    });
    // 기업신용공여거래종류코드
    fSel.P012 = rtnSel.filter(function (item) {
      return item.cmnsGrpCd === "P012";
    });
    // 기업여신거래상태코드
    fSel.E026 = rtnSel.filter(function (item) {
      return item.cmnsGrpCd === "E026";
    });
    // 기업여신거래상태코드
    fSel.I027 = rtnSel.filter(function (item) {
      return item.cmnsGrpCd === "I027";
    });
  }

  function pqGrid() {
    /********************************************************************
     * PQGrid Column
     ********************************************************************/
    // 실행상환취소
    let col07070 = [
      //체크박스
      // { dataIndx: "chk", maxWidth: 36, minWidth: 36, align: "center", resizable: false,
      // 	title: "",
      // 	menuIcon:false,
      // 	type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
      // 	dataType: 'bool',
      // 	editable: 'true',
      // 	cb: {
      // 		all: false,
      // 		header: true
      // 	}
      // },

      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        halgn: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목명",
        dataType: "string",
        dataIndx: "prdtNm",
        halign: "center",
        align: "left",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래순번",
        dataType: "string",
        dataIndx: "trSn",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "실행순번",
        dataType: "string",
        dataIndx: "excSn",
        halign: "center",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "대출종류",
        dataType: "string",
        dataIndx: "prdtClsfCd",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fSel.P004,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let selb = fSel.P004.find(({ cdValue }) => cdValue == ui.cellData);
          return selb ? selb.cdName : ui.cellData;
        },
      },
      {
        title: "거래종류",
        dataType: "string",
        dataIndx: "etprCrdtGrntTrKindCd",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fSel.P012,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let selb = fSel.P012.find(({ cdValue }) => cdValue == ui.cellData);
          return selb ? selb.cdName : ui.cellData;
        },
      },
      {
        title: "거래상태",
        dataType: "string",
        dataIndx: "trStatCd",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fSel.E026,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let selb = fSel.E026.find(({ cdValue }) => cdValue == ui.cellData);
          return selb ? selb.cdName : ui.cellData;
        },
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "crryCd",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdValue",
          options: fSel.I027,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let selb = fSel.I027.find(({ cdValue }) => cdValue == ui.cellData);
          return selb ? selb.cdValue : ui.cellData;
        },
      },
      {
        title: "거래일자",
        dataType: "string",
        dataIndx: "trDt",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
        // editor: {
        // 	type: 'textbox',
        // 	init: function(ui) {
        // 		let $inp = ui.$cell.find("input");
        // 		$inp.on('input', function() {
        // 			inputNumberFormat(this)
        // 		});
        // 	}
        // },
        // render     : function (ui) {
        //     let cellData = ui.cellData;
        //     return Number(uncomma(cellData))
        // },
      },
      {
        title: "거래금액",
        dataType: "integer",
        dataIndx: "dealTrAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래원금",
        dataType: "integer",
        dataIndx: "dealTrPrca",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래이자",
        dataType: "integer",
        dataIndx: "trIntAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래수수료",
        dataType: "integer",
        dataIndx: "trFeeAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
        render: function(ui){
          if(!ui.cellData){
            return 0;
          }
        }
      },
      {
        title: "거래부서",
        dataType: "string",
        dataIndx: "dprtNm",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "담당자",
        dataType: "string",
        dataIndx: "chrrEnm",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "정정취소사유내용",
        dataType: "string",
        dataIndx: "rvseCnclRsonText",
        halign: "center",
        align: "left",
        hidden: true,
      },
      // {
      // 	title    : "담당자명",
      // 	dataType : "string",
      // 	dataIndx : "chrrEnm",
      // 	halign   : "center",
      // 	align    : "left",
      // 	width    : "10%",
      // 	filter   : { crules : [{ condition : 'range' }] }
      // },
    ];

    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 300,
        maxHeight: 300,
        id: "grd_07070",
        colModel: col07070,
        scrollModel: { autoFit: false },
        selectionModel: { type: "row" },
      },
    ];

    setPqGrid(pqGridObjs);

    // Grid instance
    excRdmpCncl = $("#grd_07070").pqGrid("instance");
  }

  // 조회
  function srch() {
    fValid = 3;

    if (validation().isValid) {
      let obj = {
        prdtCd: $("#TB07070S_prdtCd").val(), // 상품코드
        prdtNm: $("#TB07070S_prdtNm").val(), // 상품명
        trDt: unformatDate($("#TB07070S_trDt").val()), // 거래일자
        etprCrdtGrntTrKindCd: $("#TB07070S_P012").val(), // 거래종류코드
        trStatCd: $("#TB07070S_E026").val(), // 거래상태
        chrrEmpno: $("#TB07070S_empNo").val(), // 담당자사번
        chrrEnm: $("#TB07070S_empNm").val(), // 담당자명
      };

      $.ajax({
        type: "POST",
        url: "/TB07070S/selectTrRvseInq",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          excRdmpCncl.setData([]);
          $("#btnSave").prop("disabled", false);
        },
        success: function (data) {
          console.log(data);
          if (data.length > 0) {

            excRdmpCncl.setData(data);

            excRdmpCncl.on("rowSelect", function (evt, ui) {
              let al = ui.addList;
              //console.log(ui);
              if (al.length > 0) {
                let trSts = al[0].rowData.trStatCd;
                if (trSts !== "1") {
                  $("#btnSave").prop("disabled", true);
                } else {
                  $("#btnSave").prop("disabled", false);
                }
              } else {
                $("#btnSave").prop("disabled", false);
              }
            });
          } else {
            Swal.fire({
              icon: "warning",
              text: "조회된 내역이 없습니다.",
              confirmButtonText: "확인",
            });
            // grdRdmpTrgt.setData([]);
            // grdRdmpTrgt.refreshDataAndView();
          }
        },
      });
    }
  }

  // 이후 거래 존재여부 확인
  $("#btnSave").on("click", function () {
    // console.log('excRdmpCncl ::: ',excRdmpCncl);
    // console.log('excRdmpCncl.getData ::: ', excRdmpCncl.getData());

    fValid = 2;

    let selGrd = excRdmpCncl.getData();
    let obj = {};

    for (let i = 0; i < selGrd.length; i++) {
      const ele = selGrd[i];
      if (ele.pq_rowselect) {
        obj.prdtCd = ele.prdtCd; // 종목코드
        obj.excSn = ele.excSn; // 실행일련번호
        obj.trSn = ele.trSn; // 거래일련번호
        obj.etprCrdtGrntTrKindCd = ele.etprCrdtGrntTrKindCd; // 거래종류코드
      }
    }

    if (validation(obj).isValid) {
      $.ajax({
        type: "POST",
        url: "/TB07070S/selectAfChkTrsnIBIMS410B",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (data) {
          console.log(data);
          if (data === 0) {
            console.log("실행가능");
            save(selGrd);
          } else {
            Swal.fire({
              icon: "warning",
              text: "이후 거래가 존재합니다.",
              confirmButtonText: "확인",
            });
            return;
            // grdRdmpTrgt.setData([]);
            // grdRdmpTrgt.refreshDataAndView();
          }
        },
      });
    }
  });

  // 저장
  function save(p) {
    fValid = 1;

    let obj = {
      // prdtCd : $('#TB07070S_prdtCd').val(), 			  // 상품코드
      // prdtNm : $('#TB07070S_prdtNm').val(), 			  // 상품명
      // trDt   : unformatDate($('#TB07070S_trDt').val()),  // 거래일자
      // etprCrdtGrntTrKindCd : $('#TB07070S_P012').val(),  // 거래종류코드
      // trStatCd : $('#TB07070S_E026').val(),			  // 거래상태
      // chrrEmpno : $('#TB07070S_empNo').val(),			  // 담당자사번
      // chrrEnm : $('#TB07070S_empNm').val(),			  // 담당자명
    };

    for (let i = 0; i < p.length; i++) {
      const ele = p[i];
      if (ele.pq_rowselect) {
        obj.prdtCd = ele.prdtCd; // 종목코드
        obj.prdtNm = ele.prdtNm; // 종목명
        obj.excSn = ele.excSn; // 실행일련번호
        obj.trSn = ele.trSn; // 거래일련번호
        obj.prdtClsfCd = ele.prdtClsfCd; // 기업여신상품분류코드
        obj.etprCrdtGrntTrKindCd = ele.etprCrdtGrntTrKindCd; // 거래종류코드
        obj.trStatCd = ele.trStatCd; // 거래상태코드
        obj.crryCd = ele.crryCd; // 통화코드
        obj.dealTrAmt = ele.dealTrAmt; // 딜거래금액
        obj.dealTrPrca = ele.dealTrPrca; // 딜거래원금
        obj.trIntAmt = ele.trIntAmt; // 거래이자금액
        obj.trFeeAmt = ele.trFeeAmt; // 거래수수료금액
        obj.mngmBdcd = ele.mngmBdcd; // 부서코드
        obj.dprtNm = ele.dprtNm; // 부서명
        obj.chrrEmpno = ele.chrrEmpno; // 담당자사원번호
        obj.chrrEnm = ele.chrrEnm; // 담당자명
        obj.trDt = ele.trDt; // 거래일자
      }
    }

    obj.rvseCnclRsonText = $("#TB07070S_rvseCnclRsonText").val();

    console.log("save ::: ", obj);
    $.ajax({
      type: "POST",
      url: "/TB07070S/saveTrRvseInq",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data > 0) {
          Swal.fire({
            icon: "success",
            text: "실행이 완료됐습니다.",
            confirmButtonText: "확인",
          });
          $('#TB07070S_rvseCnclRsonText').val("")
          srch();
        } else {
          Swal.fire({
            icon: "warning",
            text: "실행에 실패하였습니다.",
            confirmButtonText: "확인",
          });
          // grdRdmpTrgt.setData([]);
          // grdRdmpTrgt.refreshDataAndView();
        }
      },
    });
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation(obj = {}) {
    let prdtCd = $("#TB07070S_prdtCd").val(); // 종목코드
    let trDt = unformatDate($("#TB07070S_trDt").val()); // 거래일자

    if (isEmpty(prdtCd) || prdtCd == null) {
      Swal.fire({
        icon: "warning",
        text: "종목코드를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return { isValid: false };
    }

    if (isEmpty(trDt) || trDt == null) {
      Swal.fire({
        icon: "warning",
        text: "거래일자를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return { isValid: false };
    }

    if (fValid === 1) {
    }

    if (fValid === 2) {
      console.log("validation ::: ", obj);
      if (Object.keys(obj).length === 0) {
        Swal.fire({
          icon: "warning",
          text: "선택된 행이 없습니다. 확인해주세요",
          confirmButtonText: "확인",
        });
        return { isValid: false };
      }
    }

    let returnObj = {
      isValid: true,
      prdtCd,
      trDt,
    };

    return returnObj;
  }

  // 초기화
  function reset() {
    $("#TB07070S_prdtCd").val(""); // 종목코드
    $("#TB07070S_prdtNm").val(""); // 종목명
    $("#TB07070S_empNo").val(""); // 담당자사번
    $("#TB07070S_empNm").val(""); // 담당자명
    $("#TB07070S_trDt").val(getToday); // 거래일자
    $("#TB07070S_rvseCnclRsonText").val(""); // 사유내용
    $("#TB07070S_P012 option:eq(0)").prop("selected", true); // 거래종류
    $("#TB07070S_E026 option:eq(0)").prop("selected", true); // 거래상태
    excRdmpCncl.setData([]); // 취소대상내역
  }

  return {
    srch: srch,
    reset: reset,
  };
})();
