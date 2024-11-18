package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 메뉴별권한화면사용권한설정 Table.IBIMS007B DTO
*/
public class IBIMS007BDTO {

    private String         athCd;                                  // 권한코드
    private int            sq;                                     // 일련번호
    private String         menuId;                                 // 메뉴ID
    private String         mdfyRghtCcd;                            // 수정권한구분코드(1: 조회, 2: 수정가능)
    private String         hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
    
}