package com.nanuri.rams.business.assessment.tb07.tb07190;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS420BMapper;
import com.nanuri.rams.business.common.vo.IBIMS420BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07190ServiceImpl implements TB07190Service {

	private final IBIMS420BMapper ibims420bMapper;

	@Override
	public List<IBIMS420BVO> getTB07190SData(IBIMS420BVO param) {
		return ibims420bMapper.getTB07190SData(param);
	};

}