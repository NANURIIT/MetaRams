package com.nanuri.rams.business.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/*
 * 본부점목록 Table.RAA98B DTO
 * */
public class RAA98ADTO {
	private String dprtCd;						// 부점코드
	private String dprtNm;						// 부점명
	private String hdqtCd;						// 본부코드
	private String hdqtNm;						// 본부명
}
