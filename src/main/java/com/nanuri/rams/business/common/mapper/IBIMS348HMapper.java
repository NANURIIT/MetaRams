package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS348BVO;
import com.nanuri.rams.business.common.vo.IBIMS348HVO;

@Mapper
public interface IBIMS348HMapper {

	// 수수료스케쥴기본이력 조회
	List<IBIMS348HVO> selectIBIMS348HList(String param);
	
	List<IBIMS348BVO> selectOneIBIMS348H(IBIMS348BVO param);
	
	public IBIMS348BVO selectTrsnCntIBIMS348H(IBIMS348BVO param);
	// 수수료스케쥴기본이력 저장
	public int insertIBIMS348H(List<IBIMS348BVO> input);
	
	// 수수료스케쥴기본이력 수정
	public int updateIBIMS348H(List<IBIMS348BVO> input);


}
