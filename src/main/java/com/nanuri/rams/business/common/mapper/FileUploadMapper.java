package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.FileUploadDTO;

@Mapper
/*
 * 부실자산파일첨부정보
 * */
public interface FileUploadMapper {
	
	// 첨부파일 등록
	public int insertFileInfo(FileUploadDTO dto);
	
	// 첨부파일 수정
	public int updateFileInfo(FileUploadDTO dto);
	
	// 첨부파일 목록
	public List<FileUploadDTO> selectFileList(FileUploadDTO dto);
}
