$(function () {
	//
    getAuthCode();

    clickDetailButton();
    doubleClickColumn();

    $(document).on('click', '.can_use_yn', function() {
        let useCheckBox = $(this);
        let modifyCheckBox = $(this).parent().parent().find("td:eq(5)").find(".can_modify_yn");
        if(!useCheckBox.prop('checked') && modifyCheckBox.prop('checked')) {
            modifyCheckBox.prop('checked', false);
        }
    });

    $(document).on('click', '.can_modify_yn', function() {
        let useChecked = $(this).parent().parent().find("td:eq(4)").find(".can_use_yn");
        let modifyChecked = $(this);
        if(!useChecked.prop('checked') && modifyChecked.prop('checked')) {
            useChecked.prop('checked', true);
        }
    });
});

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 권한명으로 검색
 */
function searchButtonClick() {
    let searchKeyword = $('#authCodeSearchInput').val();
    getAuthCode(searchKeyword);
}

/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
function doubleClickColumn() {
    $(document).on('dblclick', '.update_column', function () {
        let trClass = $(this).attr('class').split(' ')[1]
        tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
        $(this).html(tdInputHTML);
    });
}

/*******************************************************************
 *** 상단 그리드 event
 *******************************************************************/
/**
 * 권한목록 조회 ajax
 */
function getAuthCode(rghtCdNm) {
    let _url = '/getAuthCode';
    if (!isEmpty(rghtCdNm)) {
        _url += '?rghtCdNm=' + rghtCdNm;
    }
    ajaxCall({
        method: 'GET',
        url: _url,
        success: function (authCode) {
            let html = '';
            if (authCode.length > 0) {
                $.each(authCode, function (key, value) {
                    html += '<tr>';
                    html += '   <td><input id="' + value.athCd + '" style="width: 100%;" type="checkbox"></td>';
                    html += '   <td class="update_column auth_code">' + value.athCd + '</td>';
                    html += '   <td class="update_column auth_code_name">' + value.athCdNm + '</td>';
                    html += '   <td class="update_column auth_explain">' + value.athCdExpl + '</td>';
                    html += '   <td style="text-align:center;"><button class="detail_button btn btn-warning btn-xs" id="' + value.athCd + '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';
                    html += '   <td style="text-align:center;">' + formatDate(value.rgstDt) + '</td>';
                    html += '   <td style="text-align:center;">' + value.rgstEmpNm + '</td>';
                    if (value.aplyYn === 'Y') {
                        html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="Y"></td>';
                    } else {
                        html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="N"></td>';
                    }
                    html += '   <td style="text-align:center;">' + value.hndDt + '</td>';
                    html += '   <td style="text-align:center;">' + value.hndTm + '</td>';
                    html += '   <td style="text-align:center;">' + value.hndEmpNm + '</td>';
                    html += '</tr>';
                });
            } else {
                html += '<tr>';
                html += '   <td colspan="12" style="text-align: center">데이터가 없습니다.</td>';
                html += '</tr>';
            }
            $('#authCodeTable').html(html);

        }
    });
}



/**
 * 행추가 버튼 클릭
 */
function addAuthCodeRow() {
    let html = '';
    html += '<tr class="addNewAuth">';
    html += '   <td></td>';
    html += '   <td><input class="auth_code_input" style="width: 100%;" type="text"></td>';
    html += '   <td><input class="auth_code_name_input" style="width: 100%;" type="text"></td>';
    html += '   <td><input class="auth_explain_input" style="width: 100%;" type="text"></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td><input style="width:100%;" class="auth_code_use_yn" type="checkbox"></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '   <td></td>';
    html += '</tr>';
    $('#authCodeTable').append(html);
    $('.auth_code_input').focus();
}

/**
 * 권한코드 상세버튼 클릭
 */
function clickDetailButton() {
    $(document).on('click', '.detail_button', function () {
        let rghtCd = $(this).attr('id');
        getAuthCodeMenu(rghtCd);
    });
}

/**
 * 권한코드별 상세 메뉴 호출
 * @param {권한코드} rghtCd 
 */
function getAuthCodeMenu(rghtCd) {
    ajaxCall({
        method: 'get',
        url: '/getAuthCodeMenu?rghtCd=' + rghtCd,
        success: function (authCodeMenu) {
            let html = '';
            if (authCodeMenu.length > 0) {
                $.each(authCodeMenu, function (key, value) {
                    html += '<tr>';
                    html += '   <td>' + (key + 1) + '</td>';
                    html += '   <td>' + value.menuId + '</td>';
					html += '   <td>' + value.menuNm + '</td>';
                    html += '   <td>'+ rghtCd +'</td>';
                    html += '   <td>' + value.menuLvl + '</td>';
                    if (isEmpty(value.mdfyRghtCcd)) {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="N"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="N"></td>';
                    } else if(value.mdfyRghtCcd === '1') {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="Y"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="N"></td>';
                    } else {
                        html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="Y"></td>';
                        html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" checked onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="Y"></td>';
                    }
					if (isEmpty(value.hndDetlDtm)) {
                    	html += '   <td style="text-align:center;"></td>';
						html += '   <td style="text-align:center;"></td>';
					} else {
						html += '   <td style="text-align:center;">' + value.hndDetlDtm.substring(0, 10) + '</td>';
						html += '   <td style="text-align:center;">' + value.hndDetlDtm.substring(10, value.hndDetlDtm.length) + '</td>';
					}
                    html += '   <td style="text-align:center;">' + value.hndEmpNm + '</td>';
                    html += '</tr>';
                });
            } else {
                html += '<tr>';
                html += '   <td colspan="9" style="text-align: center">데이터가 없습니다.</td>';
                html += '</tr>';
            }
            $('#authCodeMenuTable').html(html);
        }
    });
}


/**
 * 행삭제 버튼 클릭
 */
function clickDeleteButton() {
    let tr = $('#authCodeTable').children();
    let authCodeList = [];
    for (let i = 0; i < tr.length; i++) {
        let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
        if (deleteCheckBox.is(":checked")) {
            authCodeList.push(deleteCheckBox.attr("id"));
        }
    }
    deleteRow(authCodeList);
}

/**
 * 행삭제 ajax
 * @param {권한코드 리스트} authCodeList 
 */
function deleteRow(authCodeList) {
    
    ajaxCall({
        method: 'patch',
        url: '/deleteAuthCode',
        data: authCodeList,
        success: function () {
            getAuthCode();
            Swal.fire({
                icon: 'success'
                , title: "권한삭제가 완료되었습니다"
                , text: ""
                , confirmButtonText: "확인"
            });	 
        }
    });
}

/**
 * 권한코드 저장버튼 클릭 event
 */
function clickAuthSaveButton() {

    let authCodeList = [];
    let tr = $('#authCodeTable').children();

    for (let i = 0; i < tr.length; i++) {

        let authCode = {};
        let authCodeInput = $(tr[i]).find("td:eq(1)").find("input");
        let authCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
        let authExplainInput = $(tr[i]).find("td:eq(3)").find("input");
        let authCodeUseYn = $(tr[i]).find("td:eq(7)").find(".auth_code_use_yn").prop("checked");
        let authCodeUseYnCheck = $(tr[i]).find("td:eq(7)").find(".hidden_yn").val();
        
        if (authCodeInput.length === 1) {
            if (!authCodeInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한코드를 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeInput.focus();
                        });
                    }
                });
                return;
            } else if (authCodeInput.val().length > 4) {
                openPopup({
                    title: '실패',
                    text: '권한코드는 4자리 이하로 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.athCd = authCodeInput.val();
        }

        if (authCodeNameInput.length === 1) {
            if (!authCodeNameInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한명를 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeNameInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.athCdNm = authCodeNameInput.val();
        }

        if (authExplainInput.length === 1) {
            if (!authExplainInput.val()) {
                openPopup({
                    title: '실패',
                    text: '권한설명을 입력해주세요.',
                    type: 'error',
                    callback: function () {
                        $(document).on('click', '.confirm', function () {
                            authCodeNameInput.focus();
                        });
                    }
                });
                return;
            }
            authCode.athCdExpl = authExplainInput.val();
        }
        
        if (!authCodeUseYnCheck || (!authCodeUseYn && authCodeUseYnCheck === 'Y') || (authCodeUseYn && authCodeUseYnCheck === 'N')) {
            authCode.aplyYn = authCodeUseYn ? "Y" : "N";
        }

        if (!(Object.keys(authCode).length === 0)) {
            authCode.oldAthCd = $(tr[i]).find("td:eq(0)").find("input").attr("id");
            authCodeList.push(authCode);
        }
    }

    if (authCodeList.length > 0) {
        saveAuthCode(authCodeList);
    }
}

/**
 * 권한코드 저장 ajax
 * @param {권한코드 리스트} authCodeList 
 */
function saveAuthCode(authCodeList) {
    
    ajaxCall({
        url: '/registerAuthCode',
        method: 'POST',
        data: authCodeList,
        success: function (data, status, settings) {
            getAuthCode();
            Swal.fire({
                icon: 'success'
                , title: "권한저장이 완료되었습니다"
                , text: ""
                , confirmButtonText: "확인"
            });	    
            
        },
        fail: function (response) {
            let message = response.responseJSON.message;
            openPopup({
                title: '실패',
                type: 'error',
                text: message
            });
        }
    })
}


/*******************************************************************
 *** 하단 그리드 event
 *******************************************************************/
/**
 * 메뉴 저장버튼 클릭
 */
function clickSaveMenuButton() {
    let authCodeMenuList = [];
    let tr = $('#authCodeMenuTable').children();
    let authCode = $(tr[0]).find("td:eq(3)").text();

    for (let i = 0; i < tr.length; i++) {
        var authCodeMenu = {};

        let menuUseYn = $(tr[i]).find("td:eq(5)").find(".can_use_yn").prop("checked");
        let menuUseYnCheck = $(tr[i]).find("td:eq(5)").find(".use_hidden_yn").val();
        let menuModifyYn = $(tr[i]).find("td:eq(6)").find(".can_modify_yn").prop("checked");
        let menuModifyYnCheck = $(tr[i]).find("td:eq(6)").find(".modify_hidden_yn").val();

        if (!menuUseYnCheck || (menuUseYn && menuUseYnCheck === 'N') || (!menuUseYn && menuUseYnCheck === 'Y')) {
            authCodeMenu.chkUseYn = menuUseYn;
        }

        if (!menuModifyYnCheck || (menuModifyYn && menuModifyYnCheck === 'N') || (!menuModifyYn && menuModifyYnCheck === 'Y')) {
            authCodeMenu.chkUseYn = menuUseYn;
            authCodeMenu.chkModifyYn = menuModifyYn;
        }

        if (!(Object.keys(authCodeMenu).length === 0)) {
            authCodeMenu.menuId = $(tr[i]).find("td:eq(1)").text();
            authCodeMenu.athCd = authCode;
            authCodeMenuList.push(authCodeMenu);
        }
    }

    if (authCodeMenuList.length > 0) {
        saveMenu(authCodeMenuList, authCode);
    }
}

/**
 * 메뉴 저장 ajax
 */
function saveMenu(authCodeMenuList, authCode) {
    ajaxCall({
        method: 'post',
        url: '/registerAuthCodeMenu',
        data: authCodeMenuList,
        success: function () {
            getAuthCodeMenu(authCode);
            Swal.fire({
                icon: 'success'
                , title: "저장이 완료되었습니다"
                , text: ""
                , confirmButtonText: "확인"
            });	 
        },
        fail: function (response) {
            let message = response.responseJSON.message;
            openPopup({
                title: '실패',
                type: 'error',
                text: message
            });
        }
    });
}


/**
 * 사용여부와 수정가능여부 클릭 모션
 * @param {this} 체크박스 클릭 이벤트 발생한 <input>
 */
function checkboxModifyYn(e) {		// 수정가능여부
	let modifyYn = $(e);
	let thisTr = modifyYn.parent().parent();
	let checkedUseYn = thisTr.find('td:eq(5)').children();
	if (modifyYn.is(':checked')) {					// 수정가능 여부를 체크(사용)할 때,
		checkedUseYn.prop('checked', true);			// 사용 여부도 체크를 한다.
	}
}
function checkboxUseYn(e) {		// 사용여부
	let useYn = $(e);
	let thisTr = useYn.parent().parent();
	let checkedModifyYn = thisTr.find('td:eq(6)').children();
	if (!useYn.is(':checked')) {							// 사용 여부를 취소할 때,
		if (checkedModifyYn.is(':checked')) {				// 수정가능 여부가 체크 되어 있으면,
			checkedModifyYn.prop('checked', false);			// 수정가능 여부를 취소한다.
		}
	}

}