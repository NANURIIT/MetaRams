package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS107BDTO;

import lombok.Getter;

@Getter
/*
 * 딜심사내부등급내역 table(IBIMS107BDTO) VO
 */
public class IBIMS107BVO extends IBIMS107BDTO {
	String outsCrdtGrdDcdNm;
	String insCrdtGrdDcdNm;
	String entpHnglNm;
}