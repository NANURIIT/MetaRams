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
 * 리포트지정부서정보 Table.RAB03B DTO
 * */
public class RAB03BDTO extends CommonDTO{
	
	private String repDsgnDeptNo;	// 리포트지정부서번호
	private String repNo;			// 리포트번호
	//private String dltF;			// 삭제여부

}
