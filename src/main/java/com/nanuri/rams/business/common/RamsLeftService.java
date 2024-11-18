package com.nanuri.rams.business.common;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;

@Service
public interface RamsLeftService {

    public List<IBIMS005BDTO> createRamsNav(String param);

}