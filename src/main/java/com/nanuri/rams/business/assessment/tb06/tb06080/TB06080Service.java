package com.nanuri.rams.business.assessment.tb06.tb06080;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB06080SVO;

@Service
public interface TB06080Service {
	
	// 결재내역 조회
	public TB06080SVO inqTB06080S(TB06080SVO input);

}
