package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS110BDTO;
import com.nanuri.rams.business.common.vo.IBIMS110BVO;

@Mapper
public interface IBIMS110BMapper {

	List<IBIMS110BVO> getCmplInfo(IBIMS110BDTO cmplInfo);

	int deleteCmplInfo(IBIMS110BDTO cmplInfo);

	int registCmplInfo(IBIMS110BDTO cmplInfo);

	int updateCmplInfo(IBIMS110BDTO cmplInfo);

}
