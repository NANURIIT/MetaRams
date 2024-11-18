package com.nanuri.rams.business.assessment.tb06.tb06011;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

@Service
public interface TB06011Service {

	// 상품코드 리스트 조회
	List<IBIMS201BVO> getPrdtCdList(IBIMS201BDTO searchParam);

}
