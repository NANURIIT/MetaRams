package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS515BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 자산윤영사정보 Table.IBIMS515B VO 2
 */
public class IBIMS515BVO2 extends IBIMS515BDTO{
	private String dealNo;
	private List<IBIMS515BVO> s515vo;

	private String mode;
}
