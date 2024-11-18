package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 IB승인조건연결기본 - 대출채권/채무보증 정보(TB06010S) - 셀다운승인조건 Table.IBIMS209B DTO
*/
public class IBIMS209BDTO {
    private String         dealNo;                                          // 딜번호
    private int             apvlCndSn;                                       // 승인조건일련번호
    private String         prdtCd;                                          // 상품코드
    private String         rgstDt;                                          // 등록일자
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}