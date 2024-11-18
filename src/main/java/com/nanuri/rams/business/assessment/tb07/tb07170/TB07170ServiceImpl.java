package com.nanuri.rams.business.assessment.tb07.tb07170;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS430BMapper;

import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;

import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07170ServiceImpl implements TB07170Service {
    
    private final IBIMS430BMapper ibims430bMapper;

    @Override
    public List<IBIMS430BVO> getDptrDtlsList(IBIMS430BDTO param){
        // log.debug("getDptrDtlsList param check!!!!");

        // log.debug("param.rctmDT:::" + param.getRctmDt());

        return ibims430bMapper.getDptrDtlsList(param);
    }
}
