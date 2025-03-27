package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/*
 * IBIMS901B
 * SPC유동화증권발행내역
 */
@Getter
@Setter
public class IBIMS901BDTO {

    private String ardyBzepNo;              /* 기업체번호 */
    private long lqdzSctyIsuTmrd;           /* 유동화증권발행회차 */
    private String isuDt;                   /* 발행일자 */
    private String expDt;                   /* 만기일자 */
    private BigDecimal isuAmt;              /* 발행금액 */
    private Date hndDetlDtm;                /* 조작상세일시 */
	private String hndEmpno;                /* 조작사원번호 */
	private String hndTmnlNo;               /* 조작단말기번호 */
	private String hndTrId;                 /* 조작거래ID */
	private String guid;                    /* GUID */
    
}
