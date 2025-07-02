const TB08031Sjs = (function() {
	let bsnsPartInfoInstance;         //사업참가자정보 instance
	let bsnsForecastInstance;         //사업주요전망 instance
	let bondProtInfoInstance;         //채권보전주요약정 instance
	let cchInfoInstance;              //조견변경이력 instance
	let stlnInfoInstance;             //대주단정보 instance
	let ernInfoInstance;              //수익자정보 instance
	let loanBanoInfoInstance;         //투자자산계좌(종목)정보 - 대출계좌 instance
	let ernSctyInfoInstance;          //투자자산계좌(종목)정보 - 수익증권 instance
	let udwrtPaiBzscalInfoInstance;   //인수대상 기업정보 instance
	let busiInfoInstance;             //관련사업정보 instance
	let admsAsstInfoInstance;         //편입자산정보 instance
	let invstBzscalInstance;          //투자기업목록 instance
	let asstWrkngInfoInstance;        //자산운용사정보 instance

	let selectBoxList_TB08031S;
	let p001List;
	let b007List;
	let i051List;
	let i038List;
	let e016List;


	/* 편집자산 정보 colM  todo: id없음....*/

	$(document).ready(function() {
		loadInvbnkAmnBzCd(); // 사업구분 정보
		loadSelectBoxContents();
		btnDisabled(true);

		/**
		 * maxlength 지정
		 */
		let columns = {
			// 사업 기본정보
			bondProt: 2 // 주요채권보전
			, rvwStRsn: 200 // 검토중단사유내용
			, bsnsCntnt: 1500 // 사업내용

			// 사업 상세정보
			// 사업정보
			, busiArea: 300 // 사업장위치
			, fcltScal: 50 // 시설규모
			, resiEco: 300 // 주거환경
			, crdtEhcmntCntnt: 100 // 신용보관내용
			, bsnsScal: 150 // 사업규모
			, leadAgency: 250// 주무관청
			, bzplAddr: 300// 사업장위치
			, spon: 1000// 스폰서
			, mrtg: 1000 // 담보
			, brwrNtnNm: 100 // 차주국가명
			, hostCountry: 100 // 소재국
			, ensrYn: 100 // 보증여부/보증기관
			, amSt: 100 // 기종/선종
			, proEprz: 100 // 제작사
			, proYr: 4 // 제조년도
			, lseMgco: 150 // 리스운용사
			, lseUser: 150 // 리스이용자
			, invstGuidelines: 1500 // 투자가이드라인

			// 사업참가자정보
			, partCorpNm: 200 // 업체명
			, dtlsCorpNo: 13 // 법인등록번호
			, bsnsRgstNo: 10 // 사업자등록번호
			, rprstPNm: 200 // 대표자명

			// 사업주요전망
			, mainCntnt: 4000 // 주요일정내용

			// 채권보전주요약정
			, dtlsCntnt: 4000 // 상세내용

			// 조건변경이력
			, cndtMainCntnt: 2000 // 주요내용
			, handlerID: 100 // 취급자개인번호
			, rcgDocNo: 100 // 승인문서번호

			// 대주단정보
			, mCorpNm: 200 // 기관명

			// 수익자정보
			, ernCorpNm: 200 // 기관명

			// 투자기업목록
			, fndNm: 200 // 펀드명
			, bsnmNo: 100 // 사업자등록번호
			, bcncNm: 300 // 거래상대방명
			, invstBzscalCorpNo: 13 // 법인등록번호
			, indTypNm: 100 // 업종명
			, blgtCntyNm: 100 // 소속국가명

			// 편입자산정보
			, admsAsstNm: 100 // 편입자산명
		}
		limitInputLength(columns, "TB08031S");

		let columns2 = {
			// 자산운용사정보
			ardyBzepNo: 13
			, crno: 13 // 법인등록번호
			, rnbn: 10 // 사업자번호
			, oprtHnfNum: 4 // 운용인력수
			, stffNum: 4 // 직원수
		}

		limitInputLength(columns2, "TB08031S_asstWrkngInfo");


		selectorNumberFormater(
			$(
				`
          #TB08031S_prcrAmt
          , #TB08031S_thcoRlAmt
          , #TB08031S_thcoPtnAmt
          , #TB08031S_BitrKindCdInput
          , #TB08031S_busiSiteSqms
          , #TB08031S_busiSiteAcre
          , #TB08031S_Sqms
          , #TB08031S_SqmsP
          , #TB08031S_invstAmt
          , #TB08031S_equity
          , #TB08031S_priLoan
          , #TB08031S_subLoan
          , #TB08031S_cerkRto
          , #TB08031S_mAgrAmt
          , #TB08031S_ernAgrAmt
          , #TB08031S_busiPrcrAmt
          , #TB08031S_busiPtnAmt
          , #TB08031S_acqstAmt
          , #TB08031S_coAmt
          , #TB08031S_admsAmt
        `
			)
		);

		maskRt(
			`
        #TB08031S_BitrKindCdInput
        , #TB08031S_preRt
        , #TB08031S_tgtRvn
        , #TB08031S_arRt
        , #TB08031S_far
        , #TB08031S_prorRto
        , #TB08031S_cerkRto
        , #TB08031S_bkbnRto
        , #TB08031S_mPartRt
        , #TB08031S_ernPartRt
        , #TB08031S_invstWeight
        , #TB08031S_insRvn
      `
		)

	});


	//담당자 초기값 지정
	function setLoginUserAuth() {

		var usrNm = $('#userEmpNm').val();
		var usrEno = $('#userEno').val();
		var usrDprtCd = $('#userDprtCd').val();

		$('#TB08031S_charge_empNo').val(usrEno);
		$('#TB08031S_charge_empNm').val(usrNm);
		$('#TB08031S_D010').val(usrDprtCd);
	}


	function loadSelectBoxContents() {
		var item = "";
		item += "I011"; // 진행상태
		item += "/" + "I027"; // 통화코드
		item += "/" + "C012"; // 신용등급
		item += "/" + "I021"; // 사업구분상세
		item += "/" + "T002"; // 당사주선구분
		item += "/" + "I033"; // 금리구분코드
		item += "/" + "S003"; // 기준금리
		item += "/" + "D010"; // 업무팀
		item += "/" + "C014"; // 시행주체구분
		item += "/" + "B011"; // 사업지역
		item += "/" + "B019"; // 기업규모구분
		item += "/" + "C010"; // 신용보강
		item += "/" + "P001"; // 참가자관계
		item += "/" + "B007"; // 채권보전구분
		item += "/" + "I051"; // 투자금융대주구분코드
		item += "/" + "B013"; // 사업방식
		item += "/" + "B012"; // 사업수주구분
		item += "/" + "U002"; // 상환방식
		item += "/" + "U001"; // 인수사업구분
		item += "/" + "I038"; // 투자유형
		item += "/" + "T005"; // 대상자산구분
		item += "/" + "L006"; // 리스종류
		item += "/" + "F009"; // 펀드구분
		item += "/" + "F010"; // 펀드유형상세
		item += "/" + "E016";

		selectBoxList_TB08031S = getSelectBoxList("TB08031S", item, false);

		p001List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "P001");
		b007List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "B007");
		i051List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "I051");
		i038List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "I038");
		e016List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "E016");

		setGrid_TB08031S();

		setLoginUserAuth();

	}


	function btnReset() {

		bizInfoClear();
		bizDetailClear();
		bizTabClear();
		btnDisabled(true);

	}

	function btnDisabled(flag) {

		$(".savebt").prop("disabled", flag);
		$(".delbt").prop("disabled", flag);
	}

	function bizInfoClear() {
		$("#selectedDealSq").val('');
		$("#TB08031S_ibDealNo").val('');
		$("#TB08031S_ibDealNm").val('');
		$("#TB08031S_sn").val('');

		$("#TB08031S_corpNo").val('');             // 법인등록번호
		$("#TB08031S_corpNm").val('');           // 업체명
		$("#TB08031S_bsnsNm").val('');           // 사업명
		$('#TB08031S_C012').val('');					// 신용등급
		$('#TB08031S_bsnsLoan').val('');				            // 사업대출잔액
		$('#TB08031S_coValDt').val('');						          // 평가유효기일
		$('#TB08031S_fnMdfyDt').val('');					          // 최종수정일자

	}

	function bizDetailClear() {

		$("#TB08031S_invbnkAmnBzCd option:eq(0)").prop("selected", true);
		$("#TB08031S_I011 option:eq(0)").prop("selected", true);
		$("#TB08031S_I033 option:eq(0)").prop("selected", true);
		$("#TB08031S_S003 option:eq(0)").prop("selected", true);
		$("#TB08031S_T002 option:eq(0)").prop("selected", true);


		$("#TB08031S_I021").val('');                 //사업구분 상세
		$("#TB08031S_bondProt").val('');                 //주요채권보전내용
		$("#TB08031S_rvwStRsn").val('');                  //검토중단사유
		$("#bsnsCntnt").val('');                                 //사업내용
		$("#TB08031S_rm_empNo").val('');                          //담당RM사번
		$("#TB08031S_rm_empNm").val('');                          //담당RM명

		$("#TB08031S_prcrAmt").val(0);                        //총조달금액
		$("#TB08031S_thcoRlAmt").val(0);                     //당사주선금액
		$("#TB08031S_thcoPtnAmt").val(0);                    //당사참여금액
		$("#TB08031S_BitrKindCdInput").val(0);                 //기준금리
		$("#TB08031S_preRt").val(0);                            //가산금리
		$("#TB08031S_tgtRvn").val(0);                          //목표수익률

		tabCtrl("invbnkAmnBzCd");

	}

	function bizTabClear() {

		TB08031Sjs.gridInfoRst('All');

		for (var i = 0; i <= 4; i++) {
			
			console.log("#TB08031S_tab-" + i)
			$("#TB08031S_tab-" + i).find("input[type=text]").each(function(index, item) {
				$(item).val('');
			})
			
			$("#TB08031S_tab-" + i).find("textarea").each(function(index, item) {
				$(item).val('');
			})

			$("#TB08031S_tab-" + i).find("select").each(function(index, item) {
				$("#" + $(item).attr("id") + " option:eq(0)").prop("selected", true);
			})

			$("#TB08031S_tab-" + i).find("input[type=radio]").each(function(index, item) {
				if ($(item).val() == 'N') {
					$(item).prop("checked", true);
				}
			})

		}


	}



	function setGridTimeOut(e) {

		if (e === "bsnsPartInfo") {
			setTimeout(() => bsnsPartInfoInstance.refresh(), 1);
		} else if (e === "bsnsForecast") {
			setTimeout(() => bsnsForecastInstance.refresh(), 1);
		} else if (e === "bondProtInfo") {
			setTimeout(() => bondProtInfoInstance.refresh(), 1);
		} else if (e === "cchInfo") {
			setTimeout(() => cchInfoInstance.refresh(), 1);
		} else if (e === "stlnInfo") {
			setTimeout(() => stlnInfoInstance.refresh(), 1);
		} else if (e === "ernInfo") {
			setTimeout(() => ernInfoInstance.refresh(), 1);
		} else if (e === "loanBanoInfo") {
			setTimeout(() => loanBanoInfoInstance.refresh(), 1);
			setTimeout(() => ernSctyInfoInstance.refresh(), 1);
		} else if (e === "udwrtPaiBzscalInfo") {
			setTimeout(() => udwrtPaiBzscalInfoInstance.refresh(), 1);
		} else if (e === "busiInfo") {
			setTimeout(() => busiInfoInstance.refresh(), 1);
		} else if (e === "admsAsstInfo") {
			setTimeout(() => admsAsstInfoInstance.refresh(), 1);
		} else if (e === "invstBzscalList") {
			setTimeout(() => invstBzscalInstance.refresh(), 1);
		} else if (e === "asstWrkngInfo") {
			setTimeout(() => asstWrkngInfoInstance.refresh(), 1);
		}

	}

	//pqGrid setting...
	function setGrid_TB08031S() {

		/* 사업참가자정보 colM */
		let colM_bsnsPartInfo = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "참가자관계",
				dataType: "string",
				dataIndx: "ptcnRelrDcd",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: p001List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = p001List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				title: "업체명",
				dataType: "string",
				dataIndx: "entpNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "대표자명",
				dataType: "string",
				dataIndx: "rpsrNm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "법인등록번호",
				dataType: "string",
				dataIndx: "crno",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "사업자등록번호",
				dataType: "string",
				dataIndx: "bzno",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			}
		];

		/* 사업 주요전망 colM */
		let colM_bsnsForecast = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "예정일자",
				dataType: "string",
				dataIndx: "prarDt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "이행일자",
				dataType: "string",
				dataIndx: "flflDt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},

			},
			{
				dataIndx: "flflYn",
				title: "이행여부",
				dataType: "string",
				align: "center",
				halign: "center",
				width: "",
				editor: {
					type: "select",
					options: [
						{ value: "Y", label: "이행" },
						{ value: "N", label: "불이행" }
					],
					valueIndx: "value",
					labelIndx: "label"
				},
				render: function(ui) {
					return ui.cellData === "Y" ? "이행" : "불이행";
				}
			},
			{
				title: "주요일정내용",
				dataType: "string",
				dataIndx: "mainScxCtns",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			}

		];

		/* 채권보전 주요약정 colM */
		let colM_bondProtInfo = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "채권보전구분",
				dataType: "string",
				dataIndx: "bondProtCcd",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: b007List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = b007List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				dataIndx: "fnnrCtrcMttrTrgtYn",
				title: "이행여부",
				dataType: "string",
				align: "center",
				halign: "center",
				width: "",
				editor: {
					type: "select",
					options: [
						{ value: "Y", label: "이행" },
						{ value: "N", label: "불이행" }
					],
					valueIndx: "value",
					labelIndx: "label"
				},
				render: function(ui) {
					return ui.cellData === "Y" ? "이행" : "불이행";
				}
			},
			{
				title: "상세내용",
				dataType: "string",
				dataIndx: "mainCtrcMttrCnts",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			}

		];

		/* 조건변경내역 colM */
		let colM_cchInfo = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					return ui.rowIndx + 1;
				},
			},
			{
				title: "승인일자",
				dataType: "string",
				dataIndx: "apvlDt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "승인문서번호",
				dataType: "string",
				dataIndx: "cndChngDcmNoCnts",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "주요내용",
				dataType: "string",
				dataIndx: "cndChngMainCnts",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "취급자",
				dataType: "string",
				dataIndx: "prcsrEmpnm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "취급자 개인번호",
				dataType: "string",
				dataIndx: "prcsrTelNo",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "시행일자",
				dataType: "string",
				dataIndx: "crotDt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				dataType: "string",
				dataIndx: "prcsrEmpno",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			}
		];

		/* 대주단정보 colM */
		let colM_stlnInfo = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					return ui.rowIndx + 1;
				},
			},
			{
				title: "구분",
				dataType: "string",
				dataIndx: "ibStlnDcd",
				align: "left",
				halign: "center",
				width: "",
				// filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: i051List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = i051List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				title: "기관명",
				dataType: "string",
				dataIndx: "entpNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "약정금액",
				dataType: "string",
				dataIndx: "crdtProvLmtAmt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "참가비율(%)",
				dataType: "string",
				dataIndx: "prtcRto",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "erlmSeq",
				hidden: true
			}
		];

		/* 수익자정보 colM */
		let colM_ernInfo = [
			{
				title: "구분",
				dataType: "string",
				dataIndx: "ibStlnDcd",
				align: "center",
				halign: "center",
				width: "",
				// filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: i051List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = i051List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				title: "기관명",
				dataType: "string",
				dataIndx: "entpNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "약정금액",
				dataType: "string",
				dataIndx: "crdtProvLmtAmt",
				align: "right",
				halign: "center",
				format: "#,###",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "참가비율(%)",
				dataType: "string",
				dataIndx: "prtcRto",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "erlmSeq",
				hidden: true
			}
		];

		/* 투자자산계좌(종목)정보 - 기업여신 colM */
		let colM_loanBanoInfo = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "진행상태",
				dataType: "string",
				dataIndx: "eprzCrdlLdgSttsCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: e016List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = e016List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				title: "약정금액",
				dataType: "string",
				dataIndx: "eprzCrdlCtrcAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
			{
				title: "대출금액",
				dataType: "string",
				dataIndx: "dealExcAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
		];

		/* 투자자산계좌(종목)정보 - 수익증권 colM */
		let colM_ernSctyInfo = [
			{
				title: "종목코드",
				dataType: "string",
				dataIndx: "prdtCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "종목명",
				dataType: "string",
				dataIndx: "prdtNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "유가증권분류",
				dataType: "string",
				dataIndx: "prdtClsfCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "펀드유형상세",
				dataType: "string",
				dataIndx: "ortnFndCd",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "액면(주수)",
				dataType: "string",
				dataIndx: "buyShqt",
				align: "rigth",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
			{
				title: "기말장부단가",
				dataType: "string",
				dataIndx: "acbkAmt",
				align: "rigth",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
			{
				title: "취득액",
				dataType: "string",
				dataIndx: "avrUnpr",
				align: "rigth",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
		];

		/*인수대상 기업정보 colM*/
		let colM_udwrtPaiBzscalInfo = [
			{
				dataIndx: "isChked",
				maxWidth: 60,
				minWidth: 60,
				align: "center",
				resizable: false,
				title: "선택",
				type: "checkBoxSelection",
				sortable: false,
				editor: false,
				dataType: "bool",
				editable: "true",
				cb: {
					all: false,
					header: false,
				},
			},
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "center",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					return ui.rowIndx + 1;
				},
			},
			{
				title: "사업자등록번호",
				dataType: "string",
				dataIndx: "bzno",
				editable: true,
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "기업명",
				dataType: "string",
				dataIndx: "eprzNm",
				editable: true,
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "총주식수",
				dataType: "string",
				dataIndx: "holdStkQnt",
				editable: true,
				align: "right",
				halign: "center",
				format: "#,###",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataIndx: "stkLstYn",
				title: "주식상장여부",
				dataType: "string",
				editable: true,
				align: "center",
				halign: "center",
				width: "",
				editor: {
					type: "select",
					options: [
						{ value: "Y", label: "상장" },
						{ value: "N", label: "비상장" }
					],
					valueIndx: "value",
					labelIndx: "label"
				},
				render: function(ui) {
					return ui.cellData === "Y" ? "상장" : "비상장";
				}
			},
			{
				dataIndx: "mngRghEnsuYn",
				title: "경영권확보여부",
				dataType: "string",
				editable: true,
				align: "center",
				halign: "center",
				width: "",
				editor: {
					type: "select",
					options: [
						{ value: "Y", label: "확보" },
						{ value: "N", label: "미확보" }
					],
					valueIndx: "value",
					labelIndx: "label"
				},
				render: function(ui) {
					return ui.cellData === "Y" ? "확보" : "미확보";
				}
			},
		]

		/* 관련사업정보 colM */
		let colM_busiInfo = [
			// {
			//   dataIndx: "isChked",
			//   maxWidth: 60,
			//   minWidth: 60,
			//   align: "center",
			//   resizable: false,
			//   title: "선택",
			//   type: "checkBoxSelection",
			//   sortable: false,
			//   editor: false,
			//   dataType: "bool",
			//   editable: "true",
			//   cb: {
			//     all: false,
			//     header: false,
			//   },
			// },
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "right",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
				// render: function (ui) {
				//   return ui.rowIndx + 1;
				// },
			},
			{
				title: "사업관리번호",
				dataType: "string",
				dataIndx: "reltDealNo",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "사업명",
				dataType: "string",
				dataIndx: "dealNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "총조달금액",
				dataType: "string",
				dataIndx: "allInvAmt",
				align: "right",
				halign: "center",
				format: "#,###",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "당사참여확정여부",
				dataType: "string",
				dataIndx: "thcoRlDcd",
				align: "center",
				halign: "center",
				width: "",
				// filter: { crules: [{ condition: "range" }] },
				editor: {
					type: "select",
					options: [
						{ value: "Y", label: "확정" },
						{ value: "N", label: "미확정" }
					],
					valueIndx: "value",
					labelIndx: "label"
				},
				render: function(ui) {
					return ui.cellData === "Y" ? "확정" : "미확정";
				}
			},
			{
				title: "당사참여금액",
				dataType: "string",
				dataIndx: "thcoPtciAmt",
				align: "right",
				halign: "center",
				format: "#,###",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			}
		]

		/* 편입자산정보 colM */
		let colM_admsAsstInfo = [
			{
				title: "투자유형",
				dataType: "string",
				dataIndx: "invFnnInvTyDcd",
				align: "center",
				halign: "center",
				width: "",
				editor: {
					type: "select",
					valueIndx: "cdValue",
					labelIndx: "cdName",
					options: i038List,
				},
				render: function(ui) {
					// console.log("cellData ::: ", ui.cellData);
					// console.log(P013);
					let paiTypCd = i038List.find(({ cdValue }) => cdValue == ui.cellData);
					return paiTypCd ? paiTypCd.cdName : ui.cellData;
				},
			},
			{
				title: "편입금액",
				dataType: "string",
				dataIndx: "admsAsstAcbkAcqAmt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				format: "#,###"
			},
			{
				title: "수익율",
				dataType: "string",
				dataIndx: "admsAsstGrntErnRt",
				align: "right",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "편입자산명",
				dataType: "string",
				dataIndx: "admsAsstItmNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			},
			{
				dataType: "erlmSeq",
				dataIndx: "sn",
				hidden: true
			}
		]

		/* 투자기업목록 colM */
		let colM_invstBzscalList = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "right",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "기준년월",
				dataType: "string",
				dataIndx: "stdrYm",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 6) {
						return cellData.replace(/^(\d{4})(\d{2})$/, "$1-$2");
					} else {
						return cellData;
					}
				},
			},
			{
				title: "펀드명",
				dataType: "string",
				dataIndx: "fndNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "법인등록번호",
				dataType: "string",
				dataIndx: "crno",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "거래상대방명",
				dataType: "string",
				dataIndx: "trOthrNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "사업자번호",
				dataType: "string",
				dataIndx: "bzno",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "업종",
				dataType: "string",
				dataIndx: "bztpNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "ntnNm",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "fndDcd",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "sctsFndTpDcd",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "pchsDt",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "dealAmt",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "bkpr",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "asesBal",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "intlErnRt",
				hidden: true
			},
		]

		/* 자산운용사정보 colM */
		let colM_asstWrkngInfo = [
			{
				title: "NO",
				dataType: "string",
				dataIndx: "erlmSeq",
				align: "right",
				halign: "center",
				width: "",
				maxWidth: 60,
				minWidth: 60,
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					return ui.rowIndx + 1;
				},
			},
			{
				title: "운용사관리번호",
				dataType: "string",
				dataIndx: "mgcoMngmNo",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "사업자번호",
				dataType: "string",
				dataIndx: "rnbn",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "운용사명",
				dataType: "string",
				dataIndx: "entpNm",
				align: "left",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
			},
			// {
			//   title: "대표자명",
			//   dataType: "string",
			//   dataIndx: "",
			//   align: "center",
			//   halign: "center",
			//   width: "",
			//   filter: { crules: [{ condition: "range" }] },
			// },
			{
				title: "설립일",
				dataType: "string",
				dataIndx: "estDt",
				align: "center",
				halign: "center",
				width: "",
				filter: { crules: [{ condition: "range" }] },
				render: function(ui) {
					let cellData = ui.cellData;
					if (!isEmpty(cellData) && cellData.length === 8) {
						return formatDate(cellData);
					} else {
						return cellData;
					}
				},
			},
			{
				title: "임직원수",
				dataType: "string",
				dataIndx: "stffNum",
				align: "right",
				halign: "center",
				width: "",
				format: "#,###",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "운용인력수",
				dataType: "string",
				dataIndx: "oprtHnfNum",
				align: "right",
				halign: "center",
				width: "",
				format: "#,###",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				dataType: "string",
				dataIndx: "sn",
				hidden: true
			},
		]


		let pqGridObjs = [
			//사업참가자정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_bsnsPartInfo",
				colModel: colM_bsnsPartInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_bsnsPartInfo");
					gridInfoSett(ui.rowData, "bsnsPartInfoInstance");
				}
			},
			//사업주요전망 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_bsnsForecast",
				colModel: colM_bsnsForecast,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_bsnsForecast");
					gridInfoSett(ui.rowData, "bsnsForecastInstance");
				}
			},
			//채권보전주요약정 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_bondProtInfo",
				colModel: colM_bondProtInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_bondProtInfo");
					gridInfoSett(ui.rowData, "bondProtInfoInstance");
				}
			},
			//조건변경이력 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_cchInfo",
				colModel: colM_cchInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_cchInfo");
					gridInfoSett(ui.rowData, "cchInfoInstance");
				}
			},
			//대주단정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_stlnInfo",
				colModel: colM_stlnInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_stlnInfo");
					gridInfoSett(ui.rowData, "stlnInfoInstance");
				}
			},
			//수익자정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_ernInfo",
				colModel: colM_ernInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_ernInfo");
					gridInfoSett(ui.rowData, "ernInfoInstance");
				}
			},
			//투자자산 계좌정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_loanBanoInfo",
				colModel: colM_loanBanoInfo
			},
			//투자자산 종목정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_ernSctyInfo",
				colModel: colM_ernSctyInfo
			},
			//인수대상 기업정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_udwrtPaiBzscalInfo",
				colModel: colM_udwrtPaiBzscalInfo
			},
			//관련사업정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_busiInfo",
				colModel: colM_busiInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_busiInfo");
					gridInfoSett(ui.rowData, "busiInfoInstance");
				}
			},
			//편입자산정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_admsAsstInfo",
				colModel: colM_admsAsstInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_admsAsstInfo");
					gridInfoSett(ui.rowData, "admsAsstInfoInstance");
				}
			},
			//투자기업목록 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_invstBzscalList",
				colModel: colM_invstBzscalList,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_invstBzscalList");
					gridInfoSett(ui.rowData, "invstBzscalInstance");
				}
			},
			//자산운용사정보 그리드
			{
				height: 80,
				maxHeight: 300,
				id: "TB08031S_asstWrkngInfo",
				colModel: colM_asstWrkngInfo,
				rowClick: function(evt, ui) {
					pqGridSelectHandler(ui.rowIndx, "TB08031S_asstWrkngInfo");
					gridInfoSett(ui.rowData, "asstWrkngInfoInstance");
				}
			},
		]



		setPqGrid(pqGridObjs);

		bsnsPartInfoInstance = $("#TB08031S_bsnsPartInfo").pqGrid("instance");
		bsnsForecastInstance = $("#TB08031S_bsnsForecast").pqGrid("instance");
		bondProtInfoInstance = $("#TB08031S_bondProtInfo").pqGrid("instance");
		cchInfoInstance = $("#TB08031S_cchInfo").pqGrid("instance");
		stlnInfoInstance = $("#TB08031S_stlnInfo").pqGrid("instance");
		ernInfoInstance = $("#TB08031S_ernInfo").pqGrid("instance");
		loanBanoInfoInstance = $("#TB08031S_loanBanoInfo").pqGrid("instance");
		ernSctyInfoInstance = $("#TB08031S_ernSctyInfo").pqGrid("instance");
		udwrtPaiBzscalInfoInstance = $("#TB08031S_udwrtPaiBzscalInfo").pqGrid("instance");
		busiInfoInstance = $("#TB08031S_busiInfo").pqGrid("instance");
		admsAsstInfoInstance = $("#TB08031S_admsAsstInfo").pqGrid("instance");
		invstBzscalInstance = $("#TB08031S_invstBzscalList").pqGrid("instance");
		asstWrkngInfoInstance = $("#TB08031S_asstWrkngInfo").pqGrid("instance");


		setLoginUserAuth();
	}

	// 사업구분 정보
	function loadInvbnkAmnBzCd() {

		// alert("?????");
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/I020",
			dataType: "json",
			success: function(data) {

				var html = "";

				$("#TB08031S_invbnkAmnBzCd").html(html);

				var codeList = data;
				if (codeList.length > 0) {
					$.each(codeList, function(key, value) {
						html +=
							'<option value="' +
							value.CD_VL_ID +
							'">' +
							value.CD_VL_NM +
							" (" +
							value.CD_VL_ID +
							")" +
							"</option>";
					});
				}
				$("#TB08031S_invbnkAmnBzCd").html(html);
			},
		}).then(() => {
			tabCtrl("invbnkAmnBzCd");
		});
	}

	$("#TB08031S_invbnkAmnBzCd").change(function() {

		tabCtrl("invbnkAmnBzCd");

		if ($("#TB08031S_invbnkAmnBzCd").val() === '03') {
			udwrtPaiBzscalInfoInstance.refresh();
		}
	});

	//사업정보 딜조회


	// 사업정보 딜조회
	function srchBsnsInfo() {
		var dealNo = $("#TB08031S_ibDealNo").val();
		var invbnkAmnBzCd = $("#TB08031S_invbnkAmnBzCd").val();

		// 유효성검사
		if (isEmpty(dealNo)) {
			Swal.fire({
				icon: "warning",
				title: "Warning!",
				text: "Deal번호를 입력해주세요.",
				confirmButtonText: "확인",
			});
			return false;
		} else {
			// businessFunction();
			businessFunction2();
			btnDisabled(false);
		}

		function businessFunction2() {
			var dtoParam = {
				dealNo: dealNo,
				invFnnMngmBusiDcd: invbnkAmnBzCd,
			};

			$.ajax({
				type: "GET",
				url: "/TB08031S/getBusiBssInfo",
				data: dtoParam,
				dataType: "json",
				success: function(data) {

					var bssBscInfo = data.ibims101bvo;

					console.log("bssBscInfo:" + bssBscInfo);

					/* 기본항목*/
					// $("#TB08031S_ibDealNo").val(bssBscInfo.dealNo);         // 딜번호

					var excBlce = isEmpty(bssBscInfo.excBlce) ? 0 : addComma(bssBscInfo.excBlce);
					var expDt = isEmpty(bssBscInfo.expDt) ? '' : formatDate(bssBscInfo.expDt);
					var rgstDt = isEmpty(bssBscInfo.rgstDt) ? '' : formatDate(bssBscInfo.rgstDt);

					$("#TB08031S_sn").val(data.sn);

					$("#TB08031S_corpNo").val(bssBscInfo.crno);             // 법인등록번호
					$("#TB08031S_corpNm").val(bssBscInfo.entpNm);           // 업체명
					$("#TB08031S_bsnsNm").val(bssBscInfo.busiNm);           // 사업명
					$('#TB08031S_C012').val(bssBscInfo.crdtGrdCd);					// 신용등급
					$('#TB08031S_bsnsLoan').val(excBlce);				            // 사업대출잔액
					$('#TB08031S_coValDt').val(expDt);						          // 평가유효기일
					$('#TB08031S_fnMdfyDt').val(rgstDt);					          // 최종수정일자

					var loanInfo = data.loanInfo;
					loanBanoInfoInstance.setData(loanInfo);                 //투자자산종목 정보

					var fundInfo = data.fundInfo;
					ernSctyInfoInstance.setData(fundInfo);                  //투자자산 정보

					console.log("invFnnMngmBusiDcd:" + data.invFnnMngmBusiDcd);

					if (data.invFnnMngmBusiDcd) {       //사업구분코드 있는 경우

						var invFnnMngmBusiDcd = data.invFnnMngmBusiDcd;
						//사업기본정보 세팅
						$("#TB08031S_invbnkAmnBzCd").val(data.invFnnMngmBusiDcd);           //사업구분코드
						$("#TB08031S_I021").val(data.invFnnMngnBusiDtlDcd);                 //사업구분 상세
						$("#TB08031S_I011").val(data.invFnnMmngPrgSttsCd);                  //진행상태코드
						$("#TB08031S_I027").val(data.crryCd);                               //통화코드
						$("#TB08031S_prcrAmt").val(data.totPrcrAmt);                        //총조달금액
						$("#TB08031S_bondProt").val(data.mainBondMtncCnts);                 //주요채권보전내용
						$("#TB08031S_rvwStRsn").val(data.ivtgShdnRsnCnts);                  //검토중단사유
						$("#TB08031S_T002").val(data.thcoRlDcd);                            //당사역할구분
						$("#TB08031S_thcoRlAmt").val(data.thcoMdtnAmt);                     //당사주선금액
						$("#TB08031S_thcoPtnAmt").val(data.thcoPtciAmt);                    //당사참여금액
						$("#TB08031S_I033").val(data.invstRvnRtDcd);                        //고정금리구분코드
						$("#TB08031S_S003").val(data.stdrIntrtKndCd);                       //기준금리구분코드
						$("#TB08031S_BitrKindCdInput").val(data.stdrIntrt);                 //기준금리
						$("#TB08031S_preRt").val(data.addIntrt);                            //가산금리
						$("#TB08031S_charge_empNo").val(data.chrrEmpno);                    //담당자사번
						$("#TB08031S_charge_empNm").val(data.empNm);                        //담당자명
						$("#TB08031S_D010").val(data.dprtCd);                               //업무팀
						$("#TB08031S_tgtRvn").val(data.goalErnRt);                          //목표수익률
						$("#bsnsCntnt").val(data.busiCnts);                                 //사업내용
						$("#TB08031S_rm_empNo").val(data.rmEmpno);                          //담당RM사번
						$("#TB08031S_rm_empNm").val(data.rmEmpNm);                          //담당RM명

						if (invFnnMngmBusiDcd === "01") {           //부동산
							var tabPst = $("#TB08031S_ramsTab").children();
							tabPst.eq(0).show();
							tabPst.eq(1).hide();
							tabPst.eq(2).hide();
							tabPst.eq(3).hide();
							tabPst.eq(4).hide();
							tabPst.eq(5).show();
							tabPst.eq(6).show();
							tabPst.eq(7).show();
							tabPst.eq(8).show();
							tabPst.eq(9).show();
							tabPst.eq(10).show();
							tabPst.eq(11).hide();
							tabPst.eq(12).hide();
							tabPst.eq(13).hide();
							tabPst.eq(14).hide();
							/* 기존에 선택된 TAB에서 active 요소 삭제 후 현재 SHOW 상태인 TAB MENU 중에서
								첫번째 TAB PANEL에 active 요소 부여										*/
							$("div[data-menuid='/TB08031S'] .tab-content")
								.children(".tab-pane.active")
								.attr("class", "tab-pane");
							$("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");

							$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
							$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
								.children()
								.eq(0)
								.children()
								.attr("class", "nav-link active");


							var rlesInfo = data.rlesInfo;

							var guasMrtgYn = rlesInfo.rlesInfo;                   //보증서담보여부
							var busiLcsiCpltYn = rlesInfo.efceMbdyDcd;            //사업인허가완료여부
							var landOwnrsEnsuYn = rlesInfo.landOwnrsEnsuYn;       //토지소유권확보여부
							var fndsMngmTrgtYn = rlesInfo.fndsMngmTrgtYn;         //자금관리대상여부
							var rdmpCpltYn = rlesInfo.rdmpCpltYn;                 //상환완료여부
							var bondTrnsYn = rlesInfo.bondTrnsYn;                 // 채권이관여부
							var mngmCndFlflYn = rlesInfo.mngmCndFlflYn;           // 관리조건이행여부
							var fnnrCtrcMttrTrgtYn = rlesInfo.fnnrCtrcMttrTrgtYn; // 재무약정사항대상여부
							var brwrSpcYn = rlesInfo.brwrSpcYn;                   //차주SCP여부
							var apvlYn = rlesInfo.apvlYn;                         //승인여부


							if (guasMrtgYn == "Y") {
								$("#TB08031S_rlesWarrMrtgY").prop("checked", true);
							} else {
								$("#TB08031S_rlesWarrMrtgN").prop("checked", true);
							}

							if (busiLcsiCpltYn == "Y") {
								$("#TB08031S_rlesOwnPLcsiCpltY").prop("checked", true);
							} else {
								$("#TB08031S_rlesOwnPLcsiCpltN").prop("checked", true);
							}

							if (landOwnrsEnsuYn == "Y") {
								$("#TB08031S_rlesLandPchsCpltY").prop("checked", true);
							} else {
								$("#TB08031S_rlesLandPchsCpltN").prop("checked", true);
							}

							if (fndsMngmTrgtYn == "Y") {
								$("#TB08031S_rlesFndsMngmTrgtY").prop("checked", true);
							} else {
								$("#TB08031S_rlesFndsMngmTrgtN").prop("checked", true);
							}

							if (rdmpCpltYn == "Y") {
								$("#TB08031S_rdmpCpltYnY").prop("checked", true);
							} else {
								$("#TB08031S_rdmpCpltYnN").prop("checked", true);
							}

							if (bondTrnsYn == "Y") {
								$("#TB08031S_rlesBondTrnY").prop("checked", true);
							} else {
								$("#TB08031S_rlesBondTrnN").prop("checked", true);
							}

							if (mngmCndFlflYn == "Y") {
								$("#TB08031S_rlesCondComplyY").prop("checked", true);
							} else {
								$("#TB08031S_rlesCondComplyN").prop("checked", true);
							}

							if (fnnrCtrcMttrTrgtYn == "Y") {
								$("#TB08031S_rlesCmmntMatY").prop("checked", true);
							} else {
								$("#TB08031S_rlesCmmntMatN").prop("checked", true);
							}

							if (brwrSpcYn == "Y") {
								$("#TB08031S_rlesSpcY").prop("checked", true);
							} else {
								$("#TB08031S_rlesSpcN").prop("checked", true);
							}

							if (apvlYn == "Y") {
								$("#TB08031S_rlesUseAppY").prop("checked", true);
							} else {
								$("#TB08031S_rlesUseAppN").prop("checked", true);
							}

							$("#TB08031S_C014").val(rlesInfo.efceMbdyDcd);              //시행주체구분코드
							$("#TB08031S_csstPrarYm").val(rlesInfo.cnrStrtDt);          //공사시작일
							$("#TB08031S_cnfnPrarYm").val(rlesInfo.cnrEndDt);           //공사종료일
							$("#TB08031S_slltPrarYm").val(rlesInfo.slltStrtDt);         //분양시작일 
							$("#TB08031S_busiArea").val(rlesInfo.bzplAddr);             //사업장주소
							$("#TB08031S_B011").val(rlesInfo.bsnsAreaCd);               //사업지역코드
							$("#TB08031S_busiSiteSqms").val(rlesInfo.busiSiteSqms);     //사업부지면적 
							$("#TB08031S_busiSiteAcre").val(rlesInfo.siteSqms);         //사업부지면적(평) 
							$("#TB08031S_arRt").val(rlesInfo.busiArRt);                 //용적율 
							$("#TB08031S_Sqms").val(rlesInfo.busiTtlSqms);              //사업연면적
							$("#TB08031S_SqmsP").val(rlesInfo.ttlSqms);                 //연면적
							$("#TB08031S_far").val(rlesInfo.busiBldngLndrt);            //건폐율
							$("#TB08031S_B019").val(rlesInfo.eprzSclDcd);               //기업규모구분코드
							$("#TB08031S_fcltScal").val(rlesInfo.fcltSclWidhCtns);      //시설규모
							$("#TB08031S_resiEco").val(rlesInfo.resiEcoCtns);           //주거환경
							$("#TB08031S_C010").val(rlesInfo.crdtRifcDcd);              //신용보강구분코드
							$("#TB08031S_crdtEhcmntCntnt").val(rlesInfo.crdtRifcDvcNm); //신용보강내용

							var bsnsPartInfo = data.bsnsPartInfo;             //사업참가자정보
							bsnsPartInfoInstance.setData(bsnsPartInfo);

							var bsnsForecast = data.bsnsForecast;             //사업주요전망
							bsnsForecastInstance.setData(bsnsForecast);

							var bondProtInfo = data.bondProtInfo;             //채권보전주요약정
							bondProtInfoInstance.setData(bondProtInfo);

							var cchInfo = data.cchInfo;                       //조건변경이력
							cchInfoInstance.setData(cchInfo);

							var stlnInfo = data.stlnInfo;                     //대주단정보
							stlnInfoInstance.setData(stlnInfo);

							var ernInfo = data.ernInfo;                       //수익자정보
							ernInfoInstance.setData(ernInfo);


						}
						else if (invFnnMngmBusiDcd === "02") {     //인프라
							var tabPst = $("#TB08031S_ramsTab").children();
							tabPst.eq(0).hide();
							tabPst.eq(1).hide();
							tabPst.eq(2).show();
							tabPst.eq(3).hide();
							tabPst.eq(4).hide();
							tabPst.eq(5).show();
							tabPst.eq(6).show();
							tabPst.eq(7).show();
							tabPst.eq(8).show();
							tabPst.eq(9).show();
							tabPst.eq(10).show();
							tabPst.eq(11).hide();
							tabPst.eq(12).hide();
							tabPst.eq(13).hide();
							tabPst.eq(14).hide();

							$("div[data-menuid='/TB08031S'] .tab-content")
								.children(".tab-pane.active")
								.attr("class", "tab-pane");
							$("div[data-menuid='/TB08031S'] .tab-content").children().eq(2).attr("class", "tab-pane active");

							$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
							$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
								.children()
								.eq(2)
								.children()
								.attr("class", "nav-link active");

							var infraInfo = data.infraInfo;

							var lmtYn = infraInfo.lmtYn;                              //SE한도대상여부
							var apvlYn = infraInfo.apvlYn;                            //사용승인여부
							var brwrSpcYn = infraInfo.brwrSpcYn;                      //차주SPC여부
							var mngmCndFlflYn = infraInfo.mngmCndFlflYn;              //관리조건이행여부
							var bondTrnsYn = infraInfo.bondTrnsYn;                    //채권이관여부
							var fnnrCtrcMttrTrgtYn = infraInfo.fnnrCtrcMttrTrgtYn;    //주요(재무)약정사항

							if (lmtYn == "Y") {
								$("#TB08031S_infraSeLmtY").prop("checked", true);
							} else {
								$("#TB08031S_infraSeLmtN").prop("checked", true);
							}

							if (apvlYn == "Y") {
								$("#TB08031S_infraUseApvlY").prop("checked", true);
							} else {
								$("#TB08031S_infraUseApvlN").prop("checked", true);
							}

							if (brwrSpcYn == "Y") {
								$("#TB08031S_infraSpcY").prop("checked", true);
							} else {
								$("#TB08031S_infraSpcN").prop("checked", true);
							}

							if (mngmCndFlflYn == "Y") {
								$("#TB08031S_infraCondComplyY").prop("checked", true);
							} else {
								$("#TB08031S_infraCondComplyN").prop("checked", true);
							}

							if (bondTrnsYn == "Y") {
								$("#TB08031S_infraBondTraY").prop("checked", true);
							} else {
								$("#TB08031S_infraBondTraN").prop("checked", true);
							}

							if (fnnrCtrcMttrTrgtYn == "Y") {
								$("#TB08031S_infraCmmntMatY").prop("checked", true);
							} else {
								$("#TB08031S_infraCmmntMatN").prop("checked", true);
							}

							$("#TB08031S_B013").val(infraInfo.invFnnBusiWyDcd);                     //사업방식
							$("#TB08031S_bsnsScal").val(infraInfo.busiSclCntn);                     //사업규모
							$("#TB08031S_bsnsLicYm").val(formatDate(infraInfo.busiLcsiDt));         //사업인허가일자
							$("#TB08031S_cmplYm").val(formatDate(infraInfo.cnfnDt));                //준공(예정)년월
							$("#TB08031S_leadAgency").val(infraInfo.mngtCmpNm);                     //주무관청
							$("#TB08031S_conStYm").val(formatDate(infraInfo.cnrStrtDt));            //공사시작일자
							$("#TB08031S_conEndYm").val(formatDate(infraInfo.cnrEndDt));            //공사종료일자
							$("#TB08031S_opDurStYm").val(formatDate(infraInfo.oprtStrtDt));         //운영시작년월
							$("#TB08031S_opDurEndYm").val(formatDate(infraInfo.oprtEndDt));         //운영종료년월
							$("#TB08031S_bsnsLoc").val(infraInfo.bzplAddr);                         //사업장위치
							$("#TB08031S_invstAmt").val(comma(infraInfo.invstAmt));                 //총투자비==투자금액
							$("#TB08031S_B012").val(infraInfo.busiRvoDcd);                          //사업수주구분코드
							$("#TB08031S_equity").val(comma(infraInfo.slfCpta));                    //자기자본
							$("#TB08031S_priLoan").val(comma(infraInfo.prorLoanAmt));               //선순위대출
							$("#TB08031S_subLoan").val(comma(infraInfo.bkbnLoanAmt));               //후순위대출

							var bsnsPartInfo = data.bsnsPartInfo;             //사업참가자정보
							bsnsPartInfoInstance.setData(bsnsPartInfo);

							var bsnsForecast = data.bsnsForecast;             //사업주요전망
							bsnsForecastInstance.setData(bsnsForecast);

							var bondProtInfo = data.bondProtInfo;             //채권보전주요약정
							bondProtInfoInstance.setData(bondProtInfo);

							var cchInfo = data.cchInfo;                       //조건변경이력
							cchInfoInstance.setData(cchInfo);

							var stlnInfo = data.stlnInfo;                     //대주단정보
							stlnInfoInstance.setData(stlnInfo);

							var ernInfo = data.ernInfo;                       //수익자정보
							ernInfoInstance.setData(ernInfo);


						}
						else if (invFnnMngmBusiDcd === "03") {     //M&A
							var tabPst = $("#TB08031S_ramsTab").children();

							tabPst.eq(0).hide();
							tabPst.eq(1).hide();
							tabPst.eq(2).hide();
							tabPst.eq(3).show();
							tabPst.eq(4).hide();
							tabPst.eq(5).show();
							tabPst.eq(6).show();
							tabPst.eq(7).show();
							tabPst.eq(8).show();
							tabPst.eq(9).show();
							tabPst.eq(10).show();
							tabPst.eq(11).show();
							tabPst.eq(12).hide();
							tabPst.eq(13).hide();
							tabPst.eq(14).show();

							$("div[data-menuid='/TB08031S'] .tab-content")
								.children(".tab-pane.active")
								.attr("class", "tab-pane");
							$("div[data-menuid='/TB08031S'] .tab-content").children().eq(3).attr("class", "tab-pane active");

							$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
							$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
								.children()
								.eq(3)
								.children()
								.attr("class", "nav-link active");

							var maInfo = data.maInfo;

							var lmtTrYn = maInfo.lmtTrYn;       //한도거래여부

							if (lmtTrYn == "Y") {
								$("#TB08031S_lmtTrY").prop("checked", true);
							} else {
								$("#TB08031S_lmtTrN").prop("checked", true);
							}

							$("#TB08031S_U002").val(maInfo.undwHglmWyDcd);                            //상환방식
							$("#TB08031S_U001").val(maInfo.hnvrBusiDcd);                              //인수사업구분
							$("#TB08031S_spon").val(maInfo.spnsrCtns);                                //후원자내용
							$("#TB08031S_mrtg").val(maInfo.undwMrtgCtns);                             //인수담보내용

							var udwrtPaiBzscalInfo = data.udwrtPaiBzscalInfo;                         //인수대상 기업정보 
							udwrtPaiBzscalInfoInstance.setData(udwrtPaiBzscalInfo);

							var bsnsPartInfo = data.bsnsPartInfo;             //사업참가자정보
							bsnsPartInfoInstance.setData(bsnsPartInfo);

							var bsnsForecast = data.bsnsForecast;             //사업주요전망
							bsnsForecastInstance.setData(bsnsForecast);

							var bondProtInfo = data.bondProtInfo;             //채권보전주요약정
							bondProtInfoInstance.setData(bondProtInfo);

							var cchInfo = data.cchInfo;                       //조건변경이력
							cchInfoInstance.setData(cchInfo);

							var stlnInfo = data.stlnInfo;                     //대주단정보
							stlnInfoInstance.setData(stlnInfo);

							var ernInfo = data.ernInfo;                       //수익자정보
							ernInfoInstance.setData(ernInfo);

							var busiInfo = data.busiInfo;                     //관련사업정보
							busiInfoInstance.setData(busiInfo);

							var admsAsstInfo = data.admsAsstInfo;             //편입자산정보
							admsAsstInfoInstance.setData(admsAsstInfo);


						}
						else if (invFnnMngmBusiDcd === "04") {     //국제투자
							var tabPst = $("#TB08031S_ramsTab").children();
							tabPst.eq(0).hide();
							tabPst.eq(1).hide();
							tabPst.eq(2).hide();
							tabPst.eq(3).hide();
							tabPst.eq(4).show();
							tabPst.eq(5).show();
							tabPst.eq(6).show();
							tabPst.eq(7).show();
							tabPst.eq(8).show();
							tabPst.eq(9).show();
							tabPst.eq(10).hide();
							tabPst.eq(11).hide();
							tabPst.eq(12).hide();
							tabPst.eq(13).hide();
							tabPst.eq(14).hide();

							$("div[data-menuid='/TB08031S'] .tab-content")
								.children(".tab-pane.active")
								.attr("class", "tab-pane");
							$("div[data-menuid='/TB08031S'] .tab-content").children().eq(4).attr("class", "tab-pane active");

							$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
							$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
								.children()
								.eq(4)
								.children()
								.attr("class", "nav-link active");

							var invstInfo = data.invstInfo;

							var brwrSpcYn = invstInfo.brwrSpcYn;                       //차주 SPC 여부
							var mngmCndFlflYn = invstInfo.mngmCndFlflYn;               //관리조건이행여부
							var bondTrnsYn = invstInfo.bondTrnsYn;                     //채권이관여부
							var fnnrCtrcMttrTrgtYn = invstInfo.fnnrCtrcMttrTrgtYn;     // 재무약정사항대상여부

							if (brwrSpcYn == "Y") {
								$("#TB08031S_realEstateSpcY").prop("checked", true);
							} else {
								$("#TB08031S_realEstateSpcN").prop("checked", true);
							}

							if (mngmCndFlflYn == "Y") {
								$("#TB08031S_realEstateCondComplyY").prop("checked", true);
							} else {
								$("#TB08031S_realEstateCondComplyN").prop("checked", true);
							}

							if (bondTrnsYn == "Y") {
								$("#TB08031S_realEstateBondTrnY").prop("checked", true);
							} else {
								$("#TB08031S_realEstateBondTrnN").prop("checked", true);
							}

							if (fnnrCtrcMttrTrgtYn == "Y") {
								$("#TB08031S_realEstateCmmntMatY").prop("checked", true);
							} else {
								$("#TB08031S_realEstateCmmntMatN").prop("checked", true);
							}

							$("#TB08031S_T005").val(invstInfo.invFnnTrgtAsstDcd);    //대상자산구분코드
							$("#TB08031S_brwrNtnNm").val(invstInfo.brwrNtnNm);       //차주국가명
							$("#TB08031S_totBusiAmt").val(invstInfo.totBusiCt);      //총사업비
							$("#TB08031S_hostCountry").val(invstInfo.ntnNm);         //국가명
							$("#TB08031S_ensrYn").val(invstInfo.guasDvsnCtns);       //보증서구분내용
							$("#TB08031S_prorRto").val(invstInfo.prorRto);           //선순위비율
							$("#TB08031S_cerkRto").val(invstInfo.cerkRto);           //중순위비율
							$("#TB08031S_bkbnRto").val(invstInfo.bkbnRto);           //후순위/Equity비율
							$("#TB08031S_lseStrtDt").val(formatDate(invstInfo.lesStrtDt));       //리스시작일자
							$("#TB08031S_lseEndDt").val(formatDate(invstInfo.lesEndDt));         //리스종료일자
							$("#TB08031S_loanStrtDt").val(formatDate(invstInfo.loanStrtDt));     //대출시작일자
							$("#TB08031S_loanEndDt").val(formatDate(invstInfo.loanEndDt));       //대출종료일자
							$("#TB08031S_lsePrd").val(invstInfo.mnum);               //개월수
							$("#TB08031S_loanPrd").val(invstInfo.loanMnum);          //대출기간개월수
							$("#TB08031S_amSt").val(invstInfo.dvcTyCnts);            //기종/선종
							$("#TB08031S_proEprz").val(invstInfo.prdcCmpCnts);       //제작사
							$("#TB08031S_proYr").val(invstInfo.mnfYr);               //제조년도
							$("#TB08031S_L006").val(invstInfo.invFnnLesKndDcd);      //리스종류
							$("#TB08031S_lseMgco").val(invstInfo.lesMgcoNm);         //리스운용사
							$("#TB08031S_lseUser").val(invstInfo.lesUserCnts);       //리스이용자

							var bsnsPartInfo = data.bsnsPartInfo;             //사업참가자정보
							bsnsPartInfoInstance.setData(bsnsPartInfo);

							var bsnsForecast = data.bsnsForecast;             //사업주요전망
							bsnsForecastInstance.setData(bsnsForecast);

							var bondProtInfo = data.bondProtInfo;             //채권보전주요약정
							bondProtInfoInstance.setData(bondProtInfo);

							var cchInfo = data.cchInfo;                       //조건변경이력
							cchInfoInstance.setData(cchInfo);

							var stlnInfo = data.stlnInfo;                     //대주단정보
							stlnInfoInstance.setData(stlnInfo);


						}
						else if (invFnnMngmBusiDcd === "05") {     //PEF/VC

							var tabPst = $("#TB08031S_ramsTab").children();

							tabPst.eq(0).hide();
							tabPst.eq(1).show();
							tabPst.eq(2).hide();
							tabPst.eq(3).hide();
							tabPst.eq(4).hide();
							tabPst.eq(5).show();
							tabPst.eq(6).show();
							tabPst.eq(7).show();
							tabPst.eq(8).show();
							tabPst.eq(9).hide();
							tabPst.eq(10).show();
							tabPst.eq(11).show();
							tabPst.eq(12).show();
							tabPst.eq(13).show();
							tabPst.eq(14).show();

							$("div[data-menuid='/TB08031S'] .tab-content")
								.children(".tab-pane.active")
								.attr("class", "tab-pane");
							$("div[data-menuid='/TB08031S'] .tab-content").children().eq(1).attr("class", "tab-pane active");

							$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
							$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
								.children()
								.eq(1)
								.children()
								.attr("class", "nav-link active");

							var pefInfo = data.pefInfo;

							var mngmCndFlflYn = pefInfo.mngmCndFlflYn;       //관리조건이행여부
							var bondTrnsYn = pefInfo.bondTrnsYn;             //채권이관여부


							if (mngmCndFlflYn == "Y") {
								$("#TB08031S_pefVcInvstMngY").prop("checked", true);
							} else {
								$("#TB08031S_pefVcInvstMngN").prop("checked", true);
							}

							if (bondTrnsYn == "Y") {
								$("#TB08031S_pefVcBondTrnY").prop("checked", true);
							} else {
								$("#TB08031S_pefVcBondTrnN").prop("checked", true);
							}

							$("#TB08031S_tab2_empNo").val(pefInfo.chrgEmpno);                      //담당자
							$("#TB08031S_tab2_empNm").val(pefInfo.chrgEmpnm)                       //담당자명
							$("#TB08031S_invstGuidelines").val(pefInfo.invstStgyCtns);             //투자가이드라인


							var bsnsPartInfo = data.bsnsPartInfo;             //사업참가자정보
							bsnsPartInfoInstance.setData(bsnsPartInfo);

							var bsnsForecast = data.bsnsForecast;             //사업주요전망
							bsnsForecastInstance.setData(bsnsForecast);

							var bondProtInfo = data.bondProtInfo;             //채권보전주요약정
							bondProtInfoInstance.setData(bondProtInfo);

							var cchInfo = data.cchInfo;                       //조건변경이력
							cchInfoInstance.setData(cchInfo);

							var ernInfo = data.ernInfo;                       //수익자정보
							ernInfoInstance.setData(ernInfo);

							var busiInfo = data.busiInfo;                     //관련사업정보
							busiInfoInstance.setData(busiInfo);

							var invstEprzInfo = data.invstEprzInfo;           //투자기업목록
							invstBzscalInstance.setData(invstEprzInfo);

							var asstWrkngInfo = data.asstWrkngInfo;           //자산운용사정보
							asstWrkngInfoInstance.setData(asstWrkngInfo);

							var admsAsstInfo = data.admsAsstInfo;             //편입자산정보
							admsAsstInfoInstance.setData(admsAsstInfo);

						}
					}
					else {
						console.log("sn 없음~");

						bizDetailClear();
						bizTabClear();

					}

					$('div[data-menuid="/TB08031S"] #UPLOAD_AddFile').attr("disabled", false);
					$('div[data-menuid="/TB08031S"] #UPLOAD_DelFiles').attr("disabled", false);
					$('#fileKey2').val('TB03020S' + '|' + data.dealNo);
					getFileInfo($('#key1').val(), $('#fileKey2').val());
				}
			});
		}

	}



	// 사업구분이 변경될때 실행
	function tabCtrl(prefix) {
		var firstLetter = "";
		if (prefix === "ibDealNo") {
			var selId = $("#TB08031S_ibDealNo").val();
			firstLetter = selId.charAt(0).toUpperCase();
		} else if (prefix == "invbnkAmnBzCd") {

			switch ($("#TB08031S_invbnkAmnBzCd").val()) {
				case "01":
					firstLetter = "A";
					break;
				case "02":
					firstLetter = "B";
					break;
				case "03":
					firstLetter = "C";
					break;
				case "04":
					firstLetter = "D";
					break;
				case "05":
					firstLetter = "E";
					break;
				default:
					break;
			}
		}

		var tabPst = $("#TB08031S_ramsTab").children();
		switch (firstLetter) {
			case "A" /* TAB MENU SHOW/HIDE */:
				$("#TB08031S_invbnkAmnBzCd").val("01");
				tabPst.eq(0).show();
				tabPst.eq(1).hide();
				tabPst.eq(2).hide();
				tabPst.eq(3).hide();
				tabPst.eq(4).hide();
				tabPst.eq(5).show();
				tabPst.eq(6).show();
				tabPst.eq(7).show();
				tabPst.eq(8).show();
				tabPst.eq(9).show();
				tabPst.eq(10).show();
				tabPst.eq(11).hide();
				tabPst.eq(12).hide();
				tabPst.eq(13).hide();
				tabPst.eq(14).hide();
				/* 기존에 선택된 TAB에서 active 요소 삭제 후 현재 SHOW 상태인 TAB MENU 중에서
								첫번째 TAB PANEL에 active 요소 부여										*/
				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(0)
					.children()
					.attr("class", "nav-link active");
				break;
			case "B":
				$("#TB08031S_invbnkAmnBzCd").val("02");
				tabPst.eq(0).hide();
				tabPst.eq(1).hide();
				tabPst.eq(2).show();
				tabPst.eq(3).hide();
				tabPst.eq(4).hide();
				tabPst.eq(5).show();
				tabPst.eq(6).show();
				tabPst.eq(7).show();
				tabPst.eq(8).show();
				tabPst.eq(9).show();
				tabPst.eq(10).show();
				tabPst.eq(11).hide();
				tabPst.eq(12).hide();
				tabPst.eq(13).hide();
				tabPst.eq(14).hide();

				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(2).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(2)
					.children()
					.attr("class", "nav-link active");
				break;
			case "C":
				$("#TB08031S_invbnkAmnBzCd").val("03");
				tabPst.eq(0).hide();
				tabPst.eq(1).hide();
				tabPst.eq(2).hide();
				tabPst.eq(3).show();
				tabPst.eq(4).hide();
				tabPst.eq(5).show();
				tabPst.eq(6).show();
				tabPst.eq(7).show();
				tabPst.eq(8).show();
				tabPst.eq(9).show();
				tabPst.eq(10).show();
				tabPst.eq(11).show();
				tabPst.eq(12).hide();
				tabPst.eq(13).hide();
				tabPst.eq(14).show();

				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(3).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(3)
					.children()
					.attr("class", "nav-link active");
				break;
			case "D":
				$("#TB08031S_invbnkAmnBzCd").val("04");
				tabPst.eq(0).hide();
				tabPst.eq(1).hide();
				tabPst.eq(2).hide();
				tabPst.eq(3).hide();
				tabPst.eq(4).show();
				tabPst.eq(5).show();
				tabPst.eq(6).show();
				tabPst.eq(7).show();
				tabPst.eq(8).show();
				tabPst.eq(9).show();
				tabPst.eq(10).hide();
				tabPst.eq(11).hide();
				tabPst.eq(12).hide();
				tabPst.eq(13).hide();
				tabPst.eq(14).hide();

				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(4).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(4)
					.children()
					.attr("class", "nav-link active");

				// udwrtPaiBzscalInfoInstance.refresh();
				break;
			case "E":
				$("#TB08031S_invbnkAmnBzCd").val("05");
				tabPst.eq(0).hide();
				tabPst.eq(1).show();
				tabPst.eq(2).hide();
				tabPst.eq(3).hide();
				tabPst.eq(4).hide();
				tabPst.eq(5).show();
				tabPst.eq(6).show();
				tabPst.eq(7).show();
				tabPst.eq(8).show();
				tabPst.eq(9).hide();
				tabPst.eq(10).show();
				tabPst.eq(11).show();
				tabPst.eq(12).show();
				tabPst.eq(13).show();
				tabPst.eq(14).show();

				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(1).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(1)
					.children()
					.attr("class", "nav-link active");
				break;
			default:
				tabPst.show();
				$("div[data-menuid='/TB08031S'] .tab-content")
					.children(".tab-pane.active")
					.attr("class", "tab-pane");
				$("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");

				$("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
				$("div[data-menuid='/TB08031S'] .nav.nav-tabs")
					.children()
					.eq(0)
					.children()
					.attr("class", "nav-link active");
				break;
		}
	}

	function addMenuRow(gridId) {
		var gridLgth = $(gridId).pqGrid('option', 'dataModel.data').length;
		$(gridId).pqGrid("addRow", { rowData: { erlmSeq: gridLgth + 1 }, checkEditable: false });
	}

	function dltMenuRow(gridId, isThrAChk) {

		if (isThrAChk) {

			var gridLgth = $(gridId).pqGrid('option', 'dataModel.data').length;
			var data = $(gridId).pqGrid('option', 'dataModel.data');

			let filteredIndexes = [];

			data.forEach((item, index) => {
				if (item.isChked) {
					filteredIndexes.push(index);
				}
			});

			filteredIndexes
				.sort((a, b) => b - a)
				.forEach((index) => {
					$(gridId).pqGrid("deleteRow", { rowIndx: index });
				});

		} else {
			var gridLgth = $(gridId).pqGrid('option', 'dataModel.data').length;

			$(gridId).pqGrid("deleteRow", { rowIndx: gridLgth - 1 });
		}

	}

	function gridInfoSett(rowData, instncNm) {
		//console.log(JSON.stringify(rowData));

		if (instncNm === "bsnsPartInfoInstance") {//사업참가자정보

			$("#TB08031S_P001").val(rowData.ptcnRelrDcd);              //참가자관계구분코드
			$("#TB08031S_partCorpNm").val(rowData.entpNm);             //업체명
			$("#TB08031S_dtlsCorpNo").val(rowData.crno);               //법인등록번호
			$("#TB08031S_bsnsRgstNo").val(rowData.bzno);               //사업자등록번호
			$("#TB08031S_rprstPNm").val(rowData.rpsrNm);               //대표자명
			$("#TB08031S_bsnsPartInfo_sn").val(rowData.sn);            //순번
			$("#TB08031S_bsnsPartInfo_erlmSeq").val(rowData.erlmSeq);  //등록순번

		} else if (instncNm === "bsnsForecastInstance") {//사업주요전망

			$("#TB08031S_exptDt").val(formatDate(rowData.prarDt));                 //예정일자
			$("#TB08031S_pfrmDt").val(formatDate(rowData.flflDt));                 //이행일자
			$("#TB08031S_mainCntnt").val(rowData.mainScxCtns);         //주요일정내용

			$("#TB08031S_bsnsForecast_sn").val(rowData.sn);            //순번
			$("#TB08031S_bsnsForecast_erlmSeq").val(rowData.erlmSeq);  //등록순번

			var flflYn = rowData.flflYn;

			if (flflYn === "Y") {
				$("#TB08031S_pfrmY").prop("checked", true);
			} else {
				$("#TB08031S_pfrmN").prop("checked", true);
			}

		} else if (instncNm === "bondProtInfoInstance") {//채권보전주요약정

			$("#TB08031S_B007").val(rowData.bondProtCcd);                  // 채권보전구분
			$("#TB08031S_dtlsCntnt").val(rowData.mainCtrcMttrCnts);        // 주요약정사항내용
			$("#TB08031S_bondProtInfo_sn").val(rowData.sn);                //일련번호
			$("#TB08031S_bondProtInfo_erlmSeq").val(rowData.erlmSeq);      //등록순번

			var fnnrCtrcMttrTrgtYn = rowData.fnnrCtrcMttrTrgtYn;

			if (fnnrCtrcMttrTrgtYn === "Y") {
				$("#TB08031S_bondPfrmY").prop("checked", true);
			} else {
				$("#TB08031S_bondPfrmN").prop("checked", true);
			}

		} else if (instncNm === "cchInfoInstance") {//조건변경이력

			$("#TB08031S_cchInfo_sn").val(rowData.sn);              //일련번호
			$("#TB08031S_cchInfo_erlmSeq").val(rowData.erlmSeq);    //등록순번

			$("#TB08031S_cndtMainCntnt").val(rowData.cndChngMainCnts);//조건변경 주요내용
			$("#TB08031S_cch_empNo").val(rowData.prcsrEmpno);         //취급자 사번
			$("#TB08031S_cch_empNm").val(rowData.prcsrEmpnm);         //취급자명
			$("#TB08031S_handlerID").val(rowData.prcsrTelNo);         //취급자 개인번호
			$("#TB08031S_rcgDt").val(rowData.apvlDt);                 //승인일자
			$("#TB08031S_cmplDt").val(rowData.crotDt);                //시행일자
			$("#TB08031S_rcgDocNo").val(rowData.cndChngDcmNoCnts);    //조건변경문번호내용

		} else if (instncNm === "stlnInfoInstance") {//대주단정보

			$("#TB08031S_stlnInfo_sn").val(rowData.sn);                //일련번호
			$("#TB08031S_stlnInfo_erlmSeq").val(rowData.erlmSeq);      //등록순번

			$("#TB08031S_I051_1").val(rowData.ibStlnDcd);              //구분
			$("#TB08031S_mCorpNm").val(rowData.entpNm);                //기관명
			$("#TB08031S_mAgrAmt").val(comma(rowData.crdtProvLmtAmt));        //약정금액
			$("#TB08031S_mPartRt").val(rowData.prtcRto);               //참가비율

		} else if (instncNm === "ernInfoInstance") {//수익자정보

			$("#TB08031S_ernInfo_sn").val(rowData.sn);                 //일련번호
			$("#TB08031S_ernInfo_erlmSeq").val(rowData.erlmSeq);       //등록순번

			$("#TB08031S_I051_2").val(rowData.ibStlnDcd);              //구분
			$("#TB08031S_ernCorpNm").val(rowData.entpNm);              //기관명
			$("#TB08031S_ernAgrAmt").val(comma(rowData.crdtProvLmtAmt));      //약정금액
			$("#TB08031S_ernPartRt").val(rowData.prtcRto);             //참가비율

		} else if (instncNm === "busiInfoInstance") {//관련사업정보
			$("#TB08031S_busiInfo_sn").val(rowData.sn);                   //일련번호
			$("#TB08031S_busiInfo_erlmSeq").val(rowData.erlmSeq);         //등록순번

			$("#TB08031S_relt_ibDealNo").val(rowData.reltDealNo);         //Deal번호
			$("#TB08031S_relt_ibDealNm").val(rowData.dealNm);             //Deal명
			$("#TB08031S_busiPrcrAmt").val(comma(rowData.allInvAmt));     //총조달금액
			$("#TB08031S_busiPtnAmt").val(comma(rowData.thcoPtciAmt));    //당사참여금액

			var thcoPtciAmtDcsnYn = rowData.thcoPtciAmtDcsnYn;            // 당사참여확정여부

			if (thcoPtciAmtDcsnYn === "Y") {
				$("#TB08031S_thcoPtciAmtDcsnY").prop("checked", true);
			} else {
				$("#TB08031S_thcoPtciAmtDcsnN").prop("checked", true);
			}
		} else if (instncNm === "invstBzscalInstance") {//투자기업목록

			$("#TB08031S_invstBzscal_sn").val(rowData.sn);              //일련번호
			$("#TB08031S_invstBzscal_erlmSeq").val(rowData.erlmSeq);    //등록순번

			var stdrYm = rowData.stdrYm;

			$("#TB08031S_fndNm").val(rowData.fndNm);                            //펀드명
			$("#TB08031S_bsnmNo").val(rowData.bzno);                            //사업자등록번호
			$("#TB08031S_bcncNm").val(rowData.trOthrNm);                        //거래상대방명
			$("#TB08031S_invstBzscalCorpNo").val(rowData.crno);                 //법인등록번호
			$("#TB08031S_indTypNm").val(rowData.bztpNm);                        //업종
			$("#TB08031S_blgtCntyNm").val(rowData.ntnNm);                       //소속국가명
			$("#TB08031S_bitrYm").val(stdrYm.replace(/^(\d{4})(\d{2})$/, "$1-$2"));                      //기준년월
			$("#TB08031S_F009").val(rowData.fndDcd);                            //펀드구분
			$("#TB08031S_F010").val(rowData.sctsFndTpDcd);                      //펀드유형상세
			$("#invstBzscal_datepicker1").val(formatDate(rowData.pchsDt));      //취득일자
			$("#TB08031S_acqstAmt").val(comma(rowData.dealAmt));                //취득가액
			$("#TB08031S_acbkAmt").val(comma(rowData.bkpr));                    //장부가액
			$("#TB08031S_coAmt").val(comma(rowData.asesBal));                   //평가금액
			$("#TB08031S_insRvn").val(rowData.intlErnRt);                       //순내부수익률

		} else if (instncNm === "asstWrkngInfoInstance") {//자산운용사정보

			$("#TB08031S_asstWrkngInfo_sn").val(rowData.sn);              //일련번호
			$("#TB08031S_asstWrkngInfo_erlmSeq").val(rowData.erlmSeq);    //등록순번

			$("#TB08031S_asstWrkngInfo_ardyBzepNo").val(rowData.mgcoMngmNo);      //기업체번호
			$("#TB08031S_asstWrkngInfo_bzepName").val(rowData.entpNm);            //기업체명
			$("#TB08031S_asstWrkngInfo_crno").val(rowData.crno);                  //법인등록번호
			$("#TB08031S_asstWrkngInfo_rnbn").val(rowData.rnbn);                  //사업자번호
			$("#TB08031S_asstWrkngInfo_estDt").val(formatDate(rowData.estDt));                //설립일
			$("#TB08031S_asstWrkngInfo_stffNum").val(comma(rowData.stffNum));            //임직원수
			$("#TB08031S_asstWrkngInfo_oprtHnfNum").val(comma(rowData.oprtHnfNum));      //운용인력수

		} else if (instncNm === "admsAsstInfoInstance") {//편입자산정보

			$("#TB08031S_admsAsstInfo_sn").val(rowData.sn);                        //일련번호
			$("#TB08031S_admsAsstInfo_erlmSeq").val(rowData.erlmSeq);              //등록순번

			$("#TB08031S_I038").val(rowData.invFnnInvTyDcd);                       //투자금융투자유형코드
			$("#TB08031S_invstWeight").val(rowData.admsAsstGrntErnRt);             //편입자산보장수익율
			$("#TB08031S_admsAmt").val(rowData.admsAsstAcbkAcqAmt);                //편입자산장부취득금액
			$("#TB08031S_admsAsstNm").val(rowData.admsAsstItmNm);                  //편입자산종목명


		}
	}

	function gridInfoRst(instncNm) {

		if (instncNm === "bsnsPartInfoInstance") {//사업참가자정보
			$("#TB08031S_P001").val("");                   //참가자관계구분코드
			$("#TB08031S_partCorpNm").val("");             //업체명
			$("#TB08031S_dtlsCorpNo").val("");             //법인등록번호
			$("#TB08031S_bsnsRgstNo").val("");             //사업자등록번호
			$("#TB08031S_rprstPNm").val("");               //대표자명
			$("#TB08031S_bsnsPartInfo_sn").val("");        //순번
			$("#TB08031S_bsnsPartInfo_erlmSeq").val("");   //등록순번

		} else if (instncNm === "bsnsForecastInstance") {//사업주요전망
			$("#TB08031S_exptDt").val("");                 //예정일자
			$("#TB08031S_pfrmDt").val("");                 //이행일자
			$("#TB08031S_pfrmN").prop("checked", true);    //이행여부
			$("#TB08031S_mainCntnt").val("");              //주요일정내용
			$("#TB08031S_bsnsForecast_sn").val("");        //일련번호
			$("#TB08031S_bsnsForecast_erlmSeq").val("");   //등록순번

		} else if (instncNm === "bondProtInfoInstance") {//채권보전주요약정

			$("#TB08031S_B007").val("");                      // 채권보전구분
			$("#TB08031S_bondPfrmN").prop("checked", true);   // 재무약정사항대상여부
			$("#TB08031S_dtlsCntnt").val("");                 // 주요약정사항내용
			$("#TB08031S_bondProtInfo_sn").val("");           //일련번호
			$("#TB08031S_bondProtInfo_erlmSeq").val("");      //등록순번

		} else if (instncNm === "cchInfoInstance") {//조건변경이력

			$("#TB08031S_cchInfo_sn").val("");              //일련번호
			$("#TB08031S_cchInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_cndtMainCntnt").val("");           //조건변경 주요내용
			$("#TB08031S_cch_empNo").val("");               //취급자 사번
			$("#TB08031S_cch_empNm").val("");               //취급자명
			$("#TB08031S_handlerID").val("");               //취급자 개인번호
			$("#TB08031S_rcgDt").val("");                   //승인일자
			$("#TB08031S_cmplDt").val("");                  //시행일자
			$("#TB08031S_rcgDocNo").val("");                //조건변경문번호내용

		} else if (instncNm === "stlnInfoInstance") {//대주단정보

			$("#TB08031S_stlnInfo_sn").val("");              //일련번호
			$("#TB08031S_stlnInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_I051_1").val("");                   //구분
			$("#TB08031S_mCorpNm").val("");                  //기관명
			$("#TB08031S_mAgrAmt").val("0");                 //약정금액
			$("#TB08031S_mPartRt").val("0");                 //참가비율

		} else if (instncNm === "ernInfoInstance") {//수익자정보

			$("#TB08031S_ernInfo_sn").val("");                //일련번호
			$("#TB08031S_ernInfo_erlmSeq").val("");           //등록순번

			$("#TB08031S_I051_2").val("");                    //구분
			$("#TB08031S_ernCorpNm").val("");                 //기관명
			$("#TB08031S_ernAgrAmt").val("0");                //약정금액
			$("#TB08031S_ernPartRt").val("0");                //참가비율

		} else if (instncNm === "busiInfoInstance") {//관련사업정보

			$("#TB08031S_busiInfo_sn").val("");                //일련번호
			$("#TB08031S_busiInfo_erlmSeq").val("");           //등록순번

			$("#TB08031S_relt_ibDealNo").val("");              //Deal번호
			$("#TB08031S_relt_ibDealNm").val("");              //Deal명
			$("#TB08031S_busiPrcrAmt").val("0");               //총조달금액
			$("#TB08031S_busiPtnAmt").val("0");                //당사참여금액
			$("#TB08031S_thcoPtciAmtDcsnN").prop("checked", true);   // 당사참여확정여부

		} else if (instncNm === "invstBzscalInstance") {//투자기업목록

			$("#TB08031S_invstBzscal_sn").val("");              //일련번호
			$("#TB08031S_invstBzscal_erlmSeq").val("");         //등록순번

			$("#TB08031S_fndNm").val("");                       //펀드명
			$("#TB08031S_bsnmNo").val("");                      //사업자등록번호
			$("#TB08031S_bcncNm").val("");                      //거래상대방명
			$("#TB08031S_invstBzscalCorpNo").val("");           //법인등록번호
			$("#TB08031S_indTypNm").val("");                    //업종
			$("#TB08031S_blgtCntyNm").val("");                  //소속국가명
			$("#TB08031S_bitrYm").val("");                      //기준년월
			$("#TB08031S_F009").val("");                        //펀드구분
			$("#TB08031S_F010").val("");                        //펀드유형상세
			$("#invstBzscal_datepicker1").val("");              //취득일자
			$("#TB08031S_acqstAmt").val("0");                   //취득가액
			$("#TB08031S_acbkAmt").val("0");                    //장부가액
			$("#TB08031S_coAmt").val("0");                      //평가금액
			$("#TB08031S_insRvn").val("0.00");                  //순내부수익률

		} else if (instncNm === "asstWrkngInfoInstance") {//자산운용사정보

			$("#TB08031S_asstWrkngInfo_sn").val("");              //일련번호
			$("#TB08031S_asstWrkngInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_asstWrkngInfo_ardyBzepNo").val("");      //기업체번호
			$("#TB08031S_asstWrkngInfo_bzepName").val("");        //기업체명
			$("#TB08031S_asstWrkngInfo_crno").val("");            //법인등록번호
			$("#TB08031S_asstWrkngInfo_rnbn").val("");            //사업자번호
			$("#TB08031S_asstWrkngInfo_estDt").val("");           //설립일
			$("#TB08031S_asstWrkngInfo_stffNum").val("0");        //임직원수
			$("#TB08031S_asstWrkngInfo_oprtHnfNum").val("0");     //운용인력수

		} else if (instncNm === "admsAsstInfoInstance") {//편입자산정보

			$("#TB08031S_admsAsstInfo_sn").val("");               //일련번호
			$("#TB08031S_admsAsstInfo_erlmSeq").val("");          //등록순번

			$("#TB08031S_I038").val("");                          //투자금융투자유형코드
			$("#TB08031S_invstWeight").val("0");                  //편입자산보장수익율
			$("#TB08031S_admsAmt").val("0");                      //편입자산장부취득금액
			$("#TB08031S_admsAsstNm").val("");                    //편입자산종목명

		} else if (instncNm === "All") {

			$("#TB08031S_P001").val("");                   //참가자관계구분코드
			$("#TB08031S_partCorpNm").val("");             //업체명
			$("#TB08031S_dtlsCorpNo").val("");             //법인등록번호
			$("#TB08031S_bsnsRgstNo").val("");             //사업자등록번호
			$("#TB08031S_rprstPNm").val("");               //대표자명
			$("#TB08031S_bsnsPartInfo_sn").val("");        //순번
			$("#TB08031S_bsnsPartInfo_erlmSeq").val("");   //등록순번

			$("#TB08031S_exptDt").val("");                 //예정일자
			$("#TB08031S_pfrmDt").val("");                 //이행일자
			$("#TB08031S_pfrmN").prop("checked", true);    //이행여부
			$("#TB08031S_mainCntnt").val("");              //주요일정내용
			$("#TB08031S_bsnsForecast_sn").val("");        //일련번호
			$("#TB08031S_bsnsForecast_erlmSeq").val("");   //등록순번


			$("#TB08031S_B007").val("");                      // 채권보전구분
			$("#TB08031S_bondPfrmN").prop("checked", true);   // 재무약정사항대상여부
			$("#TB08031S_dtlsCntnt").val("");                 // 주요약정사항내용
			$("#TB08031S_bondProtInfo_sn").val("");           //일련번호
			$("#TB08031S_bondProtInfo_erlmSeq").val("");      //등록순번


			$("#TB08031S_cchInfo_sn").val("");              //일련번호
			$("#TB08031S_cchInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_cndtMainCntnt").val("");           //조건변경 주요내용
			$("#TB08031S_cch_empNo").val("");               //취급자 사번
			$("#TB08031S_cch_empNm").val("");               //취급자명
			$("#TB08031S_handlerID").val("");               //취급자 개인번호
			$("#TB08031S_rcgDt").val("");                   //승인일자
			$("#TB08031S_cmplDt").val("");                  //시행일자
			$("#TB08031S_rcgDocNo").val("");                //조건변경문번호내용

			$("#TB08031S_stlnInfo_sn").val("");              //일련번호
			$("#TB08031S_stlnInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_I051_1").val("");                   //구분
			$("#TB08031S_mCorpNm").val("");                  //기관명
			$("#TB08031S_mAgrAmt").val("0");                 //약정금액
			$("#TB08031S_mPartRt").val("0");                 //참가비율


			$("#TB08031S_ernInfo_sn").val("");                //일련번호
			$("#TB08031S_ernInfo_erlmSeq").val("");           //등록순번

			$("#TB08031S_I051_2").val("");                    //구분
			$("#TB08031S_ernCorpNm").val("");                 //기관명
			$("#TB08031S_ernAgrAmt").val("0");                //약정금액
			$("#TB08031S_ernPartRt").val("0");                //참가비율


			$("#TB08031S_busiInfo_sn").val("");                //일련번호
			$("#TB08031S_busiInfo_erlmSeq").val("");           //등록순번

			$("#TB08031S_relt_ibDealNo").val("");              //Deal번호
			$("#TB08031S_relt_ibDealNm").val("");              //Deal명
			$("#TB08031S_busiPrcrAmt").val("0");               //총조달금액
			$("#TB08031S_busiPtnAmt").val("0");                //당사참여금액
			$("#TB08031S_thcoPtciAmtDcsnN").prop("checked", true);   // 당사참여확정여부

			$("#TB08031S_invstBzscal_sn").val("");              //일련번호
			$("#TB08031S_invstBzscal_erlmSeq").val("");         //등록순번

			$("#TB08031S_fndNm").val("");                       //펀드명
			$("#TB08031S_bsnmNo").val("");                      //사업자등록번호
			$("#TB08031S_bcncNm").val("");                      //거래상대방명
			$("#TB08031S_invstBzscalCorpNo").val("");           //법인등록번호
			$("#TB08031S_indTypNm").val("");                    //업종
			$("#TB08031S_blgtCntyNm").val("");                  //소속국가명
			$("#TB08031S_bitrYm").val("");                      //기준년월
			$("#TB08031S_F009").val("");                        //펀드구분
			$("#TB08031S_F010").val("");                        //펀드유형상세
			$("#invstBzscal_datepicker1").val("");              //취득일자
			$("#TB08031S_acqstAmt").val("0");                   //취득가액
			$("#TB08031S_acbkAmt").val("0");                    //장부가액
			$("#TB08031S_coAmt").val("0");                      //평가금액
			$("#TB08031S_insRvn").val("0.00");                  //순내부수익률

			$("#TB08031S_asstWrkngInfo_sn").val("");              //일련번호
			$("#TB08031S_asstWrkngInfo_erlmSeq").val("");         //등록순번

			$("#TB08031S_asstWrkngInfo_ardyBzepNo").val("");      //기업체번호
			$("#TB08031S_asstWrkngInfo_bzepName").val("");        //기업체명
			$("#TB08031S_asstWrkngInfo_crno").val("");            //법인등록번호
			$("#TB08031S_asstWrkngInfo_rnbn").val("");            //사업자번호
			$("#TB08031S_asstWrkngInfo_estDt").val("");           //설립일
			$("#TB08031S_asstWrkngInfo_stffNum").val("0");        //임직원수
			$("#TB08031S_asstWrkngInfo_oprtHnfNum").val("0");     //운용인력수


			$("#TB08031S_admsAsstInfo_sn").val("");               //일련번호
			$("#TB08031S_admsAsstInfo_erlmSeq").val("");          //등록순번

			$("#TB08031S_I038").val("");                          //투자금융투자유형코드
			$("#TB08031S_invstWeight").val("0");                  //편입자산보장수익율
			$("#TB08031S_admsAmt").val("0");                      //편입자산장부취득금액
			$("#TB08031S_admsAsstNm").val("");                    //편입자산종목명

		}
	}


	//parameter 세팅 (너무 길어서 따로 뺌)
	function paramSett() {

		var paramData = {};

		//사업 기본정보
		var dealNo = $("#TB08031S_ibDealNo").val();                               //딜번호
		var crno = $("#TB08031S_corpNo").val();                                   //법인등록번호
		var busiNm = $("#TB08031S_bsnsNm").val();                                 //사업명

		var invFnnMngmBusiDcd = $("#TB08031S_invbnkAmnBzCd").val();               //사업구분
		var invFnnMngnBusiDtlDcd = $("#TB08031S_I021").val();                     //사업구분 상세
		var invFnnMmngPrgSttsCd = $("#TB08031S_I011").val();                      //진행상태
		var crryCd = $("#TB08031S_I027").val();                                   //통화코드
		var totPrcrAmt = $("#TB08031S_prcrAmt").val().replaceAll(",", "");                            //총조달금액
		var mainBondMtncCnts = $("#TB08031S_bondProt").val();                     //주요채권보전내용
		var ivtgShdnRsnCnts = $("#TB08031S_rvwStRsn").val();                      //검토중단사유내용
		var thcoRlDcd = $("#TB08031S_T002").val();                                //당사역할구분
		var thcoMdtnAmt = $("#TB08031S_thcoRlAmt").val().replaceAll(",", "");                         //당사주선금액
		var thcoPtciAmt = $("#TB08031S_thcoPtnAmt").val().replaceAll(",", "");                        //당사참여금액
		var invstRvnRtDcd = $('#TB08031S_I033').val();                            //투자수익금리구분코드
		var stdrIntrtKndCd = $('#TB08031S_S003').val();                           //기준금리종류코드
		var stdrIntrt = $("#TB08031S_BitrKindCdInput").val().replaceAll(",", "");                     //기준금리
		var addIntrt = $('#TB08031S_preRt').val().replaceAll(",", "");                                //가산금리
		var chrrEmpno = $("#TB08031S_charge_empNo").val();                        //담당자 사원번호               
		var busiNm = $("#TB08031S_bsnsNm").val();                                 //사업명
		var mgcoNm = $("#TB08031S_corpNm").val();                                 //업체명                     
		var goalErnRt = $("#TB08031S_tgtRvn").val();                              //목표수익율
		var rmEmpno = $("#TB08031S_rm_empNo").val();                              //RM사원번호
		var busiCnts = $("#bsnsCntnt").val();                                     //사업내용


		if (invFnnMngmBusiDcd === "01") {                         // 부동산

			var guasMrtgYn = $("input[name=TB08031S_rlesWarrMrtgYN]:checked").val();  //보증서 담보 여부
			var efceMbdyDcd = $("#TB08031S_C014").val();                              //시행주체구분코드
			var rdmpCpltYn = $(
				"input[name=TB08031S_rdmpCpltYn]:checked"
			).val();                                                                  //상환완료여부
			var busiLcsiCpltYn = $(
				"input[name=TB08031S_rlesOwnPLcsiCpltYN]:checked"
			).val();                                                                  //사업인/허가완료여부
			var landOwnrsEnsuYn = $(
				"input[name=TB08031S_rlesLandPchsCpltYN]:checked"
			).val();                                                                  //토지소유권확보여부
			var fndsMngmTrgtYn = $(
				"input[name=TB08031S_rlesFndsMngmTrgtYN]:checked"
			).val();                                                                  //자금관리대상여부
			var cnrStrtDt = $("#TB08031S_csstPrarYm").val().replaceAll("-", "");                          //공사시작일자
			var cnrEndDt = $("#TB08031S_cnfnPrarYm").val().replaceAll("-", "");                           //공사종료일자
			var slltStrtDt = $("#TB08031S_slltPrarYm").val().replaceAll("-", "");                         //분양예정일자
			var bzplAddr = $("#TB08031S_busiArea").val();                             //사업장주소 
			var bsnsAreaCd = $("#TB08031S_B011").val();                               //사업지역코드
			var busiSiteSqms = $("#TB08031S_busiSiteSqms").val().replaceAll(",", "");                     //사업부지면적
			var siteSqms = $("#TB08031S_busiSiteAcre").val().replaceAll(",", "");                         //사업부지(평)
			var busiArRt = $('#TB08031S_arRt').val().replaceAll(",", "");                                 //사업부지용적율
			var busiTtlSqms = $("#TB08031S_Sqms").val().replaceAll(",", "");                              //사업연면적
			var ttlSqms = $("#TB08031S_SqmsP").val().replaceAll(",", "");                                 //연면적 
			var busiBldngLndrt = $("#TB08031S_far").val().replaceAll(",", "");                            //사업건폐율
			var eprzSclDcd = $("#TB08031S_B019").val();                               //기업규모구분코드
			var fcltSclWidhCtns = $("#TB08031S_fcltScal").val();                      //시설규모너비내용
			var resiEcoCtns = $("#TB08031S_resiEco").val();                           //주거환경내용
			var crdtRifcDcd = $("#TB08031S_C010").val();                              //신용보강장치구분코드
			var crdtRifcDvcNm = $("#TB08031S_crdtEhcmntCntnt").val();                 //신용보강내용
			var mngmCndFlflYn = $(
				"input[name=rlesCondComplyYN]:checked"
			).val();                                                                  //관리조건이행여부
			var bondTrnsYn = $(
				"input[name=rlesBondTrnYN]:checked"
			).val();                                                                  //채권이관여부
			var fnnrCtrcMttrTrgtYn = $(
				"input[name=rlesCmmntMatYN]:checked"
			).val();                                                                  //재무약정사항대상여부
			var brwrSpcYn = $(
				"input[name=rlesSpcYN]:checked"
			).val();                                                                  //차주SCP여부

			paramData = {
				dealNo: dealNo,
				crno: crno,
				invFnnMngmBusiDcd: invFnnMngmBusiDcd,
				invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
				invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
				crryCd: crryCd,
				totPrcrAmt: totPrcrAmt,
				mainBondMtncCnts: mainBondMtncCnts,
				ivtgShdnRsnCnts: ivtgShdnRsnCnts,
				thcoRlDcd: thcoRlDcd,
				thcoMdtnAmt: thcoMdtnAmt,
				thcoPtciAmt: thcoPtciAmt,
				invstRvnRtDcd: invstRvnRtDcd,
				stdrIntrtKndCd: stdrIntrtKndCd,
				stdrIntrt: stdrIntrt,
				addIntrt: addIntrt,
				chrrEmpno: chrrEmpno,
				busiNm: busiNm,
				mgcoNm: mgcoNm,
				goalErnRt: goalErnRt,
				rmEmpno: rmEmpno,
				busiCnts: busiCnts,
				rlesInfo: {
					guasMrtgYn: guasMrtgYn,
					efceMbdyDcd: efceMbdyDcd,
					rdmpCpltYn: rdmpCpltYn,
					busiLcsiCpltYn: busiLcsiCpltYn,
					landOwnrsEnsuYn: landOwnrsEnsuYn,
					fndsMngmTrgtYn: fndsMngmTrgtYn,
					cnrStrtDt: cnrStrtDt,
					cnrEndDt: cnrEndDt,
					slltStrtDt: slltStrtDt,
					bzplAddr: bzplAddr,
					bsnsAreaCd: bsnsAreaCd,
					busiSiteSqms: busiSiteSqms,
					siteSqms: siteSqms,
					busiArRt: busiArRt,
					busiTtlSqms: busiTtlSqms,
					ttlSqms: ttlSqms,
					busiBldngLndrt: busiBldngLndrt,
					eprzSclDcd: eprzSclDcd,
					fcltSclWidhCtns: fcltSclWidhCtns,
					resiEcoCtns: resiEcoCtns,
					crdtRifcDcd: crdtRifcDcd,
					crdtRifcDvcNm: crdtRifcDvcNm,
					mngmCndFlflYn: mngmCndFlflYn,
					bondTrnsYn: bondTrnsYn,
					fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
					brwrSpcYn: brwrSpcYn
				}
			}
			return paramData;

		} else if (invFnnMngmBusiDcd === "02") {                   // 인프라

			var invFnnBusiWyDcd = $("#TB08031S_B013").val();                            //사업방식
			var busiSclCntn = $("#TB08031S_bsnsScal").val();                            //사업규모
			var busiLcsiDt = $("#TB08031S_bsnsLicYm").val().replaceAll("-", "");                            //사업인허가일자
			var cnfnDt = $("#TB08031S_cmplYm").val().replaceAll("-", "");                                   //준공(예정)년월
			var mngtCmpNm = $("#TB08031S_leadAgency").val();                            //주무관청
			var cnrStrtDt = $("#TB08031S_conStYm").val().replaceAll("-", "");           //공사시작일자
			var cnrEndDt = $("#TB08031S_conEndYm").val().replaceAll("-", "");           //공사종료일자
			//건설기간
			var oprtStrtDt = $("#TB08031S_opDurStYm").val().replaceAll("-", "");                            //운영시작년월
			var oprtEndDt = $("#TB08031S_opDurEndYm").val().replaceAll("-", "");                            //운영종료년월
			//운영기간
			var bzplAddr = $("#TB08031S_bsnsLoc").val();                                //사업장위치
			var lmtYn = $("input[name=infraSeLmtYN]:checked").val();                    //SE한도대상여부
			var invstAmt = $("#TB08031S_invstAmt").val().replaceAll(",", "");                               //총투자비==투자금액
			var busiRvoDcd = $("#TB08031S_B012").val();                                 //사업수주구분코드
			var slfCpta = $("#TB08031S_equity").val().replaceAll(",", "");                                  //자기자본
			var prorLoanAmt = $("#TB08031S_priLoan").val().replaceAll(",", "");                             //선순위대출
			var bkbnLoanAmt = $("#TB08031S_subLoan").val().replaceAll(",", "");                             //후순위대출
			var apvlYn = $("input[name=infraUseApvlYN]:checked").val();                 //사용승인여부
			var brwrSpcYn = $("input[name=infraSpcYN]:checked").val();                  //차주SPC여부
			var mngmCndFlflYn = $("input[name=condComplyYN]:checked").val();            //관리조건이행여부
			var bondTrnsYn = $("input[name=infraBondTraYN]:checked").val();             //채권이관여부
			var fnnrCtrcMttrTrgtYn = $("input[name=infraCmmntMatYN]:checked").val();    //주요(재무)약정사항

			paramData = {
				dealNo: dealNo,
				crno: crno,
				invFnnMngmBusiDcd: invFnnMngmBusiDcd,
				invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
				invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
				crryCd: crryCd,
				totPrcrAmt: totPrcrAmt,
				mainBondMtncCnts: mainBondMtncCnts,
				ivtgShdnRsnCnts: ivtgShdnRsnCnts,
				thcoRlDcd: thcoRlDcd,
				thcoMdtnAmt: thcoMdtnAmt,
				thcoPtciAmt: thcoPtciAmt,
				invstRvnRtDcd: invstRvnRtDcd,
				stdrIntrtKndCd: stdrIntrtKndCd,
				stdrIntrt: stdrIntrt,
				addIntrt: addIntrt,
				chrrEmpno: chrrEmpno,
				busiNm: busiNm,
				mgcoNm: mgcoNm,
				goalErnRt: goalErnRt,
				rmEmpno: rmEmpno,
				busiCnts: busiCnts,
				infraInfo: {
					invFnnBusiWyDcd: invFnnBusiWyDcd,
					busiSclCntn: busiSclCntn,
					busiLcsiDt: busiLcsiDt,
					cnfnDt: cnfnDt,
					mngtCmpNm: mngtCmpNm,
					cnrStrtDt: cnrStrtDt,
					cnrEndDt: cnrEndDt,
					oprtStrtDt: oprtStrtDt,
					oprtEndDt: oprtEndDt,
					bzplAddr: bzplAddr,
					lmtYn: lmtYn,
					invstAmt: invstAmt,
					busiRvoDcd: busiRvoDcd,
					slfCpta: slfCpta,
					prorLoanAmt: prorLoanAmt,
					bkbnLoanAmt: bkbnLoanAmt,
					apvlYn: apvlYn,
					brwrSpcYn: brwrSpcYn,
					mngmCndFlflYn: mngmCndFlflYn,
					bondTrnsYn: bondTrnsYn,
					fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn
				}
			}
			return paramData;

		} else if (invFnnMngmBusiDcd === "03") {                   // M&A

			var undwHglmWyDcd = $("#TB08031S_U002").val();                            //상환방식
			var hnvrBusiDcd = $("#TB08031S_U001").val();                              //인수사업구분
			var lmtTrYn = $("input[name=lmtTrYn]:checked").val();                     //한도거래여부
			var spnsrCtns = $("#TB08031S_spon").val();                                //후원자내용
			var undwMrtgCtns = $("#TB08031S_mrtg").val();                             //인수담보내용

			var gridData = udwrtPaiBzscalInfoInstance.getData();            //인수대상 기업정보 그리드 데이터
			var udwrtPaiBzscalInfo = [];    //인수대상 기업정보

			for (let i = 0; i < gridData.length; i++) {
				var chkData = gridData[i];

				//if (chkData.isChked) {
					udwrtPaiBzscalInfo.push(chkData);
				//}
			}

			paramData = {
				dealNo: dealNo,
				crno: crno,
				invFnnMngmBusiDcd: invFnnMngmBusiDcd,
				invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
				invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
				crryCd: crryCd,
				totPrcrAmt: totPrcrAmt,
				mainBondMtncCnts: mainBondMtncCnts,
				ivtgShdnRsnCnts: ivtgShdnRsnCnts,
				thcoRlDcd: thcoRlDcd,
				thcoMdtnAmt: thcoMdtnAmt,
				thcoPtciAmt: thcoPtciAmt,
				invstRvnRtDcd: invstRvnRtDcd,
				stdrIntrtKndCd: stdrIntrtKndCd,
				stdrIntrt: stdrIntrt,
				addIntrt: addIntrt,
				chrrEmpno: chrrEmpno,
				busiNm: busiNm,
				mgcoNm: mgcoNm,
				goalErnRt: goalErnRt,
				rmEmpno: rmEmpno,
				busiCnts: busiCnts,
				maInfo: {
					undwHglmWyDcd: undwHglmWyDcd,
					hnvrBusiDcd: hnvrBusiDcd,
					lmtTrYn: lmtTrYn,
					spnsrCtns: spnsrCtns,
					undwMrtgCtns: undwMrtgCtns,
					udwrtPaiBzscalInfo: udwrtPaiBzscalInfo
				}
			}

			return paramData;
		} else if (invFnnMngmBusiDcd === "04") {                   // 국제투자

			var invFnnTrgtAsstDcd = $("#TB08031S_T005").val();                        //대상자산구분코드
			var brwrNtnNm = $("#TB08031S_brwrNtnNm").val();                           //차주국가명
			var totBusiCt = $("#TB08031S_totBusiAmt").val().replaceAll(',', '');      //총사업비
			var ntnNm = $("#TB08031S_hostCountry").val();                             //국가명
			var guasDvsnCtns = $("#TB08031S_ensrYn").val();                                 //보증서구분내용

			var prorRto = $("#TB08031S_prorRto").val().replaceAll(',', '');           //선순위비율
			var cerkRto = $("#TB08031S_cerkRto").val().replaceAll(',', '');           //중순위비율
			var bkbnRto = $("#TB08031S_bkbnRto").val().replaceAll(',', '');           //후순위/Equity비율
			var lesStrtDt = $("#TB08031S_lseStrtDt").val().replaceAll('-', '');       //리스시작일자
			var lesEndDt = $("#TB08031S_lseEndDt").val().replaceAll('-', '');         //리스종료일자
			var loanStrtDt = $("#TB08031S_loanStrtDt").val().replaceAll('-', '');     //대출시작일자
			var loanEndDt = $("#TB08031S_loanEndDt").val().replaceAll('-', '');       //대출종료일자

			var mnum = $("#TB08031S_lsePrd").val();                                   //개월수
			var loanMnum = $("#TB08031S_loanPrd").val();                              //대출기간개월수

			var dvcTyCnts = $("#TB08031S_amSt").val();                                //기종/선종
			var prdcCmpCnts = $("#TB08031S_proEprz").val();                           //제작사
			var mnfYr = $("#TB08031S_proYr").val();                                   //제조년도
			var invFnnLesKndDcd = $("#TB08031S_L006").val();                          //리스종류
			var lesMgcoNm = $("#TB08031S_lseMgco").val();                             //리스운용사
			var lesUserCnts = $("#TB08031S_lseUser").val();                           //리스이용자
			var brwrSpcYn = $("input[name=realEstateSpcYN]:checked").val();           //차주 SPC 여부
			var mngmCndFlflYn = $("input[name=realEstateCondComplyYN]:checked").val();//관리조건이행여부
			var bondTrnsYn = $("input[name=realEstateBondTrnYN]:checked").val();      //채권이관여부
			var fnnrCtrcMttrTrgtYn = $(
				"input[name=realEstateCmmntMatYN]:checked"
			).val();                                                                  // 재무약정사항대상여부

			paramData = {
				dealNo: dealNo,
				crno: crno,
				invFnnMngmBusiDcd: invFnnMngmBusiDcd,
				invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
				invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
				crryCd: crryCd,
				totPrcrAmt: totPrcrAmt,
				mainBondMtncCnts: mainBondMtncCnts,
				ivtgShdnRsnCnts: ivtgShdnRsnCnts,
				thcoRlDcd: thcoRlDcd,
				thcoMdtnAmt: thcoMdtnAmt,
				thcoPtciAmt: thcoPtciAmt,
				invstRvnRtDcd: invstRvnRtDcd,
				stdrIntrtKndCd: stdrIntrtKndCd,
				stdrIntrt: stdrIntrt,
				addIntrt: addIntrt,
				chrrEmpno: chrrEmpno,
				busiNm: busiNm,
				mgcoNm: mgcoNm,
				goalErnRt: goalErnRt,
				rmEmpno: rmEmpno,
				busiCnts: busiCnts,
				invstInfo: {
					invFnnTrgtAsstDcd: invFnnTrgtAsstDcd,
					brwrNtnNm: brwrNtnNm,
					totBusiCt: totBusiCt,
					ntnNm: ntnNm,
					guasDvsnCtns: guasDvsnCtns,
					prorRto: prorRto,
					cerkRto: cerkRto,
					bkbnRto: bkbnRto,
					lesStrtDt: lesStrtDt,
					lesEndDt: lesEndDt,
					loanStrtDt: loanStrtDt,
					loanEndDt: loanEndDt,
					mnum: mnum,
					loanMnum: loanMnum,
					dvcTyCnts: dvcTyCnts,
					prdcCmpCnts: prdcCmpCnts,
					mnfYr: mnfYr,
					invFnnLesKndDcd: invFnnLesKndDcd,
					lesMgcoNm: lesMgcoNm,
					lesUserCnts: lesUserCnts,
					brwrSpcYn: brwrSpcYn,
					mngmCndFlflYn: mngmCndFlflYn,
					bondTrnsYn: bondTrnsYn,
					fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn
				}
			}

			return paramData;
		} else if (invFnnMngmBusiDcd === "05") {                   // PEF/VC

			var invstStgyCtns = $("#TB08031S_invstGuidelines").val();                 //투자가이드라인
			var mngmCndFlflYn = $("input[name=pefVcInvstMngYN]:checked").val();       //관리조건이행
			var bondTrnsYn = $("input[name=TB08031S_pefVcBondTrnYN]:checked").val();  //채권이관여부
			var chrgEmpno = $("#TB08031S_tab2_empNo").val();                          //담당자

			paramData = {
				dealNo: dealNo,
				crno: crno,
				invFnnMngmBusiDcd: invFnnMngmBusiDcd,
				invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
				invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
				crryCd: crryCd,
				totPrcrAmt: totPrcrAmt,
				mainBondMtncCnts: mainBondMtncCnts,
				ivtgShdnRsnCnts: ivtgShdnRsnCnts,
				thcoRlDcd: thcoRlDcd,
				thcoMdtnAmt: thcoMdtnAmt,
				thcoPtciAmt: thcoPtciAmt,
				invstRvnRtDcd: invstRvnRtDcd,
				stdrIntrtKndCd: stdrIntrtKndCd,
				stdrIntrt: stdrIntrt,
				addIntrt: addIntrt,
				chrrEmpno: chrrEmpno,
				busiNm: busiNm,
				mgcoNm: mgcoNm,
				goalErnRt: goalErnRt,
				rmEmpno: rmEmpno,
				busiCnts: busiCnts,
				pefInfo: {
					invstStgyCtns: invstStgyCtns,
					mngmCndFlflYn: mngmCndFlflYn,
					bondTrnsYn: bondTrnsYn,
					chrgEmpno: chrgEmpno
				}
			}

			return paramData;
		}


	}



	// 딜 정보 저장
	function saveTabInfo() {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var bsnsNm = $("#TB08031S_bsnsNm").val();   // 사업명

		if (isEmpty(dealNo)) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Deal번호를 조회해주세요.",
				confirmButtonText: "확인",
			});
			return false; // 여기서 끊어야 함
		}

		if (isEmpty(bsnsNm)) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "[사업명]를 확인해주세요.",
				confirmButtonText: "확인",
			});
			return false; // 여기서 끊어야 함
		}

		// 딜번호와 사업명이 모두 있을 때만 businessFunction() 호출
		businessFunction();

		function businessFunction() {
			var dtoParam = paramSett();

			$.ajax({
				type: "POST",
				url: "/TB08031S/saveDealInfo",
				data: JSON.stringify(dtoParam),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: "success",
						title: "Success!",
						text: "문서정보를 저장하였습니다.",
						confirmButtonText: "확인",
					});
				},
				error: function(error, xhr, status) {

					Swal.fire({
						icon: "error",
						title: "Error!",
						text: "사업정보를 저장하는데 실패하였습니다.",
						confirmButtonText: "확인",
					});
				},
			});
		}
	}

	// 사업참가자정보 저장
	function bsnsPartInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val();     // 딜번호
		var dealSn = $("#TB08031S_sn").val();           // 딜 일련번호
		var sn = $("#TB08031S_bsnsPartInfo_sn").val();              //일련번호
		var erlmSeq = $("#TB08031S_bsnsPartInfo_erlmSeq").val();    //등록순번

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }

			if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 사업참가자정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}


		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();     // 딜번호
			var ptcnRelrDcd = $("#TB08031S_P001").val();    // 참가자관계
			var entpNm = $("#TB08031S_partCorpNm").val();   // 업체명
			var crno = $("#TB08031S_dtlsCorpNo").val();     // 법인등록번호
			var bzno = $("#TB08031S_bsnsRgstNo").val();     // 사업자등록번호
			var rpsrNm = $("#TB08031S_rprstPNm").val();     // 대표자명

			var sn = $("#TB08031S_bsnsPartInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_bsnsPartInfo_erlmSeq").val();    //등록순번

			if (mode === "save") {
				param = {
					dealNo: dealNo,
					ptcnRelrDcd: ptcnRelrDcd,
					entpNm: entpNm,
					crno: crno,
					bzno: bzno,
					rpsrNm: rpsrNm,
					mode: "save"
				};
			} else if (mode === "dlt") {
				param = {
					dealNo: dealNo,
					sn: sn,
					erlmSeq: erlmSeq,
					mode: "dlt"
				};
			}

			$.ajax({
				type: "POST",
				url: "/TB08031S/saveBsnsPartInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: "success",
						title: "Success!",
						text: "사업참가자정보를 저장하였습니다.",
						confirmButtonText: "확인",
					});
					gridInfoRst("bsnsPartInfoInstance");
					srchBsnsInfo();

				},
				error: function() {
					Swal.fire({
						icon: "error",
						title: "Error!",
						text: "사업참가자정보를 저장하는데 실패하였습니다.",
						confirmButtonText: "확인",
					});
				},
			});
		}
	}

	// 사업주요전망 저장
	function bsnsForecastBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var dealSn = $("#TB08031S_sn").val();

		if (mode === "save") {

			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }
			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_bsnsForecast_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_bsnsForecast_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 일정정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		}



		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();                               // 딜번호
			var prarDt = $("#TB08031S_exptDt").val().replaceAll('-', '');             // 예정일자
			var flflYn = $("input[name=pfrmYN]:checked").val();                       // 이행여부
			var flflDt = $("#TB08031S_pfrmDt").val().replaceAll('-', '');             // 이행일자
			var mainScxCtns = $("#TB08031S_mainCntnt").val();                         // 주요내용

			var sn = $("#TB08031S_bsnsForecast_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_bsnsForecast_erlmSeq").val();    //등록순번

			if (isEmpty(prarDt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "예정일자를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(flflDt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "이행일자를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (!$(`input[name=pfrmYN]:checked`).length) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "이행여부를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(mainScxCtns)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "주요일정내용을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";
					param = {
						dealNo: dealNo,
						prarDt: prarDt,
						flflYn: flflYn,
						flflDt: flflDt,
						mainScxCtns: mainScxCtns,
						mode: mode
					}

				} else if (mode === "dlt") {
					msg = "삭제";
					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}

				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveBsnsForecast",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "일정정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("bsnsForecastInstance");
						srchBsnsInfo();
					},

					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "일정정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}


	// 채권보전주요약정 저장
	function bondProtInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var dealSn = $("#TB08031S_sn").val();       // 딜 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_bondProtInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_bondProtInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 채권보전 기본정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}



		function businessFunction(mode) {
			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();                                    // 딜번호
			var bondProtCcd = $("#TB08031S_B007").val();                                   // 채권보전구분
			var fnnrCtrcMttrTrgtYn = $("input[name=TB08031S_bondPfrmYN]:checked").val();   // 재무약정사항대상여부
			var mainCtrcMttrCnts = $("#TB08031S_dtlsCntnt").val();                         // 주요약정사항내용

			var sn = $("#TB08031S_bondProtInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_bondProtInfo_erlmSeq").val();    //등록순번

			if (isEmpty(bondProtCcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "채권보전구분을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (!$(`input[name=TB08031S_bondPfrmYN]:checked`).length) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "이행여부를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(mainCtrcMttrCnts)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "상세내용을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {

				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						bondProtCcd: bondProtCcd,
						fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
						mainCtrcMttrCnts: mainCtrcMttrCnts,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}
				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveBondProtInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "채권보전주요약정을 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});
						gridInfoRst("bondProtInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "채권보전주요약정을 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}

		}
	}

	// 조건변경이력 저장
	function cchInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var dealSn = $("#TB08031S_sn").val();       // 딜 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_cchInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_cchInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 조건변경내역을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}


		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();            // 딜번호
			var sn = $("#TB08031S_cchInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_cchInfo_erlmSeq").val();    //등록순번

			var cndChngMainCnts = $("#TB08031S_cndtMainCntnt").val();//조건변경 주요내용
			var prcsrEmpno = $("#TB08031S_cch_empNo").val();         //취급자 사번
			var prcsrTelNo = $("#TB08031S_handlerID").val();         //취급자 개인번호
			var apvlDt = $("#TB08031S_rcgDt").val().replaceAll('-', '');                 //승인일자
			var crotDt = $("#TB08031S_cmplDt").val().replaceAll('-', '');                //시행일자
			var cndChngDcmNoCnts = $("#TB08031S_rcgDocNo").val();    //조건변경문번호내용

			if (isEmpty(cndChngMainCnts)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "주요내용을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(apvlDt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "승인일자를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(crotDt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "시행일자를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(prcsrTelNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "취급자 개인번호를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(prcsrEmpno)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "취급자를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(cndChngDcmNoCnts)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "승인문서번호를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						cndChngMainCnts: cndChngMainCnts,
						prcsrEmpno: prcsrEmpno,
						prcsrTelNo: prcsrTelNo,
						apvlDt: apvlDt,
						crotDt: crotDt,
						cndChngDcmNoCnts: cndChngDcmNoCnts,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}
				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveCchInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "조건변경이력을 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("cchInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "조건변경이력을 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}

	// 대주단정보 저장
	function stlnInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var dealSn = $("#TB08031S_sn").val();       // 딜 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_stlnInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_stlnInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 대주단 정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {
			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();            // 딜번호
			var sn = $("#TB08031S_stlnInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_stlnInfo_erlmSeq").val();    //등록순번

			var ibStlnDcd = $("#TB08031S_I051_1").val();                              //투자금융대주구분코드
			var stlnErnDcd = "1";                                                     //대주/수익자 구분코드 1: 대주단 2: 수익자
			var entpNm = $("#TB08031S_mCorpNm").val();                              //업체명 === 기관명
			var crdtProvLmtAmt = $("#TB08031S_mAgrAmt").val().replaceAll(',', '');  //신용공여한도금액 === 약정금액
			var prtcRto = $("#TB08031S_mPartRt").val().replaceAll(',', '');         //참가바율

			if (isEmpty(ibStlnDcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "대주구분을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(entpNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "기관명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(crdtProvLmtAmt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "약정금액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(prtcRto)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "참가비율을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						ibStlnDcd: ibStlnDcd,
						stlnErnDcd: stlnErnDcd,
						entpNm: entpNm,
						crdtProvLmtAmt: crdtProvLmtAmt,
						prtcRto: prtcRto,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						stlnErnDcd: stlnErnDcd,
						mode: mode
					}
				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveStlnInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "대주단정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("stlnInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "대주단정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}

	// 수익자정보 저장
	function ernInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
		var dealSn = $("#TB08031S_sn").val();       // 딜 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_ernInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_ernInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 수익자 정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();            // 딜번호
			var sn = $("#TB08031S_ernInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_ernInfo_erlmSeq").val();    //등록순번

			var ibStlnDcd = $("#TB08031S_I051_2").val();                              //투자금융대주구분코드
			var stlnErnDcd = "2";                                                     //대주/수익자 구분코드 1: 대주단 2: 수익자
			var entpNm = $("#TB08031S_ernCorpNm").val();                              //업체명 === 기관명
			var crdtProvLmtAmt = $("#TB08031S_ernAgrAmt").val().replaceAll(',', '');  //신용공여한도금액 === 약정금액
			var prtcRto = $("#TB08031S_ernPartRt").val().replaceAll(',', '');         //참가바율

			if (isEmpty(ibStlnDcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "대주구분을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(entpNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "기관명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(crdtProvLmtAmt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "약정금액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(prtcRto)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "참가비율을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						ibStlnDcd: ibStlnDcd,
						stlnErnDcd: stlnErnDcd,
						entpNm: entpNm,
						crdtProvLmtAmt: crdtProvLmtAmt,
						prtcRto: prtcRto,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						stlnErnDcd: stlnErnDcd,
						mode: mode
					}
				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveErnInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "수익자정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("ernInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "수익자정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}

	// 관련사업정보 저장
	function reltBusiInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val();       // 딜번호
		var dealSn = $("#TB08031S_sn").val();             // 일련번호

		if (mode === "save") {

			if (sn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_busiInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_busiInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 관련사업 정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();             // 딜번호
			var sn = $("#TB08031S_busiInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_busiInfo_erlmSeq").val();    //등록순번

			var reltDealNo = $("#TB08031S_relt_ibDealNo").val();    //관련딜번호

			if (isEmpty(reltDealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "관련사업 Deal번호를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장"

					param = {
						dealNo: dealNo,
						reltDealNo: reltDealNo,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제"

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}
				}


				$.ajax({
					type: "POST",
					url: "/TB08031S/saveReltBusiInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "관련사업 정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("busiInfoInstance");
						srchBsnsInfo();
					},

					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "관련사업 정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}

		}
	}

	/* 투자기업목록 저장 */
	function invstEprzInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val();       // 딜번호
		var dealSn = $("#TB08031S_sn").val();             // 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }
			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_invstBzscal_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_invstBzscal_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 투자기업 목록을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();                // 딜번호
			var sn = $("#TB08031S_invstBzscal_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_invstBzscal_erlmSeq").val();    //등록순번

			var fndNm = $("#TB08031S_fndNm").val();                        //펀드명
			var bzno = $("#TB08031S_bsnmNo").val();                        //사업자등록번호
			var trOthrNm = $("#TB08031S_bcncNm").val();                    //거래상대방명
			var crno = $("#TB08031S_invstBzscalCorpNo").val();             //법인등록번호
			var bztpNm = $("#TB08031S_indTypNm").val();                    //업종
			var ntnNm = $("#TB08031S_blgtCntyNm").val();                   //소속국가명
			var stdrYm = $("#TB08031S_bitrYm").val().replaceAll('-', '');  //기준년월
			var fndDcd = $("#TB08031S_F009").val();                        //펀드구분
			var sctsFndTpDcd = $("#TB08031S_F010").val();                                 //펀드유형상세
			var pchsDt = $("#invstBzscal_datepicker1").val().replaceAll('-', '');         //취득일자
			var dealAmt = $("#TB08031S_acqstAmt").val().replaceAll(',', '');              //취득가액
			var bkpr = $("#TB08031S_acbkAmt").val().replaceAll(',', '');                  //장부가액
			var asesBal = $("#TB08031S_coAmt").val().replaceAll(',', '');                 //평가금액
			var intlErnRt = $("#TB08031S_insRvn").val().replaceAll(',', '');              //순내부수익률

			if (isEmpty(fndNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "펀드명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(bzno)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업자등록번호를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(trOthrNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "거래상대방명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(crno)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "법인등록번호를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(bztpNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "업종을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(ntnNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "소속국가명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(stdrYm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "기준년월 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(bztpNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "업종을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(fndDcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "펀드구분을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sctsFndTpDcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "펀드유형을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(pchsDt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "취득일자를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(dealAmt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "취득가액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(bkpr)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "장부가액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(asesBal)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "평가금액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(intlErnRt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "순내부수익률을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						fndNm: fndNm,
						bzno: bzno,
						trOthrNm: trOthrNm,
						crno: crno,
						bztpNm: bztpNm,
						ntnNm: ntnNm,
						stdrYm: stdrYm,
						fndDcd: fndDcd,
						sctsFndTpDcd: sctsFndTpDcd,
						pchsDt: pchsDt,
						dealAmt: dealAmt,
						bkpr: bkpr,
						asesBal: asesBal,
						intlErnRt: intlErnRt,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						stdrYm: stdrYm,
						mode: mode
					}
				}


				$.ajax({
					type: "POST",
					url: "/TB08031S/saveInvstEprzInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "투자기업정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("invstBzscalInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "투자기업정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}

	// 관련사업정보 가져오기
	function getReltDealInfo(dealNo) {
		var paramData = {
			dealNo: dealNo,
			sn: "",
		};
		// 비동기통신 요청
		$.ajax({
			type: "GET",
			url: "/TB03020S/getBscDealDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {

				// var busiInfo = data.enoPList;

				// if(busiInfo.length > 0){
				//   busiInfoInstance.setData(busiInfo);
				// }else{

				// }

				$("#TB08031S_busiPrcrAmt").val(comma(data.allInvAmt));       //총투자금액
				$("#TB08031S_busiPtnAmt").val(comma(data.thcoPtciAmt));      //당사참여금액

				var thcoPtciAmtDcsnYn = data.thcoPtciAmtDcsnYn;       //당사참여확정여부 

				// console.log(thcoPtciAmtDcsnYn);
				// console.log(data.allInvAmt);
				// console.log(data.thcoPtciAmt);

				if (thcoPtciAmtDcsnYn === "Y") {
					$("#TB08031S_thcoPtciAmtDcsnY").prop("checked", true);
				} else {
					$("#TB08031S_thcoPtciAmtDcsnYn").prop("checked", true);
				}



			},
			error: function() { },
		});
	}

	/* 관련사업정보 행삭제 */
	function delMenuRowReltDealInfo() {
		var rowNum = 1;

		$("#TB08031S_busiInfo tr").each(function() {
			var checkYn = $(this).find("td:eq(0)").find("input").is(":checked");

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find("td:eq(1)").text(rowNum);
				rowNum++;
			}
		});
	}

	// 편입자산정보 저장
	function admsAsstInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val();       // 딜번호
		var dealSn = $("#TB08031S_sn").val();             // 일련번호

		if (mode === "save") {
			// if (!isEmpty(dealNo)) {
			//   businessFunction(mode);
			// } else {
			//   Swal.fire({
			//     icon: "error",
			//     title: "Error!",
			//     text: "Deal번호를 조회해주세요.",
			//     confirmButtonText: "확인",
			//   });
			// }
			if (sn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_admsAsstInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_admsAsstInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 편입자산 정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {
			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();                 // 딜번호
			var sn = $("#TB08031S_admsAsstInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_admsAsstInfo_erlmSeq").val();    //등록순번

			var invFnnInvTyDcd = $("#TB08031S_I038").val();             //투자금융투자유형코드
			var admsAsstGrntErnRt = $("#TB08031S_invstWeight").val().replaceAll(',', '');   //편입자산보장수익율
			var admsAsstAcbkAcqAmt = $("#TB08031S_admsAmt").val().replaceAll(',', '');      //편입자산장부취득금액
			var admsAsstItmNm = $("#TB08031S_admsAsstNm").val();        //편입자산종목명

			if (isEmpty(invFnnInvTyDcd)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "투자유형을 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(admsAsstGrntErnRt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "수익율 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(admsAsstAcbkAcqAmt)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "편입금액을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(admsAsstItmNm)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "편입자산명을 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						invFnnInvTyDcd: invFnnInvTyDcd,
						admsAsstGrntErnRt: admsAsstGrntErnRt,
						admsAsstAcbkAcqAmt: admsAsstAcbkAcqAmt,
						admsAsstItmNm: admsAsstItmNm,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}
				}

				// console.log(JSON.stringify(param));

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveAdmsAsstInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "편입자산 정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("admsAsstInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "편입자산 정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}

		}
	}


	/* 자산운용사정보 저장 */
	function asstWrkngInfoBtnSave(mode) {
		var dealNo = $("#TB08031S_ibDealNo").val();       // 딜번호
		var dealSn = $("#TB08031S_sn").val();             // 일련번호

		if (mode === "save") {

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (dealSn === "0" || isEmpty(dealSn)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "사업 기본정보가 등록되지 않았습니다. 사업기본정보 등록 후 다시 시도해주세요",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}

		} else if (mode === "dlt") {
			var sn = $("#TB08031S_asstWrkngInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_asstWrkngInfo_erlmSeq").val();    //등록순번

			if (isEmpty(dealNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Deal번호를 조회해주세요.",
					confirmButtonText: "확인",
				});
			} else if (isEmpty(sn) || isEmpty(erlmSeq)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "삭제할 자산운용사 정보를 선택해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				businessFunction(mode);
			}
		}

		function businessFunction(mode) {

			var param = {};

			var dealNo = $("#TB08031S_ibDealNo").val();                  // 딜번호
			var sn = $("#TB08031S_asstWrkngInfo_sn").val();              //일련번호
			var erlmSeq = $("#TB08031S_asstWrkngInfo_erlmSeq").val();    //등록순번

			var mgcoMngmNo = $("#TB08031S_asstWrkngInfo_ardyBzepNo").val();                        //운용사관리번호 (== 기업체코드)

			if (isEmpty(mgcoMngmNo)) {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "기업체번호를 입력해주세요.",
					confirmButtonText: "확인",
				});
			} else {
				var msg;

				if (mode === "save") {
					msg = "저장";

					param = {
						dealNo: dealNo,
						mgcoMngmNo: mgcoMngmNo,
						mode: mode
					}
				} else if (mode === "dlt") {
					msg = "삭제";

					param = {
						dealNo: dealNo,
						sn: sn,
						erlmSeq: erlmSeq,
						mode: mode
					}
				}

				$.ajax({
					type: "POST",
					url: "/TB08031S/saveAsstOrtnInfo",
					data: JSON.stringify(param),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						Swal.fire({
							icon: "success",
							title: "Success!",
							text: "자산운용사정보를 " + msg + "하였습니다.",
							confirmButtonText: "확인",
						});

						gridInfoRst("asstWrkngInfoInstance");
						srchBsnsInfo();
					},
					error: function() {
						Swal.fire({
							icon: "error",
							title: "Error!",
							text: "자산운용사정보를 " + msg + "하는데 실패하였습니다.",
							confirmButtonText: "확인",
						});
					},
				});
			}
		}
	}

	function monthDiff_TB08031S(btnId) {

		var strtDtId = "#TB08031S_" + btnId + "StrtDt";
		var endDtId = "#TB08031S_" + btnId + "EndDt";
		var prdId = "#TB08031S_" + btnId + "Prd";

		if (isEmpty($(strtDtId).val()) || isEmpty($(endDtId).val())) {

			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "시작일자/종료일자를 입력해주세요.",
				confirmButtonText: "확인",
			});
			return false;

		} else {

			var monthDiffVal = monthDiff($(strtDtId).val().replaceAll('-', ''), $(endDtId).val().replaceAll('-', ''));
			$(prdId).val(monthDiffVal);

		}
	}

	return {
		loadInvbnkAmnBzCd: loadInvbnkAmnBzCd,
		srchBsnsInfo: srchBsnsInfo,
		setGridTimeOut: setGridTimeOut,
		bsnsPartInfoBtnSave: bsnsPartInfoBtnSave,
		bsnsForecastBtnSave: bsnsForecastBtnSave,
		bondProtInfoBtnSave: bondProtInfoBtnSave,
		cchInfoBtnSave: cchInfoBtnSave,
		stlnInfoBtnSave: stlnInfoBtnSave,
		delMenuRowReltDealInfo: delMenuRowReltDealInfo,
		reltBusiInfoBtnSave: reltBusiInfoBtnSave,
		admsAsstInfoBtnSave: admsAsstInfoBtnSave,
		invstEprzInfoBtnSave: invstEprzInfoBtnSave,
		asstWrkngInfoBtnSave: asstWrkngInfoBtnSave,
		saveTabInfo: saveTabInfo,
		ernInfoBtnSave: ernInfoBtnSave,
		getReltDealInfo: getReltDealInfo,
		addMenuRow: addMenuRow,
		dltMenuRow: dltMenuRow,
		monthDiff_TB08031S: monthDiff_TB08031S,
		gridInfoRst: gridInfoRst,
		btnReset: btnReset,
	};
})();
