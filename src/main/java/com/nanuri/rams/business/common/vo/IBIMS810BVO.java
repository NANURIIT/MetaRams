package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS810BVO extends IBIMS810BDTO {

    private List<IBIMS810BDTO> ibims810bdtoList;
    private CalculationSumDTO totalDTO;
    
}
