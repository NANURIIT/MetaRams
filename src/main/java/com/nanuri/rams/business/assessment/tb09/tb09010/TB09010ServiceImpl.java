package com.nanuri.rams.business.assessment.tb09.tb09010;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS604BMapper;
import com.nanuri.rams.business.common.vo.IBIMS604BVO;
import com.nanuri.rams.business.common.dto.IBIMS604BDTO;
import com.nanuri.rams.business.common.vo.IBIMS604BVO.ExmntInfo;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB09010ServiceImpl implements TB09010Service {

	private final IBIMS604BMapper ibims604bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public List<IBIMS604BVO.DealInfo> checkDealSearch(IBIMS604BVO.SearchVO searchVO) {

		log.debug("getEmpno()" + searchVO.getEmpno());
		return ibims604bMapper.checkDealSearch(searchVO);
	}

	@Override
	public int saveDealExmnt(ExmntInfo exmntInfo, Map<String, Object> userAuth) {

		exmntInfo.setHndEmpno(facade.getDetails().getEno());

		List<IBIMS604BDTO> lstData = ibims604bMapper.selectIBIMS604B(exmntInfo);

		log.debug("saveDealExmnt start");
		log.debug("getHndEmpno()" + exmntInfo.getHndEmpno());

		if (lstData.isEmpty() || lstData.size() == 0) {
			// 등록
			return ibims604bMapper.insertIBIMS604B(exmntInfo);
		} else {
			// 수정
			return ibims604bMapper.saveDealExmnt(exmntInfo);
		}

	}
}
