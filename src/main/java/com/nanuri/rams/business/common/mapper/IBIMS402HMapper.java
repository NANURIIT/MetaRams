package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.vo.IBIMS402HVO;

@Mapper
public interface IBIMS402HMapper {

	public int insertIBIMS402H(IBIMS402BDTO param);

	public List<IBIMS402HVO> selectIBIMS402HList(String prdtCd);
	
	public int insertIBIMS402HTr(IBIMS402BDTO param);
	
	public int updateChgSttsCd402H(IBIMS402HVO param);

	public int deleteIBIMS402H(IBIMS402BDTO param);
	
	public IBIMS402BDTO selectLastIBIMS402H(IBIMS402BDTO param);
	
	public IBIMS402BDTO selectBfSnIBIMS402H(IBIMS402BDTO param);
	

}
