package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.MO44010SVO.DealInfo;
import com.nanuri.rams.business.common.vo.MO44010SVO.ExmntInfo;
import com.nanuri.rams.business.common.vo.MO44010SVO.SearchVO;

@Mapper
public interface RAA30BMapper {

	List<DealInfo> checkDealSearch(SearchVO searchVO);

	int saveDealExmnt(ExmntInfo exmntInfo);

}
