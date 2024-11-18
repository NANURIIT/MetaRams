package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 기타사후관리 Table.IBIMS603B DTO
*/
public class IBIMS603BDTO {
    private String         dealNo;                                          // 
    private String         inspctDt;                                        // 
    private String         inspctRmrk;                                      // 
    private String         rmrk;                                            // 
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
}