package com.nanuri.rams.business.assessment.as04.as04310;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.AS04310SVO.DealInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.SearchVO;

@Service
public interface AS04310Service {

	List<DealInfo> searchDeals(SearchVO paramData);

}
