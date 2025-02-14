package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;

@Mapper
public interface IBIMS001BMapper {
	
	public List<IBIMS001BVO> getCommonCodeName();							
	
	public List<IBIMS001BVO> getGroupCodeInfoList(IBIMS001BDTO param); 								// 그룹코드정보 리스트 가져오기

	public Optional<IBIMS001BVO> getGroupCodeInfo(String cmnsCdGrp);

	public int deleteGroupCodeInfo(@Param(value = "cmnsCdGrp") List<String> cmnsCdGrp, @Param(value = "hndEmpno") String hndEmpno);

	public int registGroupCodeInfo(IBIMS001BDTO requestDto); 										// 그룹코드정보 등록하기

	public int insertGroupCodeInfo(IBIMS001BDTO paramData);

	public int selectTotalCount(); 																	// 조회할 코드구분(코드이름) 가져오기

	/**
	 * IBIMS001B 코드명 생성
	 * @param paramData
	 * @return
	 */
	public String makeCmnsCdGrp(IBIMS001BDTO paramData);

}
