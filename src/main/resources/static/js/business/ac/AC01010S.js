var codeId = '';

$(function() {
	//select박스 코드 그룹 호출 함수
	getCommonCodeInfo();
	//코드구분 select박스 선택
	selectCommonCode();
	//그룹코드의 코드관리 상세버튼 클릭
	clickDetailButton();
	//변경 가능한 컬럼 더블클릭 했을시 input박스 생성
	doubleClickColumn();
});

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
function doubleClickColumn() {
	$(document).on('dblclick', '.update_column', function() {
		let trClass = $(this).attr('class').split(' ')[1]

		tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
		if (trClass == "cmnsCdClsf") {
			tdInputHTML = '<select class="' + trClass + '_select" style="width: 100%;">';
			tdInputHTML += '<option value = "1">일반코드</option>';
			tdInputHTML += '<option value = "2">변환코드</option>';
			tdInputHTML += '</select>';
		}

		$(this).html(tdInputHTML);
	});
}

/*******************************************************************
 *** 조회 영역 event
 *******************************************************************/
/**
 * select박스 코드 그룹 호출 함수
 */
var getCommonCodeInfo = function() {
	$.ajax({
		url: '/AC01010S/commonCodeInfo',
		method: 'GET',
		dataType: 'json'
	}).done(function(commonCodeInfo) {
		let commonCodeOption = '<option value="">전체</option>';
		for (let i = 0; i < commonCodeInfo.length; i++) {
			let commonCode = commonCodeInfo[i];
			commonCodeOption += '<option value="' + commonCode.cmnsCdGrp + '">' + commonCode.cmnsCdGrpExpl + ' (' + commonCode.cmnsCdGrp + ')</option>';
		}
		$('#commonCodeInfo').html(commonCodeOption);
	});
}

/**
 * 코드구분 select박스 선택
 */
function selectCommonCode() {
	$(document).on('click', '#commonCodeSearch', function() {
		let cmnsCdGrp = $('#commonCodeInfo option:selected').val()
		getGroupCodeInfoList(cmnsCdGrp);
	});
}

/*******************************************************************
 *** 상단 그리드 event
 *******************************************************************/
/**
 * 그룹코드의 코드관리 상세버튼 클릭
 */
function clickDetailButton() {
	$(document).on('click', '.groupCodeDetail', function(e) {
		e.preventDefault();
		codeId = $(this).attr('id');
		getGroupCodeInfo(codeId);
	});
}

/**
 * 그룹코드 행추가 버튼 클릭
 */
function addGroupCodeRow() {
	let ROW_HTML = '';
	ROW_HTML += '<tr>';
	ROW_HTML += '   <td><input type="checkbox"></td>';
	ROW_HTML += '   <td><input type="text" maxlength="4"></td>';
	ROW_HTML += '   <td><input type="text"></td>';
	ROW_HTML += '   <td><input type="text"></td>';
	ROW_HTML += '   <td><select class="cmnsCdClsf">';
	ROW_HTML += '	<option value="1">일반코드</option>';
	ROW_HTML += '	<option value="2">변환코드</option></select></td>';
	ROW_HTML += '   <td><input type="text" maxlength="1"></td>';
	ROW_HTML += '   <td><input class="group_code_use_yn" type="checkbox"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '</tr>';
	$('#groupCodeListTable').append(ROW_HTML);
}

/**
 * 그룹코드 행삭제 버튼 클릭
 */
function deleteGroupCodeRow() {
	var groupCodeList = new Array();
	var tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		var deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");

		var groupCdId = $(tr[i]).find("td:eq(1)").text();

		if (isEmpty(groupCdId)) {
			$(tr[i]).remove();
		}

		if (deleteCheckBox.is(":checked") && isNotEmpty(groupCdId)) {
			groupCodeList.push(deleteCheckBox.attr("id"));
		}
	}

	if (groupCodeList.length != 0) {
		deleteGroupCode(groupCodeList);
	}
}

/**
 * 그룹코드 저장 버튼 클릭
 * validation check
 */
function clickSaveGroupCode() {
	let groupCodeList = [];

	let tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let groupCode = new Object();

		let groupCodeInput = $(tr[i]).find("td:eq(1)").find("input");
		let groupCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
		let groupCodeExplainInput = $(tr[i]).find("td:eq(3)").find("input");
		let groupCodeCmnsClsf = $(tr[i]).find("td:eq(4)").find("select").find("option:selected");
		let groupCodeLengthInput = $(tr[i]).find("td:eq(5)").find("input");
		let groupCodeUseYn = $(tr[i]).find("td:eq(6)").find(".group_code_use_yn").prop("checked");
		let groupCodeUseYnCheck = $(tr[i]).find("td:eq(6)").find(".hidden_yn").val();


		if (groupCodeInput.length == 1) {
			if (groupCodeInput.val().length != 4) {
				openPopup({
					title: '실패', text: '그룹코드는 4자리 여야 합니다.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeInput.focus();
						});
					}
				});
				return;
			} else if (!groupCodeInput.val()) {
				openPopup({
					title: '실패', text: '그룹코드를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrp = groupCodeInput.val();
		}

		if (groupCodeNameInput.length == 1) {
			if (!groupCodeNameInput.val()) {
				openPopup({
					title: '실패', text: '그룹명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeNameInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdNm = groupCodeNameInput.val();
		}
		if (groupCodeCmnsClsf.length == 1) {
			if (!groupCodeCmnsClsf.val()) {
				openPopup({
					title: '실패', text: '코드성격을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeCmnsClsf.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdClsf = groupCodeCmnsClsf.val();
		}
		if (groupCodeLengthInput.length == 1) {
			if (!groupCodeLengthInput.val()) {
				openPopup({
					title: '실패', text: '코드 길이를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			} else if (isNaN(groupCodeLengthInput.val())) {
				openPopup({
					title: '실패', text: '코드 길이를 숫자로 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cdLngth = groupCodeLengthInput.val();
		} else {
			if (groupCodeInput.length == 1 || groupCodeNameInput.length == 1 || groupCodeExplainInput.length == 1 || groupCodeCmnsClsf.length == 1) {
				groupCode.cdLngth = $(tr[i]).find("td:eq(5)").html();
			}
			
			if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
				if(groupCodeLengthInput.length == 0) {
					groupCode.cdLngth = $(tr[i]).find("td:eq(5)").html();
				}
			}
		}

		if (groupCodeExplainInput.length == 1) {
			if (!groupCodeExplainInput.val()) {
				openPopup({
					title: '실패', text: '코드 설명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeExplainInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrpExpl = groupCodeExplainInput.val();
		}

		if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
			groupCode.useYn = groupCodeUseYn ? '1' : '0';
		}

		if (!(Object.keys(groupCode).length === 0)) {
			groupCode.oldCmnsCdGrp = $(tr[i]).find("td:eq(0)").find("input").attr("id");

			groupCodeList.push(groupCode);
		}
	}

	if (groupCodeList.length != 0) {
		saveGroupCode(groupCodeList);
	}
}

/**
 * 그룹코드 리스트 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfoList = function(cmnsCdGrp) {
	let _url = '/AC01010S/groupCodeInfoList';

	if (cmnsCdGrp) {
		_url += '?cmnsCdGrp=' + cmnsCdGrp;
	}

	$.ajax({
		url: _url,
		method: 'GET',
		dataType: 'json'
	}).done(function(groupCodeInfoList) {
		let groupCodeInfoHTML = '';
		if (groupCodeInfoList.length > 0) {
			for (let i = 0; i < groupCodeInfoList.length; i++) {
				let groupCodeInfo = groupCodeInfoList[i];

				if (groupCodeInfo.cmnsCdClsf < 2) {
					groupCodeInfo.cmnsCdClsf = "일반코드";
				} else if (groupCodeInfo.cmnsCdClsf > 1) {
					groupCodeInfo.cmnsCdClsf = "변환코드"
				}
				groupCodeInfoHTML += '<tr>';
				groupCodeInfoHTML += '  <td><input id="' + groupCodeInfo.cmnsCdGrp + '" style="width:100%" type="checkbox"></td>';
				groupCodeInfoHTML += '  <td class="update_column group_code">' + groupCodeInfo.cmnsCdGrp + '</td>';
				groupCodeInfoHTML += '  <td class="update_column group_code_name text-left">' + groupCodeInfo.cmnsCdNm + '</td>';
				groupCodeInfoHTML += '  <td class="update_column text-left">' + groupCodeInfo.cmnsCdGrpExpl + '</td>';
				groupCodeInfoHTML += '  <td class="update_column cmnsCdClsf">' + groupCodeInfo.cmnsCdClsf + '</td>';
				groupCodeInfoHTML += '  <td class="update_column group_code_length">' + groupCodeInfo.cdLngth + '</td>';
				if (groupCodeInfo.useYn === '1') {
					groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
				} else {
					groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
				}
				groupCodeInfoHTML += '  <td style="text-align:center;"><button class="groupCodeDetail btn btn-warning btn-xs" id="' + groupCodeInfo.cmnsCdGrp + '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';
				groupCodeInfoHTML += '  <td style="text-align:center;">' + handleNullData(formatDate(groupCodeInfo.rgstDt)) + '</td>';
				groupCodeInfoHTML += '  <td style="text-align:center;">' + handleNullData(groupCodeInfo.hndDetlDtm) + '</td>';
				groupCodeInfoHTML += '  <td style="text-align:center;">' + handleNullData(groupCodeInfo.hndEmpnm) + '</td>';
				groupCodeInfoHTML += '</tr>';
			}
		} else {
			groupCodeInfoHTML += '<tr>';
			groupCodeInfoHTML += '	<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';
			groupCodeInfoHTML += '</tr>';
		}

		$('#groupCodeListTable').html(groupCodeInfoHTML);
	});
}

/**
 * 그룹코드 저장 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var saveGroupCode = function(groupCodeList) {
	$.ajax({
		method: 'POST',
		url: '/AC01010S/registGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: function(data) {
			getGroupCodeInfoList();
			getCommonCodeInfo();
			Swal.fire({
				icon: 'success'
				, title: "그룹코드 등록이 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
			let message = response.responseJSON.message;
			openPopup({
				title: '실패',
				text: message
			});
		}
	});
}

/**
 * 그룹코드 행 삭제 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var deleteGroupCode = function(groupCodeList) {
	$.ajax({
		method: 'PATCH',
		url: '/AC01010S/deleteGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			Swal.fire({
				icon: 'success'
				, title: "그룹코드 삭제가 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
			getGroupCodeInfoList();
			getCommonCodeInfo();
		},
		error: function(response) {
			Swal.fire({
				icon: 'error'
				, title: "문제가 발생했습니다."
				, text: "관리자에게 문의하세요."
				, confirmButtonText: "확인"
			});
		}
	});
}

/*******************************************************************
 *** 하단 그리드 event
 *******************************************************************/
/**
 * 그룹코드 상세보기 데이터 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfo = function(cmnsCdGrp) {
	$.ajax({
		url: '/AC01010S/groupCodeInfo?cmnsCdGrp=' + cmnsCdGrp,
		method: 'GET',
		dataType: 'json'
	}).done(function(codeInfoList) {
		let codeInfoHTML = '';
		if (codeInfoList.length > 0) {
			for (let i = 0; i < codeInfoList.length; i++) {
				let codeInfo = codeInfoList[i];
				codeInfoHTML += '<tr id="' + cmnsCdGrp + '">';
				codeInfoHTML += '   <td><input id="' + codeInfo.cdVlId + '" style="width:100%" type="checkbox"><input type="hidden" value="' + cmnsCdGrp + '"></td>';
				codeInfoHTML += '   <td class="update_column">' + codeInfo.cdVlId + '</td>';
				codeInfoHTML += '   <td class="update_column text-left">' + codeInfo.cdVlNm + '</td>';
				if (codeInfo.rsltCdVl < 2) {
					codeInfo.rsltCdVl = "일반코드";
				} else if (codeInfo.rsltCdVl > 1) {
					codeInfo.rsltCdVl = "변환코드";
				}
				codeInfoHTML += '   <td class="update_column cmnsCdClsf">' + codeInfo.rsltCdVl + '</td>';
				codeInfoHTML += '   <td class="update_column">' + codeInfo.cdSq + '</td>';
				if (codeInfo.useYn === '1') {
					codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
				} else {
					codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
				}
				codeInfoHTML += '   <td style="text-align:center;">' + handleNullData(formatDate(codeInfo.rgstDt)) + '</td>';
				codeInfoHTML += '   <td style="text-align:center;">' + handleNullData(codeInfo.rgstEmpnm) + '</td>';
				codeInfoHTML += '   <td style="text-align:center;">' + handleNullData(codeInfo.hndDetlDtm) + '</td>';
				codeInfoHTML += '   <td style="text-align:center;">' + handleNullData(codeInfo.hndEmpnm) + '</td>';
				codeInfoHTML += '</tr>';
			}
		} else {
			codeInfoHTML += '<tr>';
			codeInfoHTML += '	<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
			codeInfoHTML += '</tr>';
		}

		$('#codeListTable').html(codeInfoHTML);
	});
}

/**
 * 코드 행추가 버튼 클릭
 */
function addCodeRow() {
	let td = $('#codeListTable').children().find('td');

	let ROW_HTML = '';
	ROW_HTML += '<tr>';
	ROW_HTML += '   <td><input style="width: 100%" type="checkbox"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text" maxlength="20"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td><select style="width:100%">';
	ROW_HTML += '	<option value="1">일반코드</option>';
	ROW_HTML += '	<option value="2">변환코드</option></select></td>';
	ROW_HTML += '   <td><input style="width: 50%;" type="text"></td>';
	ROW_HTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '</tr>';

	if (td.length === 1) {
		$('#codeListTable').html(ROW_HTML);
	} else if (td.length > 1) {
		$('#codeListTable').append(ROW_HTML);
	}
}

/**
 * 코드 행삭제 버튼 클릭
 */
function deleteCodeRow() {
	var request = new Object();
	var codeList = new Array();
	var tr = $('#codeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		var deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
		var groupCdId = $(tr[i]).find("td:eq(1)").text();

		if (isEmpty(groupCdId)) {
			$(tr[i]).remove();
		}

		if (deleteCheckBox.is(":checked") && isNotEmpty(groupCdId)) {
			codeList.push(deleteCheckBox.attr('id'));
		}
	}

	if (codeList.length > 0) {
		request.cmnsCdGrp = $(tr[0]).attr('id')
		request.cdVlIds = codeList;
	}

	if (Object.keys(request).length > 0) {
		deleteCode(request);
	}
}

/**
 * 코드 저장 버튼 클릭
 */
function clickSaveCode() {
	let codeList = new Array();
	let tr = $('#codeListTable').children();
	for (let i = 0; i < tr.length; i++) {
		let code = new Object();

		// TODO => 변수 할당 확인
		let groupCodeId = codeId;

		let oldCodeId		= $(tr[i]).find("td:eq(0)").find("input").attr('id');
		let codeInput		= $(tr[i]).find("td:eq(1)").find("input");
		let codeNameInput	= $(tr[i]).find("td:eq(2)").find("input");
		let codeRsltCdVl	= $(tr[i]).find("td:eq(3)").find("select").find("option:selected");
		let codeSqInput		= $(tr[i]).find("td:eq(4)").find("input");
		let codeUseYn		= $(tr[i]).find("td:eq(5)").find(".code_use_yn").prop("checked");
		let codeUseYnCheck	= $(tr[i]).find("td:eq(5)").find(".hidden_yn").val();

		if (codeInput.length == 1) {
			if (!codeInput.val()) {
				openPopup({
					title: '실패', text: '코드를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeInput.focus();
						});
					}
				});
				return;
			} else if (codeInput.val().length > 20) {
				openPopup({
					title: '실패', text: '코드는 20자리 이하로 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlId = codeInput.val();
		}

		if (codeNameInput.length == 1) {
			if (!codeNameInput.val()) {
				openPopup({
					title: '실패', text: '코드명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeNameInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlNm = codeNameInput.val();
		}

		if (codeRsltCdVl.length == 1) {
			code.rsltCdVl = codeRsltCdVl.val();
		}

		if (isEmpty(codeSqInput)) {
			openPopup({
				title: '실패', text: '순서를 입력해주세요.', type: 'error',
				callback: function() {
					$(document).on('click', '.confirm', function() {
						codeSqInput.focus();
					});
				}
			});
			return;
		} else {
			code.cdSq = codeSqInput.val();
		}

		if (!codeUseYnCheck || (codeUseYn && codeUseYnCheck === 'n') || (!codeUseYn && codeUseYnCheck === 'y')) {
			code.useYn = codeUseYn ? '1' : '0';
		}

		if (!(Object.keys(code).length === 0)) {
			code.oldCdVlId = oldCodeId;
			code.cmnsCdGrp = groupCodeId;
			codeList.push(code);
		}
	}

	if (codeList.length > 0) {
		saveCode(codeList);
	}
}


/**
 * 코드 저장 처리
 * @param {list} codeList 코드 리스트
 */
var saveCode = function(codeList) {
	var cmnsCdGrp = codeList[0].cmnsCdGrp;

	$.ajax({
		method: 'POST',
		url: '/AC01010S/registCodeInfo',
		data: JSON.stringify(codeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			getGroupCodeInfo(cmnsCdGrp);
			Swal.fire({
				icon: 'success'
				, title: "코드 등록이 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
			Swal.fire({
				icon: 'error'
				, title: "error!"
				, text: "코드 등록중 오류가 발생했습니다. 관리자에게 문의하세요."
				, confirmButtonText: "확인"
			});
		}
	});
}

/**
 * 코드 삭제 처리
 * @param {list} request 삭제코드 리스트
 */
var deleteCode = function(request) {
	var cmnsCdGrp = request.cmnsCdGrp;

	$.ajax({
		method: 'PATCH',
		url: '/AC01010S/deleteCodeInfo',
		data: JSON.stringify(request),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			getGroupCodeInfo(cmnsCdGrp);
			
			Swal.fire({
				icon: 'success'
				, title: "코드 삭제가 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
		}
	});
}