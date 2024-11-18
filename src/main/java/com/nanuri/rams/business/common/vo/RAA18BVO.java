package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 관련문서정보 Table.RAA18B VO
 * */
public class RAA18BVO {
	
	@Getter
	@Setter
	public static class DocInfo {
		private String ibDealNo;		// IBDEAL번호
		private String riskInspctCcd;	// 리스크심사구분코드
		private String lstCCaseCcd;		// 부수안건구분코드
		private String itemSq;			// 항목일련번호
		
		private String raDocCcd;		// RA문서구분코드
		private String raDocCcdNm;		// RA문서구분코드명
		private String raDocNo;			// RA문서번호
		private String raRmrk;			// RA비고(URLLINK)
		private String raFnlDocF;		// RA최종문서여부
		
	}
	
	@Getter
	@Setter
	public class ExitDocInfo {
	   private String ibDealNo;			// IBDEAL번호
	   private String riskInspctCcd;	// 리스크심사구분코드
	   private String lstCCaseCcd;		// 부수안건구분코드
	   private String raDocCcd;			// RA문서구분코드
	   private int    itemSq;			// 항목일련번호
	   private String raDocNo;			// RA문서번호
	   
	   private String exitRaDocCcd;		// RA문서구분코드
	   private String exitRaDocNo;		// EXIT RA문서번호
	   
	   private Date   hndlDyTm;			// 처리일시
	   private String hndlDprtCd;		// 처리부점코드
	   private String hndlPEno;			// 처리자사번
	   
	}
	
}
