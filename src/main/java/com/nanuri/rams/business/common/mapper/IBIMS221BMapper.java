package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS221BDTO;
import com.nanuri.rams.business.common.vo.IBIMS222BVO;

@Mapper
public interface IBIMS221BMapper {

	List<IBIMS222BVO> getBaseAsst(IBIMS222BVO param);

	int rgstAsstIBIMS221B(IBIMS222BVO param);

	int mdfAsstIBIMS221B(IBIMS222BVO param);

	IBIMS221BDTO select221B(IBIMS222BVO param);

}
