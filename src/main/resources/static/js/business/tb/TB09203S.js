const TB09203Sjs = (function () {
    let pqGridObjHrAreaList;

    $(document).ready(function () {

        $('#TB09203S_stdrDt').on('input', function () { resetPGgrids("TB09203S"); })                //기준일자
        $('[name="TB09203S_blceYn"]').on('input', function () { resetPGgrids("TB09203S"); })        //금액
        $('[name="TB09203S_unAmtYn"]').on('input', function () { resetPGgrids("TB09203S"); })       //단위
        $('#TB09203S_highDngrStdrCd').on('input', function () { resetPGgrids("TB09203S"); })        //고위험기준
        $('#TB09203S_areaDcd').on('input', function () { resetPGgrids("TB09203S"); })               //지역
        $('[name="TB09203S_rlesNonPfYn"]').on('input', function () { resetPGgrids("TB09203S"); })   //부동산PF

        sltctBoxSet();

        // 오늘일자 디폴트 세팅
        $("#TB09203S_stdrDt").val(getToday());

        let arrPqGridObj = [
            {
                height: 500,
                maxHeight: 500,
                id: "TB09203S_hrAreaList",
                colModel: colHrAreaList,
            },
        ];
        setPqGrid(arrPqGridObj);
        pqGridObjHrAreaList = $("#TB09203S_hrAreaList").pqGrid("instance");

    });

    //selectBox 세팅
    function sltctBoxSet() {
        let selectBox = getSelectBoxList(
            "TB09203S",
            "B023",   //지역코드
            false
        );

        let TB09203S_hrAreaSelect;

        TB09203S_hrAreaSelect = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "B023";
        })

        let B023html;

        TB09203S_hrAreaSelect.forEach((item) => {
            B023html += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#TB09203S_areaDcd").append(B023html);

        // $('#TB09203S_dprtNm').on('change', function () {
        //     $('#TB09203S_dprtCd').val($('#TB09203S_dprtNm').val())
        // });

        //setFormElementsStateByUserRole();
    }

    // 유효성 검사용 날짜패턴
    var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    function ibSpecSearch() {
        let TB09203S_Date = $("#TB09203S_stdrDt").val(); // 조회시작일자
        let msgError = "";

        if (isEmpty(TB09203S_Date)) {
            msgError = "필수 입력값(기준일자)을 입력해주세요.";
            alertPopup();
        } else if (!pattern.test(TB09203S_Date)) {
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
        $("#TB09203S_stdrDt").val(getToday());
        $('[name="TB09203S_blce"][value="01"]').prop('checked', true);
        $('[name="TB09203S_unAmtYn"][value="01"]').prop('checked', true);
        $("#TB09203S_highDngrStdrCd").val("");
        $("#TB09203S_areaDcd").val("");
        $('[name="TB09203S_rlesNonPfYn"][value="01"]').prop('checked', true);


        resetPGgrids("TB09203S")
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
    let colHrAreaList = [
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
        let blob = $('#TB09203S_hrAreaList').pqGrid('instance').exportExcel({});
        let fileName;
        fileName = "투자현황고위험및지역별.xlsx";
        pq.saveAs(blob, fileName);
    }

    return {
        ibSpecSearch: ibSpecSearch,
        reset: reset,
        saveExcelFile: saveExcelFile
    }
})();
