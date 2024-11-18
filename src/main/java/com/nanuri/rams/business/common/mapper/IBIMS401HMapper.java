package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.nanuri.rams.business.common.dto.IBIMS401BDTO;

@Mapper
public interface IBIMS401HMapper {

	public int insertIBIMS401H(IBIMS401BDTO param);

}
