package com.nanuri.rams.business.assessment.tb09.tb09100;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS604BVO;


@Service
public interface TB09100Service {

	public List<IBIMS201BVO> selectDealExposure(IBIMS201BVO searchVO);
	public List<IBIMS410BVO> selectFeeIntTrList(IBIMS410BDTO searchVO);
	
}
