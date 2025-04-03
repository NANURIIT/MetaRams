package com.nanuri.rams.business.assessment.tb07.tb07230;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS902BMapper;
import com.nanuri.rams.business.common.vo.IBIMS902BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07230ServiceImpl implements TB07230Service {

	private final IBIMS902BMapper ibims902bMapper;

	@Override
	public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param){
		return ibims902bMapper.selectTB07230S(param);
	}

	@Override
	public int saveTB07230S(IBIMS902BVO param) {
		return ibims902bMapper.saveTB07230S(param);
	}

}