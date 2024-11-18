package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자사업참가자내역 Table.IBIMS511B DTO
*/
public class IBIMS511BDTO {
    private String         dealNo;                                   // 딜번호
    private int            sn;                                       // 일련번호
    private String         ptcnRelrDcd;                              // 참가자관계구분코드
    private String         entpNm;                                   // 업체명
    private String         rpsrNm;                                   // 대표자명
    private String         crno;                                     // 법인등록번호
    private String         bzno;                                     // 사업자등록번호
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid
}
