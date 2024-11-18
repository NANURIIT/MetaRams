package com.nanuri.rams.business.common.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.nanuri.rams.business.common.dto.IBIMS993BDTO;

@Mapper
/*
 * 펀드정보
 * */
public interface IBIMS993BMapper {
	// 조회
	public List<IBIMS993BDTO> getFndList(IBIMS993BDTO param);
	
}
