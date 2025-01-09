package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS002BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 공통코드 VO
 */
public class IBIMS002BVO extends IBIMS002BDTO {
	
	private String         rgstEmpnm;         // 등록사원명
	private String         hndEmpnm;          // 조작사원명
	
	private String 		   oldCdVlId;		  // 코드값ID
    private List<String>   cdVlIds = new ArrayList<>();

	private List<IBIMS002BDTO> insertList;
	private List<IBIMS002BDTO> updateList;
	
}