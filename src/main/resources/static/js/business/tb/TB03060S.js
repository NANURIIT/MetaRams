$(document).ready(function() {
	
	$('.table').footable();
	$('#TB03060S_erlmDt').val(getToday());
	getSlctBox();
});

//기업체번호 조회
function getArdyBzepInfo() {
	let msgError = "";

	var ardyBzepNo = $('#TB03060S_ardyBzepNo').val()		//기업체번호

	if (isEmpty(ardyBzepNo)) {
		msgError = "기업체번호를 입력해주세요.";
		alertPopup();
	}

	function alertPopup() {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: msgError
			, confirmButtonText: "확인"
		});
	}

	var inParam = {
			"ardyBzepNo": ardyBzepNo				//기업체번호			
	};  

	$.ajax({
		type: "GET",
		url: "/TB03060S/getArdyBzepInfo",
		data: inParam,
		dataType: "json",
		success: function(data) {
			alert(JSON.stringify(data))

			/* 기본정보*/
			$('#TB03060S_bzplDvsnCd').val(data.bzplDvsnCd)				//사업장구분
			$('#TB03060S_getArdyBzepNo').val(data.ardyBzepNo)			//기업체번호
			$('#TB03060S_bzepName').val(data.bzepName)					//업체명
			$('#TB03060S_engBzplName').val(data.engBzplName)			//영문사업자명
			$('#TB03060S_rnbn').val(data.rnbn)							//사업자등록번호
			$('#TB03060S_crno').val(data.crno)							//법인등록번호
			$('#TB03060S_niceiBzepCd').val(data.niceiBzepCd)			//나이스신용평가업체코드
			$('#TB03060S_zpcd').val(data.zpcd)							//우편번호
			$('#TB03060S_atno').val(data.atno)							//전화지역번호
			$('#TB03060S_btno').val(data.btno)							//전화국번호
			$('#TB03060S_stno').val(data.stno)							//전화일련번호
			$('#TB03060S_faxAtno').val(data.faxAtno)					//Fax전화지역번호
			$('#TB03060S_faxBtno').val(data.faxBtno)					//Fax전화국번호
			$('#TB03060S_faxStno').val(data.faxStno)					//Fax전화일련번호
			$('#TB03060S_korBzplAddr').val(data.korBzplAddr)			//한글사업장주소
			$('#TB03060S_engBzplAddr').val(data.engBzplAddr)			//영문사업장주소

			/* 세부정보*/
			$('#TB03060S_smetYn').val(data.smetYn)						//중소기업여부
			$('#TB03060S_stdIdstSclsCd').val(data.stdIdstSclsCd)		//표준산업소분류
			$('#TB03060S_etprShapDvsnCd').val(data.etprShapDvsnCd)		//기업형태구분
			$('#TB03060S_bucoName').val(data.bucoName)					//업태명
			$('#TB03060S_etprScleDvsnCd').val(data.etprScleDvsnCd)		//기업규모구분
			$('#TB03060S_ctmBicName').val(data.ctmBicName)				//CTM은행인식코드명
			$('#TB03060S_rdmTrOppnNo').val(data.rdmTrOppnNo)			//RDM거래상대방번호
			$('#TB03060S_erlmDt').val(formatDate(data.erlmDt))			//등록일자
			$('#TB03060S_clseDvsnCd').val(data.clseDvsnCd)				//폐업구분
			$('#TB03060S_clseDt').val(formatDate(data.clseDt))			//폐업일자
			$('#TB03060S_leiCd').val(data.leiCd)						//LEI코드
			$('#TB03060S_swiftBankDscmCd').val(data.swiftBankDscmCd)	//SWIFT은행식별코드
			$('#TB03060S_rvnuAmt').val(Number(handleNullData(data.rvnuAmt)).toLocaleString())						//매출금액	
			$('#TB03060S_totAsstAmt').val(Number(handleNullData(data.totAsstAmt)).toLocaleString())     			//총자산금액
			$('#TB03060S_fnafHltySrnmRt').val(data.fnafHltySrnmRt)		//재무건전성비율
			$('#TB03060S_ovrsSpcYn').val(data.ovrsSpcYn)				//해외SPC여부
			$('#TB03060S_useYnY').val(data.useYn)						//사용여부

			$('.table').trigger('footable_initialize');
		}

	});
}

//저장
function saveArdyBzepInfo() {

	let msgError = "";

	var bzplDvsnCd = $('#TB03060S_bzplDvsnCd').val()			//사업장구분

	// if (isEmpty(bzplDvsnCd)) {
	// 	msgError = "사업장구분을 선택해주세요.";
	// 	alertPopup();
	// } else {
	// 	businessFunction();
	// }

	businessFunction();

	function alertPopup() {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: msgError
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var inParam = {
			"ardyBzepNo": $('#TB03060S_ardyBzepNo').val()					//기업체번호
			, "bzplDvsnCd": $('#TB03060S_bzplDvsnCd').val()					//사업장구분
			, "bzepName": $('#TB03060S_bzepName').val()						//업체명
			, "engBzplName": $('#TB03060S_engBzplName').val()				//영문사업자명
			, "rnbn": $('#TB03060S_rnbn').val()								//사업자등록번호
			, "crno": $('#TB03060S_crno').val()								//법인등록번호
			, "niceiBzepCd": $('#TB03060S_niceiBzepCd').val()				//나이스신용평가업체코드
			, "zpcd": $('#TB03060S_zpcd').val()								//우편번호
			, "atno": $('#TB03060S_atno').val()								//전화지역번호
			, "btno": $('#TB03060S_btno').val()								//전화국번호
			, "stno": $('#TB03060S_stno').val()								//전화일련번호
			, "faxAtno": $('#TB03060S_faxAtno').val()						//Fax전화지역번호
			, "faxBtno": $('#TB03060S_faxBtno').val()						//Fax전화국번호
			, "faxStno": $('#TB03060S_faxStno').val()						//Fax전화일련번호
			, "korBzplAddr": $('#TB03060S_korBzplAddr').val()				//한글사업장주소
			, "engBzplAddr": $('#TB03060S_engBzplAddr').val()				//영문사업장주소
			, "smetYn": $('#TB03060S_smetYn').val()							//중소기업여부
			, "stdIdstSclsCd": $('#TB03060S_stdIdstSclsCd').val()			//표준산업소분류
			, "etprShapDvsnCd": $('#TB03060S_etprShapDvsnCd').val()			//기업형태구분
			, "bucoName": $('#TB03060S_bucoName').val()						//업태명
			, "etprScleDvsnCd": $('#TB03060S_etprScleDvsnCd').val()			//기업규모구분
			, "ctmBicName": $('#TB03060S_ctmBicName').val()					//CTM은행인식코드명
			, "erlmDt": replaceAll($('#TB03060S_erlmDt').val(), '-', '')    //등록일자
			, "clseDvsnCd": $('#TB03060S_clseDvsnCd').val()					//폐업구분
			, "clseDt": replaceAll($('#TB03060S_clseDt').val(), '-', '')	//폐업일자
			, "rdmTrOppnNo": $('#TB03060S_rdmTrOppnNo').val()				//RDM거래상대방번호
			, "leiCd": $('#TB03060S_leiCd').val()							//LEI코드
			, "swiftBankDscmCd": $('#TB03060S_swiftBankDscmCd').val()		//SWIFT은행식별코드
			, "rvnuAmt": replaceAll($('#TB03060S_rvnuAmt').val(), ',', '')						//매출금액
			, "totAsstAmt": replaceAll($('#TB03060S_totAsstAmt').val(), ',', '')					//총자산금액
			, "fnafHltySrnmRt": $('#TB03060S_fnafHltySrnmRt').val()			//재무건전성비율
			, "ovrsSpcYn": $('#TB03060S_ovrsSpcYn').val()					//해외SPC여부
			, "ovrsSpcYn": $('#TB03060S_useYnY').val()						//사용여부

		};

		$.ajax({
			type: "POST",
			url: "/TB03060S/saveArdyBzepInfo",
			data: inParam,
			dataType: "json",
			success: function(data) {
				alert(JSON.stringify(data))
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "고객정보등록하였습니다."
					, confirmButtonText: "확인"
				})
			},
			error: function(data) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "고객정보등록에 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}

		});
	}
};

//삭제 - 기업체 정보 사용여부 수정
function deleteArdyBzepInfo() {

	let msgError = "";

	// if (isEmpty(TB03060S_ardyBzepNo)) {
	// 	msgError = "사업장구분을 선택해주세요.";
	// 	alertPopup();

	// } else {
	// 	businessFunction();
	// }

	businessFunction();

	function alertPopup() {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: msgError
			, confirmButtonText: "확인"
		});
	}

	function businessFunction() {

		var inParam = {
			"ardyBzepNo": $('#TB03060S_ardyBzepNo').val()		//기업체번호
		};

		$.ajax({
			type: "POST",
			url: "/TB03060S/deleteArdyBzepInfo",
			data: inParam,
			dataType: "json",
			success: function(data) {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "고객정보삭제하였습니다."
					, confirmButtonText: "확인"
				})
				reset_TB0306OS();
			},
			error: function(data) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "고객정보삭제 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}

		});
	}
};


/**
 * 초기화
 */
function reset_TB0306OS() {
	$('#TB03060S_ardyBzepNo').val("");;				//기업체번호
	$('#TB03060S_bzplDvsnCd').val("");				//사업장구분
	$('#TB03060S_bzepName').val("");				//업체명
	$('#TB03060S_engBzplName').val("");				//영문사업자명
	$('#TB03060S_rnbn').val("");					//사업자등록번호
	$('#TB03060S_crno').val("");					//법인등록번호
	$('#TB03060S_niceiBzepCd').val("");				//나이스신용평가업체코드
	$('#TB03060S_zpcd').val("");					//우편번호
	$('#TB03060S_atno').val("");					//전화지역번호
	$('#TB03060S_btno').val("");					//전화국번호
	$('#TB03060S_stno').val("");					//전화일련번호
	$('#TB03060S_faxAtno').val("");					//Fax전화지역번호
	$('#TB03060S_faxBtno').val("");					//Fax전화국번호
	$('#TB03060S_faxStno').val("");					//Fax전화일련번호
	$('#TB03060S_korBzplAddr').val("");				//한글사업장주소
	$('#TB03060S_engBzplAddr').val("");				//영문사업장주소
	$('#TB03060S_smetYn').val("");					//중소기업여부
	$('#TB03060S_stdIdstSclsCd').val("");			//표준산업소분류
	$('#TB03060S_etprShapDvsnCd').val("");			//기업형태구분
	$('#TB03060S_bucoName').val("");				//업태명
	$('#TB03060S_etprScleDvsnCd').val("");			//기업규모구분
	$('#TB03060S_ctmBicName').val("");				//CTM은행인식코드명
	$('#TB03060S_clseDvsnCd').val("");				//폐업구분
	$('#TB03060S_clseDt').val("");					//폐업일자
	$('#TB03060S_rdmTrOppnNo').val("");				//RDM거래상대방번호
	$('#TB03060S_leiCd').val("");					//LEI코드
	$('#TB03060S_swiftBankDscmCd').val("");			//SWIFT은행식별코드
	$('#TB03060S_rvnuAmt').val("");					//매출금액
	$('#TB03060S_totAsstAmt').val("");				//총자산금액
	$('#TB03060S_fnafHltySrnmRt').val("");			//재무건전성비율
	$('#TB03060S_ovrsSpcYn').val("");				//해외SPC여부
	$('#TB03060S_useYnY').val("");					//사용여부
}

//selectBox 데이터 가져오기
function getSlctBox(){

	$.ajax({
		  type: "GET",
		  url: "/TB03060S/getArdyBzepCd",
		  dataType: "json",
		  success: function(data) {
			  //사업장구분 select box 초기화
			  $('#TB03060S_bzplDvsnCd').empty();
			  $('#TB03060S_bzplDvsnCd').prepend('<option value="">선택</option>');
			
			  //표준산업소분류 select box 초기화
			  $('#TB03060S_stdIdstSclsCd').empty();
			  $('#TB03060S_stdIdstSclsCd').prepend('<option value="">선택</option>');
	
			  //기업형태구분 select box 초기화
			  $('#TB03060S_etprShapDvsnCd').empty();
			  $('#TB03060S_etprShapDvsnCd').prepend('<option value="">선택</option>');

			  //기업규모구분 select box 초기화
			  $('#TB03060S_etprScleDvsnCd').empty();
			  $('#TB03060S_etprScleDvsnCd').prepend('<option value="">선택</option>');
		
			  $.each(data, function (key, value) {
				//B022(사업장구분코드), SOO7(표준산업분류코드), E034(기업형태구분코드), E035(기업규모구분코드)
				if(value.cmnsCdGrp == "B022"){	
					$('#TB03060S_bzplDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');						
				} else if(value.cmnsCdGrp == "S007"){
					$('#TB03060S_stdIdstSclsCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} else if(value.cmnsCdGrp == "E034"){
					$('#TB03060S_etprShapDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} else if(value.cmnsCdGrp == "E035"){
					$('#TB03060S_etprScleDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} 
  
			  });
			} 
	});
  
  }