package com.nanuri.rams.business.common.vo;

import java.util.List;

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
	private String assnYn;
	private List<IBIMS902BDTO> lst902bdto;
	private String spcNm;
	private String isttNm;
	private String rndrNm;
	private String spcItemKndNm;
	private String rcveP;
	private String dprtNm;
	private String rmCtns;
	private String isttNmAsstMngmAcno;
}
