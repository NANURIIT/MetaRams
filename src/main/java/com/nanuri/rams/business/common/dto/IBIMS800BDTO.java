package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
대출금충당금산출기본 Table.IBIMS800B DTO
*/
@Getter
@Setter
@ToString
public class IBIMS800BDTO {

    private String stdrDt;                      //기준일자
    private String prdtCd;                      //상품코드
    private long excSn;                         //실행일련번호
    private String holdPrpsDcd;                 //보유목적구분코드
    private String prdtClsfCd;                  //기업여신 상품분류코드
    private String prdtMdclCd;                  //기업여신 상품중분류코드
    private String prdtLclsCd;                  //기업여신 상품대분류코드
    private String excDt;                       //실행일자
    private String expDt;                       //만기일자
    private BigDecimal krwTrslExcBlce;          //원화환산실행잔액
    private BigDecimal acbkAmt;                 //장부금액
    private BigDecimal evlAmt;                  //평가금액
    private BigDecimal rcvbIntrAmt;             //미수이자금액
    private String stageGrdDcd;                 //Stage등급구분코드
    private int rmnExpYnum;                     //잔여만기년수
    private BigDecimal dshnRt;                  //부도율
    private BigDecimal dshnLssRt;               //부도손실율
    private String asstSnnGrdDcd;               //자산건전성등급구분코드
    private BigDecimal setEvlAprnAmt;           //집합평가충당금액
    private BigDecimal indvEvlAprnAmt;          //개별평가충당금액
    private BigDecimal rcvbIntrAprnAmt;         //미수이자충당금액
    private String sttmNo;                      //전표번호
    private String dcsnDt;                      //확정일자

    private Date hndDetlDtm;                    //조작상세일시
    private String hndEmpNo;                    //조작사원번호
    private String hndTmnlNo;                   //조작단말기번호
    private String hndTrId;                     //조작거래id
    private String guid;                        //guid
    
}
