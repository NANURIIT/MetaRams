package com.nanuri.rams.business.assessment.tt30.tt3020;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;


@Service
public interface TT03020Service {
    
    // 조회
    public TEST101BVO getDealInfo(TEST101BDTO test101bdto);

    // 저장(insert)
    public String saveDealInfo(TEST101BDTO test101bdto);
}
