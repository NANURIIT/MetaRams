package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 파일 업로드
 * */
public class FileUploadDTO {
	private String fileKey1;			// fileKey1
	private String fileKey2;		    // fileKey2
	private int    atchFleSn;		/* 첨부파일일련번호 */
    private String svFilePathNm;	/* 서버파일경로명 */
    private String svFileNm;		/* 서버파일명 */
    private String svFileExpnsnNm;	/* 서버파일확장자명 */
    private long   svFileSz;		/* 서퍼파일크기 */
    private String scrnMenuId;		/* 화면메뉴ID */
    private String orgFileNm;		/* 파일내용 (원본파일이름) */
    private String rgstDt;			/* 등록일자 */
    private String dltYn;			/* 삭제여부 */
    private String hndlDprtCd;				
    private String hndlPEno	;
}
