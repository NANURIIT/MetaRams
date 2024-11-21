const TB02020Sjs = (function () {
  let pqGridWfDealInfo;
  let pqGridMapInfo;
  let pqGridMapHisInfo;

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
        scrollModel: { autoFit: false },
        cellClick: dealInfoCellClick,
      },
      {
        height: 300,
        maxHeight: 300,
        id: "TB02020_gridMapInfo",
        colModel: colMapInfo,
        scrollModel: { autoFit: false },
      },
      {
        height: 300,
        width: "100%",
        maxHeight: 300,
        id: "TB02020_gridMapHisInfo",
        colModel: colMapHisInfo,
        scrollModel: { autoFit: false },
      },
    ];
    setPqGrid(arrPqGridObj);

    pqGridWfDealInfo = $("#TB02020_gridWfDealInfo").pqGrid("instance");
    pqGridMapInfo = $("#TB02020_gridMapInfo").pqGrid("instance");
    pqGridMapHisInfo = $("#TB02020_gridMapHisInfo").pqGrid("instance");
  }

  // 딜 정보 데이터 가져오기
  function getWfDealInfo() {
    var param = {};

    $.ajax({
      type: "GET",
      url: "/TB02020S/getDealInfo",
      data: param,
      dataType: "json",
      success: function (data) {
        console.log(data);

        if (data && Array.isArray(data) && data.length > 0) {
          console.log("데이터 로드 성공:", data);
          pqGridWfDealInfo.setData(data);
        } else {
          console.log("데이터가 없거나 비어 있음");
          pqGridWfDealInfo.option("strNoRows", "조회된 데이터가 없습니다.");
        }
      },
    });
  }
  // 딜 정보 셀 클릭 시 맵관리/맵이력 데이터 호출
  function dealInfoCellClick(event, ui) {
    var wfMapId = ui.column.value;
    var wfStepId = ui.rowData["wfStepId"];
    console.log("맵:", ui.column.value, "스탭:", ui.rowData["wfStepId"]);

    getMapInfo(wfMapId, wfStepId);
    getMapHisInfo(wfMapId);

    //$("#modal-TB02020P").modal("show");
  }

  // 맵 관리 데이터 가져오기
  function getMapInfo(wfMapId, wfStepId) {
    var param = {
      wfMapId: wfMapId, // 맵아이디
      wfStepId: wfStepId, // 스탭아이디
    };

    $.ajax({
      type: "GET",
      url: "/TB02020S/getMapInfo",
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
  function getMapHisInfo(wfMapId) {
    var param = {
      wfMapId: wfMapId, // 맵아이디
    };

    $.ajax({
      type: "GET",
      url: "/TB02020S/getMapHisInfo",
      data: param,
      dataType: "json",
      success: function (data) {
        pqGridMapHisInfo.setData(data);
      },
    });
  }
  /* ***********************************그리드 컬럼******************************** */

  /* 딜 정보 그리드 */
  let colWfDealInfo = [
    {
      title: "순서",
      dataType: "string",
      dataIndx: "wfStepId",
      align: "center",
      width: "5%",
    },
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "stepNm",
      align: "center",
      width: "45%",
    },
    {
      title: "결재건수",
      dataType: "string",
      dataIndx: "wf01Count",
      align: "center",
      width: "15%",
      value: "WF01",
    },
    // TODO : 추후 카운트할 컬럼 정하여 추가예정
    // {
    //   title: "건수",
    //   dataType: "string",
    //   dataIndx: "wf02Count",
    //   align: "center",
    //   width: "15%",
    //   value: "WF02",
    // },
    // {
    //   title: "건수",
    //   dataType: "string",
    //   dataIndx: "wf03Count",
    //   align: "center",
    //   width: "15%",
    //   value: "WF03",
    // },
  ];

  /* 맵 관리 그리드 */
  let colMapInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "aprvDttm",
      align: "center",
      width: "10%",
      sortable: true,
      render: function (ui) {
        let cellData = ui.cellData;
        let year = cellData.substring(0, 4);
        let month = cellData.substring(4, 6);
        let day = cellData.substring(6, 8);
        return `${year}-${month}-${day}`.trim();
      },
    },
    {
      title: "부서",
      dataType: "string",
      dataIndx: "dprtNm",
      align: "center",
      width: "20%",
      sortable: true,
    },
    {
      title: "업무구분",
      dataType: "string",
      dataIndx: "wfMapNm",
      align: "center",
      width: "15%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "rtnYn",
      align: "center",
      width: "15%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        let rtn = "결재완료";
        if (cellData == "Y") {
          rtn = "반송";
          return rtn;
        }
        return rtn;
      },
    },
    {
      title: "내용",
      dataType: "string",
      dataIndx: "memoCnts",
      align: "center",
      width: "30%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "이전결재자",
      dataType: "string",
      dataIndx: "rreStep",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  /* 맵 이력 그리드 */
  let colMapHisInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "aprvDttm",
      align: "center",
      width: "20%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (
          (cellData && cellData.length === 8) ||
          (cellData && cellData.length === 17)
        ) {
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
      dataIndx: "stepNm",
      align: "center",
      width: "20%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "rtnYn",
      align: "center",
      width: "15%",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        let rtn = "결재완료";
        if (cellData == "Y") {
          rtn = "반송";
          return rtn;
        }
        return rtn;
      },
    },
    {
      title: "결재자",
      dataType: "string",
      dataIndx: "empNm",
      align: "center",
      width: "10%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "반송사유",
      dataType: "string",
      dataIndx: "rtnCnts",
      align: "center",
      width: "35%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
})();
