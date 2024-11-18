package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS601BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class IBIMS601BVO extends IBIMS601BDTO{
	private String         inspctYm;   	 // 점검기준년월
    private String         inspctRmrk;   // 점검결과
    
    List<IBIMS603BDTO>		lstInspctRmrk; // 기타사후관리
    List<IBIMS611BVO>		ibims611bdto; // 월별공사 및 분양현황
    
}