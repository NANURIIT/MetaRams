const TB08010Sjs = (function () {
  // 상단그리드
  let arrPqGridDealListInfo;
  // 관리이력 그리드
  let arrPqGridEamDetailInfo;
  // 재산조사 그리드
  let arrPqGridEsttDetailInfo;
  // 법적절차 그리드
  let arrPqGridLglDetailInfo;
  // 시효관리 그리드
  let arrPqGridEfctDetailInfo;
  // 안건연결 그리드
  // let arrPqGridCnctDetailInfo;
  $(document).ready(function () {
    loadSelectBoxContents();
    rendorGrid();
    resetBtnClick();

    // url 정보 세팅은 마지막에 하도록 한다.
    getUrlDealInfo();
  });

  // URL 히든 Deal번호
  function getUrlDealInfo() {
    var urlParam = window.location.search;
    var urlParams = new URLSearchParams(urlParam);

    var dealNo = urlParams.get("dealNo");

    if (!isEmpty(dealNo)) {
      $("#TB08010S_ibDealNo").val(dealNo);

      getEamList();

      /*setTab1(dealNo);
			setTab2(dealNo);
			setTab3(dealNo);
			setTab4(dealNo);
			setTab5(dealNo);*/
    }
  }
  /**
   * 그리드 렌더링
   */
  function rendorGrid() {
    /** 그리드 **/
    let arrPqGridObj = [
      // 딜정보
      {
        height: 140,
        maxHeight: 140,
        id: "TB08010S_ibDealList",
        colModel: colDealListInfo,
      },
      // 사후관리이력
      {
        height: 140,
        maxHeight: 140,
        id: "TB08010S_eamDetail",
        colModel: colEamList,
      },
      // 재산조사
      {
        height: 140,
        maxHeight: 140,
        id: "Estt_List",
        colModel: colEsttDetail,
      },
      // 법적절차
      {
        height: 140,
        maxHeight: 140,
        id: "Lgl_List",
        colModel: colLglDetail,
      },
      // 시효관리
      {
        height: 140,
        maxHeight: 140,
        id: "Efct_List",
        colModel: colEfctDetail,
      },
      // 안건연결
      // {
      // 	height    : 140
      // 	, maxHeight : 140
      // 	, id        : 'cnct_List'
      // 	, colModel  : colCnctDetail
      // },
    ];
    setPqGrid(arrPqGridObj);

    arrPqGridDealListInfo = $("#TB08010S_ibDealList").pqGrid("instance"); // 딜정보 그리드 instance
    arrPqGridEamDetailInfo = $("#TB08010S_eamDetail").pqGrid("instance"); // 사후관리이력 그리드 instance
    arrPqGridEsttDetailInfo = $("#Estt_List").pqGrid("instance"); // 재산조사 그리드 instance
    arrPqGridLglDetailInfo = $("#Lgl_List").pqGrid("instance"); // 법적절차 그리드 instance
    arrPqGridEfctDetailInfo = $("#Efct_List").pqGrid("instance"); // 시효관리 그리드 instance
    // arrPqGridCnctDetailInfo = $("#cnct_List").pqGrid('instance');			// 안건연결 그리드 instance
  }

  // 탭 페이지 항목 로드
  function loadSelectBoxContents() {
    var item = "";
    item += "F012"; // 사후관리구분코드
    item += "/" + "P010"; // 재산조사대상구분코드
    item += "/" + "E029"; // 재산종류구분코드
    item += "/" + "L002"; // 법적절차종류구분코드

    getSelectBoxList("TB08010S", item);
  }

  function resetBtnClick() {
    $("#TB08010S_ibDealNo").val("");
    $("#TB08010S_ibDealNm").val("");
    $("#TB08010S_ibDealList").pqGrid("option", "dataModel.data", []);
    $("#TB08010S_ibDealList").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#TB08010S_eamDetail").pqGrid("option", "dataModel.data", []);
    $("#TB08010S_eamDetail").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#Estt_List").pqGrid("option", "dataModel.data", []);
    $("#Estt_List").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#Lgl_List").pqGrid("option", "dataModel.data", []);
    $("#Lgl_List").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#Efct_List").pqGrid("option", "dataModel.data", []);
    $("#Efct_List").pqGrid("refreshDataAndView"); // pqgrid 초기화
    tab1BtnReset();
    tab2EsttReset();
    tab3LglReset();
    tab4EfctReset();
  }

  //////////////////////////////////////////////////////////

  // 부실자산 사후관리 조회
  function getEamList() {
    tab1BtnReset();
    tab2EsttReset();
    tab3LglReset();
    tab4EfctReset();
    let dealNo = $("#TB08010S_ibDealNo").val();

    // 유효성검사
    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 입력해 주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
      };

      $.ajax({
        type: "GET",
        url: "/TB08010S/getEamList",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            arrPqGridDealListInfo.setData(data);
            arrPqGridDealListInfo.option("rowDblClick", function (event, ui) {
              tab1BtnReset();
              tab2EsttReset();
              tab3LglReset();
              tab4EfctReset();
              setTabContents(ui.rowData);
            });
          }
          // var html = '';
          // var dealList = data;
          // $('#TB08010S_ibDealList').html(html);

          // if (dealList.length > 0){
          // 	$.each(dealList, function(key, value){
          // 		if( value.cnctOption == 'N'){
          // 			html += '<tr ondblclick="setTabContents(this)">';
          // 		}else{
          // 			html += '<tr style="color:red" ondblclick="setTabContents(this)">';
          // 		}
          // 		html += '<td>' + value.dealNo + '</td>';								// deal번호 		- IBDEAL번호
          // 		html += '<td style="display:none">' + value.jdgmDcd + '</td>';			// 					- 리스크심사구분코드
          // 		html += '<td>' + value.jdgmDcdNm + '</td>';								// 신규/재부의정보  - 리스크심사구분코드명
          // 		html += '<td style="display:none">' + value.mtrDcd + '</td>';			// 					- 부수안건구분코드
          // 		html += '<td>' + value.mtrDcdNm + '</td>';								// 부수안건정보 	- 부수안건구분코드명
          // 		html += '<td style="display:none">' + value.dprtCd + '</td>';			// 					- 부서코드
          // 		html += '<td>' + value.chrgPNm + '(' + value.chrgPEno + ')</td>';		// 담당자
          // 		html += '<td style="display:none">' + value.chrgpEno + '</td>';			// 					- 담당자사번
          // 		html += '<td>' + value.dprtNm + '(' + value.dprtCd + ')</td>';			// 담당부서
          // 		html += '<td style="display:none">' + value.dprtCd + '</td>';			// 					- 담당자사번
          // 		html += '<td>' + value.ownPNm + '(' + value.ownPEno +')</td>';			// 심사역 			- 직원명
          // 		html += '<td style="display:none">' + value.ownPEno + '</td>';			// 					- 심사담당자사번
          // 		html += '<td style="display:none">' + value.mtrPrgSttsDcd + '</td>';	// 					- 심사진행상태코드
          // 		html += '<td>' + value.mtrPrgSttsDcdNm + '</td>';						// 진행상태 		- 심사진행상태코드명
          // 		html += '<td>' + value.mtrNm + '</td>';									// 안건명
          // 		html += '<td style="display:none">' + value.cnctOption + '</td>';		// 				- 연결안건여부
          // 		html += '</tr>'

          // 	})
          // }else {
          // 	html += '<tr>';
          // 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
          // 	html += '</tr>';
          // }
          // 			$('#TB08010S_ibDealList').html(html);

          // if(dealList.length != 0) {
          // 	$('#aftrActive tbody tr:first').dblclick();
          // } else {
          // 	var html = "";
          // 	$('#TB08010S_eamDetail').html(html);
          // 	$('#Estt_List').html(html);
          // 	$('#Lgl_List').html(html);
          // 	$('#Efct_List').html(html);
          // 	$('#Cnct_List').html(html);
          // 	tab5CnctReset();
          // }
        },
      });
    }
  }

  // 화면에서 deal Info 검색 후 더블클릭 set
  function setTabContents(e) {
    // function을 호출한 곳의 값을 가져온다. (this)
    var dealNo = e.dealNo; // ibDeal번호
    var jdgmDcd = e.jdgmDcd; // 리스크심사구분코드
    var mtrDcd = e.mtrDcd; // 부수안건구분코드

    var cnctOption = e.cnctOption;

    // 안건연결 sn 초기화
    //$('#hidden_tab5_sn').val('0');

    $("#hidden_dealNo").val(dealNo);
    $("#hidden_jdgmDcd").val(jdgmDcd);
    $("#hidden_mtrDcd").val(mtrDcd);

    // if( cnctOption == 'Y'){
    // 	$('#tab5ResetBtn').attr('disabled', true);
    // 	$('#tab5SaveBtn').attr('disabled', true);
    // 	$('#tab5DeleteBtn').attr('disabled', true);
    // }else{
    // 	$('#tab5ResetBtn').attr('disabled', false);
    // 	$('#tab5SaveBtn').attr('disabled', false);
    // 	$('#tab5DeleteBtn').attr('disabled', false);
    // }

    getEamDetail();
    getEsttDetail();
    getLglDetail();
    getEfctDetail();
    //getCnctList();
  }

  //----------------------------TAB1 관리이력----------------------------

  // 부실자산 사후관리 - 관리이력 탭 설정
  function setTab1(dealNo) {
    getEamDetail(dealNo);
  }

  // 부실자산 사후관리 - 관리이력 조회
  function getEamDetail() {
    var dealNo = $("#hidden_dealNo").val(); // IBDEAL번호
    var jdgmDcd = $("#hidden_jdgmDcd").val(); // 리스크구분심사코드
    var mtrDcd = $("#hidden_mtrDcd").val(); // 부수안건구분코드

    var paramData = {
      dealNo: dealNo,
      jdgmDcd: jdgmDcd,
      mtrDcd: mtrDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB08010S/getEamDetail",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridEamDetailInfo.setData(data);
        arrPqGridEamDetailInfo.option("rowDblClick", function (event, ui) {
          setEamInfoDetail(ui.rowData);
        });
        // var html = '';
        // var eamList = data;
        // $('#TB08010S_eamDetail').html(html);

        // if (eamList.length > 0) {
        // 	$.each(eamList, function(key, value) {

        // 			html += '<tr onclick="setEamInfoDetail(this)">';
        // 		html += '<td>' + value.rgstDt + '</td>';									// 등록일자
        // 		html += '<td style="display:none">' + value.evntAftrMngCcd + '</td>';		// 사후관리구분코드
        // 		html += '<td>' + value.evntAftrMngCcdNm + '</td>';							// 사후관리구분코드명
        // 		html += '<td>' + value.evntAftrMngCntnt + '</td>';							// 사후관리내용
        // 		html += '<td>' + value.fstRgstPEnoNm + '</td>';								// 최초등록자사번
        // 		html += '<td style="display:none;">' + value.sn + '</td>';					// 일련번호
        // 		html += '</tr>';

        // 	})
        // } else {
        // 	html += '<tr>';
        // 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
        // 	html += '</tr>';
        // }
        // $('#TB08010S_eamDetail').html(html);
      },
    });
  }

  // 더블 클릭 후 관리이력 정보 취득
  function setEamInfoDetail(e) {
    var evntAftrMngCcd = e.evntAftrMngCcd; //사후관리구분코드
    var evntAftrMngCntnt = e.evntAftrMngCntnt; //사후관리내용
    var jdgmDcd = e.jdgmDcd; // 심사구분코드
    var mtrDcd = e.mtrDcd; // 부수안건구분코드
    var sn = e.sn;
    var dealNo = $("#hidden_dealNo").val();

    $("#TB08010S_F012").val(evntAftrMngCcd).prop("selected", true); //사후관리구분코드
    $("#TB08010S_evntAftrMngCntnt").val(evntAftrMngCntnt); //사후관리내용
    $("#hidden_tab1_sn").val(sn); //일련번호
    $('div[data-menuid="/TB08010S"] #UPLOAD_AddFile').prop("disabled", false);
    $('div[data-menuid="/TB08010S"] #UPLOAD_DelFiles').prop("disabled", false);
    console.log("hidden_tab1_sn에 설정된 값:", $("#hidden_tab1_sn").val());
    $("#key2").val(dealNo + "-" + jdgmDcd + "-" + mtrDcd + "-" + sn);
    getFileInfo("", $("#key2").val());
  }

  // 부실자산 사후관리 - 관리이력 초기화
  function tab1BtnReset() {
    $("#TB08010S_F012 option:eq(0)").prop("selected", true);
    $("#TB08010S_evntAftrMngCntnt").val("");
    $("#hidden_tab1_sn").val("0");
    $('div[data-menuid="/TB08010S"] #UPLOAD_AddFile').prop("disabled", true);
    $('div[data-menuid="/TB08010S"] #UPLOAD_DelFiles').prop("disabled", true);
    $("#UPLOAD_FileList").html("");
  }

  // 부실자산 사후관리 - 관리이력 저장
  function tab1BtnSave() {
    var dealNo = $("#TB08010S_ibDealNo").val(); //딜번호
    var jdgmDcd = $("#hidden_jdgmDcd").val(); //리스크심사 구분코드
    var mtrDcd = $("#hidden_mtrDcd").val(); //부수안건 구분코드
    var sn = $("#hidden_tab1_sn").val(); //일련번호

    var evntAftrMngCcd = $("#TB08010S_F012").val(); //사후관리구분코드
    var evntAftrMngCntnt = $("#TB08010S_evntAftrMngCntnt").val(); //사후관리내용

    // 유효성 체크
    if (!isEmpty(dealNo)) {
      if (!isEmpty(evntAftrMngCntnt)) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "관리내용을 확인해주세요.",
          confirmButtonText: "확인",
        });
      }
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
        evntAftrMngCcd: evntAftrMngCcd,
        evntAftrMngCntnt: evntAftrMngCntnt,
      };
      $.ajax({
        type: "POST",
        url: "/TB08010S/registEamInfo",
        data: dtoParam,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "관리이력을 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getEamDetail(dealNo);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "관리이력을 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 부실자산 사후관리 - 관리이력 삭제
  function tab1BtnDelete() {
    var dealNo = $("#TB08010S_ibDealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab1_sn").val();

    if (!isEmpty(dealNo)) {
      if (sn != 0) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "사후관리 이력을 선택해주세요.",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal 정보를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/deleteEamInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          swal
            .fire({
              icon: "success",
              title: "success!",
              text: "사후관리이력을 삭제하였습니다.",
              confirmButtonText: "확인",
            })
            .then((result) => {
              getEamDetail(dealNo);
              tab1BtnReset();
            });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "사후관리이력을 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // tab2 재산조사 조회
  function getEsttDetail() {
    var dealNo = $("#hidden_dealNo").val(); // IBDEAL번호
    var jdgmDcd = $("#hidden_jdgmDcd").val(); // 리스크구분심사코드
    var mtrDcd = $("#hidden_mtrDcd").val(); // 부수안건구분코드

    var paramData = {
      dealNo: dealNo,
      jdgmDcd: jdgmDcd,
      mtrDcd: mtrDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB08010S/getEsttDetail",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridEsttDetailInfo.setData(data);
        arrPqGridEsttDetailInfo.option("rowDblClick", function (event, ui) {
          setEsttDetail(ui.rowData);
        });
        // var html = '';
        // var esttList = data;
        // $('#Estt_List').html(html);

        // if (esttList.length > 0) {
        // 	$.each(esttList, function(key, value) {

        // 		html += '<tr onclick="setEsttDetail(this)">';
        // 		html += '<td>' + value.rgstDt + '</td>';									// 등록일자
        // 		html += '<td style="display:none">' + value.esttExmntnTrgtCcd + '</td>';	// 조사대상코드
        // 		html += '<td>' + value.esttExmntnTrgtCcdNm + '</td>';						// 조사대상
        // 		html += '<td style="display:none">' + value.esttKndCcd + '</td>';			// 재산종류코드
        // 		html += '<td>' + value.esttKndCcdNm + '</td>';								// 재산종류
        // 		html += '<td>' + value.esttExmntnCntnt + '</td>';							// 세부정보
        // 		html += '<td>' + value.realPrftF + '</td>';									// 실익여부
        // 		html += '<td>' + value.fstRgstPEnoNm + '</td>';								// 등록직원
        // 		html += '<td style="display:none;">' + value.sn + '</td>';					// 일련번호
        // 		html += '</tr>';

        // 	})
        // } else {
        // 	html += '<tr>';
        // 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
        // 	html += '</tr>';
        // }
        // $('#Estt_List').html(html);
      },
    });
  }

  // 더블 클릭 후 관리이력 정보 취득
  function setEsttDetail(e) {
    var esttExmntnTrgtCcd = e.esttExmntnTrgtCcd; //조사대상코드
    var esttKndCcd = e.esttKndCcd; //재산종류코드
    var realPrftF = e.realPrftF; //실익여부
    var esttExmntnCntnt = e.esttExmntnCntnt; //세부정보
    var sn = e.sn; //일련번호

    $("#TB08010S_P010").val(esttExmntnTrgtCcd).prop("selected", true); //조사대상코드
    $("#TB08010S_E029").val(esttKndCcd).prop("selected", true); //재산종류코드
    $("#Real_Prft_F").val(realPrftF).prop("selected", true); //실익여부
    $("#Estt_Exm_Cntnt").val(esttExmntnCntnt); //세부정보
    $("#hidden_tab2_sn").val(sn); //일련번호
  }

  // tab2 재산조사 저장
  function tab2EsttSave() {
    var dealNo = $("#hidden_dealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab2_sn").val();

    var esttExmntnTrgtCcd = $("#TB08010S_P010").val();
    var esttKndCcd = $("#TB08010S_E029").val();
    var realPrftF = $("#Real_Prft_F").val();
    var esttExmntnCntnt = $("#Estt_Exm_Cntnt").val();

    // 유효성 체크
    if (!isEmpty(dealNo)) {
      if (!isEmpty(esttExmntnCntnt)) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "관리내용을 확인해주세요.",
          confirmButtonText: "확인",
        });
      }
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
        esttExmntnTrgtCcd: esttExmntnTrgtCcd,
        esttKndCcd: esttKndCcd,
        realPrftF: realPrftF,
        esttExmntnCntnt: esttExmntnCntnt,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/registEsttInfo",
        data: dtoParam,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "재산조사를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getEsttDetail();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "재산조사를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // tab2 재산조사 초기화
  function tab2EsttReset() {
    $("#TB08010S_P010 option:eq(0)").prop("selected", true); // 조사대상
    $("#TB08010S_E029 option:eq(0)").prop("selected", true); // 재산종류
    $("#Real_Prft_F option:eq(0)").prop("selected", true); // 실익여부
    $("#Estt_Exm_Cntnt").val(""); // 관리내용
    $("#hidden_tab2_sn").val("0"); // 일련번호 초기화
  }

  // tab2 재산조사 삭제
  function tab2EsttDelete() {
    var dealNo = $("#TB08010S_ibDealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab2_sn").val();

    if (!isEmpty(dealNo)) {
      if (sn != 0) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "재산조사를 선택해주세요.",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal 정보를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/deleteEsttInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          swal
            .fire({
              icon: "success",
              title: "success!",
              text: "재산조사내역을 삭제하였습니다.",
              confirmButtonText: "확인",
            })
            .then((result) => {
              getEsttDetail();
              tab2EsttReset();
            });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "재산조사내역을 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  //----------------------------TAB3 법적조치----------------------------

  // TAB3 코드 세팅
  function loadTab3() {
    loadLglCcd();
    loadLglPrcsKndCcd();
  }

  // TAB2 재산조사구분코드 == TAB3 법적절차구분코드
  function loadLglCcd() {
    $.ajax({
      type: "GET",
      url: "/getSelectBoxCode/P003",
      dataType: "json",
      success: function (data) {
        var html = "";
        $("#Lgl_Ccd").html(html);

        var codeList = data;
        if (codeList.length > 0) {
          $.each(codeList, function (key, value) {
            html +=
              '<option value="' +
              value.CD_VL_ID +
              '">' +
              value.CD_VL_NM +
              "</option>";
          });
        }
        $("#Lgl_Ccd").html(html);
      },
    });
  }

  // TAB3 법적절차종류구분코드
  function loadLglPrcsKndCcd() {
    $.ajax({
      type: "GET",
      url: "/getSelectBoxCode/L002",
      dataType: "json",
      success: function (data) {
        var html = "";
        $("#LgL_Knd_Ccd").html(html);

        var codeList = data;
        if (codeList.length > 0) {
          $.each(codeList, function (key, value) {
            html +=
              '<option value="' +
              value.CD_VL_ID +
              '">' +
              value.CD_VL_NM +
              "</option>";
          });
        }
        $("#LgL_Knd_Ccd").html(html);
      },
    });
  }

  // TAB3 법적절차 조회
  function getLglDetail() {
    var dealNo = $("#hidden_dealNo").val(); // IBDEAL번호
    var jdgmDcd = $("#hidden_jdgmDcd").val(); // 리스크구분심사코드
    var mtrDcd = $("#hidden_mtrDcd").val(); // 부수안건구분코드

    var paramData = {
      dealNo: dealNo,
      jdgmDcd: jdgmDcd,
      mtrDcd: mtrDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB08010S/getLglDetail",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridLglDetailInfo.setData(data);
        arrPqGridLglDetailInfo.option("rowDblClick", function (event, ui) {
          setLglDetail(ui.rowData);
        });
        // var html = '';
        // var lglList = data;
        // $('#Lgl_List').html(html);

        // if (lglList.length > 0){
        // 	$.each(lglList, function(key, value){
        // 		html += '<tr onclick="setLglDetail(this)">';
        // 		html += '<td>' + value.rgstDt + '</td>';								// 등록일자
        // 		html += '<td style="display:none">' + value.lglPrcrCcd + '</td>';		// 법적대상
        // 		html += '<td>' + value.lglPrcrCcdNm + '</td>';							// 법적대상명
        // 		html += '<td style="display:none">' + value.lglPrcrKndCcd + '</td>';	// 법적종류
        // 		html += '<td>' + value.lglPrcrKndCcdNm + '</td>';						// 법적종류명
        // 		html += '<td>' + value.lglPrcrCntnt + '</td>';							// 세부정보
        // 		html += '<td>' + value.crtrmInfo + '</td>';								// 법원정보
        // 		html += '<td>' + value.acdntNo + '</td>';								// 사건번호
        // 		html += '<td>' + value.fstRgstPEnoNm + '</td>';							// 사건번호
        // 		html += '<td style="display:none;">' + value.sn + '</td>';				// 일련번호
        // 		html += '</tr>';

        // 	})
        // }else {
        // 	html += '<tr>';
        // 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
        // 	html += '</tr>';
        // }
        // $('#Lgl_List').html(html);
      },
    });
  }

  // 더블 클릭 후 법적절차 정보 취득
  function setLglDetail(e) {
    var lglPrcrCcd = e.lglPrcrCcd; //법적대상
    var lglPrcrKndCcd = e.lglPrcrKndCcd; //법적종류
    var lglPrcrCntnt = e.lglPrcrCntnt; //법적내용
    var crtrmInfo = e.crtrmInfo; //법원정보
    var acdntNo = e.acdntNo; //사건번호
    var sn = e.sn; //일련번호

    $("#TB08010S_E029_2").val(lglPrcrCcd).prop("selected", true); //법적대상
    $("#TB08010S_L002").val(lglPrcrKndCcd).prop("selected", true); //법적종류
    $("#Crtrm_Info").val(crtrmInfo); //법원정보
    $("#Acdnt_No").val(acdntNo); //사건번호
    $("#Lgl_Cnt").val(lglPrcrCntnt); //법적내용
    $("#hidden_tab3_sn").val(sn); //일련번호
  }

  // TAB3 법적절차 초기화
  function tab3LglReset() {
    $("#TB08010S_E029_2 option:eq(0)").prop("selected", true); // 법적대상
    $("#TB08010S_L002 option:eq(0)").prop("selected", true); // 법적종류
    $("#Crtrm_Info").val(""); // 법원정보
    $("#Acdnt_No").val(""); // 사건번호
    $("#Lgl_Cnt").val(""); // 법적내용
    $("#hidden_tab3_sn").val("0"); // 일련번호 초기화
  }

  // TAB3 법적절차 저장
  function tab3LglSave() {
    var dealNo = $("#hidden_dealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab3_sn").val();

    var lglPrcrCcd = $("#TB08010S_E029_2").val(); //법적대상
    var lglPrcrKndCcd = $("#TB08010S_L002").val(); //법적종류
    var lglPrcrCntnt = $("#Lgl_Cnt").val(); //법적내용
    var crtrmInfo = $("#Crtrm_Info").val(); //법원정보
    var acdntNo = $("#Acdnt_No").val(); //사건번호

    // 유효성 체크
    if (!isEmpty(dealNo)) {
      if (!isEmpty(lglPrcrCntnt)) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "법적내용을 확인해주세요.",
          confirmButtonText: "확인",
        });
      }
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,

        lglPrcrCcd: lglPrcrCcd,
        lglPrcrKndCcd: lglPrcrKndCcd,
        lglPrcrCntnt: lglPrcrCntnt,
        crtrmInfo: crtrmInfo,
        acdntNo: acdntNo,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/registLglInfo",
        data: dtoParam,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "법적절차를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getLglDetail();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "법적절차를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // TAB3 법적절차 삭제
  function tab3LglDelete() {
    var dealNo = $("#TB08010S_ibDealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab3_sn").val();

    if (!isEmpty(dealNo)) {
      if (sn != 0) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "법적절차를 선택해주세요.",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal 정보를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/deleteLglInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          swal
            .fire({
              icon: "success",
              title: "success!",
              text: "법적절차내역을 삭제하였습니다.",
              confirmButtonText: "확인",
            })
            .then((result) => {
              getLglDetail();
              tab3LglReset();
            });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "법적절차내역을 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  //----------------------------TAB4 시효관리----------------------------

  // TAB4 코드 세팅

  // TAB4 시효관리 조회
  function getEfctDetail() {
    var dealNo = $("#hidden_dealNo").val(); // IBDEAL번호
    var jdgmDcd = $("#hidden_jdgmDcd").val(); // 리스크구분심사코드
    var mtrDcd = $("#hidden_mtrDcd").val(); // 부수안건구분코드

    var paramData = {
      dealNo: dealNo,
      jdgmDcd: jdgmDcd,
      mtrDcd: mtrDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB08010S/getEfctDetail",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridEfctDetailInfo.setData(data);
        arrPqGridEfctDetailInfo.option("rowDblClick", function (event, ui) {
          setEfctDetail(ui.rowData);
        });

        // var html = '';
        // var efctList = data;
        // $('#Efct_List').html(html);

        // if (efctList.length > 0){
        // 	$.each(efctList, function(key, value){

        // 		html += '<tr onclick="setEfctDetail(this)">';
        // 		html += '<td>' + value.rgstDt + '</td>';								// 등록일자
        // 		html += '<td>' + value.efctOcrncDt + '</td>';							// 시효기산일
        // 		html += '<td>' + value.efctEndDt + '</td>';								// 시효만료일
        // 		html += '<td>' + value.efctMngCntnt + '</td>';							// 세부정보
        // 		html += '<td>' + value.fstRgstPEnoNm + '</td>';							// 등록직원
        // 		html += '<td style="display:none;">' + value.sn + '</td>';				// 일련번호
        // 		html += '</tr>';

        // 	})
        // }else {
        // 	html += '<tr>';
        // 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
        // 	html += '</tr>';
        // }
        // $('#Efct_List').html(html);
      },
    });
  }

  // 더블 클릭 후 법적절차 정보 취득
  function setEfctDetail(e) {
    var efctOcrncDt = e.efctOcrncDt; //시효기산일
    var efctEndDt = e.efctEndDt; //시효만료일
    var efctMngCntnt = e.efctMngCntnt; //세부정보
    var sn = e.sn; //일련번호

    $("#Efct_Dp_Strt").val(efctOcrncDt); //시효기산일
    $("#Efct_Dp_End").val(efctEndDt); //시효만료일
    $("#Efct_Cnt").val(efctMngCntnt); //세부정보
    $("#hidden_tab4_sn").val(sn); //일련번호
  }

  // TAB4 시효관리 초기화
  function tab4EfctReset() {
    $("#Efct_Dp_Strt").val(""); // 시효기산일
    $("#Efct_Dp_End").val(""); // 시효만료일
    $("#Efct_Cnt").val(""); // 세부정보
    $("#hidden_tab4_sn").val("0"); // 일련번호 초기화
  }

  // TAB4 시효관리 저장
  function tab4EfctSave() {
    var dealNo = $("#hidden_dealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab4_sn").val();

    var efctOcrncDt = $("#Efct_Dp_Strt").val(); //시효기산일
    var efctEndDt = $("#Efct_Dp_End").val(); //시효만료일
    var efctMngCntnt = $("#Efct_Cnt").val(); //세부정보

    // 유효성 체크
    if (!isEmpty(dealNo)) {
      if (!isEmpty(efctMngCntnt)) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "시효관리내용을 확인해주세요.",
          confirmButtonText: "확인",
        });
      }
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,

        efctOcrncDt: efctOcrncDt.replaceAll("-", ""),
        efctEndDt: efctEndDt.replaceAll("-", ""),
        efctMngCntnt: efctMngCntnt,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/registEfctInfo",
        data: dtoParam,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "시효관리내역을 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getEfctDetail();
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "시효관리내역을 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // TAB4 시효관리 삭제
  function tab4EfctDelete() {
    var dealNo = $("#TB08010S_ibDealNo").val();
    var jdgmDcd = $("#hidden_jdgmDcd").val();
    var mtrDcd = $("#hidden_mtrDcd").val();
    var sn = $("#hidden_tab4_sn").val();

    if (!isEmpty(dealNo)) {
      if (sn != 0) {
        businessFunction();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "시효관리내역을 선택해주세요.",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal 정보를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB08010S/deleteEfctInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          swal
            .fire({
              icon: "success",
              title: "success!",
              text: "시효관리내역을 삭제하였습니다.",
              confirmButtonText: "확인",
            })
            .then((result) => {
              getEfctDetail();
              tab4EfctReset();
            });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "시효관리내역을 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  //----------------------------TAB5 안건연결----------------------------

  // TAB5 안건연결 조회
  // function getCnctList(){

  // 	var dealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
  // 	var jdgmDcd = $('#hidden_jdgmDcd').val(); 	// 리스크구분심사코드
  // 	var mtrDcd  = $('#hidden_mtrDcd').val(); 		// 부수안건구분코드

  // 	var paramData = {
  // 		"dealNo": dealNo
  // 		,"jdgmDcd": jdgmDcd
  // 		,"mtrDcd": mtrDcd
  // 	};

  // 	$.ajax({
  // 		type: "GET",
  // 		url: "/TB08010S/getCnctList",
  // 		data: paramData,
  // 		dataType: "json",
  // 		success: function(data) {
  // 			arrPqGridCnctDetailInfo.setData(data);
  // 			arrPqGridCnctDetailInfo.option("rowDblClick", function(event, ui) {
  // 				setCnctDetail(ui.rowData);
  // 			});

  // 			// var html = '';
  // 			// var cnctList = data;
  // 			// $('#Cnct_List').html(html);

  // 			// if (cnctList.length > 0){
  // 			// 	$.each(cnctList, function(key, value){
  // 			// 		html += '<tr onclick="setCnctDetail(this)">';
  // 			// 		html += '<td>' + value.rgstDt + '</td>';								  // 등록일
  // 			// 		html += '<td>' + value.cnctIbDealNo + '</td>';							  // 연계IBDEAL번호
  // 			// 		html += '<td>' + value.cnctIbDealNm + '</td>';							  // 안건명
  // 			// 		html += '<td>' + value.etcCntnt + '</td>';							      // 내용
  // 			// 		html += '<td>' + value.fstRgstPNm + '</td>';							  // 최초등록자명
  // 			// 		html += '<td style="display:none;">' + value.cnctRiskInspctCcd + '</td>'; // 연계리스크심사구분코드
  // 			// 		html += '<td style="display:none;">' + value.cnctLstCCaseCcd + '</td>';	  // 연계부수안건구분코드
  // 			// 		html += '<td style="display:none;">' + value.sn + '</td>';				  // 일련번호
  // 			// 		html += '<td style="display:none;">' + value.fstRgstPEno + '</td>';		  // 최초등록자사번
  // 			// 		html += '</tr>';

  // 			// 	})
  // 			// }else {
  // 			// 	html += '<tr>';
  // 			// 	html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
  // 			// 	html += '</tr>';

  // 			// 	$('#TB08010S_cnct_dealNo').val('');				//연계IBDEAL번호
  // 			// 	$('#TB08010S_cnct_etcCntnt').val('');					//기타내용
  // 			// }

  // 			// $('#Cnct_List').html(html);
  // 		},
  // 	});
  // }

  // 안건연결 정보 취득
  // function setCnctDetail(e){
  // 	var cnctIbDealNo 	  = e.cnctIbDealNo;				// 연계IBDEAL번호
  // 	var cnctRiskInspctCcd = e.cnctRiskInspctCcd;		// 연계리스크심사구분코드
  // 	var cnctLstCCaseCcd   = e.cnctLstCCaseCcd;			// 연계부수안건구분코드
  // 	var etcCntnt 		  = e.etcCntnt;					// 기타내용
  // 	var sn       		  = e.sn;						// 일련번호

  // 	$(tr).addClass('table-active');

  // 	// 연결안건 정보
  // 	$('#TB08010S_cnct_dealNo').val(cnctIbDealNo);				// 연계IBDEAL번호
  // 	$('#TB08010S_cnct_jdgmDcd').val(cnctRiskInspctCcd);	// 연계리스크심사구분코드
  // 	$('#TB08010S_cnct_mtrDcd').val(cnctLstCCaseCcd);		// 연계부수안건구분코드
  // 	$('#hidden_tab5_sn').val(sn);								// 일련번호
  // 	$('#TB08010S_cnct_etcCntnt').val(etcCntnt);					// 기타내용
  // }

  // // TAB5 안건연결 초기화
  // function tab5CnctReset() {
  // 	$("#TB08010S_cnct_dealNo").val('');						// 연계IBDEAL번호
  // 	$('#TB08010S_cnct_etcCntnt').val('');						// 기타내용
  // 	$('#hidden_tab5_sn').val('0');								// 일련번호

  // }

  // // TAB5 안건연결 저장
  // function tab5CnctSave() {
  // 	var dealNo      = $('#hidden_dealNo').val();
  // 	var jdgmDcd = $('#hidden_jdgmDcd').val();
  // 	var mtrDcd   = $('#hidden_mtrDcd').val();

  // 	// 연결안건 정보
  // 	var cnctIbDealNo      = $('#TB08010S_cnct_ibDealNo').val();						// 연계IBDEAL번호
  // 	var cnctRiskInspctCcd = $('#TB08010S_cnct_riskInspctCcd').val();				// 연계리스크심사구분코드
  // 	var cnctLstCCaseCcd   = $('#TB08010S_cnct_lstCCaseCcd').val();					// 연계부수안건구분코드
  // 	var sn                = $('#hidden_tab5_sn').val();								// 일련번호
  // 	var cnctEtcCntnt      = $('#TB08010S_cnct_etcCntnt').val();						// 기타내용

  // 	// 유효성 체크
  // 	if (!isEmpty(dealNo)) {
  // 		if(!isEmpty(cnctIbDealNo)) {
  // 			businessFunction();
  // 		}else{
  // 			Swal.fire({
  // 				icon: 'error'
  // 				, title: "Error!"
  // 				, text: "안건연결 내용을 확인해주세요."
  // 				, confirmButtonText: "확인"
  // 			});
  // 		}
  // 	}else{
  // 		Swal.fire({
  // 			icon: 'error'
  // 			, title: "Error!"
  // 			, text: "Deal 정보를 조회해주세요."
  // 			, confirmButtonText: "확인"
  // 		});
  // 	}

  // 	function businessFunction() {

  // 		if(dealNo == cnctIbDealNo) {
  // 			Swal.fire({
  // 				icon: 'error'
  // 				, title: "Error!"
  // 				, text: "선택된 안건과 같은 Deal번호를 가진 안건은 등록할 수 없습니다."
  // 				, confirmButtonText: "확인"
  // 			});
  // 			return false;
  // 		}

  // 		 dtoParam = {
  // 			  "ibDealNo"     	  : dealNo
  // 			, "lstCCaseCcd"	  : jdgmDcd
  // 			, "riskInspctCcd"       : mtrDcd

  // 			, "cnctIbDealNo"      : cnctIbDealNo
  // 			, "cnctRiskInspctCcd" : cnctRiskInspctCcd
  // 			, "cnctLstCCaseCcd"   : cnctLstCCaseCcd
  // 			, "etcCntnt"          : cnctEtcCntnt
  // 			, "sn"                : sn
  // 		};

  // 		$.ajax({
  // 			type: "POST",
  // 			url: "/TB08010S/registCnctInfo",
  // 			data: dtoParam,
  // 			dataType: "json",
  // 			success: function(data){
  // 				if( data == 501 ){
  // 					Swal.fire({
  // 						icon: 'error'
  // 						, title: "Error!"
  // 						, text: "연결하고자 하는 안건의 심사진행상태가 약정완료가 아닙니다."
  // 						, confirmButtonText: "확인"
  // 					})
  // 				}else
  // 				if( data == 0 ) {
  // 					Swal.fire({
  // 						icon: 'error'
  // 						, title: "Error!"
  // 						, text: "안건연결 정보를 저장하는데 실패하였습니다."
  // 						, confirmButtonText: "확인"
  // 					})
  // 				}else{
  // 					Swal.fire({
  // 						icon: 'success'
  // 						, title: "Success!"
  // 						, text: "안건연결 내역을 저장하였습니다."
  // 						, confirmButtonText: "확인"
  // 					}).then((result) => {
  // 						getEamList();
  // 						getCnctList();
  // 					});
  // 				}
  // 			}
  // 			,
  // 			error: function() {
  // 				Swal.fire({
  // 					icon: 'error'
  // 					, title: "Error!"
  // 					, text: "안건연결 정보를 저장하는데 실패하였습니다."
  // 					, confirmButtonText: "확인"
  // 				});
  // 			}
  // 		});
  // 	}
  // }

  // // TAB5 안건연결 정보 삭제
  // function tab5CnctDelete() {

  // 	var dealNo = $('#hidden_dealNo').val();
  // 	var sn       = $('#hidden_tab5_sn').val();

  // 	if (!isEmpty(dealNo)) {
  // 		if(sn != 0){
  // 			businessFunction();
  // 		}else{
  // 			Swal.fire({
  // 				icon: 'error'
  // 				, title: "Error!"
  // 				, text: "연결된 안건을 선택해주세요."
  // 				, confirmButtonText: "확인"
  // 			});
  // 		}
  // 	} else {
  // 		Swal.fire({
  // 			icon: 'error'
  // 			, title: "Error!"
  // 			, text: "Deal 정보를 조회해주세요."
  // 			, confirmButtonText: "확인"
  // 		});
  // 	}

  // 	function businessFunction(){

  // 		$.ajax({
  // 			type: "POST",
  // 			url: "/TB08010S/deleteCnctInfo",
  // 			data: { "sn" : sn },
  // 			dataType: "text",
  // 			success: function() {
  // 				swal.fire({
  // 					icon: 'success'
  // 					, title: "success!"
  // 					, text: "안건 연결 정보를 삭제하였습니다."
  // 					, confirmButtonText: "확인"
  // 				}).then((result) => {
  // 					getEamList();
  // 					getCnctList();
  // 				});
  // 			},
  // 			error: function() {
  // 				Swal.fire({
  // 					icon: 'error'
  // 					, title: "Error!"
  // 					, text: "안건 연결 정보를 삭제하는데 실패하였습니다."
  // 					, confirmButtonText: "확인"
  // 				});
  // 			}
  // 		})
  // 	}
  // }

  /* ***********************************그리드 컬럼******************************** */

  // 안건구조 탭 그리드
  let colDealListInfo = [
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건정보코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "부수안건정보",
      dataType: "string",
      dataIndx: "mtrDcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의정보코드",
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
      align: "left",
      halign: "center",
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
      title: "담당부서",
      dataType: "string",
      dataIndx: "dprtNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역사번",
      dataType: "string",
      dataIndx: "ownPEno",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "심사역",
      dataType: "stirng",
      dataIndx: "ownPNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사진행상태코드",
      dataType: "stirng",
      dataIndx: "mtrPrgSttsDcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "진행상태",
      dataType: "stirng",
      dataIndx: "mtrPrgSttsDcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "stirng",
      dataIndx: "mtrNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "연결안건여부",
      dataType: "stirng",
      dataIndx: "mtrNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  // 사후관리이력 탭 그리드
  let colEamList = [
    {
      title: "사후관리구분코드",
      dataType: "string",
      dataIndx: "evntAftrMngCcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "구분명",
      dataType: "string",
      dataIndx: "evntAftrMngCcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "관리내용",
      dataType: "string",
      dataIndx: "evntAftrMngCntnt",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "등록직원",
      dataType: "string",
      dataIndx: "fstRgstPEnoNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var dateStr = ui.cellData;
        if (dateStr && dateStr.length === 8) {
          var formattedDate =
            dateStr.substring(0, 4) +
            "-" +
            dateStr.substring(4, 6) +
            "-" +
            dateStr.substring(6, 8);
          return formattedDate;
        }
        return "";
      },
    },
  ];

  // 재산조사 탭 그리드
  let colEsttDetail = [
    {
      title: "조사대상코드",
      dataType: "string",
      dataIndx: "esttExmntnTrgtCcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "조사대상",
      dataType: "string",
      dataIndx: "esttExmntnTrgtCcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "esttKndCcd",
      dataType: "string",
      dataIndx: "esttKndCcd",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "재산종류",
      dataType: "string",
      dataIndx: "esttKndCcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "세부정보",
      dataType: "string",
      dataIndx: "esttExmntnCntnt",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실익여부",
      dataType: "string",
      dataIndx: "realPrftF",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록직원",
      dataType: "string",
      dataIndx: "fstRgstPEnoNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var dateStr = ui.cellData;
        if (dateStr && dateStr.length === 8) {
          var formattedDate =
            dateStr.substring(0, 4) +
            "-" +
            dateStr.substring(4, 6) +
            "-" +
            dateStr.substring(6, 8);
          return formattedDate;
        }
        return "";
      },
    },
    {
      title: "일련번호",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  // 법적절차 탭 그리드
  let colLglDetail = [
    {
      title: "lglPrcrCcd",
      dataType: "string",
      dataIndx: "lglPrcrCcd",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "법적대상",
      dataType: "string",
      dataIndx: "lglPrcrCcdNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "lglPrcrKndCcd",
      dataType: "string",
      dataIndx: "lglPrcrKndCcd",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "법적종류",
      dataType: "string",
      dataIndx: "lglPrcrKndCcdNm",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "세부정보",
      dataType: "string",
      dataIndx: "lglPrcrCntnt",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법원정보",
      dataType: "string",
      dataIndx: "crtrmInfo",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사건번호",
      dataType: "string",
      dataIndx: "acdntNo",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록직원",
      dataType: "string",
      dataIndx: "fstRgstPEnoNm",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var dateStr = ui.cellData;
        if (dateStr && dateStr.length === 8) {
          var formattedDate =
            dateStr.substring(0, 4) +
            "-" +
            dateStr.substring(4, 6) +
            "-" +
            dateStr.substring(6, 8);
          return formattedDate;
        }
        return "";
      },
    },
  ];

  // 시효관리 탭 그리드
  let colEfctDetail = [
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "시효기산일",
      dataType: "string",
      dataIndx: "efctOcrncDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "시효만료일",
      dataType: "string",
      dataIndx: "efctEndDt",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "세부정보",
      dataType: "string",
      dataIndx: "efctMngCntnt",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록직원",
      dataType: "string",
      dataIndx: "fstRgstPEnoNm",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "string",
      dataIndx: "sn",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  // 안건연결 탭 그리드
  // let colCnctDetail = [
  // 	{
  // 		title    : "등록일자",
  // 		dataType : "string",
  // 		dataIndx : "rgstDt",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 	},
  // 	{
  // 		title    : "연계 DEAL번호",
  // 		dataType : "string",
  // 		dataIndx : "cnctIbDealNo",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 	},
  // 	{
  // 		title    : "안건명",
  // 		dataType : "string",
  // 		dataIndx : "cnctIbDealNm",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 	},
  // 	{
  // 		title    : "내용",
  // 		dataType : "string",
  // 		dataIndx : "etcCntnt",
  // 		halign : "center",
  // 		align    : "left",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 	},
  // 	{
  // 		title    : "등록직원",
  // 		dataType : "string",
  // 		dataIndx : "fstRgstPEnoNm",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 	},
  // 	{
  // 		title    : "연계리스크심사구분코드",
  // 		dataType : "string",
  // 		dataIndx : "cnctRiskInspctCcd",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 		hidden   : true,
  // 	},
  // 	{
  // 		title    : "연계부수안건구분코드",
  // 		dataType : "string",
  // 		dataIndx : "cnctLstCCaseCcd",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 		hidden   : true,
  // 	},
  // 	{
  // 		title    : "최초등록자사번",
  // 		dataType : "string",
  // 		dataIndx : "fstRgstPEno",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 		hidden   : true,
  // 	},
  // 	{
  // 		title    : "일련번호",
  // 		dataType : "string",
  // 		dataIndx : "sn",
  // 		align    : "center",
  // 		filter   : { crules: [{ condition: 'range' }] },
  // 		hidden   : true,
  // 	},
  // ];

  // tabGrid settings
  function setEamDetailInfo() {
    setTimeout(() => arrPqGridEamDetailInfo.refresh(), 1);
  }
  function setEsttDetailInfo() {
    setTimeout(() => arrPqGridEsttDetailInfo.refresh(), 1);
  }
  function setLglDetailInfo() {
    setTimeout(() => arrPqGridLglDetailInfo.refresh(), 1);
  }
  function setEfctDetailInfo() {
    setTimeout(() => arrPqGridEfctDetailInfo.refresh(), 1);
  }
  // function setCnctDetailInfo(){
  // 	setTimeout(() => arrPqGridCnctDetailInfo.refresh(), 1);
  // }

  return {
    getEamList: getEamList,
    setEamDetailInfo: setEamDetailInfo,
    setEsttDetailInfo: setEsttDetailInfo,
    setLglDetailInfo: setLglDetailInfo,
    setEfctDetailInfo: setEfctDetailInfo,
    tab1BtnReset: tab1BtnReset,
    tab1BtnDelete: tab1BtnDelete,
    tab1BtnSave: tab1BtnSave,
    tab2EsttReset: tab2EsttReset,
    tab2EsttDelete: tab2EsttDelete,
    tab2EsttSave: tab2EsttSave,
    tab3LglReset: tab3LglReset,
    tab3LglDelete: tab3LglDelete,
    tab3LglSave: tab3LglSave,
    tab4EfctReset: tab4EfctReset,
    tab4EfctDelete: tab4EfctDelete,
    tab4EfctSave: tab4EfctSave,
    resetBtnClick: resetBtnClick,
  };
})();
