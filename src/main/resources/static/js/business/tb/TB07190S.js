const TB07190Sjs = (function () {
  let TB07190S_rowData = {};
  const TB07190S_dummyData = TB07190S_rowData;
  let TB07190S_rowIndx;
  let TB07190S_pqGridLength = 0;
  let selectBox;
  let selectBox1;
  let selectBox2;
  let grdSelect = {};


  $(document).ready(function () {
    // fnSelectBox();
    // createSelectTag();
    pqGrid();
	selBox();
	selectBoxSet_TB07190S();
	loginUserSet_TB07190S();
  });

   /*
   * 부서 셀렉트박스 세팅
   */
   function selectBoxSet_TB07190S() {
   	selectBox1 = getSelectBoxList("TB07190S", "D010", false);
   	dprtList = selectBox1.filter(function (item) {
   	  //부서코드 list
   	  return item.cmnsGrpCd === "D010";
   	});
     
   	dprtList.forEach((item) => {
   	  $("#TB07190S_dprtNm").append(
   		$("<option>", {
   		  value: item.cdValue,
   		  text: `${item.cdName}`,
   		})
   	  );
   	});
  }  
  
  /**
   * 코드박스
   */
  function selBox() {
      selectBox = getSelectBoxList(
        "TB07190S",
        "F004" + // 수수료종류코드 FEE_KND_CD
        "/F006" + // 수수료인식구분 FEE_RCOG_DCD
        "/E027" + // 과세유형구분코드 TXTN_TP_DCD
        "/F001" + // 수수료선후급구분코드 FEE_BNAP_DCD
        "/T006" + // 수수료과세여부 FEE_TXTN_YN
  	    "/A005" + // 계정과목코드
		"/E025" + // 거래종류코드
        "/I027", // 통화코드
        false
      );
	  
	  selectBox2 =getSelBoxCdFeeKndCd(); //수수료종류코드 리스트 전체 가져오기
	  
	  //수수료종류코드
	  selectBox2.forEach((item) => { 
	    $("#TB07190S_feeKndCd").append(
		  	$("<option>", {
		  	  value: item.feeKndCd,
		  	  text: `${item.feeName}`,
		  	})
		    );
	  	});
		
	  //계정과목코드
	  selectBox2.forEach((item) => { 
	    $("#TB07190S_actsCd").append(
	    	$("<option>", {
	    	  value: item.actsCd,
	    	  text: `${item.actName}`,
	    	})
	      );
	  	});	
	  
  	
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
  	  // 통화코드
  	  grdSelect.A005 = selectBox.filter((item) => item.cmnsGrpCd === "A005");
	  // 거래종류코드
	  grdSelect.E025 = selectBox.filter((item) => item.cmnsGrpCd === "E025");
	  
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

  function loginUserSet_TB07190S(){
    empNo = $('#userEno').val();     //직원명
    dprtCd = $('#userDprtCd').val(); //부서번호
    $("#TB07190S_dprtNm").val(dprtCd).prop("selected", true);
    $("#TB07190S_dprtCd").val(dprtCd);
  }
  
  /**
   * 부서명 변경시
   */

  $("#TB07190S_dprtNm").on("change", function () {
  var dprtCd = $(this).val();
  $("#TB07190S_dprtCd").val(dprtCd);
  }); 
 
  /*
   *  =====================OptionBox데이터 SET=====================
   */

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  pqGrid colModel
   */
  function TB07190S_colModelData() {
    const TB07190S_colModel1 = [
      {
        title: "딜번호",
        dataType: "string",
        dataIndx: "dealNo",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "딜명",
        dataType: "string",
        dataIndx: "dealNm",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
	  {
	    title: "종목코드",
	    dataType: "string",
	    dataIndx: "prdtCd",
	    halign: "center",
	    align: "center",
	    width: "110",
	    filter: { crules: [{ condition: "range" }] },
	  },
	  {
	    title: "종목명",
	    dataType: "string",
	    dataIndx: "prdtNm",
	    halign: "center",
	    align: "left",
	    width: "180",
	    filter: { crules: [{ condition: "range" }] },
	  },
	  {
	    title: "거래일자",
	    dataType: "string",
	    dataIndx: "trDt",
	    halign: "center",
	    align: "center",
	    width: "120",
	    filter: { crules: [{ condition: "range" }] },
	    render: function (ui) {
	      let result = ui.cellData;
	      result = formatDate(result);
	      return result;
	    },
	  },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actName",
        halign: "center",
        align: "left",
        width: "180",
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
        title: "기업체번호",
        dataType: "string",
        dataIndx: "ardyBzepNo",
        halign: "center",
        align: "left",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업체명",
        dataType: "string",
        dataIndx: "bzepName",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "약정일자",
        dataType: "string",
        dataIndx: "ctrcDt",
        halign: "center",
        align: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "약정만기일자",
        dataType: "string",
        dataIndx: "ctrcExpDt",
        halign: "center",
        align: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "약정금액",
        dataType: "string",
        dataIndx: "eprzCrdlCtrcAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업신용공여수수료종류코드",
        dataType: "string",
        dataIndx: "eprzCrdlFeeKndCd",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료명",
        dataType: "string",
        dataIndx: "feeName",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "예정일자",
        dataType: "string",
        dataIndx: "prarDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "수수료대상금액",
        dataType: "string",
        dataIndx: "feeStdrAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래일자",
        dataType: "string",
        dataIndx: "trDt",
        halign: "center",
        align: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "수수료금액",
        dataType: "string",
        dataIndx: "feeAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "할인율",
        dataType: "string",
        dataIndx: "dcRt",
        halign: "center",
        align: "right",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기산일자",
        dataType: "string",
        dataIndx: "rkfrDt",
        halign: "center",
        align: "center",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "기업신용공여거래종류코드",
        dataType: "string",
        dataIndx: "etprCrdtGrntTrKindCd",
        halign: "center",
        align: "left",
        width: "120",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "회계단위업무코드",
        dataType: "string",
        dataIndx: "actgAfrsCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "IFRS수수료인식구분코드",
        dataType: "string",
        dataIndx: "ifrsFeeRcogDcd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업부수수료인식구분코드",
        dataType: "string",
        dataIndx: "eprzCrdlFeeRcogDcd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료과세여부",
        dataType: "string",
        dataIndx: "feeTxtnYn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업부수수료과세여부",
        dataType: "string",
        dataIndx: "busiNmcpCplTxtnYn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "재무이연비율",
        dataType: "string",
        dataIndx: "fnnrPrlnRto",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "재무인식시작일자",
        dataType: "string",
        dataIndx: "fnnrRcogStrtDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "재무인식종료일자",
        dataType: "string",
        dataIndx: "fnnrRcogEndDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "재무이연기간일수",
        dataType: "string",
        dataIndx: "fnnrPrlnPrdDnum",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "일시인식금액",
        dataType: "string",
        dataIndx: "dtmRcogAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이연수수료금액",
        dataType: "string",
        dataIndx: "prlnFee",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리이연비율",
        dataType: "string",
        dataIndx: "mngmPrlnRto",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리인식시작일자",
        dataType: "string",
        dataIndx: "mngmRcogStrtDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "관리인식종료일자",
        dataType: "string",
        dataIndx: "mngmRcogEndDt",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let result = ui.cellData;
          result = formatDate(result);
          return result;
        },
      },
      {
        title: "관리이연기간일수",
        dataType: "string",
        dataIndx: "mngmPrlnPrdDnum",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리일시인식금액",
        dataType: "string",
        dataIndx: "mngmDtmRcogAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리이연수수료금액",
        dataType: "string",
        dataIndx: "mngmPrlnFee",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "실행순번",
        dataType: "string",
        dataIndx: "excSn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료순번",
        dataType: "string",
        dataIndx: "feeSn",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "통화코드",
        dataType: "string",
        dataIndx: "crncyCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산율1",
        dataType: "string",
        dataIndx: "wcrcTrslRt",
        halign: "center",
        align: "right",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "원화환산거래수수료금액",
        dataType: "string",
        dataIndx: "wcrcTrslTrFeeAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래상태코드",
        dataType: "string",
        dataIndx: "trStatCd",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "조작상세일시",
        dataType: "string",
        dataIndx: "hndDetlDtm",
        halign: "center",
        align: "center",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "조작직원번호",
        dataType: "string",
        dataIndx: "hndEmpno",
        halign: "center",
        align: "left",
        width: "180",
        filter: { crules: [{ condition: "range" }] },
      },
      // , {
      //     title: "기안문서번호",
      //     dataType: "string",
      //     dataIndx:
      //     halign: "center",
      //     align: "left",
      //     width: "180",
      //     filter: { crules: [{ condition: 'range' }] }
      // }
    ];

    return TB07190S_colModel1;
  }

  /*
   *  PQGRID SETTING
   */
  function pqGrid() {
    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 360,
        maxHeight: 360,
        id: "TB07190S_colModel1",
        colModel: TB07190S_colModelData(),
        scrollModel: { autoFit: false },
        editable: false,
        // , rowClick: function (event, ui) {
        //     if (TB07190S_rowData === ui.rowData) {
        //         TB07190S_rowData = TB07190S_dummyData;
        //     } else {
        //         TB07190S_rowData = ui.rowData;
        //     }
        // }
        // , selectionModel: { type: 'row' }
      },
    ];
    setPqGrid(pqGridObjs);
    $("#TB07190S_colModel1").pqGrid("instance");
  }

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  ====================PQGRID변환====================
   */

  /*
   *  PQGRID 초기화
   */
  function TB07190S_resetPqGrid(colModelId) {
    colModelIdSelector(colModelId).pqGrid("option", "dataModel.data", []);
    colModelIdSelector(colModelId).pqGrid("refreshDataAndView");
  }

  /*
   *  PQGRID 아이디 선택
   */
  const colModelIdSelector = (colModelId) => {
    return $(`#${colModelId}`);
  };
  /*
   *  =====================PQGRID=====================
   */

  /*
   *  =====================SELECT모음=====================
   */

  /*
   *  SELECT 수수료종류
   * 조회 버튼
   */
  function getData() {
    let result;

    let paramData = {
      actsCd: $("#TB07190S_actsCd").val(),			//계정과목
      etprCrdtGrntTrKindCd: $("#TB07190S_etprCrdtGrntTrKindCd").val(), //거래종류
	  feeKndCd: $("#TB07190S_feeKndCd").val(), //수수료종류
      trStatCd: $("#TB07190S_trStatCd").val(), //거래상태
      dealNo: $("#TB07190S_ibDealNo").val(),   // 딜번호
      ardyBzepNo: $("#TB07190S_ardyBzepNo").val(), //기업체번호
	  strYmd : $("#TB07190S_strYmd").val().replaceAll("-", ""), //시작일자
	  endYmd : $("#TB07190S_endYmd").val().replaceAll("-", ""), //종료일자
	  dprtCd : $("#TB07190S_dprtCd").val(), //부서코드
    };

    $.ajax({
      type: "POST",
      url: "/TB07190S/getTB07190SData",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        if (data) {
          result = 1;
          let grid = $("#TB07190S_colModel1").pqGrid("instance");
          grid.setData(data);
          grid.getData();
          TB07190S_pqGridLength = grid.pdata.length;
        } else {
          result = -1;
          Swal.fire({
            icon: "warning",
            text: "정보가 없습니다!",
          });
        }
      },
      error: function () {
        result = -2;
        Swal.fire({
          icon: "error",
          text: "정보가 없습니다!",
        });
      },
    });
  }

  /*
   *  =====================SELECT모음=====================
   */

  // function insertFeeData() {

  //     let result;

  //     let param = $('#feeData input, #feeData select');
  //     let paramData = {};

  //     param.each(function () {
  //         let id = $(this).attr('id');
  //         let value = $(this).val();

  //         if (value === "") {
  //             // select 태그 바로 위에 있는 label 태그를 찾음
  //             let labelElement = $(this).closest('.input-group').prev('label');

  //             // label의 텍스트 가져오기
  //             let labelText = labelElement.text();

  //             if (labelText === "") {

  //             } else {
  //                 // 경고 메시지 출력
  //                 alert(labelText + '을(를) 입력해주세요!');
  //                 return false;
  //             }
  //         }
  //         paramData[id] = value;
  //     })

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BInsert",
  //         contentType: "application/json; charset=UTF-8",
  //         dataType: "json",
  //         data: JSON.stringify(paramData),
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     // if (result != 1) {
  //     //     Swal.fire({
  //     //         icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //     //         text: '정보가 없습니다!'
  //     //     })
  //     // }
  // }

  // function updateFeeData() {

  //     let result;

  //     let _미정 = $('').val();

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BUpdate",
  //         contentType: "application/json; charset=UTF-8",
  //         data: _미정,
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     if (result != 1) {
  //         Swal.fire({
  //             icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //             text: '정보가 없습니다!'
  //         })
  //     }
  // }

  /*
   *  =====================DELETE모음=====================
   */

  // function deleteFeeData() {

  //     let result;

  //     let _미정 = $('').val();

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07190S/IBIMS421BDelete",
  //         contentType: "application/json; charset=UTF-8",
  //         data: _미정,
  //         success: function (data) {
  //             if (data) {
  //                 let grid = $('#TB07190S_colModel').pqGrid('instance');
  //                 grid.setData(data);
  //                 grid.getData();
  //                 TB07190S_pqGridLength = grid.pdata.length;
  //                 result = 1;
  //             } else {
  //                 result = -1;
  //             }
  //         }, error: function () {
  //             result = -2;
  //         }
  //     });

  //     if (result != 1) {
  //         Swal.fire({
  //             icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
  //             text: '정보가 없습니다!'
  //         })
  //     }
  // }

  /*
   *  =====================DELETE모음=====================
   */

  return {
    getData: getData,
	selectBoxSet_TB07190S:selectBoxSet_TB07190S,
	selBox:selBox,
	getSelBoxCdFeeKndCd:getSelBoxCdFeeKndCd,
	loginUserSet_TB07190S:loginUserSet_TB07190S,
	TB07190S_colModelData:TB07190S_colModelData,
	pqGrid:pqGrid,
	TB07190S_resetPqGrid:TB07190S_resetPqGrid,
	colModelIdSelector:colModelIdSelector,
  };
})();
