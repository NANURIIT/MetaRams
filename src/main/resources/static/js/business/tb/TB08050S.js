const TB08050Sjs = (function () {
  let feeDtls; // 수수료내역
  let selectBox;
  let selectBox1;
  let selectBox2;
  let grdSelect = {}; //
  let prlnFee; // 이연수수료
  let _f = 0; // validation)) 0. 조회 1. 저장
  let _tmpPrdtCd = {}; // 종목코드 초기화 안하기 위한 객체

  $(document).ready(function () {
    onload();
    //기간검색 유효성 검사 함수
    chkValFromToDt("TB08050S_strPrarDt","TB08050S_endPrarDt");
    setDateInput();
  });

  function onload() {
    selBox_TB08050S(); // 셀렉트박스
    pqGrid_TB08050S(); // 그리드 생성
	  loginUserSet_TB08050S(); //로그인담당자 세팅
    reBdin_TB08050S();
    getDealInfoFromWF();
	  inputNumberChangeFunction_TB08050S();

    selectorNumberFormater(
      $(
        `
          #TB08050S_feeRcivAmt
          , #TB08050S_splmTxa 
        `
      )
    )
  }

  function setDateInput() {
    // 1개월전 ~ 오늘일자 디폴트 세팅
    $("#TB08050S_strPrarDt").val(addMonth(getToday(), -1));
    $("#TB08050S_endPrarDt").val(getToday());    
  }
  
  /**
   * 초기화 버튼
   */
  function init_TB08050S(){	
  resetAll('TB08050S', ['grd_feeDtls']);
  TB08050Sjs.reBdin_TB08050S();
  TB08050Sjs.resetMore();
  loginUserSet_TB08050S(); //로그인 담당자,관리부서 세팅
  }
  

  function selBox_TB08050S() {
    selectBox = getSelectBoxList(
      "TB08050S",
      	 "F004" + // 수수료종류코드 FEE_BNAP_DCD
        "/F006" + // 수수료인식구분 FEE_RCOG_DCD
        "/E027" + // 과세유형구분코드 TXTN_TP_DCD
        "/F001" + // 수수료선후급구분코드 FEE_BNAP_DCD
        "/T006" + // 수수료과세여부 FEE_TXTN_YN
        "/F008" + // 자금구분코드 FNDS_DCD
        "/D006" + // 결재상태구분코드 DECD_STTS_DCD
        "/I027", // 통화코드
      false
    );
	
	selectBoxSet_TB08050S();
	selectBox2 =getSelBoxCdFeeKndCd(); //수수료종류코드 리스트 전체 가져오기
	
	
	selectBox2.forEach((item) => {
	  $("#TB08050S_F004").append(
		$("<option>", {
		  value: item.feeKndCd,
		  text: `${item.feeName}`,
		})
	  );
	});
	
    // 수수료인식구분
    grdSelect.F006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F006";
    });
    // 과세유형구분코드
    grdSelect.E027 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "E027";
    });
    // 수수료선후급구분코드
    grdSelect.F001 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "F001";
    });
    // 수수료과세여부
    grdSelect.T006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "T006";
    });
    // 결재상태구분코드
    grdSelect.D006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D006";
    });
    // 통화코드
    grdSelect.I027 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "I027";
    });
  }
  
   /*
   * 부서 셀렉트박스 세팅
   */
   function selectBoxSet_TB08050S() {
   	selectBox1 = getSelectBoxList("TB08050S", "D010", false);
   	dprtList = selectBox1.filter(function (item) {
   	  //부서코드 list
   	  return item.cmnsGrpCd === "D010";
   	});
     
   	dprtList.forEach((item) => {
   	  $("#TB08050S_dprtNm").append(
   		$("<option>", {
   		  value: item.cdValue,
   		  text: `${item.cdName}`,
   		})
   	  );
   	});
  }  
   
  /*
   * 수수료종류코드 리스트 전체 가져오기
   * { feeKndCd, feeName, actsCd, actCd }
   */
  function getSelBoxCdFeeKndCd(){
    var result =null;	
    $.ajax({
        type: "GET",
        url: "/TB07180S/getSelectBoxCode" ,
        async: false,
        dataType: "json",
        success: function (data) {
  	      result=data;
        },
  	    error: function(){
  	  	result= null;
  	    }	  
    	});
   return result;	
  }
  
   /**
    * 로그인 담당자,관리부서 세팅
    */

   function loginUserSet_TB08050S(){
    empNo = $('#userEno').val();     //직원명
    dprtCd = $('#userDprtCd').val(); //부서번호
    $("#TB08050S_empNm").val($('#userEmpNm').val());
    $("#TB08050S_empNo").val(empNo);
    $("#TB08050S_dprtNm").val(dprtCd).prop("selected", true);
    $("#TB08050S_dprtCd").val(dprtCd);
   }
   
   /**
    * 부서명 변경시
    */

   $("#TB08050S_dprtNm").on("change", function () {
   var dprtCd = $(this).val();
   $("#TB08050S_dprtCd").val(dprtCd);
   }); 
   
   /**
	* 세액 절사, 금액 반올림
    */
  function inputNumberChangeFunction_TB08050S(){
	//수수료대상금액
	$("#TB08050S_eprzCrdlFeeStdrAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB08050S_eprzCrdlFeeStdrAmt").val())*1)/1).toFixed(0);
		$("#TB08050S_eprzCrdlFeeStdrAmt").val(addComma(uncomma(formatNum)));
	});
	//수수료율
	$("#TB08050S_feeRt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB08050S_feeRt").val())*100)/100).toFixed(2);
		$("#TB08050S_feeRt").val(addComma(uncomma(formatNum)));
	});	
	//수수료금액
	$("#TB08050S_feeAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB08050S_feeAmt").val())*1)/1).toFixed(0);
		$("#TB08050S_feeAmt").val(addComma(uncomma(formatNum)));
	});	
	//합계금액
	$("#TB08050S_tempTot").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB08050S_tempTot").val())*1)/1).toFixed(0);
		$("#TB08050S_tempTot").val(addComma(uncomma(formatNum)));
	});	
	//적용환율
	$("#TB08050S_aplcExchR").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB08050S_aplcExchR").val())*100)/100).toFixed(2);
		$("#TB08050S_aplcExchR").val(addComma(uncomma(formatNum)));
	});	
	//수수료수납금액
	$("#TB08050S_feeRcivAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB08050S_feeRcivAmt").val())*1)/1).toFixed(0);
		$("#TB08050S_feeRcivAmt").val(addComma(uncomma(formatNum)));
	});	
	//원화환산수수료
	$("#TB08050S_wcrcTrslTrFeeAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB08050S_wcrcTrslTrFeeAmt").val())*1)/1).toFixed(0);
		$("#TB08050S_wcrcTrslTrFeeAmt").val(addComma(uncomma(formatNum)));
	});	
	//세액 (10원절사)
	$("#TB08050S_splmTxa").on('change', function(){
		let formatNum="0";
		formatNum=(Math.floor(uncomma($("#TB08050S_splmTxa").val())/10)*10).toFixed(0);
		$("#TB08050S_splmTxa").val(addComma(uncomma(formatNum)));
	});		
	
  }
  	
  function pqGrid_TB08050S() {
    /********************************************************************
     * PQGrid Column
     ********************************************************************/
    // 원금상환스케줄
    let colFeeDtls = [
      {
        title: "순번",
        dataType: "string",
        dataIndx: "feeSn",
        align: "center",
        width: "3%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래일자",
        dataType: "string",
        dataIndx: "trDt",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },
        hidden: true,
      },
	  /*
      {
        title: "처리일자",
        dataType: "string",
        dataIndx: "feeRcivDt",
        align: "center",
        width: "8%",
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
	  */
      {
        title: "수수료종류",
        dataType: "integer",
        dataIndx: "feeKndCd",
        halign: "center",
        align: "center",
        width: "12%",
        filter: { crules: [{ condition: "range" }] },
		editor: {
		  type: "select",
		  valueIndx: "feeKndCd",
		  labelIndx: "feeName",
		  options: selectBox2,
		},
		render: function (ui) {
		    let fSel = selectBox2.find(	
		    ({ feeKndCd }) => feeKndCd == ui.cellData
		  );
		  return fSel ? fSel.feeName : ui.cellData;
		},
      },
      {
        title: "계정과목",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "6%",
        filter: { crules: [{ condition: "range" }] },
		hidden : true,
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
		editor: {
		  type: "select",
		  valueIndx: "actsCd",
		  labelIndx: "actName",
		  options: selectBox2,
		},
		render: function (ui) {
	  	    let fSel = selectBox2.find(	
            ({ actsCd }) => actsCd == ui.cellData
          );
          return fSel ? fSel.actName : ui.cellData;
        },
      },
      {
        title: "수수료인식구분",
        dataType: "string",
        dataIndx: "feeRcogDcd",
        halign: "center",
        align: "center",
        width: "10%",
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
      },
      {
        title: "과세여부",
        dataType: "string",
        dataIndx: "feeTxtnYn",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "value",
          labelIndx: "key",
          options: [
            {
              key: "Y",
              value: "1",
            },
            {
              key: "N",
              value: "0",
            },
          ],
        },
        render: function (ui) {
          let options = [
            {
              key: "Y",
              value: "1",
            },
            {
              key: "N",
              value: "0",
            },
          ];
          // console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
          // console.log("options{}", options);
          let option = options.find((opt) => opt.value == ui.cellData);
          return option ? option.key : ui.cellData;
        },
        // render     : function(ui) {
        //     let cellData = ui.cellData;
        //     if ( cellData === "1" ) {
        //         return "Y";
        //     } else {
        //         return "N";
        //     }
        // },
      },
      {
        title: "과세유형구분",
        dataType: "string",
        dataIndx: "txtnTpDcd",
        halign: "center",
        align: "center",
        width: "10%",
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
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "crryCd",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdValue",
          options: grdSelect.I027,
        },
        render: function (ui) {
          let fSel = grdSelect.I027.find(
            ({ cdValue }) => cdValue == ui.cellData
          );

          return fSel ? fSel.cdValue : (ui.cdValue = "KRW");
        },
      },
      {
        title: "대표자(주주)",
        dataType: "string",
        dataIndx: "rpsrNm",
        halign: "center",
        align: "left",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
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
            dataType: "integer",
            dataIndx: "feeStdrAmt",
            align: "right",
            halign: "center",
            align: "right",
            width: "10%",
            format: "#,###",
          },
          {
            title: "대상내용(계산식)",
            dataType: "string",
            dataIndx: "feeTrgtCtns",
            halign: "center",
            align: "left",
            width: "10%",
          },
          {
            title: "율(%)",
            dataType: "integer",
            dataIndx: "feeRt",
            halign: "center",
            align: "right",
            width: "10%",
            format: "#.00",
          },
          {
            title: "수수료금액",
            dataType: "integer",
            dataIndx: "feeAmt",
            halign: "center",
            align: "right",
            width: "10%",
            format: "#,###",
            render: function (ui) {
              let cellData = ui.cellData;
              if (isNaN(cellData)) {
                console.log(cellData);
                return (ui.cellData = "");
              }
            },
          },
        ],
      },
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        halign: "center",
        align: "center",
        width: "8%",
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
        title: "선후급구분",
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
      },
      {
        title: "이연비율",
        dataType: "string",
        dataIndx: "fnnrPrlnRto",
        halign: "center",
        align: "right",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이연수수료",
        dataType: "integer",
        dataIndx: "prlnFee",
        halign: "center",
        align: "right",
        width: "10%",
        filter: { crules: [{ condition: "range" }] },
        format: "#,###",
      },
      {
        title: "인식시작일자",
        dataType: "string",
        dataIndx: "fnnrRcogStrtDt",
        halign: "center",
        align: "center",
        width: "8%",
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
        title: "인식종료일자",
        dataType: "string",
        dataIndx: "fnnrRcogEndDt",
        halign: "center",
        align: "center",
        width: "8%",
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
        title: "이연기간일수",
        dataType: "string",
        dataIndx: "fnnrPrlnPrdDnum",
        halign: "center",
        align: "center",
        width: "8%",
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
        title: "등록부점코드",
        dataType: "string",
        dataIndx: "rgstBdcd",
        halign: "center",
        align: "center",
        width: "8%",
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
        dataType: "integer",
        dataIndx: "feeRcivDt",
        halign: "center",
        align: "center",
        width: "8%",
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
        title: "수수료수납금액",
        dataType: "integer",
        dataIndx: "feeRcivAmt",
        halign: "center",
        align: "right",
        width: "10%",
        format: "#,###",
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
        title: "수납완료여부",
        dataType: "string",
        dataIndx: "prcsCpltYn",
        halign: "center",
        align: "center",
        width: "8%",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData === "Y") {
            return "Y";
          } else {
            return "N";
          }
        },
      },
	  
	  {
	    title: "거채러명",
	    dataType: "string",
	    dataIndx: "entpNm",
	    hidden: true,
	  },
    ];

    let pqGridObjs = [];

    // 그리드 옵션 생성
    pqGridObjs = [
      {
        height: 260,
        maxHeight: 260,
        id: "grd_feeDtls",
        colModel: colFeeDtls,
        scrollModel: { autoFit: false },
        // , cellSave  : function(event, ui) {
        //         // 수정된 행에 rowType 추가
        //         let rowIndx = ui.rowIndx,
        //             rowData = prnaRdmpSch.getRowData({rowIndx}),
        //             rowType = rowData.rowType;

        //         if (rowType !== "I") {
        //             rowData.rowType = "M";  // rowData 객체의 rowType을 직접 "M"으로 설정
        //         } else {
        //             rowData.rowType = rowType;  // rowType이 "I"인 경우 그대로 유지
        //         }
        //   },
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    feeDtls = $("#grd_feeDtls").pqGrid("instance");

    let formulas = [
      [
        // 이연기간일수
        "fnnrPrlnPrdDnum",
        function (rd) {
          return dateDiff(rd.fnnrRcogStrtDt, rd.fnnrRcogEndDt);
        },
      ],
    ];
    feeDtls.option("formulas", formulas);
  }

  // 조회 버튼
  function srch() {
    if (validation().isValid) {
      _tmpPrdtCd.prdtCd = validation().prdtCd
      _tmpPrdtCd.prdtNm = $('#TB08050S_prdtNm').val()
      _tmpPrdtCd.empNo = $('#TB08050S_empNo').val()
      _tmpPrdtCd.empNm = $('#TB08050S_empNm').val()
      _tmpPrdtCd.dprtNm = $('#TB08050S_dprtNm').val()
      _tmpPrdtCd.dprtCd = $('#TB08050S_dprtCd').val()
      
      let obj = {
        "prdtCd": validation().prdtCd,
        "strPrarDt" : $("#TB08050S_strPrarDt").val().replaceAll("-", ""),
        "endPrarDt": $("#TB08050S_endPrarDt").val().replaceAll("-", ""), 
        "empNo": $("#TB08050S_empNo").val(),
        "dprtCd":$("#TB08050S_dprtCd").val(),
      };

      $.ajax({
        type: "POST",
        url: "/TB08050S/selectFeeRcivLst",
        data: obj,//JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          feeDtls.setData([]);
		      resetMore();
        },
        success: function (data) {
          console.log(data);
          if (data.length > 0) {
            feeDtls.setData(data);

            feeDtls.on("rowDblClick", function (event, ui) {
              console.log(event);
              console.log(ui.rowData);
              const rd = ui.rowData;

              $("#TB08050S_feeSn").val(rd.feeSn); // 수수료일련번호
              //$("#TB08050S_feeRcivDt").val(dateNull(rd.feeRcivDt)); // 수취일자 ? 수납일자
			        $("#TB08050S_feeRcivDt").val(dateNull(rd.feeRcivDt)); // 수취일자 ? 수납일자

			        $("#TB08050S_F004").val(rd.feeKndCd); // 기업여신수수료종류코드
              if(!isEmpty(rd.feeStdrAmt)) $("#TB08050S_eprzCrdlFeeStdrAmt").val(commaNull(rd.feeStdrAmt)); // 기업여신수수료기준금액
              if(!isEmpty(rd.feeRt)) $("#TB08050S_feeRt").val(rd.feeRt); // 수수료율
              if(!isEmpty(rd.feeAmt)) $("#TB08050S_feeAmt").val(rd.feeAmt); // 수수료금액
              $("#TB08050S_feeTrgtCtns").val(rd.feeTrgtCtns); // 수수료대상내용
              $("#TB08050S_actsCd").val(rd.actsCd); // 계정과목코드
			        let actsRow = selectBox2.find(({ actsCd }) => actsCd == rd.actsCd);
			  
			        $("#TB08050S_actName").val((actsRow ? actsRow.actName :"")); // 계정과목코드
              //$(
              //  `input[name="TB08050S_feeTxtnYn"][value="${rd.feeTxtnYn}"]`
              //).prop("checked", true); // 수수료과세여부
			  
			        rd.feeTxtnYn=="Y" ? $("#TB08050S_feeTxtnYn_Y").prop("checked", true): $("#TB08050S_feeTxtnYn_N").prop("checked", true);
			  
              $("#TB08050S_F006").val(rd.feeRcogDcd); // 기업여신수수료인식구분코드
              $("#TB08050S_fnnrRcogStrtDt").val(dateNull(rd.fnnrRcogStrtDt)); // 인식시작일자
              $("#TB08050S_fnnrRcogEndDt").val(dateNull(rd.fnnrRcogEndDt)); // 인식종료일자
              $("#TB08050S_F008").val(rd.fndsDvsnCd); // 자금구분코드
              if (rd.crryCd === "KRW") {
                $("#TB08050S_aplcExchR").val("1.00"); // 적용환율
				        $("#TB08050S_aplcExchR").prop("disabled",true);
              } else {
                $("#TB08050S_aplcExchR").val(""); // 적용환율
                $("#TB08050S_aplcExchR").prop("disabled",false);
              }
			         $("#TB08050S_entpNm").val(rd.entpNm);
              $("#TB08050S_I027").val(rd.crryCd); // 적용환율
              $("#TB08050S_E027").val(rd.txtnTpDcd); // 기업여신과세유형코드
              $("#TB08050S_feeRcivAmt").val(commaNull(rd.feeRcivAmt)); // 수수료수납금액구분코드
              $("#TB08050S_wcrcTrslTrFeeAmt").val(commaNull(rd.wcrcTrslTrFeeAmt)); // 원화환산거래수수료금액
              $("#TB08050S_prufIsuDt").val(dateNull(rd.prufIsuDt)); // 증빙발행일자
              $("#TB08050S_splmTxa").val(commaNull(rd.splmTxa)); // 부가세액
              $("#TB08050S_rctmDt").val(dateNull(rd.rctmDt)); // 입금일자
              //$(
              //  `input[name="TB08050S_prcsCpltYn"][value="${rd.prcsCpltYn}"]`
              //).prop("checked", true); // 수납완료여부
			  
			        rd.prcsCpltYn=="Y" ? $("#TB08050S_prcsCpltYn_Y").prop("checked", true): $("#TB08050S_prcsCpltYn_N").prop("checked", true);
			  
              $("#TB08050S_prcsEmpno").val(rd.prcsEmpno); // 처리사원번호
              $("#TB08050S_prcsTm").val(rd.hndDetlDtmStr); // 처리시간
              $("#TB08050S_rkfrDt").val(dateNull(rd.rkfrDt)); // 회계일자 ? 기산일자

              prlnFee = rd.prlnFee; // 이연수수료
              console.log(rd.prlnFee);

              calulator("fee");
              calulator("crry");

              if (rd.prcsCpltYn == "Y") {
                $("#btnSave").attr("disabled", true);
              } else {
                $("#btnSave").attr("disabled", false);
              }

              reBdin_TB08050S(); // 처리자
            });
          } else {
            Swal.fire({
              icon: "warning",
              text: "조회된 내역이 없습니다.",
              confirmButtonText: "확인",
            });
            resetAll("TB08050S", ["grd_feeDtls"]);
            $("#TB08050S_feeTrgtCtns").val("");
            prlnFee = "";

            $('#TB08050S_prdtCd').val(_tmpPrdtCd.prdtCd)
            $('#TB08050S_prdtNm').val(_tmpPrdtCd.prdtNm)
            $('#TB08050S_empNo').val(_tmpPrdtCd.empNo)
            $('#TB08050S_empNm').val(_tmpPrdtCd.empNm)
            $('#TB08050S_dprtNm').val(_tmpPrdtCd.dprtNm)
            $('#TB08050S_dprtCd').val(_tmpPrdtCd.dprtCd)

            _tmpPrdtCd = {}
          }
        },
      });
    }
  }

  // 저장버튼
  function save() {
    _f = 1;
    if (validation().isValid) {

      let feeSn = $("#TB08050S_feeSn").val(); // 수수료일련번호
      let feeRcivDt = unformatDate($("#TB08050S_feeRcivDt").val()); // 수취일자
      let eprzCrdlFeeKndCd = $("#TB08050S_F004").val(); // 수수료종류코드
      let eprzCrdlFeeStdrAmt = uncomma($("#TB08050S_eprzCrdlFeeStdrAmt").val()); // 수수료대상금액 ? 기업여신수수료기준금액
      let feeRt = $("#TB08050S_feeRt").val(); // 수수료율
      let feeAmt = uncomma($("#TB08050S_feeAmt").val()); // 수수료금액

      let feeTrgtCtns = $("#TB08050S_feeTrgtCtns").val(); // 수수료대상내용
      let actsCd = $("#TB08050S_actsCd").val(); // 계정과목코드

      let feeTxtnYn = $("#TB08050S_feeTxtnYn_Y").is(":checked") ? "Y" :"N"	; // 수수료과세여부 (체박)
      let ifrsFeeRcogDcd = $("#TB08050S_F006").val(); // 수수료인식구분
      let fnnrRcogStrtDt = unformatDate($("#TB08050S_fnnrRcogStrtDt").val()); // 인식시작일자
      let fnnrRcogEndDt = unformatDate($("#TB08050S_fnnrRcogEndDt").val()); // 인식종료일
      let fndsDvsnCd = $("#TB08050S_F008").val(); // 자금구분코드
      let bcncNm = $("#TB08050S_entpNm").val(); // 거래처명
      let crryCd = $("#TB08050S_I027").val(); // 통화코드
	
      let aplyExrt = $("#TB08050S_aplcExchR").val(); // 적용환율
      let eprzCrdlTxtnTpDcd = $("#TB08050S_E027").val(); // 기업여신과세유형구분코드
      let feeRcivAmt = uncomma($("#TB08050S_feeRcivAmt").val()); //수수료수납금액 ? 기업여신수수료기준금액
      let krwTrslTrFeeAmt = uncomma($("#TB08050S_wcrcTrslTrFeeAmt").val()); // 원화환산거래수수료금액
      let prufIsuDt = unformatDate($("#TB08050S_prufIsuDt").val()); // 증빙발행일자
      let splmTxa = uncomma($("#TB08050S_splmTxa").val()); // 부가세액
      let rctmDt = unformatDate($("#TB08050S_rctmDt").val()); // 입금일자 ? 예정일자
	  
      let prcsCpltYn =  $("#TB08050S_prcsCpltYn_Y").is(":checked") ? "Y" :"N";// 수납완료여부 ? 처리완료여부
      let prcsEmpno = $("#TB08050S_prcsEmpno").val(); // 처리사원번호
      //let prcsTm = $('#TB08050S_prcsTm').val(); // 처리시각
      //let decdSttsDcd = $("#TB08050S_decdSttsDcd").val(); // 결재상태구분코드
	  
      let rkfrDt = unformatDate($("#TB08050S_rkfrDt").val()); // 회계일자 ? 기산일자


      // 반려 ?
      // 부서합의여부 ?

      let obj = {
        prdtCd: validation().prdtCd,
        feeSn,
        feeRcivDt,
        eprzCrdlFeeKndCd,
        eprzCrdlFeeStdrAmt,
        feeRt,
        feeAmt,
        feeTrgtCtns,
        actsCd,
        feeTxtnYn,
        ifrsFeeRcogDcd,
        fnnrRcogStrtDt,
        fnnrRcogEndDt,
        fndsDvsnCd,
        bcncNm,
        crryCd,
        aplyExrt,
        eprzCrdlTxtnTpDcd,
        feeRcivAmt,
        krwTrslTrFeeAmt,
        prufIsuDt,
        splmTxa,
        rctmDt,
        prcsCpltYn,
        prcsEmpno,
        //decdSttsDcd,
        rkfrDt,
        prlnFee,
      };

      $.ajax({
        type: "POST",
        url: "/TB08050S/saveFeeRcivInfo",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (data) {
          console.log(data);
          if (data > 0) {
            Swal.fire({
              icon: "success",
              text: "수수료수납처리가 등록됐습니다.",
              confirmButtonText: "확인",
            })

            srch(); // 재조회 
            prlnFee = ""; // 이연수수료 초기화
            _f = 0; // validation 구분 초기화
          }
        },
      });
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation() {
    let prdtCd = $("#TB08050S_prdtCd").val(); // 종목코드

    if ( !prdtCd || prdtCd.length != 10 ) {
      Swal.fire({
        icon: "warning",
        text: "종목코드를 입력해주세요.",
        title: "Warning!",
        confirmButtonText: "확인",
      });

      return { isValid: false };
    }
    
    if ( _f == 1 ) {
      let vals = $(`#TB08050S_F008, #TB08050S_rkfrDt, #TB08050S_feeRcivAmt, #TB08050S_prufIsuDt, #TB08050S_rctmDt`)
                    .map(function(){return $(this).val().trim()}).get();
      let bValid = vals.some(val => val == '')
      console.log(vals)
      console.log(bValid);
      if (bValid) {
        Swal.fire({
          icon: "warning",
          html: `입력되지 않은 값이 존재합니다.`,
          title: "Warning!",
          confirmButtonText: "확인",
        });
        return { isValid: false };
      }
    }

    return { isValid: true, prdtCd };

  }

  $("#TB08050S_D006").change(function () {
    var value = $(this).val(); // value

    if (value === "3") {
      $("#TB08050S_rvseCnclRsonText").attr("disabled", true);
    } else {
      $("#TB08050S_rvseCnclRsonText").attr("disabled", false);
    }
  });

  function calulator(f) {
    let tot = 0;
    let _tot = 0;
    let feeAmt;
    switch (f) {
      case "fee":
        let feeStdrAmt = uncomma($("#TB08050S_eprzCrdlFeeStdrAmt").val()); // 수수료대상금액
        let feeRt = $("#TB08050S_feeRt").val(); // 수수료대상금액

        let num_feeStdrAmt = Number(feeStdrAmt);
        let flt_feeRt = parseFloat(feeRt);
		
		tot = uncomma($("#TB08050S_feeAmt").val()); // 수수료금앢		
		if(Number(tot)==0){		
        	tot = feeStdrAmt * (feeRt / 100);
		}
		
        $("#TB08050S_feeAmt").val(comma(Math.round(tot))); // 수수료금앢
        feeAmt = uncomma($("#TB08050S_feeAmt").val());

        let num_feeAmt = Number(feeAmt);

        _tot = num_feeStdrAmt + num_feeAmt;

        $("#TB08050S_tempTot").val(comma(_tot)); // 합계금액

        break;

      case "crry":
        feeAmt = uncomma($("#TB08050S_feeAmt").val());
        let aplcExchR = $("#TB08050S_aplcExchR").val(); // 적용환율
       // tot = feeAmt * (aplcExchR / 100);
		tot = feeAmt * (aplcExchR);

        $("#TB08050S_wcrcTrslTrFeeAmt").val(comma(tot.toFixed(2))); // 원화환산수수료

        break;

      default:
        break;
    }
  }

  // reBinding
  function reBdin_TB08050S() {
    $("#TB08050S_prcsEmpno").val($("#userEno").val()); // 처리자
    $("#TB08050S_prcsEmpnm").val($("#userEmpNm").val()); // 처리자
  }

  function resetMore() {
    prlnFee = "";	
    $("#TB08050S_feeSn").val(""); // 수수료일련번호
    $("#TB08050S_feeRcivDt").val(dateNull("")); // 수취일자 ? 수납일자
    $("#TB08050S_F004").prop("selectedIndex", 0); // 기업여신수수료종류코드
    $("#TB08050S_eprzCrdlFeeStdrAmt").val(0); // 기업여신수수료기준금액
    $("#TB08050S_feeRt").val(0); // 수수료율
    $("#TB08050S_feeAmt").val(0); // 수수료금액
    $("#TB08050S_feeTrgtCtns").val(""); // 수수료대상내용
    $("#TB08050S_actsCd").val(""); // 계정과목코드
    $(`input[name="TB08050S_feeTxtnYn"][value="N"]`).prop("checked", true); // 수수료과세여부
    $("#TB08050S_F006").prop("selectedIndex", 0); // 기업여신수수료인식구분코드
    $("#TB08050S_fnnrRcogStrtDt").val(dateNull("")); // 인식시작일자
    $("#TB08050S_fnnrRcogEndDt").val(dateNull("")); // 인식종료일자
    $("#TB08050S_F008").prop("selectedIndex", 0); // 자금구분코드
    $("#TB08050S_tempTot").val(0); //합계금액
      $("#TB08050S_aplcExchR").val("1.00"); // 적용환율
    $("#TB08050S_aplcExchR").prop("disabled",true);
    
    $("#TB08050S_I027").val("KRW"); // 적용환율
    $("#TB08050S_E027").prop("selectedIndex", 0); // 기업여신과세유형코드
    $("#TB08050S_feeRcivAmt").val(0); // 수수료수납금액구분코드
    $("#TB08050S_wcrcTrslTrFeeAmt").val(0); // 원화환산거래수수료금액
    $("#TB08050S_prufIsuDt").val(dateNull("")); // 증빙발행일자
    $("#TB08050S_splmTxa").val(0); // 부가세액
    $("#TB08050S_rctmDt").val(dateNull("")); // 입금일자
    $(`input[name="TB08050S_prcsCpltYn"][value="N"]`).prop("checked", true); // 수납완료여부
    $("#TB08050S_rkfrDt").val(dateNull("")); // 회계일자 ? 기산일자
    $("#TB08050S_prcsTm").val(""); //처리시간
  }


  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB08050S_prdtCd").val(prdtCd);
			$("#TB08050S_prdtNm").val(prdtNm);
      srch();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

  return {
	  init_TB08050S : init_TB08050S,
    srch : srch,
    reBdin_TB08050S: reBdin_TB08050S,
    resetMore: resetMore,
    calulator: calulator,
    save: save,
    getDealInfoFromWF: getDealInfoFromWF,
	  inputNumberChangeFunction_TB08050S:inputNumberChangeFunction_TB08050S,
  };
})();
