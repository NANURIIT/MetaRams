$(document).ready(function() {
	
	//setKeyFunction_AS03210S();
	
	//loadRaDealCcd();
	loadTabContents();
	
	//checkErmAmt();
	//checkNumber();
	
	// url 정보 세팅은 마지막에 하도록 한다.
	getUrlDealInfo();

});  

// URL 히든 Deal번호
function getUrlDealInfo() {
	
	var urlParam = window.location.search;
	var urlParams = new URLSearchParams(urlParam);

	var ibDealNo = urlParams.get('ibDealNo');
	

	if (!isEmpty(ibDealNo)) {
		$('#PM02010S_ibDealNo').val(ibDealNo);
		$('#PM02010S_selectedDealNo').val(ibDealNo);
		getEamList();

		setTab1(ibDealNo);
		setTab2(ibDealNo);
		setTab3(ibDealNo);
		setTab4(ibDealNo);
		setTab5(ibDealNo);
		
	}
	
	
}


// 탭 페이지 항목 로드
function loadTabContents() {
	loadTab1();
	loadTab2();
	loadTab3();
	//loadTab4();
}

//////////////////////////////////////////////////////////

// 부실자산 사후관리 조회
function getEamList() {

	let ibDealNo = $('#PM22010S_ibDealNo').val();
	
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
			url: "/PM22010S/getEamList",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				var html = '';
				var dealList = data;
				$('#PM22010S_ibDealList').html(html);


				if (dealList.length > 0){
					$.each(dealList, function(key, value){
						if( value.cnctOption == 'N'){
							html += '<tr ondblclick="setTabContents(this)">';
						}else{
							html += '<tr style="color:red" ondblclick="setTabContents(this)">';
						}
						html += '<td>' + value.ibDealNo + '</td>';								// deal번호 		- IBDEAL번호
						html += '<td style="display:none">' + value.riskInspctCcd + '</td>';	// 				- 리스크심사구분코드				
						html += '<td>' + value.riskInspctCcdNm + '</td>';						// 신규/재부의정보 - 리스크심사구분코드명
						html += '<td style="display:none">' + value.lstCCaseCcd + '</td>';		// 				- 부수안건구분코드
						html += '<td>' + value.lstCCaseCcdNm + '</td>';							// 부수안건정보 	- 부수안건구분코드명
						html += '<td style="display:none">' + value.dprtCd + '</td>';			// 				- 부서코드
						html += '<td>' + value.dprtCdNm + '</td>';								// 담당부서 		- 부서명
						html += '<td style="display:none">' + value.chrgpEno + '</td>';			// 				- 담당자사번
						html += '<td>' + value.empNm + '</td>';									// 심사역 		- 직원명
						html += '<td style="display:none">' + value.inspctPrgrsStCd + '</td>';	// 				- 심사진행상태코드
						html += '<td>' + value.inspctPrgrsStCdNm + '</td>';						// 진행상태 		- 심사진행상태코드명
						html += '<td>' + value.ibDealNm + '</td>';								// 안건명		- IBEAL명
						html += '<td style="display:none">' + value.cnctOption + '</td>';		// 				- 연결안건여부
						html += '</tr>'
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#PM22010S_ibDealList').html(html);
				
				if(dealList.length != 0) {
					$('#aftrActive tbody tr:first').addClass('table-active');
					$('#aftrActive tbody tr:first').dblclick();
				} else {
					var html = "";
					$('#PM22010S_eamDetail').html(html);
					$('#Estt_List').html(html);
					$('#Lgl_List').html(html);
					$('#Efct_List').html(html);
					$('#Cnct_List').html(html);
					tab5CnctReset();
				}
			},
			
		});
	}
	
}

// 화면에서 deal Info 검색 후 더블클릭 set
function setTabContents(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();			// ibDeal번호
	var riskInspctCcd = td.eq(1).text(); 	// 리스크심사구분코드
	var lstCCaseCcd = td.eq(3).text();	 	// 부수안건구분코드

	var cnctOption = td.eq(12).text();
	
	$(tr).addClass('table-active');

	// 안건연결 sq 초기화
	$('#hidden_tab5_sq').val('0');
	
	$('#hidden_dealNo').val(ibDealNo);
	$('#hidden_riskInspctCcd').val(riskInspctCcd);
	$('#hidden_lstCCaseCcd').val(lstCCaseCcd);
	
	$('#aftrActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#aftrActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});

	if( cnctOption == 'Y'){
		$('#tab5ResetBtn').attr('disabled', true);
		$('#tab5SaveBtn').attr('disabled', true);
		$('#tab5DeleteBtn').attr('disabled', true);
	}else{
		$('#tab5ResetBtn').attr('disabled', false);
		$('#tab5SaveBtn').attr('disabled', false);
		$('#tab5DeleteBtn').attr('disabled', false);
	}
	
	getEamDetail();
	getEsttDetail();
	getLglDetail();
	getEfctDetail();
	getCnctList();
	
}


//----------------------------TAB1 관리이력----------------------------

// 탭1 관리이력
function loadTab1() {
	loadBscAstsKndCd();
	
}


// 사후관리 관리이력 구분 코드
function loadBscAstsKndCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/F002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#PM22010S_evntAftrMngCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#PM22010S_evntAftrMngCcd').html(html);
		}
	});
};


// 부실자산 사후관리 - 관리이력 탭 설정
function setTab1(ibDealNo) {
	getEamDetail(ibDealNo);
}

// 부실자산 사후관리 - 관리이력 조회
function getEamDetail(){
	
	var ibDealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
	var riskInspctCcd = $('#hidden_riskInspctCcd').val(); 	// 리스크구분심사코드
	var lstCCaseCcd  = $('#hidden_lstCCaseCcd').val(); 		// 부수안건구분코드

	var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
		};
		

		$.ajax({
			type: "GET",
			url: "/PM22010S/getEamDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var html = '';
				var eamList = data;
				$('#PM22010S_eamDetail').html(html);


				if (eamList.length > 0){
					$.each(eamList, function(key, value){
						
						html += '<tr onclick="setEamInfoDetail(this)">';
						html += '<td>' + value.rgstDt + '</td>';									// 등록일자				
						html += '<td style="display:none">' + value.evntAftrMngCcd + '</td>';		// 사후관리구분코드
						html += '<td>' + value.evntAftrMngCcdNm + '</td>';							// 사후관리구분코드명
						html += '<td>' + value.evntAftrMngCntnt + '</td>';							// 사후관리내용
						html += '<td>' + value.fstRgstPenoNm + '</td>';								// 최초등록자사번
						html += '<td style="display:none;">' + value.sq + '</td>';					// 일련번호				
						html += '</tr>';
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#PM22010S_eamDetail').html(html);
			},
		});
}

// 더블 클릭 후 관리이력 정보 취득
function setEamInfoDetail(e){
	var tr = $(e);
	
	var td = $(tr).children();
	
	var evntAftrMngCcd = td.eq(1).text();										//사후관리구분코드
	var evntAftrMngCntnt = td.eq(3).text();										//사후관리내용
	
	var sq = td.eq(5).text();

	$('#PM22010S_evntAftrMngCcd').val(evntAftrMngCcd).prop('selected', true);	//사후관리구분코드
	$('#PM22010S_evntAftrMngCntnt').val(evntAftrMngCntnt);						//사후관리내용
	$('#hidden_tab1_sq').val(sq);												//일련번호
	
	$(tr).addClass('table-active');
	
	$('#eamActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#eamActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
	
	var ibDealNo = $('#hidden_dealNo').val();
	
	$('#fileIbDealNo').val(ibDealNo);
	$('#fileRiskInspctCcd').val(riskInspctCcd);
	$('#fileLstCCaseCcd').val(lstCCaseCcd);
	
	
	
	
	var dtoParam = {
		"ibDealNo":ibDealNo
		, "fileIbDealNo":ibDealNo
		, "fileRiskInspctCcd": riskInspctCcd
		, "fileLstCCaseCcd": lstCCaseCcd
	}
	

	fileInfo(dtoParam);

}


// 부실자산 사후관리 - 관리이력 초기화
function tab1BtnReset() {
	$("#PM22010S_evntAftrMngCcd option:eq(0)").prop("selected", true)
	$('#PM22010S_evntAftrMngCntnt').val('');
	$('#hidden_tab1_sq').val('0');
	
	$('#eamActive tbody tr').removeClass('table-active');// 테이블 active 초기화
	
}

// 부실자산 사후관리 - 관리이력 저장
function tab1BtnSave() {
	var ibDealNo = $('#PM22010S_ibDealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab1_sq').val();
	
	var evntAftrMngCcd = $('#PM22010S_evntAftrMngCcd').val();
	var evntAftrMngCntnt = $('#PM22010S_evntAftrMngCntnt').val();
	
		
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(evntAftrMngCntnt)){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관리내용을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	}
	
	function businessFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "sq": sq
			, "evntAftrMngCcd": evntAftrMngCcd
		   	, "evntAftrMngCntnt": evntAftrMngCntnt
		};
		$.ajax({
			type: "POST",
			url: "/PM22010S/registEamInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "관리이력을 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getEamDetail(ibDealNo);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "관리이력을 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// 부실자산 사후관리 - 관리이력 삭제
function tab1BtnDelete(){
	var ibDealNo = $('#PM22010S_ibDealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab1_sq').val();
	
	
	if (!isEmpty(ibDealNo)) {
		if(sq != 0){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "사후관리 이력을 선택해주세요."
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
			,"sq": sq
		}
		
		$.ajax({
			type: "POST",
			url: "/PM22010S/deleteEamInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "사후관리이력을 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEamDetail(ibDealNo);
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "사후관리이력을 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}

// 관리이력 - 파일정보
function fileInfo(dtoParam) {
	
	$.ajax({
		type: "GET",
		url: "/PM22010S/getFiles",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
						
			if (data.length > 0) {
				callbackFile('select', data);
			}
		}
	});
}

/**
 * 파일ajax 성공시 custom callback 함수
 */
function callbackFile(action, result) {
	var html = '';
	if (action == 'upload') {
		html = makeFilList(html, result);
		$('#PM22010_FileList').append(html);
	} //else {
	  if (action == 'delete' || action == 'select') {
		for (let i = 0; i < result.length; i++) {
			let fileInfo = result[i];
			html += makeFilList(html, fileInfo);
		}
		$('#PM22010_FileList').empty();
		$('#PM22010_FileList').append(html);
	}
}

/**
 * 파일목록 Table 생성
 */
function makeFilList(html, result){
	
	var encUri = downloadURI(result.svFilePathNm, result.svFileNm, result.realAttFileNm);
	html += '<tr>';
	html += '    <td><input type="checkbox" id="' +result.attFileSq + '">';
	html += '    </td>';
	html += '    <td><a href="' + encUri + '">' + result.realAttFileNm + '</a></td>';
	html += '    <td>' + result.rgstDt + '</td>';
	html += '</tr>';
	
	return html;
}

//----------------------------TAB2 재산조사----------------------------

// tab2 코드 세팅
function loadTab2(){
	loadInvtTrgtCcd();
	loadEsttKndCd();
}

// tab2 조사대상 구분 코드
function loadInvtTrgtCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/P003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#Invt_Trgt_Ccd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#Invt_Trgt_Ccd').html(html);
		}
	});
};

// tab2 재산종류 구분 코드
function loadEsttKndCd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/P004",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#Estt_Knd_Cd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#Estt_Knd_Cd').html(html);
		}
	});
};

// tab2 재산조사 조회
function getEsttDetail(){
	
	var ibDealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
	var riskInspctCcd = $('#hidden_riskInspctCcd').val(); 	// 리스크구분심사코드
	var lstCCaseCcd  = $('#hidden_lstCCaseCcd').val(); 		// 부수안건구분코드

	var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
		};
		

		$.ajax({
			type: "GET",
			url: "/PM22010S/getEsttDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var html = '';
				var esttList = data;
				$('#Estt_List').html(html);


				if (esttList.length > 0){
					$.each(esttList, function(key, value){
						
						html += '<tr onclick="setEsttDetail(this)">';
						html += '<td>' + value.rgstDt + '</td>';									// 등록일자				
						html += '<td style="display:none">' + value.esttExmntnTrgtCcd + '</td>';	// 조사대상코드
						html += '<td>' + value.esttExmntnTrgtCcdNm + '</td>';						// 조사대상
						html += '<td style="display:none">' + value.esttKndCcd + '</td>';			// 재산종류코드
						html += '<td>' + value.esttKndCcdNm + '</td>';								// 재산종류
						html += '<td>' + value.esttExmntnCntnt + '</td>';							// 세부정보
						html += '<td>' + value.realPrftF + '</td>';									// 실익여부
						html += '<td>' + value.fstRgstPEnoNm + '</td>';								// 등록직원
						html += '<td style="display:none;">' + value.sq + '</td>';					// 일련번호				
						html += '</tr>';
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#Estt_List').html(html);
			},
		});
}

// 더블 클릭 후 관리이력 정보 취득
function setEsttDetail(e){
	var tr = $(e);
	
	var td = $(tr).children();
	
	var esttExmntnTrgtCcd = td.eq(1).text();							//조사대상코드
	var esttKndCcd = td.eq(3).text();									//재산종류코드
	var realPrftF = td.eq(6).text();									//실익여부
	var esttExmntnCntnt = td.eq(5).text();								//세부정보
	var sq = td.eq(8).text();											//일련번호
	
	$(tr).addClass('table-active');

	$('#Invt_Trgt_Ccd').val(esttExmntnTrgtCcd).prop('selected', true);	//조사대상코드
	$('#Estt_Knd_Cd').val(esttKndCcd).prop('selected', true);			//재산종류코드
	$('#Real_Prft_F').val(realPrftF).prop('selected', true);;			//실익여부
	$('#Estt_Exm_Cntnt').val(esttExmntnCntnt);							//세부정보
	$('#hidden_tab2_sq').val(sq);										//일련번호
	
	$('#esttActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#esttActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}

// tab2 재산조사 저장
function tab2EsttSave() {
	var ibDealNo = $('#hidden_dealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab2_sq').val();
	
	var esttExmntnTrgtCcd = $('#Invt_Trgt_Ccd').val();
	var esttKndCcd = $('#Estt_Knd_Cd').val();
	var realPrftF = $('#Real_Prft_F').val();
	var esttExmntnCntnt = $('#Estt_Exm_Cntnt').val();
		
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(esttExmntnCntnt)){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "관리내용을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	}
	
	function businessFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "sq": sq
			, "esttExmntnTrgtCcd": esttExmntnTrgtCcd
		   	, "esttKndCcd": esttKndCcd
			, "realPrftF": realPrftF
		   	, "esttExmntnCntnt": esttExmntnCntnt
		};
		

		$.ajax({
			type: "POST",
			url: "/PM22010S/registEsttInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "재산조사를 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getEsttDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "재산조사를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
		
	}
}

// tab2 재산조사 초기화
function tab2EsttReset() {
	$("#Invt_Trgt_Ccd option:eq(0)").prop("selected", true);		// 조사대상
	$('#Estt_Knd_Cd option:eq(0)').prop("selected", true);			// 재산종류
	$('#Real_Prft_F option:eq(0)').prop("selected", true);			// 실익여부
	$('#Estt_Exm_Cntnt').val('');									// 관리내용
	$('#hidden_tab2_sq').val('0');									// 일련번호 초기화
	
	$('#esttActive tbody tr').removeClass('table-active');			// 테이블 active 초기화
}

// tab2 재산조사 삭제
function tab2EsttDelete() {
	
	var ibDealNo = $('#PM22010S_ibDealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab2_sq').val();
	
	
	if (!isEmpty(ibDealNo)) {
		if(sq != 0){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "재산조사를 선택해주세요."
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
			,"sq": sq
		}
		
		$.ajax({
			type: "POST",
			url: "/PM22010S/deleteEsttInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "재산조사내역을 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEsttDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "재산조사내역을 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}

//----------------------------TAB3 법적조치----------------------------

// TAB3 코드 세팅
function loadTab3(){
	loadLglCcd();
	loadLglPrcsKndCcd()
	
}


// TAB2 재산조사구분코드 == TAB3 법적절차구분코드
function loadLglCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/P003",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#Lgl_Ccd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#Lgl_Ccd').html(html);
		}
	});
};

// TAB3 법적절차종류구분코드
function loadLglPrcsKndCcd() {
	$.ajax({
		type: "GET",
		url: "/getSelectBoxCode/L002",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#LgL_Knd_Ccd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#LgL_Knd_Ccd').html(html);
		}
	});
};

// TAB3 법적절차 조회
function getLglDetail(){
	
	var ibDealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
	var riskInspctCcd = $('#hidden_riskInspctCcd').val(); 	// 리스크구분심사코드
	var lstCCaseCcd  = $('#hidden_lstCCaseCcd').val(); 		// 부수안건구분코드

	var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
		};
		

		$.ajax({
			type: "GET",
			url: "/PM22010S/getLglDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var html = '';
				var lglList = data;
				$('#Lgl_List').html(html);


				if (lglList.length > 0){
					$.each(lglList, function(key, value){
						html += '<tr onclick="setLglDetail(this)">';
						html += '<td>' + value.rgstDt + '</td>';								// 등록일자				
						html += '<td style="display:none">' + value.lglPrcrCcd + '</td>';		// 법적대상
						html += '<td>' + value.lglPrcrCcdNm + '</td>';							// 법적대상명
						html += '<td style="display:none">' + value.lglPrcrKndCcd + '</td>';	// 법적종류
						html += '<td>' + value.lglPrcrKndCcdNm + '</td>';						// 법적종류명
						html += '<td>' + value.lglPrcrCntnt + '</td>';							// 세부정보
						html += '<td>' + value.crtrmInfo + '</td>';								// 법원정보
						html += '<td>' + value.acdntNo + '</td>';								// 사건번호
						html += '<td>' + value.fstRgstPEnoNm + '</td>';							// 사건번호
						html += '<td style="display:none;">' + value.sq + '</td>';				// 일련번호				
						html += '</tr>';
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#Lgl_List').html(html);
			},
		});
}

// 더블 클릭 후 법적절차 정보 취득
function setLglDetail(e){
	var tr = $(e);
	
	var td = $(tr).children();
	
	var lglPrcrCcd = td.eq(1).text();									//법적대상
	var lglPrcrKndCcd = td.eq(3).text();								//법적종류
	var lglPrcrCntnt = td.eq(5).text();									//법적내용
	var crtrmInfo = td.eq(6).text();									//법원정보 
	var acdntNo = td.eq(7).text();										//사건번호
	var sq = td.eq(9).text();											//일련번호
	
	$(tr).addClass('table-active');

	$('#Lgl_Ccd').val(lglPrcrCcd).prop('selected', true);				//법적대상
	$('#LgL_Knd_Ccd').val(lglPrcrKndCcd).prop('selected', true);		//법적종류
	$('#Crtrm_Info').val(crtrmInfo);									//법원정보
	$('#Acdnt_No').val(acdntNo);										//사건번호
	$('#Lgl_Cnt').val(lglPrcrCntnt);									//법적내용
	$('#hidden_tab3_sq').val(sq);										//일련번호
	
	$('#lglActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#lglActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});

}


// TAB3 법적절차 초기화
function tab3LglReset() {
	$("#Lgl_Ccd option:eq(0)").prop("selected", true);					// 법적대상
	$('#LgL_Knd_Ccd option:eq(0)').prop("selected", true);				// 법적종류
	$('#Crtrm_Info').val('');											// 법원정보
	$('#Acdnt_No').val('');												// 사건번호
	$('#Lgl_Cnt').val('');												// 법적내용
	$('#hidden_tab3_sq').val('0');										// 일련번호 초기화
	
	$('#lglActive tbody tr').removeClass('table-active');// 테이블 active 초기화
}

// TAB3 법적절차 저장
function tab3LglSave() {
	var ibDealNo = $('#hidden_dealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab3_sq').val();
	
	var lglPrcrCcd = $('#Lgl_Ccd').val();								//법적대상
	var lglPrcrKndCcd = $('#LgL_Knd_Ccd').val();						//법적종류
	var lglPrcrCntnt = $('#Lgl_Cnt').val();								//법적내용
	var crtrmInfo = $('#Crtrm_Info').val();								//법원정보
	var acdntNo = $('#Acdnt_No').val();									//사건번호
		
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(lglPrcrCntnt)){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "법적내용을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	}
	
	function businessFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "sq": sq
			
			, "lglPrcrCcd": lglPrcrCcd
		   	, "lglPrcrKndCcd": lglPrcrKndCcd
			, "lglPrcrCntnt": lglPrcrCntnt
		   	, "crtrmInfo": crtrmInfo
		   	, "acdntNo": acdntNo
		};
		

		$.ajax({
			type: "POST",
			url: "/PM22010S/registLglInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "법적절차를 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getLglDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "법적절차를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
		
	}
}

// TAB3 법적절차 삭제
function tab3LglDelete() {
	
	var ibDealNo = $('#PM22010S_ibDealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab3_sq').val();
	
	
	if (!isEmpty(ibDealNo)) {
		if(sq != 0){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "법적절차를 선택해주세요."
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
			,"sq": sq
		}
		
		$.ajax({
			type: "POST",
			url: "/PM22010S/deleteLglInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "법적절차내역을 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getLglDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "법적절차내역을 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}


//----------------------------TAB4 시효관리----------------------------


// TAB4 코드 세팅

// TAB4 시효관리 조회
function getEfctDetail(){
	
	var ibDealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
	var riskInspctCcd = $('#hidden_riskInspctCcd').val(); 	// 리스크구분심사코드
	var lstCCaseCcd  = $('#hidden_lstCCaseCcd').val(); 		// 부수안건구분코드

	var paramData = {
			"ibDealNo": ibDealNo
			,"riskInspctCcd": riskInspctCcd
			,"lstCCaseCcd": lstCCaseCcd
		};
		

		$.ajax({
			type: "GET",
			url: "/PM22010S/getEfctDetail",
			data: paramData,
			dataType: "json",
			success: function(data) {
				var html = '';
				var efctList = data;
				$('#Efct_List').html(html);


				if (efctList.length > 0){
					$.each(efctList, function(key, value){
						
						html += '<tr onclick="setEfctDetail(this)">';
						html += '<td>' + value.rgstDt + '</td>';								// 등록일자				
						html += '<td>' + value.efctOcrncDt + '</td>';							// 시효기산일
						html += '<td>' + value.efctEndDt + '</td>';								// 시효만료일
						html += '<td>' + value.efctMngCntnt + '</td>';							// 세부정보
						html += '<td>' + value.fstRgstPEnoNm + '</td>';							// 등록직원
						html += '<td style="display:none;">' + value.sq + '</td>';				// 일련번호				
						html += '</tr>';
						
					})
				}else {
					html += '<tr>';
					html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				$('#Efct_List').html(html);
			},
		});
}

// 더블 클릭 후 법적절차 정보 취득
function setEfctDetail(e){
	var tr = $(e);
	
	var td = $(tr).children();
	
	var efctOcrncDt = td.eq(1).text();									//시효기산일
	var efctEndDt = td.eq(2).text();									//시효만료일
	var efctMngCntnt = td.eq(3).text();									//세부정보
	var sq = td.eq(5).text();											//일련번호
	
	$(tr).addClass('table-active');
	
	$('#Efct_Dp_Strt').val(efctOcrncDt)									//시효기산일
	$('#Efct_Dp_End').val(efctEndDt)									//시효만료일
	$('#Efct_Cnt').val(efctMngCntnt);									//세부정보
	$('#hidden_tab4_sq').val(sq);										//일련번호
	
	$('#efctActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#efctActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}


// TAB4 시효관리 초기화
function tab4EfctReset() {
	$("#Efct_Dp_Strt").val('');											// 시효기산일
	$('#Efct_Dp_End').val('');											// 시효만료일
	$('#Efct_Cnt').val('');												// 세부정보
	$('#hidden_tab4_sq').val('0');										// 일련번호 초기화
	
	$('#efctActive tbody tr').removeClass('table-active');				// 테이블 active 초기화
}

// TAB4 시효관리 저장
function tab4EfctSave() {
	var ibDealNo = $('#hidden_dealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab4_sq').val();
	
	var efctOcrncDt = $('#Efct_Dp_Strt').val();							//시효기산일
	var efctEndDt = $('#Efct_Dp_End').val();							//시효만료일
	var efctMngCntnt = $('#Efct_Cnt').val();							//세부정보
		
		
	// 유효성 체크	
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(efctMngCntnt)){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "시효관리내용을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	}
	
	function businessFunction() {
		var dtoParam = {
			"ibDealNo": ibDealNo
			, "riskInspctCcd": riskInspctCcd
			, "lstCCaseCcd": lstCCaseCcd
			, "sq": sq
			
			, "efctOcrncDt": efctOcrncDt
		   	, "efctEndDt": efctEndDt
			, "efctMngCntnt": efctMngCntnt
		};
		

		$.ajax({
			type: "POST",
			url: "/PM22010S/registEfctInfo",
			data: dtoParam,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
				  , title: "Success!"
				  , text: "시효관리내역을 저장하였습니다."
				  , confirmButtonText: "확인"
				}).then((result) => {
					getEfctDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "시효관리내역을 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
		
	}
}

// TAB4 시효관리 삭제
function tab4EfctDelete() {
	
	var ibDealNo = $('#PM22010S_ibDealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd = $('#hidden_lstCCaseCcd').val();
	var sq = $('#hidden_tab4_sq').val();
	
	
	if (!isEmpty(ibDealNo)) {
		if(sq != 0){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "시효관리내역을 선택해주세요."
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
			,"sq": sq
		}
		
		$.ajax({
			type: "POST",
			url: "/PM22010S/deleteEfctInfo",
			data: paramData,
			dataType: "json",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "시효관리내역을 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEfctDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "시효관리내역을 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}

//----------------------------TAB5 안건연결----------------------------

// TAB5 안건연결 조회
function getCnctList(){

	var ibDealNo = $('#hidden_dealNo').val(); 				// IBDEAL번호
	var riskInspctCcd = $('#hidden_riskInspctCcd').val(); 	// 리스크구분심사코드
	var lstCCaseCcd  = $('#hidden_lstCCaseCcd').val(); 		// 부수안건구분코드

	var paramData = {
		"ibDealNo": ibDealNo
		,"riskInspctCcd": riskInspctCcd
		,"lstCCaseCcd": lstCCaseCcd
	};


	$.ajax({
		type: "GET",
		url: "/PM22010S/getCnctList",
		data: paramData,
		dataType: "json",
		success: function(data) {
			var html = '';
			var cnctList = data;
			$('#Cnct_List').html(html);

			if (cnctList.length > 0){
				$.each(cnctList, function(key, value){
					html += '<tr onclick="setCnctDetail(this)">';
					html += '<td>' + value.rgstDt + '</td>';								  // 등록일
					html += '<td>' + value.cnctIbDealNo + '</td>';							  // 연계IBDEAL번호
					html += '<td>' + value.cnctIbDealNm + '</td>';							  // 안건명
					html += '<td>' + value.etcCntnt + '</td>';							      // 내용
					html += '<td>' + value.fstRgstPNm + '</td>';							  // 최초등록자명
					html += '<td style="display:none;">' + value.cnctRiskInspctCcd + '</td>'; // 연계리스크심사구분코드
					html += '<td style="display:none;">' + value.cnctLstCCaseCcd + '</td>';	  // 연계부수안건구분코드
					html += '<td style="display:none;">' + value.sq + '</td>';				  // 일련번호
					html += '<td style="display:none;">' + value.fstRgstPEno + '</td>';		  // 최초등록자사번
					html += '</tr>';

				})
			}else {
				html += '<tr>';
				html += '<td colspan="8" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';

				$('#PM22010S_cnct_ibDealNo').val('');				//연계IBDEAL번호
				$('#PM22010S_cnct_etcCntnt').val('');					//기타내용
			}

			$('#Cnct_List').html(html);
		},
	});
}

// 안건연결 정보 취득
function setCnctDetail(e){
	var tr = $(e);

	var td = $(tr).children();
	var cnctIbDealNo 	  = td.eq(1).text();					// 연계IBDEAL번호
	var cnctRiskInspctCcd = td.eq(5).text();					// 연계리스크심사구분코드
	var cnctLstCCaseCcd   = td.eq(6).text();					// 연계부수안건구분코드
	var etcCntnt 		  = td.eq(3).text();					// 기타내용
	var sq       		  = td.eq(7).text();					// 일련번호

	$(tr).addClass('table-active');

	// 연결안건 정보
	$('#PM22010S_cnct_ibDealNo').val(cnctIbDealNo);				// 연계IBDEAL번호
	$('#PM22010S_cnct_riskInspctCcd').val(cnctRiskInspctCcd);	// 연계리스크심사구분코드
	$('#PM22010S_cnct_lstCCaseCcd').val(cnctLstCCaseCcd);		// 연계부수안건구분코드
	$('#hidden_tab5_sq').val(sq);								// 일련번호
	$('#PM22010S_cnct_etcCntnt').val(etcCntnt);					// 기타내용


	$('#cnctActive tbody tr').click(function() {
		// 모든 행의 active 클래스 제거
		$('#cnctActive tbody tr').removeClass('table-active');
		// 클릭한 행에 active 클래스 추가
		$(this).addClass('table-active');
	});
}

// TAB5 안건연결 초기화
function tab5CnctReset() {
	$("#PM22010S_cnct_ibDealNo").val('');						// 연계IBDEAL번호
	$('#PM22010S_cnct_etcCntnt').val('');						// 기타내용
	$('#hidden_tab5_sq').val('0');								// 일련번호

	$('#cnctActive tbody tr').removeClass('table-active');				// 테이블 active 초기화
}

// TAB5 안건연결 저장
function tab5CnctSave() {
	var ibDealNo      = $('#hidden_dealNo').val();
	var riskInspctCcd = $('#hidden_riskInspctCcd').val();
	var lstCCaseCcd   = $('#hidden_lstCCaseCcd').val();

	// 연결안건 정보
	var cnctIbDealNo      = $('#PM22010S_cnct_ibDealNo').val();						// 연계IBDEAL번호
	var cnctRiskInspctCcd = $('#PM22010S_cnct_riskInspctCcd').val();				// 연계리스크심사구분코드
	var cnctLstCCaseCcd   = $('#PM22010S_cnct_lstCCaseCcd').val();					// 연계부수안건구분코드
	var sq                = $('#hidden_tab5_sq').val();								// 일련번호
	var cnctEtcCntnt      = $('#PM22010S_cnct_etcCntnt').val();						// 기타내용

	// 유효성 체크
	if (!isEmpty(ibDealNo)) {
		if(!isEmpty(cnctIbDealNo)) {
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "안건연결 내용을 확인해주세요."
				, confirmButtonText: "확인"
			});
		}
	}else{
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "Deal 정보를 조회해주세요."
			, confirmButtonText: "확인"
		});
	}


	function businessFunction() {

		if(ibDealNo == cnctIbDealNo) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "선택된 안건과 같은 Deal번호를 가진 안건은 등록할 수 없습니다."
				, confirmButtonText: "확인"
			});
			return false;
		}

		 dtoParam = {
			  "ibDealNo"     	  : ibDealNo
			, "riskInspctCcd"	  : riskInspctCcd
			, "lstCCaseCcd"       : lstCCaseCcd

			, "cnctIbDealNo"      : cnctIbDealNo
			, "cnctRiskInspctCcd" : cnctRiskInspctCcd
			, "cnctLstCCaseCcd"   : cnctLstCCaseCcd
			, "etcCntnt"          : cnctEtcCntnt
			, "sq"                : sq
		};

		$.ajax({
			type: "POST",
			url: "/PM22010S/registCnctInfo",
			data: dtoParam,
			dataType: "json",
			success: function(data){
				if( data == 500 ){
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "연결하고자 하는 안건의 심사진행상태가 약정완료가 아닙니다."
						, confirmButtonText: "확인"
					})
				}else
				if( data == 0 ) {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "안건연결 정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					})
				}else{
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "안건연결 내역을 저장하였습니다."
						, confirmButtonText: "확인"
					}).then((result) => {
						getEamList();
						getCnctList();
					});
				}
			}
			,
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "안건연결 정보를 저장하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});
	}
}

// TAB5 안건연결 정보 삭제
function tab5CnctDelete() {

	var ibDealNo = $('#hidden_dealNo').val();
	var sq       = $('#hidden_tab5_sq').val();


	if (!isEmpty(ibDealNo)) {
		if(sq != 0){
			businessFunction();
		}else{
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "연결된 안건을 선택해주세요."
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

		$.ajax({
			type: "POST",
			url: "/PM22010S/deleteCnctInfo",
			data: { "sq" : sq },
			dataType: "text",
			success: function() {
				swal.fire({
					icon: 'success'
					, title: "success!"
					, text: "안건 연결 정보를 삭제하였습니다."
					, confirmButtonText: "확인"
				}).then((result) => {
					getEamList();
					getCnctList();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "안건 연결 정보를 삭제하는데 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		})
	}
}