package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS509BVO;

@Mapper
public interface IBIMS509BMapper {
	
	// 채권보전주요약정 조회
	public List<IBIMS509BVO> getBondProtInfo(String param);
	
	// 채권보전주요약정 저장
	public int saveBondProtInfo(List<IBIMS509BVO> param);
	
	// 채권보전주요약정 삭제
	public int delBondProtInfo(String param);
}
