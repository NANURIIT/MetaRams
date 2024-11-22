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
        // TO-DO 더블클릭 이벤트 수정
        // cellDblClick: function (event, ui) {
        //   console.log("aaaaaaaaaaa");
        //   var rowData = ui.rowData;
        //   console.log(rowData);
        // },
        cellClick: function (event, ui) {
          //클릭시 선택한 열 볼드처리
          $("#" + gridId + " .pq-grid-row").css("font-weight", "");
          //var row = $("#TB09060S_grid1").pqGrid("getRow", { rowIndx: ui.rowIndx});
          if (gridId == "gridApvlList") {
            $("#pq-body-row-u0-" + ui.rowIndx + "-right").css(
              "font-weight",
              "bold"
            );
            //상단 그리드의 셀 선택시 input 채우기
            var apvlListRowData = ui.rowData;
            apvlListSetting(apvlListRowData);
          } else if (gridId == "gridGbckList") {
            $("#pq-body-row-u3-" + ui.rowIndx + "-right").css(
              "font-weight",
              "bold"
            );
            //하단 그리드의 셀 선택시 input 채우기
            var gbckListRowData = ui.rowData;
            gbckListSetting(gbckListRowData);
          }
        },
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

  /*
   *  전체 초기화
   */
  const resetTb06080 = () => {
    // 조회조건
    $("#TB06080S_rspl_empNm").val(""); // 책임자
    $("#TB06080S_rspl_empNo").val(""); // 책임자사번
    $("#TB06080S_rqst_empNm").val(""); // 승인요청자
    $("#TB06080S_rqst_empNo").val(""); // 승인요청자사번
    $("#decdStepDcd").val("sel"); // 결재단계
    //승인요청
    $("#TB06080S_apvlRqstSq").val(""); // 승인요청순번
    $("#TB06080S_chrrEno").val(""); // 책임자사번
    $("#TB06080S_chrrEnm").val(""); // 책임자이름
    $("#TB06080S_dcfcEno").val(""); // 요청자사번
    $("#TB06080S_apvlRqstPEnm").val(""); // 요청자이름
    $("#TB06080S_decdStepDcd").val(""); // 결재단계
    $("#TB06080S_rqstDtm").val(""); // 승인요청일자
    $("#TB06080S_rqstCnclDtm").val(""); // 승인요청취소일자
    $("#TB06080S_dealNo").val(""); // Deal번호
    $("#TB06080S_dealNm").val(""); // Deal명
    $("#TB06080S_excSq").val(""); // 실행순번
    $("#TB06080S_rqstSq").val(""); // 신청순번
    $("#TB06080S_trSq").val(""); // 거래순번
    $("#TB06080S_apvlRqstCntn").val(""); // 승인요청내용
    $("#TB06080S_scrnNo").val(""); // 화면번호
    $("#TB06080S_prcsRsltDcd").val(""); // 처리결과
    $("#TB06080S_errCntn").val(""); // 오류내용
    //반려
    $("#TB06080S_decdSq").val(""); // 결재순번
    $("#TB06080S_decdSttsDcd").val(""); // 결재상태
    $("#TB06080S_decdDtm").val(""); // 결재일자
    $("#TB06080S_dcfcEnoGbck").val(""); // 결재자사번
    $("#TB06080S_dcfcEnmGbck").val(""); // 결재자이름
    $("#TB06080S_dcfcAnnoCntn").val(""); // 결재자주석
    $("#TB06080S_rjctYn").val(""); // 반려여부
    $("#TB06080S_rjctRsnCntn").val(""); // 반려사유
    //그리드
    pqGridObjApvlList.setData([]);
    pqGridObjGbckList.setData([]);
  };
  
  
  
  /*
    *  부분 초기화
    */
   function resetTb06080_below() {
     //승인요청
     $("#TB06080S_apvlRqstSq").val(""); // 승인요청순번
     $("#TB06080S_chrrEno").val(""); // 책임자사번
     $("#TB06080S_chrrEnm").val(""); // 책임자이름
     $("#TB06080S_dcfcEno").val(""); // 요청자사번
     $("#TB06080S_apvlRqstPEnm").val(""); // 요청자이름
     $("#TB06080S_decdStepDcd").val(""); // 결재단계
     $("#TB06080S_rqstDtm").val(""); // 승인요청일자
     $("#TB06080S_rqstCnclDtm").val(""); // 승인요청취소일자
     $("#TB06080S_dealNo").val(""); // Deal번호
     $("#TB06080S_dealNm").val(""); // Deal명
     $("#TB06080S_excSq").val(""); // 실행순번
     $("#TB06080S_rqstSq").val(""); // 신청순번
     $("#TB06080S_trSq").val(""); // 거래순번
     $("#TB06080S_apvlRqstCntn").val(""); // 승인요청내용
     $("#TB06080S_scrnNo").val(""); // 화면번호
     $("#TB06080S_prcsRsltDcd").val(""); // 처리결과
     $("#TB06080S_errCntn").val(""); // 오류내용
     //반려
     $("#TB06080S_decdSq").val(""); // 결재순번
     $("#TB06080S_decdSttsDcd").val(""); // 결재상태
     $("#TB06080S_decdDtm").val(""); // 결재일자
     $("#TB06080S_dcfcEnoGbck").val(""); // 결재자사번
     $("#TB06080S_dcfcEnmGbck").val(""); // 결재자이름
     $("#TB06080S_dcfcAnnoCntn").val(""); // 결재자주석
     $("#TB06080S_rjctYn").val(""); // 반려여부
     $("#TB06080S_rjctRsnCntn").val(""); // 반려사유
     //그리드
     pqGridObjApvlList.setData([]);
     pqGridObjGbckList.setData([]);
   };
   
  
  

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
        // $('#btnExc').prop('disabled', false)
        // $('#TB10720S_rgst_jobId').prop('disabled', false)
        pqGridObjApvlList.setData([]);
        pqGridObjGbckList.setData([]);
      },
      success: function (data) {
        // chkEvt();

        if (data && data.apvlList.length > 0) {
          console.log(data.apvlList);
          pqGridObjApvlList.setData(data.apvlList);
          pqGridObjGbckList.setData(data.gbckList);

          console.log(pqGridObjApvlList);
          pqGridObjApvlList.on("rowSelect", function (evt, ui) {
            console.log("1");

            let ul = ui.addList;
            let sel = pqGridObjApvlList.SelectRow();
            let getSel = sel.getSelection();

            if (getSel.length > 0) {
              if (ul[0].rowData.pq_rowselect) {
                rd = ul[0].rowData;

                console.log(rd);

                $("#TB06080S_apvlRqstSq").val(rd.apvlRqstSq);
                $("#TB06080S_chrrEno").val(rd.chrrEno);
                $("#TB06080S_chrrEnm").val(rd.chrrEnm);
                $("#TB06080S_apvlRqstPEno").val(rd.apvlRqstPEno);
                $("#TB06080S_apvlRqstPEnm").val(rd.apvlRqstPEnm);
                $("#TB06080S_decdSttsDcd").val(rd.decdSttsDcd);
                $("#TB06080S_dealNo").val(rd.dealNo);
                $("#TB06080S_dealNm").val(rd.dealNm);
                $("#TB06080S_decdJobDcd").val(rd.decdJobDcd);
                $("#TB06080S_scrnNo").val(rd.scrnNo);
                $("#TB06080S_apvlRqstCntn").val(rd.apvlRqstCntn);
                $("#TB06080S_rqstDtm").val(rd.rqstDtm);
                $("#TB06080S_rqstCnclDtm").val(rd.rqstCnclDtm);
                $("#TB06080S_dcfcEno").val(rd.dcfcEno);
                $("#TB06080S_dcfcEnm").val(rd.dcfcEnm);
                $("#TB06080S_prcsRsltDcd").val(rd.prcsRsltDcd);
                $("#TB06080S_excSq").val(rd.excSq);
                $("#TB06080S_rqstSq").val(rd.rqstSq);
                $("#TB06080S_trSq").val(rd.trSq);
                $("#TB06080S_errCntn").val(rd.errCntn);

                rd.rowType = "M";
              }
            }
          });
        } else {
          swal.fire({
            icon: "warning",
            text: "조회된 내역이 없습니다.",
            confirmButtonText: "확인",
          });
		  resetTb06080_below();
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

  function apvlListSetting(apvlListRowData) {
    console.log(apvlListRowData);
    $("#TB06080S_apvlRqstSq").val(apvlListRowData.apvlRqstSq); // 승인요청순번
    $("#TB06080S_chrrEno").val(apvlListRowData.chrrEno); // 책임자사번
    $("#TB06080S_chrrEnm").val(apvlListRowData.chrrEnm); // 책임자이름
    $("#TB06080S_dcfcEno").val(apvlListRowData.dcfcEno); // 요청자사번
    $("#TB06080S_apvlRqstPEnm").val(apvlListRowData.dcfcEnm); // 요청자이름
    $("#TB06080S_decdStepDcd").val(apvlListRowData.decdStepDcd); // 결재단계
    $("#TB06080S_rqstDtm").val(
      formatDateTime(apvlListRowData.rqstDtm).split(" ")[0]
    ); // 승인요청일자
    $("#TB06080S_rqstCnclDtm").val(
      formatDateTime(apvlListRowData.rqstCnclDtm).split(" ")[0]
    ); // 승인요청취소일자
    $("#TB06080S_dealNo").val(apvlListRowData.dealNo); // Deal번호
    $("#TB06080S_dealNm").val(apvlListRowData.dealNm); // Deal명
    $("#TB06080S_excSq").val(apvlListRowData.excSq); // 실행순번
    $("#TB06080S_rqstSq").val(apvlListRowData.rqstSq); // 신청순번
    $("#TB06080S_trSq").val(apvlListRowData.trSq); // 거래순번
    $("#TB06080S_apvlRqstCntn").val(apvlListRowData.apvlRqstCntn); // 승인요청내용
    $("#TB06080S_scrnNo").val(apvlListRowData.scrnNo); // 화면번호
    $("#TB06080S_prcsRsltDcd").val(apvlListRowData.prcsRsltDcd); // 처리결과
    $("#TB06080S_errCntn").val(apvlListRowData.errCntn); // 오류내용
  }

  function gbckListSetting(gbckListRowData) {
    console.log(gbckListRowData);
    $("#TB06080S_decdSq").val(gbckListRowData.decdSq); // 결재순번
    $("#TB06080S_decdSttsDcd").val(gbckListRowData.decdSttsDcd); // 결재상태
    $("#TB06080S_decdDtm").val(
      formatDateTime(gbckListRowData.decdDtm).split(" ")[0]
    ); // 결재일자
    $("#TB06080S_dcfcEnoGbck").val(gbckListRowData.dcfcENo); // 결재자사번
    $("#TB06080S_dcfcEnmGbck").val(gbckListRowData.dcfcENm); // 결재자이름
    $("#TB06080S_dcfcAnnoCntn").val(gbckListRowData.dcfcAnnoCntn); // 결재자주석
    $("#TB06080S_rjctYn").val(gbckListRowData.rjctYn); // 반려여부
    $("#TB06080S_rjctRsnCntn").val(gbckListRowData.rjctRsnCntn); // 반려사유
  }

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
      title: "승인요청순번",
      dataType: "integer",
      dataIndx: "apvlRqstSq",
      align: "center",
      width: 95,
      filter: { crules: [{ condition: "range" }] },
    },
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
      title: "Deal번호",
      dataType: "string",
      dataIndx: "dealNo",
      align: "center",
      width: 160,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "Deal명",
      dataType: "string",
      dataIndx: "dealNm", //딜명가져오기
      align: "center",
      width: 160,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "실행순번",
      dataType: "integer",
      dataIndx: "excSq",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "신청순번",
      dataType: "integer",
      dataIndx: "rqstSq",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "거래순번",
      dataType: "integer",
      dataIndx: "trSq",
      align: "center",
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
      dataIndx: "chrrEnm", //책임자명
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
        return formatDateTime(ui.cellData);
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
        return formatDateTime(ui.cellData);
      },
    },
    {
      title: "담당자사번",
      dataType: "string",
      dataIndx: "dcfcEno",
      align: "center",
      width: 90,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당자",
      dataType: "string",
      dataIndx: "dcfcEnm",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
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
      align: "center",
      width: 130,
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  let colGbckList = [
    {
      title: "승인요청순번",
      dataType: "integer",
      dataIndx: "apvlRqstSq",
      align: "center",
      width: 95,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재순번",
      dataType: "integer",
      dataIndx: "decdSq",
      align: "center",
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
        return formatDateTime(ui.cellData);
      },
    },
    {
      title: "결재자사번",
      dataType: "string",
      dataIndx: "dcfcENo",
      align: "center",
      width: 90,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자",
      dataType: "string",
      dataIndx: "dcfcENm",
      align: "center",
      width: 70,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자주석내용",
      dataType: "string",
      dataIndx: "dcfcAnnoCntn",
      align: "center",
      width: 290,
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
      align: "center",
      width: 290,
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  return {
    /**
     * 사용 할 함수 정의
     */

    resetTb06080: resetTb06080,
    inqTB06080S: inqTB06080S,
  };
})();
