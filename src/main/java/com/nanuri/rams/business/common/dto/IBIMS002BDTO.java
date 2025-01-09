package com.nanuri.rams.business.common.dto;

import java.sql.Date;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 공통코드 Table.IBIMS002B DTO
*/
public class IBIMS002BDTO {
    private String         cmnsCdGrp;                              // 공통코드그룹
    private String         cdVlId;                                 // 코드값ID
    private String         cdVlNm;                                 // 코드값명
    private String         rsltCdVl;                               // 변환후코드ID
    private String         rgstDt;                                 // 등록일자
    private String         rgstEmpno;                              // 등록사원번호
    private int            cdSq;                                   // 코드일련번호
    private String         useYn;                                  // 사용여부
    private String         delYn;                                  // 삭제여부
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID

    private String         oldCdVlId;                              // 올코
}