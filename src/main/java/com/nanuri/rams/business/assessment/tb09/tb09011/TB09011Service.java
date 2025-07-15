package com.nanuri.rams.business.assessment.tb09.tb09011;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS751BVO;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Service
public interface TB09011Service {

	public List<IBIMS751BVO> getCrdtGrntFcsList(IBIMS751BVO params);
	
	public List<IBIMS751BVO> getMsgTransList(IBIMS751BVO params);
	
	public List<IBIMS751BVO> getErrDpchTabList(IBIMS751BVO params);
	
	public int saveCrdtGrntFcsList(IBIMS751BVO params);
	
	public int saveMsgTransList(IBIMS751BVO params);
	
	public int saveErrDpchList(IBIMS751BVO params);

}