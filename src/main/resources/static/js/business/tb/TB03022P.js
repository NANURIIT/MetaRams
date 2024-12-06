let arrPqGridEmpInfo =[];
let mmbrSn;
let tb08040sIdx;
let TB03022P_pf;
let TB03022P_gridState = 1; //0: 열려있음 ,1: 닫혀있음 
let TB03022P_onchangehandler;
let empNoSrchYn;
let dprtCdSrchYn;
let EmpInfoSrchCnt = 0;

/**
 * 팝업 자동 호출, 검색
 * @author {}
 */
function TB03022P_srch() {
	
	// == 직원번호 검색 ==================================================================================================
	//input에 값 입력 시 자동 조회
	$('input[type="text"][id*="_empNo"]:not([readonly])').on('input', async function () {
		const currentInput = $(this);
		const empNmInput = currentInput.closest('.input-group').find('input[id*="_empNm"]');  // 같은 div 내의 empNm input
		empNmInput.val("");  // empNm 초기화
		empNoSrchYn = "Y";
		// 입력값이 7자일 때 조회
		if (currentInput.val().length === 7) {
			await srchEvent(currentInput);
		}
	});

	// 'keydown' 이벤트로 조회 (Enter키)
	$('input[type="text"][id*="_empNo"]:not([readonly])').on('keydown', async function (evt) {
		empNoSrchYn = "Y";
		if (evt.keyCode === 13) {
			evt.preventDefault();
			TB03022P_onchangehandler == "off";
			await srchEvent($(this));
		}
	});

	// 'change' 이벤트로 조회
	$('input[type="text"][id*="_empNo"]:not([readonly])').on('change', async function () {
		empNoSrchYn = "Y";
		//const currentInput = $(this);
		if (TB03022P_onchangehandler === "on") {
			await srchEvent(this);
		}
	});

	//== 부서번호 검색 ==================================================================================================

	$('input[type="text"][id*="_dprtCd"]:not([readonly])').on('input', async function () {
		const currentInput = $(this);
		const dprtNmnput = currentInput.closest('.input-group').find('input[id*="_dprtNm"]');  // 같은 div 내의 empNm input
		dprtNmnput.val("");  // prdtNm 초기화
		dprtCdSrchYn = "Y";
		// 입력값이 5자일 때 조회
		if (currentInput.val().length === 5) {
			await srchEvent(currentInput);
		}
	});

	// 'keydown' 이벤트로 조회 (Enter키)
	$('input[type="text"][id*="_dprtCd"]:not([readonly])').on('keydown', async function (evt) {
		dprtCdSrchYn = "Y";
		if (evt.keyCode === 13) {
			evt.preventDefault();
			TB03022P_onchangehandler == "off";
			await srchEvent($(this));
		}
	});

	// 'change' 이벤트로 조회
	$('input[type="text"][id*="_dprtCd"]:not([readonly])').on('change', async function () {
		dprtCdSrchYn = "Y";
		//const currentInput = $(this);
		if (TB03022P_onchangehandler === "on") {
			await srchEvent(this);
		}
	});

	// ===============================================================================================================

	// 공통 검색 이벤트
	async function srchEvent(selector) {
		let prefix;
		const inputId = $(selector).attr('id');
		console.log(`inputId : ${inputId}`)
		// 입력된 id에 따라 prefix 결정
		prefix = inputId.split('_')[0];// _기준으로 prefix 추출
		let data = $(selector).val();
		$('#TB03022P_prefix').val(prefix);

		$(`input[id='${prefix}_empNm']`).val("");   // empNm 초기화	
		$(`input[id='${prefix}_dprtNm']`).val("");  // dprtNm 초기화

		/**
		 * 팝업 밖의 회색부분을 클릭하여 꺼진경우 modalClose 함수가 작동하지 않아 그리드 상태 업데이트가 안됨
		 * 그리드 상태 다시 체크해주기
		 */
		if ($(`div[id='modal-TB03022P']`).css('display') === "none") {
			// console.log("혹시 니가 닫았니?");
			TB03022P_gridState = 1;
		}

		if(empNoSrchYn === "Y"){
			$('#TB03022P_empno').val(data);
			console.log(`empNoSrchYn data : ${data}`)
		}
		
		if(dprtCdSrchYn === "Y"){
			$('#TB03022P_dprtCd').val(data);
			console.log(`empNoSrchYn data : ${data}`)
		}
		
		

		// empNoSrchYn  === "Y" ? $('#TB03022P_empno').val(data) : null;
		// dprtCdSrchYn === "Y" ? $('#TB03022P_dprtCd').val(data) : null;

		// 그리드 상태 체크 후 팝업 호출
		await getGridState22();
		console.log(`TB03022P_gridState : ${TB03022P_gridState}`)

		// 팝업 오픈
		if (TB03022P_gridState === 0) {
			console.log("열려있음", TB03022P_gridState);
			callGridTB03022P(prefix);
			empNoSrchYn  === "Y" ? $('#TB03022P_empno').val(data) : $('#TB03022P_empno').val("");
			dprtCdSrchYn === "Y" ? $('#TB03022P_dprtCd').val(data) : $('#TB03022P_dprtCd').val("");
			setTimeout(() => getEmpList(), 400);
		} else if (TB03022P_gridState === 1) {
			console.log("닫혀있음", TB03022P_gridState);
			callTB03022P(prefix);
			empNoSrchYn  === "Y" ? $('#TB03022P_empno').val(data) : $('#TB03022P_empno').val("");
			dprtCdSrchYn === "Y" ? $('#TB03022P_dprtCd').val(data) : $('#TB03022P_dprtCd').val("");
			console.log(`dprtCdSrchYn1111111: ${dprtCdSrchYn}`)
			setTimeout(() => getEmpList(), 400);
		}

		empNoSrchYn  = "N";
		dprtCdSrchYn = "N";
	}
}

function getGridState22(){

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

	if (TB03022P_gridState === 0) {
		return;
	}

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			if (!data || data === undefined || data.length === 0) {
				// console.log("1번조건");
				TB03022P_gridState = 1;
			} else if (data.length >= 2) {
				// console.log("2번조건");
				TB03022P_gridState = 1;
			} else if (data) {
				// console.log("3번조건");
				TB03022P_gridState = 0;
			}
		}
	});

}

function callGridTB03022P(prefix) {
	reset_TB03022P();
	$('#TB06011P_prefix').val(prefix);
	setTimeout(() => roadListGrid(), 100);
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

	if(prefix === 'TB03021P1'){
		TB03021P1_empNo = $('#TB03021P1_empNo').val();
	}
}
/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
// function callTB03022P(prefix, e) {
// 	reset_TB03022P();
// 	TB03022P_gridState = 0;
// 	TB03022P_pf = prefix;
// 	$('#TB03022P_prefix').val(prefix);
// 	$('#modal-TB03022P').modal('show');

// 	indexChangeHandler("TB03022P");
// 	setTimeout(() => {
// 		let setPqGridObj = [
// 			{
// 				height    : 300
// 				, maxHeight : 300
// 				, id        : 'gridEmpList'
// 				, colModel  : colEmpInfo
// 			}
// 		]
// 		setPqGrid(setPqGridObj);
// 		arrPqGridEmpInfo = $("#gridEmpList").pqGrid('instance');
// 	}, 300);
// 	if (prefix == "TB05010S_mmbrTrgt" || prefix == "TB05010S_mmbrAngt") mmbrSn = e;
// 	// console.log(mmbrSn);

// 	if ( prefix === 'grd_TB08040S' ) {
// 		console.log("grd_TB08040S:::prefix", prefix)
// 		console.log("grd_TB08040S:::e", e)
// 		tb08040sIdx = e;
// 	}

// 	if(prefix === 'TB03021P1'){
// 		TB03021P1_empNo = $('#TB03021P1_empNo').val();
// 	}
// }

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
			
			if(EmpInfoSrchCnt >= 2){
				alert("조회된 정보가 없습니다!")
				EmpInfoSrchCnt = 0;
				return;
			}
			//console.log(`data ${JSON.stringify(data)}`);
			dataEmpSetGrid(data);
			
		}
	});

}

function dataEmpSetGrid(data){
	arrPqGridEmpInfo.setData(data);
	arrPqGridEmpInfo.option("rowDblClick", function(event, ui) {
		setEmpNm(ui.rowData); 
	});
	
	console.log(`arrPqGridEmpInfo.pdata.length : ${arrPqGridEmpInfo.pdata.length}`)
	// 검색된 행이 1개일 경우 데이터 바로 입력
	if (arrPqGridEmpInfo.pdata.length === 1 && $(`div[id='modal-TB03022P']`).css('display') === "none") {
		console.log("여기로와야해");
		setEmpNm(arrPqGridEmpInfo.pdata[0]);
		//console.log(arrPqGridEmpInfo.pdata[0])
		EmpInfoSrchCnt = 0;
		// 입력되고 난 후 온체인지 이벤트 on
		TB03022P_onchangehandler = "on"
	}
	// 검색된 행이 0일 경우 모든 데이터 출력
	else if (arrPqGridEmpInfo.pdata.length === 0) {
		console.log("딴길로 새지마라");
		// 데이터 없는 경우 재조회 방지
		EmpInfoSrchCnt += 1;
		//reset_TB03022P();
		getEmpList();
	}
	// 그렇지 않은 경우 조건에 맞는 데이터 출력
	else {
		// console.log("해쥐맬라고우~");
		EmpInfoSrchCnt = 0;
		//부서 검색인 경우
		// console.log('dprtCdSrchYn :' , dprtCdSrchYn)
		// if (dprtCdSrchYn === "Y") {
		// 	console.log('arrPqGridEmpInfo.pdata[0].dprtCd:', arrPqGridEmpInfo.pdata[0].dprtCd);
		
		// 	const pdata = arrPqGridEmpInfo.pdata; // pdata 변수에 배열 참조
		// 	if (pdata && pdata.length > 0) {
		// 		const firstDprtCd = pdata[0].dprtCd; // 첫 번째 dprtCd 값
		// 		if (pdata.every(item => item.dprtCd === firstDprtCd)) {
		// 			setEmpNm(arrPqGridEmpInfo.pdata[0]);
		// 		} else {
		// 			//setTimeout(() => $('#modal-TB03022P').modal('show'), 400);
		// 		}
		// 	} 
		// }
		 
		// empNoSrchYn  = "N";
		// dprtCdSrchYn = "N";
		 //else{
		// 	$('#modal-TB03022P').modal('show');
		// }
	}
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

	console.log('test :::: ', pageDprtCd)

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
		case "TB03021P1":
			if(TB03021P1_empNo != empNo ){
				$('#TB03021P2_dprtNm').val(""); 
    			$('#TB03021P2_dprtCd').val("");
			}
			break;
		// case "TB03021P2":
		// 	$("#TB03021P1_empNm").val("");
		// 	$("#TB03021P1_empNo").val("");
		// 	break;
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