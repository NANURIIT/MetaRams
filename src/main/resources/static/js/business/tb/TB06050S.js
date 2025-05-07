const TB06050Sjs = (function () {

    $(document).ready(function () {

        $("#TB06050S_sppiSfcYn").val("미검토");
        setRadioGroup();

    });

    /**
    * 라디오 버튼 기본값 활성화
    */
    function setRadioGroup() {
        $("input[type='radio'][name^='radioGroup-'][value='N']").prop("checked", true)
    }


    /**
    * SPPI검토 조회
    */
    function getSPPIData() {

        if ($('#TB06050S_prdtCd').val() == "") {
            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "종목코드를 입력해주세요"
                , confirmButtonText: "확인"
            });
            return 0;
        }
        let paramData = {
            prdtCd: $('#TB06050S_prdtCd').val()
        }

        $.ajax({
            type: "POST",
            url: "/TB06050S/getSPPIData",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            success: function (data) {
                console.log(data);
                if (data[0]) {
                    $("#TB06050S_sppiSfcYn").val(data[0].sppiSfcYn);
                    $("#TB06050S_busiMdlDcd").val(data[0].busiMdlDcd);
                    $('#TB06050S_nsFndCd').val(data[0].nsFndCd);
                    $('#TB06050S_nsPrdtDcd').val(data[0].nsPrdtDcd);
                    $(`input[name='radioGroup-paiRdmpCnclCndXstcYn_1'][value='${data[0].paiRdmpCnclCndXstcYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_1'][value='${data[0].intrRtCndIntgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_2'][value='${data[0].intrRtCndIntgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_3'][value='${data[0].intrRtCndIntgYn3}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_4'][value='${data[0].intrRtCndIntgYn4}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_5'][value='${data[0].intrRtCndIntgYn5}']`).prop("checked", true)
                    $(`input[name='radioGroup-fincCnvsPsblYn_1'][value='${data[0].fincCnvsPsblYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-fincCnvsPsblYn_2'][value='${data[0].fincCnvsPsblYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-expXtnsCndIvtgYn_1'][value='${data[0].expXtnsCndIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-expXtnsCndIvtgYn_2'][value='${data[0].expXtnsCndIvtgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-elpdFdmpCndIvtgYn'][value='${data[0].elpdFdmpCndIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_1'][value='${data[0].sobnIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_2'][value='${data[0].sobnIvtgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_3'][value='${data[0].sobnIvtgYn3}']`).prop("checked", true)
                    $(`input[name='radioGroup-spcInvIvtgYn_1'][value='${data[0].spcInvIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_1'][value='${data[0].tnchStdIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_2'][value='${data[0].tnchStdIvtgYn2}']`).prop("checked", true)

                } else {
                    console.log("데이터 없음");
                    //조회조건 제외 전부 초기화
                    $("#TB06050S_sppiSfcYn").val("미검토");
                    $("#TB06050S_busiMdlDcd").val("");
                    $('#TB06050S_nsFndCd').val("");
                    $('#TB06050S_nsPrdtDcd').val("");
                    $("input[type='radio'][value='N']").prop("checked", true);
                }
                const inputs = $("#TB06050S_selectedData input")

            }, error: function () {

            }
        });
    }

    /**
    * 실행
    */
    function mergeSPPIData() {
        const inputs = $("#TB06050S_selectedData input")

        let url;
        let prdtCd;

        prdtCd = $('#TB06050S_prdtCd').val()
        if ($('#TB06050S_sppiSfcYn').val() == "미검토") {
            url = 'insertSPPIData';
        } else {
            url = 'updateSPPIData';
        }

        var sppiSfcYn = judgeSppiSfcYn();

        let paramData = {
            prdtCd: prdtCd
            , nsFndCd: $('#TB06050S_nsFndCd').val()
            , nsPrdtDcd: $('#TB06050S_nsPrdtDcd').val()
            , busiMdlDcd: $("#TB06050S_busiMdlDcd").val()
            , paiRdmpCnclCndXstcYn: $(`input[name='radioGroup-paiRdmpCnclCndXstcYn_1']:checked`).val()
            , intrRtCndIntgYn: $(`input[name='radioGroup-intrRtCndIntgYn_1']:checked`).val()
            , intrRtCndIntgYn2: $(`input[name='radioGroup-intrRtCndIntgYn_2']:checked`).val()
            , intrRtCndIntgYn3: $(`input[name='radioGroup-intrRtCndIntgYn_3']:checked`).val()
            , intrRtCndIntgYn4: $(`input[name='radioGroup-intrRtCndIntgYn_4']:checked`).val()
            , intrRtCndIntgYn5: $(`input[name='radioGroup-intrRtCndIntgYn_5']:checked`).val()
            , fincCnvsPsblYn: $(`input[name='radioGroup-fincCnvsPsblYn_1']:checked`).val()
            , fincCnvsPsblYn2: $(`input[name='radioGroup-fincCnvsPsblYn_2']:checked`).val()
            , expXtnsCndIvtgYn: $(`input[name='radioGroup-expXtnsCndIvtgYn_1']:checked`).val()
            , expXtnsCndIvtgYn2: $(`input[name='radioGroup-expXtnsCndIvtgYn_2']:checked`).val()
            , elpdFdmpCndIvtgYn: $(`input[name='radioGroup-elpdFdmpCndIvtgYn']:checked`).val()
            , sobnIvtgYn: $(`input[name='radioGroup-sobnIvtgYn_1']:checked`).val()
            , sobnIvtgYn2: $(`input[name='radioGroup-sobnIvtgYn_2']:checked`).val()
            , sobnIvtgYn3: $(`input[name='radioGroup-sobnIvtgYn_3']:checked`).val()
            , spcInvIvtgYn: $(`input[name='radioGroup-spcInvIvtgYn_1']:checked`).val()
            , tnchStdIvtgYn: $(`input[name='radioGroup-tnchStdIvtgYn_1']:checked`).val()
            , tnchStdIvtgYn2: $(`input[name='radioGroup-tnchStdIvtgYn_2']:checked`).val()
            , sppiSfcYn: sppiSfcYn
        }

        console.log(paramData);

        // 종목코드가 비어있으면 알럿 띄우기
        if (isEmpty($('#TB06050S_prdtCd').val())) {
            // console.log("실행할 종목코드 없음!!");

            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "종목코드를 입력해주세요"
                , confirmButtonText: "확인"
            })
            // 종목코드가 있으면 >>> ajax
        } else {

            $.ajax({
                type: "POST",
                url: `/TB06050S/${url}`,
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(paramData),
                success: function (data) {
                    if (data > 0) {
                        Swal.fire({
                            icon: 'success'
                            , title: "Success!"
                            , text: "업데이트에 성공했습니다!"
                            , confirmButtonText: "확인"
                        }).then(result => {
                            if (result.isConfirmed) {
                                getSPPIData();  //조회
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning'
                            , title: "Warning!"
                            , text: "업데이트에 실패했습니다!"
                            , confirmButtonText: "확인"
                        });
                    }
                }, error: function (e) {
                    console.log(e);
                    Swal.fire({
                        icon: 'error'
                        , title: "Error!"
                        , text: "정보 업데이트 실패! 잠시 후 다시 시도 해주세요"
                        , confirmButtonText: "확인"
                    });
                }
            });
        }

    }

    /**
    * 초기화
    */
    function reset() {
        $("input[type='text']").val("");
        $("input[type='radio']").prop("checked", false);
        $("select").val("");
        setRadioGroup();
        $("#TB06050S_sppiSfcYn").val("미검토");
    }

    function judgeSppiSfcYn() {
        if ($(`input[name='radioGroup-paiRdmpCnclCndXstcYn_1']:checked`).val() == 'Y') {
            return 'N';
        } else if ($(`input[name='radioGroup-intrRtCndIntgYn_1']:checked`).val() == 'Y' || $(`input[name='radioGroup-intrRtCndIntgYn_2']:checked`).val() == 'Y') {
            return 'N';
        } else if ($(`input[name='radioGroup-intrRtCndIntgYn_3']:checked`).val() == 'Y' || $(`input[name='radioGroup-intrRtCndIntgYn_4']:checked`).val() == 'Y'
            || $(`input[name='radioGroup-intrRtCndIntgYn_5']:checked`).val() == 'Y') {
            return 'N';
        } else if ($(`input[name='radioGroup-fincCnvsPsblYn_1']:checked`).val() == 'Y' || $(`input[name='radioGroup-fincCnvsPsblYn_2']:checked`).val() == 'Y') {
            return 'N';
        } else if ($(`input[name='radioGroup-expXtnsCndIvtgYn_1']:checked`).val() == 'N' || $(`input[name='radioGroup-expXtnsCndIvtgYn_2']:checked`).val() == 'N'
            || $(`input[name='radioGroup-elpdFdmpCndIvtgYn']:checked`).val() == 'N') {
            return 'N';
        } else if ($(`input[name='radioGroup-sobnIvtgYn_1']:checked`).val() == 'N' || $(`input[name='radioGroup-sobnIvtgYn_2']:checked`).val() == 'N'
            || $(`input[name='radioGroup-sobnIvtgYn_3']:checked`).val() == 'N') {
            return 'N';
        } else if ($(`input[name='radioGroup-spcInvIvtgYn_1']:checked`).val() == 'N') {
            return 'N';
        } else if ($(`input[name='radioGroup-tnchStdIvtgYn_1']:checked`).val() == 'N' || $(`input[name='radioGroup-tnchStdIvtgYn_2']:checked`).val() == 'N') {
            return 'N';
        }
        return 'Y';
    }


    /**
     * 삭제 
     */
    function deleteSPPIData() {

        console.log("삭제버튼");

        let prdtCd;

        prdtCd = $('#TB06050S_prdtCd').val()

        let paramData = {
            prdtCd: prdtCd
        }

        console.log(paramData);

        // 종목코드가 비어있으면 알럿 띄우기
        if (isEmpty($('#TB06050S_prdtCd').val())) {
            // console.log("삭제할 종목코드 없음!!!");

            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "종목코드를 입력해주세요"
                , confirmButtonText: "확인"
            })
            // 종목코드가 있으면 >>> ajax
        } else {

            $.ajax({
                type: "POST",
                url: `/TB06050S/deleteSPPIData`,
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(paramData),
                success: function (data) {
                    if (data > 0) {
                        Swal.fire({
                            icon: 'success'
                            , title: "Success!"
                            , text: "삭제에 성공했습니다!"
                            , confirmButtonText: "확인"
                        }).then(result => {
                            if (result.isConfirmed) {
                                reset();    // 초기화
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning'
                            , title: "Warning!"
                            , text: "삭제에 실패했습니다!"
                            , confirmButtonText: "확인"
                        });
                    }

                }, error: function (e) {
                    console.log(e);
                    Swal.fire({
                        icon: 'error'
                        , title: "Error!"
                        , text: "정보 삭제 실패! 잠시 후 다시 시도 해주세요"
                        , confirmButtonText: "확인"
                    });
                }
            });
        }


    }

    return {
        /**
         * 사용 할 함수 정의
         */
        getSPPIData: getSPPIData
        , reset: reset
        , mergeSPPIData: mergeSPPIData
        , deleteSPPIData: deleteSPPIData
    }

})();