package com.nanuri.rams.business.assessment.dm33.dm33020;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public interface DM33020Service {
	// 매핑 목록 조회
	public List<Map<String, Object>> getMngList(HashMap<String, Object> inputParam);

	/*
	// 투자자산 매핑 저장
	public int saveMappingInfo(List<Map<String, Object>> inputArr);

	 */

}
