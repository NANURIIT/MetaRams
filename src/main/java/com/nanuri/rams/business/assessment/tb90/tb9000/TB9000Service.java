package com.nanuri.rams.business.assessment.tb90.tb9000;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

@Service
public interface TB9000Service {

    // public int select(@RequestBody int data);
    // public int deleteIBIMS810B(String data);
    public int insertIBIMS810B(IBIMS997BDTO param);
    
}
