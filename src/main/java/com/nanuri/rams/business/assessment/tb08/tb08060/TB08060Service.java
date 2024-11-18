package com.nanuri.rams.business.assessment.tb08.tb08060;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS820BDTO;
import com.nanuri.rams.business.common.vo.TB08060SVO;

@Service
public interface TB08060Service {
    
    //월말결산 조회
    public List<TB08060SVO> getSettlementList(TB08060SVO param);

    //월말결산 업데이트
    public int saveSettlement(List<IBIMS820BDTO> paramList);
}
