package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA08BDTO;
import com.nanuri.rams.business.common.vo.RAA08BVO;

@Mapper
public interface RAA08BMapper {
	
	List<RAA08BVO> getCmplInfo(RAA08BVO cmplInfo);					// 책임준공기관정보 취득

	int registCmplInfo(RAA08BDTO cmplInfo);							// 책임준공기관정보 생성

	int updateCmplInfo(RAA08BDTO cmplInfo);							// 책임준공기관정보 갱신

	int deleteCmplInfo(RAA08BVO cmplInfo);							// 책임준공기관정보 삭제
	
	
}