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
    $("#TB07090S_rctmDt").val(getToday()); //입금일자
    $("#TB07090S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
    $("#TB07090S_toDate").val(getToday()); //조회종료일

    loadUserAuth(); //로그인유저정보
    selectBoxSet_TB07090S();
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
        title: "deal번호",
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
        dataType: "string",
        dataIndx: "pmntPrarAmt",
        halign: "center",
        align: "right",
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
        format: "yy-mm-dd",
        cls: "pq-calendar pq-side-icon",
        editable: false,
        render: function (ui) {
          return (
            `<button class="gw-custom-datepicker"><i class="fa fa-calendar"></i></button>`
          );
        },
      },
      {
        title: "등록순번",
        editable: false,
        dataType: "string",
        dataIndx: "rgstSeq",
        halign: "center",
        align: "center",
        width: "80",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리부서",
        editable: false,
        dataType: "string",
        dataIndx: "mngmBdcd",
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
        },
        render: function (ui) {
          var options = fndsDcdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "납부예정금액",
        editable: false,
        dataType: "string",
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
        render: function (ui) {
          var cellData = ui.cellData;
          if (cellData == null || cellData == "") {
            cellData = 0;
          }
          var value = "";

          if (String(cellData).includes(",")) {
            value = parseInt(cellData.replaceAll(",", ""), 10);
          } else {
            value = parseInt(cellData, 10);
          }

          var formattedValue = value.toLocaleString("ko-KR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });

          return formattedValue;
        },
      },
      {
        title: "입금금액",
        dataType: "string",
        dataIndx: "dealRctmAmt",
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
        render: function (ui) {
          var cellData = ui.cellData;
          if (cellData == null || cellData == "") {
            cellData = 0;
          }
          var value = "";

          if (String(cellData).includes(",")) {
            value = parseInt(cellData.replaceAll(",", ""), 10);
          } else {
            value = parseInt(cellData, 10);
          }

          var formattedValue = value.toLocaleString("ko-KR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });

          return formattedValue;
        },
      },
      {
        title: "거래기관",
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
      },
      {
        title: "등록자",
        editable: false,
        dataType: "string",
        dataIndx: "rgstEmpno",
        halign: "center",
        align: "center",
        width: "165",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "등록일시",
        editable: false,
        dataType: "string",
        dataIndx: "rgstDtm",
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
        title: "deal번호",
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
        dataType: "string",
        dataIndx: "dealRctmAmt",
        editable: true,
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "초과납입처리내용",
        editable: true,
        dataType: "string",
        dataIndx: "excsPymtPrcsText",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
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
        rowClick: function (event, ui) {
          // if (TB07090S_rowData === ui.rowData) {
          //     TB07090S_rowData = TB07090S_dummyData;
          // } else {
          //     TB07090S_rowData = ui.rowData;
          // }
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
      },
    ];
    setPqGrid(pqGridObjs);

    // var obj1 = {

    //     height: 200,
    //     maxHeight: 200,
    //     showTitle: false,
    //     showToolbar: false,
    //     collapsible: false,
    //     wrap: false,
    //     hwrap: false,
    //     numberCell: { show: false },
    //     editable: true,
    //     //toolbar: toolbar,
    //     scrollModel: { autoFit: true },
    //     colModel: col1,
    //     strNoRows: '조회된 데이터가 없습니다.',
    //     cellClick: function (event, ui) {
    //         //             // if (TB07090S_rowData === ui.rowData) {
    //         //             //     TB07090S_rowData = TB07090S_dummyData;
    //         //             // } else {
    //         //             //     TB07090S_rowData = ui.rowData;
    //         //             // }
    //         //         }
    //     },
    //     selectionModel: { type: 'row' }

    // }

    // var obj2 = {

    //     height: 200,
    //     maxHeight: 200,
    //     showTitle: false,
    //     showToolbar: false,
    //     collapsible: false,
    //     wrap: false,
    //     hwrap: false,
    //     numberCell: { show: false },
    //     editable: true,
    //     //toolbar: toolbar,
    //     dataModel: { data: [] },
    //     scrollModel: { autoFit: true },
    //     colModel: col2,
    //     strNoRows: '조회된 데이터가 없습니다.',
    //     cellClick: function (event, ui) {
    //         //             // if (TB07090S_rowData === ui.rowData) {
    //         //             //     TB07090S_rowData = TB07090S_dummyData;
    //         //             // } else {
    //         //             //     TB07090S_rowData = ui.rowData;
    //         //             // }
    //         //         }
    //     },
    //     selectionModel: { type: 'row' }

    // }

    // var obj3 = {

    //     height: 200,
    //     maxHeight: 200,
    //     showTitle: false,
    //     showToolbar: false,
    //     collapsible: false,
    //     wrap: false,
    //     hwrap: false,
    //     numberCell: { show: false },
    //     editable: true,
    //     //toolbar: toolbar,
    //     scrollModel: { autoFit: true },
    //     colModel: col3,
    //     strNoRows: '조회된 데이터가 없습니다.',
    //     cellClick: function (event, ui) {
    //         //             // if (TB07090S_rowData === ui.rowData) {
    //         //             //     TB07090S_rowData = TB07090S_dummyData;
    //         //             // } else {
    //         //             //     TB07090S_rowData = ui.rowData;
    //         //             // }
    //         //         }
    //     },
    //     selectionModel: { type: 'row' }

    // }

    //  $("#TB07090S_colModel1").pqGrid(obj1);
    // $("#TB07090S_colModel2").pqGrid(obj2);
    // $("#TB07090S_colModel3").pqGrid(obj3);
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

    // if(isEmpty(rctmDt)){
    //     option.text = "입금일자를 입력하고 다시 시도해주세요.";
    // 	openPopup(option);
    // 	return false;

    // }else if(isEmpty(fromDt) || isEmpty(toDt) ){
    //     option.text = "상환예정일자를 입력하고 다시 시도해주세요.";
    // 	openPopup(option);
    // 	return false;

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
          option.title = "Error";
          option.type = "error";

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
    if (selected_dptrRgstDtl === null || selected_dptrRgstDtl.dealNo) {
      swal.fire({
        icon: "warning"
        , text: "딜번호가 매핑되지 않은 입금증등록내역을 선택해주세요."
      })
      return;
    }
    if(!selected_dptrRgstDtl.rgstDtm){
      swal.fire({
        icon: "warning"
        , text: "등록된 입금증등록내역을 선택해주세요."
      })
      return;
    }

    console.log(selected_rdmpPrarDtl.dealNo)
    console.log(selected_rdmpPrarDtl.mngmBdcd)
    console.log(selected_dptrRgstDtl.rctmDt)
    console.log(selected_rdmpPrarDtl.scxDcd)
    console.log(selected_dptrRgstDtl.dealRctmAmt)
    console.log(selected_dptrRgstDtl.rgstSeq)

    let newRow = {
      dealNo: selected_rdmpPrarDtl.dealNo,           // 거래 번호
      mngmBdcd: selected_rdmpPrarDtl.mngmBdcd,       // 관리 부서 코드
      rctmDt: selected_dptrRgstDtl.rctmDt,           // 접수 날짜 (YYYYMMDD 형식 유지)
      rdptObjtDvsnCd: selected_rdmpPrarDtl.scxDcd,   // 환급 대상 구분 코드
      dealRctmAmt: selected_dptrRgstDtl.dealRctmAmt, // 거래 접수 금액 (숫자 형식 유지)
      excsPymtPrcsText: "",                          // 초과 지급 처리 텍스트 (빈 값)
      rgstSeq: selected_dptrRgstDtl.rgstSeq          // 등록 순번
    }

    $('#TB07090S_colModel3').pqGrid("addRow", {
      rowData: newRow
    });
  }

  /**
   * 주석달기싫다 행삭제
   * @param {*} colModelSelector 
   * @param {*} rowIndx 
   */
  function TB07090S_pqGridDeleteRow(colModelSelector) {

    let rowIndx;
   
    if (colModelSelector.attr('id') === 'TB07090S_colModel2') {
      rowIndx = colModel2_rowIndx
    } else if (colModelSelector.attr('id') === 'TB07090S_colModel3') {
      rowIndx = colModel3_rowIndx
    }

    console.log(rowIndx);

    if (rowIndx === null || rowIndx === undefined) {
      swal.fire({
        icon: 'warning'
        , text: "선택하고 지웁시다."
      })
      return;
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
    colModel2_rowIndx: colModel2_rowIndx,
    colModel3_rowIndx: colModel3_rowIndx,
  };
})();
