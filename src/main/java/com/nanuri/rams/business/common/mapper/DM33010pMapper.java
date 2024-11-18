package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
/*
 * 투자자산 매핑관리
 * */
public interface DM33010pMapper {
	
	// 조회
	public List<Map<String, Object>> getRiskRcgNoList(HashMap<String, Object> sttnList);

	/*
	// 저장
	public int mergeMntrCntnt(RAA65BDTO inputParam);

	 */
}
