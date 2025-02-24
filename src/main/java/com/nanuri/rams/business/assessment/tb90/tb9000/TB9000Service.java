package com.nanuri.rams.business.assessment.tb90.tb9000;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

@Service
public interface TB9000Service {

    public String insertIBIMS810B(IBIMS997BDTO param);
    
}
