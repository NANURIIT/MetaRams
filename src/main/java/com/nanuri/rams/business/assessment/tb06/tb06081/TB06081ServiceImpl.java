package com.nanuri.rams.business.assessment.tb06.tb06081;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS003BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.TB06080SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06081ServiceImpl implements TB06081Service {

	private final AuthenticationFacade facade;

	private final IBIMS003BMapper ibims003bMapper;
	private final IBIMS231BMapper ibims231bMapper;

	@Override
	public List<IBIMS003BVO> srchApvlList(IBIMS003BVO paramData){

		paramData.setNowEmpno(facade.getDetails().getEno());

		return	ibims003bMapper.srchApvlList(paramData);
	}

	@Override
	public List<IBIMS003BVO> apvlListChk(IBIMS231BDTO paramData) {
		return ibims231bMapper.apvlListChk(paramData);
	}

}
