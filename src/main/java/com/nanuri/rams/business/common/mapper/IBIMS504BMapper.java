package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS504BVO;

@Mapper
public interface IBIMS504BMapper {
	
	// MA대출사업기본 조회
	public IBIMS504BVO getMaInfo(String param);
	
	// M&A 등록
	public int saveMaInfo(IBIMS501BVO param);

}
