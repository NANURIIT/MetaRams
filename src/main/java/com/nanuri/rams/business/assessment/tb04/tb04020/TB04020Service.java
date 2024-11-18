package com.nanuri.rams.business.assessment.tb04.tb04020;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;

@Service
public interface TB04020Service {

	// 심사안건조회
	public List<IBIMS103BVO> checkDealSearch(TB04020SVO param);

	// 심사안건 접수
	public int receiptDeal(IBIMS103BDTO param);

	// 심사안건 반송
	public int returnDeal(IBIMS103BDTO param);

}
