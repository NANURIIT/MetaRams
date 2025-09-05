const TB09211Sjs = (function () {
    let pqGridObjDealList;
    let pqGridObjRlesDealList;

    $(document).ready(function () {

        $('#TB09211S_fromDate').on('input', function () { resetPGgrids("TB09211S"); })              //취급시작일자
        $('#TB09211S_toDate').on('input', function () { resetPGgrids("TB09211S"); })                //취급종료일자
        $('#TB09211S_endDealInclsnYn').on('change', function () { resetPGgrids("TB09211S"); });     //종료딜포함여부
        $('#TB09211S_ibDealNo').on('input', function () { resetPGgrids("TB09211S"); })              //딜번호
        $('#TB09211S_ibDealNm').on('input', function () { resetPGgrids("TB09211S"); })              //딜명
        $('#TB09211S_busiTpClsfLclsCd').on('change', function () { resetPGgrids("TB09211S"); });    //사업유형대분류
        $('#TB09211S_invTpClsfLclsCd').on('change', function () { resetPGgrids("TB09211S"); });     //투자유형대분류
        $('#TB09211S_invTpClsfMdclCd').on('change', function () { resetPGgrids("TB09211S"); });     //투자유형중분류
        $('#TB09211S_dprtCd').on('input', function () { resetPGgrids("TB09211S"); })                //담당부서
        $('#TB09211S_dprtNm').on('input', function () { resetPGgrids("TB09211S"); })                //담당부서명
        $('#TB09211S_inqTmplTpCd').on('input', function () { resetPGgrids("TB09211S"); })           //조회템플릿유형

        $('#TB09211S_rles_fromDate').on('input', function () { resetPGgrids("TB09211S"); })              //취급시작일자
        $('#TB09211S_rles_toDate').on('input', function () { resetPGgrids("TB09211S"); })                //취급종료일자
        $('#TB09211S_rles_ibDealNo').on('input', function () { resetPGgrids("TB09211S"); })              //딜번호
        $('#TB09211S_rles_ibDealNm').on('input', function () { resetPGgrids("TB09211S"); })              //딜명
        $('#TB09211S_rles_endDealInclsnYn').on('change', function () { resetPGgrids("TB09211S"); });     //종료딜포함여부
        $('#TB09211S_rles_busiTpClsfLclsCd').on('change', function () { resetPGgrids("TB09211S"); });    //사업유형대분류
        $('#TB09211S_rles_invTpClsfLclsCd').on('change', function () { resetPGgrids("TB09211S"); });     //투자유형대분류
        $('#TB09211S_rles_invTpClsfMdclCd').on('change', function () { resetPGgrids("TB09211S"); });     //투자유형중분류
        $('#TB09211S_rles_dprtCd').on('input', function () { resetPGgrids("TB09211S"); })                //담당부서
        $('#TB09211S_rles_dprtNm').on('input', function () { resetPGgrids("TB09211S"); })                //담당부서명
        $('#TB09211S_rles_inqTmplTpCd').on('input', function () { resetPGgrids("TB09211S"); })           //조회템플릿유형


        // 1개월전 ~ 오늘일자 디폴트 세팅
        $("#TB09211S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09211S_toDate").val(getToday());

        $("#TB09211S_rles_fromDate").val(addMonth(getToday(), -1));
        $("#TB09211S_rles_toDate").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09211S_etprDealList",
                colModel: colGrpDealList,
                scrollModel: { autoFit: false },
            },
            {
                height: 500,
                maxHeight: 500,
                id: "TB09211S_rlesDealList",
                colModel: colGrpRlesDealList,
                scrollModel: { autoFit: false },
            }
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjDealList       = $("#TB09211S_etprDealList").pqGrid("instance");
        pqGridObjRlesDealList   = $("#TB09211S_rlesDealList").pqGrid("instance");

    });

    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {

        let TB09211S_fromDate = $("#TB09211S_fromDate").val(); // 조회시작일자
        let TB09211S_toDate = $("#TB09211S_toDate").val();     // 조회종료일자
        let msgError = "";

        if (isEmpty(TB09211S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09211S_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09211S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09211S_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09211S_fromDate > TB09211S_toDate) {
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


    function ibSpecSearch2() {

        let TB09211S_rles_fromDate = $("#TB09211S_rles_fromDate").val(); // 조회시작일자
        let TB09211S_rles_toDate = $("#TB09211S_rles_toDate").val();     // 조회종료일자

        let msgError = "";

        if (isEmpty(TB09211S_rles_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09211S_rles_fromDate)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
            alertPopup();
        } else if (isEmpty(TB09211S_rles_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09211S_rles_toDate)) {
            msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
            alertPopup();
        } else if (TB09211S_rles_fromDate > TB09211S_rles_toDate) {
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
        $("#TB09211S_fromDate").val(addMonth(getToday(), -1));
        $("#TB09211S_toDate").val(getToday());
        $("#TB09211S_endDealInclsnYn").prop("checked", false);
        $('#TB09211S_ibDealNo').val('');
        $('#TB09211S_ibDealNm').val('');
        $('#TB09211S_busiTpClsfLclsCd').val('');
        $('#TB09211S_invTpClsfLclsCd').val('');
        $('#TB09211S_invTpClsfMdclCd').val('');
        $('#TB09211S_dprtCd').val('');
        $('#TB09211S_dprtNm').val('');
        $('#TB09211S_inqTmplTpCd').val('');

        resetPGgrids("TB09211S")
    }

    function tab2BtnReset() {
        $("#TB09211S_rles_fromDate").val(addMonth(getToday(), -1));
        $("#TB09211S_rles_toDate").val(getToday());
        $("#TB09211S_rles_ibDealNo").val("");
        $("#TB09211S_rles_ibDealNm").val("");
        $("#TB09211S_rles_endDealInclsnYn").prop('checked', false);
        $("#TB09211S_rles_busiTpClsfLclsCd").val("");
        $("#TB09211S_rles_invTpClsfLclsCd").val("");
        $("#TB09211S_rles_invTpClsfMdclCd").val("");
        $('#TB09211S_rles_dprtCd').val('');
        $('#TB09211S_rles_dprtNm').val('');
        $('#TB09211S_rles_inqTmplTpCd').val('');

        resetPGgrids("TB09211S")
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
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "사업유형2",
            dataType: "string",
            dataIndx: "busiTpClsfMdclCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형1",
            dataType: "string",
            dataIndx: "invTpClsfLclsCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형2",
            dataType: "string",
            dataIndx: "invTpClsfMdclCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "잔액",
            dataType: "integer",
            dataIndx: "blce",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "취급일",
            dataType: "string",
            dataIndx: "trDt",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "만기일",
            dataType: "string",
            dataIndx: "expDt",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "기본정보",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "회사명",
                    dataType: "string",
                    dataIndx: "cmpNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "사업자번호",
                    dataType: "string",
                    dataIndx: "bzno",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
                {
                    title: "(주)담당지역",
                    dataType: "string",
                    dataIndx: "chrrAreaNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "(주)담당그룹",
                    dataType: "string",
                    dataIndx: "chrrGrupNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
        , {
            title: "상세정보 > 종목정보",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "종목명",
                    dataType: "string",
                    dataIndx: "isNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
        , {
            title: "상세정보 > 취급규모",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "모집총액",
                    dataType: "integer",
                    dataIndx: "rcrtAllAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
    ];

    let colGrpRlesDealList = [
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
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        }
        , {
            title: "사업유형2",
            dataType: "string",
            dataIndx: "busiTpClsfMdclCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형1",
            dataType: "string",
            dataIndx: "invTpClsfLclsCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "투자유형2",
            dataType: "string",
            dataIndx: "invTpClsfMdclCd",
            halign: "center",
            align: "left",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "잔액",
            dataType: "integer",
            dataIndx: "blce",
            halign: "center",
            align: "right",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "취급일",
            dataType: "string",
            dataIndx: "trDt",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "만기일",
            dataType: "string",
            dataIndx: "expDt",
            halign: "center",
            align: "center",
            width: "10%",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "기본정보",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "회사명",
                    dataType: "string",
                    dataIndx: "cmpNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "사업자번호",
                    dataType: "string",
                    dataIndx: "bzno",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
                {
                    title: "(주)담당지역",
                    dataType: "string",
                    dataIndx: "chrrAreaNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "(주)담당그룹",
                    dataType: "string",
                    dataIndx: "chrrGrupNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
        , {
            title: "상세정보 > 종목정보",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "종목명",
                    dataType: "string",
                    dataIndx: "isNm",
                    halign: "center",
                    align: "left",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
        , {
            title: "상세정보 > 취급규모",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "모집총액",
                    dataType: "integer",
                    dataIndx: "rcrtAllAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "-",
                    dataType: "string",
                    dataIndx: "",
                    halign: "center",
                    align: "center",
                    width: "10%",
                },
            ],
        }
    ];

    function setRlesFnnList(){
		setTimeout(() => pqGridObjRlesDealList.refresh(), 1)
	}

    /**
     * 엑셀저장 PQGrid ExcelExport
     */
    function saveTab1ExcelFile() {
        let blob = $('#TB09211S_etprDealList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "기업금융 원장조회.xlsx";
        pq.saveAs(blob, fileName);
    }

    function saveTab2ExcelFile() {
        let blob = $('#TB09211S_rlesDealList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "부동산금융 원장조회.xlsx";
        pq.saveAs(blob, fileName);
    }


    return {
        ibSpecSearch: ibSpecSearch,
        ibSpecSearch2: ibSpecSearch2,
        tab1BtnReset: tab1BtnReset,
        tab2BtnReset: tab2BtnReset,
        saveTab1ExcelFile: saveTab1ExcelFile,
        saveTab2ExcelFile: saveTab2ExcelFile,
        setRlesFnnList: setRlesFnnList,
    }
})();
