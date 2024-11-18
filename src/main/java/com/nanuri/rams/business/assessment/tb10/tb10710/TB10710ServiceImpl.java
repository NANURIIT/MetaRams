package com.nanuri.rams.business.assessment.tb10.tb10710;

import com.nanuri.rams.business.common.mapper.IBIMS981BMapper;
import com.nanuri.rams.business.common.vo.IBIMS981BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10710ServiceImpl implements TB10710Service {

    private final IBIMS981BMapper ibims981bMapper;
	
	@Override
    public List<IBIMS981BVO> selectIBIMS981B(IBIMS981BVO param){
        return ibims981bMapper.selectIBIMS981B(param);
    };
    
}
