package com.nanuri.rams.business.assessment.tb10.tb10710;

import com.nanuri.rams.business.common.vo.IBIMS981BVO;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TB10710Service {
	
	public List<IBIMS981BVO> selectIBIMS981B(IBIMS981BVO param);

}
