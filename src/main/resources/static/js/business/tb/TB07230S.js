const TB07230Sjs = (function() { 

	$(document).ready(function() {

		setMonthInput();

		sltctBoxSet();

		gridSett();

		//기간검색 유효성 검사 함수
		chkValFromToDt("TB07230S_fromDate","TB07230S_toDate");
	});
 
	function setMonthInput() {
		// 1개월전 ~ 현재날짜 디폴트 세팅
		$("#TB07230S_fromDate").val(newAddMonth(new Date(getToday()), -1)); //조회시작일
		$("#TB07230S_toDate").val(getToday()); //조회종료일
	}

	//selectBox 세팅
	function sltctBoxSet() {
		let selectBox = getSelectBoxList(
			"TB07230S",	//관리부서
			"D010",   //부서코드
			false
		);

		let TB07230S_dprtSelect;

		TB07230S_dprtSelect = selectBox.filter(function(item) {
			return item.cmnsGrpCd === "D010";
		})

		let D010html;

		TB07230S_dprtSelect.forEach((item) => {
			D010html += `<option value="${item.cdValue}">${item.cdName}</option>`;
		});

		$("#TB07230S_dprtNm").append(D010html);

		$('#TB07230S_dprtNm').on('change', function() {
			$('#TB07230S_dprtCd').val($('#TB07230S_dprtNm').val())
		});

		setFormElementsStateByUserRole();
	}

	// 관리부서 세팅
	function setFormElementsStateByUserRole() {
		let dprtCd = $('#userDprtCd').val();
		//let dprtNm = $('#userDprtNm').val();

		//로그인한 사원 정보 세팅 
		$('#TB07230S_dprtCd').val(dprtCd);
		$('#TB07230S_dprtNm').val(dprtCd);
	}

	// 거래내역 그리드 세팅
	function gridSett() {

		//거래내역 그리드 colModel
		let TB07230S_col_trsctHis = [
			/*
			//체크박스
			{
				dataIndx: "chk",
				maxWidth: 36,
				minWidth: 36,
				align: "center",
				resizable: false,
				title: "",
				menuIcon: false,
				type: "checkBoxSelection",
				cls: "ui-state-default",
				sortable: false,
				editor: false,
				dataType: "bool",
				editable: "true",
				cb: {
				all: false,
				header: true,
				},
			},*/
			/*
			{
				title: "승인",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			*/
			/*
			{
				title: "확정",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			*/
			{
				title: "거래일자",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "SPC명",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "left",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "자산관리계좌번호",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "left",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "구분",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "항목",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "적요",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "금액",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "잔고",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "right",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "수정인",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "관리부점",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "비고",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "left",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "정렬순서",
				dataType: "string",
				dataIndx: "",
				halign: "center",
				align: "left",
				filter: { crules: [{ condition: "range" }] },
			},
		]

		let pqGridObjs = [
			{
				height: 500,
				maxHeight: 500,
				id: "TB07230S_trsctHis",
				colModel: TB07230S_col_trsctHis,
				scrollModel: { autoFit: true },
				editable: false,
				numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>No</p>" }
			}
		]

		setPqGrid(pqGridObjs);
	}

	//그리드 행 추가
	function addRows_TB07230S(gridId) {
		$(gridId).pqGrid("addRow", { rowData: {}, checkEditable: false });
	}

	//그리드 행 삭제
	function dltRows_TB07230S(gridId) {
		var gridLgth = $(gridId).pqGrid('option', 'dataModel.data').length;

		$(gridId).pqGrid("deleteRow", { rowIndx: gridLgth - 1 });
	}

	// 조회버튼
	function selectTB07230S() {
		var paramData = {
			ardyBzepNo: $("#TB07230S_ardyBzepNo").val(),			// spc 기업체 코드
			fromDate: unformatDate($('#TB07230S_fromDate').val()),	// 조회기간 시작
			toDate: unformatDate($('#TB07230S_toDate').val()),		// 조회기간 종료
			dprtCd: $('#TB07230S_dprtCd').val(),					// 관리부점
			asstMngmAcno: $('#TB07230S_asstMngmAcno').val(),		// 자산관리계좌번호
		};

		$.ajax({
			type: "GET",
			url: '/TB07230S/selectTB07230S',
			data: paramData,
			dataType: "json",
			success: function(data) {
				console.log("success");
				console.log(data);
				if (data.length > 0) {
					$("#TB07230S_trsctHis").pqGrid("setData", data);
					$("#TB07230S_trsctHis").pqGrid("refreshDataAndView");
				} else {
					
					var obj = {
					     // all your other grid settings
					     strNoRows : '데이터가 없습니다.'
					}
					
					$("#TB07230S_trsctHis").pqGrid(obj);
					$("#TB07230S_trsctHis").pqGrid("refreshDataAndView");
				}
			},
			error: function() {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "정보 조회에 실패하였습니다.",
					confirmButtonText: "확인",
				});
			},
		});
	}
	
	// 초기화버튼
	function resetSearch() {
		$('#TB07230S_ardyBzepNo').val('');	// spc 기업체번호
		$('#TB07230S_entpNm').val('');	// spc 기업체명
		$("#TB07230S_fromDate").val(newAddMonth(new Date(getToday()), -1));	//조회시작일
		$("#TB07230S_toDate").val(getToday());	//조회종료일
		
		setFormElementsStateByUserRole();	// 관리부점
		
		$('#TB07230S_asstMngmAcno').val('');	// 자산관리계좌
		
		$("#TB07230S_trsctHis").pqGrid("setData", []);	// spc별 거래내역 그리드
	};
	
	// spc 기업체번호 변경 function
	function selectSpcList() {

		console.log("val[" + $("#TB07230S_ardyBzepNo").val() + "]");

		if (isEmpty($("#TB07230S_ardyBzepNo").val())) {
			return false;
		}

		var paramData = {
			ardyBzepNo: $("#TB07230S_ardyBzepNo").val(),			// spc 기업체 코드
		};

		$.ajax({
			type: "GET",
			url: '/TB07230S/selectSpcList',
			data: paramData,
			dataType: "json",
			success: function(data) {
				
				var html = "";
				
				if(data.length > 0){
					data.forEach(function(obj){
						html += "<option value=" + obj.fincExcuRqsSn + ">" + obj.fincExcuRqsSn +"</option>"
					})
					
					$('#TB07230S_fincExcuRqsSn').html(html);
				}else{
					$('#TB07230S_fincExcuRqsSn').html(html);
				}
			},
			error: function() {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "정보 조회에 실패하였습니다.",
					confirmButtonText: "확인",
				});
			},
		});
	}

	return {
		addRows_TB07230S: addRows_TB07230S,
		dltRows_TB07230S: dltRows_TB07230S,
		selectTB07230S: selectTB07230S,
		resetSearch: resetSearch,
		selectSpcList: selectSpcList,
	};
})();