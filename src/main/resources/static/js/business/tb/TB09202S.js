const TB09202Sjs = (function () {
    let pqGridObjInvSttnList;

    $(document).ready(function () {

        $('#TB09202S_stdrDt').on('input', function () { resetPGgrids("TB09202S"); })                //기준일자
        $('[name="TB09202S_blceYn"]').on('input', function () { resetPGgrids("TB09202S"); })        //금액
        $('[name="TB09202S_unAmtYn"]').on('input', function () { resetPGgrids("TB09202S"); })       //단위
        $('#TB09202S_dprtNm').on('input', function () { resetPGgrids("TB09202S"); })                //부서
        //$('#').on('input', function () { resetPGgrids("TB09202S"); })                             //담당부서코드
        //$('#').on('input', function () { resetPGgrids("TB09202S"); })                             //담당부서명
        $('[name="TB09202S_rlesNonPfYn"]').on('input', function () { resetPGgrids("TB09202S"); })   //부동산PF

        sltctBoxSet();

        // 오늘일자 디폴트 세팅
        $("#TB09202S_stdrDt").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09202S_dprtIbInvSttnList",
                colModel: colSttnList,
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjInvSttnList = $("#TB09202S_dprtIbInvSttnList").pqGrid("instance");

    });

    //selectBox 세팅
    function sltctBoxSet() {
        let selectBox = getSelectBoxList(
            "TB09202S",
            "D010",   //부서코드
            false
        );

        let TB09202S_dprtSelect;

        TB09202S_dprtSelect = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "D010";
        })

        let D010html;

        TB09202S_dprtSelect.forEach((item) => {
            D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#TB09202S_dprtNm").append(D010html);

        // $('#TB09202S_dprtNm').on('change', function () {
        //     $('#TB09202S_dprtCd').val($('#TB09202S_dprtNm').val())
        // });

        //setFormElementsStateByUserRole();
    }

    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {
        let TB09202S_Date = $("#TB09202S_stdrDt").val(); // 조회시작일자
        let msgError = "";

        if (isEmpty(TB09202S_Date)) {
            msgError = "필수 입력값(기준일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09202S_Date)) {
            msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
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
        $("#TB09202S_stdrDt").val(getToday());
        $('[name="TB09202S_blceYn"][value="01"]').prop('checked', true);
        $('[name="TB09202S_unAmtYn"][value="01"]').prop('checked', true);
        $("#TB09202S_dprtNm").val("");
        $('[name="TB09202S_rlesNonPfYn"][value="01"]').prop('checked', true);

        resetPGgrids("TB09202S")
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
    let colSttnList = [
        {
            title: "본부",
            dataType: "string",
            dataIndx: "hdqtNm",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "부서",
            dataType: "string",
            dataIndx: "dprtNm",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "구분",
            dataType: "string",
            dataIndx: "sttsDcd",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "IB 전체",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "대출채권",
                    dataType: "integer",
                    dataIndx: "allLoanBondAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "채무보증",
                    dataType: "integer",
                    dataIndx: "allDbtEnsrAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "기타",
                    dataType: "integer",
                    dataIndx: "allEtcAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "계",
                    dataType: "integer",
                    dataIndx: "allSmmAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        , {
            title: "부동산금융",
            dataType: "integer",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: "range" }] },
            colModel: [
                {
                    title: "대출채권",
                    dataType: "integer",
                    dataIndx: "rlesLoanBondAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "채무보증",
                    dataType: "integer",
                    dataIndx: "rlesDbtEnsrAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "기타",
                    dataType: "integer",
                    dataIndx: "rlesEtcAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
                {
                    title: "계",
                    dataType: "integer",
                    dataIndx: "rlesSmmAmt",
                    halign: "center",
                    align: "right",
                    width: "10%",
                },
            ],
        }
        , {
            title: "RWA",
            dataType: "float",
            dataIndx: "rwaRt",
            halign: "center",
            align: "right",
            filter: { crules: [{ condition: 'range' }] }
        }
    ];


    /**
     * 엑셀저장 PQGrid ExcelExport
     */
    function saveExcelFile() {
        let blob = $('#TB09202S_dprtIbInvSttnList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "부서별IB투자현황.xlsx";
        pq.saveAs(blob, fileName);
    }

    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset,
        saveExcelFile: saveExcelFile
    }
})();
