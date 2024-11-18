package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 메뉴기본 Table.IBIMS005B DTO
*/
public class IBIMS005BDTO {
    private String         menuId;                                 // 메뉴ID
    private String         menuNm;                                 // 메뉴명
    private String         shtnNm;                                 // 단축명
    private String         hgrkMenuId;                             // 상위메뉴ID
    private String         scrnAplyShpCd;                          // 화면적용형태코드
    private int            sortNo;                                 // 정렬번호
    private int            menuLvl;                                // 메뉴레벨
    private String         urlClsfCd;                              // URL분류코드
    private String         urlNm;                                  // URL명
    private String         urlVrbCntn;                             // URL변수내용
    private String         usrAthDcd;                              // 사용자권한구분코드
    private String         aplyYn;                                 // 적용여부
    private String         aplyDt;                                 // 적용일자
    private String         delYn;                                  // 삭제여부
    private String         delDt;                                  // 삭제일자
    private String         delTm;                                  // 삭제시간
    private String         deltEmpno;                              // 삭제사원번호
    private String         hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}