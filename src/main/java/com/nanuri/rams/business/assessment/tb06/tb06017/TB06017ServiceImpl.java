package com.nanuri.rams.business.assessment.tb06.tb06017;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.mapper.IBIMS211BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS212BMapper;
import com.nanuri.rams.business.common.vo.TB06013PVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TB06017ServiceImpl implements TB06017Service {
	
	private final IBIMS211BMapper ibims211bMapper;
	private final IBIMS212BMapper ibims212bMapper;
	
	private final AuthenticationFacade facade;

	@Override
	public List<TB06013PVO> getMrtgInfo(TB06013PVO searchParam) {
		return ibims211bMapper.getMrtgInfo(searchParam);
	}
	
	@Override
	public TB06013PVO mrtgInfoDetails(TB06013PVO searchParam) {
		return ibims211bMapper.mrtgInfoDetails(searchParam);
	}

	@Override
	public int connectMtrt(TB06013PVO searchParam) {
		return ibims212bMapper.insertIBIMS212B(searchParam);
	}


}
