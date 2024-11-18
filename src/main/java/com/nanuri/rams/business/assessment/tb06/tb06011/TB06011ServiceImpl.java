package com.nanuri.rams.business.assessment.tb06.tb06011;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06011ServiceImpl implements TB06011Service {

	private final IBIMS201BMapper ibims201bMapper;

	// 상품코드 리스트 조회
	@Override
	public List<IBIMS201BVO> getPrdtCdList(IBIMS201BDTO searchParam) {
		return ibims201bMapper.selectPopIBIMS201B(searchParam);
	}

}
