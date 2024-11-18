package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자사후대주단내역 Table.IBIMS513B DTO
 수익자정보
*/
public class IBIMS513BDTO {

    private String         dealNo;                                   // 딜번호
    private String         ibStlnDcd;                                // 투자금융대주구분코드
    private BigDecimal     sn;                                       // 일련번호
    private String         stlnErnDcd;                               // 대주/수익자구분코드
    private String         rmOpntEprzDcd;                            // RM상대기업구분코드
    private String         entpNm;                                   // 업체명
    private BigDecimal     crdtProvLmtAmt;                           // 신용공여한도금액
    private BigDecimal     prtcRto;                                  // 참가비율
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid

}
