var fndPgGrid;


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
		filter: { crules: [{ condition: 'range' }] } 
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
	clearTB07022P();

	$('#TB07022P_prefix').val(prefix);
	$('#modal-TB07022P').modal('show');
	indexChangeHandler("TB07022P");

	setTimeout(() => showFndGrid(), 300);					//그리드 호출	
}

/**
 * hide modal
 */
function modalClose_TB07022P() {
	
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
			/*var html = '';
			var prdtCdList = data;
			$('#TB07022P_fnltCd').html(html);
			

			if (prdtCdList.length > 0) {
				$.each(prdtCdList, function(key, value) {
					html += '<tr ondblclick="setFndInfo(this);">';
					html += '<td>' + handleNullData(value.fndCd) + '</td>';
					html += '<td align="left">' + handleNullData(value.fndNm) + '</td>';
					html += '<td>' + handleNullData(value.fndDvsnNm) + '</td>';
					html += '<td>' + handleNullData(value.stupDt) + '</td>';
					html += '<td>' + handleNullData(value.fndTpNm) + '</td>';
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			$('#TB07022P_prdtCdList').html(html);*/
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