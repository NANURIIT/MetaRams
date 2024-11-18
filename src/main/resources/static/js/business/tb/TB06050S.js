const TB06050Sjs = (function() {

    $(document).ready(function () {

        setRadioGroup();

    });

    /**
    * 라디오 버튼 기본값 활성화
    */
    function setRadioGroup () {
        $("input[type='radio'][name^='radioGroup-'][value='N']").prop("checked", true)
    }


    /**
    * SPPI검토 조회
    */
    function getSPPIData() {



        let paramData = {
            nsFndCd: $('#TB06050S_nsFndCd-readonly').val()
            , nsPrdtDcd: $('#TB06050S_nsPrdtDcd-readonly').val()
            , prdtCd: $('#TB06050S_prdtCd-readonly').val()
        }

        $.ajax({
            type: "POST",
            url: "/TB06050S/getSPPIData",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            success: function (data) {
                if (data) {
                    $("#TB06050S_busiMdlDcd").val(data.busiMdlDcd)
                    $(`input[name='radioGroup-paiRdmpCnclCndXstcYn_1'][value='${data.paiRdmpCnclCndXstcYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_1'][value='${data.intrRtCndIntgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_2'][value='${data.intrRtCndIntgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_3'][value='${data.intrRtCndIntgYn3}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_4'][value='${data.intrRtCndIntgYn4}']`).prop("checked", true)
                    $(`input[name='radioGroup-intrRtCndIntgYn_5'][value='${data.intrRtCndIntgYn5}']`).prop("checked", true)
                    $(`input[name='radioGroup-fincCnvsPsblYn_1'][value='${data.fincCnvsPsblYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-fincCnvsPsblYn_2'][value='${data.fincCnvsPsblYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-expXtnsCndIvtgYn_1'][value='${data.expXtnsCndIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-expXtnsCndIvtgYn_2'][value='${data.expXtnsCndIvtgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-elpdFdmpCndIvtgYn_1'][value='${data.elpdFdmpCndIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_1'][value='${data.sobnIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_2'][value='${data.sobnIvtgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_3'][value='${data.sobnIvtgYn3}']`).prop("checked", true)
                    $(`input[name='radioGroup-spcInvIvtgYn_1'][value='${data.spcInvIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_1'][value='${data.tnchStdIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_2'][value='${data.tnchStdIvtgYn2}']`).prop("checked", true)
                } else {

                }

                const inputs = $("#TB06050S_selectedData input")

                for(let i = 0; i < inputs.length; i++){
                    if(!$(inputs[i]).val()){
                        alert("선택된 상품이 없습니다!(스위트 알럿으로 누군가 수정좀 부탁드립니다...<(_ _)>)");
                        return;
                    }else{
                        continue;
                    }
                }
            }, error: function () {

            }
        });
    }

    /**
    * 실행
    */
    function mergeSPPIData() {

        const inputs = $("#TB06050S_selectedData input")

        for(let i = 0; i < inputs.length; i++){
            if(!$(inputs[i]).val()){
                alert("데이터 선택부터 하라 인간!(스위트 알럿으로 누군가 수정좀 부탁드립니다...<(_ _)>)");
                return;
            }else{
                continue;
            }
        }

        let url;

        let nsFndCd;
        let nsPrdtDcd;
        let prdtCd;

        if ($('#TB06050S_nsFndCd-readonly').val() == '' || $('#TB06050S_nsPrdtDcd-readonly').val() || $('#TB06050S_prdtCd-readonly').val()) {
            nsFndCd = $('#TB06050S_nsFndCd').val()
            nsPrdtDcd = $('#TB06050S_nsPrdtDcd').val()
            prdtCd = $('#TB06050S_prdtCd').val()
            url = 'insertSPPIData'; // insert
        } else {
            nsFndCd = $('#TB06050S_nsFndCd-readonly').val()
            nsPrdtDcd = $('#TB06050S_nsPrdtDcd-readonly').val()
            prdtCd = $('#TB06050S_prdtCd-readonly').val()
            url = 'updateSPPIData'; // update
        }

        let paramData = {
            nsFndCd: nsFndCd
            , nsPrdtDcd: nsPrdtDcd
            , prdtCd: prdtCd
            , busiMdlDcd: $("#TB06050S_busiMdlDcd").val()
            , paiRdmpCnclCndXstcYn: $(`input[name='radioGroup-paiRdmpCnclCndXstcYn_1'][value='${data.paiRdmpCnclCndXstcYn}']`).val()
            , intrRtCndIntgYn: $(`input[name='radioGroup-intrRtCndIntgYn_1'][value='${data.intrRtCndIntgYn}']`).val()
            , intrRtCndIntgYn2: $(`input[name='radioGroup-intrRtCndIntgYn_2'][value='${data.intrRtCndIntgYn2}']`).val()
            , intrRtCndIntgYn3: $(`input[name='radioGroup-intrRtCndIntgYn_3'][value='${data.intrRtCndIntgYn3}']`).val()
            , intrRtCndIntgYn4: $(`input[name='radioGroup-intrRtCndIntgYn_4'][value='${data.intrRtCndIntgYn4}']`).val()
            , intrRtCndIntgYn5: $(`input[name='radioGroup-intrRtCndIntgYn_5'][value='${data.intrRtCndIntgYn5}']`).val()
            , fincCnvsPsblYn: $(`input[name='radioGroup-fincCnvsPsblYn_1'][value='${data.fincCnvsPsblYn}']`).val()
            , fincCnvsPsblYn2: $(`input[name='radioGroup-fincCnvsPsblYn_2'][value='${data.fincCnvsPsblYn2}']`).val()
            , expXtnsCndIvtgYn: $(`input[name='radioGroup-expXtnsCndIvtgYn_1'][value='${data.expXtnsCndIvtgYn}']`).val()
            , expXtnsCndIvtgYn2: $(`input[name='radioGroup-expXtnsCndIvtgYn_2'][value='${data.expXtnsCndIvtgYn2}']`).val()
            , elpdFdmpCndIvtgYn: $(`input[name='radioGroup-elpdFdmpCndIvtgYn_1'][value='${data.elpdFdmpCndIvtgYn}']`).val()
            , sobnIvtgYn: $(`input[name='radioGroup-sobnIvtgYn_1'][value='${data.sobnIvtgYn}']`).val()
            , sobnIvtgYn2: $(`input[name='radioGroup-sobnIvtgYn_2'][value='${data.sobnIvtgYn2}']`).val()
            , sobnIvtgYn3: $(`input[name='radioGroup-sobnIvtgYn_3'][value='${data.sobnIvtgYn3}']`).val()
            , spcInvIvtgYn: $(`input[name='radioGroup-spcInvIvtgYn_1'][value='${data.spcInvIvtgYn}']`).val()
            , tnchStdIvtgYn: $(`input[name='radioGroup-tnchStdIvtgYn_1'][value='${data.tnchStdIvtgYn}']`).val()
            , tnchStdIvtgYn2: $(`input[name='radioGroup-tnchStdIvtgYn_2'][value='${data.tnchStdIvtgYn2}']`).val()
        }

        $.ajax({
            type: "POST",
            url: `/TB06050S/${url}`,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            success: function (data) {
                if(data > 0){
                    Swal.fire({
                        icon: 'success'
                        , title: "Success!"
                        , text: "업데이트 성공!"
                        , confirmButtonText: "확인"
                    });
                }else{
                    Swal.fire({
                        icon: 'warning'
                        , title: "Warning!"
                        , text: "업데이트 실패!"
                        , confirmButtonText: "확인"
                    });
                }
            }, error: function () {
                Swal.fire({
                    icon: 'error'
                    , title: "Error!"
                    , text: "정보 업데이트 실패! 잠시 후 다시 시도 해주세요"
                    , confirmButtonText: "확인"
                });
            }
        });
    }

    /**
    * 초기화
    */
    function reset() {
        $("input[type='text']").val("");
        $("input[type='radio']").prop("checked", false);
        $("select").val("");
        setRadioGroup();
    }

	return {
		/**
		 * 사용 할 함수 정의
		 */
		getSPPIData : getSPPIData
	    , reset : reset
        , mergeSPPIData : mergeSPPIData
	}

})();