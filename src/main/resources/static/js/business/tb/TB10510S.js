const TB10510Sjs = (function () {

    let batSch;         // 그리드 instance
    let getSel;         // 클릭된 행 배열[]
    let objSlc = {}     // select obj
    let rd = {}         // rowData
    let cClkStat;

    $(document).ready(function () {
        selectBox();
        pqGrid();
		
        $('#TB10510S_curDate').val(getToday());
		
		isBatchScheduler();
    });

    /*******************************************************************
     * SelectBox
     *******************************************************************/
    function selectBox() {
        getSlcBx = getSelectBoxList('TB10510S', 'X002', false);    // 작업상태코드

        objSlc.X002 = getSlcBx.filter(it => it.cmnsGrpCd === 'X002');

        objSlc.X002.forEach(item => {
            $('#TB10510S_rgst_jobType').append(
                $('<option>', {
                    value: item.cdValue,
                    text: `[${item.cdValue}] ${item.cdName}`
                })
            );
        });
    }

    /*******************************************************************
     * PQGrid
     *******************************************************************/
    function pqGrid() {
        // 실행금리정보
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
                    options: objSlc.X002
                },
                render: function (ui) {
                    let fSel = objSlc.X002.find(({ cdValue }) => cdValue == ui.cellData);
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
			},
						
        ];

        let pqGridObjs = [
            {
                height: 400
                , maxHeight: 400
                , id: 'TB10720S_grd_batSch'
                , colModel: col_batSch
                , numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" }
                , selectionModel: { type: 'row' }
                //   , scrollModel : { autoFit: false }
                //   , cellClick: function (event, ui) {
                //         //삭제버튼 인덱스 찾기
                //         let targetDataIndx = "chk";
                //         let dltInx = col_batSch.findIndex(col => col.dataIndx === targetDataIndx);

                //         let sel = batSch.SelectRow()

                //         if ( ui.colIndx === dltInx && getSel.length > 0 ){
                //             // let getSel = sel.getSelection()
                //             // getSel[0].rowData.rowType = ''
                //             // getSel[0].rowData.pq_rowselect = false

                //             sel.removeAll();
                //         }

                //         // console.log(event);

                //         // $('input').prop('checked', false);
                //         // console.log('event::::::::::::::::', event);
                //         // console.log('ui::::::::::::::::', ui);
                //         // console.log('type::::::::', ui.column.editor.type);
                //         // if(!ui.column || !ui.column.editor || !ui.column.editor.type){
                //         //     return;
                //         // }
                //         // if(ui.column.editor.type !== undefined){
                //         //     // $('input').prop('checked', false);
                //         // }
                //         // ui.column.evt.target.checked = false;
                //     },
            },
        ]
        setPqGrid(pqGridObjs);
        // Grid instance
        batSch = $("#TB10720S_grd_batSch").pqGrid('instance');

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
                // $('#btnExc').prop('disabled', false)
                $('#TB10510S_rgst_jobId').prop('disabled', false)
                batSch.setData([])
                reset()
            },
            success: function (data) {
                // console.log(data);
                // chkEvt();
                batSch.setData(data.batSch)

                if (data && data.batSch.length > 0) {
                    batSch.setData(data.batSch)

                    // let chkData = data.batSch.filter(val => val.chk === true)
                    // 그리드 rowSelect 이벤트
                    batSch.on('rowSelect', function (evt, ui) {

                        let ul = ui.addList
                        let sel = batSch.SelectRow()
                        getSel = sel.getSelection()

                        //console.log(evt);


                        // $(ui.$tr).find()

                        // console.log('ui.addList ::: ', ul);
                        // console.log('getSel ::: ', getSel);
                        // console.log('getSel.length ::: ', getSel.length);

                        if (getSel.length > 0) {
                            // console.log('ul[0].rowData.pq_rowselect ::: ', ul[0].rowData.pq_rowselect);

                            if (ul[0].rowData.pq_rowselect) {
                                // console.log('탔어?');
                                rd = ul[0].rowData

                                $('#TB10510S_rgst_jobId').val(rd.jobId)
                                $('#TB10510S_rgst_jobId').prop('disabled', true)
                                $('#TB10510S_rgst_jobName').val(rd.jobName)
                                $('#TB10510S_rgst_jobType').val(rd.jobType)
                                $('#TB10510S_rgst_arg').val(rd.argument)
                                $('#TB10510S_rgst_cfm').val(rd.confirmYn)
                                $('#TB10510S_rgst_dscrp').val(rd.description)
								
								$('#TB10510S_jobRunTypeDcd').val(rd.jobRunTypeDcd)
								$('#TB10510S_jobRunStrtTime').val(rd.jobRunStrtTime)

                                rd.rowType = 'M'

                                // console.log('추가된 rd ::: ',rd);

                                // $('#btnExc').prop('disabled', true)
                            }
                        } else {
                            // $('#btnExc').prop('disabled', false)
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

    // 입력
    function rgstBatch() {
        let obj = {}
        let sts = rd.rowType
        let gd = batSch.getData()
        let jobId = $('#TB10510S_rgst_jobId').val()

        // console.log("상태확인 ::: ", sts);

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
                rowType: rd.rowType
            }
        }

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
                            , text: "입력이 완료됐습니다."
                            , confirmButtonText: "확인"
                        }).then((result) => {
                            inqBatch()
                        });
                    } else {
                        Swal.fire({
                            icon: 'error'
                            , text: "입력에 실패하였습니다."
                            , confirmButtonText: "확인"
                        });
                        return
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
                })
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
        $('#TB10510S_rgst_cfm').val('0')
        $('#TB10510S_rgst_dscrp').val('')
		
		$('#TB10510S_jobRunTypeDcd').val('')
		$('#TB10510S_jobRunStrtTime').val('')
		
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
    }
})();