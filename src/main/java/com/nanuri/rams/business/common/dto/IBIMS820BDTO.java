package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
기업여신월별결산내역 Table.IBIMS820B DTO
*/
@Getter
@Setter
@ToString
public class IBIMS820BDTO {
    private String      stdrYm;                     //기준년월
    private String      prdtCd;                     //상품코드
    private long        rgstSn;                     //등록일련번호
    private String      bdCd;                       //부점코드
    private String      acctSynsCd;                 //회계적용코드
    private String      sttmNo;                     //전표번호
    private String      cnclSttmNo;                 //취소전표번호
    private String      eprzCrdlStlaDcd;            //기업여신결산구분코드
    private String      eprzCrdlAcctCrtTpCd;        //기업여신회계생성유형코드
    private String      eprzCrdlFeeKndCd;           //기업여신수수료종류코드
    private long        excSn;                      //실행일련번호
    private long        trSn;                       //거래일련번호
    private long        sn;                         //일련번호
    private long        intrClcDnum;                //총이자일수
    private long        thmmDnum;                   //당월일수
    private long        elpsDnum;                   //경과일수
    private BigDecimal  bfmmArcbErnBlce;            //전월선수수익잔액
    private BigDecimal  bfmmAcmlErnAmt;             //전월누적수익금액
    private BigDecimal  thmmAcmlErnAmt;             //당월누적수익금액
    private BigDecimal  thmmErnAmt;                 //당월수익금액
    private BigDecimal  eprzCrdlArcbErnBlce;        //기업여신선수수익잔액
    private BigDecimal  bfQuArcvErnBlce;            //이전분기선수수익잔액
    private String      actsCd;                     //계정과목코드
    private String      rstrPrcsYn;                 //환원처리여부
    private String      evlDt;                      //평가일자
    private String      hdwtInpYn;                  //수기입력여부
    private String      dcsnYn;                     //확정여부

}
