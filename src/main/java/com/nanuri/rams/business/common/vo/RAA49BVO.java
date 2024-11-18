package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 일별리스크심사통합포지션정보 Table.RAA49B VO
 * */
public class RAA49BVO {
	private String stdDt; 				// 기준일자
	private int    sq;					// 일련번호
	
	private String ibDealNo;			// IBDeal번호
	private String riskInspctCcd;		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	
	private String ctrtStrtDt;			// 계약시작일자
	private String astsQtyDvdCd;		// 자사건정성분류코드
	
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번
}
