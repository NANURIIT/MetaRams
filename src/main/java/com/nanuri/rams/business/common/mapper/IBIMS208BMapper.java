package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS208BDTO;
import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.vo.IBIMS208BVO;

@Mapper
public interface IBIMS208BMapper { 
	
	int insert208B(IBIMS208BDTO param);

	List<IBIMS208BVO> select208B(IBIMS208BDTO param);

	int update208B(IBIMS208BDTO param);

	IBIMS208BDTO getIBIMS208BDTOInfo(IBIMS209BDTO param);
	
	int deleteAppvCndtList(IBIMS208BDTO param);
}
