const TB04010Sjs = (function () {
  var ldvdCd = [];
  var mdvdCd = [];
  var sdvdCd = [];
  var sameYn = [];
  var dblclickYn = "0";

  // 안건구조-> 딜정보 그리드
  let arrPqGridDealListInfo;
  // 관련문서 그리드
  let arrPqGridDocInfo;
  // (보증)기초자산 그리드
  let arrPqGridAssetInfo;
  // 거래상대방 그리드
  let arrPqGridCncCmpnyInfo;
  // 내부등급 그리드
  let arrPqGridInsGrdInfo;
  // 담보 그리드
  let arrPqGridMrtgInfo;
  // 보증 그리드
  let arrPqGridEnsrInfo;
  // 책임준공 그리드
  let arrPqGridCmplInfo;

  // 필터링 이벤트
  function filterSelectBox(obj, childObj) {
    let slctValue = $("#" + obj.id + " option:selected").val();
    if (isEmpty(slctValue)) {
      $("#" + childObj).prop("disabled", true);
    } else {
      $("#" + childObj).prop("disabled", false);
    }

    for (let i = 0; i < $("#" + childObj + " option").length; i++) {
      if (
        $("#" + childObj + " option")
          .eq(i)
          .val()
          .substring(0, 2) === slctValue
      ) {
        $("#" + childObj + " option")
          .eq(i)
          .css("display", "block");
      } else {
        $("#" + childObj + " option")
          .eq(i)
          .css("display", "none");
      }
    }
    $("#" + childObj + " option")
      .eq(0)
      .prop("selected", true);
  }

  $(document).ready(function () {
    setDatePicker();

    loadSelectBoxContents();

    setKeyFunction_TB04010S();

    loadTabContents();

    rendorGrid();

    // url 정보 세팅은 마지막에 하도록 한다.
    getUrlDealInfo();
    //$(".save").prop("disabled", true);

    $("#TB04010S_ibDealNo").focus();
    $("#assesmenttlClsf").hide(); // 승인확정 버튼 hide

    btnReset();
  });

  // 그리드 렌더링함수
  function rendorGrid() {
    /** 그리드 **/
    let arrPqGridObj = [
      // 딜정보
      {
        height: 150,
        maxHeight: 150,
        id: "gridDealListInfo",
        colModel: colDealListInfo,
      },
      // 관련문서
      {
        height: 150,
        maxHeight: 150,
        id: "gridDocInfo",
        colModel: colDocInfo,
      },
      // (보증)기초자산
      {
        height: 150,
        maxHeight: 150,
        id: "gridAssetInfo",
        colModel: colAssetInfo,
      },
      // 거래상대방
      {
        height: 150,
        maxHeight: 150,
        id: "gridCncCmpnyInfo",
        colModel: colCncCmpnyInfo,
      },
      // 내부등급
      {
        height: 150,
        maxHeight: 150,
        id: "gridInsGrdInfo",
        colModel: colInsGrdInfo,
      },
      // 담보
      {
        height: 150,
        maxHeight: 150,
        id: "gridMrtgInfo",
        colModel: colMrtgInfo,
      },
      // 보증
      {
        height: 150,
        maxHeight: 150,
        id: "gridEnsrInfo",
        colModel: colEnsrInfo,
      },
      // 책임준공
      {
        height: 150,
        maxHeight: 150,
        id: "gridCmplInfo",
        colModel: colCmplInfo,
      },
    ];
    setPqGrid(arrPqGridObj);

    arrPqGridDealListInfo = $("#gridDealListInfo").pqGrid("instance"); // 딜정보 그리드 instance
    arrPqGridDocInfo = $("#gridDocInfo").pqGrid("instance"); // 관련문서 그리드 instance
    arrPqGridAssetInfo = $("#gridAssetInfo").pqGrid("instance"); // (보증) 기초자산 그리드 instance
    arrPqGridCncCmpnyInfo = $("#gridCncCmpnyInfo").pqGrid("instance"); // 거래상대방 그리드 instance
    arrPqGridInsGrdInfo = $("#gridInsGrdInfo").pqGrid("instance"); // 내부등급 그리드 instance
    arrPqGridMrtgInfo = $("#gridMrtgInfo").pqGrid("instance"); // 담보 그리드 instance
    arrPqGridEnsrInfo = $("#gridEnsrInfo").pqGrid("instance"); // 보증 그리드 instance
    arrPqGridCmplInfo = $("#gridCmplInfo").pqGrid("instance"); // 책임준공 그리드 instance
  }

  // /**
  //  * 딜안에 중복된 부수안건, 신규재부의 정보가 있는지 확인
  //  * @param {selectMtrDcd} : 선택된 부수안건코드
  //  * @param {selectJdgmDcd} : 선택된 리스크심사구분코드
  //  */
  const chkDupMtrDcd = (selectMtrDcd, selectJdgmDcd) => {
    let insrtDealNo = $("#TB04010S_selectedDealNo").val(); // 현재 조회한 dealNo
    let insrtMtrDcd = $("#TB04010S_L007 option:selected").val(); // 현재 선택된 부수안건코드
    let insrtJdgmDcd = $("#TB04010S_R014 option:selected").val(); // 현재 선택된 신규/재부의코드
    for (let i = 0; i < arrPqGridDealListInfo.pdata.length; i++) {
      let dealNo = arrPqGridDealListInfo.pdata[i].dealNo; // 조회된 dealNo
      let mtrDcd = arrPqGridDealListInfo.pdata[i].mtrDcd; // 조회된 deal 안에 있는 부수안건코드
      let jdgmDcd = arrPqGridDealListInfo.pdata[i].jdgmDcd; // 조회된 deal 안에 있는 신규/재부의코드
      if (
        insrtDealNo === dealNo &&
        insrtMtrDcd === mtrDcd &&
        insrtJdgmDcd === jdgmDcd &&
        dblclickYn === "0"
      ) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "해당 딜에 선택된 부수안건 및 신규/재부의 정보가 존재합니다.",
          confirmButtonText: "확인",
        });
        $("#TB04010S_L007").focus();
        return false;
      }
    }
    return true;
  };

  /**
   * 20240715 대표님지시
   * 전결구분에 따라 상단 버튼 컨트롤
   * 전결구분 = 심사대상 ? [삭제],[심사요청],[심사요청취소],[심사승인],[심사반송]
   * 전결구분 = 자체전결 ? [삭제],[승인확정]
   * @param {e} 전결구분 element
   */
  const fltrBtn = (e) => {
    let id = e.id; // element id
    let slctValue = $("#" + id + " option:selected").val(); // 선택된 값

    switch (slctValue) {
      case "1":
        $("#btnLine").prop("class", "col-sm-5 text-right px-3");
        $("#assesmentRequest").show(); // 심사요청 버튼 show
        $("#assesmentRequestCancel").show(); // 심사요청취소	버튼 show
        $("#assesmentApprove").show(); // 심사승인 버튼 show
        $("#assesmentReturn").show(); // 심사반송 버튼 show
        $("#assesmenttlClsf").hide(); // 승인확정 버튼 hide
        break;
      case "2":
        $("#btnLine").prop("class", "col-sm-5 text-right");
        $("#assesmentRequest").hide(); // 심사요청 버튼 hide
        $("#assesmentRequestCancel").hide(); // 심사요청취소	버튼 hide
        $("#assesmentApprove").hide(); // 심사승인 버튼 hide
        $("#assesmentReturn").hide(); // 심사반송 버튼 hide
        $("#assesmenttlClsf").show(); // 승인확정 버튼 show
        break;
      default:
        break;
    }
  };
  /**
   * 전결구분 임시 display none 대표님 지시 20240715
   */
  function fnFltrTtlClsf() {
    for (let i = 0; i < $("#TB04010S_R004 option").length; i++) {
      let cboValue = $("#TB04010S_R004 option").eq(i).val();
      if (
        cboValue == "3" ||
        cboValue == "4" ||
        cboValue == "5" ||
        cboValue == "6"
      ) {
        $("#TB04010S_R004 option").eq(i).css("display", "none");
      } else {
        $("#TB04010S_R004 option").eq(i).css("display", "block");
      }
    }
    $("#TB04010S_R004 option").eq(0).prop("selected", true);
  }

  function getUrlDealInfo() {
    let dealNo = sessionStorage.getItem("dealNo");
    let dealNm = sessionStorage.getItem("dealNm");
    //var mtrDcd			= sessionStorage.getItem("mtrDcd");
    //var jdgmDcd			= sessionStorage.getItem("jdgmDcd");
    //var mtrPrgSttsDcd	= sessionStorage.getItem("mtrPrgSttsDcd");

    if (isNotEmpty(dealNo)) {
      $("#TB04010S_ibDealNo").val(dealNo);
      $("#TB04010S_ibDealNm").val(dealNm);

      getDealList();
    }

    sessionStorage.clear();
    // 심사대상, 자체전결 제외하고 임시 display none 2024.07.15 대표님 지시
    setTimeout(() => {
      fnFltrTtlClsf();
    }, 1000);
  }

  /* // 세션체크 ajax 동기화문제로 미사용
	function checkSession() {
		var dealNo			= sessionStorage.getItem("dealNo");
		var dealNm			= sessionStorage.getItem("dealNm");
		var mtrDcd			= sessionStorage.getItem("mtrDcd");
		var jdgmDcd			= sessionStorage.getItem("jdgmDcd");
		var mtrPrgSttsDcd	= sessionStorage.getItem("mtrPrgSttsDcd");
		
		if(isNotEmpty(dealNo)) {
	
			$('#TB04010S_ibDealList tr').each(function() {
				var thisMtrDcd = $(this).find('td:eq(1)').html();
				var thisJdgmDcd = $(this).find('td:eq(3)').html();
				var thisMtrPrgSttsDcd = $(this).find('td:eq(7)').html();
	
				if (mtrDcd == thisMtrDcd && jdgmDcd == thisJdgmDcd && mtrPrgSttsDcd == thisMtrPrgSttsDcd) {
					$(this).dblclick();
				}
			});
	
			sessionStorage.clear();
		}
	}
	*/

  function setDatePicker() {
    // #TB04010S_tab1_datepicker1 btn apply function
    $("#TB04010S_tab1_datepicker1").on("change", function () {
      var month = $("#TB04010S_invPrdMnum").val();
      if (month != "") {
        calcDate();
      }
    });
  }

  /**
   * @param obj : this
   * 투자기간(개월) 입력시 만기일(예정) 구하기
   */
  function setMtrtDt(obj) {
    if (
      obj.value.length >= 2 &&
      !isEmpty($("#TB04010S_tab1_datepicker1").val())
    ) {
      calcDate();
    }
  }

  document
    .getElementById("TB04010S_invPrdMnum")
    .addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      setMtrtDt(this);
    });

  // 만기일 계산
  function calcDate() {
    var inputinvstPrdMmC = $("#TB04010S_invPrdMnum").val();
    var inputDate = $("#TB04010S_tab1_datepicker1").val();

    var year = inputDate.substring(0, 4);
    var month = inputDate.substring(5, 7);
    var day = inputDate.substring(8, 10);

    var date = new Date(year, month - 1, day);

    // 2월달 날짜까지 계산됨
    var dt = inputDate;
    var cycle = inputinvstPrdMmC;
    var nxt = "";
    if (dt != "" && cycle != "0") {
      if (cycle == "99") {
        nxt = "-";
      } else {
        var arr1 = dt.split("-");
        var date = new Date(arr1[0], arr1[1] - 1, arr1[2]);

        var addMonthFirstDate = new Date(
          date.getFullYear(),
          date.getMonth() + parseInt(cycle),
          1
        );
        var addMonthLastDate = new Date(
          addMonthFirstDate.getFullYear(),
          addMonthFirstDate.getMonth() + 1,
          0
        );

        var result = addMonthFirstDate;

        if (date.getDate() > addMonthLastDate.getDate()) {
          result.setDate(addMonthLastDate.getDate());
        } else {
          result.setDate(date.getDate());
        }

        nxt =
          result.getFullYear() +
          "-" +
          fillZero(2, (result.getMonth() + 1).toString()) +
          "-" +
          fillZero(2, result.getDate().toString());
      }
    }

    //남는 길이만큼 0으로 채움
    function fillZero(width, str) {
      return str.length >= width
        ? str
        : new Array(width - str.length + 1).join("0") + str;
    }

    $("#TB04010S_mtrtDt").val(nxt);
  }

  function loadSelectBoxContents() {
    var item = "";
    item += "L007"; // 부수안건구분코드
    item += "/" + "R014"; // 리스크심사구분코드
    item += "/" + "R001"; // RADEAL구분코드
    item += "/" + "R004"; // 전결구분(RA결의구분코드)
    item += "/" + "I010"; // 심사부서구분코드
    item += "/" + "I029"; // 기업여신상품대분류코드
    item += "/" + "I030"; // 기업여신상품중분류코드
    item += "/" + "I031"; // 기업여신상품분류코드
    item += "/" + "I028"; // IB상품분류코드
    item += "/" + "I027"; // 투자통화코드
    item += "/" + "C006"; // 국가코드
    item += "/" + "I006"; // 업종분류코드
    item += "/" + "C001"; // 점검항목코드
    item += "/" + "B011"; // 사업지역코드
    item += "/" + "I035"; // 투자물건구분코드
    item += "/" + "I036"; // 투자물건상세구분코드
    item += "/" + "R026"; // 책임준공구분코드
    item += "/" + "B010"; // 기초자산종류코드
    item += "/" + "P010"; // 재산조사대상구분코드
    item += "/" + "O006"; // 외부신용등급구분코드
    item += "/" + "I012"; // 내부신용등급구분코드
    item += "/" + "M007"; // 담보종류구분코드
    item += "/" + "M005"; // 담보상세구분코드
    item += "/" + "M003"; // 담보취득방식구분코드
    item += "/" + "M002"; // 담보취득상세구분코드
    item += "/" + "R013"; // 권리순위구분코드
    item += "/" + "C011"; // 신용보강보증구분코드
    item += "/" + "R027"; // 책임준공기관구분
    item += "/" + "D001"; // 채무불이행의무구분코드
    item += "/" + "C008"; // 협업유형코드
    item += "/" + "R005"; // RA운용사평가등급코드

    getSelectBoxList("TB04010S", item);

    var item = "";
    item += "R005"; // RA운용사평가등급코드

    getSelectBoxList("TB04013P", item);
  }

  function setKeyFunction_TB04010S() {
    $("input[id=TB04010S_ibDealNo]").keyup(function (key) {
      if (key.keyCode == 13) {
        //키가 13이면 실행 (엔터는 13)

        callTB03021P("TB04010S");
      }

      if ($("#TB04010S_ibDealNo").val().length === 0) {
        $("#TB04010S_ibDealNm").val("");
        tab1reset();
        tab2BtnReset();
        tab3BtnReset();
        tab4BtnReset();
        tab5BtnReset();
        tab6BtnReset();
        tab7BtnReset();
        tab8BtnReset();
        $("#gridDealListInfo").pqGrid("option", "dataModel.data", []);
        $("#gridDealListInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridDocInfo").pqGrid("option", "dataModel.data", []);
        $("#gridDocInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridAssetInfo").pqGrid("option", "dataModel.data", []);
        $("#gridAssetInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridCncCmpnyInfo").pqGrid("option", "dataModel.data", []);
        $("#gridCncCmpnyInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridInsGrdInfo").pqGrid("option", "dataModel.data", []);
        $("#gridInsGrdInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridMrtgInfo").pqGrid("option", "dataModel.data", []);
        $("#gridMrtgInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridEnsrInfo").pqGrid("option", "dataModel.data", []);
        $("#gridEnsrInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#gridCmplInfo").pqGrid("option", "dataModel.data", []);
        $("#gridCmplInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
        $("#TB04010S_ibDealList").html("");
      }
    });
  }

  // %포멧 확인
  function formatPerInput(element) {
    let value = element.value;

    //숫자와 소수점만 허용
    value = value.replace(/[^0-9.]/g, "");

    // 소수점 두 자리까지만 허용
    if (value.includes(".")) {
      let parts = value.split(".");
      parts[1] = parts[1].substring(0, 2); // 소수점 두 자리로 제한
      value = parts.join(".");
    }

    if (parseFloat(value) > 100.0) {
      showErrorPopup("입력값은 100을 넘을 수 없습니다");
      element.value = "";
      element.focus();
      return;
    }

    // 값이 있고 소수점이 없는 경우 .00 추가
    if (value && !value.includes(".")) {
      value = parseFloat(value).toFixed(2);
    }

    if (!value) {
      value = "";
    }

    element.value = value;
  }
  window.formatPerInput = formatPerInput;

  // 버튼 function
  function assesmentRequest(mtrPrgSttsDcd) {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드
    var bscAstsInptExptF = $("#bscAstsInptExptF").val(); //입력예정여부

    var mtrPrgSttsDcd = mtrPrgSttsDcd; // 안건진행상태구분코드
    var errorText = "Deal 정보를 확인해 주세요.";

    if (isEmpty(dealNo)) {
      openPopup({
        type: "error",
        title: "Error!",
        text: errorText,
        focusCancel: true,
      });

      return false;
    }

    // 승인요청시 거래상대방 > 차주는 필수 항목
    if (mtrPrgSttsDcd == "202" || mtrPrgSttsDcd == "309") {
      let cmCmpy = arrPqGridCncCmpnyInfo.pdata;
      if (cmCmpy.length === 0) {
        openPopup({
          type: "error",
          title: "Error!",
          text: `거래상대방을 입력해주세요`,
          focusCancel: true,
        });
        $('#ramsTab a[href="#TB04010S_tab-4"]').tab("show");
        setCncCmpnyInfoGrid();
        return false;
      }
      let cmCmpyCrpShpDcd = [];
      for (let i = 0; i < cmCmpy.length; i++) {
        cmCmpyCrpShpDcd.push(cmCmpy[i].crpShpDcd);
      }
      if (
        cmCmpyCrpShpDcd.indexOf("03") === -1 &&
        cmCmpyCrpShpDcd.indexOf("04") === -1 &&
        cmCmpyCrpShpDcd.indexOf("05") === -1 &&
        cmCmpyCrpShpDcd.indexOf("06") === -1 &&
        cmCmpyCrpShpDcd.indexOf("07") === -1 &&
        cmCmpyCrpShpDcd.indexOf("08") === -1 &&
        cmCmpyCrpShpDcd.indexOf("09") === -1
      ) {
        openPopup({
          type: "error",
          title: "Error!",
          text: `거래상대방 차주를 입력해주세요`,
          focusCancel: true,
        });
        $('#ramsTab a[href="#TB04010S_tab-4"]').tab("show");
        return false;
      }
    }
    if ("202" == mtrPrgSttsDcd) {
      errorText = "심사요청 상태로 변경하였습니다.";
    } else if ("203" == mtrPrgSttsDcd) {
      errorText = "심사요청취소 상태로 변경하였습니다.";
    } else if ("204" == mtrPrgSttsDcd) {
      errorText = "취소심사보류 상태로 변경하였습니다.";
    } else if ("208" == mtrPrgSttsDcd) {
      errorText = "심사승인 상태로 변경하였습니다.";
    } else if ("206" == mtrPrgSttsDcd) {
      errorText = "심사반송 상태로 변경하였습니다.";
    } else if ("309" == mtrPrgSttsDcd) {
      errorText = "자체전결 되었습니다.";
    }

    businessFunction();

    function businessFunction() {
      let dtoParam = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        mtrPrgSttsDcd: mtrPrgSttsDcd,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/assesmentRequest",
        data: dtoParam,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: errorText,
            confirmButtonText: "확인",
          }).then((result) => {
            //btnReset();
            getDealList();
            getDealDetailInfo(dealNo, mtrDcd, jdgmDcd);
            // 초기화 진행후 데이터 바인딩
          });
        },
      }); // end of ajax
    }
  }

  // 조회조건 초기화
  // function resetSearchParam() {
  // 	$('#TB04010S_ibDealNo').val('');
  // 	$('#TB04010S_ibDealNm').val('');
  // 	$('#TB04010S_selectedDealNo').val('');
  // }

  // deal List 가져오기
  function getDealList() {
    let ibDealNo = $("#TB04010S_ibDealNo").val();

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    // 유효성검사
    if (!isEmpty(ibDealNo)) {
      businessFunction();
      $("#TB04010S_selectedDealNo").val(ibDealNo);
    } else {
      option.text = "Deal번호를 입력해 주세요.";
      openPopup(option);

      return false;
    }

    function businessFunction() {
      // 탭 초기화 후 조회 로직 실행
      tab1reset();
      tab2BtnReset();
      tab3BtnReset();
      tab4BtnReset();
      tab5BtnReset();
      tab6BtnReset();
      tab7BtnReset();
      tab8BtnReset();
      var dtoParam = {
        dealNo: ibDealNo,
      };

      $.ajax({
        type: "GET",
        url: "/TB04010S/getDealList",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          if (!data || data.length === 0) {
            Swal.fire({
              icon: "warning",
              title: "warning!",
              text: "등록된 안건정보가 없습니다.",
              confirmButtonText: "확인",
            });
            return;
          }
          $(".save").attr("disabled", false);
          arrPqGridDealListInfo.setData(data);
          arrPqGridDealListInfo.option("rowDblClick", function (event, ui) {
            dblclickYn = "1";
            setTabContents(ui.rowData);
            var dealNo = ui.rowData.dealNo || "";
            var mtrDcd = ui.rowData.mtrDcd || "";
            var jdgmDcd = ui.rowData.jdgmDcd || "";
            var sn = ui.rowData.sn || 0;
            var ownPEno = ui.rowData.ownPEno || ""; // 심사역사번
            compareAuth(ownPEno);
            var key2 = dealNo + mtrDcd;
            // + jdgmDcd + sn;
            getFileInfo("", key2);
            $('div[data-menuid="/TB04010S"] #UPLOAD_AddFile').attr(
              "disabled",
              false
            );
            $('div[data-menuid="/TB04010S"] #UPLOAD_DelFiles').attr(
              "disabled",
              false
            );
          });
        },
      });
    }
  }

  // 화면에서 deal Info 검색 후 더블클릭 set
  function setTabContents(e) {
    // var tr = event.currentTarget;	// event가 deprecated된 같은 기능
    var dealNo = e.dealNo; // 딜번호
    var mtrDcd = e.mtrDcd; // 부수안건구분코드
    var jdgmDcd = e.jdgmDcd; // 리스크심사구분코드
    $("#TB04010S_selectedDealNo").val(dealNo);

    setTab1(dealNo, mtrDcd, jdgmDcd);
    //setTab2(dealNo, mtrDcd, jdgmDcd);
    setTab3(dealNo, mtrDcd, jdgmDcd);
    setTab4(dealNo, mtrDcd, jdgmDcd);
    setTab5(dealNo, mtrDcd, jdgmDcd);
    setTab6(dealNo, mtrDcd, jdgmDcd);
    setTab7(dealNo, mtrDcd, jdgmDcd);
    setTab8(dealNo, mtrDcd, jdgmDcd);
  }

  // 안건구조tab setting
  function setTab1(dealNo, mtrDcd, jdgmDcd) {
    getDealDetailInfo(dealNo, mtrDcd, jdgmDcd);
  }

  // 안건구조정보
  function getDealDetailInfo(dealNo, mtrDcd, jdgmDcd) {
    var paramData = {
      dealNo: dealNo, // deal번호
      mtrDcd: mtrDcd, // 부수안건구분코드
      jdgmDcd: jdgmDcd, // 리스크심사구분코드
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getDealDetailInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        var dealDetail = data;

        $("#TB04010S_R014").prop("disabled", true);
        $("#TB04010S_L007").prop("disabled", true);

        $("#TB04010S_L007").val(dealDetail.mtrDcd).prop("selected", true); // 부수안건
        $("#TB04010S_R014").val(dealDetail.jdgmDcd).prop("selected", true); // 리스크심사구분
        $("#TB04010S_R001").val(dealDetail.raDealDcd).prop("selected", true); // RaDeal구분
        $("#ibDealNm").val(dealDetail.mtrNm); // 안건명
        $("#ibDealSnmNm").val(dealDetail.mtrAbbrNm); // 약어명
        $("#TB04010S_R004").val(dealDetail.raRsltnDcd).prop("selected", true); // 전결구분
        if (dealDetail.raRsltnDcd === "1") {
          $("#btnLine").prop("class", "col-sm-5 text-right px-3");
          $("#assesmentRequest").show(); // 심사요청 버튼 show
          $("#assesmentRequestCancel").show(); // 심사요청취소	버튼 show
          $("#assesmentApprove").show(); // 심사승인 버튼 show
          $("#assesmentReturn").show(); // 심사반송 버튼 show
          $("#assesmenttlClsf").hide(); // 승인확정 버튼 hide
        } else if (dealDetail.raRsltnDcd === "2") {
          $("#btnLine").prop("class", "col-sm-5 text-right");
          $("#assesmentRequest").hide(); // 심사요청 버튼 hide
          $("#assesmentRequestCancel").hide(); // 심사요청취소	버튼 hide
          $("#assesmentApprove").hide(); // 심사승인 버튼 hide
          $("#assesmentReturn").hide(); // 심사반송 버튼 hide
          $("#assesmenttlClsf").show(); // 승인확정 버튼 show
        }
        if (dealDetail.riskRcgNo == null) {
          $("#TB04010S_riskRcgNo").val("미등록");
        } else {
          $("#TB04010S_riskRcgNo").val(dealDetail.riskRcgNo);
        } // 리스크승인번호

        $("#TB04010S_I010")
          .val(dealDetail.inspctDprtDcd)
          .prop("selected", true); // 심사부서구분
        $("#TB04010S_I029")
          .val(dealDetail.invPrdtLclsCd)
          .prop("selected", true)
          .change(); // 투자상품대분류
        $("#TB04010S_I030")
          .val(dealDetail.invPrdtMdclCd)
          .prop("selected", true)
          .change(); // 투자상품중분류
        $("#TB04010S_I031")
          .val(dealDetail.invPrdtSclsCd)
          .prop("selected", true)
          .change(); // 투자상품소분류
        $("#TB04010S_I028")
          .val(dealDetail.invPrdtDtlsDvdCd)
          .prop("selected", true); // 투자상품상세분류
        $("#TB04010S_mainInvstTrgtNm").val(dealDetail.mainInvstTrgtNm); // 주요투자대상

        $("#TB04010S_I027").val(dealDetail.ptfdCrryCd).prop("selected", true); // 부의기준통화
        $("#crryAmt").val(dealDetail.ptfdAmt.toLocaleString("ko-KR")); // 부의금액
        $("#TB04010S_C006").val(dealDetail.invNtnCd).prop("selected", true); // 투자국가
        $("#aplyExrt").val(dealDetail.aplyExrt); // 적용환율
        $("#crryAmtWn").val(dealDetail.krwTrslPtfdAmt.toLocaleString("ko-KR")); // 부의금액(원)

        $("#TB04010S_I006").val(dealDetail.indTypDvdCd).prop("selected", true); // 고위험사업
        $("#TB04010S_C001").val(dealDetail.checkItemCd).prop("selected", true); // 업무구분
        $("#TB04010S_B011").val(dealDetail.raBsnsZoneCd).prop("selected", true); // 사업지역
        $("#TB04010S_I035")
          .val(dealDetail.invstThingDcd)
          .prop("selected", true); // 주요투자물건
        $("#TB04010S_I036")
          .val(dealDetail.invstThingDtlsDcd)
          .prop("selected", true); // 투자물건상세

        $(":radio[name='TB04010S_esgYn']").radioSelect(dealDetail.esgYn); // ESG리스크심사 대상여부
        $("#TB04010S_R005")
          .val(dealDetail.bsnsDprtEsgGrdDcd)
          .prop("selected", true); // 거래 담당부서 평가등급
        $("#TB04010S_R005_2")
          .val(dealDetail.inspctDprtEsgGrdDcd)
          .prop("selected", true); // 심사부서 평가등급

        $("#TB04013P_esgRiskInspctTrgtDcd")
          .val(dealDetail.esgRiskInspctTrgtDcd)
          .prop("selected", true); // ESG리스크심사 대상여부
        $(":radio[name='TB04013P_esgMngDmnCd']").radioSelect(
          dealDetail.esgMngDmnCd
        ); // ESG리스크심사 검토대상 관리영역
        $(":radio[name='TB04013P_esgInvstAmtCd']").radioSelect(
          dealDetail.esgInvstAmtCd
        ); // ESG리스크심사 검토대상 투자금액
        $(":radio[name='TB04013P_esgInvstTrgtCd']").radioSelect(
          dealDetail.esgInvstTrgtCd
        ); // ESG리스크심사 검토대상 투자대상

        $("#TB04013P_esgRiskInspctTrgtDcd")
          .val(dealDetail.esgRiskInspctTrgtDcd)
          .prop("selected", true); // ESG리스크심사 대상여부
        $("#TB04013P_R005")
          .val(dealDetail.bsnsDprtEsgGrdDcd)
          .prop("selected", true); // 거래 담당부서 평가등급
        $("#TB04013P_bsnsDprtEsgGrdCmmt").val(dealDetail.bsnsDprtEsgGrdCmmt); // 거래 담당부서 평가의견
        $("#TB04013P_R005_2")
          .val(dealDetail.inspctDprtEsgGrdDcd)
          .prop("selected", true); // 심사부서 평가등급
        $("#TB04013P_inspctDprtEsgGrdCmmt").val(
          dealDetail.inspctDprtEsgGrdCmmt
        ); // 심사부서 평가의견

        $("#TB04012P_dlDprtCd1_dlDprtCd").val(dealDetail.dlDprtCd1); // 공동투자 관리점코드1
        $("#TB04012P_dlDprtCd2_dlDprtCd").val(dealDetail.dlDprtCd2); // 공동투자 관리점코드2
        $("#TB04012P_dlDprtCd3_dlDprtCd").val(dealDetail.dlDprtCd3); // 공동투자 관리점코드3
        $("#TB04012P_dlDprtCd1_dlDprtNm").val(dealDetail.dlDprtNm1); // 공동투자 관리점1
        $("#TB04012P_dlDprtCd2_dlDprtNm").val(dealDetail.dlDprtNm2); // 공동투자 관리점2
        $("#TB04012P_dlDprtCd3_dlDprtNm").val(dealDetail.dlDprtNm3); // 공동투자 관리점3

        $("#TB04010S_invPrdMnum").val(dealDetail.invPrdMnum); // 투자기간(개월)
        $("#TB04010S_tab1_datepicker1").val(formatDate(dealDetail.wrtExptDt)); // 기표일(예정)
        $("#TB04010S_mtrtDt").val(formatDate(dealDetail.mtrtExptDt)); // 만기일(예정)

        $("#tlErnAmt").val(dealDetail.tlErnAmt.toLocaleString("ko-KR")); // 전체수익
        $("#wrtErnAmt").val(dealDetail.rcvblErnAmt.toLocaleString("ko-KR")); // 수수료수익
        $("#rcvblErnAmt").val(dealDetail.wrtErnAmt.toLocaleString("ko-KR")); // 투자수익

        $(":radio[name='TB04010S_mrtgOfrF']").radioSelect(dealDetail.mrtgOfrYn); // 담보
        $(":radio[name='TB04010S_ensrF']").radioSelect(dealDetail.ensrYn); // 보증
        $("#TB04010S_R026").val(dealDetail.rspsbCmplDcd).prop("selected", true); // 책임준공

        $("#TB04010S_bsnsDprtCmmtRmrk1").val(dealDetail.busiDptOpnn); // 사업부의견
        $("#TB04010S_inspctDprtCmmtRmrk2").val(dealDetail.jdgmDptOpnn); // 심사부의견

        //$('#TB04010S_C008').val(dealDetail.coprtnTypCd);										// 협업유형
        $("#TB04010S_entpRnm").val(dealDetail.entpNm); // 업체명
        $("#TB04010S_bsnsRgstNo").val(dealDetail.optrRgstNo); // 사업자등록번호
        $("#TB04010S_corpRgstNo").val(dealDetail.corpNo); // 법인등록번호

        $("#mtrPrgSttsDcd").val(dealDetail.mtrPrgSttsDcd); // 심사진행상태코드
        $("#mtrNm").val(dealDetail.mtrNm);

        if (dealDetail.bscAstsInptExptF == "0") {
          $("#bscAstsInptExptF").prop("checked", false);
        } else {
          $("#bscAstsInptExptF").prop("checked", true);
        }

        if (dealDetail.cncCmpnyInptExptF == "0") {
          $("#cncCmpnyInptExptF").prop("checked", false);
        } else {
          $("#cncCmpnyInptExptF").prop("checked", true);
        }

        if (dealDetail.insGrdInptExptF == "0") {
          $("#insGrdInptExptF").prop("checked", false);
        } else {
          $("#insGrdInptExptF").prop("checked", true);
        }

        var chrgPEno = dealDetail.chrrEmpno;
        var dtoParam = {
          empNm: "",
          empno: chrgPEno,
          dprtCd: "",
          dprtNm: "",
          bdCd: "",
          bdNm: "",
        };

        $.ajax({
          type: "GET",
          url: "/findEmpList",
          data: dtoParam,
          dataType: "json",
          success: function (data) {
            if (data != null) {
              $("#TB04010S_bdCd").val(data[0].bdCd); // 본부코드
              $("#TB04010S_bdNm").val(data[0].bdNm); // 본부코드명
              $("#TB04010S_dprtCd").val(data[0].dprtCd); // 부서코드
              $("#TB04010S_dprtNm").val(data[0].dprtNm); // 부서코드명
              $("#TB04010S_empNm").val(data[0].empNm); // 직원명
              $("#TB04010S_empNo").val(chrgPEno);
            }
          },
        }); /* end of ajax*/

        // 심사진행상태코드에 따라서 심사요청버튼 활성화
        let mtrPrgSttsDcd = Number(dealDetail.mtrPrgSttsDcd);

        /**
         * 심사진행상태 >
         * 202 : 심사요청
         * 203 : 심사요청취소
         * 205 : 심사부안건접수
         * 208 : 심사승인
         * 206 : 심사반송
         * ---------------------------------------------------------
         * 삭제 : 202(심사요청) 전까지 삭제가능, 203(심사요청취소) 상태도 안건에 대한 삭제가 가능. = 작성중일때만 해당 안건에 대해 삭제가 가능하다.
         * 심사요청 : 208(심사승인), 심사역배정 단계가 아닌경우 요청이 가능하다. 심사 반송의 경우에도 가능하다.
         * 심사요청 취소 : 202(심사요청) 상태에만 가능하며, 심사역 배정 이후엔 불가함. 이후 배정된 심사역이 심사반송시 가능.
         * 심사승인 : 심사요청 상태이면서 접수관리 및 담당자 배정 화면에서 사업부 부서장이 심사역을 배정한 경우 심사역으로 로그인한 경우에만 심사승인이 가능하다.
         * 심사반송 : 심사요청 상태이면서 접수관리 및 담당자 배정 화면에서 사업부 부서장이 심사역을 배정한 경우 심사역으로 로그인한 경우에만 심사반송이 가능하다.
         */
        // 탭 버튼 활성
        if (mtrPrgSttsDcd > 201) {
          $("#tab-1 .btn-success").prop("disabled", true);
          $("#tab-2 .btn").prop("disabled", true);
          $("#tab-3 .btn").prop("disabled", true);
          $("#tab-4 .btn").prop("disabled", true);
          $("#tab-5 .btn").prop("disabled", true);
          $("#tab-6 .btn").prop("disabled", true);
          $("#tab-7 .btn").prop("disabled", true);
          $("#tab-8 .btn").prop("disabled", true);
          $(".save").prop("disabled", true);
        } else {
          $("#tab-1 .btn-success").prop("disabled", false);
          $("#tab-2 .btn").prop("disabled", false);
          $("#tab-3 .btn").prop("disabled", false);
          $("#tab-4 .btn").prop("disabled", false);
          $("#tab-5 .btn").prop("disabled", false);
          $("#tab-6 .btn").prop("disabled", false);
          $("#tab-7 .btn").prop("disabled", false);
          $("#tab-8 .btn").prop("disabled", false);
          $(".save").prop("disabled", false);
        }

        if (
          mtrPrgSttsDcd == 203 ||
          mtrPrgSttsDcd == 204 ||
          mtrPrgSttsDcd == 206 ||
          mtrPrgSttsDcd == 207
        ) {
          $("#tab-1 .btn-success").prop("disabled", false);
          $("#tab-2 .btn").prop("disabled", false);
          $("#tab-3 .btn").prop("disabled", false);
          $("#tab-4 .btn").prop("disabled", false);
          $("#tab-5 .btn").prop("disabled", false);
          $("#tab-6 .btn").prop("disabled", false);
          $("#tab-7 .btn").prop("disabled", false);
          $("#tab-8 .btn").prop("disabled", false);
          $(".save").prop("disabled", false);
        }

        // 심사요청 버튼 활성
        switch (mtrPrgSttsDcd) {
          // 심사요청 활성화
          case 201:
            $("#assesmentDelete").prop("disabled", false); // 삭제버튼 활성화
            $("#assesmentRequest").prop("disabled", false);
            $("#assesmenttlClsf").prop("disabled", false); // 자체전결 버튼 활성화
            $("#bscAstsInptExptF").prop("disabled", false); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", false); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", false); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", false);
            break;
          case 203:
            $("#assesmentDelete").prop("disabled", false); // 삭제버튼 활성화
            $("#assesmentRequest").prop("disabled", false);
            $("#bscAstsInptExptF").prop("disabled", false); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", false); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", false); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", false);
            break;
          case 206:
            $("#assesmentRequest").prop("disabled", false);
            $("#assesmentRequestCancel").prop("disabled", true);
            $("#assesmentRequestHold").prop("disabled", true);
            $("#assesmentApprove").prop("disabled", true);
            $("#assesmentReturn").prop("disabled", true);
            $("#bscAstsInptExptF").prop("disabled", false); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", false); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", false); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
            break;

          // 심사요청취소 활성화
          case 202:
            $("#assesmentRequest").prop("disabled", true);
            $("#assesmentRequestCancel").prop("disabled", false);
            $("#assesmentRequestHold").prop("disabled", true);
            $("#assesmentApprove").prop("disabled", true);
            $("#assesmentReturn").prop("disabled", true);
            $("#bscAstsInptExptF").prop("disabled", false); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", false); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", false); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
            break;

          // 승인, 반송, 보류 활성화
          case 205:
            $("#assesmentRequest").prop("disabled", true);
            $("#assesmentRequestCancel").prop("disabled", true);
            $("#assesmentRequestHold").prop("disabled", false);
            if (sameYn === "same") {
              $("#assesmentApprove").prop("disabled", false);
              $("#assesmentReturn").prop("disabled", false);
            } else {
              $("#assesmentApprove").prop("disabled", true);
              $("#assesmentReturn").prop("disabled", true);
            }
            $("#bscAstsInptExptF").prop("disabled", false); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", false); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", false); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
            break;
          case 208:
            $("#assesmentRequest").prop("disabled", true);
            $("#assesmentRequestCancel").prop("disabled", true);
            $("#assesmentRequestHold").prop("disabled", true);
            $("#assesmentApprove").prop("disabled", true);
            $("#assesmentReturn").prop("disabled", true);
            $("#assesmentDelete").prop("disabled", true); // 삭제버튼 비활성화
            $("#bscAstsInptExptF").prop("disabled", true); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", true); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", true); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
          case 309:
            $("#assesmenttlClsf").prop("disabled", true);
            $("#assesmentDelete").prop("disabled", true); // 삭제버튼 비활성화
            $("#bscAstsInptExptF").prop("disabled", true); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", true); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", true); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
            break;
          default:
            $("#assesmentRequest").prop("disabled", true);
            $("#assesmentRequestCancel").prop("disabled", true);
            $("#assesmentRequestHold").prop("disabled", true);
            $("#assesmentApprove").prop("disabled", true);
            $("#assesmentReturn").prop("disabled", true);
            $("#bscAstsInptExptF").prop("disabled", true); // 기초자산 입력예정여부 disabled false
            $("#cncCmpnyInptExptF").prop("disabled", true); // 거래상대방 입력예정여부 disabled false
            $("#insGrdInptExptF").prop("disabled", true); // 내부등급 입력예정여부 disabled false
            $(".save").prop("disabled", true);
            break;
        }
      },
    }); /* end of ajax*/
  }

  //로그인사원이 심사역인지 확인
  function compareAuth(compareVal) {
    var loginP = $("#TB04010S_empNo1").val();
    var compareP = compareVal;

    // 두 값 비교하여 결과 리턴
    if (loginP === compareP) {
      sameYn = "same";
    } else {
      sameYn = "diff";
    }
  }

  // 기초자산정보 탭
  function setTab3(dealNo, mtrDcd, jdgmDcd) {
    getAssetInfo(dealNo, mtrDcd, jdgmDcd);
  }

  // 기초자산 평가액 * 환율
  function assetAmt() {
    // 기초자산 평가액(원)
    $("#TB04010S_crryAmt").keyup(function (event) {
      if (
        (event.key >= 0 && event.key <= 9) ||
        event.key === "Backspace" ||
        event.key === "Delete"
      ) {
        // 1. 숫자입력 체크
        var input1 = $("#TB04010S_aplyExrt").val().replace(/,/g, "");
        if (!isEmpty(input1)) {
          // 2-1. 적용환율 값이 있을경우
          var input2 = $("#TB04010S_crryAmt").val().replace(/,/g, ""); // 콤마 제거
          $("#TB04010S_crevAmt").val(
            Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
          );
        } else {
          // 2-2. 적용환율 값이 없을경우
          var input2 = $("#TB04010S_crryAmt").val().toLocaleString("ko-KR");
          $("#TB04010S_crevAmt").val(input2);
        }
      }
    });

    // 기초자산 평가액(원)
    $("#TB04010S_crryAmt").change(function () {
      var input1 = $("#TB04010S_aplyExrt").val().replace(/,/g, "");
      if (!isEmpty(input1)) {
        // 2-1. 적용환율 값이 있을경우
        var input2 = $("#TB04010S_crryAmt").val().replace(/,/g, ""); // 콤마 제거
        $("#TB04010S_crevAmt").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      } else {
        // 2-2. 적용환율 값이 없을경우
        var input2 = $("#TB04010S_crryAmt").val().toLocaleString("ko-KR");
        $("#TB04010S_crevAmt").val(input2);
      }
    });

    // 적용환율
    $("#TB04010S_aplyExrt").keyup(function (event) {
      if (
        (event.key >= 0 && event.key <= 9) ||
        event.key === "Backspace" ||
        event.key === "Delete"
      ) {
        // 1. 숫자입력 체크
        var input1 = $("#TB04010S_crryAmt").val().replace(/,/g, "");
        if (!isEmpty(input1)) {
          // 2. 값이 있으면 계산
          var input2 = $("#TB04010S_aplyExrt").val().replace(/,/g, "");
          $("#TB04010S_crevAmt").val(
            Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
          );
        } else {
          // 2-2. 적용환율 값이 없을경우
          var input2 = $("#TB04010S_crryAmt").val().toLocaleString("ko-KR");
          $("#TB04010S_crevAmt").val(input2);
        }
      }
    });
    // 적용환율
    $("#TB04010S_aplyExrt").change(function () {
      var input1 = $("#TB04010S_crryAmt").val().replace(/,/g, "");
      if (!isEmpty(input1)) {
        // 2. 값이 있으면 계산
        var input2 = $("#TB04010S_aplyExrt").val().replace(/,/g, "");
        $("#TB04010S_crevAmt").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      } else {
        // 2-2. 적용환율 값이 없을경우
        var input2 = $("#TB04010S_crryAmt").val().toLocaleString("ko-KR");
        $("#TB04010S_crevAmt").val(input2);
      }
    });
  }

  // 기초자산정보 취득
  function getAssetInfo(dealNo, mtrDcd, jdgmDcd) {
    tab3BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getAssetInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridAssetInfo.setData(data);
        arrPqGridAssetInfo.option("rowDblClick", function (event, ui) {
          assetInfoDetails(ui.rowData);
        });
      },
    });
  }

  function assetInfoDetails(e) {
    var bssAsstKndCd = e.bssAsstKndCd; // 기초자산종류코드
    var bscAstsCnts = e.bscAstsCnts; // 기초자산내용
    var rnmCnfmNo = e.rnmCnfmNo; // 실명확인번호
    var bssAsstIsuCrno = e.bssAsstIsuCrno; // 기초자산발행법인등록번호
    var crpNm = e.crpNm; // 법인명
    var invstCrryCd = e.invstCrryCd; // 투자통화코드
    var crryAmt = e.crryAmt; // 기초자산평가액(통화금액)
    var aplyExrt = e.aplyExrt; // 환율
    var crevAmt = e.crevAmt || 0; // 시가평가금액
    var sn = e.sn; // 일련번호

    $("#TB04010S_B010").val(bssAsstKndCd).prop("selected", true); // 기초자산종류코드
    $("#TB04010S_bscAstsCnts").val(bscAstsCnts); // 기초자산내용
    $("#TB04010S_bsc_bsnsRgstNo").val(checkBrnAcno(rnmCnfmNo)); // 실명확인번호
    $("#TB04010S_bsc_corpRgstNo").val(checkBrnAcno(bssAsstIsuCrno)); // 법인번호
    $("#TB04010S_bsc_entpRnm").val(crpNm); // 법인명
    $("#TB04010S_I027_2").val(invstCrryCd).prop("selected", true); // 투자통화코드
    $("#TB04010S_crryAmt").val(addComma(crryAmt)); // 기초자산평가액(통화금액)
    $("#TB04010S_aplyExrt").val(aplyExrt); // 환율
    $("#TB04010S_crevAmt").val(addComma(crevAmt)); // 기초자산평가액(원)
    $("#TB04010S_tab3_sn").val(sn); // 일련번호
  }

  // 거래상대방 탭
  function setTab4(dealNo, mtrDcd, jdgmDcd) {
    getCncCmpnyInfo(dealNo, mtrDcd, jdgmDcd);
  }

  // 거래상대방 취득
  function getCncCmpnyInfo(dealNo, mtrDcd, jdgmDcd) {
    tab4BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getCncCmpnyInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridCncCmpnyInfo.setData(data);
        arrPqGridCncCmpnyInfo.option("rowDblClick", function (event, ui) {
          relatedCompanyInfoDetails(ui.rowData);
        });
      },
    });
  }

  // 거래상대방 그리드 클릭시 데이터 바인딩
  function relatedCompanyInfoDetails(e) {
    var crpShpDcd = e.crpShpDcd; // 형태
    var crpNm = e.crpNm; // 법인한글명
    var crno = e.crno; // 법인번호
    var rnmCnfmNo = e.rnmCnfmNo; // 실명확인번호
    var mxmSthdNm = e.mxmSthdNm; // 최대주주명
    var sn = e.sn; // 항목일련번호

    $("#TB04010S_P010").val(crpShpDcd).prop("selected", true); // 형태
    $("#TB04010S_cnc_entpRnm").val(crpNm); // 법인한글명
    $("#TB04010S_cnc_corpRgstNo").val(checkBrnAcno(crno)); // 법인번호
    $("#TB04010S_cnc_bsnsRgstNo").val(checkBrnAcno(rnmCnfmNo)); // 실명확인번호
    $("#TB04010S_lrgstShrhldrNm").val(mxmSthdNm); // 최대주주명
    $("#TB04010S_tab4_sn").val(sn); // 항목일련번호
  }

  // 내부등급 탭
  function setTab5(dealNo, mtrDcd, jdgmDcd) {
    getInsGrdInfo(dealNo, mtrDcd, jdgmDcd); // 내부등급 정보 취득
  }

  // 내부등급 정보 취득
  function getInsGrdInfo(dealNo, mtrDcd, jdgmDcd) {
    tab5BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getInsGrdInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridInsGrdInfo.setData(data);
        arrPqGridInsGrdInfo.option("rowDblClick", function (event, ui) {
          getInsGrdInfoDetails(ui.rowData);
        });
      },
    });
  }

  // 내부등급 데이터 바인딩
  function getInsGrdInfoDetails(e) {
    var spcltFncTrgtYn = e.spcltFncTrgtYn; // SL대상여부
    var insGrdTrgtYn = e.insGrdTrgtYn; // 내부등급대상여부
    var spcltFncMngNo = e.spcltFncMngNo; // SL번호
    var outsCrdtGrdCcd = e.outsCrdtGrdDcd; // SL내부등급
    // 하나의 법인이 다수의 기업체번호를 가지고있어 조회조건 변경
    var brwrCrno = e.brwrCrno; // 차주법인번호
    var ardyBzepNo = e.ardyBzepNo; // 차주기업체번호
    var insCrdtGrdDcd = e.insCrdtGrdDcd; // 내부등급
    var rnmCnfmNo = e.rnmCnfmNo; // 실명번호
    var entpHnglNm = e.entpHnglNm; // 한글법인명
    var sn = e.sn; // 일련번호

    $(":radio[name='TB04010S_spcltFncTrgtYn']").radioSelect(spcltFncTrgtYn); // 내부등급대상여부
    $(":radio[name='TB04010S_insGrdTrgtYn']").radioSelect(insGrdTrgtYn); // SL대상여부
    $("#TB04010S_spcltFncMngNo").val(spcltFncMngNo); // SL번호
    $("#TB04010S_O006").val(outsCrdtGrdCcd).prop("selected", true); // SL내부등급
    $("#TB04010S_ins_corpRgstNo").val(checkBrnAcno(brwrCrno || "")); // 차주 법인번호
    $("#TB04010S_ins_entpCd").val(checkBrnAcno(ardyBzepNo || "")); // 차주기업체번호
    $("#TB04010S_I012").val(insCrdtGrdDcd).prop("selected", true); // 내부등급
    $("#TB04010S_ins_bsnsRgstNo").val(rnmCnfmNo); // 실명번호
    $("#TB04010S_ins_entpRnm").val(entpHnglNm); // 한글법인명
    $("#TB04010S_tab5_sn").val(sn); // 항목일련번호
  }

  function setTab5Selecbox() {
    // 내부등급대상여부
    $("input[name='TB04010S_insGrdTrgtYn']").on("change", function () {
      var useYn1 = $("input[name=TB04010S_insGrdTrgtYn]:checked").val();

      if (useYn1 == "Y") {
        $("#TB04010S_ins_corpRgstNo").val("");
        $("#TB04010S_ins_bsnsRgstNo").val("");
        $("#TB04010S_ins_entpCd").val("");
        $("#TB04010S_ins_entpRnm").val("");
        //$('#TB04010S_ins_corpRgstNo').prop("readonly", false);
        $("#TB04010S_I012").prop("disabled", false);
        $("#TB04010S_I012 option:eq(0)").prop("selected", true);
        $("#btnCallTb03023p").prop("disabled", false); // 업체정보 팝업 버튼 disabled
      } else {
        $("#TB04010S_ins_corpRgstNo").val("");
        $("#TB04010S_ins_bsnsRgstNo").val("");
        $("#TB04010S_ins_entpRnm").val("");
        $("#TB04010S_ins_entpCd").val("");
        //$('#TB04010S_ins_corpRgstNo').prop("readonly", true);
        $("#TB04010S_I012").prop("disabled", true);
        $("#TB04010S_I012 option:eq(0)").prop("selected", true);
        $("#btnCallTb03023p").prop("disabled", true);
      }
    });
    // SL대상여부
    $("input[name='TB04010S_spcltFncTrgtYn']").on("change", function () {
      var useYn2 = $("input[name=TB04010S_spcltFncTrgtYn]:checked").val();

      if (useYn2 == "Y") {
        $("#TB04010S_spcltFncMngNo").val("");
        $("#TB04010S_spcltFncMngNo").prop("disabled", false);
        $("#TB04010S_O006").prop("disabled", false);
        $("#TB04010S_O006 option:eq(0)").prop("selected", true);
      } else {
        $("#TB04010S_spcltFncMngNo").val("");
        $("#TB04010S_spcltFncMngNo").prop("disabled", true);
        $("#TB04010S_O006").prop("disabled", true);
        $("#TB04010S_O006 option:eq(0)").prop("selected", true);
      }
    });
  }

  // 담보 탭
  function setTab6(dealNo, mtrDcd, jdgmDcd) {
    getMrtgInfo(dealNo, mtrDcd, jdgmDcd);
  }

  // 담보 정보 취득
  function getMrtgInfo(dealNo, mtrDcd, jdgmDcd) {
    tab6BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getMrtgInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridMrtgInfo.setData(data);
        arrPqGridMrtgInfo.option("rowDblClick", function (event, ui) {
          getMrtgInfoDetails(ui.rowData);
        });
      },
    });
  }

  // 담보 탭 상세보기
  function getMrtgInfoDetails(e) {
    var mrtgKndDcd = e.mrtgKndDcd; // 담보유형코드
    var mrtgDtlsDcd = e.mrtgDtlsDcd; // 담보상세
    var mrtgRsnCnts = e.mrtgRsnCnts; // 담보사유내용
    var mrtgEvlAmt = e.mrtgEvlAmt || 0; // 담보평가액(원)
    var rgtRnkDcd = e.rgtRnkDcd; // 권리순위
    var mrtgAcqstStmDcd = e.mrtgAcqstStmDcd; // 담보취득방식코드
    var mrtgAcqstDtlsDcd = e.mrtgAcqstDtlsDcd; // 담보취득방식상세코드
    var invstCrryCd = e.invstCrryCd; // 통화
    var crryAmt = e.crryAmt || 0; // 통화금액
    var aplyExrt = e.aplyExrt; // 환율
    var sn = e.sn; // 항목일련번호

    $("#TB04010S_M007").val(mrtgKndDcd).prop("selected", true); // 담보유형
    $("#TB04010S_M005").val(mrtgDtlsDcd).prop("selected", true); // 담보상세
    $("#TB04010S_mrtgRsnCnts").val(mrtgRsnCnts); // 담보사유내용
    $("#mrtgEvlAmt").val(mrtgEvlAmt.toLocaleString("ko-KR")); // 담보평가액(원)
    $("#TB04010S_R013").val(rgtRnkDcd).prop("selected", true); // 권리순위
    $("#TB04010S_M003").val(mrtgAcqstStmDcd).prop("selected", true); // 담보취득방식코드
    $("#TB04010S_M002").val(mrtgAcqstDtlsDcd).prop("selected", true); // 담보취득방식상세코드
    $("#TB04010S_I027_3").val(invstCrryCd).prop("selected", true); // 통화
    $("#mrtgcrryAmt").val(crryAmt.toLocaleString("ko-KR")); // 통화금액
    $("#TB04010S_tab6_aplyExrt").val(aplyExrt); // 환율
    $("#TB04010S_tab6_sn").val(sn); // 항목일련번호
  }

  // 보증 탭
  function setTab7(dealNo, mtrDcd, jdgmDcd) {
    getEnsrInfo(dealNo, mtrDcd, jdgmDcd); // 보증정보 취득
  }

  // 보증 정보 취득
  function getEnsrInfo(dealNo, mtrDcd, jdgmDcd) {
    tab7BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getEnsrInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridEnsrInfo.setData(data);
        arrPqGridEnsrInfo.option("rowDblClick", function (event, ui) {
          getEnsrInfoDetails(ui.rowData);
        });
      },
    });
  }

  // 보증 탭 상세보기
  function getEnsrInfoDetails(e) {
    var crdtRifcGrteDcd = e.crdtRifcGrteDcd; // 신용보강보증구분코드
    var grteIsttCrno = e.grteIsttCrno; // 보증기관법인번호
    var rnmCnfmNo = e.rnmCnfmNo; // 실명확인번호
    var grteIsttNm = e.grteIsttNm; // 보증기관명
    var grteAmt = e.grteAmt; // 보증금액
    var grteCtns = e.grteCtns; // 보증내용
    var sn = e.sn; // 항목일련번호

    $("#TB04010S_C011").val(crdtRifcGrteDcd).prop("selected", true); // 신용보강보증구분코드
    $("#TB04010S_ensr_corpRgstNo").val(checkBrnAcno(grteIsttCrno)); // 보증기관법인번호
    $("#TB04010S_ensr_bsnsRgstNo").val(checkBrnAcno(rnmCnfmNo)); // 실명확인번호
    $("#TB04010S_ensr_entpRnm").val(grteIsttNm); // 보증기관명
    $("#TB04010S_grteAmt").val(grteAmt.toLocaleString("ko-KR")); // 보증금액
    $("#TB04010S_grteCtns").val(grteCtns); // 보증내용
    $("#TB04010S_tab7_sn").val(sn); // 항목일련번호
  }

  // 책임준공기관정보 탭
  function setTab8(dealNo, mtrDcd, jdgmDcd) {
    getCmplInfo(dealNo, mtrDcd, jdgmDcd); // 책임준공기관정보 취득
    // 법인번호 확인
  }

  // 책임준공기관정보 취득
  function getCmplInfo(dealNo, mtrDcd, jdgmDcd) {
    tab8BtnReset();

    var paramData = {
      dealNo: dealNo,
      mtrDcd: mtrDcd,
      jdgmDcd: jdgmDcd,
    };

    $.ajax({
      type: "GET",
      url: "/TB04010S/getCmplInfo",
      data: paramData,
      dataType: "json",
      success: function (data) {
        arrPqGridCmplInfo.setData(data);
        arrPqGridCmplInfo.option("rowDblClick", function (event, ui) {
          getCmplInfoDetails(ui.rowData);
        });
      },
    });
  }

  // 책임준공기관정보 탭 상세보기
  function getCmplInfoDetails(e) {
    var rspsbCmplOgnDcd = e.rspsbCmplOgnDcd; // 책임준공기관구분코드
    var sccoCrno = e.sccoCrno; // 법인번호
    var rnmCnfmNo = e.rnmCnfmNo; // 실명확인번호
    var isttNm = e.isttNm; // 한글법인명
    var dbtNnfDutyDcd = e.dbtNnfDutyDcd; // 채무불이행의무구분코드
    var dmgRprtnMxExtnt = e.dmgRprtnMxExtnt; // 손해배상최대범위
    var cmplExptDt = e.cmplExptDt; // 책임준공기한
    var sn = e.sn; // 항목일련번호

    $("#TB04010S_R027").val(rspsbCmplOgnDcd).prop("selected", true); // 책임준공기관구분코드
    $("#TB04010S_rspsb_corpRgstNo").val(checkBrnAcno(sccoCrno)); // 법인번호
    $("#TB04010S_rspsb_bsnsRgstNo").val(checkBrnAcno(rnmCnfmNo)); // 실명확인번호
    $("#TB04010S_rspsb_entpRnm").val(isttNm); // 한글법인명
    $("#TB04010S_D001").val(dbtNnfDutyDcd).prop("selected", true); // 채무불이행의무구분코드
    $("#TB04010S_dmgRprtnMxExtnt").val(dmgRprtnMxExtnt); // 손해배상최대범위
    if (!isEmpty(cmplExptDt)) {
      let cmplExptDt1 = cmplExptDt.substring(0, 4);
      let cmplExptDt2 = cmplExptDt.substring(4, 6);
      let cmplExptDt3 = cmplExptDt.substring(6, 8);
      $("#TB04010S_cmplExptDt").val(
        `${cmplExptDt1}-${cmplExptDt2}-${cmplExptDt3}`
      ); // 책임준공기한
    }
    $("#TB04010S_tab8_sn").val(sn); // 항목일련번호
  }

  /*=========================================================================================================================================*/

  // 탭 페이지 항목 로드
  function loadTabContents() {
    loadTab1();
    loadTab3();
    loadTab4();
    loadTab5();
    loadTab6();
    loadTab7();
    loadTab8();
  }

  // 탭1 안건구조
  function loadTab1() {
    loadUserAuth();

    // 부의금액(원) 계산
    $("#crryAmt").on("focusin focusout", function () {
      checkErmAmt();
    });
    // 투자기간 숫자입력 & 만기일 체크
    checkNumber();

    // 투자상품 대분류 선택이벤트
    onChangeInvstGdsLdvdCd();
    // 투자상품 중분류 선택이벤트
    onChangeInvstGdsMdvdCd();

    setTab1Radio();
  }

  // 담당직원정보
  function loadUserAuth() {
    $.ajax({
      type: "GET",
      url: "/getUserAuth",
      dataType: "json",
      success: function (data) {
        $("#TB04010S_hdqtCd").val(data.HdqtCd);
        $("#TB04010S_hdqtNm").val(data.HdqtNm);
        $("#TB04010S_dprtCd").val(data.dprtCd);
        $("#TB04010S_dprtNm").val(data.dprtNm);
        $("#TB04010S_empNo").val(data.eno);
        $("#TB04010S_empNo1").val(data.eno);
        $("#TB04010S_empNm").val(data.empNm);
      },
    });
  }

  // 탭3 기초자산
  function loadTab3() {
    assetAmt(); // 기초자산 평가액 * 적용환율
    bscAstsInptExptFOnChecked();
  }

  // 탭4 법인형태
  function loadTab4() {
    cncCmpnyInptExptFOnChecked();
  }

  // 탭5 내부등급
  function loadTab5() {
    setTab5Selecbox(); // 내부대상여부 셀렉트박스설정
    insGrdInptExptFOnChecked();
  }

  // 탭6 담보
  function loadTab6() {
    //loadMrtgKndCcd();
    //loadMrtgDtlsCcd();
    //loadRgtRnkCcd();
    //loadMrtgAcqstStmCcd();
    //loadMrtgAcqstDtlsCcd();
    //loadMrtgCrncyCd();
    mrtgAmt();
  }

  // 탭7 보증
  function loadTab7() {
    //loadCrdtEhcmntGrntCcd();
    //chkEnsrCorpNo();
  }

  // 탭8 책임준공
  function loadTab8() {
    //loaddbtNpfrmOblgCcd();
    //loadRspsbCmplOgnCcd();
    //chkScCorpNo();
  }

  /**
   * 투자상품 대분류코드 이벤트 핸들러
   */
  function onChangeInvstGdsLdvdCd() {
    $("#TB04010S_I029").on("change", function () {
      console.log("TB04010S_I029 : ", $("#TB04010S_I029").val());
      var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
      changeInvstGdsMdvdCd(selectedLdvdCd);
    });
  }

  function changeInvstGdsMdvdCd(selectedLdvdCd) {
    var html = "";

    html += '<option value="">선택</option>';

    //$("#TB04010S_I030").html(html);

    if (mdvdCd != undefined && mdvdCd.length > 0) {
      var validMdvdCds = [];
      var selectedLdvdPrefix = selectedLdvdCd.slice(0, -1);

      $.each(mdvdCd, function (key, value) {
        if (value.cdValue.startsWith(selectedLdvdPrefix)) {
          validMdvdCds.push(value.cdValue);
        }
      });

      if (validMdvdCds.length > 0) {
        $.each(mdvdCd, function (key, value) {
          if (validMdvdCds.includes(value.cdValue)) {
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")</option>";
          }
        });

        $("#TB04010S_I030").html(html);
        $("#TB04010S_I030")
          .val($("#TB04010S_I030").val())
          .prop("selected", true)
          .change();
      }
    }
  }

  /**
   * 투자상품 중분류코드 이벤트 핸들러
   */
  function onChangeInvstGdsMdvdCd() {
    $("#TB04010S_I030").on("change", function () {
      var selectedMdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
      changeInvstGdsSdvdCd(selectedMdvdCd);
    });
  }

  function changeInvstGdsSdvdCd(selectedMdvdCd) {
    var html = "";

    //$("#TB04010S_I031").html(html);

    html += '<option value="">선택</option>';

    if (sdvdCd != undefined && sdvdCd.length > 0) {
      var validSdvdCds = [];

      $.each(sdvdCd, function (key, value) {
        if (value.cdValue.startsWith(selectedMdvdCd)) {
          validSdvdCds.push(value.cdValue);
        }
      });

      if (validSdvdCds.length > 0) {
        $.each(sdvdCd, function (key, value) {
          if (validSdvdCds.includes(value.cdValue)) {
            html +=
              '<option value="' +
              value.cdValue +
              '">' +
              value.cdName +
              " (" +
              value.cdValue +
              ")</option>";
          }
        });

        $("#TB04010S_I031").html(html);
      }
    }
  }

  // 투자기간 숫자입력 & 만기일 체크 function
  function checkNumber() {
    $("#TB04010S_invPrdMnum").keyup(function (event) {
      if (event.key >= 0 && event.key <= 9) {
        // 1. 숫자입력 체크
        var input = $("#TB04010S_tab1_datepicker1").val();
        if (input != "") {
          // 2. 기표일 값이 있을경우 만기일 계산
          calcDate(); // 개월수 계산하여 만기일 입력 fucntion
        }
      }
    });
  }

  // 부의금액(원) 계산
  function checkErmAmt() {
    // 투자금액
    $("#crryAmt").on("propertychange change keyup paste input", function () {
      //if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {// 1. 숫자입력 체크
      var input1 = $("#aplyExrt").val();
      if (!isEmpty(input1)) {
        var input2 = $("#crryAmt").val().replace(/,/g, ""); // 콤마 제거
        $("#crryAmtWn").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      } else {
        // 2-2. 적용환율 값이 없을경우
        var input2 = $("#crryAmt").val().replace(/,/g, ""); // 콤마 제거
        $("#crryAmtWn").val(input2);
      }
      //}
    });

    // 적용환율
    $("#aplyExrt").on("propertychange change keyup paste input", function () {
      var input1 = $("#crryAmt").val().replace(/,/g, "");
      if (!isEmpty(input1)) {
        // 2. 부의금액 값이 있으면 계산
        var input2 = $("#aplyExrt").val().replace(/,/g, "");
        $("#crryAmtWn").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      }
    });
  }

  /*
   * TAB1
   */
  function tab1save() {
    // 날짜체크 정규식
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    // 유효성검사
    if (isEmpty($("#TB04010S_selectedDealNo").val())) {
      option.text = "Deal정보 조회 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_L007").val())) {
      option.text = "부수안건구분코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_R014").val())) {
      option.text = "신규/재부의 구분을 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#ibDealNm").val())) {
      option.text = "안건명을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_R004").val())) {
      option.text = "전결구분코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_I010").val())) {
      option.text = "심사부서구분코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_I029").val())) {
      option.text = "투자상품대분류코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_I030").val())) {
      option.text = "투자상품중분류코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_I031").val())) {
      option.text = "투자상품소분류코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_I028").val())) {
      option.text = "IB상품분류코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#crryAmt").val()) || $("#crryAmt").val() === "0") {
      option.text = "부의금액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_C001").val())) {
      option.text = "업무구분코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_B011").val())) {
      option.text = "사업지역을 선택해주세요.";
      openPopup(option);
      return false;
    }

    // if (isEmpty($('#TB04010S_I035').val())) {
    // 	option.text = "주요투자물건을 선택해주세요.";
    // 	openPopup(option);
    // 	return false;
    // }

    // if (isEmpty($('#TB04010S_I036').val())) {
    // 	option.text = "투자물건상세를 선택해주세요.";
    // 	openPopup(option);
    // 	return false;
    // }

    if (
      isEmpty($("#TB04010S_invPrdMnum").val()) ||
      $("TB04010S_invPrdMnum").val() === "0"
    ) {
      option.text = "투자기간개월수를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_tab1_datepicker1").val())) {
      option.text = "기표예정일자를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (!pattern.test($("#TB04010S_tab1_datepicker1").val())) {
      option.text = "날짜형식을 확인주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("input[name=TB04010S_mrtgOfrF]:checked").val())) {
      option.text = "담보제공여부를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("input[name=TB04010S_ensrF]:checked").val())) {
      option.text = "보증여부를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#TB04010S_R026").val())) {
      option.text = "책임준공구분코드를 선택해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#tlErnAmt").val())) {
      option.text = "전체수익금액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#rcvblErnAmt").val())) {
      option.text = "수수료수익금액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty($("#wrtErnAmt").val())) {
      option.text = "투자수익금액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    // 숫자형 값 그대로 가져옴
    var tlErnAmt = +$("#tlErnAmt").val();
    var rcvblErnAmt = +$("#rcvblErnAmt").val();
    var wrtErnAmt = +$("#wrtErnAmt").val();

    // 검증 로직
    if (rcvblErnAmt + wrtErnAmt > tlErnAmt) {
      option.text =
        "수수료수익과 투자수익의 합계가 전체수익금액을 초과할 수 없습니다.";
      openPopup(option);
      return false;
    }

    let selectMtrDcd = $("#TB04010S_L007 option:selected").val();
    let selectJdgmDcd = $("#TB04010S_R014 option:selected").val();
    // 중복된 부수안건, 신규/재부의정보 체크
    if (!chkDupMtrDcd(selectMtrDcd, selectJdgmDcd)) return;

    let bscAstsInptExptF; // 기초자산입력예정여부
    if ($("#bscAstsInptExptF").is(":checked")) {
      bscAstsInptExptF = "Y";
    } else {
      bscAstsInptExptF = "N";
    }
    let cncCmpnyInptExptF; // 기초자산입력예정여부
    if ($("#cncCmpnyInptExptF").is(":checked")) {
      cncCmpnyInptExptF = "Y";
    } else {
      cncCmpnyInptExptF = "N";
    }
    let insGrdInptExptF; // 기초자산입력예정여부
    if ($("#insGrdInptExptF").is(":checked")) {
      insGrdInptExptF = "Y";
    } else {
      insGrdInptExptF = "N";
    }

    var paramData = {
      dealNo: $("#TB04010S_selectedDealNo").val(), // 딜번호
      mtrDcd: $("#TB04010S_L007").val(), // 안건구분코드
      jdgmDcd: $("#TB04010S_R014").val(), // 심사구분코드
      sn: 1, // 일련번호
      lastYn: 1, // 최종여부
      mtrPrgSttsDcd: "201", // 안건진행상태구분코드
      mtrNm: $("#ibDealNm").val(), // 안건명
      mtrAbbrNm: $("#ibDealSnmNm").val(), // 안건약어명
      raRsltnDcd: $("#TB04010S_R004").val(), // RA결의구분코드
      raDealDcd: $("#TB04010S_R001").val(), // RADEAL구분코드
      riskRcgNo: $("#TB04010S_riskRcgNo").val(), // 리스크승인번호
      inspctDprtDcd: $("#TB04010S_I010").val(), // 심사부서구분코드
      invPrdtLclsCd: $("#TB04010S_I029").val(), // 투자상품대분류코드
      invPrdtMdclCd: $("#TB04010S_I030").val(), // 투자상품중분류코드
      invPrdtSclsCd: $("#TB04010S_I031").val(), // 투자상품소분류코드
      invPrdtDtlsDvdCd: $("#TB04010S_I028").val(), // 투자상품상세분류코드
      mainInvstTrgtNm: $("#TB04010S_mainInvstTrgtNm").val(), // 주요투자대상명
      ptfdCrryCd: $("#TB04010S_I027").val(), // 부의통화코드
      ptfdAmt: $("#crryAmt").val().replace(/,/g, ""), // 부의금액
      invNtnCd: $("#TB04010S_C006").val(), // 투자국가코드
      aplyExrt: $("#aplyExrt").val().replace(/,/g, ""), // 적용환율
      krwTrslPtfdAmt: $("#crryAmtWn").val().replace(/,/g, ""), // 원화환산부의금액
      indTypDvdCd: $("#TB04010S_I006").val(), // 업종분류코드(고위험산업)
      checkItemCd: $("#TB04010S_C001").val(), // 점검항목코드(업무구분)
      raBsnsZoneCd: $("#TB04010S_B011").val(), // RA사업지역코드
      invstThingDcd: $("#TB04010S_I035").val(), // 투자물건구분코드
      invstThingDtlsDcd: $("#TB04010S_I036").val(), // 투자물건상세구분코드
      dlDprtCd1: $("#TB04012P_dlDprtCd1_dlDprtCd").val(), // 거래부점코드1
      dlDprtCd2: $("#TB04012P_dlDprtCd2_dlDprtCd").val(), // 거래부점코드2
      dlDprtCd3: $("#TB04012P_dlDprtCd3_dlDprtCd").val(), // 거래부점코드3
      hdqtCd: $("#TB04010S_hdqtCd").val(), // 본부코드
      dprtCd: $("#TB04010S_dprtCd").val(), // 부점코드
      chrrEmpno: $("#TB04010S_empNo").val(), // 담당자사번
      // TODO : 안건정보 재 저장시 심사역 초기화 여부 확인필요
      ownPEno: "", // 심사역사번
      esgYn: $("input[name=TB04010S_esgYn]:checked").val(), // ESG여부
      esgMngDmnCd: $("input[name=TB04013P_esgMngDmnCd]:checked").val(), // ESG관리영역코드
      esgInvstAmtCd: $("input[name=TB04013P_esgInvstAmtCd]:checked").val(), // ESG투자금액코드
      esgInvstTrgtCd: $("input[name=TB04013P_esgInvstTrgtCd]:checked").val(), // ESG투자대상코드
      esgRiskInspctTrgtDcd: $("#TB04013P_esgRiskInspctTrgtDcd").val(), // ESG리스크심사대상구분코드
      bsnsDprtEsgGrdDcd: $("#TB04013P_R005").val(), // 사업부서ESG등급구분코드
      bsnsDprtEsgGrdCmmt: $("#TB04013P_bsnsDprtEsgGrdCmmt").val(), // 사업부서ESG등급의견
      inspctDprtEsgGrdDcd: $("#TB04013P_R005_2").val(), // 심사부서ESG등급구분코드
      inspctDprtEsgGrdCmmt: $("#TB04013P_inspctDprtEsgGrdCmmt").val(), // 심사부서ESG등급의견
      invPrdMnum: $("#TB04010S_invPrdMnum").val(), // 투자기간개월수
      wrtExptDt: $("#TB04010S_tab1_datepicker1").val().replaceAll("-", ""), // 기표예정일자
      mtrtExptDt: $("#TB04010S_mtrtDt").val().replaceAll("-", ""), // 만기예정일자
      tlErnAmt: $("#tlErnAmt").val().replace(/,/g, ""), // 전체수익
      wrtErnAmt: $("#rcvblErnAmt").val().replace(/,/g, ""), // 기표수익금액(수수료수익)
      rcvblErnAmt: $("#wrtErnAmt").val().replace(/,/g, ""), // 미수수익금액(투자수익)
      mrtgOfrYn: $("input[name=TB04010S_mrtgOfrF]:checked").val(), // 담보제공여부
      ensrYn: $("input[name=TB04010S_ensrF]:checked").val(), // 보증여부
      rspsbCmplDcd: $("#TB04010S_R026").val(), // 책임준공구분코드
      entpNm: $("#TB04010S_entpRnm").val(), // 업체명
      bzno: $("#TB04010S_bsnsRgstNo").val().replaceAll("-", ""), // 사업자등록번호
      corpNo: $("#TB04010S_corpRgstNo").val().replaceAll("-", ""), // 법인번호
      //, "coprtnTypCd": $('#TB04010S_C008').val()                        			// 협업유형코드
      busiDptOpnn: $("#TB04010S_bsnsDprtCmmtRmrk1").val(), // 사업부서의견
      jdgmDptOpnn: $("#TB04010S_inspctDprtCmmtRmrk2").val(), // 심사부서의견
      cnsbMtgNo: "", // 협의체회의번호(협의체구분코드_결의년도_일련번호)
      bscAstsInptExptF: bscAstsInptExptF, // 기초자산입력예정여부
      cncCmpnyInptExptF: cncCmpnyInptExptF, // 거래상대방입력예정여부
      insGrdInptExptF: insGrdInptExptF, // 내부등급입력예정여부
      //, "hndDetlDtm": hndDetlDtm                          // 조작상세일시
      //, "hndEmpno": hndEmpno                              // 조작사원번호
      //, "hndTmnlNo": hndTmnlNo                            // 조작단말기번호
      //, "hndTrId": hndTrId                                // 조작거래id
      //, "guid": guid                                      // guid
    };

    $.ajax({
      type: "POST",
      url: "/TB04010S/registDealInfo",
      data: paramData,
      dataType: "json",
      success: function () {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Deal정보를 저장하였습니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          $("#TB04010S_ibDealNo").val($("#TB04010S_selectedDealNo").val());

          getDealList();
          let dealNo =
            arrPqGridDealListInfo.pdata[arrPqGridDealListInfo.pdata.length];
        });
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Deal정보를 저장하는데 실패하였습니다.",
          confirmButtonText: "확인",
        });
      },
    });
  }

  function btnReset() {
    $("#TB04010S_ibDealNo").val("");
    $("#TB04010S_ibDealNm").val("");
    $("#TB04010S_selectedDealNo").val("");
    $("#gridDealListInfo").pqGrid("option", "dataModel.data", []);
    $("#gridDealListInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridDocInfo").pqGrid("option", "dataModel.data", []);
    $("#gridDocInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridAssetInfo").pqGrid("option", "dataModel.data", []);
    $("#gridAssetInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridCncCmpnyInfo").pqGrid("option", "dataModel.data", []);
    $("#gridCncCmpnyInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridInsGrdInfo").pqGrid("option", "dataModel.data", []);
    $("#gridInsGrdInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridMrtgInfo").pqGrid("option", "dataModel.data", []);
    $("#gridMrtgInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridEnsrInfo").pqGrid("option", "dataModel.data", []);
    $("#gridEnsrInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#gridCmplInfo").pqGrid("option", "dataModel.data", []);
    $("#gridCmplInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    tab1reset();
    tab2BtnReset();
    tab3BtnReset();
    tab4BtnReset();
    tab5BtnReset();
    tab6BtnReset();
    tab7BtnReset();
    tab8BtnReset();
    $('#ramsTab a[href="#tab-1"]').tab("show");
    $("#TB04010S_L007").focus();
  }

  // tab1 안건구조 초기화
  function tab1reset() {
    dblclickYn = "0";
    //$("#TB04010S_selectedDealNo").val(""); // 딜번호초기화
    $("#mtrPrgSttsDcd").val(""); // 심사진행상태코드 초기화
    $("#mtrNm").val(""); // 부수안건명 초기화
    $("#TB04010S_ibDealList tr").removeClass("table-active");
    $("#TB04010S_R014 option:eq(0)").prop("selected", true).change(); // 리스크심사구분
    $("#TB04010S_R014").prop("disabled", false); // 리스크심사구분
    $("#TB04010S_L007 option:eq(0)").prop("selected", true).change(); // 부수안건
    $("#TB04010S_L007").prop("disabled", false); // 부수안건
    $("#TB04010S_R001 option:eq(0)").prop("selected", true).change(); // RA구분코드

    $("#ibDealNm").val(""); // 안건명
    $("#ibDealSnmNm").val(""); // 약어명

    $("#TB04010S_R004 option:eq(0)").prop("selected", true).change(); // 전결구분
    $("#TB04010S_riskRcgNo").val(""); // 리스크승인번호

    $("#TB04010S_I010 option:eq(0)").prop("selected", true).change(); // 심사부서구분
    $("#TB04010S_I029 option:eq(0)").prop("selected", true).change(); // 투자상품대분류
    $("#TB04010S_I030 option:eq(0)").prop("selected", true).change(); // 투자상품중분류
    $("#TB04010S_I031 option:eq(0)").prop("selected", true).change(); // 투자상품소분류
    $("#TB04010S_I028 option:eq(0)").prop("selected", true).change(); // 상세분류
    $("#TB04010S_mainInvstTrgtNm").val(""); // 주요투자대상

    $("#TB04010S_I027 option[value='KRW']").prop("selected", true).change(); // 부의기준통화
    $("#crryAmt").val(""); // 부의금액
    $("#TB04010S_C006 option[value='KR']").prop("selected", true).change(); // 투자국가
    $("#aplyExrt").val("1"); // 적용환율
    $("#crryAmtWn").val(""); // 부의금액(원)

    $("#TB04010S_I006 option:eq(0)").prop("selected", true).change(); // 고위험산업
    $("#TB04010S_C001 option:eq(0)").prop("selected", true).change(); // 업무구분
    $("#TB04010S_B011 option:eq(0)").prop("selected", true).change(); // 사업지역
    $("#TB04010S_I035 option:eq(0)").prop("selected", true).change(); // 주요투자물건
    $("#TB04010S_I036 option:eq(0)").prop("selected", true).change(); // 투자물건상세

    loadUserAuth(); // 담당직원

    $("#TB04012P_dlDprtCd1_dlDprtCd").val(""); // 관리부서코드1
    $("#TB04012P_dlDprtCd1_dlDprtNm").val(""); // 관리부서코드명1
    $("#TB04012P_dlDprtCd2_dlDprtCd").val(""); // 관리부서코드2
    $("#TB04012P_dlDprtCd2_dlDprtNm").val(""); // 관리부서코드명2
    $("#TB04012P_dlDprtCd3_dlDprtCd").val(""); // 관리부서코드3
    $("#TB04012P_dlDprtCd4_dlDprtNm").val(""); // 관리부서코드명3

    $(":radio[name='TB04010S_esgYn']").radioSelect("N"); // ESG리스크심사 대상여부
    $("#TB04010S_R005 option:eq(0)").prop("selected", true); // ESG리스크심사 거래담당부서
    $("#TB04010S_R005_2 option:eq(0)").prop("selected", true); // ESG리스크심사 심사담당부서
    $(":radio[name='TB04013P_esgMngDmnCd']").prop("checked", false); // ESG리스크심사 관리영역
    $(":radio[name='TB04013P_esgInvstAmtCd']").prop("checked", false); // ESG리스크심사 투자금액
    $(":radio[name='TB04013P_esgInvstTrgtCd']").prop("checked", false); // ESG리스크심사 투자대상
    $("#TB04013P_esgRiskInspctTrgtDcd option:eq(1)").prop("selected", true); // ESG리스크심사 대상
    $("#TB04013P_R005 option:eq(0)").prop("selected", true); // ESG리스크심사 거래담당부서
    $("#TB04013P_bsnsDprtEsgGrdCmmt").val(""); // ESG리스크심사 거래담당부서 기타 특이사항
    $("#TB04013P_R005_2 option:eq(0)").prop("selected", true); // ESG리스크심사 심사담당부서
    $("#TB04013P_inspctDprtEsgGrdCmmt").val(""); // ESG리스크심사 심사담당부서 기타 특이사항

    $("#TB04010S_invPrdMnum").val(""); // 투자기간(개월)
    $("#TB04010S_tab1_datepicker1").val(""); // 기표일(예정)
    $("#TB04010S_mtrtDt").val(""); // 만기일

    $("#tlErnAmt").val(""); // 전체수익
    $("#rcvblErnAmt").val(""); // 수수료수익
    $("#wrtErnAmt").val(""); // 투자수익

    $(':radio[name="TB04010S_mrtgOfrF"][value="N"]').prop("checked", true); // 담보
    $(':radio[name="TB04010S_ensrF"][value="N"]').prop("checked", true); // 보증
    $("#TB04010S_R026 option:eq(0)").prop("selected", true).change(); // 책임준공

    $("#TB04010S_entpCd").val(""); // 업체코드
    $("#TB04010S_rprsNm").val(""); // 대표자명
    $("#TB04010S_corpRgstNo").val(""); // 법인등록번호
    $("#TB04010S_bsnsRgstNo").val(""); // 사업자등록번호
    $("#TB04010S_entpRnm").val(""); // 업체명

    //$("#TB04010S_C008 option:eq(0)").prop("selected", true).change();				// 협업유형

    $("#TB04010S_bsnsDprtCmmtRmrk1").val(""); // 사업부의견
    $("#TB04010S_inspctDprtCmmtRmrk2").val(""); // 심사부의견

    $("#assesmentRequest").prop("disabled", true); // 심사요청버튼
    $("#assesmentRequestCancel").prop("disabled", true); // 심사요청취소버튼
    //$('#assesmentRequestHold').prop("disabled", true);								// 취소심사보류버튼
    $("#assesmentApprove").prop("disabled", true); // 심사승인버튼
    $("#assesmentReturn").prop("disabled", true); // 심사반송버튼
    //$("#gridDealListInfo").pqGrid("option", "dataModel.data", []);
    //$("#gridDealListInfo").pqGrid("refreshDataAndView"); // pqgrid 초기화
    $("#TB04010S_tab-1 .btn-success").prop("disabled", false); // 저장버튼
  }

  /**
   * 안건삭제
   */
  function deleteDealInfo() {
    let option = {}; // 메세지박스 옵션 객체
    let dealNo = $("#TB04010S_selectedDealNo").val(); // 조회된 딜번호
    let mtrDcd = $("#TB04010S_L007 option:selected").val(); // 조회된 부수안건
    let jdgmDcd = $("#TB04010S_R014 option:selected").val(); // 조회된 신규/재부의정보
    let mtrPrgSttsDcd = $("#mtrPrgSttsDcd").val(); // 심사진행상태코드

    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "삭제할 Deal번호를 조회해주세요.";
      openPopup(option);
      callTB03021P("TB04010S");
      return false;
    }

    if (!$("#TB04010S_L007").prop("disabled") || isEmpty(mtrDcd)) {
      option.text = "삭제할 안건을 조회해주세요.";
      openPopup(option);
      $("#TB04010S_L007").focus();
      return false;
    }

    if (!$("#TB04010S_R014").prop("disabled") || isEmpty(jdgmDcd)) {
      option.text = "삭제할 안건을 조회해주세요.";
      openPopup(option);
      $("#TB04010S_R014").focus();
      return false;
    }

    if (
      isEmpty(mtrPrgSttsDcd) &&
      mtrPrgSttsDcd != "201" &&
      mtrPrgSttsDcd != "203"
    ) {
      option.text =
        "안건 삭제는 '심사정보저장', '심사요청취소' 상태에서 가능합니다.";
      openPopup(option);
      return false;
    }
    //
    Swal.fire({
      title: "안건 삭제",
      text: `[${$("#mtrNm").val()}]을 삭제하시겠습니까?`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((e) => {
      if (e.isConfirmed) {
        let dtoParam = {
          dealNo: dealNo, // 딜번호
          mtrDcd: mtrDcd, // 부수안건코드
          jdgmDcd: jdgmDcd, // 신규/재부의정보
          mtrPrgSttsDcd: mtrPrgSttsDcd, // 심사진행상태코드
        };

        $.ajax({
          type: "POST",
          url: "/TB04010S/deleteDealInfo",
          data: dtoParam,
          dataType: "json",
          success: function (data) {
            Swal.fire({
              icon: "success",
              title: "success",
              text: `${data}개의 안건을 삭제했습니다.`,
              confirmButtonText: "확인",
            }).then(() => {
              getDealList();
            });
          },
          error: function () {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "안건을 삭제하는데 실패하였습니다. 관리자에게 문의하세요.",
              confirmButtonText: "확인",
            });
          },
        });
      }
    });
  }

  /*
   * TAB2
   */
  // 관련문서정보 초기화
  function tab2BtnReset() {
    $("#UPLOAD_FileList").html(""); // 테이블 리셋
    $('div[data-menuid="/TB04010S"] #UPLOAD_AddFile').attr("disabled", true);
    $('div[data-menuid="/TB04010S"] #UPLOAD_DelFiles').attr("disabled", true);
  }

  // 기초자산 초기화
  function tab3BtnReset() {
    $("#TB04010S_B010 option:eq(0)").prop("selected", true); // 기초자산종류코드
    $('#TB04010S_I027_2 option[value="KRW"]').prop("selected", true); // 부의기준통화
    $("#TB04010S_bscAstsCnts").val(""); // 기초자산내용
    $("#TB04010S_crryAmt").val(""); // 기초자산 평가액(통화금액)
    $("#TB04010S_bsc_bsnsRgstNo").val(""); // 실명번호
    $("#TB04010S_aplyExrt").val("1"); // 적용환율
    $("#TB04010S_bsc_entpRnm").val(""); // 법인명
    $("#TB04010S_bsc_corpRgstNo").val(""); // 법인등록번호
    $("#TB04010S_crevAmt").val(""); // 기초자산 평가액(원)
    $("#TB04010S_tab3_sn").val(""); // 항목일련번호
    $("#TB04010S_tab-3 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 기초자산정보 저장
  function tab3BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드

    var bssAsstKndCd = $("#TB04010S_B010").val(); // 기초자산유형
    var bscAstsCnts = $("#TB04010S_bscAstsCnts").val(); // 기초자산내용
    var rnmCnfmNo = $("#TB04010S_bsc_bsnsRgstNo").val().replaceAll("-", ""); // 실명확인번호
    var bssAsstIsuCrno = $("#TB04010S_bsc_corpRgstNo")
      .val()
      .replaceAll("-", ""); // 기초자산발행법인번호
    var crpNm = $("#TB04010S_bsc_entpRnm").val(); // 법인명
    var invstCrryCd = $("#TB04010S_I027_2").val(); // 투자통화코드
    var crryAmt = $("#TB04010S_crryAmt").val().replaceAll(",", ""); // 기초자산평가액(통화금액)
    var aplyExrt = $("#TB04010S_aplyExrt").val().replaceAll(",", ""); // 환율
    var crevAmt = $("#TB04010S_crevAmt").val().replaceAll(",", ""); // 기초자산평가액(원)
    var sn = Number($("#TB04010S_tab3_sn").val()); // 일련번호
    console.log(crevAmt);
    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(bscAstsCnts)) {
      option.text = "기초자산내용을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(crpNm)) {
      option.text = "기초자산발행사 정보를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(crryAmt)) {
      option.text = "기초자산평가액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        bssAsstKndCd: bssAsstKndCd,
        bscAstsCnts: bscAstsCnts,
        rnmCnfmNo: rnmCnfmNo,
        bssAsstIsuCrno: bssAsstIsuCrno,
        crpNm: crpNm,
        invstCrryCd: invstCrryCd,
        crryAmt: crryAmt,
        aplyExrt: aplyExrt,
        crevAmt: crevAmt,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registAssetInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "기초자산정보를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getAssetInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "기초자산정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 기초자산정보 삭제
  function tab3BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드
    var sn = Number($("#TB04010S_tab3_sn").val()); // 일련번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "기초자산정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteAssetInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "기초자산정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getAssetInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "기초자산정보를 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 기초자산 입력 예정여부 저장
  function bscAstsInptExptFOnChecked() {
    $("#bscAstsInptExptF").on("change", function () {
      saveBscAstsInptExptF();
    });
  }

  function saveBscAstsInptExptF() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드

    if ($("#bscAstsInptExptF").is(":checked")) {
      bscAstsInptExptF = "Y";
    } else {
      bscAstsInptExptF = "N";
    }

    if (isEmpty(dealNo)) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "선택된 안건이 없습니다.",
        confirmButtonText: "확인",
      });
      bscAstsInptExptF = "N";
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        bscAstsInptExptF: bscAstsInptExptF,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registBscAstsInptExptF",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "기초자산정보 입력예정 여부가 변경되었습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 거래상대방정보 초기화
  function tab4BtnReset() {
    $("#TB04010S_P010 option:eq(0)").prop("selected", true);
    $("#TB04010S_cnc_bsnsRgstNo").val("");
    $("#TB04010S_cnc_corpRgstNo").val("");
    $("#TB04010S_cnc_entpCd").val("");
    $("#TB04010S_cnc_rprsNm").val("");
    $("#TB04010S_cnc_entpRnm").val("");
    $("#TB04010S_lrgstShrhldrNm").val("");
    $("#TB04010S_tab4_sn").val("");
    $("#TB04010S_tab-4 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 거래상대방정보 저장
  function tab4BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드
    var sn = Number($("#TB04010S_tab4_sn").val()); // 일련번호
    let mxmSthdNm = $("#TB04010S_lrgstShrhldrNm").val(); // 최대주주명
    var crpShpDcd = $("#TB04010S_P010").val(); // 법인형태구분코드
    var crno = $("#TB04010S_cnc_corpRgstNo").val().replaceAll("-", ""); // 발행기관법인번호
    var crpNm = $("#TB04010S_cnc_entpRnm").val().replaceAll("-", ""); // 법인명
    var rnmCnfmNo = $("#TB04010S_cnc_bsnsRgstNo").val().replaceAll("-", ""); // 실명확인번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(crpNm)) {
      option.text = "거래상대방정보를 입력해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        crpShpDcd: crpShpDcd,
        crno: crno,
        crpNm: crpNm,
        rnmCnfmNo: rnmCnfmNo,
        mxmSthdNm: mxmSthdNm,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registCncCmpnyInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "거래상대방정보를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getCncCmpnyInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "거래상대방정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 거래상대방정보 삭제
  function tab4BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드
    var sn = Number($("#TB04010S_tab4_sn").val()); // 일련번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "거래상대방정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteCncCmpnyInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "거래상대방정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getCncCmpnyInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "거래상대방정보를 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 거래상대방 입력 예정여부 저장
  function cncCmpnyInptExptFOnChecked() {
    $("#cncCmpnyInptExptF").on("change", function () {
      saveCncCmpnyInptExptF();
    });
  }

  function saveCncCmpnyInptExptF() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드

    var cncCmpnyInptExptF;

    if ($("#cncCmpnyInptExptF").is(":checked")) {
      cncCmpnyInptExptF = "Y";
    } else {
      cncCmpnyInptExptF = "N";
    }

    if (isEmpty(dealNo)) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "선택된 안건이 없습니다.",
        confirmButtonText: "확인",
      });

      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        cncCmpnyInptExptF: cncCmpnyInptExptF,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registCncCmpnyInptExptF",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "거래상대방정보 입력예정 여부가 변경되었습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 내부등급정보 초기화
  function tab5BtnReset() {
    $(":radio[name='TB04010S_spcltFncTrgtYn']").radioSelect("N");
    $(":radio[name='TB04010S_insGrdTrgtYn']").radioSelect("N");
    $("#TB04010S_spcltFncMngNo").val("");
    $("#TB04010S_O006 option:eq(0)").prop("selected", true);
    $("#TB04010S_ins_entpCd").val("");
    $("#TB04010S_ins_entpRnm").val("");
    $("#TB04010S_ins_rprsNm").val("");
    $("#TB04010S_ins_corpRgstNo").val("");
    $("#TB04010S_ins_bsnsRgstNo").val("");
    $("#TB04010S_I012 option:eq(0)").prop("selected", true);
    $("#TB04010S_tab5_sn").val("");
    $("#TB04010S_tab-5 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 내부등급정보 저장
  function tab5BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab5_sn").val()); // 항목일련번호

    var spcltFncTrgtYn = $("input[name=TB04010S_spcltFncTrgtYn]:checked").val(); // SL대상여부
    var insGrdTrgtYn = $("input[name=TB04010S_insGrdTrgtYn]:checked").val(); // 내부등급대상여부

    var spcltFncMngNo = $("#TB04010S_spcltFncMngNo").val(); // SL번호
    var outsCrdtGrdDcd = $("#TB04010S_O006").val(); // SL대상 내부등급

    var brwrCrno = $("#TB04010S_ins_corpRgstNo")
      .val()
      .replace(/[^0-9]/g, ""); // SL비대상 차주법인번호

    var ardyBzepNo = $("#TB04010S_ins_entpCd")
      .val()
      .replace(/[^0-9]/g, ""); // SL비대상 차주기업체번호

    var insCrdtGrdDcd = $("#TB04010S_I012").val(); // SL비대상 내부등급

    var rnmCnfmNo = $("#TB04010S_ins_bsnsRgstNo")
      .val()
      .replace(/[^0-9]/g, ""); // 실명번호

    var option = {};
    option.title = "Error";
    option.type = "error";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if ("Y".match(spcltFncTrgtYn)) {
      if (isEmpty(spcltFncMngNo)) {
        option.text = "SL번호정보를 입력해주세요.";
        openPopup(option);
        return false;
      }
    }

    if ("Y".match(insGrdTrgtYn)) {
      if (isEmpty(ardyBzepNo)) {
        option.text = "기업체코드(차주)를 입력해주세요.";
        openPopup(option);
        return false;
      }
    }

    if ("N".match(spcltFncTrgtYn) && "N".match(insGrdTrgtYn)) {
      option.text = "내부등급정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
        spcltFncTrgtYn: spcltFncTrgtYn,
        insGrdTrgtYn: insGrdTrgtYn,
        spcltFncMngNo: spcltFncMngNo,
        outsCrdtGrdDcd: outsCrdtGrdDcd,
        brwrCrno: brwrCrno,
        insCrdtGrdDcd: insCrdtGrdDcd,
        rnmCnfmNo: rnmCnfmNo,
        ardyBzepNo: ardyBzepNo,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registInsGrdInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "내부등급 정보를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getInsGrdInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "내부등급 정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 내부등급정보 삭제
  function tab5BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab5_sn").val()); // 항목일련번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "내부등급정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteInsGrdInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "내부등급정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getInsGrdInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "내부등급정보를 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 내부등급 입력 예정여부 저장
  function insGrdInptExptFOnChecked() {
    $("#insGrdInptExptF").on("change", function () {
      saveInsGrdInptExptF();
    });
  }

  function saveInsGrdInptExptF() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // deal번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건구분코드
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분코드

    var insGrdInptExptF;

    if ($("#insGrdInptExptF").is(":checked")) {
      insGrdInptExptF = "Y";
    } else {
      insGrdInptExptF = "N";
    }

    if (isEmpty(dealNo)) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "선택된 안건이 없습니다.",
        confirmButtonText: "확인",
      });

      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        insGrdInptExptF: insGrdInptExptF,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registInsGrdInptExptF",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "내부등급정보 입력예정 여부가 변경되었습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 담보평가액 * 환율
  function mrtgAmt() {
    // 담보평가평가액(원)
    $("#mrtgcrryAmt").keyup(function (event) {
      if (
        (event.key >= 0 && event.key <= 9) ||
        event.key === "Backspace" ||
        event.key === "Delete"
      ) {
        // 1. 숫자입력 체크
        var input1 = $("#TB04010S_tab6_aplyExrt").val().replace(/,/g, "");
        if (!isEmpty(input1)) {
          // 2-1. 적용환율 값이 있을경우
          var input2 = $("#mrtgcrryAmt").val().replace(/,/g, ""); // 콤마 제거
          $("#mrtgEvlAmt").val(
            Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
          );
        } else {
          // 2-2. 적용환율 값이 없을경우
          var input2 = $("#mrtgcrryAmt").val().replace(/,/g, "");
          $("#mrtgEvlAmt").val(input2);
        }
      }
    });

    // 담보평가평가액(원)
    $("#mrtgcrryAmt").change(function () {
      var input1 = $("#TB04010S_tab6_aplyExrt").val().replace(/,/g, "");
      if (!isEmpty(input1)) {
        // 2-1. 적용환율 값이 있을경우
        var input2 = $("#mrtgcrryAmt").val().replace(/,/g, ""); // 콤마 제거
        $("#mrtgEvlAmt").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      } else {
        // 2-2. 적용환율 값이 없을경우
        var input2 = $("#mrtgcrryAmt").val().replace(/,/g, "");
        $("#mrtgEvlAmt").val(input2);
      }
    });

    // 적용환율
    $("#TB04010S_tab6_aplyExrt").keyup(function (event) {
      if (
        (event.key >= 0 && event.key <= 9) ||
        event.key === "Backspace" ||
        event.key === "Delete"
      ) {
        // 1. 숫자입력 체크
        var input1 = $("#mrtgcrryAmt").val().replace(/,/g, "");
        if (!isEmpty(input1)) {
          // 2. 값이 있으면 계산
          var input2 = $("#TB04010S_tab6_aplyExrt").val().replace(/,/g, "");
          $("#mrtgEvlAmt").val(
            Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
          );
        } else {
          // 2-2. 적용환율 값이 없을경우
          var input2 = $("#mrtgcrryAmt").val().replace(/,/g, "");
          $("#mrtgEvlAmt").val(input2);
        }
      }
    });
    // 적용환율
    $("#TB04010S_tab6_aplyExrt").change(function () {
      var input1 = $("#mrtgcrryAmt").val().replace(/,/g, "");
      if (!isEmpty(input1)) {
        // 2. 값이 있으면 계산
        var input2 = $("#TB04010S_tab6_aplyExrt").val().replace(/,/g, "");
        $("#mrtgEvlAmt").val(
          Math.floor(Number(input1) * Number(input2)).toLocaleString("ko-KR")
        );
      } else {
        // 2-2. 적용환율 값이 없을경우
        var input2 = $("#mrtgcrryAmt").val().replace(/,/g, "");
        $("#mrtgEvlAmt").val(input2);
      }
    });
  }

  // 담보정보 초기화
  function tab6BtnReset() {
    $("#TB04010S_M007 option:eq(0)").prop("selected", true); // 담보유형
    $("#TB04010S_M005 option:eq(0)").prop("selected", true); // 담보상세
    $("#TB04010S_M003 option:eq(0)").prop("selected", true); // 담보취득방식
    $("#TB04010S_M002 option:eq(0)").prop("selected", true); // 담보취득방식상세
    $("#TB04010S_mrtgDtlsCcd option:eq(0)").prop("selected", true); // 담보상세
    $('#TB04010S_I027_3 option[value="KRW"]').prop("selected", true); // 부의기준통화
    $("#mrtgcrryAmt").val("0"); // 담보평가액(통화금액)
    $("#TB04010S_tab6_aplyExrt").val("1"); // 적용환율
    $("#mrtgEvlAmt").val(0); // 담보평가액(원)
    $("#TB04010S_R013 option:eq(0)").prop("selected", true); // 권리순위
    $("#TB04010S_mrtgRsnCnts").val(""); // 담보명
    $("#TB04010S_tab6_sn").val(""); // 항목일련번호
    $("#TB04010S_tab-6 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 담보정보 저장
  function tab6BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab6_sn").val()); // 일련번호
    var mrtgKndDcd = $("#TB04010S_M007").val(); // 담보종류구분코드
    var mrtgDtlsDcd = $("#TB04010S_M005").val(); // 담보상세구분코드
    var mrtgAcqstStmDcd = $("#TB04010S_M003").val(); // 담보취득방식
    var mrtgAcqstDtlsDcd = $("#TB04010S_M002").val(); // 담보취득방식상세
    var invstCrryCd = $("#TB04010S_I027_3").val(); // 부의기준통화
    var mrtgEvlAmt = ($("#mrtgEvlAmt").val() || "").replace(/,/g, ""); // 담보평가금액
    var crryAmt = ($("#mrtgcrryAmt").val() || "").replace(/,/g, ""); // 통화금액
    var aplyExrt = ($("#TB04010S_tab6_aplyExrt").val() || "").replace(/,/g, ""); // 적용환율

    var rgtRnkDcd = $("#TB04010S_R013").val(); // 권리순위구분코드
    var mrtgRsnCnts = $("#TB04010S_mrtgRsnCnts").val(); // 담보사유내용

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(mrtgRsnCnts)) {
      option.text = "담보명을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(aplyExrt) || isEmpty(mrtgEvlAmt)) {
      option.text = "담보평가액 정보를 입력해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
        mrtgKndDcd: mrtgKndDcd,
        mrtgDtlsDcd: mrtgDtlsDcd,
        mrtgAcqstStmDcd: mrtgAcqstStmDcd,
        mrtgAcqstDtlsDcd: mrtgAcqstDtlsDcd,
        invstCrryCd: invstCrryCd,
        mrtgEvlAmt: mrtgEvlAmt,
        crryAmt: crryAmt,
        aplyExrt: aplyExrt,
        rgtRnkDcd: rgtRnkDcd,
        mrtgRsnCnts: mrtgRsnCnts,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registMrtgInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "담보 정보를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getMrtgInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "담보 정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 담보정보 제거
  function tab6BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab6_sn").val()); // 일련번호

    console.log("datacheck: ", dealNo, mtrDcd, sn);

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "담보정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteMrtgInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "담보 정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getMrtgInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "담보 정보를 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  /*
   * TAB7
   */

  // 보증기관정보 초기화
  function tab7BtnReset() {
    $("#TB04010S_C011 option:eq(0)").prop("selected", true); // 신용보강보증구분코드
    $("#TB04010S_ensr_corpRgstNo").val("");
    $("#TB04010S_ensr_bsnsRgstNo").val("");
    $("#TB04010S_ensr_entpRnm").val("");
    $("#TB04010S_grteAmt").val("");
    $("#TB04010S_grteCtns").val("");
    $("#TB04010S_tab7_sn").val("");
    $("#TB04010S_tab-7 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 보증기관정보 저장
  function tab7BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab7_sn").val()); // 일련번호

    var crdtRifcGrteDcd = $("#TB04010S_C011").val(); // 신용보강보증구분코드
    var grteIsttCrno = $("#TB04010S_ensr_corpRgstNo")
      .val()
      .replace(/[^0-9]/g, ""); // 보증기관법인번호
    var grteIsttNm = $("#TB04010S_ensr_entpRnm").val(); // 보증기관명
    var grteAmt = $("#TB04010S_grteAmt").val().replace(/,/g, ""); // 보증금액
    var grteCtns = $("#TB04010S_grteCtns").val(); // 보증내용
    var rnmCnfmNo = $("#TB04010S_ensr_bsnsRgstNo")
      .val()
      .replace(/[^0-9]/g, ""); // 실명확인번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(grteIsttNm)) {
      option.text = "기관정보를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(grteAmt)) {
      option.text = "보증금액을 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(grteCtns)) {
      option.text = "보증내용을 입력해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
        crdtRifcGrteDcd: crdtRifcGrteDcd,
        grteIsttCrno: grteIsttCrno,
        grteIsttNm: grteIsttNm,
        grteAmt: grteAmt,
        grteCtns: grteCtns,
        rnmCnfmNo: rnmCnfmNo,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registEnsrInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "보증기관정보를 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getEnsrInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "보증기관정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 보증기관정보 제거
  function tab7BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab7_sn").val()); // 일련번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "보증기관정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteEnsrInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "보증기관정보를 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getEnsrInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "보증기관정보를 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 책임준공기관정보 초기화
  function tab8BtnReset() {
    $("#TB04010S_R027 option:eq(0)").prop("selected", true); // 책임준공기관구분
    $("#TB04010S_rspsb_corpRgstNo").val(""); // 증권사법인번호
    $("#TB04010S_D001 option:eq(0)").prop("selected", true); // 채무불이행의무구분코드
    $("#TB04010S_cmplExptDt").val(""); // 준공예정일자
    $("#TB04010S_rspsb_entpRnm").val(""); // 한글법인명
    $("#TB04010S_tab8_sn").val(""); // 항목일련번호
    $("#TB04010S_dmgRprtnMxExtnt").val(""); // 손해배상최대범위
    $("#TB04010S_rspsb_bsnsRgstNo").val(""); // 실명확인번호
    $("#TB04010S_tab-8 .btn-success").prop("disabled", false); // 저장버튼
  }

  // 책임준공기관정보 저장
  function tab8BtnSave() {
    // 안건구조 탭의 부수안건, 리스크심사구분 (pk) 가 조회되었는지 여부 판단
    if (
      isEmpty($("#TB04010S_L007").val()) &&
      !$("#TB04010S_L007").prop("disabled") &&
      isEmpty($("#TB04010S_R014").val()) &&
      !$("#TB04010S_R014").prop("disabled")
    ) {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "안건구조 등록 및 조회 이후 진행바랍니다.",
        confirmButtonText: "확인",
      });
      // 에러메세지 출력후 tab1으로 이동 및 부수안건 input에 포커스
      $('#ramsTab a[href="#tab-1"]').tab("show");
      $("#TB04010S_L007").focus();
      return;
    }
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab8_sn").val()); // 일련번호

    var rspsbCmplOgnDcd = $("#TB04010S_R027").val(); // 책임준공기관구분코드
    var sccoCrno = $("#TB04010S_rspsb_corpRgstNo")
      .val()
      .replace(/[^0-9]/g, ""); // 증권사법인번호
    var dbtNnfDutyDcd = $("#TB04010S_D001").val(); // 채무불이행의무구분코드
    var cmplExptDt = $("#TB04010S_cmplExptDt").val().replaceAll("-", ""); // 준공예정일자
    var isttNm = $("#TB04010S_rspsb_entpRnm").val(); // 보증기관명
    var dmgRprtnMxExtnt = $("#TB04010S_dmgRprtnMxExtnt").val(); // 손해배상최대범위
    var rnmCnfmNo = $("#TB04010S_rspsb_bsnsRgstNo").val().replaceAll("-", ""); // 실명확인번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(isttNm)) {
      option.text = "기관정보를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(dmgRprtnMxExtnt)) {
      option.text = "손해배상최대범위를 입력해주세요.";
      openPopup(option);
      return false;
    }

    if (isEmpty(cmplExptDt)) {
      option.text = "준공예정일자를 입력해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
        rspsbCmplOgnDcd: rspsbCmplOgnDcd,
        sccoCrno: sccoCrno,
        dbtNnfDutyDcd: dbtNnfDutyDcd,
        cmplExptDt: cmplExptDt,
        isttNm: isttNm,
        dmgRprtnMxExtnt: dmgRprtnMxExtnt,
        rnmCnfmNo: rnmCnfmNo,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/registCmplInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "책임준공기관정보 저장하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getCmplInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "책임준공기관정보 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 책임준공기관정보 제거
  function tab8BtnDelete() {
    var dealNo = $("#TB04010S_selectedDealNo").val(); // IBDEAL번호
    var mtrDcd = $("#TB04010S_L007").val(); // 부수안건
    var jdgmDcd = $("#TB04010S_R014").val(); // 리스크심사구분
    var sn = Number($("#TB04010S_tab8_sn").val()); // 일련번호

    var option = {};
    option.title = "Warning";
    option.type = "warning";

    if (isEmpty(dealNo)) {
      option.text = "Deal 정보를 조회해주세요.";
      openPopup(option);
      return false;
    }

    if (sn == 0) {
      option.text = "책임준공기관정보를 선택해주세요.";
      openPopup(option);
      return false;
    }

    businessFunction();

    function businessFunction() {
      var paramData = {
        dealNo: dealNo,
        mtrDcd: mtrDcd,
        jdgmDcd: jdgmDcd,
        sn: sn,
      };

      $.ajax({
        type: "POST",
        url: "/TB04010S/deleteCmplInfo",
        data: paramData,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "책임준공기관정보 삭제하였습니다.",
            confirmButtonText: "확인",
          }).then((result) => {
            getCmplInfo(dealNo, mtrDcd, jdgmDcd);
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "책임준공기관정보 삭제하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  function setTab1Radio() {
    $("input[name='TB04010S_esgYn']").on("change", function () {
      var useYn1 = $("input[name=TB04010S_esgYn]:checked").val();

      $("#TB04013P_esgRiskInspctTrgtDcd").val(useYn1).prop("selected", true);

      if (useYn1 == "Y") {
        $("#TB04010S_R005").prop("disabled", false);
        $("#TB04010S_R005_2").prop("disabled", false);
        $("#TB04013P_R005").prop("disabled", false);
        $("#TB04013P_R005_2").prop("disabled", false);
      } else {
        $("#TB04010S_R005").prop("disabled", true);
        $("#TB04010S_R005_2").prop("disabled", true);
        $("#TB04013P_R005").prop("disabled", true);
        $("#TB04013P_R005_2").prop("disabled", true);
      }
    });

    $("#TB04013P_esgRiskInspctTrgtDcd").on("change", function () {
      var useYn1 = $("#TB04013P_esgRiskInspctTrgtDcd").val();

      $(":radio[name='TB04010S_esgYn']").radioSelect(useYn1);

      if (useYn1 == "Y") {
        $("#TB04010S_R005").prop("disabled", false);
        $("#TB04010S_R005_2").prop("disabled", false);
        $("#TB04013P_R005").prop("disabled", false);
        $("#TB04013P_R005_2").prop("disabled", false);
      } else {
        $("#TB04010S_R005").prop("disabled", true);
        $("#TB04010S_R005_2").prop("disabled", true);
        $("#TB04013P_R005").prop("disabled", true);
        $("#TB04013P_R005_2").prop("disabled", true);
      }
    });

    $("#TB04010S_R005").on("change", function () {
      var value = $("#TB04010S_R005").val();

      $("#TB04013P_R005").val(value).prop("selected", true);
    });

    $("#TB04010S_R005_2").on("change", function () {
      var value = $("#TB04010S_R005_2").val();

      $("#TB04013P_R005_2").val(value).prop("selected", true);
    });

    $("#TB04013P_R005").on("change", function () {
      var value = $("#TB04013P_R005").val();

      $("#TB04010S_R005").val(value).prop("selected", true);
    });

    $("#TB04013P_R005_2").on("change", function () {
      var value = $("#TB04013P_R005_2").val();

      $("#TB04010S_R005_2").val(value).prop("selected", true);
    });
  }

  /* ***********************************그리드 컬럼******************************** */

  // 안건구조 탭 그리드
  let colDealListInfo = [
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      halign: "center",
      align: "center",
      width: "15%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "부수안건정보코드",
      dataType: "string",
      dataIndx: "mtrDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "부수안건",
      dataType: "string",
      dataIndx: "mtrDcdNm",
      halign: "center",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "stirng",
      dataIndx: "mtrNm",
      halign: "center",
      align: "left",
      width: "40%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신규/재부의정보코드",
      dataType: "string",
      dataIndx: "jdgmDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "신규구분",
      dataType: "string",
      dataIndx: "jdgmDcdNm",
      halign: "center",
      align: "center",
      width: "11%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "진행상태코드",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "안건진행상태",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcdNm",
      halign: "center",
      align: "center",
      width: "12%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사역",
      dataType: "string",
      dataIndx: "ownPNm",
      halign: "center",
      align: "center",
      width: "12",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.cellData == null ? "미지정" : ui.cellData;
      },
    },
    {
      title: "심사역사번",
      dataType: "string",
      dataIndx: "ownPEno",
      halign: "center",
      align: "center",
      width: "6%",
      hidden: true,
    },
  ];

  // 관련문서 탭 그리드
  let colDocInfo = [
    {
      title: "문서번호",
      dataType: "string",
      dataIndx: "dcmNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "최종문서여부",
      dataType: "string",
      dataIndx: "lastDcmYn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "비고",
      dataType: "string",
      dataIndx: "rm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "일련번호",
      dataType: "integer",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];
  // (보증) 기초자산 탭 그리드
  let colAssetInfo = [
    {
      title: "기초자산종류",
      dataType: "string",
      dataIndx: "bssAsstKndCdNm",
      halign: "center",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기초자산종류코드",
      dataType: "string",
      dataIndx: "bssAsstKndCd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "기초자산내용",
      dataType: "string",
      dataIndx: "bscAstsCnts",
      halign: "center",
      align: "left",
      width: "25%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실명확인번호",
      dataType: "string",
      dataIndx: "rnmCnfmNo",
      halign: "center",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "기초자산발행법인등록번호",
      dataType: "string",
      dataIndx: "bssAsstIsuCrno",
      halign: "center",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "법인명",
      dataType: "string",
      dataIndx: "crpNm",
      halign: "center",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자통화",
      dataType: "string",
      dataIndx: "invstCrryCd",
      halign: "center",
      align: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기초자산평가액",
      dataType: "integer",
      dataIndx: "crryAmt",
      halign: "center",
      align: "right",
      width: "10%",
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
      title: "환율",
      dataType: "stirng",
      dataIndx: "aplyExrt",
      halign: "center",
      align: "right",
      width: "5%",
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
      title: "시가평가금액(원)",
      dataType: "integer",
      dataIndx: "crevAmt",
      halign: "center",
      align: "right",
      width: "10%",
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
      title: "일련번호",
      dataType: "integer",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  // 거래상대방 탭 그리드
  let colCncCmpnyInfo = [
    {
      title: "형태",
      dataType: "string",
      dataIndx: "crpShpDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법인형태구분코드",
      dataType: "string",
      dataIndx: "crpShpDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "법인명",
      dataType: "string",
      dataIndx: "crpNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법인번호",
      dataType: "string",
      dataIndx: "crno",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "사업자등록번호",
      dataType: "string",
      dataIndx: "rnmCnfmNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "최대주주명",
      dataType: "string",
      dataIndx: "mxmSthdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "최대주주명",
      dataType: "interger",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  let colInsGrdInfo = [
    {
      title: "SL대상여부",
      dataType: "string",
      dataIndx: "spcltFncTrgtYn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "내부등급대상여부",
      dataType: "string",
      dataIndx: "insGrdTrgtYn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "SL번호",
      dataType: "string",
      dataIndx: "spcltFncMngNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "외부신용등급(SL내부등급)코드",
      dataType: "string",
      dataIndx: "outsCrdtGrdDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "외부신용등급(SL내부등급)",
      dataType: "string",
      dataIndx: "outsCrdtGrdDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "차주법인번호",
      dataType: "integer",
      dataIndx: "brwrCrno",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "내부신용등급구분코드",
      dataType: "string",
      dataIndx: "insCrdtGrdDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "내부신용등급구분코드명",
      dataType: "string",
      dataIndx: "insCrdtGrdDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사업자등록번호",
      dataType: "string",
      dataIndx: "rnmCnfmNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "한글법인명",
      dataType: "string",
      dataIndx: "entpHnglNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "integer",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  let colMrtgInfo = [
    {
      title: "담보유형코드",
      dataType: "string",
      dataIndx: "mrtgKndDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "담보유형",
      dataType: "string",
      dataIndx: "mrtgKndDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담보상세코드",
      dataType: "string",
      dataIndx: "mrtgDtlsDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "담보상세",
      dataType: "string",
      dataIndx: "mrtgDtlsDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담보명",
      dataType: "string",
      dataIndx: "mrtgRsnCnts",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권리순위코드",
      dataType: "string",
      dataIndx: "rgtRnkDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "권리순위",
      dataType: "string",
      dataIndx: "rgtRnkDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "투자통화금액코드",
      dataType: "string",
      dataIndx: "invstCrryCd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "투자통화",
      dataType: "string",
      dataIndx: "invstCrryCdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "환율",
      dataType: "integer",
      dataIndx: "aplyExrt",
      halign: "center",
      align: "right",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담보평가액(통화금액)",
      dataType: "integer",
      dataIndx: "crryAmt",
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
      title: "담보평가액(원)",
      dataType: "integer",
      dataIndx: "mrtgEvlAmt",
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
      title: "담보취득방식코드",
      dataType: "string",
      dataIndx: "ownPNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "담보취득방식",
      dataType: "string",
      dataIndx: "mrtgAcqstStmDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담보취득방식상세코드",
      dataType: "string",
      dataIndx: "mrtgAcqstDtlsDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "담보취득방식상세",
      dataType: "string",
      dataIndx: "mrtgAcqstDtlsDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "integer",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  let colEnsrInfo = [
    {
      title: "신용보강보증구분코드",
      dataType: "string",
      dataIndx: "crdtRifcGrteDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신용보강보증구분",
      dataType: "string",
      dataIndx: "crdtRifcGrteDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "법인번호",
      dataType: "integer",
      dataIndx: "grteIsttCrno",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "사업자등록번호",
      dataType: "integer",
      dataIndx: "rnmCnfmNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "기관명",
      dataType: "string",
      dataIndx: "grteIsttNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "보증금액",
      dataType: "integer",
      dataIndx: "grteAmt",
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
      title: "보증내용",
      dataType: "string",
      dataIndx: "grteCtns",
      halign: "center",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "일련번호",
      dataType: "integer",
      dataIndx: "sn",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
  ];

  let colCmplInfo = [
    {
      title: "책임준공기관구분코드",
      dataType: "string",
      dataIndx: "rspsbCmplOgnDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "책임준공기관구분",
      dataType: "string",
      dataIndx: "rspsbCmplOgnDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법인번호",
      dataType: "string",
      dataIndx: "sccoCrno",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "사업자등록번호",
      dataType: "string",
      dataIndx: "rnmCnfmNo",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          return checkBrnAcno(cellData);
        }
        return cellData;
      },
    },
    {
      title: "법인명",
      dataType: "string",
      dataIndx: "isttNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "미이행시의무코드",
      dataType: "string",
      dataIndx: "dbtNnfDutyDcd",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      hidden: true,
    },
    {
      title: "미이행시의무",
      dataType: "string",
      dataIndx: "dbtNnfDutyDcdNm",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "손해배상최대범위",
      dataType: "integer",
      dataIndx: "dmgRprtnMxExtnt",
      halign: "center",
      align: "right",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData !== null && cellData !== undefined) {
          addComma(cellData);
        }
        return cellData;
      },
    },
    {
      title: "준공예정일자",
      dataType: "string",
      dataIndx: "cmplExptDt",
      halign: "center",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length !== 0) {
          let rgstDt1 = cellData.substring(0, 4);
          let rgstDt2 = cellData.substring(4, 6);
          let rgstDt3 = cellData.substring(6, 8);
          return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
        }
        return cellData;
      },
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

  // tabGrid settings
  function setDocInfoGrid() {
    //setTimeout(() => arrPqGridDocInfo.refresh(), 1);
    //if (arrPqGridDocInfo && arrPqGridDocInfo.refresh) {
    //	setTimeout(() => arrPqGridDocInfo.refresh(), 1);
    //} else {
    //	console.error("arrPqGridDocInfo가 정의되지 않았습니다.");
    //}
  }
  function setAssetInfoGrid() {
    setTimeout(() => arrPqGridAssetInfo.refresh(), 1);
  }
  function setCncCmpnyInfoGrid() {
    setTimeout(() => arrPqGridCncCmpnyInfo.refresh(), 1);
  }
  function setInsGrdInfoGrid() {
    setTimeout(() => arrPqGridInsGrdInfo.refresh(), 1);
  }
  function setMrtgInfoGrid() {
    setTimeout(() => arrPqGridMrtgInfo.refresh(), 1);
  }
  function setEnsrInfoGrid() {
    setTimeout(() => arrPqGridEnsrInfo.refresh(), 1);
  }
  function setCmplInfoGrid() {
    setTimeout(() => arrPqGridCmplInfo.refresh(), 1);
  }

  return {
    //	전역변수
    ldvdCd: ldvdCd,
    mdvdCd: mdvdCd,
    sdvdCd: sdvdCd,
    sameYn: sameYn,

    //	함수
    getDealList: getDealList,
    btnReset: btnReset,
    deleteDealInfo: deleteDealInfo,
    assesmentRequest: assesmentRequest,
    setDocInfoGrid: setDocInfoGrid,
    setAssetInfoGrid: setAssetInfoGrid,
    setCncCmpnyInfoGrid: setCncCmpnyInfoGrid,
    setInsGrdInfoGrid: setInsGrdInfoGrid,
    setMrtgInfoGrid: setMrtgInfoGrid,
    setEnsrInfoGrid: setEnsrInfoGrid,
    setCmplInfoGrid: setCmplInfoGrid,
    fltrBtn: fltrBtn,
    filterSelectBox: filterSelectBox,
    tab1reset: tab1reset,
    tab1save: tab1save,
    tab3BtnReset: tab3BtnReset,
    tab3BtnDelete: tab3BtnDelete,
    tab3BtnSave: tab3BtnSave,
    tab4BtnReset: tab4BtnReset,
    tab4BtnDelete: tab4BtnDelete,
    tab4BtnSave: tab4BtnSave,
    tab5BtnReset: tab5BtnReset,
    tab5BtnDelete: tab5BtnDelete,
    tab5BtnSave: tab5BtnSave,
    tab6BtnReset: tab6BtnReset,
    tab6BtnDelete: tab6BtnDelete,
    tab6BtnSave: tab6BtnSave,
    tab7BtnReset: tab7BtnReset,
    tab7BtnDelete: tab7BtnDelete,
    tab7BtnSave: tab7BtnSave,
    tab8BtnReset: tab8BtnReset,
    tab8BtnDelete: tab8BtnDelete,
    tab8BtnSave: tab8BtnSave,
    setMtrtDt: setMtrtDt,
    getUrlDealInfo: getUrlDealInfo,
    formatPerInput: formatPerInput,
  };
})();
