package com.nanuri.rams.business.assessment.tb06.tb06020;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;

@Service
public interface TB06020Service {

	// 대출계약 승인정보관리 조회
	TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam);

	// 종목정보 등록
	int regPrdtCd(IBIMS201BVO param);
	
	// 종목정보 삭제
	int deletePrdtCd(IBIMS201BVO param);

}
