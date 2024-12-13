const TB07020Sjs = (function() {

	let loginUsrId = '';
	let loginUsrNm = '';
	let loginUsrDprtNm = '';
	let loginUsrDprtCd = '';


	let colM_TB07020S = [
		{
			title: "거래일자",
			dataType: "string",
			dataIndx: "trDt",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] } ,
		},
		{
			title: "거래번호",
			dataType: "string",
			dataIndx: "trSn",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "거래구분",
			dataType: "string",
			dataIndx: "trCls",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "운용펀드",
			dataType: "string",
			dataIndx: "fndCd",
			align: "center",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "종목코드",
			dataType: "string",
			dataIndx: "prdtCd",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "종목명",
			dataType: "string",
			dataIndx: "prdtNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "보유목적",
			dataType: "string",
			dataIndx: "holdPrpsDcdNm",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "통화",
			dataType: "string",
			dataIndx: "trCrryCd",
			align: "left",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] }
		},
		{
			title: "수량",
			dataType: "string",
			dataIndx: "trQnt",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] },

		},
		{
			title: "거래단가",
			dataType: "string",
			dataIndx: "trUnpr",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] },
		},
		{
			title: "거래금액",
			dataType: "string",
			dataIndx: "trAmt",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] },

		},
		{
			title: "매매환율",
			dataType: "string",
			dataIndx: "trdeExrt",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] },

		},
		{
			title: "환산금액",
			dataType: "string",
			dataIndx: "trslAmt",
			align: "right",
			halign: "center",
			width: "",
			filter: { crules: [{ condition: 'range' }] },

		},
		{
			title: "",
			dataType: "string",
			dataIndx: "trDptCd",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "trDptNm",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "prfdCorpIntx",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "rqsEmpno",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "rqsEmpNm",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "holdPrpsDcd",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "trtx",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "fndNm",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "fnltCd",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "fnltNm",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "etprCrdtGrntTrKindCd",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "stlAcno",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "rfnDt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "stdrExrt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "excSn",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "wholIssuShqt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "hldgShqt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "qotaRt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "evlPflsAmt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "tradPflsAmt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "eprzCrdlCtrcAmt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "krwTrslExcBlce",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "krwTrslExcAmt",
			hidden: true
		},
		{
			title: "",
			dataType: "string",
			dataIndx: "avrUnpr",
			hidden: true
		}
	]

	$(document).ready(function() {
		loadSelectBoxContents();
		loadUserAuth(); // 담당자 정보 조회

		setGrid_TB07020S();

		/**
		 * 인풋박스 초기화 공통
		 * common.js
		 */
		resetInputValue($('div[data-menuid="/TB07020S"]'));
	});

	function setGrid_TB07020S(){
		var obj = {
			height: 180,
			maxHeight: 180,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			editable: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false},
			scrollModel: { autoFit: true },
			colModel: colM_TB07020S,
			strNoRows : '데이터가 없습니다.',
			cellClick: function(event, ui) {
				var rowData = ui.rowData;

				getBuyDetail(rowData);
			}
		}

		$('#TB07020S_tableList').pqGrid(obj);

	}

	function loadSelectBoxContents() {
		getSelectBoxList('TB07020S', 'I027/H002');
	}

	var g_qotaRt;
	var g_holdPrpsDcd;
	var g_loginUserId;
	var g_eprzCrdlCtrcAmt; // 기업여신약정금액 IBIMS401B
	var g_krwTrslExcAmt; // 원화매매실행금액
	var g_krwTrslExcBlce; // 매수가능금액 IBIMS401B
	var g_feeRt = 0.015; // 매매수수료(매수,매도)
	var g_isttRt = 0.005; // 유관기관수수료(매수,매도)
	//var g_trtxRt = 0.0023; // 증권거래세 (매도)
	var paramData_405B;
	var paramData_410B;
	var paramData_402BH;

	function loadUserAuth() {
		$.ajax({
		type: "GET",
		url: "/getUserAuth",
		dataType: "json",
		success: function(data) {
			loginUserId = data.eno;
			$('#TB07020S_dprtCd').val(data.dprtCd);
			$('#TB07020S_dprtNm').val(data.dprtNm);

			$('#TB07020S_empNo').val(data.eno);
			$('#TB07020S_empNm').val(data.empNm);

			loginUsrId = data.eno;
			loginUsrNm = data.empNm;
			loginUsrDprtCd = data.dprtCd;
			loginUsrDprtNm = data.dprtNm;



			},
			error : function(request,status,error) {
				console.log(request+"\n",status,"\n",error, "\n")
			}
		});
	}

	function getEprzCrdlCtrcAmt(prdtCd) {
		$.ajax({
		type: "POST",
		url: "/TB07020S/getEprzCrdlCtrcAmt",
		data: prdtCd,
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			g_eprzCrdlCtrcAmt = data;
			//alert(data);
			},
			error : function(request,status,error) {
				console.log(request+"\n",status,"\n",error, "\n")
			}
		});
	}

	function getBuyList() {
		/*
		if(isEmpty($('#TB07020S_prdtCd').val())){
			return false;
		}
		*/
		var trDt = $('#TB07020S_rsltnDt').val().replaceAll('-', '');
		var prdtCd = $('#TB07020S_prdtCd').val();
		var ibPrdtTrDcd = $('#TB07020S_ibPrdtTrDcd').val();
		if (ibPrdtTrDcd === '1') {
			var etprCrdtGrntTrKindCd = '81'; //매수
		} else {
			var etprCrdtGrntTrKindCd = '82'; //매도
		}
		var paramData = {
			'trDt' : trDt
			, 'prdtCd' : prdtCd
			, 'etprCrdtGrntTrKindCd' : etprCrdtGrntTrKindCd
		};

		$.ajax({
			type: "GET",
			url: "/TB07020S/getBuyList",
			data: paramData,
			dataType: "json",
			beforeSend: function(){
				//$("#TB07020S_tableList").pqGrid("setData", []);
				compClear();
				$("#TB07020S_tableList").pqGrid("option", "strNoRows", "조회 중입니다...");
			},
			success: function(data) {

				if (data.length > 0) {
					var newData = [];

					data.forEach(function(item){
						var trCls = "매수";

						var newRow = {
							"trDt"				: formatDate(item.trDt),
							"trSn"				: item.trSn,
							"trCls"				: trCls,
							"fndCd"				: item.fndCd,
							"prdtCd"			: item.prdtCd,
							"prdtNm"			: item.prdtNm,
							"holdPrpsDcdNm"		: item.holdPrpsDcdNm,
							"trCrryCd"			: item.trCrryCd,
							"trQnt"				: isEmpty(item.trQnt) ? '' : addComma(item.trQnt),
							"trUnpr"			: isEmpty(item.trUnpr) ? '' : addComma(item.trUnpr),
							"trAmt"				: isEmpty(item.trAmt)?'':addComma(item.trAmt),
							"trdeExrt"			: isEmpty(item.trdeExrt)?'':addComma(item.trdeExrt),
							"trslAmt"			: isEmpty(item.trslAmt)?'':addComma(item.trslAmt),
							"trDptCd"			: item.trDptCd,
							"trDptNm"			: item.trDptNm,
							"prfdCorpIntx"		: isEmpty(item.prfdCorpIntx)?'':addComma(item.prfdCorpIntx),
							"rqsEmpno"			: item.rqsEmpno,
							"rqsEmpNm"			: item.rqsEmpNm,
							"holdPrpsDcd"		: item.holdPrpsDcd,
							"trtx"				: isEmpty(item.trtx)?'':addComma(item.trtx),
							"fndNm"				: item.fndNm,
							"fnltCd"			: item.fnltCd,
							"fnltNm"			: item.fnltNm,
							"etprCrdtGrntTrKindCd"	: item.etprCrdtGrntTrKindCd,
							"stlAcno"			: item.stlAcno,
							"rfnDt"				: formatDate(item.rfnDt),
							"stdrExrt"			: isEmpty(item.stdrExrt)?'0.00':addComma(item.stdrExrt),
							"excSn"				: isEmpty(item.excSn)?'':addComma(item.excSn),
							"wholIssuShqt"		: isEmpty(item.wholIssuShqt)?'0':addComma(item.wholIssuShqt),
							"hldgShqt"			: isEmpty(item.hldgShqt)?'0':addComma(item.hldgShqt),
							"qotaRt"			: isEmpty(item.qotaRt)?'0.00':addComma(Number(item.qotaRt).toFixed(8)),
							"evlPflsAmt"		: isEmpty(item.evlPflsAmt)?'0':addComma(item.evlPflsAmt),
							"tradPflsAmt"		: isEmpty(item.tradPflsAmt)?'0':addComma(item.tradPflsAmt),
							"eprzCrdlCtrcAmt"	: isEmpty(item.eprzCrdlCtrcAmt)?'':addComma(item.eprzCrdlCtrcAmt),
							"krwTrslExcBlce"	: isEmpty(item.krwTrslExcBlce)?'0':addComma(item.krwTrslExcBlce),
							"krwTrslExcAmt"		: isEmpty(item.krwTrslExcAmt)?'0':addComma(item.krwTrslExcAmt),
							"avrUnpr"			: isEmpty(item.avrUnpr)?'0':addComma(item.avrUnpr)

						}

						newData.push(newRow);
					})

					$("#TB07020S_tableList").pqGrid("option", "strNoRows", "데이터가 없습니다.");
					$("#TB07020S_tableList").pqGrid("setData", newData);
					$("#TB07020S_tableList").pqGrid("refreshDataAndView");
				} else {
					$("#TB07020S_tableList").pqGrid("option", "strNoRows", "데이터가 없습니다.");
					$("#TB07020S_tableList").pqGrid("refreshDataAndView");
				}

			}
		})
	}

	// 매수정보 실행
	function showAlert() {
		var strVal = $('.btn.btn-s.btn-info').text();
		var trSn = $('#TB07020S_trSn').val();
		if (strVal === '등록') {
			if ( isNotEmpty(trSn)) {
				Swal.fire({
								icon              : 'error'
								, title             : "[매수거래] 등록 Error!"
								, text              : "[매수거래] 등록은 거래번호를 미입력 하셔야 합니다."
								, confirmButtonText : "확인"
							});
				return false;
			}
		}
		else {
			if ( isEmpty(trSn)) {
				Swal.fire({
								icon              : 'error'
								, title             : "[매수거래] 취소 Error!"
								, text              : "[매수거래] 취소할 거래번호를 선택해주세요."
								, confirmButtonText : "확인"
							});
				return false;
			}
		}

		Swal.fire({
			icon: 'warning'
		,title: '[매수거래] ' + strVal + (strVal=='취소'?'거래 : ':'') + (strVal=='취소'?trSn:'')
		,text : (strVal=='등록'?'등록을':'취소를') + ' 실행하시겠습니까?'
		,showCancelButton: true
		,confirmButtonColor: '#3085d6'
		,cancelButtonColor: '#d33'
		,confirmButtonText: '확인'
		,cancelButtonText: '취소'
		}).then((result) => {
			if (result.isConfirmed) {
				//callTran();
				if($('.btn.btn-s.btn-info').text() === '등록' ) {
					g_eprzCrdlCtrcAmt = $('#TB07020S_eprzCrdlCtrcAmt').val().replaceAll(',', '');
					g_krwTrslExcBlce = $('#TB07020S_krwTrslExcBlce').val().replaceAll(',', '');
					//g_krwTrslExcAmt = $('#TB07020S_krwTrslExcAmt').val().replaceAll(',', '');
					var paramData = makeParam();
				}else{

					if ( !isEmpty(trSn)) {
						var paramData = makeParam();
					}else{
						Swal.fire({
							icon              : 'error'
							, title             : "[매수거래] 취소 Error!"
							, text              : "[매수거래] 취소 거래정보를 선택해주세요."
							, confirmButtonText : "확인"
						});
					}
				}
			}
			else if (result.isDismissed) {
			}
		})
	}

	function makeParam() {
		var inputDcd; // 입력구분 : 1:등록, 2:취소
		// 등록시 일련번호 채번
		if($('.btn.btn-s.btn-info').text() === '등록' ) {
			// 거래번호 조회
			//trSn ='';
			inputDcd = '1';
			var prdtCd = $('#TB07020S_input_prdtCd').val();  // 상품코드
			var excSn = '1';                                 // 실행일련번호
			var paramData2 = {
				'prdtCd' : prdtCd
				, 'excSn' : excSn
			};

			$.ajax({
				type: "GET",
				url: "/TB07020S/getTrSn",
				data: paramData2,
				dataType: "json",
				//contentType: "application/json; charset=UTF-8",
				success: function(data) {
					//alert(JSON.stringify(data));
					var result = data;
					trSn = data;
					bessniseFunction(trSn, inputDcd);
				},
				error : function(request,status,error) {
					console.log(request+"\n",status,"\n",error, "\n")
				}
			});
		}else { //취소시
			inputDcd = '2';
			trSn = $('#TB07020S_trSn').val();                                // 거래일련번호
			bessniseFunction(trSn, inputDcd);
		}

		function bessniseFunction(trSn, inputDcd) {
			//IBIMS405B	기타투자정보
			var prdtCd = $('#TB07020S_input_prdtCd').val();        		     // 상품코드
			//var trSn;                                                      // 거래일련번호
			var excSn = 1;                                                   // 실행일련번호
			var ibPrdtTrDcd = $('#TB07020S_ibPrdtTrDcd').val();
			if (ibPrdtTrDcd === '1') {                                       // 거래종류코드
				var etprCrdtGrntTrKindCd = '81';                             // 매수
			} else {
				var etprCrdtGrntTrKindCd = '82';                             // 매도
			}
			var nsFndCd = $('#TB07020S_fndCd').val();						 // 고유자산펀드코드
			var synsCd;                                                      // 적용코드
			var holdPrpsDcd = $('#TB07020S_H002').val();                     // 보유목적구분코드
			var ippDcd;                                                      // 입출구분코드
			var trQnt = Number($('#TB07020S_trQnt').val().replaceAll(',', ''));      // 거래수량
				trQnt = (inputDcd=='1'?1:-1) * trQnt;
			var trUnpr = Number($('#TB07020S_trUnpr').val().replaceAll(',', ''));    // 거래단가
				//trUnpr = (inputDcd=='1'?1:-1) * trUnpr;
			var trAmt = Number($('#TB07020S_trAmt').val().replaceAll(',', ''));      // 거래금액
				trAmt = (inputDcd=='1'?1:-1) * trAmt;
			//var trtx = $('#TB07020S_trtx').val().replaceAll(',', '');      // 거래세
			var trtx   = 0; 												 // 거래세
			var fee    = 0; 											     // 수수료
			var fee = Number($('#TB07020S_trslAmt').val().replaceAll(',', '')) * g_feeRt * g_isttRt; // 수수료
				fee = (inputDcd=='1'?1:-1) * fee;
			var lTrAmt = Number($('#TB07020S_trslAmt').val().replaceAll(',', ''));    // 거래금액 정산금액계산용
			var lTrtx = 0;                                                    // 거래세 정산금액계산용
			var lFee = Number(lTrAmt * g_feeRt * g_isttRt);                           // 수수료 정산금액계산용
			var excalAmt = lTrAmt;                         // 정산금액
				excalAmt = (inputDcd=='1'?1:-1) * excalAmt;
			var trdeExrt = Number($('#TB07020S_trdeExrt').val().replaceAll(',', ''));// 매매환율
			var trslAmt = Number($('#TB07020S_trslAmt').val().replaceAll(',', ''));  // 환산금액
				trslAmt = (inputDcd=='1'?1:-1) * trslAmt;
			var date = new Date();
			var trDt = getFormatDate(date); 								 // 거래일자
			var stlDt; 														 // 결제일자
			var opntNsFndCd; 												 // 상대고유자산펀드코드
			var opntTrSn = 0;                                                // 상대거래일련번호
			var xtnlIsttCd;                                                  // 외부기관코드
			var sctyAcno = 0;                                                // 증권계좌번호
			var fndsIstrSn = 0;                                              // 자금지시일련번호
			var rqsEmpno = $('#TB07020S_empNo').val();                       // 신청사원번호
			var apvlYn = (inputDcd=='1'?'Y':'N');                            // 승인여부
			var cnclYn = (inputDcd=='1'?'N':'Y');                            // 취소여부
			//var rfnDt = $('#TB07020S_rfnDt').val().replaceAll('-', '');    // 배당일자 //환불일자
			var rfnDt = '';                                                  // 배당일자
			var alctQnt  = 0;                                                // 배정수량
			var rfnAmt  = 0;                                                 // 환불금액
			var rfnGoldKrwFndsIstrSn = 0;                                    // 환불금원화자금지시일련번호
			var sttmNo = 0;                                                  // 전표번호
			var rfnSttmNo = 0;                                               // 환불전표번호
			var rfnCnclYn = 'N';                                             // 환불취소여부
			var stlAcno = $('#TB07020S_stlAcno').val();                      // 결제계좌
			var stlXtnlIsttCd = $('#TB07020S_fnltCd').val();                 // 결제은행
			var lstDt;                                                       // 상장일자
			var bntpSpacYn;                                                  // 채권형spac여부
			var trDptCd = $('#TB07020S_dprtCd').val();                       // 거래부서코드
			//var prfdCorpIntx = $('#TB07020S_prfdCorpIntx').val().replaceAll(',', ''); // 선급법인세
			var prfdCorpIntx = 0;                                                       // 선급법인세
			var wholIssuShqt = $('#TB07020S_wholIssuShqt').val().replaceAll(',', ''); // 전체발행좌수
			//var hldgShqt = $('#TB07020S_hldgShqt').val().replaceAll(',', '');         // 보유좌수
			var qotaRt = $('#TB07020S_qotaRt').val().replaceAll(',', '');               // 지분율
			var evlPflsAmt = $('#TB07020S_evlPflsAmt').val().replaceAll(',', '');   // 평가손익금액
			var tradPflsAmt = $('#TB07020S_eprzCrdlCtrcAmt').val().replaceAll(',', '');   // 매매손익금액
			//var tradPflsAmt = 0;                                                        // 매매손익금액
			//var hndDetlDtm;                                                           // 조작상세일시
			var hndEmpno = loginUserId;                                                 // 조작사원번호
			var hndTmnlNo;                                                              // 조작단말기번호
			var hndTrId;                                                                // 조작거래ID
			var guid;                                                                   // GUID

			//IBIMS410B 딜거래내역;
			//var prdtCd                     ;                                // 상품코드
			//var trSn                       ;                                // 거래일련번호
			//var excSn                      ;                                // 실행일련번호
			//var trDt                       ;                                // 거래일자
			var trStatCd = (inputDcd=='1'?'01':'12');                         // 거래상태코드 01:정상,11:취소원거래,12:취소거래
			//var etprCrdtGrntTrKindCd       ;                                // 거래종류코드
			var dealTrAmt = trAmt;                                            // 딜거래금액
			var dealTrPrca = trAmt;                                           // 딜거래원금
			var trIntAmt = 0;                                                 // 거래이자금액
			var dealRdptObjtPrca = 0;                                         // 딜상환대상원금
			var dealMrdpPrca = 0;                                             // 딜중도상환원금
			var nrmlIntAmt = 0;                                               // 정상이자금액
			var crdtGrntOvduIntAmt = 0;                                       // 신용공여연체이자금액
			var crdtGrntRcvbIntAmt = 0;                                       // 신용공여미수이자금액
			var pucrIntAmt = 0;                                               // 환출이자금액
			var trFeeAmt = lFee;                                              // 거래수수료금액
			var costAmt = lTrtx;                                              // 비용금액
			var trCrcyCd = $('#TB07020S_I027').val();                         // 거래통화코드
			var wcrcTrslRt = trdeExrt ;                                       // 원화환산율
			var wcrcTrslTrPrca = trslAmt;                                     // 원화환산거래원금
			var wcrcTrslTrIntAmt = 0;                                         // 원화환산거래이자금액
			var wcrcTrslTrFeeAmt = lFee;                                      // 원화환산거래수수료금액
			var wcrcTrslCostAmt = lTrtx;                                      // 원화환산비용금액
			var actgAfrsCd = '10';                                            // 회계업무코드
			var actgUnitAfrsCd = etprCrdtGrntTrKindCd ;                       // 회계단위업무코드
			var actgTrCd = inputDcd;                                          // 회계거래코드
			var actgErlmSeq = trSn;                                           // 회계등록순번
			var rkfrDt = trDt;                                                // 기산일자
			var fndsDvsnCd;                                                   // 자금구분코드
			var rctmIsttCd = stlXtnlIsttCd;                                   // 입금기관코드
			var rctmBano   = stlAcno;                                         // 입금은행계좌번호
			var dpowName;                                                     // 예금주명
			var hdwrPrcsYn ='N';                                              // 수기처리여부
			var acptPtclSmtlAmt = 0;                                          // 수납내역합계금액
			var dealAltnAmt = 0;                                              // 딜대체금액
			var dealCashAmt = 0;                                              // 딜현금금액
			var dealBkchAmt = 0;                                              // 딜자기앞수표금액
			var dealCkblAmt = 0;                                              // 딜타점권금액
			var billPoutYn ='N';                                              // 계산서출력여부
			var trbkPoutYn ='N';                                              // 거래장출력여부
			var rclmDvsnCd;                                                   // 회수구분코드
			var pucrIntAltnAmt = 0;                                           // 환출이자대체금액
			var pucrIntRctmAmt = 0;                                           // 환출이자입금금액
			var clcnFeeAmt = 0;                                               // 추심수수료금액
			var imptStmpAmt = 0;                                              // 수입인지금액
			var feeTotAmt = 0;                                                // 수수료총금액
			var rvseCnclDvsnCd;                                               // 정정취소구분코드
			var rvseCnclRsonText =' ';                                        // 정정취소사유내용
			var rvseCnclTrSeq = 0;                                            // 정정취소거래순번
			var trAfLoanRmnd = 0;                                             // 거래이후대출잔액
			var rdptTmod = 0;                                                 // 상환회차
			var dealPxdfPrca = 0;                                             // 딜대지급원금
			var pxdfIntAmt = 0;                                               // 대지급이자금액
			var pxdfEtcAmt = 0;                                               // 대지급기타금액
			var orgno = 0;                                                    // 조직번호
			var trStfno = 0;                                                  // 거래직원번호
			var dcfcStfno = 0;                                                // 결재자직원번호
			var clmSeq = 0;                                                   // 청구순번
			var actgSynsCd ='10';                                             // 회계적요코드
			var synsText = (inputDcd=='1'?'기타투자매수':'기타투자매수취소'); // 적요내용
			var taxBillEvdcErlmDt;                                            // 세금계산서증빙등록일자
			var taxBillEvdcErlmSeq = 0;                                       // 세금계산서증빙등록순번
			var taxBillPrcsSeq = 0;                                           // 세금계산서처리순번
			var billEvdcErlmDt;                                               // 계산서증빙등록일자
			var billEvdcErlmSeq = 0;                                          // 계산서증빙등록순번
			var billPrcsSeq = 0;                                              // 계산서처리순번
			var vat = 0;                                                      // 부가세
			var issuBillEvdcErlmDt;                                           // 발행계산서증빙등록일자
			var issuBillPrcsSeq = 0;                                          // 발행계산서처리순번
			var dfrmFeePrcaEclsYn = 'N';                                      // 지급수수료원금제외여부
			var dfrmFeeClmObjtAmt = 0;                                        // 지급수수료청구대상금액
			var mrdpFeeAmt = 0;                                               // 중도상환수수료금액
			var chckIssuIsttName;                                             // 수표발행기관명
			var mrdpYn ='N';                                                  // 중도상환여부
			var rctmDt;                                                       // 입금일자
			var trObjtBsnNo = 0;                                              // 거래대상기업체번호
			var noprErngEtcAmt = 0;                                           // 영업외수익기타금액
			var noprCostEtcAmt = 0;                                           // 영업외비용기타금액
			var rcvbRstrYn ='N';                                              // 미수환원여부
			var rcvbYn ='N';                                                  // 미수여부

			// IBIMS402B	딜실행기본;
			// var prdtCd                     ;                               // 상품코드
			// var excSn                      ;                               // 실행일련번호
			var ldgSttsCd = (inputDcd=='1'?'01':'02');                        // 원장상태코드
			var crryCd = trCrcyCd;                                            // 통화코드
			var excDt = trDt;                                                 // 실행일자
			var expDt = rfnDt;                                                // 만기일자
			var eprzCrdlCtrcAmt = $('#TB07020S_eprzCrdlCtrcAmt').val().replaceAll(',', ''); // 약정금액
			var krwTrslExcBlce = $('#TB07020S_krwTrslExcBlce').val().replaceAll(',', ''); // 매수가능금액
			var dealExcAmt = trAmt;                                           // 딜실행금액
			var dealExcBlce = trAmt;                                          // 딜실행잔액
			// if ( Number(eprzCrdlCtrcAmt) == Number(krwTrslExcBlce)) {
			// 	dealExcBlce = eprzCrdlCtrcAmt - trAmt;
			// }
			// else {
			// 	dealExcBlce = trAmt * -1 ;
			// }
			var krwTrslRt = trdeExrt;                                         // 원화환산율
			var krwTrslExcAmt = trslAmt;                                      // 원화환산실행금액
			var krwTrslExcBlce = trslAmt;                                     // 원화환산실행잔액
			// if ( Number(eprzCrdlCtrcAmt) == Number(krwTrslExcBlce)) {         // 매수가능금액
			// 	krwTrslExcBlce = eprzCrdlCtrcAmt - trslAmt;
			// }
			// else {
			// 	krwTrslExcBlce = trslAmt * -1;
			// }
			var prnaDfrPrdMnum = 0;                                           // 원금거치기간개월수
			var dfrExpMnum;                                                   // 거치만기개월수
			var lastPrnaRdmpDt;                                               // 최종원금상환일자
			var lastIntrClcDt;                                                // 최종이자계산일자
			var nxtRdmpPrarDt;                                                // 다음상환예정일자
			var nxtIntrPymDt;                                                 // 다음이자납입일자
			var intrRdmpFrqcMnum = 0;                                         // 이자상환주기개월수
			var intrPymDtCd;                                                  // 이자납입일자코드
			var prnaRdmpFrqcMnum = 0;                                         // 원금상환주기개월수
			var prnaOvduDt;                                                   // 원금연체일자
			var intrOvduDt;                                                   // 이자연체일자
			var totRdmpTmrd = 0;                                              // 총상환회차
			var lastRdmpTmrd = 0;                                             // 최종상환회차
			var dealIstmBlce = 0;                                             // 딜할부잔액
			var dealEqlRdmpAmt = 0;                                           // 딜균등상환금액
			var istmDtmRdmpAmt = 0;                                           // 할부일시상환금액
			var rcvbIntrAmt = 0;                                              // 미수이자금액
			var grteDcd = '';                                                 // 보증구분코드
			var pymtGrteRfrNo = 0;                                            // 지급보증참조번호
			var grteIsttCd;                                                   // 보증기관코드
			var grteIsttNm;                       		                      // 보증기관명
			var buyShqt = trQnt;                                              // 매수좌수
			var sllShqt = 0;                                                  // 매도좌수
			var avrUnpr = trUnpr;                                             // 평균단가
			var brkgAcno = stlAcno;                                           // 위탁계좌번호
			var rctmIsttCd = stlXtnlIsttCd;                                   // 입금기관코드
			var achdNm;                                                       // 예금주명
			var pymtGrteScctCtns;                                             // 지급보증특약내용
			var acbkAmt = trslAmt;                                            // 장부금액
			var dealNo = 0;                                                   // 딜번호
			var mtrDcd;                                                       // 안건구분코드
			var jdgmDcd;                                                      // 심사구분코드

			// IBIMS402H	딜실행기본이력 rgstSn; //등록일련번호만 추가 상동
			paramData_405B = {
				'prdtCd' : prdtCd
				,'trSn'  : (trSn /1)
				,'excSn' : (excSn /1)
				,'etprCrdtGrntTrKindCd' : etprCrdtGrntTrKindCd
				,'nsFndCd'              : nsFndCd
				,'synsCd'               : synsCd
				,'holdPrpsDcd'          : holdPrpsDcd
				,'ippDcd'               : ippDcd
				,'trQnt'                : (trQnt                /1)
				,'trUnpr'               : (trUnpr               /1)
				,'trAmt'                : (trAmt                /1)
				,'trtx'                 : (trtx                 /1)
				,'fee'                  : (fee                  /1)
				,'excalAmt'             : (excalAmt             /1)
				,'trDt'                 : trDt
				,'stlDt'                : stlDt
				,'opntNsFndCd'          : opntNsFndCd
				,'opntTrSn'             : (opntTrSn             /1)
				,'xtnlIsttCd'           : xtnlIsttCd
				,'sctyAcno'             : (sctyAcno             /1)
				,'fndsIstrSn'           : (fndsIstrSn           /1)
				,'rqsEmpno'             : rqsEmpno
				,'apvlYn'               : apvlYn
				,'cnclYn'               : cnclYn
				,'rfnDt'                : rfnDt
				,'alctQnt'              : (alctQnt              /1)
				,'rfnAmt'               : (rfnAmt               /1)
				,'rfnGoldKrwFndsIstrSn' : (rfnGoldKrwFndsIstrSn /1)
				,'sttmNo'               : (sttmNo               /1)
				,'rfnSttmNo'            : (rfnSttmNo            /1)
				,'rfnCnclYn'            : rfnCnclYn
				,'stlAcno'              : (stlAcno              /1)
				,'stlXtnlIsttCd'        : stlXtnlIsttCd
				,'lstDt'                : lstDt
				,'bntpSpacYn'           : bntpSpacYn
				,'trDptCd'              : trDptCd
				,'trdeExrt'             : (trdeExrt             /1)
				,'trslAmt'              : (trslAmt              /1)
				,'prfdCorpIntx'         : (prfdCorpIntx         /1)
				,'wholIssuShqt'         : (wholIssuShqt         /1)
				//,'hldgShqt'             : (hldgShqt             /1)
				,'qotaRt'               : (qotaRt               /1)
				,'evlPflsAmt'          : (evlPflsAmt          /1)
				,'tradPflsAmt'          : (tradPflsAmt          /1)
				//,'hndDetlDtm'           : hndDetlDtm
				,'hndEmpno'             : hndEmpno
				,'hndTmnlNo'            : hndTmnlNo
				,'hndTrId'              : hndTrId
				,'guid'                 : guid
			};

			paramData_410B = {
				'prdtCd' : prdtCd
				,'trSn'                : (trSn /1)
				,'excSn'               : (inputDcd=='1'?1:2)
				,'trDt'                : trDt
				,'trStatCd'            : trStatCd
				,'etprCrdtGrntTrKindCd': etprCrdtGrntTrKindCd
				,'dealTrAmt'           : (dealTrAmt            /1)
				,'dealTrPrca'          : (dealTrPrca           /1)
				,'trIntAmt'            : (trIntAmt             /1)
				,'dealRdptObjtPrca'    : (dealRdptObjtPrca     /1)
				,'dealMrdpPrca'        : (dealMrdpPrca         /1)
				,'nrmlIntAmt'          : (nrmlIntAmt           /1)
				,'crdtGrntOvduIntAmt'  : (crdtGrntOvduIntAmt   /1)
				,'crdtGrntRcvbIntAmt'  : (crdtGrntRcvbIntAmt   /1)
				,'pucrIntAmt'          : (pucrIntAmt           /1)
				,'trFeeAmt'            : (trFeeAmt             /1)
				,'costAmt'             : (costAmt              /1)
				,'trCrcyCd'            : trCrcyCd
				,'wcrcTrslRt'          : (wcrcTrslRt           /1)
				,'wcrcTrslTrPrca'      : (wcrcTrslTrPrca       /1)
				,'wcrcTrslTrIntAmt'    : (wcrcTrslTrIntAmt     /1)
				,'wcrcTrslTrFeeAmt'    : (wcrcTrslTrFeeAmt     /1)
				,'wcrcTrslCostAmt'     : (wcrcTrslCostAmt      /1)
				,'actgAfrsCd'          : actgAfrsCd
				,'actgUnitAfrsCd'      : actgUnitAfrsCd
				,'actgTrCd'            : actgTrCd
				,'actgErlmSeq'         : (actgErlmSeq          /1)
				,'rkfrDt'              : rkfrDt
				,'fndsDvsnCd'          : fndsDvsnCd
				,'rctmIsttCd'          : rctmIsttCd
				,'rctmBano'            : (rctmBano /1)
				,'dpowName'            : (dpowName             /1)
				,'hdwrPrcsYn'          : hdwrPrcsYn
				,'acptPtclSmtlAmt'     : (acptPtclSmtlAmt      /1)
				,'dealAltnAmt'         : (dealAltnAmt          /1)
				,'dealCashAmt'         : (dealCashAmt          /1)
				,'dealBkchAmt'         : (dealBkchAmt          /1)
				,'dealCkblAmt'         : (dealCkblAmt          /1)
				,'billPoutYn'          : billPoutYn
				,'trbkPoutYn'          : trbkPoutYn
				,'rclmDvsnCd'          : rclmDvsnCd
				,'pucrIntAltnAmt'      : (pucrIntAltnAmt       /1)
				,'pucrIntRctmAmt'      : (pucrIntRctmAmt       /1)
				,'clcnFeeAmt'          : (clcnFeeAmt           /1)
				,'imptStmpAmt'         : (imptStmpAmt          /1)
				,'feeTotAmt'           : (feeTotAmt            /1)
				,'rvseCnclDvsnCd'      : rvseCnclDvsnCd
				,'rvseCnclRsonText'    : rvseCnclRsonText
				,'rvseCnclTrSeq'       : (rvseCnclTrSeq        /1)
				,'trAfLoanRmnd'        : (trAfLoanRmnd         /1)
				,'rdptTmod'            : (rdptTmod             /1)
				,'dealPxdfPrca'        : (dealPxdfPrca         /1)
				,'pxdfIntAmt'          : (pxdfIntAmt           /1)
				,'pxdfEtcAmt'          : (pxdfEtcAmt           /1)
				,'orgno'               : (orgno                /1)
				,'trStfno'             : (trStfno              /1)
				,'dcfcStfno'           : (dcfcStfno            /1)
				,'clmSeq'              : (clmSeq               /1)
				,'actgSynsCd'          : actgSynsCd
				,'synsText'            : synsText
				,'taxBillEvdcErlmDt'   : taxBillEvdcErlmDt
				,'taxBillEvdcErlmSeq'  : (taxBillEvdcErlmSeq   /1)
				,'taxBillPrcsSeq'      : (taxBillPrcsSeq       /1)
				,'billEvdcErlmDt'      : billEvdcErlmDt
				,'billEvdcErlmSeq'     : (billEvdcErlmSeq      /1)
				,'billPrcsSeq'         : (billPrcsSeq          /1)
				,'vat'                 : (vat                  /1)
				,'issuBillEvdcErlmDt'  : issuBillEvdcErlmDt
				,'issuBillPrcsSeq'     : (issuBillPrcsSeq      /1)
				,'dfrmFeePrcaEclsYn'   : dfrmFeePrcaEclsYn
				,'dfrmFeeClmObjtAmt'   : (dfrmFeeClmObjtAmt    /1)
				,'mrdpFeeAmt'          : (mrdpFeeAmt           /1)
				,'chckIssuIsttName'    : chckIssuIsttName
				,'mrdpYn'              : mrdpYn
				,'rctmDt'              : rctmDt
				,'trObjtBsnNo'         : (trObjtBsnNo          /1)
				,'noprErngEtcAmt'      : (noprErngEtcAmt       /1)
				,'noprCostEtcAmt'      : (noprCostEtcAmt       /1)
				,'rcvbRstrYn'          : rcvbRstrYn
				,'rcvbYn'              : rcvbYn
				//,'hndDetlDtm'          : hndDetlDtm
				,'hndEmpno'            : hndEmpno
				,'hndTmnlNo'           : hndTmnlNo
				,'hndTrId'             : hndTrId
				,'guid'                : guid
			};

			paramData_402BH = {
				'prdtCd' : prdtCd
				,'excSn'           : (excSn             /1)
				,'ldgSttsCd'       : ldgSttsCd
				,'crryCd'          : crryCd
				,'excDt'           : excDt
				,'expDt'           : expDt
				,'dealExcAmt'      : (dealExcAmt        /1)
				,'dealExcBlce'     : (dealExcBlce       /1)
				,'krwTrslRt'       : (krwTrslRt         /1)
				,'krwTrslExcAmt'   : (krwTrslExcAmt     /1)
				,'krwTrslExcBlce'  : (krwTrslExcBlce    /1)
				,'prnaDfrPrdMnum'  : (prnaDfrPrdMnum    /1)
				,'dfrExpMnum'        : dfrExpMnum
				,'lastPrnaRdmpDt'  : lastPrnaRdmpDt
				,'lastIntrClcDt'   : lastIntrClcDt
				,'nxtRdmpPrarDt'   : nxtRdmpPrarDt
				,'nxtIntrPymDt'    : nxtIntrPymDt
				,'intrRdmpFrqcMnum': (intrRdmpFrqcMnum  /1)
				,'intrPymDtCd'     : intrPymDtCd
				,'prnaRdmpFrqcMnum': (prnaRdmpFrqcMnum  /1)
				,'prnaOvduDt'      : prnaOvduDt
				,'intrOvduDt'      : intrOvduDt
				,'totRdmpTmrd'     : (totRdmpTmrd       /1)
				,'lastRdmpTmrd'    : (lastRdmpTmrd      /1)
				,'dealIstmBlce'    : (dealIstmBlce      /1)
				,'dealEqlRdmpAmt'  : (dealEqlRdmpAmt    /1)
				,'istmDtmRdmpAmt'  : (istmDtmRdmpAmt    /1)
				,'rcvbIntrAmt'     : (rcvbIntrAmt       /1)
				,'grteDcd'         : grteDcd
				,'pymtGrteRfrNo'   : (pymtGrteRfrNo     /1)
				,'grteIsttCd'      : grteIsttCd
				,'grteIsttNm'      : grteIsttNm
				,'buyShqt'         : (buyShqt           /1)
				,'sllShqt'         : (sllShqt           /1)
				,'avrUnpr'         : (avrUnpr           /1)
				,'brkgAcno'        : (brkgAcno          /1)
				,'rctmIsttCd'      : rctmIsttCd
				,'achdNm'          : achdNm
				,'pymtGrteScctCtns': pymtGrteScctCtns
				,'acbkAmt'         : (acbkAmt           /1)
				,'dealNo'          : (dealNo            /1)
				,'mtrDcd'          : mtrDcd
				,'jdgmDcd'         : jdgmDcd
				//,'hndDetlDtm'      : hndDetlDtm
				,'hndEmpno'        : hndEmpno
				,'hndTmnlNo'       : hndTmnlNo
				,'hndTrId'         : hndTrId
				,'guid'            : guid
			};

			if (!checkParam(paramData_405B, inputDcd)) {
				return false;
			}

			if (String(inputDcd) === '1') {
					//console.log
					Promise.resolve()
					.then(instBuyList(paramData_405B))
					.then(instDlTrList(paramData_410B))
					.then(chkExcInfo(prdtCd, paramData_402BH))
					//.then(insertIBIMS402HTr(paramData_402BH))
					.then(() => {
						Swal.fire({
							icon: 'success',
							title: (inputDcd=='1'?'[매수거래] 등록':'[매수거래] 취소'),
							text: (inputDcd=='1'?'[매수거래] 등록이 실행되었습니다.':'[매수거래] 취소가 완료되었습니다.'),
							confirmButtonText: "확인",
						});
					})
					.catch(e => {
						Swal.fire({
							icon: 'error'
							,title: "Error!"
							,text: (inputDcd=='1'?'[매수거래] 등록오류!!!':'[매수거래] 취소오류!!!')
							,confirmButtonText: "확인"
						});
					})
					//.finally(getBuyList);
			}
			else {
				Promise.resolve()
				.then(cancelBuyList(paramData_405B))
				.then(instDlTrList(paramData_410B))
				.then(chkExcInfo(prdtCd, paramData_402BH))
				//.then(insertIBIMS402HTr(paramData_402BH))
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: (inputDcd=='1'?'[매수거래] 등록':'[매수거래] 취소'),
						text: (inputDcd=='1'?'[매수거래] 등록이 실행되었습니다.':'[매수거래] 취소가 완료되었습니다.'),
						confirmButtonText: "확인",
					});
				})
				.catch(e => {
					Swal.fire({
						icon: 'error'
						,title: "Error!"
						,text: (inputDcd=='1'?'[매수거래] 등록오류!!!':'[매수거래] 취소오류!!!')
						,confirmButtonText: "확인"
					});
				})
				//.finally(getBuyList);
			}
		}
	}

	function chkExcInfo(prdtCd, paramData) {
		// alert("333 chkExcInfo: "+JSON.stringify(paramData));
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				url: "/TB07020S/chkExcInfo",
				data: prdtCd,
				dataType: "text",
				contentType: "application/json; charset=UTF-8",
				success: function(data) {
					//alert(data);
					var result = data;
					if(isEmpty(result)) {
						// alert("444 chkExcInfo: "+JSON.stringify(paramData));
						return new Promise(function(resolve, reject) {
							$.ajax({
								type: "POST",
								url: "/TB07020S/saveExcInfoNoKey",
								data: paramData,
								dataType: "json",
								//contentType: "application/json; charset=UTF-8",
								success: function(data) {
									insertIBIMS402HTr(paramData_402BH);
									resolve(data); //통신 성공하면 resolve()
								},
								error : function(request,status,error) {
									console.log(request+"\n",status,"\n",error, "\n")
									reject();  //통신 실패하면 reject()
								}
							});
						});
					} else {
						// alert("555 chkExcInfo: "+JSON.stringify(paramData));
						return new Promise(function(resolve, reject) {
							$.ajax({
								type: "POST",
								url: "/TB07020S/uptExcInfoTr",
								data: paramData,
								dataType: "json",
								//contentType: "application/json; charset=UTF-8",
								success: function(data) {
									insertIBIMS402HTr(paramData_402BH);
									resolve(data); //통신 성공하면 resolve()
								},
								error : function(request,status,error) {
									console.log(request+"\n",status,"\n",error, "\n")
									reject();  //통신 실패하면 reject()
								}
							});
						});
					}
					resolve(data); //통신 성공하면 resolve()
				},
				error : function (e) {
					console.log("data error !! :: " + e);
					reject();  //통신 실패하면 reject()
				}
			});
		});
	}

	function instBuyList(paramData) {
		// alert("111 instBuyList: "+ JSON.stringify(paramData));
		new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				url: "/TB07020S/saveBuyInfo",
				data: paramData,
				dataType: "json",
				//contentType: "application/json; charset=UTF-8",
				success: function(data) {
					resolve(data); //통신 성공하면 resolve()
				},
				error: function(error) {
					reject();  //통신 실패하면 reject()
				}
			});
		});
	}

	function instDlTrList(paramData) {
		// alert("222 instDlTrList: "+JSON.stringify(paramData));
		new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST"
			,url: "/TB07020S/saveDlTrList"
			,data: paramData
			,dataType: "json"
			//,contentType: "application/json; charset=UTF-8"
			,success: function(data) {
					resolve(data); //통신 성공하면 resolve()
			}
			,error: function(error) {
					reject();  //통신 실패하면 reject()
			}
			});
		});
	}

	function cancelBuyList(paramData) {
		//alert("instBuyList: "+ JSON.stringify(paramData));
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				url: "/TB07020S/cancelBuyInfo",
				data: paramData,
				dataType: "json",
				//contentType: "application/json; charset=UTF-8",
				success: function(data) {
					resolve(data); //통신 성공하면 resolve()
				},
				error: function(error) {
					reject();  //통신 실패하면 reject()
				}
			});
		});
	}

	function insertIBIMS402HTr(paramData) {
		// alert("666 insertIBIMS402HTr: "+ JSON.stringify(paramData));
		new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				url: "/TB07020S/insertIBIMS402HTr",
				data: paramData,
				dataType: "json",
				//contentType: "application/json; charset=UTF-8",
				success: function(data) {
					getBuyList();
					resolve(data); //통신 성공하면 resolve()
				},
				error: function(error) {
					reject();  //통신 실패하면 reject()
				}
			});
		});
	}

	// function updateDealHs(prdtCd){

	// 	new Promise(function(resolve, reject){
	// 		$.ajax({
	// 			type: "POST",
	// 			url: "/TB07020S/insertIBIMS402HTr",
	// 			data: paramData,
	// 			dataType: "json",
	// 			//contentType: "application/json; charset=UTF-8",
	// 			success: function(data) {
	// 				getBuyList();
	// 				resolve(data); //통신 성공하면 resolve()
	// 			},
	// 			error: function(error) {
	// 				reject();  //통신 실패하면 reject()
	// 			}
	// 		})
	// 	})

	// }

	// 검색조건 및 선택된 테이블 정보 초기화
	function compClear() {

		/**
		 * 손대기 귀찮아서 그냥 제가 만든 공통 한번 더 실행하겠습니다 태안씨 화이팅
		 * 인풋박스 초기화 공통
		 * 출처 common.js
		 * 
		 * 보니까 이거 먼저 쓰시고 안되는 부분 조금씩 수정하시면 될듯요
		 */
		resetInputValue($('div[data-menuid="/TB07020S"]'));

		/* 검색조건 */
		$('#TB07020S_rsltnDt').val('');
		$('#TB07020S_prdtCd').val('');
		$('#TB07020S_prdtNm').val('');

		/* 상세정보 */
		$('#TB07020S_trQnt').val('');
		$('#TB07020S_trDt').val('');
		$('#TB07020S_trSn').val('');
		$('#TB07020S_trUnpr').val('');
		$('#TB07020S_trAmt').val('0');
		// $('#TB07020S_dprtCd').val('');
		// $('#TB07020S_dprtNm').val('');
		$('#TB07020S_trdeExrt').val('');
		$('#TB07020S_fnltCd').val('');
		$('#TB07020S_fnltNm').val('');
		$('#TB07020S_fndCd').val('');
		$('#TB07020S_fndNm').val('');
		$('#TB07020S_trslAmt').val('');
		$('#TB07020S_stlAcno').val('');
		$('#TB07020S_input_prdtCd').val('');
		$('#TB07020S_input_prdtNm').val('');
		$('#TB07020S_prfdCorpIntx').val('0');
		// $('#TB07020S_empNo').val('');
		// $('#TB07020S_empNm').val('');
		$('#TB07020S_H002').val("0");
		$('#TB07020S_I027').val('KRW');
		//$('#TB07020S_trtx').val('');
		$('#TB07020S_ibPrdtTrDcd').val('1');
		$('#TB07020S_rfnDt').val('');
		$('#TB07020S_stdrExrt').val('0');
		$('#TB07020S_wholIssuShqt').val('0');
		$('#TB07020S_hldgShqt').val('0');
		$('#TB07020S_qotaRt').val('0');
		$('#TB07020S_eprzCrdlCtrcAmt').val('0');
		$('#TB07020S_krwTrslExcBlce').val('0');
		$('#TB07020S_avrUnpr').val('0');

		$('#TB07020S_dprtCd').val(loginUsrDprtCd);
		$('#TB07020S_dprtNm').val(loginUsrDprtNm);

		$('#TB07020S_empNo').val(loginUsrId);
		$('#TB07020S_empNm').val(loginUsrNm);
		g_qotaRt = 0;
		//g_holdPrpsDcd ='0';
		g_eprzCrdlCtrcAmt = 0;
		g_krwTrslExcBlce = 0;
		g_krwTrslExcAmt = 0;
		$('#TB07020S_evlPflsAmt').val('0');
		//$('#TB07020S_tradPflsAmt').val('0');
		// 선택된 row 초기화
		//$('#TB07020S_tableList tr').removeClass('table-active');
		$("#TB07020S_tableList").pqGrid("setData", []);


		let toggleBtn1 = document.querySelector('.toggleBtn1');
		toggleBtn1.click();
		//btnAdd();
	}

	// 매수정보 상세보기
	function getBuyDetail(rowData) {
		//alert(rowData.trCrcyCd);

		// var td = $(e).children();
		let toggleBtn1 = document.querySelector('.toggleBtn1');
		let toggleBtn2 = document.querySelector('.toggleBtn2');

		// 모든 행의 active 클래스 제거
		$('#TB07020S_tableList tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		//$(e).addClass('table-active');

		if ( $('.btn.btn-s.btn-info').text() === '등록' ) {
			toggleBtn2.click();
			$('#TB07020S_trSn').val('');
		}

		toggleBtn1.addEventListener('click', () => {
			$('#TB07020S_trSn').val('');
		})

		$('#TB07020S_trDt').val(rowData.trDt);

		if ( $('.btn.btn-s.btn-info').text() === '취소' ) {
			$('#TB07020S_trSn').val(rowData.trSn);
		}
		else
		{
			$('#TB07020S_trSn').val('');
		}

		var etprCrdtGrntTrKindCd = rowData.etprCrdtGrntTrKindCd;
		if (etprCrdtGrntTrKindCd === '81') {
			$('#TB07020S_ibPrdtTrDcd').val('1');
		} else {
			$('#TB07020S_ibPrdtTrDcd').val('2');
		}

		$('#TB07020S_fndCd').val(rowData.fndCd);
		$('#TB07020S_fndNm').val(rowData.fndNm);
		$('#TB07020S_input_prdtCd').val(rowData.prdtCd);
		$('#TB07020S_input_prdtNm').val(rowData.prdtNm);
		$('#TB07020S_holdPrpsNm').val(rowData.holdPrpsDcdNm);
		//$('#TB07020S_holdPrpsDcd').val(td.eq(18).text());
		g_holdPrpsDcd = rowData.holdPrpsDcd;
		$('#TB07020S_invstCrncyCd').val(rowData.trCrryCd);
		$('#TB07020S_trQnt').val(rowData.trQnt);
		$('#TB07020S_trUnpr').val(rowData.trUnpr);
		$('#TB07020S_trAmt').val(rowData.trAmt);
		$('#TB07020S_trdeExrt').val(rowData.trdeExrt);
		$('#TB07020S_trslAmt').val(rowData.trslAmt);
		$('#TB07020S_dprtCd').val(rowData.trDptCd);
		$('#TB07020S_dprtNm').val(rowData.trDptNm);
		$('#TB07020S_fnltCd').val(rowData.fnltCd);
		$('#TB07020S_fnltNm').val(rowData.fnltNm);
		$('#TB07020S_stlAcno').val(rowData.stlAcno);
		//$('#TB07020S_prfdCorpIntx').val(td.eq(15).text());
		$('#TB07020S_empNo').val(rowData.rqsEmpno);
		$('#TB07020S_empNm').val(rowData.rqsEmpNm);
		$('#TB07020S_H002').val(rowData.holdPrpsDcd);
		$('#TB07020S_I027').val(rowData.trCrryCd);
		//$('#TB07020S_trtx').val(td.eq(19).text());
		$('#TB07020S_rfnDt').val(rowData.rfnDt);
		$('#TB07020S_stdrExrt').val(rowData.stdrExrt);
		$('#TB07020S_excSn').val(rowData.excSn);
		$('#TB07020S_wholIssuShqt').val(rowData.wholIssuShqt);
		$('#TB07020S_hldgShqt').val(rowData.hldgShqt);
		$('#TB07020S_qotaRt').val(rowData.qotaRt);
		g_qotaRt = rowData.qotaRt;
		$('#TB07020S_evlPflsAmt').val(rowData.evlPflsAmt);
		//$('#TB07020S_tradPflsAmt').val(td.eq(32).text());
		$('#TB07020S_eprzCrdlCtrcAmt').val(rowData.tradPflsAmt);
		$('#TB07020S_krwTrslExcBlce').val(rowData.krwTrslExcBlce);
		//g_eprzCrdlCtrcAmt = td.eq(33).text();
		//console.log("11111111111111111111::"+td.eq(34).text())
		var strPrdtCd = rowData.prdtCd;
		g_krwTrslExcAmt = rowData.krwTrslExcAmt;
		$('#TB07020S_avrUnpr').val(rowData.avrUnpr);
		getEprzCrdlCtrcAmt(strPrdtCd);
	}

	function checkParam(paramData, inputDcd) {
		var option = {}
		option.title = "Error";
		option.type = "error";

		// 유효성검사
		if (inputDcd == '1') { // 등록
			// 거래부서
			if (isEmpty(paramData.trDptCd)) {
				option.text = "거래부서를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 운용펀드
			if (isEmpty(paramData.nsFndCd)) {
				option.text = "운용펀드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 종목코드
			if (isEmpty(paramData.prdtCd)) {
				option.text = "종목코드를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 보유목적
			if (isEmpty(paramData.holdPrpsDcd)) {
				option.text = "보유목적을 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 문서
			// 지분율
			if (isEmpty(paramData.qotaRt)) {
				option.text = "지분율을 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 평가손익금액
			// 매매손익금액
			// 주수
			if (isEmpty(paramData.trQnt)) {
				option.text = "주수를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 거래단가
			if (isEmpty(paramData.trUnpr)) {
				option.text = "거래단가를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 거래금액
			// 매매환율
			if (isEmpty(paramData.trdeExrt)) {
				option.text = "매매환율을 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 환산금액 기업여신약정금액
			if (isEmpty(g_eprzCrdlCtrcAmt) || g_eprzCrdlCtrcAmt ==0) {
				option.text = "해당종목의 약정을 확인하여 주십시오.";
				openPopup(option);
				return false;
			}
			// 매수가능금액
			if (isEmpty(g_krwTrslExcBlce) || g_krwTrslExcBlce ==0) {
				option.text = "매수가능금액을 확인하여 주십시오.";
				openPopup(option);
				return false;
			}

			//console.log("g_eprzCrdlCtrcAmt" + g_eprzCrdlCtrcAmt);
			// 환산금액 기업여신약정금액
			if (Number(g_krwTrslExcBlce) - Number(paramData.excalAmt) < 0 ) {
				var overAmt = Number(g_krwTrslExcBlce) - Number(paramData.excalAmt);
				//option.html = "거래금액(환산금액)이 약정금액을 초과하였습니다.<br> (초과금액:" + addComma(overAmt) + ")";
				//option.text = "거래금액(환산금액)이 약정금액을 초과하였습니다. \n(초과금액: ${addComma(Math.abs(overAmt))});
				Swal.fire({
							icon              : 'error'
							, title             : "Error!"
							, html              : "거래금액(환산금액)이 약정금액을 초과하였습니다.<br> (초과금액:" + addComma(Math.abs(overAmt)) + ")"
							, confirmButtonText : "확인"
						});
				//openPopup(option);
				return false;
			}

			// 선급법인세
			// if (isEmpty(paramData.prfdCorpIntx)) {
			// 	option.text = "선급법인세를 입력해주세요.";
			// 	openPopup(option);
			// 	return false;
			// }
			// 통화코드
			// 하위구분
			// FVOCI지정사유
			// 전체발행좌수
			// if (isEmpty(paramData.wholIssuShqt)) {
			// 	option.text = "전체발행좌수를 입력해주세요.";
			// 	openPopup(option);
			// 	return false;
			// }
			// 보유좌수
			// if (isEmpty(paramData.hldgShqt)) {
			// 	option.text = "보유좌수를 입력해주세요.";
			// 	openPopup(option);
			// 	return false;
			// }
			// 증권보관
			// 배당일자
			// 결제은행
			if (isEmpty(paramData.stlXtnlIsttCd)) {
				option.text = "결제은행을 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 결제계좌
			if (isEmpty(paramData.stlAcno)) {
				option.text = "결제계좌를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 담당자
			if (isEmpty(paramData.rqsEmpno)) {
				option.text = "담당자를 입력해주세요.";
				openPopup(option);
				return false;
			}
			// 거래세
			// if (isEmpty(paramData.trtx)) {
			// 	option.text = "거래세를 입력해주세요.";
			// 	openPopup(option);
			// 	return false;
			// }
			// 기준환율
		}
		else { // 취소
			// 거래일련번호
			if (isEmpty(paramData.trSn)) {
				option.text = "거래일련번호를 입력해주세요.";
				openPopup(option);
				return false;
			}
		}

		return true;
	}



	// 거래금액 계산
	function calcTrAmt() {
		if( isNotEmpty($('#TB07020S_trQnt').val()
		&&  isNotEmpty($('#TB07020S_trUnpr').val())) ) {
			$('#TB07020S_trAmt').val(addComma(Number($('#TB07020S_trQnt').val().replaceAll(',', '')) * Number($('#TB07020S_trUnpr').val().replaceAll(',', ''))));
			if(Number($('#TB07020S_avrUnpr').val().replaceAll(',', '')) > 0 ) {
				//$('#TB07020S_evlPflsAmt').val(addComma(Number(g_krwTrslExcAmt) - (Number($('#TB07020S_trQnt').val().replaceAll(',', '')) * Number($('#TB07020S_avrUnpr').val().replaceAll(',', '')))));
				$('#TB07020S_evlPflsAmt').val(addComma(((Number($('#TB07020S_trQnt').val().replaceAll(',', '')) * Number($('#TB07020S_avrUnpr').val().replaceAll(',', '')))-(Number($('#TB07020S_trQnt').val().replaceAll(',', '')) * Number($('#TB07020S_trUnpr').val().replaceAll(',', '')))).toFixed(2)));
			}
		}
		if( isNotEmpty($('#TB07020S_trQnt').val()) ) {
			var qotaRt = (((Number($('#TB07020S_hldgShqt').val().replaceAll(',', '')) + Number($('#TB07020S_trQnt').val().replaceAll(',', ''))) / Number($('#TB07020S_wholIssuShqt').val().replaceAll(',', ''))) * 100).toFixed(8);

			if(!isFinite(qotaRt)){
				$('#TB07020S_qotaRt').val("0");
			}else{
				$('#TB07020S_qotaRt').val(qotaRt);
			}


		}
		else {
			$('#TB07020S_qotaRt').val((((Number($('#TB07020S_hldgShqt').val().replaceAll(',', ''))) / Number($('#TB07020S_wholIssuShqt').val().replaceAll(',', ''))) * 100).toFixed(8));
		}
		setHoldPrpsDcd();
		// if( isNotEmpty($('#TB07020S_trQnt').val())) {
		// 	$('#TB07020S_hldgShqt').val(addComma(Number($('#TB07020S_trQnt').val().replaceAll(',', '')).add(Number($('#TB07020S_hldgShqt').val().replaceAll(',', '')))));
		// }
	}

	// 환산금액 계산
	function calcTrslAmt() {
		if( isNotEmpty($('#TB07020S_trAmt').val()
		&&  isNotEmpty($('#TB07020S_trdeExrt').val())) ) {
			$('#TB07020S_trslAmt').val(addComma(Number($('#TB07020S_trAmt').val().replaceAll(',', '')) * Number($('#TB07020S_trdeExrt').val().replaceAll(',', ''))));
		}
	}

	// 보유좌수
	function calcHldgShqt() {
		if( isNotEmpty($('#TB07020S_trQnt').val())) {
			$('#TB07020S_hldgShqt').val(addComma(Number($('#TB07020S_trQnt').val().replaceAll(',', '')) + Number($('#TB07020S_hldgShqt').val().replaceAll(',', ''))));
		}
	}

	/**
	*  yyyyMMdd 포맷으로 반환
	*/
	function getFormatDate(date) {
		var year = date.getFullYear();              //yyyy
		var month = (1 + date.getMonth());          //M
		month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
		var day = date.getDate();                   //d
		day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
		return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	}

	function btnAdd() {
		$('#TB07020S_trQnt').val('');
		$('#TB07020S_trUnpr').val('');
		$('#TB07020S_trAmt').val('');
		$('#TB07020S_trslAmt').val('0');
		//$('#TB07020S_qotaRt').val('');ㄴㄹㅇㄹ
		$('#TB07020S_trQnt').attr('readonly', false);
		$('#TB07020S_trUnpr').attr('readonly', false);
		$('#TB07020S_trdeExrt').attr('readonly', false);
		$('#TB07020S_dprtCd').attr('readonly', false);
		$('#TB07020S_fndCd').attr('readonly', false);
		$('#TB07020S_input_prdtCd').attr('readonly', false);
		$('#TB07020S_H002').attr('readonly', false);
		//$('#TB07020S_qotaRt').attr('readonly', false);
		$('#TB07020S_fnltCd').attr('readonly', false);
		$('#TB07020S_stlAcno').attr('readonly', false);
		$('#TB07020S_empNo').attr('readonly', false);
		$('#TB07020S_btnDprtCd').attr('disabled', false);
		$('#TB07020S_btnFnd').attr('disabled', false);
		$('#TB07020S_btnPrdtCd').attr('disabled', false);
		$('#TB07020S_btnFnltCd').attr('disabled', false);
		$('#TB07020S_btnEmpNo').attr('disabled', false);
		//$('#TB07020S_H002').attr('disabled', false);
		// if (isNotEmpty(g_holdPrpsDcd)) {
		// 	$('#TB07020S_H002').val(g_holdPrpsDcd);
		// }

		// if (isNotEmpty(g_qotaRt)) {
		// 	$('#TB07020S_qotaRt').val(g_qotaRt);
		// }
	}

	function btnCancel() {
		$('#TB07020S_trQnt').attr('readonly', true);
		$('#TB07020S_trUnpr').attr('readonly', true);
		$('#TB07020S_trdeExrt').attr('readonly', true);
		$('#TB07020S_dprtCd').attr('readonly', true);
		$('#TB07020S_fndCd').attr('readonly', true);
		$('#TB07020S_input_prdtCd').attr('readonly', true);
		$('#TB07020S_H002').attr('readonly', true);
		//$('#TB07020S_qotaRt').attr('readonly', true);
		$('#TB07020S_fnltCd').attr('readonly', true);
		$('#TB07020S_stlAcno').attr('readonly', true);
		$('#TB07020S_empNo').attr('readonly', true);
		$('#TB07020S_btnDprtCd').attr('disabled', true);
		$('#TB07020S_btnFnd').attr('disabled', true);
		$('#TB07020S_btnPrdtCd').attr('disabled', true);
		$('#TB07020S_btnFnltCd').attr('disabled', true);
		$('#TB07020S_btnEmpNo').attr('disabled', true);
		if (isNotEmpty(g_holdPrpsDcd)) {
			$('#TB07020S_H002').val(g_holdPrpsDcd);
		}

		if (isNotEmpty(g_qotaRt)) {
			$('#TB07020S_qotaRt').val(g_qotaRt);
		}
		//$('#TB07020S_H002').attr('disabled', true);
	}

	function getPrdtInfo() {
		$('#TB07020S_trdeExrt').val($('#TB07020S_stdrExrt').val());
	}

	function setHoldPrpsDcd() {
		if( isNotEmpty($('#TB07020S_qotaRt').val())) {
			if(Number($('#TB07020S_qotaRt').val().replaceAll(',', '')) != 0 ) {
				if (Number($('#TB07020S_qotaRt').val().replaceAll(',', '')) >= 30) {
					$('#TB07020S_H002').val('6');
				}
				else {
					if (isNotEmpty(g_holdPrpsDcd)) {
						$('#TB07020S_H002').val(g_holdPrpsDcd);
					}
				}
			} else {
				if (isNotEmpty(g_holdPrpsDcd)) {
					$('#TB07020S_H002').val(g_holdPrpsDcd);
				}
			}
		}
	}

	/**
	 * 엑셀저장 PQGrid ExcelExport
	 */
	 function saveExcelFile() {
		let blob = $('#TB07020S_tableList').pqGrid('instance').exportExcel({});
		let fileName;
		fileName = "테스트 그만하고 집에 보내줘요.xlsx";
		pq.saveAs(blob, fileName);
	}

	return {
		/**
		 * 사용 할 함수 정의
		 */
		getBuyList : getBuyList
	,	compClear : compClear
    ,   btnAdd : btnAdd
	,	btnCancel : btnCancel
	,	setHoldPrpsDcd : setHoldPrpsDcd
	,	calcTrslAmt : calcTrslAmt
	,	showAlert : showAlert
	,	calcTrAmt : calcTrAmt
	,	saveExcelFile : saveExcelFile 	// 엑셀 저장 함수
	}

})();