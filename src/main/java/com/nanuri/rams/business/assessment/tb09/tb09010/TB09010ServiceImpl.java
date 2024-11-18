package com.nanuri.rams.business.assessment.tb09.tb09010;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS604BMapper;
import com.nanuri.rams.business.common.vo.IBIMS604BVO;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.ExmntInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB09010ServiceImpl implements TB09010Service {

	private final IBIMS604BMapper ibims604bMapper;
	
	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS604BVO.DealInfo> checkDealSearch(IBIMS604BVO.SearchVO searchVO) {
		return ibims604bMapper.checkDealSearch(searchVO);
	}

	@Override
	public int saveDealExmnt(ExmntInfo exmntInfo, Map<String, Object> userAuth) {

		exmntInfo.setHndEmpno(facade.getDetails().getEno());

		return ibims604bMapper.saveDealExmnt(exmntInfo);
	}
}
