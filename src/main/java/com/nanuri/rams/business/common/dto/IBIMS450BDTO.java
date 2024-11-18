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
    
    private String mngmBdcd;                //  관리부서번호  varchar(5)
    private String sttmDt;                  //  전표일자      varchar(8)
    private String actsCd;                  //  계정과목코드  varchar(10)
    private String pflsPrtlCd;              //  손익부문코드  varchar(2)
    private String bfdyCrovAmt;             //  전일이월금액  decimal(18,0)
    private BigDecimal dbitTtlzAmt;         //  차변집계금액  decimal(18,0)
    private BigDecimal credTtlzAmt;         //  대변집계금액  decimal(18,0)
    private BigDecimal thdtRmnd;            //  당일잔액      decimal(18,0)
    private BigDecimal dayClsbAcmaAmt;      //  일별적수금액  decimal(18,0)
    private Date hndDetlDtm;                //  조작상세일시  datetime
    private String hndEmpno;                //  조작사원번호  varchar(7)
    private String hndTmnlNo;               //  조작단말기번호  varchar(8)
    private String hndTrId;                 //  조작거래ID  varchar(10)
    private String guid;                    //  GUID  varchar(29)

}
