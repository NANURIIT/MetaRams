package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AS05010SVO;

@Mapper
/*
 * 안건관리 - 진행정보관리
 * */
public interface AS05010Mapper {

	// 조회
	public List<AS05010SVO> getDealListAS05010(AS05010SVO dealList);
	
	//--------------------TAB1 약정/기표/철회--------------------//
	// 약정/기표/철회 조회
	
	// 약정/기표/철회 등록
	public int registCaseInfo(AS05010SVO caseInfo);
	
	// 약정/기표/철회 수정
	public int updateCaseInfo(AS05010SVO caseInfo);
	
	// 약정/기표/철회 삭제
	public int deleteCaseInfo(AS05010SVO caseInfo);
	
	//--------------------TAB2 EXIT--------------------//
	// EXIT 등록
	public int registExitInfo(AS05010SVO caseInfo);
	
	// EXIT 수정
	public int updateExitInfo(AS05010SVO caseInfo);
	
	// EXIT 삭제
	public int deleteExitInfo(AS05010SVO caseInfo);
	
	//--------------------TAB3 셀다운의무--------------------//
	// 셀다운의무 등록
	// 셀다운의무 수정
	// 셀다운의무 삭제
	
	//--------------------TAB4 기타의무--------------------//
	// 기타의무 등록
	// 기타의무 수정
	// 기타의무 삭제
		
	//--------------------TAB5 관리직원--------------------//
	// 관리직원 등록
	// 관리직원 수정
	// 관리직원 삭제
	
	
}
