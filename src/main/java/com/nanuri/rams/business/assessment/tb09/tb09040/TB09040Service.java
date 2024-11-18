package com.nanuri.rams.business.assessment.tb09.tb09040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB09040SVO;

@Service
public interface TB09040Service {
	public List<TB09040SVO> getDealInfo(TB09040SVO param);
}