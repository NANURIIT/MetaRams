package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS105BDTO;

import lombok.Getter;

@Getter
/*
 * 딜심사기초자산내역 table(IBIMS105BDTO) VO
 */
public class IBIMS105BVO extends IBIMS105BDTO {
	
	String bssAsstKndCdNm;
	String invstCrryCdNm;
}