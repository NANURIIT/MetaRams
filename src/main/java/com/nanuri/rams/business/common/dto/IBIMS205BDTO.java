package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
딜승인수수료설정기본 Table.IBIMS203B DTO
*/
public class IBIMS205BDTO {
	private String bssAsstMngmNo;				// 기초자산관리번호
	private String prdtCd;						// 상품코드
	private String bssAsstKndCd;				// 기초자산종류코드
	private String bscAstsCnts;					// 기초자산내용
	private String rnmCnfmNo;					// 실명확인번호
	private String bssAsstIsuCrno;				// 기초자산발행법인등록번호
	private String crpNm;						// 법인명
	private String invstCrryCd;					// 투자통화코드투자통화코드
	//private String crryAmt;						// 통화금액(메타 변경 전)
	private String crncyAmt;						// 통화금액
	private BigDecimal aplcExchR;				// 적용환율
	private BigDecimal crevAmt;					// 시가평가금액
	private String hndDetlDtm;					// 조작상세일시
	private String hndEmpno;					// 조작사원번호
	private String hndTmnlNo;					// 조작단말기번호
	private String hndTrId;						// 조작거래id
	private String guid;						// guid

}