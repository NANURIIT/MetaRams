package com.nanuri.rams.business.assessment.tb09.tb09010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS604BVO;

/**
 * MO44020Service
 */
@Service
public interface TB09010Service {

    public List<IBIMS604BVO.DealInfo> checkDealSearch(IBIMS604BVO.SearchVO searchVO);

    public int saveDealExmnt(IBIMS604BVO.ExmntInfo exmntInfo, Map<String, Object> userAuth);

}