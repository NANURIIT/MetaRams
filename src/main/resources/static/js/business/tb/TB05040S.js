const TB05040Sjs = (function(){
	let arrPqGridDealList; // 협의체 결과현황
	$(document).ready(function() {

		loadSelectBoxContents();
		
		getUrlDealInfo();
	/** 그리드 **/
	let arrPqGridObj = [
		// 협의체 결과현황
		{
		height: 150,
		maxHeight: 150,
		id: "gridIbDealList",
		colModel: colDealListInfo,
		},
	];
	setPqGrid(arrPqGridObj);
	arrPqGridDealList = $("#gridIbDealList").pqGrid("instance");
	});

	function getUrlDealInfo() {
		
		var ibDealNo = sessionStorage.getItem("dealNo");
		var riskInspctCcd = sessionStorage.getItem("riskInspctCcd");
		var lstCCaseCcd = sessionStorage.getItem("lstCCaseCcd");
		var inspctPrgrsStCd = sessionStorage.getItem("inspctPrgrsStCd");
		
		sessionStorage.clear(); // 세션클리어
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
			$('#TB05040S_ibDealNo').val(ibDealNo);
			$('#TB05040S_selectedDealNo').val(ibDealNo);
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
			// fileInfo(dtoParam);
			// docInfo(dtoParam);
			
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
			// url: "/getSelectBoxCode/R011", 
			url: "/getSelectBoxCode/R016", //RISK_INSPCT_RSLTN_CCD 리스크심사결의구분코드
			dataType: "json",
			success: function(data) {
				var html = "";
				//$('#TB05040S_riskInspctRsltnCcd').html(html);			// 전결협의체

				var codeList = data;
				if (codeList.length > 0) {
					$.each(codeList, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB05040S_riskInspctRsltnCcd').append(html);
			}
		});
	}

	// 결의협의체(심사협의구분코드)
	function loadRiskInspctRsltnCcd() {
		$.ajax({
			type: "GET",
			// url: "/getSelectBoxCode/I006",
			url: "/getSelectBoxCode/I008",
			dataType: "json",
			success: function(data) {
				var html = "";
				//$('#TB05040S_inspctCnfrncCcd').html(html);			// 결의협의체

				var codeList = data;
				if (codeList.length > 0) {
					$.each(codeList, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB05040S_inspctCnfrncCcd').append(html);
			}
		});
	}

	// 결의결과 RSLTN_RSLT_CD
	function loadRsltnRsltCd() {
		$.ajax({
			type: "GET",
			// url: "/getSelectBoxCode/R006", 
			url: "/getSelectBoxCode/R025", // RSLTN_RSLT_CD 결의결과코드
			dataType: "json",
			success: function(data) {
				var html = "";
				//$('#TB05040S_rsltnRsltCd').html(html);
				
				var codeList = data;
				if (codeList.length > 0) {
					$.each(codeList, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB05040S_rsltnRsltCd').append(html);
			}
		});
	}

	function getDealList() {

		let dealNo = $('#TB05040S_ibDealNo').val();

		// 유효성검사
		if (!isEmpty(dealNo)) {
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
			// 20240625 추가(당해년도 협의체)
			let rsltnYr = getToday().substring(0, 4);
			var dtoParam = {
				"dealNo"  : dealNo , 
				"rsltnYr" : rsltnYr
			};

			$.ajax({
				type: "GET",
				url: "/TB05040S/getDealList",
				data: dtoParam,
				dataType: "json",
				success: function(data) {
					arrPqGridDealList.setData(data);
					arrPqGridDealList.option("rowDblClick", function (event, ui) {
						setCouncilInfo(ui.rowData);
					});				
				},
				error: function(){
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
		var ibDealNo = e.dealNo;					// ibDeal번호
		var riskInspctCcd = e.mtrDcd;				// 리스크심사구분코드
		var lstCCaseCcd = e.jdgmDcd;				// 부수안건구분코드번호
		var inspctPrgrsStCd = e.mtrPrgSttsDcd;		// 부수안건구분코드번호

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
		
		$('#TB05040S_selectedDealNo').val(ibDealNo);
		$('#fileIbDealNo').val(ibDealNo);
		$('#fileRiskInspctCcd').val(riskInspctCcd);
		$('#fileLstCCaseCcd').val(lstCCaseCcd);



		dealInfo(e);
		// fileInfo(dtoParam);
		// docInfo(dtoParam);
	}
	
	/* 20240621 결의년도 추가 */
	function dealInfo(e) {

		var dealNo = e.dealNo			// ibDeal번호
		var jdgmDcd = e.jdgmDcd;	    // 리스크심사구분코드
		var mtrDcd = e.mtrDcd;			// 부수안건구분코드번호
		let rsltnYr = getToday().substring(0, 4);

		var dtoParam = {
			"dealNo"  : dealNo
			,  "jdgmDcd" : jdgmDcd
			,  "mtrDcd"  : mtrDcd
			,  "rsltnYr"  : rsltnYr
		};

		$.ajax({
			type: "GET",
			url: "/TB05040S/getDealDetail",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var dealInfo = data;
				/**
				 * 결의협의체 조건
				 */
				if (!isEmpty(dealInfo.cnsbDcd)) {
					$('#TB05040S_riskInspctRsltnCcd').val(dealInfo.cnsbDcd).prop("selected", true);					// 결의협의체
				} else{
					$('#TB05040S_rsltnCnfrncCcd option:eq(0)').prop("selected", true);								// 결의협의체
				}
				/**
				 * 지주사전협의 조건
				 */
				if (!isEmpty(dealInfo.fstCnfrncF)) {
					$('#TB05040S_fstCnfrncF').val(dealInfo.fstCnfrncF).prop("selected", true);						// 지주사전협의	
				} else {
					$('#TB05040S_fstCnfrncF option:eq(1)').prop("selected", true);									// 지주사전협의
				}
				
				$('#TB05040S_rprStrtDt').val(formatDate(dealInfo.rprStrtDt));										// 협의시작일
				$('#TB05040S_ofclDocAcptDt').val(dealInfo.ofclDocAcptDt);											// 공문접수일
				$('#TB05040S_aplcExptDt').val(formatDate(dealInfo.aplcExptDt));										// 부의예정일
				
				$('#TB05040S_cnclRsnCntnt').val(dealInfo.cnclRsnCntnt);												// 취소사유
				
				$('#TB05040S_rsltnDt').val(formatDate(dealInfo.cnsbOpnDt));											// 결의일
				$('#TB05040S_inspctCnfrncCcd').val(dealInfo.cnsbDcd).prop('selected', true);			     		// 결의협의체
				$('#TB05040S_inspctCnfrncSqcSq').val(dealInfo.cnsbSq);												// 회차정보
				$('#TB05040S_rnkNo').val(dealInfo.sn);																// 순서정보
				
				$('#TB05040S_rsltnRsltCd').val(dealInfo.rsltnRsltCd).prop('selected', true);						// 결의결과
				$('#TB05040S_invstCrncyCd').val(dealInfo.ptfdCrryCdNm);											    // 투자통화코드
				if (!isEmpty(dealInfo.apvlAmt)) {
					$('#TB05040S_rcgAmt').val(addComma(dealInfo.apvlAmt));										   // 승인금액
				} else {
					$('#TB05040S_rcgAmt').val(dealInfo.apvlAmt);
				}
				$('#TB05040S_sdnCndtF').val(dealInfo.sdnCndtF);														// 승인조건(셀다운)
				$('#TB05040S_etcCndtF').val(dealInfo.etcCndtF);														// 승인조건(기타)
				
				$('#TB05040S_rsltCntnt').val(dealInfo.etcCndtCtns);													// 결과의견
			}
		});
	}

	// function fileInfo(dtoParam) {

	// 	$.ajax({
	// 		type: "GET",
	// 		url: "/getFiles",
	// 		data: dtoParam,
	// 		dataType: "json",
	// 		success: function(data) {
							
	// 			if (data.length > 0) {
	// 				callbackFile('select', data);
	// 			}else{
	// 				$('#AS04010_fileList').empty();
	// 			}
	// 		}
	// 	});
	// }

	// function docInfo(dtoParam) {
	// 	$.ajax({
	// 		type: "GET",
	// 		url: "/getDocInfo",
	// 		data: dtoParam,
	// 		dataType: "json",
	// 		success: function(data) {	
	// 			var html = '';	
	// 			$('#AS04010_docList').html(html);

	// 			var codeList = data;
	// 			if (codeList.length > 0) {
	// 				$.each(codeList, function(key, value) {
	// 					if(value.raFnlDocF == 'Y'){			// 최종문서만 표기
	// 						// TODO : raRmrk(urlLink) a 태그로 링크 달아야함
	// 						html += '<tr>';
	// 						html += '<td>' + value.itemSq + '</td>';
	// 						html += '<td>' + value.raDocNo + '</td>';
	// 						html += '</tr>';
	// 					}
	// 				});
	// 			} else {
	// 				html += '<tr>';
	// 				html += '<td colspan="2" style="text-align: center">데이터가 없습니다.</td>';
	// 				html += '</tr>';
	// 			}
	// 			$('#AS04010_docList').html(html);
	// 		}
	// 	});
	// }

	// 협의체부의 저장
	function saveDealInfo() {

		var ibDealNo = $('#TB05040S_selectedDealNo').val();
		var riskInspctCcd = $('#fileRiskInspctCcd').val();
		var lstCCaseCcd = $('#fileLstCCaseCcd').val();
		
		var inspctPrgrsStCd = '300';										// 심사진행상태코드

		var riskInspctRsltnCcd = $('#TB05040S_riskInspctRsltnCcd').val();	// 전결협의체
		var fstCnfrncF = $('#TB05040S_fstCnfrncF').val();					// 지주사전협의

		var rprStrtDt = $('#TB05040S_rprStrtDt').val();						// 협의시작일
		var ofclDocAcptDt = $('#TB05040S_ofclDocAcptDt').val();				// 공문접수일일
		var aplcExptDt = $('#TB05040S_aplcExptDt').val();					// 부의예정일

		var cnclRsnCntnt = $('#TB05040S_cnclRsnCntnt').val();				// 취소사유

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
				url: "/TB05040S/saveDealInfo",
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
		var ibDealNo =  $('#TB05040S_selectedDealNo').val();
		var riskInspctCcd =  $('#TB05040S_riskInspctCcd').val();
		var lstCCaseCcd =  $('#TB05040S_lstCCaseCcd').val();
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
				url: "/TB05040S/updateDealInfo",
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
	/* ***********************************그리드 컬럼******************************** */

	// 협의체결과현황
	let colDealListInfo = [
		{
		title: "Deal번호",
		dataType: "string",
		dataIndx: "dealNo",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		},
		{
		title: "안건명",
		dataType: "string",
		dataIndx: "mtrNm",
		halign : "center",
		align: "left",
		filter: { crules: [{ condition: "range" }] },
		},
		{
		title: "신규/재부의정보",
		dataType: "string",
		dataIndx: "jdgmDcdNm",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		},
		{
		title: "jdgmDcd",
		dataType: "string",
		dataIndx: "jdgmDcd",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		hidden : true,
		},
		{
		title: "안건순번",
		dataType: "string",
		dataIndx: "mtrDcdNm",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		},
		{
		title: "안건순번코드",
		dataType: "string",
		dataIndx: "mtrDcd",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		hidden : true
		},
		{
		title: "통화",
		dataType: "string",
		dataIndx: "ptfdCrryCdNm",
		halign : "center",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "참여금액",
			dataType: "int",
			dataIndx: "ptfdAmt",
			halign : "center",
			align: "right",
			filter: { crules: [{ condition: "range" }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData !== null && cellData !== undefined) {
					return addComma(cellData);
				}
				return cellData; 
			}
		},
		{
			title: "심사진행상태",
			dataType: "string",
			dataIndx: "mtrPrgSttsDcdNm",
			halign : "center",
			align: "center",
			filter: { crules: [{ condition: "range" }] },
		},
		{
			title: "심사진행상태코드",
			dataType: "string",
			dataIndx: "mtrPrgSttsDcd",
			halign : "center",
			align: "center",
			filter: { crules: [{ condition: "range" }] },
			hidden : true
		},
		{
		title: "수신문서번호",
		dataType: "string",
		dataIndx: "rqsDocNo",
		halign : "center",
		align: "center",
		filter: { crules: [{ condition: "range" }] },
		hidden : true
		},
	];

  return {
	getDealList : getDealList,
	getUrlDealInfo: getUrlDealInfo,
  }
})();