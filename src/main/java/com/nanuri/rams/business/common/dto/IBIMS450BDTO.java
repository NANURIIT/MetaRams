package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 회계반영내역
 */
public class IBIMS450BDTO {
    
    private String mngmBdcd;                //  관리부점번호
    private String sttmDt;                  //  전표일자    
    private String actsCd;                  //  계정과목코드
    private String pflsPrtlCd;              //  손익부문코드
    private BigDecimal bfdyCrovAmt;         //  전일이월금액
    private BigDecimal dbitTtlzAmt;         //  차변집계금액
    private BigDecimal credTtlzAmt;         //  대변집계금액
    private BigDecimal thdtRmnd;            //  당일잔액    
    private BigDecimal dayClsbAcmaAmt;      //  일별적수금액
    private Date hndDetlDtm;                //  조작상세일시
    private String hndEmpno;                //  조작사원번호
    private String hndTmnlNo;               //  조작단말기번호
    private String hndTrId;                 //  조작거래ID
    private String guid;                    //  GUID

}
