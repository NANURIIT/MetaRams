package com.nanuri.rams.com.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;


@Getter
@Setter
@ToString
public class CalcRsltDTO {
    
    private String         scxDcd;                                 // 일정구분코드
    private String         rdmpTmrd;                               // 상환회차
    private String         category;                               // 원금/이자 구분
    private String         prarDt;                                 // 예정일자
    private BigDecimal     prarPrna;                               // 예정원금
    private String         strtDt;                                 // 시작일자
    private String         endDt;                                  // 종료일자
    private BigDecimal     rdmpPrarIntr;                           // 상환예정이자
    private BigDecimal     aplyIrt;                                // 적용이율
    private long		   prcsDnum;                               // 처리일수
    private BigDecimal     prarRdmpAmt;                            // 예정상환금액
    

}
