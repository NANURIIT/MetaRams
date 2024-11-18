package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자기업정보내역 Table.IBIMS518B DTO
*/
public class IBIMS518BDTO {
    private String         dealNo;                                   // 딜번호
    private String         stdrYm;                                   // 기준년월
    private int            sn;                                       // 일련번호
    private String         fndNm;                                    // 펀드명
    private String         crno;                                     // 법인등록번호
    private String         trOthrNm;                                 // 거래상대방명
    private String         bzno;                                     // 사업자등록번호
    private String         bztpNm;                                   // 업종명
    private String         ntnNm;                                    // 국가명
    private String         fndDcd;                                   // 펀드구분코드
    private String         sctsFndTpDcd;                             // 유가증권펀드유형상세코드
    private String         pchsDt;                                   // 매입일자
    private BigDecimal     dealAmt;                                  // 취득가액
    private BigDecimal     bkpr;                                     // 장부가액
    private BigDecimal     asesBal;                                  // 평가잔액
    private BigDecimal     intlErnRt;                                // 순내부수익율
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid
}
