package com.nanuri.rams.business.assessment.tb03.tb03021;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS101BMapper;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB03021ServiceImpl implements TB03021Service {
	
	private final IBIMS101BMapper ibims101bMapper;
	
	// 안건목록조회
	@Override
	public List<IBIMS101BVO> getDealInfo(IBIMS101BVO param) {
		return ibims101bMapper.selectLstTB03021P(param);
	}

	// 딜변경이력sn조회
	@Override
	public List<IBIMS101BVO> getDealSnHis(IBIMS101BVO param) {
		return ibims101bMapper.selectLstDealSn(param);
	}
}
