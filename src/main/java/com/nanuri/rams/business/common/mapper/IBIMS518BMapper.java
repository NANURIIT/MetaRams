package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS518BVO;

@Mapper
public interface IBIMS518BMapper {
	
	// 투자기업 조회
	List<IBIMS518BVO> getInvstBzscalList(String param);

	// 투자기업 등록
	int saveInvstEprzInfo(List<IBIMS518BVO> param);

	// 투자기업 삭제
	int delInvstEprzInfo(String param);
	
}
