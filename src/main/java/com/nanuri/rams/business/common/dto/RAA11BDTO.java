package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 관리직원정보 table(RAA11BDTO) DTO */
public class RAA11BDTO {

	private String ibDealNo;		// IBDEAL번호
	private String riskInspctCcd;	// 리스크심사구분코드
	private String lstCCaseCcd;		// 부수안건구분코드
	private int    itemSq;			// 항목일련번호
	
	private String cndctRgstEno;	// 조치등록사번
	private String uptRsnCntnt;		// 변경사유내용
	private String uptDt;			// 변경일자
	
	private String hndlDyTm;		// 처리일시
	private String hndlDprtCd;		// 처리부점코드
	private String hndlPEno;		// 처리자사번

}
