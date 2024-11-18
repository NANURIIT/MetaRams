var MMBRCount = 0;					// 위원정보 ID컨트롤 상수
var readyOption = false;

$(document).ready(function() {
	
	touchSpin();					// 결의년도 좌우 가산
	loadSelectBoxContents();		// 셀렉트박스 정보 취득
	selectBoxOnChangeFunction();	// 셀렉트박스 이벤 등록
	tableFunction();				// 테이블 이벤트등록 

});

function touchSpin() {
	//TouchSpin
	$(".touchspin").TouchSpin({
		verticalbuttons: true,
		buttondown_class: 'btn btn-white',
		buttonup_class: 'btn btn-white'
	});
}

// 셀렉트박스 내용 취득
function loadSelectBoxContents() {
	loadInspctCnfrncCcd();			// 전결협의체
}

// 전결협의체
function loadInspctCnfrncCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I006",
		dataType: "json",
		success: function(data) {
			var html = "";
			html += '<option value=""></option>';
			
			$('#AS04110S_inspctCnfrncCcd').html(html);			// 조회창 - 전결협의체
			$('#AS04110S_inspctCnfrncCcd2').html(html);			// 기본정보 - 전결협의체

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS04110S_inspctCnfrncCcd').html(html);
			$('#AS04110S_inspctCnfrncCcd2').html(html);
		}
	});
}

// 초기화버튼 - 협의체 전결협의체, 회차별로 조회 후 신규 회차 추가 시 사용
function btnReset() {

	if( $('#AS04110S_inspctPrgrsStCd2').val() != '') {

		// 버튼 활성화/비활성화
		$('#saveButton').attr("disabled", false);
		$('#confirmButton').attr("disabled", false);
		$('#cancleButton').attr("disabled", true);

		//협의체 기본정보 초기화 및 셋팅
		$('#AS04110S_inspctCnfrncSqcSq2').val(Number($('#AS04110S_inspctCnfrncSqcSq2').val())+1);
		$('#AS04110S_rsltnDt2').val('');
		$('#AS04110S_rsltnTm2').val('');
		$('#AS04110S_inspctPrgrsStCd2').val('');

		$('#AS04110_fileList').html('');
		//$('#AS04110S_MMBRList').html('');
		$('#AS04110S_CASEList').html('');

	}


}

// 셀렉트박스 변경이벤트 function 집합
function selectBoxOnChangeFunction() {
	SB_inspctCnfrncCcd();				// 전결협의체 셀렉트박스 변경
}

// 전결협의체 셀렉트박스 변경
function SB_inspctCnfrncCcd() {
	$("#AS04110S_inspctCnfrncCcd").change(function() {
		getLastCNFRNCInfo();
	})
}

// 협의체 마지막회차 정보를 가져옴
function getLastCNFRNCInfo() {
	var inspctCnfrncCcd = $('#AS04110S_inspctCnfrncCcd').val();
	var stdYr = $('#AS04110S_stdYr').val();

	var paramData = {
		  "cnsbDcd": inspctCnfrncCcd
		, "rsltnYr": stdYr
	}

	$.ajax({
		type: "GET",
		url: "/AS04110S/getLastCNFRNCInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {
			$('#AS04110S_stdYr').val(data.rsltnYr);								// 결의년도
			$('#AS04110S_inspctCnfrncSqcSq').val(data.sn);						// 회차
			$('#AS04110S_rsltnDt').val(formatDate(data.cnsbOpnDt));				// 결의일
		},error: function () {
			$('#AS04110S_stdYr').val(new Date().getFullYear());					// 결의년도
			$('#AS04110S_inspctCnfrncSqcSq').val(1);							// 회차
			$('#AS04110S_rsltnDt').val('');										// 결의일
		}
	});

}

function getCNFRNCList() {
	var inspctCnfrncCcd = $('#AS04110S_inspctCnfrncCcd').val();						// 전결협의체
	var stdYr = $('#AS04110S_stdYr').val();											// 결의년도

	if( inspctCnfrncCcd === '' ){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "전결협의체 정보를 확인해주세요"
			, confirmButtonText: "확인"
		});
		return false;
	}

	var paramData = {
		  "cnsbDcd" : inspctCnfrncCcd
		, "rsltnYr" : stdYr
	};

	$.ajax({
		type: "GET",
		url: "/AS04110S/getCNFRNCList",
		data: paramData,
		dataType: "json",
		success: function(data) {	// 결의정보가 있을때
			var html = '';
			if( data.length > 0 ) {
				$.each(data, function (key, value) {
					html += '<tr ondblclick="getCNFRNCInfo(this);">'
					html += '<td class="text-center">' + value.cnsbDcdNm + ' ' + value.rsltnYr + '년도 ' + value.sn + '회차 협의체 결의' + '</td>';
					html += '<td style="display: none">' + value.cnsbDcd + '</td>';
					html += '<td style="display: none">' + value.rsltnYr + '</td>';
					html += '<td style="display: none">' + value.sn + '</td>';
					html += '<td style="display: none">' + value.cnsbOpnDt + '</td>';
					html += '</tr>';
				});

				$('#AS04110S_inspctCnfrncCcd2').val('');
				$('#AS04110S_inspctCnfrncSqcSq2').val('');
				$('#AS04110S_rsltnDt2').val('');
				$('#AS04110S_rsltnTm2').val('');
				$('#AS04110S_inspctPrgrsStCd2').val('');

			}else{
				$('#AS04110S_inspctCnfrncCcd2').val($('#AS04110S_inspctCnfrncCcd').val());
				$('#AS04110S_inspctCnfrncSqcSq2').val(1);
				$('#AS04110S_rsltnDt2').val('');
				$('#AS04110S_rsltnTm2').val('');
				$('#AS04110S_inspctPrgrsStCd2').val('');
			}
			$('#AS04110_cnfrncList').html(html);

			$('#AS04110S_MMBRList').empty();
			$('#AS04110S_CASEList').empty();
		},
		error: function() {

		}
	});

}

function getCNFRNCInfo(e) {
	var td = $(e).children();

	$('#AS04110_cnfrncList tr').removeClass('table-active');
	$(e).addClass('table-active');

	var inspctCnfrncCcd = td.eq(1).text();						// 전결협의체
	var stdYr = td.eq(2).text();								// 결의년도
	var inspctCnfrncSqcSq = td.eq(3).text();					// 회차
	var rsltnDt = td.eq(4).text();								// 결의일자
	
	if (!isEmpty(inspctCnfrncCcd) && !isEmpty(stdYr) && !isEmpty(inspctCnfrncSqcSq)) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "전결협의체 정보를 확인해주세요"
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {
		var paramData = {
			    "cnsbDcd" : inspctCnfrncCcd
			,   "rsltnYr" : stdYr
			,        "sn" : inspctCnfrncSqcSq
			, "cnsbOpnDt" : rsltnDt
		}
		
		// TODO: reset AS04110S
		// 페이지에서 기존정보 제거 후 취득
		$('#AS04110S_MMBRList').empty();
		$('#AS04110_fileList').empty();
		
		getCNFRNC(paramData);			// 결의협의회 기본정보
		
	}
}

// 결의협의회 기본정보
function getCNFRNC(paramData){
		$.ajax({
			type: "GET",
			url: "/AS04110S/getCNFRNCInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {	// 결의정보가 있을때
				$('#AS04110S_inspctCnfrncCcd2').val(data.cnsbDcd).prop('selected', true);
				$('#AS04110S_stdYr2').val(data.rsltnYr);
				$('#AS04110S_inspctCnfrncSqcSq2').val(Number(data.sn));
				$('#AS04110S_rsltnDt2').val(formatDate(data.cnsbOpnDt));
				$('#AS04110S_rsltnTm2').val(data.cnsbOpnTm);
				if(data.jdgmRsltDcd != '0'){
					$('#AS04110S_inspctPrgrsStCd2').val(data.jdgmRsltDcdNm);
				}
				if (Number(data.jdgmRsltDcd) < 303) {
					$('#saveButton').attr("disabled", false);
					$('#confirmButton').attr("disabled", true);
					$('#cancleButton').attr("disabled", true);
				} else if (Number(data.jdgmRsltDcd) === 303) {
					$('#saveButton').attr("disabled", false);
					$('#confirmButton').attr("disabled", false);
					$('#cancleButton').attr("disabled", true);
				} else if (Number(data.jdgmRsltDcd) === 304) {
					$('#saveButton').attr("disabled", true);
					$('#confirmButton').attr("disabled", true);
					$('#cancleButton').attr("disabled", false);
				} else {
					$('#saveButton').attr("disabled", true);
					$('#confirmButton').attr("disabled", true);
					$('#cancleButton').attr("disabled", true);
				}
				getMMBRInfo(paramData);			// 결의협의회 위원정보
				getCaseInfo(paramData);			// 결의협의회 안건정보

			},
			error: function() {			// 결의정보가 없을때
				$('#AS04110S_inspctCnfrncCcd2').val($('#AS04110S_inspctCnfrncCcd').val());
				var now = new Date();
				var year = now.getFullYear();
				$('#AS04110S_stdYr2').val(year);
				$('#AS04110S_inspctCnfrncSqcSq2').val(Number(1));
				$('#AS04110S_rsltnDt2').val("");
				$('#AS04110S_rsltnTm2').val("");
				$('#AS04110S_inspctPrgrsStCd2').val("");

				//
				$('#AS04110S_MMBRList').empty();
				$('#AS04110_fileList').empty();
				$('#AS04110S_CASEList').empty();

				// 버튼 컨트롤
				$('#saveButton').attr("disabled", false);
				$('#confirmButton').attr("disabled", true);
				$('#cancleButton').attr("disabled", true);
			}
		});
}

// 결의협의회 위원정보
function getMMBRInfo(paramData){
	var selectbox;
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/C003",
			async: false,
			dataType: "json",
			success: function(data) {
				selectbox = data;
			}
		});
		
		$.ajax({
			type: "GET",
			url: "/AS04110S/getMMBRInfo",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var MMBRInfo = data;
				
				if(MMBRInfo.length > 0){	// 있을경우
					var html = '';
					$.each(MMBRInfo, function(key, MMBR) {
						html += '<tr>';
						// td chkbox
						html += '<td style="vertical-align: middle;"><input type="checkbox" class="MMBRChk" id="MMBR_chkbox_' + (MMBRCount + 1) + '"></td>';

						// td selectbox
						html += '<td><select class="form-control" id="CMMTT_MMBR_CCD_' + (MMBRCount + 1) + '">';
						if (selectbox.length > 0) {
							$.each(selectbox, function(key, value) {
								if(MMBR.atdcTrgtDcd == value.CD_VL_ID){
									html += '<option value="' + value.CD_VL_ID + '" selected>' + value.CD_VL_NM + '</option>';
								} else {
									html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
								}
							});
						}
						html += '</select></td>';
						
						// td inputbox
						html += '<td>';
							html += '<div class="input-group">';
								html += '<input type="text" class="form-control" id="ATDNC_' + (MMBRCount + 1) + '_empNm" readonly value="' + MMBR.atdcTrgtEmpnm + '">';
								html += '<input type="hidden" id="ATDNC_' + (MMBRCount + 1) + '_empno" value="' + MMBR.atdcTrgtEmpno + '">';
								html += '<span class="input-group-append">';
									html += '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_' + (MMBRCount + 1) + '\')">';
										html += '<i class="fa fa-search"></i>';
									html += '</button>';
								html += '</span>';
							html += '</div>';
						html += '</td>';
						
						//td inputbox
						html += '<td>';
							html += '<div class="input-group">';
								html += '<input type="text" class="form-control" id="ATDNC_PRXY_' + (MMBRCount + 1) + '_empNm" readonly value="' + MMBR.atdcAngtEmpnm + '">';
								html += '<input type="hidden" id="ATDNC_PRXY_' + (MMBRCount + 1) + '_empno" value="' + MMBR.atdcAngtEmpno + '">';
								html += '<span class="input-group-append">';
									html += '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_PRXY_' + (MMBRCount + 1) + '\')">';
										html += '<i class="fa fa-search"></i>';
									html += '</button>';
								html += '</span>';
							html += '</div>';
						html += '</td>';

						html += '</tr>';
						
						MMBRCount++;
					});
					$('#AS04110S_MMBRList').append(html);
					
				}
			},
			error: function() {				// 없을경우
				
			}
		});
}

// 결의협의회 안건정보
function getCaseInfo(paramData){
	$.ajax({
		type: "GET",
		url: "/AS04110S/getCaseInfo",
		data: paramData,
		dataType: "json",
		success: function(data) {	// 안건정보가 있을때
			var dealList = data;
			if (dealList.length > 0) {	// 있을경우
				var html = '';
				$.each(dealList, function(key, value) {
					html += '<tr>';
					// chkbox
					html += '<td style="vertical-align: middle;">';
						html += '<input type="checkbox" class="CASEChk">';
					html += '</td>';
					// ibDealNo
					html += '<td style="display:none;">' + value.dealNo;
					html += '</td>';
					// 순서정보
					html += '<td>' + value.sn;
					html += '</td>';
					// 안건명
					html += '<td>' + value.mtrNm;
					html += '</td>';
					// 신규/재부의정보
					html += '<td style="display:none;">' + value.jdgmDcd;
					html += '</td>';
					html += '<td>' + value.jdgmDcdNm;
					html += '</td>';
					// 안건순번
					html += '<td style="display:none;">' + value.mtrDcd;
					html += '</td>';
					html += '<td>' + value.mtrDcdNm;
					html += '</td>';
					// 부서명
					html += '<td style="display:none;">' + value.dprtCd;
					html += '</td>';
					html += '<td>' + value.dprtNm;
					html += '</td>';
					// 직원명
					html += '<td style="display:none;">' + value.chrgPEno;
					html += '</td>';
					html += '<td>' + value.chrgPEnm;
					html += '</td>';
					// 심사역
					html += '<td style="display:none;">' + value.ownPEno;
					html += '</td>';
					html += '<td>' + value.ownPEnm;
					html += '</td>';
					
					// btn updown
					html += '<td>';
						html += '<button type="button" id="" class="btn btn-default btn-xs">';
							html += '<i class="fa fa-caret-up"></i>';
						html += '</button>';
						html += '<button type="button" id="" class="btn btn-default btn-xs">';
							html += '<i class="fa fa-caret-down"></i>';
						html += '</button>';
					html += '</td>';
					
					html += '</tr>';
					
					var dtoParam = {
						"fileIbDealNo": value.ibDealNo
						, "fileRiskInspctCcd": value.riskInspctCcd
						, "fileLstCCaseCcd": value.lstCCaseCcd
					};
					//fileInfo(dtoParam);
					
					$('#AS04110S_CASEList').html(html);
				});
			}
		},
		error: function() {			// 안건정보가 없을때
		}
	});
}

// 관련보고서 목록 호출
function fileInfo(dtoParam) {
	$.ajax({
		type: "GET",
		url: "/getFiles",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
						
			if (data.length > 0) {
				callbackFile('select', data);
			}
		}
	});
}

function callbackFile(action, result) {
	var html = '';
	var temp = '';

	if (action == 'upload') {
		html = makeFilList(html, result);
		$('#AS04110_fileList').append(html);
	} else if (action == 'delete'
		    || action == 'select') {
		for (let i = 0 ; i < result.length ; i++) {
			let fileInfo = result[i];
			html += makeFilList(temp, fileInfo);
		}
		$('#AS04110_fileList').append(html);
	}
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.orgFileNm);
	html += '<tr>';
	//html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
	//html += '    </td>';
	html += '    <td><a href="' + encUri + '">' + result.orgFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '    <td style="display:none;">' + result.ibDealNo + '</td>';
	html += '    <td style="display:none;">' + result.riskInspctCcd + '</td>';
	html += '    <td style="display:none;">' + result.lstCCaseCcd + '</td>';
	html += '</tr>';
	
	return html;
}

// 위원정보 행추가 버튼기능
function addMMBRRow() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/C003",
		dataType: "json",
		success: function(data) {
			var html = '';
			var codeList = data;
			//var tableTRCount = $('#AS04110S_MMBRList tr').length;		// 위원정보 테이블 현재 tr 개수(사용시에 +1 해주려고함) // 상수사용으로 미사용
			
			html += '<tr>';
			
			//td chkbox
			html += '<td style="vertical-align: middle;"><input type="checkbox" class="MMBRChk" id="MMBR_chkbox_' + (MMBRCount + 1) + '"></td>';
			
			//td selectbox
			html += '<td><select class="form-control" id="CMMTT_MMBR_CCD_' + (MMBRCount + 1) + '">';
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			html += '</select></td>';
			
			//td inputbox
			html += '<td>';
				html += '<div class="input-group">';
					html += '<input type="text" class="form-control" id="ATDNC_' + (MMBRCount + 1) + '_empNm" readonly>';
					html += '<input type="hidden" id="ATDNC_' + (MMBRCount + 1) + '_empno">';
					html += '<span class="input-group-append">';
						html += '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_' + (MMBRCount + 1) + '\')">';
							html += '<i class="fa fa-search"></i>';
						html += '</button>';
					html += '</span>';
				html += '</div>';
			html += '</td>';
			
			//td inputbox
			html += '<td>';
				html += '<div class="input-group">';
					html += '<input type="text" class="form-control" id="ATDNC_PRXY_' + (MMBRCount + 1) + '_empNm" readonly>';
					html += '<input type="hidden" id="ATDNC_PRXY_' + (MMBRCount + 1) + '_empno">';
					html += '<span class="input-group-append">';
						html += '<button type="button" class="btn btn-default" onclick="callTB03022P(\'ATDNC_PRXY_' + (MMBRCount + 1) + '\')">';
							html += '<i class="fa fa-search"></i>';
						html += '</button>';
					html += '</span>';
				html += '</div>';
			html += '</td>';
			
			html += '</tr>';
			
			$('#AS04110S_MMBRList').append(html);
			
			MMBRCount++;
		}
	});
}

// 테이블 이벤트등록 
function tableFunction() {
	MMBRChk();		// 위원정보 테이블 체크박스 이벤트 설정
	CASEChk();		// 안건정보 테이블 체크박스 이벤트 설정
					// TODO: 안건정보 업다운 버튼시 순서변경 이벤트
}

// 위원정보 테이블 체크박스 이벤트 설정
function MMBRChk() {
	$("#MMBRChk").change(function(){
        if($("#MMBRChk").is(":checked")){
            $('.MMBRChk').prop('checked', true);
        }else{
            $('.MMBRChk').prop('checked', false);
        }
    });
}

// 안건정보 테이블 체크박스 이벤트 설정
function CASEChk() {
	$("#CASEChk").change(function(){
        if($("#CASEChk").is(":checked")){
            $('.CASEChk').prop('checked', true);
        }else{
            $('.CASEChk').prop('checked', false);
        }
    });
}

// 테이블 행삭제 버튼기능
function delTableRow(tableId) {
	
	var tableIdCheckBox = '#' + tableId + ' input:checkbox:checked';
	var text = "";
	
	if(tableId == 'AS04110S_MMBRList'){
		text = "위원정보 체크박스를 확인해주세요."
	} else if(tableId == 'AS04110S_CASEList'){
		text = "안건정보 체크박스를 확인해주세요."
	} else {
		text = "체크박스를 확인해주세요."
	}
	
	// tr 체크된 갯수 확인
	var checkboxes = $(tableIdCheckBox);

	if (checkboxes.length > 0) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: text
			, confirmButtonText: "확인"
		});
	}


	function businessFunction() {
		checkboxes.each(function(i) {

			var tr = checkboxes.parent().parent();
			var td = $(tr).children();
			var ibDealNo = td.eq(1).text();
			var riskInspctCcd = td.eq(4).text();
			var lstCCaseCcd = td.eq(6).text();

			if(tableId == 'AS04110S_CASEList'){
				deleteFileInfo(ibDealNo, riskInspctCcd, lstCCaseCcd);
			}
			
			tr.remove();
		})
	}
}

function deleteFileInfo(ibDealNo, riskInspctCcd, lstCCaseCcd) {
	if ($("#CASEChk").is(":checked")) {
		$('#AS04110_fileList').empty();
	} else {
		$('#AS04110_fileList').find('tr').each(function(i, val) {
			var fileIbDealNo = $(val).find('td:eq(2)').html();
			var fileRiskInspctCcd = $(val).find('td:eq(3)').html();
			var fileLstCCaseCcd = $(val).find('td:eq(4)').html();

			if (fileIbDealNo == ibDealNo
			&&  fileRiskInspctCcd == riskInspctCcd
			&&  fileLstCCaseCcd == lstCCaseCcd) {
				val.remove();
			}
		});
	}
}

// 안건정보 추가 - AS02020P 에서 전달받음
function addDealInfo(ibDealNo, riskInspctCcd, lstCCaseCcd){
	
	var paramData = {
		     "dealNo" : ibDealNo
		,   "jdgmDcd" : riskInspctCcd
		,    "mtrDcd" : lstCCaseCcd
	}
	
	$.ajax({
		type: "GET",
		url: "/AS04110S/getDealDetail",
		data: paramData,
		dataType: "json",
		success: function(data) {

			businessFunction();			
				
			/*
			if (data.inspctPrgrsStCd == 310 || data.inspctPrgrsStCd == 330) {
				businessFunction();
			} else {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: '협의체 부의 등록 상태가 아닙니다.'
					, confirmButtonText: "확인"
				});
			}
			*/

			function businessFunction() {
				var trLength = $('#AS04110S_CASEList tr').length;
				
				html = '';
				html += '<tr>';
				// chkbox
				html += '<td>';
				html += '<input type="checkbox" class="CASEChk">';
				html += '</td>';

				// ibDealNo
				html += '<td style="display:none;">' + data.dealNo;
				html += '</td>';

				// rnkNo
				html += '<td>' + (trLength + 1);
				html += '</td>';

				// ibDealNm
				html += '<td>' + data.mtrNm;
				html += '</td>';

				// riskInspctCcd
				html += '<td style="display:none">' + data.jdgmDcd;
				html += '</td>';
				html += '<td>' + data.jdgmDcdNm;
				html += '</td>';

				// lstCCaseCcd
				html += '<td style="display:none">' + data.mtrDcd;
				html += '</td>';
				html += '<td>' + data.mtrDcdNm;
				html += '</td>';

				// dprtNm
				html += '<td style="display:none">' + data.dprtCd;
				html += '</td>';
				html += '<td>' + data.dprtNm;
				html += '</td>';

				// chrgPEno
				html += '<td style="display:none">' + data.chrgPEno;
				html += '</td>';
				html += '<td>' + data.chrgPNm;
				html += '</td>';

				// ownPEno
				html += '<td style="display:none">' + data.ownPEno;
				html += '</td>';
				html += '<td>' + data.ownPNm;
				html += '</td>';

				// btn updown
				html += '<td>';
				html += '<button type="button" id="" class="btn btn-default btn-xs">';
				html += '<i class="fa fa-caret-up"></i>';
				html += '</button>';
				html += '<button type="button" id="" class="btn btn-default btn-xs">';
				html += '<i class="fa fa-caret-down"></i>';
				html += '</button>';
				html += '</td>';

				html += '</tr>';

				$('#AS04110S_CASEList').append(html);
				
				var dtoParam = {
					"fileIbDealNo": data.ibDealNo
					, "fileRiskInspctCcd": data.riskInspctCcd
					, "fileLstCCaseCcd": data.lstCCaseCcd
				};
				
				//fileInfo(dtoParam);
			}

		}
	});
}

// AS04110S 임시저장버튼
function tempSave(){
	var MMBRListCount = $('#AS04110S_MMBRList tr').length;
	var CASEListCount = $('#AS04110S_CASEList tr').length;

	var inspctCnfrncSqcSq2 = $('#AS04110S_inspctCnfrncSqcSq2').val();

	if (!isEmpty(inspctCnfrncSqcSq2)) {
		if (MMBRListCount != 0 && CASEListCount != 0) {
			businessFunction();
		} else {
			if (MMBRListCount == "0") {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: '위원정보가 없습니다.'
					, confirmButtonText: "확인"
				});
			} else if (CASEListCount == "0") {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: '안건정보가 없습니다.'
					, confirmButtonText: "확인"
				});
			}
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: '회차정보를 확인하세요.'
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		/* 협의체 회차정보 */
		var inspctCnfrncCcd = $('#AS04110S_inspctCnfrncCcd2').val();
		var stdYr = $('#AS04110S_stdYr').val();
		var inspctCnfrncSqcSq = $('#AS04110S_inspctCnfrncSqcSq2').val();
		var rsltnDt = $('#AS04110S_rsltnDt2').val();
		var rsltnTm = $('#AS04110S_rsltnTm2').val();

		var dealList = [];
		var enoList = [];

		/* 협의체 안건정보 */
		for( var i = 0 ; i < CASEListCount ; i ++ ){
			var dealInfo = {
				  "cnsbDcd" : $('#AS04110S_inspctCnfrncCcd2').val()
				, "rsltnYr" : $('#AS04110S_stdYr').val()
				, "sn"      : $('#AS04110S_inspctCnfrncSqcSq2').val()
				, "dealNo"  : $('#AS04110S_CASEList tr').eq(i).children('td').eq(1).text()
				, "mtrDcd"  : $('#AS04110S_CASEList tr').eq(i).children('td').eq(6).text()
				, "jdgmDcd" : $('#AS04110S_CASEList tr').eq(i).children('td').eq(4).text()
			}
			dealList.push(dealInfo);
		}

		/* 협의체 위원정보 */
		for( var i = 0 ; i < MMBRListCount ; i ++ ){
			var enoInfo = {
				  "cnsbDcd"       : $('#AS04110S_inspctCnfrncCcd2').val()
				, "rsltnYr"       : $('#AS04110S_stdYr').val()
				, "sn"            : $('#AS04110S_inspctCnfrncSqcSq2').val()
				, "atdcTrgtDcd"   : $('#AS04110S_MMBRList tr').eq(i).children('td').eq(1).children().val()
				, "atdcTrgtEmpno" : $('#AS04110S_MMBRList tr').eq(i).children('td').eq(2).children().children().eq(1).val()
				, "atdcAngtEmpno" : $('#AS04110S_MMBRList tr').eq(i).children('td').eq(3).children().children().eq(1).val()
			}
			enoList.push(enoInfo);
		}

		var paramData = {
			"cnsbDcd" : inspctCnfrncCcd
			,   "rsltnYr" : stdYr
			,        "sn" : Number(inspctCnfrncSqcSq)
			, "cnsbOpnDt" : rsltnDt.replaceAll('-', '')
			, "cnsbOpnTm" : rsltnTm.replaceAll('-', '')
			// 안건정보
			, "dealList"  : dealList
			// 위원정보
			, "enoList"   : enoList
		};
		// 비동기통신요청
		$.ajax({
			type: "POST",
			url: "/AS04110S/tempSaveComtInfo",
			data: JSON.stringify(paramData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "임시저장에 성공하였습니다."
					, confirmButtonText: "확인"
				}).then( function (){
					getCNFRNCList();
				});
			},
			error: function () {
				Swal.fire({
					icon: 'error'
					, title: "error!"
					, text: "임시저장에 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});


	}
}

// 협의체 회차정보 저장
function saveIBIMS111BInfo() {
	var inspctCnfrncCcd = $('#AS04110S_inspctCnfrncCcd2').val();
	var stdYr = $('#AS04110S_stdYr').val();
	var inspctCnfrncSqcSq = $('#AS04110S_inspctCnfrncSqcSq2').val();
	var rsltnDt = $('#AS04110S_rsltnDt2').val();
	var rsltnTm = $('#AS04110S_rsltnTm2').val();

	var paramData = {
          "cnsbDcd": inspctCnfrncCcd
		, "rsltnYr": stdYr
		, "sn": inspctCnfrncSqcSq
		, "cnsbOpnDt": rsltnDt.replaceAll('-', '')
		, "cnsbOpnTm": rsltnTm.replaceAll('-', '')
	}

	$.ajax({
		type: "POST",
		url: "/AS04110S/saveIBIMS111BInfo",
		data: paramData,
		dataType: "json",
		success: function() {
		}
	});
}

// 협의체 상태 변경 - 준비확정 or 준비취소
function changeCNFRNCStatus(statusCode) {
	var td = $('#AS04110_cnfrncList .table-active').children();

	/* 협의체 기본정보 */
	var cnsbDcd = td.eq(1).text();
	var rsltnYr = td.eq(2).text();
	var sn = td.eq(3).text();
	var jdgmRsltDcd = statusCode;

	/* 협의체 안건정보 */
	var CASEListCount = $('#AS04110S_CASEList tr').length;

	var dealList = [];

	for( var i = 0 ; i < CASEListCount ; i ++ ){
		var dealInfo = {
			  "cnsbDcd" : $('#AS04110S_inspctCnfrncCcd2').val()
			, "rsltnYr" : $('#AS04110S_stdYr').val()
			, "sn"      : $('#AS04110S_inspctCnfrncSqcSq2').val()
			, "dealNo"  : $('#AS04110S_CASEList tr').eq(i).children('td').eq(1).text()
			, "mtrDcd"  : $('#AS04110S_CASEList tr').eq(i).children('td').eq(6).text()
			, "jdgmDcd" : $('#AS04110S_CASEList tr').eq(i).children('td').eq(4).text()
		}
		dealList.push(dealInfo);
	}

	var paramData = {
		  "cnsbDcd"     : cnsbDcd
		, "rsltnYr"     : rsltnYr
		, "sn"          : sn
		, "jdgmRsltDcd" : jdgmRsltDcd
		, "dealList"    : dealList
	}

	var text = '';
	if( statusCode === 303 ) {
		text = '준비확정이 완료되었습니다.'
	}else{
		text = '준비취소가 완료되었습니다.'
	}

	$.ajax({
		type: "POST",
		url: "/AS04110S/changeCNFRNCStatus",
		contentType: "application/json",
		data: JSON.stringify(paramData),
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

		}
	});


}

function confirmCancel() {
	saveRAA22BInfo("330");
	Swal.fire({
		icon: 'success'
		, title: "Success!"
		, text: "준비확정 상태로 변경하였습니다."
		, confirmButtonText: "확인"
	}).then((result) => {
		location.reload();
	});
}


