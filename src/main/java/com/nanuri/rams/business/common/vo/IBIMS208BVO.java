package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS208BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/* 
IB승인조건내역 - 대출채권/채무보증 정보(TB06010S) - 셀다운승인조건 Table.IBIMS208B VO
*/
public class IBIMS208BVO extends IBIMS208BDTO { 
	private String crryCdNm;
	private String rgstEmpnm;
	private String chngEmpnm;
	private String aplvAmt;
	private String aplvDt;
	private String sdnCndtCtns;
	private String cnsbDcd;
	private String prdtCd;
}