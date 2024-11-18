let pqGridObjCnfStts;
let pqGridObjCnfRslt;
$(document).ready(function() {
	
	$('#TB01010S_datepicker').val(getToday().substring(0,7));
	

	loadSelectBox();
	setSelectBoxOnChange();
	rendorGrid();
	getDashboardInfo();
	$("#thisWeek").click();
	
});

// 그리드 렌더링함수
function rendorGrid () {
	/** 협의체 부의현황 **/
	pqGridObjCnfStts = {
		height    : 150
	  , maxHeight : 150
	  , id        : 'gridCnfStts'
	  , colModel  : colCnfStts
	};
	/** 협의체 결과현황 **/
	
	pqGridObjCnfStts = {
		height    : 200
	  , maxHeight : 200
	  , id        : 'gridCnfRslt'
	  , colModel  : colCnfRslt
	};
	setPqGrid(pqGridObjCnfStts, pqGridObjCnfRslt);


	pqGridObjCnfStts = $("#gridCnfStts").pqGrid('instance');
	pqGridObjCnfRslt = $("#gridCnfRslt").pqGrid('instance');
}

function loadSelectBox() {
	loadInspctDprtCcd();
}

function setSelectBoxOnChange() {

	$("#TB01010S_inspctDprtCcd").change(function() {
		getDashboardInfo();
	});

	$("#TB01010S_refQuarter").change(function() {
		getDashboardInfo();
	});
}

function loadInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#TB01010S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#TB01010S_inspctDprtCcd').html(html);
		}
	});
}

function getDashboardInfo() {
	var param = {};
	
	var srchDt = $("#TB01010S_datepicker").val();
	var y = srchDt.substring(0,4);
	var m = srchDt.substring(5,7);
	var lastDt = new Date(y, m - 1, 0);
	param.inspctDprtDcd = $('#TB01010S_inspctDprtCcd').val();
	param.mmStartDt = (y + "" + m + "01");
	param.mmEndDt = (y + "" + m + "" + lastDt.getDate());
	
	$.ajax({
			// 협의체 부의현황
			type: "GET",
			url: "/TB01010S/selectCnfStts",
			data: param,
			dataType: "json",
			success: function(data) {
				$('#table1Count').html(data.length);
				
				pqGridObjCnfStts.setData(data);
				//setPqGrid(pqGridObjCnfStts);
				/*var html = "";
				$('#TB01010S_table1').html(html);
				var dataList = data;
				if (dataList.length > 0 ) {
					$.each(dataList, function(key, value) {
						html += "<tr>";
						html += "<td>" + value.ibDealNo	+ "</td>";
						html += "<td>" + value.dprtNm + "</td>";
						if (isEmpty(value.ptcpAmt)){
							html += "<td>" + 0 + "</td>";	
						} else {
							html += "<td>" + commaStr(value.ptcpAmt) + "</td>";		// 만약 ptcpAmt 가 null로 넘어오면 0원으로 처리(commaStr에러)
						}

						html += "<td>" + value.riskInspctRsltnCcdNm + "</td>";
						html += "<td>" + value.riskRcgNo + "</td>";
						if (isEmpty(value.wrtDt)) {
							html += "<td>" + value.wrtDt + "</td>";	
						} else {
							html += "<td>" + formatDate(value.wrtDt) + "</td>"; 		// 만약 wrtDt 가 null로 넘어오면 0원으로 처리(formatDate에러)
						}
						html += "<td>" + value.chrgPNm + "</td>";
						html += "</tr>";
						
						$('#table1Count').html(dataList.length);
					});
				} else {
					html += "<tr >";
					html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
					html += "</tr>";
						$('#table1Count').html("0");
						
					}
					$('#TB01010S_table1').html(html);
				}*/
				

				
			}
				
			});
		// 협의체 결과현황
		
			$.ajax({
				type: "GET",
				url: "/TB01010S/selectCnfRslt",
				data: param,
				dataType: "json",
				success: function(data) {
					pqGridObjCnfRslt.setData(data);
					//if (dataList.length > 0) {
						/*
						$.each(dataList, function(key, value) {
							
							html += "<tr>";
							html += "<td colspan='2' class='text-center'>" + value.cdVlNm + "</td>";
							html += "<td>" + value.agdBfr 	+ "</td>";
							html += "<td>" + value.agdAfr 	+ "</td>";
							html += "<td>" + value.dropBfr 	+ "</td>";
							html += "<td>" + value.dropAfr 	+ "</td>";
							html += "<td>" + value.aprveBfr + "</td>";
							html += "<td>" + value.aprveAfr + "</td>";
							html += "<td>" + value.rjctBfr 	+ "</td>";
							html += "<td>" + value.rjctAfr 	+ "</td>";
							html += "<td>" + value.holdBfr 	+ "</td>";
							html += "<td>" + value.holdAfr 	+ "</td>";
							html += "<td>" + value.fnshBfr 	+ "</td>";
							html += "<td>" + value.fnshAfr 	+ "</td>";
							html += "<td>" + value.waitBfr 	+ "</td>";
							html += "<td>" + value.waitAfr 	+ "</td>";
							html += "</tr>";
						});
					} else {
						html += "<tr>";
						html += '<td colspan="16" style="text-align: center">데이터가 없습니다.</td>';
						html += "</tr>";
						*/
					//}
				}
			});

		// 투자자산 현황 ( 기표전 )
		param.stdYrMm = $("#TB01010S_datepicker").val().replaceAll("-","");
		$.ajax({
			type: "GET",
			url: "/TB01010S/selectSttsInvsAstsBfSgnf",
			data: param,
			dataType: "json",
			success: function(dataList) {
				var html = "";
				$.each(dataList, function(key, value){
					if (dataList.length > 0) {
						html += "<tr>";
						html += "<td style='text-align: center'>" + value.colNm.toLocaleString('ko-KR'); + "</td>";		// 구분
						html += "<td>" + value.qtaPef.toLocaleString('ko-KR'); + "</td>";								// 지분증권(PEF)
						html += "<td>" + value.qtaPreIpo.toLocaleString('ko-KR'); + "</td>";							// 지분증권(Pre-IPO)
						html += "<td>" + value.qtaSpac.toLocaleString('ko-KR'); + "</td>";								// 지분증권(SPAC)
						html += "<td>" + value.qtaStock.toLocaleString('ko-KR'); + "</td>";								// 지분증권(주식)
						html += "<td>" + value.qtaSbtl.toLocaleString('ko-KR'); + "</td>";								// 지분증권(소계)
						html += "<td>" + value.invstSecur.toLocaleString('ko-KR'); + "</td>";							// 집투증권
						html += "<td>" + value.lnBnd.toLocaleString('ko-KR'); + "</td>";								// 대출채권
						html += "<td>" + value.accdtCmnt.toLocaleString('ko-KR'); + "</td>";							// 우발채권(확약보증)
						html += "<td>" + value.accdtByng.toLocaleString('ko-KR'); + "</td>";							// 우발채권(매입약정)
						html += "<td>" + value.accdtHug.toLocaleString('ko-KR'); + "</td>";								// 우발채권(HUG)
						html += "<td>" + value.accdtSbtl.toLocaleString('ko-KR'); + "</td>";							// 우발채권(소계)
						html += "<td>" + value.total.toLocaleString('ko-KR'); + "</td>";								// 합계
						html += "</tr>";
					}
				});
				$("#TB01010S_List3").html(html);
			}
		});

		// 투자자산 현황 ( 기표후 )
		param.stdYrMm = $("#TB01010S_datepicker").val().replaceAll("-","");
		$.ajax({
			type: "GET",
			url: "/TB01010S/selectSttsInvsAstsAfSgnf",
			data: param,
			dataType: "json",
			success: function(dataList) {
				var html = "";
				$.each(dataList, function(key, value){
					if (dataList.length > 0) {
						html += "<tr>";
						html += "<td style='text-align: center'>" + value.colNm.toLocaleString('ko-KR'); + "</td>";		// 구분
						html += "<td>" + value.qtaPef.toLocaleString('ko-KR'); + "</td>";								// 지분증권(PEF)
						html += "<td>" + value.qtaPreIpo.toLocaleString('ko-KR'); + "</td>";							// 지분증권(Pre-IPO)
						html += "<td>" + value.qtaSpac.toLocaleString('ko-KR'); + "</td>";								// 지분증권(SPAC)
						html += "<td>" + value.qtaStock.toLocaleString('ko-KR'); + "</td>";								// 지분증권(주식)
						html += "<td>" + value.qtaSbtl.toLocaleString('ko-KR'); + "</td>";								// 지분증권(소계)
						html += "<td>" + value.invstSecur.toLocaleString('ko-KR'); + "</td>";							// 집투증권
						html += "<td>" + value.lnBnd.toLocaleString('ko-KR'); + "</td>";								// 대출채권
						html += "<td>" + value.accdtCmnt.toLocaleString('ko-KR'); + "</td>";							// 우발채권(확약보증)
						html += "<td>" + value.accdtByng.toLocaleString('ko-KR'); + "</td>";							// 우발채권(매입약정)
						html += "<td>" + value.accdtHug.toLocaleString('ko-KR'); + "</td>";								// 우발채권(HUG)
						html += "<td>" + value.accdtSbtl.toLocaleString('ko-KR'); + "</td>";							// 우발채권(소계)
						html += "<td>" + value.total.toLocaleString('ko-KR'); + "</td>";								// 합계
						html += "</tr>";
					}
				});
				$("#TB01010S_List4").html(html);
			}
		});
		/*
		$.ajax({
			type: "GET",
			url: "/TB01010S/getTable5",
			data: param,
			dataType: "json",
			success: function(dataList) {
				rendorChart(dataList);
			}
		});
		*/
}

/**
 * 협의체 부의현황(금주현황 조회)
 */

function selectWeekData() {
	var checkVal = $("#thisWeek").is(":checked");
	
	if (checkVal) {
		var param = {};
		var thisWeek = selectThisWeek();
		var arrLength = thisWeek.length - 1;

		param.inspctDprtDcd = $("#TB01010S_inspctDprtCcd").val();
		param.weekStrtDt = thisWeek[arrLength - arrLength];
		param.weekEndDt = thisWeek[arrLength];
		param.mmStartDt = thisWeek[arrLength - arrLength];
		param.mmEndDt = thisWeek[arrLength];

		$.ajax({
			type: "GET",
			url: "/TB01010S/selectCnfStts",
			data: param,
			dataType: "json",
			success: function(data) {
				var html = "";
				$('#TB01010S_table1').html(html);

				if (data.length > 0 ) {
					/*
					$.each(data, function(key, value) {
						html += "<tr>";
						html += "<td>" + value.ibDealNo	+ "</td>";
						html += "<td>" + value.dprtNm + "</td>";
						if (isEmpty(value.ptcpAmt)){
							html += "<td>" + 0 + "</td>";	
						} else {
							html += "<td>" + commaStr(value.ptcpAmt) + "</td>";		// 만약 ptcpAmt 가 null로 넘어오면 0원으로 처리(commaStr에러)
						}

						html += "<td>" + value.riskInspctRsltnCcdNm + "</td>";
						html += "<td>" + value.riskRcgNo + "</td>";
						if (isEmpty(value.wrtDt)) {
							html += "<td>" + value.wrtDt + "</td>";	
						} else {
							html += "<td>" + formatDate(value.wrtDt) + "</td>"; 		// 만약 wrtDt 가 null로 넘어오면 0원으로 처리(formatDate에러)
						}
						html += "<td>" + value.chrgPNm + "</td>";
						html += "</tr>";
						*/
						$('#table1Count').html(data.length);

						pqGridObjCnfStts.data = data;
						setPqGrid(pqGridObjCnfStts);
				} else {
					html += "<tr >";
					html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
					html += "</tr>";
	
					$('#table1Count').html("0");
					
				}
	
				$('#TB01010S_table1').html(html);
			}
		});
	} else {
		getDashboardInfo();
	}
	
	
}


$("#TB01010S_datepicker").change(function(){
	
	var srchDt = $("#TB01010S_datepicker").val();
	var checkYn = $("#thisWeek").is(":checked");

	if (isEmpty(srchDt)) return;
	if (checkYn) {
		$("#thisWeek").prop("checked", false);
	}
	getDashboardInfo();
});


let getDashboardInfo2 = function () {
	var paramData = {};

	var inspctDprtCcd = $('#TB01010S_inspctDprtCcd').val();
	var refQuarter = $('#TB01010S_refQuarter').val();
	var datepicker = $('#TB01010S_datepicker').val();

	if (isExist(datepicker)) {
		var regExp = new RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

		if (regExp.test(datepicker)) {
			paramData.stdYrMm = datepicker.replaceAll("-", "");
		} else {
			return false;
		}
	} else {
		paramData.stdYrMm = getToday().replaceAll("-", "");
	}
	var mmStartDt = "";
	var mmEndDt = "";
	var mmStartMonth = "";
	var mmEndMonth = "";
	var mmQ = "";

	var bfStartDt = "";
	var bfEndDt = "";
	var bfStartMonth = "";
	var bfEndMonth = "";
	var bfQ = "";

	// var date = new Date();
	var date = new Date(paramData.stdYrMm.substring(0, 4), (paramData.stdYrMm.substring(5, 6) - 1), paramData.stdYrMm.substring(7, 8));
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	if (refQuarter == '1') {
		// 현재분기
		var date = date;
		getMMBF(date);
	} else if (refQuarter == '2') {
		// 전분기
		var date = addMonth(new Date(year, month, day), -4);
		getMMBF(date);
	} else if (refQuarter == '3') {
		// 전전분기
		var date = addMonth(new Date(year, month, day), -7);
		getMMBF(date);
	}

	function getMMBF(paramDate) {
		var date = paramDate;
		var year = date.getFullYear();
		var month = ("0" + (1 + date.getMonth())).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		
		mmQ = (Math.ceil(month / 3));
		mmStartMonth = (mmQ * 3) - 2;
		mmEndMonth = (mmQ * 3);
		mmQ = year + "." + (Math.ceil(month / 3));

		var endDay = new Date(year, mmEndMonth, 0);

		mmStartDt = String(year) + ("0" + String(mmStartMonth)).slice(-2) + "01";
		mmEndDt = String(year) + ("0" + String(mmEndMonth)).slice(-2) + endDay.getDate();

		date = addMonth(new Date(year, month, day), -4);
		year = date.getFullYear();
		month = ("0" + (1 + date.getMonth())).slice(-2);

		bfQ = (Math.ceil(month / 3));
		bfStartMonth = (bfQ * 3) - 2;
		bfEndMonth = (bfQ * 3);
		bfQ = year + "." + (Math.ceil(month / 3));

		endDay = new Date(year, bfEndMonth, 0);

		bfStartDt = String(year) + ("0" + String(bfStartMonth)).slice(-2) + "01";
		bfEndDt = String(year) + ("0" + String(bfEndMonth)).slice(-2) + endDay.getDate();

	}

	paramData.mmStartDt = mmStartDt;
	paramData.mmEndDt = mmEndDt;
	paramData.pviusQtStrtDt = bfStartDt;
	paramData.pviusQtEndDt = bfEndDt;
	paramData.mmQ = mmQ;
	paramData.bfQ = bfQ;
	
	paramData.inspctDprtCcd = inspctDprtCcd;
	paramData.stdYrMm = paramData.stdYrMm.substring(0,6);
}

/**
 * 차트 렌더링
 */
function rendorChart(stackList) {
		stackChart1(stackList);
	/* 투자유형 그래프 렌더링 */
		invstMntDoughnut1();
		invstMntDoughnut2();
		invstMntDoughnut3();
		invstMntDoughnut4();
		invstMntDoughnut5();
		invstMntDoughnut6();
	/********************************/
	
}

/**
 * 투자규모 및 추이 그래프 렌더링
 * 상단 검색 기준일, 분기와 상관없이 무조건 1년치 데이터
 * @param {json} stackList 
 */
function stackChart1 (stackList) {
	
	var chartId = document.getElementById('stackChart1');
	
	var list_1;
	var list_2;
	var list_3;
	var list_4;
	var list_5;
	var list_6;
	var list_7;
	var list_8;
	var list_9;
	var list_10;
	var list_11;
	var list_12;

	list_1 = stackList[0];
	list_2 = stackList[1];
	list_3 = stackList[2];
	list_4 = stackList[3];
	list_5 = stackList[4];
	list_6 = stackList[5];
	list_7 = stackList[6];
	list_8 = stackList[7];
	list_9 = stackList[8];
	list_10 = stackList[9];
	list_11 = stackList[10];
	list_12 = stackList[11];
	

	var label = [list_1.A, list_2.A
			   , list_3.A, list_4.A
			   , list_5.A, list_6.A
			   , list_7.A, list_8.A
			   , list_9.A, list_10.A
			   , list_11.A, list_12.A].reverse();
	var lnBnd = [list_1.lnBnd, list_2.lnBnd
			   , list_3.lnBnd, list_4.lnBnd
			   , list_5.lnBnd, list_6.lnBnd
			   , list_7.lnBnd, list_8.lnBnd
			   , list_9.lnBnd, list_10.lnBnd
			   , list_11.lnBnd, list_12.lnBnd].reverse();
    var qtaSbtl = [list_1.qtaSbtl, list_2.qtaSbtl
			   , list_3.qtaSbtl, list_4.qtaSbtl
			   , list_5.qtaSbtl, list_6.qtaSbtl
			   , list_7.qtaSbtl, list_8.qtaSbtl
			   , list_9.qtaSbtl, list_10.qtaSbtl
			   , list_11.qtaSbtl, list_12.qtaSbtl].reverse();
	var invstSecur = [list_1.invstSecur, list_2.invstSecur
			   , list_3.invstSecur, list_4.invstSecur
			   , list_5.invstSecur, list_6.invstSecur
			   , list_7.invstSecur, list_8.invstSecur
			   , list_9.invstSecur, list_10.invstSecur
			   , list_11.invstSecur, list_12.invstSecur].reverse();
	var accdtCmnt = [list_1.accdtCmnt, list_2.accdtCmnt
			   , list_3.accdtCmnt, list_4.accdtCmnt
			   , list_5.accdtCmnt, list_6.accdtCmnt
			   , list_7.accdtCmnt, list_8.accdtCmnt
			   , list_9.accdtCmnt, list_10.accdtCmnt
			   , list_11.accdtCmnt, list_12.accdtCmnt].reverse();
	var accdtByng = [list_1.accdtByng, list_2.accdtByng
				, list_3.accdtByng, list_4.accdtByng
				, list_5.accdtByng, list_6.accdtByng
				, list_7.accdtByng, list_8.accdtByng
				, list_9.accdtByng, list_10.accdtByng
				, list_11.accdtByng, list_12.accdtByng].reverse();
	var accdtHug = [list_1.accdtHug, list_2.accdtHug
				, list_3.accdtHug, list_4.accdtHug
				, list_5.accdtHug, list_6.accdtHug
				, list_7.accdtHug, list_8.accdtHug
				, list_9.accdtHug, list_10.accdtHug
				, list_11.accdtHug, list_12.accdtHug].reverse();
	new Chart(chartId, {
	type: 'bar',
	data: {
		  labels : label
		, datasets : [
			{
				  label: '대출채권'
				, data : lnBnd
				, backgroundColor : '#4169e1'
			}, 
			{
				  label: '지분증권'
				, data : qtaSbtl
				, backgroundColor : '#ff7f00'
			}, 
			{
				  label: '집투증권'
				, data : invstSecur
				, backgroundColor : '#000080'
			}, 
			{
				  label: '우발채무(확약보증)'
				, data : accdtCmnt
				, backgroundColor : '#ffd400'
			}, 
			{
				  label: '우발채무(매입약정)'
				, data : accdtByng
				, backgroundColor : '#008000'
			}, 
			{
				  label: '우발채무(HUG)'
				, data : accdtHug
				, backgroundColor : '#ff0000'
			}
		]
	},
	options: {
		indexAxis: 'x',
		responsive : false,
		maxBarThickness: 50
		, scales : {
			x : {
					stacked : true
				, 	display : true
			},
			y : {
				  stacked : true
				, display : false
			}
		}
	  }
	});
}	

/**
 * 투자유형 도넛 그래프 렌더링
 * 분기 기준 조회
 */
function invstMntDoughnut1 () {
	var invstMntId = document.getElementById('invstMntDoughnut1');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['대출채권', '매입약정', '확약보증', '지분증권', '집투증권']
			, datasets : [
				{
					  data : [42, 10, 30, 40, 50]
					, backgroundColor : '#ffd400'
				}
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: 'TOTAL'
				}
			},
		}
	});
}

function invstMntDoughnut2 () {
	var invstMntId = document.getElementById('invstMntDoughnut2');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['대출채권', '매입약정', '확약보증', '지분증권', '집투증권']
			, datasets : [
				{
					  data : [42, 10, 30, 40, 50]
					, backgroundColor : ['#ffd400','#c9c9c9','#c9c9c9','#c9c9c9','#c9c9c9'] 
				}
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: '대출채권'
				}
			},
		}
	});
}

function invstMntDoughnut3 () {
	var invstMntId = document.getElementById('invstMntDoughnut3');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['대출채권', '매입약정', '확약보증', '지분증권', '집투증권']
			, datasets : [
				{
					  data : [42, 10, 30, 40, 50]
					, backgroundColor : ['#c9c9c9','#ffd400','#c9c9c9','#c9c9c9','#c9c9c9'] 
				} 
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: '매입약정'
				}
			},
		}
	});
}

function invstMntDoughnut4 () {
	var invstMntId = document.getElementById('invstMntDoughnut4');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['우발채무', '대출채권', 'HUG', '손흥민', '메시', '이강인']
			, datasets : [
				{
					  data : [42, 10, 30, 40, 50, 25]
					, backgroundColor : ['#c9c9c9','#c9c9c9','#ffd400','#c9c9c9','#c9c9c9','#c9c9c9'] 
				}
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: '확약보증'
				}
			},
		}
	});
}

function invstMntDoughnut5 () {
	var invstMntId = document.getElementById('invstMntDoughnut5');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['우발채무', '대출채권', 'HUG', '손흥민', '메시', '이강인']
			, datasets : [
				{
						data : [42, 10, 30, 40, 50, 25]
					,   backgroundColor : ['#c9c9c9','#c9c9c9','#c9c9c9','#ffd400','#c9c9c9','#c9c9c9'] 
				}
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: '지분증권'
				}
			},
		}
	});
}

function invstMntDoughnut6 () {
	var invstMntId = document.getElementById('invstMntDoughnut6');
	new Chart(invstMntId, {
		type: 'doughnut',
		data: {
			  labels : ['우발채무', '대출채권', 'HUG', '손흥민', '메시', '이강인']
			, datasets : [
				{
						data : [42, 10, 30, 40, 50, 25]
					,   backgroundColor : ['#c9c9c9','#c9c9c9','#c9c9c9','#c9c9c9','#ffd400','#c9c9c9'] 
				}
			]
		},
		options: {
			responsive : false,
			plugins : {
				legend : {
					display : false
				},
				title : {
					display: true,
					position : 'bottom',
					text: '집투증권'
				}
			},
		}
	});
}
/********************************************************************* */


//그리드 최하단 페이지모델
var pageModel = {

	type: "local",
	rPP: 50, strRpp: "{0}",

	//customize localization strings.
	strDisplay: "{0} to {1} of {2}",
	strPage: "Page {0} / {1}",

	layout: ['first', 'prev', 'next', 'last', "|", "strPage"]

}

//그리드 컬럼
let colCnfStts = [
	{ 	
		title    : "안건명", 
		width 	 : 300,
		dataType : "string", 
		dataIndx : "ibDealNm", 
		align    : "left",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "부의부서", 
		dataType : "string",
		dataIndx : "dprtNm", 
		align    : "center", 
		format   : "yyyy-mm-dd",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "부의금액", 
		dataType : "integer", 
		dataIndx : "ptcpAmt",
		align    : "right", 
		halign   : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		format   : '#,###'
		// render: function (ui) {
		// 	var value = parseFloat(ui.cellData);

		// 	var formattedValue = value.toLocaleString('ko-KR', {
		// 		minimumFractionDigits: 0,  
		// 		maximumFractionDigits: 2   
		// 	});
	
		// 	return formattedValue;
        // } 
	},
	{ 	
		title    : "협의체", 
		width 	 : 200 ,
		dataType : "string", 
		dataIndx : "riskInspctRsltnCcdNm",
		align    : "center",  
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "승인번호", 
		dataType : "string", 
		dataIndx : "riskRcgNo", 
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 
		title    : "부의일정", 
		dataType : "date", 
		dataIndx : "wrtDt", 
		align    : "center",
		filter   : { crules : [{ condition : 'range' }] } ,
		render   : function (ui) {
			let cellData = ui.cellData;
			if (cellData && cellData.length === 8) {
				let year = cellData.substring(0, 4);
				let month = cellData.substring(4, 6);
				let day = cellData.substring(6, 8);
				return `${year}-${month}-${day}`.trim();
			}
			return cellData; 
        } 
	},
	{ 	
		title    : "담당자", 
		dataType : "string", 
		dataIndx : "chrgPNm",
		align    : "center",
		filter   : { crules : [{ condition : 'range' }] } 
	},
];
let colCnfRslt = [
	{ 	
		title    : "안건명", 
		width 	 : 300,
		dataType : "string", 
		dataIndx : "ibDealNm", 
		align    : "left",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "부의부서", 
		dataType : "string",
		dataIndx : "dprtNm", 
		align    : "center", 
		format   : "yyyy-mm-dd",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "부의금액", 
		dataType : "integer", 
		dataIndx : "ptcpAmt",
		align    : "right", 
		halign   : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		format   : '#,###'
		// render: function (ui) {
		// 	var value = parseFloat(ui.cellData);

		// 	var formattedValue = value.toLocaleString('ko-KR', {
		// 		minimumFractionDigits: 0,  
		// 		maximumFractionDigits: 2   
		// 	});
	
		// 	return formattedValue;
        // } 
	},
	{ 	
		title    : "협의체", 
		width 	 : 200 ,
		dataType : "string", 
		dataIndx : "riskInspctRsltnCcdNm",
		align    : "center",  
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "승인번호", 
		dataType : "string", 
		dataIndx : "riskRcgNo", 
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 
		title    : "부의일정", 
		dataType : "date", 
		dataIndx : "wrtDt", 
		align    : "center",
		filter   : { crules : [{ condition : 'range' }] } ,
		render   : function (ui) {
			let cellData = ui.cellData;
			if (cellData && cellData.length === 8) {
				let year = cellData.substring(0, 4);
				let month = cellData.substring(4, 6);
				let day = cellData.substring(6, 8);
				return `${year}-${month}-${day}`.trim();
			}
			return cellData; 
        } 
	},
	{ 	
		title    : "담당자", 
		dataType : "string", 
		dataIndx : "chrgPNm",
		align    : "center",
		filter   : { crules : [{ condition : 'range' }] } 
	},
];
