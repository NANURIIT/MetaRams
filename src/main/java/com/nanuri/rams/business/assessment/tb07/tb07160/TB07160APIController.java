package com.nanuri.rams.business.assessment.tb07.tb07160;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB07160SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07160S")
@RequiredArgsConstructor
@RestController
public class TB07160APIController {

    private final TB07160Service tb07160Service;
    
    @PostMapping(value = "/getTrrcInf")
    public TB07160SVO getTrrcInf(@RequestBody TB07160SVO param){
        return tb07160Service.getTrrcInf(param);
    }
}
