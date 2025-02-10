package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS515BVO;
import com.nanuri.rams.business.common.vo.IBIMS515BVO2;

@Mapper
public interface IBIMS515BMapper {
	
	// 운용사 조회
	public List<IBIMS515BVO> selectAsstOrtnLst(IBIMS501BVO param);
	
	// 운용사 등록
	public int saveAsstOrtnInfo(IBIMS515BVO2 param);
	
	// 운용사 삭제
	public int delAsstOrtnInfo(IBIMS515BVO2 param);
	
}
