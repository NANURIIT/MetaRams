package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS213BDTO;


@Mapper
public interface IBIMS213BMapper {
	List<IBIMS213BDTO> prfdRankInfo(IBIMS213BDTO paramData);
	int insertIBIMS213B(List<IBIMS213BDTO> prfdRankList);
	int delete213B(IBIMS213BDTO dtoParam);

}
