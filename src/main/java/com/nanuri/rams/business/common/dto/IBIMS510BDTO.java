package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자자산조건변경내역 Table.IBIMS510B DTO
*/
public class IBIMS510BDTO {
    private String         dealNo;                                   // 딜번호
    private long            sn;                                      // 일련번호
    private long           erlmSeq;                                  // 등록순번
    private String         apvlDt;                                   // 승인일자
    private String         crotDt;                                   // 시행일자
    private String         cndChngMainCnts;                          // 조건변경주요내용
    private String         prcsrEmpno;                               // 처리자사원번호
    private String         prcsrTelNo;                               // 처리자개인번호
    private String         rgstDt;                                   // 등록일자
    private String         cndChngDcmNoCnts;                         // 조건변경문서번호내용
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid
}
