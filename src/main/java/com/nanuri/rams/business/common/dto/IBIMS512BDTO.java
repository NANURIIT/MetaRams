package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자사후편입자산내역 Table.IBIMS512B DTO
*/
public class IBIMS512BDTO {

    private String         dealNo;                                   // 딜번호
    private long           sn;                                       // 일련번호
    private long           erlmSeq;                                  // 등록순번
    private String         admsAsstItmNm;                            // 편입자산종목명
    private BigDecimal     admsAsstGrntErnRt;                        // 편입자산보장수익율
    private String         invFnnInvTyDcd;                           // 투자금융투자유형코드
    private BigDecimal     admsAsstAcbkAcqAmt;                       // 편입자산장부취득금액
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid

}