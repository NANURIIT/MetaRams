package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS512BVO;

@Mapper
public interface IBIMS512BMapper {
	
	// 편입자산 정보
	List<IBIMS512BVO> getAdmsAsstInfo(String param);
	
	// 편입자산 등록
	int saveAdmsAsstInfo(List<IBIMS512BVO> param);

	// 편입자산 삭제
	int delAdmsAsstInfo(String param);

}
