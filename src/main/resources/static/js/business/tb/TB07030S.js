const TB07030Sjs = (function () {
  const initialValues = {}; // 페이지로드 시 최초 값
  let grdRdmpTrgt; // 상환대상내역
  let grdRdmpTrgtDtl; // 상환대상상세내역
  let selectBox; // 공통코드 반환
  let P013; // 원리금유형 코드
  let fValid; // 0.조회 1.저장 2.Grid Check
  let prcsCpltYn; // 처리완료여부
  let prcsDt = unformatDate(getToday()); // 처리일자
  let ibims403RscdlList = [];

  $(document).ready(function () {
    onload();
  });

  function onload() {
    $("#TB07030S_prarDt").val(getToday());
    /********************************************************************
     * R006 회수구분코드 RCLM_DCD
     * E020 기업여신원리금상환구분코드 EPRZ_CRDL_PAI_RDMP_DCD
     * D013 처분손익구분코드 DSPS_PFLS_DCD
     * I027 통화코드
     * P013 원리금유형코드
     *******************************************************************/
    selectBox = getSelectBoxList("TB07030S", "E020/R006/D013/I027/P013", false);

    // 원리금유형코드
    P013 = selectBox.filter((item) => item.cmnsGrpCd === "P013");

    pqGrid();
    resetDd();

    $("input").on("focus", function () {
      $(this).select();
    });

    getDealInfoFromWF();
  }

  /********************************************************************
   * PQGrid
   ********************************************************************/
  function pqGrid() {
    /********************************************************************
     * PQGrid Column
     ********************************************************************/
    // 상환대상내역
    let colRdmpTrgt = [
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
      },
      {
        title: "순번",
        dataType: "integer",
        dataIndx: "excSn",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환예정일",
        dataType: "date",
        dataIndx: "prarDt",
        align: "center",
        dateFormat: "yyyy-mm-dd",
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
      {
        title: "만기일자",
        dataType: "date",
        dataIndx: "expDt",
        align: "center",
        dateFormat: "yyyy-mm-dd",
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
      {
        title: "실행잔액",
        dataType: "integer",
        dataIndx: "dealExcBlce",
        align: "right",
        halign: "center",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환원금",
        dataType: "integer",
        dataIndx: "prarPrna",
        align: "right",
        halign: "center",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "상환이자",
        dataType: "integer",
        dataIndx: "rdmpPrarIntr",
        align: "right",
        halign: "center",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "중도상환원금",
        dataType: "integer",
        dataIndx: "dealMrdpPrca",
        align: "right",
        halign: "center",
        format: "#,###",
        editable: true,
        filter: { crules: [{ condition: "range" }] },
        // editor: {
        // 	type: 'textbox',
        // 	init: function(ui) {
        // 		let $inp = ui.$cell.find("input");
        // 		$inp.on('input', function() {
        // 			inputNumberFormat(this)
        // 		});
        // 	}
        // },
        // render     : function (ui) {
        //     let cellData = ui.cellData;
        //     return Number(uncomma(cellData))
        // },
      },
      {
        title: "미수(유예)이자",
        dataType: "integer",
        dataIndx: "rcvbIntrAmt",
        align: "right",
        halign: "center",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "처리완료여부",
        dataType: "string",
        dataIndx: "prcsCpltYn",
        hidden: true,
      },
      {
        title: "처리일자",
        dataType: "string",
        dataIndx: "prcsDt",
        hidden: true,
      },
    ];

    // 상환대상상세내역
    let colRdmpTrgtDtl = [
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
      },
      {
        title: "회차",
        dataType: "integer",
        dataIndx: "rdmpTmrd",
        halign: "center",
        align: "right",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "이자유형코드",
        dataType: "string",
        dataIndx: "paiTypCd",
        halign: "center",
        align: "left",
        // width: "10%",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: P013,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let paiTypCd = P013.find(({ cdValue }) => cdValue == ui.cellData);
          return paiTypCd ? paiTypCd.cdName : ui.cellData;
        },
      },
      {
        title: "대상금액",
        dataType: "integer",
        dataIndx: "trgtAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "시작일자",
        dataType: "date",
        dataIndx: "strtDt",
        align: "center",
        dateFormat: "yyyy-mm-dd",
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
      {
        title: "종료일자",
        dataType: "date",
        dataIndx: "endDt",
        align: "center",
        dateFormat: "yyyy-mm-dd",
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
      {
        title: "일수",
        dataType: "string",
        dataIndx: "intrAplyDnum",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "적용이율",
        dataType: "integer",
        dataIndx: "aplyIrt",
        halign: "center",
        align: "right",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "납부대상금액",
        dataType: "integer",
        dataIndx: "pmntAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "납부예정금액",
        dataType: "integer",
        dataIndx: "pmntPrarAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
        editable: true,
        editor: {
          type: "textbox",
          init: function (ui) {
            $(ui.$editor)
              .on("input", function () {
                let value = Number($(this).val());
                let rowData = ui.rowData;
                let pmntAmt = rowData.pmntAmt || 0;
    
                if (value <= 0 || value > pmntAmt) {
                  $(this).css("border", "1px solid red");
                } else {
                  $(this).css("border", "");
                }
              })
              .on("blur", function () {
                let value = Number($(this).val());
                let rowData = ui.rowData;
                let pmntAmt = rowData.pmntAmt || 0;
    
                if (value < 0 || value > pmntAmt) {

                  $(this).val("").focus(); 
                  $(this).css("border", "1px solid red");
                } else {
                  $(this).css("border", "");
                }
              });
          },
        },
      },
      {
        title: "면제금액",
        dataType: "integer",
        dataIndx: "exmptAmt",
        halign: "center",
        align: "right",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
        editable: true
      },
      {
        title: "상환예정이자=처리이자금액",
        dataType: "integer",
        dataIndx: "rdmpPrarIntr",
        hidden: true,
      },
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "prdtCd",
        hidden: true,
      },
      {
        title: "실행순번",
        dataType: "string",
        dataIndx: "excSn",
        hidden: true,
      },
    ];

    //엑셀 다운로드용 toolbar
    // let toolbar = {
    // 	cls: "pq-toolbar",
    // 	items: [
    // 		{
    // 			type: 'button',
    // 			style: 'margin-right:0;margin-left:1px;',
    // 			attr: "title='Export to Xlsx'",
    // 			cls: 'ui-button ui-corner-all ui-widget ui-button',
    // 			label: '',
    // 			listener: function() {

    // 				let data = grdRdmpTrgtDtl.option("dataModel.data");

    // 				let transformedData  = data.map(row => {
    // 					let option = P013.find(opt => opt.cdValue == row.paiTypCd);
    // 					let paiTypCdNm = option ? option.cdName : row.paiTypCd;

    // 					return {
    // 						회차 		 : row.rdmpTmrd,
    // 						이자유형코드  : paiTypCdNm,
    // 						대상금액     : Math.round(row.trgtAmt),
    // 						시작일자     : formatDate(row.strtDt),
    // 						종료일자     : formatDate(row.endDt),
    // 						일수     	 : row.intrAplyDnum,
    // 						적용이율 	 : row.aplyIrt,
    // 						납부금액 	 : Math.round(row.pmntAmt),
    // 						면제금액 	 : Math.round(row.exmptAmt)
    // 					};
    // 				});

    // 				let ws = XLSX.utils.json_to_sheet(transformedData);

    // 				ws['!cols'] = [
    // 					{ wpx: 50 }, // 회차
    // 					{ wpx: 120 }, // 이자유형코드
    // 					{ wpx: 120 }, // 대상금액
    // 					{ wpx: 120 }, // 시작일자
    // 					{ wpx: 120 }, // 종료일자
    // 					{ wpx: 120 }, // 일수
    // 					{ wpx: 120 }, // 적용이율
    // 					{ wpx: 120 }, // 납부금액
    // 					{ wpx: 120 }, // 면제금액
    // 				];

    // 				let wb = XLSX.utils.book_new();
    // 				XLSX.utils.book_append_sheet(wb, ws, `${getToday()}`);
    // 				XLSX.writeFile(wb, `상환대상상세내역_${getToday2()}.xlsx`);

    // 				// var blob = this.exportExcel({});
    // 				// pq.saveAs(blob, `상환대상상세내역_${getFormattedDate()}.xlsx`);

    // 			}
    // 		}
    // 	]
    // }

    // 그리드 옵션 생성
    let pqGridObjs = [
      {
        height: 150,
        maxHeight: 150,
        id: "grdRdmpTrgt",
        colModel: colRdmpTrgt,
      },
      {
        height: 375,
        maxHeight: 375,
        id: "grdRdmpTrgtDtl",
        colModel: colRdmpTrgtDtl,
        toolbar: toolbar,
      },
    ];

    setPqGrid(pqGridObjs);

    // Grid instance
    grdRdmpTrgt = $("#grdRdmpTrgt").pqGrid("instance");
    grdRdmpTrgtDtl = $("#grdRdmpTrgtDtl").pqGrid("instance");

    // formulas는 값이 고정되버려서 못 씀...
    // $("#grdRdmpTrgtDtl").pqGrid("option", "formulas", [
    //     ['pmntPrarAmt', function (rd) { return rd.pmntAmt - rd.exmptAmt; }]
    //   ]
    // );



  }

  /********************************************************************
   * AJAX
   ********************************************************************/
  // 조회
  function srch() {
    fValid = 0;

    rstGrd(); // 그리드 초기화

    if (validation().isValid) {
      let prarDt = validation().prarDt, // 기산일자
        prdtCd = validation().prdtCd, // 종목코드
        eprzCrdlPaiRdmpDcd = $("#TB07030S_E020").val(), // 상환구분
        aplcExchR = $("#TB07030S_aplcExchR").val(), // 적용환율
        stdrExrt = $("#TB07030S_stdrExrt").val(), // 고시환율
        thdtEchmYn = $('input[name="TB07030S_thdtEchmYn"]:checked').val(); // 당일환전여부

      // validation TRUE
      let obj = {
        prdtCd,
        prarDt,
        eprzCrdlPaiRdmpDcd,
        aplcExchR,
        stdrExrt,
        thdtEchmYn,
      };

      $.ajax({
        type: "POST",
        url: "/TB07030S/getRdmpList",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          bfReset();
        },
        success: function (data) {
          //console.log(data)
          if (data.length > 0) {
            grdRdmpTrgt.setData(data);
          } else {
            sf(1, "warning", `조회된 내역이 없습니다.`);
            grdRdmpTrgt.setData([]);
            grdRdmpTrgt.refreshDataAndView();
          }
        },
      });
    } else {
      // validation FALSE
      // reset Grid
      grdRdmpTrgt.setData([]); // 상환대상내역
      grdRdmpTrgtDtl.setData([]); // 상환대상상세내역
      grdRdmpTrgt.refreshDataAndView();
      grdRdmpTrgtDtl.refreshDataAndView();

      return;
    }
  }

  /*******************************************************************
   * 상환금액계산
   *******************************************************************/
  function calPrarAmt() {
    fValid = 2;

    grdRdmpTrgtDtl.setData([]);

    if (validation().isValid) {
      // 체크된 상환대상내역에서 처리완료여부, 처리일시 추가
      let addList = chkGrdRdmpTrgt();

      addList.forEach((item) => {
        if (item.dealMrdpPrca > 0) {
          item.prcsCpltYn = "Y";
        } else {
          item.prcsCpltYn = "N";
        }

        item.dealMrdpPrca = uncomma(item.dealMrdpPrca);
      });

      let prarDt = validation().prarDt, // 기산일자
        prdtCd = validation().prdtCd, // 종목코드
        eprzCrdlPaiRdmpDcd = $("#TB07030S_E020").val(), // 상환구분
        aplcExchR = $("#TB07030S_aplcExchR").val(), // 적용환율
        stdrExrt = $("#TB07030S_stdrExrt").val(), // 고시환율
        thdtEchmYn = $('input[name="TB07030S_thdtEchmYn"]:checked').val(); // 당일환전여부

      let obj = {
        prdtCd,
        prarDt,
        eprzCrdlPaiRdmpDcd,
        aplcExchR,
        stdrExrt,
        thdtEchmYn,
        ibims403Lst: addList,
      };

      //console.log(obj);
      $.ajax({
        type: "POST",
        url: "/TB07030S/getRdmpDetail",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          bfReset2();
        },
        success: function (data) {
          //console.log(data)

          data.ibims403DtlLst.forEach(item => {
            item.chk = true;
          });

          grdRdmpTrgtDtl.setData(data.ibims403DtlLst);
          ibims403RscdlList = data.ibims403RscdlList; // 중도상환원금이 발생했을 경우 새로운 스케줄

          // console.log(JSON.stringify(data.ibims403DtlLst));       
          // console.log(ibims403RscdlList);

          $("#TB07030S_rdmpTrgtPrna").val(comma(data.totalDTO.totalPrna)); // 원금합계
          $("#TB07030S_nrmlIntrAmt").val(comma(data.totalDTO.totalIntr)); // 정상이자합계
          $("#TB07030S_crdtGrntOvduIntAmt").val(
            comma(data.totalDTO.totalOvduIntr)
          ); // 연체이자합계
          $("#TB07030S_dealMrdpPrca").val(comma(data.totalDTO.totlaMrdpPrca)); // 중도상환원금
          $("#TB07030S_mrdpFeeAmt").val(comma(data.totalDTO.totalMdwyRdmpFee)); // 중도상환수수료합계
          // 미수이자합계
          // 면제금액합계
          $("#TB07030S_rdmpPrnaSmmAmt").val(comma(data.totalDTO.totalTrgtAmt)); // 상환대상총금액

          calculator("aplcExchR");
          // data.totalDTO.totalIntr // 정상이자합계
          // data.totalDTO.totalOvduIntr // 연체이자합계
          // data.totalDTO.totlaMrdpPrca // 중도상환원금
          // data.totalDTO.totalMdwyRdmpFee // 중도상환수수료합계
          // data.totalDTO.totalTrgtAmt // 상환대상총금액

          // calculator('dmp_mfa', chkGrdRdmpTrgt());  // 중도상환원금합계, 중도상환수수료
          // calculator('rdmpTrgtPrna', data);		 // 상환대상원금 : 원금
          // calculator('paiTypCd', data);			 // 이자유형코드별 합계 : 정상이자, 연체이자
          calculator("calcTotAmt", data.ibims403DtlLst); 
          // calculator('rdmpPrnaSmmAmt');			 // 상환대상총금액
          // calculator('acptPtclSmtlAmt');			 // 수납내역합계
        },
      });
    } else {
      // grdRdmpTrgtDtl.refreshDataAndView();
    }
  }

  // 상환
  function save() {
    fValid = 1;

    let rkfrDt = uncomma($("#TB07030S_prarDt").val());                          // 기산일자
    let aplcExchR = $("#TB07030S_aplcExchR").val();                             // 적용환율
    let rdmpTrgtPrna = uncomma($("#TB07030S_rdmpTrgtPrna").val());              // 상환대상원금
    let nrmlIntAmt = uncomma($("#TB07030S_nrmlIntrAmt").val());                 // 정상이자
    let crdtGrntOvduIntAmt = uncomma($("#TB07030S_crdtGrntOvduIntAmt").val());  // 연체이자
    let dealMrdpPrca = uncomma($("#TB07030S_dealMrdpPrca").val());              // 중도상환원금
    let mrdpFeeAmt = uncomma($("#TB07030S_mrdpFeeAmt").val());                  // 중도상환수수료
    let rcvbIntrSmmAmt = uncomma($("#TB07030S_rcvbIntrSmmAmt").val());          // 미수이자합계
    let exmptSmmAmt = uncomma($("#TB07030S_exmptSmmAmt").val());                // 면제금액합계
    let rdmpPrnaSmmAmt = uncomma($("#TB07030S_rdmpPrnaSmmAmt").val());          // 상환대상총금액
    let trCrryCd = $("#TB07030S_I027").val();                                   // 통화구분
    let rctmLgdNm = $("#TB07030S_rctmLgdNm").val();                             // 입금원장명
    let rclmDvsnCd = $("#TB07030S_R006").val();                                 // 회수구분
    let bcncNm = $("#TB07030S_bcncNm").val();                                   // 거래처명
    let intlEchmYn = $("input[name=intlEchmYn]:checked").val();                 // 내부환전여부
    let ovrsFwdgYn = $("input[name=ovrsFwdgYn]:checked").val();                 // 해외송금여부
    let apvlStfno = $("#TB07030S_empNo").val();                                 // 승인직원번호
    let dealCashAmt = uncomma($("#TB07030S_dealCashAmt").val());                // 현금입금
    let dealAltnAmt = uncomma($("#TB07030S_dealAltnAmt").val());                // 은행입금
    let acptPtclSmtlAmt = uncomma($("#TB07030S_acptPtclSmtlAmt").val());        // 수납내역합계

    // 체크된 상환대상내역에서 처리완료여부, 처리일시 추가
    let bfAddList = grdRdmpTrgtDtl.getData();
    //let addList = grdRdmpTrgtDtl.getData();
    let addList = [];

    bfAddList.forEach((item) => {
      if(item.chk){
        item.prcsCpltYn = "Y";
        item.prcsDt = prcsDt;

        if(item.paiTypCd === "2"){  //정상이자
          item.prcsIntrAmt = item.pmntPrarAmt;
        }else{                      //원금/중도상환원금/중도상환수수료.... todo:: 정상이자 외 연체금도 이자로 들어가야 하는지?
          item.prcsAmt = item.pmntPrarAmt;
        }

        addList.push(item);
      }
      
    });

    let ibims403Lst = chkGrdRdmpTrgt(); // 상환대상내역
    let ibims403DtlLst = addList; // 상환대상상세내역

    let obj = {
      rkfrDt,
      aplcExchR,
      rdmpTrgtPrna,
      nrmlIntAmt,
      crdtGrntOvduIntAmt,
      dealMrdpPrca,
      mrdpFeeAmt,
      rcvbIntrSmmAmt, // 미수이자
      exmptSmmAmt,
      rdmpPrnaSmmAmt,
      trCrryCd,
      rctmLgdNm,
      rclmDvsnCd,
      bcncNm,
      intlEchmYn,
      ovrsFwdgYn,
      apvlStfno,
      dealCashAmt,
      dealAltnAmt,
      acptPtclSmtlAmt,
      ibims403Lst,
      ibims403DtlLst,
      ibims403RscdlList,
    };

    console.log("상환 체크 전 ::::::::::: ", obj);
    if (validation(obj).isValid) {
      obj.prdtCd = validation().prdtCd; // 종목코드
      console.log("상환 체크 후 ::::::::::: ", obj);

      $.ajax({
        type: "POST",
        url: "/TB07030S/saveRdpm",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (data) {
          console.log(data);
          if (data > 0) {
            sf(1, "success", `상환이 완료됐습니다.`, (result) => {
              if (result.isConfirmed) {
                srch();
              }
            });
            // Swal.fire({
            // 	icon: 'success'
            // 	, text: "상환이 완료됐습니다."
            // 	, confirmButtonText: "확인"
            // }).then(result => {
            //     if (result.isConfirmed) {
            //         srch();
            //     }
            // });
          } else {
            sf(1, "error", `상환에 실패하였습니다.`);
            return;
          }
        },
      });
    }
  }

  // 체크된 grdRdmpTrgt
  function chkGrdRdmpTrgt() {
    let data = grdRdmpTrgt.getData(); // 그리드 데이터

    let ibims403Lst = [];

    for (let i = 0; i < data.length; i++) {
      const chkData = data[i];

      if (chkData.chk) {
        ibims403Lst.push(chkData);
      }
    }
    return ibims403Lst;
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation(obj = {}) {
    let prdtCd = $("#TB07030S_prdtCd").val(); // 종목코드
    let eprzCrdlPaiRdmpDcd = $("#TB07030S_E020").val(); // 기업여신원리금상환구분코드
    let prarDt = unformatDate($("#TB07030S_prarDt").val()); // 상환일자

    if (!prdtCd) {
      sf(1, "warning", "종목코드를 입력해주세요.");
      return { isValid: false };
    }

    if (!prarDt) {
      sf(1, "warning", "상환일자를 입력해주세요.");
      return { isValid: false };
    }

    if (fValid === 1) {
      // 상환
      const excludeKeys = ["exmptSmmAmt", "ibims403RscdlList"];
      // let chkVal = Object.values(obj).some(value => isEmpty(value));
      let chkVal = Object.entries(obj)
        .filter(([key]) => !excludeKeys.includes(key)) // 특정 키를 제외
        .some(([, value]) => !value);
      // console.log("val ::::: ", obj)
      // console.log(chkVal);
      if (chkVal) {
        sf(1, "warning", `상환 항목이 비어있습니다.<br>확인해주세요.`);
        return { isValid: false };
      }
    }

    if (fValid === 2) {
      // Grid
      let data = grdRdmpTrgt.getData(); // 그리드 데이터

      // data에서 chk 항목이 하나라도 있는지 확인
      const hasCheckedItem = data.some((item) => item.chk);

      if (!hasCheckedItem) {
        sf(1, "warning", `상환대상내역에 선택된 항목이 없습니다.`);
        return { isValid: false };
      }
    }

    let returnObj = {
      isValid: true,
      prdtCd,
      prarDt,
    };

    return returnObj;
  }

  /**
   * 고시환율코드 로드 *현재미사용
   */
  // function getExchr() {
  // 	let exchr = $('#TB07030S_I027').val();

  //     $.ajax({
  //         type: "POST",
  //         url: "/TB07030S/getExchR",
  // 		contentType: "application/json; charset=UTF-8",
  // 		data: exchr,
  //         dataType: "json",
  //         success: function(data) {
  // 			$('#TB07030S_stdrExrt').val(data.stdrExrt);
  //         }
  //     });
  // };

  function calculator_CalcTotAmt(p = {}){
          let totRdmpPrna = 0;          //납부예정 상환대상원금 합계
          let totRdmpIntr = 0;          //납부예정 납부예정이자 합계
          let totOvduIntr = 0;          //납부예정 연체이자 합계
          let totMrdpPrca = 0;          //납부예정 중도상환원금 합계
          let totMrdpFee  = 0;          //납부예정 중도상환수수료 합계
          let totRcvbIntr = 0;          //미수이자 합계
          let totExmptAmt = 0;          //면제금액 합계

          let orgRdmpPrna = 0;          //납부대상 상환대상원금 합계
          let orgRdmpIntr = 0;          //납부대상 납부예정이자 합게
          let orgOvduIntr = 0;          //납부대상 연체이자 합계
          let orgMrdpPrca = 0;          //납부대상 중도상환원금 합계
          let orgMrdpFee  = 0;          //납부대상 중도상환수수료 합계

          p.forEach((ele) => {

            let chk = ele.chk;

            //console.log("chk:::" + chk);

            if(chk){
              let paiTypCd = ele.paiTypCd;//원리금유형코드

              let exmptAmt = ele.exmptAmt;
              totExmptAmt += exmptAmt;

              if(paiTypCd === "1"){         //원금
                totRdmpPrna += ele.pmntPrarAmt;
                orgRdmpPrna += ele.pmntAmt;

              }else if(paiTypCd === "2"){   //정상이자
                totRdmpIntr += ele.pmntPrarAmt;
                orgRdmpIntr += ele.pmntAmt;

              }else if(paiTypCd === "3"){   //분할금연체금액

              }else if(paiTypCd === "4"){   //납부이자연체금액
                totOvduIntr += ele.pmntPrarAmt;
                orgOvduIntr += ele.pmntAmt;

              }else if(paiTypCd === "5"){   //원금연체금액
                totOvduIntr += ele.pmntPrarAmt;
                orgOvduIntr += ele.pmntAmt;

              }else if(paiTypCd === "6"){   //환출이자

              }else if(paiTypCd === "7"){   //미수이자

              }else if(paiTypCd === "8"){   //중도상환원금
                totMrdpPrca += ele.pmntPrarAmt;
                orgMrdpPrca += ele.pmntAmt;

              }else if(paiTypCd === "9"){   //중도상환수수료
                totMrdpFee += ele.pmntPrarAmt;
                orgMrdpFee += ele.pmntAmt;

              }
            }else{
              // let paiTypCd = ele.paiTypCd;//원리금유형코드

              // let exmptAmt = ele.exmptAmt;
              // totExmptAmt -= exmptAmt;

              // if(paiTypCd === "1"){         //원금
              //   totRdmpPrna -= ele.pmntPrarAmt;
              // }else if(paiTypCd === "2"){   //정상이자
              //   totRdmpIntr -= ele.pmntPrarAmt;
              // }else if(paiTypCd === "3"){   //분할금연체금액

              // }else if(paiTypCd === "4"){   //납부이자연체금액
              //   totOvduIntr -= ele.pmntPrarAmt;
              // }else if(paiTypCd === "5"){   //원금연체금액
              //   totOvduIntr -= ele.pmntPrarAmt;
              // }else if(paiTypCd === "6"){   //환출이자

              // }else if(paiTypCd === "7"){   //미수이자

              // }else if(paiTypCd === "8"){   //중도상환원금
              //   totMrdpPrca -= ele.pmntPrarAmt;
              // }else if(paiTypCd === "9"){   //중도상환수수료
              //   totMrdpFee -= ele.pmntPrarAmt;
              // }
            }

            
            
          });

          $("#TB07030S_exmptSmmAmt").val(comma(totExmptAmt));         
          $("#TB07030S_KRW_exmptSmmAmt").val(comma(totExmptAmt));   
          // $("#TB07030S_orgRdmpTrgtPrna").val(comma(orgRdmpPrna));    

          $("#TB07030S_rdmpTrgtPrna").val(comma(totRdmpPrna));         
          $("#TB07030S_KRW_rdmpTrgtPrna").val(comma(totRdmpPrna));    
          $("#TB07030S_orgRdmpTrgtPrna").val(orgRdmpPrna);  

          $("#TB07030S_nrmlIntrAmt").val(comma(totRdmpIntr));         
          $("#TB07030S_KRW_nrmlIntrAmt").val(comma(totRdmpIntr));   
          $("#TB07030S_orgNrmlIntrAmt").val(orgRdmpIntr);   

          $("#TB07030S_crdtGrntOvduIntAmt").val(comma(totOvduIntr));        
          $("#TB07030S_KRW_crdtGrntOvduIntAmt").val(comma(totOvduIntr));  
          $("#TB07030S_orgCrdtGrntOvduIntAmt").val(orgOvduIntr);     

          $("#TB07030S_dealMrdpPrca").val(comma(totMrdpPrca));         
          $("#TB07030S_KRW_dealMrdpPrca").val(comma(totMrdpPrca));    
          $("#TB07030S_orgDealMrdpPrca").val(orgMrdpPrca);  

          $("#TB07030S_mrdpFeeAmt").val(comma(totMrdpFee));         
          $("#TB07030S_KRW_mrdpFeeAmt").val(comma(totMrdpFee));     
          $("#TB07030S_orgMrdpFeeAmt").val(orgMrdpFee);  

          calculator("rdmpPrnaSmmAmt");
  }


  // 실행별상환대상금액
  function calculator(f, p = {}) {
    let tot = 0;
    let amt = 0;
    let paiTypCd;
    let rdmpTrgtPrna = Number(uncomma($("#TB07030S_rdmpTrgtPrna").val())); // 상환대상원금
    let nrmlIntrAmt = Number(uncomma($("#TB07030S_nrmlIntrAmt").val())); // 정상이자
    let crdtGrntOvduIntAmt = Number(
      uncomma($("#TB07030S_crdtGrntOvduIntAmt").val())
    ); // 연체이자
    let dealMrdpPrca = Number(uncomma($("#TB07030S_dealMrdpPrca").val())); // 중도상환원금
    let mrdpFeeAmt = Number(uncomma($("#TB07030S_mrdpFeeAmt").val())); // 중도상환수수료
    let rcvbIntrSmmAmt = Number(uncomma($("#TB07030S_rcvbIntrSmmAmt").val())); // 미수이자
    let exmptSmmAmt = Number(uncomma($("#TB07030S_exmptSmmAmt").val())); // 면제금액

    switch (f) {
      case "rdmpPrnaSmmAmt": // [상환대상총금액] = 연체이자 + 정상이자 + 상환대상원금 + 중도상환원금 + 중도상환수수료 - 미수이자 - 면제금액
        tot =
          // rdmpTrgtPrna +
          // nrmlIntrAmt +
          // crdtGrntOvduIntAmt +
          // dealMrdpPrca +
          // mrdpFeeAmt;
          rdmpTrgtPrna +
          nrmlIntrAmt +
          crdtGrntOvduIntAmt +
          dealMrdpPrca +
          mrdpFeeAmt -
          rcvbIntrSmmAmt -
          exmptSmmAmt;

        $("#TB07030S_rdmpPrnaSmmAmt").val(comma(tot));     // 상환대상총금액
        $("#TB07030S_KRW_rdmpPrnaSmmAmt").val(comma(tot)); // [원화]상환대상총금액
        break;

      case "acptPtclSmtlAmt": // [수납내역합계] = 현금입금 + 은행입금
        let dealCashAmt = BigInt(uncomma($("#TB07030S_dealCashAmt").val())); // 현금입금
        let dealAltnAmt = BigInt(uncomma($("#TB07030S_dealAltnAmt").val())); // 은행입금

        tot = dealCashAmt + dealAltnAmt;

        // 작은 오차를 제거하기 위해 0으로 처리
        // if (Math.abs(tot) < 0.001) {
        // 	tot = 0;
        // } else {
        // 	tot = parseFloat(tot.toPrecision(15));  // 지수 표기법을 방지하고, 필요 시 소수점 자릿수를 줄임
        // }

        $("#TB07030S_acptPtclSmtlAmt").val(comma(tot)); // 수납내역합계
        break;

      case "dmp_mfa": // [중도상환원금] dealMrdpPrca, [중도상환수수료] mrdpFeeAmt
        let sumDmp = 0;
        let sumMfa = 0;

        console.log(" chkGrdRdmpTrgt() ::: ", chkGrdRdmpTrgt());

        for (let i = 0; i < p.length; i++) {
          const ele = p[i];
          console.log("ele ::: ", ele);
          let dealMrdpPrca = Number(ele.dealMrdpPrca);
          console.log(typeof dealMrdpPrca);
          let mrdpFeeAmt = Number(ele.mrdpFeeAmt);
          sumDmp += dealMrdpPrca;
          sumMfa += mrdpFeeAmt;

          console.log("dealMrdpPrca ::: ", dealMrdpPrca);
          console.log("mrdpFeeAmt ::: ", mrdpFeeAmt);
        }
        console.log(typeof sumDmp);
        $("#TB07030S_dealMrdpPrca").val(comma(sumDmp)); // 중도상환원금
        $("#TB07030S_mrdpFeeAmt").val(comma(sumMfa)); // 중도상환수수료

        $("#TB07030S_KRW_dealMrdpPrca").val(comma(sumDmp)); // [원화]중도상환원금
        $("#TB07030S_KRW_mrdpFeeAmt").val(comma(sumMfa)); // [원화]중도상환수수료
        break;

      case "paiTypCd": // 이자유형코드별 합계 : 2.정상이자, 4.연체이자
        let totCgoia = 0;
        let totNia = 0;

        for (let i = 0; i < p.length; i++) {
          const ele = p[i];
          paiTypCd = ele.paiTypCd;
          amt = ele.pmntAmt;

          if (paiTypCd === "4" || paiTypCd === "5") {
            // 4: 납부이자연체금액
            totCgoia += amt;
          }
        }
        $("#TB07030S_crdtGrntOvduIntAmt").val(comma(Math.round(totCgoia))); // 연체이자합계
        $("#TB07030S_KRW_crdtGrntOvduIntAmt").val(comma(Math.round(totCgoia))); // [원화]연체이자합계

        for (let i = 0; i < p.length; i++) {
          const ele = p[i];
          paiTypCd = ele.paiTypCd;
          amt = ele.pmntAmt;

          if (paiTypCd === "2") {
            // 2: 정상이자
            totNia += amt;
          }
        }
        $("#TB07030S_nrmlIntrAmt").val(comma(Math.round(totNia))); // 정상이자합계
        $("#TB07030S_KRW_nrmlIntrAmt").val(comma(Math.round(totNia))); // [원화]정상이자합계

        break;

      case "rdmpTrgtPrna": // 상환대상원금
        let sum = 0;
        for (let i = 0; i < p.length; i++) {
          const ele = p[i];
          paiTypCd = ele.paiTypCd;
          amt = ele.pmntAmt;

          if (paiTypCd === "1") {
            // 1: 원금
            sum += amt;
          }
        }
        $("#TB07030S_rdmpTrgtPrna").val(comma(Math.round(sum)));
        $("#TB07030S_KRW_rdmpTrgtPrna").val(comma(Math.round(sum)));
        break;

      case "exmptAmt": // 면제금액합계
        grdRdmpTrgtDtl.on("editorEnd", function (evt, ui) {

          let tot = 0;
          p.forEach((ele) => {
            let exmptAmt = ele.exmptAmt;
            tot += exmptAmt;
          });
          $("#TB07030S_exmptSmmAmt").val(comma(Math.round(tot))); // 면제금액합계
          $("#TB07030S_KRW_exmptSmmAmt").val(comma(Math.round(tot))); // [원환]면제금액합계
          calculator("rdmpPrnaSmmAmt");
        });
        break;

      //20250113추가
      case "calcTotAmt":      //납부예정금액 합계

        grdRdmpTrgtDtl.on("check", function (evt, ui) {
    
          calculator_CalcTotAmt(p);
          // console.log(JSON.stringify(data));
        });

        grdRdmpTrgtDtl.on("editorEnd", function (evt, ui) {
          
          calculator_CalcTotAmt(p);
          
        });
        break;

      case "aplcExchR": // 적용환율
        let aplcExchR = parseFloat($("#TB07030S_aplcExchR").val()); // 적용환율
        let stdrExrt = parseFloat($("#TB07030S_stdrExrt").val()); // 고시환율
        /**
         * 원화환산금액
         */
        let _rdmpTrgtPrna = Number(uncomma($("#TB07030S_rdmpTrgtPrna").val())); // 상환대상원금
        let _nrmlIntrAmt = Number(uncomma($("#TB07030S_nrmlIntrAmt").val())); // 정상이자
        let _crdtGrntOvduIntAmt = Number(
          uncomma($("#TB07030S_crdtGrntOvduIntAmt").val())
        ); // 연체이자
        let _dealMrdpPrca = Number(uncomma($("#TB07030S_dealMrdpPrca").val())); // 중도상환원금
        let _mrdpFeeAmt = Number(uncomma($("#TB07030S_mrdpFeeAmt").val())); // 중도상환수수료
        let _exmptSmmAmt = Number(uncomma($("#TB07030S_exmptSmmAmt").val())); // 면제금액합계
        let _rdmpPrnaSmmAmt = Number(
          uncomma($("#TB07030S_rdmpPrnaSmmAmt").val())
        ); // 상환대상총금액

        let obj = {
          _rdmpTrgtPrna,
          _nrmlIntrAmt,
          _crdtGrntOvduIntAmt,
          _dealMrdpPrca,
          _mrdpFeeAmt,
          _exmptSmmAmt,
          _rdmpPrnaSmmAmt,
        };

        if (isNaN(aplcExchR)) {
          aplcExchR = $("#TB07030S_aplcExchR").val("1.00");

          Object.keys(obj).forEach((key) => {
            obj[key] *= stdrExrt;
            // console.log(obj[key]);
          });
          $("#TB07030S_KRW_rdmpTrgtPrna").val(
            comma(Math.round(obj._rdmpTrgtPrna))
          ); // 상환대상원금
          $("#TB07030S_KRW_nrmlIntrAmt").val(
            comma(Math.round(obj._nrmlIntrAmt))
          ); // 정상이자
          $("#TB07030S_KRW_crdtGrntOvduIntAmt").val(
            comma(Math.round(obj._crdtGrntOvduIntAmt))
          ); // 연체이자
          $("#TB07030S_KRW_dealMrdpPrca").val(
            comma(Math.round(obj._dealMrdpPrca))
          ); // 중도상환원금
          $("#TB07030S_KRW_mrdpFeeAmt").val(comma(Math.round(obj._mrdpFeeAmt))); // 중도상환수수료
          $("#TB07030S_KRW_exmptSmmAmt").val(
            comma(Math.round(obj._exmptSmmAmt))
          ); // 면제금액합계
          $("#TB07030S_KRW_rdmpPrnaSmmAmt").val(
            comma(Math.round(obj._rdmpPrnaSmmAmt))
          ); // 상환대상총금액
          // $('#TB07030S_KRW_rdmpTrgtPrna').val(comma(0)); // 상환대상원금
          // $('#TB07030S_KRW_nrmlIntrAmt').val(comma(0)); // 정상이자
          // $('#TB07030S_KRW_crdtGrntOvduIntAmt').val(0); // 연체이자
          // $('#TB07030S_KRW_dealMrdpPrca').val(comma(0)); // 중도상환원금
          // $('#TB07030S_KRW_mrdpFeeAmt').val(comma(0)); // 중도상환수수료
          // $('#TB07030S_KRW_exmptSmmAmt').val(comma(0)); // 면제금액합계
          // $('#TB07030S_KRW_rdmpPrnaSmmAmt').val(comma(0)); // 상환대상총금액
        } else {
          Object.keys(obj).forEach((key) => {
            obj[key] *= aplcExchR;
            // console.log(obj[key]);
          });
          $("#TB07030S_KRW_rdmpTrgtPrna").val(
            comma(Math.round(obj._rdmpTrgtPrna))
          ); // 상환대상원금
          $("#TB07030S_KRW_nrmlIntrAmt").val(
            comma(Math.round(obj._nrmlIntrAmt))
          ); // 정상이자
          $("#TB07030S_KRW_crdtGrntOvduIntAmt").val(
            comma(Math.round(obj._crdtGrntOvduIntAmt))
          ); // 연체이자
          $("#TB07030S_KRW_dealMrdpPrca").val(
            comma(Math.round(obj._dealMrdpPrca))
          ); // 중도상환원금
          $("#TB07030S_KRW_mrdpFeeAmt").val(comma(Math.round(obj._mrdpFeeAmt))); // 중도상환수수료
          $("#TB07030S_KRW_exmptSmmAmt").val(
            comma(Math.round(obj._exmptSmmAmt))
          ); // 면제금액합계
          $("#TB07030S_KRW_rdmpPrnaSmmAmt").val(
            comma(Math.round(obj._rdmpPrnaSmmAmt))
          ); // 상환대상총금액
        }
        // 미수이자*
        break;
      default:
        break;
    }
  }

  /********************************************************************
   * 초기화
   ********************************************************************/
  function reset() {
    $('input[id^="TB07030S"]').each(function () {
      const $this = $(this);
      // console.log($this);
      $this.val(initialValues[$this.attr("id")]);
    });

    $("select").each(function () {
      const $this = $(this);
      const id = $this.attr("id");

      if (id.includes("I027")) {
        // 'I027'이 포함    된 select 요소의 경우, value를 'KRW'로 설정
        $this.val("KRW");
      } else {
        // 나머지 select 요소의 경우, 첫 번째 옵션을 선택
        $this.prop("selectedIndex", 0);
      }
    });

    $(`input[name=TB07030S_thdtEchmYn][value="0"]`).prop("checked", true);
    $(`input[name=intlEchmYn][value="0"]`).prop("checked", true);
    $(`input[name=ovrsFwdgYn][value="0"]`).prop("checked", true);

    grdRdmpTrgt.setData([]);
    grdRdmpTrgt.refreshDataAndView();
    grdRdmpTrgtDtl.setData([]);
    grdRdmpTrgtDtl.refreshDataAndView();

    ibims403RscdlList = [];
  }

  // 페이지 로드 시, 입력 요소의 초기 값을 저장합니다.
  function resetDd() {
    $('input[id^="TB07030S"]').each(function () {
      const $this = $(this);
      // console.log($this.attr('id'));
      initialValues[$this.attr("id")] = $this.val();
      // console.log(initialValues);
    });
  }

  // ajax전
  function bfReset() {
    const excludeIds = [
      "#TB07030S_prdtCd",
      "#TB07030S_prdtNm",
      "#TB07030S_aplcExchR",
      "#TB07030S_prarDt",
      "#TB07030S_stdrExrt",
    ];

    $('input[id^="TB07030S"]')
      .not(`${excludeIds}`)
      .each(function () {
        $(this).val(initialValues[this.id]);
      });

    // $('input[id^="TB07030S"]').filter(function() {
    //     const id = $(this).attr('id');
    //     return id !== 'TB07030S_prdtCd' && id !== 'TB07030S_prdtNm'
    // 	       && id !== 'TB07030S_E020' && id !== 'TB07030S_aplcExchR'
    // 		   && id !== 'TB07030S_prarDt' && id !== 'TB07030S_stdrExrt';
    // }).each(function() {
    //     const $this = $(this);
    //     //console.log($this);
    //     $this.val(initialValues[$this.attr('id')]);
    // });

    // if (id.includes('I027')) {
    // 	// 'I027'이 포함    된 select 요소의 경우, value를 'KRW'로 설정
    // 	$this.val('KRW');
    // } else {
    // 	// 나머지 select 요소의 경우, 첫 번째 옵션을 선택
    // 	$this.prop('selectedIndex', 0);
    // }

    $("select")
      .filter(function () {
        return $(this).attr("id") !== "TB07030S_E020";
      })
      .each(function () {
        const $this = $(this);
        const id = $this.attr("id");
        if (id.includes("I027")) {
          // 'I027'이 포함    된 select 요소의 경우, value를 'KRW'로 설정
          $this.val("KRW");
        } else {
          // 나머지 select 요소의 경우, 첫 번째 옵션을 선택
          $this.prop("selectedIndex", 0);
        }
      });

    grdRdmpTrgt.setData([]);
    grdRdmpTrgtDtl.setData([]);
  }

  // 실행별상환대상금액 초기화
  function bfReset2() {
    $("#excRdmpTrgtAmt").find("input").val("0");
  }

  // 그리드 초기화
  function rstGrd() {
    grdRdmpTrgt.setData([]);
    grdRdmpTrgt.refreshDataAndView();
    grdRdmpTrgtDtl.setData([]);
    grdRdmpTrgtDtl.refreshDataAndView();
  }

  // 사용자정보
  function authInf() {
    $("#TB07010S_chrg_empNo").val(userEno);
    $("#TB07010S_chrg_empNm").val(userEmpNm);
  }

  // swal.fire
  function sf(flag, icon, html, callback = () => {}) {
    if (flag === 1) {
      Swal.fire({
        icon: `${icon}`,
        html: `${html}`,
        confirmButtonText: "확인",
      }).then(callback);
    }

    if (flag === 2) {
      Swal.fire({
        icon: `${icon}`,
        html: `${html}를(을) 확인해주세요.`,
        confirmButtonText: "확인",
      }).then(callback);
    }
  }

  /*******************************************************************
   * Excel
   *******************************************************************/
  // 엑셀 다운로드 버튼 클릭 시
  // $("#exelDown").click(function() {

  // 	$('#download-file-TB07030S').click();

  // });

  // // 업로드 버튼 클릭 시
  // $("#exelUp").click(function() {
  // 	//console.log("업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드업로드");
  // 	$('#upload-file-input-TB07030S').click();

  // });

  // $("#upload-file-input-TB07030S").change(function() {
  // 	//alert("1");
  // 	var mode = "multi";
  // 	readExcel_TB07030S();
  // 	resetFileInput($('#upload-file-input-TB07030S'));
  // });

  // //엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
  // function resetFileInput($element) {
  // 	$element.wrap('<form>').closest('form').get(0).reset();
  // 	$element.unwrap();
  // }

  // //엑셀 파일 읽기
  // function readExcel_TB07030S(){

  // 	let input = event.target;
  // 	let reader = new FileReader();
  // 	reader.onload = function() {
  // 		let data = reader.result;
  // 		let workBook = XLSX.read(data, { type: 'binary' });
  // 		workBook.SheetNames.forEach(function(sheetName) {
  // 			let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
  //                 raw: false,
  //                 dateNF: 'yyyy-mm-dd'
  //             } );

  // 			//alert(JSON.stringify(rows));

  // 			addExcelRows(rows);
  // 		})
  // 	};
  // 	reader.readAsBinaryString(input.files[0]);
  // }

  // function addExcelRows(rows){

  // 	grdRdmpTrgtDtl.setData([])
  // 	// console.log("for문 전");
  // 	rows.forEach(function(row){
  // 		// console.log("for문 후");
  // 		// let transformedData  = data.map(row => {
  // 		// 	let option = P013.find(opt => opt.cdValue == row.paiTypCd);
  // 		// 	let paiTypCdNm = option ? option.cdName : row.paiTypCd;

  // 		// 	return {
  // 		// 		회차 		 : row.rdmpTmrd,
  // 		// 		이자유형코드  : paiTypCdNm,
  // 		// 		대상금액     : Math.round(row.trgtAmt),
  // 		// 		시작일자     : formatDate(row.strtDt),
  // 		// 		종료일자     : formatDate(row.endDt),
  // 		// 		일수     	 : row.intrAplyDnum,
  // 		// 		적용이율 	 : row.aplyIrt.toFixed(2),
  // 		// 		납부금액 	 : Math.round(row.pmntAmt),
  // 		// 	};
  // 		// });

  // 		let option = P013.find(opt => opt.cdName == row["이자유형코드"]);
  // 		let paiTypCd = option ? option.cdName : row["이자유형코드"];
  // 		console.log("paiTypCdpaiTypCdpaiTypCd::: ", paiTypCd);
  // 		let	rdmpTmrd	 =	row["회차"],
  // 			trgtAmt		 =	row["대상금액"],
  // 			strtDt	     =	row["시작일자"],
  // 			endDt    	 =	row["종료일자"],
  // 			intrAplyDnum =	row["일수"],
  // 			aplyIrt		 =	row["적용이율"],
  // 			pmntAmt	     =	row["납부금액"],
  // 			exmptAmt     =  row["면제금액"]

  // 		let newRow = {
  // 			rdmpTmrd		: rdmpTmrd,
  // 			paiTypCd		: paiTypCd,
  // 			trgtAmt			: trgtAmt,
  // 			strtDt			: strtDt,
  // 			endDt			: endDt,
  // 			intrAplyDnum	: intrAplyDnum,
  // 			aplyIrt			: aplyIrt,
  // 			pmntAmt		    : pmntAmt,
  // 			exmptAmt        : exmptAmt
  // 		}
  // 		// grdRdmpTrgtDtl.addRow({ rowData: newRow, checkEditable: false });
  // 		$("#grdRdmpTrgtDtl").pqGrid("addRow", { rowData: newRow, checkEditable: false });

  // 	});

  // 	// $("#grdRdmpTrgtDtl").pqGrid("refreshDataAndView");
  // 	grdRdmpTrgtDtl.refreshDataAndView();
  // }

  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07030S_prdtCd").val(prdtCd);
			$("#TB07030S_prdtNm").val(prdtNm);
			srch();
		}else{
			console.log("WF세션 비었음");
		}
		sessionStorage.clear();
	}

  return {
    /**
     * 사용 할 함수 정의
     */
    calculator: calculator,
    srch: srch,
    reset: reset,
    calPrarAmt: calPrarAmt,
    save: save,
    getDealInfoFromWF : getDealInfoFromWF,
  };
})();
