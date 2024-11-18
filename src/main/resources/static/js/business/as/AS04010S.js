$(document).ready(function() {

	loadSelectBoxContents();
	
	getUrlDealInfo();
});

function getUrlDealInfo() {
	
	var ibDealNo = sessionStorage.getItem("ibDealNo");
	var riskInspctCcd = sessionStorage.getItem("riskInspctCcd");
	var lstCCaseCcd = sessionStorage.getItem("lstCCaseCcd");
	var inspctPrgrsStCd = sessionStorage.getItem("inspctPrgrsStCd");
	
	switch (inspctPrgrsStCd) {
		case "200":
			$('.ibox-content .btn-success').prop('disabled', false);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
		case "300":
			$('.ibox-content .btn-success').prop('disabled', false);
			$('.ibox-content .btn-info').prop('disabled', false);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
		case "310":
			$('.ibox-content .btn-success').prop('disabled', true);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', false);
			break;
		default:
			$('.ibox-content .btn-success').prop('disabled', true);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
	}

	if (!isEmpty(ibDealNo)) {
		$('#AS04010S_ibDealNo').val(ibDealNo);
		$('#AS04010S_selectedDealNo').val(ibDealNo);
		$('#fileIbDealNo').val(ibDealNo);
		$('#fileRiskInspctCcd').val(riskInspctCcd);
		$('#fileLstCCaseCcd').val(lstCCaseCcd);
		
		getDealList();

		var dtoParam = {
			"ibDealNo": ibDealNo
			, "fileIbDealNo": ibDealNo
			, "fileRiskInspctCcd": riskInspctCcd
			, "fileLstCCaseCcd": lstCCaseCcd
		};

		dealInfo(dtoParam);
		fileInfo(dtoParam);
		docInfo(dtoParam);
		
	}
}

// 셀렉트박스 내용 취득
function loadSelectBoxContents() {
	loadRsltnCnfrncCcd();			// 전결협의체
	loadRiskInspctRsltnCcd();		// 결의협의체(심사협의구분코드)
	loadRsltnRsltCd();				// 결의결과
}

// 전결협의체
function loadRsltnCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R011",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04010S_riskInspctRsltnCcd').html(html);			// 전결협의체

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04010S_riskInspctRsltnCcd').html(html);
		}
	});
}

// 결의협의체(심사협의구분코드)
function loadRiskInspctRsltnCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04010S_inspctCnfrncCcd').html(html);			// 결의협의체

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04010S_inspctCnfrncCcd').html(html);
		}
	});
}

// 결의결과 RSLTN_RSLT_CD
function loadRsltnRsltCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/R006",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS04010S_rsltnRsltCd').html(html);
			
			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04010S_rsltnRsltCd').html(html);
		}
	});
}

function getDealList() {

	let ibDealNo = $('#AS04010S_ibDealNo').val();

	// 유효성검사
	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal번호를 입력해 주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var dtoParam = {
			"ibDealNo": ibDealNo
		};

		$.ajax({
			type: "GET",
			url: "/AS04010S/getDealList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealInfo = data;

				$('#AS04010S_ibDealList').html(html);

				if (!isEmpty(dealInfo) > 0) {
					$.each(dealInfo, function(key, value) {
						html += '<tr ondblclick="setCouncilInfo(this)">';
						html += '<td>' + value.ibDealNo + '</td>';												// ibDeal번호
						html += '<td>' + value.ibDealNm + '</td>';												// ibDeal명
						html += '<td>' + value.riskInspctCcdNm + '</td>';										// 리스크심사구분코드명
						html += '<td style="display:none">' + value.riskInspctCcd + '</td>';						// 리스크심사구분코드
						html += '<td>' + value.lstCCaseCcdNm + '</td>';											// 부수안건구분코드명
						html += '<td style="display:none">' + value.lstCCaseCcd + '</td>';						// 부수안건구분코드
						html += '<td>' + value.invstCrncyCdNm + '</td>';											// 통화
						html += '<td class="text-right">' + Number(value.ptcpAmt).toLocaleString() + '</td>';	// 참여금액
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';										// 심사진행상태명
						html += '<td style="display:none">' + value.inspctPrgrsStCd + '</td>';					// 심사진행상태
						if (value.rqsDocNo == null) {
							html += '<td></td>';
						} else {
							html += '<td>' + value.rqsDocNo + '</td>';												// 수신문서번호
						}
						html += '</tr>';
					});
				} else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#AS04010S_ibDealList').html(html);
			},
			error: function(){
				var html = '';
				$('#AS04010S_ibDealList').html(html);
				
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "심사안건 배정되지 않았습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

function setCouncilInfo(e) {
	var tr = $(e);							// function을 호출한 곳의 값을 가져온다. (this)
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();			// ibDeal번호
	var riskInspctCcd = td.eq(3).text();	// 리스크심사구분코드
	var lstCCaseCcd = td.eq(5).text();		// 부수안건구분코드번호
	var inspctPrgrsStCd = td.eq(9).text();		// 부수안건구분코드번호

	switch (inspctPrgrsStCd) {
		case "200":
			$('.ibox-content .btn-success').prop('disabled', false);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
		case "300":
			$('.ibox-content .btn-success').prop('disabled', false);
			$('.ibox-content .btn-info').prop('disabled', false);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
		case "310":
			$('.ibox-content .btn-success').prop('disabled', true);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', false);
			break;
		default:
			$('.ibox-content .btn-success').prop('disabled', true);
			$('.ibox-content .btn-info').prop('disabled', true);
			$('.ibox-content .btn-danger').prop('disabled', true);
			break;
	}
	
	$('#AS04010S_selectedDealNo').val(ibDealNo);
	$('#fileIbDealNo').val(ibDealNo);
	$('#fileRiskInspctCcd').val(riskInspctCcd);
	$('#fileLstCCaseCcd').val(lstCCaseCcd);

	var dtoParam = {
		"ibDealNo": ibDealNo
		, "riskInspctCcd": riskInspctCcd
		, "lstCCaseCcd": lstCCaseCcd
		, "fileIbDealNo": ibDealNo
		, "fileRiskInspctCcd": riskInspctCcd
		, "fileLstCCaseCcd": lstCCaseCcd
	};

	dealInfo(dtoParam);
	fileInfo(dtoParam);
	docInfo(dtoParam);
}

function dealInfo(dtoParam) {
	$.ajax({
		type: "GET",
		url: "/AS04010S/getDealDetail",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var dealInfo = data;
			
			if (!isEmpty(dealInfo.rsltnCnfrncCcd)) {
				$('#AS04010S_riskInspctRsltnCcd').val(dealInfo.riskInspctRsltnCcd).prop("selected", true);		// 결의협의체	
			} else{
				$('#AS04010S_rsltnCnfrncCcd option:eq(0)').prop("selected", true);								// 결의협의체
			}
			if (!isEmpty(dealInfo.fstCnfrncF)) {
				$('#AS04010S_fstCnfrncF').val(dealInfo.fstCnfrncF).prop("selected", true);						// 지주사전협의	
			} else {
				$('#AS04010S_fstCnfrncF option:eq(1)').prop("selected", true);									// 지주사전협의
			}
			
			$('#AS04010S_rprStrtDt').val(dealInfo.rprStrtDt);													// 협의시작일
			$('#AS04010S_ofclDocAcptDt').val(dealInfo.ofclDocAcptDt);											// 공문접수일
			$('#AS04010S_aplcExptDt').val(dealInfo.aplcExptDt);													// 부의예정일
			
			$('#AS04010S_cnclRsnCntnt').val(dealInfo.cnclRsnCntnt);												// 취소사유
			
			$('#AS04010S_rsltnDt').val(dealInfo.rsltnDt);														// 결의일
			$('#AS04010S_inspctCnfrncCcd').val(dealInfo.inspctCnfrncCcd).prop('selected', true);				// 결의협의체
			$('#AS04010S_inspctCnfrncSqcSq').val(dealInfo.inspctCnfrncSqcSq);									// 회차정보
			$('#AS04010S_rnkNo').val(dealInfo.rnkNo);															// 순서정보
			
			$('#AS04010S_rsltnRsltCd').val(dealInfo.rsltnRsltCd).prop('selected', true);						// 결의결과
			$('#AS04010S_invstCrncyCd').val(dealInfo.invstCrncyCdNm);											// 투자통화코드
			$('#AS04010S_rcgAmt').val(dealInfo.rcgAmt);															// 승인금액
			$('#AS04010S_sdnCndtF').val(dealInfo.sdnCndtF);														// 승인조건(셀다운)
			$('#AS04010S_etcCndtF').val(dealInfo.etcCndtF);														// 승인조건(기타)
			
			$('#AS04010S_rsltCntnt').val(dealInfo.rsltCntnt);													// 결과의견
		}
	});
}

function fileInfo(dtoParam) {

	$.ajax({
		type: "GET",
		url: "/getFiles",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
						
			if (data.length > 0) {
				callbackFile('select', data);
			}else{
				$('#AS04010_fileList').empty();
			}
		}
	});
}

function docInfo(dtoParam) {
	$.ajax({
		type: "GET",
		url: "/getDocInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {	
			var html = '';	
			$('#AS04010_docList').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					if(value.raFnlDocF == 'Y'){			// 최종문서만 표기
						// TODO : raRmrk(urlLink) a 태그로 링크 달아야함
						html += '<tr>';
						html += '<td>' + value.itemSq + '</td>';
						html += '<td>' + value.raDocNo + '</td>';
						html += '</tr>';
					}
				});
			} else {
				html += '<tr>';
				html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			$('#AS04010_docList').html(html);
		}
	});
}

// 협의체부의 저장
function saveDealInfo() {

	var ibDealNo = $('#AS04010S_selectedDealNo').val();
	var riskInspctCcd = $('#fileRiskInspctCcd').val();
	var lstCCaseCcd = $('#fileLstCCaseCcd').val();
	
	var inspctPrgrsStCd = '300';										// 심사진행상태코드

	var riskInspctRsltnCcd = $('#AS04010S_riskInspctRsltnCcd').val();	// 전결협의체
	var fstCnfrncF = $('#AS04010S_fstCnfrncF').val();					// 지주사전협의

	var rprStrtDt = $('#AS04010S_rprStrtDt').val();						// 협의시작일
	var ofclDocAcptDt = $('#AS04010S_ofclDocAcptDt').val();				// 공문접수일일
	var aplcExptDt = $('#AS04010S_aplcExptDt').val();					// 부의예정일

	var cnclRsnCntnt = $('#AS04010S_cnclRsnCntnt').val();				// 취소사유

	if (!isEmpty(ibDealNo)) {
		if (!isEmpty(rprStrtDt) && !isEmpty(ofclDocAcptDt) && !isEmpty(aplcExptDt)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "부의일정정보를 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}
	
	function businessFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "inspctPrgrsStCd": inspctPrgrsStCd
			, "riskInspctRsltnCcd": riskInspctRsltnCcd
			//, "rsltnCnfrncCcd": rsltnCnfrncCcd
			, "fstCnfrncF": fstCnfrncF
			, "rprStrtDt": rprStrtDt
			, "ofclDocAcptDt": ofclDocAcptDt
			, "aplcExptDt": aplcExptDt
			, "cnclRsnCntnt": cnclRsnCntnt
		}

		$.ajax({
			type: "POST",
			url: "/AS04010S/saveDealInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "협의체부의 정보를 저장하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "협의체부의 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
			
	}

}

// 부의상태코드 변경
function updateDealInfo(param) {
	var ibDealNo =  $('#AS04010S_selectedDealNo').val();
	var riskInspctCcd =  $('#AS04010S_riskInspctCcd').val();
	var lstCCaseCcd =  $('#AS04010S_lstCCaseCcd').val();
	var inspctPrgrsStCd = '';
	var text = '';
	
	if (!isEmpty(ibDealNo)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}
	
	function businessFunction() {
		if (param == 'incRegist') {
			inspctPrgrsStCd = '310';
			text = '협의체 부의등록 상태로 변경하였습니다.';
		} else if (param == 'incCancel') {
			inspctPrgrsStCd = '300';
			text = '협의체 부의취소 상태로 변경하였습니다.';
		}

		var dtoParam = {
			"ibDealNo": ibDealNo
			, "inspctPrgrsStCd": inspctPrgrsStCd
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
		}

		$.ajax({
			type: "POST",
			url: "/AS04010S/updateDealInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: text
					, confirmButtonText: "확인"
				}).then((result) => {
					location.reload();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "협의체부의 정보를 변경하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}



/**
 * 파일ajax 성공시 custom callback 함수
 */
function callbackFile(action, result) {
	var html = '';
	var temp = '';
	if (action == 'upload') {
		html = makeFilList(html, result);
		$('#AS04010_fileList').append(html);
	} else if (action == 'delete'
		    || action == 'select') {
		for (let i = 0 ; i < result.length ; i++) {
			let fileInfo = result[i];
			html += makeFilList(temp, fileInfo);
		}
		$('#AS04010_fileList').empty();
		$('#AS04010_fileList').append(html);
	}
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
	html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
	html += '    </td>';
	html += '    <td><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '</tr>';
	
	return html;
}
