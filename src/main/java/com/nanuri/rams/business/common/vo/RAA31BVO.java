package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 의무이행계획정보 Table.RAA31B VO
 * */
public class RAA31BVO {
	private String ibDealNo; 		// IBDEAL번호
	private String riskInspctCcd; 	// 리스크심사구분코드
	private String lstCCaseCcd; 	// 부수안건구분코드
	private int	   itemSq;			// 항목일련번호
	
	private String oblgPfrmCcd;		// 의무이행구분코드
	
	// 셀다운의무
	private String oblgAmt;			// 의무금액
	private String aplcEndDtDt;		// 적용기한일자
	private String rpyDt;			// 해소일자
	private String rpyAmt;			// 해소금액
	private String unpayAmt;		// 미해소금액
	
	// 기타의무
	private String oblgCntnt;		// 의무내용
	private String rpyF;			// 해소여부
	
	private Date   hndlDyTm;		// 처리일시
	private String hndlDprtCd;		// 처리부점코드
	private String hndlPEno;		// 처리자사번
	
	@Getter
	@Setter
	public static class SearchParam {
		private String ibDealNo; 		// IBDEAL번호
		private String riskInspctCcd; 	// 리스크심사구분코드
		private String lstCCaseCcd; 	// 부수안건구분코드
		private int	   itemSq;			// 항목일련번호
		private String oblgPfrmCcd;		// 의무이행구분코드
	}
}
