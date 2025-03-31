const TB07210Sjs = (function () {

    // 콤보박스용 전역변수
    let grdSelect = {};
    let selectBox;

    $(document).ready(function () {
        selectBoxSetting();
        setGridOptions();
    });

    function selectBoxSetting() {

        selectBox = getSelectBoxList("TB07210S",
          "/P009"           // 진행상태구분코드
          + "/D010"         // 부서코드
          , false);
    
        grdSelect.P009 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P009' })             // 진행상태구분코드
                                  .filter(item => ['000', '010', '040', '090'].includes(item.cdValue))      // 신청중, 신청완료, 반려, 승인완료, (요청취소없음)
        grdSelect.D010 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D010' });            // 부서코드

        // 진행상태구분코드 콤보박스 셋
        let prgSttsCdOptionTag = "";
        for (let i = 0; i < grdSelect.P009.length; i++) {
            prgSttsCdOptionTag += `<option value="${grdSelect.P009[i].cdValue}">${grdSelect.P009[i].cdName}</option>`
        }
        $('#TB07210S_prgSttsCd').append(prgSttsCdOptionTag)
        
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

        const spcDesdGrid = [
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
                title: "승인구분",
                dataType: "string",
                dataIndx: "prgSttsCd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        const spcApvlRqstGrid = [
            {
                title: "승인코드",
                dataType: "string",
                dataIndx: "decdSttsDcd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인명",
                dataType: "string",
                dataIndx: "decdSttsNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인자",
                dataType: "string",
                dataIndx: "dcfcEnm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인일시",
                dataType: "string",
                dataIndx: "decdDtm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
        ]

        const spcRjctGrid = [
            {
                title: "승인코드",
                dataType: "string",
                dataIndx: "decdSttsDcd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "승인명",
                dataType: "string",
                dataIndx: "decdSttsNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소자",
                dataType: "string",
                dataIndx: "dcfcEnm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: "range" }] },
            },
            {
                title: "취소일시",
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
        ]

        if (num === 1) {
            return spcDesdGrid
        }
        else if (num === 2) {
            return spcApvlRqstGrid
        }
        else if (num === 3) {
            return spcRjctGrid
        }
    }

    function setGridOptions() {

        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 270
                , maxHeight: 270
                , id: 'TB07210S_spcDesdGrid'
                , colModel: pqGridColModel(1)
                , editable: false
            },
            {
                height: 270
                , maxHeight: 270
                , id: 'TB07210S_spcApvlRqstGrid'
                , colModel: pqGridColModel(2)
                , editable: false
            },
            {
                height: 270
                , maxHeight: 270
                , id: 'TB07210S_spcRjctGrid'
                , colModel: pqGridColModel(3)
                , editable: false
            },
        ];

        setPqGrid(pqGridObjs);
    }

    function inq() {

        /**
         * @param { String } dprtCd 관리부서
         * @param { String } ardyBzepNo SPC
         * @param { String } fincExcuRqsDt1 신청일자1
         * @param { String } fincExcuRqsDt2 신청일자2
         * @param { String } prgSttsCd 진행상태코드(신청상태)
         */
        let paramData = {
            dprtCd: $('TB07120S_dprtCd').val(),
            ardyBzepNo: $('TB07120S_ardyBzepNo').val(),
            fincExcuRqsDt1: $('TB07120S_fincExcuRqsDt1').val() ? $('TB07120S_fincExcuRqsDt1').val().replaceAll("-", "") : "",
            fincExcuRqsDt2: $('TB07120S_fincExcuRqsDt2').val() ? $('TB07120S_fincExcuRqsDt2').val().replaceAll("-", "") : "",
            prgSttsCd: $('TB07120S_prgSttsCd').val(),
        }

        $.ajax({
            method: "POST",
            url: "/TB07210S/selectSpcList",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(paramData),
            success: function (data) {
                if (data > 0) {
                    $('TB07210S_spcDesdGrid').pqGrid('instance').setData(data);
                }
                else {
                    $('TB07210S_spcDesdGrid').pqGrid('instance').setData([]);
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
        inq: inq
        // 초기화

    };
})();