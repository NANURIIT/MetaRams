package com.nanuri.rams.business.assessment.dm33.dm33010p;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA02BMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DM33010pServiceImpl implements DM33010pService {

	private final RAA02BMapper raa02bMapper;

	// 매핑 목록 조회
	@Override
	public List<Map<String, Object>> getRiskRcgNoList(HashMap<String, Object> param) {
		return raa02bMapper.getRiskRcgNoList(param);
	}

	/*
	 * // 사후관리 현황보고 모니터링 사항 저장
	 * 
	 * @Override public int mergeMntrCntnt(RAA65BDTO inputParam) {
	 * inputParam.setFstRgstPEno(facade.getDetails().getEno());
	 * inputParam.setHndlPEno(facade.getDetails().getEno());
	 * inputParam.setHndlDprtCd(facade.getDetails().getDprtCd()); return
	 * pm22110Mapper.mergeMntrCntnt(inputParam); }
	 * 
	 */

}
