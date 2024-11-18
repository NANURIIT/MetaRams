package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AS04310SVO.DealInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.SearchVO;

@Mapper
public interface AS04310Mapper {
	
	List<DealInfo> as04310sSelectCaseInfo(SearchVO paramData);

}
