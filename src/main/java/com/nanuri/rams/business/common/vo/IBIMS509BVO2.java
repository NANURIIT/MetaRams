package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS509BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 채권보전주요약정 Table.IBIMS509B VO 2
 */
public class IBIMS509BVO2 extends IBIMS509BDTO{
	private String dealNo;
	private String mode;
	private List<IBIMS509BVO> s509vo;
}
