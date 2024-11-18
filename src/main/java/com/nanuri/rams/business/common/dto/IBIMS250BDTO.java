package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.nanuri.rams.com.utils.StringUtil;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인출자기본 Table.IBIMS250B DTO
*/
public class IBIMS250BDTO {
    private String         prdtCd;                          // 상품코드
    private String         dcmNo;                           // 문서번호
    private String         jobExcuMbdy;                     // 업무집행주체명
    private String         realMngmBdcd;                    // 실제관리부점코드
    private String         realMngmEmpno;                   // 실제관리사원번호
    private String         estDt;                           // 설립일자
    private String         keepExprDt;                      // 존속만료일자
    private String         invExprDt;                       // 투자만료일자
    private BigDecimal     fincCtrcAmt;                     // 출자약정금액
    private BigDecimal     fincFlflAmt;                     // 출자이행금액
    private BigDecimal     thcoFincCtrcAmt;                 // 당사출자약정금액
    private BigDecimal     thcoFincAmt;                     // 당사출자금액
    private BigDecimal     nowFincBlce;                     // 현재출자잔액
    private BigDecimal     mngmPayBlce;                     // 관리보수잔액
    private BigDecimal     ernDstrAmt;                      // 수익분배금액
    private BigDecimal     fincQotaRt;                      // 출자지분률
    private BigDecimal     stdrErnRt;                       // 기준수익율
    private BigDecimal     mngmPayRt;                       // 관리보수율
    private String         fincChrDcd;                      // 출자성격구분 (1.블라인드 / 2. 프로젝트)
    private int            fincEdycNo;                      // 출자증서번호
    private String         rptTrgtYn;                       // 보고대상여부
    private String         aflTrgtYn;                       // 계열사대상여부
    private String         dpndCmpYn;                       // 종속회사여부
    private String         demgYn;                          // 손상여부
    private BigDecimal     demgLssdCmlAmt;                  // 손상차손누계금액
    private BigDecimal     demgBfFincBlce;                  // 손상이전출자금잔액
    private String         stlaSttmNo;                      // 결산전표번호
    private BigDecimal     acqAmt;                          // 취득금액
    private String         crryCd;                          // 통화코드
    private BigDecimal     stdrExrt;                        // 기준환율
    private BigDecimal     frcrFincBlce;                    // 외화출자금잔액
    private BigDecimal     frcrMngmPayBlce;                 // 외화관리보수잔액
    private BigDecimal     curdDstrAmt;                     // 표시통화분배금액
    private BigDecimal     frcrFrsAcqAmt;                   // 외화최초취득금액
    private BigDecimal     frcrFincCtrcAmt;                 // 외화출자약정금액
    private BigDecimal     frcrFincFlflAmt;                 // 외화출자이행금액
    private BigDecimal     frcrThcoFincCtrcAmt;             // 외화당사출자약정금액
    private BigDecimal     frcrThcoFincAmt;                 // 외화당사출자금액
    private String         frsTrDt;                         // 최초거래일자
    private BigDecimal     prfmPayBlce;                     // 성과보수잔액
    private BigDecimal     prcrPrfmPayBlce;                 // 외화성과보수잔액
    private Date           hndDetlDtm;                      // 조작상세일시
    private String         hndEmpno;                        // 조작사원번호
    private String         hndTmnlNo;                       // 조작단말기번호
    private String         hndTrId;                         // 조작거래id
    private String         guid;                            // guid
}
