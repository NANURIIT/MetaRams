package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA20BDTO;

@Mapper
public interface RAA20BMapper {
	
	public int insertFileInfo(RAA20BDTO dto);	// 첨부파일 등록
	
	public int updateFileInfo(RAA20BDTO dto);	// 첨부파일 삭제
	
	public List<RAA20BDTO> selectFileList(RAA20BDTO dto);	// 첨부파일 목록

}
