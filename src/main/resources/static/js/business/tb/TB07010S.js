const TB07010Sjs = (function () {
  const userEno = $("#userEno").val(),
    userEmpNm = $("#userEmpNm").val(),
    userDprtCd = $("#userDprtCd").val(),
    initialValues = {}; // 페이지 로드 시 초기 값
  let feeRciv; // 그리드 instance
  let prcsCpltYn; // 처리완료여부
  let feeSn; // 수수료일련번호
  let prarDt; // 수취일자 == 수납일자
  let fValid; // 조회 == 0  저장 == 1
  let F006; // 수수료인식구분코드

  $(document).ready(function () {
    authInf();
    /**
     * 기업여신개별한도구분코드 E010
     * 기준금리종류코드 S003
     * 기업여신원리금상환구분코드 E020
     * 기업여신이자선후취구분코드 E011
     * 자금구분코드 F008
     * 이자납입일자코드 I017 INTR_PYM_DT_CD
     * 수수료인식구분코드 F006 FEE_RCOG_DCD
     * 기업여신신청종류코드 R023 RQS_KND_CD
     * 통화코드 I027 INVST_CRNCY_CD
     */
    getSelect = getSelectBoxList(
      "TB07010S",
      "E010/S003/E020/E011/F008/I017/F006/R023/I027",
      false
    );

    // 수수료인식구분코드
    F006 = getSelect.filter((item) => item.cmnsGrpCd === "F006");
    pqGrid();
    // 초기화 초기 세팅
    setBscVal();
    resetDd();

    $("input").on("focus", function () {
      $(this).select();
    });
    
    getDealInfoFromWF();
  });

  /*******************************************************************
   * PqGrid
   *******************************************************************/
  function pqGrid() {
    /**
     * PQGrid column header
     */
    let colFeeRciv = [
      {
        title: "일련번호",
        dataType: "string",
        dataIndx: "feeSn",
        halign: "center",
        align: "center",
        width: "5%",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수취일자",
        dataType: "string",
        dataIndx: "prarDt",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          let cellData = ui.cellData;
          if (cellData && cellData.length === 8) {
            return formatDate(cellData);
          }
          return cellData;
        },
      },
      {
        title: "수수료종류",
        dataType: "string",
        dataIndx: "feeKndNm",
        halign: "center",
        align: "left",
        width: "12%",
        filter: { crules: [{ condition: "range" }] },
        // render: function (ui) {
        // 	let value = parseFloat(ui.cellData);

        // 	let formattedValue = value.toLocaleString('ko-KR', {
        // 		minimumFractionDigits: 0,
        // 		maximumFractionDigits: 2
        // 	});

        // 	return formattedValue;
        // }
      },
      {
        title: "계정과목코드",
        dataType: "string",
        dataIndx: "actsCd",
        halign: "center",
        align: "left",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "계정과목명",
        dataType: "string",
        dataIndx: "actsNm",
        halign: "center",
        align: "left",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료인식구분",
        dataType: "string",
        dataIndx: "feeRcogDcd",
        halign: "center",
        align: "left",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: F006,
        },
        render: function (ui) {
          let fSel = F006.find(({ cdValue }) => cdValue == ui.cellData);
          return fSel ? fSel.cdName : ui.cellData;
        },
        // editable : true
      },
      {
        title: "과세유형구분",
        dataType: "string",
        dataIndx: "txtnTpNm",
        halign: "center",
        align: "left",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "수수료",
        halign: "center",
        colModel: [
          {
            title: "대상금액",
            dataType: "integer",
            dataIndx: "feeStdrAmt",
            halign: "center",
            align: "right",
            format: "#,###.00",
          },
          {
            title: "대상내용",
            dataType: "string",
            dataIndx: "feeTrgtCtns",
            halign: "center",
            align: "left",
          },
          {
            title: "율(%)",
            dataType: "string",
            dataIndx: "feeRt",
            halign: "center",
            align: "right",
          },
          {
            title: "금액",
            dataType: "integer",
            dataIndx: "feeAmt",
            halign: "center",
            align: "right",
            format: "#,###.00",
          },
        ],
      },
      {
        title: "처리완료여부",
        dataType: "string",
        dataIndx: "prcsCpltYn",
        hidden: true,
      },
    ];

    /**
     * PQGrid
     */
    let obj = [
      {
        height: 245,
        maxHeight: 245,
        id: "grd_feeRciv",
        colModel: colFeeRciv,
      },
    ];

    setPqGrid(obj);
    feeRciv = $("#grd_feeRciv").pqGrid("instance");
    //console.log(feeRciv);
  }

  /*******************************************************************
   * AJAX
   *******************************************************************/
  // 조회
  function srch() {
    fValid = "1";

    feeRciv.setData([]);

    if (validation().isValid) {
      let obj = { prdtCd: validation().prdtCd };

      $.ajax({
        type: "POST",
        url: "/TB07010S/getDetailInfo",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        beforeSend: function (xhr) {
          //console.log(xhr);
          resetExc();
          $("#TB07010S_loanablAmt").val("");
        },
        success: function (data) {
          // console.log("data ::: ", data);
          if (data) {
            /* 기업여신정보 */
            let obj = {};
            let eprzCrdlIndvLmtDcd = data.eprzCrdlIndvLmtDcd; // 기업여신개별한도구분코드
            let contractAmt = data.eprzCrdlCtrcAmt; // 약정금액
            let loanAmt = data.loanAmt; // 대출금액
            let dealExcBlce = data.dealExcBlce; // 대출잔액
            let loanablAmt; // 대출가능금액
            let crryCd = data.crryCd; // 통화코드

            $("#TB07010S_ptxtTrOthrDscmNo").val(
              isEmpty(data.ptxtTrOthrDscmNo)
                ? ""
                : checkBrnAcno(data.ptxtTrOthrDscmNo)
            ); // 거래상대방
            $("#TB07010S_ptxtTrOthrDscmNm").val(data.ptxtTrOthrDscmNm);   // 거래상대방명
            $("#TB07010S_prdtLclsCd").val(data.prdtLclsCd);               // 상품대분류
            $("#TB07010S_prdtMdclCd").val(data.prdtMdclCd);               // 상품중분류
            $("#TB07010S_prdtSclsCd").val(data.prdtClsfCd);               // 상품소분류
            $("#TB07010S_prdtSclsNm").val(data.eprzCrdlPrdtClsfNm);       // 상품소분류명
            $("#TB07010S_regDt").val(
              isEmpty(data.eprzCrdlApvlDt)
                ? ""
                : formatDate(data.eprzCrdlApvlDt)
            );
            $("#TB07010S_ctrcDt").val(
              isEmpty(data.ctrcDt) ? "" : formatDate(data.ctrcDt)
            );
            $("#TB07010S_ctrcExpDt").val(
              isEmpty(data.ctrcExpDt) ? "" : formatDate(data.ctrcExpDt)
            );
            $("#TB07010S_I027").val(crryCd); // 통화코드
            $("#TB07010S_eprzCrdlApvlAmt").val(
              isEmpty(data.eprzCrdlApvlAmt)
                ? ""
                : addComma(data.eprzCrdlApvlAmt)
            ); // 승인금액
            $("#TB07010S_S003").val(data.stdrIntrtKndCd);
            $("#TB07010S_R023").val(data.rqsKndCd);
            $("#TB07010S_E010").val(eprzCrdlIndvLmtDcd); // 기업여신개별한도구분코드
            $("#TB07010S_E020").val(data.eprzCrdlPaiRdmpDcd); // 기업여신원리금상환구분코드
            $("#TB07010S_rdmpMnum").val(data.prnaRdmpFrqcMnum); // 원금상환주기개월수
            $("#TB07010S_E011").val(data.eprzCrdlIntrBnaoDcd); // 기업여신이자선후취구분코드
            $("#TB07010S_intrMnum").val(data.intrRdmpFrqcMnum); // 이자상환주기개월수
            $("#TB07010S_achdNm").val(data.achdNm); // 예금주명

            if (crryCd === "KRW") {
              $("#TB07010S_contractAmt").val(
                isEmpty(contractAmt) ? "0" : addComma(Math.round(contractAmt))
              ); // 약정금액
              $("#TB07010S_loanAmt").val(
                isEmpty(loanAmt) ? "0" : addComma(Math.round(loanAmt))
              ); // 대출금액
              $("#TB07010S_dealExcBlce").val(
                isEmpty(dealExcBlce) ? "0" : addComma(Math.round(dealExcBlce))
              ); // 대출잔액
            } else {
              $("#TB07010S_contractAmt").val(
                isEmpty(contractAmt) ? "0" : addComma(contractAmt.toFixed(2))
              ); // 약정금액
              $("#TB07010S_loanAmt").val(
                isEmpty(loanAmt) ? "0" : addComma(loanAmt.toFixed(2))
              ); // 대출금액
              $("#TB07010S_dealExcBlce").val(
                isEmpty(dealExcBlce) ? "0" : addComma(dealExcBlce.toFixed(2))
              ); // 대출잔액
            }

            // 한도구분 == 1:개별(분할실행), 3:개별(일괄실행)
            if (eprzCrdlIndvLmtDcd === "1" || eprzCrdlIndvLmtDcd === "3") {
              loanablAmt = contractAmt - loanAmt; // 약정금액 - 대출금액 = 대출가능금액
              if (crryCd === "KRW") {
                $("#TB07010S_loanablAmt").val(addComma(Math.round(loanablAmt))); // 대출가능금액 소수점X
              } else {
                $("#TB07010S_loanablAmt").val(addComma(loanablAmt.toFixed(2))); // 대출가능금액 소수점2
              }
              // $('#TB07010S_dealExcBlce').val(addComma(dealExcBlce));			// 대출잔액
            } else if (eprzCrdlIndvLmtDcd === "2") {
              // 한도구분 == 2:한도
              loanablAmt = contractAmt - dealExcBlce; // 약정금액 - 대출잔액 = 대출가능금액
              if (crryCd === "KRW") {
                $("#TB07010S_loanablAmt").val(addComma(Math.round(loanablAmt))); // 대출가능금액 소수
              } else {
                $("#TB07010S_loanablAmt").val(addComma(loanablAmt.toFixed(2))); // 대출가능금액
              }
            }

            let stdrIntrt = data.stdrIntrt; // 기준
            let addIntrt = data.addIntrt; // 가산
            let totIntrt = data.totIntrt; // 총금리

            // 기업여신정보
            $("#TB07010S_stdrIntr_loan").val(stdrIntrt.toFixed(2)); // 기준
            $("#TB07010S_addIntr_loan").val(addIntrt.toFixed(2)); // 가산
            $("#TB07010S_totIntr_loan").val(totIntrt.toFixed(2)); // 총금리
            //console.log("기업여신정보 ::: total", totIntrt.toFixed(2));
            // 실행정보
            $("#TB07010S_stdrIntr_exe").val(stdrIntrt.toFixed(2)); // 기준
            $("#TB07010S_excAddIntrt_exe").val(addIntrt.toFixed(2)); // 가산
            $("#TB07010S_totIntr_exe").val(totIntrt.toFixed(2)); // 총금리
            //console.log("실행정보 ::: total ",totIntrt.toFixed(2));
            // [기업여신정보] 기준 + 가산 = 총금리
            if (stdrIntrt != null) {
              let sumIntrt = parseFloat(stdrIntrt) + parseFloat(addIntrt);
              $("#TB07010S_totIntr_loan").val(parseFloat(sumIntrt.toFixed(2))); // [기업여신정보] 총금리
              $("#TB07010S_totIntr_exe").val(parseFloat(sumIntrt.toFixed(2))); // [실행정보] 총금리
            }

            isKrw(data.crryCd); // 통화코드 control func

            // setAmtKorRate();
            obj.eprzCrdlIntrBnaoDcd = data.eprzCrdlIntrBnaoDcd;
            ctrlComp("intr", obj);
            obj.fndsDcd = data.fndsDcd;
            ctrlComp("F008", obj);

            calculator("dealExcAmt", data);

            $("#TB07010S_execDt").val(getToday()); // 실행일자 = 현재날짜
            $("#TB07010S_expDt").val(formatDate(data.ctrcExpDt)); // 만기일자 = 약정만기일
            // 상환지정일 실행일자에 맞춤
            let _day = getToday().slice(8, 10);
            let _day_noZero = Number(_day);
            $("#TB07010S_I017").val(_day_noZero);

            $("#TB07010S_chrg_empNo").val(userEno);
            $("#TB07010S_chrg_empNm").val(userEmpNm);

            calKrwTrsl(); // [실행정보] 원화환산실행금액
            calAcbkAmt(); // [최종지급금액] = 실행금액 - 선취이자 - 수수료

            obj.eprzCrdlIndvLmtDcd = eprzCrdlIndvLmtDcd; // 기업여신개별한도구분코드
            obj.loanablAmt = loanablAmt; // 대출가능금액
            obj.dealExcBlce = dealExcBlce; // 대출잔액
            obj.eprzCrdlApvlAmt = data.eprzCrdlApvlAmt; // 승인금액
            // console.log('obj 보내기 전 ::: ', obj);

            ctrlComp("btnSave", obj); // 실행버튼 컨트롤러

            /**
             * PQGrid options
             */
            // 처리완료여부 'N'인 것만
            // let filterData = data.excFee.filter(item => item.prcsCpltYn === 'N');
            feeRciv.setData(data.excFee);
            feeRciv.option("cellDblClick", function (event, ui) {
              let rowData = ui.rowData;
              $("#TB07010S_feeAmt").val(addComma(rowData.feeAmt));
              prcsCpltYn = "Y"; // 처리완료여부
              feeSn = rowData.feeSn; // 수수료일련번호
              prarDt = rowData.prarDt; // 수납일자 == 수취일자

              let feeAmt = Number(uncomma($("#TB07010S_feeAmt").val()));
              let acbkAmt = Number(uncomma($("#TB07010S_acbkAmt").val()));

              let tot = acbkAmt + feeAmt;

              $("#TB07010S_acbkAmt").val(comma(tot));

              calAcbkAmt();
            });
          } else {
            sf(1, "warning", `조회된 데이터가 없습니다.`);
            return;
          }
        },
        error: function (result) {
          sf(1, "error", `조회에 실패하였습니다.`);
          return;
        },
      });
    } else {
      return;
    }
  }

  // 이자조회
  function inqIntr() {
    fValid = "3";

    if (validation().isValid) {
      let obj = {
        prdtCd: validation().prdtCd, // 종목코드
        eprzCrdlIntrBnaoDcd: $("#TB07010S_E011").val(), // 이자선후취구분코드
        intrRdmpFrqcMnum: $("#TB07010S_intrMnum").val(), // 이자상환주기개월수
        aplyIrt: $("#TB07010S_totIntr_exe").val(), // 총금리
        excDt: unformatDate($("#TB07010S_execDt").val()), // 실행일자
        dealExcAmt: uncomma($("#TB07010S_dealExcAmt").val()), // 실행금액
        intrPymDtCd: unformatDate($("#TB07010S_I017").val()), // 상환지정일
      };

      $.ajax({
        type: "POST",
        url: "/TB07010S/inqIntr",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (data) {
          console.log("이자조회 ajax suc ::: ", data);

          $("#TB07010S_prcsIntrAmt").val(
            commaNull(Math.round(data.rdmpPrarIntr))
          );

          let krwTrslRt = $("#TB07010S_krwTrslRt").val(); // 적용환율
          let tot = data.rdmpPrarIntr * krwTrslRt;
          $("#TB07010S_krwTrslIntAmt").val(commaNull(Math.round(tot))); // 원화환산이자금액

          calAcbkAmt();
        },
        error: function () {
          sf(1, "error", `이자조회에 실패하였습니다.`);
          return;
        },
      });
    }
  }

  // 실행정보 저장
  function save() {
    fValid = "2";

    if (validation().isValid) {
      let prdtCd = validation().prdtCd; // 종목코드
      /* 기업여신정보 */
      let ptxtTrOthrDscmNo = $("#TB07010S_ptxtTrOthrDscmNo")
        .val()
        .replaceAll("-", "");
      let eprzCrdlPrdtLclsCd = $("#TB07010S_prdtLclsCd").val();
      let eprzCrdlPrdtMdclCd = $("#TB07010S_prdtMdclCd").val();
      let eprzCrdlPrdtClsfCd = $("#TB07010S_prdtSclsCd").val();
      let eprzCrdlApvlDt = unformatDate($("#TB07010S_regDt").val());
      let ctrcDt = unformatDate($("#TB07010S_ctrcDt").val());
      let ctrcExpDt = unformatDate($("#TB07010S_ctrcExpDt").val());
      let eprzCrdlApvlAmt = uncomma($("#TB07010S_eprzCrdlApvlAmt").val());
      let eprzCrdlCtrcAmt = uncomma($("#TB07010S_contractAmt").val());
      let crryCd = $("#TB07010S_crryCd").val(); // 통화코드
      let eprzCrdlIndvLmtDcd = $("#TB07010S_E010").val();
      let stdrIntrtKndCd = $("#TB07010S_S003").val();
      let eprzCrdlPaiRdmpDcd = $("#TB07010S_E020").val();
      let prnaRdmpFrqcMnum = $("#TB07010S_rdmpMnum").val();
      let eprzCrdlIntrBnaoDcd = $("#TB07010S_E011").val();
      let intrRdmpFrqcMnum = $("#TB07010S_intrMnum").val();
      let stdrIntrt = $("#TB07010S_stdrIntr_loan").val();
      let addIntrt = $("#TB07010S_addIntr_loan").val();
      let totIntrt = $("#TB07010S_totIntr_loan").val();

      /* 실행정보 */
      let excDt = unformatDate($("#TB07010S_execDt").val()); // 실행일자
      let expDt = unformatDate($("#TB07010S_expDt").val()); // 만기일자
      let dfrExpMnum = unformatDate($("#TB07010S_dfrExpMnum").val()); // 거치만기일자
      let intrPymDtCd = $("#TB07010S_I017").val(); // 상환지정일 == 이자납입일자코드
      //let stdrIntr = $('#TB07010S_stdrIntr_exe').val();				 // 기준
      let excAddIntrt = $("#TB07010S_excAddIntrt_exe").val(); // 가산
      //let totIntr = $('#TB07010S_totIntr_exe').val();				 // 총금리
      let prcsIntrAmt = uncomma($("#TB07010S_prcsIntrAmt").val()); // 처리이자금액 == 선취이자
      let dealExcAmt = uncomma($("#TB07010S_dealExcAmt").val()); // 딜실행금액 == 실행금액
      let expRdmpAmt = uncomma($("#TB07010S_expRdmpAmt").val()); // 딜실행잔액 == 만기상환금액
      let krwTrslRt = $("#TB07010S_krwTrslRt").val(); // 적용환율
      let krwTrslExcAmt = uncomma($("#TB07010S_krwTrslExcAmt").val()); // 원화환산실행금액
      let krwTrslIntAmt = uncomma($("#TB07010S_krwTrslIntAmt").val()); // 원화환산이자금액
      let feeAmt = uncomma($("#TB07010S_feeAmt").val()); // 수수료
      let acbkAmt = uncomma($("#TB07010S_acbkAmt").val()); // 최종지급금액 == 장부금액
      let fndsDcd = $("#TB07010S_F008").val(); // 자금구분코드
      // 자금원장?
      let rctmIsttCd = $("#TB07010S_fnltCd").val(); // 금융기관 == 입금기관코드
      let rctmIsttNm = $("#TB07010S_fnltNm").val(); // 금융기관명
      let brkgAcno = $("#TB07010S_brkgAcno").val(); // 위탁계좌번호
      // 은행부실점명?
      let achdNm = $("#TB07010S_achdNm").val(); // 예금주명
      let hndEmpno = $("#TB07010S_chrg_empNo").val(); // 담당자사번
      let empno = $("#TB07010S_empNo").val(); // 승인자사번

      // userEno
      // userEmpNm
      /* 수수료수납대장 */

      // console.log(
      // 			"prcsCpltYn ::: ", prcsCpltYn,
      // 			"\nfeeSn ::: ", feeSn,
      // 			"\nprarDt ::: ", prarDt,
      // 		   );
      let ibims348bVo = {
        prdtCd, // 종목코드
        prcsCpltYn, // 처리완료여부
        feeSn, // 일련번호
        feeRcivDt: prarDt, // 수취일자 == 수납일자
        feeRcivAmt: uncomma($("#TB07010S_feeAmt").val()), // 수수료 금액
      };

      /* 실행정보 IBIMS402B */
      let ibims402bDto = {
        prdtCd,
        excDt,
        expDt,
        dfrExpMnum,
        intrPymDtCd,
        excAddIntrt,
        prcsIntrAmt,
        dealExcAmt,
        expRdmpAmt,
        krwTrslRt,
        krwTrslExcAmt,
        krwTrslIntAmt,
        feeAmt,
        acbkAmt,
        fndsDcd,
        rctmIsttCd,
        rctmIsttNm,
        brkgAcno,
        achdNm,
        hndEmpno,
        empno,
      };

      // console.log(ibims402bDto)

      /* 기업여신정보 IBIMS401B */
      let ibims401bDto = {
        prdtCd,
        ptxtTrOthrDscmNo,
        eprzCrdlPrdtLclsCd,
        eprzCrdlPrdtMdclCd,
        eprzCrdlPrdtClsfCd,
        eprzCrdlApvlDt,
        ctrcDt,
        ctrcExpDt,
        eprzCrdlApvlAmt,
        eprzCrdlCtrcAmt,
        crryCd,
        eprzCrdlIndvLmtDcd,
        stdrIntrtKndCd,
        eprzCrdlPaiRdmpDcd,
        prnaRdmpFrqcMnum,
        eprzCrdlIntrBnaoDcd,
        intrRdmpFrqcMnum,
        stdrIntrt,
        addIntrt,
        totIntrt,
        /* 실행정보 IBIMS402B */
        ibims402BDTO: ibims402bDto,
        ibims348BVO: ibims348bVo,
      };

      $.ajax({
        type: "POST",
        url: "/TB07010S/saveExcInfo",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(ibims401bDto),
        dataType: "json",
        success: function () {
          sf(1, "success", `실행정보 저장이 완료되었습니다.`);
          prcsCpltYn = ""; // 처리완료여부
          feeSn = ""; // 일련번호
          prarDt = ""; // 수취일자 == 수납일자
          $("#TB07010S_feeAmt").val(""); // 수수료 금액
        },
        error: function () {
          sf(1, "error", `실행정보 저장에 실패하였습니다.`);
          return false;
        },
      });
    } else {
      return;
    }
  }

  /*******************************************************************
   * Event
   *******************************************************************/
  function setLoanablAmt() {
    let loanablAmt = 0; // 대출가능금액
    let eprzCrdlIndvLmtDcd = $("#TB07010S_E010").val(); // 기업여신개별한도구분코드
    // console.log(eprzCrdlIndvLmtDcd);

    let contractAmt = $("#TB07010S_contractAmt").val(); // 약정금액
    let dealExcBlce = $("#TB07010S_dealExcBlce").val(); // 대출잔액
    let loanAmt = $("#TB07010S_loanAmt").val(); // 대출금액

    if (Number(contractAmt) == Number.NaN) {
      contractAmt = 0;
    }

    if (Number(dealExcBlce) == Number.NaN) {
      dealExcBlce = 0;
    }

    if (Number(loanAmt) == Number.NaN) {
      loanAmt = 0;
    }

    //  대출가능금액 : [한도인 경우] 약정금액 - 대출잔액, [개별인 경우] 약정금액 - 대출금액
    if (eprzCrdlIndvLmtDcd == "1") {
      // 한도
      loanablAmt = Number(uncomma(contractAmt)) - Number(uncomma(dealExcBlce));
    } else {
      // 개별
      loanablAmt = Number(uncomma(contractAmt)) - Number(uncomma(loanAmt));
    }

    $("#TB07010S_loanablAmt").val(comma(loanablAmt));
  }
  
  function ldgMovePage() {
    // 원장조회 화면으로 이동
    callPage('TB07060S', '여신원장조회');
	window.scrollTo(0,0);
  }

  /**
   * Button Event
   * @param {string} f flag
   * @param {*} p param
   * @param {*} obj obj
   */
  function ctrlComp(f, obj = {}) {
    switch (f) {
      case "intr": // 이자조회 ::: 선취일때만 open
        // console.log('이자조회 ::: ', obj);
        if (obj.eprzCrdlIntrBnaoDcd === "1") {
          $("#TB07010S_prcsIntrAmt").prop("disabled", false);
          $("#btnIntr").prop("disabled", false);
          obj = {};
        } else {
          $("#TB07010S_prcsIntrAmt").prop("disabled", true);
          $("#btnIntr").prop("disabled", true);
          obj = {};
        }
        break;

      case "F008": // 이체방법 ::: 자동입출금만 금융기관,계좌번호,은행부실점명,예금주 open
        // console.log('이체방법 ::: ', obj);
        // 조회 후
        if (obj.fndsDcd === "6" || obj.fndsDcd === "1" || obj.fndsDcd === "2" || obj.fndsDcd === "3" || !obj.fndsDcd) {
          $("#TB07010S_fnltCd").prop("disabled", false);
          $("#TB07010S_brkgAcno").prop("disabled", false);
          $("#TB07010S_bankBsjNm").prop("disabled", false);
          $("#TB07010S_achdNm").prop("disabled", false);
          $("#btnFnlt").prop("disabled", false);
        } else {
          $("#TB07010S_fnltCd").prop("disabled", true);
          $("#TB07010S_brkgAcno").prop("disabled", true);
          $("#TB07010S_bankBsjNm").prop("disabled", true);
          $("#TB07010S_achdNm").prop("disabled", true);
          $("#btnFnlt").prop("disabled", true);
        }

        // 이체방법 select event
        $("#TB07010S_F008").on("change", function () {
          //selected value
          let val = $(this).val();
          if (val === "6" || val === "1" || val === "2" || val === "3" || !val) {
            $("#TB07010S_fnltCd").prop("disabled", false);
            $("#TB07010S_brkgAcno").prop("disabled", false);
            $("#TB07010S_bankBsjNm").prop("disabled", false);
            $("#TB07010S_achdNm").prop("disabled", false);
            $("#btnFnlt").prop("disabled", false);
          } else {
            $("#TB07010S_fnltCd").prop("disabled", true);
            $("#TB07010S_brkgAcno").prop("disabled", true);
            $("#TB07010S_bankBsjNm").prop("disabled", true);
            $("#TB07010S_achdNm").prop("disabled", true);
            $("#btnFnlt").prop("disabled", true);

            $("#TB07010S_fnltCd").val("");
            $("#TB07010S_fnltNm").val("");
            $("#TB07010S_brkgAcno").val("");
            $("#TB07010S_bankBsjNm").val("");
            $("#TB07010S_achdNm").val("");
          }
        });
        break;

      case "btnSave":
        // console.log("btnSave ::: ", obj);

        // 버튼 컨트롤
        if (obj.eprzCrdlIndvLmtDcd === "1" && obj.loanablAmt <= 0) {
          // 개별(분할실행) (1)
          // console.log('개별(분할실행) (1)');
          $("#btnSave").prop("disabled", true);
          obj = {};
          // console.log('개별(분할실행) (1) ::: obj', obj);
        } else if (
          obj.eprzCrdlIndvLmtDcd === "2" &&
          obj.eprzCrdlApvlAmt <= obj.dealExcBlce
        ) {
          // 한도 (2)
          // console.log('한도 (2)');
          // console.log('타니');

          $("#btnSave").prop("disabled", true);
          obj = {};
        } else if (obj.eprzCrdlIndvLmtDcd === "3" && obj.loanablAmt <= 0) {
          // 개별(일괄실행) (3)
          // console.log('개별(일괄실행) (3)');
          $("#btnSave").prop("disabled", true);
          obj = {};
        } else {
          $("#btnSave").prop("disabled", false);
          obj = {};
        }
        break;
      default:
        break;
    }
  }

  // reset 후 담당자 정보 다시 바인딩
  function setEno() {
    let empNo = $("#temp_empNo").val(); // 담당자사번
    let empNm = $("#temp_empNm").val(); // 담당자명

    $("#TB07010S_chrg_empNo").val(empNo); // 담당자사번
    $("#TB07010S_chrg_empNm").val(empNm); // 담당자명

    feeRciv.setData([]);
  }

  // 기업여신정보 KRW일 경우
  function isKrw(crryCd) {
    if (crryCd === "KRW") {
      let krwRt = 1.0;
      let parseRt = parseFloat(krwRt).toFixed(2);

      $("#TB07010S_krwTrslRt").val(parseRt);
      $("#TB07010S_krwTrslRt").prop("disabled", true);
    } else {
      $("#TB07010S_krwTrslRt").val("");
      $("#TB07010S_krwTrslRt").prop("disabled", false);
    }
  }

  // 최종지급금액 = 실행금액 - 선취이자 - 수수료
  function calAcbkAmt() {
    let excAmt = Number(removeComma($("#TB07010S_dealExcAmt").val())); // 실행금액
    let prcsIntrAmt = Number(removeComma($("#TB07010S_prcsIntrAmt").val())); // 선취이자
    let feeAmt = Number(removeComma($("#TB07010S_feeAmt").val())); // 수수료

    // excAmt = Number(uncomma(excAmt));
    // prcsIntrAmt = Number(uncomma(prcsIntrAmt));
    // feeAmt = Number(uncomma(feeAmt));

    let acbkAmt = excAmt - prcsIntrAmt - feeAmt; // 최종지급금액

    $("#TB07010S_acbkAmt").val(comma(acbkAmt));
  }

  // 기준/가산/총금리 계산
  function calInsRate() {
    let stdrIntr = $("#TB07010S_stdrIntr_exe").val(); // 기준
    let addIntr = $("#TB07010S_excAddIntrt_exe").val(); // 가산

    let fStdrIntr = parseFloat(stdrIntr);
    let fAddIntr = parseFloat(addIntr);

    if (isNaN(fStdrIntr) || isEmpty(fStdrIntr)) {
      fStdrIntr = 0;
    }
    // console.log(typeof fAddIntr);
    // console.log(fAddIntr);
    if (isNaN(fAddIntr) || isEmpty(fAddIntr)) {
      fAddIntr = 0;
    }

    if (!isNaN(fAddIntr)) {
      let totIntr = fStdrIntr + fAddIntr; // 총 금리

      let roundedValue = totIntr.toFixed(2);

      // console.log(roundedValue)
      $("#TB07010S_totIntr_exe").val(roundedValue);
      // console.log(roundedValue);
    } else {
      //$('#TB07010S_totIntr_exe').val(0);
    }
  }

  /**
   * @param {string} data
   * @returns data
   * @author 김건우
   */
  function unComma(data) {
    if (!data) {
      return "0";
    }

    if (typeof data === "string") {
      return data.replace(/,/g, "");
    }

    return data;
  }

  // 실행금액 * 적용환율 = 원화환산실행금액
  function calKrwTrsl() {
    let dealExcAmt = unComma($("#TB07010S_dealExcAmt").val()); // 실행금액
    let krwTrslRt = $("#TB07010S_krwTrslRt").val(); // 적용환율
    // krwTrslExcAmt, // 원화환산실행금액
    let num_dealExcAmt = Number(dealExcAmt);

    // console.log(num_dealExcAmt);

    if (num_dealExcAmt) {
      let tot = num_dealExcAmt * krwTrslRt;

      $("#TB07010S_krwTrslExcAmt").val(comma(tot));
    }
  }

  // 계산
  function calculator(f, p = {}) {
    switch (f) {
      case "dealExcAmt": // 실행금액 = 약정금액 - 대출금액
        // console.log(p.eprzCrdlCtrcAmt);
        if (isNaN(p.eprzCrdlCtrcAmt)) {
          p.eprzCrdlCtrcAmt = 0;
        }

        if (isNaN(p.loanAmt)) {
          p.loanAmt = 0;
        }

        let tot = Number(p.eprzCrdlCtrcAmt) - Number(p.loanAmt);
        $("#TB07010S_dealExcAmt").val(comma(tot)); // 실행금액

        break;
      default:
        break;
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation() {
    // 종목코드
    let prdtCd = $("#TB07010S_prdtCd").val();
    if (!prdtCd) {
      sf(1, "warning", `종목코드를 입력해주세요.`);
      return { isValid: false };
    }

    if (fValid === "2") {
      // 실행일자
      let execDt = $("#TB07010S_execDt").val();
      if (!execDt) {
        sf(1, "warning", `실행일자를 입력해주세요.`);
        return { isValid: false };
      }

      // 만기일자
      let expDt = $("#TB07010S_expDt").val();
      if (!expDt) {
        sf(1, "warning", `만기일자를 입력해주세요.`);
        return { isValid: false };
      }
      let numExecDt = Number(new Date(execDt));
      let numExpDt = Number(new Date(expDt));

      // 실행일자 > 만기일자
      if (numExecDt >= numExpDt) {
        sf(1, "warning", `실행일자는 만기일자보다 이후일 수 없습니다.`);
        return { isValid: false };
      }

      // 약정만기일
      let contractExprDt = $("#TB07010S_ctrcExpDt").val(); // 약정만기일자
      let numContractExprDt = Number(new Date(contractExprDt));

      if (numContractExprDt < numExpDt) {
        sf(
          1,
          "warning",
          `[기업여신정보]약정만기일보다<br>[실행정보]만기일자가 이후일 수 없습니다.`
        );
        return { isValid: false };
      }

      // 상환지정일 TB07010S_I017
      let intrPymDtCd = $("#TB07010S_I017").val();
      if (!intrPymDtCd) {
        sf(1, "warning", "상환지정일을 선택해주세요.");
        return { isValid: false };
      }

      // 최종지급금액
      let acbkAmt = $("#TB07010S_acbkAmt").val();
      if (acbkAmt < 0) {
        sf(1, "warning", "최종지급금액은 음수일 수 없습니다.");
        return { isValid: false };
      }
    }

    if (fValid === "3") {
      let dealExcAmt = $("#TB07010S_dealExcAmt").val();
      if (!dealExcAmt || dealExcAmt <= 0) {
        sf(1, "warning", "실행금액을 입력해주세요.");
        return { isValid: false };
      }

      let execDt = $("#TB07010S_execDt").val();
      if (!execDt) {
        sf(1, "warning", "실행일자를 입력해주세요.");
        return { isValid: false };
      }

      let intrPymDtCd = $("#TB07010S_I017").val();
      if (!intrPymDtCd) {
        sf(1, "warning", "상환지정일을 선택해주세요.");
        return { isValid: false };
      }
    }

    return { isValid: true, prdtCd };
  }

  /*******************************************************************
   * 초기화
   *******************************************************************/
  // 접속자 정보
  function authInf() {
    $("#TB07010S_chrg_empNo").val(userEno);
    $("#TB07010S_chrg_empNm").val(userEmpNm);
  }

  // 페이지 로드 시, 입력 요소의 초기 값
  function resetDd() {
    $('input[id^="TB07010S"]').each(function () {
      const $this = $(this);
      //console.log($this.attr('id'));
      initialValues[$this.attr("id")] = $this.val();
      //console.log(initialValues);
    });
  }

  // 초기화
  function reset() {
    $('input[id^="TB07010S"]').each(function () {
      const $this = $(this);
      //console.log($this);
      $this.val(initialValues[$this.attr("id")]);
    });

    $("select").each(function () {
      const $this = $(this);
      const id = $this.attr("id");
      // console.log('id :::: ', id);
      if (id && id.includes("I027")) {
        // 'I027'이 포함된 select 요소의 경우, value를 'KRW'로 설정
        $this.val("KRW");
      } else {
        // 나머지 select 요소의 경우, 첫 번째 옵션을 선택
        $this.prop("selectedIndex", 0);
      }
    });

    // 그리드 초기화
    feeRciv.setData([]);

    // 실행버튼 활성화
    $("#btnSave").prop("disabled", false);

    $("#TB07010S_fnltCd").prop("disabled", false);
    $("#TB07010S_brkgAcno").prop("disabled", false);
    $("#TB07010S_bankBsjNm").prop("disabled", false);
    $("#TB07010S_achdNm").prop("disabled", false);
    $("#btnFnlt").prop("disabled", false);

    // 수수료수납대장 초기화
    prcsCpltYn = "";
    feeSn = "";
    prarDt = "";

    obj = {};
  }

  // 수수료수납대장
  function feeReset() {
    let feeAmt = $("#TB07010S_feeAmt").val();
    if (feeAmt <= 0) {
      prcsCpltYn = "";
      feeSn = "";
      prarDt = "";
    }
  }

  // reset 실행정보만
  function resetExc() {
    $("#TB07010S_execDt").val("");
    $("#TB07010S_expDt").val("");
    $("#TB07010S_I017 option:eq(0)").prop("selected", true);
    $("#TB07010S_prcsIntrAmt").val("0");
    $("#TB07010S_dealExcAmt").val("0");
    $("#TB07010S_expRdmpAmt").val("0");
    $("#TB07010S_krwTrslRt").val("0");
    $("#TB07010S_krwTrslExcAmt").val("0");
    $("#TB07010S_krwTrslIntAmt").val("0");
    $("#TB07010S_feeAmt").val("0");
    $("#TB07010S_acbkAmt").val("0");
    $("#TB07010S_F008 option:eq(0)").prop("selected", true);
    $("#TB07010S_fnltCd").val("");
    $("#TB07010S_fnltNm").val("");
    $("#TB07010S_brkgAcno").val("");
    $("#TB07010S_achdNm").val("");
    $("#TB07010S_chrg_empNo").val("");
    $("#TB07010S_chrg_empNm").val("");
    $("#TB07010S_empNo").val("");
    $("#TB07010S_empNm").val("");

    // 은행부실점명
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

  // ?????????????????????
  function showAlert119() {
    Swal.fire({
      title: "수수료스케줄등록페이지 p117.",
      //text: "대출이 실행됩니다.",
      icon: "success",
    });
  }

  // 초기값 세팅
  function setBscVal() {
    $(`input[id*="Intr"]`).val("0");
  }

  /**
   * TEMP
   */
  // function showAlert() {
  // 	Swal.fire({
  // 		title: '대출 계약을 실행하시겠습니까?',
  // 		//text: "대출이 실행됩니다.",
  // 		icon: 'warning',
  // 		showCancelButton: true,
  // 		confirmButtonColor: '#3085d6',
  // 		cancelButtonColor: '#d33',
  // 		confirmButtonText: '확인',
  // 		cancelButtonText: '취소'
  // 	}).then((result) => {
  // 		// isConfirmed
  // 		// isDenied
  // 		// isDismissed
  // 		if (result.isConfirmed) {

  // 			Swal.fire({
  // 				title: '대출 계약을 실행하였습니다.',
  // 				//text: "대출이 실행됩니다.",
  // 				icon: 'success',
  // 			});

  // 		} else if (result.isDismissed) {
  // 		}
  // 	})
  // }
  // 담당직원정보
  // function loadUserAuth() {
  // 	$.ajax({
  // 		type: "GET",
  // 		url: "/getUserAuth",
  // 		dataType: "json",
  // 		success: function(data) {
  // 			loginUserId = data.eno;
  // 			$('#TB07010S_chrg_empNo').val(data.eno);
  // 			$('#TB07010S_chrg_empNm').val(data.empNm);
  //             $('#temp_empNo').val(data.eno);
  // 			$('#temp_empNm').val(data.empNm);
  // 		}
  // 	});
  // };

  // validation
  // 만기일자 <= 거치만기일자
  // let expDt    = unformatDate($('#TB07010S_expDt').val());	// 만기일자
  // let dfrExpMnum = unformatDate($('#TB07010S_dfrExpMnum').val());	// 거치만기일자

  // if ( !expDt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "만기일자를 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };

  // if ( !dfrExpMnum ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "거치만기일자를 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };

  // if ( expDt && dfrExpMnum && expDt <= dfrExpMnum ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "거치만기일자는 만기일자를 초과할 수 없습니다.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 가산
  // let excAddIntrt = $('#TB07010S_excAddIntrt_exe').val();
  // if ( !excAddIntrt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "가산 금리를 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 실행금액
  // let dealExcAmt = $('#TB07010S_dealExcAmt').val();
  // if ( !dealExcAmt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "실행금액을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 만기상환금액
  // let expRdmpAmt = $('#TB07010S_expRdmpAmt').val();
  // if ( !expRdmpAmt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "만기상환금액을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 적용환율
  // let krwTrslRt = $('#TB07010S_krwTrslRt').val();
  // if ( !krwTrslRt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "적용환율을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 원화환산실행금액
  // let krwTrslExcAmt = $('#TB07010S_krwTrslExcAmt').val();
  // if ( !krwTrslExcAmt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "원화환산실행금액을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 원화환산이자금액
  // let krwTrslIntAmt = $('#TB07010S_krwTrslIntAmt').val();
  // if ( !krwTrslIntAmt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "원화환산이자금액을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 최종지급금액
  // let acbkAmt = $('#TB07010S_acbkAmt').val();
  // if ( !acbkAmt ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "최종지급금액을 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 이체방법
  // let fndsDcd = $('#TB07010S_F008').val();
  // if ( !fndsDcd ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "이체방법을 선택해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 금융기관
  // let fnltCd = $('#TB07010S_fnltCd').val();
  // if ( !fnltCd ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "금융기관코드를 선택해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 계좌번호
  // let brkgAcno = $('#TB07010S_brkgAcno').val();
  // if ( !brkgAcno ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "계좌번호를 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 은행부실절명
  // 예금주
  // let achdNm = $('#TB07010S_achdNm').val();
  // if ( !achdNm ) {
  // 	Swal.fire({
  // 		icon: 'warning',
  // 		text: "예금주를 입력해주세요.",
  // 		confirmButtonText: "확인"
  // 	});
  // 	return { isValid : false };
  // };
  // 버튼 컨트롤
  // if ( eprzCrdlIndvLmtDcd === '1' && loanablAmt <= 0 ) { // 개별(분할실행) (1)
  // 	console.log('개별(분할실행) (1)');
  // 	$('#btnSave').prop("disabled", true);
  // } else if ( eprzCrdlIndvLmtDcd === '2' ) { // 한도 (2)
  // 	console.log('한도 (2)');
  // 	$('#btnSave').prop("disabled", false);
  // } else if ( eprzCrdlIndvLmtDcd === '3' && loanablAmt <= 0 ) { // 개별(일괄실행) (3)
  // 	console.log('개별(일괄실행) (3)');
  // 	$('#btnSave').prop("disabled", true);
  // } else {
  // 	$('#btnSave').prop("disabled", false);
  // }

  function calcAcbkAmt(){
    var dealExcAmt = $('#TB07010S_dealExcAmt').val();             //실행금액
    var krwTrslRt = $('#TB07010S_krwTrslRt').val();               //적용환율

    var krwTrslExcAmt = Number(dealExcAmt.replaceAll(',', ''))*Number(krwTrslRt);

    $('#TB07010S_krwTrslExcAmt').val(addComma(krwTrslExcAmt));

  }




  function getDealInfoFromWF() {
		if(sessionStorage.getItem("isFromWF")){
			console.log("WF세션 있음");
      var prdtCd = sessionStorage.getItem("wfPrdtCd");
      var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07010S_prdtCd").val(prdtCd);
			$("#TB07010S_prdtNm").val(prdtNm);
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
    
    //  전역변수
    feeRciv: feeRciv,
    prcsCpltYn: prcsCpltYn,
    feeSn: feeSn,
    prarDt: prarDt,
    fValid: fValid,
    F006: F006,

    // 함수
    srch: srch,
    reset: reset,
    setLoanablAmt: setLoanablAmt,
    inqIntr: inqIntr,
    save: save,
    showAlert119: showAlert119,
    ldgMovePage: ldgMovePage,
    calAcbkAmt: calAcbkAmt,
    calKrwTrsl: calKrwTrsl,
    feeReset: feeReset,
    getDealInfoFromWF : getDealInfoFromWF 

  };
})();
