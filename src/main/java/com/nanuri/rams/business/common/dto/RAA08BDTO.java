package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 책임준공정보 Table.RAA08B DTO
 * */
public class RAA08BDTO {
	private String ibDealNo         ;			// IBDEAL번호
	private String riskInspctCcd    ;           // 리스크심사구분코드
	private String lstCCaseCcd      ;           // 부수안건구분코드
	private int itemSq              ;           // 항목일련번호
	
	private String rspsbCmplOgnCcd 	;			// 책임준공기관구분코드
	private String scrtsCmpnyCorpNo ;           // 증권사법인번호
	private String dbtNpfrmOblgCcd  ;           // 채무불이행의무구분코드
	private String dmgRprtnMxExtnt  ;           // 손해배상최대범위
	private String rnmcno           ;           // 실명확인번호
	private String cmplExptDt       ;           // 준공예정일자
	
	private Date   hndlDyTm         ;           // 처리일시
	private String hndlDprtCd       ;           // 처리부점코드
	private String hndlPEno         ;           // 처리자사번
}
