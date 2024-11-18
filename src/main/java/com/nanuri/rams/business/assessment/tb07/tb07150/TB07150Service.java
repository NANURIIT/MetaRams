package com.nanuri.rams.business.assessment.tb07.tb07150;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07010SVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;

@Service
public interface TB07150Service {

	//public TB07150SVO getChngBfInfo(TB07150SVO paramData);

	public TB07150SVO getCndChngLdgInf(TB07150SVO paramData);

	public int cndChng(TB07150SVO param);

}
