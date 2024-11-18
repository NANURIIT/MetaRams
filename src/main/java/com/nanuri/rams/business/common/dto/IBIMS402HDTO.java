package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
/*
 딜실행기본이력 Table.IBIMS402H DTO
*/
public class IBIMS402HDTO {

    private String         prdtCd;                                 // 상품코드
    private long           excSn;                                  // 실행일련번호
    private long           rgstSn;                                 // 등록일련번호
    private String         ldgSttsCd;                              // 원장상태코드
    private String         crryCd;                                 // 통화코드
    private String         excDt;                                  // 실행일자
    private String         expDt;                                  // 만기일자
    private BigDecimal     dealExcAmt;                             // 대출금액
    private BigDecimal     dealExcBlce;                            // 대출잔액
    private BigDecimal     krwTrslRt;                              // 원화환산율
    private BigDecimal     krwTrslExcAmt;                          // 원화환산실행금액
    private BigDecimal     krwTrslExcBlce;                         // 원화환산실행잔액
    private BigDecimal     prnaDfrPrdMnum;                         // 원금거치기간개월수
    private int            dfrExpMnum;                             // 거치만기개월수
    private String         lastPrnaRdmpDt;                         // 최종원금상환일자
    private String         lastIntrClcDt;                          // 최종이자계산일자
    private String         nxtRdmpPrarDt;                          // 다음상환예정일자
    private String         nxtIntrPymDt;                           // 다음이자납입일자
    private BigDecimal     intrRdmpFrqcMnum;                       // 이자상환주기개월수
    private String         intrPymDtCd;                            // 이자납입일자코드
    private BigDecimal     prnaRdmpFrqcMnum;                       // 원금상환주기개월수
    private String         prnaOvduDt;                             // 원금연체일자
    private String         intrOvduDt;                             // 이자연체일자
    private BigDecimal     totRdmpTmrd;                            // 총상환회차
    private BigDecimal     lastRdmpTmrd;                           // 최종상환회차
    private BigDecimal     dealIstmBlce;                           // 할부잔액
    private BigDecimal     dealEqlRdmpAmt;                         // 균등상환금액
    private BigDecimal     istmDtmRdmpAmt;                         // 할부일시상환금액
    private BigDecimal     rcvbIntrAmt;                            // 미수이자금액
    private String         grteDcd;                                // 보증구분코드
    private String         pymtGrteRfrNo;                          // 지급보증참조번호
    private String         grteIsttCd;                             // 보증기관코드
    private String         grteIsttNm;                             // 보증기관명
	private BigDecimal 	   buyShqt; 							   // 매수좌수
	private BigDecimal 	   sllShqt; 							   // 매도좌수
	private BigDecimal 	   avrUnpr; 							   // 평균단가
	private String 	   	   brkgAcno; 							   // 위탁계좌번호
	private String 	   	   rctmIsttCd; 							   // 입금기관코드
	private String 	   	   achdNm; 							       // 예금주명
    private String         pymtGrteScctCtns;                       // 지급보증특약내용
    private BigDecimal     acbkAmt;                                // 장부금액
	private String         dealNo;                                 // 딜번호
	private String         mtrDcd;                                 // 안건구분코드
	private String         jdgmDcd;                                // 심사구분코드
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid


}