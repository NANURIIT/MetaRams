package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS205BDTO;
import com.nanuri.rams.business.common.vo.IBIMS205BVO;

@Mapper
public interface IBIMS205BMapper {
	
	List<IBIMS205BVO> selectIBIMS205B(String prdtCd);
	
	int insertIBIMS205B(IBIMS205BDTO ibims205bDTO);
	
	int updateIBIMS205B(IBIMS205BDTO ibims205bDTO);
	
	int deleteIBIMS205B(String prdtCd);
	
	int deleteOneIBIMS205B(IBIMS205BDTO ibims205bDTO);
}
