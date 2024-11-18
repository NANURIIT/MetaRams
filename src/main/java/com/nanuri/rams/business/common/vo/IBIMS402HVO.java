package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402HDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
public class IBIMS402HVO extends IBIMS402HDTO {
	
    private String 		   dealExcRdmpIntr; //상환이자
    private BigDecimal     stdrIntrt;       // 기준금리
    private BigDecimal     addIntrt;        // 가산금리
    private BigDecimal     totIntrt;        // 총금리
    
}
