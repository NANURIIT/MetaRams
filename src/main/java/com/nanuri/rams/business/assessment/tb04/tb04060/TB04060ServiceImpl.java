package com.nanuri.rams.business.assessment.tb04.tb04060;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB04060ServiceImpl implements TB04060Service {

	private final IBIMS201BMapper ibims201bMapper;

	// 사업명세조회
	@Override
	public List<IBIMS201BVO> checkDealSearch(IBIMS201BVO assignInfo) {

		return ibims201bMapper.checkDealSearch(assignInfo);
	}

}
