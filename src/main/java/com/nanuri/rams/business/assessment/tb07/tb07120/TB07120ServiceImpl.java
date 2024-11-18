package com.nanuri.rams.business.assessment.tb07.tb07120;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS452BMapper;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS452BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07120ServiceImpl implements TB07120Service {

	private final IBIMS410BMapper ibims410bMapper;
	private final IBIMS452BMapper ibims452bMapper;
	
	/**
	 * 회계대사내역
	 */
	@Override
	public List<IBIMS410BVO> get07120sList(IBIMS410BVO param){
		List<IBIMS410BVO> result = ibims410bMapper.get07120sList(param);
		return result;
	};

	@Override
	public int insertFndsCnstDecd(IBIMS452BVO param){
		
		int result;

		result = ibims452bMapper.insertFndsCnstDecd(param);

		return result;
	}

	@Override
	public int updateFndsCnstDecd(IBIMS452BVO param){

		int result;

		result = ibims452bMapper.updateFndsCnstDecd(param);

		return result;
	}
	
} // class end