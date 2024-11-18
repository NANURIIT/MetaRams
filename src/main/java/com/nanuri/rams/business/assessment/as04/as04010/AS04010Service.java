package com.nanuri.rams.business.assessment.as04.as04010;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;

@Service
public interface AS04010Service {

	// Deal 목록 조회
	List<AS04010SVO> getDealList(RAA02BDTO dealDto);

	// Deal 목록 조회
	AS04010SVO getDealDetail(RAA02BDTO dealDto);

	// 협의체부의 저장
	Map<String, Object> saveDealInfo(AS04010SVO paramData);

	// 협의체부의 변경
	Map<String, Object> updateDealInfo(AS04010SVO paramData);

}
