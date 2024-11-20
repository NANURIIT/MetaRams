let modalPqGridBzepList;
let rowInx;


$(document).ready(function() {
	keyDownEnter_TB03061P();
	modalShowFunction_TB03061P();
	getSlctBox_cd();


	//숫자만 입력 가능
	var replacePN = /[^0-9]/g;
	
	$(".inputNum").on("focusout", function() {
		let i = $(this).val();
		if (i.length > 0) {
			if (i.match(replacePN)) {
				i = i.replace(replacePN, "");
			}
			$(this).val(i);
		}
	}).on("keyup", function() {
		$(this).val($(this).val().replace(replacePN, ""));
	});
});

/**
 * 모달 팝업 show - 기업체 목록
 */
function callTB03061P(prefix, e) {
	keyDownEnter_TB03061P();
	$('#TB03061P_prefix').val(prefix);
	$('#modal-TB03061P').modal('show');
	indexChangeHandler("TB03061P");

	setTimeout(() => {
		/** 첨부파일그리드 **/
		let arrModalPqGridObj = [
			{
			height    : 500
			, maxHeight : 500
			, id        : 'gridBzepList'
			, colModel  : colModalBzepList
			}
		]
		setPqGrid(arrModalPqGridObj);
		modalPqGridBzepList = $("#gridBzepList").pqGrid('instance');
	}, 300);
	if (prefix == "TB06010S" || prefix == "grid_TB06010S") rowInx = e;
}



/**
 * Enter key Event
 */
function keyDownEnter_TB03061P() {

	$("input[id=TB03061P_entpNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
	$("input[id=TB03061P_ardyBzepNo]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
	$("input[id=TB03061P_rnbn]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
	$("input[id=TB03061P_crno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
	$("input[id=TB03061P_csno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
	$("input[id=TB03061P_useYn]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getArdyBzepInfoList();
		}
	});
}

/**
 * 모달 초기화
 */
function reset_TB03061P() {
	$('#TB03061P_prefix').val("");
	$('#TB03061P_entpNm').val("");
	$('#TB03061P_ardyBzepNo').val("");
	$('#TB03061P_rnbn').val("");
	$('#TB03061P_crno').val("");
	$('#TB03061P_csno').val("");
	$('#TB03061P_useYn').val("A");
}

/**
 * 모달 hide
 */
function modalClose_TB03061P() {
	$("#gridBzepList").pqGrid('refreshDataAndView');
	reset_TB03061P();
	$('#modal-TB03061P').modal('hide');
}

/**
 * hide modal
 */
$("#modal-TB03061P").on('hide.bs.modal', function(){
	$("#gridBzepList").pqGrid('destroy');
	reset_TB03061P();
});

function modalShowFunction_TB03061P() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-TB03061P').on('shown.bs.modal', function(){
		$('#modal-TB03061P input[id=TB03061P_entpNm').focus();	
	});
}

/**
 * close modal
 */
/*function modalClose_TB03061P() {
	$('#modal-TB03061P').modal('hide');
};*/

/**
 * 기업체목록 조회
 */
function getArdyBzepInfoList() {

	var inputParam = {
		"entpNm" : $('#TB03061P_entpNm').val()			// 기업체명
		, "ardyBzepNo" : $('#TB03061P_ardyBzepNo').val()	// 기업체코드
		, "rnbn" : $('#TB03061P_rnbn').val()				// 사업자등록번호
		, "crno" : $('#TB03061P_crno').val()				// 법인등록번호
		, "csno" : $('#TB03061P_csno').val()				// 고객번호
		, "useYn" : $('#TB03061P_useYn').val()				// 사용여부
	}

	//기업체목록 조회			
	$.ajax({
		type: "GET",
		url: "/TB06019P/getArdyBzepInfoList",
		data: inputParam,
		dataType: "json",
		success: function(data) {
			modalPqGridBzepList.setData(data);
			modalPqGridBzepList.option("rowDblClick", function(event, ui) {
				setArdyBzepInfo(ui.rowData); 
			});
		},

	});
}

//selectBox 데이터 가져오기
function getSlctBox_cd(){

	$.ajax({
		type: "GET",
		url: "/TB06019P/getArdyBzepCd",
		dataType: "json",
		success: function(data) {
			//사용여부 select box 초기화
			$('#TB03061P_useYn').empty();
			
			$.each(data, function (key, value) {				
				
				if(value.cmnsCdGrp == "U005"){
					$('#TB03061P_useYn').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');

					// if(value.cdVlNm == "전체"){
					// 	useYn = value.cdVlId;
					// }else if(value.cdVlNm == "사용"){
					// 	useYn = value.cdVlId;
					// }else if(value.cdVlNm == "미사용"){
					// 	useYn = value.cdVlId;
					// }
				}

			});
						
		} 
	});
}

/**
 * 부모창에 결과값 전달
 */
function setArdyBzepInfo(rowData) {

	let ardyBzepNo = rowData.ardyBzepNo;
	let entpNm = rowData.entpNm;
	let crno = rowData.crno;
	let rnbn = rowData.rnbn;
	let stdIdstSclsCd = rowData.stdIdstSclsCd;
	let useYn = rowData.useYn;
	let rgstDt = rowData.rgstDt;
	let clseDvsnCd = rowData.clseDvsnCd;
	let clseDt = rowData.clseDt;
	
	let prefix = $("#TB03061P_prefix").val(); 			// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	
	// 페이지 항목
	let pageArdyBzepNo 		= '#' + $('#TB03061P_prefix').val() + '_ardyBzepNo';	// 업체번호
	let pageentpNm 		= '#' + $('#TB03061P_prefix').val() + '_entpNm';		// 업체명
	let pageCrno 			= '#' + $('#TB03061P_prefix').val() + '_crno';			// 법인등록번호
	let pageRnbn 			= '#' + $('#TB03061P_prefix').val() + '_rnbn';			// 사업자등록번호
	let pageStdIdstSclsCd 	= '#' + $('#TB03061P_prefix').val() + '_stdIdstSclsCd';	// 표준산업소분류
	let pageuseYn 			= '#' + $('#TB03061P_prefix').val() + '_useYn';			// 사용여부
	let pagergstDt 			= '#' + $('#TB03061P_prefix').val() + '_rgstDt';		// 등록일자
	let pageClseDvsnCd 		= '#' + $('#TB03061P_prefix').val() + '_clseDvsnCd';	// 폐업구분
	let pageClseDt 			= '#' + $('#TB03061P_prefix').val() + '_clseDt';		// 폐업일자
	

	// 값 전달
	$(pageArdyBzepNo).val(ardyBzepNo);
	$(pageentpNm).val(entpNm);
	$(pageCrno).val(crno);
	$(pageRnbn).val(rnbn);
	$(pageStdIdstSclsCd).val(stdIdstSclsCd);
	$(pageuseYn).val(useYn);
	$(pagergstDt).val(rgstDt);
	$(pageClseDvsnCd).val(clseDvsnCd);
	$(pageClseDt).val(clseDt);
	
	$('#TB03060S_ardyBzepNo').val(ardyBzepNo);			// 기업체코드
	
	switch ( prefix ) {
		case "grid_TB06010S" :
			$("#TB06010S_itrRelrInfo").pqGrid("instance").pdata[rowInx].trOthrDscmNo = ardyBzepNo;
			$("#TB06010S_itrRelrInfo").pqGrid("instance").pdata[rowInx].trOthrNm = entpNm;
			$("#TB06010S_itrRelrInfo").pqGrid("instance").refresh();
			break; 
		case "TB03020S" : 
			$("#TB03020S_corpRgstNo").val(ardyBzepNo);
			$("#TB03020S_entpRnm").val(entpNm);
			break; 
		case "TB03030S" :
			$("#TB03030S_entpRnm").val(entpNm);
			$("#TB03030S_entpCd").val(ardyBzepNo);
			break; 
		case "TB03031P" :
			$("#TB03031P_rm_entpRnm").val(entpNm);
			$("#TB03031P_rm_entpCd").val(ardyBzepNo);
			$("#TB03031P_rm_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB03031P_rm_bsnsRgstNo").val(checkBrnAcno(rnbn));
			break; 
		case "TB03020S_c" :
			$("#TB03020S_c_corpRgstNo").val(ardyBzepNo);
			$("#TB03020S_c_entpRnm").val(entpNm);
			break; 
		case "TB04010S" :
			$("#TB04010S_entpCd").val(ardyBzepNo);
			$("#TB04010S_corpRgstNo").val(crno);
			$("#TB04010S_bsnsRgstNo").val(rnbn);
			$("#TB04010S_entpRnm").val(entpNm);
			break; 
		case "TB04010S_2" : // 법인탭
			$("#TB04010S_bsc_entpCd").val(ardyBzepNo);
			$("#TB04010S_bsc_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB04010S_bsc_bsnsRgstNo").val(checkBrnAcno(rnbn));
			$("#TB04010S_bsc_entpRnm").val(entpNm);
			break; 
		case "TB04010S_3" : // 거래상대방탭
			$("#TB04010S_cnc_entpCd").val(ardyBzepNo);
			$("#TB04010S_cnc_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB04010S_cnc_bsnsRgstNo").val(checkBrnAcno(rnbn));
			$("#TB04010S_cnc_entpRnm").val(entpNm);
			break; 
		case "TB04010S_4" : // 내부등급탭
			$("#TB04010S_ins_entpCd").val(ardyBzepNo);
			$("#TB04010S_ins_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB04010S_ins_bsnsRgstNo").val(rnbn);
			$("#TB04010S_ins_rprsNm").val(entpNm);
			break; 
		case "TB04010S_5" : // 보증 기관명
			$("#TB04010S_ensr_entpCd").val(ardyBzepNo);
			$("#TB04010S_ensr_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB04010S_ensr_bsnsRgstNo").val(rnbn);
			$("#TB04010S_ensr_entpRnm").val(entpNm);
			break;
		case "TB04010S_6" : // 책임준공 기관명
			$("#TB04010S_rspsb_entpCd").val(ardyBzepNo);
			$("#TB04010S_rspsb_corpRgstNo").val(checkBrnAcno(crno));
			$("#TB04010S_rspsb_bsnsRgstNo").val(rnbn);
			$("#TB04010S_rspsb_entpRnm").val(entpNm);
			break; 
		case "TB06013P" : 
			$("#TB06013P_bsnsRgstNo").val(ardyBzepNo);
			$("#TB06013P_entpRnm").val(entpNm);
			break; 
		case "TB06010S_bsc" : 
			$("#TB06010S_bsc_entpCd").val(ardyBzepNo);
			// 없음.. $("#TB06010S_bsc_rprsNm").val(ardyBzepNo);
			$("#TB06010S_bsc_corpRgstNo").val(crno);
			$("#TB06010S_bsc_entpRnm").val(entpNm);
			$("#TB06010S_bsc_bsnsRgstNo").val(rnbn);
			break;
		case "TB07150S" :
			$('#TB07150S_trOthrDscmNo_chng').val(ardyBzepNo);		// 사업자등록번호
			$('#TB07150S_trOthrDscmNm_chng').val(entpNm);			// 거래상대방(업체한글명)

			break;
		default:
			break;
	}
	modalClose_TB03061P();
}
/** ************************************그리드 컬럼********************************** **/

let colModalBzepList = [
	{ 	
		title    : "기업체코드", 
		dataType : "string",
		dataIndx : "ardyBzepNo", 
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "업체명", 
		dataType : "string", 
		dataIndx : "entpNm",
		halign   : "center",
		align    : "left", 
		filter   : { crules: [{ condition: 'range' }] }
	},
	{ 	
		title    : "법인등록번호", 
		dataType : "string",
		dataIndx : "crno",
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
		dataIndx : "rnbn", 
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
		title    : "표준산업소분류", 
		dataType : "string",
		dataIndx : "stdIdstSclsCd",
		align    : "center",  
		hidden   : true,
		filter   : { crules: [{ condition: 'range' }] }
	},
	{ 	
		title    : "사용여부", 
		dataType : "string",
		dataIndx : "useYn",
		align    : "center" ,  
		filter   : { crules: [{ condition: 'range' }] }
	},
	{ 	
		title    : "등록일자", 
		dataType : "date",
		dataIndx : "rgstDt",
		align    : "center" ,  
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
		title    : "폐업구분", 
		dataType : "string",
		dataIndx : "clseDvsnCd",
		align    : "center" ,  
		filter   : { crules: [{ condition: 'range' }] }
	},
	{ 	
		title    : "폐업일자", 
		dataType : "date",
		dataIndx : "clseDt",
		align    : "center" ,  
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
];