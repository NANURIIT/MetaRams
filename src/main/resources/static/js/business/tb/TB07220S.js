const TB07220Sjs = (function () {
    $(document).ready(function () {
        // 조회조건 Default Set
        setMonthInput();

		//기간검색 유효성 검사 함수
    	chkValFromToDt("TB07220S_fromMm", "TB07220S_toMm", false);

        sltctBoxSet();
        
        setGridOptions();

		TB07220S_onChangeHandler();
    });

	function TB07220S_onChangeHandler() {
		$("#TB07220S_fromMm").on("input", function () { resetPGgrids("TB07220S") })
        $("#TB07220S_toMm").on("input", function () { resetPGgrids("TB07220S") })
        $("#TB07220S_ardyBzepNo").on("input", function () { resetPGgrids("TB07220S") })
        $("#TB07210S_ardyBzepNm").on("input", function () { resetPGgrids("TB07220S") })
        $("#TB07220S_dprtNm").on("input", function () { resetPGgrids("TB07220S") })
    }

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
        // 신청상태 초기화[삭제]
        //$("#TB07220S_decdSttsDcd").val("999"); //진행상태
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
                /*decdSttsDcd:    $('#TB07220S_decdSttsDcd').val(),*/
            }
            
            $.ajax({
                method: "POST",
                url: "/TB07220S/selectBalanceInfoList",
                data: paramData,
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
						let totals = data.reduce((acc, cur) => {
			                return {
			                    totBfmmRndrBlce: acc.totBfmmRndrBlce + (parseFloat(cur.bfmmRndrBlce) || 0),
								totThmmRndrBlce: acc.totThmmRndrBlce + (parseFloat(cur.thmmRndrBlce) || 0),
								totDepAmtTot: acc.totDepAmtTot + (parseFloat(cur.depAmtTot) || 0),
								totDepAmt01: acc.totDepAmt01 + (parseFloat(cur.depAmt01) || 0),
								totDepAmt02: acc.totDepAmt02 + (parseFloat(cur.depAmt02) || 0),
								totDepAmt03: acc.totDepAmt03 + (parseFloat(cur.depAmt03) || 0),
								totDepAmt04: acc.totDepAmt04 + (parseFloat(cur.depAmt04) || 0),
								totDepAmt05: acc.totDepAmt05 + (parseFloat(cur.depAmt05) || 0),
								totDepAmt06: acc.totDepAmt06 + (parseFloat(cur.depAmt06) || 0),
								totDepAmt07: acc.totDepAmt07 + (parseFloat(cur.depAmt07) || 0),
								totDepAmt99: acc.totDepAmt99 + (parseFloat(cur.depAmt99) || 0),
								totWdrAmtTot: acc.totWdrAmtTot + (parseFloat(cur.wdrAmtTot) || 0),
								totWdrAmt01: acc.totWdrAmt01 + (parseFloat(cur.wdrAmt01) || 0),
								totWdrAmt02: acc.totWdrAmt02 + (parseFloat(cur.wdrAmt02) || 0),
								totWdrAmt03: acc.totWdrAmt03 + (parseFloat(cur.wdrAmt03) || 0),
								totWdrAmt04: acc.totWdrAmt04 + (parseFloat(cur.wdrAmt04) || 0),
								totWdrAmt05: acc.totWdrAmt05 + (parseFloat(cur.wdrAmt05) || 0),
								totWdrAmt06: acc.totWdrAmt06 + (parseFloat(cur.wdrAmt06) || 0),
								totWdrAmt07: acc.totWdrAmt07 + (parseFloat(cur.wdrAmt07) || 0),
								totWdrAmt08: acc.totWdrAmt08 + (parseFloat(cur.wdrAmt08) || 0),
								totWdrAmt09: acc.totWdrAmt09 + (parseFloat(cur.wdrAmt09) || 0),
								totWdrAmt10: acc.totWdrAmt10 + (parseFloat(cur.wdrAmt10) || 0),
								totWdrAmt11: acc.totWdrAmt11 + (parseFloat(cur.wdrAmt11) || 0),
								totWdrAmt12: acc.totWdrAmt12 + (parseFloat(cur.wdrAmt12) || 0),
								totWdrAmt13: acc.totWdrAmt13 + (parseFloat(cur.wdrAmt13) || 0),
								totWdrAmt14: acc.totWdrAmt14 + (parseFloat(cur.wdrAmt14) || 0),
								totWdrAmt15: acc.totWdrAmt15 + (parseFloat(cur.wdrAmt15) || 0),
								totWdrAmt16: acc.totWdrAmt16 + (parseFloat(cur.wdrAmt16) || 0),
								totWdrAmt17: acc.totWdrAmt17 + (parseFloat(cur.wdrAmt17) || 0),
								totWdrAmt99: acc.totWdrAmt99 + (parseFloat(cur.wdrAmt99) || 0)
			                };
			            }, 
						{
							totBfmmRndrBlce: 0, 
							totThmmRndrBlce: 0,
							totDepAmtTot: 0,
							totDepAmt01: 0,
							totDepAmt02: 0,
							totDepAmt03: 0,
							totDepAmt04: 0,
							totDepAmt05: 0,
							totDepAmt06: 0,
							totDepAmt07: 0,
							totDepAmt99: 0,
							totWdrAmtTot: 0,
							totWdrAmt01: 0,
							totWdrAmt02: 0,
							totWdrAmt03: 0,
							totWdrAmt04: 0,
							totWdrAmt05: 0,
							totWdrAmt06: 0,
							totWdrAmt07: 0,
							totWdrAmt08: 0,
							totWdrAmt09: 0,
							totWdrAmt10: 0,
							totWdrAmt11: 0,
							totWdrAmt12: 0,
							totWdrAmt13: 0,
							totWdrAmt14: 0,
							totWdrAmt15: 0,
							totWdrAmt16: 0,
							totWdrAmt17: 0,
							totWdrAmt99: 0,
						});  
						data.push({
			                trMm: "합계",
			                dprtNm: "",
			                spcNm: "",
			                bfmmRndrBlce: totals.totBfmmRndrBlce,
			                depAmtTot: totals.totDepAmtTot,
							depAmt02: totals.totDepAmt02,
							depAmt01: totals.totDepAmt01,
							depAmt06: totals.totDepAmt06,
							depAmt03: totals.totDepAmt03,
							depAmt04: totals.totDepAmt04,
							depAmt05: totals.totDepAmt05,
							depAmt07: totals.totDepAmt07,
							depAmt99: totals.totDepAmt99,
							wdrAmtTot: totals.totWdrAmtTot,
							wdrAmt01: totals.totWdrAmt01,
							wdrAmt08: totals.totWdrAmt08,
							wdrAmt05: totals.totWdrAmt05,
							wdrAmt06: totals.totWdrAmt06,
							wdrAmt07: totals.totWdrAmt07,
							wdrAmt17: totals.totWdrAmt17,
							wdrAmt10: totals.totWdrAmt10,
							wdrAmt11: totals.totWdrAmt11,
							wdrAmt12: totals.totWdrAmt12,
							wdrAmt13: totals.totWdrAmt13,
							wdrAmt14: totals.totWdrAmt14,
							wdrAmt15: totals.totWdrAmt15,
							wdrAmt02: totals.totWdrAmt02,
							wdrAmt03: totals.totWdrAmt03,
							wdrAmt04: totals.totWdrAmt04,
							wdrAmt09: totals.totWdrAmt09,
							wdrAmt16: totals.totWdrAmt16, 
							wdrAmt99: totals.totWdrAmt99,
							thmmRndrBlce: totals.totThmmRndrBlce,
			            });
                        $('#TB07220S_spcBlceGrid').pqGrid('instance').setData(data);
                    }
                    else {
						var obj = {
							// all your other grid settings
							strNoRows: '데이터가 없습니다.'
						}
						$('#TB07220S_spcBlceGrid').pqGrid('instance').setData([]);
						$("#TB07220S_spcBlceGrid").pqGrid(obj);
						$("#TB07220S_spcBlceGrid").pqGrid("refreshDataAndView");
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
                        summary: { type: "sum", value: "합계" },
                        render: function (ui) {
                            let cellData = ui.cellData; 
							if(cellData.length > 2){
								return ui.cellData.substring(0, 4) + "-" + ui.cellData.substring(4, 6);
							}else {
								return cellData;
							}  
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
                    },
                    {
                        title: "SPC명",
                        dataType: "string",
                        dataIndx: "spcNm",
                        halign: "center",
                        align: "left",
                        width: "10%",
                        filter: { crules: [{ condition: "range" }] },
                    },
                    {
                        title: "전월말 잔고",
                        dataType: "float",
                        dataIndx: "bfmmRndrBlce",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
						summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
						render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
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
                        dataType: "float",
                        dataIndx: "depAmtTot",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "유동화증권 인수대금",
                        dataType: "float",
                        dataIndx: "depAmt02",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기초자산 원리금",
                        dataType: "float",
                        dataIndx: "depAmt01",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "취급수수료",
                        dataType: "float",
                        dataIndx: "depAmt06",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "원천세 환급",
                        dataType: "float",
                        dataIndx: "depAmt03",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "후순위대여 입금",
                        dataType: "float",
                        dataIndx: "depAmt04",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대출채권 매각대금",
                        dataType: "float",
                        dataIndx: "depAmt05",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자금운용 목적 계좌 회수",
                        dataType: "float",
                        dataIndx: "depAmt07",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기타",
                        dataType: "float",
                        dataIndx: "depAmt99",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
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
                        dataType: "float",
                        dataIndx: "wdrAmtTot",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "유동화증권 상환",
                        dataType: "float",
                        dataIndx: "wdrAmt01",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대출 실행/추가 인출",
                        dataType: "float",
                        dataIndx: "wdrAmt08",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "ABB/ABL 원리금",
                        dataType: "float",
                        dataIndx: "wdrAmt05",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "원진세 납부",
                        dataType: "float",
                        dataIndx: "wdrAmt06",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "후순위대여 상환",
                        dataType: "float",
                        dataIndx: "wdrAmt07",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자금운용 목적 계좌",
                        dataType: "float",
                        dataIndx: "wdrAmt17",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
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
                        dataType: "float",
                        dataIndx: "wdrAmt10",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "업무위탁수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt11",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "회계감사수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt12",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "신용평가수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt13",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "대리금융수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt14",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "설립청산수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt15",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    /*{
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
                    },*/
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
                        dataType: "float",
                        dataIndx: "wdrAmt02",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "자산관리수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt03",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "인수수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt04",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "주관/주선수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt09",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "취급수수료",
                        dataType: "float",
                        dataIndx: "wdrAmt16",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "기타",
                        dataType: "float",
                        dataIndx: "wdrAmt99",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
                        render: function (ui) {
                            return ui.cellData ? ui.cellData : 0;
                        },
                    },
                    {
                        title: "당월말잔고",
                        dataType: "float",
                        dataIndx: "thmmRndrBlce",
                        halign: "center",
                        align: "right",
                        width: "10%",
                        format: "#,###",
                        filter: { crules: [{ condition: "range" }] },
                        summary: { type: "sum", summaryCls: 'pq-summary' },  // 합계 표시
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
                , summaryRow: true,
				loadComplete: function () {
	                this.refreshSummary();
	            },
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