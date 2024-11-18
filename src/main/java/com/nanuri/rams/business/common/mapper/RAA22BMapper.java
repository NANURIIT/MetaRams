package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA22BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.DealInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.SearchVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface RAA22BMapper {
	
	public RAA22BDTO selectCnfrncInfo(String inspctCnfrncCcd);						// 심사안건접수 - 협의체회차정보 조회
	
	public int insertRAA22BInfo(RAA22BDTO dto);										// 협의체준비 - 협의체안건상세 생성
	
	public int updateRAA22BInfo(RAA22BDTO raa22bDTO);								// 협의체준비 - 협의체안건상세 갱신

	public RAA22BDTO selectRAA22BInfo(RAA22BDTO raa22bDTO);							// 협의체준비 - 협의체안건상세 조회

	public void deleteRAA22BInfo(RAA22BDTO raa22bDTO);

	public int getMaxRnkNo(RAA23BDTO deleteInfo);

	public int[] selectRnkNoInfo(RAA22BDTO raa22bDTO);

	public int updateRnkNoRAA22B(Map<String, Object> input);

	public void updateIBDEALInfo(IBDEALInfo param);

	public List<DealInfo> as04310sSelectCaseInfo(SearchVO paramData);

}
