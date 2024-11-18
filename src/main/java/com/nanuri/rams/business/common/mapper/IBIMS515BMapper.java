package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS515BVO;

@Mapper
public interface IBIMS515BMapper {
	
	// 운용사 조회
	public List<IBIMS515BVO> selectAsstOrtnLst(String param);
	
	// 운용사 등록
	public int saveAsstOrtnInfo(List<IBIMS515BVO> param);
	
	// 운용사 삭제
	public int delAsstOrtnInfo(String param);
	
}
