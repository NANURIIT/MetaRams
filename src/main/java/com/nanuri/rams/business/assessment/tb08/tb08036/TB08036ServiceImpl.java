package com.nanuri.rams.business.assessment.tb08.tb08036;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS601BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS602BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS603BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS611BMapper;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;
import com.nanuri.rams.business.common.vo.IBIMS611BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB08036ServiceImpl implements TB08036Service {

	private final IBIMS601BMapper ibims601BMapper;
	private final IBIMS602BMapper ibims602BMapper;
	private final IBIMS603BMapper ibims603BMapper;
	private final IBIMS611BMapper ibims611BMapper;

	private final AuthenticationFacade facade;

	@Override
	@Transactional
	public IBIMS601BVO getDealInfo(IBIMS601BVO param) {

		IBIMS601BVO result = new IBIMS601BVO();
		IBIMS602BDTO s602b = new IBIMS602BDTO();
		List<IBIMS603BDTO> s603b = new ArrayList<IBIMS603BDTO>();
		List<IBIMS611BVO> s611b = new ArrayList<IBIMS611BVO>();

		result = ibims601BMapper.selectIBIMS601B(param);
		s602b = ibims602BMapper.selectIBIMS602B(param);
		s603b = ibims603BMapper.selectIBIMS603B(param);
		s611b = ibims611BMapper.selectIBIMS611B(param);
		
		if(null != s602b) {
			result.setInspctYm(s602b.getInspctYm());
			result.setInspctRmrk(s602b.getCheckRslt());
		}
		if(s603b.size() > 0) {
			result.setLstInspctRmrk(s603b);
		}		
		if(s611b.size() > 0) {
			result.setIbims611bdto(s611b);
		}

		return result;
	}

	@Override
	public void modifyDealInfo(IBIMS601BVO param) {
		
		int rtnValue = 0;
		
		param.setHndEmpno(facade.getDetails().getEno());
		
		ibims601BMapper.deleteIBIMS601B(param);
		rtnValue = ibims601BMapper.insertIBIMS601B(param);
		
		if((param.getInspctRmrk() != null ) 
		&& (param.getInspctYm() != null ))
		{
			ibims602BMapper.deleteIBIMS602B(param);
			rtnValue = ibims602BMapper.insertIBIMS602B(param);
		}
		
		ibims603BMapper.deleteIBIMS603B(param);
		
		if(param.getLstInspctRmrk().size() > 0) {
			for(int i = 0; param.getLstInspctRmrk().size() > i; i ++) {
				param.getLstInspctRmrk().get(i).setHndEmpno(facade.getDetails().getEno());
			}
			rtnValue = ibims603BMapper.insertIBIMS603B(param);
		}	
		ibims611BMapper.deleteIBIMS611B(param);
		if(param.getIbims611bdto().size() > 0) {
			for(int i = 0; param.getIbims611bdto().size() > i; i ++) {
				System.out.println(">>> deal ["+param.getIbims611bdto().get(i).getDealNo()+"] <<<<<<<");
				param.getIbims611bdto().get(i).setHndEmpno(facade.getDetails().getEno());
			}
			rtnValue = ibims611BMapper.insertIBIMS611B(param.getIbims611bdto());
		}			
	}

	@Override
	public void deleteDealInfo(IBIMS601BVO param) {
		
		ibims601BMapper.deleteIBIMS601B(param);
		ibims602BMapper.deleteIBIMS602B(param);
		ibims603BMapper.deleteIBIMS603B(param);
		ibims611BMapper.deleteIBIMS611B(param);
		
	}

}
