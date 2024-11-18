package com.nanuri.rams.business.dashboard.ds01010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.vo.DS01010SVO.inqueryParameters;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DS01010ServiceImpl implements DS01010Service {

	// private final DS01010Mapper ds01010Mapper;
	private final RAA02BMapper raa02bMapper;

	@Override
	public List<Map<String, Object>> getTable1(inqueryParameters param) {
		//return raa02bMapper.getTable1(param);
		return null;
	}

	@Override
	public List<Map<String, Object>> getTable2(inqueryParameters param) {
		//return raa02bMapper.getTable2(param);
		return null;
	}

	@Override
	public List<Map<String, Object>> getTable3(inqueryParameters param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			//return raa02bMapper.getTable3(param);
			return null;
		}
	}

	@Override
	public List<Map<String, Object>> getTable4(inqueryParameters param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			//return raa02bMapper.getTable4(param);
			return null;
		}
	}

	@Override
	public List<Map<String, Object>> getTable5(inqueryParameters param) {
		if (param.equals("")) {
			throw new NullPointerException("파라미터가 입력되지 않았습니다.");
		} else {
			//return raa02bMapper.getTable5(param);
			return null;
		}
	}
}
