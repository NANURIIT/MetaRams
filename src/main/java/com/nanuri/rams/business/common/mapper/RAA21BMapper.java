package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA21BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.RAA21BVO.AS04110SVO;
import com.nanuri.rams.business.common.vo.RAA21BVO.CASEVO;

@Mapper
public interface RAA21BMapper {
	
	public RAA21BDTO selectCnfrncInfo(String inspctCnfrncCcd);						// 심사안건접수 - 협의체회차정보 조회

	public int insertCnfrncInfo(RAA21BDTO raa21bDTO);								// 심사안건접수 - 협의체회차정보 생성
	
	public AS04110SVO getLastCNFRNCInfo(AS04110SVO paramData);						// 마지막 협의정보 검색

	public AS04110SVO getCNFRNCInfo(AS04110SVO paramData);							// 협의정보 - 기본정보 검색

	public List<AS04110SVO> getMMBRInfo(AS04110SVO paramData);							// 협의정보 - 위원정보 검색

	public List<CASEVO> getCaseInfo(AS04110SVO paramData);								// 협의정보 - 안건정보 검색

	public void insertRAA21BInfo(AS04110SVO param);

	public void updateRAA21BInfo(AS04110SVO param);

	public int updateCnfrncInfo(RAA21BDTO raa21bDTO);

	public RAA21BDTO selectRAA21BInfo(AS04110SVO param);

	public int deleteCnfrncInfo(RAA21BDTO raa21bDTO);

	// ******** 20230926 mapper변경 ********
	
	public List<CASEInfo> searchCNFRNC(SearchVO paramData);

	public List<MMBRInfo> getMMBRInfoAS04210(SearchVO paramData);

	public List<IBDEALInfo> getIBDEALInfo(SearchVO paramData);
}
