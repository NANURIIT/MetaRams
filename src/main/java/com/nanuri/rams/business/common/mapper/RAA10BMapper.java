package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA10BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.RAA31BVO;

@Mapper
public interface RAA10BMapper {

	RAA10BDTO selectRaa10b(RAA31BVO.SearchParam searchParam);

	int updateRaa10b(RAA10BDTO raa10b);

	void insertEtcCndt(IBDEALInfo param);

	void deleteEtcCndt(IBDEALInfo param);
	
	
	
}