package com.nanuri.rams.business.assessment.tb09.tb09060;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS981BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS437BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB09060ServiceImpl implements TB09060Service {

    @Autowired
    private final IBIMS436BMapper ibims436bMapper;
    private final IBIMS437BMapper ibims437bMapper;

    @Autowired
    private AuthenticationFacade facade;
    
    @Override
    public List<IBIMS436BVO> getOvduDtls(IBIMS436BVO param){
        return ibims436bMapper.getOvduDtls(param);
    }

    @Override
    public List<IBIMS437BDTO> getOvduDailyDtls(IBIMS437BDTO param){
        return ibims437bMapper.getOvduDailyDtls(param);
    }

    @Override
    public int saveDcsn(IBIMS436BVO param){
        return ibims436bMapper.saveDcsn(param);
    }
}