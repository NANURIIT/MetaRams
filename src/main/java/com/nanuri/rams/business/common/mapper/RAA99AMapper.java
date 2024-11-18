package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA99ADTO;
import com.nanuri.rams.business.common.vo.RAA99AVO;

@Mapper
public interface RAA99AMapper {
	
	
	/**
	 * 로그인 정보 조회
	 * @param raa99aDto
	 * @return
	 */
	public RAA99ADTO findByEno(String eno);
	
	/**
	 * 직원검색
	 * @param raa99aDto
	 * @return
	 */
	public List<RAA99ADTO> findEmpList(RAA99ADTO raa99aDto);
	
	/**
	 * 로그인 사용자 추가
	 * @param raa99aDto
	 * @return
	 */
	public int insertLoginUser(RAA99ADTO raa99aDto);
	
	/**
	 * 로그인 사용자 중복체크
	 * @param
	 * @return
	 */
	public int checkUserEno(String eno);
}
