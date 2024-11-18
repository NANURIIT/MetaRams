package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 협의체회차정보 Table.RAA21B DTO
 * */
public class RAA21BDTO {

	private String inspctCnfrncCcd;			// 심사협의구분코드
	private String stdYr;					// 기준년도
	private int    inspctCnfrncSqcSq;		// 심사협의회차일련번호
	private String rsltnDt;					// 결의일자
	private String rsltnTm;					// 결의시간
	private String rgstDprtCd;				// 등록부점코드
	private String rgstPEno;				// 등록자사번
	private String rgstF;					// 등록여부
	private String cnclPEno;				// 취소자사번
	private String inspctCnfrncCnclRsnCd;	// 심사협의취소사유코드
	private String cnclRsnCntnt;			// 취소사유내용
	
	private Date   hndlDyTm;				// 처리일시
	private String hndlDprtCd;				// 처리부점코드
	private String hndlPEno;				// 처리자사번
	
	private String mtngCcd;					// 회의구분코드
}
