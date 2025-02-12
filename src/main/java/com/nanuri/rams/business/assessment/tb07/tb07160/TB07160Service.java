package com.nanuri.rams.business.assessment.tb07.tb07160;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB07160SVO;

public interface TB07160Service {
    
    public TB07160SVO getTrrcInf(TB07160SVO param);

    public int trrcRgst(TB07160SVO param);

}
