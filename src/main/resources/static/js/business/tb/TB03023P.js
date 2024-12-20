let arrPqGridEntpInfo;
$(document).ready(function () {
	keyDownEnter_TB03023P();
	modalShowFunction_TB03023P();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB03023P(prefix) {
	reset_TB03023P();
	$('#modal-TB03023P').modal('show');
	indexChangeHandler("TB03023P");
	$('#TB03023P_prefix').val(prefix);

	setTimeout(() => {
		let setPqGridObj = [
			{
				height    : 300
				, maxHeight : 300
				, id        : 'gridEntpList'
				, colModel  : colEntpInfo
			}
		]
		setPqGrid(setPqGridObj);
		arrPqGridEntpInfo = $("#gridEntpList").pqGrid('instance');
	}, 300);
}

/**
 * 모달 초기화
 */
function reset_TB03023P() {
	$('#TB03023P_entList').html("");
	$('#TB03023P_prefix').val("");
	$('#TB03023P_entpCd').val("");
	$('#TB03023P_entpHnglNm').val("");
	$('#TB03023P_rprsNm').val("");
	$('#TB03023P_corpRgstNo').val("");
}

/**
 * modal hide
 */
function modalClose_TB03023P() {
	// reset_TB03023P();
	$("#gridEntpList").pqGrid("refreshDataAndView");
	$('#modal-TB03023P').modal('hide');
}

/**
 * hide modal
 */
$("#modal-TB03023P").on('hide.bs.modal', function(){
	reset_TB03023P();
	$("#gridEntpList").pqGrid('destroy');

	//$("#gridEntpList").pqGrid('destroy');
  });

function modalShowFunction_TB03023P() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-TB03023P').on('shown.bs.modal', function(){
		$('#modal-TB03023P input[name=TB03023P_entpHnglNm]').focus();
	});
}

/**
 * Enter key Event
 */
function keyDownEnter_TB03023P() {
	$("input[name=TB03023P_entpCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[name=TB03023P_entpHnglNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[id=TB03023P_rprsNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[id=TB03023P_corpRgstNo]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});
}

/**
 * ajax 통신(조회)
 */
function getEntList() {

	var entpCd		= $("#TB03023P_entpCd").val();
	var entpHnglNm	= $("#TB03023P_entpHnglNm").val();
	var rprsNm		= $("#TB03023P_rprsNm").val();
	var bsnsRgstNo	= $("#TB03023P_bsnsRgstNo").val();
	var corpRgstNo	= $("#TB03023P_corpRgstNo").val();

	var dtoParam = {
		  "entpCd": entpCd
		, "entpHnglNm": entpHnglNm
		, "rprsNm": rprsNm
		, "bsnsRgstNo": bsnsRgstNo
		, "corpRgstNo": corpRgstNo
	}

	$.ajax({
		type: "GET",
		url: "/findEntList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			arrPqGridEntpInfo.setData(data);
			arrPqGridEntpInfo.option("rowDblClick", function(event, ui) {
				setEntpCd(ui.rowData); 
			});
		}
	});

}

/**
 * 결과값 table 생성
 */
// function rebuildEntTable(data) {
// 	var html = '';
// 	var entList = data;

// 	if (entList.length <= 0) {
// 		html += '<tr>';
// 		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
// 		html += '</tr>';
// 	} else if (entList.length > 0) {
// 		$.each(entList, function (key, value) {
// 			html += '<tr ondblclick="setEntpCd(this);">';
// 			html += '<td>' + handleNullData(value.entpCd) + '</td>';
// 			html += '<td>' + handleNullData(value.entpHnglNm) + '</td>';
// 			html += '<td>' + handleNullData(value.rprsNm) + '</td>';
// 			html += '<td>' + handleNullData(checkBrnAcno(value.bsnsRgstNo)) + '</td>;'
// 			html += '<td>' + handleNullData(checkBrnAcno(value.corpRgstNo)) + '</td>';
// 			html += '</tr>';
// 		})
// 	}
// 	$('#TB03023P_entList').html(html);

// };


/**
 * 부모창에 결과값 전달
 */
function setEntpCd(e) {

	var entpCd = e.entpCd	// 업체코드
	var entpHnglNm = e.entpHnglNm;	// 업체한글명
	var rprsNm = e.rprsNm;		// 대표자명
	var bsnsRgstNo = e.bsnsRgstNo;	// 사업자등록번호
	var corpRgstNo = e.corpRgstNo;   // 법인등록번호

	var prefix			= $("#TB03023P_prefix").val();	// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	var pageEntpCd		= '#' + prefix + '_entpCd';
	var pageEntpHnglNm	= '#' + prefix + '_entpRnm';
	var pageRprsNm		= '#' + prefix + '_rprsNm';
	var pageBsnsRgstNo	= '#' + prefix + '_bsnsRgstNo';
	var pageCorpRgstNo	= '#' + prefix + '_corpRgstNo';
	$(pageEntpCd).val(entpCd);
	$(pageEntpHnglNm).val(entpHnglNm);
	$(pageRprsNm).val(rprsNm);
	$(pageBsnsRgstNo).val(checkBrnAcno(bsnsRgstNo));
	$(pageCorpRgstNo).val(checkBrnAcno(corpRgstNo));
	if( prefix == 'TB07050S' ){
		$('#TB07050S_corpNo').val(corpRgstNo);			// 법인번호
		$('#TB07050S_optrRgstNo').val(bsnsRgstNo);		// 사업자등록번호
		$('#TB07050S_cfmtEntpNm').val(entpHnglNm);		// 거래상대방(업체한글명)
	}
	
	if( prefix == 'TB07060S' ){
		$('#TB07060S_corpNo').val(corpRgstNo);			// 법인번호
		$('#TB07060S_optrRgstNo').val(bsnsRgstNo);		// 사업자등록번호
		$('#TB07060S_cfmtEntpNm').val(entpHnglNm);		// 거래상대방(업체한글명)
	}

	// if( prefix == 'TB07150S' ){
	// 	//$('#TB07060S_corpNo').val(corpRgstNo);			// 법인번호
	// 	$('#TB07150S_trOthrDscmNo_chng').val(bsnsRgstNo);		// 사업자등록번호
	// 	$('#TB07150S_trOthrDscmNm_chng').val(entpHnglNm);		// 거래상대방(업체한글명)
	// }

	if( prefix == 'TB03030S' ){
		getEntpInfo();
	}
	modalClose_TB03023P();
}

/* ***********************************그리드 컬럼******************************** */

let colEntpInfo = [
	{ 	
		title    : "업체코드", 
		dataType : "string", 
		dataIndx : "entpCd", 
		align    : "center",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "업체명", 
		dataType : "string",
		dataIndx : "entpHnglNm", 
		halign   : "center", 
		align    : "left", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "대표자명", 
		dataType : "string",
		dataIndx : "rprsNm",
		align    : "center",
		hidden   : true,
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "법인등록번호", 
		dataType : "string", 
		dataIndx : "corpRgstNo",
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
		render   : function (ui) {
			let cellData = ui.cellData;
            if (cellData !== null && cellData !== undefined) {
                return checkBrnAcno(cellData); 
            }
            return cellData; 
		}
	},
	{ 	
		title    : "사업자등록번호", 
		dataType : "string",
		dataIndx : "bsnsRgstNo",
		align    : "center",  
		filter   : { crules: [{ condition: 'range' }] },
		render   : function (ui) {
			let cellData = ui.cellData;
            if (cellData !== null && cellData !== undefined) {
                return checkBrnAcno(cellData); 
            }
            return cellData; 
		}
	}
];