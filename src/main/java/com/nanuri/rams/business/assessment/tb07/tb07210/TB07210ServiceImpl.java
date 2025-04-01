package com.nanuri.rams.business.assessment.tb07.tb07210;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS900BMapper;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07210ServiceImpl implements TB07210Service {

	private final IBIMS900BMapper ibims900bMapper;

	@Override
	public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param){
		return ibims900bMapper.selectSpcDecdList(param);
	}

	@Override
	public IBIMS232BVO spcDecdDetail(IBIMS232BVO param){
		return ibims900bMapper.spcDecdDetail(param);
	}

}