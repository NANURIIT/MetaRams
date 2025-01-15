package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 당월사업관리의견 Table.IBIMS602B DTO
*/
public class IBIMS602BDTO {
    
    private String         dealNo;                             // 딜번호
    private String         inspctYm;                           // 점검기준년월
    private String         checkRslt;                          // 점검결과
    private Date           hndDetlDtm;                         // 조작상세일시
    private String         hndEmpno;                           // 조작사원번호
    private String         hndTmnlNo;                          // 조작단말기번호
    private String         hndTrId;                            // 조작거래id
    private String         guid;                               // guid

}