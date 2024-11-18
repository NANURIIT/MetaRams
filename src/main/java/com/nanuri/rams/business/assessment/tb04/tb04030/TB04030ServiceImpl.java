package com.nanuri.rams.business.assessment.tb04.tb04030;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB04030ServiceImpl implements TB04030Service {

	private final IBIMS103BMapper ibims103bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS103BVO> assignmentSearch(TB04020SVO param) {
		return ibims103bMapper.checkDealSearch(param);
	}

}
