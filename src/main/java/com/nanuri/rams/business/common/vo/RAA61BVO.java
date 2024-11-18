package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산재산조사정보 Table.RAA61B VO
 * */
public class RAA61BVO {
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd; 		// 리스크심사구분코드
	private String riskInspctCcdNm;		// 리스크심사구분코드명
	private String lstCCaseCcd;			// 부수안건구분코드
	private String lstCCaseCcdNm;		// 부수안건구분코드명
	private int	   sq;					// 일련번호
	
	private String esttExmntnTrgtCcd; 	// 재산조사대상구분코드
	private String esttExmntnTrgtCcdNm;	// 재산조사대상구분코드명
	private String esttKndCcd;			// 재산종류구분코드
	private String esttKndCcdNm;		// 재산종류구분코드명
	private String esttExmntnCntnt; 	// 재산조사내용
	private String realPrftF;			// 실제이익여부
	
	private String rgstDt;				// 등록일자
	private String rgstTm;				// 등록시간
	private String fstRgstPEno; 		// 최초등록자사번
	private String fstRgstPEnoNm;		// 최초등록자이름
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlDprtCdNm;		// 처리부점코드명
	private String hndlPEno;			// 처리자사번
}
