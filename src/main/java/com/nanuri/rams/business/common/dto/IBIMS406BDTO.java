package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class IBIMS406BDTO {
	private String prdtCd; /* 상품코드 */
	private long trSn; /* 거래일련번호 */
	private long excSn; /* 실행일련번호 */
	private long intCalcSeq; /* 이자계산순번 */
	private String rkfrDt; /* 기산일자 */
	private String intrCalcStrtDt; /* 이자계산시작일자 */
	private String intrCalcEndDt; /* 이자계산종료일자 */
	private String paiTypCd; /* 원리금유형코드 */
	private long trgtDnum; /* 대상일수 */
	private String rdmpTmrd; /* 상환회차 */
	private BigDecimal aplyIntr; /* 적용금리 */
	private BigDecimal dealTrgtAmt; /* 딜대상금액 */
	private BigDecimal dealIstmPrna; /* 딜할부원금 */
	private BigDecimal nrmlIntAmt; /* 정상이자금액 */
	private BigDecimal crdtGrntOvduIntAmt; /* 신용공여연체이자금액 */
	private BigDecimal mrdpFeeAmt; /* 중도상환수수료금액 */
	private BigDecimal crdtGrntRcvbIntAmt; /* 신용공여미수이자금액 */
	private Date hndDetlDtm; /* 조작상세일시 */
	private String hndEmpno; /* 조작사원번호 */
	private String hndTmnlNo; /* 조작단말기번호 */
	private String hndTrId; /* 조작거래id */
	private String guid; /* guid */
}