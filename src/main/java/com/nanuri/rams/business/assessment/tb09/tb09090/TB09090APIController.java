package com.nanuri.rams.business.assessment.tb09.tb09090;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS701BDTO;
import com.nanuri.rams.business.common.dto.IBIMS702BDTO;
import com.nanuri.rams.business.common.dto.IBIMS703BDTO;
import com.nanuri.rams.business.common.dto.IBIMS704BDTO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.business.common.vo.IBIMS701BVO;
import com.nanuri.rams.business.common.vo.IBIMS702BVO;
import com.nanuri.rams.business.common.vo.IBIMS703BVO;
import com.nanuri.rams.business.common.vo.IBIMS704BVO;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB09090S")
@RequiredArgsConstructor
@RestController
public class TB09090APIController {

    private final TB09090Service tb09090service;

    @PostMapping(value = "/getCpcList")
    public List<IBIMS704BDTO> selectIBIMS704B(@RequestBody IBIMS704BVO data) {
        return tb09090service.selectIBIMS704B(data);
    }

    @PostMapping(value = "/selectIBIMS701B")
    public List<IBIMS701BDTO> selectIBIMS701B(@RequestBody IBIMS701BVO data) {
        return tb09090service.selectIBIMS701B(data);
    }

    @PostMapping(value = "/selectIBIMS702B")
    public List<IBIMS702BDTO> selectIBIMS702B(@RequestBody IBIMS702BVO data) {
        return tb09090service.selectIBIMS702B(data);
    }

    @PostMapping(value = "/selectIBIMS703B")
    public List<IBIMS703BDTO> selectIBIMS703B(@RequestBody IBIMS703BVO data) {
        return tb09090service.selectIBIMS703B(data);
    }

    @PostMapping(value = "/insertIBIMS701B")
    public int insertIBIMS701B(@RequestBody IBIMS701BVO data) {
        return tb09090service.insertIBIMS701B(data);
    }

    @PostMapping(value = "/insertIBIMS702B")
    public int insertIBIMS702B(@RequestBody IBIMS702BVO data) {
        return tb09090service.insertIBIMS702B(data);
    }

    @PostMapping(value = "/insertIBIMS703B")
    public int insertIBIMS703B(@RequestBody IBIMS703BVO data) {
        return tb09090service.insertIBIMS703B(data);
    }
}
