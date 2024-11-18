package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인기초자산연결기본 - 대출채권/채무보증 정보(TB06010S) - 기초자산 Table.IBIMS221B DTO
*/
public class IBIMS221BDTO {
    private String         bssAsstMngmNo;                                   // 기초자산관리번호
    private String         prdtCd;                                          // 상품코드
    private BigDecimal     bssAsstPrc;                                      // 기초자산가격
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}