package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS510BVO;
import com.nanuri.rams.business.common.vo.IBIMS510BVO2;

@Mapper
public interface IBIMS510BMapper {
	
	// 조건변경이력 조회
	public List<IBIMS510BVO> getCchInfo(IBIMS501BVO param);
	
	// 조건변경이력 저장
	public int saveCchInfo(IBIMS510BVO2 param);
	
	// 조건변경이력 삭제
	public int delCchInfo(IBIMS510BVO2 param);

}
