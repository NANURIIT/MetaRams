package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 *  딜 일별잔액
 */
@Getter
@Setter
@ToString
public class IBIMS810BDTO {
    
    private String stdrDt;                    /* 기준일자           varchar(8)   */
    private String prdtCd;                    /* 상품코드           varchar(32)   */
    private long excSn;                        /* 실행일련번호       int(10)   */
    private String ldgSttsCd;                 /* 원장상태코드       varchar(2)   */
    private String crryCd;                    /* 통화코드           varchar(3)   */
    private String excDt;                     /* 실행일자           varchar(8)   */
    private String expDt;                     /* 만기일자           varchar(8)   */
    private BigDecimal dealExcAmt;            /* 딜실행금액         decimal(18,2)   */
    private BigDecimal dealExcBlce;           /* 딜실행잔액         decimal(18,2)   */
    private BigDecimal krwTrslRt;             /* 원화환산율         decimal(18,10)   */
    private BigDecimal krwTrslExcAmt;         /* 원화환산실행금액   decimal(18,2)   */
    private BigDecimal krwTrslExcBlce;        /* 원화환산실행잔액   decimal(18,2)   */
    private BigDecimal prnaDfrPrdMnum;        /* 원금거치기간개월수 decimal(10,0)   */
    private String lastPrnaRdmpDt;            /* 최종원금상환일자   varchar(8)   */
    private String lastIntrClcDt;             /* 최종이자계산일자   varchar(8)   */
    private String nxtRdmpPrarDt;             /* 다음상환예정일자   varchar(8)   */
    private String nxtIntrPymDt;              /* 다음이자납입일자   varchar(8)   */
    private BigDecimal intrRdmpFrqcMnum;      /* 이자상환주기개월수 decimal(5,0)   */
    private String intrPymDtCd;               /* 이자납입일자코드   varchar(2)   */
    private BigDecimal prnaRdmpFrqcMnum;      /* 원금상환주기개월수 decimal(18,0)   */
    private String prnaOvduDt;                /* 원금연체일자       varchar(8)   */
    private String intrOvduDt;                /* 이자연체일자       varchar(8)   */
    private BigDecimal totRdmpTmrd;           /* 총상환회차         decimal(9,0)   */
    private BigDecimal lastRdmpTmrd;          /* 최종상환회차       decimal(5,0)   */
    private BigDecimal dealIstmBlce;          /* 딜할부잔액         decimal(18,2)   */
    private BigDecimal dealEqlRdmpAmt;        /* 딜균등상환금액     decimal(18,2)   */
    private BigDecimal istmDtmRdmpAmt;        /* 할부일시상환금액   decimal(18,2)   */
    private BigDecimal rcvbIntrAmt;           /* 미수이자금액       decimal(24,6)   */
    private String grteDcd;                   /* 보증구분코드       varchar(1)   */
    private String pymtGrteRfrNo;             /* 지급보증참조번호   varchar(20)   */
    private String grteIsttCd;                /* 보증기관코드       varchar(4)   */
    private String grteIsttNm;                /* 보증기관명         varchar(100)   */
    private BigDecimal buyShqt;               /* 매수좌수           decimal(21,6)   */
    private BigDecimal sllShqt;               /* 매도좌수           decimal(21,6)   */
    private BigDecimal avrUnpr;               /* 평균단가           decimal(21,8)   */
    private String brkgAcno;                  /* 위탁계좌번호       varchar(20)   */
    private String rctmIsttCd;                /* 입금기관코드       varchar(4)   */
    private String achdNm;                    /* 예금주명           varchar(192)   */
    private String pymtGrteScctCtns;          /* 지급보증특약내용   varchar(500)   */
    private BigDecimal acbkAmt;               /* 장부금액           decimal(18,2)   */
    private String dealNo;                    /* 딜번호             varchar(30)   */
    private String mtrDcd;                    /* 안건구분코드       varchar(2)   */
    private String jdgmDcd;                   /* 심사구분코드       varchar(2)   */
    private int dfrExpMnum;                   /* 거치만기개월수     int(11)   */
    private BigDecimal nrmlIntr;              /* 정상이자           decimal(18,2)   */
    private BigDecimal intrAmtOvduIntr;       /* 이자금액연체이자   decimal(18,2)   */
    private BigDecimal aplyIrt;               /* 적용이율           decimal(15,7)   */
    private BigDecimal ovduPrna;              /* 연체원금           decimal(18,2)   */
    private BigDecimal eprzCrdlAcbkAmt;       /* 기업여신장부금액   decimal(18,2)   */
    private BigDecimal avrBlce;               /* 평균잔액           decimal(24,6)   */
    private BigDecimal hdwtEvlAmt;            /* 수기평가금액       decimal(18,2)   */
    private BigDecimal qotaRt;                /* 지분율             decimal(15,7)   */
    private BigDecimal setlShqt;              /* 결산좌수           decimal(21,6)   */
    private String dcsnYn;                    /* 확정여부           varchar(1)   */
    
    private Date hndDetlDtm;                  /* 조작상세일시       datetime   */
    private String hndEmpno;                  /* 조작사원번호       varchar(7)   */
    private String hndTmnlNo;                 /* 조작단말기번호     varchar(8)   */
    private String hndTrId;                   /* 조작거래ID         varchar(10)   */
    private String guid;                      /* GUID               varchar(29)   */

}
