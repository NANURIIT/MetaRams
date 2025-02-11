package com.nanuri.rams.business.batch.job.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
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

	@Column(name = "EXEC_FRQC", length = 10, nullable = false, columnDefinition = "varchar(10) COMMENT '실행주기'")
	private String execFrqc;

	@Column(name = "EXEC_TM", length = 5, nullable = false, columnDefinition = "varchar(5) COMMENT '실행시간'")
	private String execTm;

	public BatchMasterVo(String jobId, String jobName, String jobType, String objectName, String argument,
			String confirmYn, String description, String registerDay, String lastUpdateDay, Timestamp hndDetlDtm,
			String hndEmpNo, String hndTmnlNo, String hndTrId, String guid, String execFrqc, String execTm) {
		this.jobId = jobId;
		this.jobName = jobName;
		this.jobType = jobType;
		this.objectName = objectName;
		this.argument = argument;
		this.confirmYn = confirmYn;
		this.description = description;
		this.registerDay = registerDay;
		this.lastUpdateDay = lastUpdateDay;
		this.hndDetlDtm = hndDetlDtm;
		this.hndEmpNo = hndEmpNo;
		this.hndTmnlNo = hndTmnlNo;
		this.hndTrId = hndTrId;
		this.guid = guid;
		this.execFrqc = execFrqc;
		this.execTm = execTm;
	}

	public static BatchMasterVo of(String jobId, String jobName, String jobType, String objectName, String argument,
			String confirmYn, String description, String registerDay, String lastUpdateDay, String hdwrClsgYn, 
			Timestamp hndDetlDtm, String hndEmpNo, String hndTmnlNo, String hndTrId, String guid, String execFrqc,
			String execTm) {
		return new BatchMasterVo(jobId, jobName, jobType, objectName, argument, confirmYn, description, registerDay,
				lastUpdateDay, hndDetlDtm, hndEmpNo, hndTmnlNo, hndTrId, guid, execFrqc, execTm);
	}

}