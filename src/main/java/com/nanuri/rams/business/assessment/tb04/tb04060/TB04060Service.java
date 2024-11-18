package com.nanuri.rams.business.assessment.tb04.tb04060;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS201BVO;

@Service
public interface TB04060Service {

	// 사업명세조회
	public List<IBIMS201BVO> checkDealSearch(IBIMS201BVO assignInfo);

}
