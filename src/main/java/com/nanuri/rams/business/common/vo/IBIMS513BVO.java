package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS513BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자사후대주단내역 Table.IBIMS513B VO
수익자정보
*/
public class IBIMS513BVO extends IBIMS513BDTO{
	private String ibStlnNm;                                // 투자금융대주구분코드명
}
