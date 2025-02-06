const TB08031Sjs = (function () {
  let bsnsPartInfoInstance;         //사업참가자정보 instance
  let bsnsForecastInstance;         //사업주요전망 instance
  let bondProtInfoInstance;         //채권보전주요약정 instance
  let cchInfoInstance;              //조견변경이력 instance
  let stlnInfoInstance;             //대주단정보 instance
  let ernInfoInstance;              //수익자정보 instance
  let loanBanoInfoInstance;         //투자자산계좌(종목)정보 - 대출계좌 instance
  let ernSctyInfoInstance;          //투자자산계좌(종목)정보 - 수익증권 instance
  let udwrtPaiBzscalInfoInstance;   //인수대상 기업정보 instance
  let busiInfoInstance;             //관련사업정보 instance
  let admsAsstInfoInstance;         //편입자산정보 instance
  let invstBzscalInstance;          //투자기업목록 instance
  let asstWrkngInfoInstance;        //자산운용사정보 instance

  let selectBoxList_TB08031S;
  let p001List;
  

  /* 편집자산 정보 colM  todo: id없음....*/

  $(document).ready(function () {
    loadInvbnkAmnBzCd(); // 사업구분 정보
    loadSelectBoxContents();

  });


  //담당자 초기값 지정
  function setLoginUserAuth(){

    var usrNm = $('#userEmpNm').val();
    var usrEno = $('#userEno').val();
    var usrDprtCd = $('#userDprtCd').val();

    $('#TB08031S_charge_empNo').val(usrEno);
    $('#TB08031S_charge_empNm').val(usrNm);
    $('#TB08031S_D010').val(usrDprtCd);
  }


  function loadSelectBoxContents() {
    var item = "";
    item += "I011"; // 진행상태
    item += "/" + "I027"; // 통화코드
    item += "/" + "C012"; // 신용등급
    item += "/" + "I021"; // 사업구분상세
    item += "/" + "T002"; // 당사주선구분
    item += "/" + "I033"; // 금리구분코드
    item += "/" + "S003"; // 기준금리
    item += "/" + "D010"; // 업무팀
    item += "/" + "C014"; // 시행주체구분
    item += "/" + "B011"; // 사업지역
    item += "/" + "B019"; // 기업규모구분
    item += "/" + "C010"; // 신용보강
    item += "/" + "P001"; // 참가자관계
    item += "/" + "B007"; // 채권보전구분
    item += "/" + "R021"; // 구분 (대주단, 수익자)
    item += "/" + "B013"; // 사업방식
    item += "/" + "B012"; // 사업수주구분
    item += "/" + "U002"; // 상환방식
    item += "/" + "U001"; // 인수사업구분
    item += "/" + "I038"; // 투자유형
    item += "/" + "T005"; // 대상자산구분
    item += "/" + "L006"; // 리스종류
    item += "/" + "F009"; // 펀드구분
    item += "/" + "F010"; // 펀드유형상세

    selectBoxList_TB08031S = getSelectBoxList("TB08031S", item, false);

    p001List = selectBoxList_TB08031S.filter((item) => item.cmnsGrpCd === "P001");
    
    setGrid_TB08031S();

    setLoginUserAuth();

  }

  function setGridTimeOut(e) {

    if(e === "bsnsPartInfo"){
      setTimeout(() => bsnsPartInfoInstance.refresh(), 1);
    }else if(e === "bsnsForecast"){
      setTimeout(() => bsnsForecastInstance.refresh(), 1);
    }else if(e === "bondProtInfo"){
      setTimeout(() => bondProtInfoInstance.refresh(), 1);
    }else if(e === "cchInfo"){
      setTimeout(() => cchInfoInstance.refresh(), 1);
    }else if(e === "stlnInfo"){
      setTimeout(() => stlnInfoInstance.refresh(), 1);
    }else if(e === "ernInfo"){
      setTimeout(() => ernInfoInstance.refresh(), 1);
    }else if(e === "loanBanoInfo"){
      setTimeout(() => loanBanoInfoInstance.refresh(), 1);
      setTimeout(() => ernSctyInfoInstance.refresh(), 1);
    }else if(e === "udwrtPaiBzscalInfo"){
      setTimeout(() => udwrtPaiBzscalInfoInstance.refresh(), 1);
    }else if(e === "busiInfo"){
      setTimeout(() => busiInfoInstance.refresh(), 1);
    }else if(e === "admsAsstInfo"){
      setTimeout(() => admsAsstInfoInstance.refresh(), 1);
    }else if(e === "invstBzscalList"){
      setTimeout(() => invstBzscalInstance.refresh(), 1);
    }else if(e === "asstWrkngInfo"){
      setTimeout(() => asstWrkngInfoInstance.refresh(), 1);
    }
    
  }

  //pqGrid setting...
  function setGrid_TB08031S() {

      /* 사업참가자정보 colM */
  let colM_bsnsPartInfo = [
    {
      title: "NO",
      dataType: "string",
      dataIndx: "erlmSeq",
      align: "center",
      halign: "center",
      width: "",
      maxWidth: 60,
      minWidth: 60,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      // title: "참가자관계",
      // dataType: "string",
      // dataIndx: "ptcnRelrDcd",
      // align: "left",
      // halign: "center",
      // width: "",
      // filter: { crules: [{ condition: "range" }] },

      title: "참가자관계",
        dataType: "string",
        dataIndx: "ptcnRelrDcd",
        halign: "center",
        align: "center",
        filter: { crules: [{ condition: "range" }] },
        editor: {
          type: "select",
          valueIndx: "cdValue",
          labelIndx: "cdName",
          options: p001List,
        },
        render: function (ui) {
          // console.log("cellData ::: ", ui.cellData);
          // console.log(P013);
          let paiTypCd = p001List.find(({ cdValue }) => cdValue == ui.cellData);
          return paiTypCd ? paiTypCd.cdName : ui.cellData;
        },
    },
    {
      title: "업체명",
      dataType: "string",
      dataIndx: "entpNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "대표자명",
      dataType: "string",
      dataIndx: "rpsrNm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "법인등록번호",
      dataType: "string",
      dataIndx: "crno",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "사업자등록번호",
      dataType: "string",
      dataIndx: "bzno",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      dataType: "string",
      dataIndx: "sn",
      hidden: true
    }
  ];

  /* 사업 주요전망 colM */
  let colM_bsnsForecast = [
    {
      title: "NO",
      dataType: "string",
      dataIndx: "erlmSeq",
      align: "center",
      halign: "center",
      width: "",
      maxWidth: 60,
      minWidth: 60,
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "예정일자",
      dataType: "string",
      dataIndx: "prarDt",
      align: "center",
      halign: "center",
      width: "",
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
      title: "이행일자",
      dataType: "string",
      dataIndx: "flflDt",
      align: "center",
      halign: "center",
      width: "",
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
      dataIndx: "flflYn",
      title: "이행여부",
      dataType: "string",
      align: "center",
      halign: "center",
      width: "",
      editor: {
          type: "select",
          options: [
              { value: "Y", label: "이행" },
              { value: "N", label: "불이행" }
          ],
          valueIndx: "value", 
          labelIndx: "label" 
      },
      render: function (ui) {
        return ui.cellData === "Y" ? "이행" : "불이행";
      }
    },
    {
      title: "주요일정내용",
      dataType: "string",
      dataIndx: "mainScxCtns",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      dataType: "string",
      dataIndx: "sn",
      hidden: true
    }

  ];

  /* 채권보전 주요약정 colM */
  let colM_bondProtInfo = [
    // {
    //   dataIndx: "isChked",
    //   maxWidth: 60,
    //   minWidth: 60,
    //   align: "center",
    //   resizable: false,
    //   title: "선택",
    //   type: "checkBoxSelection",
    //   sortable: false,
    //   editor: false,
    //   dataType: "bool",
    //   editable: "true",
    //   cb: {
    //     all: false,
    //     header: false,
    //   },
    // },
    {
      title: "NO",
      dataType: "string",
      dataIndx: "erlmSeq",
      align: "center",
      halign: "center",
      width: "",
      maxWidth: 60,
      minWidth: 60,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.rowIndx + 1;
      },
    },
    {
      title: "채권보전구분",
      dataType: "string",
      dataIndx: "bondProtCcd",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "이행여부",
      dataType: "string",
      dataIndx: "",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "상세내용",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    }
  ];

  /* 조건변경내역 colM */
  let colM_cchInfo = [
    // {
    //   dataIndx: "isChked",
    //   maxWidth: 60,
    //   minWidth: 60,
    //   align: "center",
    //   resizable: false,
    //   title: "선택",
    //   type: "checkBoxSelection",
    //   sortable: false,
    //   editor: false,
    //   dataType: "bool",
    //   editable: "true",
    //   cb: {
    //     all: false,
    //     header: false,
    //   },
    // },
    {
      title: "NO",
      dataType: "string",
      dataIndx: "erlmSeq",
      align: "center",
      halign: "center",
      width: "",
      maxWidth: 60,
      minWidth: 60,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.rowIndx + 1;
      },
    },
    {
      title: "승인일자",
      dataType: "string",
      dataIndx: "apvlDt",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "승인문서번호",
      dataType: "string",
      dataIndx: "cndChngDcmNoCnts",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "주요내용",
      dataType: "string",
      dataIndx: "cndChngMainCnts",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "취급자",
      dataType: "string",
      dataIndx: "prcsrEmpnm",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "취급자 개인번호",
      dataType: "string",
      dataIndx: "prcsrTelNo",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "시행일자",
      dataType: "string",
      dataIndx: "crotDt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    }
  ];

  /* 대주단정보 colM */
  let colM_stlnInfo = [
    // {
    //   dataIndx: "isChked",
    //   maxWidth: 60,
    //   minWidth: 60,
    //   align: "center",
    //   resizable: false,
    //   title: "선택",
    //   type: "checkBoxSelection",
    //   sortable: false,
    //   editor: false,
    //   dataType: "bool",
    //   editable: "true",
    //   cb: {
    //     all: false,
    //     header: false,
    //   },
    // },
    {
      title: "NO",
      dataType: "string",
      dataIndx: "erlmSeq",
      align: "center",
      halign: "center",
      width: "",
      maxWidth: 60,
      minWidth: 60,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.rowIndx + 1;
      },
    },
    {
      title: "구분",
      dataType: "string",
      dataIndx: "rmOpntEprzDcd",    //rm상대기업 구분코드
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기관명",
      dataType: "string",
      dataIndx: "entpNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "약정금액",
      dataType: "string",
      dataIndx: "crdtProvLmtAmt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "참가비율(%)",
      dataType: "string",
      dataIndx: "prtcRto",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    }
  ];

  /* 수익자정보 colM */
  let colM_ernInfo = [
    // {
    //   dataIndx: "isChked",
    //   maxWidth: 60,
    //   minWidth: 60,
    //   align: "center",
    //   resizable: false,
    //   title: "선택",
    //   type: "checkBoxSelection",
    //   sortable: false,
    //   editor: false,
    //   dataType: "bool",
    //   editable: "true",
    //   cb: {
    //     all: false,
    //     header: false,
    //   },
    // },
    {
      title: "구분",
      dataType: "string",
      dataIndx: "rmOpntEprzDcd",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "기관명",
      dataType: "string",
      dataIndx: "entpNm",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "약정금액",
      dataType: "string",
      dataIndx: "crdtProvLmtAmt",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "참가비율(%)",
      dataType: "string",
      dataIndx: "prtcRto",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    }
  ];

  /* 투자자산계좌(종목)정보 - 대출계좌 colM */
  let colM_loanBanoInfo = [
    {
      title: "계좌번호",
      dataType: "string",
      dataIndx: "",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "대출계정",
      dataType: "string",
      dataIndx: "",
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "계좌상태",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "약정금액",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "대출금액",
      dataType: "string",
      dataIndx: "",
      align: "center",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

    /* 투자자산계좌(종목)정보 - 수익증권 colM */
    let colM_ernSctyInfo = [
      {
        title: "종목코드",
        dataType: "string",
        dataIndx: "",
        align: "left",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "종목명",
        dataType: "string",
        dataIndx: "",
        align: "left",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "유가증권분류",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "펀드유형상세",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "액면(주수)",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기말장부단가",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "취득액",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
    ];

    /*인수대상 기업정보 colM*/
    let colM_udwrtPaiBzscalInfo = [
      {
        dataIndx: "isChked",
        maxWidth: 60,
        minWidth: 60,
        align: "center",
        resizable: false,
        title: "선택",
        type: "checkBoxSelection",
        sortable: false,
        editor: false,
        dataType: "bool",
        editable: "true",
        cb: {
          all: false,
          header: false,
        },
      },
      {
        title: "NO",
        dataType: "string",
        dataIndx: "erlmSeq",
        align: "center",
        halign: "center",
        width: "",
        maxWidth: 60,
        minWidth: 60,
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          return ui.rowIndx + 1;
        },
      },
      {
        title: "사업자등록번호",
        dataType: "string",
        dataIndx: "bzno",
        editable: true,
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "기업명",
        dataType: "string",
        dataIndx: "eprzNm",
        editable: true,
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "총주식수",
        dataType: "string",
        dataIndx: "holdStkQnt",
        editable: true,
        align: "right",
        halign: "center",
        format: "#,###",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        dataIndx: "stkLstYn",
        title: "주식상장여부",
        dataType: "string",
        editable: true,
        align: "center",
        halign: "center",
        width: "",
        editor: {
            type: "select",
            options: [
                { value: "Y", label: "상장" },
                { value: "N", label: "비상장" }
            ],
            valueIndx: "value", 
            labelIndx: "label" 
        },
        render: function (ui) {
          return ui.cellData === "Y" ? "상장" : "비상장";
        }
      },
      {
        dataIndx: "mngRghEnsuYn",
        title: "경영권확보여부",
        dataType: "string",
        editable: true,
        align: "center",
        halign: "center",
        width: "",
        editor: {
            type: "select",
            options: [
                { value: "Y", label: "확보" },
                { value: "N", label: "미확보" }
            ],
            valueIndx: "value", 
            labelIndx: "label" 
        },
        render: function (ui) {
          return ui.cellData === "Y" ? "확보" : "미확보";
        }
      },
    ]

    /* 관련사업정보 colM */
    let colM_busiInfo = [
      // {
      //   dataIndx: "isChked",
      //   maxWidth: 60,
      //   minWidth: 60,
      //   align: "center",
      //   resizable: false,
      //   title: "선택",
      //   type: "checkBoxSelection",
      //   sortable: false,
      //   editor: false,
      //   dataType: "bool",
      //   editable: "true",
      //   cb: {
      //     all: false,
      //     header: false,
      //   },
      // },
      {
        title: "NO",
        dataType: "string",
        dataIndx: "erlmSeq",
        align: "center",
        halign: "center",
        width: "",
        maxWidth: 60,
        minWidth: 60,
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          return ui.rowIndx + 1;
        },
      },
      {
        title: "사업관리번호",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "총조달금액",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "당사주선구분",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "당사참여금액",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
    ]

    /* 편입자산정보 colM */
    let colM_admsAsstInfo = [
      // {
      //   dataIndx: "isChked",
      //   maxWidth: 60,
      //   minWidth: 60,
      //   align: "center",
      //   resizable: false,
      //   title: "선택",
      //   type: "checkBoxSelection",
      //   sortable: false,
      //   editor: false,
      //   dataType: "bool",
      //   editable: "true",
      //   cb: {
      //     all: false,
      //     header: false,
      //   },
      // },
      {
        title: "투자유형",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "편입금액",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "비중",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "편입자산명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      }
    ]

    /* 투자기업목록 colM */
    let colM_invstBzscalList = [
      // {
      //   dataIndx: "isChked",
      //   maxWidth: 60,
      //   minWidth: 60,
      //   align: "center",
      //   resizable: false,
      //   title: "선택",
      //   type: "checkBoxSelection",
      //   sortable: false,
      //   editor: false,
      //   dataType: "bool",
      //   editable: "true",
      //   cb: {
      //     all: false,
      //     header: false,
      //   },
      // },
      {
        title: "NO",
        dataType: "string",
        dataIndx: "erlmSeq",
        align: "center",
        halign: "center",
        width: "",
        maxWidth: 60,
        minWidth: 60,
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          return ui.rowIndx + 1;
        },
      },
      {
        title: "기준년월",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "펀드명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "법인등록번호",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "거래상대방명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업자번호",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "업종",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
    ]

    /* 자산운용사정보 colM */
    let colM_asstWrkngInfo = [
      // {
      //   dataIndx: "isChked",
      //   maxWidth: 60,
      //   minWidth: 60,
      //   align: "center",
      //   resizable: false,
      //   title: "선택",
      //   type: "checkBoxSelection",
      //   sortable: false,
      //   editor: false,
      //   dataType: "bool",
      //   editable: "true",
      //   cb: {
      //     all: false,
      //     header: false,
      //   },
      // },
      {
        title: "NO",
        dataType: "string",
        dataIndx: "erlmSeq",
        align: "center",
        halign: "center",
        width: "",
        maxWidth: 60,
        minWidth: 60,
        filter: { crules: [{ condition: "range" }] },
        render: function (ui) {
          return ui.rowIndx + 1;
        },
      },
      {
        title: "법인등록번호",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "사업자번호",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "운용사명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "대표자명",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "설립일",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "임직원수",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
      {
        title: "운용인력수",
        dataType: "string",
        dataIndx: "",
        align: "center",
        halign: "center",
        width: "",
        filter: { crules: [{ condition: "range" }] },
      },
    ]


    let pqGridObjs = [
      //사업참가자정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_bsnsPartInfo",
        colModel: colM_bsnsPartInfo,
        rowDblClick: function(evt, ui){
          gridInfoSett(ui.rowData, "bsnsPartInfoInstance");
        }
      },
      //사업주요전망 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_bsnsForecast",
        colModel: colM_bsnsForecast,
        rowDblClick: function(evt, ui){
          gridInfoSett(ui.rowData, "bsnsForecastInstance");
        }
      },
      //채권보전주요약정 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_bondProtInfo",
        colModel: colM_bondProtInfo
      },
      //조건변경이력 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_cchInfo",
        colModel: colM_cchInfo
      },
      //대주단정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_stlnInfo",
        colModel: colM_stlnInfo
      },
      //수익자정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_ernInfo",
        colModel: colM_ernInfo
      },
      //투자자산 계좌정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_loanBanoInfo",
        colModel: colM_loanBanoInfo
      },
      //투자자산 종목정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_ernSctyInfo",
        colModel: colM_ernSctyInfo
      },
      //인수대상 기업정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_udwrtPaiBzscalInfo",
        colModel: colM_udwrtPaiBzscalInfo
      },
      //관련사업정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_busiInfo",
        colModel: colM_busiInfo
      },
      //편입자산정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_admsAsstInfo",
        colModel: colM_admsAsstInfo
      },
      //투자기업목록 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_invstBzscalList",
        colModel: colM_invstBzscalList
      },
      //자산운용사정보 그리드
      {
        height: 80,
        maxHeight: 300,
        id: "TB08031S_asstWrkngInfo",
        colModel: colM_asstWrkngInfo
      },
    ]

    

    setPqGrid(pqGridObjs);

    bsnsPartInfoInstance       = $("#TB08031S_bsnsPartInfo").pqGrid("instance");
    bsnsForecastInstance       = $("#TB08031S_bsnsForecast").pqGrid("instance");
    bondProtInfoInstance       = $("#TB08031S_bondProtInfo").pqGrid("instance");
    cchInfoInstance            = $("#TB08031S_cchInfo").pqGrid("instance");
    stlnInfoInstance           = $("#TB08031S_stlnInfo").pqGrid("instance");
    ernInfoInstance            = $("#TB08031S_ernInfo").pqGrid("instance");
    loanBanoInfoInstance       = $("#TB08031S_loanBanoInfo").pqGrid("instance");
    ernSctyInfoInstance        = $("#TB08031S_ernSctyInfo").pqGrid("instance");
    udwrtPaiBzscalInfoInstance = $("#TB08031S_udwrtPaiBzscalInfo").pqGrid("instance");  
    busiInfoInstance           = $("#TB08031S_busiInfo").pqGrid("instance");            
    admsAsstInfoInstance       = $("#TB08031S_admsAsstInfo").pqGrid("instance");         
    invstBzscalInstance        = $("#TB08031S_invstBzscalList").pqGrid("instance");         
    asstWrkngInfoInstance      = $("#TB08031S_asstWrkngInfo").pqGrid("instance");       


    setLoginUserAuth();
  }

  // 사업구분 정보
  function loadInvbnkAmnBzCd() {

    // alert("?????");
    $.ajax({
      type: "GET",
      url: "/getSelectBoxCode/I020",
      dataType: "json",
      success: function (data) {
        console.log(JSON.stringify(data));
        var html = "";

        $("#TB08031S_invbnkAmnBzCd").html(html);

        var codeList = data;
        if (codeList.length > 0) {
          $.each(codeList, function (key, value) {
            html +=
              '<option value="' +
              value.CD_VL_ID +
              '">' +
              value.CD_VL_NM +
              " (" +
              value.CD_VL_ID +
              ")" +
              "</option>";
          });
        }
        $("#TB08031S_invbnkAmnBzCd").html(html);
      },
    }).then(() => {
      tabCtrl("invbnkAmnBzCd");
    });
  }

  $("#TB08031S_invbnkAmnBzCd").change(function () {

    tabCtrl("invbnkAmnBzCd");

    if($("#TB08031S_invbnkAmnBzCd").val() === '03'){
      udwrtPaiBzscalInfoInstance.refresh();
    }
  });

  //사업정보 딜조회


  // 사업정보 딜조회
  function srchBsnsInfo() {
    var dealNo = $("#TB08031S_ibDealNo").val();

    // 유효성검사
    if (isEmpty(dealNo)) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return false;
    } else {
      // businessFunction();
      businessFunction2();
    }

    function businessFunction2(){
      var dtoParam = {
        dealNo: dealNo,
      };

      $.ajax({
        type: "GET",
        url: "/TB08031S/getBusiBssInfo",
        data: dtoParam,
        dataType: "json",
        success: function (data) {
          var bssBscInfo = data.ibims101bvo;

          // console.log( "bssBscInfo:" + bssBscInfo);

          /* 기본항목*/
          // $("#TB08031S_ibDealNo").val(bssBscInfo.dealNo);         // 딜번호

          var excBlce = bssBscInfo.excBlce == null ? 0 : addComma(bssBscInfo.excBlce);
          var expDt = bssBscInfo.expDt == null ? '' : formatDate(bssBscInfo.expDt);
          var rgstDt = bssBscInfo.rgstDt == null ? '' : formatDate(bssBscInfo.rgstDt);

          $("#TB08031S_corpNo").val(bssBscInfo.crno);             // 법인등록번호
          $("#TB08031S_corpNm").val(bssBscInfo.entpNm);           // 업체명
          $("#TB08031S_bsnsNm").val(bssBscInfo.busiNm);           // 사업명
          $('#TB08031S_C012').val(bssBscInfo.crdtGrdCd);					// 신용등급
          $('#TB08031S_bsnsLoan').val(excBlce);				            // 사업대출잔액
          $('#TB08031S_coValDt').val(expDt);						          // 평가유효기일
          $('#TB08031S_fnMdfyDt').val(rgstDt);					          // 최종수정일자

          if(data.invFnnMngmBusiDcd){       //사업구분코드 있는 경우

            var invFnnMngmBusiDcd = data.invFnnMngmBusiDcd;
            //사업기본정보 세팅
            $("#TB08031S_invbnkAmnBzCd").val(data.invFnnMngmBusiDcd);           //사업구분코드
            $("#TB08031S_I021").val(data.invFnnMngnBusiDtlDcd);                 //사업구분 상세
            $("#TB08031S_I011").val(data.invFnnMmngPrgSttsCd);                  //진행상태코드
            $("#TB08031S_I027").val(data.crryCd);                               //통화코드
            $("#TB08031S_prcrAmt").val(data.totPrcrAmt);                        //총조달금액
            $("#TB08031S_bondProt").val(data.mainBondMtncCnts);                 //주요채권보전내용
            $("#TB08031S_rvwStRsn").val(data.ivtgShdnRsnCnts);                  //검토중단사유
            $("#TB08031S_T002").val(data.thcoRlDcd);                            //당사역할구분
            $("#TB08031S_thcoRlAmt").val(data.thcoMdtnAmt);                     //당사주선금액
            $("#TB08031S_thcoPtnAmt").val(data.thcoPtciAmt);                    //당사참여금액
            $("#TB08031S_I033").val(data.invstRvnRtDcd);                        //고정금리구분코드
            $("#TB08031S_S003").val(data.stdrIntrtKndCd);                       //기준금리구분코드
            $("#TB08031S_BitrKindCdInput").val(data.stdrIntrt);                 //기준금리
            $("#TB08031S_preRt").val(data.addIntrt);                            //가산금리
            $("#TB08031S_charge_empNo").val(data.chrrEmpno);                    //담당자사번
            $("#TB08031S_charge_empNm").val(data.empNm);                        //담당자명
            $("#TB08031S_D010").val(data.dprtCd);                               //업무팀
            $("#TB08031S_tgtRvn").val(data.goalErnRt);                          //목표수익률
            $("#bsnsCntnt").val(data.busiCnts);                                 //사업내용
            $("#TB08031S_rm_empNo").val(data.rmEmpno);                          //담당RM사번
            $("#TB08031S_rm_empNm").val(data.rmEmpNm);                          //담당RM명

            if(invFnnMngmBusiDcd === "01"){           //부동산
              var tabPst = $("#TB08031S_ramsTab").children();
              tabPst.eq(0).show();
              tabPst.eq(1).hide();
              tabPst.eq(2).hide();
              tabPst.eq(3).hide();
              tabPst.eq(4).hide();
              tabPst.eq(5).show();
              tabPst.eq(6).show();
              tabPst.eq(7).show();
              tabPst.eq(8).show();
              tabPst.eq(9).show();
              tabPst.eq(10).show();
              tabPst.eq(11).hide();
              tabPst.eq(12).hide();
              tabPst.eq(13).hide();
              tabPst.eq(14).hide();
              /* 기존에 선택된 TAB에서 active 요소 삭제 후 현재 SHOW 상태인 TAB MENU 중에서
                  첫번째 TAB PANEL에 active 요소 부여										*/
              $("div[data-menuid='/TB08031S'] .tab-content")
                .children(".tab-pane.active")
                .attr("class", "tab-pane");
              $("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");
      
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
                .children()
                .eq(0)
                .children()
                .attr("class", "nav-link active");


              var rlesInfo = data.rlesInfo;

              var guasMrtgYn = rlesInfo.rlesInfo;                   //보증서담보여부
              var busiLcsiCpltYn = rlesInfo.efceMbdyDcd;            //사업인허가완료여부
              var landOwnrsEnsuYn = rlesInfo.landOwnrsEnsuYn;       //토지소유권확보여부
              var fndsMngmTrgtYn = rlesInfo.fndsMngmTrgtYn;         //자금관리대상여부
              var rdmpCpltYn = rlesInfo.rdmpCpltYn;                 //상환완료여부
              var bondTrnsYn = rlesInfo.bondTrnsYn;                 // 채권이관여부
              var mngmCndFlflYn = rlesInfo.mngmCndFlflYn;           // 관리조건이행여부
              var fnnrCtrcMttrTrgtYn = rlesInfo.fnnrCtrcMttrTrgtYn; // 재무약정사항대상여부
              var brwrSpcYn = rlesInfo.brwrSpcYn;                   //차주SCP여부
              var apvlYn = rlesInfo.apvlYn;                         //승인여부

              var bsnsPartInfo = data.BsnsPartInfo;
              console.log(JSON.stringify(bsnsPartInfo));
              

              bsnsPartInfoInstance.setData(bsnsPartInfo);

              if(guasMrtgYn == "Y"){
                $("#TB08031S_rlesWarrMrtgY").prop("checked", true);
              }else{
                $("#TB08031S_rlesWarrMrtgN").prop("checked", true);
              }        
              
              if(busiLcsiCpltYn == "Y"){
                $("#TB08031S_rlesOwnPLcsiCpltY").prop("checked", true);
              }else{
                $("#TB08031S_rlesOwnPLcsiCpltN").prop("checked", true);
              } 

              if(landOwnrsEnsuYn == "Y"){
                $("#TB08031S_rlesLandPchsCpltY").prop("checked", true);
              }else{
                $("#TB08031S_rlesLandPchsCpltN").prop("checked", true);
              } 

              if(fndsMngmTrgtYn == "Y"){
                $("#TB08031S_rlesFndsMngmTrgtY").prop("checked", true);
              }else{
                $("#TB08031S_rlesFndsMngmTrgtN").prop("checked", true);
              } 

              if(rdmpCpltYn == "Y"){
                $("#TB08031S_rdmpCpltYnY").prop("checked", true);
              }else{
                $("#TB08031S_rdmpCpltYnN").prop("checked", true);
              } 

              if(bondTrnsYn == "Y"){
                $("#TB08031S_rlesBondTrnY").prop("checked", true);
              }else{
                $("#TB08031S_rlesBondTrnN").prop("checked", true);
              } 

              if(mngmCndFlflYn == "Y"){
                $("#TB08031S_rlesCondComplyY").prop("checked", true);
              }else{
                $("#TB08031S_rlesCondComplyN").prop("checked", true);
              } 

              if(fnnrCtrcMttrTrgtYn == "Y"){
                $("#TB08031S_rlesCmmntMatY").prop("checked", true);
              }else{
                $("#TB08031S_rlesCmmntMatN").prop("checked", true);
              } 
              
              if(brwrSpcYn == "Y"){
                $("#TB08031S_rlesSpcY").prop("checked", true);
              }else{
                $("#TB08031S_rlesSpcN").prop("checked", true);
              } 

              if(apvlYn == "Y"){
                $("#TB08031S_rlesUseAppY").prop("checked", true);
              }else{
                $("#TB08031S_rlesUseAppN").prop("checked", true);
              } 

              $("#TB08031S_C014").val(rlesInfo.efceMbdyDcd);              //시행주체구분코드
              $("#TB08031S_csstPrarYm").val(rlesInfo.cnrStrtDt);          //공사시작일
              $("#TB08031S_cnfnPrarYm").val(rlesInfo.cnrEndDt);           //공사종료일
              $("#TB08031S_slltPrarYm").val(rlesInfo.slltStrtDt);         //분양시작일 
              $("#TB08031S_busiArea").val(rlesInfo.bzplAddr);             //사업장주소
              $("#TB08031S_B011").val(rlesInfo.bsnsAreaCd);               //사업지역코드
              $("#TB08031S_busiSiteSqms").val(rlesInfo.busiSiteSqms);     //사업부지면적 
              $("#TB08031S_busiSiteAcre").val(rlesInfo.siteSqms);         //사업부지면적(평) 
              $("#TB08031S_arRt").val(rlesInfo.busiArRt);                 //용적율 
              $("#TB08031S_Sqms").val(rlesInfo.busiTtlSqms);              //사업연면적
              $("#TB08031S_SqmsP").val(rlesInfo.ttlSqms);                 //연면적
              $("#TB08031S_far").val(rlesInfo.busiBldngLndrt);            //건폐율
              $("#TB08031S_B019").val(rlesInfo.eprzSclDcd);               //기업규모구분코드
              $("#TB08031S_fcltScal").val(rlesInfo.fcltSclWidhCtns);      //시설규모
              $("#TB08031S_resiEco").val(rlesInfo.resiEcoCtns);           //주거환경
              $("#TB08031S_C010").val(rlesInfo.crdtRifcDcd);              //신용보강구분코드
              $("#TB08031S_crdtEhcmntCntnt").val(rlesInfo.crdtRifcDvcNm); //신용보강내용
              

            }else if(invFnnMngmBusiDcd === "02"){     //인프라
              var tabPst = $("#TB08031S_ramsTab").children();
              tabPst.eq(0).hide();
              tabPst.eq(1).hide();
              tabPst.eq(2).show();
              tabPst.eq(3).hide();
              tabPst.eq(4).hide();
              tabPst.eq(5).show();
              tabPst.eq(6).show();
              tabPst.eq(7).show();
              tabPst.eq(8).show();
              tabPst.eq(9).show();
              tabPst.eq(10).show();
              tabPst.eq(11).hide();
              tabPst.eq(12).hide();
              tabPst.eq(13).hide();
              tabPst.eq(14).hide();

              $("div[data-menuid='/TB08031S'] .tab-content")
                .children(".tab-pane.active")
                .attr("class", "tab-pane");
              $("div[data-menuid='/TB08031S'] .tab-content").children().eq(2).attr("class", "tab-pane active");

              $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
                .children()
                .eq(2)
                .children()
                .attr("class", "nav-link active");

              var infraInfo = data.infraInfo;

              var lmtYn = infraInfo.lmtYn;                              //SE한도대상여부
              var apvlYn = infraInfo.apvlYn;                            //사용승인여부
              var brwrSpcYn = infraInfo.brwrSpcYn;                      //차주SPC여부
              var mngmCndFlflYn = infraInfo.mngmCndFlflYn;              //관리조건이행여부
              var bondTrnsYn = infraInfo.bondTrnsYn;                    //채권이관여부
              var fnnrCtrcMttrTrgtYn = infraInfo.fnnrCtrcMttrTrgtYn;    //주요(재무)약정사항

              if(lmtYn == "Y"){
                $("#TB08031S_infraSeLmtY").prop("checked", true);
              }else{
                $("#TB08031S_infraSeLmtN").prop("checked", true);
              } 

              if(apvlYn == "Y"){
                $("#TB08031S_infraUseApvlY").prop("checked", true);
              }else{
                $("#TB08031S_infraUseApvlN").prop("checked", true);
              } 

              if(brwrSpcYn == "Y"){
                $("#TB08031S_infraSpcY").prop("checked", true);
              }else{
                $("#TB08031S_infraSpcN").prop("checked", true);
              } 

              if(mngmCndFlflYn == "Y"){
                $("#TB08031S_infraCondComplyY").prop("checked", true);
              }else{
                $("#TB08031S_infraCondComplyN").prop("checked", true);
              } 

              if(bondTrnsYn == "Y"){
                $("#TB08031S_infraBondTraY").prop("checked", true);
              }else{
                $("#TB08031S_infraBondTraN").prop("checked", true);
              } 

              if(fnnrCtrcMttrTrgtYn == "Y"){
                $("#TB08031S_infraCmmntMatY").prop("checked", true);
              }else{
                $("#TB08031S_infraCmmntMatN").prop("checked", true);
              } 

              $("#TB08031S_B013").val(infraInfo.invFnnBusiWyDcd);                     //사업방식
              $("#TB08031S_bsnsScal").val(infraInfo.busiSclCntn);                     //사업규모
              $("#TB08031S_bsnsLicYm").val(formatDate(infraInfo.busiLcsiDt));         //사업인허가일자
              $("#TB08031S_cmplYm").val(formatDate(infraInfo.cnfnDt));                //준공(예정)년월
              $("#TB08031S_leadAgency").val(infraInfo.mngtCmpNm);                     //주무관청
              $("#TB08031S_conStYm").val(formatDate(infraInfo.cnrStrtDt));            //공사시작일자
              $("#TB08031S_conEndYm").val(formatDate(infraInfo.cnrEndDt));            //공사종료일자
              $("#TB08031S_opDurStYm").val(formatDate(infraInfo.oprtStrtDt));         //운영시작년월
              $("#TB08031S_opDurEndYm").val(formatDate(infraInfo.oprtEndDt));         //운영종료년월
              $("#TB08031S_bsnsLoc").val(infraInfo.bzplAddr);                         //사업장위치
              $("#TB08031S_invstAmt").val(comma(infraInfo.invstAmt));                 //총투자비==투자금액
              $("#TB08031S_B012").val(infraInfo.busiRvoDcd);                          //사업수주구분코드
              $("#TB08031S_equity").val(comma(infraInfo.slfCpta));                    //자기자본
              $("#TB08031S_priLoan").val(comma(infraInfo.prorLoanAmt));               //선순위대출
              $("#TB08031S_subLoan").val(comma(infraInfo.bkbnLoanAmt));               //후순위대출


            }else if(invFnnMngmBusiDcd === "03"){     //M&A
              var tabPst = $("#TB08031S_ramsTab").children();
              
              tabPst.eq(0).hide();
              tabPst.eq(1).hide();
              tabPst.eq(2).hide();
              tabPst.eq(3).show();
              tabPst.eq(4).hide();
              tabPst.eq(5).show();
              tabPst.eq(6).show();
              tabPst.eq(7).show();
              tabPst.eq(8).show();
              tabPst.eq(9).show();
              tabPst.eq(10).show();
              tabPst.eq(11).show();
              tabPst.eq(12).hide();
              tabPst.eq(13).hide();
              tabPst.eq(14).show();

              $("div[data-menuid='/TB08031S'] .tab-content")
                .children(".tab-pane.active")
                .attr("class", "tab-pane");
              $("div[data-menuid='/TB08031S'] .tab-content").children().eq(3).attr("class", "tab-pane active");

              $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
                .children()
                .eq(3)
                .children()
                .attr("class", "nav-link active");
                    
              var maInfo = data.maInfo;
              
              var lmtTrYn = maInfo.lmtTrYn;       //한도거래여부
              
              if(lmtTrYn == "Y"){
                $("#TB08031S_lmtTrY").prop("checked", true);
              }else{
                $("#TB08031S_lmtTrN").prop("checked", true);
              } 

              $("#TB08031S_U002").val(maInfo.undwHglmWyDcd);                            //상환방식
              $("#TB08031S_U001").val(maInfo.hnvrBusiDcd);                              //인수사업구분
              $("#TB08031S_spon").val(maInfo.spnsrCtns);                                //후원자내용
              $("#TB08031S_mrtg").val(maInfo.undwMrtgCtns);                             //인수담보내용

              var udwrtPaiBzscalInfo = data.udwrtPaiBzscalInfo;                         //인수대상 기업정보 

              udwrtPaiBzscalInfoInstance.setData(udwrtPaiBzscalInfo);
              

            }else if(invFnnMngmBusiDcd === "04"){     //국제투자
              var tabPst = $("#TB08031S_ramsTab").children();
              tabPst.eq(0).hide();
              tabPst.eq(1).hide();
              tabPst.eq(2).hide();
              tabPst.eq(3).hide();
              tabPst.eq(4).show();
              tabPst.eq(5).show();
              tabPst.eq(6).show();
              tabPst.eq(7).show();
              tabPst.eq(8).show();
              tabPst.eq(9).show();
              tabPst.eq(10).hide();
              tabPst.eq(11).hide();
              tabPst.eq(12).hide();
              tabPst.eq(13).hide();
              tabPst.eq(14).hide();

              $("div[data-menuid='/TB08031S'] .tab-content")
                .children(".tab-pane.active")
                .attr("class", "tab-pane");
              $("div[data-menuid='/TB08031S'] .tab-content").children().eq(4).attr("class", "tab-pane active");

              $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
                .children()
                .eq(4)
                .children()
                .attr("class", "nav-link active");

              var invstInfo = data.invstInfo;
              
              var brwrSpcYn = invstInfo.brwrSpcYn;                       //차주 SPC 여부
              var mngmCndFlflYn = invstInfo.mngmCndFlflYn;               //관리조건이행여부
              var bondTrnsYn = invstInfo.bondTrnsYn;                     //채권이관여부
              var fnnrCtrcMttrTrgtYn = invstInfo.fnnrCtrcMttrTrgtYn;     // 재무약정사항대상여부

              if(brwrSpcYn == "Y"){
                $("#TB08031S_realEstateSpcY").prop("checked", true);
              }else{
                $("#TB08031S_realEstateSpcN").prop("checked", true);
              } 

              if(mngmCndFlflYn == "Y"){
                $("#TB08031S_realEstateCondComplyY").prop("checked", true);
              }else{
                $("#TB08031S_realEstateCondComplyN").prop("checked", true);
              } 

              if(bondTrnsYn == "Y"){
                $("#TB08031S_realEstateBondTrnY").prop("checked", true);
              }else{
                $("#TB08031S_realEstateBondTrnN").prop("checked", true);
              } 

              if(fnnrCtrcMttrTrgtYn == "Y"){
                $("#TB08031S_realEstateCmmntMatY").prop("checked", true);
              }else{
                $("#TB08031S_realEstateCmmntMatN").prop("checked", true);
              } 

              $("#TB08031S_T005").val(invstInfo.invFnnTrgtAsstDcd);    //대상자산구분코드
              $("#TB08031S_brwrNtnNm").val(invstInfo.brwrNtnNm);       //차주국가명
              $("#TB08031S_totBusiAmt").val(invstInfo.totBusiCt);      //총사업비
              $("#TB08031S_hostCountry").val(invstInfo.ntnNm);         //국가명
              $("#TB08031S_ensrYn").val(invstInfo.guasDvsnCtns);       //보증서구분내용
              $("#TB08031S_prorRto").val(invstInfo.prorRto);           //선순위비율
              $("#TB08031S_cerkRto").val(invstInfo.cerkRto);           //중순위비율
              $("#TB08031S_bkbnRto").val(invstInfo.bkbnRto);           //후순위/Equity비율
              $("#TB08031S_lseStrtDt").val(formatDate(invstInfo.lesStrtDt));       //리스시작일자
              $("#TB08031S_lseEndDt").val(formatDate(invstInfo.lesEndDt));         //리스종료일자
              $("#TB08031S_loanStrtDt").val(formatDate(invstInfo.loanStrtDt));     //대출시작일자
              $("#TB08031S_loanEndDt").val(formatDate(invstInfo.loanEndDt));       //대출종료일자
              $("#TB08031S_lsePrd").val(invstInfo.mnum);               //개월수
              $("#TB08031S_loanPrd").val(invstInfo.loanMnum);          //대출기간개월수
              $("#TB08031S_amSt").val(invstInfo.dvcTyCnts);            //기종/선종
              $("#TB08031S_proEprz").val(invstInfo.prdcCmpCnts);       //제작사
              $("#TB08031S_proYr").val(invstInfo.mnfYr);               //제조년도
              $("#TB08031S_L006").val(invstInfo.invFnnLesKndDcd);      //리스종류
              $("#TB08031S_lseMgco").val(invstInfo.lesMgcoNm);         //리스운용사
              $("#TB08031S_lseUser").val(invstInfo.lesUserCnts);       //리스이용자
              
            }else if(invFnnMngmBusiDcd === "05"){     //PEF/VC

              var tabPst = $("#TB08031S_ramsTab").children();

              tabPst.eq(0).hide();
              tabPst.eq(1).show();
              tabPst.eq(2).hide();
              tabPst.eq(3).hide();
              tabPst.eq(4).hide();
              tabPst.eq(5).show();
              tabPst.eq(6).show();
              tabPst.eq(7).show();
              tabPst.eq(8).show();
              tabPst.eq(9).hide();
              tabPst.eq(10).show();
              tabPst.eq(11).show();
              tabPst.eq(12).show();
              tabPst.eq(13).show();
              tabPst.eq(14).show();

              $("div[data-menuid='/TB08031S'] .tab-content")
                .children(".tab-pane.active")
                .attr("class", "tab-pane");
              $("div[data-menuid='/TB08031S'] .tab-content").children().eq(1).attr("class", "tab-pane active");

              $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
              $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
                .children()
                .eq(1)
                .children()
                .attr("class", "nav-link active");

              var pefInfo = data.pefInfo;
              
              var mngmCndFlflYn = pefInfo.mngmCndFlflYn;       //관리조건이행여부
              var bondTrnsYn = pefInfo.bondTrnsYn;             //채권이관여부


              if(mngmCndFlflYn == "Y"){
                $("#TB08031S_pefVcInvstMngY").prop("checked", true);
              }else{
                $("#TB08031S_pefVcInvstMngN").prop("checked", true);
              } 

              if(bondTrnsYn == "Y"){
                $("#TB08031S_pefVcBondTrnY").prop("checked", true);
              }else{
                $("#TB08031S_pefVcBondTrnN").prop("checked", true);
              } 

              $("#TB08031S_tab2_empNo").val(pefInfo.chrgEmpno);                      //담당자
              $("#TB08031S_tab2_empNm").val(pefInfo.chrgEmpnm)                       //담당자명
              $("#TB08031S_invstGuidelines").val(pefInfo.invstStgyCtns);             //투자가이드라인


              var bsnsPartInfo = data.bsnsPartInfo;
              bsnsPartInfoInstance.setData(bsnsPartInfo);

              var bsnsForecast = data.bsnsForecast;
              bsnsForecastInstance.setData(bsnsForecast);
            }
          }
        }
      });
    }

  }

  // 사업참가자상세 참가자관계 수정시 실행
  $("#TB08031S_P001").change(function () {
    if ($("#TB08031S_bsnsPartInfo").find(".table-active").length > 0) {
      $("#TB08031S_bsnsPartInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($(this).val());
      $("#TB08031S_bsnsPartInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($("#TB08031S_P001 option:selected").text());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "참가자 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // // 사업참가자상세 업체명 수정시 실행
  // $("#TB08031S_partCorpNm").change(function () {
  //   if ($("#TB08031S_bsnsPartInfo").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsPartInfo")
  //       .find(".table-active")
  //       .children()
  //       .eq(4)
  //       .text($(this).val());
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "업체명을 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // // 사업참가자상세 법인등록번호 수정시 실행
  // $("#TB08031S_dtlsCorpNo").change(function () {
  //   if ($("#TB08031S_bsnsPartInfo").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsPartInfo")
  //       .find(".table-active")
  //       .children()
  //       .eq(6)
  //       .text(checkBrnAcno($(this).val()));
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "법인등록번호를 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // 사업참가자상세 사업자등록번호 수정시 실행
  // $("#TB08031S_bsnsRgstNo").change(function () {
  //   if ($("#TB08031S_bsnsPartInfo").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsPartInfo")
  //       .find(".table-active")
  //       .children()
  //       .eq(7)
  //       .text(checkBrnAcno($(this).val()));
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "사업자등록번호를 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // 사업참가자상세 대표자명 수정시 실행
  // $("#TB08031S_rprstPNm").change(function () {
  //   if ($("#TB08031S_bsnsPartInfo").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsPartInfo")
  //       .find(".table-active")
  //       .children()
  //       .eq(5)
  //       .text($(this).val());
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "대표자명을 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // // 사업주요전망 더블클릭 이벤트
  // function setBsnsForecast(e) {
  //   var tr = $(e);
  //   var td = $(tr).children();

  //   $("#TB08031S_bsnsForecast tr").removeClass("table-active");
  //   tr.addClass("table-active");

  //   $("#TB08031S_exptDt").val(td.eq(2).text()); // 예정일자
  //   $("#TB08031S_pfrmDt").val(td.eq(3).text()); // 이행일자
  //   td.eq(4).text() == "Y"
  //     ? $("#TB08031S_pfrmY").attr("checked", true)
  //     : $("#TB08031S_pfrmN").attr("checked", true); // 이행여부
  //   td.eq(4).text() == "N"
  //     ? $("#TB08031S_pfrmN").attr("checked", true)
  //     : $("#TB08031S_pfrmY").attr("checked", true); // 이행여부
  //   $("#TB08031S_mainCntnt").val(td.eq(5).text()); // 주요일정내용
  // }

  // // 사업주요전망 예정일자 수정시 실행
  // $("#TB08031S_exptDt").change(function () {
  //   if ($("#TB08031S_bsnsForecast").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsForecast")
  //       .find(".table-active")
  //       .children()
  //       .eq(2)
  //       .text($(this).val());
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "예정일자를 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // // 사업주요전망 이행일자 수정시 실행
  // $("#TB08031S_pfrmDt").change(function () {
  //   if ($("#TB08031S_bsnsForecast").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsForecast")
  //       .find(".table-active")
  //       .children()
  //       .eq(3)
  //       .text($(this).val());
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "이행일자를 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // // 사업주요전망 이행여부 수정시 실행
  // $("input[name='pfrmYN']").click(function () {
  //   if ($("#TB08031S_bsnsForecast").find(".table-active").length > 0) {
  //     var newValue = $(this).val() == "Y" ? "Y" : "N";
  //     $("#TB08031S_bsnsForecast")
  //       .find(".table-active")
  //       .children()
  //       .eq(4)
  //       .text(newValue);
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "이행여부를 선택해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  
  // // 사업주요전망 주요일정내용 수정시 실행
  // $("#TB08031S_mainCntnt").change(function () {
  //   if ($("#TB08031S_bsnsForecast").find(".table-active").length > 0) {
  //     $("#TB08031S_bsnsForecast")
  //       .find(".table-active")
  //       .children()
  //       .eq(5)
  //       .text($(this).val());
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "주요일정내용을 입력해주세요.",
  //       confirmButtonText: "확인",
  //     });
  //   }
  // });

  // 채권보전주요약정 더블클릭 이벤트
  function setBondProtInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_bondProtInfo tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_B007").val(td.eq(2).text()); // 채권보전구분
    td.eq(4).text() == "Y"
      ? $("#TB08031S_bondPfrmY").attr("checked", true)
      : $("#TB08031S_bondPfrmN").attr("checked", true); // 이행여부
    td.eq(4).text() == "N"
      ? $("#TB08031S_bondPfrmN").attr("checked", true)
      : $("#TB08031S_bondPfrmY").attr("checked", true); // 이행여부
    $("#TB08031S_dtlsCntnt").val(td.eq(5).text()); // 상세내용
  }

  // 채권보전주요약정 채권보전구분 수정시 실행
  $("#TB08031S_B007").change(function () {
    if ($("#TB08031S_bondProtInfo").find(".table-active").length > 0) {
      $("#TB08031S_bondProtInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($(this).val());
      $("#TB08031S_bondProtInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($("#TB08031S_B007 option:selected").text());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "채권보전구분을 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 채권보전주요약정 이행여부 수정시 실행
  $("input[name='TB08031S_bondPfrmYN']").click(function () {
    if ($("#TB08031S_bondProtInfo").find(".table-active").length > 0) {
      var newValue = $(this).val() == "Y" ? "Y" : "N";
      $("#TB08031S_bondProtInfo")
        .find(".table-active")
        .children()
        .eq(4)
        .text(newValue);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "이행여부를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 채권보전주요약정 상세내용 수정시 실행
  $("#TB08031S_dtlsCntnt").change(function () {
    if ($("#TB08031S_bondProtInfo").find(".table-active").length > 0) {
      $("#TB08031S_bondProtInfo")
        .find(".table-active")
        .children()
        .eq(5)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "상세내용을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 더블클릭 이벤트
  function setCchInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_cchInfo tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_cndtMainCntnt").val(td.eq(4).text()); // 주요내용
    $("#TB08031S_rcgDt").val(td.eq(2).text()); // 승인일자
    $("#TB08031S_cmplDt").val(td.eq(8).text()); // 시행일자
    $("#TB08031S_handlerID").val(td.eq(7).text()); // 취급자개인번호
    $("#TB08031S_cch_empNm").val(td.eq(6).text()); // 취급자
    $("#TB08031S_rcgDocNo").val(td.eq(3).text()); // 승인문서번호
  }

  // 조건변경이력 주요내용 수정시 실행
  $("#TB08031S_cndtMainCntnt").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(4)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "주요내용을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 승인일자 수정시 실행
  $("#TB08031S_rcgDt").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "승인일자를 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 시행일자 수정시 실행
  $("#TB08031S_cmplDt").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(8)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "시행일자를 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 취급자개인번호 수정시 실행
  $("#TB08031S_handlerID").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(7)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "취급자개인번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 취급자 수정시 실행
  $("#TB08031S_cch_empNm").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(6)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "취급자를 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 조건변경이력 승인문서번호 수정시 실행
  $("#TB08031S_rcgDocNo").change(function () {
    if ($("#TB08031S_cchInfo").find(".table-active").length > 0) {
      $("#TB08031S_cchInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "승인문서번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 대주단정보 더블클릭 이벤트
  function setStlnInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_stlnInfo tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_R021_1").val(td.eq(2).text()); // 구분
    $("#TB08031S_mCorpNm").val(td.eq(4).text()); // 기관명
    $("#TB08031S_mAgrAmt").val(td.eq(5).text()); // 약정금액
    $("#TB08031S_mPartRt").val(td.eq(6).text()); // 참가비율
  }

  // 대주단정보 구분 수정시 실행
  $("#TB08031S_R021_1").change(function () {
    if ($("#TB08031S_stlnInfo").find(".table-active").length > 0) {
      $("#TB08031S_stlnInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($(this).val());
      $("#TB08031S_stlnInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($("#TB08031S_R021_1 option:selected").text());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "구분을 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 대주단정보 기관명 수정시 실행
  $("#TB08031S_mCorpNm").change(function () {
    if ($("#TB08031S_stlnInfo").find(".table-active").length > 0) {
      $("#TB08031S_stlnInfo")
        .find(".table-active")
        .children()
        .eq(4)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "기관명을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 대주단정보 약정금액 수정시 실행
  $("#TB08031S_mAgrAmt").change(function () {
    if ($("#TB08031S_stlnInfo").find(".table-active").length > 0) {
      $("#TB08031S_stlnInfo")
        .find(".table-active")
        .children()
        .eq(5)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "약정금액을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 대주단정보 참가비율 수정시 실행
  $("#TB08031S_mPartRt").change(function () {
    if ($("#TB08031S_stlnInfo").find(".table-active").length > 0) {
      $("#TB08031S_stlnInfo")
        .find(".table-active")
        .children()
        .eq(6)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "참가비율을 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 사업구분이 변경될때 실행
  function tabCtrl(prefix) {
    var firstLetter = "";
    if (prefix === "ibDealNo") {
      var selId = $("#TB08031S_ibDealNo").val();
      firstLetter = selId.charAt(0).toUpperCase();
    } else if (prefix == "invbnkAmnBzCd") {

      console.log("TB08031S_invbnkAmnBzCd::: " + $("#TB08031S_invbnkAmnBzCd").val());

      switch ($("#TB08031S_invbnkAmnBzCd").val()) {
        case "01":
          firstLetter = "A";
          break;
        case "02":
          firstLetter = "B";
          break;
        case "03":
          firstLetter = "C";
          break;
        case "04":
          firstLetter = "D";
          break;
        case "05":
          firstLetter = "E";
          break;
        default:
          break;
      }
    }

    var tabPst = $("#TB08031S_ramsTab").children();
    switch (firstLetter) {
      case "A" /* TAB MENU SHOW/HIDE */:
        $("#TB08031S_invbnkAmnBzCd").val("01");
        tabPst.eq(0).show();
        tabPst.eq(1).hide();
        tabPst.eq(2).hide();
        tabPst.eq(3).hide();
        tabPst.eq(4).hide();
        tabPst.eq(5).show();
        tabPst.eq(6).show();
        tabPst.eq(7).show();
        tabPst.eq(8).show();
        tabPst.eq(9).show();
        tabPst.eq(10).show();
        tabPst.eq(11).hide();
        tabPst.eq(12).hide();
        tabPst.eq(13).hide();
        tabPst.eq(14).hide();
        /* 기존에 선택된 TAB에서 active 요소 삭제 후 현재 SHOW 상태인 TAB MENU 중에서
						첫번째 TAB PANEL에 active 요소 부여										*/
        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(0)
          .children()
          .attr("class", "nav-link active");
        break;
      case "B":
        $("#TB08031S_invbnkAmnBzCd").val("02");
        tabPst.eq(0).hide();
        tabPst.eq(1).hide();
        tabPst.eq(2).show();
        tabPst.eq(3).hide();
        tabPst.eq(4).hide();
        tabPst.eq(5).show();
        tabPst.eq(6).show();
        tabPst.eq(7).show();
        tabPst.eq(8).show();
        tabPst.eq(9).show();
        tabPst.eq(10).show();
        tabPst.eq(11).hide();
        tabPst.eq(12).hide();
        tabPst.eq(13).hide();
        tabPst.eq(14).hide();

        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(2).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(2)
          .children()
          .attr("class", "nav-link active");
        break;
      case "C":
        $("#TB08031S_invbnkAmnBzCd").val("03");
        tabPst.eq(0).hide();
        tabPst.eq(1).hide();
        tabPst.eq(2).hide();
        tabPst.eq(3).show();
        tabPst.eq(4).hide();
        tabPst.eq(5).show();
        tabPst.eq(6).show();
        tabPst.eq(7).show();
        tabPst.eq(8).show();
        tabPst.eq(9).show();
        tabPst.eq(10).show();
        tabPst.eq(11).show();
        tabPst.eq(12).hide();
        tabPst.eq(13).hide();
        tabPst.eq(14).show();

        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(3).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(3)
          .children()
          .attr("class", "nav-link active");
        break;
      case "D":
        $("#TB08031S_invbnkAmnBzCd").val("04");
        tabPst.eq(0).hide();
        tabPst.eq(1).hide();
        tabPst.eq(2).hide();
        tabPst.eq(3).hide();
        tabPst.eq(4).show();
        tabPst.eq(5).show();
        tabPst.eq(6).show();
        tabPst.eq(7).show();
        tabPst.eq(8).show();
        tabPst.eq(9).show();
        tabPst.eq(10).hide();
        tabPst.eq(11).hide();
        tabPst.eq(12).hide();
        tabPst.eq(13).hide();
        tabPst.eq(14).hide();

        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(4).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(4)
          .children()
          .attr("class", "nav-link active");

          // udwrtPaiBzscalInfoInstance.refresh();
        break;
      case "E":
        $("#TB08031S_invbnkAmnBzCd").val("05");
        tabPst.eq(0).hide();
        tabPst.eq(1).show();
        tabPst.eq(2).hide();
        tabPst.eq(3).hide();
        tabPst.eq(4).hide();
        tabPst.eq(5).show();
        tabPst.eq(6).show();
        tabPst.eq(7).show();
        tabPst.eq(8).show();
        tabPst.eq(9).hide();
        tabPst.eq(10).show();
        tabPst.eq(11).show();
        tabPst.eq(12).show();
        tabPst.eq(13).show();
        tabPst.eq(14).show();

        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(1).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(1)
          .children()
          .attr("class", "nav-link active");
        break;
      default:
        tabPst.show();
        $("div[data-menuid='/TB08031S'] .tab-content")
          .children(".tab-pane.active")
          .attr("class", "tab-pane");
        $("div[data-menuid='/TB08031S'] .tab-content").children().eq(0).attr("class", "tab-pane active");

        $("div[data-menuid='/TB08031S'] .nav.nav-tabs").find(".nav-link.active").attr("class", "nav-link");
        $("div[data-menuid='/TB08031S'] .nav.nav-tabs")
          .children()
          .eq(0)
          .children()
          .attr("class", "nav-link active");
        break;
    }
  }

  function addMenuRow(gridId){
    var gridLgth =  $(gridId).pqGrid('option', 'dataModel.data').length;

    $(gridId).pqGrid("addRow", { rowData: {erlmSeq: gridLgth+1}, checkEditable: false });
  }

  function dltMenuRow(gridId, isThrAChk){

    if(isThrAChk){

      var gridLgth =  $(gridId).pqGrid('option', 'dataModel.data').length;
      var data =  $(gridId).pqGrid('option', 'dataModel.data');

      let filteredIndexes = [];

      data.forEach((item, index) => {
        if (item.isChked) {
          filteredIndexes.push(index);
        }
      });

      filteredIndexes
        .sort((a, b) => b - a)
        .forEach((index) => {
          $(gridId).pqGrid("deleteRow", {rowIndx: index});
        });

    }else{
      var gridLgth =  $(gridId).pqGrid('option', 'dataModel.data').length;

      $(gridId).pqGrid("deleteRow", {rowIndx: gridLgth-1});
    }
    
  }

  function gridInfoSett(rowData, instncNm){
    //console.log(JSON.stringify(rowData));

    if(instncNm === "bsnsPartInfoInstance"){//사업참가자정보

      $("#TB08031S_P001").val(rowData.ptcnRelrDcd);              //참가자관계구분코드
      $("#TB08031S_partCorpNm").val(rowData.entpNm);             //업체명
      $("#TB08031S_dtlsCorpNo").val(rowData.crno);               //법인등록번호
      $("#TB08031S_bsnsRgstNo").val(rowData.bzno);               //사업자등록번호
      $("#TB08031S_rprstPNm").val(rowData.rpsrNm);               //대표자명
      $("#TB08031S_bsnsPartInfo_sn").val(rowData.sn);            //순번
      $("#TB08031S_bsnsPartInfo_erlmSeq").val(rowData.erlmSeq);  //등록순번

    }else if(instncNm === "bsnsForecastInstance"){//사업주요전망

      $("#TB08031S_exptDt").val(formatDate(rowData.prarDt));                 //예정일자
      $("#TB08031S_pfrmDt").val(formatDate(rowData.flflDt));                 //이행일자
      $("#TB08031S_mainCntnt").val(rowData.mainScxCtns);         //주요일정내용

      $("#TB08031S_bsnsForecast_sn").val(rowData.sn);            //순번
      $("#TB08031S_bsnsForecast_erlmSeq").val(rowData.erlmSeq);  //등록순번

      var flflYn = rowData.flflYn;

      if(flflYn === "Y"){
        $("#TB08031S_pfrmY").prop("checked", true);
      }else{
        $("#TB08031S_pfrmN").prop("checked", true);
      }
    }
  }

  function gridInfoRst(instncNm){

    if(instncNm === "bsnsPartInfoInstance"){//사업참가자정보
      $("#TB08031S_P001").val("");                   //참가자관계구분코드
      $("#TB08031S_partCorpNm").val("");             //업체명
      $("#TB08031S_dtlsCorpNo").val("");             //법인등록번호
      $("#TB08031S_bsnsRgstNo").val("");             //사업자등록번호
      $("#TB08031S_rprstPNm").val("");               //대표자명
      $("#TB08031S_bsnsPartInfo_sn").val("");        //순번
      $("#TB08031S_bsnsPartInfo_erlmSeq").val("");   //등록순번

    }else if(instncNm === "bsnsForecastInstance"){
      $("#TB08031S_exptDt").val("");                 //예정일자
      $("#TB08031S_pfrmDt").val("");                 //이행일자
      $("#TB08031S_pfrmN").prop("checked", true);    //이행여부
      $("#TB08031S_mainCntnt").val("");              //주요일정내용
    }
  }

  // 수익자정보 더블클릭 이벤트
  function setErnInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_ernInfo tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_R021_2").val(td.eq(1).text()); // 구분
    $("#TB08031S_ernCorpNm").val(td.eq(3).text()); // 기관명
    $("#TB08031S_ernAgrAmt").val(td.eq(4).text()); // 약정금액
    $("#TB08031S_ernPartRt").val(td.eq(5).text()); // 참가비율
  }

  // 수익자정보 구분 수정시 실행
  $("#TB08031S_R021_2").change(function () {
    if ($("#TB08031S_ernInfo").find(".table-active").length > 0) {
      $("#TB08031S_ernInfo")
        .find(".table-active")
        .children()
        .eq(1)
        .text($(this).val());
      $("#TB08031S_ernInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($("#TB08031S_R021_2 option:selected").text());
    }
  });

  // 수익자정보 기관명 수정시 실행
  $("#TB08031S_ernCorpNm").change(function () {
    if ($("#TB08031S_ernInfo").find(".table-active").length > 0) {
      $("#TB08031S_ernInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정하실 수악자 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 수익자정보 약정금액 수정시 실행
  $("#TB08031S_ernAgrAmt").change(function () {
    if ($("#TB08031S_ernInfo").find(".table-active").length > 0) {
      $("#TB08031S_ernInfo")
        .find(".table-active")
        .children()
        .eq(4)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정하실 수악자 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 수익자정보 참기비율 수정시 실행
  $("#TB08031S_ernPartRt").change(function () {
    if ($("#TB08031S_ernInfo").find(".table-active").length > 0) {
      $("#TB08031S_ernInfo")
        .find(".table-active")
        .children()
        .eq(5)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정하실 수악자 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 편입자산정보 더블클릭 이벤트
  function setAdmsAsstInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_admsAsstInfo tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_I038").val(td.eq(1).text()); // 투자유형
    $("#TB08031S_invstWeight").val(td.eq(3).text()); // 비중
    $("#TB08031S_admsAmt").val(td.eq(4).text()); // 편입금액
    $("#TB08031S_admsAsstNm").val(td.eq(5).text()); // 편입자산명
  }

  // 편입자산정보 투자유형 수정시 실행
  $("#TB08031S_I038").change(function () {
    if ($("#TB08031S_admsAsstInfo").find(".table-active").length > 0) {
      $("#TB08031S_admsAsstInfo")
        .find(".table-active")
        .children()
        .eq(1)
        .text($(this).val());
      $("#TB08031S_admsAsstInfo")
        .find(".table-active")
        .children()
        .eq(2)
        .text($("#TB08031S_I038 option:selected").text());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정할 편입자산 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 편입자산정보 비중 수정시 실행
  $("#TB08031S_invstWeight").change(function () {
    if ($("#TB08031S_admsAsstInfo").find(".table-active").length > 0) {
      $("#TB08031S_admsAsstInfo")
        .find(".table-active")
        .children()
        .eq(4)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정할 편입자산 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 편입자산정보 편입금액 수정시 실행
  $("#TB08031S_admsAmt").change(function () {
    if ($("#TB08031S_admsAsstInfo").find(".table-active").length > 0) {
      $("#TB08031S_admsAsstInfo")
        .find(".table-active")
        .children()
        .eq(3)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정할 편입자산 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  // 편입자산정보 편입자산명 수정시 실행
  $("#TB08031S_admsAsstNm").change(function () {
    if ($("#TB08031S_admsAsstInfo").find(".table-active").length > 0) {
      $("#TB08031S_admsAsstInfo")
        .find(".table-active")
        .children()
        .eq(5)
        .text($(this).val());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "수정할 편입자산 정보를 선택해주세요.",
        confirmButtonText: "확인",
      });
    }
  });

  /* 투자기업목록 더블클릭 이벤트 */
  function setInvstEprzInfo(e) {
    var tr = $(e);
    var td = $(tr).children();

    $("#TB08031S_invstBzscalList tr").removeClass("table-active");
    tr.addClass("table-active");

    $("#TB08031S_fndNm").val(td.eq(3).text()); // 펀드명
    $("#TB08031S_bsnmNo").val(td.eq(6).text()); // 사업자등록번호
    $("#TB08031S_bcncNm").val(td.eq(5).text()); // 거래상대방명
    $("#TB08031S_invstBzscalCorpNo").val(td.eq(4).text()); // 법인등록번호
    $("#TB08031S_indTypNm").val(td.eq(7).text()); // 업종
    $("#TB08031S_blgtCntyNm").val(td.eq(8).text()); // 소속국가명
    $("#TB08031S_bitrYm").val(td.eq(2).text()); // 기준년월
    $("#TB08031S_F009").val(td.eq(9).text()); // 펀드구분
    $("#TB08031S_F010").val(td.eq(10).text()); // 펀드유형상세
    $("#invstBzscal_datepicker1").val(td.eq(11).text()); // 취득일자
    $("#TB08031S_acqstAmt").val(td.eq(12).text()); // 취득가액
    $("#TB08031S_acbkAmt").val(td.eq(13).text()); // 장부가액
    $("#TB08031S_coAmt").val(td.eq(14).text()); // 평가금액
    $("#TB08031S_insRvn").val(td.eq(15).text()); // 순내부수익률
  }

  /* 투자기업목록 기본정보 수정 시 이벤트 */
  $("#invstEprzInfo input, select").each(function () {
    $(this).change(function () {
      if ($("#TB08031S_invstBzscalList").find(".table-active").length === 0) {
        return false;
      }
      var td = $("#TB08031S_invstBzscalList").find(".table-active").children();
      switch ($(this).attr("id")) {
        // 펀드명
        case "TB08031S_fndNm":
          $(td).eq(3).text($(this).val());
          break;
        // 사업자등록번호
        case "TB08031S_bsnmNo":
          $(td).eq(6).text($(this).val());
          break;
        // 거래상대방명
        case "TB08031S_bcncNm":
          $(td).eq(5).text($(this).val());
          break;
        // 법인등록번호
        case "TB08031S_invstBzscalCorpNo":
          $(td).eq(4).text($(this).val());
          break;
        // 업종
        case "TB08031S_indTypNm":
          $(td).eq(7).text($(this).val());
          break;
        // 소속국가명
        case "TB08031S_blgtCntyNm":
          $(td).eq(8).text($(this).val());
          break;
        // 기준년월
        case "TB08031S_bitrYm":
          $(td).eq(2).text($(this).val());
          break;
        // 펀드구분
        case "TB08031S_F009":
          $(td).eq(9).text($(this).val());
          break;
        // 펀드유형상세
        case "TB08031S_F010":
          $(td).eq(10).text($(this).val());
          break;
        // 취득일자
        case "invstBzscal_datepicker1":
          $(td).eq(11).text($(this).val());
          break;
        // 취득가액
        case "TB08031S_acqstAmt":
          $(td).eq(12).text($(this).val());
          break;
        // 정부가액
        case "TB08031S_acbkAmt":
          $(td).eq(13).text($(this).val());
          break;
        // 평가금액
        case "TB08031S_coAmt":
          $(td).eq(14).text($(this).val());
          break;
        // 수낸부수익률
        case "TB08031S_insRvn":
          $(td).eq(15).text($(this).val());
          break;

        default:
          break;
      }
    });
  });

  /* 투자기업목록 저장 */
  function invstEprzInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_invstBzscalList tr"), function () {
        var td = $(this).children();

        var stdrYm = $(td).eq(2).text().replaceAll("-", ""); // 기준년월
        var sn = $(td).eq(1).text(); // 일련번호
        var fndNm = $(td).eq(3).text(); // 펀드명
        var crno = $(td).eq(4).text().replaceAll("-", ""); // 법인등록번호
        var trOthrNm = $(td).eq(5).text(); // 거래상대방명
        var bzno = $(td).eq(6).text().replaceAll("-", ""); // 사업자등록번호
        var bztpNm = $(td).eq(7).text(); // 업종명
        var ntnNm = $(td).eq(8).text(); // 국가명
        var fndDcd = $(td).eq(9).text(); // 펀드구분코드
        var sctsFndTpDcd = $(td).eq(10).text(); // 유가증권펀드유형상세코드
        var pchsDt = $(td).eq(11).text().replaceAll("-", ""); // 매입일자
        var dealAmt = $(td).eq(12).text().replaceAll(",", ""); // 취득가액
        var bkpr = $(td).eq(13).text().replaceAll(",", ""); // 장부가액
        var asesBal = $(td).eq(14).text().replaceAll(",", ""); // 평가잔액
        var intlErnRt = $(td).eq(15).text(); // 순내부수익율

        var dtoParam = {
          dealNo: dealNo, // 딜번호
          stdrYm: stdrYm, // 기준년월
          sn: sn, // 일련번호
          fndNm: fndNm, // 펀드명
          crno: crno, // 법인등록번호
          trOthrNm: trOthrNm, // 거래상대방명
          bzno: bzno, // 사업자등록번호
          bztpNm: bztpNm, // 업종명
          ntnNm: ntnNm, // 국가명
          fndDcd: fndDcd, // 펀드구분코드
          sctsFndTpDcd: sctsFndTpDcd, // 유가증권펀드유형
          pchsDt: pchsDt, // 매입일자
          dealAmt: dealAmt, // 취득가액
          bkpr: bkpr, // 장부가액
          asesBal: asesBal, // 평가잔액
          intlErnRt: intlErnRt, // 순내부수익율
        };

        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s518vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveInvstEprzInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "투자기업정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "투자기업정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  //parameter 세팅 (너무 길어서 따로 뺌)
  function paramSett(){

    var paramData = {};

    //사업 기본정보
    var dealNo = $("#TB08031S_ibDealNo").val();                               //딜번호
    var crno = $("#TB08031S_corpNo").val();                                   //법인등록번호
    var busiNm = $("#TB08031S_bsnsNm").val();                                 //사업명
    
    var invFnnMngmBusiDcd = $("#TB08031S_invbnkAmnBzCd").val();               //사업구분
    var invFnnMngnBusiDtlDcd = $("#TB08031S_I021").val();                     //사업구분 상세
    var invFnnMmngPrgSttsCd = $("#TB08031S_I011").val();                      //진행상태
    var crryCd = $("#TB08031S_I027").val();                                   //통화코드
    var totPrcrAmt = $("#TB08031S_prcrAmt").val().replaceAll(",", "");                            //총조달금액
    var mainBondMtncCnts = $("#TB08031S_bondProt").val();                     //주요채권보전내용
    var ivtgShdnRsnCnts = $("#TB08031S_rvwStRsn").val();                      //검토중단사유내용
    var thcoRlDcd = $("#TB08031S_T002").val();                                //당사역할구분
    var thcoMdtnAmt = $("#TB08031S_thcoRlAmt").val().replaceAll(",", "");                         //당사주선금액
    var thcoPtciAmt = $("#TB08031S_thcoPtnAmt").val().replaceAll(",", "");                        //당사참여금액
    var invstRvnRtDcd = $('#TB08031S_I033').val();                            //투자수익금리구분코드
    var stdrIntrtKndCd = $('#TB08031S_S003').val();                           //기준금리종류코드
    var stdrIntrt = $("#TB08031S_BitrKindCdInput").val().replaceAll(",", "");                     //기준금리
    var addIntrt = $('#TB08031S_preRt').val().replaceAll(",", "");                                //가산금리
    var chrrEmpno = $("#TB08031S_charge_empNo").val();                        //담당자 사원번호               
    var busiNm = $("#TB08031S_bsnsNm").val();                                 //사업명
    var mgcoNm = $("#TB08031S_corpNm").val();                                 //업체명                     
    var goalErnRt = $("#TB08031S_tgtRvn").val();                              //목표수익율
    var rmEmpno = $("#TB08031S_rm_empNo").val();                              //RM사원번호
    var busiCnts = $("#bsnsCntnt").val();                                     //사업내용
    
    
    if(invFnnMngmBusiDcd === "01"){                         // 부동산

      var guasMrtgYn = $("input[name=TB08031S_rlesWarrMrtgYN]:checked").val();  //보증서 담보 여부
      var efceMbdyDcd = $("#TB08031S_C014").val();                              //시행주체구분코드
      var rdmpCpltYn = $(
        "input[name=TB08031S_rdmpCpltYn]:checked"
      ).val();                                                                  //상환완료여부
      var busiLcsiCpltYn = $(
        "input[name=TB08031S_rlesOwnPLcsiCpltYN]:checked"
      ).val();                                                                  //사업인/허가완료여부
      var landOwnrsEnsuYn = $(
        "input[name=TB08031S_rlesLandPchsCpltYN]:checked"
      ).val();                                                                  //토지소유권확보여부
      var fndsMngmTrgtYn = $(
        "input[name=TB08031S_rlesFndsMngmTrgtYN]:checked"
      ).val();                                                                  //자금관리대상여부
      var cnrStrtDt = $("#TB08031S_csstPrarYm").val().replaceAll("-", "");                          //공사시작일자
      var cnrEndDt = $("#TB08031S_cnfnPrarYm").val().replaceAll("-", "");                           //공사종료일자
      var slltStrtDt = $("#TB08031S_slltPrarYm").val().replaceAll("-", "");                         //분양예정일자
      var bzplAddr = $("#TB08031S_busiArea").val();                             //사업장주소 
      var bsnsAreaCd = $("#TB08031S_B011").val();                               //사업지역코드
      var busiSiteSqms = $("#TB08031S_busiSiteSqms").val().replaceAll(",", "");                     //사업부지면적
      var siteSqms = $("#TB08031S_busiSiteAcre").val().replaceAll(",", "");                         //사업부지(평)
      var busiArRt = $('#TB08031S_arRt').val().replaceAll(",", "");                                 //사업부지용적율
      var busiTtlSqms = $("#TB08031S_Sqms").val().replaceAll(",", "");                              //사업연면적
      var ttlSqms = $("#TB08031S_SqmsP").val().replaceAll(",", "");                                 //연면적 
      var busiBldngLndrt = $("#TB08031S_far").val().replaceAll(",", "");                            //사업건폐율
      var eprzSclDcd = $("#TB08031S_B019").val();                               //기업규모구분코드
      var fcltSclWidhCtns = $("#TB08031S_fcltScal").val();                      //시설규모너비내용
      var resiEcoCtns = $("#TB08031S_resiEco").val();                           //주거환경내용
      var crdtRifcDcd = $("#TB08031S_C010").val();                              //신용보강장치구분코드
      var crdtRifcDvcNm = $("#TB08031S_crdtEhcmntCntnt").val();                 //신용보강내용
      var mngmCndFlflYn = $(
        "input[name=rlesCondComplyYN]:checked"
      ).val();                                                                  //관리조건이행여부
      var bondTrnsYn = $(
        "input[name=rlesBondTrnYN]:checked"
      ).val();                                                                  //채권이관여부
      var fnnrCtrcMttrTrgtYn = $(
        "input[name=rlesCmmntMatYN]:checked"
      ).val();                                                                  //재무약정사항대상여부
      var brwrSpcYn = $(
        "input[name=rlesSpcYN]:checked"
      ).val();                                                                  //차주SCP여부

      paramData = {
        dealNo: dealNo,
        crno: crno,
        invFnnMngmBusiDcd: invFnnMngmBusiDcd,
        invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
        invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
        crryCd: crryCd,
        totPrcrAmt: totPrcrAmt,
        mainBondMtncCnts: mainBondMtncCnts,
        ivtgShdnRsnCnts: ivtgShdnRsnCnts,
        thcoRlDcd: thcoRlDcd,
        thcoMdtnAmt: thcoMdtnAmt,
        thcoPtciAmt: thcoPtciAmt,
        invstRvnRtDcd: invstRvnRtDcd,
        stdrIntrtKndCd: stdrIntrtKndCd,
        stdrIntrt: stdrIntrt,
        addIntrt: addIntrt,
        chrrEmpno: chrrEmpno,
        busiNm: busiNm,
        mgcoNm: mgcoNm,
        goalErnRt: goalErnRt,
        rmEmpno: rmEmpno,
        busiCnts: busiCnts,
        rlesInfo: {
          guasMrtgYn: guasMrtgYn,
          efceMbdyDcd: efceMbdyDcd,
          rdmpCpltYn: rdmpCpltYn,
          busiLcsiCpltYn: busiLcsiCpltYn,
          landOwnrsEnsuYn: landOwnrsEnsuYn,
          fndsMngmTrgtYn: fndsMngmTrgtYn,
          cnrStrtDt: cnrStrtDt,
          cnrEndDt: cnrEndDt,
          slltStrtDt: slltStrtDt,
          bzplAddr: bzplAddr,
          bsnsAreaCd: bsnsAreaCd,
          busiSiteSqms: busiSiteSqms,
          siteSqms: siteSqms,
          busiArRt: busiArRt,
          busiTtlSqms: busiTtlSqms,
          ttlSqms: ttlSqms,
          busiBldngLndrt: busiBldngLndrt,
          eprzSclDcd: eprzSclDcd,
          fcltSclWidhCtns: fcltSclWidhCtns,
          resiEcoCtns: resiEcoCtns,
          crdtRifcDcd: crdtRifcDcd,
          crdtRifcDvcNm: crdtRifcDvcNm,
          mngmCndFlflYn: mngmCndFlflYn,
          bondTrnsYn: bondTrnsYn,
          fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
          brwrSpcYn: brwrSpcYn
        }
      }
      return paramData;

    }else if(invFnnMngmBusiDcd === "02"){                   // 인프라

      var invFnnBusiWyDcd = $("#TB08031S_B013").val();                            //사업방식
      var busiSclCntn = $("#TB08031S_bsnsScal").val();                            //사업규모
      var busiLcsiDt = $("#TB08031S_bsnsLicYm").val().replaceAll("-", "");                            //사업인허가일자
      var cnfnDt = $("#TB08031S_cmplYm").val().replaceAll("-", "");                                   //준공(예정)년월
      var mngtCmpNm = $("#TB08031S_leadAgency").val();                            //주무관청
      var cnrStrtDt = $("#TB08031S_conStYm").val().replaceAll("-", "");           //공사시작일자
      var cnrEndDt = $("#TB08031S_conEndYm").val().replaceAll("-", "");           //공사종료일자
      //건설기간
      var oprtStrtDt = $("#TB08031S_opDurStYm").val().replaceAll("-", "");                            //운영시작년월
      var oprtEndDt = $("#TB08031S_opDurEndYm").val().replaceAll("-", "");                            //운영종료년월
      //운영기간
      var bzplAddr = $("#TB08031S_bsnsLoc").val();                                //사업장위치
      var lmtYn = $("input[name=infraSeLmtYN]:checked").val();                    //SE한도대상여부
      var invstAmt = $("#TB08031S_invstAmt").val().replaceAll(",", "");                               //총투자비==투자금액
      var busiRvoDcd = $("#TB08031S_B012").val();                                 //사업수주구분코드
      var slfCpta = $("#TB08031S_equity").val().replaceAll(",", "");                                  //자기자본
      var prorLoanAmt = $("#TB08031S_priLoan").val().replaceAll(",", "");                             //선순위대출
      var bkbnLoanAmt = $("#TB08031S_subLoan").val().replaceAll(",", "");                             //후순위대출
      var apvlYn = $("input[name=infraUseApvlYN]:checked").val();                 //사용승인여부
      var brwrSpcYn = $("input[name=infraSpcYN]:checked").val();                  //차주SPC여부
      var mngmCndFlflYn = $("input[name=condComplyYN]:checked").val();            //관리조건이행여부
      var bondTrnsYn = $("input[name=infraBondTraYN]:checked").val();             //채권이관여부
      var fnnrCtrcMttrTrgtYn = $("input[name=infraCmmntMatYN]:checked").val();    //주요(재무)약정사항

      paramData = {
        dealNo: dealNo,
        crno: crno,
        invFnnMngmBusiDcd: invFnnMngmBusiDcd,
        invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
        invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
        crryCd: crryCd,
        totPrcrAmt: totPrcrAmt,
        mainBondMtncCnts: mainBondMtncCnts,
        ivtgShdnRsnCnts: ivtgShdnRsnCnts,
        thcoRlDcd: thcoRlDcd,
        thcoMdtnAmt: thcoMdtnAmt,
        thcoPtciAmt: thcoPtciAmt,
        invstRvnRtDcd: invstRvnRtDcd,
        stdrIntrtKndCd: stdrIntrtKndCd,
        stdrIntrt: stdrIntrt,
        addIntrt: addIntrt,
        chrrEmpno: chrrEmpno,
        busiNm: busiNm,
        mgcoNm: mgcoNm,
        goalErnRt: goalErnRt,
        rmEmpno: rmEmpno,
        busiCnts: busiCnts,
        infraInfo: {
          invFnnBusiWyDcd: invFnnBusiWyDcd,
          busiSclCntn: busiSclCntn,
          busiLcsiDt: busiLcsiDt,
          cnfnDt: cnfnDt,
          mngtCmpNm: mngtCmpNm,
          cnrStrtDt: cnrStrtDt,
          cnrEndDt: cnrEndDt,
          oprtStrtDt: oprtStrtDt,
          oprtEndDt: oprtEndDt,
          bzplAddr: bzplAddr,
          lmtYn: lmtYn,
          invstAmt: invstAmt,
          busiRvoDcd: busiRvoDcd,
          slfCpta: slfCpta,
          prorLoanAmt: prorLoanAmt,
          bkbnLoanAmt: bkbnLoanAmt,
          apvlYn: apvlYn,
          brwrSpcYn: brwrSpcYn,
          mngmCndFlflYn: mngmCndFlflYn,
          bondTrnsYn: bondTrnsYn,
          fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn
        }
      }
      return paramData;

    }else if(invFnnMngmBusiDcd === "03"){                   // M&A

      var undwHglmWyDcd = $("#TB08031S_U002").val();                            //상환방식
      var hnvrBusiDcd = $("#TB08031S_U001").val();                              //인수사업구분
      var lmtTrYn = $("input[name=lmtTrYn]:checked").val();                     //한도거래여부
      var spnsrCtns = $("#TB08031S_spon").val();                                //후원자내용
      var undwMrtgCtns = $("#TB08031S_mrtg").val();                             //인수담보내용

      var gridData = udwrtPaiBzscalInfoInstance.getData();            //인수대상 기업정보 그리드 데이터
      var udwrtPaiBzscalInfo = [];    //인수대상 기업정보

      for(let i = 0; i < gridData.length; i++){
        var chkData = gridData[i];

        if (chkData.isChked) {
          udwrtPaiBzscalInfo.push(chkData);
        }
      }

      paramData = {
        dealNo: dealNo,
        crno: crno,
        invFnnMngmBusiDcd: invFnnMngmBusiDcd,
        invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
        invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
        crryCd: crryCd,
        totPrcrAmt: totPrcrAmt,
        mainBondMtncCnts: mainBondMtncCnts,
        ivtgShdnRsnCnts: ivtgShdnRsnCnts,
        thcoRlDcd: thcoRlDcd,
        thcoMdtnAmt: thcoMdtnAmt,
        thcoPtciAmt: thcoPtciAmt,
        invstRvnRtDcd: invstRvnRtDcd,
        stdrIntrtKndCd: stdrIntrtKndCd,
        stdrIntrt: stdrIntrt,
        addIntrt: addIntrt,
        chrrEmpno: chrrEmpno,
        busiNm: busiNm,
        mgcoNm: mgcoNm,
        goalErnRt: goalErnRt,
        rmEmpno: rmEmpno,
        busiCnts: busiCnts,
        maInfo: {
          undwHglmWyDcd: undwHglmWyDcd,
          hnvrBusiDcd: hnvrBusiDcd,
          lmtTrYn: lmtTrYn,
          spnsrCtns: spnsrCtns,
          undwMrtgCtns: undwMrtgCtns,
          udwrtPaiBzscalInfo: udwrtPaiBzscalInfo
        }
      }

      return paramData;
    }else if(invFnnMngmBusiDcd === "04"){                   // 국제투자

      var invFnnTrgtAsstDcd = $("#TB08031S_T005").val();                        //대상자산구분코드
      var brwrNtnNm = $("#TB08031S_brwrNtnNm").val();                           //차주국가명
      var totBusiCt = $("#TB08031S_totBusiAmt").val().replaceAll(',', '');      //총사업비
      var ntnNm = $("#TB08031S_hostCountry").val();                             //국가명
      var guasDvsnCtns = $("#TB08031S_ensrYn").val();                                 //보증서구분내용

      var prorRto = $("#TB08031S_prorRto").val().replaceAll(',', '');           //선순위비율
      var cerkRto = $("#TB08031S_cerkRto").val().replaceAll(',', '');           //중순위비율
      var bkbnRto = $("#TB08031S_bkbnRto").val().replaceAll(',', '');           //후순위/Equity비율
      var lesStrtDt = $("#TB08031S_lseStrtDt").val().replaceAll('-', '');       //리스시작일자
      var lesEndDt = $("#TB08031S_lseEndDt").val().replaceAll('-', '');         //리스종료일자
      var loanStrtDt = $("#TB08031S_loanStrtDt").val().replaceAll('-', '');     //대출시작일자
      var loanEndDt = $("#TB08031S_loanEndDt").val().replaceAll('-', '');       //대출종료일자

      var mnum = $("#TB08031S_lsePrd").val();                                   //개월수
      var loanMnum = $("#TB08031S_loanPrd").val();                              //대출기간개월수

      var dvcTyCnts = $("#TB08031S_amSt").val();                                //기종/선종
      var prdcCmpCnts = $("#TB08031S_proEprz").val();                           //제작사
      var mnfYr = $("#TB08031S_proYr").val();                                   //제조년도
      var invFnnLesKndDcd = $("#TB08031S_L006").val();                          //리스종류
      var lesMgcoNm = $("#TB08031S_lseMgco").val();                             //리스운용사
      var lesUserCnts = $("#TB08031S_lseUser").val();                           //리스이용자
      var brwrSpcYn = $("input[name=realEstateSpcYN]:checked").val();           //차주 SPC 여부
      var mngmCndFlflYn = $("input[name=realEstateCondComplyYN]:checked").val();//관리조건이행여부
      var bondTrnsYn = $("input[name=realEstateBondTrnYN]:checked").val();      //채권이관여부
      var fnnrCtrcMttrTrgtYn = $(
        "input[name=realEstateCmmntMatYN]:checked"
      ).val();                                                                  // 재무약정사항대상여부

      paramData = {
        dealNo: dealNo,
        crno: crno,
        invFnnMngmBusiDcd: invFnnMngmBusiDcd,
        invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
        invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
        crryCd: crryCd,
        totPrcrAmt: totPrcrAmt,
        mainBondMtncCnts: mainBondMtncCnts,
        ivtgShdnRsnCnts: ivtgShdnRsnCnts,
        thcoRlDcd: thcoRlDcd,
        thcoMdtnAmt: thcoMdtnAmt,
        thcoPtciAmt: thcoPtciAmt,
        invstRvnRtDcd: invstRvnRtDcd,
        stdrIntrtKndCd: stdrIntrtKndCd,
        stdrIntrt: stdrIntrt,
        addIntrt: addIntrt,
        chrrEmpno: chrrEmpno,
        busiNm: busiNm,
        mgcoNm: mgcoNm,
        goalErnRt: goalErnRt,
        rmEmpno: rmEmpno,
        busiCnts: busiCnts,
        invstInfo: {
          invFnnTrgtAsstDcd: invFnnTrgtAsstDcd,
          brwrNtnNm: brwrNtnNm,
          totBusiCt: totBusiCt,
          ntnNm: ntnNm,
          guasDvsnCtns: guasDvsnCtns,
          prorRto: prorRto,
          cerkRto: cerkRto,
          bkbnRto: bkbnRto,
          lesStrtDt: lesStrtDt,
          lesEndDt: lesEndDt,
          loanStrtDt: loanStrtDt,
          loanEndDt: loanEndDt,
          mnum: mnum,
          loanMnum: loanMnum,
          dvcTyCnts: dvcTyCnts,
          prdcCmpCnts: prdcCmpCnts,
          mnfYr: mnfYr,
          invFnnLesKndDcd: invFnnLesKndDcd,
          lesMgcoNm: lesMgcoNm,
          lesUserCnts: lesUserCnts,
          brwrSpcYn: brwrSpcYn,
          mngmCndFlflYn: mngmCndFlflYn,
          bondTrnsYn: bondTrnsYn,
          fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn
        }
      }

      return paramData;
    }else if(invFnnMngmBusiDcd === "05"){                   // PEF/VC

      var invstStgyCtns = $("#TB08031S_invstGuidelines").val();                 //투자가이드라인
      var mngmCndFlflYn = $("input[name=pefVcInvstMngYN]:checked").val();       //관리조건이행
      var bondTrnsYn = $("input[name=TB08031S_pefVcBondTrnYN]:checked").val();  //채권이관여부
      var chrgEmpno = $("#TB08031S_tab2_empNo").val();                          //담당자

      paramData = {
        dealNo: dealNo,
        crno: crno,
        invFnnMngmBusiDcd: invFnnMngmBusiDcd,
        invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
        invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
        crryCd: crryCd,
        totPrcrAmt: totPrcrAmt,
        mainBondMtncCnts: mainBondMtncCnts,
        ivtgShdnRsnCnts: ivtgShdnRsnCnts,
        thcoRlDcd: thcoRlDcd,
        thcoMdtnAmt: thcoMdtnAmt,
        thcoPtciAmt: thcoPtciAmt,
        invstRvnRtDcd: invstRvnRtDcd,
        stdrIntrtKndCd: stdrIntrtKndCd,
        stdrIntrt: stdrIntrt,
        addIntrt: addIntrt,
        chrrEmpno: chrrEmpno,
        busiNm: busiNm,
        mgcoNm: mgcoNm,
        goalErnRt: goalErnRt,
        rmEmpno: rmEmpno,
        busiCnts: busiCnts,
        pefInfo: {
          invstStgyCtns: invstStgyCtns,
          mngmCndFlflYn: mngmCndFlflYn,
          bondTrnsYn: bondTrnsYn,
          chrgEmpno: chrgEmpno
        }
      }

      return paramData;
    }
    

  }



  // 딜 정보 저장
  function saveTabInfo() {
    
    //사업 기본정보
    var dealNo = $("#TB08031S_ibDealNo").val();                               //딜번호
    var invFnnMngmBusiDcd = $("#TB08031S_invbnkAmnBzCd").val();               //사업구분
    var invFnnMngnBusiDtlDcd = $("#TB08031S_I021").val();                     //사업구분 상세
    // var hndEmpno = $("#TB08031S_tab1_empno").val();          
    var chrrEmpno = $("#TB08031S_charge_empNo").val();                        //담당자 사원번호               
    var busiNm = $("#TB08031S_bsnsNm").val();                                 //사업명
    var mgcoNm = $("#TB08031S_corpNm").val();                                 //업체명                     
    var invFnnMmngPrgSttsCd = $("#TB08031S_I011").val();                      //진행상태
    var crryCd = $("#TB08031S_I027").val();                                   //통화코드
    var totPrcrAmt = $("#TB08031S_prcrAmt").val();                            //총조달금액
    var mainBondMtncCnts = $("#TB08031S_bondProt").val();                     //주요채권보전내용
    var ivtgShdnRsnCnts = $("#TB08031S_rvwStRsn").val();                      //검토중단사유내용
    var thcoMdtnAmt = $("#TB08031S_thcoRlAmt").val();                         //당사주선금액
    var thcoPtciAmt = $("#TB08031S_thcoPtnAmt").val();                        //당사참여금액
    var aplyIntrtCnts = $("#TB08031S_BitrKindCdInput").val();                 //적용금리내용
    var goalErnRt = $("#TB08031S_tgtRvn").val();                              //목표수익율
    var rmEmpno = $("#TB08031S_chargeRm").val();                              //RM사원번호
    var busiCnts = $("#bsnsCntnt").val();                                     //사업내용
    var thcoRlDcd = $("#TB08031S_T002").val();                                //당사역할구분 

    //var brwrSpcYn = "";     //차주SPC여부
    // var 

    if(invFnnMngmBusiDcd === "01"){                         // 부동산

    }else if(invFnnMngmBusiDcd === "02"){                   // 인프라

    }else if(invFnnMngmBusiDcd === "03"){                   // M&A

    }else if(invFnnMngmBusiDcd === "04"){                   // 국제투자

    }else if(invFnnMngmBusiDcd === "05"){                   // PEF/VC

    }


    //사업 상세정보 (사업정보) -부동산-
    var guasMrtgYn = $("input[name=TB08031S_rlesWarrMrtgYN]:checked").val();  //보증서 담보 여부
    var busiLcsiCpltYn = $(
      "input[name=TB08031S_rlesOwnPLcsiCpltYN]:checked"
    ).val();                                                                  //사업인/허가완료여부
    var landOwnrsEnsuYn = $(
      "input[name=TB08031S_rlesLandPchsCpltYN]:checked"
    ).val();                                                                  //토지소유권확보여부
    var fndsMngmTrgtYn = $(
      "input[name=TB08031S_rlesFndsMngmTrgtYN]:checked"
    ).val();                                                                  //자금관리대상여부
    var rdmpCpltYn = $(
      "input[name=TB08031S_rdmpCpltYn]:checked"
    ).val();                                                                  //상환완료여부

    var apvlYn = $("input[name=rlesUseAppYN]:checked").val();                 //사용승인여부
    var brwrSpcYn = $("input[name=rlesSpcYN]:checked").val();                 //차주SPC여부
    var mngmCndFlflYn = $("input[name=rlesCondComplyYN]:checked").val();      //관리조건이행여부
    var bondTrnsYn = $("input[name=rlesBondTrnYN]:checked").val();            //채권이관여부
    var fnnrCtrcMttrTrgtYn = $("input[name=rlesCmmntMatYN]:checked").val();   //재무약정사항대상여부
    var efceMbdyDcd = $("#TB08031S_C014").val();                              //시행주체구분코드
    var slltStrtDt = $("#TB08031S_slltPrarYm").val();                         //분양예정년월
    var bzplAddr = $("#TB08031S_busiArea").val();                             //사업장주소
    var busiSiteSqms = $("#TB08031S_busiSiteSqms").val();                     //사업부지면적
    var busiTtlSqms = $("#TB08031S_Sqms").val();                              //사업연면적
    var ttlSqms = $("#TB08031S_SqmsP").val();                                 //연면적
    var busiBldngLndrt = $("#TB08031S_far").val();                            //사업건폐율
    var eprzSclDcd = $("#TB08031S_far").val();                                //기업규모구분코드
    var fcltSclWidhCtns = $("#TB08031S_fcltScal").val();                      //시설규모너비내용
    var resiEcoCtns = $("#TB08031S_resiEco").val();                           //주거환경내용
    var crdtRifcDcd = $("#TB08031S_C010").val();                              //신용보강장치구분코드
    var crdtRifcDvcNm = $("#TB08031S_crdtEhcmntCntnt").val();                 //신용보강내용

    //사업 상세정보 (사업정보) -인프라-
    var invFnnBusiWyDcd = $("#TB08031S_B013").val();                          //사업방식
    var busiSclCntn = $("#TB08031S_bsnsScal").val();                          //사업규모
    var busiLcsiDt = $("#TB08031S_bsnsLicYm").val();                          //사업인허가년월
    var cnfnDt = $("#TB08031S_cmplYm").val();                                 //준공(예정)년월
    var mngtCmpNm = $("#TB08031S_leadAgency").val();                          //주무관청
    var cnrStrtDt = $("#TB08031S_conStYm").val().replaceAll("-", "");                             //건설시작년월
    var cnrEndDt = $("#TB08031S_conEndYm").val().replaceAll("-", "");                             //건설종료년월
    var oprtStrtDt = $("#TB08031S_opDurStYm").val();                          //운영시작년월
    var oprtEndDt = $("#TB08031S_opDurEndYm").val();                          //운영종료년월
    var bzplAddr = $("#TB08031S_bsnsLoc").val();                              //사업장위치
    var lmtYn = $("input[name=infraSeLmtYN]:checked").val();                  //SE한도대상여부
    var invstAmt = $("#TB08031S_invstAmt").val();                             //총투자비
    var busiRvoDcd = $("#TB08031S_B012").val();                               //사업수주구분
    var slfCpta = $("#TB08031S_equity").val();                                //자기자본
    var prorLoanAmt = $("#TB08031S_priLoan").val();                           //선순위대출
    var bkbnLoanAmt = $("#TB08031S_subLoan").val();                           //후순위대출
    var apvlYn = $("input[name=infraUseApvlYN]:checked").val();               //사용승인여부
    var brwrSpcYn = $("input[name=infraSpcYN]:checked").val();                //차주SPC여부
    var mngmCndFlflYn = $("input[name=condComplyYN]:checked").val();          //관리조건이행여부
    var bondTrnsYn = $("input[name=infraBondTraYN]:checked").val();           //채권이관여부
    var fnnrCtrcMttrTrgtYn = $("input[name=infraCmmntMatYN]:checked").val();  //주요(재무)약정사항
    
    //사업 상세정보 (사업정보) -M&A-
    var undwHglmWyDcd = $("#TB08031S_U002").val();                            //상환방식
    var hnvrBusiDcd = $("#TB08031S_U001").val();                              //인수사업구분
    var brwrSpcYn = $("input[name=maEstateSpcYN]:checked").val();             //차주 SPC 여부
    var spnsrCtns = $("#TB08031S_spon").val();                                //스폰서
    var undwMrtgCtns = $("#TB08031S_mrtg").val();                             //담보
    // var invFnnTrgtAsstDcd = $("#TB08031S_trgtAstsCcd").val();


    //사업 상세정보 (사업정보) -국제투자-
    var brwrNtnNm = $("#TB08031S_brwrNtnNm").val();                           //차주국가명
    var totBusiCt = $("#TB08031S_totBusiAmt").val();                          //총사업비
    var prorRto = $("#TB08031S_prorRto").val();                               //선순위비율
    var cerkRto = $("#TB08031S_cerkRto").val();                               //중순위비율
    var bkbnRto = $("#TB08031S_bkbnRto").val();                               //후순위/Equity비율
    var lesStrtDt = $("#TB08031S_lseStrtYm").val();                           //리스시작년월
    var lesEndDt = $("#TB08031S_lseEdYm").val();                              //리스종료년월
    var loanStrtDt = $("#TB08031S_loanStrtDt").val();                         //대출시작일자
    var loanEndDt = $("#TB08031S_loanEdYm").val();                            //대출종료일자
    var dvcTyCnts = $("#TB08031S_amSt").val();                                //기종/선종
    var prdcCmpCnts = $("#TB08031S_proEprz").val();                           //제작사
    var mnfYr = $("#TB08031S_proYr").val();                                   //제조년도
    var invFnnLesKndDcd = $("#TB08031S_L006").val();                          //리스종류
    var lesMgcoNm = $("#TB08031S_lseMgco").val();                             //리스운용사
    var lesUserCnts = $("#TB08031S_lseUser").val();                           //리스이용자
    var brwrSpcYn = $("input[name=realEstateSpcYN]:checked").val();           //차주 SPC 여부
    var mngmCndFlflYn = $("input[name=realEstateCondComplyYN]:checked").val();//관리조건이행여부
    var bondTrnsYn = $("input[name=realEstateBondTrnYN]:checked").val();      //채권이관여부
    var fnnrCtrcMttrTrgtYn = $(
      "input[name=realEstateCmmntMatYN]:checked"
    ).val();                                                                  //주요(재무)약정사항

    //사업 상세정보 (사업정보) -PEF/VC-
    var invstStgyCtns = $("#TB08031S_invstGuidelines").val();                 //투자가이드라인
    var mngmCndFlflYn = $("input[name=pefVcInvstMngYN]:checked").val();       //관리조건이행
    var bondTrnsYn = $("input[name=TB08031S_pefVcBondTrnYN]:checked").val();  //채권이관여부
    var chrgEmpno = $("#TB08031S_tab2_empNo").val();                          //담당자

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      // var dtoParam = {
      //   dealNo: dealNo,
      //   //, "corpRgstNo": corpRgstNo
      //   busiNm: busiNm,
      //   invFnnMngmBusiDcd: invFnnMngmBusiDcd,
      //   mgcoNm: mgcoNm,
      //   invFnnMngnBusiDtlDcd: invFnnMngnBusiDtlDcd,
      //   invFnnMmngPrgSttsCd: invFnnMmngPrgSttsCd,
      //   crryCd: crryCd,
      //   totPrcrAmt: totPrcrAmt / 1,
      //   mainBondMtncCnts: mainBondMtncCnts,
      //   ivtgShdnRsnCnts: ivtgShdnRsnCnts,
      //   thcoMdtnAmt: thcoMdtnAmt / 1,
      //   thcoPtciAmt: thcoPtciAmt / 1,
      //   aplyIntrtCnts: aplyIntrtCnts,
      //   chrrEmpno: chrrEmpno,
      //   goalErnRt: goalErnRt / 1,
      //   rmEmpno: rmEmpno,
      //   busiCnts: busiCnts,
      //   rlesInfo: {
      //     hndEmpno: hndEmpno,
      //     guasMrtgYn: guasMrtgYn,
      //     busiLcsiCpltYn: busiLcsiCpltYn,
      //     landOwnrsEnsuYn: landOwnrsEnsuYn,
      //     fndsMngmTrgtYn: fndsMngmTrgtYn,
      //     apvlYn: apvlYn,
      //     brwrSpcYn: brwrSpcYn,
      //     mngmCndFlflYn: mngmCndFlflYn,
      //     bondTrnsYn: bondTrnsYn,
      //     fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
      //     efceMbdyDcd: efceMbdyDcd,
      //     slltStrtDt: slltStrtDt.replaceAll("-", ""),
      //     bzplAddr: bzplAddr,
      //     busiSiteSqms: busiSiteSqms / 1,
      //     busiTtlSqms: busiTtlSqms / 1,
      //     ttlSqms: ttlSqms / 1,
      //     busiBldngLndrt: busiBldngLndrt / 1,
      //     eprzSclDcd: eprzSclDcd,
      //     fcltSclWidhCtns: fcltSclWidhCtns,
      //     resiEcoCtns: resiEcoCtns,
      //     crdtRifcDcd: crdtRifcDcd,
      //     crdtRifcDvcNm: crdtRifcDvcNm,
      //   },
      //   infraInfo: {
      //     hndEmpno: hndEmpno,
      //     invFnnBusiWyDcd: invFnnBusiWyDcd,
      //     busiSclCntn: busiSclCntn,
      //     busiLcsiDt: busiLcsiDt.replaceAll("-", ""),
      //     cnfnDt: cnfnDt.replaceAll("-", ""),
      //     mngtCmpNm: mngtCmpNm,
      //     cnrStrtDt: cnrStrtDt.replaceAll("-", ""),
      //     cnrEndDt: cnrEndDt.replaceAll("-", ""),
      //     oprtStrtDt: oprtStrtDt.replaceAll("-", ""),
      //     oprtEndDt: oprtEndDt.replaceAll("-", ""),
      //     bzplAddr: bzplAddr,
      //     lmtYn: lmtYn,
      //     invstAmt: invstAmt / 1,
      //     busiRvoDcd: busiRvoDcd,
      //     slfCpta: slfCpta / 1,
      //     prorLoanAmt: prorLoanAmt / 1,
      //     bkbnLoanAmt: bkbnLoanAmt / 1,
      //     apvlYn: apvlYn,
      //     brwrSpcYn: brwrSpcYn,
      //     mngmCndFlflYn: mngmCndFlflYn,
      //     bondTrnsYn: bondTrnsYn,
      //     fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
      //   },
      //   maInfo: {
      //     hndEmpno: hndEmpno,
      //     undwHglmWyDcd: undwHglmWyDcd,
      //     hnvrBusiDcd: hnvrBusiDcd,
      //     brwrSpcYn: brwrSpcYn,
      //     spnsrCtns: spnsrCtns,
      //     undwMrtgCtns: undwMrtgCtns,
      //   },
      //   invstInfo: {
      //     hndEmpno: hndEmpno,
      //     dealNo: dealNo,
      //     invFnnTrgtAsstDcd: invFnnTrgtAsstDcd,
      //     brwrNtnNm: brwrNtnNm,
      //     totBusiCt: totBusiCt / 1,
      //     prorRto: prorRto / 1,
      //     cerkRto: cerkRto / 1,
      //     bkbnRto: bkbnRto / 1,
      //     lesStrtDt: lesStrtDt.replaceAll("-", ""),
      //     lesEndDt: lesEndDt.replaceAll("-", ""),
      //     loanStrtDt: loanStrtDt.replaceAll("-", ""),
      //     loanEndDt: loanEndDt.replaceAll("-", ""),
      //     dvcTyCnts: dvcTyCnts,
      //     prdcCmpCnts: prdcCmpCnts,
      //     mnfYr: mnfYr,
      //     invFnnLesKndDcd: invFnnLesKndDcd,
      //     lesMgcoNm: lesMgcoNm,
      //     lesUserCnts: lesUserCnts,
      //     brwrSpcYn: brwrSpcYn,
      //     mngmCndFlflYn: mngmCndFlflYn,
      //     bondTrnsYn: bondTrnsYn,
      //     fnnrCtrcMttrTrgtYn: fnnrCtrcMttrTrgtYn,
      //   },
      //   pefInfo: {
      //     hndEmpno: hndEmpno,
      //     chrgEmpno: chrgEmpno,
      //     invstStgyCtns: invstStgyCtns,
      //     mngmCndFlflYn: mngmCndFlflYn,
      //     bondTrnsYn: bondTrnsYn,
      //   },
      // };

      var dtoParam = paramSett();

      console.log(JSON.stringify(dtoParam));

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveDealInfo",
        data: JSON.stringify(dtoParam),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "문서정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },

        error: function (error, xhr, status) {
          console.log(error);
          console.log(xhr);
          console.log(status);
          


          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "사업정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 사업참가자정보 저장
  function bsnsPartInfoBtnSave(mode) {
    var dealNo = $("#TB08031S_ibDealNo").val();     // 딜번호
    var sn = $("#TB08031S_bsnsPartInfo_sn").val();              //일련번호
    var erlmSeq = $("#TB08031S_bsnsPartInfo_erlmSeq").val();    //등록순번

    if(mode === "save"){
      if (!isEmpty(dealNo)) {
        businessFunction(mode);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Deal번호를 조회해주세요.",
          confirmButtonText: "확인",
        });
      }

    }else if(mode === "dlt"){
      if (isEmpty(dealNo)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Deal번호를 조회해주세요.",
          confirmButtonText: "확인",
        });
      } else if(isEmpty(sn) || isEmpty(erlmSeq)){
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "삭제할 사업참가자정보를 선택해주세요.",
          confirmButtonText: "확인",
        });
      }else{
        businessFunction(mode);
      }
    }

   

    function businessFunction(mode) {

      var param = {};

      var dealNo = $("#TB08031S_ibDealNo").val();     // 딜번호
      var ptcnRelrDcd = $("#TB08031S_P001").val();    // 참가자관계
      var entpNm = $("#TB08031S_partCorpNm").val();   // 업체명
      var crno = $("#TB08031S_dtlsCorpNo").val();     // 법인등록번호
      var bzno = $("#TB08031S_bsnsRgstNo").val();     // 사업자등록번호
      var rpsrNm = $("#TB08031S_rprstPNm").val();     // 대표자명

      var sn = $("#TB08031S_bsnsPartInfo_sn").val();              //일련번호
      var erlmSeq = $("#TB08031S_bsnsPartInfo_erlmSeq").val();    //등록순번

      if(mode === "save"){
        param = {
          dealNo: dealNo,
          ptcnRelrDcd: ptcnRelrDcd,
          entpNm: entpNm,
          crno: crno,
          bzno: bzno,
          rpsrNm: rpsrNm,
          mode: "save"
        };
      }else if(mode === "dlt"){
        param = {
          dealNo: dealNo,
          sn: sn,
          erlmSeq: erlmSeq,
          mode: "dlt"
        };
      }
      
      $.ajax({
        type: "POST",
        url: "/TB08031S/saveBsnsPartInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "사업참가자정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },

        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "사업참가자정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }



  // 사업주요전망 저장
  function bsnsForecastBtnSave(mode) {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호

    if(mode === "save"){

      if (!isEmpty(dealNo)) {
        businessFunction(mode);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Deal번호를 조회해주세요.",
          confirmButtonText: "확인",
        });
      }

    }else if(mode === "dlt"){
      var sn = $("#TB08031S_bsnsForecast_sn").val();              //일련번호
      var erlmSeq = $("#TB08031S_bsnsForecast_erlmSeq").val();    //등록순번

      if (isEmpty(dealNo)) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Deal번호를 조회해주세요.",
          confirmButtonText: "확인",
        });
      } else if(isEmpty(sn) || isEmpty(erlmSeq)){
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "삭제할 일정정보를 선택해주세요.",
          confirmButtonText: "확인",
        });
      }else{
        businessFunction(mode);
      }

    }

    

    function businessFunction(mode) {
     
      var param = {};

      var dealNo = $("#TB08031S_ibDealNo").val();                               // 딜번호
      var prarDt = $("#TB08031S_exptDt").val().replaceAll('-', '');             // 예정일자
      var flflYn = $("input[name=pfrmYN]:checked").val();                       // 이행여부
      var flflDt = $("#TB08031S_pfrmDt").val().replaceAll('-', '');             // 이행일자
      var mainScxCtns = $("#TB08031S_mainCntnt").val();                         // 주요내용

      var sn = $("#TB08031S_bsnsForecast_sn").val();              //일련번호
      var erlmSeq = $("#TB08031S_bsnsForecast_erlmSeq").val();    //등록순번

      if(mode === "save"){

        param = {
          dealNo:dealNo,
          prarDt: prarDt,
          flflYn: flflYn,
          flflDt: flflDt,
          mainScxCtns: mainScxCtns,
          mode: mode
        }
  
      }else if(mode === "dlt"){
       
        param = {
          dealNo:dealNo,
          sn: sn,
          erlmSeq: erlmSeq,
          mode: mode
        }
  
      }

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveBsnsForecast",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "사업참가자정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },

        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "사업참가자정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
     
    }
  }

  // 채권보전주요약정 저장
  function bondProtInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
    var bondProtCcd = $("#TB08031S_B007").val(); // 채권보전구분
    var fnnrCtrcMttrTrgtYn = $("input[name=TB08031S_bondPfrmYN]:checked").val(); // 이행여부
    var mainCtrcMttrCnts = $("#TB08031S_mainCntnt").val(); // 상세내용

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_bondProtInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          bondProtCcd: td.eq(2).text(),
          fnnrCtrcMttrTrgtYn: td.eq(4).text(),
          mainCtrcMttrCnts: td.eq(5).text(),
          dealNo: $("#TB08031S_ibDealNo").val(),
        };

        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s509vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveBondProtInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "채권보전주요약정을 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "채권보전주요약정을 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 조건변경이력 저장
  function cchInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
    var apvlDt = $("#TB08031S_rcgDt").val(); // 승인일자
    var cndChngDcmNoCnts = $("#TB08031S_rcgDocNo").val(); // 승인문서번호
    var cndChngMainCnts = $("#TB08031S_cndtMainCntnt").val(); // 주요내용
    var prcsrEmpno = $("#TB08031S_cch_empNo").val(); // 취급자
    var prcsrTelNo = $("#TB08031S_handlerID").val(); // 취급자개인번호
    var crotDt = $("#TB08031S_cmplDt").val(); // 시행일자

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_cchInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          apvlDt: td.eq(2).text().replaceAll("-", ""),
          cndChngDcmNoCnts: td.eq(3).text(),
          cndChngMainCnts: td.eq(4).text(),
          prcsrEmpno: td.eq(5).text(),
          prcsrTelNo: td.eq(7).text(),
          crotDt: td.eq(8).text().replaceAll("-", ""),
          dealNo: $("#TB08031S_ibDealNo").val(),
        };
        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s510vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveCchInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "조건변경이력을 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "조건변경이력을 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 대주단정보 저장
  function stlnInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호
    var ibStlnDcd = $("#TB08031S_R021_1").val(); // 구분
    var entpNm = $("#TB08031S_mCorpNm").val(); // 기관명
    var crdtProvLmtAmt = $("#TB08031S_mAgrAmt").val(); // 약정금액
    var prtcRto = $("#TB08031S_mPartRt").val(); // 참가비율

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_stlnInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          ibStlnDcd: td.eq(2).text(),
          entpNm: td.eq(4).text(),
          crdtProvLmtAmt: td.eq(5).text().replaceAll(",", ""),
          prtcRto: td.eq(6).text(),
          dealNo: $("#TB08031S_ibDealNo").val(),
        };

        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s513vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveStlnInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "대주단정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "대주단정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 수악자정보 저장
  function ernInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_ernInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          ibStlnDcd: td.eq(1).text(),
          entpNm: td.eq(3).text(),
          crdtProvLmtAmt: td.eq(4).text().replaceAll(",", ""),
          prtcRto: td.eq(5).text(),
          dealNo: $("#TB08031S_ibDealNo").val(),
        };

        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s513vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveErnInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "수익자정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "수익자정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 관련사업정보 저장
  function reltBusiInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_busiInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          dealNo: dealNo,
          sn: td.eq(1).text(),
          reltDealNo: td.eq(2).text(),
        };

        inputArr.push(dtoParam);
      });

      var paramData = {
        dealNo: dealNo,
        s508vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveReltBusiInfo",
        data: JSON.stringify(paramData),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "사업참가자정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },

        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "사업참가자정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  // 관련사업정보 가져오기
  function getReltDealInfo(dealNo) {
    var paramData = {
      dealNo: dealNo,
      sn: "",
    };
    // 비동기통신 요청
    $.ajax({
      type: "GET",
      url: "/TB03020S/getBscDealDetail",
      data: paramData,
      dataType: "json",
      success: function (data) {
        console.log(JSON.stringify(data));
        var sn = isEmpty(
          $("#TB08031S_busiInfo tr").last().children().eq(1).text()
        )
          ? 1
          : Number($("#TB08031S_busiInfo tr").last().children().eq(1).text()) +
            1;

        var html = "";
        html += '<tr ondblclick="">';
        html +=
          '    <td style="vertical-align: middle;"><input type="checkbox"></td>';
        html += '    <td class="text-center">' + sn + "</td>"; // NO
        html += '    <td class="text-left">' + data.dealNo + "</td>"; // 사업관리번호
        html += '    <td class="text-left">' + data.dealNm + "</td>"; // 사업명
        html +=
          '    <td class="text-right">' +
          addComma(handleNullData(data.allInvAmt)) +
          "</td>"; // 총조달금액
        html += '    <td class="text-center">' + "Y" + "</td>"; // 당사주선여부
        html +=
          '    <td class="text-right">' +
          addComma(handleNullData(data.thcoPtciAmt)) +
          "</td>"; // 당사참여금액
        html += "</tr>";

        $("#TB08031S_busiInfo").append(html);
      },
      error: function () {},
    });
  }

  /* 관련사업정보 행삭제 */
  function delMenuRowReltDealInfo() {
    var rowNum = 1;

    $("#TB08031S_busiInfo tr").each(function () {
      var checkYn = $(this).find("td:eq(0)").find("input").is(":checked");

      if (checkYn) {
        $(this).remove();
      } else {
        // 순번 재배치
        $(this).find("td:eq(1)").text(rowNum);
        rowNum++;
      }
    });
  }

  // 편입자산정보 저장
  function admsAsstInfoBtnSave() {
    var dealNo = $("#TB08031S_ibDealNo").val(); // 딜번호

    if (!isEmpty(dealNo)) {
      businessFunction();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Deal번호를 조회해주세요.",
        confirmButtonText: "확인",
      });
    }

    function businessFunction() {
      var inputArr = [];
      $.each($("#TB08031S_admsAsstInfo tr"), function () {
        var td = $(this).children();

        var dtoParam = {
          ibInvTpCd: td.eq(1).text(), // 투자금융투자유형코드
          admsAsstAcbkAcqAmt: td.eq(3).text().replaceAll(",", "") / 1, // 편입자산장부취득금액
          admsAsstGrntErnRt: td.eq(4).text().replaceAll(",", "") / 1, // 편입자산보장수익율
          admsAsstItmNm: td.eq(5).text(), // 편입자산종목명
          dealNo: $("#TB08031S_ibDealNo").val(), // 딜번호
        };

        inputArr.push(dtoParam);
      });

      var param = {
        dealNo: dealNo,
        s512vo: inputArr,
      };

      $.ajax({
        type: "POST",
        url: "/TB08031S/saveAdmsAsstInfo",
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "수익자정보를 저장하였습니다.",
            confirmButtonText: "확인",
          });
        },
        error: function () {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "수익자정보를 저장하는데 실패하였습니다.",
            confirmButtonText: "확인",
          });
        },
      });
    }
  }

  function monthDiff_TB08031S(btnId){

    var strtDtId = "#TB08031S_" + btnId + "StrtDt";
    var endDtId = "#TB08031S_" + btnId + "EndDt";
    var prdId = "#TB08031S_" + btnId + "Prd";

    if(isEmpty($(strtDtId).val()) || isEmpty($(endDtId).val())){

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "시작일자/종료일자를 입력해주세요.",
        confirmButtonText: "확인",
      });
      return false;

    }else{

      var monthDiffVal = monthDiff($(strtDtId).val().replaceAll('-', ''), $(endDtId).val().replaceAll('-', ''));
      $(prdId).val(monthDiffVal);

    }
  }

  return {
    loadInvbnkAmnBzCd: loadInvbnkAmnBzCd,
    srchBsnsInfo: srchBsnsInfo,
    setGridTimeOut: setGridTimeOut,
    bsnsPartInfoBtnSave: bsnsPartInfoBtnSave,
    bsnsForecastBtnSave: bsnsForecastBtnSave,
    bondProtInfoBtnSave: bondProtInfoBtnSave,
    cchInfoBtnSave: cchInfoBtnSave,
    stlnInfoBtnSave: stlnInfoBtnSave,
    delMenuRowReltDealInfo: delMenuRowReltDealInfo,
    reltBusiInfoBtnSave: reltBusiInfoBtnSave,
    admsAsstInfoBtnSave: admsAsstInfoBtnSave,
    saveTabInfo: saveTabInfo,
    ernInfoBtnSave: ernInfoBtnSave,
    getReltDealInfo: getReltDealInfo,
    addMenuRow: addMenuRow,
    dltMenuRow: dltMenuRow,
    monthDiff_TB08031S: monthDiff_TB08031S,
    gridInfoRst: gridInfoRst,
  };
})();
