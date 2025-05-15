package com.nanuri.rams.business.common.tt;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TT03040SMapper {
	public List<TT03040SVO> ibSpecSearch(TT03040SDTO data);
}
