package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA07BDTO;
import com.nanuri.rams.business.common.vo.RAA07BVO;

@Mapper
public interface RAA07BMapper {
	
	List<RAA07BVO> getEnsrInfo(RAA07BVO ensrInfo);					// 보증기관정보 취득

	int registEnsrInfo(RAA07BDTO raa07bDTO);						// 보증기관정보 생성

	int updateEnsrInfo(RAA07BDTO raa07bDTO);						// 보증기관정보 갱신

	int deleteEnsrInfo(RAA07BVO ensrInfo);							// 보증기관정보 삭제
	
	
}