package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RAC06BDTO {
    /* 공동영업관리자/협업부서 정보 */
	private String dealMngNo;             // DEAL관리번호
	private int sq;                   	  // 일련번호
	private String dprtCd;				  // 부점코드
	private String bsnssMngPEno;		  // 영업관리자사번
	private double cntrt;            	  // 공헌도
	private String rgstDt;            	  // 등록일자
	private String dltF;				  // 삭제여부

}
