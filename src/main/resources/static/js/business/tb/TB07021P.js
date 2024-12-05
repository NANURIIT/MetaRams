var fnltPgGrid = [];
let TB07021P_pf;
let TB07021P_gridState = 1;				//그리드 상태 (0:: 열림 1:: 닫힘)

//그리드 최하단 페이지모델
var pageModel_Fnlt = {

	type: "local",
	rPP: 50, strRpp: "{0}",

	//customize localization strings.
	strDisplay: "{0} to {1} of {2}",
	strPage: "Page {0} / {1}",

	layout: ['first', 'prev', 'next', 'last', "|", "strPage"]

}

//그리드 컬럼 세팅 
var colModel_Fnlt = [

	{ 	
		title: "은행코드", 
		// editable: true,
		dataType: "string", 
		dataIndx: "fnltCd", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "은행명", 
		dataType: "string", 
		dataIndx: "fnltNm", 
		align: "left", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
		
	}

]



//그리드 호출
function showFnltGrid(){

	fnltPgGrid = $("#grdFnlt").pqGrid( 'instance' );
	
	if(typeof fnltPgGrid == "undefined") {
	
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
			colModel: colModel_Fnlt,
			strNoRows: '데이터가 없습니다.'
			//pageModel_Fnlt: pageModel_Fnlt
		};
	
		$("#grdFnlt").pqGrid(obj);
		fnltPgGrid = $("#grdFnlt").pqGrid( 'instance' );
		//$("#grdFnlt").pqGrid("refreshDataAndView");
		
	} 
	else {
		
		fnltPgGrid.setData([]);
		//$("#grdFnlt").pqGrid("removeData");
	}

}


//그리드에 데이터 넣기 (CRUD)
function dataFnltSetGrid(data){
	
	fnltPgGrid.setData(data);
	fnltPgGrid.option("strNoRows", '조회된 데이터가 없습니다.');
	fnltPgGrid.on("cellDblClick", function (event, ui) 
		{
		 	var rowData = ui.rowData;
		 	//alert(rowData);
		 	setFnltInfo(rowData);
		});
	
	//검색된 행이 1개일 경우 데이터 바로 입력
	if (fnltPgGrid.pdata.length === 1) {
		setFnltInfo(fnltPgGrid.pdata[0]);
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	else if (fnltPgGrid.pdata.length === 0) {
		$('#TB07021P_fnltCd').val("");
		getFnltList();
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
	keyDownEnter_TB07021P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction() {
	$('#modal-TB07021P').on('shown.bs.modal', function() {
		$('#modal-TB07021P input[id=TB07021P_fnltCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB07021P() {
	$("input[id=TB07021P_fnltCd]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
		}
	});

	$("input[id=TB07021P_fnltNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
		}
	});
}


/**
 * show modal 
 */
function callTB07021P(prefix) {
	
	TB07021P_gridState = 0;
	TB07021P_pf = prefix;

	clearTB07021P();
	
	$('#TB07021P_prefix').val(prefix);
	$('#modal-TB07021P').modal('show');
	indexChangeHandler("TB07021P");
	
	setTimeout(() => showFnltGrid(), 300);					//그리드 호출

}


function callGridTB07021P(prefix){
	clearTB07021P();
	$('#TB07021P_prefix').val(prefix);
	setTimeout(() => showFnltGrid(), 300);
}

/**
 * hide modal
 */
function modalClose_TB07021P() {
	TB07021P_gridState = 1;
	if(typeof fnltPgGrid != "undefined") fnltPgGrid.setData([]);		
	$('#modal-TB07021P').modal('hide');
	
};

/**
 * clear modal
 */
function clearTB07021P() {
	$('#TB07021P_fnltCd').val("");
	$('#TB07021P_fnltNm').val("");
	
	/*var html = '';
	html += '<tr>';
	html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
	html += '</tr>';
	
	$('#TB07021P_prdtCdList').html(html);	*/
}

function getFnltList() {
	
	var param = {
		"fnltCd" : $('#TB07021P_fnltCd').val()
		, "fnltNm" : $('#TB07021P_fnltNm').val()
	}
	
	$.ajax({
		type: "GET",
		url: "/getFnltList",
		data: param,
		dataType: "json",
		success: function(data) {
			/*
			var html = '';
			var prdtCdList = data;
			$('#TB07021P_fnltCd').html(html);
			

			if (prdtCdList.length > 0) {
				$.each(prdtCdList, function(key, value) {
					html += '<tr ondblclick="setFnltInfo(this);">';
					html += '<td>' + handleNullData(value.fnltCd) + '</td>';
					html += '<td>' + handleNullData(value.fnltNm) + '</td>';
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			$('#TB07021P_prdtCdList').html(html);
			*/
			dataFnltSetGrid(data);
		}
	});
}


/**
 * dblclick event function
 */
function setFnltInfo(e) {
	/*
	var tr = $(e);
	var td = $(tr).children();
	
	var fnltCd = td.eq(0).text();		// 은행코드
	var fnltNm = td.eq(1).text();		// 은행한글명
	
	var prefix = $("#TB07021P_prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	*/
	var pageFnltCd = '#' + $('#TB07021P_prefix').val() + '_fnltCd';
	var pagefnltNm = '#' + $('#TB07021P_prefix').val() + '_fnltNm';
	
	$(pageFnltCd).val(e.fnltCd);
	$(pagefnltNm).val(e.fnltNm);

	
	modalClose_TB07021P();
}


function TB07021P_srchFnlt(){
	
	$('span.input-group-append > button:not([disabled])').closest('span.input-group-append').prev("input[id*='_fnltCd']").on('keydown', async function (evt) {

		if (evt.keyCode === 13) {
			evt.preventDefault();

			let prefix;
			if ($(this).attr('id') === $("#TB07021P_fnltCd").attr('id')) {
				prefix = TB07021P_pf;
			} else {
				prefix = $(this).attr('id').slice(0, $(this).attr('id').length - 7);
			}

			$(`input[id='${prefix}_fnltNm']`).val("");

			$('#TB07021P_prefix').val(prefix);

			if ($(`div[id='modal-TB07021P'][style*="display: none;"]`).length === 1) {
				TB07021P_gridState = 1;
			}



			// 인풋박스 밸류
			let data = $(this).val();
			$('#TB07021P_fnltCd').val(data);
			await TB07021_getGridState();

			// 팝업 오픈

			/**
			 * 팝업 열려있음
			 */
			if (TB07021P_gridState === 0) {
				console.log("열려있음", TB07021P_gridState);
				callGridTB07021P(prefix);
				$('#TB07021P_fnltCd').val(data);
				setTimeout(() => getFnltList(), 400);
			} else
				/**
				 * 팝업 닫혀있음
				 */
				if (TB07021P_gridState === 1) {
					console.log("닫혀있음", TB07021P_gridState);
					callTB07021P(prefix);
					$('#TB07021P_fnltCd').val(data);
					setTimeout(() => getFnltList(), 400);
				}
		}
	});

	$('span.input-group-append > button:not([disabled])').closest('span.input-group-append').prev("input[id*='_fnltCd']").on('change', async function (evt) {

		let prefix;
		if ($(this).attr('id') === $("#TB07021P_fnltCd").attr('id')) {
			prefix = TB07021P_pf;
		} else {
			prefix = $(this).attr('id').slice(0, $(this).attr('id').length - 7);
		}

		$(`input[id='${prefix}_fnltNm']`).val("");

		$('#TB07021P_prefix').val(prefix);

		/**
		 * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
		 * 그리드 상태 다시 체크해주기
		 */
		if ($(`div[id='modal-TB07021P'][style*="display: none;"]`).length === 1) {
			TB07021P_gridState = 1;
		}
		// else {

		// }


		// 인풋박스 밸류
		let data = $(this).val();
		$('#TB07021P_fnltCd').val(data);
		await TB07021_getGridState();

		// 팝업 오픈

		/**
		 * 팝업 열려있음
		 */
		if (TB07021P_gridState === 0) {
			console.log("열려있음", TB07021P_gridState);
			callGridTB07021P(prefix);
			$('#TB07021P_fnltCd').val(data);
			setTimeout(() => getFnltList(), 400);
		} else
			/**
			 * 팝업 닫혀있음
			 */
			if (TB07021P_gridState === 1) {
				console.log("닫혀있음", TB07021P_gridState);
				callTB07021P(prefix);
				$('#TB07021P_fnltCd').val(data);
				setTimeout(() => getFnltList(), 400);
			}
	});
}

async function TB07021_getGridState(){

	if (TB07021P_gridState === 0) {
		return;
	}

	var param = {
		"fnltCd" : $('#TB07021P_fnltCd').val()
		, "fnltNm" : $('#TB07021P_fnltNm').val()
	}
	
	$.ajax({
		type: "GET",
		url: "/getFnltList",
		data: param,
		dataType: "json",
		success: function(data) {
			console.log("숨는 쿼리:::" + data.length);
			if (!data || data === undefined || data.length === 0) {
				// console.log("1번조건");
				TB07021P_gridState = 1;
			} else if (data.length >= 2) {
				// console.log("2번조건");
				TB07021P_gridState = 1;
			} else if (data) {
				// console.log("3번조건");
				TB07021P_gridState = 0;
			}
		}
	});
}