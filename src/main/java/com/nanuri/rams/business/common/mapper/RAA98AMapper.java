package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA98ADTO;

@Mapper
public interface RAA98AMapper {
	
	
	/**
	 * 부서검색
	 * @param raa98aDto
	 * @return
	 */
	public List<RAA98ADTO> findDprtList(RAA98ADTO raa98aDto);

}
