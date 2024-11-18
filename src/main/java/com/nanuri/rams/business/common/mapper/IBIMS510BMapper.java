package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS510BVO;

@Mapper
public interface IBIMS510BMapper {
	
	// 조건변경이력 조회
	public List<IBIMS510BVO> getCchInfo(String param);
	
	// 조건변경이력 저장
	public int saveCchInfo(List<IBIMS510BVO> param);
	
	// 조건변경이력 삭제
	public int delCchInfo(String param);

}
