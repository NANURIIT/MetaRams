package com.nanuri.rams.business.assessment.dm33.dm33010p;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public interface DM33010pService {
	// 매핑 목록 조회
	public List<Map<String, Object>> getRiskRcgNoList(HashMap<String, Object> param);

	/*

	// 사후관리 현황보고 모니터링 사항 저장
	public int mergeMntrCntnt(RAA65BDTO inputParam);

	 */
}
