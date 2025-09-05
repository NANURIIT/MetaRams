const TB09212Sjs = (function () {
    let pqGridObjDealAcqstList;

    $(document).ready(function () {

        $('#TB09212S_fromDate').on('input', function () { resetPGgrids("TB09206S"); })              //시작일자
        $('#TB09212S_toDate').on('input', function () { resetPGgrids("TB09206S"); })                //종료일자
        $('[name="TB09212S_execDcd"]').on('input', function () { resetPGgrids("TB09206S"); })       //실행구분
        $('#TB09212S_endDealInclsnYn').on('change', function () { resetPGgrids("TB09206S"); });     //종료딜포함여부
        $('#TB09212S_busiTpClsfLclsCd').on('change', function () { resetPGgrids("TB09206S"); });    //사업유형대분류
        $('#TB09212S_busiTpClsfMdclCd').on('change', function () { resetPGgrids("TB09206S"); });    //사업유형중분류
        $('#TB09212S_invTpClsfLclsCd').on('change', function () { resetPGgrids("TB09206S"); });     //투자유형대분류
        $('#TB09212S_invTpClsfMdclCd').on('change', function () { resetPGgrids("TB09206S"); });     //투자유형중분류
        $('#TB09212S_ibDealNo').on('input', function () { resetPGgrids("TB09206S"); })              //딜번호
        $('#TB09212S_ibDealNm').on('input', function () { resetPGgrids("TB09206S"); })              //딜명
        $('#TB09212S_dprtCd').on('input', function () { resetPGgrids("TB09206S"); })                //담당부서
        $('#TB09212S_dprtNm').on('input', function () { resetPGgrids("TB09206S"); })                //담당부서명

        // 1개월전 ~ 오늘일자 디폴트 세팅
        $("#TB09212S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09212S_toDate").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09212S_dealAcqstList",
                colModel: colGrpDealAcqstList,
                scrollModel: { autoFit: false },
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjDealAcqstList = $("#TB09212S_dealAcqstList").pqGrid("instance");

    });


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {

        let TB09212S_fromDate = $("#TB09212S_fromDate").val(); // 조회시작일자
        let TB09212S_toDate = $("#TB09212S_toDate").val();     // 조회종료일자
        let msgError = "";

        if (isEmpty(TB09212S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09212S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09212S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09212S_toDate)) {
        msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09212S_fromDate > TB09212S_toDate) {
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
        $("#TB09212S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09212S_toDate").val(getToday());
        $('[name="TB09212S_execDcd"][value="01"]').prop('checked', true);
        $("#TB09212S_endDealInclsnYn").prop("checked", false);
        $('#TB09212S_busiTpClsfLclsCd').val('');
        $('#TB09212S_busiTpClsfMdclCd').val('');
        $('#TB09212S_invTpClsfLclsCd').val('');
        $('#TB09212S_invTpClsfMdclCd').val('');
        $('#TB09212S_ibDealNo').val('');
        $('#TB09212S_ibDealNm').val('');
        $('#TB09212S_dprtCd').val('');
        $('#TB09212S_dprtNm').val('');

        resetPGgrids("TB09212S")
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
    let colGrpDealAcqstList = [
        {
            title: "딜번호",
            dataType: "string",
            dataIndx: "dealNo",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "딜명",
            dataType: "string",
            dataIndx: "dealNm",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "사업유형1",
            dataType: "string",
            dataIndx: "busiTpClsfLclsCd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "사업유형2",
            dataType: "string",
            dataIndx: "busiTpClsfMdclCd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        }
        ,  {
            title: "투자유형1",
            dataType: "string",
            dataIndx: "invTpClsfLclsCd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "실행구분",
            dataType: "string",
            dataIndx: "execDcd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "실행일",
            dataType: "string",
            dataIndx: "execDt",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "실행금액",
            dataType: "integer",
            dataIndx: "execAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "잔액",
            dataType: "integer",
            dataIndx: "blce",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "RWA잔액",
            dataType: "integer",
            dataIndx: "rwaBlce",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "비고",
            dataType: "string",
            dataIndx: "rmrk",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "담당부서",
            dataType: "string",
            dataIndx: "chrrDprtNm",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
