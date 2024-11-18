package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS346BDTO;


@Mapper
public interface IBIMS346BMapper {

	public int deleteIBIMS346B(String param);
	public int selectCntIBIMS346B(String param);
	public int insertIBIMS346B(IBIMS346BDTO param);
	public int updateIBIMS346B(IBIMS346BDTO param);
	public IBIMS346BDTO selectIBIMS346BInfo(String param);
	public List<IBIMS346BDTO> selectIBIMS346BListInfo(String param);
	public int insertIntrtInfoList(List<IBIMS346BDTO> param);
	
}
