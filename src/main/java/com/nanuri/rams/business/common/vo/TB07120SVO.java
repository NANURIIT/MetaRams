package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.nanuri.rams.business.common.dto.IBIMS410BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TB07120SVO extends IBIMS410BDTO {
    
    private String prdtNm;
    private String entpNm;
    // private String entpNm;
    private String rqstStfno;                   // 담당자 사원번호
    private String rqstStfnm;                   // 담당자 이름
    private String reltStfno;                   // 승인자 사원번호
    private String reltStfnm;                   // 승인자 이름
    private BigDecimal eprzCrdlCtrtAmt;         // 계약금액
    private BigDecimal nrmlIntAmt;              // 이자
    private BigDecimal vat;                     // 부가세
    private BigDecimal stdrExrt;                // 환율
    private BigDecimal eprzCrdlInvAmt;          // 투자금액
    
    private String depositWithdrawalCode;       // 입출금구분코드

    private String decdStepDcd;                 // 결재단계구분코드
    private String decdSttsDcd;                 // 결재상태구분코드

    private String trDtm;                       // 거래시간
    private String decdDtm;                     // 처리시간

    private String dcfcEno;                     // 승인자번호
    private String dcfcEnm;                     // 승인자명

    private String dealNo;                      // 딜번호
    private int trSeq;                          // 거래순번
    private int excSeq;                         // 실행순번
    private int erlmSeq;                        // 등록순번 452채번

    
    
    

}
