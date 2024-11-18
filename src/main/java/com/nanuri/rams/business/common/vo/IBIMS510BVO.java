package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS510BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자자산조건변경내역 Table.IBIMS510B VO
*/
public class IBIMS510BVO extends IBIMS510BDTO{
	private String prcsrEmpnm;		// 처리자명
}
