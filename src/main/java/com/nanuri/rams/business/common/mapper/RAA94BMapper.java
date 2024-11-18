package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.com.code.AthCd;

@Mapper
public interface RAA94BMapper {

	public List<RAA94BDTO> selectRghtCd();						// 사용자관리화면 권한구분

	public List<RAA94BDTO> selectAuthCode(String rghtCdNm);		// 권한코드 조회

	public int updateAuthCode(RAA94BDTO requestDto);			// 권한코드 수정

	public int insertAuthCode(RAA94BDTO requestDto);			// 권한코드 추가

	public int deleteAuthCode(@Param(value = "rghtCd") List<String> rghtCd, @Param(value = "hndlPEno") String hndlPEno, @Param(value = "dltPEno") String dltPEno);			// 삭제자사번

	public Optional<RAA94BDTO> getAuthCode(String rghtCd);

	public List<Map<String, Object>> getMenuList(AthCd rghtCd); // 로그인 사용자 권한에 따른 메뉴 리스트

	public List<Map<String, Object>> getMenuListM(AthCd rghtCd);

}


