package com.nanuri.rams.business.common.dto;

import com.nanuri.rams.com.code.AthCd;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/*
 * 사원목록 Table.RAA99A DTO
 * */
public class RAA99ADTO extends RAA98ADTO {
	private String eno;							// 사원번호
	private String pwd;							// 비밀번호
	private String empNm;						// 직원명
	private String pstn;						// 직책
	private String dprtCd;						// 부점코드
	private String dprtNm;						// 부점명
	private String hdqtCd;						// 본부코드
	private String hdqtNm;						// 본부명
	private String rgstDt;						// 등록일자
	private String usrC;						// 사용자구분
	
	/* 계정 잠금 여부 */
	private Boolean isLocked = false;
	/* 권한코드 */
	private AthCd rghtCd;
	
}
