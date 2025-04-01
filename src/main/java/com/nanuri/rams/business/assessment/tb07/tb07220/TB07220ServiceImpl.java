package com.nanuri.rams.business.assessment.tb07.tb07220;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS900BMapper;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07220ServiceImpl implements TB07220Service {

	private final IBIMS900BMapper ibims900bMapper;

	@Override
	public List<IBIMS900BVO> selectBalanceInfoList(IBIMS900BVO param){
		log.debug("dfdd");
		return ibims900bMapper.selectBalanceInfoList(param);
	}

}