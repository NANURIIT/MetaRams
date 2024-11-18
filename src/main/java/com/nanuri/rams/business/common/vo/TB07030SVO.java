package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.com.dto.CalculationSumDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB07030SVO  {
	
	// 조회조건
    private String     prdtCd;          	/* 상품코드 */
    private String     prarDt;              /* 기산일자 */
    private BigDecimal ntfcExchR;			/* 고시환율 */
	private BigDecimal aplcExchR;			/* 적용환율 */
	private String     paiRdmpDcd;          /* 원리금상환구분코드 */
	private String     thdtEchmYn;          /* 당일환전여부 */
	
	//[실행별상환대상금액]
	private BigDecimal rdmpTrgtPrna;        /* 상환대상원금 */
	private BigDecimal nrmlIntAmt; 			/* 정상이자금액 */
	private BigDecimal crdtGrntOvduIntAmt; 	/* 신용공여연체이자금액 */
	private BigDecimal dealMrdpPrca; 		/* 딜중도상환원금 */
	private BigDecimal mrdpFeeAmt; 			/* 중도상환수수료금액 */
	private BigDecimal rcvbIntrSmmAmt; 		/* 미수이자합계금액 */	
	private BigDecimal exmptSmmAmt; 		/* 면제금액합계 */
	private BigDecimal rdmpPrnaSmmAmt;		/* 상환대상총금액 */
	
	private BigDecimal crdtGrntRcvbIntAmt; 	/* 신용공여미수이자금액 */
	
	//[상환정보]
	private String crncyCd;                 /* 통화코드 */
	private BigDecimal dealCashAmt; 		/* 딜현금금액 */
	private BigDecimal dealAltnAmt; 		/* 딜대체금액 */
	private String rctmLgdNm; 				/* 입금원장명 */
	private String rclmDvsnCd; 				/* 회수구분코드 */
	private String intlEchmYn; 				/* 내부환전여부 */
	private String ovrsFwdgYn; 				/* 해외송금여부 */
	private String bcncNm; 					/* 거래처명 */
	private String apvlStfno; 				/* 승인직원번호 */
	private BigDecimal acptPtclSmtlAmt; 	/* 수납내역합계금액 */
	
	private BigDecimal dealTrPrcaSmm; 	    /* 딜거래원금합계 */
	private BigDecimal trIntAmtSum; 	    /* 거래이자금액합계 */
	private BigDecimal rdmpIntrSmmAmt;		/* 상환이자합계금액 */
	
	//[환율정보]
	private String     rkfrDt;              /* 기산일자(상환일자) */
	private String     stdrDt;				/* 기준일자 */
	private BigDecimal stdrExrt;			/* 기준환율 */
	private String     rgstDt;				/* 등록일자 */
	
	//[상환대상내역]
	private List<IBIMS403BVO> ibims403Lst;  	
	
	//[상환대상상세내역]
	private List<IBIMS403BVO> ibims403DtlLst;

	//[중도상환원금 스케줄]
	List<IBIMS403BVO> ibims403RscdlList;
	
	// 실행별상환대상금액 합계
	private CalculationSumDTO totalDTO;
}
