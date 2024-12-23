package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/*
딜승인수수료스케줄기본 Table.IBIMS348B DTO
*/
@Getter
@Setter
public class IBIMS348BDTO {
	
	private String prdtCd;				/* 상품코드 */
	private long   feeSn;				/* 수수료일련번호 */
	private String rgstSttsCd;			/* 등록상태코드 */
	private String prarDt;				/* 예정일자 */
	private String feeBnapDcd;			/* 수수료선후급구분코드 */
	private String feeKndCd;			/* 수수료종류코드 */
	private String ifrsFeeRcogDcd;		/* ifrs수수료인식구분코드 */
	private String feeRcogDcd;			/* 수수료인식구분코드 */
	private String feeTxtnYn;			/* 수수료과세여부 */
	private String txtnTpDcd;			/* 과세유형구분코드 */
	private String busiNmcpCplTxtnYn;	/* 사업부수수료과세여부 */
	private BigDecimal feeStdrAmt;		/* 수수료기준금액 */
	private String feeTrgtCtns;			/* 수수료대상내용 */
	private String prcsCpltYn;			/* 처리완료여부 */
	private String crryCd;				/* 통화코드 */
	private BigDecimal feeRt;			/* 수수료율 */
	private BigDecimal feeAmt;			/* 수수료금액 */
	private String feeRcivDt;			/* 수수료수납일자 */
	private BigDecimal feeRcivAmt;		/* 수수료수납금액 */
	private long   trSn;				/* 거래일련번호 */
	private BigDecimal fnnrPrlnRto;		/* 재무이연비율 */
	private String fnnrRcogStrtDt;		/* 재무인식시작일자 */
	private String fnnrRcogEndDt;		/* 재무인식종료일자 */
	private int fnnrPrlnPrdDnum;		/* 재무이연기간일수 */
	private BigDecimal prlnFee; 		/* 이연수수료 */
	private BigDecimal mngmPrlnRto;		/* 관리이연비율 */
	private String mngmRcogStrtDt;		/* 관리인식시작일자 */
	private String mngmRcogEndDt;		/* 관리인식종료일자 */
	private int mngmPrlnPrdDnum;		/* 관리이연기간일수 */
	private BigDecimal mngmPrlnFee;		/* 관리이연수수료 */
	private String mngCnfmYn;			/* 경영확인여부 */
	private String inogCnfmYn;			/* 출납확인여부 */
	private String taffCnfmYn;			/* 세무확인여부 */
	private BigDecimal pymtFee;			/* 지급수수료 */
	private String rqsRgstYn;			/* 신청등록여부 */
	private String actsCd;				/* 계정과목코드 */
	private long excSn;				    /* 실행일련번호 */
	private BigDecimal dcRt;			/* 할인율 */
	private String rpsrNm;				/* 대표자명 */
	private String rgstBdcd;			/* 등록부점코드 */
	private Date hndDetlDtm;			/* 조작상세일시 */
	private String hndEmpno;			/* 조작사원번호 */
	private String hndTmnlNo;			/* 조작단말기번호 */
	private String hndTrId;				/* 조작거래id */
	private String guid;			    /* guid */

	private String strPrarDt;			/* 예정일_시작일자*/
	private String endPrarDt;			/* 예정일_종료일자*/
	private String empNo;				/* 담당자사번*/
	private String dprtCd;				/* 담당부서 */
	
	

}