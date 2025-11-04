const TB08040Sjs = (function () {
  let feeSch; // 수수료스케줄관리 그리드
  let grdSelect = {}; // select객체
  let feeSchLen = 0; // 수수료스케줄관리 원본
  let selectBox; // return selectBox
  let selectBox1;
  let selectBox2;
  let saveGrid = []; // 저장 리스트
  let delGrid = [];
  let fValid = -1; // 0 : 조회, 1 : 저장

  $(document).ready(function () {
    selBox_TB08040S(); // 셀렉트박스
    pqGrid_TB08040S(); // PqGrid 생성
    selectBoxSet_TB08040S(); //부서 셀렉트박스 세팅
    loginUserSet_TB08040S(); //로그인 담당자,관리부서 세팅
    getDealInfoFromWF();

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB08040S_strPrarDt", "TB08040S_endPrarDt");
    setDateInput();
  });

  function setDateInput() {
    // 1개월전 ~ 오늘일자 디폴트 세팅
    $("#TB08040S_strPrarDt").val(addMonth(getToday(), 0));
    $("#TB08040S_endPrarDt").val(addMonth(getToday(), 12));
  }

  /**
   * 초기화 버튼
   */
  function init_TB08040S() {
    resetAll("TB08040S", ["grd_feeSch"]);
    loginUserSet_TB08040S(); //로그인 담당자,관리부서 세팅
    saveGrid = [];
    delGrid = [];
    setDateInput();
  }

  /*
   * 부서 셀렉트박스 세팅
   */
  function selectBoxSet_TB08040S() {
    selectBox1 = getSelectBoxList("TB08040S", "D010", false);
    dprtList = selectBox1.filter(function (item) {
      //부서코드 list
      return item.cmnsGrpCd === "D010";
    });

    dprtList.forEach((item) => {
      $("#TB08040S_dprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );
    });
  }

  /**
   * 로그인 담당자,관리부서 세팅
   */

  function loginUserSet_TB08040S() {
    empNo = $("#userEno").val(); //직원명
    dprtCd = $("#userDprtCd").val(); //부서번호
    $("#TB08040S_empNm").val($("#userEmpNm").val());
    $("#TB08040S_empNo").val(empNo);
    $("#TB08040S_dprtNm").val(dprtCd).prop("selected", true);
    $("#TB08040S_dprtCd").val(dprtCd);
  }

  /**
   * 부서명 변경시
   */

  $("#TB08040S_dprtNm").on("change", function () {
    var dprtCd = $(this).val();
    $("#TB08040S_dprtCd").val(dprtCd);
  });

  function selBox_TB08040S() {
    selectBox = getSelectBoxList(
      "TB08040S",
      "F004" + // 수수료종류코드 FEE_KND_CD
        "/F006" + // 수수료인식구분 FEE_RCOG_DCD
        "/E027" + // 과세유형구분코드 TXTN_TP_DCD
        "/F001" + // 수수료선후급구분코드 FEE_BNAP_DCD
        "/T006" + // 수수료과세여부 FEE_TXTN_YN
        "/A005" + // 계정과목코드
        "/I027" + // 통화코드
        "/F015", // 수수료산정구분코드 FEE_RCKN_DCD
      false
    );
    selectBox2 = getSelBoxCdFeeKndCd(); //수수료종류코드 리스트 전체 가져오기

    // 수수료종류코드
    grdSelect.F004 = selectBox.filter((item) => item.cmnsGrpCd === "F004");
    // 수수료인식구분
    grdSelect.F006 = selectBox.filter((item) => item.cmnsGrpCd === "F006");
    // 과세유형구분코드
    grdSelect.E027 = selectBox.filter((item) => item.cmnsGrpCd === "E027");
    // 수수료선후급구분코드
    grdSelect.F001 = selectBox.filter((item) => item.cmnsGrpCd === "F001");
    // 수수료과세여부
    grdSelect.T006 = selectBox.filter((item) => item.cmnsGrpCd === "T006");
    // 통화코드
    grdSelect.I027 = selectBox.filter((item) => item.cmnsGrpCd === "I027");
    // 계정과목코드
    grdSelect.A005 = selectBox.filter((item) => item.cmnsGrpCd === "A005");
    // 수수료산정구분코드 FEE_RCKN_DCD
    grdSelect.F015 = selectBox.filter((item) => item.cmnsGrpCd === "F015");
  }

  /*
   * 수수료종류코드 리스트 전체 가져오기
   * { feeKndCd, feeName, actsCd, actCd }
   */
  function getSelBoxCdFeeKndCd() {
    var result = null;
    $.ajax({
      type: "GET",
      url: "/TB07180S/getSelectBoxCode",
      async: false,
      dataType: "json",
      success: function (data) {
        result = data;
      },
      error: function () {
        result = null;
      },
    });
    return result;
  }

  function pqGrid_TB08040S() {
    var dateEditor_feeSch = function (ui) {
      var $inp = ui.$cell.find("input");

      $inp
        .datepicker({
          todayBtn: "linked",
          autoclose: true,
          format: "yyyy-mm-dd",
          keyboardNavigation: false,
          forceParse: false,
          calendarWeeks: false,
          language: "ko",
        })
        .on("changeDate", function (e) {
          //이벤트의 종류
          //show : datePicker가 보이는 순간 호출
          //hide : datePicker가 숨겨지는 순간 호출
          //clearDate: clear 버튼 누르면 호출
          //changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
          //changeMonth : 월이 변경되면 호출
          //changeYear : 년이 변경되는 호출
          //changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

          //console.log(e);

          //setSelection(data) 하지 않고 setSelection = null 실행시 실행안됨. 이유불명
          $("#grd_feeSch").pqGrid("setSelection", {
            rowIndx: ui.rowIndx,
            dataIndx: ui.dataIndx,
          });
          $("#grd_feeSch").pqGrid("setSelection", null);
        });
    };

    /********************************************************************
     * PQGrid Column
     ********************************************************************/
    // feeSn                         /* 수수료일련번호 */
    // feeKndCd                      /* 수수료종류코드 */
    // actsNm                        /* 계정과목명 */
    // actsCd                        /* 계정과목코드 */
    // feeRcogDcd                    /* 수수료인식구분 */
    // txtnTpDcd                     /* 과세유형구분코드 */
    // crryCd                        /* 통화코드 */
    // rpsrNm                        /* 대표자명 */
    // feeStdrAmt                    /* 수수료기준금액 */
    // feeTrgtCtns                   /* 수수료대상내용 */
    // feeRt                   	     /* 수수료율      */
    // 수수료스케줄정보
    let col_feeSch = [
      //체크박스
      {
        dataIndx: "chk",
        maxWidth: 36,
        minWidth: 36,
        align: "center",
        resizable: true,
        title: "",
        menuIcon: false,
        type: "checkBoxSelection",
        cls: "ui-state-default",
        sortable: false,
        editor: false,
        dataType: "bool",
        width: "5%",
        editable: "true",
        cb: {
          all: false,
          header: true,
        },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        hidden: true,
      },
      {
        title: "등록상태코드",
        dataType: "string",
        dataIndx: "rgstSttsCd",
        hidden: true,
      },
      {
        title: "순번",
        dataType: "string",
        dataIndx: "seq",
        halign: "center",
        align: "center",
        width: "4%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result;
          result = (ui.rowIndx + 1).toString();
          return result;
        },
      },
      {
        title: "수수료일련번호",
        dataType: "string",
        dataIndx: "feeSn",
        hidden: true,
      },
      {
        title: "수수료종류",
        dataType: "string",
        dataIndx: "feeKndCd",
        halign: "center",
        align: "left",
        width: "13%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "feeKndCd",
          labelIndx: "feeName",
          options: selectBox2, //grdSelect.F004,
        },
        render: function (ui) {
          let fSel = selectBox2.find(({ feeKndCd }) => feeKndCd == ui.cellData);
          return fSel ? fSel.feeName : ui.cellData;
        },
        editable: true,
      },
      // {
      // 	title: "계정과목명",
      // 	dataType: "string",
      // 	dataIndx: "actName",
      // 	halign: "center",
      // 	align: "center",
      // 	width: "10%",
      // 	filter: { crules: [{ condition: "range" }] },
      // },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "7%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        hidden: true,
      },
      {
        title: "수수료<br>인식구분",
        dataType: "string",
        dataIndx: "feeRcogDcd",
        halign: "center",
        align: "center",
        width: "6%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.F006,
        },
        render: function (ui) {
          let fSel = grdSelect.F006.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
        editable: true,
      },
      {
        title: "수수료산정구분",
        dataType: "string",
        dataIndx: "feeRcknDcd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        // editor: {
        // 	type: "select",
        // 	valueIndx: "cdValue",
        // 	labelIndx: "cdName",
        // 	options: grdSelect.F015,//grdSelect.F004,
        // },
        render: function (ui) {
          let fSel = grdSelect.F015.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
        editable: false,
        hidden: true,
      },
      {
        title: "수수료<br>과세여부",
        editable: true,
        dataType: "string",
        dataIndx: "feeTxtnYn",
        halign: "center",
        align: "center",
        width: "6%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "value",
          labelIndx: "key",
          options: [
            {
              key: "Y",
              value: "Y",
            },
            {
              key: "N",
              value: "N",
            },
          ],
        },
        render: function (ui) {
          let options = [
            {
              key: "Y",
              value: "Y",
            },
            {
              key: "N",
              value: "N",
            },
          ];
          let option = options.find((opt) => opt.value == ui.cellData);
          return option ? option.key : ui.cellData;
        },
      },
      {
        title: "과세유형구분",
        dataType: "string",
        dataIndx: "txtnTpDcd",
        halign: "center",
        align: "center",
        width: "7%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.E027,
        },
        render: function (ui) {
          let fSel = grdSelect.E027.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
        editable: true,
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "crryCd",
        halign: "center",
        align: "center",
        width: "6%",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdValue",
          options: grdSelect.I027,
        },
        editable: true,
      },
      {
        title: "대표자(주주)",
        type: "input",
        dataType: "string",
        dataIndx: "rpsrNm",
        halign: "center",
        align: "left",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
      },
      {
        title: "수수료",
        dataType: "integer",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        colModel: [
          {
            title: "대상금액",
            dataType: "string",
            dataIndx: "feeStdrAmt",
            align: "right",
            halign: "center",
            align: "right",
            width: "10%",
            //          format: "#,###.##",
            render: function (ui) {
              var value = parseFloat(ui.cellData);
              var formattedValue = value.toLocaleString("ko-KR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              });
              return formattedValue;
            },
            editable: true,
            //editor: { type: 'input', attr: 'maxlength = "18"', oninput: "this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"},
          },
          {
            title: "대상내용(계산식)",
            dataType: "string",
            dataIndx: "feeTrgtCtns",
            halign: "center",
            align: "left",
            width: "10%",
            editable: true,
            //editor: { type: 'input', attr: 'maxlength = "500"',},
          },
          {
            title: "율(%)",
            dataType: "float",
            dataIndx: "feeRt",
            halign: "center",
            align: "right",
            width: "10%",
            format: "#,###.00",
            // render: function(ui) {
            // 	var value = parseFloat(ui.cellData);
            // 	var formattedValue = value.toLocaleString('ko-KR', {
            // 		minimumFractionDigits: 0,
            // 		maximumFractionDigits: 7
            // 	});
            // 	return formattedValue;
            // },
            editable: true,
          },
          {
            title: "수수료최저금액",
            dataType: "string",
            dataIndx: "feeLwstAmt",
            halign: "center",
            align: "right",
            width: "10%",
            render: function (ui) {
              var value = parseFloat(ui.cellData);
              var formattedValue = value.toLocaleString("ko-KR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              });
              return formattedValue;
            },
            editable: false,
            hidden: true,
          },
          {
            title: "수수료최고금액",
            dataType: "string",
            dataIndx: "feeHgstAmt",
            halign: "center",
            align: "right",
            width: "10%",
            render: function (ui) {
              var value = parseFloat(ui.cellData);
              var formattedValue = value.toLocaleString("ko-KR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              });
              return formattedValue;
            },
            editable: false,
            hidden: true,
          },
          {
            title: "수수료금액",
            dataType: "string",
            dataIndx: "feeAmt",
            halign: "center",
            align: "right",
            width: "10%",
            editable: true,
            render: function (ui) {
              var value = parseFloat(ui.cellData);
              var formattedValue = value.toLocaleString("ko-KR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              });
              return formattedValue;
            },
          },
        ],
      },
      {
        title: "예정일자",
        dataType: "date",
        format: "yyyy-mm-dd",
        dataIndx: "prarDt",
        halign: "center",
        align: "center",
        width: "8%",
        editor: {
          type: "textbox",
          init: dateEditor_feeSch,
        },
        validations: [
          {
            type: "regexp",
            value: "^([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{8})$",
            msg: "Not in yyyy-mm-dd format",
          },
        ],
        //validations:[ {type: 'regexp', value: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', msg : 'Not in yyyy-mm-dd format'}],
        editable: true,
        render: function (ui) {
          let cellData = replaceAll(ui.cellData, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return formatDate(cellData.slice(0, 8)); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
      },
      {
        title: "수수료<br>선후급구분코드",
        dataType: "string",
        dataIndx: "feeBnapDcd",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: grdSelect.F001,
        },
        render: function (ui) {
          let fSel = grdSelect.F001.find(
            ({ cdValue }) => cdValue == ui.cellData
          );
          return fSel ? fSel.cdName : ui.cellData;
        },
        editable: true,
      },
      {
        title: "이연비율",
        dataType: "string",
        dataIndx: "fnnrPrlnRto",
        halign: "center",
        align: "right",
        width: "7%",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
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
        title: "이연수수료",
        dataType: "integer",
        dataIndx: "prlnFee",
        halign: "center",
        align: "right",
        width: "7%",
        filter: { crules: [{ condition: "range" }] },
        format: "#,###",
      },
      {
        title: "인식시작일자",
        dataType: "date",
        format: "yy-mm-dd",
        dataIndx: "fnnrRcogStrtDt",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "textbox",
          /*init: function (ui) {
					  let $inp = ui.$cell.find("input");
					  $inp.attr("placeholder", "YYYY-MM-DD");
					  $inp.on("input", function () {
						if (this.value.length === 8) {
						  formatDate(this.value);				
						} else {
						  this.value;
						}
					  });
					},*/
          init: dateEditor_feeSch,
        },
        validations: [
          {
            type: "regexp",
            value: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
            msg: "Not in yyyy-mm-dd format",
          },
        ],
        render: function (ui) {
          let cellData = replaceAll(ui.cellData, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return formatDate(cellData.slice(0, 8)); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
        editable: true,
      },
      {
        title: "인식종료일자",
        dataType: "date",
        format: "yy-mm-dd",
        dataIndx: "fnnrRcogEndDt",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "textbox",
          /* init: function (ui) {
					   let $inp = ui.$cell.find("input");
					   $inp.attr("placeholder", "YYYY-MM-DD");
					   $inp.on("input", function () {
						 if (this.value.length === 8) {
						   formatDate(this.value);
						 } else {
						   this.value;
						 }
					   });			
					 },*/
          init: dateEditor_feeSch,
        },
        validations: [
          {
            type: "regexp",
            value: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
            msg: "Not in yyyy-mm-dd format",
          },
        ],
        render: function (ui) {
          let cellData = replaceAll(ui.cellData, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return formatDate(cellData.slice(0, 8)); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
        editable: true,
      },
      {
        title: "이연기간일수",
        dataType: "string",
        dataIndx: "fnnrPrlnPrdDnum",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        //editable   : true,
      },
      {
        title: "등록부점코드",
        dataType: "string",
        dataIndx: "rgstBdcd",
        halign: "center",
        align: "center",
        width: "7%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (isEmpty(cellData)) {
            return (ui.cellData = $("#userDprtCd").val());
          } else {
            return cellData;
          }
        },
      },
      {
        title: "수수료수납일자",
        dataType: "string",
        dataIndx: "feeRcivDt",
        halign: "center",
        align: "center",
        width: "8%",
        editable: false,
        editor: {
          type: "textbox",
          init: function (ui) {
            // let cellData = ui.cellData;
            let $inp = ui.$cell.find("input");
            $inp.attr("placeholder", "YYYY-MM-DD");
            $inp.on("input", function () {
              if (this.value.length === 8) {
                formatDate(this.value);
              } else {
                this.value;
              }
            });
          },
        },
        render: function (ui) {
          let cellData = replaceAll(ui.cellData, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return formatDate(cellData.slice(0, 8)); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
      },
      {
        title: "수수료수납금액",
        dataType: "integer",
        dataIndx: "feeRcivAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
        editable: false,
      },
      {
        title: "거래일련번호",
        dataType: "string",
        dataIndx: "trSn",
        halign: "center",
        align: "right",
        hidden: true,
      },
      {
        title: "처리완료여부",
        dataType: "string",
        dataIndx: "prcsCpltYn",
        halign: "center",
        align: "center",
        width: "7%",
        editable: false,
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData === "Y") {
            return "처리";
          } else {
            return "미처리";
          }
        },
      },
      {
        title: "rowStatus",
        dataType: "string",
        dataIndx: "rowType",
        hidden: true,
      },
    ];

    let pqGridObjs = [];

    pqGridObjs = [
      {
        height: 500,
        maxHeight: 500,
        id: "grd_feeSch",
        colModel: col_feeSch,
        scrollModel: { autoFit: false },
        selectionModel: { type: "cell" },
        create: function (evt, ui) {
          this.widget().pqTooltip();
        },
        editModel: {
          saveKey: $.ui.keyCode.ENTER,
          //filterKeys: false,
          keyUpDown: false,
          cellBorderWidth: 0,
        },
        cellSave: function (event, ui) {
          // 수정된 행에 rowType 추가
          let dataIndx = ui.dataIndx;
          let rowIndx = ui.rowIndx;
          let rowData = feeSch.getRowData({ rowIndx });
          let rd = ui.rowData;
          let obj = {};

          if (dataIndx === "feeKndCd") {
            const grid = $("#grd_feeSch").pqGrid("instance");
            //rowData = grid.getRowData({ rowInx: ui.rowIndx });
            rowData = ui.rowData;
            // console.log(rowData);
            var tempRowData = rd.feeKndCd;
            var selectedIndex = selectBox2.findIndex(
              (option) => option.feeKndCd === tempRowData
            );
            if (selectedIndex !== -1) {
              // 찾은 인덱스를 사용하여 wfAuthId 값을 설정
              rd.actsCd = selectBox2[selectedIndex].actsCd;
              rd.actName = selectBox2[selectedIndex].actName;

              var paramData = {
                feeKndCd: tempRowData,
              };

              $.ajax({
                type: "GET",
                url: "/TB07180S/IBIMS421BSelect",
                contentType: "application/json; charset=UTF-8",
                data: paramData,
                dataType: "json",
                success: function (data) {
                  if (data.length == 1) {
                    data = data[0];

                    ui.rowData["feeRcogDcd"] = data.feeRcogDcd;
                    ui.rowData["feeRcknDcd"] = data.feeRcknDcd;
                    ui.rowData["feeRt"] = data.feeRt;
                    ui.rowData["feeLwstAmt"] = data.feeLwstAmt;
                    ui.rowData["feeHgstAmt"] = data.feeHgstAmt;

                    $("#grd_feeSch")
                      .pqGrid("instance")
                      .updateRow({
                        rowIndx: ui.rowIndx,
                        row: {
                          feeRcogDcd: data.feeRcogDcd,
                          feeRcknDcd: data.feeRcknDcd,
                          feeRt: data.feeRt,
                          feeLwstAmt: data.feeLwstAmt,
                          feeHgstAmt: data.feeHgstAmt,
                        },
                      });

                    if (rowData.rowType !== "I") {
                      rowData.rowType = "U";
                    }

                    // UI에 반영
                    grid.refreshRow({ rowIndx: ui.rowIndx });
                  }
                },
              });
              // UI에 반영
              //grid.refreshRow({ rowIndx: ui.rowIndx });
            }
          }

          if (dataIndx === "feeStdrAmt" || dataIndx === "feeRt") {
            //const grid = $("#grd_feeSch").pqGrid('instance');
            //const rowData = grid.getRowData({ rowIndx: ui.rowIndx });
            //console.log("feeStdrAmt" + rowData.feeStdrAmt);
            //console.log("feeRt" + rowData.feeRt);

            var feeRcknDcd = rd.feeRcknDcd;
            var feeStdrAmt = rd.feeStdrAmt;
            var feeRt = rd.feeRt;
            var feeHgstAmt = rd.feeHgstAmt; // 수수료최고금액
            var feeLwstAmt = rd.feeLwstAmt; // 수수료최저금액
            //feeAmt 수수료금액
            // 현재 수수료산정구분코드 '01'로 들어감. 추후 프로세스 정의 필요.
            if (feeRcknDcd == "01") {
              // console.log(rd)
              if (feeStdrAmt >= 0 && feeRt >= 0) {
                // 찾은 인덱스를 사용하여 wfAuthId 값을 설정
                rd.feeAmt = feeStdrAmt * (feeRt / 100);
                rd.feeTrgtCtns = "*";
                //console.log("datacheck::::::",rd.feeAmt,"feeRcknDcd:::::",feeRcknDcd );
                if (rd.feeAmt > feeHgstAmt) {
                  rd.feeAmt = feeHgstAmt;
                  sf(1, "info", "수수료최고금액을 초과할 수 없습니다.");
                } else if (rd.feeAmt < feeLwstAmt) {
                  rd.feeAmt = feeLwstAmt;
                  sf(1, "info", "수수료최저금액보다 적을 수 없습니다.");
                }
              }
            } else {
              if (rd.feeAmt > feeHgstAmt) {
                rd.feeAmt = feeHgstAmt;
                sf(1, "info", "수수료최고금액을 초과할 수 없습니다.");
              } else if (rd.feeAmt < feeLwstAmt) {
                rd.feeAmt = feeLwstAmt;
                sf(1, "info", "수수료최저금액보다 적을 수 없습니다.");
              }
            }

            if (rd.rowType !== "I") {
              rd.rowType = "U";
            }

            // maxlength
            obj.ui = ui;
            obj.dataIndx = "feeStdrAmt";
            obj.length = 18;

            numLength(obj);

            // UI에 반영
            //grid.refreshRow({ rowIndx: ui.rowIndx });
          }
          // 수수료금액 수기 입력 시 금액확인
          if (dataIndx === "feeAmt") {
            var feeRcknDcd = rowData.feeRcknDcd;
            var feeHgstAmt = Number(rowData.feeHgstAmt);
            var feeLwstAmt = Number(rowData.feeLwstAmt);
            var feeAmt = Number(rowData.feeAmt);

            if (feeRcknDcd != "02") {
              if (feeAmt > feeHgstAmt) {
                rowData.feeAmt = feeHgstAmt;
                sf(1, "info", "수수료최고금액을 초과할 수 없습니다.");
              } else if (feeAmt < feeLwstAmt) {
                rowData.feeAmt = feeLwstAmt;
                sf(1, "info", "수수료최저금액보다 적을 수 없습니다.");
              }
            }

            // max length
            obj.ui = ui;
            obj.dataIndx = "feeAmt";
            obj.length = 18;

            numLength(obj);
          }

          if (rowData.rowType !== "I") {
            const grid = $("#grd_feeSch").pqGrid("instance");
            const rowData = grid.getRowData({ rowIndx: ui.rowIndx });
            rowData.rowType = "U"; // rowData 객체의 rowType을 직접 "M"으로 설정
            // rowType이 "I"인 경우 그대로 유지
            // UI에 반영
            grid.refreshRow({ rowIndx: ui.rowIndx });
          }
        },
        rowClick: function (evt, ui) {
          pqGridSelectHandler(ui.rowIndx, "grd_feeSch");
        },
        /* cellClick: function (evt, ui) {
				   if (!ui.column || !ui.column.editor || !ui.column.editor.type) {
					 return;
				   }
				   if (ui.column.editor.type === "select") {
					 let $tag = $(ui.$td[0]);
					 $tag.trigger("dblclick");
				 	
				 	
				   }
				 },*/
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    feeSch = $("#grd_feeSch").pqGrid("instance");

    let formulas = [
      /*[
			  // 예정일자
			  "prarDt",
			  function (rd) {
				let cellData = replaceAll( rd.prarDt , '-','') ;
				 if (!isEmpty(cellData) && cellData.length === 8) {
						  return cellData;
				 } else if(!isEmpty(cellData) && cellData.length > 8){
					return cellData.slice(0, 8);  // 최대 자리수 초과 시 잘라내기
					 } else {
						  return cellData;
				 }
			  },
			],	
		*/
      [
        // 인식시작일자
        "fnnrRcogStrtDt",
        function (rd) {
          let cellData = replaceAll(rd.fnnrRcogStrtDt, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return cellData;
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return cellData.slice(0, 8); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
      ],
      [
        // 인식종료일자
        "fnnrRcogEndDt",
        function (rd) {
          let cellData = replaceAll(rd.fnnrRcogEndDt, "-", "");
          if (!isEmpty(cellData) && cellData.length === 8) {
            return cellData;
          } else if (!isEmpty(cellData) && cellData.length > 8) {
            return cellData.slice(0, 8); // 최대 자리수 초과 시 잘라내기
          } else {
            return cellData;
          }
        },
      ],

      [
        // 이연기간일수
        "fnnrPrlnPrdDnum",
        function (rd) {
          return dateDiff(rd.fnnrRcogStrtDt, rd.fnnrRcogEndDt);
        },
      ],
      /*  [
				// 수수료금액
				"feeAmt",
				function (rd) {
				 if(isNaN(rd.feeStdrAmt) || isNaN(rd.feeRt)){
					return rd.feeAmt;
				 }else{
					
					return rd.feeStdrAmt * (rd.feeRt / 100);
				 }	
				},
			  ], */
      [
        // 이연수수료
        "prlnFee",
        function (rd) {
          if (isNaN(rd.fnnrPrlnRto)) {
            return 0;
          } else {
            return rd.feeAmt * (rd.fnnrPrlnRto / 100);
          }
        },
      ],
    ];
    // let aaa = [
    // 	[
    // 		"exmptAmt", function(rd) {
    // 			console.log("rd ::: ", rd.exmptAmt);
    // 			// console.log("rd.length ::: ", rd.length);
    // 			console.log("rd ::: ", rd);
    // 			// let sum = 0;
    // 			// for (let i = 0; i < rd.length; i++) {
    // 			// 	const element = array[i];

    // 			// }
    // 		},
    // 	],
    // ]
    // obj.option add
    feeSch.option("formulas", formulas);
  }

  // 조회버튼
  function srch() {
    fValid = 0;

    if (validation_TB08040S().isValid) {
      var param = {
        prdtCd: validation_TB08040S().prdtCd,
        strPrarDt: $("#TB08040S_strPrarDt").val().replaceAll("-", ""),
        endPrarDt: $("#TB08040S_endPrarDt").val().replaceAll("-", ""),
        empNo: $("#TB08040S_empNo").val(),
        dprtCd: $("#TB08040S_dprtCd").val(),
      };

      $.ajax({
        type: "POST",
        url: "/TB08040S/srchFeeSch",
        data: param, //JSON.stringify(param),
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            feeSch.setData(data);
            feeSchLen = feeSch.getData().length;
          } else {
            Swal.fire({
              icon: "warning",
              text: "조회된 정보가 없습니다.",
              confirmButtonText: "확인",
            });
            resetAll("", ["grd_feeSch"]);
          }
        },
        error: function (result) {},
      });
    }
  }

  // 저장버튼
  function save() {
    fValid = 1;
    let chkSchList;
    let feeSchList;

    saveGrid = addGrd(feeSch);
    feeSchList = saveGrid;
    console.log("저장리스트" + feeSchList.length); //U+I+D
    chkSchList = saveGrid.filter((item) => item.rowType !== null);
    chkSchList = chkSchList.filter((item) => item.rowType !== "D");
    console.log("체크리스트" + chkSchList.length); //U+I
    saveGrid = []; // saveGrid 변수 초기화

    if (
      feeSchList.length === 0 ||
      (feeSchLen === 0 &&
        $("#grd_feeSch").pqGrid("option", "dataModel").data.length === 0)
    ) {
      sf(1, "warning", "저장 할 정보가 없습니다.", "Warning!");
      return;
    }

    if (validation_TB08040S(chkSchList).isValid) {
      let obj = {
        feeSchList,
        prdtCd: validation_TB08040S().prdtCd,
      };

      $.ajax({
        type: "POST",
        url: "/TB08040S/saveFeeSch",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          var inPrdtCd = $("#TB08040S_prdtCd").val();
          var inPrdtNm = $("#TB08040S_prdtNm").val();
          //init_TB08040S();
          $("#TB08040S_prdtCd").val(inPrdtCd);
          $("#TB08040S_prdtNm").val(inPrdtNm);
        },
        success: function (data) {
          if (data > 0) {
            Swal.fire({
              icon: "success",
              text: "수수료스케줄정보가 저장됐습니다.",
              confirmButtonText: "확인",
            });
            srch();
            feeSch.refreshDataAndView();
          }
        },
        error: function (result) {
          Swal.fire({
            icon: "error",
            text: `수수료스케줄정보 저장에 실패하였습니다.`,
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation_TB08040S(arr = []) {
    let prdtCd = $("#TB08040S_prdtCd").val(); // 종목코드

    if (!prdtCd) {
      Swal.fire({
        icon: "warning",
        text: "종목코드를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return { isValid: false };
    }

    if (fValid === 0) {
      //조회시
      let strPrarDt = $("#TB08040S_strPrarDt").val(); // 조회시작일자
      let endPrarDt = $("#TB08040S_endPrarDt").val(); // 조회종료일자
      if (!strPrarDt && endPrarDt) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: "예정 시작일을 입력해주세요.",
          confirmButtonText: "확인",
        });
        return { isValid: false };
      }
      if (strPrarDt && !endPrarDt) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: "예정 종료일을 입력해주세요.",
          confirmButtonText: "확인",
        });
        return { isValid: false };
      }
      if (strPrarDt && endPrarDt) {
        if (strPrarDt > endPrarDt) {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "입력하신 예정일 조회기간이 타당하지 않습니다. ",
            confirmButtonText: "확인",
          });
          return { isValid: false };
        }
      }
    }

    if (fValid === 1) {
      //저장시
      // 저장
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        //console.log(ele.txtnTpDcd);
        //console.log(ele.feeTxtnYn);
        //console.log(ele.rpsrNm);

        if (!ele.feeKndCd) {
          sf(2, "warning", `[수수료종류]`);
          return { isValid: false };
        }
        if (!ele.feeRcogDcd) {
          sf(2, "warning", `[수수료인식구분]`);
          return { isValid: false };
        }
        if (!ele.feeTxtnYn) {
          sf(2, "warning", `[수수료과세여부]`);
          return { isValid: false };
        }
        if (
          !ele.txtnTpDcd &&
          ele.feeTxtnYn == "1" //과세여부Y
        ) {
          sf(2, "warning", `[과세유형구분코드]`);
          return { isValid: false };
        }
        if (!ele.txtnTpDcd) {
          ele.txtnTpDcd = " ";
        }
        if (!ele.crryCd) {
          sf(2, "warning", `[통화코드]`);
          return { isValid: false };
        }
        if (
          !ele.rpsrNm &&
          (ele.txtnTpDcd == "1" || ele.txtnTpDcd == "2") //과세유형구분코드가 세금계산서나 계산서일 경우
          //&& (ele.feeTxtnYn=="1") //과세여부Y
        ) {
          sf(2, "warning", `[대표자(주주)]`);
          return { isValid: false };
        }
        if (
          !ele.feeStdrAmt &&
          !ele.feeAmt //수수료금액이 없을경우
        ) {
          sf(2, "warning", `[수수료대상금액]`);
          return { isValid: false };
        }
        if (!ele.feeTrgtCtns) {
          sf(2, "warning", `[수수료대상내용(계산식)]`);
          return { isValid: false };
        }
        if (!ele.feeRt) {
          sf(2, "warning", `[수수료율(%)]`);
          return { isValid: false };
        }
        if (!ele.feeAmt) {
          sf(2, "warning", `[수수료금액]`);
          return { isValid: false };
        }
        if (!ele.prarDt) {
          sf(2, "warning", `[예정일자]`);
          return { isValid: false };
        }
        if (!ele.feeBnapDcd) {
          sf(2, "warning", `[수수료선후급구분코드]`);
          return { isValid: false };
        }

        if (ele.feeRcogDcd === "2") {
          if (!ele.fnnrPrlnRto) {
            // 이연이율
            sf(2, "warning", `[이연비율]`);
            return { isValid: false };
          }
          if (!ele.prlnFee) {
            // 이연수수료
            sf(2, "warning", `[이연수수료]`);
            return { isValid: false };
          }
          if (!ele.fnnrRcogStrtDt) {
            // 인식시작일자
            sf(2, "warning", `[인식시작일자]`);
            return { isValid: false };
          }
          if (!ele.fnnrRcogEndDt) {
            // 인식종료일자
            sf(2, "warning", `[인식종료일자]`);
            return { isValid: false };
          }
        }
      }
    }
    return { isValid: true, prdtCd };
  }

  // + - Event
  function gridEvt(p) {
    switch (p) {
      case "p":
        if (validation_TB08040S().isValid) {
          //let grd = prnaRdmpSch.getData();
          let newRow = {
            rowType: "I",
            prdtCd: validation_TB08040S().prdtCd,
            crryCd: "KRW", // 통화코드
            rgstBdcd: $("#userDprtCd").val(), // 등록부점코드
            feeStdrAmt: 0,
            feeAmt: 0,
            feeRt: 0,
            feeRcivAmt: 0,
            feeHgstAmt: 0,
            feeLwstAmt: 0,
            prlnFee: 0,
            fnnrPrlnRto: 0,
          };
          //let gLen = grd.length;

          //console.log(gLen);
          feeSch.addRow({
            rowIndx: feeSchLen + 1,
            rowData: newRow,
            checkEditable: false,
          });
        }
        break;
      case "m":
        let chkCnt;
        chkCnt = 0;

        for (let i = 0; i < feeSch.pdata.length; i++) {
          if (feeSch.pdata[i].chk) {
            chkCnt++;
          }
        }

        if (chkCnt === 0) {
          sf(
            1,
            "warning",
            "삭제할 정보가 없습니다.<br/>체크박스를 확인해주세요."
          );
          return;
        }

        if (validation_TB08040S().isValid) {
          let data = feeSch.getData();
          let filteredIndexes = [];

          data.forEach((item, index) => {
            if (item.chk) {
              // if (item.rowType !== "I" && item.rowType !== "D" && item.rowType !== null) {
              // 	item.rowType = "D";
              // 	delGrid.push(item);
              // }
              item.rowType = "D";
              delGrid.push(item);
              filteredIndexes.push(index);
            }
          });
          // 구한 인덱스들을 삭제합니다. 뒤에서부터 삭제해야 인덱스가 꼬이지 않습니다.
          filteredIndexes
            .sort((a, b) => b - a)
            .forEach((index) => {
              feeSch.deleteRow({ rowIndx: index });
            });
          //console.log("지우고 난 후의 index ::: ", feeSch.getData());
        }

        break;
      default:
        break;
    }
  }

  // 체크된 grid
  function chkGrd(p) {
    let data = p.getData(); // 그리드 데이터

    // let chkList = [];
    let addedIndx = new Set(saveGrid.map((item, index) => index));

    for (let i = 0; i < data.length; i++) {
      const chkData = data[i];

      if (
        chkData.chk &&
        !addedIndx.has(i) &&
        !saveGrid.some((item) => item === chkData)
      ) {
        saveGrid.push(chkData);
      }
    }

    // chk가 없는 항목을 saveGrid에서 제거
    saveGrid = saveGrid.filter((item) => {
      const isPresentInData = data.some(
        (dataItem) => dataItem === item && dataItem.chk
      );

      return isPresentInData || item.rowType === "D";
    });

    // rowData가 null인 항목 제거
    saveGrid = saveGrid.filter((item) => item.rowType !== null);

    return saveGrid;
  }

  // 추가된 그리드
  function addGrd(p) {
    let data = p.getData(); // 그리드 데이터
    for (let i = 0; i < data.length; i++) {
      const chkData = data[i];
      if (chkData.rowType == "I" || chkData.rowType == "U") {
        chkData.prarDt = replaceAll(chkData.prarDt, "-", "");
        chkData.fnnrRcogStrtDt = replaceAll(chkData.fnnrRcogStrtDt, "-", "");
        chkData.fnnrRcogEndDt = replaceAll(chkData.fnnrRcogEndDt, "-", "");
        chkData.feeRcivDt = replaceAll(chkData.feeRcivDt, "-", "");
        chkData.feeStdrAmt = uncomma(chkData.feeStdrAmt);
        chkData.feeRt = uncomma(chkData.feeRt);
        chkData.feeAmt = uncomma(chkData.feeAmt);
        //console.log("addGrd chkData.prarDt" + chkData.prarDt);

        saveGrid.push(chkData);
      }
    }

    //let delGrd = delGrid.getData(); // 그리드 데이터
    for (let i = 0; i < delGrid.length; i++) {
      const delData = delGrid[i];
      saveGrid.push(delData);
    }

    return saveGrid;
  }

  // swal.fire
  function sf(flag, icon, text, title = "", callback = () => {}) {
    if (flag === 1) {
      Swal.fire({
        icon: `${icon}`,
        html: `${text}`,
        title: `${title}`,
        confirmButtonText: "확인",
      }).then(callback);
    }

    if (flag === 2) {
      Swal.fire({
        icon: `${icon}`,
        title: `${title}`,
        html: `${text}를(을) 확인해주세요.`,
        confirmButtonText: "확인",
      }).then(callback);
    }
  }

  function getDealInfoFromWF() {
    if (sessionStorage.getItem("isFromWF")) {
      //console.log("WF세션 있음");
      var prdtCd = sessionStorage.getItem("wfPrdtCd");
      var prdtNm = sessionStorage.getItem("wfPrdtNm");
      $("#TB08040S_prdtCd").val(prdtCd);
      $("#TB08040S_prdtNm").val(prdtNm);
      srch();
    } else {
      //console.log("WF세션 비었음");
    }
    sessionStorage.clear();
  }

  /**
   * 그리드 셀 글자 제한(length)
   * @param {*} obj
   * @returns {*}
   */
  function numLength(obj) {
    let ui = obj.ui; // grid ui
    let dataIndx = obj.dataIndx; // 'feeAmt'

    let len = obj.length; // 제한길이
    let str = ui.rowData[dataIndx];

    if (!str || isNaN(str)) {
      return (ui.rowData[dataIndx] = 0);
    }

    if (ui.value.length >= len) {
      str = String(str);
      // console.log('변해랏', typeof str);
      return (ui.rowData[dataIndx] = str.slice(0, len));
    }

    return (ui.rowData[dataIndx] = Number(str));
  }

  return {
    feeSch: feeSch,
    grdSelect: grdSelect,
    feeSchLen: feeSchLen,
    selectBox: selectBox,
    saveGrid: saveGrid,
    fValid: fValid,
    srch: srch,
    save: save,
    validation_TB08040S: validation_TB08040S,
    gridEvt: gridEvt,
    chkGrd: chkGrd,
    addGrd: addGrd,
    sf: sf,
    getSelBoxCdFeeKndCd: getSelBoxCdFeeKndCd,
    loginUserSet_TB08040S: loginUserSet_TB08040S,
    selectBoxSet_TB08040S: selectBoxSet_TB08040S,
    init_TB08040S: init_TB08040S,
    getDealInfoFromWF: getDealInfoFromWF,
    numLength: numLength,
  };
})();
