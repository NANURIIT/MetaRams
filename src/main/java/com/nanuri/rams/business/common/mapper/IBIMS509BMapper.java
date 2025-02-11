package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS509BVO;
import com.nanuri.rams.business.common.vo.IBIMS509BVO2;

@Mapper
public interface IBIMS509BMapper {
	
	// 채권보전주요약정 조회
	public List<IBIMS509BVO> getBondProtInfo(IBIMS501BVO param);
	
	// 채권보전주요약정 저장
	public int saveBondProtInfo(IBIMS509BVO2 param);
	
	// 채권보전주요약정 삭제
	public int delBondProtInfo(IBIMS509BVO2 param);
}
