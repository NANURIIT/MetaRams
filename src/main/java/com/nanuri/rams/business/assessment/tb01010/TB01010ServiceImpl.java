package com.nanuri.rams.business.assessment.tb01010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB01010SVO.inqueryParameters;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB01010ServiceImpl implements TB01010Service {

	private final IBIMS103BMapper ibims103bMapper;

	@Override
	public List<IBIMS103BVO> selectCnfStts(IBIMS103BVO param) {
		return ibims103bMapper.selectCnfStts(param);
	}

	@Override
	public List<IBIMS103BVO> selectCnfRslt(IBIMS103BVO param) {
		return ibims103bMapper.selectCnfRslt(param);
	}

	@Override
	public List<IBIMS103BVO> selectSttsInvsAstsBfSgnf(IBIMS103BVO param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			return ibims103bMapper.selectSttsInvsAstsBfSgnf(param);
		}
	}

	@Override
	public List<IBIMS103BVO> selectSttsInvsAstsAfSgnf(IBIMS103BVO param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			return ibims103bMapper.selectSttsInvsAstsAfSgnf(param);
		}
	}

	@Override
	public List<Map<String, Object>> getTable5(inqueryParameters param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			return ibims103bMapper.getTable5(param);
		}
	}
}
