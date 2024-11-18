package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산시효관리정보 Table.RAA63B VO
 * */
public class RAA63BVO {
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd; 		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	private int	   sq;					// 일련번호
		
	private String efctOcrncDt; 		// 효력발생일자
	private String efctEndDt;			// 효력종료일자
	private String efctMngCntnt; 		// 효력관리내용
		
	private String rgstDt;				// 등록일자
	private String rgstTm;				// 등록시간
	private String fstRgstPEno; 		// 최초등록자사번
	private String fstRgstPEnoNm;		// 최초등록자이름
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlDprtCdNm;		// 처리부점코드명
	private String hndlPEno;			// 처리자사번
	
}
