package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA18BDTO;
import com.nanuri.rams.business.common.vo.AS05010SVO;
import com.nanuri.rams.business.common.vo.RAA18BVO.DocInfo;
import com.nanuri.rams.business.common.vo.RAA18BVO.ExitDocInfo;

@Mapper
public interface RAA18BMapper {
	
	public List<DocInfo> getDocInfo(DocInfo docInfo);				// 관련문서정보 취득

	public int deleteDocInfo(DocInfo docInfo);						// 관련문서정보 제거

	public int registDocInfo(RAA18BDTO raa18bDTO);					// 관련문서정보 생성

	public int updateDocInfo(RAA18BDTO raa18bDTO);					// 관련문서정보 갱신
	
	/*
	 * TAB1 약정/기표/철회
	 * */
	// 조회 유무
	public int raDocCcdCheck(RAA18BDTO raa18bDTO);
	
	// 안건별 문서 등록
	public int registCaseDocInfo(RAA18BDTO raa18bDTO);
	
	// 약정/기표/철회 수정
	public int updateCaseDocInfo(RAA18BDTO raa18bDTO);				
	
	// 약정/기표/철회 삭제
	public int deleteCaseDocInfo(AS05010SVO caseInfo);				

	// 약정 업데이트
	public int updateInspctPrgrsStCd(AS05010SVO caseInfo);
	
	/*
	 * TAB2 EXIT
	 * */
	// 조회 유무
	public int exitInfoCheck(RAA18BDTO raa18bDTO);
		
	// EXIT 문서 등록
	public int registExitDocInfo(RAA18BDTO raa18bDTO);
	
	// EXIT 문서 수정
	public int updateExitDocInfo(RAA18BDTO raa18bDTO);
	
	// EXIT 문서 삭제
	public int deleteExitDocInfo(AS05010SVO exitInfo);
	

}
