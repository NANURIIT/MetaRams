package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.DS01030SVO.Parameters;


@Mapper
public interface DS01030Mapper {
	
	List<Parameters> getData(Parameters param);

}
