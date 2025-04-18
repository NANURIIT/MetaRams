const TB07210Sjs = (function () {

    // 콤보박스용 전역변수
    let grdSelect = {};
    let selectBox;

    $(document).ready(function () {

        $("#TB07210S_dprtNm").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_dprtCd").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_ardyBzepNo").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_ardyBzepNm").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_decdSttsDcd").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_fincExcuRqsDt1").on("input", function () { resetPGgrids("TB07210S") })
        $("#TB07210S_fincExcuRqsDt2").on("input", function () { resetPGgrids("TB07210S") })
        
        selectBoxSetting();
        setGridOptions();
        
        reset();
        //기간검색 유효성 검사 함수
        chkValFromToDt("TB07210S_fincExcuRqsDt1","TB07210S_fincExcuRqsDt2");
        $("#TB07210S_fincExcuRqsDt1").val(addMonth(getToday(), -1));
        $("#TB07210S_fincExcuRqsDt2").val(getToday());
    });

    function reset () {
        $("#TB07210S_dprtNm").val($("#userDprtCd").val());
        $("#TB07210S_dprtCd").val($("#userDprtCd").val());
        $("#TB07210S_ardyBzepNo").val("");
        $("#TB07210S_ardyBzepNm").val("");
        $("#TB07210S_decdSttsDcd").val("");
        $("#TB07210S_fincExcuRqsDt1").val("");
        $("#TB07210S_fincExcuRqsDt2").val("");
        resetPGgrids("TB07210S");
    }

    function selectBoxSetting() {

        selectBox = getSelectBoxList("TB07210S",
          "/D006"           // 결재상태구분코드
          + "/D010"         // 부서코드
          , false);
    
        grdSelect.D006 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D006' })             // 결재상태구분코드
        grdSelect.D010 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D010' });            // 부서코드

        // 진행상태구분코드 콤보박스 셋
        let decdSttsDcdOptionTag = "";
        for (let i = 0; i < grdSelect.D006.length; i++) {
            decdSttsDcdOptionTag += `<option value="${grdSelect.D006[i].cdValue}">${grdSelect.D006[i].cdName}</option>`
        }
        $('#TB07210S_decdSttsDcd').append(decdSttsDcdOptionTag)
        
        // 부서코드 콤보박스 셋
        let dprtOptionTag = "";
        for (let i = 0; i < grdSelect.D010.length; i++) {
          dprtOptionTag += `<option value="${grdSelect.D010[i].cdValue}">${grdSelect.D010[i].cdName}</option>`
        }
        $('#TB07210S_dprtNm').append(dprtOptionTag)
        $('#TB07210S_dprtNm').on('change', function () {
          $('#TB07210S_dprtCd').val($(this).val())
        })
    
      }

    function pqGridColModel(num) {

        // const Yn = [
        //     { "Y": "Y" }
        //     , { "N": "N" }
        // ]

        const spcDecdGrid = [
            {
                title: "신청일자",
                dataType: "string",
                dataIndx: "fincExcuRqsDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
                render: function (ui) {
                    return formatDate(ui.cellData)
                },
            },
            {
                title: "관리부점",
                dataType: "string",
                dataIndx: "dprtCd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "SPC명",
                dataType: "string",
                dataIndx: "ardyBzepNo",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "거래일자",
                dataType: "string",
                dataIndx: "trDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
                render: function (ui) {
                    return formatDate(ui.cellData)
                },
            },
            {
                title: "출금계좌번호",
                dataType: "string",
                dataIndx: "asstMngmAcno",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "입금합계",
                dataType: "string",
                dataIndx: "rndrInAmt",
                halign: "center",
                align: "right",
                format: "#,###",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "출금합계",
                dataType: "string",
                dataIndx: "rndrOutAmt",
                halign: "center",
                align: "right",
                format: "#,###",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "유동화증권 발행여부",
                dataType: "string",
                dataIndx: "lqdzSctyIsuYn",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청자",
                dataType: "string",
                dataIndx: "apvlRqstPEno",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "신청일시",
                dataType: "string",
                dataIndx: "rqstDtm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "결재구분",
                dataType: "string",
                dataIndx: "decdSttsDcd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        const spcDecdDetail = [
            {
                title: "결재순번",
                dataType: "string",
                dataIndx: "decdSq",
                halign: "center",
                align: "right",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "결재상태코드",
                dataType: "string",
                dataIndx: "decdSttsDcd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
                hidden: true,
            },
            {
                title: "결재상태명",
                dataType: "string",
                dataIndx: "decdSttsNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "결재자",
                dataType: "string",
                dataIndx: "dcfcEnm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "처리일시",
                dataType: "string",
                dataIndx: "decdDtm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소사유",
                dataType: "string",
                dataIndx: "rjctRsnCntn",
                width: "30%",
                halign: "center",
                align: "left",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "자금집행신청일련번호",
                dataType: "string",
                dataIndx: "fincExcuRqsSn",
            }
        ]

        if (num === 1) {
            return spcDecdGrid
        }
        else if (num === 2) {
            return spcDecdDetail
        }
    }

    function setGridOptions() {

        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 270
                , maxHeight: 270
                , id: 'TB07210S_spcDecdGrid'
                , colModel: pqGridColModel(1)
                , editable: false
                , rowClick: function (evt, ui) {
                    spcDecdDetail(ui.rowData.fincExcuRqsSn);
                }
                , selectionModel: { type: "row" },
            },
            {
                height: 270
                , maxHeight: 270
                , id: 'TB07210S_spcDecdDetail'
                , colModel: pqGridColModel(2)
                , editable: false
            },
        ];

        setPqGrid(pqGridObjs);
    }


    /**
     * 조회
     */
    function inq() {

        /**
         * @param { String } dprtCd 관리부서
         * @param { String } ardyBzepNo SPC
         * @param { String } fincExcuRqsDt1 신청일자1
         * @param { String } fincExcuRqsDt2 신청일자2
         * @param { String } prgSttsCd 진행상태코드(신청상태)
         */
        let paramData = {
            dprtCd: $('#TB07210S_dprtCd').val(),
            ardyBzepNo: $('#TB07210S_ardyBzepNo').val(),
            fincExcuRqsDt1: $('#TB07210S_fincExcuRqsDt1').val() ? $('#TB07210S_fincExcuRqsDt1').val().replaceAll("-", "") : "",
            fincExcuRqsDt2: $('#TB07210S_fincExcuRqsDt2').val() ? $('#TB07210S_fincExcuRqsDt2').val().replaceAll("-", "") : "",
            decdSttsDcd: $('#TB07210S_decdSttsDcd').val(),
        }

        $('#TB07210S_spcDecdDetail').pqGrid('instance').setData([]);

        $.ajax({
            method: "POST",
            url: "/TB07210S/selectSpcList",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(paramData),
            success: function (data) {
                console.log(data);
                
                if (data.length > 0) {
                    $('#TB07210S_spcDecdGrid').pqGrid('instance').setData(data);
                }
                else {
                    $('#TB07210S_spcDecdGrid').pqGrid('instance').setData([]);
                    Swal.fire({
                        icon: 'warning'
                        , title: '조회된 정보가 없습니다!'
                    })
                }
            },
            error: function (response) {
                // 에러남 ㅋㅋ
                Swal.fire({
                    icon: 'error'
                    , title: '조회된 정보가 없습니다!'
                })
            },
        });
    }

    function spcDecdDetail (fincExcuRqsSn) {

        /**
         * @param { String } fincExcuRqsSn 자금집행신청일련번호
         */
        let paramData = {
            fincExcuRqsSn: fincExcuRqsSn
        }

        $.ajax({
            method: "POST",
            url: "/TB07210S/spcDecdDetail",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(paramData),
            success: function (data) {
                console.log(data);
                
                if (data.length > 0) {
                    $('#TB07210S_spcDecdDetail').pqGrid('instance').setData(data);
                }
                else {
                    $('#TB07210S_spcDecdDetail').pqGrid('instance').setData([]);
                    Swal.fire({
                        icon: 'warning'
                        , title: '조회된 정보가 없습니다!'
                    })
                }
            },
            error: function (response) {
                // 에러남 ㅋㅋ
                Swal.fire({
                    icon: 'error'
                    , title: '조회된 정보가 없습니다!'
                })
            },
        });

    }


    return {
        // 조회
        inq: inq,
        // 초기화 (공통함수 사용)
        reset: reset,
    };
})();