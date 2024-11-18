package com.nanuri.rams.business.assessment.tb07.tb07070;

import java.util.List;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.dto.TB06040SDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.TB07070SVO;

@Service
public interface TB07070Service {

	public int selectAfChkTrsnIBIMS410B(IBIMS410BDTO param); 
	
	public List<IBIMS410BVO> selectRvseTrInq(TB07070SVO paramData);

	int saveTrRvseInq(TB07070SVO paramData);
	
}
