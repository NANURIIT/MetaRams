package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 협의체안건상세 Table.RAA22B DTO
 * */
public class RAA22BDTO {

	private String inspctCnfrncCcd;		// 심사협의구분코드
	private String stdYr;				// 기준년도
	private int    inspctCnfrncSqcSq;	// 심사협의회차일련번호
	private int    rnkNo;				// 순위번호
	private int    sq;					// 일련번호
	private String rsltnDt;				// 결의일자
	private String rsltnRsltCd;			// 결의결과코드
	private int    rcgAmt;				// 승인금액
	private String sdnCndtF;			// 셀다운조건여부
	private String etcCndtF;			// 기타조건여부
	private String rsltCntnt;			// 결과내용
	
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd;		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번
	private Date   aprvRosDyIm;			// 결재요청일시
	private Date   aprvDyTm;			// 결재일시
	private String aprvPEno;			// 결재자사번
	private String aprvStCd;			// 결재상태코드
	private String aprvRjctRsn;			// 결재반려사유
	
	private String cnfrncNtmCndtlCntnt; // 협의회조건부내용
}
