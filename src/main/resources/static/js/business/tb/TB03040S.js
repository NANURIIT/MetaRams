const TB03040Sjs = (function(){
  let pqGridObjEnopList;

  $(document).ready(function () {

    $('#TB03040S_fromDate').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_toDate').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_ibDealNo').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_ibDealNm').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_1_empNo').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_1_empNm').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_2_dprtNm').on('input', function () { resetPGgrids("TB03040S"); })
    $('#TB03040S_2_dprtCd').on('input', function () { resetPGgrids("TB03040S"); })

    sltctBoxSet();

    // 1개월전 ~ 오늘일자 디폴트 세팅
    $("#TB03040S_fromDate").val(addMonth(getToday(), -1));
    $("#TB03040S_toDate").val(getToday());
    let arrPqGridObj = [
      {
        height: 500,
        maxHeight: 500,
        id: "TB03040S_gridDealList",
        colModel: colDealList,
      },
    ];
    setPqGrid(arrPqGridObj);
    pqGridObjEnopList = $("#TB03040S_gridDealList").pqGrid("instance");

    //기간검색 유효성 검사 함수
    chkValFromToDt("TB03040S_fromDate","TB03040S_toDate");
  });

  //selectBox 세팅
  function sltctBoxSet(){
    let selectBox = getSelectBoxList(
			"TB03040S",
			"D010",   //부서코드
			false
		);

    let TB03040S_dprtSelect;

		TB03040S_dprtSelect = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "D010";
		})

		let D010html;

		TB03040S_dprtSelect.forEach((item) => {
			D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});

		$("#TB03040S_2_dprtNm").append(D010html);

		$('#TB03040S_2_dprtNm').on('change', function() {
			$('#TB03040S_2_dprtCd').val($('#TB03040S_2_dprtNm').val())
		});

    setFormElementsStateByUserRole();
  }

  // 유효성 검사용 날짜패턴
  var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  function ibSpecSearch() {
    let TB03040S_fromDate = $("#TB03040S_fromDate").val(); // 조회시작일자
    let TB03040S_toDate = $("#TB03040S_toDate").val(); // 조회종료일자
    let msgError = "";

    if (isEmpty(TB03040S_fromDate)) {
      msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
      alertPopup();
    } else if (!pattern.test(TB03040S_fromDate)) {
      msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
      alertPopup();
    } else if (isEmpty(TB03040S_toDate)) {
      msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
      alertPopup();
    } else if (!pattern.test(TB03040S_toDate)) {
      msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
      alertPopup();
    } else if (TB03040S_fromDate > TB03040S_toDate) {
      msgError = "조회시작일자가 조회종료일자보다 큽니다.";
      alertPopup();
    } else {
      businessFunction();
    }

    function alertPopup() {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: msgError,
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inParam = {
        dealNm: $("#TB03040S_ibDealNm").val(),
        dealNo: $("#TB03040S_ibDealNo").val(),
        //	"inqDvsn": $('#TB03040S_inqDvsn').val(),
        start: $("#TB03040S_fromDate").val().replaceAll("-", ""),
        end: $("#TB03040S_toDate").val().replaceAll("-", ""),
        chrrEmpno :$("#TB03040S_1_empNo").val(),
        mngmBdcd : $("#TB03040S_2_dprtCd").val(),
      };

      $.ajax({
        type: "GET",
        url: "/TB03040S/ibSpecSearch",
        data: inParam,
        dataType: "json",
        success: function (data) {
          pqGridObjEnopList.setData(data);
          pqGridObjEnopList.option("rowDblClick", function (event, ui) {
            movePage(ui.rowData);
          });
		  pqGridObjEnopList.option("rowClick", function (event, ui) {
            pqGridSelectHandler ( ui.rowIndx, "TB03040S_gridDealList" );
          });
        },
      });
    }
  }

  /* 더블클릭 했을시 이동*/
  function movePage(e) {

    var inspctPrgrsStCd = e.mtrPrgSttsDcd;

    sessionStorage.setItem("dealNo", e.dealNo);
    sessionStorage.setItem("dealNm", e.dealNm);

    // alert(inspctPrgrsStCd);

    if(inspctPrgrsStCd === "101"){
      callPage("TB03020S", "Deal정보 등록");
    }else if (inspctPrgrsStCd < 301) {
      callPage("TB04010S", "심사신청관리");
    } else {
      callPage('TB05040S', '협의체 현황 및 결과조회');
    }
  }

  /**
   * reset
   */
  function reset () {
    $("#TB03040S_fromDate").val(addMonth(getToday(), -1));
    $("#TB03040S_toDate").val(getToday());
    $('#TB03040S_ibDealNo').val("")
    $('#TB03040S_ibDealNm').val("")
    $('#TB03040S_1_empNo').val($('#userEno').val())
    $('#TB03040S_1_empNm').val($('#userEmpNm').val())
    $('#TB03040S_2_dprtNm').val($('#userDprtCd').val())
    $('#TB03040S_2_dprtCd').val($('#userDprtCd').val())
    resetPGgrids("TB03040S")
  }

  //담당자명 변경시 담당자번호 클리어
  $("#TB03040S_1_empNm").on('input', function(){
    $('#TB03040S_1_empNo').val("");  
  });

  //부서명 변경시 부서번호 클리어
  $("#TB03040S_2_dprtNm").on('input', function(){
    $('#TB03040S_2_dprtCd').val("");  
  });

  /**
   * 로그인한 사용자의 권한에 따라 담당자번호 ,부서번호 비활성화 상태 조정
   * 권한 조건은 미정이며,
   * 현재는 로그인한 사원의 정보가 설정된 후, 관련 필드를 비활성화 상태로 설정
   */
  function setFormElementsStateByUserRole(){
    let empNo  = $('#userEno').val();   
    let empNm  = $('#userEmpNm').val();
    let dprtCd = $('#userDprtCd').val();
    let dprtNm = $('#userDprtNm').val();

    //로그인한 사원 정보 세팅 
    $('#TB03040S_1_empNo').val(empNo);
    $('#TB03040S_1_empNm').val(empNm);
    $('#TB03040S_2_dprtCd').val(dprtCd);
    $('#TB03040S_2_dprtNm').val(dprtCd);
    
    //if(){ //권환에 따른 조건 필요 
  
    //} else{
      // $('#TB03040S_1_empNo').prop('disabled', true);    //담당자번호
      // $('#empNoSearch').prop("disabled", true);         //담당자 검색 버튼
      // $('#TB03040S_2_dprtCd').prop('disabled', true);   //부서번호
      // $('#dprtCdSearch').prop("disabled", true);        //부서 검색 버튼
    //}
  }


  /* ***********************************그리드 컬럼******************************** */
  let colDealList = [
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm",
      halign: "center",
      align: "left",
    },
    {
      title: "Deal 생성일자",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
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
      title: "부서코드",
      dataType: "string",
      dataIndx: "mngmBdcd",
      halign: "center",
      align: "center",
      hidden: true,
    },
    {
      title: "부서명",
      dataType: "string",
      dataIndx: "mngmBdcdNm",
      halign: "center",
      align: "center",
    },
    {
      title: "담당자사번",
      dataType: "string",
      dataIndx: "chrrEmpno",
      halign: "center",
      align: "center",
      hidden: true,
    },
    {
      title: "담당자명",
      dataType: "string",
      dataIndx: "chrrEmpnm",
      halign: "center",
      align: "center",
    },
    {
      title: "진행상태구분코드",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcd",
      align: "center",
      // hidden: true,
    },
    {
      title: "진행상태",
      dataType: "string",
      dataIndx: "mtrPrgSttsDcdNm",
      halign: "center",
    },
  ];
  
  return{
    //  함수
    ibSpecSearch : ibSpecSearch,
    reset: reset,
  }
})();

