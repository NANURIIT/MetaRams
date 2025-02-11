var TB06011P_arrPqGridPrdtCdList = [];
let TB06011P_pf;
let TB06011P_gridState = 1;
let TB06011P_srchCnt = 0;
let TB06011P_onchangehandler = "on";	// on off
let prdtSn;

/**
 * 팝업 자동 호출, 검색
 * @author {김건우}
 */
function TB06011P_srchPrdt(menuId) {

	/**
	 * 완성된 함수는 common.js에 한번 더 세팅해주셔야해요
	 */

	/**
	 * 코드길이체크 후 자동조회
	 */
	$(`div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB06011P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_prdtCd']").on('input', async function () {
		const str = $(this).val().length

		// 같이 붙어있는 인풋박스 id
		const result = $(this).attr('id').slice(0, $(this).attr('id').length - 2) + 'Nm';

		// 데이터를 지울때 값이 없으면 지워줌
		// 값이 있으면 온체인지 또는 온인풋 이벤트로 값 채워짐
		$(`#${result}`).val("")

		/**
		 ********* 각 컬럼의 길이로 세팅을 하셔야해용 *********
		 */
		// ex) 종목코드 VARCHAR(10)
		if (str === 10) {

			await srchEvent(this);

			// $(this).focus();

		}
	})

	$(`div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB06011P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_prdtCd']").on('keydown', async function (evt) {
		// Enter에만 작동하는 이벤트
		if (evt.keyCode === 13) {
			evt.preventDefault();

			await srchEvent(this);

			// $(this).focus();

		}
	})

	async function srchEvent(selector) {
		// 사용한 인풋박스의 출처 페이지 가져오기
		let prefix;
		if ($(selector).attr('id') === $("#TB06011P_prdtCd").attr('id')) {
			prefix = TB06011P_pf;
		} else {
			// 컬럼명 길이로 바꾸셔야 합니당  이유는 callTB06011P('TB04010S_srch') 이런식으로 되어있는게 있어서
			prefix = $(selector).attr('id').slice(0, $(selector).attr('id').length - 7);
		}

		$(`input[id='${prefix}_prdtNm']`).val("");

		$('#TB06011P_prefix').val(prefix);

		// 인풋박스 밸류
		let data = $(selector).val();
		$('#TB06011P_prdtCd').val(data);

		selectBoxSet_TB06011P();
		loginUserSet_TB06011P();
		await getPrdtCdList()

	}
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
		title: "Deal번호",
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
		title: "운용펀드코드",
		dataType: "string",
		dataIndx: "ortnFndCd",
		align: "center",
		// hidden: true,
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
		align: "center",
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
		align: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담당자",
		dataType: "string",
		dataIndx: "empNm2",
		halign: "center",
		align: "center",
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
	{
		title: "부수안건구분코드",
		dataType: "string",
		dataIndx: "mtrDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "리스크심사구분코드",
		dataType: "string",
		dataIndx: "jdgmDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "총발행좌수",
		dataType: "string",
		dataIndx: "totIssuShqt",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "총발행주수",
		dataType: "string",
		dataIndx: "totIssuStkQnt",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "부수안건구분코드",
		dataType: "string",
		dataIndx: "mtrDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "리스크심사구분코드",
		dataType: "string",
		dataIndx: "jdgmDcd",
		align: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	},

];

//그리드 호출
function roadPrdtCdListGrid() {
	TB06011P_arrPqGridPrdtCdList = $("#TB06011P_prdtCdList").pqGrid('instance');

	if (typeof TB06011P_arrPqGridPrdtCdList == "undefined") {

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
			strNoRows: '데이터가 없습니다.',
			rowDblClick: function (event, ui) {
				TB06011P_setPrdtInfo(ui.rowData);
			}
		};

		$("#TB06011P_prdtCdList").pqGrid(obj);
		TB06011P_arrPqGridPrdtCdList = $("#TB06011P_prdtCdList").pqGrid('instance');

	}
	else {
		TB06011P_arrPqGridPrdtCdList.setData([]);
	}

}

// 초기설정
$(document).ready(function () {
	TB06011P_docRdySettings();
});

/**
	문서로드시 세팅
 */
function TB06011P_docRdySettings() {
	TB06011P_modalShowFunction();
	keyDownEnter_TB06011P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function TB06011P_modalShowFunction() {
	$('#modal-TB06011P').on('shown.bs.modal', function () {
		$('#modal-TB06011P input[id=TB06011P_prdtCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06011P() {
	$("input[id='TB06011P_prdtCd']").keydown(function (event) {
		if (event.keyCode === 13) {//키가 13이면 실행 (엔터는 13)
			getPrdtCdList();
		}
	});

	$("input[id='TB06011P_prdtNm']").keydown(function (event) {
		if (event.keyCode === 13) {//키가 13이면 실행 (엔터는 13)
			getPrdtCdList();
		}
	});
}

/**
 * 담당자번호 
 */

$("#TB06011P_empNo").on('change', function () {
	let tmpEmpNo = "";
	tmpEmpNo = $("#TB06011P_empNo").val();
	if (tmpEmpNo.length != 7) {
		$("#TB06011P_empNm").val("");
	}
});

/**
 * show modal
 */
function callTB06011P(prefix, e) {
	TB06011P_gridState = 0;
	TB06011P_pf = prefix;
	selectBoxSet_TB06011P();
	loginUserSet_TB06011P();
	$('#TB06011P_prefix').val(prefix);
	$('#modal-TB06011P').modal('show');
	setTimeout(() => roadPrdtCdListGrid(), 300);
	indexChangeHandler("TB06011P");
	if (prefix == "TB07100S_grid" || prefix == "TB07110S_grid") {
		prdtSn = e;
	}
}

/**
 * hide modal
 */
function modalClose_TB06011P() {
	$('#modal-TB06011P').modal('hide');
};

$("#modal-TB06011P").on('hide.bs.modal', function () {
	clearTB06011P();
	$('#TB06011P_prdtCdList').pqGrid("destroy");
});

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

	if ($('#TB06011P_prefix').val() == "TB06010S" || $('#TB06011P_prefix').val() == "TB07060S") {
		trDvsn = 'S'
	}

	if ($('#TB06011P_prefix').val() == "TB06020S") {
		trDvsn = 'D'
	}

	if ($('#TB06011P_prefix').val() == "TB06030S") {
		trDvsn = 'F'
	}

	if ($('#TB06011P_prefix').val() == "TB07150S" || $('#TB06011P_prefix').val() == "TB07080S") {
		trDvsn = 'TB07150S'
	}

	var param = {
		"prdtCd": $('#TB06011P_prdtCd').val()
		, "prdtNm": $('#TB06011P_prdtNm').val()
		, "trDvsn": trDvsn
		, "empNo": $('#TB06011P_empNo').val()
		, "dprtCd": $('#TB06011P_dprtCd').val()
	}

	if (
		$('#TB06011P_prefix').val() === "TB06010S"
		|| $('#TB06011P_prefix').val() === "TB06020S"
		|| $('#TB06011P_prefix').val() === "TB06030S"
	) {
		param.scrnNo = $('#TB06011P_prefix').val();
	}

	await $.ajax({
		type: "Post",
		url: "/TB06011P/getPrdtCdList",
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(param),
		dataType: "json",
		success: function (data) {
			if ($(`div[id='modal-TB06011P']`).css('display') === "none" && data.length === 1) {
				TB06011P_setPrdtInfo(data[0]);
				modalClose_TB06011P();
			}
			else {
				callTB06011P($('#TB06011P_prefix').val(), prdtSn);
				setTimeout(() => $("#TB06011P_prdtCdList").pqGrid('instance').setData(data), 400);
			}
		}
	});
}

/**
 * dblclick event function
 */
function TB06011P_setPrdtInfo(e) {

	var tr = $(e);
	var td = $(tr).children();

	let prdtCd = e.prdtCd;
	let prdtNm = e.prdtNm;
	let ibDealNo = e.dealNo;
	let ibDealNm = e.dealNm;
	let trCrryCd = e.trCrryCd;
	let stdrExrt = e.stdrExrt;
	let wholIssuShqt = e.wholIssuShqt;
	let hldgShqt = e.hldgShqt;
	let holdPrpsDcd = e.holdPrpsDcd;
	let eprzCrdlCtrcAmt = e.eprzCrdlCtrcAmt;
	let krwTrslExcAmt = e.krwTrslExcAmt;
	let avrUnpr = e.avrUnpr;
	let evlPflsAmt = e.evlPflsAmt;
	let tradPflsAmt = e.tradPflsAmt;
	let krwTrslExcBlce = e.krwTrslExcBlce;
	let mtrNm = e.mtrNm;
	let nmcpMtrNm = e.nmcpMtrNm;
	let lstCCaseNm = e.lstCCaseNm;
	let prgSttsCd = e.prgSttsCd;
	let prgSttsNm = e.prgSttsNm;
	let trOthrDscmNm = e.trOthrDscmNm;
	let chrrDprtCd = e.chrrDprtCd;
	let chrrEmpno = e.chrrEmpno;
	let eprzCrdlApvlAmt = e.eprzCrdlApvlAmt;
	let invAmt = e.invAmt;
	let dealExcBlce = e.dealExcBlce;
	let dealNm = e.dealNm;
	let nmcpMtrDcd = e.nmcpMtrDcd;
	let lstCCaseDcd = e.lstCCaseDcd;
	let totIssuShqt = e.totIssuShqt;
	let totIssuStkQnt = e.totIssuStkQnt;
	let ortnFndCd = e.ortnFndCd;

	// 종목정보
	// var prdtCd = td.eq(0).text();
	// var prdtNm = td.eq(1).text();
	// var ibDealNo = td.eq(2).text();
	// var nmcpMtrDcd = td.eq(3).text();
	// var lstCCaseDcd = td.eq(4).text();
	// var trCrryCd = td.eq(5).text();
	// var stdrExrt = td.eq(6).text();
	// var wholIssuShqt = td.eq(7).text();
	// var hldgShqt = td.eq(8).text();
	// var holdPrpsDcd = td.eq(9).text();
	// var eprzCrdlCtrcAmt = td.eq(10).text();
	// var krwTrslExcAmt = td.eq(11).text();
	// var krwTrslExcBlce = td.eq(12).text();
	// var avrUnpr = td.eq(13).text();
	// var evlPflsAmt = td.eq(14).text();
	// var tradPflsAmt = td.eq(15).text();
	// var krwTrslExcBlce = td.eq(11).text();
	// var mtrNm = td.eq(12).text();
	// var nmcpMtrNm = td.eq(13).text();
	// var lstCCaseNm = td.eq(14).text();
	// var prgSttsCd = td.eq(18).text();
	// var prgSttsNm = td.eq(19).text();
	// var trOthrDscmNm = td.eq(20).text();
	// var chrrDprtCd = td.eq(21).text();
	// var chrrEmpno = td.eq(22).text();
	// var eprzCrdlApvlAmt = td.eq(23).text();
	// var invAmt = td.eq(24).text();
	// var dealExcBlce = td.eq(25).text();
	// var dealNm = td.eq(26).text();
	// 	nmcpMtrDcd = td.eq(27).text();
	// 	lstCCaseDcd = td.eq(28).text();
	// var totIssuShqt  = td.eq(29).text();
	// var totIssuStkQnt = td.eq(30).text();
	// var ortnFndCd = td.eq(31).text();	// 운용펀드코드

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
	var pageTotIssuShqt = '#' + $('#TB06011P_prefix').val() + '_totIssuShqt';
	var pageTotIssuStkQnt = '#' + $('#TB06011P_prefix').val() + '_totIssuStkQnt';

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
		// pageEvlPflsAmt = '#' + $('#TB06011P_prefix').val().replace('_input', '') + '_evlPflsAmt';
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

	var qotaRt = isEmpty(e.hldgShqt) ? '0' : ((e.hldgShqt / e.wholIssuShqt) * 100).toFixed(2);
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
	if (prefix == "TB06060S" || prefix == "TB06050S") {
		$(pageIbDealNo).val(e.dealNo);
	}

	if (prefix == 'TB06014P') {
		$('#TB06014P_prdtCd').val(td.eq(0).text());
		$('#TB06014P_prdtCd').focus();
		getBssAsstList();
	}

	if (prefix == 'TB06010S' || prefix == 'TB06020S' || prefix == 'TB06030S') {
		$('#' + prefix + '_ibDealNo').val(ibDealNo);
		$('#' + prefix + '_ibDealNo').focus();
		$('#' + prefix + '_lstCCaseCcd').val(e.mtrDcd);
		$('#' + prefix + '_riskInspctCcd').val(e.jdgmDcd);
		if (prefix == 'TB06010S') {
			TB06010Sjs.getDealList();

		} else if (prefix == 'TB06020S') {
			TB06020Sjs.getDealList();

		} else if (prefix == 'TB06030S') {
			TB06030Sjs.getDealList();
		}
	}

	if (prefix == 'TB09080S') {
		$(`#${prefix}_ibDealNo`).val(ibDealNo);
		$(`#${prefix}_ibDealNm`).val(ibDealNm);
	}

	if (prefix == 'TB09100S') {
		$(`#${prefix}_ibDealNo`).val(ibDealNo);
		$(`#${prefix}_ibDealNm`).val(ibDealNm);
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

	// SPPI충족여부
	if (prefix === 'TB06050S') {
		TB06050Sjs.getSPPIData();
	}

	/* 0726 add 대출계약 실행 */
	if (prefix === 'TB07010S') {
		let numPrgSttsCd = Number(e.prgSttsCd);

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
		// $('#TB07020S_input_prdtCd').val(e.prdtCd);
		// $('#TB07020S_input_prdtNm').val(e.prdtNm);
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

	if (prefix === 'TB07100S_grid') {
		$("#TB07100S_grd_thdtTrDtls").pqGrid("updateRow", { rowIndx: prdtSn, row: { prdtCd: e.prdtCd } });
		$("#TB07100S_grd_thdtTrDtls").pqGrid("updateRow", { rowIndx: prdtSn, row: { nsFndCd: e.ortnFndCd } });
	}

	if (prefix === 'TB07110S_grid') {

		console.log(e.prdtCd, e.ortnFndCd);
		console.log("prdtSn");

		$("#TB07110S_grd_basic").pqGrid("updateRow", { rowIndx: prdtSn, row: { prdtCd: e.prdtCd } });
		$("#TB07110S_grd_basic").pqGrid("updateRow", { rowIndx: prdtSn, row: { nsFndCd: e.ortnFndCd } });
	}

	if (prefix === 'TB08040S') {
		TB08040Sjs.srch();
	}

	if (prefix === 'TB08050S') {
		TB08050Sjs.srch();
	}

	if (prefix === 'TB07190S') {
		$('#TB07190S_ibDealNo').val(e.dealNo);
	}

	modalClose_TB06011P();
}


/*
* 부서 셀렉트박스 세팅
*/

function selectBoxSet_TB06011P() {
	selectBox = getSelectBoxList("TB06011P", "D010", false);
	dprtList = selectBox.filter(function (item) {
		//부서코드 list
		return item.cmnsGrpCd === "D010";
	});

	dprtList.forEach((item) => {
		$("#TB06011P_dprtNm").append(
			$("<option>", {
				value: item.cdValue,
				text: `${item.cdName}`,
			})
		);
	});
}

/**
 * 로그인 담당자,관리부서 세팅
 */

function loginUserSet_TB06011P() {
	empNo = $('#userEno').val();     //직원명
	dprtCd = $('#userDprtCd').val(); //부서번호

	$("#TB06011P_empNm").val($('#userEmpNm').val());
	$("#TB06011P_empNo").val(empNo);
	$("#TB06011P_dprtNm").val(dprtCd).prop("selected", true);
	$("#TB06011P_dprtCd").val(dprtCd);
}

/**
 * 부서명 변경시
 */

$("#TB06011P_dprtNm").on("change", function () {
	var dprtCd = $(this).val();
	$("#TB06011P_dprtCd").val(dprtCd);
});
