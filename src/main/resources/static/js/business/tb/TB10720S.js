const TB10720Sjs = function () {

    let grd_TB10720S; // 그리드 instance

    $(document).ready(function () {
        //loadSelectBoxContents();
        //loadUserAuth(); // 담당자 정보 조회
        setGrid_TB10720S();

        var today = getToday();

        $('#TB10720S_stdrDt').val(today);
        //alert("1");

    });

    let colModel_TB10720S = [
        {
            title: "개시직원번호",
            dataType: "string",
            dataIndx: "opngStfno",
            align: "center",
            halign: "center",
            width: "17%",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "개시조직번호",
            dataType: "string",
            dataIndx: "opngOrgno",
            align: "center",
            halign: "center",
            width: "17%",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "수기개시여부",
            dataType: "string",
            dataIndx: "hdwrOpngYn",
            align: "center",
            halign: "center",
            width: "17%",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "마감직원번호",
            dataType: "string",
            dataIndx: "clsgStfno",
            align: "center",
            halign: "center",
            width: "17%",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "마감조직번호",
            dataType: "string",
            dataIndx: "clsgOrgno",
            align: "center",
            halign: "center",
            width: "17%",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "수기마감여부",
            dataType: "string",
            dataIndx: "hdwrClsgYn",
            align: "center",
            halign: "center",
            width: "15%",
            filter: { crules: [{ condition: 'range' }] }
        }

    ]

    function setGrid_TB10720S() {

        var gridObj = {
            height: 500,
            maxHeight: 500,
            showTitle: false,
            showToolbar: false,
            collapsible: false,
            editable: false,
            wrap: false,
            hwrap: false,
            numberCell: { show: false },
            /*scrollModel: { autoFit: true },*/
            colModel: colModel_TB10720S,
            strNoRows: '조회된 데이터가 없습니다.'

        }

        $("#TB10720S_grid").pqGrid(gridObj);
        $("#TB10720S_grid").pqGrid("refreshDataAndView");
        grd_TB10720S = $("#TB10720S_grid").pqGrid('instance');

    }

    /*******************************************************************
     * AJAX
     *******************************************************************/
    // 조회
    function selectTB10720S() {
        let curDate = unformatDate($('#TB10720S_stdrDt').val())

        if (!curDate) {
            validation('curDate')
            return
        }

        let obj = {
            stdrDt: curDate,
        }

        $.ajax({
            type: "POST",
            url: "/TB10720S/selectTB10720S",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            dataType: "json",
            beforeSend: function (xhr) {
                // $('#btnExc').prop('disabled', false)
                // $('#TB10720S_rgst_jobId').prop('disabled', false)
                grd_TB10720S.setData([])
            },
            success: function (data) {
                console.log(data);
                // chkEvt();
                grd_TB10720S.setData(data.grd_TB10720S);
            },
        });
    }

    // 조회
    function updateTB10720S() {
        let curDate = unformatDate($('#TB10720S_stdrDt').val())

        if (!curDate) {
            validation('curDate')
            return
        }

        let obj = {
            stdrDt: curDate,
            jobOpngYn: $('input[name=TB10720S_radio]:checked').val() == 'open' ? 'Y' : 'N'
        }

        $.ajax({
            type: "POST",
            url: "/TB10720S/updateTB10720S",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(obj),
            dataType: "json",
            beforeSend: function (xhr) {
                // $('#btnExc').prop('disabled', false)
                // $('#TB10720S_rgst_jobId').prop('disabled', false)
                grd_TB10720S.setData([])
            },
            success: function (data) {
                console.log(data);
                // chkEvt();
                grd_TB10720S.setData(data.grd_TB10720S)
            },
        });
        selectTB10720S(); // 업데이트 재조회
    }


    /*******************************************************************
     * 초기화
     *******************************************************************/
    function reset() {
        $('#TB10720S_stdrDt').val(getToday());
        grd_TB10720S.setData([]);
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
	
	
	
	function runBatchJob(){
		
		var value = $('input:radio[name="TB10720S_radio"]:checked').val();
		
		if(value == "open"){
			$.ajax({
				type: "POST",
				url: "/TB10720S/daliyWorkStart",
				contentType: "application/json; charset=UTF-8",
				success: function(data) {
					console.log('success');
					console.log(data);
				},
			});	
		}else{
			$.ajax({
				type: "POST",
				url: "/TB10720S/daliyWorkEnd",
				contentType: "application/json; charset=UTF-8",
				success: function(data) {
					console.log('success');
					console.log(data);
				},
			});
		}
		
	}

    return {
        selectTB10720S: selectTB10720S      // 조회
        , reset: reset                      // 초기화
        , updateTB10720S: updateTB10720S    // 실행
		, runBatchJob: runBatchJob
    }

}();