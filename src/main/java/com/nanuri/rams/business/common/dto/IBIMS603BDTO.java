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

    private String         dealNo;                                          // 딜번호
    private String         inspctDt;                                        // 점검일자
    private String         inspctRmrk;                                      // 점검결과
    private String         rmrk;                                            // 비고
    private Date           hndDetlDtm;                                      // 조작상세일시
    private String         hndEmpno;                                        // 조작사원번호
    private String         hndTmnlNo;                                       // 조작단말기번호
    private String         hndTrId;                                         // 조작거래id
    private String         guid;                                            // guid
    

    @Override
    public String toString() {
        return "IBIMS603BDTO{" +
               "dealNo='" + dealNo + '\'' +
               ", inspctDt='" + inspctDt + '\'' +
               ", inspctRmrk='" + inspctRmrk + '\'' +
               ", Rmrk='" + rmrk + '\'' +
               ", hndEmpno='" + hndEmpno + '\'' +
               '}';
    }
}