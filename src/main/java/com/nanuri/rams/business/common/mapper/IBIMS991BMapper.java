package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS991BVO;

@Mapper
public interface IBIMS991BMapper {

	// 기준일자조회
	public IBIMS991BVO getBsnDt(String paramData);

	// 상환예정일 휴일적용
	public String getPrarDt(String stdrDt);

	
}
