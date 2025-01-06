package com.nanuri.rams.business.assessment.tb06.tb06081;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;

@Service
public interface TB06081Service {

	public List<IBIMS003BVO> srchApvlList(IBIMS003BVO paramData);

	public List<IBIMS003BVO> apvlListChk(IBIMS231BDTO paramData);

	public int apvlRqst(IBIMS231BVO paramData);

	public int cancelApvlRqst(IBIMS231BVO paramData);
	
}
