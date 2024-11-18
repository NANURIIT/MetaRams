$(document).ready(function() {

	chkboxFunction();
	getDealInfoByEno();

});

function chkboxFunction() {
	$('#TB05020S_chkF').click(function() {
		getDealInfoByEno();
	});
}

function getDealInfoByEno() {

	var chkF = '';																	// 종료건포함체크

	if ($('#TB05020S_chkF:checked').length > 0) {
		chkF = 'Y';
	} else {
		chkF = 'N';
	}

	var paramData = {
		"chkF": chkF
	};

	$.ajax({
		type: "GET",
		url: "/TB05020S/getDealInfoByEno",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#TB05020S_dealList').html(html);			// 전결협의체
			var dealList = data;
			if (dealList.length > 0) {
				$.each(dealList, function(key, value) {
					html += '<tr ondblclick="getDealDetails(this)" style="cursor:pointer;">';
					html += '<td style="display:none;">' + value.cnsbDcd + '</td>';
					html += '<td style="display:none;">' + value.rsltnYr + '</td>';
					html += '<td style="display:none;">' + value.cnsbSq + '</td>';
					html += '<td style="display:none;">' + value.sn + '</td>';
					html += '<td class="text-center">' + value.cnsbDcdNm + '</td>';
					html += '<td class="text-left">' + value.dealNo + '</td>';
					html += '<td style="display:none;">' + value.jdgmDcd + '</td>';
					html += '<td style="display:none;">' + value.mtrDcd + '</td>';
					html += '<td>' + value.mtrNm + '</td>';
					html += '<td class="text-center">' + formatDate(value.cnsbOpnDt) + '</td>';
					html += '<td>' + value.ptfdCrncyCdNm + '</td>';
					html += '<td class="text-right">' + addComma(value.ptfdAmt) + '</td>';
					html += '<td class="text-right">' + addComma(value.apvlAmt) + '</td>';
					html += '<td class="text-center">' + value.aprvOppsDcdNm + '</td>';
					html += '<td class="text-center">' + value.mtrPrgSttsDcdNm + '</td>';
					html += '<td class="text-center">' + '-' + '</td>';
					html += '<td style="display:none;">' + value.opnnCtns + '</td>';
					html += '<td style="display:none;">' + value.aprvOppsDcd + '</td>';
					html += '</tr>';
				});
			}
			$('#TB05020S_dealList').html(html);
		}
	});
}

function getDealDetails(e) {

	$('#TB05020S_dealList tr').removeClass('table-active');
	$(e).addClass('table-active');

	var tr = $(e);
	var td = $(tr).children();

	var cnsbDcd = td.eq(0).text();
	var rsltnYr = td.eq(1).text();
	var cnsbSq = td.eq(2).text();
	var sn = td.eq(3).text();
	var dealNo = td.eq(5).text();
	var jdgmDcd = td.eq(6).text();
	var mtrDcd = td.eq(7).text();
	//var cnfrPNm = td.eq(16).text();
	//var cnfrPEno = td.eq(17).text();
	//var cnfrDyTm = td.eq(18).text();
	var opnnCtns = td.eq(16).text();
	var aprvOppsDcd = td.eq(17).text();

	$('#TB05020S_cnsbDcd').val(cnsbDcd);
	$('#TB05020S_rsltnYr').val(rsltnYr);
	$('#TB05020S_cnsbSq').val(cnsbSq);
	$('#TB05020S_sn').val(sn);
	
	$('#TB05020S_dealNo').val(dealNo);
	$('#TB05020S_jdgmDcd').val(jdgmDcd);
	$('#TB05020S_mtrDcd').val(mtrDcd);
	
	//$('#TB05020S_cnfrPNm').val(cnfrPNm);
	//$('#TB05020S_cnfrPEno').val(cnfrPEno);
	//$('#TB05020S_cnfrDyTm').val(cnfrDyTm);
	$('#TB05020S_opnnCtns').val(opnnCtns);

//	$('#fileIbDealNo').val(ibDealNo);
//	$('#fileRiskInspctCcd').val(riskInspctCcd);
//	$('#fileLstCCaseCcd').val(lstCCaseCcd);

	$('#fileIbDealNo').val("M" + cnsbDcd + "0000000000");
	$('#fileRiskInspctCcd').val(rsltnYr.substring(2, 4));
	$('#fileLstCCaseCcd').val(('0' + cnsbSq).slice(-2));

	switch (aprvOppsDcd) {
		// 의결내용 ''
		case "":
			$('.row .btn-success').prop('disabled', false);
			$('.row .btn-info').prop('disabled', false);
			$('.row .btn-default').prop('disabled', false);
			$('.row .btn-warning').prop('disabled', false);
			$('.row .btn-danger').prop('disabled', true);
			break;
		// 가결
		case "1":
		// 부결
		case "2":
		// 조건부가결
		case "3":
		// 가결
		case "4":
			$('.row .btn-success').prop('disabled', true);
			$('.row .btn-info').prop('disabled', true);
			$('.row .btn-default').prop('disabled', true);
			$('.row .btn-warning').prop('disabled', true);
			$('.row .btn-danger').prop('disabled', false);
			break;
		default:
			break;

	}

	//getDoc();
	//getFile();
}

function getDoc() {
	var paramData = {
		"fileIbDealNo": $('#TB05020S_ibDealNo').val()
		, "fileRiskInspctCcd": $('#TB05020S_riskInspctCcd').val()
		, "fileLstCCaseCcd": $('#TB05020S_lstCCaseCcd').val()
	};

	$.ajax({
		type: "GET",
		url: "/getFiles",
		data: paramData,
		dataType: "json",
		success: function(data) {
			if (data.length > 0) {
				callbackFile('select', data);
			}else{
				$('#TB05020S_fileList').empty();
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
		$('#TB05020S_fileList').append(html);
	} //else {
	else if (action == 'delete' || action == 'select') {
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html += makeFilList(html, fileInfo);
		}
		$('#TB05020S_fileList').empty();
		$('#TB05020S_fileList').append(html);
	}
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result) {

	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
//	html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
//	html += '    </td>';
	html += '    <td><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '</tr>';

	return html;
}

function getFile() {
	getFileInfo();
}

function confirmFile() {
	if(isEmpty($('#TB05020S_ibDealNo').val())){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "안건 상세정보를 확인하세요."
			, confirmButtonText: "확인"
		}).then((result) => {
			return;
		});
	}
	
	var paramDto = {
		"inspctCnfrncCcd": $('#TB05020S_inspctCnfrncCcd').val()
		, "stdYr": $('#TB05020S_stdYr').val()
		, "inspctCnfrncSqcSq": $('#TB05020S_inspctCnfrncSqcSq').val()
		, "rnkNo": $('#TB05020S_rnkNo').val()
	};
	
	$.ajax({
		type: "POST",
		url: "/TB05020S/confirmFile",
		data: paramDto,
		dataType: "json",
		success: function(data) {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "회의록을 확인했습니다."
				, confirmButtonText: "확인"
			}).then((result) => {
				location.reload();
			});
		}
	});
}

function updateAprvOppsDcd(param) {
	if(isEmpty($('#TB05020S_dealNo').val())){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "안건 목록을 선택해주세요."
			, confirmButtonText: "확인"
		});
		return false;
	}
	
	var paramDto = {
		       "cnsbDcd": $('#TB05020S_cnsbDcd').val()
		,      "rsltnYr": $('#TB05020S_rsltnYr').val()
		,       "cnsbSq": $('#TB05020S_cnsbSq').val()
		,           "sn": $('#TB05020S_sn').val()
		,  "aprvOppsDcd": param
		,     "opnnCtns": $('#TB05020S_opnnCtns').val()
	};
	$.ajax({
		type: "POST",
		url: "/TB05020S/updateAprvOppsDcd",
		data: paramDto,
		dataType: "json",
		success: function() {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "협의체 의견등록 하였습니다."
				, confirmButtonText: "확인"
			}).then(() => {
				getDealInfoByEno();
			});
		}
	});
	
}

