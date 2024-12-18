package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 *  수수료 종류 관리
 */
public class IBIMS421BDTO {
	private String feeKndCd;				//  수수료종류코드
    private String etprCrdtGrntFeeKindCd;   //  기업신용공여수수료종류코드  varchar(2)
    private String actsCd;                  //  계정과목코드    varchar(10)
    private String etprCrdtGrntErlmStatCd;  //  기업신용공여등록상태코드    varchar(2)
    private String feeName;					//  수수료명
    private String feeRcogDcd;				//  수수료인식구분코드  varchar(2)
    private String feeRcknDcd;          	//  수수료산정구분코드  varchar(2)
    private BigDecimal feeRt;               //  수수료율    decimal(21,6)
    private BigDecimal feeLwstAmt;          //  수수료최저금액  decimal(18,0)
    private BigDecimal feeHgstAmt;          //  수수료최고금액  decimal(18,0)
    private String actName;                 //  계정과목명  varchar(60)
    private String acctJobCd;				//  회계업무코드
    private String acctUnJobCd;				//  회계단위업무코드
    private String acctTrCd;                //  회계거래코드    varchar(2)
    private Date hndDetlDtm;                //  조작상세일시    datetime
    private String hndEmpno;                //  조작사원번호    varchar(7)
    private String hndTmnlNo;               //  조작단말기번호  varchar(8)
    private String hndTrId;                 //  조작거래ID  varchar(10)
    private String guid;                    //  GUID    varchar(29)
    private BigDecimal dealDvdnAmt;         //  딜배당금액  decimal(18,3)

} 
