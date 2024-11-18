package com.nanuri.rams.business.assessment.tb09.tb09100;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB09100ServiceImpl implements TB09100Service {

	private final IBIMS201BMapper ibims201bMapper;
	private final IBIMS410BMapper ibims410bMapper;
	
	@Override
	public List<IBIMS201BVO> selectDealExposure(IBIMS201BVO searchVO) {

		return ibims201bMapper.selectDealExposure(searchVO);
	}
	
	@Override
	public List<IBIMS410BVO> selectFeeIntTrList(IBIMS410BDTO searchVO) {
		return ibims410bMapper.selectFeeIntTrList(searchVO);
	}


}
