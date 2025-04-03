package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/*
 * IBIMS901B
 * SPC자금입출금요청내역
 */
@Getter
@Setter
public class IBIMS902BDTO {
    
    private String trDt;                        /* 거래일자 */
    private String ardyBzepNo;                  /* 기업체번호 */
    private long fincExcuRqsSn;                 /* 자금집행신청일련번호 */
    private long trSn;                          /* 거래일련번호 */
    private String rndrDcd;                     /* 입출금구분코드 */
    private String spcDepItemKndCd;             /* SPC입금항목종류코드 */
    private String spcWdrItemKndCd;             /* SPC출금항목종류코드 */
    private String synsText;                    /* 적요내용 */
    private String trOthrDscmNo;                /* 거래상대방기업체번호 */
    private BigDecimal rndrAmt;                 /* 입출금금액 */
    private BigDecimal rndrBlce;                /* 입출금잔액 */
    private String isttCd;                      /* 기관코드 */
    private String acno;                        /* 계좌번호 */
    private String sortNo;                      /* 정렬순서 */
    private String rmrk;                        /* 비고 */
    private Date hndDetlDtm;                    /* 조작상세일시 */
	private String hndEmpno;                    /* 조작사원번호 */
	private String hndTmnlNo;                   /* 조작단말기번호 */
	private String hndTrId;                     /* 조작거래ID */
	private String guid;                        /* GUID */

    private String trOthrNm;                    /* 거래상대방명 */
}
