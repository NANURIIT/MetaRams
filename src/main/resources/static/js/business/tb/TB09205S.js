const TB09205Sjs = (function () {
    let pqGridObjGrpPfmcSttnList;

    $(document).ready(function () {

        $('#TB09205S_stdrYm').on('input', function () { resetPGgrids("TB09205S"); })                //기준년월

        // 년월 디폴트 세팅
        $("#TB09205S_stdrYm").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09205S_grpPfmcSttnList",
                colModel: colGrpPfmcSttnList,
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjGrpPfmcSttnList = $("#TB09205S_grpPfmcSttnList").pqGrid("instance");

    });


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {
        let TB09205S_Date = $("#TB09205S_stdrYm").val(); // 조회시작일자
        let msgError = "";

        if (isEmpty(TB09205S_Date)) {
            msgError = "필수 입력값(기준년월)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09205S_Date)) {
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
        $("#TB09205S_stdrYm").val(getToday());

        resetPGgrids("TB09205S")
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
    let colGrpPfmcSttnList = [
        {
            title: "부서",
            dataType: "string",
            dataIndx: "dprtNm",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "당월말 누적 실적",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "비이자수익",
                    dataType: "integer",
                    dataIndx: "thmmClseAcmlNnIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "이자수익",
                    dataType: "integer",
                    dataIndx: "thmmClseAcmlIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "소계",
                    dataType: "integer",
                    dataIndx: "thmmClseAcmlSbtotAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        , {
            title: "내년 목표(당사)",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "비이자수익",
                    dataType: "integer",
                    dataIndx: "thcoNnIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "이자수익",
                    dataType: "integer",
                    dataIndx: "thcoIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "소계",
                    dataType: "integer",
                    dataIndx: "thcoSbtotAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        , {
            title: "내년 목표(IB)",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "목표",
                    dataType: "integer",
                    dataIndx: "ibNnIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "실적",
                    dataType: "integer",
                    dataIndx: "ibIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "진척률",
                    dataType: "integer",
                    dataIndx: "ibSbtotAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
