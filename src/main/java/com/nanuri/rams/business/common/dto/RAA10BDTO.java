package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 승인조건관리기타정보 RAA10BDTO
 */
public class RAA10BDTO {
    private String ibDealNo;		// IBDEAL번호
    private String riskInspctCcd;	// 리스크심사구분코드
	private String lstCCaseCcd;		// 부수안건구분코드
    private int	   itemSq;			// 항목일련번호
    private String rmrk;			// 적용금액
    private String endDtEndDt;		// 기한종료일자
    private Date   hndlDyTm;		// 처리일시
    private String hndlDprtCd;		// 처리부점코드
    private String hndlPEno;		// 처리자사번
    private String oblgCntnt;		// 의무내용
    private String pfrmDt;			// 이행일자
    private String endF;			// 종료여부
}
