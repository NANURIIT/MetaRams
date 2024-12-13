const TB05030Sjs = (function(){

  let arrPqGridCaseInfo; // 안건정보
  let arrPqGridMmbrInfo; // 의결내용
  let arrPqGridIbDealInfo; // 협의결과

  $(document).ready(function () {
    touchSpin(); // 결의년도 좌우 가산
    loadSelectBoxContents(); // 셀렉트박스 정보 취득
    SB_inspctCnfrncCcd(); // 전결협의체 셀렉트박스 변경
    tableFunction();
    compControl();
    // 이번년도
    let getYr = getToday().substring(0, 4);
    // 결의년도 이번년도로 세팅
    $("#TB05030S_stdYr").val(getYr);
    getCNFRNCList();
    rendorGrid();
    setTimeout(() => {
      loadAprvOpstnCcd(); // 찬반구분코드
      loadRsltnRsltCd(); //의결코드
    }, 100);
  });
  
  function chnginspctCnfrncSqcSq (e) {
    $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
    $("#gridCaseInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
    $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
    $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
    $("#gridIbDealInfo").pqGrid("refreshDataAndView");						// pqgrid 초기화
  }
  
  // 그리드 렌더링함수
  function rendorGrid() {
    /** 그리드 **/
    let arrPqGridObj = [
      // 안건
      {
        height: 150,
        maxHeight: 150,
        id: "gridCaseInfo",
        colModel: colCaseInfo,
      },
      // 협의결과
      {
        height: 80,
        maxHeight: 80,
        id: "gridIbDealInfo",
        colModel: colIbDealInfo,
      },
    ];
    setPqGrid(arrPqGridObj);
  
    arrPqGridCaseInfo = $("#gridCaseInfo").pqGrid("instance");
    arrPqGridIbDealInfo = $("#gridIbDealInfo").pqGrid("instance");
  }
  
  // 결의년도 input change이벤트
  function fnStdYrChng(obj) {
    $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
    $("#gridCaseInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
    $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
    $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
    $("#gridIbDealInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
  
    $("#TB05030S_R025 option:eq(0)").prop("selected", true);
    $("#TB05030S_invstCrncyCdNm").val("");
    $("#TB05030S_rcgAmt").val("");
    $("#TB05030S_sdnCndtF option:eq(0)").prop('selected', true);
    $("#TB05030S_etcCndtF option:eq(0)").prop('selected', true);
  
    $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
    $("#TB05030S_rsltCntnt").val("");
  
    let cnsbDcd = $("#TB05030S_R016").val(); // 결의협의체
    let inspctCnfrncSqcSq = $("#TB05030S_inspctCnfrncSqcSq").val(); // 회차
    let rsltnYr = obj.value; // 결의년도
    let chkF = ""; // 종료건포함여부
    if (obj.value.length === 4 && !isEmpty(cnsbDcd)) {
      getCNFRNCList(); // 회차조회 이벤트 호출
      if (!isEmpty(inspctCnfrncSqcSq)) {
        if ($("#TB05030S_chkF:checked").length > 0) {
          chkF = "Y";
        } else {
          chkF = "N";
        }
  
        let paramData = {};
  
        paramData.cnsbDcd = cnsbDcd;
        paramData.inspctCnfrncSqcSq = inspctCnfrncSqcSq;
        paramData.rsltnYr = rsltnYr;
        paramData.chkF = chkF;
        // 안건 조회 이벤트 호출
        getCASEInfo(paramData);
      }
    }
  }
  
  //TouchSpin
  function touchSpin() {
    $(".touchspin").TouchSpin({
      verticalbuttons: true,
      buttondown_class: "btn btn-white",
      buttonup_class: "btn btn-white",
    });
  }
  
  // 셀렉트박스 정보 취득
  function loadSelectBoxContents() {
    getSelectBoxList("TB05030S", "R016/C003/R025");
    // 결의협의체 input 세팅
    
  }
  
  function loadAprvOpstnCcd() {
    var codeList = {
      codeList: "A012",
    };
  
    $.ajax({
      type: "GET",
      url: "/getSelectBoxList",
      data: codeList,
      dataType: "json",
      success: function (data) {
        aprvOppsDcd = data;
      },
    });
  }
  function loadRsltnRsltCd () {
    var codeList = {
      codeList: "R025",
    };
  
    $.ajax({
      type: "GET",
      url: "/getSelectBoxList",
      data: codeList,
      dataType: "json",
      success: function (data) {
        let colMmbrInfo = [
          {
            title: "",
            dataType: "string",
            dataIndx: "MMBRChk",
            align: "center",
            editable : true,
            filter: { crules: [{ condition: "range" }] },
            editor: false,
            type : 'checkBoxSelection',
            cb: {
              all: true,
              header: true,
              check: "Y",
              uncheck: "N"
            }
          },
          {
            title: "참석자",
            dataType: "string",
            dataIndx: "atdcTrgtEmpno",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
          },
          {
            title: "참석위원",
            dataType: "string",
            dataIndx: "atdcTrgtEmpnm",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
          },
          {
            title: "대리참석자사번",
            dataType: "string",
            dataIndx: "atdcAngtEmpno",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
          },
          {
            title: "대리참석자",
            dataType: "string",
            dataIndx: "atdcAngtEmpnm",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
          },
          {
            title: "참석여부",
            dataType: "string",
            dataIndx: "atdcYn",
            halign : "center",
            align: "center",
            editable : true,
            filter: { crules: [{ condition: "range" }] },
            editor: {
              type: "select",
              options: ['Y','N']
            }
          },
          {
            title: "의결",
            dataType: "string",
            dataIndx: "aprvOppsDcd",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true
          },
          {
            title: "의결",
            dataType: "string",
            dataIndx: "aprvOppsDcdNm",
            halign : "center",
            align: "center",
            editable : true,
            filter: { crules: [{ condition: "range" }] },
            editor: {
              type: "select",
              valueIndx: "cdValue",
              labelIndx: "cdName",
              options: data
            },
            render: function (ui) {
              var options = data;
              var option = options.find(opt => opt.cdValue == ui.cellData);
              return option ? option.cdName : ui.cellData;
            },
          },
          {
            title: "심의의견",
            dataType: "string",
            dataIndx: "opnnCtns",
            halign : "center",
            align: "left",
            editable : true,
            filter: { crules: [{ condition: "range" }] },
            editor : {type : 'textarea'}
          },
          {
            title: "등록년월일",
            dataType: "date",
            dataIndx: "opnnRgstDt",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            render   : function (ui) {
              let cellData = ui.cellData;
              if (cellData && cellData.length !== 0) {
                let cnsbOpnDt1 = cellData.substring(0, 4);
                let cnsbOpnDt2 = cellData.substring(4, 6);
                let cnsbOpnDt3 = cellData.substring(6, 8);
                return `${cnsbOpnDt1}-${cnsbOpnDt2}-${cnsbOpnDt3}`.trim();
              }
              return cellData; 
            }
          },
          {
            title: "회의록확인",
            dataType: "string",
            dataIndx: "",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true,
          },
          {
            title: "확인자",
            dataType: "string",
            dataIndx: "",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true,
          },
          {
            title: "확인일시",
            dataType: "date",
            dataIndx: "", 
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true,
          },
          {
            title: "위원회멤버구분코드",
            dataType: "string",
            dataIndx: "atdcTrgtDcd",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true
          },
          {
            title: "일련번호",
            dataType: "string",
            dataIndx: "sn",
            halign : "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            hidden : true
          },
        ];      
              // 의결내용
            let obj = {
              height: 150,
              maxHeight: 150,
              showTitle: false,
              showToolbar: false,
              collapsible: false,
              wrap: false,
              hwrap: false,
              numberCell: { show: false },
              editable: false,
              //toolbar: toolbar,
              scrollModel: { autoFit: true },
              colModel: colMmbrInfo,
              strNoRows: '데이터가 없습니다.'
            }
            $("#gridMmbrInfo").pqGrid(obj);
            arrPqGridMmbrInfo = $("#gridMmbrInfo").pqGrid('instance');
      },
    });
  }
  
  // 컴포넌트 컨트롤
  function compControl() {
    // 의결내용 버튼 비활성
    //$(".ibox-tools .btn-success").prop("disabled", true);
    //$(".ibox-tools .btn-danger").prop("disabled", true);
  }
  
  // 결의협의체 셀렉트박스 변경
  function SB_inspctCnfrncCcd() {
    $("#TB05030S_R016").change(function () {
      getCNFRNCList();
    });
  }
  
  // 협의체 회차 목록조회
  function getCNFRNCList() {
    var cnsbDcd = $("#TB05030S_R016").val();
    // 결의협의체 select list 세팅후 0번째 값에 selected가 들어가지않음 일단 강제로 리스크관리위원회 로 세팅..
    if (isEmpty(cnsbDcd)) cnsbDcd = 1;
    var rsltnYr = $("#TB05030S_stdYr").val();
    var paramData = {
      cnsbDcd: cnsbDcd,
      rsltnYr: rsltnYr,
    };
  
    $.ajax({
      type: "GET",
      url: "/TB05010S/getCNFRNCList",
      data: paramData,
      dataType: "json",
      success: function (data) {
        var html = "";
  
        if (0 < data.length) {
          $.each(data, function (key, value) {
            html += "<option>" + value.sn + "</option>";
          });
        }
        $("#TB05030S_inspctCnfrncSqcSq").html(html);
      },
    });
  }
  
  // 테이블 이벤트등록
  function tableFunction() {
    MMBRChk(); // 위원정보 테이블 체크박스 이벤트 설정
    CASEChk(); // 안건정보 테이블 체크박스 이벤트 설정
  }
  
  // 위원정보 테이블 체크박스 이벤트 설정
  function MMBRChk() {
    $("#MMBRChk").change(function () {
      if ($("#MMBRChk").is(":checked")) {
        $(".MMBRChk").prop("checked", true);
      } else {
        $(".MMBRChk").prop("checked", false);
      }
    });
  }
  
  // 안건정보 테이블 체크박스 이벤트 설정
  function CASEChk() {
    $("#CASEChk").change(function () {
      if ($("#CASEChk").is(":checked")) {
        $(".CASEChk").prop("checked", true);
      } else {
        $(".CASEChk").prop("checked", false);
      }
    });
  }
  
  function searchCNFRNC() {
    var cnsbDcd = $("#TB05030S_R016").val(); // 결의협의체
    var rsltnYr = $("#TB05030S_stdYr").val(); // 결의년도
    var cnsbSq = $("#TB05030S_inspctCnfrncSqcSq").val(); // 회차
  
    if ($("#TB05030S_chkF:checked").length > 0) {
      chkF = "Y";
    } else {
      chkF = "N";
    }
  
    var paramData = {
      cnsbDcd: cnsbDcd,
      rsltnYr: rsltnYr,
      cnsbSq: cnsbSq,
      chkF: chkF,
    };
  
    if (isEmpty(cnsbDcd)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "결의협의체 정보를 확인해주세요",
        confirmButtonText: "확인",
      });
      return;
    }
  
    if (isEmpty(rsltnYr)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "결의년도 정보를 확인해주세요",
        confirmButtonText: "확인",
      });
      return;
    }
  
    if (isEmpty(cnsbSq)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "협의체 회차 정보가 없습니다.",
        confirmButtonText: "확인",
      });
      return;
    }
  
    businessFunction();
  
    // 안건정보 가져오기
    function businessFunction() {
      getCASEInfo(paramData);
    }
  }
  
  function getCASEInfo(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05030S/getCASEInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridCaseInfo.setData(data);
        arrPqGridCaseInfo.option("rowDblClick", function (event, ui) {
    
      /******  딜공통 파일첨부 추가 ******/ 
      
  
      $('#key1').val(ui.rowData.cnsbDcd+'-'+ui.rowData.cnsbSq+'-'+ui.rowData.rsltnYr+'-'+ui.rowData.sn);
      
      //alert($('#key1').val());
      getFileInfo($('#key1').val(),'*');
      /******  딜공통 파일첨부 추가 ******/ 
          CNFRNCDetail(ui.rowData);
          // 	html += '<tr ondblclick="CNFRNCDetail(this);">';
          // 		html += '<td style="display:none;">' + value.cnsbDcd + '</td>';
          // 		html += '<td style="display:none;">' + value.rsltnYr + '</td>';
          // 		html += '<td class="text-center">' + value.cnsbDcdNm + '</td>';
          // 		html += '<td class="text-center">' + value.cnsbSq + '</td>';
          // 		html += '<td class="text-center">' + value.sn + '</td>';
          // 		html += '<td style="display:none;">' + value.dealNo + '</td>';
          // 		html += '<td>' + value.mtrNm + '</td>';
          // 		html += '<td>' + value.ptfdCrryCdNm + '</td>';
          // 		html += '<td class="text-right">' + addComma(value.ptfdAmt)	+ '</td>';
          // 		html += '<td class="text-center">' + formatDate(value.cnsbOpnDt) + '</td>';
          // 		html += '<td class="text-center">' + value.cnsbOpnTm + '</td>';
          // 		html += '<td class="text-center">' + value.dprtNm + '</td>';
          // 		html += '<td class="text-center">' + value.chrgPEnm + '</td>';
          // 		html += '<td class="text-center">' + value.ownPEnm	+ '</td>';
          // 		html += '<td>' + value.mtrPrgSttsDcdNm + '</td>';
          // 		html += '<td style="display:none;">' + value.jdgmDcd + '</td>';
          // 		html += '<td style="display:none;">' + value.mtrDcd + '</td>';
          // 		html += '<td style="display:none;">' + value.mtrPrgSttsDcd + '</td>';
          // 	html += '</tr>';
        });
  
        // $("#TB05030S_MMBRInfo").html("");
        // $("#TB05030S_IBDEALInfo").html("");
        // $("#TB05030S_R025").val("");
        // $("#TB05030S_invstCrncyCdNm").val("");
        // $("#TB05030S_rcgAmt").val("");
        // $("#TB05030S_sdnCndtF").val("");
        // $("#TB05030S_etcCndtF").val("");
        // $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
        // $("#TB05030S_rsltCntnt").val("");
      },
      error: function () {
        // $("#TB05030S_MMBRInfo").html("");
        // $("#TB05030S_IBDEALInfo").html("");
        // $("#TB05030S_R025").val("");
        // $("#TB05030S_invstCrncyCdNm").val("");
        // $("#TB05030S_rcgAmt").val("");
        // $("#TB05030S_sdnCndtF").val("");
        // $("#TB05030S_etcCndtF").val("");
        // $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
        // $("#TB05030S_rsltCntnt").val("");
      },
    });
  }
  
  function CNFRNCDetail(e) {
    let cnsbDcd = e.cnsbDcd;
    let rsltnYr = e.rsltnYr;
    let cnsbSq = e.cnsbSq;
    let sn = e.sn;
    /* 20240621 딜번호추가 */
    let dealNo = e.dealNo;
  
    var paramData = {
      cnsbDcd: cnsbDcd,
      rsltnYr: rsltnYr,
      cnsbSq: cnsbSq,
      sn: sn,
      dealNo: dealNo,
      mtrPrgSttsDcd : e.mtrPrgSttsDcd
    };
    // 협의체 준비확정인 안건만 의결내용 저장가능.
    if (e.mtrPrgSttsDcd === '304') {
        $("#saveMmbrConfirm").prop('disabled', false);
        $("#btnConfirmDeal").prop('disabled', false);
        $("#btnCancelDeal").prop('disabled', true);
    } else if (Number(e.mtrPrgSttsDcd) > 304) {
        $("#saveMmbrConfirm").prop('disabled', true);
        $("#btnConfirmDeal").prop('disabled', true);
        $("#btnCancelDeal").prop('disabled', false);
    }
    else if (Number(e.mtrPrgSttsDcd) > 400) {
      $("#saveMmbrConfirm").prop('disabled', true);
      $("#btnConfirmDeal").prop('disabled', true);
      $("#btnCancelDeal").prop('disabled', true);
    }
  
    $("#fileIbDealNo").val("M" + cnsbDcd + "0000000000");
    $("#fileRiskInspctCcd").val(rsltnYr.substring(2, 4));
    $("#fileLstCCaseCcd").val(("0" + cnsbSq).slice(-2));
  
    getMMBRInfo(paramData);
    getIBDEALInfo(paramData);
    //getFileInfo();
  }
  
  function getMMBRInfo(paramData) {
    var MMBRCount = 0;
  
    $.ajax({
      type: "GET",
      url: "/TB05030S/getMMBRInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridMmbrInfo.setData(data);
  
        //var html = "";
        //var MMBRInfo = data;
        // if (MMBRInfo.length > 0) {
        //   $.each(MMBRInfo, function (key, value) {
        //     html += "<tr>";
        //     html +=
        //       '<td style="vertical-align: middle;"><input type="checkbox" class="MMBRChk"></td>'; // 체크
        //     html += '<td class="text-center">' + value.atdcTrgtEmpno + "</td>"; // 참석자번호
        //     html += '<td class="text-center">' + value.atdcTrgtEmpnm + "</td>"; // 참석자성명
        //     html += '<td class="text-center">' + value.atdcAngtEmpno + "</td>"; // 대리참석자번호
        //     html += '<td class="text-center">' + value.atdcAngtEmpnm + "</td>"; // 대리참석자성명
        //     if (isEmpty(value.atdcYn)) {
        //       html += '<td><select class="form-control">';
        //       html += '<option value="Y">Y</option>';
        //       html += '<option value="N">N</option>';
        //       html += "</select></td>";
        //     } else {
        //       html += '<td class="text-center">' + value.atdcYn + "</td>"; // 참석여부
        //     }
        //     if (isEmpty(value.aprvOppsDcd)) {
        //       MMBRCount++;
        //       html += '<td><select class="form-control">';
        //       $.each(aprvOppsDcd, function (key, value) {
        //         html +=
        //           '<option value="' +
        //           value.cdValue +
        //           '">' +
        //           value.cdName +
        //           " (" +
        //           value.cdValue +
        //           ")" +
        //           "</option>";
        //       });
        //       html += "</select></td>";
        //     } else {
        //       html += "<td>" + value.aprvOppsDcdNm + "</td>"; // 의결
        //     }
        //     if (isEmpty(value.opnnCtns)) {
        //       html +=
        //         "<td>" + '<input type="text" class="form-control">' + "</td>";
        //     } else {
        //       html += "<td>" + value.opnnCtns + "</td>"; // 심의의견
        //     }
        //     html +=
        //       '<td class="text-center">' + formatDate(value.opnnRgstDt) + "</td>"; // 등록년월일
        //     html += "<td></td>"; // 확인자
        //     html += "<td></td>"; // 확인일시
        //     html += '<td style="display:none;">' + value.atdcTrgtDcd + "</td>"; // 위원회멤버구분코드
        //     html += '<td style="display:none;">' + value.sn + "</td>"; // 일련번호
        //     html += "</tr>";
        //   });
        // }
        // $("#TB05030S_MMBRInfo").html(html);
  
        // if (isNotEmpty($("#TB05030S_CASEInfo tr").first().children().eq(16).text()) && Number($("#TB05030S_CASEInfo tr").first().children().eq(16).text()) < 401) {
        //   if (MMBRCount === 0) {
        //     if (
        //       Number(
        //         $("#TB05030S_CASEInfo tr").first().children().eq(16).text()
        //       ) > 304
        //     ) {
        //       $(".ibox-tools .btn-success").prop("disabled", true);
        //       $(".ibox-tools .btn-danger").prop("disabled", true);
        //     } else {
        //       $(".ibox-tools .btn-success").prop("disabled", true);
        //       $(".ibox-tools .btn-danger").prop("disabled", false);
        //     }
        //   } else if (MMBRCount !== 0 && MMBRCount < data.length) {
        //     $(".ibox-tools .btn-success").prop("disabled", false);
        //     $(".ibox-tools .btn-danger").prop("disabled", false);
        //   } else if (MMBRCount === data.length) {
        //     $(".ibox-tools .btn-success").prop("disabled", false);
        //     $(".ibox-tools .btn-danger").prop("disabled", true);
        //   }
        // } else {
        //   $(".ibox-tools .btn-success").prop("disabled", true);
        //   $(".ibox-tools .btn-danger").prop("disabled", true);
        // }
      },
      error: function () {
        var html = "";
        $("#TB05030S_MMBRInfo").html(html);
      },
    });
  }
  
  
  function getIBDEALInfo(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05030S/getIBDEALInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridIbDealInfo.setData(data);
        // var html = "";
        // $("#TB05030S_IBDEALInfo").html(html);
        //  var IBDEALInfo = data;
        //  if (IBDEALInfo.length > 0) {
        //    $.each(IBDEALInfo, function (key, value) {
        //     //  html += "<tr>";
        //     //  html += "<td>" + value.mtrNm + "</td>"; // 안건명
        //     //  html += "<td>" + value.jdgmDcdNm + "</td>"; // 신규/재부의
        //     //  html += "<td>" + value.ptfdCrryCdNm + "</td>"; // 통화코드명
        //     //  html += '<td class="text-right">' + addComma(value.ptfdAmt) + "</td>"; // 참여금액
        //     //  html += "<td>" + value.rsltnRsltCdNm + "</td>"; // 결의결과코드명
        //     //  html += '<td class="text-right">' + addComma(value.apvlAmt) + "</td>"; // 승인금액
        //     //  html += '<td class="text-center">' + value.sdnCndtF + "</td>"; // 셀다운여부
        //     //  html += '<td class="text-center">' + value.etcCndtF + "</td>"; // 기타여부
        //     //  html += '<td class="text-center">' + value.riskRcgNo + "</td>"; // 리스크승인번호
        //     //  html += '<td style="display: none">' + value.dealNo + "</td>"; // 딜번호
        //     //  html += '<td style="display: none">' + value.jdgmDcd + "</td>"; // 심사구분코드
        //     //  html += '<td style="display: none">' + value.mtrDcd + "</td>"; // 안건구분코드
        //     //  html += "</tr>";
  
      $("#TB05030S_R025").val(data[0].rsltnRsltCd).attr("selected", true);
      $("#TB05030S_invstCrncyCdNm").val(data[0].ptfdCrryCdNm);
      $("#TB05030S_rcgAmt").val(data[0].apvlAmt ? addComma(data[0].apvlAmt) : "");
      $("#TB05030S_sdnCndtF").val(data[0].sdnCndtF).attr("selected", true);
      $("#TB05030S_etcCndtF").val(data[0].etcCndtF).attr("selected", true);
      $("#TB05030S_cnfrncNtmCndtlCntnt").val(data[0].sdnCndtCtns);
      $("#TB05030S_rsltCntnt").val(data[0].etcCndtCtns);
  
        //      if (
        //        Number(
        //          $("#TB05030S_CASEInfo tr").first().children().eq(16).text()
        //        ) < 401
        //      ) {
        //        if (Number(value.mtrPrgSttsDcd) == 304) {
        //          $(".pb-2 .btn-success").prop("disabled", false);
        //          $(".pb-2 .btn-danger").prop("disabled", true);
        //        } else if (
        //          Number(value.mtrPrgSttsDcd) > 305 &&
        //          Number(value.mtrPrgSttsDcd) < 501
        //        ) {
        //          $(".pb-2 .btn-success").prop("disabled", true);
        //          $(".pb-2 .btn-danger").prop("disabled", false);
        //        } else {
        //          $(".pb-2 .btn-success").prop("disabled", true);
        //          $(".pb-2 .btn-danger").prop("disabled", true);
        //        }
        //      } else {
        //        $(".pb-2 .btn-success").prop("disabled", true);
        //        $(".pb-2 .btn-danger").prop("disabled", true);
        //      }
        //    });
        //  }
        // $("#TB05030S_IBDEALInfo").html(html);
      },
      error: function () {
      },
    });
  }
  
  function MMBRConfirm(mode) {
    updateMMBRInfo(mode);
  }
  
  function updateMMBRInfo(mode) {
    let mmbrList = [];
    let checkList = [];
    let selectedDealOption = false;
    for (let i = 0; i < arrPqGridMmbrInfo.pdata.length; i++) {
      let checkedRows = arrPqGridMmbrInfo.pdata[i];
      if (checkedRows.MMBRChk == 'Y') {
        checkList.push(checkedRows);
      }
    }
    checkList.forEach(function (row) {
      let obj = {};
      if (checkList.length > 0) {
        if (mode === 'confirm') {
            selectedDealOption = true;
            obj.mode = mode
            obj.cnsbDcd = row.cnsbDcd
            obj.rsltnYr = $("#TB05030S_stdYr").val()
            obj.cnsbSq = row.cnsbSq
            obj.sn = row.sn
            obj.atdcYn =row.atdcYn
            obj.aprvOppsDcd = row.aprvOppsDcdNm;
            obj.opnnCtns = row.opnnCtns
            obj.opnnRgstDt = row.opnnRgstDt
            mmbrList.push(obj);
        } else {
            selectedDealOption = false;
            obj.mode = mode
            obj.cnsbDcd = row.cnsbDcd
            obj.rsltnYr = row.rsltnYr
            obj.cnsbSq = row.cnsbSq
            obj.sn = row.sn
            mmbrList.push(obj);
        }
      }
    });
    
    // $("#TB05030S_MMBRInfo tr").each(function () {
    //   var tr = $(this);
    //   var td = tr.children();
  
    //   if (td.eq(0).find("input").is(":checked")) {
    //     selectedDealOption = true;
    //     var object = {};
    //     // 확정 confirm
    //     if (mode === "confirm") {
    //       object.mode = mode;
    //       object.cnsbDcd = selectedTd.eq(0).text();
    //       object.rsltnYr = selectedTd.eq(1).text();
    //       object.cnsbSq = selectedTd.eq(3).text();
    //       object.sn = td.eq(12).text();
    //       object.atdcYn = td.eq(5).find("select").val();
    //       object.aprvOppsDcd = td.eq(6).find("select").val();
    //       object.opnnCtns = td.eq(7).find("input").val();
    //       object.opnnRgstDt = getToday().replaceAll("-", "");
  
    //       MMBRList.push(object);
    //       // 확정취소 cancel
    //     } else {
    //       object.mode = mode;
    //       object.cnsbDcd = selectedTd.eq(0).text();
    //       object.rsltnYr = selectedTd.eq(1).text();
    //       object.cnsbSq = selectedTd.eq(3).text();
    //       object.sn = td.eq(12).text();
  
    //       MMBRList.push(object);
    //     }
    //   }
    // });
  
    if (selectedDealOption === true) {
      $.ajax({
        type: "POST",
        url: "/TB05030S/updateMMBRInfo",
        contentType: "application/json",
        data: JSON.stringify(mmbrList),
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "의결 내용을 변경하였습니다.",
            confirmButtonText: "확인",
          }).then(() => {
            $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
            $("#gridCaseInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
            $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
            $("#gridMmbrInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
            $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
            $("#gridIbDealInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
          
            $("#TB05030S_R025 option:eq(0)").prop("selected", true);
            $("#TB05030S_invstCrncyCdNm").val("");
            $("#TB05030S_rcgAmt").val("");
            $("#TB05030S_sdnCndtF option:eq(0)").prop('selected', true);
            $("#TB05030S_etcCndtF option:eq(0)").prop('selected', true);
          
            $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
            $("#TB05030S_rsltCntnt").val("");
            searchCNFRNC();
          });
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "선택된 의결 내용이 없습니다.",
        confirmButtonText: "확인",
      });
    }
  }
  
  function ibDealConfirm(mode) {
    var cnsbDcd = arrPqGridIbDealInfo.pdata[0].cnsbDcd;
    var rsltnYr = $("#TB05030S_stdYr").val();
    var cnsbSq  = arrPqGridIbDealInfo.pdata[0].cnsbSq;
    var sn      = arrPqGridIbDealInfo.pdata[0].sn;
    var dealNo  = arrPqGridIbDealInfo.pdata[0].dealNo;
    var jdgmDcd = arrPqGridIbDealInfo.pdata[0].jdgmDcd;
    var mtrDcd  = arrPqGridIbDealInfo.pdata[0].mtrDcd;
    var mtrPrgSttsDcd = "";
    var apvlAmt = "";
    var sdnCndtF = "";
    var etcCndtF = "";
    var sdnCndtCtns = "";
    var etcCndtCtns = "";
  
    var mmbrChk = 0;
  
    if (mode == "confirm") {
      mtrPrgSttsDcd = $("#TB05030S_R025").val(); // 결의결과
      apvlAmt = $("#TB05030S_rcgAmt").val().replaceAll(",", ""); // 승인금액
      sdnCndtF = $("#TB05030S_sdnCndtF").val(); // 셀다운여부
      etcCndtF = $("#TB05030S_etcCndtF").val(); // 기타여부
      sdnCndtCtns = $("#TB05030S_cnfrncNtmCndtlCntnt").val(); // 부의조건
      etcCndtCtns = $("#TB05030S_rsltCntnt").val(); // 결의의견
  
      for (let i = 0; i < arrPqGridMmbrInfo.pdata.length; i++) {
        // 의결
        // 참석여부
        // 심의의견이 null
        if (isEmpty(arrPqGridMmbrInfo.pdata[i].aprvOppsDcdNm) || isEmpty(arrPqGridMmbrInfo.pdata[i].atdcYn) || isEmpty(arrPqGridMmbrInfo.pdata[i].opnnCtns)) { 
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "의결내용이 전부 입력되지 않았습니다.",
            confirmButtonText: "확인",
          });
          return;  
        }
      }
  
      // if (mmbrChk > 0) {
        
      // }
  
      if (isEmpty(mtrPrgSttsDcd)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "결의결과 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
      if (isEmpty(apvlAmt) || Number(apvlAmt) <= 0 ) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "승인금액 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
      if (isEmpty(sdnCndtF)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "셀다운 조건 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
      if (isEmpty(etcCndtF)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "기타 조건 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
      if (isEmpty(sdnCndtCtns)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "부의 조건 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
      if (isEmpty(etcCndtCtns)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "결의의견 내용을 학인해주세요.",
          confirmButtonText: "확인",
        });
        return;
      }
    } else {
      apvlAmt = 0;  // 컬럼타입때문에 ''로 안들어감.
    }
  
    var paramData = {
      cnsbDcd : cnsbDcd,
      rsltnYr: rsltnYr,
      cnsbSq: cnsbSq,
      sn: sn,
      dealNo: dealNo,
      jdgmDcd: jdgmDcd,
      mtrDcd: mtrDcd,
      mtrPrgSttsDcd: mtrPrgSttsDcd,
      apvlAmt: apvlAmt,
      sdnCndtF: sdnCndtF,
      etcCndtF: etcCndtF,
      sdnCndtCtns: sdnCndtCtns,
      etcCndtCtns: etcCndtCtns,
      mode : mode,
    };
  
    $.ajax({
      type: "POST",
      url: "/TB05030S/updateIBDEALInfo",
      contentType: "application/json;",
      data: JSON.stringify(paramData),
      dataType : "json",
      success: function (data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "협의결과 내용을 변경하였습니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
          $("#gridCaseInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
          $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
          $("#gridMmbrInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
          $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
          $("#gridIbDealInfo").pqGrid("refreshDataAndView");							// pqgrid 초기화
        
          $("#TB05030S_R025 option:eq(0)").prop("selected", true);
          $("#TB05030S_invstCrncyCdNm").val("");
          $("#TB05030S_rcgAmt").val("");
          $("#TB05030S_sdnCndtF option:eq(0)").prop('selected', true);
          $("#TB05030S_etcCndtF option:eq(0)").prop('selected', true);
        
          $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
          $("#TB05030S_rsltCntnt").val("");
          searchCNFRNC();
          getMMBRInfo(paramData);
          getIBDEALInfo(paramData);
        });
      },
    });
  }
  
  /* ***********************************그리드 컬럼******************************** */
  
  // 안건
  let colCaseInfo = [
    {
      title: "dealNo",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "결의협의체",
      dataType: "string",
      dataIndx: "cnsbDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "결의협의체",
      dataType: "string",
      dataIndx: "cnsbDcdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "회차",
      dataType: "string",
      dataIndx: "cnsbSq",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건번호",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "통화",
      dataType: "string",
      dataIndx: "ptfdCrryCdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "참여금액",
      dataType: "int",
      dataIndx: "ptfdAmt",
      halign : "center",
      align: "right",
      filter: { crules: [{ condition: "range" }] },
      render   : function (ui) {
        let cellData = ui.cellData;
              if (cellData !== null && cellData !== undefined) {
                  return addComma(cellData);
              }
              return cellData; 
      }
    },
    {
      title: "결의일자",
      dataType: "date",
      dataIndx: "cnsbOpnDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render   : function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length !== 0) {
          let cnsbOpnDt1 = cellData.substring(0, 4);
          let cnsbOpnDt2 = cellData.substring(4, 6);
          let cnsbOpnDt3 = cellData.substring(6, 8);
          return `${cnsbOpnDt1}-${cnsbOpnDt2}-${cnsbOpnDt3}`.trim();
        }
        return cellData; 
      }
    },
    {
      title: "부서",
      dataType: "string",
      dataIndx: "dprtNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "직원",
      dataType: "string",
      dataIndx: "chrgPEnm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역",
      dataType: "string",
      dataIndx: "ownPEnm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "진행상태",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
  // 협의결과
  let colIbDealInfo = [
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의",
      dataType: "string",
      dataIndx: "jdgmDcdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "통화",
      dataType: "string",
      dataIndx: "ptfdCrryCdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "참여금액",
      dataType: "int",
      dataIndx: "ptfdAmt",
      halign: "center",
      align: "right",
      filter: { crules: [{ condition: "range" }] },
      render   : function (ui) {
        let cellData = ui.cellData;
              if (cellData !== null && cellData !== undefined) {
                return addComma(cellData);
              }
              return cellData; 
      }
    },
    {
      title: "결의결과",
      dataType: "string",
      dataIndx: "rsltnRsltCdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "승인금액",
      dataType: "int",
      dataIndx: "apvlAmt",
      halign: "center",
      align: "right",
      filter: { crules: [{ condition: "range" }] },
      render   : function (ui) {
        let cellData = ui.cellData;
              if (cellData !== null && cellData !== undefined) { 
                return addComma(cellData);
              }
              return cellData; 
      }
    },
    {
      title: "승인조건",
      dataType: "string",
      dataIndx: "rsltnRsltCdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "셀다운여부",
      dataType: "string",
      dataIndx: "sdnCndtF",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기타여부",
      dataType: "string",
      dataIndx: "etcCndtF",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "리스크승인번호",
      dataType: "string",
      dataIndx: "riskRcgNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "딜번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "jdgmDcd",
      dataType: "string",
      dataIndx: "jdgmDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "mtrDcd",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "sn",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "cnsbSq",
      dataType: "string",
      dataIndx: "cnsbSq",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
  ];

  return {
     fnStdYrChng : fnStdYrChng
    , chnginspctCnfrncSqcSq : chnginspctCnfrncSqcSq
    , searchCNFRNC : searchCNFRNC
    , MMBRConfirm : MMBRConfirm
    , ibDealConfirm : ibDealConfirm
  }
  
})();