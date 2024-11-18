package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 관련문서정보 Table.RAA18B DTO
 * */
public class RAA18BDTO {

    private String ibDealNo;			// IBDEAL번호
    private String riskInspctCcd;		// 리스크심사구분코드
    private String lstCCaseCcd;			// 부수안건구분코드
    
    private String raDocCcd;			// RA문서구분코드
    private int    itemSq;				// 항목일련번호
    private String raDocNo;				// RA문서번호
    private String raRmrk;				// RA비고(URLLINK)
    private String raFnlDocF;			// RA최종문서여부
    
    private Date   hndlDyTm;			// 처리일시
    private String hndlDprtCd;			// 처리부점코드
    private String hndlPEno;			// 처리자사번
}
