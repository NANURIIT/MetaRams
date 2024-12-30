package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.vo.IBIMS209BVO;

@Mapper
public interface IBIMS209BMapper {

	int insert209B(IBIMS209BVO param);

	int update209B(IBIMS209BVO param);

	IBIMS209BDTO select209B(IBIMS209BVO param);

	int deleteIBIMS209B(IBIMS209BDTO param);
	
	int deleteIBIMS209BbyPrdtCd(String prdtCd);

}
