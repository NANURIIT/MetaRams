package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAB04BDTO;

//CALL Report 등록
@Mapper
public interface RAB04BMapper {

	// 첨부파일 등록
	public int insertFileInfo(RAB04BDTO dto);

	// 첨부파일 삭제
	public int updateFileInfo(RAB04BDTO info);

	// 첨부파일 목록
	public List<RAB04BDTO> selectFileInfo(RAB04BDTO dto);

}
