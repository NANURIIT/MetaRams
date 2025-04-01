package com.nanuri.rams.business.assessment.tb07.tb07220;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS900BVO;

@Service
public interface TB07220Service {

	public List<IBIMS900BVO> selectBalanceInfoList(IBIMS900BVO param);

}
