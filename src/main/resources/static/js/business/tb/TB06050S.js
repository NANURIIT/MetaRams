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

        if($('#TB06050S_prdtCd').val() == ""){
            Swal.fire({
                icon: 'warning'
                , title: "Warning!"
                , text: "종목코드를 선택해주세요"
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
                    $(`input[name='radioGroup-elpdFdmpCndIvtgYn_1'][value='${data[0].elpdFdmpCndIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_1'][value='${data[0].sobnIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_2'][value='${data[0].sobnIvtgYn2}']`).prop("checked", true)
                    $(`input[name='radioGroup-sobnIvtgYn_3'][value='${data[0].sobnIvtgYn3}']`).prop("checked", true)
                    $(`input[name='radioGroup-spcInvIvtgYn_1'][value='${data[0].spcInvIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_1'][value='${data[0].tnchStdIvtgYn}']`).prop("checked", true)
                    $(`input[name='radioGroup-tnchStdIvtgYn_2'][value='${data[0].tnchStdIvtgYn2}']`).prop("checked", true)
                    
                } else {
                    console.log("데이터 없음?");
                    //조회조건 제외 전부 초기화
                    $("#TB06050S_sppiSfcYn").val("미검토");
                    $("#TB06050S_busiMdlDcd").val("");
                    $('#TB06050S_nsFndCd').val("");
                    $('#TB06050S_nsPrdtDcd').val("");
                    $("input[type='radio']").prop("checked", false);
                }

                const inputs = $("#TB06050S_selectedData input")

                /*for(let i = 0; i < inputs.length; i++){
                    if(!$(inputs[i]).val()){
                       //alert("선택된 상품이 없습니다!(스위트 알럿으로 누군가 수정좀 부탁드립니다...<(_ _)>)");
						swal.fire({
						   icon: "warning",
				           text: "조회된 내역이 없습니다.",
				           confirmButtonText: "확인"
						});
                        return;
                    }else{
                        continue;
                    }
                }*/
            }, error: function () {

            }
        });
    }

    /**
    * 실행
    */
    function mergeSPPIData() {

        const inputs = $("#TB06050S_selectedData input")

        // for(let i = 0; i < inputs.length; i++){
        //     if(!$(inputs[i]).val()){
        //         alert("데이터 선택부터 하라 인간!(스위트 알럿으로 누군가 수정좀 부탁드립니다...<(_ _)>)");
        //         return;
        //     }else{
        //         continue;
        //     }
        // }

        let url;
        let prdtCd;
        
        prdtCd = $('#TB06050S_prdtCd').val()
        if($('#TB06050S_sppiSfcYn').val()=="미검토"){
            url = 'insertSPPIData'; 
        }else{
            url = 'updateSPPIData'; 
        }

        // if ($('#TB06050S_nsFndCd-readonly').val() == '' || $('#TB06050S_nsPrdtDcd-readonly').val() || $('#TB06050S_prdtCd-readonly').val()) {
        //     nsFndCd = $('#TB06050S_nsFndCd').val()
        //     nsPrdtDcd = $('#TB06050S_nsPrdtDcd').val()
        //     prdtCd = $('#TB06050S_prdtCd').val()
        //     url = 'insertSPPIData'; // insert
        // } else {
        //     nsFndCd = $('#TB06050S_nsFndCd-readonly').val()
        //     nsPrdtDcd = $('#TB06050S_nsPrdtDcd-readonly').val()
        //     prdtCd = $('#TB06050S_prdtCd-readonly').val()
        //     url = 'updateSPPIData'; // update
        // }

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
            , elpdFdmpCndIvtgYn3: $(`input[name='radioGroup-elpdFdmpCndIvtgYn_3']:checked`).val()
            , sobnIvtgYn: $(`input[name='radioGroup-sobnIvtgYn_1']:checked`).val()
            , sobnIvtgYn2: $(`input[name='radioGroup-sobnIvtgYn_2']:checked`).val()
            , sobnIvtgYn3: $(`input[name='radioGroup-sobnIvtgYn_3']:checked`).val()
            , spcInvIvtgYn: $(`input[name='radioGroup-spcInvIvtgYn_1']:checked`).val()
            , tnchStdIvtgYn: $(`input[name='radioGroup-tnchStdIvtgYn_1']:checked`).val()
            , tnchStdIvtgYn2: $(`input[name='radioGroup-tnchStdIvtgYn_2']:checked`).val()
            , sppiSfcYn: 'N'
        }

        console.log(paramData);

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

    /**
    * 초기화
    */
    function reset() {
        $("input[type='text']").val("");
        $("input[type='radio']").prop("checked", false);
        $("select").val("");
        setRadioGroup();
    }


    // 삭제
    function deleteSPPIData() {

        console.log("삭제버튼");
    }

	return {
		/**
		 * 사용 할 함수 정의
		 */
		getSPPIData : getSPPIData
	    , reset : reset
        , mergeSPPIData : mergeSPPIData
        , deleteSPPIData : deleteSPPIData
	}

})();