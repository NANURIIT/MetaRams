package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
    품의상세
*/
public class IBIMS432BDTO {

    private String wrtnDt;                      //  작성일자
    private String rslnBdcd;                    //  결의부점코드
    private String cnstNo;                      //  품의번호
    private int sttmDetlSn;                     //  전표상세일련번호
    private String dbitCritDcd;                 //  차변대변구분코드
    private String rptsActsCd;                  //  보고서계정과목코드
    private String actsCd;                      //  계정과목코드
    private BigDecimal krwAmt;                  //  원화금액
    private BigDecimal frcrAmt;                 //  외화금액
    private String bdgExcuBdcd;                 //  예산집행부점코드
    private String bdgActsCd;                   //  예산계정과목코드
    private String rvrsBdcd;                    //  귀속부점코드
    private String rslnSynsCtns;                //  결의적요내용
    private String fndsIstrJobClsfCd;           //  자금지시업무분류코드
    private String acctBcncCd;                  //  회계거래처코드
    private String prufKndDcd;                  //  증빙종류구분코드
    private String prufDt;                      //  증빙일자
    private String ntsApvlNo;                   //  국세청승인번호
    private String elcPrufYn;                   //  전자증빙여부
    private String vhclRgstCd;                  //  차량등록코드
    private String nsFndCd;                     //  고유자산펀드코드
    private String prdtCd;                      //  상품코드
    private BigDecimal projId;                  //  프로젝트ID
    private String crryCd;                      //  통화코드
    private BigDecimal exrt;                    //  환율
    private Date hndDetlDtm;                    //  조작상세일시
    private String hndEmpno;                    //  조작사원번호
    private String hndTmnlNo;                   //  조작단말기번호
    private String hndTrId;                     //  조작거래ID
    private String guid;                        //  GUID
    
}
