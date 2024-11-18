package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 *  출자금 거래등록
 */
public class IBIMS407BDTO {

    private String prdtCd;                     // 상품코드  varchar(32)
    private int trSn;                          // 거래일련번호  int(10)
    private int excSn;                         // 실행일련번호  int(10)
    private String trDt;                       // 거래일자  varchar(8)
    private String etprCrdtGrntTrKindCd;   // 거래종류코드  varchar(2)
    private String nsFndCd;                   // 고유자산펀드코드  varchar(5)
    private String synsCd;                     // 적용코드  varchar(6)
    private String holdPrpsDcd;               // 보유목적구분코드  varchar(1)
    private String fincPrcsDcd;               // 출자처리구분코드  varchar(1)
    private String trDptCd;                   // 거래부서코드  varchar(3)
    private BigDecimal fincCngeAmt;           // 출자변동금액  decimal(18,0)
    private BigDecimal payErnAmt;             // 보수수익금액  decimal(18,0)
    private BigDecimal stlAmt;                 // 결제금액  decimal(18,0)
    private BigDecimal trdeExrt;               // 매매환율  decimal(18,0)
    private BigDecimal trslFincCngeAmt;      // 환산출자변동금액  decimal(24,6)
    private BigDecimal trslPayErnAmt;        // 환산보수수익금액  decimal(24,6)
    private BigDecimal trslStlAmt;            // 환산결제금액  decimal(24,6)
    private BigDecimal trtx;                    // 거래세  decimal(18,0)
    private BigDecimal intx;                    // 소득세  decimal(18,0)
    private BigDecimal lotx;                    // 지방세  decimal(18,0)
    private String bfRsvPayDcd;              // 전금지준구분코드  varchar(1)
    private String stlXtnlIsttCd;            // 결제외부기관코드  varchar(12)
    private String stlAcno;                    // 결제계좌번호  varchar(96)
    private String fincPayCntn;               // 출자보수내용  varchar(100)
    private String reFincPossYn;             // 재출자가능여부  varchar(1)
    private Date hndDetlDtm;                  // 조작상세일시  datetime
    private String hndEmpno;                   // 조작사원번호  varchar(7)
    private String hndTmnlNo;                 // 조작단말기번호  varchar(8)
    private String hndTrId;                   // 조작거래ID  varchar(10)
    private String guid;                        // GUID  varchar(29)

} 
