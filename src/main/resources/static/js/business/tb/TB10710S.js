const TB10710Sjs = function () {

    $(document).ready(function () {
        pqGrid();
        fnSelectBox();
        $("#selectDate_1").val(getCurrentDate())
        $("#selectDate_2").val(getLastDateOfCurrentMonth())
        $('#disabledView').find('input').prop('disabled', true);
        // createOption();
    });

    function getCurrentDate() {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2); // 1월은 0부터 시작하므로 +1
        var day = ('0' + today.getDate()).slice(-2);

        return year + '-' + month + '-' + day; // YYYY-MM-DD 형식으로 반환
    }

    function getLastDateOfCurrentMonth() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1; // 1월은 0부터 시작하므로 +1

        // month + 1월의 0번째 날짜는 month 월의 마지막 날을 반환함
        var lastDay = new Date(year, month, 0).getDate();

        return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + lastDay).slice(-2);
    }
    /*
     *  =====================PQGRID=====================
     */

    /*
     *  pqGrid colModel
     */
    function TB10710S_colModelData(id) {
        const TB10710S_colModel1 = [
            {
                title: "순번",
                dataType: "string",
                dataIndx: "rownum",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
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
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "등록일자",
                dataType: "string",
                dataIndx: "rgstDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    return formatDate(ui.cellData);
                },
            }
            , {
                title: "담당자사번",
                dataType: "string",
                dataIndx: "chrrStfno",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "담당자명",
                dataType: "string",
                dataIndx: "chrrStfno",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "조치예정일",
                dataType: "string",
                dataIndx: "actnPrarDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    return formatDate(ui.cellData);
                },
            }
            , {
                title: "조치일자",
                dataType: "string",
                dataIndx: "actnDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] },
                render: function (ui) {
                    return formatDate(ui.cellData);
                },
            }
            , {
                title: "관리부서",
                dataType: "string",
                dataIndx: "mngmBdcd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "부서명",
                dataType: "string",
                dataIndx: "cdVlNm",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "통보여부",
                dataType: "string",
                dataIndx: "dpchYn",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "업무종류코드",
                dataType: "string",
                dataIndx: "dudtMngmDtldJobKndCd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "기업체",
                dataType: "string",
                dataIndx: "bzepName",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "계정과목",
                dataType: "string",
                dataIndx: "actsCd",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
        ]

        const TB10710S_colModel2 = [
            {
                title: "파라미터ID",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "파라미터내용",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
        ]

        const TB10710S_colModel3 = [
            {
                title: "통보순번",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "직원번호",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "통보내용",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
            , {
                title: "응답코드",
                dataType: "string",
                dataIndx: "aplyStrtDt",
                halign: "center",
                align: "center",
                filter: { crules: [{ condition: 'range' }] }
            }
        ]

        if (id === 1) {
            return TB10710S_colModel1;
        } else if (id === 2) {
            return TB10710S_colModel2;
        } else if (id === 3) {
            return TB10710S_colModel3;
        }
    }

    /*
     *  PQGRID SETTING
     */
    function pqGrid() {
        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 280
                , maxHeight: 280
                , id: 'TB10710S_colModel1'
                , colModel: TB10710S_colModelData(1)
                , scrollModel: { autoFit: true }
                , editable: false
                // , rowClick: function (event, ui) {
                //     if(TB10710S_rowData === ui.rowData){
                //         TB10710S_rowData = dummyData;
                //     }else {
                //         TB10710S_rowData = ui.rowData;
                //     }
                // }
                , selectionModel: { type: 'row' }
            }
            , {
                height: 220
                , maxHeight: 220
                , id: 'TB10710S_colModel2'
                , colModel: TB10710S_colModelData(2)
                , scrollModel: { autoFit: true }
                , editable: false
                // , rowClick: function (event, ui) {
                //     if(TB10710S_rowData === ui.rowData){
                //         TB10710S_rowData = dummyData;
                //     }else {
                //         TB10710S_rowData = ui.rowData;
                //     }
                // }
                , selectionModel: { type: 'row' }
            }
            , {
                height: 220
                , maxHeight: 220
                , id: 'TB10710S_colModel3'
                , colModel: TB10710S_colModelData(3)
                , scrollModel: { autoFit: true }
                , editable: false
                // , rowClick: function (event, ui) {
                //     if(TB10710S_rowData === ui.rowData){
                //         TB10710S_rowData = dummyData;
                //     }else {
                //         TB10710S_rowData = ui.rowData;
                //     }
                // }
                , selectionModel: { type: 'row' }
            }
        ];
        setPqGrid(pqGridObjs);
        $("#TB10710S_colModel").pqGrid('instance');
    }

    /**
     * selectBox 부서코드 set
     */
    function fnSelectBox() {
        let selectBox = getSelectBoxList(
            "TB10710S",
            "D010",   //부서코드
            false
        );

        let TB07120S_grdSelect

        TB07120S_grdSelect = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "D010";
        })

        let D010html;

        TB07120S_grdSelect.forEach((item) => {
            D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#TB10710S_dprtNm").append(D010html);

        $('#TB10710S_dprtNm').on('change', function () {
            $('#TB10710S_dprtCd').val($('#TB10710S_dprtNm').val())
        })

    }

    /*
     *  ====================PQGRID변환====================
     */

    /*
     *  PQGRID 초기화
     */
    function TB10710S_resetPqGrid(id) {
        $(`#${id}`).pqGrid('option', 'dataModel.data', []);
        $(`#${id}`).pqGrid('refreshDataAndView');
    }

    /*
     *  =====================PQGRID=====================
     */


    /*
     *  =====================SELECT=====================
     */

    function select() {

        let prevDate = $('#selectDate_1').val();
        let nextDate = $('#selectDate_2').val();

        if (new Date(prevDate) > new Date(nextDate)) {
            prevDate = $('#selectDate_2').val();
            nextDate = $('#selectDate_1').val();
        }

        let paramData = {
            prevDate: unformatDate(prevDate)
            , nextDate: unformatDate(nextDate)
            , mngmOrgno: `%${$('#TB10710S_dprtCd').val()}%`
            , actsCd: `%${$('#TB10710S_actsCd').val()}%`
            , dealNo: `%${$('#TB10710S_ibDealNo').val()}%`
            , ardyBzepNo: `%${$('#TB10710S_ardyBzepNo').val()}%`
            , dudtMngmDtldJobKndCd: `%${$('#TB10710S_dudtMngmDtldJobKndCd').val()}%`
        }

        $.ajax({
            type: "POST",
            url: `/TB10710S/selectIBIMS981B`,
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    let detail = $('#TB10710S_colModel1').pqGrid('instance')
                    detail.setData(data);
                    detail.getData();
                } else {
                    Swal.fire({
                        icon: 'warning'
                        , text: "조회된 정보가 없습니다!"
                        , confirmButtonText: "확인"
                    });
                    TB10710S_resetPqGrid("TB10710S_colModel1");
                }
            }, error: function () {
                Swal.fire({
                    icon: 'error'
                    , title: "Error!"
                    , text: "정보 조회에 실패하였습니다."
                    , confirmButtonText: "확인"
                });
            }
        });



    }

    /*
     *  =====================SELECT=====================
     */

    return {
        select: select      //  조회
    }
}();