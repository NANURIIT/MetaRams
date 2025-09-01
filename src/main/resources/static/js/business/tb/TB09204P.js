const TB09204Pjs = (function () {
    let pqGridObjAchvRtList;

    $(document).ready(function () {

        $('#TB09204P_stdrYm').on('input', function () { resetPGgrids("TB09204P"); })                //기준년월

        // 년월 디폴트 세팅
        $("#TB09204P_stdrYm").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09204P_achvRtList",
                colModel: colAchvRtList,
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjAchvRtList = $("#TB09204P_achvRtList").pqGrid("instance");

    });


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {
        let TB09204P_Date = $("#TB09204P_stdrYm").val(); // 조회시작일자
        let msgError = "";

        if (isEmpty(TB09204P_Date)) {
            msgError = "필수 입력값(기준년월)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09204P_Date)) {
            msgError = "필수 입력값(조회시작년월)을 확인해주세요.";
            alertPopup();
        }
        else {
            businessFunction();
        }


        function alertPopup() {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: msgError,
                confirmButtonText: "확인",
            });
        }

        function businessFunction() {

        }
    }


    /**
     * reset
     */
    function reset() {
        $("#TB09204P_stdrYm").val(getToday());

        resetPGgrids("TB09204P")
    }



    /**
     * 로그인한 사용자의 권한에 따라 담당자번호 ,부서번호 비활성화 상태 조정
     * 권한 조건은 미정이며,
     * 현재는 로그인한 사원의 정보가 설정된 후, 관련 필드를 비활성화 상태로 설정
     */
    //   function setFormElementsStateByUserRole(){
    //     let empNo  = $('#userEno').val();
    //     let empNm  = $('#userEmpNm').val();
    //     let dprtCd = $('#userDprtCd').val();
    //     let dprtNm = $('#userDprtNm').val();

    //     //로그인한 사원 정보 세팅
    //     $('#').val(empNo);
    //     $('#').val(empNm);
    //     $('#').val(dprtCd);
    //     $('#').val(dprtCd);

    //   }


    /* ***********************************그리드 컬럼******************************** */
    let colAchvRtList = [
        {
            title: "본부",
            dataType: "string",
            dataIndx: "hdqtCd",
            halign: "center",
            align: "left",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "부서",
            dataType: "string",
            dataIndx: "dprtCd",
            halign: "center",
            align: "left",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "당월목표",
            dataType: "integer",
            dataIndx: "thmmGoalAmt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
