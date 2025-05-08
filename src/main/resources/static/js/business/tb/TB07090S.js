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
      {
        title: "납부예정금액",
        dataType: "integer",
        format: "#,###",
        dataIndx: "pmntPrarAmt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환회차",
        dataIndx: "rdmpTmrd",
        hidden: true
      },
      {
        title: "수수료일련번호",
        dataIndx: "feeSn",
        hidden: true
      },
      {
        title: "실행일련번호",
        dataIndx: "excSn",
        hidden: true
      },
      {
        title: "실행일련번호",
        dataIndx: "trSn",
        hidden: true
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
        title: "삭제",
        dataType: "checkbox",
        dataIndx: "delYn",
        align: "center",
        minWidth: 36,
        maxWidth: 36,
        type: "checkBoxSelection",
        editable: true,
        editor: false,
        filter: { crules: [{ condition: "range" }] },
        cb: {
          all: true,
          header: true,
          check: "Y",
          uncheck: "N",
        },
      },
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
        title: "삭제",
        dataType: "checkbox",
        dataIndx: "delYn",
        align: "center",
        minWidth: 36,
        maxWidth: 36,
        type: "checkBoxSelection",
        editable: true,
        editor: false,
        filter: { crules: [{ condition: "range" }] },
        cb: {
          all: true,
          header: true,
          check: "Y",
          uncheck: "N",
        },
      },
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
        dataIndx: "rdmpTmrd",   // 상환회차
        hidden: true
      },
      {
        dataIndx: "feeSn",    // 수수료일련번호
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
          selected_rdmpPrarDtl = ui.rowData;
          pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel1");
        },
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

          // 클릭시 조회
          if (ui.column.dataIndx === "delYn") {

          }
          else {
            colModel2_rowIndx = ui.rowIndx;
            selected_dptrRgstDtl = ui.rowData;
            pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel2");
          }
        },
        /**
         * 납부예정금액이 입금금액보다 크면 안됨.
         * 1. 알럿 띄우기
         * 2. 수정 전의 입금금액으로 pqGrid값 수정 
         */
        cellSave: function (evt, ui) {
          if (ui.dataIndx === "dealRctmAmt") {
            // 입금금액 설정 validation
            if (ui.rowData.pmntPrarAmt > ui.newVal) {
              Swal.fire({
                icon: 'warning'
                , title: 'Warning!'
                , text: '입금금액을 납부예정금액보다 낮게 설정하실 수 없습니다!'
              })
              $('#TB07090S_colModel2').pqGrid('instance').pdata[ui.rowIndx].dealRctmAmt = ui.oldVal;
              $('#TB07090S_colModel2').pqGrid('instance').refresh();
            }
          }
        }
      },
      {
        height: 200,
        maxHeight: 200,
        id: "TB07090S_colModel3",
        colModel: col3,
        scrollModel: { autoFit: true },
        editable: true,
        cellClick: function (event, ui) {
          if (ui.column.dataIndx === "delYn") {

          }
          else {
            pqGridSelectHandler(ui.rowIndx, "TB07090S_colModel3");
          }
        },

        cellSave: function (evt, ui) {
          if (ui.dataIndx === "dealRctmAmt") {
            // pqgrid값을 바꿨을때 입금증등록내역에 납부예정금액이 얼마가 되는지 보여주기
            const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid("instance").pdata;

            let updateIndx;

            // PK값인 입금일자, 등록순번을 체크.
            for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {
              if (rctmDtlsMappingGridData[i].rctmDt === ui.rowData.rctmDt
                && rctmDtlsMappingGridData[i].rgstSeq === Number(ui.rowData.rgstSeq)
              ) {
                updateIndx = i;
                break;
              }
            }

            // 수정 전의 납부예정금액 저장
            let prevPrarAmt = $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt;

            // 납부예정금액 = 납부예정금액 - 
            console.log("ui.oldVal :: ", ui.oldVal);
            console.log("ui.newVal :: ", ui.newVal);

            $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt = Number($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt) - Number(ui.oldVal) + Number(ui.newVal);

            // 납부예정금액이 입금금액보다 크면 안됨
            if ($('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt > $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].dealRctmAmt) {
              $('#TB07090S_colModel2').pqGrid("instance").pdata[updateIndx].pmntPrarAmt = prevPrarAmt;
              Swal.fire({
                icon: "warning"
                , title: "Warning!"
                , text: "납부예정금액은 입금금액보다 적어야합니다!"
              })
              $('#TB07090S_colModel3').pqGrid('instance').pdata[ui.rowIndx].dealRctmAmt = ui.oldVal
              $('#TB07090S_colModel3').pqGrid("instance").refresh();
            }
            else {
              $('#TB07090S_colModel2').pqGrid("instance").refresh();
            }

          }
        }
        // // 날짜선택 테스트 시작
        // editorBegin: function (event, ui) {

        //   if (ui.column.dataIndx === 'isuDt') {

        //     editorData = $(ui.$editor).val()

        //     $(ui.$editor).datepicker({
        //       todayBtn: "linked",
        //       autoclose: true,
        //       format: "yyyy-mm-dd",
        //       keyboardNavigation: false,
        //       forceParse: false,
        //       calendarWeeks: false,
        //       language: "ko",
        //     }).on("show", function (e) {
        //       isDatePickerOpen = true;
        //     }).on("hide", function (e) {
        //       isDatePickerOpen = false;
        //       $("#TB07200S_pblHis").pqGrid("instance").refresh();
        //     })

        //     $(ui.$editor).on('focus', function () {
        //       $(".datepicker").find('td').on('pointerdown', function () {
        //         let date = new Date(Number($(this).attr('data-date')))
        //         editorData = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
        //       });
        //     })

        //     $(ui.$editor).on('input', function () {
        //       editorData = $(this).val()
        //     })

        //     $(ui.$editor).inputmask('99999999');
        //   }
        //   // else if ( ui.column.dataIndx === 'expDt' ) {
        //   //     console.log(ui);
        //   // }
        // },
        // editorEnd: function (event, ui) {
        //   $("#TB07200S_pblHis").pqGrid("instance").pdata[ui.rowIndx].isuDt = editorData
        //   $("#TB07200S_pblHis").pqGrid("instance").refresh();
        //   if (isDatePickerOpen) {
        //     return false;
        //   }
        //   return true;
        // },
        // // 날짜선택 테스트 끝
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

        console.log(rdmpPrarDtlsList, "상환예정내역");
        console.log(rctmDtlsList, "입금내역");
        console.log(dptrDtlsList, "입금증매핑내역");
        

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
   * 행추가하기 전에도 중복체크해야됨
   */
  function TB07090S_addRow() {

    console.log($('#TB07090S_colModel3').pqGrid('instance').pdata);

    // 체크해야할 부분
    // 1. 상환예정내역 선택했는지?
    // 2. 저장된 입금증등록내역 선택했는지?
    // 3. 선택 다했으면 행을 추가해주는데 데이터를 같이 넣어주면 됨
    // 4. 그 뒤 저장을 누르면 됨
    // 6. 집에 가고싶다
    if (!selected_rdmpPrarDtl) {
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
        , title: "Warning!"
        , text: "등록된 입금증등록내역을 선택해주세요."
      })
      return;
    }

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
        case "feeSn":
          newRow[dataIndx] = selected_rdmpPrarDtl.feeSn;
          break;
        case "rdptObjtDvsnCd":  // 일정구분코드
          newRow[dataIndx] = selected_rdmpPrarDtl.scxDcd;
          break;
        // 상환회차
        case "rdmpTmrd":
          newRow[dataIndx] = selected_rdmpPrarDtl.rdmpTmrd;
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

    // 이미 입금내역매핑이 있는 경우 (화면체크)
    console.log("화면체크시작")
    console.log("colModel3 뭘 받아오지?? :: ", rctmDtlsMappingGridData);
    
    
    
    
    let result = false;

    for (let i = 0; i < rctmDtlsMappingGridData.length; i++) {

      // // 딜번호
      // console.log("colmodel3 딜번호 : ", rctmDtlsMappingGridData[i].dealNo);
      // console.log("colmodel1 딜번호 : ", selected_rdmpPrarDtl.dealNo);

      // // 종목코드
      // console.log("colmodel3 종목코드 : ", rctmDtlsMappingGridData[i].prdtCd);
      // console.log("colmodel1 종목코드 : ", selected_rdmpPrarDtl.prdtCd);

      // // 실행일련번호
      // console.log("colmodel3 실행일련번호 : ", rctmDtlsMappingGridData[i].excSn);
      // console.log("colmodel1 실행일련번호 : ", selected_rdmpPrarDtl.excSn);

      // 일정구분코드
      console.log("colmodel3 일정구분코드 : ", rctmDtlsMappingGridData[i].rdptObjtDvsnCd);
      console.log("colmodel1 일정구분코드 : ", selected_rdmpPrarDtl.scxDcd);

      // 상환회차
      console.log("colmodel3 상환회차 : ", rctmDtlsMappingGridData[i].rdmpTmrd);
      console.log("colmodel1 상환회차 : ", selected_rdmpPrarDtl.rdmpTmrd);

      // // 거래일련번호
      // console.log("colmodel3 거래일련번호 : ", rctmDtlsMappingGridData[i].trSn);
      // console.log("colmodel1 거래일련번호 : ", selected_rdmpPrarDtl.trSn);

      // 수수료일련번호
      console.log("colmodel3 수수료일련번호 : ", rctmDtlsMappingGridData[i].feeSn);
      console.log("colmodel1 수수료일련번호 : ", selected_rdmpPrarDtl.feeSn);


      if (
        /* 딜번호! */
        rctmDtlsMappingGridData[i].dealNo == selected_rdmpPrarDtl.dealNo
        /* 종목코드! */
        && rctmDtlsMappingGridData[i].prdtCd == selected_rdmpPrarDtl.prdtCd
        /* 실행일련번호! */
        && Number(rctmDtlsMappingGridData[i].excSn) == Number(selected_rdmpPrarDtl.excSn)
        /* 일정구분코드! */
        && rctmDtlsMappingGridData[i].rdptObjtDvsnCd == selected_rdmpPrarDtl.scxDcd
        /* 상환회차! */
        && Number(rctmDtlsMappingGridData[i].rdmpTmrd) == Number(selected_rdmpPrarDtl.rdmpTmrd)
        /* 거래일련번호! */
        && Number(rctmDtlsMappingGridData[i].trSn) == Number(selected_rdmpPrarDtl.trSn)
        /* 수수료일련번호! */
        && Number(rctmDtlsMappingGridData[i].feeSn) == Number(selected_rdmpPrarDtl.feeSn)
      ) {
        console.log("??");

        // 화면내 매핑된 정보가 있다면 false
        result = true;
        break;
      }
    }

    if (result) {
      swal.fire({
        icon: "warning"
        , title: "Warning!"
        , text: "이미 매핑된 내역입니다!"
      })
      return;
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
            , title: "Warning!"
            , text: "이미 매핑된 내역입니다!"
          })
          return;
        }
        // 납부예정금액이 입금금액보다 커지는 경우 매핑 불가
        else if (Number(selected_dptrRgstDtl.dealRctmAmt) < Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"])) {
          // 스왈파이아 매핑불가능
          swal.fire({
            icon: "warning"
            , title: "Warning!"
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
          $('#TB07090S_colModel2').pqGrid("instance").pdata[selected_dptrRgstDtl.pq_ri].pmntPrarAmt = Number(selected_dptrRgstDtl.pmntPrarAmt) + Number(newRow["pmntPrarAmt"]);
          $('#TB07090S_colModel2').pqGrid("instance").refresh();

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

      let gridData = colModelSelector.pqGrid('instance').pdata;

      let cnt = 0;

      for (let i = gridData.length - 1; i >= 0; i--) {
        if (gridData[i].delYn === "Y") {
          if (gridData[i].pmntPrarAmt != 0 && gridData[i].pmntPrarAmt != undefined) {
            // 납부예정금액이 있는 경우는 삭제 안함
            cnt += 1;
          }
          else if (!gridData[i].rgstSeq) {
            // 저장되지 않은 내용은 그리드에서만 삭제
            colModelSelector.pqGrid("deleteRow", { rowIndx: i });
          }
          else {
            // 삭제용 리스트 추가
            rctmDtlsRgstDeleteList.push(
              colModelSelector.pqGrid('instance').pdata[i]
            )
            // 행에서 삭제
            colModelSelector.pqGrid("deleteRow", { rowIndx: i });
          }
        }
      }

      if (cnt > 0) {
        Swal.fire({
          icon: "warning"
          , title: "Warning!"
          , text: "입금내역매핑이 되어있는 경우는 입금내역매핑을 지우고 삭제해주세요!"
        })
      }

    }
    else if (colModelSelector.attr('id') === 'TB07090S_colModel3') {

      const rctmDtlsMappingGridData = $('#TB07090S_colModel2').pqGrid('instance').pdata

      let gridData = colModelSelector.pqGrid('instance').pdata;

      let cnt = 0;

      for (let i = gridData.length - 1; i >= 0; i--) {
        if (gridData[i].delYn === "Y") {

          for (let j = 0; j < rctmDtlsMappingGridData.length; j++) {
            if (
              colModelSelector.pqGrid('instance').pdata[i].rctmDt == rctmDtlsMappingGridData[j].rctmDt
              && colModelSelector.pqGrid('instance').pdata[i].rgstSeq == rctmDtlsMappingGridData[j].rgstSeq
            ) {
              // 입금증등록내역 업데이트
              $('#TB07090S_colModel2').pqGrid("instance").pdata[j].pmntPrarAmt = Number($('#TB07090S_colModel2').pqGrid("instance").pdata[j].pmntPrarAmt) - Number($('#TB07090S_colModel3').pqGrid("instance").pdata[i].dealRctmAmt)
              $('#TB07090S_colModel2').pqGrid("instance").refresh();
            }
          }

          if (!gridData[i].hndDetlDtm) {
            // 저장되지 않은 내용은 그리드에서만 삭제
            colModelSelector.pqGrid("deleteRow", { rowIndx: i });
          }
          else {
            // 삭제용 리스트 추가
            rctmDtlsMappingDeleteList.push(
              colModelSelector.pqGrid('instance').pdata[i]
            )
            // 행에서 삭제
            colModelSelector.pqGrid("deleteRow", { rowIndx: i });
          }

        }
      }
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
            , title: "Success!"
            , text: "저장성공!"
          })
          search_TB07090S();
        }
        else {
          swal.fire({
            icon: "warning"
            , title: "Warning!"
            , text: "저장실패!"
          })
        }
      },
      error: function () {
        Swal.fire({
          icon: "error"
          , title: "Error!"
          , text: "저장실패!"
        })
      }
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
            , title: "Success!"
            , text: "저장성공!"
          })
          search_TB07090S();
        }
        else {
          swal.fire({
            icon: "warning"
            , title: "Warning!"
            , text: "저장실패!"
          })
        }
      },
      error: function () {
        Swal.fire({
          icon: "error"
          , title: "Error!"
          , text: "저장실패!"
        })
      }
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
