package com.nanuri.rams.business.assessment.tb06.tb06080;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB06080ServiceImpl implements TB06080Service {
	
	private final AuthenticationFacade facade;

	private final IBIMS231BMapper ibims231bMapper;
	private final IBIMS232BMapper ibims232bMapper;

	@Override
	public List<IBIMS231BVO> inqTB06080S(IBIMS231BDTO paramData) {
		paramData.setHndEmpno(facade.getDetails().getEno());
		return ibims231bMapper.inqTB06080S(paramData);
	}

	@Override
	public List<IBIMS232BVO> dcfcList(IBIMS231BDTO paramData) {
		return ibims232bMapper.dcfcList(paramData);
	}
}
