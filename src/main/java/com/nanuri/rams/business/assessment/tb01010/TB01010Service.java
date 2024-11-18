package com.nanuri.rams.business.assessment.tb01010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB01010SVO.inqueryParameters;

@Service
public interface TB01010Service {

	List<IBIMS103BVO> selectCnfStts(IBIMS103BVO param);

	List<IBIMS103BVO> selectCnfRslt(IBIMS103BVO param);
	
	List<IBIMS103BVO> selectSttsInvsAstsBfSgnf(IBIMS103BVO param);
	
	List<IBIMS103BVO> selectSttsInvsAstsAfSgnf(IBIMS103BVO param);
	
	List<Map<String, Object>> getTable5(inqueryParameters param);
	
}
