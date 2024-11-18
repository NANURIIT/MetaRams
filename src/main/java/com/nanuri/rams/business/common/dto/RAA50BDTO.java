package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 일별리스크심사관리단계정보 Table.RAA50B DTO
 * */
public class RAA50BDTO {
	String stdDt;				// 기준일자
	String ibDealNo;			// IBDEAL번호
	String riskInspctCcd;		// 리스크심사구분코드
	String lstCCaseCcd;			// 부수안건구분코드
	String riskInspctMngSttsCd;	// 리스크심사관리단계코드
	String trnAstsF;			// 이관자산여부
	
	String hndlDyTm;			// 처리일시
	String hndlDprtCd;			// 처리부점코드
	String hndlPEno;			// 처리자사번
    
}
