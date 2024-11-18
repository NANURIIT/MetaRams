package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.MO44010SVO;
import com.nanuri.rams.business.common.vo.MO44010SVO.DealInfo;

@Mapper
public interface MO44010Mapper {

	// deal 정보 취득
	List<MO44010SVO.DealInfo> checkDealSearch(MO44010SVO.SearchVO pacmInfo);

	// 조치사항 저장
	int saveDealExmnt(MO44010SVO.ExmntInfo exmntInfo);

}
