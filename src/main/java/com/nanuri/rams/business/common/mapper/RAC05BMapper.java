package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.RAC05BDTO;
import com.nanuri.rams.business.common.dto.TB03020DTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RAC05BMapper {

	// 셀다운정보 조회
	public List<RAC05BDTO> getSellDownInfo(String mngDealNo);

	// 셀다운정보 저장
	public int saveSellDown(TB03020DTO dealInfo);

	// 셀다운정보 삭제
	public int deleteSellDown(String selectedDeal);

}
