package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS514BVO;
import com.nanuri.rams.business.common.vo.IBIMS514BVO2;

@Mapper
public interface IBIMS514BMapper {
	
	// 사업주요일정 조회
	public List<IBIMS514BVO> getBsnsForecast(IBIMS501BVO param);
	
	// 사업주요일정 저장
	public int saveBsnsForecast(IBIMS514BVO2 param);
	
	// 사업주요일정 삭제
	public int delBsnsForecast(IBIMS514BVO2 param);

}
