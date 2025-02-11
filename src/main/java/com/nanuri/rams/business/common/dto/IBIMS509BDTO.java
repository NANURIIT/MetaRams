package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 투자자산내무약정이행내역 Table.IBIMS509B DTO
*/
public class IBIMS509BDTO {
    private String         dealNo;                                   // 딜번호
    private long           sn;                                       // 일련번호
    private long           erlmSeq;
    private String         bondProtCcd;                              // 채권보전구분
    private String         mainCtrcMttrCnts;                         // 주요약정사항내용
    private String         fnnrCtrcMttrTrgtYn;                       // 재무약정사항대상여부
    private String         ctrcDt;                                   // 약정일자
    private String         delYn;                                    // 삭제여부
    private Date           hndDetlDtm;                               // 조작상세일시
    private String         hndEmpno;                                 // 조작사원번호
    private String         hndTmnlNo;                                // 조작단말기번호
    private String         hndTrId;                                  // 조작거래id
    private String         guid;                                     // guid
}
