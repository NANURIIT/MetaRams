package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 기업여신 - 약정 및 해지정보 Table.IBIMS301B DTO
*/
public class IBIMS301BDTO {
    private String         prdtCd;                                 // 상품코드
    private String         ctrcCclcDcd;                            // 약정해지구분코드
    private String         ctrcDt;                                 // 약정일자
    private String         ctrcExpDt;                              // 약정만기일자
    private BigDecimal     ctrcAmt;                                // 약정금액
    private BigDecimal     stdrIntrt;                              // 기준금리
    private BigDecimal     addIntrt;                               // 가산금리
    private BigDecimal     totIntrt;                               // 총금리
    private String         chrrEmpno;                              // 담당자사원번호
    private String         cclcRsnCd;                              // 해지사유코드
    private String         cclcDt;                                 // 해지일자
    private String         cclcRsnCtns;                            // 해자사유내용
    private String         rgstDt;                                 // 등록일자
    private String         delYn;                                  // 삭제여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid
}