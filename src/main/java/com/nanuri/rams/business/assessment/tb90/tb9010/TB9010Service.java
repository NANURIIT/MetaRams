package com.nanuri.rams.business.assessment.tb90.tb9010;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

@Service
public interface TB9010Service {
    
    public String insert(IBIMS997BDTO param);
    // public int select(@RequestBody int data);
    // public int delete(@RequestBody int data);
    
}
