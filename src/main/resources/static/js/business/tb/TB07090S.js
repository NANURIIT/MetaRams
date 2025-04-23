const TB07090Sjs = (function () {

  let TB07090S_rowData = {};
  const TB07090S_dummyData = TB07090S_rowData;

  let loginUsrId;
  let loginUsrNm;
  let loginUsrDprtCd;
  let loginUsrDprtNm;

  let selected_rdmpPrarDtl = null;
  let selected_dptrRgstDtl = null;

  let colModel2_rowIndx = null;
  let colModel3_rowIndx = null;
  let colModel3_dealRctmAmt = 0;

  let TB07090S_rowIndx;
  let TB07090S_pqGridLength = 0;
  let selectBox;
  let fnltList = []; //기관 list

  let grdSelect = {};
  let dprtList = {}; //부서코드
  let crryCdList = {}; //통화코드
  let fndsDcdList = {}; //자금구분코드
  let scxDcdList = {}; //상환구분코드
  let rdptObjtDvsnCdList = {}; //상환대상구분코드

  let rctmDtlsRgstDeleteList = [];
  let rctmDtlsMappingDeleteList = [];

  /**
    * 화면 요건
    * 1. 상환예정내역 조회 - 조회조건: Deal번호, 상환예정일자, 관리부서
    * 
    * 2. 입금증등록내역
    * 2-1. 입금증등록내역 조회 - 조회 조건: 입금일자
    * 2-2. 입금증등록내역 입력 
    * 2-3. 입금증등록내역 삭제 - 입금내역매핑이 된 입금증등록내역인 경우 삭제, 수정 불가능 alert으로 경고.
    * 
    * 3. 입금내역매핑
    * 3-1. 입금내역매핑 조회 - 조회 조건: Deal번호, 입금일자, 관리부서
    * 3-2. 입금내역매핑 입력 - 데이터 입력시 화면에 안보이는 데이터도 입력 가능한것들 다 입력함. TB07170S 입금내역조회에 쓰일 테이블이라 그럼
    * 3-3. 입금내역매핑 수정 - 입금금액, 초과납입처리내용만 수정.
    * 3-4. 입금내역 행추가 - 행 추가시에 입금증등록내역 1건과, 상환예정내역 1건을 선택해야 행추가 가능.
    * 
    * 4. 저장버튼 - 해당 그리드 변경사항 저장(ajax)
    * 
    * 김건우 2024-12-19
    */

  $(document).ready(function () {
    loadUserAuth(); //로그인유저정보
    selectBoxSet_TB07090S();
    getDealInfoFromWF();
    resetAll();

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB07090S_fromDate", "TB07090S_toDate");

    // 조회조건 수정시 초기화
    $("#TB07090S_conSrch").find('input, select').on('input', function () {
      resetPGgrids("TB07090S")
    })

  });

  function loadUserAuth() {
    $.ajax({
      type: "GET",
      url: "/getUserAuth",
      dataType: "json",
      success: function (data) {
        //loginUserId = data.eno;
        loginUsrId = data.eno;
        loginUsrNm = data.empNm;
        loginUsrDprtCd = data.dprtCd;
        loginUsrDprtNm = data.dprtNm;
      },
      error: function (request, status, error) {
        console.log(request + "\n", status, "\n", error, "\n");
      },
    });
  }

  function getFnltList() {
    // var frstOpt = {
    //     fnltCd: "",
    //     fnltNm: "선택"
    // }

    // fnltList.push(frstOpt);

    $.ajax({
      type: "GET",
      url: "/getFnltList",
      data: "",
      dataType: "json",
      success: function (data) {
        //console.log(data);

        result = data;

        if (result.length > 0) {
          $.each(result, function (key, value) {
            var fnlt = {
              fnltCd: value.fnltCd,
              fnltNm: value.fnltNm,
            };

            fnltList.push(fnlt);
          });
        }
      },
    });
  }

  function selectBoxSet_TB07090S() {
    selectBox = getSelectBoxList(
      "TB07090S",
      "E020/D010/I027/F008/S001/R038",
      false
    );

    dprtList = selectBox.filter(function (item) {
      //부서코드 list
      return item.cmnsGrpCd === "D010";
    });

    crryCdList = selectBox.filter(function (item) {
      //통화코드 list
      return item.cmnsGrpCd === "I027";
    });

    fndsDcdList = selectBox.filter(function (item) {
      //자금구분코드 list
      return item.cmnsGrpCd === "F008";
    });

    scxDcdList = selectBox.filter(function (item) {
      //상환구분코드 list
      return item.cmnsGrpCd === "S001";
    });

    rdptObjtDvsnCdList = selectBox.filter(function (item) {
      //상환대상구분코드 list
      return item.cmnsGrpCd === "R038";
    });

    getFnltList();

    //console.log(fnltList);

    dprtList.forEach((item) => {
      $("#TB07090S_dprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );
    });

    let TB07090S_colModel1 = [
      {
        title: "Deal번호",
        dataType: "string",
        dataIndx: "dealNo",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리부서",
        dataType: "string",
        dataIndx: "mngmBdcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        halign: "center",
        align: "center",
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
        title: "상환구분",
        dataType: "string",
        dataIndx: "scxDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = scxDcdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName.slice(0, -5) : ui.cellData;
        },
      },
      {
        title: "통화",
        dataType: "string",
        dataIndx: "trCrryCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = crryCdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdValue : ui.cellData;
        },
      },
      // , {
      //     title: "원금",
      //     dataType: "string",
      //     dataIndx: "prarPrna",
      //     halign: "center",
      //     align: "center",
      //     filter: { crules: [{ condition: 'range' }] },
      //     render: function (ui) {

      // 		var cellData = ui.cellData;
      // 		if(cellData == null || cellData == ''){
      // 			cellData = 0;
      // 		}
      // 		var value = parseFloat(cellData);

      // 		var formattedValue = value.toLocaleString('ko-KR', {
      // 			minimumFractionDigits: 0,
      // 			maximumFractionDigits: 2
      // 		});

      // 		return formattedValue;
      // 	}
      // }
      // , {
      //     title: "이자",
      //     dataType: "string",
      //     dataIndx: "rdmpPrarIntr",
      //     halign: "center",
      //     align: "center",
      //     filter: { crules: [{ condition: 'range' }] },
      //     render: function (ui) {

      // 		var cellData = ui.cellData;
      // 		if(cellData == null || cellData == ''){
      // 			cellData = 0;
      // 		}
      // 		var value = parseFloat(cellData);

      // 		var formattedValue = value.toLocaleString('ko-KR', {
      // 			minimumFractionDigits: 0,
      // 			maximumFractionDigits: 2
      // 		});

      // 		return formattedValue;
      // 	}
      // }
      // , {
      //     title: "수수료",
      //     dataType: "string",
      //     dataIndx: "fee",
      //     halign: "center",
      //     align: "center",
      //     filter: { crules: [{ condition: 'range' }] },
      //     render: function (ui) {

      // 		var cellData = ui.cellData;
      // 		if(cellData == null || cellData == ''){
      // 			cellData = 0;
      // 		}
      // 		var value = parseFloat(cellData);

      // 		var formattedValue = value.toLocaleString('ko-KR', {
      // 			minimumFractionDigits: 0,
      // 			maximumFractionDigits: 2
      // 		});

      // 		return formattedValue;
      // 	}
      // }
      {
        title: "납부예정금액",
        dataType: "integer",
        format: "#,###",
        dataIndx: "pmntPrarAmt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
        // render: function (ui) {
        //   var cellData = ui.cellData;
        //   if (cellData == null || cellData == "") {
        //     cellData = 0;
        //   }
        //   var value = parseFloat(cellData);

        //   var formattedValue = value.toLocaleString("ko-KR", {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 2,
        //   });

        //   return formattedValue;
        // },
      },
    ];

    // IBIMS435B
    let TB07090S_colModel2 = [

      // 대표님 지시로 Deal번호 컬럼 삭제
      // 2024-12-17 김건우
      // {
      //   title: "deal번호",
      //   editable: false,
      //   dataType: "string",
      //   dataIndx: "dealNo",
      //   halign: "center",
      //   align: "center",
      //   width: "165",
      //   filter: { crules: [{ condition: "range" }] },
      // },
      // ,{
      //     title: "예정일자",
      //     dataType: "string",
      //     dataIndx: "prarDt",
      //     halign: "center",
      //     align: "center",
      //     width: "165",
      //     filter: { crules: [{ condition: 'range' }] },
      //     render: function (ui) {

      // 		var cellData = ui.cellData;
      // 		if (cellData && cellData.length === 8) {
      // 			var year = cellData.substring(0, 4);
      // 			var month = cellData.substring(4, 6);
      // 			var day = cellData.substring(6, 8);
      // 			return year + "-" + month + "-" + day;
      // 		}
      // 		return cellData;
      // 	}
      // }
      {
        title: "입금일자",
        dataType: "string",
        dataIndx: "rctmDt",
        halign: "center",
        align: "center",
        width: "165",
        editable: true,
        render: function (ui) {
          return formatDate(ui.cellData);
        }
      },
      {
        title: "등록순번",
        editable: false,
        dataType: "string",
        dataIndx: "rgstSeq",
        halign: "center",
        align: "right",
        width: "80",
        filter: { crules: [{ condition: "range" }] },
      },

      // 요청받아서 삭제
      // 2024-12-19 김건우
      // {
      //   title: "관리부서",
      //   editable: false,
      //   dataType: "string",
      //   dataIndx: "mngmBdcd",
      //   halign: "center",
      //   align: "center",
      //   width: "165",
      //   filter: { crules: [{ condition: "range" }] },
      //   editor: {
      //     type: "select",
      //     valueIndx: "cdValue",
      //     labelIndx: "cdName",
      //     options: dprtList,
      //   },
      //   render: function (ui) {
      //     var options = dprtList;
      //     var option = options.find((opt) => opt.cdValue == ui.cellData);
      //     return option ? option.cdName : ui.cellData;
      //   },
      // },
      {
        title: "자금구분",
        dataType: "string",
        dataIndx: "fndsDvsnCd",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: fndsDcdList,
          init: function (ui) {
            initSelectAutoOpen(ui, fndsDcdList.length);
          }
        },
        render: function (ui) {
          var options = fndsDcdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "납부예정금액",
        dataType: "integer",
        format: "#,###",
        dataIndx: "pmntPrarAmt",
        halign: "center",
        align: "right",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "textbox",
          init: function (ui) {
            var $inp = ui.$cell.find("input");
            $inp.on("input", function () {
              this.value = this.value.replace(/[^0-9]/g, "");
              inputNumberFormat(this);
            });
          },
        },
        // render: function (ui) {
        //   var cellData = ui.cellData;
        //   if (cellData == null || cellData == "") {
        //     cellData = 0;
        //   }
        //   var value = "";

        //   if (String(cellData).includes(",")) {
        //     value = parseInt(cellData.replaceAll(",", ""), 10);
        //   } else {
        //     value = parseInt(cellData, 10);
        //   }

        //   var formattedValue = value.toLocaleString("ko-KR", {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 0,
        //   });

        //   return formattedValue;
        // },
      },
      {
        title: "입금금액",
        dataType: "integer",
        format: "#,###",
        dataIndx: "dealRctmAmt",
        halign: "center",
        align: "right",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
        // render: function (ui) {
        //   var cellData = ui.cellData;
        //   if (cellData == null || cellData == "") {
        //     cellData = 0;
        //   }
        //   var value = "";

        //   if (String(cellData).includes(",")) {
        //     value = parseInt(cellData.replaceAll(",", ""), 10);
        //   } else {
        //     value = parseInt(cellData, 10);
        //   }

        //   var formattedValue = value.toLocaleString("ko-KR", {
        //     minimumFractionDigits: 0,
        //     maximumFractionDigits: 0,
        //   });

        //   return formattedValue;
        // },
      },
      {
        title: "이체기관",
        dataType: "string",
        dataIndx: "reltIsttCd",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "fnltCd",
          labelIndx: "fnltNm",
          options: fnltList,
        },
        render: function (ui) {
          var options = fnltList;
          // console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
          // console.log("options{}", options);
          var option = options.find((opt) => opt.fnltCd == ui.cellData);
          return option ? option.fnltNm : ui.cellData;
        },
      },
      {
        title: "계좌번호",
        dataType: "string",
        dataIndx: "reltBano",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "입금자",
        dataType: "string",
        dataIndx: "dptrNm",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "등록부서",
        editable: false,
        dataType: "string",
        dataIndx: "rgstBdcd",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: dprtList,
        },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "등록자",
        editable: false,
        dataType: "string",
        dataIndx: "hndEmpno",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "등록일시",
        editable: false,
        dataType: "string",
        dataIndx: "hndDetlDtm",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        hidden: true,
      },
    ];

    // IBIMS431B 
    let TB07090S_colModel3 = [
      {
        title: "Deal번호",
        editable: false,
        dataType: "string",
        dataIndx: "dealNo",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리부서",
        editable: false,
        dataType: "string",
        dataIndx: "mngmBdcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: dprtList,
        },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "입금일자",
        dataType: "string",
        dataIndx: "rctmDt",
        halign: "center",
        align: "center",
        editable: false,
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
        title: "상환구분",
        editable: false,
        dataType: "string",
        dataIndx: "rdptObjtDvsnCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = rdptObjtDvsnCdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "입금금액",
        dataType: "integer",
        format: "#,###",
        dataIndx: "dealRctmAmt",
        editable: true,
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
        // 데이터 변경시 입금증등록내역 - 납부예정금액 변경 실패했음 헬프 2025-01-08
        render: function (ui) {
          // pqgrid값을 바꿨을때 입금증등록내역에 납부예정금액이 얼마가 되는지 보여주기
          const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid("instance").pdata;

          let updateIndx;

          for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {
            if (rctmDtlsMappingGridData[i].rctmDt === ui.rowData.rctmDt
              && rctmDtlsMappingGridData[i].rgstSeq === Number(ui.rowData.rgstSeq)
            ) {
              updateIndx = i;
              break;
            }
          }

          if (Number($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt) - Number(colModel3_dealRctmAmt) + Number(ui.cellData)) {
            $('#TB07090S_colModel3').pqGrid("instance").updateRow({
              rowIndx: ui.rowIndx,
              row: {
                beforeDealRctmAmt: Number(ui.cellData)
              }
            })
          }
        }
      },
      // {
      //   title: "변경전입금금액",
      //   dataType: "integer",
      //   format: "#,###",
      //   dataIndx: "beforeDealRctmAmt",
      //   editable: true,
      // },
      {
        title: "초과납입처리내용",
        editable: true,
        dataType: "string",
        dataIndx: "excsPymtPrcsText",
        halign: "center",
        align: "left",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        dataIndx: "fndsDvsnCd",
        hidden: true
      },
      {
        dataIndx: "prdtCd",
        hidden: true
      },
      {
        dataIndx: "excSn",
        hidden: true
      },
      {
        dataIndx: "trSn",
        hidden: true
      },
      {
        dataIndx: "rdmpTmrd",
        hidden: true
      },
      {
        dataIndx: "feeSn",
        hidden: true
      },
      {
        dataIndx: "excsPymtPrcsDvsnCd",
        hidden: true
      },
      {
        dataIndx: "pmntPrarAmt",
        hidden: true
      },
      {
        dataIndx: "reltIsttCd",
        hidden: true
      },
      {
        dataIndx: "reltIsttNm",
        hidden: true
      },
      {
        dataIndx: "reltBano",
        hidden: true
      },
      {
        dataIndx: "dptrNm",
        hidden: true
      },
      {
        dataIndx: "rgstSeq",
        hidden: true
      },
      {
        dataIndx: "rgstEmpno",
        hidden: true
      },
      {
        dataIndx: "rgstBdcd",
        hidden: true
      },
      {
        dataIndx: "rgstDtm",
        hidden: true
      },
      {
        dataIndx: "hndDetlDtm",
        hidden: true
      },
      // 필요없어보여 제거
      // 2024-12-17 김건우
      // {
      //   title: "등록순번",
      //   dataType: "string",
      //   dataIndx: "rgstSeq",
      //   hidden: true,
      // },
    ];

    pqGrid_TB07090S(TB07090S_colModel1, TB07090S_colModel2, TB07090S_colModel3);
  }

  $("#TB07090S_dprtNm").on("change", function () {
    var dprtCd = $(this).val();

    $("#TB07090S_dprtCd").val(dprtCd);
  });

  /*
   *  =====================PQGRID=====================
   */

  // /*
  //  *  pqGrid colModel
  //  */
  // function TB07090S_colModelData(idx) {

  // }

  /*
   *  PQGRID SETTING
   */
  function pqGrid_TB07090S(col1, col2, col3) {
    //alert(JSON.stringify(selectBox));

    //그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 200,
        maxHeight: 200,
        id: "TB07090S_colModel1",
        colModel: col1,
        scrollModel: { autoFit: true },
        editable: false,
        rowClick: function (evt, ui) {
          // const grid = this;
          //const $grid = $(grid);
          if (selected_rdmpPrarDtl === ui.rowData) {
            selected_rdmpPrarDtl = null;
            //$grid.pqGrid("setSelection", null);
            //$("#rowSelect_pre").html('');
          } else {
            selected_rdmpPrarDtl = ui.rowData;
            //console.log('Selected Row Data:', selected_rdmpPrarDtl);
          }
        },
        selectionModel: { type: "row" },
      },
      {
        height: 200,
        maxHeight: 200,
        id: "TB07090S_colModel2",
        colModel: col2,
        scrollModel: { autoFit: false },
        editable: true,
        cellClick: function (evt, ui) {
          /**
           * 1. 납부예정금액 수정금지. 오직 매핑내역 수정에 한해서만 변경됨
           * 2. 입금일자 DB에 입력된 사항은 수정금지. PK라 변경불가
           * 3. 등록부서, 등록자, 등록일시 서비스에서 변경
           */
          // 납부예정금액은 해당 입금증등록내역에 추가 될때마다 더해주기, 더했을때 입금금액 이상일 경우 매핑 불가!
          if (ui.column.dataIndx === "pmntPrarAmt") {
            ui.column.editable = false;
          }
          // UPDATE용 ROW는 입금일자 수정불가능
          else if (ui.rowData.hndDetlDtm && ui.column.dataIndx === "rctmDt") {
            ui.column.editable = false;
          }
          // INSERT용 ROW는 입금일자 수정가능
          else if (!ui.rowData.hndDetlDtm && ui.column.dataIndx === "rctmDt") {
            ui.column.editable = true;
          }
        },
        rowClick: function (event, ui) {
          if (TB07090S_rowData === ui.rowData) {
            TB07090S_rowData = TB07090S_dummyData;
          } else {
            TB07090S_rowData = ui.rowData;
          }
          if (selected_dptrRgstDtl === ui.rowData) {
            colModel2_rowIndx = null;
            selected_dptrRgstDtl = null;
          } else {
            colModel2_rowIndx = ui.rowIndx;
            selected_dptrRgstDtl = ui.rowData;
          }
        },
        selectionModel: { type: "row" },
      },
      {
        height: 200,
        maxHeight: 200,
        id: "TB07090S_colModel3",
        colModel: col3,
        scrollModel: { autoFit: true },
        editable: true,
        rowClick: function (event, ui) {
          if (TB07090S_rowData === ui.rowData) {
            colModel3_rowIndx = null;
            TB07090S_rowData = TB07090S_dummyData;
          } else {
            colModel3_rowIndx = ui.rowIndx;
            TB07090S_rowData = ui.rowData;
          }
        },
        selectionModel: { type: "row" },
        // 날짜선택 테스트 시작
        editorBegin: function (event, ui) {

          if (ui.column.dataIndx === 'isuDt') {

            editorData = $(ui.$editor).val()

            $(ui.$editor).datepicker({
              todayBtn: "linked",
              autoclose: true,
              format: "yyyy-mm-dd",
              keyboardNavigation: false,
              forceParse: false,
              calendarWeeks: false,
              language: "ko",
            }).on("show", function (e) {
              isDatePickerOpen = true;
            }).on("hide", function (e) {
              isDatePickerOpen = false;
              $("#TB07200S_pblHis").pqGrid("instance").refresh();
            })

            $(ui.$editor).on('focus', function () {
              $(".datepicker").find('td').on('pointerdown', function () {
                let date = new Date(Number($(this).attr('data-date')))
                editorData = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
              });
            })

            $(ui.$editor).on('input', function () {
              editorData = $(this).val()
            })

            $(ui.$editor).inputmask('99999999');
          }
          // else if ( ui.column.dataIndx === 'expDt' ) {
          //     console.log(ui);
          // }
        },
        editorEnd: function (event, ui) {
          $("#TB07200S_pblHis").pqGrid("instance").pdata[ui.rowIndx].isuDt = editorData
          $("#TB07200S_pblHis").pqGrid("instance").refresh();
          if (isDatePickerOpen) {
            return false;
          }
          return true;
        },
        // 날짜선택 테스트 끝
      },
    ];
    setPqGrid(pqGridObjs);
  }

  var dateEditor_feeSch = function (ui) {
    console.log(ui);
    ui.$cell.find("input").on("input", function () {
      let temVal;
      temVal = replaceAll($(this).val(), '-', '');
      if (temVal.length === 8) {
        temVal = formatDate(temVal);
        console.log("onformat" + temVal);
        $(this).val(temVal);
      } else if (temVal.length > 8) {
        $(this).val(formatDate(temVal.slice(0, 8)));
      }
    })
      .datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yyyy-mm-dd',//ui.column.format,//pq.excelToJui(ui.column.format),
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        language: "ko",
      });
  }
  /**
   * 뭔지모를 요건을 받은 김건우버전
   */
  function search_TB07090S() {
    var rctmDt = $("#TB07090S_rctmDt").val(); //입금일자
    //var fromDt      = $('#TB07090S_fromDate').val();            //상환예정일자 (조회 시작일)
    //var toDt        = $('#TB07090S_toDate').val();              //상환예정일자 (조회 종료일)

    var option = {};
    option.title = "Warning";
    option.type = "warn";

    // }else{
    businessFunction(rctmDt);
    //}

    function businessFunction(rctmDt) {
      //var paiRdmpDcd  = $('#TB07090S_E020').val();             //상환구분코드
      var dealNo = $("#TB07090S_ibDealNo").val(); //딜번호
      var dprtCd = $("#TB07090S_dprtCd").val(); //관리부서코드
      var fromDt = $("#TB07090S_fromDate").val(); //상환예정일자 (조회 시작일)
      var toDt = $("#TB07090S_toDate").val(); //상환예정일자 (조회 종료일)

      var param = {
        rctmDt: rctmDt.replaceAll("-", ""),
        //paiRdmpDcd  : paiRdmpDcd,
        dealNo: dealNo,
        dprtCd: dprtCd,
        fromDt: fromDt.replaceAll("-", ""),
        toDt: toDt.replaceAll("-", ""),
      };

      inq(param);
    }
  }

  //조회
  function inq(param) {
    $.ajax({
      type: "POST",
      url: "/TB07090S/getDprtDtlsInfo",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(param),
      dataType: "json",
      beforeSend: function () {
        $("#TB07090S_colModel1").pqGrid(
          "option",
          "strNoRows",
          "조회 중입니다..."
        );
        $("#TB07090S_colModel2").pqGrid(
          "option",
          "strNoRows",
          "조회 중입니다..."
        );
        $("#TB07090S_colModel3").pqGrid(
          "option",
          "strNoRows",
          "조회 중입니다..."
        );
      },
      success: function (data) {
        // alert(JSON.stringify(data));

        var rdmpPrarDtlsList = data.rdmpPrarDtlsList;
        var rctmDtlsList = data.rctmDtlsList;
        var dptrDtlsList = data.dprtDtlsList;

        if (
          rdmpPrarDtlsList.length < 1 &&
          rctmDtlsList.length < 1 &&
          dptrDtlsList.length < 1
        ) {
          var option = {};
          option.title = "Warning!";
          option.type = "warning";

          option.text = "조회된 데이터가 없습니다.";
          openPopup(option);
        }

        // setGrid_TB07090S(rdmpPrarDtlsList, "TB07090S_colModel1");
        // setGrid_TB07090S(rctmDtlsList, "TB07090S_colModel2");
        // setGrid_TB07090S(dptrDtlsList, "TB07090S_colModel3");

        var options = [
          {
            gridNm: "TB07090S_colModel1",
            data: rdmpPrarDtlsList,
          },
          {
            gridNm: "TB07090S_colModel2",
            data: rctmDtlsList,
          },
          {
            gridNm: "TB07090S_colModel3",
            data: dptrDtlsList,
          },
        ];

        pqGridSetData(options);
      },
    });

    rctmDtlsRgstDeleteList = [];
    rctmDtlsMappingDeleteList = [];
    selected_rdmpPrarDtl = null;    // 상환예정내역
    selected_dptrRgstDtl = null;    // 입금증등록내역
    TB07090S_rowData = {};          // 입금내역매핑

  }

  /**
   * 입금내역매핑 추가용
   */
  function TB07090S_addRow() {
    // 체크해야할 부분
    // 1. 상환예정내역 선택했는지?
    // 2. 저장된 입금증등록내역 선택했는지?
    // 3. 선택 다했으면 행을 추가해주는데 데이터를 같이 넣어주면 됨
    // 4. 그 뒤 저장을 누르면 됨
    // 6. 집에 가고싶다
    if (selected_rdmpPrarDtl === null) {
      swal.fire({
        icon: "warning"
        , text: "상환예정내역을 선택해주세요."
      })
      return;
    }
    else if (!selected_dptrRgstDtl) {
      swal.fire({
        icon: "warning"
        , text: "입금증등록내역을 선택해주세요."
      })
      return;
    }
    else if (selected_dptrRgstDtl && !selected_dptrRgstDtl.hndDetlDtm) {
      swal.fire({
        icon: "warning"
        , text: "등록된 입금증등록내역을 선택해주세요."
      })
      return;
    }

    // console.log(selected_rdmpPrarDtl.dealNo)
    // console.log(selected_rdmpPrarDtl.mngmBdcd)
    // console.log(selected_dptrRgstDtl.rctmDt)
    // console.log(selected_rdmpPrarDtl.scxDcd)
    // console.log(selected_dptrRgstDtl.dealRctmAmt)
    // console.log(selected_dptrRgstDtl.rgstSeq)

    let row = [];
    let newRow = {};
    const data = $('#TB07090S_colModel3').pqGrid("instance");
    const rowColumnsData = data.colModel;
    const length = rowColumnsData.length;
    for (let i = 0; i < length; i++) {
      const title = rowColumnsData[i].title;
      const labelIndx = rowColumnsData[i].labelIndx;
      const dataIndx = rowColumnsData[i].dataIndx;
      row.push(title);

      switch (dataIndx) {
        case "rctmDt":
          newRow[dataIndx] = selected_dptrRgstDtl.rctmDt;
          break;
        case "rctmSeq":
          newRow[dataIndx] = ""; // 서비스에서 채번
          break;
        case "fndsDvsnCd":
          newRow[dataIndx] = selected_dptrRgstDtl.fndsDvsnCd;
          break;
        case "dealNo":
          newRow[dataIndx] = selected_rdmpPrarDtl.dealNo;
          break;
        case "prdtCd":
          newRow[dataIndx] = selected_rdmpPrarDtl.prdtCd;
          break;
        case "excSn":
          newRow[dataIndx] = selected_rdmpPrarDtl.excSn;
          break;
        case "trSn":
          newRow[dataIndx] = selected_rdmpPrarDtl.trSn;
          break;
        case "rdptObjtDvsnCd":
          newRow[dataIndx] = selected_rdmpPrarDtl.scxDcd;
          break;
        case "excsPymtPrcsDvsnCd":
          newRow[dataIndx] = ""; // 구분코드는 현재 존재하지 않아서 사용하지 않음!
          break;
        case "pmntPrarAmt":
          newRow[dataIndx] = selected_rdmpPrarDtl.pmntPrarAmt;
          break;
        case "dealRctmAmt":
          newRow[dataIndx] = selected_rdmpPrarDtl.pmntPrarAmt;
          break;
        case "reltIsttCd":
          newRow[dataIndx] = selected_dptrRgstDtl.reltIsttCd;
          break;
        case "reltIsttNm":
          newRow[dataIndx] = fnltList.find(bank => bank.fnltCd === selected_dptrRgstDtl.reltIsttCd).fnltNm;
          break;
        case "reltBano":
          newRow[dataIndx] = selected_dptrRgstDtl.reltBano;
          break;
        case "mngmBdcd":
          newRow[dataIndx] = $("#userDprtCd").val();
          break;
        case "dptrNm":
          newRow[dataIndx] = selected_dptrRgstDtl.dptrNm;
          break;
        case "rgstSeq":
          newRow[dataIndx] = selected_dptrRgstDtl.rgstSeq;
          break;
        case "rgstEmpno":
          newRow[dataIndx] = selected_dptrRgstDtl.hndEmpno;
          break;
        case "rgstBdcd":
          newRow[dataIndx] = selected_dptrRgstDtl.rgstBdcd;
          break;
        case "rgstDtm":
          newRow[dataIndx] = selected_dptrRgstDtl.hndDetlDtm;
          break;
      }
    }

    /**
     * 입금내역매핑 불가능 조건
     * 1. 이미 등록된 입금내역일 경우
     * 2. 입금금액이 납부예정금액에 비해 부족한 경우
    */

    // 매핑하려는 상환대상내역 체크
    const paramData = {
      dealNo: selected_rdmpPrarDtl.dealNo
      , prdtCd: selected_rdmpPrarDtl.prdtCd
      , excSn: selected_rdmpPrarDtl.excSn
      , trSn: selected_rdmpPrarDtl.trSn
      , feeSn: selected_rdmpPrarDtl.feeSn
      , rdmpTmrd: selected_rdmpPrarDtl.rdmpTmrd
      , rdptObjtDvsnCd: selected_rdmpPrarDtl.scxDcd
    }

    const rctmDtlsMappingGridData = $('#TB07090S_colModel3').pqGrid('instance').pdata

    const chkRctmDtlsMapping = () => {
      let result = true;
      for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {
        if (
          /* 딜번호! */
          rctmDtlsMappingGridData[i].dealNo === selected_rdmpPrarDtl.dealNo
          /* 종목코드! */
          && rctmDtlsMappingGridData[i].prdtCd === selected_rdmpPrarDtl.prdtCd
          /* 실행일련번호! */
          && Number(rctmDtlsMappingGridData[i].excSn) === Number(selected_rdmpPrarDtl.excSn)
          /* 거래일련번호! */
          && Number(rctmDtlsMappingGridData[i].trSn) === Number(selected_rdmpPrarDtl.trSn)
          /* 수수료일련번호! */
          && Number(rctmDtlsMappingGridData[i].feeSn) === Number(selected_rdmpPrarDtl.feeSn)
          /* 상환회차! */
          && Number(rctmDtlsMappingGridData[i].rdmpTmrd) === Number(selected_rdmpPrarDtl.rdmpTmrd)
          /* 상환형태?구분코드! */
          && rctmDtlsMappingGridData[i].rdptObjtDvsnCd === selected_rdmpPrarDtl.scxDcd
        ) {
          // 화면내 매핑된 정보가 있다면 false
          result = false;
          break;
        }
      }
      return result;
    }

    $.ajax({
      type: "POST",
      url: "/TB07090S/chkRctmDtlsMapping",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        // 이미 입금내역매핑이 있는 경우 (DB체크)
        if (data != 0) {
          swal.fire({
            icon: "warning"
            , text: "이미 매핑된 내역입니다!"
          })
          return;
        }
        // 이미 입금내역매핑이 있는 경우 (화면체크)
        else if (!chkRctmDtlsMapping()) {
          swal.fire({
            icon: "warning"
            , text: "이미 매핑된 내역입니다!"
          })
          return;
        }
        // 납부예정금액이 입금금액보다 커지는 경우 매핑 불가
        else if (Number(selected_dptrRgstDtl.dealRctmAmt) < Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"])) {
          // 스왈파이아 매핑불가능 
          swal.fire({
            icon: "warning"
            , text: "입금금액이 부족합니다!"
          })
          return;
        }
        else {
          // 모든 검사를 마친 친구들은 매핑해준다
          $('#TB07090S_colModel3').pqGrid("addRow", {
            rowData: newRow,
            checkEditable: false,
          });

          // 모든 검사를 마친 친구들은 매핑해준다
          $('#TB07090S_colModel2').pqGrid("instance").updateRow({
            rowIndx: selected_dptrRgstDtl.pq_ri,
            row: {
              pmntPrarAmt: Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"])
            }
          });

        }
      },
    })

  }

  /**
   * 주석달기싫다 행삭제
   * @param {*} colModelSelector 
   * @param {*} rowIndx 
   */
  function TB07090S_pqGridDeleteRow(colModelSelector) {

    let rowIndx;

    if (colModelSelector.attr('id') === 'TB07090S_colModel2') {
      if (colModel2_rowIndx === "" || colModel2_rowIndx === null) {
        swal.fire({
          icon: 'warning'
          , text: "선택하고 지웁시다."
        })
        return;
      }
      else if (selected_dptrRgstDtl.pmntPrarAmt === 0) {
        rowIndx = colModel2_rowIndx
        // 삭제용 리스트 추가
        rctmDtlsRgstDeleteList.push(
          $('#TB07090S_colModel2').pqGrid('instance').pdata[colModel2_rowIndx]
        )
      }
      else if (selected_dptrRgstDtl.rgstSeq === undefined) {
        // 그냥 지우기
        rowIndx = colModel2_rowIndx
      }
      else {
        swal.fire({
          icon: "warning"
          , text: "매핑이 된 내역을 지우고 입금증등록내역을 삭제해주세요!"
        })
        return;
      }
    }
    else if (colModelSelector.attr('id') === 'TB07090S_colModel3') {

      if (colModel3_rowIndx === "" || colModel3_rowIndx === null) {
        swal.fire({
          icon: 'warning'
          , text: "선택하고 지웁시다."
        })
        return;
      }

      rowIndx = colModel3_rowIndx

      let updateIndx;

      const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid('instance').pdata

      for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {
        if (rctmDtlsMappingGridData[i].rctmDt === TB07090S_rowData.rctmDt
          && rctmDtlsMappingGridData[i].rgstSeq === Number(TB07090S_rowData.rgstSeq)
        ) {
          updateIndx = i;
          break;
        }
      }

      // 입금증등록내역 업데이트
      $('#TB07090S_colModel2').pqGrid("instance").updateRow({
        rowIndx: updateIndx,
        row: {
          pmntPrarAmt: Number($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt) - Number($('#TB07090S_colModel3').pqGrid("instance").pdata[rowIndx].pmntPrarAmt)
        }
      });

      // 삭제용 리스트 추가
      rctmDtlsMappingDeleteList.push(
        $('#TB07090S_colModel3').pqGrid('instance').pdata[colModel3_rowIndx]
      )
    }

    colModelSelector.pqGrid("deleteRow", {
      rowIndx: rowIndx,
    });


    if (colModelSelector.attr('id') === 'TB07090S_colModel2') {
      colModel2_rowIndx = null
    } else if (colModelSelector.attr('id') === 'TB07090S_colModel3') {
      colModel3_rowIndx = null
    }

  }

  /**
   * 입금증등록내역 저장
   */
  function saveRctmDtlsRgst() {

    const colModel_rctmDtlsRgst = $('#TB07090S_colModel2').pqGrid('instance').pdata;

    let insertList = [];
    let updateList = [];
    let deleteList = rctmDtlsRgstDeleteList;

    for (let i = 0; i < colModel_rctmDtlsRgst.length; i++) {
      // 추가할 내용
      if (colModel_rctmDtlsRgst[i].pq_cellcls != undefined && !colModel_rctmDtlsRgst[i].hndDetlDtm) {
        insertList.push(colModel_rctmDtlsRgst[i]);
      }
      // 수정할 내용
      else if (colModel_rctmDtlsRgst[i].pq_cellcls != undefined) {
        for (let j = 0; j < deleteList.length; j++) {
          // deleteList와 중복되는 updateList는 뺴준다
          if (deleteList[j] != colModel_rctmDtlsRgst[i]) {
            updateList.push(colModel_rctmDtlsRgst[i]);
          }
        }
      }
    }

    const paramData = {
      insertList: insertList
      , updateList: updateList
      , deleteList: deleteList
    }

    $.ajax({
      type: "POST",
      url: "/TB07090S/rctmDtlsRgst",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          swal.fire({
            icon: "success"
            , text: "저장성공!"
          })
          search_TB07090S();
        }
        else {
          swal.fire({
            icon: "warning"
            , text: "저장실패!"
          })
        }
      },
    });
    rctmDtlsRgstDeleteList = [];
  }

  /**
   * 입금내역매핑 저장
   */
  function saveRctmDtlsMapping() {

    const colModel_rctmDtlsMapping = $('#TB07090S_colModel3').pqGrid('instance').pdata;

    let insertList = [];
    let updateList = [];
    let deleteList = rctmDtlsMappingDeleteList;

    for (let i = 0; i < deleteList.length; i++) {
      deleteList[i].rowIndx
    }

    for (let i = 0; i < colModel_rctmDtlsMapping.length; i++) {
      // 추가할 내용
      if (!colModel_rctmDtlsMapping[i].hndDetlDtm) {
        insertList.push(colModel_rctmDtlsMapping[i]);
      }
      // 수정할 내용
      else if (colModel_rctmDtlsMapping[i].pq_cellcls != undefined) {
        for (let j = 0; j < deleteList.length; j++) {
          if (deleteList[j] != colModel_rctmDtlsMapping[i]) {
            updateList.push(colModel_rctmDtlsMapping[i]);
          }
        }
      }
    }

    const paramData = {
      insertList: insertList
      , updateList: updateList
      , deleteList: deleteList
    }

    $.ajax({
      type: "POST",
      url: "/TB07090S/rctmDtlsMapping",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        if (data > 0) {
          swal.fire({
            icon: "success"
            , text: "저장성공!"
          })
          search_TB07090S();
        }
        else {
          swal.fire({
            icon: "warning"
            , text: "저장실패!"
          })
        }
      },
    });
    rctmDtlsMappingDeleteList = [];
  }

  /**
   * 초기화
   * ㄱㄱㅇ
   */
  function resetAll() {
    resetInputValue($("div[data-menuid='/TB07090S']"));
    $("#TB07090S_rctmDt").val(getToday()); //입금일자
    $("#TB07090S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
    $("#TB07090S_toDate").val(getToday()); //조회종료일
    $("#TB07090S_dprtNm").val($("#userDprtCd").val());
    $("#TB07090S_dprtCd").val($("#userDprtCd").val());
    resetPGgrids("TB07090S");
  }

  /**
   * 태안씨 버전
   * 태안씨 버전
   * 태안씨 버전
   * 태안씨 버전
   * 태안씨 버전
   * 태안씨 버전
   */
  /*
   *  ====================PQGRID변환====================
   */

  // /*
  //  *  PQGRID 줄추가
  //  */
  // function TB07090S_addNewRow(colModelId) {
  //   //console.log(JSON.stringify(selected_rdmpPrarDtl));

  //   var option = {};
  //   option.title = "Error";
  //   option.type = "error";

  //   if (colModelId == "TB07090S_colModel2") {
  //     //입금증등록내역 행 추가

  //     if (!isEmpty(selected_rdmpPrarDtl)) {
  //       if ($("#" + colModelId).pqGrid("option", "dataModel.data").length > 0) {
  //         var isExist = false;

  //         for (
  //           var i = 0;
  //           i < $("#" + colModelId).pqGrid("option", "dataModel.data").length;
  //           i++
  //         ) {
  //           var rowData = $("#" + colModelId).pqGrid("getRowData", {
  //             rowIndx: i,
  //           });

  //           var bfDealNo = rowData.dealNo;
  //           //var bfPrarDt = rowData.prarDt;
  //           var bfRctmAmt = rowData.pmntPrarAmt;

  //           // alert("pmntPrarAmt::: " + pmntPrarAmt);
  //           // alert("pmntPrarAmt:::" + selected_rdmpPrarDtl.pmntPrarAmt);

  //           if (
  //             bfDealNo === selected_rdmpPrarDtl.dealNo &&
  //             Number(bfRctmAmt) === Number(selected_rdmpPrarDtl.pmntPrarAmt)
  //           ) {
  //             option.text = "이미 선택되었던 상환예정내역입니다.";
  //             openPopup(option);
  //             isExist = true;
  //             return false;
  //           }
  //         }

  //         if (!isExist) {
  //           var newRow = {
  //             dealNo: selected_rdmpPrarDtl.dealNo,
  //             //prarDt          : selected_rdmpPrarDtl.prarDt,
  //             mngmBdcd: selected_rdmpPrarDtl.mngmBdcd,
  //             pmntPrarAmt: selected_rdmpPrarDtl.pmntPrarAmt,
  //           };

  //           $("#" + colModelId).pqGrid("addRow", {
  //             rowData: newRow,
  //             checkEditable: false,
  //           });
  //           $("#" + colModelId).pqGrid("refreshDataAndView");
  //         }
  //       } else {
  //         var newRow = {
  //           dealNo: selected_rdmpPrarDtl.dealNo,
  //           //prarDt          : selected_rdmpPrarDtl.prarDt,
  //           mngmBdcd: selected_rdmpPrarDtl.mngmBdcd,
  //           pmntPrarAmt: selected_rdmpPrarDtl.pmntPrarAmt,
  //         };

  //         $("#" + colModelId).pqGrid("addRow", {
  //           rowData: newRow,
  //           checkEditable: false,
  //         });
  //         $("#" + colModelId).pqGrid("refreshDataAndView");
  //       }
  //     } else {
  //       option.text = "상환예정내역을 선택하고 다시 시도해주세요.";
  //       openPopup(option);
  //       return false;
  //     }
  //   } else {
  //     //입금내역매핑 행 추가

  //     if (isEmpty(selected_rdmpPrarDtl)) {
  //       option.text = "상환예정내역을 선택하고 다시 시도해주세요.";
  //       openPopup(option);
  //       return false;
  //     } else if (isEmpty(selected_dptrRgstDtl)) {
  //       option.text = "입금증등록내역을 선택하고 다시 시도해주세요.";
  //       openPopup(option);
  //       return false;
  //     } else if (isEmpty(selected_dptrRgstDtl.rgstSeq)) {
  //       option.text = "입금내역 등록 후 다시 시도해주세요.";
  //       openPopup(option);
  //       return false;
  //     } else if (
  //       selected_rdmpPrarDtl.dealNo != selected_dptrRgstDtl.dealNo ||
  //       selected_rdmpPrarDtl.pmntPrarAmt != selected_dptrRgstDtl.pmntPrarAmt
  //     ) {
  //       option.text = "상환예정내역과 입금증등록내역이 일치하지 않습니다.";
  //       openPopup(option);
  //       return false;
  //     } else {
  //       if ($("#" + colModelId).pqGrid("option", "dataModel.data").length > 0) {
  //         var isExist = false;

  //         for (
  //           var i = 0;
  //           i < $("#" + colModelId).pqGrid("option", "dataModel.data").length;
  //           i++
  //         ) {
  //           var rowData = $("#" + colModelId).pqGrid("getRowData", {
  //             rowIndx: i,
  //           });

  //           var bfDealNo = rowData.dealNo;
  //           //var bfPrarDt = rowData.prarDt;
  //           var bfRctmAmt = rowData.rctmDt;

  //           // alert("pmntPrarAmt::: " + pmntPrarAmt);
  //           // alert("pmntPrarAmt:::" + selected_rdmpPrarDtl.pmntPrarAmt);

  //           if (
  //             bfDealNo === selected_dptrRgstDtl.dealNo &&
  //             Number(bfRctmAmt) === Number(selected_dptrRgstDtl.rctmDt)
  //           ) {
  //             option.text = "이미 선택되었던 입금증등록내역입니다.";
  //             openPopup(option);
  //             isExist = true;
  //             return false;
  //           }
  //         }

  //         if (!isExist) {
  //           var newRow = {
  //             dealNo: selected_dptrRgstDtl.dealNo,
  //             mngmBdcd: selected_dptrRgstDtl.mngmBdcd,
  //             rctmDt: selected_dptrRgstDtl.rctmDt,
  //             rdptObjtDvsnCd: selected_rdmpPrarDtl.scxDcd,
  //             dealRctmAmt: selected_dptrRgstDtl.dealRctmAmt,
  //             rgstSeq: selected_dptrRgstDtl.rgstSeq,
  //           };

  //           $("#" + colModelId).pqGrid("addRow", {
  //             rowData: newRow,
  //             checkEditable: false,
  //           });
  //           $("#" + colModelId).pqGrid("refreshDataAndView");
  //         }
  //       } else {
  //         var newRow = {
  //           dealNo: selected_dptrRgstDtl.dealNo,
  //           mngmBdcd: selected_dptrRgstDtl.mngmBdcd,
  //           rctmDt: selected_dptrRgstDtl.rctmDt,
  //           rdptObjtDvsnCd: selected_rdmpPrarDtl.scxDcd,
  //           dealRctmAmt: selected_dptrRgstDtl.dealRctmAmt,
  //           rgstSeq: selected_dptrRgstDtl.rgstSeq,
  //         };

  //         $("#" + colModelId).pqGrid("addRow", {
  //           rowData: newRow,
  //           checkEditable: false,
  //         });
  //         $("#" + colModelId).pqGrid("refreshDataAndView");
  //       }
  //     }
  //   }
  // }

  // /*
  //  *  PQGRID 줄삭제
  //  */
  // function TB07090S_deleteRow(colModelId, yourFunction) {
  //   let getLength =
  //     colModelIdSelector(colModelId).pqGrid("instance").pdata.length;
  //   let colModel = colModelIdSelector(colModelId);

  //   if (
  //     TB07090S_rowData != TB07090S_dummyData &&
  //     TB07090S_pqGridLength < getLength &&
  //     !TB07090S_rowData.excSn
  //   ) {
  //     colModel.pqGrid("deleteRow", {
  //       rowData: TB07090S_rowData,
  //       checkEditable: false,
  //     });
  //     TB07090S_rowData = TB07090S_dummyData;
  //   } else if (
  //     TB07090S_rowData === TB07090S_dummyData &&
  //     TB07090S_pqGridLength < getLength
  //   ) {
  //     colModel.pqGrid("deleteRow", {
  //       rowData: TB07090S_rowData,
  //       checkEditable: false,
  //     });
  //     TB07090S_rowData = TB07090S_dummyData;
  //   } else if (
  //     TB07090S_rowData === TB07090S_dummyData &&
  //     TB07090S_pqGridLength === getLength
  //   ) {
  //     if (TB07090S_pqGridLength === 0) {
  //       Swal.fire({
  //         icon: "warning",
  //         text: "삭제할 데이터가 없습니다",
  //         confirmButtonText: "확인",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "warning",
  //         text: "삭제하실 행을 선택해주세요",
  //         confirmButtonText: "확인",
  //       });
  //     }
  //   } else if (TB07090S_rowData != TB07090S_dummyData) {
  //     Swal.fire({
  //       icon: "warning",
  //       text: "정말 삭제하시겠습니까?",
  //       confirmButtonText: "확인",
  //       denyButtonText: "아니오",
  //       showDenyButton: true,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         yourFunction();
  //         TB07090S_rowData = TB07090S_dummyData;
  //         return;
  //       } else if (result.isDenied) {
  //         TB07090S_rowData = TB07090S_dummyData;
  //         return;
  //       }
  //     });
  //   }
  // }

  // /*
  //  *  PQGRID 초기화
  //  */
  // function TB07090S_resetPqGrid(colModelId) {
  //   colModelIdSelector(colModelId).pqGrid("option", "dataModel.data", []);
  //   colModelIdSelector(colModelId).pqGrid("refreshDataAndView");
  // }

  // /*
  //  *  PQGRID 아이디 선택
  //  */
  // const colModelIdSelector = (colModelId) => {
  //   return $(`#${colModelId}`);
  // };
  // /*
  //  *  =====================PQGRID=====================
  //  */

  // function search_TB07090S() {
  //   var rctmDt = $("#TB07090S_rctmDt").val(); //입금일자
  //   //var fromDt      = $('#TB07090S_fromDate').val();            //상환예정일자 (조회 시작일)
  //   //var toDt        = $('#TB07090S_toDate').val();              //상환예정일자 (조회 종료일)

  //   var option = {};
  //   option.title = "Error";
  //   option.type = "error";

  //   // if(isEmpty(rctmDt)){
  //   //     option.text = "입금일자를 입력하고 다시 시도해주세요.";
  //   // 	openPopup(option);
  //   // 	return false;

  //   // }else if(isEmpty(fromDt) || isEmpty(toDt) ){
  //   //     option.text = "상환예정일자를 입력하고 다시 시도해주세요.";
  //   // 	openPopup(option);
  //   // 	return false;

  //   // }else{
  //   businessFunction(rctmDt);
  //   //}

  //   function businessFunction(rctmDt) {
  //     //var paiRdmpDcd  = $('#TB07090S_E020').val();             //상환구분코드
  //     var dealNo = $("#TB07090S_ibDealNo").val(); //딜번호
  //     var dprtCd = $("#TB07090S_dprtCd").val(); //관리부서코드
  //     var fromDt = $("#TB07090S_fromDate").val(); //상환예정일자 (조회 시작일)
  //     var toDt = $("#TB07090S_toDate").val(); //상환예정일자 (조회 종료일)

  //     var param = {
  //       rctmDt: rctmDt.replaceAll("-", ""),
  //       //paiRdmpDcd  : paiRdmpDcd,
  //       dealNo: dealNo,
  //       dprtCd: dprtCd,
  //       fromDt: fromDt.replaceAll("-", ""),
  //       toDt: toDt.replaceAll("-", ""),
  //     };

  //     inq(param);
  //   }
  // }

  // //조회
  // function inq(param) {
  //   $.ajax({
  //     type: "POST",
  //     url: "/TB07090S/getDprtDtlsInfo",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify(param),
  //     dataType: "json",
  //     beforeSend: function () {
  //       $("#TB07090S_colModel1").pqGrid(
  //         "option",
  //         "strNoRows",
  //         "조회 중입니다..."
  //       );
  //       $("#TB07090S_colModel2").pqGrid(
  //         "option",
  //         "strNoRows",
  //         "조회 중입니다..."
  //       );
  //       $("#TB07090S_colModel3").pqGrid(
  //         "option",
  //         "strNoRows",
  //         "조회 중입니다..."
  //       );
  //     },
  //     success: function (data) {
  //       // alert(JSON.stringify(data));

  //       var rdmpPrarDtlsList = data.rdmpPrarDtlsList;
  //       var rctmDtlsList = data.rctmDtlsList;
  //       var dptrDtlsList = data.dprtDtlsList;

  //       if (
  //         rdmpPrarDtlsList.length < 1 &&
  //         rctmDtlsList.length < 1 &&
  //         dptrDtlsList.length < 1
  //       ) {
  //         var option = {};
  //         option.title = "Error";
  //         option.type = "error";

  //         option.text = "조회된 데이터가 없습니다.";
  //         openPopup(option);
  //       }

  //       // setGrid_TB07090S(rdmpPrarDtlsList, "TB07090S_colModel1");
  //       // setGrid_TB07090S(rctmDtlsList, "TB07090S_colModel2");
  //       // setGrid_TB07090S(dptrDtlsList, "TB07090S_colModel3");

  //       var options = [
  //         {
  //           gridNm: "TB07090S_colModel1",
  //           data: rdmpPrarDtlsList,
  //         },
  //         {
  //           gridNm: "TB07090S_colModel2",
  //           data: rctmDtlsList,
  //         },
  //         {
  //           gridNm: "TB07090S_colModel3",
  //           data: dptrDtlsList,
  //         },
  //       ];

  //       pqGridSetData(options);
  //     },
  //   });
  // }

  // function setGrid_TB07090S(list, gridNm) {
  //   var data = list;

  //   if (data.length < 1) {
  //     $("#" + gridNm).pqGrid(
  //       "option",
  //       "strNoRows",
  //       "조회된 데이터가 없습니다."
  //     );
  //     $("#" + gridNm).pqGrid("setData", []);
  //   } else {
  //     $("#" + gridNm).pqGrid("setData", data);
  //   }
  // }

  // //입금내역등록
  // function rctmDtlsRgst() {
  //   var gridLgth = $("#TB07090S_colModel2").pqGrid(
  //     "option",
  //     "dataModel.data"
  //   ).length;
  //   var paramCheck = false;

  //   var paramList = [];

  //   for (var i = 0; i < gridLgth; i++) {
  //     var rowData = $("#TB07090S_colModel2").pqGrid("getRowData", {
  //       rowIndx: i,
  //     });

  //     if (isEmpty(rowData.rgstSeq)) {
  //       var dealNo = rowData.dealNo; //딜번호
  //       //var prarDt = rowData.prarDt;                //상환예정일
  //       var rctmDt = rowData.rctmDt; //입금일자
  //       //var erlmSeq = i;                           //등록순번
  //       var mngmBdcd = rowData.mngmBdcd; //관리부서코드
  //       var fndsDvsnCd = rowData.fndsDvsnCd; //자금구분코드
  //       var pmntPrarAmt = rowData.pmntPrarAmt; //입금금액(납부예정금액)
  //       var aplcAmt = rowData.dealRctmAmt; //적용금액(실제입금금액)
  //       var fnltCd = rowData.reltIsttCd; //기관(은행)
  //       var bano = rowData.reltBano; //계좌번호
  //       var dptrNm = rowData.dptrNm; //입금자명
  //       var dprtCd = loginUsrDprtCd; //등록부서(로그인 사용자 부서)
  //       var empNm = loginUsrId; //등록자(로그인 사용자 ID)
  //       var rgstDtm = getCurrentDateTime(); //등록일시 (현재시간)

  //       //alert(aplcAmt);
  //       var reltIsttNm = fnltList.find((opt) => opt.fnltCd == fnltCd).fnltNm;

  //       //alert(JSON.stringify(reltIsttNm));

  //       var formattedAplcAmt = aplcAmt.includes(",")
  //         ? aplcAmt.replaceAll(",", "")
  //         : aplcAmt;

  //       var dealExcsPymtAmt = 0; //초과납입금액

  //       if (pmntPrarAmt < formattedAplcAmt) {
  //         dealExcsPymtAmt = formattedAplcAmt - pmntPrarAmt;
  //       }

  //       var paramData = {
  //         dealNo: dealNo, //딜번호
  //         rctmDt: rctmDt, //입금일자
  //         mngmBdcd: mngmBdcd, //관리부점코드
  //         fndsDvsnCd: fndsDvsnCd, //자금구분코드
  //         pmntPrarAmt: pmntPrarAmt, //납부예정금액
  //         dealRctmAmt: formattedAplcAmt, //입금금액
  //         dealExcsPymtAmt: dealExcsPymtAmt, //초과납입금액
  //         reltIsttCd: fnltCd, //관련기관코드
  //         reltIsttNm: reltIsttNm, //관련기관명
  //         reltBano: bano, //관련은행계좌번호
  //         dptrNm: dptrNm, //입금자명
  //         rgstEmpno: empNm, //등록사원번호
  //         rgstBdcd: dprtCd, //등록부점코드
  //         rgstDtm: rgstDtm, //등록일시
  //       };

  //       paramList.push(paramData);
  //     }
  //   }

  //   $.ajax({
  //     type: "POST",
  //     url: "/TB07090S/rctmDtlsRgst",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify(paramList),
  //     dataType: "json",
  //     success: function (data) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: "입금내역등록이 완료되었습니다.",
  //         confirmButtonText: "확인",
  //       });

  //       var rgstSeq = data;
  //       var rgstDt = rgstDtm.split(" ")[0].replaceAll("-", "");

  //       reInq(rgstDt);
  //     },
  //   });
  // }

  // //매핑내역등록
  // function rctmDtlsMapping() {
  //   var gridLgth = $("#TB07090S_colModel3").pqGrid(
  //     "option",
  //     "dataModel.data"
  //   ).length;

  //   var paramList = [];

  //   for (var i = 0; i < gridLgth; i++) {
  //     var rowData = $("#TB07090S_colModel3").pqGrid("getRowData", {
  //       rowIndx: i,
  //     });

  //     var dealNo = rowData.dealNo; //딜번호
  //     var mngmBdcd = rowData.mngmBdcd; //관리부서
  //     var rctmDt = rowData.rctmDt; //입금일자
  //     var rdptObjtDvsnCd = rowData.rdptObjtDvsnCd; //상환대상구분
  //     var dealRctmAmt = rowData.dealRctmAmt; //입금금액
  //     var excsPymtPrcsText = rowData.excsPymtPrcsText; //초과납입처리내용
  //     var rgstSeq = rowData.rgstSeq; //등록순번

  //     var paramData = {
  //       dealNo: dealNo,
  //       rctmDt: rctmDt,
  //       mngmBdcd: mngmBdcd,
  //       rdptObjtDvsnCd: rdptObjtDvsnCd,
  //       dealRctmAmt: dealRctmAmt,
  //       excsPymtPrcsText: excsPymtPrcsText,
  //       rgstSeq: rgstSeq,
  //     };

  //     paramList.push(paramData);
  //   }

  //   //alert(JSON.stringify(paramList));
  //   $.ajax({
  //     type: "POST",
  //     url: "/TB07090S/rctmDtlsMapping",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify(paramList),
  //     dataType: "json",
  //     success: function (data) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: "입금내역매핑이 완료되었습니다.",
  //         confirmButtonText: "확인",
  //       });

  //       // // var rgstSeq = data;
  //       // var rgstDt = rgstDtm.split(" ")[0].replaceAll('-', '');

  //       // reInq(rgstDt);
  //     },
  //   });
  // }

  // //재조회
  // function reInq(rgstDt) {
  //   var dealNo = $("#TB07090S_ibDealNo").val(); //딜번호
  //   var dprtCd = $("#TB07090S_dprtCd").val(); //관리부서코드
  //   var fromDt = $("#TB07090S_fromDate").val(); //상환예정일자 (조회 시작일)
  //   var toDt = $("#TB07090S_toDate").val(); //상환예정일자 (조회 종료일)

  //   var param = {
  //     rgstDt: rgstDt,
  //     dealNo: dealNo,
  //     dprtCd: dprtCd,
  //     fromDt: fromDt.replaceAll("-", ""),
  //     toDt: toDt.replaceAll("-", ""),
  //   };

  //   inq(param);
  // }

  // //현재 일시 구하기
  // function getCurrentDateTime() {
  //   var currentDate = new Date();

  //   var year = currentDate.getFullYear();
  //   var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   var day = String(currentDate.getDate()).padStart(2, "0");

  //   var hours = String(currentDate.getHours()).padStart(2, "0");
  //   var minutes = String(currentDate.getMinutes()).padStart(2, "0");
  //   var seconds = String(currentDate.getSeconds()).padStart(2, "0");

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // }

  function getDealInfoFromWF() {

    if (sessionStorage.getItem("isFromWF")) {
      console.log("WF세션 있음");
      var dealNo = sessionStorage.getItem("wfDealNo");
      var dealNm = sessionStorage.getItem("wfDealNm");
      $("#TB07090S_ibDealNm").val(dealNo);
      $("#TB07090S_ibDealNm").val(dealNm);
      search_TB07090S();
    } else {
      console.log("WF세션 비었음");
    }
    sessionStorage.clear();
  }

  return {
    // 기존버전
    // search_TB07090S: search_TB07090S,
    // TB07090S_addNewRow: TB07090S_addNewRow,
    // TB07090S_deleteRow: TB07090S_deleteRow,
    // rctmDtlsRgst: rctmDtlsRgst,
    // rctmDtlsMapping: rctmDtlsMapping,

    /**
     * 대충만듬ㄷㅈㄴㄻㄴㅇㄻㄴㅇㄿㅁㄴㅇㅍ
     * 김건우 2024-12-19
     */
    search_TB07090S: search_TB07090S,
    TB07090S_pqGridDeleteRow: TB07090S_pqGridDeleteRow,
    TB07090S_addRow: TB07090S_addRow,
    resetAll: resetAll, // 초기화
    saveRctmDtlsRgst: saveRctmDtlsRgst,
    saveRctmDtlsMapping: saveRctmDtlsMapping,
    colModel2_rowIndx: colModel2_rowIndx,
    colModel3_rowIndx: colModel3_rowIndx,
    getDealInfoFromWF: getDealInfoFromWF,
  };
})();
