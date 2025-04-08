$(document).ready(function() {
	$('#TB06019P_erlmDt').val(getToday());
	getSlctBox();
	checkBoxChangeFunction();
	defaultNumberFormat();
	inputNumberChangeFunction();
	selectorNumberFormater(
		      $("input[id*='Amt'], input[id*='Num']")
		);
	$("#TB06019P_rnbn").inputmask('999-99-99999');
	$("#TB06019P_crno").inputmask('999999-9999999');

});


function defaultNumberFormat(){	
	$("input[id*='Amt'], input[id*='Num']").val("0");	
	//재무건정성비율
	$("#TB06019P_fnafHltySrnmRt").val("0.00");
}

/**
 * show modal 
 */
function callTB06019P(prefix) {

	$('#TB06019P_prefix').val(prefix);
	$('#modal-TB06019P').modal('show');
	indexChangeHandler("TB06019P");
	setKeyFunction_TB06019P();
	$('#TB06019P_delBtn').prop('disabled', true);
	getSelectBoxCode2('TB06019P', 'Z010');

}

function vldDelBtn() {
	const entpCd = $('#TB06019P_getArdyBzepNo').val();
	if(entpCd === '' || entpCd === undefined){
		$('#TB06019P_delBtn').prop('disabled', true);
	}else{
		$('#TB06019P_delBtn').prop('disabled', false);
	}
}

function srchParam(){
	$('#con-srchParam input').val('');
	
	$("#TB06019P_bzplDvsnCd option:eq(0)").prop("selected", true);
	$("#TB06019P_Z010 option:eq(0)").prop("selected", true);
	$("#TB06019P_etprShapDvsnCd option:eq(0)").prop("selected", true);
	$("#TB06019P_stdIdstSclsCd option:eq(0)").prop("selected", true);
	$("#TB06019P_etprScleDvsnCd option:eq(0)").prop("selected", true);

	//$("input:radio[name='smetYn']").prop('checked',false);
	//$("input:radio[name='clseDvsnCd']").prop('checked',false);
	//$("input:radio[name='ovrsSpcYn']").prop('checked',false);
	//$("input:radio[name='useYn']").prop('checked',false);
	$('#smetYn_N').prop('checked',true);
	$('#clseDvsnCd_N').prop('checked',true);
	$('#ovrsSpcYn_N').prop('checked',true);
	$('#useYn_N').prop('checked',true);
	
	//spc여부
	$("#TB06019P_spcYn").prop('checked',true);
	//사업자등록번호
	$("#TB06019P_rnbn").val("999-99-99999").prop('readonly',true);
	
	defaultNumberFormat();
}

/**
 * hide modal
 */
function modalClose_TB06019P() {
	reset_TB06019P();
	$('#modal-TB06019P').modal('hide');
};
function setKeyFunction_TB06019P() {
	$("input[id=TB06019P_ardyBzepNo]").keyup(function (key) {
		if (key == 13 || $("#TB06019P_ardyBzepNo").val().length == 13) {
			getArdyBzepInfo();
		}

		if ($("#TB06019P_ardyBzepNo").val().length === 0) {
			$("#TB06019P_entpNm").val('');
			reset_TB06019P();
		}
	});
}
// 기업체번호 oninput 이벤트
$("#TB06019P_ardyBzepNo").on("propertychange change paste input", function() {
	if (this.value.length === $("#TB06019P_ardyBzepNo").prop('maxlength')) {
		getArdyBzepInfo();
	}
});


/**
 * 기업체번호 변경이벤트
 */
$("#TB06019P_srch_ardyBzepNo").on("propertychange change paste input", function() {
	if (this.value.length === $("#TB06019P_srch_ardyBzepNo").prop('maxlength')) {
		getArdyBzepInfo();
	}
});

/**
 * 재무건정성비율 변경이벤트
 */
function inputNumberChangeFunction(){
	$("#TB06019P_fnafHltySrnmRt").on('change',function(){
		var formatNum="000.00";
		if($("#TB06019P_fnafHltySrnmRt").val() > 999.99 ){
			Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "재무건전성 비율은 000.00 형식으로 작성해주세요.;"
					, confirmButtonText: "확인"
					})
			$("#TB06019P_fnafHltySrnmRt").val('');
			$("#TB06019P_fnafHltySrnmRt").focus();		
			return false;		
		}
		formatNum=(Math.round($("#TB06019P_fnafHltySrnmRt").val()*100)/100).toFixed(2);
		$("#TB06019P_fnafHltySrnmRt").val(formatNum);
	});
}

/**
 * spc여부 변경이벤트
 */
function checkBoxChangeFunction(){
	$("#TB06019P_spcYn").on('change',function(){
		console.log($("#TB06019P_spcYn").prop('checked'));

		if($("#TB06019P_spcYn").prop('checked') == true){
			if(isNotEmpty($('#TB06019P_rnbn').val()) && $('#TB06019P_rnbn').val()!="999-99-99999"){
				$("#TB06019P_spcYn").prop('checked',false);
				Swal.fire({
					title: '기등록된 사업자번호가 존재합니다.',
					icon: 'error',
					confirmButtonText: '확인',					
				});
				return ;
			}
					
			$("#TB06019P_rnbn").val("999-99-99999");
			$("#TB06019P_rnbn").prop('readonly',true);
		}else{
			$("#TB06019P_rnbn").val("");
			$("#TB06019P_rnbn").prop('readonly',false);
			$("#TB06019P_rnbn").focus();
		}
	});
}



// 모달리셋
function reset_TB06019P () {
	let inputLength = $("#modal-TB06019P :input").length;
	for (let i = 0; i < inputLength; i++) {
		$("#modal-TB06019P :input:eq("+i+")").val("");
		
	}

	$("#TB06019P_bzplDvsnCd option:eq(0)").prop("selected", true);
	$("#TB06019P_Z010 option:eq(0)").prop("selected", true);
	$("#TB06019P_etprShapDvsnCd option:eq(0)").prop("selected", true);
	$("#TB06019P_stdIdstSclsCd option:eq(0)").prop("selected", true);
	$("#TB06019P_etprScleDvsnCd option:eq(0)").prop("selected", true);
	$('#smetYn_N').prop('checked',true);
	$('#clseDvsnCd_N').prop('checked',true);
	$('#ovrsSpcYn_N').prop('checked',true);
	$('#useYn_N').prop('checked',true);
	//spc여부
	$("#TB06019P_spcYn").prop('checked',true);
	//사업자등록번호
	$("#TB06019P_rnbn").val("999-99-99999").prop('readonly',true);
	
	defaultNumberFormat();

	/**
	 * 초기화시 삭제버튼 비활성화
	 */
	vldDelBtn();
}

//기업체번호 조회
function getArdyBzepInfo() {
	let msgError = "";

	var ardyBzepNo = $('#TB06019P_srch_ardyBzepNo').val()		//기업체번호

	if (isEmpty(ardyBzepNo)) {
		msgError = "기업체번호를 입력해주세요.";
		alertPopup();
	}

	function alertPopup() {
		Swal.fire({
			icon: 'warning'
			, title: "Warning!"
			, text: msgError
			, confirmButtonText: "확인"
		});
	}

	var inParam = {
			"ardyBzepNo": ardyBzepNo				//기업체번호			
	};

	$.ajax({
		type: "GET",
		url: "/TB06019P/getArdyBzepInfo",
		data: inParam,
		dataType: "json",
		success: function(data) {
			/* 기본정보*/
			$('#TB06019P_bzplDvsnCd').val(data.bzplDvsnCd);				//사업장구분
			$('#TB06019P_getArdyBzepNo').val(data.ardyBzepNo)			//기업체번호
			$("#TB06019P_srch_entpNm").val(data.entpNm);				//상단기업명
			$('#TB06019P_entpNm').val(data.entpNm);						//업체명
			$('#TB06019P_engBzplName').val(data.engBzplName);			//영문사업자명
			$('#TB06019P_rnbn').val(checkBrnAcno(data.rnbn));			//사업자등록번호
			$('#TB06019P_crno').val(checkBrnAcno(data.crno));			//법인등록번호
			$('#TB06019P_niceiBzepCd').val(data.niceiBzepCd);			//나이스신용평가업체코드
			$('#TB06019P_zpcd').val(data.zpcd);							//우편번호
			$('#TB06019P_atno').val(data.atno);							//전화지역번호
			$('#TB06019P_btno').val(data.btno);							//전화국번호
			$('#TB06019P_stno').val(data.stno);							//전화일련번호
			$('#TB06019P_faxAtno').val(data.faxAtno);					//Fax전화지역번호
			$('#TB06019P_Z010').val(data.faxBtno);						//Fax전화국번호
			$('#TB06019P_faxStno').val(data.faxStno);					//Fax전화일련번호
			$('#TB06019P_korBzplAddr').val(data.korBzplAddr);			//한글사업장주소
			$('#TB06019P_engBzplAddr').val(data.engBzplAddr);			//영문사업장주소
			data.spcYn=="Y" ? $('#TB06019P_spcYn').prop('checked',true): $("#TB06019P_spcYn").prop("checked", false);	//spc여부		

			/* 세부정보*/
			data.smetYn=="Y" ? $("#smetYn_Y").prop("checked", true):	$('#smetYn_N').prop('checked',true);			
			data.clseDvsnCd=="Y" ?	$('#clseDvsnCd_Y').prop('checked',true) :$('#clseDvsnCd_N').prop('checked',true);			
			data.ovrsSpcYn=="Y" ?  $('#ovrsSpcYn_Y').prop('checked',true) :$('#ovrsSpcYn_N').prop('checked',true);	
			data.useYn=="Y" ?  $('#useYn_Y').prop('checked',true) :$('#useYn_N').prop('checked',true);
			$('#TB06019P_stdIdstSclsCd').val(data.stdIdstSclsCd).prop('selected', true);		//표준산업소분류
			$('#TB06019P_etprShapDvsnCd').val(data.etprShapDvsnCd).prop('selected', true);		//기업형태구분
			$('#TB06019P_bucoName').val(data.bzcnNm);					//업태명
			$('#TB06019P_etprScleDvsnCd').val(data.eprzSclDcd).prop('selected', true);		//기업규모구분
			$('#TB06019P_ctmBicName').val(data.ctmBicName);				//CTM은행인식코드명
			$('#TB06019P_rdmTrOppnNo').val(data.rdmTrOppnNo);			//RDM거래상대방번호
			$('#TB06019P_erlmDt').val(formatDate(data.rgstDt));			//등록일자
			$('#TB06019P_estDt').val(formatDate(data.estDt));			//설립일자
			$('#TB06019P_clseDt').val(formatDate(data.clseDt));			//폐업일자
			$('#TB06019P_stffNum').val(data.stffNum);					//임직원수
			$('#TB06019P_oprtHnfNum').val(data.oprtHnfNum);				//운영인력수
			
			$('#TB06019P_leiCd').val(data.leiCd);						//LEI코드
			$('#TB06019P_swiftBankDscmCd').val(data.swiftBankDscmCd);	//SWIFT은행식별코드
			if (!isEmpty(data.rvnuAmt)) {
				$('#TB06019P_rvnuAmt').val(addComma(data.rvnuAmt));			//매출금액
			} else {
				$('#TB06019P_rvnuAmt').val(data.rvnuAmt);				//매출금액
			}
			if (!isEmpty(data.totAsstAmt)) {
				$('#TB06019P_totAsstAmt').val(addComma(data.totAsstAmt));	//총자산금액
			} else {
				$('#TB06019P_totAsstAmt').val(data.totAsstAmt);			//총자산금액
			}
			$('#TB06019P_fnafHltySrnmRt').val((Math.round(data.fnafHltySrnmRt*100)/100).toFixed(2));		//재무건전성비율
			//$(":radio[name='clseDvsnCd']").radioSelect(data.clseDvsnCd); // 폐업구분
			//$(':radio[name="ovrsSpcYn"]').radioSelect(data.ovrsSpcYn);	//해외SPC여부
			//$(':radio[name="useYn"]').radioSelect(data.useYn);			//사용여부
			/**
			 * 조회 성공시 삭제버튼 활성화
			 */
			vldDelBtn();
		}

	});
}

//저장
function saveArdyBzepInfo() {
	
	/**
	 * validate
	 * @param {String} 사업자등록번호
	 * @param {String} 법인등록번호
	 * @param {String} 사업장구분
	 * @param {String} 업체명
	 */
	if ( !$('#TB06019P_bzplDvsnCd').val() ) {
		Swal.fire({
			icon: "warning"
			, title: "Warning!"
			, text: "사업장구분을 선택해주세요!"
		})
		return;
	}
	else if ( !$('#TB06019P_entpNm').val() ) {
		Swal.fire({
			icon: "warning"
			, title: "Warning!"
			, text: "업체명을 입력해주세요!"
		})
		return;
	}
	else if ( !$('#TB06019P_rnbn').val() || $('#TB06019P_rnbn').val().length < 12 ) {
		Swal.fire({
			icon: "warning"
			, title: "Warning!"
			, text: "사업자등록번호를 확인해주세요! (10자리)"
		})
		return;
	}
	else if ( !$('#TB06019P_crno').val() || $('#TB06019P_rnbn').val().length < 14 ) {
		Swal.fire({
			icon: "warning"
			, title: "Warning!"
			, text: "법인등록번호를 확인해주세요! (13자리)"
		})
		return;
	}

	if (validate('save')) 
		{
			Swal.fire({
				title : '기업체 저장',
				text : `기업에 대한 정보를 저장하시겠습니까?`,
				icon : "warning",
				showCancelButton : true,
				showConfirmButton : true,
				confirmButtonText : "예",
				cancelButtonText : "아니오",
			}).then((e) => {
				if (e.isConfirmed) {
					businessFunction();
				}
			}) ;
		}
	function businessFunction() {

		var inParam = {
			  "ardyBzepNo": $('#TB06019P_getArdyBzepNo').val()				//기업체번호
			, "bzplDvsnCd": $('#TB06019P_bzplDvsnCd').val()					//사업장구분
			, "entpNm": $('#TB06019P_entpNm').val()							//업체명
			, "engBzplName": $('#TB06019P_engBzplName').val()				//영문사업자명
			, "rnbn": $('#TB06019P_rnbn').val().replaceAll("-", "")			//사업자등록번호
			, "crno": $('#TB06019P_crno').val().replaceAll("-", "")			//법인등록번호
			, "niceiBzepCd": $('#TB06019P_niceiBzepCd').val()				//나이스신용평가업체코드
			, "zpcd": $('#TB06019P_zpcd').val()								//우편번호
			, "atno": $('#TB06019P_atno').val()								//전화지역번호
			, "btno": $('#TB06019P_btno').val()								//전화국번호
			, "stno": $('#TB06019P_stno').val()								//전화일련번호
			, "faxAtno": $('#TB06019P_faxAtno').val()						//Fax전화지역번호
			, "faxBtno": $('#TB06019P_Z010').val()							//Fax전화국번호
			, "faxStno": $('#TB06019P_faxStno').val()						//Fax전화일련번호
			, "korBzplAddr": $('#TB06019P_korBzplAddr').val()				//한글사업장주소
			, "engBzplAddr": $('#TB06019P_engBzplAddr').val()				//영문사업장주소
			, "smetYn": $("#smetYn_Y").is(":checked") ? "Y" :"N"			//중소기업여부
		    , "stdIdstSclsCd": $('#TB06019P_stdIdstSclsCd').val()			//표준산업소분류
			, "etprShapDvsnCd": $('#TB06019P_etprShapDvsnCd').val()			//기업형태구분
			, "bzcnNm": $('#TB06019P_bucoName').val()						//업태명
			, "eprzSclDcd": $('#TB06019P_etprScleDvsnCd').val()				//기업규모구분
			, "ctmBicName": $('#TB06019P_ctmBicName').val()					//CTM은행인식코드명
			, "estDt": $('#TB06019P_estDt').val().replaceAll("-", "")		//설립일자
			, "rgstDt": $('#TB06019P_erlmDt').val().replaceAll("-", "")		//등록일자
			, "clseDvsnCd": $("#clseDvsnCd_Y").is(":checked") ? "Y" :"N"	//폐업구분
			, "clseDt": $('#TB06019P_clseDt').val().replaceAll("-", "")		//폐업일자
			, "stffNum": $('#TB06019P_stffNum').val().replaceAll(",", "")	//임직원수
			, "oprtHnfNum": $('#TB06019P_oprtHnfNum').val().replaceAll(",", "")	//운용인력수
			, "rdmTrOppnNo": $('#TB06019P_rdmTrOppnNo').val()				//RDM거래상대방번호
			, "leiCd": $('#TB06019P_leiCd').val()							//LEI코드
			, "swiftBankDscmCd": $('#TB06019P_swiftBankDscmCd').val()		//SWIFT은행식별코드
			, "rvnuAmt": $('#TB06019P_rvnuAmt').val().replaceAll(",", "")		//매출금액
			, "totAsstAmt": $('#TB06019P_totAsstAmt').val().replaceAll(",", "") //총자산금액
			, "fnafHltySrnmRt": $('#TB06019P_fnafHltySrnmRt').val().replace("%", "") //재무건전성비율 
			, "ovrsSpcYn":  $("#ovrsSpcYn_Y").is(":checked") ? "Y" :"N"		//해외SPC여부
			, "spcYn" : (($("#TB06019P_spcYn").prop('checked') == true)? "Y":"N") //SPC여부
			, "useYn": $("#useYn_Y").is(":checked") ? "Y" :"N"					//사용여부
			
		};
		
		 $.ajax({
		 	type: "POST",
		 	url: "/TB06019P/saveArdyBzepInfo",
		 	data: inParam,
		 	dataType: "json",
		 	success: function(data) {
		 		Swal.fire({
		 			icon: 'success'
		 			, title: "Success!"
		 			, text: "기업정보를 등록하였습니다."
		 			, confirmButtonText: "확인"
		 		}).then(() => {
					$('#TB06019P_srch_ardyBzepNo').val(data.ardyBzepNo);	
					$('#TB06019P_ardyBzepNo').val(data.ardyBzepNo);					
					$('#TB06019P_entpNm').val(data.entpNm);
				});
		 	},
		 	error: function(e) {
		 		Swal.fire({
		 			icon: 'error'
		 			, title: "Error!"
		 			, text: "기업정보등록에 실패하였습니다."
		 			, confirmButtonText: "확인"
		 		});
		 	}

		 });
	}
};

//삭제 - 기업체 정보 사용여부 수정
function deleteArdyBzepInfo() {
	if (validate('delete')) 
	{
		Swal.fire({
			title : '기업체 삭제',
			text : `해당 기업을 삭제하시겠습니까?`,
			icon : "warning",
			showCancelButton : true,
			showConfirmButton : true,
			confirmButtonText : "예",
			cancelButtonText : "아니오",
		}).then((e) => {
			businessFunction();
			if (e.isConfirmed) {
				reset_TB06019P();
			}
		}) ;

		function businessFunction() {

			var inParam = {
				"ardyBzepNo": $('#TB06019P_getArdyBzepNo').val()		//기업체번호
			};

			$.ajax({
				type: "POST",
				url: "/TB06019P/deleteArdyBzepInfo",
				data: inParam,
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "기업을 삭제하였습니다."
						, confirmButtonText: "확인"
					})
					reset_TB06019P();
				},
				error: function(data) {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "기업삭제에 실패하였습니다. 관리자에게 문의하세요"
						, confirmButtonText: "확인"
					});
				}

			});
		}
	}
};



//selectBox 데이터 가져오기
function getSlctBox(){

	$.ajax({
		  type: "GET",
		  url: "/TB06019P/getArdyBzepCd",
		  dataType: "json",
		  success: function(data) {
			  //사업장구분 select box 초기화
			  $('#TB06019P_bzplDvsnCd').empty();
			  $('#TB06019P_bzplDvsnCd').prepend('<option value="">선택</option>');
			
			  //표준산업소분류 select box 초기화
			  $('#TB06019P_stdIdstSclsCd').empty();
			  $('#TB06019P_stdIdstSclsCd').prepend('<option value="">선택</option>');
	
			  //기업형태구분 select box 초기화
			  $('#TB06019P_etprShapDvsnCd').empty();
			  $('#TB06019P_etprShapDvsnCd').prepend('<option value="">선택</option>');

			  //기업규모구분 select box 초기화
			  $('#TB06019P_etprScleDvsnCd').empty();
			  $('#TB06019P_etprScleDvsnCd').prepend('<option value="">선택</option>');
		
			  $.each(data, function (key, value) {
				//B022(사업장구분코드), SOO7(표준산업분류코드), E034(기업형태구분코드), E035(기업규모구분코드)
				if(value.cmnsCdGrp == "B022"){	
					$('#TB06019P_bzplDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} else if(value.cmnsCdGrp == "S007"){
					$('#TB06019P_stdIdstSclsCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} else if(value.cmnsCdGrp == "E034"){
					$('#TB06019P_etprShapDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} else if(value.cmnsCdGrp == "E035"){
					$('#TB06019P_etprScleDvsnCd').append('<option value="' + value.cdVlId + '">' + value.cdVlNm + '</option>');
				} 
  
			  });
			} 
	});
  
  }
/**
 * validation 체크
 */
function validate (gb) 
{
	function emptyParameter(msg) {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: msg + "을(를) 입력해주세요."
			, confirmButtonText: "확인"
		})

	}	
	let msg = '';
	let input = '';
	switch ( gb ) {
		case "save":
			if (isEmpty($("#TB06019P_bzplDvsnCd option:selected").val())) {
				msg = '사업장구분';
				input = $('#TB06019P_bzplDvsnCd');
				input.focus();
				emptyParameter(msg);
				return false;
			}
			if (isEmpty($("#TB06019P_entpNm").val())) {
				msg = '업체명';
				input = $('#TB06019P_entpNm');
				input.focus();
				emptyParameter(msg);
				return false;
			}
			if (isEmpty($("#TB06019P_rnbn").val())) {
				msg = '사업자등록번호';
				input = $('#TB06019P_rnbn');
				input.focus();
				emptyParameter(msg);
				return false;
			} else if ($("#TB06019P_rnbn").val().length < 10) {
				msg = '사업자등록번호 10자리';
				input = $('#TB06019P_rnbn');
				input.focus();
				emptyParameter(msg);
				return false;
			}
			if (isEmpty($("#TB06019P_crno").val())) {
				msg = '법인등록번호';
				input = $('#TB06019P_crno');
				input.focus();
				emptyParameter(msg);
				return false;
			} else if ($("#TB06019P_crno").val().length < 10) {
				msg = '법인등록번호 13자리';
				input = $('#TB06019P_crno');
				input.focus();
				emptyParameter(msg);
				return false;
			}
			if (!isEmpty($("#TB06019P_fnafHltySrnmRt").val())) {
				let regExp = new RegExp(/^([0-9]{2,3}\.[0-9]{0,2})?$/g);
				if (!regExp.test(($("#TB06019P_fnafHltySrnmRt").val())) && $("#TB06019P_fnafHltySrnmRt").val()!='0.00') {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "재무건전성 비율은 000.00 형식으로 작성해주세요.;"
						, confirmButtonText: "확인"
				});
					return false;
				}
			}
			
			return true;
		case "delete":
			if (isEmpty($("#TB06019P_getArdyBzepNo").val())) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "삭제할 기업을 선택해주세요."
					, confirmButtonText: "확인"
				}, function() {
					$("#TB06019P_getArdyBzepNo").focus();
				})
				return false;
			}
			return true;
		default:
			break;
	}
}