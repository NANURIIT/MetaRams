package com.nanuri.rams.business.assessment.tb07.tb07170;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;

@Service
public interface TB07170Service {
    
    public List<IBIMS430BDTO> getDptrDtlsList(IBIMS430BDTO param);
}
