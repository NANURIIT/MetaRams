package com.nanuri.rams.business.assessment.as03.as03010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealDetails;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03010SVO;

@Service
public interface AS03010Service {

	// 심사안건조회
	public List<checkDealDetails> checkDealSearch(checkDealInfo dealDto);

	// 심사안건 반송
	public Map<String, Object> returnDeal(AS03010SVO param);

	// 심사안건 접수
	public Map<String, Object> receiptDeal(AS03010SVO param);
	
}
