package com.nanuri.rams.business.assessment.tb08.tb08050;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;

@Service
public interface TB08050Service {

	List<IBIMS420BVO> selectFeeRcivLst(String paramData);
	
	public int saveExcInfo(IBIMS420BVO paramData);
	
}
