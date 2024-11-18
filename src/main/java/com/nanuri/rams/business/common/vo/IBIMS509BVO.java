package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS509BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자자산내무약정이행내역 Table.IBIMS509B VO
*/
public class IBIMS509BVO extends IBIMS509BDTO {
	
	private String bondProtNm;		// 채권보전구분
	
}
