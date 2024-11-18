package com.nanuri.rams.business.common.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 권한별메뉴화면사용권한설정 Table.IBIMS006B DTO
*/
public class IBIMS006BDTO {

    private String         athCd;                                  // 권한코드
    private String         athCdNm;                                // 권한코드명
    private String         athCdExpl;                              // 권한코드설명
    private String         athDcd;                                 // 권한구분코드
    private String         aplyYn;                                 // 적용여부
    private String         rgstDt;                                 // 등록일자
    private String         rgstTm;                                 // 등록시간
    private String         rgstEmpno;                              // 등록사원번호
    private String         delYn;                                  // 삭제여부
    private String         delDt;                                  // 삭제일자
    private String         delTm;                                  // 삭제시간
    private String         delEmpno;                               // 삭제사원번호
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID

}