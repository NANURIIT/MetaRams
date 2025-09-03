const TB09210Sjs = (function () {
    let pqGridObjDealList;
    let pqGridObjRlesDealList;

    $(document).ready(function () {

        $('#TB09210S_fromDate').on('input', function () { resetPGgrids("TB09210S"); })              //취급시작일자
        $('#TB09210S_toDate').on('input', function () { resetPGgrids("TB09210S"); })                //취급종료일자
        $('#TB09210S_endDealInclsnYn').on('change', function () { resetPGgrids("TB09210S"); });     //종료딜포함여부
        $('#TB09210S_ibDealNo').on('input', function () { resetPGgrids("TB09210S"); })              //딜번호
        $('#TB09210S_ibDealNm').on('input', function () { resetPGgrids("TB09210S"); })              //딜명
        $('#TB09210S_busiTpClsfLclsCd').on('change', function () { resetPGgrids("TB09210S"); });    //사업유형대분류
        $('#TB09210S_busiTpClsfMdclCd').on('change', function () { resetPGgrids("TB09210S"); });    //사업유형중분류
        $('#TB09210S_invTpClsfLclsCd').on('change', function () { resetPGgrids("TB09210S"); });     //투자유형대분류
        $('#TB09210S_invTpClsfMdclCd').on('change', function () { resetPGgrids("TB09210S"); });     //투자유형중분류
        $('#TB09210S_dprtCd').on('input', function () { resetPGgrids("TB09210S"); })                //담당부서
        $('#TB09210S_dprtNm').on('input', function () { resetPGgrids("TB09210S"); })                //담당부서명
        //$('[name="TB09210S_afltPtciYn"]').on('input', function () { resetPGgrids("TB09210S"); })  //계열사참여여부
        //$('[name="TB09210S_unitDcd"]').on('input', function () { resetPGgrids("TB09210S"); })     //단위

        $('#TB09210S_rles_fromDate').on('input', function () { resetPGgrids("TB09210S"); })              //취급시작일자
        $('#TB09210S_rles_toDate').on('input', function () { resetPGgrids("TB09210S"); })                //취급종료일자
        $('#TB09210S_rles_ibDealNo').on('input', function () { resetPGgrids("TB09210S"); })              //딜번호
        $('#TB09210S_rles_ibDealNm').on('input', function () { resetPGgrids("TB09210S"); })              //딜명
        $('#TB09210S_rles_endDealInclsnYn').on('change', function () { resetPGgrids("TB09210S"); });     //종료딜포함여부
        $('#TB09210S_rles_busiTpClsfLclsCd').on('change', function () { resetPGgrids("TB09210S"); });    //사업유형대분류
        $('#TB09210S_rles_busiTpClsfMdclCd').on('change', function () { resetPGgrids("TB09210S"); });    //사업유형중분류
        $('#TB09210S_rles_invTpClsfLclsCd').on('change', function () { resetPGgrids("TB09210S"); });     //투자유형대분류
        $('#TB09210S_rles_invTpClsfMdclCd').on('change', function () { resetPGgrids("TB09210S"); });     //투자유형중분류
        $('[name="TB09210S_ovduYn"]').on('input', function () { resetPGgrids("TB09210S"); })             //연체여부
        $('[name="TB09210S_tlmtPrfLoseYn"]').on('input', function () { resetPGgrids("TB09210S"); })      //기한이익상실여부
        $('[name="TB09210S_expXtnsYn"]').on('input', function () { resetPGgrids("TB09210S"); })          //만기연장여부
        $('[name="TB09210S_csstYn"]').on('input', function () { resetPGgrids("TB09210S"); })             //착공여부
        $('[name="TB09210S_rclmYn"]').on('input', function () { resetPGgrids("TB09210S"); })             //회수여부
        $('[name="TB09210S_exitSlltRtShrtgYn"]').on('input', function () { resetPGgrids("TB09210S"); })  //분양률미달
        $('#TB09210S_mngmBzplYn').on('change', function () { resetPGgrids("TB09210S"); });               //관리사업장
        $('#TB09210S_ltvRt').on('input', function () { resetPGgrids("TB09210S"); })                      //LTV


        // 1개월전 ~ 오늘일자 디폴트 세팅
        $("#TB09210S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09210S_toDate").val(getToday());
        $("#TB09210S_rles_fromDate").val(addMonth(getToday(), -1));
        $("#TB09210S_rles_toDate").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09210S_dealList",
                colModel: colGrpDealList,
                scrollModel: { autoFit: false },
            },
            {
                height: 500,
                maxHeight: 500,
                id: "TB09210S_rlesDealList",
                colModel: colGrpRlesDealList,
                scrollModel: { autoFit: false },
            }
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjDealList       = $("#TB09210S_dealList").pqGrid("instance");
        pqGridObjRlesDealList   = $("#TB09210S_rlesDealList").pqGrid("instance");

    });

    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {

        let TB09210S_fromDate = $("#TB09210S_fromDate").val(); // 조회시작일자
        let TB09210S_toDate = $("#TB09210S_toDate").val();     // 조회종료일자
        let msgError = "";

        if (isEmpty(TB09210S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09210S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09210S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09210S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09210S_fromDate > TB09210S_toDate) {
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
    function tab1BtnReset() {
        $("#TB09210S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09210S_toDate").val(getToday());
        $("#TB09210S_endDealInclsnYn").prop("checked", false);
        $('#TB09210S_ibDealNo').val('');
        $('#TB09210S_ibDealNm').val('');
        $('#TB09210S_busiTpClsfLclsCd').val('');
        $('#TB09210S_busiTpClsfMdclCd').val('');
        $('#TB09210S_invTpClsfLclsCd').val('');
        $('#TB09210S_invTpClsfMdclCd').val('');
        $('#TB09210S_dprtCd').val('');
        $('#TB09210S_dprtNm').val('');

        resetPGgrids("TB09210S")
    }

    function tab2BtnReset() {
        $("#TB09210S_rles_fromDate").val(addMonth(getToday(), -1));
        $("#TB09210S_rles_toDate").val(getToday());
        $("#TB09210S_rles_ibDealNo").val("");
        $("#TB09210S_rles_ibDealNm").val("");
        $("#TB09210S_rles_endDealInclsnYn").prop('checked', false);
        $("#TB09210S_rles_busiTpClsfLclsCd").val("");
        $("#TB09210S_rles_busiTpClsfMdclCd").val("");
        $("#TB09210S_rles_invTpClsfLclsCd").val("");
        $("#TB09210S_rles_invTpClsfMdclCd").val("");
        $('[name="TB09210S_ovduYn"][value="00"]').prop('checked', true);
        $('[name="TB09210S_tlmtPrfLoseYn"][value="00"]').prop('checked', true);
        $('[name="TB09210S_expXtnsYn"][value="00"]').prop('checked', true);
        $('[name="TB09210S_csstYn"][value="00"]').prop('checked', true);
        $('[name="TB09210S_rclmYn"][value="00"]').prop('checked', true);
        $('[name="TB09210S_exitSlltRtShrtgYn"][value="00"]').prop('checked', true);
        $("#TB09210S_mngmBzplYn").val("");
        $("#TB09210S_ltvRt").val("");

        resetPGgrids("TB09210S")
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
    let colGrpDealList = [
        {
            title: "딜번호",
            dataType: "string",
            dataIndx: "hdqtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "딜명",
            dataType: "string",
            dataIndx: "dprtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "사업유형1",
            dataType: "integer",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "사업유형2",
            dataType: "integer",
            dataIndx: "adjtmtBsnssPrfSmm",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형1",
            dataType: "integer",
            dataIndx: "aprnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "잔액",
            dataType: "integer",
            dataIndx: "ortnFndsCost",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "취급일",
            dataType: "integer",
            dataIndx: "purBsnErnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "만기일",
            dataType: "integer",
            dataIndx: "noprErngPflsAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "본부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "부서",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];

    let colGrpRlesDealList = [
        {
            title: "딜번호",
            dataType: "string",
            dataIndx: "hdqtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "딜명",
            dataType: "string",
            dataIndx: "dprtNm",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "사업유형1",
            dataType: "integer",
            dataIndx: "adjtmtBsnssPrfSmm",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "사업유형2",
            dataType: "integer",
            dataIndx: "aprnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형1",
            dataType: "integer",
            dataIndx: "ortnFndsCost",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형2",
            dataType: "integer",
            dataIndx: "purBsnErnAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "잔액",
            dataType: "integer",
            dataIndx: "noprErngPflsAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "취급일",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "만기일",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "연체여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "기한이익상실여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "만기연장여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "착공여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "회수여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "Exit분양율미달",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "관리사업장 여부",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "LTV",
            dataType: "integer",
            dataIndx: "pflsSmmAmt",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];

    function setRlesFnnDealListGrid(){
		setTimeout(() => pqGridObjRlesDealList.refresh(), 1)
	}

    /**
     * 엑셀저장 PQGrid ExcelExport
     */
    function saveTab1ExcelFile() {
        let blob = $('#TB09210S_dealList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "딜목록 조회.xlsx";
        pq.saveAs(blob, fileName);
    }

    function saveTab2ExcelFile() {
        let blob = $('#TB09210S_rlesDealList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "부동산금융 딜목록 조회.xlsx";
        pq.saveAs(blob, fileName);
    }

    return {
        ibSpecSearch: ibSpecSearch,
        tab1BtnReset: tab1BtnReset,
        tab2BtnReset: tab2BtnReset,
        saveTab1ExcelFile: saveTab1ExcelFile,
        saveTab2ExcelFile: saveTab2ExcelFile,
        setRlesFnnDealListGrid: setRlesFnnDealListGrid
    }
})();
