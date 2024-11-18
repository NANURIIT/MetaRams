package com.nanuri.rams.business.assessment.tb08.tb08040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS348BDTO;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;

@Service
public interface TB08040Service {

	// 수수료스케줄관리 조회
	public List<IBIMS348BVO> srchFeeSch(IBIMS348BDTO input);

	// 수수료스케줄관리 저장
	public int saveFeeSch(IBIMS348BVO input);
	
}
