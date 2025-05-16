const TT03020Sjs = (function () {


    $(document).ready(function () {
        // getInvestLrgCd();
        getSelectBoxList('TT03020S', 'I028/I029/I030/I031/C006/B019/I006/C012/C010/I027')
        loginUserInfo();
    });

    /**
     * 조회
     */
    function getDealInfo() {
        // console.log("조회");

        // 딜 번호 있을때만 조회
        if (isEmpty($('#TT03020S_ibDealNo').val())) {
            Swal.fire({
                icon: 'warning'
                , title: 'Warning!'
                , text: 'Deal 번호를 입력해주세요!'
            })
        }
        else {
            // 세팅해주는 함수
            setScrn();

        }

        /**
         * 화면 세팅
         */
        function setScrn() {
            // 딜번호 참조
            console.log("세팅 왔나");

            let dealNo = $('#TT03020S_ibDealNo').val();
            // let sn = $('#TT03020S_sn').val();

            let paramData = {
                dealNo: dealNo,
                // sn: sn,
            };
            // console.log("paramData : ", paramData);


            $.ajax({
                url: "TT03020S/getDealInfo",
                method: "get",
                data: paramData,
                dataType: "json",
                success: function (data) {
                    console.log("data :", data);

                    // 데이터 없으면
                    if (!data.dealNo) {
                        Swal.fire({
                            icon: 'warning'
                            , title: 'Warning'
                            , text: '조회된 정보가 없습니다!'
                        })
                        return
                    }
                    console.log();



                    // 기본정보
                    $('#TT03020S_dealNm').val(data.dealNm);     // Deal명
                    $('#TT03020S_I029').val(data.invPrdtLclsCd); // 투자상품대분류
                    $('#TT03020S_I030').val(data.invPrdtMdclCd); // 투자상품중분류
                    $('#TT03020S_I031').val(data.invstGdsSdvdCd); // 투자상품소분류
                    $('#TT03020S_I028').val(data.invPrdtDtlsDvdCd); // 상품상세
                    $('#TT03020S_dealDtl').val(data.invDealCntn); // Deal내용
                    $('#TB03020S_C006_srch').val(data.invPrdtMdclCd); // 투자국가
                    $('#TT03020S_investCty').val(data.invstCty); // 투자도시



                    // 업체정보
                    $('#TT03020S_trdNo').val(data.ptxtTrOthrDscmNo);    // 거래상대방
                    $('#TT03020S_ptxtTrOthrDscmNm').val(data.ptxtTrOthrDscmNm);    // 
                    $('#TT03020S_B019').val(data.bzsacalCd);   // 기업규모
                    // $('#').val(data.);  // 업종
                    $('#TT03020S_irls').val(data.irls); // 계열
                    $('#TT03020S_C012').val(data.crdtGrdCd); // 신용등급
                    $('#TT03020S_lstMkt').val(data.lstMkt); // 상장시장


                    // 수익정보
                    $('#TT03020S_I027').val(data.crncyCd);  // 통화코드


                    // 기타정보


                    // 직원정보



                }

            })



        }
    }

    /**
     * 저장
     */
    function saveDealInfo() {

        let invAmtDcsnYn = '';
        if ($('#TT03020S_dealSclY').is(':checked')) {
            invAmtDcsnYn = 'Y'
        }
        else if ($('TT03020S_dealSclN').is(':checked')) {
            invAmtDcsnYn = 'N'
        }

        let thcoPtciAmtDcsnYn = '';
        if ($('#TT03020S_ptctSclY').is(':checked')) {
            thcoPtciAmtDcsnYn = 'Y'
        }
        else if ($('TT03020S_ptctSclN').is(':checked')) {
            thcoPtciAmtDcsnYn = 'N'
        }

        let paramData = {

            dealNo: $('#TT03020S_ibDealNo').val(),          // Deal번호

            // 기본정보
            dealNm: $('#TT03020S_dealNm').val(),            // Deal명
            invPrdtLclsCd: $('#TT03020S_I029').val(),       // 투자상품대분류
            invPrdtMdclCd: $('#TT03020S_I030').val(),       // 투자상품중분류
            invPrdtClsfCd: $('#TT03020S_I031').val(),       // 투자상품소분류
            invtGdsSdvdCd: $('#TT03020S_I028').val(),       // 상품상세
            dealDtl: $('#TT03020S_dealDtl').val(),          // Deal내용
            // investCtry: $('#').val(),                        투자국가            
            investCty: $('#TT03020S_investCty').val(),      // 투자도시

            // 업체정보
            ptxtTrOthrDscmNo: $('#TT03020S_trdNo').val(),   // 거래상대방
            bzsacalCd: $('#TT03020S_B019').val(),           // 기업규모
            indTypDvdCd: $('#TT03020S_I006').val(),         // 업종
            irls: $('#TT03020S_irls').val(),                // 계열
            crdtGrdCd: $('#TT03020S_C012').val(),           // 신용등급
            lstMkt: $('#TT03020S_lstMkt').val(),            // 상장시장

            // 수익정보
            invAmtDcsnYn: invAmtDcsnYn,                     // Deal규모(Yn)
            dealScl: $('#TT03020S_dealScl').val(),
            thcoPtciAmtDcsnYn: thcoPtciAmtDcsnYn,           // 참여규모(Yn)
            dealScl: $('#TT03020S_ptctScl').val(),
            allErn: $('#TT03020S_allErn').val(),            // 전체수익
            thyrErn: $('#TT03020S_thyrErn').val(),          // 당해수익
            wrtErn: $('#TT03020S_wrtErn').val(),            // 기표수익
            intrErn: $('#TT03020S_intrErn').val(),          // On-going
            // 기표일자
            // 만기일자
            crncyCd: $('#TT03020S_I027').val(),              // 통화코드            
            crncyAmt: $('#TT03020S_invstCrncyAmt').val(),    // 통화금액

            // 기타정보
            crncyAmt: $('#TT03020S_invstCrncyAmt').val(),    // 시공사 기업체번호
            crdtEhcmntCcd: $('#TT03020S_C010').val(),         //  신용보강여부
            ltv: $('#TT03020S_ltv').val(),                    //  LTV
            etcCntn: $('#TT03020S_etcCntn').val(),           // 현지법인협업
            // 비고

            // 직원정보
            chrrEmpno: $('#TT03020S_chrg_empNo').val(),           // 사원번호
            mngmBdcd: $('#TT03020S_chrg_dprtCd').val(),           // 부서코드







            // sn: sn,
        };

        $.ajax({
            type: "POST",
            url: "/TT03020S/saveDealInfo",
            data: JSON.stringify(paramData),
            contentType: "application/json",
            dataType: "text",
            success: function (data) {
                if (isEmpty($('#TT03020S_dealNm').val()) ||
                    isEmpty($('#TT03020S_I029').val()) ||
                    isEmpty($('#TT03020S_I030').val()) ||
                    isEmpty($('#TT03020S_I031').val()) ||
                    isEmpty($('#TT03020S_dealDtl').val()) ||
                    isEmpty($('#TT03020S_trdNo').val()) ||
                    isEmpty($('#TT03020S_dealScl').val()) ||
                    isEmpty($('#TT03020S_chrg_empNo').val())) {

                    Swal.fire({
                        icon: "warning"
                        , title: "Warning"
                        , text: "필수값을 입력해주세요!"
                    })
                }
                else {
                    console.log("필수값 입력 OK!");

                }


            }
        });

    }

    // 로그인정보
    function loginUserInfo() {
        $.ajax({
            type: "GET",
            url: "/getUserAuth",
            dataType: "json",
            success: function (data) {
                $('#TT03020S_chrg_empNo').val(data.eno);        // 사원번호
                $('#TT03020S_chrg_empNm').val(data.empNm);      // 사원명
                $('#TT03020S_chrg_dprtCd').val(data.dprtCd);    // 부서코드
                $('#TT03020S_chrg_dprtNm').val(data.dprtNm);    // 부서명
            }
        });
    }



    /**
     * 투자상품대분류 
     */
    // function getInvestLrgCd () {

    //     $.ajax({
    //         url: "/getSelectBoxCode/I029",
    //         method: "get",
    //         dataTye: "json",
    //         // data: "",
    //         success: function (data) {
    //             console.log("투자상품대분류 ::: " , data);

    //             let lrgCd = data;
    //             let html = "";

    //             if (lrgCd.length > 0) {
    //                 $.each(lrgCd, function (evt, ui) {
    // 					html += '<option value="' + ui.CD_VL_ID + '">' + ui.CD_VL_NM + '</option>';
    // 				});
    //             }
    //             $('#TT03020S_investLrgCd').append(html);
    //             $('#TT03020S_investLrgCd').val('');

    //         }
    //     })


    // }


    /**
     * 초기화
     */
    function resetSrch() {
        console.log("초기화");
        console.log("초기화 전 딜명 ::: ", $('#TT03020S_dealNm').val());
        
        
        $('#TT03020S_dealNm').val("");
        console.log("청소 끝 딜명 ::: ", $('#TT03020S_dealNm').val());

    }


    return {
        getDealInfo: getDealInfo,
        saveDealInfo: saveDealInfo,
        resetSrch: resetSrch,   

    }
})();