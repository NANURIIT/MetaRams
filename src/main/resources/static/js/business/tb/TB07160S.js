const TB07160Sjs = (function () {
  // let initVal = {} // 초기값
  let rtnSel = {}; // return selectBox
  let fltObj = {}; // filter selectBox
  let dprtList = {}; //부서코드 LIST

  $(document).ready(function () {
    getSels(); // selectBox
    // initVal = getBasicValues('TB07160S'); // 초기화 초기 세팅

    //
    $("input").on("focus", function () {
      $(this).select();
    });
    getDealInfoFromWF();
  });

  /*******************************************************************
   * selectBox
   *******************************************************************/
  function getSels() {
    rtnSel = getSelectBoxList(
      "TB07160S",
      "I011/" + // 진행상태코드 			         PRG_STTS_CD
      "E020/" + // 기업여신원리금상환구분코드	  EPRZ_CRDL_PAI_RDMP_DCD
      "I005/" + // 기업여신개별한도구분코드	 	  INDV_LMT_DCD
      "H001/" + // 휴일처리구분코드			       HLDY_PRCS_DCD
      "E011/" + // 기업여신이자선후취구분코드	  EPRZ_CRDL_INTR_BNAO_DCD
      "E013/" + // 기업여신이자일수계산방법코드	EPRZ_CRDL_INTR_DNUM_CLC_MTH_CD
      "A005/" + // 계정코드                   ACT_CD
      "D002/" + // 기업여신전결권한구분코드    DCRB_ATH_DCD
      "R023/" + // 기업여신신청종류코드	       RQS_KND_CD
      "D010/" + // 부서코드                   DPRT_CD
      "S003/", // 기준금리종류코드            STDR_INTRT_KND_CD
      false
    );

    // // 그리드에서 사용하기 위해 filter or 중복된 공통코드 사용 시
    // fltObj.P009 = rtnSel.filter(item => item.cmnsGrpCd === 'P009');
    // fltObj.E020 = rtnSel.filter(item => item.cmnsGrpCd === 'E020');
    // fltObj.I005 = rtnSel.filter(item => item.cmnsGrpCd === 'I005');
    // fltObj.H001 = rtnSel.filter(item => item.cmnsGrpCd === 'H001');
    // fltObj.E011 = rtnSel.filter(item => item.cmnsGrpCd === 'E011');

    fltObj.S003 = rtnSel.filter((item) => item.cmnsGrpCd === "S003");

    dprtList = rtnSel.filter(function (item) {
      return item.cmnsGrpCd === "D010";
    });

    // // 중복 selectBox binding
    fltObj.S003.forEach((item) => {
      $("#TB07160S_S003_2").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName} (${item.cdValue})`,
        })
      );
    });
    // fltObj.I005.forEach(item => {
    //     $('#TB07150S_I005_2').append(
    //         $('<option>', {
    //             value: item.cdValue,
    //             text: `${item.cdName} (${item.cdValue})`
    //         })
    //     );
    // });
    // fltObj.H001.forEach(item => {
    //     $('#TB07150S_H001_2').append(
    //         $('<option>', {
    //             value: item.cdValue,
    //             text: `${item.cdName} (${item.cdValue})`
    //         })
    //     );
    // });
    // fltObj.E011.forEach(item => {
    //     $('#TB07150S_E011_2').append(
    //         $('<option>', {
    //             value: item.cdValue,
    //             text: `${item.cdName} (${item.cdValue})`
    //         })
    //     );
    // });
    // fltObj.E013.forEach(item => {
    //     $('#TB07150S_E013_2').append(
    //         $('<option>', {
    //             value: item.cdValue,
    //             text: `${item.cdName} (${item.cdValue})`
    //         })
    //     );
    // });

    dprtList.forEach((item) => {
      $("#TB07160S_bfDprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );


      $("#TB07160S_rcjsDprtNm").append(
        $("<option>", {
          value: item.cdValue,
          text: `${item.cdName}`,
        })
      );
    });

    //$('#TB07160S_rcjsDprtCd').val(dprtList[0].cdValue);
  }

  // 수관부서 셀렉트박스 변경 시
  $("#TB07160S_rcjsDprtNm").on("change", function () {
    var dprtCd = $(this).val();

    $("#TB07160S_rcjsDprtCd").val(dprtCd);
  });

  /*******************************************************************
   * AJAX
   *******************************************************************/
  function srch_TB07160S() {
    var prdtCd = $("#TB07160S_prdtCd").val(); //종목코드
    
    if ( validation().isValid ) {
      var param = {
        prdtCd: validation().prdtCd,
      };

      $('#TB07160S_rcjsData').find('input, select').val("");
  
      $.ajax({
        type: "POST",
        url: "/TB07160S/getTrrcInf",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (data) {
          if (!data.prdtCd) {
            sf('warning', '조회된 내역이 없습니다.', 'Warning!')
            return
          }
          //변경 전 원장정보
          $("#TB07160S_trOthrDscmNo").val(data.trOthrDscmNo);             //거래상대식별번호
          $("#TB07160S_trOthrDscmNm").val(data.trOthrDscmNm);             //거래상대명
          $("#TB07160S_prdtCd_srch").val(data.prdtCd);                    //상품코드
          $("#TB07160S_prdtNm_srch").val(data.prdtNm);                    //상품명
          $("#TB07160S_A005").val(data.actsCd);                           //계정과목코드
          $("#TB07160S_ctrcDt").val(formatDate(data.ctrcDt));             //대출일자
          $("#TB07160S_ctrcExpDt").val(formatDate(data.ctrcExpDt));       //만기일자
          $("#TB07160S_eprzCrdlApvlAmt").val(comma(data.eprzCrdlApvlAmt));//승인금액
          $("#TB07160S_E011").val(data.intrBnaoDcd);                      //이자선후취구분
          $("#TB07160S_dealExcBlce").val(comma(data.dealExcBlce));        //대출잔액
          $("#TB07160S_E020").val(data.paiRdmpDcd);                       //상환방법
          $("#TB07160S_prnaDfrPrdMnum").val(data.prnaDfrPrdMnum);         //거치기간개월수
          $("#TB07160S_I005").val(data.eprzCrdlIndvLmtDcd);               //한도/개별
          $("#TB07160S_S003").val(data.stdrIntrtKndCd);                   //기준금리종류코드
          $("#TB07160S_stdrIntrt").val(data.stdrIntrt);                   //기준금리
          $("#TB07160S_addIntrt").val(data.addIntrt);                     //가산금리
          $("#TB07160S_intrRdmpFrqcMnum").val(data.intrRdmpFrqcMnum);     //상환주기
  
          //이수관정보
          $("#TB07160S_apvlDt").val(formatDate(data.apvlDt));             //승인일자
          $("#TB07160S_prdtCd_srch2").val(data.prdtCd);                   //상품코드
          $("#TB07160S_prdtNm_srch2").val(data.prdtNm);                   //상품명
          $("#TB07160S_I011").val(data.prgSttsCd);                        //진행상태코드
          $("#TB07160S_R023").val(data.rqsKndCd);                         //신청종류코드
          $("#TB07160S_apvlAmt").val(comma(data.eprzCrdlApvlAmt));        //승인금액
          $("#TB07160S_D002").val(data.dcrbAthDcd);                       //전결권한구분코드
          $("#TB07160S_S003_2").val(data.stdrIntrtKndCd);                 //기준금리종류코드
          $("#TB07160S_stdrIntrt_2").val(data.stdrIntrt);                 //기준금리
          $("#TB07160S_addIntrt_2").val(data.addIntrt);                   //가산금리
  
          var trrcDt = data.trrcDt;
  
          if(isEmpty(trrcDt)){
            $("#TB07160S_trrcDt1").val(data.trrcDt);
            $("#TB07160S_trrcDt2").val(data.trrcDt);
          }else{
            $("#TB07160S_trrcDt1").val(formatDate(data.trrcDt));
            $("#TB07160S_trrcDt2").val(formatDate(data.trrcDt));
          }
  
          $("#TB07160S_bfEmpNo").val(data.chrrEmpno);                     //수관 담당자(정) 사원번호
          $("#TB07160S_bfEmpNm").val(data.chrrEmpnm);                     //수관 담당자(정) 이름
          $("#TB07160S_bfDprtCd").val(data.dprtCd);
          $("#TB07160S_bfDprtNm").val(data.dprtCd);
  
          $("#TB07160S_trrcAmt").val(comma(data.dealExcBlce));
  
        },
      });
    }


    // if (isEmpty(prdtCd)) {
    //   var option = {};
    //   option.title = "Error";
    //   option.type = "error";

    //   option.text = "종목코드를 입력한 후 다시 시도해주세요.";
    //   openPopup(option);
    //   return false;
    // }

    
  }


  function save() {
    var chrrEmpno = $("#TB07160S_empNo").val();          //담당자사번
    var mngmBdcd = $("#TB07160S_rcjsDprtNm").val();      //수관부서 코드
    var prdtCd = $("#TB07160S_prdtCd").val();            //종목코드

    var today = getToday();
    var trrcDt = today.replaceAll('-', '');

    if (isEmpty(prdtCd)) {
      var option = {};
      option.title = "Warning!";
      option.type = "warning";

      option.text = "종목코드를 입력한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    }else if(isEmpty(mngmBdcd)){
      var option = {};
      option.title = "Warning!";
      option.type = "warning";

      option.text = "수관부서를 선택한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    }else if(isEmpty(chrrEmpno)){
      var option = {};
      option.title = "Warning!";
      option.type = "warning";

      option.text = "담당자를 선택한 후 다시 시도해주세요.";
      openPopup(option);
      return false;
    }else{

      var param = {
        chrrEmpno: chrrEmpno,
        mngmBdcd: mngmBdcd,
        trrcDt: trrcDt,
        prdtCd: prdtCd
      }

      $.ajax({
        type: "POST",
        url: "/TB07160S/trrcRgst",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (data) {
          if(data < 0){
            Swal.fire({
              icon: "warning",
              title: "Warning!",
              text: "이수관처리에 실패하였습니다.",
              confirmButtonText: "확인",
            });
          }
          else{
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "이수관처리를 완료하였습니다.",
              confirmButtonText: "확인",
            });
            srch_TB07160S();
          }
          
        },
      });
    }
  }

  /*******************************************************************
   * validation
   *******************************************************************/
  function validation() {
    let prdtCd = $('#TB07160S_prdtCd').val() // 종목코드드

    if (!prdtCd) {
      sf('warning', '종목코드를 입력해주세요.', 'Warning!')
      return { isValid : false }
    }

    return { isValid : true, prdtCd }
  }

  /*******************************************************************
   * 초기화
   *******************************************************************/

  function reset() {
    $(`input[id^="TB07150S"]`).each((index, element) => {
      const $this = $(element);
      // console.log($this);
      // console.log(initVal[$this.attr('id')]);

      $this.val(initVal[$this.attr("id")]);
    });
  }

  /*******************************************************************
   * Swal.fire
   *******************************************************************/
  function sf(icon, html, title="", callback = () => {}) {
    Swal.fire({
      icon: `${icon}`,
      html: `${html}`,
      title: `${title}`,
      confirmButtonText: "확인",
    }).then(callback);
  }

  function getDealInfoFromWF() {
		
		if(sessionStorage.getItem("isFromWF")){

			var prdtCd = sessionStorage.getItem("wfPrdtCd");
			var prdtNm = sessionStorage.getItem("wfPrdtNm");
			$("#TB07160S_prdtCd").val(prdtCd);
			$("#TB07160S_prdtNm").val(prdtNm);
      srch_TB07160S();
		}else{

		}
		sessionStorage.clear();
	}

  return {
    srch_TB07160S: srch_TB07160S,
    getDealInfoFromWF: getDealInfoFromWF,
    save: save
  };
})();
