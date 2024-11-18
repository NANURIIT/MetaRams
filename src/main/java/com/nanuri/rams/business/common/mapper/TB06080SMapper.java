package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB06080SVO;

@Mapper
public interface TB06080SMapper {
	
	// 결재내역 조회
	public List<TB06080SVO.ApvlList> inqTB06080S(TB06080SVO input);
	public List<TB06080SVO.GbckList> inqIBMS232B(TB06080SVO.ApvlList input);

}