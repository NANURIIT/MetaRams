package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS105BDTO;
import com.nanuri.rams.business.common.dto.IBIMS205BDTO;
import com.nanuri.rams.business.common.vo.IBIMS105BVO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

@Mapper
public interface IBIMS105BMapper {

	List<IBIMS105BVO> getAssetInfo(IBIMS105BDTO assetInfo);
	
	// 종목 등록 시 종목에 기초자산정보도 같이 담아주기위한 조회 RETURN 205B
	List<IBIMS205BDTO> getAssetInfoBy201bDTO(IBIMS201BVO ibims201bDTO);

	int deleteAssetInfo(IBIMS105BDTO assetInfo);

	int updateAssetInfo(IBIMS105BDTO raa03bDTO);

	int registAssetInfo(IBIMS105BDTO raa03bDTO);

}
