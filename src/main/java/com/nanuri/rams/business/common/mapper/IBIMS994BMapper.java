package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB07030SVO;

@Mapper
/*
 * 환율정보
 * */
public interface IBIMS994BMapper {
	// 환율조회
	public TB07030SVO getExchR(String paramData);	
}
