const TB10410Sjs = (function () {
  $(document).ready(function () {

    createHgrkSelectBox();

    pqGrid();

    hgrkMenuInq();

    // //상위메뉴 조회
    // menuSearch();
    // //상위메뉴 상세버튼 클릭
    // clickDetailButton();
    // //변경 가능한 컬럼 더블클릭 했을시 input박스 생성
    // doubleClick();
  });


  /**
   * PQGRID
   */
  /**
     * UPDATE INSERT 구분용 전역변수
     */
  let hgrkMenuDbData;
  let hgrkGroupMenuDbData;
  let prevParam;
  let prevRowIndx;

  /**
   * 셀렉트박스
   */
  let hgrkSelectBox = [
    {
      "value": ""
      , "menuLvl": 1
    }
  ];

  /**
   * 상위메뉴 셀렉트박스
   */
  function createHgrkSelectBox() {
    $.ajax({
      method: "POST",
      url: "/TB10410S/devsList",
      contentType: "application/json; charset=UTF-8",
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          hgrkSelectBox.push(
            {
              "value": data[i].menuId
              , "menuLvl": data[i].menuLvl
            }
          )
        }
      },
      error: function (response) {

      },
    })
  }


  /**
   * colmodel 세팅
   * @param {int} number 대충만듬
   */
  function setpqGridColModel(number) {

    const Yn = [
      { "Y": "Y" }
      , { "N": "N" }
    ]

    /**
     * 상위메뉴
     */
    const hgrkMenuColModel = [
      // {
      //   title: "",
      //   width: "3%",
      //   editable: false,
      //   render: function (ui) {
      //     if (ui.cellData === "del") {
      //       return (
      //         `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB10410Sjs.pqGridDeleteRow($('#TB10410S_hgrkMenuColModel'), '${ui.rowIndx}')">&nbsp;삭제</button>`
      //       );
      //     } else {
      //       return;
      //     }
      //   },
      // },
      {
        title: "메뉴ID",
        halign: "center",
        align: "center",
        dataType: "string",
        dataIndx: "menuId",
        editable: false,
        render: function (ui) {
          if (ui.rowData.menuLvl > 1) {
            let result = "";
            for (let i = 1; i < ui.rowData.menuLvl; i++) {
              result = result + "ㅤ"
            }
            return result + "└" + ui.cellData
          }
          return ui.cellData
        }
      },
      {
        title: "메뉴레벨",
        align: "right",
        halign: "center",
        dataType: "string",
        dataIndx: "menuLvl",
        width: "5%",
        editable: false,
      },
      {
        title: "정렬번호",
        align: "right",
        halign: "center",
        dataType: "string",
        dataIndx: "sortNo",
        editor: true,
        width: "5%",
      },
      {
        title: "상위메뉴ID",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "hgrkMenuId",
        editor: {
          type: "select",
          valueIndx: "value",
          labelIndx: "value",
          options: hgrkSelectBox
        },
      },
      {
        title: "메뉴명",
        align: "left",
        halign: "center",
        dataType: "string",
        dataIndx: "menuNm",
      },
      {
        title: "타이틀명",
        align: "left",
        halign: "center",
        dataType: "string",
        dataIndx: "shtnNm",
      },
      {
        title: "URL분류코드",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "urlClsfCd",
        width: "7%",
      },
      {
        title: "하위메뉴",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "inqBtn",
        editable: false,
        width: "5%",
        render: function (ui) {
          if (ui.cellData === "new") {
            return "";
          } else {
            return (
              `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB10410Sjs.hgrkGroupMenuInq('${ui.rowData.menuId}', '${ui.rowIndx}')"><i class='fa fa-arrow-down'></i>&nbsp;상세</button>`
            );
          }
        },
      },
      {
        title: "처리일시",
        dataType: "string",
        dataIndx: "hndDetlDtm",
        editable: false,
        align: "center",
        halign: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "처리자",
        dataType: "string",
        dataIndx: "hndEmpno",
        editable: false,
        align: "center",
        halign: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용여부",
        dataIndx: "aplyYn",
        align: "center",
        halign: "center",
        dataType: "string",
        menuIcon: false,
        editor: true,
        editable: "true",
        width: "5%",
        editor: {
          type: "select",
          options: Yn
        },
        // render: function () {
        //   // console.log(hgrkMenuDbData);
        // },
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
    ]

    /**
     * 하위메뉴
     */
    const menuColModel = [
      // {
      //   title: "",
      //   width: "3%",
      //   editable: false,
      //   render: function (ui) {
      //     if (ui.cellData === "del") {
      //       return (
      //         `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB10410Sjs.pqGridDeleteRow($('#TB10410S_menuColModel'), '${ui.rowIndx}')">&nbsp;삭제</button>`
      //       );
      //     } else {
      //       return;
      //     }
      //   },
      // },
      {
        title: "메뉴ID",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "menuId",
        editable: false,
      },
      {
        title: "메뉴레벨",
        align: "right",
        halign: "center",
        dataType: "string",
        dataIndx: "menuLvl",
        width: "5%",
        editable: false,
      },
      {
        title: "정렬번호",
        align: "right",
        halign: "center",
        dataType: "string",
        dataIndx: "sortNo",
        editor: true,
        width: "5%",
      },
      {
        title: "상위메뉴ID",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "hgrkMenuId",
        editable: false,
      },
      {
        title: "메뉴명",
        align: "left",
        halign: "center",
        dataType: "string",
        dataIndx: "menuNm",
      },
      {
        title: "타이틀명",
        align: "left",
        halign: "center",
        dataType: "string",
        dataIndx: "shtnNm",
      },
      {
        title: "URL",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "urlNm",
      },
      {
        title: "URL분류코드",
        align: "center",
        halign: "center",
        dataType: "string",
        dataIndx: "urlClsfCd",
        width: "7%",
      },
      {
        title: "처리일시",
        dataType: "string",
        dataIndx: "hndDetlDtm",
        editable: false,
        align: "center",
        halign: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "처리자",
        dataType: "string",
        dataIndx: "hndEmpno",
        editable: false,
        align: "center",
        halign: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용여부",
        dataIndx: "aplyYn",
        align: "center",
        halign: "center",
        dataType: "string",
        menuIcon: false,
        editor: true,
        editable: "true",
        width: "5%",
        editor: {
          type: "select",
          options: Yn
        },
      },
      {
        title: "삭제여부",
        dataIndx: "delYn",
        align: "center",
        halign: "center",
        menuIcon: false,
        type: "string",
        editor: false,
        dataType: "string",
        editable: true,
        width: "5%",
        editor: {
          type: "select",
          options: Yn
        },
      },
    ]

    if (number === 1) {
      return hgrkMenuColModel;
    } else if (number === 2) {
      return menuColModel;
    } else {
      return;
    }

  }

  /*
   *	PQGrid Options
   */
  function pqGrid() {

    /********************************************************************
     * PQGrid Column
     ********************************************************************/

    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 270
        , maxHeight: 270
        , id: 'TB10410S_hgrkMenuColModel'
        , colModel: setpqGridColModel(1)
        , editable: true
        , cellClick: function (evt, ui) {
          /**
           * 특정컬럼 기존셀렉트된건 수정 안되는데 행추가를 사용했을 경우에 입력가능하게 하는거...ㅜㅜㅜ
           */
          if (ui.rowData.inqBtn === "new" && ui.column.dataIndx === "menuId") {
            ui.column.editable = true;
          } else if (ui.rowData.inqBtn != "new" && ui.column.dataIndx === "menuId") {
            ui.column.editable = false;
          }
        }
        , cellSave: function (event, ui) {
          if(ui.rowData.menuId === ui.rowData.hgrkMenuId){
            Swal.fire({
              icon: 'warning'
              , title: '자기자신을 상위메뉴로 지정할 수 없습니다'
            })
            ui.rowData.hgrkMenuId = ui.oldVal;
            $("#TB10410S_hgrkMenuColModel").pqGrid("refreshDataAndView");
            return;
          }
          if (!ui.rowData.hgrkMenuId) {
            ui.rowData.menuLvl = 1;
            $("#TB10410S_hgrkMenuColModel").pqGrid("refreshDataAndView");
          } else {
            const selectedItem = hgrkSelectBox.find(item => item.value === ui.rowData.hgrkMenuId);
            ui.rowData.menuLvl = selectedItem.menuLvl + 1;
            $("#TB10410S_hgrkMenuColModel").pqGrid("refreshDataAndView");
          }
        }
      },
      {
        height: 270
        , maxHeight: 270
        , id: 'TB10410S_menuColModel'
        , colModel: setpqGridColModel(2)
        , editable: true
        , cellClick: function (evt, ui) {
          /**
           * 특정컬럼 기존셀렉트된건 수정 안되는데 행추가를 사용했을 경우에 입력가능하게 하는거...ㅜㅜㅜ
           */
          if (!ui.rowData.hndEmpno && ui.column.dataIndx === "menuId") {
            ui.column.editable = true;
          } else if (ui.rowData.hndEmpno && ui.column.dataIndx === "menuId") {
            ui.column.editable = false;
          }
        }
      },
    ];

    setPqGrid(pqGridObjs);

    $("#TB10410S_hgrkMenuColModel").pqGrid('instance');
    $("#TB10410S_menuColModel").pqGrid('instance');

  };

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
      const labelIndx = rowColumnsData[i].labelIndx;
      const dataIndx = rowColumnsData[i].dataIndx;
      row.push(title);
      if (title === "") {
        newRow[dataIndx] = "del";
      }
      else if (title === "하위메뉴") {
        newRow[dataIndx] = "new";
      }
      else if (title === "삭제여부" || title === "적용여부") {
        newRow[dataIndx] = "Y";
      }
      else if (title === "상위메뉴ID") {
        newRow[dataIndx] = prevParam;
      }
      else if (title === "메뉴레벨" && prevRowIndx) {
        newRow[dataIndx] = $("#TB10410S_hgrkMenuColModel").pqGrid('instance').pdata[prevRowIndx].menuLvl + 1;
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
   * pqgrid deleteRow
   */
  function pqGridDeleteRow(colModelSelector) {

    const rowIndx = colModelSelector.pqGrid('instance').pdata.length

    if(colModelSelector.pqGrid('instance').pdata[rowIndx-1].inqBtn === "new" || ( colModelSelector.pqGrid('instance').pdata[rowIndx-1].hndDetlDtm === "" && colModelSelector.pqGrid('instance').pdata[rowIndx-1].hndEmpno === "")){
      colModelSelector.pqGrid("deleteRow", {
        rowIndx: rowIndx - 1
      });
      return;
    }
    else{
      return;
    }
    
  }


  /**
   * PQGRID 끝
   */

  /**
   * SELECT문
   */
  /**
   * 상위메뉴조회
   */
  function hgrkMenuInq() {

    let param = $('#menuNm').val();

    if (!param) {
      param = "%"
    }

    $.ajax({
      method: "POST",
      url: "/TB10410S/hgrkMenuInq",
      contentType: "application/json; charset=UTF-8",
      data: param,
      success: function (data) {

        let grid = $('#TB10410S_hgrkMenuColModel').pqGrid('instance');

        // 데이터 존재시 pqgrid적용
        if (data.length > 0) {

          grid.setData(data);
          grid.getData();

          hgrkMenuDbData = JSON.parse(JSON.stringify(data));

        }
        // 데이터 없을시 확인가능한 alert 실행
        else {
          Swal.fire({
            icon: 'warning'
            , title: '조회된 정보가 없습니다!'
          })
          grid.setData([]);
        }
      },
      error: function (response) {

      },
    });

    // 하위메뉴 초기화
    prevParam = "";
    $('#TB10410S_menuColModel').pqGrid('instance').setData([]);

  }

  /**
   * 하위메뉴조회   버튼클릭메소드
   * @param {String} param 
   * @param {String} rowIndx
   */
  function hgrkGroupMenuInq(param, rowIndx) {

    $('#TB10410S_hgrkMenuColModel').pqGrid('removeClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: prevRowIndx });
    $('#TB10410S_hgrkMenuColModel').pqGrid('addClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: rowIndx });

    // $('#TB10410S_hgrkMenuColModel').pqGrid('click', { rowIndx: rowIndx })

    prevParam = param;
    prevRowIndx = rowIndx;

    $.ajax({
      method: "POST",
      url: "/TB10410S/hgrkGroupMenuInq",
      contentType: "application/json; charset=UTF-8",
      data: param,
      success: function (data) {

        let grid = $('#TB10410S_menuColModel').pqGrid('instance');

        // 데이터 존재시 pqgrid적용
        if (data.length > 0) {

          grid.setData(data);
          grid.getData();

          hgrkGroupMenuDbData = JSON.parse(JSON.stringify(grid.pdata));

        }
        // 데이터 없을시 확인가능한 alert 실행
        else {
          Swal.fire({
            icon: 'warning'
            , title: '조회된 정보가 없습니다!'
          })
          grid.setData([]);
          hgrkGroupMenuDbData = [];
        }
      },
      error: function (response) {

      },
    });

  }



  /**
   * 상위메뉴저장
   */
  async function SaveHgrkMenu() {

    const saveData = $('#TB10410S_hgrkMenuColModel').pqGrid('instance').pdata;

    let updateData = []
    let insertData = []

    // 수정된 로우 모으기
    for (let i = 0; i < hgrkMenuDbData.length; i++) {
      if (saveData[i].pq_cellcls != undefined) {
        updateData.push(saveData[i]);
      }
    }

    // 새로운 로우 모으기
    for (let i = hgrkMenuDbData.length; i < saveData.length; i++) {
      insertData.push(saveData[i]);
    }

    const updateResult = await updateMenu(updateData);
    const insertResult = await insertMenu(insertData);

    while (true) {
      // 귀찮아서 반복문으로 체크했음
      if (updateResult === undefined || insertResult === undefined) {
        wait(500);
        continue;
      } else {
        console.log(updateResult);
        console.log(insertResult);
        successChk(updateResult, insertResult);
        // 저장 후 조회
        hgrkGroupMenuDbData = []
        hgrkMenuInq();
        break;
      }
    }

  }


  /**
   * 하위메뉴저장
   */
  async function SaveHgrkGroupMenu() {

    const saveData = $('#TB10410S_menuColModel').pqGrid('instance').pdata;

    let updateData = []
    let insertData = []

    // 수정된 로우 모으기
    for (let i = 0; i < hgrkGroupMenuDbData.length; i++) {
      if (saveData[i].pq_cellcls != undefined) {
        updateData.push(saveData[i]);
      }
    }

    // 새로운 로우 모으기
    for (let i = hgrkGroupMenuDbData.length; i < saveData.length; i++) {
      insertData.push(saveData[i]);
    }

    const updateResult = await updateMenu(updateData);
    const insertResult = await insertMenu(insertData);

    while (true) {
      // 귀찮아서 반복문으로 체크했음
      if (updateResult === undefined || insertResult === undefined) {
        wait(500);
        continue;
      } else {
        console.log(updateResult);
        console.log(insertResult);
        successChk(updateResult, insertResult);
        // 저장 후 조회
        hgrkGroupMenuDbData = [];
        hgrkGroupMenuInq(prevParam);
        break;
      }
    }

  }

  function successChk(updateResult, insertResult) {
    // 검사
    if (updateResult > 0 && insertResult > 0) {
      Swal.fire({
        icon: 'success'
        , title: "저장 성공"
      })
    } else if (updateResult < 0 || insertResult < 0) {
      Swal.fire({
        icon: 'error'
        , title: "실패임(아무나 수정좀)"
      })
    } else {
      Swal.fire({
        icon: 'error'
        , title: "실패"
      })
    }
  }



  /**
   * INSERT
   * @param {List} insertData 저장이벤트에서 구분된 insertData
   */
  function insertMenu(insertData) {

    let result = 1;

    if (insertData.length === 0) {
      return result;
    }

    // 데이터 확인
    for (let i = 0; i < insertData.length; i++) {
      if (!insertData[i].menuId || insertData[i].menuId.indexOf(" ") > 0) {
        Swal.fire({
          icon: 'warning',
          title: '메뉴ID를 입력해주세요!'
        });
      }
      else if (!insertData[i].menuNm || insertData[i].menuNm.indexOf(" ") > 0) {
        Swal.fire({
          icon: 'warning',
          title: '메뉴명을 입력해주세요!'
        });
      }
      else if (!insertData[i].shtnNm || insertData[i].shtnNm.indexOf(" ") > 0) {
        Swal.fire({
          icon: 'warning',
          title: '타이틀명을 입력해주세요!'
        });
      }
      else if (!insertData[i].urlClsfCd || insertData[i].urlClsfCd.indexOf(" ") > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'URL분류코드를 입력해주세요!'
        });
      }
    }

    console.log(insertData);

    $.ajax({
      method: "POST",
      url: "/TB10410S/insertMenu",
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      data: JSON.stringify(insertData),
      success: function (data) {
        if (data > 0) {
          // 성공
          result = data;
        } else {
          // 저장된게 없긴함
          result = 0;
        }
      },
      error: function (response) {
        // 에러남 ㅋㅋ
        result = -1;
      },
    });

    return result;

  }

  /**
   * UPDATE
   * @param {List} updateData 저장이벤트에서 구분된 updateData
   */
  function updateMenu(updateData) {

    let result = 1;

    if (updateData.length === 0) {
      return result;
    }

    $.ajax({
      method: "POST",
      url: "/TB10410S/updateMenu",
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      data: JSON.stringify(updateData),
      success: function (data) {
        if (data > 0) {
          // 성공
          result = data;
        } else {
          // 저장된게 없긴함
          result = 0;
        }
      },
      error: function (response) {
        // 에러남 ㅋㅋ
        result = -1;
      },
    });

    return result;

  }










































  // /*변경 가능한 컬럼 더블클릭 했을시 input박스 생성*/
  // function doubleClick() {
  //   $(document).on("dblclick", ".update_column", function () {
  //     let trClass = $(this).attr("class").split(" ")[1];
  //     tdInputHTML =
  //       '<input class="' +
  //       trClass +
  //       $(this).text() +
  //       '">';
  //     $(this).html(tdInputHTML);
  //   });
  // }

  // function menuLoad() {
  //   let menuNm = $("#menuNm").val();
  //   getMenuSearchList(menuNm);
  // }

  // /*메뉴관리 조회버튼*/
  // function menuSearch() {
  //   $(document).on("click", "#menuSearch", function () {
  //     menuLoad();
  //   });
  // }

  // function getMenuSearchList(menuNm) {
  //   let dtoParam = {
  //     menuNm: menuNm,
  //   };

  //   $.ajax({
  //     type: "GET",
  //     url: "/mainMenuList",
  //     data: dtoParam,
  //     dataType: "json",
  //     success: function (data) {
  //       var a = "";
  //       $("#menuListTable").html(a);
  //       rebuildMenuListTable(data);
  //     },
  //   });
  // }

  // function rebuildMenuListTable(data) {
  //   var html = "";
  //   var menuList = data;

  //   if (menuList.length > 0) {
  //     $.each(menuList, function (key, value) {
  //       html += "<tr>";
  //       html += '<td class="update_column menuId">' + value.menuId + "</td>"; //메뉴ID
  //       html += '<td class="update_column">' + value.sortNo + "</td>"; //정렬번호
  //       html += '<td class="update_column">' + value.urlVrbCntn + "</td>"; //화면번호
  //       html += '<td class="update_column">' + value.menuNm + "</td>"; //메뉴명
  //       html += '<td class="update_column">' + value.shtnNm + "</td>"; //메뉴설명
  //       html += '<td class="update_column">' + value.urlClsfCd + "</td>"; //URL문류코드
  //       html +=
  //         '	<td><button class="mainMenuDetail btn btn-warning btn-xs" id="' +
  //         value.menuId +
  //         '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>'; //하위메뉴
  //       html += "<td>" + value.hndDetlDtm + "</td>"; //처리일시
  //       html += "<td>" + value.hndEmpNm + "</td>"; //처리자
  //       if (value.aplyYn === "N") {
  //       } else {
  //       }
  //       html += "</tr>";
  //     });
  //   } else {
  //     html += "<tr>";
  //     html +=
  //       '	<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';
  //     html += "</tr>";
  //   }
  //   $("#menuListTable").html(html);
  // }

  // /**
  //  * 그룹코드의 메뉴관리 상세버튼 클릭
  //  */
  // function clickDetailButton() {
  //   $(document).on("click", ".mainMenuDetail", function (e) {
  //     e.preventDefault();
  //     menuId = $(this).attr("id");
  //     getMenuIdInfo($(this).attr("id"));
  //   });
  // }

  // /*상위메뉴 상세보기 데이터 호출  */
  // var getMenuIdInfo = function (menuId) {
  //   $.ajax({
  //     url: "mainMenuInfo?menuId=" + menuId,
  //     method: "GET",
  //     dataType: "json",
  //   }).done(function (mainMenuList) {
  //     let html = "";
  //     if (mainMenuList.length > 0) {
  //       for (let i = 0; i < mainMenuList.length; i++) {
  //         let menuInfo = mainMenuList[i];

  //         html += '<tr id="' + menuId + '">';
  //         html += `<td>
  //                  </td>`;
  //         html += '<td class="update_column menuId">' + menuInfo.menuId + "</td>"; //메뉴ID
  //         html += '<td class="update_column">' + menuInfo.sortNo + "</td>"; //정령번호
  //         html += '<td class="update_column">' + menuInfo.urlVrbCntn + "</td>"; //화면번호
  //         html += '<td class="update_column">' + menuInfo.menuNm + "</td>"; //메뉴명
  //         html += '<td class="update_column">' + menuInfo.shtnNm + "</td>"; //메뉴설명
  //         html += '<td class="update_column">' + menuInfo.urlNm + "</td>"; //화면ID
  //         html += '<td class="update_column">' + menuInfo.urlClsfCd + "</td>"; //URL분류코드
  //         html += "<td>" + menuInfo.hndDetlDtm + "</td>"; //처리일
  //         html += "<td>" + menuInfo.hndEmpNm + "</td>"; //처리자
  //         if (menuInfo.aplyYn === "N") {
  //         } else {
  //         }
  //         html += "</tr>";
  //       }
  //     } else {
  //       html += "<tr>";
  //       html += '<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';
  //       html += "</tr>";
  //     }

  //     $("#subMenuListTable").html(html);
  //   });
  // };

  // /* 상위메뉴 행추가 버튼 클릭*/
  // function addMenuRow() {
  //   var html = "";

  //   html += "<tr>";
  //   html += "	<td></td>";
  //   html += "	<td></td>"; //화면번호
  //   html += '	<td><input type="text"></td>'; //메뉴명
  //   html += '	<td><input type="text"></td>'; //메뉴설명
  //   html += "	<td></td>";
  //   html += "	<td></td>";
  //   html += "	<td></td>";
  //   html += "</tr>";
  //   $("#menuListTable").append(html);
  // }

  // /*상위메뉴 행삭제 버튼 클릭*/
  // function deleteMenuRow() {
  //   let mainList = new Array();
  //   let tr = $("#menuListTable").children();

  //   for (let i = 0; i < tr.length; i++) {
  //     let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
  //     if (deleteCheckBox.is(":checked")) {
  //       mainList.push(deleteCheckBox.attr("id"));
  //     }
  //   }

  //   if (mainList.length != 0) {
  //     deleteMainMenu(mainList);
  //   }
  // }

  // /* 상위메뉴 행삭제 처리*/
  // var deleteMainMenu = function (mainList) {
  //   $.ajax({
  //     method: "PATCH",
  //     url: "/deleteMainMenuInfo",
  //     data: JSON.stringify(mainList),
  //     contentType: "application/json; charset=UTF-8",
  //     dataType: "json",
  //     success: function () {
  //       menuLoad();
  //     },
  //     error: function (response) { },
  //   });
  // };

  // /* 상위메뉴 저장 버튼 클릭*/
  // function clickSaveMainMenu() {
  //   let mainMenuList = new Array();

  //   let tr = $("#menuListTable").children();

  //   for (let i = 0; i < tr.length; i++) {
  //     let mainMenu = new Object();

  //     let menuIdInput = $(tr[i]).find("td:eq(1)").find("input");
  //     let srtNoInput = $(tr[i]).find("td:eq(2)").find("input");
  //     let urlPrmtrCntntInput = $(tr[i]).find("td:eq(3)").find("input");
  //     let menuNmInput = $(tr[i]).find("td:eq(4)").find("input");
  //     let shrtNmInput = $(tr[i]).find("td:eq(5)").find("input");
  //     let urlDvdCdInput = $(tr[i]).find("td:eq(6)").find("input");
  //     let dltFYn = $(tr[i]).find("td:eq(10)").find(".aply_Yn").prop("checked");
  //     let dltFYnCheck = $(tr[i]).find("td:eq(10)").find(".hidden_yn").val();

  //     if (menuIdInput.length == 1) {
  //       if (menuIdInput.val().length > 8) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴ID는 8자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               menuIdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!menuIdInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴ID를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               menuIdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       mainMenu.menuId = menuIdInput.val();
  //     }

  //     if (srtNoInput.length == 1) {
  //       if (srtNoInput.val().length > 5) {
  //         openPopup({
  //           title: "실패",
  //           text: "정렬번호는 5자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               srtNoInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!srtNoInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "정렬번호를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               srtNoInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }

  //       mainMenu.sortNo = srtNoInput.val();
  //     } else {
  //       if (
  //         menuIdInput.length == 1 ||
  //         urlPrmtrCntntInput.length == 1 ||
  //         menuNmInput.length == 1 ||
  //         shrtNmInput.length == 1 ||
  //         urlDvdCdInput.length == 1
  //       ) {
  //         mainMenu.sortNo = $(tr[i]).find("td:eq(2)").text();
  //       }

  //       if (
  //         !dltFYnCheck ||
  //         (!dltFYn && dltFYnCheck === "Y") ||
  //         (dltFYn && dltFYnCheck === "N")
  //       ) {
  //         mainMenu.sortNo = $(tr[i]).find("td:eq(2)").text();
  //       }
  //     }

  //     if (urlPrmtrCntntInput.length == 1) {
  //       if (urlPrmtrCntntInput.val().length > 200) {
  //         openPopup({
  //           title: "실패",
  //           text: "화면번호는 200자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               urlPrmtrCntntInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!urlPrmtrCntntInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "화면번호를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               urlPrmtrCntntInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }

  //       mainMenu.urlVrbCntn = urlPrmtrCntntInput.val();
  //     }

  //     if (menuNmInput.length == 1) {
  //       if (menuNmInput.val().length > 50) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴명은 50자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               menuNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!menuNmInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴명을 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               menuNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       mainMenu.menuNm = menuNmInput.val();
  //     }

  //     if (shrtNmInput.length == 1) {
  //       if (shrtNmInput.val().length > 100) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴설명은 100자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               shrtNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!shrtNmInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴설명을 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               shrtNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       mainMenu.shtnNm = shrtNmInput.val();
  //     }

  //     if (urlDvdCdInput.length == 1) {
  //       if (urlDvdCdInput.val().length > 2) {
  //         openPopup({
  //           title: "실패",
  //           text: "URL분류코드는 2자리 이하여야 합니다.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               urlDvdCdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (!urlDvdCdInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "URL분류코드를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               urlDvdCdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       mainMenu.urlClsfCd = urlDvdCdInput.val();
  //     }

  //     if (
  //       !dltFYnCheck ||
  //       (!dltFYn && dltFYnCheck === "Y") ||
  //       (dltFYn && dltFYnCheck === "N")
  //     ) {
  //       mainMenu.aplyYn = dltFYn ? "Y" : "N";
  //     }

  //     if (!(Object.keys(mainMenu).length === 0)) {
  //       mainMenu.oldMenuId = $(tr[i]).find("td:eq(0)").find("input").attr("id");
  //       mainMenuList.push(mainMenu);
  //     }
  //   }

  //   if (mainMenuList.length != 0) {
  //     saveMainMenu(mainMenuList);
  //   }
  // }

  // /*상위메뉴 저장 처리*/
  // var saveMainMenu = function (groupCodeList) {
  //   $.ajax({
  //     method: "POST",
  //     url: "/registMainMenuInfo",
  //     data: JSON.stringify(groupCodeList),
  //     contentType: "application/json; charset=UTF-8",
  //     dataType: "json",
  //     success: function () {
  //       menuLoad();
  //     },
  //     error: function (response) {
  //       let message = response.responseJSON.message;
  //       openPopup({
  //         title: "실패",
  //         text: message,
  //       });
  //     },
  //   });
  // };

  // /*********************************************** */
  // /* 하위메뉴 행추가 버튼 클릭*/
  // function addSubMenuRow() {
  //   let td = $("#subMenuListTable").children().find("td");

  //   var html = "";

  //   html += "<tr>";
  //   html += "	<td></td>";
  //   html += "	<td></td>"; //화면번호
  //   html += '	<td><input type="text"></td>'; //메뉴명
  //   html += '	<td><input type="text"></td>'; //메뉴설명
  //   html += '	<td><input type="text"></td>'; //화면ID
  //   html += "	<td></td>";
  //   html += "	<td></td>";
  //   html += "	<td></td>";
  //   html += "</tr>";

  //   if (td.length === 1) {
  //     $("#subMenuListTable").html(html);
  //   } else if (td.length > 1) {
  //     $("#subMenuListTable").append(html);
  //   }
  // }

  // /*하위메뉴 행삭제 버튼 클릭*/
  // function deleteSubMenuRow() {
  //   let subMenuList = new Array();
  //   let tr = $("#subMenuListTable").children();

  //   for (let i = 0; i < tr.length; i++) {
  //     let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
  //     if (deleteCheckBox.is(":checked")) {
  //       subMenuList.push(deleteCheckBox.attr("id"));
  //     }
  //   }

  //   if (subMenuList.length != 0) {
  //     deleteSubMenu(subMenuList);
  //   }
  // }

  // /* 하위메뉴 행삭제 처리*/
  // var deleteSubMenu = function (subMenuList) {
  //   $.ajax({
  //     method: "PATCH",
  //     url: "/deleteSubMenuInfo",
  //     data: JSON.stringify(subMenuList),
  //     contentType: "application/json; charset=UTF-8",
  //     dataType: "json",
  //     success: function () {
  //       menuLoad();
  //       getMenuIdInfo(menuId);
  //       Swal.fire({
  //         icon: 'success'
  //         , title: '삭제가 되었습니다!'
  //       })
  //     },
  //     error: function (response) { },
  //   });
  // };

  // /*하위메뉴 저장 버튼 클릭*/
  // function clickSaveSubMenu() {
  //   let subMenuList = [];
  //   let tr = $("#subMenuListTable").children();
  //   for (let i = 0; i < tr.length; i++) {
  //     let subMenu = {};

  //     // TODO => 변수 할당 확인
  //     let mainMenuId = menuId;
  //     let oldSubMenuId = $(tr[i]).find("td:eq(0)").find("input").attr("id");
  //     let subMenuIdInput = $(tr[i]).find("td:eq(1)").find("input");
  //     let subSrtNoInput = $(tr[i]).find("td:eq(2)").find("input");
  //     let subUrlPrmtrCntntInput = $(tr[i]).find("td:eq(3)").find("input");
  //     let subMenuNmInput = $(tr[i]).find("td:eq(4)").find("input");
  //     let subShrtNmInput = $(tr[i]).find("td:eq(5)").find("input");
  //     let subUrlNmInput = $(tr[i]).find("td:eq(6)").find("input");
  //     let subUrlDvdCdInput = $(tr[i]).find("td:eq(7)").find("input");
  //     let dltFYn = $(tr[i]).find("td:eq(10)").find(".aply_Yn").prop("checked");
  //     let dltFYnCheck = $(tr[i]).find("td:eq(10)").find(".hidden_yn").val();

  //     if (subMenuIdInput.length == 1) {
  //       if (!subMenuIdInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴ID를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subMenuIdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subMenuIdInput.val().length > 8) {
  //         openPopup({
  //           title: "실패",
  //           text: "코드는 8자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subMenuIdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.menuId = subMenuIdInput.val();
  //     }

  //     if (subSrtNoInput.length == 1) {
  //       if (!subSrtNoInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "정렬번호를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subSrtNoInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subSrtNoInput.val().length > 5) {
  //         openPopup({
  //           title: "실패",
  //           text: "정렬번호는 5자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subSrtNoInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.sortNo = subSrtNoInput.val();
  //     }

  //     if (subUrlPrmtrCntntInput.length == 1) {
  //       if (!subUrlPrmtrCntntInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "화면번호를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subUrlPrmtrCntntInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subUrlPrmtrCntntInput.val().length > 200) {
  //         openPopup({
  //           title: "실패",
  //           text: "화면번호는 200자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subUrlPrmtrCntntInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.urlVrbCntn = subUrlPrmtrCntntInput.val();
  //     }

  //     if (subMenuNmInput.length == 1) {
  //       if (!subMenuNmInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴명을 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subMenuNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subMenuNmInput.val().length > 50) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴명은 50자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subMenuNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.menuNm = subMenuNmInput.val();
  //     }

  //     if (subShrtNmInput.length == 1) {
  //       if (!subShrtNmInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴설명을 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subShrtNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subShrtNmInput.val().length > 100) {
  //         openPopup({
  //           title: "실패",
  //           text: "메뉴설명은 100자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subShrtNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.shtnNm = subShrtNmInput.val();
  //     }

  //     if (subUrlNmInput.length == 1) {
  //       if (!subUrlNmInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "URL을 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subUrlNmInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.urlNm = subUrlNmInput.val();
  //     }

  //     if (subUrlDvdCdInput.length == 1) {
  //       if (!subUrlDvdCdInput.val()) {
  //         openPopup({
  //           title: "실패",
  //           text: "URL분류코드를 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subUrlDvdCdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       } else if (subUrlDvdCdInput.val().length > 2) {
  //         openPopup({
  //           title: "실패",
  //           text: "URL분류코드는 2자리 이하로 입력해주세요.",
  //           type: "error",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               subUrlDvdCdInput.focus();
  //             });
  //           },
  //         });
  //         return;
  //       }
  //       subMenu.urlClsfCd = subUrlDvdCdInput.val();
  //     }

  //     if (
  //       !dltFYnCheck ||
  //       (!dltFYn && dltFYnCheck === "Y") ||
  //       (dltFYn && dltFYnCheck === "N")
  //     ) {
  //       subMenu.aplyYn = dltFYn ? "Y" : "N";
  //     }

  //     subMenu.oldSubMenuId = oldSubMenuId;
  //     subMenu.hgrkMenuId = mainMenuId; //상위메뉴ID

  //     subMenuList.push(subMenu);
  //   }

  //   if (subMenuList.length > 0) {
  //     saveSubMenu(subMenuList);
  //   }
  // }
  // /* 하위 메뉴 저장 처리*/
  // var saveSubMenu = function (subMenuList) {
  //   $.ajax({
  //     method: "POST",
  //     url: "/registSubMenuInfo",
  //     data: JSON.stringify(subMenuList),
  //     contentType: "application/json; charset=UTF-8",
  //     dataType: "json",
  //     success: function () {
  //       menuLoad();
  //       getMenuIdInfo(menuId);
  //       Swal.fire({
  //         icon: 'success'
  //         , title: '저장이 되었습니다!'
  //       })
  //     },
  //     error: function (response) {
  //       let message = response.responseJSON.message;
  //       openPopup({
  //         title: "실패",
  //         text: message,
  //       });
  //     },
  //   });
  // };


  return {
    // addMenuRow: addMenuRow,
    // deleteMenuRow: deleteMenuRow,
    // clickSaveMainMenu: clickSaveMainMenu,
    // addSubMenuRow: addSubMenuRow,
    // deleteSubMenuRow: deleteSubMenuRow,
    // clickSaveSubMenu: clickSaveSubMenu,
    hgrkMenuInq: hgrkMenuInq,
    hgrkGroupMenuInq: hgrkGroupMenuInq,
    pqGridAddNewRow: pqGridAddNewRow,
    pqGridDeleteRow: pqGridDeleteRow,
    SaveHgrkMenu: SaveHgrkMenu,
    SaveHgrkGroupMenu: SaveHgrkGroupMenu,
  };
})();
