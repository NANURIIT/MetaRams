/**
 * 입금내역조회
 * 조회조건 주의사항
 * 1. 상환구분
 * 1-1. 원리금 : 원금, 이자
 * 1-2. 원금
 * 1-3. 수수료
 * 1-4. 이자
 */
const TB07170Sjs = (function () {
  let TB07170S_rowIndx;
  let TB07170S_pqGridLength = 0;
  let TB07170S_rowData = {};

  let selectBoxList;

  let dprtList = {}; //부서코드
  let rdptObjtDvsnCdList = {}; //상환대상구분코드
  let fndsDcdList = {}; //자금구분코드

  const TB07170S_dummyData = TB07170S_rowData;

  $(document).ready(function () {
    $("#TB07170S_rctmDt").val(getToday()); //입금일자

    selectBoxSet_TB07170S();
    getDealInfoFromWF();
  });

  function selectBoxSet_TB07170S() {
    selectBox = getSelectBoxList("TB07170S", "D010/F008/R038", false);

    dprtList = selectBox.filter(function (item) {
      //부서코드 list
      return item.cmnsGrpCd === "D010";
    });

    fndsDcdList = selectBox.filter(function (item) {
      //자금구분코드 list
      return item.cmnsGrpCd === "F008";
    });

    rdptObjtDvsnCdList = selectBox.filter(function (item) {
      //상환대상구분코드 list
      return item.cmnsGrpCd === "R038";
    });

    dprtList.forEach((item) => {
      $("#TB07170S_dprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );
    });

    TB07170S_pqGrid();
  }

  $("#TB07170S_dprtNm").on("change", function () {
    var dprtCd = $(this).val();

    $("#TB07170S_dprtCd").val(dprtCd);
  });

  /*
   *	pqGrid colmodel
   */
  function TB07170S_setColModel() {
    const TB07170S_colModel = [
      {
        title: "입금일자",
        dataType: "string",
        width: "180",
        dataIndx: "rctmDt",
        halign: "center",
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
        title: "Deal번호",
        dataType: "string",
        width: "180",
        dataIndx: "dealNo",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "관리부서",
        dataType: "string",
        width: "180",
        dataIndx: "mngmBdcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "자금구분",
        dataType: "string",
        width: "180",
        dataIndx: "fndsDvsnCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = fndsDcdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "상환대상",
        dataType: "string",
        width: "180",
        dataIndx: "rdptObjtDvsnCd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = rdptObjtDvsnCdList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "입금금액",
        dataType: "integer",
        format: "#,###",
        width: "180",
        dataIndx: "dealRctmAmt",
        align: "right",
        halign: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이체기관",
        dataType: "string",
        width: "180",
        dataIndx: "reltIsttNm",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계좌번호",
        dataType: "string",
        width: "180",
        dataIndx: "reltBano",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "초과납입금액",
        dataType: "integer",
        format: "#,###",
        width: "180",
        dataIndx: "dealExcsPymtAmt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "입금자명",
        dataType: "string",
        width: "180",
        dataIndx: "dptrNm",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환일자",
        dataType: "string",
        width: "180",
        dataIndx: "rgstBdcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "등록부서",
        dataType: "string",
        width: "180",
        dataIndx: "rgstBdcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          var options = dprtList;
          var option = options.find((opt) => opt.cdValue == ui.cellData);
          return option ? option.cdName : ui.cellData;
        },
      },
      {
        title: "등록자",
        dataType: "string",
        width: "180",
        dataIndx: "rgstEmpnm",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
    ];
    return TB07170S_colModel;
  }

  /*
   *	setPqGrid dataModel and option
   */

  function TB07170S_pqGrid() {
    /********************************************************************
     * PQGrid Column
     ********************************************************************/

    colModel = $("#TB07170S_colModel").pqGrid("instance");

    //if (typeof colModel == "undefined") {
    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 340,
        maxHeight: 340,
        id: "TB07170S_colModel",
        colModel: TB07170S_setColModel(),
        editable: false,
        scrollModel: { autoFit: false },
        selectionModel: { type: "row" },
      },
    ];
    setPqGrid(pqGridObjs);
    colModel = $("#TB07170S_colModel").pqGrid("instance");
  }
  //else {
  //colModel.setData([]);
  //}
  //};

  // function TB07170S_addNewRow() {
  // 	let row = ["순번", "적용개월수(이내)", "중도상환수수율(%)", "구분", "일련번호"]
  // 	let newRow = {
  // 		num: row["순번"]
  // 		, aplyMnum: row["적용개월수(이내)"]
  // 		, mdwyRdmpFeeRto: row["중도상환수수율(%)"]
  // 		, queryType: row["구분"]
  // 		, feeSn: row["일련번호"]
  // 	};
  // 	$("#TB07170S_colModel").pqGrid("addRow", { rowData: newRow, checkEditable: false });
  // 	$("#TB07170S_colModel").pqGrid("refreshDataAndView");
  // }

  // function TB07170S_deleteRow() {
  // 	let getLength = $("#TB07170S_colModel").pqGrid("instance").pdata.length;
  //     if(TB07170S_rowData != TB07170S_dummyData && TB07170S_pqGridLength < getLength && !TB07170S_rowData.feeSn){
  //         $("#TB07170S_colModel").pqGrid("deleteRow", { rowData: TB07170S_rowData, checkEditable: false });
  //         TB07170S_rowData = TB07170S_dummyData;
  //     } else if (TB07170S_rowData === TB07170S_dummyData && TB07170S_pqGridLength < getLength) {
  //         $("#TB07170S_colModel").pqGrid("deleteRow", { rowData: TB07170S_rowData, checkEditable: false });
  //         TB07170S_rowData = TB07170S_dummyData;
  //     } else if (TB07170S_rowData === TB07170S_dummyData && TB07170S_pqGridLength === getLength) {
  //         Swal.fire({
  //             icon: 'warning'
  //             , text: "삭제하실 행을 선택해주세요"
  //             , confirmButtonText: "확인"
  //         });
  //         TB07170S_rowData = TB07170S_dummyData;
  //     } else if (TB07170S_rowData != TB07170S_dummyData) {
  //         Swal.fire({
  //             icon: "warning"
  //             , text: "정말 삭제하시겠습니까?"
  //             , confirmButtonText: "확인"
  //             , denyButtonText: "아니오"
  //             , showDenyButton: true
  //         }). then((result) =>  {
  //             if (result.isConfirmed) {
  //                 deleteIBIMS204B();
  //                 TB07170S_rowData = TB07170S_dummyData;
  //                 return;
  //             } else if (result.isDenied) {
  //                 TB07170S_rowData = TB07170S_dummyData;
  //                 return;
  //             }
  //         })
  //     }
  // }

  function inq() {
    var rctmDt = $("#TB07170S_rctmDt").val(); //입금일자
    var rdptObjtDvsnCd = $("#TB07170S_R038").val(); //상환대상구분코드
    var dealNo = $("#TB07170S_ibDealNo").val(); //딜번호
    var mngmBdcd = $("#TB07170S_dprtCd").val(); //관리부서코드

    var param = {
      rctmDt: rctmDt.replaceAll("-", ""),
      rdptObjtDvsnCd: rdptObjtDvsnCd,
      dealNo: dealNo,
      mngmBdcd: mngmBdcd,
    };

    $.ajax({
      type: "POST",
      url: "/TB07170S/getDptrDtlsList",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(param),
      dataType: "json",
      beforeSend: function () {
        $("#TB07170S_colModel").pqGrid(
          "option",
          "strNoRows",
          "조회 중입니다..."
        );
      },
      success: function (data) {
        if (data.length < 1) {
          var option = {};
          option.title = "Error";
          option.type = "error";

          option.text = "조회된 데이터가 없습니다.";
          openPopup(option);

          $("#TB07170S_colModel").pqGrid(
            "option",
            "strNoRows",
            "조회된 데이터가 없습니다."
          );
          $("#TB07170S_colModel").pqGrid("setData", []);
        } else {
          $("#TB07170S_colModel").pqGrid("setData", data);
        }
      },
    });
  }

  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
			var dealNo = sessionStorage.getItem("wfDealNo");
			var dealNm = sessionStorage.getItem("wfDealNm");
			$("#TB07170S_ibDealNo").val(dealNo);
			$("#TB07170S_ibDealNm").val(dealNm);
      inq();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

  return {
    inq: inq,
    getDealInfoFromWF: getDealInfoFromWF,
  };
})();
