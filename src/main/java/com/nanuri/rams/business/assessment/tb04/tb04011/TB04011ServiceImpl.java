package com.nanuri.rams.business.assessment.tb04.tb04011;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB04011ServiceImpl implements TB04011Service {
	
	private final IBIMS103BMapper ibims103BMapper;

	// 안건목록조회
	@Override
	public List<IBIMS103BVO> getDealInfo(IBIMS103BVO paramData) {
		return ibims103BMapper.getDealList(paramData);
	}
}
