package com.nanuri.rams.business.common.vo;

import java.util.ArrayList;
import java.util.List;

import com.nanuri.rams.business.common.dto.FileUploadDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/*
 *
 * */
public class FileUploadVO extends FileUploadDTO {
	// 첨부파일일련번호목록
	private List<Integer> arratchFleSn = new ArrayList<>();		
}
