
$(document).ready(function () {
	selectBoxSet_TB07090S();
});

let fileUp_atchFleDcd;

/**
 * 첨부파일구분코드 팝업
 */
function callFileUploadPopup() {
	modalReset();
	$('#modal-FileUploadPopup').modal('show');
	indexChangeHandler("FileUploadPopup");
}

function fileUploadPopup_close() {
	$('#modal-FileUploadPopup').modal('hide');
}

/**
 * 모달 초기화
 */
function modalReset() {
	$('#FileUp_atchFleDcd').val("");
}

/**
 * 첨부파일구분코드 선택확인
 */
function atchFleDcdChk() {
	let chkVal = $('#FileUp_atchFleDcd').val();

	console.log(chkVal);

	let nowUrl = window.location.pathname;

	if (chkVal === undefined || chkVal === "") {
		Swal.fire({
			icon: 'warning'
			, title: 'Warning!'
			, text: '첨부파일구분코드를 선택해주세요!'
		})
	}
	else {
		$(`div[data-menuid="/${nowUrl.split("/")[1]}"] #atchFleDcd`).val(chkVal);
		fileUploadPopup_close();
		// fileUpload.js 파일의 이벤트
		$(`div[data-menuid="/${nowUrl.split("/")[1]}"]` + " #deal-upload-input").click();
	}
}

/**
 * 첨부파일구분코드 생성
 */
function selectBoxSet_TB07090S() {
	selectBox = getSelectBoxList(
		"FileUploadPopup",
		"A014",
		false
	);

	fileUp_atchFleDcd = selectBox.filter(function (item) {
		return item.cmnsGrpCd === "A014";
	});

	fileUp_atchFleDcd.forEach((item) => {
		$("#FileUp_atchFleDcd").append(
			$("<option>", {
				value: item.cdValue,
				text: `${item.cdName}`,
			})
		);
	});
}