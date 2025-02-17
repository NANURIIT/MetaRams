package com.nanuri.rams.business.batch.job.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
public class BatchMasterVo {

	@Id
	@Column(name = "JOB_ID", length = 20, nullable = false, columnDefinition = "varchar(20) NOT NULL COMMENT 'JOB_ID'")
	private String jobId;

	@Column(name = "JOB_NAME", length = 40, nullable = false, columnDefinition = "timestamp(40) COMMENT 'JOB_NAME'")
	private String jobName;

	@Column(name = "JOB_TYPE", length = 1, nullable = false, columnDefinition = "timestamp(1) COMMENT 'JOB TYPE  SOURCE TYPE 을 나타냄(1 : DUMMY, 2 : COMMAND)'")
	private String jobType;

	@Column(name = "OBJECT_NAME", length = 60, nullable = false, columnDefinition = "varchar(60) COMMENT 'SOURCE FULL NAME'")
	private String objectName;

	@Column(name = "ARGUMENT", length = 100, nullable = false, columnDefinition = "varchar(100) COMMENT '프로그램에 전달될 ARGUMENT'")
	private String argument;

	@Column(name = "CONFIRM_YN", length = 1, nullable = false, columnDefinition = "varchar(1) COMMENT 'CONFIRM 작업 유무'")
	private String confirmYn;

	@Column(name = "DESCRIPTION", length = 100, nullable = true, columnDefinition = "varchar(100) COMMENT DEFAULT 'N' '작업 설명'")
	private String description;

	@Column(name = "REGISTER_DAY", length = 8, nullable = true, columnDefinition = "varchar(8) COMMENT '최초 등록일'")
	private String registerDay;

	@Column(name = "LAST_UPDATE_DAY", length = 8, nullable = true, columnDefinition = "varchar(8) COMMENT '최종 수정일'")
	private String lastUpdateDay;

	@Column(name = "HND_DETL_DTM", length = 12, nullable = false, columnDefinition = "timestamp(12) NOT NULL DEFAULT SYSDATE COMMENT '조작상세일시'")
	private Timestamp hndDetlDtm;

	@Column(name = "HND_EMPNO", length = 7, nullable = false, columnDefinition = "varchar(7) COMMENT '조작사원번호'")
	private String hndEmpNo;

	@Column(name = "HND_TMNL_NO", length = 8, nullable = true, columnDefinition = "varchar(8) COMMENT '조작단말기번호'")
	private String hndTmnlNo;

	@Column(name = "HND_TR_ID", length = 10, nullable = true, columnDefinition = "varchar(10) COMMENT '조작거래ID'")
	private String hndTrId;

	@Column(name = "GUID", length = 29, nullable = true, columnDefinition = "varchar(29) COMMENT 'GUID'")
	private String guid;

	@Column(name = "JOB_RUN_TYPE_DCD", length = 1, nullable = false, columnDefinition = "varchar(1) COMMENT '작업실행방법구분코드'")
	private String jobRunTypeDcd;

	@Column(name = "JOB_RUN_START_TIME", length = 6, nullable = false, columnDefinition = "varchar(6) COMMENT '실행시간'")
	private String jobRunStartTime;

	private String curDate;			//당일일자
	private int preJobCount;		//선행 JOB 개수
	private int confirmJobCount;	//CONFIRM JOB 개수
	private int childPid;			//CHILD 프로세스 PID
	private int runCount;			//프로그램 수행 횟수
	private String firstStartTime;	//최초 기동시간
	private String startTime;		//현재 작업 시작시간
	private String endTime;			//현재 작업 종료시간
	private String jobStatus;		//작업 상태
	private String batchCmdDcd;		//배치 명령 유형 코드
	
	

}