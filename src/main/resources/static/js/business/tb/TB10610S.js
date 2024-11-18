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
  });

  /*******************************************************************
   * SelectBox
   *******************************************************************/
  function selectBox() {
    getSlcBx = getSelectBoxList("TB10610S", "X001", false); // 작업상태코드

    objSlc.X001 = getSlcBx.filter((it) => it.cmnsGrpCd === "X001");

    objSlc.X001.forEach((item) => {
      $("#TB10610S_jobSts").append(
        $("<option>", {
          value: item.cdValue,
          text: `[${item.cdValue}] ${item.cdName}`,
        })
      );
    });

    objSlc.X001.filter((it) =>
      ["4", "5", "6", "7"].includes(it.cdValue)
    ).forEach((item) => {
      $("#TB10610S_exc_jobSts").append(
        $("<option>", {
          value: item.cdValue,
          text: `[${item.cdValue}] ${item.cdName}`,
        })
      );
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
        dataIndx: "jobStatusNm",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
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
      {
        title: "CONFIRM 상태",
        dataType: "string",
        dataIndx: "confirmJobCount",
        halign: "center",
        align: "center",
        // width    : '10%',
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData === 0) {
            return "확인";
          } else if (cellData === 1) {
            return "확인대기";
          } else if (cellData === -1) {
            return "-";
          }
          return cellData;
        },
      },
    ];

    let pqGridObjs = [
      {
        height: 400,
        maxHeight: 400,
        id: "grd_batSchM",
        colModel: col_batSchM,
        selectionModel: { type: "row" },
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
        console.log(data);
        console.log(data.batSchM.length);

        if (data && data.batSchM.length > 0) {
          batSchM.setData(data.batSchM);

          // pqgrid_rowselect
          batSchM.on("rowSelect", function (evt, ui) {
            let al = ui.addList;

            if (al.length > 0) {
              console.log("rowSelect ::: ", ui);
              let rd = al[0].rowData;
              let jobId = rd.jobId;
              let jobName = rd.jobName;
              let curDate = rd.curDate;
              let jobStatus = rd.jobStatus;
              let confirmJobCount = rd.confirmJobCount;
              let argument = rd.argument;

              $("#TB10610S_exc_jobId").val(jobId);
              $("#TB10610S_exc_jobName").val(jobName);
              // $('#TB10610S_exc_jobSts').val(jobStatus)
              //console.log(typeof confirmJobCount);
              //console.log('confirmJobCount ::: ', confirmJobCount);

              $("#TB10610S_exc_cfm").val(confirmJobCount);
              if (confirmJobCount === 1) {
                $("#btnExc").prop("disabled", true);
              } else {
                // $('#TB10610S_exc_cfm').val(confirmJobCount)
                $("#btnExc").prop("disabled", false);
              }
              $("#TB10610S_exc_curDate").val(formatDate(curDate));
              $("#TB10610S_exc_argument").prop("disabled", true);
              if (rd.jobId === "TB9990B") {
                $("#TB10610S_exc_argument").prop("disabled", false);
              }
              argument = argument;

              tempObj.confirmJobCount = confirmJobCount;

              console.log("confirmJobCount ::: ", confirmJobCount);

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

              // confirm text 변경
              if (confirmJobCount === -1) {
                $("#btnConfTxt").text("확인");
                $("#btnConfirm").prop("disabled", true);
              } else if (confirmJobCount === 1) {
                $("#btnConfTxt").text("확인");
                $("#btnConfirm").prop("disabled", false);
              } else {
                $("#btnConfTxt").text("확인");
                $("#btnConfirm").prop("disabled", true);
              }
            } else {
              $("#TB10610S_exc_curDate").val("");
              $("#TB10610S_exc_jobId").val("");
              $("#TB10610S_exc_jobName").val("");
              $("#TB10610S_exc_jobSts").val("");
              $("#TB10610S_exc_cfm").val("");
              // $('#TB10610S_exc_jobSts').prop('disabled', false)
              $("#btnConfTxt").text("확인");
              $("#btnConfirm").prop("disabled", false);
              $('input[name="TB10610S_exc_jobSts"]').prop("checked", false);
              // $('#btnExc').prop('disabled', false)
              tempObj = {};
            }
          });
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

  // 실행
  function excBatch() {
    let jobId = $("#TB10610S_exc_jobId").val();
    let curDate = unformatDate($("#TB10610S_exc_curDate").val());
    let jobStatus = $('input[name="TB10610S_exc_jobSts"]:checked').val();
    let jobSts_txt = $(
      `input[value=${jobStatus}][name="TB10610S_exc_jobSts"]:checked`
    )
      .next("label")
      .text();
    let confirmJobCount = $("#TB10610S_exc_cfm").val();
    let argument = $("#TB10610S_exc_argument").val();

    let obj = {
      jobId,
      jobName: $("#TB10610S_exc_jobName").val(),
      jobStatus,
      curDate,
      confirmJobCount,
      argument,
    };

    if (jobId && curDate) {
      if (!jobStatus) {
        Swal.fire({
          icon: "warning",
          text: `작업상태를 확인해주세요.`,
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
                            <div>작업상태:${jobSts_txt}</div>
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
    let confirmJobCount;
    let btnConfTxt = $("#btnConfTxt").text();

    if (btnConfTxt === "확인대기") {
      confirmJobCount = 1;
    } else if (btnConfTxt === "확인") {
      confirmJobCount = 0;
    }

    let obj = {
      jobId,
      curDate,
      confirmJobCount,
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

    // let curDate = getBatSchM.forEach(val => {
    //    return val.curDate
    // });

    // console.log('초기화 :::: ', getBatSchM);
    // console.log('초기화 :::: ', curDate);
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

  function daemonStart() {
    let pqData = $("#grd_batSchM").pqGrid("instance");
    let curDate = pqData.pdata[0].curDate;

    console.log("오긴하셨습니다");
    console.log(curDate);

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

    $("#btnExc").prop("disabled", false);
    $("#btnConfirm").prop("disabled", false);
  }

  // confirm 상태 이벤트
  // $('#TB10610S_exc_cfm').on('change', function() {
  //     let $val = $(this).val()
  //     console.log(typeof $val);

  //     if ( $val ) {
  //         $('#TB10610S_exc_jobSts').prop('disabled', false)
  //     } else {
  //         // $('#TB10610S_exc_jobSts option:selected').val(0)
  //         $('#TB10610S_exc_jobSts').prop('disabled', true)
  //     }
  // })

  return {
    inqBatch: inqBatch,
    reset: reset,
    resetBatch: resetBatch,
    excBatch: excBatch,
    updateConfirm: updateConfirm,
  };
})();
