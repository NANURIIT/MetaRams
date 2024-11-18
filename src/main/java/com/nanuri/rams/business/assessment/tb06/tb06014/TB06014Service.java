package com.nanuri.rams.business.assessment.tb06.tb06014;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS222BVO;

@Service
public interface TB06014Service {

	List<IBIMS222BVO> getBaseAsst(IBIMS222BVO param);

	int rgstAsst(IBIMS222BVO searchParam);

	int mdfAsst(IBIMS222BVO searchParam);
	
}
