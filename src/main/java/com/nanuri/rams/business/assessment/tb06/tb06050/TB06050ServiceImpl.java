package com.nanuri.rams.business.assessment.tb06.tb06050;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS206BMapper;
import com.nanuri.rams.business.common.vo.IBIMS206BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06050ServiceImpl implements TB06050Service {

	private final AuthenticationFacade facade;

	private final IBIMS206BMapper ibims206bMapper;

	@Override
	public List<IBIMS206BVO> getSPPIData(IBIMS206BVO param){
		return ibims206bMapper.getSPPIData(param);
	};

	@Override
	public int insertSPPIData(IBIMS206BVO param){

		int result;

		int listSize = ibims206bMapper.getSPPIData(param).size();

		if(listSize > 0){
			result = 0;
		}else {
			result = ibims206bMapper.insertSPPIData(param);
		}

		return result;
	};

	@Override
	public int updateSPPIData(IBIMS206BVO param){
		return ibims206bMapper.updateSPPIData(param);
	};

}
