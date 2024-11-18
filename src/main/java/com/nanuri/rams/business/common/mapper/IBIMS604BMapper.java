package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS604BVO.DealInfo;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.ExmntInfo;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.SearchVO;

@Mapper
public interface IBIMS604BMapper {

	List<DealInfo> checkDealSearch(SearchVO searchVO);

	int saveDealExmnt(ExmntInfo exmntInfo);

}
