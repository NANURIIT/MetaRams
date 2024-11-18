package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;
	/**
	 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
	 * rac03b 사용안함
	 */
@Mapper
public interface RAC03BMapper {
	
	/**
	 * 신규활동등록
	 * @param registInfo
	 * @return
	 */
	//public int registRmInfo(IBIMS102BDTO registInfo);
	
	/**
	 * RM활동조회
	 * @param rmInfo
	 * @return
	 */
	//public List<IBIMS102BDTO> getHistoryInfo(IBIMS102BDTO rmInfo);	
	
	/**
	 * RM활동이력조회
	 * @param rmHistoryInfo
	 * @return
	 */
	//public List<IBIMS102BDTO> rmHistoryInfo(IBIMS102BDTO rmHistoryInfo);	

	/**
	 * RM활동수정
	 * @param updateHistory
	 * @return
	 */
	//public int updateHistory(IBIMS102BDTO registInfo);
	
	


}
