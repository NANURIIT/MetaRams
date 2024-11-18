package com.nanuri.rams.business.assessment.mo44.mo44010S;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA30BMapper;
import com.nanuri.rams.business.common.vo.MO44010SVO;
import com.nanuri.rams.business.common.vo.MO44010SVO.ExmntInfo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MO44010ServiceImpl implements MO44010Service {

	// private final MO44010Mapper mo44010Mapper;

	private final RAA30BMapper raa30bMapper;

	@Override
	public List<MO44010SVO.DealInfo> checkDealSearch(MO44010SVO.SearchVO searchVO) {
		return raa30bMapper.checkDealSearch(searchVO);
	}

	@Override
	public int saveDealExmnt(ExmntInfo exmntInfo, Map<String, Object> userAuth) {

		exmntInfo.setHndlDprtCd(userAuth.get("dprtCd").toString());
		exmntInfo.setHndlPEno(userAuth.get("eno").toString());

		return raa30bMapper.saveDealExmnt(exmntInfo);
	}
}
