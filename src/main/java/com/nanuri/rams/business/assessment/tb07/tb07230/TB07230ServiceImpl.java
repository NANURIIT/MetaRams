package com.nanuri.rams.business.assessment.tb07.tb07230;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS902BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS902BMapper;
import com.nanuri.rams.business.common.vo.IBIMS902BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07230ServiceImpl implements TB07230Service {

	private final IBIMS902BMapper ibims902bMapper;
	@Autowired
	   private AuthenticationFacade facade;

	@Override
	public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param){
		return ibims902bMapper.selectTB07230S(param);
	}

	/**
	 * SPC별 거래내역 저장
	 */
	@Override
	public int saveRecalculateBalance(IBIMS902BVO param) {
		int result = 0; //반환값 (0:: 에러 1:: 성공)
		
//		IBIMS902BDTO updateParam = new IBIMS902BDTO();
		List<IBIMS902BDTO> saveList  =  param.getLst902bdto();
		 
		param.setHndEmpno(facade.getDetails().getEno());
		
        if(saveList.size() > 0){
            log.debug("[saveRecalculateBalance] SPC별 거래내역 저장");
            
            for(IBIMS902BDTO ibims902BDTO: saveList){
            	ibims902BDTO.setHndEmpno(facade.getDetails().getEno());
            	result = ibims902bMapper.updateTransaction(ibims902BDTO);
            }
            
            result = ibims902bMapper.saveRecalculateBalance(param);

        }else{
            log.debug("[saveRecalculateBalance] SPC별 거래내역 없음");
        }
        
		return result;
	}

}