package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS108BDTO;

import lombok.Getter;

@Getter
/*
 * 딜심사내부등급내역 table(IBIMS108BDTO) VO
 */
public class IBIMS108BVO extends IBIMS108BDTO {
	String mrtgKndDcdNm;
	String mrtgDtlsDcdNm;
	String rgtRnkDcdNm;
	String mrtgAcqstStmDcdNm;
	String mrtgAcqstDtlsDcdNm;
	String invstCrryCdNm; 
}