/**
 * 결재내역조회
 * 
 * 1. 상단 그리드는 반려된 요청내역 나오면 안됨
 * 현재 접속중인 사람이 1.승인요청자 2.결재자 3.승인요청자의 부서장급 이상 인 경우도 조회 가능
 * 
 * 
 * 2. 결재내역 그리드 승인요청 그리드 클릭 시 조회
 */
const TB06080Sjs = (function () {
  let pqGridObjApvlList;
  let pqGridObjGbckList;
  let selectBox;
  let grdSelect = {};
  let grd_TB06080S;
  

  $(document).ready(function () {
    // 공통 코드 불러오기
    fnSelectBox();

    // 공통 코드 html에 셋팅하기
    createSelectTag();

    // 초기값세팅
    $('#decdStepDcd').val('04')

    // PQ Grid
    renderGrid(colApvlList, "gridApvlList");
    renderGrid(colGbckList, "gridGbckList");
  });

  // 그리드 렌더링함수
  function renderGrid(colId, gridId) {
    let pqGridObj = [
      {
        height: 120,
        maxHeight: 120,
        id: gridId,
        colModel: colId,
        scrollModel: { autofit: false },
      },
    ];
    setPqGrid(pqGridObj);
    $("#" + gridId).pqGrid("refreshDataAndView");

    // 인스턴스 할당
    if (gridId == "gridApvlList") {
      pqGridObjApvlList = $("#" + gridId).pqGrid("instance");
    } else if (gridId == "gridGbckList") {
      pqGridObjGbckList = $("#" + gridId).pqGrid("instance");
    }
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  // 조회
  function inqTB06080S() {
    /*let curDate = unformatDate($('#TB10720S_stdrDt').val())*/

    let obj = {
      chrrEno: $("#TB06080S_rspl_empNo").val(),
      apvlRqstPEno: $("#TB06080S_rqst_empNo").val(),
      decdStepDcd: $("#decdStepDcd").val(),
    };

    $.ajax({
      type: "POST",
      url: "/TB06080S/inqTB06080S",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      beforeSend: function (xhr) {
        resetInputValue($(`#TB06080S_resultInputs`));
        resetPGgrids('TB06080S');
        $('#TB06080S_apvlPage').off('click');
      },
      success: function (data) {
        if (data.length > 0) {
          pqGridObjApvlList.setData(data);

          pqGridObjApvlList.on("rowClick", function (evt, ui) {
            // 공통 피큐그리드에서 인풋으로 값 보내기
            setInputboxFromPdata(ui, "TB06080S");
            $("#TB06080S_rqstDtm").val($("#TB06080S_rqstDtm").val().replace('T', ' ').slice(0, 19))
            $("#TB06080S_rqstCnclDtm").val($("#TB06080S_rqstCnclDtm").val().replace('T', ' ').slice(0, 19))

            $('#TB06080S_apvlPage').off('click');
            $('#TB06080S_apvlPage').on('click', function(){
              sessionStorage.setItem("isFromApvl", true);
              sessionStorage.setItem("wfDealNo", ui.rowData.dealNo);
              sessionStorage.setItem("wfDealNm", ui.rowData.dealNm);
              sessionStorage.setItem("wfPrdtCd", ui.rowData.prdtCd);
              sessionStorage.setItem("wfPrdtNm", ui.rowData.prdtNm);
              sessionStorage.setItem("excSeq", ui.rowData.excSeq);
              sessionStorage.setItem("rqstSq", ui.rowData.rqstSq);
              sessionStorage.setItem("trSeq", ui.rowData.trSeq);
              sessionStorage.setItem("decdStepDcd", ui.rowData.decdStepDcd);
              callPage(ui.rowData.scrnNo);
            })

            // 해당 승인요청의 승인자 리스트
            $.ajax({
              type: "POST",
              url: "/TB06080S/dcfcList",
              contentType: "application/json; charset=UTF-8",
              data: JSON.stringify(
                {
                  decdSn: ui.rowData.decdSn
                }
              ),
              dataType: "json",
              beforeSend: function () {
                resetInputValue($(`#TB06080S_dsfcLists`));
              },
              success: function (data) {
                if (data.length > 0) {
                  pqGridObjGbckList.setData(data);
        
                  pqGridObjGbckList.on("rowClick", function (evt, ui) {
                    // 공통 피큐그리드에서 인풋으로 값 보내기
                    setInputboxFromPdata(ui, "TB06080S");
                    $("#TB06080S_decdDtm").val($("#TB06080S_decdDtm").val().replace('T', ' ').slice(0, 19))
                  });
                } else {
                  swal.fire({
                    icon: "warning",
                    text: "조회된 내역이 없습니다.",
                    confirmButtonText: "확인",
                  });
                  return;
                }
              },
            });

          });
        } else {
          swal.fire({
            icon: "warning",
            text: "조회된 내역이 없습니다.",
            confirmButtonText: "확인",
          });
          return;
        }
      },
    });
  }

  /*
   *  =====================OptionBox데이터 SET=====================
   */
  function fnSelectBox() {
    selectBox = getSelectBoxList("TB06080", "/D006" + "/D016" + "/P028", false);
    grdSelect.D006 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D006";
    }); //	결재상태구분코드
    grdSelect.D016 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "D016";
    }); //	결재단계구분코드
    grdSelect.P028 = selectBox.filter(function (item) {
      return item.cmnsGrpCd === "P028";
    }); //	처리결과구분코드
  }

  function createSelectTag() {
    //  결제상태구분코드
    let d006Html = "";
    grdSelect.D006.forEach((item) => {
      d006Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB06080S_decdSttsDcd").append(d006Html);
    //  결제단계구분코드
    let d016Html = "";
    grdSelect.D016.forEach((item) => {
      d016Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $('select[name="TB06080S_decdStepDcd"]').append(d016Html);
    console.log(d016Html);
    
    //  처리결과구분코드
    let p028Html = "";
    grdSelect.P028.forEach((item) => {
      p028Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`;
    });
    $("#TB06080S_prcsRsltDcd").append(p028Html);
  }

  /*
   *  =====================OptionBox데이터 SET=====================
   */

  function formatDateTime(dateString) {
    if (dateString != null) {
      return dateString.replace(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        "$1-$2-$3 $4:$5:$6"
      );
    } else {
      return "-";
    }
  }

  function formatDate(dateString) {
    if (dateString != null) {
      return dateString.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    } else {
      return "-";
    }
  }

  /* ***********************************그리드 컬럼******************************** */

  let colApvlList = [
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "decdStepNm", //코드명으로
      align: "center",
      width: 80,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재상태",
      dataType: "string",
      dataIndx: "decdSttsNm", //코드명으로
      align: "center",
      width: 80,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "종목코드",
      dataType: "string",
      dataIndx: "prdtCd",
      halign: "center",
      align: "center",
      width: 90,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "종목명",
      dataType: "string",
      dataIndx: "prdtNm",
      halign: "center",
      align: "left",
      width: 160,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      halign: "center",
      align: "left",
      width: 160,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm", //딜명가져오기
      halign: "center",
      align: "left",
      width: 160,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실행순번",
      dataType: "integer",
      dataIndx: "excSeq",
      halign: "center",
      align: "right",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신청순번",
      dataType: "integer",
      dataIndx: "rqstSq",
      halign: "center",
      align: "right",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래순번",
      dataType: "integer",
      dataIndx: "trSeq",
      halign: "center",
      align: "right",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "화면번호",
      dataType: "string",
      dataIndx: "scrnNo",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "승인요청내용",
      dataType: "string",
      dataIndx: "apvlRqstCntn",
      align: "center",
      width: 130,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "책임자사번",
      dataType: "string",
      dataIndx: "chrrEno",
      align: "center",
      width: 90,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "책임자",
      dataType: "string",
      dataIndx: "chrrNm", //책임자명
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신청일시",
      dataType: "string",
      dataIndx: "rqstDtm",
      align: "center",
      width: 130,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if(ui.cellData){
          let result = ui.cellData.replace('T', ' ').slice(0, 19);
          return result;
        }
      },
    },
    {
      title: "신청취소일시",
      dataType: "string",
      dataIndx: "rqstCnclDtm",
      align: "center",
      width: 130,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if(ui.cellData){
          let result = ui.cellData.replace('T', ' ').slice(0, 19);
          return result;
        }
      },
    },
    {
      title: "처리결과",
      dataType: "string",
      dataIndx: "prcsRsltNm",
      align: "center",
      width: 80,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "오류내용",
      dataType: "string",
      dataIndx: "errCntn",
      halign: "center",
      align: "left",
      width: 130,
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  // 결재정보
  let colGbckList = [
    {
      title: "결재순번",
      dataType: "integer",
      dataIndx: "decdSq",
      halign: "center",
      align: "right",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재상태",
      dataType: "string",
      dataIndx: "decdSttsNm",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재일시",
      dataType: "string",
      dataIndx: "decdDtm",
      align: "center",
      width: 170,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        if(ui.cellData){
          let result = ui.cellData.replace('T', ' ').slice(0, 19);
          return result;
        }
      },
    },
    {
      title: "결재자사번",
      dataType: "string",
      dataIndx: "dcfcEno",
      align: "center",
      width: 90,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자",
      dataType: "string",
      dataIndx: "dcfcEnm",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자주석내용",
      dataType: "string",
      dataIndx: "dcfcAnnoCntn",
      halign: "center",
      align: "left",
      width: 486,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "반려여부",
      dataType: "string",
      dataIndx: "rjctYn",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "반려사유내용",
      dataType: "string",
      dataIndx: "rjctRsnCntn",
      halign: "center",
      align: "left",
      width: 486,
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  return {
    /**
     * 사용 할 함수 정의
     */
    inqTB06080S: inqTB06080S,
  };
})();
