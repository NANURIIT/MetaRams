package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA05BDTO;
import com.nanuri.rams.business.common.vo.RAA05BVO;

@Mapper
public interface RAA05BMapper {

	List<RAA05BVO> getInsGrdInfo(RAA05BVO insGrdInfo);			// 내부등급정보 취득

	int registInsGrdInfo(RAA05BDTO raa05bDTO);					// 내부등급정보 생성
	
	int updateInsGrdInfo(RAA05BDTO raa05bDTO);					// 내부등급정보 갱신

	int deleteInsGrdInfo(RAA05BVO insGrdInfo);					// 내부등급정보 제거

}