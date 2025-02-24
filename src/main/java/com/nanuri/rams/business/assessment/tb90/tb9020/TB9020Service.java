package com.nanuri.rams.business.assessment.tb90.tb9020;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

@Service
public interface TB9020Service {
    
    public String insert(IBIMS997BDTO param);
    
}
