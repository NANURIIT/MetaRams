package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS800BDTO;

/*
대출금충당금산출기본 Table.IBIMS800B VO
*/
@Getter
@Setter
public class IBIMS800BVO extends IBIMS800BDTO {
    
    private String dealNo;                  //딜번호
    private String dealNm;                  //딜명
    private String prdtNm;                  //종목명
    private String entpHnglNm;              //업체한글명

    private String prdtLclsCdNm;            //상품대분류명
    private String prdtMdclCdNm;            //상품중분류명
    private String prdtClsfCdNm;            //상품분류명

    private String ibPrdtClsfCd;            //ib상품분류코드
    private String ibPrdtClsfCdNm;          //ib상품분류명
    private BigDecimal apvlAmt;             //종목승인금액
    private String actsCd;                  //계정과목코드
    private String prgSttsCd;               //진행상태코드

    private String chrrEmpNm;               //담당자
    private String mngmBdcd;                //담당부점코드
    private String dprtNm;                  //담당부서코드

    private BigDecimal dealExcAmt;          //투자금액
    private BigDecimal dealExcBlce;         //투자잔액
    private String nxtPymDt;                //연체시작일자

    private String astsQtyDvdCd;
    private String evlAprnAmt;
}
