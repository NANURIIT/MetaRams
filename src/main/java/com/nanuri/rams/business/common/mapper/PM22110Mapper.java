package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.RAA65BDTO;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.PM22110SVO;

@Mapper
/*
 * 사후관리 현황보고
 * */
public interface PM22110Mapper {
	
	// 조회
	public List<PM22110SVO> getAfterMngSttnList(PM22110SVO sttnList);

	// 저장
	public int mergeMntrCntnt(RAA65BDTO inputParam);
}
