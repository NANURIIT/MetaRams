const TB04050Sjs = (function () {
  let colModel_TB04050S = [
    //체크박스
    {
      dataIndx: "state",
      align: "center",
      halign: "center",
      title: "선택",
      type: "checkBoxSelection",
      sortable: false,
      editor: false,
      dataType: "bool",
      width: "",
      editable: "true",
      cb: {
        all: false,
        header: false,
      },
    },
    {
      title: "사업관리번호",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "업무명",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "파일종류",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록일시",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "담당자",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "파일명",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "파일크기",
      // editable: true,
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  $(document).ready(function () {
    loadSelectBoxContents();
    setGrid_TB04050S();

    getUrlDealInfo();
  });

  // 세션으로 받앗을때
  function getUrlDealInfo() {
    let dealNo = sessionStorage.getItem("dealNo");
    let dealNm = sessionStorage.getItem("dealNm");

    if (isNotEmpty(dealNo)) {
      $("#TB04050S_ibDealNo").val(dealNo);
      $("#TB04050S_ibDealNm").val(dealNm);
      getLoiDetail();
      getDealInfo_TB04050S(dealNo);
    }
    sessionStorage.clear();
  }

  function setGrid_TB04050S() {
    pqGridObjFileList = [
      {
        height: 73,
        maxHeight: 73,
        id: "TB04050S_fileList",
        colModel: colModel_TB04050S,
      },
    ];

    setPqGrid(pqGridObjFileList);

    pqGridObjFileList = $("#TB04060S_ibDealList").pqGrid("instance");
    //pqGridObjFileList.refreshDataAndView();
  }

  function loadSelectBoxContents() {
    var item = "";
    item += "L004"; // 발급상태
    item += "/" + "I027"; // 통화코드
    item += "/" + "I020"; // 사업구분
    item += "/" + "I021"; // 사업구분상세
    item += "/" + "I024"; // PF사업구분
    item += "/" + "I011"; // 진행상태
    item += "/" + "T005"; // 대상자산구분
    item += "/" + "B013"; // 사업방식
    //item += '/' + 'T002';					// 당사주선구분
    item += "/" + "I038"; // 투자유형
    item += "/" + "I047"; // 투자구조
    item += "/" + "I048"; // 투자방식
    item += "/" + "I044"; // 지역대분류
    item += "/" + "I045"; // 지역중분류
    item += "/" + "I046"; // 지역소분류
    item += "/" + "C008";
    item += "/" + "B008";
    item += "/" + "I028";
    item += "/" + "I029";
    item += "/" + "I030";
    item += "/" + "I031";
    item += "/" + "C006";
    item += "/" + "B019";
    item += "/" + "I006";
    item += "/" + "C012";
    item += "/" + "C010";
    item += "/" + "I027";

    getSelectBoxList("TB04050S", item);
  }

  // 조회
  function getLoiDetail() {
    if (isEmpty($("#TB04050S_ibDealNo").val())) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal 번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
    } else {
      businessFunction();
    }

    function businessFunction() {
      var dealNo = $("#TB04050S_ibDealNo").val();
      var dtoParam = {
        dealNo: dealNo,
      };

      //alert(JSON.stringify(dtoParam));

      $.ajax({
        type: "GET",
        url: "/TB04050S/getLoi",
        data: dtoParam,
        beforeSend: function () {
          $('[name="TB04050S_issLtrYN"][value="1"]').prop("checked", true); // 발급서류구분
          $("#TB04050S_smit").val(""); // 제출처
          $("#TB04050S_L004").val("1"); // 발급상태
          $("#TB04050S_I027_1").val("KRW"); // 발급통화코드
          $("#TB04050S_issAmt").val(""); // 발급액
          $("#TB04050S_issDt").val(""); // 발급일자
          $("#TB04050S_valtDt").val(""); // 유효일자
          $("#TB04050S_rclmDt").val(""); // 회수일자
          $("#TB04050S_empNm").val(""); // 담당자이름
          $("#TB04050S_dprtNm").val(""); // 담당자부서
          $("#TB04050S_ivtgRqstCtns").val(""); // 검토요청내용
        },
        success: function (data) {
          if (JSON.stringify(data).length > 2) {
            $('[name="TB04050S_issLtrYN"][value="' + data.loiLocYn + '"]').prop(
              "checked",
              true
            ); // 발급서류구분
            console.log("확인해보자: ", data);

            $("#TB04050S_smit").val(data.smitOrgi); // 제출처
            $("#TB04050S_L004").val(data.issSttsCd); // 발급상태
            $("#TB04050S_I027_1").val(data.issCrryCd); // 발급통화코드
            $("#TB04050S_issAmt").val(addComma(handleNullData(data.issAmt))); // 발급액
            $("#TB04050S_issDt").val(formatDate(data.issDt)); // 발급일자
            $("#TB04050S_valtDt").val(formatDate(data.valtDt)); // 유효일자
            $("#TB04050S_rclmDt").val(formatDate(data.rclmDt)); // 회수일자
            $("#TB04050S_empNm").val(data.empNm); // 담당자이름
            $("#TB04050S_dprtNm").val(data.dprtNm); // 담당자부서
            $("#TB04050S_empNo").val(data.empNo); // 담당자 사번
            $("#TB04050S_dprtCd").val(data.dprtCd); // 담당부서코드
            $("#TB04050S_ivtgRqstCtns").val(data.ivtgRqstCtns); // 검토요청내용
          } else {
            $("#TB04050S_I027_1").val("KRW"); // 발급통화코드
          }
        },
        error: function (request, status, error) {
          console.log(
            "code:" +
              request.status +
              "\n" +
              "message:" +
              request.responseText +
              "\n" +
              "error:" +
              error
          );
        },
      });
    }
  }

  function getDealInfo_TB04050S(dealNo) {
    //alert(dealNo);

    var dealNo = dealNo;

    var inputParam = {
      dealNo: dealNo,
      sn: "",
    };

    $.ajax({
      type: "GET",
      url: "/TB03020S/getBscDealDetail",
      data: inputParam,
      dataType: "json",
      success: function (data) {
        /* 기본정보*/
        $("#TB04050S_dealNm").val(data.dealNm);
        $("#TB04050S_C008").val(data.corptnTypCd);
        $("#TB04050S_B008").val(data.bookCd);
        $("#TB04050S_I029").val(data.invPrdtLclsCd);
        $("#TB04050S_I030").val(data.invPrdtMdclCd);
        $("#TB04050S_I031").val(data.invPrdtClsfCd);
        $("#TB04050S_I028").val(data.invstGdsDtlsDvdCd); //투자상품 상세분류
        $("#TB04050S_dealCntnt").val(data.invDealCntn);
        $("#TB04050S_bnkBd").val(data.bnkBd);
        $("#TB04050S_C006").val(data.ntnCd);
        $("#TB04050S_invstCty").val(data.invstCty);

        /* 업체정보 */
        $("#TB04050S_corpRgstNo").val(checkBrnAcno(data.ptxtTrOthrDscmNo));
        $("#TB04050S_entpRnm").val(data.ptxtTrOthrDscmNm);
        $("#TB04050S_B019").val(data.bzsacalCd);
        $("#TB04050S_I006").val(data.indTypDvdCd);
        $("#TB04050S_irls").val(data.irls);
        $("#TB04050S_C012").val(data.crdtGrdCd);
        $("#TB04050S_lstMkt").val(data.lstMkt);

        /* 수익정보 */
        if (data.invAmtDcsnYn == "Y") {
          $("#TB04050S_dealSclY").attr("checked", true);
        } else {
          $("#TB04050S_dealSclY").attr("checked", false);
        }
        if (data.invAmtDcsnYn == "N") {
          $("#TB04050S_dealSclN").attr("checked", true);
        } else {
          $("#TB04050S_dealSclN").attr("checked", false);
        }

        $("#TB04050S_dealScl").val(addComma(data.allInvAmt));
        if (data.thcoPtciAmtDcsnYn == "Y") {
          $("#TB04050S_ptctSclY").attr("checked", true);
        } else {
          $("#TB04050S_ptctSclY").attr("checked", false);
        }
        if (data.thcoPtciAmtDcsnYn == "N") {
          $("#TB04050S_ptctSclN").attr("checked", true);
        } else {
          $("#TB04050S_ptctSclN").attr("checked", false);
        }

        $("#TB04050S_ptctScl").val(addComma(data.thcoPtciAmt));
        $("#TB04050S_allErn").val(addComma(data.allErnAmt));
        $("#TB04050S_thyrErn").val(addComma(data.theYearErnAmt));
        $("#TB04050S_wrtErn").val(addComma(data.baltErnAmt));
        $("#TB04050S_intrErn").val(addComma(data.intrErnAmt));
        $("#TB04050S_invstCrncyCd").val(data.crryCd);
        $("#TB04050S_invstCrncyAmt").val(addComma(data.crryAmt));
        $("#TB04050S_wrtDt").val(formatDate(data.expDt));
        $("#TB04050S_mtrtDt").val(formatDate(data.mtrtDt));

        /* 기타정보 */
        $("#TB04050S_c_corpRgstNo").val(checkBrnAcno(data.csucCmpDscmNo));
        $("#TB04050S_c_entpRnm").val(data.csucCmpDscmNm);
        $("#TB04050S_C010").val(data.crdtEhcmntCcd);
        $("#TB04050S_ltv").val(data.ltv);
        $("#TB04050S_ovrsCorpCoprtnCd").val(data.ovrsCorpCoprtnCd);
        $("#TB04050S_etcCntn").val(data.etcCntn);
      },
    });
  }

  // 저장
  function saveLoi() {
    var dealNo = $("#TB04050S_ibDealNo").val(); //Deal번호
    var dealNm = $("#TB04050S_ibDealNm").val(); //Deal명
    //var fndNm = $('#TB04050S_fndNm').val();								//펀드명
    var issLtrDcd = $("input[name=TB04050S_issLtrYN]:checked").val(); //발급서류 (LOI/LOC)
    var smitOrgi = $("#TB04050S_smit").val(); //제출처
    var issSttsCd = $("#TB04050S_L004").val(); //발급상태
    var issCrryCd = $("#TB04050S_I027_1").val(); //발급통화코드
    var issAmt = $("#TB04050S_issAmt").val(); //발급액
    var issDt = $("#TB04050S_issDt").val(); //발급일자
    var valtDt = $("#TB04050S_valtDt").val(); //유효일자
    var rclmDt = $("#TB04050S_rclmDt").val(); //회수일자
    var empNo = $("#TB04050S_empNo").val(); //담당자 사번
    var dprtCd = $("#TB04050S_dprtCd").val(); //부서코드
    var ivtgRqstCtns = $("#TB04050S_ivtgRqstCtns").val(); //검토요청내용
    //var ivtgRsltCtns = $('#TB04050S_ivtgCtns').val(); ??

    var loiLocYn = "";

    if ($(":radio[name='TB04050S_issLtrYN']").radioSelect("1")) {
      loiLocYn = "Y";
    } else {
      loiLocYn = "N";
    }

    if (!isEmpty(dealNo)) {
      registLoi();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function registLoi() {
      var dtoParam = {
        dealNo: dealNo,
        dealNm: dealNm,
        // , 		 "fndNm" : fndNm
        issLtrDcd: issLtrDcd,
        smitOrgi: smitOrgi,
        issSttsCd: issSttsCd,
        issCrryCd: issCrryCd,
        issAmt: issAmt.replaceAll(",", "") / 1,
        issDt: issDt.replaceAll("-", ""),
        valtDt: valtDt.replaceAll("-", ""),
        rclmDt: rclmDt.replaceAll("-", ""),
        empNo: empNo,
        dprtCd: dprtCd,
        ivtgRqstCtns: ivtgRqstCtns,
        loiLocYn: loiLocYn,

        // , "ivtgRsltCtns" : ivtgRsltCtns
      };

      //alert(JSON.stringify(dtoParam));

      $.ajax({
        type: "POST",
        url: "/TB04050S/registLoi",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "요청정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "요청정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  return {
    /**
     * 사용 할 함수 정의
     */
    saveLoi: saveLoi,
    getLoiDetail: getLoiDetail, //TB03021P에서 사용
    getDealInfo_TB04050S: getDealInfo_TB04050S, //TB03021P에서 사용
  };
})();
