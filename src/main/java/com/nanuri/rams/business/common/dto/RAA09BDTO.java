package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 승인조건관리셀다운정보 RAA08BDTO
 */
public class RAA09BDTO {
    private String      ibDealNo;		// IBDEAL번호
    private String      riskInspctCcd;  // 리스크심사구분코드
	private String      lstCCaseCcd;	// 부수안건구분코드
    private int         itemSq;         // 항목일련번호
    private BigDecimal  aplcAmt;        // 적용금액
    private String      pfrmDt;         // 이행일자
    private String      endDtEndDt;     // 기한종료일자
    private String      mtrtHldAmt;     // 만기보유금액

    private Date        hndlDyTm;       // 처리일시
    private String      hndlDprtCd;     // 처리부점코드
    private String      hndlPEno;       // 처리자사번
}
