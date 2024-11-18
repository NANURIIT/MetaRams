package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 딜심사책임준공내역 table(IBIMS110BDTO) DTO */
public class IBIMS110BDTO {
    
    private String     dealNo;                        // 딜번호
    private String     mtrDcd;                        // 안건구분코드
    private String     jdgmDcd;                       // 심사구분코드
    private BigDecimal sn;                            // 일련번호
    private String     rspsbCmplOgnDcd;               // 책임준공기관구분코드
    private String     sccoCrno;                      // 증권사법인등록번호
    private String     rnmCnfmNo;                     // 실명확인번호
    private String     dbtNnfDutyDcd;                 // 채무불이행의무구분코드
    private String     isttNm;                        // 기관명
    private String     dmgRprtnMxExtnt;               // 손해배상최대범위
    private String     cmplExptDt;                    // 준공예정일자
    private BigDecimal mtrtHldAmt;                    // 만기보유금액
    private Date       hndDetlDtm;                    // 조작상세일시
    private String     hndEmpno;                      // 조작사원번호
    private String     hndTmnlNo;                     // 조작단말기번호
    private String     hndTrId;                       // 조작거래id
    private String     guid;                          // guid

}