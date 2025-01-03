package com.nanuri.rams.business.assessment.tb07.tb07180;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS421BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07180ServiceImpl implements TB07180Service {
	
	private final IBIMS421BMapper ibims421bMapper;
	
	private final AuthenticationFacade facade;

	@Override
	public List<IBIMS421BDTO> IBIMS421BSelect(String feeName){		
		return ibims421bMapper.IBIMS421BSelect(feeName);
	};
	
	@Override
	public int IBIMS421BInsert(IBIMS421BDTO param){
		param.setHndEmpno(facade.getDetails().getEno());
		
		return ibims421bMapper.IBIMS421BInsert(param);
	};

	@Override
	public int IBIMS421BUpdate(IBIMS421BDTO param){
		param.setHndEmpno(facade.getDetails().getEno());
		return ibims421bMapper.IBIMS421BUpdate(param);
	};
	
	@Override
	public int IBIMS421BSave(IBIMS421BDTO param){
		param.setHndEmpno(facade.getDetails().getEno());
		return ibims421bMapper.mergeFeeKndCd(param);
	};

	@Override
	public int IBIMS421BDelete(IBIMS421BDTO param){
		return ibims421bMapper.IBIMS421BDelete(param);
	};
	
	/**
	 * 셀렉트박스 코드, 밸류 취득
	 */
	@Override
	public List<Map<String, Object>> getSelectBox() {
		return ibims421bMapper.getSelectBox();
	}
	
}