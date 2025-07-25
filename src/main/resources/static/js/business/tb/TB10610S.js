const TB10610Sjs = (function () {
  let batSchM; // 그리드 instance
  let objSlc = {}; // select obj
  let argument;
  let tempObj = {}; // temp boj

  $(document).ready(function () {
    selectBox();
    pqGrid();
    $("#TB10610S_exc_argument").prop("disabled", true);
    $("#TB10610S_curDate").val(getToday());
    $("#btnExc").prop("disabled", true);
    radioBtnController("");
  });

  /*******************************************************************
   * SelectBox
   *******************************************************************/
  function selectBox() {
    getSlcBx = getSelectBoxList("TB10610S", "J002" + "/B027", false); // 작업상태코드

    objSlc.J002 = getSlcBx.filter((it) => it.cmnsGrpCd === "J002"); // 작업상태코드
    objSlc.B027 = getSlcBx.filter((it) => it.cmnsGrpCd === "B027"); // 배치명령코드

    objSlc.J002.forEach((item) => {
      $("#TB10610S_jobSts").append(
        $("<option>", {
          value: item.cdValue,
          text: `[${item.cdValue}] ${item.cdName}`,
        })
      );
    });

    objSlc.B027.forEach((item) => {
      if( item.cdValue != "1" ) {
        // option은 배치명령이 없어야함
        $("#TB10610S_batchCmdDcd_input").append(
          `
            <span class="input-group">
              <input type="radio" value="${item.cdValue}" id="" name="TB10610S_batchCmdDcd">
              <label class="col-sm-5 text-nowrap font-weight-normal">[${item.cdValue}] ${item.cdName}</label>
            </span>
          `
        );
      }
    });
  }

  /*******************************************************************
   * PQGrid
   *******************************************************************/
  function pqGrid() {
    // 배치 스케줄러 모니터링 컬럼
    let col_batSchM = [
      {
        title: "기준일자",
        dataType: "string",
        dataIndx: "curDate",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          return formatDate(cellData);
        },
      },
      {
        title: "수행시간",
        halign: "center",
        colModel: [
          {
            title: "시작시간",
            dataType: "string",
            dataIndx: "startTime",
            halign: "center",
            align: "center",
            render: function (ui) {
              let cellData = ui.cellData;
              if (ui.cellData) {
                let hour = cellData.substring(8, 10);
                let min = cellData.substring(10, 12);
                let sec = cellData.substring(12, 14);
                // let msec = cellData.substring(8, 11)
                return `${hour}:${min}:${sec}`;
              } else {
                return `-`;
              }
            },
          },
          {
            title: "종료시간",
            dataType: "string",
            dataIndx: "endTime",
            halign: "center",
            align: "center",
            render: function (ui) {
              let cellData = ui.cellData;
              if (ui.cellData) {
                let hour = cellData.substring(8, 10);
                let min = cellData.substring(10, 12);
                let sec = cellData.substring(12, 14);
                // let msec = cellData.substring(8, 11)
                return `${hour}:${min}:${sec}`;
              } else {
                return `-`;
              }
            },
          },
        ],
      },
      {
        title: "배치 JOB ID",
        dataType: "string",
        dataIndx: "jobId",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "배치명",
        dataType: "string",
        dataIndx: "jobName",
        halign: "center",
        align: "left",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "ARGUMENT",
        dataType: "string",
        dataIndx: "argument",
        halign: "center",
        align: "left",
        width: "20%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "작업상태",
        dataType: "string",
        dataIndx: "jobStatus",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function(ui) {
          let fSel = objSlc.J002.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        }
      },
      {
        title: "배치명령유형",
        dataType: "string",
        dataIndx: "batchCmdDcd",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function(ui) {
          let fSel = objSlc.B027.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        }
      },
      {
        title: "실행 횟수",
        dataType: "string",
        dataIndx: "runCount",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
      },
      /**
       * 2025-02-21 김건우
       * 회의때 삭제하래요
       */
      // {
      //   title: "CONFIRM 상태",
      //   dataType: "string",
      //   dataIndx: "confirmYn",
      //   halign: "center",
      //   align: "center",
      //   // width    : '10%',
      //   filter: { crules: [{ condition: "range" }] },
      // },
    ];

    let pqGridObjs = [
      {
        height: 400,
        maxHeight: 400,
        id: "grd_batSchM",
        colModel: col_batSchM,
        /*selectionModel: { type: "row" },*/
        //   , scrollModel : { autoFit: false }
      },
    ];
    setPqGrid(pqGridObjs);
    // Grid instance
    batSchM = $("#grd_batSchM").pqGrid("instance");
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  // 조회
  function inqBatch() {
    let obj = {
      jobId: $("#TB10610S_jobId").val(),
      jobName: $("#TB10610S_jobName").val(),
      curDate: unformatDate($("#TB10610S_curDate").val()),
      jobStatus: $("#TB10610S_jobSts").val(),
    };

    $.ajax({
      type: "POST",
      url: "/TB10610S/inqBatch",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(obj),
      dataType: "json",
      beforeSend: function (xhr) {
        reset();
      },
      success: function (data) {
        if (data && data.batSchM.length > 0) {
          batSchM.setData(data.batSchM);

          // pqgrid_rowselect
          batSchM.on("rowClick", function (evt, ui) {

            let al = ui.rowData;

			      pqGridSelectHandler ( ui.rowIndx, "grd_batSchM" );

              /*let rd = al[0].rowData;*/
			        let rd = batSchM.pdata[ui.rowIndx]
              let jobId = rd.jobId;
              let jobName = rd.jobName;
              let curDate = rd.curDate;
              let jobStatus = rd.jobStatus;
              let confirmYn = rd.confirmYn;
              let argument = rd.argument;

              $("#TB10610S_exc_jobId").val(jobId);
              $("#TB10610S_exc_jobName").val(jobName);
              // $('#TB10610S_exc_jobSts').val(jobStatus)

              $("#TB10610S_exc_cfm").val(confirmYn);
              $("#btnExc").prop("disabled", false);
              $("#TB10610S_exc_curDate").val(formatDate(curDate));
              $("#TB10610S_exc_argument").prop("disabled", true);
              if (rd.jobId === "TB9990B") {
                $("#TB10610S_exc_argument").prop("disabled", false);
              }
              argument = argument;

              radioBtnController(jobStatus);

              tempObj.confirmYn = confirmYn;

              /*
               *  이렇게하면 밸류가 7로 지정됩니다...
               */
              // $('input[name="TB10610S_exc_jobSts"]').val('7').prop('checked', true)

              /*
               *  이렇게 선택하셔야 합니다
               */
              $('input[name="TB10610S_exc_jobSts"][value="7"]').prop(
                "checked",
                true
              );

            // else {
            //   $("#TB10610S_exc_curDate").val("");
            //   $("#TB10610S_exc_jobId").val("");
            //   $("#TB10610S_exc_jobName").val("");
            //   $("#TB10610S_exc_jobSts").val("");
            //   $("#TB10610S_exc_cfm").val("");
            //   // $('#TB10610S_exc_jobSts').prop('disabled', false)
            //   $("#btnConfTxt").text("확인");
            //   $("#btnConfirm").prop("disabled", false);
            //   $('input[name="TB10610S_batchCmdDcd"]').prop("disabled", false);
            //   $('input[name="TB10610S_batchCmdDcd"]').prop("checked", false);
            //   $('#btnExc').prop('disabled', true)
            //   radioBtnController("");
            //   tempObj = {};
            // }
          });

          // batSchM.on("rowUnSelect", function (evt, ui) {
          //     $("#btnExc").prop("disabled", true);
          // });
        } else {
          Swal.fire({
            icon: "warning",
            text: "조회된 내역이 없습니다.",
            confirmButtonText: "확인",
          });
        }
      },
    });
  }

  /**
   * 현재배치 작업상태에 따라서 가능한 배치명령컨트롤
   * @param { String } jobStatus 작업상태
   */
  function radioBtnController ( jobStatus ) {
    // |J002      |배치작업상태      |JOB_STATUS     |1        |1       |Not Running |1        |Not Running |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |2       |Waitting    |2        |Waitting    |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |3       |Running     |3        |Running     |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |4       |Complete    |4        |Complete    |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |5       |Error       |5        |Error       |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |6       |Terminate   |6        |Terminate   |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |7       |Terminated  |7        |Terminated  |
    // |J002      |배치작업상태      |JOB_STATUS     |1        |8       |Stop        |8        |Stop        |

    // |B027      |배치명령유형코드    |BATCH_CMD_DCD  |1        |1       |Batch       |1        |Batch       |
    // |B027      |배치명령유형코드    |BATCH_CMD_DCD  |1        |2       |Forced-OK   |2        |Forced-OK   |
    // |B027      |배치명령유형코드    |BATCH_CMD_DCD  |1        |3       |(Re)Run     |3        |(Re)Run     |
    // |B027      |배치명령유형코드    |BATCH_CMD_DCD  |1        |4       |Kill        |4        |Kill        |
    // |B027      |배치명령유형코드    |BATCH_CMD_DCD  |1        |5       |Brake       |5        |Brake       |
    
    // Not Running, Complete, Error 인 경우 Brake 가능
    // Not Running, Error 인경우 Forced-OK 가능
    // Complete, Error인경우 Rerun 가능
    // Running 인 경우 Kill 가능

    $('input[name="TB10610S_batchCmdDcd"]').prop('checked', false);
    
    // Not Running
    if ( jobStatus === "1" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // Waitting
    else if ( jobStatus === "2" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // Running
    else if ( jobStatus === "3" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // Complete
    else if ( jobStatus === "4" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // Error
    else if ( jobStatus === "5" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // 배치프로세스 자체가 종료된 상태
    // Terminate
    else if ( jobStatus === "6" ) {

    }
    // Terminated
    else if ( jobStatus === "7" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }
    // Stop
    else if ( jobStatus === "8" ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"][value="2"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="3"]').prop('disabled', false).next().css({ color : "" });
      $('input[name="TB10610S_batchCmdDcd"][value="4"]').prop('disabled', false).next().css({ color : "" });

      $('input[name="TB10610S_batchCmdDcd"][value="1"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('input[name="TB10610S_batchCmdDcd"][value="5"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }

    else {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      // $('input[name="TB10610S_batchCmdDcd"][value="5"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
    }

    // 기준일자가 오늘이 아닐경우
    if ( $('#TB10610S_curDate').val() != $('#bzDdDisplay span:first').html() ) {
      $('input[name="TB10610S_batchCmdDcd"]').prop('disabled', true);
      $('input[name="TB10610S_batchCmdDcd"]').next().css({ color : "rgba(118, 118, 118, 0.3)" });
      $('#btnExc').prop('disabled', true);
    }
  }

  // 실행
  function excBatch() {
    let jobId = $("#TB10610S_exc_jobId").val();
    let curDate = unformatDate($("#TB10610S_exc_curDate").val());
    let batchCmdDcd = $('input[name="TB10610S_batchCmdDcd"]:checked').val();
    let batchCmdTxt = $('input[name="TB10610S_batchCmdDcd"]:checked').next('label').text();
    let confirmYn = $("#TB10610S_exc_cfm").val();
    let argument = $("#TB10610S_exc_argument").val();

    let obj = {
      jobId,
      jobName: $("#TB10610S_exc_jobName").val(),
      batchCmdDcd,
      curDate,
      confirmYn,
      argument,
    };

    if (jobId && curDate) {
      if (!batchCmdDcd) {
        Swal.fire({
          icon: "warning",
          text: `배치명령을 확인해주세요.`,
          confirmButtonText: "확인",
        });
        return;
      }

      Swal.fire({
        icon: "question",
        title: "변경사항을 확인해주세요",
        html: `
                <div style="display: flex; justify-content: space-around;">
                    <div>ARGUMENT:${argument}</div>
                    <div>명령유형:${batchCmdTxt}</div>
                </div>
              `,
        confirmButtonText: "확인",
        denyButtonText: "아니오",
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isDenied) {
          return;
        } else if (result.isConfirmed) {
          await $.ajax({
            type: "POST",
            url: "/TB10610S/excBatch",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            dataType: "json",
          }).then(function () {
            $.ajax({
              type: "POST",
              url: "/TB9999D/start",
              contentType: "application/json; charset=UTF-8",
              data: curDate,
              success: function (data) {
                if (data === "") {
                  Swal.fire({
                    icon: "success",
                    title: "배치 스케쥴러 시작",
                  });
                } else if (data === "=") {
                  inqBatch();
                  return;
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: `${data} 배치 스케쥴러 진행중...`,
                  });
                }
              },
            });
            inqBatch();
          });
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "배치 JOB ID가 없습니다.",
        confirmButtonText: "확인",
      });
      return;
    }
  }

  // confirm 상태
  function updateConfirm() {
    let jobId = $("#TB10610S_exc_jobId").val();
    let curDate = unformatDate($("#TB10610S_curDate").val());
    let confirmYn;
    let btnConfTxt = $("#btnConfTxt").text();

    if (btnConfTxt === "확인대기") {
      confirmYn = 1;
    } else if (btnConfTxt === "확인") {
      confirmYn = 0;
    }

    let obj = {
      jobId,
      curDate,
      confirmYn,
    };

    if (jobId && curDate) {
      $.ajax({
        type: "POST",
        url: `/TB10610S/updateConfirm`,
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {},
        success: function (data) {
          if (data > 0) {
            Swal.fire({
              icon: "success",
              text: "Confrim 상태가 변경됐습니다.",
              confirmButtonText: "확인",
            }).then((result) => {
              inqBatch();
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Confrim 상태가 변경에 실패하였습니다.",
              confirmButtonText: "확인",
            });
            return;
          }
        },
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "행을 선택해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
  }

  // 초기화. 작업상태, 시작시간, 종료시간 초기화
  function resetBatch() {
    let getBatSchM = batSchM.getData();
    let obj = {
      batSchM: getBatSchM,
    };
    let curDate = "";
  
    if (getBatSchM.length > 0) {
      Swal.fire({
        icon: "warning",
        text: "배치 작업을 초기화 하시겠습니까?",
        confirmButtonText: "확인",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "POST",
            url: "/TB10610S/resetBatch",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            dataType: "json",
            beforeSend: function (xhr) {},
            success: function (data) {
              if (data > 0) {
                Swal.fire({
                  icon: "success",
                  text: "초기화가 완료됐습니다.",
                  confirmButtonText: "확인",
                }).then((result) => {
                  daemonStart();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  text: "초기화가 실패하였습니다.",
                  confirmButtonText: "확인",
                });
                return;
              }
            },
          });
        } else if (result.isDismissed) {
          return;
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "데이터가 없습니다.",
        confirmButtonText: "확인",
      });
      return;
    }
  }

  /*******************************************************************
   * Validation
   *******************************************************************/
  function validation() {
    let jobId = $("#TB10510S_rgst_jobId").val();
    let jobName = $("#TB10510S_rgst_jobName").val();
  }

  /*******************************************************************
   * 초기화
   *******************************************************************/
  function reset() {
    batSchM.setData([]);

    $("#TB10610S_exc_curDate").val("");
    $("#TB10610S_exc_jobId").val("");
    $("#TB10610S_exc_jobName").val("");
    $('input[name="TB10610S_exc_jobSts"]').prop("checked", false);
    // $('input[name="TB10610S_exc_jobSts"]').val('7').prop('checked', true)
    $("#TB10610S_exc_cfm").val("");
    $("#TB10610S_exc_argument").val("");

    $("#btnExc").prop("disabled", true);
    $("#btnConfirm").prop("disabled", false);
    radioBtnController("");
  }

  return {
    inqBatch: inqBatch,
    reset: reset,
    resetBatch: resetBatch,
    excBatch: excBatch,
    updateConfirm: updateConfirm,
  };
})();
