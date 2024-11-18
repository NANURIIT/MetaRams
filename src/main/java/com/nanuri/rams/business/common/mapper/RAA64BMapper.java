package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA64BDTO;

@Mapper
/*
 * 부실자산파일첨부정보
 * */
public interface RAA64BMapper {
	
	// 첨부파일 등록
	public int insertFileInfo(RAA64BDTO dto);
	
	// 첨부파일 수정
	public int updateFileInfo(RAA64BDTO dto);
	
	// 첨부파일 목록
	public List<RAA64BDTO> selectFileList(RAA64BDTO dto);
}
