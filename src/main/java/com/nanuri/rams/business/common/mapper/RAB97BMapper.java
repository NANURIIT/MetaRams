package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;


@Mapper
public interface RAB97BMapper {
	
	
	/**
	 * 법인검색
	 * @param rab97bDto
	 * @return
	 */
	public List<Map<String, Object>> findEntList(Map<String, Object> paramData);
	
	/**
	 * 업체등록
	 * @param registInfo
	 * @return
	 */
	public int registCorpInfo(IBIMS102BDTO registInfo);

	/**
	 * RM 이름조회
	 * @param entpInfoNm
	 * @return
	 */
	public List<IBIMS102BDTO> getEntpInfoByNm(IBIMS102BDTO entpInfoNm);
	
	/**
	 * 업체명조회
	 * @param corpNm
	 * @return
	 */
	public List<Map<String, Object>> selCorpNm(String corpNm);

}
