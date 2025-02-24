package com.nanuri.rams.business.assessment.tb90.tb9040;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9040B")
@RequiredArgsConstructor
@RestController
public class TB9040APIController {

    private final TB9040Service tb9040Service;
    
    @PostMapping(value = "/insert")
    public String insert(@RequestBody IBIMS997BDTO param) {
        return tb9040Service.insert(param);
    }
   
}
