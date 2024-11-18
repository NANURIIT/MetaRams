package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 배치JOB 선행JOB관리 Table.IBIMS996B DTO
*/
public class IBIMS996BDTO {
    private String         PreJobId;                               // 선행 JOB ID
    private String         PreJobName;                             // 선행JOB NAME
    private String         jobId;                                  // JOB ID
    private String         jobName;                                // JOB NAME
    private String         description;                            // 작업 설명
    private String         registerDay;                            // 최초 등록일
    private String         lastUpdateDay;                          // 최종 수정일
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}