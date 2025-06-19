const TB09040Sjs = (function () {
	let pqGridObjList;
	
	$(document).ready(function() {
		setRsltnDt();
		loadSelectBoxContents();
		TB09040S_setGrid();
	});
	
	function TB09040S_setGrid() {
	// pq 그리드
	let arrPqGridObj = [
		{
		height: 180,
		maxHeight: 180,
		id: "TB09040S_gridList",
		colModel: colDealList,
		},
	];
	setPqGrid(arrPqGridObj);
	pqGridObjList = $("#TB09040S_gridList").pqGrid("instance");
	};

	// 금일 날짜 세팅
	function setRsltnDt() {
		$('#TB09040S_stdYrMm').val(getToday().substr(0, 7));
	}

	function loadSelectBoxContents() {

		var item = '';
		item += 'I011';							// 심사진행상태코드
		item += '/' + 'R011';					// 정기보고구분코드
		item += '/' + 'I010';					// 심사부서구분코드
		item += '/' + 'R015';					// 리스크심사관리단계코드
		item += '/' + 'F007';					// 금융상품분류코드

		getSelectBoxList('TB09040S', item);
	}

	function getDealInfo() {

		var stdYrMm = $('#TB09040S_stdYrMm').val();
		var dprtCd = $('#TB09040S_dprtCd').val();
		var chrg_empNo = $('#TB09040S_chrg_empNo').val();
		var inspctPrgrsStCd = $('#TB09040S_I011').val();
		var rglrReprtCcd = $('#TB09040S_R011').val();
		var inspctDprtCcd = $('#TB09040S_I010').val();
		var own_empNo = $('#TB09040S_own_empNo').val();
		var riskInspctMngSttsCd = $('#TB09040S_R015').val();
		var fncGdsDvdCd = $('#TB09040S_F007').val();
		var dealNm = $('#dealNm').val();

		var dtoParam = {
			"stdYrMm": stdYrMm
			, "dprtCd": dprtCd
			, "chrg_empNo": chrg_empNo
			, "inspctPrgrsStCd": inspctPrgrsStCd
			, "rglrReprtCcd": rglrReprtCcd
			, "inspctDprtCcd": inspctDprtCcd
			, "own_empNo": own_empNo
			, "riskInspctMngSttsCd": riskInspctMngSttsCd
			, "fncGdsDvdCd": fncGdsDvdCd
			, "dealNm": dealNm
		};

		$.ajax({
			type: "GET",
			url: "/TB09040S/getDealInfo",
			data: dtoParam,
			dataType: "json",
			success: function(data) {
				
				pqGridObjList.setData(data);
				

				// var html = '';
				// var dealList = data;
				// $('#TB09040S_dealList').html(html);

				// if (dealList.length > 0) {
				// 	$.each(dealList, function(key, value) {
				// 		html += '<tr ondblclick="setTabContents(this);">';
				// 		html += '<td>' + value.dealNo + '</td>';
				// 		html += '<td style="display:none;">' + value.mtrDcd + '</td>';
				// 		html += '<td>' + value.mtrDcdNm + ' (' + value.mtrDcd + ')' + '</td>';
				// 		html += '<td style="display:none;">' + value.jdgmDcd + '</td>';
				// 		html += '<td>' + value.jdgmDcdNm + ' (' + value.jdgmDcd + ')' + '</td>';
				// 		html += '<td style="display:none;">' + value.ownPEno + '</td>';
				// 		if (isNotEmpty(value.ownPEno)) {
				// 			html += '<td>' + handleNullData(value.ownPNm) + ' (' + value.ownPEno + ')</td>';
				// 		} else {
				// 			html += '<td></td>';
				// 		}
				// 		html += '<td style="display:none;">' + value.mtrPrgSttsDcd + '</td>';
				// 		html += '<td>' + value.mtrPrgSttsDcdNm + '</td>';
				// 		html += '<td class="text-left">' + value.mtrNm + '</td>';
				// 		html += '</tr>';
				// 	})
				// } else {
				// 	html += '<tr>';
				// 	html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
				// 	html += '</tr>';
				// }
				// $('#TB09040S_dealList').html(html);

				// 세션체크 ajax 동기화문제로 미사용
				//checkSession();
			}
		});
		
	}	

	/* ***********************************그리드 컬럼******************************** */
	let colDealList = [
		{
		title: "진행상태",
		dataType: "string",
		dataIndx: "dealNo",
		align: "center",
		},
		{
		title: "금융상품분류",
		dataType: "string",
		dataIndx: "dealNm",
		halign: "center",
		align: "left",
		},
		{
		title: "순번",
		dataType: "string",
		dataIndx: "rgstDt",
		align: "center",
		
		},
		{
		title: "Deal번호",
		dataType: "string",
		dataIndx: "mngmBdcd",
		halign: "center",
		align: "center",
		hidden: true,
		},
		{
		title: "신규/재부의",
		dataType: "string",
		dataIndx: "mngmBdcdNm",
		halign: "center",
		align: "center",
		},
		{
		title: "부수안건",
		dataType: "string",
		dataIndx: "chrrEmpno",
		halign: "center",
		align: "center",
		hidden: true,
		},
		{
		title: "안건명",
		dataType: "string",
		dataIndx: "chrrEmpnm",
		halign: "center",
		align: "center",
		},
		{
		title: "안건관리부서",
		dataType: "string",
		dataIndx: "mtrPrgSttsDcd",
		align: "center",
		colModel: [
			{
			title: "승인요청",
			dataType: "string",
			dataIndx: "fstCnfrDt",
			width: "",
			align: "center",
			filter: { crules: [{ condition: "range" }] },
			},
			{
			title: "부서장승인",
			dataType: "string",
			dataIndx: "ansAcptDt",
			width: "",
			align: "center",
			filter: { crules: [{ condition: "range" }] },
			},
		],
		// hidden: true,
		},
		{
			title: "심사부서",
			dataType: "string",
			dataIndx: "mtrPrgSttsDcd",
			align: "center",
			colModel: [
			{
				title: "심사역확인",
				dataType: "string",
				dataIndx: "fstCnfrDt",
				width: "",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			{
				title: "심사부서장확인",
				dataType: "string",
				dataIndx: "ansAcptDt",
				width: "",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
			},
			],
			// hidden: true,
		},
	];

	return {
		loadSelectBoxContents: loadSelectBoxContents,
		setRsltnDt: setRsltnDt,
		getDealInfo: getDealInfo,
		TB09040S_setGrid: TB09040S_setGrid,

	};
})();


