package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB06013PVO;

@Mapper
public interface IBIMS219BMapper {

	int insertIBIMS219B(TB06013PVO searchParam);

	void deleteIBIMS219B(TB06013PVO searchParam);
	
}
