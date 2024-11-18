package com.nanuri.rams.business.assessment.pm22.pm22110;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA65BDTO;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA65BMapper;
import com.nanuri.rams.business.common.vo.PM22110SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PM22110ServiceImpl implements PM22110Service {

	// private final PM22110Mapper pm22110Mapper;

	private final RAA02BMapper raa02bMapper;
	private final RAA65BMapper raa65bMapper;

	private final AuthenticationFacade facade;

	// 사후관리 현황보고 조회
	@Override
	public List<PM22110SVO> getAfterMngSttnList(PM22110SVO sttnList) {
		return raa02bMapper.getAfterMngSttnList(sttnList);
	}

	// 사후관리 현황보고 모니터링 사항 저장
	@Override
	public int mergeMntrCntnt(RAA65BDTO inputParam) {
		inputParam.setFstRgstPEno(facade.getDetails().getEno());
		inputParam.setHndlPEno(facade.getDetails().getEno());
		inputParam.setHndlDprtCd(facade.getDetails().getDprtCd());
		return raa65bMapper.mergeMntrCntnt(inputParam);
	}

}
