var fndPgGrid = [];
let TB07022P_pf;
let TB07022P_gridState = 1;
let TB07022P_srchCnt = 0;
let TB07022P_onchangehandler = "on";	// on off


//그리드 최하단 페이지모델
var pageModel_Fnd = {

	type: "local",
	rPP: 50, strRpp: "{0}",

	//customize localization strings.
	strDisplay: "{0} to {1} of {2}",
	strPage: "Page {0} / {1}",

	layout: ['first', 'prev', 'next', 'last', "|", "strPage"]

}

//그리드 컬럼 세팅 
var colModel_Fnd = [

	{ 	
		title: "펀드코드", 
		// editable: true,
		dataType: "string", 
		dataIndx: "fndCd", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "펀드명", 
		// editable: true,
		dataType: "string", 
		dataIndx: "fndNm", 
		align: "left", 
		halign: "center", 
		width: "300", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "펀드구분명", 
		// editable: true,
		dataType: "string", 
		dataIndx: "fndDvsnNm", 
		align: "left", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "설정일자", 
		// editable: true,
		dataType: "string", 
		dataIndx: "stupDt", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } ,
		render: function (ui) {
			let cellData = ui.cellData;
			let formattedData = cellData.split(" ")[0];
			return formattedData;
		  },
	},			
	{ 	
		title: "펀드유형명", 
		dataType: "string", 
		dataIndx: "fndTpNm", 
		align: "left", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
		
	}

]



//그리드 호출
function showFndGrid(){

	fndPgGrid = $("#grdFnd").pqGrid( 'instance' );
	
	if(typeof fndPgGrid == "undefined") {
	
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
			//toolbar: toolbar,
			scrollModel: { autoFit: true },
			colModel: colModel_Fnd,
			strNoRows: '데이터가 없습니다.'
			//pageModel_Fnd: pageModel_Fnd
		};
	
		$("#grdFnd").pqGrid(obj);
		fndPgGrid = $("#grdFnd").pqGrid( 'instance' );
		
	} 
	else {		
		fndPgGrid.setData([]);
	}

}


//그리드에 데이터 넣기 (CRUD)
function dataFndSetGrid(data){
	
	fndPgGrid.setData(data);
	fndPgGrid.option("strNoRows", '조회된 데이터가 없습니다.');
	fndPgGrid.on("cellDblClick", function (event, ui) 
		{
		 	var rowData = ui.rowData;
		 	//alert(rowData);
		 	setFndInfo(rowData);
		});
	
	// //검색된 행이 1개일 경우 데이터 바로 입력
	// if (fndPgGrid.pdata.length === 1) {
	// 	setFndInfo(fndPgGrid.pdata[0]);
	// }
	// // 검색된 행이 0일 경우 모든 데이터 출력
	// else if (fndPgGrid.pdata.length === 0) {
	// 	$('#TB07022P_fndCd').val("");
	// 	getFndList();
	// }

	// 검색된 행이 1개일 경우 데이터 바로 입력
	if (fndPgGrid.pdata.length === 1 && $(`div[id='modal-TB07022P']`).css('display') === "none") {
		setFndInfo(fndPgGrid.pdata[0]);
		TB07022P_srchCnt = 0;
		// 입력되고 난 후 온체인지 이벤트 on
		TB07022P_onchangehandler = "on"
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	// 변부장님 지시로 삭제
	// else if (fndPgGrid.pdata.length === 0) {
	// 	// 데이터 없는 경우 재조회 방지
	// 	TB07022P_srchCnt += 1;
	// 	$('#TB07022P_fndCd').val("");
	// 	getFndList();
	// }
	// 그렇지 않은 경우 조건에 맞는 데이터 출력
	else {
		TB07022P_srchCnt = 0;
	}

}


$(document).ready(function() {

	docRdySettings();

});

/**
	문서로드시 세팅
 */
function docRdySettings() {
	modalShowFunction();
	keyDownEnter_TB07022P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction() {
	$('#modal-TB07022P').on('shown.bs.modal', function() {
		$('#modal-TB07022P input[id=TB07022P_fndCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB07022P() {
	$("input[id=TB07022P_fndCd]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getFndList();
		}
	});

	$("input[id=TB07022P_fndNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getFndList();
		}
	});
}


/**
 * show modal 
 */
function callTB07022P(prefix) {

	TB07022P_pf = prefix;

	$('#TB07022P_prefix').val(prefix);
	$('#modal-TB07022P').modal('show');
	indexChangeHandler("TB07022P");

	setTimeout(() => showFndGrid(), 300);					//그리드 호출	
}

/**
 * hide modal
 */
function modalClose_TB07022P() {
	clearTB07022P();
	if(typeof fndPgGrid != "undefined") fndPgGrid.setData([]);		
	$('#modal-TB07022P').modal('hide');
	
};

/**
 * clear modal
 */
function clearTB07022P() {
	$('#TB07022P_fndCd').val("");
	$('#TB07022P_fndNm').val("");
}

function getFndList() {
	
	var param = {
		"fndCd" : $('#TB07022P_fndCd').val()
		, "fndNm" : $('#TB07022P_fndNm').val()
	}
	
	$.ajax({
		type: "GET",
		url: "/getFndList",
		data: param,
		dataType: "json",
		success: function(data) {
			if($(`div[id='modal-TB07022P']`).css('display') === "none" && data.length === 1){
				setFndInfo(data[0]);
				modalClose_TB07022P();
			}
			else {
				callTB07022P($('#TB07022P_prefix').val());
				setTimeout(() => dataFndSetGrid(data), 400)
			}
		}
	});
}


/**
 * dblclick event function
 */
function setFndInfo(e) {
	/*var tr = $(e);
	var td = $(tr).children();
	
	//운용펀드정보
	var fndCd = td.eq(0).text();					// 펀드코드
	var fndNm = td.eq(1).text();					// 펀드한글명
	
	var prefix = $("#TB07022P_prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.*/
	
	var pageFndCd = '#' + $('#TB07022P_prefix').val() + '_fndCd';
	var pageFndNm = '#' + $('#TB07022P_prefix').val() + '_fndNm';
	
	$(pageFndCd).val(e.fndCd);
	$(pageFndNm).val(e.fndNm);
	
	modalClose_TB07022P();
}


function TB07022P_srchFnd(menuId){

	/**
	 * 코드길이체크 후 자동조회
	 */
	$(`div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB07022P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_fndCd']").on('input', async function () {
		// console.log("화면 인풋 태그 감시중");
		const str = $(this).val().length

		// 같이 붙어있는 인풋박스 id
		const result = $(this).attr('id').slice(0, $(this).attr('id').length - 2) + 'Nm';

		// 데이터를 지울때 값이 없으면 지워줌
		// 값이 있으면 온체인지 또는 온인풋 이벤트로 값 채워짐
		$(`#${result}`).val("")

		/**
		 ********* 각 컬럼의 길이로 세팅을 하셔야해용 *********
		 */
		// ex) 펀드코드 VARCHAR(5)
		if(str === 5){
			
			await srchEvent_TB07022P(this);

		}
	})

	
	$(`div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB07022P"]:not([disabled])`).closest('span.input-group-append').prev("input[id*='_fndCd']").on('keydown', async function (evt) {

		// Enter에만 작동하는 이벤트
		if (evt.keyCode === 13) {
			// console.log("화면내 엔터 이벤트");
			evt.preventDefault();

			await srchEvent_TB07022P(this);

		}
	});

	async function srchEvent_TB07022P (selector){
		let prefix;
		if ($(selector).attr('id') === $("#TB07022P_fndCd").attr('id')) {
			prefix = TB07022P_pf;
		} else {
			prefix = $(selector).attr('id').slice(0, $(selector).attr('id').length - 6);
		}

		$(`input[id='${prefix}_fndNm']`).val("");

		$('#TB07022P_prefix').val(prefix);

		// 인풋박스 밸류
		let data = $(selector).val();

		// 팝업 오픈
		$('#TB07022P_fndCd').val(data);
		getFndList();
	}
}