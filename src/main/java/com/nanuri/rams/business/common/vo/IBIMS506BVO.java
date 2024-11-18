package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS506BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
PEF사업기본 Table.IBIMS506B VO
*/
public class IBIMS506BVO extends IBIMS506BDTO {
	
	private String chrgEmpnm;		// 담당자명
}
