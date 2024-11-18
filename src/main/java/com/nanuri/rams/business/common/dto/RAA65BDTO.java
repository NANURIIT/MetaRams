package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
/*
 * 안건별모니터링관리정보 Table.RAA65B DTO
 * */
public class RAA65BDTO {

	/* 안건정보 */
	private String ibDealNo;                                   // IBDEAL번호
	private String riskInspctCcd;                              // 리스크심사구분코드
	private String lstCCaseCcd;                                // 부수안건구분코드
	/* 모니터링 정보*/
	private String caseMntrCntnt;                              // 안건모니터링내용
	private String caseMntrDtlsCntnt;                          // 안건모니터링상세내용
	private String mainSttn;                                   // 주요현황
	private String astsOutln;                                  // 자산개요
	private String wrkngSttn;                                  // 운용현황
	private String prgrsLps1;                                  // 진행경과1
	private String prgrsLps2;                                  // 진행경과2
	private String prgrsLps3;                                  // 진행경과3
	/* 사용자 정보 */
	private String fstRgstPEno;								   // 최초등록자사번
	private String hndlPEno;								   // 처리자사번
	private String hndlDprtCd;								   // 처리부점코드

}
