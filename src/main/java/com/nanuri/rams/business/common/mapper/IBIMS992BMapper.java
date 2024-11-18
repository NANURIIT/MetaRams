package com.nanuri.rams.business.common.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;

@Mapper
/*
 * 금융기관정보
 * */
public interface IBIMS992BMapper {
	// 조회
	public List<IBIMS992BDTO> getFnltList(IBIMS992BDTO param);
	
}
