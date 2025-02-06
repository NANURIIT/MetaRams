package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS511BVO;
import com.nanuri.rams.business.common.vo.IBIMS511BVO2;

@Mapper
public interface IBIMS511BMapper {
	
	// 사업참가자정보 조회
	public List<IBIMS511BVO> getBsnsPartInfo(IBIMS501BVO param);
	
	// 사업참가자정보 저장
	public int saveBsnsPartInfo(IBIMS511BVO2 param);
	
	// 사업참가자정보 삭제
	public int delBsnsPartInfo(IBIMS511BVO2 param);


}
