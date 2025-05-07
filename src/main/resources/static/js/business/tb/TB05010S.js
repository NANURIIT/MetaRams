const TB05010Sjs = (function () {
  var MMBRCount = 0; // 위원정보 ID컨트롤 상수
  var readyOption = false;
  let mmbrListbox; // 협의체 위원구분
  let arrPqGridCnfrncList; // 협의체 결의 및 목록
  let arrPqGridMmbrInfo; // 위원정보
  let arrPqGridCaseList; // 안건정보
  let mmbrDcd;

  $(document).ready(function () {
    mmbrList(); // 협의체 위원구분 가져오기
    touchSpin(); // 결의년도 좌우 가산
    // 결의년도 당해년도로 default 세팅..
    let year = getToday().substring(0, 4);
    $("#TB05010S_stdYr").val(year);
    rendorGrid();
  });

  /**
   * 회차 변경이벤트
   */
  function chngInspctCnfrncSqc() {
    let cnsbSq = $("#TB05010S_inspctCnfrncSqcSq2").val();
    let rsltnYr = $("#TB05010S_stdYr").val();
    let cnsbDcd = $("#TB05010S_R016").val();

    $("#TB05010S_rsltnDt2").val(getToday());
    $("#TB05010S_rsltnTm2").val("");
    $("#TB05010S_inspctPrgrsStCd2").val("");

    $("#addCnfrncInfo").prop("disabled", false);
    $("#delCnfrncInfo").prop("disabled", false);
    $("#approveAlert").prop("disabled", false);
    $("#cancelAlert").prop("disabled", false);
    $("#saveButton").prop("disabled", false);

    // $("#gridMmbrList").pqGrid("option", "dataModel.data", []);
    // $("#gridMmbrList").pqGrid("refreshDataAndView"); // 위원정보 pqgrid 초기화
    $("#gridCaseList").pqGrid("option", "dataModel.data", []);
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화

    sqCheck(cnsbSq, rsltnYr, cnsbDcd);
  }

  function sqCheck(cnsbSq, rsltnYr, cnsbDcd) {
    var paramData = {
      cnsbSq: cnsbSq,
      rsltnYr: rsltnYr,
      cnsbDcd: cnsbDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB05010S/sqCheck",
      data: paramData,
      dataType: "json",
      success: function (data) {
        //console.log("confirm::::::::::", data);
        if (data.dupYn == "N" && data.gapYn == "N") {
          //console.log("가능");
        } else if (data.dupYn == "Y" && data.gapYn == "N") {
          //console.log("이미 등록된 회차 존재");
          $("#TB05010S_inspctCnfrncSqcSq2").val("").focus();
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "이미 등록된 회차가 존재합니다.",
            confirmButtonText: "확인",
          });
        } else if (data.dupYn == "N" && data.gapYn == "Y") {
          //console.log("결번 존재");
          $("#TB05010S_inspctCnfrncSqcSq2").val("").focus();
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "결번인 회차가 존재합니다.",
            confirmButtonText: "확인",
          });
        }
      },
    });
  }

  function mmbrDelRow() {
    /* 그리드 체크 갯수 */
    let gridData = $("#gridMmbrList").pqGrid("option", "dataModel.data");
    let checkedRows = [];
    for (let i = 0; i < gridData.length; i++) {
      MMBRCount--;
      let rowData = gridData[i];
      if (rowData.chkYn == "Y") {
        indexDel = i;
        checkedRows.push(rowData);
      }
    }

    if (checkedRows && checkedRows.length > 0) {
      // 체크된 행들을 반복하며 삭제
      checkedRows.forEach(function (row) {
        $("#gridMmbrList").pqGrid("deleteRow", { rowIndx: row.pq_ri });
      });
    }
    if (checkedRows.length <= 0) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "삭제할 위원정보 행을 체크해주세요.",
        confirmButtonText: "확인",
      });
      return false;
    }
  }

  function delCaseList() {
    /* 그리드 체크 갯수 */
    let gridData = $("#gridCaseList").pqGrid("option", "dataModel.data");
    let checkedRows = [];
    for (let i = 0; i < gridData.length; i++) {
      MMBRCount--;
      let rowData = gridData[i];
      if (rowData.chkYn == "Y") {
        indexDel = i;
        checkedRows.push(rowData);
      }
    }

    if (checkedRows && checkedRows.length > 0) {
      // 체크된 행들을 반복하며 삭제
      checkedRows.forEach(function (row) {
        $("#gridCaseList").pqGrid("deleteRow", { rowIndx: row.pq_ri });
      });
    }
    if (checkedRows.length <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "삭제할 안건정보 행을 체크해주세요.",
        confirmButtonText: "확인",
      });
      return false;
    }
  }

  function mmbrList() {
    $.ajax({
      type: "GET",
      url: "/getSelectBoxCode/C002",
      async: false,
      dataType: "json",
      success: function (data) {
        mmbrDcd = data;
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
		rowClick: function(evt, ui) {
			pqGridSelectHandler ( ui.rowIndx, "gridCaseList" );
		},
      },
      // 위원정보
      {
        height: 200,
        maxHeight: 200,
        id: "gridMmbrList",
        editable: false,
        colModel: colMmbrList,
		rowClick: function(evt, ui) {
			pqGridSelectHandler ( ui.rowIndx, "gridMmbrList" );
		},
      }
    ];
    setPqGrid(arrPqGridObj);

    arrPqGridCnfrncList = $("#gridCnfrncList").pqGrid("instance");
    arrPqGridCaseList = $("#gridCaseList").pqGrid("instance");
    arrPqGridMmbrInfo = $("#gridMmbrList").pqGrid("instance");

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

  function chngStdYr(e) {
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
    //if ($("#TB05010S_inspctPrgrsStCd2").val() != "") {
    // 버튼 활성화/비활성화
    $("#saveButton").attr("disabled", false);
    $("#confirmButton").attr("disabled", true);
    $("#cancleButton").attr("disabled", true);

    //협의체 기본정보 초기화 및 셋팅
    //$("#TB05010S_inspctCnfrncSqcSq2").val();
    //   Number($("#TB05010S_inspctCnfrncSqcSq2").val()) + 1
    // );
    $("#TB05010S_rsltnDt2").val("");
    $("#TB05010S_rsltnTm2").val("");
    $("#TB05010S_inspctPrgrsStCd2").val("");
    $("#TB05010S_inspctCnfrncSqcSq2").val("");

    $("#TB05010_fileList").html("");
    $("#TB05010S_MMBRList").html("");
    $("#TB05010S_CASEList").html("");
    $("#gridCnfrncList").pqGrid("option", "dataModel.data", []);
    $("#gridCnfrncList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridCaseList").pqGrid("option", "dataModel.data", []);
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridMmbrList").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrList").pqGrid("refreshDataAndView"); // pqgrid 초기화

    $("#saveButton").attr("disabled", true);
    $("#confirmButton").attr("disabled", true);
    $("#cancleButton").attr("disabled", true);
    // } else {
    //   // 버튼 활성화/비활성화
    //   $("#saveButton").attr("disabled", false);
    //   $("#confirmButton").attr("disabled", true);
    //   $("#cancleButton").attr("disabled", true);
    // }
    $("#addCnfrncInfo").prop("disabled", false);
    $("#delCnfrncInfo").prop("disabled", false);
    $("#approveAlert").prop("disabled", false);
    $("#cancelAlert").prop("disabled", false);
  }

  function inputReset() {
    $("#gridCaseList").pqGrid("option", "dataModel.data", []); // 안건정보
    $("#gridCaseList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#TB05010S_rsltnDt2").val(""); //결의일
    $("#TB05010S_rsltnTm2").val(""); //시간
    $("#TB05010S_inspctPrgrsStCd2").val(""); //회차
  }

  function getCNFRNCList() {
    var inspctCnfrncCcd = $("#TB05010S_R016").val(); // 전결협의체
    var stdYr = $("#TB05010S_stdYr").val(); // 결의년도

    MMBRCount = 0;
    if (inspctCnfrncCcd === "") {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
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
        arrPqGridCnfrncList.option("rowClick", function (event, ui) {
          pqGridSelectHandler(ui.rowIndx, "gridCnfrncList");
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

    if (cnsbDcd && rsltnYr && String(inspctCnfrncSqcSq)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
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
        $("#TB05010S_inspctPrgrsStCd2").val(data.mtrPrgSttsDcdNm);
        $("#TB05010S_mtrPrgSttdDcd").val(data.mtrPrgSttsDcd);

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
          $("#addCnfrncInfo").prop("disabled", true);
          $("#delCnfrncInfo").prop("disabled", true);
          $("#approveAlert").prop("disabled", true);
          $("#cancelAlert").prop("disabled", true);
        } else if (Number(data.mtrPrgSttsDcd) <= 306) {
          $("#addCnfrncInfo").prop("disabled", false);
          $("#delCnfrncInfo").prop("disabled", false);
          $("#approveAlert").prop("disabled", false);
          $("#cancelAlert").prop("disabled", false);
        } else {
          $("#addCnfrncInfo").prop("disabled", false);
          $("#delCnfrncInfo").prop("disabled", false);
          $("#approveAlert").prop("disabled", false);
          $("#cancelAlert").prop("disabled", false);
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
    html +=
      '    <td><a href="' + encUri + '">' + result.orgFileNm + "</a></td>";
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
      aprvOppsDcd: "",
      aprvOppsDcdNm: "",
      atdcTrgtDcd: "",
      atdcTrgtEmpnm: "",
      atdcTrgtEmpno: "",
      atdcAngtEmpnm: "",
      atdcAngtEmpno: "",
      atdcYn: "",
      cnsbDcd: "",
      cnsbSq: "",
    };
    $("#gridMmbrList").pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });
  }

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

  // TB05010S 임시저장버튼
  function tempSave() {
    var MMBRListCount = arrPqGridMmbrInfo.pdata.length;
    var CASEListCount = arrPqGridCaseList.pdata.length;
    let CnfrncList = arrPqGridCnfrncList.pdata; //// 협의체 결의 및 목록
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
        icon: "warning",
        title: "Warning!",
        text: "회차정보를 확인하세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      /* 협의체 회차정보 */
      var inspctCnfrncCcd = $("#TB05010S_R016_2").val(); //전결협의체
      var stdYr = $("#TB05010S_stdYr").val(); //결의년도
      var inspctCnfrncSqcSq = $("#TB05010S_inspctCnfrncSqcSq2").val(); //회차
      var rsltnDt = $("#TB05010S_rsltnDt2").val(); //결의일
      var rsltnTm = $("#TB05010S_rsltnTm2").val(); //결의시간
      var inspctPrgrsStCd = $("#TB05010S_inspctPrgrsStCd2").val(); //진행상태

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
          mtrPrgSttsDcd: arrPqGridCaseList.pdata[i].mtrPrgSttsDcd ?? "303", // null 또는 undefined일 때 303으로 할당
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
          //location.reload();
          if (statusCode === 303) {
            $("#addCnfrncInfo").attr("disabled", false);
            $("#delCnfrncInfo").attr("disabled", false);
            $("#TB05010S_rsltnDt2").attr("disabled", false);
            $("#TB05010S_rsltnTm2").attr("disabled", false);
            $("#TB05010S_inspctCnfrncSqcSq2").attr("disabled", false);
            $("#addRowBtn").attr("disabled", false);
            $("#delRowBtn").attr("disabled", false);
            $("#confirmButton").attr("disabled", false);
            $("#saveButton").attr("disabled", false);
            $("#cancleButton").attr("disabled", true);
          } else {
            $("#addCnfrncInfo").attr("disabled", true);
            $("#delCnfrncInfo").attr("disabled", true);
            $("#TB05010S_rsltnDt2").attr("disabled", true);
            $("#TB05010S_rsltnTm2").attr("disabled", true);
            $("#TB05010S_inspctCnfrncSqcSq2").attr("disabled", true);
            $("#addRowBtn").attr("disabled", true);
            $("#delRowBtn").attr("disabled", true);
            $("#confirmButton").attr("disabled", true);
            $("#saveButton").attr("disabled", true);
            $("#cancleButton").attr("disabled", false);
          }
        });
      },
      error: function () { },
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
      render: function (ui) {
        let rowData = ui.rowData;
        return `${rowData.cnsbDcdNm} ${rowData.rsltnYr}년도 ${rowData.sn}회차 협의회 결의`;
      },
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
      halign: "center",
      align: "center",
      minWidth: 36,
      maxWidth: 36,
      editable: true,
      filter: { crules: [{ condition: "range" }] },
      editor: false,
      type: "checkBoxSelection",
      cb: {
        all: true,
        header: true,
        check: "Y",
        uncheck: "N",
      },
    },
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "순서",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건구분코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "안건구분",
      dataType: "string",
      dataIndx: "mtrDcdNm",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의정보",
      dataType: "string",
      dataIndx: "jdgmDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
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
      hidden: true,
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
      hidden: true,
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
      hidden: true,
    },
    {
      title: "심사역",
      dataType: "string",
      dataIndx: "ownPNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건일련번호",
      dataIndx: "dealSn",
      hidden: true,
    },
  ];

  let colMmbrList = [
    {
      title: "",
      dataType: "string",
      dataIndx: "chkYn",
      halign: "center",
      align: "center",
      minWidth: 35,
      maxWidth: 35,
      editable: true,
      filter: { crules: [{ condition: "range" }] },
      editor: false,
      type: "checkBoxSelection",
      cb: {
        all: true,
        header: true,
        check: "Y",
        uncheck: "N",
      },
    },
    {
      title: "위원구분",
      dataType: "string",
      dataIndx: "atdcTrgtDcd",
      halign: "center",
      align: "center",
      // width : "20%",
      editable: true,
      filter: { crules: [{ condition: "range" }] },
      editor: {
        type: "select",
        valueIndx: "cdValue",
        labelIndx: "cdName",
        options: function () {
          return mmbrDcd
        },
      },
      render: function (ui) {
        var options = mmbrDcd;
        var option = options.find((opt) => opt.CD_VL_ID == ui.cellData);
        return option ? option.CD_VL_NM : ui.cellData;
      },
    },
    {
      title: "위원",
      dataType: "",
      dataIndx: "",
      align: "center",
      // width : "35%",
      filter: { crules: [{ condition: "range" }] },
      colModel: [
        {
          title: "위원번호",
          dataType: "string",
          dataIndx: "atdcTrgtEmpno",
          align: "center",
          halign: "center",
          hidden: true,
        },
        {
          title: "위원명",
          dataType: "string",
          dataIndx: "atdcTrgtEmpnm",
          align: "center",
          halign: "center",
        },
        {
          title: "",
          dataType: "",
          dataIndx: "",
          align: "center",
          halign: "center",
          minWidth: 36,
          maxWidth: 36,
          render: function (ui) {
            let rowData = ui.rowData;
            return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03022P('TB05010S_mmbrTrgt', ${ui.rowIndx});"><i class='fa fa-search'></i></button>`;
          },
        },
      ],
    },
    {
      title: "대리참석위원",
      dataType: "string",
      dataIndx: "",
      // width : "35%",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      colModel: [
        {
          title: "대리참석위원번호",
          dataType: "string",
          dataIndx: "atdcAngtEmpno",
          align: "center",
          halign: "center",
          hidden: true,
        },
        {
          title: "대리참석위원",
          dataType: "string",
          dataIndx: "atdcAngtEmpnm",
          align: "center",
          halign: "center",
        },
        {
          title: "",
          dataType: "",
          dataIndx: "",
          align: "center",
          halign: "center",
          minWidth: 36,
          maxWidth: 36,
          render: function (ui) {
            let rowData = ui.rowData;
            return `<button class='ui-button ui-corner-all ui-widget' onclick="callTB03022P('TB05010S_mmbrAngt', ${ui.rowIndx});"><i class='fa fa-search'></i></button>`.trim();
          },
        },
      ],
    },
  ];

  return {
    tempSave: tempSave,
    changeCNFRNCStatus: changeCNFRNCStatus,
    chngInspctPrgrsStCd: chngInspctPrgrsStCd,
    getCNFRNCList: getCNFRNCList,
    btnReset: btnReset,
    delCaseList: delCaseList,
    chngInspctCnfrncSqc: chngInspctCnfrncSqc,
    addMMBRRow: addMMBRRow,
    mmbrDelRow: mmbrDelRow,
    chngStdYr: chngStdYr,
  };
})();