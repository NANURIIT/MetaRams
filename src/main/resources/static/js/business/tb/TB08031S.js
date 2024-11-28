const TB08031Sjs = (function(){
	
	let bsnsPartInfoInstance;			//사업참가자정보 instance

	/* 사업참가자정보 colM */
	let colM_bsnsPartInfo = [	
		
		//체크박스
		{ 
			dataIndx: "isChked", 
			maxWidth: 60, 
			minWidth: 60, 
			align: "center", 
			resizable: false,
			title: "선택",
			type: 'checkBoxSelection', 
			sortable: false, 
			editor: false,
			dataType: 'bool',
			editable: 'true',
			cb: {
				all: false, 
				header: false
			}
		},
		{ 	
			title: "NO", 
			dataType: "string", 
			dataIndx: "no", 
			align: "center", 
			halign: "center", 
			width: "",
			maxWidth: 60,
			minWidth: 60, 
			filter: { crules: [{ condition: 'range' }] },
			render: function (ui) {
				return ui.rowIndx + 1;
			}
		},
		{ 	
			title: "참가자관계", 
			dataType: "string", 
			dataIndx: "", 
			align: "left", 
			halign: "center", 
			width: "", 
			filter: { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title: "업체명", 
			dataType: "string", 
			dataIndx: "", 
			align: "left", 
			halign: "center", 
			width: "", 
			filter: { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title: "대표자명", 
			dataType: "string", 
			dataIndx: "", 
			align: "center", 
			halign: "center", 
			width: "", 
			filter: { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title: "법인등록번호", 
			dataType: "string", 
			dataIndx: "", 
			align: "center", 
			halign: "center", 
			width: "", 
			filter: { crules: [{ condition: 'range' }] } 
		},
		{ 	
			title: "사업자등록번호", 
			dataType: "string", 
			dataIndx: "", 
			align: "center", 
			halign: "center", 
			width: "", 
			filter: { crules: [{ condition: 'range' }] } 
		}

	]

	/* 사업 일정정보 colM */
	let colM_bsnsForecast = [

	]

	/* 채권보전 기본정보 colM */
	let colM_bondProtInfo = [

	]

	/* 조건변경내역 colM */
	let colM_cchInfo = [

	]

	/* 대주단정보 colM */
	let colM_stlnInfo = [

	]

	/* 대출계좌 colM */
	let colM_loanBanoInfo = [

	]

	/* 수익증권 colM */
	let colM_ernSctyInfo = [

	]

	/* 편집자산 정보 colM  todo: id없음....*/


	$(document).ready(function() {
		loadInvbnkAmnBzCd();					// 사업구분 정보
		loadSelectBoxContents();

		setGrid_TB08031S();

	});

	function loadSelectBoxContents() {
		var item = '';
		item += 'I011';							// 진행상태
		item += '/' + 'I027';					// 통화코드
		item += '/' + 'C012';					// 신용등급
		item += '/' + 'I021';					// 사업구분상세
		item += '/' + 'T002';					// 당사주선구분
		item += '/' + 'I033';					// 금리구분코드
		item += '/' + 'B006';					// 기준금리
		item += '/' + 'D010';					// 업무팀
		item += '/' + 'C014';					// 시행주체구분
		item += '/' + 'B011';					// 사업지역
		item += '/' + 'B019';					// 기업규모구분
		item += '/' + 'C010';					// 신용보강
		item += '/' + 'P001';					// 참가자관계
		item += '/' + 'B007';					// 채권보전구분
		item += '/' + 'R021';					// 구분 (대주단, 수익자)
		item += '/' + 'B013';					// 사업방식
		item += '/' + 'B012';					// 사업수주구분
		item += '/' + 'U002';					// 상환방식
		item += '/' + 'U001';					// 인수사업구분
		item += '/' + 'I038';					// 투자유형
		item += '/' + 'T005';					// 대상자산구분
		item += '/' + 'L006';					// 리스종류
		item += '/' + 'F009';					// 펀드구분
		item += '/' + 'F010';					// 펀드유형상세
		
		getSelectBoxList('TB08031S', item);
	}

	function setBsnsPartInfoGrid(){

		setTimeout(() => bsnsPartInfoInstance.refresh(), 1)
	}

	//pqGrid setting...
	function setGrid_TB08031S(){

		/* 사업참가자정보 Grid Set... */
		var bsnsPartInfoObj = {
			height: 80,
			maxHeight: 400,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			editable: false,
			//toolbar: toolbar,
			scrollModel: { autoFit: true },
			colModel: colM_bsnsPartInfo,
			strNoRows: '데이터가 없습니다.',
			cellDblClick: function(event, ui) {			//더블클릭 이벤트
				var rowData = ui.rowData;
				alert(JSON.stringify(row));
			}
		}

		$("#TB08031S_bsnsPartInfo").pqGrid(bsnsPartInfoObj);
		bsnsPartInfoInstance = $("#TB08031S_bsnsPartInfo").pqGrid('instance');

	}

	// 사업구분 정보
	function loadInvbnkAmnBzCd() {
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/I020",
			dataType: "json",
			success: function(data) {
				var html = "";
				
				$('#TB08031S_invbnkAmnBzCd').html(html);

				var codeList = data;
				if (codeList.length > 0) {
					
					$.each(codeList, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + ' (' + value.CD_VL_ID + ')' + '</option>';
					});
				}
				$('#TB08031S_invbnkAmnBzCd').html(html);
			}
		}).then (()=>{
			tabCtrl('invbnkAmnBzCd');
		})   
	}

	$('#TB08031S_invbnkAmnBzCd').change(function() {
		tabCtrl('invbnkAmnBzCd');
	});

	// 사업정보 딜조회
	function srchBsnsInfo() {
		var dealNo = $('#TB08031S_ibDealNo').val();
		
		// 유효성검사
		if (isEmpty(dealNo)) {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "Deal번호를 입력해주세요."
					, confirmButtonText: "확인"
				});
				return false;
		} else {
			businessFunction();
		}
		
		function businessFunction() {
			
			var dtoParam = {
				"dealNo": dealNo
			};
			
			$.ajax({
				type: "GET",
				url: "/TB08031S/getBusiBssInfo",
				data: dtoParam,
				dataType: "json",
				success: function(data) {

					console.log(JSON.stringify(data));

					var rlesList = data.rlesInfo;
					var infraList = data.infraInfo;
					var maList = data.maInfo;
					var invstList = data.invstInfo;
					var pefList = data.pefInfo;
					var bsnsPartInfo = data.bsnsPartInfo;
					var bsnsForecast = data.bsnsForecast;
					var bondProtInfo = data.bondProtInfo;
					var cchInfo = data.cchInfo;
					var stlnInfo = data.stlnInfo;
					var ernInfo = data.ernInfo;
					var busiInfo = data.busiInfo;
					var admsAsstInfo = data.admsAsstInfo;
					var invstEprzInfo = data.invstEprzInfo
					var html = '';

					/* 기본항목*/
					$('#TB08031S_ibDealNo').val(data.dealNo);												// 딜번호
					$('#TB08031S_corpNo').val(data.corpRgstNo);												// 법인등록번호
					$('#TB08031S_corpNm').val(data.mgcoNm);													// 업체명
					$('#TB08031S_bsnsNm').val(data.busiNm);													// 사업명
					//$('#TB08031S_crdtAsmtModel').val();													// 신용평가모형
					//$('#TB08031S_C012').val();															// 신용등급
					//$('#TB08031S_bsnsLoan').val();														// 사업대출잔액
					//$('#TB08031S_coValDt').val();															// 평가유효기일
					//$('#TB08031S_fnMdfyDt').val();														// 최종수정일자
										
					/* 사업기본정보*/					
					$('#TB08031S_invbnkAmnBzCd').val(data.invFnnMngmBusiDcd);								// 사업구분
					$('#TB08031S_I021').val(data.invFnnMngnBusiDtlDcd);										// 사업구분상세
					$('#TB08031S_I011').val(data.invFnnMmngPrgSttsCd);										// 진행상태
					$('#TB08031S_I027').val(data.crncyCd);													// 총조달금액코드
					$('#TB08031S_prcrAmt').val(data.totPrcrAmt);											// 총조달금액
					$('#TB08031S_bondProt').val(data.mainBondMtncCnts);										// 주요채권보전
					$('#TB08031S_rvwStRsn').val(data.ivtgShdnRsnCnts);										// 검토중단사유
					$('#TB08031S_T002').val(data.thcoMdtnYn);												// 당사주선구분
					$('#TB08031S_thcoRlAmt').val(data.thcoMdtnAmt);											// 당사주선금액	
					$('#TB08031S_thcoPtnAmt').val(data.thcoPtcpAmt); 										// 당사참여금액
					//$('#TB08031S_I033').val();															// 금리구분코드
					$('#TB08031S_InvstRvnRtCcdInput').val(data.aplyIntrtCnts);								// 금리구분
					//$('#TB08031S_B006').val();															// 기준금리코드
					//$('#TB08031S_BitrKindCdInput').val();													// 기준금리
					//$('#TB08031S_preRt').val();															// 가산금리
					$('#TB08031S_charge_empNm').val(data.empNm);											// 담당자
					//$('#TB08031S_D010').val();															// 업무팀
					$('#TB08031S_tgtRvn').val(data.goalErnRt);												// 목표수익률
					$('#bsnsCntnt').val(data.busiCnts);														// 사업내용
					$('#TB08031S_chargeRm').val(data.rmEmpno);												// 담당RM
					
					
					if(data.invFnnMngmBusiDcd == '01') {
						
						/* 부동산 사업정보 */	
						$(":radio[name='TB08031S_rlesWarrMrtgYN']").radioSelect(rlesList.guasMrtgYn);		// 보증서담보여부
						$('#TB08031S_C014').val(rlesList.efceMbdyDcd);										// 시행주체구분							
						//$('#TB08031S_csstPrarYm').val();													// 착공(예정)년월
						//$('#TB08031S_cnfnPrarYm').val('2025-01');											// 준공(예정)년월
						$('#TB08031S_slltPrarYm').val(rlesList.slltStrtDt);									// 분양(예정)년월
						$('#TB08031S_busiArea').val(rlesList.bzplAddr);										// 사업장위치
						$('#TB08031S_busiSiteSqms').val(rlesList.busiSiteSqms);								// 사업부지면적(m²)
						//$('#TB08031S_busiSiteAcre').val('200');											// 사업부지(평)
						//$('#TB08031S_arRt').val('85');													// 용적률
						$('#TB08031S_Sqms').val(rlesList.ttlSqms);											// 연면적
						$('#TB08031S_SqmsP').val('250');													// 연면적(평)
						$('#TB08031S_far').val(rlesList.busiBldngLndrt);									// 사업건폐율
						$('#TB08031S_B019').val(rlesList.eprzSclDcd);										// 기업규모구분
						$('#TB08031S_fcltScal').val(rlesList.fcltSclWidhCtns);								// 시설규모너비내용
						$('#TB08031S_resiEco').val(rlesList.resiEcoCtns);									// 주거환경내용
						$('#TB08031S_C010').val(rlesList.crdtRifcDvcDcd);									// 신용보강장치구분코드
						//$('#TB08031S_crdtEhcmntAmt').val('256,850,000');									// 신용보강금액
						$('#TB08031S_crdtEhcmntCntnt').val(rlesList.crdtRifcDvcNm);		 					// 신용보강장치명
						//$('#rles_datepicker1').val('2023-12-15');												// 상업운전일
						//$('#TB08031S_rlesCondComply').val('');											// 관리조건이행
						
						$(":radio[name='rlesCondComplyYN']").radioSelect(rlesList.mngmCndFlflYn);			// 관리조건이행여부
						$(":radio[name='rlesBondTrnYN']").radioSelect(rlesList.bondTrnsYn);					// 채권이관여부
						$(":radio[name='rlesCmmntMatYN']").radioSelect(rlesList.fnnrCtrcMttrTrgtYn);		// 재무약정사항대상여부
						//$('#TB08031S_rlesEmpPhNo').val('010-8577-1212');									// 업체담당연락처

						// 사업참가자정보 조회
						if (bsnsPartInfo.length > 0) {
							$.each(bsnsPartInfo, function(key, value) {
								html += '<tr ondblclick="setBsnsPartInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.ptcnRelrDcd + '</td>';            	  // 참가자관계코드
								html += '    <td>' + value.ptcnRelrDcdNm + '</td>';                            		  // 참가자관계명
								html += '    <td>' + value.entpNm + '</td>';                                    	  // 업체명
								html += '    <td class="text-center">' + value.rpsrNm + '</td>';                      // 대표자명
								html += '    <td class="text-center">' + checkBrnAcno(value.crno) + '</td>';          // 법인등록번호
								html += '    <td class="text-center">' + checkBrnAcno(value.bzno) + '</td>';          // 사업자등록번호
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsPartInfo').html(html);


						// 사업주요전망 조회
						html = '';
						if (bsnsForecast.length > 0) {
							$.each(bsnsForecast, function(key, value) {
								html += '<tr ondblclick="setBsnsForecast(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td class="text-center">' + formatDate(value.prarDt) + '</td>';          // 예정일자
								html += '    <td class="text-center">' + formatDate(value.flflDt) + '</td>';          // 이행일자
								html += '    <td class="text-center">' + value.flflYn + '</td>';                      // 이행여부
								html += '    <td>' + value.mainScxCtns + '</td>';                 					  // 주요일정내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsForecast').html(html);


						// 채권보전주요약정 조회
						html = '';
						if (bondProtInfo.length > 0) {
							$.each(bondProtInfo, function(key, value) {
								html += '<tr ondblclick="setBondProtInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.bondProtCcd + '</td>';               // 채권보전구분
								html += '    <td>' + value.bondProtNm + '</td>';               						  // 채권보전구분명
								html += '    <td class="text-center">' + value.fnnrCtrcMttrTrgtYn + '</td>';          // 이행여부
								html += '    <td>' + value.mainCtrcMttrCnts + '</td>';            					  // 상세내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bondProtInfo').html(html);


						// 조건변경이력 조회
						html = '';
						if (cchInfo.length > 0) {
							$.each(cchInfo, function(key, value) {
								html += '<tr ondblclick="setCchInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          					  // NO
								html += '    <td class="text-center">' + formatDate(value.apvlDt) + '</td>';               	  			  // 승인일자
								html += '    <td class="text-center">' + value.cndChngDcmNoCnts + '</td>';               				  // 승인문서번호
								html += '    <td>' + value.cndChngMainCnts + '</td>';          	  										  // 주요내용
								html += '    <td style="display:none;">' + value.prcsrEmpno + '</td>';            					  	  // 취급자
								html += '    <td class="text-center">' + value.prcsrEmpnm + '</td>';            					  	  // 취급자명
								html += '    <td class="text-center">' + formatPhoneNo(value.prcsrTelNo) + '</td>';            			  // 취급자개인번호
								html += '    <td class="text-center">' + formatDate(value.crotDt) + '</td>';            				  // 시행일자
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_cchInfo').html(html);


						// 대주단정보 조회
						html = '';
						if (stlnInfo.length > 0) {
							$.each(stlnInfo, function(key, value) {
								html += '<tr ondblclick="setStlnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          				  // NO
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_stlnInfo').html(html);

						// 수익자정보 조회
						html = '';
						if (ernInfo.length > 0) {
							$.each(ernInfo, function(key, value) {
								html += '<tr ondblclick="setErnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_ernInfo').html(html);
						
					} else if(data.invFnnMngmBusiDcd == '02') {
						
						/* 인프라 사업정보 */
						$('#TB08031S_B013').val(infraList.invFnnBusiWyDcd);									// 인프라 사업방식
						$('#TB08031S_bsnsScal').val(infraList.busiSclCntn);									// 사업규모
						$('#TB08031S_bsnsLicYm').val(infraList.busiLcsiDt);									// 사업인허가년월
						$('#TB08031S_cmplYm').val(infraList.cnfnDt);										// 준공예정년월
						//$('#TB08031S_leadAgency').val('금융위원회');											// 주무관청
						$('#TB08031S_conStYm').val(infraList.cnrStrtDt);									// 건설시작년월
						$('#TB08031S_conEndYm').val(infraList.cnrEndDt);									// 건설종료년월
						$('#TB08031S_opDurStYm').val(infraList.oprtStrtDt);									// 운영시작일자
						$('#TB08031S_opDurEndYm').val(infraList.oprtEndDt);									// 운영종료일자
						//$('#TB08031S_invstBsnsLoc').val('서울');											// 사업지역
						$('#TB08031S_bsnsLoc').val(infraList.bzplAddr);										// 사업장위치
						$(":radio[name='infraSeLmtYN']").radioSelect(infraList.lmtYn);						// 한도여부
						$('#TB08031S_invstAmt').val(infraList.invstAmt);									// 총투자비
						$('#TB08031S_B012').val(infraList.busiRvoDcd);										// 사업수주구분
						$('#TB08031S_equity').val(infraList.slfCpta);										// 자기자본금
						//$('#infra_datepicker1').val('');													// 상업운전일
						//$('#TB08031S_infraEmpPhNo').val('');												// 업체담당연락처
						$('#TB08031S_priLoan').val(infraList.prorLoanAmt);									// 선순위대출	
						$('#TB08031S_subLoan').val(infraList.bkbnLoanAmt);									// 후순위대출
						$(":radio[name='infraUseApvlYN']").radioSelect(infraList.apvlYn);					// 승인여부
						$('#TB08031S_subLoan').val(infraList.brwrSpcYn);									// 차주SPC여부																	
						$(":radio[name='infraSpcYN']").radioSelect(infraList.brwrSpcYn);					// 차주SPC여부
						//$('#TB08031S_tab3_empNm').val(infraList.brwrSpcYn);								// 담당자
						//$('#TB08031S_tab3_empNm').val(infraList.brwrSpcYn);								// 관리사무소
						$(":radio[name='condComplyYN']").radioSelect(infraList.mngmCndFlflYn);				// 관리조건이행여부
						$(":radio[name='infraBondTraYN']").radioSelect(infraList.bondTrnsYn);				// 채권이관여부
						$(":radio[name='infraCmmntMatYN']").radioSelect(infraList.fnnrCtrcMttrTrgtYn);		// 주요재무약정사항

						// 사업참가자정보 조회
						if (bsnsPartInfo.length > 0) {
							$.each(bsnsPartInfo, function(key, value) {
								html += '<tr ondblclick="setBsnsPartInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.ptcnRelrDcd + '</td>';            	  // 참가자관계코드
								html += '    <td>' + value.ptcnRelrDcdNm + '</td>';                            		  // 참가자관계명
								html += '    <td>' + value.entpNm + '</td>';                                    	  // 업체명
								html += '    <td class="text-center">' + value.rpsrNm + '</td>';                      // 대표자명
								html += '    <td class="text-center">' + checkBrnAcno(value.crno) + '</td>';          // 법인등록번호
								html += '    <td class="text-center">' + checkBrnAcno(value.bzno) + '</td>';          // 사업자등록번호
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsPartInfo').html(html);


						// 사업주요전망 조회
						html = '';
						if (bsnsForecast.length > 0) {
							$.each(bsnsForecast, function(key, value) {
								html += '<tr ondblclick="setBsnsForecast(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td class="text-center">' + formatDate(value.prarDt) + '</td>';          // 예정일자
								html += '    <td class="text-center">' + formatDate(value.flflDt) + '</td>';          // 이행일자
								html += '    <td class="text-center">' + value.flflYn + '</td>';                      // 이행여부
								html += '    <td>' + value.mainScxCtns + '</td>';                 					  // 주요일정내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsForecast').html(html);


						// 채권보전주요약정 조회
						html = '';
						if (bondProtInfo.length > 0) {
							$.each(bondProtInfo, function(key, value) {
								html += '<tr ondblclick="setBondProtInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.bondProtCcd + '</td>';               // 채권보전구분
								html += '    <td>' + value.bondProtNm + '</td>';               						  // 채권보전구분명
								html += '    <td class="text-center">' + value.fnnrCtrcMttrTrgtYn + '</td>';          // 이행여부
								html += '    <td>' + value.mainCtrcMttrCnts + '</td>';            					  // 상세내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bondProtInfo').html(html);


						// 조건변경이력 조회
						html = '';
						if (cchInfo.length > 0) {
							$.each(cchInfo, function(key, value) {
								html += '<tr ondblclick="setCchInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          					  // NO
								html += '    <td class="text-center">' + formatDate(value.apvlDt) + '</td>';               	  			  // 승인일자
								html += '    <td class="text-center">' + value.cndChngDcmNoCnts + '</td>';               				  // 승인문서번호
								html += '    <td>' + value.cndChngMainCnts + '</td>';          	  										  // 주요내용
								html += '    <td style="display:none;">' + value.prcsrEmpno + '</td>';            					  	  // 취급자
								html += '    <td class="text-center">' + value.prcsrEmpnm + '</td>';            					  	  // 취급자명
								html += '    <td class="text-center">' + formatPhoneNo(value.prcsrTelNo) + '</td>';            			  // 취급자개인번호
								html += '    <td class="text-center">' + formatDate(value.crotDt) + '</td>';            				  // 시행일자
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_cchInfo').html(html);


						// 대주단정보 조회
						html = '';
						if (stlnInfo.length > 0) {
							$.each(stlnInfo, function(key, value) {
								html += '<tr ondblclick="setStlnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          				  // NO
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_stlnInfo').html(html);

						// 수익자정보 조회
						html = '';
						if (ernInfo.length > 0) {
							$.each(ernInfo, function(key, value) {
								html += '<tr ondblclick="setErnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_ernInfo').html(html);
						
					} else if(data.invFnnMngmBusiDcd == '03') {
						
						/* M/A 사업정보 */
						$('#TB08031S_U002').val(maList.undwHglmWyDcd);										// 상환방식
						$('#TB08031S_U001').val(maList.hnvrBusiDcd);										// 인수사업구분
						$(":radio[name='maEstateSpcYN']").radioSelect(maList.brwrSpcYn);					// 차주 SPC 여부
						$('#TB08031S_spon').val(maList.spnsrCtns);											// 스폰서
						$('#TB08031S_mrtg').val(maList.undwMrtgCtns);										// 담보

						// 사업참가자정보 조회
						if (bsnsPartInfo.length > 0) {
							$.each(bsnsPartInfo, function(key, value) {
								html += '<tr ondblclick="setBsnsPartInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.ptcnRelrDcd + '</td>';            	  // 참가자관계코드
								html += '    <td>' + value.ptcnRelrDcdNm + '</td>';                            		  // 참가자관계명
								html += '    <td>' + value.entpNm + '</td>';                                    	  // 업체명
								html += '    <td class="text-center">' + value.rpsrNm + '</td>';                      // 대표자명
								html += '    <td class="text-center">' + checkBrnAcno(value.crno) + '</td>';          // 법인등록번호
								html += '    <td class="text-center">' + checkBrnAcno(value.bzno) + '</td>';          // 사업자등록번호
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsPartInfo').html(html);


						// 사업주요전망 조회
						html = '';
						if (bsnsForecast.length > 0) {
							$.each(bsnsForecast, function(key, value) {
								html += '<tr ondblclick="setBsnsForecast(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td class="text-center">' + formatDate(value.prarDt) + '</td>';          // 예정일자
								html += '    <td class="text-center">' + formatDate(value.flflDt) + '</td>';          // 이행일자
								html += '    <td class="text-center">' + value.flflYn + '</td>';                      // 이행여부
								html += '    <td>' + value.mainScxCtns + '</td>';                 					  // 주요일정내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsForecast').html(html);


						// 채권보전주요약정 조회
						html = '';
						if (bondProtInfo.length > 0) {
							$.each(bondProtInfo, function(key, value) {
								html += '<tr ondblclick="setBondProtInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.bondProtCcd + '</td>';               // 채권보전구분
								html += '    <td>' + value.bondProtNm + '</td>';               						  // 채권보전구분명
								html += '    <td class="text-center">' + value.fnnrCtrcMttrTrgtYn + '</td>';          // 이행여부
								html += '    <td>' + value.mainCtrcMttrCnts + '</td>';            					  // 상세내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bondProtInfo').html(html);


						// 조건변경이력 조회
						html = '';
						if (cchInfo.length > 0) {
							$.each(cchInfo, function(key, value) {
								html += '<tr ondblclick="setCchInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          					  // NO
								html += '    <td class="text-center">' + formatDate(value.apvlDt) + '</td>';               	  			  // 승인일자
								html += '    <td class="text-center">' + value.cndChngDcmNoCnts + '</td>';               				  // 승인문서번호
								html += '    <td>' + value.cndChngMainCnts + '</td>';          	  										  // 주요내용
								html += '    <td style="display:none;">' + value.prcsrEmpno + '</td>';            					  	  // 취급자
								html += '    <td class="text-center">' + value.prcsrEmpnm + '</td>';            					  	  // 취급자명
								html += '    <td class="text-center">' + formatPhoneNo(value.prcsrTelNo) + '</td>';            			  // 취급자개인번호
								html += '    <td class="text-center">' + formatDate(value.crotDt) + '</td>';            				  // 시행일자
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_cchInfo').html(html);


						// 대주단정보 조회
						html = '';
						if (stlnInfo.length > 0) {
							$.each(stlnInfo, function(key, value) {
								html += '<tr ondblclick="setStlnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          				  // NO
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_stlnInfo').html(html);

						// 수익자정보 조회
						html = '';
						if (ernInfo.length > 0) {
							$.each(ernInfo, function(key, value) {
								html += '<tr ondblclick="setErnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_ernInfo').html(html);

						// 관련사업정보 조회
						html = '';
						if (busiInfo.length > 0) {
							$.each(busiInfo, function(key, value) {
								html += '<tr ondblclick="">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-left">' + value.sn + '</td>';               	  			 						  // 구분명
								html += '    <td class="text-left">' + value.reltDealNo + '</td>';               				  							  // 기관명
								html += '    <td class="text-left">' + value.dealNm + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.allInvAmt)) + '</td>';
								html += '    <td class="text-center">' + 'Y' + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.thcoPtciAmt)) + '</td>';
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_busiInfo').html(html);

						// 편입자산정보 조회
						html = '';
						if (admsAsstInfo.length > 0) {
							$.each(admsAsstInfo, function(key, value) {
								html += '<tr ondblclick="setAdmsAsstInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display: none">' + value.ibInvTpCd + '</td>';
								html += '    <td class="text-left">' + value.ibInvTpNm + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.admsAsstAcbkAcqAmt)) + '</td>';
								html += '    <td class="text-right">' + handleNullData(value.admsAsstGrntErnRt) + '</td>';
								html += '    <td class="text-left">' + value.admsAsstItmNm + '</td>';
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_admsAsstInfo').html(html);
						
					} else if(data.invFnnMngmBusiDcd == '04') {
						if( !isEmpty(invstList) ) {
							
							/* 국제투자 사업정보 */
							$('#TB08031S_trgtAstsCcd').val(invstList.invFnnTrgtAsstDcd);						// 투자금융대상자산구분코드
							$('#TB08031S_brwrNtnNm').val(invstList.brwrNtnNm);									// 차주국가명
							$('#TB08031S_totBusiAmt').val(invstList.totBusiCt);									// 총사업비용
							$('#TB08031S_hostCountry').val(invstList.ntnNm);									// 국가명
							$('#TB08031S_ensrYn').val(invstList.guasDvsnCtns);									// 보증서구분내용
							$('#TB08031S_prorRto').val(invstList.prorRto);              						// 선순위비율
							$('#TB08031S_cerkRto').val(invstList.cerkRto);              						// 중순위비율
							$('#TB08031S_bkbnRto').val(invstList.bkbnRto);              						// 후순위비율
							$('#TB08031S_lseStrtYm').val(invstList.lesStrtDt);              					// 리스시작일자
							$('#TB08031S_lseEdYm').val(invstList.lesEndDt);              						// 리스종료일자
							$('#TB08031S_lsePrd').val(invstList.mnum);              							// 리스기간
							$('#TB08031S_loanPrd').val(invstList.mnum);              							// 대출기간
							$('#TB08031S_loanStrtDt').val(invstList.loanStrtDt);              					// 대출시작일자
							$('#TB08031S_loanEdYm').val(invstList.loanEndDt);              						// 대출종료일자
							$('#TB08031S_amSt').val(invstList.dvcTyCnts);              							// 기종내용
							$('#TB08031S_proEprz').val(invstList.prdcCmpCnts);              					// 제작회사내용
							$('#TB08031S_proYr').val(invstList.mnfYr);              							// 제조년도
							$('#TB08031S_L006').val(invstList.invFnnLesKndDcd);            						// 투자금융리스종류규분코드
							$('#TB08031S_lseMgco').val(invstList.lesMgcoNm);              						// 리스운용사명
							$('#TB08031S_lseUser').val(invstList.lesUserCnts);              					// 리스이용자내용
							$(":radio[name='realEstateSpcYN']").radioSelect(invstList.brwrSpcYn);				// 차주SPC여부
							$(":radio[name='realEstateCondComplyYN']").radioSelect(invstList.mngmCndFlflYn); 	// 관리조건이행여부																	
							$(":radio[name='realEstateBondTrnYN']").radioSelect(invstList.bondTrnsYn);			// 채권이관여부
							$(":radio[name='realEstateCmmntMatYN']").radioSelect(invstList.fnnrCtrcMttrTrgtYn);	// 재무약정사항대상여부
							// 사업참가자정보 조회
							if (bsnsPartInfo.length > 0) {
								$.each(bsnsPartInfo, function(key, value) {
									html += '<tr ondblclick="setBsnsPartInfo(this);">';
									html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
									html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
									html += '    <td style="display:none;">' + value.ptcnRelrDcd + '</td>';            	  // 참가자관계코드
									html += '    <td>' + value.ptcnRelrDcdNm + '</td>';                            		  // 참가자관계명
									html += '    <td>' + value.entpNm + '</td>';                                    	  // 업체명
									html += '    <td class="text-center">' + value.rpsrNm + '</td>';                      // 대표자명
									html += '    <td class="text-center">' + checkBrnAcno(value.crno) + '</td>';          // 법인등록번호
									html += '    <td class="text-center">' + checkBrnAcno(value.bzno) + '</td>';          // 사업자등록번호
									html += '</tr>';
								});
							} else {
								html += '<tr>';
								html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
								html += '</tr>';
							}
							$('#TB08031S_bsnsPartInfo').html(html);
							
							
							// 사업주요전망 조회
							html = '';
							if (bsnsForecast.length > 0) {
								$.each(bsnsForecast, function(key, value) {
									html += '<tr ondblclick="setBsnsForecast(this);">';
									html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
									html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
									html += '    <td class="text-center">' + formatDate(value.prarDt) + '</td>';          // 예정일자
									html += '    <td class="text-center">' + formatDate(value.flflDt) + '</td>';          // 이행일자
									html += '    <td class="text-center">' + value.flflYn + '</td>';                      // 이행여부
									html += '    <td>' + value.mainScxCtns + '</td>';                 					  // 주요일정내용
									html += '</tr>';
								});
							} else {
								html += '<tr>';
								html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
								html += '</tr>';
							}
							$('#TB08031S_bsnsForecast').html(html);
							
							
							// 채권보전주요약정 조회
							html = '';
							if (bondProtInfo.length > 0) {
								$.each(bondProtInfo, function(key, value) {
									html += '<tr ondblclick="setBondProtInfo(this);">';
									html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
									html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
									html += '    <td style="display:none;">' + value.bondProtCcd + '</td>';               // 채권보전구분
									html += '    <td>' + value.bondProtNm + '</td>';               						  // 채권보전구분명
									html += '    <td class="text-center">' + value.fnnrCtrcMttrTrgtYn + '</td>';          // 이행여부
									html += '    <td>' + value.mainCtrcMttrCnts + '</td>';            					  // 상세내용
									html += '</tr>';
								});
							} else {
								html += '<tr>';
								html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
								html += '</tr>';
							}
							$('#TB08031S_bondProtInfo').html(html);

							// 조건변경이력 조회
							html = '';
							if (cchInfo.length > 0) {
								$.each(cchInfo, function(key, value) {
									html += '<tr ondblclick="setCchInfo(this);">';
									html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
									html += '    <td class="text-center">' + value.sn + '</td>';                          					  // NO
									html += '    <td class="text-center">' + formatDate(value.apvlDt) + '</td>';               	  			  // 승인일자
									html += '    <td class="text-center">' + value.cndChngDcmNoCnts + '</td>';               				  // 승인문서번호
									html += '    <td>' + value.cndChngMainCnts + '</td>';          	  										  // 주요내용
									html += '    <td style="display:none;">' + value.prcsrEmpno + '</td>';            					  	  // 취급자
									html += '    <td class="text-center">' + value.prcsrEmpnm + '</td>';            					  	  // 취급자명
									html += '    <td class="text-center">' + formatPhoneNo(value.prcsrTelNo) + '</td>';            			  // 취급자개인번호
									html += '    <td class="text-center">' + formatDate(value.crotDt) + '</td>';            				  // 시행일자
									html += '</tr>';
								});
							} else {
								html += '<tr>';
								html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
								html += '</tr>';
							}
							$('#TB08031S_cchInfo').html(html);
							
							
							// 대주단정보 조회
							html = '';
							if (stlnInfo.length > 0) {
								$.each(stlnInfo, function(key, value) {
									html += '<tr ondblclick="setStlnInfo(this);">';
									html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
									html += '    <td class="text-center">' + value.sn + '</td>';                          				  // NO
									html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
									html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
									html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
									html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
									html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
									html += '</tr>';
								});
							} else {
								html += '<tr>';
								html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
								html += '</tr>';
							}
							$('#TB08031S_stlnInfo').html(html);
						}
						
					} else {
						
						/* PEF/VC 사업정보 */
						if( !isEmpty(pefList) ) {
							$('#TB08031S_invstGuidelines').val(pefList.invstStgyCtns);       						// 투자전략내용
							
							$('#TB08031S_tab2_empNo').val(pefList.chrgEmpno);										// 담당자사번
							$('#TB08031S_tab2_empNm').val(pefList.chrgEmpnm);										// 담당자명																
							$(":radio[name='pefVcInvstMngYN']").radioSelect(pefList.mngmCndFlflYn);					// 관리조건이행여부																	
							$(":radio[name='TB08031S_pefVcBondTrnYN']").radioSelect(pefList.bondTrnsYn);			// 채권이관여부
						}

						// 사업참가자정보
						if (bsnsPartInfo.length > 0) {
							$.each(bsnsPartInfo, function(key, value) {
								html += '<tr ondblclick="setBsnsPartInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.ptcnRelrDcd + '</td>';            	  // 참가자관계코드
								html += '    <td>' + value.ptcnRelrDcdNm + '</td>';                            		  // 참가자관계명
								html += '    <td>' + value.entpNm + '</td>';                                    	  // 업체명
								html += '    <td class="text-center">' + value.rpsrNm + '</td>';                      // 대표자명
								html += '    <td class="text-center">' + checkBrnAcno(value.crno) + '</td>';          // 법인등록번호
								html += '    <td class="text-center">' + checkBrnAcno(value.bzno) + '</td>';          // 사업자등록번호
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="7" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsPartInfo').html(html);


						// 사업주요전망 조회
						html = '';
						if (bsnsForecast.length > 0) {
							$.each(bsnsForecast, function(key, value) {
								html += '<tr ondblclick="setBsnsForecast(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td class="text-center">' + formatDate(value.prarDt) + '</td>';          // 예정일자
								html += '    <td class="text-center">' + formatDate(value.flflDt) + '</td>';          // 이행일자
								html += '    <td class="text-center">' + value.flflYn + '</td>';                      // 이행여부
								html += '    <td>' + value.mainScxCtns + '</td>';                 					  // 주요일정내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bsnsForecast').html(html);

						// 채권보전주요약정 조회
						html = '';
						if (bondProtInfo.length > 0) {
							$.each(bondProtInfo, function(key, value) {
								html += '<tr ondblclick="setBondProtInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          // NO
								html += '    <td style="display:none;">' + value.bondProtCcd + '</td>';               // 채권보전구분
								html += '    <td>' + value.bondProtNm + '</td>';               						  // 채권보전구분명
								html += '    <td class="text-center">' + value.fnnrCtrcMttrTrgtYn + '</td>';          // 이행여부
								html += '    <td>' + value.mainCtrcMttrCnts + '</td>';            					  // 상세내용
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_bondProtInfo').html(html);

						/// 조건변경이력 조회
						html = '';
						if (cchInfo.length > 0) {
							$.each(cchInfo, function(key, value) {
								html += '<tr ondblclick="setCchInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-center">' + value.sn + '</td>';                          					  // NO
								html += '    <td class="text-center">' + formatDate(value.apvlDt) + '</td>';               	  			  // 승인일자
								html += '    <td class="text-center">' + value.cndChngDcmNoCnts + '</td>';               				  // 승인문서번호
								html += '    <td>' + value.cndChngMainCnts + '</td>';          	  										  // 주요내용
								html += '    <td style="display:none;">' + value.prcsrEmpno + '</td>';            					  	  // 취급자
								html += '    <td class="text-center">' + value.prcsrEmpnm + '</td>';            					  	  // 취급자명
								html += '    <td class="text-center">' + formatPhoneNo(value.prcsrTelNo) + '</td>';            			  // 취급자개인번호
								html += '    <td class="text-center">' + formatDate(value.crotDt) + '</td>';            				  // 시행일자
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_cchInfo').html(html);

						// 수익자정보 조회
						html = '';
						if (ernInfo.length > 0) {
							$.each(ernInfo, function(key, value) {
								html += '<tr ondblclick="setErnInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display:none;">' + value.ibStlnDcd + '</td>';               	  			  // 구분
								html += '    <td>' + value.ibStlnNm + '</td>';               	  			 						  // 구분명
								html += '    <td>' + value.entpNm + '</td>';               				  							  // 기관명
								html += '    <td class="text-right">' + commaStr(handleNullData(value.crdtProvLmtAmt)) + '</td>';     // 약정금액
								html += '    <td class="text-right">' + handleNullData(value.prtcRto) + '</td>';            		  // 참가비율
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_ernInfo').html(html);

						// 관련사업정보 조회
						html = '';
						if (busiInfo.length > 0) {
							$.each(busiInfo, function(key, value) {
								html += '<tr ondblclick="">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td class="text-left">' + value.sn + '</td>';               	  			 						  // 구분명
								html += '    <td class="text-left">' + value.reltDealNo + '</td>';               				  							  // 기관명
								html += '    <td class="text-left">' + value.dealNm + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.allInvAmt)) + '</td>';
								html += '    <td class="text-center">' + 'Y' + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.thcoPtciAmt)) + '</td>';
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_busiInfo').html(html);

						// 투자기업목록 조회
						html = '';
						if (invstEprzInfo.length > 0) {
							$.each(invstEprzInfo, function(key, value) {
								html += '<tr ondblclick="setInvstEprzInfo(this);">';
								html += '<td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '<td class="text-center">' + value.sn + '</td>';     		 // NO
								html += '<td class="text-center">' + formatDate(handleNullData(value.stdrYm)).slice(0, 7) + '</td>';         // 기준년월
								html += '<td class="text-left">' + value.fndNm + '</td>';        	 //	펀드명
								html += '<td class="text-center">' + checkBrnAcno(handleNullData(value.crno)) + '</td>';      	 //	법인등록번호
								html += '<td class="text-left">' + value.trOthrNm + '</td>';         //	거래상대방명
								html += '<td class="text-center">' + checkBrnAcno(handleNullData(value.bzno)) + '</td>';        	 //	사업자번호
								html += '<td class="text-left">' + value.bztpNm + '</td>';           //	업종
								html += '<td style="display:none;">' + value.ntnNm + '</td>';        // 소속국가명
								html += '<td style="display:none;">' + value.fndDcd + '</td>';       // 펀드구분
								html += '<td style="display:none;">' + value.sctsFndTpDcd + '</td>'; // 펀드유형상세
								html += '<td style="display:none;">' + formatDate(handleNullData(value.pchsDt)) + '</td>';       // 취득일자
								html += '<td style="display:none;">' + addComma(handleNullData(value.dealAmt)) + '</td>';      // 취득가액
								html += '<td style="display:none;">' + addComma(handleNullData(value.bkpr)) + '</td>';         // 장부가액
								html += '<td style="display:none;">' + addComma(handleNullData(value.asesBal)) + '</td>';      // 평가금액
								html += '<td style="display:none;">' + value.intlErnRt + '</td>';    // 순내부수익률
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_invstBzscalList').html(html);


						// 편입자산정보 조회
						html = '';
						if (admsAsstInfo.length > 0) {
							$.each(admsAsstInfo, function(key, value) {
								html += '<tr ondblclick="setAdmsAsstInfo(this);">';
								html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
								html += '    <td style="display: none">' + value.ibInvTpCd + '</td>';
								html += '    <td class="text-left">' + value.ibInvTpNm + '</td>';
								html += '    <td class="text-right">' + handleNullData(addComma(value.admsAsstAcbkAcqAmt)) + '</td>';
								html += '    <td class="text-right">' + handleNullData(value.admsAsstGrntErnRt) + '</td>';
								html += '    <td class="text-left">' + value.admsAsstItmNm + '</td>';
								html += '</tr>';
							});
						} else {
							html += '<tr>';
							html += '<td colspan="5" style="text-align: center">데이터가 없습니다.</td>';
							html += '</tr>';
						}
						$('#TB08031S_admsAsstInfo').html(html);

					}
					
					tabCtrl('invbnkAmnBzCd');
				},
				error:function(request, status, error){

					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			
				}

			});
		}
	}

	// 사업참가자정보 더블클릭 이벤트
	function setBsnsPartInfo(e) {
		var tr = $(e);
		var td = $(tr).children();
		
	$('#TB08031S_bsnsPartInfo tr').removeClass('table-active');
	tr.addClass('table-active');
		
		$('#TB08031S_P001').val(td.eq(2).text());				// 참가자관계 
		$('#TB08031S_partCorpNm').val(td.eq(4).text());			// 업체명
		$('#TB08031S_rprstPNm').val(td.eq(5).text());			// 대표자명
		$('#TB08031S_dtlsCorpNo').val(td.eq(6).text());			// 법인등록번호
		$('#TB08031S_bsnsRgstNo').val(td.eq(7).text());			// 사업자등록번호
	}

	// 사업참가자상세 참가자관계 수정시 실행
	$("#TB08031S_P001").change(function() {
		if ( $("#TB08031S_bsnsPartInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(2).text($(this).val());
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(3).text($('#TB08031S_P001 option:selected').text());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "참가자 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업참가자상세 업체명 수정시 실행
	$("#TB08031S_partCorpNm").change(function() {
		if ( $("#TB08031S_bsnsPartInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(4).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "업체명을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업참가자상세 법인등록번호 수정시 실행
	$("#TB08031S_dtlsCorpNo").change(function() {
		if ( $("#TB08031S_bsnsPartInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(6).text(checkBrnAcno($(this).val()));
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "법인등록번호를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업참가자상세 사업자등록번호 수정시 실행
	$("#TB08031S_bsnsRgstNo").change(function() {
		if ( $("#TB08031S_bsnsPartInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(7).text(checkBrnAcno($(this).val()));
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "사업자등록번호를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업참가자상세 대표자명 수정시 실행
	$("#TB08031S_rprstPNm").change(function() {
		if ( $("#TB08031S_bsnsPartInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsPartInfo").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "대표자명을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업주요전망 더블클릭 이벤트
	function setBsnsForecast(e) {
		var tr = $(e);
		var td = $(tr).children();
		
	$('#TB08031S_bsnsForecast tr').removeClass('table-active');
	tr.addClass('table-active');
		
		$('#TB08031S_exptDt').val(td.eq(2).text());																			// 예정일자 
		$('#TB08031S_pfrmDt').val(td.eq(3).text());																			// 이행일자
		td.eq(4).text() == "Y" ? $('#TB08031S_pfrmY').attr("checked", true):$('#TB08031S_pfrmN').attr("checked", true);		// 이행여부				
		td.eq(4).text() == "N" ? $('#TB08031S_pfrmN').attr("checked", true):$('#TB08031S_pfrmY').attr("checked", true);		// 이행여부
		$('#TB08031S_mainCntnt').val(td.eq(5).text());																		// 주요일정내용
	}

	// 사업주요전망 예정일자 수정시 실행
	$("#TB08031S_exptDt").change(function() {
		if ( $("#TB08031S_bsnsForecast").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsForecast").find('.table-active').children().eq(2).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "예정일자를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업주요전망 이행일자 수정시 실행
	$("#TB08031S_pfrmDt").change(function() {
		if ( $("#TB08031S_bsnsForecast").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsForecast").find('.table-active').children().eq(3).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "이행일자를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업주요전망 이행여부 수정시 실행
	$("input[name='pfrmYN']").click(function() {
		if ($("#TB08031S_bsnsForecast").find('.table-active').length > 0) {
			var newValue = $(this).val() == "Y" ? 'Y' : 'N';
			$("#TB08031S_bsnsForecast").find('.table-active').children().eq(4).text(newValue);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: '이행여부를 선택해주세요.',
				confirmButtonText: '확인'
			});
		}
	});

	// 사업주요전망 주요일정내용 수정시 실행
	$("#TB08031S_mainCntnt").change(function() {
		if ( $("#TB08031S_bsnsForecast").find('.table-active').length > 0 ) {
			$("#TB08031S_bsnsForecast").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "주요일정내용을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 채권보전주요약정 더블클릭 이벤트
	function setBondProtInfo(e) {
		var tr = $(e);
		var td = $(tr).children();
		
	$('#TB08031S_bondProtInfo tr').removeClass('table-active');
	tr.addClass('table-active');
		
		$('#TB08031S_B007').val(td.eq(2).text());																					// 채권보전구분 
		td.eq(4).text() == "Y" ? $('#TB08031S_bondPfrmY').attr("checked", true):$('#TB08031S_bondPfrmN').attr("checked", true);		// 이행여부				
		td.eq(4).text() == "N" ? $('#TB08031S_bondPfrmN').attr("checked", true):$('#TB08031S_bondPfrmY').attr("checked", true);		// 이행여부
		$('#TB08031S_dtlsCntnt').val(td.eq(5).text());																				// 상세내용
	}

	// 채권보전주요약정 채권보전구분 수정시 실행
	$("#TB08031S_B007").change(function() {
		if ( $("#TB08031S_bondProtInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bondProtInfo").find('.table-active').children().eq(2).text($(this).val());
			$("#TB08031S_bondProtInfo").find('.table-active').children().eq(3).text($('#TB08031S_B007 option:selected').text());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "채권보전구분을 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 채권보전주요약정 이행여부 수정시 실행
	$("input[name='TB08031S_bondPfrmYN']").click(function() {
		if ($("#TB08031S_bondProtInfo").find('.table-active').length > 0) {
			var newValue = $(this).val() == "Y" ? 'Y' : 'N';
			$("#TB08031S_bondProtInfo").find('.table-active').children().eq(4).text(newValue);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: '이행여부를 선택해주세요.',
				confirmButtonText: '확인'
			});
		}

	});

	// 채권보전주요약정 상세내용 수정시 실행
	$("#TB08031S_dtlsCntnt").change(function() {
		if ( $("#TB08031S_bondProtInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_bondProtInfo").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "상세내용을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 더블클릭 이벤트
	function setCchInfo(e) {
		var tr = $(e);
		var td = $(tr).children();
		
	$('#TB08031S_cchInfo tr').removeClass('table-active');
	tr.addClass('table-active');
		
		$('#TB08031S_cndtMainCntnt').val(td.eq(4).text());																		// 주요내용 
		$('#TB08031S_rcgDt').val(td.eq(2).text());																				// 승인일자
		$('#TB08031S_cmplDt').val(td.eq(8).text());																				// 시행일자
		$('#TB08031S_handlerID').val(td.eq(7).text());																			// 취급자개인번호
		$('#TB08031S_cch_empNm').val(td.eq(6).text());																			// 취급자
		$('#TB08031S_rcgDocNo').val(td.eq(3).text());																			// 승인문서번호
	}

	// 조건변경이력 주요내용 수정시 실행
	$("#TB08031S_cndtMainCntnt").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(4).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "주요내용을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 승인일자 수정시 실행
	$("#TB08031S_rcgDt").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(2).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "승인일자를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 시행일자 수정시 실행
	$("#TB08031S_cmplDt").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(8).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "시행일자를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 취급자개인번호 수정시 실행
	$("#TB08031S_handlerID").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(7).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "취급자개인번호를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 취급자 수정시 실행
	$("#TB08031S_cch_empNm").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(6).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "취급자를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 조건변경이력 승인문서번호 수정시 실행
	$("#TB08031S_rcgDocNo").change(function() {
		if ( $("#TB08031S_cchInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_cchInfo").find('.table-active').children().eq(3).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "승인문서번호를 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 대주단정보 더블클릭 이벤트
	function setStlnInfo(e) {
		var tr = $(e);
		var td = $(tr).children();
		
	$('#TB08031S_stlnInfo tr').removeClass('table-active');
	tr.addClass('table-active');
		
		$('#TB08031S_R021_1').val(td.eq(2).text());																					// 구분 
		$('#TB08031S_mCorpNm').val(td.eq(4).text());																				// 기관명
		$('#TB08031S_mAgrAmt').val(td.eq(5).text());																				// 약정금액
		$('#TB08031S_mPartRt').val(td.eq(6).text());																				// 참가비율
	}

	// 대주단정보 구분 수정시 실행
	$("#TB08031S_R021_1").change(function() {
		if ( $("#TB08031S_stlnInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_stlnInfo").find('.table-active').children().eq(2).text($(this).val());
			$("#TB08031S_stlnInfo").find('.table-active').children().eq(3).text($('#TB08031S_R021_1 option:selected').text());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "구분을 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 대주단정보 기관명 수정시 실행
	$("#TB08031S_mCorpNm").change(function() {
		if ( $("#TB08031S_stlnInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_stlnInfo").find('.table-active').children().eq(4).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "기관명을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 대주단정보 약정금액 수정시 실행
	$("#TB08031S_mAgrAmt").change(function() {
		if ( $("#TB08031S_stlnInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_stlnInfo").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "약정금액을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 대주단정보 참가비율 수정시 실행
	$("#TB08031S_mPartRt").change(function() {
		if ( $("#TB08031S_stlnInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_stlnInfo").find('.table-active').children().eq(6).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "참가비율을 입력해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 사업구분이 변경될때 실행
	function tabCtrl(prefix) {
		var firstLetter = '';
		if( prefix === 'ibDealNo' ) {
			
			var selId = $('#TB08031S_ibDealNo').val();
			firstLetter = selId.charAt(0).toUpperCase();
					
		} else if( prefix == 'invbnkAmnBzCd' ) {
			
			switch ( $('#TB08031S_invbnkAmnBzCd').val() ) {
				case '01': firstLetter = 'A';
					break;
				case '02': firstLetter = 'B';
					break;
				case '03': firstLetter = 'C';
					break;
				case '04': firstLetter = 'D';
					break;
				case '05': firstLetter = 'E';
					break;
				default : 
					break;		
			}
		}
		
		var tabPst = $('#TB08031S_ramsTab').children();
		switch(firstLetter) {
			case 'A' :/* TAB MENU SHOW/HIDE */
						$('#TB08031S_invbnkAmnBzCd').val('01');
						tabPst.eq(0).show();
						tabPst.eq(1).hide();
						tabPst.eq(2).hide();
						tabPst.eq(3).hide();
						tabPst.eq(4).hide();
						tabPst.eq(5).show();
						tabPst.eq(6).show();
						tabPst.eq(7).show();
						tabPst.eq(8).show();
						tabPst.eq(9).show();
						tabPst.eq(10).show();
						tabPst.eq(11).hide();
						tabPst.eq(12).hide();
						tabPst.eq(13).hide();
						tabPst.eq(14).hide();
						/* 기존에 선택된 TAB에서 active 요소 삭제 후 현재 SHOW 상태인 TAB MENU 중에서
						첫번째 TAB PANEL에 active 요소 부여										*/
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(0).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(0).children().attr('class', 'nav-link active');
				break;
			case 'B' :	
						$('#TB08031S_invbnkAmnBzCd').val('02');
						tabPst.eq(0).hide();
						tabPst.eq(1).hide();
						tabPst.eq(2).show();
						tabPst.eq(3).hide();
						tabPst.eq(4).hide();
						tabPst.eq(5).show();
						tabPst.eq(6).show();
						tabPst.eq(7).show();
						tabPst.eq(8).show();
						tabPst.eq(9).show();
						tabPst.eq(10).show();
						tabPst.eq(11).hide();
						tabPst.eq(12).hide();
						tabPst.eq(13).hide();
						tabPst.eq(14).hide();
						
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(2).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(2).children().attr('class', 'nav-link active');
				break;
			case 'C' :	
						$('#TB08031S_invbnkAmnBzCd').val('03');
						tabPst.eq(0).hide();
						tabPst.eq(1).hide();
						tabPst.eq(2).hide();
						tabPst.eq(3).show();
						tabPst.eq(4).hide();
						tabPst.eq(5).show();
						tabPst.eq(6).show();
						tabPst.eq(7).show();
						tabPst.eq(8).show();
						tabPst.eq(9).show();
						tabPst.eq(10).show();
						tabPst.eq(11).show();
						tabPst.eq(12).hide();
						tabPst.eq(13).hide();
						tabPst.eq(14).show();
						
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(3).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(3).children().attr('class', 'nav-link active');
				break;
			case 'D' :	
						$('#TB08031S_invbnkAmnBzCd').val('04');
						tabPst.eq(0).hide();
						tabPst.eq(1).hide();
						tabPst.eq(2).hide();
						tabPst.eq(3).hide();
						tabPst.eq(4).show();
						tabPst.eq(5).show();
						tabPst.eq(6).show();
						tabPst.eq(7).show();
						tabPst.eq(8).show();
						tabPst.eq(9).show();
						tabPst.eq(10).hide();
						tabPst.eq(11).hide();
						tabPst.eq(12).hide();
						tabPst.eq(13).hide();
						tabPst.eq(14).hide();
						
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(4).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(4).children().attr('class', 'nav-link active');
				break;
			case 'E' :	
						$('#TB08031S_invbnkAmnBzCd').val('05');
						tabPst.eq(0).hide();
						tabPst.eq(1).show();
						tabPst.eq(2).hide();
						tabPst.eq(3).hide();
						tabPst.eq(4).hide();
						tabPst.eq(5).show();
						tabPst.eq(6).show();
						tabPst.eq(7).show();
						tabPst.eq(8).show();
						tabPst.eq(9).hide();
						tabPst.eq(10).show();
						tabPst.eq(11).show();
						tabPst.eq(12).show();
						tabPst.eq(13).show();
						tabPst.eq(14).show();
						
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(1).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(1).children().attr('class', 'nav-link active');
				break;
			default : tabPst.show();
						$('.tab-content').children('.tab-pane.active').attr('class', 'tab-pane');
						$('.tab-content').children().eq(0).attr('class', 'tab-pane active');
						
						$('.nav.nav-tabs').find('.nav-link.active').attr('class', 'nav-link');
						$('.nav.nav-tabs').children().eq(0).children().attr('class', 'nav-link active');
				break;
		}
	}

	/* 사업참가자정보 행추가 */
	function addMenuRowBsnsPartInfo() {
		
		// var temp = $('#TB08031S_bsnsPartInfo').find('tr:eq(0)').find('td:eq(0)').html();
		
		// if('데이터가 없습니다.' == temp || '' == temp) {
		// 	$('#TB08031S_bsnsPartInfo').empty();
		// }

		// var html = '';
		// var sq = $('#TB08031S_bsnsPartInfo').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_bsnsPartInfo').children('tr').last().children('td').eq(1).text()))+1;

		// html += '<tr ondblclick="setBsnsPartInfo(this);">';
		// html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		// html += '<td class="text-center">' + sq + '</td>';
		// html += '<td style="display:none"></td>';
		// html += '<td></td>';
		// html += '<td></td>';
		// html += '<td class="text-center"></td>';
		// html += '<td class="text-center"></td>';
		// html += '<td class="text-center"></td>';
		// html += '</tr>';

		var bfHeight = $('#TB08031S_bsnsPartInfo').pqGrid('option','height');			//현재 그리드 높이
		var afHeight = bfHeight;														//그리드높이 ++

		if(bfHeight < 500){	//최대높이
			afHeight = bfHeight + 20;
		}

		var rowLgth = $('#TB08031S_bsnsPartInfo').pqGrid('option', 'dataModel.data').length;

		var newRow = {
			"isChked"		: false,
			"no"			: rowLgth+1
		}

		$('#TB08031S_bsnsPartInfo').pqGrid("addRow", {rowData: newRow, checkEditable: false });
		$('#TB08031S_bsnsPartInfo').pqGrid('option','height', afHeight).pqGrid('refresh');

		//$('#TB08031S_bsnsPartInfo').append(html);
	}

	/* 사업참가자정보 행삭제 */
	function delMenuRowBsnsPartInfo() {

		var gridData = $('#TB08031S_bsnsPartInfo').pqGrid("option", "dataModel.data");
		var bfHeight = $('#TB08031S_bsnsPartInfo').pqGrid('option','height');			//현재 그리드 높이
		var afHeight = bfHeight;														//그리드높이 --

		var newData = gridData.filter(function (rowData) {
			return !rowData.isChked;
		});

		bsnsPartInfoInstance.option("dataModel.data", newData);

		if(bfHeight > 80){			//min height
			afHeight = bfHeight - 40*($('#TB08031S_bsnsPartInfo').pqGrid('option', 'dataModel.data').length+1);
		}
		
		$('#TB08031S_bsnsPartInfo').pqGrid('option','height', afHeight).pqGrid('refresh');

		bsnsPartInfoInstance.refreshDataAndView();


	}

	/* 사업주요전망 행추가 */
	function addMenuRowBsnsForecast() {
		
		var temp = $('#TB08031S_bsnsForecast').find('tr:eq(0)').find('td:eq(0)').html();
		
		if( '데이터가 없습니다.' == temp || '' == temp ) {
			$('#TB08031S_bsnsForecast').empty();
		}

		var html = '';
		var sq = $('#TB08031S_bsnsForecast').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_bsnsForecast').children('tr').last().children('td').eq(1).text()))+1;

		html += '<tr ondblclick="setBsnsForecast(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td class="text-center">' + sq + '</td>';
		html += '<td class="text-center"></td>';
		html += '<td class="text-center"></td>';
		html += '<td class="text-center"></td>';
		html += '<td></td>';
		html += '</tr>';

		$('#TB08031S_bsnsForecast').append(html);
	}

	/* 사업주요전망 행삭제 */
	function delMenuRowBsnsForecast() {
		var rowNum = 1;
		
		$('#TB08031S_bsnsForecast tr').each(function() {
			
			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}
		});
	}

	/* 채권보전주요약정 행추가 */
	function addMenuRowBondProtInfo() {
		
		var temp = $('#TB08031S_bondProtInfo').find('tr:eq(0)').find('td:eq(0)').html(); 
		
		if( '데이터가 없습니다.' == temp || '' == temp ){
			$('#TB08031S_bondProtInfo').empty();
		}

		var html = '';
		var sq = $('#TB08031S_bondProtInfo').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_bondProtInfo').children('tr').last().children('td').eq(1).text()))+1;

		html += '<tr ondblclick="setBondProtInfo(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td class="text-center">' + sq + '</td>';
		html += '<td style="display:none;"></td>';
		html += '<td></td>';
		html += '<td class="text-center"></td>';
		html += '<td></td>';
		html += '</tr>';

		$('#TB08031S_bondProtInfo').append(html);

	}

	/* 채권보전주요약정 행삭제 */
	function delMenuRowBondProtInfo() {
		var rowNum = 1;
		
		$('#TB08031S_bondProtInfo tr').each(function() {
			
			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}
		});
	}

	/* 조건변경이력 행추가 */
	function addMenuRowCchInfo() {
		
		var temp = $('#TB08031S_cchInfo').find('tr:eq(0)').find('td:eq(0)').html(); 
		
		if( '데이터가 없습니다.' == temp || '' == temp ){
			$('#TB08031S_cchInfo').empty();
		}

		var html = '';
		var sq = $('#TB08031S_cchInfo').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_cchInfo').children('tr').last().children('td').eq(1).text()))+1;

		html += '<tr ondblclick="setCchInfo(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td class="text-center">' + sq + '</td>';
		html += '<td class="text-center"></td>';
		html += '<td class="text-center"></td>';
		html += '<td></td>';
		html += '<td style="display:none;"></td>';
		html += '<td class="text-center"></td>';
		html += '<td class="text-center"></td>';
		html += '<td class="text-center"></td>';
		html += '</tr>';

		$('#TB08031S_cchInfo').append(html);
	}

	/* 조건변경이력 행삭제 */
	function delMenuRowCchInfo() {
		var rowNum = 1;
		
		$('#TB08031S_cchInfo tr').each(function() {
			
			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}
		});
	}


	/* 대주단정보 행추가 */
	function addMenuRowStlnInfo() {
		
		var temp = $('#TB08031S_stlnInfo').find('tr:eq(0)').find('td:eq(0)').html(); 
		
		if( '데이터가 없습니다.' == temp || '' == temp ){
			$('#TB08031S_stlnInfo').empty();
		}

		var html = '';
		var sq = $('#TB08031S_stlnInfo').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_stlnInfo').children('tr').last().children('td').eq(1).text()))+1;
		
		html += '<tr ondblclick="setStlnInfo(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td class="text-center">' + sq + '</td>';
		html += '<td style="display:none;"></td>';
		html += '<td></td>';
		html += '<td></td>';
		html += '<td class="text-rigth"></td>';
		html += '<td class="text-rigth"></td>';
		html += '</tr>';

		$('#TB08031S_stlnInfo').append(html);

	}

	/* 대주단정보 행삭제 */
	function delMenuRowStlnInfo() {
		var rowNum = 1;
		
		$('#TB08031S_stlnInfo tr').each(function() {
			
			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}
		});
	}

	/* 수익자정보 행추가 */
	function addMenuRowErnInfo() {

		var temp = $('#TB08031S_ernInfo').find('tr:eq(0)').find('td:eq(0)').html();

		if('데이터가 없습니다.' == temp || '' == temp) {
			$('#TB08031S_ernInfo').empty();
		}

		var html = '';

		html += '<tr ondblclick="setErnInfo(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td style="display: none">01</td>';
		html += '<td class="text-left">자산운용사 (01)</td>';
		html += '<td class="text-left"></td>';
		html += '<td class="text-right"></td>';
		html += '<td class="text-right"></td>';
		html += '</tr>';

		$('#TB08031S_ernInfo').append(html);
	}

	/* 수익자정보 행삭제 */
	function delMenuRowErnInfo() {

		$('#TB08031S_ernInfo tr').each(function() {

			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			}

		});
	}

	// 수익자정보 더블클릭 이벤트
	function setErnInfo(e) {
		var tr = $(e);
		var td = $(tr).children();

		$('#TB08031S_ernInfo tr').removeClass('table-active');
		tr.addClass('table-active');

		$('#TB08031S_R021_2').val(td.eq(1).text());																					// 구분
		$('#TB08031S_ernCorpNm').val(td.eq(3).text());																				// 기관명
		$('#TB08031S_ernAgrAmt').val(td.eq(4).text());																				// 약정금액
		$('#TB08031S_ernPartRt').val(td.eq(5).text());																				// 참가비율
	}

	// 수익자정보 구분 수정시 실행
	$("#TB08031S_R021_2").change(function() {
		if ( $("#TB08031S_ernInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_ernInfo").find('.table-active').children().eq(1).text($(this).val());
			$("#TB08031S_ernInfo").find('.table-active').children().eq(2).text($('#TB08031S_R021_2 option:selected').text());
		}
	});

	// 수익자정보 기관명 수정시 실행
	$("#TB08031S_ernCorpNm").change(function() {
		if ( $("#TB08031S_ernInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_ernInfo").find('.table-active').children().eq(3).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정하실 수악자 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 수익자정보 약정금액 수정시 실행
	$("#TB08031S_ernAgrAmt").change(function() {
		if ( $("#TB08031S_ernInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_ernInfo").find('.table-active').children().eq(4).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정하실 수악자 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 수익자정보 참기비율 수정시 실행
	$("#TB08031S_ernPartRt").change(function() {
		if ( $("#TB08031S_ernInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_ernInfo").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정하실 수악자 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	/* 편입자산정보 행추가 */
	function addMenuRowAdmsAsstInfo() {

		var temp = $('#TB08031S_admsAsstInfo').find('tr:eq(0)').find('td:eq(0)').html();

		if('데이터가 없습니다.' == temp || '' == temp) {
			$('#TB08031S_admsAsstInfo').empty();
		}

		var html = '';

		html += '<tr ondblclick="setAdmsAsstInfo(this);">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td style="display: none">1</td>';
		html += '<td class="text-left">대출 (1)</td>';
		html += '<td class="text-right"></td>';
		html += '<td class="text-right"></td>';
		html += '<td class="text-left"></td>';
		html += '</tr>';

		$('#TB08031S_admsAsstInfo').append(html);
	}

	/* 편입자산정보 행삭제 */
	function delMenuRowAdmsAsstInfo() {

		$('#TB08031S_admsAsstInfo tr').each(function() {

			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			}

		});
	}

	// 편입자산정보 더블클릭 이벤트
	function setAdmsAsstInfo(e) {
		var tr = $(e);
		var td = $(tr).children();

		$('#TB08031S_admsAsstInfo tr').removeClass('table-active');
		tr.addClass('table-active');

		$('#TB08031S_I038').val(td.eq(1).text());				// 투자유형
		$('#TB08031S_invstWeight').val(td.eq(3).text());		// 비중
		$('#TB08031S_admsAmt').val(td.eq(4).text());			// 편입금액
		$('#TB08031S_admsAsstNm').val(td.eq(5).text());			// 편입자산명
	}

	// 편입자산정보 투자유형 수정시 실행
	$("#TB08031S_I038").change(function() {
		if ( $("#TB08031S_admsAsstInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_admsAsstInfo").find('.table-active').children().eq(1).text($(this).val());
			$("#TB08031S_admsAsstInfo").find('.table-active').children().eq(2).text($('#TB08031S_I038 option:selected').text());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정할 편입자산 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 편입자산정보 비중 수정시 실행
	$("#TB08031S_invstWeight").change(function() {
		if ( $("#TB08031S_admsAsstInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_admsAsstInfo").find('.table-active').children().eq(4).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정할 편입자산 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 편입자산정보 편입금액 수정시 실행
	$("#TB08031S_admsAmt").change(function() {
		if ( $("#TB08031S_admsAsstInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_admsAsstInfo").find('.table-active').children().eq(3).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정할 편입자산 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	// 편입자산정보 편입자산명 수정시 실행
	$("#TB08031S_admsAsstNm").change(function() {
		if ( $("#TB08031S_admsAsstInfo").find('.table-active').length > 0 ) {
			$("#TB08031S_admsAsstInfo").find('.table-active').children().eq(5).text($(this).val());
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "수정할 편입자산 정보를 선택해주세요."
				, confirmButtonText: "확인"
			});
		}
	});

	/* 투자기업목록 행추가 */
	function addMenuRowInvstEprzInfo() {

		var temp = $('#TB08031S_invstBzscalList').find('tr:eq(0)').find('td:eq(0)').html();

		if('데이터가 없습니다.' == temp || '' == temp) {
			$('#TB08031S_invstBzscalList').empty();
		}

		var html = '';
		var sq = $('#TB08031S_invstBzscalList').children('tr').last().children('td').eq(1).text() == null?1:Number(($('#TB08031S_invstBzscalList').children('tr').last().children('td').eq(1).text()))+1;

		html += '<tr ondblclick="setInvstEprzInfo(this)">';
		html += '<td class="text-center"><input type="checkbox" value="Y"></td>';
		html += '<td class="text-center">' + sq + '</td>';           // NO
		html += '<td class="text-center"></td>';           			 // 기준년월
		html += '<td class="text-left"></td>';        				 //	펀드명
		html += '<td class="text-center"></td>';      				 //	법인등록번호
		html += '<td class="text-left"></td>';          			 //	거래상대방명
		html += '<td class="text-center"></td>';        			 //	사업자번호
		html += '<td class="text-left"></td>';                 		 //	업종
		html += '<td style="display:none;"></td>';                   // 소속국가명
		html += '<td style="display:none;"></td>';                   // 펀드구분
		html += '<td style="display:none;"></td>';                   // 펀드유형상세
		html += '<td style="display:none;"></td>';                   // 취득일자
		html += '<td style="display:none;"></td>';                   // 취득가액
		html += '<td style="display:none;"></td>';                   // 장부가액
		html += '<td style="display:none;"></td>';                   // 평가금액
		html += '<td style="display:none;"></td>';                   // 순내부수익률
		html += '</tr>';

		$('#TB08031S_invstBzscalList').append(html);
	}

	/* 투자기업목록 행삭제 */
	function delMenuRowInvstEprzInfo() {
		var rowNum = 1;

		$('#TB08031S_invstBzscalList tr').each(function() {

			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}

		});
	}

	/* 투자기업목록 더블클릭 이벤트 */
	function setInvstEprzInfo(e) {
		var tr = $(e);
		var td = $(tr).children();

		$('#TB08031S_invstBzscalList tr').removeClass('table-active');
		tr.addClass('table-active');

		$('#TB08031S_fndNm').val(td.eq(3).text());								// 펀드명
		$('#TB08031S_bsnmNo').val(td.eq(6).text());								// 사업자등록번호
		$('#TB08031S_bcncNm').val(td.eq(5).text());								// 거래상대방명
		$('#TB08031S_invstBzscalCorpNo').val(td.eq(4).text());					// 법인등록번호
		$('#TB08031S_indTypNm').val(td.eq(7).text());							// 업종
		$('#TB08031S_blgtCntyNm').val(td.eq(8).text());							// 소속국가명
		$('#TB08031S_bitrYm').val(td.eq(2).text());								// 기준년월
		$('#TB08031S_F009').val(td.eq(9).text());								// 펀드구분
		$('#TB08031S_F010').val(td.eq(10).text());								// 펀드유형상세
		$('#invstBzscal_datepicker1').val(td.eq(11).text());					// 취득일자
		$('#TB08031S_acqstAmt').val(td.eq(12).text());							// 취득가액
		$('#TB08031S_acbkAmt').val(td.eq(13).text());							// 장부가액
		$('#TB08031S_coAmt').val(td.eq(14).text());								// 평가금액
		$('#TB08031S_insRvn').val(td.eq(15).text());							// 순내부수익률

	}

	/* 투자기업목록 기본정보 수정 시 이벤트 */
	$("#invstEprzInfo input, select").each(function(){

		$(this).change(function(){
			if ( $("#TB08031S_invstBzscalList").find('.table-active').length === 0 ) {
				return false;
			}
			var td =  $("#TB08031S_invstBzscalList").find('.table-active').children();
			switch($(this).attr("id")) {
				// 펀드명
				case "TB08031S_fndNm" :
					$(td).eq(3).text($(this).val());
					break;
				// 사업자등록번호
				case "TB08031S_bsnmNo" :
					$(td).eq(6).text($(this).val());
					break;
				// 거래상대방명
				case "TB08031S_bcncNm" :
					$(td).eq(5).text($(this).val());
					break;
				// 법인등록번호
				case "TB08031S_invstBzscalCorpNo" :
					$(td).eq(4).text($(this).val());
					break;
				// 업종
				case "TB08031S_indTypNm" :
					$(td).eq(7).text($(this).val());
					break;
				// 소속국가명
				case "TB08031S_blgtCntyNm" :
					$(td).eq(8).text($(this).val());
					break;
				// 기준년월
				case "TB08031S_bitrYm" :
					$(td).eq(2).text($(this).val());
					break;
				// 펀드구분
				case "TB08031S_F009" :
					$(td).eq(9).text($(this).val());
					break;
				// 펀드유형상세
				case "TB08031S_F010" :
					$(td).eq(10).text($(this).val());
					break;
				// 취득일자
				case "invstBzscal_datepicker1" :
					$(td).eq(11).text($(this).val());
					break;
				// 취득가액
				case "TB08031S_acqstAmt" :
					$(td).eq(12).text($(this).val());
					break;
				// 정부가액
				case "TB08031S_acbkAmt" :
					$(td).eq(13).text($(this).val());
					break;
				// 평가금액
				case "TB08031S_coAmt" :
					$(td).eq(14).text($(this).val());
					break;
				// 수낸부수익률
				case "TB08031S_insRvn" :
					$(td).eq(15).text($(this).val());
					break;

				default :
					break;
			}

		});

	})

	/* 투자기업목록 저장 */
	function invstEprzInfoBtnSave() {
		var dealNo = $('#TB08031S_ibDealNo').val();									// 딜번호

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_invstBzscalList tr'), function() {
				var td = $(this).children();

				var stdrYm       = $(td).eq(2).text().replaceAll('-', '');           // 기준년월
				var sn           = $(td).eq(1).text();           					 // 일련번호
				var fndNm        = $(td).eq(3).text();           					 // 펀드명
				var crno         = $(td).eq(4).text().replaceAll('-', '');           // 법인등록번호
				var trOthrNm     = $(td).eq(5).text();           					 // 거래상대방명
				var bzno         = $(td).eq(6).text().replaceAll('-', '');           // 사업자등록번호
				var bztpNm       = $(td).eq(7).text();           					 // 업종명
				var ntnNm        = $(td).eq(8).text();           					 // 국가명
				var fndDcd       = $(td).eq(9).text();           					 // 펀드구분코드
				var sctsFndTpDcd = $(td).eq(10).text();          					 // 유가증권펀드유형상세코드
				var pchsDt       = $(td).eq(11).text().replaceAll('-', '');          // 매입일자
				var dealAmt      = $(td).eq(12).text().replaceAll(',', '');          // 취득가액
				var bkpr         = $(td).eq(13).text().replaceAll(',', '');          // 장부가액
				var asesBal      = $(td).eq(14).text().replaceAll(',', '');          // 평가잔액
				var intlErnRt    = $(td).eq(15).text();          					 // 순내부수익율

				var dtoParam = {
					"dealNo" : dealNo							// 딜번호
					, "stdrYm" : stdrYm							// 기준년월
					, "sn" : sn									// 일련번호
					, "fndNm" : fndNm							// 펀드명
					, "crno" : crno								// 법인등록번호
					, "trOthrNm" : trOthrNm						// 거래상대방명
					, "bzno" : bzno								// 사업자등록번호
					, "bztpNm" : bztpNm							// 업종명
					, "ntnNm" : ntnNm							// 국가명
					, "fndDcd" : fndDcd							// 펀드구분코드
					, "sctsFndTpDcd" : sctsFndTpDcd				// 유가증권펀드유형
					, "pchsDt" : pchsDt							// 매입일자
					, "dealAmt" : dealAmt						// 취득가액
					, "bkpr" : bkpr								// 장부가액
					, "asesBal" : asesBal						// 평가잔액
					, "intlErnRt" : intlErnRt					// 순내부수익율
				}

				inputArr.push(dtoParam);
			});

			var param = {
				"dealNo" : dealNo
				, "s518vo" : inputArr
			};

			$.ajax({
				type: "POST",
				url: "/TB08031S/saveInvstEprzInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "투자기업정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "투자기업정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}

	}

	// 딜 정보 저장
	function saveTabInfo() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();
		var invFnnMngmBusiDcd = $('#TB08031S_invbnkAmnBzCd').val();
		var invFnnMngnBusiDtlDcd = $('#TB08031S_I021').val();
		var hndEmpno = $('#TB08031S_tab1_empno').val();
		var busiNm = $('#TB08031S_bsnsNm').val();
		var mgcoNm = $('#TB08031S_corpNm').val();
		var invFnnMmngPrgSttsCd = $('#TB08031S_I011').val();
		var crncyCd = $('#TB08031S_I027').val();
		var totPrcrAmt = $('#TB08031S_prcrAmt').val();
		var mainBondMtncCnts = $('#TB08031S_bondProt').val();
		var ivtgShdnRsnCnts = $('#TB08031S_rvwStRsn').val();
		var thcoMdtnAmt = $('#TB08031S_thcoRlAmt').val();
		var thcoPtcpAmt = $('#TB08031S_thcoPtnAmt').val();
		var aplyIntrtCnts = $('#TB08031S_BitrKindCdInput').val();
		var chrrEmpno = $('#TB08031S_charge_empNo').val();
		var goalErnRt = $('#TB08031S_tgtRvn').val();
		var rmEmpno = $('#TB08031S_chargeRm').val();
		var busiCnts = $('#bsnsCntnt').val();
		var guasMrtgYn = $('input[name=TB08031S_rlesWarrMrtgYN]:checked').val()
		var busiLcsiCpltYn = $('input[name=TB08031S_rlesOwnPLcsiCpltYN]:checked').val()
		var landOwnrsEnsuYn = $('input[name=TB08031S_rlesLandPchsCpltYN]:checked').val()
		var fndsMngmTrgtYn = $('input[name=TB08031S_rlesFndsMngmTrgtYN]:checked').val()
		var apvlYn = $('input[name=rlesUseAppYN]:checked').val()
		var brwrSpcYn = $('input[name=rlesSpcYN]:checked').val()
		var mngmCndFlflYn = $('input[name=rlesCondComplyYN]:checked').val()
		var bondTrnsYn = $('input[name=rlesBondTrnYN]:checked').val()
		var fnnrCtrcMttrTrgtYn = $('input[name=rlesCmmntMatYN]:checked').val()
		var efceMbdyDcd = $('#TB08031S_C014').val();
		var slltStrtDt = $('#TB08031S_slltPrarYm').val();
		var bzplAddr = $('#TB08031S_busiArea').val();
		var busiSiteSqms = $('#TB08031S_busiSiteSqms').val();
		var busiTtlSqms = $('#TB08031S_Sqms').val();
		var ttlSqms = $('#TB08031S_SqmsP').val();
		var busiBldngLndrt = $('#TB08031S_far').val();
		var eprzSclDcd = $('#TB08031S_far').val();
		var fcltSclWidhCtns = $('#TB08031S_fcltScal').val();
		var resiEcoCtns = $('#TB08031S_resiEco').val();
		var crdtRifcDvcDcd = $('#TB08031S_C010').val();
		var crdtRifcDvcNm = $('#TB08031S_crdtEhcmntCntnt').val();
		var invFnnBusiWyDcd = $('#TB08031S_B013').val();
		var busiSclCntn = $('#TB08031S_bsnsScal').val();
		var busiLcsiDt = $('#TB08031S_bsnsLicYm').val();
		var cnfnDt = $('#TB08031S_cmplYm').val();
		var mngtCmpNm = $('#TB08031S_leadAgency').val();
		var cnrStrtDt = $('#TB08031S_conStYm').val();
		var cnrEndDt = $('#TB08031S_conEndYm').val();
		var oprtStrtDt = $('#TB08031S_opDurStYm').val();
		var oprtEndDt = $('#TB08031S_opDurEndYm').val();
		var bzplAddr = $('#TB08031S_bsnsLoc').val();
		var lmtYn = $('input[name=infraSeLmtYN]:checked').val()
		var invstAmt = $('#TB08031S_invstAmt').val();
		var busiRvoDcd = $('#TB08031S_B012').val();
		var slfCpta = $('#TB08031S_equity').val();
		var prorLoanAmt = $('#TB08031S_priLoan').val();
		var bkbnLoanAmt = $('#TB08031S_subLoan').val();
		var apvlYn = $('input[name=infraUseApvlYN]:checked').val()
		var brwrSpcYn = $('input[name=infraSpcYN]:checked').val()
		var mngmCndFlflYn = $('input[name=condComplyYN]:checked').val()
		var bondTrnsYn = $('input[name=infraBondTraYN]:checked').val()
		var fnnrCtrcMttrTrgtYn = $('input[name=infraCmmntMatYN]:checked').val()
		var undwHglmWyDcd = $('#TB08031S_U002').val();
		var hnvrBusiDcd = $('#TB08031S_U001').val();
		var brwrSpcYn = $('input[name=maEstateSpcYN]:checked').val()
		var spnsrCtns = $('#TB08031S_spon').val();
		var undwMrtgCtns = $('#TB08031S_mrtg').val();
		var invFnnTrgtAsstDcd = $('#TB08031S_trgtAstsCcd').val();
		var brwrNtnNm = $('#TB08031S_brwrNtnNm').val();
		var totBusiCt = $('#TB08031S_totBusiAmt').val();
		var prorRto = $('#TB08031S_prorRto').val();
		var cerkRto = $('#TB08031S_cerkRto').val();
		var bkbnRto = $('#TB08031S_bkbnRto').val();
		var lesStrtDt = $('#TB08031S_lseStrtYm').val();
		var lesEndDt = $('#TB08031S_lseEdYm').val();
		var loanStrtDt = $('#TB08031S_loanStrtDt').val();
		var loanEndDt = $('#TB08031S_loanEdYm').val();
		var dvcTyCnts = $('#TB08031S_amSt').val();
		var prdcCmpCnts = $('#TB08031S_proEprz').val();
		var mnfYr = $('#TB08031S_proYr').val();
		var invFnnLesKndDcd = $('#TB08031S_L006').val();
		var lesMgcoNm = $('#TB08031S_lseMgco').val();
		var lesUserCnts = $('#TB08031S_lseUser').val();
		var brwrSpcYn = $('input[name=realEstateSpcYN]:checked').val()
		var mngmCndFlflYn = $('input[name=realEstateCondComplyYN]:checked').val()
		var bondTrnsYn = $('input[name=realEstateBondTrnYN]:checked').val()
		var fnnrCtrcMttrTrgtYn = $('input[name=realEstateCmmntMatYN]:checked').val()
		var invstStgyCtns = $('#TB08031S_invstGuidelines').val();
		var mngmCndFlflYn = $('input[name=pefVcInvstMngYN]:checked').val()
		var bondTrnsYn = $('input[name=TB08031S_pefVcBondTrnYN]:checked').val()
		var chrgEmpno = $('#TB08031S_tab2_empNo').val();
		
		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			
			var dtoParam = {
							"dealNo": dealNo
						//, "corpRgstNo": corpRgstNo
						, "busiNm": busiNm
						, "invFnnMngmBusiDcd": invFnnMngmBusiDcd
						, "mgcoNm": mgcoNm
						, "invFnnMngnBusiDtlDcd" : invFnnMngnBusiDtlDcd
						, "invFnnMmngPrgSttsCd" : invFnnMmngPrgSttsCd
						, "crncyCd" : crncyCd
						, "totPrcrAmt" : (totPrcrAmt / 1)
						, "mainBondMtncCnts" : mainBondMtncCnts
						, "ivtgShdnRsnCnts" : ivtgShdnRsnCnts
						, "thcoMdtnAmt" : (thcoMdtnAmt / 1)
						, "thcoPtcpAmt" : (thcoPtcpAmt / 1)
						, "aplyIntrtCnts" : aplyIntrtCnts
						, "chrrEmpno" : chrrEmpno
						, "goalErnRt" : (goalErnRt / 1)
						, "rmEmpno" : rmEmpno
						, "busiCnts" : busiCnts
						, "rlesInfo" :  {
										"hndEmpno": hndEmpno
										, "guasMrtgYn" : guasMrtgYn
										, "busiLcsiCpltYn" : busiLcsiCpltYn
										, "landOwnrsEnsuYn" : landOwnrsEnsuYn
										, "fndsMngmTrgtYn" : fndsMngmTrgtYn
										, "apvlYn" : apvlYn
										, "brwrSpcYn" : brwrSpcYn
										, "mngmCndFlflYn" : mngmCndFlflYn
										, "bondTrnsYn" : bondTrnsYn
										, "fnnrCtrcMttrTrgtYn" : fnnrCtrcMttrTrgtYn
										, "efceMbdyDcd" : efceMbdyDcd
										, "slltStrtDt" : slltStrtDt.replaceAll('-', '')
										, "bzplAddr" : bzplAddr
										, "busiSiteSqms" : (busiSiteSqms / 1)
										, "busiTtlSqms" : (busiTtlSqms / 1)
										, "ttlSqms" : (ttlSqms / 1)
										, "busiBldngLndrt" : (busiBldngLndrt / 1)
										, "eprzSclDcd" : eprzSclDcd
										, "fcltSclWidhCtns" : fcltSclWidhCtns
										, "resiEcoCtns" : resiEcoCtns
										, "crdtRifcDvcDcd" : crdtRifcDvcDcd
										, "crdtRifcDvcNm" : crdtRifcDvcNm
										}
						, "infraInfo" : {
										"hndEmpno": hndEmpno
										, "invFnnBusiWyDcd": invFnnBusiWyDcd
										, "busiSclCntn": busiSclCntn
										, "busiLcsiDt": busiLcsiDt.replaceAll('-', '')
										, "cnfnDt": cnfnDt.replaceAll('-', '')
										, "mngtCmpNm": mngtCmpNm
										, "cnrStrtDt": cnrStrtDt.replaceAll('-', '')
										, "cnrEndDt": cnrEndDt.replaceAll('-', '')
										, "oprtStrtDt": oprtStrtDt.replaceAll('-', '')
										, "oprtEndDt": oprtEndDt.replaceAll('-', '')
										, "bzplAddr": bzplAddr
										, "lmtYn": lmtYn
										, "invstAmt": (invstAmt / 1)
										, "busiRvoDcd": busiRvoDcd
										, "slfCpta": (slfCpta / 1)
										, "prorLoanAmt": (prorLoanAmt / 1)
										, "bkbnLoanAmt": (bkbnLoanAmt /1)
										, "apvlYn": apvlYn
										, "brwrSpcYn": brwrSpcYn
										, "mngmCndFlflYn": mngmCndFlflYn
										, "bondTrnsYn": bondTrnsYn
										, "fnnrCtrcMttrTrgtYn": fnnrCtrcMttrTrgtYn
										}
						, "maInfo" :    {
										"hndEmpno": hndEmpno
										, "undwHglmWyDcd": undwHglmWyDcd
										, "hnvrBusiDcd": hnvrBusiDcd
										, "brwrSpcYn": brwrSpcYn
										, "spnsrCtns": spnsrCtns
										, "undwMrtgCtns": undwMrtgCtns
										}
						, "invstInfo" : {
										"hndEmpno": hndEmpno
										, "dealNo": dealNo
										, "invFnnTrgtAsstDcd": invFnnTrgtAsstDcd
										, "brwrNtnNm": brwrNtnNm
										, "totBusiCt": (totBusiCt / 1)
										, "prorRto": (prorRto / 1)
										, "cerkRto": (cerkRto / 1)
										, "bkbnRto": (bkbnRto / 1)
										, "lesStrtDt": lesStrtDt.replaceAll('-', '')
										, "lesEndDt": lesEndDt.replaceAll('-', '')
										, "loanStrtDt": loanStrtDt.replaceAll('-', '')
										, "loanEndDt": loanEndDt.replaceAll('-', '')
										, "dvcTyCnts": dvcTyCnts
										, "prdcCmpCnts": prdcCmpCnts
										, "mnfYr": mnfYr
										, "invFnnLesKndDcd": invFnnLesKndDcd
										, "lesMgcoNm": lesMgcoNm
										, "lesUserCnts": lesUserCnts
										, "brwrSpcYn": brwrSpcYn
										, "mngmCndFlflYn": mngmCndFlflYn
										, "bondTrnsYn": bondTrnsYn
										, "fnnrCtrcMttrTrgtYn": fnnrCtrcMttrTrgtYn
										}
						, "pefInfo" :   {
										"hndEmpno": hndEmpno
										, "chrgEmpno": chrgEmpno
										, "invstStgyCtns": invstStgyCtns
										, "mngmCndFlflYn": mngmCndFlflYn
										, "bondTrnsYn": bondTrnsYn
										}
						};
						
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveDealInfo",
				data: JSON.stringify(dtoParam),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "문서정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
			
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "사업정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 사업참가자정보 저장
	function bsnsPartInfoBtnSave() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();					// 딜번호
		var ptcnRelrDcd = $('#TB08031S_P001').val();				// 참가자관계 
		var entpNm = $('#TB08031S_partCorpNm').val();				// 업체명
		var crno = $('#TB08031S_dtlsCorpNo').val(); 				// 법인등록번호
		var bzno = $('#TB08031S_bsnsRgstNo').val();					// 사업자등록번호
		var rpsrNm = $('#TB08031S_rprstPNm').val();					// 대표자명

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_bsnsPartInfo tr'), function() {
				var td = $(this).children();
				
				var dtoParam = {
				"ptcnRelrDcd": td.eq(2).text()
				, "dealNo": $('#TB08031S_ibDealNo').val()
				, "entpNm": td.eq(4).text()
				, "crno": td.eq(6).text().replaceAll('-', '')
				, "bzno": td.eq(7).text().replaceAll('-', '')
				, "rpsrNm": td.eq(5).text()
				}
				
				inputArr.push(dtoParam);						
			});
			
			var param = {
				"dealNo": dealNo
				, "s511vo": inputArr
			}
			
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveBsnsPartInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "사업참가자정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
			
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "사업참가자정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 사업주요전망 저장
	function bsnsForecastBtnSave() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();							// 딜번호
		var prarDt = $('#TB08031S_exptDt').val();							// 예정일자
		var flflDt = $('#TB08031S_pfrmDt').val();							// 이행일자
		var flflYn = $('input[name=pfrmYN]:checked').val(); 				// 이행여부
		var mainScxCtns = $('#TB08031S_mainCntnt').val();					// 주요일정내용

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_bsnsForecast tr'), function() {
				var td = $(this).children();
				
				var dtoParam = {
				"prarDt": td.eq(2).text().replaceAll('-', '')
				, "flflDt": td.eq(3).text().replaceAll('-', '')
				, "flflYn": td.eq(4).text()
				, "mainScxCtns": td.eq(5).text()
				, "dealNo": $('#TB08031S_ibDealNo').val()
				}
				
				inputArr.push(dtoParam);						
			});
			
			var param = {
				"dealNo": dealNo
			, "s514vo": inputArr
			};	
				
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveBsnsForecast",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "사업참가자정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
			
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "사업참가자정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 채권보전주요약정 저장
	function bondProtInfoBtnSave() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();										// 딜번호
		var bondProtCcd = $('#TB08031S_B007').val();									// 채권보전구분
		var fnnrCtrcMttrTrgtYn = $('input[name=TB08031S_bondPfrmYN]:checked').val(); 	// 이행여부
		var mainCtrcMttrCnts = $('#TB08031S_mainCntnt').val();							// 상세내용

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_bondProtInfo tr'), function() {
				var td = $(this).children();
				
				var dtoParam = {
				"bondProtCcd": td.eq(2).text()
				, "fnnrCtrcMttrTrgtYn": td.eq(4).text()
				, "mainCtrcMttrCnts": td.eq(5).text()
				, "dealNo": $('#TB08031S_ibDealNo').val()
				}
				
				inputArr.push(dtoParam);						
			});
			
			var param = {
				"dealNo": dealNo
			, "s509vo": inputArr
			};	
				
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveBondProtInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "채권보전주요약정을 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "채권보전주요약정을 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 조건변경이력 저장
	function cchInfoBtnSave() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();										// 딜번호
		var apvlDt = $('#TB08031S_rcgDt').val();										// 승인일자
		var cndChngDcmNoCnts = $('#TB08031S_rcgDocNo').val();							// 승인문서번호
		var cndChngMainCnts = $('#TB08031S_cndtMainCntnt').val();						// 주요내용
		var prcsrEmpno = $('#TB08031S_cch_empNo').val();								// 취급자
		var prcsrTelNo = $('#TB08031S_handlerID').val();								// 취급자개인번호
		var crotDt = $('#TB08031S_cmplDt').val();										// 시행일자

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_cchInfo tr'), function() {
				var td = $(this).children();
				
				var dtoParam = {
				"apvlDt": td.eq(2).text().replaceAll('-', '')
				, "cndChngDcmNoCnts": td.eq(3).text()
				, "cndChngMainCnts": td.eq(4).text()
				, "prcsrEmpno": td.eq(5).text()           
				, "prcsrTelNo": td.eq(7).text()
				, "crotDt": td.eq(8).text().replaceAll('-', '')
				, "dealNo": $('#TB08031S_ibDealNo').val()
				}
				inputArr.push(dtoParam);						
			});
			
			var param = {
				"dealNo": dealNo
			, "s510vo": inputArr
			};	
				
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveCchInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "조건변경이력을 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "조건변경이력을 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 대주단정보 저장
	function stlnInfoBtnSave() {
		
		var dealNo = $('#TB08031S_ibDealNo').val();									// 딜번호
		var ibStlnDcd = $('#TB08031S_R021_1').val();								// 구분
		var entpNm = $('#TB08031S_mCorpNm').val();									// 기관명
		var crdtProvLmtAmt = $('#TB08031S_mAgrAmt').val();							// 약정금액
		var prtcRto = $('#TB08031S_mPartRt').val();									// 참가비율

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
				Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}
		
		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_stlnInfo tr'), function() {
				var td = $(this).children();
				
				var dtoParam = {
				"ibStlnDcd": td.eq(2).text()
				, "entpNm": td.eq(4).text()
				, "crdtProvLmtAmt": td.eq(5).text().replaceAll(',', '')
				, "prtcRto": td.eq(6).text()
				, "dealNo": $('#TB08031S_ibDealNo').val()
				}
				
				inputArr.push(dtoParam);						
			});
			
			var param = {
				"dealNo": dealNo
			, "s513vo": inputArr
			};	
			
			$.ajax({
				type: "POST",
				url: "/TB08031S/saveStlnInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "대주단정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "대주단정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 수악자정보 저장
	function ernInfoBtnSave() {

		var dealNo = $('#TB08031S_ibDealNo').val();									// 딜번호

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_ernInfo tr'), function() {
				var td = $(this).children();

				var dtoParam = {
					"ibStlnDcd": td.eq(1).text()
					, "entpNm": td.eq(3).text()
					, "crdtProvLmtAmt": td.eq(4).text().replaceAll(',', '')
					, "prtcRto": td.eq(5).text()
					, "dealNo": $('#TB08031S_ibDealNo').val()
				}

				inputArr.push(dtoParam);
			});

			var param = {
				"dealNo": dealNo
				, "s513vo": inputArr
			};

			$.ajax({
				type: "POST",
				url: "/TB08031S/saveErnInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "수익자정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "수익자정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}

	}

	// 관련사업정보 저장
	function reltBusiInfoBtnSave() {

		var dealNo = $('#TB08031S_ibDealNo').val();							// 딜번호

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_busiInfo tr'), function() {
				var td = $(this).children();

				var dtoParam = {
						"dealNo" : dealNo
					,         "sn" : td.eq(1).text()
					, "reltDealNo" : td.eq(2).text()
				}

				inputArr.push(dtoParam);
			});

			var paramData = {
					"dealNo" : dealNo
				,   "s508vo" : inputArr
			};



			$.ajax({
				type: "POST",
				url: "/TB08031S/saveReltBusiInfo",
				data: JSON.stringify(paramData),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "사업참가자정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},

				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "사업참가자정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}
	}

	// 관련사업정보 가져오기
	function getReltDealInfo(dealNo) {

		var paramData = {
			'dealNo' : dealNo
			,    'sn' : ''
		};
		// 비동기통신 요청
		$.ajax({
			type: "GET",
			url: "/TB03020S/getBscDealDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {
				console.log(JSON.stringify(data));
				var sn = isEmpty($('#TB08031S_busiInfo tr').last().children().eq(1).text())?1:(Number($('#TB08031S_busiInfo tr').last().children().eq(1).text())+1);

				var html = '';
				html += '<tr ondblclick="">';
				html += '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
				html += '    <td class="text-center">' + sn + '</td>';                          	 			// NO
				html += '    <td class="text-left">' + data.dealNo + '</td>';                        			// 사업관리번호
				html += '    <td class="text-left">' + data.dealNm + '</td>';               		 			// 사업명
				html += '    <td class="text-right">' + addComma(handleNullData(data.allInvAmt)) + '</td>';     // 총조달금액
				html += '    <td class="text-center">' + 'Y' + '</td>';            				 	 			// 당사주선여부
				html += '    <td class="text-right">' + addComma(handleNullData(data.thcoPtciAmt)) + '</td>';   // 당사참여금액
				html += '</tr>';

				$('#TB08031S_busiInfo').append(html);

			},
			error: function() {

			}
		});
	}

	/* 관련사업정보 행삭제 */
	function delMenuRowReltDealInfo() {
		var rowNum = 1;

		$('#TB08031S_busiInfo tr').each(function() {

			var checkYn = $(this).find('td:eq(0)').find('input').is(':checked');

			if (checkYn) {
				$(this).remove();
			} else {
				// 순번 재배치
				$(this).find('td:eq(1)').text(rowNum);
				rowNum++;
			}

		});
	}

	// 편입자산정보 저장
	function admsAsstInfoBtnSave() {

		var dealNo = $('#TB08031S_ibDealNo').val();									// 딜번호

		if (!isEmpty(dealNo)) {
			businessFunction();
		} else {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "Deal번호를 조회해주세요."
				, confirmButtonText: "확인"
			});
		}

		function businessFunction() {
			var inputArr = [];
			$.each($('#TB08031S_admsAsstInfo tr'), function() {
				var td = $(this).children();

				var dtoParam = {
					"ibInvTpCd" 	   	   : td.eq(1).text()								// 투자금융투자유형코드
					, "admsAsstAcbkAcqAmt" : (td.eq(3).text().replaceAll(',', '') / 1)		// 편입자산장부취득금액
					, "admsAsstGrntErnRt"  : (td.eq(4).text().replaceAll(',', '') / 1)		// 편입자산보장수익율
					, "admsAsstItmNm" 	   : td.eq(5).text()								// 편입자산종목명
					, "dealNo" 		       : $('#TB08031S_ibDealNo').val()					// 딜번호
				}

				inputArr.push(dtoParam);
			});

			var param = {
				"dealNo" : dealNo
				, "s512vo" : inputArr
			};

			$.ajax({
				type: "POST",
				url: "/TB08031S/saveAdmsAsstInfo",
				data: JSON.stringify(param),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "수익자정보를 저장하였습니다."
						, confirmButtonText: "확인"
					})
				},
				error: function() {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "수익자정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});
		}

	}

	return {
		srchBsnsInfo : srchBsnsInfo
		, setBsnsPartInfoGrid : setBsnsPartInfoGrid
		, addMenuRowBsnsPartInfo : addMenuRowBsnsPartInfo
		, delMenuRowBsnsPartInfo : delMenuRowBsnsPartInfo
		, bsnsPartInfoBtnSave : bsnsPartInfoBtnSave
		, addMenuRowBsnsForecast : addMenuRowBsnsForecast
		, delMenuRowBsnsForecast : delMenuRowBsnsForecast
		, bsnsForecastBtnSave : bsnsForecastBtnSave
		, addMenuRowBondProtInfo : addMenuRowBondProtInfo
		, delMenuRowBondProtInfo : delMenuRowBondProtInfo
		, bondProtInfoBtnSave : bondProtInfoBtnSave
		, addMenuRowCchInfo : addMenuRowCchInfo
		, delMenuRowCchInfo : delMenuRowCchInfo
		, cchInfoBtnSave : cchInfoBtnSave
		, addMenuRowStlnInfo : addMenuRowStlnInfo
		, delMenuRowStlnInfo : delMenuRowStlnInfo
		, stlnInfoBtnSave : stlnInfoBtnSave
		, addMenuRowErnInfo : addMenuRowErnInfo
		, delMenuRowErnInfo : delMenuRowErnInfo
		, delMenuRowReltDealInfo : delMenuRowReltDealInfo
		, reltBusiInfoBtnSave : reltBusiInfoBtnSave
		, addMenuRowInvstEprzInfo : addMenuRowInvstEprzInfo
		, delMenuRowInvstEprzInfo : delMenuRowInvstEprzInfo
		, addMenuRowAdmsAsstInfo : addMenuRowAdmsAsstInfo
		, delMenuRowAdmsAsstInfo : delMenuRowAdmsAsstInfo
		, admsAsstInfoBtnSave : admsAsstInfoBtnSave
		, saveTabInfo : saveTabInfo
        , ernInfoBtnSave : ernInfoBtnSave
		, getReltDealInfo : getReltDealInfo
	}
})();