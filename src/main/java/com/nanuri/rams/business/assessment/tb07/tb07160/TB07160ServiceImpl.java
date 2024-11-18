package com.nanuri.rams.business.assessment.tb07.tb07160;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS201BMapper;
import com.nanuri.rams.business.common.vo.TB07160SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07160ServiceImpl implements TB07160Service{

    private final IBIMS201BMapper ibims201bMapper;

    @Override
    public TB07160SVO getTrrcInf(TB07160SVO param){
        //log.debug("paramCheck!!!!!");
        return ibims201bMapper.getTrrcInf(param.getPrdtCd());
    }
    
}
