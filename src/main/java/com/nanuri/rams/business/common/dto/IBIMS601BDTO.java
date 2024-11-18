package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 분양수지관리 Table.IBIMS601B DTO
*/
public class IBIMS601BDTO {
    private String         dealNo;                                          	// DEAL번호
    private String         slStDt;                                           	// 분양시작일
    private String         slEdDt;                                           	// 분양종료일
    private String         slPrd;                                            	// 분양기간
    private String         cnstStDt;                                           	// 공사시작일
    private String         cnstEdDt;                                           	// 공사종료일
    private String         cnstPrd;                                            	// 공사기간
    private String         crdtRifcIsttCtns;                                    // 신용보강기관내용
    private String         unitNum;                                             // 세대수
    private String         loanBondTakYn;                                       // 대출채권양수여부
    private String         prfbIslfEvl;                                         // 사업장자체평가
    private String         ipreYn;                                          	// ipre여부
    private String         clcIntlGrd;                                          // 계산내부등급
    private String         dcsnIntlGrd;                                         // 확장내부등급
    private String         mgtnRt;                                             	// 이주율
    private String         estmPrgsRt;                                          // 예상진척률
    private String         pfmcPrgsRt;                                          // 실적진척률
    private String         busiPrgStep;                                         // 사업진행단계
    private String         checkRslt;                                         	// 점검결과
    private String         bsnBdSlltBalcCheckOpnn;                              // 영업점분양수지점검의견
    private Date           hndDetlDtm;                                      	// 조작상세일시
    private String         hndEmpno;                                       		// 조작사원번호
    private String         hndTmnlNo;                                       	// 조작단말기번호
    private String         hndTrId;                                         	// 조작거래id
    private String         guid;                                            	// guid
}