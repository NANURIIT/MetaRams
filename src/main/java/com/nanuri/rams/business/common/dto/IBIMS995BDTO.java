package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 배치JOB MASTER Table.IBIMS995B DTO
*/
public class IBIMS995BDTO {
    private String         jobId;                                  // JOB ID
    private String         jobName;                                // JOB NAME
    private String         jobType;                                // JOB TYPE SOURCE TYPE 을 나타냄(1 : DUMMY, 2 : COMMAND)
    private String         objectName;                             // SOURCE FULL NAME
    private String         argument;                               // ARGUMENT 프로그램에 전달될 ARGUMENT
    private String         confirmYn;                              // CONFIRM_YN CONFIRM 작업 유무 DEFAULT 'N'
    private String         jobRunTypeDcd;                          // 작업실행방법구분코드
    private String         jobRunStrtTime;                         // JOB 시작조건시각
    private String         description;                            // 작업 설명
    private String         registerDay;                            // 최초 등록일
    private String         lastUpdateDay;                          // 최종 수정일
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
    
}