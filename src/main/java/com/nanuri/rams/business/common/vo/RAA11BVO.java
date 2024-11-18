package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * 관리직원정보 Table.RAA11B VO
 * */
public class RAA11BVO {
	private String ibDealNo;		// IBDEAL번호
	private String riskInspctCcd;	// 리스크심사구분코드
	private String lstCCaseCcd;		// 부수안건구분코드
	private int    itemSq;			// 항목일련번호
	
	private int	   cndctRgstEno;	// 조치등록사번
	private String cndctRgstEnoNm;	// 조치등록사번명
	private String uptRsnCntnt;		// 변경사유내용
	private String uptDt;			// 변경일자
	
	private String hndlDyTm;		// 처리일시
	private String hndlDprtCd;		// 처리부점코드
	private String hndlPEno;		// 처리자사번
}
