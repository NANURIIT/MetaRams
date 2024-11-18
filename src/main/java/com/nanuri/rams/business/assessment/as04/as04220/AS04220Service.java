package com.nanuri.rams.business.assessment.as04.as04220;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;

@Service
public interface AS04220Service {

	List<DealInfo> getDealInfoByEno(SearchVO paramData);

	int confirmFile(RAA23BDTO param);

	int updateAprvOpstnCcd(RAA23BDTO param);

}
