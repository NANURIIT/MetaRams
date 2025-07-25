const TB09010Sjs = (function () {
  let colM_TB09010S = [
    // {
    // 	title: "",
    // 	align: "center",
    // 	colModel: [
    {
      title: "기준일자",
      dataType: "string",
      dataIndx: "stdrDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        var cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          var year = cellData.substring(0, 4);
          var month = cellData.substring(4, 6);
          var day = cellData.substring(6, 8);
          return year + "-" + month + "-" + day;
        }
        return cellData;
      },
    },
    {
      title: "기업명",
      dataType: "string",
      dataIndx: "entpNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "대표자",
      dataType: "string",
      dataIndx: "rprstPHnglNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법인등록번호",
      dataType: "string",
      dataIndx: "crno",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신용사건발생사유",
      dataType: "string",
      dataIndx: "crdtAcdntOcrncDtls",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "안건명",
      dataType: "string",
      dataIndx: "mtrNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "심사부서",
      dataType: "string",
      dataIndx: "inspctDprtDcdNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "변경담당자",
      dataType: "string",
      dataIndx: "empNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    //]
    // },

    {
      title: "확인일",
      align: "center",
      colModel: [
        {
          title: "심사역",
          dataType: "string",
          dataIndx: "fstCnfrDt",
          width: "",
          align: "center",
          filter: { crules: [{ condition: "range" }] },
          render: function (ui) {
            var cellData = ui.cellData;
            if (cellData && cellData.length === 8) {
              var year = cellData.substring(0, 4);
              var month = cellData.substring(4, 6);
              var day = cellData.substring(6, 8);
              return year + "-" + month + "-" + day;
            }
            return cellData;
          },
        },
        {
          title: "심사부서장",
          dataType: "string",
          dataIndx: "ansAcptDt",
          width: "",
          align: "center",
          filter: { crules: [{ condition: "range" }] },
          render: function (ui) {
            var cellData = ui.cellData;
            if (cellData && cellData.length === 8) {
              var year = cellData.substring(0, 4);
              var month = cellData.substring(4, 6);
              var day = cellData.substring(6, 8);
              return year + "-" + month + "-" + day;
            }
            return cellData;
          },
        },
      ],
    },
    {
      title: "",
      dataType: "string",
      dataIndx: "jdgmDcd",
      hidden: true,
    },
    {
      title: "",
      dataType: "string",
      dataIndx: "mtrDcd", 
      hidden: true,
    },
    {
      title: "",
      dataType: "string",
      dataIndx: "inspctDprtDcd",
      hidden: true,
    },
    {
      title: "",
      dataType: "string",
      dataIndx: "ownPEno",
      hidden: true,
    },
    {
      title: "",
      dataType: "string",
      dataIndx: "ivtgRsltCtns",
      hidden: true,
    },
  ];

  $(document).ready(function () {
    setKeyFunction_TB09010S();
    // setRsltnDt();
    getSelectBoxList("TB09010S", "I010");
    chkUserAtc();
    setGrid_TB09010S();
    resetAll();

    // 조회조건 수정시 초기화
    $("#TB09010S_conSrch").find('input, select').on('input', function () {
      resetContents()
    })
  });

  function chkUserAtc(){
    
    $("#TB09010S_athCd").val("");

		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function(data) {
				var athCd = data.athCd;

        $("#TB09010S_athCd").val(athCd);
        if(athCd == "AG21" || athCd == "AG28"){
          $('div[data-menuid="/TB09010S"] #assesmentRequest').attr("disabled", false);
        }else{
          $('div[data-menuid="/TB09010S"] #assesmentRequest').attr("disabled", true);
        }
			}
		});
  }

  function setGrid_TB09010S() {
    var obj = {
      height: 190,
      maxHeight: 190,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      editable: false,
      wrap: false,
      rowSpanHead: true,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      columnTemplate: { align: "center", hvalign: "center" },
      //toolbar: toolbar_TB09010,
      colModel: colM_TB09010S,
      strNoRows: "조회된 데이터가 없습니다.",
      rowClick: function (event, ui) {
		  pqGridSelectHandler ( ui.rowIndx, "TB09010S_DealList" );
        var rowData = ui.rowData;

        setDealInfo(rowData);
      },
      //pageModel: pageModel_TB04060S
    };

    $("#TB09010S_DealList").pqGrid(obj);
  }

  // 엔터키 검색 function 세팅
  function setKeyFunction_TB09010S() {
    $("input[id=TB09010S_stdDt]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
    $("input[id=TB09010S_empno]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
    $("input[id=TB09010S_empNm]").keyup(function (key) {
      if (key.keyCode == 13) {
        checkDealSearch();
      }
    });
  }

  // 금일 날짜 세팅
  function setRsltnDt() {
    $("#TB09010S_stdDt").val(getToday());
  }

  // 조회
  function checkDealSearch() {
    var TB09010S_stdDt = $("#TB09010S_stdDt").val().replaceAll("-","");
    var TB09010S_empno = $("#TB09010S_empNo").val();
    var TB09010S_I010 = $("#TB09010S_I010").val();
    var checked = "N";

    if ($("#TB09010S_checked").is(":checked")) {
      checked = "Y";
    }

    businessFunction();
    /*
	if(!isEmpty(TB09010S_stdDt)){
		if(!isEmpty(TB09010S_empno)){
			
		} else {
			Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "심사역을 입력해 주세요."
			, confirmButtonText: "확인"
			})
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "기준일자를 입력해 주세요."
			, confirmButtonText: "확인"
		});
	}
*/
    function businessFunction() {
      var dtoParam = {
        stdrDt: TB09010S_stdDt,
        empno: TB09010S_empno,
        inspctDprtDcd: TB09010S_I010,
        checked: checked,
      };

      $.ajax({
        type: "GET",
        url: "/TB09010S/checkDealSearch",
        data: dtoParam,
        dataType: "json",
        beforeSend: function () {
          //$("#TB09010S_DealList").pqGrid("setData", []);

          $("#TB09010S_DealList").pqGrid(
            "option",
            "strNoRows",
            "조회 중입니다..."
          );
        },
        success: function (data) {

          //console.log(JSON.stringify(data));
          //console.log(data);
          if (data.length > 0) {
            $("#TB09010S_DealList").pqGrid(
              "option",
              "strNoRows",
              "데이터가 없습니다."
            );
            
            $("#TB09010S_DealList").pqGrid("setData", data);
            $("#TB09010S_DealList").pqGrid("refreshDataAndView");
          } else {
             $("#TB09010S_DealList").pqGrid(
               "option",
               "strNoRows",
               "데이터가 없습니다."
             );
            // console.log("AlertTest");        
              Swal.fire({
                icon: "warning",
                title: "Waring!",
                text: "데이터가 없습니다!",
              });
              $("#TB09010S_DealList").pqGrid("setData", []);
              $("#TB09010S_DealList").pqGrid("refreshDataAndView");

         
          }
        },
      });
    }
  }

  /**
   * 더블클릭시
   */
  function setDealInfo(rowData) {
    var stdrDt = rowData.stdrDt; // 기준일자
    var dealNo = rowData.dealNo; // IBDEALNO
    var mtrNm = rowData.mtrNm; // IBDEAL명(안건명)
    var empNm = rowData.empNm; // 담당심사역

    var jdgmDcd = rowData.jdgmDcd; // 리스크심사구분코드
    var mtrDcd = rowData.mtrDcd; // 부수안건구분코드
    var inspctDprtDcd = rowData.inspctDprtDcd; // 심사부서구분코드
    var ownPEno = rowData.ownPEno; // 사원번호

    var ivtgRsltCtns = rowData.ivtgRsltCtns; // 조치내용
    var crno = rowData.crno; // 법인등록번호

    $("#TB09010S_selectedStdDt").val(stdrDt);
    $("#TB09010S_selectedIbDealNo").val(dealNo);
    $("#TB09010S_selectedIbDealNm").val(mtrNm);
    $("#TB09010S_selectedEmpNm").val(empNm);

    $("#TB09010S_riskInspctCcd").val(jdgmDcd);
    $("#TB09010S_lstCCaseCcd").val(mtrDcd);
    $("#TB09010S_I010").val(inspctDprtDcd);
    $("#TB09010S_ownPEno").val(ownPEno);

    $("#TB09010S_exmntRsltCntnt").val(ivtgRsltCtns);
    $("#TB09010S_crno").val(crno);
    
    $("#TB09010S_DealList tr").removeClass("table-active");
    // 클릭한 행에 active 클래스 추가
    $(this).addClass("table-active");
  }

  function saveDealExmnt() {
    var dealNo = $("#TB09010S_selectedIbDealNo").val();
    var jdgmDcd = $("#TB09010S_riskInspctCcd").val();
    var mtrDcd = $("#TB09010S_lstCCaseCcd").val();
    var ivtgRsltCtns = $("#TB09010S_exmntRsltCntnt").val();
    var stdrDt = $("#TB09010S_selectedStdDt").val();
    var crno = $("#TB09010S_crno").val(); // 법인등록번호
    var athCd = $("#TB09010S_athCd").val(); // 권한코드

    // TODO: 권한정보 취득하여 심사역/심사부서장 별 확인사항 업데이트 필요

    if (!isEmpty(ivtgRsltCtns)) {
      if (!isEmpty(dealNo)) {
        businessFunction();
      } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal을 선택해주세요.",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "조치사항을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var dtoParam = {
        dealNo: dealNo,
        stdrDt: stdrDt,
        ivtgRsltCtns: ivtgRsltCtns,
        jdgmDcd: jdgmDcd,
        mtrDcd: mtrDcd,
        crno: crno,
        athCd: athCd,
      };

      $.ajax({
        type: "GET",
        url: "/TB09010S/saveDealExmnt",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          if (data > 0) {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "조치사항을 저장하였습니다.",
              confirmButtonText: "확인",
            }).then((result) => {
              //location.reload();
              resetContents();
              checkDealSearch();  // 재조회
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "조치사항을 저장하는데 실패하였습니다.",
              confirmButtonText: "확인",
            });
          }
        },

   			//ERROR
  			error: handleAjaxError
      });
    }
  }

  /**
   * 내용 초기화
   */
  function resetContents() {
    // 입력사항 초기화
    $("#TB09010S_selectedIbDealNo").val("");
    $("#TB09010S_selectedIbDealNm").val("");
    $("#TB09010S_selectedEmpNm").val("");
    $("#TB09010S_exmntRsltCntnt").val("");
    
    // 그리드 초기화
    resetPGgrids("TB09010S");
  }

  /**
   * 전체 초기화
   */
  function resetAll() {
    // 금일 날짜로 초기화
    setRsltnDt();

    // 조회조건 초기화
    $('#TB09010S_I010').val("");
    $('#TB09010S_empNo').val("");
    $('#TB09010S_empNm').val("");

    // 내용 초기화
    resetContents();
  }

  return {
    checkDealSearch: checkDealSearch,
    saveDealExmnt: saveDealExmnt,
    resetContents: resetContents,
    resetAll: resetAll,
  };
})();
