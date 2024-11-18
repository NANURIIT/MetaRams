package com.nanuri.rams.business.assessment.tb04.tb04040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS224BDTO;
import com.nanuri.rams.business.common.vo.IBIMS224BVO;

@Service
public interface TB04040Service {
	
	// LOI/LOC 발급내역 조회
	public List<IBIMS224BVO> getLoiIssDtls(IBIMS224BVO param);
}
