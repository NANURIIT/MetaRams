package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산법적절차정보 Table.RAA62B DTO
 * */
public class RAA62BDTO {
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd; 		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	private int	   sq;					// 일련번호
		
	private String lglPrcrCcd; 			// 법적절차구분코드
	private String lglPrcrKndCcd;		// 법적절차종류구분코드
	private String lglPrcrCntnt; 		// 법적절차내용
	private String crtrmInfo;			// 법원정보
	private String acdntNo;				// 사건번호
		
	private String rgstDt;				// 등록일자
	private String rgstTm;				// 등록시간
	private String fstRgstPEno; 		// 최초등록자사번
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번
}
