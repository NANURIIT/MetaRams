package com.nanuri.rams.business.assessment.tb08.tb08031;



import com.nanuri.rams.business.common.dto.IBIMS508BDTO;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface TB08031Service {
	
	// 투자자산사업기본 조회
	IBIMS501BVO getBusiBssInfo(IBIMS501BVO param);
	
	// 투자자산사업기본 등록
	int saveDealInfo(IBIMS501BVO param);
	
	// 사업참가자정보 저장
	int saveBsnsPartInfo(IBIMS511BVO2 param);
	
	// 사업주요일정 저장
	int saveBsnsForecast(IBIMS514BVO2 param);
	
	// 채권보전주요약정 저장
	int saveBondProtInfo(IBIMS509BVO2 param);
	
	// 조건변경이력 저장
	int saveCchInfo(IBIMS510BVO2 param);
	
	// 대주단정보 저장
	int saveStlnInfo(IBIMS513BVO2 param);

	// 수익자정보 저장
	int saveErnInfo(IBIMS513BVO2 param);

	// 관련사업정보 저장
	int saveReltBusiInfo(IBIMS508BVO2 param);

	// 편입자산정보 저장
	int saveAdmsAsstInfo(IBIMS512BVO2 param);

	// 투자기업정보 저장
	int saveInvstEprzInfo(IBIMS518BVO2 param);

	// 자산운용사정보
    int saveAsstOrtnInfo(IBIMS515BVO2 param);
}