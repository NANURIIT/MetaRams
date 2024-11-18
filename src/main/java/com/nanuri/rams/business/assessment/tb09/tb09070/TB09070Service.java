package com.nanuri.rams.business.assessment.tb09.tb09070;

import java.util.List;

import org.springframework.stereotype.Service;
import com.nanuri.rams.business.common.vo.TB09070SVO;

@Service
public interface TB09070Service {
    
    //상환대상내역 조회
    public List<TB09070SVO.RdmpTrgtDtlsVO> rdmpTrgtDtlsInq(TB09070SVO param);
} 
