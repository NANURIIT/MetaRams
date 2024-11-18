package com.nanuri.rams.business.common.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;

import java.util.List;

@Mapper
public interface AS04010Mapper {

	// deal 정보 취득
	List<AS04010SVO> getDealIfno(AS04010SVO as04010s);

	// 협의체부의 저장
	void saveDealInfo(AS04010SVO paramData);

}
