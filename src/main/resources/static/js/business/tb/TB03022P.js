let arrPqGridEmpInfo;
let mmbrSn;
let tb08040sIdx;

$(document).ready(function () {
	keyDownEnter_TB03022P();
	modalShowFunction();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB03022P(prefix, e) {
	reset_TB03022P();
	$('#TB03022P_prefix').val(prefix);
	$('#modal-TB03022P').modal('show');
	indexChangeHandler("TB03022P");
	setTimeout(() => {
		let setPqGridObj = [
			{
				height    : 300
				, maxHeight : 300
				, id        : 'gridEmpList'
				, colModel  : colEmpInfo
			}
		]
		setPqGrid(setPqGridObj);
		arrPqGridEmpInfo = $("#gridEmpList").pqGrid('instance');
	}, 300);
	if (prefix == "TB05010S_mmbrTrgt" || prefix == "TB05010S_mmbrAngt") mmbrSn = e;
	// console.log(mmbrSn);

	if ( prefix === 'grd_TB08040S' ) {
		console.log("grd_TB08040S:::prefix", prefix)
		console.log("grd_TB08040S:::e", e)
		tb08040sIdx = e;
	}
}

/**
 * 모달 초기화
 */
function reset_TB03022P() {
	$('#TB03022P_empList').html("");
	$('#TB03022P_prefix').val("");
	$('#TB03022P_empNm').val("");
	$('#TB03022P_empno').val("");
	$('#TB03022P_dprtCd').val("");
	$('#TB03022P_dprtNm').val("");
}

/**
 * 모달 hide
 */
function modalClose_TB03022P() {
	reset_TB03022P();
	$("#gridEmpList").pqGrid("refreshDataAndView");
	$('#modal-TB03022P').modal('hide');
}
/**
 * hide modal
 */
$("#modal-TB03022P").on('hide.bs.modal', function(){
	reset_TB03022P();
	$("#gridEmpList").pqGrid('destroy');
  });

function modalShowFunction() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-TB03022P').on('shown.bs.modal', function(){
		$('#modal-TB03022P input[id=TB03022P_empNm]').focus();	
	});
}

/**
 * Enter key Event
 */
function keyDownEnter_TB03022P() {

	$("input[id=TB03022P_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=TB03022P_empno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=TB03022P_dprtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=TB03022P_dprtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});
}

/**
 * ajax 통신(조회)
 */
function getEmpList() {

	var empNm = $("#TB03022P_empNm").val();
	var empno = $("#TB03022P_empno").val();
	var dprtCd = $("#TB03022P_dprtCd").val();
	var dprtNm = $("#TB03022P_dprtNm").val();
	
	var dtoParam = {
		"empNm": empNm
		, "empno": empno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			arrPqGridEmpInfo.setData(data);
			arrPqGridEmpInfo.option("rowDblClick", function(event, ui) {
				setEmpNm(ui.rowData); 
			});
		}
	});

}

/**
 * 결과값 table 생성
 */
// function makeEmpList(data) {
// 	var html = '';
// 	var empList = data;

// 	if (empList.length <= 0) {
// 		html += '<tr>';
// 		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
// 		html += '</tr>';
// 	} else if (empList.length > 0) {
// 		$.each(empList, function (key, value) {
// 			html += '<tr ondblclick="setEmpNm(this);">';
// 			html += '<td>' + handleNullData(value.empno) + '</td>';
// 			html += '<td>' + handleNullData(value.empNm) + '</td>';
// 			html += '<td>' + handleNullData(value.dprtCd) + '</td>';
// 			html += '<td>' + handleNullData(value.dprtNm) + '</td>';
// 			html += '<td>' + handleNullData(value.bdCd) + '</td>';
// 			html += '<td>' + handleNullData(value.bdNm) + '</td>';
// 			html += '</tr>';
// 		})
// 	}
// 	$('#TB03022P_empList').html(html);

// };


/**
 * 부모창에 결과값 전달
 */
function setEmpNm(e) {

	var empNo = e.empno;	// 직원번호
	var empNm = e.empNm;	// 직원명
	var dprtCd = e.dprtCd;	// 부점코드
	var dprtNm = e.dprtNm;	// 부점명
	var hdqtCd = e.hdqtCd;	// 본부코드
	var hdqtNm = e.hdqtNm;	// 본부명

	var prefix = $("#TB03022P_prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	var pageEmpNm = '#' + prefix + '_empNm';
	var pageEmpNo = '#' + prefix + '_empNo';
	var pageDprtCd = '#' + prefix + '_dprtCd';
	var pageDprtNm = '#' + prefix + '_dprtNm';
	var pageHdqtCd = '#' + prefix + '_hdqtCd';
	var pageHdqtNm = '#' + prefix + '_hdqtNm';

	$(pageEmpNm).val(empNm);
	$(pageEmpNo).val(empNo);
	$(pageDprtCd).val(dprtCd);
	$(pageDprtNm).val(dprtNm);
	$(pageHdqtCd).val(hdqtCd);
	$(pageHdqtNm).val(hdqtNm);

	// 그리드(위원정보) 데이터 가져오기
	const arrPqGridMmbrInfo = $("#gridMmbrList").pqGrid("option", "dataModel.data");	// 20241122 오류나서 바꿨습니다

	// 공동
	switch ( prefix ) {
		// 공동영업관리자/협업부서
		case "TB03020S":
			let newRow = {
				"dprtCd" : dprtCd,      //부서코드
				"dprtNm" : dprtNm,      //부서명
				"bsnssMngPEno" : empNo, //직원번호
				"empNm" : empNm,        //직원명
				"cntrt" : "",
				"delYn" : "N",
				
			}
			$("#gridEnoPList").pqGrid("addRow", {rowData: newRow,  checkEditable: false });
			break;
		case "TB05010S_mmbrTrgt" :
			// 특정 행의 데이터 수정 
			if (arrPqGridMmbrInfo.length > 0) {
				arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpnm = empNm; // 버튼을 누른 행의 atdcTrgtEmpnm(위원명_화면) 값 변경
				arrPqGridMmbrInfo[mmbrSn].atdcTrgtEmpno = empNo; // 버튼을 누른 행의 atdcTrgtEmpno(위원코드) 값 변경
			}

			// 변경 내용 적용
			$("#gridMmbrList").pqGrid("refreshDataAndView");

			break; 
		case "TB05010S_mmbrAngt" :
			// 특정 행의 데이터 수정 
			if (arrPqGridMmbrInfo.length > 0) {
				arrPqGridMmbrInfo[mmbrSn].atdcAngtEmpnm = empNm; // 버튼을 누른 행의 atdcTrgtEmpnm(대리참석위원_화면) 값 변경
				arrPqGridMmbrInfo[mmbrSn].atdcAngtEmpno = empNo; // 버튼을 누른 행의 atdcTrgtEmpno(대리참석위원_코드) 값 변경
			}

			// 변경 내용 적용
			$("#gridMmbrList").pqGrid("refreshDataAndView");
			break; 
		// 심사신청관리 > 관리점1
		case "TB04012P1":
			$("#TB04012P_dlDprtCd1_dlDprtCd").val(e.dprtCd);
			$("#TB04012P_dlDprtCd1_dlDprtNm").val(e.dprtNm);

			break;
		// 심사신청관리 > 관리점2
		case "TB04012P2":
			$("#TB04012P_dlDprtCd2_dlDprtCd").val(e.dprtCd);
			$("#TB04012P_dlDprtCd2_dlDprtNm").val(e.dprtNm);
			break;
		// 심사신청관리 > 관리점3
		case "TB04012P3":
			$("#TB04012P_dlDprtCd3_dlDprtCd").val(e.dprtCd);
			$("#TB04012P_dlDprtCd3_dlDprtNm").val(e.dprtNm);
			break;

		case "grd_TB08040S":
			console.log(feeSch);
			console.log(dprtCd);
			console.log(feeSch.pdata);

			feeSch.pdata[tb08040sIdx].rgstBdcd = dprtCd;
			feeSch.refresh();
			break;
		default:
			break;
	}


	
	modalClose_TB03022P();
}

/* ***********************************그리드 컬럼******************************** */

let colEmpInfo = [
	{ 	
		title    : "직원번호", 
		dataType : "string", 
		dataIndx : "empno", 
		align    : "center",
		filter   : { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title    : "직원명", 
		dataType : "string",
		dataIndx : "empNm", 
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "부서코드", 
		dataType : "string",
		dataIndx : "dprtCd",
		align    : "center",
		hidden   : true,
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "부서명", 
		dataType : "string", 
		dataIndx : "dprtNm",
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] }
	},
	{ 	
		title    : "소속부점코드", 
		dataType : "string",
		dataIndx : "hdqtCd",
		align    : "center",  
		filter   : { crules: [{ condition: 'range' }] },
	},
	{ 	
		title    : "소속부점명", 
		dataType : "string",
		dataIndx : "hdqtNm",
		align    : "center", 
		filter   : { crules: [{ condition: 'range' }] },
	}
];