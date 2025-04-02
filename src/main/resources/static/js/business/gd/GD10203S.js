const GD10203Sjs = (function () {
    $(document).ready(function () {
        // 조회조건 Default Set
        setMonthInput();
        sltctBoxSet();
        
        setGridOptions();

        //기간검색 유효성 검사 함수
        chkValFromToDt("GD10203S_fromMm","GD10203S_toMm",false);
    });

    function setMonthInput() {
        // 1개월전 ~ 현재월 디폴트 세팅
        $("#GD10203S_fromMm").val(addMonth(getToday(), -1).slice(0, 7));
        $("#GD10203S_toMm").val(getToday().slice(0, 7));
      }

    //selectBox 세팅
    function sltctBoxSet(){
        let selectBox = getSelectBoxList(
            "GD10203S",
            "D010",   //부서코드
            false
        );

        let GD10203S_dprtSelect;

        GD10203S_dprtSelect = selectBox.filter(function(item) {
            return item.cmnsGrpCd === "D010";
        })

        let D010html;

        GD10203S_dprtSelect.forEach((item) => {
            D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });

        $("#GD10203S_dprtNm").append(D010html);

        $('#GD10203S_dprtNm').on('change', function() {
            $('#GD10203S_dprtCd').val($('#GD10203S_dprtNm').val())
        });

        setFormElementsStateByUserRole();
    }

    	// 화면 초기화
	const rmReset = (() => {
		let fmIputLngth = document.querySelectorAll("input").length;
		console.log("fmIputLngth : ", fmIputLngth)
		for (let i = 0; i < fmIputLngth; i++) {
			document.querySelectorAll("input")[i].value = "";
		}
        setMonthInput();
		 GD10203S_clearAllGrid();
		// TB03030S_setFileButtonEnabled(false);
	});

	function GD10203S_clearAllGrid(){
		$("#GD10203S_spcBlceGrid").pqGrid("option", "dataModel.data", []);
		$("#GD10203S_spcBlceGrid").pqGrid("refreshDataAndView");		
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
        $('#GD10203S_dprtCd').val(dprtCd);
        $('#GD10203S_dprtNm').val(dprtCd);
    }
    
    function retrieveBalanceInfoList() {
        let testJson = {
            amt: "100000"
        }

        $("#GD10203S_spcBlceGrid").pqGrid('instance').setData(JSON.stringify(testJson))
    }

    function inq() {

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
                        dataIndx: "",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: {
                            type: "sum",
                            value: "합계",
                        },
                        render: function (ui) {
                            return ui.cellData.substr(0, 4) + ui.cellData.substr(5, 6);
                        },
                    },
                    {
                        title: "관리부점",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "center",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "SPC명",
                        dataType: "string",
                        dataIndx: "",
                        halign: "center",
                        align: "left",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "전월말 잔고",
                        dataType: "string",
                        dataIndx: "",
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
                        dataIndx: "",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum" },
                    },
                    {
                        title: "유동화증권 인수대금",
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
                        title: "기초자산 원리금",
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
                        title: "취급수수료",
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
                        title: "원전세 환급",
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
                        title: "후순위대여 입금",
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
                        title: "대출채권 매각대금",
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
                        title: "자금운용 목적 계좌 회수",
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
                        title: "기타",
                        dataType: "string",
                        dataIndx: "",
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
                , id: 'GD10203S_spcBlceGrid'
                , colModel: pqGridColModel()
                , editable: false
                , scrollModel: { autoFit: false }
            },
        ];

        setPqGrid(pqGridObjs);
    }

    return {
        // 조회
		retrieveBalanceInfoList : retrieveBalanceInfoList
        // 초기화
		, rmReset : rmReset

    };
})();