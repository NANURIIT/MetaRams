package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS505BDTO;
import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS505BVO;

@Mapper
public interface IBIMS505BMapper {
	
	// 국제투자사업기본 조회
	public IBIMS505BVO getInvstInfo(IBIMS501BVO param);
	
	// 국제투자사업기본 등록
	public int saveInvstInfo(IBIMS501BVO param);
	
	// 국제투자사업기본 수정
	public int updateInvstInfo(IBIMS505BDTO param);
}
