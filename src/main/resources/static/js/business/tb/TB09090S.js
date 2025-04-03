

const TB09090Sjs = (function() {
	
	let mode;
	let rgstDt = new Date().getDate().toString();
	let pqObj;
	let grdSelect = {};
	let selectBox;
	// 확정상태변수
	let dcsn = {};
	let cpcData;
	let dptCd = "%";
	
	/*
	 *	Grid용 ColModelData 세팅
	 */
	function selectColModel(modelNum) {
	
		// cpc양식1
		const TB09090S_colCpc1 = [
			////////////////////////////////////////////////////////////
			//	분류
			////////////////////////////////////////////////////////////
	
			{
				title: "분류",
				align: "center",
				colModel: [
					{
						title: "항목",
						dataType: "int",
						dataIndx: "rownum",
						width: "10%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							result = (ui.rowIndx + 1).toString();
							return result;
						}
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	회사정보
			////////////////////////////////////////////////////////////
	
			{
				title: "회사정보",
				align: "center",
				colModel: [
					{
						title: "회사명",
						dataType: "string",
						dataIndx: "cmpNm",
						width: "10%",
						halign: "center",
						align: "left",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사"
							}
							return result;
						}
					},
					{
						title: "금융회사코드",
						dataType: "string",
						dataIndx: "fssCmpCd",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사코드"
							}
							return result;
						}
					},
					{
						title: "작성기준년월",
						dataType: "string",
						dataIndx: "stdrYm",
						width: "10%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result;
							return result = ui.cellData.slice(0, 4) + "-" + ui.cellData.slice(4, 6);
						}
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	공통항목
			////////////////////////////////////////////////////////////
			{
				title: "공통항목(모두기재)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	계약정보 ~ 신용보강
					////////////////////////////////////////////////////////////
					{
						title: "계약정보",
						align: "center",
						colModel: [
							{
								title: "계약명칭",
								dataType: "string",
								dataIndx: "prdtNm",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "계약일",
								dataType: "string",
								dataIndx: "ctrtDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								render: function (ui) {
									let result = getDateData(ui.cellData, "yyyymmdd", "-")
									return result;
								}
							},
							{
								title: "만기일",
	
								dataType: "string",
								dataIndx: "expDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								render: function (ui) {
									let result = getDateData(ui.cellData, "yyyymmdd", "-")
									return result;
								}
							},
							{
								title: "계약유형1 (유동성/신용공여형)",
								dataType: "string",
								dataIndx: "rptsCtrtTpCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "계약유형2 (매입약정 등)",
								dataType: "string",
								dataIndx: "rptsCtrtTpDetlCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R031
								},
								render: function (ui) {
									let fSel = grdSelect.R031.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "최초 약정금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "frsCtrcAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "현재 약정잔액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "eprzCrdlNowCtrcBlce",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "채무보증 수수료(금액)",
								dataType: "integer",
								dataIndx: "detGrteFee",
								format: "#,###",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "채무보증이행여부",
								dataType: "string",
								dataIndx: "detGrteFlflDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.D015
								},
								render: function (ui) {
									let fSel = grdSelect.D015.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 개발사업(PF)",
						align: "center",
						colModel: [
							{
								title: "PF 여부",
								dataType: "string",
								dataIndx: "pfThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P021
								},
								render: function (ui) {
									let fSel = grdSelect.P021.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형1(해당유형구분)",
								dataType: "string",
								dataIndx: "pfTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P024
								},
								render: function (ui) {
									let fSel = grdSelect.P024.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형2(분양유형구분)",
								dataType: "string",
								dataIndx: "pfSlltTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P017
								},
								render: function (ui) {
									let fSel = grdSelect.P017.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형3(수익유형구분)",
								dataType: "string",
								dataIndx: "pfErnTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P019
								},
								render: function (ui) {
									let fSel = grdSelect.P019.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 정보",
						align: "center",
						colModel: [
							{
								title: "기초자산 형태(대분류)",
								dataType: "string",
								dataIndx: "pfBssAsstLclsCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P014
								},
								render: function (ui) {
									let fSel = grdSelect.P014.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "기초자산 형태(소분류)",
								dataType: "string",
								dataIndx: "pfBssAsstSclsCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P015
								},
								render: function (ui) {
									let fSel = grdSelect.P015.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산유형(공통)",
								dataType: "string",
								dataIndx: "rlesTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R036
								},
								render: function (ui) {
									let fSel = grdSelect.R036.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산소재지",
								dataType: "string",
								dataIndx: "bssAsstLctpDcd",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.B023
								},
								render: function (ui) {
									let fSel = grdSelect.B023.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산소재지 우편번호",
								dataType: "string",
								dataIndx: "rlesLctpZpcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산 주소",
								dataType: "string",
								dataIndx: "lctpAddr",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "해외소재 국가 (회외인경우)",
								dataType: "string",
								dataIndx: "pfOvrsLctNtnCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P025
								},
								render: function (ui) {
									let fSel = grdSelect.P025.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "해외소재 도시 (회외인경우)",
								dataType: "string",
								dataIndx: "ovrsLctCtyNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "미분양관리지역해당여부(현재)",
								dataType: "string",
								dataIndx: "unsldThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.B023
								},
								render: function (ui) {
									let fSel = grdSelect.B023.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "피보증주체 & 유동화증권 정보",
						align: "center",
						colModel: [
							{
								title: "피보증주체",
								dataType: "string",
								dataIndx: "wrteMbdyNm",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "피보증주체 법인등록번호",
								dataType: "string",
								dataIndx: "wrteMbdyCrno",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 보증 여부",
								dataType: "string",
								dataIndx: "lqdzSctyGrteThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L011
								},
								render: function (ui) {
									let fSel = grdSelect.L011.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "유동화증권 명칭",
								dataType: "string",
								dataIndx: "lqdzSctyNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 종류",
								dataType: "string",
								dataIndx: "lqdzSctyKndCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L012
								},
								render: function (ui) {
									let fSel = grdSelect.L012.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "유동화증권 발행일자",
								dataType: "string",
								dataIndx: "lqdzSctyIsuDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								render: function (ui) {
									let result;
									if (!ui.cellData) {
										result;
									} else {
										result = getDateData(ui.cellData, "yyyymmdd", "-")
									}
									return result;
								}
							},
							{
								title: "유동화증권 액면금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "lqdzSctyParAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 발행금리",
								dataType: "integer",
								format: "#,###",
								dataIndx: "lqdzSctyIsuIntrt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "LTV",
						align: "center",
						colModel: [
							{
								title: "LTV(최초투자시점)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "frsInvPotLtvRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "LTV(작성기준일 현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "wrtnStdrDeLtvRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "LTV 산출방법",
								dataType: "string",
								dataIndx: "ltvOutputMthDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L008
								},
								render: function (ui) {
									let fSel = grdSelect.L008.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 가치 (value)",
						align: "center",
						colModel: [
							{
								title: "감정가 기준",
								dataType: "integer",
								format: "#,###",
								dataIndx: "aprsPrc",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양가(총매출액) 기준",
								dataType: "integer",
								format: "#,###",
								dataIndx: "totSlltAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "심사팀추정가 기준",
								dataType: "string",
								dataIndx: "jdgmTeamPrsmAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "변제순위 등",
						align: "center",
						colModel: [
							{
								title: "변제순위",
								dataType: "string",
								dataIndx: "pybkRankDcd",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P026
								},
								render: function (ui) {
									let fSel = grdSelect.P026.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "임대보증금(총액)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesRentGrteAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "우선순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "prfdRankAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "동순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sodrAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "후순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "bkbnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "신용보강",
						align: "center",
						colModel: [
							{
								title: "타사 신용보강",
								dataType: "string",
								dataIndx: "otcmCrdtRifcThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.O011
								},
								render: function (ui) {
									console.log(grdSelect.O011);
									let fSel = grdSelect.O011.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "타사 신용보강 수단",
								dataType: "string",
								dataIndx: "otcmCrdtRifcMnDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.O010
								},
								render: function (ui) {
									let fSel = grdSelect.O010.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "신용보강회사(1)",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(1) 법인등록번호",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(1) 기업신용등급",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2)",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2) 법인등록번호",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2) 기업신용등급",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	PF위험평가
			////////////////////////////////////////////////////////////
			{
				title: "PF위험평가(PF만 기재)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	PF시행정보 ~ 시장위험평가
					////////////////////////////////////////////////////////////
					{
						title: "PF시행정보",
						align: "center",
						colModel: [
							{
								title: "시행사",
								dataType: "string",
								dataIndx: "efceCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시행사 법인등록번호",
								dataType: "string",
								dataIndx: "efceCmpCrno",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF시행형태",
								dataType: "string",
								dataIndx: "pfEfceShpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P002
								},
								render: function (ui) {
									let fSel = grdSelect.P002.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(1) (사업승인 전/후)",
								dataType: "string",
								dataIndx: "pfBusiApvlStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P018
								},
								render: function (ui) {
									let fSel = grdSelect.P018.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(2) (착공 전/후)",
								dataType: "string",
								dataIndx: "pfCsstStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P023
								},
								render: function (ui) {
									let fSel = grdSelect.P023.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(3) (분양 전/후)",
								dataType: "string",
								dataIndx: "pfSlltStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P016
								},
								render: function (ui) {
									let fSel = grdSelect.P016.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(4) (준공 전/후)",
								dataType: "string",
								dataIndx: "pfCnfnStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P022
								},
								render: function (ui) {
									let fSel = grdSelect.P022.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "총사업비",
								dataType: "integer",
								format: "#,###",
								dataIndx: "totBusiAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "총매출액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rvnuAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "자기자본(equity)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "slfCpta",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "단위면적당(㎡) 분양가",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsSlltAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "중도금 상환비율",
								dataType: "integer",
								format: "#,###",
								dataIndx: "mdwyGoldRdmpRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양 또는 임대가능 총면적(㎡)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "allSqms",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
	
						]
					},
					{
						title: "수익형(상업용) 부동산 정보",
						align: "center",
						colModel: [
							{
								title: "예상 공실률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "estmEmrmRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 임대수익/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsEstmRentErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 임대비용/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsEstmRentCt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 순영업수익(NOI)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "estmPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "대주단 정보",
						align: "center",
						colModel: [
							{
								title: "PF대주단 총 대출금",
								dataType: "integer",
								format: "#,###",
								dataIndx: "pfStlnTotLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF대주단 참여기관 수",
								dataType: "integer",
								format: "#,###",
								dataIndx: "pfStlnPtciIsttNum",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF대주단 대출 만기일",
								dataType: "string",
								dataIndx: "pfStlnLoanExpDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대주기관",
								dataType: "string",
								dataIndx: "sq1StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq1StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq1StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대주기관",
								dataType: "string",
								dataIndx: "sq2StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq2StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq2StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대주기관",
								dataType: "string",
								dataIndx: "sq3StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq3StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq3StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대주기관",
								dataType: "string",
								dataIndx: "sq4StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq4StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq4StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대주기관",
								dataType: "string",
								dataIndx: "sq5StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq5StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq5StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "사업승인위험평가",
						align: "center",
						colModel: [
							{
								title: "사업승인 신청일 (인허가 신청일)",
								dataType: "string",
								dataIndx: "busiApvlRqsDt",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "토지매입률 (면적기준)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "landPchsRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "준공위험평가",
						align: "center",
						colModel: [
							{
								title: "책임준공확약 여부",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R037
								},
								render: function (ui) {
									let fSel = grdSelect.R037.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "책임준공확약 기관",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "책임준공확약 기관 법인등록번호",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "책임준공확약 기관 기업신용등급",
								dataType: "string",
								dataIndx: "rsplCnfnEprzCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 명칭",
								dataType: "string",
								dataIndx: "csucCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 법인등록번호",
								dataType: "string",
								dataIndx: "csucCmpCrno",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 기업신용등급",
								dataType: "string",
								dataIndx: "csucCmpEprzCrdtGrdCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "착공일",
								dataType: "string",
								dataIndx: "csstDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "준공일(사용승인일)",
								dataType: "string",
								dataIndx: "cnfnDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "계획공정률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "plnFairRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "실행공정률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "excFairRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "시장위험평가",
						align: "center",
						colModel: [
							{
								title: "분양률(분양가 기준)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "slltRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양개시일",
								dataType: "string",
								dataIndx: "slltOpngDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "입주율(분양가기준,작성기준현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "moinRt",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "Exit 분양률 (작성기준일 현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "exitSlltRt",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	Non-PF 위험평가
			////////////////////////////////////////////////////////////
			{
				title: "Non-PF 위험평가",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	주거용부동산 ~ 상업용(수익형)부동산
					////////////////////////////////////////////////////////////
					{
						title: "주거용부동산",
						align: "center",
						colModel: [
							{
								title: "전용면적",
								dataType: "integer",
								format: "#,###",
								dataIndx: "dvrSqms",
								width: "10%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "전용면적(㎡)당 단가",
								dataType: "integer",
								format: "#,###",
								dataIndx: "dvrSqmsUnAmt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "상업용(수익형)부동산",
						align: "center",
						colModel: [
							{
								title: "임대가능 총면적",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rentPsblTotSqms",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "공실률 ('20.6월말 현재')",
								dataType: "integer",
								format: "#,###",
								dataIndx: "emrmRt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "임대수익/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsRentErnAmt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "임대비용/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsRentCt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "순영업수익 (NOI)/연(자동계산)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq1YrlyPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
	
							{
								title: "순영업수익 (NOI)/연(회사제출)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq2YrlyPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산관련총대출이자(금융비용)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesTotLoanIntr",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산 관련 총대출 원리금",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesTotLoanPaiAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "Cap Rate",
								dataType: "integer",
								format: "#,###",
								dataIndx: "cptlRstrRt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	기타항목
			////////////////////////////////////////////////////////////
	
			{
				title: "기타항목",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	NCR 위험값 ~ 작성자 전화번호
					////////////////////////////////////////////////////////////
					{
						title: "NCR 위험값",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskVl",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "NCR 위험액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskAmt",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 이름",
						dataType: "string",
						dataIndx: "jobChrrNm",
						width: "15%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 부서",
						dataType: "string",
						dataIndx: "dprtCd",
						width: "15%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 전화번호",
						dataType: "string",
						dataIndx: "cplcCtns",
						width: "15%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
				]
			}
	
		];
	
		const TB09090S_colCpc2 = [
			////////////////////////////////////////////////////////////
			//	분류
			////////////////////////////////////////////////////////////
	
			{
				title: "분류",
				align: "center",
				colModel: [
					{
						title: "항목",
						dataType: "int",
						dataIndx: "rownum",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							result = (ui.rowIndx + 1).toString();
							return result;
						}
					}
				]
	
			},
			////////////////////////////////////////////////////////////
			//	회사정보
			////////////////////////////////////////////////////////////
	
			{
				title: "회사정보",
				align: "center",
				colModel: [
					{
						title: "회사명",
						dataType: "string",
						dataIndx: "cmpNm",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사"
							}
							return result;
						}
					},
					{
						title: "금융회사코드",
						dataType: "string",
						dataIndx: "fssCmpCd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사코드"
							}
							return result;
						}
					},
					{
						title: "작성기준년월",
						dataType: "string",
						dataIndx: "stdrYm",
						width: "10%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result;
							return result = ui.cellData.slice(0, 4) + "-" + ui.cellData.slice(4, 6);
						}
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	공통항목
			////////////////////////////////////////////////////////////
			{
				title: "공통항목(모두기재)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	계약정보 ~ 신용보강
					////////////////////////////////////////////////////////////
					{
						title: "계약정보",
						align: "center",
						colModel: [
							{
								title: "계약명칭",
								dataType: "string",
								dataIndx: "prdtNm",
								width: "20%",
								halign: "center",
								align: "left",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "계약일",
								dataType: "string",
								dataIndx: "ctrtDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								render: function (ui) {
									let result = getDateData(ui.cellData, "yyyymmdd", "-")
									return result;
								}
							},
							{
								title: "만기일",
								dataType: "string",
								dataIndx: "expDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								render: function (ui) {
									let result = getDateData(ui.cellData, "yyyymmdd", "-")
									return result;
								}
							},
							{
								title: "계약유형1 (유동성/신용공여형)",
								dataType: "string",
								dataIndx: "rptsCtrtTpCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R035
								},
								render: function (ui) {
									let fSel = grdSelect.R035.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "계약유형2 (매입약정 등)",
								dataType: "string",
								dataIndx: "rptsCtrtTpDetlCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R034
								},
								render: function (ui) {
									let fSel = grdSelect.R034.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "최초 약정금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "frsCtrcAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "현재 약정잔액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "eprzCrdlNowCtrcBlce",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "채무보증 수수료(금액)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "detGrteFee",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "채무보증이행여부",
								dataType: "string",
								dataIndx: "detGrteFlflDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.D015
								},
								render: function (ui) {
									let fSel = grdSelect.D015.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 개발사업(PF)",
						align: "center",
						colModel: [
							{
								title: "PF 여부",
								dataType: "string",
								dataIndx: "pfThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P024
								},
								render: function (ui) {
									let fSel = grdSelect.P024.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형1(해당유형구분)",
								dataType: "string",
								dataIndx: "pfTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P021
								},
								render: function (ui) {
									let fSel = grdSelect.P021.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형2(분양유형구분)",
								dataType: "string",
								dataIndx: "pfSlltTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P017
								},
								render: function (ui) {
									let fSel = grdSelect.P017.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF유형3(수익유형구분)",
								dataType: "string",
								dataIndx: "pfErnTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P019
								},
								render: function (ui) {
									let fSel = grdSelect.P019.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 정보",
						align: "center",
						colModel: [
							{
								title: "기초자산 형태(대분류)",
								dataType: "string",
								dataIndx: "pfBssAsstLclsCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P014
								},
								render: function (ui) {
									let fSel = grdSelect.P014.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "기초자산 형태(소분류)",
								dataType: "string",
								dataIndx: "pfBssAsstSclsCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P015
								},
								render: function (ui) {
									let fSel = grdSelect.P015.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산유형(공통)",
								dataType: "string",
								dataIndx: "rlesTpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R036
								},
								render: function (ui) {
									let fSel = grdSelect.R036.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산소재지",
								dataType: "string",
								dataIndx: "bssAsstLctpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.B023
								},
								render: function (ui) {
									let fSel = grdSelect.B023.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "부동산소재지 우편번호",
								dataType: "string",
								dataIndx: "rlesLctpZpcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산 주소",
								dataType: "string",
								dataIndx: "lctpAddr",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "해외소재 국가 (회외인경우)",
								dataType: "string",
								dataIndx: "pfOvrsLctNtnCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P025
								},
								render: function (ui) {
									let fSel = grdSelect.P025.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "해외소재 도시 (회외인경우)",
								dataType: "string",
								dataIndx: "ovrsLctCtyNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "미분양관리지역해당여부(현재)",
								dataType: "string",
								dataIndx: "unsldThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.U006
								},
								render: function (ui) {
									let fSel = grdSelect.U006.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "피보증주체 & 유동화증권 정보",
						align: "center",
						colModel: [
							{
								title: "피보증주체",
								dataType: "string",
								dataIndx: "wrteMbdyNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "피보증주체 법인등록번호",
								dataType: "string",
								dataIndx: "wrteMbdyCrno",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 보증 여부",
								dataType: "string",
								dataIndx: "lqdzSctyGrteThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L011
								},
								render: function (ui) {
									let fSel = grdSelect.L011.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "유동화증권 명칭",
								dataType: "string",
								dataIndx: "lqdzSctyNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 종류",
								dataType: "string",
								dataIndx: "lqdzSctyKndCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L012
								},
								render: function (ui) {
									let fSel = grdSelect.L012.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "유동화증권 발행일자",
								dataType: "string",
								dataIndx: "lqdzSctyIsuDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 액면금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "lqdzSctyParAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "유동화증권 발행금리",
								dataType: "integer",
								format: "#,###",
								dataIndx: "lqdzSctyIsuIntrt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "LTV",
						align: "center",
						colModel: [
							{
								title: "LTV(최초투자시점)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "frsInvPotLtvRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "LTV(작성기준일 현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "wrtnStdrDeLtvRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "LTV 산출방법",
								dataType: "string",
								dataIndx: "ltvOutputMthDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.L008
								},
								render: function (ui) {
									let fSel = grdSelect.L008.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							}
						]
					},
					{
						title: "부동산 가치 (value)",
						align: "center",
						colModel: [
							{
								title: "감정가 기준",
								dataType: "integer",
								format: "#,###",
								dataIndx: "aprsPrc",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양가(총매출액) 기준",
								dataType: "integer",
								format: "#,###",
								dataIndx: "totSlltAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "심사팀추정가 기준",
								dataType: "string",
								dataIndx: "jdgmTeamPrsmAmt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "변제순위 등",
						align: "center",
						colModel: [
							{
								title: "변제순위",
								dataType: "string",
								dataIndx: "pybkRankDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P026
								},
								render: function (ui) {
									let fSel = grdSelect.P026.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "임대보증금(총액)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesRentGrteAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "우선순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "prfdRankAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "동순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sodrAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "후순위 금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "bkbnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "신용보강",
						align: "center",
						colModel: [
							{
								title: "타사 신용보강",
								dataType: "string",
								dataIndx: "otcmCrdtRifcThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.O011
								},
								render: function (ui) {
									let fSel = grdSelect.O011.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "타사 신용보강 수단",
								dataType: "string",
								dataIndx: "otcmCrdtRifcMnDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.O011
								},
								render: function (ui) {
									let fSel = grdSelect.O011.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "신용보강회사(1)",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(1) 법인등록번호",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(1) 기업신용등급",
								dataType: "string",
								dataIndx: "sq1CrdtRifcCmpCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2)",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2) 법인등록번호",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "신용보강회사(2) 기업신용등급",
								dataType: "string",
								dataIndx: "sq2CrdtRifcCmpCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	PF위험평가
			////////////////////////////////////////////////////////////
			{
				title: "PF위험평가(PF만 기재)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	PF시행정보 ~ 시장위험평가
					////////////////////////////////////////////////////////////
					{
						title: "PF시행정보",
						align: "center",
						colModel: [
							{
								title: "시행사",
								dataType: "string",
								dataIndx: "efceCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시행사 법인등록번호",
								dataType: "string",
								dataIndx: "efceCmpCrno",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF시행형태",
								dataType: "string",
								dataIndx: "pfEfceShpDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P002
								},
								render: function (ui) {
									let fSel = grdSelect.P002.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(1) (사업승인 전/후)",
								dataType: "string",
								dataIndx: "pfBusiApvlStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P018
								},
								render: function (ui) {
									let fSel = grdSelect.P018.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(2) (착공 전/후)",
								dataType: "string",
								dataIndx: "pfCsstStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P023
								},
								render: function (ui) {
									let fSel = grdSelect.P023.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(3) (분양 전/후)",
								dataType: "string",
								dataIndx: "pfSlltStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P016
								},
								render: function (ui) {
									let fSel = grdSelect.P016.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "PF단계(4) (준공 전/후)",
								dataType: "string",
								dataIndx: "pfCnfnStepCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.P022
								},
								render: function (ui) {
									let fSel = grdSelect.P022.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "총사업비",
								dataType: "integer",
								format: "#,###",
								dataIndx: "totBusiAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "총매출액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rvnuAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "자기자본(equity)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "slfCpta",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "단위면적당(㎡) 분양가",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsSlltAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "중도금 상환비율",
								dataType: "integer",
								format: "#,###",
								dataIndx: "mdwyGoldRdmpRto",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양 또는 임대가능 총면적(㎡)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "allSqms",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
	
						]
					},
					{
						title: "수익형(상업용) 부동산 정보",
						align: "center",
						colModel: [
							{
								title: "예상 공실률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "estmEmrmRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 임대수익/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsEstmRentErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 임대비용/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsEstmRentCt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "예상 순영업수익(NOI)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "estmPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "대주단 정보",
						align: "center",
						colModel: [
							{
								title: "PF대주단 총 대출금",
								dataType: "integer",
								format: "#,###",
								dataIndx: "pfStlnTotLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF대주단 참여기관 수",
								dataType: "integer",
								format: "#,###",
								dataIndx: "pfStlnPtciIsttNum",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "PF대주단 대출 만기일",
								dataType: "string",
								dataIndx: "pfStlnLoanExpDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대주기관",
								dataType: "string",
								dataIndx: "sq1StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq1StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#1: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq1StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대주기관",
								dataType: "string",
								dataIndx: "sq2StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq2StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#2: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq2StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대주기관",
								dataType: "string",
								dataIndx: "sq3StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq3StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#3: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq3StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대주기관",
								dataType: "string",
								dataIndx: "sq4StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq4StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#4: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq4StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대주기관",
								dataType: "string",
								dataIndx: "sq5StlnIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대주기관 법인등록번호",
								dataType: "string",
								dataIndx: "sq5StlnIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "대주#5: 대출금액",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq5StlnLoanAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "사업승인위험평가",
						align: "center",
						colModel: [
							{
								title: "사업승인 신청일 (인허가 신청일)",
								dataType: "string",
								dataIndx: "busiApvlRqsDt",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "토지매입률 (면적기준)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "landPchsRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "준공위험평가",
						align: "center",
						colModel: [
							{
								title: "책임준공확약 여부",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmThcsDcd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] },
								editor: {
									type: "select",
									valueIndx: "cdValue",
									labelIndx: "cdName",
									options: grdSelect.R037
								},
								render: function (ui) {
									let fSel = grdSelect.R037.find(({ cdValue }) => cdValue == ui.cellData);
									return fSel ? fSel.cdName : ui.cellData;
								}
							},
							{
								title: "책임준공확약 기관",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmIsttNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "책임준공확약 기관 법인등록번호",
								dataType: "string",
								dataIndx: "rsplCnfnCfrmIsttCrno",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "책임준공확약 기관 기업신용등급",
								dataType: "string",
								dataIndx: "rsplCnfnEprzCrdtGrdCd",
								width: "30%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 명칭",
								dataType: "string",
								dataIndx: "csucCmpNm",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 법인등록번호",
								dataType: "string",
								dataIndx: "csucCmpCrno",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "시공사 기업신용등급",
								dataType: "string",
								dataIndx: "csucCmpEprzCrdtGrdCd",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "착공일",
								dataType: "string",
								dataIndx: "csstDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "준공일(사용승인일)",
								dataType: "string",
								dataIndx: "cnfnDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "계획공정률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "plnFairRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "실행공정률",
								dataType: "integer",
								format: "#,###",
								dataIndx: "excFairRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "시장위험평가",
						align: "center",
						colModel: [
							{
								title: "분양률(분양가 기준)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "slltRt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "분양개시일",
								dataType: "string",
								dataIndx: "slltOpngDt",
								width: "20%",
								halign: "center",
								align: "center",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "입주율(분양가기준,작성기준현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "moinRt",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "Exit 분양률 (작성기준일 현재)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "exitSlltRt",
								width: "30%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	Non-PF 위험평가
			////////////////////////////////////////////////////////////
			{
				title: "Non-PF 위험평가",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	주거용부동산 ~ 상업용(수익형)부동산
					////////////////////////////////////////////////////////////
					{
						title: "주거용부동산",
						align: "center",
						colModel: [
							{
								title: "전용면적",
								dataType: "integer",
								format: "#,###",
								dataIndx: "dvrSqms",
								width: "10%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "전용면적(㎡)당 단가",
								dataType: "integer",
								format: "#,###",
								dataIndx: "dvrSqmsUnAmt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							}
						]
					},
					{
						title: "상업용(수익형)부동산",
						align: "center",
						colModel: [
							{
								title: "임대가능 총면적",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rentPsblTotSqms",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "공실률 ('20.6월말 현재')",
								dataType: "integer",
								format: "#,###",
								dataIndx: "emrmRt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "임대수익/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsRentErnAmt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "임대비용/㎡",
								dataType: "integer",
								format: "#,###",
								dataIndx: "unSqmsRentCt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "순영업수익 (NOI)/연(자동계산)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq1YrlyPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
	
							{
								title: "순영업수익 (NOI)/연(회사제출)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "sq2YrlyPurBsnErnAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산관련총대출이자(금융비용)",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesTotLoanIntr",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "부동산 관련 총대출 원리금",
								dataType: "integer",
								format: "#,###",
								dataIndx: "rlesTotLoanPaiAmt",
								width: "20%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
							{
								title: "Cap Rate",
								dataType: "integer",
								format: "#,###",
								dataIndx: "cptlRstrRt",
								width: "15%",
								halign: "center",
								align: "right",
								filter: { crules: [{ condition: 'range' }] }
							},
						]
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	기타항목
			////////////////////////////////////////////////////////////
	
			{
				title: "기타항목",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	NCR 위험값 ~ 작성자 전화번호
					////////////////////////////////////////////////////////////
					{
						title: "NCR 위험값",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskVl",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "NCR 위험액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskAmt",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 이름",
						dataType: "string",
						dataIndx: "jobChrrNm",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 부서",
						dataType: "string",
						dataIndx: "dprtCd",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 전화번호",
						dataType: "string",
						dataIndx: "cplcCtns",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
				]
			}
		];
	
		const TB09090S_colCpc3 = [
			////////////////////////////////////////////////////////////
			//	분류
			////////////////////////////////////////////////////////////
			{
				title: "분류",
				align: "center",
				colModel: [
					{
						title: "항목",
						dataType: "int",
						dataIndx: "rownum",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							result = (ui.rowIndx + 1).toString();
							return result;
						}
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	회사정보
			////////////////////////////////////////////////////////////
			{
				title: "회사정보",
				align: "center",
				colModel: [
					{
						title: "회사명",
						dataType: "string",
						dataIndx: "cmpNm",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사"
							}
							return result;
						}
					},
					{
						title: "금융회사코드",
						dataType: "string",
						dataIndx: "fssCmpCd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result
							if (!ui.cellData) {
								result = "보고회사코드"
							}
							return result;
						}
					},
					{
						title: "작성기준년월",
						dataType: "string",
						dataIndx: "stdrYm",
						width: "10%",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] },
						render: function (ui) {
							let result;
							return result = ui.cellData.slice(0, 4) + "-" + ui.cellData.slice(4, 6);
						}
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	계약정보 (공통)
			////////////////////////////////////////////////////////////
			{
				title: "계약정보 (공통)",
				align: "center",
				colModel: [
					{
						title: "투자형태1",
						dataType: "string",
						dataIndx: "etcRptsInvShpCd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.E037
						},
						render: function (ui) {
							let fSel = grdSelect.E037.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "부동산펀드/REITs 투자형태2",
						dataType: "string",
						dataIndx: "etcRptsInvDetlCd",
						width: "30%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.E036
						},
						render: function (ui) {
							let fSel = grdSelect.E036.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "PF 여부",
						dataType: "string",
						dataIndx: "pfThcsDcd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.P024
						},
						render: function (ui) {
							let fSel = grdSelect.P024.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "사회기반시설(SOC) 여부",
						dataType: "string",
						dataIndx: "socThcsDcd",
						width: "20%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.S008
						},
						render: function (ui) {
							let fSel = grdSelect.S008.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "최초 투자일",
						dataType: "string",
						dataIndx: "invDt",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "투자 종료일(계약 종료일)",
						dataType: "string",
						dataIndx: "ctrtEndDt",
						width: "20%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	부동산정보(공통, 유동화증권 기재)
			////////////////////////////////////////////////////////////
			{
				title: "부동산정보(공통, 유동화증권 기재)",
				align: "center",
				colModel: [
					{
						title: "부동산유형",
						dataType: "string",
						dataIndx: "rlesTpDcd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.R036
						},
						render: function (ui) {
							let fSel = grdSelect.R036.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "부동산 개발사업(PF) 유형1",
						dataType: "string",
						dataIndx: "pfSlltTpDcd",
						width: "30%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.P016
						},
						render: function (ui) {
							let fSel = grdSelect.P016.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "부동산 개발사업(PF) 유형2",
						dataType: "string",
						dataIndx: "pfErnTpDcd",
						width: "30%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.P019
						},
						render: function (ui) {
							let fSel = grdSelect.P019.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "부동산소재지",
						dataType: "string",
						dataIndx: "bssAsstLctpDcd",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.P014
						},
						render: function (ui) {
							let fSel = grdSelect.P014.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "해외소재 국가(해외인 경우)",
						dataType: "string",
						dataIndx: "ntnNm",
						width: "20%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "해외소재 도시(해외인 경우)",
						dataType: "string",
						dataIndx: "ovrsLctCtyNm",
						width: "20%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "부동산소재지 우편번호",
						dataType: "string",
						dataIndx: "rlesLctpZpcd",
						width: "20%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	부동산펀드정보(부동산펀드 선택)
			////////////////////////////////////////////////////////////
			{
				title: "부동산펀드정보(부동산펀드 선택)",
				align: "center",
				colModel: [
					{
						title: "펀드명칭",
						dataType: "string",
						dataIndx: "fndNm",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "펀드코드(금투협회 펀드코드)",
						dataType: "string",
						dataIndx: "kofiaFndCd",
						width: "20%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "자산운용사",
						dataType: "string",
						dataIndx: "asstMgcoNm",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "재간접펀드여부",
						dataType: "string",
						dataIndx: "fofsThcsDcd",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.F013
						},
						render: function (ui) {
							let fSel = grdSelect.F013.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "블라인드펀드 여부",
						dataType: "string",
						dataIndx: "bdfndThcsDcd",
						width: "15%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.B024
						},
						render: function (ui) {
							let fSel = grdSelect.B024.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "펀드 투자금액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "fndInvAmt",
						format: "#,###",
						width: "10%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "펀드 평가금액(작성기준일 현재)",
						dataType: "integer",
						format: "#,###",
						dataIndx: "fndTotEvlAmt",
						format: "#,###",
						width: "20%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "공/사모 구분",
						dataType: "string",
						dataIndx: "fndEtcRptsPbffPplcDcd",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "통화(currency)",
						dataType: "string",
						dataIndx: "fndEtcRptsCrryCd",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	REITs 정보 (REITs 선택시)
			////////////////////////////////////////////////////////////
			{
				title: "REITs 정보 (REITs 선택시)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	REITs 명칭 ~ 통화(currency)
					////////////////////////////////////////////////////////////
					{
						title: "REITs 명칭",
						dataType: "string",
						dataIndx: "reitsNm",
						width: "10%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "REITs 투자금액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "reitsAmt",
						format: "#,###",
						width: "20%",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "REITs 평가금액(작성기준일 현재)",
						dataType: "integer",
						format: "#,###",
						dataIndx: "reitsEvlAmt",
						format: "#,###",
						width: "20%",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "공/사모 구분",
						dataType: "string",
						dataIndx: "reitsEtcRptsPbffPplcDcd",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "통화(currency)",
						dataType: "string",
						dataIndx: "reitsEtcRptsCrryCd",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	유동화증권정보(유동화증권 선택)
			////////////////////////////////////////////////////////////
			{
				title: "유동화증권정보(유동화증권 선택)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	유동화증권 명칭 ~ 신용등급(신용평가결과)
					////////////////////////////////////////////////////////////
					{
						title: "유동화증권 명칭",
						dataType: "string",
						dataIndx: "lqdzSctyNm",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "유동화증권 종류",
						dataType: "string",
						dataIndx: "lqdzSctyKndCd",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.L012
						},
						render: function (ui) {
							let fSel = grdSelect.L012.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "유동화증권 발행기관",
						dataType: "string",
						dataIndx: "lqdzSctyIsuIsttNm",
						width: "20%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "유동화증권발행기관 법인등록번호",
						dataType: "string",
						dataIndx: "lqdzSctyCrno",
						width: "30%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "발행일자",
						dataType: "string",
						dataIndx: "isuDt",
						format: "#,###",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "액면금액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "parAmt",
						format: "#,###",
						width: "20%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "발행금리",
						dataType: "integer",
						format: "#,###",
						dataIndx: "lqdzSctyIsuIntrt",
						format: "#,###",
						width: "20%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "신용보강기관",
						dataType: "string",
						dataIndx: "crdtRifcCmpNm",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "신용보강기관 법인등록번호",
						dataType: "string",
						dataIndx: "crdtRifcCmpCrno",
						width: "25%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "신용보강형태",
						dataType: "string",
						dataIndx: "rptsCtrtTpCd",
						width: "15%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] },
						editor: {
							type: "select",
							valueIndx: "cdValue",
							labelIndx: "cdName",
							options: grdSelect.R032
						},
						render: function (ui) {
							let fSel = grdSelect.R032.find(({ cdValue }) => cdValue == ui.cellData);
							return fSel ? fSel.cdName : ui.cellData;
						}
					},
					{
						title: "신용등급(신용평가결과1)",
						dataType: "string",
						dataIndx: "sq1EtcRptsCrdtGrdCd",
						width: "25%",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "신용등급(신용평가결과2)",
						dataType: "string",
						dataIndx: "sq2EtcRptsCrdtGrdCd",
						width: "25%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	기타 정보 (기타 유형 선택시)
			////////////////////////////////////////////////////////////
			{
				title: "기타 정보 (기타 유형 선택시)",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	계약명칭 ~ 평가금액(작성기준일 현재)
					////////////////////////////////////////////////////////////
					{
						title: "계약명칭",
						dataType: "string",
						dataIndx: "etcCtrtNm",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "거래상대방",
						dataType: "string",
						dataIndx: "trOthrNm",
						width: "10%",
						halign: "center",
						align: "center",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "투자금액(원금)",
						dataType: "integer",
						format: "#,###",
						dataIndx: "invPrna",
						format: "#,###",
						width: "10%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "평가금액(작성기준일 현재)",
						dataType: "integer",
						format: "#,###",
						dataIndx: "etcEvlAmt",
						format: "#,###",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					}
				]
			},
			////////////////////////////////////////////////////////////
			//	기타항목
			////////////////////////////////////////////////////////////
			{
				title: "기타항목",
				align: "center",
				colModel: [
					////////////////////////////////////////////////////////////
					//	NCR 위험값 ~ 작성자 전화번호
					////////////////////////////////////////////////////////////
					{
						title: "NCR 위험값",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskVl",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "NCR 위험액",
						dataType: "integer",
						format: "#,###",
						dataIndx: "ncrRskAmt",
						width: "15%",
						halign: "center",
						align: "right",
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 이름",
						dataType: "string",
						dataIndx: "jobChrrNm",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 부서",
						dataType: "string",
						dataIndx: "dprtCd",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
					{
						title: "작성자 전화번호",
						dataType: "string",
						dataIndx: "cplcCtns",
						width: "15%",
						halign: "center",
						align: "center",
						editable: false,
						filter: { crules: [{ condition: 'range' }] }
					},
				]
			}
		];
	
	
		switch (modelNum) {
			case ("01"): return TB09090S_colCpc1
			case ("02"): return TB09090S_colCpc2
			case ("03"): return TB09090S_colCpc3
		}
	
	}
	
	/*
	 *	cpcData에 필요한 Cd값 가져오기
	 */
	function fnSelectBox() {
		selectBox = getSelectBoxList("TB09090",
			"R031"
			+ "/D015"
			+ "/P021"
			+ "/P014"
			+ "/P015"
			+ "/P025"
			+ "/U006"
			+ "/L011"
			+ "/L008"
			+ "/P026"
			+ "/O011"
			+ "/O010"
			+ "/P002"
			+ "/P018"
			+ "/P023"
			+ "/P016"
			+ "/P022"
			+ "/R037"
			+ "/E037"
			+ "/E036"
			+ "/P024"
			+ "/S008"
			+ "/R036"
			+ "/P017"
			+ "/P019"
			+ "/B023"
			+ "/F013"
			+ "/B024"
			+ "/L012"
			+ "/R032"
			+ "/R034"
			+ "/R035"
			+ "/D010"
			, false);
		grdSelect.R031 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R031'; });		//	RPTS_CTRT_TP_DETL_CD
		grdSelect.D015 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D015'; });		//	DET_GRTE_FLFL_DCD
		grdSelect.P021 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P021'; });		//	PF_TP_DCD
		grdSelect.P014 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P014'; });		//	PF_BSS_ASST_LCLS_CD
		grdSelect.P015 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P015'; });		//	PF_BSS_ASST_SCLS_CD
		grdSelect.P025 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P025'; });		//	PF_OVRS_LCT_NTN_CD
		grdSelect.U006 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'U006'; });		//	UNSLD_THCS_DCD
		grdSelect.L011 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'L011'; });		//	LQDZ_SCTY_GRTE_THCS_DCD
		grdSelect.L008 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'L008'; });		//	LTV_OUTPUT_MTH_DCD
		grdSelect.P026 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P026'; });		//	PYBK_RANK_DCD
		grdSelect.O011 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'O011'; });		//	OTCM_CRDT_RIFC_THCS_DCD
		grdSelect.O010 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'O010'; });		//	OTCM_CRDT_RIFC_MN_DCD
		grdSelect.P002 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P002'; });		//	PF_EFCE_SHP_DCD
		grdSelect.P018 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P018'; });		//	PF_BUSI_APVL_STEP_CD
		grdSelect.P023 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P023'; });		//	PF_CSST_STEP_CD
		grdSelect.P016 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P016'; });		//	PF_SLLT_STEP_CD
		grdSelect.P022 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P022'; });		//	PF_CNFN_STEP_CD
		grdSelect.R037 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R037'; });		//	RSPL_CNFN_CFRM_THCS_DCD
		grdSelect.E037 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'E037'; });		//	ETC_RPTS_INV_SHP_CD
		grdSelect.E036 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'E036'; });		//	ETC_RPTS_INV_DETL_CD
		grdSelect.P024 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P024'; });		//	PF_THCS_DCD
		grdSelect.S008 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'S008'; });		//	SOC_THCS_DCD
		grdSelect.R036 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R036'; });		//	RLES_TP_DCD
		grdSelect.P017 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P017'; });		//	PF_SLLT_TP_DCD
		grdSelect.P019 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'P019'; });		//	PF_ERN_TP_DCD
		grdSelect.B023 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'B023'; });		//	BSS_ASST_LCTP_DCD
		grdSelect.F013 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F013'; });		//	FOFS_THCS_DCD
		grdSelect.B024 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'B024'; });		//	BDFND_THCS_DCD
		grdSelect.L012 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'L012'; });		//	LQDZ_SCTY_KND_CD
		grdSelect.R032 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R032'; });		//	RPTS_CTRT_TP_CD
		grdSelect.R034 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R034'; });		//	????
		grdSelect.R035 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'R035'; });		//	????
		grdSelect.D010 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'D010'; });		//	???

		dprtList = selectBox.filter(function (item) {
            return item.cmnsGrpCd === "D010";
        });

        let dprtHtml;

        dprtList.forEach((item) => {
            dprtHtml += `<option value="${item.cdValue}">${item.cdName}</option>`;
        });
		
		//	운용부서 selectBox
		$("#TB09090S_dprtCd").append(dprtHtml);
        $("#TB09090S_dprtCd").on("change", function () {
        $("#TB09090S_dprtNm").val($("#TB09090S_dprtCd").val());
        });
    
        //	부서코드 selectBox
        $("#TB09090S1_dprtCd").append(dprtHtml);
        $("#TB09090S1_dprtCd").on("change", function () {
        $("#TB09090S1_dprtNm").val($("#TB09090S1_dprtCd").val());
        });
	};
	
	$(document).ready(function () {

		// 유저정보 불러오기
		setUserData();
		checkUserLv();
		// setDatePicker();
		// stdDtSelect();
		fnSelectBox();
		$('#TB09090S_stdDt').val(getToday());
		chkboxFunction();
		pqGrid();
		$("#TB09090S_colCpc1").hide();
		$("#TB09090S_colCpc2").hide();
		$("#TB09090S_colCpc3").hide();

		// 클릭해서 체크!
		$('#TB09090S_chkF1').trigger('click');

	});
	
	/*
	 * 	보고서 유형 교체
	 */
	function chkboxFunction() {
		$('input[type="checkbox"]').click(function () {
			$('input[type="checkbox"]').not(this).prop('checked', false);
			$(this).prop('checked', true);
	
			if ($('#TB09090S_chkF1').is(':checked')) {
				mode = "01";
				$("#TB09090S_colCpc1").show();
			} else {
				$("#TB09090S_colCpc1").hide();
			}
	
			if ($('#TB09090S_chkF2').is(':checked')) {
				mode = "02";
				$("#TB09090S_colCpc2").show();
			} else {
				$("#TB09090S_colCpc2").hide();
			}
	
			if ($('#TB09090S_chkF3').is(':checked')) {
				mode = "03";
				$("#TB09090S_colCpc3").show();
			} else {
				$("#TB09090S_colCpc3").hide();
			}
		});
		// checkMode();
	}
	
	// 최상단 보고기준년월 조건 데이터 가져오기
	function getStdDtDate(date) {
		let ymd = new Date(date)
		const y = ymd.getFullYear().toString();
		const m = (ymd.getMonth() + 1).toString().padStart(2, '0');
		const d = ymd.getDate().toString();
		stdrYm = y + m;
		rgstDt = d;
	}
	
	/*
	 *	날짜형식변환
	 */
	function getDateData(
		date,
		format,
		cut			/* (-, ., /) 선택 */
	) {
		let dateTypeCheck = new Date(date)
	
		let year;
		let month;
		let day;
		let resultDate;
	
		if (isNaN(dateTypeCheck)) {
			year = date.slice(0, 4);
			month = date.slice(4, 6);
			day = date.slice(6, 8);
		} else {
			year = new Date(date).getFullYear().toString();
			month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
			day = new Date(date).getDate().toString().padStart(2, '0');
		}
	
		switch (format) {
			case ("yyyy"): {
				resultDate = year
				return resultDate;
			}
			case ("mm"): {
				resultDate = month
				return resultDate;
			}
			case ("dd"): {
				resultDate = day
				return resultDate;
			}
			case ("mmdd"): {
				resultDate = month + cut + day
				return resultDate;
			}
			case ("yyyymm"): {
				resultDate = year + cut + month
				return resultDate;
			}
			case ("yyyymmdd"): {
				resultDate = year + cut + month + cut + day
				return resultDate;
			}
		}
	}
	/*
	 *	사용자 정보 Set
	 */
	function setUserData () {

		// 운용부서
		$('#TB09090S_dprtCd').val($('#userDprtCd').val());	// 콤보박스
		$('#TB09090S_dprtNm').val($('#userDprtCd').val());

		// 부서코드
		$('#TB09090S1_dprtCd').val($('#userDprtCd').val());	// 콤보박스
		$('#TB09090S1_dprtNm').val($('#userDprtCd').val());
		$("#TB09090S_stdDt").val(getDateData(new Date(), "yyyymmdd", "-"));

	}
	
	
	/*
	 * 	조회 조건 초기화(부서명 초기화, 보고기준년월은 이번 달로 초기화)
	 */
	function resetParam() {
		setUserData();
	}
	
	/*
	 * 	등록내역 초기화
	 */
	function resetGridData() {
		setUserData();
		resetGrid();
	}
	
	/******************************************************************
									Select모음
	 ******************************************************************/
	
	/*
	 *	금감원 보고서 내역 가져오기
	 *	SELECT IBIMS704B
	 */
	function getCpcList() {
	
		resetGrid();
	
		// 기본 확정 여부 표시
		$("#TB09090S_confirmed1").html("N")
		$("#TB09090S_confirmed2").html("N")
		$("#TB09090S_confirmed3").html("N")
	
		let dprtCd = $('#TB09090S1_dprtCd').val();
		let stdrYm = $('#TB09090S_stdDt').val();
	
		if (!dprtCd) {
			dprtCd = "%"
		}
	
		let date = new Date(stdrYm).getFullYear().toString() + (new Date(stdrYm).getMonth() + 1).toString().padStart(2, '0');
	
		//	부서데이터 입력확인
		// if (!dptNm) {
		// 	Swal.fire({
		// 		icon: 'error'
		// 		, title: "Error!"
		// 		, text: "부서를 입력해주세요."
		// 		, confirmButtonText: "확인"
		// 	});
		// 	return;
		// }
	
		let paramData = {
			"dptCd": dprtCd	// 부서코드
			, "stdrYm": `%${date}%`	// 년월
		};
	
		$.ajax({
			type: "POST",
			url: "/TB09090S/getCpcList",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function (data) {
				
				if (data.length > 0) {
	
				} else {
					
				
				}
			}, error: function () {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "보고서 정보 조회에 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
		if (!mode) {
			$('#TB09090S_chkF1').trigger("click");
			mode = "01"
		}
		nnGetCpcDetail();
	}
	
	/*
	 *	IBIMS201B_MAIN SELECT
	 */
	function nnGetCpcDetail() {
	
		resetGrid();
	
		let url;
	
		if (mode === "01") {
			url = "selectIBIMS701B";
		} else if (mode === "02") {
			url = "selectIBIMS702B";
		} else if (mode === "03") {
			url = "selectIBIMS703B";
		} else {
			Swal.fire({
				icon: 'warning'
				, title: 'Warning!'
				, text: "보고서 양식을 선택해주세요!"
				, confirmButtonText: "확인"
			});
			return;
		}
	
		cpcData = {};
	
		let dprtCd = $('#TB09090S1_dprtCd').val();	//부서코드값
		let stdrYm = $('#TB09090S_stdDt').val();
	
		let date = new Date(stdrYm).getFullYear().toString() + (new Date(stdrYm).getMonth() + 1).toString().padStart(2, '0');
		let prvDate = new Date(stdrYm).getFullYear().toString() + (new Date(stdrYm).getMonth()).toString().padStart(2, '0');
		//	부서데이터 입력확인
		if (!dprtCd) {
			dprtCd = "%"
		}
	
		var paramData = {
			"dptCd": dprtCd	// 부서코드
			, "stdrYm": `%${date}%` 	// 년월
			, "prvStdrYm": `${prvDate}`
		};
	
		$.ajax({
			type: "POST",
			url: `/TB09090S/${url}`,
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(paramData),
			dataType: "json",
			success: function (data) {
				if (data.length > 0) {
					let detail = selectDataId().pqGrid('instance')
					detail.setData(data);
					detail.getData();
				}
				// 조회결과 없음
				else{
					option.type ='warning'
					option.title='Warning!'
					option.text='조회된 정보가 없습니다!'
					openPopup(option);
				}
			}, error: function () {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "보고서 정보 조회에 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
	
	/******************************************************************
									SELECT모음
	 ******************************************************************/
	
	
	/******************************************************************
									INSERT모음
	 ******************************************************************/
	/*
	 *	IBIMS701B,702B,703B INSERT
	 */
	function insertCpc1Data() {
	
		let url;
	
		let cpcList
	
		if (mode = "01") {
			url = "insertIBIMS701B"
			cpcList = $("#TB09090S_colCpc1").pqGrid('instance').getData();
		} 
		else if (mode = "02") {
			url = "insertIBIMS702B"
			cpcList = $("#TB09090S_colCpc2").pqGrid('instance').getData();
		} 
		else if (mode = "03") {
			url = "insertIBIMS703B"
			cpcList = $("#TB09090S_colCpc3").pqGrid('instance').getData();
		}
	
		if (cpcList.length === 0) {
			Swal.fire({
				icon: 'warning'
				, title: 'Warning!'
				, text: "데이터를 입력해주세요!"
				, confirmButtonText: "확인"
			});
			return;
		}
	
		let param = {
			cpcList
		}
	
		$.ajax({
			type: "POST",
			url: `/TB09090S/${url}`,
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(param),
			dataType: "json",
			success: function (data) {
				if (data > 0) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "등록완료"
						, confirmButtonText: "확인"
					});
				} else {
					Swal.fire({
						icon: 'warning'
						, title: "Warning!"
						, text: "등록실패"
						, confirmButtonText: "확인"
					});
				}
			}, error: function () {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "등록실패"
					, confirmButtonText: "확인"
				});
			}
		});
		resetGrid();
	}
	
	function selectDataId() {
		switch (mode) {
			case ("01"): return $("#TB09090S_colCpc1")
			case ("02"): return $("#TB09090S_colCpc2")
			case ("03"): return $("#TB09090S_colCpc3")
		}
	}
	
	/*
	 *	보고서 버튼 활성화/비활성화 처리
	 */
	function checkUserLv () {
		// 로그인한 유저 데이터를 받아와용
		let cd = $('#userDprtCd').val()
		
		// 권한부서가 아닐경우 disabled 시킬게요
		if(cd === ''){
			$('#dcsnY').prop('disabled', false);
			$('#dcsnN').prop('disabled', false);
			$('#getDprtBtn').prop('disabled', false);
		}
		// 자격이 있으면 하고싶은대로 다해~
		else {
			$('#dcsnY').prop('disabled', true);
			$('#dcsnN').prop('disabled', true);
			$('#getDprtBtn').prop('disabled', true);
		}
	}
	
	/*
	 *	보고서 확정버튼
	 */
	const dcsnCheck = () => {
	
		/**
		 * 확정 처리는 각 부서 부서장만 가능
		 */
		// if(){
	
		// }
	
		getDcsnData("Y");
	
		//  정보처리후 View 처리
		var target = $('input[type="checkbox"]:checked').closest('tr').find('[id^=TB09090S_confirmed]');
		var target;
		target.html("Y")
		Swal.fire({
			icon: 'success'
			, title: "Success"
			, text: "확정완료가 되었습니다!"
			, confirmButtonText: "확인"
		});
	}
	
	/*
	 *	보고서 확정 취소 버튼
	 */
	const dcsnCancel = () => {
	
		/*
		 *	확정취소 처리는 감사실, 신용리스크실, 경영기획팀만 가능
		 */
		// if(){
	
		// }
	
		getDcsnData("N");
	
		if (!mode) {
			Swal.fire({
				icon: 'warning'
				, text: "보고서를 선택해주세요!"
				, confirmButtonText: "확인"
			});
			return;
		}
	
		let target = $('input[type="checkbox"]:checked').closest('tr').find('[id^=TB09090S_confirmed]');
		target.html("N")
		Swal.fire({
			icon: 'success'
			, title: "Success"
			, text: "확정취소가 되었습니다!"
			, confirmButtonText: "확인"
		});
	}
	
	/*
	 *	금감원 보고서 확정, 확정 취소
	 */
	//	Yes or No 선택
	function getDcsnData(yn) {
	
		//	레전드 사건
		//	뭘 어떻게 받아올지 아직 안정해졌어요!
	
		// insert data
		let stdrYm = getDateData(new Date(), "yyyymm");     /* 기준년월 */
		let fndRptsTpDcd = mode;		   					/* 펀드보고서유형구분코드 */
		
		// update, insert data
		let dcsnYn = yn;				  					/* 확정여부 업데이트 가능해요 */
	
		//  펀드유형코드 확인
		if (!fndRptsTpDcd) {
			Swal.fire({
				icon: 'warning'
				, text: "보고서를 선택해주세요!"
				, confirmButtonText: "확인"
			});
			return;
		}
	
		let param = {
			  "stdrYm" : stdrYm					// 기준년월과 펀드유형이 겹치면 업데이트 해야해요
			, "fndRptsTpDcd" : fndRptsTpDcd
			, "rgstDt" : rgstDt
			, "dcsnDt" : dcsnDt
			, "dcsnYn" : dcsnYn
			, "rgstEmpno" : rgstEmpno
		}
	
		//  정보확인후 insert or update
		$.ajax({
			type: "POST",
			url: `/TB09090S/dcsnCheck`,
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(param),
			dataType: "json",
			success: function (data) {
				if (data === 1) {
					Swal.fire({
						icon: 'success'
						, text: "등록완료"
						, confirmButtonText: "확인"
					});
				} else {
					Swal.fire({
						icon: 'warning'
						, text: "등록실패"
						, confirmButtonText: "확인"
					});
					return;
				}
			}, error: function () {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "등록실패"
					, confirmButtonText: "확인"
				});
				return;
			}
		});
	}

	/*
	*	서식파일 다운로드
	*/
	async function cpcExcelDownload() {
		let fileName;
		// 파일 다운로드
		if (mode === "01") {
			fileName = "CPC_1";
		} else if (mode === "02") {
			fileName = "CPC_2";
		} else if (mode === "03") {
			fileName = "CPC_3";
		}
		const response = await fetch(`/file/${fileName}.xlsx`);
		if (!response.ok) {
			Swal.fire({
				icon: 'error',
				text: '파일을 불러오는데 실패했습니다!',
				confirmButtonText: '확인'
			});
			return;
		}
	
		const arrayBuffer = await response.arrayBuffer();
		const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		pq.saveAs(blob, fileName);
	
		// var cpcDetail = [];
	
		// let reader = new FileReader();
	
		// let header;
		// let origin;
	}
	
	/*
	 *	업로드 버튼 클릭 시 이벤트
	 */
	$("#TB09090S_upload_btn").click(function () {
		$('#upload-file-input-TB09090S').click();
		resetGrid();
	});
	
	/*
	 * 엑셀 업로드 후 event
	 */
	$("#upload-file-input-TB09090S").change(function (event) {
		// $("#TB09090S_colCpc1").pqGrid("deleteRow", { rowIndx: arrRowIndxs, track: false });
		readExcel();
		// resetFileInput($('#upload-file-input-TB09090S'));
	});
	
	// 엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
	function resetFileInput($element) {
		$element.wrap('<form>').closest('form').get(0).reset();
		$element.unwrap();
	}
	
	/*
	 *	엑셀(Excel) 셋팅용 함수 모음
	 *	
	 */
	
	/*
	 *	엑셀(Excel) PQGrid ExcelExport
	 */
	function pqExportExcel() {
		let blob = selectDataId().pqGrid('instance').exportExcel({});
		let fileName;
		if (mode === "01") {
			fileName = "CPC1양식.xlsx";
		} else if (mode === "02") {
			fileName = "CPC2양식.xlsx";
		} else if (mode === "03") {
			fileName = "CPC3양식.xlsx";
		}
		pq.saveAs(blob, fileName);
	}
	
	/*
	 *	엑셀(Excel) 파일 읽기 
	 */
	function readExcel() {
	
		if (!mode) {
			Swal.fire({
				icon: 'warning'
				, text: "보고서양식을 선택해주세요!"
				, confirmButtonText: "확인"
			});
			return;
		}
	
		var cpcDetail = [];
	
		let input = event.target;
		let reader = new FileReader();
	
		let header;
		let origin;
	
		header = setExcelHeader().header
		origin = setExcelHeader().origin
	
		reader.readAsBinaryString(input.files[0]);
		reader.onload = function () {
			let data = reader.result;
			let workBook = XLSX.read(data, { type: 'binary' });
	
			workBook.SheetNames.forEach(function (sheetName) {
				let sheet = workBook.Sheets[sheetName];
				let rows = XLSX.utils.sheet_to_json(sheet, {
					header: header,
					origin: origin,
					range: 1,
					raw: false,
				});
				let result = sr(rows);
				cpcDetail.push(result);
				if (mode === "01") {
					addRows_cpc1Grid(result);
				} else if (mode === "02") {
					addRows_cpc2Grid(result);
				} else if (mode === "03") {
					addRows_cpc3Grid(result);
				}
			})
		};
	}
	
	/*
	 *	엑셀(Excel) - 헤더 오리진 세팅
	 */
	const setExcelHeader = () => {
	
		let setOptions = {};
	
		let header;
		let origin;
	
		if (mode === "01") {
			header = [
				"항목"
				, "회사명"
				, "금융회사코드"
				, "작성기준년월"
				, "계약명칭"
				, "계약일"
				, "만기일"
				, "계약유형1 (유동성/신용공여형)"
				, "계약유형2 (매입약정 등)"
				, "최초 약정금액"
				, "현재 약정잔액"
				, "채무보증 수수료(금액)"
				, "채무보증이행여부"
				, "PF 여부"
				, "PF유형1(해당유형구분)"
				, "PF유형2(분양유형구분)"
				, "PF유형3(수익유형구분)"
				, "기초자산 형태(대분류)"
				, "기초자산 형태(소분류)"
				, "부동산유형(공통)"
				, "부동산소재지"
				, "부동산소재지 우편번호"
				, "부동산 주소"
				, "해외소재 국가 (회외인경우)"
				, "해외소재 도시 (회외인경우)"
				, "미분양관리지역해당여부(현재)"
				, "피보증주체"
				, "피보증주체 법인등록번호"
				, "유동화증권 보증 여부"
				, "유동화증권 명칭"
				, "유동화증권 종류"
				, "유동화증권 발행일자"
				, "유동화증권 액면금액"
				, "유동화증권 발행금리"
				, "LTV(최초투자시점)"
				, "LTV(작성기준일 현재)"
				, "LTV 산출방법"
				, "감정가 기준"
				, "분양가(총매출액) 기준"
				, "심사팀추정가 기준"
				, "변제순위"
				, "임대보증금(총액)"
				, "우선순위 금액"
				, "동순위 금액"
				, "후순위 금액"
				, "타사 신용보강 수단"
				, "신용보강회사(1)"
				, "신용보강회사(1) 법인등록번호"
				, "신용보강회사(1) 법인등록번호"
				, "신용보강회사(1) 기업신용등급"
				, "신용보강회사(2)"
				, "신용보강회사(2) 법인등록번호"
				, "신용보강회사(2) 기업신용등급"
				, "시행사"
				, "시행사 법인등록번호"
				, "PF시행형태"
				, "PF단계(1) (사업승인 전/후)"
				, "PF단계(2) (착공 전/후)"
				, "PF단계(3) (분양 전/후)"
				, "PF단계(4) (준공 전/후)"
				, "총사업비"
				, "총매출액"
				, "자기자본(equity)"
				, "단위면적당(㎡) 분양가"
				, "중도금 상환비율"
				, "분양 또는 임대가능 총면적(㎡)"
				, "예상 공실률"
				, "예상 임대수익/㎡"
				, "예상 임대비용/㎡"
				, "예상 순영업수익(NOI)"
				, "PF대주단 총 대출금"
				, "PF대주단 참여기관 수"
				, "PF대주단 대출 만기일"
				, "대주#1: 대주기관"
				, "대주#1: 대주기관 법인등록번호"
				, "대주#1: 대출금액"
				, "대주#2: 대주기관"
				, "대주#2: 대주기관 법인등록번호"
				, "대주#2: 대출금액"
				, "대주#3: 대주기관"
				, "대주#3: 대주기관 법인등록번호"
				, "대주#3: 대출금액"
				, "대주#4: 대주기관"
				, "대주#4: 대주기관 법인등록번호"
				, "대주#4: 대출금액"
				, "대주#5: 대주기관"
				, "대주#5: 대주기관 법인등록번호"
				, "대주#5: 대출금액"
				, "사업승인 신청일 (인허가 신청일)"
				, "토지매입률 (면적기준)"
				, "책임준공확약 여부"
				, "책임준공확약 기관"
				, "책임준공확약 기관 법인등록번호"
				, "책임준공확약 기관 기업신용등급"
				, "시공사 명칭"
				, "시공사 법인등록번호"
				, "시공사 기업신용등급"
				, "착공일"
				, "준공일(사용승인일)"
				, "계획공정률"
				, "실행공정율"
				, "분양률(분양가 기준)"
				, "분양개시일"
				, "입주율(분양가기준,작성기준현재)"
				, "Exit 분양률 (작성기준일 현재)"
				, "전용면적"
				, "전용면적(㎡)당 단가"
				, "임대가능 총면적"
				, "공실률 ('20.6월말 현재')"
				, "임대수익/㎡"
				, "임대비용/㎡"
				, "순영업수익 (NOI)/연(자동계산)"
				, "순영업수익 (NOI)/연(회사제출)"
				, "부동산관련총대출이자(금융비용)"
				, "부동산 관련 총대출 원리금"
				, "Cap Rate"
				, "NCR 위험값"
				, "NCR 위험액"
				, "작성자 이름"
				, "작성자 부서"
				, "작성자 전화번호"
			]
			origin = "A3"
		} else if (mode === "02") {
			header = [
				"항목"
				, "회사명"
				, "금융회사코드"
				, "작성기준년월"
				, "계약명칭"
				, "계약일"
				, "만기일"
				, "계약유형1 (유동성/신용공여형)"
				, "계약유형2 (매입약정 등)"
				, "최초 약정금액"
				, "현재 약정잔액"
				, "채무보증 수수료(금액)"
				, "채무보증이행여부"
				, "PF 여부"
				, "PF유형1(해당유형구분)"
				, "PF유형2(분양유형구분)"
				, "PF유형3(수익유형구분)"
				, "기초자산 형태(대분류)"
				, "기초자산 형태(소분류)"
				, "부동산유형(공통)"
				, "부동산소재지"
				, "부동산소재지 우편번호"
				, "부동산 주소"
				, "해외소재 국가 (회외인경우)"
				, "해외소재 도시 (회외인경우)"
				, "미분양관리지역해당여부(현재)"
				, "피보증주체"
				, "피보증주체 법인등록번호"
				, "유동화증권 보증 여부"
				, "유동화증권 명칭"
				, "유동화증권 종류"
				, "유동화증권 발행일자"
				, "유동화증권 액면금액"
				, "유동화증권 발행금리"
				, "LTV(최초투자시점)"
				, "LTV(작성기준일 현재)"
				, "LTV 산출방법"
				, "감정가 기준"
				, "분양가(총매출액) 기준"
				, "심사팀추정가 기준"
				, "변제순위"
				, "임대보증금(총액)"
				, "우선순위 금액"
				, "동순위 금액"
				, "후순위 금액"
				, "타사 신용보강 수단"
				, "신용보강회사(1)"
				, "신용보강회사(1) 법인등록번호"
				, "신용보강회사(1) 법인등록번호"
				, "신용보강회사(1) 기업신용등급"
				, "신용보강회사(2)"
				, "신용보강회사(2) 법인등록번호"
				, "신용보강회사(2) 기업신용등급"
				, "시행사"
				, "시행사 법인등록번호"
				, "PF시행형태"
				, "PF단계(1) (사업승인 전/후)"
				, "PF단계(2) (착공 전/후)"
				, "PF단계(3) (분양 전/후)"
				, "PF단계(4) (준공 전/후)"
				, "총사업비"
				, "총매출액"
				, "자기자본(equity)"
				, "단위면적당(㎡) 분양가"
				, "중도금 상환비율"
				, "분양 또는 임대가능 총면적(㎡)"
				, "예상 공실률"
				, "예상 임대수익/㎡"
				, "예상 임대비용/㎡"
				, "예상 순영업수익(NOI)"
				, "PF대주단 총 대출금"
				, "PF대주단 참여기관 수"
				, "PF대주단 대출 만기일"
				, "대주#1: 대주기관"
				, "대주#1: 대주기관 법인등록번호"
				, "대주#1: 대출금액"
				, "대주#2: 대주기관"
				, "대주#2: 대주기관 법인등록번호"
				, "대주#2: 대출금액"
				, "대주#3: 대주기관"
				, "대주#3: 대주기관 법인등록번호"
				, "대주#3: 대출금액"
				, "대주#4: 대주기관"
				, "대주#4: 대주기관 법인등록번호"
				, "대주#4: 대출금액"
				, "대주#5: 대주기관"
				, "대주#5: 대주기관 법인등록번호"
				, "대주#5: 대출금액"
				, "사업승인 신청일 (인허가 신청일)"
				, "토지매입률 (면적기준)"
				, "책임준공확약 여부"
				, "책임준공확약 기관"
				, "책임준공확약 기관 법인등록번호"
				, "책임준공확약 기관 기업신용등급"
				, "시공사 명칭"
				, "시공사 법인등록번호"
				, "시공사 기업신용등급"
				, "착공일"
				, "준공일(사용승인일)"
				, "계획공정률"
				, "실행공정율"
				, "분양률(분양가 기준)"
				, "분양개시일"
				, "입주율(분양가기준,작성기준현재)"
				, "Exit 분양률 (작성기준일 현재)"
				, "전용면적"
				, "전용면적(㎡)당 단가"
				, "임대가능 총면적"
				, "공실률 ('20.6월말 현재')"
				, "임대수익/㎡"
				, "임대비용/㎡"
				, "순영업수익 (NOI)/연(자동계산)"
				, "순영업수익 (NOI)/연(회사제출)"
				, "부동산관련총대출이자(금융비용)"
				, "부동산 관련 총대출 원리금"
				, "Cap Rate"
				, "NCR 위험값"
				, "NCR 위험액"
				, "작성자 이름"
				, "작성자 부서"
				, "작성자 전화번호"
			]
			origin = "A3"
		} else if (mode === "03") {
			header = [
				"항목"
				, "회사명"
				, "금융회사코드"
				, "작성기준년월"
				, "투자형태1"
				, "부동산펀드/REITs 투자형태2"
				, "PF 여부"
				, "사회기반시설(SOC) 여부"
				, "최초 투자일"
				, "투자 종료일(계약 종료일)"
				, "부동산유형"
				, "부동산 개발사업(PF) 유형1"
				, "부동산 개발사업(PF) 유형2"
				, "부동산소재지"
				, "해외소재 국가(해외인 경우)"
				, "해외소재 도시(해외인 경우)"
				, "부동산소재지 우편번호"
				, "펀드명칭"
				, "펀드코드(금투협회 펀드코드)"
				, "자산운용사"
				, "재간접펀드여부"
				, "블라인드펀드 여부"
				, "펀드 투자금액"
				, "펀드 평가금액(작성기준일 현재)"
				, "공/사모 구분"
				, "통화(currency)"
				, "REITs 명칭"
				, "REITs 투자금액"
				, "REITs 평가금액(작성기준일 현재)"
				, "공/사모 구분"
				, "통화(currency)"
				, "유동화증권 명칭"
				, "유동화증권 종류"
				, "유동화증권 발행기관"
				, "유동화증권발행기관 법인등록번호"
				, "발행일자"
				, "액면금액"
				, "발행금리"
				, "신용보강기관"
				, "신용보강기관 법인등록번호"
				, "신용보강형태"
				, "신용등급(신용평가결과1)"
				, "신용등급(신용평가결과2)"
				, "계약명칭"
				, "거래상대방"
				, "투자금액(원금)"
				, "평가금액(작성기준일 현재)"
				, , "NCR 위험값"
				, "NCR 위험액"
				, "작성자 이름"
				, "작성자 부서"
				, "작성자 전화번호"
			]
			origin = "A2"
		}
	
		setOptions = {
			header: header,
			origin: origin
		}
	
		return setOptions;
	}
	
	/*
	 *	엑셀(Excel) - 헤더 시작열 지정
	 */
	function sr(rows) {
		if (mode === "01") {
			return rows.slice(2);
		} else if (mode === "02") {
			return rows.slice(2);
		} else if (mode === "03") {
			return rows.slice(1);
		}
	}
	
	/*
	 *	엑셀(Excel) - 헤더 양식
	 */
	function addRows_cpc1Grid(rows) {
		rows.forEach(function (row) {
			const rgstSn = row["항목"];
			const cmpNm = row["회사명"];
			const fssCmpCd = row["금융회사코드"];
			const wrtnStdrDt = row["작성기준년월"];
			const prdtNm = row["계약명칭"];
			const ctrtDt = row["계약일"];
			const expDt = row["만기일"];
			const rptsCtrtTpCd = row["계약유형1 (유동성/신용공여형)"];
			const rptsCtrtTpDetlCd = row["계약유형2 (매입약정 등)"];
			const frsCtrcAmt = row["최초 약정금액"];
			const eprzCrdlNowCtrcBlce = row["현재 약정잔액"];
			const detGrteFee = row["채무보증 수수료(금액)"];
			const detGrteFlflDcd = row["채무보증이행여부"];
			const pfThcsDcd = row["PF 여부"];
			const pfTpDcd = row["PF유형1(해당유형구분)"];
			const pfSlltTpDcd = row["PF유형2(분양유형구분)"];
			const pfErnTpDcd = row["PF유형3(수익유형구분)"];
			const pfBssAsstLclsCd = row["기초자산 형태(대분류)"];
			const pfBssAsstSclsCd = row["기초자산 형태(소분류)"];
			const rlesTpDcd = row["부동산유형(공통)"];
			const bssAsstLctpDcd = row["부동산소재지"];
			const rlesLctpZpcd = row["부동산소재지 우편번호"];
			const lctpAddr = row["부동산 주소"];
			const pfOvrsLctNtnCd = row["해외소재 국가 (회외인경우)"];
			const ovrsLctCtyNm = row["해외소재 도시 (회외인경우)"];
			const unsldThcsDcd = row["미분양관리지역해당여부(현재)"];
			const wrteMbdyNm = row["피보증주체"];
			const wrteMbdyCrno = row["피보증주체 법인등록번호"];
			const lqdzSctyGrteThcsDcd = row["유동화증권 보증 여부"];
			const lqdzSctyNm = row["유동화증권 명칭"];
			const lqdzSctyKndCd = row["유동화증권 종류"];
			const lqdzSctyIsuDt = row["유동화증권 발행일자"];
			const lqdzSctyParAmt = row["유동화증권 액면금액"];
			const lqdzSctyIsuIntrt = row["유동화증권 발행금리"];
			const frsInvPotLtvRto = row["LTV(최초투자시점)"];
			const wrtnStdrDeLtvRto = row["LTV(작성기준일 현재)"];
			const ltvOutputMthDcd = row["LTV 산출방법"];
			const aprsPrc = row["감정가 기준"];
			const totSlltAmt = row["분양가(총매출액) 기준"];
			const jdgmTeamPrsmAmt = row["심사팀추정가 기준"];
			const pybkRankDcd = row["변제순위"];
			const rlesRentGrteAmt = row["임대보증금(총액)"];
			const prfdRankAmt = row["우선순위 금액"];
			const sodrAmt = row["동순위 금액"];
			const bkbnAmt = row["후순위 금액"];
			const otcmCrdtRifcThcsDcd = row["타사 신용보강 수단"];
			const otcmCrdtRifcMnDcd = row["신용보강회사(1)"];
			const sq1CrdtRifcCmpNm = row["신용보강회사(1) 법인등록번호"];
			const sq1CrdtRifcCmpCrno = row["신용보강회사(1) 법인등록번호"];
			const sq1CrdtRifcCmpCrdtGrdCd = row["신용보강회사(1) 기업신용등급"];
			const sq2CrdtRifcCmpNm = row["신용보강회사(2)"];
			const sq2CrdtRifcCmpCrno = row["신용보강회사(2) 법인등록번호"];
			const sq2CrdtRifcCmpCrdtGrdCd = row["신용보강회사(2) 기업신용등급"];
			const efceCmpNm = row["시행사"];
			const efceCmpCrno = row["시행사 법인등록번호"];
			const pfEfceShpDcd = row["PF시행형태"];
			const pfBusiApvlStepCd = row["PF단계(1) (사업승인 전/후)"];
			const pfCsstStepCd = row["PF단계(2) (착공 전/후)"];
			const pfSlltStepCd = row["PF단계(3) (분양 전/후)"];
			const pfCnfnStepCd = row["PF단계(4) (준공 전/후)"];
			const totBusiAmt = row["총사업비"];
			const rvnuAmt = row["총매출액"];
			const slfCpta = row["자기자본(equity)"];
			const unSqmsSlltAmt = row["단위면적당(㎡) 분양가"];
			const mdwyGoldRdmpRto = row["중도금 상환비율"];
			const allSqms = row["분양 또는 임대가능 총면적(㎡)"];
			const estmEmrmRt = row["예상 공실률"];
			const unSqmsEstmRentErnAmt = row["예상 임대수익/㎡"];
			const unSqmsEstmRentCt = row["예상 임대비용/㎡"];
			const estmPurBsnErnAmt = row["예상 순영업수익(NOI)"];
			const pfStlnTotLoanAmt = row["PF대주단 총 대출금"];
			const pfStlnPtciIsttNum = row["PF대주단 참여기관 수"];
			const pfStlnLoanExpDt = row["PF대주단 대출 만기일"];
			const sq1StlnIsttNm = row["대주#1: 대주기관"];
			const sq1StlnIsttCrno = row["대주#1: 대주기관 법인등록번호"];
			const sq1StlnLoanAmt = row["대주#1: 대출금액"];
			const sq2StlnIsttNm = row["대주#2: 대주기관"];
			const sq2StlnIsttCrno = row["대주#2: 대주기관 법인등록번호"];
			const sq2StlnLoanAmt = row["대주#2: 대출금액"];
			const sq3StlnIsttNm = row["대주#3: 대주기관"];
			const sq3StlnIsttCrno = row["대주#3: 대주기관 법인등록번호"];
			const sq3StlnLoanAmt = row["대주#3: 대출금액"];
			const sq4StlnIsttNm = row["대주#4: 대주기관"];
			const sq4StlnIsttCrno = row["대주#4: 대주기관 법인등록번호"];
			const sq4StlnLoanAmt = row["대주#4: 대출금액"];
			const sq5StlnIsttNm = row["대주#5: 대주기관"];
			const sq5StlnIsttCrno = row["대주#5: 대주기관 법인등록번호"];
			const sq5StlnLoanAmt = row["대주#5: 대출금액"];
			const busiApvlRqsDt = row["사업승인 신청일 (인허가 신청일)"];
			const landPchsRt = row["토지매입률 (면적기준)"];
			const rsplCnfnCfrmThcsDcd = row["책임준공확약 여부"];
			const rsplCnfnCfrmIsttNm = row["책임준공확약 기관"];
			const rsplCnfnCfrmIsttCrno = row["책임준공확약 기관 법인등록번호"];
			const rsplCnfnEprzCrdtGrdCd = row["책임준공확약 기관 기업신용등급"];
			const csucCmpNm = row["시공사 명칭"];
			const csucCmpCrno = row["시공사 법인등록번호"];
			const csucCmpEprzCrdtGrdCd = row["시공사 기업신용등급"];
			const csstDt = row["착공일"];
			const cnfnDt = row["준공일(사용승인일)"];
			const plnFairRt = row["계획공정률"];
			const excFairRt = row["실행공정율"];
			const slltRt = row["분양률(분양가 기준)"];
			const slltOpngDt = row["분양개시일"];
			const moinRt = row["입주율(분양가기준,작성기준현재)"];
			const exitSlltRt = row["Exit 분양률 (작성기준일 현재)"];
			const dvrSqms = row["전용면적"];
			const dvrSqmsUnAmt = row["전용면적(㎡)당 단가"];
			const rentPsblTotSqms = row["임대가능 총면적"];
			const emrmRt = row["공실률 ('20.6월말 현재')"];
			const unSqmsRentErnAmt = row["임대수익/㎡"];
			const unSqmsRentCt = row["임대비용/㎡"];
			const sq1YrlyPurBsnErnAmt = row["순영업수익 (NOI)/연(자동계산)"];
			const sq2YrlyPurBsnErnAmt = row["순영업수익 (NOI)/연(회사제출)"];
			const rlesTotLoanIntr = row["부동산관련총대출이자(금융비용)"];
			const rlesTotLoanPaiAmt = row["부동산 관련 총대출 원리금"];
			const cptlRstrRt = row["Cap Rate"];
			const ncrRskVl = row["NCR 위험값"];
			const ncrRskAmt = row["NCR 위험액"];
			const jobChrrNm = row["작성자 이름"];
			const dptNm = row["작성자 부서"];
			const cplcCtns = row["작성자 전화번호"];
	
			var newRow = {
				rgstSn: rgstSn
				, cmpNm: cmpNm
				, fssCmpCd: fssCmpCd
				, wrtnStdrDt: wrtnStdrDt
				, prdtNm: prdtNm
				, ctrtDt: ctrtDt
				, expDt: expDt
				, rptsCtrtTpCd: rptsCtrtTpCd
				, rptsCtrtTpDetlCd: rptsCtrtTpDetlCd
				, frsCtrcAmt: frsCtrcAmt
				, eprzCrdlNowCtrcBlce: eprzCrdlNowCtrcBlce
				, detGrteFee: detGrteFee
				, detGrteFlflDcd: detGrteFlflDcd
				, pfThcsDcd: pfThcsDcd
				, pfTpDcd: pfTpDcd
				, pfSlltTpDcd: pfSlltTpDcd
				, pfErnTpDcd: pfErnTpDcd
				, pfBssAsstLclsCd: pfBssAsstLclsCd
				, pfBssAsstSclsCd: pfBssAsstSclsCd
				, rlesTpDcd: rlesTpDcd
				, bssAsstLctpDcd: bssAsstLctpDcd
				, rlesLctpZpcd: rlesLctpZpcd
				, lctpAddr: lctpAddr
				, pfOvrsLctNtnCd: pfOvrsLctNtnCd
				, ovrsLctCtyNm: ovrsLctCtyNm
				, unsldThcsDcd: unsldThcsDcd
				, wrteMbdyNm: wrteMbdyNm
				, wrteMbdyCrno: wrteMbdyCrno
				, lqdzSctyGrteThcsDcd: lqdzSctyGrteThcsDcd
				, lqdzSctyNm: lqdzSctyNm
				, lqdzSctyKndCd: lqdzSctyKndCd
				, lqdzSctyIsuDt: lqdzSctyIsuDt
				, lqdzSctyParAmt: lqdzSctyParAmt
				, lqdzSctyIsuIntrt: lqdzSctyIsuIntrt
				, frsInvPotLtvRto: frsInvPotLtvRto
				, wrtnStdrDeLtvRto: wrtnStdrDeLtvRto
				, ltvOutputMthDcd: ltvOutputMthDcd
				, aprsPrc: aprsPrc
				, totSlltAmt: totSlltAmt
				, jdgmTeamPrsmAmt: jdgmTeamPrsmAmt
				, pybkRankDcd: pybkRankDcd
				, rlesRentGrteAmt: rlesRentGrteAmt
				, prfdRankAmt: prfdRankAmt
				, sodrAmt: sodrAmt
				, bkbnAmt: bkbnAmt
				, otcmCrdtRifcThcsDcd: otcmCrdtRifcThcsDcd
				, otcmCrdtRifcMnDcd: otcmCrdtRifcMnDcd
				, sq1CrdtRifcCmpNm: sq1CrdtRifcCmpNm
				, sq1CrdtRifcCmpCrno: sq1CrdtRifcCmpCrno
				, sq1CrdtRifcCmpCrdtGrdCd: sq1CrdtRifcCmpCrdtGrdCd
				, sq2CrdtRifcCmpNm: sq2CrdtRifcCmpNm
				, sq2CrdtRifcCmpCrno: sq2CrdtRifcCmpCrno
				, sq2CrdtRifcCmpCrdtGrdCd: sq2CrdtRifcCmpCrdtGrdCd
				, efceCmpNm: efceCmpNm
				, efceCmpCrno: efceCmpCrno
				, pfEfceShpDcd: pfEfceShpDcd
				, pfBusiApvlStepCd: pfBusiApvlStepCd
				, pfCsstStepCd: pfCsstStepCd
				, pfSlltStepCd: pfSlltStepCd
				, pfCnfnStepCd: pfCnfnStepCd
				, totBusiAmt: totBusiAmt
				, rvnuAmt: rvnuAmt
				, slfCpta: slfCpta
				, unSqmsSlltAmt: unSqmsSlltAmt
				, mdwyGoldRdmpRto: mdwyGoldRdmpRto
				, allSqms: allSqms
				, estmEmrmRt: estmEmrmRt
				, unSqmsEstmRentErnAmt: unSqmsEstmRentErnAmt
				, unSqmsEstmRentCt: unSqmsEstmRentCt
				, estmPurBsnErnAmt: estmPurBsnErnAmt
				, pfStlnTotLoanAmt: pfStlnTotLoanAmt
				, pfStlnPtciIsttNum: pfStlnPtciIsttNum
				, pfStlnLoanExpDt: pfStlnLoanExpDt
				, sq1StlnIsttNm: sq1StlnIsttNm
				, sq1StlnIsttCrno: sq1StlnIsttCrno
				, sq1StlnLoanAmt: sq1StlnLoanAmt
				, sq2StlnIsttNm: sq2StlnIsttNm
				, sq2StlnIsttCrno: sq2StlnIsttCrno
				, sq2StlnLoanAmt: sq2StlnLoanAmt
				, sq3StlnIsttNm: sq3StlnIsttNm
				, sq3StlnIsttCrno: sq3StlnIsttCrno
				, sq3StlnLoanAmt: sq3StlnLoanAmt
				, sq4StlnIsttNm: sq4StlnIsttNm
				, sq4StlnIsttCrno: sq4StlnIsttCrno
				, sq4StlnLoanAmt: sq4StlnLoanAmt
				, sq5StlnIsttNm: sq5StlnIsttNm
				, sq5StlnIsttCrno: sq5StlnIsttCrno
				, sq5StlnLoanAmt: sq5StlnLoanAmt
				, busiApvlRqsDt: busiApvlRqsDt
				, landPchsRt: landPchsRt
				, rsplCnfnCfrmThcsDcd: rsplCnfnCfrmThcsDcd
				, rsplCnfnCfrmIsttNm: rsplCnfnCfrmIsttNm
				, rsplCnfnCfrmIsttCrno: rsplCnfnCfrmIsttCrno
				, rsplCnfnEprzCrdtGrdCd: rsplCnfnEprzCrdtGrdCd
				, csucCmpNm: csucCmpNm
				, csucCmpCrno: csucCmpCrno
				, csucCmpEprzCrdtGrdCd: csucCmpEprzCrdtGrdCd
				, csstDt: csstDt
				, cnfnDt: cnfnDt
				, plnFairRt: plnFairRt
				, excFairRt: excFairRt
				, slltRt: slltRt
				, slltOpngDt: slltOpngDt
				, moinRt: moinRt
				, exitSlltRt: exitSlltRt
				, dvrSqms: dvrSqms
				, dvrSqmsUnAmt: dvrSqmsUnAmt
				, rentPsblTotSqms: rentPsblTotSqms
				, emrmRt: emrmRt
				, unSqmsRentErnAmt: unSqmsRentErnAmt
				, unSqmsRentCt: unSqmsRentCt
				, sq1YrlyPurBsnErnAmt: sq1YrlyPurBsnErnAmt
				, sq2YrlyPurBsnErnAmt: sq2YrlyPurBsnErnAmt
				, rlesTotLoanIntr: rlesTotLoanIntr
				, rlesTotLoanPaiAmt: rlesTotLoanPaiAmt
				, cptlRstrRt: cptlRstrRt
				, ncrRskVl: ncrRskVl
				, ncrRskAmt: ncrRskAmt
				, jobChrrNm: jobChrrNm
				, dptNm: dptNm
				, cplcCtns: cplcCtns
			};
			$("#TB09090S_colCpc1").pqGrid("addRow", { rowData: newRow, checkEditable: false });
		});
		$("#TB09090S_colCpc1").pqGrid("refreshDataAndView");
	}
	
	function addRows_cpc2Grid(rows) {
		rows.forEach(function (row) {
			const rgstSn = row["항목"]
			const cmpNm = row["회사명"]
			const fssCmpCd = row["금융회사코드"]
			const wrtnStdrDt = row["작성기준년월"]
			const prdtNm = row["계약명칭"]
			const ctrtDt = row["계약일"]
			const expDt = row["만기일"]
			const rptsCtrtTpCd = row["계약유형1 (유동성/신용공여형)"]
			const rptsCtrtTpDetlCd = row["계약유형2 (매입약정 등)"]
			const frsCtrcAmt = row["최초 약정금액"]
			const eprzCrdlNowCtrcBlce = row["현재 약정잔액"]
			const detGrteFee = row["채무보증 수수료(금액)"]
			const detGrteFlflDcd = row["채무보증이행여부"]
			const pfThcsDcd = row["PF 여부"]
			const pfTpDcd = row["PF유형1(해당유형구분)"]
			const pfSlltTpDcd = row["PF유형2(분양유형구분)"]
			const pfErnTpDcd = row["PF유형3(수익유형구분)"]
			const pfBssAsstLclsCd = row["기초자산 형태(대분류)"]
			const pfBssAsstSclsCd = row["기초자산 형태(소분류)"]
			const rlesTpDcd = row["부동산유형(공통)"]
			const bssAsstLctpDcd = row["부동산소재지"]
			const rlesLctpZpcd = row["부동산소재지 우편번호"]
			const lctpAddr = row["부동산 주소"]
			const pfOvrsLctNtnCd = row["해외소재 국가 (회외인경우)"]
			const ovrsLctCtyNm = row["해외소재 도시 (회외인경우)"]
			const unsldThcsDcd = row["미분양관리지역해당여부(현재)"]
			const wrteMbdyNm = row["피보증주체"]
			const wrteMbdyCrno = row["피보증주체 법인등록번호"]
			const lqdzSctyGrteThcsDcd = row["유동화증권 보증 여부"]
			const lqdzSctyNm = row["유동화증권 명칭"]
			const lqdzSctyKndCd = row["유동화증권 종류"]
			const lqdzSctyIsuDt = row["유동화증권 발행일자"]
			const lqdzSctyParAmt = row["유동화증권 액면금액"]
			const lqdzSctyIsuIntrt = row["유동화증권 발행금리"]
			const frsInvPotLtvRto = row["LTV(최초투자시점)"]
			const wrtnStdrDeLtvRto = row["LTV(작성기준일 현재)"]
			const ltvOutputMthDcd = row["LTV 산출방법"]
			const aprsPrc = row["감정가 기준"]
			const totSlltAmt = row["분양가(총매출액) 기준"]
			const jdgmTeamPrsmAmt = row["심사팀추정가 기준"]
			const pybkRankDcd = row["변제순위"]
			const rlesRentGrteAmt = row["임대보증금(총액)"]
			const prfdRankAmt = row["우선순위 금액"]
			const sodrAmt = row["동순위 금액"]
			const bkbnAmt = row["후순위 금액"]
			const otcmCrdtRifcThcsDcd = row["타사 신용보강"]
			const otcmCrdtRifcMnDcd = row["타사 신용보강 수단"]
			const sq1CrdtRifcCmpNm = row["신용보강회사(1)"]
			const sq1CrdtRifcCmpCrno = row["신용보강회사(1) 법인등록번호"]
			const sq1CrdtRifcCmpCrdtGrdCd = row["신용보강회사(1) 기업신용등급"]
			const sq2CrdtRifcCmpNm = row["신용보강회사(2)"]
			const sq2CrdtRifcCmpCrno = row["신용보강회사(2) 법인등록번호"]
			const sq2CrdtRifcCmpCrdtGrdCd = row["신용보강회사(2) 기업신용등급"]
			const efceCmpNm = row["시행사"]
			const efceCmpCrno = row["시행사 법인등록번호"]
			const pfEfceShpDcd = row["PF시행형태"]
			const pfBusiApvlStepCd = row["PF단계(1) (사업승인 전/후)"]
			const pfCsstStepCd = row["PF단계(2) (착공 전/후)"]
			const pfSlltStepCd = row["PF단계(3) (분양 전/후)"]
			const pfCnfnStepCd = row["PF단계(4) (준공 전/후)"]
			const totBusiAmt = row["총사업비"]
			const rvnuAmt = row["총매출액"]
			const slfCpta = row["자기자본(equity)"]
			const unSqmsSlltAmt = row["단위면적당(㎡) 분양가"]
			const mdwyGoldRdmpRto = row["중도금 상환비율"]
			const allSqms = row["분양 또는 임대가능 총면적(㎡)"]
			const estmEmrmRt = row["예상 공실률"]
			const unSqmsEstmRentErnAmt = row["예상 임대수익/㎡"]
			const unSqmsEstmRentCt = row["예상 임대비용/㎡"]
			const estmPurBsnErnAmt = row["예상 순영업수익(NOI)"]
			const pfStlnTotLoanAmt = row["PF대주단 총 대출금"]
			const pfStlnPtciIsttNum = row["PF대주단 참여기관 수"]
			const pfStlnLoanExpDt = row["PF대주단 대출 만기일"]
			const sq1StlnIsttNm = row["대주#1: 대주기관"]
			const sq1StlnIsttCrno = row["대주#1: 대주기관 법인등록번호"]
			const sq1StlnLoanAmt = row["대주#1: 대출금액"]
			const sq2StlnIsttNm = row["대주#2: 대주기관"]
			const sq2StlnIsttCrno = row["대주#2: 대주기관 법인등록번호"]
			const sq2StlnLoanAmt = row["대주#2: 대출금액"]
			const sq3StlnIsttNm = row["대주#3: 대주기관"]
			const sq3StlnIsttCrno = row["대주#3: 대주기관 법인등록번호"]
			const sq3StlnLoanAmt = row["대주#3: 대출금액"]
			const sq4StlnIsttNm = row["대주#4: 대주기관"]
			const sq4StlnIsttCrno = row["대주#4: 대주기관 법인등록번호"]
			const sq4StlnLoanAmt = row["대주#4: 대출금액"]
			const sq5StlnIsttNm = row["대주#5: 대주기관"]
			const sq5StlnIsttCrno = row["대주#5: 대주기관 법인등록번호"]
			const sq5StlnLoanAmt = row["대주#5: 대출금액"]
			const busiApvlRqsDt = row["사업승인 신청일 (인허가 신청일)"]
			const landPchsRt = row["토지매입률 (면적기준)"]
			const rsplCnfnCfrmThcsDcd = row["책임준공확약 여부"]
			const rsplCnfnCfrmIsttNm = row["책임준공확약 기관"]
			const rsplCnfnCfrmIsttCrno = row["책임준공확약 기관 법인등록번호"]
			const rsplCnfnEprzCrdtGrdCd = row["책임준공확약 기관 기업신용등급"]
			const csucCmpNm = row["시공사 명칭"]
			const csucCmpCrno = row["시공사 법인등록번호"]
			const csucCmpEprzCrdtGrdCd = row["시공사 기업신용등급"]
			const csstDt = row["착공일"]
			const cnfnDt = row["준공일(사용승인일)"]
			const plnFairRt = row["계획공정률"]
			const excFairRt = row["실행공정률"]
			const slltRt = row["분양률(분양가 기준)"]
			const slltOpngDt = row["분양개시일"]
			const moinRt = row["입주율(분양가기준,작성기준현재)"]
			const exitSlltRt = row["Exit 분양률 (작성기준일 현재)"]
			const dvrSqms = row["전용면적"]
			const dvrSqmsUnAmt = row["전용면적(㎡)당 단가"]
			const rentPsblTotSqms = row["임대가능 총면적"]
			const emrmRt = row["공실률 ('20.6월말 현재')"]
			const unSqmsRentErnAmt = row["임대수익/㎡"]
			const unSqmsRentCt = row["임대비용/㎡"]
			const sq1YrlyPurBsnErnAmt = row["순영업수익 (NOI)/연(자동계산)"]
			const sq2YrlyPurBsnErnAmt = row["순영업수익 (NOI)/연(회사제출)"]
			const rlesTotLoanIntr = row["부동산관련총대출이자(금융비용)"]
			const rlesTotLoanPaiAmt = row["부동산 관련 총대출 원리금"]
			const cptlRstrRt = row["Cap Rate"]
			const ncrRskVl = row["NCR 위험값"]
			const ncrRskAmt = row["NCR 위험액"]
			const jobChrrNm = row["작성자 이름"]
			const dprtCd = row["작성자 부서"]
			const cplcCtns = row["작성자 전화번호"]
	
			var newRow = {
				rgstSn: rgstSn
				, cmpNm: cmpNm
				, fssCmpCd: fssCmpCd
				, wrtnStdrDt: wrtnStdrDt
				, prdtNm: prdtNm
				, ctrtDt: ctrtDt
				, expDt: expDt
				, rptsCtrtTpCd: rptsCtrtTpCd
				, rptsCtrtTpDetlCd: rptsCtrtTpDetlCd
				, frsCtrcAmt: frsCtrcAmt
				, eprzCrdlNowCtrcBlce: eprzCrdlNowCtrcBlce
				, detGrteFee: detGrteFee
				, detGrteFlflDcd: detGrteFlflDcd
				, pfThcsDcd: pfThcsDcd
				, pfTpDcd: pfTpDcd
				, pfSlltTpDcd: pfSlltTpDcd
				, pfErnTpDcd: pfErnTpDcd
				, pfBssAsstLclsCd: pfBssAsstLclsCd
				, pfBssAsstSclsCd: pfBssAsstSclsCd
				, rlesTpDcd: rlesTpDcd
				, bssAsstLctpDcd: bssAsstLctpDcd
				, rlesLctpZpcd: rlesLctpZpcd
				, lctpAddr: lctpAddr
				, pfOvrsLctNtnCd: pfOvrsLctNtnCd
				, ovrsLctCtyNm: ovrsLctCtyNm
				, unsldThcsDcd: unsldThcsDcd
				, wrteMbdyNm: wrteMbdyNm
				, wrteMbdyCrno: wrteMbdyCrno
				, lqdzSctyGrteThcsDcd: lqdzSctyGrteThcsDcd
				, lqdzSctyNm: lqdzSctyNm
				, lqdzSctyKndCd: lqdzSctyKndCd
				, lqdzSctyIsuDt: lqdzSctyIsuDt
				, lqdzSctyParAmt: lqdzSctyParAmt
				, lqdzSctyIsuIntrt: lqdzSctyIsuIntrt
				, frsInvPotLtvRto: frsInvPotLtvRto
				, wrtnStdrDeLtvRto: wrtnStdrDeLtvRto
				, ltvOutputMthDcd: ltvOutputMthDcd
				, aprsPrc: aprsPrc
				, totSlltAmt: totSlltAmt
				, jdgmTeamPrsmAmt: jdgmTeamPrsmAmt
				, pybkRankDcd: pybkRankDcd
				, rlesRentGrteAmt: rlesRentGrteAmt
				, prfdRankAmt: prfdRankAmt
				, sodrAmt: sodrAmt
				, bkbnAmt: bkbnAmt
				, otcmCrdtRifcThcsDcd: otcmCrdtRifcThcsDcd
				, otcmCrdtRifcMnDcd: otcmCrdtRifcMnDcd
				, sq1CrdtRifcCmpNm: sq1CrdtRifcCmpNm
				, sq1CrdtRifcCmpCrno: sq1CrdtRifcCmpCrno
				, sq1CrdtRifcCmpCrdtGrdCd: sq1CrdtRifcCmpCrdtGrdCd
				, sq2CrdtRifcCmpNm: sq2CrdtRifcCmpNm
				, sq2CrdtRifcCmpCrno: sq2CrdtRifcCmpCrno
				, sq2CrdtRifcCmpCrdtGrdCd: sq2CrdtRifcCmpCrdtGrdCd
				, efceCmpNm: efceCmpNm
				, efceCmpCrno: efceCmpCrno
				, pfEfceShpDcd: pfEfceShpDcd
				, pfBusiApvlStepCd: pfBusiApvlStepCd
				, pfCsstStepCd: pfCsstStepCd
				, pfSlltStepCd: pfSlltStepCd
				, pfCnfnStepCd: pfCnfnStepCd
				, totBusiAmt: totBusiAmt
				, rvnuAmt: rvnuAmt
				, slfCpta: slfCpta
				, unSqmsSlltAmt: unSqmsSlltAmt
				, mdwyGoldRdmpRto: mdwyGoldRdmpRto
				, allSqms: allSqms
				, estmEmrmRt: estmEmrmRt
				, unSqmsEstmRentErnAmt: unSqmsEstmRentErnAmt
				, unSqmsEstmRentCt: unSqmsEstmRentCt
				, estmPurBsnErnAmt: estmPurBsnErnAmt
				, pfStlnTotLoanAmt: pfStlnTotLoanAmt
				, pfStlnPtciIsttNum: pfStlnPtciIsttNum
				, pfStlnLoanExpDt: pfStlnLoanExpDt
				, sq1StlnIsttNm: sq1StlnIsttNm
				, sq1StlnIsttCrno: sq1StlnIsttCrno
				, sq1StlnLoanAmt: sq1StlnLoanAmt
				, sq2StlnIsttNm: sq2StlnIsttNm
				, sq2StlnIsttCrno: sq2StlnIsttCrno
				, sq2StlnLoanAmt: sq2StlnLoanAmt
				, sq3StlnIsttNm: sq3StlnIsttNm
				, sq3StlnIsttCrno: sq3StlnIsttCrno
				, sq3StlnLoanAmt: sq3StlnLoanAmt
				, sq4StlnIsttNm: sq4StlnIsttNm
				, sq4StlnIsttCrno: sq4StlnIsttCrno
				, sq4StlnLoanAmt: sq4StlnLoanAmt
				, sq5StlnIsttNm: sq5StlnIsttNm
				, sq5StlnIsttCrno: sq5StlnIsttCrno
				, sq5StlnLoanAmt: sq5StlnLoanAmt
				, busiApvlRqsDt: busiApvlRqsDt
				, landPchsRt: landPchsRt
				, rsplCnfnCfrmThcsDcd: rsplCnfnCfrmThcsDcd
				, rsplCnfnCfrmIsttNm: rsplCnfnCfrmIsttNm
				, rsplCnfnCfrmIsttCrno: rsplCnfnCfrmIsttCrno
				, rsplCnfnEprzCrdtGrdCd: rsplCnfnEprzCrdtGrdCd
				, csucCmpNm: csucCmpNm
				, csucCmpCrno: csucCmpCrno
				, csucCmpEprzCrdtGrdCd: csucCmpEprzCrdtGrdCd
				, csstDt: csstDt
				, cnfnDt: cnfnDt
				, plnFairRt: plnFairRt
				, excFairRt: excFairRt
				, slltRt: slltRt
				, slltOpngDt: slltOpngDt
				, moinRt: moinRt
				, exitSlltRt: exitSlltRt
				, dvrSqms: dvrSqms
				, dvrSqmsUnAmt: dvrSqmsUnAmt
				, rentPsblTotSqms: rentPsblTotSqms
				, emrmRt: emrmRt
				, unSqmsRentErnAmt: unSqmsRentErnAmt
				, unSqmsRentCt: unSqmsRentCt
				, sq1YrlyPurBsnErnAmt: sq1YrlyPurBsnErnAmt
				, sq2YrlyPurBsnErnAmt: sq2YrlyPurBsnErnAmt
				, rlesTotLoanIntr: rlesTotLoanIntr
				, rlesTotLoanPaiAmt: rlesTotLoanPaiAmt
				, cptlRstrRt: cptlRstrRt
				, ncrRskVl: ncrRskVl
				, ncrRskAmt: ncrRskAmt
				, jobChrrNm: jobChrrNm
				, dprtCd: dprtCd
				, cplcCtns: cplcCtns
			};
			$("#TB09090S_colCpc2").pqGrid("addRow", { rowData: newRow, checkEditable: false });
		});
		$("#TB09090S_colCpc2").pqGrid("refreshDataAndView");
	}
	
	function addRows_cpc3Grid(rows) {
		rows.forEach(function (row) {
			const rgstSn = row["항목"];
			const cmpNm = row["회사명"];
			const fssCmpCd = row["금융회사코드"];
			const wrtnStdrDt = row["작성기준년월"];
			const etcRptsInvShpCd = row["투자형태1"];
			const etcRptsInvDetlCd = row["부동산펀드/REITs 투자형태2"];
			const pfThcsDcd = row["PF 여부"];
			const socThcsDcd = row["사회기반시설(SOC) 여부"];
			const invDt = row["최초 투자일"];
			const ctrtEndDt = row["투자 종료일(계약 종료일)"];
			const rlesTpDcd = row["부동산유형"];
			const pfSlltTpDcd = row["부동산 개발사업(PF) 유형1"];
			const pfErnTpDcd = row["부동산 개발사업(PF) 유형2"];
			const bssAsstLctpDcd = row["부동산소재지"];
			const ntnNm = row["해외소재 국가(해외인 경우)"];
			const ovrsLctCtyNm = row["해외소재 도시(해외인 경우)"];
			const rlesLctpZpcd = row["부동산소재지 우편번호"];
			const fndNm = row["펀드명칭"];
			const kofiaFndCd = row["펀드코드(금투협회 펀드코드)"];
			const asstMgcoNm = row["자산운용사"];
			const fofsThcsDcd = row["재간접펀드여부"];
			const bdfndThcsDcd = row["블라인드펀드 여부"];
			const fndInvAmt = row["펀드 투자금액"];
			const fndTotEvlAmt = row["펀드 평가금액(작성기준일 현재)"];
			const fndEtcRptsPbffPplcDcd = row["공/사모 구분"];
			const fndEtcRptsCrryCd = row["통화(currency)"];
			const reitsNm = row["REITs 명칭"];
			const reitsAmt = row["REITs 투자금액"];
			const reitsEvlAmt = row["REITs 평가금액(작성기준일 현재)"];
			const reitsEtcRptsPbffPplcDcd = row["공/사모 구분"];
			const reitsEtcRptsCrryCd = row["통화(currency)"];
			const lqdzSctyNm = row["유동화증권 명칭"];
			const lqdzSctyKndCd = row["유동화증권 종류"];
			const lqdzSctyIsuIsttNm = row["유동화증권 발행기관"];
			const lqdzSctyCrno = row["유동화증권발행기관 법인등록번호"];
			const isuDt = row["발행일자"];
			const parAmt = row["액면금액"];
			const lqdzSctyIsuIntrt = row["발행금리"];
			const crdtRifcCmpNm = row["신용보강기관"];
			const crdtRifcCmpCrno = row["신용보강기관 법인등록번호"];
			const rptsCtrtTpCd = row["신용보강형태"];
			const sq1EtcRptsCrdtGrdCd = row["신용등급(신용평가결과1)"];
			const sq2EtcRptsCrdtGrdCd = row["신용등급(신용평가결과2)"];
			const etcCtrtNm = row["계약명칭"];
			const trOthrNm = row["거래상대방"];
			const invPrna = row["투자금액(원금)"];
			const etcEvlAmt = row["평가금액(작성기준일 현재)"];
			const ncrRskVl = row["NCR 위험값"];
			const ncrRskAmt = row["NCR 위험액"];
			const jobChrrNm = row["작성자 이름"];
			const dprtCd = row["작성자 부서"];
			const cplcCtns = row["작성자 전화번호"];
	
			let newRow = {
				rgstSn: rgstSn
				, cmpNm: cmpNm
				, fssCmpCd: fssCmpCd
				, wrtnStdrDt: wrtnStdrDt
				, etcRptsInvShpCd: etcRptsInvShpCd
				, etcRptsInvDetlCd: etcRptsInvDetlCd
				, pfThcsDcd: pfThcsDcd
				, socThcsDcd: socThcsDcd
				, invDt: invDt
				, ctrtEndDt: ctrtEndDt
				, rlesTpDcd: rlesTpDcd
				, pfSlltTpDcd: pfSlltTpDcd
				, pfErnTpDcd: pfErnTpDcd
				, bssAsstLctpDcd: bssAsstLctpDcd
				, ntnNm: ntnNm
				, ovrsLctCtyNm: ovrsLctCtyNm
				, rlesLctpZpcd: rlesLctpZpcd
				, fndNm: fndNm
				, kofiaFndCd: kofiaFndCd
				, asstMgcoNm: asstMgcoNm
				, fofsThcsDcd: fofsThcsDcd
				, bdfndThcsDcd: bdfndThcsDcd
				, fndInvAmt: fndInvAmt
				, fndTotEvlAmt: fndTotEvlAmt
				, fndEtcRptsPbffPplcDcd: fndEtcRptsPbffPplcDcd
				, fndEtcRptsCrryCd: fndEtcRptsCrryCd
				, reitsNm: reitsNm
				, reitsAmt: reitsAmt
				, reitsEvlAmt: reitsEvlAmt
				, reitsEtcRptsPbffPplcDcd: reitsEtcRptsPbffPplcDcd
				, reitsEtcRptsCrryCd: reitsEtcRptsCrryCd
				, lqdzSctyNm: lqdzSctyNm
				, lqdzSctyKndCd: lqdzSctyKndCd
				, lqdzSctyIsuIsttNm: lqdzSctyIsuIsttNm
				, lqdzSctyCrno: lqdzSctyCrno
				, isuDt: isuDt
				, parAmt: parAmt
				, lqdzSctyIsuIntrt: lqdzSctyIsuIntrt
				, crdtRifcCmpNm: crdtRifcCmpNm
				, crdtRifcCmpCrno: crdtRifcCmpCrno
				, rptsCtrtTpCd: rptsCtrtTpCd
				, sq1EtcRptsCrdtGrdCd: sq1EtcRptsCrdtGrdCd
				, sq2EtcRptsCrdtGrdCd: sq2EtcRptsCrdtGrdCd
				, etcCtrtNm: etcCtrtNm
				, trOthrNm: trOthrNm
				, invPrna: invPrna
				, etcEvlAmt: etcEvlAmt
				, ncrRskVl: ncrRskVl
				, ncrRskAmt: ncrRskAmt
				, jobChrrNm: jobChrrNm
				, dprtCd: dprtCd
				, cplcCtns: cplcCtns
			}
			$("#TB09090S_colCpc3").pqGrid("addRow", { rowData: newRow, checkEditable: false });
		});
		$("#TB09090S_colCpc3").pqGrid("refreshDataAndView");
	}
	
	/*
	 *	PQGrid Options
	 */
	function pqGrid() {
	
		/********************************************************************
		 * PQGrid Column
		 ********************************************************************/
	
		// 그리드 옵션 생성
		let pqGridObjs = [
			{
				height: 500
				, maxHeight: 500
				, id: 'TB09090S_colCpc1'
				, colModel: selectColModel("01")
				, scrollModel: { autoFit: false }
				, editable: true
			},
			{
				height: 500
				, maxHeight: 500
				, id: 'TB09090S_colCpc2'
				, colModel: selectColModel("02")
				, scrollModel: { autoFit: false }
				, editable: true
			},
			{
				height: 500
				, maxHeight: 500
				, id: 'TB09090S_colCpc3'
				, colModel: selectColModel("03")
				, scrollModel: { autoFit: false }
				, editable: true
			}
		];
		setPqGrid(pqGridObjs);
		$("#cpcCol1").pqGrid('instance');
		$("#cpcCol2").pqGrid('instance');
		$("#cpcCol3").pqGrid('instance');
		
	};
	
	/*
	 *	PQGrid Grid reset
	 */
	function resetGrid() {
		if (!mode) {
			$('#TB09090S_chkF1').trigger("click");
			return;
		}
		selectDataId().pqGrid('option', 'dataModel.data', []);
		selectDataId().pqGrid('refreshDataAndView');
	}

	
	/*
	 *	카멜케이스(Caeml-Case) 변환
	 */
	function toCamelCase(str) {
		return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
	}

	return {
		/**
		 * 사용 할 함수 정의
		 */
		getStdDtDate : getStdDtDate
		, getCpcList : getCpcList
		, resetParam : resetParam
		, cpcExcelDownload : cpcExcelDownload
		, pqExportExcel : pqExportExcel
		, insertCpc1Data : insertCpc1Data
		, dcsnCheck : dcsnCheck
		, dcsnCancel : dcsnCancel
		, nnGetCpcDetail : nnGetCpcDetail
		, resetGridData : resetGridData
	}

})();