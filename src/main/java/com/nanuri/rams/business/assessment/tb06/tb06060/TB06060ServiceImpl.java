package com.nanuri.rams.business.assessment.tb06.tb06060;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS101BMapper;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import com.nanuri.rams.business.common.mapper.IBIMS111BMapper;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB06060ServiceImpl implements TB06060Service {
	
	@Autowired
	private final IBIMS101BMapper ibims101BMapper;
	private final IBIMS111BMapper ibims111BMapper;


	@Override
	public List<IBIMS101BVO> getWorkflowInfoList(IBIMS101BVO param) {
		
			return ibims101BMapper.getWorkflowInfoList(param);
	}

	@Override
	public IBIMS111BVO getWorkflowDetail(IBIMS111BVO param){
		return ibims111BMapper.getWorkflowDetail(param);
	}
}