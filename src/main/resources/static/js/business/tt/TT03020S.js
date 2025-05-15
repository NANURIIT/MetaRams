const TT03020Sjs = (function () {


    $(document).ready(function () {
        getInvestLrgCd();
    });

    /**
     * 조회
     */
    function getDealDetail() {
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
            console.log("Deal번호 있음");
            

        }

        /**
         * 화면 세팅
         */
        function set() {
            // 딜번호 참조
            let dealNo = $('#TT03020S_ibDealNo').val();

            let paramData = {
                dealNo: dealNo,
            };

            $.ajax({
                url: "TT03020S/getDealDetail",
                method: "get",
                data: JSON.stringify(paramData),
                dataType: "json",
                success: function (data) {
                    // 데이터 없으면
                    if (!data.dealNo) {
                        Swal.fire({
                            icon: 'warning'
                            , title: 'Warning'
                            , text: '조회된 정보가 없습니다!'
                        })
                        return
                    }
                    // 기본정보
                    // $('#TT03020S_dealNm').val(data.dealNm);     // Deal명
                    // $('')


                    // 업체정보


                    // 수익정보


                    // 기타정보


                    // 직원정보



                }

            })



        }
    }
    
    /**
     * 투자상품대분류 
     */
    function getInvestLrgCd () {
        
        $.ajax({
            url: "/getSelectBoxCode/I029",
            method: "get",
            dataTye: "json",
            // data: "",
            success: function (data) {
                console.log("투자상품대분류 ::: " , data);
                
                let lrgCd = data;
                let html = "";

                if (lrgCd.length > 0) {
                    $.each(lrgCd, function (evt, ui) {
						html += '<option value="' + ui.CD_VL_ID + '">' + ui.CD_VL_NM + '</option>';
					});
                }
                $('#TT03020S_investLrgCd').append(html);
                $('#TT03020S_investLrgCd').val('');
                
            }
        })
        

    }
    /**
     * 초기화
     */

    return {
        getDealDetail: getDealDetail,

    }
})();