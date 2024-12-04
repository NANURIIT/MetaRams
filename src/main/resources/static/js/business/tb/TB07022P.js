var fndPgGrid = [];
let TB07022P_pf;
let TB07022P_gridState = 1;


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
	
	//검색된 행이 1개일 경우 데이터 바로 입력
	if (fndPgGrid.pdata.length === 1) {
		setFndInfo(fndPgGrid.pdata[0]);
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	else if (fndPgGrid.pdata.length === 0) {
		$('#TB07022P_fndCd').val("");
		getFndList();
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
			
		}
	});

	$("input[id=TB07022P_fndNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
		}
	});
}


/**
 * show modal 
 */
function callTB07022P(prefix) {

	TB07022P_gridState = 0;
	TB07022P_pf = prefix;

	clearTB07022P();

	$('#TB07022P_prefix').val(prefix);
	$('#modal-TB07022P').modal('show');
	indexChangeHandler("TB07022P");

	setTimeout(() => showFndGrid(), 300);					//그리드 호출	
}

function callGridTB07022P(prefix) {
	clearTB07022P();
	$('#TB07022P_prefix').val(prefix);
	setTimeout(() => showFndGrid(), 300);
}


/**
 * hide modal
 */
function modalClose_TB07022P() {
	TB07022P_gridState = 1;
	if(typeof fndPgGrid != "undefined") fndPgGrid.setData([]);		
	$('#modal-TB07022P').modal('hide');
	
};

/**
 * clear modal
 */
function clearTB07022P() {
	
	$('#TB07022P_fndCd').val("");
	$('#TB07022P_fndNm').val("");
	
	/*var html = '';
	html += '<tr>';
	html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
	html += '</tr>';
	
	$('#TB07022P_prdtCdList').html(html);*/
				
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
			console.log(JSON.stringify(data));
			dataFndSetGrid(data);
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


function TB07022P_srchFnd(){
	$('span.input-group-append').prev("input[id*='_fndCd']").on('keydown', async function (evt) {

		if (evt.keyCode === 13) {
			evt.preventDefault();

			let prefix;
			if ($(this).attr('id') === $("#TB07022P_fndCd").attr('id')) {
				prefix = TB07022P_pf;
			} else {
				prefix = $(this).attr('id').slice(0, $(this).attr('id').length - 6);
			}

			$(`input[id='${prefix}_fndNm']`).val("");

			$('#TB07022P_prefix').val(prefix);

			if ($(`div[id='modal-TB07022P'][style*="display: none;"]`).length === 1) {
				TB07022P_gridState = 1;
			}
			// else {

			// }


			// 인풋박스 밸류
			let data = $(this).val();
			$('#TB07022P_fndCd').val(data);
			await TB07022_getGridState();

			// 팝업 오픈

			/**
			 * 팝업 열려있음
			 */
			if (TB07022P_gridState === 0) {
				console.log("열려있음", TB07022P_gridState);
				callGridTB07022P(prefix);
				$('#TB07022P_fndCd').val(data);
				setTimeout(() => getFndList(), 400);
			} else
				/**
				 * 팝업 닫혀있음
				 */
				if (TB07022P_gridState === 1) {
					console.log("닫혀있음", TB07022P_gridState);
					callTB07022P(prefix);
					$('#TB07022P_fndCd').val(data);
					setTimeout(() => getFndList(), 400);
				}
		}
	});

	$('span.input-group-append').prev("input[id*='_fndCd']").on('change', async function (evt) {

		let prefix;
		if ($(this).attr('id') === $("#TB07022P_fndCd").attr('id')) {
			prefix = TB07022P_pf;
		} else {
			prefix = $(this).attr('id').slice(0, $(this).attr('id').length - 6);
		}

		$(`input[id='${prefix}_fndNm']`).val("");

		$('#TB07022P_prefix').val(prefix);

		/**
		 * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
		 * 그리드 상태 다시 체크해주기
		 */
		if ($(`div[id='modal-TB07022P'][style*="display: none;"]`).length === 1) {
			TB07022P_gridState = 1;
		}
		// else {

		// }


		// 인풋박스 밸류
		let data = $(this).val();
		$('#TB07022P_fndCd').val(data);
		await TB07022_getGridState();

		// 팝업 오픈

		console.log(TB07022P_gridState);

		/**
		 * 팝업 열려있음
		 */
		if (TB07022P_gridState === 0) {
			console.log("열려있음", TB07022P_gridState);
			callGridTB07022P(prefix);
			$('#TB07022P_fndCd').val(data);
			setTimeout(() => getFndList(), 400);
		} else
			/**
			 * 팝업 닫혀있음
			 */
			if (TB07022P_gridState === 1) {
				console.log("닫혀있음", TB07022P_gridState);
				callTB07022P(prefix);
				$('#TB07022P_fndCd').val(data);
				setTimeout(() => getFndList(), 400);
			}
	});
}

async function TB07022_getGridState(){

	if (TB07022P_gridState === 0) {
		return;
	}

	var param = {
		"fndCd" : $('#TB07022P_fndCd').val()
		, "fndNm" : $('#TB07022P_fndNm').val()
	}


	await $.ajax({
		type: "GET",
		url: "/getFndList",
		data: param,
		dataType: "json",
		success: function(data) {
			console.log("숨는 쿼리:::" + data.length);
			if (!data || data === undefined || data.length === 0) {
				// console.log("1번조건");
				TB07022P_gridState = 1;
			} else if (data.length >= 2) {
				// console.log("2번조건");
				TB07022P_gridState = 1;
			} else if (data) {
				// console.log("3번조건");
				TB07022P_gridState = 0;
			}
		}
	});
}