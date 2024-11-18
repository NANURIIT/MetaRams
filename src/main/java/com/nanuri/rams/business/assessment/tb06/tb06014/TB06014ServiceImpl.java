package com.nanuri.rams.business.assessment.tb06.tb06014;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.mapper.IBIMS221BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS222BMapper;
import com.nanuri.rams.business.common.vo.IBIMS222BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TB06014ServiceImpl implements TB06014Service {
	
	private final AuthenticationFacade facade;
	
	private final IBIMS221BMapper ibims221bMapper;
	private final IBIMS222BMapper ibims222bMapper;

	@Override
	public List<IBIMS222BVO> getBaseAsst(IBIMS222BVO param) {
		return ibims221bMapper.getBaseAsst(param);
	}

	@Override
	@Transactional
	public int rgstAsst(IBIMS222BVO param) {
		
		param.setHndEmpno(facade.getDetails().getEno());
		
		int result = ibims221bMapper.rgstAsstIBIMS221B(param);
		
		if(result > 0) {
			result = ibims222bMapper.rgstAsstIBIMS222B(param);
		}
		
		return result;
	}

	@Override
	public int mdfAsst(IBIMS222BVO param) {
		
		param.setHndEmpno(facade.getDetails().getEno());
		//param.setDelYn("Y");
		
		int result = ibims221bMapper.mdfAsstIBIMS221B(param);
		
		if(result > 0) {
			result = ibims222bMapper.mdfAsstIBIMS222B(param);
		}
		
		return result;
	}

}
