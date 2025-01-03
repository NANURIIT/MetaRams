package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 협의체파일첨부정보 Table.RAA20B DTO
 * */
public class RAA20BDTO extends CommonDTO {

    private String ibDealNo;		/* IBDEAL 번호 */
    private String riskInspctCcd;	/* 리스크심사구분코드 */
    private String lstCCaseCcd;		/* 부수안건구분코드 */
    private int    attFileSq;		/* 첨부파일일련번호 */
    private String svFilePathNm;	/* 서버파일경로명 */
    private String svFileNm;		/* 서버파일명 */
    private String svFileExpnsnNm;	/* 서버파일확장자명 */
    private long   svFileSz;		/* 서퍼파일크기 */
    private String scrnMenuId;		/* 화면메뉴ID */
    private String orgFileNm;		/* 파일내용 (원본파일이름) */
    private String rgstDt;			/* 등록일자 */
    private String dltF;			/* 삭제여부 */
    
}
