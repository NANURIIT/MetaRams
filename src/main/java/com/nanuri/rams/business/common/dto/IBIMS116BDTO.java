package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
/*
 딜기본 - 공동영업관리자 정보 Table.IBIMS116B DTO
*/
public class IBIMS116BDTO {

    private String         dealNo;                                 // 딜번호
    private BigDecimal     sn;                                     // 일련번호
    private String         bdcd;                                   // 부점코드
    private String         bsnssMngPEno;                           // 영업관리자사번
    private BigDecimal     cntrt;                                  // 공헌도
    private String         rgstDt;                                 // 등록일자
    private String         delYn;                                  // 삭제여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래id
    private String         guid;                                   // guid

}