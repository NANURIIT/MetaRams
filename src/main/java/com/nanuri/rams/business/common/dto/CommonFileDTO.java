package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

/*
 * 첨부파일 공통 DTO
 */
@Getter
@Setter
public class CommonFileDTO extends CommonDTO {
    private String ibDealNo;        // IBDEAL번호
    private String riskInspctCcd;   // 리스크심사구분코드
    private String lstCCaseCcd;     // 부수안건구분코드
    private int    atchFleSn;       // 첨부파일일련번호
    private int    hstSq;           // 이력일련번호
    private String svFilePathNm;    // 서버파일경로명
    private String svFileNm;        // 서버파일명
    private String svFileExpnsnNm;  // 서버파일확장명
    private int    svFileSz;        // 서버파일크기
    private String scrnMenuId;      // 화면메뉴ID
    private String fileCntnt;       // 파일내용
    private String orgFileNm;       // 원본파일명
    private String realAttFileNm;   // 실제첨부파일명
    private String dltF;            // 삭제여부

    private String stdYrMm;         // 기준년월
}
