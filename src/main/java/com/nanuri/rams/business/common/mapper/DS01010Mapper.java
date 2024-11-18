package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.DS01010SVO.inqueryParameters;

//CALL Report 등록
@Mapper
public interface DS01010Mapper {

	List<Map<String, Object>> getTable1(inqueryParameters param);
	
	List<Map<String, Object>> getTable2(inqueryParameters param);

	List<Map<String, Object>> getTable3(inqueryParameters param);

	List<Map<String, Object>> getTable4(inqueryParameters param);

	List<Map<String, Object>> getTable5(inqueryParameters param);

}