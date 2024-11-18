package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS107BDTO;
import com.nanuri.rams.business.common.vo.IBIMS107BVO;

@Mapper
public interface IBIMS107BMapper {

	List<IBIMS107BVO> getInsGrdInfo(IBIMS107BDTO insGrdInfo);

	int deleteInsGrdInfo(IBIMS107BDTO insGrdInfo);

	int registInsGrdInfo(IBIMS107BDTO raa05bDTO);

	int updateInsGrdInfo(IBIMS107BDTO raa05bDTO);

}
