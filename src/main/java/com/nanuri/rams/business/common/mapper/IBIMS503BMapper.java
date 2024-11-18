package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS503BVO;

@Mapper
public interface IBIMS503BMapper {
	
	// 인프라사업기본 조회
	public IBIMS503BVO getInfraInfo(String param);
	
	// 인프라사업기본 등록
	public int saveInfInfo(IBIMS501BVO param);
}
