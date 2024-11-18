package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB07070SVO  {
    private String        prdtCd              ; // 상품코드
    private String        prdtNm              ;	// 상품명
    private long          trSn                ; // 거래일련번호
    private long          excSn               ; // 실행일련번호
    private String        prdtClsfCd          ;	// 기업여신상품분류코드
    private String        etprCrdtGrntTrKindCd; // 거래종류코드
    private String        trStatCd            ; // 거래상태코드
    private String        crryCd              ; // 통화코드
    private BigDecimal    dealTrAmt           ; // 딜거래금액
    private BigDecimal    dealTrPrca          ; // 딜거래원금
    private BigDecimal    trIntAmt            ; // 거래이자금액
    private BigDecimal    trFeeAmt            ; // 거래수수료금액
    private String        mngmBdcd            ; // 부서코드
    private String        dprtNm              ; // 부서명
    private String        chrrEmpno           ; // 담당자사원번호        
    private String        chrrEnm             ; // 담당자명
    private String        trDt                ; // 거래일자
    private String        rvseCnclRsonText    ; // 정정취소사유내용
    private List<IBIMS410BVO>   rvseTrInq;    // 정정거래
    
}
