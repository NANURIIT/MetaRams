package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import lombok.Getter;

@Getter
/*
 기타투자정보 Table.IBIMS405B VO
*/
public class IBIMS405BVO extends IBIMS405BDTO {
    String ortnFndCd;
    String prdtNm;
    String trCrryCd;                            //통화코드
    String holdPrpsDcdNm;
    String trDptNm;
    String rqsEmpNm;
    String fndCd;                                  // 펀드코드
    String fndNm;                                  // 펀드명
    String fnltCd;                                 // 외부기관코드
    String fnltNm;                                 // 외부기관명
    BigDecimal stdrExrt;                           // 기준환율
    String pageDcd;
    BigDecimal eprzCrdlCtrcAmt; // 약정금액
    BigDecimal krwTrslExcBlce;  // 매수가능금액
    BigDecimal krwTrslExcAmt;  // 원화환산실행금액
    BigDecimal avrUnpr;  // 평균단가
}