package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 부실자산파일첨부정보 Table.RAA64B DTO
 * */
public class RAA64BDTO {
	private String ibDealNo;			// IBDEAL번호
	private String riskInspctCcd;		// 리스크심사구분코드
	private String lstCCaseCcd;			// 부수안건구분코드
	private int    attFileSq;			// 첨부파일일련번호
	
	private int	   hstSq;				// 이력일련번호
	private String svFilePathNm;		// 서버파일경로명
	private String svFileNm;			// 서버파일명
	private String svFileExpnsnNm;		// 서버파일확장명
	private long   svFileSz;			// 서버파일크기
	private String scrnMenuId;			// 화면메뉴ID
	private String realAttFileNm;		// 실제첨부파일명

	private String rgstDt;				// 등록일자
	private String dltF;				// 삭제여부
	private String fstRgstPeno;			// 최초등록자사번
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번
	
}
