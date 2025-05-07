package com.nanuri.rams.business.assessment.tb05.tb05040;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS103BMapper;
import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;
import com.nanuri.rams.business.common.vo.TB05040SVO;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.code.InspctCnfrncCcdEnum;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.com.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB05040ServiceImpl implements TB05040Service {

	// private final RAA02BMapper raa02bMapper;
	// private final RAA91BMapper raa91bMapper;
	private final IBIMS103BMapper ibims103BMapper;

	private final AuthenticationFacade facade;

	// Deal 목록 조회
	@Override
	public List<IBIMS103BVO> getDealList(IBIMS103BVO paramData) { return ibims103BMapper.getDealList(paramData); }

	// Deal 상세조회
	@Override
	public TB05040SVO getDealDetail(IBIMS103BDTO paramData) { 
		TB05040SVO vo = new TB05040SVO();

		vo = ibims103BMapper.getDealDetail(paramData);
		
		if (vo == null) {
			return vo = new TB05040SVO();
		}
		
		return vo;
	}


}
