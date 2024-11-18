package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS222BDTO;
import com.nanuri.rams.business.common.vo.IBIMS222BVO;

@Mapper
public interface IBIMS222BMapper {
	
	int rgstAsstIBIMS222B(IBIMS222BVO param);

	int mdfAsstIBIMS222B(IBIMS222BDTO s222b);

	IBIMS222BDTO select222B(IBIMS222BVO param);

}
