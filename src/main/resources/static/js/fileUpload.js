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
$("#UPLOAD_AddFile").click(function(){
	var mode = "s";
	$('#deal-upload-input').click();
});

/**
 * 파일 추가 후 event
 */
$("#deal-upload-input").change(function(){
	var mode = "m";
	callCmFileUpload(mode);
});



/**
 * 파일업로드 비동기 통신함수
 */
var callCmFileUpload = function (mode) {
	

	var action = "upload";

		if($("#deal-upload-input").length < 1){
			return false;
		}	

	if(isEmpty($('#fileKey1').val())){
		if($('#selectedMngDealNo').length > 5){
			$('#fileKey1').val($('#selectedMngDealNo').val());
		}else{
			$('#fileKey1').val($('#key1').val());
		}
		
		if($('#key2').length > 0){
			$('#fileKey2').val($('#key2').val());
		}
	}
		
	$.ajax({
	    url: '/FileUpload/uploadCmFile',
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
			
			
			$('#fileKey1').val(result.fileKey1);
			$('#fileKey2').val(result.fileKey2);
			$('#attFileSq').val(result.attFileSq);
			
			
			openPopup({ type: "success", title: "Success", text: '파일을 upload 하였습니다.' });

			if(mode == "single"){
				var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
				$('#attFileSq').val(result.attFileSq);
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
$("#UPLOAD_DelFiles").click(function(){
	var mode = "d";
	
	let _arr = new Array();
	let _tr = $('#UPLOAD_FileList').children();
	

	for (let i = 0; i < _tr.length; i++) {
		let delCheck = $(_tr[i]).find("td:eq(0)").find("input");
		if (delCheck.is(":checked")) {
			_arr.push(delCheck.attr("id"));
			
		}
		
	}
	

	if (_arr.length != 0) {
		deleteCmFiles(mode, _arr);
	}
});



/**
 * 파일삭제 삭제 처리
 * @param {list} request 삭제대상 리스트
 */
var deleteCmFiles = function (mode, arrAttFileSq) {
	
	var action = "delete";
	
	var fileKey1 = $('#fileKey1').val();
	var fileKey2 = $('#fileKey2').val();

	
	
	var paramData = {
		"fileKey1": fileKey1,
		"fileKey2": fileKey2,
		"arrAttFileSq": arrAttFileSq
	}
	

	$.ajax({
		url: '/FileUpload/deleteCmFile',
		type: 'GET',
		data: paramData,
		dataType: "json",
		success: function (result) {
			openPopup({ type: "warning", title: "Success", text: '파일을 삭제 하였습니다.' });
			
			if(mode == 'single'){
				$('#attFileSq').val('');
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
function getFileInfo(key1,key2) {
	
	
	var action = "select";
	
	$('#fileKey1').val(key1);
	$('#fileKey2').val(key2);
	
	var fileKey1 = key1;
	var fileKey2 = key2;

	
	
	var paramData = {
		"fileKey1": fileKey1,
		"fileKey2": fileKey2,

	}

	$.ajax({
		type: "GET",
		url: "/FileUpload/getCmFiles",
		data: paramData,
		dataType: "json",
		success: function(data) {

			if (data.length > 0) {
				$.each(data, function(key, value) {
					$('.upload-name').val(value.orgFileNm);
					var encUri = downloadURI(value.svFilePathNm, value.svFileNm, value.orgFileNm);
					$('#attFileSq').val(value.attFileSq);
					$('#upload-file-single').attr('disabled', true);
					$('.filebox').addClass('bs-disable');
					$('#openFile').attr('disabled', false);
					$('#delFile').attr('disabled', false);
					$('#filePath').attr("href", encUri);
				});
				
			}
			selectFile(action, data);
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
		$('#UPLOAD_FileList').append(html);
	} //else {
	  if (action == 'delete' || action == 'select') {
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html += makeFilList(html, fileInfo);
		}
		$('#UPLOAD_FileList').empty();
		$('#UPLOAD_FileList').append(html);
	}
}

function selectFile(action, result) {
	var html = '';	
	for (let i = 0; i < result.length; i++) {
		let fileInfo = result[i];
		html += makeFilList(html, fileInfo);
	}

	
	$('#UPLOAD_FileList').empty();
	$('#UPLOAD_FileList').html('');

	$('#UPLOAD_FileList').append(html);


}



/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	var html = '';
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
	html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
	html += '    </td>';
	html += '    <td>' + result.fileKey1 + '</td>';
	html += '    <td>' + result.fileKey2 + '</td>';
	html += '    <td>' + result.attFileSq + '</td>';
	html += '    <td><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '</tr>';
	
	return html;
	
	
	
}


