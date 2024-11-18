package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS224BVO;
import com.nanuri.rams.business.common.vo.TB04050SVO;

@Mapper
public interface IBIMS224BMapper {
	
	// LOI/LOC 발급내역 조회
	public List<IBIMS224BVO> getLoiIssDtls(IBIMS224BVO param);
	
	// LOI/LOC 조회
	public TB04050SVO getLoi(TB04050SVO param);
	
	// LOI/LOC 발급 저장
	public int registLoi(IBIMS224BVO param);

	public String getMaxSQ(IBIMS224BVO param);
	
}
