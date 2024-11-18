$(document).ready(function() {
	
	loadTabContents();

	// url 정보 세팅은 마지막에 하도록 한다.
	/*getUrlDealInfo();*/
	
	// 기타의무 SelectBox
	changeEtcSelectbox();
});
/*
function getUrlDealInfo() {

	var urlParam = window.location.search;
	var urlParams = new URLSearchParams(urlParam);

	var ibDealNo = urlParams.get('ibDealNo');

	if (!isEmpty(ibDealNo)) {
		$('#AS05010S_ibDealNo').val(ibDealNo);
		$('#AS05010S_selectedDealNo').val(ibDealNo);
		getDealList();

		//setTab1(ibDealNo);
		//setTab2(ibDealNo);
		//setTab3(ibDealNo);
		//setTab4(ibDealNo);
		//setTab5(ibDealNo);

	}
}
*/
function loadTabContents(){
	loadTab1();
	loadTab2();
	loadTab3();
}


//--------------------- TAB1 약정/기표/철회 ---------------------//

function loadTab1() {
	loadInspctCnclHndlCcd();
}

// 안건관리 - 진행정보관리 조회
function getDealList() {

	let ibDealNo = $('#AS05010S_ibDealNo').val();

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
			url: "/AS05010S/getDealList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#AS05010S_ibDealList').html(html);


				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr ondblclick="setCaseInfo(this)">';
						html += '<td>' + value.ibDealNo + '</td>';									// deal번호
						html += '<td>' + value.ibDealNm + '</td>';									// 안건명
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';		// 리스크심사구분코드
						html += '<td>' + value.riskInspctCcdNm + '</td>';							// 신규/부재의정보
						html += '<td>' + value.ownpEnoNm + '</td>';									// 심사역
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';			// 부수안건구분코드
						html += '<td>' + value.lstCCaseCcdNm + '</td>';								// 부수안건정보
						html += '<td style="display:none;">' + value.agrDt + '</td>';				// 약정일자
						html += '<td style="display:none;">' + value.agrAmt + '</td>';				// 약정금액
						html += '<td style="display:none;">' + value.raDocCcd + '</td>';			// RA문서구분코드
						html += '<td style="display:none;">' + value.caseRaDocNo + '</td>';			// 약정 RA문서번호
						html += '<td style="display:none;">' + value.wrtDt + '</td>';				// 기표일자
						html += '<td style="display:none;">' + value.mtrtDt + '</td>';				// 만기일자
						html += '<td style="display:none;">' + value.cshNtrAstsWrtAmt + '</td>';	// 현금성자산기표금액
						html += '<td style="display:none;">' + value.inspctCnclHndlCcd + '</td>';	// 심사취소처리구분코드
						html += '<td style="display:none;">' + value.nhndlRsnCntnt + '</td>';		// 미처리사유내용
						html += '<td style="display:none;">' + value.endDt + '</td>';				// 종료일자 / EXIT 날짜
						html += '<td style="display:none;">' + value.optnlEndCcd + '</td>';			// 임의종료구분코드
						html += '<td style="display:none;">' + value.endBssCntnt + '</td>';			// 종료기본내용
						html += '<td style="display:none;">' + value.exitRaDocNo + '</td>';			// EXIT RA문서번호
						html += '<td style="display:none;">' + value.caseItemSq + '</td>';			// 약정 항목일련번호
						html += '<td style="display:none;">' + value.exitItemSq + '</td>';			// EXIT 항목일련번호
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';							// 심사진행상태코드명
						html += '</tr>'
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#AS05010S_ibDealList').html(html);
				
				if(dealList.length != 0){
					$('#caseActive tbody tr:last').addClass('table-active');
					$('#caseActive tbody tr:last').click();
				}
			}
		});
	}
};

// 테이블 더블 클릭 후 탭 리스트 출력
function setCaseInfo(e) {
	

	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var ibDealNo = td.eq(0).text();					// 직원번호
	var riskInspctCcd = td.eq(2).text();			// 리스크심사구분코드
	var lstCCaseCcd = td.eq(5).text();				// 부수안건구분코드
	var agrDt = td.eq(7).text();					// 약정일자
	var	agrAmt = td.eq(8).text();					// 약정금액
	var	caseRaDocNo = td.eq(10).text();				// 약정 RA문서번호
	var wrtDt = td.eq(11).text();					// 기표일자
	var mtrtDt = td.eq(12).text();					// 만기일자
	var cshNtrAstsWrtAmt = td.eq(13).text();		// 현금성자산기표금액
	var inspctCnclHndlCcd = td.eq(14).text();		// 심사취소처리구분코드
	var nhndlRsnCntnt = td.eq(15).text();			// 미처리사유내용
	var endDt = td.eq(16).text();					// 종료일자 / EXIT 날짜
	var optnlEndCcd = td.eq(17).text();				// 임의종료구분코드
	var endBssCntnt = td.eq(18).text();				// 종료기본내용
	var exitRaDocNo = td.eq(19).text();				// EXIT RA문서번호
	
	$(tr).addClass('table-active');
	
	$('#AS05010S_selectedDealNo').val(ibDealNo);
	$('#AS05010S_riskInspctCcd').val(riskInspctCcd);
	$('#AS05010S_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#agrDt').val(agrDt);
	$('#agrAmt').val(agrAmt);
	$('#caseRaDocNo').val(caseRaDocNo);
	$('#wrtDt').val(wrtDt);
	$('#mtrtDt').val(mtrtDt);
	$('#cshNtrAstsWrtAmt').val(cshNtrAstsWrtAmt);
	$('#AS05010S_inspctCnclHndlCcd').val(inspctCnclHndlCcd);
	$('#nhndlRsnCntnt').val(nhndlRsnCntnt);
	$('#endDt').val(endDt);
	$('#AS05010S_optnlEndCcd').val(optnlEndCcd);
	$('#endBssCntnt').val(endBssCntnt);
	$('#exitRaDocNo').val(exitRaDocNo);
	
	$('#caseActive tbody tr').click(function() {
      	// 모든 행의 active 클래스 제거
    	$('#caseActive tbody tr').removeClass('table-active');
      	// 클릭한 행에 active 클래스 추가
    	$(this).addClass('table-active');
    });
	
	//setTab1(ibDealNo);
	//setTab2(ibDealNo);
	//setTab3(ibDealNo);
	//setTab4(ibDealNo);
	//setTab5(ibDealNo);
	
	getOpList();
	getEtcList();
	getEnoList();

}

// TAB1 약정/기표/철회 초기화
function tab1Reset() {
	$('#agrDt').val('');							// 약정일
	$('#agrAmt').val('0');							// 약정금액
	$('#caseRaDocNo').val('');						// 약정 문서번호
	$('#wrtDt').val('');							// 기표일
	$('#mtrtDt').val('');							// 만기일
	$('#cshNtrAstsWrtAmt').val('0');				// 기표금액
	$('#AS05010S_inspctCnclHndlCcd').val('1');		// 심사취소처리구분코드
	$('#nhndlRsnCntnt').val('');					// 미처리사유내용
}

// TAB1 약정/기표/철회 저장
function tab1Save() {
	var ibDealNo = $('#AS05010S_selectedDealNo').val();					// IBDEAL번호
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();				// 리스크심사구분코드
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();					// 부수안건구분코드
	var agrDt = $('#agrDt').val();										// 약정일
	var agrAmt = $('#agrAmt').val();									// 약정금액
	var caseRaDocNo = $('#caseRaDocNo').val();							// 요청문서번호
	var caseRaDocCcd = $('#caseRaDocCcd').val(); 						// RA문서구분코드
	var wrtDt = $('#wrtDt').val();										// 기표일
	var mtrtDt = $('#mtrtDt').val();									// 만기일
	var cshNtrAstsWrtAmt = $('#cshNtrAstsWrtAmt').val();				// 기표금액
	var inspctCnclHndlCcd = $('#AS05010S_inspctCnclHndlCcd').val();		// 심사취소처리구분코드
	var nhndlRsnCntnt = $('#nhndlRsnCntnt').val();						// 미처리사유내용	
	var itemSq = $('#itemSq').val();									// 항목일련번호
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(agrDt&&agrAmt&&caseRaDocNo&&caseRaDocCcd
					&&wrtDt&&mtrtDt&&cshNtrAstsWrtAmt&&inspctCnclHndlCcd&&nhndlRsnCntnt)){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "약정/기표/철회 내용을 확인해주세요."
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
			, "agrDt": agrDt
			, "agrAmt": agrAmt
			, "caseRaDocNo": caseRaDocNo
			, "caseRaDocCcd": caseRaDocCcd
			, "wrtDt": wrtDt
			, "mtrtDt": mtrtDt
			, "cshNtrAstsWrtAmt": cshNtrAstsWrtAmt
			, "inspctCnclHndlCcd": inspctCnclHndlCcd
			, "nhndlRsnCntnt": nhndlRsnCntnt
			, "itemSq": itemSq
		};
		

		$.ajax({
			type: "POST",
			url: "/AS05010S/registCaseInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "약정/기표/철회를 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getDealList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "약정/기표/철회를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// TAB1 약정/기표/철회 삭제
function tab1Delete() {
var ibDealNo = $('#AS05010S_selectedDealNo').val();
var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
var caseRaDocCcd = $('#caseRaDocCcd').val();
var itemSq = $('#itemSq').val();

	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(caseRaDocCcd))
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}
	
	function businessFunction(){
		
		var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
			,"caseRaDocCcd": caseRaDocCcd
			,"itemSq":itemSq
		}
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/deleteCaseInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "약정/기표/철회를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getDealList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "약정/기표/철회를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}

function updateInspctPrgrsStCd(param) {
	if(isEmpty($('#AS05010S_ibDealNo').val())){
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "약정완료가 적용되지 않았습니다."
			, confirmButtonText: "확인"
		}).then((result) => {
			return;
		});
	}
	
	var paramDto = {
		"ibDealNo": $('#AS05010S_ibDealNo').val()
		, "riskInspctCcd": $('#AS05010S_riskInspctCcd').val()
		, "lstCCaseCcd": $('#AS05010S_lstCCaseCcd').val()
		, "inspctPrgrsStCd": $('#AS05010S_inspctPrgrsStCd').val()
	};

	$.ajax({
		type: "POST",
		url: "/AS05010S/updateInspctPrgrsStCd",
		data: paramDto,
		dataType: "json",
		success: function(data) {
			Swal.fire({
				icon: 'success'
				, title: "Success!"
				, text: "약정완료로 변경됐습니다."
				, confirmButtonText: "확인"
			}).then((result) => {
				getDealList();
			});
		}
	});
	
}

//--------------------- TAB2 EXIT ---------------------//

function loadTab2() {
	loadOptnlEndCcd();
}

// TAB2 EXIT 저장
function tab2Save() {
	var ibDealNo = $('#AS05010S_selectedDealNo').val();			// IBDEAL번호
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();		// 리스크심사구분코드
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();			// 부수안건구분코드
	
	var endDt = $('#endDt').val();								// 종료일자
	var optnlEndCcd = $('#AS05010S_optnlEndCcd').val();			// 임의종료구분코드		
	var exitRaDocNo = $('#exitRaDocNo').val();					// 문서번호		
	var exitRaDocCcd = $('#exitRaDocCcd').val();				// RA문서구분코드		
	var itemSq = $('#itemSq').val();							// 항목일련번호
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(endDt && optnlEndCcd && exitRaDocNo && exitRaDocCcd)){
			busiFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "내용을 확인해주세요."
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
	
	function busiFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "endDt": endDt
			, "optnlEndCcd": optnlEndCcd
			, "exitRaDocNo": exitRaDocNo
			, "exitRaDocCcd": exitRaDocCcd
			, "itemSq": itemSq
		};
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/registExitInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "EXIT을 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getDealList();
					//$('#caseActive tbody tr:first').addClass('table-active');
					//$('#caseActive tbody tr:first').click();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "EXIT을 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// TAB2 EXIT 초기화
function tab2Reset() {
	$('#endDt').val('');							// 종료일자
	$('#AS05010S_optnlEndCcd').val('1');			// 임의종료구분코드
	$('#exitRaDocNo').val('');						// 약정 문서번호
}

// TAB2 EXIT 삭제
function tab2Delete() {
var ibDealNo = $('#AS05010S_selectedDealNo').val();
var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();

var raDocCcd = $('#exitRaDocCcd').val();
var itemSq = $('#itemSq').val();
	
	// EXIT 선택 유무 체크
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(itemsq)){
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "EXIT를 선택해주세요."
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
	
	function businessFunction(){
		
		var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
			,"raDocCcd": raDocCcd
			,"itemSq":itemSq
		}
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/deleteExitInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "EXIT정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getDealList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "EXIT정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}

//--------------------- TAB3 셀다운의무 ---------------------//
function loadTab3() {
	// 셀다운의무 해소금액
	sellDownAmt();
}

// 셀다운의무 해소금액 계산
function sellDownAmt() {
	// 의무금액에서 계산
	$('#oblgAmt').keyup(function(event){
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#oblgAmt").val().replace(/,/g, "");
			if (input1 != "") {																			// 2-1. 적용환율 값이 있을경우
				var input2 = $('#rpyAmt').val().replace(/,/g, "");										// 콤마 제거
				$("#unpayAmt").val((input1 - input2).toLocaleString("ko-KR"));
				
				var unpayAmt = input1 - input2;
				
				if (unpayAmt < 0) {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "의무금액이 해소금액보다 적습니다."
						, confirmButtonText: "확인"
					});
					$("#unpayAmt").val("0");
					$("#oblgAmt").val("0");
				}
			} else {																					// 2-2. 적용환율 값이 없을경우
				var input1 = $('#oblgAmt').val().replace(/,/g, "");								
				$("#unpayAmt").val(input1);	
			}
		}
	})
	
	// 해소금액에서 계산
	$('#rpyAmt').keyup(function(event){
		if (event.key >= 0 && event.key <= 9 || event.key === "Backspace" || event.key === "Delete") {	// 1. 숫자입력 체크
			var input1 = $("#oblgAmt").val().replace(/,/g, "");
			if (input1 != "") {																			// 2. 값이 있으면 계산
				var input2 = $("#rpyAmt").val().replace(/,/g, "");	
				$("#unpayAmt").val((input1 - input2).toLocaleString("ko-KR"));
				
				var unpayAmt = input1 - input2;
				
				if (unpayAmt < 0) {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "해소금액이 의무금액을 넘을 수 없습니다."
						, confirmButtonText: "확인"
					});
					$("#rpyAmt").val("0");
					$("#unpayAmt").val("0");
				}
			} else {
				var input1 = $('#oblgAmt').val().replace(/,/g, "");								
				$("#unpayAmt").val(input1);	
			}
		}
	})
}


// 셀다운의무 조회
function getOpList() {

	let ibDealNo = $('#AS05010S_ibDealNo').val();
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();

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
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
		};

		$.ajax({
			type: "GET",
			url: "/AS05010S/getOpList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#SellDown_List').html(html);

				// value
				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr onclick="setSellDownInfo(this)">';
						html += '<td>' + value.itemSq + '</td>';								// 항목일련번호
						html += '<td class="text-right">' + value.oblgAmt + '</td>';			// 의무금액
						html += '<td>' + value.aplcEndDtDt + '</td>';							// 적용기한일
						html += '<td>' + value.rpyDt + '</td>';									// 해소일
						html += '<td class="text-right">' + value.rpyAmt + '</td>';				// 해소금액
						html += '<td class="text-right">' + value.unpayAmt + '</td>';			// 미해소금액
						html += '<td style="display:none;">' + value.ibDealNo + '</td>';		// IBDEAL번호
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';	// 리스크심사구분코드
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';		// 부수안건구분코드
						html += '</tr>'
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#SellDown_List').html(html);
			}
		});
	}


};

// 테이블 더블 클릭 후 탭 리스트 출력
function setSellDownInfo(e) {
	

	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var itemSq = td.eq(0).text();					// 항목일련번호
	var oblgAmt = td.eq(1).text();					// 의무금액
	var aplcEndDtDt = td.eq(2).text();				// 적용기한일
	var rpyDt = td.eq(3).text();					// 해소일
	var	rpyAmt = td.eq(4).text();					// 해소금액
	var	unpayAmt = td.eq(5).text();					// 미해소금액
	var	ibDealNo = td.eq(6).text();					// IBDEAL번호
	var	riskInspctCcd = td.eq(7).text();			// 리스크심사구분코드
	var	lstCCaseCcd = td.eq(8).text();				// 부수안건구분코드
	
	$(tr).addClass('table-active');
	
	$('#AS05010S_selectedDealNo').val(ibDealNo);
	$('#AS05010S_riskInspctCcd').val(riskInspctCcd);
	$('#AS05010S_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#Tab3_ItemSq').val(itemSq);							// 항목일련번호
	$('#oblgAmt').val(oblgAmt);								// 의무금액
	$('#aplcEndDtDt').val(aplcEndDtDt);						// 적용기한일
	$('#rpyDt').val(rpyDt);									// 해소일
	$('#rpyAmt').val(rpyAmt);								// 해소금액
	$('#unpayAmt').val(unpayAmt);							// 미해소금액

	$('#selldownActive tbody tr').click(function() {
      	// 모든 행의 active 클래스 제거
    	$('#selldownActive tbody tr').removeClass('table-active');
      	// 클릭한 행에 active 클래스 추가
    	$(this).addClass('table-active');
    });

}

// 셀다운 저장
function tab3Save() {
	var ibDealNo = $('#AS05010S_selectedDealNo').val();				// IBDEAL번호
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();			// 리스크심사구분코드
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();				// 부수안건구분코드
	var itemSq = $('#Tab3_ItemSq').val();							// 항목일련번호
	
	var oblgAmt = $('#oblgAmt').val();								// 의무금액
	var aplcEndDtDt = $('#aplcEndDtDt').val();						// 적용기한일
	var rpyDt = $('#rpyDt').val();									// 해소일
	var rpyAmt = $('#rpyAmt').val(); 								// 해소금액
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(oblgAmt&&aplcEndDtDt&&rpyDt&&rpyAmt)){
			busiFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "셀다운의무 내용을 확인해주세요."
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

	
	function busiFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "itemSq": itemSq
			, "oblgAmt": oblgAmt
			, "aplcEndDtDt": aplcEndDtDt
			, "rpyDt": rpyDt
			, "rpyAmt": rpyAmt
		};
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/registOpInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "셀다운 정보를 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getOpList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "셀다운 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 셀다운 초기화
function tab3Reset() {
	$('#Tab3_ItemSq').val('0');			// 항목일련번호
	$('#oblgAmt').val('');				// 의무금액
	$('#aplcEndDtDt').val('');			// 적용기한일
	$('#rpyDt').val('');				// 해소일
	$('#rpyAmt').val('');				// 해소금액
	$('#unpayAmt').val('');				// 미해소금액
	
	$('#selldownActive tbody tr').removeClass('table-active');// 테이블 active 초기화
}

// 셀다운 삭제
function tab3Delete() {
var ibDealNo = $('#AS05010S_selectedDealNo').val();
var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
var itemSq = $('#Tab3_ItemSq').val();
	
	// 셀다운 선택 유무 체크
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
	
	function businessFunction(){
		
		var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
			,"itemSq": itemSq
		}
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/deleteOpInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "셀다운 정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getOpList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "셀다운 정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
	tab3Reset();
}

//--------------------- TAB4 기타의무 ---------------------//

// 기타의무 셀렉트박스 change
function changeEtcSelectbox(){
	$('#rpyF').on('change', function(){
		var useYn1 = $('#rpyF').val();
	
		if (useYn1 == "Y") {
			$('#EctRpyDt').prop("disabled", false);
		} else if (useYn1 == "N"){
			$('#EctRpyDt').prop("disabled", true);
		}
	})
};

// 기타의무 셀렉트박스
function setEtcSelectBox(){
	var useYn1 = $('#rpyF').val();
	
	if (useYn1 == "Y") {
		$('#EctRpyDt').prop("disabled", false);
	} else if (useYn1 == "N"){
		$('#EctRpyDt').prop("disabled", true);
	}
}

// 기타의무 조회
function getEtcList() {

	let ibDealNo = $('#AS05010S_ibDealNo').val();
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
	
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
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
		};

		$.ajax({
			type: "GET",
			url: "/AS05010S/getEtcList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#Etc_List').html(html);

				// value
				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr onclick="setEtcInfo(this)">';
						html += '<td>' + value.itemSq + '</td>';								// 항목일련번호
						html += '<td>' + value.oblgCntnt + '</td>';								// 의무내용
						html += '<td>' + value.aplcEndDtDt + '</td>';							// 적용기한일자
						html += '<td>' + value.rpyDt + '</td>';									// 해소일자
						html += '<td>' + value.rpyF + '</td>';									// 해소여부
						html += '<td style="display:none;">' + value.ibDealNo + '</td>';		// IBDEAL번호
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';	// 리스크심사구분코드
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';		// 부수안건구분코드
						html += '</tr>'
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#Etc_List').html(html);
			}
		});
	}

};

// 테이블 더블 클릭 후 탭 리스트 출력
function setEtcInfo(e) {
	

	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var itemSq = td.eq(0).text();					// 항목일련번호
	var oblgCntnt = td.eq(1).text();				// 의무내용
	var aplcEndDtDt = td.eq(2).text();				// 적용기한일자
	var rpyDt = td.eq(3).text();					// 해소일자
	var	rpyF = td.eq(4).text();					// 해소여부
	
	var	ibDealNo = td.eq(5).text();					// IBDEAL번호
	var	riskInspctCcd = td.eq(6).text();			// 리스크심사구분코드
	var	lstCCaseCcd = td.eq(7).text();				// 부수안건구분코드
	
	$(tr).addClass('table-active');
	
	$('#AS05010S_selectedDealNo').val(ibDealNo);
	$('#AS05010S_riskInspctCcd').val(riskInspctCcd);
	$('#AS05010S_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#Tab4_ItemSq').val(itemSq);					// 항목일련번호
	$('#etcOblgCntnt').val(oblgCntnt);				// 의무내용
	$('#etcAplcEndDtDt').val(aplcEndDtDt);			// 적용기한일자
	$('#EctRpyDt').val(rpyDt);						// 해소일자
	$('#rpyF').val(rpyF);							// 해소여부
	
	setEtcSelectBox();
	
	$('#etcActive tbody tr').click(function() {
      	// 모든 행의 active 클래스 제거
    	$('#etcActive tbody tr').removeClass('table-active');
      	// 클릭한 행에 active 클래스 추가
    	$(this).addClass('table-active');
    });
	
}

// 기타의무 저장
function tab4Save() {
	var ibDealNo = $('#AS05010S_selectedDealNo').val();				// IBDEAL번호
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();			// 리스크심사구분코드
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();				// 부수안건구분코드
	
	var itemSq = $('#Tab4_ItemSq').val();							// 항목일련번호
	var oblgCntnt = $('#etcOblgCntnt').val();						// 의무내용
	var aplcEndDtDt = $('#etcAplcEndDtDt').val();					// 적용기한일자
	var rpyDt = $('#EctRpyDt').val();								// 해소일
	var rpyF = $('#rpyF').val(); 									// 해소여부
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(oblgCntnt&&aplcEndDtDt&&rpyDt)){
			busiFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "의무내용을 확인해주세요."
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
	
	function busiFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "itemSq": itemSq
			, "oblgCntnt": oblgCntnt
			, "aplcEndDtDt": aplcEndDtDt
			, "rpyDt": rpyDt
			, "rpyF": rpyF
		};
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/registEtcInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "기타의무 정보를 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getEtcList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "기타의무 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
	tab4Reset();
}

// 기타의무 초기화
function tab4Reset() {
	$('#Tab4_ItemSq').val('0');			// 항목일련번호
	$('#etcOblgCntnt').val('');			// 의무내용
	$('#etcAplcEndDtDt').val('');		// 적용기한일
	$('#EctRpyDt').val('');				// 해소일
	$('#rpyF').val('Y');					// 해소여부
	
	$('#etcActive tbody tr').removeClass('table-active');// 테이블 active 초기화
	setEtcSelectBox();
}

// 기타의무 삭제
function tab4Delete() {
var ibDealNo = $('#AS05010S_selectedDealNo').val();
var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
var itemSq = $('#Tab4_ItemSq').val();
	
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
	
	function businessFunction(){
		
		var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
			,"itemSq": itemSq
		}
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/deleteEtcInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "기타의무 정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEtcList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "기타의무 정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
	tab4Reset();
}

//--------------------- TAB5 관리직원 ---------------------//
// 관리직원 조회
function getEnoList() {

	let ibDealNo = $('#AS05010S_ibDealNo').val();
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
	
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
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
		};


		$.ajax({
			type: "GET",
			url: "/AS05010S/getEnoList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#Eno_List').html(html);

				// value
				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						html += '<tr onclick="setEnoInfo(this)">';
						html += '<td>' + value.itemSq + '</td>';								// 항목일련번호
						html += '<td>' + value.cndctRgstEno + '</td>';							// 조치등록사번
						html += '<td>' + value.cndctRgstEnoNm + '</td>';						// 조치등록사번이름
						html += '<td>' + value.uptDt + '</td>';									// 변경일자
						html += '<td>' + value.uptRsnCntnt + '</td>';							// 변경사유내용
						html += '<td style="display:none;">' + value.ibDealNo + '</td>';		// IBDEAL번호
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';	// 리스크심사구분코드
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';		// 부수안건구분코드
						html += '</tr>'
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#Eno_List').html(html);
			}
		});
	}

};

// 테이블 더블 클릭 후 탭 리스트 출력
function setEnoInfo(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var itemSq = td.eq(0).text();					// 항목일련번호
	var cndctRgstEno = td.eq(1).text();				// 조치등록사번
	var cndctRgstEnoNm = td.eq(2).text();			// 조치등록사번이름
	var uptDt = td.eq(3).text();					// 변경일자
	var	uptRsnCntnt = td.eq(4).text();				// 변경사유내용
	
	var	ibDealNo = td.eq(5).text();					// IBDEAL번호
	var	riskInspctCcd = td.eq(6).text();			// 리스크심사구분코드
	var	lstCCaseCcd = td.eq(7).text();				// 부수안건구분코드
	
	$(tr).addClass('table-active');
	
	$('#AS05010S_selectedDealNo').val(ibDealNo);
	$('#AS05010S_riskInspctCcd').val(riskInspctCcd);
	$('#AS05010S_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#Tab5_ItemSq').val(itemSq);							// 항목일련번호
	$('#tab5_empNm').val(cndctRgstEnoNm);					// 조치등록사번이름
	$('#tab5_eno').val(cndctRgstEno);						// 조치등록사번
	$('#uptDt').val(uptDt);									// 변경일자
	$('#uptRsnCntnt').val(uptRsnCntnt);						// 변경사유내용
	
	$('#enoActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#enoActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
	
}

// 관리직원 저장
function tab5Save() {
	var ibDealNo = $('#AS05010S_selectedDealNo').val();				// IBDEAL번호
	var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();			// 리스크심사구분코드
	var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();				// 부수안건구분코드
	
	var itemSq = $('#Tab5_ItemSq').val();							// 항목일련번호
	var cndctRgstEnoNm = $('#tab5_empNm').val();					// 조치등록사번이름
	var uptDt = $('#uptDt').val();									// 변경일자
	var uptRsnCntnt = $('#uptRsnCntnt').val();						// 변경사유내용
	var cndctRgstEno = $('#tab5_eno').val();

	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(itemSq&&cndctRgstEnoNm&&uptDt&&uptRsnCntnt)){
			if($('#enoActive tbody tr.table-active').length > 0){
				updateFunction();				
			} else {
				busiFunction();
			}
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "직원명을 확인해주세요."
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
	
	// Table-Active가 안된 상태에서 관리직원 유무 확인 후 저장
	function busiFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "itemSq": itemSq
			, "cndctRgstEnoNm": cndctRgstEnoNm
			, "uptDt": uptDt
			, "uptRsnCntnt": uptRsnCntnt
			, "cndctRgstEno": cndctRgstEno
		};
		
		// Ajax 요청을 통해 중복 체크 수행
	    $.ajax({
	        type: "POST",
	        url: "/AS05010S/checkEno",
	        data: dtoParam,
	        dataType: "json",
	        success: function(response) {
				var message = cndctRgstEnoNm + "님은 관리직원입니다.";
				
	            if (response > 0) {
	                // 중복된 데이터가 있을 경우 처리
	                Swal.fire({
	                    icon: 'error',
	                    title: "Error!",
	                    text: message,
	                    confirmButtonText: "확인"
	                });
	            } else {
	                // 중복된 데이터가 없을 경우 데이터 삽입 수행
	                $.ajax({
						type: "POST",
						url: "/AS05010S/registEnoInfo",
						data: dtoParam,
						dataType: "json",
						success: function() {
							Swal.fire({
								icon: 'success'
							  , title: "Success!"
							  , text: "관리직원을 저장하였습니다."
							  , confirmButtonText: "확인"
							}).then((result) => {
								getEnoList();
							});
						},
						error: function() {
							Swal.fire({
								icon: 'error'
								, title: "Error!"
								, text: "관리직원을 저장하는데 실패하였습니다."
								, confirmButtonText: "확인"
							});
						}
					});
	            }
	        },
	        error: function() {
	            Swal.fire({
	                icon: 'error',
	                title: "Error!",
	                text: "중복 체크를 실패하였습니다.",
	                confirmButtonText: "확인"
	            });
	        }
	    });
	}
	
	// Table-Active 상태에서 데이터 업데이트
	function updateFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "itemSq": itemSq
			, "cndctRgstEnoNm": cndctRgstEnoNm
			, "uptDt": uptDt
			, "uptRsnCntnt": uptRsnCntnt
			, "cndctRgstEno": cndctRgstEno
		};
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/registEnoInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "관리직원을 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getEnoList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "관리직원을 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
	
}

// 관리직원 초기화
function tab5Reset() {
	$('#Tab5_ItemSq').val('0');			// 항목일련번호
	$('#tab5_empNm').val('');			// 조치등록사번이름
	$('#uptDt').val('');				// 변경일자
	$('#uptRsnCntnt').val('');			// 변경사유내용
	
	$('#enoActive tbody tr').removeClass('table-active');// 테이블 active 초기화
}

// 관리직원 삭제
function tab5Delete() {
var ibDealNo = $('#AS05010S_selectedDealNo').val();
var riskInspctCcd = $('#AS05010S_riskInspctCcd').val();
var lstCCaseCcd = $('#AS05010S_lstCCaseCcd').val();
var itemSq = $('#Tab5_ItemSq').val();
	
	// 해당 관리직원 유효 체크
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(itemSq)){
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관리직원을 선택해주세요."
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
	
	function businessFunction(){
		
		var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
			,"itemSq": itemSq
		}
		
		$.ajax({
			type: "POST",
			url: "/AS05010S/deleteEnoInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "관리직원을 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEnoList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "관리직원을 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
	tab5Reset();
}






//--------------------- SELECTBOX CODE ---------------------//
// 심사취소처리구분코드
function loadInspctCnclHndlCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I005",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS05010S_inspctCnclHndlCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS05010S_inspctCnclHndlCcd').html(html);
		}
	});
};

// 임의종료구분코드
function loadOptnlEndCcd()	{
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/O003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS05010S_optnlEndCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS05010S_optnlEndCcd').html(html);
		}
	});
}


