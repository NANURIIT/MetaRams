package com.nanuri.rams.business.assessment.tb04.tb04050;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS224BVO;
import com.nanuri.rams.business.common.vo.TB04050SVO;

@Service
public interface TB04050Service {
	
	// LOI/LOC 발급 조회
	public TB04050SVO getLoi(TB04050SVO param);
	
	// LOI/LOC 발급 저장
	public int registLoi(IBIMS224BVO param);
}
