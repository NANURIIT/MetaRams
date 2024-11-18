package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAB98BDTO;

@Mapper
public interface RAB98BMapper {

	List<RAB98BDTO> getBitrKind();

}
