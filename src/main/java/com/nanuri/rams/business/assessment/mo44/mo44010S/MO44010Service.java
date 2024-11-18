package com.nanuri.rams.business.assessment.mo44.mo44010S;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.MO44010SVO;

/**
 * MO44020Service
 */
@Service
public interface MO44010Service {

    public List<MO44010SVO.DealInfo> checkDealSearch(MO44010SVO.SearchVO searchVO);

	public int saveDealExmnt(MO44010SVO.ExmntInfo exmntInfo, Map<String, Object> userAuth);
}