package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS205BDTO;

import lombok.Getter;

@Getter
/*
 * 딜심사기초자산내역 table(IBIMS205BDTO) VO
 */
public class IBIMS205BVO extends IBIMS205BDTO {
	
	private String bssAsstKndCdNm; 
	private String invstCrryCdNm;
	
}