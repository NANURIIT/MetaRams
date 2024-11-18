package com.nanuri.rams.business.assessment.tb06.tb06016;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS204BDTO;
import com.nanuri.rams.business.common.vo.IBIMS204BVO;

public interface TB06016Service {
    
    public List<IBIMS204BDTO> selectIBIMS204B(IBIMS204BDTO data);

    public int insertIBIMS204B(IBIMS204BVO data);

    public int updateIBIMS204B(IBIMS204BVO data);
   
    public int deleteIBIMS204B(IBIMS204BVO data);
    
}
