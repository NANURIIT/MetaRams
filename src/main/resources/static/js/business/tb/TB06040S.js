const TB06040Sjs = (function() {

    const userEno = $('#userEno').val(),
        userEmpNm = $('#userEmpNm').val(),
        initObj = {};
    let fValid;     // 0: 조회 1: 저장
    let fSts;     // 1. 약정 2. 해지

    $(document).ready(function() {
        authInf();
        getSelectBoxList('TB06040S', 'R023/S003/I005/E020/E011/E005/I011/A005');
        resetDd();
		defaultNumberFormat_TB06040S();
        getDealInfoFromWF();
		inputNumberChangeFunction_TB06040S();
      /*  $('input').on('focus', function() {
            $(this).select();
        });*/
		
		inputValidationCheck();
    });
	
	// 입력창 값체크
	function inputValidationCheck(){
		dtValidationCheck('TB06040S_ctrcDt');		// 약정정보 - 약정일자 값체크
		dtValidationCheck('TB06040S_ctrcExpDt');	// 약정정보 - 약정만기일자 값체크
		dtValidationCheck('TB06040S_cancelDt');		// 약정정보 - 해지일자 값체크
	}
	
	function dtValidationCheck(id){
		
		$('#' + id).change(function() {
			$('#' + id).val(formatDate(unformatDate($('#' + id).val())));
			
			var ctrcDt		= $('#TB06040S_ctrcDt').val().replaceAll('-', '');		// 약정일자
			var ctrcExpDt	= $('#TB06040S_ctrcExpDt').val().replaceAll('-', '');	// 약정만기일자
			var cancelDt	= $('#TB06040S_cancelDt').val().replaceAll('-', '');	// 해지일자

			if (isNotEmpty(ctrcDt)) {
				if (isNotEmpty(ctrcExpDt)) {
					if (Number(ctrcDt) > Number(ctrcExpDt)) {
						Swal.fire({
							title: '',
							icon: 'error',
							text: '약정만기일자가 약정일자 이전입니다.',
							confirmButtonText: '확인',
						}).then(() => {
							idClear('TB06040S_ctrcExpDt');
							idFocus('TB06040S_ctrcExpDt');
						});
						return;
					}
				}

				if (isNotEmpty(cancelDt)) {
					if (Number(ctrcDt) > Number(cancelDt)) {
						Swal.fire({
							title: '',
							icon: 'error',
							text: '해지일자가 약정일자 이전입니다.',
							confirmButtonText: '확인',
						}).then(() => {
							idClear('TB06040S_cancelDt');
							idFocus('TB06040S_cancelDt');
						});
						return;
					}
				}
			}
		});
	}
	
	function defaultNumberFormat_TB06040S(){		
		$("input[id*='Amt'], input[id*='Mnum']").val("0");
		selectorNumberFormater(
		      $("input[id*='Amt'], input[id*='Mnum']")
		  );
	}
	
	/**
	 * 절사, 금액 반올림
	 */

	function inputNumberChangeFunction_TB06040S(){
		//약정금액
		$("#TB06040S_eprzCrdlCtrcAmt").on('change', function(){
			let formatNum="0";
			formatNum=(Math.round(uncomma($("#TB06040S_eprzCrdlCtrcAmt").val())*1/1)).toFixed(0);
			$("#TB06040S_eprzCrdlCtrcAmt").val(addComma(uncomma(formatNum)));
		});	
	}	
	

    function validateParameter() {
        var prdtCd = $('#TB06040S_prdtCd').val();

        if(isEmpty(prdtCd)){
            return false;
        }

        return true;
    }

    function srch() {
        // 유효성검증
        if ( validateParameter() ) {
            businessFunction();
        }else{
            Swal.fire({
                icon              : 'error'
                , title             : "Error!"
                , text              : "종목코드를 조회해주세요."
                , confirmButtonText : "확인"
            });
        };

        function businessFunction() {

            var prdtCd = $('#TB06040S_prdtCd').val();

            /* 선택된 안건정보 초기화 */
            $('#TB06040S_selectedDealNo').val('');
            $('#TB06040S_selectedNmcpMtrDcd').val('');
            $('#TB06040S_selectedLstCCaseDcd').val('');

            var paramData = {
                "prdtCd" : prdtCd
            };

            // 비동기통신요청
            $.ajax({
                type: "GET",
                url: '/TB06040S/searchIBInfo',
                data: paramData,
                dataType: "json",
                success: function(data) {
                    console.log(data);

                    fSts = data.ctrcCclcDcd;  // 조회해온 약정해지상태

                    // btnCtr(data.ctrcCclcDcd); // btn 약정, 해지
                    /* 기업여신 정보 */
                    $('#TB06040S_I011').val(data.prgSttsCd); // 심사진행상태코드
                    $('#TB06040S_trOthrDscmNo').val(isEmpty(data.trOthrDscmNo)?'':data.trOthrDscmNo); //checkBrnAcno(data.trOthrDscmNo));
                    $('#TB06040S_trOthrDscmNm').val(data.trOthrDscmNm);
                    $('#TB06040S_R023').val(data.rqsKndCd);
                    $('#TB06040S_prdtClsfCd').val(data.prdtClsfCd);
                    $('#TB06040S_prdtClsfCdNm').val(data.prdtClsfCdNm);
                    $('#TB06040S_A005').val(data.actsCd);
                    $('#TB06040S_apvlDt').val(isEmpty(data.apvlDt)?'':formatDate(data.apvlDt));
                    $('#TB06040S_trCrryCd').val(data.trCrryCd);
                    $('#TB06040S_trCrryCdNm').val(data.trCrryCdNm);
                    $('#TB06040S_thcoPtciAmt').val(isEmpty(data.eprzCrdlApvlAmt)?'':addComma(data.eprzCrdlApvlAmt));
                    $('#TB06040S_S003').val(data.stdrIntrtKndCd);
                    $('#TB06040S_intrtCngeFrqcMnum').val(data.intrtCngeFrqcMnum);
                    $('#TB06040S_I005').val(data.eprzCrdlIndvLmtDcd);
                    $('#TB06040S_E020').val(data.paiRdmpDcd);
                    $('#TB06040S_prnaRdmpFrqcMnum').val(data.prnaRdmpFrqcMnum);
                    $('#TB06040S_E011').val(data.intrBnaoDcd);
                    $('#TB06040S_intrRdmpFrqcMnum').val(data.intrRdmpFrqcMnum);
                    $('#TB06040S_selectedDealNo').val(data.dealNo);
                    $('#TB06040S_selectedNmcpMtrDcd').val(data.mtrDcd);
                    $('#TB06040S_selectedLstCCaseDcd').val(data.jdgmDcd);

                    /* 240617 약정정보 */
                    $('#TB06040S_ctrcDt').val(formatDate(data.ctrcDt));
                    $('#TB06040S_ctrcExpDt').val(formatDate(data.ctrcExpDt));
                    $('#TB06040S_eprzCrdlCtrcAmt').val(isEmpty(data.eprzCrdlCtrcAmt) ? '0' : addComma(data.eprzCrdlCtrcAmt.toFixed(0)));
                    $('#TB06040S_stdrClrt').val(isEmpty(data.stdrIntrt) ? '0' : data.stdrIntrt);
                    $('#TB06040S_addClrt').val(isEmpty(data.addIntrt) ? '0' : data.addIntrt);
                    $('#TB06040S_totClrt').val(isEmpty(data.totIntrt) ? '0' : data.totIntrt);

                    $('#TB06040S_empNo').val(userEno);
                    $('#TB06040S_empNm').val(userEmpNm);
                    // console.log(data);
                    // if ( isEmpty(data.chrrEmpno) && isEmpty(data.chrrEmpNm) ) {
                    //     $('#TB06040S_empNo').val(userEno);
                    //     $('#TB06040S_empNm').val(userEmpNm);
                    // } else {
                    //     $('#TB06040S_empNo').val(data.chrrEmpno);
                    //     $('#TB06040S_empNm').val(data.chrrEmpNm);
                    // }

                    /* 해지 */
                    $('#TB06040S_E005').val(data.eprzCrdlCclcRsnCd);
                    $('#TB06040S_cancelDt').val(formatDate(data.cclcDt));
                    $('#TB06040S_cancelRsnCntn').val(data.cclcRsnCtns);
					
					if(data.ctrcCclcDcd == null){
						$('#TB06040S_ctrcDt').prop('disabled', false);			// 약정일자
						$('#TB06040S_ctrcExpDt').prop('disabled', false);		// 약정만기일자
						$('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', false);	// 약정금액
						
						$('#TB06040S_empNo').prop('disabled', false);			// 담당자
						$('#TB06040S_empNo').prop('disabled', false);			// 담당자버튼
						
						$('#TB06040S_E005').prop('disabled', true);				// 해지사유코드
						$('#TB06040S_cancelDt').prop('disabled', true);			// 해지일자
						$('#TB06040S_cancelRsnCntn').prop('disabled', true);	// 해지사유내용
						
						$('#btnCtrc').prop('disabled', false);					// 약정버튼
						$('#btnCclc').prop('disabled', true);					// 해지버튼
					}else if(data.ctrcCclcDcd == '1'){
						$('#TB06040S_ctrcDt').prop('disabled', false);			// 약정일자
						$('#TB06040S_ctrcExpDt').prop('disabled', false);		// 약정만기일자
						$('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', false);	// 약정금액

						$('#TB06040S_empNo').prop('disabled', false);			// 담당자
						$('#TB06040S_empNo').prop('disabled', false);			// 담당자버튼

						$('#TB06040S_E005').prop('disabled', false);			// 해지사유코드
						$('#TB06040S_cancelDt').prop('disabled', false);		// 해지일자
						$('#TB06040S_cancelRsnCntn').prop('disabled', false);	// 해지사유내용

						$('#btnCtrc').prop('disabled', false);					// 약정버튼
						$('#btnCclc').prop('disabled', false);					// 해지버튼
					}else if(data.ctrcCclcDcd == '2'){
						$('#TB06040S_ctrcDt').prop('disabled', true);			// 약정일자
						$('#TB06040S_ctrcExpDt').prop('disabled', true);		// 약정만기일자
						$('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', true);	// 약정금액

						$('#TB06040S_empNo').prop('disabled', true);			// 담당자
						$('#TB06040S_empNo').prop('disabled', true);			// 담당자버튼

						$('#TB06040S_E005').prop('disabled', false);			// 해지사유코드
						$('#TB06040S_cancelDt').prop('disabled', false);		// 해지일자
						$('#TB06040S_cancelRsnCntn').prop('disabled', false);	// 해지사유내용

						$('#btnCtrc').prop('disabled', true);					// 약정버튼
						$('#btnCclc').prop('disabled', true);					// 해지버튼
					}
					
					


                    // if ( data.ctrcCclcDcd === '2' ) {
                    //     $('.btn-success').prop('disabled', true);
                    // };

                    /* 약정정보 */
                    // if(isEmpty(data.ctrcCclcDcd)){
                    //     compChange('1');
                    //     $('.btn-success').prop('disabled', false);
                    // }else
                    // if(data.ctrcCclcDcd === '1'){
                    //     compChange('1');
                    //     $('.btn-success').prop('disabled', true);
                    //     $('#TB06040S_ctrcDt').val(formatDate(data.ctrcDt));
                    //     $('#TB06040S_ctrcExpDt').val(formatDate(data.ctrcExpDt));
                    //     $('#TB06040S_eprzCrdlCtrcAmt').val(addComma(data.eprzCrdlCtrcAmt));
                    //     $('#TB06040S_stdrClrt').val(data.stdrIntrt);
                    //     $('#TB06040S_addClrt').val(data.addIntrt);
                    //     $('#TB06040S_totClrt').val(data.totIntrt);
                    //     $('#TB06040S_empNo').val(data.chrrEmpno);
                    //     $('#TB06040S_empNm').val(data.chrrEmpNm);
                    // }else
                    // if(data.ctrcCclcDcd === '2'){
                    //     compChange('2');
                    //     $('.btn-success').prop('disabled', true);
                    //     $('#TB06040S_E005').val(data.cclcRsnCd);
                    //     $('#TB06040S_cancelDt').val(formatDate(data.cclcDt));
                    //     $('#TB06040S_cancelRsnCntn').val(data.cclcRsnCtns);
                    // }else{
                    //     compChange('1');
                    //     $('.btn-success').prop('disabled', false);
                    // }
                    console.log(data);
                },
                error: function () {
                    Swal.fire({
                        icon              : 'error'
                        , title             : "Error!"
                        , text              : "종목정보 조회에 실패하였습니다."
                        , confirmButtonText : "확인"
                    });
                }
            });
        }
    }

    // 실행
    function save(f = '') {
        fValid = 1;

        if ( validation() ) {
            // validation == true
            var paramData = {};

            /* 1 : 약정, 2 : 해지 */
            // var ctrcCclcDcd = $('.btn-info').text().substring(0, 2) === '약정' ? '1' : '2';
            let dealNo = $('#TB06040S_selectedDealNo').val();
            let mtrDcd = $('#TB06040S_selectedNmcpMtrDcd').val();
            let jdgmDcd = $('#TB06040S_selectedLstCCaseDcd').val();
            let stdrIntrtKndCd  = $('#TB06040S_S003').val();
            // ???????????????????????????????????????????????????????

            /* 약정정보 */
            let prdtCd = $('#TB06040S_prdtCd').val();                               // 종목코드
            let ctrcDt    = unformatDate($('#TB06040S_ctrcDt').val());              // 약정일자
            let ctrcExpDt = unformatDate($('#TB06040S_ctrcExpDt').val());           // 약정만기일자
            let eprzCrdlCtrcAmt   = uncomma($('#TB06040S_eprzCrdlCtrcAmt').val());  // 약정금액
            let stdrIntrt = $('#TB06040S_stdrClrt').val();                          // 기준
            let addIntrt  = $('#TB06040S_addClrt').val();                           // 가산
            let totIntrt  = $('#TB06040S_totClrt').val();                           // 총금리
            let chrrEmpno = $('#TB06040S_empNo').val();                             // 사번
            let eprzCrdlCclcRsnCd = $('#TB06040S_E005').val();                      // 해지사유코드
            let cclcDt = unformatDate($('#TB06040S_cancelDt').val());               // 해지일자
            let cclcRsnCtns = $('#TB06040S_cancelRsnCntn').val();                   // 해지사유내용

            if ( f === '1' ) {
                /* 약정 */
                console.log("약정");

                if(prdtCd.startsWith('A') &&(stdrIntrt === null || stdrIntrt === '0')){
                    Swal.fire({
                        icon              : 'warning'
                    , text              : "대출계약 금리정보가 등록되어있지 않습니다."
                    , confirmButtonText : "확인"
                    });
                    return false;
                }

                let ctrcCclcDcd = '1';

                paramData = {
                    dealNo,
                    mtrDcd,
                    jdgmDcd,
                    stdrIntrtKndCd,
                    ctrcCclcDcd,
                    prdtCd,
                    ctrcDt,
                    ctrcExpDt,
                    eprzCrdlCtrcAmt,
                    stdrIntrt,
                    addIntrt,
                    totIntrt,
                    chrrEmpno,
                };

                // validation(paramData);
            } else {
                /* 해지 */
                console.log("해지");
                let ctrcCclcDcd = '2';

                paramData = {
                    dealNo,
                    mtrDcd,
                    jdgmDcd,
                    stdrIntrtKndCd,
                    ctrcCclcDcd,
                    prdtCd,
                    ctrcDt,
                    ctrcExpDt,
                    eprzCrdlCtrcAmt,
                    stdrIntrt,
                    addIntrt,
                    totIntrt,
                    chrrEmpno,
                    eprzCrdlCclcRsnCd,
                    cclcDt,
                    cclcRsnCtns,
                };
            }

            if ( validation(paramData) ) {
                $.ajax({
                    type: "POST",
                    url: "/TB06040S/saveCtrcCclcInfo",
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify(paramData),
                    dataType: "json",
                    success: function (data) {
                        Swal.fire({
                            icon: 'success'
                            , text: "약정 및 해지 정보가 저장되었습니다."
                            , confirmButtonText: "확인"
                        }).then(result => {
                            if(result.isConfirmed) {
                                srch();
                            }
                        })
                    },
                    error: function() {
                        Swal.fire({
                            icon: 'error'
                            , text: "저장에 실패하였습니다."
                            , confirmButtonText: "확인"
                        })
                    }
                });
            }
        } else {
            return;
        }
    };

    // function compChange(e) {
    //     // 약정
    //     if(e === '1'){
    //         $('#TB06040S_E005').prop('disabled', true);
    //         $('#TB06040S_cancelDt').prop('disabled', true);
    //         $('#TB06040S_cancelRsnCntn').prop('disabled', true);
    //         $('#TB06040S_ctrcDt').prop('disabled', false);
    //         $('#TB06040S_ctrcExpDt').prop('disabled', false);
    //         $('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', false);
    //         $('#TB06040S_stdrClrt').prop('disabled', false);
    //         $('#TB06040S_addClrt').prop('disabled', false);
    //         //$('#TB06040S_totClrt').prop('disabled', false);
    //         $('#TB06040S_empNo').prop('disabled', false);
    //         $('#TB06040S_empBtn').prop('disabled', false);
    //     }else
    //     // 해지
    //     if(e === '2'){
    //         $('#TB06040S_E005').prop('disabled', false);
    //         $('#TB06040S_cancelDt').prop('disabled', false);
    //         $('#TB06040S_cancelRsnCntn').prop('disabled', false);
    //         $('#TB06040S_ctrcDt').prop('disabled', true);
    //         $('#TB06040S_ctrcExpDt').prop('disabled', true);
    //         $('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', true);
    //         $('#TB06040S_stdrClrt').prop('disabled', true);
    //         $('#TB06040S_addClrt').prop('disabled', true);
    //         //$('#TB06040S_totClrt').prop('disabled', true);
    //         $('#TB06040S_empNo').prop('disabled', true);
    //         $('#TB06040S_empBtn').prop('disabled', true);
    // 		// $('.btn-success').prop('disabled', false);
    //     }else{
    //         return false;
    //     }
    //     // $('#TB06040S_E005').val('');
    //     // $('#TB06040S_cancelDt').val('');
    //     // $('#TB06040S_cancelRsnCntn').val('');
    //     // $('#TB06040S_ctrcDt').val('');
    //     // $('#TB06040S_ctrcExpDt').val('');
    //     // $('#TB06040S_eprzCrdlCtrcAmt').val('');
    //     // $('#TB06040S_stdrClrt').val('');
    //     // $('#TB06040S_addClrt').val('');
    //     // $('#TB06040S_totClrt').val('');
    //     // $('#TB06040S_empNo').val('');
    //     // $('#TB06040S_empNm').val('');
    // }

    /*********************
    * 240614 초기화 추가 *
    *********************/
    function resetAll() {
        $('#TB06040S_prdtCd').val('');              // 종목코드
        $('#TB06040S_prdtNm').val('');              // 종목코드명

        $('#TB06040S_trOthrDscmNo').val('');        // 거래상대방번호
        $('#TB06040S_trOthrDscmNm').val('');        // 거래상대방명
        $('#TB06040S_prdtClsfCd').val('');          // 상품소분류코드
        $('#TB06040S_prdtClsfCdNm').val('');        // 상품소분류코드명
        $('#TB06040S_trCrryCd').val('');            // 통화코드
        $('#TB06040S_trCrryCdNm').val('');          // 통화코드명

        $('#TB06040S_I005').val('');                // 한도구분코드
        $('#TB06040S_R023').val('');                // 신청종류코드
        $('#TB06040S_A005').val('');              // 계정과목코드
        // $('#TB06040S_actsCd2').val('');             // 계정과목코드2
        $('#TB06040S_thcoPtciAmt').val('0');        // 당사참여금액

        $('#TB06040S_E020').val('');                // 상환방법/개월
        $('#TB06040S_prnaRdmpFrqcMnum').val('');    // 상환방법/개월
        $('#TB06040S_apvlDt').val('');              // 승인일자
        $('#TB06040S_S003').val('');                // 금리구분코드
        $('#TB06040S_intrtCngeFrqcMnum').val('');   // 금리구분코드명
        $('#TB06040S_E011').val('');                // 이자방법/개월
        $('#TB06040S_intrRdmpFrqcMnum').val('');    // 이자방법/개월

        $('#TB06040S_ctrcDt').val('');              // 약정일자
        $('#TB06040S_ctrcExpDt').val('');           // 약정만기일자
        $('#TB06040S_eprzCrdlCtrcAmt').val('0');            // 약정금액

        $('#TB06040S_stdrClrt').val('');            // 기준
        $('#TB06040S_addClrt').val('');             // 가산
        $('#TB06040S_totClrt').val('');             // 총금리

        $('#TB06040S_E005').val('');                // 해지사유코드
        $('#TB06040S_cancelDt').val('');            // 해지일자
        $('#TB06040S_cancelRsnCntn').val('');       // 해지사유내용

        let hEmpNo = $('#TB06040S_empNo_h').val();  // 담당자사번_temp
        let hEmpNm = $('#TB06040S_empNm_h').val();  // 담당자명_temp

        $('#TB06040S_empNo').val(hEmpNo);           // 담당자사번
        $('#TB06040S_empNm').val(hEmpNm);           // 담당자명
    };

    // 담당직원정보
    // 	$.ajax({
    // 		type: "GET",
    // 		url: "/getUserAuth",
    // 		dataType: "json",
    // 		success: function(data) {
    // 			loginUserId = data.eno;
    // 			$('#TB06040S_empNo').val(data.eno);
    // 			$('#TB06040S_empNm').val(data.empNm);
    //             $('#TB06040S_empNo_h').val(data.eno);
    // 			$('#TB06040S_empNm_h').val(data.empNm);
    // 		}
    // 	});
    // };

    /******************************************************
    * Validation
    ******************************************************/
    function validation(obj = {}) {
        let prdtCd = $('#TB06040S_prdtCd').val();

        // 저장 시
        if ( fValid == 1 ) {
            if ( isEmpty(prdtCd) ) {
                Swal.fire({
                    icon              : 'warning'
                , text              : "종목코드로 조회해주세요."
                , confirmButtonText : "확인"
                });
                return false;
            }

            let thcoPtciAmt = uncomma($('#TB06040S_thcoPtciAmt').val()); // 당사참여금액
            let eprzCrdlCtrcAmt     = uncomma($('#TB06040S_eprzCrdlCtrcAmt').val());     // 약정금액

            if ( Number(thcoPtciAmt) < Number(eprzCrdlCtrcAmt) ) {
                Swal.fire({
                    icon              : 'warning'
                , text              : "약정금액은 당사참여금액을 초과할 수 없습니다."
                , confirmButtonText : "확인"
                });
                return false;
            }

            // console.log("obj :::: ", obj);
            // delete obj.dealNo;
            // delete obj.mtrDcd;
            // delete obj.stdrIntrtKndCd;

            // let chkVal = Object.values(obj).some(value => isEmpty(value));
            // // console.log("val ::::: ", obj)
            // // console.log(chkVal);
            // if ( chkVal ) {
            // 	Swal.fire({
            // 		icon: 'warning'
            // 		, text: "항목이 비어있습니다. 확인해주세요."
            // 		, confirmButtonText: "확인"
            // 	});
            // 	return false;
            // }
        }
        return true;
    };

    // 기준/가산/총금리 계산
    function calInsRate() {
        let stdrIntr = $('#TB06040S_stdrClrt').val();   // 기준
        let addIntr = $('#TB06040S_addClrt').val();	// 가산

        let fStdrIntr = parseFloat(stdrIntr);
        let fAddIntr = parseFloat(addIntr);

        if ( isNaN(fStdrIntr) || isEmpty(fStdrIntr) ) {
            fStdrIntr = 0;
        }
        // console.log(fStdrIntr);
        // console.log(fAddIntr);
        if ( isNaN(fAddIntr) || isEmpty(fAddIntr) ) {
            console.log("여기탄거같은데");
            fAddIntr = 0;
        }

        if ( !isNaN(fAddIntr) ) {
            let totIntr = fStdrIntr + fAddIntr; // 총 금리

            let roundedValue = totIntr.toFixed(2);

            // console.log(roundedValue)
            $('#TB06040S_totClrt').val(roundedValue);
        } else {
            $('#TB06040S_totClrt').val(0);
        };
    };

    function btnCtr(p = '') {
        let prgSttsCd = $('#TB06040S_I011').val();
        // console.log(p);
        // let toggleBtn1 = document.querySelector('.toggleBtn1');
        // console.log(toggleBtn1);
        // let toggleBtn2 = document.querySelector('.toggleBtn2');
        switch (p) {
            case "1":
                console.log("약정");
                if(isEmpty($('#TB06040S_ctrcDt').val())){
					     Swal.fire({
	                       icon: 'warning'
	                       , text: "약정일자를 확인해주세요."
	                       , confirmButtonText: "확인"
	                   }).then((result)=>{
						if(result.isConfirmed){
							idFocus("TB06040S_ctrcDt");
						}	
					   });
	                   return;
				}
				if(isEmpty($('#TB06040S_ctrcExpDt').val())){
					     Swal.fire({
	                       icon: 'warning'
	                       , text: "약정만기일자를 확인해주세요."
	                       , confirmButtonText: "확인"
					   }).then((result)=>{
							if(result.isConfirmed){
								idFocus("TB06040S_ctrcExpDt");
							}	
	   				   });
					  // $('#TB06040S_ctrcExpDt').focus();
	                   return;
				}
				
				if(isEmpty($('#TB06040S_eprzCrdlCtrcAmt').val())||$('#TB06040S_eprzCrdlCtrcAmt').val()=='0' ){
					     Swal.fire({
				           icon: 'warning'
				           , text: "약정금액을 확인해주세요."
				           , confirmButtonText: "확인"
					   }).then((result)=>{
					   	if(result.isConfirmed){
					   		idFocus("TB06040S_eprzCrdlCtrcAmt");
					   	}	
					   });
					  // $('#TB06040S_eprzCrdlCtrcAmt').focus();
				       return;
				}				
				save('1');
                // if ( prgSttsCd >= "502") {
                //     Swal.fire({
                //         icon: 'warning'
                //         , text: "현재 해지상태입니다."
                //         , confirmButtonText: "확인"
                //     })
                //     return;
                // }

                // if ( prgSttsCd === "501" && fSts === '1' && prgSttsCd !== "502") {
                //     Swal.fire({
                //         icon: 'warning'
                //         , text: "현재 약정상태입니다."
                //         , confirmButtonText: "확인"
                //     })
                //     return;
                // } else {

                // };

                // $('#btnCtrc').attr('disabled', true);   // 약정
                // $('#btnCclc').attr('disabled', false);  // 해지

                // 약정정보
                // $('#TB06040S_ctrcDt').prop('disabled', true);           // 약정일자
                // $('#TB06040S_ctrcExpDt').prop('disabled', true);        // 약정만기일자
                // $('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', true);  // 약정금액
                // $('#TB06040S_addClrt').prop('disabled', true);          // 가산
                // $('#TB06040S_empNo').prop('disabled', true);            // 담당자
                // $('#TB06040S_empBtn').prop('disabled', true);           // 버튼
                // $('#TB06040S_E005').prop('disabled', false);            // 해지사유코드
                // $('#TB06040S_cancelDt').prop('disabled', false);        // 해지일자
                // $('#TB06040S_cancelRsnCntn').prop('disabled', false);   // 해지사유내용
                break;
            case "2":
                console.log("해지");
				if(isEmpty($('#TB06040S_E005').val())){
					     Swal.fire({
				           icon: 'warning'
				           , text: "해지사유코드를 확인해주세요."
				           , confirmButtonText: "확인"
					   }).then((result)=>{
						   	if(result.isConfirmed){
						   		idFocus("TB06040S_E005");
						   	}	
					      });
					   //$('#TB06040S_E005').focus();
				       return;
				}
				if(isEmpty($('#TB06040S_cancelDt').val())){
					     Swal.fire({
				           icon: 'warning'
				           , text: "해지일자를 확인해주세요."
				           , confirmButtonText: "확인"
					   }).then((result)=>{
					      	if(result.isConfirmed){
					      		idFocus("TB06040S_cancelDt");
					      	}	
					      });
				       return;
				}

				if(isEmpty($('#TB06040S_cancelRsnCntn').val())){
					     Swal.fire({
				           icon: 'warning'
				           , text: "해지사유내용 확인해주세요."
				           , confirmButtonText: "확인"
						   }).then((result)=>{
					      	if(result.isConfirmed){
					      		idFocus("TB06040S_cancelRsnCntn");
					      	}	
					      });
				       return;
				}	
				
				
                save('2');
                // if ( prgSttsCd >= "502" && fSts === '2' ) {
                //     Swal.fire({
                //         icon: 'warning'
                //         , text: "현재 해지상태입니다."
                //         , confirmButtonText: "확인"
                //     })
                //     return;
                // } else {

                // };
                // $('#btnCtrc').attr('disabled', true);
                // $('#btnCclc').attr('disabled', true);

                // 약정정보
                // $('#TB06040S_ctrcDt').prop('disabled', true);           // 약정일자
                // $('#TB06040S_ctrcExpDt').prop('disabled', true);        // 약정만기일자
                // $('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', true);  // 약정금액
                // $('#TB06040S_addClrt').prop('disabled', true);          // 가산
                // $('#TB06040S_empNo').prop('disabled', true);            // 담당자
                // $('#TB06040S_empBtn').prop('disabled', true);           // 버튼
                // $('#TB06040S_E005').prop('disabled', true);             // 해지사유코드
                // $('#TB06040S_cancelDt').prop('disabled', true);         // 해지일자
                // $('#TB06040S_cancelRsnCntn').prop('disabled', true);    // 해지사유내용
                break;
            default:
                console.log("기본");
                // $('#btnCtrc').attr('disabled', false);
                // $('#btnCclc').attr('disabled', true);

                // 약정정보
                // $('#TB06040S_ctrcDt').prop('disabled', false);           // 약정일자
                // $('#TB06040S_ctrcExpDt').prop('disabled', false);        // 약정만기일자
                // $('#TB06040S_eprzCrdlCtrcAmt').prop('disabled', false);  // 약정금액
                // $('#TB06040S_addClrt').prop('disabled', false);          // 가산
                // $('#TB06040S_empNo').prop('disabled', false);            // 담당자
                // $('#TB06040S_empBtn').prop('disabled', false);           // 버튼
                // $('#TB06040S_E005').prop('disabled', true);             // 해지사유코드
                // $('#TB06040S_cancelDt').prop('disabled', true);         // 해지일자
                // $('#TB06040S_cancelRsnCntn').prop('disabled', true);    // 해지사유내용
                // toggleBtn1.click();
                break;
        }
    }

    function authInf() {
        $('#TB06040S_empNo').val(userEno);
        $('#TB06040S_empNm').val(userEmpNm);

        console.log(userEmpNm, userEno);
    }

    function resetDd() {
        // 페이지 로드 시, 입력 요소의 초기 값을 저장합니다.
        $('input[id^="TB06040S"]').each(function() {
            const $this = $(this);
            //console.log($this.attr('id'));
            initObj[$this.attr('id')] = $this.val();
            //console.log(initObj);
        });
		
		$('#TB06040S_cancelRsnCntn').val("");
    }

    function reset() {
        $('input[id^="TB06040S"]').each(function() {
            const $this = $(this);
            //console.log($this);
            $this.val(initObj[$this.attr('id')]);
        });
		
		$('#TB06040S_eprzCrdlCtrcAmt').val('0');            // 약정금액

        $('select').each(function() {
            const $this = $(this);
            const id = $this.attr('id');

            if (id.includes('I027')) {
                // 'I027'이 포함된 select 요소의 경우, value를 'KRW'로 설정
                $this.val('KRW');
            } else {
                // 나머지 select 요소의 경우, 첫 번째 옵션을 선택
                $this.prop('selectedIndex', 0);
            }
        });
		
		$('#TB06040S_cancelRsnCntn').val("");
    }

    function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
            var prdtCd = sessionStorage.getItem("wfPrdtCd");
            var prdtNm = sessionStorage.getItem("wfPrdtNm");
            $("#TB06040S_prdtCd").val(prdtCd);
            $("#TB06040S_prdtNm").val(prdtNm);
		    srch();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

	return {
		/**
		 * 사용 할 함수 정의
		 */
		defaultNumberFormat_TB06040S : defaultNumberFormat_TB06040S
	,   inputNumberChangeFunction_TB06040S : inputNumberChangeFunction_TB06040S	
	,	srch : srch
	,	reset : reset
    ,   btnCtr : btnCtr
    ,   getDealInfoFromWF : getDealInfoFromWF
	}

})();