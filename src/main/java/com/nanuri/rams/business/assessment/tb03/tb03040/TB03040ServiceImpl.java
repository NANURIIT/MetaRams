package com.nanuri.rams.business.assessment.tb03.tb03040;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS101BMapper;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB03040ServiceImpl implements TB03040Service {

	private final IBIMS101BMapper ibims101BMapper;

	// DEAL(사업)정보조회
	@Override
	public List<IBIMS101BVO> ibSpecSearch(IBIMS101BDTO dealInfo) {
		return ibims101BMapper.ibSpecSearch(dealInfo);
	} 
}
