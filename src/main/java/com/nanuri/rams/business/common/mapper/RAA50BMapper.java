package com.nanuri.rams.business.common.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA50BDTO;

@Mapper
public interface RAA50BMapper {
	
	// TEST Insert
	void insertRAA50B();

	// TEST GetList
	List<RAA50BDTO> getRAA50B();

	List<Map<String, Object>> getMngList(HashMap<String, Object> inputParam);
	
}
