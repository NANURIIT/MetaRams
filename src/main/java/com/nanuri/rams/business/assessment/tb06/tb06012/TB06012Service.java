package com.nanuri.rams.business.assessment.tb06.tb06012;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS208BDTO;

@Service
public interface TB06012Service {
	/* 승인조건삭제 */
	int delAppvCndtList(IBIMS208BDTO delParam);
}
