package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS203BDTO;
import com.nanuri.rams.business.common.vo.IBIMS203BVO;

@Mapper
public interface IBIMS203BMapper {

	List<IBIMS203BVO> selectFeeInfoList(String param);
	IBIMS203BDTO selectOneFeeInfo(IBIMS203BDTO param);
	
}
