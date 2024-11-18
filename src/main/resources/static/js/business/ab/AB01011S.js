let scrtArtcF = 'N';

$(document).ready(function() {
	
	loadClickChangeButton();
	keyUpEnterEntpNm();
	setRepNo();
	getFileInfo();
	loadInvstGdsLdvdCd();
	changeInvstGdsLdvdCd();
	
});

/**
 * 탭에 따라 버튼 변화
 */
function loadClickChangeButton(){
	$('#DsgnTab1').click(function(){
		$("#dsgnUsrBtn").show();
		$("#clearDsgnUsr").show();
		$("#dsgnDprtBtn").hide();
		$("#clearDsgnDprt").hide();
	});
	
	$('#DsgnTab2').click(function(){
		$("#dsgnDprtBtn").show();
		$("#clearDsgnDprt").show();
		$("#dsgnUsrBtn").hide();
		$("#clearDsgnUsr").hide();
	});
	
	$('#CALLTab').click(function(){
		$("#relCALLBtn").show();
		$("#clearRelCall").show();
		$("#relDPRBtn").hide();
		$("#clearRelDpr").hide();
	});
	
	$('#DPRTab').click(function(){
		$("#relDPRBtn").show();
		$("#clearRelDpr").show();
		$("#relCALLBtn").hide();
		$("#clearRelCall").hide();
	});

}

/**
 * 보고서 번호 세팅
 */
function setRepNo(){
	$.ajax({
		type: "GET",
		url: "/AB01011S/getRepNo",
		dataType: "json",
		async: false,
		success: function(data) {
			
			if(data.length > 0){
				$.each(data, function(key, value) {
					if(isEmpty(value.REP_NO)){
						let date = new Date();
						let year = String(date.getFullYear());
						let month = String(date.getMonth()+1).padStart(2, "0");
						let repNoVal = year+month +'00001';
						$('#AB01011S_repNo_txt').val(repNoVal);
						$('#AB01011S_repNo').val('00001');
					}else{
						$('#AB01011S_repNo_txt').val(parseInt(value.REP_NO)+1);
						$('#AB01011S_repNo').val(value.MAX_REP_NO);
					}
					
				});
			}
		}
	});
	
	
}

/**
 * 체크박스 하나만 선택
 */
function clickCheck(chk){
    var obj= $('[name=repCcd]');
    for(var i=0; i<obj.length; i++){
        if(obj[i] != chk){
            obj[i].checked = false;
        }
    }
}

/**
 * 업체정보 조회
 */
function getEntpInfo(){
	
	let entpNm 			= $('#entpNm').val();
	let entpNmInput   	= $('#entpNm');

	if( !entpNm ){
		openPopup({title: '',text: '업체명을 입력하세요.',type: 'info',
				callback: function () {
					$(document).on('click', '.confirm', function () {
						entpNmInput.focus();
					});
				}
			});
		return false;
	} 
	
	function getEntpInfoList(entpNm) {
		
		let param = {
				"entpNm": entpNm
			}
		
		$.ajax({
			type: "GET",
			url: "/AB01011S/findEntpInfo",
			data: param,
			dataType: "json",
			success: function(data) {
				var entpList = data;
				findEntpList(entpList);
			}
		});
	
	}
	
	function findEntpList(entpList){
		
		if(entpList.length == 1 ){
			$.each(entpList, function(key, value) {
				$('#corpNo').val(value.CORP_NO);			//법인번호
				$('#corpSclCd').val(value.CORP_SCL_CD);		//기업규모코드
				$('#indTypDvdCd').val(value.IND_TYP_DVD_CD);//업종분류코드
				$('#aflCmpNm').val(value.AFL_CMP_NM);		//계열명
				$('#cedtGrdCd').val(value.CRDT_GRD_CD);		//신용등급코드
				$('#mktLstdCd').val(value.MKT_LSTD_CD);		//상장시장코드
				$('#entpCd').val(value.ENTP_CD);			//업체코드
			});
			
		}else if(entpList.length >= 2){
			//비숫한 이름이 있는 경우
			
			$('#modal-entp').modal('show');
			
			let html = ''
			
			$.each(entpList, function(key, value) {
				html +='<tr class="text-center">';
				html +='	<td><input type="radio" name="entpCheck" id=""></td>'
				html +='	<td>'+ value.ENTP_NM +'</td>'	
				html +='	<td>'+ value.CORP_NO  +'</td>'
				html +='	<td>'+ value.CORP_SCL_CD +'</td>'
				html +='	<td>'+ value.IND_TYP_DVD_CD +'</td>'
				html +='	<td>'+ value.AFL_CMP_NM +'</td>'
				html +='	<td>'+ value.CRDT_GRD_CD +'</td>'
				html +='	<td>'+ value.MKT_LSTD_CD +'</td>'
				html +='	<td style="display:none;">'+ value.ENTP_CD +'</td>'
				html +='</tr>';
			});	
			
			$('#entpInfo').html(html);
			
			modalClose_entp(); 
			
			// 원하는 업체의 radio를 클릭한 후 확인 버튼 클릭
			$('#confirmButton').click(function(){
				
				let checkRadio = $('input:radio[name=entpCheck]:checked');
				let checkState =  $('input:radio[name=entpCheck]').is(':checked');
				
				if( checkState == false ){
					$('#radioState').show();
					return false;
				} 
				
				let tr = checkRadio.parent().parent();
			    let td = tr.children();
			    

			    let entpNm = td.eq(1).text();			//업체명
			    let corpNo = td.eq(2).text();			//법인번호
			    let corpSclCd = td.eq(3).text();		//기업규모
			    let indTypDvdCd = td.eq(4).text();		//업종
			    let aflCmpNm = td.eq(5).text();			//계열
			    let crdtGrdCd = td.eq(6).text();		//신용등급
			    let mktLstdCd = td.eq(7).text();		//상장시장
			    let entpCd =  td.eq(8).text();			//업체코드
			    
			    //화면 그리기
			    $('#entpNm').val(entpNm);				//업체명
			    $('#corpNo').val(corpNo);				//법인번호
				$('#corpSclCd').val(corpSclCd);			//기업규모코드
				$('#indTypDvdCd').val(indTypDvdCd);		//업종분류코드
				$('#aflCmpNm').val(aflCmpNm);			//계열명
				$('#cedtGrdCd').val(crdtGrdCd);			//신용등급코드
				$('#mktLstdCd').val(mktLstdCd);			//상장시장코드
				$('#entpCd').val(entpCd);				//업체코드
				
				modalClose_entp();
			});
			
		}else if( entpList.length == 0){
			//해당 업체의 정보가 없는 경우
			openPopup({title: '실패',text: '존재하지 않은 업체입니다.',type: 'error',
				callback: function () {
					$(document).on('click', '.confirm', function () {
						entpNmInput.focus();
					});
				}
			});
		}
	}
	getEntpInfoList(entpNm);
}

function modalClose_entp() {
	$('#modal-entp').modal('hide');
}


/**
 * 업체정보 초기화
 */
function clearEntInfo(){
	$('#entpNm').val('');
	$('#corpNo').val('');
	$('#corpSclCd').val('');
	$('#indTypDvdCd').val('');
	$('#aflCmpNm').val('');
	$('#cedtGrdCd').val('');
	$('#mktLstdCd').val('');
}

/**
 * Enter key event
 */
function keyUpEnterEntpNm() {
	$("input[id=entpNm]").keyup(function (key) {
		if (key.keyCode == 13) {		// 엔터키 입력 시 실행 (엔터의 keyCode 13)
			getEntpInfo();
		}
	});
}

/**
 * 투자상품 대분류코드 로드
 */
function loadInvstGdsLdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I012",
		dataType: "json",
		success: function(data) {
			var codeList = data;
			populateInvstGdsLdvdCd(codeList);
			loadInvstGdsMdvdCd();
		}
	});
}

/**
 * 투자상품 대분류코드 셀렉트박스 채우기
 * @param codeList 대분류코드 목록
 */ 
function populateInvstGdsLdvdCd(codeList) {
	var html = "";
	$('#AB01011S_invstGdsLdvdCd').html(html);

	if (codeList.length > 0) {
		$.each(codeList, function(key, value) {
			html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
		});
	}
	$('#AB01011S_invstGdsLdvdCd').html(html);
}

/**
 * 투자상품 대분류코드 이벤트 핸들러
 */
function changeInvstGdsLdvdCd() {
	$('#AB01011S_invstGdsLdvdCd').on('change', function() {
		var selectedLdvdCd = $(this).val(); // 선택된 대분류 코드 가져오기
		populateInvstGdsMdvdCd(mCodeList, selectedLdvdCd);
	});
}

/**
 * 투자상품 중분류코드
 */
function loadInvstGdsMdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I015",
		dataType: "json",
		success: function(data) {
			mCodeList = data;
			populateInvstGdsMdvdCd(mCodeList);

		}
	})
}

/**
 * 투자상품 중분류 셀렉트박스
 * @param mCodeList 중분류코드 목록
 * @param selectedLdvdCd 선택된 대분류 값(change)
 */
function populateInvstGdsMdvdCd(mCodeList, selectedLdvdCd) {
    var html = "";
    $('#AB01011S_invstGdsMdvdCd').html(html);

	if (mCodeList.length > 0) {
		var validMdvdCds = [];
		var selectedLdvdCd = $('#AB01011S_invstGdsLdvdCd').val();	// 첫 로드시 값 설정
		var selectedLdvdPrefix = selectedLdvdCd.slice(0, -1);
		$.each(mCodeList, function(key, value) {
			if (value.CD_VL_ID.startsWith(selectedLdvdPrefix)) {
				validMdvdCds.push(value.CD_VL_ID);
			}
		});

		if (validMdvdCds.length > 0) {
			$.each(mCodeList, function(key, value) {
				if (validMdvdCds.includes(value.CD_VL_ID)) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				}
			});
		}
	}

    $('#AB01011S_invstGdsMdvdCd').html(html);
}

/**
 * 화면 초기화
 */
function resetCallReport(){
	$('#asmt_dprtNm').val('');											// 담당소속부서
	$('#asmt_empNm').val('');											// 담당사원
	clearEntInfo();														// 업체정보
	$("[name=repCcd]").prop("checked", false); 							// 리포트구분
	$('#AB01011S_metTitNm').val('');									// 미팅제목
	$('#AB01011S_metDt').val('');										// 미팅일자
	//$('#AB01011S_repNo').val('');										// 리포트번호(보고서번호)
	$('#AB01011S_invstGdsLdvdCd option:eq(0)').prop('selected', true);	// 투자상품대분류코드
	$('#AB01011S_invstGdsMdvdCd option:eq(0)').prop('selected', true);	// 투자상품중분류코드
	$('#AB01011S_metPrpsNm').val('');									// 미팅목적 
	$('#AB01011S_metCntnt').val('');									// 미팅내용
	$('#AB01011S_custNm').val('');										// 고객명
	$('#AB01011S_custChrgDeptNm').val('');								// 담당부서
	$('#AB01011S_custPstnNm').val('');									// 직급
	$('#AB01011S_custMainCrrCntnt').val('')								// 주요경력
	$('#AB01011S_custRefCntnt').val('')									// 참고사항
	scrtArtcF = 'N';													// 비밀글여부
	
	$('#dsgnUserInfo').html('');										// 지정 조회자 
	$('#dsgnDprtInfo').html('');										// 지정 조회 부서	
	$('#relCallInfo').html('');											// CALL
	$('#relDprInfo').html('');											// DPR
	
	//파일첨부 초기화
	
}

/**
 * 비밀글 설정
 */
function ckuckSeceretYn(){
	Swal.fire({
		icon: 'info'
		, text: "비밀글로 설정하겠습니까?"
		, showCancelButton: true
		, confirmButtonText: "예"
		, cancelButtonText : "아니오"
	}).then((result) => {
		if (result.value) {
			scrtArtcF = 'Y'
		  }
	});

}


/**
 * Call Reprit 신규등록
 * */
// 미정 : relDocCcd(관련문서구분코드),ibDealNo(ibDeal번호)
function clickSaveCallReport(){
	//alert("신규등록");
	var relDocCcd = "tt"	//관련문서구분코드_
		미정											// 관련문서구분코드
		
	var chrgPEno = $('#asmt_eno').val();									// 담당사원번호
	var chrgDprtCd = $('#asmt_dprtCd').val();								// 담당부점코드
	var entpCd =$('#entpCd').val();											// 업체코드
	var repCcd;																// 리포트구분코드
 	
	if($('#AB01011S_repCcd1').is(":checked") == true){						
		var repCcd = $('#AB01011S_repCcd1').val();
	}else if($('#AB01011S_repCcd2').is(":checked") == true){
		var repCcd = $('#AB01011S_repCcd2').val();
	}	
	
	 
	var metTitNm = $('#AB01011S_metTitNm').val();							// 미팅제목
	var metDt = $('#AB01011S_metDt').val();									// 미팅일자
	var repNo = $('#AB01011S_repNo').val();									// 리포트번호(보고서번호)
	var invstGdsLdvdCd = $('#AB01011S_invstGdsLdvdCd').val();				// 투자상품대분류코드
	var invstGdsMdvdCd = $('#AB01011S_invstGdsMdvdCd').val(); 				// 투자상품중분류코드
	var metPrpsNm = $('#AB01011S_metPrpsNm').val();							// 미팅목적 
	var metCntnt = $('#AB01011S_metCntnt').val();							// 미팅내용
	var custNm = $('#AB01011S_custNm').val();								// 고객명
	var custChrgDeptNm = $('#AB01011S_custChrgDeptNm').val();				// 담당부서
	var custPstnNm = $('#AB01011S_custPstnNm').val();						// 직급
	var custMainCrrCntnt = $('#AB01011S_custMainCrrCntnt').val()			// 주요경력
	var custRefCntnt = $('#AB01011S_custRefCntnt').val()					// 참고사항
	//scrtArtcF // 비밀글여부
	// ibDeal번호
	var ibDealNo = 'test';
	
	if(isEmpty(repCcd)){
		openPopup({ type: "warning", text: '리포트구분을 선택하세요.' });
		return false;
	}
	
	
	function saveCallReport() {
		var param = {
			"repNo" : repNo
			, "relDocCcd" : relDocCcd
			, "repCcd": repCcd
			, "chrgDprtCd" : chrgDprtCd
			, "chrgPEno" : chrgPEno
			, "entpCd" : entpCd
			, "metTitNm" : metTitNm
			, "metDt" : metDt
			, "invstGdsLdvdCd" : invstGdsLdvdCd
			, "invstGdsMdvdCd" : invstGdsMdvdCd 
			, "metPrpsNm" : metPrpsNm 
			, "metCntnt" : metCntnt 
			, "custNm" : custNm
 			, "custChrgDeptNm" : custChrgDeptNm 
 			, "custPstnNm" : custPstnNm 
 			, "custMainCrrCntnt" : custMainCrrCntnt 
 			, "custRefCntnt" : custRefCntnt 
 			, "scrtArtcF" : scrtArtcF
 			, "ibDealNo" : ibDealNo
		}

		$.ajax({
			type: "POST",
			//url: "/AB01011S/registCallReportInfo",
			data: param,
			dataType: "json",
			success : function(){
				saveDsgnUsrNoTable();
				saveDsgnDeptNoTable();
				//saveRelCallTable();
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "Call Report를 등록하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "Call Report를 등록하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
	saveCallReport();
	
}



/**
 * 지정조회자 테이블 저장
 */
function saveDsgnUsrNoTable(){
	let insertDsgnUsrNoList = new Array();
	let tr = $('#dsgnUserInfo').children();
	let dsgnUsrNoList;

	for( let i = 0 ; i < tr.length ; i++){

		//let dprtCdText = $(tr[i]).find("td:eq(1)").text();				// 부서명
		//let repDsgnUsrNoText = $(tr[i]).find("td:eq(2)").text();		// 사용자
		let dltF = $(tr[i]).find('td:eq(3)').text();					// 삭제여부
		let repDsgnUsrNo = $(tr[i]).find('td:eq(4)').text();			// 사용자번호
		let dprtCd = $(tr[i]).find('td:eq(5)').text();					// 부점코드
		let repNo = $('#AB01011S_repNo_txt').val();							//보고서번호

		dsgnUsrNoList = {
				"repDsgnUsrNo" : repDsgnUsrNo,
				"dprtCd" : dprtCd, 
				"dltF" : dltF,
				"repNo" : repNo
		}
		
		
		if(repNo.length != 0){
			insertDsgnUsrNoList.push(dsgnUsrNoList);
		}
		//insertDsgnUsrNoList.push(dsgnUsrNoList);
		
		
	}
	
	$.ajax({
		type: "POST",
		url: "/AB01011S/registRepDsgnUsrNoInfo",
		data: JSON.stringify(insertDsgnUsrNoList),
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
		},
		error: function() {
			console.error("saveDsgnUsrNoTable error");
		}
	}); 
	

	//function send
}

/**
 * 지정조회부서 테이블 저장
 */
function saveDsgnDeptNoTable(){
	let insertDsgnDeptNoList = new Array();
	let tr = $('#dsgnDprtInfo').children();
	let deptNoList;
	
	for( let i = 0 ; i < tr.length ; i++){
		
		//let dprtCdText = $(tr[i]).find('td:eq(1)').text();				// 부서명
		let dltF = $(tr[i]).find('td:eq(2)').text();						// 삭제여부
		let repDsgnDeptNo = $(tr[i]).find('td:eq(3)').text();				// 부점코드
		let repNo = $('#AB01011S_repNo_txt').val();							//보고서번호
		
		deptNoList = {
				'repDsgnDeptNo' : repDsgnDeptNo,
				'dltF' : dltF,
				'repNo' : repNo
		}
		
		if(repNo.length != 0){
			insertDsgnDeptNoList.push(deptNoList);
		}
		//insertDsgnDeptNoList.push(deptNoList); 
	}
	
	$.ajax({
		type: "POST",
		url: "/AB01011S/registRepDsgnDeptNoInfo",
		data: JSON.stringify(insertDsgnDeptNoList),
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
		},
		error: function() {
			console.error("saveDsgnUsrNoTable error");
		}
	}); 
	
}

//관련 CALL 테이블
function saveRelCallTable(){
	let insertRellCallList = new Array();
	let tr = $('#relCallInfo').children();
	let rellCallList;
	
	for( let i = 0 ; i < tr.length ; i++){
		
		//let meetingDtTxt = $(tr[i]).find('td:eq(1)').text();
		//let dprtCdTxt = $(tr[i]).find('td:eq(2)').text();
		//let dsgnUsrNoTxt = $(tr[i]).find('td:eq(3)').text();
		let metTitle = $(tr[i]).find('td:eq(4)').text();			// 미팅제목
		let entpNm = $(tr[i]).find('td:eq(5)').text();				// 업체명
		let dltF = $(tr[i]).find('td:eq(6)').text();				// 삭데여부
		let meetingDt = $(tr[i]).find('td:eq(7)').text();			// 미팅일자
		let dprtCd = $(tr[i]).find('td:eq(8)').text();				// 부서코드
		let dsgnUsrNo = $(tr[i]).find('td:eq(9)').text();			// 사원코드
		
		rellCallList = {
				'meetingDt' : meetingDt,
				'dprtCd' : dprtCd ,
				'dsgnUsrNo' : dsgnUsrNo ,
				'metTitle' : metTitle,
				'entpNm' : entpNm ,
				'dltF' : dltF,
		}
		
		insertRellCallList.push(rellCallList);
		
	}
	

}

/************************************* 파일관련 *****************************************************/

var fileTarget = $('.filebox .upload-hidden');

fileTarget.on('change', function(){  // 값이 변경되면
	if(window.FileReader){  // modern browser
		var filename = $(this)[0].files[0].name;
	} 
	else {  // old IE
		var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	}

	// 추출한 파일명 삽입
	$(this).siblings('.upload-name').val(filename);
});

/**
 * 파일추가 버튼 클릭
 */
$("#AB01011S_addFile").click(function(){
	$('#upload-file-input').click();
});



/**
 * 파일 추가 후 event
 */
$("#upload-file-input").change(function(){
	var mode = "multi";
	callFileUpload(mode);
});

/**
 * 파일 추가 후 event
 */
$("#upload-file-single").change(function(){
	var mode = "single";
	callFileUpload(mode);
});


/**
 * 파일업로드 비동기 통신함수
 */
var callFileUpload = function (mode) {
	
	var action = "upload";
	
	if(mode=="single"){
		if($("#upload-file-single").length < 1){
			return false;
		}
	}else{
		if($("#upload-file-input").length < 1){
			return false;
		}	
	}	
	
	if(isEmpty($('#fileRepNo').val())){
		$('#fileRepNo').val($("#AB01011S_repNo_txt").val());
	}
	
	
	$.ajax({
	    url: '/AB01011S/repFileInfo',
		type: 'POST',
		data: new FormData($('#upload-file-form')[0]),
		enctype: 'multipart/form-data',
	    processData: false,
		contentType: false,
		cache: false,
	    //beforeSend : function(xhr, opt) {
	        //openPopup({type:"loding",show:true});
	    //},
		success:function(result){
			openPopup({ type: "success", title: "Success", text: '파일을 upload 하였습니다.' });
			
			if(mode == "single"){
				var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
				$('#fileAttFileSq').val(result.attFileSq);
				$('#upload-file-single').attr('disabled', true);
				$('.filebox').addClass('bs-disable');
				$('#openFile').attr('disabled', false);
				$('#delFile').attr('disabled', false);
				$('#filePath').attr("href",encUri);
				
			}else{
				callbackFile(action, result);
			}
		},
	    error:function(request,status,error){
			//openPopup({type:"loding",show:false});
			var res = JSON.parse(request.responseText);
			openPopup({type:"error", title:status, text:res.error});
			//failCallbackFileUpload();
        //},
        //complete:function () {
			//openPopup({type:"loding",show:false});
		}
	});
};


/**
 * 파일다운로드 encodeURI
 */
var downloadURI = function (svFilePathNm, svFileNm, orgFileNm) {
	var encUri = encodeURI("/downloadFile?svFilePathNm="+svFilePathNm+"&svFileNm="+svFileNm+"&orgFileNm="+orgFileNm);
	return encUri;
}

/**
 * 파일삭제 버튼 클릭
 */
$("#AB01011S_delFiles").click(function(){
	var mode = "multi";
	
	let _arr = new Array();
	let _tr = $("tbody[id*='fileList']").children();

	for (let i = 0; i < _tr.length; i++) {
		let delCheck = $(_tr[i]).find("td:eq(0)").find("input");
		if (delCheck.is(":checked")) {
			_arr.push(delCheck.attr("id"));
		}
	}

	if (_arr.length != 0) {
		deleteFiles(mode, _arr);
	}
});

$("#delFile").click(function(){
	var mode = "single";
	
	let _arr = new Array();
	_arr.push($('#fileAttFileSq').val());
	deleteFiles(mode, _arr);
});

/**
 * 파일삭제 삭제 처리
 * @param {list} request 삭제대상 리스트
 */
var deleteFiles = function (mode, arrRepFileAttSq) {
	
	var action = "delete";
	
	var fileRepNo = $('#fileRepNo').val();
	
	if(isEmpty(fileRepNo)){
		fileRepNo = $("#AB01011S_repNo_txt").val();
	}
	
	var paramData = {
		"fileRepNo": fileRepNo,
		"arrRepFileAttSq": arrRepFileAttSq
	}
	
	$.ajax({
		url: '/AB01011S/deleteFile',
		type: 'GET',
		data: paramData,
		dataType: "json",
		success: function (result) {
			openPopup({ type: "warning", title: "Success", text: '파일을 삭제 하였습니다.' });
			
			if(mode == 'single'){
				$('#fileAttFileSq').val('');
				fileTarget.siblings('.upload-name').val('');
				$('#filePath').attr("href",'');
				$('#openFile').attr('disabled', true);
				$('#delFile').attr('disabled', true);
				$('#upload-file-single').attr('disabled', false);
				$('.filebox').removeClass('bs-disable');
			}else{
				callbackFile(action, result);	
			}
		},
		error:function(request, status, error){
			var res = JSON.parse(request.responseText);
			openPopup({type:"error", title:status, text:res.error});
		}
	});
}

/**
 * 파일조회(단건)
 */
function getFileInfo() {
	var fileRepNo = $('#fileRepNo').val();
	
	if(isEmpty($('#fileRepNo').val())){
		fileRepNo = $("#AB01011S_repNo_txt").val();
	}
	
	paramData = {
		"fileRepNo": fileRepNo
	}

	$.ajax({
		type: "GET",
		url: "/AB01011S/getFiles",
		data: paramData,
		dataType: "json",
		success: function(data) {

			if (data.length > 0) {
				$.each(data, function(key, value) {
					$('.upload-name').val(value.orgFileNm);

					var encUri = downloadURI(value.svFilePathNm, value.svFileNm, value.orgFileNm);
					$('#fileAttFileSq').val(value.repFileAttSq);
					$('#upload-file-single').attr('disabled', true);
					$('.filebox').addClass('bs-disable');
					$('#openFile').attr('disabled', false);
					$('#delFile').attr('disabled', false);
					$('#filePath').attr("href", encUri);
				});
				
				callbackFile('select', data);
			}
		}
	});
}

/**
 * 파일ajax 성공시 custom callback 함수
 */
function callbackFile(action, result) {
	var html = '';
	if (action == 'upload') {
		html = makeFilList(html, result);
		$('#AB01011S_fileList').append(html);
	} //else {
	  if (action == 'delete' || action == 'select') {
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html = makeFilList(html, fileInfo);
		}
		$('#AB01011S_fileList').empty();
		$('#AB01011S_fileList').append(html);
	}
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
	html += '    <td><input type="checkbox" id="' +result.repFileAttSq + '">';
	html += '    </td>';
	html += '    <td class="text-left"><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td class="text-center">' + stringFormat(result.rgstDt) + '</td>';
	html += '</tr>';
	
	return html;
}

function stringFormat(param){
	param = param.substr(0, 4) + '-' + param.substr(4, 2) + '-' + param.substr(6, 2);
	return param;
}