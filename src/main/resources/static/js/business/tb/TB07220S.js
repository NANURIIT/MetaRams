const TB07220Sjs = (function () {
    $(document).ready(function () {
        // 조회조건 Default Set
        setMonthInput();
        sltctBoxSet();
        
        setGridOptions();
    });

    function setMonthInput() {
        // 1개월전 ~ 현재월 디폴트 세팅
        $("#TB07220S_fromMm").val(addMonth(getToday(), -1).slice(0, 7));
        $("#TB07220S_toMm").val(getToday().slice(0, 7));
      }

    //selectBox 세팅
    function sltctBoxSet(){
        let selectBox = getSelectBoxList(
            "TB07220S",
            "D010",   //부서코드
            false
        );

        let TB07220S_dprtSelect;

        TB07220S_dprtSelect = selectBox.filter(function(item) {
            return item.cmnsGrpCd === "D010";
        })

        let D010html;

        TB07220S_dprtSelect.forEach((item) => {
            D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#TB07220S_dprtNm").append(D010html);

        $('#TB07220S_dprtNm').on('change', function() {
            $('#TB07220S_dprtCd').val($('#TB07220S_dprtNm').val())
        });

        setFormElementsStateByUserRole();
    }

    	// 화면 초기화
	const rmReset = (() => {
        // 조회년월 초기화
        setMonthInput();
        // SPC 초기화
        $("#TB07220S_ardyBzepNo").val("");
        $("#TB07220S_ardyBzepNm").val("");
        // 신청상태 초기화
        $("#TB07220S_decdSttsDcd").val("999"); //진행상태
        // 관리부점 초기화
        setFormElementsStateByUserRole();
        // 그리드 초기화
		 TB07220S_clearAllGrid();
		// TB03030S_setFileButtonEnabled(false);
	});

	function TB07220S_clearAllGrid(){
		$("#TB07220S_spcBlceGrid").pqGrid("option", "dataModel.data", []);
		$("#TB07220S_spcBlceGrid").pqGrid("refreshDataAndView");		
	}

    //부서명 변경시 부서번호 클리어
    $("#userDprtNm").on('input', function(){
        $('#userDprtCd').val("");  
    });
    
    /**
     * 로그인한 사용자의 권한에 따라 담당자번호 ,부서번호 비활성화 상태 조정
     * 권한 조건은 미정이며,
     * 현재는 로그인한 사원의 정보가 설정된 후, 관련 필드를 비활성화 상태로 설정
     */
    function setFormElementsStateByUserRole(){
        let dprtCd = $('#userDprtCd').val();
        let dprtNm = $('#userDprtNm').val();
        
        //로그인한 사원 정보 세팅 
        $('#TB07220S_dprtCd').val(dprtCd);
        $('#TB07220S_dprtNm').val(dprtCd);
    }
    
    // 유효성 검사용 날짜패턴
    var pattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;

    function selectBalanceInfoList() {

        let TB07220S_fromMm = $("#TB07220S_fromMm").val(); // 조회시작일자
        let TB07220S_toMm = $("#TB07220S_toMm").val(); // 조회종료일자
        let msgError = "";
        
        if (isEmpty(TB07220S_fromMm)) {
        msgError = "필수 입력값(조회시작년월)을 입력해주세요.";
        alertPopup();
        } else if (!pattern.test(TB07220S_fromMm)) {
        msgError = "필수 입력값(조회시작년월)을 확인해주세요.";
        alertPopup();
        } else if (isEmpty(TB07220S_toMm)) {
        msgError = "필수 입력값(조회종료년월)을 입력해주세요.";
        alertPopup();
        } else if (!pattern.test(TB07220S_toMm)) {
        msgError = "필수 입력값(조회종료년월)을 확인해주세요.";
        alertPopup();
        } else if (TB07220S_fromMm > TB07220S_toMm) {
        msgError = "조회시작년월가 조회종료년월보다 큽니다.";
        alertPopup();
        } else {
        businessFunction();
        }

        function alertPopup() {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: msgError,
            confirmButtonText: "확인",
        });
        }
        
        function businessFunction() {
            /**
             * @param { String } fromMm      조회시작년월
             * @param { String } toMm        조회종료년월
             * @param { String } ardyBzepNo  기업체코드(SPC)
             * @param { String } dprtCd      부서코드
             * @param { String } decdSttsDcd 결재상태코드(신청상태)
             */
            let paramData = {
                fromMm:         $('#TB07220S_fromMm').val() ? $('#TB07220S_fromMm').val().replaceAll("-", "") : "",
                toMm:           $('#TB07220S_toMm').val() ? $('#TB07220S_toMm').val().replaceAll("-", "") : "",
                ardyBzepNo:     $('#TB07220S_ardyBzepNo').val(),
                dprtCd:         $('#TB07220S_dprtCd').val(),
                decdSttsDcd:    $('#TB07220S_decdSttsDcd').val(),
            }
            
            $.ajax({
                method: "POST",
                url: "/TB07220S/selectBalanceInfoList",
                data: paramData,
                dataType: "json",
                success: function (data) {
                    console.log("data >> :: " + data.spcNm)

                    if (data.length > 0) {
                        $('#TB07220S_spcBlceGrid').pqGrid('instance').setData(data);
                    }
                    else {
                        $('#TB07220S_spcBlceGrid').pqGrid('instance').setData([]);
                        Swal.fire({
                            icon: 'warning'
                            , title: '조회된 정보가 없습니다!'
                        })
                    }
                },
                error: function (response) {
                    // 에러남 ㅋㅋ
                    Swal.fire({
                        icon: 'error'
                        , title: '조회된 정보가 없습니다!'
                    })
                },
            });
        };
    }

    function pqGridColModel() {
        const spcBlceGrid = [
            {
                title: "",
                align: "center",
                colModel: [
                    {
                        title: "기준월",
                        dataType: "string",
                        dataIndx: "trMm",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: {
                            type: "sum",
                            value: "합계",
                        },
                        render: function (ui) {
                            return ui.cellData.substring(0, 4) + "-" + ui.cellData.substring(4, 6);
                        },
                    },
                    {
                        title: "관리부점",
                        dataType: "string",
                        dataIndx: "dprtNm",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "SPC명",
                        dataType: "string",
                        dataIndx: "spcNm",
                        halign: "center",
                        align: "left",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "전월말 잔고",
                        dataType: "string",
                        dataIndx: "bfmmRndrBlce",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                ],
            },
            /**
             * 입금항목
             */
            {
                title: "입금항목",
                align: "center",
                colModel: [
                    {
                        title: "입금 합계",
                        dataType: "string",
                        dataIndx: "depAmtTot",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "유동화증권 인수대금",
                        dataType: "string",
                        dataIndx: "depAmt02",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기초자산 원리금",
                        dataType: "string",
                        dataIndx: "depAmt01",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "취급수수료",
                        dataType: "string",
                        dataIndx: "depAmt06",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "원천세 환급",
                        dataType: "string",
                        dataIndx: "depAmt03",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "후순위대여 입금",
                        dataType: "string",
                        dataIndx: "depAmt04",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대출채권 매각대금",
                        dataType: "string",
                        dataIndx: "depAmt05",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자금운용 목적 계좌 회수",
                        dataType: "string",
                        dataIndx: "depAmt07",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기타",
                        dataType: "string",
                        dataIndx: "depAmt99",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                ],
            },
            /**
             * 출금항목
             */
            {
                title: "출금항목",
                align: "center",
                colModel: [
                    {
                        title: "출금 합계",
                        dataType: "string",
                        dataIndx: "amt",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "유동화증권 상환",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대출 실행/추가 인출",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "ABB/ABL 원리금",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "원진세 납부",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "후순위대여 상환",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자금운용 목적 계좌",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                ],
            },
            /**
             * 유동화관련비용
             */
            {
                title: "유동화관련비용",
                align: "center",
                colModel: [
                    {
                        title: "법무법인수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "업무위탁수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "회계감사수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "신용평가수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대리금융수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "설립청산수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "발행등록수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                ],
            },
            /**
             * 당사수취수익
             */
            {
                title: "당사수취수익",
                align: "center",
                colModel: [
                    {
                        title: "보증수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자산관리수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "인수수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "주관/주선수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "취급수수료",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기타",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "당월말잔고",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    /*
                    {
                        title: "촥정일",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "확정담당자",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    */
                ],
            },
        ]

        return spcBlceGrid;
    }

    function setGridOptions() {

        // 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 600
                , maxHeight: 600
                , id: 'TB07220S_spcBlceGrid'
                , colModel: pqGridColModel()
                , editable: false
                , scrollModel: { autoFit: false }
            },
        ];

        setPqGrid(pqGridObjs);
    }

    return {
        // 조회
		selectBalanceInfoList : selectBalanceInfoList
        // 초기화
		, rmReset : rmReset

    };
})();