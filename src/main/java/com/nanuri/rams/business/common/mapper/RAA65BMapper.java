package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA65BDTO;

@Mapper
/*
 * 부실자산파일첨부정보
 */
public interface RAA65BMapper {

	int mergeMntrCntnt(RAA65BDTO inputParam);

}
