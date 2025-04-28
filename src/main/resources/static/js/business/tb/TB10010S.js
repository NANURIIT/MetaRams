const TB10010Sjs = (function () {

  $(document).ready(function () {
    $("#TB10010S_srchForm").find('input, select').on('input', function () {
      resetPGgrids("TB10010S")
    })
  });
  let groupCdListTbObj;
  var codeId = "";

  /**
   * *** 그룹코드 ***
   * 1. 설명, 사용여부만 업데이트 가능
   * 2. 삭제시 관련 상세코드가 존재하는지 확인. 존재하는 상세코드가 있다면 삭제 불가
   * 3. 신규 저장시 그룹코드명은 쿼리내에서 자동으로 지정
   * 
   * *** 상세코드 ***
   * 1. 코드명, 사용여부 업데이트 가능
   */

  // 현재 선택된 그룹코드
  let nowCmnsCdGrp;

  const Yn = [
    { "Y": "Y" }
    , { "N": "N" }
  ]

  let colModel_groupCdListTb = [
    {
      title: "그룹코드",
      dataType: "string",
      dataIndx: "cmnsCdGrp",
      editable: false,
      width: "7%",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "그룹명",
      dataType: "string",
      dataIndx: "cmnsCdNm",
      editable: false,
      width: "10%",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "설명",
      dataType: "string",
      dataIndx: "cmnsCdGrpExpl",
      width: "15%",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "코드성격",
      dataType: "string",
      dataIndx: "cmnsCdClsf",
      width: "7%",
      align: "center",
      halign: "center",
      width: "",
      editor: {
        type: "select",
        valueIndx: "value",
        labelIndx: "label",
        options: [
          { label: "일반코드", value: 1 },
          { label: "변환코드", value: 2 },
        ],
      },
      render: function (ui) {
        var options = [
          { label: "일반코드", value: "1" },
          { label: "변환코드", value: "2" },
        ];
        var option = options.find((opt) => opt.value == ui.cellData);
        return option ? option.label : ui.cellData;
      },
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "코드길이",
      dataType: "string",
      dataIndx: "cdLngth",
      width: "7%",
      align: "right",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사용여부",
      dataIndx: "useYn",
      align: "center",
      halign: "center",
      width: "7%",
      editable: "true",
      editor: {
        type: "select",
        options: Yn
      },
    },
    {
      title: "코드관리",
      align: "center",
      halign: "center",
      editable: false,
      dataType: "string",
      dataIndx: "cdListDltBtn",
      width: "7%",
      render: function (ui) {
        if (!ui.cellData) {
          return (
            "<button class='ui-button ui-corner-all ui-widget' name='detail_btn' data-row-indx='" +
            ui.rowIndx +
            "'><i class='fa fa-arrow-down'></i>&nbsp;상세</button>"
          );
        }
        else {
          return "";
        }
      },
    },
    {
      title: "등록일",
      dataType: "string",
      dataIndx: "rgstDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "처리일시",
      dataType: "string",
      dataIndx: "hndDetlDtm",
      editable: false,
      align: "center",
      halign: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpnm",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  let colModel_cdListTable = [
    {
      title: "그룹코드",
      dataType: "string",
      dataIndx: "cmnsCdGrp",
      hidden: true
    },
    {
      title: "코드",
      dataType: "string",
      dataIndx: "cdVlId",
      editable: true,
      align: "center",
      halign: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "코드명",
      dataType: "string",
      dataIndx: "cdVlNm",
      align: "left",
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "변환후코드",
      dataType: "string",
      dataIndx: "rsltCdVl",
      align: "center",
      halign: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "순서",
      dataType: "string",
      dataIndx: "cdSq",
      editable: false,
      align: "right",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사용여부",
      dataIndx: "useYn",
      align: "center",
      halign: "center",
      width: "7%",
      editable: function(ui){
        var isCanUse = false; 

        // if (clickDetailButton.grpUseYn === 'N') {
        //   isCanUse = true;
        // } 오답
        var rowData = ui.rowData;             
        var dtlCmnsCdGrp = rowData.cmnsCdGrp;      //그룹코드(상세코드)
        var useYn = rowData.useYn;            //사용여부(상세코드)

        var grpCdListLgth = $("#groupCodeListTable").pqGrid('option', 'dataModel.data').length;    //그룹코드 그리드 길이(행 개수)
        
        
        
        for(var i = 0; i < grpCdListLgth;  i++){
          // console.log("여기임?");

          var grpCdRowData = $("#groupCodeListTable").pqGrid("getRowData", { rowIndx: i } );      //그룹코드 i번째 행 데이터
          //그룹코드(그룹코드) : grpCdRowData.cmnsCdGrp
          let grpCmnsCdGrp = grpCdRowData.cmnsCdGrp;
          //사용여부(그룹코드) : grpCdRowData.useYn
          let grpUseYn = grpCdRowData.useYn;
          
          //1. 그룹코드(상세코드) == 그룹코드(그룹코드) ?
          if (dtlCmnsCdGrp === grpCmnsCdGrp) {
            //2. 사용여부(그룹코드) == 'Y' or 'N' 
            if (grpUseYn === 'Y') {
              isCanUse = true
            }
            else {
              isCanUse = false
            }
          }
          
          
          //그룹코드의 하위 상세코드들의 사용여부는 그룹코드의 사용여부가 N일시 Y가 될 수 없음.
          //로그에 그룹코드의 사용여부가 나와야함.
          
        
        }

        console.log("useYn::: " + useYn);
        return isCanUse;
      },
      editor: {
        type: "select",
        options: Yn
      },
    },
    {
      title: "등록일",
      dataType: "string",
      dataIndx: "rgstDt",
      align: "center",
      halign: "center",
      editable: false,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return formatDate(ui.cellData);
      },
    },
    {
      title: "등록자",
      dataType: "string",
      dataIndx: "rgstEmpnm",
      align: "center",
      editable: false,
      halign: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리일시",
      dataType: "string",
      dataIndx: "hndDetlDtm",
      align: "center",
      halign: "center",
      editable: false,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpnm",
      align: "center",
      halign: "center",
      editable: false,
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  $(function () {
    //select박스 코드 그룹 호출 함수
    getCommonCodeInfo();
    //코드구분 select박스 선택
    selectCommonCode();
    //그룹코드의 코드관리 상세버튼 클릭
    clickDetailButton();
    //변경 가능한 컬럼 더블클릭 했을시 input박스 생성
    //doubleClickColumn();

    //그리드 세팅
    setGrid_TB10010S();
  });

  /*******************************************************************
   *** 공통 event
   *******************************************************************/

  function setGrid_TB10010S() {
    //그룹코드
    var obj_groupCdListTb = {
      height: 240,
      maxHeight: 240,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colModel_groupCdListTb,
      strNoRows: "조회된 데이터가 없습니다.",
      cellClick: function (event, ui) {

        /**
         * 그룹명
         * 설명
         * 코드성격
         * 코드길이
         * 
         * 신규입력일때 입력가능.
         */
        if (ui.rowData.cdListDltBtn === "new" && ui.column.dataIndx === "cmnsCdNm") {
          ui.column.editable = true;
        }
        else if (ui.rowData.cdListDltBtn != "new" && ui.column.dataIndx === "cmnsCdNm") {
          ui.column.editable = false;
        }
      }
    };

    $("#groupCodeListTable").pqGrid(obj_groupCdListTb);
    groupCdListTbObj = $("#groupCodeListTable").pqGrid("instance");

    //상세코드
    var obj_cdListTb = {
      height: 240,
      maxHeight: 240,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      colModel: colModel_cdListTable,
      strNoRows: "조회된 데이터가 없습니다.",
    };

    $("#codeListTable").pqGrid(obj_cdListTb);
    cdListTbObj = $("#codeListTable").pqGrid("instance");
  }

  /*******************************************************************
   *** 조회 영역 event
   *******************************************************************/
  /**
   * select박스 코드 그룹 호출 함수
   */
  var getCommonCodeInfo = function () {
    $.ajax({
      url: "/TB10010S/commonCodeInfo",
      method: "GET",
      dataType: "json",
    }).done(function (commonCodeInfo) {
      let commonCodeOption = '<option value="">전체</option>';
      for (let i = 0; i < commonCodeInfo.length; i++) {
        let commonCode = commonCodeInfo[i];
        commonCodeOption +=
          '<option value="' +
          commonCode.cmnsCdGrp +
          '">' +
          commonCode.cmnsCdGrpExpl +
          " (" +
          commonCode.cmnsCdGrp +
          ")</option>";
      }
      $("#commonCodeInfo").html(commonCodeOption);
    });
  };

  /**
   * 코드구분 select박스 선택
   */
  function selectCommonCode() {
    $(document).on("click", "#commonCodeSearch", function () {
      let cmnsCdGrp = $("#commonCodeInfo option:selected").val();
      getGroupCodeInfoList(cmnsCdGrp);
    });
  }

  /*******************************************************************
   *** 상단 그리드 event
   *******************************************************************/
  /**
   * 그룹코드의 코드관리 상세버튼 클릭
   */
  function clickDetailButton() {
    $(document).on("click", "button[name='detail_btn']", function () {
      var rowIndex = $(this).data("row-indx");        //몇번쨰 줄인지?

      // console.log(rowIndex);

      var rowData = groupCdListTbObj.getRowData({ rowIndx: rowIndex });

      codeId = rowData.cmnsCdGrp;

      var grpUseYn = rowData.useYn;
      // console.log("useYn::: "+ grpUseYn);

      getGroupCodeInfo(codeId);
    });
  }

  /**
   * 그룹코드 행추가 버튼 클릭
   */
  function addGroupCodeRow() {
    var rowData = {
      cmnsCdGrp: "",
      cmnsCdNm: "",
      cmnsCdGrpExpl: "",
      cmnsCdClsf: "1",
      cdLngth: "",
      useYn: "Y",
      cdListDltBtn: "new",
      rgstDt: "",
    };

    $("#groupCodeListTable").pqGrid("addRow", {
      rowData: rowData,
      checkEditable: false,
    });
  }

  /**
   * pqDeleteRow
   */
  function pqGridDeleteRow(colModelSelector) {
    console.log("진입");
    
    const rowIndx = colModelSelector.pqGrid('instance').pdata.length
    if (colModelSelector.pqGrid('instance').pdata[rowIndx - 1].cdListDltBtn === "new"
    || (colModelSelector.pqGrid('instance').pdata[rowIndx - 1].hndDetlDtm === "" && colModelSelector.pqGrid('instance').pdata[rowIndx - 1].hndEmpnm === "")
    || (!colModelSelector.pqGrid('instance').pdata[rowIndx - 1].hndDetlDtm && !colModelSelector.pqGrid('instance').pdata[rowIndx - 1].hndEmpnm)
  ) {
      colModelSelector.pqGrid("deleteRow", {
        rowIndx: rowIndx - 1
      });
      return;
    }
    else {
      return;
    }
  }

  /**
   * 그룹코드 리스트 호출
   * @param {string} cmnsCdGrp 그룹코드
   */
  var getGroupCodeInfoList = function (cmnsCdGrp) {
    let _url = "/TB10010S/groupCodeInfoList";

    paramData = {
      cmnsCdGrp: cmnsCdGrp
      , cmnsCdGrpExpl: $('#commonCodeGrpExpl').val()
    }

    $.ajax({
      url: _url,
      method: "post",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
    }).done(function (groupCodeInfoList) {
      if (groupCodeInfoList.length > 0) {
        $('#groupCodeListTable').pqGrid('instance').setData(groupCodeInfoList);
        groupCdListTbObj.refreshDataAndView();
      } else {
        groupCdListTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
      }
    });
  };

  /**
   * 그룹코드 저장 처리
   * @param {list} groupCodeList 그룹코드 리스트
   */
  function saveGroupCode() {

    let insertList = [];
    let updateList = [];

    //그룹코드 리스트
    const pqgridList = $('#groupCodeListTable').pqGrid('instance').pdata;

    for(let i = 0; i < pqgridList.length; i++){
      // 신규데이터
      if(!pqgridList[i].cmnsCdGrp){
        // 그룹명
        if(!pqgridList[i].cmnsCdNm){
          Swal.fire({
            icon: 'warning'
            , text: '그룹명 입력해주세요'
          })
          return;
        }
        // 설명
        else if(!pqgridList[i].cmnsCdGrpExpl){
          Swal.fire({
            icon: 'warning'
            , text: '설명해주세요'
          })
          return;
        }
        // 코드길이
        else if(!pqgridList[i].cdLngth){
          Swal.fire({
            icon: 'warning'
            , text: '길이를 정해주세요'
          })
          return;
        }
        // 유효성 체크 통과시 리스트 추가
        else {
          insertList.push(pqgridList[i]);
        }
      }
      // 수정데이터
      else if(pqgridList[i].pq_cellcls != undefined){
        updateList.push(pqgridList[i]);
      }
    }
    

    let paramData = {
      insertList: insertList
      , updateList: updateList
    }

    $.ajax({
      method: "POST",
      url: "/TB10010S/registGroupCodeInfo",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        Swal.fire({
          icon: "success",
          title: "그룹코드 등록이 완료되었습니다.",
          confirmButtonText: "확인",
        });
        getGroupCodeInfoList();
        getCommonCodeInfo();
      },
      error: function (response) {
        let message = response.responseJSON.message;
        openPopup({
          title: "실패",
          text: message,
        });
      },
    });
  }

  /**
   * 상세코드 저장 처리
   * @param {list} groupCodeList 그룹코드 리스트
   */
  function clickSaveCode() {

    let insertList = [];
    let updateList = [];

    //그룹코드 리스트
    const pqgridList = $('#codeListTable').pqGrid('instance').pdata;

    for(let i = 0; i < pqgridList.length; i++){
      // 신규데이터
      if(!pqgridList[i].cdSq){
        // 코드
        if(!pqgridList[i].cdVlId){
          Swal.fire({
            icon: 'warning'
            , text: '코드를 입력해주세요'
          })
          return;
        }
        // 코드명
        else if(!pqgridList[i].cdVlNm){
          Swal.fire({
            icon: 'warning'
            , text: '코드명을 입력해주세요'
          })
          return;
        }
      // 사용여부
      // if (clickDetailButton().) {
      //   if (useYn === 'Y') {

      //     console.log("grpUseYn :: ", grpUseYn);
          
      //     Swal.fire({
      //       icon: 'warning'
      //       , text: "사용여부를 확인해주세요."
      //     })
      //   }
      // }

        // 유효성 체크 통과시 리스트 추가
        else {
          insertList.push(pqgridList[i]);
        }
      }
      // 수정데이터
      else if(pqgridList[i].pq_cellcls != undefined){
        updateList.push(pqgridList[i]);
      }
    }
    

    let paramData = {
      insertList: insertList
      , updateList: updateList
    }

    $.ajax({
      method: "POST",
      url: "/TB10010S/registCodeInfo",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(paramData),
      dataType: "json",
      success: function (data) {
        
        Swal.fire({
          icon: "success",
          title: "상세코드 등록이 완료되었습니다.",
          confirmButtonText: "확인",
        });
        getGroupCodeInfo(nowCmnsCdGrp);
      },
      error: function (response) {
        let message = response.responseJSON.message;
        openPopup({
          title: "실패",
          text: message,
        });
      },
    });
  }

  

  /*******************************************************************
   *** 하단 그리드 event
   *******************************************************************/
  /**
   * 그룹코드 상세보기 데이터 호출
   * @param {string} cmnsCdGrp 그룹코드
   */
  var getGroupCodeInfo = function (cmnsCdGrp) {

    nowCmnsCdGrp = cmnsCdGrp;

    $.ajax({
      url: "/TB10010S/groupCodeInfo?cmnsCdGrp=" + cmnsCdGrp,
      method: "GET",
      dataType: "json",
    }).done(function (codeInfoList) {
      if (codeInfoList.length > 0) {

        //case 1

        $('#codeListTable').pqGrid('instance').setData(codeInfoList);
      } else {
        Swal.fire({
          icon: "warning"
          , text: "조회된 데이터가 없습니다."
        })
        $('#codeListTable').pqGrid('instance').setData([]);
      }
    });
  };

  /**
   * 코드 행추가 버튼 클릭
   */
  function addCodeRow() {

    if(!nowCmnsCdGrp){
      Swal.fire({
        icon: 'warning'
        , text: '그룹코드를 선택하신 후 행추가를 해주세요!'
      })
      return;
    }

    var newRow = {
      cmnsCdGrp: nowCmnsCdGrp,
      useYn: "Y",
    };

    $("#codeListTable").pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });
  }

  return {
    addGroupCodeRow: addGroupCodeRow,
    pqGridDeleteRow: pqGridDeleteRow,
    addCodeRow: addCodeRow,
    saveGroupCode: saveGroupCode,
    clickSaveCode: clickSaveCode,
  };
})();
