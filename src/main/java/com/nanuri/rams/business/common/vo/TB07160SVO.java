package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB07160SVO {
    
    private String        prdtCd;                  // 종목코드(==상품코드)
    private String        prdtNm;                  // 종목명(==상품명)
    private String        stdrIntrtKndCd;          // 기준금리종류코드
    private BigDecimal    stdrIntrt;               // 기준금리
    private BigDecimal    addIntrt;                // 가산금리

    //변경전원장정보
    private String        trOthrDscmNo;			   // 거래상대방식별번호 (==기업체명)
	private String 		  trOthrDscmNm;			   // 거래상대방명 (==기업체번호)
    private String        actsCd;                  // 계정과목코드	
    private String        ctrcDt;                  // 약정일자(==대출일자)
	private String        ctrcExpDt;               // 약정만기일자(==만기일자)
    private BigDecimal    eprzCrdlCtrcAmt;         // 기업여신약정금액 (==대출금액)
    private String        intrBnaoDcd;             // 이자선후취구분코드
    private BigDecimal    dealExcBlce;             // 딜실행잔액
    private BigDecimal    krwTrslExcBlce;          // 원화환산실행잔액
    private String        paiRdmpDcd;              // 원리금상환구분코드
    private int           prnaDfrPrdMnum;          // 원금거치기간개월수
    // private String        indvLmtDcd;              // 기업여신개별한도구분코드
    private String        eprzCrdlIndvLmtDcd;      // 기업여신 개별한도 구분코드

    //이수관정보
    private String        apvlDt;                  // 승인일자
    private String        prgSttsCd;               // 진행상태코드
    private String        rqsKndCd;                // 기업여신신청종류코드
    private String        dcrbAthDcd;              // 기업여신전결권한구분코드
    // private BigDecimal    apvlAmt;                 // 기업여신승인금액
    private BigDecimal    eprzCrdlApvlAmt;         // 기업여신 승인금액
    private String        trrcDt;                  // 이수관일자
    private String        mngmBdcd;                // 관리부점코드     
    private String        chrrEmpno;               // 담당자사원번호
    private String        subChrrEmpno;            // 서브담당자사원번호
    private String        chrrEmpnm;               // 담당자명
    private String        subChrrEmpnm;            // 서브담당자명

}
