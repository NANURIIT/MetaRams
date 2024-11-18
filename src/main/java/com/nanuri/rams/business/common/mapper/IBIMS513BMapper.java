package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS513BVO;

@Mapper
public interface IBIMS513BMapper {
	
	// 대주단 조회
	public List<IBIMS513BVO> getStlnInfo(String param);

	// 수익자 조회
	public List<IBIMS513BVO> getErnInfo(String param);

	// 대주단 저장
	public int saveStlnInfo(List<IBIMS513BVO> param);

	// 수익자 저장
	public int saveErnInfo(List<IBIMS513BVO> param);
	
	// 대주단 삭제
	public int delStlnInfo(String param);

	// 수익자 삭제
	public int delErnInfo(String param);

}
