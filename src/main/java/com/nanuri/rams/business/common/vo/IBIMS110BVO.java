package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS110BDTO;

import lombok.Getter;

@Getter
/*
 * 딜심사책임준공내역 table(IBIMS110BDTO) VO
 */
public class IBIMS110BVO extends IBIMS110BDTO {
	String rspsbCmplOgnDcdNm;
	String dbtNnfDutyDcdNm;
}