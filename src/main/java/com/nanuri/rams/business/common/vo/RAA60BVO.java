package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산관리이력정보 Table.RAA60B VO
 * */
public class RAA60BVO {
	private String ibDealNo;			// IBDEAL번호
	private String ibDealNm;			// IBDEAL명
	private String riskInspctCcd;		// 리스크심사구분코드
	private String riskInspctCcdNm;		// 리스크심사구분코드명
	private String lstCCaseCcd;			// 부수안건구분코드
	private String lstCCaseCcdNm;		// 부수안건구분코드명
	private int    sq;					// 일련번호
	
	private String evntAftrMngCcd;		// 사후관리구분코드
	private String evntAftrMngCcdNm;	// 사후관리구분코드명
	private String evntAftrMngCntnt;	// 사후관리내용
	
	private String rgstDt;				// 등록일자
	private String rgstTm;				// 등록시간
	private String fstRgstPeno;			// 최초등록자사번
	private String fstRgstPenoNm;		// 최초등록자이름
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPeno;			// 처리자사번
	
	private String inspctPrgrsStCd;		// 진행상태
	private String inspctPrgrsStCdNm;	// 진행상태명
	
	private String dprtCdNm;			// 부서명
	private String empNm;				// 사원명
	private String chrgpEno;			// 담당자사원
	
	
	
}
