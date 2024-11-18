package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.RAA66BDTO;
import com.nanuri.rams.business.common.vo.RAA66BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 안건연결
 * */
public interface RAA66BMapper {
	
	// 안건연결 내역 조회
	public List<RAA66BVO> getCnctList(RAA66BDTO paramData);

	// 안건연결 정보 저장
	public int registCnctInfo(RAA66BDTO cnctInfo);

	// 안건연결 정보 수정
	public int updateCnctInfo(RAA66BDTO cnctInfo);

	// 안건연결 정보 삭제
	public int deleteCnctInfo(String sq);
	
}
