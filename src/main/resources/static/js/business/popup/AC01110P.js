var colM_AC01110P = [
	{
		title: "부점명",
		dataType: "string",
		dataIndx: "DPRT_NM",
		align: "left",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: 'range' }] } ,
	},
	{
		title: "부점코드",
		dataType: "string",
		dataIndx: "DPRT_CD",
		align: "center",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: 'range' }] } ,
	},
	{
		title: "본부명",
		dataType: "string",
		dataIndx: "HDQT_NM",
		align: "left",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: 'range' }] } ,
	},
	{
		title: "본부코드",
		dataType: "string",
		dataIndx: "HDQT_CD",
		align: "center",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: 'range' }] } ,
	},
	
]

$(document).ready(function () {
	keyDownEnter();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAC01110P(prefix) {
	//reset_AC01110P();
	$('#prefix').val(prefix);
	$('#modal-AC01110P').modal('show');

	setTimeout(function() {
		showGrid_AC01110P();
	}, 300);
}

function showGrid_AC01110P(){
	var obj = {
		height: 300,
		maxHeight: 300,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: false },
		editable: false,
		dataModel: {
            data: []
        },
		//toolbar: toolbar,
		scrollModel: { autoFit: true },
		colModel: colM_AC01110P,
		strNoRows: '데이터가 없습니다.',
		cellDblClick: function(event, ui) {
			var rowData = ui.rowData;

			setDprt(rowData);

		}


		
	};

	$("#AC01110P_tbodyDprtList").pqGrid(obj);
}

/**
 * 모달 초기화
 */
function reset_AC01110P() {
	$('#AC01110P_tbodyList').html("");
	$('#prefix').val("");
	$('#AC01110P_dprtCd').val("");
	$('#AC01110P_dprtNm').val("");

	//$("#AC01110P_tbodyDprtList").pqGrid('destroy');
}

/**
 * Enter key Event
 */
function keyDownEnter() {

	$("input[id=AC01110P_dprtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getList();
		}
	});

	$("input[id=AC01110P_dprtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getList();
		}
	});
}

/**
 * ajax 통신(조회)
 */
function getDprtList() {

	var dprtCd = $("#AC01110P_dprtCd").val();
	var dprtNm = $("#AC01110P_dprtNm").val();

	var dtoParam = {
		"dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	$.ajax({
		type: "GET",
		url: "/findDprtList",
		data: dtoParam,
		dataType: "json",
		beforeSend: function(){
			$("#AC01110P_tbodyDprtList").pqGrid("option", "strNoRows", "조회 중입니다...");
		},
		success: function (data) {
			// var a = '';
			// $('#AC01110P_tbodyDprtList').html(a);
			rebuildDprtTable(data);
		}
	});

}

/**
 * 결과값 table 생성
 */
function rebuildDprtTable(data) {
	// var html = '';
	var dprtList = data;

	if (dprtList.length <= 0) {
		// html += '<tr>';
		// html += '<td colspan="4" style="text-align: center">데이터가 없습니다.</td>';
		// html += '</tr>';
		$("#AC01110P_tbodyDprtList").pqGrid("option", "strNoRows", "데이터가 없습니다.");
		$("#AC01110P_tbodyDprtList").pqGrid("refreshDataAndView");

	} else if (dprtList.length > 0) {
		$("#AC01110P_tbodyDprtList").pqGrid("option", "strNoRows", "데이터가 없습니다.");
		$("#AC01110P_tbodyDprtList").pqGrid("setData", dprtList);
		$("#AC01110P_tbodyDprtList").pqGrid("refreshDataAndView");
	}

};

/**
 * modal hide
 */
function modalClose_AC01110P() {
	reset_AC01110P();
	$('#modal-AC01110P').modal('hide');
}

/**
 * 부모창에 결과값 전달
 */
function setDprt(rowData) {
	//var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	//var td = $(tr).children();

	var dprtCd = rowData.DPRT_CD;	// 부점코드
	var dprtNm = rowData.DPRT_NM;	// 부점명
	var hdqtCd = rowData.HDQT_CD;	// 본부코드
	var hdqtNm = rowData.HDQT_NM;	// 본부명

	var prefix = $("#prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	var pageDprtCd = '#' + prefix + '_dprtCd';
	var pageDprtNm = '#' + prefix + '_dprtNm';
	var pageHdqtCd = '#' + prefix + '_hdqtCd';
	var pageHdqtNm = '#' + prefix + '_hdqtNm';

	$(pageDprtCd).val(dprtCd);
	$(pageDprtNm).val(dprtNm);
	$(pageHdqtCd).val(hdqtCd);
	$(pageHdqtNm).val(hdqtNm);

	//reset_AC01110P();
	modalClose_AC01110P();
}