const TB09213Sjs = (function () {
    let pqGridObjDealPflsSttnList;

    $(document).ready(function () {

        loadSelectBoxContents();

        $('#TB09213S_fromDate').on('input', function () { resetPGgrids("TB09213S"); })              //시작일자
        $('#TB09213S_toDate').on('input', function () { resetPGgrids("TB09213S"); })                //종료일자
        $('#TB09213S_dprtCd').on('input', function () { resetPGgrids("TB09213S"); })                //담당부서
        $('#TB09213S_dprtNm').on('input', function () { resetPGgrids("TB09213S"); })                //담당부서명
        $('#TB09213S_ibDealNo').on('input', function () { resetPGgrids("TB09213S"); })              //딜번호
        $('#TB09213S_ibDealNm').on('input', function () { resetPGgrids("TB09213S"); })              //딜명
        $('#TB09213S_I029').on('change', function () { resetPGgrids("TB09213S"); });                //투자상품대분류
        $('#TB09213S_I030').on('change', function () { resetPGgrids("TB09213S"); });                //투자상품중분류
        $('#TB09213S_I031').on('change', function () { resetPGgrids("TB09213S"); });                //투자상품소분류
        $('#TB09213S_I028').on('change', function () { resetPGgrids("TB09213S"); });                //상품상세코드
        $('#TB09213S_corpRgstNo').on('change', function () { resetPGgrids("TB09213S"); });          //거래상대방코드
        $('#TB09213S_entpRnm').on('change', function () { resetPGgrids("TB09213S"); });             //거래상대방명


        // 1개월전 ~ 오늘일자 디폴트 세팅
        $("#TB09213S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09213S_toDate").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09213S_dealPflsSttnList",
                colModel: colGrpDealPflsSttnList,
                scrollModel: { autoFit: false },
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjDealPflsSttnList = $("#TB09213S_dealPflsSttnList").pqGrid("instance");

    });


  function loadSelectBoxContents() {
    getSelectBoxList("TB09213S", "I029/I030/I031/I028");
  }


    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {

        let TB09213S_fromDate = $("#TB09213S_fromDate").val(); // 조회시작일자
        let TB09213S_toDate = $("#TB09213S_toDate").val();     // 조회종료일자
        let msgError = "";

        if (isEmpty(TB09213S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09213S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09213S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09213S_toDate)) {
        msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09213S_fromDate > TB09213S_toDate) {
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
        $("#TB09213S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09213S_toDate").val(getToday());
        $('#TB09213S_dprtCd').val('');
        $('#TB09213S_dprtNm').val('');
        $('#TB09213S_ibDealNo').val('');
        $('#TB09213S_ibDealNm').val('');
        $('#TB09213S_I029').val('');
        $('#TB09213S_I030').val('');
        $('#TB09213S_I031').val('');
        $('#TB09213S_I028').val('');
        $('#TB09213S_corpRgstNo').val('');
        $('#TB09213S_entpRnm').val('');


        resetPGgrids("TB09213S")
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
    let colGrpDealPflsSttnList = [
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
            title: "거래상대방",
            dataType: "string",
            dataIndx: "execDcd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "Ⅰ.영업수익",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "수수료수익",
                    dataType: "string",
                    dataIndx: "cmpNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "상품수익",
                    dataType: "string",
                    dataIndx: "bzno",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
                {
                    title: "이자수익",
                    dataType: "string",
                    dataIndx: "chrrAreaNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "기타손익",
                    dataType: "string",
                    dataIndx: "chrrGrupNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
            ],
        }
        , {
            title: "Ⅱ. 영업비용",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "수수료비용",
                    dataType: "string",
                    dataIndx: "bzno",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
                {
                    title: "이자비용",
                    dataType: "string",
                    dataIndx: "chrrAreaNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
            ],
        }
        ,  {
            title: "Ⅲ. 조정영업이익 계",
            dataType: "string",
            dataIndx: "execDcd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        ,  {
            title: "부서",
            dataType: "string",
            dataIndx: "execDcd",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];



    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset
    }
})();
