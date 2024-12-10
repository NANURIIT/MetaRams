let arrPqGridEmpInfo =[];
let mmbrSn;
let tb08040sIdx;
let TB03022P_pf;
let TB03022P_gridState = 1; 
let TB03022P_onchangehandler;
let empNoSrchYn;  //직원번호검색여부
let empNmSrchYn;  //직원명검색여부
let dprtCdSrchYn; //부서번호검색여부
let empInfoSrchCnt = 0;
//let findEmpList_dprtCd;

/**
 * 팝업 자동 호출, 검색
 * @author {}
 */
function TB03022P_srch(menuId) {
	let selector = $(`div[data-menuid="${menuId}"] span.input-group-append > button[onclick*="callTB03022P"]:not([disabled])`)
	
	// if(TB03021P_CallTB0302P === "Y"){
	// 	selector.closest('div[data-menuid]').remove();
	// }

	// == 직원번호 검색 ==================================================================================================
	//input에 값 입력 시 자동 조회
	selector.closest('span.input-group-append').prev("input[id*='_empNo']").on('input', async function () {
		const currentInput = $(this);
		const empNmInput = currentInput.closest('.input-group').find('input[id*="_empNm"]');  // 같은 div 내의 empNm input
		empNmInput.val("");  // empNm 초기화
		
		// 입력값이 7자일 때 조회
		if (currentInput.val().length === 7) {
			empNoSrchYn = "Y";
			await srchEmpEvent(currentInput);
		}
	});

	// 'keydown' 이벤트로 조회 (Enter키)
	selector.closest('span.input-group-append').prev("input[id*='_empNo']").on('keydown', async function (evt) {
		
		console.log('_empNo enter')
		if (evt.keyCode === 13) {
			empNoSrchYn = "Y";
			evt.preventDefault();
			TB03022P_onchangehandler == "off";
			await srchEmpEvent($(this));
		}
	});

	// 'change' 이벤트로 조회
	selector.closest('span.input-group-append').prev("input[id*='_empNo']").on('change', async function (evt) {
		
		//const currentInput = $(this);
		if (TB03022P_onchangehandler === "on") {
			empNoSrchYn = "Y";
			await srchEmpEvent(this);
		}
	});

	// == 직원명 검색 ==================================================================================================
	//input에 값 입력 시 자동 조회
	selector.closest('span.input-group-append').prev("input[id*='_empNm']").on('input', async function () {
		const currentInput = $(this);
		const empNmInput = currentInput.closest('.input-group').find('input[id*="_empNo"]');  // 같은 div 내의 empNm input
		empNmInput.val("");  // empNm 초기화
		
		// 입력값이 7자일 때 조회
		if (currentInput.val().length === 7) {
			empNmSrchYn = "Y";
			await srchEmpEvent(currentInput);
		}
	});

	// 'keydown' 이벤트로 조회 (Enter키)
	selector.closest('span.input-group-append').prev("input[id*='_empNm']").on('keydown', async function (evt) {
		
		if (evt.keyCode === 13) {
			empNmSrchYn = "Y";
			evt.preventDefault();
			TB03022P_onchangehandler == "off";
			await srchEmpEvent($(this));
		}
	});

	//== 부서번호 검색 ==================================================================================================
	
	selector.closest('span.input-group-append').prev("input[id*='_dprtCd']").on('input', async function () {
		const currentInput = $(this);
		const dprtNmnput = currentInput.closest('.input-group').find('input[id*="_dprtNm"]');  // 같은 div 내의 empNm input
		dprtNmnput.val("");  // prdtNm 초기화
		
		// 입력값이 5자일 때 조회
		if (currentInput.val().length === 3) {
			dprtCdSrchYn = "Y";
			await srchEmpEvent(currentInput);
		}
	});

	// 'keydown' 이벤트로 조회 (Enter키)
	selector.closest('span.input-group-append').prev("input[id*='_dprtCd']").on('keydown', async function (evt) {
		
		if (evt.keyCode === 13) {
			dprtCdSrchYn = "Y";
			evt.preventDefault();
			TB03022P_onchangehandler == "off";
			await srchEmpEvent($(this));
		}
	});

	// 'change' 이벤트로 조회
	selector.closest('span.input-group-append').prev("input[id*='_empNo']").on('change', async function (evt) {
		
		//const currentInput = $(this);
		if (TB03022P_onchangehandler === "on") {
			dprtCdSrchYn = "Y";
			await srchEmpEvent(this);
		}
	});

	// ===============================================================================================================

	// 공통 검색 이벤트
	async function srchEmpEvent(selector) {
		let prefix;
		const inputId = $(selector).attr('id');
	
		// 입력된 id에 따라 prefix 결정
		const lastIndex = inputId.lastIndexOf('_'); // 마지막 '_'의 위치 찾기
		prefix = inputId.substring(0, lastIndex); // 0부터 마지막 '_' 전까지 자르기
		console.log(`prefix : ${prefix}`)
		let data = $(selector).val();
	
		// TB03022P_prefix 값 설정
		$('#TB03022P_prefix').val(prefix);
	
		// 팝업이 닫힌 경우 그리드 상태 업데이트
		if ($(`div[id='modal-TB03022P']`).css('display') === "none") {
			TB03022P_gridState = 1;
		}
	
		// 각 조건에 따른 입력 값 초기화 및 데이터 설정
		if (empNoSrchYn === "Y") {
			clearInput(`${prefix}_empNm`);
			$('#TB03022P_empno').val(data);
		}
	
		if (empNmSrchYn === "Y") {
			clearInput(`${prefix}_empNo`);
			$('#TB03022P_empNm').val(data);
		}
	
		if (dprtCdSrchYn === "Y") {
			clearInput(`${prefix}_dprtNm`);
			$('#TB03022P_dprtCd').val(data);
		}
	
		// 그리드 상태 체크 후 팝업 호출
		await getEmpGridState();
	
		// 그리드 상태에 따라 팝업 호출 및 데이터 설정
		if (TB03022P_gridState === 0) {
			callGridTB03022P(prefix);
		} else if (TB03022P_gridState === 1) {
			callTB03022P(prefix);
		}
	
		// 입력 데이터 세팅
		$('#TB03022P_empno').val(empNoSrchYn === "Y" ? data : "");
		$('#TB03022P_empNm').val(empNmSrchYn === "Y" ? data : "");
		$('#TB03022P_dprtCd').val(dprtCdSrchYn === "Y" ? data : "");
	
		// 그리드 목록 가져오기 (400ms 지연)
		setTimeout(() => getEmpList(), 400);
	
		// 상태 초기화
		empNoSrchYn = "N";
		empNmSrchYn = "N";
		dprtCdSrchYn = "N";
	}
	
	/**
	 * 입력 필드 초기화
	 * @param {string} inputId - 초기화할 input 필드의 id
	 */
	function clearInput(inputId) {
		$(`input[id='${inputId}']`).val("");
	}
}


async function getEmpGridState(){

	var empNm = $("#TB03022P_empNm").val();
	var empno = $("#TB03022P_empno").val();
	var dprtCd = $("#TB03022P_dprtCd").val();
	var dprtNm = $("#TB03022P_dprtNm").val();
	console.log("dtoParam : ", dtoParam)
	var dtoParam = {
		"empNm": empNm
		, "empno": empno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	if (TB03022P_gridState === 0) {
		return;
	}

	await $.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			if (!data || data === undefined || data.length === 0) {
				//console.log("1번조건");
				TB03022P_gridState = 1;
			} else if (data.length >= 2) {
				//console.log("2번조건");
				TB03022P_gridState = 1;

				//부서검색인 경우
                // if(dprtCdSrchYn == "Y"){
                //     const firstDprtCd = data[0].dprtCd; // 첫 번째 dprtCd 값
				// 	if (data.every(item => item.dprtCd === firstDprtCd)) {
				// 		TB03022P_gridState = 0; 
				// 		findEmpList_dprtCd = "Y";
                //     }
                   
                // }
			} else if (data) {
				//console.log("3번조건");
				TB03022P_gridState = 0;
			}
		}
	});

}

function callGridTB03022P(prefix) {
	$('#TB03022P_empNm').val("");
	$('#TB03022P_empno').val("");
	$('#TB03022P_dprtCd').val("");
	$('#TB03022P_dprtNm').val("");

	$('#TB03022P_prefix').val(prefix);
	setTimeout(() => roadListGrid(), 300);
}

function roadListGrid() {
    // pqGrid 인스턴스 초기화 확인
    arrPqGridEmpInfo = $("#gridEmpList").pqGrid('instance');

    // arrPqGridEmpInfo가 undefined일 경우 초기화
    if (typeof arrPqGridEmpInfo === "undefined" || arrPqGridEmpInfo === null) {
        let setPqGridObj = [
            {
                height    : 300,
                maxHeight : 300,
                id        : 'gridEmpList',
                colModel  : colEmpInfo
            }
        ];
        
        // pqGrid 초기화
        //$("#gridEmpList").pqGrid(setPqGridObj);
        setPqGrid(setPqGridObj);
        // 초기화된 인스턴스를 다시 할당
        arrPqGridEmpInfo = $("#gridEmpList").pqGrid('instance');
    } else {
        // 이미 초기화된 경우, 데이터 설정
        arrPqGridEmpInfo.setData([]);
    }
}


$(document).ready(function () {
	keyDownEnter_TB03022P();
	modalShowFunction();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB03022P(prefix){
	reset_TB03022P();
	TB03022P_gridState = 0;
	TB03022P_pf = prefix;
	setTimeout(() => roadListGrid(), 300);
	$('#TB03022P_prefix').val(prefix);
	$('#modal-TB03022P').modal('show');
	indexChangeHandler("TB03022P");

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
	TB03022P_gridState = 1;
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
			
			if(empInfoSrchCnt >= 2){
				//alert("조회된 정보가 없습니다!")
				empInfoSrchCnt = 0;
				return;
			}
			dataEmpSetGrid(data);
			
		}
	});

}

function dataEmpSetGrid(data){
	arrPqGridEmpInfo.setData(data);
	arrPqGridEmpInfo.option("rowDblClick", function(event, ui) {
		setEmpNm(ui.rowData); 
	});
	
	// 검색된 행이 1개일 경우 데이터 바로 입력
	if (arrPqGridEmpInfo.pdata.length === 1 && $(`div[id='modal-TB03022P']`).css('display') === "none") {
		//console.log("여기로와야해");
		var prefix = $("#TB03022P_prefix").val();
		setEmpNm(arrPqGridEmpInfo.pdata[0]);
		//console.log(arrPqGridEmpInfo.pdata[0])
		empInfoSrchCnt = 0;
		// 입력되고 난 후 온체인지 이벤트 on
		TB03022P_onchangehandler = "on"
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	else if (arrPqGridEmpInfo.pdata.length === 0) {
		//console.log("딴길로 새지마라");
		// 데이터 없는 경우 재조회 방지
		empInfoSrchCnt += 1;
		//reset_TB03022P();
		getEmpList();
	}
	// 그렇지 않은 경우 조건에 맞는 데이터 출력
	else {
		// console.log("해쥐맬라고우~");
		empInfoSrchCnt = 0;	
		// if(findEmpList_dprtCd == "Y"){
		// 	setEmpNm(arrPqGridEmpInfo.pdata[0]);
		// }	
	}

	//empNoSrchYn  = "N";
	//empNmSrchYn  = "N";
	//dprtCdSrchYn = "N";
}

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
		case "TB06011P":
			$("#TB06011P_dprtNm").val(e.dprtCd).prop("selected", true);
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