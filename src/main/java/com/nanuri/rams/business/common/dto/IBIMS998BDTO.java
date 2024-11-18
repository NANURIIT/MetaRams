package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 마감기본 Table.IBIMS998B DTO
*/
public class IBIMS998BDTO {
	private String         stdrDt;              // 기준일자
	private Date           jobOpngDtime;        // 업무개시일시
	private Date           jobClsgDtime;        // 업무마감일시
	private String         clsgDvsnCd;          // 마감구분코드
	private String         opngStfno;           // 개시직원번호
	private String         opngOrgno;           // 개시조직번호
	private String         hdwrOpngYn;          // 수기개시여부
	private String         clsgStfno;           // 마감직원번호
	private String         clsgOrgno;           // 마감조직번호
	private String         hdwrClsgYn;          // 수기마감여부
	private Date           hndDetlDtm;          // 조작상세일시
	private String         hndEmpno;            // 조작사원번호
	private String         hndTmnlNo;           // 조작단말기번호
	private String         hndTrId;             // 조작거래ID
	private String         guid;                // GUID
}