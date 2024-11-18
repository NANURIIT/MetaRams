package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
/*
 사원기본 Table.IBIMS003B VO
 */
public class IBIMS003BVO extends IBIMS003BDTO {
	
	private String usrDcdNm;
	private String athCdNm;
	private String delEmpNm;
	private String rgstEmpNm;
	private String hndEmpNm;
	
}