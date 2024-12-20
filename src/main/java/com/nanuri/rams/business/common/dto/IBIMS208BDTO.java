package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/* 
 IB승인조건내역 - 대출채권/채무보증 정보(TB06010S) - 셀다운승인조건 Table.IBIMS208B DTO
*/
public class IBIMS208BDTO { 
    private String         dealNo;                                          // 딜번호
    private String         sn;                                              // 일련번호
    private String    	   apvlCndSn;										// 승인조건일련번호
    private String         sdwnDtDcd;                                       // 샐다운일자구분코드
    private BigDecimal     sdwnTlmtMnum;                                    // 샐다운기한개월수
    private String         sdwnTlmtDt;                                      // 샐다운기한(목표)일자
    private String         sdwnStdrAmtDcd;                                  // 샐다운기준금액구분코드
    private BigDecimal     sdwnRto;                                         // 샐다운비율
    private BigDecimal     sdwnTlmtAmt;                                     // 샐다운목표금액
    private String         crryCd;                                          // 통화코드
    private BigDecimal     aplyExrt;                                        // 적용환율
    private String         sdwnCpltDt;                                      // 샐다운완료일자
    private BigDecimal     ctrcAmt;                                         // 약정금액
    private BigDecimal     excAmt;                                          // 실행금액
    private BigDecimal     sdwnPrarAmt;                                     // 샐다운예정금액
    private BigDecimal     sdwnAmt;                                         // 샐다운금액
    private BigDecimal     thcoHoldAmt;                                     // 당사보유금액
    private BigDecimal     ndispBlce;                                       // 미매각금액
    private BigDecimal     exitSlltRt;                                      // exit분양율
    private BigDecimal     nowSlltRt;                                       // 현재분양율
    private BigDecimal     plnFairRt;                                       // 계획공정율
    private BigDecimal     nowFairRt;                                       // 현재공정율
    private String         rgstEmpno;                                       // 등록사원번호
    private String         rgstDt;                                          // 등록일자
    private String         chngEmpno;                                       // 변경사원번호
    private String         chngDt;                                          // 변경일자
    private String         sdwnCtns;                                        // 샐다운내용
    private String         etcApvlCndCtns;                                  // 기타승인조건내용
    private String         apvlCndActCtns;                                  // 승인조건활동내용
    private String 		   cndYn;											// 연결여부
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}