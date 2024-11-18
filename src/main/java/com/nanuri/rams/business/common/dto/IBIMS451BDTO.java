package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 회계대사내역
 */
public class IBIMS451BDTO {

    private String stdrDt;              //  기준일자      varchar(8)
    private String actsCd;              //  계정과목코드  varchar(10)
    private String mngmBdcd;            //  관리부서번호  varchar(5)
    private BigDecimal ldgrTrAmt;       //  원장거래금액  decimal(18,0)
    private BigDecimal acctRfltAmt;     //  계정반영금액  decimal(18,0)
    private BigDecimal thdtDifaAmt;     //  당일차액금액  decimal(18,0)
    private BigDecimal ldgrRmnd;        //  원장잔액      decimal(18,0)
    private BigDecimal acctRmnd;        //  계정잔액      decimal(18,0)
    private BigDecimal difaAmt;         //  차액금액      decimal(18,0)
    private String acrdYn;              //  일치여부      varchar(1)
    private Date hndDetlDtm;            //  조작상세일시  datetime
    private String hndEmpno;            //  조작사원번호  varchar(7)
    private String hndTmnlNo;           //  조작단말기번호  varchar(8)
    private String hndTrId;             //  조작거래ID  varchar(10)
    private String guid;                //  GUID  varchar(29)

}
