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
 여신스케쥴기본 Table.IBIMS403B DTO
*/
public class IBIMS403HDTO {
    private String         prdtCd;                                 // 상품코드
    private long           excSn;                                  // 실행일련번호
    private long           hgrkTrSn;                               // 상위거래일련번호
    private String         scxDcd;                                 // 일정구분코드
    private String         rdmpTmrd;                               // 상환회차
    private String         prarDt;                                 // 예정일자
    private BigDecimal     prarPrna;                               // 예정원금
    private String         strtDt;                                 // 시작일자
    private String         endDt;                                  // 종료일자
    private BigDecimal     rdmpPrarIntr;                           // 상환예정이자
    private String         prcsCpltYn;                             // 처리완료여부
    private String         prcsDt;                                 // 처리일자
    private BigDecimal     prcsAmt;                                // 처리금액
    private BigDecimal     prcsIntrAmt;                            // 처리이자금액
    private BigDecimal     aplyIrt;                                // 적용이율
    private BigDecimal     ovduIntrRt;                             // 연체이자율
    private String         trchDcd;                                // 트렌치구분코드
    private long		   trSn;                                   // 거래일련번호
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid
}