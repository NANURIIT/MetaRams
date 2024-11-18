package com.nanuri.rams.business.common;

import java.util.List;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.stereotype.Service;

@Service
public interface FileUploadService {

	
	// -----------------------TAB1 관리이력-----------------------//
	
	// 관리이력 파일 저장
	public void registFileInfo(FileUploadDTO dto);

	// 관리이력 파일 삭제
	public void deleteFileInfo(FileUploadDTO dto);

	// 관리이력 파일 조회
	public List<FileUploadDTO> getListFileInfo(FileUploadDTO vo);

	

}
