package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA04BDTO;
import com.nanuri.rams.business.common.vo.RAA04BVO;

@Mapper
public interface RAA04BMapper {

	List<RAA04BVO> getRelatedCompanyInfo(RAA04BVO cncCmpnyInfo); 		// 관계사정보 취득

	int registCncCmpnyInfo(RAA04BDTO raa04bDTO);						// 관계사정보 입력
			
	int updateCncCmpnyInfo(RAA04BDTO raa04bDTO);						// 관계사정보 수정
	
	int deleteCncCmpnyInfo(RAA04BVO cncCmpnyInfo);						// 관계사정보 삭제
	

}