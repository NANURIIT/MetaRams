var modalNum ='1';

$(document).ready(function () {
	//부서리스트 호출
	getDprtCdList();
	changeDprtCd();
	
});


//부서리스트
function getDprtCdList(){
	
	$.ajax({
		type: "GET",
		url: "/findDprtList",
		dataType: "json",
		success: function(data) {
			var dprtCdList = data;
			loadSelectBoxDprtList(dprtCdList);
			getRepDsgnUsrNoList();
		}
	});
	
}

function loadSelectBoxDprtList(dprtCdList){
	var html = '';
	$('#AB01011P_dprtCd1').html(html);
	
	if(dprtCdList.length > 0){
		$.each(dprtCdList, function(key, value) {
			html += '<option value="' + value.DPRT_CD + '">' + value.DPRT_NM + '</option>';
		});
		
	}
	
	$('[id^=AB01011P_dprtCd]').html(html);
	
}; 

function changeDprtCd() {
	$('[id^=AB01011P_dprtCd]').on('change', function() {
		var selectedDprtCd = $(this).val(); // 선택된 대분류 코드 가져오기
		loadSelectBoxfindEmpList(empList, selectedDprtCd);
	});
}

///사원리스트
function getRepDsgnUsrNoList(){
	
	var dtoParam = {
			"empNm": ""
			, "eno": ""
			, "dprtCd": ""
			, "dprtNm": ""
			, "hdqtCd": ""
			, "hdqtNm": ""
		}
	
	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			empList = data;
			loadSelectBoxfindEmpList(empList);
		}
	});
	
	
}

function loadSelectBoxfindEmpList(empList, selectedDprtCd){
	var html = '';
	
	if (empList.length > 0) {
		var validEnos = [];
		var selectedDprtCd = $('[id=AB01011P_dprtCd'+modalNum+']').val();	// 첫 로드시 값 설정
		var selectedDprtCdPrefix = selectedDprtCd.slice(0, 3);
		$.each(empList, function(key, value) {
			if (value.DPRT_CD.startsWith(selectedDprtCdPrefix)) {
				validEnos.push(value.DPRT_CD);
				validEnos.push(value.ENO);
				validEnos.push(value.EMP_NM);
			}
		});

		if (validEnos.length > 0) {
			$.each(empList, function(key, value) {
				if (validEnos.includes(value.DPRT_CD)) {
					html += '<option value="' + value.ENO + '">' + value.EMP_NM + '('+value.ENO +')'+'</option>';
				}
			});
		}
	}
	
	$('[id=AB01011P_repDsgnUsrNo'+modalNum+']').html(html);

}; 



//----------------------------모달-----------------------------------------------------------------
// 지정조회자 등록 모달
/**
 * 지정조회자 테이블 초기화
 */
function clearDsgnUsrTable(){
	$('#dsgnUserInfo').html('');
}

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAB01011P1(prefix) {
	modalNum = '1';
	reset_AB01011P1();
	$('#prefix').val(prefix);
	$('#modal-AB01011P1').modal('show');
}


/**
 * 모달 초기화
 */
function reset_AB01011P1(){
	var dprtCd = $('#AB01011P_dprtCd1 option:eq(0)').val();
	$("#AB01011P_dprtCd1 option:eq(0)").prop("selected", true);
	$('#AB01011P_repDsgnUsrNo1 ').prop('selected', true);
	$("input:radio[name='dltF']").prop("checked", false);
	$('.dltFText').hide();
	loadSelectBoxfindEmpList(empList, dprtCd);
}
	
function modalClose_AB01011P1() {
	$('#modal-AB01011P1').modal('hide');
}

function saveUserData(){
	
	var repDsgnUsrNoText =$('#AB01011P_repDsgnUsrNo1 option:selected').text();		//지정사용자번호
	var repDsgnUsrNo =$('#AB01011P_repDsgnUsrNo1').val();							//
	var dprtCdText =$('#AB01011P_dprtCd1 option:selected').text();					//부서명					
	var dprtCd =$('#AB01011P_dprtCd1').val();										//부서코드	
	var dltF=$('input:radio[name=dltF]:checked').val();
	var dltState =  $('input:radio[name=dltF]').is(':checked'); 					//삭제여부 상태
	var tr = $('#dsgnUserInfo').children();
	var num = tr.length+1;
	var dsgnUserlList = new Array();
	
	if(dltState == false){
		$('.dltFText').show();
		return false;
	}
	
	modalClose_AB01011P1();
	
	for( var i = 0 ; i < tr.length ; i++){
		var eno = $(tr[i]).find('td:eq(4)').text(); //사원번호
		dsgnUserlList.push(eno);
	}
	
	if(dsgnUserlList.includes(repDsgnUsrNo)){
		Swal.fire({
			icon: 'info'
			, title: "info"
			, text: "이미 존재합니다."
			, confirmButtonText: "확인"
		});
		return false;
	}
	
	
	var html='';
	html +='<tr class="text-center">';
	html +='	<td>'+ num +'</td>'
	html +='	<td>'+ dprtCdText +'</td>'
	html +='	<td>'+ repDsgnUsrNoText +'</td>'
	html +='	<td>'+ dltF +'</td>'
	html +='	<td style="display:none;">'+ repDsgnUsrNo  +'</td>'
	html +='	<td style="display:none;">'+ dprtCd +'</td>'
	html +='</tr>';

	$('#dsgnUserInfo').append(html);

		
}


//지정 조회 부서 모달
/**
 * 지정조회부서 테이블 초기화
 */
function clearDsgnDprtTable(){
	$('#dsgnDprtInfo').html('');
}
/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAB01011P2(prefix) {
	modalNum = '2';
	reset_AB01011P2();
	$('#prefix').val(prefix);
	$('#modal-AB01011P2').modal('show');
	
}

/**
 * 모달 초기화
 */
function reset_AB01011P2(){
	$("#AB01011P_dprtCd2 option:eq(0)").prop("selected", true);
	$("input:radio[name='dltF']").prop("checked", false);
	$('.dltFText').hide();
}

function modalClose_AB01011P2() {
	$('#modal-AB01011P2').modal('hide');
}

function saveDsgnDeptNo(){
	
	var dprtCdText =$('#AB01011P_dprtCd2 option:selected').text();					//부서명					
	var dprtCd =$('#AB01011P_dprtCd2').val();										//부서번호
	var dltF=$('input:radio[name=dltF]:checked').val();								//삭제여부
	var dltState =  $('input:radio[name=dltF]').is(':checked'); 					//삭제여부 상태
	var tr = $('#dsgnDprtInfo').children();
	var num = tr.length+1; 
	var dsgnDprtlList = new Array();
	
	if(dltState == false){
		$('.dltFText'+'').show();
		return false;
	}
	modalClose_AB01011P2();
	
	for( var i = 0 ; i < tr.length ; i++){
		var dprtCdVal = $(tr[i]).find('td:eq(3)').text(); //부서
		dsgnDprtlList.push(dprtCdVal);
	}
	
	if(dsgnDprtlList.includes(dprtCd)){
		Swal.fire({
			icon: 'info'
			, title: "info"
			, text: "이미 존재합니다."
			, confirmButtonText: "확인"
		});
		return false;
	}
	
	var html='';
	html +='<tr class="text-center">';
	html +='	<td>'+ num +'</td>'
	html +='	<td>'+ dprtCdText +'</td>'
	html +='	<td>'+ dltF +'</td>'
	html +='	<td id="dprtCd" style="display:none;">'+ dprtCd +'</td>'
	html +='</tr>';
	 
	$('#dsgnDprtInfo').append(html);
	
	
}

//관련 CALL 등록 모달
/**
 * 관련 CALL 테이블 초기화
 */
function clearRelCallTable(){
	$('#relCallInfo').html('');
}

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAB01011P3(prefix) {
	modalNum = '3';
	reset_AB01011P3();
	$('#prefix').val(prefix);
	$('#modal-AB01011P3').modal('show');
	
}

/**
 * 모달 초기화
 */
function reset_AB01011P3(){
	var dprtCd = $('#AB01011P_dprtCd3 option:eq(0)').val();
	$('#meetingDt').val("");
	$('#AB01011P_dprtCd3 option:eq(0)').prop('selected', true);
	$('#AB01011P_repDsgnUsrNo3 ').prop('selected', true);
	$('#AB01011P_metTitle').val("");
	$('#AB01011P_entpNm').val("");
	$("input:radio[name='dltF']").prop("checked", false);
	$('#msg').hide();
	loadSelectBoxfindEmpList(empList, dprtCd);
}

function modalClose_AB01011P3() {
	$('#modal-AB01011P3').modal('hide');
}

function saveRelCall(){
	
	var meetingDtTxt =$('#meetingDt').val();									//미팅일자
	var meetingDt= meetingDtTxt.replaceAll('-','');								//미팅일자(-제거)
	var dprtCdTxt = $('#AB01011P_dprtCd3 option:selected').text();				//부서_txt
	var dprtCd = $('#AB01011P_dprtCd3').val();									//부서_val
	var dsgnUsrNoTxt = $('#AB01011P_repDsgnUsrNo3 option:selected').text();		//담당자_txt
	var dsgnUsrNo = $('#AB01011P_repDsgnUsrNo3').val();							//담당자_val
	var metTitle = $('#AB01011P_metTitle').val();								//미팅제목
	var entpNm = $('#AB01011P_entpNm').val();									//업체명
	var dltF = $('input:radio[name=dltF]:checked').val();						//삭제여부
	var dltState =  $('input:radio[name=dltF]').is(':checked'); 				//삭제여부 상태
	var tr = $('#relCallInfo').children();
	var num = tr.length+1;														//순번
	var calllList = new Array();
	
	if(dltState == false ||  !meetingDtTxt  || !metTitle || !entpNm ){
		
		if(!meetingDtTxt){
			$('#meetingDt').focus();
		}else if(!metTitle){
			$('#AB01011P_metTitle').focus();
		}else if(!entpNm){
			$('#AB01011P_entpNm').focus();
		}
		
		$('#msg').show();
		return false;
	}
	
	modalClose_AB01011P3();
	
	for( var i = 0 ; i < tr.length ; i++){
		var eno = $(tr[i]).find('td:eq(9)').text(); //부서
		calllList.push(eno);
	}
	
	if(calllList.includes(dsgnUsrNo)){
		Swal.fire({
			icon: 'info'
			, title: "info"
			, text: "이미 존재합니다."
			, confirmButtonText: "확인"
		});
		return false;
	}
	
	var html='';
	html +='<tr class="text-center">';
	html +='	<td>'+ num +'</td>'
	html +='	<td>'+ meetingDtTxt +'</td>'
	html +='	<td>'+ dprtCdTxt +'</td>'
	html +='	<td>'+ dsgnUsrNoTxt +'</td>'
	html +='	<td>'+ metTitle +'</td>'
	html +='	<td>'+ entpNm +'</td>'
	html +='	<td>'+ dltF +'</td>'
	html +='	<td id="dprtCd" style="display:none;">'+ meetingDt +'</td>'
	html +='	<td id="dprtCd" style="display:none;">'+ dprtCd +'</td>'
	html +='	<td id="dprtCd" style="display:none;">'+ dsgnUsrNo +'</td>'
	html +='</tr>';
	 
	$('#relCallInfo').append(html);
	
}

//관련 DPR 등록 모달
/**
 * 관련 DPR 테이블 초기화
 */
function clearRelDprTable(){
	$('#relDprInfo').html('');
}
