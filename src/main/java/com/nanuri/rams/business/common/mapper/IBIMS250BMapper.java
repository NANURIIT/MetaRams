package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS250BDTO;

@Mapper
public interface IBIMS250BMapper {
	
	
	public List<IBIMS250BDTO> selectIBIMS250B(IBIMS250BDTO searchParam);
	// 출자정보 조회
	public List<IBIMS250BDTO> getFincDtls(IBIMS250BDTO param);
	
	// 출자정보 저장
	public int registFinc(IBIMS250BDTO param);

	//출자정보 삭제
	public int deleteFinc(IBIMS250BDTO param);

	//public String getMaxSQ(IBIMS250BDTO param);
	
}
