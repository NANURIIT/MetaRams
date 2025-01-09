                   package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS006BDTO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.com.code.AthCd;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface IBIMS006BMapper {

	public List<IBIMS006BVO> selectRghtCd();						// 사용자관리화면 권한구분

	public List<IBIMS006BVO> selectAuthCode(String rghtCdNm);		// 권한코드 조회

	public int updateAuthCode(IBIMS006BVO requestDto);			// 권한코드 수정

	public int insertAuthCode(IBIMS006BVO requestDto);			// 권한코드 추가

	public int deleteAuthCode(@Param(value = "athCd") List<String> rghtCd, @Param(value = "hndEmpno") String hndlPEno, @Param(value = "dltEmpno") String dltPEno);			// 삭제자사번

	public Optional<IBIMS006BDTO> getAuthCode(String rghtCd);

	public List<Map<String, Object>> getMenuList(String rghtCd); // 로그인 사용자 권한에 따른 메뉴 리스트

	public List<Map<String, Object>> getMenuListM(String rghtCd);

	public int athCdvldChk(String param);

	public int mergeAthCd(IBIMS006BDTO param);

}


