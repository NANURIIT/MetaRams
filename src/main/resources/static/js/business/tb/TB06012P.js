let modalAppvCndtList;
let TB06012P_pfx;

/**
 * show modal
 */
function callTB06012P(prefix) {
	TB06012P_pfx=prefix;	
  
  loadSelectBoxContents_TB06012P();
  $("#TB06012P_prefix").val(prefix);
  TB06012P_getAppvCndt();
  $("#modal-TB06012P").modal("show");
	indexChangeHandler("TB06012P");
  $("#TB06012P_I027").val("KRW").prop('selected', true);
  clearTB06012P();
  
  setTimeout(() => {
    let obj = {
      height: 140,
      maxHeight: 140,
      id: "gridAppvCndtList",
      colModel: colModalAppvCndtList,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      editable: false,
      scrollModel: { autoFit: true },
      strNoRows: "데이터가 없습니다.",
      rowClick: function (evt, ui) {
        pqGridSelectHandler(ui.rowIndx, "gridAppvCndtList");
      }
    };
	    
	if(typeof modalAppvCndtList == "undefined") {    
	    $("#gridAppvCndtList").pqGrid(obj);
	    modalAppvCndtList = $("#gridAppvCndtList").pqGrid("instance");
    }
    selectIBIMS208B();
  }, 300);

  if(prefix == 'TB06010S') {
	  $("#TB06012P_ibDealNo").val($("#TB06010S_ibDealNo").val());
	  $("#TB06012P_ibDealNm").val($("#TB06010S_ibDealNm").val());
	  $("#TB06012P_prdtCd").val($("#TB06010S_res_prdtCd").val());
  } else if (prefix == 'TB06020S') {
	  $("#TB06012P_ibDealNo").val($("#TB06020S_ibDealNo").val());
	  $("#TB06012P_ibDealNm").val($("#TB06020S_ibDealNm").val());
	  $("#TB06012P_prdtCd").val($("#TB06020S_res_prdtCd").val());
  } else if (prefix == 'TB06030S') {
	  $("#TB06012P_ibDealNo").val($("#TB06030S_ibDealNo").val());
	  $("#TB06012P_ibDealNm").val($("#TB06030S_ibDealNm").val());
	  $("#TB06012P_prdtCd").val($("#TB06030S_res_prdtCd").val());
  }
  

 // $("#TB06012P_prdtCd").val($('#'+prefix+'_res_prdtCd').val());
  
  
  //selectorNumberFormater(
  //  $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Rt']")
  //);
  
  var patterns =  $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Rt']");
  for(var i =0; i < patterns.length; i++){
	  if(patterns[i].id.includes('TB06012P')){
	  	patterns[i].value = 0; 
	  }
  }
  
  inputNumberChangeFunction_TB06012P();
}

/**
 * 개월 절사, 금액 반올림
 */
function inputNumberChangeFunction_TB06012P(){
	//개월
	$("#TB06012P_sdwnTlmtMnum").on('change', function(){
		let formatNum="0";
		formatNum=(Math.floor(uncomma($("#TB06012P_sdwnTlmtMnum").val()))).toFixed(0);
		$("#TB06012P_sdwnTlmtMnum").val(addComma(uncomma(formatNum)));
	});	
	//셀다운요율
	$("#TB06012P_sdwnRto").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_sdwnRto").val())*100)/100).toFixed(2);
		$("#TB06012P_sdwnRto").val(addComma(uncomma(formatNum)));
	});
	//셀다운 목표금액
	$("#TB06012P_sdwnTlmtAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_sdwnTlmtAmt").val())*1)/1).toFixed(0);
		$("#TB06012P_sdwnTlmtAmt").val(addComma(uncomma(formatNum)));
	});	
	//적용환율
	$("#TB06012P_aplyExrt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_aplyExrt").val())*100)/100).toFixed(2);
		$("#TB06012P_aplyExrt").val(addComma(uncomma(formatNum)));
	});	
	//약정금액
	$("#TB06012P_ctrcAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_ctrcAmt").val())*1)/1).toFixed(0);
		$("#TB06012P_ctrcAmt").val(addComma(uncomma(formatNum)));
	});
	//실행금액
	$("#TB06012P_excAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_excAmt").val())*1)/1).toFixed(0);
		$("#TB06012P_excAmt").val(addComma(uncomma(formatNum)));
	});	
	//셀다운예정금액
	$("#TB06012P_sdwnPrarAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_sdwnPrarAmt").val())*1)/1).toFixed(0);
		$("#TB06012P_sdwnPrarAmt").val(addComma(uncomma(formatNum)));
	});	
	//셀다운금액
	$("#TB06012P_sdwnAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_sdwnAmt").val())*1)/1).toFixed(0);
		$("#TB06012P_sdwnAmt").val(addComma(uncomma(formatNum)));
	});	
	//당사보유금액
	$("#TB06012P_thcoHoldAmt").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_thcoHoldAmt").val())*1)/1).toFixed(2);
		$("#TB06012P_thcoHoldAmt").val(addComma(uncomma(formatNum)));
	});		
	//미매각잔액
	$("#TB06012P_ndispBlce").on('change', function(){
		let formatNum="0";
		formatNum=(Math.round(uncomma($("#TB06012P_ndispBlce").val())*1)/1).toFixed(2);
		$("#TB06012P_ndispBlce").val(addComma(uncomma(formatNum)));
	});	
	//exit분양율
	$("#TB06012P_exitSlltRt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_exitSlltRt").val())*100)/100).toFixed(2);
		$("#TB06012P_exitSlltRt").val(addComma(uncomma(formatNum)));
	});	
	//현재분양율
	$("#TB06012P_nowSlltRt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_nowSlltRt").val())*100)/100).toFixed(2);
		$("#TB06012P_nowSlltRt").val(addComma(uncomma(formatNum)));
	});	
	//계획공정율
	$("#TB06012P_plnFairRt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_plnFairRt").val())*100)/100).toFixed(2);
		$("#TB06012P_plnFairRt").val(addComma(uncomma(formatNum)));
	});	
	//현재공정율
	$("#TB06012P_nowFairRt").on('change', function(){
		let formatNum="000.00";
		formatNum=(Math.round(uncomma($("#TB06012P_nowFairRt").val())*100)/100).toFixed(2);
		$("#TB06012P_nowFairRt").val(addComma(uncomma(formatNum)));
	});		
}


/**
 * SELECTBOX 세팅
 */
function loadSelectBoxContents_TB06012P(){
	var item = '';
	item += 'I008';					// 결의협의회구분코드
	item += '/' + 'D007';			// 매각일자구분코드
	item += '/' + 'D008';			// 매각기준금액구분코드
	item += '/' + 'I027';			// 투자통화코드
	
	var selCnt =0;
	selCnt= $("#TB06012P_I008 option").length;
	if(selCnt==0 ||selCnt==1) getSelectBoxList('TB06012P', item);
}


// function loadSelectBoxContents() {

// 	var item = '';
// 	item += '/' + 'I027';					// 투자통화코드

// 	getSelectBoxList('TB06012P', item);
// }

/**
 * hide modal
 */
function modalClose_TB06012P() {
  let prdtCd =$("#TB06012P_prdtCd").val();	

  clearTB06012P();
  //$("#gridAppvCndtList").pqGrid("destroy");
  $("#modal-TB06012P").modal("hide");
 
  if (TB06012P_pfx === 'TB06010S') {
	prdtCd = $("#TB06010S_res_prdtCd").val();       
    TB06010Sjs.getIBIMS208BDTOInfo(prdtCd);
  } else if (TB06012P_pfx === 'TB06020S') {
	prdtCd = $("#TB06020S_res_prdtCd").val();
    TB06020Sjs.getIBIMS208BDTOInfo(prdtCd);
  } else if (TB06012P_pfx === 'TB06030S') {
	prdtCd = $("#TB06030S_res_prdtCd").val();
    TB06030Sjs.getIBIMS208BDTOInfo(prdtCd);
  }
  
}

/**
 * hide modal
 */
$("#modal-TB06012P").on("hide.bs.modal", function (e) {
  /* datepicker로 클래스가 잡히질 않아 date로 된 클래스로 이벤트 전파 막음 */
  if ($(e.target).hasClass('date')) {
    return;
  }
  clearTB06012P();
  // TD
});

/**
 * clear modal
 */
function clearTB06012P(cnd) {
 //화면init
 if(cnd==undefined ||cnd==null){
	cnd=0;
 }
 
 if(cnd==0){
	 $("#TB06012P_prefix").val("");
	 $("#TB06012P_ibDealNo").val("");
	 $("#TB06012P_ibDealNm").val("");

	 $("#TB06012P_chrgPEnm").val("");
	 $("#TB06012P_chrgPEno").val("");
	 $("#TB06012P_ownPEnm").val("");
	 $("#TB06012P_ownPEno").val("");

	 $("#TB06012P_apvlDt").val("");
	 $("#TB06012P_I008").val("").prop("selected", true).change();
	 $("#TB06012P_cnsbSq").val("");

	 $("#TB06012P_apvlAmt").val("");
	 $("#TB06012P_sdnCndtCtns").val("");	 
	 //그리드 초기화 필요 by hytest
	   if(typeof modalAppvCndtList == "undefined") {
	   }else{
	    modalAppvCndtList.setData([]);
	   }
 }

  $("#TB06012P_sn").val("");
  $("#TB06012P_D007 option:eq(0)").prop("selected", true);
  $("#TB06012P_D008 option:eq(0)").prop("selected", true);
  $("#TB06012P_rgstEmpNm").val("");
  $("#TB06012P_rgstEmpNo").val("");
  $("#TB06012P_chngEmpNm").val("");
  $("#TB06012P_chngEmpNo").val("");
  $("#TB06012P_rgstDt").val("");
  $("#TB06012P_chngDt").val("");
  $("#TB06012P_D007 option:eq(0)").prop("selected", true);
  $("#TB06012P_D008 option:eq(0)").prop("selected", true);
  $("#TB06012P_sdwnTlmtDt").val(getToday());
  $("#TB06012P_aplyExrt").val("1");
  $("#TB06012P_I027 option:eq(0)").prop("selected", true);
  $("#TB06012P_sdwnCpltDt").val("");
  $("#TB06012P_sdwnCtns").val("");
  $("#TB06012P_etcApvlCndCtns").val("");
  $("#TB06012P_apvlCndActCtns").val("");
  
  //$("input[id*='Amt'], input[id*='Blce'], input[id*='Mnum'], input[id*='Rt']").val("0");
  var patterns =  $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Rt']");
  for(var i =0; i < patterns.length; i++){
    if(patterns[i].id.includes('TB06012P')){
    	patterns[i].value = 0; 
    }
  }
    
}

function regIBIMS208B() {
  var option = {};
  option.title = "Error";
  option.type = "error";

  // 유효성검사
  if (isEmpty($("#TB06012P_ibDealNo").val())) {
    option.text = "Deal정보 조회 후 다시 시도해주세요.";
    openPopup(option);
    $("#TB06012P_ibDealNo").focus();
    return false;
  }

  var paramData = {
    dealNo: $("#TB06012P_ibDealNo").val(), // 딜번호
    sn: $("#TB06012P_sn").val(), // 일련번호
    sdwnDtDcd: $("#TB06012P_D007").val(), // 샐다운일자구분코드
    sdwnTlmtMnum: $("#TB06012P_sdwnTlmtMnum").val().replaceAll(",", ""), // 샐다운기한개월수
    sdwnTlmtDt: replaceAll($("#TB06012P_sdwnTlmtDt").val(), "-", ""), // 샐다운기한(목표)일자
    sdwnStdrAmtDcd: $("#TB06012P_D008").val(), // 샐다운기준금액구분코드
    sdwnRto: $("#TB06012P_sdwnRto").val(), // 샐다운비율
    sdwnTlmtAmt: $("#TB06012P_sdwnTlmtAmt").val().replaceAll(",", ""), // 샐다운목표금액
    crryCd: $("#TB06012P_I027").val(), // 통화코드
    aplyExrt: $("#TB06012P_aplyExrt").val().replaceAll(",", ""), // 적용환율
    sdwnCpltDt: $("#TB06012P_sdwnCpltDt").val().replaceAll("-", ""), // 샐다운완료일자
    ctrcAmt: $("#TB06012P_ctrcAmt").val().replaceAll(",", ""), // 약정금액
    excAmt: $("#TB06012P_excAmt").val().replaceAll(",", ""), // 실행금액
    sdwnPrarAmt: $("#TB06012P_sdwnPrarAmt").val().replaceAll(",", ""), // 샐다운예정금액
    sdwnAmt: $("#TB06012P_sdwnAmt").val().replaceAll(",", ""), // 샐다운금액
    thcoHoldAmt: $("#TB06012P_thcoHoldAmt").val().replaceAll(",", ""), // 당사보유금액
    ndispBlce: $("#TB06012P_ndispBlce").val().replaceAll(",", ""), // 미매각금액
    exitSlltRt: $("#TB06012P_exitSlltRt").val(), // exit분양율
    nowSlltRt: $("#TB06012P_nowSlltRt").val(), // 현재분양율
    plnFairRt: $("#TB06012P_plnFairRt").val(), // 계획공정율
    nowFairRt: $("#TB06012P_nowFairRt").val(), // 현재공정율
    rgstEmpno: $("#TB06012P_rgstEmpNo").val(), // 등록사원번호
    rgstDt: $("#TB06012P_rgstDt").val().replaceAll("-", ""), // 등록일자
    chngEmpno: $("#TB06012P_chngEmpNo").val(), // 변경사원번호
    chngDt: getToday().replaceAll("-", ""), // 변경일자
    sdwnCtns: $("#TB06012P_sdwnCtns").val(), // 샐다운내용
    etcApvlCndCtns: $("#TB06012P_etcApvlCndCtns").val(), // 기타승인조건내용
    apvlCndActCtns: $("#TB06012P_apvlCndActCtns").val(), // 승인조건활동내용
    //, "hndDetlDtm": $('#TB06012P_hndDetlDtm').val()                        // 조작상세일시
    hndEmpno: $("#TB06012P_hndEmpno").val(), // 조작사원번호
    hndTmnlNo: $("#TB06012P_hndTmnlNo").val(), // 조작단말기번호
    hndTrId: $("#TB06012P_hndTrId").val(), // 조작거래id
    guid: $("#TB06012P_guid").val(), // guid
    prdtCd: $("#"+$("#TB06012P_prefix").val()+"_res_prdtCd").val(),
  };
  $.ajax({
    type: "POST",
    url: "/TB06010S/regIBIMS208B",
    data: JSON.stringify(paramData),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data > 0) {
        Swal.fire({
          title: "승인조건관리정보를 저장하였습니다.",
          //text: "대출이 실행됩니다.",
          icon: "success",
          confirmButtonText: "확인",
        })
          selectIBIMS208B();
       
      } else {
        Swal.fire({
          title: "승인조건관리정보를 저장하는데 실패하였습니다.",
          //text: "대출이 실행됩니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },
  }); /* end of ajax*/
}

/**
 * 승인조건 삭제
 */
function deleteIBIMS208B() {
  Swal.fire({
    title: "승인조건 삭제",
    text: `해당 승인조건을 삭제하시겠습니까?`,
    icon: "warning",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "예",
    cancelButtonText: "아니오",
  }).then((e) => {
    if (e.isConfirmed) {
      let dealNo = $("#TB06012P_ibDealNo").val();
      let sn = $("#TB06012P_sn").val();
      let delDto = {
        dealNo: dealNo,
        sn: sn,
      };
      $.ajax({
        type: "POST",
        url: "/TB06012P/delAppvCndtList",
        data: delDto,
        dataType: "json",
        success: function () {
          Swal.fire({
            icon: "success",
            title: "success",
            text: `승인조건을 삭제했습니다.`,
            confirmButtonText: "확인",
          }).then(() => {
            //selectIBIMS208B();
            modalAppvCndtList.setData([]);

            modalClose_TB06012P();
          });
        },
        error: function (e) {
          Swal.fire({
            icon: "error",
            title: "승인조건 삭제에 실패했습니다.",
            text: "",
            confirmButtonText: "확인",
          }).then(() => {
            // console.log("delAppvCndtList --> ::" + e.status);
          });
        },
      });
    }
  });
}

function selectIBIMS208B() {
	
  if (isEmpty($("#TB06012P_ibDealNo").val())) {
    Swal.fire({
      title: "Deal번호 조회후 다시 시도해주세요",
      //text: "대출이 실행됩니다.",
      icon: "error",
      confirmButtonText: "확인",
    });
    return false;
  }
  
  //$("#TB06012P_prdtCd").val("");
  //console.log("ibDealNo["+$("#TB06012P_ibDealNo").val()+"]");
  //console.log("res_prdtCd["+$('#'+$("#TB06012P_prefix").val()+'_res_prdtCd').val()+"]");
  var paramData = {
    dealNo: $("#TB06012P_ibDealNo").val(), // 딜번호
    prdtCd: $("#TB06012P_prdtCd").val()//$('#'+$("#TB06012P_prefix").val()+'_res_prdtCd').val()
  };
  
  //그리드 초기화 by hytest
  modalAppvCndtList.setData([]);

  $.ajax({
    type: "GET",
    url: "/TB06010S/selectIBIMS208B",
    data: paramData,
    dataType: "json",
    success: function (data) {
      if(data.length > 0) {		
		setAppvCndt(data[0]);
		modalAppvCndtList.setData(data);	  
	  } else {
		if(data.length == "undefined") {
			modalAppvCndtList.setData([]);	  
		} else {
			setAppvCndt([]);
		}	
	  }
      modalAppvCndtList.on("rowClick", function (event, ui) {
        //setAppvCndt(ui.rowData);
        pqGridSelectHandler(ui.rowIndx, "gridAppvCndtList", setAppvCndt(ui.rowData));
      });
    },
  }); /* end of ajax*/
}

/**
 * dblclick event function
 */
function setAppvCndt(e) {
	
  $("#TB06012P_sn").val(e.sn);
  $("#TB06012P_rgstEmpNm").val(e.rgstEmpnm);
  $("#TB06012P_rgstEmpNo").val(e.rgstEmpno);
  $("#TB06012P_rgstDt").val(formatDate(e.rgstDt));
  $("#TB06012P_chngEmpNm").val(e.chngEmpnm);
  $("#TB06012P_chngEmpNo").val(e.chngEmpno);
  $("#TB06012P_chngDt").val(formatDate(e.chngDt));
  $("#TB06012P_D007").val(e.sdwnDtDcd).prop("selected", true);
  if(!isEmpty(e.sdwnTlmtMnum)){ $("#TB06012P_sdwnTlmtMnum").val(e.sdwnTlmtMnum.toLocaleString("ko-KR")); }
  $("#TB06012P_sdwnTlmtDt").val(formatDate(e.sdwnTlmtDt));
  $("#TB06012P_D008").val(e.sdwnStdrAmtDcd).prop("selected", true);
  if(!isEmpty(e.sdwnRto)){ $("#TB06012P_sdwnRto").val(e.sdwnRto); }
  $("#TB06012P_I027").val(e.crryCd).prop("selected", true);
  $("#TB06012P_sdwnCpltDt").val(formatDate(e.sdwnCpltDt));
  $("#TB06012P_sdwnCtns").val(e.sdwnCtns);
  $("#TB06012P_etcApvlCndCtns").val(e.etcApvlCndCtns);
  
  if(!isEmpty(e.sdwnTlmtAmt)) {$("#TB06012P_sdwnTlmtAmt").val(e.sdwnTlmtAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.aplyExrt)) {$("#TB06012P_aplyExrt").val(e.aplyExrt.toLocaleString("ko-KR"));}
  
  if(!isEmpty(e.ctrcAmt)) {$("#TB06012P_ctrcAmt").val(e.ctrcAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.excAmt)) {$("#TB06012P_excAmt").val(e.excAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.sdwnPrarAmt)) {$("#TB06012P_sdwnPrarAmt").val(e.sdwnPrarAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.sdwnAmt)) {$("#TB06012P_sdwnAmt").val(e.sdwnAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.thcoHoldAmt)) {$("#TB06012P_thcoHoldAmt").val(e.thcoHoldAmt.toLocaleString("ko-KR"));}
  if(!isEmpty(e.ndispBlce)) {$("#TB06012P_ndispBlce").val(e.ndispBlce.toLocaleString("ko-KR"));}
  
  if(!isEmpty(e.exitSlltRt)){$("#TB06012P_exitSlltRt").val(e.exitSlltRt); }
  if(!isEmpty(e.nowSlltRt)){$("#TB06012P_nowSlltRt").val(e.nowSlltRt); }
  if(!isEmpty(e.plnFairRt)){$("#TB06012P_plnFairRt").val(e.plnFairRt); }
  if(!isEmpty(e.nowFairRt)){$("#TB06012P_nowFairRt").val(e.nowFairRt); }
  $("#TB06012P_apvlCndActCtns").val(e.apvlCndActCtns); 
  

                                      
}

function TB06012P_getAppvCndt() {
	  	
  var paramData = {
    dealNo: $("#"+$("#TB06012P_prefix").val()+"_ibDealNo").val(),
    mtrDcd: $("#"+$("#TB06012P_prefix").val()+"_lstCCaseCcd").val(),
    jdgmDcd: $("#"+$("#TB06012P_prefix").val()+"_riskInspctCcd").val()
  };

  $.ajax({
    type: "GET",
    url: "/TB06010S/getAppvCndt",
    data: paramData,
    dataType: "json",
    success: function (data) {
      $("#TB06012P_chrgPEnm").val(data.chrgPEnm);
      $("#TB06012P_chrgPEno").val(data.chrgPEno);
      $("#TB06012P_ownPEnm").val(data.ownPEnm);
      $("#TB06012P_ownPEno").val(data.ownPEno);

      $("#TB06012P_apvlDt").val(formatDate(data.apvlDt));
      $("#TB06012P_I008").val(data.cnsbDcd).prop("selected", true).change();
      $("#TB06012P_cnsbSq").val(data.cnsbSq);

      $("#TB06012P_apvlAmt").val(
        Number(handleNullData(data.apvlAmt)).toLocaleString("ko-KR")
      );
      $("#TB06012P_sdnCndtCtns").val(data.sdnCndtCtns);
    },
  }); /* end of ajax*/
}
/**
 * 승인조건연결 버튼
 */
function connectIBIMS209B() {
  var option = {};
  option.title = "Error";
  option.type = "error";

  // 유효성검사
  if (isEmpty($("#TB06012P_ibDealNo").val())) {
    option.text = "Deal정보 조회 후 다시 시도해주세요.";
    openPopup(option);
    return false;
  }

  if (isEmpty($("#TB06012P_sn").val())) {
    option.text = "승인조건일련번호 선택 후 다시 시도해주세요.";
    openPopup(option);
    return false;
  }
  
  let conCnt =0;
  for(let i=0; i <modalAppvCndtList.pdata.length ; i++){	
	if(modalAppvCndtList.pdata[i].cndYn=="Y"){
		conCnt++;
	}
  }
  
  if (conCnt> 0) {
    option.text = "현재 종목에 연결된 승인조건이 존재합니다.";
    openPopup(option);
    return false;
  }
  
  //부모창에서 넘어온 종목코드가 존재하지 않을때 by hytest
  if(isEmpty($('#TB06012P_prdtCd').val())){
	option.text = "선택된 종목코드가 존재하지 않습니다.";
    openPopup(option);
    return false;
  }

  var paramData = {
    dealNo: $("#TB06012P_ibDealNo").val(),
	prdtCd: $("#TB06012P_prdtCd").val(),
    mtrDcd: $("#"+$("#TB06012P_prefix").val()+"_lstCCaseCcd").val(),
    jdgmDcd: $("#"+$("#TB06012P_prefix").val()+"_riskInspctCcd").val(),
    apvlCndSn: $("#TB06012P_sn").val(),
    rgstDt: replaceAll(getToday(), "-", ""),
  };

	Swal.fire({
		title : '승인조건연결',
		text : `승인조건연결을 하시겠습니까?`,
		icon : "warning",
		showCancelButton : true,
		showConfirmButton : true,
		confirmButtonText : "예",
		cancelButtonText : "아니오",
	}).then((e) => {
		
		if (e.isConfirmed) {

		  $.ajax({
		    type: "POST",
		    url: "/TB06010S/connectIBIMS209B",
		    data: paramData,
		    dataType: "json",
		    success: function (data) {
		      if (data > 0) {
		        Swal.fire({
		          title: "승인조건 연결 완료하였습니다.",
		          //text: "대출이 실행됩니다.",
		          icon: "success",
		          confirmButtonText: "확인",
		        }).then((result) => {
		          selectIBIMS208B();
		          //console.log("connectIBIMS209B");
		          //getIBIMS208BDTOInfo($("#TB06012P_prdtCd").val());
		          //modalClose_TB06012P();
		        });
		      }
		    },
		    error: function (e) {
		      Swal.fire({
		        title: "승인조건 연결 실패하였습니다.",
		        text: e.status,
		        icon: "error",
		        confirmButtonText: "확인",
		      });
		    },
		  }); /* end of ajax*/
			
		 }
		 
	});

}

/** ************************************그리드 컬럼********************************** **/

let colModalAppvCndtList = [
  {
    title: "승인조건일련번호",
    dataType: "int",
    dataIndx: "sn",
    halign: "center",
    align: "right",	
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "연결여부",
    dataType: "string",
    dataIndx: "cndYn",
    halign: "center",
    align: "center",
	width: "7%",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "셀다운목표일자",
    dataType: "date",
    dataIndx: "sdwnTlmtDt",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData && cellData.length !== 0) {
        let dt1 = cellData.substring(0, 4);
        let dt2 = cellData.substring(4, 6);
        let dt3 = cellData.substring(6, 8);
        return `${dt1}-${dt2}-${dt3}`.trim();
      }
      return cellData;
    },
  },
  {
    title: "셀다운목표금액",
    dataType: "int",
    dataIndx: "sdwnTlmtAmt",
    halign: "center",
    align: "right",
    filter: { crules: [{ condition: "range" }] },
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData !== null && cellData !== undefined) {
        return addComma(cellData);
      }
      return cellData;
    },
  },
  {
    title: "통화코드",
    dataType: "string",
    dataIndx: "crryCdNm",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "통화코드",
    dataType: "string",
    dataIndx: "crryCd",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "셀다운완료일",
    dataType: "date",
    dataIndx: "sdwnCpltDt",
    align: "center",
    filter: { crules: [{ condition: "range" }] },
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData && cellData.length !== 0) {
        let dt1 = cellData.substring(0, 4);
        let dt2 = cellData.substring(4, 6);
        let dt3 = cellData.substring(6, 8);
        return `${dt1}-${dt2}-${dt3}`.trim();
      }
      return cellData;
    },
  },
  {
    title: "셀다운내용",
    dataType: "string",
    dataIndx: "sdwnCtns",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "기타승인조건",
    dataType: "string",
    dataIndx: "etcApvlCndCtns",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
  },
  {
    title: "rgstEmpnm",
    dataType: "string",
    dataIndx: "rgstEmpnm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "rgstEmpno",
    dataType: "string",
    dataIndx: "rgstEmpno",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "rgstDt",
    dataType: "string",
    dataIndx: "rgstDt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "emp_nm",
    dataType: "string",
    dataIndx: "emp_nm",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "chng_empno",
    dataType: "string",
    dataIndx: "chng_empno",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "chngDt",
    dataType: "string",
    dataIndx: "chngDt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnDtDcd",
    dataType: "string",
    dataIndx: "sdwnDtDcd",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnTlmtMnum",
    dataType: "string",
    dataIndx: "sdwnTlmtMnum",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnTlmtDt",
    dataType: "string",
    dataIndx: "sdwnTlmtDt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnStdrAmtDcd",
    dataType: "string",
    dataIndx: "sdwnStdrAmtDcd",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnRto",
    dataType: "string",
    dataIndx: "sdwnRto",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnTlmtAmt",
    dataType: "string",
    dataIndx: "sdwnTlmtAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "crryCd",
    dataType: "string",
    dataIndx: "crryCd",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "aplyExrt",
    dataType: "string",
    dataIndx: "aplyExrt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnCpltDt",
    dataType: "string",
    dataIndx: "sdwnCpltDt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnCtns",
    dataType: "string",
    dataIndx: "sdwnCtns",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnDtDcd",
    dataType: "string",
    dataIndx: "sdwnDtDcd",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "etcApvlCndCtns",
    dataType: "string",
    dataIndx: "etcApvlCndCtns",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "ctrcAmt",
    dataType: "int",
    dataIndx: "ctrcAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "excAmt",
    dataType: "int",
    dataIndx: "excAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnPrarAmt",
    dataType: "int",
    dataIndx: "sdwnPrarAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "sdwnAmt",
    dataType: "int",
    dataIndx: "sdwnAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "thcoHoldAmt",
    dataType: "int",
    dataIndx: "thcoHoldAmt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "ndispBlce",
    dataType: "string",
    dataIndx: "ndispBlce",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "exitSlltRt",
    dataType: "string",
    dataIndx: "exitSlltRt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "plnFairRt",
    dataType: "string",
    dataIndx: "plnFairRt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "nowFairRt",
    dataType: "string",
    dataIndx: "nowFairRt",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
  {
    title: "apvlCndActCtns",
    dataType: "string",
    dataIndx: "apvlCndActCtns",
    halign: "center",
    align: "left",
    filter: { crules: [{ condition: "range" }] },
    hidden: true,
  },
];
