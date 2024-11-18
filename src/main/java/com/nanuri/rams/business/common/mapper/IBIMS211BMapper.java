package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.TB06013PVO;

@Mapper
public interface IBIMS211BMapper {
	
	List<TB06013PVO> getMrtgInfo(TB06013PVO searchParam);

	int insertIBIMS211B(TB06013PVO searchParam);
	
	String makeMrtgMngmNo(TB06013PVO searchParam);

	TB06013PVO mrtgInfoDetails(TB06013PVO searchParam);

	int updateIBIMS211B(TB06013PVO searchParam);	

}
