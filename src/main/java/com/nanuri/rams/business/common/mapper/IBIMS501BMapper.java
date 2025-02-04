package com.nanuri.rams.business.common.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS501BVO;


@Mapper
public interface IBIMS501BMapper {
	
	// 투자자산사업기본 조회
	public IBIMS501BVO getBusiBssInfo(IBIMS501BVO param);
	
	// 투자자산사업기본 등록
	public int saveBusiBssInfo(IBIMS501BVO param);

	public IBIMS501BVO getBusiBssInfo501B(IBIMS501BVO param);

	public int getMaxSn501B(String dealNo);

	public int getNextSn501B(String dealNo);
	
	
}
