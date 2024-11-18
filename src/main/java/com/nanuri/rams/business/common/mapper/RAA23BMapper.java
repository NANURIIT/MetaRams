package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA22BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;

@Mapper
public interface RAA23BMapper {

	RAA23BDTO selectRAA23BInfo(RAA23BDTO raa23bDTO);

	void insertRAA23BInfo(RAA23BDTO raa23bDTO);

	int updateRAA23BInfo(RAA23BDTO raa23bDTO);

	void deleteRAA23BInfo(RAA23BDTO raa23bDTO);

	List<DealInfo> getDealInfoByEno(SearchVO paramData);

	void deleteRAA23BDealInfo(RAA23BDTO raa23bDTO);

	public int updateRnkNoRAA23B(Map<String, Object> input);

}
