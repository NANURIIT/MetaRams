package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB02020SVO;



@Mapper
public interface TB02020Mapper {
  
  /**
	 * 딜징보조회
	 * @param dealInfo
	 * @return
	 */
  public List<TB02020SVO> getWfDealInfo(TB02020SVO dealInfo);

	/**
	 * 맵정보조회
	 * @param mapInfo 
	 * @return
	 */
  public List<TB02020SVO> getMapInfo(Map<String, String> mapInfo);
	
	

} 
