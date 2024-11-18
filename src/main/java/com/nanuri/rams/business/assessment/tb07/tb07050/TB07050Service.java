package com.nanuri.rams.business.assessment.tb07.tb07050;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.TB06040SVO;
import com.nanuri.rams.business.common.vo.TB07050SVO;

@Service
public interface TB07050Service {
    // 원리금 스케줄관리 조회
    public TB06040SVO getPrnaRdmpSch(IBIMS403BDTO input);

    // 원리금 스케줄관리 실행
    public int savePrnaRdmpSch(TB07050SVO input);

    // 원리금 스케줄관리 실행일련번호 조회
    public List<Map<String, Object>> srchExcSn(IBIMS403BDTO input);
}