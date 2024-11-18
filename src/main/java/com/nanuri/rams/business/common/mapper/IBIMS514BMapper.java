package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS514BVO;

@Mapper
public interface IBIMS514BMapper {
	
	// 사업주요일정 조회
	public List<IBIMS514BVO> getBsnsForecast(String param);
	
	// 사업주요일정 저장
	public int saveBsnsForecast(List<IBIMS514BVO> param);
	
	// 사업주요일정 삭제
	public int delBsnsForecast(String param);

}
