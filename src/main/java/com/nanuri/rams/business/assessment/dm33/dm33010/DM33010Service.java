package com.nanuri.rams.business.assessment.dm33.dm33010;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public interface DM33010Service {
	// 매핑 목록 조회
	public List<Map<String, Object>> selMappingList(HashMap<String, Object> sttnList);

	// 투자자산 매핑 저장
	public int saveMappingInfo(List<Map<String, Object>> inputArr);

}
