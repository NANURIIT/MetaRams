package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS106BDTO;
import com.nanuri.rams.business.common.vo.IBIMS106BVO;

@Mapper
public interface IBIMS106BMapper {

	List<IBIMS106BVO> getRelatedCompanyInfo(IBIMS106BDTO cncCmpnyInfo);

	int deleteCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

	int registCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

	int updateCncCmpnyInfo(IBIMS106BDTO cncCmpnyInfo);

}
