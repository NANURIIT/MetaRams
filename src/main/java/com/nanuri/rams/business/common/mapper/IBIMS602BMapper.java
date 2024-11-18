package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;

@Mapper
public interface IBIMS602BMapper {

	IBIMS602BDTO selectIBIMS602B(IBIMS601BVO param);

	int insertIBIMS602B(IBIMS601BVO param);

	int updateIBIMS602B(IBIMS601BVO param);

	void deleteIBIMS602B(IBIMS601BVO param);

}
