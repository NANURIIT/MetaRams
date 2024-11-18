package com.nanuri.rams.business.assessment.tb07.tb07010;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07010SVO;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;

@Service
public interface TB07010Service {

	//public String getDealMngNo();
	public IBIMS401BVO getDetailInfo(IBIMS401BVO paramData);

	// 대출계약 실행
	public int saveExcInfo(TB07010SVO paramData);

	// 이자 조회
	public CalculationResultDTO inqIntr(CalculationDTO input);
}
