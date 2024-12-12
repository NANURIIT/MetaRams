let prfdRankKndCdList;        //우선순위종류코드 list
let prfdRankCrryCdList;       //우선순위통화코드 list
let gridSnrtInfoList;// 선순위정보 그리드 인스턴스
//let prfdRankBcncNmList;       //우선순위거래처명 list 

let TB06013P_pfx;

$(function () {

})
/**
 * show modal
 */
async function callTB06013P(prefix) {

  TB06013P_pfx = prefix;
  //clearTB06013P();

  $("#TB06013P_prefix").val(prefix);
  $("#modal-TB06013P").modal("show");
	indexChangeHandler("TB06013P");
	loadSelectBoxContents_TB06013P();

  if (prefix == 'TB06010S') {
    $("#TB06013P_prdtCd").val($("#TB06010S_prdtCd").val());
    $("#TB06013P_prdtNm").val($("#TB06010S_prdtNm").val());
  } else if (prefix == 'TB06020S') {
    $("#TB06013P_prdtCd").val($("#TB06020S_prdtCd").val());
    $("#TB06013P_prdtNm").val($("#TB06020S_prdtNm").val());
  } else if (prefix == 'TB06030S') {
    $("#TB06013P_prdtCd").val($("#TB06030S_prdtCd").val());
    $("#TB06013P_prdtNm").val($("#TB06030S_prdtNm").val());
  }

  $("#TB06013P_mrtgMngmNo").val($("#" + $("#TB06013P_prefix").val() + "_mrtgMngmNo_forPop").val());
  $("#TB06013P_mrtgNm_forSeach").val($("#" + $("#TB06013P_prefix").val() + "_mrtgNm_forPop").val());

  if (prefix == 'TB06010S') {
    $("#TB06013P_ibDealNo").val($("#TB06010S_ibDealNo").val());
    $("#TB06013P_ibDealNm").val($("#TB06010S_ibDealNm").val());
  } else if (prefix == 'TB06020S') {
    $("#TB06013P_ibDealNo").val($("#TB06020S_ibDealNo").val());
    $("#TB06013P_ibDealNm").val($("#TB06020S_ibDealNm").val());
  } else if (prefix == 'TB06030S') {
    $("#TB06013P_ibDealNo").val($("#TB06030S_ibDealNo").val());
    $("#TB06013P_ibDealNm").val($("#TB06030S_ibDealNm").val());
  }

  await slctBoxSett_TB06013P();
  await setColM_TB06013P();
  // 모달에 진입할때 담보번호와 종목코드가 있으면 자동조회
  let prdtCd = $("#TB06013P_prdtCd").val();
  let mrtgNo = $("#TB06013P_mrtgMngmNo").val();

  if (isNotEmpty(prdtCd) && isNotEmpty(mrtgNo)) {
	await TB06013P_getMrtgInfoDetails();
  }
  
  btnModalReset("init");

}

/**
 * SELECTBOX 세팅
 */
function loadSelectBoxContents_TB06013P(){
	var item = '';
	item += 'I027';					// 투자통화코드
	var selCnt =0;
	selCnt= $("#TB06013P_I027_2  option").length;
	console.log("loadSelectBoxContents_TB06013P:"+selCnt);
	if(selCnt==0 ||selCnt==1) {
		getSelectBoxList('TB06013P', item);
	}	
	 
}


/**
 * 담보 상세조회 
 */
function getMrtgInfoDetails(arg){
  if(arg==null || arg ==undefined){
	arg=0;
  }
  let prdtCd = $("#TB06013P_prdtCd").val();
  let mrtgNo = $("#TB06013P_mrtgMngmNo").val();

  if (isNotEmpty(prdtCd) && isNotEmpty(mrtgNo)) {
	 TB06013P_getMrtgInfoDetails();
  }else if(arg==1){
	swal.fire({
       icon: "warning",
       text: "조회할 담보번호가 존재하지 않습니다.",
       confirmButtonText: "확인",
     });
	return ;
  }
}


/**
 * 담보번호 변경이벤트
 */
function chngMrtgMngmNo(e) {
  if (e.value.length === 0) {
    btnModalReset("modalReset");
  } else if (e.value.length === 16) {
	getMrtgInfoDetails();
  }
}

// 필터링 이벤트
function filterSelectBox(obj, childObj) {
  let slctValue = $("#" + obj.id + " option:selected").val();
  if (isEmpty(slctValue)) {
    $("#" + childObj).prop('disabled', true);
  } else {
    $("#" + childObj).prop('disabled', false);
  }

  for (let i = 0; i < $("#" + childObj + " option").length; i++) {
    if ($("#" + childObj + " option").eq(i).val().substring(0, 2) === slctValue) {
      $("#" + childObj + " option").eq(i).css('display', 'block');
    } else {
      $("#" + childObj + " option").eq(i).css('display', 'none');
    }
  }
  $("#" + childObj).val('')
}


function btnModalReset(mode) {
  let prdtCd = $("#TB06013P_prdtCd").val();
  let prdtNm = $("#TB06013P_prdtNm").val();
  let mrtgNo = $("#TB06013P_mrtgMngmNo").val();
  let mrtgNm = $("#TB06013P_mrtgNm_forSeach").val();
  let modalId = document.getElementById("modal-TB06013P");
  let fmIputLngth = modalId.querySelectorAll("input").length;
  let fmSlctLngth = modalId.querySelectorAll("select").length;
  
  $("#TB06013P_connPrdtCd").val("");
   for (let i = 0; i < fmIputLngth; i++) {
     modalId.querySelectorAll("input")[i].value = "";
   }
   for (let i = 0; i < fmSlctLngth; i++) {
     modalId.querySelectorAll("select")[i].value = "";
   }
  $("#TB06013P_snrtInfoList").pqGrid("option", "dataModel.data", []);
  $("#TB06013P_snrtInfoList").pqGrid("refreshDataAndView");	// pqgrid 초기화

  switch (mode) {
	case "init":
		$("#TB06013P_prdtCd").val(prdtCd);
		$("#TB06013P_prdtNm").val(prdtNm);
		$("#TB06013P_mrtgMngmNo").val(mrtgNo);
		$("#TB06013P_mrtgNm_forSeach").val(mrtgNm);	
	break;	
    case "modalReset":
		$("#TB06013P_prdtCd").val(prdtCd);
		$("#TB06013P_prdtNm").val(prdtNm);
	break; 
    default:
      break;
  }
  
  $("#TB06013P_E028 option:eq(0)").prop('selected', true);
  $("#TB06013P_M008 option:eq(0)").prop('selected', true);
  $("#TB06013P_M009 option:eq(0)").prop('selected', true);
  $("#TB06013P_M009").prop('disabled', true);
  setKRKRW("TB06013P");
  setSelectBoxMrtgKndCd();	
  
  $("input[id*='Amt'], input[id*='Prc'], input[id*='Rt'], input[id*='Qnt'], input[id*='Unpr'], input[id*='Prc_etc'], input[id*='Prna']" ).val("0");
  selectorNumberFormater($("input[id*='Amt'], input[id*='Prc'], input[id*='Rt'], input[id*='Qnt'], input[id*='Unpr'], input[id*='Prc_etc'], input[id*='Prna']"));

}

function slctBoxSett_TB06013P() {        //colM selectBox 세팅...

  /********************************************************************
   * P007 우선순위종류코드
   * I027 통화코드 (우선순위통화)
  *******************************************************************/

  let selectBox = getSelectBoxList('TB06015', 'P007/I027', false);

  prfdRankKndCdList = selectBox.filter(function (item) {          //우선순위종류코드
    return item.cmnsGrpCd === 'P007';
  });

  prfdRankCrryCdList = selectBox.filter(function (item) {          //우선순위통화코드
    return item.cmnsGrpCd === 'I027';
  });
}

async function setColM_TB06013P() {

  let colM_snrtInfo = [
    // {
    //   title: "순번",
    //   dataType: "string",
    //   dataIndx: "stdrSn",
    //   align: "right",
    //   halign: "center",
    //   editable: true,
    //   width: "",
    //   filter: { crules: [{ condition: 'range' }] } 
    // },
    {
      title: "선순위종류",
      dataType: "string",
      dataIndx: "prfdRankKndCd",
      align: "right",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] },
      editor: {
        type: "select",
        valueIndx: "cdValue",
        labelIndx: "cdName",
        options: prfdRankKndCdList
      },
      render: function (ui) {
        var options = prfdRankKndCdList
        var option = options.find(opt => opt.cdValue == ui.cellData);
        return option ? option.cdName : ui.cellData;
      },
    },
    {
      title: "우선순위",
      dataType: "string",
      dataIndx: "prfdRank",
      align: "right",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] }
    },
    {
      title: "우선순위거래처명",
      dataType: "string",
      dataIndx: "prfdRankBcncNm",
      align: "left",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] }
    },
    {
      title: "선순위통화",
      dataType: "string",
      dataIndx: "prfdRankCrryCd",
      align: "right",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] },
      editor: {
        type: "select",
        valueIndx: "cdValue",
        labelIndx: "cdName",
        options: prfdRankCrryCdList
      },
      render: function (ui) {
        var options = prfdRankCrryCdList
        var option = options.find(opt => opt.cdValue == ui.cellData);
        return option ? option.cdName : ui.cellData;
      },
    },
    {
      title: "선순위금액",
      dataType: "string",
      dataIndx: "prfdRankAmt",
      align: "right",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] },
      render: function (ui) {
        var value = parseFloat(ui.cellData);

        var formattedValue = value.toLocaleString('ko-KR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });

        return formattedValue;
      }
    },
    {
      title: "선순위원화환산액",
      dataType: "string",
      dataIndx: "krwTrslPrfdRankAmt",
      align: "right",
      halign: "center",
      editable: true,
      width: "",
      filter: { crules: [{ condition: 'range' }] },
      render: function (ui) {
        var value = parseFloat(ui.cellData);

        var formattedValue = value.toLocaleString('ko-KR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });

        return formattedValue;
      }
    }
  ]

  const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
  await sleep(300);
  showGrid_TB06013P(colM_snrtInfo);
  await sleep(300);


}


function showGrid_TB06013P(colM) {
  var obj = {

    height: 140,
    maxHeight: 140,
    showTitle: false,
    showToolbar: false,
    collapsible: false,
    wrap: false,
    hwrap: false,
    numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" },
    editable: true,
    //toolbar: toolbar,
    scrollModel: { autoFit: true },
    colModel: colM,
    strNoRows: '데이터가 없습니다.'
    //dataModel: {data: data}
  };

  if (typeof gridSnrtInfoList == "undefined") {

    $("#TB06013P_snrtInfoList").pqGrid(obj);
    gridSnrtInfoList = $("#TB06013P_snrtInfoList").pqGrid('instance');

  }

}

/**
 * hide modal
 */
function modalClose_TB06013P() {
  $("#modal-TB06013P").modal("hide");
  var prdtCd;
  //if($("#TB06013P_prefix").val() == 'TB06010S') {
  //  	prdtCd = $("#TB06010S_res_prdtCd").val();       
  //  } else if ($("#TB06013P_prefix").val() == 'TB06020S') {
  //	prdtCd = $("#TB06020S_res_prdtCd").val();
  //  } else if ($("#TB06013P_prefix").val() == 'TB06030S') {
  prdtCd = $("#TB06030S_res_prdtCd").val();
  //  }
  $("#" + $("#TB06013P_prefix").val() + "_mrtgMngmNo_forPop").val($("#TB06013P_mrtgMngmNo").val());
  $("#" + $("#TB06013P_prefix").val() + "_mrtgNm_forPop").val($("#TB06013P_mrtgNm_forSeach").val());

  if (TB06013P_pfx === 'TB06010S') {
    TB06010Sjs.getIBIMS212BDTOInfo(prdtCd);
  } else if (TB06013P_pfx === 'TB06020S') {
    TB06020Sjs.getIBIMS212BDTOInfo(prdtCd);
  } else if (TB06013P_pfx === 'TB06030S') {
    TB06030Sjs.getIBIMS212BDTOInfo(prdtCd);
  }
  btnModalReset("modalReset");
  //var prdtCd = $("#TB06010S_res_prdtCd").val();
  //getIBIMS212BDTOInfo(prdtCd);
}

/**
 * hide modal
 */
$("#modal-TB06013P").on("hide.bs.modal", function (e) {
  /* datepicker로 클래스가 잡히질 않아 date로 된 클래스로 이벤트 전파 막음 */
  if ($(e.target).hasClass('date')) {
    return;
  }

  var prdtCd;
  //	if($("#TB06013P_prefix").val() == 'TB06010S') {
  //    prdtCd = $("#TB06010S_res_prdtCd").val(); 
  //	} else if ($("#TB06013P_prefix").val() == 'TB06020S') {
  //	    prdtCd = $("#TB06020S_res_prdtCd").val();
  //	} else if ($("#TB06013P_prefix").val() == 'TB06030S') {
  prdtCd = $("#" + $("#TB06013P_prefix").val() + "_res_prdtCd").val();
  //	}
  if (TB06013P_pfx === 'TB06010S') {
    TB06010Sjs.getIBIMS212BDTOInfo(prdtCd);
  } else if (TB06013P_pfx === 'TB06020S') {
    TB06020Sjs.getIBIMS212BDTOInfo(prdtCd);
  } else if (TB06013P_pfx === 'TB06030S') {
    TB06030Sjs.getIBIMS212BDTOInfo(prdtCd);
  }
  btnModalReset("modalReset");
});

//선순위정보 행추가 (맨 아래에 추가)
function addRow_TB06013P() {

  var rowData = {
    "prfdRankKndCd": '1',
    "seq": '',
    "prfdRankCrryCd": 'KRW',
    "prfdRankAmt": 0,
    "krwTrslPrfdRankAmt": 0
  }

  $("#TB06013P_snrtInfoList").pqGrid("addRow", { rowData: rowData, checkEditable: false });
}

//선순위정보 행삭제 (맨 아래부터 삭제)
function dltRow_TB06013P() {

  var gridLgth = $("#TB06013P_snrtInfoList").pqGrid('option', 'dataModel.data').length;

  $("#TB06013P_snrtInfoList").pqGrid("deleteRow", { rowIndx: gridLgth - 1 });

}

// /**
//  * clear modal
//  */
// function clearTB06013P() {
//   $("#TB06013P_stockItemCd").val("");
//   $("#TB06013P_stockItemNm").val("");
// }

// /**
//  * dblclick event function
//  */
// function setStockInfo(e) {
//   var tr = $(e);
//   var td = $(tr).children();

//   // 종목정보
//   var stockItemCd = td.eq(0).text();
//   var stockItemNm = td.eq(1).text();

//   // 페이지 항목
//   var pageStockItemCd = "#" + $("#TB06013P_prefix").val() + "_stockItemCd";
//   var pageStockItemNm = "#" + $("#TB06013P_prefix").val() + "_stockItemNm";

//   // 값 전달
//   $(pageStockItemCd).val(stockItemCd);
//   $(pageStockItemNm).val(stockItemNm);

//   modalClose_TB06013P();
// }

function onChangeSelectBoxMrtgKndCd() {
  $("#TB06013P_E028").on("change", function () {
   	setSelectBoxMrtgKndCd();
  });
}


function setSelectBoxMrtgKndCd() {
    var mrtgKndCdVal = $("#TB06013P_E028").val();
    var classNm = ".mrtgStupKndCd";
    var mrtgStupKndCd = classNm + mrtgKndCdVal;
    var sbValue = $("#TB06013P_E028 option:selected").html();
    var index = sbValue.indexOf(" ");
    var selectedName = sbValue.substring(0, index);

    $("#sbName").html("▶&nbsp;" + selectedName + "감정");
    $(classNm).hide();
    $(mrtgStupKndCd).show();
	let id2 = document.getElementById("areaMrtgKndCd");
	let fmIputLngth2 = id2.querySelectorAll("input").length;
	let fmSlctLngth2 = id2.querySelectorAll("select").length;
	for (let i = 0; i < fmIputLngth2; i++) {
	  id2.querySelectorAll("input")[i].value = "";
	}
	for (let i = 0; i < fmSlctLngth2; i++) {
	  id2.querySelectorAll("select")[i].value = "";
	}
}

// 실행버튼 동작
function onClickExecute() {
  //if ($("#TB06013P_toggleBtn1").attr("class").includes("btn-info")) {
  var paramData = getParamData();
  var check10reqCnt;
  
  //보증담보 선택시 by hytest
  if(paramData.eprzCrdlWeekMrtgKndCd=='10'){
	if(isEmpty(paramData.grteCtrcDcd)) check10reqCnt="보증약정구분코드";
	else if(isEmpty(paramData.grnrCpin)) check10reqCnt="보증인고객식별번호";
	else if(isEmpty(paramData.grupItgrCrdtGrdDcd)) check10reqCnt="그룹통합신용등급구분코드";
	else if(isEmpty(paramData.dbtrCpin)) check10reqCnt="채무자고객식별번호";
	else if(isEmpty(paramData.grteDbtrRltnDcd)) check10reqCnt="보증채무자관계구분코드";
	else if(isEmpty(paramData.grteAmt)) check10reqCnt="보증금액";
	else if(isEmpty(paramData.grtePrna)) check10reAqCnt="보증원금";	
	else if(isEmpty(paramData.grteCrryCd)) check10reqCnt="보증통화코드";	
	else if(isEmpty(paramData.stlaOrznBlngDcd)) check10reqCnt="결산기구분코드";	
	else if(isEmpty(paramData.grteStlaDeEtcDcd)) check10reqCnt="보증결산일기타구분코드";	
	else if(isEmpty(paramData.mrtgGrteCtns)) check10reqCnt="담보보증내용";	
  }

  if(check10reqCnt!=null && check10reqCnt!=undefined){
	  var option = {}
	  option.title = "Error";
	  option.type = "error";
	  option.text = check10reqCnt+"을(를) 입력해주세요";
	  openPopup(option);
	  return false;
  }
  
  if (isEmpty(paramData.mrtgMngmNo)) {
    regist(paramData);
  } else {
    modify(paramData);
  }
  //} else if ($("#TB06013P_toggleBtn2").attr("class").includes("btn-info")) {
  //modify();
  //} else if ($("#TB06013P_toggleBtn3").attr("class").includes("btn-info")) {
  //remove();
  //}
}

function regist(paramData) {
  $.ajax({
    type: "POST",
    url: "/TB06013P/registMtrt",
    data: JSON.stringify(paramData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      btnModalReset();
      $("#TB06013P_mrtgMngmNo").val(data)
      $("#TB06013P_mrtgNm_forSeach").val($("#TB06013P_mrtgNm").val());
      openPopup({ type: "success", title: "Success", text: '담보/보증 등록을 완료하였습니다.' });      
	  getMrtgInfoDetails();
    },
  });
}

function modify(paramData) {
  $.ajax({
    type: "POST",
    url: "/TB06013P/modifyMtrt",
    data: JSON.stringify(paramData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      btnModalReset("modalReset");
      $("#TB06013P_mrtgMngmNo").val(paramData.mrtgMngmNo);
      $("#TB06013P_mrtgNm_forSeach").val(paramData.mrtgNm);
      openPopup({ type: "success", title: "Success", text: '담보/보증 수정을 완료하였습니다.' });
	  getMrtgInfoDetails();
    },
  });
}

function remove() {

  if (isNotEmpty($("#TB06013P_connPrdtCd").val())) {
	var option = {}
	option.title = "Error";
	option.type = "error";
    option.text = "연결된 담보가 존재합니다.";
    openPopup(option);
    return false;
  }
  
  var paramData = getParamData();
  
  //추가(by hyTest)
  if(isEmpty(paramData.mrtgMngmNo)){
	var option = {}
		option.title = "Error";
		option.type = "error";
		option.text = "삭제할 담보번호를 선택해주세요.";
		openPopup(option);
		return false;
  }
  
  console.log("mrtgMngmNo"+paramData.mrtgMngmNo);
  
  $.ajax({
    type: "POST",
    url: "/TB06013P/removeMtrt",
    data: JSON.stringify(paramData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      openPopup({ type: "success", title: "Success", text: '담보/보증을 삭제하였습니다.' });
      btnModalReset("modalReset");
    },
  });
}

function getParamData() {
  let prfdRankLength = gridSnrtInfoList.pdata.length;
  let prfdRankList = [];
  for (let i = 0; i < prfdRankLength; i++) {
    var objPrfdRank = {
      mrtgMngmNo: $("#TB06013P_mrtgMngmNo").val(), // 담보관리번호
      stdrSn: i, // 기준일련번호
      prfdRank: gridSnrtInfoList.pdata[i].prfdRank,
      prfdRankKndCd: gridSnrtInfoList.pdata[i].prfdRankKndCd,
      prfdRankBcncNm: gridSnrtInfoList.pdata[i].prfdRankBcncNm,
      prfdRankCrryCd: gridSnrtInfoList.pdata[i].prfdRankCrryCd,
      prfdRankAmt: Number(gridSnrtInfoList.pdata[i].prfdRankAmt),
      krwTrslPrfdRankAmt: Number(gridSnrtInfoList.pdata[i].krwTrslPrfdRankAmt),
    };
    prfdRankList.push(objPrfdRank);
  }


  // alert($("#TB06010S_ibDealNo").val());
  var paramData = {
    prdtCd: $("#TB06013P_prdtCd").val(),
    //IBIMS211B
    mrtgMngmNo: $("#TB06013P_mrtgMngmNo").val(),                        // 담보관리번호
    invJdgmDealNo: $("#TB06010S_ibDealNo").val(),                       // 투자심사딜번호
    mrtgNm: $("#TB06013P_mrtgNm").val(),                                // 담보명
    mrtgLclsCd: $("#TB06013P_M008").val(),                              // 담보대분류코드
    mrtgMdclCd: $("#TB06013P_M009").val(),                              // 담보중분류코드
    mrtgDtlUsgeCtns: $("#TB06013P_mrtgDtlUsgeCtns").val(),              // 담보세부용도내용 (비고)
    mrtgCrryCd: $("#TB06013P_I027").val(),                              // 담보통화코드
    mrtgEvlAmt: $("#TB06013P_mrtgEvlAmt").val().replaceAll(",", ""),   // 담보평가금액
    mrtgEvlDt: $("#TB06013P_rgstDt").val().replaceAll("-", ""),        // 담보평가일자
    rgstDt: getToday().replaceAll("-", ""),                            // 등록일자
    mrtgCclcDt: $("#TB06013P_mrtgCclcDt").val().replaceAll("-", ""),   // 담보해지일자
    trOthrDscmNo: $("#TB06013P_bsnsRgstNo").val().replaceAll("-", ""), // 거래상대방식별번호
    trOthrNm: $("#TB06013P_entpRnm").val(),                             // 거래상대방명
    trEmpno: $("#TB06013P_empNo").val(),                                // 거래담당자 (사원번호)
    mrtgEvlStdrCd: $("#TB06013P_M006").val(),                           // 담보평가기준코드
    avblMrtgPrc: $("#TB06013P_avblMrtgPrc").val().replaceAll(",", ""), // 가용담보가격
    eprzCrdlWeekMrtgKndCd: $("#TB06013P_E028").val(),                  // 담보종류코드 
	mrtgStupKndCd: $("#TB06013P_M011").val(),                  			// 담보설정종류코드  (todo: 담보종류??)
    stupCrryCd: $("#TB06013P_I027_3").val(),                            // 설정통화코드
    stupTopAmt: $("#TB06013P_stupTopAmt").val().replaceAll(",", ""),   // 설정최고금액
    krwTrslStupTopAmt: $("#TB06013P_krwTrslStupTopAmt").val().replaceAll(",", ""), // 원화환산설정최고금액
    cprnMrtgRto: $("#TB06013P_cprnMrtgRto").val(), // 공동담보비율
    valtMrtgPrc: $("#TB06013P_valtMrtgPrc").val().replaceAll(",", ""), // 유효담보가격
    krwTrslValtMrtgPrc: $("#TB06013P_krwTrslValtMrtgPrc").val().replaceAll(",", ""), // 원화환산유효담보가격
    delYn: "N", // 삭제여부
    // IBIMS214B
    drcMrtgYn:
      $("#TB06013P_toggleBtn11").attr("class").includes("btn-info") == true
        ? "Y"
        : "N", // 직접담보여부
    ovssMrtgYn: $("#TB06013P_D009").val(), // 국외담보여부
    aprsMthCd: $("#TB06013P_A009").val(), // 감정방법코드(감정구분코드)
    aprsEvlIsttCd: $("#TB06013P_A008").val(), // 감정평가기관코드
    crevIsttNm: $("#TB06013P_crevIsttNm").val(), // 시가평가기관명
    crevStdrCd: $("#TB06013P_C013").val(), // 시가평가기준코드
    aprsPrpsCd: $("#TB06013P_A010").val(), // 감정목적코드
    aprsDt: $("#TB06013P_aprsDt").val().replaceAll("-", ""), // 감정일자
    lctpAddr: $("#TB06013P_lctpAddr").val(), // 소재지주소
    rlesSqmsCtns: $("#TB06013P_rlesSqmsCtns").val(), // 부동산면적내용
    aprsCrryCd: $("#TB06013P_I027_2").val(), // 감정통화코드
    aprsPrc: $("#TB06013P_aprsPrc").val().replaceAll(",", ""), // 감정가격
    krwTrslAprsPrc: $("#TB06013P_krwTrslAprsPrc").val().replaceAll(",", ""), // 원화환산감정가격
    mrtgRcgRto: $("#TB06013P_mrtgRcgRto").val(), // 담보인정비율
    mrtgRto: $("#TB06013P_mrtgRto").val(), // 담보비율
    mrtgPrc: $("#TB06013P_mrtgPrc").val().replaceAll(",", ""), // 담보가격
    // IBIMS215B
    mrtgCtns: $("#TB06013P_mrtgCtns").val(), // 담보내용
    mvppMrtgKndCd: $("#TB06013P_M012").val(), // 동산담보종류코드
    opprPrsmFdtnCtns: $("#TB06013P_opprPrsmFdtnCtns").val(), // 시가추정근거내용
    mrtgAcqMthCd: $("#TB06013P_M004").val(), // 담보취득방법코드
    // IBIMS216B
    grteCtrcDcd: $("#TB06013P_G002").val(), // 보증약정구분코드
    grnrCpin: $("#TB06013P_grnrCpin").val().replaceAll("-", ""), // 보증인고객식별번호
    grupItgrCrdtGrdDcd: $("#TB06013P_I012").val(), // 그룹통합신용등급구분코드
    crdtInqDt: $("#TB06013P_crdtInqDt").val(), // 신용조회일자
    dbtrCpin: $("#TB06013P_dbtrCpin").val(), // 채무자고객식별번호
    grteDbtrRltnDcd: $("#TB06013P_G003").val(), // 보증채무자관계구분코드
    grteAmt: $("#TB06013P_grteAmt").val(), // 보증금액
    grtePrna: $("#TB06013P_grtePrna").val().replaceAll(",", ""), // 보증원금
    grteCrryCd: $("#TB06013P_I027_4").val(), // 보증통화코드
    stlaOrznBlngDcd: $("#TB06013P_S004").val(), // 결산기구분코드
    grteStlaDe: $("#TB06013P_grteStlaDe").val().replaceAll("-", ""), // 보증결산일
    grteStlaDeEtcDcd: $("#TB06013P_G007").val(), // 보증결산일기타구분코드
    mrtgGrteCtns: $("#TB06013P_mrtgGrteCtns").val(), // 담보보증내용
    // IBIMS217B
    grteIsttDcd: $("#TB06013P_G006").val(), // 보증기관구분코드
    grteIsttCd: $("#TB06013P_G005").val(), // 보증기관코드
    grteIsttNm: $("#TB06013P_grteIsttNm").val(), // 보증기관명
    lgrteNm: $("#TB06013P_lgrteNm").val(), // 보증서명
    grteExprDt: $("#TB06013P_grteExprDt").val().replaceAll(",", ""), // 보증만료일자
    // IBIMS218B
    etcMrtgTpCd: $("#TB06013P_E033").val(), // 기타담보유형코드
    etcMrtgKndCd: $("#TB06013P_E032").val(), // 기타담보종류코드
    mrtgCdCtns: $("#TB06013P_mrtgCdCtns").val(), // 담보코드내용
    etcMrtgGrdCtns: $("#TB06013P_etcMrtgGrdCtns").val(), // 기타담보등급내용
    mrtgQnt: $("#TB06013P_mrtgQnt").val(), // 담보수량
    mrtgUnpr: $("#TB06013P_mrtgUnpr").val().replaceAll(",", ""), // 담보단가
    mrtgAmt: $("#TB06013P_mrtgAmt").val().replaceAll(",", ""), // 담보금액
    avblMrtgPrcEtc: $("#TB06013P_avblMrtgPrc_etc").val().replaceAll(",", ""), // 가용담보가격
    etcMrtgAcqMthCd: $("#TB06013P_E031").val(), // 기타담보취득방법코드
    // IBIMS219B
    dmsOvrsFndDcd: $("#TB06013P_D009").val(), // 국내/국외 구분
	ovssEvlIsttYn: $("#TB06013P_ovssEvlIsttYn").val(), // 국외평가기관여부
    rlthMrtgKndCd: $("#TB06013P_R019").val(), // 실물담보종류코드
    aprsStdrCd: $("#TB06013P_A011").val(), // 감정기준코드
    prfdRankList: prfdRankList // 선순위그리드
  };
  return paramData;
}

function getPrfdRankInfo() {

  let param =
  {
    mrtgMngmNo: $("#TB06013P_mrtgMngmNo").val()
  }
  $.ajax({
    type: "POST",
    url: "/TB06013P/prfdRankInfo",
    data: param,
    dataType: "json",
    success: function (data) {

      gridSnrtInfoList.setData(data);
    }
  });
}

function TB06013P_getMrtgInfoDetails() {
	
 console.log("TB06013P_getMrtgInfoDetails");
  var paramData = {
    mrtgMngmNo: $("#TB06013P_mrtgMngmNo").val(),
    invJdgmDealNo: $("#TB06010S_ibDealNo").val(),
    prdtCd: $("#TB06013P_prdtCd").val()
  };
  $("#TB06013P_connPrdtCd").val("");
  //alert($("#TB06013P_mrtgMngmNo").val());

  $.ajax({
    type: "GET",
    url: "/TB06017P/mrtgInfoDetails",
    data: paramData,
    dataType: "json",
    success: function (data) {
      var infoDetails = data;

	  console.log("infoDetails.prdtCd"+infoDetails.prdtCd);
	  console.log("TB06013P_prdtCd"+$("#TB06013P_prdtCd").val());
      if (isNotEmpty(infoDetails.prdtCd)) {
        if ($("#TB06013P_prdtCd").val() == infoDetails.prdtCd) {
          $("#TB06013P_connPrdtCd").val(infoDetails.prdtCd);  // 연결정보
        } else {
          $("#TB06013P_connPrdtCd").val("");
        }
      }

      $("#TB06013P_mrtgMngmNo").val(infoDetails.mrtgMngmNo);
      // $("#TB06013P_mrtgMngmNo_002").val(infoDetails.invJdgmDealNo);
      // $("#TB06013P_ibDealNo_002").val(infoDetails.invJdgmDealNo);
      $("#TB06013P_E028").val(infoDetails.eprzCrdlWeekMrtgKndCd).prop("selected", true).change();
      $("#TB06013P_M008").val(infoDetails.mrtgLclsCd).prop("selected", true).change();
      $("#TB06013P_M009").val(infoDetails.mrtgMdclCd).prop("selected", true).change();
      $("#TB06013P_mrtgNm").val(infoDetails.mrtgNm);
      $("#TB06013P_rgstDt").val(formatDate(infoDetails.rgstDt));                  //등록일자
      $("#TB06013P_mrtgCclcDt").val(formatDate(infoDetails.mrtgCclcDt));          //해지일자 
      $("#TB06013P_empNo").val(infoDetails.trEmpno);
      $("#TB06013P_bsnsRgstNo").val(infoDetails.trOthrDscmNo);
      $("#TB06013P_entpRnm").val(infoDetails.trOthrNm);
      $("#TB06013P_M006").val(infoDetails.mrtgEvlStdrCd);
      $("#TB06013P_I027").val(infoDetails.mrtgCrryCd);                            //통화코드
      $("#TB06013P_empNm").val(infoDetails.empNm);
      infoDetails.mrtgEvlAmt ? $("#TB06013P_mrtgEvlAmt").val(addComma(infoDetails.mrtgEvlAmt)) : $("#TB06013P_mrtgEvlAmt").val(infoDetails.mrtgEvlAmt); //담보 평가금액
      $("#TB06013P_mrtgDtlUsgeCtns").val(infoDetails.mrtgDtlUsgeCtns);            //비고
      infoDetails.avblMrtgPrc ? $("#TB06013P_avblMrtgPrc").val(addComma(infoDetails.avblMrtgPrc)) : $("#TB06013P_avblMrtgPrc").val(infoDetails.avblMrtgPrc); // 가용담보가(원액)
      $("#TB06013P_I027_3").val(infoDetails.stupCrryCd).prop("selected", true); // 설정통화
      $("#TB06013P_cprnMrtgRto").val(infoDetails.cprnMrtgRto); // 공동담보비율
      infoDetails.krwTrslStupTopAmt ? $("#TB06013P_krwTrslStupTopAmt").val(addComma(infoDetails.krwTrslStupTopAmt)) : $("#TB06013P_krwTrslStupTopAmt").val(infoDetails.krwTrslStupTopAmt); // 설정최고액(원화)
      infoDetails.stupTopAmt ? $("#TB06013P_stupTopAmt").val(addComma(infoDetails.stupTopAmt)) : $("#TB06013P_stupTopAmt").val(infoDetails.stupTopAmt); // 설정최고액
      $("#TB06013P_M011").val(infoDetails.mrtgStupKndCd).prop("selected", true); // 설정종류 
      infoDetails.krwTrslValtMrtgPrc ? $("#TB06013P_krwTrslValtMrtgPrc").val(addComma(infoDetails.krwTrslValtMrtgPrc)) : $("#TB06013P_krwTrslValtMrtgPrc").val(infoDetails.krwTrslValtMrtgPrc); // 유효담보가(원화)
      infoDetails.valtMrtgPrc ? $("#TB06013P_valtMrtgPrc").val(addComma(infoDetails.valtMrtgPrc)) : $("#TB06013P_valtMrtgPrc").val(infoDetails.valtMrtgPrc); // 유효담보가
      // 담보종류 분기
      switch (infoDetails.eprzCrdlWeekMrtgKndCd) {
        // 부동산
        case "2":
          $("#TB06013P_A009").val(infoDetails.aprsMthCd).prop("selected", true); // 감정구분코드
          $("#TB06013P_D009").val(infoDetails.ovssMrtgYn).prop("selected", true); // 국내국외구분코드
          $("#TB06013P_A008").val(infoDetails.aprsEvlIsttCd).prop("selected", true); // 감정기관
          $("#TB06013P_C013").val(infoDetails.crevStdrCd).prop("selected", true); // 감정평가기준
          $("#TB06013P_rlesSqmsCtns").val(infoDetails.rlesSqmsCtns);  // 면적
          $("#TB06013P_A010").val(infoDetails.aprsPrpsCd).prop("selected", true);;  // 감정목적
          $("#TB06013P_aprsDt").val(formatDate(infoDetails.aprsDt)); // 감정일자
          $("#TB06013P_lctpAddr").val(infoDetails.lctpAddr);  // 소재지
          $("#TB06013P_crevIsttNm").val(infoDetails.crevIsttNm); // 평가기관명
          infoDetails.aprsPrc ? $("#TB06013P_aprsPrc").val(addComma(infoDetails.aprsPrc)) : $("#TB06013P_aprsPrc").val(infoDetails.aprsPrc); // 감정가격
          $("#TB06013P_I027_2").val(infoDetails.aprsCrryCd).prop("selected", true); // 감정통화
          infoDetails.krwTrslAprsPrc ? $("#TB06013P_krwTrslAprsPrc").val(addComma(infoDetails.krwTrslAprsPrc)) : $("#TB06013P_krwTrslAprsPrc").val(infoDetails.krwTrslAprsPrc); // 감정가격(원화)
          $("#TB06013P_mrtgRto").val(infoDetails.mrtgRto); // 담보비율
          $("#TB06013P_mrtgRcgRto").val(infoDetails.mrtgRcgRto); // 담보인정비율
          infoDetails.mrtgPrc ? $("#TB06013P_mrtgPrc").val(addComma(infoDetails.mrtgPrc)) : $("#TB06013P_mrtgPrc").val(infoDetails.mrtgPrc); // 담보인정가액(원화)
          break;
        // 동산
        case "3":
          $("#TB06013P_A009").val(infoDetails.aprsMthCd).prop("selected", true); // 감정구분코드
          $("#TB06013P_A008").val(infoDetails.aprsEvlIsttCd).prop("selected", true); // 감정기관
          $("#TB06013P_aprsDt").val(formatDate(infoDetails.aprsDt)); // 감정일자
          infoDetails.aprsPrc ? $("#TB06013P_aprsPrc").val(addComma(infoDetails.aprsPrc)) : $("#TB06013P_aprsPrc").val(infoDetails.aprsPrc); // 감정가격
          $("#TB06013P_mrtgRto").val(infoDetails.mrtgRto); // 담보비율
          $("#TB06013P_mrtgPrc").val(infoDetails.mrtgPrc); // 담보인정가액(원화)
          $("#TB06013P_mrtgCtns").val(infoDetails.mrtgCtns); // 담보내용
          $("#TB06013P_M012").val(infoDetails.mvppMrtgKndCd).prop("selected", true); // 동산담보종류코드
          $("#TB06013P_opprPrsmFdtnCtns").val(infoDetails.opprPrsmFdtnCtns); // 시가추정근거내용 
          $("#TB06013P_M004").val(infoDetails.mrtgAcqMthCd).prop("selected", true); // 담보취득방법코드
          break;
        // 보증서
        case "5":
		  console.log("grteIsttCd:"+infoDetails.grteIsttDcd)	
          $("#TB06013P_mrtgRcgRto").val(infoDetails.mrtgRcgRto); // 담보비율
          $("#TB06013P_mrtgPrc").val(infoDetails.mrtgPrc); // 담보인정가액(원화)
          $("#TB06013P_grteAmt").val(infoDetails.grteAmt); // 보증금액
          $("#TB06013P_I027_4").val(infoDetails.grteCrryCd).prop("selected", true); // 보증통화코드
          $("#TB06013P_mrtgGrteCtns").val(infoDetails.mrtgGrteCtns); // 담보보증내용
          $("#TB06013P_G006").val(infoDetails.grteIsttDcd).prop("selected", true); // 보증기관구분코드
          $("#TB06013P_G005").val(infoDetails.grteIsttCd).prop("selected", true); // 보증기관코드
          $("#TB06013P_grteIsttNm").val(infoDetails.grteIsttNm); // 보증기관명
          $("#TB06013P_lgrteNm").val(infoDetails.lgrteNm); // 보증서명 
          $("#TB06013P_grteExprDt").val(infoDetails.grteExprDt); // 보증만료일자
          break;
        // 기타
        case "8":
          $("#TB06013P_mrtgRto").val(infoDetails.mrtgRto); // 담보비율
          $("#TB06013P_mrtgCtns").val(infoDetails.mrtgCtns); // 담보내용
          $("#TB06013P_E033").val(infoDetails.etcMrtgTpCd).prop("selected", true); // 기타담보유형코드
          $("#TB06013P_E032").val(infoDetails.etcMrtgKndCd).prop("selected", true); // 기타담보종류코드
          $("#TB06013P_mrtgCdCtns").val(infoDetails.mrtgCdCtns); // 담보코드내용
          $("#TB06013P_etcMrtgGrdCtns").val(infoDetails.etcMrtgGrdCtns); // 기타담보등급내용
          $("#TB06013P_mrtgQnt").val(infoDetails.mrtgQnt); // 담보수량 
          infoDetails.mrtgUnpr ? $("#TB06013P_mrtgUnpr").val(addComma(infoDetails.mrtgUnpr)) : $("#TB06013P_mrtgUnpr").val(infoDetails.mrtgUnpr); // 담보단가
          infoDetails.mrtgAmt ? $("#TB06013P_mrtgAmt").val(addComma(infoDetails.mrtgAmt)) : $("#TB06013P_mrtgAmt").val(infoDetails.mrtgAmt); // 담보금액
          infoDetails.avblMrtgPrcEtc ? $("#TB06013P_avblMrtgPrc_etc").val(addComma(infoDetails.avblMrtgPrcEtc)) : $("#TB06013P_avblMrtgPrc_etc").val(infoDetails.avblMrtgPrcEtc); // 가용담보가격
          $("#TB06013P_E031").val(infoDetails.etcMrtgAcqMthCd).prop("selected", true); // 기타담보취득방법코드
          break;
        // 실물
        case "9":
          $("#TB06013P_D009").val(infoDetails.dmsOvrsFndDcd).prop("selected", true); // 국내국외구분코드
          $("#TB06013P_aprsDt").val(formatDate(infoDetails.aprsDt)); // 감정일자
          $("#TB06013P_crevIsttNm").val(infoDetails.crevIsttNm); // 평가기관명
          $("#TB06013P_A008").val(infoDetails.aprsEvlIsttCd).prop("selected", true); // 감정기관
          infoDetails.aprsPrc ? $("#TB06013P_aprsPrc").val(addComma(infoDetails.aprsPrc)) : $("#TB06013P_aprsPrc").val(infoDetails.aprsPrc); // 감정가격
          $("#TB06013P_I027_2").val(infoDetails.aprsCrryCd).prop("selected", true); // 감정통화
          $("#TB06013P_krwTrslAprsPrc").val(infoDetails.krwTrslAprsPrc); // 감정가격(원화)
          $("#TB06013P_mrtgRto").val(infoDetails.mrtgRto); // 담보비율
          $("#TB06013P_mrtgRcgRto").val(infoDetails.mrtgRcgRto); // 담보인정비율
          $("#TB06013P_mrtgPrc").val(infoDetails.mrtgPrc); // 담보인정가액(원화)
          $("#TB06013P_mrtgCtns").val(infoDetails.mrtgCtns); // 담보내용
          $("#TB06013P_mrtgQnt").val(infoDetails.mrtgQnt); // 담보수량
          $("input[name='TB06013P_ovssEvlIsttYn']").radioSelect(infoDetails.ovssEvlIsttYn); // 국외평가기관여부
          $("#TB06013P_R019").val(infoDetails.rlthMrtgKndCd).prop("selected", true); // 실물담보종류코드
          $("#TB06013P_A011").val(infoDetails.aprsStdrCd).prop("selected", true); // 감정기준코드

          break;
        // 보증담보
        case "10":
          $("#TB06013P_G002").val(infoDetails.grteCtrcDcd).prop("selected", true); // 보증약정구분코드
          $("#TB06013P_grnrCpin").val(infoDetails.grnrCpin); // 보증인고객식별번호
          $("#TB06013P_I012").val(infoDetails.grupItgrCrdtGrdDcd).prop("selected", true); // 그룹통합신용등급구분코드
          $("#TB06013P_crdtInqDt").val(formatDate(infoDetails.grnrCpin)); // 신용조회일자 
          $("#TB06013P_dbtrCpin").val(infoDetails.dbtrCpin); // 채무자고객식별번호
          $("#TB06013P_G003").val(infoDetails.grteDbtrRltnDcd).prop("selected", true); // 보증채무자관계구분코드
          $("#TB06013P_grteAmt").val(infoDetails.grteAmt); // 보증금액
          $("#TB06013P_grtePrna").val(infoDetails.grtePrna); // 보증원금
          $("#TB06013P_I027_4").val(infoDetails.grteCrryCd).prop("selected", true); // 보증통화코드 
          $("#TB06013P_S004").val(infoDetails.stlaOrznBlngDcd).prop("selected", true); // 결산기구분코드 
          $("#TB06013P_grteStlaDe").val(formatDate(infoDetails.grteStlaDe)); // 보증결산일
          $("#TB06013P_G007").val(infoDetails.grteStlaDeEtcDcd).prop("selected", true); // 보증결산일기타구분코드
          $("#TB06013P_mrtgGrteCtns").val(infoDetails.mrtgGrteCtns); // 담보보증내용
          break;
        default:
          break;
      }

      getPrfdRankInfo();
    },
  });
}

function connectMrtgInfo() {

  var strPrdtCd = $("#TB06013P_prdtCd").val();
  var strMrtgMngmNo = $("#TB06013P_mrtgMngmNo").val();
  var paramData = {
    prdtCd: strPrdtCd,
    mrtgMngmNo: strMrtgMngmNo,
  };

  var option = {}
  option.title = "Error";
  option.type = "error";

  if (isEmpty(strPrdtCd)) {
    option.text = "종목코드가 없습니다.";
    openPopup(option);
    return false;
  }

  if (isEmpty(strMrtgMngmNo)) {
    option.text = "담보번호가 없습니다.";
    openPopup(option);
    return false;
  }

  console.log(">>>>>>>>> connprdtcd[" + $("#TB06013P_connPrdtCd").val() + "]<<<<<<<<<");

  if (isNotEmpty($("#TB06013P_connPrdtCd").val())) {
    option.text = "연결된 담보가 존재합니다.";
    openPopup(option);
    return false;
  }

  Swal.fire({
    title: '담보연결',
    text: `담보연결을 하시겠습니까?`,
    icon: "warning",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "예",
    cancelButtonText: "아니오",
  }).then((e) => {
    if (e.isConfirmed) {

      $.ajax({
        type: "POST",
        url: "/TB06013P/connectMrtgInfo",
        data: paramData,
        dataType: "json",
        success: function (data) {
          openPopup({ type: "success", title: "Success", text: '담보/보증 연결을 완료하였습니다.' });
        },
      });
      if (TB06013P_pfx === 'TB06010S') {
        TB06010Sjs.getIBIMS212BDTOInfo(prdtCd);
      } else if (TB06013P_pfx === 'TB06020S') {
        TB06020Sjs.getIBIMS212BDTOInfo(prdtCd);
      } else if (TB06013P_pfx === 'TB06030S') {
        TB06030Sjs.getIBIMS212BDTOInfo(prdtCd);
      }
      modalClose_TB06013P();

    }
  });



}


function disConnectMrtgInfo() {

  var mrtgMngmNo = $("#" + $("#TB06013P_prefix").val() + "_mrtgMngmNo_forPop").val();
  var mrtgNm = $("#" + $("#TB06013P_prefix").val() + "_mrtgNm_forPop").val("");


  var option = {}
  option.title = "Error";
  option.type = "error";

  if (isEmpty($("#TB06013P_connPrdtCd").val())) {
    option.text = "연결된 담보가 없습니다.";
    openPopup(option);
    return false;
  }

  var paramData = {
    prdtCd: $("#TB06013P_prdtCd").val(),
    mrtgMngmNo: $("#TB06013P_mrtgMngmNo").val(),
  };


  Swal.fire({
    title: '담보연결해제',
    text: `담보연결을 해제하시겠습니까?`,
    icon: "warning",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "예",
    cancelButtonText: "아니오",
  }).then((e) => {
    if (e.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "/TB06013P/disConnectMrtgInfo",
        data: paramData,
        dataType: "json",
        success: function (data) {
          openPopup({ type: "success", title: "Success", text: '담보/보증 연결 해제가 완료하였습니다.' });
        },
      });

      $("#" + $("#TB06013P_prefix").val() + "_mrtgMngmNo_forPop").val("");
      $("#" + $("#TB06013P_prefix").val() + "_mrtgNm_forPop").val("");
      if (TB06013P_pfx === 'TB06010S') {
        TB06010Sjs.getIBIMS212BDTOInfo(prdtCd);
      } else if (TB06013P_pfx === 'TB06020S') {
        TB06020Sjs.getIBIMS212BDTOInfo(prdtCd);
      } else if (TB06013P_pfx === 'TB06030S') {
        TB06030Sjs.getIBIMS212BDTOInfo(prdtCd);
      }
      modalClose_TB06013P();
    }
  });

}
/**
 * 
 * @param {담보종류코드} mrtgKndCd 
 */
function validateMrtg(mrtgKndCd) {
  if (isEmpty($("#TB06013P_mrtgNm").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "담보명을 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_mrtgNm").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_rgstDt").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "등록일자를 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_rgstDt").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_bsnsRgstNo").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "담보제공거래상대방을 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_bsnsRgstNo").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_mrtgEvlAmt").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "담보평가금액을 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_mrtgEvlAmt").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_avblMrtgPrc").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "가용담보가(원화)를 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_avblMrtgPrc").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_cprnMrtgRto").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "공동담보비율을 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_cprnMrtgRto").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_krwTrslStupTopAmt").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "설정최고액(원화)를 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_krwTrslStupTopAmt").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_stupTopAmt").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "설정최고액을 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_stupTopAmt").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_krwTrslValtMrtgPrc").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "유효담보가(원화)를 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_krwTrslValtMrtgPrc").focus();
    return false;
  }
  if (isEmpty($("#TB06013P_valtMrtgPrc").val())) {
    Swal.fire({
      icon: 'error'
      , title: "Error!"
      , text: "유효담보가를 입력해주세요."
      , confirmButtonText: "확인"
    });
    $("#TB06013P_valtMrtgPrc").focus();
    return false;
  }
  switch (mrtgKndCd) {
    // 부동산
    case "2":
      if (isEmpty($("#TB06013P_rlesSqmsCtns").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "면적을 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_rlesSqmsCtns").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_aprsDt").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "감정일자를 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_aprsDt").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_lctpAddr").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "소재지를 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_lctpAddr").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_crevIsttNm").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "평가기관명을 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_crevIsttNm").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_aprsPrc").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "감정가격을 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_aprsPrc").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_krwTrslAprsPrc").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "감정가격(원화)를 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_krwTrslAprsPrc").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_mrtgRto").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "담보비율을 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_mrtgRto").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_mrtgRcgRto").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "담보인정 비율을 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_mrtgRcgRto").focus();
        return false;
      }
      if (isEmpty($("#TB06013P_mrtgPrc").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "담보인정가액(원화)를 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_mrtgPrc").focus();
        return false;
      }
      break;
    case "3":
      if (isEmpty($("#TB06013P_aprsDt").val())) {
        Swal.fire({
          icon: 'error'
          , title: "Error!"
          , text: "감정일자를 입력해주세요."
          , confirmButtonText: "확인"
        });
        $("#TB06013P_aprsDt").focus();
        return false;
      }
      break;
    default:
      break;
  }
}