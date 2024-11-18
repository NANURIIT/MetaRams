const TB10310Sjs = (function () {
  $(document).ready(function () {

    pqGrid();
    selectMenuListFromTB10310S();

    // keyDownEnter();
  });

  /**
   * 2024-11-07 김건우
   */

  /**
   * 전역변수
   */
  let prevParam;  // 저장이후 재조회시 필요한 param 전역변수
  let prevRowIndx;

  /**
   * PQGRID
   * @param {int} number 
   * @returns 
   */
  function setpqGridColModel(number) {

    const mdfyRghtCcd = [
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
     * 그룹코드
     */
    const GroupCodeColModel = [
      {
        title: "메뉴명",
        halign: "center",
        align: "left",
        dataType: "string",
        dataIndx: "menuNm",
        editable: false,
        render: function(ui) {
          let result = ui.cellData;
          const blank = "ㅤㅤ";
          return blank + result;
        }
      },
      {
        title: "메뉴화면ID",
        halign: "center",
        align: "center",
        dataType: "string",
        dataIndx: "menuId",
        editable: false,
      },
      {
        title: "하위메뉴",
        align: "center",
        halign: "center",
        dataType: "string",
        editable: false,
        width: "5%",
        render: function (ui) {
          if (ui.cellData === "new") {
            return "";
          } else {
            return (
              `<button class='ui-button ui-corner-all ui-widget' name='detail_btn' onclick="TB10310Sjs.selectAthCdListFromMenu('${ui.rowData.menuId}', ${ui.rowIndx});"><i class='fa fa-arrow-down'></i>&nbsp;상세</button>`
            );
          }
        },
      },
    ]

    /**
     * 권한코드
     */
    const athCodeColModel = [
      {
        title: "권한코드",
        halign: "center",
        align: "left",
        dataType: "string",
        dataIndx: "athCd",
        editable: false,
      },
      {
        title: "권한명",
        halign: "center",
        align: "left",
        dataType: "string",
        dataIndx: "athCdNm",
        editable: false,
      },
      {
        title: "권한설명",
        halign: "center",
        align: "left",
        dataType: "string",
        dataIndx: "athCdExpl",
        editable: false,
      },
      {
        title: "수정가능여부",
        dataIndx: "mdfyRghtCcd",
        align: "center",
        halign: "center",
        dataType: "string",
        menuIcon: false,
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
        title: "처리시간",
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
    ]

    if (number === 1) {
      return GroupCodeColModel;
    } else if (number === 2) {
      return athCodeColModel;
    } else {
      return;
    }

  }

  /**
   * PQGRID 오브젝트 설정
   */
  function pqGrid() {

    /********************************************************************
     * PQGrid Column
     ********************************************************************/

    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 240
        , maxHeight: 240
        , id: 'TB10310S_GroupCodeColModel'
        , colModel: setpqGridColModel(1)
        , editable: true
        , numberCell: {
          show: true,
          width: 60,
          resizable: true,
          title: "<p class='text-center'>순번</p>",
        }
        // , rowDblClick: function(evt, ui){
        //   /**
        //    * 더블클릭시 상세...??;;ㅌㅊㅋ??????????????ㅋㅌㅍ????????????????통일해야할듯??????????????????????
        //    */
        //   // selectAthCdListFromMenu(ui.rowData.menuId);
        // }
      },
      {
        height: 240
        , maxHeight: 240
        , id: 'TB10310S_athCodeColModel'
        , colModel: setpqGridColModel(2)
        , editable: true
        , numberCell: {
          show: true,
          width: 60,
          resizable: true,
          title: "<p class='text-center'>순번</p>",
        }
      },
    ];

    setPqGrid(pqGridObjs);

    $("#TB10310S_GroupCodeColModel").pqGrid('instance');
    $("#TB10310S_athCodeColModel").pqGrid('instance');

  };



  /**
   * SELECT문
   */

  /**
   * 그룹코드 조회
   */
  function selectMenuListFromTB10310S() {
    let param = $('#findMenu').val();

    if (!param) {
      param = '%'
    }

    console.log(param);

    $.ajax({
      method: "POST",
      url: "/TB10310S/selectMenuListFromTB10310S",
      contentType: "application/json; charset=UTF-8",
      data: param,
      success: function (data) {

        let grid = $('#TB10310S_GroupCodeColModel').pqGrid('instance');

        // 데이터 존재시 pqgrid적용
        if (data.length > 0) {
          grid.setData(data);
          grid.getData();
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

    $('#TB10310S_athCodeColModel').pqGrid('instance').setData([]);

  }


  /**
   * 권한코드 조회
   */
  function selectAthCdListFromMenu(param ,rowIndx) {

    $('#TB10310S_GroupCodeColModel').pqGrid('removeClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: prevRowIndx });
    $('#TB10310S_GroupCodeColModel').pqGrid('addClass', { cls: 'pq-state-select ui-state-highlight', rowIndx: rowIndx});

    prevParam = param;
    prevRowIndx = rowIndx;

    $.ajax({
      method: "POST",
      url: "/TB10310S/selectAthCdListFromMenu",
      contentType: "application/json; charset=UTF-8",
      data: param,
      success: function (data) {

        let grid = $('#TB10310S_athCodeColModel').pqGrid('instance');

        // 데이터 존재시 pqgrid적용
        if (data.length > 0) {
          grid.setData(data);
          grid.getData();
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
  }

  /**
   * UPDATE
   */

  /**
   * 권한저장
   */
  function updateAth() {

    const saveData = $('#TB10310S_athCodeColModel').pqGrid('instance').pdata;

    let updateData = []

    // 수정된 로우 모으기
    for (let i = 0; i < saveData.length; i++) {
      if (saveData[i].pq_cellcls != undefined) {
        updateData.push(saveData[i]);
      }
    }

    if (updateData.length === 0) {
      Swal.fire({
        icon: 'warning'
        , title: '수정 후 시도해주세요!'
      })
      return;
    }

    $.ajax({
      method: "POST",
      url: "/TB10310S/updateAth",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(updateData),
      success: function (data) {
        // 업데이트 성공시
        if (data > 0) {
          Swal.fire({
            icon: 'success'
            , title: '저장썽공!'
          })
        }
        // 업데이트 실패시
        else {
          Swal.fire({
            icon: 'warning'
            , title: '저장실패!'
          })
        }
      },
      // 업데이트 에러시
      error: function (response) {
        Swal.fire({
          icon: 'error'
          , title: '저장실패!@!!!!@!@!!!!'
        })
      },
      beforeSend: function() {
        selectAthCdListFromMenu(prevParam);
      }
    });


  }

  return {
    // 함수
    selectMenuListFromTB10310S: selectMenuListFromTB10310S   // 메뉴조회
    , selectAthCdListFromMenu: selectAthCdListFromMenu   // 메뉴별권한조회
    , updateAth: updateAth   // 메뉴별권한수정
  }

  /**
   * 2024-11-07 김건우 끝
   */

  // /* 전역변수 */
  // let lv1Id = "";
  // let lv2Id = "";
  // let lv3Id = "";

  // /*******************************************************************
  //  *** 공통 event
  //  *******************************************************************/
  // /**
  //  * 메뉴명 조회 ( null 입력 시 전체 메뉴 조회 )
  //  */
  // function findClickbutton() {
  //   let menuNm = $("#findMenu").val();

  //   $.ajax({
  //     url: "/findMenu",
  //     data: { menuNm: menuNm },
  //     success: function (data) {
  //       makeMenuList(data);
  //     },
  //     error: function (status) {
  //       console.error("status : " + status);
  //     },
  //   });
  // }

  // /**
  //  * 사용여부와 수정가능여부 클릭 모션
  //  * @param {this} 체크박스 클릭 이벤트 발생한 <input>
  //  */
  // function checkboxModifyYn(e) {
  //   // 수정가능여부
  //   let modifyYn = $(e);
  //   let thisTr = modifyYn.parent().parent();
  //   let checkedUseYn = thisTr.find("td:eq(4)").children();
  //   if (modifyYn.is(":checked")) {
  //     // 수정가능 여부를 체크(사용)할 때,
  //     checkedUseYn.prop("checked", true); // 사용 여부도 체크를 한다.
  //   }
  // }
  // function checkboxUseYn(e) {
  //   // 사용여부
  //   let useYn = $(e);
  //   let thisTr = useYn.parent().parent();
  //   let checkedModifyYn = thisTr.find("td:eq(5)").children();
  //   if (!useYn.is(":checked")) {
  //     // 사용 여부를 취소할 때,
  //     if (checkedModifyYn.is(":checked")) {
  //       // 수정가능 여부가 체크 되어 있으면,
  //       checkedModifyYn.prop("checked", false); // 수정가능 여부를 취소한다.
  //     }
  //   }
  // }

  // /**
  //  * 메뉴명 조회란에서 엔터 입력
  //  */
  // function keyDownEnter() {
  //   $("input[id=findMenu]").keydown(function (key) {
  //     if (key.keyCode == 13) {
  //       // 엔터키 입력 시 실행 (엔터의 keyCode 13)
  //       findClickbutton();
  //     }
  //   });
  // }

  // /**
  //  * 스크롤 액션 (테이블 reload 시 맨위로 스크롤 이동)
  //  */
  // function scrollAction() {
  //   let position = $("#makeMenuByAuthList").find("tr:eq(0)").position(); // 테이블 데이터 중 최상단 row의 position 위치를 받아오기.
  //   $(".tableFixHead").animate({ scrollTop: position }); // 받아온 위치값으로 원하는 <table>의 '상위태그 class'를 타겟으로 animate 조절.
  // }

  // /*******************************************************************
  //  *** 상단 그리드 event
  //  *******************************************************************/
  // /**
  //  * 메뉴 목록 출력 ( order by menu_id > 순번 rownum 정렬 )
  //  * @param {data} ajax로 response 받은 JSON data
  //  */
  // function makeMenuList(data) {
  //   let html = "";

  //   if (data.length <= 0) {
  //     html += "<tr>";
  //     html +=
  //       '    <td colspan="3" style="text-align: center">데이터가 없습니다.</td>';
  //     html += "</tr>";
  //   } else if (data.length > 0) {
  //     $.each(data, function (key, value) {
  //       html += '<tr ondblclick="TB10310Sjs.selectMenuRow(this);">';
  //       html += '<td style="text-align:right;">' + value.rowNum + "</td>";
  //       html += "<td>" + value.menuName + "</td>";
  //       html += "<td>" + value.lv2Id + "</td>";
  //       html += '<input type="hidden" value="' + value.lv1Id + '" />';
  //       html += '<input type="hidden" value="' + value.lv2Id + '" />';
  //       html += '<input type="hidden" value="' + value.lv3Id + '" />';
  //       html += "</tr>";
  //     });
  //   }
  //   $("#makeMenuList").html(html);
  // }

  // /**
  //  * 메뉴 권한 조회 ( 상단 그리드의 메뉴, 항목 더블클릭 )
  //  * @param {this} 더블클릭 이벤트 발생한 <tr>
  //  */
  // function selectMenuRow(e) {
  //   lv1Id = $(e).find("input:eq(0)").val();
  //   lv2Id = $(e).find("input:eq(1)").val();
  //   lv3Id = $(e).find("input:eq(2)").val();

  //   let idParam = {
  //     lv1Id: lv1Id,
  //     lv2Id: lv2Id,
  //     lv3Id: lv3Id,
  //   };

  //   makeMenuByAuthList(idParam);
  //   //	scrollAction();
  // }

  // /*******************************************************************
  //  *** 하단 그리드 event
  //  *******************************************************************/
  // /**
  //  * 권한별 메뉴의 사용, 수정 여부 목록 출력
  //  * @param {MENU_ID MAP} 메뉴ID 값을 담아 서버에 요청
  //  */
  // var makeMenuByAuthList = function (idParam) {
  //   let rowNum = 0;
  //   let html = "";

  //   $.ajax({
  //     url: "/menuByAuth",
  //     data: idParam,
  //     success: function (data) {
  //       /* make authority table */
  //       $.each(data, function (key, value) {
  //         rowNum++;
  //         html += "<tr>";
  //         html += '<td style="text-align:right;">' + rowNum + "</td>";
  //         html += '<td id="setRghtCd">' + value.athCd + "</td>";
  //         html += "<td>" + value.athCdNm + "</td>";
  //         html += "<td>" + value.athCdExpl + "</td>";
  //         html +=
  //           "<td>" +
  //           '<input id="setUseYn" style="width: 100%;" type="checkbox" onclick="checkboxUseYn(this);"/>' +
  //           "</td>";
  //         html +=
  //           "<td>" +
  //           '<input id="setModifyYn" style="width: 100%;" type="checkbox" onclick="checkboxModifyYn(this);"/>' +
  //           "</td>";
  //         html += '<td style="text-align:center;" id="setHndlDt"></td>';
  //         html += '<td style="text-align:center;" id="setHndlTm"></td>';
  //         html += '<td style="text-align:center;" id="setHndlPEno"></td>';
  //         html += "</tr>";
  //       });
  //       $("#makeMenuByAuthList").html(html);
  //       checkUseAndModifyYn(rowNum);
  //     },
  //     fail: function (status) {
  //       return console.error("error status : " + status);
  //     },
  //   });
  // };

  // /**
  //  * 메뉴별 권한관리 prop('checked')
  //  * @param {int} rowNum for문을 테이블의 길이 만큼으로 제한하기 위해
  //  */
  // var checkUseAndModifyYn = function (rowNum) {
  //   $.ajax({
  //     url: "/checkAvailableMenu",
  //     data: {
  //       lv1Id: lv1Id,
  //       lv2Id: lv2Id,
  //       lv3Id: lv3Id,
  //     },
  //     success: function (data) {
  //       /*
  // 		권한코드를 기준으로 DB에서 불러온 사용여부, 수정가능여부를 체크
  // 		make authority table의 rowNum으로 권한코드 한 행씩을 조회하여
  // 		DB데이터와 일치 하는 행이 있으면 사용가능, 수정가능 여부를 체크한다.
  // 		*/
  //       for (var i = 0; i < rowNum; i++) {
  //         var tableRghtCd = $("#makeMenuByAuthList")
  //           .find("tr:eq(" + i + ") > td:eq(1)")
  //           .html();
  //         var target = $("#makeMenuByAuthList").find("tr:eq(" + i + ")");
  //         $.each(data, function (key, val) {
  //           if (tableRghtCd == val.athCd) {
  //             if (val.mdfyRghtCcd === "1" || val.mdfyRghtCcd === "2") {
  //               target.find("#setUseYn").prop("checked", true);
  //               target.find("#setRghtCd").val(val.sq);
  //             }
  //             if (val.mdfyRghtCcd === "2") {
  //               target.find("#setModifyYn").prop("checked", true);
  //               target.find("#setRghtCd").val(val.sq);
  //             }
  //             target.find("#setHndlDt").html(val.hndDetlDtm.substring(0, 10));
  //             target.find("#setHndlTm").html(val.hndDetlDtm.substring(11, 19));
  //             target.find("#setHndlPEno").html(val.hndEmpno);
  //           }
  //         });
  //       }
  //     },
  //     error: function (request) {
  //       console.error("error code:" + request.status);
  //     },
  //   });
  // };

  // /**
  //  * 권한코드에 따른 사용, 수정 가능 여부를 체크
  //  */
  // var saveUseMenu = function () {
  //   let useCheckbox = $('input:checkbox[id="setUseYn"]:checked');
  //   let modifyCheckbox = $('input:checkbox[id="setModifyYn"]:checked');
  //   let saveRghtCd = "";
  //   let sq = "";

  //   let dtoParam = [];

  //   let idParam = {
  //     lv1Id: lv1Id,
  //     lv2Id: lv2Id,
  //     lv3Id: lv3Id,
  //   };

  //   /* 사용여부 */
  //   useCheckbox.each(function (i) {
  //     let tr = useCheckbox.parent().parent().eq(i);
  //     saveRghtCd = tr.children().eq(1).html();
  //     sq = tr.children().eq(1).val();
  //     /* 수정 가능하면 dtoParam 생성 금지 */
  //     if (!tr.children().eq(5).children().prop("checked")) {
  //       if (lv2Id != "" && lv3Id == "") {
  //         dtoParam.push({
  //           sq: sq,
  //           athCd: saveRghtCd,
  //           mdfyRghtCcd: "1",
  //           menuId: lv2Id,
  //           lv1Id: lv1Id,
  //           lv2Id: lv2Id,
  //           lv3Id: lv3Id,
  //         });
  //       } else if (lv3Id != "") {
  //         dtoParam.push({
  //           sq: sq,
  //           athCd: saveRghtCd,
  //           mdfyRghtCcd: "1",
  //           menuId: lv3Id,
  //           lv1Id: lv1Id,
  //           lv2Id: lv2Id,
  //           lv3Id: lv3Id,
  //         });
  //       }
  //     }
  //   });
  //   /* 수정가능여부 */
  //   modifyCheckbox.each(function (i) {
  //     let tr = modifyCheckbox.parent().parent().eq(i);
  //     saveRghtCd = tr.children().eq(1).html();
  //     sq = tr.children().eq(1).val();
  //     if (lv2Id != "" && lv3Id == "") {
  //       dtoParam.push({
  //         sq: sq,
  //         athCd: saveRghtCd,
  //         mdfyRghtCcd: "2",
  //         menuId: lv2Id,
  //         lv1Id: lv1Id,
  //         lv2Id: lv2Id,
  //         lv3Id: lv3Id,
  //       });
  //     } else {
  //       dtoParam.push({
  //         sq: sq,
  //         athCd: saveRghtCd,
  //         mdfyRghtCcd: "2",
  //         menuId: lv3Id,
  //         lv1Id: lv1Id,
  //         lv2Id: lv2Id,
  //         lv3Id: lv3Id,
  //       });
  //     }
  //   });
  //   /* 
  // 모든 항목(체크된 항목이 없을 경우) 또는 N개의 권한을 수정할 경우
  // 해당 화면의 lv1Id, lv2Id, lv3Id와 권한코드, SQ를 넘겨
  // 해당하는 데이터를 수정한다.
  // */
  //   let tableRow = $("#makeMenuByAuthList").children();
  //   tableRow.each(function (i) {
  //     let hndlPEno = $(this).children().eq(8).text();
  //     if (hndlPEno != 0) {
  //       sq = tableRow.eq(i).children().eq(1).val();
  //       saveRghtCd = tableRow.eq(i).children().eq(1).html();
  //       let use = $(this).children().eq(4).children();
  //       let modify = $(this).children().eq(5).children();
  //       if (!use.is(":checked") && !modify.is(":checked")) {
  //         dtoParam.push({
  //           sq: sq,
  //           menuId: "rghtCdCancel", // 서버에서 데이터 수정에 필요한 default 값
  //           athCd: saveRghtCd,
  //           lv1Id: lv1Id,
  //           lv2Id: lv2Id,
  //           lv3Id: lv3Id,
  //         });
  //       }
  //     }
  //   });

  //   if (dtoParam.length > 0) {
  //     $.ajax({
  //       url: "/saveUseMenu",
  //       method: "PATCH",
  //       data: JSON.stringify(dtoParam),
  //       contentType: "application/json; charset=UTF-8",
  //       success: function () {
  //         makeMenuByAuthList(idParam);
  //         openPopup({
  //           title: "성공",
  //           text: "저장이 완료되었습니다.",
  //           type: "success",
  //           callback: function () {
  //             $(document).on("click", ".confirm", function () {
  //               //scrollAction();
  //             });
  //           },
  //         });
  //       },
  //       error: function (status) {
  //         console.error("error status : " + status);
  //       },
  //     });
  //   } else if (dtoParam.length <= 0) {
  //     openPopup({
  //       title: "실패",
  //       text: "화면을 선택해주세요.",
  //       type: "error",
  //     });
  //   }
  // };

  // return {
  //   findClickbutton: findClickbutton,
  //   saveUseMenu: saveUseMenu,
  //   selectMenuRow: selectMenuRow,
  // };
})();
