var arrPqGridMrtgInfoList;


let TB06017P_gridState = 1;
let TB06017P_onchangehandler = "on";	// on off

$(document).ready(function () {
	TB06017P_docRdySettings();
});

/**
 * show modal 
 */
function callTB06017P(prefix) {
	$('#TB06017P_prefix').val(prefix);
	$('#modal-TB06017P').modal('show');
	setTimeout(() => roadMrtgInfoListGrid(), 300);
	indexChangeHandler("TB06017P");
	if (prefix == 'TB06013P') {
		$("#TB06017P_mrtgMngmNo").val($("#TB06013P_mrtgMngmNo").val());  //담보번호
	}
}

/**
	문서로드시 세팅
 */
function TB06017P_docRdySettings() {
	modalShowFunction_TB06017P();
	keyDownEnter_TB06017P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction_TB06017P() {
	$('#modal-TB06017P').on('shown.bs.modal', function () {
		$('#modal-TB06017P input[id=TB06017P_mrtgMngmNo]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06017P() {
	$("input[id=TB06017P_mrtgMngmNo]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getMrtgInfo();
		}
	});

	$("input[id=TB06017P_mrtgNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getMrtgInfo();
		}
	});
}

/**
 * 팝업 닫힌채 자동호출 , 검색
 */
function TB06017P_srch(menuId) {
	/**
	 * (1) 담보번호길이체크 후 자동조회
	 */
	$(`div[id="modal-TB06013P"] span.input-group-append > button[onclick*="callTB06017P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_mrtgMngmNo']").on('input', async function () {
		const str = $(this).val().length
		// 같이 붙어있는 인풋박스 id
		$('#TB06013P_mrtgNm_forSeach').val("");
		// ex) 담보번호 VARCHAR(16)
		if (str === 16) {
			await srchEvent_TB06017P(this);
		}
	})

	/**
	 * (2) 담보번호 키이벤트 
	 * */
	$(`div[id="modal-TB06013P"] span.input-group-append > button[onclick*="callTB06017P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_mrtgMngmNo']").on('keydown', async function (evt) {
		// Enter에만 작동하는 이벤트
		if (evt.keyCode === 13) {
			evt.preventDefault();
			await srchEvent_TB06017P(this);
		}
	})
	/**
	 *(3) 부모이벤트 컨트롤
	 */
	async function srchEvent_TB06017P(selector) {
		// 사용한 인풋박스의 출처 페이지 가져오기
		let prefix;
		prefix = 'TB06013P';
		$('#TB06013P_mrtgNm_forSeach').val("");

		$('#TB06017P_prefix').val(prefix);

		// 인풋박스 밸류
		let data = $(selector).val();
		$('#TB06017P_mrtgMngmNo').val(data);
		getMrtgInfo()
	}
}





//그리드 컬럼 세팅 
var colMrtgInfoList = [

	{
		title: "담보번호",
		dataType: "string",
		dataIndx: "mrtgMngmNo",
		align: "center",
		halign: "center",
		width: 90,
		filter: { crules: [{ condition: 'range' }] }
	},
	{
		title: "담보명",
		dataType: "string",
		dataIndx: "mrtgNm",
		align: "left",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담보종류",
		dataType: "string",
		dataIndx: "mrtgStupKndNm",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담보대분류",
		dataType: "string",
		dataIndx: "mrtgLclsNm",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담보중분류",
		dataType: "string",
		dataIndx: "mrtgMdclNm",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담보평가기준",
		dataType: "string",
		dataIndx: "mrtgEvlStdrNm",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
	},
	{
		title: "담보금액",
		dataType: "integer",
		dataIndx: "mrtgEvlAmt",
		align: "right",
		halign: "center",
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
		title: "등록일자",
		dataType: "string",
		dataIndx: "rgstDt",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			let cellData = ui.cellData;
			if (cellData && cellData.length !== 0) {
				let rgstDt1 = cellData.substring(0, 4);
				let rgstDt2 = cellData.substring(4, 6);
				let rgstDt3 = cellData.substring(6, 8);
				return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
			}
			return cellData;
		}
	},
	{
		title: "해지일자",
		dataType: "string",
		dataIndx: "mrtgCclcDt",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			let cellData = ui.cellData;
			if (cellData && cellData.length !== 0) {
				let rgstDt1 = cellData.substring(0, 4);
				let rgstDt2 = cellData.substring(4, 6);
				let rgstDt3 = cellData.substring(6, 8);
				return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
			}
			return cellData;
		}
	},
	{
		title: "담보평가기준코드",
		dataType: "string",
		dataIndx: "mrtgEvlStdrCd",
		align: "right",
		halign: "center",
		hidden: true,
		filter: { crules: [{ condition: 'range' }] },
	}

];

//그리드 호출
function roadMrtgInfoListGrid() {
	arrPqGridMrtgInfoList = $("#TB06017P_mrtgInfoList").pqGrid('instance');
	if (typeof arrPqGridMrtgInfoList == "undefined") {
		var obj = {
			height: 665,
			maxHeight: 665,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" },
			editable: false,
			scrollModel: { autoFit: true },
			colModel: colMrtgInfoList,
			strNoRows: '데이터가 없습니다.',
			rowClick: function (event, ui) {
				pqGridSelectHandler(ui.rowIndx, "TB06017P_mrtgInfoList", setMrtgInfo(ui.rowData));
			}
		};
		
		$("#TB06017P_mrtgInfoList").pqGrid(obj);
		arrPqGridMrtgInfoList = $("#TB06017P_mrtgInfoList").pqGrid('instance');
	}
	else {
		arrPqGridMrtgInfoList.setData([]);
	}

}

/**
 * hide modal
 */
function modalClose_TB06017P() {
	clearTB06017P();
	if (typeof fnltPgGrid != "undefined") arrPqGridMrtgInfoList.setData([]);
	$('#modal-TB06017P').modal('hide');
};

/**
 * clear modal
 * 초기화 버튼
 */
function clearTB06017P() {
	$('#TB06017P_mrtgMngmNo').val("");
	$('#TB06017P_mrtgNm').val("");
}

/**
 * 조회 버튼
 */
function getMrtgInfo() {

	var paramData = {
		"mrtgMngmNo": $('#TB06017P_mrtgMngmNo').val()
		, "mrtgNm": $('#TB06017P_mrtgNm').val()
	}
	$.ajax({
		type: "GET",
		url: "/TB06017P/getMrtgInfo",
		data: paramData,
		dataType: "json",
		success: function (data) {
			if($(`div[id='modal-TB06017P']`).css('display') === "none" && data.length === 1){
				setMrtgInfo(data[0]);
				modalClose_TB06017P();
			}
			else {
				callTB06017P($('#TB06017P_prefix').val());
				setTimeout(() => $("#TB06017P_mrtgInfoList").pqGrid('instance').setData(data), 400);
			}
		}
	});
}

/**
 * dblclick event function
 * 더블클릭 이벤트
 */
function setMrtgInfo(e) {
	var tr = $(e);
	var td = $(tr).children();

	// 종목정보
	var mrtgMngmNo = td.eq(0).text();
	var mrtgNm = td.eq(1).text();
	var mrtgStupKndCd = td.eq(2).text();
	var mrtgLclsCd = td.eq(3).text();
	var mrtgMdclCd = td.eq(4).text();
	var mrtgAmt = td.eq(5).text();
	var rgstDt = td.eq(6).text();
	var mrtgCclcDt = td.eq(7).text();

	// 페이지 항목
	var pageMrtgMngmNo = '#' + $('#TB06017P_prefix').val() + '_mrtgMngmNo';
	var pageMrtgNm = '#' + $('#TB06017P_prefix').val() + '_mrtgNm_forSeach';

	// 값 전달
	$(pageMrtgMngmNo).val(e.mrtgMngmNo);
	$(pageMrtgNm).val(e.mrtgNm);

	TB06013P_getMrtgInfoDetails();
	modalClose_TB06017P();
}
