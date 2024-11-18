package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;

@Mapper
public interface RAA09BMapper {

	void insertSndCndt(IBDEALInfo param);

	void deleteSndCndt(IBDEALInfo param);

}