package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS209BDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 * IB승인조건연결기본 - 대출채권/채무보증 정보(TB06010S) - 셀다운승인조건 Table.IBIMS209B VO
 */
public class IBIMS209BVO extends IBIMS209BDTO {
	private String mtrDcd;
	private String jdgmDcd;
}