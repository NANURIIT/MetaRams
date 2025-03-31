package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS902BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS902BVO extends IBIMS902BDTO{
	
	private String fromDate;
	private String toDate;
	private String dprtCd;
	private String asstMngmAcno;
	
}
