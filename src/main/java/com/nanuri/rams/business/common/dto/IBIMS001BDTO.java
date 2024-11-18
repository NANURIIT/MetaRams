package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 공통코드그룹 Table.IBIMS001B DTO
*/
public class IBIMS001BDTO {
    private String         cmnsCdGrp;                              // 공통코드그룹
    private String         cmnsCdNm;                               // 공통코드명
    private String         cmnsCdClsf;                             // 공통코드구분
    private int            cdLngth;                                // 코드길이
    private String         cmnsCdGrpExpl;                          // 공통코드그룹설명
    private String         rgstDt;                          	   // 등록일자
    private String         rgstEmpno;                          	   // 등록사원번호
    private String         useYn;                                  // 사용여부
    private String         delYn;                                  // 삭제여부
    private String         trnsfrmAftCdGrp;                        // 변환후코드그룹
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
    
}