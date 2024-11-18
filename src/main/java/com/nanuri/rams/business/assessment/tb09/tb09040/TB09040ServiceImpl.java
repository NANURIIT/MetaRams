package com.nanuri.rams.business.assessment.tb09.tb09040;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.vo.TB09040SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB09040ServiceImpl implements TB09040Service {

	private final IBIMS103BMapper ibims103bMapper;
	
	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<TB09040SVO> getDealInfo(TB09040SVO param) {
		// TODO Auto-generated method stub
		return null;
	}
}
