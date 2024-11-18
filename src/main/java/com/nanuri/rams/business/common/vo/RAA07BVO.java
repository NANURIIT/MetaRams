package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 보증정보 Table.RAA07B VO
 * */
public class RAA07BVO {
	private String ibDealNo     ;			// IBDEAL번호
	private String riskInspctCcd;			// 리스크심사구분코드
	private String lstCCaseCcd  ;			// 부수안건구분코드
	private String itemSq       ;			// 항목일련번호
	
	private String crdtEhcmntGrntCcd;		// 신용보강보증구분코드
	private String crdtEhcmntGrntCcdNm;		// 신용보강보증구분코드명
	private String ensrOgnCorpNo;			// 보증기관법인번호
	private BigDecimal ensrAmt  ;			// 보증금액
	private String ensrCntnt    ;			// 보증내용
	private String rnmcno       ;			// 실명확인번호
	
	private String hndlDyTm     ;			// 처리일시
	private String hndlDprtCd   ;			// 처리부점코드
	private String hndlPEno     ;			// 처리자사번
	
	private String entpHnglNm;				// 한글법인명 		
}
