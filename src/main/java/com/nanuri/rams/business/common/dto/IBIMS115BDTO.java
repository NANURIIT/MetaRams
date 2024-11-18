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
 위원회위원내역 Table.IBIMS115B DTO
*/
public class IBIMS115BDTO {
    private String         cnsbDcd;                                // 협의체구분코드
    private String         cnsbSq;                                 // 협의체순번
    private String         rsltnYr;                                // 결의년도
    private BigDecimal     sn;                                     // 일련번호
    private String         dealNo;                                 // 딜번호
    private String         mtrDcd;                                 // 안건구분코드
    private String         jdgmDcd;                                // 심사구분코드
    private String         atdcTrgtDcd;                            // 참석대상구분코드
    private String         atdcTrgtEmpno;                          // 참석대상사원번호
    private String         atdcAngtEmpno;                          // 참석대리인사원번호
    private String         atdcYn;                                 // 참석여부
    private String         aprvOppsDcd;                            // 찬성반대구분코드
    private String         opnnRgstDt;                             // 의견등록일자
    private String         opnnRgstEmpno;                          // 의견등록자사원번호
    private String         opnnCtns;                               // 의견내용
    private String         delYn;                                  // 삭제여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}
