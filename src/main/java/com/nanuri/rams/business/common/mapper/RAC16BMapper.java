package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAC16BDTO;

@Mapper
public interface RAC16BMapper {

	// 상환구분/금리정보 조회
	RAC16BDTO selectRepayInterestInfo(RAC16BDTO param);
	
	// 상환구분/금리정보 등록
	int insertRepayInterestInfo(RAC16BDTO param);
	
	// 상환구분/금리정보 수정
	int updateRepayInterestInfo(RAC16BDTO param);

}
