package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/*
 * IBIMS900B
 * SPC자금집행요청내역
 */
@Getter
@Setter
public class IBIMS900BDTO {

    private String ardyBzepNo;              /* 기업체번호 */
    private long fincExcuRqsSn;             /* 자금집행신청일련번호 */
    private String fincExcuRqsDt;           /* 자금집행신청일자 */
    private String ibCtrtNm;                /* IB계약명 */
    private String isttCd;                  /* 기관코드 */
    private String asstMngmAcno;            /* 자산관리계좌번호 */
    private String dprtCd;                  /* 부서코드 */
    private String rmCtns;                  /* 비고내용 */
    private String lqdzSctyIsuYn;           /* 유동화증권발행여부 */
    private Date hndDetlDtm;                /* 조작상세일시 */
	private String hndEmpno;                /* 조작사원번호 */
	private String hndTmnlNo;               /* 조작단말기번호 */
	private String hndTrId;                 /* 조작거래ID */
	private String guid;                    /* GUID */
	 
    
}
