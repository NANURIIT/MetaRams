package com.nanuri.rams.business.assessment.dm33.dm33020;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA50BMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DM33020ServiceImpl implements DM33020Service {

	private final RAA50BMapper raa50bMapper;

	// 매핑 목록 조회
	@Override
	public List<Map<String, Object>> getMngList(HashMap<String, Object> inputParam) {
		return raa50bMapper.getMngList(inputParam);
	}

	/*
	// 투자자산 매핑 저장
	public int saveMappingInfo(List<Map<String, Object>> inputArr){
		return dm33010Mapper.saveMappingInfo(inputArr);
	}
	 */

}
