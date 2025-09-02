const TB09208Sjs = (function () {
    let pqGridObjAprnSttnList;

    $(document).ready(function () {

        $('#TB09208S_stdrYm').on('input', function () { resetPGgrids("TB09208S"); })                //기준년월

        // 년월 디폴트 세팅
        $("#TB09208S_stdrYm").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09208S_aprnSttnList",
                colModel: colGrpAprnSttnList,
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjAprnSttnList = $("#TB09208S_aprnSttnList").pqGrid("instance");

    });


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {
        let TB09208S_Date = $("#TB09208S_stdrYm").val(); // 조회시작일자
        let msgError = "";

        if (isEmpty(TB09208S_Date)) {
            msgError = "필수 입력값(기준년월)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09208S_Date)) {
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
        $("#TB09208S_stdrYm").val(getToday());

        resetPGgrids("TB09208S")
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
    let colGrpAprnSttnList = [
        {
            title: "딜번호",
            dataType: "string",
            dataIndx: "dealNo",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "딜명",
            dataType: "string",
            dataIndx: "dealNm",
            halign: "center",
            align: "left",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "자산건정성",
            dataType: "string",
            dataIndx: "astsSnnGrdDcd",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "기표일자",
            dataType: "string",
            dataIndx: "baltDt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "만기일자",
            dataType: "string",
            dataIndx: "expDt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "투자금액",
            dataType: "integer",
            dataIndx: "invAmt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "**충당금**",
            dataType: "integer",
            dataIndx: "aprnAmt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "당기 설정액",
            dataType: "integer",
            dataIndx: "ctrmStupAmt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "증감(전월대비)",
            dataType: "integer",
            dataIndx: "incdcrAmt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "담당부서",
            dataType: "string",
            dataIndx: "chrrDprtNm",
            halign: "center",
            align: "left",
            filter: { crules: [{ condition: "range" }] },
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
