package com.nanuri.rams.business.assessment.tb03.tb03040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

@Service
public interface TB03040Service {
	
	// DEAL(사업)명세조회  
	public List<IBIMS101BVO> ibSpecSearch(IBIMS101BDTO dealInfo);

}
