package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.IBIMS220BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO2;

@Mapper
public interface IBIMS220BMapper {

	List<IBIMS220BVO> getIBIMS220BDTOInfo(IBIMS220BVO param);
	
	int saveIBIMS220BDTOInfo(List<IBIMS220BVO> param);
	
	int delIBIMS220BDTOInfo(String param);
}
