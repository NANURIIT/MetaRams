package com.nanuri.rams.business.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/*
 * 리포트파일첨부정보 Table.RAB04B DTO
 * */
public class RAB04BDTO extends CommonDTO {
	
	private int repFileAttSq;			// 리포트파일첨부일련번호
	private String repNo;				// 리포트번호
	private String svFilePathNm;		// 서버파일경로명
	private String svFileNm;			// 서버파일명
	private String svFileExpnsnNm;		// 서버파일확장명
	private long svFileSz;				// 서버파일크기
	private String scrnMenuId;			// 화면메뉴ID
	private String fileCntnt;			// 파일내용
	private String orgFileNm;			// 원본파일멍
}

