const TB03030Sjs = (function () {
  let pqGridWfDealInfo;
  let pqGridMapInfo;
  let pqGridMapRecInfo;

  $(document).ready(function () {
    renderGrid(); // 그리드 렌더링
    getWfDealInfo(); // 딜정보 데이터 세팅
  });

  // 그리드 렌더링함수
  function renderGrid() {
    let arrPqGridObj = [
      {
        height: 200,
        maxHeight: 200,
        id: "TB02020_gridWfDealInfo",
        colModel: colWfDealInfo,
      },
      ,
      {
        height: 300,
        maxHeight: 300,
        id: "TB02020_gridMapInfo",
        colModel: colMapInfo,
      },
      {
        height: 300,
        maxHeight: 300,
        id: "TB02020_gridMapRecInfo",
        colModel: colMapRecInfo,
      },
    ];
    setPqGrid(arrPqGridObj);

    pqGridWfDealInfo = $("#TB02020_gridWfDealInfo").pqGrid("instance");
    pqGridMapInfo = $("#TB02020_gridMapInfo").pqGrid("instance");
    pqGridMapRecInfo = $("#TB02020_gridMapRecInfo").pqGrid("instance");
  }

  // 딜 정보 데이터 가져오기
  function getWfDealInfo() {
    var param = {};

    $.ajax({
      type: "GET",
      url: "",
      data: param,
      dataType: "json",
      success: function (data) {
        pqGridWfDealInfo.setData(data);
        //TODO: 건수 클릭 시 목록 보이기
        pqGridWfDealInfo.option("cellDblClick", function (event, ui) {
          getMapInfo();
          getMapRecInfo();
        });
      },
    });
  }

  // 맵 관리 데이터 가져오기
  function getMapInfo(params) {
    var param = {};

    $.ajax({
      type: "GET",
      url: "",
      data: param,
      dataType: "json",
      success: function (data) {
        pqGridMapInfo.setData(data);
        //TODO: 행 클릭 시 담당자 변경 팝업 띄우기
        pqGridMapInfo.option("rowDblClick", function (event, ui) {});
      },
    });
  }

  // 맵 이력 데이터 가져오기
  function getMapRecInfo(params) {
    var param = {};

    $.ajax({
      type: "GET",
      url: "",
      data: param,
      dataType: "json",
      success: function (data) {
        pqGridMapRecInfo.setData(data);
      },
    });
  }
  /* ***********************************그리드 컬럼******************************** */

  /* 딜 정보 그리드 */
  let colWfDealInfo = [
    {
      title: "순서",
      dataType: "string",
      dataIndx: "",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.rowIndx + 1;
      },
    },
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록건수",
      dataType: "string",
      dataIndx: "regMapCount",
      align: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "수정건수",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "삭제건수",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  /* 맵 관리 그리드 */
  let colMapInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          let year = cellData.substring(0, 4);
          let month = cellData.substring(4, 6);
          let day = cellData.substring(6, 8);
          return `${year}-${month}-${day}`.trim();
        }
        return cellData;
      },
    },
    {
      title: "부서",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "업무구분",
      dataType: "string",
      dataIndx: "",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "내용",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "이전결재자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  /* 맵 이력 그리드 */
  let colMapRecInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "",
      align: "center",
      hidden: true,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          let year = cellData.substring(0, 4);
          let month = cellData.substring(4, 6);
          let day = cellData.substring(6, 8);
          return `${year}-${month}-${day}`.trim();
        }
        return cellData;
      },
    },
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "반송사유",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
})();
