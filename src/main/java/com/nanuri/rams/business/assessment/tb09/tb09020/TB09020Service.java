package com.nanuri.rams.business.assessment.tb09.tb09020;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS605BVO;

/**
 * MO44020Service
 */
@Service
public interface TB09020Service {

    // 승인조건 정보 조회
    public List<IBIMS605BVO> getPacmList(HashMap<String, Object> params);

    // 이행계획 저장
    public int save(HashMap<String, Object> params);

    // 진행상태 변경
    public int updateRprStatus(HashMap<String, String> paramData);

}