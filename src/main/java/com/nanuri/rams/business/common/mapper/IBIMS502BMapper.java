package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS502BVO;

@Mapper
public interface IBIMS502BMapper {
	
	// 부동산사업기본 조회
	public IBIMS502BVO getRealEstateInfo(String param);
	
	// 부동산사업기본 등록
	public int saveDealInfo(IBIMS501BVO param);

}
