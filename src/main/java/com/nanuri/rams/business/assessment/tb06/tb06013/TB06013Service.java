package com.nanuri.rams.business.assessment.tb06.tb06013;

import org.springframework.stereotype.Service;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS213BDTO;
import com.nanuri.rams.business.common.vo.TB06013PVO;

@Service
public interface TB06013Service {

	String registMtrt(TB06013PVO searchParam);

	int modifyMtrt(TB06013PVO searchParam);

	int removeMtrt(TB06013PVO searchParam);

	int disConnectMrtgInfo(TB06013PVO searchParam);	
	
	int connectMrtgInfo(TB06013PVO searchParam);

	public List<IBIMS213BDTO> prfdRankInfo(IBIMS213BDTO dtoParam);
}
