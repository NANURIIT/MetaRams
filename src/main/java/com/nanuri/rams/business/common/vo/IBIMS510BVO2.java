package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS510BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 조건변경이력 Table.IBIMS510B VO 2
 */
public class IBIMS510BVO2 extends IBIMS510BDTO{
	private String dealNo;
	private List<IBIMS510BVO> s510vo;

	private String mode;
}
