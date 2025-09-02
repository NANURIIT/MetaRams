const TB09206Sjs = (function () {
    let pqGridObjDprtPflsList;

    $(document).ready(function () {

        $('[name="TB09206S_stdrDtYn"]').on('input', function () { resetPGgrids("TB09206S"); })      //기준일자
        $('#TB09206S_fromDate').on('input', function () { resetPGgrids("TB09206S"); })              //시작일자
        $('#TB09206S_toDate').on('input', function () { resetPGgrids("TB09206S"); })                //종료일자

        // 1개월전 ~ 오늘일자 디폴트 세팅
        $("#TB09206S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09206S_toDate").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09206S_dprtPflsList",
                colModel: colGrpDprtPflsList,
                scrollModel: { autoFit: false },
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjDprtPflsList = $("#TB09206S_dprtPflsList").pqGrid("instance");

    });


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {

        let TB09206S_fromDate = $("#TB09206S_fromDate").val(); // 조회시작일자
        let TB09206S_toDate = $("#TB09206S_toDate").val();     // 조회종료일자
        let msgError = "";

        if (isEmpty(TB09206S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09206S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09206S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09206S_toDate)) {
        msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09206S_fromDate > TB09206S_toDate) {
            msgError = "조회시작일자가 조회종료일자보다 큽니다.";
            alertPopup();
        } else {
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
        $("#TB09206S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09206S_toDate").val(getToday());
        $('[name="TB09206S_stdrDtYn"][value="01"]').prop('checked', true);

        resetPGgrids("TB09206S")
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
    let colGrpDprtPflsList = [
        {
            title: "본부",
            dataType: "string",
            dataIndx: "hdqtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "부서",
            dataType: "string",
            dataIndx: "dprtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "Ⅰ.영업이익",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "수수료수익(a)",
                    dataType: "integer",
                    dataIndx: "bsnssFeeErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "상품손익(b)",
                    dataType: "integer",
                    dataIndx: "bsnssPrdtPflsAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "이자수익(c)",
                    dataType: "integer",
                    dataIndx: "bsnssIntrErnAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "기타손익(d)",
                    dataType: "integer",
                    dataIndx: "bsnssEtcPflsAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        , {
            title: "Ⅱ.영업비용",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "수수료비용(e)",
                    dataType: "integer",
                    dataIndx: "bsnssFeeAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "이자비용(f)",
                    dataType: "integer",
                    dataIndx: "bsnssIntrAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        ,  {
            title: "Ⅲ.조정영업이익 계(A = a+b+c+d+e+f)",
            dataType: "integer",
            dataIndx: "adjtmtBsnssPrfSmm",
            halign: "center",
            align: "right",
            width: "20%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "충당금(g)",
            dataType: "integer",
            dataIndx: "aprnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "운용자금 COST(h)",
            dataType: "integer",
            dataIndx: "ortnFndsCost",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "Ⅳ.순영업수익(g+h)",
            dataType: "integer",
            dataIndx: "purBsnErnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "Ⅴ.영업외수익",
            dataType: "integer",
            dataIndx: "noprErngPflsAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "Ⅵ.손익 계",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
