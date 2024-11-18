package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.vo.IBIMS001BVO;

@Mapper
public interface IBIMS001BMapper {
	
	public List<IBIMS001BVO> getCommonCodeName();							
	
	public List<IBIMS001BVO> getGroupCodeInfoList(String cmnsCdGrp); 								// 그룹코드정보 리스트 가져오기

	public Optional<IBIMS001BVO> getGroupCodeInfo(String cmnsCdGrp);

	public int deleteGroupCodeInfo(@Param(value = "cmnsCdGrp") List<String> cmnsCdGrp, @Param(value = "hndEmpno") String hndEmpno);

	public int registGroupCodeInfo(IBIMS001BVO requestDto); 										// 그룹코드정보 등록하기

	public int insertGroupCodeInfo(IBIMS001BVO requestDto);

	public int selectTotalCount(); 																	// 조회할 코드구분(코드이름) 가져오기

}
