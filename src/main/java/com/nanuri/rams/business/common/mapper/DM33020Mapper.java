package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
/*
 * 투자자산 매핑관리
 * */
public interface DM33020Mapper {
	
	// 조회
	public List<Map<String, Object>> getMngList(HashMap<String, Object> inputParam);


	/*
	// 투자자산 매핑 저장
	public int saveMappingInfo(List<Map<String, Object>> inputArr);

	 */

}
