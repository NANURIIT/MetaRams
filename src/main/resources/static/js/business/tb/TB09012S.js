/* 
 * 파일명  : TB09012S.js
 * 설 명   : 한국신용정보원(법인채무보증 및 채무인수 약정정보) 상세화면 관련 JavaScript
 * @Date        : 2025.07.10
*/

const TB09012Sjs = (function () {
  let arrPqGridObjCpdgList;   // Main내역 그리드 instance
  let arrPqGridObjTransList;  // 전문전송내역그리드 instance 
  let arrPqGridObjErrList;    // 오류통보내역그리드 instance

  let colCpdgList;    // Main내역 컬럼설정 List
  let colTransList;   // 전문전송내역 컬럼설정 List
  let colErrList;     // 오류통보내역 컬럼설정 List
  let selectBox; 	  // 공통코드 반환

  //한국신용정보원 공통코드
  let K002 ;     //오류구분코드 공통코드List
  let K008 ;     //차주구분코드 공통코드List
  let K009 ;     //처리구분코드 공통코드List
  let K011 ;     //채권기관구분코드 공통코드List
  let K012 ;     //담보유형구분코드 공통코드List
  let K013 ;     //업무구분코드 공통코드List
  let K014 ;     //거래구분코드 공통코드List
  let K015 ;     //보고서구분코드 공통코드List
 

  $(document).ready(function () {
   
    loadSelectBoxContents();    //공통코드 셀렉트박스 셋팅
    setDateInput();             // 오늘일자(ToDay) 셋팅
    setArrPqGridObj();          // Grid 셋팅

  });



  /* 오늘일자(ToDay) 디폴트 세팅 */
  function setDateInput() {
    $("#TB09012S_stdrDt").val(getToday());
  }



  /* 셀렉트박스 세팅 */
  function loadSelectBoxContents() {

    selectBox = getSelectBoxList("TB09012S", "K002/K008/K009/K011/K012/K013/K014/K015", false);

    K002 =  selectBox.filter((item) => item.cmnsGrpCd === "K002");   
    K008 =  selectBox.filter((item) => item.cmnsGrpCd === "K008");   
    K009 =  selectBox.filter((item) => item.cmnsGrpCd === "K009");   
    K011 =  selectBox.filter((item) => item.cmnsGrpCd === "K011");   
    K012 =  selectBox.filter((item) => item.cmnsGrpCd === "K012");   
    K013 =  selectBox.filter((item) => item.cmnsGrpCd === "K013");   
    K014 =  selectBox.filter((item) => item.cmnsGrpCd === "K014");   
    K015 =  selectBox.filter((item) => item.cmnsGrpCd === "K015");   

  }

  //alertPopup
  function alertPopup(msg) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: msg,
      confirmButtonText: "확인",
    });
  }

   /* Grid 셋팅 */
  function setArrPqGridObj() {

    /* ***********************************그리드 컬럼******************************** */
   colCpdgList = [
    { title: "법인채무보증집중일련번호",       dataType: "string",      dataIndx: "cpdgFcsSn",   align: "center",      width: "170",     filter: { crules: [{ condition: "range" }] },    },   
    { title: "오류코드",                    dataType: "string",      dataIndx: "errDcd",      align: "center",      width: "70",      filter: { crules: [{ condition: "range" }] },
      editor: {  type: "select",    valueIndx: "cdValue",     labelIndx: "cdName",     options: K002,  
	  },
        render: function (ui) {
         	 var options = K002; 
			var option = options.find(opt => opt.cdValue == ui.cellData); 
			return option ? option.cdValue + '.' + option.cdName : ui.cellData; 
        }, 
	},
    { title: "기준일자",                    dataType: "string",     dataIndx: "stdrDt",      halign: "center",      align: "center",      width: "90",      dateFormat: "yyyy-mm-dd",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        },  },
    { title: "보고서구분(K015)",     dataType: "string",      dataIndx: "rptsDcd",        halign: "center",      align: "center",      width: "130",
      filter: { crules: [{ condition: "range" }] },
      editor: { type: "select",          valueIndx: "cdValue",     labelIndx: "cdName",       options: K015,
	    },
        render: function (ui) {
            var options = K015; 
			var option = options.find(opt => opt.cdValue == ui.cellData); 
			return option ? option.cdValue + '.' + option.cdName : ui.cellData; 
        }, 
	},
    { title: "일련번호",       dataType: "string",      dataIndx: "sn",           align: "center",      halign: "center",  width: "70",
      filter: { crules: [{ condition: "range" }] },  },
    { title: "처리구분",       dataType: "string",      dataIndx: "prcsDcd",      halign: "center",      align: "center",  	  width: "70",
      filter: { crules: [{ condition: "range" }] },
      editor: { type: "select",     valueIndx: "cdValue",    labelIndx: "cdName",      options: K009,    },
        render: function (ui) {
			var options = K009; 
			var option = options.find(opt => opt.cdValue == ui.cellData); 
			return option ? option.cdValue + '.' + option.cdName : ui.cellData; } 
    },
    { title: "등록사유발생일자",   dataType: "string",    dataIndx: "rgstRsnOcrncDt",     halign: "center",    align: "center",     width: "120",      dateFormat: "yyyy-mm-dd",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        }, },
    { title: "최종변경일자",       dataType: "string",      dataIndx: "lastChngDt",      halign: "center",      align: "left",      width: "120",      dateFormat: "yyyy-mm-dd",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
          let cellData = ui.cellData;
          if (!isEmpty(cellData) && cellData.length === 8) {
            return formatDate(cellData);
          } else {
            return cellData;
          }
        }, 
	},
    { title: "차주구분",      dataType: "string",      dataIndx: "brwrDcd",      halign: "center",      align: "left",      width: "100",
      filter: { crules: [{ condition: "range" }] },
      editor: {
          type: "select",    valueIndx: "cdValue",    labelIndx: "cdName",      options: K008,
        },
		render: function(ui) { 
			var options = K008; 
			var option = options.find(opt => opt.cdValue == ui.cellData); 
			return option ? option.cdValue + '.' + option.cdName : ui.cellData; 
		}, 
	},
    { title: "법인등록번호",    dataType: "string",     dataIndx: "crno",      align: "center",      width: "100",   },
    { title: "사업자등록번호",  dataType: "string",     dataIndx: "bzno",      halign: "center",      align: "center",    width: "130",
      filter: { crules: [{ condition: "range" }] },   },
    { title: "상호명",        dataType: "string",      dataIndx: "eprzNm",    halign: "center",      align: "left",      width: "150",   },
    { title: "대표자명",      dataType: "string",      dataIndx: "rprsNm",    halign: "center",      align: "center",  	 width: "150",
      filter: { crules: [{ condition: "range" }] },   },
    { title: "과목코드",       dataType: "string",      dataIndx: "sbjCd",    halign: "center",      align: "center",    width: "100",
      filter: { crules: [{ condition: "range" }] },   },
    { title: "금액(천원)",     dataType: "string",      dataIndx: "amt",      halign: "center",      align: "right",	 width: "100",      format: "#,###",
      filter: { crules: [{ condition: "range" }] },   },
    ];
  

    colTransList = [
        { title: "전문송신일련번호", dataType: "string", dataIndx: "msgTransSn", align: "center", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "업무구분(K013)", dataType: "string", dataIndx: "jobDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K013 }, render: function(ui) { var options = K013; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "기준일자", dataType: "string", dataIndx: "stdrDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
        { title: "송신일자", dataType: "string", dataIndx: "transDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
        { title: "거래구분(K014)", dataType: "string", dataIndx: "trDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K014 }, render: function(ui) { var options = K014; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "오류통보", dataType: "string", dataIndx: "errDpch", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "파일전문명", dataType: "string", dataIndx: "fileMsgNm", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "발송건수", dataType: "string", dataIndx: "sendCnt ", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "발송시간", dataType: "string", dataIndx: "sendTm", align: "left", halign: "center", dateFormat: "HH:mm:ss", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "발송결과", dataType: "string", dataIndx: "sendRslt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
      ];

      colErrList = [
        { title: "오류통보일련번호", dataType: "string", dataIndx: "errDpchSn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "업무구분(K013)", dataType: "string", dataIndx: "jobDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150,
		 editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K013 }, 
		 render: function(ui) { var options = K013; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "기준일자", dataType: "string", dataIndx: "stdrDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
        { title: "수신일자", dataType: "string", dataIndx: "rcptDt", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, render: function(ui) { return dateStr(ui.cellData) } },
        { title: "일련번호", dataType: "string", dataIndx: "sn", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "과목코드", dataType: "string", dataIndx: "sbjCd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "금액(천원)", dataType: "string", dataIndx: "amt", align: "right", halign: "center",  format: "#,###", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "처리구분(K009)", dataType: "string", dataIndx: "prcsDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K009 }, render: function(ui) { var options = K009; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "오류코드(K002)", dataType: "string", dataIndx: "errDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K002 }, render: function(ui) { var options = K002; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "오류내용", dataType: "string", dataIndx: "errCtns", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "기관코드(K011)", dataType: "string", dataIndx: "bondIsttDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K011 }, render: function(ui) { var options = K011; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "차주구분(K008)", dataType: "string", dataIndx: "brwrDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K008 }, render: function(ui) { var options = K008; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "법인등록번호", dataType: "string", dataIndx: "crno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "사업자번호", dataType: "string", dataIndx: "bzno", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "거래구분(K014)", dataType: "string", dataIndx: "trDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150, editor: { type: 'select', valueIndx: 'cdValue', labelIndx: 'cdName', options: K014 }, render: function(ui) { var options = K014; var option = options.find(opt => opt.cdValue == ui.cellData); return option ? option.cdValue + '.' + option.cdName : ui.cellData; } },
        { title: "거래번호", dataType: "string", dataIndx: "trNo", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
        { title: "Data구분", dataType: "string", dataIndx: "dataDcd", align: "left", halign: "center", filter: { crules: [{ condition: "range" }] }, width: 150 },
      ];

    let arrPqGridObj = [
		{ id: "TB09012S_gridCpdgList",  colModel: colCpdgList,  height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: true }, strNoRows: "데이터가 없습니다.", },
   		{ id: "TB09012S_gridTransList", colModel: colTransList, height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: true }, strNoRows: "데이터가 없습니다.", },
   	    { id: "TB09012S_gridErrList",   colModel: colErrList,   height: 450, maxHeight: 450, numberCell: { show: true }, editable: true, scrollModel: { autoFit: true }, strNoRows: "데이터가 없습니다.", },
    ];

    setPqGrid(arrPqGridObj);
    arrPqGridObjCpdgList  = $("#TB09012S_gridCpdgList").pqGrid("instance");
    arrPqGridObjTransList = $("#TB09012S_gridTransList").pqGrid("instance");
    arrPqGridObjErrList   = $("#TB09012S_gridErrList").pqGrid("instance");
    

  }  
	// 엑셀업로지 진행여부 확인메시지
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

  //엑셀 다운로드
  function exDnLoad(grd){
		let blob = $("#TB09012S_" + grd).pqGrid("instance").exportExcel({});
		let fileName;

		if (grd == 'gridCpdgList') {
			fileName = "법인채무보증_채무인수약정내역.xlsx";
		} else if (grd == 'gridTransList') {
			fileName = "법인채무보증_채무인수약정_전문송신내역.xlsx";
		} else if (grd == 'gridErrList') {
			fileName = "법인채무보증_채무인수약정_전오류통보내역.xlsx";
		}
		pq.saveAs(blob, fileName);
	}

  	// 엑셀업로드 버튼 클릭
	function exUpLoad(grd) {

		let gcnt = 0;
		if (grd == 'gridCpdgList') {
			gcnt = arrPqGridObjCpdgList.pdata.length;
		} else if (grd == 'gridTransList') {
			gcnt = arrPqGridObjTransList.pdata.length;
		} else if (grd == 'gridErrList') {
			gcnt = arrPqGridObjErrList.pdata.length;
		}

		if (gcnt > 0) {
			confirmMsg(grd);   //엑셀 업로드 진행 확인 
		} else {
			$('#upload-file-' + grd).click();
		}

	}

	// 엑셀업로드 버튼 이벤트 매핑(메인)
	$("#upload-file-gridCpdgList").change(function() {
		readExcelFile('gridCpdgList');
		resetFileInput($('#upload-file-gridCpdgList'));
	});

	// 엑셀업로드 버튼 이벤트 매핑(전송)
  $("#upload-file-gridTransList").change(function() {
		readExcelFile('gridTransList');
		resetFileInput($('#upload-file-gridTransList'));
	});
  
  // 엑셀업로드 버튼 이벤트 매핑(오류)
  $("#upload-file-gridErrList").change(function() {
		readExcelFile('gridErrList');
		resetFileInput($('#upload-file-gridErrList'));
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

		if (grd == 'gridCpdgList') {
			addExcelRows_gridCpdgList(rows);
		} else if (grd == 'gridTransList') {
			addExcelRows_gridTransList(rows);
		} else if (grd == 'gridErrList') {
			addExcelRows_gridErrList(rows);
		}
	}

 // 법인채무보증채무인수약정내역 행추가
	function addExcelRows_gridCpdgList(rows) {

		$("#TB09012S_gridCpdgList").pqGrid("setData", []);
		var ibims754bVOList = [];
		var seq = 0;

		rows.forEach(function(row) {
			var cpdgFcsSn = row['법인채무보증집중일련번호'];
			var errDcd = row['오류코드'];
			var stdrDt =  row['기준일자'];
			var rptsDcd = row['보고서구분(K015)'];
			var sn = ++seq;
			var prcsDcd = row['처리구분'];
			var rgstRsnOcrncDt = row['등록사유발생일자'];
			var lastChngDt = row['최종변경일자'];
			var brwrDcd = row['차주구분'];
			var crno = row['법인등록번호'];
			var bzno = row['사업자등록번호'];
			var eprzNm = row['상호명'];
			var rprsNm = row['대표자성명'];
			var sbjCd = row['과목코드'];
			var amt = row['금액(천원)'];

			var newRow = {
				cpdgFcsSn : cpdgFcsSn,
				errDcd : errDcd,
				stdrDt : stdrDt,
				rptsDcd : rptsDcd,
				prcsDcd : prcsDcd,
				rgstRsnOcrncDt : rgstRsnOcrncDt,
				lastChngDt : lastChngDt,
				brwrDcd : brwrDcd,
				crno : crno,
				bzno : bzno,
				eprzNm : eprzNm,
				rprsNm : rprsNm,
				sbjCd : sbjCd,
				amt : amt,
				sn : sn,
			}

			ibims754bVOList.push(newRow);
			$("#TB09012S_gridCpdgList").pqGrid("addRow", { rowData: newRow, checkEditable: false });
		});

		$("#TB09012S_gridCpdgList").pqGrid("refreshDataAndView");

		// 법인채무보증등 집중내역 등록 (IBIMS754B) 호출 
		saveCpdgList(ibims754bVOList);
	}

// 전문송신내역 행추가
	function addExcelRows_gridTransList(rows) {

		$("#TB09012S_gridTransList").pqGrid("setData", []);
		var ibims754bVOList = [];
		var seq = 0;

		rows.forEach(function(row) {
			var msgTransSn = row['전문송신일련번호'];
			var errDpch = row['오류통보'];
			var stdrDt = row['기준일자'];;
			var transDt = row['송신일자'];
    		var trDcd = row['거래구분(K014)'];
			var fileMsgNm = row['파일전문명'];
			var sendCnt = row['발송건수'];
			var sendTm = row['발송시간'];
			var sendRslt = row['발송결과'];
			var jobDcd = row['업무구분(K013)'];

			var newRow = {
				msgTransSn: msgTransSn,
				errDpch: errDpch,
				stdrDt: stdrDt,
      			transDt: transDt,
				trDcd: trDcd,
				fileMsgNm: fileMsgNm,
				sendCnt: sendCnt,
				sendTm: sendTm,
				sendRslt: sendRslt,
				sn: ++seq,
				scrnDcd: 'TB09012S',
				jobDcd: jobDcd,
			}


			ibims754bVOList.push(newRow);
			$("#TB09012S_TranList").pqGrid("addRow", { rowData: newRow, checkEditable: false });

		});

		$("#TB09012S_TranList").pqGrid("refreshDataAndView");

		//전문송신내역 등록  (IBIMS755B) 호출
		saveTransList(ibims754bVOList);
	}

	// 오류통보내역 행추가
	function addExcelRows_gridErrList(rows) {

		$("#TB09012S_gridErrList").pqGrid("setData", []);
		var ibims754bVOList = [];
			var seq = 0;

		rows.forEach(function(row) {
			var errDpchSn = row['오류통보일련번호'];
			var rcptDt = row['수신일자'];
			var stdrDt = row['기준일자'];
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
				scrnDcd: 'TB09012S',
			}

  		   	ibims754bVOList.push(newRow);

			$("#TB09012S_gridErrList").pqGrid("addRow", { rowData: newRow, checkEditable: false });


		});

		$("#TB09012S_gridErrList").pqGrid("refreshDataAndView");
        
		// 오류통보내역 등록 (IBIMS756B) 호출
		saveErrList(ibims754bVOList);


	}



  	// 법인채무보증채무인수약정내역 저장
	function saveCpdgList(ibims754bVOList) {

    var paramDTO = { "rgstDt": $('#TB09012S_stdrDt').val().replaceAll('-', ''), "ibims754bVOList": ibims754bVOList };

		$.ajax({
			type: "POST",
			url: "/TB09012S/saveCpdgList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "법인채무보증채무인수약정내역이 저장되었습니다.";
				openPopup(option);

				//법인채무보증채무인수약정내역 조회 호출
				cpdgSearch();
			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
		});
	}

	// 전문송신내역 저장
	function saveTransList(ibims754bVOList) {
		var paramDTO = { "rgstDt": $('#TB09012S_stdrDt').val().replaceAll('-', ''), 
			             "scrnDcd": "TB09012S",
						 "ibims754bVOList": ibims754bVOList};

		$.ajax({
			type: "POST",
			url: "/TB09012S/saveTransList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "전문송신내역이 저장되었습니다.";
				openPopup(option);
	            
				//전문송신내역 조회
				cpdgTransSearch(); 

			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
     
		});
	}

	// 오류통보내역 저장
	function saveErrList(ibims754bVOList) {

		var paramDTO = { "rgstDt": $('#TB09012S_stdrDt').val().replaceAll('-', ''), 
			             "scrnDcd": "TB09012S",
						 "ibims754bVOList": ibims754bVOList };

		$.ajax({
			type: "POST",
			url: "/TB09012S/saveErrList",
			data: JSON.stringify(paramDTO),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function() {
				var option = {}
				option.title = "Success";
				option.type = "success";
				option.text = "오류통보내역이 저장되었습니다.";
				openPopup(option);

				//오류전송내역 조회
				cpdgErrSearch();
			},
			error: function(request, status, error) {
				errorMsg("저장 중 오류가 발생했습니다.");
			}
		});
	}

  // 법인채무보증_채무인수 약정 조회
  function cpdgSearch() {
    
    var stdrDt = $("#TB09012S_stdrDt").val().replaceAll("-", ""); // 기준일자
    var prcsDcd = $("#TB09012S_K009").val(); //처리구분
    var rptsDcd = $("#TB09012S_K015").val(); //보고서구분
    var errDcd = $("#TB09012S_K002").val(); // 오류구분

    if (isNotEmpty(stdrDt) ) {
      businessFunction();
    } else {
      alertPopup("기준일자를 확인해주세요.");
    }

    function businessFunction() {
      var dtoParam = {
        stdrDt: stdrDt,
        rptsDcd: rptsDcd,
        errDcd: errDcd,
      };

      $.ajax({
        type: "GET",
        url: "/TB09012S/cpdgSearch",
        data: dtoParam,
        dataType: "json",
      
        success: function (data) {
        
            if (data.length > 0) {
              //조회 결과 
              arrPqGridObjCpdgList.setData(data);
              cpdgTransSearch();  // 전송내역 조회 
              cpdgErrSearch();   // 오류전송내역 
            }
            else {
              // 조회 결과 NotFound
              arrPqGridObjCpdgList.setData([]);
              arrPqGridObjCpdgList.refreshDataAndView();

            }
        },
      });
    }
  }

// 전문송신내역 조회
	 function cpdgTransSearch() {

      var paramData = {
        rgstDt: $("#TB09012S_stdrDt").val().replaceAll("-", ""),
        scrnDcd: "TB09012S",
      };

	
   		$.ajax({
			type: "GET",
			url: "/TB09012S/cpdgTransSearch",
			data: paramData,
			dataType: "json",
			success: function(data) {

			if (data.length == 0) {
		
       			   //errorMsg("데이터가 없습니다.");
				}
                //
				arrPqGridObjTransList.setData(data);

			},
			error: function() {
				errorMsg("데이터 조회 중 오류가 발생했습니다.");
			},
		});

  } 

	

	// 오류통지내역 조회
	 function cpdgErrSearch() {

		var paramData = {
			rgstDt: $("#TB09012S_stdrDt").val().replaceAll("-", ""),
			scrnDcd: "TB09012S",
		};

		$.ajax({
			type: "GET",
			url: "/TB09012S/cpdgErrSearch",
			data: paramData,
			dataType: "json",
			success: function(data) {
	
				if (data.length > 0) {
						//조회 결과 
						arrPqGridObjErrList.setData(data);
						}
				else {
						// 조회 결과 NotFound
						arrPqGridObjErrList.setData([]);

						}

					},
					error: function() {
						errorMsg("데이터 조회 중 오류가 발생했습니다.");
					},
		});
	}
    
	// 날짜 세팅
	function dateStr(str) {
		if (str != null) {
			return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
		} else {
			return '';
		}
	}

	// 전문송신내역 탭 클릭
	function setTranTab() {

		setTimeout(() => arrPqGridObjTransList.refresh(), 1);
	}

	// 오류통보내역 탭 클릭
	function setErrTab() {

		setTimeout(() => arrPqGridObjErrList.refresh(), 1);
	}


  /*초기화 */
  function reset_TB09012S() {
    
    setDateInput();  // 초기 기준일자 
    $("#TB09012S_K015").val(""); //보고서구분
    $("#TB09012S_K002").val(""); //오류구분

    arrPqGridObjCpdgList.setData([]);
	arrPqGridObjCpdgList.refreshDataAndView();

	arrPqGridObjTransList.setData([]);
	arrPqGridObjTransList.refreshDataAndView();

	arrPqGridObjErrList.setData([]);
	arrPqGridObjErrList.refreshDataAndView();

  }
  return {
    cpdgSearch: cpdgSearch,
    reset_TB09012S: reset_TB09012S,
	setTranTab:setTranTab,
    setErrTab:setErrTab,
    exDnLoad: exDnLoad,
 	exUpLoad: exUpLoad,
  };
})();
