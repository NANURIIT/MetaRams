const TT03020Sjs = (function () {


    $(document).ready(function () {
        // getInvestLrgCd();
        getSelectBoxList('TT03020S', 'I028/I029/I030/I031/C006/B019/I006/C012/C010/I027')
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


        let dealNo = $('#TT03020S_ibDealNo').val();


        let paramData = {
            dealNo: dealNo,
            // sn: sn,
        };

        $.ajax({
            type: "POST",
            url: "/TT03020S/saveDealInfo",
            data: JSON.stringify(paramData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                

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

    return {
        getDealInfo: getDealInfo,
        saveDealInfo: saveDealInfo,

    }
})();