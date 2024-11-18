package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 위원회안건내역(협의체안건정보) Table.IBIMS112B DTO
*/
public class IBIMS112BDTO {
    private String         cnsbDcd;                                         // 협의체구분코드
    private int            cnsbSq;                                          // 협의체순번(회차)
    private String         rsltnYr;                                         // 결의년도
    private int            sn;                                              // 일련번호(순서정보)
    private String         dealNo;                                          // 딜번호
    private String         mtrDcd;                                          // 안건구분코드
    private String         jdgmDcd;                                         // 심사구분코드
    private String         rgstDt;                                          // 등록일자
    private String         sdnCndtF;                                        // 셀다운조건여부
    private String         sdnCndtCtns;                                     // 셀다운조건의견
    private String         etcCndtF;                                        // 기타조건여부
    private String         etcCndtCtns;                                     // 기타조건의견
    private String         mtrPrgSttsDcd;                                   // 안건진행상태구분코드
    private BigDecimal     apvlAmt;                                         // 승인금액
    private String         apvlDt;                                          // 승인일자
    private String         delYn;                                           // 삭제여부
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래ID
    private String         guid;                                            // GUID
}