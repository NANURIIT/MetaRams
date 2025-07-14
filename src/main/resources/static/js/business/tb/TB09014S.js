/* 
 * 한국신용정보원 - 담보정보
 * 2025.07.08 ejchoi
 */
const TB09014Sjs = (function() {

	let arrPqGrid_mrtgFcsList;
	let arrPqGrid_msgTranList;
	let arrPqGrid_errDpchList;
	let col_mrtgFcsList;
	let col_msgTranList;
	let col_errDpchList;
	let selectBox;      //공통코드 반환
	let grdSelect = {}; // select객체

	$(document).ready(function() {
		loadSelectBoxContents();
		rendorGrid();
		$("#TB09014S_stdrDt").val(getToday());
	});

	//셀렉트박스 세팅
	function loadSelectBoxContents() {
		var item = "";
		item += "K013";//업무구분(K013)
		item += "/" + "K002";//오류코드(K002)
		item += "/" + "K008";//차주구분(K008)
		item += "/" + "K009";//처리구분(K009)
		item += "/" + "K010";//한도정보과목코드(K010)
		item += "/" + "K011";//기관코드(K011)
		item += "/" + "K012";//담보코드(K012)
		item += "/" + "K014";//거래구분(K014)
		item += "/" + "K015";//보고서구분(K015)


		selectBox = getSelectBoxList("TB09014S", item, false);
		grdSelect.K013 = selectBox.filter((item) => item.cmnsGrpCd === 'K013');//grdSelect.K013
		grdSelect.K002 = selectBox.filter((item) => item.cmnsGrpCd === 'K002');//grdSelect.K002
		grdSelect.K008 = selectBox.filter((item) => item.cmnsGrpCd === 'K008');//grdSelect.K008
		grdSelect.K009 = selectBox.filter((item) => item.cmnsGrpCd === 'K009');//grdSelect.K009
		grdSelect.K010 = selectBox.filter((item) => item.cmnsGrpCd === 'K010');//grdSelect.K010
		grdSelect.K011 = selectBox.filter((item) => item.cmnsGrpCd === 'K011');//grdSelect.K011
		grdSelect.K012 = selectBox.filter((item) => item.cmnsGrpCd === 'K011');//grdSelect.K012
		grdSelect.K014 = selectBox.filter((item) => item.cmnsGrpCd === 'K014');//grdSelect.K014
		grdSelect.K015 = selectBox.filter((item) => item.cmnsGrpCd === 'K015');//grdSelect.K015

	}

	// 날짜 세팅
	function dateStr(str) {
		if (str != null) {
			return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
		} else {
			return '';
		}
	}

	// 그리드 세팅
	function rendorGrid() {

		col_mrtgFcsList = [
			{ title: "담보정보집중일련번호", dataType: "string", dataIndx: "mrtgFcsSn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "기준일자", dataType: "string", dataIndx: "stdrDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "일련번호", dataType: "string", dataIndx: "sn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "담보코드(K012)", dataType: "string", dataIndx: "mrtgCd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K012 }, render: function(ui) { var options = grdSelect.K012; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData;  }},
			{ title: "처리구분(K009)", dataType: "string", dataIndx: "prcsDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K009 }, render: function(ui) { var options = grdSelect.K009; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData;  }},
			{ title: "오류코드(K002)", dataType: "string", dataIndx: "errDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K002 }, render: function(ui) { var options = grdSelect.K002; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData;  }},
			{ title: "보고서구분(K015)", dataType: "string", dataIndx: "rptsDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K015 }, render: function(ui) { var options = grdSelect.K015; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData;  }},
			{ title: "등록사유발생일자", dataType: "string", dataIndx: "rgstRsnOcrncDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "최종변경일자", dataType: "string", dataIndx: "lastChngDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "차주구분(K008)", dataType: "string", dataIndx: "brwrDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K008 }, render: function(ui) { var options = grdSelect.K008; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData;  }},
			{ title: "법인등록번호", dataType: "string", dataIndx: "crno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "사업자등록번호", dataType: "string", dataIndx: "bzno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "상호명", dataType: "string", dataIndx: "eprzNm", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "대표자명", dataType: "string", dataIndx: "rprsNm", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
			{ title: "금액(천원)", dataType: "string", dataIndx: "amt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width:150, },
		];

		col_msgTranList = [
			{ title: "전문송신일련번호", dataType: "string", dataIndx: "msgTransSn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "기준일자", dataType: "string", dataIndx: "stdrDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
			{ title: "송신일자", dataType: "string", dataIndx: "transDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
			{ title: "거래구분(K014)", dataType: "string", dataIndx: "trDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K014 }, render: function(ui) { var options = grdSelect.K014; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "오류통보", dataType: "string", dataIndx: "errDpch", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "파일전문명", dataType: "string", dataIndx: "", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "발송건수", dataType: "string", dataIndx: "", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "발송시간", dataType: "string", dataIndx: "", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "발송결과", dataType: "string", dataIndx: "sendRslt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
		];

		col_errDpchList = [
			{ title: "오류통보일련번호", dataType: "string", dataIndx: "errDpchSn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "기준일자", dataType: "string", dataIndx: "stdrDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
			{ title: "수신일자", dataType: "string", dataIndx: "rcptDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
			{ title: "일련번호", dataType: "string", dataIndx: "sn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "과목코드", dataType: "string", dataIndx: "sbjCd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "금액(천원)", dataType: "string", dataIndx: "amt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "처리구분(K009)", dataType: "string", dataIndx: "prcsDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K009 }, render: function(ui) { var options = grdSelect.K009; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "오류코드(K002)", dataType: "string", dataIndx: "errDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K002 }, render: function(ui) { var options = grdSelect.K002; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "오류내용", dataType: "string", dataIndx: "", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "기관코드(K011)", dataType: "string", dataIndx: "bondIsttDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K011 }, render: function(ui) { var options = grdSelect.K011; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "차주구분(K008)", dataType: "string", dataIndx: "brwrDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K008 }, render: function(ui) { var options = grdSelect.K008; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "법인등록번호", dataType: "string", dataIndx: "crno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "사업자번호", dataType: "string", dataIndx: "bzno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "거래구분(K014)", dataType: "string", dataIndx: "trDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: grdSelect.K014 }, render: function(ui) { var options = grdSelect.K014; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
			{ title: "거래번호", dataType: "string", dataIndx: "trNo", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
			{ title: "Data구분", dataType: "string", dataIndx: "dataDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
		];

		let arrPqGridObj = [
			{ id: "TB09014S_mrtgFcsList", colModel: col_mrtgFcsList, height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: false }, strNoRows: "데이터가 없습니다.", },
			{ id: "TB09014S_msgTranList", colModel: col_msgTranList, height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: true }, strNoRows: "데이터가 없습니다.", },
			{ id: "TB09014S_errDpchList", colModel: col_errDpchList, height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: false }, strNoRows: "데이터가 없습니다.", },
		];

		setPqGrid(arrPqGridObj);
		arrPqGrid_mrtgFcsList = $("#TB09014S_mrtgFcsList").pqGrid("instance");
		arrPqGrid_msgTranList = $("#TB09014S_msgTranList").pqGrid("instance");
		arrPqGrid_errDpchList = $("#TB09014S_errDpchList").pqGrid("instance");

	}

	// 확인메시지
	function confirmMsg(grd) {
		Swal.fire({
			title: "엑셀 업로드",
			text: "기존 업로드된 내역을 삭제하고 다시 업로드 하시겠습니까?",
			icon: "warning",
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: "예",
			cancelButtonText: "아니오",
		}).then((e) => {
			if (e.isConfirmed) {
				$('#upload-file-' + grd).click();
			}
		});
	}

	// 에러메시지
	function errorMsg(message) {
		openPopup({
			type: "warning",
			title: "Warning!",
			text: message,
		});
	}

	// 전문송신내역 탭 클릭
	function setMsgTranTab() {
		setTimeout(() => arrPqGrid_msgTranList.refresh(), 1);
	}

	// 오류통보내역 탭 클릭
	function setErrDpchTab() {
		setTimeout(() => arrPqGrid_errDpchList.refresh(), 1);
	}

	// 초기화 버튼 클릭
	function rtTB09014S() {

		$("#TB09014S_stdrDt").val(getToday());

		arrPqGrid_mrtgFcsList.setData([]);
		arrPqGrid_mrtgFcsList.refreshDataAndView();

		arrPqGrid_msgTranList.setData([]);
		arrPqGrid_msgTranList.refreshDataAndView();

		arrPqGrid_errDpchList.setData([]);
		arrPqGrid_errDpchList.refreshDataAndView();
	}

	// 검색 버튼 클릭
	function shTB09014S() {

		if (isEmpty($("#TB09014S_stdrDt").val())) {
			errorMsg("기준일자를 입력해 주세요");
			return;
		}

		mrtgFcsList();

	}

	// 담보정보집중내역 조회
	function mrtgFcsList() {
		var paramData = {
			stdrDt: $("#TB09014S_stdrDt").val().replaceAll("-", ""),
		};

		$.ajax({
			type: "GET",
			url: "/TB09014S/getMrtgFcsList",
			data: paramData,
			dataType: "json",
			success: function(data) {
				if (data.length == 0) {
					errorMsg("데이터가 없습니다.");
				}
				arrPqGrid_mrtgFcsList.setData(data);
				msgTranList();
				errDpchList();
			},
			error: function() {
				errorMsg("데이터 조회 중 오류가 발생했습니다.");
			},
		});
	}

	// 전문송신내역 조회
	function msgTranList() {
		var paramData = {
			stdrDt: $("#TB09014S_stdrDt").val().replaceAll("-", ""),
			scrnDcd: "TB09014S",
		};

		$.ajax({
			type: "GET",
			url: "/TB09014S/getMsgTranList",
			data: paramData,
			dataType: "json",
			success: function(data) {
				if (data.length == 0) {
					//errorMsg("데이터가 없습니다.");
				}
				arrPqGrid_msgTranList.setData(data);
			},
			error: function() {
				errorMsg("데이터 조회 중 오류가 발생했습니다.");
			},
		});

	}

	// 오류통보내역 조회
	function errDpchList() {
		var paramData = {
			stdrDt: $("#TB09014S_stdrDt").val().replaceAll("-", ""),
			scrnDcd: "TB09014S",
		};

		$.ajax({
			type: "GET",
			url: "/TB09014S/getErrDpchList",
			data: paramData,
			dataType: "json",
			success: function(data) {
				if (data.length == 0) {
					//errorMsg("데이터가 없습니다.");
				}
				arrPqGrid_errDpchList.setData(data);
			},
			error: function() {
				errorMsg("데이터 조회 중 오류가 발생했습니다.");
			},
		});
	}

	// 담보정보집중내역 저장
	function saveMrtgFcsList(ibims753bVOList) {
		var paramDTO = { "stdrDt": $('#TB09014S_stdrDt').val().replaceAll('-', ''), "ibims753bVOList": ibims753bVOList, "scrnDcd": "TB09014S" };

		$.ajax({
			type: "POST",
			url: "/TB09014S/saveMrtgFcsList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "담보정보집중내역이 저장되었습니다.";
				openPopup(option);
				mrtgFcsList();
			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
		});
	}

	// 전문송신내역 저장
	function saveMsgTranList(ibims753bVOList) {
		var paramDTO = { "stdrDt": $('#TB09014S_stdrDt').val().replaceAll('-', ''), "ibims753bVOList": ibims753bVOList, "scrnDcd": "TB09014S" };

		$.ajax({
			type: "POST",
			url: "/TB09014S/saveMsgTranList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "전문송신내역이 저장되었습니다.";
				openPopup(option);
				msgTranList();
			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
		});
	}

	// 오류통보내역 저장
	function saveErrDpchList(ibims753bVOList) {
		var paramDTO = { "stdrDt": $('#TB09014S_stdrDt').val().replaceAll('-', ''), "ibims753bVOList": ibims753bVOList, "scrnDcd": "TB09014S" };

		$.ajax({
			type: "POST",
			url: "/TB09014S/saveErrDpchList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "오류통보내역이 저장되었습니다.";
				openPopup(option);
				errDpchList();
			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
		});
	}

	// 엑셀다운로드 버튼 클릭
	function exDnLoad(grd) {
		let blob = $("#TB09014S_" + grd).pqGrid("instance").exportExcel({});
		let fileName;

		if (grd == 'mrtgFcsList') {
			fileName = "담보정보집중내역.xlsx";
		} else if (grd == 'msgTranList') {
			fileName = "전문송신내역.xlsx";
		} else if (grd == 'errDpchList') {
			fileName = "오류통보내역.xlsx";
		}
		pq.saveAs(blob, fileName);
	}

	// 엑셀업로드 버튼 클릭
	function exUpLoad(grd) {

		let gcnt = 0;
		if (grd == 'mrtgFcsList') {
			gcnt = arrPqGrid_mrtgFcsList.pdata.length;
		} else if (grd == 'msgTranList') {
			gcnt = arrPqGrid_msgTranList.pdata.length;
		} else if (grd == 'errDpchList') {
			gcnt = arrPqGrid_errDpchList.pdata.length;
		}

		if (gcnt > 0) {
			confirmMsg(grd);
		} else {
			$('#upload-file-' + grd).click();
		}

	}

	// 엑셀업로드 버튼 이벤트 매핑
	$("#upload-file-mrtgFcsList").change(function() {
		readExcelFile('mrtgFcsList');
		resetFileInput($('#upload-file-mrtgFcsList'));
	});

	// 엑셀업로드 버튼 이벤트 매핑
	$("#upload-file-msgTranList").change(function() {
		readExcelFile('msgTranList');
		resetFileInput($('#upload-file-msgTranList'));
	});

	// 엑셀업로드 버튼 이벤트 매핑
	$("#upload-file-errDpchList").change(function() {
		readExcelFile('errDpchList');
		resetFileInput($('#upload-file-errDpchList'));
	});

	// 엑셀 파일 읽기
	function readExcelFile(grd) {

		let input = event.target;
		let reader = new FileReader();

		reader.onload = function() {

			let data = reader.result;
			let workBook = XLSX.read(data, { type: 'binary' });

			workBook.SheetNames.forEach(function(sheetName) {
				let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
					raw: false,
					dateNF: 'yyyy-mm-dd'
				});
				addExcelRows(rows, grd);
			})
		};

		reader.readAsBinaryString(input.files[0]);
	}

	// 엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
	function resetFileInput($element) {
		$element.wrap('<form>').closest('form').get(0).reset();
		$element.unwrap();
	}

	// 행추가
	function addExcelRows(rows, grd) {
		if (grd == 'mrtgFcsList') {
			addExcelRows_mrtgFcsList(rows);
		} else if (grd == 'msgTranList') {
			addExcelRows_msgTranList(rows);
		} else if (grd == 'errDpchList') {
			addExcelRows_errDpchList(rows);
		}
	}

	// 담보정보집중내역 행추가
	function addExcelRows_mrtgFcsList(rows) {

		$("#TB09014S_mrtgFcsList").pqGrid("setData", []);
		var ibims753bVOList = [];
		var seq = 0;

		rows.forEach(function(row) {
			var stdrDt = $("#TB09014S_stdrDt").val().replaceAll("-", "");
			var mrtgFcsSn = row['담보정보집중일련번호'];
			var sn = ++seq;
			var mrtgCd = row['담보코드(K012)'];
			var prcsDcd = row['처리구분(K009)'];
			var errDcd = row['오류코드(K002)'];
			var rptsDcd = row['보고서구분(K015)'];
			var rgstRsnOcrncDt = row['등록사유발생일자'];
			var lastChngDt = row['최종변경일자'];
			var brwrDcd = row['차주구분(K008)'];
			var crno = row['법인등록번호'];
			var bzno = row['사업자등록번호'];
			var eprzNm = row['상호명'];
			var rprsNm = row['대표자명'];
			var amt = row['금액(천원)'];

			var newRow = {
				mrtgFcsSn:mrtgFcsSn,
				stdrDt:stdrDt,
				sn:sn,
				mrtgCd:mrtgCd,
				prcsDcd:prcsDcd,
				errDcd:errDcd,
				rptsDcd:rptsDcd,
				rgstRsnOcrncDt:rgstRsnOcrncDt,
				lastChngDt:lastChngDt,
				brwrDcd:brwrDcd,
				crno:crno,
				bzno:bzno,
				eprzNm:eprzNm,
				rprsNm:rprsNm,
				amt:amt,
			}

			ibims753bVOList.push(newRow);
			$("#TB09014S_mrtgFcsList").pqGrid("addRow", { rowData: newRow, checkEditable: false });
		});

		$("#TB09014S_mrtgFcsList").pqGrid("refreshDataAndView");
		saveMrtgFcsList(ibims753bVOList);
	}

	// 전문송신내역 행추가
	function addExcelRows_msgTranList(rows) {

		$("#TB09014S_msgTranList").pqGrid("setData", []);
		var ibims753bVOList = [];
		var sn = 0;

		rows.forEach(function(row) {
			var msgTransSn = row['전문송신일련번호'];
			var errDpch = row['오류통보'];
			var transDt = row['송신일자'];
			var stdrDt = $("#TB09014S_stdrDt").val().replaceAll("-", "");
			var trDcd = row['거래구분(K014)'];
			var fileMsgNm = row['파일전문명'];
			var sendCnt = row['발송건수'];
			var sendTm = row['발송시간'];
			var sendRslt = row['발송결과'];
			var jobDcd = row['업무구분(K013)'];

			var newRow = {
				msgTransSn: msgTransSn,
				errDpch: errDpch,
				transDt: transDt,
				stdrDt: stdrDt,
				trDcd: trDcd,
				fileMsgNm: fileMsgNm,
				sendCnt: sendCnt,
				sendTm: sendTm,
				sendRslt: sendRslt,
				sn: ++sn,
				scrnDcd: 'TB09014S',
				jobDcd: jobDcd,
			}

			ibims753bVOList.push(newRow);
			$("#TB09014S_msgTranList").pqGrid("addRow", { rowData: newRow, checkEditable: false });

		});

		$("#TB09014S_msgTranList").pqGrid("refreshDataAndView");
		saveMsgTranList(ibims753bVOList);
	}

	// 오류통보내역 행추가
	function addExcelRows_errDpchList(rows) {

		$("#TB09014S_errDpchList").pqGrid("setData", []);
		var ibims753bVOList = [];
		var seq = 0;

		rows.forEach(function(row) {
			var errDpchSn = row['오류통보일련번호'];
			var rcptDt = row['수신일자'];
			var stdrDt = $("#TB09014S_stdrDt").val().replaceAll("-", "");
			var sn = ++seq;
			var brwrDcd = row['차주구분(K008)'];
			var crno = row['법인등록번호'];
			var bzno = row['사업자번호'];
			var prcsDcd = row['처리구분(K009)'];
			var trDcd = row['거래구분(K014)'];
			var trNo = row['거래번호'];
			var dataDcd = row['Data구분'];
			var errDcd = row['오류코드(K002)'];
			var errCtns = row['오류내용'];
			var bondIsttDcd = row['기관코드(K011)'];
			var jobDcd = row['업무구분(K013)'];
			var sbjCd = row['과목코드'];
			var amt = row['금액(천원)'];

			var newRow = {
				errDpchSn: errDpchSn,
				rcptDt: rcptDt,
				stdrDt: stdrDt,
				sn: sn,
				brwrDcd: brwrDcd,
				crno: crno,
				bzno: bzno,
				prcsDcd: prcsDcd,
				trDcd: trDcd,
				trNo: trNo,
				dataDcd: dataDcd,
				errDcd: errDcd,
				errCtns: errCtns,
				bondIsttDcd: bondIsttDcd,
				jobDcd: jobDcd,
				sbjCd: sbjCd,
				amt: amt,
				scrnDcd: 'TB09014S',
			}

			ibims753bVOList.push(newRow);
			$("#TB09014S_errDpchList").pqGrid("addRow", { rowData: newRow, checkEditable: false });

		});

		$("#TB09014S_errDpchList").pqGrid("refreshDataAndView");
		saveErrDpchList(ibims753bVOList);
	}



	return {
		shTB09014S: shTB09014S,
		rtTB09014S: rtTB09014S,
		setMsgTranTab: setMsgTranTab,
		setErrDpchTab: setErrDpchTab,
		exDnLoad: exDnLoad,
		exUpLoad: exUpLoad,
	};

})();
