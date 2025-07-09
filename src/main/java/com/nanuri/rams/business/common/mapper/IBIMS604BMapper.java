package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS604BVO.DealInfo;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.ExmntInfo;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.SearchVO;
import com.nanuri.rams.business.common.dto.IBIMS604BDTO;

@Mapper
public interface IBIMS604BMapper {

	List<DealInfo> checkDealSearch(SearchVO searchVO);

	int saveDealExmnt(ExmntInfo exmntInfo);

	// 신규
	int insertIBIMS604B(ExmntInfo exmntInfo);

	// 기등록내역 조회
	List<IBIMS604BDTO> selectIBIMS604B(ExmntInfo exmntInfo);

}
