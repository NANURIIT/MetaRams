const TB03030Sjs = (function(){
	let arrPqGridRmEntpInfo;
	let arrPqGridRmInfo;
	let arrPqGridRmFileInfo;

	$(document).ready(function() {
		$("#TB03030S_entpRnm").focus();
		rendorGrid();		// 그리드 렌더링
		TB03030S_setFileButtonEnabled(false);
	});

	function TB03030S_setFileButtonEnabled(isEnabled) {
		// enabled가 true이면 버튼 활성화, false이면 비활성화
		$("#UPLOAD_AddFile").prop("disabled", !isEnabled);  
		$("#UPLOAD_DelFiles").prop("disabled", !isEnabled);
	}
	
	// 그리드 렌더링함수
	function rendorGrid () {
		/** RM대상그리드 **/
		let arrPqGridObj = [
			{
				height    : 180
				, maxHeight : 180
				, id        : 'gridRmEntpInfo'
				, colModel  : colRmEntpInfo
			},
			{
				height    : 170
				, maxHeight : 170
				, id        : 'gridRmInfo'
				, colModel  : colRmInfo
			},
		]

		setPqGrid(arrPqGridObj);
	
		arrPqGridRmEntpInfo = $("#gridRmEntpInfo").pqGrid('instance');
		arrPqGridRmInfo = $("#gridRmInfo").pqGrid('instance');
	}
	
	// 화면 초기화
	const rmReset = (() => {
		let fmIputLngth = document.querySelectorAll("input").length;
		for (let i = 0; i < fmIputLngth; i++) {
			document.querySelectorAll("input")[i].value = "";
		}
		TB03030S_clearAllGrid();
		TB03030S_setFileButtonEnabled(false);
	});

	function TB03030S_clearAllGrid(){

		$("#gridRmEntpInfo").pqGrid("option", "dataModel.data", []);
		$("#gridRmEntpInfo").pqGrid("refreshDataAndView");
		$("#gridRmInfo").pqGrid("option", "dataModel.data", []);
		$("#gridRmInfo").pqGrid("refreshDataAndView");

		$('#UPLOAD_FileList').empty();                    //관련자료
	}
	
	// RM대상 조회
	function getEntpInfo() {
		TB03030S_setFileButtonEnabled(false);
		let entpCd = $('#TB03030S_entpCd').val();
		let entpHnglNm = $('#TB03030S_entpRnm').val();
		businessFunction();
		TB03030S_clearAllGrid();	
	
		function businessFunction() {
	
			var dtoParam = {
				 "entpCd" : entpCd,
				 "entpHnglNm" : entpHnglNm
			};
	
			$.ajax({
				type: "GET",
				url: "/TB03030S/getEntpInfoByNm",
				data: dtoParam,
				dataType: "json",
				success: function(data) {

					// 조회된 내역 리스트 수 체크
					if (data.length > 0) {
						arrPqGridRmEntpInfo.setData(data);
						arrPqGridRmEntpInfo.option("rowClick", function(event, ui) {
							pqGridSelectHandler( ui.rowIndx ,"gridRmEntpInfo" );
							TB03030S_setFileButtonEnabled(false);
							$('#UPLOAD_FileList').empty();                    //관련자료
							setRmInfo(ui.rowData); // RM활동이력 조회
						});
					}
					else {
						arrPqGridRmEntpInfo.setData([]);
						Swal.fire({
							icon: "warning"
							, title: "Warning!"
							, text: "조회된 정보가 없습니다!"
						})
					}

				}
			});
	
			$('#TB03030S_entpHistoryInfo').html('');
		}
	}
	
	function resetGrid() {
		arrPqGridRmEntpInfo.setData([]);
		arrPqGridRmInfo.setData([]);
	}
	
	function allInit() {
		resetGrid();
	}
	
	// RM활동이력 조회
	function setRmInfo(rowData) {
		businessFunction();
		$("#TB03030S_corpRgstNo").val(rowData.corpRgstNo);
		$("#TB03030S_bsrnRgstNo").val(rowData.bsnsRgstNo);
		$("#TB03030S_entpCd").val(rowData.entpCd);
		$("#TB03030S_entpNm").val(rowData.entpHnglNm);

		function businessFunction() {
	
			var dtoParam = {
				"entpCd": rowData.entpCd
			};
	
			$.ajax({
				type: "GET",
				url: "/TB03030S/getHistoryInfo",
				data: dtoParam,
				dataType: "json",
				success: function(data) {

					// 조회된 내역 리스트 수 체크
					if (data.length > 0) {
						arrPqGridRmInfo.setData(data);
						arrPqGridRmInfo.option("rowClick", function(event, ui) {
							pqGridSelectHandler( ui.rowIndx, "gridRmInfo" );
							setFileInfo(ui.rowData);

							TB03030S_setFileButtonEnabled(true);
							/******  딜공통 파일첨부 추가 ******/ 
							let key2 = `${ui.rowData.entpCd}|${ui.rowData.rmSq}`;
							getFileInfo($('#key1').val(),key2);
							/******  딜공통 파일첨부 추가 ******/ 
						});
					}
					else {
						arrPqGridRmInfo.setData([]);
						Swal.fire({
							icon: "warning"
							, title: "Warning!"
							, text: "조회된 정보가 없습니다!"
						})
					}
				}
			});
			
			
		}
	}
	
	// 모달팝업 show
	function setFileInfo(rowData) {	
		
		$('#modal-TB03031P').modal('show');
		
		let entpCd = rowData.entpCd;
		let rmSq   = rowData.rmSq;
		
		rmHistory();
		
		function rmHistory() {
	
			let dtoParam = {
				"entpCd" : entpCd
				, "rmSq" : rmSq
			};
	
			$.ajax({
				type: "GET",
				url: "/TB03030S/rmHistoryInfo",
				data: dtoParam,
				dataType: "json",
				success: function(data) {
					$.each(data, function(key, value) {
						$('#TB03031P_rm_entpRnm').val(value.entpHnglNm);					// 업체명
						$('#TB03031P_rm_corpRgstNo').val(checkBrnAcno(value.crno ));	    // 법인등록번호	
						$("#TB03031P_rm_bsnsRgstNo").val(checkBrnAcno(value.bsnsRgstNo));	// 사업자등록번호
						$('#TB03031P_metTitl').val(value.metTitl);							// 미팅제목
						$('#TB03031P_metDt').val(formatDate(value.metDt));					// 미팅일자
						$('#TB03031P_metTm').val(value.metTm);								// 미팅시간
						$('#TB03031P_metPrps').val(value.metPrps);							// 미팅목적
						$('#TB03031P_metCntnt').val(value.metCntnt);						// 미팅내용
						$('#TB03031P_cstmNm').val(value.cstmNm);							// 고객명
						$('#TB03031P_cstmPhNo').val(formatPhoneNo(value.cstmPhNo));			// 고객연락처
						$("#TB03031P_rm_entpCd").val(value.entpCd);							// 업체코드
						$("#TB03031P_rmSq").val(value.rmSq);								// 일련번호
					})
				}
			}).then(() =>{ 
				callTB03031PRmHistoryInfo('TB03030S');
			});
		}
	
	}
	
	/**
	 * Enter key event
	 */
	$("input[id=TB03030S_entpRnm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntpInfo();
		}
	});
	
	/* 페이지 이동시 */
	
	/* ***********************************그리드 컬럼******************************** */
	
	let colRmEntpInfo = [
		{ 	
			title    : "entpCd", 
			dataType : "string", 
			dataIndx : "entpCd", 
			align    : "left",
			hidden: true,
			filter   : { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title    : "업체명", 
			dataType : "string",
			dataIndx : "entpHnglNm", 
			halign   : "center",  
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "법인등록번호", 
			dataType : "string", 
			dataIndx : "corpRgstNo",
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData.length !== 0) {
					let corpRgstNo1 = cellData.substring(0, 6);
					let corpRgstNo2 = cellData.substring(6, 13);
					return `${corpRgstNo1}-${corpRgstNo2}`.trim();
				}
				return cellData;
			} 
		},
		{ 	
			title    : "사업자등록번호", 
			dataType : "string",
			dataIndx : "bsnsRgstNo",
			align    : "center",
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData.length >= 10) {
					let bsnsRgstNo1 = cellData.substring(0, 3);
					let bsnsRgstNo2 = cellData.substring(3, 6);
					let bsnsRgstNo3 = cellData.substring(6, 10);
					return `${bsnsRgstNo1}-${bsnsRgstNo2}-${bsnsRgstNo3}`.trim();
				} else {
					return cellData;
				}
			}
		},
		{ 	
			title    : "RM활동건수", 
			dataType : "integer", 
			dataIndx : "rmCount", 
			halign	 : "center",
			align    : "right", 
			filter   : { crules: [{ condition: 'range' }] },
		}
	];
	
	let colRmInfo = [
		{ 	
			title    : "미팅일자", 
			dataType : "date", 
			dataIndx : "metDt", 
			align    : "center",
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData.length === 8) {
					let year = cellData.substring(0, 4);
					let month = cellData.substring(4, 6);
					let day = cellData.substring(6, 8);
					return `${year}-${month}-${day}`.trim();
				}
				return cellData; 
			} 
		},
		{ 	
			title    : "미팅시간", 
			dataType : "string",
			dataIndx : "metTm", 
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "미팅제목", 
			dataType : "string", 
			dataIndx : "metTitl",
			halign   : "center",  
			align    : "left", 
			filter   : { crules: [{ condition: 'range' }] }
		},
		{ 	
			title    : "고객명", 
			dataType : "string",
			dataIndx : "cstmNm",
			align    : "center",  
			filter   : { crules: [{ condition: 'range' }] }
		},
		{ 	
			title    : "고객연락처", 
			dataType : "string", 
			dataIndx : "cstmPhNo", 
			align    : "center", 
			filter   : { crules: [{ condition: 'range' }] },
			render   : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData.length === 11) {
					let ph1 = cellData.substring(0, 3);
					let ph2 = cellData.substring(3, 7);
					let ph3 = cellData.substring(7, 11);
	
					return `${ph1}-${ph2}-${ph3}`.trim();
				}
			}
		},
		{ 	
			title    : "RM_SQ", 
			dataType : "string", 
			dataIndx : "rmSq", 
			align    : "center", 
			hidden   : true , 
			filter   : { crules: [{ condition: 'range' }] },
		},
		{ 	
			title    : "미팅내용", 
			dataType : "string",
			dataIndx : "metCntnt",
			halign   : "center",  
			align    : "left",  
			filter   : { crules: [{ condition: 'range' }] }
		},
		{ 	
			title    : "첨부파일여부", 
			dataType : "string",
			dataIndx : "fileCnt",
			align    : "center",  
			filter   : { crules: [{ condition: 'range' }] }
		}
	];
	
	return {
		getEntpInfo : getEntpInfo
		, rmReset : rmReset
	}
})();
