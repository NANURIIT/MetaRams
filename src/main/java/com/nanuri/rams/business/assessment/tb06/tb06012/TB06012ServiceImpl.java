package com.nanuri.rams.business.assessment.tb06.tb06012;

import org.apache.xpath.operations.Number;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS208BDTO;
import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS208BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS209BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;
import java.lang.Integer;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06012ServiceImpl implements TB06012Service {

	private final IBIMS208BMapper ibims208bMapper;
	private final IBIMS209BMapper ibims209bMapper;
	
	private final AuthenticationFacade facade;

	@Override
	public int delAppvCndtList(IBIMS208BDTO delParam) {
		IBIMS209BDTO ibims209bdto = new IBIMS209BDTO();
		if (delParam.getSn() != "0") {
			ibims209bdto.setDealNo(delParam.getDealNo());
			ibims209bdto.setApvlCndSn(Integer.parseInt(delParam.getSn()));
			ibims209bMapper.deleteIBIMS209B(ibims209bdto);
		}
		return ibims208bMapper.deleteAppvCndtList(delParam);
	}

	

}
