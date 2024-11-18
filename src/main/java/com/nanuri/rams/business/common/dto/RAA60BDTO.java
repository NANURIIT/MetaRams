package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산사후관리이력정보 Table.RAA60B DTO
 * */
public class RAA60BDTO {
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd;		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	private int    sq;					// 일련번호
	
	private String evntAftrMngCcd;		// 사후관리구분코드
	private String evntAftrMngCntnt;	// 사후관리내용
	
	private Date   rgstDt;				// 등록일자
	private String rgstTm;				// 등록시간
	private String fstRgstPeno;			// 최초등록자사번
	
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPeno;			// 처리자사번
	
}
