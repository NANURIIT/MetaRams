var arrPqGridPrdtCdList = [];
let TB06011P_pf;
let TB06011P_gridState = 1;
let srchCnt = 0;

/*
 *	팝업 자동 호출, 검색
 */
function TB06011P_srchPrdt() {
	$("input[id*='_prdtCd']").on('keydown', async function (evt) {
		// Enter에만 작동하는 이벤트
		if (evt.keyCode === 13) {
			evt.preventDefault();

			// 사용한 인풋박스의 출처 페이지 가져오기
			let prefix;
			if ($(this).attr('id') === $("#TB06011P_prdtCd").attr('id')) {
				prefix = TB06011P_pf;
			} else {
				prefix = $(this).attr('id').slice(0, 8);
			}

			$(`input[id='${prefix}_prdtNm']`).val("");

			$('#TB06011P_prefix').val(prefix);

			/**
			 * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
			 * 그리드 상태 다시 체크해주기
			 */
			if ($(`div[id='modal-TB06011P'][style*="display: none;"]`).length === 1) {
				TB06011P_gridState = 1;
			}
			// else {

			// }


			// 인풋박스 밸류
			let data = $(this).val();
			$('#TB06011P_prdtCd').val(data);
			await getGridState();

			// 팝업 오픈

			/**
			 * 팝업 열려있음
			 */
			if (TB06011P_gridState === 0) {
				console.log("열려있음", TB06011P_gridState);
				callGridTB06011P(prefix);
				$('#TB06011P_prdtCd').val(data);
				setTimeout(() => getPrdtCdList(), 400);
			} else
			/**
			 * 팝업 닫혀있음
			 */
			if (TB06011P_gridState === 1) {
				console.log("닫혀있음", TB06011P_gridState);
				callTB06011P(prefix);
				$('#TB06011P_prdtCd').val(data);
				setTimeout(() => getPrdtCdList(), 400);
			}
		}
	});

	$("input[id*='_prdtCd']").on('change', async function (evt) {

		// 사용한 인풋박스의 출처 페이지 가져오기
		let prefix;
		if ($(this).attr('id') === $("#TB06011P_prdtCd").attr('id')) {
			prefix = TB06011P_pf;
		} else {
			prefix = $(this).attr('id').slice(0, 8);
		}

		$(`input[id='${prefix}_prdtNm']`).val("");

		$('#TB06011P_prefix').val(prefix);

		/**
		 * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
		 * 그리드 상태 다시 체크해주기
		 */
		if ($(`div[id='modal-TB06011P'][style*="display: none;"]`).length === 1) {
			TB06011P_gridState = 1;
		}
		// else {

		// }


		// 인풋박스 밸류
		let data = $(this).val();
		$('#TB06011P_prdtCd').val(data);
		await getGridState();

		// 팝업 오픈

		/**
		 * 팝업 열려있음
		 */
		if (TB06011P_gridState === 0) {
			console.log("열려있음", TB06011P_gridState);
			callGridTB06011P(prefix);
			$('#TB06011P_prdtCd').val(data);
			setTimeout(() => getPrdtCdList(), 400);
		} else
		/**
		 * 팝업 닫혀있음
		 */
		if (TB06011P_gridState === 1) {
			console.log("닫혀있음", TB06011P_gridState);
			callTB06011P(prefix);
			$('#TB06011P_prdtCd').val(data);
			setTimeout(() => getPrdtCdList(), 400);
		}
	});
}

//그리드 컬럼 세팅
var colPrdtCdList = [

	{
		title: "종목코드",
		dataType: "string",
		dataIndx: "prdtCd",
		align: "center",
		filter: { crules: [{ condition: 'range' }] }
	},
	{
		title: "종목명",
		dataType: "string",
		dataIndx: "prdtNm",
		align: "left",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "딜번호",
		dataType: "string",
		dataIndx: "dealNo",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "부수안건구분코드",
		dataType: "string",
		dataIndx: "nmcpMtrDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "리스크심사구분코드",
		dataType: "string",
		dataIndx: "lstCCaseDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "통화코드",
		dataType: "string",
		dataIndx: "trCrryCd",
		align: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "기준환율",
		dataType: "string",
		dataIndx: "stdrExrt",
		align: "right",
		hidden: true,
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "전체발행좌수",
		dataType: "string",
		dataIndx: "wholIssuShqt",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "보유좌수",
		dataType: "string",
		dataIndx: "hldgShqt",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "보유목적",
		dataType: "string",
		dataIndx: "holdPrpsDcd",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "기업여신약정금액",
		dataType: "string",
		dataIndx: "eprzCrdlCtrcAmt",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "원화환산실행금액",
		dataType: "string",
		dataIndx: "krwTrslExcAmt",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "원화환산실행잔액",
		dataType: "string",
		dataIndx: "krwTrslExcBlce",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "평균단가",
		dataType: "string",
		dataIndx: "avrUnpr",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "평가손익금액",
		dataType: "string",
		dataIndx: "evlPflsAmt",
		align: "right",
		halign: "center",
		hidden: true,
	},
	{
		title: "매매손익금액",
		dataType: "string",
		dataIndx: "tradPflsAmt",
		align: "right",
		halign: "center",
		hidden: true,
		title: "안건명",
		width: 150,
		dataType: "string",
		dataIndx: "mtrNm",
		halign: "center",
		align: "left",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "안건구분",
		dataType: "string",
		dataIndx: "nmcpMtrNm",
		halign: "center",
		align: "left",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "심사구분",
		dataType: "string",
		dataIndx: "lstCCaseNm",
		halign: "center",
		align: "left",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	// 추가 컬럼
	{
		title: "진행상태",
		dataType: "string",
		dataIndx: "prgSttsCd",
		halign: "center",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "진행상태",
		dataType: "string",
		dataIndx: "prgSttsNm",
		halign: "center",
		align: "left",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "거래상대방명",
		dataType: "string",
		dataIndx: "entpNm",
		halign: "center",
		align: "left",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담당부서",
		dataType: "string",
		dataIndx: "dprtNm",
		halign: "center",
		align: "left",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담당자",
		dataType: "string",
		dataIndx: "empNm2",
		halign: "center",
		align: "left",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "승인금액",
		dataType: "string",
		dataIndx: "eprzCrdlApvlAmt",
		halign: "center",
		align: "right",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			let cellData = ui.cellData;
			if (cellData !== null && cellData !== undefined) {
				return addComma(cellData);
			}
			return cellData;
		}
	},
	{
		title: "투자금액",
		dataType: "string",
		dataIndx: "dealExcAmt",
		halign: "center",
		align: "right",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			let cellData = ui.cellData;
			if (cellData !== null && cellData !== undefined) {
				return addComma(cellData);
			}
			return cellData;
		}
	},
	{
		title: "투자잔액",
		dataType: "string",
		dataIndx: "dealExcBlce",
		halign: "center",
		align: "right",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			let cellData = ui.cellData;
			if (cellData !== null && cellData !== undefined) {
				return addComma(cellData);
			}
			return cellData;
		}
	},
	{
		title: "딜명",
		dataType: "string",
		dataIndx: "dealNm",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
];

//그리드 호출
function roadPrdtCdListGrid() {
	arrPqGridPrdtCdList = $("#TB06011P_prdtCdList").pqGrid('instance');

	if (typeof arrPqGridPrdtCdList == "undefined") {

		var obj = {

			height: 235,
			maxHeight: 235,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" },
			editable: false,
			scrollModel: { autoFit: true },
			colModel: colPrdtCdList,
			strNoRows: '데이터가 없습니다.'
		};

		$("#TB06011P_prdtCdList").pqGrid(obj);
		arrPqGridPrdtCdList = $("#TB06011P_prdtCdList").pqGrid('instance');

	}
	else {
		arrPqGridPrdtCdList.setData([]);
	}

}


//그리드에 데이터 넣기 (CRUD)
function dataPrdtCdSetGrid(data) {

	arrPqGridPrdtCdList.setData(data);

	arrPqGridPrdtCdList.option("strNoRows", '조회된 데이터가 없습니다.');

	arrPqGridPrdtCdList.on("cellDblClick", function (event, ui) {
		var rowData = ui.rowData;
		setPrdtInfo(rowData);
	});

	// 검색된 행이 1개일 경우 데이터 바로 입력
	if (arrPqGridPrdtCdList.pdata.length === 1) {
		setPrdtInfo(arrPqGridPrdtCdList.pdata[0]);
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	else if (arrPqGridPrdtCdList.pdata.length === 0) {
		// 데이터 없는 경우 재조회 방지
		srchCnt += 1;
		$('#TB06011P_prdtCd').val("");
		getPrdtCdList();
	}
	// 그렇지 않은 경우 조건에 맞는 데이터 출력
	else {
	}

}

// 초기설정
$(document).ready(function () {
	// TB06011P_srchPrdt();
	docRdySettings();
});

/**
	문서로드시 세팅
 */
function docRdySettings() {
	modalShowFunction();
	keyDownEnter_TB06011P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction() {
	$('#modal-TB06011P').on('shown.bs.modal', function () {
		$('#modal-TB06011P input[id=TB06011P_prdtCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06011P() {
	$("input[id=TB06011P_prdtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)

		}
	});

	$("input[id=TB06011P_prdtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)

		}
	});
}

function callGridTB06011P(prefix) {
	clearTB06011P();
	$('#TB06011P_prefix').val(prefix);
	setTimeout(() => roadPrdtCdListGrid(), 300);
}

/**
 * show modal
 */
function callTB06011P(prefix) {
	// $(`#${prefix}_prdtCd`).focus();
	// console.log("저는 팝업을 열겁니다");
	TB06011P_gridState = 0;
	TB06011P_pf = prefix;
	clearTB06011P();
	$('#TB06011P_prefix').val(prefix);
	$('#modal-TB06011P').modal('show');
	setTimeout(() => roadPrdtCdListGrid(), 300);
	indexChangeHandler("TB06011P");
}

/**
 * hide modal
 */
function modalClose_TB06011P() {
	TB06011P_gridState = 1;
	if (typeof fnltPgGrid != "undefined") arrPqGridPrdtCdList.setData([]);
	$('#modal-TB06011P').modal('hide');
};

/**
 * clear modal
 */
function clearTB06011P() {
	$('#TB06011P_prdtCd').val("");
	$('#TB06011P_prdtNm').val("");
}

async function getPrdtCdList() {

	var trDvsn = '';

	if ($('#TB06011P_prefix').val() == "TB07020S" || $('#TB06011P_prefix').val() == "TB07020S_input" || $('#TB06011P_prefix').val() == "TB07040S" || $('#TB06011P_prefix').val() == "TB07040S_input") {
		trDvsn = 'T'
	}

	if ($('#TB06011P_prefix').val() == "TB07010S" || $('#TB06011P_prefix').val() == "TB07030S" || $('#TB06011P_prefix').val() == "TB07050S") {
		trDvsn = 'L'
	}

	if ($('#TB06011P_prefix').val() == "TB06010S") {
		trDvsn = 'S'
	}

	if ($('#TB06011P_prefix').val() == "TB06020S") {
		trDvsn = 'D'
	}

	if ($('#TB06011P_prefix').val() == "TB06030S") {
		trDvsn = 'F'
	}

	if ($('#TB06011P_prefix').val() == "TB07150S") {
		trDvsn = 'TB07150S'
	}

	var param = {
		"prdtCd": $('#TB06011P_prdtCd').val()
		, "prdtNm": $('#TB06011P_prdtNm').val()
		, "trDvsn": trDvsn
	}

	await $.ajax({
		type: "Post",
		url: "/TB06011P/getPrdtCdList",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(param),
		dataType: "json",
		success: function (data) {

			if(srchCnt >= 2){
				alert("조회된 정보가 없습니다!")
				return;
			}

			console.log("진짜 쿼리", data);
			dataPrdtCdSetGrid(data);
		}
	});
}

async function getGridState() {

	var trDvsn = '';

	if ($('#TB06011P_prefix').val() == "TB07020S" || $('#TB06011P_prefix').val() == "TB07020S_input" || $('#TB06011P_prefix').val() == "TB07040S" || $('#TB06011P_prefix').val() == "TB07040S_input") {
		trDvsn = 'T'
	}

	if ($('#TB06011P_prefix').val() == "TB07010S" || $('#TB06011P_prefix').val() == "TB07030S" || $('#TB06011P_prefix').val() == "TB07050S") {
		trDvsn = 'L'
	}

	if ($('#TB06011P_prefix').val() == "TB06010S") {
		trDvsn = 'S'
	}

	if ($('#TB06011P_prefix').val() == "TB06020S") {
		trDvsn = 'D'
	}

	if ($('#TB06011P_prefix').val() == "TB06030S") {
		trDvsn = 'F'
	}

	if ($('#TB06011P_prefix').val() == "TB07150S") {
		trDvsn = 'TB07150S'
	}

	var param = {
		"prdtCd": $('#TB06011P_prdtCd').val()
		, "prdtNm": $('#TB06011P_prdtNm').val()
		, "trDvsn": trDvsn
	}

	if (TB06011P_gridState === 0) {
		// console.log("열려있으니까 좀 쉬어라");
		return;
	}

	await $.ajax({
		type: "Post",
		url: "/TB06011P/getPrdtCdList",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(param),
		dataType: "json",
		success: function (data) {
			console.log("숨는 쿼리", data);
			if (!data || data === undefined || data.length === 0) {
				// console.log("1번조건");
				TB06011P_gridState = 1;
			} else if (data.length >= 2) {
				// console.log("2번조건");
				TB06011P_gridState = 1;
			} else if (data) {
				// console.log("3번조건");
				TB06011P_gridState = 0;
			}
		}
	});
}

/**
 * dblclick event function
 */
function setPrdtInfo(e) {

	var tr = $(e);
	var td = $(tr).children();

	// 종목정보
	var prdtCd = td.eq(0).text();
	var prdtNm = td.eq(1).text();
	var ibDealNo = td.eq(2).text();
	var nmcpMtrDcd = td.eq(3).text();
	var lstCCaseDcd = td.eq(4).text();
	var trCrryCd = td.eq(5).text();
	var stdrExrt = td.eq(6).text();
	var wholIssuShqt = td.eq(7).text();
	var hldgShqt = td.eq(8).text();
	var holdPrpsDcd = td.eq(9).text();
	var eprzCrdlCtrcAmt = td.eq(10).text();
	var krwTrslExcAmt = td.eq(11).text();
	var krwTrslExcBlce = td.eq(12).text();
	var avrUnpr = td.eq(13).text();
	var evlPflsAmt = td.eq(14).text();
	var tradPflsAmt = td.eq(15).text();

	var krwTrslExcBlce = td.eq(11).text();
	var mtrNm = td.eq(12).text();
	var nmcpMtrNm = td.eq(13).text();
	var lstCCaseNm = td.eq(14).text();

	var prgSttsCd = td.eq(18).text();
	var prgSttsNm = td.eq(19).text();
	var trOthrDscmNm = td.eq(20).text();
	var chrrDprtCd = td.eq(21).text();
	var chrrEmpno = td.eq(22).text();
	var eprzCrdlApvlAmt = td.eq(23).text();
	var invAmt = td.eq(24).text();
	var dealExcBlce = td.eq(25).text();
	var dealNm = td.eq(26).text();

	var prefix = $("#TB06011P_prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.

	// 페이지 항목
	var pagePrdtCd = '#' + $('#TB06011P_prefix').val() + '_prdtCd';
	var pagePrdtNm = '#' + $('#TB06011P_prefix').val() + '_prdtNm';
	var pageIbDealNo = '#' + $('#TB06011P_prefix').val() + '_ibDealNo';
	var pageNmcpMtrDcd = '#' + $('#TB06011P_prefix').val() + '_nmcpMtrDcd';
	var pageLstCCaseDcd = '#' + $('#TB06011P_prefix').val() + '_lstCCaseDcd';
	var pageStdrExrt = '#' + $('#TB06011P_prefix').val() + '_stdrExrt';
	var pageTrdeExrt = '#' + $('#TB06011P_prefix').val() + '_trdeExrt';
	var pageTrCrryCd = '#' + $('#TB06011P_prefix').val() + '_trCrryCd';
	var pageWholIssuShqt = '#' + $('#TB06011P_prefix').val() + '_wholIssuShqt';
	var pageHldgShqt = '#' + $('#TB06011P_prefix').val() + '_hldgShqt';
	var pageHoldPrpsDcd = '#' + $('#TB06011P_prefix').val() + '_holdPrpsDcd';
	var pageTrQnt = '#' + $('#TB06011P_prefix').val() + '_trQnt';
	var pageTrUnpr = '#' + $('#TB06011P_prefix').val() + '_trUnpr';
	var pageQotaRt = '#' + $('#TB06011P_prefix').val() + '_qotaRt';
	var pageEprzCrdlCtrcAmt = '#' + $('#TB06011P_prefix').val() + '_eprzCrdlCtrcAmt';
	var pageKrwTrslExcBlce = '#' + $('#TB06011P_prefix').val() + '_krwTrslExcBlce';
	var pageTrslAmt = '#' + $('#TB06011P_prefix').val() + '_trslAmt';
	var pageKrwTrslExcAmt = '#' + $('#TB06011P_prefix').val() + '_krwTrslExcAmt';
	var pageAvrUnpr = '#' + $('#TB06011P_prefix').val() + '_avrUnpr';
	var pageEvlPflsAmt = '#' + $('#TB06011P_prefix').val() + '_evlPflsAmt';
	var pageTradPflsAmt = '#' + $('#TB06011P_prefix').val() + '_tradPflsAmt';
	var pageMtrNm = '#' + $('#TB06011P_prefix').val() + '_mtrNm';
	var pageNmcpMtrNm = '#' + $('#TB06011P_prefix').val() + '_nmcpMtrNm';
	var pageLstCCaseNm = '#' + $('#TB06011P_prefix').val() + '_lstCCaseNm';
	var pagePrgSttsCd = '#' + $('#TB06011P_prefix').val() + '_prgSttsCd';
	var pagePrgSttsNm = '#' + $('#TB06011P_prefix').val() + '_prgSttsNm';
	var pageTrOthrDscmNm = '#' + $('#TB06011P_prefix').val() + '_trOthrDscmNm';
	var pageChrrDprtCd = '#' + $('#TB06011P_prefix').val() + '_chrrDprtCd';
	var pageChrrEmpno = '#' + $('#TB06011P_prefix').val() + '_chrrEmpno';
	var pageeprzCrdlApvlAmt = '#' + $('#TB06011P_prefix').val() + '_eprzCrdlApvlAmt';
	var pageInvAmt = '#' + $('#TB06011P_prefix').val() + '_invAmt';
	var pagedealExcBlce = '#' + $('#TB06011P_prefix').val() + '_dealExcBlce';
	var pageDealNm = '#' + $('#TB06011P_prefix').val() + '_ibDealNm';



	if (prefix == 'TB07020S_input' || prefix == 'TB07040S_input') {
		pageTrCrryCd = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_I027';
		pageStdrExrt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_stdrExrt';
		pageWholIssuShqt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_wholIssuShqt';
		pageHldgShqt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_hldgShqt';
		pageTrdeExrt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_trdeExrt';
		pageHoldPrpsDcd = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_H002';
		pageTrQnt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_trQnt';
		pageTrUnpr = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_trUnpr';
		pageQotaRt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_qotaRt';
		pageEprzCrdlCtrcAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_eprzCrdlCtrcAmt';
		pageKrwTrslExcBlce = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_krwTrslExcBlce';
		pageTrslAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_trslAmt';
		pageKrwTrslExcAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_krwTrslExcAmt';
		pageAvrUnpr = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_avrUnpr';
		pageEvlPflsAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_evlPflsAmt';
		pageTradPflsAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_tradPflsAmt';
	}
	else {
		var pageTrCrryCd = '#' + $('#TB06011P_prefix').val() + '_trCrryCd';
		var pageStdrExrt = '#' + $('#TB06011P_prefix').val() + '_stdrExrt';
	}

	// 값 전달
	$(pagePrdtCd).val(e.prdtCd);
	$(pagePrdtNm).val(e.prdtNm);
	$(pageIbDealNo).val(e.ibDealNo);
	$(pageNmcpMtrDcd).val(e.nmcpMtrDcd);
	$(pageLstCCaseDcd).val(e.lstCCaseDcd);
	$(pageTrCrryCd).val(e.trCrryCd);
	$(pageStdrExrt).val(e.stdrExrt);
	$(pageWholIssuShqt).val(isEmpty(e.wholIssuShqt) ? '0' : addComma(e.wholIssuShqt));
	$(pageHldgShqt).val(isEmpty(e.hldgShqt) ? '0' : addComma(e.hldgShqt));
	$(pageTrdeExrt).val(isEmpty(e.stdrExrt) ? '0.00' : e.stdrExrt);
	$(pageHoldPrpsDcd).val(e.holdPrpsDcd);
	$(pageTrQnt).val(0);
	$(pageTrUnpr).val(0);

	var qotaRt = isEmpty(e.hldgShqt) ? '0' : ((e.hldgShqt / e.wholIssuShqt) * 100).toFixed(8);
	//alert(qotaRt);
	if (!isFinite(qotaRt)) {
		$(pageQotaRt).val("0");
	} else {
		$(pageQotaRt).val(qotaRt);
	}


	$(pageEprzCrdlCtrcAmt).val(isEmpty(e.eprzCrdlCtrcAmt) ? '0' : addComma(e.eprzCrdlCtrcAmt));
	$(pageKrwTrslExcBlce).val(isEmpty(e.krwTrslExcBlce) ? '0' : addComma(e.krwTrslExcBlce));
	$(pageTrslAmt).val(0);
	$(pageKrwTrslExcAmt).val(isEmpty(e.krwTrslExcAmt) ? '0' : addComma(e.krwTrslExcAmt));
	$(pageAvrUnpr).val(isEmpty(e.avrUnpr) ? '0' : addComma(e.avrUnpr));
	$(pageEvlPflsAmt).val(isEmpty(e.evlPflsAmt) ? '0' : addComma(e.evlPflsAmt));
	$(pageTradPflsAmt).val(isEmpty(e.tradPflsAmt) ? '0' : addComma(e.tradPflsAmt));
	$(pageMtrNm).val(e.mtrNm);
	$(pageNmcpMtrNm).val(e.nmcpMtrNm);
	$(pageLstCCaseNm).val(e.lstCCaseNm);
	$(pagePrgSttsCd).val(e.prgSttsCd);
	$(pagePrgSttsNm).val(e.prgSttsNm);
	$(pageTrOthrDscmNm).val(e.trOthrDscmNm);
	$(pageChrrDprtCd).val(e.chrrDprtCd);
	$(pageChrrEmpno).val(e.chrrEmpno);
	$(pageeprzCrdlApvlAmt).val(e.eprzCrdlApvlAmt);
	$(pageInvAmt).val(e.invAmt);
	$(pagedealExcBlce).val(e.dealExcBlce);
	if (prefix != "TB09080S") {
		$(pageDealNm).val(e.dealNm);
	}
	if (prefix == "TB06060S") {
		$(pageDealNm).val('');
	}

	if (prefix == 'TB06014P') {
		$('#TB06014P_prdtCd').val(td.eq(0).text());
		$('#TB06014P_prdtCd').focus();
		getBssAsstList();
	}

	if (prefix == 'TB06010S' || prefix == 'TB06020S' || prefix == 'TB06030S') {
		$('#' + prefix + '_ibDealNo').val(ibDealNo);
		$('#' + prefix + '_ibDealNo').focus();
		$('#' + prefix + '_lstCCaseCcd').val(e.nmcpMtrDcd);
		$('#' + prefix + '_riskInspctCcd').val(e.lstCCaseDcd);
		if (prefix == 'TB06010S') {
			TB06010Sjs.getDealList();

		} else if (prefix == 'TB06020S') {
			TB06020Sjs.getDealList();

		} else if (prefix == 'TB06030S') {
			TB06030Sjs.getDealList();
		}
	}

	if (prefix == 'TB09080S') {
		console.log(tr);
		/* 
		$('#TB09080S_ibDealNo').val(e.dealNo);
		$('#TB09080S_ibDealNm').val(e.dealNm); */
		//getDealList();
	}

	if (prefix == 'TB06015P') {
		excSnSet(e.prdtCd);
	}

	/* 0723 add */
	if (prefix === 'TB07050S') {
		TB07050Sjs.srchExcSn(e.prdtCd);
		TB07050Sjs.srch();
	}

	if (prefix === 'TB07150S') {
		TB07150Sjs.srchExcSn_TB07150S(e.prdtCd);
	}

	/* 0724 add */
	if (prefix === 'TB06040S') {
		$('#TB06040S_prgSttsCd').val(e.prgSttsNm);
		TB06040Sjs.srch()
	}

	if (prefix === 'TB04050S') {
		$('#TB04050S_ibDealNo').val(e.dealNo);
		$('#TB04050S_ibDealNm').val(e.dealNm);
		$('#TB04050S_prdtCd').val(e.prdtCd);
		$('#TB04050S_prdtNm').val(e.prdtNm);
	}

	//추가
	if (prefix === 'TB04060S') {
		$('#TB04060S_ibDealNo').val(e.dealNo);
		$('#TB04060S_ibDealNm').val(e.dealNm);
		$('#TB04060S_prdtCd').val(e.prdtCd);
		$('#TB04060S_prdtNm').val(e.prdtNm);
	}

	/* 0726 add 대출계약 실행 */
	if (prefix === 'TB07010S') {
		let numPrgSttsCd = Number(e.prgSttsCd);

		// console.log(typeof e.prgSttsCd);
		if (numPrgSttsCd < 501) {
			Swal.fire({
				icon: 'warning'
				, text: "진행상태를 확인해주세요."
				, confirmButtonText: "확인"
			});
			$('#TB07010S_prdtCd').val('');
			$('#TB07010S_prdtNm').val('');
			// resetAll('TB07010S');
			TB07010Sjs.reset();
			TB07010Sjs.feeRciv.setData([]);
		} else {
			TB07010Sjs.srch();
		}
	}

	if (prefix === 'TB07020S') {
		$('#TB07020S_input_prdtCd').val(e.prdtCd);
		$('#TB07020S_input_prdtNm').val(e.prdtNm);
	}

	if (prefix === 'TB07030S') {
		TB07030Sjs.srch()
	}

	if (prefix === 'TB07040S') {
		$('#TB07040S_input_prdtCd').val(e.prdtCd);
		$('#TB07040S_input_prdtNm').val(e.prdtNm);
	}

	if (prefix === 'TB07060S') {
		$('#TB07060S_krwTrslExcAmt').val('');
		$('#TB07060S_apvlAmt').val('');
		TB07060Sjs.srchExcSn(e.prdtCd);
	}

	if (prefix === 'TB07070S') {
		// TB07070Sjs.srch()
	}

	if (prefix === 'TB07080S') {
		TB07080Sjs.getExcSn(e.prdtCd);
	}

	if (prefix === 'TB08040S') {
		TB08040Sjs.srch()
	}

	if (prefix === 'TB08050S') {
		TB08050Sjs.srch()
	}

	modalClose_TB06011P();
}