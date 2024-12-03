var arrPqGridMrtgInfoList;

$(document).ready(function() {

	docRdySettings();

});


//그리드 컬럼 세팅 
var colMrtgInfoList = [

	{ 	
		title    : "담보번호",  
		dataType : "string", 
		dataIndx : "mrtgMngmNo", 
		align    : "center",
		halign	 : "center",
		width    : 90,
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "담보명", 
		dataType : "string",
		dataIndx : "mrtgNm", 
		align    : "left", 
		halign	 : "center",
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "담보종류", 
		dataType : "string", 
		dataIndx : "mrtgStupKndNm",
		align    : "left",
		halign	 : "center",
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "담보대분류", 
		dataType : "string", 
		dataIndx : "mrtgLclsNm",
		align    : "left",
		halign	 : "center",
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "담보중분류", 
		dataType : "string", 
		dataIndx : "mrtgMdclNm",
		align    : "left",
		halign	 : "center",
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "담보평가기준", 
		dataType : "string", 
		dataIndx : "mrtgEvlStdrNm",
		align    : "left",
		halign	 : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "담보금액", 
		dataType : "integer", 
		dataIndx : "mrtgAmt", 
		align    : "right",
		halign	 : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		render	 : function (ui) {
            let cellData = ui.cellData;
            if (cellData !== null && cellData !== undefined) {
                return addComma(cellData); 
            }
            return cellData; 
        }

	},
	{ 	
		title    : "등록일자", 
		dataType : "string", 
		dataIndx : "rgstDt", 
		align    : "center",
		halign	 : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		render   : function (ui) {
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
		title    : "해지일자", 
		dataType : "string", 
		dataIndx : "mrtgCclcDt", 
		align    : "center",
		halign	 : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		render   : function (ui) {
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
		title    : "담보평가기준코드", 
		dataType : "string", 
		dataIndx : "mrtgEvlStdrCd",
		align    : "right",
		halign	 : "center",
		hidden	 : true,
		filter   : { crules: [{ condition: 'range' }] },
	}

];

//그리드 호출
function roadMrtgInfoListGrid(){

	arrPqGridMrtgInfoList = $("#TB06017P_mrtgInfoList").pqGrid( 'instance' );
	
	if(typeof arrPqGridMrtgInfoList == "undefined") {
	
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
			strNoRows: '데이터가 없습니다.'
		};
	
		$("#TB06017P_mrtgInfoList").pqGrid(obj);
		arrPqGridMrtgInfoList = $("#TB06017P_mrtgInfoList").pqGrid( 'instance' );
		
	} 
	else {
		
		arrPqGridMrtgInfoList.setData([]);
	}

}

//그리드에 데이터 넣기 (CRUD)
function dataMrtgInfoSetGrid(data){
	
	arrPqGridMrtgInfoList.setData(data);
	arrPqGridMrtgInfoList.option("strNoRows", '조회된 데이터가 없습니다.');
	arrPqGridMrtgInfoList.on("cellDblClick", function (event, ui) 
		{
		 	var rowData = ui.rowData;
		 	setMrtgInfo(rowData);
		});
}

/**
	문서로드시 세팅
 */
function docRdySettings() {
	modalShowFunction();
	keyDownEnter_TB06017P();
}

/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction() {
	$('#modal-TB06017P').on('shown.bs.modal', function() {
		$('#modal-TB06017P input[id=TB06017P_mrtgMngmNo]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06017P() {
	$("input[id=TB06017P_mrtgMngmNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getMrtgInfo();
		}
	});

	$("input[id=TB06017P_mrtgNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getMrtgInfo();
		}
	});
}

/**
 * show modal 
 */
function callTB06017P(prefix) {
	clearTB06017P();

	$('#TB06017P_prefix').val(prefix);
	//console.log("TB06013P_mrtgMngmNo"+$('#TB06013P_mrtgMngmNo').val());
	
	$('#modal-TB06017P').modal('show');
	indexChangeHandler("TB06017P");
	setTimeout(() => roadMrtgInfoListGrid(), 300);
}

/**
 * hide modal
 */
function modalClose_TB06017P() {
	if(typeof fnltPgGrid != "undefined") arrPqGridMrtgInfoList.setData([]);
	$('#modal-TB06017P').modal('hide');
};

/**
 * clear modal
 */
function clearTB06017P() {
	$('#TB06017P_mrtgMngmNo').val("");
	$('#TB06017P_mrtgNm').val("");
}

function getMrtgInfo() {
	
	var paramData = {
		"mrtgMngmNo" : $('#TB06017P_mrtgMngmNo').val()
		, "mrtgNm" : $('#TB06017P_mrtgNm').val()
	}
	
	$.ajax({
		type: "GET",
		url: "/TB06017P/getMrtgInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			
			dataMrtgInfoSetGrid(data);
			
			/*var html = '';
			var mrtgInfoList = data;
			$('#TB06017P_mrtgInfoList').html(html);
			
			if (mrtgInfoList.length > 0) {
				$.each(mrtgInfoList, function(key, value) {
					html += '<tr ondblclick="setMrtgInfo(this);">';
					html += '<td>' + handleNullData(value.mrtgMngmNo) + '</td>';
					html += '<td>' + handleNullData(value.mrtgNm) + '</td>';
					html += '<td>' + handleNullData(value.mrtgStupKndCd) + '</td>';
					html += '<td>' + handleNullData(value.mrtgLclsCd) + '</td>';
					html += '<td>' + handleNullData(value.mrtgMdclCd) + '</td>';
					html += '<td>' + handleNullData(value.mrtgEvlStdrCd) + '</td>';
					html += '<td>' + handleNullData(value.mrtgAmt).toLocaleString("ko-KR") + '</td>';
					html += '<td>' + handleNullData(formatDate(value.rgstDt)) + '</td>';
					html += '<td>' + handleNullData(formatDate(value.mrtgCclcDt)) + '</td>';
					html += '</tr>';
				});
			} else {
				html += '<tr>';
				html += '<td colspan="9" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			
			$('#TB06017P_mrtgInfoList').html(html);*/
		}
	});
}

/**
 * dblclick event function
 */
function setMrtgInfo(e) {
	var tr = $(e);
	var td = $(tr).children();

	// 종목정보
	var mrtgMngmNo		= td.eq(0).text();
	var mrtgNm			= td.eq(1).text();
	var mrtgStupKndCd	= td.eq(2).text();
	var mrtgLclsCd		= td.eq(3).text();
	var mrtgMdclCd		= td.eq(4).text();
	var mrtgAmt			= td.eq(5).text();
	var rgstDt			= td.eq(6).text();
	var mrtgCclcDt		= td.eq(7).text();
	
	// 페이지 항목
	var pageMrtgMngmNo	= '#' + $('#TB06017P_prefix').val() + '_mrtgMngmNo';
	var pageMrtgNm		= '#' + $('#TB06017P_prefix').val() + '_mrtgNm_forSeach';

	// 값 전달
	$(pageMrtgMngmNo).val(e.mrtgMngmNo);
	$(pageMrtgNm).val(e.mrtgNm);
	
	TB06013P_getMrtgInfoDetails();
	modalClose_TB06017P();
}
