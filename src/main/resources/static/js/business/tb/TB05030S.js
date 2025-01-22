const TB05030Sjs = (function () {
  let arrPqGridCaseInfo; // 안건정보
  let arrPqGridMmbrInfo; // 의결내용
  let arrPqGridIbDealInfo; // 협의결과
  let aprvOppsDcd = [];
  let rsltnRsltCd = []; // R025 찬반구분코드?
  let setEditable = true; // 의결내용 그리드 내 editable 상태 관리해야 할 컬럼 "MMBRChk","atdcYn", "aprvOppsDcdNm", "opnnCtns"

  $(document).ready(function () {
    TB05030S_setFileButtonEnabled(false);
    touchSpin(); // 결의년도 좌우 가산
    loadSelectBoxContents(); // 셀렉트박스 정보 취득
    SB_inspctCnfrncCcd(); // 전결협의체 셀렉트박스 변경
    loadAprvOpstnCcd(); // 찬반구분코드
    loadRsltnRsltCd(); //의결코드
    tableFunction();
    compControl();
    // 이번년도
    let getYr = getToday().substring(0, 4);
    // 결의년도 이번년도로 세팅
    $("#TB05030S_stdYr").val(getYr);
    getCNFRNCList();
    rendorGrid();
  });

  function TB05030S_setFileButtonEnabled(isEnabled) {
    // enabled가 true이면 버튼 활성화, false이면 비활성화
    $("#UPLOAD_AddFile").prop("disabled", !isEnabled);
    $("#UPLOAD_DelFiles").prop("disabled", !isEnabled);
  }

  /**
   * 그리드 초기화
   */
  function chnginspctCnfrncSqcSq(e) {
    $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
    $("#gridCaseInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
    $("#gridIbDealInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
  }

  /**
   * 그리드세팅
   */
  function rendorGrid() {
    /** 그리드 **/
    let arrPqGridObj = [
      // 안건
      {
        height: 150,
        maxHeight: 150,
        id: "gridCaseInfo",
        colModel: selectColModel(1),
      },
      // 의결내용
      {
        height: 150,
        maxHeight: 150,
        id: "gridMmbrInfo",
        colModel: selectColModel(2),
      },
      // 협의결과
      {
        height: 80,
        maxHeight: 80,
        id: "gridIbDealInfo",
        colModel: selectColModel(3),
      },
    ];

    setPqGrid(arrPqGridObj);

    arrPqGridCaseInfo = $("#gridCaseInfo").pqGrid("instance");
    arrPqGridMmbrInfo = $("#gridMmbrInfo").pqGrid("instance");
    arrPqGridIbDealInfo = $("#gridIbDealInfo").pqGrid("instance");
  }

  /**
   * 결의년도 input change이벤트
   * @param {*} obj
   */
  function fnStdYrChng(obj) {
    $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
    $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
    $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);

    $("#TB05030S_R025 option:eq(0)").prop("selected", true);
    $("#TB05030S_invstCrncyCdNm").val("");
    $("#TB05030S_rcgAmt").val("");
    $("#TB05030S_sdnCndtF option:eq(0)").prop("selected", true);
    $("#TB05030S_etcCndtF option:eq(0)").prop("selected", true);

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

  /**
   * 찬반구분코드
   */
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
        for (let i = 0; i < data.length; i++) {
          aprvOppsDcd.push(data[i]);
        }
      },
    });
  }

  /**
   * 결의결과코드
   */
  function loadRsltnRsltCd() {
    var codeList = {
      codeList: "R025",
    };

    $.ajax({
      type: "GET",
      url: "/getSelectBoxList",
      data: codeList,
      dataType: "json",
      success: function (data) {
        rsltnRsltCd = data;
      },
    });
  }

  // 컴포넌트 컨트롤
  function compControl() {
    // 의결내용 버튼 비활성
    $(".ibox-tools .btn-success").prop("disabled", true);
    $(".ibox-tools .btn-danger").prop("disabled", true);
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

  /**
   * 안건정보 테이블 체크박스 이벤트 설정
   */
  function CASEChk() {
    $("#CASEChk").change(function () {
      if ($("#CASEChk").is(":checked")) {
        $(".CASEChk").prop("checked", true);
      } else {
        $(".CASEChk").prop("checked", false);
      }
    });
  }

  /**
   * 안건 그리드 조회
   * 조회조건
   * 1. 결의협의체
   * 2. 결의년도
   * 3. 회차
   * @returns
   */
  function searchCNFRNC() {
    TB05030S_clearAllGrid();
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
        icon: "info",
        title: "Info!",
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

  /**
   * 협의체 부의 및 결과 조회
   * 1.
   * @param {*} paramData
   */
  function getCASEInfo(paramData) {
    $.ajax({
      type: "GET",
      url: "/TB05030S/getCASEInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        TB05030S_setFileButtonEnabled(false);
        if (data.length == 0) {
          // 데이터가 없을 경우, "조회된 데이터가 없습니다" 메시지 설정
          arrPqGridCaseInfo.option("strNoRows", "조회된 데이터가 없습니다.");
          arrPqGridMmbrInfo.option("strNoRows", "조회된 데이터가 없습니다.");
          arrPqGridIbDealInfo.option("strNoRows", "조회된 데이터가 없습니다.");
        } else {
          arrPqGridCaseInfo.setData(data);
          arrPqGridCaseInfo.option("rowDblClick", function (event, ui) {
            TB05030S_setFileButtonEnabled(true);
            let key2 = `${ui.rowData.cnsbDcd}|${ui.rowData.cnsbSq}|${ui.rowData.rsltnYr}|${ui.rowData.sn}`;
            getFileInfo($("#key1").val(), key2);
            CNFRNCDetail(ui.rowData);
          });
        }
      },
      error: function () {},
    });
  }

  /**
   * 안건 상세보기 느낌??
   * @param {*} e
   * @description
   * 의결내용 그리드 조회
   * 안건 상태구분코드에 따라서 의결내용 그리드 컬럼 수정가능,불가능 상태 제어
   *
   * 협의결과 그리드 조회
   * 관련자료 조회
   */
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
      mtrPrgSttsDcd: e.mtrPrgSttsDcd,
    };

    // 협의체 준비확정인 안건만 의결내용 저장가능.
    if (e.mtrPrgSttsDcd === "304") {
      $("#saveMmbrConfirm").prop("disabled", false);
      $("#btnConfirmDeal").prop("disabled", false);
      $("#btnCancelDeal").prop("disabled", true);
      setEditable = true;
    }
    // 나머지는 수정 불가능
    else if (Number(e.mtrPrgSttsDcd) > 304 && Number(e.mtrPrgSttsDcd) <= 400) {
      $("#saveMmbrConfirm").prop("disabled", true);
      $("#btnConfirmDeal").prop("disabled", true);
      $("#btnCancelDeal").prop("disabled", false);
      setEditable = false;
    } else if (Number(e.mtrPrgSttsDcd) > 400) {
      $("#saveMmbrConfirm").prop("disabled", true);
      $("#btnConfirmDeal").prop("disabled", true);
      $("#btnCancelDeal").prop("disabled", true);
      setEditable = false;
    }

    // 파일 조회 검색 조건 세팅
    $("#fileIbDealNo").val("M" + cnsbDcd + "0000000000");
    $("#fileRiskInspctCcd").val(rsltnYr.substring(2, 4));
    $("#fileLstCCaseCcd").val(("0" + cnsbSq).slice(-2));

    // editable 상태는 전역변수 상태를 변경 그리드 옵션초기화
    setPqGrid([
      {
        height: 150,
        maxHeight: 150,
        id: "gridMmbrInfo",
        colModel: selectColModel(2),
      },
    ]);

    $("#gridMmbrInfo").pqGrid("refreshDataAndView");

    getMMBRInfo(paramData);
    getIBDEALInfo(paramData);
    //getFileInfo();
  }

  /**
   * 이거 사용하시면 pqgrid작동 안합니다.
   * 특정 컬럼의 편집 가능/불가능 상태를 제어합니다.
   * @param {boolean} isEditable - true면 편집 가능, false면 편집 불가능
   */
  // function colMmbrInfoSetColumnEditable(isEditable) {
  //   // 원본 colModel 깊은 복사
  //   let colModel = JSON.parse(JSON.stringify(colMmbrInfo));

  //   // 편집을 제어할 컬럼 목록

  //   // 특정 컬럼의 편집 상태만 변경
  //   colModel.forEach(function (col) {
  //     if (targetColumns.includes(col.dataIndx)) {
  //       col.editable = isEditable; // 편집 가능/불가능 상태 동적 변경
  //       col.editor = isEditable ? col.editor : null; // 편집 가능할 때만 editor 유지
  //       // MMBRChk 컬럼의 헤더 체크박스를 비활성화
  //       // if (col.dataIndx === "MMBRChk") {
  //       //   if (isEditable) {
  //       //       // 헤더 체크박스 클릭을 막는 이벤트 처리
  //       //       col.cb.header = true; // 체크박스 선택 못하게 비활성화
  //       //   } else {
  //       //       col.cb.header = false; // 편집 가능 시 헤더 체크박스 활성화
  //       //   }
  //       // }
  //     }
  //   });

  //   // 변경된 colModel을 pqGrid에 적용
  //   $("#gridMmbrInfo").pqGrid("option", "colModel", colModel);

  //   // 헤더 체크박스 클릭을 막는 코드
  //   // if (!isEditable) {
  //   //   // MMBRChk 헤더 클릭을 막기 위해 이벤트 리스너 추가
  //   //   $("#gridMmbrInfo").on("checkAll", function (event, ui) {
  //   //       // MMBRChk 헤더의 체크를 막기 위해 이벤트를 취소
  //   //       ui.checked = false; // 체크 상태 변경을 방지
  //   //   });
  //   // } else {
  //   //     // 편집 가능 상태에서 체크박스 클릭 이벤트를 다시 활성화
  //   //     $("#gridMmbrInfo").off("checkAll");
  //   // }
  // }

  /**
   * 의결내용 업데이트
   * @param {Object} paramData 안건데이터
   */
  function getMMBRInfo(paramData) {
    var MMBRCount = 0;

    $.ajax({
      type: "GET",
      url: "/TB05030S/getMMBRInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridMmbrInfo.setData(data);
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

        $("#TB05030S_R025").val(data[0].rsltnRsltCd).attr("selected", true);
        $("#TB05030S_invstCrncyCdNm").val(data[0].ptfdCrryCdNm);
        $("#TB05030S_rcgAmt").val(
          data[0].apvlAmt ? addComma(data[0].apvlAmt) : ""
        );
        $("#TB05030S_sdnCndtF").val(data[0].sdnCndtF).attr("selected", true);
        $("#TB05030S_etcCndtF").val(data[0].etcCndtF).attr("selected", true);
        $("#TB05030S_cnfrncNtmCndtlCntnt").val(data[0].sdnCndtCtns);
        $("#TB05030S_rsltCntnt").val(data[0].etcCndtCtns);
      },
      error: function () {},
    });
  }

  function MMBRConfirm(mode) {
    updateMMBRInfo(mode);
  }

  /**
   * 의결 내용 업데이트
   * @param {*} mode
   */
  function updateMMBRInfo(mode) {
    let mmbrList = [];
    let checkList = [];
    let selectedDealOption = false;

    // 단건저장이라 무조건 체크박스 선택함
    var grid = $("#gridMmbrInfo");
    for (let i = 0; i < arrPqGridMmbrInfo.pdata.length; i++) {
      let checkedRows = arrPqGridMmbrInfo.pdata[i];
      var firstRow = grid.pqGrid("getData")[0];
      if (firstRow && firstRow.MMBRChk !== "Y") {
        firstRow.MMBRChk = "Y";
      }
      grid.pqGrid("refreshDataAndView");

      if (checkedRows.MMBRChk == "Y") {
        checkList.push(checkedRows);
      }
    }
    checkList.forEach(function (row) {
      let obj = {};
      if (checkList.length > 0) {
        if (mode === "confirm") {
          selectedDealOption = true;
          obj.mode = mode;
          obj.cnsbDcd = row.cnsbDcd;
          obj.rsltnYr = $("#TB05030S_stdYr").val();
          obj.cnsbSq = row.cnsbSq;
          obj.sn = row.sn;
          obj.atdcYn = row.atdcYn;
          obj.aprvOppsDcd = row.aprvOppsDcd;
          obj.opnnCtns = row.opnnCtns;
          obj.opnnRgstDt = row.opnnRgstDt;
          mmbrList.push(obj);
        } else {
          selectedDealOption = false;
          obj.mode = mode;
          obj.cnsbDcd = row.cnsbDcd;
          obj.rsltnYr = row.rsltnYr;
          obj.cnsbSq = row.cnsbSq;
          obj.sn = row.sn;
          mmbrList.push(obj);
        }
      }
    });

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
            $("#gridCaseInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
            $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
            $("#gridMmbrInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
            $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
            $("#gridIbDealInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화

            $("#TB05030S_R025 option:eq(0)").prop("selected", true);
            $("#TB05030S_invstCrncyCdNm").val("");
            $("#TB05030S_rcgAmt").val("");
            $("#TB05030S_sdnCndtF option:eq(0)").prop("selected", true);
            $("#TB05030S_etcCndtF option:eq(0)").prop("selected", true);

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

  /**
   * 협의결과 확정, 확정취소
   * @param {String} mode
   * @returns
   */
  function ibDealConfirm(mode) {
    var cnsbDcd = arrPqGridIbDealInfo.pdata[0].cnsbDcd;
    var rsltnYr = $("#TB05030S_stdYr").val();
    var cnsbSq = arrPqGridIbDealInfo.pdata[0].cnsbSq;
    var sn = arrPqGridIbDealInfo.pdata[0].sn;
    var dealNo = arrPqGridIbDealInfo.pdata[0].dealNo;
    var jdgmDcd = arrPqGridIbDealInfo.pdata[0].jdgmDcd;
    var mtrDcd = arrPqGridIbDealInfo.pdata[0].mtrDcd;
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
        if (
          isEmpty(arrPqGridMmbrInfo.pdata[i].aprvOppsDcdNm) ||
          isEmpty(arrPqGridMmbrInfo.pdata[i].atdcYn) ||
          isEmpty(arrPqGridMmbrInfo.pdata[i].opnnCtns)
        ) {
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
      if (isEmpty(apvlAmt) || Number(apvlAmt) <= 0) {
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
      apvlAmt = 0; // 컬럼타입때문에 ''로 안들어감.
    }

    var paramData = {
      cnsbDcd: cnsbDcd,
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
      mode: mode,
    };

    $.ajax({
      type: "POST",
      url: "/TB05030S/updateIBDEALInfo",
      contentType: "application/json;",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "협의결과 내용을 변경하였습니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          $("#gridCaseInfo").pqGrid("option", "dataModel.data", []);
          $("#gridCaseInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
          $("#gridMmbrInfo").pqGrid("option", "dataModel.data", []);
          $("#gridMmbrInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
          $("#gridIbDealInfo").pqGrid("option", "dataModel.data", []);
          $("#gridIbDealInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화

          $("#TB05030S_R025 option:eq(0)").prop("selected", true);
          $("#TB05030S_invstCrncyCdNm").val("");
          $("#TB05030S_rcgAmt").val("");
          $("#TB05030S_sdnCndtF option:eq(0)").prop("selected", true);
          $("#TB05030S_etcCndtF option:eq(0)").prop("selected", true);

          $("#TB05030S_cnfrncNtmCndtlCntnt").val("");
          $("#TB05030S_rsltCntnt").val("");
          searchCNFRNC();
          getMMBRInfo(paramData);
          getIBDEALInfo(paramData);
        });
      },
    });
  }

  /**
   * 화면 초기화
   */
  function TB05030S_clearAllGrid() {
    $("#TB05030S_R025").val(""); //결의결과
    $("#TB05030S_invstCrncyCdNm").val(""); //승인금액
    $("#TB05030S_rcgAmt").val("");
    $("#TB05030S_sdnCndtF").val(""); //승인조건 (셀다운)
    $("#TB05030S_etcCndtF").val(""); //승인조건 (기타)
    $("#TB05030S_cnfrncNtmCndtlCntnt").val(""); //부의조건
    $("#TB05030S_rsltCntnt").val(""); //결의의견

    arrPqGridCaseInfo.option("dataModel.data", []); // 안건정보 그리드
    arrPqGridMmbrInfo.option("dataModel.data", []); // 의결내용 그리드
    arrPqGridIbDealInfo.option("dataModel.data", []); // 협의결과 그리드

    $("#UPLOAD_FileList").empty(); //관련자료
  }

  /* ***********************************그리드 컬럼******************************** */

  function selectColModel(number) {
    // 안건
    let colCaseInfo = [
      {
        title: "dealNo",
        dataType: "string",
        dataIndx: "dealNo",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "결의협의체",
        dataType: "string",
        dataIndx: "cnsbDcd",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
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
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "안건번호",
        dataType: "string",
        dataIndx: "mtrDcd",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
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
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          console.log("렌더 되네?");

          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            return addComma(cellData);
          }
          return cellData;
        },
      },
      {
        title: "결의일자",
        dataType: "date",
        dataIndx: "cnsbOpnDt",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length !== 0) {
            let cnsbOpnDt1 = cellData.substring(0, 4);
            let cnsbOpnDt2 = cellData.substring(4, 6);
            let cnsbOpnDt3 = cellData.substring(6, 8);
            return `${cnsbOpnDt1}-${cnsbOpnDt2}-${cnsbOpnDt3}`.trim();
          }
          return cellData;
        },
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

    // 의결내용
    let colMmbrInfo = [
      {
        title: "",
        dataType: "string",
        dataIndx: "MMBRChk",
        align: "center",
        minWidth: 36,
        maxWidth: 36,
        editable: setEditable,
        filter: { crules: [{ condition: "range" }] },
        editor: false,
        type: "checkBoxSelection",
        cb: {
          all: true,
          header: true,
          check: "Y",
          uncheck: "N",
        },
        hidden: true,
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
        halign: "center",
        align: "center",
        editable: setEditable,
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          options: ["Y", "N"],
        },
      },
      // {
      //   title: "의결",
      //   dataType: "string",
      //   dataIndx: "aprvOppsDcd",
      //   halign: "center",
      //   align: "center",
      //   filter: { crules: [{ condition: "range" }] },
      //   hidden: true,
      // },
      {
        title: "의결",
        dataType: "string",
        dataIndx: "aprvOppsDcd",
        halign: "center",
        align: "center",
        editable: setEditable,
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: aprvOppsDcd,
        },
        render: function (ui) {
          var options = aprvOppsDcd;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "심의의견",
        dataType: "string",
        dataIndx: "opnnCtns",
        halign: "center",
        align: "left",
        editable: setEditable,
        filter: { crules: [{ condition: "range" }] },
        editor: { type: "textarea" },
      },
      {
        title: "등록년월일",
        dataType: "date",
        dataIndx: "opnnRgstDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          console.log("렌더 왜 안돔");
          return formatDate(ui.cellData);
        },
      },
      {
        title: "회의록확인",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "확인자",
        dataType: "string",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "확인일시",
        dataType: "date",
        dataIndx: "",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "위원회멤버구분코드",
        dataType: "string",
        dataIndx: "atdcTrgtDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "일련번호",
        dataType: "string",
        dataIndx: "sn",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
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
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            return addComma(cellData);
          }
          return cellData;
        },
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
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData !== null && cellData !== undefined) {
            return addComma(cellData);
          }
          return cellData;
        },
      },
      {
        title: "승인조건",
        dataType: "string",
        dataIndx: "rsltnRsltCdNm",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
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
        title: "Deal번호",
        dataType: "string",
        dataIndx: "dealNo",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "jdgmDcd",
        dataType: "string",
        dataIndx: "jdgmDcd",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
      {
        title: "mtrDcd",
        dataType: "string",
        dataIndx: "mtrDcd",
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
        title: "cnsbSq",
        dataType: "string",
        dataIndx: "cnsbSq",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        hidden: true,
      },
    ];

    if (number === 1) {
      return colCaseInfo;
    } else if (number === 2) {
      return colMmbrInfo;
    } else if (number === 3) {
      return colIbDealInfo;
    }
  }

  return {
    fnStdYrChng: fnStdYrChng,
    chnginspctCnfrncSqcSq: chnginspctCnfrncSqcSq,
    searchCNFRNC: searchCNFRNC,
    MMBRConfirm: MMBRConfirm,
    ibDealConfirm: ibDealConfirm,
  };
})();
