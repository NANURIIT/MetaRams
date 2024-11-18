package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 책임준공정보 Table.RAA08B VO
 * */
public class RAA08BVO {
	private String ibDealNo         ;			// IBDEAL번호
	private String riskInspctCcd    ;           // 리스크심사구분코드
	private String lstCCaseCcd      ;           // 부수안건구분코드
	private String itemSq           ;           // 항목일련번호
	
	private String rspsbCmplOgnCcd	;			// 책임준공기관구분
	private String scrtsCmpnyCorpNo ;           // 증권사법인번호
	private String dbtNpfrmOblgCcd  ;           // 채무불이행의무구분코드
	private String dmgRprtnMxExtnt  ;           // 손해배상최대범위
	private String rnmcno           ;           // 실명확인번호
	private String cmplExptDt       ;           // 준공예정일자
	
	private String hndlDyTm         ;           // 처리일시
	private String hndlDprtCd       ;           // 처리부점코드
	private String hndlPEno         ;           // 처리자사번
	
	private String rspsbCmplOgnCcdNm;			// 책임준공기관구분
	private String dbtNpfrmOblgCcdNm;           // 채무불이행의무구분코드명
	
	private String entpHnglNm;					// 한글법인명
}
