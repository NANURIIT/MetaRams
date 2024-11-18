var fnltPgGrid;

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
	
	clearTB07021P();
	
	$('#TB07021P_prefix').val(prefix);
	$('#modal-TB07021P').modal('show');
	indexChangeHandler("TB07021P");
	
	setTimeout(() => showFnltGrid(), 300);					//그리드 호출

}

/**
 * hide modal
 */
function modalClose_TB07021P() {
	
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