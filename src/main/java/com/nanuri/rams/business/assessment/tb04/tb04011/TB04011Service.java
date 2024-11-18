package com.nanuri.rams.business.assessment.tb04.tb04011;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;

@Service
public interface TB04011Service {

	// 안건목록조회
	public List<IBIMS103BVO> getDealInfo(IBIMS103BVO paramData);

}
