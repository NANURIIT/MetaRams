package com.nanuri.rams.business.assessment.tb06.tb06017;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB06013PVO;

@Service
public interface TB06017Service {

	List<TB06013PVO> getMrtgInfo(TB06013PVO searchParam);
	
	public TB06013PVO mrtgInfoDetails(TB06013PVO searchParam);

	int connectMtrt(TB06013PVO searchParam);
}
