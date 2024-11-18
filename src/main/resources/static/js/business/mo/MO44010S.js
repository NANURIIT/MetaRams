$(document).ready(function() {

	loadSelectBox();
	setKeyFunction_MO44010S();
	setRsltnDt();
});

// 엔터키 검색 function 세팅
function setKeyFunction_MO44010S() {
	$("input[id=MO44010S_stdDt]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	})
	$("input[id=MO44010S_empno]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	});
	$("input[id=MO44010S_empNm]").keyup(function(key) {
		if (key.keyCode == 13) {
			checkDealSearch()
		}
	});
};

function loadSelectBox(){
	setInspctDprtCcd();
}

function setInspctDprtCcd(){
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/I003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#MO44010S_inspctDprtCcd').html(html);
			html += "<option value=''>전체</option>";
			
			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#MO44010S_inspctDprtCcd').html(html);
		}
	});
}


// 금일 날짜 세팅
function setRsltnDt() {
	$('#MO44010S_stdDt').val(getToday());
}



// 조회
function checkDealSearch(){
	var MO44010S_stdDt = $('#MO44010S_stdDt').val();
	var MO44010S_empno = $('#MO44010S_empno').val();
	var MO44010S_inspctDprtCcd = $('#MO44010S_inspctDprtCcd').val();
	var checked = "N";
	
	if($('#MO44010S_checked').is(':checked')){
		checked = "Y";
	}
	
	businessFunction();
/*
	if(!isEmpty(MO44010S_stdDt)){
		if(!isEmpty(MO44010S_empno)){
			
		} else {
			Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "심사역을 입력해 주세요."
			, confirmButtonText: "확인"
			})
		}
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "기준일자를 입력해 주세요."
			, confirmButtonText: "확인"
		});
	}
*/
	function businessFunction() {
		var dtoParam = {
			"stdDt"				: MO44010S_stdDt
			, "eno"				: MO44010S_empno
			, "inspctDprtCcd"	: MO44010S_inspctDprtCcd
			, "checked"			: checked
		}

		$.ajax({
			type: "GET",
			url: "/MO44010S/checkDealSearch",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#MO44010S_DealList').html(html);
				if (dealList.length > 0) {
					$.each(dealList, function(key, value) {
						html += '<tr ondblclick="setDealInfo(this);">';
						html += '<td>' + value.stdDt + '</td>';
						html += '<td>' + value.entpNm + '</td>';
						html += '<td>' + value.rprstPHnglNm + '</td>';
						html += '<td>' + value.corpRgstNo + '</td>';
						html += '<td>' + value.crdtAcdntOcrncDtls + '</td>';
						html += '<td>' + value.ibDealNo + '</td>';
						html += '<td>' + value.ibDealNm + '</td>';
						html += '<td>' + value.inspctDprtCcdNm + '</td>';
						html += '<td>' + value.empNm + '</td>';
						html += '<td>' + value.fstCnfrDt + '</td>';
						html += '<td>' + value.ansAcptDt + '</td>';
						html += '<td style="display:none;">' + value.riskInspctCcd + '</td>';
						html += '<td style="display:none;">' + value.lstCCaseCcd + '</td>';
						html += '<td style="display:none;">' + value.inspctDprtCcd + '</td>';
						html += '<td style="display:none;">' + value.ownPEno + '</td>';
						html += '<td style="display:none;">' + value.exmntRsltCntnt + '</td>';
						html += '</tr>';
					})
				} else {
					html += '<tr>';
					html += '<td colspan ="11" style="text-align: center"> 데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#MO44010S_DealList').html(html);
			}
		});
	}
};

/**
 * 더블클릭시
 */
function setDealInfo(e) {
	var tr = $(e);							// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;		// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var stdDt = td.eq(0).text();								// 기준일자
	var ibDealNo = td.eq(5).text();								// IBDEALNO
	var ibDealNm = td.eq(6).text();								// IBDEAL명(안건명)
	var empNm = td.eq(8).text();								// 담당심사역

	var riskInspctCcd = td.eq(11).text();						// 리스크심사구분코드
	var lstCCaseCcd = td.eq(12).text();							// 부수안건구분코드
	var inspctDprtCcd = td.eq(13).text();						// 심사부서구분코드 
	var ownPEno = td.eq(14).text();								// 사원번호

	var exmntRsltCntnt = td.eq(15).text();						// 조치내용

	$('#MO44010S_selectedStdDt').val(stdDt);
	$('#MO44010S_selectedIbDealNo').val(ibDealNo);
	$('#MO44010S_selectedIbDealNm').val(ibDealNm);
	$('#MO44010S_selectedEmpNm').val(empNm);

	$('#MO44010S_riskInspctCcd').val(riskInspctCcd);
	$('#MO44010S_lstCCaseCcd').val(lstCCaseCcd);
	$('#MO44010S_inspctDprtCcd').val(inspctDprtCcd);
	$('#MO44010S_ownPEno').val(ownPEno);

	$('#MO44010S_exmntRsltCntnt').val(exmntRsltCntnt);

	$('#MO44010S_DealList tr').removeClass('table-active');
	// 클릭한 행에 active 클래스 추가
	$(this).addClass('table-active');
}

function saveDealExmnt() {
	var ibDealNo = $('#MO44010S_selectedIbDealNo').val();
	var riskInspctCcd = $('#MO44010S_riskInspctCcd').val();
	var lstCCaseCcd = $('#MO44010S_lstCCaseCcd').val();
	var exmntRsltCntnt = $('#MO44010S_exmntRsltCntnt').val();
	var stdDt = $('#MO44010S_selectedStdDt').val();
	
	// TODO: 권한정보 취득하여 심사역/심사부서장 별 확인사항 업데이트 필요
	
	if(!isEmpty(exmntRsltCntnt)) {
		if(!isEmpty(ibDealNo)){
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal을 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	 } else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "조치사항을 입력해주세요."
			, confirmButtonText: "확인"
		});
	}

	function businessFunction(){
		var dtoParam = {
			"ibDealNo"			: ibDealNo
			, "stdDt"			: stdDt
			, "exmntRsltCntnt"	: exmntRsltCntnt
			, "riskInspctCcd"	: riskInspctCcd
			, "lstCCaseCcd"		: lstCCaseCcd
		}
		

		$.ajax({
			type: "GET",
			url: "/MO44010S/saveDealExmnt",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				

				if(data > 0){
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "조치사항을 저장하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {
						location.reload();
					});
				}else {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "조치사항을 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			}
		});
	}
}






