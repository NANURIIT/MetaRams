const TB09050Sjs = (function () {
  $(document).ready(function () {
    pqGrid();
    // $('#disabledView').find('input').prop('disabled', true);
    // fnSelectBox();
    // createOption();
    $("#TB09050S_stdDt").val(getToday());
  });

  /*
   *  =====================PQGRID=====================
   */

  /*
   *  pqGrid colModel
   */
  function TB09050S_colModelData() {
    const TB09050S_colModel = [
      {
        title: "순번",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "업무구분코드",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "DATA구분",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "일련번호",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "집중기관코드",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업자등록번호",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업자등록구분",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "보고서구분",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "과목코드",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "금액(백만)",
        dataType: "string",
        // dataIndx: "aplyStrtDt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    return TB09050S_colModel;
  }

  /*
   *  PQGRID SETTING
   */
  function pqGrid() {
    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 400,
        maxHeight: 400,
        id: "TB09050S_colModel",
        colModel: TB09050S_colModelData(),
        scrollModel: { autoFit: true },
        editable: true,
        // , rowClick: function (event, ui) {
        //     if(TB09050S_rowData === ui.rowData){
        //         TB09050S_rowData = dummyData;
        //     }else {
        //         TB09050S_rowData = ui.rowData;
        //     }
        // }
        selectionModel: { type: "row" },
      },
    ];
    setPqGrid(pqGridObjs);
    $("#TB09050S_colModel").pqGrid("instance");
  }

  /*
   *  ====================PQGRID변환====================
   */

  /*
   *  PQGRID 줄추가
   */
  // function TB09050S_addNewRow() {
  //     let row = [
  //         "시작일자"
  //         , "종료일자"
  //         , "기준금리종류"
  //         , "고정금리"
  //         , "가산금리"
  //         , "변동주기유형"
  //         , "금리변동주기수"
  //         , "적용일수구분"
  //         , "금리적용일수"
  //     ]
  //     let newRow = {
  //         aplyStrtDt: row["시작일자"]
  //         , aplyEndDt: row["종료일자"]
  //         , stdrIntrtKndCd: row["기준금리종류"]
  //         , fxnIntrt: row["고정금리"]
  //         , addIntrt: row["가산금리"]
  //         , intrtCngeFrqcCd: row["변동주기유형"]
  //         , intrtCngeFrqcMnum: row["금리변동주기수"]
  //         , aplyDnumDcd: row["적용일수구분"]
  //         , stdrIntrtAplyDnum: row["금리적용일수"]
  //     };
  //     $("#TB09050S_colModel").pqGrid("addRow", { rowData: newRow, checkEditable: false });
  // }

  /*
   *  PQGRID 줄삭제
   */
  // function TB09050S_deleteRow() {
  //     let getLength = $("#TB09050S_colModel").pqGrid("instance").pdata.length;

  //     if(TB09050S_rowData != dummyData && TB09050S_pqGridLength < getLength && !TB09050S_rowData.excSn){
  //         $("#TB09050S_colModel").pqGrid("deleteRow", { rowData: TB09050S_rowData, checkEditable: false });
  //         TB09050S_rowData = dummyData;
  //     } else if (TB09050S_rowData === dummyData && TB09050S_pqGridLength < getLength) {
  //         $("#TB09050S_colModel").pqGrid("deleteRow", { rowData: TB09050S_rowData, checkEditable: false });
  //         TB09050S_rowData = dummyData;
  //     } else if (TB09050S_rowData === dummyData && TB09050S_pqGridLength === getLength) {
  //         Swal.fire({
  //             icon: 'warning'
  //             , text: "삭제하실 행을 선택해주세요"
  //             , confirmButtonText: "확인"
  //         });
  //         TB09050S_rowData = dummyData;
  //     } else if (TB09050S_rowData != dummyData) {
  //         Swal.fire({
  //             icon: "warning"
  //             , text: "정말 삭제하시겠습니까?"
  //             , confirmButtonText: "확인"
  //             , denyButtonText: "아니오"
  //             , showDenyButton: true
  //         }). then((result) =>  {
  //             if (result.isConfirmed) {
  //                 deleteIBIMS404B();
  //                 TB09050S_rowData = dummyData;
  //                 return;
  //             } else if (result.isDenied) {
  //                 TB09050S_rowData = dummyData;
  //                 return;
  //             }
  //         })
  //     }
  // }

  /*
   *  PQGRID 초기화
   */
  // function TB09050S_resetPqGrid() {
  //     $("#TB09050S_colModel").pqGrid('option', 'dataModel.data', []);
  //     $("#TB09050S_colModel").pqGrid('refreshDataAndView');
  // }

  /*
   *  =====================PQGRID=====================
   */

  return {
    // getSettlementList: getSettlementList,
    // reset_TB08060S: reset_TB08060S,
    // saveSettlement: saveSettlement,
  };
})();
