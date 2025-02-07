package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS513BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
대주단정보 Table.IBIMS513B VO
*/
public class IBIMS513BVO2 extends IBIMS513BDTO{
	private String dealNo;
	private List<IBIMS513BVO> s513vo;

	String mode;
}
