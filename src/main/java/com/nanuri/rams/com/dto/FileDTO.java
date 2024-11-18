package com.nanuri.rams.com.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDTO {
	
	/** 파일 번호 */
	private Long idx;

	/** 파일 path */
	private String serverPath;

	/** 원본 파일명 */
	private String originalName;

	/** 저장 파일명 */
	private String saveName;

	/** 파일 크기 */
	private long size;
	
	/** 등록일자 */
	private String rgstDt;

}
