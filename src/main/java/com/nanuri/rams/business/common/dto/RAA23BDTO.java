package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
/*
 * 협의체위원상세 Table.RAA23B DTO
 * */
public class RAA23BDTO {
	private String inspctCnfrncCcd	;	// 심사협의구분코드
	private String stdYr            ;	// 기준년도
	private int    inspctCnfrncSqcSq;	// 심사협의회차일련번호
	private int    rnkNo            ;	// 순위번호
	private String atdncPEno        ;	// 참석자사번
	private String atdncPrxyEno     ;	// 참석대리인사번
	private String cmmttMmbrCcd     ;	// 위원회멤버구분코드
	private String aprvOpstnCcd     ;	// 찬반구분코드
	private String rvwCmmtCntnt     ;	// 심의의견내용
	private String realAtdncF       ;	// 실제참석여부
	private String cnfrPEno         ;	// 확인자사번
	private String cnfrF            ;	// 확인여부
	private String cnfrDt           ;	// 확인일자
	private String cnfrTm           ;	// 확인시간
	private String rgstDt           ;	// 등록일자
	private int    inqRnk           ;	// 조회순위

	private Date   hndlDyTm         ;	// 처리일시
	private String hndlDprtCd       ;	// 처리부점코드
	private String hndlPEno         ;	// 처리자사번
}
