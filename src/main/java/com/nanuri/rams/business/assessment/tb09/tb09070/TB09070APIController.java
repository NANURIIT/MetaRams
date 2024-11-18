package com.nanuri.rams.business.assessment.tb09.tb09070;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB09070SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB09070S")
@RequiredArgsConstructor
@RestController
public class TB09070APIController {

    private final TB09070Service tb09070Service;
    
    //상환대상내역 조회
    @PostMapping(value = "/rdmpTrgtDtlsInq")
    public List<TB09070SVO.RdmpTrgtDtlsVO> rdmpTrgtDtlsInq(@RequestBody TB09070SVO param){
        return tb09070Service.rdmpTrgtDtlsInq(param);
    }

}
