package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS200BDTO;
import com.nanuri.rams.business.common.vo.TB06070SVO;

@Mapper
public interface IBIMS200BMapper {
	
	
	// 여신실행금리내역 조회
	public List<IBIMS200BDTO> getResultData(TB06070SVO param);

	public TB06070SVO getDetailInfo(TB06070SVO param);

}
