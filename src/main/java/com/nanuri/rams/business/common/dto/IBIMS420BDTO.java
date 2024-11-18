package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
/*
 딜수수료수납내역 Table.IBIMS420BDTO DTO
*/
public class IBIMS420BDTO {
	
	private String prdtCd; 					/* 상품코드 */
	private long   trSn; 					/* 거래일련번호 */
	private long   excSn; 					/* 실행일련번호 */
	private long   feeSn; 					/* 수수료일련번호 */
	private String eprzCrdlRgstSttsCd;  	/* 기업여신등록상태코드 */
	private String eprzCrdlFeeKndCd; 		/* 기업여신수수료종류코드 */
	private BigDecimal eprzCrdlFeeStdrAmt;  /* 기업여신수수료기준금액 */
	private String feeTrgtCtns; 			/* 수수료대상내용 */
	private BigDecimal feeRt;  				/* 수수료율 */
	private BigDecimal feeAmt; 				/* 수수료금액 */
	private String ifrsFeeRcogDcd; 			/* IFRS수수료인식구분코드 */
	private String eprzCrdlFeeRcogDcd;  	/* 기업여신수수료인식구분코드 */
	private BigDecimal splmTxa; 			/* 부가세액 */
	private String feeTxtnYn; 				/* 수수료과세여부 */
	private String eprzCrdlTxtnTpDcd;  		/* 기업여신과세유형구분코드 */
	private String busiNmcpCplTxtnYn;   	/* 사업부수수료과세여부 */
	private BigDecimal fnnrPrlnRto; 		/* 재무이연비율 */
	private String fnnrRcogStrtDt; 			/* 재무인식시작일자 */
	private String fnnrRcogEndDt; 			/* 재무인식종료일자 */
	private int fnnrPrlnPrdDnum; 			/* 재무이연기간일수 */
	private BigDecimal mngmPrlnRto; 		/* 관리이연비율 */
	private String mngmRcogStrtDt; 			/* 관리인식시작일자 */
	private String mngmRcogEndDt; 			/* 관리인식종료일자 */
	private int mngmPrlnPrdDnum; 			/* 관리이연기간일수 */
	private BigDecimal dtmRcogAmt; 			/* 일시인식금액 */
	private BigDecimal prlnFee; 			/* 이연수수료 */
	private BigDecimal mngmDtmRcogAmt; 		/* 관리일시인식금액 */
	private BigDecimal mngmPrlnFee;			/* 관리이연수수료 */
	private String actsCd; 					/* 계정과목코드 */
	private String rstrnPrdtCd; 			/* 환출상품코드 */
	private long rstrnTrSn; 				/* 환출거래일련번호 */
	private BigDecimal rstrnFee; 			/* 환출수수료 */
	private BigDecimal dcRt; 				/* 할인율 */
	private String fndsDvsnCd; 				/* 자금구분코드 */
	private BigDecimal trAmt; 				/* 거래금액 */
	private String bcncNm ; 				/* 거래처명 */
	private String rkfrDt; 					/* 기산일자 */
	// private BigDecimal wcrcTrslTrFeeAmt; 	/* 원화환산거래수수료금액 */
	private BigDecimal krwTrslTrFeeAmt; 	/* 원화환산거래수수료금액 */
	private String prufIsuDt; 				/* 증빙발행일자 */
	// private BigDecimal aplcExchR;       	/* 적용환율 */
	private BigDecimal aplyExrt;       		/* 적용환율 */
	private String decdSttsDcd;				/* 결재상태구분코드 */
	private String prcsEmpno;               /* 처리사원번호 */
	private String prcsTm;                  /* 처리시간 */
	private Date hndDetlDtm; 				/* 조작상세일시 */
	private String hndEmpno; 				/* 조작사원번호 */
	private String hndTmnlNo; 				/* 조작단말기번호 */
	private String hndTrId; 				/* 조작거래ID */
	private String guid;
}

