const TB08036Sjs = (function(){
	$(document).ready(function() {

	});
	
	function btnResetTB08036S() {
		$('#TB08036S_ibDealNo').val('');
		$('#TB08036S_ibDealNm').val('');
		$('#TB08036S_inspctYyMm').val('');
		
		clearObject();
	}
	
	function clearObject() {
		$('#tab-1 input').each(function() {
			$(this).val('');
		})
	
		$('#tab-1 select').each(function() {
			$(this).find('option:eq(0)').prop("selected", true).change();
		})
	
		$('#inspctRmrk').val('');
		$('#TB08036S_etcList').html('');
	}
	
	// TAB3  테이블 행추가
	function addRow() {
	
		var html = '';
	
		html += '<tr>';
		html += '<td><div class="input-group date"><input type="text" class="form-control" id="" placeholder="yyyy-mm-dd" value=""><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>';
		html += '<td><input type="text" class="form-control" id="" style="width: 100%;"></td>';
		html += '<td><input type="text" class="form-control" id="" style="width: 100%;"></td>';
		html += '<td><input type="checkbox" class="form-control" id=""></td>';
		html += '</tr>';
	
		$('#TB08036S_etcList').append(html);
	
		dpDate = $('.input-group.date').datepicker({
			format: "yyyy-mm-dd",
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			calendarWeeks: false,
			autoclose: true,
			language : "ko"
		});
	
	}
	
	// TAB3  테이블 행삭제
	function delRow() {
	
	}
	
	function getDealInfoTB08036S() {
		
		if (isEmpty($('#TB08036S_ibDealNo').val())) {
			openPopup({
				type: 'error'
				, title: "Error!"
				, text: 'Deal번호를 입력해주세요!'
			});
	
			return false;
		}
		
		var paramData = {
			"dealNo": $('#TB08036S_ibDealNo').val()
			, "inspctYyMm" : replaceAll($('#TB08036S_inspctYyMm').val(), '-', '')
		}
		
		$.ajax({
			type: "GET",
			url: "/TB08036S/getDealInfoTB08036S",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var dealInfo = data;
				
				$('#slStDt').val(formatDate(dealInfo.slStDt));
				$('#slEdDt').val(formatDate(dealInfo.slEdDt));
				$('#slPrd').val(dealInfo.slPrd);
				$('#cnstStDt').val(formatDate(dealInfo.cnstStDt));
				$('#cnstEdDt').val(formatDate(dealInfo.cnstEdDt));
				$('#cnstPrd').val(dealInfo.cnstPrd);
				$('#crdtRifcIsttCtns').val(dealInfo.crdtRifcIsttCtns);
				$('#unitNum').val(dealInfo.unitNum);
				$('#loanBondTakYn').val(dealInfo.loanBondTakYn).prop("selected", true).change();
				$('#prfbIslfEvl').val(dealInfo.prfbIslfEvl).prop("selected", true).change();
				$('#ipreYn').val(dealInfo.ipreYn).prop("selected", true).change();
				$('#clcIntlGrd').val(dealInfo.clcIntlGrd);
				$('#dcsnIntlGrd').val(dealInfo.dcsnIntlGrd);
				$('#mgtnRt').val(dealInfo.mgtnRt);
				$('#estmPrgsRt').val(dealInfo.estmPrgsRt);
				$('#pfmcPrgsRt').val(dealInfo.pfmcPrgsRt);
				$('#busiPrgStep').val(dealInfo.busiPrgStep);
				$('#checkRslt').val(dealInfo.checkRslt).prop("selected", true).change();
				$('#bsnBdSlltBalcCheckOpnn').val(dealInfo.bsnBdSlltBalcCheckOpnn);
				
				$('#inspctRmrk').val(dealInfo.inspctRmrk);
				
				var lstInspctRmrk = data.lstInspctRmrk;
				var html = "";
				
				lstInspctRmrk.forEach(function(tr, index) {
					html += '<tr>';
					html += '<td><div class="input-group date"><input type="text" class="form-control" value="' + tr.inspctDt + '"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>';
					html += '<td><input type="text" class="form-control" style="width: 100%;" value="' + tr.inspctRmrk + '"></td>';
					html += '<td><input type="text" class="form-control" style="width: 100%;" value="' + tr.rmrk + '"></td>';
					html += '<td><input type="checkbox" class="form-control"></td>';
					html += '</tr>';
				});
				
				$('#TB08036S_etcList').html(html);
				
				dpDate = $('.input-group.date').datepicker({
					format: "yyyy-mm-dd",
					todayBtn: "linked",
					keyboardNavigation: false,
					forceParse: false,
					calendarWeeks: false,
					autoclose: true,
					language : "ko"
				});
			},
			error: function() {
				clearObject();
			}
			
		});/* end of ajax*/
		
	}
	
	function modifyDealInfoTB08036S() {
		
		if (isEmpty($('#TB08036S_ibDealNo').val())) {
			openPopup({
				type: 'error'
				, title: "Error!"
				, text: 'Deal번호를 입력해주세요!'
			});
	
			return false;
		}
		
		var paramData = getParamData();
		
	
		$.ajax({
			type: "POST",
			url: "/TB08036S/modifyDealInfoTB08036S",
			data: JSON.stringify(paramData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
			},
			error: function() {
			},
			complete: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "정보를 저장하였습니다."
					, confirmButtonText: "확인"
				});
			}
			
		});/* end of ajax*/
	}
	
	function deleteDealInfoTB08036S() {
		
		if (isEmpty($('#TB08036S_ibDealNo').val())) {
			openPopup({
				type: 'error'
				, title: "Error!"
				, text: 'Deal번호를 입력해주세요!'
			});
	
			return false;
		}
		
		Swal.fire({
			title: "정보를 삭제 하시겠습니까?",
			//text: "대출이 실행됩니다.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '확인',
			cancelButtonText: '취소'
		}).then((result) => {
			// isConfirmed
			// isDenied
			// isDismissed
			if (result.isConfirmed) {
				businessFunction();
			} else if (result.isDismissed) {
			}
		})
		
		function businessFunction() {
			var paramData = getParamData();
		
	
			$.ajax({
				type: "POST",
				url: "/TB08036S/deleteDealInfoTB08036S",
				data: JSON.stringify(paramData),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				complete: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "정보를 삭제하였습니다."
						, confirmButtonText: "확인"
					}).then(() => {
						getDealInfoTB08036S()
					})
				}
				
			});/* end of ajax*/
		}
	}
	
	function getParamData() {
		
		var etcList = new Array();
	
		$('#TB08036S_etcList tr').each(function(){
			var td = $(this).children();
			
			var etc = {
				  "dealNo"		: $('#TB08036S_ibDealNo').val()
				, "inspctDt"	: td.eq(0).find('input').val()
				, "inspctRmrk"	: td.eq(1).find('input').val()
				, "rmrk"		: td.eq(2).find('input').val()
			}
			
			etcList.push(etc);
		})
		
		var paramData = {
			"dealNo": $('#TB08036S_ibDealNo').val()									// Deal번호
			, "inspctYyMm" : replaceAll($('#TB08036S_inspctYyMm').val(), '-', '')	// 점검기준년월
			
			, "slStDt" : replaceAll($('#slStDt').val(), '-', '')					// 분양시작일
			, "slEdDt" : replaceAll($('#slEdDt').val(), '-', '')					// 분양종료일			
			, "slPrd" : replaceAll($('#slPrd').val(), '-', '')						// 분양기간
			, "cnstStDt" : replaceAll($('#cnstStDt').val(), '-', '')				// 공사시작일
			, "cnstEdDt" : replaceAll($('#cnstEdDt').val(), '-', '')				// 공사종료일
			, "cnstPrd" : replaceAll($('#cnstPrd').val(), '-', '')					// 공사기간
			, "crdtRifcIsttCtns" : $('#crdtRifcIsttCtns').val()						// 신용보강기관내용
			, "unitNum" : $('#unitNum').val()										// 세대수
			, "loanBondTakYn" : $('#loanBondTakYn').val()							// 대출채권양수여부
			, "prfbIslfEvl" : $('#prfbIslfEvl').val()								// 사업성자체평가
			, "ipreYn" : $('#ipreYn').val()											// IPRE여부
			, "clcIntlGrd" : $('#clcIntlGrd').val()									// 계산내부등급
			, "dcsnIntlGrd" : $('#dcsnIntlGrd').val()								// 확정내부등급
			, "mgtnRt" : $('#mgtnRt').val()											// 이주율
			, "estmPrgsRt" : $('#estmPrgsRt').val()									// 예상진척율
			, "pfmcPrgsRt" : $('#pfmcPrgsRt').val()									// 실적진척율
			, "busiPrgStep" : $('#busiPrgStep').val()								// 사업진행단계
			
			, "checkRslt" : $('#checkRslt').val()									// 점검결과
			, "bsnBdSlltBalcCheckOpnn" : $('#bsnBdSlltBalcCheckOpnn').val()			// 영업점분양수지점검의견
			
			, "inspctRmrk" : $('#inspctRmrk').val()									// 점검결과
			
			, "lstInspctRmrk" : etcList
			// , "" : $('#').val()
		}
		
		return paramData;
	}
	
	return{
		getDealInfoTB08036S : getDealInfoTB08036S
		, btnResetTB08036S : btnResetTB08036S
		, delRow : delRow
		, addRow : addRow
		, modifyDealInfoTB08036S : modifyDealInfoTB08036S
		, deleteDealInfoTB08036S : deleteDealInfoTB08036S
	}
})();