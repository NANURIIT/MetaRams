package com.nanuri.rams.business.assessment.tb08.tb08036;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.dto.IBIMS611BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS601BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS602BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS603BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS611BMapper;
import com.nanuri.rams.business.common.vo.IBIMS220BVO;
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
		List<IBIMS602BDTO> s602b = new ArrayList<IBIMS602BDTO>();
		List<IBIMS603BDTO> s603b = new ArrayList<IBIMS603BDTO>();
		List<IBIMS611BDTO> s611b = new ArrayList<IBIMS611BDTO>();

		result = ibims601BMapper.selectIBIMS601B(param);
		s602b = ibims602BMapper.selectIBIMS602B(param);
		s603b = ibims603BMapper.selectIBIMS603B(param);
		s611b = ibims611BMapper.selectIBIMS611B(param);
		
		if(s611b.size() > 0) {
			result.setListMonthStep(s611b);//월별공사및분양형황
		}
		if(s602b.size() > 0) {
			result.setListInspctRmrk(s602b);	// 당월사업관리의견	
		}
		if(s603b.size() > 0) {
			result.setListEtc(s603b);//기타사후관리
		}		

		return result;
	}

	@Override
	public int modifyDealInfo(IBIMS601BVO param) {
		int result;
		param.setHndEmpno(facade.getDetails().getEno()); //사원
		
		// 분양수지관리
		ibims601BMapper.deleteIBIMS601B(param);
		result = ibims601BMapper.insertIBIMS601B(param);		
		
		// 월별 공사 및 분양 현황		
		ibims611BMapper.deleteIBIMS611B(param);
		
		if(param.getListMonthStep() != null && !param.getListMonthStep().isEmpty()) {
			
			for(int i = 0; param.getListMonthStep().size() > i; i ++) {
				System.out.println(">>> deal ["+param.getListMonthStep().get(i).getDealNo()+"] <<<<<<<");
				param.getListMonthStep().get(i).setHndEmpno(facade.getDetails().getEno());
			}
			ibims611BMapper.insertIBIMS611B(param);
			
		}			
		
		 return result;
		
	}

	//월별사업관리 등록
	@Override
	public int insertIBIMS602B(IBIMS602BDTO param) {
		IBIMS601BVO deleteParam = new IBIMS601BVO();
		deleteParam.setDealNo(param.getDealNo());
		deleteParam.setInspctYm(param.getInspctYm());
		ibims602BMapper.deleteIBIMS602B(deleteParam);
		param.setHndEmpno(facade.getDetails().getEno());
		return ibims602BMapper.insertIBIMS602B(param);
	
	}

	// 기타사후관리 등록
	@Override
	public int insertIBIMS603B(IBIMS603BDTO param) {
		IBIMS601BVO deleteParam = new IBIMS601BVO();
		deleteParam.setDealNo(param.getDealNo());
		deleteParam.setInspctDt(param.getInspctDt());
		ibims603BMapper.deleteIBIMS603B(deleteParam);
    param.setHndEmpno(facade.getDetails().getEno());
    return ibims603BMapper.insertIBIMS603B(param);
    
	}


	@Override
	public int deleteDealInfo(IBIMS601BVO param) {	
		ibims602BMapper.deleteIBIMS602B(param);
		ibims603BMapper.deleteIBIMS603B(param);
		ibims611BMapper.deleteIBIMS611B(param);
		return ibims601BMapper.deleteIBIMS601B(param);			
	}
	@Override
	public int deleteIBIMS602B(IBIMS601BVO param) {
		return ibims602BMapper.deleteIBIMS602B(param);		
	}

	@Override
	public int deleteIBIMS611B(IBIMS601BVO param) {
		return ibims611BMapper.deleteIBIMS611B(param);		
	}

	@Override
	public int deleteIBIMS603B(IBIMS601BVO param) {
		return ibims603BMapper.deleteIBIMS603B(param);		
	}

}
