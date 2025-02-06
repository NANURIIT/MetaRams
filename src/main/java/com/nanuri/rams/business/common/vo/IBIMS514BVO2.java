package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS514BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 사업주요전망 Table.IBIMS514B VO 2
 */
public class IBIMS514BVO2 extends IBIMS514BDTO{
	private String dealNo;
	private List<IBIMS514BVO> s514vo;

	private String mode;
}
