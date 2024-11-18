package com.nanuri.rams.business.assessment.dm33.dm33010;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA40BMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DM33010ServiceImpl implements DM33010Service {

	// private final DM33010Mapper dm33010Mapper;
	private final RAA40BMapper raa40bMapper;

	// 매핑 목록 조회
	@Override
	public List<Map<String, Object>> selMappingList(HashMap<String, Object> sttnList) {
		return raa40bMapper.selMappingList(sttnList);
	}

	// 투자자산 매핑 저장
	public int saveMappingInfo(List<Map<String, Object>> inputArr) {
		return raa40bMapper.saveMappingInfo(inputArr);
	}

}
