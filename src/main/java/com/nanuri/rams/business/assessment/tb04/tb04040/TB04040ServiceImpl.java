package com.nanuri.rams.business.assessment.tb04.tb04040;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS224BMapper;
import com.nanuri.rams.business.common.vo.IBIMS224BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB04040ServiceImpl implements TB04040Service {

	private final IBIMS224BMapper ibims224BMapper;
	
	/*
	 * @Autowired private AuthenticationFacade facade;
	 */
	
	@Override
	public List<IBIMS224BVO> getLoiIssDtls(IBIMS224BVO param) {
		return ibims224BMapper.getLoiIssDtls(param);
	}
	
	
}
