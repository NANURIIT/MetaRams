package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.TB02020DTO;
import com.nanuri.rams.business.common.vo.TB02020SVO;



@Mapper
public interface TB02020Mapper {
  
  /**
	 * 딜징보조회
	 * @param dealInfo
	 * @return
	 */
  public List<TB02020DTO> getWfDealInfo(TB02020DTO dealInfo);

	/**
	 * 맵정보조회
	 * @param mapInfo 
	 * @return
	 */
  public List<TB02020DTO> getMapInfo(Map<String, String> mapInfo);

	/**
	 * 맵이력조회
	 * @param mapHisInfo 
	 * @return
	 */
  public List<TB02020DTO> getMapHisInfo(Map<String, String> mapHisInfo);
	
	

} 
