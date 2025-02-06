package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS506BDTO;
import com.nanuri.rams.business.common.vo.IBIMS501BVO;
import com.nanuri.rams.business.common.vo.IBIMS506BVO;

@Mapper
public interface IBIMS506BMapper {
	
	// PEF사업기본 조회
	public IBIMS506BVO getPefInfo(IBIMS501BVO param);
	
	// PEF사업기본 등록
	public int savePefInfo(IBIMS501BVO param);
	
	// PEF사업기본 수정
	public int updatePefInfo(IBIMS506BDTO param);

}
