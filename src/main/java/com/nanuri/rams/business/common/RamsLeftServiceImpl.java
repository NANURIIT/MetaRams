package com.nanuri.rams.business.common;

import java.util.List;

import org.apache.bcel.generic.RETURN;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS007BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RamsLeftServiceImpl implements RamsLeftService {

    private final AuthenticationFacade facade;

    private final IBIMS005BMapper ibims005bMapper;
    private final IBIMS007BMapper ibims007bMapper;

    @Override
    public List<IBIMS005BDTO> createRamsNav(String param){
        return ibims005bMapper.createRamsNav(param);
    };

}
