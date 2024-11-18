package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS511BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자사업참가자내역 Table.IBIMS511B VO
*/
public class IBIMS511BVO extends IBIMS511BDTO{
	
	private String ptcnRelrDcdNm; 				// 참가자관계구분코드명

}
