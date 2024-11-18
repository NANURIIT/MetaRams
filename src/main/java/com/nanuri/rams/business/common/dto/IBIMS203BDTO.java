package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
딜승인수수료설정기본 Table.IBIMS203B DTO
*/
public class IBIMS203BDTO {
	private String prdtCd;				// 상품코드
	private long   feeSn;				// 수수료일련번호
	private String feeRcvnDt;			// 수수료수취일자
	private String eprzCrdlFeeKndCd;	// 기업여신수수료종류코드
	private String actsCd;				// 계정과목코드
	private String ifrsFeeRcogDcd;		// ifrs수수료인식구분코드
	private String eprzCrdlFeeRcogDcd;	// 기업여신수수료인식구분코드
	private String feeTxtnYn;			// 수수료과세여부
	private String busiNmcpCplTxtnYn;	// 사업부수수료과세여부
	private BigDecimal eprzCrdlFeeStdrAmt;	// 기업여신수수료기준금액
	private String trOthrDscmNo;		// 거래상대방식별번호
	private String feeTrgtCtns;			// 수수료대상내용
	private BigDecimal feeRt;			// 수수료율
	private BigDecimal feeAmt;			// 수수료금액
	private BigDecimal fnnrPrlnRto;		// 재무이연비율
	private String fnnrRcogStrtDt;		// 재무인식시작일자
	private String fnnrRcogEndDt;		// 재무인식종료일자
	private BigDecimal mngmPrlnRto;		// 관리이연비율
	private String mngmRcogStrtDt;		// 관리인식시작일자
	private String mngmRcogEndDt;		// 관리인식종료일자
	private BigDecimal dcRt;			// 할인율
	private String eprzCrdlTxtnTpDcd;	// 기업여신과세유형구분코드
	private BigDecimal pymtFee;			// 지급수수료
	private Date hndDetlDtm;			// 조작상세일시
	private String hndEmpno;			// 조작사원번호
	private String hndTmnlNo;			// 조작단말기번호
	private String hndTrId;				// 조작거래id
	private String guid;				// guid

}