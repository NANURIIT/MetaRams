package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 일일여신기준금리 table(RAB98BDTO) DTO */
public class RAB98BDTO {
    private String     stdDt;                         // 기준일자
    private String     bitrKindCd;                    // 기준금리종류코드
    private int        stdMmCnt;                      // 기준월수
    private int        stdDdCnt;                      // 기준일수
    private String     bitrNm;                        // 기준금리명
    private BigDecimal bitr;                          // 기준금리
    private String     rgstDt;                        // 등록일자
    private Date       hndlDyTm;                      // 처리일시
    private String     hndlDprtCd;                    // 처리부점코드
    private String     hndlPEno;                      // 처리자사번
}