const TB10510Sjs = (function () {

    let batSch;         // 그리드 instance
    let getSel;         // 클릭된 행 배열[]
    let objSlc = {}     // select obj
    let rd = {}         // rowData
    let cClkStat;
    let TB10510S_grd_batPreJob_rowIndx;

    $(document).ready(function () {
        selectBox();
        pqGrid();
		
        $('#TB10510S_curDate').val(getToday());
		
		isBatchScheduler();
        clockpickerCtrl();
    });

    /*******************************************************************
     * SelectBox
     *******************************************************************/
    function selectBox() {
        getSlcBx = getSelectBoxList('TB10510S', 'J004' + '/J003', false);    // 작업상태코드

        objSlc.J003 = getSlcBx.filter(it => it.cmnsGrpCd === 'J003');
        objSlc.J004 = getSlcBx.filter(it => it.cmnsGrpCd === 'J004');

        objSlc.J003.forEach(item => {
            $('#TB10510S_jobRunTypeDcd').append(
                $('<option>', {
                    value: item.cdValue,
                    text: `[${item.cdValue}] ${item.cdName}`
                })
            );
        });

        objSlc.J004.forEach(item => {
            $('#TB10510S_rgst_jobType').append(
                $('<option>', {
                    value: item.cdValue,
                    text: `[${item.cdValue}] ${item.cdName}`
                })
            );
        });
    }

    function clockpickerCtrl () {
        $('#TB10510S_jobRunStrtTime').on('change', function () {
            console.log("??");
            
            const val = $(this).val()
            if (val.length === 5) {
                $(this).val(val + ":00");
            }
        })
    }

    /*******************************************************************
     * PQGrid
     *******************************************************************/
    function pqGrid() {
        // 배치스케줄러
        let col_batSch = [
            //체크박스
            // { dataIndx: "chk", maxWidth: 36, minWidth: 36, align: "center", resizable: false,
            // 	title: "",
            // 	menuIcon:false,
            // 	type: 'checkBoxSelection', cls: 'ui-state-default', sortable: false, editor: false,
            // 	dataType: 'bool',
            // 	editable: 'true',
            // 	cb: {
            // 		all: false, 
            // 		header: true,
            //         // select: false,
            // 	},
            // },
            {
                title: "배치 JOB ID",
                dataType: "string",
                dataIndx: "jobId",
                halign: "center",
                align: "center",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
            },
            {
                title: "배치 TYPE",
                dataType: "string",
                dataIndx: "jobType",
                halign: "center",
                align: "center",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
                editor: {
                    type: "select",
                    valueIndx: "cdValue",
                    labelIndx: "cdName",
                    options: objSlc.J004
                },
                render: function (ui) {
                    let fSel = objSlc.J004.find(({ cdValue }) => cdValue == ui.cellData);
                    return fSel ? fSel.cdName : ui.cellData;
                },
            },
            {
                title: "배치명",
                dataType: "string",
                dataIndx: "jobName",
                halign: "center",
                align: "left",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
            }
            , {
                title: "ARGUMENT",
                dataType: "string",
                dataIndx: "argument",
                halign: "center",
                align: "left",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
            },
            {
                title: "CONFIRM JOB Y/N",
                dataType: "string",
                dataIndx: "confirmYn",
                halign: "center",
                align: "center",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    let cellData = ui.cellData;
                    if (cellData === '0') {
                        return '해당없음'
                    } else if (cellData === '1') {
                        return 'Y'
                    }
                    return cellData
                },
            },
            {
                title: "등록일 / 수정일",
                dataType: "string",
                dataIndx: "lastUpdateDay",
                halign: "center",
                align: "center",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    let cellData = ui.cellData;
                    return formatDate(cellData);
                },
            },
            {
                title: "작업 설명",
                dataType: "string",
                dataIndx: "description",
                halign: "center",
                align: "left",
                // width    : '10%',
                filter: { crules: [{ condition: 'range' }] },
            },
			{
				title: "실행 주기",
				dataType: "string",
				dataIndx: "jobRunTypeDcd",
				halign: "center",
				align: "center",
				// width    : '10%',
				filter: { crules: [{ condition: 'range' }] },
			},
			{
				title: "실행 시간",
				dataType: "string",
				dataIndx: "jobRunStrtTime",
				halign: "center",
				align: "center",
				// width    : '10%',
				filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    return ui.cellData.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3")
                },
			},
						
        ];

        let col_batPreJob = [
            {
                title: "선행 JOB ID",
                dataType: "string",
                dataIndx: "preJobId",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: 'range' }] },
            },
            {
                title: "선행 JOB NAME",
                dataType: "string",
                dataIndx: "preJobName",
                halign: "center",
                align: "center",
                editable: true,
                filter: { crules: [{ condition: 'range' }] },
            },
            {
                title: "최초등록일",
                dataType: "string",
                dataIndx: "registerDay",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    let result;
                    if (!ui.cellData) {
                        result = ui.cellData;
                    }
                    else if (ui.cellData.length === 8) {
                        result = ui.cellData.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                    }
                    return result
                },
            },
            {
                title: "최종수정일",
                dataType: "string",
                dataIndx: "lastUpdateDay",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    let result;
                    if (!ui.cellData) {
                        result = ui.cellData;
                    }
                    else if (ui.cellData.length === 8) {
                        result = ui.cellData.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                    }
                    return result
                },
            },
            {
                title: "JOB ID",
                dataType: "string",
                dataIndx: "jobId",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                hidden: true,
            },
        ]

        let pqGridObjs = [
            {
                height: 400
                , maxHeight: 400
                , id: 'TB10510S_grd_batSch'
                , colModel: col_batSch
                , numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" }
                , selectionModel: { type: 'row' }
            },
            {
                height: 150
                , maxHeight: 150
                , id: 'TB10510S_grd_batPreJob'
                , colModel: col_batPreJob
                , selectionModel: { type: 'row' }
                , rowSelect: function(evt, ui) {
                    const row = $('#TB10510S_grd_batPreJob').pqGrid('instance').SelectRow().getSelection()
                    if (row.length > 0) {
                        TB10510S_grd_batPreJob_rowIndx = row[0].rowIndx
                        console.log(TB10510S_grd_batPreJob_rowIndx);
                    }
                    else {
                        TB10510S_grd_batPreJob_rowIndx = undefined;
                        console.log(TB10510S_grd_batPreJob_rowIndx);
                    }
                }
            },
        ]
        setPqGrid(pqGridObjs);
        // Grid instance
        batSch = $("#TB10510S_grd_batSch").pqGrid('instance');

    }

    function setRowIndx () {
        return TB10510S_grd_batPreJob_rowIndx;
    }


    /*******************************************************************
     * AJAX
     *******************************************************************/
    // 조회
    function inqBatch() {
        let obj = {
            jobId: $('#TB10510S_jobId').val(),
            jobName: $('#TB10510S_jobName').val()
        }

        $.ajax({
            type: "POST",
            url: "/TB10510S/inqBatch",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            dataType: "json",
            beforeSend: function (xhr) {
                $('#TB10510S_rgst_jobId').prop('disabled', false)
                batSch.setData([])
                reset()
            },
            success: function (data) {
                batSch.setData(data.batSch)

                if (data && data.batSch.length > 0) {
                    batSch.setData(data.batSch)

                    // 그리드 rowSelect 이벤트
                    batSch.on('rowSelect', function (evt, ui) {

                        let ul = ui.addList
                        let sel = batSch.SelectRow()
                        getSel = sel.getSelection()

                        if (getSel.length > 0) {
                            if (ul[0].rowData.pq_rowselect) {
                                rd = ul[0].rowData

                                $('#TB10510S_rgst_jobId').val(rd.jobId)
                                $('#TB10510S_rgst_jobId').prop('disabled', true)
                                $('#TB10510S_rgst_jobName').val(rd.jobName)
                                $('#TB10510S_rgst_jobType').val(rd.jobType)
                                $('#TB10510S_rgst_arg').val(rd.argument)
                                $('#TB10510S_rgst_cfm').val(rd.confirmYn)
                                $('#TB10510S_rgst_dscrp').val(rd.description)
								
								$('#TB10510S_jobRunTypeDcd').val(rd.jobRunTypeDcd)
								$('#TB10510S_jobRunStrtTime').val(rd.jobRunStrtTime.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3"))

                                $('#TB10510S_addPreJob').prop('disabled', false)
                                $('#TB10510S_delPreJob').prop('disabled', false)

                                rd.rowType = 'M'

                                inqPreJob();
                            }
                        } else {
                            $('#TB10510S_rgst_jobId').prop('disabled', false)
                            reset()
                        }

                    })
                } else {
                    Swal.fire({
                        icon: 'warning'
                        , text: "조회된 내역이 없습니다."
                        , confirmButtonText: "확인"
                    });
                };
            },
        });
    }

    function inqPreJob() {

        let jobId = $('#TB10510S_rgst_jobId').val()

        $.ajax({
            type: "POST",
            url: "/TB10510S/inqPreJob",
            contentType: "application/json; charset=UTF-8",
            data: jobId,
            success: function (data) {
                $('#TB10510S_grd_batPreJob').pqGrid('instance').setData(data);
            },
        });
    }

    // 입력
    function rgstBatch() {
        let obj = {}
        let sts = rd.rowType
        let gd = batSch.getData()
        let jobId = $('#TB10510S_rgst_jobId').val()

        if (!sts) {
            for (let i = 0; i < gd.length; i++) {
                const ele = gd[i];
                const grdJobId = ele.jobId

                if (grdJobId === jobId) {
                    Swal.fire({
                        icon: 'warning'
                        , text: "중복된 JOB ID가 존재합니다."
                        , confirmButtonText: "확인"
                    })
                    return
                }
            }

            obj = {
                jobId,
                jobName: $('#TB10510S_rgst_jobName').val(),
                jobType: $('#TB10510S_rgst_jobType').val(),
                objectName: $('#TB10510S_rgst_jobId').val(),
                argument: $('#TB10510S_rgst_arg').val(),
                confirmYn: $('#TB10510S_rgst_cfm').val(),
                description: $('#TB10510S_rgst_dscrp').val(),
                jobRunTypeDcd: $('#TB10510S_jobRunTypeDcd').val(),
                jobRunStrtTime: $('#TB10510S_jobRunStrtTime').val().replaceAll(":", ""),
                preJobList: $('#TB10510S_grd_batPreJob').pqGrid('instance').pdata,
            }
        } else {
            obj = {
                jobId: $('#TB10510S_rgst_jobId').val(),
                jobName: $('#TB10510S_rgst_jobName').val(),
                jobType: $('#TB10510S_rgst_jobType').val(),
                objectName: $('#TB10510S_rgst_jobId').val(),
                argument: $('#TB10510S_rgst_arg').val(),
                confirmYn: $('#TB10510S_rgst_cfm').val(),
                description: $('#TB10510S_rgst_dscrp').val(),
                jobRunTypeDcd: $('#TB10510S_jobRunTypeDcd').val(),
                jobRunStrtTime: $('#TB10510S_jobRunStrtTime').val().replaceAll(":", ""),
                rowType: rd.rowType,
                preJobList: $('#TB10510S_grd_batPreJob').pqGrid('instance').pdata,
            }
        }

        console.log(obj.jobRunStrtTime);
        
        // console.log('입력 ::: {}', obj)
        if (jobId) {
            $.ajax({
                type: "POST",
                url: "/TB10510S/rgstBatch",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(obj),
                dataType: "json",
                beforeSend: function (xhr) {

                },
                success: function (data) {
                    // console.log(data);
                    if (data > 0) {
                        Swal.fire({
                            icon: 'success'
                            , title: 'Success!'
                            , text: "입력이 완료됐습니다."
                            , confirmButtonText: "확인"
                        }).then((result) => {
                            reset();
                            inqBatch();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error'
                            , text: "입력에 실패하였습니다."
                            , confirmButtonText: "확인"
                        });
                        return;
                    }
                },
            });
        } else {
            Swal.fire({
                icon: 'warning'
                , text: "JOB ID를 입력해주세요."
                , confirmButtonText: "확인"
            });
            return
        }
    }

    // 실행
    function excBatch() {
		
        let curDate = unformatDate($('#TB10510S_curDate').val())

        console.log(curDate);


        if (!curDate) {
            validation('curDate')
            return
        }

        let grdData = batSch.getData();
        // let chkData = grdData.filter(val => val.chk === true)

        grdData.forEach(ele => {
            ele.curDate = curDate
        });

        let obj = {
            excBat: grdData,
			curDate : curDate,
        }
        console.log('obj 실행 전 ::::', obj);

        if (grdData.length > 0) {
            $.ajax({
                type: "POST",
                url: "/TB10510S/excBatch",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(obj),
                dataType: "json",
                beforeSend: function (xhr) {

                },
                success: function (data) {
                    // console.log(data);
                    if (9 > data > 0) {
                        Swal.fire({
                            icon: 'success'
                            , text: "실행이 완료됐습니다."
                            , confirmButtonText: "확인"
                        }).then((result) => {
                            inqBatch()
                        });
                    } else if (data === 9) {
                        Swal.fire({
                            icon: 'warning'
                            , text: `기준일자(${formatDate(curDate)})의 배치 스케줄러가 존재합니다.`
                            , confirmButtonText: "확인"
                        });
                        return;
                    } else {
                        Swal.fire({
                            icon: 'error'
                            , text: "실행에 실패하였습니다."
                            , confirmButtonText: "확인"
                        });
                        return;
                    }
                },
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
                                title: "배치 스케쥴러 시작"
                            });
                        } else if (data === "=") {
                            return;
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: `${data} 배치 스케쥴러 진행중...`
                            });
                        }
                    }
                });
            });

        } else {
            Swal.fire({
                icon: 'warning'
                , text: "실행할 데이터가 없습니다."
                , confirmButtonText: "확인"
            });
        }
    }

    // 삭제
    function delBatch() {
        let jobId = $('#TB10510S_rgst_jobId').val()

        let obj = {
            jobId,
        }

        if (jobId) {
            Swal.fire({
                icon: 'warning'
                , text: "해당 JOB ID를 삭제하시겠습니까?"
                , confirmButtonText: "확인"
                , showCancelButton: true    // cancel버튼 보이기. 기본은 원래 없음
                , cancelButtonText: '취소'  // cancel 버튼 텍스트 지정
            }).then(result => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "/TB10510S/delBatch",
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        beforeSend: function (xhr) {

                        },
                        success: function (data) {
                            // console.log(data);
                            if (data > 0) {
                                Swal.fire({
                                    icon: 'success'
                                    , text: "삭제가 완료됐습니다."
                                    , confirmButtonText: "확인"
                                }).then((result) => {
                                    inqBatch()
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error'
                                    , text: "삭제에 실패하였습니다."
                                    , confirmButtonText: "확인"
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
            swal.fire({
                icon: 'warning'
                , text: "선택된 행이 없습니다."
                , confirmButtonText: "확인"
            });
            return;
        }
    }
	
	function isBatchScheduler() {
		$.ajax({
			type: "POST",
			url: "/TB10510S/isBatchScheduler",
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				chgBtn_TB10510S_isRunning(data);
			},
		});
	}
	
	function startBatchScheduler() {
		$.ajax({
			type: "POST",
			url: "/TB10510S/startBatchScheduler",
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				chgBtn_TB10510S_isRunning(data);
			},
		});
	}

	function stopBatchScheduler() {
		$.ajax({
			type: "POST",
			url: "/TB10510S/stopBatchScheduler",
			contentType: "application/json; charset=UTF-8",
			success: function(data) {
				chgBtn_TB10510S_isRunning(data);
			},
		});
	}
	
	function chgBtn_TB10510S_isRunning(data) {
		if (data) {
			$('#TB10510S_isRunning').removeClass("btn-danger");
			$('#TB10510S_isRunning').addClass("btn-success");
			$('#TB10510S_isRunning').text("기동중");
		} else {
			$('#TB10510S_isRunning').removeClass("btn-success");
			$('#TB10510S_isRunning').addClass("btn-danger");
			$('#TB10510S_isRunning').text("기동중지");
		}
	}

    ///////////////////////////////// TEST 중
    // $('#pq-head-cell-u0-0-0-right input[type="checkbox"]').on('click', function() {
    //     console.log('Checkbox 클릭됨!');
    // });  

    // function chkEvt() {
    //     console.log('탔니');
    //     $('#pq-head-cell-u0-0-0-right input[type="checkbox"]').on('click', function() {
    //         if ($(this).is(':checked')) {
    //             console.log('Checkbox가 체크되었습니다!');
    //         } else {
    //             console.log('Checkbox가 체크 해제되었습니다!');
    //         }
    //     })
    // }


    /*******************************************************************
     * 초기화
     *******************************************************************/
    function reset() {
        $('#TB10510S_rgst_jobId').val('')
        $('#TB10510S_rgst_jobName').val('')
        $('#TB10510S_rgst_jobType').val('')
        $('#TB10510S_rgst_arg').val('')
        $('#TB10510S_rgst_cfm').val('')
        $('#TB10510S_rgst_dscrp').val('')
		
		$('#TB10510S_jobRunTypeDcd').val('')
		$('#TB10510S_jobRunStrtTime').val('')

        $('#TB10510S_addPreJob').prop('disabled', true)
        $('#TB10510S_delPreJob').prop('disabled', true)
		
        $('#TB10510S_grd_batPreJob').pqGrid('instance').setData([])
        rd = {}
    }

    // 유효성체크
    function validation(f) {

        if (f === 'curDate') {
            swAlrt(1, 'warning', '[기준일자]를 입력해주세요.')
        }
    }

    // swal.fire
    function swAlrt(flag, icon, text, callback = () => { }) {
        if (flag === 1) {
            Swal.fire({
                icon: `${icon}`
                , text: `${text}`
                , confirmButtonText: "확인"
            }).then(callback)
        }
    }

    return {
        inqBatch : inqBatch
        , delBatch : delBatch
        , rgstBatch : rgstBatch
        , excBatch : excBatch
		, isBatchScheduler : isBatchScheduler
		, startBatchScheduler : startBatchScheduler
		, stopBatchScheduler : stopBatchScheduler
        , setRowIndx: setRowIndx
    }
})();