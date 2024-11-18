package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 배치JOB 스케줄러 Table.IBIMS997B DTO
*/
public class IBIMS997BDTO {
    private String         curDate;                                // 당일일자
    private String         jobId;                                  // JOB ID
    private String         jobName;                                // JOB NAME
    private String         jobType;                                // JOB TYPE SOURCE TYPE 을 나타냄(1 : DUMMY, 2 : COMMAND)
    private String         objectName;                             // SOURCE FULL NAME
    private String         argument;                               // ARGUMENT 프로그램에 전달될 ARGUMENT
    private int            preJobCount;                            // 선행JOB건수 업무프로그램에 전달될 선행JOB 건수
    private int            confirmJobCount;                        // CONFIRM JOB 건수 업무프로그램에 전달될 CONFIRM JOB 건수
    private int            childPid;                               // 프로그램 PID CHILD프로세스 즉 업무프로그램의 PID
    private int            runCount;                               // 실행횟수 프로그램이 수행된 횟수
    private String         firstStartTime;                         // 최초 시작시간
    private String         startTime;                              // 시작시간
    private String         endTime;                                // 종료시간
    private String         jobStatus;                              // 작업상태
    private Date           hndDetlDtm;                             // 조작상세일시
    private String         hndEmpno;                               // 조작사원번호
    private String         hndTmnlNo;                              // 조작단말기번호
    private String         hndTrId;                                // 조작거래ID
    private String         guid;                                   // GUID
}