package com.nanuri.rams.business.assessment.tb06.tb06060;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

@Service
public interface TB06060Service {
	// 워크플로우종목정보 조회
	public List<IBIMS101BVO> getWorkflowInfoList(IBIMS101BVO param);

	public IBIMS111BVO getWorkflowDetail(IBIMS111BVO param);
}