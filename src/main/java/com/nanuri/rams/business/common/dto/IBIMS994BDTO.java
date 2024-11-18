package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.poi.hpsf.GUID;

@Getter
@Setter
/*
 환율 Table.IBIMS994B DTO
*/
public class IBIMS994BDTO {

    private String         stdrDt;                                 // 기준일자
    private String         crryCd;                                 // 통화코드
    private BigDecimal     stdrExrt;                               // 기준환율
    private String         rgstDt;                                 // 등록일자
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID

}