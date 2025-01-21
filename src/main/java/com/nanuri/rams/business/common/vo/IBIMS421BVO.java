package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 *  출자금 거래등록
 */
public class IBIMS421BVO extends IBIMS421BDTO {
	private String hndDetlDtmStr; 				/* 조작상세일시 */
}
