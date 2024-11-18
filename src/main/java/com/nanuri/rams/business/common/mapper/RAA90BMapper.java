package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA90BDTO;
import com.nanuri.rams.business.common.vo.RAA90BVO;

@Mapper
public interface RAA90BMapper {

	public List<RAA90BDTO> getGroupCodeInfoList(String cmnsCdGrp); 								// 그룹코드정보 리스트 가져오기

	public Optional<RAA90BDTO> getGroupCodeInfo(String cmnsCdGrp);

	public int deleteGroupCodeInfo(@Param(value = "cmnsCdGrp") List<String> cmnsCdGrp, @Param(value = "hndlPEno") String hndlPEno);

	public int registGroupCodeInfo(RAA90BVO.GroupCodeInfoSaveRequestVO requestDto); 							// 그룹코드정보 등록하기

	public int insertGroupCodeInfo(RAA90BVO.GroupCodeInfoSaveRequestVO requestDto);

	public List<RAA90BVO.CommonCodeInfoVO> getCommonCodeName();

	public int selectTotalCount(); 																		// 조회할 코드구분(코드이름) 가져오기
	
}
