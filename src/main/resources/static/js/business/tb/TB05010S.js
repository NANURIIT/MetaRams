const TB05010Sjs = (function(){
  var MMBRCount = 0; // 위원정보 ID컨트롤 상수
  var readyOption = false;
  let mmbrListbox; // 협의체 위원구분
  let arrPqGridCnfrncList; // 협의체 결의 및 목록
  let arrPqGridMmbrInfo;  // 위원정보
  let arrPqGridCaseList; // 안건정보
  
  $(document).ready(function () {
    touchSpin(); // 결의년도 좌우 가산
    //tableFunction(); // 테이블 이벤트등록
    mmbrList(); // 협의체 위원구분 가져오기
    rendorGrid();
    // 결의년도 당해년도로 default 세팅..
    let year = getToday().substring(0, 4);
    $("#TB05010S_stdYr").val(year);
  });
  
  /**
   * 회차 변경이벤트
   */
  function chngInspctCnfrncSqc () {
    $("#TB05010S_rsltnDt2").val(getToday());
    $("#TB05010S_rsltnTm2").val("");
    $("#TB05010S_inspctPrgrsStCd2").val('');
  
    $("#addCnfrncInfo").prop('disabled', false);
    $("#delCnfrncInfo").prop('disabled', false);
    $("#approveAlert").prop('disabled', false);
    $("#cancelAlert").prop('disabled', false);
    $("#saveButton").prop('disabled', false);
  
    //$("#gridMmbrList").pqGrid("option", "dataModel.data", []);
    //$("#gridMmbrList").pqGrid("refreshDataAndView"); // 위원정보 pqgrid 초기화
    $("#gridCaseList").pqGrid("option", "dataModel.data", []);
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화
  }
  
  function mmbrDelRow() {
    /* 그리드 체크 갯수 */
    let gridData = $('#gridMmbrList').pqGrid("option", "dataModel.data");
    let checkedRows = [];
    for (let i = 0; i < gridData.length; i++) {
      MMBRCount--;
      let rowData = gridData[i];
      if (rowData.chkYn == 'Y') {	
        indexDel = i;
        checkedRows.push(rowData);
      }
    }
  
      if (checkedRows && checkedRows.length > 0) {
          // 체크된 행들을 반복하며 삭제
          checkedRows.forEach(function(row) {
              $('#gridMmbrList').pqGrid('deleteRow', { rowIndx: row.pq_ri});
          });
      }
    if(checkedRows.length <= 0){
       Swal.fire({
         icon                : 'error'
         , title             : "Error!"
         , text              : "삭제할 위원정보 행을 체크해주세요."
         , confirmButtonText : "확인"
       });
      return false;
    }
  }
  
  function delCaseList () {
    /* 그리드 체크 갯수 */
    let gridData = $('#gridCaseList').pqGrid("option", "dataModel.data");
    let checkedRows = [];
    for (let i = 0; i < gridData.length; i++) {
      MMBRCount--;
      let rowData = gridData[i];
      if (rowData.chkYn == 'Y') {	
        indexDel = i;
        checkedRows.push(rowData);
      }
    }
  
      if (checkedRows && checkedRows.length > 0) {
          // 체크된 행들을 반복하며 삭제
          checkedRows.forEach(function(row) {
              $('#gridCaseList').pqGrid('deleteRow', { rowIndx: row.pq_ri});
          });
      }
    if(checkedRows.length <= 0){
       Swal.fire({
         icon                : 'error'
         , title             : "Error!"
         , text              : "삭제할 안건정보 행을 체크해주세요."
         , confirmButtonText : "확인"
       });
      return false;
    }
  }
  
  function mmbrList () {
    $.ajax({
      type: "GET",
      url: "/getSelectBoxCode/C003",
      async: false,
      dataType: "json",
      success: function (data) {
        let colMmbrList = [
          {
            title: "",
            dataType: "string",
            dataIndx: "chkYn",
            halign : "center",
            align: "center",
            width : "60",
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
            title: "위원구분",
            dataType: "string",
            dataIndx: "atdcTrgtDcd",
            halign : "center",
            align: "center",
            width : "100",
            editable : true,
            filter: { crules: [{ condition: "range" }] },
            editor: {
              type: "select",
              valueIndx: "CD_VL_ID",
              labelIndx: "CD_VL_NM",
              options: data
            },
            render: function (ui) {
              var options = data;
              var option = options.find(opt => opt.CD_VL_ID == ui.cellData);
              return option ? option.CD_VL_NM : ui.cellData;
            },
          },
          {
            title: "위원",
            dataType: "",
            dataIndx: "",
            align: "center",
            width : "260",
            filter: { crules: [{ condition: "range" }] },
            colModel  : [
              { title : "위원명", dataType : "string",  dataIndx : "atdcTrgtEmpnm", align : "center", halign : "center", width : "240"},
              { title : "위원명", dataType : "string",  dataIndx : "atdcTrgtEmpno", align : "center", halign : "center", hidden : true},
              { title : "", dataType : "",  dataIndx : "", align : "center", halign : "center", width : "20", 
              render: function (ui) {
                let rowData = ui.rowData;
                return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03022P('TB05010S_mmbrTrgt', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
              }},
            ]
          },
          {
            title: "대리참석위원",
            dataType: "string",
            dataIndx: "",
            width : "260",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel  : [
              { title : "대리참석위원", dataType : "string",  dataIndx : "atdcAngtEmpnm", align : "center", halign : "center", width : "240"},
              { title : "대리참석위원", dataType : "string",  dataIndx : "atdcAngtEmpno", align : "center", halign : "center", hidden : true},
              { title : "", dataType : "",  dataIndx : "", align : "center", halign : "center", width : "20", 
              render: function (ui) {
                let rowData = ui.rowData;
                return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03022P('TB05010S_mmbrAngt', ${rowData.pq_ri});"><i class='fa fa-search'></i></button>`.trim();
              }},
            ]
          },
        ];
        // 관련문서
      let obj = {
        height: 200,
        maxHeight: 200,
        showTitle: false,
        showToolbar: false,
        collapsible: false,
        wrap: false,
        hwrap: false,
        numberCell: { show: false },
        editable: false,
        //toolbar: toolbar,
        scrollModel: { autoFit: false },
        colModel: colMmbrList,
        strNoRows: '데이터가 없습니다.'
      }
      $("#gridMmbrList").pqGrid(obj);
      arrPqGridMmbrInfo = $("#gridMmbrList").pqGrid('instance');
      },
    });
    
  }
  
  // 그리드 렌더링함수
  function rendorGrid() {
    /** 그리드 **/
    let arrPqGridObj = [
      // 협의체 결의 및 목록
      {
        height: 103,
        maxHeight: 103,
        id: "gridCnfrncList",
        colModel: colCnfrncList,
      },
      // (보증)기초자산
      {
        height: 200,
        maxHeight: 200,
        id: "gridCaseList",
        colModel: colCaseList,
      },
    ];
    setPqGrid(arrPqGridObj);
  
    arrPqGridCnfrncList = $("#gridCnfrncList").pqGrid("instance");
    arrPqGridCaseList = $("#gridCaseList").pqGrid("instance");
  }
  /**
   * 전결협의체 변경이벤트
   * @param {this} e
   */
  function chngInspctPrgrsStCd(e) {
    $("#TB05010S_R016_2").val(e.value); // 선택한 전결협의체로 변경
    $("#gridCnfrncList").pqGrid("option", "dataModel.data", []);
    $("#gridCnfrncList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridMmbrList").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridCaseList").pqGrid("option", "dataModel.data", []);
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화
  
    $("#TB05010S_inspctCnfrncSqcSq2").val("");
    $("#TB05010S_rsltnDt2").val(getToday());
    $("#TB05010S_rsltnTm2").val("");
    $("#TB05010S_inspctPrgrsStCd2").val("");
  }
  
  function chngStdYr (e) {
    $("#gridCnfrncList").pqGrid("option", "dataModel.data", []);
    $("#gridCnfrncList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridMmbrList").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridCaseList").pqGrid("option", "dataModel.data", []);
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화
  
    $("#TB05010S_inspctCnfrncSqcSq2").val("");
    $("#TB05010S_rsltnDt2").val(getToday());
    $("#TB05010S_rsltnTm2").val("");
    $("#TB05010S_inspctPrgrsStCd2").val("");
  }
  
  function touchSpin() {
    //TouchSpin
    $(".touchspin").TouchSpin({
      verticalbuttons: true,
      buttondown_class: "btn btn-white",
      buttonup_class: "btn btn-white",
    });
  }
  
  // 전결협의체
  getSelectBoxList("TB05010S", "R016");
  // 초기화버튼 - 협의체 전결협의체, 회차별로 조회 후 신규 회차 추가 시 사용
  function btnReset() {
    //▶기본정보의 진행상태가 ""이 아닐 때만 실행
    if ($("#TB05010S_inspctPrgrsStCd2").val() != "") {
      // 버튼 활성화/비활성화
      $("#saveButton").attr("disabled", false);
      $("#confirmButton").attr("disabled", true);
      $("#cancleButton").attr("disabled", true);
  
      //협의체 기본정보 초기화 및 셋팅
      $("#TB05010S_inspctCnfrncSqcSq2").val(
        Number($("#TB05010S_inspctCnfrncSqcSq2").val()) + 1
      );
      $("#TB05010S_rsltnDt2").val("");
      $("#TB05010S_rsltnTm2").val("");
      $("#TB05010S_inspctPrgrsStCd2").val("");
  
      $("#TB05010_fileList").html("");
      //  $('#TB05010S_MMBRList').html(''); 
      $("#TB05010S_CASEList").html("");
      $("#gridCnfrncList").pqGrid("option", "dataModel.data", []);
      $("#gridCnfrncList").pqGrid("refreshDataAndView");							// pqgrid 초기화 
      $("#gridCaseList").pqGrid("option", "dataModel.data", []);
      $("#gridCaseList").pqGrid("refreshDataAndView");							// pqgrid 초기화
      $("#gridMmbrList").pqGrid("option", "dataModel.data", []);
      $("#gridMmbrList").pqGrid("refreshDataAndView");							// pqgrid 초기화 
    } else {
      // 버튼 활성화/비활성화
      $("#saveButton").attr("disabled", false);
      $("#confirmButton").attr("disabled", true);
      $("#cancleButton").attr("disabled", true);
    }
    $("#addCnfrncInfo").prop('disabled', false);
    $("#delCnfrncInfo").prop('disabled', false);
    $("#approveAlert").prop('disabled', false);
    $("#cancelAlert").prop('disabled', false);
  }
  
  function getCNFRNCList() {
    var inspctCnfrncCcd = $("#TB05010S_R016").val(); // 전결협의체
    var stdYr = $("#TB05010S_stdYr").val(); // 결의년도
  
    MMBRCount = 0;
    if (inspctCnfrncCcd === "") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "전결협의체 정보를 확인해주세요",
        confirmButtonText: "확인",
      });
      return false;
    }
  
    var paramData = {
      cnsbDcd: inspctCnfrncCcd,
      rsltnYr: stdYr,
    };
  
    $.ajax({
      type: "GET",
      url: "/TB05010S/getCNFRNCList",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridCnfrncList.setData(data);
        arrPqGridCnfrncList.option("rowDblClick", function (event, ui) {
          getCNFRNCInfo(ui.rowData);
        });
      },
      error: function (e) {
        console.log("getCNFRNCList error ::  " + e.status);
      },
    });
  }
  
  function getCNFRNCInfo(e) {
    var cnsbDcd = e.cnsbDcd; // 전결협의체
    var rsltnYr = e.rsltnYr; // 결의년도
    var inspctCnfrncSqcSq = e.sn; // 회차
    var rsltnDt = e.cnsbOpnDt; // 결의일자
  
    MMBRCount = 0;

    if (
      cnsbDcd &&
      rsltnYr &&
      String(inspctCnfrncSqcSq)
    ) {
      businessFunction();
    } else {  
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "전결협의체 정보를 확인해주세요",
        confirmButtonText: "확인",
      });
    }
  
    function businessFunction() {
      var paramData = {
        cnsbDcd: cnsbDcd,
        rsltnYr: rsltnYr,
        sn: inspctCnfrncSqcSq,
        cnsbOpnDt: rsltnDt,
      };
  
      // TODO: reset TB05010S
      // 페이지에서 기존정보 제거 후 취득
      $("#TB05010S_MMBRList").empty();
      $("#TB05010_fileList").empty();
  
      getCNFRNC(paramData); // 결의협의회 기본정보
    }
  }
  
  // 결의협의회 기본정보
  function getCNFRNC(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05010S/getCNFRNCInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        // 결의정보가 있을때
        $("#TB05010S_R016_2").val(data.cnsbDcd).prop("selected", true);
        $("#TB05010S_stdYr2").val(data.rsltnYr);
        $("#TB05010S_inspctCnfrncSqcSq2").val(Number(data.sn));
        $("#TB05010S_rsltnDt2").val(formatDate(data.cnsbOpnDt));
        $("#TB05010S_rsltnTm2").val(data.cnsbOpnTm);
        if (isNotEmpty(data.mtrPrgSttsDcd)) {
          $("#TB05010S_inspctPrgrsStCd2").val(data.mtrPrgSttsDcdNm);
        }
        if (Number(data.mtrPrgSttsDcd) < 303) {
          $("#saveButton").attr("disabled", false);
          $("#confirmButton").attr("disabled", true);
          $("#cancleButton").attr("disabled", true);
        } else if (Number(data.mtrPrgSttsDcd) === 303) {
          $("#saveButton").attr("disabled", true);
          $("#confirmButton").attr("disabled", false);
          $("#cancleButton").attr("disabled", true);
        } else if (Number(data.mtrPrgSttsDcd) === 304) {
          $("#saveButton").attr("disabled", true);
          $("#confirmButton").attr("disabled", true);
          $("#cancleButton").attr("disabled", false);
        } else {
          $("#saveButton").attr("disabled", true);
          $("#confirmButton").attr("disabled", true);
          $("#cancleButton").attr("disabled", true);
        }
        // 협의체 진행상태가 협의체 결의 이후의 건이면 안건변경 불가
        if (Number(data.mtrPrgSttsDcd) > 306) {
          $("#addCnfrncInfo").prop('disabled', true);
          $("#delCnfrncInfo").prop('disabled', true);
          $("#approveAlert").prop('disabled', true);
          $("#cancelAlert").prop('disabled', true);
        } else if (Number(data.mtrPrgSttsDcd) <= 306) {
          $("#addCnfrncInfo").prop('disabled', false);
          $("#delCnfrncInfo").prop('disabled', false);
          $("#approveAlert").prop('disabled', false);
          $("#cancelAlert").prop('disabled', false);
        } else {
          $("#addCnfrncInfo").prop('disabled', false);
          $("#delCnfrncInfo").prop('disabled', false);
          $("#approveAlert").prop('disabled', false);
          $("#cancelAlert").prop('disabled', false);
        }
  
  
        getMMBRInfo(paramData); // 결의협의회 위원정보
        getCaseInfo(paramData); // 결의협의회 안건정보
      },
      error: function () {
        // 결의정보가 없을때
        $("#TB05010S_R016_2").val($("#TB05010S_R016").val());
        var now = new Date();
        var year = now.getFullYear();
        $("#TB05010S_stdYr2").val(year);
        $("#TB05010S_inspctCnfrncSqcSq2").val(Number(1));
        $("#TB05010S_rsltnDt2").val("");
        $("#TB05010S_rsltnTm2").val("");
        $("#TB05010S_inspctPrgrsStCd2").val("");
  
        //
        $("#TB05010S_MMBRList").empty();
        $("#TB05010_fileList").empty();
        $("#TB05010S_CASEList").empty();
  
        // 버튼 컨트롤
        $("#saveButton").attr("disabled", false);
        $("#confirmButton").attr("disabled", true);
        $("#cancleButton").attr("disabled", true);
      },
    });
  }
  
  // 결의협의회 위원정보
  function getMMBRInfo(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05010S/getMMBRInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridMmbrInfo.setData(data);
           //var MMBRInfo = data;
  
          //  if (MMBRInfo.length > 0) {
          //    // 있을경우
          //    var html = "";
          //    $.each(MMBRInfo, function (key, MMBR) {
          //      html += "<tr>";
          //      // td chkbox
          //      html +=
          //        '<td style="vertical-align: middle;"><input type="checkbox" class="MMBRChk" id="MMBR_chkbox_' +
          //        (MMBRCount + 1) +
          //        '"></td>';
  
          //      // td selectbox
          //      html +=
          //        '<td><select class="form-control" id="CMMTT_MMBR_CCD_' +
          //        (MMBRCount + 1) +
          //        '">';
          //      if (selectbox.length > 0) {
          //        $.each(selectbox, function (key, value) {
          //          if (MMBR.atdcTrgtDcd == value.CD_VL_ID) {
          //            html +=
          //              '<option value="' +
          //              value.CD_VL_ID +
          //              '" selected>' +
          //              value.CD_VL_NM +
          //              " (" +
          //              value.CD_VL_ID +
          //              ") " +
          //              "</option>";
          //          } else {
          //            html +=
          //              '<option value="' +
          //              value.CD_VL_ID +
          //              '">' +
          //              value.CD_VL_NM +
          //              " (" +
          //              value.CD_VL_ID +
          //              ") " +
          //              "</option>";
          //          }
          //        });
          //      }
          //      html += "</select></td>";
  
          //      // td inputbox
          //      html += "<td>";
          //      html += '<div class="input-group">';
          //      html +=
          //        '<input type="text" class="form-control" id="ATDNC_' +
          //        (MMBRCount + 1) +
          //        '_empNm" readonly value="' +
          //        MMBR.atdcTrgtEmpnm +
          //        '">';
          //      html +=
          //        '<input type="hidden" id="ATDNC_' +
          //        (MMBRCount + 1) +
          //        '_empNo" value="' +
          //        MMBR.atdcTrgtEmpno +
          //        '">';
          //      html += '<span class="input-group-append">';
          //      html +=
          //        '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_' +
          //        (MMBRCount + 1) +
          //        "')\">";
          //      html += '<i class="fa fa-search"></i>';
          //      html += "</button>";
          //      html += "</span>";
          //      html += "</div>";
          //      html += "</td>";
  
          //      //td inputbox
          //      html += "<td>";
          //      html += '<div class="input-group">';
          //      html +=
          //        '<input type="text" class="form-control" id="ATDNC_PRXY_' +
          //        (MMBRCount + 1) +
          //        '_empNm" readonly value="' +
          //        MMBR.atdcAngtEmpnm +
          //        '">';
          //      html +=
          //        '<input type="hidden" id="ATDNC_PRXY_' +
          //        (MMBRCount + 1) +
          //        '_empNo" value="' +
          //        MMBR.atdcAngtEmpno +
          //        '">';
          //      html += '<span class="input-group-append">';
          //      html +=
          //        '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_PRXY_' +
          //        (MMBRCount + 1) +
          //        "')\">";
          //      html += '<i class="fa fa-search"></i>';
          //      html += "</button>";
          //      html += "</span>";
          //      html += "</div>";
          //      html += "</td>";
  
          //      html += "</tr>";
  
          //      MMBRCount++;
          //    });
          //    $("#TB05010S_MMBRList").append(html);
          //  }
      },
      error: function () {
        // 없을경우
      },
    });
  }
  
  // 결의협의회 안건정보
  function getCaseInfo(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05010S/getCaseInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridCaseList.setData(data);
        // 안건정보가 있을때
        //   var dealList = data;
        //   if (dealList.length > 0) {
        //     // 있을경우
        //     var html = "";
        //     $.each(dealList, function (key, value) {
        //       html += "<tr>";
        //       // chkbox
        //       html += '<td style="vertical-align: middle;">';
        //       html += '<input type="checkbox" class="CASEChk">';
        //       html += "</td>";
        //       // ibDealNo
        //       html += '<td style="display:none;">' + value.dealNo;
        //       html += "</td>";
        //       // 순서정보
        //       html += "<td>" + value.sn;
        //       html += "</td>";
        //       // 안건명
        //       html += "<td>" + value.mtrNm;
        //       html += "</td>";
        //       // 신규/재부의정보
        //       html += '<td style="display:none;">' + value.jdgmDcd;
        //       html += "</td>";
        //       html += "<td>" + value.jdgmDcdNm;
        //       html += "</td>";
        //       // 안건순번
        //       html += '<td style="display:none;">' + value.mtrDcd;
        //       html += "</td>";
        //       html += "<td>" + value.mtrDcdNm;
        //       html += "</td>";
        //       // 부서명
        //       html += '<td style="display:none;">' + value.dprtCd;
        //       html += "</td>";
        //       html += "<td>" + value.dprtNm;
        //       html += "</td>";
        //       // 직원명
        //       html += '<td style="display:none;">' + value.chrgPEno;
        //       html += "</td>";
        //       html += "<td>" + value.chrgPEnm;
        //       html += "</td>";
        //       // 심사역
        //       html += '<td style="display:none;">' + value.ownPEno;
        //       html += "</td>";
        //       html += "<td>" + value.ownPEnm;
        //       html += "</td>";
  
        //       // btn updown
        //       /*html += '<td>';
        //                 html += '<button type="button" id="" class="btn btn-default btn-xs">';
        //                 html += '<i class="fa fa-caret-up"></i>';
        //                 html += '</button>';
        //                 html += '<button type="button" id="" class="btn btn-default btn-xs">';
        //                 html += '<i class="fa fa-caret-down"></i>';
        //                 html += '</button>';
        //                 html += '</td>';*/
  
        //       html += "</tr>";
  
        //       var dtoParam = {
        //         fileIbDealNo: value.ibDealNo,
        //         fileRiskInspctCcd: value.riskInspctCcd,
        //         fileLstCCaseCcd: value.lstCCaseCcd,
        //       };
        //       //fileInfo(dtoParam);
  
        //       $("#TB05010S_CASEList").html(html);
        //     });
        //   }
      },
      error: function () {
        // 안건정보가 없을때
      },
    });
  }
  
  // 관련보고서 목록 호출
  function fileInfo(dtoParam) {
    $.ajax({
      type: "GET",
      url: "/getFiles",
      data: dtoParam,
      dataType: "json",
      success: function (data) {
        if (data.length > 0) {
          callbackFile("select", data);
        }
      },
    });
  }
  
  function callbackFile(action, result) {
    var html = "";
    var temp = "";
  
    if (action == "upload") {
      html = makeFilList(html, result);
      $("#TB05010_fileList").append(html);
    } else if (action == "delete" || action == "select") {
      for (let i = 0; i < result.length; i++) {
        let fileInfo = result[i];
        html += makeFilList(temp, fileInfo);
      }
      $("#TB05010_fileList").append(html);
    }
  }
  
  /**
   * 파일목록 Table 생성
   */
  function makeFilList(html, result) {
    var encUri = downloadURI(
      result.svFilePathNm,
      result.svFileNm,
      result.orgFileNm
    );
    html += "<tr>";
    //html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
    //html += '    </td>';
    html += '    <td><a href="' + encUri + '">' + result.orgFileNm + "</a></td>";
    html += "    <td>" + result.rgstDt + "</td>";
    html += '    <td style="display:none;">' + result.ibDealNo + "</td>";
    html += '    <td style="display:none;">' + result.riskInspctCcd + "</td>";
    html += '    <td style="display:none;">' + result.lstCCaseCcd + "</td>";
    html += "</tr>";
  
    return html;
  }
  
  // 위원정보 행추가 버튼기능
  function addMMBRRow() {
    MMBRCount++;
    let newRow = {
      aprvOppsDcd : "",
      aprvOppsDcdNm : "",
      atdcTrgtDcd : "",
      atdcTrgtEmpnm : "",
      atdcTrgtEmpno : "",
      atdcAngtEmpnm : "",
      atdcAngtEmpno : "",
      atdcYn : "",
      cnsbDcd : "",
      cnsbSq : "",
    }
    $('#gridMmbrList').pqGrid("addRow", {rowData: newRow, checkEditable: false });
  }
  
  // 테이블 이벤트등록
  // function tableFunction() {
  //   MMBRChk(); // 위원정보 테이블 체크박스 이벤트 설정
  //   CASEChk(); // 안건정보 테이블 체크박스 이벤트 설정
  //   // TODO: 안건정보 업다운 버튼시 순서변경 이벤트
  // }
  
  // // 위원정보 테이블 체크박스 이벤트 설정
  // function MMBRChk() {
  //   $("#MMBRChk").change(function () {
  //     if ($("#MMBRChk").is(":checked")) {
  //       $(".MMBRChk").prop("checked", true);
  //     } else {
  //       $(".MMBRChk").prop("checked", false);
  //     }
  //   });
  // }
  
  // // 안건정보 테이블 체크박스 이벤트 설정
  // function CASEChk() {
  //   $("#CASEChk").change(function () {
  //     if ($("#CASEChk").is(":checked")) {
  //       $(".CASEChk").prop("checked", true);
  //     } else {
  //       $(".CASEChk").prop("checked", false);
  //     }
  //   });
  // }
  
  // 테이블 행삭제 버튼기능
  // function delTableRow(tableId) {
  //   var tableIdCheckBox = "#" + tableId + " input:checkbox:checked";
  //   var text = "";
  
  //   if (tableId == "TB05010S_MMBRList") {
  //     text = "위원정보 체크박스를 확인해주세요.";
  //   } else if (tableId == "TB05010S_CASEList") {
  //     text = "안건정보 체크박스를 확인해주세요.";
  //   } else {
  //     text = "체크박스를 확인해주세요.";
  //   }
  
  //   // tr 체크된 갯수 확인
  //   var checkboxes = $(tableIdCheckBox);
  
  //   if (checkboxes.length > 0) {
  //     businessFunction();
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: text,
  //       confirmButtonText: "확인",
  //     });
  //   }
  
  //   function businessFunction() {
  //     MMBRCount -= checkboxes.length;
  //     checkboxes.each(function (i) {
  //       var tr = checkboxes.parent().parent();
  //       var td = $(tr).children();
  //       var ibDealNo = td.eq(1).text();
  //       var riskInspctCcd = td.eq(4).text();
  //       var lstCCaseCcd = td.eq(6).text();
  
  //       if (tableId == "TB05010S_CASEList") {
  //         deleteFileInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
  //       }
  
  //       tr.remove();
  //     });
  //   }
  // }
  
  function deleteFileInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
    if ($("#CASEChk").is(":checked")) {
      $("#TB05010_fileList").empty();
    } else {
      $("#TB05010_fileList")
        .find("tr")
        .each(function (i, val) {
          var fileIbDealNo = $(val).find("td:eq(2)").html();
          var fileRiskInspctCcd = $(val).find("td:eq(3)").html();
          var fileLstCCaseCcd = $(val).find("td:eq(4)").html();
  
          if (
            fileIbDealNo == ibDealNo &&
            fileRiskInspctCcd == riskInspctCcd &&
            fileLstCCaseCcd == lstCCaseCcd
          ) {
            val.remove();
          }
        });
    }
  }
  
  // 안건정보 추가 - AS02020P 에서 전달받음
  // function addDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
  //   var count = 0;
  
  //   var paramData = {
  //     dealNo: ibDealNo,
  //     jdgmDcd: riskInspctCcd,
  //     mtrDcd: lstCCaseCcd,
  //   };
  
  //   if ($("#TB05010S_CASEList").length > 0) {
  //     $("#TB05010S_CASEList tr").each(function (index, item) {
  //       var dealNo = $(item).children().eq(1).text();
  //       var jdgmDcd = $(item).children().eq(4).text();
  //       var mtrDcd = $(item).children().eq(6).text();
  
  //       if (
  //         ibDealNo == dealNo &&
  //         riskInspctCcd == jdgmDcd &&
  //         lstCCaseCcd == mtrDcd
  //       ) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error!",
  //           text: "이미 등록된 안건입니다.",
  //           confirmButtonText: "확인",
  //         });
  //         count++;
  //       }
  //     });
  //   }
  
  //   if (count === 0) {
  //     $.ajax({
  //       type: "GET",
  //       url: "/TB05010S/getDealDetail",
  //       data: paramData,
  //       dataType: "json",
  //       success: function (data) {
  //         businessFunction();
  
  //         /*
  //                 if (data.inspctPrgrsStCd == 310 || data.inspctPrgrsStCd == 330) {
  //                     businessFunction();
  //                 } else {
  //                     Swal.fire({
  //                         icon: 'error'
  //                         , title: "Error!"
  //                         , text: '협의체 부의 등록 상태가 아닙니다.'
  //                         , confirmButtonText: "확인"
  //                     });
  //                 }
  //                 */
  
  //         function businessFunction() {
  //           var trLength = $("#TB05010S_CASEList tr").length;
  
  //           html = "";
  //           html += "<tr>";
  //           // chkbox
  //           html += "<td>";
  //           html += '<input type="checkbox" class="CASEChk">';
  //           html += "</td>";
  
  //           // ibDealNo
  //           html += '<td style="display:none;">' + data.dealNo;
  //           html += "</td>";
  
  //           // rnkNo
  //           html += "<td>" + (trLength + 1);
  //           html += "</td>";
  
  //           // ibDealNm
  //           html += "<td>" + data.mtrNm;
  //           html += "</td>";
  
  //           // riskInspctCcd
  //           html += '<td style="display:none">' + data.jdgmDcd;
  //           html += "</td>";
  //           html += "<td>" + data.jdgmDcdNm;
  //           html += "</td>";
  
  //           // lstCCaseCcd
  //           html += '<td style="display:none">' + data.mtrDcd;
  //           html += "</td>";
  //           html += "<td>" + data.mtrDcdNm;
  //           html += "</td>";
  
  //           // dprtNm
  //           html += '<td style="display:none">' + data.dprtCd;
  //           html += "</td>";
  //           html += "<td>" + data.dprtNm;
  //           html += "</td>";
  
  //           // chrgPEno
  //           html += '<td style="display:none">' + data.chrgPEno;
  //           html += "</td>";
  //           html += "<td>" + data.chrgPNm;
  //           html += "</td>";
  
  //           // ownPEno
  //           html += '<td style="display:none">' + data.ownPEno;
  //           html += "</td>";
  //           html += "<td>" + data.ownPNm;
  //           html += "</td>";
  
  //           // btn updown
  //           html += "<td>";
  //           html += '<button type="button" id="" class="btn btn-default btn-xs">';
  //           html += '<i class="fa fa-caret-up"></i>';
  //           html += "</button>";
  //           html += '<button type="button" id="" class="btn btn-default btn-xs">';
  //           html += '<i class="fa fa-caret-down"></i>';
  //           html += "</button>";
  //           html += "</td>";
  
  //           html += "</tr>";
  
  //           $("#TB05010S_CASEList").append(html);
  
  //           var dtoParam = {
  //             fileIbDealNo: data.ibDealNo,
  //             fileRiskInspctCcd: data.riskInspctCcd,
  //             fileLstCCaseCcd: data.lstCCaseCcd,
  //           };
  
  //           //fileInfo(dtoParam);
  //         }
  //       },
  //     });
  //   } else {
  //   }
  // }
  
  // TB05010S 임시저장버튼
  function tempSave() {
    var MMBRListCount = arrPqGridMmbrInfo.pdata.length;
    var CASEListCount = arrPqGridCaseList.pdata.length;
    let CnfrncList = arrPqGridCnfrncList.pdata;
    var inspctCnfrncSqcSq2 = $("#TB05010S_inspctCnfrncSqcSq2").val();
  
    if (!isEmpty(inspctCnfrncSqcSq2)) {
      if (MMBRListCount != 0 && CASEListCount != 0) {
        businessFunction();
      } else {
        if (CASEListCount == "0") {
          Swal.fire({
            icon: "info",
            title: "Info!",
            text: "안건정보가 없습니다.",
            confirmButtonText: "확인",
          });
        } else if (MMBRListCount == "0") {
          Swal.fire({
            icon: "info",
            title: "Info!",
            text: "위원정보가 없습니다.",
            confirmButtonText: "확인",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "회차정보를 확인하세요.",
        confirmButtonText: "확인",
      });
    }
    
    for (let i = 0; i < CnfrncList.length; i++) {
      if (CnfrncList[i].sn == $("#TB05010S_inspctCnfrncSqcSq2").val()) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "해당 전결협의체에 중복된 협의체 회차정보가 존재합니다.",
          confirmButtonText: "확인",
        });
        $("#TB05010S_inspctCnfrncSqcSq2").focus();
      }
    }
  
    function businessFunction() {
      
      /* 협의체 회차정보 */
      var inspctCnfrncCcd = $("#TB05010S_R016_2").val();
      var stdYr = $("#TB05010S_stdYr").val();
      var inspctCnfrncSqcSq = $("#TB05010S_inspctCnfrncSqcSq2").val();
      var rsltnDt = $("#TB05010S_rsltnDt2").val();
      var rsltnTm = $("#TB05010S_rsltnTm2").val();
  
      var dealList = [];
      var enoList = [];
  
      /* 협의체 안건정보 */
      for (var i = 0; i < CASEListCount; i++) {
        var dealInfo = {
          cnsbDcd: $("#TB05010S_R016_2").val(),
          rsltnYr: $("#TB05010S_stdYr").val(),
          sn: $("#TB05010S_inspctCnfrncSqcSq2").val(),
          dealNo: arrPqGridCaseList.pdata[i].dealNo,
          mtrDcd: arrPqGridCaseList.pdata[i].mtrDcd,
          jdgmDcd: arrPqGridCaseList.pdata[i].jdgmDcd,
        };
        dealList.push(dealInfo);
      }
  
      /* 협의체 위원정보 */
      for (var i = 0; i < MMBRListCount; i++) {
        var enoInfo = {
          cnsbDcd: $("#TB05010S_R016_2").val(),
          rsltnYr: $("#TB05010S_stdYr").val(),
          sn: $("#TB05010S_inspctCnfrncSqcSq2").val(),
          atdcTrgtDcd: arrPqGridMmbrInfo.pdata[i].atdcTrgtDcd,
          atdcTrgtEmpno: arrPqGridMmbrInfo.pdata[i].atdcTrgtEmpno,
          atdcAngtEmpno: arrPqGridMmbrInfo.pdata[i].atdcAngtEmpno,
        };
        enoList.push(enoInfo);
      }
  
      var paramData = {
        cnsbDcd: inspctCnfrncCcd,
        rsltnYr: stdYr,
        sn: Number(inspctCnfrncSqcSq),
        cnsbOpnDt: rsltnDt.replaceAll("-", ""),
        cnsbOpnTm: rsltnTm.replaceAll("-", ""),
        // 안건정보
        dealList: dealList,
        // 위원정보
        enoList: enoList,
      };
      //비동기통신요청
      $.ajax({
        type: "POST",
        url: "/TB05010S/tempSaveComtInfo",
        data: JSON.stringify(paramData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "success!",
            text: "임시저장에 성공하였습니다.",
            confirmButtonText: "확인",
          }).then(function () {
            btnReset();
            getCNFRNCList();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "error!",
            text: "임시저장에 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }
  
  // 협의체 상태 변경 - 준비확정 or 준비취소
  function changeCNFRNCStatus(statusCode) {
  
    /* 협의체 기본정보 */
    var cnsbDcd = $("#TB05010S_R016_2").val();
    var rsltnYr = $("#TB05010S_stdYr").val();
    var sn = $("#TB05010S_inspctCnfrncSqcSq2").val();
    var jdgmRsltDcd = statusCode;
  
    /* 협의체 안건정보 */
    var CASEListCount = arrPqGridCaseList.pdata.length;
  
    var dealList = [];
  
    for (var i = 0; i < CASEListCount; i++) {
      var dealInfo = {
        cnsbDcd: $("#TB05010S_R016_2").val(),
        rsltnYr: $("#TB05010S_stdYr").val(),
        sn: $("#TB05010S_inspctCnfrncSqcSq2").val(),
        dealNo: arrPqGridCaseList.pdata[i].dealNo,
          mtrDcd: arrPqGridCaseList.pdata[i].mtrDcd,
          jdgmDcd: arrPqGridCaseList.pdata[i].jdgmDcd,
      };
      dealList.push(dealInfo);
    }
  
    var paramData = {
      cnsbDcd: cnsbDcd,
      rsltnYr: rsltnYr,
      sn: sn,
      jdgmRsltDcd: jdgmRsltDcd,
      dealList: dealList,
    };
  
    var text = "";
    if (statusCode === 303) {
      text = "준비취소가 완료되었습니다.";
    } else {
      text = "준비확정이 완료되었습니다.";
    }
  
    $.ajax({
      type: "POST",
      url: "/TB05010S/changeCNFRNCStatus",
      contentType: "application/json",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function () {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: text,
          confirmButtonText: "확인",
        }).then((result) => {
          location.reload();
        });
      },
      error: function () {},
    });
  }
  /* ***********************************그리드 컬럼******************************** */
  
  // 협의체 결의 및 목록 탭 그리드
  let colCnfrncList = [
    {
      title: "회차",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render   : function (ui) {
        let rowData = ui.rowData;
        return `${rowData.cnsbDcdNm} ${rowData.rsltnYr}년도 ${rowData.sn}회차 협의회 결의`
      }
    },
    {
      title: "cnsbDcd",
      dataType: "string",
      dataIndx: "cnsbDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "rsltnYr",
      dataType: "string",
      dataIndx: "rsltnYr",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "sn",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "cnsbOpnDt",
      dataType: "string",
      dataIndx: "cnsbOpnDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];
  
  let colCaseList = [
    {
      title: "",
      dataType: "string",
      dataIndx: "chkYn",
      halign : "center",
      align: "center",
      width : "100",
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
      title: "딜번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true,
    },
    {
      title: "순서정보",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건구분코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "안건구분",
      dataType: "string",
      dataIndx: "mtrNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      halign : "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의정보",
      dataType: "string",
      dataIndx: "jdgmDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "신규/재부의정보",
      dataType: "string",
      dataIndx: "jdgmDcdNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부서코드",
      dataType: "string",
      dataIndx: "dprtCd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
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
      dataIndx: "chrgPEno",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
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
      dataIndx: "ownPEno",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden : true
    },
    {
      title: "심사역",
      dataType: "string",
      dataIndx: "ownPEnm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
  
  return{
    tempSave : tempSave
    , changeCNFRNCStatus : changeCNFRNCStatus
    , chngInspctPrgrsStCd : chngInspctPrgrsStCd
    , getCNFRNCList : getCNFRNCList
    , btnReset : btnReset
    , delCaseList : delCaseList
    , chngInspctCnfrncSqc : chngInspctCnfrncSqc
    , addMMBRRow : addMMBRRow
    , mmbrDelRow : mmbrDelRow

  }
})();