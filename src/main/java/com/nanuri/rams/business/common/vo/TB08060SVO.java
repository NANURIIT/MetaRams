package com.nanuri.rams.business.common.vo;

import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TB08060SVO {
    
    private String      prdtCd;                     //상품코드
    private String      prdtNm;                     //상품명
    private String      ortnFndCd;                  //운용펀드코드
    private String      ortnFndNm;                  //운용펀드명
    private long        excSn;						//실행순번 == 실행일련번호
    private long        rgstSn;                     //등록일련번호
    private BigDecimal  thmmAcmlErnAmt;             //당월누적수익금액
    private BigDecimal  thmmErnAmt;                 //당월수익금액
    private String      acctYn;                     //회계반영여부
    private String      rstrPrcsYn;                 //환원처리여부
    private String      bdcd;                       //부점코드
    private long        trSn;	                    //거래일련번호
    private long        sn;                         //일련번호
    private String      trDt;                       //수취일자
    private String      intrCalcStrtDt;             //이자계산시작일자
    private String      intrCalcEndDt;              //이자계산종료일자
    private String      expDt;                      //만기일자
    private long        intrClcDnum;                //총이자일수
    private long        thmmDnum;                   //당월일수 == 경과이자일수
    private BigDecimal  eprzCrdlTrgtAmt;            //기업여신대상금액 == 선수금액
    private String      eprzCrdlFeeKndCd;           //수수료종류코드
    private String      fnnrRcogStrtDt;             //안분시작일자
    private String      fnnrRcogEndDt;              //안분종료일자
    private BigDecimal  krwTrslExcAmt;              //원화환산실행금액 == 대출금액
    private BigDecimal  krwTrslExcBlce;             //원화환산실행잔액 == 대출잔액
    private BigDecimal  bfmmAcmlErnAmt;             //전월누적수익금액 == 평가금액

    private String stdrDt;                          //기준일자
    private String dprtCd;                          //관리부서코드
    private String eprzCrdlAcctCrtTpCd;             //결산구분코드
    
}
