package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS511BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자사업참가자내역 Table.IBIMS511B VO 2
*/
public class IBIMS511BVO2 extends IBIMS511BDTO{
	private String dealNo;
	private List<IBIMS511BVO> s511vo;

	private String mode;
}
