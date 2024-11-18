package com.nanuri.rams.business.assessment.tb06.tb06030;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS250BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;

@Service
public interface TB06030Service {

	// 대출계약 승인정보관리 조회
	TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam);

	// 종목정보 등록
	int regPrdtCd(IBIMS201BVO param);

	// 출자정보 등록
	int registFinc(IBIMS250BDTO param);
	
	// 종목정보 삭제
	int deletePrdtCd(IBIMS201BVO param);
	
}
