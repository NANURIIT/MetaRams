package com.nanuri.rams.business.assessment.tb07.tb07130;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS451BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS451BMapper;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07130ServiceImpl implements TB07130Service {

	private final IBIMS451BMapper ibims451bMapper;
	
	/**
	 * 회계대사내역
	 */
	@Override
	public List<IBIMS451BDTO> selectIBIMS451B(IBIMS451BDTO param){
		List<IBIMS451BDTO> result = ibims451bMapper.selectIBIMS451B(param);
		return result;
	};

	@Override
	public List<IBIMS410BVO> thdtTrDtlsGetData(IBIMS451BDTO param){
		List<IBIMS410BVO> result = ibims451bMapper.thdtTrDtlsGetData(param);
		return result;
	};

	
	
} // class end