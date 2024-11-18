package com.nanuri.rams.business.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/*
 * 리포트지정사용자정보 Table.RAB02B DTO
 * */
public class RAB02BDTO extends CommonDTO{
	
	private String repDsgnUsrNo;	// 리포트지정사용자번호
	private String repNo;			// 리포트번호
	private String dprtCd;			// 부점코드
	//private String rgstDt;			// 들록일자
	//private Date hndlDyTm;			// 처리일시
	//private String hndlDprtCd;		// 처리부점코드
	//private String hndlPEno;		// 처리자사번
	private String dltF;			// 삭제여부

}
