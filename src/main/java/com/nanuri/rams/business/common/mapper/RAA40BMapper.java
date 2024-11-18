package com.nanuri.rams.business.common.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RAA40BMapper {

	List<Map<String, Object>> selMappingList(HashMap<String, Object> sttnList);

	int saveMappingInfo(List<Map<String, Object>> inputArr);
	
}
