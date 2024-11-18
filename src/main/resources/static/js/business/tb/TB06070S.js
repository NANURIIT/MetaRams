const TB06070Sjs = (function() {

    let selectBox;
    let grdSelect = {};
    $(document).ready(function() {
        fnSelectBox();
        createSelectTag();
    });

    //TB6070S 조회
    function getDetailInfo() {
        var prdtCd = $('#TB06070S_prdtCd').val();
        var paramData = {
            prdtCd : prdtCd
        };
        //console.log(paramData);
        $.ajax({
            type: "POST"
            , contentType: "application/json; charset=UTF-8"
            , data: JSON.stringify(paramData)
            , url: "/TB06070S/getDetailInfo"
            , dataType: "json"
            , success: function(data) {

            const keys = Object.keys(data);
            console.log(keys);
            for(let i = 0; i < keys.length; i++){
                    console.log(`#TB06070S_${keys[i]}`, data[keys[i]]);
                    $(`#TB06070S_${keys[i]}`).val(data[keys[i]]);
                }

            }
        });

    }



    /*
    *  =====================OptionBox데이터 SET=====================
    */
    function fnSelectBox() {
        selectBox = getSelectBoxList("TB06070",
            "/E021"   //기업여신상품분류코드(소)
            + "/E022" //기업여신상품대분류코드(대)
            + "/E023" //기업여신상품중분류코드(중)

            + "/L013" //대출만기코드
            , false);

        grdSelect.E021 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'E021'; });		//	기업여신상품분류코드(소)
        grdSelect.E022 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'E022'; });		//	기업여신상품대분류코드(대)
        grdSelect.E023 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'E023'; });		//	기업여신상품중분류코드(중)

        grdSelect.L013 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'L013'; });		//	대출만기코드
    }

    function createSelectTag() {

        //  기업여신상품분류코드(소)
        let e021Html;
        grdSelect.E021.forEach(item => {
            e021Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
        });
        $('#TB06070S_eprzCrdlPrdtClsfCd').append(e021Html);

        //  기업여신상품대분류코드(대)
        let e022Html;
        grdSelect.E022.forEach(item => {
            e022Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
        });
        $('#TB06070S_eprzCrdlPrdtLclsCd').append(e022Html);

        //  기업여신상품중분류코드(중)
        let e023Html;
        grdSelect.E023.forEach(item => {
            e023Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
        });
        $('#TB06070S_eprzCrdlPrdtMdclCd').append(e023Html);


        //  대출만기코드
        let l013Html;
        grdSelect.L013.forEach(item => {
            l013Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
        });
        $('#TB06070S_loanExpdCd').append(l013Html);
    }

    /*
    *  =====================OptionBox데이터 SET=====================
    */
	return {
		/**
		 * 사용 할 함수 정의
		 */
		getDetailInfo : getDetailInfo
	}

})();