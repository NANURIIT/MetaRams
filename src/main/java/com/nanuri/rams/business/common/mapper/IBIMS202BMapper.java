package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS202BDTO;

@Mapper
public interface IBIMS202BMapper {

	IBIMS202BDTO selectIBIMS202BDTOInfo(IBIMS202BDTO param);

	int insertIBIMS202BDTOInfo(IBIMS202BDTO param);

	int updateIBIMS202BDTOInfo(IBIMS202BDTO param);

}
