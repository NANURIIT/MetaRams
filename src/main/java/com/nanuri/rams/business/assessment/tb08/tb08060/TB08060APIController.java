package com.nanuri.rams.business.assessment.tb08.tb08060;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS820BDTO;
import com.nanuri.rams.business.common.vo.TB08060SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB08060S")
@RequiredArgsConstructor
@RestController
public class TB08060APIController {

    private final TB08060Service tb08060Service;

    //월말결산 조회
    @GetMapping(value = "/getSettlementList")
    public List<TB08060SVO> getSettlementList(TB08060SVO param){
        return tb08060Service.getSettlementList(param);
    }

    //월말결산 업데이트
    @PostMapping(value = "/saveSettlement")
    public int saveSettlement(@RequestBody List<IBIMS820BDTO> paramList){
        log.debug("saveSettlement APIController!!!");

        return tb08060Service.saveSettlement(paramList);
    }
    
}
