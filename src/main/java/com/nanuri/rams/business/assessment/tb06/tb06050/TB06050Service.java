package com.nanuri.rams.business.assessment.tb06.tb06050;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS206BVO;

@Service
public interface TB06050Service {

	public List<IBIMS206BVO> getSPPIData(IBIMS206BVO param);

	public int insertSPPIData(IBIMS206BVO param);

	public int updateSPPIData(IBIMS206BVO param);

	public int deleteSPPIData(IBIMS206BVO param);
}
