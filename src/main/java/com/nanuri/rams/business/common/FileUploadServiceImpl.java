package com.nanuri.rams.business.common;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

	
	private final FileUploadMapper fileUploadMapper;
	
	
	@Autowired    
	private AuthenticationFacade facade;

	
	//-----------------------TAB1 관리이력-----------------------//
	
	// 관리이력 파일 저장
	@Override
	public void registFileInfo(FileUploadDTO dto) {
		
		LocalDate today = LocalDate.now();

		DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
		String rgstDt = today.format(date);

		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		dto.setRgstDt(rgstDt);
		
		fileUploadMapper.insertFileInfo(dto);
	}
	
	// 관리이력 파일 삭제
	@Override
	public void deleteFileInfo(FileUploadDTO dto) {
		dto.setHndlPEno(facade.getDetails().getEno());
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		fileUploadMapper.updateFileInfo(dto);
		
	}
	
	// 관리이력 파일 조회
	@Override
	public List<FileUploadDTO> getListFileInfo(FileUploadDTO vo) {
		
		List<FileUploadDTO> list = fileUploadMapper.selectFileList(vo);
		
		return list;
	}

}
