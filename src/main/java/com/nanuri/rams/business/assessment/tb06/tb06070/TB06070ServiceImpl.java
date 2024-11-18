package com.nanuri.rams.business.assessment.tb06.tb06070;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS200BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS200BMapper;
import com.nanuri.rams.business.common.vo.TB06070SVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06070ServiceImpl implements TB06070Service {
	
	private final IBIMS200BMapper ibims200bMapper;
	
	@Override
	public List<IBIMS200BDTO> getResultData(TB06070SVO param) {
		List<IBIMS200BDTO> result = ibims200bMapper.getResultData(param); 
		return result;
	}
	
	/**
	 * 상품정보 상세 조회
	 */
	@Override
	public TB06070SVO getDetailInfo(TB06070SVO param) {
		
		TB06070SVO result;

		result = ibims200bMapper.getDetailInfo(param);
		return result;
	}
}
