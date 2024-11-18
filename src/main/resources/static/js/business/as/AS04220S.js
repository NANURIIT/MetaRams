$(document).ready(function() {

	chkboxFunction();
	getDealInfoByEno();

});

function chkboxFunction() {
	$('#AS04220S_chkF').click(function() {
		getDealInfoByEno();
	});
}

function getDealInfoByEno() {

	var chkF = '';																	// 종료건포함체크

	if ($('#AS04220S_chkF:checked').length > 0) {
		chkF = 'Y';
	} else {
		chkF = 'N';
	}

	var paramData = {
		"chkF": chkF
	};

	$.ajax({
		type: "GET",
		url: "/AS04220S/getDealInfoByEno",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04220S_dealList').html(html);			// 전결협의체

			var dealList = data;
			if (dealList.length > 0) {
				$.each(dealList, function(key, value) {
					html += '<tr ondblclick="getDealDetails(this)">';
					html += '<td style="display:none;">' + value.inspctCnfrncCcd + '</td>';
					html += '<td style="display:none;">' + value.stdYr + '</td>';
					html += '<td style="display:none;">' + value.inspctCnfrncSqcSq + '</td>';
					html += '<td style="display:none;">' + value.rnkNo + '</td>';
					html += '<td>' + value.title + '</td>';
					html += '<td>' + value.ibDealNo + '</td>';
					html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';
					html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';
					html += '<td>' + value.ibDealNm + '</td>';
					html += '<td>' + value.rsltnDt + '</td>';
					html += '<td>' + value.invstCrncyCdNm + '</td>';
					html += '<td>' + value.ptcpAmt + '</td>';
					html += '<td>' + value.rcgAmt + '</td>';
					html += '<td>' + value.aprvOpstnCcdNm + '</td>';
					html += '<td>' + value.prgrsStNm + '</td>';
					html += '<td>' + value.cnfrFNm + '</td>';
					html += '<td style="display:none;">' + value.cnfrPNm + '</td>';
					html += '<td style="display:none;">' + value.cnfrPEno + '</td>';
					html += '<td style="display:none;">' + value.cnfrDyTm + '</td>';
					if (value.rvwCmmtCntnt == null) {
						html += '<td style="display:none;"></td>';
					}else{
						html += '<td style="display:none;">' + value.rvwCmmtCntnt + '</td>';
					}
					html += '<td style="display:none;">' + value.inspctPrgrsStCd + '</td>';
					html += '</tr>';
				});
			}
			$('#AS04220S_dealList').html(html);
		}
	});
}

function getDealDetails(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var inspctCnfrncCcd = td.eq(0).text();
	var stdYr = td.eq(1).text();
	var inspctCnfrncSqcSq = td.eq(2).text();
	var rnkNo = td.eq(3).text();
	var ibDealNo = td.eq(5).text();
	var riskInspctCcd = td.eq(6).text();
	var lstCCaseCcd = td.eq(7).text();
	var cnfrPNm = td.eq(16).text();
	var cnfrPEno = td.eq(17).text();
	var cnfrDyTm = td.eq(18).text();
	var rvwCmmtCntnt = td.eq(19).text();
	var inspctPrgrsStCd = td.eq(20).text();

	$('#AS04220S_inspctCnfrncCcd').val(inspctCnfrncCcd);
	$('#AS04220S_stdYr').val(stdYr);
	$('#AS04220S_inspctCnfrncSqcSq').val(inspctCnfrncSqcSq);
	$('#AS04220S_rnkNo').val(rnkNo);
	
	$('#AS04220S_ibDealNo').val(ibDealNo);
	$('#AS04220S_riskInspctCcd').val(riskInspctCcd);
	$('#AS04220S_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#AS04220S_cnfrPNm').val(cnfrPNm);
	$('#AS04220S_cnfrPEno').val(cnfrPEno);
	$('#AS04220S_cnfrDyTm').val(cnfrDyTm);
	$('#AS04220S_rvwCmmtCntnt').val(rvwCmmtCntnt);

//	$('#fileIbDealNo').val(ibDealNo);
//	$('#fileRiskInspctCcd').val(riskInspctCcd);
//	$('#fileLstCCaseCcd').val(lstCCaseCcd);

	$('#fileIbDealNo').val("M" + inspctCnfrncCcd + "0000000000");
	$('#fileRiskInspctCcd').val(stdYr.substring(2, 4));
	$('#fileLstCCaseCcd').val(('0' + inspctCnfrncSqcSq).slice(-2));

	switch (inspctPrgrsStCd) {
		// 협의체결의준비확정
		case "340":
			$('.row .btn-success').prop('disabled', false);
			$('.row .btn-info').prop('disabled', false);
			$('.row .btn-default').prop('disabled', false);
			$('.row .btn-warning').prop('disabled', false);
			$('.row .btn-danger').prop('disabled', true);
			break;
		// 가결
		case "350":
		// 부결
		case "360":
		// 조건부가결
		case "370":
		// 협의체결의보류
		case "380":
			$('.row .btn-success').prop('disabled', true);
			$('.row .btn-info').prop('disabled', true);
			$('.row .btn-default').prop('disabled', true);
			$('.row .btn-warning').prop('disabled', true);
			$('.row .btn-danger').prop('disabled', false);
			break;
		default:
			break;

	}

	getDoc();
	getFile();
}

function getDoc() {
	var paramData = {
		"fileIbDealNo": $('#AS04220S_ibDealNo').val()
		, "fileRiskInspctCcd": $('#AS04220S_riskInspctCcd').val()
		, "fileLstCCaseCcd": $('#AS04220S_lstCCaseCcd').val()
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
				$('#AS04220_fileList').empty();
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
		$('#AS04220_fileList').append(html);
	} //else {
	else if (action == 'delete' || action == 'select') {
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html += makeFilList(html, fileInfo);
		}
		$('#AS04220_fileList').empty();
		$('#AS04220_fileList').append(html);
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
	if(isEmpty($('#AS04220S_ibDealNo').val())){
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
		"inspctCnfrncCcd": $('#AS04220S_inspctCnfrncCcd').val()
		, "stdYr": $('#AS04220S_stdYr').val()
		, "inspctCnfrncSqcSq": $('#AS04220S_inspctCnfrncSqcSq').val()
		, "rnkNo": $('#AS04220S_rnkNo').val()
	};
	
	$.ajax({
		type: "POST",
		url: "/AS04220S/confirmFile",
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

function updateAprvOpstnCcd(param) {
	if(isEmpty($('#AS04220S_ibDealNo').val())){
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
		"inspctCnfrncCcd": $('#AS04220S_inspctCnfrncCcd').val()
		, "stdYr": $('#AS04220S_stdYr').val()
		, "inspctCnfrncSqcSq": $('#AS04220S_inspctCnfrncSqcSq').val()
		, "rnkNo": $('#AS04220S_rnkNo').val()
		, "aprvOpstnCcd": param
		, "rvwCmmtCntnt": $('#AS04220S_rvwCmmtCntnt').val()
	};
	
	$.ajax({
		type: "POST",
		url: "/AS04220S/updateAprvOpstnCcd",
		data: paramDto,
		dataType: "json",
		success: function(data) {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "협의체 의견등록 하였습니다."
				, confirmButtonText: "확인"
			}).then((result) => {
				getDealInfoByEno();
			});
		}
	});
	
}

