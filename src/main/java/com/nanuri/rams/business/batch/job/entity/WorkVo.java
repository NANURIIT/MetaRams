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

public class WorkVo {

	@Id
	@Column(name = "STDR_DT", length = 8, nullable = false, columnDefinition = "varchar(8) NOT NULL COMMENT '기준일자'")
	private String stdrDt;

	@Column(name = "JOB_OPNG_DTIME", length = 12, nullable = true, columnDefinition = "timestamp(6) COMMENT '업무개시일시'")
	private Timestamp jobOpngDtime;

	@Column(name = "JOB_CLSG_DTIME", length = 12, nullable = true, columnDefinition = "timestamp(6) COMMENT '업무마감일시'")
	private Timestamp jobClsgDtime;

	@Column(name = "CLSG_DVSN_CD", length = 2, nullable = true, columnDefinition = "varchar(2) COMMENT '마감구분코드'")
	private String clsgDvsnCd;

	@Column(name = "OPNG_STFNO", length = 7, nullable = true, columnDefinition = "varchar(7) COMMENT '개시직원번호'")
	private String opngStfno;

	@Column(name = "OPNG_ORGNO", length = 5, nullable = true, columnDefinition = "varchar(5) COMMENT '개시조직번호'")
	private String opngOrgno;

	@Column(name = "HDWR_OPNG_YN", length = 1, nullable = true, columnDefinition = "varchar(1) COMMENT DEFAULT 'N' '수기개시여부'")
	private String hdwrOpngYn;

	@Column(name = "CLSG_STFNO", length = 7, nullable = true, columnDefinition = "varchar(7) COMMENT '마감직원번호'")
	private String clsgStfno;

	@Column(name = "CLSG_ORGNO", length = 5, nullable = true, columnDefinition = "varchar(5) COMMENT '마감조직번호'")
	private String clsgOrgno;

	@Column(name = "HDWR_CLSG_YN", length = 1, nullable = true, columnDefinition = "varchar(1) COMMENT '수기마감여부'")
	private String hdwrClsgYn;

	@Column(name = "HND_DETL_DTM", length = 12, nullable = true, columnDefinition = "timestamp(6) NOT NULL DEFAULT SYSDATE COMMENT '조작상세일시'")
	private Timestamp hndDetlDtm;

	@Column(name = "HND_EMPNO", length = 7, nullable = true, columnDefinition = "varchar(7) COMMENT '조작사원번호'")
	private String hndEmpNo;

	@Column(name = "HND_TMNL_NO", length = 8, nullable = true, columnDefinition = "varchar(8) COMMENT '조작단말기번호'")
	private String hndTmnlNo;

	@Column(name = "HND_TR_ID", length = 10, nullable = true, columnDefinition = "varchar(10) COMMENT '조작거래ID'")
	private String hndTrId;

	@Column(name = "GUID", length = 29, nullable = true, columnDefinition = "varchar(29) COMMENT 'GUID'")
	private String guid;

	public WorkVo(String stdrDt, Timestamp jobOpngDtime, Timestamp jobClsgDtime, String clsgDvsnCd, String opngStfno,
			String opngOrgno, String hdwrOpngYn, String clsgStfno, String clsgOrgno, String hdwrClsgYn,
			Timestamp hndDetlDtm, String hndEmpNo, String hndTmnlNo, String hndTrId, String guid) {
		this.stdrDt = stdrDt;
		this.jobOpngDtime = jobOpngDtime;
		this.jobClsgDtime = jobClsgDtime;
		this.clsgDvsnCd = clsgDvsnCd;
		this.opngStfno = opngStfno;
		this.opngOrgno = opngOrgno;
		this.hdwrOpngYn = hdwrOpngYn;
		this.clsgStfno = clsgStfno;
		this.clsgOrgno = clsgOrgno;
		this.hdwrClsgYn = hdwrClsgYn;
		this.hndDetlDtm = hndDetlDtm;
		this.hndEmpNo = hndEmpNo;
		this.hndTmnlNo = hndTmnlNo;
		this.hndTrId = hndTrId;
		this.guid = guid;
	}

	public static WorkVo of(String stdrDt, Timestamp jobOpngDtime, Timestamp jobClsgDtime, String clsgDvsnCd,
			String opngStfno, String opngOrgno, String hdwrOpngYn, String clsgStfno, String clsgOrgno,
			String hdwrClsgYn, Timestamp hndDetlDtm, String hndEmpNo, String hndTmnlNo, String hndTrId, String guid) {
		return new WorkVo(stdrDt, jobOpngDtime, jobClsgDtime, clsgDvsnCd, opngStfno, opngOrgno, hdwrOpngYn, clsgStfno,
				clsgOrgno, hdwrClsgYn, hndDetlDtm, hndEmpNo, hndTmnlNo, hndTrId, guid);
	}

}