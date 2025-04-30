const TB10210Sjs = (function () {

  let authCdTbObj;
  let authCdMenuTbObj;

  let setAthCd;
  let searchParam;

  let prevRowIndx;


  /**
   * PQGRID SELECTBOX
   */
  const Yn = [
    { "Y": "Y" }
    , { "N": "N" }
  ]

  const mdfyRghtCcd = [
    {
      cdValue: undefined
      , cdName: "권한없음"
    },
    {
      cdValue: "1"
      , cdName: "조회"
    },
    {
      cdValue: "2"
      , cdName: "수정가능"
    }
  ]
  /**
   * PQGRID SELECTBOX
   */


  /**
   * PQGRID COLMODEL
   */
  let colModel_authCdTb = [
    {
      title: "권한코드",
      dataType: "string",
      dataIndx: "athCd",
      width: "5%",
      editable: false,
      align: "center",
      halign: "center",
      filter: { crules: [{ condition: "range" }] }
    },
    {
      title: "권한명",
      dataType: "string",
      dataIndx: "athCdNm",
      width: "14%",
      editable: true,
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한설명",
      dataType: "string",
      dataIndx: "athCdExpl",
      width: "25%",
      editable: true,
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    /*{
      title: "메뉴관리",
      align: "center",
      halign: "center",
      dataType: "string",
      dataIndx: "authCdBtn",
      editable: false,
      width: "5%",
      render: function (ui) {
        if (ui.cellData === "new") {
          return "";
        } else {
          return (
            `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick='TB10210Sjs.clickDetailButton(${ui.rowIndx});'><i class='fa fa-arrow-down'></i>&nbsp;상세</button>`
          );
        }
      },
    },*/
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록자",
      dataType: "string",
      dataIndx: "rgstEmpNm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "삭제여부",
      dataIndx: "delYn",
      align: "center",
      halign: "center",
      type: "string",
      editable: true,
      width: "5%",
      editor: {
        type: "select",
        options: Yn
      },
    },
    {
      title: "적용여부",
      dataIndx: "aplyYn",
      align: "center",
      halign: "center",
      type: "string",
      editable: true,
      width: "5%",
      editor: {
        type: "select",
        options: Yn
      },
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "hndDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리시간",
      dataType: "string",
      dataIndx: "hndTm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpno",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  let colModel_authCdMenuTb = [
    {
      title: "메뉴ID",
      dataType: "string",
      dataIndx: "menuId",
      editable: false,
      align: "center",
      halign: "center",
      width: "12%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "메뉴명",
      dataType: "string",
      dataIndx: "menuNm",
      editable: false,
      align: "left",
      halign: "center",
      width: "35%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한코드",
      dataType: "string",
      dataIndx: "athCd",
      editable: false,
      align: "center",
      halign: "center",
      width: "12%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "메뉴레벨",
      dataType: "string",
      dataIndx: "menuLvl",
      editable: false,
      align: "right",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "수정가능여부",
      dataIndx: "mdfyRghtCcd",
      align: "center",
      halign: "center",
      dataType: "string",
      editor: true,
      editable: true,
      editor: {
        type: "select",
        valueIndx: "cdValue",
        labelIndx: "cdName",
        options: mdfyRghtCcd
      },
      render: function (ui) {
        let fSel = mdfyRghtCcd.find(({ cdValue }) => cdValue == ui.cellData);
        return fSel ? fSel.cdName : ui.cellData;
      }
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "hndDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리시간",
      dataType: "string",
      dataIndx: "hndTm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpno",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
  /**
   * PQGRID COLMODEL
   */

  /**
   * pqgird addrow
   * @param {} colModelSelector 
   */
  function pqGridAddNewRow(colModelSelector) {

    let row = [];
    let newRow = {};
    const data = colModelSelector.pqGrid("instance");
    const rowColumnsData = data.colModel;
    const length = rowColumnsData.length;
    for (let i = 0; i < length; i++) {
      const title = rowColumnsData[i].title;
      const dataIndx = rowColumnsData[i].dataIndx;
      row.push(title);
      if (title === "메뉴관리") {
        newRow[dataIndx] = "new";
      }
      else if (title === "삭제여부") {
        newRow[dataIndx] = "N";
      }
      else if (title === "적용여부") {
        newRow[dataIndx] = "Y";
      }
      else if (title === "") {
        newRow[dataIndx] = "del"
      }
      else {
        newRow[dataIndx] = "";
      }
    }

    colModelSelector.pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });

  }

  /**
   * pqDeleteRow
   */
  function pqGridDeleteRow(colModelSelector) {

    const rowIndx = colModelSelector.pqGrid('instance').pdata.length

    if(colModelSelector.pqGrid('instance').pdata[rowIndx-1].authCdBtn === "new" || ( colModelSelector.pqGrid('instance').pdata[rowIndx-1].hndDetlDtm === "" && colModelSelector.pqGrid('instance').pdata[rowIndx-1].hndEmpno === "")){
      colModelSelector.pqGrid("deleteRow", {
        rowIndx: rowIndx - 1
      });
      return;
    }
    else{
      return;
    }

  }


  $(function () {

    setGrid_TB10210S();
    getAuthCode();

  });

  /*******************************************************************
   *** 공통 event
   *******************************************************************/

  /**
   * 그리드 세팅
   */
  function setGrid_TB10210S() {
    //그룹코드
    let obj_authCdTb = {
      height: 220,
      maxHeight: 220,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colModel_authCdTb,
      strNoRows: "조회된 데이터가 없습니다.",
      cellClick: function (evt, ui) {
        /**
         * 특정컬럼 기존셀렉트된건 수정 안되는데 행추가를 사용했을 경우에 입력가능하게 하는거...ㅜㅜㅜ
         */
        if (ui.rowData.authCdBtn === "new" && ui.column.dataIndx === "athCd") {
          ui.column.editable = true;
        } else if (ui.rowData.authCdBtn != "new" && ui.column.dataIndx === "athCd") {
          ui.column.editable = false;
        }
      }
	  , rowClick: function (evt, ui) {
		pqGridSelectHandler ( ui.rowIndx, "authCodeTable" );
		clickDetailButton(ui.rowIndx);
	  },
    };

    $("#authCodeTable").pqGrid(obj_authCdTb);
    authCdTbObj = $("#authCodeTable").pqGrid("instance");

    //상세코드
    let obj_authCdMenuTb = {
      height: 220,
      maxHeight: 220,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: {
        show: true,
        width: 40,
        resizable: true,
        title: "<p class='text-center'>순번</p>",
      },
      scrollModel: { autoFit: true },
      colModel: colModel_authCdMenuTb,
      strNoRows: "조회된 데이터가 없습니다."
	  , rowClick: function (evt, ui) {
		pqGridSelectHandler ( ui.rowIndx, "authCodeMenuTable" );
	  },
    };

    $("#authCodeMenuTable").pqGrid(obj_authCdMenuTb);
    authCdMenuTbObj = $("#authCodeMenuTable").pqGrid("instance");
  }

  /**
   * 권한명으로 검색
   */
  function searchButtonClick() {
    let searchKeyword = $("#authCodeSearchInput").val();
    getAuthCode(searchKeyword);
  }

  /*******************************************************************
   *** 상단 그리드 event
   *******************************************************************/

  /**
   * 권한목록 조회 ajax
   */
  function getAuthCode(rghtCdNm) {

    searchParam = rghtCdNm;

    let _url = "/getAuthCode";
    if (!isEmpty(rghtCdNm)) {
      _url += "?rghtCdNm=" + rghtCdNm;
    }
    ajaxCall({
      method: "GET",
      url: _url,
      beforeSend: function () {
        authCdTbObj.option("dataModel.data", []);
        authCdTbObj.option("strNoRows", "조회 중입니다...");
        authCdTbObj.refreshDataAndView();
      },
      success: function (authCode) {
        //let html = '';
        let rowList = [];

        if (authCode.length > 0) {

          $('#authCodeTable').pqGrid('instance').setData(authCode);

        }
        else {
          Swal.fire({
            icon: 'warning'
            , title: '조회된 정보가 없습니다!'
          })
          $('#authCodeTable').pqGrid('instance').setData([]);
        }
      },
    });

    $('#authCodeMenuTable').pqGrid('instance').setData([]);

  }

  /**
   * 권한코드 상세버튼 클릭
   */
  function clickDetailButton(rowIndx) {

    $('#authCodeTable').pqGrid('removeClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: prevRowIndx });
    $('#authCodeTable').pqGrid('addClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: rowIndx });

    prevRowIndx = rowIndx;
      let rowData = authCdTbObj.getRowData({ rowIndx: rowIndx });
      let rghtCd = rowData.athCd;
      getAuthCodeMenu(rghtCd);
  }

  /**
   * 권한코드별 상세 메뉴 호출
   * @param {권한코드} rghtCd
   */
  function getAuthCodeMenu(rghtCd) {

    setAthCd = rghtCd;

    ajaxCall({
      method: "get",
      url: "/getAuthCodeMenu?rghtCd=" + rghtCd,
      success: function (authCodeMenu) {
        //let html = '';
        let rowList = [];

        if (authCodeMenu.length > 0) {

          $('#authCodeMenuTable').pqGrid('instance').setData(authCodeMenu);
        } else {
          Swal.fire({
            icon: 'warning'
            , title: '조회된 정보가 없습니다!'
          })
          $('#authCodeMenuTable').pqGrid('instance').setData([]);
        }
      },
    });
  }

  /**
   * INSERT UPDATE
   */
  function mergeAthCd() {

    let paramData = [];

    const pData = $('#authCodeTable').pqGrid('instance').pdata

    for (let i = 0; i < pData.length; i++) {
      if (pData[i].pq_cellcls != undefined) {
        paramData.push(pData[i]);
      }
    }

    if (paramData.length === 0) {
      Swal.fire({
        icon: 'warning'
        , title: '수정사항이 없습니다!'
      })
      getAuthCode();
      return;
    }

    // 최소한의 데이터를 작성했는지 체크
    for (let i = 0; i < paramData.length; i++) {
      if (paramData[i].authCdBtn === 'new') {
        if (paramData[i].athCd === "" || paramData[i].athCd.indexOf(" ") > 0) {
          Swal.fire({
            icon: 'warning',
            title: '권한코드를 수정해주세요!'
          });
          return;
        } else if (paramData[i].athCdNm === "") {
          Swal.fire({
            icon: 'warning',
            title: '권한명을 입력해주세요!'
          });
          return;
        } else if (paramData[i].athCdExpl === "") {
          Swal.fire({
            icon: 'warning',
            title: '권한설명을 입력해주세요!'
          });
          return;
        }
      }
    }

    $.ajax({
      method: "POST",
      url: "/TB10210S/mergeAthCd",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        // 데이터 존재시 pqgrid적용
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: '성공!'
          })
          getAuthCode(searchParam);
        }
        // 데이터 없을시 확인가능한 alert 실행
        else if (data === -7574) {
          Swal.fire({
            icon: 'warning'
            , title: '이미 존재하는 권한코드 입니다!'
          })
        }
      },
      error: function (response) {

      },
    });


  }

  function updateMdfyRghtCcd() {

    let paramData = [];

    const pData = $('#authCodeMenuTable').pqGrid('instance').pdata

    for (let i = 0; i < pData.length; i++) {
      if (pData[i].pq_cellcls != undefined && pData[i].mdfyRghtCcd != "") {
        paramData.push(pData[i]);
      }
    }

    if (paramData.length === 0) {
      Swal.fire({
        icon: 'warning'
        , title: '수정사항이 없습니다!'
      })
      getAuthCode();
      return;
    }

    $.ajax({
      method: "POST",
      url: "/TB10210S/updateMdfyRghtCcd",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      success: function (data) {
        // 데이터 존재시 pqgrid적용
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: '성공!'
          })
        }
        getAuthCodeMenu(setAthCd);
      },
      error: function (response) {

      },
    });


  }

  return {
    searchButtonClick: searchButtonClick
    , pqGridAddNewRow: pqGridAddNewRow
    , mergeAthCd: mergeAthCd  // 권한코드 저장
    , updateMdfyRghtCcd: updateMdfyRghtCcd  // 메뉴코드내 권한 저장
    , clickDetailButton: clickDetailButton
    , pqGridDeleteRow: pqGridDeleteRow
  };
})();
