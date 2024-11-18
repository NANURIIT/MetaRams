package com.nanuri.rams.business.assessment.tb06.tb06040;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.TB06040SDTO;
import com.nanuri.rams.business.common.vo.TB06040SVO;

@Service
public interface TB06040Service {

	// 약정 및 해지 정보 조회
	TB06040SVO searchIBInfo(String prdtCd);

	// 약정 및 해지 정보 저장
	int saveCtrcCclcInfo(TB06040SDTO paramData);

}
