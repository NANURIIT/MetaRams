package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS006BDTO;
import com.nanuri.rams.business.common.dto.RAA99ADTO;

@Mapper
public interface IBIMS003BMapper {
	
	public List<IBIMS006BDTO> selectRghtCd();						// 사용자관리화면 권한구분

	public List<IBIMS006BDTO> selectAuthCode(String rghtCdNm);		// 권한코드 조회
	
	/**
	 * 로그인 정보 조회
	 * @param IBIMS003BDTO
	 * @return
	 */
	public IBIMS003BDTO findByEno(String eno);
	
	/**
	 * 직원검색
	 * @param IBIMS003BDTO
	 * @return
	 */
	public List<IBIMS003BDTO> findEmpList(IBIMS003BDTO param);
	
	/**
	 * 로그인 사용자 추가
	 * @param IBIMS003BDTO
	 * @return
	 */
	public int insertUser(IBIMS003BDTO paramData);

	/**
	 * 로그인 사용자 정보 변경
	 * @param IBIMS003BDTO
	 * @return
	 */	
	public int updateUser(IBIMS003BDTO paramData);
	
	/**
	 * 로그인 사용자 중복체크
	 * @param String empno
	 * @return
	 */
	public int checkEno(String eno);

	/**
	 * 사용자 삭제
	 * @param IBIMS003BDTO
	 * @return
	 */
	public void deleteUser(IBIMS003BDTO paramData);

	/* 사용자 검색 */
	public List<IBIMS003BVO> selectUser (IBIMS003BDTO paramData);

	public String atcCdInq(String empno);
}
