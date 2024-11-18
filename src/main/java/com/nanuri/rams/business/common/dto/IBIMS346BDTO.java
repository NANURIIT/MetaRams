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
public class IBIMS346BDTO {
	
	private String prdtCd; /* 상품코드 */
	private long rgstSn; /* 등록일련번호 */
	private String aplyStrtDt; /* 적용시작일자 */
	private String aplyEndDt; /* 적용종료일자 */
	private String stdrIntrtKndCd; /* 기준금리종류코드 */
	private BigDecimal fxnIntrt; /* 고정금리 */
	private BigDecimal addIntrt; /* 가산금리 */
	private String intrtCngeFrqcCd; /* 금리변동주기코드 */
	private int intrtCngeFrqcMnum; /* 금리변동주기개월수 */
	private String aplyDnumDcd; /* 적용일수구분코드 */
	private int stdrIntrtAplyDnum; /* 기준금리적용일수 */
	private Date hndDetlDtm; /* 조작상세일시 */
	private String hndEmpno; /* 조작사원번호 */
	private String hndTmnlNo; /* 조작단말기번호 */
	private String hndTrId; /* 조작거래id */
	private String guid; /* guid */

}